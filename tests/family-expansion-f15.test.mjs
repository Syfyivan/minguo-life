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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together', 'midlife-responsibility': 'household-first',
  'southwest-housing-ration-1937': 'f15-renew-rented-courtyard', 'southwest-air-raid-1939': 'f15-air-raid-people-first',
  'southwest-warworker-path': 'f15-warehouse-trial', 'southwest-transition-1948': 'f15-transition-stay-southwest',
  'f15-public-contact-1945': 'f15-public-open-work', 'f15-public-family-boundary-1946': 'f15-public-explain-scope',
  'f15-political-application-1947': 'f15-apply-public-civic-network', 'f15-public-role-1948': 'f15-public-continue-open',
  'f15-political-answer-1949': 'f15-accept-network-membership',
  'postwar-settlement': 'rebuild-local', 'final-1949': 'stay-mainland', 'post49-arrival': 'mainland-local-work',
  'later-life-livelihood': 'change-work', 'later-life-relationships': 'build-local-network', 'late-life-care': 'community-care',
  'late-life-record': 'sort-records', 'public-life-contact': 'keep-public-distance', 'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range', 'public-past-after-1949': 'state-confirmed-public-past',
};

function play(decisions, gender = '女', seed = 1514) {
  const state = Game.createGame({ familyKey: 'southwestwarworkers', gender, name: gender === '女' ? '郭承宁' : '郭承安', seed });
  const selected = { ...DEFAULTS, ...decisions };
  let turns = 0;
  while (!state.over && turns < 140) {
    Game.advanceYear(state, Game.recommendedActions(state));
    while (state.pendingDecision) {
      const wanted = selected[state.pendingDecision.id];
      const option = state.pendingDecision.options.find((item) => item.id === wanted && item.enabled && !item.hidden)
        || state.pendingDecision.options.find((item) => item.enabled && !item.hidden);
      assert.ok(option, `${state.pendingDecision.id} must have an available option`);
      Game.choose(state, option.id);
    }
    turns += 1;
  }
  assert.equal(state.over, true);
  return state;
}

test('F15 is the fifteenth playable family and adds three wartime southwest domains', () => {
  assert.equal(Content.version, '0.7.14');
  assert.equal(Content.designRegistry.families.F15.runtimeStatus, 'playable-verified');
  assert.equal(Content.runtimeFamilyDesignMap.southwestwarworkers, 'F15');
  assert.equal(Object.keys(Content.families).length, 15);
  assert.equal(Object.keys(Content.routes).length, 47);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 32);
  assert.deepEqual([
    Content.legacyRouteDomainMap['southwest-wartime-warehouse-supply'],
    Content.legacyRouteDomainMap['southwest-mechanical-drawing-repair'],
    Content.legacyRouteDomainMap['southwest-clinic-records-clerk'],
  ], ['D12', 'D33', 'D31']);
});

test('F15 warehouse, civilian repair and records work reach concrete deaths', () => {
  const cases = [
    ['f15-warehouse-trial', 'southwest-wartime-warehouse-supply', '男'],
    ['f15-repair-drawing-trial', 'southwest-mechanical-drawing-repair', '女'],
    ['f15-records-trial', 'southwest-clinic-records-clerk', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'southwest-warworker-path': choice }, gender, 1514 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F15');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace && record.employer && record.supervisor));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F15 models gendered opportunity without reducing either gender to one route', () => {
  const maleWarehouse = play({ 'southwest-warworker-path': 'f15-warehouse-trial' }, '男', 1520);
  const femaleWarehouse = play({ 'southwest-warworker-path': 'f15-warehouse-trial' }, '女', 1521);
  const maleRepair = play({ 'southwest-warworker-path': 'f15-repair-drawing-trial' }, '男', 1522);
  const femaleRepair = play({ 'southwest-warworker-path': 'f15-repair-drawing-trial' }, '女', 1523);
  assert.notEqual(maleWarehouse.careerHistory.find((entry) => entry.routeKey === 'southwest-wartime-warehouse-supply').role, femaleWarehouse.careerHistory.find((entry) => entry.routeKey === 'southwest-wartime-warehouse-supply').role);
  assert.notEqual(maleRepair.careerHistory.find((entry) => entry.routeKey === 'southwest-mechanical-drawing-repair').role, femaleRepair.careerHistory.find((entry) => entry.routeKey === 'southwest-mechanical-drawing-repair').role);
  assert.ok(femaleRepair.genderContext.rule.includes('性别影响可见机会'));
});

test('F15 publishes twenty-four source-linked scenes, thirty work echoes and sixteen public-life echoes', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => /^f15-s\d+$/.test(String(scene.id)));
  const publicEchoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f15-public-'));
  const workEchoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f15-') && !String(scene.id).startsWith('echo-f15-public-'));
  assert.equal(baseScenes.length, 24);
  assert.equal(workEchoes.length, 30);
  assert.equal(publicEchoes.length, 16);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(Content.contentRegistries.sources['SRC-F15-MOVED-INDUSTRY']);
  assert.ok(Content.contentRegistries.sources['SRC-F15-BOMBING']);
  assert.ok(Content.contentRegistries.sources['SRC-F15-AIR-DEFENSE']);
});

