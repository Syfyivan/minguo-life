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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together', 'midlife-responsibility': 'household-first',
  'northeast-settler-path': 'seasonal-farm-trial',
  'route-northeast-seasonal-farm-worker-1929': 'seasonal-count-workdays', 'route-northeast-seasonal-farm-worker-1946': 'seasonal-remain-waged',
  'route-northeast-household-farm-sideline-1929': 'sideline-isolate-record', 'route-northeast-household-farm-sideline-1946': 'sideline-remain-paid-helper',
  'route-northeast-rural-tool-repairer-1929': 'repair-open-inspect-order', 'route-northeast-rural-tool-repairer-1946': 'repair-remain-waged',
  'northeast-settler-winter-debt-1921': 'winter-keep-seed-food', 'northeast-settler-occupation': 'settler-split-addresses-records',
  'northeast-settler-transition-1948': 'settler-keep-current-records', 'postwar-settlement': 'rebuild-local', 'final-1949': 'stay-mainland',
  'post49-arrival': 'mainland-local-work', 'later-life-livelihood': 'change-work', 'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care', 'late-life-record': 'sort-records', 'public-life-contact': 'keep-public-distance',
  'wartime-public-role': 'wartime-open-service', 'public-family-boundary': 'tell-family-risk-range', 'public-past-after-1949': 'state-confirmed-public-past',
};

