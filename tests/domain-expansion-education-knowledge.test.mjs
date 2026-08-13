import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.window = globalThis;
await import('../assets/game-content.js');
await import('../assets/life-expansion.js');
await import('../assets/complete-life.js');
await import('../assets/postwar-era.js');
await import('../assets/lived-life.js');
await import('../assets/public-life.js');
await import('../assets/family-expansion.js');
await import('../assets/family-expansion-f17.js');
await import('../assets/family-expansion-f18.js');
await import('../assets/family-expansion-f05.js');
await import('../assets/family-expansion-f10.js');
await import('../assets/family-expansion-f13.js');
await import('../assets/family-expansion-f14.js');
await import('../assets/family-expansion-f11.js');
await import('../assets/family-expansion-f08.js');
await import('../assets/family-expansion-f12.js');
await import('../assets/family-expansion-f09.js');
await import('../assets/family-expansion-f15.js');
await import('../assets/family-expansion-f02.js');
await import('../assets/family-expansion-f03.js');
await import('../assets/family-expansion-f07.js');
await import('../assets/domain-expansion-education-knowledge.js');
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const ROUTES = {
  D19: 'shen-higher-study',
  D21: 'shen-news-publishing',
  D24: 'shen-library-research',
};
const PATH_CHOICES = {
  D19: 'higher-study',
  D21: 'news-publishing',
  D24: 'library-research',
};

const DEFAULTS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'shen-war': 'stay-public-work',
  'postwar-settlement': 'rebuild-local',
  'final-1949': 'stay-mainland',
  'post49-arrival': 'mainland-local-work',
  'later-life-livelihood': 'change-work',
  'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care',
  'late-life-record': 'sort-records',
  'public-life-contact': 'keep-public-distance',
  'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range',
  'public-past-after-1949': 'state-confirmed-public-past',
};

function play(domainKey, gender = '女', seed = 1919, extraDecisions = {}) {
  const route = ROUTES[domainKey];
  const state = Game.createGame({ familyKey: 'jiangnanshen', gender, name: `${domainKey}-${gender}`, seed });
  const decisions = {
    ...DEFAULTS,
    'shen-path': PATH_CHOICES[domainKey],
    ...extraDecisions,
  };
  let turns = 0;
  while (!state.over && turns < 140) {
    const preferred = Game.recommendedActions(state);
    Game.advanceYear(state, preferred);
    while (state.pendingDecision) {
      const wanted = decisions[state.pendingDecision.id];
      const option = state.pendingDecision.options.find((item) => item.id === wanted && item.enabled && !item.hidden)
        || state.pendingDecision.options.find((item) => item.enabled && !item.hidden);
      assert.ok(option, `${state.pendingDecision.id} needs an available option`);
      Game.choose(state, option.id);
    }
    turns += 1;
  }
  assert.equal(state.over, true);
  assert.ok(state.routeHistory.some((entry) => entry.to === route));
  return state;
}

test('D19, D21 and D24 each meet the first complete-domain production gate', () => {
  assert.equal(Content.version, '0.7.18');
  assert.equal(Object.keys(Content.routes).length, 59);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 36);

  for (const [domainKey, route] of Object.entries(ROUTES)) {
    const actions = Content.actions.filter((action) => action.routes?.includes(route));
    const decisions = Content.decisions.filter((decision) => decision.id.startsWith(`route-${domainKey.toLowerCase()}-`) && decision.routes?.includes(route));
    const echoes = Content.ordinaryEvents.filter((scene) => String(scene.id).startsWith(`echo-${domainKey.toLowerCase()}-`));
    const ordinaryScenes = Content.ordinaryEvents.filter((scene) => new RegExp(`^${domainKey.toLowerCase()}-s\\d+$`).test(String(scene.id)));
    const contacts = Content.routeContactProfiles[route];

    assert.equal(actions.length, 8, `${domainKey} actions`);
    assert.equal(decisions.length, 12, `${domainKey} decisions`);
    assert.ok(decisions.every((decision) => decision.options.length === 3), `${domainKey} three-way decisions`);
    assert.equal(echoes.length, 36, `${domainKey} next-year consequences`);
    assert.equal(ordinaryScenes.length, 12, `${domainKey} career scenes`);
    assert.equal(contacts.length, 6, `${domainKey} persistent people`);
    assert.ok(echoes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
    assert.ok(ordinaryScenes.every((scene) => scene.sourceIds.length >= 4));
  }
});

