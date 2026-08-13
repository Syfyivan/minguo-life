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

const Game = globalThis.MINGUO_GAME;

const DEFAULT_DECISIONS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'subei-livelihood': 'stay-local',
  'subei-war': 'stay-and-hide',
  'shen-path': 'scholar',
  'shen-war': 'move-with-family',
  'shanghai-path': 'business-heir',
  'shanghai-war': 'protect-workers',
  'sichuan-path': 'pharmacy-clerk',
  'sichuan-war': 'keep-verified-stock',
  'guanzhong-path': 'farm-water-work',
  'guanzhong-war': 'keep-family-address-ledger',
  'xian-path': 'repair-apprentice',
  'xian-war': 'civilian-repair-only',
  'shanghai-labor-path': 'textile-trial',
  'shanghai-labor-war': 'separate-address-work',
  'northeast-worker-path': 'railway-trial',
  'northeast-worker-system-change': 'stay-with-duty-boundary',
  'qiaoxiang-path': 'local-shop-trial',
  'qiaoxiang-war': 'split-address-and-accounts',
  'coastal-path': 'ship-ticket-trial',
  'coastal-war': 'coastal-split-addresses',
  'hankou-port-path': 'dock-cargo-trial',
  'hankou-flood-1931': 'flood-move-people-tools-first',
  'hankou-port-war': 'hankou-split-addresses-reserves',
  'tianjin-clerk-path': 'commercial-clerk-trial',
  'tianjin-rent-school-1921': 'tianjin-protect-rent-pause-school',
  'tianjin-clerk-war': 'tianjin-split-records-addresses',
  'tianjin-postwar-reorganization-1948': 'tianjin-keep-current-records',
  'hankou-commerce-path': 'trading-house-clerk-trial',
  'hankou-commerce-credit-1921': 'credit-protect-home-reduce-stock',
  'hankou-commerce-war': 'hankou-commerce-split-addresses-stock',
  'hankou-commerce-transition-1948': 'hankou-commerce-keep-current-ledgers',
  'northeast-settler-path': 'seasonal-farm-trial',
  'northeast-settler-winter-debt-1921': 'winter-keep-seed-food',
  'northeast-settler-occupation': 'settler-split-addresses-records',
  'northeast-settler-transition-1948': 'settler-keep-current-records',
  'southwest-housing-ration-1937': 'f15-renew-rented-courtyard',
  'southwest-air-raid-1939': 'f15-air-raid-people-first',
  'southwest-warworker-path': 'f15-warehouse-trial',
  'southwest-transition-1948': 'f15-transition-stay-southwest',
  'f15-public-contact-1945': 'f15-public-open-work',
  'f15-public-family-boundary-1946': 'f15-public-explain-scope',
  'f15-political-application-1947': 'f15-apply-ccp',
  'f15-public-role-1948': 'f15-public-continue-open',
  'f15-political-answer-1949': 'f15-accept-membership',
  'subei-artisan-child-skill-1918': 'f02-child-follow-repair',
  'subei-artisan-customer-debt-1920': 'f02-debt-part-grain',
  'subei-artisan-path': 'f02-repair-trial',
  'subei-artisan-market-break-1938': 'f02-break-near-repair',
  'jiangnan-silk-child-work-1918': 'f03-child-silkworm',
  'jiangnan-silk-credit-1928': 'f03-credit-formal-check',
  'jiangnan-silk-path': 'f03-path-sericulture',
  'jiangnan-silk-war-break-1937': 'f03-war-stay-water-farm',
  'northchina-farm-child-work-1918': 'f07-child-farm',
  'northchina-famine-1921': 'f07-famine-ration-seed',
  'northchina-farm-path': 'f07-path-seasonal',
  'northchina-farm-war-1937': 'f07-war-stay-village',
  'postwar-settlement': 'rebuild-local',
  'final-1949': 'stay-mainland',
  'later-life-livelihood': 'change-work',
  'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care',
  'late-life-record': 'sort-records',
  'public-life-contact': 'join-open-public-work',
  'political-organization-application': 'apply-ccp',
  'political-organization-answer': 'accept-membership',
  'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range',
  'public-past-after-1949': 'state-confirmed-public-past',
};

