import assert from 'node:assert/strict';

globalThis.window = globalThis;
await import('./assets/game-content.js');
await import('./assets/life-expansion.js');
await import('./assets/complete-life.js');
await import('./assets/postwar-era.js');
await import('./assets/lived-life.js');
await import('./assets/public-life.js');
await import('./assets/family-expansion.js');
await import('./assets/family-expansion-f17.js');
await import('./assets/family-expansion-f18.js');
await import('./assets/family-expansion-f05.js');
await import('./assets/family-expansion-f10.js');
await import('./assets/family-expansion-f13.js');
await import('./assets/family-expansion-f14.js');
await import('./assets/family-expansion-f11.js');
await import('./assets/family-expansion-f08.js');
await import('./assets/family-expansion-f12.js');
await import('./assets/family-expansion-f09.js');
await import('./assets/family-expansion-f15.js');
await import('./assets/family-expansion-f02.js');
await import('./assets/family-expansion-f03.js');
await import('./assets/family-expansion-f07.js');
await import('./assets/domain-expansion-education-knowledge.js');
await import('./assets/domain-expansion-medical-public-health.js');
await import('./assets/domain-expansion-care-professional-associations.js');
await import('./assets/domain-expansion-wartime-relief-public-service.js');
await import('./assets/domain-expansion-identity-finance-concession.js');
await import('./assets/density-expansion-family-life.js');
await import('./assets/density-expansion-route-work.js');
await import('./assets/demo-engine.js');

const Game = globalThis.MINGUO_GAME;

const baseDecisions = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'subei-livelihood': 'stay-local',
  'subei-war': 'stay-and-hide',
  'shen-path': 'scholar',
  'shen-war': 'stay-public-work',
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
  'f15-political-application-1947': 'f15-apply-public-civic-network',
  'f15-public-role-1948': 'f15-public-continue-open',
  'f15-political-answer-1949': 'f15-accept-network-membership',
  'subei-artisan-child-skill-1918': 'f02-child-follow-repair',
  'subei-artisan-customer-debt-1920': 'f02-debt-part-grain',
  'subei-artisan-path': 'f02-repair-trial',
  'subei-artisan-market-break-1938': 'f02-break-near-repair',
  'jiangnan-silk-child-work-1918': 'f03-child-silkworm',
  'jiangnan-silk-credit-1928': 'f03-credit-formal-check',
  'jiangnan-silk-path': 'f03-path-tenant',
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
  'political-organization-application': 'apply-public-civic-network',
  'political-organization-answer': 'accept-network-membership',
  'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range',
  'public-past-after-1949': 'state-confirmed-public-past',
};

