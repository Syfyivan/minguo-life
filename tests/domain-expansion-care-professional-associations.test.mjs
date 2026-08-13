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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const DEFINITIONS = {
  D30: { familyKey: 'sichuanmedicine', route: 'sichuan-long-term-care', pathDecision: 'sichuan-path', pathChoice: 'long-term-care' },
  D32: { familyKey: 'hankoucommerce', route: 'hankou-legal-accounting', pathDecision: 'hankou-commerce-path', pathChoice: 'legal-accounting-trial' },
  D36: { familyKey: 'hankoucommerce', route: 'hankou-trade-associations', pathDecision: 'hankou-commerce-path', pathChoice: 'trade-association-trial' },
};

const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first', 'sichuan-war': 'split-family-work',
  'hankou-commerce-credit-1921': 'credit-protect-home-reduce-stock',
  'hankou-commerce-war': 'hankou-commerce-split-addresses-stock',
  'hankou-commerce-transition-1948': 'hankou-commerce-keep-current-ledgers',
  'postwar-settlement': 'rebuild-local', 'final-1949': 'stay-mainland',
  'post49-arrival': 'mainland-local-work', 'later-life-livelihood': 'change-work',
  'later-life-relationships': 'build-local-network', 'late-life-care': 'community-care',
  'late-life-record': 'sort-records', 'public-life-contact': 'keep-public-distance',
  'wartime-public-role': 'wartime-open-service', 'public-family-boundary': 'tell-family-risk-range',
  'public-past-after-1949': 'state-confirmed-public-past',
};

function play(domainKey, gender = '女', seed = 3000, overrides = {}) {
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

test('D30, D32 and D36 each meet the complete-domain production gate', () => {
  assert.equal(Content.version, '0.7.20');
  assert.equal(Object.keys(Content.routes).length, 65);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 42);
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
  for (const [domainKey, gender, seed] of [['D30', '女', 3030], ['D32', '女', 3232], ['D36', '男', 3636]]) {
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

test('the routes have concrete continuation work and three distinct people in all eight destinations', () => {
  const destinations = Object.keys(Content.post1949Paths);
  assert.equal(destinations.length, 8);
  for (const definition of Object.values(DEFINITIONS)) {
    assert.deepEqual(Object.keys(Content.post1949RouteJobs[definition.route]).sort(), destinations.sort());
    for (const destination of destinations) {
      const profile = Content.post1949RouteJobs[definition.route][destination];
      assert.ok(profile.role && profile.casualRole && profile.workplace && profile.duties && profile.terms);
      assert.equal(new Set([profile.supervisor, profile.colleague, profile.publicPerson]).size, 3);
    }
  }
});

test('gender changes opportunity profiles without closing any of the three routes', () => {
  for (const [domainKey, definition] of Object.entries(DEFINITIONS)) {
    const male = play(domainKey, '男', 7000 + Number(domainKey.slice(1)));
    const female = play(domainKey, '女', 8000 + Number(domainKey.slice(1)));
    assert.notEqual(male.careerHistory.find((entry) => entry.routeKey === definition.route).role, female.careerHistory.find((entry) => entry.routeKey === definition.route).role);
    assert.ok(male.routeHistory.some((entry) => entry.to === definition.route));
    assert.ok(female.routeHistory.some((entry) => entry.to === definition.route));
  }
});

test('opening care, professional and association services creates real bounded enterprises', () => {
  const cases = [
    ['D30', 'route-d30-1943', 'small-day-service', '川西合成淑安日间照护点', 2, /诊疗、夜间住宿/],
    ['D32', 'route-d32-1943', 'bounded-firm', '汉口合成文真账务文书所', 2, /诉讼代理和最终签证/],
    ['D36', 'route-d36-1943', 'independent-service', '汉口合成明真会议账务服务点', 1, /不使用商会名义/],
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
  const care = play('D30', '女', 9130, { 'route-d30-1943': 'small-day-service' });
  assert.ok(care.economicLife.shareholders.some((item) => item.personId === 'contact:d30_sun_yulan'));
  const professional = play('D32', '女', 9132, { 'route-d32-1943': 'bounded-firm' });
  assert.ok(professional.economicLife.shareholders.some((item) => item.personId === 'contact:d32_chen_yuzhen'));
});

test('subject agency and professional boundaries stay explicit', () => {
  assert.match(Content.routes['sichuan-long-term-care'].summary, /本人同意|无偿/);
  assert.match(Content.routes['hankou-legal-accounting'].summary, /资格|利益冲突/);
  assert.match(Content.routes['hankou-trade-associations'].summary, /不自动生成党籍|会员/);
  for (const definition of Object.values(DEFINITIONS)) {
    const profile = Content.publicRouteProfiles[definition.route];
    assert.match(profile.covertRole, /不自动/);
    assert.match(profile.infiltrationRole, /不以|不提供/);
  }
});

test('sensitive content does not invent death, legal advice, evasion or covert identity', () => {
  const corpus = [
    ...Content.actions.filter((item) => item.routes?.some((route) => Object.values(DEFINITIONS).some((definition) => definition.route === route))).map((item) => item.note),
    ...Content.ordinaryEvents.filter((item) => item.routes?.some((route) => Object.values(DEFINITIONS).some((definition) => definition.route === route))).map((item) => item.text),
  ].join('\n');
  assert.match(corpus, /不制造任何角色死亡|不是现实法律意见|不提供现实跟踪|不教人隐匿资产/);
  assert.doesNotMatch(corpus, /忠诚值|自动入党|成功结局|失败结局/);
});
