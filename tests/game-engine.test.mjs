import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.window = globalThis;
await import('../assets/game-content.js');
await import('../assets/life-expansion.js');
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

const ROUTE_SETUPS = {
  'subei-stay': { familyKey: 'subeipoor', gender: '男', decisions: { 'subei-livelihood': 'stay-local', 'subei-war': 'stay-and-hide' } },
  'subei-millworker': { familyKey: 'subeipoor', gender: '女', decisions: { 'subei-livelihood': 'enter-mill', 'subei-war': 'remain-worker' } },
  'subei-soldier': { familyKey: 'subeipoor', gender: '男', decisions: { 'subei-livelihood': 'stay-local', 'subei-war': 'join-army' } },
  'subei-refugee': { familyKey: 'subeipoor', gender: '女', decisions: { 'subei-livelihood': 'stay-local', 'subei-war': 'flee-south' } },
  'shen-scholar': { familyKey: 'jiangnanshen', gender: '男', decisions: { 'shen-path': 'scholar', 'shen-war': 'stay-public-work' } },
  'shen-newwoman': { familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'new-woman', 'shen-war': 'stay-public-work' } },
  'shen-refugee': { familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'new-woman', 'shen-war': 'move-with-family' } },
  'shanghai-heir': { familyKey: 'shanghaigongshang', gender: '男', decisions: { 'shanghai-path': 'business-heir', 'shanghai-war': 'protect-workers' } },
  'shanghai-newwoman': { familyKey: 'shanghaigongshang', gender: '女', decisions: { 'shanghai-path': 'urban-new-woman', 'shanghai-war': 'protect-workers' } },
};

function cloneSetup(setup) {
  return { ...setup, decisions: { ...(setup.decisions || {}) } };
}

function setupForFamily(familyKey) {
  if (familyKey === 'subeipoor') return cloneSetup(ROUTE_SETUPS['subei-stay']);
  if (familyKey === 'jiangnanshen') return cloneSetup(ROUTE_SETUPS['shen-scholar']);
  return cloneSetup(ROUTE_SETUPS['shanghai-heir']);
}

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

  assert.equal(restored.version, '0.4.0');
  assert.deepEqual(restored.identity, state.identity);
  assert.deepEqual(restored.facts, state.facts);
  assert.deepEqual(restored.annualNarratives, state.annualNarratives);
  assert.deepEqual(restored.contacts, state.contacts);
  assert.deepEqual(restored.decisionHistory, state.decisionHistory);
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

test('v0.2 states receive v0.4 contact and annual-life defaults on import', () => {
  const legacy = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '旧存档', seed: 19 });
  legacy.version = '0.2.0';
  delete legacy.contacts;
  delete legacy.annualNarratives;
  delete legacy.firedOrdinaryEvents;
  delete legacy.contactHistory;

  const restored = Game.importGame(legacy);
  assert.equal(restored.version, '0.4.0');
  assert.equal(Object.keys(restored.contacts).length, 3);
  assert.deepEqual(restored.annualNarratives, []);
  assert.deepEqual(restored.contactHistory, []);
});

test('each route owns at least nine authored ordinary-life scenes', () => {
  for (const routeKey of Object.keys(Game.content.routes)) {
    const scenes = Game.content.ordinaryEvents.filter((event) => event.routes?.includes(routeKey));
    assert.ok(scenes.length >= 9, `${routeKey} should have at least nine authored scenes`);
  }
});