const ROUTE_SETUPS = {
  'subei-stay': { familyKey: 'subeipoor', gender: '男', decisions: { 'subei-livelihood': 'stay-local', 'subei-war': 'stay-and-hide' } },
  'subei-millworker': { familyKey: 'subeipoor', gender: '女', decisions: { 'subei-livelihood': 'enter-mill', 'subei-war': 'remain-worker' } },
  'subei-soldier': { familyKey: 'subeipoor', gender: '男', decisions: { 'subei-livelihood': 'stay-local', 'subei-war': 'join-army' } },
  'subei-refugee': { familyKey: 'subeipoor', gender: '女', decisions: { 'subei-livelihood': 'stay-local', 'subei-war': 'flee-south' } },
  'shen-scholar': { familyKey: 'jiangnanshen', gender: '男', decisions: { 'shen-path': 'scholar', 'shen-war': 'stay-public-work' } },
  'shen-newwoman': { familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'new-woman', 'shen-war': 'stay-public-work' } },
  'shen-refugee': { familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'new-woman', 'shen-war': 'move-with-family' } },
  'shen-professional': { familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'professional-service', 'shen-war': 'stay-public-work' } },
  'shanghai-heir': { familyKey: 'shanghaigongshang', gender: '男', decisions: { 'shanghai-path': 'business-heir', 'shanghai-war': 'protect-workers' } },
  'shanghai-newwoman': { familyKey: 'shanghaigongshang', gender: '女', decisions: { 'shanghai-path': 'urban-new-woman', 'shanghai-war': 'protect-workers' } },
  'shanghai-professional': { familyKey: 'shanghaigongshang', gender: '女', decisions: { 'shanghai-path': 'salaried-professional', 'shanghai-war': 'relocate-own-work' } },
  'sichuan-pharmacy': { familyKey: 'sichuanmedicine', gender: '男', decisions: { 'sichuan-path': 'pharmacy-clerk', 'sichuan-war': 'keep-verified-stock' } },
  'sichuan-foodshop': { familyKey: 'sichuanmedicine', gender: '女', decisions: { 'sichuan-path': 'food-shop', 'sichuan-war': 'local-food-substitute' } },
  'sichuan-care': { familyKey: 'sichuanmedicine', gender: '女', decisions: { 'sichuan-path': 'care-training', 'sichuan-war': 'split-family-work' } },
  'guanzhong-farmwater': { familyKey: 'guanzhongirrigation', gender: '男', decisions: { 'guanzhong-path': 'farm-water-work', 'guanzhong-war': 'keep-family-address-ledger' } },
  'guanzhong-market': { familyKey: 'guanzhongirrigation', gender: '女', decisions: { 'guanzhong-path': 'market-grain-work', 'guanzhong-war': 'split-work-with-addresses' } },
  'guanzhong-migration': { familyKey: 'guanzhongirrigation', gender: '男', decisions: { 'guanzhong-path': 'verified-migration-work', 'guanzhong-war': 'keep-family-address-ledger' } },
  'xian-repair': { familyKey: 'xianartisans', gender: '男', decisions: { 'xian-path': 'repair-apprentice', 'xian-war': 'civilian-repair-only' } },
  'xian-station': { familyKey: 'xianartisans', gender: '女', decisions: { 'xian-path': 'station-service', 'xian-war': 'documented-logistics-job' } },
  'xian-shop': { familyKey: 'xianartisans', gender: '女', decisions: { 'xian-path': 'shop-ledger-service', 'xian-war': 'keep-shop-civilian' } },
  'shanghai-textile-worker': { familyKey: 'shanghailabor', gender: '女', decisions: { 'shanghai-labor-path': 'textile-trial', 'shanghai-labor-war': 'separate-address-work' } },
  'shanghai-transport-worker': { familyKey: 'shanghailabor', gender: '男', decisions: { 'shanghai-labor-path': 'transport-trial', 'shanghai-labor-war': 'separate-address-work' } },
  'shanghai-domestic-service': { familyKey: 'shanghailabor', gender: '女', decisions: { 'shanghai-labor-path': 'domestic-service-trial', 'shanghai-labor-war': 'separate-address-work' } },
  'northeast-railway-worker': { familyKey: 'northeastrailworkers', gender: '女', decisions: { 'northeast-worker-path': 'railway-trial', 'northeast-worker-system-change': 'stay-with-duty-boundary' } },
  'northeast-mining-ground-worker': { familyKey: 'northeastrailworkers', gender: '男', decisions: { 'northeast-worker-path': 'mining-ground-trial', 'northeast-worker-system-change': 'stay-with-duty-boundary' } },
  'northeast-repair-worker': { familyKey: 'northeastrailworkers', gender: '女', decisions: { 'northeast-worker-path': 'repair-trial', 'northeast-worker-system-change': 'stay-with-duty-boundary' } },
  'qiaoxiang-local-shop': { familyKey: 'guangdongqiaoxiang', gender: '女', decisions: { 'qiaoxiang-path': 'local-shop-trial', 'qiaoxiang-war': 'split-address-and-accounts' } },
  'qiaopi-correspondence-clerk': { familyKey: 'guangdongqiaoxiang', gender: '男', decisions: { 'qiaoxiang-path': 'correspondence-trial', 'qiaoxiang-war': 'trace-through-public-channels' } },
  'qiaopi-remittance-clerk': { familyKey: 'guangdongqiaoxiang', gender: '女', decisions: { 'qiaoxiang-path': 'remittance-trial', 'qiaoxiang-war': 'split-address-and-accounts' } },
  'coastal-passenger-cargo-operator': { familyKey: 'guangdongcoastal', gender: '男', decisions: { 'coastal-path': 'ship-ticket-trial', 'coastal-war': 'coastal-split-addresses' } },
  'port-guesthouse-caterer': { familyKey: 'guangdongcoastal', gender: '女', decisions: { 'coastal-path': 'guesthouse-trial', 'coastal-war': 'coastal-split-addresses' } },
  'recorded-coastal-small-trader': { familyKey: 'guangdongcoastal', gender: '女', decisions: { 'coastal-path': 'recorded-trade-trial', 'coastal-war': 'coastal-split-addresses' } },
  'hankou-dock-cargo-worker': { familyKey: 'hankouport', gender: '男', decisions: { 'hankou-port-path': 'dock-cargo-trial', 'hankou-flood-1931': 'flood-move-people-tools-first', 'hankou-port-war': 'hankou-split-addresses-reserves' } },
  'hankou-rickshaw-worker': { familyKey: 'hankouport', gender: '男', decisions: { 'hankou-port-path': 'rickshaw-trial', 'hankou-flood-1931': 'flood-close-work-preserve-health', 'hankou-port-war': 'hankou-local-civilian-life' } },
  'hankou-river-street-food-stall': { familyKey: 'hankouport', gender: '女', decisions: { 'hankou-port-path': 'river-food-trial', 'hankou-flood-1931': 'flood-split-work-and-shelter', 'hankou-port-war': 'hankou-verified-work-move' } },
  'tianjin-commercial-clerk': { familyKey: 'tianjinclerks', gender: '男', decisions: { 'tianjin-clerk-path': 'commercial-clerk-trial', 'tianjin-clerk-war': 'tianjin-split-records-addresses' } },
  'tianjin-tailoring-garment-worker': { familyKey: 'tianjinclerks', gender: '女', decisions: { 'tianjin-clerk-path': 'tailoring-trial', 'tianjin-clerk-war': 'tianjin-local-bounded-work' } },
  'tianjin-postal-school-clerk': { familyKey: 'tianjinclerks', gender: '女', decisions: { 'tianjin-clerk-path': 'postal-school-trial', 'tianjin-clerk-war': 'tianjin-verified-unit-move' } },
  'hankou-trading-house-clerk': { familyKey: 'hankoucommerce', gender: '男', decisions: { 'hankou-commerce-path': 'trading-house-clerk-trial', 'hankou-commerce-war': 'hankou-commerce-split-addresses-stock' } },
  'hankou-warehouse-freight-clerk': { familyKey: 'hankoucommerce', gender: '女', decisions: { 'hankou-commerce-path': 'warehouse-freight-trial', 'hankou-commerce-war': 'hankou-commerce-verified-unit-move' } },
  'hankou-dry-goods-small-trader': { familyKey: 'hankoucommerce', gender: '女', decisions: { 'hankou-commerce-path': 'dry-goods-trader-trial', 'hankou-commerce-war': 'hankou-commerce-local-bounded-trade' } },
  'northeast-seasonal-farm-worker': { familyKey: 'northeastsettlers', gender: '男', decisions: { 'northeast-settler-path': 'seasonal-farm-trial', 'northeast-settler-occupation': 'settler-split-addresses-records' } },
  'northeast-household-farm-sideline': { familyKey: 'northeastsettlers', gender: '女', decisions: { 'northeast-settler-path': 'household-sideline-trial', 'northeast-settler-occupation': 'settler-remain-confirmed-livelihood' } },
  'northeast-rural-tool-repairer': { familyKey: 'northeastsettlers', gender: '女', decisions: { 'northeast-settler-path': 'rural-repair-trial', 'northeast-settler-occupation': 'settler-verify-station-bed-work' } },
  'southwest-wartime-warehouse-supply': { familyKey: 'southwestwarworkers', gender: '男', decisions: { 'southwest-warworker-path': 'f15-warehouse-trial' } },
  'southwest-mechanical-drawing-repair': { familyKey: 'southwestwarworkers', gender: '女', decisions: { 'southwest-warworker-path': 'f15-repair-drawing-trial' } },
  'southwest-clinic-records-clerk': { familyKey: 'southwestwarworkers', gender: '女', decisions: { 'southwest-warworker-path': 'f15-records-trial' } },
  'subei-village-tool-repairer': { familyKey: 'subeiartisans', gender: '男', decisions: { 'subei-artisan-path': 'f02-repair-trial' } },
  'subei-itinerant-market-vendor': { familyKey: 'subeiartisans', gender: '女', decisions: { 'subei-artisan-path': 'f02-vendor-trial' } },
  'subei-market-stall-shopkeeper': { familyKey: 'subeiartisans', gender: '女', decisions: { 'subei-artisan-path': 'f02-stall-trial' } },
  'jiangnan-tenant-water-farmer': { familyKey: 'jiangnansilkwater', gender: '男', decisions: { 'jiangnan-silk-path': 'f03-path-tenant' } },
  'jiangnan-sericulture-silk-household': { familyKey: 'jiangnansilkwater', gender: '女', decisions: { 'jiangnan-silk-path': 'f03-path-sericulture' } },
  'jiangnan-silk-reeling-mill-worker': { familyKey: 'jiangnansilkwater', gender: '女', decisions: { 'jiangnan-silk-path': 'f03-path-mill' } },
  'northchina-seasonal-farm-laborer': { familyKey: 'northchinadroughtfarm', gender: '男', decisions: { 'northchina-farm-path': 'f07-path-seasonal' } },
  'northchina-temple-fair-vendor': { familyKey: 'northchinadroughtfarm', gender: '女', decisions: { 'northchina-farm-path': 'f07-path-vendor' } },
  'northchina-railway-maintenance-worker': { familyKey: 'northchinadroughtfarm', gender: '女', decisions: { 'northchina-farm-path': 'f07-path-rail' } },
};

const POST1949_OPTIONS = {
  mainland: 'stay-mainland',
  'hong-kong': 'move-hong-kong',
  taiwan: 'move-taiwan',
  macau: 'move-macau',
  'southeast-asia': 'move-southeast-asia',
  overseas: 'move-overseas',
  'in-motion': 'remain-in-motion',
  unsettled: 'leave-unsettled',
};

