import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.window = globalThis;
await import('../assets/game-content.js');
await import('../assets/life-expansion.js');
await import('../assets/complete-life.js');
await import('../assets/postwar-era.js');
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
  'later-life-livelihood': 'change-work',
  'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care',
  'late-life-record': 'sort-records',
};

const ROUTE_SETUPS = {
  'subei-stay': { familyKey: 'subeipoor', gender: '男', decisions: { 'subei-livelihood': 'stay-local', 'subei-war': 'stay-and-hide' } },
  'subei-millworker': { familyKey: 'subeipoor', gender: '女', decisions: { 'subei-livelihood': 'enter-mill', 'subei-war': 'remain-worker' } },
  'subei-soldier': { familyKey: 'subeipoor', gender: '男', decisions: { 'subei-livelihood': 'stay-local', 'subei-war': 'join-army' } },
  'subei-refugee': { familyKey: 'subeipoor', gender: '女', decisions: { 'subei-livelihood': 'stay-local', 'subei-war': 'flee-south' } },
  'shen-scholar': { familyKey: 'jiangnanshen', gender: '男', decisions: { 'shen-path': 'scholar', 'shen-war': 'stay-public-work' } },
  'shen-newwoman': { familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'new-woman', 'shen-war': 'stay-public-work' } },
  'shen-refugee': { familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'new-woman', 'shen-war': 'move-with-family' } },
  'shen-professional': { familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'professional-service', 'shen-war': 'stay-public-work' } },
  'shanghai-heir': { familyKey: 'shanghaigongshang', gender: '男', decisions: { 'shanghai-path': 'business-heir', 'shanghai-war': 'protect-workers' } },
  'shanghai-newwoman': { familyKey: 'shanghaigongshang', gender: '女', decisions: { 'shanghai-path': 'urban-new-woman', 'shanghai-war': 'protect-workers' } },
  'shanghai-professional': { familyKey: 'shanghaigongshang', gender: '女', decisions: { 'shanghai-path': 'salaried-professional', 'shanghai-war': 'relocate-own-work' } },
};

const POST1949_OPTIONS = {
  mainland: 'stay-mainland',
  'hong-kong': 'move-hong-kong',
  taiwan: 'move-taiwan',
  overseas: 'move-overseas',
  'in-motion': 'remain-in-motion',
  unsettled: 'leave-unsettled',
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

  while (!state.over && turns < 140) {
    const actionIds = actionPicker(state, Game.availableActions(state));
    Game.advanceYear(state, actionIds);
    while (state.pendingDecision) {
      const decision = state.pendingDecision;
      const requested = decisionMap[decision.id];
      const available = decision.options.filter((option) => option.enabled && !option.hidden);
      const option = available.find((item) => item.id === requested) || available[0];
      assert.ok(option, `decision ${decision.id} must have an available option`);
      Game.choose(state, option.id);
    }
    turns += 1;
  }

  assert.equal(state.over, true, `${familyKey} scenario should reach an ending`);
  assert.ok(turns < 140, `${familyKey} scenario should not stall`);
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

test('all three families continue beyond 1949 and end only after a confirmed death', () => {
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
    assert.ok(state.endYear > 1949);
    assert.equal(state.life.status, 'dead');
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-occurred'));
    assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'));
    assert.ok(state.life.deathPlace);
    assert.ok(state.life.cause);
    assert.ok(state.endingFacts.length >= 4);
  }
});

test('1949 is a milestone rather than an ending', () => {
  const state = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '李禾生', seed: 9 });
  const decisions = { ...DEFAULT_DECISIONS };
  while (state.year <= 1949 && !state.over) {
    Game.advanceYear(state, Game.recommendedActions(state));
    while (state.pendingDecision) {
      const requested = decisions[state.pendingDecision.id];
      const option = state.pendingDecision.options.find((item) => item.enabled && !item.hidden && item.id === requested)
        || state.pendingDecision.options.find((item) => item.enabled && !item.hidden);
      Game.choose(state, option.id);
    }
  }
  assert.equal(state.over, false);
  assert.equal(state.year, 1950);
  assert.equal(state.post1949Choice, 'mainland');
  assert.ok(state.facts.some((fact) => fact.id === 'final-1949' && fact.kind === 'milestone'));
});

