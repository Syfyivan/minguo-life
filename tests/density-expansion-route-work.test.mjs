import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.window = globalThis;
for (const file of [
  'game-content', 'life-expansion', 'complete-life', 'postwar-era', 'lived-life', 'public-life',
  'family-expansion', 'family-expansion-f17', 'family-expansion-f18', 'family-expansion-f05',
  'family-expansion-f10', 'family-expansion-f13', 'family-expansion-f14', 'family-expansion-f11',
  'family-expansion-f08', 'family-expansion-f12', 'family-expansion-f09', 'family-expansion-f15',
  'family-expansion-f02', 'family-expansion-f03', 'family-expansion-f07',
  'domain-expansion-education-knowledge', 'domain-expansion-medical-public-health',
  'domain-expansion-care-professional-associations', 'domain-expansion-wartime-relief-public-service',
  'domain-expansion-identity-finance-concession', 'density-expansion-family-life',
  'density-expansion-route-work', 'demo-engine',
]) await import(`../assets/${file}.js`);

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const pack = Content.ordinaryEvents.filter((event) => event.densityPack === 'route-work-v1');
const categories = ['first-shift', 'authority-conflict', 'colleague-change', 'public-answer'];

test('all seventy-one routes receive the four concrete work scenes', () => {
  assert.equal(Content.version, '0.7.24');
  assert.deepEqual(Content.densityExpansion.routeWorkV1, {
    version: '0.7.24', routeCount: 71, scenesPerRoute: 4, sceneCount: 284, categories,
    note: '第二批完整人生密度包：七十一条路线岗位四连场；不代表五千条场景总门槛已经完成。',
  });
  assert.equal(pack.length, 284);
  assert.equal(new Set(pack.map((event) => event.id)).size, 284);
  for (const routeKey of Object.keys(Content.routes)) {
    const scenes = pack.filter((event) => event.routes.includes(routeKey));
    assert.equal(scenes.length, 4, routeKey);
    assert.deepEqual(scenes.map((scene) => scene.densityCategory), categories);
  }
});

test('each route-work scene has a concrete cast, consequence, sources and review record', () => {
  for (const scene of pack) {
    assert.equal(scene.reviewStatus, 'structured-route-profile-source-linked-first-pass-reviewed');
    assert.deepEqual(scene.routeWorkFacets, [
      'specific-role', 'specific-workplace', 'supervisor', 'colleague', 'public-person', 'same-year-result', 'later-consequence',
    ]);
    assert.ok(scene.sourceIds.length >= 2, `${scene.id} needs at least two sources`);
    assert.ok(scene.sourceIds.every((id) => Content.reviewSources[id]), `${scene.id} source must resolve`);
    assert.ok(Object.values(scene.textByGender).every((text) => text.length >= 170), `${scene.id} must be a full scene`);
    assert.ok(Content.contentRegistries.scenes[scene.id]);
    assert.equal(Content.contentRegistries.reviews[`scene:${scene.id}`].status, scene.reviewStatus);
  }
});

test('gender-specific route profiles render different concrete work where the era changes the job', () => {
  const routeKey = 'shanghai-transport-worker';
  const target = pack.find((event) => event.routes.includes(routeKey) && event.densityCategory === 'first-shift');
  assert.notEqual(target.textByGender.男, target.textByGender.女);

  function trigger(gender) {
    const state = Game.createGame({ familyKey: 'shanghailabor', gender, name: `岗位测试-${gender}`, seed: 724 });
    state.routeKey = routeKey;
    state.year = state.identity.born + 22;
    state.age = 22;
    state.firedOrdinaryEvents = Content.ordinaryEvents.filter((event) => event.id !== target.id).map((event) => event.id);
    Game.advanceYear(state, []);
    assert.equal(state.lastOrdinaryEvent.id, target.id);
    return state.lastOrdinaryEvent.text;
  }

  assert.notEqual(trigger('男'), trigger('女'));
});

test('all 284 work scenes can be selected in their compatible route and time scope', () => {
  for (const target of pack) {
    const routeKey = target.routes[0];
    const familyKey = Content.routes[routeKey].family;
    const state = Game.createGame({ familyKey, gender: '女', name: `可达-${target.id}`, seed: 724 });
    state.routeKey = routeKey;
    const earliest = state.identity.born + target.minAge;
    state.year = target.minYear == null ? earliest : Math.max(earliest, target.minYear);
    if (target.maxYear != null) state.year = Math.min(state.year, target.maxYear);
    state.age = state.year - state.identity.born;
    if (target.post1949Choices) {
      state.post1949Choice = target.post1949Choices[0];
      state.post1949.choice = target.post1949Choices[0];
    }
    state.firedOrdinaryEvents = Content.ordinaryEvents.filter((event) => event.id !== target.id).map((event) => event.id);
    Game.advanceYear(state, []);
    assert.equal(state.lastOrdinaryEvent.id, target.id, `${target.id} must be reachable`);
  }
});

test('pre-1949 route workplaces do not leak into a migrated postwar life, while the Macau route is scoped to Macau', () => {
  const state = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '迁居岗位测试', seed: 1952 });
  state.routeKey = 'subei-millworker';
  state.year = 1952;
  state.age = 42;
  state.post1949Choice = 'hong-kong';
  state.post1949.choice = 'hong-kong';
  state.firedOrdinaryEvents = Content.ordinaryEvents
    .filter((event) => event.densityPack !== 'route-work-v1' && !String(event.id).startsWith('rhythm:post-hong-kong:'))
    .map((event) => event.id);
  Game.advanceYear(state, []);
  assert.match(state.lastOrdinaryEvent.id, /^rhythm:post-hong-kong:/);

  const macauScenes = pack.filter((event) => event.routes.includes('macao-tourism-entertainment-concession'));
  assert.ok(macauScenes.every((event) => event.minYear === 1962));
  assert.ok(macauScenes.every((event) => event.post1949Choices.length === 1 && event.post1949Choices[0] === 'macau'));
});