function cloneSetup(setup) {
  return { ...setup, decisions: { ...(setup.decisions || {}) } };
}

function setupForFamily(familyKey) {
  if (familyKey === 'subeipoor') return cloneSetup(ROUTE_SETUPS['subei-stay']);
  if (familyKey === 'jiangnanshen') return cloneSetup(ROUTE_SETUPS['shen-scholar']);
  if (familyKey === 'shanghaigongshang') return cloneSetup(ROUTE_SETUPS['shanghai-heir']);
  if (familyKey === 'sichuanmedicine') return cloneSetup(ROUTE_SETUPS['sichuan-pharmacy']);
  if (familyKey === 'guanzhongirrigation') return cloneSetup(ROUTE_SETUPS['guanzhong-farmwater']);
  if (familyKey === 'shanghailabor') return cloneSetup(ROUTE_SETUPS['shanghai-textile-worker']);
  if (familyKey === 'northeastrailworkers') return cloneSetup(ROUTE_SETUPS['northeast-railway-worker']);
  if (familyKey === 'guangdongqiaoxiang') return cloneSetup(ROUTE_SETUPS['qiaoxiang-local-shop']);
  if (familyKey === 'guangdongcoastal') return cloneSetup(ROUTE_SETUPS['coastal-passenger-cargo-operator']);
  if (familyKey === 'hankouport') return cloneSetup(ROUTE_SETUPS['hankou-dock-cargo-worker']);
  if (familyKey === 'tianjinclerks') return cloneSetup(ROUTE_SETUPS['tianjin-commercial-clerk']);
  if (familyKey === 'hankoucommerce') return cloneSetup(ROUTE_SETUPS['hankou-trading-house-clerk']);
  if (familyKey === 'northeastsettlers') return cloneSetup(ROUTE_SETUPS['northeast-seasonal-farm-worker']);
  if (familyKey === 'southwestwarworkers') return cloneSetup(ROUTE_SETUPS['southwest-wartime-warehouse-supply']);
  if (familyKey === 'subeiartisans') return cloneSetup(ROUTE_SETUPS['subei-village-tool-repairer']);
  if (familyKey === 'jiangnansilkwater') return cloneSetup(ROUTE_SETUPS['jiangnan-sericulture-silk-household']);
  if (familyKey === 'northchinadroughtfarm') return cloneSetup(ROUTE_SETUPS['northchina-seasonal-farm-laborer']);
  return cloneSetup(ROUTE_SETUPS['xian-repair']);
}

function playScenario({
  familyKey,
  gender = '男',
  name = '测试角色',
  seed = 7,
  decisions = {},
  actionPicker = () => [],
  prepareDecision = () => {},
}) {
  const state = Game.createGame({ familyKey, gender, name, seed });
  const decisionMap = { ...DEFAULT_DECISIONS, ...decisions };
  let turns = 0;

  while (!state.over && turns < 140) {
    const actionIds = actionPicker(state, Game.availableActions(state));
    Game.advanceYear(state, actionIds);
    while (state.pendingDecision) {
      const decision = state.pendingDecision;
      prepareDecision(state, decision);
      const requested = decisionMap[decision.id];
      const available = decision.options.filter((option) => option.enabled && !option.hidden);
      const option = available.find((item) => item.id === requested) || available[0];
      assert.ok(option, `decision ${decision.id} must have an available option`);
      Game.choose(state, option.id);
    }
    turns += 1;
  }

  assert.equal(state.over, true, `${familyKey} scenario should reach an ending`);
  assert.ok(turns < 140, `${familyKey} scenario should not stall`);
  return state;
}

test('a player keeps the same identity while moving between life routes', () => {
  const state = playScenario({
    familyKey: 'subeipoor',
    name: '李禾生',
    decisions: { 'subei-war': 'flee-south' },
  });

  assert.equal(state.identity.name, '李禾生');
  assert.equal(state.routeKey, 'subei-refugee');
  assert.match(Game.buildEndingNarrative(state), /李禾生/);
  assert.doesNotMatch(Game.buildEndingNarrative(state), /赵长庚/);
});

test('the four Subei routes are all reachable through explicit decisions', () => {
  const cases = [
    [{ 'subei-livelihood': 'stay-local', 'subei-war': 'stay-and-hide' }, 'subei-stay'],
    [{ 'subei-livelihood': 'stay-local', 'subei-war': 'join-army' }, 'subei-soldier'],
    [{ 'subei-livelihood': 'stay-local', 'subei-war': 'flee-south' }, 'subei-refugee'],
    [{ 'subei-livelihood': 'enter-mill', 'subei-war': 'remain-worker' }, 'subei-millworker'],
  ];

  for (const [decisions, expectedRoute] of cases) {
    const state = playScenario({ familyKey: 'subeipoor', gender: '女', decisions });
    assert.equal(state.routeKey, expectedRoute);
  }
});

test('new-woman routes preserve the selected character identity', () => {
  const male = Game.createGame({ familyKey: 'jiangnanshen', gender: '男', name: '沈砚清', seed: 11 });
  const female = Game.createGame({ familyKey: 'jiangnanshen', gender: '女', name: '沈毓宁', seed: 11 });

  while (male.year < 1921) {
    Game.advanceYear(male, []);
    while (male.pendingDecision) Game.choose(male, male.pendingDecision.options.find((option) => option.enabled).id);
  }
  while (female.year < 1921) {
    Game.advanceYear(female, []);
    while (female.pendingDecision) Game.choose(female, female.pendingDecision.options.find((option) => option.enabled).id);
  }
  Game.advanceYear(male, []);
  Game.advanceYear(female, []);

  assert.equal(male.pendingDecision.options.find((option) => option.id === 'new-woman').enabled, false);
  assert.equal(female.pendingDecision.options.find((option) => option.id === 'new-woman').enabled, true);
});

test('a subject death is recorded as occurrence and later confirmation', () => {
  const state = playScenario({
    familyKey: 'subeipoor',
    decisions: { 'subei-war': 'join-army' },
  });

  const occurrence = state.facts.find((fact) => fact.id === 'mother-death-occurred');
  const confirmation = state.facts.find((fact) => fact.id === 'mother-death-confirmed');
  assert.ok(occurrence);
  assert.ok(confirmation);
  assert.ok(occurrence.year < confirmation.year);
  assert.equal(state.subjects.mother.status, 'dead-confirmed');
});

test('a spouse gets an independent wartime response instead of waiting by default', () => {
  const state = playScenario({
    familyKey: 'subeipoor',
    decisions: { 'subei-war': 'join-army' },
  });

  assert.notEqual(state.subjects.spouse.status, 'waiting-by-default');
  assert.ok(state.facts.some((fact) => fact.id === 'spouse-autonomy'));
});

test('information channels change what the player can name about an era shock', () => {
  const uninformed = playScenario({
    familyKey: 'shanghaigongshang',
    decisions: { education: 'learn-work' },
  });
  const informed = playScenario({
    familyKey: 'shanghaigongshang',
    actionPicker(state, available) {
      if (state.year < 1938 && available.some((action) => action.id === 'read-newspaper')) {
        return ['read-newspaper'];
      }
      return [];
    },
  });

  assert.ok(uninformed.unknownImpacts.includes('gold-yuan-1948'));
  assert.ok(informed.knownEvents.includes('gold-yuan-1948'));
  assert.ok(informed.information.channels.includes('newspaper'));
});

test('all eighteen playable families continue beyond 1949 and end only after a confirmed death', () => {
  const scenarios = Object.keys(Game.content.families).map((familyKey) => playScenario({ familyKey }));
  const bannedRanks = /成功|失败|安稳|挣扎|爬得很高|万幸/;

  for (const state of scenarios) {
    const ending = Game.buildEndingNarrative(state);
    assert.doesNotMatch(ending, bannedRanks);
    assert.ok(state.facts.some((fact) => fact.id === 'final-1949'));
    assert.ok(state.endYear > 1949);
    assert.equal(state.life.status, 'dead');
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-occurred'));
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
    assert.ok(state.life.deathPlace);
    assert.ok(state.life.cause);
    assert.ok(state.endingFacts.length >= 4);
  }
});

