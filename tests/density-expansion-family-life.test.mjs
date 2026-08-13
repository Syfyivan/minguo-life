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
await import('../assets/domain-expansion-education-knowledge.js');
await import('../assets/domain-expansion-medical-public-health.js');
await import('../assets/domain-expansion-care-professional-associations.js');
await import('../assets/domain-expansion-wartime-relief-public-service.js');
await import('../assets/domain-expansion-identity-finance-concession.js');
await import('../assets/density-expansion-family-life.js');
await import('../assets/density-expansion-route-work.js');
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const pack = Content.ordinaryEvents.filter((event) => event.densityPack === 'family-life-v1');
const categories = ['parent', 'friend', 'spouse', 'health', 'work', 'customer'];

test('the first family-life density pack adds twelve concrete scenes to all eighteen families', () => {
  assert.deepEqual(Content.densityExpansion.familyLifeV1, {
    version: '0.7.23', familyCount: 18, scenesPerFamily: 12, sceneCount: 216,
    categories, note: '第一批家庭具体生活密度包；不代表五千条场景总门槛已经完成。',
  });
  assert.equal(pack.length, 216);
  assert.equal(new Set(pack.map((event) => event.id)).size, 216);

  for (const familyKey of Object.keys(Content.families)) {
    const familyScenes = pack.filter((event) => event.families.includes(familyKey));
    assert.equal(familyScenes.length, 12, `${familyKey} needs twelve scenes`);
    for (const category of categories) {
      assert.equal(familyScenes.filter((event) => event.densityCategory === category).length, 2, `${familyKey}/${category}`);
    }
  }
});

test('every density scene carries concrete-life facets, review status and resolvable sources', () => {
  for (const scene of pack) {
    assert.equal(scene.reviewStatus, 'human-authored-source-linked-first-pass-reviewed');
    assert.equal(scene.familyOriginOnly, true);
    assert.deepEqual(scene.densityFacets, [
      'named-person', 'specific-place', 'physical-object', 'conflict', 'same-year-result', 'later-consequence',
    ]);
    assert.ok(scene.sourceIds.length >= 2, `${scene.id} needs at least two sources`);
    assert.ok(scene.sourceIds.every((sourceId) => Content.reviewSources[sourceId]), `${scene.id} source must resolve`);
    const texts = scene.textByGender ? Object.values(scene.textByGender) : [scene.text];
    assert.ok(texts.every((text) => text.length >= 120), `${scene.id} must remain concrete rather than a short label`);
    assert.ok(Content.contentRegistries.scenes[scene.id], `${scene.id} must enter the runtime registry`);
    assert.equal(Content.contentRegistries.reviews[`scene:${scene.id}`].status, scene.reviewStatus);
  }
});

test('marriage scenes render the spouse and work context for the selected gender', () => {
  function trigger(gender, expectedSpouse) {
    const state = Game.createGame({ familyKey: 'subeipoor', gender, name: `婚姻测试-${gender}`, seed: 723 });
    const targetId = 'density-f01-spouse-household-ledger';
    state.year = state.identity.born + 25;
    state.age = 25;
    state.subjects.spouse.status = 'alive';
    state.firedOrdinaryEvents = Content.ordinaryEvents.filter((event) => event.id !== targetId).map((event) => event.id);
    Game.advanceYear(state, []);
    assert.equal(state.lastOrdinaryEvent.id, targetId);
    assert.match(state.lastOrdinaryEvent.text, new RegExp(expectedSpouse));
    assert.match(state.lastOrdinaryEvent.text, /工资|工作/);
    return state.lastOrdinaryEvent.text;
  }

  const maleText = trigger('男', '周杏云');
  const femaleText = trigger('女', '赵文山');
  assert.notEqual(maleText, femaleText);
});

test('family-origin scenes do not leak into a migrated post-1949 region', () => {
  const state = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '迁居测试', seed: 1951 });
  state.year = 1951;
  state.age = 41;
  state.post1949Choice = 'hong-kong';
  state.post1949.choice = 'hong-kong';
  state.firedOrdinaryEvents = Content.ordinaryEvents
    .filter((event) => !event.familyOriginOnly && !String(event.id).startsWith('rhythm:post-hong-kong:'))
    .map((event) => event.id);
  Game.advanceYear(state, []);
  assert.match(state.lastOrdinaryEvent.id, /^rhythm:post-hong-kong:/);
  assert.doesNotMatch(state.lastOrdinaryEvent.id, /^density-f01-/);
});
