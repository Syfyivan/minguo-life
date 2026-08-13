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
await import('../assets/domain-expansion-medical-public-health.js');
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const ROUTES = { D27: 'sichuan-clinical-medicine', D28: 'sichuan-hospital-services', D29: 'sichuan-public-health' };
const PATHS = { D27: 'clinical-training', D28: 'hospital-services', D29: 'public-health' };

const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first', 'sichuan-war': 'split-family-work',
  'postwar-settlement': 'rebuild-local', 'final-1949': 'stay-mainland', 'post49-arrival': 'mainland-local-work',
  'later-life-livelihood': 'change-work', 'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care', 'late-life-record': 'sort-records',
  'public-life-contact': 'keep-public-distance', 'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range', 'public-past-after-1949': 'state-confirmed-public-past',
};

function play(domainKey, gender = '女', seed = 2700) {
  const route = ROUTES[domainKey];
  const state = Game.createGame({ familyKey: 'sichuanmedicine', gender, name: `${domainKey}-${gender}`, seed });
  const decisions = { ...DEFAULTS, 'sichuan-path': PATHS[domainKey] };
  let turns = 0;
  while (!state.over && turns < 140) {
    Game.advanceYear(state, Game.recommendedActions(state));
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

test('D27, D28 and D29 each meet the first complete-domain production gate', () => {
  assert.equal(Content.version, '0.7.19');
  assert.equal(Object.keys(Content.routes).length, 62);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 39);
  for (const [domainKey, route] of Object.entries(ROUTES)) {
    const prefix = domainKey.toLowerCase();
    assert.equal(Content.actions.filter((item) => item.routes?.includes(route)).length, 8, `${domainKey} actions`);
    const decisions = Content.decisions.filter((item) => item.id.startsWith(`route-${prefix}-`) && item.routes?.includes(route));
    assert.equal(decisions.length, 12, `${domainKey} decisions`);
    assert.ok(decisions.every((item) => item.options.length === 3), `${domainKey} three-way decisions`);
    assert.equal(Content.ordinaryEvents.filter((item) => String(item.id).startsWith(`echo-${prefix}-`)).length, 36, `${domainKey} echoes`);
    const scenes = Content.ordinaryEvents.filter((item) => new RegExp(`^${prefix}-s\\d+$`).test(String(item.id)));
    assert.equal(scenes.length, 12, `${domainKey} scenes`);
    assert.ok(scenes.every((item) => item.sourceIds.length >= 4));
    assert.equal(Content.routeContactProfiles[route].length, 6, `${domainKey} people`);
  }
});

test('all three medical and public-health routes survive war, 1949 and later life as concrete work', () => {
  for (const [domainKey, seed] of [['D27', 2727], ['D28', 2828], ['D29', 2929]]) {
    const state = play(domainKey, domainKey === 'D28' ? '男' : '女', seed);
    const route = ROUTES[domainKey];
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, domainKey);
    assert.ok(state.decisionHistory.filter((entry) => entry.decisionId.startsWith(`route-${domainKey.toLowerCase()}-`)).length >= 12);
    assert.ok(state.annualNarratives.filter((entry) => entry.id.startsWith(`echo-${domainKey.toLowerCase()}-`)).length >= 12);
    assert.ok(state.endYear > 1949);
    assert.ok(state.careerHistory.some((entry) => entry.routeKey === route && entry.role && entry.workplace && entry.employer));
    assert.match(state.post1949.employment.role, domainKey === 'D27' ? /门诊.*医师|诊疗.*复核/ : domainKey === 'D28' ? /检验.*药剂.*病案|医技.*病案/ : /公共卫生.*调查|公卫.*记录/);
    assert.doesNotMatch(state.post1949.employment.role, /机器检修|文书登记|装卸/);
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  }
});

test('the three routes have concrete continuation jobs and three distinct people in all eight destinations', () => {
  const destinations = Object.keys(Content.post1949Paths);
  assert.equal(destinations.length, 8);
  for (const route of Object.values(ROUTES)) {
    assert.deepEqual(Object.keys(Content.post1949RouteJobs[route]).sort(), destinations.sort());
    for (const destination of destinations) {
      const profile = Content.post1949RouteJobs[route][destination];
      assert.ok(profile.role && profile.casualRole && profile.workplace && profile.duties && profile.terms);
      assert.equal(new Set([profile.supervisor, profile.colleague, profile.publicPerson]).size, 3, `${route} ${destination} people`);
    }
  }
});

test('gender changes historical opportunity profiles without closing medical paths', () => {
  for (const [domainKey, route] of Object.entries(ROUTES)) {
    const male = play(domainKey, '男', 3000 + Number(domainKey.slice(1)));
    const female = play(domainKey, '女', 4000 + Number(domainKey.slice(1)));
    assert.notEqual(male.careerHistory.find((entry) => entry.routeKey === route).role, female.careerHistory.find((entry) => entry.routeKey === route).role);
    assert.ok(male.routeHistory.some((entry) => entry.to === route));
    assert.ok(female.routeHistory.some((entry) => entry.to === route));
  }
});

test('patient and resident agency is explicit and public work does not automate political identity', () => {
  for (const [domainKey, route] of Object.entries(ROUTES)) {
    const profile = Content.publicRouteProfiles[route];
    assert.match(profile.covertRole, /不自动/);
    assert.match(profile.infiltrationRole, /不以|不提供/);
    assert.match(Content.routes[route].summary, domainKey === 'D29' ? /住址|调查|卫生/ : domainKey === 'D28' ? /样本|处方|病案/ : /病历|诊疗|复诊/);
    const state = play(domainKey, '女', 5000 + Number(domainKey.slice(1)));
    assert.equal(state.publicLife.status, 'unaffiliated');
    assert.doesNotMatch(Game.buildEndingNarrative(state), /自动入党|忠诚值|叛徒/);
  }
});

test('medical content is source-linked but does not present invented treatment instructions', () => {
  const events = Content.ordinaryEvents.filter((item) => item.routes?.some((route) => Object.values(ROUTES).includes(route)));
  assert.ok(events.every((item) => item.sourceIds?.length >= 4));
  const corpus = [
    ...Content.actions.filter((item) => item.routes?.some((route) => Object.values(ROUTES).includes(route))).map((item) => item.note),
    ...events.map((item) => item.text),
  ].join('\n');
  assert.doesNotMatch(corpus, /\d+\s*(毫克|mg|毫升|ml)|每日[一二三四五六七八九十\d]+次|具体剂量/);
  assert.match(corpus, /不是现实诊断建议|不提供现实操作参数|不提供现实高风险操作教程/);
});
