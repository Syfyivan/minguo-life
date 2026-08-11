import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.window = globalThis;
await import('../assets/game-content.js');
await import('../assets/demo-engine.js');

const Game = globalThis.MINGUO_GAME;

const DEFAULT_DECISIONS = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'subei-livelihood': 'stay-local',
  'subei-war': 'stay-and-hide',
  'shen-path': 'scholar',
  'shen-war': 'move-with-family',
  'shanghai-path': 'business-heir',
  'shanghai-war': 'protect-workers',
  'postwar-settlement': 'rebuild-local',
  'final-1949': 'stay-mainland',
};

function playScenario({
  familyKey,
  gender = '男',
  name = '测试角色',
  seed = 7,
  decisions = {},
  actionPicker = () => [],
}) {
  const state = Game.createGame({ familyKey, gender, name, seed });
  const decisionMap = { ...DEFAULT_DECISIONS, ...decisions };
  let turns = 0;

  while (!state.over && turns < 80) {
    const actionIds = actionPicker(state, Game.availableActions(state));
    Game.advanceYear(state, actionIds);
    while (state.pendingDecision) {
      const decision = state.pendingDecision;
      const requested = decisionMap[decision.id];
      const available = decision.options.filter((option) => option.enabled);
      const option = available.find((item) => item.id === requested) || available[0];
      assert.ok(option, `decision ${decision.id} must have an available option`);
      Game.choose(state, option.id);
    }
    turns += 1;
  }

  assert.equal(state.over, true, `${familyKey} scenario should reach an ending`);
  assert.ok(turns < 80, `${familyKey} scenario should not stall`);
  return state;
}

test('a player keeps the same identity while moving between life routes', () => {
  const state = playScenario({
    familyKey: 'subeipoor',
    name: '李禾生',
    decisions: { 'subei-war': 'flee-south' },
  });

  assert.equal(state.identity.name, '李禾生');
  assert.equal(state.routeKey, 'subei-refugee');
  assert.match(Game.buildEndingNarrative(state), /李禾生/);
  assert.doesNotMatch(Game.buildEndingNarrative(state), /赵长庚/);
});

test('the four Subei routes are all reachable through explicit decisions', () => {
  const cases = [
    [{ 'subei-livelihood': 'stay-local', 'subei-war': 'stay-and-hide' }, 'subei-stay'],
    [{ 'subei-livelihood': 'stay-local', 'subei-war': 'join-army' }, 'subei-soldier'],
    [{ 'subei-livelihood': 'stay-local', 'subei-war': 'flee-south' }, 'subei-refugee'],
    [{ 'subei-livelihood': 'enter-mill', 'subei-war': 'remain-worker' }, 'subei-millworker'],
  ];

  for (const [decisions, expectedRoute] of cases) {
    const state = playScenario({ familyKey: 'subeipoor', gender: '女', decisions });
    assert.equal(state.routeKey, expectedRoute);
  }
});

test('new-woman routes preserve the selected character identity', () => {
  const male = Game.createGame({ familyKey: 'jiangnanshen', gender: '男', name: '沈砚清', seed: 11 });
  const female = Game.createGame({ familyKey: 'jiangnanshen', gender: '女', name: '沈毓宁', seed: 11 });

  while (male.year < 1921) {
    Game.advanceYear(male, []);
    while (male.pendingDecision) Game.choose(male, male.pendingDecision.options.find((option) => option.enabled).id);
  }
  while (female.year < 1921) {
    Game.advanceYear(female, []);
    while (female.pendingDecision) Game.choose(female, female.pendingDecision.options.find((option) => option.enabled).id);
  }
  Game.advanceYear(male, []);
  Game.advanceYear(female, []);

  assert.equal(male.pendingDecision.options.find((option) => option.id === 'new-woman').enabled, false);
  assert.equal(female.pendingDecision.options.find((option) => option.id === 'new-woman').enabled, true);
});

test('a subject death is recorded as occurrence and later confirmation', () => {
  const state = playScenario({
    familyKey: 'subeipoor',
    decisions: { 'subei-war': 'join-army' },
  });

  const occurrence = state.facts.find((fact) => fact.id === 'mother-death-occurred');
  const confirmation = state.facts.find((fact) => fact.id === 'mother-death-confirmed');
  assert.ok(occurrence);
  assert.ok(confirmation);
  assert.ok(occurrence.year < confirmation.year);
  assert.equal(state.subjects.mother.status, 'dead-confirmed');
});

test('a spouse gets an independent wartime response instead of waiting by default', () => {
  const state = playScenario({
    familyKey: 'subeipoor',
    decisions: { 'subei-war': 'join-army' },
  });

  assert.notEqual(state.subjects.spouse.status, 'waiting-by-default');
  assert.ok(state.facts.some((fact) => fact.id === 'spouse-autonomy'));
});

test('information channels change what the player can name about an era shock', () => {
  const uninformed = playScenario({
    familyKey: 'shanghaigongshang',
    decisions: { education: 'learn-work' },
  });
  const informed = playScenario({
    familyKey: 'shanghaigongshang',
    actionPicker(state, available) {
      if (state.year < 1938 && available.some((action) => action.id === 'read-newspaper')) {
        return ['read-newspaper'];
      }
      return [];
    },
  });

  assert.ok(uninformed.unknownImpacts.includes('gold-yuan-1948'));
  assert.ok(informed.knownEvents.includes('gold-yuan-1948'));
  assert.ok(informed.information.channels.includes('newspaper'));
});

