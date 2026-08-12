import assert from 'node:assert/strict';

globalThis.window = globalThis;
await import('./assets/game-content.js');
await import('./assets/life-expansion.js');
await import('./assets/complete-life.js');
await import('./assets/postwar-era.js');
await import('./assets/lived-life.js');
await import('./assets/public-life.js');
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
  'later-life-livelihood': 'change-work',
  'later-life-relationships': 'build-local-network',
  'late-life-care': 'community-care',
  'late-life-record': 'sort-records',
  'public-life-contact': 'join-open-public-work',
  'political-organization-application': 'apply-ccp',
  'political-organization-answer': 'accept-membership',
  'wartime-public-role': 'wartime-open-service',
  'public-family-boundary': 'tell-family-risk-range',
  'public-past-after-1949': 'state-confirmed-public-past',
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

  while (!state.over && turns < 140) {
    const availableActions = Game.availableActions(state);
    const preferred = [];
    if (!state.information.channels.includes('newspaper') && availableActions.some((action) => action.id === 'read-newspaper')) preferred.push('read-newspaper');
    if (['hong-kong', 'taiwan', 'overseas'].includes(definition.expectedPost1949)) {
      const earningAction = ['run-business', 'workroom', 'write-and-teach', 'clinic-service', 'salaried-technical-work'].find((id) => availableActions.some((action) => action.id === id));
      if (earningAction) preferred.push(earningAction);
    }
    preferred.push(...Game.recommendedActions(state));
    const actions = [];
    let remainingSpirit = state.spirit;
    const slots = Game.stageOf(state.age).slots;
    for (const id of preferred) {
      if (actions.length >= slots || actions.includes(id)) continue;
      const action = availableActions.find((item) => item.id === id);
      if (action && action.spirit <= remainingSpirit) { actions.push(id); remainingSpirit -= action.spirit; }
    }
    Game.advanceYear(state, actions);
    while (state.pendingDecision) {
      const requested = decisions[state.pendingDecision.id];
      const option = state.pendingDecision.options.find((item) => item.id === requested && item.enabled && !item.hidden)
        || state.pendingDecision.options.find((item) => item.enabled && !item.hidden);
      assert.ok(option, `${definition.id}: ${state.pendingDecision.id} has no enabled option`);
      Game.choose(state, option.id);
    }
    turns += 1;
  }

  assert.equal(state.over, true, `${definition.id}: life should end`);
  assert.equal(state.routeKey, definition.expectedRoute, `${definition.id}: final route`);
  assert.ok(state.facts.some((fact) => fact.id === 'final-1949'), `${definition.id}: 1949 fact`);
  assert.ok(state.endYear > 1949, `${definition.id}: life continues after 1949`);
  assert.equal(state.life.status, 'dead', `${definition.id}: death is the only ending`);
  assert.ok(state.facts.some((fact) => fact.id === 'protagonist-death-confirmed'), `${definition.id}: protagonist death must be confirmed`);
  assert.equal(state.post1949Choice, definition.expectedPost1949, `${definition.id}: post-1949 path`);
  assert.ok(state.post1949.arrival, `${definition.id}: arrival needs a record`);
  assert.ok(state.post1949.livelihood, `${definition.id}: post-1949 livelihood needs a record`);
  assert.doesNotMatch(Game.buildEndingNarrative(state), /成功|失败|安稳|挣扎|爬得很高|万幸/);
  assert.equal(state.identity.name, definition.name, `${definition.id}: identity must stay stable`);
  assert.equal(state.annualNarratives.length, state.endYear - state.identity.born + 1, `${definition.id}: every year needs a life scene`);
  assert.ok(state.annualNarratives.every((entry) => entry.text.length >= 80), `${definition.id}: annual scenes must be concrete stories`);
  assert.ok(state.contactHistory.length > 0, `${definition.id}: persistent contacts need evidence`);
  assert.ok(state.eraHistory.some((entry) => entry.year >= 1950), `${definition.id}: post-1949 era history needs evidence`);
  assert.ok(state.lived.career.role && state.lived.career.workplace && state.lived.career.employer, `${definition.id}: concrete career`);
  assert.ok(state.lived.career.history.length > 0, `${definition.id}: work scenes`);
  assert.ok(Object.values(state.lived.parents).every((parent) => parent.name && parent.occupation && parent.deathYear), `${definition.id}: parent lives`);
  assert.ok(state.lived.relationship.history.length > 0, `${definition.id}: relationship consequences`);
  assert.ok(state.lived.health.history.filter((entry) => entry.condition).length >= 4, `${definition.id}: illness history`);
  assert.ok(Object.keys(state.contacts).length >= 6, `${definition.id}: social world`);
  assert.equal(state.lived.yearHistory.length, state.annualNarratives.length, `${definition.id}: concrete year records`);
  assert.equal(state.lived.inner.history.length, state.annualNarratives.length, `${definition.id}: inner life`);
  return state;
}

