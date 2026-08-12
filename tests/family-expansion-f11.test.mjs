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
await import('../assets/demo-engine.js');

const Content = globalThis.MINGUO_GAME_CONTENT;
const Game = globalThis.MINGUO_GAME;

const DEFAULTS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'hankou-port-path': 'dock-cargo-trial',
  'route-hankou-dock-cargo-worker-1929': 'dock-preserve-handoff',
  'route-hankou-dock-cargo-worker-1946': 'dock-salaried-tally',
  'route-hankou-rickshaw-worker-1929': 'rickshaw-inspect-before-deposit',
  'route-hankou-rickshaw-worker-1946': 'rickshaw-continue-shift-rental',
  'route-hankou-river-street-food-stall-1929': 'food-protect-worker-wage',
  'route-hankou-river-street-food-stall-1946': 'food-remain-salaried-manager',
  'hankou-flood-1931': 'flood-move-people-tools-first',
  'hankou-port-war': 'hankou-split-addresses-reserves',
  'postwar-settlement': 'rebuild-local',
  'final-1949': 'stay-mainland',
  'post49-arrival': 'mainland-local-work',
  'later-life-livelihood': 'change-work',
  'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care',
  'late-life-record': 'sort-records',
  'public-life-contact': 'keep-public-distance',
  'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range',
  'public-past-after-1949': 'state-confirmed-public-past',
};

function play(decisions, gender = '男', seed = 1110) {
  const state = Game.createGame({ familyKey: 'hankouport', gender, name: gender === '女' ? '周江梅' : '周江生', seed });
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

test('F11 is the eleventh playable family with three concrete life routes', () => {
  assert.equal(Content.version, '0.7.10');
  assert.equal(Content.designRegistry.families.F11.runtimeStatus, 'playable-verified');
  assert.equal(Content.runtimeFamilyDesignMap.hankouport, 'F11');
  assert.equal(Object.keys(Content.families).length, 11);
  assert.equal(Object.keys(Content.routes).length, 35);
});

test('F11 dock, rickshaw and food-stall routes all reach concrete deaths', () => {
  const cases = [
    ['dock-cargo-trial', 'hankou-dock-cargo-worker', '男'],
    ['rickshaw-trial', 'hankou-rickshaw-worker', '男'],
    ['river-food-trial', 'hankou-river-street-food-stall', '女'],
  ];
  cases.forEach(([choice, route, gender], index) => {
    const state = play({ 'hankou-port-path': choice }, gender, 1110 + index);
    assert.equal(state.routeKey, route);
    assert.equal(state.routeDomainKey, Content.legacyRouteDomainMap[route]);
    assert.equal(state.canonicalFamilyKey, 'F11');
    assert.ok(state.careerHistory.some((record) => record.routeKey === route && record.role && record.workplace && record.employer && record.supervisor));
    assert.ok(Object.values(state.lived.parents).every((parent) => parent.deathYear));
    assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4);
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
  });
});

test('F11 shared paths model gendered opportunities rather than swapping pronouns', () => {
  const maleDock = play({ 'hankou-port-path': 'dock-cargo-trial' }, '男', 1119);
  const femaleDock = play({ 'hankou-port-path': 'dock-cargo-trial' }, '女', 1120);
  const maleRickshaw = play({ 'hankou-port-path': 'rickshaw-trial' }, '男', 1121);
  const femaleRickshaw = play({ 'hankou-port-path': 'rickshaw-trial' }, '女', 1122);
  const maleDockCareer = maleDock.careerHistory.find((record) => record.routeKey === 'hankou-dock-cargo-worker');
  const femaleDockCareer = femaleDock.careerHistory.find((record) => record.routeKey === 'hankou-dock-cargo-worker');
  const maleRickshawCareer = maleRickshaw.careerHistory.find((record) => record.routeKey === 'hankou-rickshaw-worker');
  const femaleRickshawCareer = femaleRickshaw.careerHistory.find((record) => record.routeKey === 'hankou-rickshaw-worker');
  assert.notEqual(maleDockCareer.role, femaleDockCareer.role);
  assert.notEqual(maleDockCareer.workplace, femaleDockCareer.workplace);
  assert.equal(maleRickshawCareer.role, '人力车客货驾驶与码头短驳工');
  assert.equal(femaleRickshawCareer.role, '车行派车收付与短程手车交付工');
  assert.ok(femaleRickshaw.genderContext.rule.includes('性别影响可见机会'));
});

