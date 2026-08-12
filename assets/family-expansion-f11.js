// 民国人生 · F11 汉口码头、船工与人力车家庭运行时包 v0.7.10
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f11.js');

  C.version = '0.7.10';
  C.familyDecisionKeys.hankouport = { path: 'hankou-port-path', war: 'hankou-port-war' };
  Object.assign(C.designRegistry.families.F11, {
    designStatus: 'runtime-reviewed-first-round',
    runtimeStatus: 'playable-verified',
    runtimeFamilyKey: 'hankouport',
  });
  C.runtimeFamilyDesignMap.hankouport = 'F11';
  Object.assign(C.legacyRouteDomainMap, {
    'hankou-dock-cargo-worker': 'D10',
    'hankou-rickshaw-worker': 'D10',
    'hankou-river-street-food-stall': 'D15',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F11-WH-ARCHIVES-COLLECTION': {
      label: '武汉市档案馆：馆藏与利用说明',
      url: 'https://www.whda.org.cn/dafw/',
      supports: ['武汉地方政务、工商、社会与个人记录构成场景核查入口；没有公开到件的细节不作史实断言'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F11-HANKOU-CHAMBER': {
      label: '武汉市档案馆：《汉口商会史料汇编》介绍',
      url: 'https://www.whda.org.cn/dawh/bycg/202512/t20251203_2689135.html',
      supports: ['1899—1949 年汉口商会、同业、商号与社会经济活动；馆方同时说明年代和材料分布存在空缺'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F11-ZHONGSHAN-TRAFFIC': {
      label: '武汉市档案馆：汉口中山大道交通与码头资料',
      url: 'https://www.whda.org.cn/dawh/whjy/202512/t20251223_2699328.shtml',
      supports: ['1930 年人力车跨华界、租界和特别区互通，以及道路连接商业区、铁路与多个货运码头的城市条件'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F11-HUBEI-DOCK-RECORDS': {
      label: '湖北省档案馆：民国码头工人与武汉港区开放目录',
      url: 'https://www.hbda.gov.cn/searchitem/208_9.jspx?page=4826&search_EQ_danghao=&search_EQ_jieshusj=&search_EQ_kaishisj=&search_EQ_timing=',
      supports: ['1937—1948 年码头工人费用、禁区开放、轮渡码头纠纷、趸船调查与码头图纸均有具体案卷，劳动与经营并非无制度背景'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F11-WUHAN-FLOOD-1931': {
      label: '武汉市水务局：1931 年武汉水灾史料',
      url: 'https://swj.wuhan.gov.cn/tzdt/jcss/202110/t20211020_1799415.html',
      supports: ['1931 年武汉水灾淹及汉口城市生活；游戏逐项写住处、摊具、工作和健康后果，不替合成人物虚构真实灾情档案'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F11-WUHAN-OCCUPATION-ARCHIVES': {
      label: '武汉市档案馆：《武汉沦陷时期档案史料丛编》介绍',
      url: 'https://www.whda.org.cn/dawh/bycg/202512/t20251203_2689132.html',
      supports: ['1938 年 10 月 25 日至 1945 年 9 月的武汉沦陷时期具有社会、经济、市政与战争记录，不能用一句战乱概括七年日常'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F11-WUHAN-LABOR-ORGANIZATION': {
      label: '武汉市档案馆：汉阳人力车夫与码头工人组织史料',
      url: 'https://www.whda.org.cn/dawh/whjy/202512/t20251223_2699342.shtml',
      supports: ['武汉三镇的人力车夫、码头工与政治组织存在真实交集，也伴随搜捕、失联、出卖与死亡风险；职业本身不等于组织身份'],
      status: 'source-linked-needs-final-review',
    },
  });

  C.families.hankouport = {
    key: 'hankouport',
    name: '汉口码头、船工与人力车家',
    born: 1910,
    place: '汉口合成河街与码头区',
    defaultSeed: 1110,
    defaultNames: { 男: '周江生', 女: '周江梅' },
    motif: '船期、班组、车租、饭摊与水位把一家人的钱和身体分成几本账；每天有没有工、谁欠一班钱、哪条路还能走，都要由具体人给出答复。',
    start: { body: 55, knowledge: 12, craft: 36, mind: 36, network: 24, fame: 10 },
    startRes: { money: 8, health: 77, relation: 66, position: 21 },
    subjects: {
      mother: { label: '母亲', status: 'alive', health: 65, agency: 94, note: '经营河街饭摊、洗补和自己的赊饭账，可拒绝垫班组费用或交出铺具' },
      father: { label: '父亲', status: 'alive-working', health: 59, agency: 88, note: '按船期与班组做装卸，可受伤、停班、转轻活或拒绝把班位当家产传给主角' },
      spouse: { label: '配偶', status: 'not-met', health: 68, agency: 91, note: '婚后仍保留自己的工钱、班次、父母责任、住处与是否生育的决定' },
      household: { label: '河街同住家口', status: 'together', strength: 55, agency: 86 },
      support: { label: '邻摊、同班与街坊支持', status: 'kin-and-neighbors', strength: 32, agency: 88 },
      connections: { label: '码头班组、车行、饭馆与仓栈门路', status: 'trial-only', strength: 25, agency: 84 },
      workers: { label: '装卸工、车夫、摊工与仓栈同事', status: 'separate-wages-and-testimony', strength: 29, agency: 91 },
      ledger: { label: '班次、车租、饭摊、欠薪与货损分账', status: 'separate-records', strength: 33, agency: 92 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 85, note: '不自动继承班位、车、饭摊或照料责任' },
    },
    contacts: {
      f11_zhou_fashui: { label: '周发水', role: '按船期与班组做装卸、逐班核工钱的父亲', status: 'family', relation: 61, agency: 88, note: '班位不是可继承家产；他可停班、转轻活或自己决定退休' },
      f11_he_chunmei: { label: '何春梅', role: '经营河街饭摊、洗补与赊饭账的母亲', status: 'family', relation: 69, agency: 94, note: '锅灶、客户、赊账和是否固定开店都由她本人决定' },
      f11_zhou_guizhi: { label: '周桂枝', role: '想学货号记账并寻找饭馆、仓栈或学校工作的手足', status: 'family', relation: 53, agency: 95, note: '不默认守摊，可试工、落选、迁走、结婚或不婚' },
      f11_he_sanhuai: { label: '贺三槐', role: '按船期排班、核口令与货损的码头领班', status: 'nearby', relation: 23, agency: 84, note: '能排班、停班和作证，不能替所有经手人承担或掩盖事故' },
      f11_wei_yuying: { label: '魏玉英', role: '卖茶食、照顾母亲并保存自己周转金的邻摊主', status: 'nearby', relation: 34, agency: 94, note: '可合购燃料、竞争食客、搬家或拒绝继续赊借' },
      f11_lin_shaokun: { label: '林绍坤', role: '核货号、件数、破损与交接人的仓栈理货文书', status: 'nearby', relation: 25, agency: 87, note: '可提供记录，不能替货主、船方或班组单方面定责' },
    },
  };

  Object.assign(C.routes, {
    'hankou-dock-cargo-worker': { name: '汉口码头装卸、理货与船岸交接', family: 'hankouport', summary: '从安全线外认货号和口令，到按班装卸、岸边理货与货损交接；每天有没有工、谁领班、谁结钱都明确。' },
    'hankou-rickshaw-worker': { name: '汉口人力车、手车与城市短途运输', family: 'hankouport', summary: '核车租、押责、路线、客货、班次和修理，经历互通规则、收入波动与身体损耗；不是无限重复“拉车”。' },
    'hankou-river-street-food-stall': { name: '汉口河街饭摊、茶食与固定小店', family: 'hankouport', summary: '从锅灶、食材、赊饭和熟客做起，处理帮工工资、房租、卫生、汛期搬摊与母亲产权，可受薪、合伙或独立经营。' },
  });

  C.actions.push(
    { id: 'f11-meal-credit-ledger', name: '帮母亲核饭食、洗补、赊账与当天现钱', families: ['hankouport'], minAge: 6, spirit: 2, delta: { craft: 2, knowledge: 2, relation: 1, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f11_he_chunmei: { relation: 2 }, f11_wei_yuying: { relation: 1 } }, note: '知道哪位客人吃了什么、何时还钱和哪些锅灶属于母亲；帮忙不等于取得饭摊。' },
    { id: 'f11-safe-cargo-signs', name: '在安全线外认货号、口令与交接人', families: ['hankouport'], minAge: 7, spirit: 2, delta: { knowledge: 3, craft: 2, mind: 1 }, subjectDelta: { connections: { strength: 1 } }, contactEffects: { f11_zhou_fashui: { relation: 2 }, f11_he_sanhuai: { relation: 1 } }, note: '只在吊运和跳板安全线外学习；认货号不是让儿童去扛货。' },
    { id: 'f11-water-level-household-plan', name: '看水位、搬锅灶并核下一班船期', families: ['hankouport'], minAge: 8, spirit: 3, delta: { mind: 3, position: 2, relation: 1, money: -1 }, subjectDelta: { household: { strength: 1 }, support: { strength: 1 } }, contactEffects: { f11_wei_yuying: { relation: 2 } }, note: '汛情先改变住处、摊具和班次；水位消息不自动等于整城灾情。' },
    { id: 'f11-dock-shift-cargo-handoff', name: '完成一班装卸、货号与入仓交接', routes: ['hankou-dock-cargo-worker'], minAge: 15, spirit: 4, careerAction: true, delta: { body: 2, craft: 3, money: 2, health: -2 }, subjectDelta: { workers: { strength: 2 }, ledger: { strength: 1 } }, contactEffects: { f11_he_sanhuai: { relation: 2 }, f11_dock_coworker: { relation: 1 } }, note: '记录哪条船、哪批货、谁发口令、谁入仓和哪天结钱；负重带来真实身体代价。' },
    { id: 'f11-dock-wage-injury-followup', name: '核少结工钱、伤处复查与代班结果', routes: ['hankou-dock-cargo-worker'], minAge: 17, spirit: 3, careerAction: true, delta: { mind: 3, network: 2, money: 1, health: 1 }, contactEffects: { f11_he_sanhuai: { relation: 1 }, f11_dock_coworker: { relation: 2 } }, note: '工资、治疗、复工与证词分别给答复，不用“工伤 -2”结束事件。' },
    { id: 'f11-rickshaw-route-fare-shift', name: '跑一班有车号、路线、客货与车租的短途运输', routes: ['hankou-rickshaw-worker'], minAge: 15, spirit: 4, careerAction: true, delta: { body: 2, network: 2, money: 2, health: -2 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f11_rickshaw_manager: { relation: 1 }, f11_rickshaw_coworker: { relation: 2 } }, note: '当班收入先扣车租、修理和等客时间；路线变宽不保证每天有客。' },
    { id: 'f11-rickshaw-repair-customer-answer', name: '给误点乘客、坏车与修理账逐项答复', routes: ['hankou-rickshaw-worker'], minAge: 17, spirit: 3, careerAction: true, delta: { craft: 2, mind: 2, money: 1, relation: 1 }, contactEffects: { f11_rickshaw_manager: { relation: 1 }, f11_rickshaw_customer: { relation: 2 } }, note: '先核坏在何处、谁用过、修理多少，再决定司机、车行或乘客承担哪一段。' },
    { id: 'f11-food-stall-meal-customer-shift', name: '完成一班备料、出餐、熟客赊账与收摊', routes: ['hankou-river-street-food-stall'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, relation: 2, money: 2, health: -1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f11_he_chunmei: { relation: 1 }, f11_food_customer: { relation: 2 } }, note: '每位食客、每份饭、实际收款、损耗和帮工工钱进入当天账；忙不等于赚钱。' },
    { id: 'f11-food-supplier-worker-account', name: '核食材、燃料、帮工工钱与坏损', routes: ['hankou-river-street-food-stall'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, network: 3, money: 1 }, contactEffects: { f11_food_supplier: { relation: 2 }, f11_food_coworker: { relation: 1 } }, note: '母亲铺具、主角工资、帮工工资、供应商货款和利润是不同账户。' }
  );

  var sourceIds = ['SRC-F11-WH-ARCHIVES-COLLECTION', 'SRC-F11-HANKOU-CHAMBER', 'SRC-F11-ZHONGSHAN-TRAFFIC', 'SRC-F11-HUBEI-DOCK-RECORDS', 'SRC-F11-WUHAN-FLOOD-1931', 'SRC-F11-WUHAN-OCCUPATION-ARCHIVES'];

  function option(id, label, delta, echo, fact, followTitle, followText, extra) {
    return Object.assign({ id: id, label: label, delta: delta, echo: echo, fact: fact, endingFact: true, followup: { title: followTitle, text: followText } }, extra || {});
  }

  function installDecision(item) {
    item.options.forEach(function (choice) {
      var followup = choice.followup;
      C.ordinaryEvents.push({
        id: 'echo-' + choice.echo.replace(/:/g, '-'), title: followup.title, text: followup.text,
        year: item.followYear, priority: 45, requiresEchoes: [choice.echo],
        families: item.families ? item.families.slice() : undefined,
        routes: item.routes ? item.routes.slice() : undefined,
        sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete choice.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  installDecision({
    id: 'hankou-port-path', year: 1924, followYear: 1925, families: ['hankouport'], title: '三份试工里哪一份成为第一段成年谋生',
    prompt: '贺三槐的码头班组、许记车行和何春梅的饭摊各给一次有限试工。你必须问清岗位、班次、工钱、工具或车租、负责人和答复日。',
    options: [
      option('dock-cargo-trial', '去码头班组试做装卸、看号与船岸交接', { body: 2, craft: 3, money: 1 }, 'f11:path:dock', '1924 年进入汉口合成码头班组做有限装卸与交接试工。', '班组给出留用岗位和第一笔工钱', '贺三槐按当日表现安排看号、传口令和分段装卸；男性更常进入负重与跳板段，女性更常从岸边缝包、看号和入仓交接进入，两者都按实际班次结钱。', { route: 'hankou-dock-cargo-worker' }),
      option('rickshaw-trial', '去车行核车号、租法、路线后试跑短途客货', { body: 2, network: 2, money: 1 }, 'f11:path:rickshaw', '1924 年进入汉口合成车行做一日人力车与短途运输试工。', '一日试跑得到继续或换岗答复', '许管事写明车号、交回时辰、车租和损坏核验；男性更常亲自拉客货，女性更常从派车、收付与短程手车交付进入，均没有因试跑取得车辆。', { route: 'hankou-rickshaw-worker' }),
      option('river-food-trial', '在母亲饭摊试做备料、出餐、赊账与收摊', { craft: 3, relation: 2, money: 1 }, 'f11:path:food', '1924 年在何春梅河街饭摊做有工资边界的经营试工。', '母亲写下铺具、工资和决定权', '何春梅保留锅灶、旧客与赊账决定，你按班领钱并承担备料、出餐或账务；魏玉英只按约合购燃料，没有被写成免费帮工。', { route: 'hankou-river-street-food-stall' }),
    ],
  });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['hankouport'], priority: 12,
      sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }

  scene('f11-s01', '父亲的工钱和母亲的现钱分开回家', '周发水交代哪条船、哪一班、应领和实领工钱；何春梅另数饭摊、洗补和赊饭账。两份收入都可能落空，谁也不是另一个人的附属账。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f11-s02', '船工赊饭要留下船名和答复日', '一名船工吃完只留下船名与下次靠岸日期。何春梅自己判断是否记赊，父亲一句“同码头的”不能替她承担货款。', { minAge: 3, maxAge: 6, priority: 23 });
  scene('f11-s03', '码头安全线挡在孩子前面', '父亲只带你在安全线外认货号、口令和经手人，不准靠近吊运与跳板；懂得工作不等于儿童能够承担危险劳动。', { minAge: 5, maxAge: 8, priority: 23 });
  scene('f11-s04', '饭摊、认货号和识字撞在同一上午', '三个去处只能选一个，父母各自安排剩下的工作；桂枝也可去问自己的课程，不因为她是女孩便默认守锅灶。', { minAge: 6, maxAge: 10, priority: 22 });
  scene('f11-s05', '水位上涨先改变锅灶和班次', '魏玉英来问两家是否合搬燃料，贺三槐却说次日可能还有一班货。你们分别核高处床位、工具重量和安全路线，没有把传闻直接写成大灾。', { minAge: 8, maxAge: 12, priority: 22 });
  scene('f11-s06', '一个班组空位也可能等不到船', '贺三槐说明要自备哪些工具、等哪条船和何时才给答复；母亲同时能接一批稳定饭食。家中只能投入一边，机会不保证每天有工。', { minAge: 9, maxAge: 13, priority: 21 });
  scene('f11-s07', '桂枝问的是自己的学徒和工钱', '周桂枝能准确记货号，却更想问仓栈、饭馆或学校是否有女孩可申请的岗位。林绍坤只帮她查公开条件，不替她保证录用，也不把她留下免费帮摊。', { minAge: 10, maxAge: 15, priority: 21 });
  scene('f11-s08', '三份试工各有老板、边界和答复日', '码头、车行和饭摊分别写明岗位、班次、工钱、工具或车租、负责人和留用日期；介绍只把人带到门口。', { year: 1924, routes: ['hankou-dock-cargo-worker', 'hankou-rickshaw-worker', 'hankou-river-street-food-stall'], priority: 30 });
  scene('f11-s09', '第一份稳定工作终于有具体名字', '贺三槐、车行许管事或何春梅给出留用结果；你的角色、工作地点、同事、服务对象、工时和结算方式进入职业账。', { year: 1925, routes: ['hankou-dock-cargo-worker', 'hankou-rickshaw-worker', 'hankou-river-street-food-stall'], priority: 20 });
  scene('f11-s10', '人力车互通以后仍要核路线和车租', '道路通行规则改变，一些跨区行程终于能接，另一些路段仍受当日规则与路况限制；多一条路只增加真实行程，不保证收入翻倍。', { year: 1930, routes: ['hankou-rickshaw-worker'], priority: 33 });
  scene('f11-s11', '洪水把一间住处拆成几项后果', '水漫进街巷后，床位、锅灶、车、绳索、药和工作凭据分别移动；有人停工、有人伤病、有人失去摊点，但没有用一句“全家逃难”抹掉差异。', { year: 1931, priority: 36 });
  scene('f11-s12', '水退后不是所有工作同日回来', '饭摊要洗锅换料，车行要修车轴，码头要等船与安全复核，住处还要清淤。每项工作都有一个负责人和新的答复日。', { year: 1932, priority: 32 });
  scene('f11-s13', '少结一班钱和一次伤处复查互不替代', '你或父亲因扭伤少做一班，结算又少了一项。治疗、复查、同班证词、应付工钱和复工日期分别进入记录。', { minAge: 20, maxAge: 50, priority: 21 });
  scene('f11-s14', '顾客不是一句“生意不错”', '一位误点乘客要解释，一名船工要求再赊一餐，一位货主追问少件。你只能按自己经手的工作答复，每人会留下、换人或停止往来。', { minAge: 20, maxAge: 52, priority: 20 });
  scene('f11-s15', '结婚后争吵的是班次、钱和两边父母', '你与伴侣为夜班、车租、店里帮工、双方父母医药钱与是否要孩子争吵。两人分别说出不能放下的工作和亲属责任，再决定同住、近居或暂缓共同生活。', { minAge: 23, maxAge: 43, priority: 20 });
  scene('f11-s16', '肺咳、腿伤和胃痛会真正让人停工', '湿冷后咳嗽、负重伤腰、久跑伤膝或饮食不定引发胃痛。看诊、药钱、代班、未结工钱与复工日分别处理，部分旧伤进入晚年。', { minAge: 24, maxAge: 58, priority: 20 });
  scene('f11-s17', '朋友也有照料、竞争和退出', '魏玉英因照顾母亲减少出摊，来谈合购燃料而不是求主角拯救；同一周她也争取两名熟客。你们可以合作、竞争或停止赊借。', { minAge: 25, maxAge: 58, priority: 19 });
  scene('f11-s18', '公共互助与政治组织不是职业自动附赠', '同班人谈工钱、伤害和公开互助，也有人谨慎试探更高风险的联络。你可以只做公开答复、申请加入、保持无党派或拒绝接触；码头工与车夫身份本身不等于任何组织身份。', { minAge: 18, maxAge: 45, priority: 18, sourceIds: ['SRC-F11-WUHAN-LABOR-ORGANIZATION'] });
  scene('f11-s19', '1938 年空袭和管制逐项切断城市日常', '码头停一段船、车行少几条路、饭摊失去食材、住处要避险。每个人按实际岗位、床位和最后地址作答，战时风险不只是一段背景文字。', { year: 1938, priority: 36 });
  scene('f11-s20', '1945 年恢复先从仍在的人和账开始', '你核仍在的工友、车号、铺具、食客、旧伤、欠薪、货损和亲人地址；战争结束没有把失效客户、死亡者和旧制度自动恢复。', { year: 1945, priority: 34 });
  scene('f11-s21', '1949 年把人、工作、资产和未知列在桌上', '父母、桂枝、伴侣、朋友、班组、车、锅灶、债、住处与未结工钱逐项列出，再从八种后半生去向中选择；政治阶段变化不是人生结局。', { year: 1949, routes: ['hankou-dock-cargo-worker', 'hankou-rickshaw-worker', 'hankou-river-street-food-stall'], priority: 36 });
  scene('f11-s22', '父母晚年各自决定轻活和住处', '周发水不能再扛重货但愿认货号，何春梅久站困难却仍愿管账。二人对离开河街意见不同，你只能分别协商轻活、医药、探望与有限帮助。', { minAge: 45, maxAge: 68, priority: 18 });
  scene('f11-s23', '晚年要交清最后一班与最后一位顾客', '你减少负重、停止长跑、缩菜单、带新人或退出固定工作；车、绳索、锅灶、钥匙、存货、欠账和未付工资逐项移交。', { minAge: 52, maxAge: 74, priority: 17 });
  scene('f11-s24', '异地死亡需要消息、确认与遗留账', '家人、同班人或主角去世时，口述、医院或机构记录、退回信件与遗物可能先后到达；发生、知情、确认、尾款和工具归属分开处理。', { minAge: 62, priority: 16 });

  C.annualRhythms['hankou-dock-cargo-worker'] = [
    '一班船对应泊位、货号、口令、装卸段、入仓人和结算日；没等到船就是没有该班工钱，不用“在码头干了一年”掩盖空班。',
    '贺三槐排班，林绍坤核入仓，同班人各自作证；货损、欠薪与工伤只落到能证明的经手段。',
    '身体、工具和班位都是有限条件；熟悉码头可以转理货或组织小队，却不会自动取得船、码头或永久工作权。',
  ];
  C.annualRhythms['hankou-rickshaw-worker'] = [
    '每班先核车号、旧损、车租、路线、客货与收车时辰；收入扣掉空跑、修理和等客时间，路通不等于天天有客。',
    '许管事、同车夫与乘客只回答各自经手的一段；误点、坏车、少付车资和病休都有下一步。',
    '男女共享城市运输人生领域，但可见岗位不同：男性更常承担拉车负荷，女性更多由派车、收付、手车交付与有限外勤进入。',
  ];
  C.annualRhythms['hankou-river-street-food-stall'] = [
    '每天把食材、燃料、出餐、实际收款、赊账、帮工工资和坏损分开；食客多与赚到钱不是同一件事。',
    '何春梅保留锅灶、旧客和关店权，魏玉英与帮工保留工资、照料时间和退出权；主角不能靠亲属身份免费接管。',
    '汛期、船期和道路变化会改变客流与停摊点；每位顾客、供货人和工人得到实际答复，不用“生意照旧”跨过时代。',
  ];
  C.sceneFrames.hankouport = [
    { open: '水位、船期、车行排班和饭摊现钱同时改变一天，父亲、母亲、桂枝与邻摊只回答自己知道的一段。', close: '今天只接住一班货、一次行程或一轮饭食；欠薪、旧伤、赊账与家人地址分别留给具名答复。' },
    { open: '码头口令从河边传来，车轴又有异响，母亲正在决定是否再给一名船工赊饭。', close: '你得到具体工作结果，也承担工钱、身体、工具或关系代价；没有一项行动被概括成“谋生了一年”。' },
  ];
  C.sceneFrames['hankou-dock-cargo-worker'] = C.sceneFrames.hankouport;
  C.sceneFrames['hankou-rickshaw-worker'] = C.sceneFrames.hankouport;
  C.sceneFrames['hankou-river-street-food-stall'] = C.sceneFrames.hankouport;

  C.parentProfiles.hankouport = {
    mother: {
      name: '何春梅', born: 1885, occupation: '经营河街饭摊、洗补与具名赊饭账并保留锅灶产权', deathAgeBase: 78,
      activities: ['核当天实际出餐、现钱、赊账与帮工工钱', '在汛期亲自决定先搬哪些锅灶和是否停摊', '晚年减少久站但仍决定铺具、旧客与是否合伙'],
      words: ['“吃过几碗、付了几文、哪天靠岸，都写清了才叫账。”', '“锅灶是我攒下的，你来领工钱可以，不能一句家里人就拿走。”', '“玉英要照顾她娘，她出哪一班、投多少钱，由她自己说。”'],
    },
    father: {
      name: '周发水', born: 1881, occupation: '按船期与班组做码头装卸，逐班核口令、工钱和身体', deathAgeBase: 71,
      activities: ['交回一班货号、经手段、应领与实领工钱', '受伤后自己决定复工、转理货或停班', '晚年只认货号和教安全边界，不把班位当作遗产'],
      words: ['“今天有没有这班船，先听贺三槐答；没上班就没有那笔钱。”', '“箱子在哪一段坏的，谁看见哪一段就说哪一段。”', '“我认识人不等于码头归我，你若去试工，还是自己谈班次和钱。”'],
    },
  };
  C.spouseProfiles.hankouport = {
    男: { name: '孙荷香', bornOffset: 1, occupation: '饭馆帮工与河街食材收付劳动者，保留工资和母亲照料责任', values: '共同生活要谈清夜班、店务、双方父母和孩子，不接受自动守摊或免费代班' },
    女: { name: '赵诚安', bornOffset: -1, occupation: '车行修理与仓栈短驳工，按班领薪并照料自己的父亲', values: '愿意分担家用和照料，不把妻子的饭摊账、车行门路或码头关系据为己有' },
  };
  C.childNames.hankouport = ['周汀兰', '周渡安'];

  var dockBase = {
    kind: 'dock-transport-work', role: '码头装卸、理货与船岸交接劳动者', workplace: '汉口合成河街码头班组与相邻仓栈', employer: '汉口合成三槐装卸班组', supervisor: '领班贺三槐', colleague: '同班工李石桥', publicPerson: '托运杂货的蒋货主', terms: '有限试工后按班与按件混合结算；船期、货号、工段、工具、少件、伤害和工资分别记录',
    duties: '核口令、货号、装卸段、跳板安全与入仓签记，按实际班次结钱并处理货损、欠薪和工伤答复',
    scenes: ['一班船迟到半日，你失去另一份短工，贺三槐只结实际装卸时数。', '一只麻包入仓少一件，你与林绍坤按货号找到错堆处，没有从整班工资中扣除。', '同班工扭伤后先离开跳板，代班、治疗、证词与剩余工钱分别登记。'],
  };
  var rickshawBase = {
    kind: 'urban-transport-work', role: '人力车、手车与城市短途运输劳动者', workplace: '汉口合成码头、车行与商业区公开路线', employer: '汉口合成许记车行', supervisor: '车行许管事', colleague: '同车夫赵六顺', publicPerson: '常往仓栈的胡客人', terms: '一日试跑后逐班租车或按班受薪；车号、旧损、车租、路线、客货、修理、空跑和病休分别记录',
    duties: '核车况与路线，完成短途客货，答复误点、车资和损坏，并计算扣除车租与修理后的实际收入',
    scenes: ['胡客人临时改终点，你先重谈车资和能否赶回收车，而不是用争吵概括。', '车轴在半路异响，你停下让乘客换车，许管事按旧损记录承担修理。', '雨天三小时无人叫车，等客时间进入当天收入，没有被年终总结抹掉。'],
  };
  var foodBase = {
    kind: 'small-food-business', role: '河街饭摊备料、出餐与账务经营人', workplace: '汉口合成河街春梅饭摊', employer: '经营者何春梅', supervisor: '何春梅', colleague: '帮工孙荷香', publicPerson: '靠岸后吃饭的郭船工', terms: '有限试工后按班或按月结算；锅灶、食材、燃料、帮工工资、赊饭、坏损、房租和利润分别记录',
    duties: '备料出餐、核实际收款与赊期，给食客、供货人和帮工明确答复，并在汛期逐项搬摊复工',
    scenes: ['郭船工要再赊一餐，你按旧账和下次船期决定是否继续，不由父亲替母亲担保。', '孙荷香需照顾母亲而少做一班，你重排出餐并支付实际工钱。', '罗菜贩送来一筐坏叶，你们当面核重量，只付可用部分并改下一次供货。'],
  };
  Object.assign(C.routeCareerProfiles, {
    'hankou-dock-cargo-worker': dockBase,
    'hankou-rickshaw-worker': rickshawBase,
    'hankou-river-street-food-stall': foodBase,
  });
  C.routeCareerProfilesByGender = C.routeCareerProfilesByGender || {};
  C.routeCareerProfilesByGender['hankou-dock-cargo-worker'] = {
    男: Object.assign({}, dockBase, { role: '码头跳板装卸、看号与船岸交接工', duties: '在时代岗位门槛下承担更多负重与跳板段，同时核货号、口令和入仓签记；负重能力不带来班位所有权' }),
    女: Object.assign({}, dockBase, { role: '码头岸边缝包、看号与入仓交接工', workplace: '汉口合成码头岸边货栈与入仓登记处', duties: '在时代性别门槛下从缝包、看号、清点和岸边交接进入码头劳动，不假定可自由取得所有负重班位' }),
  };
  C.routeCareerProfilesByGender['hankou-rickshaw-worker'] = {
    男: Object.assign({}, rickshawBase, { role: '人力车客货驾驶与码头短驳工', duties: '核车号、旧损和车租，承担实际拉车与短驳负荷，并答复路线、误点与修理' }),
    女: Object.assign({}, rickshawBase, { role: '车行派车收付与短程手车交付工', workplace: '汉口合成许记车行派车处与许可短途路线', duties: '在时代可见机会限制下从车号、车资、排队和短程手车交付进入运输，不假定女性普遍从事长途载客拉车' }),
  };
  C.routeCareerProfilesByGender['hankou-river-street-food-stall'] = {
    男: Object.assign({}, foodBase, { role: '河街饭摊采购、夜间出餐与搬摊经营人', duties: '承担较远采购、夜间客饭和汛期搬摊，同时核工资与收款，不取代母亲锅灶产权' }),
    女: Object.assign({}, foodBase, { role: '河街饭摊饭食、茶食与赊账经营人', duties: '在时代劳动分工下管理备料、出餐、收付和帮工排班，保留工资、休息与合伙决定' }),
  };

  Object.assign(C.routeContactProfiles, {
    'hankou-dock-cargo-worker': [
      { id: 'f11_dock_coworker', label: '李石桥', role: '能说明同一班口令、伤害与实际工时的装卸工', status: 'coworker', relation: 25, born: 1902 },
      { id: 'f11_dock_cargo_owner', label: '蒋德顺', role: '会追问少件、破损与交付日的杂货托运人', status: 'nearby', relation: 17, born: 1889 },
      { id: 'f11_dock_tallywoman', label: '吴秀珍', role: '核缝包、货号与入仓签记的岸边女工', status: 'coworker', relation: 24, born: 1904 },
    ],
    'hankou-rickshaw-worker': [
      { id: 'f11_rickshaw_manager', label: '许有年', role: '说明车号、旧损、车租、收车时辰与修理责任的车行管事', status: 'supervisor', relation: 18, born: 1883 },
      { id: 'f11_rickshaw_coworker', label: '赵六顺', role: '会作证车况、路线和空跑时间的同车夫', status: 'coworker', relation: 26, born: 1898 },
      { id: 'f11_rickshaw_customer', label: '胡月笙', role: '会改终点、谈车资并要求误点答复的仓栈顾客', status: 'nearby', relation: 19, born: 1891 },
    ],
    'hankou-river-street-food-stall': [
      { id: 'f11_food_supplier', label: '罗庆丰', role: '按批核菜蔬、燃料、坏损与付款日的供货人', status: 'nearby', relation: 19, born: 1887 },
      { id: 'f11_food_coworker', label: '孙荷香', role: '按班领薪并保留母亲照料时间的饭摊帮工', status: 'coworker', relation: 27, born: 1903 },
      { id: 'f11_food_customer', label: '郭云波', role: '按船期吃饭、可能赊账也会亲自还款的船工食客', status: 'nearby', relation: 21, born: 1895 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'hankou-dock-cargo-worker': ['负重与跳板劳动造成的腰背旧伤', '湿冷江风与浸水造成的反复咳嗽', '轮班、空班与货损争议造成的失眠胃痛'],
    'hankou-rickshaw-worker': ['长时间奔跑造成的膝踝与足部损伤', '暑热、雨淋与空腹出车造成的晕眩胃痛', '车租、修理与收入波动造成的长期失眠'],
    'hankou-river-street-food-stall': ['久站、搬锅与采购造成的腰腿疼痛', '烟火、湿热与汛后清淤造成的呼吸不适', '早市、夜食与赊账压力造成的过劳胃痛'],
  });

  Object.assign(C.publicRouteProfiles, {
    'hankou-dock-cargo-worker': {
      publicGroup: '合成的码头工钱、伤害与货损公开答复簿', publicRole: '核公开班次、少结工钱、伤害见证与货损经手段',
      covertRole: '只有另经政治组织申请与联络考验后，才可能在高风险下做有限联络；码头工身份本身不等于组织成员', infiltrationRole: '不靠职业自动取得秘密身份；若另有潜入选择，只处理被明确授权的有限事实并承担被识破风险',
      contact: { id: 'public_f11_dock', label: '陈河清', role: '登记公开班次、工伤与少结工钱答复的码头互助经手人', status: 'colleague', relation: 19, born: 1901 },
    },
    'hankou-rickshaw-worker': {
      publicGroup: '合成的车夫车租、伤病与路线公开互助簿', publicRole: '核公开车租、旧损、病休、路线与乘客争议',
      covertRole: '只有另经申请与考验才可能参与有限联络；人力车路线不会自动变成情报能力', infiltrationRole: '不借载客套取隐私或冒充他人，秘密工作须由独立抉择触发并记录失败、胁迫与退出',
      contact: { id: 'public_f11_rickshaw', label: '夏守义', role: '登记车租、病休与公开路线争议的车夫互助经手人', status: 'colleague', relation: 18, born: 1899 },
    },
    'hankou-river-street-food-stall': {
      publicGroup: '合成的河街赊饭、失物与临时救济公开簿', publicRole: '核公开赊饭、失物、汛期床位与需要转介的街坊困难',
      covertRole: '饭摊只处理顾客主动提供的公开事实；若另经政治组织抉择参与联络，不能把所有食客和家人变成情报来源', infiltrationRole: '不借赊饭、包裹或住址冒名套话，任何秘密任务都需要独立授权并允许拒绝、退出或失败',
      contact: { id: 'public_f11_food', label: '魏宁芳', role: '登记汛期饭食、失物与街坊转介的公开互助经手人', status: 'colleague', relation: 20, born: 1905 },
    },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('skilled', 'hankou-dock-cargo-worker');
  addRouteToTrack('skilled', 'hankou-rickshaw-worker');
  addRouteToTrack('trade', 'hankou-river-street-food-stall');

  C.events.push(
    { id: 'hankou-rickshaw-access-1930', year: 1930, eraBrief: true, eraScope: '汉口城市交通', families: ['hankouport'], title: '人力车跨华界、租界与特别区通行发生变化', knownThrough: ['newspaper', 'conversation'], delta: { network: 1, position: 1 }, knownText: '你知道汉口公用部门处理了长期拖延的人力车跨区互通问题；道路与码头商业区连接改善，但车号、车租、当日规则和路况仍逐班限制工作。', unknownText: '车行忽然谈起几条过去不便通行的路线，你先从排队和客货变化感到规则松动，还不知道市政处理的全貌。', fact: '1930 年汉口人力车跨华界、租界与特别区互通规则发生变化。', historySource: { label: '武汉市档案馆：汉口中山大道交通与码头资料', url: 'https://www.whda.org.cn/dawh/whjy/202512/t20251223_2699328.shtml' } },
    { id: 'wuhan-flood-1931', year: 1931, eraBrief: true, eraScope: '武汉三镇与汉口河街', families: ['hankouport'], title: '1931 年洪水进入武汉城市日常', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { money: -3, health: -2, position: -2 }, knownText: '你知道洪水已影响武汉三镇和汉口街巷；住处、锅灶、车辆、码头班次、饮水和疾病风险必须分别处理。', unknownText: '水位、道路与船班先后失常，你只能从亲眼所见决定搬人、搬工具或停工，还不知道更大范围的灾情。', fact: '1931 年武汉洪水改变汉口住处、交通、码头与街头生计。', historySource: { label: '武汉市水务局：1931 年武汉水灾史料', url: 'https://swj.wuhan.gov.cn/tzdt/jcss/202110/t20211020_1799415.html' } },
    { id: 'wuhan-occupation-1938', year: 1938, eraBrief: true, eraScope: '武汉与汉口', families: ['hankouport'], title: '武汉进入长期沦陷时期', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { money: -2, health: -1, position: -2 }, knownText: '你知道 1938 年 10 月下旬汉口进入沦陷时期，交通、经济、市政与社会生活随后长期变化；一次去留不能替代此后七年的逐年日常。', unknownText: '空袭、撤离和管制先后打断船货、道路与住处，你只知道眼前岗位和家人地址，尚不能确认城市此后会持续多久。', fact: '1938 年 10 月汉口进入持续至 1945 年受降前后的沦陷时期。', historySource: { label: '武汉市档案馆：《武汉沦陷时期档案史料丛编》介绍', url: 'https://www.whda.org.cn/dawh/bycg/202512/t20251203_2689132.html' } }
  );
  installDecision({
    id: 'route-hankou-dock-cargo-worker-1929', year: 1929, followYear: 1930, routes: ['hankou-dock-cargo-worker'], title: '一只箱子破损时怎样停住含糊扣薪',
    prompt: '箱子在卸船、过跳板或入仓后才被发现破损。船方、班组和仓栈都说不是自己一段，货主要从全班工钱里扣。',
    options: [
      option('dock-preserve-handoff', '停住搬运，逐段核货号、外观与具名交接', { knowledge: 3, mind: 3, money: -1 }, 'f11:dock:handoff', '1929 年保留现场并逐段核码头货损交接。', '破损只落到能证明的一段', '林绍坤的入仓簿显示箱角在入仓前已裂，船方记录外包装曾受潮；班组不再被整班扣薪，可核损失由具体经手段继续答复。'),
      option('dock-witness-statement', '只陈述亲眼所见，并请同班工分别作证', { network: 2, mind: 3, position: 1 }, 'f11:dock:witness', '1929 年以同班人的分段证词回应货损。', '三份证词没有拼成假确定', '三人只确认跳板段没有跌落，无法证明此前与此后的状态；班组先领无争议工钱，未知责任继续保留，没有被主角一句话判定。'),
      option('dock-bounded-settlement', '接受写清范围的和解，拒绝承担未知货值', { money: -2, relation: 2, mind: 1 }, 'f11:dock:settlement', '1929 年接受有限货损和解并拒绝包下未知损失。', '和解书留下金额与未决部分', '班组只承担一次可核搬运疏失，货主撤回全班扣薪；箱内未开验货值不在和解内，林绍坤保留继续复核的日期。'),
    ],
  });

  installDecision({
    id: 'route-hankou-dock-cargo-worker-1946', year: 1946, followYear: 1947, routes: ['hankou-dock-cargo-worker'], title: '港区恢复后继续扛货、转理货还是组织有限运输小队',
    prompt: '船货恢复但班组、趸船和管理边界都在重核。你的身体已经积累旧伤，经验可以换成轻活，也可能投入有限工具组织小队。',
    options: [
      option('dock-salaried-tally', '转为按月理货与交接，停止承担主要负重', { knowledge: 2, money: 2, health: 2, position: 1 }, 'f11:dock:tally', '1946 年转入码头货栈做受薪理货与交接。', '轻活仍有班表、老板和责任', '林绍坤安排你核货号、件数、破损和入仓人，贺三槐继续带装卸班；你少赚按件钱，却取得较固定班表并开始治疗腰伤。'),
      option('dock-limited-cart-team', '以工具、现金和工钱记录组织有上限的装卸运输小队', { money: -5, network: 3, craft: 2 }, 'f11:dock:team', '1946 年以有限工具和现金组织码头装卸运输小队。', '小队第一月只结三辆手车和四个人', '你与贺三槐分别投入列明绳索、手车份额与劳动，四名工人按班领薪；货损、修理、停班和退出逐项入账，没有因当领队拥有整座码头。', { enterpriseStart: { id: 'f11-dock-cart-team', name: '汉口合成三槐装卸运输小队', domainKey: 'D46', kind: 'bounded-dock-cart-team', workplace: '汉口合成港区公开装卸与短驳范围', product: '有货号、班表与交接单的装卸和短途手车运输', employees: 4, partners: [{ personId: 'contact:f11_he_sanhuai', role: '有限工具与排班经验合伙人' }], asset: { id: 'dock-handcarts-tools', kind: 'handcarts-ropes-tools', description: '三辆有归属记录的手车、绳索与防滑工具份额' }, license: { id: 'dock-work-roster-permission', kind: 'documented-dock-work-permission', authority: '汉口合成港区具名管理单位', scope: '仅限排班表列明泊位、货类与短驳范围' } } }),
      option('dock-leave-heavy-work', '退出码头重活，凭记录转仓栈或店铺受薪工作', { health: 3, knowledge: 2, money: 1, position: 1 }, 'f11:dock:leave', '1946 年退出码头重活并凭交接记录另找受薪岗位。', '最后一班工钱和新岗位分别结清', '贺三槐结清最后两班，林绍坤只证明你的理货能力；新仓栈给六周试用，不继承旧班位，也不要求用伤腿继续扛货。'),
    ],
  });
  installDecision({
    id: 'route-hankou-rickshaw-worker-1929', year: 1929, followYear: 1930, routes: ['hankou-rickshaw-worker'], title: '车行准备跨区跑车前怎样处理车租与押责',
    prompt: '道路与跨区通行正在变化。许管事要你先交一笔押责，但车轴已有异响，路线、收车点和损坏算法还没写清。',
    options: [
      option('rickshaw-inspect-before-deposit', '与同车夫验车、记旧损，再交限定押责', { craft: 3, mind: 2, money: -1 }, 'f11:rickshaw:inspect', '1929 年验明旧损并写清范围后承担有限押责。', '跨区第一班没有吞掉旧损', '赵师傅作证车轴异响早已存在，许管事负责旧修理；你只对当班新损和交回时间负责，第一班客货收入照实际扣车租。'),
      option('rickshaw-rent-by-shift', '只按一班租车，不预付长期席位', { money: 1, position: 1, mind: 2 }, 'f11:rickshaw:shift', '1929 年改为逐班租车并保留换车权。', '少跑的班次换来可退出边界', '车行不给你热门时段保证，你也不承担整月空租；三班中两班有客，一班空跑，收入和等客时间都写进账。'),
      option('rickshaw-refuse-unclear-liability', '拒绝不清押责，先做派车、手车或搬运行程', { money: -1, knowledge: 2, health: 1 }, 'f11:rickshaw:refuse', '1929 年拒绝不清车损责任并转做车行内勤与短途手车。', '没有拉车仍得到一份明确工作结果', '你核车号、排队和车资，另完成两趟短途手车；工钱较低但当日结清，许管事若补齐车况记录才可再谈拉车。'),
    ],
  });

  installDecision({
    id: 'route-hankou-rickshaw-worker-1946', year: 1946, followYear: 1947, routes: ['hankou-rickshaw-worker'], title: '旧车、身体和战后客货变化怎样重新落地',
    prompt: '车行重新开班。你可以继续逐班租车、借款买下一辆旧车，或转入有固定发车表的短途接驳；每条路都有修理、空跑和身体成本。',
    options: [
      option('rickshaw-continue-shift-rental', '继续逐班租车，保留病休和换车权', { money: 2, health: 1, position: 1 }, 'f11:rickshaw:rental', '1946 年继续逐班租车并写明病休与换车边界。', '一月收入把空跑也算进去', '十二班中三班空跑、一班因膝痛请假；你只交实际出车租，赵师傅接到代班钱，车行没有把缺班补成欠债。'),
      option('rickshaw-buy-one-used-cart', '以有期限借款买一辆旧车，自己驾驶并承担修理', { money: -6, craft: 2, network: 1 }, 'f11:rickshaw:owner', '1946 年以具名借款取得一辆旧人力车的有限经营资产。', '有一辆车不等于成为车行老板', '旧车登记在你名下，首月收入先扣车款、轮胎和修理；没有雇工，不能垄断路线，病休日也没有别人替你赚钱。', { enterpriseStart: { id: 'f11-one-rickshaw-owner', name: '汉口合成一车短途营生', domainKey: 'D46', kind: 'single-rickshaw-owner-operator', workplace: '汉口合成码头与商业区之间的许可短途路线', product: '按实际车次结算的短途客货运输', employees: 0, asset: { id: 'one-used-rickshaw', kind: 'used-rickshaw', description: '一辆有车号、旧损与修理记录的人力车' }, debt: { id: 'used-rickshaw-installments', creditor: '许记车行与具名修车铺', purpose: '旧车价款、首轮轮胎与车轴修理' }, license: { id: 'short-distance-rickshaw-registration', kind: 'documented-rickshaw-registration', authority: '汉口合成城市交通管理单位', scope: '仅限登记车号与当时允许通行的公开路线' } } }),
      option('rickshaw-scheduled-transfer', '转入仓栈与渡口的定点短驳，按月领薪', { money: 2, knowledge: 2, health: 1, network: 1 }, 'f11:rickshaw:transfer', '1946 年转入仓栈与渡口之间的受薪短驳岗位。', '定点路线仍有老板、同事和误点', '林绍坤介绍一次面谈，仓栈冯主管亲自录用；你按发车表送小件与乘客，误点要答复，旧车行和旧客由他们自己继续。'),
    ],
  });

  installDecision({
    id: 'route-hankou-river-street-food-stall-1929', year: 1929, followYear: 1930, routes: ['hankou-river-street-food-stall'], title: '客多、赊账和帮工工资同时到期时先保什么',
    prompt: '三名船工赊饭，固定食客增加，帮工工钱与供货款都到期。饭摊看起来很忙，但当天现钱不够同时支付所有项目。',
    options: [
      option('food-protect-worker-wage', '先付帮工工钱，缩菜单并逐人重谈赊期', { money: -2, relation: 3, craft: 1 }, 'f11:food:wage', '1929 年先付饭摊帮工工钱并缩减菜单。', '帮工留下自己的收入和选择', '孙荷香按期领钱并决定继续两班；三名船工各自确认欠期，一人补现钱、一人改吃便饭、一人停止赊账，忙碌没有掩盖现金缺口。'),
      option('food-named-supplier-credit', '向具名供货人延一批款并写清停供日', { money: 2, network: 2, mind: 1 }, 'f11:food:credit', '1929 年取得一笔有供货人与期限的食材赊款。', '继续开灶对应一笔明确债务', '罗菜贩写明金额、还款日与停供条件；何春梅的锅灶不作抵押，下一周收入先还食材款，帮工工钱仍单独支付。'),
      option('food-end-open-credit', '停止新增赊饭，只保留已写清的三笔旧账', { money: 1, relation: -2, mind: 3 }, 'f11:food:end-credit', '1929 年停止无期限赊饭并保留三笔具名旧账。', '少掉的熟客与回收的钱分别出现', '一名船工转去别摊，一人两周后还清，一人仍欠但留下船期；饭摊少了人情介绍，也不再用帮工工钱垫无限赊账。'),
    ],
  });

  installDecision({
    id: 'route-hankou-river-street-food-stall-1946', year: 1946, followYear: 1947, routes: ['hankou-river-street-food-stall'], title: '母亲减少久站后怎样把饭摊接成下一段生活',
    prompt: '何春梅腿痛加重，想减少早晚两头当班。锅灶、旧客、铺位、现金、帮工工资和主角劳动不能混成一句“把店传给你”。',
    options: [
      option('food-remain-salaried-manager', '继续按月管理，母亲保留锅灶与关店决定', { money: 2, relation: 2, health: 1 }, 'f11:food:manager', '1946 年继续受薪管理河街饭摊并保留母亲产权。', '交班表替代自动继承', '何春梅减少早班，仍决定锅灶维修与是否退租；你核采购和收款，孙荷香按班领薪，三人的产权与劳动没有因亲属关系混在一起。'),
      option('food-limited-family-partnership', '按锅灶、现金与劳动建立有退伙边界的合伙小店', { money: -4, relation: 3, craft: 2 }, 'f11:food:partnership', '1946 年建立有具名资产与退伙边界的河街饭食合伙。', '固定小店第一月没有自动盈利', '何春梅投入列明锅灶，魏玉英只投入有限燃料周转，你投入现金与劳动；房租、食材、工资、坏损、赊账和退出条件逐项结算。', { enterpriseStart: { id: 'f11-river-food-partnership', name: '汉口合成春玉河街饭食社', domainKey: 'D44', kind: 'bounded-river-street-food-partnership', workplace: '汉口合成河街一处固定饭食铺位', supplier: '罗记菜蔬与燃料供货人', product: '有当日菜单、收款与赊期记录的码头饭食和茶食', employees: 1, partners: [{ personId: 'parent:mother', role: '锅灶与旧客边界合伙人' }, { personId: 'contact:f11_wei_yuying', role: '有限燃料周转与茶食劳动合伙人' }], asset: { id: 'river-food-tools', kind: 'stove-tables-food-tools', description: '何春梅具名锅灶、三人盘点的桌凳与食具' }, license: { id: 'fixed-food-stall-registration', kind: 'documented-food-stall-registration', authority: '汉口合成市场与街区管理单位', scope: '仅限登记铺位、饭食与茶食品项' } } }),
      option('food-independent-mobile-counter', '只带自购器具另做流动茶食，不拿走母亲旧客和锅灶', { money: -3, network: 2, position: -1 }, 'f11:food:independent', '1946 年另用自购器具经营流动茶食并承担自己的货款。', '独立营生从零核路线和顾客', '你只带走自己的小炉、食具和首批茶食，母亲保留原摊与旧赊账；三处停靠点各给一次实际销量，没有凭家庭经验自动取得固定铺位。', { enterpriseStart: { id: 'f11-mobile-tea-counter', name: '汉口合成江梅流动茶食担', domainKey: 'D44', kind: 'sole-mobile-tea-food-stall', workplace: '汉口合成码头外与商业街许可停靠点', supplier: '罗记具名茶食供货人', product: '按日核进货、损耗与收款的茶食和简餐', employees: 0, asset: { id: 'mobile-tea-tools', kind: 'portable-stove-food-tools', description: '主角自购的小炉、茶桶、食具与有来源的首批货' }, debt: { id: 'mobile-stall-opening-stock', creditor: '罗记具名茶食供货人', purpose: '首批茶食、燃料与便携器具' } } }),
    ],
  });

  installDecision({
    id: 'hankou-flood-1931', year: 1931, followYear: 1932, families: ['hankouport'], title: '1931 年水位漫入街巷时先搬什么、谁去哪里',
    prompt: '水位已影响河街、摊位和通往码头的道路。父亲等最后一班消息，母亲要保锅灶，桂枝有仓栈答复，魏玉英还要照顾自己的母亲。',
    options: [
      option('flood-move-people-tools-first', '先把人、药、锅灶和工作凭据搬到已确认高处', { money: -3, position: 2, health: 2, relation: 2 }, 'f11:flood:move', '1931 年先把家人、药物、谋生工具与凭据迁到已确认高处。', '高处住下以后工作没有自动恢复', '何春梅保住主要锅灶，周发水失去三班工，桂枝带走货号笔记；魏玉英另陪母亲落脚，两个家只合运一车工具，没有被合成一个家口。'),
      option('flood-split-work-and-shelter', '一组守临时住处，一组只核可安全抵达的班次', { money: -1, network: 2, relation: -1, mind: 2 }, 'f11:flood:split', '1931 年按住处与安全班次分组行动。', '分组带来工钱也带来失联时段', '父亲得到一班搬运，母亲与桂枝守高处锅灶；傍晚路断后两组只靠约定地点重见，一段未联络没有被补写成伤亡。'),
      option('flood-close-work-preserve-health', '停止出摊和出车，只保留现金、食物与复工联系人', { money: -3, health: 3, mind: 2, position: -1 }, 'f11:flood:close', '1931 年停止出摊、出车与临水装卸并保留复工联系人。', '停工账留下真实损失', '家中少了数周收入，却避免一次临水受伤；三名熟客、车行许管事和贺三槐分别留下水退后的答复日，没有被写成已经失去所有门路。'),
    ],
  });

  installDecision({
    id: 'hankou-port-war', year: 1938, followYear: 1939, families: ['hankouport'], title: '空袭、撤离与城市管制改变工作和住处时怎样安排',
    prompt: '轰炸与逼近的战事让船货、道路、饭摊和仓栈分别停顿。父母、桂枝、伴侣、同班人和邻摊都有自己的岗位与家口，主角不能替他们统一去留。',
    options: [
      option('hankou-verified-work-move', '只随职责、负责人、住处与同行人都确认的单位迁移', { money: -2, position: 1, network: 2 }, 'f11:war:work', '1938 年只随已确认工作与住处迁移。', '迁到新地点仍要重新接班与找床位', '你得到具名仓栈或运输岗位和临时床位；父母选择保留河街最后地址，桂枝按自己的工作另作决定，伴侣没有因婚姻被自动带走。', { warTurn: 'verified-work-move' }),
      option('hankou-local-civilian-life', '留在本地，只做对象与用途明确的民生日常', { craft: 2, money: 1, relation: 1 }, 'f11:war:local', '1938 年留在汉口维持用途明确的运输、饭食或仓栈工作。', '本地工作逐项减少又重排', '你只接公开民生客货与饭食，拒绝来源和用途不明的高价任务；收入下降，何春梅缩摊，父亲是否继续出班仍由身体和实际管制决定。', { warTurn: 'local-civilian-life' }),
      option('hankou-split-addresses-reserves', '家人分别保存最后地址、现金、工作和下次核信日', { network: 3, mind: 2, relation: 1 }, 'f11:war:split', '1938 年家人分别保存地址、储备、工作与下次核信日期。', '分开生活没有被写成失散或死亡', '母亲保留锅灶，父亲停在最后已知班组，桂枝随岗位近迁，伴侣保留自己的工资；退信只让一个地址失效，不覆盖其他人的状态。', { warTurn: 'split-addresses-reserves' }),
    ],
  });
})(typeof window !== 'undefined' ? window : globalThis);