test('the complete-life pack reaches the published content-density baseline', () => {
  const content = Game.content;
  assert.equal(content.actions.length, 50);
  assert.equal(content.decisions.length, 33);
  assert.equal(content.decisions.reduce((sum, decision) => sum + decision.options.length, 0), 96);
  assert.equal(content.ordinaryEvents.length, 105);
  assert.equal(content.ordinaryEvents.filter((event) => event.requiresEchoes).length, 63);
  assert.equal(new Set(content.actions.map((action) => action.id)).size, content.actions.length);
  assert.equal(new Set(content.decisions.map((decision) => decision.id)).size, content.decisions.length);
  assert.equal(new Set(content.ordinaryEvents.map((event) => event.id)).size, content.ordinaryEvents.length);

  const expandedDecisionIds = new Set([
    'adolescent-direction',
    'household-reserve',
    'experience-handover',
  ]);
  const expandedDecisions = content.decisions.filter((decision) => decision.id.startsWith('route-') || expandedDecisionIds.has(decision.id));
  for (const decision of expandedDecisions) {
    assert.equal(new Set(decision.options.map((option) => option.id)).size, decision.options.length);
    for (const choice of decision.options) {
      assert.ok(choice.echo, `${decision.id}/${choice.id} needs an echo id`);
      assert.equal(content.ordinaryEvents.filter((event) => event.requiresEchoes?.includes(choice.echo)).length, 1, `${choice.echo} needs one follow-up scene`);
    }
  }

  for (const routeKey of Object.keys(content.routes)) {
    assert.ok(content.actions.filter((action) => action.routes?.includes(routeKey)).length >= 2, `${routeKey} needs two route actions`);
    assert.equal(content.decisions.filter((decision) => decision.id.startsWith('route-') && decision.routes?.includes(routeKey)).length, 2, `${routeKey} needs two route decisions`);
  }
});

test('route choices produce guaranteed next-year echoes and ending facts', () => {
  const state = playScenario({ familyKey: 'shanghaigongshang' });
  const routeFacts = state.facts.filter((fact) => fact.source.startsWith('route-'));
  const echoScenes = state.annualNarratives.filter((entry) => entry.id.startsWith('echo-'));

  assert.equal(routeFacts.length, 2);
  assert.ok(echoScenes.length >= 4);
  assert.ok(state.firedDecisions.length >= 10);
  assert.match(Game.buildEndingNarrative(state), /1929 年/);
  assert.match(Game.buildEndingNarrative(state), /1942 年/);
});

test('all 96 key-decision options are reachable in a compatible life', () => {
  for (const decision of Game.content.decisions) {
    for (const target of decision.options) {
      const routeKey = decision.routes?.[0] || target.routes?.[0];
      const setup = routeKey
        ? cloneSetup(ROUTE_SETUPS[routeKey])
        : setupForFamily(decision.families?.[0] || 'shanghaigongshang');
      if (target.genders?.includes('女')) setup.gender = '女';
      setup.decisions[decision.id] = target.id;

      const state = playScenario({
        ...setup,
        name: `选项-${decision.id}-${target.id}`,
        actionPicker(current, available) {
          const chosen = [];
          if (!current.information.channels.includes('newspaper') && available.some((action) => action.id === 'read-newspaper')) chosen.push('read-newspaper');
          if (available.some((action) => action.id === 'run-business')) chosen.push('run-business');
          if (available.some((action) => action.id === 'rest')) chosen.push('rest');
          return chosen;
        },
      });

      assert.ok(
        state.decisionHistory.some((entry) => entry.decisionId === decision.id && entry.optionId === target.id),
        `${decision.id}/${target.id} should be selected in at least one compatible life`,
      );
    }
  }
});

test('all 50 annual actions can be performed in a compatible life', () => {
  for (const target of Game.content.actions) {
    const routeKey = target.routes?.[0];
    const setup = routeKey
      ? cloneSetup(ROUTE_SETUPS[routeKey])
      : setupForFamily(target.families?.[0] || 'shanghaigongshang');

    const state = playScenario({
      ...setup,
      name: `行动-${target.id}`,
      actionPicker(current, available) {
        if (available.some((action) => action.id === target.id)) return [target.id];
        if (target.id === 'write-and-teach') {
          if (available.some((action) => action.id === 'read-books')) return ['read-books'];
          if (available.some((action) => action.id === 'study-new')) return ['study-new'];
        }
        return [];
      },
    });

    assert.ok(
      state.actionHistory.some((entry) => entry.actionIds.includes(target.id)),
      `${target.id} should be performed in at least one compatible life`,
    );
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