test('F15 separates unit property, family assets, housing, diagnosis and approval authority', () => {
  const warehouse = play({
    'southwest-warworker-path': 'f15-warehouse-trial',
    'route-southwest-wartime-warehouse-supply-1944': 'f15-warehouse-confirm-seen-loss',
  }, '女', 1531);
  assert.ok(warehouse.annualNarratives.some((entry) => entry.id === 'echo-f15-warehouse-seen'));
  assert.ok(warehouse.facts.some((fact) => fact.text.includes('亲见')));
  const records = play({
    'southwest-warworker-path': 'f15-records-trial',
    'route-southwest-clinic-records-clerk-1944': 'f15-records-refuse-alter-diagnosis',
  }, '女', 1532);
  assert.ok(records.facts.some((fact) => fact.text.includes('拒绝越权修改伤病结论')));
  assert.equal(records.subjects.mother.agency >= 97, true);
  assert.ok(records.contacts.f15_zhou_biyun.note.includes('不是迁入家庭的无限住房资源'));
});

test('F15 enterprises record employees, tools, debts, registration and independent partners', () => {
  const warehouse = play({
    'southwest-warworker-path': 'f15-warehouse-trial',
    'route-southwest-wartime-warehouse-supply-1946': 'f15-warehouse-limited-inventory-team',
  }, '男', 1541);
  assert.ok(warehouse.economicLife.enterprises.some((item) => item.name === '重庆合成安明民生盘点小队' && item.employees === 3));
  assert.ok(warehouse.economicLife.debts.some((item) => item.purpose.includes('雇员工资')));
  const repair = play({
    'southwest-warworker-path': 'f15-repair-drawing-trial',
    'route-southwest-mechanical-drawing-repair-1946': 'f15-repair-limited-shop',
  }, '女', 1542);
  assert.ok(repair.economicLife.assets.some((item) => item.description.includes('民用修理工具')));
  assert.ok(repair.economicLife.shareholders.some((item) => item.personId === 'contact:f15_repair_coworker'));
  const records = play({
    'southwest-warworker-path': 'f15-records-trial',
    'route-southwest-clinic-records-clerk-1946': 'f15-records-limited-service-coop',
  }, '女', 1543);
  assert.ok(records.economicLife.enterprises.some((item) => item.employees === 2));
  assert.ok(records.economicLife.licenses.some((item) => item.scope.includes('不含诊断、审批')));
  assert.ok(records.economicLife.shareholders.some((item) => item.personId === 'contact:f15_xiong_ruifang'));
  assert.ok(records.economicLife.shareholders.some((item) => item.personId === 'contact:f15_guo_jingyi'));
});

test('F15 public work and wartime employment never automate political or secret identity', () => {
  const profiles = ['southwest-wartime-warehouse-supply', 'southwest-mechanical-drawing-repair', 'southwest-clinic-records-clerk'].map((key) => Content.publicRouteProfiles[key]);
  assert.ok(profiles.every((profile) => /不自动|另经/.test(profile.covertRole)));
  assert.ok(profiles.every((profile) => /不提供/.test(profile.infiltrationRole)));
  const state = play({ 'f15-public-contact-1945': 'f15-public-keep-distance' }, '女', 1551);
  assert.equal(state.publicLife.status, 'unaffiliated');
  assert.ok(state.facts.some((fact) => /没有参加.*组织/.test(fact.text)));
  assert.ok(state.eraHistory.some((entry) => entry.year === 1938));
  assert.ok(state.eraHistory.some((entry) => entry.year === 1939));
  assert.equal(state.contactHistory.filter((entry) => /郭明德|叶秀芳/.test(entry.title || '') && /去世/.test(entry.title || '')).length <= 2, true);
});