function runScenario(definition) {
  const state = Game.createGame({
    familyKey: definition.familyKey,
    gender: definition.gender || '男',
    name: definition.name,
    seed: definition.seed || 20260811,
  });
  const decisions = { ...baseDecisions, ...(definition.decisions || {}) };
  let turns = 0;

  while (!state.over && turns < 140) {
    const availableActions = Game.availableActions(state);
    const preferred = [];
    if (!state.information.channels.includes('newspaper') && availableActions.some((action) => action.id === 'read-newspaper')) preferred.push('read-newspaper');
    if (definition.expectedPost1949 === 'southeast-asia' && !state.information.channels.includes('conversation') && availableActions.some((action) => action.id === 'talk-neighbors')) preferred.push('talk-neighbors');
    if (['hong-kong', 'taiwan', 'macau', 'southeast-asia', 'overseas'].includes(definition.expectedPost1949)) {
      const earningAction = ['run-business', 'workroom', 'write-and-teach', 'clinic-service', 'salaried-technical-work', 'f14-ship-ticket-cargo-handoff', 'f14-guesthouse-room-meal-shift', 'f14-trade-source-delivery-ledger'].find((id) => availableActions.some((action) => action.id === id));
      if (earningAction) preferred.push(earningAction);
    }
    preferred.push(...Game.recommendedActions(state));
    const actions = [];
    let remainingSpirit = state.spirit;
    const slots = Game.stageOf(state.age).slots;
    for (const id of preferred) {
      if (actions.length >= slots || actions.includes(id)) continue;
      const action = availableActions.find((item) => item.id === id);
      if (action && action.spirit <= remainingSpirit) { actions.push(id); remainingSpirit -= action.spirit; }
    }
    Game.advanceYear(state, actions);
    while (state.pendingDecision) {
      if (definition.prepareHighGates && ['d47-finance-ownership-entry-1946', 'final-1949', 'macau-hospitality-concession-1962'].includes(state.pendingDecision.id)) {
        Object.keys(state.attrs).forEach((key) => { state.attrs[key] = 100; });
        Object.keys(state.res).forEach((key) => { state.res[key] = 100; });
        ['newspaper', 'conversation', 'books', 'storytelling'].forEach((channel) => {
          if (!state.information.channels.includes(channel)) state.information.channels.push(channel);
        });
      }
      const requested = decisions[state.pendingDecision.id];
      const option = state.pendingDecision.options.find((item) => item.id === requested && item.enabled && !item.hidden)
        || state.pendingDecision.options.find((item) => item.enabled && !item.hidden);
      assert.ok(option, `${definition.id}: ${state.pendingDecision.id} has no enabled option`);
      Game.choose(state, option.id);
    }
    turns += 1;
  }

  assert.equal(state.over, true, `${definition.id}: life should end`);
  assert.equal(state.routeKey, definition.expectedRoute, `${definition.id}: final route`);
  assert.ok(state.facts.some((fact) => fact.id === 'final-1949'), `${definition.id}: 1949 fact`);
  assert.ok(state.endYear > 1949, `${definition.id}: life continues after 1949`);
  assert.equal(state.life.status, 'dead', `${definition.id}: death is the only ending`);
  assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'), `${definition.id}: protagonist death must be confirmed`);
  assert.equal(state.post1949Choice, definition.expectedPost1949, `${definition.id}: post-1949 path`);
  assert.ok(state.post1949.arrival, `${definition.id}: arrival needs a record`);
  assert.ok(state.post1949.livelihood, `${definition.id}: post-1949 livelihood needs a record`);
  assert.doesNotMatch(Game.buildEndingNarrative(state), /成功|失败|安稳|挣扎|爬得很高|万幸/);
  assert.equal(state.identity.name, definition.name, `${definition.id}: identity must stay stable`);
  assert.equal(state.annualNarratives.length, state.endYear - state.identity.born + 1, `${definition.id}: every year needs a life scene`);
  assert.ok(state.annualNarratives.every((entry) => entry.text.length >= 80), `${definition.id}: annual scenes must be concrete stories`);
  assert.ok(state.contactHistory.length > 0, `${definition.id}: persistent contacts need evidence`);
  assert.ok(state.eraHistory.some((entry) => entry.year >= 1950), `${definition.id}: post-1949 era history needs evidence`);
  assert.ok(state.lived.career.role && state.lived.career.workplace && state.lived.career.employer, `${definition.id}: concrete career`);
  assert.ok(state.lived.career.history.length > 0, `${definition.id}: work scenes`);
  assert.ok(Object.values(state.lived.parents).every((parent) => parent.name && parent.occupation && parent.deathYear), `${definition.id}: parent lives`);
  assert.ok(state.lived.relationship.history.length > 0, `${definition.id}: relationship consequences`);
  assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4, `${definition.id}: illness history`);
  assert.ok(Object.keys(state.contacts).length >= 6, `${definition.id}: social world`);
  assert.equal(state.lived.yearHistory.length, state.annualNarratives.length, `${definition.id}: concrete year records`);
  assert.equal(state.lived.inner.history.length, state.annualNarratives.length, `${definition.id}: inner life`);
  return state;
}

