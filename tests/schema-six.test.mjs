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
await import('../assets/demo-engine.js');

const Game = globalThis.MINGUO_GAME;
const Content = Game.content;

test('schema 6 publishes the 18-family, 48-domain, 8-destination design registry without exposing unfinished families', () => {
  assert.equal(Content.designRegistry.schemaVersion, 6);
  assert.equal(Object.keys(Content.designRegistry.families).length, 18);
  assert.equal(Object.keys(Content.designRegistry.domains).length, 48);
  assert.equal(Object.keys(Content.designRegistry.post1949Destinations).length, 8);

  const playable = Object.values(Content.designRegistry.families)
    .filter((family) => family.runtimeStatus === 'playable-verified')
    .map((family) => family.runtimeFamilyKey)
    .sort();
  assert.deepEqual(playable, Object.keys(Content.families).sort());
  assert.deepEqual(Object.keys(Content.families).sort(), [
    'guangdongcoastal',
    'guangdongqiaoxiang',
    'guanzhongirrigation',
    'hankoucommerce',
    'hankouport',
    'jiangnanshen',
    'northeastrailworkers',
    'northeastsettlers',
    'shanghaigongshang',
    'shanghailabor',
    'sichuanmedicine',
    'southwestwarworkers',
    'subeiartisans',
    'subeipoor',
    'tianjinclerks',
    'xianartisans',
  ]);
  assert.deepEqual(Object.keys(Content.contentRegistries).sort(), ['histories', 'people', 'reviews', 'scenes', 'sources']);
  assert.equal(Object.keys(Content.contentRegistries.scenes).length, Content.ordinaryEvents.length);
  assert.equal(Object.keys(Content.contentRegistries.histories).length, Content.events.length);
  assert.ok(Object.keys(Content.contentRegistries.people).length >= 40);
  assert.ok(Object.keys(Content.contentRegistries.sources).length > 0);
});

test('new games use schema 6 canonical identity and empty extensible life ledgers', () => {
  const state = Game.createGame({ familyKey: 'subeipoor', gender: '女', name: '李秀禾', seed: 606 });

  assert.equal(state.schemaVersion, 6);
  assert.equal(state.canonicalFamilyKey, 'F01');
  assert.equal(state.identity.canonicalFamilyKey, 'F01');
  assert.deepEqual(state.domainHistory, []);
  assert.deepEqual(state.careerHistory, []);
  assert.deepEqual(Object.keys(state.economicLife).sort(), [
    'assets',
    'concessions',
    'debts',
    'employments',
    'enterprises',
    'history',
    'licenses',
    'positions',
    'shareholders',
  ]);
  Object.values(state.economicLife).forEach((records) => assert.deepEqual(records, []));
});

test('schema 4 saves migrate deterministically through schema 5 to schema 6', () => {
  const legacy = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '旧存档人物', seed: 404 });
  legacy.version = '0.7.1';
  legacy.year = 1938;
  legacy.age = 28;
  legacy.routeKey = 'subei-soldier';
  legacy.routeHistory = [
    { year: 1922, from: null, to: 'subei-stay', source: 'subei-livelihood:stay-local' },
    { year: 1937, from: 'subei-stay', to: 'subei-soldier', source: 'subei-war:join-army' },
  ];
  legacy.facts.push({ id: 'legacy-proof', year: 1937, kind: 'decision', text: '这条事实必须保留。', source: 'test', ending: false });
  delete legacy.schemaVersion;
  delete legacy.canonicalFamilyKey;
  delete legacy.identity.canonicalFamilyKey;
  delete legacy.routeDomainKey;
  delete legacy.routeLabel;
  delete legacy.domainHistory;
  delete legacy.careerHistory;
  delete legacy.economicLife;
  delete legacy.migrationHistory;

  const envelope = { format: 'minguo-life-save', schemaVersion: 4, gameVersion: '0.7.1', state: legacy };
  const first = Game.importGame(envelope);
  const second = Game.importGame(envelope);

  assert.equal(first.schemaVersion, 6);
  assert.equal(first.canonicalFamilyKey, 'F01');
  assert.equal(first.routeKey, 'subei-soldier');
  assert.equal(first.routeDomainKey, 'D37');
  assert.deepEqual(first.routeHistory.map(({ to }) => to), ['subei-stay', 'subei-soldier']);
  assert.deepEqual(first.domainHistory.map(({ domainKey }) => domainKey), ['D01', 'D37']);
  assert.equal(first.careerHistory.at(-1).routeKey, 'subei-soldier');
  assert.equal(first.careerHistory.at(-1).status, 'active');
  assert.ok(first.economicLife.employments.some((record) => record.routeKey === 'subei-soldier'));
  assert.ok(first.facts.some((fact) => fact.id === 'legacy-proof'));
  assert.deepEqual(first.migrationHistory.map(({ migration }) => migration), ['schema-4-to-5', 'schema-5-to-6']);
  assert.deepEqual(first, second);
});

