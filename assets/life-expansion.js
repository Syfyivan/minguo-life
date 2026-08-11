// 民国人生 · 完整一生内容扩建包 v0.4
// 本文件只追加虚构生活选择与跨年回响；不把合成人物经历写成史实。
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before life-expansion.js');

  C.version = '0.4.0';
  C.lifeDensityStandard = {
    authoredActions: 50,
    authoredDecisions: 33,
    decisionOptions: 96,
    authoredLifeScenes: 105,
    routeDecisionsPerLife: 2,
    minimumDecisionsPerLife: 10,
    minimumChoiceEchoesPerLife: 4,
  };

  C.actions.push(
    { id: 'manage-household-budget', name: '重排家用与储备', minAge: 18, spirit: 2, delta: { money: 2, mind: 2, relation: 1 }, subjectDelta: { ledger: { strength: 1 } }, note: '把当年收入、照料与来年风险放在同一张账上。' },
    { id: 'visit-old-connections', name: '探望旧识与回信', minAge: 20, spirit: 2, delta: { relation: 3, network: 1, mind: 1 }, contactEffects: { zhou_shulan: { relation: 1 }, ding_youshun: { relation: 1 }, chen_fusheng: { relation: 1 }, shen_jinglan: { relation: 1 }, lu_junping: { relation: 1 }, fang_yunhe: { relation: 1 }, sun_ligen: { relation: 1 }, xu_yun: { relation: 1 }, tang_huizhen: { relation: 1 } }, note: '关系需要花时间维持；回信也不代表对方会按你的路走。' },
    { id: 'record-life-ledger', name: '整理旧信与人生账', minAge: 30, spirit: 3, gate: { knowledge: 18 }, delta: { knowledge: 2, mind: 3, fame: 1 }, channels: ['books'], note: '把记得的、听来的和仍不知道的事情分开记录。' },

    { id: 'repair-dike-tools', name: '修堤与修农具', routes: ['subei-stay'], minAge: 16, spirit: 4, delta: { body: 2, craft: 4, position: 1 }, subjectDelta: { support: { strength: 2 } }, contactEffects: { ding_youshun: { relation: 2 } }, note: '维护共同使用的堤段和农具，也留下谁出过力的记录。' },
    { id: 'negotiate-rent-ledger', name: '对租账与借粮', routes: ['subei-stay'], minAge: 18, spirit: 3, delta: { mind: 3, network: 2, position: 1 }, channels: ['conversation'], subjectDelta: { ledger: { strength: 3 } }, contactEffects: { zhou_shulan: { relation: 2 } }, note: '把口头约定写成可追溯的租粮和人情账。' },

    { id: 'learn-machine-repair', name: '跟机匠学修机器', routes: ['subei-millworker'], minAge: 14, spirit: 4, delta: { craft: 5, money: 2, health: -1 }, subjectDelta: { ledger: { strength: 1 } }, contactEffects: { chen_fusheng: { relation: 2, status: 'coworker' } }, note: '多一门修机手艺，也要承担靠近机器的风险。' },
    { id: 'worker-injury-fund', name: '合办工伤互助钱', routes: ['subei-millworker'], minAge: 18, spirit: 3, delta: { money: -2, relation: 3, network: 3 }, subjectDelta: { workers: { strength: 4 } }, contactEffects: { chen_fusheng: { relation: 3 } }, note: '互助钱不能取消工伤，但能改变伤后谁来接住日子。' },

    { id: 'field-first-aid', name: '学包扎与照看伤病', routes: ['subei-soldier'], minAge: 18, spirit: 4, delta: { craft: 4, mind: 2, health: 1 }, subjectDelta: { support: { strength: 1 } }, contactEffects: { ding_youshun: { relation: 2, status: 'traveling' } }, note: '在有限药物下先学会止血、搬运和记录伤情。' },
    { id: 'keep-comrade-roll', name: '记同伴姓名与去向', routes: ['subei-soldier'], minAge: 20, spirit: 3, delta: { knowledge: 2, relation: 2, mind: 2 }, channels: ['conversation'], subjectDelta: { connections: { strength: 3 } }, contactEffects: { ding_youshun: { relation: 2 } }, note: '名单不能保证归返，却能减少一个人无声消失的可能。' },

    { id: 'build-temporary-shelter', name: '修补临时住处', routes: ['subei-refugee'], minAge: 16, spirit: 4, delta: { craft: 4, position: 2, health: -1 }, subjectDelta: { support: { strength: 3 } }, note: '让暂住的屋檐更能过夜，也明确各家共同承担什么。' },
    { id: 'trace-kin-news', name: '托人寻找亲友消息', routes: ['subei-refugee'], minAge: 18, spirit: 3, delta: { network: 3, relation: 2, mind: 1 }, channels: ['conversation'], subjectDelta: { connections: { strength: 3 } }, contactEffects: { zhou_shulan: { relation: 1, status: 'distant' }, ding_youshun: { relation: 1, status: 'distant' } }, note: '收集地址和口信，同时保留消息仍未证实的边界。' },

    { id: 'preserve-library', name: '整理书稿与学校藏书', routes: ['shen-scholar'], minAge: 18, spirit: 3, delta: { knowledge: 4, craft: 2, money: -1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { lu_junping: { relation: 2, status: 'colleague' } }, note: '书稿能否留下取决于具体保管、搬运与抄录工作。' },
    { id: 'public-lecture', name: '办公开讲习与答问', routes: ['shen-scholar'], minAge: 22, spirit: 4, delta: { fame: 4, network: 3, health: -1 }, channels: ['newspaper'], contactEffects: { fang_yunhe: { relation: 2, status: 'colleague' } }, note: '公共表达扩大影响，也带来时间、立场和生计压力。' },

    { id: 'literacy-class', name: '办识字与实用课程', routes: ['shen-newwoman'], minAge: 18, spirit: 4, delta: { knowledge: 3, fame: 3, network: 2 }, subjectDelta: { support: { strength: 3 }, workers: { strength: 2 } }, contactEffects: { shen_jinglan: { relation: 2 } }, note: '课程把识字、算账和求职信息放在一起。' },
    { id: 'negotiate-school-terms', name: '谈薪水、住处与课时', routes: ['shen-newwoman'], minAge: 20, spirit: 3, delta: { money: 2, mind: 3, relation: 1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { lu_junping: { relation: 1 } }, note: '把教育理想落实为能够持续的劳动条件。' },

    { id: 'preserve-school-register', name: '转存学生名册与地址', routes: ['shen-refugee'], minAge: 18, spirit: 3, delta: { knowledge: 3, relation: 1 }, subjectDelta: { connections: { strength: 3 } }, contactEffects: { lu_junping: { relation: 2, status: 'traveling' }, fang_yunhe: { relation: 2, status: 'distant' } }, note: '名册记录的是最后已知地址，不把失联补写成确定去向。' },
    { id: 'organize-temporary-school', name: '维持临时学校', routes: ['shen-refugee'], minAge: 20, spirit: 4, delta: { fame: 3, network: 3, money: -1 }, subjectDelta: { support: { strength: 4 }, workers: { strength: 2 } }, note: '在落脚处协调屋檐、师资、口粮与停课条件。' },

    { id: 'audit-wages', name: '核对工钱与欠薪', routes: ['shanghai-heir'], minAge: 18, spirit: 3, delta: { craft: 3, relation: 2, money: -1 }, subjectDelta: { workers: { strength: 2 }, ledger: { strength: 2 } }, contactEffects: { sun_ligen: { relation: 2 }, xu_yun: { relation: 2 } }, note: '把账房数字与实际发到工友手里的钱分开核对。' },
    { id: 'diversify-orders', name: '分散货单与原料来源', routes: ['shanghai-heir'], minAge: 24, spirit: 4, delta: { money: 4, network: 3, position: 2 }, subjectDelta: { ledger: { strength: 2 }, connections: { strength: 2 } }, contactEffects: { sun_ligen: { relation: 2 } }, note: '降低单一路线中断的风险，也增加往来账复杂度。' },

    { id: 'paid-commission', name: '承接有报酬的委托', routes: ['shanghai-newwoman'], minAge: 18, spirit: 3, delta: { money: 3, craft: 3, mind: 2 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { tang_huizhen: { relation: 2, status: 'colleague' } }, note: '用明确报酬维持个人工作，不让公共服务吞掉全部生计。' },
    { id: 'organize-care-network', name: '协调托幼、诊所与课堂', routes: ['shanghai-newwoman'], minAge: 20, spirit: 4, delta: { relation: 3, network: 3, health: -1 }, subjectDelta: { support: { strength: 3 } }, contactEffects: { xu_yun: { relation: 2 }, tang_huizhen: { relation: 2 } }, note: '让照料责任在多个具体主体之间协商，而不是默认落到一人身上。' }
  );

  function option(id, label, delta, echo, fact, followTitle, followText, extras) {
    var result = {
      id: id,
      label: label,
      delta: delta,
      echo: echo,
      fact: fact,
      followup: { title: followTitle, text: followText },
    };
    Object.keys(extras || {}).forEach(function (key) {
      if (key === 'followupDelta') result.followup.delta = extras[key];
      else result[key] = extras[key];
    });
    return result;
  }

  function installDecision(decision) {
    decision.options.forEach(function (choice) {
      var followup = choice.followup;
      if (!followup) return;
      var event = {
        id: 'echo-' + choice.echo.replace(/:/g, '-'),
        title: followup.title,
        text: followup.text,
        priority: 30,
        requiresEchoes: [choice.echo],
        delta: followup.delta,
        subjectEffects: followup.subjectEffects,
        contactEffects: followup.contactEffects,
        channels: followup.channels,
      };
      if (decision.followYear != null) event.year = decision.followYear;
      if (decision.followAge != null) event.yearByAge = decision.followAge;
      if (decision.routes) event.routes = decision.routes.slice();
      if (decision.families) event.families = decision.families.slice();
      C.ordinaryEvents.push(event);
      delete choice.followup;
    });
    delete decision.followYear;
    delete decision.followAge;
    C.decisions.push(decision);
  }

  installDecision({
    id: 'adolescent-direction', yearByAge: 11, followAge: 12, title: '少年时间先放在哪里',
    prompt: '家计、学业与外面的关系网都开始需要你的时间。少年阶段的选择不会决定一生，却会改变下一段路的起点。',
    options: [
      option('learn-household-work', '跟家里把一门活计学扎实', { craft: 5, relation: 2 }, 'life:adolescent:craft', '少年时先把时间放在家计与活计上。', '手上留下的办法', '一年后，你已经能独自接住一部分家务与活计；家里也开始把真实的难处告诉你。', { followupDelta: { craft: 2 } }),
      option('protect-study-time', '争取稳定读书时间', { knowledge: 5, mind: 2, relation: -1 }, 'life:adolescent:study', '少年时争取到一段较稳定的读书时间。', '一册反复读过的书', '一年后，书页已经翻旧。你能读懂更多字，也更清楚纸面知识与家里日子之间的距离。'),
      option('know-more-people', '多跑腿，认识家门外的人', { network: 4, mind: 2, body: 1 }, 'life:adolescent:network', '少年时把更多时间放在跑腿与认识外部世界。', '几条熟起来的路', '一年后，你知道哪些门可以托话、哪些人只能听听；外面的路没有因此变得没有代价。')
    ],
  });

  installDecision({
    id: 'household-reserve', yearByAge: 29, followAge: 30, title: '三十岁前的一笔储备',
    prompt: '收入、身体和关系都不可能同时储满。你要决定把有限余量留在哪一种未来风险上。',
    options: [
      option('reserve-goods', '换成粮、布、工具等实物', { money: -4, position: 3, craft: 1 }, 'life:reserve:goods', '三十岁前把一部分余钱换成了实物储备。', '柜里真正能用的东西', '一年后，几样实物接住了一次临时短缺；它们也占用了搬运、保管和变现的空间。'),
      option('reserve-relations', '先还人情并加固互助关系', { money: -2, relation: 3, network: 3 }, 'life:reserve:relations', '三十岁前优先偿还人情并加固互助关系。', '有人来敲门', '一年后，你需要帮忙时确实有人回应；对方也带着自己的家口和条件，不是可随取的资源。'),
      option('reserve-health', '减少额外承诺，养住身体', { health: 5, mind: 2, fame: -1 }, 'life:reserve:health', '三十岁前减少额外承诺，把一段时间留给身体。', '一次没有硬撑的清晨', '一年后，你少接了一件事，却保住了继续做事的力气；有人理解，也有人重新安排了与你的关系。')
    ],
  });

  installDecision({
    id: 'experience-handover', yearByAge: 38, followAge: 39, title: '把半生经验留在哪里',
    prompt: '到这个年纪，经验已经不只是属性。你可以教给具体的人、留在私人账本里，或交给更广的公共网络。',
    options: [
      option('teach-one-person', '认真带一名晚辈或同伴', { relation: 3, craft: 2, knowledge: 1 }, 'life:handover:person', '晚年到来前，曾认真把经验教给一名具体的晚辈或同伴。', '对方开始自己做决定', '一年后，对方已经会用你教的办法，却也选择了与你不同的做法。经验被接走，不等于人生被复制。', { endingFact: true }),
      option('keep-private-record', '把经历整理成家内账与旧信', { mind: 3, relation: 2, knowledge: 2 }, 'life:handover:private', '晚年到来前，将半生经历整理进家内账与旧信。', '家内账多了另一种笔迹', '一年后，家人补写了与你不同的记忆。留下来的不是单一版本，而是几个人各自看见的半生。', { endingFact: true }),
      option('leave-public-record', '留下可供更多人使用的记录', { fame: 3, knowledge: 3, money: -1 }, 'life:handover:public', '晚年到来前，留下了一份面向外部的生活与工作记录。', '记录离开了手边', '一年后，这份记录被抄录、节选或转述；它开始属于公共网络，也不再完全由你控制解释。', { endingFact: true })
    ],
  });

  var routeDecisions = [
    {
      id: 'route-subei-stay-1929', year: 1929, followYear: 1930, routes: ['subei-stay'], title: '欠租与水患之后怎样接日子',
      prompt: '田还在，债也还在。你只能优先保一件：自家耕作、乡邻共担，或多找一条集市活路。',
      options: [
        option('keep-own-plots', '先保住自家能种的地', { body: 2, craft: 3, money: -2 }, 'stay:1929:plots', '1929 年优先保住自家仍能耕作的地块。', '一小块先种下的地', '第二年开春，自家的地先种下了，但换工和借种的人情比以前更紧。', { endingFact: true }),
        option('share-crop-risk', '与乡邻共担种粮和修堤', { relation: 3, network: 2, money: -1 }, 'stay:1929:mutual', '1929 年与乡邻共同承担种粮和修堤风险。', '换工名单', '第二年，换工名单真的接住了一次急活；每家出力不一，新的后账也随之形成。', { endingFact: true }),
        option('add-market-livelihood', '留地同时增加集市营生', { craft: 2, money: 3, relation: -1 }, 'stay:1929:market', '1929 年在留地之外增加了集市营生。', '两头赶的日子', '第二年，你多了一笔现钱，也更常错过家里的农时与照料。', { endingFact: true })
      ],
    },
    {
      id: 'route-subei-stay-1942', year: 1942, followYear: 1943, routes: ['subei-stay'], title: '战时村庄的名额与口粮',
      prompt: '名额、口粮和藏身处互相牵制。任何办法都只能保护一部分人，并留下可以追问的后账。',
      options: [
        option('hide-households', '先分散藏匿最危险的家口', { relation: 3, position: -2, health: -1 }, 'stay:1942:hide', '1942 年参与分散安置受到直接威胁的家口。', '一处被腾空的偏屋', '第二年，偏屋救过人，也让提供屋子的一家承担了更久的盘查与短缺。', { endingFact: true }),
        option('record-quota', '把摊派、交付和代领逐项记下', { knowledge: 2, mind: 3, network: -1 }, 'stay:1942:record', '1942 年开始逐项记录战时摊派与交付。', '被藏起来的名额账', '第二年，这本账让几笔责任能够对质，也使保管它的人承担了风险。', { endingFact: true }),
        option('seasonal-leave', '暂时外出做工，给家里减口粮压力', { money: 3, relation: -2, position: 1 }, 'stay:1942:leave', '1942 年短期外出做工，以减轻家中口粮压力。', '寄回但晚到的钱', '第二年，钱最终到了家，时间却错过了最紧的一段；家里靠自己的办法先撑了过去。', { endingFact: true })
      ],
    },
    {
      id: 'route-millworker-1929', year: 1929, followYear: 1930, routes: ['subei-millworker'], title: '工伤、工钱与下一班机器',
      prompt: '一场工伤让通铺里的人重新算账。你可以多挣眼前工钱、合办互助钱，或把时间换成修机手艺。',
      options: [
        option('take-extra-shifts', '多接班次，先把钱寄回家', { money: 4, health: -4, relation: 1 }, 'mill:1929:shifts', '1929 年多接班次，把一部分工钱寄回家。', '咳嗽没有随休班停下', '第二年，寄款接住了家里一笔急账，你的身体也留下了不能只靠睡一觉恢复的损耗。', { endingFact: true }),
        option('build-injury-fund', '与工友合办小额工伤互助', { money: -3, relation: 3, network: 3 }, 'mill:1929:fund', '1929 年与工友建立了小额工伤互助办法。', '第一笔被领走的互助钱', '第二年，互助钱第一次派上用场；金额不够解决全部医药，却改变了伤者是否立刻断粮。', { endingFact: true }),
        option('learn-repair-trade', '少接一班，跟机匠学修理', { craft: 5, money: -2, mind: 2 }, 'mill:1929:repair', '1929 年减少部分班次，开始系统学习机器修理。', '机器停下时有人喊你的名字', '第二年，一次小故障让你的手艺真正有了用处，也让你更靠近危险的机器。', { endingFact: true })
      ],
    },
    {
      id: 'route-millworker-1942', year: 1942, followYear: 1943, routes: ['subei-millworker'], title: '战时厂门怎样维持',
      prompt: '原料、工钱和家口都不稳定。你要把有限的组织能力放在守班次、共用灶，或让工友分散谋生上。',
      options: [
        option('hold-production-line', '尽量守住班次与最低工钱', { money: 2, health: -3, craft: 2 }, 'mill:1942:line', '1942 年留在厂内尽力维持班次与最低工钱。', '一张不断改写的班次表', '第二年，少数班次仍开着，但缺勤、停机和欠薪让这张表几乎每周重写。', { endingFact: true }),
        option('worker-common-kitchen', '把力气放在工友共用灶与照料', { relation: 4, network: 2, money: -3 }, 'mill:1942:kitchen', '1942 年参与维持工友共用灶与家口照料。', '灶边的新轮值', '第二年，共用灶接住了几户人的日常，也因为粮源不足不得不缩减轮值。', { endingFact: true }),
        option('scatter-worker-skills', '帮助工友带着手艺分散找活', { craft: 3, network: 3, relation: -1 }, 'mill:1942:scatter', '1942 年协助部分工友带着手艺分散谋生。', '几封来自不同地方的短札', '第二年，有人找到零工，有人仍无消息；原来的工友网络变远，却没有完全断掉。', { endingFact: true })
      ],
    },
    {
      id: 'route-soldier-1940', year: 1940, followYear: 1941, routes: ['subei-soldier'], title: '队伍变动时先保什么',
      prompt: '调动和伤病让熟人不断分开。你可以先跟紧队伍、保存同伴名单，或争取去做伤病照料。',
      options: [
        option('follow-unit', '跟紧现有队伍，先保证不掉队', { body: 2, health: -2, position: 2 }, 'soldier:1940:unit', '1940 年把不掉队和跟上调动放在首位。', '又一次临时点名', '第二年，你仍在队伍中，原来的熟人却有几名没有出现在新名单上。', { endingFact: true }),
        option('preserve-comrade-names', '把同伴姓名、籍贯与最后消息记下', { knowledge: 2, relation: 3, mind: 2 }, 'soldier:1940:names', '1940 年开始系统记录同伴姓名与最后已知去向。', '一页被雨水洇开的名单', '第二年，这页名单帮助一封口信找到方向；其余名字仍只能停在最后已知消息。', { endingFact: true }),
        option('care-for-wounded', '争取承担伤病照料与搬运', { craft: 3, relation: 2, health: -2 }, 'soldier:1940:care', '1940 年更多承担伤病照料与搬运。', '被重复清洗的布条', '第二年，你学会在物资不足时处理伤口，也记住有些人并没有等到更完整的医治。', { endingFact: true })
      ],
    },
    {
      id: 'route-soldier-1944', year: 1944, followYear: 1945, routes: ['subei-soldier'], title: '为战后可能的归路留下什么',
      prompt: '没有人能保证何时复员。你只能为一种可能多留一点条件：通行凭据、家乡线索或同伴落脚网。',
      options: [
        option('save-papers', '保存能证明身份与经历的凭据', { mind: 2, position: 3, money: -1 }, 'soldier:1944:papers', '1944 年尽力保存了身份与队伍经历凭据。', '几张没有丢掉的纸', '战争结束时，这些纸帮助说明了一部分经历，却不能替你证明家乡和亲人仍在原处。', { endingFact: true }),
        option('search-home-route', '持续托人打听家乡与亲人消息', { network: 3, relation: 3, money: -2 }, 'soldier:1944:home', '1944 年持续托人寻找家乡与亲人消息。', '一条终于接上的口信', '战争结束时，一条口信确认了故乡方向；具体家口与旧屋仍要亲自重新核对。', { endingFact: true }),
        option('build-comrade-landing', '与同伴约定失散后的落脚办法', { relation: 2, network: 3, position: 1 }, 'soldier:1944:landing', '1944 年与同伴建立了失散后的联络和落脚办法。', '约定地点留下的记号', '战争结束时，有人按约定出现，也有人没有；这处落脚点只接住了部分归路。', { endingFact: true })
      ],
    },
    {
      id: 'route-subei-refugee-1940', year: 1940, followYear: 1941, routes: ['subei-refugee'], title: '后方落脚后怎样谋生',
      prompt: '终于能停久一些。你可以先立住一门零工、与同路家口共担生活，或继续保留随时上路的准备。',
      options: [
        option('settle-with-craft', '用手艺换取较稳定的零工', { craft: 4, money: 3, position: 2 }, 'subei-refugee:1940:craft', '1940 年在后方以手艺换得较稳定的零工。', '有人第二次来找你做活', '第二年，重复的委托让日子稍有次序；收入仍随物料和人流变化。', { endingFact: true }),
        option('share-hearth', '与几户同路人共担灶火与照料', { relation: 4, money: -1, network: 2 }, 'subei-refugee:1940:hearth', '1940 年与几户同路人共同维持灶火和照料。', '灶火旁重新排过的责任', '第二年，有人离开、有人加入，共用生活重新协商，没有自动变成一个家庭。', { endingFact: true }),
        option('keep-ready-to-move', '少添置东西，保留再次上路的盘缠', { money: 2, position: -1, mind: 2 }, 'subei-refugee:1940:move', '1940 年没有完全定居，保留了再次移动的盘缠。', '一直没有拆开的包袱', '第二年，包袱让你能迅速避开一次风险，也让落脚处的人知道你随时可能离开。', { endingFact: true })
      ],
    },
    {
      id: 'route-subei-refugee-1944', year: 1944, followYear: 1945, routes: ['subei-refugee'], title: '听到返乡消息以后',
      prompt: '有人说旧路渐通，也有人已在后方扎根。你可以试探归路、继续经营落脚处，或让家口分别保留两种选择。',
      options: [
        option('test-old-road', '托可靠的人先试探旧路', { network: 3, money: -2, mind: 2 }, 'subei-refugee:1944:test', '1944 年先托人试探返乡旧路与旧关系。', '带回来的不是完整答案', '战争结束时，探路人带回了几处能走和不能走的消息；旧屋、田地与亲人仍需分别确认。', { endingFact: true }),
        option('deepen-back-area-life', '继续加固后方的工作与住处', { position: 4, relation: 2, money: -2 }, 'subei-refugee:1944:settle', '1944 年继续加固后方的工作与住处。', '落脚处第一次添置耐用物件', '战争结束时，这件物品仍留在屋里，说明后方已不只是临时停靠。', { endingFact: true }),
        option('allow-split-paths', '让愿意归返和愿意留下的人分别准备', { relation: 1, mind: 3, money: -3 }, 'subei-refugee:1944:split', '1944 年允许家口按各自条件分别准备归返或留下。', '两份不同方向的行李', '战争结束时，两份行李都已准备好；共同生活没有因此抹去每个人不同的落点。', { endingFact: true })
      ],
    },
    {
      id: 'route-shen-scholar-1929', year: 1929, followYear: 1930, routes: ['shen-scholar'], title: '学校、稿费与公共表达怎样并存',
      prompt: '时间只够把一项做深。固定教职、公共写作或自办小课堂，会形成三种不同的知识生活。',
      options: [
        option('stable-teaching-post', '先保住固定教职与学生', { money: 3, knowledge: 2, fame: 1 }, 'scholar:1929:teaching', '1929 年优先保住固定教职和持续教学。', '熟悉的学生又来上课', '第二年，稳定课堂让知识能够连续传递，也把你的时间绑在薪水和校务上。', { endingFact: true }),
        option('public-writing', '把更多时间投入报刊与公共写作', { fame: 4, knowledge: 3, money: -2 }, 'scholar:1929:writing', '1929 年把更多时间投入报刊与公共写作。', '稿子去了比你更远的地方', '第二年，文章被转述和争论；名声增加，稳定收入却没有同步到来。', { endingFact: true }),
        option('small-independent-class', '与同事维持一处独立小课堂', { network: 3, relation: 2, money: -3 }, 'scholar:1929:class', '1929 年与同事维持了一处独立小课堂。', '房租又到期了', '第二年，课堂仍在，租金和学生家计却迫使课程不断调整。', { endingFact: true })
      ],
    },
    {
      id: 'route-shen-scholar-1942', year: 1942, followYear: 1943, routes: ['shen-scholar'], title: '战时知识工作先留下什么',
      prompt: '书稿、流动学生和公共记录都可能中断。你要优先保护哪一种连续性？',
      options: [
        option('preserve-manuscripts', '转存书稿、名册与课程', { knowledge: 4, money: -2, craft: 1 }, 'scholar:1942:archive', '1942 年优先转存书稿、名册与课程记录。', '抄本抵达另一处屋檐', '第二年，一份抄本被保存下来；原稿与部分姓名仍在迁移中失散。', { endingFact: true }),
        option('teach-displaced-students', '把时间先给失学与流动中的学生', { relation: 3, fame: 2, health: -2 }, 'scholar:1942:students', '1942 年将更多时间投入流动学生的教学。', '一堂人数不断变化的课', '第二年，学生名单几次更换，课堂仍成为一些人生活中少数连续的部分。', { endingFact: true }),
        option('write-wartime-record', '持续记录生活冲击与所知边界', { mind: 3, knowledge: 3, fame: 2 }, 'scholar:1942:record', '1942 年持续记录战时生活冲击及当时的知情边界。', '记录里保留了“不知道”', '第二年，你补上了后来确认的事实，也保留当时无法知道的部分，没有把回忆改写成全知。', { endingFact: true })
      ],
    },
    {
      id: 'route-shen-newwoman-1929', year: 1929, followYear: 1930, routes: ['shen-newwoman'], title: '女学怎样获得持续的生计',
      prompt: '学生支付能力有限，教师也要生活。你要在学费、外部有薪工作和互助名额之间确定主次。',
      options: [
        option('tiered-tuition', '按家庭条件协商不同学费', { money: 2, relation: 2, mind: 2 }, 'shen-newwoman:1929:tuition', '1929 年尝试按家庭条件协商不同学费。', '一张没有统一数字的学费表', '第二年，更多学生能留下，教师收入却仍不稳定，协商也带来新的比较与争议。', { endingFact: true }),
        option('paid-work-balance', '接有薪工作补贴教学时间', { money: 4, health: -2, craft: 2 }, 'shen-newwoman:1929:paid', '1929 年以有薪工作补贴女学和个人生计。', '两份时间表叠在一起', '第二年，收入接住了房租，你也不得不减少部分无报酬课程。', { endingFact: true }),
        option('mutual-aid-places', '与学生家庭建立轮值互助名额', { relation: 3, network: 3, money: -2 }, 'shen-newwoman:1929:mutual', '1929 年与学生家庭建立了轮值互助名额。', '学生家长主持了一次轮值', '第二年，互助不再只由你维持；参与者也开始按自己的条件修改安排。', { endingFact: true })
      ],
    },
    {
      id: 'route-shen-newwoman-1942', year: 1942, followYear: 1943, routes: ['shen-newwoman'], title: '战时教育与救济怎样分配',
      prompt: '课堂、救济名单和照料工作同时挤来。你不能全部亲自接住，只能决定组织重点。',
      options: [
        option('keep-core-classes', '优先维持少数连续课程', { knowledge: 3, fame: 2, relation: -1 }, 'shen-newwoman:1942:classes', '1942 年优先维持少数连续课程。', '同一批学生再次坐下来', '第二年，课程保住了连续性；无法入班的人转向了其他救济和学习网络。', { endingFact: true }),
        option('relief-first', '阶段性把人力先转向救济', { relation: 3, network: 3, health: -2 }, 'shen-newwoman:1942:relief', '1942 年阶段性将更多人力转向救济。', '课堂暂时变成物资登记处', '第二年，一部分课程恢复，另一些学生已经因迁移进入别处生活。', { endingFact: true }),
        option('share-leadership', '把课程和救济分别交给不同负责人', { network: 4, mind: 3, fame: -1 }, 'shen-newwoman:1942:share', '1942 年将课程与救济交由不同负责人协作。', '别人主持了一整天', '第二年，工作没有因你缺席而停止；共同网络更稳，也不再只按你的方法运转。', { endingFact: true })
      ],
    },
    {
      id: 'route-shen-refugee-1940', year: 1940, followYear: 1941, routes: ['shen-refugee'], title: '书箱、家口与临时课堂先接哪一头',
      prompt: '后方落脚有限。你可以先稳住家人住处、恢复临时课堂，或把力气放在分散亲友的通信上。',
      options: [
        option('family-shelter-first', '先稳住家口的长期住处', { position: 4, relation: 3, money: -3 }, 'shen-refugee:1940:shelter', '1940 年优先稳住家口在后方的长期住处。', '屋里终于有了固定放书的地方', '第二年，住处让家口稍有次序，也让迁回旧地变成更复杂的选择。', { endingFact: true }),
        option('temporary-class-first', '先恢复可持续的临时课堂', { knowledge: 3, fame: 3, health: -1 }, 'shen-refugee:1940:class', '1940 年优先恢复后方的临时课堂。', '学生带来了新的凳子', '第二年，课堂逐渐固定，学生和教师却仍来自不断变化的地址。', { endingFact: true }),
        option('correspondence-first', '先重建失散亲友与学校通信', { network: 4, relation: 2, money: -2 }, 'shen-refugee:1940:letters', '1940 年优先重建失散亲友和学校的通信网络。', '几封信终于接成一条线', '第二年，部分地址得到确认；另一些信退回，未知仍被保留在账本里。', { endingFact: true })
      ],
    },
    {
      id: 'route-shen-refugee-1944', year: 1944, followYear: 1945, routes: ['shen-refugee'], title: '后方会不会成为新的家',
      prompt: '旧家门仍在记忆里，后方也已有学生和工作。你可以定居、保留归返计划，或正式维持两处网络。',
      options: [
        option('settle-school-network', '把后方学校与住处当作主要落点', { position: 4, network: 2, relation: -1 }, 'shen-refugee:1944:settle', '1944 年将后方学校与住处逐渐确定为主要落点。', '战争结束时仍照常开课', '战后，课堂没有因“应该返乡”而自动关闭；旧家门仍通过信件进入生活。', { endingFact: true }),
        option('prepare-return', '保留归返旧家门和旧学校的准备', { money: -3, relation: 3, mind: 2 }, 'shen-refugee:1944:return', '1944 年持续准备战后试探归返旧家门与旧学校。', '一张重新核过的旧地址', '战后，你按旧地址试探联系，接回了部分关系，也确认有些生活已经无法原样恢复。', { endingFact: true }),
        option('maintain-two-bases', '明确维持后方与旧地两处网络', { network: 3, money: -4, mind: 3 }, 'shen-refugee:1944:two-bases', '1944 年明确维持后方与旧地两处生活网络。', '两边都有需要你回应的信', '战后，两处网络同时存在，也同时消耗钱、时间与照料；没有一边自动成为附属。', { endingFact: true })
      ],
    },
    {
      id: 'route-shanghai-heir-1929', year: 1929, followYear: 1930, routes: ['shanghai-heir'], title: '利润、工资与现金储备怎样排序',
      prompt: '一笔盈余只能优先用一次。继续添机器、稳定工钱，或留下现金，会让家业形成不同的抗风险方式。',
      options: [
        option('reinvest-machinery', '更新机器和生产条件', { money: -4, craft: 4, position: 2 }, 'heir:1929:machines', '1929 年将一笔盈余优先用于机器与生产条件。', '新机器进入车间', '第二年，产量和维修要求一起增加；工友是否得益仍取决于工钱与班次安排。', { endingFact: true }),
        option('stabilize-wages', '先补欠薪并稳定工钱', { money: -5, relation: 4, fame: 2 }, 'heir:1929:wages', '1929 年将一笔盈余优先用于补欠薪与稳定工钱。', '工钱表上少了一列欠款', '第二年，部分家庭因此接上日常；厂里的现金回旋余地也更小。', { endingFact: true }),
        option('hold-cash-reserve', '保留现金，应对订单和原料波动', { money: 4, relation: -2, mind: 2 }, 'heir:1929:cash', '1929 年将一笔盈余留作家业现金储备。', '账上留住的一笔钱', '第二年，这笔钱接住了原料波动；工友仍记得当时没有增加的工钱。', { endingFact: true })
      ],
    },
    {
      id: 'route-shanghai-heir-1942', year: 1942, followYear: 1943, routes: ['shanghai-heir'], title: '战时复工要承担哪一种后账',
      prompt: '复工并不等于恢复。你可以保核心工友、分散资产订单，或暂停生产，把损失直接记清。',
      options: [
        option('retain-core-workers', '缩小产量，尽量保住核心工友', { money: -5, relation: 4, position: 1 }, 'heir:1942:workers', '1942 年缩小生产规模，优先保留核心工友。', '更短的一张工友名单', '第二年，留下的人仍有班上；离开的人按自己的家口另找了路，不能被写成“全厂保住”。', { endingFact: true }),
        option('disperse-assets-orders', '把机器、账目和订单分散到多处', { craft: 3, network: 3, money: -3 }, 'heir:1942:disperse', '1942 年将部分机器、账目和订单分散安置。', '几处各不完整的账', '第二年，一处损失没有拖垮全部家业，分散的工友与账目也更难重新汇合。', { endingFact: true }),
        option('suspend-and-settle', '暂停部分生产，先结清可确认的工钱', { money: -6, fame: -1, relation: 3 }, 'heir:1942:suspend', '1942 年暂停部分生产，并先结清能够确认的工钱。', '暂时落锁的厂门', '第二年，厂门仍未完全恢复；结清的账减少了部分纠纷，也不能替失去的工作本身作补偿。', { endingFact: true })
      ],
    },
    {
      id: 'route-shanghai-newwoman-1929', year: 1929, followYear: 1930, routes: ['shanghai-newwoman'], title: '个人工作室怎样不被耗空',
      prompt: '教学、委托和互助名额都重要，但工作室需要房租和时间。你要选一个主要的生计支点。',
      options: [
        option('tuition-base', '用稳定课程承担主要房租', { money: 3, knowledge: 2, fame: 1 }, 'shanghai-newwoman:1929:tuition', '1929 年以稳定课程作为工作室的主要房租来源。', '课程表第一次排满一个月', '第二年，课程带来稳定收入，也让临时救济和个人委托更难插入。', { endingFact: true }),
        option('commission-base', '以有报酬的委托支撑个人工作', { money: 4, craft: 3, health: -1 }, 'shanghai-newwoman:1929:commission', '1929 年以有报酬的委托支撑个人工作。', '一笔按约结清的委托', '第二年，按约报酬让工作室继续存在；委托人的时间要求也挤压了其他工作。', { endingFact: true }),
        option('mutual-aid-slots', '保留固定互助名额，由网络分担成本', { relation: 3, network: 3, money: -2 }, 'shanghai-newwoman:1929:mutual', '1929 年为互助教学和照料保留固定名额。', '互助名额不再由一人决定', '第二年，徐云和唐慧贞分别调整了名额与条件，互助网络开始拥有自己的规则。', { endingFact: true })
      ],
    },
    {
      id: 'route-shanghai-newwoman-1942', year: 1942, followYear: 1943, routes: ['shanghai-newwoman'], title: '战时城市网络如何缩小而不断线',
      prompt: '诊所、疏散教育与个人工作都需要场地。你要决定哪种形式承担主要连续性。',
      options: [
        option('clinic-cooperation', '与附近诊所共用场地和名单', { network: 3, relation: 2, health: -2 }, 'shanghai-newwoman:1942:clinic', '1942 年与附近诊所建立了场地和名单分开的合作。', '同一张桌上的两套记录', '第二年，课程与医疗没有被混成一件事；合作接住了更多人，也增加了协调成本。', { endingFact: true }),
        option('evacuation-education', '把课程和人员分散到几个落脚处', { knowledge: 2, network: 4, money: -3 }, 'shanghai-newwoman:1942:evacuate', '1942 年将课程与人员分散到多个落脚处。', '几处不同版本的课程表', '第二年，部分课程仍能继续，各处也按自己的条件改变了内容和负责人。', { endingFact: true }),
        option('smaller-independent-work', '缩小公共项目，保住独立工作室', { money: 2, mind: 3, fame: -2 }, 'shanghai-newwoman:1942:small', '1942 年缩小公共项目，以保住独立工作和基本生计。', '门牌还在，开放时间变短了', '第二年，工作室仍在运转，无法继续承接的公共需求转向了其他网络。', { endingFact: true })
      ],
    }
  ];

  routeDecisions.forEach(installDecision);
})(typeof window !== 'undefined' ? window : globalThis);