test('1949 is a milestone rather than an ending', () => {
  const state = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '李禾生', seed: 9 });
  const decisions = { ...DEFAULT_DECISIONS };
  while (state.year <= 1949 && !state.over) {
    Game.advanceYear(state, Game.recommendedActions(state));
    while (state.pendingDecision) {
      const requested = decisions[state.pendingDecision.id];
      const option = state.pendingDecision.options.find((item) => item.enabled && !item.hidden && item.id === requested)
        || state.pendingDecision.options.find((item) => item.enabled && !item.hidden);
      Game.choose(state, option.id);
    }
  }
  assert.equal(state.over, false);
  assert.equal(state.year, 1950);
  assert.equal(state.post1949Choice, 'mainland');
  assert.ok(state.facts.some((fact) => fact.id === 'final-1949' && fact.kind === 'milestone'));
});

test('eight post-1949 destinations are distinct and all continue to death', () => {
  for (const [path, optionId] of Object.entries(POST1949_OPTIONS)) {
    const state = playScenario({
      familyKey: 'shanghaigongshang',
      seed: 41,
      decisions: { 'final-1949': optionId },
      actionPicker(current, available) {
        const selected = [];
        let budget = current.spirit;
        const newspaper = available.find((action) => action.id === 'read-newspaper');
        const business = available.find((action) => action.id === 'run-business');
        if (newspaper && newspaper.spirit <= budget) { selected.push(newspaper.id); budget -= newspaper.spirit; }
        if (business && business.spirit <= budget) selected.push(business.id);
        return selected;
      },
      prepareDecision(current, decision) {
        if (decision.id !== 'final-1949') return;
        Object.keys(current.attrs).forEach((key) => { current.attrs[key] = 100; });
        Object.keys(current.res).forEach((key) => { current.res[key] = 100; });
        ['newspaper', 'conversation', 'books', 'storytelling'].forEach((channel) => {
          if (!current.information.channels.includes(channel)) current.information.channels.push(channel);
        });
      },
    });
    assert.equal(state.post1949Choice, path);
    assert.ok(state.post1949.arrival);
    assert.ok(state.post1949.livelihood);
    assert.ok(state.endYear > 1949);
    assert.equal(state.life.status, 'dead');
  }
});

test('the same seed and decisions reproduce the same life ledger', () => {
  const first = playScenario({ familyKey: 'jiangnanshen', seed: 42 });
  const second = playScenario({ familyKey: 'jiangnanshen', seed: 42 });
  assert.deepEqual(first.facts, second.facts);
  assert.deepEqual(first.routeHistory, second.routeHistory);
  assert.equal(Game.buildEndingNarrative(first), Game.buildEndingNarrative(second));
});

test('action previews explain direction without exposing exact stat deltas', () => {
  const state = Game.createGame({ familyKey: 'subeipoor', gender: '女', name: '李秀禾', seed: 17 });
  const play = Game.availableActions(state, { includeDisabled: true }).find((action) => action.id === 'play');
  const care = Game.availableActions(state, { includeDisabled: true }).find((action) => action.id === 'care-mother');
  const preview = Game.describeActionEffects(state, play);
  const carePreview = Game.describeActionEffects(state, care);

  assert.deepEqual(preview.gains, ['体魄', '心智']);
  assert.equal(preview.spiritKind, 'recover');
  assert.equal(preview.spiritAmount, 2);
  assert.ok(carePreview.affectedPeople.includes('母亲'));
  const talk = Game.availableActions(state, { includeDisabled: true }).find((action) => action.id === 'talk-neighbors');
  const talkPreview = Game.describeActionEffects(state, talk);
  assert.deepEqual(talkPreview.affectedPeople, ['周淑兰']);
});

test('locked actions use readable Chinese requirements', () => {
  const state = Game.createGame({ familyKey: 'jiangnanshen', gender: '男', name: '沈砚清', seed: 18 });
  const action = Game.availableActions(state, { includeDisabled: true }).find((item) => item.id === 'record-life-ledger');

  assert.equal(action.enabled, false);
  assert.doesNotMatch(action.disabledReason, /knowledge|money|body|mind/);
});

test('every played year receives one ordinary-life narrative', () => {
  const state = playScenario({ familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'new-woman' } });
  const years = state.annualNarratives.map((entry) => entry.year);

  assert.equal(years.length, state.endYear - state.identity.born + 1);
  assert.equal(new Set(years).size, years.length);
  assert.ok(state.annualNarratives.some((entry) => entry.kind === 'scene'));
  assert.ok(state.annualNarratives.some((entry) => entry.kind === 'rhythm'));
  assert.ok(state.annualNarratives.every((entry) => entry.text.length >= 80), 'every rendered annual scene should be a concrete small story');
});

test('choices are written as executable personal actions and locks explain the current gap', () => {
  const allLabels = Game.content.decisions.flatMap((decision) => decision.options.map((option) => option.label));
  for (const vague of ['进入队伍', '带能同行的人向南逃', '留在大陆', '迁往香港或台湾']) {
    assert.ok(!allLabels.includes(vague), `vague label should have been replaced: ${vague}`);
  }

  const state = Game.createGame({ familyKey: 'shanghaigongshang', gender: '男', name: '锁条件', seed: 21 });
  while (state.year < 1949 && !state.over) {
    Game.advanceYear(state, []);
    while (state.pendingDecision) {
      const option = state.pendingDecision.options.find((item) => item.enabled && !item.hidden);
      Game.choose(state, option.id);
    }
  }
  Game.advanceYear(state, []);
  const overseas = state.pendingDecision.options.find((option) => option.id === 'move-overseas');
  assert.equal(overseas.enabled, false);
  assert.match(overseas.disabledReason, /至少达到|需要先取得/);
  assert.match(overseas.disabledReason, /当前为|信息渠道/);
});

test('a death ending exposes seven coherent life chapters', () => {
  const state = playScenario({ familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'professional-service' } });
  const chapters = Game.buildLifeChapters(state);
  assert.deepEqual(chapters.map((chapter) => chapter.key), ['birth-family', 'livelihood', 'war', 'postwar', 'post1949', 'late-life', 'death']);
  assert.match(chapters.at(-1).text, /去世.*享年.*确认/);
  assert.match(Game.buildEndingNarrative(state), /出生与成长.*成年谋生.*战争转折.*1949 与后半生.*死亡与确认/);
});

test('persistent contacts keep their own history and can age or die independently', () => {
  const state = playScenario({
    familyKey: 'shanghaigongshang',
    gender: '女',
    decisions: { 'shanghai-path': 'urban-new-woman' },
    actionPicker(current, available) {
      const ids = available.map((action) => action.id);
      if (ids.includes('workroom')) return ['workroom'];
      if (ids.includes('talk-neighbors')) return ['talk-neighbors'];
      return [];
    },
  });

  assert.ok(state.contacts.tang_huizhen.relation > 26);
  assert.ok(['colleague', 'deceased'].includes(state.contacts.tang_huizhen.status));
  assert.ok(state.contacts.tang_huizhen.history.length > 0);
  assert.ok(state.contactHistory.some((entry) => entry.contactKey === 'tang_huizhen'));
});

test('family lifecycle allows care without forcing marriage or children', () => {
  const married = playScenario({ familyKey: 'jiangnanshen' });
  const unmarried = playScenario({
    familyKey: 'jiangnanshen',
    decisions: { marriage: 'refuse-marriage', 'family-future': 'raise-child-together' },
  });

  assert.equal(married.subjects.children.status, 'raising-child-together');
  assert.notEqual(unmarried.subjects.children.status, 'raising-child-together');
  assert.ok(unmarried.facts.some((fact) => fact.source === 'family-future'));
});