test('all three families can complete a life with fact-only endings', () => {
  const scenarios = [
    playScenario({ familyKey: 'subeipoor' }),
    playScenario({ familyKey: 'jiangnanshen' }),
    playScenario({ familyKey: 'shanghaigongshang' }),
  ];
  const bannedRanks = /成功|失败|安稳|挣扎|爬得很高|万幸/;

  for (const state of scenarios) {
    const ending = Game.buildEndingNarrative(state);
    assert.doesNotMatch(ending, bannedRanks);
    assert.ok(state.facts.some((fact) => fact.id === 'final-1949'));
    assert.ok(state.endingFacts.length >= 4);
  }
});

test('the same seed and decisions reproduce the same life ledger', () => {
  const first = playScenario({ familyKey: 'jiangnanshen', seed: 42 });
  const second = playScenario({ familyKey: 'jiangnanshen', seed: 42 });
  assert.deepEqual(first.facts, second.facts);
  assert.deepEqual(first.routeHistory, second.routeHistory);
  assert.equal(Game.buildEndingNarrative(first), Game.buildEndingNarrative(second));
});

test('every played year receives one ordinary-life narrative', () => {
  const state = playScenario({ familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'new-woman' } });
  const years = state.annualNarratives.map((entry) => entry.year);

  assert.equal(years.length, state.endYear - state.identity.born + 1);
  assert.equal(new Set(years).size, years.length);
  assert.ok(state.annualNarratives.some((entry) => entry.kind === 'scene'));
  assert.ok(state.annualNarratives.some((entry) => entry.kind === 'rhythm'));
});

test('persistent contacts keep their own status and relationship history', () => {
  const state = playScenario({
    familyKey: 'shanghaigongshang',
    gender: '女',
    decisions: { 'shanghai-path': 'urban-new-woman' },
    actionPicker(current, available) {
      const ids = available.map((action) => action.id);
      if (ids.includes('workroom')) return ['workroom'];
      if (ids.includes('talk-neighbors')) return ['talk-neighbors'];
      return [];
    },
  });

  assert.ok(state.contacts.tang_huizhen.relation > 26);
  assert.equal(state.contacts.tang_huizhen.status, 'colleague');
  assert.ok(state.contactHistory.some((entry) => entry.contactKey === 'tang_huizhen'));
});

test('family lifecycle allows care without forcing marriage or children', () => {
  const married = playScenario({ familyKey: 'jiangnanshen' });
  const unmarried = playScenario({
    familyKey: 'jiangnanshen',
    decisions: { marriage: 'refuse-marriage', 'family-future': 'raise-child-together' },
  });

  assert.equal(married.subjects.children.status, 'raising-child-together');
  assert.notEqual(unmarried.subjects.children.status, 'raising-child-together');
  assert.ok(unmarried.facts.some((fact) => fact.source === 'family-future'));
});

test('portable saves round-trip without changing the life ledger', () => {
  const state = playScenario({ familyKey: 'subeipoor', decisions: { 'subei-war': 'join-army' } });
  const restored = Game.importGame(Game.exportGame(state));

  assert.equal(restored.version, '0.3.0');
  assert.deepEqual(restored.identity, state.identity);
  assert.deepEqual(restored.facts, state.facts);
  assert.deepEqual(restored.annualNarratives, state.annualNarratives);
  assert.deepEqual(restored.contacts, state.contacts);
  assert.equal(Game.buildEndingNarrative(restored), Game.buildEndingNarrative(state));
});

test('abilities and resources stay inside the published 0 to 100 domain', () => {
  const state = playScenario({
    familyKey: 'shanghaigongshang',
    decisions: { 'shanghai-path': 'business-heir' },
    actionPicker(current, available) {
      const action = available.find((item) => item.id === 'run-business') || available.find((item) => item.id === 'learn-business');
      if (action) return action.spirit * 2 <= current.spirit ? [action.id, action.id] : [action.id];
      return [];
    },
  });

  for (const value of [...Object.values(state.attrs), ...Object.values(state.res)]) {
    assert.ok(value >= 0 && value <= 100, `state value ${value} must stay in the 0 to 100 domain`);
  }
});

test('v0.2 states receive v0.3 contact and annual-life defaults on import', () => {
  const legacy = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '旧存档', seed: 19 });
  legacy.version = '0.2.0';
  delete legacy.contacts;
  delete legacy.annualNarratives;
  delete legacy.firedOrdinaryEvents;
  delete legacy.contactHistory;

  const restored = Game.importGame(legacy);
  assert.equal(restored.version, '0.3.0');
  assert.equal(Object.keys(restored.contacts).length, 3);
  assert.deepEqual(restored.annualNarratives, []);
  assert.deepEqual(restored.contactHistory, []);
});

test('each route owns at least three authored ordinary-life scenes', () => {
  for (const routeKey of Object.keys(Game.content.routes)) {
    const scenes = Game.content.ordinaryEvents.filter((event) => event.routes?.includes(routeKey));
    assert.ok(scenes.length >= 3, `${routeKey} should have at least three authored scenes`);
  }
});

test('coverage inspection reports family, route, subject and ending evidence', () => {
  const scenarios = [
    playScenario({ familyKey: 'subeipoor', decisions: { 'subei-war': 'stay-and-hide' } }),
    playScenario({ familyKey: 'subeipoor', decisions: { 'subei-war': 'join-army' } }),
    playScenario({ familyKey: 'subeipoor', decisions: { 'subei-war': 'flee-south' } }),
    playScenario({ familyKey: 'jiangnanshen' }),
    playScenario({ familyKey: 'shanghaigongshang' }),
  ];
  const report = Game.inspectCoverage(scenarios);

  assert.equal(report.familyCount, 3);
  assert.ok(report.routeKeys.includes('subei-soldier'));
  assert.equal(report.factEndingCount, scenarios.length);
  assert.equal(report.subjectEvidenceCount, scenarios.length);
  assert.equal(report.annualNarrativeRate, 1);
  assert.equal(report.persistentContactCount, 9);
});
