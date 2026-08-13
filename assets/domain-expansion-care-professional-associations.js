// 民国人生 · D30／D32／D36 照护、专业协助与社会组织完整领域包 v0.7.20
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before domain-expansion-care-professional-associations.js');

  C.version = '0.7.20';

  var ROUTE_CARE = 'sichuan-long-term-care';
  var ROUTE_PROFESSIONAL = 'hankou-legal-accounting';
  var ROUTE_ASSOCIATION = 'hankou-trade-associations';

  Object.assign(C.legacyRouteDomainMap, {
    'sichuan-long-term-care': 'D30',
    'hankou-legal-accounting': 'D32',
    'hankou-trade-associations': 'D36',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-D30-YUEYANG-RELIEF': {
      label: '岳阳市地方志：民国救济院所设安老、残疾、施医等分支',
      url: 'https://www.yueyang.gov.cn/yysqw/43332/43334/43509/43514/43606/43626/content_1263141.html',
      supports: ['民国地方救济院的安老、残疾、施医、经费和有限收养条件'], status: 'source-reviewed-first-round',
    },
    'SRC-D30-RED-CROSS': {
      label: '中国红十字会：近代医院、护士学校、战事救护与社会救济沿革',
      url: 'https://www.redcross.org.cn/html/2022-03/84326_1.html',
      supports: ['近代医院学堂、护士学校、战事救护、灾难救助与社会救济的岗位背景'], status: 'source-reviewed-first-round',
    },
    'SRC-D30-TIANJIN-REHAB': {
      label: '天津市文化和旅游局：近代医院理疗、康复室与病房设置',
      url: 'https://whly.tj.gov.cn/tjswlzxw/jgbn/whtj/jzwh/xsjz/202501/t20250110_6829732.html',
      supports: ['20 世纪上半叶医院中理疗、康复室、病房与慈善经费的存在'], status: 'source-reviewed-first-round',
    },
    'SRC-D30-BAOXING': {
      label: '上海市民政局：始于清光绪年间的宝兴殡仪馆沿革',
      url: 'https://mzj.sh.gov.cn/MZ_BZ35_0-2-14-19/20250915/447ee2ef556747caa5102457933270d1.html',
      supports: ['近代城市殡仪服务机构长期存在；身后事务是独立劳动与服务'], status: 'source-reviewed-first-round',
    },
    'SRC-D32-CICPA': {
      label: '中国注册会计师协会：1918 年会计师制度与 1925 年公会沿革',
      url: 'https://www.cicpa.org.cn/ztzl1/zthf/qzzx20/zhxx/200811/t20081121_42163.html',
      supports: ['会计师证书、事务所、公会、注册制度及 1949 年前行业规模'], status: 'source-reviewed-first-round',
    },
    'SRC-D32-SH-ARCHIVES': {
      label: '上海市档案馆：民国律师公会、案件、会员与会计报告档案指南',
      url: 'https://www.shda.gov.cn/daly/gczn/202509/t20250919_74644.html',
      supports: ['律师资格、公会、民事案件、当事人往来、收支与会计报告等具体职业材料'], status: 'source-reviewed-first-round',
    },
    'SRC-D32-COUNTY-JUSTICE': {
      label: '最高人民法院：民国县司法处制度与基层司法职业史',
      url: 'https://www.court.gov.cn/jianshe/xiangqing/108491.html',
      supports: ['1936—1949 年基层司法处、书记官、案件受理与职业资格边界'], status: 'source-reviewed-first-round',
    },
    'SRC-D32-MOJ-HISTORY': {
      label: '司法部：近代律师引入、城市私人执业与收费服务历史',
      url: 'https://www.moj.gov.cn/pub/sfbgw/jgsz/jgszzsdw/zsdwflyzzx/flyzzxzcxx/zcxxfyzl/201906/t20190624_188957.html',
      supports: ['旧中国律师集中于有限城市、私人开业和收费服务的现实边界'], status: 'source-reviewed-first-round',
    },
    'SRC-D36-HANKOU-CHAMBER': {
      label: '国家档案局：1899—1949 年汉口商会档案与同业公会史料',
      url: 'https://www.saac.gov.cn/daj/c100230/202011/be5820779e244b2d9130b57af19a49c2.shtml',
      supports: ['汉口商会的组织演进、经济社会活动、同业公会与政府关系'], status: 'source-reviewed-first-round',
    },
    'SRC-D36-SH-SOCIETIES': {
      label: '上海市档案馆：商会、同业公会和社会团体档案指南',
      url: 'https://www.shda.gov.cn/daly/gczn/202509/t20250919_74644.html',
      supports: ['会员、会费、会议、调解、公益、战损、接收与机构更替等组织劳动'], status: 'source-reviewed-first-round',
    },
    'SRC-D36-ASSOCIATION-HISTORY': {
      label: '中国供销合作网：商会、行会与同业组织的历史形态',
      url: 'https://www.chinacoop.gov.cn/HTML/2009/04/09/25206.html',
      supports: ['商会、行会、同业公会在工商管理、协作与信誉约束中的历史角色'], status: 'source-reviewed-first-round',
    },
    'SRC-D36-WUJIANG-CHAMBER': {
      label: '吴江政协文史资料：民国地方商会、事务所与 1949 后组织承接',
      url: 'https://www.wjzx.gov.cn/Upload/News/file/20221213131358104.pdf',
      supports: ['地方商会成立、事务所、同业公会与 1949 年后工商组织更替'], status: 'source-reviewed-first-round',
    },
  });

  Object.assign(C.routes, {
    'sichuan-long-term-care': {
      name: '长期照护、伤病恢复与身后事务', family: 'sichuanmedicine',
      summary: '从本人同意的起居照料、伤病恢复和照护轮班做起，也处理救济申请、照护者休息、真实死亡确认后的身后事务与家属哀伤；照料不是女性或亲属的无偿天职。',
    },
    'hankou-legal-accounting': {
      name: '法律文书、会计账务与审计协助', family: 'hankoucommerce',
      summary: '从凭据、账簿、委托范围与案件登记进入专业服务，逐步分清账房、会计师、律师和司法协助的资格、利益冲突、保密、收费、差错与复核。',
    },
    'hankou-trade-associations': {
      name: '商会、同业公会与社会组织事务', family: 'hankoucommerce',
      summary: '具体经手会员、会费、会议、行业调查、争议调解、公益救济和机构更替；组织职位不是企业股权，也不自动生成党籍、秘密身份或代表全体成员的权力。',
    },
  });

  var sichuanPath = C.decisions.find(function (item) { return item.id === 'sichuan-path'; });
  if (sichuanPath && !sichuanPath.options.some(function (item) { return item.id === 'long-term-care'; })) {
    sichuanPath.prompt = '药铺、饮食摊、医护训练和卫生机构之外，救济照护、伤病恢复与身后事务也需要有工资、轮班、本人同意和交接的专门劳动。';
    sichuanPath.options.push({ id: 'long-term-care', label: '从一名伤病者的起居、恢复记录与家属轮班开始长期照护训练', route: ROUTE_CARE, delta: { craft: 3, relation: 2, money: -1 }, fact: '1923 年进入有本人同意、轮班、工资与转介边界的长期照护和伤病恢复训练。' });
  }

  var hankouPath = C.decisions.find(function (item) { return item.id === 'hankou-commerce-path'; });
  if (hankouPath && !hankouPath.options.some(function (item) { return item.id === 'legal-accounting-trial'; })) {
    hankouPath.title = '五份有限试工里哪一份成为第一段成年谋生';
    hankouPath.prompt = '行栈、仓间、干货合单、专业事务所与商会事务处都给一次有限机会；职责、工资、资格、签字权和答复日必须逐项问清。';
    hankouPath.options.push(
      { id: 'legal-accounting-trial', label: '去专业事务所试做凭据、账页、委托登记与案卷交接', route: ROUTE_PROFESSIONAL, delta: { knowledge: 4, mind: 2, money: 1 }, fact: '1924 年进入有资格和复核边界的法律文书、会计与审计协助试工。' },
      { id: 'trade-association-trial', label: '去商会事务处试做会员、会费、会议和争议登记', route: ROUTE_ASSOCIATION, delta: { knowledge: 3, network: 3, money: 1 }, fact: '1924 年进入有章程、会员与公开职责的商会和同业组织事务试工。' }
    );
  }

  C.actions.push(
    { id: 'd30-care-plan', name: '与本人核一日进食、清洁、活动、休息和不愿接受的照料', routes: [ROUTE_CARE], minAge: 14, spirit: 4, careerAction: true, delta: { craft: 3, relation: 2, health: -1 }, contactEffects: { d30_liao_shuying: { relation: 2 } }, note: '本人能表达时由本人决定，家属方便不能替代同意；游戏不提供现实医疗操作指引。' },
    { id: 'd30-recovery-record', name: '在医护指导范围内记录一段伤病恢复与转介', routes: [ROUTE_CARE], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, knowledge: 3, health: -1 }, contactEffects: { d30_qian_wenshu: { relation: 2 } }, note: '能做、不能做、疼痛变化和复查日期分别记录，不把陪练写成治愈。' },
    { id: 'd30-assistive-change', name: '和使用者试一项床位、扶手、照明或出行调整', routes: [ROUTE_CARE], minAge: 15, spirit: 3, careerAction: true, delta: { craft: 3, mind: 2, money: -1 }, contactEffects: { d30_zhou_shouan: { relation: 2 } }, note: '由使用者说是否方便；调整环境不自动恢复身体，也不占有对方住处。' },
    { id: 'd30-care-roster', name: '重排家属、领薪照护者和替班人的时间与报酬', routes: [ROUTE_CARE], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 3, relation: 2, money: 1 }, contactEffects: { d30_sun_yulan: { relation: 2 } }, note: '妻子、女儿、媳妇或邻人都不是默认免费守夜者，拒绝与休息也进入账本。' },
    { id: 'd30-relief-application', name: '替一户核救济申请、名额、口粮、照护与未获答复项', routes: [ROUTE_CARE], minAge: 16, spirit: 4, careerAction: true, delta: { knowledge: 2, network: 2, relation: 2 }, contactEffects: { d30_he_jichang: { relation: 2 } }, note: '申请、获准、入住、领取和持续服务不是同一结果。' },
    { id: 'd30-caregiver-rest', name: '因腰痛、失眠或发热安排自己停班与具名接替', routes: [ROUTE_CARE], minAge: 15, spirit: 2, careerAction: true, delta: { health: 3, mind: 2, money: -1 }, contactEffects: { d30_sun_yulan: { relation: 1 } }, note: '照护者也会生病；休息不等于遗弃，被照护者仍需知道谁来、何时来。' },
    { id: 'd30-death-confirmed-arrangement', name: '只在死亡经具名确认后登记通知、停灵、费用与本人愿望', routes: [ROUTE_CARE], minAge: 18, spirit: 4, careerAction: true, delta: { mind: 3, relation: 2, money: 1 }, contactEffects: { d30_feng_boqin: { relation: 2 } }, note: '该行动不制造任何角色死亡；未确认、失联和已死亡严格分开。' },
    { id: 'd30-grief-record', name: '陪家属核遗物、债务、通信、仪式分歧与可暂停事项', routes: [ROUTE_CARE], minAge: 18, spirit: 3, careerAction: true, delta: { mind: 3, relation: 3 }, contactEffects: { d30_feng_boqin: { relation: 1 } }, note: '哀伤没有统一进度；家属能拒绝、改期或保留分歧，服务者不替死者编遗言。' },

    { id: 'd32-voucher-ledger', name: '把原凭、抄件、账页、经手人和待核差额逐项对齐', routes: [ROUTE_PROFESSIONAL], minAge: 14, spirit: 4, careerAction: true, delta: { knowledge: 4, mind: 2, health: -1 }, contactEffects: { d32_xie_wenlin: { relation: 2 } }, note: '没有凭据就标待核，不用一笔平账掩盖谁欠谁或谁有签字权。' },
    { id: 'd32-client-intake', name: '核一份委托的当事人、问题、期限、费用和不能承诺项', routes: [ROUTE_PROFESSIONAL], minAge: 15, spirit: 3, careerAction: true, delta: { knowledge: 3, relation: 2, money: 1 }, contactEffects: { d32_liu_suyun: { relation: 2 } }, note: '听取与登记不是接案成功，文书员也不能冒充持证律师或会计师。' },
    { id: 'd32-audit-trace', name: '抽核一批现金、货物、工资与捐款的来路去向', routes: [ROUTE_PROFESSIONAL], minAge: 17, spirit: 4, careerAction: true, delta: { knowledge: 4, mind: 3 }, contactEffects: { d32_pan_xuzhou: { relation: 2 } }, note: '抽核范围、未见材料和限制必须公开，审计意见不替老板取得货物。' },
    { id: 'd32-legal-file', name: '整理一宗债务、房屋、婚姻或继承事项的证据目录', routes: [ROUTE_PROFESSIONAL], minAge: 17, spirit: 4, careerAction: true, delta: { knowledge: 4, relation: 1 }, contactEffects: { d32_chen_yuzhen: { relation: 2 } }, note: '当事人陈述、证件、来信、证人和未知分别标注；游戏不提供现实法律意见。' },
    { id: 'd32-conflict-check', name: '在看材料前核双方、亲属、客户和过去经手关系', routes: [ROUTE_PROFESSIONAL], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 4, fame: 1 }, contactEffects: { d32_xie_wenlin: { relation: 1 } }, note: '发现利益冲突就说明并转介，不因熟人或高价自动接办。' },
    { id: 'd32-fee-receipt', name: '把咨询、抄件、差旅、代理和未发生费用分开开据', routes: [ROUTE_PROFESSIONAL], minAge: 16, spirit: 3, careerAction: true, delta: { money: 2, mind: 2 }, contactEffects: { d32_liu_suyun: { relation: 1 } }, note: '收费不保证结果，减免、欠付和退费另留答复。' },
    { id: 'd32-correction-notice', name: '发现错页、错数或漏交期限后通知受影响者并保留原件', routes: [ROUTE_PROFESSIONAL], minAge: 17, spirit: 4, careerAction: true, delta: { mind: 4, fame: -1, relation: 2 }, contactEffects: { d32_zhang_jingyi: { relation: 2 } }, note: '改正记录不抹掉已经错过的期限、费用或信任损失。' },
    { id: 'd32-study-rest', name: '在夜账、期限和考试之间安排停工、复核人与睡眠', routes: [ROUTE_PROFESSIONAL], minAge: 16, spirit: 2, careerAction: true, delta: { health: 3, knowledge: 2, money: -1 }, contactEffects: { d32_he_qingyuan: { relation: 1 } }, note: '资格训练和加班都耗费身体；累倒不会自动换成更专业。' },

    { id: 'd36-member-register', name: '核一批会员的行业、店号、代表人、会费与退出状态', routes: [ROUTE_ASSOCIATION], minAge: 14, spirit: 3, careerAction: true, delta: { knowledge: 3, network: 2 }, contactEffects: { d36_tao_zhengyuan: { relation: 2 } }, note: '入会、任职、交费和授权分别记录；一个会员不能替全行业表态。' },
    { id: 'd36-meeting-minutes', name: '记一场有出席、提案、反对、回避、表决与未决项的会议', routes: [ROUTE_ASSOCIATION], minAge: 15, spirit: 4, careerAction: true, delta: { knowledge: 3, mind: 3 }, contactEffects: { d36_wu_jingzhen: { relation: 2 } }, note: '会议不是“大家同意”；异议、离席和没有形成决定都保留。' },
    { id: 'd36-trade-survey', name: '逐户核价格、库存、停业、工资、损失与不愿回答项', routes: [ROUTE_ASSOCIATION], minAge: 16, spirit: 4, careerAction: true, delta: { knowledge: 3, network: 2, health: -1 }, contactEffects: { d36_luo_huiqin: { relation: 2 } }, note: '调查只代表所见样本，不把缺报商户补成服从或倒闭。' },
    { id: 'd36-dispute-intake', name: '登记一宗货款、货损或同业争议的双方陈述与权限', routes: [ROUTE_ASSOCIATION], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 3, relation: 2 }, contactEffects: { d36_cai_boan: { relation: 2 } }, note: '商会可协商和转介，不冒充法院，也不扣押任何一方财物。' },
    { id: 'd36-dues-budget', name: '公开核会费、工资、房租、救济与活动支出', routes: [ROUTE_ASSOCIATION], minAge: 16, spirit: 3, careerAction: true, delta: { money: 2, mind: 3 }, contactEffects: { d36_wu_jingzhen: { relation: 1 } }, note: '组织经费不是经手人的钱，捐款也不能自动挪作日常开支。' },
    { id: 'd36-public-relief', name: '把一批赈济或公共物资的募集、审核、领取和余项公布', routes: [ROUTE_ASSOCIATION], minAge: 17, spirit: 4, careerAction: true, delta: { relation: 3, network: 2, money: -1 }, contactEffects: { d36_fang_xiumei: { relation: 2 } }, note: '公益不取消受助者尊严，也不把捐赠换成永久政治或商业支持。' },
    { id: 'd36-rule-appeal', name: '答复一名被拒会员的依据、复核人和申诉期限', routes: [ROUTE_ASSOCIATION], minAge: 17, spirit: 3, careerAction: true, delta: { mind: 4, fame: 1 }, contactEffects: { d36_fang_xiumei: { relation: 1 } }, note: '章程、现行决定和个人好恶分开，职位不能靠删名报复异议。' },
    { id: 'd36-staff-boundary', name: '核事务员工资、加班、家庭照料、请假和下一班交接', routes: [ROUTE_ASSOCIATION], minAge: 15, spirit: 2, careerAction: true, delta: { health: 3, relation: 2, money: -1 }, contactEffects: { d36_zhou_mingli: { relation: 2 } }, note: '“为同业服务”不等于无限义务劳动，男女职员都能休息、晋升或离开。' }
  );

  var sourceIds = {
    care: ['SRC-D30-YUEYANG-RELIEF', 'SRC-D30-RED-CROSS', 'SRC-D30-TIANJIN-REHAB', 'SRC-D30-BAOXING'],
    professional: ['SRC-D32-CICPA', 'SRC-D32-SH-ARCHIVES', 'SRC-D32-COUNTY-JUSTICE', 'SRC-D32-MOJ-HISTORY'],
    association: ['SRC-D36-HANKOU-CHAMBER', 'SRC-D36-SH-SOCIETIES', 'SRC-D36-ASSOCIATION-HISTORY', 'SRC-D36-WUJIANG-CHAMBER'],
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

  var care = [
    [1924, '第一户长期照护先听谁的安排', '廖淑英伤病后需要协助起居。她本人能清楚表达，家人却已经替她定下整日卧床与由女眷轮守。',
      opt('person-plan', '先由廖淑英逐项说能做、需帮和拒绝什么', { relation: 4, mind: 2 }, '1924 年依本人意愿建立第一份长期照护安排。', '廖淑英保留自己吃饭和短距离活动，夜间才由孙玉兰领薪接班；家属改了两项方便自己的安排。'),
      opt('joint-meeting', '让本人、家属、医护和照护者当面分工', { network: 3, relation: 2 }, '1924 年以四方会面明确照护职责。', '钱文淑写清需复查的伤情，孙玉兰报出可值时段；一项争议暂缓，没有被会议伪装成全体同意。'),
      opt('trial-week', '只订七天试行与每日反馈，不承诺长期不变', { craft: 3, mind: 2 }, '1924 年先执行一周可修改照护试行。', '一周后撤掉不便的固定束缚，增加照明和夜壶位置；试行结果没有被写成永久同意。')],
    [1926, '恢复练习遇到疼痛怎样处理', '周守安想恢复走路，一次练习后疼痛明显加重。服务者既不能强迫坚持，也不能凭一次疼痛宣布永远不能恢复。',
      opt('pause-review', '暂停原计划，记录变化并请具名医护复核', { knowledge: 3, mind: 3, health: 1 }, '1926 年因疼痛暂停并复核恢复安排。', '钱文淑排除一项需急处置情况后缩短活动段；周守安决定继续，但每天可随时停止。'),
      opt('person-paced', '由本人决定活动距离与休息点，逐日记录', { craft: 3, relation: 3 }, '1926 年按本人耐受重新安排活动。', '第二年周守安能自己走到院门，也仍需扶手；进步与持续限制同时写下。'),
      opt('environment-first', '先改床边、门槛和照明，暂不增加练习', { craft: 4, money: -2 }, '1926 年先用环境调整降低起居风险。', '门槛削平、夜间灯位固定后两次险跌没有重演；身体状态没有被改写成康复完成。')],
    [1928, '家里要把整年照护交给一名女性亲属', '家属说孙玉兰“本来就该照料”，却没有工资、休息、替班或她自己的家庭安排。',
      opt('paid-roster', '按时段、工作和工资把她列为正式照护者', { money: -2, relation: 4, mind: 2 }, '1928 年把亲属照护改成有工资和轮班的劳动。', '孙玉兰每周有两日由他人接班，能继续照顾自己的孩子；费用增加，但责任不再藏在亲情里。'),
      opt('shared-family', '让每名同意参加的家属只承担具名一段', { relation: 3, network: 2 }, '1928 年建立可拒绝的家庭照护轮班。', '一名兄长拒绝守夜但承担买粮，一名嫂子完全退出；空档由领薪照护者补上，没有强迫女性填满。'),
      opt('external-help', '申请救济院日间服务并保留家中夜间安排', { network: 4, money: -1 }, '1928 年申请有限外部照护服务。', '何济常确认只有日间名额且需等三周；等待期间由具名短工接班，申请没有被写成已经入住。')],
    [1930, '救济名额少于申请人数时怎样登记', '三户都需要安老、伤残或施医帮助，救济院只有一个床位和两份口粮。',
      opt('criteria-public', '公布现有资源、核实条件与下一次复核日', { mind: 4, fame: 1 }, '1930 年按公开条件和复核日处理有限救济。', '一户得到临时床位，两户分别领到口粮与转介；未获名额者保留申请和申诉，不被删出记录。'),
      opt('home-support', '把床位留给无住处者，其余改为有限上门支持', { relation: 3, network: 3 }, '1930 年把稀缺床位与居家支持分开配置。', '无家可归者实际入住，另两户得到每周一次照护和口粮；服务频率有限，家人空档仍清楚显示。'),
      opt('delay-all', '暂不承诺顺序，先逐户补全住处与照护事实', { knowledge: 3, mind: 2 }, '1930 年暂停分配并补核三户情况。', '一周核查发现一户已有可靠亲人但缺药钱；资源重新拆分，代价是每户都多等了七天。')],
    [1932, '照护对象把钱交给你代管可以吗', '廖淑英请你替她收一笔租金、付日常费用。照护关系会形成信任，却不会自动产生财产权或无限代理。',
      opt('limited-authority', '只按本人列明项目和期限代付并逐笔收据', { mind: 4, money: 1, relation: 2 }, '1932 年按有限授权代办照护费用。', '租金由见证人当面交收，三笔支出逐项签认；剩余钱退给廖淑英，她随时可撤回授权。'),
      opt('separate-person', '请她另选可信经手人，你只报告照护费用', { network: 3, relation: 2 }, '1932 年把财务代理与照护职责分开。', '冯伯勤负责收付款，你只提供费用清单；两本记录互相复核，关系少一层利益冲突。'),
      opt('decline-cash', '拒绝经手现金，协助本人保存账目和收据', { mind: 3, fame: 1, money: -1 }, '1932 年拒绝代管财物而保留记录协助。', '廖淑英一度觉得麻烦，后来自己与侄女共同核账；信任没有被等同于交出全部钱。')],
    [1934, '照护者病倒后的三天怎样过', '你腰痛发热，孙玉兰也已连续两夜未睡。被照护者不能因为服务者生病就从叙事里消失。',
      opt('named-cover', '通知本人并请具名替班者完成有限三日', { health: 3, money: -2, relation: 2 }, '1934 年因病停班并安排三日具名替代。', '替班者只接起居和送餐，恢复练习暂停；你三日后复核再返岗，工资损失单独记录。'),
      opt('family-emergency', '与家属重排最低照护并取消非必要事项', { health: 2, relation: 3 }, '1934 年启动家庭最低照护安排。', '周守安本人选出必须做的三项，家属轮班两日；未完成事项没有被补成照常。'),
      opt('temporary-place', '申请短期照护床位并核实际接收答复', { network: 3, money: -2 }, '1934 年申请临时照护床位。', '何济常只确认一张五日床位，周守安同意后实际入住；第六天仍需另做安排。')],
    [1937, '战争逼近时谁跟谁走', '交通和药物变得不稳。照护对象、家属和领薪照护者可能选择不同方向，不能用一句“全家撤走”抹平。',
      opt('person-choice', '逐人核去向、同意、同行者和下一联系点', { mind: 4, network: 2 }, '1937 年逐人记录照护迁移决定。', '廖淑英选择留在熟悉住处，孙玉兰愿再守一月；另一家迁走，只收到抵达回信后才更新状态。'),
      opt('move-equipment', '先移照护记录、辅具与愿意同行的人', { craft: 3, money: -2, health: -1 }, '1937 年按本人同意迁移一组照护条件。', '周守安和一名亲属抵达临时住处，扶手无法搬走而重新制作；未同行者保留最后地址。'),
      opt('local-network', '留在本地建立邻里替班、药食与求助点', { relation: 3, network: 3, money: -1 }, '1937 年建立有期限的本地照护互助网。', '四户只承诺各自能做的一段，夜间仍有两次空档；互助没有被写成资源充足。')],
    [1939, '有人失联，能否替他完成死亡与丧事登记', '一名家属在迁移中失联，亲友想先按死亡分财和办仪式；目前只有最后一封信与同行者口述。',
      opt('keep-missing', '保持失联状态，保存最后时间地点与寻人渠道', { mind: 4, relation: 1 }, '1939 年拒绝把失联者补写成死亡。', '第二年仍未找到本人，财物暂由具名保管人看管；事实没有因等待漫长而改变。'),
      opt('symbolic-meeting', '允许家属举行不宣告死亡的纪念相聚', { relation: 4, mind: 2 }, '1939 年协助一次不替代死亡确认的家属纪念。', '亲人讲述已知经历并保留一封未寄出的信；仪式没有生成遗产处分或死亡日期。'),
      opt('formal-inquiry', '把姓名、最后地址和证件交不同公开渠道核查', { network: 4, money: -1 }, '1939 年启动多渠道失联核查。', '一处回函确认其曾经过，之后去向仍未知；新增事实缩小范围但没有确认生死。')],
    [1941, '死亡确认后家属对仪式意见相反', '具名医护已确认死亡。本人留下简短愿望，子女却分别要求铺张和从简，费用、时间与远方通知也冲突。',
      opt('person-wish', '先按本人留下且能核实的愿望安排基本事项', { mind: 3, relation: 3, money: -1 }, '1941 年按可核实的本人愿望办理身后事务。', '冯伯勤列出基本服务、通知和费用，家属各自保留情绪；未写下的愿望没有被代说。'),
      opt('family-mediation', '把一致事项先办，争议仪式另约商量', { relation: 4, network: 1 }, '1941 年拆开一致与争议的身后安排。', '遗体接运和远方通知按时完成，仪式规模三日后才确定；延期后没有耽误已确认事项。'),
      opt('bounded-cost', '先公布服务与用品费用上限，由付款人具名选择', { money: 1, mind: 3, relation: 1 }, '1941 年按费用上限和具名付款人安排丧事。', '家属删去两项超出能力的用品，保留一场小型告别；节省没有被写成不孝。')],
    [1943, '长期照护是否要变成一间小机构', '已有三户愿付有限费用，另有两户需要救济。开设照护点会涉及房屋、员工、资格、账目和退出，而不是一块招牌。',
      opt('remain-worker', '继续受薪做个案照护，不承担机构所有权', { money: 2, health: 1, mind: 2 }, '1943 年继续以受薪照护者身份工作。', '你只接两户并保留每周休息，房屋和救济款仍由机构负责人管理；多年经验不自动变成资产。'),
      opt('small-day-service', '与同事租一间屋做有限日间照护与恢复协助', { money: -5, craft: 3, network: 2 }, '1943 年建立有范围的小型日间照护点。', '照护点只收三名本人同意的来访者，两名职员领薪；夜间、诊疗和住宿明确不在服务内。', { enterpriseStart: { id: 'd30-small-day-care-service', name: '川西合成淑安日间照护点', domainKey: 'D30', kind: 'bounded-day-care-and-recovery-service', workplace: '川西合成城区一间租用照护屋', supplier: '具名粮食、清洁用品与辅具供货人', product: '有本人同意、服务时段、照护记录、转介、工资和退出安排的日间起居与恢复协助', employees: 2, partners: [{ personId: 'contact:d30_sun_yulan', role: '独立照护劳动与轮班合伙人' }], asset: { id: 'd30-care-tools', kind: 'documented-care-furniture-and-aids', description: '按所有人登记的床椅、照明、清洁用品和有限辅具' }, debt: { id: 'd30-care-opening-credit', creditor: '具名房东与用品供货人', purpose: '房屋押金、首批用品与两名职员工资' }, license: { id: 'd30-care-scope-record', kind: 'documented-bounded-care-service-record', authority: '川西合成城区公开经手人', scope: '只限本人同意的日间起居与恢复协助，不含诊疗、夜间住宿或财产代理' } } }),
      opt('train-rosters', '转做家属轮班、照护记录与转介训练', { knowledge: 3, relation: 3 }, '1943 年转向照护计划与家属训练。', '六户各得到一份按本人意见修改的轮班表；有人退出时重新排班，没有靠道德压力补空。')],
    [1946, '战后怎样找回中断的照护关系', '旧住处、联系人、债务和身体状态都可能变化。旧名单只能证明曾经经手，不能证明人仍在、仍需同样照料或仍同意。',
      opt('person-reconfirm', '逐人联系并重新询问当前需要与同意', { relation: 4, mind: 2 }, '1946 年重新确认旧照护关系。', '十二人中七人回复，三人明确不再需要，两人仍失联；服务只从实际答复重新开始。'),
      opt('record-rebuild', '以本人陈述、旧纸据和当前观察重建记录', { knowledge: 3, craft: 3 }, '1946 年重建中断照护记录。', '旧伤、当前限制和无法确认部分分栏，战前诊断没有被机械沿用。'),
      opt('community-referral', '建立照护、诊疗、救济和身后服务的转介表', { network: 4, knowledge: 2 }, '1946 年建立有回执的照护转介关系。', '三处机构分别确认能接的范围和费用；转介出去的人只有收到回执后才算抵达。')],
    [1948, '下一阶段把照护经验带向哪里', '制度与地区即将变化。你必须重新核岗位、工资、服务对象、本人权利和过去未结事项。',
      opt('long-term-service', '继续长期照护与伤病恢复支持', { craft: 3, relation: 3 }, '1948 年选择继续长期照护工作。', '新岗位按月核轮班、休息、本人同意和转介；照护不再默认依赖亲属女性。'),
      opt('relief-care', '转向救济机构的安老、伤残与生活服务', { network: 3, mind: 3 }, '1948 年选择救济照护与生活服务。', '入所资格、床位、口粮、施医和家属联系分别登记，机构不能替本人决定全部生活。'),
      opt('funeral-grief', '转向死亡确认后的身后事务与家属支持', { mind: 4, relation: 2 }, '1948 年选择身后事务与哀伤支持。', '职责只从已确认死亡开始，费用、遗愿、通知、仪式和遗物逐项经手；不提供高风险现实操作教程。')]
  ];

  var professional = [
    [1925, '第一份事务所试工怎样分清资格', '谢文林能复核会计业务，陈玉真承办法律事项；你只通过文书试工，不能因坐在同一间屋里就代表两人出具意见。',
      opt('ledger-assistant', '先做凭据、账页和差额清单，由会计师逐页复核', { knowledge: 4, mind: 2 }, '1925 年进入有复核人的会计助理试工。', '谢文林退回三处无凭差额，只在自己复核后签署；你得到月薪答复，没有取得会计师证书。'),
      opt('legal-clerk', '先做委托登记、证据目录与送件回执', { knowledge: 3, relation: 2 }, '1925 年进入有委托边界的法律文书试工。', '陈玉真让你重分当事人陈述与纸面证据；你能交接案卷，仍不能以律师名义答应诉讼结果。'),
      opt('mixed-rotation', '各做半月并把两类权限分别记清', { knowledge: 3, craft: 2, money: -1 }, '1925 年完成会计与法律文书有限轮岗。', '两位负责人分别签下评价；轮岗增加见识，却没有把两种资格合并成“懂法懂账”。')],
    [1927, '一笔差额能否用掌柜口头说明平掉', '账簿少一张原凭，掌柜说货已送熟客、不必追问。账面可以暂记未知，不能为了结账制造凭据。',
      opt('mark-unverified', '把差额、口述、经手人和补件日标为待核', { mind: 4, knowledge: 2 }, '1927 年保留一笔无凭差额为待核。', '熟客后来只确认一半货量，另一半仍无证明；账表没有平，但责任范围更真实。'),
      opt('third-party-confirm', '向收货人和送货人分别取回函', { network: 3, money: -1 }, '1927 年从两端核实无凭交付。', '两份回函在日期上差一天，谢文林据此要求继续查仓单；口头说明没有被直接采信。'),
      opt('exclude-scope', '从本次核查意见中剔除并说明影响', { mind: 3, fame: -1 }, '1927 年在报告中明确排除无法核实的差额。', '客户不满意“没有结论”，但报告写清差额可能影响；专业意见没有用体面措辞藏掉限制。')],
    [1929, '熟客夫妻争议先听谁', '一方拿着店契和借据，另一方说签字受胁迫且家用账从未公开。委托人、付款人和真正利益相关者可能不是同一个人。',
      opt('separate-intake', '分别听取并说明不能同时代理冲突双方', { mind: 4, relation: 2 }, '1929 年完成双方分开登记并识别利益冲突。', '陈玉真只接受一方有限委托，另一方得到转介地址；两人的私人陈述没有互相泄露。'),
      opt('document-only', '只整理双方同意公开的契据与时间线', { knowledge: 3, relation: 2 }, '1929 年只提供中立文书整理。', '时间线暴露一笔家用支出空白，但不替任何人判断输赢；双方各自决定下一步。'),
      opt('decline-refer', '因过去替商号做账而回避整宗事项', { mind: 3, network: 2, money: -1 }, '1929 年因旧客户关系拒绝承办并转介。', '你少一笔收入，过去账务资料也没有被用于另一方；回避理由和转介回执都保存。')],
    [1931, '捐款审计发现收支不合怎样写', '一批赈济捐款的领取表少了签名，主办人要求先发“全部无误”公告，以免影响声誉。',
      opt('qualified-report', '写明已核范围、缺件与不能确认金额', { mind: 4, fame: 1 }, '1931 年出具有限范围的捐款核查意见。', '主办人补回部分收据，仍有一笔去向未知；公告改成阶段说明，没有宣称全部无误。'),
      opt('reconcile-first', '暂停发布，逐人核领取与退回款', { knowledge: 4, health: -1 }, '1931 年延后报告并逐笔核捐款。', '两名领取人确认实收，一笔重复列支被更正；延迟招来质疑，但钱款链条更完整。'),
      opt('withdraw', '拒绝在资料不足时署名并移交原件', { mind: 4, money: -2, fame: -1 }, '1931 年退出一项资料不足的审计委托。', '潘旭舟具名接收全部原件，客户另请人核查；你失去费用，没有扣留材料或暗示无罪有罪。')],
    [1933, '文书错过期限造成什么后果', '张静仪抄错送件日期，一宗债务事项可能错过程序期限。把数字改掉不能恢复已经过去的一天。',
      opt('notify-client', '立即通知当事人、负责人和接收机关并留原记录', { mind: 4, relation: 2, fame: -1 }, '1933 年公开一项送件日期错误。', '陈玉真尝试补救并说明成功不确定；当事人获得费用减免，错误仍进入事务所记录。'),
      opt('verify-impact', '先核实际收件时间和可补正范围，再共同答复', { knowledge: 3, mind: 3 }, '1933 年复核错期的实际影响。', '收件簿显示仍在最后时限内，但通知晚了一日；结果未受损，沟通与复核流程仍被修改。'),
      opt('assign-review', '由另一人重查同期全部期限并暂停独立送件', { craft: 2, network: 2 }, '1933 年启动同期案卷复核和岗位限制。', '另发现一处未造成后果的错页；张静仪接受一月双人复核，没有被永久逐出行业。')],
    [1935, '要不要参加会计师资格准备', '助理经验不能自动换证。课程、考试、费用、当前工资和家庭责任会挤在一起，女性还可能被质疑是否长期执业。',
      opt('study-exam', '减半工作准备资格考试并保留生活账', { knowledge: 5, money: -3, health: -1 }, '1935 年进入会计师资格准备。', '你通过一部分考核，仍需后续注册；少掉的工资由家庭明确分担，没有假写成已经执业。'),
      opt('senior-assistant', '继续做高级账务与审计助理，不冒用资格', { craft: 3, money: 2, mind: 2 }, '1935 年选择有边界的高级专业助理岗位。', '你负责抽核和底稿，最终意见仍由潘旭舟签发；职业有上升，不必被写成失败的会计师。'),
      opt('legal-specialize', '转向案件登记、证据和客户联系训练', { knowledge: 4, relation: 2 }, '1935 年转向法律事务协助。', '陈玉真给出一年训练范围，出庭与法律意见仍由有资格者承担；新的专长不是跨行速成。')],
    [1937, '战乱中客户原件怎么处理', '事务所要迁移，契据、账簿、遗嘱、私信和捐款底稿属于不同当事人；装上一车不等于安全或有权带走。',
      opt('owner-instructions', '逐案联系所有人，按指示返还、封存或授权转移', { mind: 4, relation: 2, health: -1 }, '1937 年按当事人指示处置专业档案。', '多数材料取得回执，三宗失联案只封存副本和最后地址；迁移没有抹掉所有权。'),
      opt('priority-copy', '对期限、债权和身份要件做清单与有限副本', { knowledge: 4, money: -2 }, '1937 年制作可追查的紧急案卷清单。', '原件去向、抄件人和未知逐项列明；两箱材料未抵达，只按最后交接记录处理。'),
      opt('local-custodian', '由未离开的具名专业人员保管并定期回信', { network: 3, mind: 3 }, '1937 年把一批案卷交给本地具名保管人。', '何清源寄来首封清点回信，说明两名客户已取走原件；保管不等于接办全部委托。')],
    [1939, '当局索要所有客户名单怎样回应', '要求没有列具体案号和范围。职业保密不能保证绝对安全，也不能被你写成秘密组织权限。',
      opt('require-scope', '要求具名文书、事项范围和交接清单', { mind: 4, fame: -1 }, '1939 年要求明确客户资料调取范围。', '对方缩小到一宗具体事项，陈玉真核过后交出法定范围材料；其余名单未被一并带走。'),
      opt('client-notice', '在可行范围通知受影响当事人与负责人', { relation: 3, network: 2 }, '1939 年记录并通知一次资料风险。', '两名客户取回私人原件，一人决定继续委托；通知不能消除风险，却让选择回到本人。'),
      opt('withdraw-sensitive', '停止继续收集无必要私人材料并归还现有原件', { mind: 3, money: -2 }, '1939 年缩减事务所保存的私人资料。', '案卷保留必要目录与经手日期，非必要私信当面退回；资料减少也限制了后续能证明的内容。')],
    [1941, '客户要求把资产藏出账外', '客户说只是“避一避”，要求把一批货和现钱从账簿、税费和合伙人面前同时消失。专业协助不能变成现实规避教程。',
      opt('refuse-concealment', '拒绝隐匿，只核现状与合法可说明项目', { mind: 5, money: -2, fame: 1 }, '1941 年拒绝替客户隐匿资产。', '客户转走部分业务；你归还原件并结清已做费用，没有保留副本用于威胁。'),
      opt('correct-ledger', '要求把货物、权属、损失和未知重新入账', { knowledge: 4, relation: -1 }, '1941 年重建一批资产的可核记录。', '合伙人确认两项货权，一项仍争议；账目没有教玩家如何躲避查验，只留下应复核事实。'),
      opt('conflict-withdraw', '发现可能损害另一客户后退出双方事项', { mind: 4, network: 1, money: -2 }, '1941 年因利益冲突退出资产事项。', '所有原件按清单移交，双方另寻专业人员；退出没有替任何一方宣告正当。')],
    [1943, '能否合开一间专业事务所', '经验、客户和资格都有限。事务所需要合伙范围、员工工资、档案权属、错误责任与退出条款，不是把名字挂上门。',
      opt('remain-employed', '继续领薪做专业助理并要求明确晋升与署名', { money: 2, position: 2, health: 1 }, '1943 年继续受薪做高级专业助理。', '你得到复核底稿署名和固定月薪，最终意见仍由资格人承担；雇佣与合伙没有混写。'),
      opt('bounded-firm', '与一名资格人合开有限账务与文书事务所', { money: -6, knowledge: 3, network: 3 }, '1943 年建立有资格边界的小型专业事务所。', '事务所只接账务整理、审计协助和文书登记，两名员工按月领薪；诉讼代理与最终签证分别由有资格者承担。', { enterpriseStart: { id: 'd32-bounded-professional-firm', name: '汉口合成文真账务文书所', domainKey: 'D32', kind: 'bounded-accounting-and-document-firm', workplace: '汉口合成商埠一间租用事务所', supplier: '具名纸张、印刷与档案用品供货人', product: '有委托人、利益冲突核查、凭据、复核、期限、签署资格和交还记录的账务整理与文书服务', employees: 2, partners: [{ personId: 'contact:d32_chen_yuzhen', role: '独立法律资格、列明委托与有限现金合伙人' }], asset: { id: 'd32-firm-tools', kind: 'documented-office-ledgers-and-typewriter', description: '按所有人登记的账册、档案柜、文具和一台租用打字机' }, debt: { id: 'd32-firm-opening-credit', creditor: '具名房东与纸张供货人', purpose: '事务所押金、纸张、档案用品与两名员工工资' }, license: { id: 'd32-firm-scope-record', kind: 'documented-professional-service-record', authority: '汉口合成商埠公开经手人', scope: '只限账务整理、审计协助与文书登记；诉讼代理和最终签证须由相应资格人承担' } } }),
      opt('public-service', '转做低收费咨询登记与专业转介', { relation: 3, money: -1, fame: 2 }, '1943 年转向有限低收费专业服务。', '每周只接八个登记时段，收费、减免和转介当面说明；没有承诺旧中国已存在普遍法律援助。')],
    [1946, '战后旧债与旧案怎样重新开卷', '旧账、判决、回函、货权和婚家关系跨越不同制度与地区。曾经存在不等于仍可执行，也不等于自动作废。',
      opt('current-status', '逐案核当事人、原件、已履行与当前受理条件', { knowledge: 4, mind: 3 }, '1946 年按当前事实重核战前事项。', '十宗里三宗已自行解决、两宗当事人失联、五宗可继续咨询；旧案没有被批量补成结案。'),
      opt('client-choice', '把继续、和解、转介或放弃的后果交本人选择', { relation: 4, mind: 2 }, '1946 年让当事人重新决定未结事项。', '刘素云选择只取回原件不再追债，另一客户继续核账；专业人员没有把“坚持到底”设为唯一正确。'),
      opt('archive-unknown', '把无法承接的事项以最后已知状态封存', { craft: 3, knowledge: 2 }, '1946 年封存一批无法继续的专业记录。', '每卷标明最后经手人、联系日与未知；封存不是死亡、败诉、清偿或遗弃。')],
    [1948, '下一阶段专业经验如何承接', '会计、审计、法律和基层司法制度即将变化。过去资格与职位都要重新确认，不能靠旧名片自动继续。',
      opt('accounting-transition', '转向现行单位的会计、清算与账务训练', { knowledge: 4, position: 1 }, '1948 年选择继续会计与账务工作。', '新岗位先核登记、业务范围和工资，旧客户资料另行归还或移交；资格没有被自动沿用。'),
      opt('legal-transition', '转向新制度下的文书、调解与法律学习', { knowledge: 3, relation: 3 }, '1948 年选择法律文书与调解承接。', '你从登记、事实核对和转介开始，过去律师协助经历只作为材料，不自动取得新职业身份。'),
      opt('independent-close', '结束事务所，逐案结费、返件和说明未结项', { mind: 4, money: 1 }, '1948 年选择有记录地结束专业事务所。', '客户、员工、房租、原件、欠费和未结事项各有去向；关门不是人物人生停止。')]
  ];

  var association = [
    [1925, '进入商会事务处先替谁说话', '商会有不同规模和行业的会员，事务员受雇于组织，不是会长家仆，也不能因自己出身商户就代表全体商家。',
      opt('member-register', '先核会员、代表人、会费和授权范围', { knowledge: 3, network: 2 }, '1925 年完成第一批商会会员与授权登记。', '二十三家店号中两家代表权待核，一家退出；会议名册没有为凑人数把它们写成出席。'),
      opt('meeting-clerk', '只做议程、出席、发言与未决事项记录', { knowledge: 3, mind: 3 }, '1925 年进入商会会议事务试工。', '吴静贞让你保留三项反对意见；会长讲话没有被写成组织已经决定。'),
      opt('trade-desk', '从一个同业组的价格、库存和纠纷登记做起', { network: 3, craft: 2 }, '1925 年进入有限同业事务试工。', '罗慧琴带你走访七户，其中一户拒绝报库存；调查表保留缺项，没有估成零。')],
    [1927, '会费不足时先削谁的支出', '工资、房租、印刷、调查和公益支出同时到期，理事要求先拖欠两名女事务员工资。',
      opt('salary-first', '先结已发生工资，再缩减活动和印刷', { money: -2, relation: 3, mind: 2 }, '1927 年优先结清商会职员工资。', '一场宴请和一期印刷取消，两名职员按时收钱；削减内容与责任人写进月报。'),
      opt('open-budget', '向会员公布缺口并逐项表决延期', { mind: 4, network: 2 }, '1927 年公开处理商会经费缺口。', '会员同意补缴一部分并暂停一次调查；仍有半月工资延期，职员获得明确结算日。'),
      opt('reduced-hours', '与职员本人协商减少工时而非无偿加班', { health: 2, money: 1, relation: 2 }, '1927 年以协商减班应对经费不足。', '周明礼和吴静贞各自选择不同班次，服务时段缩短；未完成来函得到延期告知。')],
    [1929, '同业要求统一涨价时怎么处理', '大店、小摊、进货渠道和库存成本并不相同。事务处可以调查和讨论，不能替所有会员强制定价。',
      opt('cost-survey', '先公开样本、成本差异与拒答户数', { knowledge: 4, network: 2 }, '1929 年完成有缺项的同业成本调查。', '报告显示不同货源差异很大，会议没有形成统一价格；三家店自愿公布价格构成。'),
      opt('voluntary-guidance', '只形成自愿参考与投诉渠道', { relation: 3, mind: 3 }, '1929 年形成非强制的同业价格说明。', '部分会员采用，部分拒绝；顾客方秀梅提出一宗缺斤投诉并得到具名答复。'),
      opt('decline-price-rule', '明确事务处无权替会员订死价格', { mind: 4, fame: -1 }, '1929 年拒绝制定强制同业价格。', '大店批评商会无力，小摊保留自行定价；事务处转而公布货源和计量核查结果。')],
    [1931, '洪水赈济如何不变成商会邀名', '会员捐粮、船、钱与人手，各有数目和限制；受灾者需要领取和申诉，不需要被写成支持某位会长。',
      opt('public-ledger', '按捐入、审核、发出、未领和余项公布', { mind: 4, relation: 3, health: -1 }, '1931 年建立可追查的商会赈济账。', '一批粮实际发到三处，一处因道路未到；未发部分保留经手人与下次答复日。'),
      opt('recipient-committee', '请受灾街区具名代表参与核名单与投诉', { relation: 4, network: 2 }, '1931 年让受助者参与赈济核验。', '方秀梅指出两户重名和一户漏列；更正后她仍保留对份量不足的批评。'),
      opt('specialized-groups', '把船运、粮食、住处与医护分给不同组', { craft: 3, network: 3 }, '1931 年拆分商会赈济职责。', '每组都有负责人和交接，但住处组仍缺二十个位置；组织分工没有制造足够资源。')],
    [1933, '一宗货损纠纷由商会判谁赔吗', '蔡伯安的仓栈、船户和货主各有一段记录。商会事务员能组织核事实与协商，不能冒充法院扣货或裁判。',
      opt('joint-facts', '让双方分别陈述并核仓单、船期和现状', { knowledge: 3, mind: 3 }, '1933 年完成一宗货损事实核对。', '双方同意已证部分和未知部分，争议金额仍在；档案保留不同说法。'),
      opt('voluntary-mediation', '只在双方同意范围提出分担方案', { relation: 4, network: 1 }, '1933 年主持一次自愿同业调解。', '双方接受先售可用货、再按证据分担部分损失；任何一方仍可退出并另走程序。'),
      opt('refer-court', '超出章程范围，整理材料后转司法渠道', { mind: 3, knowledge: 2, fame: -1 }, '1933 年把超权限货损争议转介。', '接收处出具收件回执，商会停止继续施压；转介不等于法院已经支持哪一方。')],
    [1935, '女会员能否作为店号正式代表', '冯月娥实际经营干货摊多年，但有人要求只能由男性亲属列名。章程、财产事实与当时性别门槛发生冲突。',
      opt('record-operator', '按实际经营与现有证明登记她为具名代表', { mind: 4, relation: 3 }, '1935 年登记一名女性实际经营者为会员代表。', '冯月娥能收到会议与会费通知，仍在一项外部手续上受阻；限制没有被写成能力不足。'),
      opt('dual-record', '同时记实际经营者与外部手续代办人', { knowledge: 3, relation: 2 }, '1935 年分开记录实际经营与手续代办。', '会议发言和商号责任归冯月娥，外部送件由具名代办；代办人没有取得她的库存或表决权。'),
      opt('appeal-rule', '提交章程复核并让反对者写出具体依据', { mind: 4, network: 2 }, '1935 年启动女性会员代表资格复核。', '复核用两月，期间冯月娥以旁听者发言；最终取得有限代表资格，等待成本仍写进人生。')],
    [1937, '战争中商会先保档案还是先保人', '会员簿、会费账、争议卷、救济名单和工作人员住处同时受威胁，不能一句“随会撤退”覆盖所有人。',
      opt('people-addresses', '先逐人核去向、工资、家属和下一联系点', { relation: 3, network: 3, money: -2 }, '1937 年先处理商会工作人员与会员联络。', '多数人留下下一地址，两名失联者保留最后消息；工资只结到实际工作日。'),
      opt('essential-records', '只移章程、现账和未结事项清单，余档具名封存', { knowledge: 3, mind: 3, health: -1 }, '1937 年有限迁移商会核心记录。', '三箱抵达、一箱留存本地；谁保管、哪些不全和下一复核日都有记录。'),
      opt('local-relief', '暂停一般会务，留下公开赈济和信息服务', { relation: 4, money: -2, fame: 1 }, '1937 年将商会事务缩为有限公开救济。', '服务只处理住处、粮食与寻人登记，职位和资源范围公开；救济没有生成任何秘密组织身份。')],
    [1939, '受控环境下是否继续使用商会名义', '机构名称、印章和负责人都可能被更改。继续工作、停办、退出或只做公开民生事项会有不同风险。',
      opt('public-only', '只保留公开的会员联络、民生调查与救济登记', { mind: 4, relation: 2, position: -1 }, '1939 年把商会工作限定为公开民生事务。', '每份文书注明当前机构和经手范围，不以旧名义暗示连续授权；会员可以不参加。'),
      opt('resign-handover', '辞去职务并按清单交出公物与未结项', { health: 2, money: -2, mind: 3 }, '1939 年有记录地退出商会事务。', '陶正元签收印章、现账和七项未决来函；你失去工资，没有带走会员资料经营私利。'),
      opt('suspend-name', '暂停对外代表，只保存最后已知状态', { mind: 3, knowledge: 2, position: -2 }, '1939 年暂停使用旧商会代表身份。', '来函只得到机构暂停答复，成员各自决定去留；暂停不被写成解散、支持或反对任何一方。')],
    [1941, '有人要求把会员名单用于秘密甄别', '名单包含行业、住址和经手关系，却不证明政治态度、忠诚或秘密身份。组织事务不能提供现实跟踪或伤害教程。',
      opt('refuse-repurpose', '拒绝将会员资料改作未授权甄别', { mind: 5, fame: -1 }, '1941 年拒绝改用商会会员名单。', '你撤掉不必要副本并记录索取者与范围；风险没有消失，但名单未被你加工成标签。'),
      opt('notify-governance', '把要求交章程负责人并留下具名异议', { mind: 4, network: 1 }, '1941 年通过公开治理程序处理资料索取。', '吴静贞将异议写入会议记录，会议没有形成同意；反对者姓名没有被删掉。'),
      opt('minimize-data', '只保留当前会务必要的店号和联络方式', { knowledge: 2, relation: 2 }, '1941 年缩减会员资料保存范围。', '旧住址和私人关系按会员意愿归还或销去，当前会费仍可核；资料最少化也减少未来寻人线索。')],
    [1943, '商会职位能否换成自己的生意', '多年经手会员与货路让你认识许多人，但组织客户、会费、印章和信息都不是私人资产。',
      opt('remain-staff', '继续领薪做事务员，不从会员交易抽成', { money: 2, position: 2, mind: 2 }, '1943 年继续做有薪商会事务员。', '你获得明确工资和职责，三次商业介绍均由双方自愿联系；组织关系没有变成个人佣金。'),
      opt('independent-service', '离职后以公开收费做会议与账务服务', { money: -4, network: 3, craft: 2 }, '1943 年离职建立有限组织事务服务点。', '旧商会资料全部交还，新服务只接自愿客户；一名助理按月领薪，招牌不使用商会名称。', { enterpriseStart: { id: 'd36-independent-association-service', name: '汉口合成明真会议账务服务点', domainKey: 'D36', kind: 'bounded-meeting-and-association-records-service', workplace: '汉口合成商埠一间租用文书屋', supplier: '具名纸张、印刷与会场用品供货人', product: '有客户授权、出席、提案、异议、表决、会费、工资、交还和退出记录的会议与组织账务服务', employees: 1, asset: { id: 'd36-service-tools', kind: 'documented-personal-office-tools', description: '主角自购的账册、文件箱、印刷用品和会议记录工具' }, debt: { id: 'd36-service-opening-credit', creditor: '具名房东与印刷用品供货人', purpose: '房屋押金、文具和一名助理工资' }, license: { id: 'd36-service-scope-record', kind: 'documented-independent-service-record', authority: '汉口合成商埠公开经手人', scope: '只限自愿客户的会议与账务服务，不使用商会名义、不持会员授权或公共权力' } } }),
      opt('member-cooperation', '帮助会员建立有章程的有限共同采购组', { network: 4, money: -2 }, '1943 年协助成立有限同业采购组。', '五家店各列货物、现金和退出条件，商会只登记不持股；第一次合单有一批迟到并获退款答复。')],
    [1946, '战后商会怎样重建而不补写连续性', '旧会员、旧会费、战损、旧机构任职与当前经营状态需要重新确认。曾在名单上不等于仍营业或仍愿入会。',
      opt('re-enroll', '逐户重核经营、代表与是否重新入会', { network: 4, knowledge: 2 }, '1946 年重新登记战后商会会员。', '四十户中二十六户确认，七户停业，七户未知；新名册不把未知补成倒闭。'),
      opt('war-loss', '先做具名战损与复业条件调查', { knowledge: 4, relation: 2 }, '1946 年完成一批可核战损调查。', '报告区分自报、票据和现场所见，没有给所有损失同一赔偿承诺。'),
      opt('new-rules', '先讨论新章程、工资、申诉和资料边界', { mind: 4, network: 2 }, '1946 年重订商会公开治理规则。', '女性代表、事务员工资和资料用途首次写清；两项表决未过，仍保留在未决栏。')],
    [1948, '社会组织更替前怎样交清', '旧商会、同业公会与新的工商组织可能发生接收、改组或停止。成员、职员、账目和公共事务不能只写“时代变了”。',
      opt('documented-handover', '按人、物、钱、档和未决事项具名移交', { mind: 4, knowledge: 2 }, '1948 年准备有清单的组织交接。', '接收方只确认现有范围，三宗旧争议另行处理；旧职位没有自动变成新职位。'),
      opt('member-decisions', '让每个会员重新决定参加、退出或等待', { relation: 4, network: 2 }, '1948 年逐户记录组织更替选择。', '有人加入新组织、有人退出、有人尚未答复；事务员没有替整条行业作统一表态。'),
      opt('close-public-cases', '先答复赈济、工资、申诉和在途来函', { relation: 3, mind: 3 }, '1948 年优先清理商会未结公共事项。', '两笔工资结清、一项救济交接、一宗申诉保留复核日；机构变化没有让等待者消失。')]
  ];

  installDomainDecisions('D30', 'care', 'sichuanmedicine', ROUTE_CARE, care);
  installDomainDecisions('D32', 'professional', 'hankoucommerce', ROUTE_PROFESSIONAL, professional);
  installDomainDecisions('D36', 'association', 'hankoucommerce', ROUTE_ASSOCIATION, association);

  function scene(field, family, route, id, title, text) {
    C.ordinaryEvents.push({
      id: id, title: title, text: text, families: [family], routes: [route], minAge: 14, priority: 20,
      sourceIds: sourceIds[field].slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    });
  }

  [
    ['d30-s01', '长期照护从本人决定开始', '能表达的成年人自己决定起居、活动、隐私、家属在场与停止某项照料；需要帮助不等于失去全部判断。'],
    ['d30-s02', '恢复不是一次治愈判定', '疼痛、活动、休息、辅具、环境和医护复核逐段记录，可以进步、停滞、反复或改变目标。'],
    ['d30-s03', '家属女性不是默认免费照护者', '妻子、女儿、媳妇和邻人都有自己的工作、身体、孩子、工资、拒绝、休息与离开决定。'],
    ['d30-s04', '照护者也有身体和心理', '腰背痛、发热、失眠、悲伤与过劳会造成停班、少薪、替班与返岗复核，不靠无限奉献维持服务。'],
    ['d30-s05', '救济院名额不等于现代普遍养老服务', '入所、口粮、施医、安老和伤残服务受地区、床位、经费与资格限制，申请与实际获得分开。'],
    ['d30-s06', '财务代理必须有限而可撤回', '照护关系不生成财产权；费用、代领、收据、剩余钱与见证人逐项留痕，本人可撤回。'],
    ['d30-s07', '环境改变由使用者评价', '床位、门槛、扶手、照明和出行安排可能减少困难，也可能不合适；服务者不能替使用者宣布方便。'],
    ['d30-s08', '失联永远不是死亡确认', '只有具名确认之后才能进入身后事务；寻人、纪念、财物暂管和死亡事实严格分开。'],
    ['d30-s09', '身后服务从真实死亡之后开始', '通知、遗愿、费用、停灵、仪式、遗物和远方家属各有经手人，不制造死亡也不提供高风险现实操作教程。'],
    ['d30-s10', '哀伤没有统一正确速度', '家属可以争执、改期、简办、保留遗物、拒绝谈话或另做纪念，服务者不强行安排和解。'],
    ['d30-s11', '战争迁移逐人确认', '被照护者、亲属、照护者、记录与辅具可能分开抵达；最后地址、同意和回执比“全家安全”更真实。'],
    ['d30-s12', '照护职业也有上升与退出', '个案照护、家属训练、救济服务、恢复支持、身后事务、开有限日间点或离开行业各有交接。'],
  ].forEach(function (row) { scene('care', 'sichuanmedicine', ROUTE_CARE, row[0], row[1], row[2]); });

  [
    ['d32-s01', '账房、会计师、律师与文书员不是同一资格', '识字、做账、整理证据和坐在事务所里都不能自动出具审计意见、代理诉讼或取得证书。'],
    ['d32-s02', '专业服务从委托范围开始', '谁委托、谁付款、服务谁、做什么、不做什么、费用和期限分别确认，咨询不保证结果。'],
    ['d32-s03', '一笔差额可以诚实地留作未知', '原凭、抄件、口述、货物、现金和经手人逐项核对，不为报表好看制造凭据。'],
    ['d32-s04', '利益冲突发生在熟人之间', '旧客户、亲属、雇主、双方当事人和自己的经济关系都要先核；回避与转介是专业结果。'],
    ['d32-s05', '当事人不是案卷材料', '婚姻、债务、房屋和继承事项中，每个人可以限制委托、取回原件、和解、继续或放弃。'],
    ['d32-s06', '审计意见必须显示范围', '抽核了什么、没看到什么、哪些数字可证和哪些限制影响结论都公开，审计不自动证明清白或有罪。'],
    ['d32-s07', '收费、减免和结果分开', '咨询、抄件、差旅、代理、未发生费用与退费逐项开据，付得起钱也不能买到确定结果。'],
    ['d32-s08', '专业错误会错过真实期限', '错数、错页、漏交与泄露要通知、补救、减费和复盘，修改纸面不能撤回已经造成的损失。'],
    ['d32-s09', '女性与男性共享资格标准但机会不同', '女性更常受客户信任、婚家和出庭门槛质疑，男性更常被推去外勤和连夜账；差异不修改能力。'],
    ['d32-s10', '客户资料不是秘密身份工具', '案卷保密与公开法律服务不生成党籍、卧底、叛徒或情报权；游戏也不教人隐匿资产和规避查验。'],
    ['d32-s11', '战后旧案不会批量恢复或消失', '当事人、原件、已履行、失联、现行受理和本人选择逐宗重核，封存只表示最后已知状态。'],
    ['d32-s12', '专业职业可以受薪、合伙、转行或结束', '高级助理、持证复核、法律文书、会计审计、低收费登记、有限事务所和有记录关门分别有现实后果。'],
  ].forEach(function (row) { scene('professional', 'hankoucommerce', ROUTE_PROFESSIONAL, row[0], row[1], row[2]); });

  [
    ['d36-s01', '组织不是一个会长的声音', '会员、代表、理事、职员、异议者和服务对象都有各自授权；会议没有形成决定时就写未决。'],
    ['d36-s02', '会员身份不生成企业所有权', '入会、交费、任职、提供资料与参与共同采购不会把商户资产、客户或员工转给商会。'],
    ['d36-s03', '事务员是领薪劳动者', '会员登记、会议记录、调查、调解、会费、救济和来函答复都有工时、工资、错误、休息与晋升。'],
    ['d36-s04', '同业调查必须保留缺项', '价格、库存、工资、停业和战损只代表实际回答与所见，拒答、失联和未知不能补成零。'],
    ['d36-s05', '调解不是裁判', '商会可以核事实、组织自愿协商和转介，不能扣押财物、强制定价或冒充法院。'],
    ['d36-s06', '女性经营者有自己的代表权斗争', '实际经营、外部手续、会议发言和财产权分别记录；男性代办不取得女性商户的库存与表决权。'],
    ['d36-s07', '公益要能追到领取人', '捐入、审核、发出、未领、申诉与余项公开；受助不换取感恩、商业支持或政治身份。'],
    ['d36-s08', '组织资料不能改作忠诚名单', '行业和住址不证明政治态度；事务员不提供现实跟踪、甄别、隐蔽或伤害教程。'],
    ['d36-s09', '战争会切断组织连续性', '人员、印章、账簿、职位和名称分别核；保留公开民生服务也不自动意味着机构完整延续。'],
    ['d36-s10', '组织关系不能私有化', '离职、开服务点或做共同采购都要归还会员资料、印章和会费，旧关系只有在本人同意后才能继续联系。'],
    ['d36-s11', '战后重建从重新同意开始', '旧会员不自动续会，停业不自动死亡，战损自报不自动获得补偿，新章程也允许表决失败。'],
    ['d36-s12', '1949 前后机构更替逐项发生', '接收、改组、退出、工资、档案、未结争议和会员个人决定分别处理，不用“时代变化”一笔带过。'],
  ].forEach(function (row) { scene('association', 'hankoucommerce', ROUTE_ASSOCIATION, row[0], row[1], row[2]); });

  C.annualRhythms[ROUTE_CARE] = [
    '每年落在一个有名字的人、一项本人同意的照护、一名具名接班者和一次下年复核，不用“照料许多人”概括。',
    '伤病恢复、长期限制、照护者身体、家庭分工、钱和休息同时进入生活账，改善不等于治愈。',
    '死亡必须先被确认；确认后才出现通知、遗愿、费用、仪式、遗物与家属各自的哀伤。',
  ];
  C.annualRhythms[ROUTE_PROFESSIONAL] = [
    '凭据、原件、委托、当事人、费用、期限、复核和未知逐项留下，职业不是一句“替人办事”。',
    '账房、会计、审计、律师和文书的资格不互相冒用，转介、回避和拒绝也是工作结果。',
    '一处差错、利益冲突或缺失资料会在下一年形成客户选择、费用、声誉和岗位后果。',
  ];
  C.annualRhythms[ROUTE_ASSOCIATION] = [
    '一段组织工作至少落在会员、会费、会议、调查、争议、救济或申诉中的一项具体交接。',
    '会长、理事、会员、职员和公众各有位置；组织决定、个人意见、企业资产与政治身份严格分开。',
    '战争和制度变化先改变名称、人员、工资、档案和未结事项，不自动让组织完整延续或全体同意。',
  ];

  C.sceneFrames[ROUTE_CARE] = [
    { open: '清晨先问廖淑英今天愿意自己做什么、需要谁帮、孙玉兰能值哪一段和昨夜有没有未完成事项。', close: '今天只完成有限照护；本人选择、身体变化、费用、接班和下一次复核分别留下。' },
    { open: '救济申请、恢复练习、家属分歧和照护者腰痛同时出现，没有任何一名女性会自动补满空档。', close: '照护继续，不代表伤病治愈、家属和解、救济获准或服务者永远留下。' },
  ];
  C.sceneFrames[ROUTE_PROFESSIONAL] = [
    { open: '桌上有一张无原凭的账页、一宗新委托、两份可能冲突的客户姓名和今天必须回复的期限。', close: '能证、不能证、谁复核、谁付费和下一步分别交代；没有为了体面写出确定输赢。' },
    { open: '刘素云带来自己的陈述和原件，她不是一宗“案子”，可以随时限制委托、取回材料或另找专业人员。', close: '今天的专业劳动只到授权边界，事务所没有因此取得客户资产、私人材料或政治身份。' },
  ];
  C.sceneFrames[ROUTE_ASSOCIATION] = [
    { open: '会员名册、会费账、会议提案、反对意见、货损申诉和一批未领救济物资同时摆在事务桌上。', close: '形成决定、未形成决定、谁反对、谁领取和谁仍等待都能追查，组织没有被写成一个人的意志。' },
    { open: '商户只看见“商会”两个字，里面却有会员、理事、有薪职员、受助者、异议者和不愿加入的人。', close: '今天办完一段会务，不生成企业股权、全行业授权、党籍、卧底或秘密权力。' },
  ];

  var bases = {};
  bases[ROUTE_CARE] = {
    kind: 'long-term-care-recovery-bereavement', role: '长期照护、伤病恢复支持与身后事务工作者',
    workplace: '成都近郊合成照护服务点、住家、救济机构与身后事务处', employer: '合成照护服务机构与按个案、班次领薪的岗位',
    supervisor: '按本人同意、照护边界、轮班、转介和死亡确认负责的钱文淑', colleague: '有自己工资、身体、家庭和去留的照护者孙玉兰', publicPerson: '决定生活安排、隐私、费用和停止某项照料的廖淑英',
    terms: '按个案与班次核本人同意、起居、恢复、辅具、费用、救济、轮班、健康、死亡确认、身后服务、工资、移交与退出',
    duties: '在本人同意和医护指导范围内协助起居与恢复，安排有薪轮班和转介；只在真实死亡确认后经手身后事务',
    scenes: ['廖淑英撤回一项不方便的照料。', '孙玉兰要求补足守夜工资和休息。', '冯伯勤在死亡确认后逐项说明服务费用。'],
  };
  bases[ROUTE_PROFESSIONAL] = {
    kind: 'legal-accounting-audit-assistance', role: '法律文书、会计账务与审计协助人员',
    workplace: '汉口合成专业事务所、商号账房与案件登记处', employer: '合成会计法律事务所与按月领薪的专业辅助岗位',
    supervisor: '按资格、委托、底稿、意见和错误负责的谢文林', colleague: '有自己专业贡献、工资、身体和去留的文书员张静仪', publicPerson: '决定委托、费用、原件、和解与是否继续的客户刘素云',
    terms: '按委托核资格、当事人、凭据、账页、证据、期限、费用、利益冲突、保密、复核、差错、返件、工资与退出',
    duties: '整理凭据和案卷、核委托与差额、保留未知、安排复核和转介，不冒用会计师或律师资格，不保证结果',
    scenes: ['谢文林退回一份无凭平账。', '张静仪主动报告一处错期。', '刘素云决定取回原件并停止追索。'],
  };
  bases[ROUTE_ASSOCIATION] = {
    kind: 'chamber-trade-social-organization-administration', role: '商会、同业公会与社会组织事务员',
    workplace: '汉口合成商会事务处、同业小组、会议室与公共服务点', employer: '合成商会及按章程、班次和月薪运作的事务机构',
    supervisor: '按章程、授权、会费、会议与交接负责的陶正元', colleague: '有自己工资、异议、家庭与去留的会议事务员吴静贞', publicPerson: '能投诉、拒绝、申诉并决定是否接受服务的顾客方秀梅',
    terms: '按月核会员、代表、会费、工资、会议、调查、调解、救济、资料、异议、机构更替、移交与退出',
    duties: '依章程登记会员和会议，调查行业事实，组织自愿调解与公开救济；不私有组织关系、不强制定价或替全体表态',
    scenes: ['吴静贞要求把反对意见写入会议录。', '罗慧琴拒绝透露一项私人库存。', '方秀梅追问一批未领救济的下落。'],
  };

  C.routeCareerProfilesByGender[ROUTE_CARE] = {
    男: Object.assign({}, bases[ROUTE_CARE], { role: '长期照护、伤病恢复、搬移辅具与身后事务工作者', duties: '较常被派搬移、夜路和身后事务，也要做清洁、陪伴与情绪劳动；男性身份不自动取得家庭决定权' }),
    女: Object.assign({}, bases[ROUTE_CARE], { role: '长期照护、伤病恢复、轮班协调与身后事务工作者', duties: '较常被当作天然照护者并面临婚家、夜班和同工薪酬门槛，也能做负责人和机构经营；亲属或女性身份不等于免费劳动' }),
  };
  C.routeCareerProfilesByGender[ROUTE_PROFESSIONAL] = {
    男: Object.assign({}, bases[ROUTE_PROFESSIONAL], { role: '会计审计、外勤送件与法律文书协助人员', duties: '较常被推去外勤、夜账与客户应酬，也必须核资格、家务、身体、保密和利益冲突，不自动成为会计师或律师' }),
    女: Object.assign({}, bases[ROUTE_PROFESSIONAL], { role: '会计审计、案件登记与法律文书协助人员', duties: '较常先被放在抄写、窗口和内账岗位并受婚家与客户信任质疑，也能考试、复核、接客户和合伙；门槛不作能力扣分' }),
  };
  C.routeCareerProfilesByGender[ROUTE_ASSOCIATION] = {
    男: Object.assign({}, bases[ROUTE_ASSOCIATION], { role: '商会外勤、同业调查、调解与会议事务员', duties: '较常被派外勤和代表场合，也不能替会员、会长或行业表态；职位不生成企业股权或政治身份' }),
    女: Object.assign({}, bases[ROUTE_ASSOCIATION], { role: '商会会员、会议、账务、调查与公共服务事务员', duties: '较常先做内勤、公益和无偿协调，也能做调查、调解、负责人和女性商户代表工作；全部劳动计薪并允许异议' }),
  };

  Object.assign(C.routeContactProfiles, {
    'sichuan-long-term-care': [
      { id: 'd30_qian_wenshu', label: '钱文淑', role: '按本人同意、照护范围、恢复复核、转介和死亡确认负责的照护主管', status: 'supervisor', relation: 24, born: 1888 },
      { id: 'd30_sun_yulan', label: '孙玉兰', role: '有自己工资、休息、身体、孩子和离开决定的照护同事', status: 'coworker', relation: 31, born: 1901 },
      { id: 'd30_liao_shuying', label: '廖淑英', role: '能决定起居、隐私、家属在场、费用和拒绝某项照护的人', status: 'nearby', relation: 28, born: 1875 },
      { id: 'd30_zhou_shouan', label: '周守安', role: '决定恢复目标、疼痛反馈、辅具与停止练习范围的伤病者', status: 'nearby', relation: 25, born: 1894 },
      { id: 'd30_he_jichang', label: '何济常', role: '只对救济申请、名额、口粮、床位与实际接收给答复的经手人', status: 'colleague', relation: 21, born: 1882 },
      { id: 'd30_feng_boqin', label: '冯伯勤', role: '只在死亡确认后核通知、费用、本人愿望、仪式与家属选择的身后事务人员', status: 'distant', relation: 20, born: 1885 },
    ],
    'hankou-legal-accounting': [
      { id: 'd32_xie_wenlin', label: '谢文林', role: '按会计资格、委托、底稿、意见、费用和错误复盘负责的专业负责人', status: 'supervisor', relation: 24, born: 1883 },
      { id: 'd32_chen_yuzhen', label: '陈玉真', role: '有自己案件判断、资格、收费、身体与拒绝冲突委托权的律师', status: 'colleague', relation: 28, born: 1891 },
      { id: 'd32_zhang_jingyi', label: '张静仪', role: '有自己工资、专业贡献、错误责任、婚家与去留的文书同事', status: 'coworker', relation: 31, born: 1904 },
      { id: 'd32_liu_suyun', label: '刘素云', role: '决定委托、费用、原件、隐私、和解、继续或停止事项的客户', status: 'nearby', relation: 25, born: 1898 },
      { id: 'd32_pan_xuzhou', label: '潘旭舟', role: '只对明确审计范围、底稿、限制和签署意见负责的会计师', status: 'colleague', relation: 22, born: 1887 },
      { id: 'd32_he_qingyuan', label: '何清源', role: '按具体案号、收件、期限与档案保管范围回复的外部专业联络人', status: 'distant', relation: 19, born: 1889 },
    ],
    'hankou-trade-associations': [
      { id: 'd36_tao_zhengyuan', label: '陶正元', role: '按章程、会员授权、会议、会费和机构交接负责的商会事务负责人', status: 'supervisor', relation: 24, born: 1880 },
      { id: 'd36_wu_jingzhen', label: '吴静贞', role: '有自己工资、会议贡献、异议、家庭和离开决定的组织事务同事', status: 'coworker', relation: 31, born: 1902 },
      { id: 'd36_luo_huiqin', label: '罗慧琴', role: '决定报告哪些经营资料、是否入会和怎样参与同业事务的商户', status: 'nearby', relation: 27, born: 1895 },
      { id: 'd36_cai_boan', label: '蔡伯安', role: '在具体货损争议中陈述仓栈经手段并可拒绝调解的会员', status: 'nearby', relation: 23, born: 1886 },
      { id: 'd36_fang_xiumei', label: '方秀梅', role: '能投诉计量、质疑赈济、申诉规则并拒绝被代表的顾客和居民', status: 'nearby', relation: 25, born: 1899 },
      { id: 'd36_zhou_mingli', label: '周明礼', role: '有自己班次、工资、家庭照料和拒绝无限加班权的外勤职员', status: 'coworker', relation: 28, born: 1905 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'sichuan-long-term-care': ['扶抱、久站、弯腰、夜班和反复家务造成的腰背、肩颈、膝腿与手腕劳损', '接触病弱者、通风与清洁条件不足、睡眠和饮食不定造成的发热、咳嗽、胃肠不适与职业暴露', '长期看见疼痛、衰弱、死亡、家属冲突与资源不足造成的失眠、悲伤、内疚和耗竭'],
    'hankou-legal-accounting': ['长时间看细账、抄写、伏案、搬案卷和外勤送件造成的眼痛、肩颈、腰背与手腕劳损', '连夜结账、赶期限、应酬与饮食不定造成的胃痛、头痛、失眠与反复疲惫', '客户冲突、错误、保密风险、收费压力和职业资格门槛造成的焦虑、内疚与警觉'],
    'hankou-trade-associations': ['久坐会议、外勤走访、搬资料和赈济物资造成的肩颈、腰背、腿脚与手腕劳损', '洪水、拥挤会场、街区调查、饮食不定和通风不足造成的发热、咳嗽与胃肠不适', '会员争执、资源不足、资料风险、组织更替和无限公益期待造成的失眠、焦虑与耗竭'],
  });

  Object.assign(C.publicRouteProfiles, {
    'sichuan-long-term-care': { publicGroup: '合成的公开长期照护、救济转介与身后事务服务簿', publicRole: '核本人同意、服务范围、轮班工资、救济答复、申诉与真实死亡后的身后服务', covertRole: '照护、救济、家属关系和身后事务不自动生成党籍、秘密组织、卧底或情报身份', infiltrationRole: '不以病弱、住址、死亡、遗物、药品或家庭冲突提供现实跟踪、伤害或高风险操作教程', contact: { id: 'public_d30', label: '章静宜', role: '登记公开照护服务、救济转介、费用和申诉答复的经手人', status: 'colleague', relation: 20, born: 1892 } },
    'hankou-legal-accounting': { publicGroup: '合成的公开专业服务、收费、资料返还与投诉事务簿', publicRole: '核资格、委托范围、收费、保密、利益冲突、错误更正、返件与转介', covertRole: '法律、会计、审计、案卷和客户关系不自动生成党籍、卧底、叛徒或秘密权限', infiltrationRole: '不以账务、资产、诉讼、档案或客户名单提供现实规避查验、隐匿、跟踪或伤害教程', contact: { id: 'public_d32', label: '孟守真', role: '登记公开专业资格、收费、资料返还和投诉答复的经手人', status: 'colleague', relation: 20, born: 1890 } },
    'hankou-trade-associations': { publicGroup: '合成的公开会员、会议、行业调查、调解、救济与组织申诉事务簿', publicRole: '核章程、会员授权、会费、会议决定、异议、公益物资、投诉与机构交接', covertRole: '商会、同业公会、社会组织、会员或职务不自动生成党籍、卧底、叛徒或代表全体的政治身份', infiltrationRole: '不以会员名单、住址、行业关系、救济或会议提供现实甄别、跟踪、隐蔽和伤害教程', contact: { id: 'public_d36', label: '龚宜兰', role: '登记公开商会会务、会员异议、救济和组织申诉答复的经手人', status: 'colleague', relation: 20, born: 1889 } },
  });

  C.post1949RouteJobs = C.post1949RouteJobs || {};
  var destinations = Object.keys(C.post1949Paths);
  var places = {
    mainland: ['当地合成长照、恢复与身后服务点', '当地合成会计法律事务与清算登记处', '当地合成工商、同业与社会服务机构'],
    'hong-kong': ['香港一处合成街坊照护与身后服务点', '香港一间合成商号会计与法律文书事务所', '香港一处合成商会与街坊社会组织事务处'],
    taiwan: ['台湾一处合成长照与恢复服务机构', '台湾一间合成会计与法律文书事务所', '台湾一处合成工商与同业组织事务处'],
    overseas: ['落脚城市一处合成社区照护服务点', '落脚城市一间合成华人会计与文书事务所', '落脚城市一处合成华商与社区组织事务处'],
    'in-motion': ['当前落脚地的合成临时照护与转介点', '当前落脚地的合成临时账务与文书服务点', '当前落脚地的合成商户互助与公共事务点'],
    unsettled: ['暂住地一处合成照护与身后事务服务点', '暂住地一间合成账务与文书服务点', '暂住地一处合成同业与居民事务点'],
    macau: ['澳门一处合成街坊照护与身后服务点', '澳门一间合成商号会计与法律文书事务所', '澳门一处合成商会与街坊组织事务处'],
    'southeast-asia': ['新加坡一处合成社区照护服务点', '新加坡一间合成华商会计与文书事务所', '新加坡一处合成华商与社区组织事务处'],
  };
  var people = {
    mainland: [['照护负责人夏静文', '照护员方玉琴', '服务使用者周守安'], ['专业负责人吴清和', '文书员沈静宜', '客户贺素珍'], ['组织负责人江明远', '事务员许兰清', '申诉人罗秀梅']],
    'hong-kong': [['照护主任梁慧贞', '照护员陈少瑜', '服务使用者何德安'], ['会计负责人何瑞安', '文书员郭佩云', '客户冯美仪'], ['商会事务主任陈启华', '事务员梁慧兰', '申诉人许德安']],
    taiwan: [['照护主任林素真', '照护员张惠明', '服务使用者吴景和'], ['专业负责人叶淑真', '文书员邱志远', '客户高文庆'], ['组织事务员邱惠明', '同事林静娟', '申诉人叶玉安']],
    overseas: [['照护负责人许慧兰', '照护员黄玉莲', '服务使用者赵仁和'], ['专业负责人黄文德', '文书员林惠珠', '客户陈玉安'], ['华商事务员郑仁和', '同事许慧兰', '申诉人黄静安']],
    'in-motion': [['临时照护经手人孟玉真', '照护员姜素华', '服务使用者秦良生'], ['临时账务经手人姜家和', '文书员宋玉真', '客户周平安'], ['商户互助经手人秦平安', '事务员徐家和', '申诉人孟静宜']],
    unsettled: [['照护负责人潘雅琴', '照护员陆维清', '服务使用者沈瑞生'], ['专业负责人陆维清', '文书员叶曼云', '客户冯守义'], ['组织事务员冯守义', '同事唐静修', '申诉人潘玉莲']],
    macau: [['照护负责人何慧贞', '照护员郑景鸿', '服务使用者梁婉仪'], ['专业负责人麦景鸿', '文书员何瑞莲', '客户陈庆安'], ['商会事务员梁婉仪', '同事李卓文', '申诉人麦慧真']],
    'southeast-asia': [['照护负责人陈秀琴', '照护员林美珠', '服务使用者郑惠兰'], ['专业负责人林文成', '文书员郭秀琴', '客户林德义'], ['华商事务员郭德义', '同事黄惠珠', '申诉人陈国安']],
  };
  var routeMeta = {};
  routeMeta[ROUTE_CARE] = ['care', '长期照护、伤病恢复与身后事务员', '临时照护与转介员', '本人同意、起居、恢复、辅具、轮班、救济、费用、死亡确认后身后事务与申诉', '照护计划复核与新人带教员', '减少夜班和搬扶，复核本人同意、轮班、救济与身后服务记录'];
  routeMeta[ROUTE_PROFESSIONAL] = ['literate', '会计账务、审计与法律文书协助员', '临时账务与案卷整理员', '资格、委托、凭据、账页、证据、期限、收费、利益冲突、复核、返件与投诉', '专业底稿复核与新人带教员', '减少外勤和夜账，复核委托、底稿、收费和错误改进'];
  routeMeta[ROUTE_ASSOCIATION] = ['literate', '商会、同业与社会组织事务员', '临时会员会议与公共事务员', '章程、会员、会费、会议、调查、调解、救济、异议、工资、资料与机构交接', '组织记录复核与新人带教员', '减少外勤和晚会，复核会员授权、会议、救济和未结事项'];
  [ROUTE_CARE, ROUTE_PROFESSIONAL, ROUTE_ASSOCIATION].forEach(function (route, index) {
    C.post1949RouteJobs[route] = {};
    destinations.forEach(function (destination) {
      var meta = routeMeta[route];
      var named = people[destination][index];
      C.post1949RouteJobs[route][destination] = {
        track: meta[0], role: meta[1], casualRole: meta[2], workplace: places[destination][index], duties: meta[3],
        terms: '先核现行登记、资格、语言或服务范围并按一月试做；留用后按月领薪，住处、资料、公共身份和过去职位分别办理',
        lighterRole: meta[4], lighterDuties: meta[5], supervisor: named[0],
        supervisorRole: '按当前资格、职责、工资、错误和是否留用给具体答复的人', colleague: named[1],
        colleagueRole: '有自己的工资、身体、家庭、专业判断、异议和去留决定的同事', publicPerson: named[2],
        publicRole: index === 0 ? '决定本人照护、费用、隐私和是否继续的人' : index === 1 ? '决定委托、原件、费用、和解与是否继续的客户' : '能申请、投诉、拒绝与申诉且不被组织自动代表的人',
      };
    });
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('care', ROUTE_CARE);
  addRouteToTrack('literate', ROUTE_PROFESSIONAL);
  addRouteToTrack('literate', ROUTE_ASSOCIATION);

  C.events.push(
    { id: 'd32-accountant-rules-1918', year: 1918, eraBrief: true, eraScope: '近代会计师制度与专业资格', families: ['hankoucommerce'], title: '会计师章程、证书与事务所让专业签署开始有制度边界', knownThrough: ['newspaper', 'books'], delta: { knowledge: 1, position: 1 }, knownText: '商号从报刊知道会计师制度和第一批证书、事务所出现；普通账房经验、会计助理与有权签署的会计师仍不是同一身份。', unknownText: '本地先听说外地有人取得会计师证并开事务所，具体登记、考试和服务范围仍要亲自核实。', fact: '1918 年北洋政府农商部颁布《会计师暂行章程》，谢霖领取第一号会计师证书并创办事务所。', historySource: { label: '中国注册会计师协会：中国注册会计师行业发展大事记', url: 'https://www.cicpa.org.cn/ztzl1/zthf/qzzx20/zhxx/200811/t20081121_42163.html' } },
    { id: 'd36-hankou-chamber-life-1925', year: 1925, eraBrief: true, eraScope: '汉口商会与同业组织', families: ['hankoucommerce'], title: '汉口商会与同业组织在商业和社会事务中持续运作', knownThrough: ['newspaper', 'conversation'], delta: { network: 1, knowledge: 1 }, knownText: '你从会务和商号往来知道汉口商人团体经历多次组织演进，并处理经济社会活动、同业关系与对外事务；加入或任职都不等于代表所有商户。', unknownText: '街面只看见商会招牌和会议来往，内部会员、会费、表决、调解和政府关系仍需逐件核。', fact: '1899—1949 年汉口商会档案记录了组织演进、经济社会活动、同业公会及其与政府的关系。', historySource: { label: '国家档案局：武汉市档案馆馆藏汉口商会档案', url: 'https://www.saac.gov.cn/daj/c100230/202011/be5820779e244b2d9130b57af19a49c2.shtml' } },
    { id: 'd30-relief-care-change-1949', year: 1949, eraBrief: true, eraScope: '救济、照护与社会服务机构更替', routes: [ROUTE_CARE], title: '救济照护机构、岗位与人员开始重新登记和承接', knownThrough: ['newspaper', 'letters', 'conversation'], delta: { position: 1, mind: -1, knowledge: 1 }, knownText: '你知道救济、安老、伤残、施医和身后服务的机构关系正在改变；当前人员、服务对象、床位、工资、财物和未结事项要分别确认。', unknownText: '本地只收到重新登记和交接通知，未来机构名称、名额与每个人是否继续服务仍未确定。', fact: '1949 年前后的社会救济与服务机构经历接管、改造和重新组织；个人岗位与服务不能从制度变化直接推定。', historySource: { label: '岳阳市地方志：清代、民国时期的慈善与救济机构', url: 'https://www.yueyang.gov.cn/yysqw/43332/43334/43509/43514/43606/43626/content_1263141.html' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