test('F11 publishes twenty-four source-linked scenes and twenty-seven choice echoes', () => {
  const baseScenes = Object.values(Content.contentRegistries.scenes).filter((scene) => /^f11-s\d+$/.test(String(scene.id)));
  const echoes = Object.values(Content.contentRegistries.scenes).filter((scene) => String(scene.id).startsWith('echo-f11-'));
  assert.equal(baseScenes.length, 24);
  assert.equal(echoes.length, 27);
  assert.ok(baseScenes.every((scene) => scene.reviewStatus === 'runtime-regression-and-source-linked-needs-final-review'));
  assert.ok(Content.contentRegistries.sources['SRC-F11-ZHONGSHAN-TRAFFIC']);
  assert.ok(Content.contentRegistries.sources['SRC-F11-HUBEI-DOCK-RECORDS']);
  assert.ok(Content.contentRegistries.sources['SRC-F11-WUHAN-FLOOD-1931']);
  assert.ok(Content.contentRegistries.sources['SRC-F11-WUHAN-LABOR-ORGANIZATION']);
});

test('F11 flood choices preserve separate people, tools, work and unknowns', () => {
  const state = play({ 'hankou-flood-1931': 'flood-move-people-tools-first' }, '女', 1131);
  assert.ok(state.annualNarratives.some((entry) => entry.id === 'echo-f11-flood-move'));
  assert.ok(state.facts.some((fact) => fact.text.includes('谋生工具与凭据')));
  assert.ok(state.contacts.f11_wei_yuying);
  assert.notEqual(state.contacts.f11_wei_yuying.status, 'absorbed-into-household');
});

test('F11 enterprises record workers, assets, debts and licenses instead of title-only success', () => {
  const dock = play({
    'hankou-port-path': 'dock-cargo-trial',
    'route-hankou-dock-cargo-worker-1946': 'dock-limited-cart-team',
  }, '男', 1141);
  assert.ok(dock.economicLife.enterprises.some((item) => item.name === '汉口合成三槐装卸运输小队' && item.employees === 4));
  assert.ok(dock.economicLife.assets.some((item) => item.kind === 'handcarts-ropes-tools'));
  assert.ok(dock.economicLife.licenses.some((item) => item.kind === 'documented-dock-work-permission'));

  const rickshaw = play({
    'hankou-port-path': 'rickshaw-trial',
    'route-hankou-rickshaw-worker-1946': 'rickshaw-buy-one-used-cart',
  }, '男', 1142);
  assert.ok(rickshaw.economicLife.enterprises.some((item) => item.kind === 'single-rickshaw-owner-operator' && item.employees === 0));
  assert.ok(rickshaw.economicLife.debts.some((item) => item.creditor.includes('许记车行')));

  const food = play({
    'hankou-port-path': 'river-food-trial',
    'route-hankou-river-street-food-stall-1946': 'food-limited-family-partnership',
  }, '女', 1143);
  assert.ok(food.economicLife.enterprises.some((item) => item.name === '汉口合成春玉河街饭食社'));
  assert.ok(food.economicLife.shareholders.some((item) => item.personId === 'parent:mother'));
  assert.ok(food.economicLife.shareholders.some((item) => item.personId === 'contact:f11_wei_yuying'));
});

test('F11 political participation is possible but never inferred from occupation', () => {
  const profiles = ['hankou-dock-cargo-worker', 'hankou-rickshaw-worker', 'hankou-river-street-food-stall']
    .map((key) => Content.publicRouteProfiles[key]);
  assert.ok(profiles.every((profile) => profile.covertRole.includes('另经')));
  assert.ok(profiles.every((profile) => !/职业本身.*成员$/.test(profile.publicRole)));

  const state = play({
    'public-life-contact': 'keep-public-distance',
  }, '男', 1151);
  assert.equal(state.publicLife.status, 'unaffiliated');
  assert.ok(state.facts.some((fact) => /没有参加.*组织/.test(fact.text)));
});
