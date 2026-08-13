// 民国人生 · 71 路线岗位四连场密度包 v0.7.24
// 用已有的逐路线职业档案补足上工、权限冲突、同事变化与服务对象答复；人物和机构均为合成虚构。
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before density-expansion-route-work.js');

  C.version = '0.7.24';

  var sourceFallbacks = {
    subeipoor: ['SRC-F02-SOCIAL-AFFAIRS', 'SRC-F02-FLOOD-1931'],
    jiangnanshen: ['SRC-D19-NJU-COURSES', 'SRC-D21-SHANGHAI-PRESS'],
    shanghaigongshang: ['SRC-F05-SHANGHAI-SOCIETY', 'SRC-D47-SH-FINANCE-ARCHIVES'],
  };
  var categories = ['first-shift', 'authority-conflict', 'colleague-change', 'public-answer'];
  var effects = {
    'first-shift': { craft: 2, money: 1, mind: -1 },
    'authority-conflict': { mind: 1, network: -1, money: -1 },
    'colleague-change': { relation: 1, network: 1, money: -1 },
    'public-answer': { network: 2, money: 1, mind: -1 },
  };
  var lateRouteScope = {
    'macao-tourism-entertainment-concession': { minYear: 1962, post1949Choices: ['macau'] },
  };

  function routeProfile(routeKey, gender) {
    var genderProfiles = C.routeCareerProfilesByGender && C.routeCareerProfilesByGender[routeKey];
    return (genderProfiles && genderProfiles[gender]) || (C.routeCareerProfiles && C.routeCareerProfiles[routeKey]);
  }

  function sourceIdsFor(routeKey) {
    var ids = [];
    (C.ordinaryEvents || []).forEach(function (event) {
      if (!event.routes || event.routes.indexOf(routeKey) < 0) return;
      (event.sourceIds || []).forEach(function (sourceId) {
        if (C.reviewSources[sourceId] && ids.indexOf(sourceId) < 0) ids.push(sourceId);
      });
    });
    var familyKey = (C.routes[routeKey] || {}).family;
    (sourceFallbacks[familyKey] || []).forEach(function (sourceId) {
      if (C.reviewSources[sourceId] && ids.indexOf(sourceId) < 0) ids.push(sourceId);
    });
    return ids.slice(0, 4);
  }

  function passage(profile, category) {
    var role = profile.role || '具名岗位劳动者';
    var workplace = profile.workplace || '具名工作地点';
    var employer = profile.employer || '承担结算责任的雇主';
    var supervisor = profile.supervisor || '负责答复的经手人';
    var colleague = profile.colleague || '有自己工资和去留的同事';
    var publicPerson = profile.publicPerson || '等待具体答复的服务对象';
    var terms = profile.terms || '工作范围、结算和退出分别记录';
    var duties = profile.duties || '完成有范围的工作并留下交接记录';

    if (category === 'first-shift') {
      return '第一次以“' + role + '”的身份完整上工，你在' + workplace + '先由' + supervisor + '逐项说明今天能做什么、不能替谁决定以及出错后交给谁。你实际完成了' + duties + '；午间再和' + colleague + '核过领用物、工时与交接页。' + employer + '只确认本次工作，不把试做说成永久职位；当日结果是任务交清、漏项补记，下一次是否继续仍按“' + terms + '”另行答复。';
    }
    if (category === 'authority-conflict') {
      return '在' + workplace + '，' + supervisor + '临时要求你把“' + duties + '”之外的一项差错也签在自己名下，并说以后再补手续。你没有只用服从或辞工两种办法处理，而是请' + colleague + '带来当班记录，把本人经手、主管批准和尚未确认三部分拆开。' + employer + '最后只让你补做有权限的一段，另两段留给原经手人；当年少了一次加钱机会，后来复核时却能查清责任，没有把关系压力改写成自愿承担。';
    }
    if (category === 'colleague-change') {
      return colleague + '在' + workplace + '告诉你，自己的工资、身体或家口已不能继续照旧排班，准备换岗、停工或离开。你们先把共同做过的“' + duties + '”、尚未交清的物件和最后一笔结算逐项写下，再由' + supervisor + '确认谁接下一班。你必须重新学习一段原先由同事承担的工作，但' + colleague + '没有因为与你熟识就被永久留下；当年工作速度变慢，下一年这段交接会决定新人、返工与欠薪分别由谁答复。';
    }
    return publicPerson + '来到' + workplace + '，拿着先前留下的凭据追问一项尚未完成的服务。你先说明自己作为“' + role + '”究竟负责哪一段，再按“' + terms + '”核对本人请求、已经完成、需要返工和无法保证的部分；' + supervisor + '不能只让你用一句“再等等”打发。最后' + publicPerson + '得到具名答复、费用或交期更正，也保留停止、拒绝或继续申诉的选择；这次少赚或多做的成本进入当年工作账，下一次往来不再依赖模糊人情。';
  }

  function genderTexts(routeKey, category) {
    return {
      男: passage(routeProfile(routeKey, '男'), category),
      女: passage(routeProfile(routeKey, '女'), category),
    };
  }

  function install(routeKey, routeIndex, category, categoryIndex) {
    var route = C.routes[routeKey];
    var sourceIds = sourceIdsFor(routeKey);
    var texts = genderTexts(routeKey, category);
    var scope = lateRouteScope[routeKey] || { maxYear: 1949 };
    var event = Object.assign({
      id: 'density-route-' + String(routeIndex + 1).padStart(2, '0') + '-' + category,
      title: route.name + ' · ' + ({
        'first-shift': '第一个完整工作日',
        'authority-conflict': '主管与权限冲突',
        'colleague-change': '同事的工作发生变化',
        'public-answer': '顾客或服务对象得到答复',
      })[category],
      text: texts['男'],
      textByGender: texts,
      routes: [routeKey],
      minAge: routeKey === 'macao-tourism-entertainment-concession' ? 45 : 16,
      maxAge: 72,
      priority: 26,
      delta: effects[category],
      sourceIds: sourceIds,
      reviewStatus: 'structured-route-profile-source-linked-first-pass-reviewed',
      reviewNote: '以逐路线职业档案生产并检查岗位、地点、上级、同事、服务对象、当年结果和后续影响；仍需五千场景完成后的逐条文字终审。',
      densityPack: 'route-work-v1',
      densityCategory: category,
      routeWorkFacets: ['specific-role', 'specific-workplace', 'supervisor', 'colleague', 'public-person', 'same-year-result', 'later-consequence'],
    }, scope);
    C.ordinaryEvents.push(event);
  }

  var routeKeys = Object.keys(C.routes);
  routeKeys.forEach(function (routeKey, routeIndex) {
    if (!routeProfile(routeKey, '男') || !routeProfile(routeKey, '女')) {
      throw new Error('route career profiles are required for both genders: ' + routeKey);
    }
    categories.forEach(function (category, categoryIndex) {
      install(routeKey, routeIndex, category, categoryIndex);
    });
  });

  C.densityExpansion = C.densityExpansion || {};
  C.densityExpansion.routeWorkV1 = {
    version: '0.7.24', routeCount: routeKeys.length, scenesPerRoute: categories.length,
    sceneCount: routeKeys.length * categories.length, categories: categories,
    note: '第二批完整人生密度包：七十一条路线岗位四连场；不代表五千条场景总门槛已经完成。',
  };
})(typeof window !== 'undefined' ? window : globalThis);
