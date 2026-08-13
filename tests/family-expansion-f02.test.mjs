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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together', 'midlife-responsibility': 'household-first',
  'subei-artisan-child-skill-1918': 'f02-child-follow-repair', 'subei-artisan-customer-debt-1920': 'f02-debt-part-grain',
  'subei-artisan-path': 'f02-repair-trial', 'subei-artisan-market-break-1938': 'f02-break-near-repair',
  'postwar-settlement': 'rebuild-local', 'final-1949': 'stay-mainland', 'post49-arrival': 'mainland-local-work',
  'later-life-livelihood': 'change-work', 'later-life-relationships': 'build-local-network', 'late-life-care': 'community-care',
  'late-life-record': 'sort-records', 'public-life-contact': 'keep-public-distance', 'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range', 'public-past-after-1949': 'state-confirmed-public-past',
};

function play(decisions, gender = '女', seed = 210) {
  const state = Game.createGame({ familyKey: 'subeiartisans', gender, name: gender === '女' ? '丁守兰' : '丁守成', seed });
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

test('F02 is the sixteenth playable family and adds the mobile rural vendor domain', () => {
  assert.equal(Content.version, '0.7.15');
  assert.equal(Content.designRegistry.families.F02.runtimeStatus, 'playable-verified');
  assert.equal(Content.runtimeFamilyDesignMap.subeiartisans, 'F02');
  assert.equal(Object.keys(Content.families).length, 16);
  assert.equal(Object.keys(Content.routes).length, 50);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 33);
  assert.deepEqual([
    Content.legacyRouteDomainMap['subei-village-tool-repairer'],
    Content.legacyRouteDomainMap['subei-itinerant-market-vendor'],
    Content.legacyRouteDomainMap['subei-market-stall-shopkeeper'],
  ], ['D04', 'D13', 'D05']);
});

test('F02 repairer, mobile vendor and stallkeeper each reach a concrete death', () => {
  const cases = [
    ['f02-repair-trial', 'subei-village-tool-repairer', '男'],
    ['f02-vendor-trial', 'subei-itinerant-market-vendor', '女'],
    ['f02-stall-trial', 'subei-market-stall-shopkeeper', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'subei-artisan-path': choice }, gender, 210 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F02');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace && record.employer && record.supervisor));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F02 uses gendered opportunity profiles without closing any route to either gender', () => {
  const maleRepair = play({ 'subei-artisan-path': 'f02-repair-trial' }, '男', 220);
  const femaleRepair = play({ 'subei-artisan-path': 'f02-repair-trial' }, '女', 221);
  const maleVendor = play({ 'subei-artisan-path': 'f02-vendor-trial' }, '男', 222);
  const femaleVendor = play({ 'subei-artisan-path': 'f02-vendor-trial' }, '女', 223);
  assert.notEqual(maleRepair.careerHistory.find((entry) => entry.routeKey === 'subei-village-tool-repairer').role, femaleRepair.careerHistory.find((entry) => entry.routeKey === 'subei-village-tool-repairer').role);
  assert.notEqual(maleVendor.careerHistory.find((entry) => entry.routeKey === 'subei-itinerant-market-vendor').role, femaleVendor.careerHistory.find((entry) => entry.routeKey === 'subei-itinerant-market-vendor').role);
  assert.ok(femaleRepair.genderContext.rule.includes('性别影响可见机会'));
});

test('F02 publishes twenty-four source-linked scenes and thirty choice consequences', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => /^f02-s\d+$/.test(String(scene.id)));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f02-'));
  assert.equal(baseScenes.length, 24);
  assert.equal(echoes.length, 30);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(Content.contentRegistries.sources['SRC-F02-ZHENJIANG-CHAMBER']);
  assert.ok(Content.contentRegistries.sources['SRC-F02-FLOOD-1931']);
  assert.ok(Content.contentRegistries.sources['SRC-F02-HUAI-CONTROL']);
});

test('F02 keeps customer goods, family tools, stock, debt and payment authority separate', () => {
  const repair = play({
    'subei-artisan-path': 'f02-repair-trial',
    'route-subei-village-tool-repairer-1929': 'f02-repair-inspect-old-damage',
  }, '女', 231);
  assert.ok(repair.annualNarratives.some((entry) => entry.id === 'echo-f02-repair-inspect'));
  assert.ok(repair.facts.some((fact) => fact.text.includes('返工争议')));
  assert.ok(repair.contacts.f02_repair_customer.role.includes('等待试用、返工和结算答复'));
  const stall = play({
    'subei-artisan-path': 'f02-stall-trial',
    'route-subei-market-stall-shopkeeper-1929': 'f02-stall-end-shared-cashbox',
  }, '女', 232);
  assert.ok(stall.facts.some((fact) => fact.text.includes('取消合摊共用钱匣')));
  assert.equal(stall.subjects.mother.agency >= 98, true);
  assert.ok(stall.contacts.f02_shop_supervisor.role.includes('各自货、钱和欠账'));
});

test('F02 enterprises record employees, tools, supplier debt, registration and independent partners', () => {
  const repair = play({
    'subei-artisan-path': 'f02-repair-trial',
    'route-subei-village-tool-repairer-1946': 'f02-repair-limited-workshop',
  }, '男', 241);
  assert.ok(repair.economicLife.enterprises.some((item) => item.name === '苏北合成成桂农具修配作坊' && item.employees === 2));
  assert.ok(repair.economicLife.shareholders.some((item) => item.personId === 'contact:f02_repair_coworker'));
  const vendor = play({
    'subei-artisan-path': 'f02-vendor-trial',
    'route-subei-itinerant-market-vendor-1946': 'f02-vendor-limited-haul-coop',
  }, '女', 242);
  assert.ok(vendor.economicLife.enterprises.some((item) => item.employees === 2));
  assert.ok(vendor.economicLife.shareholders.some((item) => item.personId === 'contact:f02_ge_lanying'));
  assert.ok(vendor.economicLife.shareholders.some((item) => item.personId === 'contact:f02_xu_cuifeng'));
  const shop = play({
    'subei-artisan-path': 'f02-stall-trial',
    'route-subei-market-stall-shopkeeper-1946': 'f02-shop-limited-partnership',
  }, '女', 243);
  assert.ok(shop.economicLife.enterprises.some((item) => item.employees === 3));
  assert.ok(shop.economicLife.debts.some((item) => item.purpose.includes('雇员工资')));
  assert.ok(shop.economicLife.licenses.some((item) => item.scope.includes('不含铺面产权')));
});

test('F02 era events are source-linked and ordinary market work never automates political identity', () => {
  const profiles = ['subei-village-tool-repairer', 'subei-itinerant-market-vendor', 'subei-market-stall-shopkeeper'].map((key) => Content.publicRouteProfiles[key]);
  assert.ok(profiles.every((profile) => /不自动|另经/.test(profile.covertRole)));
  assert.ok(profiles.every((profile) => /不提供|不把|不以/.test(profile.infiltrationRole)));
  const state = play({ 'public-life-contact': 'keep-public-distance' }, '女', 251);
  assert.equal(state.publicLife.status, 'unaffiliated');
  assert.ok(state.eraHistory.some((entry) => entry.year === 1931));
  assert.ok(state.eraHistory.some((entry) => entry.year === 1951));
  assert.equal(state.contactHistory.filter((entry) => /丁守义|葛兰英/.test(entry.title || '') && /去世/.test(entry.title || '')).length <= 2, true);
});