function play(decisions, gender = '男', seed = 910) {
  const state = Game.createGame({ familyKey: 'northeastsettlers', gender, name: gender === '女' ? '王守兰' : '王守田', seed });
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

test('F09 is the fourteenth playable family and adds three missing rural domains', () => {
  assert.equal(Content.version, '0.7.13');
  assert.equal(Content.designRegistry.families.F09.runtimeStatus, 'playable-verified');
  assert.equal(Content.runtimeFamilyDesignMap.northeastsettlers, 'F09');
  assert.equal(Object.keys(Content.families).length, 14);
  assert.equal(Object.keys(Content.routes).length, 44);
  assert.equal(new Set(Object.values(Content.legacyRouteDomainMap)).size, 29);
  assert.deepEqual([
    Content.legacyRouteDomainMap['northeast-seasonal-farm-worker'],
    Content.legacyRouteDomainMap['northeast-household-farm-sideline'],
    Content.legacyRouteDomainMap['northeast-rural-tool-repairer'],
  ], ['D02', 'D03', 'D04']);
});

test('F09 seasonal labor, household sideline and rural repair reach concrete deaths', () => {
  const cases = [
    ['seasonal-farm-trial', 'northeast-seasonal-farm-worker', '男'],
    ['household-sideline-trial', 'northeast-household-farm-sideline', '女'],
    ['rural-repair-trial', 'northeast-rural-tool-repairer', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'northeast-settler-path': choice }, gender, 910 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F09');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace && record.employer && record.supervisor));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F09 models gendered work opportunities without reducing ability', () => {
  const maleSeasonal = play({ 'northeast-settler-path': 'seasonal-farm-trial' }, '男', 920);
  const femaleSeasonal = play({ 'northeast-settler-path': 'seasonal-farm-trial' }, '女', 921);
  const maleRepair = play({ 'northeast-settler-path': 'rural-repair-trial' }, '男', 922);
  const femaleRepair = play({ 'northeast-settler-path': 'rural-repair-trial' }, '女', 923);
  assert.notEqual(maleSeasonal.careerHistory.find((entry) => entry.routeKey === 'northeast-seasonal-farm-worker').role, femaleSeasonal.careerHistory.find((entry) => entry.routeKey === 'northeast-seasonal-farm-worker').role);
  assert.notEqual(maleRepair.careerHistory.find((entry) => entry.routeKey === 'northeast-rural-tool-repairer').role, femaleRepair.careerHistory.find((entry) => entry.routeKey === 'northeast-rural-tool-repairer').role);
  assert.ok(femaleRepair.genderContext.rule.includes('性别影响可见机会'));
});

test('F09 publishes twenty-four source-linked scenes and thirty choice echoes', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => /^f09-s\d+$/.test(String(scene.id)));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f09-'));
  assert.equal(baseScenes.length, 24);
  assert.equal(echoes.length, 30);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(Content.contentRegistries.sources['SRC-F09-JILIN-ORAL-HISTORY']);
  assert.ok(Content.contentRegistries.sources['SRC-F09-MIXED-COMMUNITIES']);
  assert.ok(Content.contentRegistries.sources['SRC-F09-LAND-SEIZURE']);
});

test('F09 keeps land, wages, household sideline assets and borrowed tools separate', () => {
  const seasonal = play({
    'northeast-settler-path': 'seasonal-farm-trial',
    'route-northeast-seasonal-farm-worker-1929': 'seasonal-take-part-leave-date',
  }, '女', 931);
  assert.ok(seasonal.annualNarratives.some((entry) => entry.id === 'echo-f09-seasonal-part'));
  const sideline = play({
    'northeast-settler-path': 'household-sideline-trial',
    'route-northeast-household-farm-sideline-1929': 'sideline-reduce-refund',
  }, '女', 932);
  assert.ok(sideline.facts.some((fact) => fact.text.includes('退回无法履行')));
  assert.equal(sideline.subjects.mother.agency >= 90, true);
  const repair = play({
    'northeast-settler-path': 'rural-repair-trial',
    'route-northeast-rural-tool-repairer-1929': 'repair-refund-confirmed-labor',
  }, '男', 933);
  assert.ok(repair.facts.some((fact) => fact.text.includes('工钱')));
});

test('F09 enterprises record workers, tools, debts and independent partners', () => {
  const seasonal = play({ 'route-northeast-seasonal-farm-worker-1946': 'seasonal-limited-work-team' }, '男', 941);
  assert.ok(seasonal.economicLife.enterprises.some((item) => item.name === '吉林合成守义农忙小队' && item.employees === 4));
  assert.ok(seasonal.economicLife.debts.some((item) => item.purpose.includes('雇工工资')));
  const sideline = play({
    'northeast-settler-path': 'household-sideline-trial',
    'route-northeast-household-farm-sideline-1946': 'sideline-limited-food-garden',
  }, '女', 942);
  assert.ok(sideline.economicLife.enterprises.some((item) => item.employees === 2));
  assert.ok(sideline.economicLife.shareholders.some((item) => item.personId === 'parent:mother'));
  assert.ok(sideline.economicLife.shareholders.some((item) => item.personId === 'contact:f09_piao_shunji'));
  const repair = play({
    'northeast-settler-path': 'rural-repair-trial',
    'route-northeast-rural-tool-repairer-1946': 'repair-limited-workshop',
  }, '女', 943);
  assert.ok(repair.economicLife.assets.some((item) => item.description.includes('修理工具')));
  assert.ok(repair.economicLife.shareholders.some((item) => item.personId === 'contact:f09_yao_chunyi'));
});

test('F09 occupation, mixed-community contact and public work never automate political identity', () => {
  const profiles = ['northeast-seasonal-farm-worker', 'northeast-household-farm-sideline', 'northeast-rural-tool-repairer'].map((key) => Content.publicRouteProfiles[key]);
  assert.ok(profiles.every((profile) => /另经|独立/.test(profile.covertRole)));
  const state = play({ 'public-life-contact': 'keep-public-distance' }, '女', 951);
  assert.equal(state.publicLife.status, 'unaffiliated');
  assert.ok(state.facts.some((fact) => /没有参加.*组织/.test(fact.text)));
  assert.ok(state.eraHistory.some((entry) => entry.year === 1931));
  assert.ok(state.contacts.f09_piao_shunji.note.includes('不是王家的固定翻译'));
});
