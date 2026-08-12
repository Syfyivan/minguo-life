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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;

const DEFAULTS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'coastal-path': 'ship-ticket-trial',
  'route-coastal-passenger-cargo-operator-1929': 'ship-compare-records',
  'route-coastal-passenger-cargo-operator-1946': 'ship-remain-salaried',
  'route-port-guesthouse-caterer-1929': 'guesthouse-protect-wage',
  'route-port-guesthouse-caterer-1946': 'guesthouse-remain-manager',
  'route-recorded-coastal-small-trader-1929': 'trade-refuse-unknown-parcel',
  'route-recorded-coastal-small-trader-1946': 'trade-reserve-return-money',
  'coastal-war': 'coastal-split-addresses',
  'postwar-settlement': 'rebuild-local',
  'final-1949': 'stay-mainland',
  'post49-arrival': 'mainland-local-work',
  'macau-hospitality-concession-1962': 'macau-remain-salaried-professional',
  'later-life-livelihood': 'change-work',
  'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care',
  'late-life-record': 'sort-records',
  'public-life-contact': 'keep-public-distance',
  'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range',
  'public-past-after-1949': 'state-confirmed-public-past',
};

function play(decisions, gender = '男', seed = 1410, prepareDecision) {
  const state = Game.createGame({ familyKey: 'guangdongcoastal', gender, name: gender === '女' ? '梁燕宁' : '梁海宁', seed });
  const selected = { ...DEFAULTS, ...decisions };
  let turns = 0;
  while (!state.over && turns < 140) {
    Game.advanceYear(state, Game.recommendedActions(state));
    while (state.pendingDecision) {
      if (prepareDecision) prepareDecision(state, state.pendingDecision);
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

test('F14 is the tenth playable family and completes all eight destination states', () => {
  assert.equal(Content.version, '0.7.9');
  assert.equal(Content.designRegistry.families.F14.runtimeStatus, 'playable-verified');
  assert.equal(Content.runtimeFamilyDesignMap.guangdongcoastal, 'F14');
  assert.equal(Object.keys(Content.families).length, 10);
  assert.equal(Object.keys(Content.routes).length, 32);
  assert.equal(Object.keys(Content.post1949Paths).length, 8);
  assert.equal(Content.designRegistry.post1949Destinations.macau.runtimeStatus, 'playable-verified');
  assert.equal(Content.designRegistry.post1949Destinations['southeast-asia'].runtimeStatus, 'playable-verified');
});

test('F14 shipping, guesthouse and documented trade routes reach concrete full lives', () => {
  const cases = [
    ['ship-ticket-trial', 'coastal-passenger-cargo-operator', '男'],
    ['guesthouse-trial', 'port-guesthouse-caterer', '女'],
    ['recorded-trade-trial', 'recorded-coastal-small-trader', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'coastal-path': choice }, gender, 1410 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F14');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace && record.employer));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F14 gives women and men historically bounded concrete work rather than pronoun swaps', () => {
  const male = play({ 'coastal-path': 'ship-ticket-trial' }, '男', 1419);
  const female = play({ 'coastal-path': 'ship-ticket-trial' }, '女', 1420);
  const maleCareer = male.careerHistory.find((record) => record.routeKey === 'coastal-passenger-cargo-operator');
  const femaleCareer = female.careerHistory.find((record) => record.routeKey === 'coastal-passenger-cargo-operator');
  assert.equal(maleCareer.role, '客货轮甲板交接与码头货件助理');
  assert.equal(femaleCareer.role, '客票、行李签与到岸交接登记员');
  assert.notEqual(maleCareer.workplace, femaleCareer.workplace);
  assert.ok(male.genderContext.rule.includes('性别影响可见机会'));
  assert.ok(female.genderContext.rule.includes('性别影响可见机会'));
});

test('F14 publishes twenty base scenes, twenty-four family choice echoes and source links', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('f14-s'));
  const familyEchoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f14-') && !String(scene.id).includes('-macau-'));
  assert.equal(baseScenes.length, 20);
  assert.equal(familyEchoes.length, 24);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(Content.contentRegistries.sources['SRC-F14-GD-WATER-GUEST-CERTIFICATE']);
  assert.ok(Content.contentRegistries.sources['SRC-F14-GD-CUSTOMS']);
  assert.ok(Content.contentRegistries.sources['SRC-POST-SG-KEPPEL']);
});

test('F14 refuses unknown parcels without turning refusal into a smuggling adventure', () => {
  const state = play({
    'coastal-path': 'recorded-trade-trial',
    'route-recorded-coastal-small-trader-1929': 'trade-refuse-unknown-parcel',
  }, '女', 1431);
  assert.ok(state.annualNarratives.some((entry) => entry.id === 'echo-f14-trade-refuse'));
  assert.ok(state.facts.some((fact) => fact.text.includes('拒绝经手来源和内容不明的包裹')));
  assert.ok(!state.facts.some((fact) => /查获|卧底|走私传奇/.test(fact.text)));
});

test('F14 business choices create named assets, partners, debts or licenses instead of title-only success', () => {
  const shipping = play({
    'coastal-path': 'ship-ticket-trial',
    'route-coastal-passenger-cargo-operator-1946': 'ship-limited-share',
  }, '男', 1441);
  assert.ok(shipping.economicLife.enterprises.some((item) => item.name === '合成海安客货艇有限合伙' && item.domainKey === 'D46'));
  assert.ok(shipping.economicLife.licenses.some((item) => item.kind === 'documented-route-operation-permission'));
  assert.ok(shipping.economicLife.shareholders.some((item) => item.personId === 'parent:father'));

  const guesthouse = play({
    'coastal-path': 'guesthouse-trial',
    'route-port-guesthouse-caterer-1946': 'guesthouse-independent-counter',
  }, '女', 1442);
  assert.ok(guesthouse.economicLife.enterprises.some((item) => item.name === '合成燕宁港口饭食小柜'));
  assert.ok(guesthouse.economicLife.debts.some((item) => item.creditor.includes('许记食材供货人')));

  const trade = play({
    'coastal-path': 'recorded-trade-trial',
    'route-recorded-coastal-small-trader-1946': 'trade-documented-partnership',
  }, '女', 1443);
  assert.ok(trade.economicLife.enterprises.some((item) => item.name === '合成荣宁沿海小货商号' && item.domainKey === 'D45'));
  assert.ok(trade.economicLife.licenses.some((item) => item.kind === 'documented-trade-registration'));
});

test('Macau and Southeast Asia destinations land in named places, jobs and people', () => {
  const macau = play({
    'final-1949': 'move-macau',
    'post49-arrival': 'macau-inner-harbour-bed-work',
  }, '男', 1451);
  assert.equal(macau.post1949Choice, 'macau');
  assert.ok(macau.post1949.place.includes('澳门'));
  assert.ok(macau.post1949.employment.role);
  assert.ok(macau.contacts.post_employer_macau);
  assert.ok(macau.facts.some((fact) => fact.text.includes('澳门')));

  const singapore = play({
    'coastal-path': 'recorded-trade-trial',
    'final-1949': 'move-southeast-asia',
    'post49-arrival': 'singapore-language-trade-work',
  }, '女', 1452);
  assert.equal(singapore.post1949Choice, 'southeast-asia');
  assert.ok(singapore.post1949.place.includes('新加坡'));
  assert.ok(singapore.post1949.employment.role);
  assert.ok(singapore.contacts['post_employer_southeast-asia']);
  assert.ok(singapore.annualNarratives.some((entry) => entry.id === 'echo-post49-singapore-language'));
});

test('rare Macau enterprise path records bounded cooperation, license and concession without inventing another historical concessionaire', () => {
  const state = play({
    'final-1949': 'move-macau',
    'post49-arrival': 'macau-verified-contact-work',
    'macau-hospitality-concession-1962': 'macau-limited-concession-network-partner',
  }, '男', 1462, (current, decision) => {
    if (decision.id !== 'macau-hospitality-concession-1962') return;
    current.res.money = Math.max(current.res.money, 60);
    current.attrs.network = Math.max(current.attrs.network, 70);
    current.res.position = Math.max(current.res.position, 60);
  });
  const enterprise = state.economicLife.enterprises.find((item) => item.name === '合成海湾旅业娱乐协作联合体');
  assert.equal(enterprise.domainKey, 'D48');
  assert.equal(enterprise.kind, 'bounded-fiction-concession-network-partner');
  assert.ok(state.economicLife.licenses.some((item) => item.scope.includes('配套服务')));
  assert.ok(state.economicLife.concessions.some((item) => item.kind === 'limited-participation-under-historical-concession'));
  assert.ok(state.economicLife.concessions.every((item) => item.scope.includes('不取得独立博彩承批人身份')));
  assert.ok(state.annualNarratives.some((entry) => entry.id === 'echo-f14-macau-network-partner'));
});
