import assert from 'node:assert/strict';

globalThis.window = globalThis;
await import('./assets/game-content.js');
await import('./assets/demo-engine.js');

const Game = globalThis.MINGUO_GAME;

const baseDecisions = {
  education: 'new-school',
  marriage: 'marry-with-terms',
  'family-future': 'raise-child-together',
  'midlife-responsibility': 'household-first',
  'subei-livelihood': 'stay-local',
  'subei-war': 'stay-and-hide',
  'shen-path': 'scholar',
  'shen-war': 'stay-public-work',
  'shanghai-path': 'business-heir',
  'shanghai-war': 'protect-workers',
  'postwar-settlement': 'rebuild-local',
  'final-1949': 'stay-mainland',
};

function runScenario(definition) {
  const state = Game.createGame({
    familyKey: definition.familyKey,
    gender: definition.gender || '男',
    name: definition.name,
    seed: definition.seed || 20260811,
  });
  const decisions = { ...baseDecisions, ...(definition.decisions || {}) };
  let turns = 0;

  while (!state.over && turns < 80) {
    Game.advanceYear(state, Game.recommendedActions(state));
    while (state.pendingDecision) {
      const requested = decisions[state.pendingDecision.id];
      const option = state.pendingDecision.options.find((item) => item.id === requested && item.enabled)
        || state.pendingDecision.options.find((item) => item.enabled);
      assert.ok(option, `${definition.id}: ${state.pendingDecision.id} has no enabled option`);
      Game.choose(state, option.id);
    }
    turns += 1;
  }

  assert.equal(state.over, true, `${definition.id}: life should end`);
  assert.equal(state.routeKey, definition.expectedRoute, `${definition.id}: final route`);
  assert.ok(state.facts.some((fact) => fact.id === 'final-1949'), `${definition.id}: 1949 fact`);
  assert.doesNotMatch(Game.buildEndingNarrative(state), /成功|失败|安稳|挣扎|爬得很高|万幸/);
  assert.equal(state.identity.name, definition.name, `${definition.id}: identity must stay stable`);
  assert.equal(state.annualNarratives.length, state.endYear - state.identity.born + 1, `${definition.id}: every year needs a life scene`);
  assert.ok(state.contactHistory.length > 0, `${definition.id}: persistent contacts need evidence`);
  return state;
}

const definitions = [
  { id: 'subei-stay', familyKey: 'subeipoor', gender: '男', name: '李禾生', expectedRoute: 'subei-stay' },
  { id: 'subei-soldier', familyKey: 'subeipoor', gender: '男', name: '李长河', expectedRoute: 'subei-soldier', decisions: { 'subei-war': 'join-army' } },
  { id: 'subei-refugee', familyKey: 'subeipoor', gender: '女', name: '李秀禾', expectedRoute: 'subei-refugee', decisions: { 'subei-war': 'flee-south' } },
  { id: 'subei-millworker', familyKey: 'subeipoor', gender: '女', name: '李春棉', expectedRoute: 'subei-millworker', decisions: { 'subei-livelihood': 'enter-mill', 'subei-war': 'remain-worker' } },
  { id: 'shen-scholar', familyKey: 'jiangnanshen', gender: '男', name: '沈砚清', expectedRoute: 'shen-scholar' },
  { id: 'shen-newwoman', familyKey: 'jiangnanshen', gender: '女', name: '沈毓宁', expectedRoute: 'shen-newwoman', decisions: { 'shen-path': 'new-woman' } },
  { id: 'shen-refugee', familyKey: 'jiangnanshen', gender: '女', name: '沈清和', expectedRoute: 'shen-refugee', decisions: { 'shen-path': 'new-woman', 'shen-war': 'move-with-family' } },
  { id: 'shanghai-heir', familyKey: 'shanghaigongshang', gender: '男', name: '顾承安', expectedRoute: 'shanghai-heir' },
  { id: 'shanghai-newwoman', familyKey: 'shanghaigongshang', gender: '女', name: '顾明仪', expectedRoute: 'shanghai-newwoman', decisions: { 'shanghai-path': 'urban-new-woman' } },
];

const states = definitions.map(runScenario);
const report = Game.inspectCoverage(states);
assert.equal(report.familyCount, 3);
assert.equal(report.routeCount, 9);
assert.equal(report.factEndingCount, states.length);
assert.equal(report.subjectEvidenceCount, states.length);
assert.equal(report.informationEvidenceCount, states.length);
assert.equal(report.contactEvidenceCount, states.length);
assert.equal(report.familyLifecycleCount, states.length);
assert.equal(report.annualNarrativeRate, 1);
assert.equal(report.authoredOrdinaryEventCount, 42);
assert.equal(report.persistentContactCount, 9);

const bundle = Game.inspectWholeGameProgressBundle(states);
assert.equal(bundle.wholeGameStageLabel, '正式设计验证版已闭环');

console.log(`[minguo-life] engine ${Game.VERSION}`);
console.log(`[scenarios] ${states.length}/${definitions.length} complete`);
console.log(`[families] ${report.familyCount}/3`);
console.log(`[routes] ${report.routeCount}/9 ${report.routeKeys.join(', ')}`);
console.log(`[fact-endings] ${report.factEndingCount}/${states.length}`);
console.log(`[subject-evidence] ${report.subjectEvidenceCount}/${states.length}`);
console.log(`[information-evidence] ${report.informationEvidenceCount}/${states.length}`);
console.log(`[contact-evidence] ${report.contactEvidenceCount}/${states.length}`);
console.log(`[family-lifecycle] ${report.familyLifecycleCount}/${states.length}`);
console.log(`[annual-narrative] ${report.recordedNarrativeYears}/${report.expectedNarrativeYears}`);
console.log(`[authored-ordinary-events] ${report.authoredOrdinaryEventCount}`);
console.log(`[stage] ${bundle.wholeGameStageLabel}`);