const definitions = [
  { id: 'subei-stay', familyKey: 'subeipoor', gender: '男', name: '李禾生', expectedRoute: 'subei-stay', expectedPost1949: 'mainland' },
  { id: 'subei-soldier', familyKey: 'subeipoor', gender: '男', name: '李长河', expectedRoute: 'subei-soldier', expectedPost1949: 'in-motion', decisions: { 'subei-war': 'join-army', 'final-1949': 'remain-in-motion' } },
  { id: 'subei-refugee', familyKey: 'subeipoor', gender: '女', name: '李秀禾', expectedRoute: 'subei-refugee', expectedPost1949: 'unsettled', decisions: { 'subei-war': 'flee-south', 'final-1949': 'leave-unsettled' } },
  { id: 'subei-millworker', familyKey: 'subeipoor', gender: '女', name: '李春棉', expectedRoute: 'subei-millworker', expectedPost1949: 'mainland', decisions: { 'subei-livelihood': 'enter-mill', 'subei-war': 'remain-worker' } },
  { id: 'shen-scholar', familyKey: 'jiangnanshen', gender: '男', name: '沈砚清', expectedRoute: 'shen-scholar', expectedPost1949: 'taiwan', decisions: { 'final-1949': 'move-taiwan' } },
  { id: 'shen-newwoman', familyKey: 'jiangnanshen', gender: '女', name: '沈毓宁', expectedRoute: 'shen-newwoman', expectedPost1949: 'mainland', decisions: { 'shen-path': 'new-woman' } },
  { id: 'shen-refugee', familyKey: 'jiangnanshen', gender: '女', name: '沈清和', expectedRoute: 'shen-refugee', expectedPost1949: 'in-motion', decisions: { 'shen-path': 'new-woman', 'shen-war': 'move-with-family', 'final-1949': 'remain-in-motion' } },
  { id: 'shen-professional', familyKey: 'jiangnanshen', gender: '男', name: '沈济安', expectedRoute: 'shen-professional', expectedPost1949: 'hong-kong', decisions: { 'shen-path': 'professional-service', 'final-1949': 'move-hong-kong' } },
  { id: 'shen-higher-study', familyKey: 'jiangnanshen', gender: '女', name: '沈映秋', expectedRoute: 'shen-scholar', expectedPost1949: 'mainland', decisions: { 'shen-path': 'higher-study', 'route-d19-1933': 'd19-33-teach' } },
  { id: 'shen-news-publishing', familyKey: 'jiangnanshen', gender: '女', name: '沈曼贞', expectedRoute: 'shen-news-publishing', expectedPost1949: 'mainland', decisions: { 'shen-path': 'news-publishing' } },
  { id: 'shen-library-research', familyKey: 'jiangnanshen', gender: '男', name: '沈文清', expectedRoute: 'shen-library-research', expectedPost1949: 'mainland', decisions: { 'shen-path': 'library-research' } },
  { id: 'shanghai-heir', familyKey: 'shanghaigongshang', gender: '男', name: '顾承安', expectedRoute: 'shanghai-heir', expectedPost1949: 'taiwan', decisions: { 'final-1949': 'move-taiwan' } },
  { id: 'shanghai-newwoman', familyKey: 'shanghaigongshang', gender: '女', name: '顾明仪', expectedRoute: 'shanghai-newwoman', expectedPost1949: 'overseas', decisions: { 'shanghai-path': 'urban-new-woman', 'final-1949': 'move-overseas' } },
  { id: 'shanghai-professional', familyKey: 'shanghaigongshang', gender: '女', name: '顾衡仪', expectedRoute: 'shanghai-professional', expectedPost1949: 'unsettled', decisions: { 'shanghai-path': 'salaried-professional', 'shanghai-war': 'relocate-own-work', 'final-1949': 'leave-unsettled' } },
  { id: 'sichuan-pharmacy', familyKey: 'sichuanmedicine', gender: '男', name: '唐济生', expectedRoute: 'sichuan-pharmacy', expectedPost1949: 'mainland', decisions: { 'sichuan-path': 'pharmacy-clerk' } },
  { id: 'sichuan-foodshop', familyKey: 'sichuanmedicine', gender: '女', name: '唐秀莲', expectedRoute: 'sichuan-foodshop', expectedPost1949: 'mainland', decisions: { 'sichuan-path': 'food-shop', 'sichuan-war': 'local-food-substitute' } },
  { id: 'sichuan-care', familyKey: 'sichuanmedicine', gender: '女', name: '唐慧生', expectedRoute: 'sichuan-care', expectedPost1949: 'mainland', decisions: { 'sichuan-path': 'care-training', 'sichuan-war': 'split-family-work' } },
  { id: 'sichuan-clinical-medicine', familyKey: 'sichuanmedicine', gender: '女', name: '唐静和', expectedRoute: 'sichuan-clinical-medicine', expectedPost1949: 'mainland', decisions: { 'sichuan-path': 'clinical-training', 'sichuan-war': 'split-family-work' } },
  { id: 'sichuan-hospital-services', familyKey: 'sichuanmedicine', gender: '男', name: '唐明生', expectedRoute: 'sichuan-hospital-services', expectedPost1949: 'mainland', decisions: { 'sichuan-path': 'hospital-services', 'sichuan-war': 'split-family-work' } },
  { id: 'sichuan-public-health', familyKey: 'sichuanmedicine', gender: '女', name: '唐宜秋', expectedRoute: 'sichuan-public-health', expectedPost1949: 'mainland', decisions: { 'sichuan-path': 'public-health', 'sichuan-war': 'split-family-work' } },
  { id: 'sichuan-long-term-care', familyKey: 'sichuanmedicine', gender: '女', name: '唐静宜', expectedRoute: 'sichuan-long-term-care', expectedPost1949: 'mainland', decisions: { 'sichuan-path': 'long-term-care', 'sichuan-war': 'split-family-work' } },
  { id: 'guanzhong-farmwater', familyKey: 'guanzhongirrigation', gender: '男', name: '马保川', expectedRoute: 'guanzhong-farmwater', expectedPost1949: 'mainland', decisions: { 'guanzhong-path': 'farm-water-work' } },
  { id: 'guanzhong-market', familyKey: 'guanzhongirrigation', gender: '女', name: '马秀梅', expectedRoute: 'guanzhong-market', expectedPost1949: 'mainland', decisions: { 'guanzhong-path': 'market-grain-work', 'guanzhong-war': 'split-work-with-addresses' } },
  { id: 'guanzhong-migration', familyKey: 'guanzhongirrigation', gender: '男', name: '马迁生', expectedRoute: 'guanzhong-migration', expectedPost1949: 'mainland', decisions: { 'guanzhong-path': 'verified-migration-work' } },
  { id: 'xian-repair', familyKey: 'xianartisans', gender: '男', name: '杜修远', expectedRoute: 'xian-repair', expectedPost1949: 'mainland', decisions: { 'xian-path': 'repair-apprentice', 'route-xian-repair-1942': 'family-repair-partnership' } },
  { id: 'xian-station', familyKey: 'xianartisans', gender: '女', name: '杜月琴', expectedRoute: 'xian-station', expectedPost1949: 'mainland', decisions: { 'xian-path': 'station-service', 'xian-war': 'documented-logistics-job' } },
  { id: 'xian-shop', familyKey: 'xianartisans', gender: '女', name: '杜月琴', expectedRoute: 'xian-shop', expectedPost1949: 'mainland', decisions: { 'xian-path': 'shop-ledger-service', 'route-xian-shop-1942': 'family-limited-partnership' } },
  { id: 'shanghai-textile-worker', familyKey: 'shanghailabor', gender: '女', name: '李玉兰', expectedRoute: 'shanghai-textile-worker', expectedPost1949: 'mainland', decisions: { 'shanghai-labor-path': 'textile-trial' } },
  { id: 'shanghai-transport-worker', familyKey: 'shanghailabor', gender: '男', name: '李守成', expectedRoute: 'shanghai-transport-worker', expectedPost1949: 'mainland', decisions: { 'shanghai-labor-path': 'transport-trial' } },
  { id: 'shanghai-domestic-service', familyKey: 'shanghailabor', gender: '女', name: '李玉兰', expectedRoute: 'shanghai-domestic-service', expectedPost1949: 'mainland', decisions: { 'shanghai-labor-path': 'domestic-service-trial', 'route-shanghai-domestic-service-1942': 'lane-laundry-partnership' } },
  { id: 'northeast-railway-worker', familyKey: 'northeastrailworkers', gender: '女', name: '韩素秋', expectedRoute: 'northeast-railway-worker', expectedPost1949: 'mainland', decisions: { 'northeast-worker-path': 'railway-trial', 'northeast-worker-system-change': 'stay-with-duty-boundary' } },
  { id: 'northeast-mining-ground-worker', familyKey: 'northeastrailworkers', gender: '男', name: '韩守勤', expectedRoute: 'northeast-mining-ground-worker', expectedPost1949: 'mainland', decisions: { 'northeast-worker-path': 'mining-ground-trial', 'northeast-worker-system-change': 'stay-with-duty-boundary' } },
  { id: 'northeast-repair-worker', familyKey: 'northeastrailworkers', gender: '女', name: '韩素秋', expectedRoute: 'northeast-repair-worker', expectedPost1949: 'mainland', decisions: { 'northeast-worker-path': 'repair-trial', 'northeast-worker-system-change': 'stay-with-duty-boundary' } },
  { id: 'qiaoxiang-local-shop', familyKey: 'guangdongqiaoxiang', gender: '女', name: '梁月清', expectedRoute: 'qiaoxiang-local-shop', expectedPost1949: 'mainland', decisions: { 'qiaoxiang-path': 'local-shop-trial', 'route-qiaoxiang-local-shop-1942': 'family-shop-partnership' } },
  { id: 'qiaopi-correspondence-clerk', familyKey: 'guangdongqiaoxiang', gender: '男', name: '梁守信', expectedRoute: 'qiaopi-correspondence-clerk', expectedPost1949: 'hong-kong', decisions: { 'qiaoxiang-path': 'correspondence-trial', 'qiaoxiang-war': 'trace-through-public-channels', 'final-1949': 'move-hong-kong' } },
  { id: 'qiaopi-remittance-clerk', familyKey: 'guangdongqiaoxiang', gender: '女', name: '梁月清', expectedRoute: 'qiaopi-remittance-clerk', expectedPost1949: 'overseas', decisions: { 'qiaoxiang-path': 'remittance-trial', 'final-1949': 'move-overseas' } },
  { id: 'coastal-passenger-cargo-operator', familyKey: 'guangdongcoastal', gender: '男', name: '梁海宁', expectedRoute: 'coastal-passenger-cargo-operator', expectedPost1949: 'macau', decisions: { 'coastal-path': 'ship-ticket-trial', 'route-coastal-passenger-cargo-operator-1946': 'ship-limited-share', 'final-1949': 'move-macau', 'post49-arrival': 'macau-inner-harbour-bed-work' } },
  { id: 'port-guesthouse-caterer', familyKey: 'guangdongcoastal', gender: '女', name: '梁燕宁', expectedRoute: 'port-guesthouse-caterer', expectedPost1949: 'mainland', decisions: { 'coastal-path': 'guesthouse-trial', 'route-port-guesthouse-caterer-1946': 'guesthouse-limited-partnership' } },
  { id: 'recorded-coastal-small-trader', familyKey: 'guangdongcoastal', gender: '女', name: '梁燕宁', expectedRoute: 'recorded-coastal-small-trader', expectedPost1949: 'southeast-asia', decisions: { 'coastal-path': 'recorded-trade-trial', 'route-recorded-coastal-small-trader-1946': 'trade-documented-partnership', 'final-1949': 'move-southeast-asia', 'post49-arrival': 'singapore-language-trade-work' } },
  { id: 'hankou-dock-cargo-worker', familyKey: 'hankouport', gender: '男', name: '周江生', expectedRoute: 'hankou-dock-cargo-worker', expectedPost1949: 'mainland', decisions: { 'hankou-port-path': 'dock-cargo-trial', 'route-hankou-dock-cargo-worker-1946': 'dock-limited-cart-team' } },
  { id: 'hankou-rickshaw-worker', familyKey: 'hankouport', gender: '男', name: '周江生', expectedRoute: 'hankou-rickshaw-worker', expectedPost1949: 'mainland', decisions: { 'hankou-port-path': 'rickshaw-trial', 'route-hankou-rickshaw-worker-1946': 'rickshaw-buy-one-used-cart', 'hankou-flood-1931': 'flood-close-work-preserve-health' } },
  { id: 'hankou-river-street-food-stall', familyKey: 'hankouport', gender: '女', name: '周江梅', expectedRoute: 'hankou-river-street-food-stall', expectedPost1949: 'mainland', decisions: { 'hankou-port-path': 'river-food-trial', 'route-hankou-river-street-food-stall-1946': 'food-limited-family-partnership', 'hankou-flood-1931': 'flood-split-work-and-shelter', 'hankou-port-war': 'hankou-verified-work-move' } },
  { id: 'tianjin-commercial-clerk', familyKey: 'tianjinclerks', gender: '男', name: '许文清', expectedRoute: 'tianjin-commercial-clerk', expectedPost1949: 'mainland', decisions: { 'tianjin-clerk-path': 'commercial-clerk-trial', 'route-tianjin-commercial-clerk-1946': 'clerk-limited-stationery-partnership' } },
  { id: 'tianjin-tailoring-garment-worker', familyKey: 'tianjinclerks', gender: '女', name: '许文澜', expectedRoute: 'tianjin-tailoring-garment-worker', expectedPost1949: 'mainland', decisions: { 'tianjin-clerk-path': 'tailoring-trial', 'route-tianjin-tailoring-garment-worker-1946': 'tailor-limited-garment-workshop', 'tianjin-clerk-war': 'tianjin-local-bounded-work' } },
  { id: 'tianjin-postal-school-clerk', familyKey: 'tianjinclerks', gender: '女', name: '许文澜', expectedRoute: 'tianjin-postal-school-clerk', expectedPost1949: 'mainland', decisions: { 'tianjin-clerk-path': 'postal-school-trial', 'route-tianjin-postal-school-clerk-1946': 'postal-community-copy-desk', 'tianjin-clerk-war': 'tianjin-verified-unit-move' } },
  { id: 'hankou-trading-house-clerk', familyKey: 'hankoucommerce', gender: '男', name: '罗绍安', expectedRoute: 'hankou-trading-house-clerk', expectedPost1949: 'mainland', decisions: { 'hankou-commerce-path': 'trading-house-clerk-trial', 'route-hankou-trading-house-clerk-1946': 'clerk-limited-trading-partnership' } },
  { id: 'hankou-warehouse-freight-clerk', familyKey: 'hankoucommerce', gender: '女', name: '罗慧安', expectedRoute: 'hankou-warehouse-freight-clerk', expectedPost1949: 'mainland', decisions: { 'hankou-commerce-path': 'warehouse-freight-trial', 'route-hankou-warehouse-freight-clerk-1946': 'warehouse-limited-storage-team', 'hankou-commerce-war': 'hankou-commerce-verified-unit-move' } },
  { id: 'hankou-dry-goods-small-trader', familyKey: 'hankoucommerce', gender: '女', name: '罗慧安', expectedRoute: 'hankou-dry-goods-small-trader', expectedPost1949: 'mainland', decisions: { 'hankou-commerce-path': 'dry-goods-trader-trial', 'route-hankou-dry-goods-small-trader-1946': 'trader-limited-dry-goods-shop', 'hankou-commerce-war': 'hankou-commerce-local-bounded-trade' } },
  { id: 'hankou-legal-accounting', familyKey: 'hankoucommerce', gender: '女', name: '罗静安', expectedRoute: 'hankou-legal-accounting', expectedPost1949: 'mainland', decisions: { 'hankou-commerce-path': 'legal-accounting-trial', 'hankou-commerce-war': 'hankou-commerce-split-addresses-stock' } },
  { id: 'hankou-trade-associations', familyKey: 'hankoucommerce', gender: '男', name: '罗明安', expectedRoute: 'hankou-trade-associations', expectedPost1949: 'mainland', decisions: { 'hankou-commerce-path': 'trade-association-trial', 'hankou-commerce-war': 'hankou-commerce-split-addresses-stock' } },
  { id: 'northeast-seasonal-farm-worker', familyKey: 'northeastsettlers', gender: '男', name: '王守田', expectedRoute: 'northeast-seasonal-farm-worker', expectedPost1949: 'mainland', decisions: { 'northeast-settler-path': 'seasonal-farm-trial', 'route-northeast-seasonal-farm-worker-1946': 'seasonal-limited-work-team' } },
  { id: 'northeast-household-farm-sideline', familyKey: 'northeastsettlers', gender: '女', name: '王守兰', expectedRoute: 'northeast-household-farm-sideline', expectedPost1949: 'mainland', decisions: { 'northeast-settler-path': 'household-sideline-trial', 'route-northeast-household-farm-sideline-1946': 'sideline-limited-food-garden' } },
  { id: 'northeast-rural-tool-repairer', familyKey: 'northeastsettlers', gender: '女', name: '王守兰', expectedRoute: 'northeast-rural-tool-repairer', expectedPost1949: 'mainland', decisions: { 'northeast-settler-path': 'rural-repair-trial', 'route-northeast-rural-tool-repairer-1946': 'repair-limited-workshop', 'northeast-settler-occupation': 'settler-remain-confirmed-livelihood' } },
  { id: 'southwest-wartime-warehouse-supply', familyKey: 'southwestwarworkers', gender: '男', name: '郭承安', expectedRoute: 'southwest-wartime-warehouse-supply', expectedPost1949: 'mainland', decisions: { 'southwest-warworker-path': 'f15-warehouse-trial', 'route-southwest-wartime-warehouse-supply-1946': 'f15-warehouse-limited-inventory-team' } },
  { id: 'southwest-mechanical-drawing-repair', familyKey: 'southwestwarworkers', gender: '女', name: '郭承宁', expectedRoute: 'southwest-mechanical-drawing-repair', expectedPost1949: 'mainland', decisions: { 'southwest-warworker-path': 'f15-repair-drawing-trial', 'route-southwest-mechanical-drawing-repair-1946': 'f15-repair-limited-shop' } },
  { id: 'southwest-clinic-records-clerk', familyKey: 'southwestwarworkers', gender: '女', name: '郭承宁', expectedRoute: 'southwest-clinic-records-clerk', expectedPost1949: 'mainland', decisions: { 'southwest-warworker-path': 'f15-records-trial', 'route-southwest-clinic-records-clerk-1946': 'f15-records-limited-service-coop' } },
  { id: 'southwest-wartime-relief-logistics', familyKey: 'southwestwarworkers', gender: '女', name: '郭静安', expectedRoute: 'southwest-wartime-relief-logistics', expectedPost1949: 'mainland', decisions: { 'southwest-warworker-path': 'f15-relief-logistics-trial', 'route-d38-1947': 'bounded-desk' } },
  { id: 'southwest-civil-defense-relief', familyKey: 'southwestwarworkers', gender: '男', name: '郭守安', expectedRoute: 'southwest-civil-defense-relief', expectedPost1949: 'mainland', decisions: { 'southwest-warworker-path': 'f15-civil-defense-relief-trial', 'route-d39-1947': 'relief-coop' } },
  { id: 'tianjin-public-community-service', familyKey: 'tianjinclerks', gender: '女', name: '许静兰', expectedRoute: 'tianjin-public-community-service', expectedPost1949: 'mainland', decisions: { 'tianjin-clerk-path': 'public-community-trial', 'route-d41-1943': 'bounded-desk' } },
  { id: 'high-risk-double-identity', familyKey: 'shanghaigongshang', gender: '女', name: '顾静仪', expectedRoute: 'high-risk-double-identity', expectedPost1949: 'mainland', decisions: { 'shanghai-path': 'salaried-professional', 'shanghai-war': 'relocate-own-work', 'political-organization-application': 'remain-nonparty-helper', 'wartime-public-role': 'wartime-secret-liaison', 'public-family-boundary': 'tell-family-risk-range' } },
  { id: 'banking-investment-insurance-owner', familyKey: 'guangdongqiaoxiang', gender: '女', name: '梁素安', expectedRoute: 'banking-investment-insurance-owner', expectedPost1949: 'hong-kong', prepareHighGates: true, decisions: { 'qiaoxiang-path': 'remittance-trial', 'qiaoxiang-war': 'split-address-and-accounts', 'd47-finance-ownership-entry-1946': 'd47-form-share-finance-firm', 'final-1949': 'move-hong-kong' } },
  { id: 'macao-tourism-entertainment-concession', familyKey: 'guangdongcoastal', gender: '女', name: '梁惠莲', expectedRoute: 'macao-tourism-entertainment-concession', expectedPost1949: 'macau', prepareHighGates: true, decisions: { 'coastal-path': 'guesthouse-trial', 'coastal-war': 'coastal-split-addresses', 'final-1949': 'move-macau', 'post49-arrival': 'macau-verified-contact-work', 'macau-hospitality-concession-1962': 'macau-limited-concession-network-partner' } },
  { id: 'subei-village-tool-repairer', familyKey: 'subeiartisans', gender: '男', name: '丁守成', expectedRoute: 'subei-village-tool-repairer', expectedPost1949: 'mainland', decisions: { 'subei-artisan-path': 'f02-repair-trial', 'route-subei-village-tool-repairer-1946': 'f02-repair-limited-workshop' } },
  { id: 'subei-itinerant-market-vendor', familyKey: 'subeiartisans', gender: '女', name: '丁守兰', expectedRoute: 'subei-itinerant-market-vendor', expectedPost1949: 'mainland', decisions: { 'subei-artisan-path': 'f02-vendor-trial', 'route-subei-itinerant-market-vendor-1946': 'f02-vendor-limited-haul-coop' } },
  { id: 'subei-market-stall-shopkeeper', familyKey: 'subeiartisans', gender: '女', name: '丁守兰', expectedRoute: 'subei-market-stall-shopkeeper', expectedPost1949: 'mainland', decisions: { 'subei-artisan-path': 'f02-stall-trial', 'route-subei-market-stall-shopkeeper-1946': 'f02-shop-limited-partnership' } },
  { id: 'jiangnan-tenant-water-farmer', familyKey: 'jiangnansilkwater', gender: '男', name: '顾守田', expectedRoute: 'jiangnan-tenant-water-farmer', expectedPost1949: 'mainland', decisions: { 'jiangnan-silk-path': 'f03-path-tenant', 'route-jiangnan-tenant-water-farmer-1946': 'f03-tenant-seasonal-team' } },
  { id: 'jiangnan-sericulture-silk-household', familyKey: 'jiangnansilkwater', gender: '女', name: '顾春兰', expectedRoute: 'jiangnan-sericulture-silk-household', expectedPost1949: 'mainland', decisions: { 'jiangnan-silk-path': 'f03-path-sericulture', 'route-jiangnan-sericulture-silk-household-1946': 'f03-silk-limited-coop' } },
  { id: 'jiangnan-silk-reeling-mill-worker', familyKey: 'jiangnansilkwater', gender: '女', name: '顾春兰', expectedRoute: 'jiangnan-silk-reeling-mill-worker', expectedPost1949: 'mainland', decisions: { 'jiangnan-silk-path': 'f03-path-mill', 'route-jiangnan-silk-reeling-mill-worker-1946': 'f03-mill-finishing-group' } },
  { id: 'northchina-seasonal-farm-laborer', familyKey: 'northchinadroughtfarm', gender: '男', name: '赵守田', expectedRoute: 'northchina-seasonal-farm-laborer', expectedPost1949: 'mainland', decisions: { 'northchina-farm-path': 'f07-path-seasonal', 'route-northchina-seasonal-farm-laborer-1946': 'f07-seasonal-limited-team' } },
  { id: 'northchina-temple-fair-vendor', familyKey: 'northchinadroughtfarm', gender: '女', name: '赵春苗', expectedRoute: 'northchina-temple-fair-vendor', expectedPost1949: 'mainland', decisions: { 'northchina-farm-path': 'f07-path-vendor', 'route-northchina-temple-fair-vendor-1946': 'f07-vendor-limited-haul' } },
  { id: 'northchina-railway-maintenance-worker', familyKey: 'northchinadroughtfarm', gender: '女', name: '赵春苗', expectedRoute: 'northchina-railway-maintenance-worker', expectedPost1949: 'mainland', decisions: { 'northchina-farm-path': 'f07-path-rail', 'route-northchina-railway-maintenance-worker-1946': 'f07-rail-limited-repair' } },
];

