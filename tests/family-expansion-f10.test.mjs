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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;

const DEFAULTS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'northeast-worker-path': 'railway-trial',
  'northeast-worker-system-change': 'stay-with-duty-boundary',
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

function play(decisions, gender = '男', seed = 1010) {
  const state = Game.createGame({ familyKey: 'northeastrailworkers', gender, name: gender === '女' ? '韩素秋' : '韩守勤', seed });
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

test('F10 becomes the eighth playable family only after its reviewed runtime package loads', () => {
  assert.equal(Content.version, '0.7.7');
  assert.equal(Content.designRegistry.families.F10.runtimeStatus, 'playable-verified');
  assert.equal(Content.designRegistry.families.F10.runtimeFamilyKey, 'northeastrailworkers');
  assert.equal(Content.runtimeFamilyDesignMap.northeastrailworkers, 'F10');
  assert.equal(Object.keys(Content.families).length, 8);
  assert.equal(Object.keys(Content.routes).length, 26);
});

test('F10 railway, mining-ground and repair routes all reach concrete full lives', () => {
  const cases = [
    ['railway-trial', 'northeast-railway-worker', '女'],
    ['mining-ground-trial', 'northeast-mining-ground-worker', '男'],
    ['repair-trial', 'northeast-repair-worker', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'northeast-worker-path': choice }, gender, 1010 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F10');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F10 shared domains use gender-specific historical work instead of pronoun swaps', () => {
  const male = play({ 'northeast-worker-path': 'railway-trial' }, '男', 1019);
  const female = play({ 'northeast-worker-path': 'railway-trial' }, '女', 1020);
  const maleCareer = male.careerHistory.find((record) => record.routeKey === 'northeast-railway-worker');
  const femaleCareer = female.careerHistory.find((record) => record.routeKey === 'northeast-railway-worker');
  assert.equal(maleCareer.role, '线路巡查与货场装卸工');
  assert.equal(femaleCareer.role, '车站票货文书与货场交接员');
  assert.notEqual(maleCareer.workplace, femaleCareer.workplace);
  assert.ok(male.genderContext.rule.includes('性别影响可见机会'));
  assert.ok(female.genderContext.rule.includes('性别影响可见机会'));
});

test('F10 publishes twenty source-linked base scenes and twenty-four choice echoes', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('f10-s'));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f10-'));
  assert.equal(baseScenes.length, 20);
  assert.equal(echoes.length, 24);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(baseScenes.every((scene) => scene.sourceIds.length >= 1));
  assert.ok(Content.contentRegistries.sources['SRC-F10-KUANCHENGZI']);
  assert.ok(Content.contentRegistries.sources['SRC-F10-TOUDAOGOU']);
  assert.ok(Content.contentRegistries.sources['SRC-F10-JILIN-ECONOMY']);
  assert.ok(Content.contentRegistries.sources['SRC-F10-MANTETSU-ARCHIVES']);
});

test('F10 institution changes remain concrete work and household records rather than identity labels', () => {
  const state = play({
    'northeast-worker-path': 'railway-trial',
    'northeast-worker-system-change': 'move-with-confirmed-station-work',
  }, '女', 1031);
  assert.ok(state.annualNarratives.some((entry) => entry.id === 'echo-f10-system-move'));
  assert.ok(state.facts.some((fact) => fact.text.includes('岗位、住处和家人答复都确认')));
  assert.ok(state.careerHistory.some((record) => record.role === '车站票货文书与货场交接员'));
  const f10PublicProfiles = [
    Content.publicRouteProfiles['northeast-railway-worker'],
    Content.publicRouteProfiles['northeast-mining-ground-worker'],
    Content.publicRouteProfiles['northeast-repair-worker'],
  ];
  assert.ok(f10PublicProfiles.every((profile) => profile.covertRole.includes('不进入秘密身份线')));
});