test('schema 5 saves receive canonical histories without changing their legacy route key', () => {
  const legacy = Game.createGame({ familyKey: 'jiangnanshen', gender: '女', name: '中转存档人物', seed: 505 });
  legacy.version = '0.7.1';
  legacy.schemaVersion = 5;
  legacy.year = 1930;
  legacy.age = 22;
  legacy.routeKey = 'shen-scholar';
  legacy.routeDomainKey = 'D20';
  legacy.routeLabel = '读书人与公共写作者';
  legacy.routeHistory = [{
    year: 1921,
    from: null,
    to: 'shen-scholar',
    source: 'shen-path:scholar',
    domainKey: 'D20',
    routeLabel: '读书人与公共写作者',
  }];
  delete legacy.domainHistory;
  delete legacy.careerHistory;
  delete legacy.economicLife;
  delete legacy.migrationHistory;

  const restored = Game.importGame({ format: 'minguo-life-save', schemaVersion: 5, state: legacy });
  const exported = JSON.parse(Game.exportGame(restored));

  assert.equal(restored.routeKey, 'shen-scholar');
  assert.equal(restored.routeDomainKey, 'D20');
  assert.equal(restored.domainHistory[0].domainKey, 'D20');
  assert.equal(restored.careerHistory[0].routeKey, 'shen-scholar');
  assert.deepEqual(restored.migrationHistory.map(({ migration }) => migration), ['schema-5-to-6']);
  assert.equal(exported.schemaVersion, 6);
  assert.equal(exported.state.schemaVersion, 6);
});

test('post-1949 work uses the canonical destination and closes its domain when fixed work ends', () => {
  const legacy = Game.createGame({ familyKey: 'jiangnanshen', gender: '男', name: '海外谋生人物', seed: 808 });
  legacy.schemaVersion = 5;
  legacy.year = 1949;
  legacy.age = 41;
  legacy.routeKey = 'shen-scholar';
  legacy.routeHistory = [{ year: 1921, from: null, to: 'shen-scholar', source: 'shen-path:scholar' }];
  delete legacy.domainHistory;
  delete legacy.careerHistory;
  delete legacy.economicLife;
  const state = Game.importGame({ format: 'minguo-life-save', schemaVersion: 5, state: legacy });

  state.year = 1955;
  state.age = 47;
  state.post1949Choice = 'overseas';
  state.post1949.choice = 'overseas';
  state.post1949.region = '前往其他海外地区';
  Object.assign(state.post1949.employment, {
    status: 'employed',
    track: 'literate',
    role: '商店文书员',
    workplace: '当地华人商店',
    duties: '抄写货单并整理来函',
    terms: '按月结算',
    startedYear: 1951,
    lastResultYear: 1955,
  });

  const employed = JSON.parse(Game.exportGame(state)).state;
  assert.equal(employed.post1949.destinationKey, 'other-overseas');
  assert.equal(employed.domainHistory.at(-1).domainKey, 'D22');
  assert.equal(employed.domainHistory.at(-1).endYear, null);
  assert.equal(employed.careerHistory.at(-1).routeKey, 'post:other-overseas');
  assert.ok(employed.economicLife.employments.some((record) => record.destinationKey === 'other-overseas'));

  state.post1949.employment.status = 'retired';
  state.post1949.employment.lastResultYear = 1968;
  state.year = 1968;
  state.age = 60;
  const retired = JSON.parse(Game.exportGame(state)).state;
  assert.equal(retired.domainHistory.at(-1).endYear, 1968);
  assert.equal(retired.careerHistory.at(-1).status, 'ended');
});