const definitions = [
  { id: 'subei-stay', familyKey: 'subeipoor', gender: '男', name: '李禾生', expectedRoute: 'subei-stay', expectedPost1949: 'mainland' },
  { id: 'subei-soldier', familyKey: 'subeipoor', gender: '男', name: '李长河', expectedRoute: 'subei-soldier', expectedPost1949: 'in-motion', decisions: { 'subei-war': 'join-army', 'final-1949': 'remain-in-motion' } },
  { id: 'subei-refugee', familyKey: 'subeipoor', gender: '女', name: '李秀禾', expectedRoute: 'subei-refugee', expectedPost1949: 'unsettled', decisions: { 'subei-war': 'flee-south', 'final-1949': 'leave-unsettled' } },
  { id: 'subei-millworker', familyKey: 'subeipoor', gender: '女', name: '李春棉', expectedRoute: 'subei-millworker', expectedPost1949: 'mainland', decisions: { 'subei-livelihood': 'enter-mill', 'subei-war': 'remain-worker' } },
  { id: 'shen-scholar', familyKey: 'jiangnanshen', gender: '男', name: '沈砚清', expectedRoute: 'shen-scholar', expectedPost1949: 'taiwan', decisions: { 'final-1949': 'move-taiwan' } },
  { id: 'shen-newwoman', familyKey: 'jiangnanshen', gender: '女', name: '沈毓宁', expectedRoute: 'shen-newwoman', expectedPost1949: 'mainland', decisions: { 'shen-path': 'new-woman' } },
  { id: 'shen-refugee', familyKey: 'jiangnanshen', gender: '女', name: '沈清和', expectedRoute: 'shen-refugee', expectedPost1949: 'in-motion', decisions: { 'shen-path': 'new-woman', 'shen-war': 'move-with-family', 'final-1949': 'remain-in-motion' } },
  { id: 'shen-professional', familyKey: 'jiangnanshen', gender: '男', name: '沈济安', expectedRoute: 'shen-professional', expectedPost1949: 'hong-kong', decisions: { 'shen-path': 'professional-service', 'final-1949': 'move-hong-kong' } },
  { id: 'shanghai-heir', familyKey: 'shanghaigongshang', gender: '男', name: '顾承安', expectedRoute: 'shanghai-heir', expectedPost1949: 'taiwan', decisions: { 'final-1949': 'move-taiwan' } },
  { id: 'shanghai-newwoman', familyKey: 'shanghaigongshang', gender: '女', name: '顾明仪', expectedRoute: 'shanghai-newwoman', expectedPost1949: 'overseas', decisions: { 'shanghai-path': 'urban-new-woman', 'final-1949': 'move-overseas' } },
  { id: 'shanghai-professional', familyKey: 'shanghaigongshang', gender: '女', name: '顾衡仪', expectedRoute: 'shanghai-professional', expectedPost1949: 'unsettled', decisions: { 'shanghai-path': 'salaried-professional', 'shanghai-war': 'relocate-own-work', 'final-1949': 'leave-unsettled' } },
];

