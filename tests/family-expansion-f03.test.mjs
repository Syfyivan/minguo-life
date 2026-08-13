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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together', 'midlife-responsibility': 'household-first',
  'jiangnan-silk-child-work-1918': 'f03-child-silkworm', 'jiangnan-silk-credit-1928': 'f03-credit-formal-check',
  'jiangnan-silk-path': 'f03-path-sericulture', 'jiangnan-silk-war-break-1937': 'f03-war-stay-water-farm',
  'postwar-settlement': 'rebuild-local', 'final-1949': 'stay-mainland', 'post49-arrival': 'mainland-local-work',
  'later-life-livelihood': 'change-work', 'later-life-relationships': 'build-local-network', 'late-life-care': 'community-care',
  'late-life-record': 'sort-records', 'public-life-contact': 'keep-public-distance', 'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range', 'public-past-after-1949': 'state-confirmed-public-past',
};

function play(decisions, gender = '女', seed = 310) {
  const state = Game.createGame({ familyKey: 'jiangnansilkwater', gender, name: gender === '女' ? '顾春兰' : '顾守田', seed });
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

test('F03 is the seventeenth playable family and reuses three honest canonical domains', () => {
  assert.equal(Content.version, '0.7.16');
  assert.equal(Content.designRegistry.families.F03.runtimeStatus, 'playable-verified');
  assert.equal(Content.runtimeFamilyDesignMap.jiangnansilkwater, 'F03');
  assert.equal(Object.keys(Content.families).length, 17);
  assert.equal(Object.keys(Content.routes).length, 53);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 33);
  assert.deepEqual([
    Content.legacyRouteDomainMap['jiangnan-tenant-water-farmer'],
    Content.legacyRouteDomainMap['jiangnan-sericulture-silk-household'],
    Content.legacyRouteDomainMap['jiangnan-silk-reeling-mill-worker'],
  ], ['D01', 'D03', 'D07']);
});

test('F03 tenant, household silk and mill work each reach a concrete death', () => {
  const cases = [
    ['f03-path-tenant', 'jiangnan-tenant-water-farmer', '男'],
    ['f03-path-sericulture', 'jiangnan-sericulture-silk-household', '女'],
    ['f03-path-mill', 'jiangnan-silk-reeling-mill-worker', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'jiangnan-silk-path': choice }, gender, 310 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F03');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace && record.employer && record.supervisor));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F03 uses gendered historical opportunity profiles without closing a route', () => {
  const maleTenant = play({ 'jiangnan-silk-path': 'f03-path-tenant' }, '男', 320);
  const femaleTenant = play({ 'jiangnan-silk-path': 'f03-path-tenant' }, '女', 321);
  const maleMill = play({ 'jiangnan-silk-path': 'f03-path-mill' }, '男', 322);
  const femaleMill = play({ 'jiangnan-silk-path': 'f03-path-mill' }, '女', 323);
  assert.notEqual(maleTenant.careerHistory.find((entry) => entry.routeKey === 'jiangnan-tenant-water-farmer').role, femaleTenant.careerHistory.find((entry) => entry.routeKey === 'jiangnan-tenant-water-farmer').role);
  assert.notEqual(maleMill.careerHistory.find((entry) => entry.routeKey === 'jiangnan-silk-reeling-mill-worker').role, femaleMill.careerHistory.find((entry) => entry.routeKey === 'jiangnan-silk-reeling-mill-worker').role);
  assert.ok(femaleMill.genderContext.rule.includes('性别影响可见机会'));
});

test('F03 publishes twenty-four source-linked scenes and thirty choice consequences', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => /^f03-s\d+$/.test(String(scene.id)));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f03-'));
  assert.equal(baseScenes.length, 24);
  assert.equal(echoes.length, 30);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(Content.contentRegistries.sources['SRC-F03-WUXI-SILK']);
  assert.ok(Content.contentRegistries.sources['SRC-F03-SUZHOU-FLOOD']);
  assert.ok(Content.contentRegistries.sources['SRC-F03-WARTIME-LOSS']);
});