test('portable v0.7.17 saves round-trip without changing the life ledger', () => {
  const state = playScenario({ familyKey: 'subeipoor', decisions: { 'subei-war': 'join-army' } });
  const restored = Game.importGame(Game.exportGame(state));

  assert.equal(restored.version, '0.7.17');
  assert.equal(JSON.parse(Game.exportGame(restored)).schemaVersion, 6);
  assert.deepEqual(restored.identity, state.identity);
  assert.deepEqual(restored.facts, state.facts);
  assert.deepEqual(restored.annualNarratives, state.annualNarratives);
  assert.deepEqual(restored.contacts, state.contacts);
  assert.deepEqual(restored.decisionHistory, state.decisionHistory);
  assert.equal(Game.buildEndingNarrative(restored), Game.buildEndingNarrative(state));
});

test('abilities and resources stay inside the published 0 to 100 domain', () => {
  const state = playScenario({
    familyKey: 'shanghaigongshang',
    decisions: { 'shanghai-path': 'business-heir' },
    actionPicker(current, available) {
      const action = available.find((item) => item.id === 'run-business') || available.find((item) => item.id === 'learn-business');
      if (action) return action.spirit * 2 <= current.spirit ? [action.id, action.id] : [action.id];
      return [];
    },
  });

  for (const value of [...Object.values(state.attrs), ...Object.values(state.res)]) {
    assert.ok(value >= 0 && value <= 100, `state value ${value} must stay in the 0 to 100 domain`);
  }
});

test('v0.2 states receive v0.7 complete-life and public-life defaults on import', () => {
  const legacy = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '旧存档', seed: 19 });
  legacy.version = '0.2.0';
  delete legacy.contacts;
  delete legacy.annualNarratives;
  delete legacy.firedOrdinaryEvents;
  delete legacy.contactHistory;

  const restored = Game.importGame(legacy);
  assert.equal(restored.version, '0.7.17');
  assert.equal(restored.publicLife.status, 'unaffiliated');
  assert.equal(Object.keys(restored.contacts).length, 3);
  assert.deepEqual(restored.annualNarratives, []);
  assert.deepEqual(restored.contactHistory, []);
});

test('v0.4 endings at 1949 resume as an unfinished life in 1950', () => {
  const legacy = Game.createGame({ familyKey: 'shanghaigongshang', gender: '女', name: '旧版人物', seed: 49 });
  legacy.version = '0.4.0';
  legacy.year = 1949;
  legacy.age = legacy.year - legacy.identity.born;
  legacy.over = true;
  legacy.endYear = 1949;
  legacy.finalChoice = 'hktw';
  legacy.facts.push({ id: 'life-ended', year: 1949, text: '旧版终局。', ending: true });
  legacy.endingFacts = ['旧版在 1949 年结束'];
  legacy.endingNarrative = '旧版终局。';
  delete legacy.post1949Choice;
  delete legacy.post1949;
  delete legacy.life;

  const restored = Game.importGame(legacy);
  assert.equal(restored.version, '0.7.17');
  assert.equal(restored.over, false);
  assert.equal(restored.year, 1950);
  assert.equal(restored.chapter, 'post1949');
  assert.equal(restored.post1949Choice, 'hong-kong');
  assert.equal(restored.post1949.region, '迁往香港');
  assert.equal(restored.endYear, null);
  assert.equal(restored.endingNarrative, '');
  assert.ok(!restored.facts.some((fact) => fact.id === 'life-ended'));
  assert.ok(restored.milestones.some((milestone) => milestone.id === 'v04-save-continued'));
});

test('v0.5 saves replace leaked postwar route rhythms with the settled region', () => {
  const legacy = postwarState({ channel: true });
  legacy.version = '0.5.0';
  legacy.lastOrdinaryEvent = {
    year: 1950,
    id: 'rhythm:subei-soldier:1950',
    title: '年度日常',
    text: '点名以后，你在驻地等待下一次调动。',
    kind: 'rhythm',
    effects: { gains: [], risks: [], affectedPeople: [], channels: [] },
  };
  legacy.annualNarratives.push({ ...legacy.lastOrdinaryEvent });

  const restored = Game.importGame(legacy);
  assert.match(restored.lastOrdinaryEvent.id, /^rhythm:post-hong-kong:/);
  assert.match(restored.lastOrdinaryEvent.text, /香港|街坊|房租|床位|电车|渡轮/);
  assert.doesNotMatch(restored.lastOrdinaryEvent.text, /点名|驻地|军粮|下一次调动/);
  assert.equal(restored.annualNarratives.at(-1).id, restored.lastOrdinaryEvent.id);
});

test('recommended actions stay appropriate to the protagonist age and route', () => {
  const state = Game.createGame({ familyKey: 'shanghaigongshang', gender: '女', name: '成年人物', seed: 30 });
  while (state.year < 1930) {
    Game.advanceYear(state, []);
    while (state.pendingDecision) {
      const decision = state.pendingDecision;
      const requested = { ...DEFAULT_DECISIONS, 'shanghai-path': 'business-heir' }[decision.id];
      const available = decision.options.filter((option) => option.enabled && !option.hidden);
      Game.choose(state, available.find((option) => option.id === requested)?.id || available[0].id);
    }
  }

  const recommendations = Game.recommendedActions(state);
  assert.ok(recommendations.some((id) => ['run-business', 'learn-business', 'help-workers'].includes(id)));
  assert.ok(!recommendations.includes('learn-characters'));
});

function postwarState({ channel = false } = {}) {
  const state = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '后半生验收', seed: 1950 });
  state.year = 1950;
  state.age = state.year - state.identity.born;
  state.routeKey = 'subei-soldier';
  state.livelihoodKey = 'subei-stay';
  state.warTurnKey = 'subei-soldier';
  state.post1949Choice = 'hong-kong';
  state.post1949.choice = 'hong-kong';
  state.post1949.region = '迁往香港';
  state.post1949.place = '香港一处拥挤的街坊';
  state.chapter = 'post1949';
  if (channel) state.information.channels.push('newspaper');
  return state;
}

test('post-1949 daily stories use the new region instead of the former wartime route', () => {
  const state = postwarState();
  Game.advanceYear(state, []);

  assert.match(state.lastOrdinaryEvent.id, /^rhythm:post-hong-kong:/);
  assert.match(state.lastOrdinaryEvent.text, /香港|街坊|房租|床位|电车|渡轮/);
  assert.doesNotMatch(state.lastOrdinaryEvent.text, /点名|驻地|队伍|军粮|下一次调动/);
});

test('1950 keeps personal daily life and regional era updates as separate records', () => {
  const state = postwarState({ channel: true });
  Game.advanceYear(state, []);

  assert.equal(state.lastOrdinaryEvent.year, 1950);
  assert.ok(state.currentEraUpdates.length >= 2);
  assert.ok(state.currentEraUpdates.some((entry) => entry.id === 'korean-war-1950'));
  const hongKong = state.currentEraUpdates.find((entry) => entry.id === 'hongkong-population-1950');
  assert.equal(hongKong.scope, '香港');
  assert.equal(hongKong.known, true);
  assert.match(hongKong.text, /人口|住屋|床位|房租/);
  assert.ok(hongKong.source.url.startsWith('https://'));
  assert.ok(state.eraHistory.every((entry) => entry.year === 1950));
});

test('a Hong Kong introduction produces a concrete trial job and a next step in 1950', () => {
  const state = postwarState({ channel: true });
  Game.advanceYear(state, []);
  assert.equal(state.pendingDecision.id, 'post49-arrival');

  Game.choose(state, 'hongkong-use-contact');

  const employment = state.post1949.employment;
  assert.equal(employment.status, 'trial');
  assert.ok(employment.role);
  assert.ok(employment.workplace);
  assert.match(employment.lastResult, /面谈|试做/);
  assert.match(employment.lastResult, new RegExp(employment.role));
  assert.match(employment.nextStep, /试工|留用/);
  assert.ok(state.facts.some((fact) => fact.kind === 'livelihood' && fact.year === 1950));
});

