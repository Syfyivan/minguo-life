// 民国人生 · 可测试文字版引擎 v0.7.4／schema 6
// 运行时只负责规则与状态，不直接操作 DOM；浏览器 UI 与 Node 回归共用这一份实现。
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before demo-engine.js');

  var SAVE_SCHEMA_VERSION = 6;
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

  function buildContentRegistries() {
    var registries = { scenes: {}, people: {}, histories: {}, sources: {}, reviews: {} };
    Object.keys(C.reviewSources || {}).forEach(function (sourceId) {
      registries.sources[sourceId] = Object.assign({ id: sourceId }, clone(C.reviewSources[sourceId]));
    });
    (C.ordinaryEvents || []).forEach(function (scene) {
      var reviewStatus = scene.reviewStatus || 'runtime-regression-only';
      registries.scenes[scene.id] = {
        id: scene.id,
        title: scene.title || '年度生活场景',
        families: clone(scene.families || []),
        routes: clone(scene.routes || []),
        sourceIds: clone(scene.sourceIds || []),
        reviewStatus: reviewStatus,
      };
      registries.reviews['scene:' + scene.id] = {
        id: 'scene:' + scene.id,
        contentType: 'scene',
        contentId: scene.id,
        status: reviewStatus,
        note: scene.reviewNote || '已进入自动可达性与完整人生回归；仍需外部史实和文字终审。',
      };
    });
    (C.events || []).forEach(function (event) {
      registries.histories[event.id] = {
        id: event.id,
        year: event.year,
        title: event.title,
        eraScope: event.eraScope || null,
        sourceId: event.historySource ? 'source:' + event.id : null,
      };
      if (event.historySource) {
        registries.sources['source:' + event.id] = {
          id: 'source:' + event.id,
          label: event.historySource.label,
          url: event.historySource.url,
          supports: event.id,
        };
      }
      registries.reviews['history:' + event.id] = {
        id: 'history:' + event.id,
        contentType: 'history',
        contentId: event.id,
        status: event.historySource ? 'source-linked-needs-final-review' : 'source-pending',
        note: event.historySource ? '运行时已连接来源；仍需正式发布前逐项终审。' : '正式发布前必须补来源与终审。',
      };
    });
    Object.keys(C.families || {}).forEach(function (familyKey) {
      Object.keys(C.families[familyKey].contacts || {}).forEach(function (personId) {
        registries.people[personId] = Object.assign({ id: personId, familyKey: familyKey, source: 'family-contact' }, clone(C.families[familyKey].contacts[personId]));
      });
    });
    Object.keys(C.routeContactProfiles || {}).forEach(function (routeKey) {
      (C.routeContactProfiles[routeKey] || []).forEach(function (person) {
        registries.people[person.id] = Object.assign({ routeKey: routeKey, source: 'route-contact' }, clone(person));
      });
    });
    Object.keys(C.publicRouteProfiles || {}).forEach(function (routeKey) {
      var person = C.publicRouteProfiles[routeKey] && C.publicRouteProfiles[routeKey].contact;
      if (person) registries.people[person.id] = Object.assign({ routeKey: routeKey, source: 'public-contact' }, clone(person));
    });
    return registries;
  }

  C.contentRegistries = buildContentRegistries();

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

  function canonicalFamilyKey(familyKey) {
    return (C.runtimeFamilyDesignMap && C.runtimeFamilyDesignMap[familyKey]) || familyKey;
  }

  function routeDomainKey(routeKey) {
    return routeKey && C.legacyRouteDomainMap ? C.legacyRouteDomainMap[routeKey] || null : null;
  }

  function routeLabel(routeKey) {
    return routeKey && C.routes && C.routes[routeKey] ? C.routes[routeKey].name : routeKey || null;
  }

  function emptyEconomicLife() {
    return {
      positions: [], employments: [], assets: [], enterprises: [], shareholders: [],
      debts: [], licenses: [], concessions: [], history: [],
    };
  }

  function ensureEconomicLife(state) {
    state.economicLife = Object.assign(emptyEconomicLife(), state.economicLife || {});
    Object.keys(emptyEconomicLife()).forEach(function (key) {
      if (!Array.isArray(state.economicLife[key])) state.economicLife[key] = [];
    });
    return state.economicLife;
  }

  function upsertEntity(list, id, record) {
    var existing = list.find(function (item) { return item.id === id; });
    if (existing) {
      Object.assign(existing, record);
      return existing;
    }
    list.push(Object.assign({ id: id }, record));
    return list[list.length - 1];
  }

  function addMigrationRecord(state, migration, fromSchema, toSchema) {
    if (!Array.isArray(state.migrationHistory)) state.migrationHistory = [];
    if (state.migrationHistory.some(function (entry) { return entry.migration === migration; })) return;
    state.migrationHistory.push({ migration: migration, fromSchema: fromSchema, toSchema: toSchema });
  }

  function makeCareerEpisode(state, routeKey, startYear, endYear, source, status) {
    var profile = C.routeCareerProfiles && C.routeCareerProfiles[routeKey];
    return {
      id: 'career:' + routeKey + ':' + startYear,
      domainKey: routeDomainKey(routeKey),
      routeKey: routeKey,
      routeLabel: routeLabel(routeKey),
      kind: profile ? profile.kind : null,
      role: profile ? profile.role : null,
      workplace: profile ? profile.workplace : null,
      employer: profile ? profile.employer : null,
      startedYear: startYear,
      endedYear: endYear == null ? null : endYear,
      status: status || (endYear == null ? 'active' : 'ended'),
      source: source || 'legacy-route',
    };
  }

  function syncEconomicRouteEpisode(state, episode) {
    var economicLife = ensureEconomicLife(state);
    var profile = C.routeCareerProfiles && C.routeCareerProfiles[episode.routeKey];
    if (!profile) return;
    var positionId = 'position:' + episode.routeKey + ':' + episode.startedYear;
    upsertEntity(economicLife.positions, positionId, {
      personId: state.identity.id,
      domainKey: episode.domainKey,
      routeKey: episode.routeKey,
      role: profile.role,
      workplace: profile.workplace,
      startedYear: episode.startedYear,
      endedYear: episode.endedYear,
      status: episode.status,
      source: episode.source,
    });
    if (profile.business) {
      var enterpriseId = 'enterprise:' + episode.routeKey + ':' + episode.startedYear;
      upsertEntity(economicLife.enterprises, enterpriseId, {
        name: profile.business.name,
        domainKey: episode.domainKey,
        kind: profile.kind,
        workplace: profile.workplace,
        supplier: profile.business.supplier || null,
        product: profile.business.product || null,
        openedYear: episode.startedYear,
        closedYear: episode.endedYear,
        status: episode.status === 'active' ? 'operating' : 'ended-or-transferred',
        source: episode.source,
      });
      upsertEntity(economicLife.shareholders, 'shareholder:' + enterpriseId + ':' + state.identity.id, {
        enterpriseId: enterpriseId,
        personId: state.identity.id,
        role: '经营责任人',
        shareStatus: '具体产权比例尚未记录',
        startedYear: episode.startedYear,
        endedYear: episode.endedYear,
        source: episode.source,
      });
    } else {
      upsertEntity(economicLife.employments, 'employment:' + episode.routeKey + ':' + episode.startedYear, {
        personId: state.identity.id,
        domainKey: episode.domainKey,
        routeKey: episode.routeKey,
        role: profile.role,
        workplace: profile.workplace,
        employer: profile.employer,
        terms: profile.terms,
        startedYear: episode.startedYear,
        endedYear: episode.endedYear,
        status: episode.status,
        source: episode.source,
      });
    }
  }

  function recordCanonicalRoute(state, routeKey, source) {
    if (!routeKey) return;
    if (!Array.isArray(state.domainHistory)) state.domainHistory = [];
    if (!Array.isArray(state.careerHistory)) state.careerHistory = [];
    var domainKey = routeDomainKey(routeKey);
    var label = routeLabel(routeKey);
    state.routeDomainKey = domainKey;
    state.routeLabel = label;

    var previousDomain = state.domainHistory[state.domainHistory.length - 1];
    if (previousDomain && previousDomain.endYear == null && previousDomain.legacyRouteKey !== routeKey) {
      previousDomain.endYear = Math.max(previousDomain.startYear, state.year - 1);
    }
    if (!previousDomain || previousDomain.legacyRouteKey !== routeKey || previousDomain.endYear != null) {
      state.domainHistory.push({
        id: 'domain:' + routeKey + ':' + state.year,
        domainKey: domainKey,
        startYear: state.year,
        endYear: null,
        source: source || 'decision',
        legacyRouteKey: routeKey,
      });
    }

    var previousCareer = state.careerHistory[state.careerHistory.length - 1];
    if (previousCareer && previousCareer.endedYear == null && previousCareer.routeKey !== routeKey) {
      previousCareer.endedYear = Math.max(previousCareer.startedYear, state.year - 1);
      previousCareer.status = 'ended';
      syncEconomicRouteEpisode(state, previousCareer);
    }
    if (!previousCareer || previousCareer.routeKey !== routeKey || previousCareer.endedYear != null) {
      var episode = makeCareerEpisode(state, routeKey, state.year, null, source, 'active');
      state.careerHistory.push(episode);
      syncEconomicRouteEpisode(state, episode);
    }
  }

  function setRoute(state, routeKey, source) {
    if (!routeKey || state.routeKey === routeKey) return;
    if (!C.routes[routeKey]) throw new Error('Unknown route: ' + routeKey);
    var from = state.routeKey;
    state.routeKey = routeKey;
    state.routeHistory.push({
      year: state.year,
      from: from,
      to: routeKey,
      source: source || 'decision',
      domainKey: routeDomainKey(routeKey),
      routeLabel: routeLabel(routeKey),
    });
    addLog(state, '人生路径转入「' + C.routes[routeKey].name + '」。', 'turn', 'route');
    enterRouteCareer(state, routeKey);
    recordCanonicalRoute(state, routeKey, source);
  }

  function subjectIsDead(subject) {
    return subject && (subject.status === 'dead-unconfirmed' || subject.status === 'dead-confirmed');
  }

  function ensureLivedLife(state) {
    var parentProfiles = (C.parentProfiles && C.parentProfiles[state.familyKey]) || {};
    var defaults = {
      parents: {},
      relationship: {
        status: 'single', spouse: null, startedYear: null, livingArrangement: null,
        lastInteraction: '尚未形成伴侣关系。', lastInteractionYear: null, conflictCount: 0, history: [],
      },
      children: [],
      career: {
        routeKey: null, phase: 'not-started', kind: null, role: null, workplace: null, employer: null,
        supervisor: null, colleague: null, publicPerson: null, duties: null, terms: null,
        active: false, startedYear: null, retiredYear: null, lastWork: null, nextStep: null, history: [], transitions: [], business: null,
      },
      health: { current: null, lastEpisode: null, history: [], treatedCount: 0 },
      social: { lastUpdate: null, history: [] },
      inner: { current: '这一生才刚开始，眼前先是家里人的声音和每天的吃穿。', history: [] },
      yearHistory: [],
      lastYear: null,
    };
    state.lived = Object.assign(defaults, state.lived || {});
    state.lived.relationship = Object.assign(defaults.relationship, state.lived.relationship || {});
    state.lived.career = Object.assign(defaults.career, state.lived.career || {});
    state.lived.health = Object.assign(defaults.health, state.lived.health || {});
    state.lived.social = Object.assign(defaults.social, state.lived.social || {});
    state.lived.inner = Object.assign(defaults.inner, state.lived.inner || {});
    ['history'].forEach(function (key) {
      if (!Array.isArray(state.lived.relationship[key])) state.lived.relationship[key] = [];
      if (!Array.isArray(state.lived.career[key])) state.lived.career[key] = [];
      if (!Array.isArray(state.lived.health[key])) state.lived.health[key] = [];
      if (!Array.isArray(state.lived.social[key])) state.lived.social[key] = [];
      if (!Array.isArray(state.lived.inner[key])) state.lived.inner[key] = [];
    });
    if (!Array.isArray(state.lived.career.transitions)) state.lived.career.transitions = [];
    if (!Array.isArray(state.lived.children)) state.lived.children = [];
    if (!Array.isArray(state.lived.yearHistory)) state.lived.yearHistory = [];

    Object.keys(parentProfiles).forEach(function (key) {
      var profile = parentProfiles[key];
      var subject = state.subjects && state.subjects[key];
      var deathAge = clamp(Number(profile.deathAgeBase || 72) + stableIndex(state.seed + ':' + key + ':parent-age', 9) - 4, 50, 88);
      var existing = state.lived.parents[key] || {};
      state.lived.parents[key] = Object.assign({
        key: key,
        name: profile.name,
        born: profile.born,
        occupation: profile.occupation,
        targetDeathYear: profile.born + deathAge,
        status: subject ? subject.status : 'alive',
        health: subject && subject.health != null ? subject.health : 50,
        place: state.identity.place,
        lastActivity: profile.activities[0],
        lastWords: profile.words[0],
        lastUpdateYear: state.identity.born,
        deathYear: null,
        confirmationYear: null,
        history: [],
      }, existing);
      if (!Array.isArray(state.lived.parents[key].history)) state.lived.parents[key].history = [];
      if (subject) {
        subject.name = state.lived.parents[key].name;
        subject.occupation = state.lived.parents[key].occupation;
      }
    });
    return state.lived;
  }

  function addDetailedContact(state, contact) {
    if (!contact || !contact.id) return null;
    if (!state.contacts[contact.id]) {
      var ageOffset = stableIndex(state.seed + ':' + contact.id + ':life', 18);
      state.contacts[contact.id] = Object.assign({
        status: 'nearby', relation: 10, agency: 68, born: state.identity.born - 10,
        targetDeathAge: 68 + ageOffset, currentActivity: contact.role,
        lastWords: '你们还没有把话说深。', lastUpdateYear: state.year, history: [],
      }, clone(contact));
      if (!Array.isArray(state.contacts[contact.id].history)) state.contacts[contact.id].history = [];
    }
    return state.contacts[contact.id];
  }

  function ensurePublicLife(state) {
    var defaults = {
      status: 'unaffiliated', organizationKey: null, organizationName: '没有加入政治组织',
      pendingOrganizationKey: null, publicRole: '尚未形成公共事务角色', secrecy: 'open',
      trust: 0, exposure: 0, coercion: 0, familyKnowledge: 'none', coverRole: null,
      contactKey: null, lastUpdate: '尚未参加政治组织或公共活动；保持距离也是有效人生。',
      history: [],
    };
    state.publicLife = Object.assign(defaults, state.publicLife || {});
    if (!Array.isArray(state.publicLife.history)) state.publicLife.history = [];
    return state.publicLife;
  }

  function publicOrganizationName(key) {
    return key && C.publicOrganizations && C.publicOrganizations[key]
      ? C.publicOrganizations[key].name
      : '没有加入政治组织';
  }

  function applyPublicEffect(state, effect, sourceId) {
    if (!effect) return null;
    var publicLife = ensurePublicLife(state);
    var routeProfile = (C.publicRouteProfiles && C.publicRouteProfiles[state.routeKey]) || {};
    var pendingOrganization = publicLife.pendingOrganizationKey;
    if (Object.prototype.hasOwnProperty.call(effect, 'status')) publicLife.status = effect.status;
    if (Object.prototype.hasOwnProperty.call(effect, 'organizationKey')) publicLife.organizationKey = effect.organizationKey;
    if (effect.organizationFromPending) publicLife.organizationKey = pendingOrganization;
    if (Object.prototype.hasOwnProperty.call(effect, 'pendingOrganizationKey')) publicLife.pendingOrganizationKey = effect.pendingOrganizationKey;
    if (Object.prototype.hasOwnProperty.call(effect, 'secrecy')) publicLife.secrecy = effect.secrecy;
    if (Object.prototype.hasOwnProperty.call(effect, 'familyKnowledge')) publicLife.familyKnowledge = effect.familyKnowledge;
    if (effect.roleFromRoute && routeProfile[effect.roleFromRoute]) publicLife.publicRole = routeProfile[effect.roleFromRoute];
    if (effect.coverFromCareer) {
      var career = ensureLivedLife(state).career;
      publicLife.coverRole = career.role && career.workplace ? career.role + ' · ' + career.workplace : '原有公开职业';
    }
    publicLife.trust = clamp(Number(publicLife.trust || 0) + Number(effect.trustDelta || 0), 0, 100);
    publicLife.exposure = clamp(Number(publicLife.exposure || 0) + Number(effect.exposureDelta || 0), 0, 100);
    publicLife.coercion = clamp(Number(publicLife.coercion || 0) + Number(effect.coercionDelta || 0), 0, 100);
    if (effect.addRouteContact && routeProfile.contact) {
      var contact = addDetailedContact(state, routeProfile.contact);
      publicLife.contactKey = routeProfile.contact.id;
      if (contact) {
        contact.relation = clamp(Number(contact.relation || 0) + 3, 0, 100);
        contact.lastUpdateYear = state.year;
      }
    }
    publicLife.organizationName = publicOrganizationName(publicLife.organizationKey);
    publicLife.lastUpdate = effect.historyText || '公共生活状态发生变化。';
    if (String(sourceId || '').indexOf('action:') === 0 && publicLife.publicRole && publicLife.publicRole !== '尚未形成公共事务角色') {
      publicLife.lastUpdate += ' 本次实际事务：' + publicLife.publicRole + '。';
    }
    var record = {
      year: state.year, source: sourceId || 'public-life', status: publicLife.status,
      organizationKey: publicLife.organizationKey, organizationName: publicLife.organizationName,
      pendingOrganizationKey: publicLife.pendingOrganizationKey,
      role: publicLife.publicRole, secrecy: publicLife.secrecy, familyKnowledge: publicLife.familyKnowledge,
      exposure: publicLife.exposure, coercion: publicLife.coercion, text: publicLife.lastUpdate,
    };
    publicLife.history.push(record);
    addLog(state, '【公共生活】' + publicLife.lastUpdate, publicLife.secrecy === 'secret' ? 'turn' : '', 'public-life');
    return publicLife.lastUpdate;
  }

  function publicConditionResult(state, item) {
    var publicLife = ensurePublicLife(state);
    if (item.publicStatuses && !has(item.publicStatuses, publicLife.status)) {
      return { ok: false, reason: '当前公共生活状态为「' + ((C.publicStatusLabels && C.publicStatusLabels[publicLife.status]) || publicLife.status) + '」。' };
    }
    if (item.publicSecrecy && !has(item.publicSecrecy, publicLife.secrecy)) return { ok: false, reason: '当前身份公开程度不满足这项行动。' };
    if (item.publicOrganizations && !has(item.publicOrganizations, publicLife.organizationKey)) return { ok: false, reason: '当前没有相符的组织关系。' };
    if (item.minPublicTrust != null && publicLife.trust < item.minPublicTrust) return { ok: false, reason: '需要先通过具体事务建立更多组织信任。' };
    if (item.minPublicExposure != null && publicLife.exposure < item.minPublicExposure) return { ok: false, reason: '当前公开暴露程度尚未触发这一处境。' };
    if (item.maxPublicExposure != null && publicLife.exposure > item.maxPublicExposure) return { ok: false, reason: '当前公开暴露程度已经超过这项安排能够承受的范围。' };
    return { ok: true, reason: '' };
  }

  function installRouteContacts(state, routeKey) {
    ((C.routeContactProfiles && C.routeContactProfiles[routeKey]) || []).forEach(function (contact) {
      addDetailedContact(state, contact);
    });
  }

  function enterRouteCareer(state, routeKey) {
    var profile = C.routeCareerProfiles && C.routeCareerProfiles[routeKey];
    if (!profile) return;
    var lived = ensureLivedLife(state);
    var career = lived.career;
    if (career.routeKey === routeKey && career.phase === 'route') return;
    if (career.role) {
      career.transitions.push({
        year: state.year, fromRole: career.role, fromWorkplace: career.workplace,
        toRole: profile.role, toWorkplace: profile.workplace,
      });
    }
    career.routeKey = routeKey;
    career.phase = 'route';
    career.active = true;
    career.retiredYear = null;
    career.kind = profile.kind;
    career.role = profile.role;
    career.workplace = profile.workplace;
    career.employer = profile.employer;
    career.supervisor = profile.supervisor;
    career.colleague = profile.colleague;
    career.publicPerson = profile.publicPerson;
    career.duties = profile.duties;
    career.terms = profile.terms;
    career.startedYear = state.year;
    career.nextStep = '在下一次具体工作中处理职责、报酬和与人发生的实际问题。';
    career.business = profile.business ? Object.assign({
      active: true, openedYear: state.year, lastActiveYear: null,
      ordersHandled: 0, lastCustomer: profile.publicPerson, lastProblem: null,
    }, clone(profile.business)) : null;
    installRouteContacts(state, routeKey);
    addFact(state, {
      id: 'career-start:' + routeKey,
      kind: 'livelihood',
      text: state.year + ' 年开始在' + profile.workplace + '做' + profile.role + '，主要负责' + profile.duties + '；' + profile.terms + '。',
      source: 'career-state',
    });
    addLog(state, '【具体营生】在' + profile.workplace + '开始做' + profile.role + '；往来对象包括' + profile.supervisor + '、' + profile.colleague + '和' + profile.publicPerson + '。', 'turn', 'livelihood');
  }

  function post1949CareerProfile(state) {
    var employment = state.post1949 && state.post1949.employment;
    if (!employment || !employment.role) return null;
    var people = (C.post1949People && C.post1949People[state.post1949Choice]) || {};
    return {
      kind: 'employment', role: employment.role, workplace: employment.workplace,
      employer: people.employer || '当前工作地点的负责人', supervisor: people.employer || '当前负责人',
      colleague: people.coworker || '同班同事', publicPerson: people.neighbor || '住处邻人',
      duties: employment.duties, terms: employment.terms,
      scenes: [],
    };
  }

  function installPost1949Contacts(state) {
    var people = C.post1949People && C.post1949People[state.post1949Choice];
    if (!people) return;
    [
      { id: 'post_employer_' + state.post1949Choice, label: people.employer, role: '负责说明岗位、工钱与是否留用的人', status: 'coworker', relation: 12, born: state.identity.born - 12 },
      { id: 'post_coworker_' + state.post1949Choice, label: people.coworker, role: '与你在同一地点做工、也有自己家计的同事', status: 'coworker', relation: 18, born: state.identity.born + 1 },
      { id: 'post_neighbor_' + state.post1949Choice, label: people.neighbor, role: '与你共享地方消息但不共享全部家计的邻人', status: 'nearby', relation: 16, born: state.identity.born - 3 },
    ].forEach(function (contact) { addDetailedContact(state, contact); });
  }

  function syncCareerFromEmployment(state) {
    var profile = post1949CareerProfile(state);
    if (!profile) return;
    var career = ensureLivedLife(state).career;
    if (career.phase !== 'post1949' || career.role !== profile.role || career.workplace !== profile.workplace) {
      if (career.business && career.business.active !== false) {
        career.business.active = false;
        career.business.lastActiveYear = Math.max(career.business.openedYear || state.year, state.year - 1);
      }
      if (career.role) {
        career.transitions.push({
          year: state.year, fromRole: career.role, fromWorkplace: career.workplace,
          toRole: profile.role, toWorkplace: profile.workplace,
        });
      }
      career.phase = 'post1949';
      career.active = true;
      career.retiredYear = null;
      career.routeKey = 'post:' + state.post1949Choice;
      career.kind = profile.kind;
      career.role = profile.role;
      career.workplace = profile.workplace;
      career.employer = profile.employer;
      career.supervisor = profile.supervisor;
      career.colleague = profile.colleague;
      career.publicPerson = profile.publicPerson;
      career.duties = profile.duties;
      career.terms = profile.terms;
      career.startedYear = state.post1949.employment.startedYear || state.year;
    }
    career.nextStep = state.post1949.employment.nextStep;
    installPost1949Contacts(state);
  }

  function currentCareerProfile(state) {
    if (state.post1949Choice && state.post1949 && state.post1949.employment && state.post1949.employment.role) {
      return post1949CareerProfile(state);
    }
    return C.routeCareerProfiles && C.routeCareerProfiles[state.routeKey];
  }

  function buildRoutineWorkText(state, profile) {
    var people = [profile.supervisor, profile.colleague, profile.publicPerson].filter(Boolean);
    var selector = stableIndex(state.seed + ':' + state.year + ':' + (state.routeKey || state.post1949Choice) + ':work', 3);
    if (profile.scenes && profile.scenes.length) return profile.scenes[selector % profile.scenes.length];
    if (selector === 0) {
      return profile.supervisor + '把当天的' + profile.role + '职责逐项交代给你。你完成了' + profile.duties + '，又与' + profile.colleague + '核对工时和遗漏；' + profile.terms + '，没有把口头答应当成已经到账。';
    }
    if (selector === 1) {
      return profile.publicPerson + '带来一项临时需要，与你原定的工作撞在一起。你先说明自己在' + profile.workplace + '负责什么，只接下能够按时完成的一部分；其余事情留下经手人和下一次答复时间。';
    }
    return '在' + profile.workplace + '，你与' + profile.colleague + '重新核对了' + profile.duties + '。一次差错在交付前被发现，返工占去半日；' + profile.supervisor + '确认了责任和结算，没有让问题消失在“照常做工”四个字里。';
  }

  function recordCareerWork(state, source, actionName) {
    var lived = ensureLivedLife(state);
    var profile = currentCareerProfile(state);
    if (!profile || !lived.career.role) return null;
    var text = buildRoutineWorkText(state, profile);
    var record = {
      year: state.year,
      source: source || 'routine-work',
      action: actionName || ('继续做' + profile.role),
      role: profile.role,
      workplace: profile.workplace,
      employer: profile.employer,
      people: [profile.supervisor, profile.colleague, profile.publicPerson].filter(Boolean),
      text: text,
      result: text.split('。').filter(Boolean).slice(-2).join('。') + '。',
    };
    lived.career.lastWork = record;
    lived.career.nextStep = state.post1949 && state.post1949.employment && state.post1949.employment.nextStep
      ? state.post1949.employment.nextStep
      : '下一年继续核对职责、报酬以及这次工作留下的人情或返工。';
    lived.career.history.push(record);
    if (lived.career.business && lived.career.phase === 'route' && lived.career.business.active !== false) {
      lived.career.business.ordersHandled += 1;
      lived.career.business.lastCustomer = profile.publicPerson;
      lived.career.business.lastProblem = text;
    }
    addLog(state, '【工作现场·' + profile.role + '】' + text, '', 'work');
    return '工作结果：' + text;
  }

  function spouseProfileFor(state) {
    var familyProfiles = C.spouseProfiles && C.spouseProfiles[state.familyKey];
    return familyProfiles && familyProfiles[state.identity.gender];
  }

  function applyRelationshipEntry(state, entry) {
    var lived = ensureLivedLife(state);
    var relationship = lived.relationship;
    if (entry === 'delayed' || entry === 'single-by-choice') {
      relationship.status = entry;
      relationship.lastInteraction = entry === 'delayed'
        ? '你把婚事延后，眼前先处理自己的住处和生计。'
        : '你明确不以婚姻组织生活，开始把支持关系放到朋友、亲族与个人储备上。';
      relationship.lastInteractionYear = state.year;
      relationship.history.push({ year: state.year, type: entry, text: relationship.lastInteraction });
      return;
    }
    var profile = spouseProfileFor(state);
    if (!profile) return;
    relationship.status = entry === 'partner-separate-homes' ? 'partnered-separate-homes' : 'married';
    relationship.startedYear = state.year;
    relationship.livingArrangement = entry === 'partner-separate-homes' ? '各自保留住处与收入，固定共同生活时间' : '共同生活，但各自工作与原生家庭责任分开协商';
    relationship.spouse = {
      name: profile.name,
      born: state.identity.born + Number(profile.bornOffset || 0),
      occupation: profile.occupation,
      values: profile.values,
      health: 68,
      relation: 56,
      status: 'alive',
      targetDeathAge: 72 + stableIndex(state.seed + ':spouse-life', 20),
      lastActivity: profile.occupation,
      lastWords: '“先把我们各自已经答应的事情写下来，再谈怎么一起过。”',
      deathYear: null,
    };
    relationship.lastInteraction = '你与' + profile.name + '谈清共同家用、各自收入和双方父母的责任，开始' + (relationship.status === 'married' ? '共同生活' : '一段保留各自住处的伴侣关系') + '。';
    relationship.lastInteractionYear = state.year;
    relationship.history.push({ year: state.year, type: relationship.status, text: relationship.lastInteraction });
    state.subjects.spouse.name = profile.name;
    state.subjects.spouse.occupation = profile.occupation;
    state.subjects.spouse.status = 'married-with-terms';
    state.subjects.spouse.health = relationship.spouse.health;
    addDetailedContact(state, {
      id: 'spouse_partner', label: profile.name, role: '配偶；' + profile.occupation,
      status: 'nearby', relation: 56, born: relationship.spouse.born, currentActivity: profile.occupation,
      lastWords: relationship.spouse.lastWords,
    });
  }

  function applyRelationshipResolution(state, resolution) {
    var relationship = ensureLivedLife(state).relationship;
    if (!relationship.spouse) return;
    var texts = {
      'reconcile-budget': '争吵后，你与' + relationship.spouse.name + '把共同家用、双方父母用钱和各自可支配收入重新分账。问题没有靠一句道歉消失，但以后谁能动哪笔钱已经写清。',
      'reconcile-labor': '争吵后，你与' + relationship.spouse.name + '把做饭、跑腿、照料和加班逐项排开。两人各自接下一部分，也承认有些日子仍会顾不过来。',
      separate: '你与' + relationship.spouse.name + '暂时分开居住，约定三个月后再谈共同家用和是否继续生活；关系没有被假装成已经结束，也没有被假装成已经和好。',
    };
    relationship.conflictCount += 1;
    relationship.status = resolution === 'separate' ? 'separated' : 'married';
    relationship.lastInteraction = texts[resolution];
    relationship.lastInteractionYear = state.year;
    relationship.spouse.relation = clamp(relationship.spouse.relation + (resolution === 'separate' ? -8 : 5), 0, 100);
    relationship.history.push({ year: state.year, type: resolution, text: texts[resolution] });
    var contact = state.contacts.spouse_partner;
    if (contact) {
      contact.status = resolution === 'separate' ? 'separated' : 'nearby';
      contact.relation = relationship.spouse.relation;
      contact.lastWords = resolution === 'separate' ? '“先分开住，不等于以后都不用再说清。”' : '“这次写下来了，往后谁累了也要重新谈。”';
    }
    addLog(state, '【婚姻关系】' + texts[resolution], resolution === 'separate' ? 'bad' : 'turn', 'relationship');
  }

  function resolvePost1949Relationship(state, option) {
    var relationship = ensureLivedLife(state).relationship;
    if (!relationship.spouse || relationship.spouse.status === 'dead') return;
    var reunionChoices = [
      'mainland-local-work', 'hongkong-share-rent', 'taiwan-household-first',
      'overseas-sponsored-room', 'motion-stay-season', 'unsettled-search-family',
    ];
    var canReunite = relationship.status !== 'separated' && has(reunionChoices, option.id);
    var place = state.post1949.place || (C.post1949Paths[state.post1949Choice] && C.post1949Paths[state.post1949Choice].place) || '新的落脚地';
    var text;
    if (canReunite) {
      relationship.status = 'married';
      relationship.livingArrangement = '在' + place + '重新共同生活，各自的工作、汇款与照料责任继续分开协商';
      relationship.spouse.place = place;
      text = relationship.spouse.name + '在住处和生计能够落地后与你会合。你们在' + place + '重新共同生活，但' + relationship.spouse.name + '仍保留自己的' + relationship.spouse.occupation + '与家人责任。';
    } else {
      relationship.status = 'living-apart';
      relationship.livingArrangement = '分别在两处生活，通过书信、转寄人与有限会面维持关系';
      relationship.spouse.place = '原有落脚处';
      text = '这次迁移没有自动带走' + relationship.spouse.name + '。' + relationship.spouse.name + '留在原有落脚处继续' + relationship.spouse.occupation + '，你们约定通过书信和可靠转寄人保持联系；是否以后会合仍是未决事项。';
    }
    relationship.lastInteraction = text;
    relationship.lastInteractionYear = state.year;
    relationship.history.push({ year: state.year, type: canReunite ? 'postwar-reunion' : 'postwar-living-apart', text: text });
    if (state.contacts.spouse_partner) {
      state.contacts.spouse_partner.status = canReunite ? 'nearby' : 'distant';
      state.contacts.spouse_partner.currentActivity = relationship.spouse.occupation + '；' + (canReunite ? '在同一住处继续自己的工作' : '在原有落脚处独立生活');
      state.contacts.spouse_partner.lastWords = canReunite ? '“既然住到一起，就把两个人的工作都排进日常。”' : '“先把每封信能转到哪里写清，我们都不能只靠等。”';
      state.contacts.spouse_partner.lastUpdateYear = state.year;
    }
    if (state.post1949) {
      state.post1949.companions = (state.post1949.companions ? state.post1949.companions + '；' : '') + text;
    }
    addFact(state, { id: 'post1949-spouse-arrangement', kind: 'subject', text: state.year + ' 年，' + text, source: 'family-lifecycle', ending: true });
    addLog(state, '【迁移后的婚姻】' + text, 'turn', 'relationship');
  }

  function applyFamilyFuture(state, optionId) {
    var lived = ensureLivedLife(state);
    if (optionId === 'raise-child-together' && !lived.children.length) {
      var names = (C.childNames && C.childNames[state.familyKey]) || ['孩子'];
      lived.children.push({
        name: names[stableIndex(state.seed + ':child-name', names.length)],
        born: state.year + 1,
        status: '等待出生',
        occupation: null,
        relation: 50,
        lastUpdate: '配偶和你正在商量生产、住处、工作与谁能提供照料。',
        history: [{ year: state.year, text: '决定共同承担一个孩子的抚养，但没有预设孩子以后必须怎样生活。' }],
      });
    }
  }

  function familyMemberForAction(state) {
    var lived = ensureLivedLife(state);
    var candidates = Object.keys(lived.parents).map(function (key) { return lived.parents[key]; }).filter(function (parent) { return !/^dead/.test(parent.status); });
    if (lived.relationship.spouse && lived.relationship.spouse.status !== 'dead') candidates.push(lived.relationship.spouse);
    lived.children.forEach(function (child) { if (child.status !== '等待出生') candidates.push(child); });
    return candidates.length ? candidates[stableIndex(state.seed + ':' + state.year + ':family-action', candidates.length)] : null;
  }

  function resolveFamilyAction(state) {
    var member = familyMemberForAction(state);
    if (!member) return '家人近况：当年没有仍能当面交谈的家人，你把时间用来核对最后地址与旧信。';
    var parent = Object.keys(ensureLivedLife(state).parents).map(function (key) { return state.lived.parents[key]; }).find(function (item) { return item === member; });
    var text;
    if (parent) {
      text = '你坐下来听' + parent.name + '说完这一年的事。' + parent.name + '仍在' + parent.occupation + '，最近' + parent.lastActivity + '。' + parent.lastWords + '你没有立刻替对方作决定，只把能够承担的一件事和下次再谈的时间说清。';
      parent.history.push({ year: state.year, type: 'conversation', text: text });
    } else if (ensureLivedLife(state).relationship.spouse === member) {
      text = resolveSpouseAction(state).replace(/^关系结果：/, '');
    } else {
      text = '你听' + member.name + '讲完最近的学习、做工和住处安排。' + member.lastUpdate + '你能提供一部分帮助，却没有替对方决定下一步。';
      member.history.push({ year: state.year, text: text });
    }
    addLog(state, '【家人谈话】' + text, 'turn', 'family');
    return '家人近况：' + text;
  }

  function resolveSpouseAction(state) {
    var relationship = ensureLivedLife(state).relationship;
    if (!relationship.spouse || relationship.spouse.status === 'dead') return '关系结果：当前没有可以进行这次谈话的配偶。';
    var issues = [
      '给双方父母的钱应从共同家用还是个人收入里出',
      '谁在工作最忙的几天负责做饭、取药和跑腿',
      '是否为了一份工作搬家，以及另一人的工作怎么办',
      '孩子或晚辈的学费能承担到什么程度',
    ];
    var issue = issues[stableIndex(state.seed + ':' + state.year + ':spouse-issue', issues.length)];
    var opening = has(['separated', 'separated-by-war', 'living-apart'], relationship.status)
      ? '借一封终于送到的信或一次短暂见面，你与'
      : '晚饭后，你与';
    var text = opening + relationship.spouse.name + '谈到' + issue + '。' + relationship.spouse.name + '先说：“' + relationship.spouse.values + '。”你们各自说出不能放下的一项责任，最后只定下未来三个月的办法；仍有分歧的部分被明确留下。';
    relationship.lastInteraction = text;
    relationship.lastInteractionYear = state.year;
    relationship.history.push({ year: state.year, type: 'conversation', text: text });
    relationship.spouse.relation = clamp(relationship.spouse.relation + 2, 0, 100);
    if (state.contacts.spouse_partner) {
      state.contacts.spouse_partner.relation = relationship.spouse.relation;
      state.contacts.spouse_partner.lastWords = '“先按三个月做，到时再看谁真的承担了什么。”';
      state.contacts.spouse_partner.lastUpdateYear = state.year;
    }
    addLog(state, '【伴侣谈话】' + text, 'turn', 'relationship');
    return '关系结果：' + text;
  }

  function livingFriends(state) {
    return Object.keys(state.contacts || {}).map(function (key) {
      var value = state.contacts[key];
      return { key: key, value: value };
    }).filter(function (entry) {
      return entry.key !== 'spouse_partner' && entry.value.status !== 'deceased';
    }).sort(function (left, right) { return Number(right.value.relation || 0) - Number(left.value.relation || 0); });
  }

  function resolveFriendAction(state) {
    var friends = livingFriends(state);
    if (!friends.length) return '朋友近况：这一年没有找到能够见面或通信的朋友。';
    var picked = friends[stableIndex(state.seed + ':' + state.year + ':friend-action', Math.min(friends.length, 5))];
    var friend = picked.value;
    var text = '你去见了' + friend.label + '。' + friend.label + '没有只来问你的事，而是先讲自己最近仍在' + (friend.currentActivity || friend.role) + '；临走前说：“我能帮你问一次消息，但我也得先顾住自己的工作和家里。”你们约定了下一次联系办法。';
    friend.relation = clamp(Number(friend.relation || 0) + 3, 0, 100);
    friend.lastWords = '“我能帮你问一次消息，但我也得先顾住自己的工作和家里。”';
    friend.lastUpdateYear = state.year;
    if (!Array.isArray(friend.history)) friend.history = [];
    friend.history.push({ year: state.year, text: text });
    ensureLivedLife(state).social.lastUpdate = text;
    ensureLivedLife(state).social.history.push({ year: state.year, contactKey: picked.key, text: text });
    addLog(state, '【朋友见面】' + text, 'turn', 'social');
    return '朋友近况：' + text;
  }

  function resolveHealthAction(state) {
    var health = ensureLivedLife(state).health;
    var condition = health.current && health.current.status !== 'treated' && health.current.condition;
    var text;
    if (condition) {
      health.current.status = 'treated';
      health.current.result = '说明了症状和持续时间，接受了能负担的处置，并减少最容易诱发不适的工作。';
      text = '你为“' + condition + '”找到能够接触到的医生或药铺，逐项说明何时发作、是否影响睡眠和还能否做工。对方没有保证立刻治好，只给出用药、休息和必须复诊的条件；你付了费用，也把最伤身体的一段工作停下来。';
    } else {
      text = '你没有把“最近总是不舒服”当成一句带过的话，而是说明睡眠、食欲、疼痛和工时。没有发现必须立即停工的急症，但得到一份何时需要再去求医的明确提醒。';
    }
    health.treatedCount += 1;
    health.history.push({ year: state.year, type: condition ? 'treatment' : 'check-up', condition: condition || null, severity: 'treated', text: text });
    addLog(state, '【求医与休养】' + text, 'good', 'health');
    return '身体结果：' + text;
  }

  function decorateLifeAction(state, action) {
    var result = employmentActionForState(state, clone(action));
    var lived = ensureLivedLife(state);
    if (action.careerAction && lived.career.role) {
      result.name = action.name + ' · ' + lived.career.role;
      result.note = '地点：' + lived.career.workplace + '；往来对象：' + [lived.career.supervisor, lived.career.colleague, lived.career.publicPerson].filter(Boolean).join('、') + '。本年会留下具体工作结果。';
    } else if (action.lifeAction === 'health') {
      result.name = lived.health.current ? '为「' + lived.health.current.condition + '」求医并安排休养' : '把最近的身体不适看明白';
    } else if (action.lifeAction === 'family') {
      var member = familyMemberForAction(state);
      result.name = member ? '坐下来听' + member.name + '把近况说完' : action.name;
    } else if (action.lifeAction === 'spouse' && lived.relationship.spouse) {
      result.name = '与' + lived.relationship.spouse.name + '谈清最近的一次分歧';
    } else if (action.lifeAction === 'friend') {
      var friends = livingFriends(state);
      if (friends.length) result.name = '去见' + friends[0].value.label + '并听近况';
    }
    return result;
  }

  function resolveLifeAction(state, action, presentedAction) {
    if (action.careerAction) return recordCareerWork(state, action.id, presentedAction.name);
    if (action.lifeAction === 'health') return resolveHealthAction(state);
    if (action.lifeAction === 'family') return resolveFamilyAction(state);
    if (action.lifeAction === 'spouse') return resolveSpouseAction(state);
    if (action.lifeAction === 'friend') return resolveFriendAction(state);
    return null;
  }

  function parentIsSeparated(state) {
    return state.routeKey === 'subei-soldier' || state.routeKey === 'subei-refugee' || state.routeKey === 'shen-refugee'
      || (state.post1949Choice && state.post1949Choice !== 'mainland');
  }

  function markParentDeath(state, key, parent) {
    if (parent.deathYear) return;
    var subject = state.subjects[key];
    var delayed = parentIsSeparated(state) || (subject && subject.status === 'dead-unconfirmed');
    parent.deathYear = state.year;
    parent.confirmationYear = state.year + (delayed ? 1 + stableIndex(state.seed + ':' + key + ':confirm', 2) : 0);
    if (state.familyKey === 'subeipoor' && key === 'mother' && state.year <= 1932) parent.confirmationYear = 1933;
    parent.status = delayed ? 'dead-unconfirmed' : 'dead-confirmed';
    parent.health = 0;
    if (subject) {
      subject.health = 0;
      subject.status = parent.status;
    }
    var text = parent.name + '在 ' + state.year + ' 年去世。去世前仍在' + parent.occupation + '，最后一次留下的话是' + parent.lastWords + (delayed ? '；消息当时尚未完成交叉确认。' : '；死亡由身边家人与邻人当年确认。');
    parent.history.push({ year: state.year, type: 'death', text: text });
    addFact(state, { id: 'parent-death:' + key, kind: 'subject', text: text, source: 'family-lifecycle', ending: true });
    addLog(state, '【家人死亡】' + text, 'bad', 'family');
  }

  function processParentLifecycle(state) {
    var profiles = (C.parentProfiles && C.parentProfiles[state.familyKey]) || {};
    var parents = ensureLivedLife(state).parents;
    Object.keys(parents).forEach(function (key) {
      var parent = parents[key];
      var profile = profiles[key];
      var subject = state.subjects[key];
      if (subjectIsDead(subject) && !parent.deathYear) markParentDeath(state, key, parent);
      if (!parent.deathYear && state.year >= parent.targetDeathYear) markParentDeath(state, key, parent);
      if (parent.deathYear) {
        if (state.year >= parent.confirmationYear && parent.status === 'dead-unconfirmed') {
          parent.status = 'dead-confirmed';
          if (subject) subject.status = 'dead-confirmed';
          addFact(state, { id: 'parent-death-confirmed:' + key, kind: 'subject', text: parent.name + '的死亡在 ' + state.year + ' 年经亲友、住处或转寄消息完成确认。', source: 'family-lifecycle', ending: true });
        } else if (subject && subject.status === 'dead-confirmed') {
          parent.status = 'dead-confirmed';
        }
        return;
      }
      var activityIndex = stableIndex(state.seed + ':' + state.year + ':' + key + ':activity', profile.activities.length);
      var wordIndex = stableIndex(state.seed + ':' + state.year + ':' + key + ':words', profile.words.length);
      parent.lastActivity = profile.activities[activityIndex];
      parent.lastWords = profile.words[wordIndex];
      parent.lastUpdateYear = state.year;
      parent.status = subject ? subject.status : parent.status;
      parent.health = subject && subject.health != null ? subject.health : parent.health;
      if ((state.year - state.identity.born) % 4 === (key === 'mother' ? 1 : 3)) {
        parent.history.push({ year: state.year, type: 'life', text: parent.name + '这一年' + parent.lastActivity + '，并对你说：' + parent.lastWords });
      }
    });
  }

  function processRelationshipLifecycle(state) {
    var relationship = ensureLivedLife(state).relationship;
    var spouse = relationship.spouse;
    if (!spouse || spouse.status === 'dead') return;
    var subjectStatus = state.subjects.spouse && state.subjects.spouse.status;
    var migrationResolved = state.facts.some(function (fact) { return fact.id === 'post1949-spouse-arrangement'; });
    if (has(['running-household', 'working-independently', 'returned-to-own-kin'], subjectStatus) && relationship.status !== 'separated-by-war' && !migrationResolved) {
      relationship.status = 'separated-by-war';
      relationship.livingArrangement = '因战争与迁徙分别安身，通过能够抵达的口信保留联系';
      relationship.lastInteraction = spouse.name + '没有留在原地等待，而是继续' + spouse.occupation + '并按自己的家口条件安身；你们只能通过断续口信协商关系。';
      relationship.lastInteractionYear = state.year;
      relationship.history.push({ year: state.year, type: 'war-separation', text: relationship.lastInteraction });
      if (state.contacts.spouse_partner) state.contacts.spouse_partner.status = 'distant';
    }
    var spouseAge = state.year - spouse.born;
    if (spouseAge >= spouse.targetDeathAge) {
      spouse.status = 'dead';
      spouse.deathYear = state.year;
      relationship.status = 'widowed';
      relationship.lastInteraction = spouse.name + '在 ' + state.year + ' 年去世。去世前仍在' + spouse.occupation + '，你们最后谈的是各自已经答应却还没做完的事情。';
      relationship.lastInteractionYear = state.year;
      relationship.history.push({ year: state.year, type: 'spouse-death', text: relationship.lastInteraction });
      state.subjects.spouse.status = parentIsSeparated(state) ? 'dead-unconfirmed' : 'dead-confirmed';
      if (state.contacts.spouse_partner) state.contacts.spouse_partner.status = 'deceased';
      addFact(state, { id: 'spouse-death', kind: 'subject', text: relationship.lastInteraction, source: 'family-lifecycle', ending: true });
      addLog(state, '【配偶死亡】' + relationship.lastInteraction, 'bad', 'relationship');
      return;
    }
    spouse.lastActivity = spouse.occupation + '；这一年也在处理自己家人的住处和身体问题';
    if ((state.year - relationship.startedYear) > 0 && (state.year - relationship.startedYear) % 4 === 0) {
      var text = resolveSpouseAction(state).replace(/^关系结果：/, '');
      relationship.lastInteraction = text;
    }
  }

  function processChildrenLifecycle(state) {
    var children = ensureLivedLife(state).children;
    children.forEach(function (child) {
      var age = state.year - child.born;
      var text = null;
      if (age < 0) return;
      if (age === 0 && child.status === '等待出生') {
        child.status = '幼年在家';
        text = child.name + '出生。生产、照料和你的工作时间由配偶、亲友与能够支付的帮助共同接住，没有默认由一个人承担。';
      } else if (age === 6) {
        child.status = '开始识字与跑腿';
        text = child.name + '到了开始识字的年纪。你说明家里能承担的学费和时间，孩子也说出自己更想学什么。';
      } else if (age === 15) {
        child.status = '学习或学徒中';
        text = child.name + '开始在继续读书和学一门活计之间作自己的选择；你能提供条件，不能替孩子决定。';
      } else if (age === 20) {
        child.status = '成年并有自己的营生';
        child.occupation = state.familyKey === 'subeipoor' ? '在当地做手艺和短工' : (state.familyKey === 'jiangnanshen' ? '教书或在书局做事' : '在商号或工作室领薪');
        text = child.name + '成年后开始' + child.occupation + '，收入、住处和是否迁居都单独记账，没有成为你的养老数值。';
      } else if (age > 20 && age % 7 === 0) {
        text = child.name + '带着自己的工作和家口近况来信，接受了你能提供的一部分帮助，也拒绝了不适合自己的安排。';
      }
      if (text) {
        child.lastUpdate = text;
        child.history.push({ year: state.year, text: text });
        addFact(state, { id: 'child:' + child.name + ':' + state.year, kind: 'subject', text: text, source: 'family-lifecycle' });
        addLog(state, '【孩子近况】' + text, 'turn', 'family');
      }
    });
  }

  function processContactLifecycle(state) {
    var lived = ensureLivedLife(state);
    Object.keys(state.contacts || {}).forEach(function (key) {
      if (key === 'spouse_partner') return;
      var contact = state.contacts[key];
      if (!Array.isArray(contact.history)) contact.history = [];
      var born = Number(contact.born || state.identity.born - 5);
      var targetAge = Number(contact.targetDeathAge || 68 + stableIndex(state.seed + ':' + key + ':contact-death', 20));
      if (contact.status !== 'deceased' && state.year - born >= targetAge) {
        contact.status = 'deceased';
        contact.lastWords = contact.lastWords || '最后一次谈话没有预告这会成为最后一次。';
        var deathText = contact.label + '在 ' + state.year + ' 年去世；此前最后已知身份是' + contact.role + '。你们最后留下的话是：' + contact.lastWords;
        contact.history.push({ year: state.year, type: 'death', text: deathText });
        addFact(state, { id: 'contact-death:' + key, kind: 'subject', text: deathText, source: 'social-lifecycle' });
        return;
      }
      if (contact.status !== 'deceased' && state.age >= 12 && stableIndex(state.seed + ':' + state.year + ':' + key + ':contact-update', 7) === 0) {
        contact.currentActivity = contact.role + '；同时要处理自己的工作、家人和住处';
        contact.lastWords = '“我记得我们以前一起做过的事，但我现在也有自己的难处。”';
        contact.lastUpdateYear = state.year;
        var text = contact.label + '告诉你，自己最近仍在' + contact.currentActivity + '。关系没有消失，也不能假定对方永远在原地等你。';
        contact.history.push({ year: state.year, type: 'update', text: text });
        lived.social.lastUpdate = text;
        lived.social.history.push({ year: state.year, contactKey: key, text: text });
      }
    });
  }

  function processHealthLifecycle(state) {
    var health = ensureLivedLife(state).health;
    if (health.current && has(['treated', 'managed'], health.current.status) && state.year - health.current.year >= 2) {
      health.current = null;
    }
    if (health.current && health.current.status === 'active' && state.year - health.current.year >= 2) {
      health.current.status = 'managed';
      health.current.result = '症状没有完全消失，但通过休息、调整工作或有限治疗，已经不再持续影响每天。';
    }
    var triggerAges = [7, 27, 46, 58, 68, 78, 86];
    var lastYear = health.lastEpisode && health.lastEpisode.year;
    var shouldTrigger = has(triggerAges, state.age) || (state.res.health < 40 && (!lastYear || state.year - lastYear >= 6));
    if (!shouldTrigger) return;
    var profiles = (C.healthProfiles && C.healthProfiles[state.routeKey]) || ['风寒发热', '劳累后的疼痛', '反复的肠胃不适'];
    var career = ensureLivedLife(state).career;
    var employment = state.post1949 && state.post1949.employment;
    if (career.retiredYear) {
      profiles = ['旧劳损引起的腰腿疼痛', '夜间反复失眠', '消化不适'];
    } else if (career.phase === 'post1949' && employment && employment.track) {
      var postwarHealth = {
        manual: ['搬运后的腰背疼痛', '长期站立造成的腿痛', '饮食不定时引起的胃痛'],
        skilled: ['机器噪声后的耳鸣', '反复检修造成的肩背疼痛', '工场粉尘引起的咳嗽'],
        literate: ['伏案后的眼痛', '赶写记录造成的头痛', '久坐与欠眠造成的胸闷'],
        care: ['夜班后的过劳', '长期站立造成的腰痛', '接触病患后的发热'],
      };
      profiles = postwarHealth[employment.track] || profiles;
    }
    var condition = profiles[stableIndex(state.seed + ':' + state.year + ':condition', profiles.length)];
    var severity = state.age >= 63 || state.res.health < 40 ? '反复发作' : (state.age >= 40 ? '需要停工数日' : '短期发作');
    var text = state.year + ' 年，你出现了' + condition + '。症状持续到影响睡眠、吃饭或做工，你才把发作时间、此前工时和能否负担药费说清；这次被记为“' + severity + '”，而不是笼统扣掉健康数值。';
    var episode = { year: state.year, type: 'episode', condition: condition, severity: severity, status: 'active', text: text, result: '尚需观察与处理。' };
    health.current = episode;
    health.lastEpisode = episode;
    health.history.push(episode);
    applyDelta(state, { health: state.age >= 63 ? -3 : -2, mind: -1 });
    addFact(state, { id: 'health-episode:' + state.year, kind: 'health', text: text, source: 'health-lifecycle', ending: state.age >= 46 });
    addLog(state, '【身体发作】' + text, 'bad', 'health');
  }

  function processRetirementLifecycle(state) {
    var career = ensureLivedLife(state).career;
    if (!career.active || state.age < 68) return;
    career.active = false;
    career.retiredYear = state.year;
    career.nextStep = '不再把往后每一年写成照常上工；日常改由既有储备、家庭协商、邻里互助与能够承担的零散帮忙接住。';
    var employment = state.post1949 && state.post1949.employment;
    if (employment && employment.role) {
      employment.status = 'retired';
      employment.lastResultYear = state.year;
      employment.lastResult = state.year + ' 年，你与' + career.workplace + '核对最后一段工钱和交接，停止固定担任' + career.role + '。';
      employment.nextStep = career.nextStep;
      employment.history.push({
        year: state.year, source: 'retirement-lifecycle', status: 'retired', role: employment.role,
        workplace: employment.workplace, result: employment.lastResult, nextStep: employment.nextStep,
      });
      state.post1949.livelihood = '已经停止固定工作：' + employment.role + '（' + employment.workplace + '）。' + employment.lastResult;
    }
    var text = state.year + ' 年，你在' + career.workplace + '交清最后一段职责、工钱和需要转给后来人的记录，停止固定担任' + career.role + '；此后仍可偶尔帮忙，但不再被写成每天照常上工。';
    addFact(state, { id: 'career-retired', kind: 'livelihood', text: text, source: 'career-lifecycle', ending: true });
    addLog(state, '【停止固定工作】' + text, 'turn', 'livelihood');
  }

  function processFamilyYearSummary(state) {
    var lived = ensureLivedLife(state);
    var parentDeath = Object.keys(lived.parents).map(function (key) { return lived.parents[key]; }).find(function (parent) { return parent.deathYear === state.year; });
    if (parentDeath) return parentDeath.name + '在这一年去世。最后一次留下的话是' + parentDeath.lastWords + (parentDeath.confirmationYear > state.year ? '消息还需要继续核对。' : '死亡在当年得到确认。');
    var livingParents = Object.keys(lived.parents).map(function (key) { return lived.parents[key]; }).filter(function (parent) { return !parent.deathYear; });
    if (livingParents.length) {
      var parent = livingParents[stableIndex(state.seed + ':' + state.year + ':parent-summary', livingParents.length)];
      return parent.name + '这一年' + parent.lastActivity + '。' + parent.lastWords;
    }
    if (lived.relationship.spouse && lived.relationship.spouse.status !== 'dead') return lived.relationship.lastInteraction;
    if (lived.children.length) return lived.children[0].lastUpdate;
    return '这一年没有新的家人消息；旧地址和已经确认的死亡仍分别保留。';
  }

  function composeInnerThought(state, record) {
    var thoughts = [];
    if (record.decision) thoughts.push('我已经作了选择，但选择只解决了眼前一步；真正的后果要看明年钱、身体和身边的人怎样接住。');
    if (record.health) thoughts.push('我最担心的不是“健康少了几点”，而是这次不舒服会不会让我做不了眼前的工作，又由谁来接住药钱和日常。');
    if (record.relationship && /争|分开|谈不拢/.test(record.relationship)) thoughts.push('我知道一起生活不等于对方必须认同我；有些话今天说开了，有些账还要看以后谁真正承担。');
    if (/去世|死亡/.test(record.family || '')) thoughts.push('我反复想起最后一次说过的话，也知道自己记得的和后来确认的消息并不完全一样。');
    if (record.work) thoughts.push('我这一年确实在' + record.work.workplace + '做' + record.work.role + '。我在意的不只是有没有收入，也在意' + record.work.people.slice(0, 2).join('和') + '会怎样记住这次处理。');
    if (!thoughts.length && record.social) thoughts.push('我不是只认识名单上的两个人。朋友们各自忙着工作和家口，愿意回一次信、见一面，本身就是关系仍在发生。');
    if (!thoughts.length) thoughts.push('这一年没有戏剧性结论，但我清楚钱花在了哪里、和谁说过什么，也知道有一件事必须留到明年继续。');
    return thoughts.slice(0, 2).join('');
  }

  function processLivedLife(state) {
    var lived = ensureLivedLife(state);
    processParentLifecycle(state);
    processRelationshipLifecycle(state);
    processChildrenLifecycle(state);
    processContactLifecycle(state);
    processHealthLifecycle(state);
    if (state.routeKey && !lived.career.role) enterRouteCareer(state, state.routeKey);
    if (state.post1949Choice && state.post1949 && state.post1949.employment && state.post1949.employment.role) syncCareerFromEmployment(state);
    processRetirementLifecycle(state);
    if (lived.career.active && lived.career.role && (!lived.career.lastWork || lived.career.lastWork.year !== state.year)) {
      recordCareerWork(state, 'routine-work', '完成本年日常职责');
    }
    var friends = livingFriends(state);
    var socialText = lived.social.lastUpdate;
    if ((!socialText || !lived.social.history.length || lived.social.history[lived.social.history.length - 1].year !== state.year) && friends.length) {
      var friend = friends[stableIndex(state.seed + ':' + state.year + ':social-summary', Math.min(friends.length, 6))].value;
      socialText = friend.label + '最近仍是' + friend.role + '，最后已知状态为“' + ((C.contactStatusLabels && C.contactStatusLabels[friend.status]) || friend.status) + '”；你们的关系为 ' + Math.round(friend.relation || 0) + '。';
    }
    var record = {
      year: state.year,
      location: state.post1949 && state.post1949.place ? state.post1949.place : state.identity.place,
      work: lived.career.lastWork && lived.career.lastWork.year === state.year ? clone(lived.career.lastWork) : null,
      family: processFamilyYearSummary(state),
      relationship: lived.relationship.lastInteractionYear === state.year ? lived.relationship.lastInteraction : null,
      health: lived.health.lastEpisode && lived.health.lastEpisode.year === state.year ? lived.health.lastEpisode.text : null,
      social: socialText,
      thought: null,
      decision: null,
    };
    record.thought = composeInnerThought(state, record);
    lived.inner.current = record.thought;
    lived.inner.history.push({ year: state.year, text: record.thought });
    lived.lastYear = record;
    lived.yearHistory.push(record);
    if (state.lastOrdinaryEvent) state.lastOrdinaryEvent.lived = clone(record);
    addLog(state, '【这一年心里在想】' + record.thought, 'thought', 'inner');
  }

  function attachDecisionToLivedYear(state, decision, option) {
    var lived = ensureLivedLife(state);
    if (!lived.lastYear || lived.lastYear.year !== state.year) return;
    lived.lastYear.decision = '面对“' + decision.title + '”，你选择：' + option.label + '。' + (option.fact || '');
    lived.lastYear.thought = composeInnerThought(state, lived.lastYear);
    lived.inner.current = lived.lastYear.thought;
    if (lived.inner.history.length && lived.inner.history[lived.inner.history.length - 1].year === state.year) {
      lived.inner.history[lived.inner.history.length - 1].text = lived.lastYear.thought;
    }
  }

  function buildLifePortrait(state) {
    var lived = ensureLivedLife(state);
    var publicLife = ensurePublicLife(state);
    var parentText = Object.keys(lived.parents).map(function (key) {
      var parent = lived.parents[key];
      return parent.name + '（' + parent.occupation + '）' + (parent.deathYear ? '于 ' + parent.deathYear + ' 年去世，' + (parent.status === 'dead-confirmed' ? '死亡已确认' : '确认仍不完整') : '最后记录仍在世') + '；最后留下的话是' + parent.lastWords;
    }).join(' ');
    var relationshipText = lived.relationship.spouse
      ? '与' + lived.relationship.spouse.name + '（' + lived.relationship.spouse.occupation + '）从 ' + lived.relationship.startedYear + ' 年开始共同安排生活。关系经历过 ' + lived.relationship.conflictCount + ' 次被明确记录的争执；最后状态为“' + ((C.relationshipStatusLabels && C.relationshipStatusLabels[lived.relationship.status]) || lived.relationship.status) + '”。' + lived.relationship.lastInteraction
      : (lived.relationship.status === 'single-by-choice' ? '明确选择独身，并把长期支持放在朋友、亲族和个人储备上。' : '没有形成被记录的婚姻或伴侣关系。');
    var childText = lived.children.length
      ? lived.children.map(function (child) { return child.name + '：' + child.status + (child.occupation ? '，后来' + child.occupation : '') + '。'; }).join('')
      : '没有子女；这不被写成人生缺失。';
    var friends = Object.keys(state.contacts || {}).map(function (key) { return state.contacts[key]; }).filter(function (contact) { return contact.label && contact.label !== (lived.relationship.spouse && lived.relationship.spouse.name); }).sort(function (a, b) { return Number(b.relation || 0) - Number(a.relation || 0); });
    var friendText = friends.slice(0, 6).map(function (contact) {
      return contact.label + '（' + contact.role + '，' + ((C.contactStatusLabels && C.contactStatusLabels[contact.status]) || contact.status) + '）';
    }).join('、') + (friends.length > 6 ? '等 ' + friends.length + ' 位有名有姓的人' : '');
    var careerText = lived.career.history.length
      ? '最后一份明确职业是在' + lived.career.workplace + '担任' + lived.career.role + '，往来对象包括' + [lived.career.supervisor, lived.career.colleague, lived.career.publicPerson].filter(Boolean).join('、') + '。一生留下 ' + lived.career.history.length + ' 条具体工作记录。'
      : '没有留下可以确认的具体职业记录。';
    if (lived.career.retiredYear) careerText += lived.career.retiredYear + ' 年完成最后一段工钱与交接，此后停止固定工作。';
    if (lived.career.business) careerText += '从 ' + lived.career.business.openedYear + ' 年到 ' + (lived.career.business.lastActiveYear || '仍在经营') + ' 经营过“' + lived.career.business.name + '”，记录了 ' + lived.career.business.ordersHandled + ' 次订单、客户或经营问题；最近一次客户为' + lived.career.business.lastCustomer + '。';
    var illnessEntries = lived.health.history.filter(function (item) { return item.type === 'episode' || (item.condition && item.type !== 'treatment'); });
    var healthText = illnessEntries.length
      ? '明确记录过 ' + illnessEntries.length + ' 次身体发作，包括' + illnessEntries.slice(-6).map(function (item) { return item.condition + '（' + item.year + '）'; }).join('、') + '；另有 ' + lived.health.treatedCount + ' 次主动求医或检查。'
      : '没有留下具体疾病记录。';
    var thoughtText = lived.inner.history.length ? lived.inner.history[lived.inner.history.length - 1].text : lived.inner.current;
    var publicStatus = (C.publicStatusLabels && C.publicStatusLabels[publicLife.status]) || publicLife.status;
    var organizationText = publicLife.organizationKey
      ? publicOrganizationName(publicLife.organizationKey)
      : (publicLife.pendingOrganizationKey ? '曾申请' + publicOrganizationName(publicLife.pendingOrganizationKey) + '，但没有把申请写成正式身份' : '没有加入政治组织');
    var publicText = publicLife.history.length
      ? publicStatus + '；组织关系为“' + organizationText + '”；实际承担的事务是“' + publicLife.publicRole + '”；身份公开程度为“' + ((C.publicSecrecyLabels && C.publicSecrecyLabels[publicLife.secrecy]) || publicLife.secrecy) + '”；' + ((C.familyKnowledgeLabels && C.familyKnowledgeLabels[publicLife.familyKnowledge]) || publicLife.familyKnowledge) + '。一生留下 ' + publicLife.history.length + ' 条公共生活事实记录。'
      : '没有参加政治组织或被记录的公共活动；保持距离没有被写成失败。';
    if (publicLife.coercion > 0) publicText += '曾经历拘留或问话压力；结局只回收当时实际说过什么及后来能够确认的后果。';
    return {
      career: careerText,
      parents: parentText,
      relationship: relationshipText,
      children: childText,
      friends: friendText || '没有留下能够确认姓名的朋友记录。',
      health: healthText,
      inner: thoughtText,
      publicLife: publicText,
    };
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
    syncCareerFromEmployment(state);
    syncPost1949CanonicalLife(state);
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
    var designFamilyKey = canonicalFamilyKey(options.familyKey);
    var state = {
      version: C.version,
      schemaVersion: SAVE_SCHEMA_VERSION,
      canonicalFamilyKey: designFamilyKey,
      identity: {
        id: options.familyKey + '-' + seed,
        name: name,
        gender: gender,
        familyKey: options.familyKey,
        canonicalFamilyKey: designFamilyKey,
        familyName: family.name,
        born: family.born,
        place: family.place,
      },
      familyKey: options.familyKey,
      routeKey: null,
      routeDomainKey: null,
      routeLabel: null,
      routeHistory: [],
      domainHistory: [],
      careerHistory: [],
      economicLife: emptyEconomicLife(),
      genderContext: {
        recordedGender: gender,
        rule: '性别影响可见机会、身体经历、婚家压力和制度约束，但不把人生领域硬分成男女专属。',
        history: [],
      },
      bodyLife: {
        recordedGender: gender,
        injuries: [],
        chronicConditions: [],
        reproductiveHistory: [],
        bodilyAutonomyHistory: [],
      },
      migrationHistory: [],
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
      publicLife: {
        status: 'unaffiliated', organizationKey: null, organizationName: '没有加入政治组织',
        pendingOrganizationKey: null, publicRole: '尚未形成公共事务角色', secrecy: 'open',
        trust: 0, exposure: 0, coercion: 0, familyKnowledge: 'none', coverRole: null,
        contactKey: null, lastUpdate: '尚未参加政治组织或公共活动；保持距离也是有效人生。', history: [],
      },
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
    ensureLivedLife(state);
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
    if (state.year >= 1950 && action.careerAction && !action.post1949Choices) return { ok: false, hidden: true, reason: '原有路线工作已经结束，请使用当前落脚地的具体谋生行动。' };
    if (action.livelihoodAction && ensureEmployment(state).status === 'retired') return { ok: false, hidden: true, reason: '已经停止固定工作，晚年日常改由储备、关系与照料安排接住。' };
    if (action.minYear != null && state.year < action.minYear) return { ok: false, hidden: true, reason: '需到 ' + action.minYear + ' 年后才出现；当前为 ' + state.year + ' 年。' };
    if (action.maxYear != null && state.year > action.maxYear) return { ok: false, hidden: true, reason: '只在 ' + action.maxYear + ' 年以前适用。' };
    if (action.minAge != null && state.age < action.minAge) return { ok: false, reason: '需要年满 ' + action.minAge + ' 岁；当前 ' + state.age + ' 岁。' };
    if (action.maxAge != null && state.age > action.maxAge) return { ok: false, reason: '只适用于 ' + action.maxAge + ' 岁以前；当前 ' + state.age + ' 岁。' };
    if (action.id === 'care-mother' && subjectIsDead(state.subjects.mother)) return { ok: false, reason: '母亲已经去世' };
    if (action.requiresSpouse) {
      var relationship = ensureLivedLife(state).relationship;
      if (!relationship.spouse || relationship.spouse.status === 'dead') return { ok: false, reason: '当前没有能够进行这次谈话的配偶。' };
    }
    var publicResult = publicConditionResult(state, action);
    if (!publicResult.ok) return publicResult;
    return gateResult(state, action.gate);
  }

  function availableActions(state, options) {
    options = options || {};
    return C.actions.map(function (action) {
      var availability = actionAvailability(state, action);
      var result = decorateLifeAction(state, action);
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
      var presentedAction = decorateLifeAction(state, action);
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
      if (times === 0) {
        var lifeOutcome = resolveLifeAction(state, action, presentedAction);
        if (lifeOutcome) outcomes.push(lifeOutcome);
        var publicOutcome = applyPublicEffect(state, action.publicEffect, 'action:' + action.id);
        if (publicOutcome) outcomes.push(publicOutcome);
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
    if (!publicConditionResult(state, item).ok) return false;
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
    var publicResult = publicConditionResult(state, option);
    if (!publicResult.ok) return publicResult;
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

  function familyDecisionKey(state, kind) {
    var config = C.familyDecisionKeys && C.familyDecisionKeys[state.familyKey];
    if (config && config[kind]) return config[kind];
    if (kind === 'war') return state.familyKey === 'subeipoor' ? 'subei-war' : (state.familyKey === 'jiangnanshen' ? 'shen-war' : 'shanghai-war');
    return null;
  }

  function buildLifeChapters(state) {
    var route = C.routes[state.routeKey];
    var postPath = C.post1949Paths && C.post1949Paths[state.post1949Choice];
    var portrait = buildLifePortrait(state);
    var employment = state.post1949 && state.post1949.employment;
    var employmentText = employment && employment.role
      ? '明确谋生记录为「' + employment.role + '」，地点是' + employment.workplace + '，最后状态为「' + employmentStatusLabel(employment.status) + '」。'
      : '具体职业没有留下可确认记录。';
    var death = state.life || {};
    var warDecision = familyDecisionKey(state, 'war');
    return [
      { key: 'birth-family', title: '出生与成长', text: state.identity.name + '于 ' + state.identity.born + ' 年出生在' + state.identity.place + '，成长于' + state.identity.familyName + '。' + portrait.parents + (choiceLabel(state, 'education') ? '六岁时，选择了“' + choiceLabel(state, 'education') + '”。' : '') },
      { key: 'livelihood', title: '成年谋生', text: (route ? '成年道路主要经过「' + route.name + '」。' : '') + portrait.career + '公共生活与政治经历：' + portrait.publicLife },
      { key: 'war', title: '战争转折', text: choiceLabel(state, warDecision) ? choiceLabel(state, warDecision) + '。' : '战争时期的具体去留没有留下完整记录。' },
      { key: 'postwar', title: '战后重接', text: choiceLabel(state, 'postwar-settlement') ? choiceLabel(state, 'postwar-settlement') + '。' : '战后的住处、工作与关系如何接回，记录仍不完整。' },
      { key: 'post1949', title: '1949 与后半生', text: postPath ? '1949 年选择「' + postPath.name + '」。' + (state.post1949.arrival || '后来的抵达过程没有完整记录。') + '；' + employmentText + '家人与旧识并没有因此自动同行：' + portrait.relationship : '1949 年后的去向没有留下完整记录。' },
      { key: 'late-life', title: '中晚年', text: ([state.post1949.livelihoodLater, state.post1949.correspondence, state.post1949.care, state.post1949.legacy].filter(Boolean).join('；') || '中晚年继续处理工作、住处和照料。').replace(/[。！？]?$/, '。') + portrait.children + portrait.health + '晚年最后留下的一段心事是：' + portrait.inner },
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
    var warDecision = familyDecisionKey(state, 'war');
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
    var portrait = buildLifePortrait(state);
    facts.push('具体工作与经营：' + portrait.career);
    facts.push('父母各自的人生：' + portrait.parents);
    facts.push('婚姻与亲密关系：' + portrait.relationship);
    facts.push('子女或晚辈：' + portrait.children);
    facts.push('朋友、同事、雇主与客户：' + portrait.friends + '。');
    facts.push('疾病与身体：' + portrait.health);
    facts.push('最后留下的心理记录：' + portrait.inner);
    if (state.post1949.livelihoodLater) facts.push('中年以后：' + state.post1949.livelihoodLater + '。');
    if (state.post1949.companions) facts.push('共同生活与同行关系：' + state.post1949.companions + '。');
    if (state.post1949.leftBehind) facts.push('留在别处的人与未完成团聚：' + state.post1949.leftBehind + '。');
    if (state.post1949.correspondence) facts.push('晚年联系：' + state.post1949.correspondence + '。');
    if (state.post1949.care) facts.push('晚年照料：' + state.post1949.care + '。');
    if (state.post1949.legacy) facts.push('留下的记录：' + state.post1949.legacy + '。');
    if (state.annualNarratives.length) facts.push('人生账本记录了 ' + state.annualNarratives.length + ' 个生活年份。');
    facts.push('公共生活与政治经历：' + buildLifePortrait(state).publicLife);
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
    var health = state.lived && state.lived.health;
    var lastCondition = health && health.lastEpisode && health.lastEpisode.condition;
    if (state.res.health <= 0 && state.routeKey === 'subei-soldier') return '战争伤病与长期劳损';
    if (state.res.health <= 0 && (state.routeKey === 'subei-refugee' || state.routeKey === 'shen-refugee' || state.post1949Choice === 'in-motion')) return '迁徙劳损与疾病';
    if (state.res.health <= 0) return lastCondition ? lastCondition + '与长期身体耗损' : '长期疾病与身体耗损';
    if (state.age >= 88) return lastCondition ? '高龄自然衰老，晚年伴有' + lastCondition : '高龄后的自然衰老';
    return lastCondition ? '晚年' + lastCondition + '反复发作后的身体衰弱' : '晚年疾病与身体衰弱';
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
    processLivedLife(state);
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
    applyPublicEffect(state, option.publicEffect, 'decision:' + decision.id + ':' + option.id);
    if (option.echo) addUnique(state.echoes, option.echo);
    if (option.route) setRoute(state, option.route, decision.id + ':' + option.id);
    if (decision.id === familyDecisionKey(state, 'path')) state.livelihoodKey = option.route || state.routeKey;
    if (decision.id === familyDecisionKey(state, 'war')) state.warTurnKey = option.warTurn || option.id;
    if (decision.id === 'postwar-settlement') state.postwarSettlementKey = option.id;
    if (option.post1949Choice) {
      state.post1949Choice = option.post1949Choice;
      state.finalChoice = option.post1949Choice;
      state.post1949.choice = option.post1949Choice;
      state.post1949.region = C.post1949Paths && C.post1949Paths[option.post1949Choice]
        ? C.post1949Paths[option.post1949Choice].name
        : option.post1949Choice;
      installPost1949Contacts(state);
      state.milestones.push({ year: state.year, id: 'milestone-1949', text: '民国阶段结束，人生继续进入后半生。' });
    }
    if (option.postProfile) {
      Object.keys(option.postProfile).forEach(function (key) { state.post1949[key] = option.postProfile[key]; });
    }
    if (decision.id === 'post49-arrival') resolvePost1949Relationship(state, option);
    if (option.employmentEntry && !(decision.id === 'post49-arrival' && ensureEmployment(state).lastResultYear === state.year && ensureEmployment(state).role)) {
      resolveEmployment(state, decision.id + ':' + option.id, option.employmentEntry);
    }
    if (decision.id === 'later-life-livelihood') resolveLaterLifeEmployment(state, option.id);
    if (option.relationshipEntry) applyRelationshipEntry(state, option.relationshipEntry);
    if (option.relationshipResolution) applyRelationshipResolution(state, option.relationshipResolution);
    if (decision.id === 'family-future') applyFamilyFuture(state, option.id);
    if (option.healthResolution && state.lived && state.lived.health.current) {
      state.lived.health.current.status = option.healthResolution;
      state.lived.health.current.result = option.fact;
    }
    if (option.businessResolution && state.lived && state.lived.career.business) {
      state.lived.career.business.ordersHandled += 1;
      state.lived.career.business.lastProblem = option.fact;
    }
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
    attachDecisionToLivedYear(state, decision, option);
    addUnique(state.firedDecisions, decision.id);
    state.pendingDecision = state.pendingDecisionQueue.shift() || null;
    if (!state.pendingDecision) finishYear(state);
    return state;
  }

  function enrichLegacyRouteHistory(state) {
    state.routeHistory = (state.routeHistory || []).map(function (entry) {
      var routeKey = entry.to || entry.routeKey || null;
      return Object.assign({}, entry, {
        to: routeKey,
        domainKey: entry.domainKey || routeDomainKey(routeKey),
        routeLabel: entry.routeLabel || routeLabel(routeKey),
      });
    });
    state.routeDomainKey = routeDomainKey(state.routeKey);
    state.routeLabel = routeLabel(state.routeKey);
  }

  function rebuildCanonicalRouteHistories(state) {
    state.domainHistory = [];
    state.careerHistory = [];
    ensureEconomicLife(state);
    enrichLegacyRouteHistory(state);
    var entries = state.routeHistory.slice();
    if (!entries.length && state.routeKey) {
      entries.push({
        year: (state.lived && state.lived.career && state.lived.career.startedYear) || state.year,
        from: null,
        to: state.routeKey,
        source: 'legacy-current-route',
        domainKey: routeDomainKey(state.routeKey),
        routeLabel: routeLabel(state.routeKey),
      });
    }
    entries.forEach(function (entry, index) {
      if (!entry.to) return;
      var next = entries[index + 1];
      var isCurrent = !next && entry.to === state.routeKey;
      var endYear = next ? Math.max(entry.year, next.year - 1) : (isCurrent ? null : state.year);
      state.domainHistory.push({
        id: 'domain:' + entry.to + ':' + entry.year,
        domainKey: entry.domainKey || routeDomainKey(entry.to),
        startYear: entry.year,
        endYear: endYear,
        source: entry.source || 'legacy-route',
        legacyRouteKey: entry.to,
      });
      var episode = makeCareerEpisode(
        state,
        entry.to,
        entry.year,
        endYear,
        entry.source || 'legacy-route',
        isCurrent ? 'active' : 'ended'
      );
      state.careerHistory.push(episode);
      syncEconomicRouteEpisode(state, episode);
    });
  }

  function post1949DomainKey(track) {
    return { manual: 'D10', skilled: 'D11', literate: 'D22', care: 'D26' }[track] || 'D31';
  }

  function syncPost1949CanonicalLife(state) {
    if (!state.post1949) return;
    state.post1949.destinationKey = state.post1949Choice
      ? ((C.legacyPost1949DestinationMap && C.legacyPost1949DestinationMap[state.post1949Choice]) || state.post1949Choice)
      : null;
    var employment = state.post1949.employment;
    if (!employment || !employment.role) return;
    if (!Array.isArray(state.domainHistory)) state.domainHistory = [];
    if (!Array.isArray(state.careerHistory)) state.careerHistory = [];
    var startedYear = employment.startedYear || Math.max(1950, state.year);
    var postRouteKey = 'post:' + state.post1949.destinationKey;
    var domainKey = post1949DomainKey(employment.track);
    var previousDomain = state.domainHistory[state.domainHistory.length - 1];
    if (previousDomain && previousDomain.legacyRouteKey !== postRouteKey && previousDomain.endYear == null) {
      previousDomain.endYear = Math.max(previousDomain.startYear, startedYear - 1);
    }
    var domainId = 'domain:' + postRouteKey + ':' + startedYear;
    var postDomain = state.domainHistory.find(function (entry) { return entry.id === domainId; });
    var domainRecord = {
      id: domainId,
      domainKey: domainKey,
      startYear: startedYear,
      endYear: employment.status === 'retired' ? employment.lastResultYear || state.year : null,
      source: 'post1949-employment',
      legacyRouteKey: postRouteKey,
    };
    if (postDomain) Object.assign(postDomain, domainRecord);
    else state.domainHistory.push(domainRecord);
    var priorCareer = state.careerHistory[state.careerHistory.length - 1];
    if (priorCareer && priorCareer.routeKey !== postRouteKey && priorCareer.endedYear == null) {
      priorCareer.endedYear = Math.max(priorCareer.startedYear, startedYear - 1);
      priorCareer.status = 'ended';
      syncEconomicRouteEpisode(state, priorCareer);
    }
    var careerId = 'career:' + postRouteKey + ':' + startedYear;
    var postCareer = state.careerHistory.find(function (entry) { return entry.id === careerId; });
    var careerRecord = {
      id: careerId,
      domainKey: domainKey,
      routeKey: postRouteKey,
      routeLabel: state.post1949.region || state.post1949.destinationKey,
      kind: 'employment',
      role: employment.role,
      workplace: employment.workplace,
      employer: (C.post1949People && C.post1949People[state.post1949Choice] && C.post1949People[state.post1949Choice].employer) || null,
      startedYear: startedYear,
      endedYear: employment.status === 'retired' ? employment.lastResultYear || state.year : null,
      status: employment.status === 'retired' ? 'ended' : 'active',
      source: 'post1949-employment',
    };
    if (postCareer) Object.assign(postCareer, careerRecord);
    else state.careerHistory.push(careerRecord);

    var economicLife = ensureEconomicLife(state);
    upsertEntity(economicLife.positions, 'position:' + postRouteKey + ':' + startedYear, {
      personId: state.identity.id,
      domainKey: domainKey,
      routeKey: postRouteKey,
      role: employment.role,
      workplace: employment.workplace,
      startedYear: startedYear,
      endedYear: careerRecord.endedYear,
      status: careerRecord.status,
      source: 'post1949-employment',
    });
    upsertEntity(economicLife.employments, 'employment:' + postRouteKey + ':' + startedYear, {
      personId: state.identity.id,
      domainKey: domainKey,
      destinationKey: state.post1949.destinationKey,
      role: employment.role,
      workplace: employment.workplace,
      employer: careerRecord.employer,
      terms: employment.terms,
      startedYear: startedYear,
      endedYear: careerRecord.endedYear,
      status: employment.status,
      source: 'post1949-employment',
    });
  }

  function ensureSchemaSixContainers(state) {
    state.canonicalFamilyKey = state.canonicalFamilyKey || canonicalFamilyKey(state.familyKey);
    state.identity.canonicalFamilyKey = state.identity.canonicalFamilyKey || state.canonicalFamilyKey;
    if (!Array.isArray(state.domainHistory)) state.domainHistory = [];
    if (!Array.isArray(state.careerHistory)) state.careerHistory = [];
    ensureEconomicLife(state);
    state.genderContext = Object.assign({
      recordedGender: state.identity.gender,
      rule: '性别影响可见机会、身体经历、婚家压力和制度约束，但不把人生领域硬分成男女专属。',
      history: [],
    }, state.genderContext || {});
    if (!Array.isArray(state.genderContext.history)) state.genderContext.history = [];
    state.bodyLife = Object.assign({
      recordedGender: state.identity.gender,
      injuries: [], chronicConditions: [], reproductiveHistory: [], bodilyAutonomyHistory: [],
    }, state.bodyLife || {});
    ['injuries', 'chronicConditions', 'reproductiveHistory', 'bodilyAutonomyHistory'].forEach(function (key) {
      if (!Array.isArray(state.bodyLife[key])) state.bodyLife[key] = [];
    });
    if (!Array.isArray(state.migrationHistory)) state.migrationHistory = [];
    enrichLegacyRouteHistory(state);
  }

  function migrateSchema4To5(state) {
    state.canonicalFamilyKey = canonicalFamilyKey(state.familyKey);
    state.identity.canonicalFamilyKey = state.canonicalFamilyKey;
    enrichLegacyRouteHistory(state);
    state.schemaVersion = 5;
    addMigrationRecord(state, 'schema-4-to-5', 4, 5);
    return state;
  }

  function migrateSchema5To6(state) {
    ensureSchemaSixContainers(state);
    rebuildCanonicalRouteHistories(state);
    syncPost1949CanonicalLife(state);
    state.schemaVersion = SAVE_SCHEMA_VERSION;
    addMigrationRecord(state, 'schema-5-to-6', 5, 6);
    return state;
  }

  function ensureSchemaSixState(state, sourceSchema) {
    var schema = Number(sourceSchema || state.schemaVersion || 4);
    if (schema > SAVE_SCHEMA_VERSION) throw new Error('存档版本高于当前文字版能够读取的 schema 6');
    if (schema <= 4) {
      migrateSchema4To5(state);
      schema = 5;
    }
    if (schema === 5) migrateSchema5To6(state);
    else ensureSchemaSixContainers(state);
    syncPost1949CanonicalLife(state);
    state.schemaVersion = SAVE_SCHEMA_VERSION;
    return state;
  }

  function exportGame(state) {
    if (!state || !state.identity || !state.familyKey) throw new Error('A valid game state is required');
    ensureSchemaSixState(state, state.schemaVersion || SAVE_SCHEMA_VERSION);
    return JSON.stringify({
      format: 'minguo-life-save',
      schemaVersion: SAVE_SCHEMA_VERSION,
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
    var sourceSchema = Number(
      parsed && parsed.format === 'minguo-life-save' && parsed.schemaVersion != null
        ? parsed.schemaVersion
        : (source.schemaVersion || 4)
    );
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
    state.publicLife = Object.assign(clone(base.publicLife), state.publicLife || {});
    if (!Array.isArray(state.publicLife.history)) state.publicLife.history = [];
    state.lived = Object.assign(clone(base.lived), state.lived || {});
    state.lived.parents = Object.assign(clone(base.lived.parents), state.lived.parents || {});
    state.lived.relationship = Object.assign(clone(base.lived.relationship), state.lived.relationship || {});
    state.lived.career = Object.assign(clone(base.lived.career), state.lived.career || {});
    state.lived.health = Object.assign(clone(base.lived.health), state.lived.health || {});
    state.lived.social = Object.assign(clone(base.lived.social), state.lived.social || {});
    state.lived.inner = Object.assign(clone(base.lived.inner), state.lived.inner || {});
    ['routeHistory', 'knownEvents', 'unknownImpacts', 'echoes', 'facts', 'log', 'curve', 'actionHistory', 'annualNarratives', 'firedOrdinaryEvents', 'eraHistory', 'currentEraUpdates', 'contactHistory', 'firedEvents', 'firedDecisions', 'decisionHistory', 'pendingDecisionQueue', 'endingFacts'].forEach(function (key) {
      if (!Array.isArray(state[key])) state[key] = [];
    });
    state.version = C.version;
    state.year = clamp(Number(state.year) || base.year, base.year, base.year + (C.maximumAge || 105));
    state.age = state.year - state.identity.born;
    state.spirit = clamp(Number(state.spirit) || 0, 0, state.spiritMax || C.spiritMax);
    state.randomState = Number(state.randomState) >>> 0;
    ensureLivedLife(state);
    ensurePublicLife(state);
    if (state.routeKey && !state.lived.career.role) enterRouteCareer(state, state.routeKey);
    if (state.post1949Choice && state.post1949 && state.post1949.employment && state.post1949.employment.role) syncCareerFromEmployment(state);
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
    ensureSchemaSixState(state, sourceSchema);
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
      publicStatus: (C.publicStatusLabels && C.publicStatusLabels[ensurePublicLife(state).status]) || ensurePublicLife(state).status,
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
      concreteCareerCount: states.filter(function (state) {
        var career = state.lived && state.lived.career;
        return career && career.role && career.workplace && career.employer && career.history.length > 0;
      }).length,
      parentLifecycleDetailCount: states.filter(function (state) {
        var parents = state.lived && state.lived.parents;
        return parents && Object.keys(parents).length === 2 && Object.keys(parents).every(function (key) {
          return parents[key].name && parents[key].occupation && parents[key].deathYear;
        });
      }).length,
      relationshipDetailCount: states.filter(function (state) {
        var relationship = state.lived && state.lived.relationship;
        return relationship && relationship.history && relationship.history.length > 0;
      }).length,
      healthHistoryCount: states.filter(function (state) {
        return state.lived && state.lived.health && state.lived.health.history.filter(function (entry) {
          return entry.type === 'episode' || (entry.condition && entry.type !== 'treatment');
        }).length >= 4;
      }).length,
      socialWorldCount: states.filter(function (state) {
        return Object.keys(state.contacts || {}).length >= 6 && state.lived && state.lived.social;
      }).length,
      innerLifeCount: states.filter(function (state) {
        return state.lived && state.lived.inner && state.lived.inner.history.length === state.annualNarratives.length;
      }).length,
      publicLifeEvidenceCount: states.filter(function (state) {
        return state.publicLife && state.publicLife.history && state.publicLife.history.length >= 5;
      }).length,
      politicalMembershipCount: states.filter(function (state) {
        return state.publicLife && state.publicLife.history && state.publicLife.history.some(function (entry) {
          return entry.status === 'member' && (entry.organizationKey === 'ccp' || entry.organizationKey === 'kmt');
        });
      }).length,
      secretPublicLifeCount: states.filter(function (state) {
        return state.publicLife && state.publicLife.history && state.publicLife.history.some(function (entry) {
          return entry.status === 'secret-worker' || entry.status === 'infiltration';
        });
      }).length,
      factualPressureCount: states.filter(function (state) {
        return state.publicLife && Number(state.publicLife.coercion || 0) > 0;
      }).length,
      concreteYearCount: states.reduce(function (sum, state) {
        return sum + ((state.lived && state.lived.yearHistory) || []).length;
      }, 0),
      expectedNarrativeYears: expectedNarrativeYears,
      recordedNarrativeYears: recordedNarrativeYears,
      annualNarrativeRate: expectedNarrativeYears ? recordedNarrativeYears / expectedNarrativeYears : 0,
      authoredOrdinaryEventCount: (C.ordinaryEvents || []).length,
      authoredActionCount: (C.actions || []).length,
      publicActionCount: (C.actions || []).filter(function (action) { return Boolean(action.publicEffect); }).length,
      keyDecisionCount: (C.decisions || []).length,
      publicDecisionCount: (C.decisions || []).filter(function (decision) {
        return (decision.options || []).some(function (option) { return Boolean(option.publicEffect); });
      }).length,
      decisionOptionCount: (C.decisions || []).reduce(function (sum, decision) {
        return sum + (decision.options || []).length;
      }, 0),
      choiceEchoEventCount: (C.ordinaryEvents || []).filter(function (event) {
        return event.requiresEchoes || event.requiresAnyEchoes;
      }).length,
      publicOrdinarySceneCount: (C.ordinaryEvents || []).filter(function (event) {
        return String(event.id || '').indexOf('public-') === 0;
      }).length,
      publicEraEventCount: (C.events || []).filter(function (event) { return event.publicLifeEra; }).length,
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
      }, 0) + Object.keys(C.routeContactProfiles || {}).reduce(function (sum, routeKey) {
        return sum + (C.routeContactProfiles[routeKey] || []).length;
      }, 0),
      publicContactProfileCount: Object.keys(C.publicRouteProfiles || {}).filter(function (routeKey) {
        return C.publicRouteProfiles[routeKey] && C.publicRouteProfiles[routeKey].contact;
      }).length,
    };
  }

  function inspectWholeGameProgressBundle(states) {
    var coverage = inspectCoverage(states || []);
    var lifeDensityReady = coverage.scenarioCount > 0
      && coverage.denseLifeCount === coverage.scenarioCount
      && coverage.authoredActionCount >= 66
      && coverage.keyDecisionCount >= 42
      && coverage.authoredOrdinaryEventCount >= 171;
    var livedLifeReady = coverage.scenarioCount > 0
      && coverage.concreteCareerCount === coverage.scenarioCount
      && coverage.parentLifecycleDetailCount === coverage.scenarioCount
      && coverage.relationshipDetailCount === coverage.scenarioCount
      && coverage.healthHistoryCount === coverage.scenarioCount
      && coverage.socialWorldCount === coverage.scenarioCount
      && coverage.innerLifeCount === coverage.scenarioCount
      && coverage.concreteYearCount === coverage.expectedNarrativeYears;
    var publicLifeReady = coverage.scenarioCount > 0
      && coverage.publicLifeEvidenceCount === coverage.scenarioCount
      && coverage.publicActionCount >= 6
      && coverage.publicDecisionCount >= 7
      && coverage.publicOrdinarySceneCount >= 21
      && coverage.publicEraEventCount >= 11
      && coverage.publicContactProfileCount >= coverage.routeCount;
    return {
      wholeGameStageLabel: coverage.familyCount === Object.keys(C.families).length && coverage.routeCount === Object.keys(C.routes).length && coverage.post1949PathCount === 6 && coverage.deathEndingCount === coverage.scenarioCount && coverage.post1949EraEvidenceCount === coverage.scenarioCount && coverage.post1949EmploymentEvidenceCount === coverage.scenarioCount && coverage.annualNarrativeRate === 1 && lifeDensityReady && livedLifeReady && publicLifeReady
        ? '出生到死亡的具体生活与政治参与文字版已闭环'
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
        concreteCareer: coverage.concreteCareerCount === coverage.scenarioCount,
        parentLives: coverage.parentLifecycleDetailCount === coverage.scenarioCount,
        relationshipConsequences: coverage.relationshipDetailCount === coverage.scenarioCount,
        illnessHistory: coverage.healthHistoryCount === coverage.scenarioCount,
        socialWorld: coverage.socialWorldCount === coverage.scenarioCount,
        innerLife: coverage.innerLifeCount === coverage.scenarioCount,
        concreteYearRecord: coverage.concreteYearCount === coverage.expectedNarrativeYears,
        publicLife: publicLifeReady,
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
    buildLifePortrait: buildLifePortrait,
  };
})(typeof window !== 'undefined' ? window : globalThis);