test('F03 keeps tenant rights, maternal silk tools, work tickets and sibling answers separate', () => {
  const tenant = play({
    'jiangnan-silk-path': 'f03-path-tenant',
    'route-jiangnan-tenant-water-farmer-1929': 'f03-tenant-return-plot',
  }, '女', 331);
  assert.ok(tenant.annualNarratives.some((entry) => entry.id === 'echo-f03-tenant-return'));
  assert.ok(tenant.facts.some((fact) => fact.text.includes('退掉一块低田')));
  assert.equal(tenant.subjects.mother.agency >= 98, true);
  const mill = play({
    'jiangnan-silk-path': 'f03-path-mill',
    'route-jiangnan-silk-reeling-mill-worker-1929': 'f03-mill-leave-after-pay',
  }, '女', 332);
  assert.ok(mill.facts.some((fact) => fact.text.includes('离开丝厂')));
  assert.ok(mill.contacts.f03_mill_coworker.role.includes('自己的工票、工资'));
  assert.ok(mill.contacts.f03_gu_chunmei.role.includes('决定入厂'));
  assert.equal(mill.contacts.f03_gu_chunmei.agency, 99);
});

test('F03 enterprises record employees, tools, debt, registration and independent partners', () => {
  const tenant = play({
    'jiangnan-silk-path': 'f03-path-tenant',
    'route-jiangnan-tenant-water-farmer-1946': 'f03-tenant-seasonal-team',
  }, '男', 341);
  assert.ok(tenant.economicLife.enterprises.some((item) => item.name === '江南合成水田农忙队' && item.employees === 4));
  assert.ok(tenant.economicLife.shareholders.some((item) => item.personId === 'contact:f03_tenant_coworker'));
  const silk = play({
    'jiangnan-silk-path': 'f03-path-sericulture',
    'route-jiangnan-sericulture-silk-household-1946': 'f03-silk-limited-coop',
  }, '女', 342);
  assert.ok(silk.economicLife.enterprises.some((item) => item.employees === 2));
  assert.ok(silk.economicLife.shareholders.some((item) => item.personId === 'contact:f03_zhou_sanniang'));
  assert.ok(silk.economicLife.shareholders.some((item) => item.personId === 'contact:f03_lu_qiaoyun'));
  const mill = play({
    'jiangnan-silk-path': 'f03-path-mill',
    'route-jiangnan-silk-reeling-mill-worker-1946': 'f03-mill-finishing-group',
  }, '女', 343);
  assert.ok(mill.economicLife.enterprises.some((item) => item.employees === 3));
  assert.ok(mill.economicLife.debts.some((item) => item.purpose.includes('雇员工资')));
  assert.ok(mill.economicLife.licenses.some((item) => item.scope.includes('不含原丝厂')));
});

test('F03 era events are source-linked and ordinary silk work never automates political identity', () => {
  const profiles = ['jiangnan-tenant-water-farmer', 'jiangnan-sericulture-silk-household', 'jiangnan-silk-reeling-mill-worker'].map((key) => Content.publicRouteProfiles[key]);
  assert.ok(profiles.every((profile) => /不自动|另经/.test(profile.covertRole)));
  assert.ok(profiles.every((profile) => /不提供|不把|不以/.test(profile.infiltrationRole)));
  const state = play({ 'public-life-contact': 'keep-public-distance' }, '女', 351);
  assert.equal(state.publicLife.status, 'unaffiliated');
  assert.ok(state.eraHistory.some((entry) => entry.year === 1931));
  assert.ok(state.eraHistory.some((entry) => entry.year === 1954));
  assert.equal(state.contactHistory.filter((entry) => /顾阿水|周三娘/.test(entry.title || '') && /去世/.test(entry.title || '')).length <= 2, true);
  ['周三娘', '陆巧云', '俞茂生', '钱伯衡'].forEach((label) => {
    assert.equal(Object.values(state.contacts).filter((contact) => contact.label === label).length, 1, `${label} must stay one person across family and work roles`);
    assert.ok(state.facts.filter((fact) => fact.id.startsWith('contact-death:') && fact.text.startsWith(`${label}在`)).length <= 1, `${label} cannot die twice`);
  });
});
