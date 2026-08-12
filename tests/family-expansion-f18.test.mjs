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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;

const DEFAULTS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'xian-path': 'repair-apprentice',
  'xian-war': 'civilian-repair-only',
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

function play(decisions, gender = '男', seed = 1810) {
  const state = Game.createGame({ familyKey: 'xianartisans', gender, name: gender === '女' ? '杜月琴' : '杜修远', seed });
  const selected = { ...DEFAULTS, ...decisions };
  let turns = 0;
  while (!state.over && turns < 140) {
    const available = Game.availableActions(state);
    const preferred = Game.recommendedActions(state).filter((id) => available.some((action) => action.id === id));
    const actionIds = [];
    let spirit = state.spirit;
    for (const id of preferred) {
      if (actionIds.length >= Game.stageOf(state.age).slots) break;
      const action = available.find((item) => item.id === id);
      if (action && action.spirit <= spirit && !actionIds.includes(id)) {
        actionIds.push(id);
        spirit -= action.spirit;
      }
    }
    Game.advanceYear(state, actionIds);
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

test('F18 is exposed only after its source-linked runtime layer is loaded', () => {
  assert.equal(Content.version, '0.7.5');
  assert.equal(Content.designRegistry.families.F18.runtimeStatus, 'playable-verified');
  assert.equal(Content.designRegistry.families.F18.runtimeFamilyKey, 'xianartisans');
  assert.equal(Content.runtimeFamilyDesignMap.xianartisans, 'F18');
  assert.equal(Object.keys(Content.families).length, 6);
  assert.equal(Object.keys(Content.routes).length, 20);
});

test('F18 repair, station and shop routes are reachable through recorded gender situations', () => {
  const cases = [
    ['repair-apprentice', 'xian-repair', '男'],
    ['repair-apprentice', 'xian-repair', '女'],
    ['station-service', 'xian-station', '女'],
    ['shop-ledger-service', 'xian-shop', '男'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'xian-path': choice }, gender, 1810 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F18');
    assert.ok(state.lived.career.role && state.lived.career.workplace && state.lived.career.employer);
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F18 publishes twenty source-linked scenes and twenty-four visible choice echoes', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('f18-s'));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f18-'));
  assert.equal(baseScenes.length, 20);
  assert.equal(echoes.length, 24);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(baseScenes.every((scene) => scene.sourceIds.length >= 1));
  assert.ok(Content.contentRegistries.sources['SRC-F18-XIAN-ECONOMY-UPPER']);
  assert.ok(Content.contentRegistries.sources['SRC-F18-XIAN-ECONOMY-LOWER']);
  assert.ok(Content.contentRegistries.sources['SRC-F18-MARKET-MEMORY']);
});

test('F18 railway change and shop expansion choices leave cross-year factual consequences', () => {
  const state = play({
    'xian-path': 'shop-ledger-service',
    'route-xian-shop-1929': 'separate-guest-property-ledger',
    'xian-war': 'documented-logistics-job',
    'route-xian-shop-1942': 'family-limited-partnership',
  }, '女', 1829);
  assert.ok(state.firedDecisions.includes('route-xian-shop-1929'));
  assert.ok(state.firedDecisions.includes('route-xian-shop-1942'));
  assert.ok(state.firedDecisions.includes('xian-war'));
  assert.equal(state.warTurnKey, 'documented-logistics-job');
  assert.ok(state.annualNarratives.filter((entry) => String(entry.id).startsWith('echo-f18-')).length >= 4);
  const enterprise = state.economicLife.enterprises.find((record) => record.name === '合成兰珍客饭小店');
  assert.ok(enterprise, 'the chosen family partnership must become a real enterprise record');
  assert.equal(state.economicLife.shareholders.filter((record) => record.enterpriseId === enterprise.id).length, 3);
  assert.ok(state.economicLife.assets.some((record) => record.enterpriseId === enterprise.id && record.id.endsWith(':stoves-stock')));
  assert.equal(state.economicLife.debts.filter((record) => record.enterpriseId === enterprise.id).length, 0);
  assert.equal(state.lived.career.business.name, enterprise.name);
  assert.equal(state.annualNarratives.length, state.endYear - state.identity.born + 1);
});
