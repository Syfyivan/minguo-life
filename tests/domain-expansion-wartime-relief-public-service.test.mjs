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
await import('../assets/domain-expansion-care-professional-associations.js');
await import('../assets/domain-expansion-wartime-relief-public-service.js');
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const DEFINITIONS = {
  D38: { familyKey: 'southwestwarworkers', route: 'southwest-wartime-relief-logistics', pathDecision: 'southwest-warworker-path', pathChoice: 'f15-relief-logistics-trial' },
  D39: { familyKey: 'southwestwarworkers', route: 'southwest-civil-defense-relief', pathDecision: 'southwest-warworker-path', pathChoice: 'f15-civil-defense-relief-trial' },
  D41: { familyKey: 'tianjinclerks', route: 'tianjin-public-community-service', pathDecision: 'tianjin-clerk-path', pathChoice: 'public-community-trial' },
};

const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first', 'southwest-housing-ration-1937': 'f15-renew-rented-courtyard',
  'southwest-air-raid-1939': 'f15-air-raid-people-first', 'southwest-transition-1948': 'f15-transition-stay-southwest',
  'f15-public-contact-1945': 'f15-public-open-work', 'f15-public-family-boundary-1946': 'f15-public-explain-scope',
  'f15-political-application-1947': 'f15-remain-nonparty-helper', 'f15-public-role-1948': 'f15-public-continue-open',
  'f15-political-answer-1949': 'f15-continue-peripheral', 'tianjin-rent-school-1921': 'tianjin-protect-rent-pause-school',
  'tianjin-clerk-war': 'tianjin-local-bounded-work', 'tianjin-postwar-reorganization-1948': 'tianjin-keep-current-records',
  'postwar-settlement': 'rebuild-local', 'final-1949': 'stay-mainland', 'post49-arrival': 'mainland-local-work',
  'later-life-livelihood': 'change-work', 'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care', 'late-life-record': 'sort-records', 'public-life-contact': 'keep-public-distance',
  'wartime-public-role': 'wartime-open-service', 'public-family-boundary': 'tell-family-risk-range',
  'public-past-after-1949': 'state-confirmed-public-past',
};

function play(domainKey, gender = '女', seed = 3800, overrides = {}) {
  const definition = DEFINITIONS[domainKey];
  const decisions = { ...DEFAULTS, [definition.pathDecision]: definition.pathChoice, ...overrides };
  const state = Game.createGame({ familyKey: definition.familyKey, gender, name: `${domainKey}-${gender}`, seed });
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
  assert.ok(state.routeHistory.some((entry) => entry.to === definition.route));
  return state;
}

test('D38, D39 and D41 each meet the complete-domain production gate', () => {
  assert.equal(Content.version, '0.7.21');
  assert.equal(Object.keys(Content.routes).length, 68);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 45);
  for (const [domainKey, definition] of Object.entries(DEFINITIONS)) {
    const prefix = domainKey.toLowerCase();
    assert.equal(Content.actions.filter((item) => item.routes?.includes(definition.route)).length, 8, `${domainKey} actions`);
    const decisions = Content.decisions.filter((item) => item.id.startsWith(`route-${prefix}-`) && item.routes?.includes(definition.route));
    assert.equal(decisions.length, 12, `${domainKey} decisions`);
    assert.ok(decisions.every((item) => item.options.length === 3), `${domainKey} three-way decisions`);
    assert.equal(Content.ordinaryEvents.filter((item) => String(item.id).startsWith(`echo-${prefix}-`)).length, 36, `${domainKey} next-year echoes`);
    const scenes = Content.ordinaryEvents.filter((item) => new RegExp(`^${prefix}-s\\d+$`).test(String(item.id)));
    assert.equal(scenes.length, 12, `${domainKey} sourced scenes`);
    assert.ok(scenes.every((item) => item.sourceIds?.length >= 4));
    assert.equal(Content.routeContactProfiles[definition.route].length, 6, `${domainKey} people`);
  }
});

test('all three routes survive war, 1949 and later life as concrete work', () => {
  for (const [domainKey, gender, seed] of [['D38', '女', 3838], ['D39', '男', 3939], ['D41', '女', 4141]]) {
    const state = play(domainKey, gender, seed);
    const route = DEFINITIONS[domainKey].route;
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, domainKey);
    assert.ok(state.decisionHistory.filter((entry) => entry.decisionId.startsWith(`route-${domainKey.toLowerCase()}-`)).length >= 12);
    assert.ok(state.annualNarratives.filter((entry) => entry.id.startsWith(`echo-${domainKey.toLowerCase()}-`)).length >= 12);
    assert.ok(state.endYear > 1949);
    assert.ok(state.careerHistory.some((entry) => entry.routeKey === route && entry.role && entry.workplace && entry.employer));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  }
});

