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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together', 'midlife-responsibility': 'household-first',
  'northchina-farm-child-work-1918': 'f07-child-farm', 'northchina-famine-1921': 'f07-famine-ration-seed',
  'northchina-farm-path': 'f07-path-vendor', 'northchina-farm-war-1937': 'f07-war-stay-village',
  'postwar-settlement': 'rebuild-local', 'final-1949': 'stay-mainland', 'post49-arrival': 'mainland-local-work',
  'later-life-livelihood': 'change-work', 'later-life-relationships': 'build-local-network', 'late-life-care': 'community-care',
  'late-life-record': 'sort-records', 'public-life-contact': 'keep-public-distance', 'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range', 'public-past-after-1949': 'state-confirmed-public-past',
};

function play(decisions, gender = '女', seed = 710) {
  const state = Game.createGame({ familyKey: 'northchinadroughtfarm', gender, name: gender === '女' ? '赵秋禾' : '赵守田', seed });
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

test('F07 completes all eighteen playable families while reusing honest canonical domains', () => {
  assert.equal(Content.version, '0.7.17');
  assert.equal(Content.designRegistry.families.F07.runtimeStatus, 'playable-verified');
  assert.equal(Content.runtimeFamilyDesignMap.northchinadroughtfarm, 'F07');
  assert.equal(Object.keys(Content.families).length, 18);
  assert.equal(Object.keys(Content.routes).length, 56);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 33);
  assert.deepEqual([
    Content.legacyRouteDomainMap['northchina-seasonal-farm-laborer'],
    Content.legacyRouteDomainMap['northchina-temple-fair-vendor'],
    Content.legacyRouteDomainMap['northchina-railway-maintenance-worker'],
  ], ['D02', 'D05', 'D09']);
});

test('F07 farm labor, temple-fair trade and railway maintenance each reach a concrete death', () => {
  const cases = [
    ['f07-path-seasonal', 'northchina-seasonal-farm-laborer', '男'],
    ['f07-path-vendor', 'northchina-temple-fair-vendor', '女'],
    ['f07-path-rail', 'northchina-railway-maintenance-worker', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'northchina-farm-path': choice }, gender, 710 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F07');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace && record.employer && record.supervisor));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F07 uses gendered historical opportunity profiles without closing a route', () => {
  const maleFarm = play({ 'northchina-farm-path': 'f07-path-seasonal' }, '男', 720);
  const femaleFarm = play({ 'northchina-farm-path': 'f07-path-seasonal' }, '女', 721);
  const maleRail = play({ 'northchina-farm-path': 'f07-path-rail' }, '男', 722);
  const femaleRail = play({ 'northchina-farm-path': 'f07-path-rail' }, '女', 723);
  assert.notEqual(maleFarm.careerHistory.find((entry) => entry.routeKey === 'northchina-seasonal-farm-laborer').role, femaleFarm.careerHistory.find((entry) => entry.routeKey === 'northchina-seasonal-farm-laborer').role);
  assert.notEqual(maleRail.careerHistory.find((entry) => entry.routeKey === 'northchina-railway-maintenance-worker').role, femaleRail.careerHistory.find((entry) => entry.routeKey === 'northchina-railway-maintenance-worker').role);
  assert.ok(femaleRail.genderContext.rule.includes('性别影响可见机会'));
});

test('F07 publishes twenty-four source-linked scenes and thirty choice consequences', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => /^f07-s\d+$/.test(String(scene.id)));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f07-'));
  assert.equal(baseScenes.length, 24);
  assert.equal(echoes.length, 30);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(Content.contentRegistries.sources['SRC-F07-HEBEI-ARCHIVE']);
  assert.ok(Content.contentRegistries.sources['SRC-F07-TEMPLE-FAIR']);
  assert.ok(Content.contentRegistries.sources['SRC-F07-LUGOU-1937']);
});

test('F07 keeps maternal animal rights, wage evidence, vendor stock and railway tools separate', () => {
  const farm = play({
    'northchina-farm-path': 'f07-path-seasonal',
    'route-northchina-seasonal-farm-laborer-1929': 'f07-seasonal-partial-leave',
  }, '女', 731);
  assert.ok(farm.annualNarratives.some((entry) => entry.id === 'echo-f07-seasonal-leave'));
  assert.ok(farm.facts.some((fact) => fact.text.includes('结束本次受雇')));
  assert.equal(farm.subjects.mother.agency >= 99, true);
  const rail = play({
    'northchina-farm-path': 'f07-path-rail',
    'route-northchina-railway-maintenance-worker-1929': 'f07-rail-leave-after-pay',
  }, '女', 732);
  assert.ok(rail.facts.some((fact) => fact.text.includes('离开养路工段')));
  assert.ok(rail.contacts.f07_sun_yanfu.role.includes('自己的工票'));
  assert.ok(rail.contacts.f07_zhao_erning.role.includes('作自己选择'));
  assert.equal(rail.contacts.f07_zhao_erning.agency, 99);
});

test('F07 enterprises record employees, tools, debt, registration and independent partners', () => {
  const farm = play({
    'northchina-farm-path': 'f07-path-seasonal',
    'route-northchina-seasonal-farm-laborer-1946': 'f07-seasonal-limited-team',
  }, '男', 741);
  assert.ok(farm.economicLife.enterprises.some((item) => item.name === '华北合成田安农忙小队' && item.employees === 4));
  assert.ok(farm.economicLife.shareholders.some((item) => item.personId === 'contact:f07_farm_coworker'));
  const vendor = play({
    'northchina-farm-path': 'f07-path-vendor',
    'route-northchina-temple-fair-vendor-1946': 'f07-vendor-limited-haul',
  }, '女', 742);
  assert.ok(vendor.economicLife.enterprises.some((item) => item.employees === 2));
  assert.ok(vendor.economicLife.shareholders.some((item) => item.personId === 'contact:f07_feng_yuezhi'));
  const rail = play({
    'northchina-farm-path': 'f07-path-rail',
    'route-northchina-railway-maintenance-worker-1946': 'f07-rail-limited-repair',
  }, '女', 743);
  assert.ok(rail.economicLife.enterprises.some((item) => item.employees === 3));
  assert.ok(rail.economicLife.debts.some((item) => item.purpose.includes('雇员工资')));
  assert.ok(rail.economicLife.licenses.some((item) => item.scope.includes('不含铁路线路')));
});

test('F07 era events are source-linked and ordinary work never automates political identity or duplicate people', () => {
  const profiles = ['northchina-seasonal-farm-laborer', 'northchina-temple-fair-vendor', 'northchina-railway-maintenance-worker'].map((key) => Content.publicRouteProfiles[key]);
  assert.ok(profiles.every((profile) => /不自动|另经/.test(profile.covertRole)));
  assert.ok(profiles.every((profile) => /不提供|不把|不以/.test(profile.infiltrationRole)));
  const state = play({ 'public-life-contact': 'keep-public-distance' }, '女', 751);
  assert.equal(state.publicLife.status, 'unaffiliated');
  assert.ok(state.eraHistory.some((entry) => entry.year === 1921));
  assert.ok(state.eraHistory.some((entry) => entry.year === 1950));
  ['杨素琴', '郭春亭', '冯月枝', '孙延福'].forEach((label) => {
    assert.equal(Object.values(state.contacts).filter((contact) => contact.label === label).length, 1, `${label} must stay one person across family and work roles`);
    assert.ok(state.facts.filter((fact) => fact.id.startsWith('contact-death:') && fact.text.startsWith(`${label}在`)).length <= 1, `${label} cannot die twice`);
  });
});
