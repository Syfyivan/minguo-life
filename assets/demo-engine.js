// 民国人生 · 可测试文字版引擎 v0.4
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
    return { ok: false, reason: (meta ? meta.name : failed) + '需要达到 ' + gate[failed] };
  }

  function describeActionEffects(state, action) {
    var statLabels = {};
    C.attributes.concat(C.resources).forEach(function (item) { statLabels[item.key] = item.name; });
    var gains = [];
    var risks = [];
    Object.keys(action.delta || {}).forEach(function (key) {
      var amount = Number(action.delta[key] || 0);
      if (amount > 0) gains.push(statLabels[key] || key);
      if (amount < 0) risks.push(statLabels[key] || key);
    });

    var affectedPeople = [];
    Object.keys(action.subjectDelta || {}).forEach(function (key) {
      var subject = state && state.subjects && state.subjects[key];
      affectedPeople.push(subject ? subject.label : key);
    });
    Object.keys(action.contactEffects || {}).forEach(function (key) {
      var contact = state && state.contacts && state.contacts[key];
      if (contact) affectedPeople.push(contact.label);
    });

    return {
      gains: gains,
      risks: risks,
      affectedPeople: affectedPeople.filter(function (label, index, list) { return list.indexOf(label) === index; }),
      channels: (action.channels || []).map(function (key) { return C.channelLabels[key] || key; }),
      spiritKind: action.spirit < 0 ? 'recover' : 'cost',
      spiritAmount: Math.abs(Number(action.spirit || 0)),
    };
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
      contactHistory: [],
      firedEvents: [],
      firedDecisions: [],
      decisionHistory: [],
      pendingDecision: null,
      pendingDecisionQueue: [],
      randomState: seed >>> 0,
      seed: seed,
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
    if (action.families && !has(action.families, state.familyKey)) return { ok: false, reason: '当前家庭不可用' };
    if (action.routes && !has(action.routes, state.routeKey)) return { ok: false, reason: '当前路径不可用' };
    if (action.minAge != null && state.age < action.minAge) return { ok: false, reason: '年龄未到' };
    if (action.maxAge != null && state.age > action.maxAge) return { ok: false, reason: '已经过了适用年龄' };
    if (action.id === 'care-mother' && subjectIsDead(state.subjects.mother)) return { ok: false, reason: '母亲已经去世' };
    return gateResult(state, action.gate);
  }

  function availableActions(state, options) {
    options = options || {};
    return C.actions.map(function (action) {
      var availability = actionAvailability(state, action);
      var result = clone(action);
      result.enabled = availability.ok;
      result.disabledReason = availability.reason;
      return result;
    }).filter(function (action) {
      return options.includeDisabled ? true : action.enabled;
    });
  }

  function processActions(state, actionIds) {
    var stage = stageOf(state.age);
    var chosen = (actionIds || []).slice(0, stage.slots);
    var counts = {};
    var spent = 0;
    var performed = [];

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
      applyDelta(state, action.delta, scale);
      applySubjectEffects(state, action.subjectDelta);
      applyContactEffects(state, action.contactEffects);
      addChannels(state, action.channels);
      counts[actionId] = times + 1;
      performed.push(action.name);
    });

    state.spirit = clamp(state.spirit - spent, 0, state.spiritMax);
    if (state.spirit <= 2) {
      applyDelta(state, { health: -2 });
      addLog(state, '这一年精神长期见底，健康受到额外消耗。', 'bad', 'action');
    }
    if (performed.length) addLog(state, '这一年安排：' + performed.join('、') + '。', '', 'action');
    else addLog(state, '这一年没有额外安排，把主要精力留给日常生活。', '', 'action');
    state.actionHistory.push({ year: state.year, actionIds: chosen });
    checkSubjectDeaths(state);
  }

  function matchesScope(state, item) {
    if (item.year != null && state.year !== item.year) return false;
    if (item.yearByAge != null && state.age !== item.yearByAge) return false;
    if (item.minAge != null && state.age < item.minAge) return false;
    if (item.maxAge != null && state.age > item.maxAge) return false;
    if (item.families && !has(item.families, state.familyKey)) return false;
    if (item.routes && !has(item.routes, state.routeKey)) return false;
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
      record = { year: state.year, id: event.id, title: event.title, text: event.text, kind: 'scene' };
      if (event.fact) {
        addFact(state, {
          id: 'ordinary:' + event.id,
          kind: 'life',
          text: event.fact,
          source: event.id,
        });
      }
    } else {
      var rhythmKey = state.routeKey && C.annualRhythms[state.routeKey] ? state.routeKey : state.familyKey;
      var rhythms = C.annualRhythms[rhythmKey] || ['这一年的日常由家计、关系与时代变化共同构成。'];
      var text = rhythms[Math.floor(random(state) * rhythms.length)];
      record = { year: state.year, id: 'rhythm:' + rhythmKey + ':' + state.year, title: '年度日常', text: text, kind: 'rhythm' };
    }

    state.lastOrdinaryEvent = record;
    state.annualNarratives.push(record);
    addLog(state, '【' + record.title + '】' + record.text, '', 'daily');
    checkSubjectDeaths(state);
  }

  function processEventInformation(state, event) {
    if (!event.knownThrough || !event.knownThrough.length) {
      if (event.title) addLog(state, '【' + event.title + '】' + (event.knownText || event.fact || ''), 'event', 'event');
      return;
    }
    var known = event.knownThrough.some(function (channel) {
      return has(state.information.channels, channel);
    });
    if (known) {
      addUnique(state.knownEvents, event.id);
      addLog(state, '【时代快讯·' + event.title + '】' + event.knownText, 'event', 'info');
    } else {
      addUnique(state.unknownImpacts, event.id);
      addLog(state, '【时代冲击】' + event.unknownText, 'bad', 'info');
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
    if (option.families && !has(option.families, state.familyKey)) return { ok: false, reason: '当前家庭不可选' };
    if (option.routes && !has(option.routes, state.routeKey)) return { ok: false, reason: '当前路径不可选' };
    if (option.genders && !has(option.genders, state.identity.gender)) return { ok: false, reason: '与当前角色性别不符' };
    if (option.requiresSubjectStatus) {
      var exactKeys = Object.keys(option.requiresSubjectStatus);
      if (exactKeys.some(function (key) {
        return !state.subjects[key] || state.subjects[key].status !== option.requiresSubjectStatus[key];
      })) return { ok: false, reason: '当前家庭主体状态不符' };
    }
    if (option.requiresSubjectNotStatus) {
      var notKeys = Object.keys(option.requiresSubjectNotStatus);
      if (notKeys.some(function (key) {
        return state.subjects[key] && state.subjects[key].status === option.requiresSubjectNotStatus[key];
      })) return { ok: false, reason: '当前家庭主体状态不符' };
    }
    var gate = gateResult(state, option.gate);
    if (!gate.ok) return gate;
    if (option.requiredChannels && !option.requiredChannels.some(function (channel) {
      return has(state.information.channels, channel);
    })) return { ok: false, reason: '缺少对应信息与外路' };
    return { ok: true, reason: '' };
  }

  function presentDecision(state, decision) {
    return {
      id: decision.id,
      title: decision.title,
      prompt: decision.prompt,
      year: state.year,
      options: decision.options.map(function (option) {
        var availability = optionAvailability(state, option);
        var result = clone(option);
        result.enabled = availability.ok;
        result.disabledReason = availability.reason;
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

  function buildEndingFacts(state) {
    var route = C.routes[state.routeKey];
    var facts = [];
    facts.push(state.identity.name + '生于 ' + state.identity.born + ' 年，出身为' + state.identity.familyName + '。');
    if (route) facts.push('最后一条主要人生路径是「' + route.name + '」。');
    if (state.routeHistory.length > 1) {
      facts.push('这一生先后走过：' + state.routeHistory.map(function (entry) {
        return C.routes[entry.to] ? C.routes[entry.to].name : entry.to;
      }).join(' → ') + '。');
    }
    var mother = state.subjects.mother;
    if (mother) {
      if (mother.status === 'dead-confirmed') facts.push('母亲的死亡已经经过消息确认。');
      else if (mother.status === 'dead-unconfirmed') facts.push('母亲的死亡已经发生，但终局时仍缺完整确认。');
      else facts.push('终局时，母亲的状态为「' + subjectStatusLabel(mother.status) + '」。');
    }
    var spouse = state.subjects.spouse;
    if (spouse && spouse.status !== 'not-met') facts.push('配偶最终的生活状态为「' + subjectStatusLabel(spouse.status) + '」，该去向由其自身条件形成。');
    var children = state.subjects.children;
    if (children && children.status !== 'none') facts.push('子女与晚辈的长期安排为「' + subjectStatusLabel(children.status) + '」。');
    var contacts = Object.keys(state.contacts || {}).map(function (key) {
      return state.contacts[key];
    }).filter(function (contact) {
      return Number(contact.relation || 0) > 0;
    }).sort(function (a, b) {
      return Number(b.relation || 0) - Number(a.relation || 0);
    });
    if (contacts.length) facts.push('终局时联系最深的具体人物之一是' + contacts[0].label + '，关系状态为「' + ((C.contactStatusLabels && C.contactStatusLabels[contacts[0].status]) || contacts[0].status) + '」。');
    if (state.annualNarratives.length) facts.push('人生账本共记录了 ' + state.annualNarratives.length + ' 个年份的日常生活。');
    if (state.knownEvents.length) facts.push('通过已有信息渠道明确知道的时代事件有 ' + state.knownEvents.length + ' 项。');
    if (state.unknownImpacts.length) facts.push('另有 ' + state.unknownImpacts.length + ' 项时代冲击先作用于生活，具体来由当时并不完整。');
    var finalFact = state.facts.find(function (fact) { return fact.id === 'final-1949'; });
    var definingChoices = state.facts.filter(function (fact) {
      return fact.ending;
    }).slice(-3);
    if (definingChoices.length) {
      facts.push('几次长期选择留下的事实是：' + definingChoices.map(function (fact) {
        return fact.text.replace(/[。！？]$/, '');
      }).join('；') + '。');
    }
    if (finalFact) facts.push(finalFact.text);
    return facts;
  }

  function buildEndingNarrative(state) {
    var endYear = state.endYear || state.year;
    var title = state.identity.name + '的一生（' + state.identity.born + '—' + endYear + '）';
    var facts = state.endingFacts.length ? state.endingFacts : buildEndingFacts(state);
    return title + '。' + facts.join('');
  }

  function finishGame(state, reason) {
    state.over = true;
    state.endYear = state.year;
    state.endingFacts = buildEndingFacts(state);
    state.endingNarrative = buildEndingNarrative(state);
    addFact(state, {
      id: 'life-ended',
      kind: 'ending',
      text: reason === 'health' ? '健康归零后，这一生在此结束。' : '1949 年的选择与事实已经完成回收。',
      source: 'ending',
    });
  }

  function finishYear(state) {
    addCurvePoint(state);
    if (state.res.health <= 0) {
      finishGame(state, 'health');
      return;
    }
    if (state.year >= C.finalYear) {
      finishGame(state, 'timeline');
      return;
    }
    state.year += 1;
    state.age = state.year - state.identity.born;
    state.spirit = clamp(state.spirit + C.yearlySpiritRecovery, 0, state.spiritMax);
  }

  function advanceYear(state, actionIds) {
    if (state.over) throw new Error('The life has already ended');
    if (state.pendingDecision) throw new Error('Resolve the current decision before advancing');
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
        kind: decision.id === 'final-1949' ? 'ending' : 'decision',
        text: option.fact,
        source: decision.id,
        ending: option.endingFact,
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
      schemaVersion: 1,
      gameVersion: C.version,
      state: state,
    }, null, 2);
  }

  function importGame(payload) {
    var parsed = typeof payload === 'string' ? JSON.parse(payload) : clone(payload);
    var source = parsed && parsed.format === 'minguo-life-save' ? parsed.state : parsed;
    if (!source || !source.identity || !source.familyKey || !C.families[source.familyKey]) {
      throw new Error('存档缺少有效的身份与出生家庭');
    }
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
    ['routeHistory', 'knownEvents', 'unknownImpacts', 'echoes', 'facts', 'log', 'curve', 'actionHistory', 'annualNarratives', 'firedOrdinaryEvents', 'contactHistory', 'firedEvents', 'firedDecisions', 'decisionHistory', 'pendingDecisionQueue', 'endingFacts'].forEach(function (key) {
      if (!Array.isArray(state[key])) state[key] = [];
    });
    state.version = C.version;
    state.year = clamp(Number(state.year) || base.year, base.year, C.finalYear);
    state.age = state.year - state.identity.born;
    state.spirit = clamp(Number(state.spirit) || 0, 0, state.spiritMax || C.spiritMax);
    state.randomState = Number(state.randomState) >>> 0;
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
      over: Boolean(state.over),
      seed: state.seed,
    };
  }

  function recommendedActions(state) {
    var actions = availableActions(state);
    var selected = [];
    var remaining = state.spirit;
    var slots = stageOf(state.age).slots;
    actions.forEach(function (action) {
      if (selected.length >= slots) return;
      if (action.spirit > remaining) return;
      if (action.spirit < 0 && remaining > 4) return;
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
    var expectedNarrativeYears = 0;
    var recordedNarrativeYears = 0;
    states.forEach(function (state) {
      addUnique(families, state.familyKey);
      state.routeHistory.forEach(function (entry) { addUnique(routes, entry.to); });
      if (state.routeKey) addUnique(routes, state.routeKey);
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
      factEndingCount: states.filter(function (state) {
        return state.over && state.facts.some(function (fact) { return fact.id === 'final-1949'; });
      }).length,
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
      && coverage.authoredActionCount >= 50
      && coverage.keyDecisionCount >= 33
      && coverage.authoredOrdinaryEventCount >= 100;
    return {
      wholeGameStageLabel: coverage.familyCount === 3 && coverage.routeCount === 9 && coverage.factEndingCount === coverage.scenarioCount && coverage.annualNarrativeRate === 1 && lifeDensityReady
        ? '完整一生内容版已闭环'
        : '仍在补代表态',
      version: C.version,
      coverage: coverage,
      hardGates: {
        identityStable: true,
        factOnlyEnding: true,
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
    recommendedActions: recommendedActions,
    advanceYear: advanceYear,
    choose: choose,
    buildEndingFacts: buildEndingFacts,
    buildEndingNarrative: buildEndingNarrative,
    exportGame: exportGame,
    importGame: importGame,
    saveSummary: saveSummary,
    inspectCoverage: inspectCoverage,
    inspectWholeGameProgressBundle: inspectWholeGameProgressBundle,
  };
})(typeof window !== 'undefined' ? window : globalThis);
