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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together', 'midlife-responsibility': 'household-first',
  'hankou-commerce-path': 'trading-house-clerk-trial',
  'route-hankou-trading-house-clerk-1929': 'clerk-sign-verified-scope', 'route-hankou-trading-house-clerk-1946': 'clerk-remain-salaried',
  'route-hankou-warehouse-freight-clerk-1929': 'warehouse-seal-and-trace', 'route-hankou-warehouse-freight-clerk-1946': 'warehouse-salaried-tally',
  'route-hankou-dry-goods-small-trader-1929': 'trader-written-installments', 'route-hankou-dry-goods-small-trader-1946': 'trader-remain-salaried-manager',
  'hankou-commerce-credit-1921': 'credit-protect-home-reduce-stock', 'hankou-commerce-war': 'hankou-commerce-split-addresses-stock',
  'hankou-commerce-transition-1948': 'hankou-commerce-keep-current-ledgers', 'postwar-settlement': 'rebuild-local', 'final-1949': 'stay-mainland',
  'post49-arrival': 'mainland-local-work', 'later-life-livelihood': 'change-work', 'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care', 'late-life-record': 'sort-records', 'public-life-contact': 'keep-public-distance',
  'wartime-public-role': 'wartime-open-service', 'public-family-boundary': 'tell-family-risk-range', 'public-past-after-1949': 'state-confirmed-public-past',
};

function play(decisions, gender = '男', seed = 1210) {
  const state = Game.createGame({ familyKey: 'hankoucommerce', gender, name: gender === '女' ? '罗慧安' : '罗绍安', seed });
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

test('F12 is the thirteenth playable family with three concrete commercial routes', () => {
  assert.equal(Content.version, '0.7.12');
  assert.equal(Content.designRegistry.families.F12.runtimeStatus, 'playable-verified');
  assert.equal(Content.runtimeFamilyDesignMap.hankoucommerce, 'F12');
  assert.equal(Object.keys(Content.families).length, 13);
  assert.equal(Object.keys(Content.routes).length, 41);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 26);
});

test('F12 clerk, warehouse-wholesale and small-trader routes reach concrete deaths', () => {
  const cases = [
    ['trading-house-clerk-trial', 'hankou-trading-house-clerk', '男'],
    ['warehouse-freight-trial', 'hankou-warehouse-freight-clerk', '女'],
    ['dry-goods-trader-trial', 'hankou-dry-goods-small-trader', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'hankou-commerce-path': choice }, gender, 1210 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F12');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace && record.employer && record.supervisor));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F12 shared paths model gendered opportunities rather than pronoun swaps', () => {
  const maleClerk = play({ 'hankou-commerce-path': 'trading-house-clerk-trial' }, '男', 1220);
  const femaleClerk = play({ 'hankou-commerce-path': 'trading-house-clerk-trial' }, '女', 1221);
  const maleWarehouse = play({ 'hankou-commerce-path': 'warehouse-freight-trial' }, '男', 1222);
  const femaleWarehouse = play({ 'hankou-commerce-path': 'warehouse-freight-trial' }, '女', 1223);
  assert.notEqual(maleClerk.careerHistory.find((entry) => entry.routeKey === 'hankou-trading-house-clerk').role, femaleClerk.careerHistory.find((entry) => entry.routeKey === 'hankou-trading-house-clerk').role);
  assert.notEqual(maleWarehouse.careerHistory.find((entry) => entry.routeKey === 'hankou-warehouse-freight-clerk').role, femaleWarehouse.careerHistory.find((entry) => entry.routeKey === 'hankou-warehouse-freight-clerk').role);
  assert.ok(femaleWarehouse.genderContext.rule.includes('性别影响可见机会'));
});

test('F12 publishes twenty-four source-linked scenes and thirty choice echoes', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => /^f12-s\d+$/.test(String(scene.id)));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f12-'));
  assert.equal(baseScenes.length, 24);
  assert.equal(echoes.length, 30);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(Content.contentRegistries.sources['SRC-F12-HANKOU-CHAMBER']);
  assert.ok(Content.contentRegistries.sources['SRC-F12-JIANGHAN-ROAD']);
  assert.ok(Content.contentRegistries.sources['SRC-F12-HANKOU-MAY-1949']);
});

test('F12 cargo, guarantees and bad debt preserve owners, workers and unknowns', () => {
  const warehouse = play({
    'hankou-commerce-path': 'warehouse-freight-trial',
    'route-hankou-warehouse-freight-clerk-1929': 'warehouse-witness-only',
  }, '女', 1231);
  assert.ok(warehouse.annualNarratives.some((entry) => entry.id === 'echo-f12-warehouse-witness'));
  const clerk = play({ 'route-hankou-trading-house-clerk-1929': 'clerk-refuse-unclear-guarantee' }, '男', 1232);
  assert.ok(clerk.facts.some((fact) => fact.text.includes('拒绝为未知货值')));
  assert.equal(clerk.subjects.mother.agency >= 90, true);
  const trader = play({
    'hankou-commerce-path': 'dry-goods-trader-trial',
    'route-hankou-dry-goods-small-trader-1929': 'trader-write-off-reduce-stock',
  }, '女', 1233);
  assert.ok(trader.facts.some((fact) => fact.text.includes('确认一笔坏账')));
});

test('F12 enterprises record employees, stock, debts, licenses and independent partners', () => {
  const clerk = play({ 'route-hankou-trading-house-clerk-1946': 'clerk-limited-trading-partnership' }, '男', 1241);
  assert.ok(clerk.economicLife.enterprises.some((item) => item.name === '汉口合成安琴日用行号' && item.employees === 2));
  assert.ok(clerk.economicLife.debts.some((item) => item.purpose.includes('首批库存')));
  const trader = play({
    'hankou-commerce-path': 'dry-goods-trader-trial',
    'route-hankou-dry-goods-small-trader-1946': 'trader-limited-dry-goods-shop',
  }, '女', 1242);
  assert.ok(trader.economicLife.enterprises.some((item) => item.employees === 2));
  assert.ok(trader.economicLife.shareholders.some((item) => item.personId === 'parent:mother'));
  assert.ok(trader.economicLife.shareholders.some((item) => item.personId === 'contact:f12_jiang_xiuying'));
  assert.ok(trader.economicLife.licenses.some((item) => item.kind === 'documented-retail-shop-registration'));
});

test('F12 commercial occupation and customer access never imply political identity', () => {
  const profiles = ['hankou-trading-house-clerk', 'hankou-warehouse-freight-clerk', 'hankou-dry-goods-small-trader'].map((key) => Content.publicRouteProfiles[key]);
  assert.ok(profiles.every((profile) => /另经|独立/.test(profile.covertRole)));
  const state = play({ 'public-life-contact': 'keep-public-distance' }, '女', 1251);
  assert.equal(state.publicLife.status, 'unaffiliated');
  assert.ok(state.facts.some((fact) => /没有参加.*组织/.test(fact.text)));
});
