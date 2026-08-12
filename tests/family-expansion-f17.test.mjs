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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;

const DEFAULTS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'guanzhong-path': 'farm-water-work',
  'guanzhong-war': 'keep-family-address-ledger',
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

function play(decisions, gender = '男', seed = 1710) {
  const state = Game.createGame({ familyKey: 'guanzhongirrigation', gender, name: gender === '女' ? '马秀梅' : '马保川', seed });
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

test('F17 is exposed only after its reviewed runtime layer is loaded', () => {
  assert.equal(Content.version, '0.7.4');
  assert.equal(Content.designRegistry.families.F17.runtimeStatus, 'playable-verified');
  assert.equal(Content.designRegistry.families.F17.runtimeFamilyKey, 'guanzhongirrigation');
  assert.equal(Content.runtimeFamilyDesignMap.guanzhongirrigation, 'F17');
  assert.equal(Object.keys(Content.families).length, 5);
  assert.equal(Object.keys(Content.routes).length, 17);
});

test('F17 farm-water, market and migration routes are reachable by recorded genders', () => {
  const cases = [
    ['farm-water-work', 'guanzhong-farmwater', '男'],
    ['farm-water-work', 'guanzhong-farmwater', '女'],
    ['market-grain-work', 'guanzhong-market', '女'],
    ['verified-migration-work', 'guanzhong-migration', '男'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'guanzhong-path': choice }, gender, 1710 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F17');
    assert.ok(state.lived.career.role && state.lived.career.workplace && state.lived.career.employer);
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F17 publishes twenty source-linked family scenes without hiding selection consequences', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('f17-s'));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f17-'));
  assert.equal(baseScenes.length, 20);
  assert.equal(echoes.length, 24);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(baseScenes.every((scene) => scene.sourceIds.length >= 1));
  assert.ok(Content.contentRegistries.sources['SRC-F17-IRRIGATION']);
  assert.ok(Content.contentRegistries.sources['SRC-F17-FAMINE']);
});

test('F17 drought and wartime decisions leave factual, cross-year consequences', () => {
  const state = play({
    'guanzhong-path': 'market-grain-work',
    'route-guanzhong-market-1929': 'public-relief-ledger',
    'guanzhong-war': 'split-work-with-addresses',
  }, '女', 1729);
  assert.ok(state.firedDecisions.includes('route-guanzhong-market-1929'));
  assert.ok(state.firedDecisions.includes('guanzhong-war'));
  assert.equal(state.warTurnKey, 'split-work-with-addresses');
  assert.ok(state.annualNarratives.filter((entry) => String(entry.id).startsWith('echo-f17-')).length >= 4);
  assert.equal(state.annualNarratives.length, state.endYear - state.identity.born + 1);
});
