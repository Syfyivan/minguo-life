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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;

const DEFAULTS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'qiaoxiang-path': 'local-shop-trial',
  'qiaoxiang-war': 'split-address-and-accounts',
  'postwar-settlement': 'rebuild-local',
  'final-1949': 'stay-mainland',
  'later-life-livelihood': 'change-work',
  'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care',
  'late-life-record': 'sort-records',
  'public-life-contact': 'keep-public-distance',
  'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range',
  'public-past-after-1949': 'state-confirmed-public-past',
};

function play(decisions, gender = '男', seed = 1310) {
  const state = Game.createGame({ familyKey: 'guangdongqiaoxiang', gender, name: gender === '女' ? '梁月清' : '梁守信', seed });
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

test('F13 becomes the ninth playable family only after its reviewed runtime package loads', () => {
  assert.equal(Content.version, '0.7.8');
  assert.equal(Content.designRegistry.families.F13.runtimeStatus, 'playable-verified');
  assert.equal(Content.designRegistry.families.F13.runtimeFamilyKey, 'guangdongqiaoxiang');
  assert.equal(Content.runtimeFamilyDesignMap.guangdongqiaoxiang, 'F13');
  assert.equal(Object.keys(Content.families).length, 9);
  assert.equal(Object.keys(Content.routes).length, 29);
});

test('F13 shop, correspondence and remittance routes reach concrete full lives', () => {
  const cases = [
    ['local-shop-trial', 'qiaoxiang-local-shop', '女'],
    ['correspondence-trial', 'qiaopi-correspondence-clerk', '男'],
    ['remittance-trial', 'qiaopi-remittance-clerk', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'qiaoxiang-path': choice }, gender, 1310 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F13');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace && record.employer));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F13 gives women and men different historically bounded work rather than pronoun swaps', () => {
  const male = play({ 'qiaoxiang-path': 'remittance-trial' }, '男', 1319);
  const female = play({ 'qiaoxiang-path': 'remittance-trial' }, '女', 1320);
  const maleCareer = male.careerHistory.find((record) => record.routeKey === 'qiaopi-remittance-clerk');
  const femaleCareer = female.careerHistory.find((record) => record.routeKey === 'qiaopi-remittance-clerk');
  assert.equal(maleCareer.role, '银信兑付与外埠账房助理');
  assert.equal(femaleCareer.role, '侨眷汇款凭据核对与家庭账务员');
  assert.notEqual(maleCareer.workplace, femaleCareer.workplace);
  assert.ok(male.genderContext.rule.includes('性别影响可见机会'));
  assert.ok(female.genderContext.rule.includes('性别影响可见机会'));
});

test('F13 publishes twenty source-linked base scenes and twenty-four choice echoes', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('f13-s'));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f13-'));
  assert.equal(baseScenes.length, 20);
  assert.equal(echoes.length, 24);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(baseScenes.every((scene) => scene.sourceIds.length >= 1));
  assert.ok(Content.contentRegistries.sources['SRC-F13-UNESCO-QIAOPI']);
  assert.ok(Content.contentRegistries.sources['SRC-F13-GD-QIAOPI-ATLAS']);
  assert.ok(Content.contentRegistries.sources['SRC-F13-GD-POSTAL-1929-1949']);
});

test('F13 delayed letters keep remittance, address, sender status and death confirmation separate', () => {
  const state = play({
    'qiaoxiang-path': 'correspondence-trial',
    'qiaoxiang-war': 'trace-through-public-channels',
  }, '女', 1331);
  assert.ok(state.annualNarratives.some((entry) => entry.id === 'echo-f13-war-trace'));
  assert.ok(state.facts.some((fact) => fact.text.includes('汇款、书信、地址和父亲状态分别标记')));
  assert.ok(!state.facts.some((fact) => fact.text.includes('断信即死亡')));
  const profile = Content.publicRouteProfiles['qiaopi-correspondence-clerk'];
  assert.ok(profile.covertRole.includes('不进入秘密身份线'));
});

test('F13 local shop can become a named limited partnership without absorbing family property', () => {
  const state = play({
    'qiaoxiang-path': 'local-shop-trial',
    'route-qiaoxiang-local-shop-1942': 'family-shop-partnership',
  }, '女', 1342);
  assert.ok(state.economicLife.enterprises.some((enterprise) => enterprise.id.includes('f13-family-shop')));
  assert.ok(state.economicLife.shareholders.some((holder) => holder.personId === 'parent:mother'));
  assert.ok(state.economicLife.assets.some((asset) => asset.id.includes('f13-family-shop')));
  assert.ok(state.facts.some((fact) => fact.text.includes('按现金、货架、存货和劳动建立有限合伙')));
});