test('higher study ends as a real phase and transfers into a named career', () => {
  const state = play('D19', '女', 1919, { 'route-d19-1933': 'd19-33-library' });
  assert.equal(state.routeKey, 'shen-library-research');
  const studyDomain = state.domainHistory.find((entry) => entry.domainKey === 'D19');
  const libraryDomain = state.domainHistory.find((entry) => entry.domainKey === 'D24');
  assert.equal(studyDomain.startYear, 1921);
  assert.equal(studyDomain.endYear, 1932);
  assert.equal(libraryDomain.startYear, 1933);
  assert.ok(state.careerHistory.some((entry) => entry.routeKey === 'shen-higher-study' && entry.endedYear === 1932));
  assert.ok(state.facts.some((fact) => fact.source === 'route-d19-1933'));
  assert.ok(state.annualNarratives.some((entry) => entry.id === 'echo-d19-33-library'));
});

test('news publishing and library research each survive war, 1949 and later life', () => {
  for (const [domainKey, seed] of [['D21', 2121], ['D24', 2424]]) {
    const state = play(domainKey, domainKey === 'D21' ? '女' : '男', seed);
    const route = ROUTES[domainKey];
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, domainKey);
    assert.ok(state.careerHistory.some((entry) => entry.routeKey === route && entry.role && entry.workplace && entry.employer));
    assert.ok(state.decisionHistory.filter((entry) => entry.decisionId.startsWith(`route-${domainKey.toLowerCase()}-`)).length >= 12);
    assert.ok(state.annualNarratives.filter((entry) => entry.id.startsWith(`echo-${domainKey.toLowerCase()}-`)).length >= 12);
    assert.ok(state.facts.some((fact) => fact.id === 'final-1949'));
    assert.ok(state.endYear > 1949);
    assert.match(state.post1949.employment.role, domainKey === 'D21' ? /报刊.*编辑|出版.*编辑|审稿.*校样/ : /图书.*编目|编目.*参考/);
    assert.doesNotMatch(state.post1949.employment.role, /机器检修|文书登记/);
    assert.ok(state.lived.career.duties.includes(domainKey === 'D21' ? '稿' : '入藏'));
    assert.doesNotMatch(state.lived.career.supervisor, /劳动介绍处|同班做事|新住处邻居/);
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  }
});

test('news and library careers have concrete continuation jobs in all eight post-1949 destinations', () => {
  const destinations = Object.keys(Content.post1949Paths);
  assert.equal(destinations.length, 8);
  for (const route of [ROUTES.D21, ROUTES.D24]) {
    assert.deepEqual(Object.keys(Content.post1949RouteJobs[route]).sort(), destinations.sort());
    for (const destination of destinations) {
      const profile = Content.post1949RouteJobs[route][destination];
      assert.ok(profile.role && profile.casualRole && profile.workplace && profile.duties && profile.terms, `${route} ${destination}`);
      assert.ok(profile.supervisor && profile.colleague && profile.publicPerson, `${route} ${destination} people`);
    }
  }
});

test('gender changes historical opportunity profiles without closing any of the three fields', () => {
  for (const [domainKey, route] of Object.entries(ROUTES)) {
    const male = play(domainKey, '男', 3000 + Number(domainKey.slice(1)), domainKey === 'D19' ? { 'route-d19-1933': 'd19-33-library' } : {});
    const female = play(domainKey, '女', 4000 + Number(domainKey.slice(1)), domainKey === 'D19' ? { 'route-d19-1933': 'd19-33-library' } : {});
    const maleRole = male.careerHistory.find((entry) => entry.routeKey === route).role;
    const femaleRole = female.careerHistory.find((entry) => entry.routeKey === route).role;
    assert.notEqual(maleRole, femaleRole, `${domainKey} gendered opportunity profile`);
    assert.ok(male.routeHistory.some((entry) => entry.to === route));
    assert.ok(female.routeHistory.some((entry) => entry.to === route));
    assert.match(female.genderContext.rule, /性别影响可见机会/);
  }
});

test('the three fields retain public and political boundaries instead of automating identity', () => {
  for (const domainKey of Object.keys(ROUTES)) {
    const state = play(domainKey, '女', 5000 + Number(domainKey.slice(1)), domainKey === 'D19' ? { 'route-d19-1933': 'd19-33-library' } : {});
    assert.equal(state.publicLife.status, 'unaffiliated');
    assert.ok(Content.publicRouteProfiles[ROUTES[domainKey]].covertRole.includes('不自动'));
    assert.ok(Content.publicRouteProfiles[ROUTES[domainKey]].infiltrationRole.includes('不'));
    assert.doesNotMatch(Game.buildEndingNarrative(state), /叛徒|忠诚值|自动入党/);
  }
});