test('six post-1949 destinations are distinct and all continue to death', () => {
  for (const [path, optionId] of Object.entries(POST1949_OPTIONS)) {
    const state = playScenario({
      familyKey: 'shanghaigongshang',
      seed: 41,
      decisions: { 'final-1949': optionId },
      actionPicker(current, available) {
        const selected = [];
        let budget = current.spirit;
        const newspaper = available.find((action) => action.id === 'read-newspaper');
        const business = available.find((action) => action.id === 'run-business');
        if (newspaper && newspaper.spirit <= budget) { selected.push(newspaper.id); budget -= newspaper.spirit; }
        if (business && business.spirit <= budget) selected.push(business.id);
        return selected;
      },
    });
    assert.equal(state.post1949Choice, path);
    assert.ok(state.post1949.arrival);
    assert.ok(state.post1949.livelihood);
    assert.ok(state.endYear > 1949);
    assert.equal(state.life.status, 'dead');
  }
});

test('the same seed and decisions reproduce the same life ledger', () => {
  const first = playScenario({ familyKey: 'jiangnanshen', seed: 42 });
  const second = playScenario({ familyKey: 'jiangnanshen', seed: 42 });
  assert.deepEqual(first.facts, second.facts);
  assert.deepEqual(first.routeHistory, second.routeHistory);
  assert.equal(Game.buildEndingNarrative(first), Game.buildEndingNarrative(second));
});

test('action previews explain direction without exposing exact stat deltas', () => {
  const state = Game.createGame({ familyKey: 'subeipoor', gender: '女', name: '李秀禾', seed: 17 });
  const play = Game.availableActions(state, { includeDisabled: true }).find((action) => action.id === 'play');
  const care = Game.availableActions(state, { includeDisabled: true }).find((action) => action.id === 'care-mother');
  const preview = Game.describeActionEffects(state, play);
  const carePreview = Game.describeActionEffects(state, care);

  assert.deepEqual(preview.gains, ['体魄', '心智']);
  assert.equal(preview.spiritKind, 'recover');
  assert.equal(preview.spiritAmount, 2);
  assert.ok(carePreview.affectedPeople.includes('母亲'));
  const talk = Game.availableActions(state, { includeDisabled: true }).find((action) => action.id === 'talk-neighbors');
  const talkPreview = Game.describeActionEffects(state, talk);
  assert.deepEqual(talkPreview.affectedPeople, ['周淑兰']);
});

test('locked actions use readable Chinese requirements', () => {
  const state = Game.createGame({ familyKey: 'jiangnanshen', gender: '男', name: '沈砚清', seed: 18 });
  const action = Game.availableActions(state, { includeDisabled: true }).find((item) => item.id === 'record-life-ledger');

  assert.equal(action.enabled, false);
  assert.doesNotMatch(action.disabledReason, /knowledge|money|body|mind/);
});

test('every played year receives one ordinary-life narrative', () => {
  const state = playScenario({ familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'new-woman' } });
  const years = state.annualNarratives.map((entry) => entry.year);

  assert.equal(years.length, state.endYear - state.identity.born + 1);
  assert.equal(new Set(years).size, years.length);
  assert.ok(state.annualNarratives.some((entry) => entry.kind === 'scene'));
  assert.ok(state.annualNarratives.some((entry) => entry.kind === 'rhythm'));
  assert.ok(state.annualNarratives.every((entry) => entry.text.length >= 80), 'every rendered annual scene should be a concrete small story');
});

test('choices are written as executable personal actions and locks explain the current gap', () => {
  const allLabels = Game.content.decisions.flatMap((decision) => decision.options.map((option) => option.label));
  for (const vague of ['进入队伍', '带能同行的人向南逃', '留在大陆', '迁往香港或台湾']) {
    assert.ok(!allLabels.includes(vague), `vague label should have been replaced: ${vague}`);
  }

  const state = Game.createGame({ familyKey: 'shanghaigongshang', gender: '男', name: '锁条件', seed: 21 });
  while (state.year < 1949 && !state.over) {
    Game.advanceYear(state, []);
    while (state.pendingDecision) {
      const option = state.pendingDecision.options.find((item) => item.enabled && !item.hidden);
      Game.choose(state, option.id);
    }
  }
  Game.advanceYear(state, []);
  const overseas = state.pendingDecision.options.find((option) => option.id === 'move-overseas');
  assert.equal(overseas.enabled, false);
  assert.match(overseas.disabledReason, /至少达到|需要先取得/);
  assert.match(overseas.disabledReason, /当前为|信息渠道/);
});

