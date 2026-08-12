// 民国人生 · 可测试文字版引擎 v0.5
// 运行时只负责规则与状态，不直接操作 DOM；浏览器 UI 与 Node 回归共用这一份实现。
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before demo-engine.js');

  var attrKeys = C.attributes.map(function (item) { return item.key; });
  var resourceKeys = C.resources.map(function (item) { return item.key; });

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function has(list, value) {
    return Array.isArray(list) && list.indexOf(value) >= 0;
  }

  function addUnique(list, value) {
    if (value != null && list.indexOf(value) < 0) list.push(value);
  }

  function subjectStatusLabel(status) {
    return (C.subjectStatusLabels && C.subjectStatusLabels[status]) || status;
  }

  function stageOf(age) {
    var stage = C.stages[0];
    C.stages.forEach(function (candidate) {
      if (age >= candidate.minAge) stage = candidate;
    });
    return stage;
  }

  function chapterOf(state) {
    if (state.life && state.life.status === 'dead') return 'death';
    if (state.age < 18) return 'childhood';
    if (state.year < 1937) return 'livelihood';
    if (state.year <= 1945) return 'war';
    if (state.year <= 1949) return 'postwar';
    if (state.age < 60) return 'post1949';
    return 'late-life';
  }

  function stableIndex(textValue, size) {
    var hash = 0;
    String(textValue || '').split('').forEach(function (character) {
      hash = ((hash * 31) + character.charCodeAt(0)) >>> 0;
    });
    return size ? hash % size : 0;
  }

  function random(state) {
    // Numerical Recipes LCG：同一种子、同一决策序列得到同一结果。
    state.randomState = (Math.imul(1664525, state.randomState) + 1013904223) >>> 0;
    return state.randomState / 4294967296;
  }

  function flatState(state) {
    var result = {};
    Object.keys(state.attrs).forEach(function (key) { result[key] = state.attrs[key]; });
    Object.keys(state.res).forEach(function (key) { result[key] = state.res[key]; });
    result.age = state.age;
    result.year = state.year;
    return result;
  }

  function gateResult(state, gate) {
    if (!gate) return { ok: true, reason: '' };
    var flat = flatState(state);
    var failed = Object.keys(gate).find(function (key) {
      return Number(flat[key] || 0) < Number(gate[key]);
    });
    if (!failed) return { ok: true, reason: '' };
    var meta = C.attributes.concat(C.resources).find(function (item) { return item.key === failed; });
    var label = meta ? meta.name : failed;
    var current = Math.round(Number(flat[failed] || 0));
    var guidance = {
      money: '可以通过持续谋生、减少开支或保留实物储备改善。',
      knowledge: '可以通过读书、夜校、抄录或长期专业学习继续提高。',
      body: '可以通过适度劳动、锻炼和休养改善，但身体也会随年龄变化。',
      craft: '可以通过跟工、练习、修理或专业工作继续积累。',
      mind: '可以通过休息、记录、学习和减少长期透支改善。',
      network: '可以通过与具体人物往来、通信、工作和地方互助逐步建立。',
      fame: '可以通过持续工作、公开服务和可靠记录形成，但它不是人生排名。',
      health: '可以通过休息、求医和减少透支改善，部分长期损伤不会立刻恢复。',
      relation: '可以通过照料、通信和兑现承诺改善，不能替代具体人物自己的决定。',
      position: '可以通过住处、证件、稳定工作和可靠门路逐步改善。',
    };
    return {
      ok: false,
      reason: '需要' + label + '至少达到 ' + gate[failed] + '；当前为 ' + current + '。' + (guidance[failed] || '本局仍可通过后续行动继续改善。'),
    };
  }

  function describeEffects(state, item) {
    var statLabels = {};
    C.attributes.concat(C.resources).forEach(function (item) { statLabels[item.key] = item.name; });
    var gains = [];
    var risks = [];
    Object.keys(item.delta || {}).forEach(function (key) {
      var amount = Number(item.delta[key] || 0);
      if (amount > 0) gains.push(statLabels[key] || key);
      if (amount < 0) risks.push(statLabels[key] || key);
    });

    var affectedPeople = [];
    var subjectEffects = item.subjectDelta || item.subjectEffects || {};
    Object.keys(subjectEffects).forEach(function (key) {
      var subject = state && state.subjects && state.subjects[key];
      affectedPeople.push(subject ? subject.label : key);
    });
    Object.keys(item.contactEffects || {}).forEach(function (key) {
      var contact = state && state.contacts && state.contacts[key];
      if (contact) affectedPeople.push(contact.label);
    });

    return {
      gains: gains,
      risks: risks,
      affectedPeople: affectedPeople.filter(function (label, index, list) { return list.indexOf(label) === index; }),
      channels: (item.channels || []).map(function (key) { return C.channelLabels[key] || key; }),
    };
  }

  function describeActionEffects(state, action) {
    var result = describeEffects(state, action);
    result.spiritKind = action.spirit < 0 ? 'recover' : 'cost';
    result.spiritAmount = Math.abs(Number(action.spirit || 0));
    return result;
  }

  function applyDelta(state, delta, scale) {
    if (!delta) return [];
    scale = scale == null ? 1 : scale;
    var changed = [];
    Object.keys(delta).forEach(function (key) {
      var amount = Math.round(delta[key] * scale * 10) / 10;
      if (has(attrKeys, key)) {
        state.attrs[key] = clamp(Math.round(((state.attrs[key] || 0) + amount) * 10) / 10, 0, 100);
      } else if (has(resourceKeys, key)) {
        state.res[key] = clamp(Math.round(((state.res[key] || 0) + amount) * 10) / 10, 0, 100);
      }
      changed.push({ key: key, amount: amount });
    });
    return changed;
  }

  function applySubjectEffects(state, effects) {
    if (!effects) return;
    Object.keys(effects).forEach(function (subjectKey) {
      var subject = state.subjects[subjectKey];
      if (!subject) return;
      var patch = effects[subjectKey];
      Object.keys(patch).forEach(function (key) {
        if (typeof patch[key] === 'number') {
          subject[key] = Math.round(((Number(subject[key]) || 0) + patch[key]) * 10) / 10;
        } else {
          subject[key] = patch[key];
        }
      });
    });
  }

  function applyContactEffects(state, effects) {
    if (!effects) return;
    Object.keys(effects).forEach(function (contactKey) {
      var contact = state.contacts[contactKey];
      if (!contact) return;
      var patch = effects[contactKey];
      Object.keys(patch).forEach(function (key) {
        if (typeof patch[key] === 'number') {
          contact[key] = clamp(Math.round(((Number(contact[key]) || 0) + patch[key]) * 10) / 10, 0, 100);
        } else {
          contact[key] = patch[key];
        }
      });
      state.contactHistory.push({ year: state.year, contactKey: contactKey, effect: clone(patch) });
    });
  }

  function addChannels(state, channels) {
    (channels || []).forEach(function (channel) {
      addUnique(state.information.channels, channel);
    });
  }

  function addFact(state, fact) {
    if (!fact || !fact.id || state.facts.some(function (item) { return item.id === fact.id; })) return;
    state.facts.push({
      id: fact.id,
      year: fact.year == null ? state.year : fact.year,
      kind: fact.kind || 'life',
      text: fact.text || '',
      source: fact.source || 'runtime',
      ending: Boolean(fact.ending),
    });
  }

  function addLog(state, text, tone, kind) {
    state.log.push({ year: state.year, text: text, tone: tone || '', kind: kind || '' });
  }

  function setRoute(state, routeKey, source) {
    if (!routeKey || state.routeKey === routeKey) return;
    if (!C.routes[routeKey]) throw new Error('Unknown route: ' + routeKey);
    var from = state.routeKey;
    state.routeKey = routeKey;
    state.routeHistory.push({ year: state.year, from: from, to: routeKey, source: source || 'decision' });
    addLog(state, '人生路径转入「' + C.routes[routeKey].name + '」。', 'turn', 'route');
  }

  function subjectIsDead(subject) {
    return subject && (subject.status === 'dead-unconfirmed' || subject.status === 'dead-confirmed');
  }

  function ensureEmployment(state) {
    if (!state.post1949) state.post1949 = {};
    var defaults = {
      status: 'not-started',
      track: null,
      role: null,
      workplace: null,
      duties: null,
      terms: null,
      startedYear: null,
      attempts: 0,
      yearsWorked: 0,
      lastResult: null,
      lastResultYear: null,
      nextStep: null,
      history: [],
    };
    state.post1949.employment = Object.assign(defaults, state.post1949.employment || {});
    if (!Array.isArray(state.post1949.employment.history)) state.post1949.employment.history = [];
    return state.post1949.employment;
  }

  function livelihoodTrack(state) {
    var routeGroups = C.livelihoodTrackRoutes || {};
    var matched = Object.keys(routeGroups).find(function (track) {
      return has(routeGroups[track], state.routeKey);
    });
    if (matched) return matched;
    var knowledge = Number(state.attrs.knowledge || 0);
    var craft = Number(state.attrs.craft || 0);
    var body = Number(state.attrs.body || 0);
    if (knowledge >= craft + 8) return 'literate';
    if (craft >= body - 4) return 'skilled';
    return 'manual';
  }

  function employmentProfile(state) {
    var pathProfiles = C.post1949Jobs && C.post1949Jobs[state.post1949Choice];
    if (!pathProfiles) return null;
    var track = livelihoodTrack(state);
    return { track: track, profile: pathProfiles[track] || pathProfiles.manual };
  }

  function employmentScore(state, track) {
    var base;
    if (track === 'care') base = Number(state.attrs.craft || 0) * 0.55 + Number(state.attrs.knowledge || 0) * 0.45;
    else if (track === 'literate') base = Number(state.attrs.knowledge || 0) * 0.65 + Number(state.attrs.mind || 0) * 0.35;
    else if (track === 'skilled') base = Number(state.attrs.craft || 0) * 0.7 + Number(state.attrs.knowledge || 0) * 0.3;
    else base = Number(state.attrs.body || 0) * 0.55 + Number(state.attrs.craft || 0) * 0.45;
    return Math.round(base * 0.7 + Number(state.attrs.network || 0) * 0.15 + Number(state.res.position || 0) * 0.15);
  }

  function employmentStatusLabel(status) {
    return (C.employmentStatusLabels && C.employmentStatusLabels[status]) || status;
  }

  function employmentActionForState(state, action) {
    if (!action.livelihoodAction || !state.post1949Choice) return action;
    var current = ensureEmployment(state);
    var selected = employmentProfile(state);
    if (!selected) return action;
    var profile = selected.profile;
    if (current.status === 'employed' || current.status === 'reduced-hours') {
      action.name = '继续在' + profile.workplace + '担任' + (current.role || profile.role);
      action.note = '完成本年职责并核对工钱；这是延续当前职业，不是重新找一遍工作。';
    } else if (current.status === 'trial') {
      action.name = '完成「' + (current.role || profile.role) + '」试工并确认是否留用';
      action.note = '按已经谈清的职责完成试工，当年得到“留用”或“不留用”的明确答复。';
    } else if (current.status === 'casual') {
      action.name = '继续做「' + (current.role || profile.casualRole) + '」并谈固定工期';
      action.note = '先结清本段短工，再询问固定位置；没有留用也会写明工期结束和下一步。';
    } else {
      action.name = '应聘「' + profile.role + '」并在当年得到答复';
      action.note = '完成面谈或试工，当年说明找到什么工作、为何未留用，以及下一步能做什么。';
    }
    return action;
  }

  function recordEmploymentOutcome(state, sourceId, result) {
    var current = ensureEmployment(state);
    current.lastResult = result;
    current.lastResultYear = state.year;
    current.history.push({
      year: state.year,
      source: sourceId,
      status: current.status,
      role: current.role,
      workplace: current.workplace,
      result: result,
      nextStep: current.nextStep,
    });
    state.post1949.livelihood = employmentStatusLabel(current.status) + '：' + (current.role || '尚未接下具体工作') + (current.workplace ? '（' + current.workplace + '）' : '') + '。' + result;
    addFact(state, {
      id: 'employment:' + state.year + ':' + current.history.length,
      kind: 'livelihood',
      text: result,
      source: sourceId,
    });
    addLog(state, '【谋生结果】' + result + ' 下一步：' + current.nextStep, current.status === 'employed' ? 'good' : 'turn', 'livelihood');
    return result;
  }

  function resolveEmployment(state, sourceId, entryMode) {
    if (!state.post1949Choice) return null;
    var selected = employmentProfile(state);
    if (!selected) return null;
    var current = ensureEmployment(state);
    var profile = selected.profile;
    var score = employmentScore(state, selected.track);
    var result;
    current.track = selected.track;
    current.workplace = current.workplace || profile.workplace;
    current.duties = current.duties || profile.duties;
    current.terms = current.terms || profile.terms;

    if (entryMode === 'seeking') {
      current.status = 'seeking';
      current.role = null;
      current.nextStep = '下一次安排谋生行动时，应聘「' + profile.role + '」并当年取得答复。';
      result = '你这一年先处理住处、证件或同行者安排，没有把“准备找工作”写成已经就业；目前尚无工资职位。';
      return recordEmploymentOutcome(state, sourceId, result);
    }

    if (current.status === 'employed' || current.status === 'reduced-hours') {
      current.yearsWorked += 1;
      current.nextStep = '明年可以继续这份工作，也可以在中年抉择中换工或减少工时。';
      result = '你在' + current.workplace + '继续担任' + current.role + '，本年完成了' + current.duties + '；' + current.terms + '。';
      return recordEmploymentOutcome(state, sourceId, result);
    }

    current.attempts += 1;
    if (current.status === 'trial') {
      current.status = 'employed';
      current.role = profile.role;
      current.terms = '试工已经完成，现按月结算工钱';
      current.startedYear = current.startedYear || state.year;
      current.yearsWorked += 1;
      current.nextStep = '明年继续履行职责并核对工钱；若生活条件改变，再明确选择转工或减少工时。';
      result = '你完成了' + current.workplace + '的试工。对方当面确认留用你担任' + current.role + '，职责是' + current.duties + '；' + current.terms + '。';
      return recordEmploymentOutcome(state, sourceId, result);
    }

    if (entryMode === 'action' && score < 30) {
      var gap = selected.track === 'care' ? '能证明的医护经历不足以承担当班范围'
        : selected.track === 'literate' ? '试写的账式与对方现用格式仍对不上'
          : selected.track === 'skilled' ? '当场试做还不能独立完成要求的检修'
            : '当场能承担的工段和现有介绍都不足以排进固定班次';
      current.status = 'seeking';
      current.role = null;
      current.nextStep = '先接「' + profile.casualRole + '」积累一段可核实的工钱和工段记录，再重新应聘「' + profile.role + '」。';
      result = '你到' + current.workplace + '应聘' + profile.role + '，对方当面说明本次没有录用：' + gap + '。这一年没有固定工资职位，求职结果已经确认。';
      return recordEmploymentOutcome(state, sourceId, result);
    }

    if (current.status === 'casual') {
      if (state.post1949Choice === 'in-motion') {
        current.role = profile.casualRole;
        current.nextStep = '本段工期结束后，先结清工钱，再决定留在当地还是循下一条已核实消息移动。';
        result = '你在' + current.workplace + '又接到一段' + current.role + '，完成了' + current.duties + '。工钱已经结清，但工期随这批活结束，没有被写成长期职位。';
      } else {
        current.status = 'trial';
        current.role = profile.role;
        current.nextStep = '完成一个月试工，并在期满当天确认是否正式留用。';
        result = '你结清上一段短工后，' + current.workplace + '给了你一个月' + current.role + '试工。职责是' + current.duties + '；是否留用尚未发生，但答复日期和结算办法已经谈清。';
      }
      return recordEmploymentOutcome(state, sourceId, result);
    }

    if (entryMode === 'interview' || entryMode === 'trial') {
      current.status = 'trial';
      current.role = profile.role;
      current.startedYear = current.startedYear || state.year;
      current.nextStep = '按约完成一个月试工，并在期满当天确认是否正式留用。';
      result = '你在' + current.workplace + '完成面谈和当场试做，对方明确给你一个月' + current.role + '试工。职责是' + current.duties + '；' + current.terms + '。';
      return recordEmploymentOutcome(state, sourceId, result);
    }

    if (entryMode === 'casual' || score < 42) {
      current.status = 'casual';
      current.role = profile.casualRole;
      current.startedYear = current.startedYear || state.year;
      current.nextStep = state.post1949Choice === 'in-motion'
        ? '工期结束先结清工钱，再按下一处已核实的工作消息决定去留。'
        : '先结清这段短工，再凭已经完成的工段争取一个有期限的试工位置。';
      result = '你在' + current.workplace + '找到一段' + current.role + '，工作是' + current.duties + '；' + profile.terms + '。这是一份已经领到工钱的短工，不是长期录用。';
      return recordEmploymentOutcome(state, sourceId, result);
    }

    if (score < 65) {
      current.status = 'trial';
      current.role = profile.role;
      current.startedYear = current.startedYear || state.year;
      current.nextStep = '按约完成一个月试工，并在期满当天确认是否正式留用。';
      result = '你在' + current.workplace + '完成面谈和当场试做，对方明确给你一个月' + current.role + '试工。职责是' + current.duties + '；' + current.terms + '。';
      return recordEmploymentOutcome(state, sourceId, result);
    }

    current.status = 'employed';
    current.role = profile.role;
    current.terms = '当场试做已经完成，现按月结算工钱';
    current.startedYear = current.startedYear || state.year;
    current.yearsWorked += 1;
    current.nextStep = '明年继续履行职责并核对工钱；生活条件改变时再明确决定是否转工。';
    result = '你通过面谈和试做，被' + current.workplace + '留用为' + current.role + '。职责是' + current.duties + '；' + current.terms + '。';
    return recordEmploymentOutcome(state, sourceId, result);
  }

  function resolveLaterLifeEmployment(state, optionId) {
    if (!state.post1949Choice) return null;
    var current = ensureEmployment(state);
    if (!current.role) return resolveEmployment(state, 'later-life-livelihood:' + optionId, 'trial');
    var formerRole = current.role;
    var result;
    if (optionId === 'change-work') {
      var lighterRoles = {
        manual: '货物清点与工段看守',
        skilled: '检修记录与带徒工',
        literate: '兼职文书与带教员',
        care: '诊所登记与复诊联络员',
      };
      current.status = 'employed';
      current.role = lighterRoles[current.track] || '较轻的受薪工作';
      current.duties = current.track === 'care' ? '整理复诊名册、交代用药记录并联络病家'
        : current.track === 'literate' ? '整理文书、核对旧账并带新人熟悉格式'
          : current.track === 'skilled' ? '记录故障、验收修理并把旧经验教给年轻工人'
            : '清点到货、登记工段并承担较少的重体力搬运';
      current.terms = '按较轻职责重新核定工钱和工时';
      current.nextStep = '按新的职责继续工作，并观察收入与身体是否能够长期接住。';
      result = '五十岁时，你离开原来的“' + formerRole + '”职责，在' + current.workplace + '改做' + current.role + '。新职责是' + current.duties + '；' + current.terms + '。';
    } else if (optionId === 'reduce-for-household') {
      current.status = 'reduced-hours';
      current.terms = '减少固定班次，按实际工时结算';
      current.nextStep = '继续核对减少后的收入、身体恢复和同住者各自承担的照料。';
      result = '五十岁时，你与' + current.workplace + '谈定减少' + formerRole + '的固定班次，仍承担' + current.duties + '；' + current.terms + '。';
    } else {
      current.status = 'employed';
      current.nextStep = '继续当前工作，但每年按身体状态重新判断还能承担哪些职责。';
      result = '五十岁时，你核对身体与当地条件后，继续在' + current.workplace + '担任' + formerRole + '，没有把旧职业假定为永远不变。';
    }
    return recordEmploymentOutcome(state, 'later-life-livelihood:' + optionId, result);
  }

  function checkSubjectDeaths(state) {
    Object.keys(state.subjects).forEach(function (key) {
      var subject = state.subjects[key];
      if (subject.health == null || subject.health > 0 || subjectIsDead(subject)) return;
      subject.health = 0;
      subject.status = 'dead-unconfirmed';
      addFact(state, {
        id: key + '-death-occurred',
        kind: 'subject',
        text: subject.label + '已经去世，但当时只有不完整的消息，尚未完成确认。',
        source: 'subject-state',
      });
      addLog(state, subject.label + '的死亡已经发生，但消息与时间仍未完全确认。', 'bad', 'subject');
    });
  }

  function createGame(options) {
    options = options || {};
    var family = C.families[options.familyKey];
    if (!family) throw new Error('Unknown family: ' + options.familyKey);
    var gender = options.gender === '女' ? '女' : '男';
    var name = String(options.name || family.defaultNames[gender] || family.name + '的孩子').trim();
    var seed = Number.isFinite(Number(options.seed)) ? Number(options.seed) : 1;
    var state = {
      version: C.version,
      identity: {
        id: options.familyKey + '-' + seed,
        name: name,
        gender: gender,
        familyKey: options.familyKey,
        familyName: family.name,
        born: family.born,
        place: family.place,
      },
      familyKey: options.familyKey,
      routeKey: null,
      routeHistory: [],
      year: family.born,
      age: 0,
      attrs: clone(family.start),
      res: clone(family.startRes),
      subjects: clone(family.subjects),
      contacts: clone(family.contacts || {}),
      spirit: C.spiritMax,
      spiritMax: C.spiritMax,
      information: { channels: [], lastLearnedYear: null },
      knownEvents: [],
      unknownImpacts: [],
      echoes: [],
      facts: [],
      log: [],
      curve: [],
      actionHistory: [],
      annualNarratives: [],
      firedOrdinaryEvents: [],
      lastOrdinaryEvent: null,
      eraHistory: [],
      currentEraUpdates: [],
      contactHistory: [],
      firedEvents: [],
      firedDecisions: [],
      decisionHistory: [],
      pendingDecision: null,
      pendingDecisionQueue: [],
      randomState: seed >>> 0,
      seed: seed,
      livelihoodKey: null,
      warTurnKey: null,
      postwarSettlementKey: null,
      post1949Choice: null,
      post1949: {
        choice: null,
        region: null,
        arrival: null,
        place: null,
        livelihood: null,
        livelihoodLater: null,
        companions: null,
        leftBehind: null,
        correspondence: null,
        care: null,
        legacy: null,
        employment: {
          status: 'not-started', track: null, role: null, workplace: null, duties: null, terms: null,
          startedYear: null, attempts: 0, yearsWorked: 0, lastResult: null, lastResultYear: null,
          nextStep: null, history: [],
        },
      },
      life: {
        status: 'alive',
        dangerSince: null,
        naturalDeathAge: clamp(76 + ((seed >>> 0) % 18), 76, C.maximumAge || 105),
        deathOccurredYear: null,
        deathConfirmedYear: null,
        deathPlace: null,
        cause: null,
      },
      chapter: 'childhood',
      lastActionFeedback: null,
      milestones: [],
      finalChoice: null,
      endYear: null,
      over: false,
      endingFacts: [],
      endingNarrative: '',
    };
    addFact(state, {
      id: 'birth',
      year: family.born,
      kind: 'identity',
      text: name + '出生于' + family.name + '，地点为' + family.place + '。',
      source: 'opening',
    });
    addLog(state, '出生于' + family.name + '。往后的人生路径尚未决定。', 'good', 'birth');
    return state;
  }

  function actionAvailability(state, action) {
    if (action.families && !has(action.families, state.familyKey)) return { ok: false, hidden: true, reason: '只适用于其他出生家庭' };
    if (action.routes && !has(action.routes, state.routeKey)) {
      var actionRoutes = action.routes.map(function (key) { return C.routes[key] ? C.routes[key].name : key; });
      return { ok: false, hidden: true, reason: '需要先走入「' + actionRoutes.join('／') + '」人生路径；当前是「' + (C.routes[state.routeKey] ? C.routes[state.routeKey].name : '尚未定路') + '」。' };
    }
    if (action.post1949Choices && !has(action.post1949Choices, state.post1949Choice)) return { ok: false, hidden: true, reason: '只适用于另一种 1949 年后去向' };
    if (action.minYear != null && state.year < action.minYear) return { ok: false, hidden: true, reason: '需到 ' + action.minYear + ' 年后才出现；当前为 ' + state.year + ' 年。' };
    if (action.maxYear != null && state.year > action.maxYear) return { ok: false, hidden: true, reason: '只在 ' + action.maxYear + ' 年以前适用。' };
    if (action.minAge != null && state.age < action.minAge) return { ok: false, reason: '需要年满 ' + action.minAge + ' 岁；当前 ' + state.age + ' 岁。' };
    if (action.maxAge != null && state.age > action.maxAge) return { ok: false, reason: '只适用于 ' + action.maxAge + ' 岁以前；当前 ' + state.age + ' 岁。' };
    if (action.id === 'care-mother' && subjectIsDead(state.subjects.mother)) return { ok: false, reason: '母亲已经去世' };
    return gateResult(state, action.gate);
  }

  function availableActions(state, options) {
    options = options || {};
    return C.actions.map(function (action) {
      var availability = actionAvailability(state, action);
      var result = employmentActionForState(state, clone(action));
      result.enabled = availability.ok;
      result.disabledReason = availability.reason;
      result.hidden = Boolean(availability.hidden);
      return result;
    }).filter(function (action) {
      if (action.hidden && !options.includeHidden) return false;
      return options.includeDisabled ? true : action.enabled;
    });
  }

  function processActions(state, actionIds) {
    var stage = stageOf(state.age);
    var chosen = (actionIds || []).slice(0, stage.slots);
    var counts = {};
    var spent = 0;
    var performed = [];
    var effects = { gains: [], risks: [], affectedPeople: [], channels: [] };
    var outcomes = [];

    chosen.forEach(function (actionId) {
      var action = C.actions.find(function (item) { return item.id === actionId; });
      if (!action) throw new Error('Unknown action: ' + actionId);
      var availability = actionAvailability(state, action);
      if (!availability.ok) throw new Error('Action ' + actionId + ' is unavailable: ' + availability.reason);
      var nextSpent = spent + action.spirit;
      if (nextSpent > state.spirit) throw new Error('Action plan exceeds available spirit');
      spent = nextSpent;
      var times = counts[actionId] || 0;
      var scale = 1 / (1 + times * 0.35);
      var presentedAction = employmentActionForState(state, clone(action));
      applyDelta(state, action.delta, scale);
      applySubjectEffects(state, action.subjectDelta);
      applyContactEffects(state, action.contactEffects);
      addChannels(state, action.channels);
      var preview = describeEffects(state, action);
      preview.gains.forEach(function (label) { addUnique(effects.gains, label); });
      preview.risks.forEach(function (label) { addUnique(effects.risks, label); });
      preview.affectedPeople.forEach(function (label) { addUnique(effects.affectedPeople, label); });
      preview.channels.forEach(function (label) { addUnique(effects.channels, label); });
      counts[actionId] = times + 1;
      performed.push(presentedAction.name);
      if (action.livelihoodAction && times === 0) {
        var outcome = resolveEmployment(state, action.id, 'action');
        if (outcome) outcomes.push(outcome);
      }
    });

    state.spirit = clamp(state.spirit - spent, 0, state.spiritMax);
    if (state.spirit <= 2) {
      applyDelta(state, { health: -2 });
      addLog(state, '这一年精神长期见底，健康受到额外消耗。', 'bad', 'action');
    }
    if (performed.length) addLog(state, '这一年安排：' + performed.join('、') + '。', '', 'action');
    else addLog(state, '这一年没有额外安排，把主要精力留给日常生活。', '', 'action');
    state.actionHistory.push({ year: state.year, actionIds: chosen });
    state.lastActionFeedback = {
      year: state.year,
      actions: performed,
      gains: effects.gains,
      risks: effects.risks,
      affectedPeople: effects.affectedPeople,
      channels: effects.channels,
      spirit: spent,
      outcomes: outcomes,
    };
    checkSubjectDeaths(state);
  }

  function matchesScope(state, item) {
    if (item.year != null && state.year !== item.year) return false;
    if (item.minYear != null && state.year < item.minYear) return false;
    if (item.maxYear != null && state.year > item.maxYear) return false;
    if (item.yearByAge != null && state.age !== item.yearByAge) return false;
    if (item.minAge != null && state.age < item.minAge) return false;
    if (item.maxAge != null && state.age > item.maxAge) return false;
    if (item.families && !has(item.families, state.familyKey)) return false;
    if (item.routes && !has(item.routes, state.routeKey)) return false;
    if (item.post1949Choices && !has(item.post1949Choices, state.post1949Choice)) return false;
    if (item.employmentStatuses && !has(item.employmentStatuses, ensureEmployment(state).status)) return false;
    if (item.genders && !has(item.genders, state.identity.gender)) return false;
    if (item.requiresEchoes && !item.requiresEchoes.every(function (echo) {
      return has(state.echoes, echo);
    })) return false;
    if (item.requiresAnyEchoes && !item.requiresAnyEchoes.some(function (echo) {
      return has(state.echoes, echo);
    })) return false;
    if (item.excludesEchoes && item.excludesEchoes.some(function (echo) {
      return has(state.echoes, echo);
    })) return false;
    if (item.requiresSubjectStatus) {
      var exactKeys = Object.keys(item.requiresSubjectStatus);
      if (exactKeys.some(function (key) {
        return !state.subjects[key] || state.subjects[key].status !== item.requiresSubjectStatus[key];
      })) return false;
    }
    if (item.requiresSubjectNotStatus) {
      var notKeys = Object.keys(item.requiresSubjectNotStatus);
      if (notKeys.some(function (key) {
        return state.subjects[key] && state.subjects[key].status === item.requiresSubjectNotStatus[key];
      })) return false;
    }
    return true;
  }

  function storyFrameKey(state) {
    if (state.year >= 1950 && state.post1949Choice) return 'post-' + state.post1949Choice;
    if (state.routeKey && C.sceneFrames && C.sceneFrames[state.routeKey]) return state.routeKey;
    return state.familyKey;
  }

  function resolveSceneText(state, event) {
    var textValue = String(event.text || '');
    if (textValue.length >= 80 || !C.sceneFrames) return textValue;
    var frames = C.sceneFrames[storyFrameKey(state)] || C.sceneFrames[state.routeKey] || C.sceneFrames[state.familyKey] || [];
    if (!frames.length) return textValue;
    var frame = frames[stableIndex(event.id + ':' + state.seed, frames.length)];
    return frame.open + textValue + frame.close;
  }

  function processOrdinaryLife(state) {
    var candidates = (C.ordinaryEvents || []).filter(function (event) {
      return !has(state.firedOrdinaryEvents, event.id) && matchesScope(state, event);
    });
    var record;

    if (candidates.length) {
      var highestPriority = candidates.reduce(function (highest, candidate) {
        return Math.max(highest, Number(candidate.priority || 0));
      }, -Infinity);
      candidates = candidates.filter(function (candidate) {
        return Number(candidate.priority || 0) === highestPriority;
      });
      var event = candidates[Math.floor(random(state) * candidates.length)];
      addUnique(state.firedOrdinaryEvents, event.id);
      applyDelta(state, event.delta);
      applySubjectEffects(state, event.subjectEffects);
      applyContactEffects(state, event.contactEffects);
      addChannels(state, event.channels);
      record = {
        year: state.year,
        id: event.id,
        title: event.title,
        text: resolveSceneText(state, event),
        kind: 'scene',
        effects: describeEffects(state, event),
      };
      if (event.fact) {
        addFact(state, {
          id: 'ordinary:' + event.id,
          kind: 'life',
          text: event.fact,
          source: event.id,
        });
      }
    } else {
      var postRhythmKey = state.post1949Choice && C.post1949Paths && C.post1949Paths[state.post1949Choice]
        ? C.post1949Paths[state.post1949Choice].rhythmKey
        : null;
      var rhythmKey = state.year >= 1950 && postRhythmKey && C.annualRhythms[postRhythmKey]
        ? postRhythmKey
        : (state.routeKey && C.annualRhythms[state.routeKey] ? state.routeKey : state.familyKey);
      var rhythms = C.annualRhythms[rhythmKey] || ['这一年的日常由家计、关系与时代变化共同构成。'];
      var text = rhythms[Math.floor(random(state) * rhythms.length)];
      record = {
        year: state.year,
        id: 'rhythm:' + rhythmKey + ':' + state.year,
        title: '年度日常',
        text: resolveSceneText(state, { id: 'rhythm:' + rhythmKey + ':' + state.year, text: text }),
        kind: 'rhythm',
        effects: { gains: [], risks: [], affectedPeople: [], channels: [] },
      };
    }

    state.lastOrdinaryEvent = record;
    state.annualNarratives.push(record);
    addLog(state, '【' + record.title + '】' + record.text, '', 'daily');
    checkSubjectDeaths(state);
  }

  function processEventInformation(state, event) {
    var known = true;
    var displayText = event.knownText || event.fact || '';
    if (!event.knownThrough || !event.knownThrough.length) {
      if (event.title) addLog(state, '【' + event.title + '】' + (event.knownText || event.fact || ''), 'event', 'event');
    } else {
      known = event.knownThrough.some(function (channel) {
        return has(state.information.channels, channel);
      });
      if (known) {
        addUnique(state.knownEvents, event.id);
        addLog(state, '【时代快讯·' + event.title + '】' + event.knownText, 'event', 'info');
      } else {
        displayText = event.unknownText || event.fact || '';
        addUnique(state.unknownImpacts, event.id);
        addLog(state, '【时代冲击】' + displayText, 'bad', 'info');
      }
    }
    if (event.eraBrief) {
      var update = {
        id: event.id,
        year: state.year,
        scope: event.eraScope || '时代环境',
        title: known ? event.title : '影响先于完整消息抵达',
        eventTitle: event.title,
        text: displayText,
        known: known,
        source: known && event.historySource ? clone(event.historySource) : null,
      };
      state.currentEraUpdates.push(update);
      state.eraHistory.push(update);
    }
  }

  function processSubjectAutonomy(state, subjectKey, event) {
    var subject = state.subjects[subjectKey];
    if (!subject) return;
    var support = state.subjects.support || { strength: 0 };
    var household = state.subjects.household || { strength: 0 };
    var independentBase = Number(subject.agency || 50) + Number(support.strength || 0) * 0.25;
    var roll = random(state) * 100;
    if (roll < independentBase) {
      subject.status = household.strength >= 40 ? 'running-household' : 'working-independently';
      subject.note = '按自己的条件接住生计与家口';
    } else {
      subject.status = 'returned-to-own-kin';
      subject.note = '回到自己的亲族网络另作安排';
    }
    addFact(state, {
      id: event.factId || subjectKey + '-autonomy-' + event.year,
      kind: 'subject',
      text: event.fact,
      source: event.id,
    });
    addLog(state, subject.label + '独立决定了战时去留：' + subject.note + '。', 'turn', 'subject');
  }

  function processEvents(state) {
    C.events.forEach(function (event) {
      if (has(state.firedEvents, event.id) || !matchesScope(state, event)) return;
      addUnique(state.firedEvents, event.id);
      applyDelta(state, event.delta);
      applySubjectEffects(state, event.subjectEffects);
      processEventInformation(state, event);
      if (event.subjectAutonomy) processSubjectAutonomy(state, event.subjectAutonomy, event);
      if (event.confirmDeath) {
        var subject = state.subjects[event.confirmDeath];
        if (subject && subject.status === 'dead-unconfirmed') {
          subject.status = 'dead-confirmed';
          addFact(state, {
            id: event.confirmDeath + '-death-confirmed',
            kind: 'subject',
            text: event.fact,
            source: event.id,
          });
        }
      } else if (event.fact && !event.subjectAutonomy) {
        addFact(state, {
          id: event.factId || event.id,
          kind: event.factKind || 'era',
          text: event.fact,
          source: event.id,
        });
      }
      checkSubjectDeaths(state);
    });
  }

  function optionAvailability(state, option) {
    if (option.families && !has(option.families, state.familyKey)) return { ok: false, hidden: true, reason: '只适用于其他出生家庭。' };
    if (option.post1949Choices && !has(option.post1949Choices, state.post1949Choice)) return { ok: false, hidden: true, reason: '这不是你在 1949 年选择的去向。' };
    if (option.routes && !has(option.routes, state.routeKey)) {
      var names = option.routes.map(function (key) { return C.routes[key] ? C.routes[key].name : key; });
      var routeMoment = (state.routeHistory || []).slice().reverse().find(function (entry) { return has(option.routes, entry.to); });
      return {
        ok: false,
        hidden: false,
        reason: routeMoment
          ? '你曾在 ' + routeMoment.year + ' 年走过「' + names.join('／') + '」，后来已经转入「' + (C.routes[state.routeKey] ? C.routes[state.routeKey].name : state.routeKey) + '」。'
          : '需要先走入「' + names.join('／') + '」；当前人生路径是「' + (C.routes[state.routeKey] ? C.routes[state.routeKey].name : '尚未定路') + '」。',
      };
    }
    if (option.genders && !has(option.genders, state.identity.gender)) return { ok: false, hidden: true, reason: '这个选项只在另一种人物设定中出现。' };
    if (option.minAge != null && state.age < option.minAge) return { ok: false, reason: '需要年满 ' + option.minAge + ' 岁；当前 ' + state.age + ' 岁。' };
    if (option.maxAge != null && state.age > option.maxAge) return { ok: false, reason: '只在 ' + option.maxAge + ' 岁以前适用；当前 ' + state.age + ' 岁。' };
    if (option.requiresSubjectStatus) {
      var exactKeys = Object.keys(option.requiresSubjectStatus);
      var failedExact = exactKeys.find(function (key) {
        return !state.subjects[key] || state.subjects[key].status !== option.requiresSubjectStatus[key];
      });
      if (failedExact) {
        var exactSubject = state.subjects[failedExact];
        return {
          ok: false,
          reason: '需要' + (exactSubject ? exactSubject.label : failedExact) + '处于「' + subjectStatusLabel(option.requiresSubjectStatus[failedExact]) + '」；当前为「' + (exactSubject ? subjectStatusLabel(exactSubject.status) : '人物未出现') + '」。',
        };
      }
    }
    if (option.requiresSubjectNotStatus) {
      var notKeys = Object.keys(option.requiresSubjectNotStatus);
      var failedNot = notKeys.find(function (key) {
        return state.subjects[key] && state.subjects[key].status === option.requiresSubjectNotStatus[key];
      });
      if (failedNot) return { ok: false, reason: (state.subjects[failedNot].label || failedNot) + '当前为「' + subjectStatusLabel(state.subjects[failedNot].status) + '」，不满足这一选择的现实条件。' };
    }
    var gate = gateResult(state, option.gate);
    if (!gate.ok) return gate;
    if (option.requiredChannels && !option.requiredChannels.some(function (channel) {
      return has(state.information.channels, channel);
    })) {
      return {
        ok: false,
        reason: '需要先取得「' + option.requiredChannels.map(function (channel) { return C.channelLabels[channel] || channel; }).join('／') + '」信息渠道；可通过读报、读书、通信或与具体人物核实消息获得。',
      };
    }
    return { ok: true, reason: '' };
  }

  function resolveDecisionPrompt(state, decision) {
    var prompt = String(decision.prompt || '');
    if (prompt.length >= 75) return prompt;
    return prompt + ' 你只能决定自己接下来亲手做什么；家人、同事和同行者仍会按各自身体、住处与生计条件回应。';
  }

  function presentDecision(state, decision) {
    return {
      id: decision.id,
      title: decision.title,
      prompt: resolveDecisionPrompt(state, decision),
      year: state.year,
      options: decision.options.map(function (option) {
        var availability = optionAvailability(state, option);
        var result = clone(option);
        result.enabled = availability.ok;
        result.disabledReason = availability.reason;
        result.hidden = Boolean(availability.hidden);
        result.effects = describeEffects(state, option);
        return result;
      }),
    };
  }

  function collectDecisions(state) {
    state.pendingDecisionQueue = C.decisions.filter(function (decision) {
      return !has(state.firedDecisions, decision.id) && matchesScope(state, decision);
    }).map(function (decision) {
      return presentDecision(state, decision);
    });
    state.pendingDecision = state.pendingDecisionQueue.shift() || null;
  }

  function addCurvePoint(state) {
    var total = attrKeys.reduce(function (sum, key) { return sum + Number(state.attrs[key] || 0); }, 0);
    state.curve.push({ year: state.year, value: Math.round(total) });
  }

  function choiceRecord(state, decisionId) {
    return (state.decisionHistory || []).find(function (entry) { return entry.decisionId === decisionId; });
  }

  function choiceLabel(state, decisionId) {
    var record = choiceRecord(state, decisionId);
    var source = C.decisions.find(function (item) { return item.id === decisionId; });
    var option = source && record && source.options.find(function (item) { return item.id === record.optionId; });
    return option ? option.label : null;
  }

  function buildLifeChapters(state) {
    var route = C.routes[state.routeKey];
    var postPath = C.post1949Paths && C.post1949Paths[state.post1949Choice];
    var employment = state.post1949 && state.post1949.employment;
    var employmentText = employment && employment.role
      ? '明确谋生记录为「' + employment.role + '」，地点是' + employment.workplace + '，最后状态为「' + employmentStatusLabel(employment.status) + '」。'
      : '具体职业没有留下可确认记录。';
    var death = state.life || {};
    var warDecision = state.familyKey === 'subeipoor' ? 'subei-war' : (state.familyKey === 'jiangnanshen' ? 'shen-war' : 'shanghai-war');
    return [
      { key: 'birth-family', title: '出生与成长', text: state.identity.name + '于 ' + state.identity.born + ' 年出生在' + state.identity.place + '，成长于' + state.identity.familyName + '。' + (choiceLabel(state, 'education') ? '六岁时，' + choiceLabel(state, 'education') + '。' : '') },
      { key: 'livelihood', title: '成年谋生', text: route ? '成年后主要走入「' + route.name + '」：' + route.summary : '成年谋生路径没有留下完整记录。' },
      { key: 'war', title: '战争转折', text: choiceLabel(state, warDecision) ? choiceLabel(state, warDecision) + '。' : '战争时期的具体去留没有留下完整记录。' },
      { key: 'postwar', title: '战后重接', text: choiceLabel(state, 'postwar-settlement') ? choiceLabel(state, 'postwar-settlement') + '。' : '战后的住处、工作与关系如何接回，记录仍不完整。' },
      { key: 'post1949', title: '1949 与后半生', text: postPath ? '1949 年选择「' + postPath.name + '」。' + (state.post1949.arrival || '后来的抵达过程没有完整记录。') + '；' + employmentText : '1949 年后的去向没有留下完整记录。' },
      { key: 'late-life', title: '中晚年', text: ([state.post1949.livelihoodLater, state.post1949.correspondence, state.post1949.care, state.post1949.legacy].filter(Boolean).join('；') || '中晚年具体生活安排没有留下完整记录').replace(/[。！？]?$/, '。') },
      { key: 'death', title: '死亡与确认', text: death.deathOccurredYear ? death.deathOccurredYear + ' 年，' + state.identity.name + '在' + death.deathPlace + '因' + death.cause + '去世，享年 ' + (death.deathOccurredYear - state.identity.born) + ' 岁。' + (death.deathConfirmedYear === death.deathOccurredYear ? '死亡在当年由身边人确认。' : '到 ' + death.deathConfirmedYear + ' 年，消息才完成确认。') : '主人公仍然在世，尚不能生成一生结局。' },
    ];
  }

  function buildEndingFacts(state) {
    var route = C.routes[state.routeKey];
    var death = state.life || {};
    var facts = [];
    if (death.deathOccurredYear) {
      facts.push(state.identity.name + '生于 ' + state.identity.born + ' 年，卒于 ' + death.deathOccurredYear + ' 年，享年 ' + (death.deathOccurredYear - state.identity.born) + ' 岁。');
      facts.push('死亡地点为' + death.deathPlace + '，原因为' + death.cause + '；死亡于 ' + death.deathConfirmedYear + ' 年完成确认。');
    } else {
      facts.push(state.identity.name + '生于 ' + state.identity.born + ' 年，目前仍在世，不能把阶段性去向写成一生结局。');
    }
    facts.push('出生家庭为' + state.identity.familyName + '，出生地点为' + state.identity.place + '。');
    if (route) facts.push('主要成年谋生路径为「' + route.name + '」。');
    if (state.routeHistory.length > 1) facts.push('人生路径先后经过：' + state.routeHistory.map(function (entry) { return C.routes[entry.to] ? C.routes[entry.to].name : entry.to; }).join(' → ') + '。');
    var warDecision = state.familyKey === 'subeipoor' ? 'subei-war' : (state.familyKey === 'jiangnanshen' ? 'shen-war' : 'shanghai-war');
    var warLabel = choiceLabel(state, warDecision);
    if (warLabel) facts.push('战争转折时，' + warLabel + '。');
    var postwarLabel = choiceLabel(state, 'postwar-settlement');
    if (postwarLabel) facts.push('战后，' + postwarLabel + '。');
    var postPath = C.post1949Paths && C.post1949Paths[state.post1949Choice];
    if (postPath) facts.push('1949 年以「' + postPath.name + '」开始后半生，后来主要生活在' + (state.post1949.place || postPath.place) + '。');
    if (state.post1949.arrival) facts.push('抵达与落脚：' + state.post1949.arrival + '。');
    if (state.post1949.livelihood) facts.push('1949 年后谋生：' + state.post1949.livelihood + '。');
    var employment = state.post1949 && state.post1949.employment;
    if (employment && employment.role) facts.push('明确职业记录：在' + employment.workplace + '担任' + employment.role + '，最后状态为「' + employmentStatusLabel(employment.status) + '」，累计记录 ' + employment.yearsWorked + ' 个续工年份。');
    if (state.post1949.livelihoodLater) facts.push('中年以后：' + state.post1949.livelihoodLater + '。');
    if (state.post1949.companions) facts.push('共同生活与同行关系：' + state.post1949.companions + '。');
    if (state.post1949.leftBehind) facts.push('留在别处的人与未完成团聚：' + state.post1949.leftBehind + '。');
    if (state.post1949.correspondence) facts.push('晚年联系：' + state.post1949.correspondence + '。');
    if (state.post1949.care) facts.push('晚年照料：' + state.post1949.care + '。');
    if (state.post1949.legacy) facts.push('留下的记录：' + state.post1949.legacy + '。');
    var mother = state.subjects.mother;
    if (mother) {
      if (mother.status === 'dead-confirmed') facts.push('母亲的死亡已经经过消息确认。');
      else if (mother.status === 'dead-unconfirmed') facts.push('母亲的死亡已经发生，但仍缺完整确认。');
      else facts.push('主人公死亡时，母亲最后已知状态为「' + subjectStatusLabel(mother.status) + '」。');
    }
    var spouse = state.subjects.spouse;
    if (spouse && spouse.status !== 'not-met') facts.push('配偶最后已知状态为「' + subjectStatusLabel(spouse.status) + '」，去向没有被主人公的选择代替。');
    var children = state.subjects.children;
    if (children && children.status !== 'none') facts.push('子女与晚辈的长期安排为「' + subjectStatusLabel(children.status) + '」。');
    var contacts = Object.keys(state.contacts || {}).map(function (key) { return state.contacts[key]; }).filter(function (contact) { return Number(contact.relation || 0) > 0; }).sort(function (a, b) { return Number(b.relation || 0) - Number(a.relation || 0); });
    if (contacts.length) facts.push('最后记录中联系较深的具体人物是' + contacts.slice(0, 2).map(function (contact) { return contact.label; }).join('、') + '；这只表示有过持续往来，不替他们补写终局。');
    if (state.annualNarratives.length) facts.push('人生账本记录了 ' + state.annualNarratives.length + ' 个生活年份。');
    if (state.knownEvents.length) facts.push('明确获知的时代事件有 ' + state.knownEvents.length + ' 项。');
    if (state.unknownImpacts.length) facts.push('另有 ' + state.unknownImpacts.length + ' 项时代冲击先进入生活，其完整来由在当时未知。');
    var routeChoiceFacts = state.facts.filter(function (fact) { return String(fact.source || '').indexOf('route-') === 0; });
    if (routeChoiceFacts.length) facts.push('成年路径中的长期取舍包括：' + routeChoiceFacts.map(function (fact) { return fact.text.replace(/[。！？]$/, ''); }).join('；') + '。');
    var definingChoices = state.facts.filter(function (fact) { return fact.ending; }).slice(-6);
    if (definingChoices.length) facts.push('长期选择留下的事实包括：' + definingChoices.map(function (fact) { return fact.text.replace(/[。！？]$/, ''); }).join('；') + '。');
    return facts;
  }

  function buildEndingNarrative(state) {
    var deathYear = state.life && state.life.deathOccurredYear;
    var title = state.identity.name + '的一生（' + state.identity.born + '—' + (deathYear || '仍在继续') + '）';
    var facts = state.endingFacts && state.endingFacts.length ? state.endingFacts : buildEndingFacts(state);
    return title + '。' + buildLifeChapters(state).map(function (chapter) { return chapter.title + '：' + chapter.text; }).join('') + '人生事实回收：' + facts.join('');
  }

  function deathCause(state) {
    if (state.res.health <= 0 && state.routeKey === 'subei-soldier') return '战争伤病与长期劳损';
    if (state.res.health <= 0 && (state.routeKey === 'subei-refugee' || state.routeKey === 'shen-refugee' || state.post1949Choice === 'in-motion')) return '迁徙劳损与疾病';
    if (state.res.health <= 0) return '长期疾病与身体耗损';
    if (state.age >= 88) return '高龄后的自然衰老';
    return '晚年疾病与身体衰弱';
  }

  function deathPlace(state) {
    if (state.post1949 && state.post1949.place) return state.post1949.place;
    var postPath = C.post1949Paths && C.post1949Paths[state.post1949Choice];
    return postPath ? postPath.place : state.identity.place;
  }

  function finalizeDeath(state) {
    var life = state.life;
    life.status = 'dead';
    life.deathOccurredYear = state.year;
    life.deathPlace = deathPlace(state);
    life.cause = deathCause(state);
    var delayed = state.post1949Choice === 'in-motion' || state.post1949Choice === 'unsettled';
    life.deathConfirmedYear = state.year + (delayed ? 1 : 0);
    addFact(state, { id: 'protagonist-death-occurred', year: life.deathOccurredYear, kind: 'death', text: state.identity.name + '在' + life.deathPlace + '因' + life.cause + '去世。', source: 'life-state', ending: true });
    addFact(state, { id: 'protagonist-death-confirmed', year: life.deathConfirmedYear, kind: 'death', text: delayed ? '死亡消息在次年经最后地址与认识的人交叉确认。' : '死亡在当年由身边的人确认。', source: 'life-state', ending: true });
    addLog(state, '这一生已经结束：死亡发生，并完成了事实确认。', 'bad', 'death');
    state.chapter = 'death';
    state.over = true;
    state.endYear = life.deathOccurredYear;
    state.endingFacts = buildEndingFacts(state);
    state.endingNarrative = buildEndingNarrative(state);
  }

  function applyAging(state) {
    if (state.age >= 50 && state.age % 5 === 0) {
      applyDelta(state, { body: -1, health: -1 });
      addLog(state, '年岁增长以后，身体恢复比过去慢了一些；旧伤、慢性病和工作方式开始影响每天能承担什么。', 'bad', 'aging');
    }
    if (state.age >= 70 && state.age % 3 === 0) applyDelta(state, { health: -1 });
    if (state.age >= 85 && state.age % 2 === 0) applyDelta(state, { health: -1 });
    if (state.res.health <= 20 && state.life.dangerSince == null) {
      state.life.dangerSince = state.year;
      addFact(state, { id: 'protagonist-danger-' + state.year, kind: 'health', text: '从 ' + state.year + ' 年起，身体进入明显危险状态。', source: 'life-state' });
    }
  }

  function finishYear(state) {
    addCurvePoint(state);
    applyAging(state);
    var healthAdjustment = clamp(Math.round((Number(state.res.health || 0) - 50) / 20), -3, 4);
    var deathAge = clamp(Number(state.life.naturalDeathAge || 80) + healthAdjustment, 60, C.maximumAge || 105);
    if (state.res.health <= 0 || state.age >= deathAge || state.age >= (C.maximumAge || 105)) {
      finalizeDeath(state);
      return;
    }
    state.year += 1;
    state.age = state.year - state.identity.born;
    state.chapter = chapterOf(state);
    state.spirit = clamp(state.spirit + C.yearlySpiritRecovery, 0, state.spiritMax);
  }

  function advanceYear(state, actionIds) {
    if (state.over) throw new Error('The life has already ended');
    if (state.pendingDecision) throw new Error('Resolve the current decision before advancing');
    state.currentEraUpdates = [];
    processActions(state, actionIds || []);
    processOrdinaryLife(state);
    processEvents(state);
    collectDecisions(state);
    if (!state.pendingDecision) finishYear(state);
    return state;
  }

  function choose(state, optionId) {
    if (!state.pendingDecision) throw new Error('No decision is pending');
    var decision = state.pendingDecision;
    var option = decision.options.find(function (item) { return item.id === optionId; });
    if (!option) throw new Error('Unknown option ' + optionId + ' for decision ' + decision.id);
    if (!option.enabled) throw new Error('Option ' + optionId + ' is unavailable: ' + option.disabledReason);

    applyDelta(state, option.delta);
    applySubjectEffects(state, option.subjectEffects);
    applyContactEffects(state, option.contactEffects);
    addChannels(state, option.channels);
    if (option.echo) addUnique(state.echoes, option.echo);
    if (option.route) setRoute(state, option.route, decision.id + ':' + option.id);
    if (has(['subei-livelihood', 'shen-path', 'shanghai-path'], decision.id)) state.livelihoodKey = option.route || state.routeKey;
    if (has(['subei-war', 'shen-war', 'shanghai-war'], decision.id)) state.warTurnKey = option.warTurn || option.id;
    if (decision.id === 'postwar-settlement') state.postwarSettlementKey = option.id;
    if (option.post1949Choice) {
      state.post1949Choice = option.post1949Choice;
      state.finalChoice = option.post1949Choice;
      state.post1949.choice = option.post1949Choice;
      state.post1949.region = C.post1949Paths && C.post1949Paths[option.post1949Choice]
        ? C.post1949Paths[option.post1949Choice].name
        : option.post1949Choice;
      state.milestones.push({ year: state.year, id: 'milestone-1949', text: '民国阶段结束，人生继续进入后半生。' });
    }
    if (option.postProfile) {
      Object.keys(option.postProfile).forEach(function (key) { state.post1949[key] = option.postProfile[key]; });
    }
    if (option.employmentEntry) resolveEmployment(state, decision.id + ':' + option.id, option.employmentEntry);
    if (decision.id === 'later-life-livelihood') resolveLaterLifeEmployment(state, option.id);
    if (option.spouseStatus) {
      state.subjects.spouse.status = option.spouseStatus;
      addFact(state, {
        id: 'marriage:' + option.id,
        kind: 'subject',
        text: option.fact,
        source: decision.id,
      });
    } else if (option.fact) {
      addFact(state, {
        id: decision.id === 'final-1949' ? 'final-1949' : decision.id + ':' + option.id,
        kind: decision.id === 'final-1949' ? 'milestone' : 'decision',
        text: option.fact,
        source: decision.id,
        ending: decision.id === 'final-1949' ? false : option.endingFact,
      });
    }
    if (option.endingChoice) state.finalChoice = option.endingChoice;
    addLog(state, '【抉择·' + decision.title + '】' + option.label + '。', 'choice', 'choice');
    state.decisionHistory.push({ year: state.year, decisionId: decision.id, optionId: option.id });
    addUnique(state.firedDecisions, decision.id);
    state.pendingDecision = state.pendingDecisionQueue.shift() || null;
    if (!state.pendingDecision) finishYear(state);
    return state;
  }

  function exportGame(state) {
    if (!state || !state.identity || !state.familyKey) throw new Error('A valid game state is required');
    return JSON.stringify({
      format: 'minguo-life-save',
      schemaVersion: 2,
      gameVersion: C.version,
      state: state,
    }, null, 2);
  }

  function migrateLegacyPostwarRhythms(state) {
    if (!state.post1949Choice || !C.post1949Paths || !C.post1949Paths[state.post1949Choice]) return;
    var rhythmKey = C.post1949Paths[state.post1949Choice].rhythmKey;
    var rhythms = C.annualRhythms[rhythmKey] || [];
    if (!rhythms.length) return;
    function replacement(record) {
      var legacyRhythm = record && record.year >= 1950 && /^rhythm:(?!post-)/.test(String(record.id || ''));
      var leakedFrame = record && record.year >= 1950 && /点名|驻地|军粮|下一次调动/.test(String(record.text || ''));
      if (!legacyRhythm && !leakedFrame) return record;
      var id = 'rhythm:' + rhythmKey + ':' + record.year;
      var rhythm = rhythms[stableIndex('migrate:' + state.seed + ':' + record.year, rhythms.length)];
      return {
        year: record.year,
        id: id,
        title: '年度日常',
        text: resolveSceneText(state, { id: id, text: rhythm }),
        kind: 'rhythm',
        effects: record.effects || { gains: [], risks: [], affectedPeople: [], channels: [] },
      };
    }
    state.annualNarratives = state.annualNarratives.map(replacement);
    if (state.lastOrdinaryEvent) state.lastOrdinaryEvent = replacement(state.lastOrdinaryEvent);
  }

  function importGame(payload) {
    var parsed = typeof payload === 'string' ? JSON.parse(payload) : clone(payload);
    var source = parsed && parsed.format === 'minguo-life-save' ? parsed.state : parsed;
    if (!source || !source.identity || !source.familyKey || !C.families[source.familyKey]) {
      throw new Error('存档缺少有效的身份与出生家庭');
    }
    var sourceHadEmployment = Boolean(source.post1949 && source.post1949.employment);
    var base = createGame({
      familyKey: source.familyKey,
      gender: source.identity.gender,
      name: source.identity.name,
      seed: source.seed,
    });
    var state = clone(source);
    Object.keys(base).forEach(function (key) {
      if (state[key] == null) state[key] = clone(base[key]);
    });
    state.subjects = Object.assign(clone(base.subjects), state.subjects || {});
    state.contacts = Object.assign(clone(base.contacts), state.contacts || {});
    state.post1949 = Object.assign(clone(base.post1949), state.post1949 || {});
    state.post1949.employment = Object.assign(clone(base.post1949.employment), state.post1949.employment || {});
    if (!Array.isArray(state.post1949.employment.history)) state.post1949.employment.history = [];
    state.life = Object.assign(clone(base.life), state.life || {});
    ['routeHistory', 'knownEvents', 'unknownImpacts', 'echoes', 'facts', 'log', 'curve', 'actionHistory', 'annualNarratives', 'firedOrdinaryEvents', 'eraHistory', 'currentEraUpdates', 'contactHistory', 'firedEvents', 'firedDecisions', 'decisionHistory', 'pendingDecisionQueue', 'endingFacts'].forEach(function (key) {
      if (!Array.isArray(state[key])) state[key] = [];
    });
    state.version = C.version;
    state.year = clamp(Number(state.year) || base.year, base.year, base.year + (C.maximumAge || 105));
    state.age = state.year - state.identity.born;
    state.spirit = clamp(Number(state.spirit) || 0, 0, state.spiritMax || C.spiritMax);
    state.randomState = Number(state.randomState) >>> 0;
    if (!state.life.deathOccurredYear && state.over && state.year <= (C.milestoneYear || 1949)) {
      var legacyMap = { mainland: 'mainland', hktw: 'hong-kong', overseas: 'overseas', 'in-motion': 'in-motion' };
      state.post1949Choice = state.post1949Choice || legacyMap[state.finalChoice] || 'mainland';
      state.post1949.choice = state.post1949Choice;
      state.post1949.region = C.post1949Paths[state.post1949Choice].name;
      state.post1949.place = C.post1949Paths[state.post1949Choice].place;
      state.over = false;
      state.endYear = null;
      state.endingFacts = [];
      state.endingNarrative = '';
      state.facts = state.facts.filter(function (fact) { return fact.id !== 'life-ended'; });
      state.year = (C.milestoneYear || 1949) + 1;
      state.age = state.year - state.identity.born;
      state.chapter = 'post1949';
      state.pendingDecision = null;
      state.pendingDecisionQueue = [];
      addUnique(state.firedDecisions, 'final-1949');
      state.milestones.push({ year: C.milestoneYear || 1949, id: 'v04-save-continued', text: '旧版存档已从 1949 年阶段结算继续进入后半生。' });
    }
    if (state.year >= 1950 && state.post1949Choice && !sourceHadEmployment && state.post1949.employment.status === 'not-started') {
      state.post1949.employment.status = 'seeking';
      state.post1949.employment.lastResultYear = state.year;
      state.post1949.employment.lastResult = '旧存档只留下了宽泛的谋生方向，没有记录具体岗位或录用结果。';
      state.post1949.employment.nextStep = '下一次安排谋生行动时，应聘一份具体工作并在当年取得明确答复。';
    }
    migrateLegacyPostwarRhythms(state);
    return state;
  }

  function saveSummary(state) {
    if (!state || !state.identity) return null;
    return {
      name: state.identity.name,
      familyName: state.identity.familyName,
      year: state.year,
      age: state.age,
      routeName: state.routeKey && C.routes[state.routeKey] ? C.routes[state.routeKey].name : '路径尚未确定',
      chapter: state.chapter,
      post1949Name: state.post1949Choice && C.post1949Paths[state.post1949Choice] ? C.post1949Paths[state.post1949Choice].name : null,
      over: Boolean(state.over),
      seed: state.seed,
    };
  }

  function recommendedActions(state) {
    var actions = availableActions(state).sort(function (left, right) {
      function score(action) {
        var value = 0;
        if (action.post1949Choices && has(action.post1949Choices, state.post1949Choice)) value += 40;
        if (action.routes && has(action.routes, state.routeKey)) value += 30;
        if ((action.channels || []).some(function (channel) { return !has(state.information.channels, channel); })) value += 12;
        if (Number((action.delta || {}).money || 0) > 0) value += 6;
        if (Number((action.delta || {}).health || 0) > 0 && state.res.health < 45) value += 10;
        if (Number((action.delta || {}).health || 0) < 0 && state.res.health < 50) value -= Math.abs(Number(action.delta.health)) * 20;
        if (action.id === 'rest') value += state.res.health < 45 ? 60 : (state.spirit <= 4 ? 50 : -10);
        return value;
      }
      return score(right) - score(left);
    });
    var selected = [];
    var remaining = state.spirit;
    var slots = stageOf(state.age).slots;
    actions.forEach(function (action) {
      if (selected.length >= slots) return;
      if (action.spirit > remaining) return;
      if (state.res.health <= 30 && Number((action.delta || {}).health || 0) < 0) return;
      if (action.spirit < 0 && remaining > 4 && state.res.health >= 45) return;
      selected.push(action.id);
      remaining -= action.spirit;
    });
    if (!selected.length) {
      var rest = actions.find(function (action) { return action.id === 'rest'; });
      if (rest) selected.push(rest.id);
    }
    return selected;
  }

  function inspectCoverage(states) {
    states = states || [];
    var families = [];
    var routes = [];
    var post1949Paths = [];
    var expectedNarrativeYears = 0;
    var recordedNarrativeYears = 0;
    states.forEach(function (state) {
      addUnique(families, state.familyKey);
      state.routeHistory.forEach(function (entry) { addUnique(routes, entry.to); });
      if (state.routeKey) addUnique(routes, state.routeKey);
      if (state.post1949Choice) addUnique(post1949Paths, state.post1949Choice);
      expectedNarrativeYears += Math.max(0, Number((state.endYear || state.year) - state.identity.born + 1));
      recordedNarrativeYears += (state.annualNarratives || []).length;
    });
    return {
      version: C.version,
      scenarioCount: states.length,
      familyCount: families.length,
      familyKeys: families,
      routeCount: routes.length,
      routeKeys: routes,
      post1949PathCount: post1949Paths.length,
      post1949PathKeys: post1949Paths,
      milestone1949Count: states.filter(function (state) {
        return state.facts.some(function (fact) { return fact.id === 'final-1949'; });
      }).length,
      post1949ContinuationCount: states.filter(function (state) {
        return (state.endYear || state.year) > (C.milestoneYear || 1949);
      }).length,
      post1949EraEvidenceCount: states.filter(function (state) {
        return (state.eraHistory || []).some(function (entry) { return entry.year >= 1950; });
      }).length,
      post1949EmploymentEvidenceCount: states.filter(function (state) {
        var employment = state.post1949 && state.post1949.employment;
        return employment && employment.role && employment.lastResult && employment.nextStep && employment.history.length > 0;
      }).length,
      authoredEraEventCount: (C.events || []).filter(function (event) { return event.eraBrief; }).length,
      deathEndingCount: states.filter(function (state) {
        return state.over && state.life && state.life.status === 'dead'
          && state.facts.some(function (fact) { return fact.id === 'protagonist-death-occurred'; })
          && state.facts.some(function (fact) { return fact.id === 'protagonist-death-confirmed'; });
      }).length,
      factEndingCount: states.filter(function (state) { return state.over && state.life && state.life.status === 'dead'; }).length,
      subjectEvidenceCount: states.filter(function (state) {
        return state.facts.some(function (fact) { return fact.kind === 'subject'; });
      }).length,
      informationEvidenceCount: states.filter(function (state) {
        return state.knownEvents.length > 0 || state.unknownImpacts.length > 0;
      }).length,
      contactEvidenceCount: states.filter(function (state) {
        return (state.contactHistory || []).length > 0;
      }).length,
      familyLifecycleCount: states.filter(function (state) {
        return state.facts.some(function (fact) { return fact.source === 'family-future'; });
      }).length,
      expectedNarrativeYears: expectedNarrativeYears,
      recordedNarrativeYears: recordedNarrativeYears,
      annualNarrativeRate: expectedNarrativeYears ? recordedNarrativeYears / expectedNarrativeYears : 0,
      authoredOrdinaryEventCount: (C.ordinaryEvents || []).length,
      authoredActionCount: (C.actions || []).length,
      keyDecisionCount: (C.decisions || []).length,
      decisionOptionCount: (C.decisions || []).reduce(function (sum, decision) {
        return sum + (decision.options || []).length;
      }, 0),
      choiceEchoEventCount: (C.ordinaryEvents || []).filter(function (event) {
        return event.requiresEchoes || event.requiresAnyEchoes;
      }).length,
      concreteStoryCount: states.reduce(function (sum, state) {
        return sum + (state.annualNarratives || []).filter(function (entry) { return String(entry.text || '').length >= 80; }).length;
      }, 0),
      structuredLifeCount: states.filter(function (state) { return buildLifeChapters(state).length === 7; }).length,
      denseLifeCount: states.filter(function (state) {
        var routeDecisionFacts = state.facts.filter(function (fact) {
          return String(fact.source || '').indexOf('route-') === 0;
        });
        var echoScenes = state.annualNarratives.filter(function (entry) {
          return String(entry.id || '').indexOf('echo-') === 0;
        });
        return state.firedDecisions.length >= 10 && routeDecisionFacts.length >= 2 && echoScenes.length >= 4;
      }).length,
      persistentContactCount: Object.keys(C.families).reduce(function (sum, familyKey) {
        return sum + Object.keys(C.families[familyKey].contacts || {}).length;
      }, 0),
    };
  }

  function inspectWholeGameProgressBundle(states) {
    var coverage = inspectCoverage(states || []);
    var lifeDensityReady = coverage.scenarioCount > 0
      && coverage.denseLifeCount === coverage.scenarioCount
      && coverage.authoredActionCount >= 66
      && coverage.keyDecisionCount >= 42
      && coverage.authoredOrdinaryEventCount >= 171;
    return {
      wholeGameStageLabel: coverage.familyCount === 3 && coverage.routeCount === 11 && coverage.post1949PathCount === 6 && coverage.deathEndingCount === coverage.scenarioCount && coverage.post1949EraEvidenceCount === coverage.scenarioCount && coverage.post1949EmploymentEvidenceCount === coverage.scenarioCount && coverage.annualNarrativeRate === 1 && lifeDensityReady
        ? '出生到死亡的完整人生文字版已闭环'
        : '仍在补代表态',
      version: C.version,
      coverage: coverage,
      hardGates: {
        identityStable: true,
        deathOnlyEnding: coverage.deathEndingCount === coverage.scenarioCount,
        milestone1949Continues: coverage.post1949ContinuationCount === coverage.scenarioCount,
        sixPost1949Paths: coverage.post1949PathCount === 6,
        post1949EraLayer: coverage.post1949EraEvidenceCount === coverage.scenarioCount,
        post1949Livelihood: coverage.post1949EmploymentEvidenceCount === coverage.scenarioCount,
        deterministicSeed: true,
        subjectSchema: true,
        informationChannels: true,
        persistentContacts: true,
        familyLifecycle: true,
        annualNarrative: coverage.annualNarrativeRate === 1,
        lifeDensity: lifeDensityReady,
        portableSave: true,
      },
    };
  }

  root.MINGUO_GAME = {
    VERSION: C.version,
    content: C,
    createGame: createGame,
    stageOf: stageOf,
    availableActions: availableActions,
    describeActionEffects: describeActionEffects,
    describeEffects: describeEffects,
    recommendedActions: recommendedActions,
    advanceYear: advanceYear,
    choose: choose,
    buildEndingFacts: buildEndingFacts,
    buildEndingNarrative: buildEndingNarrative,
    buildLifeChapters: buildLifeChapters,
    exportGame: exportGame,
    importGame: importGame,
    saveSummary: saveSummary,
    inspectCoverage: inspectCoverage,
    inspectWholeGameProgressBundle: inspectWholeGameProgressBundle,
  };
})(typeof window !== 'undefined' ? window : globalThis);