const states = definitions.map(runScenario);
const report = Game.inspectCoverage(states);
assert.equal(report.familyCount, 18);
assert.equal(report.routeCount, 71);
assert.equal(report.post1949PathCount, 8);
assert.equal(report.factEndingCount, states.length);
assert.equal(report.deathEndingCount, states.length);
assert.equal(report.post1949ContinuationCount, states.length);
assert.equal(report.post1949EraEvidenceCount, states.length);
assert.equal(report.post1949EmploymentEvidenceCount, states.length);
assert.equal(report.subjectEvidenceCount, states.length);
assert.equal(report.informationEvidenceCount, states.length);
assert.equal(report.contactEvidenceCount, states.length);
assert.equal(report.familyLifecycleCount, states.length);
assert.equal(report.annualNarrativeRate, 1);
assert.equal(report.authoredActionCount, 335);
assert.equal(report.keyDecisionCount, 375);
assert.equal(report.decisionOptionCount, 1165);
assert.equal(report.authoredOrdinaryEventCount, 2180);
assert.equal(report.choiceEchoEventCount, 1096);
assert.equal(report.denseLifeCount, states.length);
assert.equal(report.persistentContactCount, 357);
assert.equal(report.concreteCareerCount, states.length);
assert.equal(report.parentLifecycleDetailCount, states.length);
assert.equal(report.relationshipDetailCount, states.length);
assert.equal(report.healthHistoryCount, states.length);
assert.equal(report.socialWorldCount, states.length);
assert.equal(report.innerLifeCount, states.length);
assert.equal(report.concreteYearCount, report.expectedNarrativeYears);
assert.equal(report.publicLifeEvidenceCount, states.length);
assert.equal(report.syntheticNetworkMembershipCount, states.length - 1);
assert.ok(states.some((state) => state.publicLife.status !== 'member'), 'at least one complete life must remain outside synthetic-network membership');
assert.equal(report.publicActionCount, 6);
assert.equal(report.publicDecisionCount, 12);
assert.equal(report.publicOrdinarySceneCount, 21);
assert.equal(report.publicEraEventCount, 11);
assert.equal(report.publicContactProfileCount, 71);

