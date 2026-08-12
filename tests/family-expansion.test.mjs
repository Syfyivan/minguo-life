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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;

const DEFAULTS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'sichuan-path': 'pharmacy-clerk',
  'sichuan-war': 'keep-verified-stock',
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

function play(decisions, gender = '女', seed = 1610) {
  const state = Game.createGame({ familyKey: 'sichuanmedicine', gender, name: gender === '女' ? '唐秀莲' : '唐济生', seed });
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

test('F16 is the first reviewed new family exposed by the complete-design registry', () => {
  assert.equal(Content.version, '0.7.3');
  assert.equal(Content.designRegistry.families.F16.runtimeStatus, 'playable-verified');
  assert.equal(Content.designRegistry.families.F16.runtimeFamilyKey, 'sichuanmedicine');
  assert.equal(Content.runtimeFamilyDesignMap.sichuanmedicine, 'F16');
  assert.ok(Content.families.sichuanmedicine);
  assert.equal(Object.keys(Content.families).length, 4);
});

test('F16 offers pharmacy, food-shop and care routes to both recorded genders', () => {
  const cases = [
    ['pharmacy-clerk', 'sichuan-pharmacy', '男'],
    ['food-shop', 'sichuan-foodshop', '女'],
    ['care-training', 'sichuan-care', '女'],
    ['care-training', 'sichuan-care', '男'],
  ];
  for (const [choice, route, gender] of cases) {
    const state = play({ 'sichuan-path': choice }, gender, 1610 + cases.indexOf(cases.find((item) => item[0] === choice && item[2] === gender)));
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F16');
    assert.ok(state.lived.career.role && state.lived.career.workplace && state.lived.career.employer);
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  }
});

test('F16 scenes carry source and review metadata into schema-six registries', () => {
  const scenes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('f16-s'));
  assert.equal(scenes.length, 20);
  assert.ok(scenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(scenes.every((scene) => scene.sourceIds.length >= 1));
  assert.ok(Content.contentRegistries.sources['SRC-F16-COMMERCE']);
  assert.equal(Content.contentRegistries.reviews['scene:f16-s01'].status, 'runtime-regression-and-source-linked-needs-final-review');
});

test('F16 war and route decisions leave four visible cross-year echoes', () => {
  const state = play({ 'sichuan-path': 'food-shop', 'sichuan-war': 'local-food-substitute' }, '女', 1622);
  assert.ok(state.firedDecisions.includes('sichuan-war'));
  assert.equal(state.warTurnKey, 'local-food-substitute');
  assert.ok(state.facts.filter((fact) => String(fact.source).startsWith('route-sichuan-')).length >= 2);
  assert.ok(state.annualNarratives.filter((entry) => String(entry.id).startsWith('echo-')).length >= 4);
  assert.equal(state.annualNarratives.length, state.endYear - state.identity.born + 1);
});