const states = definitions.map(runScenario);
const report = Game.inspectCoverage(states);
assert.equal(report.familyCount, 3);
assert.equal(report.routeCount, 11);
assert.equal(report.post1949PathCount, 6);
assert.equal(report.factEndingCount, states.length);
assert.equal(report.deathEndingCount, states.length);
assert.equal(report.post1949ContinuationCount, states.length);
assert.equal(report.post1949EraEvidenceCount, states.length);
assert.equal(report.post1949EmploymentEvidenceCount, states.length);
assert.equal(report.subjectEvidenceCount, states.length);
assert.equal(report.informationEvidenceCount, states.length);
assert.equal(report.contactEvidenceCount, states.length);
assert.equal(report.familyLifecycleCount, states.length);
assert.equal(report.annualNarrativeRate, 1);
assert.equal(report.authoredActionCount, 76);
assert.equal(report.keyDecisionCount, 53);
assert.equal(report.decisionOptionCount, 178);
assert.equal(report.authoredOrdinaryEventCount, 192);
assert.equal(report.choiceEchoEventCount, 126);
assert.equal(report.denseLifeCount, states.length);
assert.equal(report.persistentContactCount, 42);
assert.equal(report.concreteCareerCount, states.length);
assert.equal(report.parentLifecycleDetailCount, states.length);
assert.equal(report.relationshipDetailCount, states.length);
assert.equal(report.healthHistoryCount, states.length);
assert.equal(report.socialWorldCount, states.length);
assert.equal(report.innerLifeCount, states.length);
assert.equal(report.concreteYearCount, report.expectedNarrativeYears);
assert.equal(report.publicLifeEvidenceCount, states.length);
assert.equal(report.politicalMembershipCount, states.length);
assert.equal(report.publicActionCount, 6);
assert.equal(report.publicDecisionCount, 7);
assert.equal(report.publicOrdinarySceneCount, 21);
assert.equal(report.publicEraEventCount, 11);
assert.equal(report.publicContactProfileCount, 11);

const bundle = Game.inspectWholeGameProgressBundle(states);
assert.equal(bundle.wholeGameStageLabel, '出生到死亡的具体生活与政治参与文字版已闭环');
assert.equal(bundle.hardGates.publicLife, true);

console.log(`[minguo-life] engine ${Game.VERSION}`);
console.log(`[scenarios] ${states.length}/${definitions.length} complete`);
console.log(`[families] ${report.familyCount}/3`);
console.log(`[routes] ${report.routeCount}/11 ${report.routeKeys.join(', ')}`);
console.log(`[post-1949] ${report.post1949PathCount}/6 ${report.post1949PathKeys.join(', ')}`);
console.log(`[post-1949-era] ${report.post1949EraEvidenceCount}/${states.length} lives, ${report.authoredEraEventCount} authored era events`);
console.log(`[post-1949-employment] ${report.post1949EmploymentEvidenceCount}/${states.length} lives with role, result and next step`);
console.log(`[concrete-career] ${report.concreteCareerCount}/${states.length} lives with workplace, employer and work scenes`);
console.log(`[parent-lives] ${report.parentLifecycleDetailCount}/${states.length} lives with named working parents and deaths`);
console.log(`[relationships] ${report.relationshipDetailCount}/${states.length} lives with consequences`);
console.log(`[illness-history] ${report.healthHistoryCount}/${states.length} lives with recurring conditions`);
console.log(`[social-world] ${report.socialWorldCount}/${states.length} lives with six or more named people`);
console.log(`[inner-life] ${report.innerLifeCount}/${states.length} lives with yearly thoughts`);
console.log(`[public-life] ${report.publicLifeEvidenceCount}/${states.length} lives, ${report.publicDecisionCount} decisions, ${report.publicOrdinarySceneCount} consequence scenes`);
console.log(`[fact-endings] ${report.factEndingCount}/${states.length}`);
console.log(`[death-endings] ${report.deathEndingCount}/${states.length}`);
console.log(`[subject-evidence] ${report.subjectEvidenceCount}/${states.length}`);
console.log(`[information-evidence] ${report.informationEvidenceCount}/${states.length}`);
console.log(`[contact-evidence] ${report.contactEvidenceCount}/${states.length}`);
console.log(`[family-lifecycle] ${report.familyLifecycleCount}/${states.length}`);
console.log(`[annual-narrative] ${report.recordedNarrativeYears}/${report.expectedNarrativeYears}`);
console.log(`[authored-actions] ${report.authoredActionCount}`);
console.log(`[key-decisions/options] ${report.keyDecisionCount}/${report.decisionOptionCount}`);
console.log(`[authored-ordinary-events] ${report.authoredOrdinaryEventCount}`);
console.log(`[choice-echo-events] ${report.choiceEchoEventCount}`);
console.log(`[dense-lives] ${report.denseLifeCount}/${states.length}`);
console.log(`[stage] ${bundle.wholeGameStageLabel}`);
