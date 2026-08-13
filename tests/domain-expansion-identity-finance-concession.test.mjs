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
await import('../assets/domain-expansion-identity-finance-concession.js');
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const DEFINITIONS = {
  D42: { familyKey: 'shanghaigongshang', route: 'high-risk-double-identity', choices: {
    'shanghai-path': 'salaried-professional', 'public-life-contact': 'join-open-public-work',
    'political-organization-application': 'remain-nonparty-helper', 'wartime-public-role': 'wartime-secret-liaison',
    'shanghai-war': 'relocate-own-work',
  } },
  D47: { familyKey: 'guangdongqiaoxiang', route: 'banking-investment-insurance-owner', choices: {
    'qiaoxiang-path': 'remittance-trial', 'qiaoxiang-war': 'split-address-and-accounts',
    'd47-finance-ownership-entry-1946': 'd47-form-share-finance-firm',
  } },
  D48: { familyKey: 'guangdongcoastal', route: 'macao-tourism-entertainment-concession', choices: {
    'coastal-path': 'guesthouse-trial', 'coastal-war': 'coastal-split-addresses',
    'final-1949': 'move-macau', 'post49-arrival': 'macau-verified-contact-work',
    'macau-hospitality-concession-1962': 'macau-limited-concession-network-partner',
  } },
};
const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first', 'postwar-settlement': 'rebuild-local',
  'final-1949': 'stay-mainland', 'post49-arrival': 'mainland-local-work',
  'later-life-livelihood': 'change-work', 'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care', 'late-life-record': 'sort-records',
  'public-life-contact': 'keep-public-distance', 'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range', 'public-past-after-1949': 'state-confirmed-public-past',
};

function play(domainKey, gender = '女', seed = 4222, overrides = {}, requireRoute = true) {
  const definition = DEFINITIONS[domainKey];
  const decisions = { ...DEFAULTS, ...definition.choices, ...overrides };
  const state = Game.createGame({ familyKey: definition.familyKey, gender, name: `${domainKey}-${gender}`, seed });
  let turns = 0;
  while (!state.over && turns < 140) {
    Game.advanceYear(state, Game.recommendedActions(state));
    while (state.pendingDecision) {
      if (['d47-finance-ownership-entry-1946', 'final-1949', 'macau-hospitality-concession-1962'].includes(state.pendingDecision.id)) {
        Object.keys(state.attrs).forEach((key) => { state.attrs[key] = 100; });
        Object.keys(state.res).forEach((key) => { state.res[key] = 100; });
        ['newspaper', 'conversation', 'books'].forEach((channel) => {
          if (!state.information.channels.includes(channel)) state.information.channels.push(channel);
        });
      }
      const wanted = decisions[state.pendingDecision.id];
      const choice = state.pendingDecision.options.find((item) => item.id === wanted && item.enabled && !item.hidden)
        || state.pendingDecision.options.find((item) => item.enabled && !item.hidden);
      assert.ok(choice, `${state.pendingDecision.id} needs an available choice`);
      Game.choose(state, choice.id);
    }
    turns += 1;
  }
  assert.equal(state.over, true);
  if (requireRoute) assert.ok(state.routeHistory.some((entry) => entry.to === definition.route), `${domainKey} route reached`);
  return state;
}

test('D42, D47 and D48 close all 48 runtime domains with complete production gates', () => {
  assert.equal(Content.version, '0.7.22');
  assert.equal(Object.keys(Content.families).length, 18);
  assert.equal(Object.keys(Content.routes).length, 71);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 48);
  assert.equal(Content.actions.length, 335);
  assert.equal(Content.decisions.length, 375);
  assert.equal(Content.decisions.reduce((sum, item) => sum + item.options.length, 0), 1165);
  assert.equal(Content.ordinaryEvents.length, 1680);
  for (const [domainKey, definition] of Object.entries(DEFINITIONS)) {
    const prefix = domainKey.toLowerCase();
    assert.equal(Content.actions.filter((item) => item.routes?.includes(definition.route)).length, 8, `${domainKey} actions`);
    const decisions = Content.decisions.filter((item) => item.id.startsWith(`route-${prefix}-`) && item.routes?.includes(definition.route));
    assert.equal(decisions.length, 12, `${domainKey} decisions`);
    assert.ok(decisions.every((item) => item.options.length === 3));
    assert.equal(Content.ordinaryEvents.filter((item) => String(item.id).startsWith(`echo-${prefix}-`)).length, 36, `${domainKey} echoes`);
    assert.equal(Content.ordinaryEvents.filter((item) => new RegExp(`^${prefix}-s\\d+$`).test(String(item.id))).length, 12, `${domainKey} scenes`);
    assert.equal(Content.routeContactProfiles[definition.route].length, 6, `${domainKey} people`);
    assert.deepEqual(Object.keys(Content.post1949RouteJobs[definition.route]).sort(), Object.keys(Content.post1949Paths).sort());
  }
});

test('D42 requires an explicit high-risk choice and never grows out of ordinary public service', () => {
  const open = play('D42', '女', 4201, { 'wartime-public-role': 'wartime-open-service' }, false);
  assert.ok(!open.routeHistory.some((entry) => entry.to === DEFINITIONS.D42.route));
  assert.notEqual(open.publicLife.status, 'secret-worker');

  const secret = play('D42', '女', 4202);
  assert.ok(secret.routeHistory.some((entry) => entry.source.includes('wartime-public-role:wartime-secret-liaison')));
  assert.ok(secret.decisionHistory.filter((entry) => entry.decisionId.startsWith('route-d42-')).length >= 12);
  assert.match(Content.publicRouteProfiles[DEFINITIONS.D42.route].infiltrationRole, /不提供暗号|不提供.*秘密路线/);
  assert.doesNotMatch(Content.routes[DEFINITIONS.D42.route].summary, /忠诚值|成功结局|失败结局/);
});