test('all eight destinations keep concrete and non-combat continuation work', () => {
  const destinations = Object.keys(Content.post1949Paths);
  assert.equal(destinations.length, 8);
  for (const definition of Object.values(DEFINITIONS)) {
    assert.deepEqual(Object.keys(Content.post1949RouteJobs[definition.route]).sort(), destinations.sort());
    for (const destination of destinations) {
      const profile = Content.post1949RouteJobs[definition.route][destination];
      assert.ok(profile.role && profile.casualRole && profile.workplace && profile.duties && profile.terms);
      assert.equal(new Set([profile.supervisor, profile.colleague, profile.publicPerson]).size, 3);
      assert.doesNotMatch(profile.duties, /战斗员|秘密交通员|管制居民/);
    }
  }
});

test('gender changes opportunity profiles without closing any route', () => {
  for (const [domainKey, definition] of Object.entries(DEFINITIONS)) {
    const male = play(domainKey, '男', 7000 + Number(domainKey.slice(1)));
    const female = play(domainKey, '女', 8000 + Number(domainKey.slice(1)));
    assert.notEqual(male.careerHistory.find((entry) => entry.routeKey === definition.route).role, female.careerHistory.find((entry) => entry.routeKey === definition.route).role);
    assert.ok(male.routeHistory.some((entry) => entry.to === definition.route));
    assert.ok(female.routeHistory.some((entry) => entry.to === definition.route));
  }
});

test('three civilian service choices create bounded enterprises rather than public power', () => {
  const cases = [
    ['D38', 'route-d38-1947', 'bounded-desk', '重庆合成静安转送登记案桌', 2, /不含诊断、药品处置、军用运输或秘密通信/],
    ['D39', 'route-d39-1947', 'relief-coop', '重庆合成素安住处救济转介组', 1, /不含消防处置、救济审批、强制安置或居民控制/],
    ['D41', 'route-d41-1943', 'bounded-desk', '天津合成淑清阅览代笔案桌', 2, /不含教育证书、行政审批、政治组织或秘密联络权限/],
  ];
  for (const [domainKey, decisionId, optionId, name, employees, scope] of cases) {
    const state = play(domainKey, '女', 9000 + Number(domainKey.slice(1)), { [decisionId]: optionId });
    const enterprise = state.economicLife.enterprises.find((item) => item.name === name);
    assert.ok(enterprise, `${domainKey} enterprise exists`);
    assert.equal(enterprise.domainKey, domainKey);
    assert.equal(enterprise.employees, employees);
    assert.ok(state.economicLife.assets.some((item) => item.enterpriseId === enterprise.id));
    assert.ok(state.economicLife.debts.some((item) => item.enterpriseId === enterprise.id && /工资/.test(item.purpose)));
    assert.ok(state.economicLife.licenses.some((item) => item.enterpriseId === enterprise.id && scope.test(item.scope)));
  }
});

test('public and wartime jobs never auto-create political or covert identity', () => {
  for (const [domainKey, definition] of Object.entries(DEFINITIONS)) {
    const state = play(domainKey, '女', 10000 + Number(domainKey.slice(1)));
    assert.notEqual(state.publicLife.status, 'member');
    assert.ok([null, 'nonparty'].includes(state.publicLife.organizationKey));
    assert.match(Content.publicRouteProfiles[definition.route].covertRole, /不自动生成/);
    assert.match(Content.publicRouteProfiles[definition.route].infiltrationRole, /不提供|不以/);
  }
});

test('sensitive content preserves victims and excludes operational harm guidance', () => {
  const routes = Object.values(DEFINITIONS).map((item) => item.route);
  const corpus = [
    ...Content.actions.filter((item) => item.routes?.some((route) => routes.includes(route))).map((item) => item.note),
    ...Content.ordinaryEvents.filter((item) => item.routes?.some((route) => routes.includes(route))).map((item) => item.text),
  ].join('\n');
  assert.match(corpus, /失联、转出、住院和死亡严格分开|幸存者陈述|本人原意/);
  assert.match(corpus, /不提供现实防空设施|不提供危险路线|不指导进入火场/);
  assert.doesNotMatch(corpus, /忠诚值|自动入党|成功结局|失败结局/);
});
