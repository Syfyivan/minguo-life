// 民国人生 · D38／D39／D41 战时支援、地方防护救济与公开公共服务完整领域包 v0.7.21
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before domain-expansion-wartime-relief-public-service.js');

  C.version = '0.7.21';

  var ROUTE_SUPPORT = 'southwest-wartime-relief-logistics';
  var ROUTE_DEFENSE = 'southwest-civil-defense-relief';
  var ROUTE_PUBLIC = 'tianjin-public-community-service';

  Object.assign(C.legacyRouteDomainMap, {
    'southwest-wartime-relief-logistics': 'D38',
    'southwest-civil-defense-relief': 'D39',
    'tianjin-public-community-service': 'D41',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-D38-RED-CROSS-TUYUNGATE': {
      label: '中国红十字会：救护总队与图云关',
      url: 'https://www.redcross.org.cn/html/2021-05/78436.html',
      supports: ['抗战救护体系中的医务、总务、运输、材料、会计、库员、运输站和伤病员服务'], status: 'source-reviewed-first-round',
    },
    'SRC-D38-RED-CROSS-120': {
      label: '中国红十字会：百廿载守人道初心',
      url: 'https://www.redcross.org.cn/html/2024-05/99082_1.html',
      supports: ['抗战救护、伤兵救治、医疗防疫、赈灾与战后转向社会服务的历史边界'], status: 'source-reviewed-first-round',
    },
    'SRC-D38-RED-CROSS-YANAN': {
      label: '中国红十字会：忆峥嵘岁月 谱人道华章',
      url: 'https://www.redcross.org.cn/html/2023-05/92833_1.html',
      supports: ['救护队、药品器械、伤员转送和跨地区医疗服务存在，但普通岗位与组织身份必须分开'], status: 'source-reviewed-first-round',
    },
    'SRC-D38-RED-CROSS-SHAANXI': {
      label: '中国红十字会：传承人道文化 弘扬延安精神',
      url: 'https://www.redcross.org.cn/html/2022-08/87880_1.html',
      supports: ['战时救护站、救护队、担架、自行车转运、医院分院与军民伤员收容'], status: 'source-reviewed-first-round',
    },
    'SRC-D39-CQ-AIR-DEFENSE-ARCHIVE': {
      label: '重庆市档案馆：重庆防空概况及空袭损害统计表',
      url: 'https://jda.cq.gov.cn/web/article/1494011077816893440/web/content_1494011077816893440.html',
      supports: ['1937—1942 年避难管制、救护、工务、消防、交通管制及空袭人员与房屋损失统计'], status: 'source-reviewed-first-round',
    },
    'SRC-D39-CQ-TUNNEL': {
      label: '重庆市档案馆：档案讲述大隧道惨案',
      url: 'https://jda.cq.gov.cn/web/article/web/content_1463122812620779520.html',
      supports: ['公共防空洞拥挤、通风、秩序、救护、善后、家属申诉与责任复核的现实后果'], status: 'source-reviewed-first-round',
    },
    'SRC-D39-CQ-SURVIVOR': {
      label: '重庆市档案馆：六五大隧道惨案幸存者呈文',
      url: 'https://jda.cq.gov.cn/web/article/1481691660260409344/web/content_1481691660260409344.html',
      supports: ['避难人数、通风、长时间警报、身体反应、拥挤踩踏与改良申诉'], status: 'source-reviewed-first-round',
    },
    'SRC-D39-CQ-GAZETTE': {
      label: '重庆地方志：重庆大轰炸时期防护团与紧急救济',
      url: 'https://dfz.cq.gov.cn/fzyd/qk/202311/P020220421356893113786.pdf',
      supports: ['防护团的避难、消防、救护、交通、消毒、配给岗位与空袭紧急救济机构'], status: 'source-reviewed-first-round',
    },
    'SRC-D41-WEITING-EDUCATION': {
      label: '苏州工业园区档案管理中心：唯亭民众教育馆',
      url: 'https://www.sipac.gov.cn/szdaglzx/yqfzwtzz/202102/533d148326e341cfa57498e12b49ce94.shtml',
      supports: ['1930 年民众教育馆、识字班、书报阅览、固定职员与有限经费'], status: 'source-reviewed-first-round',
    },
    'SRC-D41-XIETANG-CULTURE': {
      label: '苏州工业园区档案管理中心：斜塘民众教育馆与公共文化',
      url: 'https://www.sipac.gov.cn/szdaglzx/yqfzxtzz/202102/ff8ee5652a2747c28f28395c7b72d30d.shtml',
      supports: ['民众教育馆的夜校、阅报、卫生服务、试验农田、停办与战后恢复'], status: 'source-reviewed-first-round',
    },
    'SRC-D41-BEIJING-POPULAR': {
      label: '北京市文物局：京兆通俗教育馆',
      url: 'https://wwj.beijing.gov.cn/bjww/wwjzz/wwjapp/wwgs71/1757494/index.html',
      supports: ['1925 年通俗教育馆的讲演、游艺、图书、博物与公共体育空间'], status: 'source-reviewed-first-round',
    },
    'SRC-D41-TAIZHOU-CULTURE': {
      label: '台州史志网：民国时期民众教育馆与公共文化机构',
      url: 'https://tzsz.zjtz.gov.cn/art/2019/2/15/art_1229206667_54280373.html',
      supports: ['民众识字、图书借阅、文艺宣传、战时变化与 1949 后文化馆承接'], status: 'source-reviewed-first-round',
    },
  });

  Object.assign(C.routes, {
    'southwest-wartime-relief-logistics': {
      name: '战时伤病转送、物资与通信支援', family: 'southwestwarworkers',
      summary: '在非战斗岗位核伤病者身份与去向、车辆和担架班次、药械箱号、家属通知及通信回执；支援工作不自动生成军人、党籍、秘密交通或英雄身份。',
    },
    'southwest-civil-defense-relief': {
      name: '地方防护、火后清点与民众救济', family: 'southwestwarworkers',
      summary: '从公开警报、避难点、消防协助、伤病转介、临时住处、损失登记、物资领取与申诉做起；不提供现实消防、爆炸物或规避管制操作教程。',
    },
    'tianjin-public-community-service': {
      name: '公开公共服务、民众教育与社区事务', family: 'tianjinclerks',
      summary: '在识字班、书报阅览、代笔收件、卫生转介、场地排班、社区登记与投诉答复中逐项工作；公开服务、受薪职位、志愿劳动和政治组织身份互不自动生成。',
    },
  });

  var southwestPath = C.decisions.find(function (item) { return item.id === 'southwest-warworker-path'; });
  if (southwestPath && !southwestPath.options.some(function (item) { return item.id === 'f15-relief-logistics-trial'; })) {
    southwestPath.title = '五份有期限的训练与试工里哪一份成为第一段成年谋生';
    southwestPath.prompt = '仓储、维修、诊疗登记、伤病转送物资通信与地方防护救济都列出负责人、非战斗职责、工资、风险、结束日与下一步；家人在单位、会识字或参加公开训练都不等于已经录用。';
    southwestPath.options.push(
      { id: 'f15-relief-logistics-trial', label: '参加伤病转送、药械交接与家属通知的非战斗支援试工', route: ROUTE_SUPPORT, delta: { knowledge: 2, craft: 2, relation: 2 }, fact: '1943 年进入有伤病者、箱号、班次、回执与工资的非战斗支援试工。', endingFact: true },
      { id: 'f15-civil-defense-relief-trial', label: '参加公开避难点、火后清点与民众救济试工', route: ROUTE_DEFENSE, delta: { mind: 2, network: 2, relation: 2 }, fact: '1943 年进入有公开岗位、损失登记、物资领取与申诉的地方防护救济试工。', endingFact: true }
    );
  }

  var tianjinPath = C.decisions.find(function (item) { return item.id === 'tianjin-clerk-path'; });
  if (tianjinPath && !tianjinPath.options.some(function (item) { return item.id === 'public-community-trial'; })) {
    tianjinPath.title = '四份报名与试工里哪一份成为第一段成年谋生';
    tianjinPath.prompt = '商号、裁缝铺、邮务学校与民众教育公共服务都要分别报名、试做、核工资、权限和答复日；识字、熟人介绍或公开帮忙不等于取得职位。';
    tianjinPath.options.push({ id: 'public-community-trial', label: '去公开阅览、识字、代笔与社区事务处试做服务登记', route: ROUTE_PUBLIC, delta: { knowledge: 3, network: 2, relation: 1 }, fact: '1924 年进入有场地、开放时段、服务对象、工资与投诉答复的公开公共服务试工。', endingFact: true });
  }

  C.actions.push(
    { id: 'd38-person-transfer-register', name: '核一名伤病者的姓名、最后所在地、接收点和转送回执', routes: [ROUTE_SUPPORT], minAge: 13, spirit: 4, careerAction: true, delta: { knowledge: 3, relation: 2, health: -1 }, contactEffects: { d38_luo_wenxiu: { relation: 2 } }, note: '只记公开身份与接收答复；失联、转出、住院和死亡严格分开。' },
    { id: 'd38-vehicle-stretcher-roster', name: '重排车辆、担架、驾驶与随行人的公开班次', routes: [ROUTE_SUPPORT], minAge: 13, spirit: 3, careerAction: true, delta: { mind: 3, craft: 2, health: -1 }, contactEffects: { d38_zheng_shouren: { relation: 2 } }, note: '只呈现民用班次、承载与交接，不提供危险道路、战术或规避查验教程。' },
    { id: 'd38-medical-material-handoff', name: '按箱号核药械来源、封条、数量、领取人和缺损', routes: [ROUTE_SUPPORT], minAge: 13, spirit: 4, careerAction: true, delta: { knowledge: 3, craft: 3 }, contactEffects: { d38_he_yulan: { relation: 2 } }, note: '库员只能确认实物与交接，不能诊断、开药或把捐赠物变成个人资产。' },
    { id: 'd38-family-message-receipt', name: '把一封伤病通知的发出、收件、退回与未知分开', routes: [ROUTE_SUPPORT], minAge: 13, spirit: 3, careerAction: true, delta: { knowledge: 2, relation: 3 }, contactEffects: { d38_sun_jingyi: { relation: 2 } }, note: '通信只证明送达结果；不因退信补写死亡，也不提供隐蔽通信方法。' },
    { id: 'd38-rest-water-wage', name: '核一班支援人员的饮水、休息、工资与具名替班', routes: [ROUTE_SUPPORT], minAge: 13, spirit: 2, careerAction: true, delta: { health: 3, relation: 2, money: -1 }, contactEffects: { d38_fang_zhiheng: { relation: 2 } }, note: '人道工作也是劳动，女性、年轻人和志愿者都不是无限免费人手。' },
    { id: 'd38-error-correction', name: '发现错名、错箱或错去向后通知两端并保留原记录', routes: [ROUTE_SUPPORT], minAge: 14, spirit: 4, careerAction: true, delta: { mind: 4, fame: -1, relation: 2 }, contactEffects: { d38_luo_wenxiu: { relation: 1 } }, note: '更正不抹掉等待、误送、损耗和信任代价。' },
    { id: 'd38-civilian-scope-check', name: '拒绝用途和责任不明的任务，改接公开伤病与民生交接', routes: [ROUTE_SUPPORT], minAge: 14, spirit: 3, careerAction: true, delta: { mind: 4, position: -1 }, contactEffects: { d38_zheng_shouren: { relation: -1 } }, note: '系统不展示武器、破坏、秘密路线、跟踪或逃避检查细节。' },
    { id: 'd38-postwar-record-close', name: '把停运、归还、欠薪、失联与转入社会服务逐项结清', routes: [ROUTE_SUPPORT], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 3, knowledge: 2, money: 1 }, contactEffects: { d38_wu_mingzhen: { relation: 2 } }, note: '战事结束不等于所有人、物资和工资自动归位。' },

    { id: 'd39-shelter-capacity-register', name: '核公开避难点容量、开放时段、通风投诉和待修项', routes: [ROUTE_DEFENSE], minAge: 13, spirit: 4, careerAction: true, delta: { knowledge: 3, mind: 2, health: -1 }, contactEffects: { d39_peng_shuzhen: { relation: 2 } }, note: '只呈现登记、秩序与申诉，不提供现实防空设施建造或危险处置教程。' },
    { id: 'd39-alarm-neighbor-list', name: '按最后所在核老人、儿童、病者与分散家人的公开名单', routes: [ROUTE_DEFENSE], minAge: 13, spirit: 3, careerAction: true, delta: { relation: 3, mind: 2 }, contactEffects: { d39_liu_suying: { relation: 2 } }, note: '名单不证明政治态度；找到、受伤、失联和死亡各需独立确认。' },
    { id: 'd39-fire-aftermath-count', name: '警报解除后核一处火后房屋、住户、财物和已见损失', routes: [ROUTE_DEFENSE], minAge: 13, spirit: 4, careerAction: true, delta: { craft: 2, knowledge: 3, health: -1 }, contactEffects: { d39_qian_bohai: { relation: 2 } }, note: '只做解除警报后的公开清点和转介，不指导进入火场、灭火或处理爆炸物。' },
    { id: 'd39-temporary-housing', name: '给一户核临时床位、租期、用水、家口与拒绝项', routes: [ROUTE_DEFENSE], minAge: 13, spirit: 3, careerAction: true, delta: { relation: 3, network: 2, money: -1 }, contactEffects: { d39_zhou_biyun: { relation: 2 } }, note: '安置不生成产权；房东、住户、女性和孩子都有独立生活边界。' },
    { id: 'd39-relief-distribution', name: '把救济物资的捐入、审核、发出、未领和余项公开', routes: [ROUTE_DEFENSE], minAge: 13, spirit: 4, careerAction: true, delta: { relation: 3, mind: 2, money: -1 }, contactEffects: { d39_he_jinglan: { relation: 2 } }, note: '领取救济不换取服从、感恩或政治身份，未获名额也要有答复。' },
    { id: 'd39-injury-referral', name: '登记伤情陈述、具名医护复核、转诊点和家属通知', routes: [ROUTE_DEFENSE], minAge: 13, spirit: 3, careerAction: true, delta: { knowledge: 2, relation: 3 }, contactEffects: { d39_he_jinglan: { relation: 1 } }, note: '登记员不诊断，转介不等于获床位或已经治愈。' },
    { id: 'd39-complaint-review', name: '答复一宗避难、损失、救济或秩序申诉的复核人和日期', routes: [ROUTE_DEFENSE], minAge: 14, spirit: 3, careerAction: true, delta: { mind: 4, fame: 1 }, contactEffects: { d39_chen_shouxin: { relation: 2 } }, note: '官方记录、幸存者陈述与未知并列，不把机构叙述当作唯一事实。' },
    { id: 'd39-worker-recovery', name: '因烟尘、惊吓、失眠或劳损停班并安排接替', routes: [ROUTE_DEFENSE], minAge: 13, spirit: 2, careerAction: true, delta: { health: 3, mind: 2, money: -1 }, contactEffects: { d39_liu_suying: { relation: 1 } }, note: '救济与防护人员也会生病、休息、转岗或离开。' },

    { id: 'd41-literacy-class-roster', name: '核一班成人识字的时间、学费、照料与退出原因', routes: [ROUTE_PUBLIC], minAge: 14, spirit: 3, careerAction: true, delta: { knowledge: 3, relation: 2 }, contactEffects: { d41_xu_mingshu: { relation: 2 } }, note: '报名、到课、识字进展和退出分别记录，不把学员写成待改造材料。' },
    { id: 'd41-reading-room-circulation', name: '核书报来源、借阅、损坏、归还与读者请求', routes: [ROUTE_PUBLIC], minAge: 14, spirit: 3, careerAction: true, delta: { knowledge: 3, mind: 2 }, contactEffects: { d41_gao_shuying: { relation: 2 } }, note: '阅览记录不生成政治立场，读者可拒绝登记无关私人信息。' },
    { id: 'd41-letter-form-assistance', name: '按本人原意代写一封家信、申请或公开表格', routes: [ROUTE_PUBLIC], minAge: 14, spirit: 3, careerAction: true, delta: { knowledge: 2, relation: 3, money: 1 }, contactEffects: { d41_ma_yuzhen: { relation: 2 } }, note: '代笔人不能篡改意思、保证批准或保留原件占为己有。' },
    { id: 'd41-health-referral', name: '把一场卫生说明、本人同意、转介和未获服务分开', routes: [ROUTE_PUBLIC], minAge: 15, spirit: 3, careerAction: true, delta: { knowledge: 2, network: 2, relation: 2 }, contactEffects: { d41_lin_huiru: { relation: 2 } }, note: '公共服务员不诊断、不强迫治疗，游戏不提供现实医疗操作指引。' },
    { id: 'd41-room-schedule', name: '公开排阅览、识字、讲演、儿童活动和职员休息时段', routes: [ROUTE_PUBLIC], minAge: 15, spirit: 3, careerAction: true, delta: { mind: 3, network: 2 }, contactEffects: { d41_han_boan: { relation: 2 } }, note: '公共场地有限，未排到必须有理由、下次时间和申诉入口。' },
    { id: 'd41-community-case-register', name: '核一项住处、失学、失业或邻里求助的主体和转介结果', routes: [ROUTE_PUBLIC], minAge: 16, spirit: 4, careerAction: true, delta: { relation: 3, knowledge: 2 }, contactEffects: { d41_ma_yuzhen: { relation: 1 } }, note: '服务记录只限本人同意范围，不把家庭困难扩写成公开标签。' },
    { id: 'd41-staff-wage-rest', name: '核职员与志愿者的工资、工时、照料责任和退出', routes: [ROUTE_PUBLIC], minAge: 15, spirit: 2, careerAction: true, delta: { health: 3, relation: 2, money: -1 }, contactEffects: { d41_gao_shuying: { relation: 1 } }, note: '公共服务不是无限无薪劳动，女性职员也能晋升、休息或离开。' },
    { id: 'd41-public-complaint', name: '答复场地、资料、收费或服务态度投诉并保留异议', routes: [ROUTE_PUBLIC], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 4, fame: 1 }, contactEffects: { d41_zhou_dean: { relation: 2 } }, note: '公开机构可被投诉；申诉人不因提出异议失去其他服务资格。' }
  );

  var sourceIds = {
    support: ['SRC-D38-RED-CROSS-TUYUNGATE', 'SRC-D38-RED-CROSS-120', 'SRC-D38-RED-CROSS-YANAN', 'SRC-D38-RED-CROSS-SHAANXI'],
    defense: ['SRC-D39-CQ-AIR-DEFENSE-ARCHIVE', 'SRC-D39-CQ-TUNNEL', 'SRC-D39-CQ-SURVIVOR', 'SRC-D39-CQ-GAZETTE'],
    public: ['SRC-D41-WEITING-EDUCATION', 'SRC-D41-XIETANG-CULTURE', 'SRC-D41-BEIJING-POPULAR', 'SRC-D41-TAIZHOU-CULTURE'],
  };

  function opt(id, label, delta, result, next, extra) {
    return Object.assign({ id: id, label: label, delta: delta, result: result, next: next }, extra || {});
  }
  function installDomainDecisions(domain, field, family, route, rows) {
    rows.forEach(function (row) {
      var year = row[0];
      var options = row.slice(3).map(function (item) {
        var echo = domain.toLowerCase() + ':' + year + ':' + item.id;
        C.ordinaryEvents.push({
          id: 'echo-' + echo.replace(/:/g, '-'), title: row[1] + '：次年结果', text: item.next,
          year: year + 1, priority: 46, requiresEchoes: [echo], families: [family], routes: [route],
          sourceIds: sourceIds[field].slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
        });
        var runtimeOption = { id: item.id, label: item.label, delta: item.delta, echo: echo, fact: item.result, endingFact: true };
        if (item.enterpriseStart) runtimeOption.enterpriseStart = item.enterpriseStart;
        return runtimeOption;
      });
      C.decisions.push({ id: 'route-' + domain.toLowerCase() + '-' + year, year: year, routes: [route], title: row[1], prompt: row[2], options: options });
    });
  }

  var support = [
    [1944, '第一班伤病转送先核什么', '两名同名伤员、一辆临时车和三张去向不同的收件条同时到来；赶时间不能让人、车和接收点失去对应。',
      opt('person-first', '先核本人身份、伤情记录和愿意告知的家属', { relation: 3, knowledge: 2 }, '1944 年先按本人和具名记录建立转送条目。', '罗文秀核清两名同名者，各自得到不同接收点；一位不愿通知远亲的决定被保留。'),
      opt('receiving-first', '先向两处接收点确认床位和收件人', { network: 3, mind: 2 }, '1944 年先取得具名接收答复再排车。', '一处只接一人，另一处要求补伤情记录；车辆少跑一趟，但等待者多等半日。'),
      opt('separate-waiting', '先安置等待、补水与遮雨，未知去向另列', { health: 2, relation: 2, money: -1 }, '1944 年先改善等待并保留未知去向。', '三人都有休息和饮水，一张错误去向条被撤下；晚班再完成两人转送。')],
    [1945, '药械箱号与实物不一致怎样交接', '封条完整但箱内数量和旧单不合，接收点催着签全数。库员只能确认亲见实物，不能用战时紧急抹掉差额。',
      opt('recount-chain', '按箱号、封条、实物与每段经手人重核', { knowledge: 3, craft: 2 }, '1945 年重新核一批药械交接链。', '差额停在上一处重装记录；何玉兰签实收数量，缺项继续追查。'),
      opt('accept-known', '先收无争议部分，疑点箱封存待复核', { mind: 3, position: 1 }, '1945 年分开接收已核与待查药械。', '当日服务没有完全停下，疑点箱也未混入库存；第二天由具名库员复核。'),
      opt('return-unverified', '拒签整批全数，要求发出端重出交接单', { mind: 3, relation: -1, money: -1 }, '1945 年退回无法证明的全数签收。', '你少领一班交接费，发出端重开实数单；责任没有落到最后签字者一人身上。')],
    [1946, '战后救护体系缩编时谁先得到答复', '车辆、站点和岗位开始缩减；伤病者、领薪职员、临时工和仍在等待消息的家属需要不同答复。',
      opt('people-cases', '先把在途人、接收回执和家属通知结清', { relation: 4, mind: 2 }, '1946 年优先结清在途人员与通知。', '七人完成接收，二封退信保留最后地址；缩编没有把未回信者补成死亡。'),
      opt('wage-tools', '先核工资、车辆、担架、箱件和归还责任', { money: 2, knowledge: 3 }, '1946 年逐项清理工资和公物。', '三笔工资结清，一副担架转交社会诊疗点；个人没有带走单位车辆或捐赠物资。'),
      opt('social-service', '申请把部分公开岗位转入和平社会服务', { network: 3, position: 2 }, '1946 年申请转入公开社会救助工作。', '只获三个月试做，职责改为病者转介、物资清点和家属联络；旧职级未自动保留。')],
    [1947, '能否把交接经验变成一处民用服务点', '附近诊疗所与家属需要转送登记和物资代领，但车辆、药械、单位名单和旧关系都不能私有化。',
      opt('remain-waged', '继续受薪做社会服务转送与物资登记', { money: 2, position: 2 }, '1947 年继续受薪承担公开转送登记。', '吴明真给出月薪、班次和转介范围；你没有取得车辆、诊断或审批权。'),
      opt('bounded-desk', '与孙静宜建立有限转送登记与家属联络案桌', { money: -4, network: 2, relation: 2 }, '1947 年建立有限民用转送登记服务案桌。', '两名雇员只做公开登记、预约、回执和家属联络；首月一件退信按原路退回。', { enterpriseStart: { id: 'd38-civilian-transfer-desk', name: '重庆合成静安转送登记案桌', domainKey: 'D38', kind: 'bounded-civilian-transfer-and-family-contact-desk', workplace: '重庆合成诊疗点旁租用案桌', product: '有委托、接收点、公开班次、回执与退信记录的民用转送登记和家属联络', employees: 2, partners: [{ personId: 'contact:d38_sun_jingyi', role: '有独立工资、书信劳动与退伙权的有限合伙人' }], asset: { id: 'd38-desk-tools', kind: 'personal-ledgers-tags-bicycle', description: '自购账册、号签、文具与一辆登记自行车' }, debt: { id: 'd38-opening-wage-credit', creditor: '具名房东与文具商', purpose: '案桌押金、文具和首月雇员工资' }, license: { id: 'd38-public-service-record', kind: 'documented-civilian-service-record', authority: '重庆合成街区公开经手人', scope: '只限民用预约、转送登记和家属联络，不含诊断、药品处置、军用运输或秘密通信' } } }),
      opt('leave-field', '交清记录后转一般仓务或社区代笔', { mind: 2, money: 1, health: 2 }, '1947 年有记录地离开战时支援领域。', '旧回执归档，欠薪获得书面答复；你从一份有期限民生岗位重新开始。')],
    [1948, '远方退信和未确认失联怎样保存', '三封家属通知退回，一名旧同事多年无消息。有人要求为清册方便统一写成死亡。',
      opt('last-known', '保存最后已知地址、日期与退回原因', { knowledge: 3, mind: 3 }, '1948 年保留退信与失联的最后已知事实。', '两人后来换址回信，一人仍未知；清册没有替任何人补写死亡。'),
      opt('second-channel', '只通过公开登记处和具名亲友再核一次', { network: 3, money: -1 }, '1948 年经第二条公开渠道复核失联。', '一份相容消息确认人在异地工作，另外两份没有新答复；没有使用隐蔽追踪。'),
      opt('close-service-not-life', '结束本处寻找服务，但不结束当事人生命事实', { mind: 4, relation: -1 }, '1948 年将三项服务标为暂时停止而非死亡。', '家属取回抄件并保留以后重开权；服务结束和生命状态继续分开。')],
    [1950, '新阶段怎样重新核岗位与服务对象', '旧救护名册、现行社会服务、工资和住处开始重新登记；一张旧证不能证明当前职责。',
      opt('requalify', '按现行范围重新试做转送与登记', { knowledge: 3, position: 2 }, '1950 年通过现行公开服务试做。', '你被留作转介登记员，月薪和住处另签；旧职级没有自动恢复。'),
      opt('community-health', '转社区诊疗联络与病者家属服务', { relation: 3, network: 2 }, '1950 年转入社区健康联络工作。', '工作只到预约、地址和家属沟通，医护人员继续负责判断和处置。'),
      opt('records-close', '只做旧记录整理并逐步离开一线', { mind: 3, health: 2 }, '1950 年转做旧记录与未结回执整理。', '你少上夜班，把十七项未知保留原状；三个月后另找公开文书岗位。')],
    [1952, '一次错送已经造成等待怎样补救', '姓名相近导致一份转送通知送错接收点，当事人多等了一日，纸面更正不能撤回实际代价。',
      opt('notify-both', '立即通知两端、当事人与家属并安排补送', { relation: 3, fame: -1, money: -1 }, '1952 年公开更正一次错送。', '当事人抵达正确地点，误送原因与多付费用分别记下；机构退回一部分服务费。'),
      opt('independent-review', '请未参与原交接的人重核流程', { mind: 4, knowledge: 2 }, '1952 年由独立同事复核错送。', '发现同名栏和接收点缩写都不清，表样被修改；你的责任没有消失，也没有扩大成全部责任。'),
      opt('client-choice', '让当事人决定继续、改点或停止服务', { relation: 4, position: -1 }, '1952 年由当事人决定错送后的下一步。', '她选择改去较近地点并取回原件；服务点失去一笔收入，保留了她的决定权。')],
    [1954, '同事连续夜班后身体撑不住', '方志恒咳嗽、腰痛又失眠，负责人想让孙静宜无薪补班。支援传统不能成为无限劳动理由。',
      opt('paid-cover', '请具名临时工领薪补两班', { money: -2, health: 2, relation: 3 }, '1954 年用有薪替班保住服务。', '方志恒休息一周，临时工拿到两班工资；孙静宜保留自己的家庭时间。'),
      opt('reduce-service', '缩短开放时间并通知所有预约者', { health: 3, fame: -1, mind: 2 }, '1954 年主动缩短转送登记时段。', '两户改期，一户转往别处；服务没有靠隐瞒缺人继续。'),
      opt('shared-roster', '全体只报能做时段后重排轮班', { relation: 3, network: 2 }, '1954 年按每个人实际能力重排班次。', '男职员也承担代笔与清洁，女职员不再默认守夜；下月复核工资。')],
    [1958, '服务对象把你当成能决定床位的人', '熟人请求你保证接收并先收谢礼，但你只有登记和联络权限。',
      opt('state-boundary', '说明权限并退回礼物，照常登记等待', { fame: 2, mind: 3, money: -1 }, '1958 年公开说明接收权限边界。', '对方仍等待具名机构答复；你没有因熟人取得床位或好处。'),
      opt('other-options', '列出两处公开转介点与各自答复条件', { network: 3, relation: 2 }, '1958 年提供多个公开转介选择。', '一处收件、一处要求补件；当事人自己决定先去哪一处。'),
      opt('withdraw', '因私人关系回避，由同事接手', { mind: 4, relation: -1 }, '1958 年回避熟人转送事项。', '同事按同一程序登记；关系一度尴尬，但服务记录没有被私情改写。')],
    [1963, '多年回执怎样交给后来的人', '旧纸张、现行登记和当事人口述存在差异；晚年经验不能靠口头威望取代原件。',
      opt('annotated-index', '做一份标明来源、冲突和未知的索引', { knowledge: 3, mind: 3 }, '1963 年完成可追查的回执索引。', '后来职员能找到原件、抄件和冲突处；未知继续是未知。'),
      opt('teach-cases', '用三宗匿名合成案例带教边界', { knowledge: 2, relation: 3 }, '1963 年开始带教登记与更正。', '新人学会不补死亡、不替医护判断、不把退信当拒绝；真实当事人资料没有公开。'),
      opt('return-records', '把不再需要留存的私人原件逐件归还', { relation: 3, fame: 1 }, '1963 年归还一批私人原件。', '五户签收，一户地址未知继续封存；归还没有被写成销毁。')],
    [1970, '体力下降后怎样留在职业里', '夜班和长距离转送已经超过身体承受，继续做不等于继续做同一强度。',
      opt('lighter-review', '改做白天回执复核与新人答疑', { health: 3, knowledge: 2 }, '1970 年转为轻量复核岗位。', '工资下调一档，夜班停止；你仍对自己签过的复核负责。'),
      opt('part-time-contact', '每周两日处理家属联络与退信', { health: 2, relation: 2, money: -1 }, '1970 年改为每周两日家属联络。', '三封信得到新地址，一封仍退回；其余时段留给休息和家人。'),
      opt('retire-handover', '完成具名交接后退休', { health: 4, position: -2, mind: 2 }, '1970 年完成有记录退休。', '工具、档案和未结事项各有接手人；退休没有让旧工作或同事消失。')],
    [1978, '晚年有人请你为旧同事补写英雄传', '一份纪念册想把所有旧同事写成同一身份和结局，但你只知道各人的岗位与最后消息。',
      opt('fact-only', '只写可证岗位、年份与最后消息', { mind: 3, fame: 1 }, '1978 年留下有限而可证的支援记录。', '有人被写作库员、司机、文书或照护者；未知结局没有被补成牺牲。'),
      opt('multiple-voices', '邀请当事人和家属分别写自己的版本', { relation: 3, network: 2 }, '1978 年收集多份互不代签的回忆。', '同一件事出现不同记忆，纪念册保留分歧与来源。'),
      opt('decline-label', '拒绝替所有人统一定性，只归还资料', { mind: 4, fame: -1 }, '1978 年拒绝统一英雄化旧同事。', '资料按所有人归还，空白仍为空白；你的职业不被改写成秘密或战斗身份。')]
  ];

  var defense = [
    [1944, '第一处公开避难点怎样登记容量', '洞内拥挤、有人携带行李、病弱者需要近出口位置；容量不是墙上一笔随时能改大的数字。',
      opt('count-zones', '按可用区域、通风投诉和人员需要分开登记', { knowledge: 3, mind: 2 }, '1944 年完成第一份避难点容量记录。', '彭淑珍把一处封闭角落列为不可用，实际容量下调；老人和病者位置另核。'),
      opt('timed-entry', '按公开时段与现场人数停止继续放入', { mind: 3, relation: -1 }, '1944 年按实际容量暂停售入。', '后来者转向第二处公开地点；有人不满，申诉和当班人都留下。'),
      opt('complaint-first', '先记录呼吸困难、拥挤与出口受阻投诉', { relation: 3, health: 1 }, '1944 年先处理避难者身体与秩序投诉。', '两人转出，一处堆物被清走；投诉没有被写成不守纪律。')],
    [1945, '火后清点能否把一条街写成全毁', '警报解除后，同一排房有烧毁、进水、门窗破损、住户失联和暂未查看五种情况。',
      opt('household-list', '逐户核住户、房屋和已见损失', { knowledge: 3, relation: 2 }, '1945 年逐户完成火后损失初核。', '三户确认损毁，两户可住，一户暂未进入；报告没有用“全毁”吞掉差异。'),
      opt('people-before-property', '先核人员和临时住处，再清财物', { relation: 4, money: -1 }, '1945 年先确认人员与安身。', '失联者在另一避难点找到，周碧云同意临时借一间屋；财物清点次日继续。'),
      opt('seen-only', '只登记亲眼所见，口述损失另列待核', { mind: 3, fame: -1 }, '1945 年区分已见与住户口述损失。', '赔助申请多一道复核，但没有把估数伪装成清单。')],
    [1946, '紧急救济结束后未领物资怎么办', '名单中有人搬走、有人重复登记、有人从未接到通知，余下物资不能被经手人私分。',
      opt('second-notice', '按公开地址再通知一次并设截止日', { relation: 3, network: 2 }, '1946 年对未领救济完成第二次通知。', '四户领到，两户退信，一户放弃；余项继续封存到公布日期。'),
      opt('appeal-window', '开一次具名申诉与更正时段', { mind: 3, relation: 3 }, '1946 年开放救济名册申诉。', '一户错名被更正，一项重复登记撤销；提出异议没有使人失去资格。'),
      opt('public-remainder', '公布余项并移交另一公开救济处', { knowledge: 2, fame: 2 }, '1946 年公开移交未领物资。', '数量、封条和接收人一致；旧机构没有把余粮带走。')],
    [1947, '地方防护经验怎样转为常态服务', '警报减少以后，住处、火灾善后、伤病转介和困难救济仍存在；旧权力不能无限延续。',
      opt('municipal-relief', '转入公开民众救济与住处登记岗位', { position: 2, money: 2 }, '1947 年转入受薪民众救济登记。', '职责改为收件、转介、答复和申诉；没有保留战时管制权限。'),
      opt('relief-coop', '与刘素英建立有限住处与救济转介服务组', { money: -3, relation: 3 }, '1947 年建立有限公开转介服务组。', '一名雇员按月领薪，只做住处信息、代写、转介和回执；不掌握救济审批或居民名单权力。', { enterpriseStart: { id: 'd39-relief-referral-group', name: '重庆合成素安住处救济转介组', domainKey: 'D39', kind: 'bounded-housing-relief-referral-group', workplace: '重庆合成街区公开服务间', product: '有本人委托、公开地址、转介点、答复、费用和申诉记录的住处与救济转介', employees: 1, partners: [{ personId: 'contact:d39_liu_suying', role: '有工资、家庭照料与退出权的有限合伙人' }], asset: { id: 'd39-service-tools', kind: 'personal-desk-ledgers-notice-board', description: '自购桌椅、账册、文具与公开告示板' }, debt: { id: 'd39-opening-rent-credit', creditor: '具名房东', purpose: '房租押金、告示材料和首月雇员工资' }, license: { id: 'd39-referral-record', kind: 'documented-public-referral-record', authority: '重庆合成街区公开经手人', scope: '只限代写、公开住处信息和救济转介，不含消防处置、救济审批、强制安置或居民控制' } } }),
      opt('ordinary-work', '交还名单与物资，转一般房屋或仓务工作', { health: 2, money: 1 }, '1947 年完成交接后离开防护救济岗位。', '所有名单、余物与未结申诉均有接手人；你不再以旧身份干预街区。')],
    [1948, '一宗避难点伤害申诉如何保存不同说法', '幸存者、当班人员与机构记录对人数、开门和通风时间说法不同，不能只留最有权者的版本。',
      opt('parallel-records', '把三种陈述并列并标明来源', { knowledge: 3, mind: 3 }, '1948 年保留多方避难申诉记录。', '复核没有得出所有细节，但确认两项管理缺口和一项待核责任。'),
      opt('survivor-needs', '先答复医疗、家属和材料取回需求', { relation: 4, money: -1 }, '1948 年先处理幸存者现实需要。', '两份材料归还，一项诊疗转介完成；责任调查继续，服务没有要求先放弃申诉。'),
      opt('external-review', '交给未参与当班的具名人员复核', { network: 3, fame: -1 }, '1948 年由外部人员复核避难申诉。', '当班表与幸存者陈述对上部分事实；机构公开更正一处人数记录。')],
    [1950, '制度变化后旧救济申请怎样重核', '旧名册、现住址、当前困难和已经领过的物资分属不同时间，不能一键继承或一笔作废。',
      opt('person-by-person', '按本人、住址、当前需要与已领事实逐户重核', { relation: 3, knowledge: 3 }, '1950 年逐户重核旧救济事项。', '九户得到新答复，三户已搬离，两户未知；过去受助没有自动取消新申请。'),
      opt('close-old-open-new', '结清旧机构账，允许本人另提新申请', { mind: 3, position: 1 }, '1950 年区分旧账结清与新申请。', '旧余物完成移交，新表格由本人重新填写；旧经手人不替新机构批准。'),
      opt('housing-first', '先核无住处和伤病者的临时安排', { relation: 4, money: -2 }, '1950 年优先处理紧迫住处与伤病转介。', '两户获得限期床位，一户转诊；其余申请保留明确答复日。')],
    [1952, '救济名额少于需要时怎样给答复', '四户情况都困难，只有两份临时补助；工作人员不能凭顺眼或熟人私分。',
      opt('published-criteria', '公开当前条件、材料、复核人与期限', { mind: 3, fame: 2 }, '1952 年按公开条件审核有限补助。', '两户获准，一户补件，一户未获并得到申诉日；没有人被写成不值得帮助。'),
      opt('rotate-support', '把部分实物改为有期限轮换使用', { relation: 3, network: 2 }, '1952 年形成有限轮换支持。', '三户分期使用床具与炊具，一户选择不参加；物品所有权仍在公开账。'),
      opt('refer-others', '把未获者转向两处有独立答复的机构', { network: 3, knowledge: 2 }, '1952 年完成未获救济的具名转介。', '一处收件、一处额满；转介没有被写成已经获得帮助。')],
    [1954, '火后住户与房主对修复责任意见相反', '房主只愿修屋顶，住户要求处理进水和临时租金；服务人员不能替任何一方裁决产权。',
      opt('document-duties', '列租约、已见损失、各方承诺与未决项', { knowledge: 3, mind: 2 }, '1954 年形成可追查的房屋善后记录。', '房主修屋顶，住户承担自有物清理；临时租金争议转有权处答复。'),
      opt('voluntary-mediation', '只组织一次自愿会谈并允许退出', { relation: 3, network: 2 }, '1954 年完成一次自愿房屋协调。', '双方同意一项临时修补，对赔付仍有分歧；未同意没有被写成达成协议。'),
      opt('alternate-bed', '先为住户核七天临时床位', { relation: 4, money: -1 }, '1954 年先处理短期安身。', '七天床位得到确认，之后是否续住另答复；临时入住不产生房屋产权。')],
    [1958, '公开名单是否能拿去甄别人', '有人要求用旧避难与救济名单判断居民态度和关系。名单只证明一次服务，不证明政治立场。',
      opt('refuse-purpose', '拒绝超出原目的使用并记录请求', { mind: 4, position: -1 }, '1958 年拒绝把救济名单改作甄别。', '名单继续只用于未结服务；提出要求的人得到书面权限答复。'),
      opt('minimum-data', '只提供无个人身份的数量统计', { knowledge: 3, mind: 2 }, '1958 年仅提供去身份统计。', '公开的是领取与未领数量，不含住址、家庭和意见；个案仍受保护。'),
      opt('return-destroy-rule', '按保管规则归还或销毁已结副本', { mind: 3, relation: 2 }, '1958 年清理超期救济副本。', '原件由有权机构保留，服务组副本按清单处理；没有偷偷复制。')],
    [1963, '旧损失记录出现错名怎样更正', '一位居民多年后发现房损登记写错门牌，过去补助已结，今天仍需要留下事实更正。',
      opt('append-correction', '保留原记录并附具名更正说明', { mind: 4, fame: 1 }, '1963 年完成一宗历史记录更正。', '门牌与本人陈述得到更新，旧补助结果未被伪造重开；后人能看见改动过程。'),
      opt('evidence-review', '核旧票据、邻户陈述和现有档案', { knowledge: 3, relation: 2 }, '1963 年复核一宗旧房损材料。', '三项材料相容，一处数字仍未知；更正只到可证范围。'),
      opt('refer-compensation', '说明本处不能决定补偿并转有权窗口', { network: 2, mind: 3 }, '1963 年把更正与补偿权限分开。', '窗口收件但未承诺结果；居民取回完整抄件。')],
    [1970, '长期接触灾后故事造成失眠', '你开始反复梦见拥挤、失火和失联名单，工作身体史不能只写“坚持多年”。',
      opt('reduce-cases', '减少直接个案，改做档案复核', { health: 3, knowledge: 2 }, '1970 年因身心负担转为记录复核。', '工资下降一档，夜间惊醒逐步减少；新同事接手当面服务并另计工时。'),
      opt('peer-support', '与同事约定定期复盘和具名替班', { health: 2, relation: 3 }, '1970 年建立同事间有边界的支持。', '两人各减少一班，困难个案不再由一人长期背负。'),
      opt('retire', '交清未结申诉后退休', { health: 4, position: -2 }, '1970 年从地方救济工作退休。', '八项申诉有接手人与日期；退休没有被写成遗弃居民。')],
    [1978, '晚年怎样讲述防护与救济', '年轻人问起那段经历，你既不想只讲英雄，也不能抹去侵略、死亡、机构失误和普通人的申诉。',
      opt('people-records', '从具体住户、工作人员和幸存者记录讲起', { knowledge: 2, relation: 3 }, '1978 年留下以具体人为中心的防护救济回忆。', '叙述保留受害、救助、失误与申诉；不同人物没有合并成一个口号。'),
      opt('archive-sources', '把个人记忆与公开档案分别标注', { mind: 3, knowledge: 3 }, '1978 年完成来源分开的晚年记录。', '哪些亲见、哪些听说、哪些来自档案一目了然；不确定处没有补全。'),
      opt('decline-glory', '拒绝接受统一表彰，只提供事实清单', { mind: 4, fame: -1 }, '1978 年拒绝把职业改写成单一荣耀。', '清单留下岗位、工资、受伤、休息和服务对象；组织身份没有自动生成。')]
  ];

  var publicService = [
    [1925, '第一班成人识字怎样排得进真实生活', '马玉真在店里做工还照料孩子，周德安夜班后才有空；同一张课表会把不同人挡在门外。',
      opt('two-shifts', '开两个短时段并各自登记缺课原因', { knowledge: 3, relation: 2, money: -1 }, '1925 年建立早晚两段识字班。', '马玉真参加午后班，周德安进夜班；两人各缺一次课，原因没有写成懒惰。'),
      opt('learner-schedule', '先让学员报能来时段再排课', { relation: 3, mind: 2 }, '1925 年按学员实际时间排班。', '十二人中九人能进固定班，三人选择以后再来；报名没有变成强制。'),
      opt('workplace-class', '去两处工作场各办一次短课', { network: 3, health: -1 }, '1925 年试办工作场短时识字课。', '一处东家同意、一处拒绝；服务范围以实际答复为准。')],
    [1927, '书报阅览该登记到什么程度', '管理者想留下每位读者姓名、住址、所读内容和意见，以便证明工作成绩。',
      opt('minimum-register', '只记借还与必要联系方式', { mind: 3, knowledge: 2 }, '1927 年采用最少必要阅览登记。', '读者只在外借时留回收地址；在室阅读不登记私人意见。'),
      opt('reader-choice', '让读者选择匿名阅览或实名外借', { relation: 3, knowledge: 2 }, '1927 年建立可选的阅览与外借规则。', '匿名阅览人数增加，外借仍能追回；阅读没有被解释成政治立场。'),
      opt('public-counts', '只公布人数、时段与书报类别统计', { fame: 2, mind: 2 }, '1927 年只发布去身份服务统计。', '经费申请得到一部分支持，个人名单没有随报告流出。')],
    [1929, '代笔时家属要求改掉本人原意', '马玉真要写信拒绝一门婚事，兄长却要求代笔人改成暂缓并留下见面承诺。',
      opt('person-words', '按马玉真本人确认的意思写并当面念回', { relation: 4, mind: 2 }, '1929 年按本人意思完成一封代笔信。', '马玉真签认后取走信，兄长不满；代笔人没有取得她的婚姻决定权。'),
      opt('private-session', '另约不受打断的时段让本人重述', { relation: 3, money: -1 }, '1929 年为委托人保留独立代笔时段。', '她删去一处过激措辞但保留拒绝；修改来自本人而非家属。'),
      opt('decline-conflict', '因家属持续干预而停止代写并归还材料', { mind: 3, relation: -1 }, '1929 年停止一宗无法保住本人原意的代笔。', '马玉真取回草稿另找可信人；服务停止没有被写成她同意兄长。')],
    [1931, '经费不足先关什么服务', '房租、职员工资、书报、照明、儿童时段和卫生说明同时要钱，负责人想先拖欠女职员工资。',
      opt('wages-first', '先足额发工资，再缩短开放时间', { relation: 3, money: -2, fame: -1 }, '1931 年保工资并缩短公共开放。', '高淑英拿到工资，阅览每周少两晚；停开的具体时段提前公布。'),
      opt('transparent-budget', '公开预算让使用者与职员提出取舍', { mind: 3, network: 2 }, '1931 年举行一次有异议的预算会议。', '书报减少一类、照明不减、儿童时段保留；一项提案未通过也写进记录。'),
      opt('temporary-fees', '只对能承担者收有限外借押金并设减免', { money: 2, relation: -1 }, '1931 年试行有减免的外借押金。', '七人缴纳、五人减免、两人改室内阅读；收费没有变成普遍门槛。')],
    [1933, '卫生说明能否替本人决定服务', '一场公开卫生活动后，工作人员想按到场名单统一安排处置；到场、听懂、同意、转介和实际接受并不是一回事。',
      opt('consent-record', '逐人确认是否愿意接受公开转介', { relation: 3, knowledge: 2 }, '1933 年逐人记录卫生服务同意。', '九人愿意、三人拒绝、两人只取说明；没有人因拒绝失去阅览资格。'),
      opt('questions-first', '先开具名医护答疑，再决定是否登记', { network: 3, knowledge: 2 }, '1933 年先由医护回答卫生疑问。', '林惠如说明服务范围与风险，公共事务员不诊断；第二天才开放自愿登记。'),
      opt('information-only', '本处只提供说明和地点，不保留个人名单', { mind: 3, fame: 1 }, '1933 年只做卫生信息服务。', '居民自行前往或不前往；服务效果不能从发出多少传单推定。')],
    [1935, '女职员能否负责公开讲演与场地', '高淑英一直做排班和材料，却被要求只坐内桌，由男性临时人员代表她说明工作。',
      opt('actual-responsibility', '按实际职责让高淑英主持并列名', { relation: 3, fame: 1 }, '1935 年由实际负责人主持公开活动。', '她得到主持工资和署名，临时男职员负责自己承担的秩序工作。'),
      opt('shared-roles', '两人分别说明材料与场地，不互相代领贡献', { network: 2, relation: 2 }, '1935 年按实际劳动分列公开职责。', '听众知道谁核材料、谁排场地；女性职员没有被藏在集体名义后。'),
      opt('written-credit', '若外部不接受主持，至少在记录中保留真实负责人', { mind: 3, fame: -1 }, '1935 年保留女性职员实际贡献记录。', '现场仍由别人主持，但工资、材料和决定都署高淑英；门槛没有被说成能力不足。')],
    [1937, '占领与战事中公共场所怎样缩减', '书报、人员、租屋和使用者住址都在变化；继续开放、暂时关闭和转做救济服务各有代价。',
      opt('limited-open', '只在白天开放阅览、代笔与公开通知', { knowledge: 2, health: 1, money: -1 }, '1937 年缩时保留公开民生服务。', '开放从六晚改为三天，所有人按新时段自愿来；没有隐藏活动。'),
      opt('close-safely', '归还外借物与私人材料后暂时闭馆', { mind: 3, position: -2 }, '1937 年有清单地暂时关闭公共服务处。', '二十三册书和七份私人材料归还，三项未知另列；职员分别寻找住处。'),
      opt('relief-desk', '转为公开代笔、失联登记与救济转介案桌', { relation: 3, network: 2 }, '1937 年把场地转作公开民生转介。', '只接公开地址、家信、收件与救济信息，不从读者名单推政治身份。')],
    [1939, '有人要求从读者名单判断立场', '借阅与识字记录只能说明一次公共服务，却被要求拿来给每个人贴政治标签。',
      opt('refuse-inference', '拒绝用阅读记录推定政治态度', { mind: 4, position: -1 }, '1939 年拒绝把阅览记录改作政治甄别。', '机构承受压力，只提供公开服务数量；个人所读内容没有外流。'),
      opt('data-boundary', '按原规则归还、封存或清理不必要名单', { mind: 3, knowledge: 2 }, '1939 年按原目的清理服务记录。', '外借账保留到归还，已结代笔草稿交本人；没有秘密备份。'),
      opt('leave-role', '交清资料后离开有越权要求的岗位', { health: 1, money: -2, mind: 3 }, '1939 年因资料用途冲突离开原岗位。', '高淑英接收公开书报账，你转一般校务代写；离开不自动生成秘密身份。')],
    [1941, '公共场所被要求只传播一种声音', '场地许可、工资和安全都受到影响；职员既不能假装没有压力，也不能把所有使用者写成一致。',
      opt('service-not-endorsement', '只保留识字、代笔、公开通知与生活信息', { mind: 3, relation: 2 }, '1941 年收缩到可说明的民生服务。', '部分活动停止，读者仍能自愿使用基本服务；场地存在不等于使用者赞同所有内容。'),
      opt('record-pressure', '保留谁提出要求、改了什么与谁反对', { knowledge: 3, fame: -1 }, '1941 年记录公共机构所受压力。', '一项异议被留下，两名职员选择离开；没有写成全体同意。'),
      opt('temporary-close', '无法保住服务边界时暂时关闭', { position: -2, health: 2 }, '1941 年暂时关闭公共场所。', '工资停发和资料归还都有记录；学员自行决定另找夜校或暂停。')],
    [1943, '能否建立一处独立公开服务案桌', '住户需要代笔、阅览、识字和转介，但旧机构书报、名册、场地和招牌都不是个人资产。',
      opt('remain-staff', '继续做有工资和申诉制度的公共事务员', { money: 2, position: 2 }, '1943 年继续受薪做公开公共服务。', '职责、工资与开放时段写清；志愿活动另计，不要求职员无限补班。'),
      opt('bounded-desk', '与高淑英建立有限阅览代笔与转介案桌', { money: -4, relation: 3, network: 2 }, '1943 年建立有限公开社区服务案桌。', '两名雇员按月领薪，旧机构书报和名单全部交还；案桌只使用自购书报、文具和公开信息。', { enterpriseStart: { id: 'd41-reading-writing-desk', name: '天津合成淑清阅览代笔案桌', domainKey: 'D41', kind: 'bounded-reading-writing-public-referral-desk', workplace: '天津合成里院临街租用小屋', product: '有来源、开放时间、借还、本人委托、收费、转介、投诉和退出记录的阅览代笔公共服务', employees: 2, partners: [{ personId: 'contact:d41_gao_shuying', role: '有独立工资、材料贡献、署名与退伙权的有限合伙人' }], asset: { id: 'd41-desk-assets', kind: 'personal-books-desks-stationery', description: '两方自购并列明所有人的书报、桌椅、灯具和文具' }, debt: { id: 'd41-opening-wage-rent', creditor: '具名房东与书报供货人', purpose: '房租押金、首批书报与两名雇员工资' }, license: { id: 'd41-public-service-registration', kind: 'documented-public-service-record', authority: '天津合成里院公开经手人', scope: '只限阅览、识字、本人授权代笔和公开转介，不含教育证书、行政审批、政治组织或秘密联络权限' } } }),
      opt('mobile-service', '只带自有材料在两处里院定期服务', { network: 3, health: -1, money: 1 }, '1943 年改做有固定时段的流动公共服务。', '两个点各每周一天，使用者知道收费和下一次日期；没有固定馆舍也不是无限随叫随到。')],
    [1946, '战后公共服务如何恢复而不补连续性', '旧职员、读者、书报、租屋和经费都需重新确认，过去来过的人不自动成为现在的服务对象。',
      opt('inventory-consent', '先核书报、职员、场地和使用者是否愿意返回', { knowledge: 3, relation: 2 }, '1946 年逐项重建公共服务。', '三名职员中两人返回，书报找回一半，二十名旧学员中九人重新报名。'),
      opt('needs-survey', '逐户问当前最需要识字、代笔、阅览还是转介', { network: 3, relation: 3 }, '1946 年完成有限社区服务需求调查。', '回答只代表实际受访者，拒答和不在家另列；开放时段据此调整。'),
      opt('new-rules', '先公开工资、资料、投诉和退出规则', { mind: 4, position: 1 }, '1946 年以新规则恢复公共场所。', '女性职员工资、读者隐私和投诉日写入告示；一项收费提议未通过。')],
    [1948, '机构更替前怎样交清人、物和未结服务', '公共教育与社区机构可能改组、停办或另设；一块新招牌不能自动接收所有读者资料和职员关系。',
      opt('item-handover', '按书报、工资、委托、借还和投诉具名移交', { mind: 4, knowledge: 2 }, '1948 年完成公开服务逐项交接。', '新接手人只接现有书报与未结服务，私人草稿归本人；旧职位未自动延续。'),
      opt('people-decide', '让职员与使用者分别决定续用、退出或等待', { relation: 4, network: 2 }, '1948 年逐人记录公共服务去留。', '有人继续、有人另找工作、有人不再使用；事务员没有替社区统一表态。'),
      opt('close-cases', '优先完成代笔、借还、工资和申诉答复', { relation: 3, mind: 3 }, '1948 年先结清公共服务未结事项。', '十二册书归还、三笔工资结清、两宗投诉留复核日；机构变化没有抹掉等待者。')]
  ];

  installDomainDecisions('D38', 'support', 'southwestwarworkers', ROUTE_SUPPORT, support);
  installDomainDecisions('D39', 'defense', 'southwestwarworkers', ROUTE_DEFENSE, defense);
  installDomainDecisions('D41', 'public', 'tianjinclerks', ROUTE_PUBLIC, publicService);

  function scene(field, family, route, id, title, text) {
    C.ordinaryEvents.push({ id: id, title: title, text: text, families: [family], routes: [route], minAge: 13, priority: 20,
      sourceIds: sourceIds[field].slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review' });
  }

  [
    ['d38-s01', '战时支援不是战斗身份', '司机、库员、文书、材料、会计、照护和家属联络都是具体劳动，不自动生成军人、党籍、秘密交通或英雄身份。'],
    ['d38-s02', '每名伤病者有自己的去向', '姓名、伤情记录、本人同意、最后所在、接收点和回执分别核，不把一车人写成同一结果。'],
    ['d38-s03', '药械箱属于捐赠与机构账', '箱号、封条、实数、损耗、领取人和未知逐段留下，经手不产生所有权、诊断权或处方权。'],
    ['d38-s04', '运输先有公开班次和工资', '车辆、驾驶、随行、担架、休息、饮水、油料和接收答复分开，不提供危险路线与战术操作。'],
    ['d38-s05', '家属通知不是死亡证明', '发出、收件、退回、转寄与失联都只证明通信状态，不能替任何人补写死亡。'],
    ['d38-s06', '战争结束不会自动结清', '在途人、欠薪、公物、回执、伤病和家庭地址要逐项交接，和平社会服务也需重新录用。'],
    ['d38-s07', '女性不只做无薪照料', '女性可做库员、文书、驾驶协助、材料与主管，男性也要做清洁、家属沟通与情绪劳动；全部核工资。'],
    ['d38-s08', '错误会让真实的人等待', '错名、错箱与错去向要通知两端、补救、退费和复盘，改纸面不能撤回等待与伤害。'],
    ['d38-s09', '组织接触不生成政治身份', '进入救护、慈善或社会服务机构不等于入党、卧底或秘密工作，身份只能经过独立过程形成。'],
    ['d38-s10', '普通岗位允许拒绝越界', '来源、用途、职责或接收人不明时可停下、转公开任务或离开；游戏不提供危险执行教程。'],
    ['d38-s11', '职业会转入和平服务', '战后可转病者转介、物资登记、家属联络、仓务、代笔或有限服务案桌，旧职级和资产不自动保留。'],
    ['d38-s12', '晚年只留下能证明的事实', '岗位、年份、同事、回执与最后消息可记录，未知人生不补成牺牲，也不把所有人统一英雄化。'],
  ].forEach(function (row) { scene('support', 'southwestwarworkers', ROUTE_SUPPORT, row[0], row[1], row[2]); });

  [
    ['d39-s01', '防护首先是平民生活和机构责任', '警报、避难、救护、消防、交通、住处、损失和申诉逐项发生，不把受害者责任化。'],
    ['d39-s02', '避难点容量不能随压力变大', '实际区域、通风、出口、拥挤、病弱者需要和待修项决定使用范围，投诉不是不守秩序。'],
    ['d39-s03', '火后只处理解除警报后的公开清点', '房屋、住户、已见损失、口述与未知分开；游戏不指导进火场、灭火或处理爆炸物。'],
    ['d39-s04', '幸存者陈述与机构记录并列', '人数、时刻、身体感受、当班与管理记录可以冲突，不能只留权力更大的一方。'],
    ['d39-s05', '临时住处不生成产权', '床位、租期、家口、用水、费用和拒绝分别确认，房东和住户均保留边界。'],
    ['d39-s06', '救济要追到实际领取', '捐入、审核、发出、未领、余项和申诉公开，申请、获准、领取与持续支持不是同一结果。'],
    ['d39-s07', '公开名单不能改作甄别', '避难和救济记录只说明一次服务，不证明立场、忠诚、党籍或秘密关系。'],
    ['d39-s08', '防护人员也会受伤和耗竭', '烟尘、劳损、惊吓、失眠与哀伤会造成停班、少薪、替班、转岗或离开。'],
    ['d39-s09', '死亡必须单独确认', '失联、受伤、住院、转出、财损和死亡各有来源，不能由损失清单代替死亡确认。'],
    ['d39-s10', '制度变化逐项重核', '旧申请、当前住址、已经领取、新需要、机构资产与职员岗位不能一键继承或作废。'],
    ['d39-s11', '服务可以被申诉和更正', '错名、漏发、秩序和机构失误要保留复核人、日期、补救与仍未解决部分。'],
    ['d39-s12', '叙述不只剩英雄口号', '侵略伤害、普通救助、机构失误、幸存者和家属申诉同时进入晚年回收。'],
  ].forEach(function (row) { scene('defense', 'southwestwarworkers', ROUTE_DEFENSE, row[0], row[1], row[2]); });

  [
    ['d41-s01', '公开服务由具体场所和劳动组成', '识字、阅览、代笔、讲演、卫生转介、排班与投诉都有开放时段、职员、工资和使用者。'],
    ['d41-s02', '学员不是待改造材料', '报名、到课、识字进展、工作、照料和退出原因分别记录，参加与否由本人决定。'],
    ['d41-s03', '阅读不证明政治态度', '书报来源、借还和损坏可登记，私人意见、阅读偏好与政治身份不自动生成。'],
    ['d41-s04', '代笔必须保持本人原意', '本人决定内容、修改、签认、寄出和取回原件，家属或工作人员不能代签婚姻与生活选择。'],
    ['d41-s05', '卫生服务必须另行同意', '说明、提问、登记、转介、实际获得和拒绝分开，公共事务员不能诊断或强迫处置。'],
    ['d41-s06', '女性职员的劳动要署名计薪', '内勤、排班、材料、讲演与管理都是工作，男性临时代表不能吞掉女性贡献与晋升。'],
    ['d41-s07', '公共经费允许真实取舍和异议', '房租、工资、照明、书报与活动逐项公开，缩时、减项、减免和未通过提案都留下。'],
    ['d41-s08', '公共资料只能用于原目的', '读者、学员、求助者和住址不生成忠诚名单、党籍、卧底或秘密联络权限。'],
    ['d41-s09', '战时开放、缩减和关闭都有后果', '归还物品、私人材料、工资、住处、公开通知和未结服务不能由一句停办概括。'],
    ['d41-s10', '服务对象能投诉也能离开', '场地、收费、资料、态度与转介都可申诉，提出异议不取消其他服务资格。'],
    ['d41-s11', '机构更替不接收全部人生', '招牌、场地、职员、书报、工资与个人委托逐项交接，旧职位和读者关系不自动延续。'],
    ['d41-s12', '公开服务职业可以经营但无公共权力', '有限案桌只能使用自有资产、受托材料和公开信息，不取得行政审批、证书或政治组织权限。'],
  ].forEach(function (row) { scene('public', 'tianjinclerks', ROUTE_PUBLIC, row[0], row[1], row[2]); });

  C.annualRhythms[ROUTE_SUPPORT] = [
    '每年落在一名具体伤病者、一张公开转送条、一件物资或一封家属通知上，不能用“支援前线”概括。',
    '本人意愿、接收答复、班次工资、箱号回执、错误、身体和家人地址同时进入账本。',
    '战后先结清在途人员、公物与欠薪，再决定转社会服务、开有限案桌或离开。',
  ];
  C.annualRhythms[ROUTE_DEFENSE] = [
    '一段地方防护至少落在公开警报、避难点、火后清点、伤病转介、临时住处、救济或申诉中的一项。',
    '机构记录、幸存者陈述、已见损失、口述与未知并列；失联和死亡永远分开。',
    '工作人员的工资、受伤、失眠、休息和转岗进入年度生活，不靠抽象奉献维持服务。',
  ];
  C.annualRhythms[ROUTE_PUBLIC] = [
    '每年具体完成一班识字、一批借还、一封本人授权代笔、一次转介、场地排班或投诉答复。',
    '学员、读者、求助者、职员和志愿者各有时间、隐私、工资、拒绝、申诉与退出。',
    '机构在战争和制度更替中逐项核场地、书报、工资、私人材料与未结服务，不用招牌替代人生。',
  ];

  C.sceneFrames[ROUTE_SUPPORT] = [
    { open: '案桌上同时有两名同名伤病者、一只箱号不合的药械箱、一辆临时车和一封退回家信。', close: '今天只完成能证明的转送与交接；本人、接收点、实物、工资、回执和未知分别留下。' },
    { open: '罗文秀核伤病记录，郑守仁排公开班次，何玉兰看实物，孙静宜按本人原意写家属通知。', close: '这些岗位共同服务一个具体的人，却不会合成战斗、党籍、秘密通信或英雄身份。' },
  ];
  C.sceneFrames[ROUTE_DEFENSE] = [
    { open: '警报解除后，避难点投诉、火后住户、临时床位、伤病转介和未领救济同时来到一张桌前。', close: '人员、房屋、身体、物资、申诉和最后消息分别答复；工作人员没有替未知签完结论。' },
    { open: '幸存者记得拥挤与呼吸困难，当班记录写着另一人数，房主和住户又对损失有不同陈述。', close: '不同来源保留在同一记录里；公共机构可被质疑，也必须给出具名复核日。' },
  ];
  C.sceneFrames[ROUTE_PUBLIC] = [
    { open: '阅览室里有一班识字、三册未还书报、一封本人不愿被家属改写的信和一宗卫生转介。', close: '报名、借还、代笔、同意、收费和下一步分别确认；服务没有取得使用者的人生决定权。' },
    { open: '高淑英核场地与工资，马玉真决定自己的信，周德安报夜班时间，林惠如只回答医护范围内的问题。', close: '公共服务从具体劳动和本人选择形成，不自动生成政治组织、秘密身份或全社区授权。' },
  ];

  var bases = {};
  bases[ROUTE_SUPPORT] = {
    kind: 'wartime-casualty-material-communication-support', role: '伤病转送、物资交接与家属联络支援员',
    workplace: '重庆合成救护转送站、材料库、公开通信案桌与战后社会服务点', employer: '合成救护与民用社会服务机构的非战斗受薪岗位',
    supervisor: '按本人、接收、班次、箱号与回执负责的罗文秀', colleague: '有自己工资、身体、家庭和退出决定的材料员何玉兰', publicPerson: '决定告知谁、去往何处及是否继续服务的伤病者方志恒',
    terms: '按班核本人意愿、伤病记录、接收点、车辆、担架、箱号、实数、工资、休息、家属通知、回执、更正、交接与退出',
    duties: '在公开非战斗范围内登记伤病转送、核药械箱件和家属通知；不诊断、不处方、不接危险用途和秘密通信',
    scenes: ['罗文秀拆开两名同名者的去向。', '何玉兰拒签一只数量不合的箱。', '孙静宜把退信保留为最后通信状态。'],
  };
  bases[ROUTE_DEFENSE] = {
    kind: 'civil-defense-aftermath-public-relief', role: '公开避难、火后清点、住处与民众救济事务员',
    workplace: '重庆合成公开避难点、街区善后处、临时住处与救济案桌', employer: '合成地方防护与民众救济机构的受薪公开岗位',
    supervisor: '按公开岗位、容量、善后与申诉负责的彭淑珍', colleague: '有自己工资、身体、家口和离开权的救济员刘素英', publicPerson: '能陈述损失、申请、拒绝和申诉的居民何静兰',
    terms: '按班核警报、避难、容量、身体投诉、解除警报后清点、伤病转介、临时住处、物资、领取、申诉、工资与退出',
    duties: '只做公开防护秩序、警报解除后的人员房屋清点、住处与救济转介；不提供危险现场和强制控制操作',
    scenes: ['彭淑珍下调一处避难点实际容量。', '刘素英公开未领救济余项。', '何静兰要求把幸存者陈述附在机构记录之后。'],
  };
  bases[ROUTE_PUBLIC] = {
    kind: 'public-education-reading-writing-community-service', role: '民众教育、阅览代笔与社区公共事务员',
    workplace: '天津合成民众教育馆、公开阅览室、里院服务案桌与战后文化服务点', employer: '合成民众教育与社区公共服务机构的受薪岗位',
    supervisor: '按场地、开放、工资、资料与投诉负责的许明述', colleague: '有自己工资、署名、家庭和去留的公共服务员高淑英', publicPerson: '决定报名、代笔内容、资料与是否继续服务的马玉真',
    terms: '按月核识字、书报、借还、代笔、本人签认、卫生转介、场地、工资、收费、资料用途、投诉、机构交接与退出',
    duties: '组织自愿识字和阅览，按本人原意代笔并转介公开服务；不颁证、不审批、不强迫参与或推断政治身份',
    scenes: ['高淑英要求把实际主持与工资写清。', '马玉真拒绝家属改写自己的信。', '周德安按夜班时间选择识字课。'],
  };

  C.routeCareerProfilesByGender[ROUTE_SUPPORT] = {
    男: Object.assign({}, bases[ROUTE_SUPPORT], { role: '公开车辆担架班、物资交接与家属联络支援员', duties: '较常被派搬抬、车辆和夜班，也必须做照护、代笔和家属沟通；男性身份不生成战斗权力或秘密路线' }),
    女: Object.assign({}, bases[ROUTE_SUPPORT], { role: '伤病转送登记、材料交接与家属联络支援员', duties: '较常从文书、材料和照护进入并被期待无薪奉献，也能负责班次、车辆与站务；女性身份不等于只做护理' }),
  };
  C.routeCareerProfilesByGender[ROUTE_DEFENSE] = {
    男: Object.assign({}, bases[ROUTE_DEFENSE], { role: '地方公开避难、火后清点、住处与救济事务员', duties: '较常被派外勤和搬运，也要听取幸存者、登记家口、代笔和照顾病弱者；不自动取得强制管制权' }),
    女: Object.assign({}, bases[ROUTE_DEFENSE], { role: '地方避难登记、伤病转介、住处与救济事务员', duties: '较常先做名册、照护与无薪协调，也能主持容量复核、损失清点和申诉；性别不降低权限标准' }),
  };
  C.routeCareerProfilesByGender[ROUTE_PUBLIC] = {
    男: Object.assign({}, bases[ROUTE_PUBLIC], { role: '民众教育讲演、阅览、代笔与社区事务员', duties: '较常被推到公开讲演和外勤，也必须核工资、隐私、本人原意与照料劳动；男性代表不能吞掉同事贡献' }),
    女: Object.assign({}, bases[ROUTE_PUBLIC], { role: '民众教育、阅览代笔、场地与社区服务事务员', duties: '较常先做内勤、儿童与无薪协调，也能主持讲演、预算、管理与经营；全部劳动署名计薪并允许离开' }),
  };

  Object.assign(C.routeContactProfiles, {
    'southwest-wartime-relief-logistics': [
      { id: 'd38_luo_wenxiu', label: '罗文秀', role: '按本人、伤病记录、接收点、转送回执与更正负责的支援主管', status: 'supervisor', relation: 24, born: 1895 },
      { id: 'd38_zheng_shouren', label: '郑守仁', role: '只排公开车辆担架班、驾驶休息、承载与交接的运输经手人', status: 'colleague', relation: 27, born: 1902 },
      { id: 'd38_he_yulan', label: '何玉兰', role: '有自己工资、复核判断、身体和拒签差额权的材料库员', status: 'coworker', relation: 31, born: 1908 },
      { id: 'd38_sun_jingyi', label: '孙静宜', role: '按本人原意写家属通知并记录送达、退回和未知的通信同事', status: 'coworker', relation: 29, born: 1911 },
      { id: 'd38_fang_zhiheng', label: '方志恒', role: '决定转送、告知家属和取回个人材料范围的伤病者', status: 'nearby', relation: 25, born: 1914 },
      { id: 'd38_wu_mingzhen', label: '吴明真', role: '只对战后社会服务试工、工资、职责与是否留用给答复的人', status: 'distant', relation: 20, born: 1898 },
    ],
    'southwest-civil-defense-relief': [
      { id: 'd39_peng_shuzhen', label: '彭淑珍', role: '按公开避难容量、善后分工、工资、资料和申诉负责的主管', status: 'supervisor', relation: 24, born: 1893 },
      { id: 'd39_liu_suying', label: '刘素英', role: '有自己工资、身体、家口、专业判断和退出权的救济同事', status: 'coworker', relation: 31, born: 1907 },
      { id: 'd39_qian_bohai', label: '钱伯海', role: '只在警报解除后核已见房屋、住户与物损的清点人员', status: 'colleague', relation: 27, born: 1901 },
      { id: 'd39_zhou_biyun', label: '周碧云', role: '决定自己房屋可提供哪间、租期、费用和家口边界的房东', status: 'nearby', relation: 25, born: 1889 },
      { id: 'd39_he_jinglan', label: '何静兰', role: '能陈述伤病与损失、申请、拒绝并申诉记录错误的居民', status: 'nearby', relation: 28, born: 1910 },
      { id: 'd39_chen_shouxin', label: '陈守信', role: '只对避难、救济与机构失误申诉给复核日和书面答复的人', status: 'distant', relation: 20, born: 1897 },
    ],
    'tianjin-public-community-service': [
      { id: 'd41_xu_mingshu', label: '许明述', role: '按场地、开放、经费、工资、资料边界和机构交接负责的公共服务主管', status: 'supervisor', relation: 24, born: 1885 },
      { id: 'd41_gao_shuying', label: '高淑英', role: '有自己工资、材料贡献、署名、家庭和离开决定的公共服务同事', status: 'coworker', relation: 31, born: 1898 },
      { id: 'd41_ma_yuzhen', label: '马玉真', role: '决定识字时段、代笔原意、个人材料和是否继续服务的使用者', status: 'nearby', relation: 28, born: 1902 },
      { id: 'd41_zhou_dean', label: '周德安', role: '按夜班与家庭时间参加识字并能投诉排班的工人学员', status: 'nearby', relation: 25, born: 1896 },
      { id: 'd41_lin_huiru', label: '林惠如', role: '只在医护范围内回答公开卫生问题与转介的专业人员', status: 'colleague', relation: 23, born: 1891 },
      { id: 'd41_han_boan', label: '韩伯安', role: '按开放规则使用讲演、阅览和儿童活动场地的居民代表', status: 'distant', relation: 20, born: 1888 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'southwest-wartime-relief-logistics': ['搬抬、车辆颠簸、久站、伏案、夜班和反复装卸造成的腰背、肩颈、腿脚、手腕与旧伤', '拥挤站点、通风饮水不足、伤病接触和饮食不定造成的发热、咳嗽、胃肠不适与职业暴露', '反复面对伤病、失联、错送、退信、资源不足和家属等待造成的失眠、惊醒、内疚与耗竭'],
    'southwest-civil-defense-relief': ['拥挤避难、警报后清点、搬物、走访与临时住处劳动造成的烟尘刺激、腰腿、手腕与旧伤', '通风不足、饮水不定、街区拥挤和伤病接触造成的头痛、咳嗽、发热与胃肠不适', '轰炸、死亡、失联、火损、幸存者申诉与机构压力造成的惊恐、噩梦、失眠、悲伤和耗竭'],
    'tianjin-public-community-service': ['久坐抄写、站立讲解、搬书报、走访和晚间照明不足造成的眼痛、肩颈、腰背、手腕与声音疲劳', '拥挤场地、寒暑、通风与饮食不定造成的发热、咳嗽、头痛和胃肠不适', '经费不足、资料风险、使用者冲突、战争停办、无偿期待与机构更替造成的失眠、焦虑和耗竭'],
  });

  Object.assign(C.publicRouteProfiles, {
    'southwest-wartime-relief-logistics': { publicGroup: '合成的公开伤病转送、材料交接与家属联络服务簿', publicRole: '核本人意愿、接收点、公开班次、箱号、工资、回执、更正与战后转介', covertRole: '救护支援、运输、材料、会计或通信职业不自动生成军人、党籍、卧底、秘密交通或情报身份', infiltrationRole: '不以路线、药械、伤病、家属通信或机构关系提供现实武器、破坏、隐蔽、跟踪、规避查验或伤害教程', contact: { id: 'public_d38', label: '章惠安', role: '登记公开转送范围、收费、回执、差错和申诉的经手人', status: 'colleague', relation: 20, born: 1900 } },
    'southwest-civil-defense-relief': { publicGroup: '合成的公开避难、善后、住处、救济与申诉事务簿', publicRole: '核公开警报、避难容量、人员、房损、伤病转介、住处、物资、领取、申诉与机构责任', covertRole: '参加地方防护、消防协助或救济不自动生成军警、党籍、卧底、叛徒或强制控制身份', infiltrationRole: '不提供现实防空设施、灭火、爆炸物、管制、跟踪、甄别、规避或伤害操作教程', contact: { id: 'public_d39', label: '唐静和', role: '登记公开防护救济服务、损失更正和幸存者申诉答复的经手人', status: 'colleague', relation: 20, born: 1899 } },
    'tianjin-public-community-service': { publicGroup: '合成的公开民众教育、阅览、代笔、卫生转介与社区服务簿', publicRole: '核自愿报名、借还、本人授权、开放时段、工资、收费、隐私、投诉与机构交接', covertRole: '识字、读书、代笔、公开服务、受薪职位或志愿劳动不自动生成党籍、卧底、秘密联络或代表社区的身份', infiltrationRole: '不以读者、学员、住址、家信或求助记录提供现实甄别、跟踪、隐蔽、规避和伤害教程', contact: { id: 'public_d41', label: '冯静兰', role: '登记公开教育与社区服务工资、资料和投诉答复的经手人', status: 'colleague', relation: 20, born: 1890 } },
  });

  C.post1949RouteJobs = C.post1949RouteJobs || {};
  var destinations = Object.keys(C.post1949Paths);
  var places = {
    mainland: ['当地合成病者转送、材料与家属联络服务处', '当地合成住处、灾后救济与居民申诉服务处', '当地合成文化馆、阅览代笔与社区公共服务点'],
    'hong-kong': ['香港一处合成街坊诊疗转介与家属联络站', '香港一处合成街坊灾后住处与救济服务处', '香港一处合成街坊阅览、识字与代笔服务点'],
    taiwan: ['台湾一处合成病者转送与社会服务站', '台湾一处合成灾后安置与社会救济服务处', '台湾一处合成民众教育与社区文化服务点'],
    overseas: ['落脚城市一处合成病者转介与家属联络点', '落脚城市一处合成灾后住处与华人救济服务处', '落脚城市一处合成华人识字、阅览与代笔服务点'],
    'in-motion': ['当前落脚地的合成临时转送登记与家属联络案桌', '当前落脚地的合成临时住处与救济转介案桌', '当前落脚地的合成流动识字、代笔与公共信息案桌'],
    unsettled: ['暂住地一处合成病者转介与材料登记点', '暂住地一处合成住处救济与申诉服务点', '暂住地一处合成阅览代笔与社区服务点'],
    macau: ['澳门一处合成街坊诊疗转介与家属联络点', '澳门一处合成灾后住处与街坊救济服务处', '澳门一处合成街坊识字、阅览与代笔服务点'],
    'southeast-asia': ['新加坡一处合成病者转介与家属联络点', '新加坡一处合成灾后住处与华人救济服务处', '新加坡一处合成华人识字、阅览与代笔服务点'],
  };
  var people = {
    mainland: [['转送负责人叶文安', '材料员孙惠真', '服务对象方志恒'], ['救济负责人林淑清', '事务员刘素英', '申诉人何静兰'], ['文化服务负责人许明述', '事务员高淑英', '使用者马玉真']],
    'hong-kong': [['联络主任梁瑞安', '登记员陈少瑜', '病者何德生'], ['街坊服务主任陈惠贞', '事务员梁素云', '住户许德安'], ['阅览主任何瑞莲', '事务员郭佩云', '学员冯美仪']],
    taiwan: [['转送主任林景和', '材料员张惠真', '病者吴文安'], ['救济主任邱惠明', '事务员林静娟', '住户叶玉安'], ['文化服务主任叶淑真', '事务员邱志远', '读者高文庆']],
    overseas: [['联络负责人许仁和', '登记员黄玉莲', '病者赵慧兰'], ['救济负责人黄文德', '事务员林惠珠', '住户陈玉安'], ['识字负责人郑仁和', '事务员许慧兰', '学员黄静安']],
    'in-motion': [['临时联络人孟平安', '登记员姜素华', '病者秦良生'], ['临时救济经手人姜家和', '事务员宋玉真', '住户周平安'], ['流动服务经手人秦平安', '事务员徐家和', '使用者孟静宜']],
    unsettled: [['转送负责人潘维清', '登记员陆雅琴', '病者沈瑞生'], ['救济负责人陆维清', '事务员叶曼云', '住户冯守义'], ['公共服务负责人冯守义', '事务员唐静修', '读者潘玉莲']],
    macau: [['联络负责人何景鸿', '登记员郑慧贞', '病者梁婉仪'], ['救济负责人麦景鸿', '事务员何瑞莲', '住户陈庆安'], ['阅览负责人梁婉仪', '事务员李卓文', '学员麦慧真']],
    'southeast-asia': [['联络负责人陈文成', '登记员林秀琴', '病者郑惠兰'], ['救济负责人林文成', '事务员郭秀琴', '住户林德义'], ['识字负责人郭德义', '事务员黄惠珠', '学员陈国安']],
  };
  var routeMeta = {};
  routeMeta[ROUTE_SUPPORT] = ['care', '病者转送、材料交接与家属联络员', '临时转送登记与代笔员', '本人意愿、接收点、公开班次、箱号实物、工资休息、家属通知、回执、更正与资料归还', '转送回执复核与新人带教员', '减少夜班和搬抬，复核本人、接收、回执、更正与未结通信'];
  routeMeta[ROUTE_DEFENSE] = ['care', '住处、灾后救济与居民申诉事务员', '临时住处救济转介员', '人员、房屋、伤病转介、临时住处、物资审核领取、幸存者陈述、申诉、更正、工资与退出', '救济记录复核与居民服务带教员', '减少外勤搬物，复核住处、领取、申诉与历史更正'];
  routeMeta[ROUTE_PUBLIC] = ['literate', '民众教育、阅览代笔与社区公共事务员', '临时识字代笔与公共信息员', '自愿报名、书报借还、本人授权代笔、卫生转介、场地、工资、收费、资料边界、投诉与机构交接', '公共服务记录复核与新人带教员', '减少晚间讲演和外勤，复核借还、代笔、投诉与资料归还'];
  [ROUTE_SUPPORT, ROUTE_DEFENSE, ROUTE_PUBLIC].forEach(function (route, index) {
    C.post1949RouteJobs[route] = {};
    destinations.forEach(function (destination) {
      var meta = routeMeta[route];
      var named = people[destination][index];
      C.post1949RouteJobs[route][destination] = {
        track: meta[0], role: meta[1], casualRole: meta[2], workplace: places[destination][index], duties: meta[3],
        terms: '先核当地语言、登记、服务范围和过去履历并按一月试做；留用后按月领薪，住处、资料、公共身份和旧职位分别办理',
        lighterRole: meta[4], lighterDuties: meta[5], supervisor: named[0],
        supervisorRole: '按当前服务范围、工资、错误、投诉与是否留用给具体答复的人', colleague: named[1],
        colleagueRole: '有自己的工资、身体、家庭、专业判断、异议和去留决定的同事', publicPerson: named[2],
        publicRole: index === 0 ? '决定本人转送、告知范围、材料与是否继续的人' : index === 1 ? '能陈述损失、申请、拒绝和申诉且不被机构自动代表的人' : '决定报名、阅读、代笔原意、资料与是否继续服务的人',
      };
    });
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('care', ROUTE_SUPPORT);
  addRouteToTrack('care', ROUTE_DEFENSE);
  addRouteToTrack('literate', ROUTE_PUBLIC);

  C.events.push(
    { id: 'd41-popular-education-1925', year: 1925, eraBrief: true, eraScope: '城市民众教育与公共文化', families: ['tianjinclerks'], title: '民众教育馆把讲演、图书、阅览与公共活动放进城市日常', knownThrough: ['newspaper', 'books', 'conversation'], delta: { knowledge: 1, network: 1 }, knownText: '你从报刊和同行知道各地出现通俗或民众教育馆，实际工作包括讲演、图书、阅览和公共活动；能否报名、受薪和持续开放仍需向本地逐项核实。', unknownText: '街面先听说有公开阅览和识字场所，具体经费、开放、书报和职员工资仍不清楚。', fact: '1925 年京兆通俗教育馆设讲演、游艺、图书、博物和公共体育等部门。', historySource: { label: '北京市文物局：龙尾之曜——浅记北京鼓楼', url: 'https://wwj.beijing.gov.cn/bjww/wwjzz/wwjapp/wwgs71/1757494/index.html' } },
    { id: 'd39-chongqing-civil-defense-1941', year: 1941, eraBrief: true, eraScope: '重庆空袭与城市防护', families: ['southwestwarworkers'], title: '长期轰炸使避难、救护、消防、交通和损失登记成为逐日城市事务', knownThrough: ['newspaper', 'conversation', 'letters'], delta: { health: -2, money: -2, mind: -2 }, knownText: '你知道重庆长期遭受日军无差别轰炸，公开防护工作包括避难、救护、工务、消防、交通和损失统计；合成角色只按亲历、具名记录和家人消息确认。', unknownText: '你先经历警报、拥挤、封路、火损和名单等待，无法从附近损失推知全城或远方亲人的状态。', fact: '重庆档案记录 1937—1942 年避难管制、救护、工务、消防、交通管制及 1938—1941 年空袭死伤和房屋损毁。', historySource: { label: '重庆市档案馆：重庆防空概况及空袭损害情况统计表', url: 'https://jda.cq.gov.cn/web/article/1494011077816893440/web/content_1494011077816893440.html' } },
    { id: 'd38-red-cross-services-1945', year: 1945, eraBrief: true, eraScope: '战时救护体系缩编与社会服务转向', routes: [ROUTE_SUPPORT], title: '战时救护岗位开始缩编，部分工作转向和平时期社会服务', knownThrough: ['newspaper', 'letters', 'conversation'], delta: { position: -1, mind: -1, knowledge: 1 }, knownText: '你知道救护队伍和站点开始缩编，车辆、材料、职员、伤病者与未结回执必须逐项处理；未来是否进入社会服务需重新取得岗位答复。', unknownText: '本地只收到岗位和物资清查通知，哪些站点保留、谁获新岗位、工资何时结清仍未确定。', fact: '1945 年救护总队裁编；1946—1949 年各地红十字工作逐步从抗战救护转向和平建设与社会服务。', historySource: { label: '中国红十字会：百廿载守人道初心', url: 'https://www.redcross.org.cn/html/2024-05/99082_1.html' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
