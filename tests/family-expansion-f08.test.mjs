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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;
const DEFAULTS = {
  education: 'new-school', marriage: 'marry-with-terms', 'family-future': 'raise-child-together', 'midlife-responsibility': 'household-first',
  'tianjin-clerk-path': 'commercial-clerk-trial',
  'route-tianjin-commercial-clerk-1929': 'clerk-preserve-original', 'route-tianjin-commercial-clerk-1946': 'clerk-salaried-records',
  'route-tianjin-tailoring-garment-worker-1929': 'tailor-trace-garment-steps', 'route-tianjin-tailoring-garment-worker-1946': 'tailor-remain-salaried-cutter',
  'route-tianjin-postal-school-clerk-1929': 'postal-return-record', 'route-tianjin-postal-school-clerk-1946': 'postal-submit-recorded-service',
  'tianjin-rent-school-1921': 'tianjin-protect-rent-pause-school', 'tianjin-clerk-war': 'tianjin-split-records-addresses',
  'tianjin-postwar-reorganization-1948': 'tianjin-keep-current-records', 'postwar-settlement': 'rebuild-local', 'final-1949': 'stay-mainland',
  'post49-arrival': 'mainland-local-work', 'later-life-livelihood': 'change-work', 'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care', 'late-life-record': 'sort-records', 'public-life-contact': 'keep-public-distance',
  'wartime-public-role': 'wartime-open-service', 'public-family-boundary': 'tell-family-risk-range', 'public-past-after-1949': 'state-confirmed-public-past',
};

function play(decisions, gender = '男', seed = 810) {
  const state = Game.createGame({ familyKey: 'tianjinclerks', gender, name: gender === '女' ? '许文澜' : '许文清', seed });
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

test('F08 is the twelfth playable family with three concrete work routes', () => {
  assert.equal(Content.version, '0.7.11');
  assert.equal(Content.designRegistry.families.F08.runtimeStatus, 'playable-verified');
  assert.equal(Content.runtimeFamilyDesignMap.tianjinclerks, 'F08');
  assert.equal(Object.keys(Content.families).length, 12);
  assert.equal(Object.keys(Content.routes).length, 38);
});

test('F08 commercial, tailoring and postal-school routes reach concrete deaths', () => {
  const cases = [
    ['commercial-clerk-trial', 'tianjin-commercial-clerk', '男'],
    ['tailoring-trial', 'tianjin-tailoring-garment-worker', '女'],
    ['postal-school-trial', 'tianjin-postal-school-clerk', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'tianjin-clerk-path': choice }, gender, 810 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F08');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace && record.employer && record.supervisor));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F08 models gendered job entry rather than pronoun swaps', () => {
  const maleClerk = play({ 'tianjin-clerk-path': 'commercial-clerk-trial' }, '男', 819);
  const femaleClerk = play({ 'tianjin-clerk-path': 'commercial-clerk-trial' }, '女', 820);
  const malePostal = play({ 'tianjin-clerk-path': 'postal-school-trial' }, '男', 821);
  const femalePostal = play({ 'tianjin-clerk-path': 'postal-school-trial' }, '女', 822);
  assert.notEqual(maleClerk.careerHistory.find((entry) => entry.routeKey === 'tianjin-commercial-clerk').role, femaleClerk.careerHistory.find((entry) => entry.routeKey === 'tianjin-commercial-clerk').role);
  assert.notEqual(malePostal.careerHistory.find((entry) => entry.routeKey === 'tianjin-postal-school-clerk').role, femalePostal.careerHistory.find((entry) => entry.routeKey === 'tianjin-postal-school-clerk').role);
  assert.ok(femalePostal.genderContext.rule.includes('性别影响可见机会'));
});

test('F08 publishes twenty-four source-linked scenes and thirty choice echoes', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => /^f08-s\d+$/.test(String(scene.id)));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f08-'));
  assert.equal(baseScenes.length, 24);
  assert.equal(echoes.length, 30);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(Content.contentRegistries.sources['SRC-F08-TIANJIN-ARCHIVES']);
  assert.ok(Content.contentRegistries.sources['SRC-F08-TIANJIN-GUILDS']);
});

test('F08 files, garments and returned letters preserve separate owners and unknowns', () => {
  const clerk = play({ 'route-tianjin-commercial-clerk-1929': 'clerk-preserve-original' }, '男', 831);
  assert.ok(clerk.annualNarratives.some((entry) => entry.id === 'echo-f08-clerk-original'));
  const postal = play({ 'tianjin-clerk-path': 'postal-school-trial', 'route-tianjin-postal-school-clerk-1929': 'postal-return-record' }, '女', 832);
  assert.ok(postal.facts.some((fact) => fact.text.includes('原地址与退件原因')));
  assert.equal(postal.subjects.mother.agency >= 90, true);
});

test('F08 enterprises record employees, tools, debts, licenses and independent partners', () => {
  const clerk = play({ 'route-tianjin-commercial-clerk-1946': 'clerk-limited-stationery-partnership' }, '男', 841);
  assert.ok(clerk.economicLife.enterprises.some((item) => item.name === '天津合成文静文具账表小铺' && item.employees === 2));
  assert.ok(clerk.economicLife.debts.some((item) => item.purpose.includes('纸张')));
  const tailor = play({ 'tianjin-clerk-path': 'tailoring-trial', 'route-tianjin-tailoring-garment-worker-1946': 'tailor-limited-garment-workshop' }, '女', 842);
  assert.ok(tailor.economicLife.enterprises.some((item) => item.employees === 3));
  assert.ok(tailor.economicLife.shareholders.some((item) => item.personId === 'parent:mother'));
  assert.ok(tailor.economicLife.shareholders.some((item) => item.personId === 'contact:f08_liu_guizhi'));
  assert.ok(tailor.economicLife.licenses.some((item) => item.kind === 'documented-workshop-registration'));
});

test('F08 occupation and clerical access never imply political identity', () => {
  const profiles = ['tianjin-commercial-clerk', 'tianjin-tailoring-garment-worker', 'tianjin-postal-school-clerk'].map((key) => Content.publicRouteProfiles[key]);
  assert.ok(profiles.every((profile) => /另经|独立/.test(profile.covertRole)));
  const state = play({ 'public-life-contact': 'keep-public-distance' }, '女', 851);
  assert.equal(state.publicLife.status, 'unaffiliated');
  assert.ok(state.facts.some((fact) => /没有参加.*组织/.test(fact.text)));
});