test('the next livelihood action finishes a trial instead of searching forever', () => {
  const state = postwarState({ channel: true });
  Game.advanceYear(state, []);
  Game.choose(state, 'hongkong-use-contact');

  const presented = Game.availableActions(state).find((action) => action.id === 'hongkong-find-work');
  assert.match(presented.name, /完成.+试工.+留用/);
  Game.advanceYear(state, ['hongkong-find-work']);

  assert.equal(state.post1949.employment.status, 'employed');
  assert.match(state.post1949.employment.lastResult, /确认留用/);
  assert.doesNotMatch(state.post1949.employment.lastResult, /先试做|先试工/);
  assert.ok(state.lastActionFeedback.outcomes.some((outcome) => /确认留用/.test(outcome)));
  const continued = Game.availableActions(state).find((action) => action.id === 'hongkong-find-work');
  assert.match(continued.name, /继续在.+担任/);
  assert.doesNotMatch(continued.name, /寻找|应聘/);
});

test('all eight post-1949 destinations turn livelihood actions into explicit work states', () => {
  const actions = {
    mainland: 'mainland-rebuild-work',
    'hong-kong': 'hongkong-find-work',
    taiwan: 'taiwan-settle-work',
    macau: 'macau-inner-harbour-work',
    'southeast-asia': 'singapore-port-work',
    overseas: 'overseas-adapt-trade',
    'in-motion': 'motion-short-work',
    unsettled: 'unsettled-test-shelter',
  };
  for (const [path, actionId] of Object.entries(actions)) {
    const state = postwarState();
    state.post1949Choice = path;
    state.post1949.choice = path;
    state.firedDecisions.push('post49-arrival');
    Game.advanceYear(state, [actionId]);
    const employment = state.post1949.employment;
    assert.notEqual(employment.status, 'not-started', `${path} needs an employment state`);
    assert.notEqual(employment.status, 'seeking', `${path} action needs a same-year result`);
    assert.ok(employment.role, `${path} needs a concrete role`);
    assert.ok(employment.workplace, `${path} needs a concrete workplace`);
    assert.ok(employment.lastResult, `${path} needs an explicit outcome`);
    assert.ok(employment.nextStep, `${path} needs a next step`);
  }
});

test('old post-1949 saves expose the missing job record and recover on the next action', () => {
  const legacy = postwarState();
  legacy.version = '0.5.1';
  delete legacy.post1949.employment;
  const restored = Game.importGame(legacy);

  assert.equal(restored.post1949.employment.status, 'seeking');
  assert.match(restored.post1949.employment.lastResult, /旧存档.*没有记录具体岗位/);
  assert.match(restored.post1949.employment.nextStep, /当年取得明确答复/);

  restored.firedDecisions.push('post49-arrival');
  Game.advanceYear(restored, ['hongkong-find-work']);
  assert.ok(['casual', 'trial', 'employed'].includes(restored.post1949.employment.status));
  assert.ok(restored.post1949.employment.role);
});

test('a current save waiting at the 1950 arrival choice is not mislabeled as legacy data', () => {
  const state = postwarState();
  Game.advanceYear(state, []);
  assert.equal(state.pendingDecision.id, 'post49-arrival');

  const restored = Game.importGame(Game.exportGame(state));
  assert.equal(restored.post1949.employment.status, 'not-started');
  assert.equal(restored.post1949.employment.lastResult, null);
  assert.equal(restored.pendingDecision.id, 'post49-arrival');
});

test('an unsuccessful application states the reason, income status and next action', () => {
  const state = postwarState();
  state.firedDecisions.push('post49-arrival');
  Object.keys(state.attrs).forEach((key) => { state.attrs[key] = 0; });
  state.res.position = 0;

  Game.advanceYear(state, ['hongkong-find-work']);

  assert.equal(state.post1949.employment.status, 'seeking');
  assert.equal(state.post1949.employment.role, null);
  assert.match(state.post1949.employment.lastResult, /没有录用/);
  assert.match(state.post1949.employment.lastResult, /没有固定工资职位/);
  assert.match(state.post1949.employment.nextStep, /先接.+重新应聘/);
});

test('the age-50 livelihood choice updates the saved occupation instead of only changing prose', () => {
  const state = postwarState();
  state.firedDecisions.push('post49-arrival');
  state.year = state.identity.born + 50;
  state.age = 50;
  Object.assign(state.post1949.employment, {
    status: 'employed', track: 'manual', role: '货仓理货工', workplace: '临海货仓',
    duties: '按货单分拣与搬运', terms: '按月结算', startedYear: 1950,
  });

  Game.advanceYear(state, []);
  assert.equal(state.pendingDecision.id, 'later-life-livelihood');
  Game.choose(state, 'change-work');

  assert.equal(state.post1949.employment.status, 'employed');
  assert.equal(state.post1949.employment.role, '货物清点与工段看守');
  assert.match(state.post1949.employment.lastResult, /离开原来的“货仓理货工”.+改做货物清点与工段看守/);
});

test('era updates respect information channels instead of exposing omniscient history', () => {
  const state = postwarState();
  Game.advanceYear(state, []);

  assert.ok(state.currentEraUpdates.length >= 2);
  assert.ok(state.currentEraUpdates.every((entry) => entry.known === false));
  assert.ok(state.currentEraUpdates.every((entry) => entry.title === '影响先于完整消息抵达'));
  assert.ok(state.currentEraUpdates.every((entry) => entry.source === null));
  assert.ok(state.currentEraUpdates.some((entry) => /街坊|租金|通铺|短工/.test(entry.text)));
});

test('the postwar era layer covers all eight destinations with sourced history', () => {
  const events = Game.content.events.filter((event) => event.eraBrief && event.year >= 1950);
  for (const path of Object.keys(POST1949_OPTIONS)) {
    assert.ok(events.some((event) => event.post1949Choices?.includes(path)), `${path} needs a post-1949 era event`);
  }
  assert.ok(events.length >= 18);
  assert.ok(events.every((event) => event.historySource?.url?.startsWith('https://')));
  assert.ok(Game.content.events.filter((event) => event.eraBrief).every((event) => event.historySource?.url?.startsWith('https://')));
});

test('each route owns at least nine authored ordinary-life scenes', () => {
  for (const routeKey of Object.keys(Game.content.routes)) {
    const scenes = Game.content.ordinaryEvents.filter((event) => event.routes?.includes(routeKey));
    assert.ok(scenes.length >= 9, `${routeKey} should have at least nine authored scenes`);
  }
});

test('the 1921 founding appears as history, not a fictional chance for the child protagonist to found the party', () => {
  const state = playScenario({ familyKey: 'subeipoor', name: '李禾生' });
  const founding = state.facts.find((fact) => fact.id === 'ccp-founding-1921');
  assert.ok(founding);
  assert.match(founding.text, /只有十一至十三岁|没有参与建党/);
  assert.ok(state.publicLife.history.every((entry) => entry.year >= 1925));
});

test('a political application remains pending until a later explicit acceptance', () => {
  const state = playScenario({ familyKey: 'jiangnanshen', decisions: {
    'political-organization-application': 'apply-ccp',
    'political-organization-answer': 'accept-membership',
  } });
  const application = state.publicLife.history.find((entry) => entry.source === 'decision:political-organization-application:apply-ccp');
  const acceptance = state.publicLife.history.find((entry) => entry.source === 'decision:political-organization-answer:accept-membership');
  assert.equal(application.status, 'applicant');
  assert.equal(application.organizationKey, null);
  assert.equal(application.pendingOrganizationKey, 'ccp');
  assert.equal(acceptance.status, 'member');
  assert.equal(acceptance.organizationKey, 'ccp');
});