test('D47 starts a jointly governed enterprise and keeps customer money outside owner property', () => {
  const state = play('D47', '女', 4701);
  const enterprise = state.economicLife.enterprises.find((item) => item.domainKey === 'D47');
  assert.ok(enterprise);
  assert.equal(enterprise.employees, 6);
  assert.match(enterprise.shareStatus, /客户资金不计入任何股东财产/);
  assert.ok(state.economicLife.licenses.some((item) => item.enterpriseId === enterprise.id && /不得把客户本金、保费或受托款/.test(item.scope)));
  assert.ok(state.economicLife.debts.some((item) => item.enterpriseId === enterprise.id && /雇员首月工资/.test(item.purpose)));
  assert.ok(state.decisionHistory.filter((entry) => entry.decisionId.startsWith('route-d47-')).length >= 12);
});

test('D48 is a rare Macao-only concession path with real prerequisites and a composite identity boundary', () => {
  const mainland = play('D48', '女', 4801, { 'final-1949': 'stay-mainland' }, false);
  assert.ok(!mainland.routeHistory.some((entry) => entry.to === DEFINITIONS.D48.route));

  const state = play('D48', '女', 4802);
  assert.equal(state.post1949Choice, 'macau');
  const enterprise = state.economicLife.enterprises.find((item) => item.domainKey === 'D48');
  assert.ok(enterprise);
  assert.equal(enterprise.employees, 60);
  assert.match(enterprise.shareStatus, /并非唯一控制者|真实.*不被游戏角色占用/);
  const concession = state.economicLife.concessions.find((item) => item.enterpriseId === enterprise.id);
  assert.ok(concession);
  assert.equal(concession.startedYear, 1962);
  assert.match(concession.awardMethod, /1961 年公开竞投/);
  assert.match(state.post1949.employment.role, /主要经营股东及工作董事/);
  assert.match(state.post1949.employment.workplace, /澳门合成酒店、旅游交通与持牌娱乐企业/);
  assert.doesNotMatch(state.post1949.employment.role, /检修|交接员/);
  assert.ok(state.post1949.employment.history.some((entry) => /转入/.test(entry.result || '') && /主要经营股东及工作董事/.test(entry.role || '')));
  const firstNewRoleWork = state.lived.career.history.find((entry) => entry.year >= 1963 && /主要经营股东及工作董事/.test(entry.role || ''));
  assert.ok(firstNewRoleWork);
  assert.doesNotMatch(firstNewRoleWork.text, /艇务修理处|检修与交接员/);
  assert.ok(state.lived.career.history.filter((entry) => entry.year >= 1962 && /主要经营股东及工作董事/.test(entry.role || '')).length >= 4);
  assert.ok(state.lived.career.business.ordersHandled >= 4);
  assert.ok(state.lived.career.business.lastCustomer);
  assert.doesNotMatch(state.endingFacts.join(''), /null/);
  assert.ok(state.decisionHistory.filter((entry) => entry.decisionId.startsWith('route-d48-')).length >= 12);
});

test('all three routes reach death with concrete work, health, relationships and confirmed endings', () => {
  for (const [domainKey, gender, seed] of [['D42', '男', 4242], ['D47', '女', 4747], ['D48', '女', 4848]]) {
    const state = play(domainKey, gender, seed);
    const route = DEFINITIONS[domainKey].route;
    assert.equal(state.routeDomainKey, domainKey);
    assert.ok(state.careerHistory.some((entry) => entry.routeKey === route && entry.role && entry.workplace && entry.employer));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.lived.relationship.history.length >= 2);
    assert.ok(Object.keys(state.contacts).length >= 12);
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  }
});

test('gender-specific profiles retain each domain concrete work chain', () => {
  assert.match(Content.routeCareerProfilesByGender['high-risk-double-identity'].女.duties, /公开职业.*高风险联络/);
  assert.match(Content.routeCareerProfilesByGender['banking-investment-insurance-owner'].女.duties, /董事会.*客户资金.*贷款.*保险.*准备/);
  assert.match(Content.routeCareerProfilesByGender['macao-tourism-entertainment-concession'].女.duties, /酒店.*旅游.*员工.*顾客伤害.*债务.*监管/);
});

test('sensitive and financial content has no operational harm, gambling or fraud tutorial', () => {
  const routes = Object.values(DEFINITIONS).map((item) => item.route);
  const corpus = [
    ...Content.actions.filter((item) => item.routes?.some((route) => routes.includes(route))).map((item) => item.note),
    ...Content.ordinaryEvents.filter((item) => item.routes?.some((route) => routes.includes(route))).map((item) => item.text),
    ...routes.map((route) => Content.publicRouteProfiles[route].infiltrationRole),
  ].join('\n');
  assert.match(corpus, /不展示暗号|不提供.*隐蔽|不展示玩法|客户资金/);
  assert.match(corpus, /误伤|顾客伤害|申诉|退出/);
  assert.doesNotMatch(corpus, /稳赢|下注技巧|洗钱步骤|逃避审讯方法|协助辨认|申请加入中国共产党|申请加入中国国民党/);
  assert.ok(!Object.values(Content.actions).some((item) => Object.hasOwn(item, 'loyalty') || Object.hasOwn(item, 'betrayalScore')));
});
