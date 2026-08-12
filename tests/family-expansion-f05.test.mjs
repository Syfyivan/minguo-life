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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;

const DEFAULTS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'shanghai-labor-path': 'textile-trial',
  'shanghai-labor-war': 'separate-address-work',
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

function play(decisions, gender = '男', seed = 510) {
  const state = Game.createGame({ familyKey: 'shanghailabor', gender, name: gender === '女' ? '李玉兰' : '李守成', seed });
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

test('F05 becomes the seventh playable family only after its reviewed runtime package loads', () => {
  assert.equal(Content.version, '0.7.6');
  assert.equal(Content.designRegistry.families.F05.runtimeStatus, 'playable-verified');
  assert.equal(Content.designRegistry.families.F05.runtimeFamilyKey, 'shanghailabor');
  assert.equal(Content.runtimeFamilyDesignMap.shanghailabor, 'F05');
  assert.equal(Object.keys(Content.families).length, 7);
  assert.equal(Object.keys(Content.routes).length, 23);
});

test('F05 textile, transport and domestic-service routes all reach concrete full lives', () => {
  const cases = [
    ['textile-trial', 'shanghai-textile-worker', '女'],
    ['transport-trial', 'shanghai-transport-worker', '男'],
    ['domestic-service-trial', 'shanghai-domestic-service', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'shanghai-labor-path': choice }, gender, 510 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F05');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('shared F05 domains use gender-specific historical work rather than pronoun swaps', () => {
  const male = play({ 'shanghai-labor-path': 'transport-trial' }, '男', 519);
  const female = play({ 'shanghai-labor-path': 'transport-trial' }, '女', 520);
  const maleCareer = male.careerHistory.find((record) => record.routeKey === 'shanghai-transport-worker');
  const femaleCareer = female.careerHistory.find((record) => record.routeKey === 'shanghai-transport-worker');
  assert.equal(maleCareer.role, '租车拉客与短途运货人');
  assert.equal(femaleCareer.role, '货物交接与弄堂送件人');
  assert.notEqual(maleCareer.workplace, femaleCareer.workplace);
  assert.ok(male.genderContext.rule.includes('性别影响可见机会'));
  assert.ok(female.genderContext.rule.includes('性别影响可见机会'));
});

test('F05 publishes twenty source-linked base scenes and twenty-four choice echoes', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('f05-s'));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f05-'));
  assert.equal(baseScenes.length, 20);
  assert.equal(echoes.length, 24);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(baseScenes.every((scene) => scene.sourceIds.length >= 1));
  assert.ok(Content.contentRegistries.sources['SRC-F05-SHANGHAI-SOCIETY']);
  assert.ok(Content.contentRegistries.sources['SRC-F05-SHANGHAI-ADMIN']);
});

test('F05 laundry partnership creates real ownership while preserving mother and friend as partners', () => {
  const state = play({
    'shanghai-labor-path': 'domestic-service-trial',
    'route-shanghai-domestic-service-1929': 'protect-client-ledger-boundary',
    'shanghai-labor-war': 'separate-address-work',
    'route-shanghai-domestic-service-1942': 'lane-laundry-partnership',
  }, '女', 542);
  const enterprise = state.economicLife.enterprises.find((record) => record.name === '合成阿宝银娣洗衣缝补社');
  assert.ok(enterprise);
  assert.equal(state.economicLife.shareholders.filter((record) => record.enterpriseId === enterprise.id).length, 3);
  assert.equal(state.economicLife.assets.filter((record) => record.enterpriseId === enterprise.id).length, 1);
  assert.equal(state.economicLife.debts.filter((record) => record.enterpriseId === enterprise.id).length, 0);
  assert.ok(state.annualNarratives.filter((entry) => String(entry.id).startsWith('echo-f05-')).length >= 4);
  assert.equal(state.annualNarratives.length, state.endYear - state.identity.born + 1);
});