test('secret work, family boundaries and detention pressure leave factual consequences without traitor labels', () => {
  const state = playScenario({ familyKey: 'shanghaigongshang', decisions: {
    'wartime-public-role': 'wartime-infiltration',
    'public-family-boundary': 'tell-family-emergency-only',
    'public-detention-pressure': 'provide-address-under-pressure',
    'public-past-after-1949': 'verify-before-stating-past',
  } });
  assert.ok(state.publicLife.history.some((entry) => entry.status === 'infiltration'));
  assert.equal(state.publicLife.status, 'coerced-cooperation');
  assert.ok(state.publicLife.coercion > 0);
  assert.ok(state.facts.some((fact) => /提供了一个曾使用的地址/.test(fact.text)));
  assert.doesNotMatch(Game.buildEndingNarrative(state), /叛徒|忠诚值/);
  assert.match(Game.buildLifePortrait(state).publicLife, /拘留或问话压力/);
});

test('keeping distance or staying nonparty remains a complete playable public-life path', () => {
  const distance = playScenario({ familyKey: 'subeipoor', decisions: { 'public-life-contact': 'keep-public-distance' } });
  assert.equal(distance.publicLife.status, 'unaffiliated');
  assert.equal(distance.publicLife.history.length, 1);
  assert.match(Game.buildLifePortrait(distance).publicLife, /没有参加政治组织/);

  const nonparty = playScenario({ familyKey: 'jiangnanshen', decisions: { 'political-organization-application': 'remain-nonparty-helper' } });
  assert.ok(nonparty.publicLife.history.some((entry) => entry.status === 'nonparty-helper'));
  assert.ok(nonparty.facts.some((fact) => /保持无党派身份/.test(fact.text)));
});

test('the birth-to-death pack reaches the published content-density baseline', () => {
  const content = Game.content;
  assert.equal(content.actions.length, 215);
  assert.equal(content.decisions.length, 194);
  assert.equal(content.decisions.reduce((sum, decision) => sum + decision.options.length, 0), 610);
  assert.equal(content.ordinaryEvents.length, 960);
  assert.equal(content.ordinaryEvents.filter((event) => event.requiresEchoes).length, 555);
  assert.equal(new Set(content.actions.map((action) => action.id)).size, content.actions.length);
  assert.equal(new Set(content.decisions.map((decision) => decision.id)).size, content.decisions.length);
  assert.equal(new Set(content.ordinaryEvents.map((event) => event.id)).size, content.ordinaryEvents.length);

  const expandedDecisionIds = new Set([
    'adolescent-direction',
    'household-reserve',
    'experience-handover',
  ]);
  const expandedDecisions = content.decisions.filter((decision) => decision.id.startsWith('route-') || expandedDecisionIds.has(decision.id));
  for (const decision of expandedDecisions) {
    assert.equal(new Set(decision.options.map((option) => option.id)).size, decision.options.length);
    for (const choice of decision.options) {
      assert.ok(choice.echo, `${decision.id}/${choice.id} needs an echo id`);
      assert.equal(content.ordinaryEvents.filter((event) => event.requiresEchoes?.includes(choice.echo)).length, 1, `${choice.echo} needs one follow-up scene`);
    }
  }

  for (const routeKey of Object.keys(content.routes)) {
    assert.ok(content.actions.filter((action) => action.routes?.includes(routeKey)).length >= 2, `${routeKey} needs two route actions`);
    assert.equal(content.decisions.filter((decision) => decision.id.startsWith('route-') && decision.routes?.includes(routeKey)).length, 2, `${routeKey} needs two route decisions`);
  }
});

test('route choices produce guaranteed next-year echoes and ending facts', () => {
  const state = playScenario({ familyKey: 'shanghaigongshang' });
  const routeFacts = state.facts.filter((fact) => fact.source.startsWith('route-'));
  const echoScenes = state.annualNarratives.filter((entry) => entry.id.startsWith('echo-'));

  assert.equal(routeFacts.length, 2);
  assert.ok(echoScenes.length >= 4);
  assert.ok(state.firedDecisions.length >= 10);
  assert.match(Game.buildEndingNarrative(state), /1929 年/);
  assert.match(Game.buildEndingNarrative(state), /1942 年/);
});

test('all 610 key-decision options are reachable in a compatible life', () => {
  for (const decision of Game.content.decisions) {
    for (const target of decision.options) {
      const routeKey = decision.routes?.[0] || target.routes?.[0];
      const setup = routeKey
        ? cloneSetup(ROUTE_SETUPS[routeKey])
        : setupForFamily(decision.families?.[0] || 'shanghaigongshang');
      if (target.genders?.includes('女')) setup.gender = '女';
      if (decision.id === 'adult-partnership') setup.decisions.marriage = 'delay-marriage';
      if (decision.id === 'political-organization-application') setup.decisions['public-life-contact'] = 'join-open-public-work';
      if (decision.id === 'political-organization-answer') setup.decisions['political-organization-application'] = 'apply-ccp';
      if (['wartime-public-role', 'public-family-boundary', 'public-detention-pressure'].includes(decision.id)) {
        setup.decisions['public-life-contact'] = 'join-open-public-work';
        setup.decisions['political-organization-application'] = 'apply-ccp';
        setup.decisions['political-organization-answer'] = 'accept-membership';
      }
      if (decision.id === 'public-detention-pressure' || target.id === 'end-secret-work-for-family') setup.decisions['wartime-public-role'] = 'wartime-secret-liaison';
      setup.decisions[decision.id] = target.id;
      const postPath = target.post1949Choices?.[0] || decision.post1949Choices?.[0];
      if (postPath) setup.decisions['final-1949'] = POST1949_OPTIONS[postPath];

      const state = playScenario({
        ...setup,
        name: `选项-${decision.id}-${target.id}`,
        actionPicker(current, available) {
          const chosen = [];
          if (!current.information.channels.includes('newspaper') && available.some((action) => action.id === 'read-newspaper')) chosen.push('read-newspaper');
          if (available.some((action) => action.id === 'run-business')) chosen.push('run-business');
          if (available.some((action) => action.id === 'rest')) chosen.push('rest');
          return chosen;
        },
        prepareDecision(current, pending) {
          if (pending.id !== decision.id && pending.id !== 'final-1949') return;
          Object.keys(current.attrs).forEach((key) => { current.attrs[key] = 100; });
          Object.keys(current.res).forEach((key) => { current.res[key] = 100; });
          ['newspaper', 'conversation', 'books', 'storytelling'].forEach((channel) => {
            if (!current.information.channels.includes(channel)) current.information.channels.push(channel);
          });
        },
      });

      assert.ok(
        state.decisionHistory.some((entry) => entry.decisionId === decision.id && entry.optionId === target.id),
        `${decision.id}/${target.id} should be selected in at least one compatible life`,
      );
    }
  }
});

test('all 215 annual actions can be performed in a compatible life', () => {
  for (const target of Game.content.actions) {
    const routeKey = target.routes?.[0];
    const setup = routeKey
      ? cloneSetup(ROUTE_SETUPS[routeKey])
      : setupForFamily(target.families?.[0] || 'shanghaigongshang');
    if (target.post1949Choices?.[0]) setup.decisions['final-1949'] = POST1949_OPTIONS[target.post1949Choices[0]];
    if (target.id === 'covert-liaison') setup.decisions['wartime-public-role'] = 'wartime-secret-liaison';

    const state = playScenario({
      ...setup,
      name: `行动-${target.id}`,
      actionPicker(current, available) {
        if (available.some((action) => action.id === target.id)) return [target.id];
        if (target.post1949Choices?.includes('overseas') && !current.information.channels.includes('newspaper') && available.some((action) => action.id === 'read-newspaper')) return ['read-newspaper'];
        if (target.post1949Choices?.includes('overseas') && available.some((action) => action.id === 'run-business')) return ['run-business'];
        if (target.post1949Choices?.includes('southeast-asia') && !current.information.channels.includes('conversation') && available.some((action) => action.id === 'talk-neighbors')) return ['talk-neighbors'];
        if (target.post1949Choices?.includes('southeast-asia') && available.some((action) => action.id === 'run-business')) return ['run-business'];
        if (target.id === 'write-and-teach') {
          if (available.some((action) => action.id === 'read-books')) return ['read-books'];
          if (available.some((action) => action.id === 'study-new')) return ['study-new'];
        }
        return [];
      },
      prepareDecision(current, pending) {
        if (pending.id !== 'final-1949') return;
        Object.keys(current.attrs).forEach((key) => { current.attrs[key] = 100; });
        Object.keys(current.res).forEach((key) => { current.res[key] = 100; });
        ['newspaper', 'conversation', 'books', 'storytelling'].forEach((channel) => {
          if (!current.information.channels.includes(channel)) current.information.channels.push(channel);
        });
      },
    });

    assert.ok(
      state.actionHistory.some((entry) => entry.actionIds.includes(target.id)),
      `${target.id} should be performed in at least one compatible life`,
    );
  }
});