const bundle = Game.inspectWholeGameProgressBundle(states);
assert.equal(bundle.wholeGameStageLabel, '当前已实装内容通过出生到死亡验证；完整设计仍在扩建');
assert.equal(bundle.hardGates.publicLife, true);

console.log(`[minguo-life] engine ${Game.VERSION}`);
console.log(`[scenarios] ${states.length}/${definitions.length} complete`);
console.log(`[families] ${report.familyCount}/18`);
console.log(`[routes] ${report.routeCount}/71 ${report.routeKeys.join(', ')}`);
console.log(`[post-1949] ${report.post1949PathCount}/8 ${report.post1949PathKeys.join(', ')}`);
console.log(`[post-1949-era] ${report.post1949EraEvidenceCount}/${states.length} lives, ${report.authoredEraEventCount} authored era events`);
console.log(`[post-1949-employment] ${report.post1949EmploymentEvidenceCount}/${states.length} lives with role, result and next step`);
console.log(`[concrete-career] ${report.concreteCareerCount}/${states.length} lives with workplace, employer and work scenes`);
console.log(`[parent-lives] ${report.parentLifecycleDetailCount}/${states.length} lives with named working parents and deaths`);
console.log(`[relationships] ${report.relationshipDetailCount}/${states.length} lives with consequences`);
console.log(`[illness-history] ${report.healthHistoryCount}/${states.length} lives with recurring conditions`);
console.log(`[social-world] ${report.socialWorldCount}/${states.length} lives with six or more named people`);
console.log(`[inner-life] ${report.innerLifeCount}/${states.length} lives with yearly thoughts`);
console.log(`[public-life] ${report.publicLifeEvidenceCount}/${states.length} lives, ${report.publicDecisionCount} decisions, ${report.publicOrdinarySceneCount} consequence scenes`);
console.log(`[fact-endings] ${report.factEndingCount}/${states.length}`);
console.log(`[death-endings] ${report.deathEndingCount}/${states.length}`);
console.log(`[subject-evidence] ${report.subjectEvidenceCount}/${states.length}`);
console.log(`[information-evidence] ${report.informationEvidenceCount}/${states.length}`);
console.log(`[contact-evidence] ${report.contactEvidenceCount}/${states.length}`);
console.log(`[family-lifecycle] ${report.familyLifecycleCount}/${states.length}`);
console.log(`[annual-narrative] ${report.recordedNarrativeYears}/${report.expectedNarrativeYears}`);
console.log(`[authored-actions] ${report.authoredActionCount}`);
console.log(`[key-decisions/options] ${report.keyDecisionCount}/${report.decisionOptionCount}`);
console.log(`[authored-ordinary-events] ${report.authoredOrdinaryEventCount}`);
console.log(`[choice-echo-events] ${report.choiceEchoEventCount}`);
console.log(`[dense-lives] ${report.denseLifeCount}/${states.length}`);
console.log(`[stage] ${bundle.wholeGameStageLabel}`);