test('a death ending exposes seven coherent life chapters', () => {
  const state = playScenario({ familyKey: 'jiangnanshen', gender: '女', decisions: { 'shen-path': 'professional-service' } });
  const chapters = Game.buildLifeChapters(state);
  assert.deepEqual(chapters.map((chapter) => chapter.key), ['birth-family', 'livelihood', 'war', 'postwar', 'post1949', 'late-life', 'death']);
  assert.match(chapters.at(-1).text, /去世.*享年.*确认/);
  assert.match(Game.buildEndingNarrative(state), /出生与成长.*成年谋生.*战争转折.*1949 与后半生.*死亡与确认/);
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

test('portable v0.5 saves round-trip without changing the life ledger', () => {
  const state = playScenario({ familyKey: 'subeipoor', decisions: { 'subei-war': 'join-army' } });
  const restored = Game.importGame(Game.exportGame(state));

  assert.equal(restored.version, '0.5.2');
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

test('v0.2 states receive v0.5 complete-life defaults on import', () => {
  const legacy = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '旧存档', seed: 19 });
  legacy.version = '0.2.0';
  delete legacy.contacts;
  delete legacy.annualNarratives;
  delete legacy.firedOrdinaryEvents;
  delete legacy.contactHistory;

  const restored = Game.importGame(legacy);
  assert.equal(restored.version, '0.5.2');
  assert.equal(Object.keys(restored.contacts).length, 3);
  assert.deepEqual(restored.annualNarratives, []);
  assert.deepEqual(restored.contactHistory, []);
});

test('v0.4 endings at 1949 resume as an unfinished life in 1950', () => {
  const legacy = Game.createGame({ familyKey: 'shanghaigongshang', gender: '女', name: '旧版人物', seed: 49 });
  legacy.version = '0.4.0';
  legacy.year = 1949;
  legacy.age = legacy.year - legacy.identity.born;
  legacy.over = true;
  legacy.endYear = 1949;
  legacy.finalChoice = 'hktw';
  legacy.facts.push({ id: 'life-ended', year: 1949, text: '旧版终局。', ending: true });
  legacy.endingFacts = ['旧版在 1949 年结束'];
  legacy.endingNarrative = '旧版终局。';
  delete legacy.post1949Choice;
  delete legacy.post1949;
  delete legacy.life;

  const restored = Game.importGame(legacy);
  assert.equal(restored.version, '0.5.2');
  assert.equal(restored.over, false);
  assert.equal(restored.year, 1950);
  assert.equal(restored.chapter, 'post1949');
  assert.equal(restored.post1949Choice, 'hong-kong');
  assert.equal(restored.post1949.region, '迁往香港');
  assert.equal(restored.endYear, null);
  assert.equal(restored.endingNarrative, '');
  assert.ok(!restored.facts.some((fact) => fact.id === 'life-ended'));
  assert.ok(restored.milestones.some((milestone) => milestone.id === 'v04-save-continued'));
});

test('v0.5 saves replace leaked postwar route rhythms with the settled region', () => {
  const legacy = postwarState({ channel: true });
  legacy.version = '0.5.0';
  legacy.lastOrdinaryEvent = {
    year: 1950,
    id: 'rhythm:subei-soldier:1950',
    title: '年度日常',
    text: '点名以后，你在驻地等待下一次调动。',
    kind: 'rhythm',
    effects: { gains: [], risks: [], affectedPeople: [], channels: [] },
  };
  legacy.annualNarratives.push({ ...legacy.lastOrdinaryEvent });

  const restored = Game.importGame(legacy);
  assert.match(restored.lastOrdinaryEvent.id, /^rhythm:post-hong-kong:/);
  assert.match(restored.lastOrdinaryEvent.text, /香港|街坊|房租|床位|电车|渡轮/);
  assert.doesNotMatch(restored.lastOrdinaryEvent.text, /点名|驻地|军粮|下一次调动/);
  assert.equal(restored.annualNarratives.at(-1).id, restored.lastOrdinaryEvent.id);
});

test('recommended actions stay appropriate to the protagonist age and route', () => {
  const state = Game.createGame({ familyKey: 'shanghaigongshang', gender: '女', name: '成年人物', seed: 30 });
  while (state.year < 1930) {
    Game.advanceYear(state, []);
    while (state.pendingDecision) {
      const decision = state.pendingDecision;
      const requested = { ...DEFAULT_DECISIONS, 'shanghai-path': 'business-heir' }[decision.id];
      const available = decision.options.filter((option) => option.enabled && !option.hidden);
      Game.choose(state, available.find((option) => option.id === requested)?.id || available[0].id);
    }
  }

  const recommendations = Game.recommendedActions(state);
  assert.ok(recommendations.some((id) => ['run-business', 'learn-business', 'help-workers'].includes(id)));
  assert.ok(!recommendations.includes('learn-characters'));
});

function postwarState({ channel = false } = {}) {
  const state = Game.createGame({ familyKey: 'subeipoor', gender: '男', name: '后半生验收', seed: 1950 });
  state.year = 1950;
  state.age = state.year - state.identity.born;
  state.routeKey = 'subei-soldier';
  state.livelihoodKey = 'subei-stay';
  state.warTurnKey = 'subei-soldier';
  state.post1949Choice = 'hong-kong';
  state.post1949.choice = 'hong-kong';
  state.post1949.region = '迁往香港';
  state.post1949.place = '香港一处拥挤的街坊';
  state.chapter = 'post1949';
  if (channel) state.information.channels.push('newspaper');
  return state;
}

test('post-1949 daily stories use the new region instead of the former wartime route', () => {
  const state = postwarState();
  Game.advanceYear(state, []);

  assert.match(state.lastOrdinaryEvent.id, /^rhythm:post-hong-kong:/);
  assert.match(state.lastOrdinaryEvent.text, /香港|街坊|房租|床位|电车|渡轮/);
  assert.doesNotMatch(state.lastOrdinaryEvent.text, /点名|驻地|队伍|军粮|下一次调动/);
});

test('1950 keeps personal daily life and regional era updates as separate records', () => {
  const state = postwarState({ channel: true });
  Game.advanceYear(state, []);

  assert.equal(state.lastOrdinaryEvent.year, 1950);
  assert.ok(state.currentEraUpdates.length >= 2);
  assert.ok(state.currentEraUpdates.some((entry) => entry.id === 'korean-war-1950'));
  const hongKong = state.currentEraUpdates.find((entry) => entry.id === 'hongkong-population-1950');
  assert.equal(hongKong.scope, '香港');
  assert.equal(hongKong.known, true);
  assert.match(hongKong.text, /人口|住屋|床位|房租/);
  assert.ok(hongKong.source.url.startsWith('https://'));
  assert.ok(state.eraHistory.every((entry) => entry.year === 1950));
});

test('a Hong Kong introduction produces a concrete trial job and a next step in 1950', () => {
  const state = postwarState({ channel: true });
  Game.advanceYear(state, []);
  assert.equal(state.pendingDecision.id, 'post49-arrival');

  Game.choose(state, 'hongkong-use-contact');

  const employment = state.post1949.employment;
  assert.equal(employment.status, 'trial');
  assert.ok(employment.role);
  assert.ok(employment.workplace);
  assert.match(employment.lastResult, /面谈|试做/);
  assert.match(employment.lastResult, new RegExp(employment.role));
  assert.match(employment.nextStep, /试工|留用/);
  assert.ok(state.facts.some((fact) => fact.kind === 'livelihood' && fact.year === 1950));
});

test('the next livelihood action finishes a trial instead of searching forever', () => {
  const state = postwarState({ channel: true });
  Game.advanceYear(state, []);
  Game.choose(state, 'hongkong-use-contact');

  const presented = Game.availableActions(state).find((action) => action.id === 'hongkong-find-work');
  assert.match(presented.name, /完成.+试工.+留用/);
  Game.advanceYear(state, ['hongkong-find-work']);

  assert.equal(state.post1949.employment.status, 'employed');
  assert.match(state.post1949.employment.lastResult, /确认留用/);
  assert.doesNotMatch(state.post1949.employment.lastResult, /先试做|先试工/);
  assert.ok(state.lastActionFeedback.outcomes.some((outcome) => /确认留用/.test(outcome)));
  const continued = Game.availableActions(state).find((action) => action.id === 'hongkong-find-work');
  assert.match(continued.name, /继续在.+担任/);
  assert.doesNotMatch(continued.name, /寻找|应聘/);
});

test('all six post-1949 destinations turn livelihood actions into explicit work states', () => {
  const actions = {
    mainland: 'mainland-rebuild-work',
    'hong-kong': 'hongkong-find-work',
    taiwan: 'taiwan-settle-work',
    overseas: 'overseas-adapt-trade',
    'in-motion': 'motion-short-work',
    unsettled: 'unsettled-test-shelter',
  };
  for (const [path, actionId] of Object.entries(actions)) {
    const state = postwarState();
    state.post1949Choice = path;
    state.post1949.choice = path;
    state.firedDecisions.push('post49-arrival');
    Game.advanceYear(state, [actionId]);
    const employment = state.post1949.employment;
    assert.notEqual(employment.status, 'not-started', `${path} needs an employment state`);
    assert.notEqual(employment.status, 'seeking', `${path} action needs a same-year result`);
    assert.ok(employment.role, `${path} needs a concrete role`);
    assert.ok(employment.workplace, `${path} needs a concrete workplace`);
    assert.ok(employment.lastResult, `${path} needs an explicit outcome`);
    assert.ok(employment.nextStep, `${path} needs a next step`);
  }
});

test('old post-1949 saves expose the missing job record and recover on the next action', () => {
  const legacy = postwarState();
  legacy.version = '0.5.1';
  delete legacy.post1949.employment;
  const restored = Game.importGame(legacy);

  assert.equal(restored.post1949.employment.status, 'seeking');
  assert.match(restored.post1949.employment.lastResult, /旧存档.*没有记录具体岗位/);
  assert.match(restored.post1949.employment.nextStep, /当年取得明确答复/);

  restored.firedDecisions.push('post49-arrival');
  Game.advanceYear(restored, ['hongkong-find-work']);
  assert.ok(['casual', 'trial', 'employed'].includes(restored.post1949.employment.status));
  assert.ok(restored.post1949.employment.role);
});

test('a current save waiting at the 1950 arrival choice is not mislabeled as legacy data', () => {
  const state = postwarState();
  Game.advanceYear(state, []);
  assert.equal(state.pendingDecision.id, 'post49-arrival');

  const restored = Game.importGame(Game.exportGame(state));
  assert.equal(restored.post1949.employment.status, 'not-started');
  assert.equal(restored.post1949.employment.lastResult, null);
  assert.equal(restored.pendingDecision.id, 'post49-arrival');
});

test('an unsuccessful application states the reason, income status and next action', () => {
  const state = postwarState();
  state.firedDecisions.push('post49-arrival');
  Object.keys(state.attrs).forEach((key) => { state.attrs[key] = 0; });
  state.res.position = 0;

  Game.advanceYear(state, ['hongkong-find-work']);

  assert.equal(state.post1949.employment.status, 'seeking');
  assert.equal(state.post1949.employment.role, null);
  assert.match(state.post1949.employment.lastResult, /没有录用/);
  assert.match(state.post1949.employment.lastResult, /没有固定工资职位/);
  assert.match(state.post1949.employment.nextStep, /先接.+重新应聘/);
});

test('the age-50 livelihood choice updates the saved occupation instead of only changing prose', () => {
  const state = postwarState();
  state.firedDecisions.push('post49-arrival');
  state.year = state.identity.born + 50;
  state.age = 50;
  Object.assign(state.post1949.employment, {
    status: 'employed', track: 'manual', role: '货仓理货工', workplace: '临海货仓',
    duties: '按货单分拣与搬运', terms: '按月结算', startedYear: 1950,
  });

  Game.advanceYear(state, []);
  assert.equal(state.pendingDecision.id, 'later-life-livelihood');
  Game.choose(state, 'change-work');

  assert.equal(state.post1949.employment.status, 'employed');
  assert.equal(state.post1949.employment.role, '货物清点与工段看守');
  assert.match(state.post1949.employment.lastResult, /离开原来的“货仓理货工”.+改做货物清点与工段看守/);
});

test('era updates respect information channels instead of exposing omniscient history', () => {
  const state = postwarState();
  Game.advanceYear(state, []);

  assert.ok(state.currentEraUpdates.length >= 2);
  assert.ok(state.currentEraUpdates.every((entry) => entry.known === false));
  assert.ok(state.currentEraUpdates.every((entry) => entry.title === '影响先于完整消息抵达'));
  assert.ok(state.currentEraUpdates.every((entry) => entry.source === null));
  assert.ok(state.currentEraUpdates.some((entry) => /街坊|租金|通铺|短工/.test(entry.text)));
});

test('the postwar era layer covers all six destinations with sourced history', () => {
  const events = Game.content.events.filter((event) => event.eraBrief && event.year >= 1950);
  for (const path of Object.keys(POST1949_OPTIONS)) {
    assert.ok(events.some((event) => event.post1949Choices?.includes(path)), `${path} needs a post-1949 era event`);
  }
  assert.ok(events.length >= 18);
  assert.ok(events.every((event) => event.historySource?.url?.startsWith('https://')));
  assert.ok(Game.content.events.filter((event) => event.eraBrief).every((event) => event.historySource?.url?.startsWith('https://')));
});

test('each route owns at least nine authored ordinary-life scenes', () => {
  for (const routeKey of Object.keys(Game.content.routes)) {
    const scenes = Game.content.ordinaryEvents.filter((event) => event.routes?.includes(routeKey));
    assert.ok(scenes.length >= 9, `${routeKey} should have at least nine authored scenes`);
  }
});

test('the birth-to-death pack reaches the published content-density baseline', () => {
  const content = Game.content;
  assert.equal(content.actions.length, 66);
  assert.equal(content.decisions.length, 42);
  assert.equal(content.decisions.reduce((sum, decision) => sum + decision.options.length, 0), 143);
  assert.equal(content.ordinaryEvents.length, 171);
  assert.equal(content.ordinaryEvents.filter((event) => event.requiresEchoes).length, 105);
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

test('all 143 key-decision options are reachable in a compatible life', () => {
  for (const decision of Game.content.decisions) {
    for (const target of decision.options) {
      const routeKey = decision.routes?.[0] || target.routes?.[0];
      const setup = routeKey
        ? cloneSetup(ROUTE_SETUPS[routeKey])
        : setupForFamily(decision.families?.[0] || 'shanghaigongshang');
      if (target.genders?.includes('女')) setup.gender = '女';
      setup.decisions[decision.id] = target.id;
      const postPath = target.post1949Choices?.[0] || decision.post1949Choices?.[0];
      if (postPath) setup.decisions['final-1949'] = POST1949_OPTIONS[postPath];

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

test('all 66 annual actions can be performed in a compatible life', () => {
  for (const target of Game.content.actions) {
    const routeKey = target.routes?.[0];
    const setup = routeKey
      ? cloneSetup(ROUTE_SETUPS[routeKey])
      : setupForFamily(target.families?.[0] || 'shanghaigongshang');
    if (target.post1949Choices?.[0]) setup.decisions['final-1949'] = POST1949_OPTIONS[target.post1949Choices[0]];

    const state = playScenario({
      ...setup,
      name: `行动-${target.id}`,
      actionPicker(current, available) {
        if (available.some((action) => action.id === target.id)) return [target.id];
        if (target.post1949Choices?.includes('overseas') && !current.information.channels.includes('newspaper') && available.some((action) => action.id === 'read-newspaper')) return ['read-newspaper'];
        if (target.post1949Choices?.includes('overseas') && available.some((action) => action.id === 'run-business')) return ['run-business'];
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
  assert.equal(report.post1949EmploymentEvidenceCount, scenarios.length);
  assert.equal(report.annualNarrativeRate, 1);
  assert.equal(report.persistentContactCount, 9);
});