test('coverage inspection reports family, route, subject and ending evidence', () => {
  const scenarios = [
    playScenario({ familyKey: 'subeipoor', decisions: { 'subei-war': 'stay-and-hide' } }),
    playScenario({ familyKey: 'subeipoor', decisions: { 'subei-war': 'join-army' } }),
    playScenario({ familyKey: 'subeipoor', decisions: { 'subei-war': 'flee-south' } }),
    playScenario({ familyKey: 'jiangnanshen' }),
    playScenario({ familyKey: 'shanghaigongshang' }),
  ];
  const report = Game.inspectCoverage(scenarios);

  assert.equal(report.familyCount, 3);
  assert.ok(report.routeKeys.includes('subei-soldier'));
  assert.equal(report.factEndingCount, scenarios.length);
  assert.equal(report.subjectEvidenceCount, scenarios.length);
  assert.equal(report.post1949EmploymentEvidenceCount, scenarios.length);
  assert.equal(report.annualNarrativeRate, 1);
  assert.equal(report.persistentContactCount, 267);
});

test('a career is a concrete workplace with bosses, coworkers, customers and work records', () => {
  const state = playScenario({
    familyKey: 'shanghaigongshang',
    decisions: { 'shanghai-path': 'business-heir' },
    actionPicker(current, available) {
      return available.some((action) => action.id === 'run-business') ? ['run-business'] : [];
    },
  });
  const career = state.lived.career;
  assert.ok(career.role);
  assert.ok(career.workplace);
  assert.ok(career.employer);
  assert.ok(career.supervisor);
  assert.ok(career.colleague);
  assert.ok(career.publicPerson);
  assert.ok(career.history.length > 20);
  assert.match(Game.buildLifePortrait(state).career, /具体工作记录|经营过/);
  assert.ok(state.facts.some((fact) => fact.id === 'career-start:shanghai-heir'));
});

test('marriage creates a named spouse, a real argument and visible consequences', () => {
  const state = playScenario({ familyKey: 'jiangnanshen' });
  const relationship = state.lived.relationship;
  assert.ok(relationship.spouse?.name);
  assert.ok(relationship.spouse?.occupation);
  assert.ok(relationship.history.some((entry) => ['reconcile-budget', 'reconcile-labor', 'separate'].includes(entry.type)));
  assert.ok(relationship.conflictCount >= 1);
  assert.match(Game.buildLifePortrait(state).relationship, /争执|共同安排生活/);
});

test('parents have names, work, conversations, deaths and confirmation instead of living forever', () => {
  const state = playScenario({ familyKey: 'shanghaigongshang' });
  const parents = state.lived.parents;
  assert.equal(Object.keys(parents).length, 2);
  for (const parent of Object.values(parents)) {
    assert.ok(parent.name);
    assert.ok(parent.occupation);
    assert.ok(parent.lastWords);
    assert.ok(parent.deathYear);
    assert.equal(parent.status, 'dead-confirmed');
    assert.ok(parent.history.length > 0);
  }
});

test('parents have one authoritative death and are not recycled as ordinary friends', () => {
  const state = playScenario({
    familyKey: 'northeastsettlers',
    gender: '女',
    seed: 918,
    decisions: { 'northeast-settler-path': 'household-sideline-trial' },
  });
  const parentNames = Object.values(state.lived.parents).map((parent) => parent.name);
  const duplicateDeaths = state.facts.filter((fact) => fact.id.startsWith('contact-death:') && parentNames.some((name) => fact.text.includes(name)));

  assert.equal(duplicateDeaths.length, 0);
  for (const name of parentNames) {
    const mirroredContact = Object.values(state.contacts).find((contact) => contact.label === name);
    assert.equal(mirroredContact?.status, 'deceased');
    assert.doesNotMatch(Game.buildLifePortrait(state).friends, new RegExp(name));
  }
});

test('a life records recurring named illnesses, care and inner thoughts every year', () => {
  const state = playScenario({ familyKey: 'subeipoor', decisions: { 'subei-war': 'join-army' } });
  const illnessEpisodes = state.lived.health.history.filter((entry) => entry.type === 'episode');
  assert.ok(illnessEpisodes.length >= 4);
  assert.ok(illnessEpisodes.every((entry) => entry.text.includes(entry.condition)));
  assert.equal(state.lived.yearHistory.length, state.annualNarratives.length);
  assert.equal(state.lived.inner.history.length, state.annualNarratives.length);
  assert.ok(state.lived.inner.history.every((entry) => entry.text.startsWith('我')));
  assert.match(Game.buildLifePortrait(state).health, /身体发作|求医/);
});

test('adult lives know more than two people and preserve their independent occupations', () => {
  const state = playScenario({ familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'professional-service' } });
  assert.ok(Object.keys(state.contacts).length >= 9);
  assert.ok(Object.values(state.contacts).filter((contact) => contact.role && contact.label).length >= 9);
  assert.match(Game.buildLifePortrait(state).friends, /等|、/);
});

test('a preventive check-up is not misreported as a diagnosed illness', () => {
  const state = Game.createGame({ familyKey: 'jiangnanshen', gender: '女', name: '沈清和', seed: 12 });
  for (let turn = 0; turn < 5; turn += 1) Game.advanceYear(state, []);
  assert.equal(state.age, 5);
  Game.advanceYear(state, ['seek-treatment']);
  assert.ok(state.lived.health.history.some((entry) => entry.type === 'check-up' && entry.condition === null));
  assert.equal(state.lived.health.history.filter((entry) => entry.type === 'episode').length, 0);
  assert.match(Game.buildLifePortrait(state).health, /没有留下具体疾病记录/);
});

test('postwar migration resolves whether a spouse reunites or lives elsewhere without reverting next year', () => {
  const state = playScenario({
    familyKey: 'shanghaigongshang',
    decisions: { 'final-1949': 'move-hong-kong', 'post49-arrival': 'hongkong-use-contact' },
  });
  const migration = state.lived.relationship.history.find((entry) => entry.type === 'postwar-living-apart');
  assert.ok(migration);
  assert.match(migration.text, /没有自动带走|保持联系/);
  assert.equal(state.lived.relationship.history.filter((entry) => entry.type === 'war-separation' && entry.year > 1950).length, 0);
  assert.ok(state.facts.some((fact) => fact.id === 'post1949-spouse-arrangement'));
});

test('later life stops fixed work and does not keep offering the same job until death', () => {
  const state = playScenario({ familyKey: 'shanghaigongshang', seed: 27 });
  assert.ok(state.lived.career.retiredYear >= state.identity.born + 68);
  assert.equal(state.post1949.employment.status, 'retired');
  assert.ok(state.lived.career.history.every((entry) => entry.year <= state.lived.career.retiredYear));
  assert.match(state.post1949.livelihood, /已经停止固定工作/);
  assert.ok(state.lived.health.history
    .filter((entry) => entry.type === 'episode' && entry.year > state.lived.career.retiredYear)
    .every((entry) => !/账房熬夜|作场粉尘/.test(entry.condition)));
  assert.match(Game.buildLifePortrait(state).career, /停止固定工作/);
});
