// 民国人生 · D27／D28／D29 医疗与公共卫生完整领域包 v0.7.19
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before domain-expansion-medical-public-health.js');

  C.version = '0.7.19';

  var ROUTE_CLINICAL = 'sichuan-clinical-medicine';
  var ROUTE_HOSPITAL = 'sichuan-hospital-services';
  var ROUTE_PUBLIC_HEALTH = 'sichuan-public-health';
  var ALL_ROUTES = [ROUTE_CLINICAL, ROUTE_HOSPITAL, ROUTE_PUBLIC_HEALTH];

  Object.assign(C.legacyRouteDomainMap, {
    'sichuan-clinical-medicine': 'D27',
    'sichuan-hospital-services': 'D28',
    'sichuan-public-health': 'D29',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-D27-WCH-HISTORY': {
      label: '四川大学华西医院：1892—2006 年院史整理与院史馆',
      url: 'https://www.wchscu.cn/news/learn3/83511.html',
      supports: ['成都近代医院、医学教育、医护人员和病历实物的长期存在'], status: 'source-reviewed-first-round',
    },
    'SRC-D27-PUMCH-SURGERY': {
      label: '北京协和医院：1921 年病房开放与首批住院病人记录',
      url: 'https://www.pumch.cn/detail/25552.html',
      supports: ['门诊、住院、手术、病房和不同医疗岗位之间的交接边界'], status: 'source-reviewed-first-round',
    },
    'SRC-D27-PUMCH-EMERGENCY': {
      label: '北京协和医院：1921 年门诊、急诊与住院接诊记录',
      url: 'https://ims.pumch.cn/detail/26366.html',
      supports: ['固定门诊、急诊判断、收入病房和经手记录并非同一结果'], status: 'source-reviewed-first-round',
    },
    'SRC-D28-PUMCH-RECORDS': {
      label: '北京协和医院：1921 年病案室与集中病案管理沿革',
      url: 'https://www.pumch.cn/detail/28830.html',
      supports: ['病案登记、统一编号、病历书写、隐私与长期保存的独立劳动'], status: 'source-reviewed-first-round',
    },
    'SRC-D28-PUMCH-PHARMACY': {
      label: '《协和医学杂志》：1921—1951 年北京协和医院药剂科史',
      url: 'https://xhyxzz.pumch.cn/cn/article/pdf/preview/10.12290/xhyxzz.20200232.pdf',
      supports: ['医院药剂、处方集、制剂、学术与人员分工的历史存在'], status: 'source-reviewed-first-round',
    },
    'SRC-D29-SAAC-PLAGUE': {
      label: '国家档案局：伍连德与哈尔滨防治鼠疫、霍乱档案文献',
      url: 'https://www.saac.gov.cn/mowcn/cn/6sbs/202512/e293b373c6604aa2b45ce1f33d62875c.shtml',
      supports: ['1910—1931 年调查、布告、隔离、交通管制、卫生检疫和跨机构协作'], status: 'source-reviewed-first-round',
    },
    'SRC-D29-NHC-VECTOR': {
      label: '国家卫生健康委员会：我国病媒传播疾病防治历史背景',
      url: 'https://www.nhc.gov.cn/jnr/sjwsrzsxx/201403/66ebc5d40d35472abdd68f2f5fc9dec2.shtml',
      supports: ['1949 前后鼠疫、疟疾、丝虫病与血吸虫病的广泛负担及长期防治'], status: 'source-reviewed-first-round',
    },
    'SRC-D29-BEIJING-HYGIENE': {
      label: '北京文明网：清末京师疾疫防控与街道、水源、市场卫生规则',
      url: 'https://www.bjwmb.gov.cn/zxfw/wmwx/wskt/t20200214_965712.htm',
      supports: ['街巷清洁、水源、市场、种痘与防疫规则的执行摩擦'], status: 'source-reviewed-first-round',
    },
  });

  Object.assign(C.routes, {
    'sichuan-clinical-medicine': {
      name: '医学训练、诊所与医院诊疗', family: 'sichuanmedicine',
      summary: '从基础课程、跟诊与病历训练开始，逐步承担有资格边界的问诊、检查、复诊和转介；不知道、需复核和不能接诊都有具体后果。',
    },
    'sichuan-hospital-services': {
      name: '检验、药剂、病案与医院行政', family: 'sichuanmedicine',
      summary: '让样本、处方、药品、病案、费用、床位与物资各有编号、经手人和纠错记录，辅助岗位不是一句“在医院帮忙”。',
    },
    'sichuan-public-health': {
      name: '防疫调查、卫生服务与救济', family: 'sichuanmedicine',
      summary: '从住址核实、病例报告、饮水与环境调查、公开说明和救济登记，走到跨区域防疫与长期公共卫生服务。',
    },
  });

  var sichuanPath = C.decisions.find(function (item) { return item.id === 'sichuan-path'; });
  if (sichuanPath && !sichuanPath.options.some(function (item) { return item.id === 'clinical-training'; })) {
    sichuanPath.prompt = '药铺、食摊、护理之外，附近医院与卫生机构也给出医学训练、医技事务和公共卫生三种有期限入口；认识药材或照料过病亲都不能自动换成资格。';
    sichuanPath.options.push(
      { id: 'clinical-training', label: '报名医学基础与跟诊训练，先核课程、费用、监督人和资格范围', route: ROUTE_CLINICAL, delta: { knowledge: 4, craft: 2, money: -2 }, fact: '1923 年进入有课程、考核、监督人与资格边界的医学训练。' },
      { id: 'hospital-services', label: '从样本、药剂、病案或库房轮岗试做进入医院辅助工作', route: ROUTE_HOSPITAL, delta: { knowledge: 3, craft: 3, money: 1 }, fact: '1923 年进入医院检验、药剂、病案与行政轮岗试做。' },
      { id: 'public-health', label: '从住址核查、卫生宣传和救济登记训练进入公共卫生', route: ROUTE_PUBLIC_HEALTH, delta: { knowledge: 3, network: 2, mind: 2 }, fact: '1923 年进入有公开职责和复核人的防疫、卫生与救济训练。' }
    );
  }

  C.actions.push(
    { id: 'd27-case-history', name: '在监督下完成一份主诉、病史、检查与未知记录', routes: [ROUTE_CLINICAL], minAge: 15, spirit: 4, careerAction: true, delta: { knowledge: 4, mind: 2, health: -1 }, contactEffects: { d27_lu_jinghe: { relation: 1 } }, note: '病人同意、本人陈述、观察、判断和待核分开；这不是现实诊断建议。' },
    { id: 'd27-supervised-round', name: '跟一轮门诊或病房并逐人完成交接', routes: [ROUTE_CLINICAL], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, knowledge: 3, health: -1 }, contactEffects: { d27_lu_jinghe: { relation: 2 }, d27_he_wanqing: { relation: 1 } }, note: '问诊、检查、处置、复查和转介都有负责人，不靠“忙了一天”概括。' },
    { id: 'd27-consent-privacy', name: '向病人说明检查范围、费用、隐私和可拒绝部分', routes: [ROUTE_CLINICAL], minAge: 17, spirit: 3, careerAction: true, delta: { mind: 3, relation: 2 }, contactEffects: { d27_zhou_suying: { relation: 2 } }, note: '拒绝某项检查不自动等于拒绝全部照料。' },
    { id: 'd27-differential-review', name: '把三种可能、危险征象和不能确认处交给上级复核', routes: [ROUTE_CLINICAL], minAge: 18, spirit: 4, careerAction: true, delta: { knowledge: 5, mind: 3 }, contactEffects: { d27_chen_boming: { relation: 1 } }, note: '不知道和转诊是专业结果，不能为了体面编出确定病名。' },
    { id: 'd27-followup-result', name: '核一名病人的复诊、用药、费用与是否改善', routes: [ROUTE_CLINICAL], minAge: 18, spirit: 3, careerAction: true, delta: { knowledge: 3, relation: 2, money: 1 }, contactEffects: { d27_zhou_suying: { relation: 1 } }, note: '失联、未取药、无变化、加重和改善分别记录，不补写不存在的疗效。' },
    { id: 'd27-error-review', name: '复盘一次迟延、漏记或判断错误并联系受影响者', routes: [ROUTE_CLINICAL], minAge: 19, spirit: 4, careerAction: true, delta: { mind: 4, fame: -1, relation: 2 }, contactEffects: { d27_he_wanqing: { relation: 1 } }, note: '说明已发生的影响、能补救和不能撤回部分；复盘不抹掉责任。' },
    { id: 'd27-referral-letter', name: '写一封含检查结果、未知、费用与抵达回执的转诊信', routes: [ROUTE_CLINICAL], minAge: 18, spirit: 3, careerAction: true, delta: { knowledge: 3, network: 2 }, contactEffects: { d27_fang_jiren: { relation: 2 } }, note: '转出不等于对方已接诊，抵达与答复另有记录。' },
    { id: 'd27-rest-coverage', name: '因发热、失眠或暴露请假并安排具名代班', routes: [ROUTE_CLINICAL], minAge: 16, spirit: 2, careerAction: true, delta: { health: 3, money: -1, mind: 2 }, contactEffects: { d27_tang_yuchun: { relation: 1 } }, note: '医护人员也会生病；请假、检查、代班和返岗条件分别处理。' },

    { id: 'd28-specimen-chain', name: '核样本姓名、时间、来源、容器、接收人与拒收原因', routes: [ROUTE_HOSPITAL], minAge: 14, spirit: 4, careerAction: true, delta: { craft: 4, knowledge: 3, health: -1 }, contactEffects: { d28_qin_mingzhen: { relation: 2 } }, note: '标签不清就暂停，不把猜测写成检验结果。' },
    { id: 'd28-pharmacy-check', name: '按处方核药名、剂型、批次、库存与第二人复核', routes: [ROUTE_HOSPITAL], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 4, knowledge: 2, mind: 2 }, contactEffects: { d28_gao_ruifang: { relation: 2 } }, note: '药剂岗位不改诊断或处方，短缺与替代退回有资格者确认。' },
    { id: 'd28-medical-record', name: '归并一次门诊、住院、检查与出院记录', routes: [ROUTE_HOSPITAL], minAge: 14, spirit: 3, careerAction: true, delta: { knowledge: 3, craft: 3 }, contactEffects: { d28_song_wenxiu: { relation: 2 } }, note: '重名、缺页、更正和借阅人留下痕迹，病案不因认识病人对外开放。' },
    { id: 'd28-result-release', name: '复核一份结果的编号、范围、异常标记和收件人', routes: [ROUTE_HOSPITAL], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 3, mind: 3 }, contactEffects: { d28_qin_mingzhen: { relation: 1 }, d28_ye_qiusheng: { relation: 1 } }, note: '检验结果交给负责诊疗者解释，技术员不越权替病人下结论。' },
    { id: 'd28-bed-fee-ledger', name: '核床位、押金、救济、欠费和实际出院日', routes: [ROUTE_HOSPITAL], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 3, money: 2, relation: 1 }, contactEffects: { d28_ye_qiusheng: { relation: 2 } }, note: '欠费不自动抹掉病人，也不把救济写成无条件永久免费。' },
    { id: 'd28-stock-expiry', name: '清点药品、试剂、敷料的批次、余量、损坏与去向', routes: [ROUTE_HOSPITAL], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, mind: 3, money: 1 }, contactEffects: { d28_gao_ruifang: { relation: 1 } }, note: '单位物资、捐赠、借用和私人购买分开，清点不生成所有权。' },
    { id: 'd28-correction-log', name: '登记一次错号、错发、漏页或延迟并追到后果', routes: [ROUTE_HOSPITAL], minAge: 17, spirit: 3, careerAction: true, delta: { mind: 4, fame: -1, relation: 2 }, contactEffects: { d28_song_wenxiu: { relation: 1 } }, note: '更正保留原记录、时间、经手人和已经造成的影响。' },
    { id: 'd28-shift-handover', name: '交清未出结果、缺药、欠费、空床与待修设备', routes: [ROUTE_HOSPITAL], minAge: 15, spirit: 3, careerAction: true, delta: { craft: 3, network: 2, health: 1 }, contactEffects: { d28_luo_shuzhen: { relation: 2 } }, note: '交班让下一人能继续，也允许自己按时离开和休息。' },

    { id: 'd29-household-survey', name: '核一户住址、同住者、症状日期、饮水与接触范围', routes: [ROUTE_PUBLIC_HEALTH], minAge: 15, spirit: 4, careerAction: true, delta: { knowledge: 3, network: 2, health: -1 }, contactEffects: { d29_jiang_yisheng: { relation: 1 } }, note: '记录只到本人同意和公共卫生需要，不公开羞辱或猜测病因。' },
    { id: 'd29-case-notification', name: '把疑似、已确认、排除与待复核分别报告', routes: [ROUTE_PUBLIC_HEALTH], minAge: 16, spirit: 3, careerAction: true, delta: { knowledge: 3, mind: 3 }, contactEffects: { d29_guo_chengyi: { relation: 2 } }, note: '及时报告不等于擅自宣布确诊，统计和个体答复分开。' },
    { id: 'd29-water-sanitation', name: '走一段街巷核井水、排污、市场和清运责任', routes: [ROUTE_PUBLIC_HEALTH], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 2, knowledge: 3, network: 2 }, contactEffects: { d29_wang_shouquan: { relation: 2 } }, note: '检查点、责任人、期限和复查结果具体留下，不用“改善卫生”概括。' },
    { id: 'd29-public-notice', name: '把已知、未知、求助地址和更新日期写成公开说明', routes: [ROUTE_PUBLIC_HEALTH], minAge: 16, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 3, fame: 1 }, contactEffects: { d29_liu_yunzhi: { relation: 1 } }, note: '不公布私人住址，不承诺没有证据的安全，也不提供现实高风险操作教程。' },
    { id: 'd29-relief-register', name: '登记一批口粮、药品、床位的资格、数量与未领原因', routes: [ROUTE_PUBLIC_HEALTH], minAge: 16, spirit: 4, careerAction: true, delta: { mind: 3, relation: 2, money: 1 }, contactEffects: { d29_he_xiulan: { relation: 2 } }, note: '申请、审核、领取和后续不是同一时刻，没领到要有明确下一步。' },
    { id: 'd29-vaccination-record', name: '核一次接种或预防服务的对象、同意、批次与复查', routes: [ROUTE_PUBLIC_HEALTH], minAge: 18, spirit: 4, careerAction: true, delta: { craft: 3, knowledge: 3, health: -1 }, contactEffects: { d29_jiang_yisheng: { relation: 1 } }, note: '游戏只记录制度与劳动流程，不提供现实剂量、禁忌或操作指引。' },
    { id: 'd29-rumor-response', name: '找出一条传言的来源、担忧、可证事实与更正渠道', routes: [ROUTE_PUBLIC_HEALTH], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 3, network: 2, relation: 1 }, contactEffects: { d29_liu_yunzhi: { relation: 2 } }, note: '居民不因怀疑自动变成愚昧或敌对，强制措施与公开解释分别记后果。' },
    { id: 'd29-field-rest', name: '结束外勤暴露、清点防护物并安排轮休与复查', routes: [ROUTE_PUBLIC_HEALTH], minAge: 16, spirit: 2, careerAction: true, delta: { health: 3, mind: 2, money: -1 }, contactEffects: { d29_guo_chengyi: { relation: 1 } }, note: '公共服务不是无限牺牲；暴露、症状、隔离、工资和替班都有记录。' }
  );

  var sourceIds = {
    clinical: ['SRC-D27-WCH-HISTORY', 'SRC-D27-PUMCH-SURGERY', 'SRC-D27-PUMCH-EMERGENCY', 'SRC-D28-PUMCH-RECORDS'],
    hospital: ['SRC-D28-PUMCH-RECORDS', 'SRC-D28-PUMCH-PHARMACY', 'SRC-D27-PUMCH-SURGERY', 'SRC-D27-WCH-HISTORY'],
    publicHealth: ['SRC-D29-SAAC-PLAGUE', 'SRC-D29-NHC-VECTOR', 'SRC-D29-BEIJING-HYGIENE', 'SRC-D27-WCH-HISTORY'],
  };

  function opt(id, label, delta, result, next) {
    return { id: id, label: label, delta: delta, result: result, next: next };
  }

  function installDomainDecisions(domain, field, route, rows) {
    rows.forEach(function (row) {
      var year = row[0];
      var options = row.slice(3).map(function (item) {
        var echo = domain.toLowerCase() + ':' + year + ':' + item.id;
        C.ordinaryEvents.push({
          id: 'echo-' + echo.replace(/:/g, '-'), title: row[1] + '：次年结果', text: item.next,
          year: year + 1, priority: 46, requiresEchoes: [echo], families: ['sichuanmedicine'], routes: [route],
          sourceIds: sourceIds[field].slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
        });
        return { id: item.id, label: item.label, delta: item.delta, echo: echo, fact: item.result, endingFact: true };
      });
      C.decisions.push({ id: 'route-' + domain.toLowerCase() + '-' + year, year: year, routes: [route], title: row[1], prompt: row[2], options: options });
    });
  }

  var clinical = [
    [1924, '医学训练先把哪一项打牢', '课程、学费、住处和跟诊同时开始；一次入门不能把识字、药材经验或家中照料直接换成行医资格。',
      opt('foundation', '先完成解剖、生理、病史与记录基础考核', { knowledge: 5, money: -2 }, '1924 年完成第一组医学基础考核。', '成绩单列出已通过、需补习和不得独立操作三栏；下一学期才进入有限跟诊。'),
      opt('clinic-observe', '先做门诊观察与病历抄录，不独立判断', { knowledge: 3, craft: 2, health: -1 }, '1924 年在监督下完成门诊观察与病历抄录。', '陆静和逐份退改记录；你能复述流程，但仍没有独立接诊权限。'),
      opt('fees-work', '减少课程并接医院登记工补学费', { money: 2, knowledge: 2, health: -1 }, '1924 年以具名登记劳动补贴医学训练。', '工钱接住一学期住宿，一门课程延期；劳动与学业分别计时，没有伪造成按期修完。')],
    [1926, '第一次跟诊怎样留下病人的位置', '病人周素英同意你旁听，但她可以限制在场人数、身体检查范围和家属是否听见。',
      opt('consent', '先由本人确认旁听、记录与可停止范围', { mind: 3, relation: 2 }, '1926 年按病人同意范围参加跟诊。', '周素英中途拒绝一项示教，其他问诊继续；记录保留她的拒绝，没有惩罚她。'),
      opt('private-review', '退出检查区，只在事后核匿名教学记录', { knowledge: 3, relation: 1 }, '1926 年改用去身份教学记录学习。', '你少看一次现场，却完整核过病史与判断链；隐私没有被教学需要吞掉。'),
      opt('female-clinician', '请合适的具名医护在场并重新约时', { network: 2, money: -1, relation: 3 }, '1926 年按病人要求重新安排具名医护。', '复诊如期完成，等待多了一周；谁在场、谁负责和费用都写进病历。')],
    [1928, '能不能独立接这一位病人', '你已经完成若干课程和跟诊，但一例症状超出当前把握；诊所缺人不等于可以跳过资格边界。',
      opt('supervisor', '先问诊记录，再请陆静和复核并共同答复', { knowledge: 4, mind: 3 }, '1928 年在复核后共同完成一次接诊。', '陆静和改了一个初步判断并说明依据；病人知道两人职责，没有把纠正藏起来。'),
      opt('refer', '说明无法在此确认并写转诊信', { network: 3, relation: 2, money: -1 }, '1928 年将超出能力的一例转给能负责的机构。', '方济仁回函确认病人已抵达，也指出一项原记录缺失；转诊不是甩手，后账继续。'),
      opt('limited-care', '只处理已确认的支持与复查安排，不下病名', { craft: 2, mind: 3, fame: -1 }, '1928 年只提供能力范围内的有限照料。', '症状没有立即改善，病人按约复查；未知仍显示未知，没有被声望掩盖。')],
    [1930, '两种判断互相冲突时怎样继续', '病史、体征和一项检查并不完全相容；家属催促立刻给一个确定答案。',
      opt('repeat', '重做能复核的检查并记录时间差', { knowledge: 4, money: -1, health: -1 }, '1930 年复核一项相互冲突的检查。', '第二次结果仍不能完全解释症状，判断范围缩小但没有虚构确定性。'),
      opt('conference', '请陈伯明与何婉清共同复核病史和护理记录', { network: 3, mind: 3 }, '1930 年由不同岗位共同复核一例疑难病人。', '护理记录补上夜间变化，原判断被修改；贡献和责任分别留名。'),
      opt('observe', '与病人谈清观察期限、危险征象和提前返回方式', { relation: 3, mind: 2 }, '1930 年与病人约定有期限的观察和复查。', '病人在期限前因变化返回，获得再次评估；观察没有被写成“什么都不做”。')],
    [1932, '病人付不起全部费用时诊疗怎样继续', '检查、药品、床位与医护劳动各有成本；贫困也不能让病人只剩“被救济”一种身份。',
      opt('staged', '与本人分阶段安排必要项目并列明费用', { relation: 2, money: -2, mind: 2 }, '1932 年与病人形成分阶段诊疗费用单。', '第一阶段完成，第二项因钱延期；已做、未做和风险都清楚。'),
      opt('relief', '由救济登记员核有限补助，诊疗者不自行批钱', { network: 2, relation: 2 }, '1932 年转介一笔有范围的医疗救济申请。', '补助只覆盖床位和一项检查，药品仍有缺口；申请没有变成无限承诺。'),
      opt('lower-cost', '改用能回答核心问题的较少项目', { knowledge: 2, money: -1, fame: -1 }, '1932 年缩小检查范围并说明信息损失。', '较少项目排除一种危险情况，其他问题仍待观察；节省没有冒充同等完整。')],
    [1934, '病历该怎样回应女性与男性不同的时代处境', '同一症状背后可能有夜路、工时、婚家控制、养家压力和羞耻；性别信息不能替代医学证据。',
      opt('private-history', '给本人单独陈述时间并询问是否写入家属可见部分', { relation: 3, mind: 3 }, '1934 年按本人选择分开记录敏感病史。', '一项家庭压力进入受限记录，家属只得到必要照护说明；隐私边界被保留。'),
      opt('work-context', '分别核工作、家务、睡眠、饮食与暴露时间', { knowledge: 3, relation: 1 }, '1934 年把具体生活负担写进病史。', '症状与连续夜班的时间关系得到确认，性别没有被当作病因。'),
      opt('second-clinician', '按本人要求更换或增加一名具名诊疗者', { network: 2, money: -1, relation: 3 }, '1934 年按病人要求调整诊疗人员。', '新诊疗者重新问过关键病史，原记录仍保留；更换没有被写成不信任或闹事。')],
    [1936, '一次迟延和漏记已经影响复诊', '病人错过复查，病历上也没有留下谁应通知；不能把责任全推给一个失约的人。',
      opt('disclose', '联系本人说明漏记、现状和补救安排', { relation: 3, fame: -2, mind: 3 }, '1936 年向受影响病人说明一次漏记。', '病人接受重新评估但投诉等候损失；补救开始，原影响没有消失。'),
      opt('system-review', '复核预约、地址、交班和未到名单四段', { craft: 3, mind: 4 }, '1936 年完成一次复诊流程复盘。', '查出地址抄错和交班漏项各一处，两名经手人分别改流程。'),
      opt('external-review', '请未参与原接诊者复核病历与当前风险', { network: 2, money: -1, mind: 3 }, '1936 年请独立诊疗者复核迟延个案。', '复核者确认需补做一项检查，也认定另一项已无补救价值；结论没有粉饰。')],
    [1938, '战事与迁移让病房怎样接住病人', '床位、药品、人员和家属地址都在变化；搬走一个机构不等于每名病人都被安全接走。',
      opt('patient-list', '先逐人核病情、去向、陪护、药物和接收人', { mind: 4, relation: 2, health: -1 }, '1938 年建立病人转移与留守清单。', '大部分病人有接收人，一名中途改去亲属家；去向变更留有回执。'),
      opt('essential-service', '缩减非急项目，保住门诊复查与转诊', { money: -2, mind: 3, fame: -1 }, '1938 年缩减诊疗范围以保住必要服务。', '等候变长、收入下降，但病人知道哪些暂停、何处替代和何时更新。'),
      opt('mobile-followup', '组成公开流动复查点，只处理列明职责', { network: 3, health: -2, craft: 2 }, '1938 年参加有公开地址和范围的流动复查。', '流动点接住两批旧病人，也将三例转回固定医院；它没有被写成万能诊所。')],
    [1940, '药品短缺时不能把替代写成一样', '常用药缺货，供货人拿来标签不清的替代品；病人又已经等了很久。',
      opt('verified-only', '只使用来源、标签与保存能确认的品项', { mind: 3, money: -2, fame: 1 }, '1940 年拒绝来源不清的替代药品。', '部分病人改去他处，留下的人知道缺什么；一批可核货物两月后补到。'),
      opt('prescriber-review', '逐例交原诊疗者判断能否调整方案', { knowledge: 3, network: 2, health: -1 }, '1940 年逐例复核短缺后的诊疗安排。', '三例得到不同答复：调整、等待与转诊；没有统一用一种替代掩盖差异。'),
      opt('supportive-limit', '说明当前只能提供有限支持并约定复查', { relation: 3, fame: -1, money: -1 }, '1940 年公开说明有限照料范围。', '两人按时复查，一人失联；最后已知状态分别保留。')],
    [1942, '病人增加后先保哪一种连续性', '门诊、病房、夜间来诊和家中照料同时增加；一名医护不能永远多接一班。',
      opt('team-handover', '按病人而非按职位拆成交接小组', { network: 3, relation: 2, health: 1 }, '1942 年建立具名病人交接小组。', '你休息半日时工作继续，两处交接也暴露重复记录，次月修正。'),
      opt('clinic-hours', '固定门诊时段并公布急症转介处', { mind: 3, fame: -1, health: 2 }, '1942 年缩短并固定门诊时段。', '普通病人等待更久，夜间无谓奔走减少；急症去向有更新。'),
      opt('family-boundary', '减少一段公共值班，与家人谈清照料期限', { relation: 3, health: 2, money: -2 }, '1942 年减少值班并明确家庭照料期限。', '家中复诊接住了，工资下降；配偶和父母没有自动替你补班。')],
    [1945, '战后怎样处理失散病案与旧病人', '旧诊所部分毁损，同事去向不一，病人拿着残缺收据、药包和记忆回来。',
      opt('reconstruct', '以本人陈述、旧纸据和现查结果重建，标出来源', { knowledge: 4, relation: 2 }, '1945 年重建一批带来源标记的病历。', '一项旧病名无法确认，被改成历史陈述；新检查另起日期。'),
      opt('new-record-link', '建立新病历并只链接能确认的旧信息', { craft: 3, mind: 3 }, '1945 年建立新病历并链接有限旧记录。', '复诊得以继续，缺失年份仍空白；系统没有替病人编出完整过去。'),
      opt('refer-archive', '把争议旧记录交病案人员共同复核', { network: 3, money: -1 }, '1945 年将旧病案争议交给具名复核人。', '病案员确认一张编号属于同名他人，避免两段人生被合并。')],
    [1948, '下一阶段继续在哪种医疗位置', '制度、地域和机构可能改变；你要选择继续诊疗、转向教学复核或把现有病人逐一移交。',
      opt('clinic', '继续门诊与医院诊疗，但重新核资格和岗位', { position: 2, knowledge: 2 }, '1948 年选择继续有资格边界的临床工作。', '新机构给出具体岗位、监督关系、薪水与试用期；旧名声没有自动换成任职。'),
      opt('teaching', '减少独立门诊，转做病历讨论与新人带教', { knowledge: 3, health: 2, money: -1 }, '1948 年转向诊疗复核与医学带教。', '每周保留少量复诊，其余时间核病历和示教；病人逐人选择是否继续。'),
      opt('handover', '按病人移交并转入医院辅助或公共卫生', { mind: 3, network: 2, position: -1 }, '1948 年完成一批临床病人的具名移交。', '接收人确认大部分记录，两名病人另选去处；原职业结束成为事实。')]
  ];

  var hospital = [
    [1924, '医院轮岗先站在哪一个位置', '样本台、药剂室、病案室和事务台都缺人，但每一处都要先学编号、权限和停止条件。',
      opt('laboratory', '从样本接收与标签复核开始', { craft: 3, knowledge: 3, health: -1 }, '1924 年开始检验样本接收轮岗。', '秦明贞退回一只姓名不全的容器；延迟被记录，没有靠猜测补标签。'),
      opt('pharmacy', '从处方接收、库存与第二人复核开始', { craft: 3, mind: 2 }, '1924 年开始医院药剂轮岗。', '高瑞芳确认你可做库存与按单准备，改方和解释仍由有资格者负责。'),
      opt('records', '从统一编号、病案借还与缺页登记开始', { knowledge: 3, mind: 3 }, '1924 年开始病案与医院事务轮岗。', '宋文秀核过第一批编号，发现同名两人并分开建档。')],
    [1926, '一份样本标签与申请单对不上', '姓名相同，年龄、病区和采集时间却冲突；赶时间不能让技术人员替临床猜是哪一位。',
      opt('reject', '暂停并请采集者重新确认或重取', { mind: 4, fame: -1 }, '1926 年拒收一份身份冲突的样本。', '病人多等一次，重新取样后完成检验；错号风险与等待代价都留下。'),
      opt('trace', '封存样本，逐项追查病区、时间与经手人', { craft: 3, knowledge: 2 }, '1926 年追查一份身份冲突样本。', '查出申请单抄错病区；更正保留原字迹和两名经手人。'),
      opt('supervisor', '交秦明贞决定能否补证，不自行放行', { network: 2, mind: 3 }, '1926 年把样本放行决定交给负责复核者。', '复核者决定不能补证并重取；职责没有被“请示”稀释。')],
    [1928, '处方字样与库存标签出现冲突', '药名、规格或数量有一项不能确定，病人已经缴费并等着离开。',
      opt('prescriber', '退回原诊疗者确认并更新处方', { mind: 3, relation: 1, money: -1 }, '1928 年退回字样冲突处方。', '更新处方次日送到，原收费据此更正；等待没有被写成药剂员刁难。'),
      opt('verified-part', '只准备已确认部分，其余暂不交付', { craft: 3, fame: 1, money: -1 }, '1928 年只交付处方中已确认的部分。', '病人带着清单回来补齐，药剂室记录分两次交付。'),
      opt('refund-refer', '说明无法在本院确认，退相应款并给转介地址', { relation: 2, money: -2 }, '1928 年退还无法交付部分并安排转介。', '转介处确认有货，病人付出额外路程；本院没有保留未完成的费用。')],
    [1930, '同名病人的病案被夹在一起', '两人的住址、年龄和就诊年份互相矛盾，直接拆开也可能丢掉真正连续记录。',
      opt('identity-index', '用编号、住址、生日与经手科室逐页核对', { knowledge: 4, craft: 2 }, '1930 年逐页拆分同名病案。', '大部分页归位，两页仍标待核；不确定没有被硬分。'),
      opt('patient-confirm', '请两名本人分别核可辨识的基本信息', { relation: 3, mind: 2 }, '1930 年请同名病人分别核基本资料。', '一人指出旧住址，一人无法确认一页；本人陈述被标注来源。'),
      opt('restricted-file', '将争议页临时封存，先开各自新记录', { mind: 4, position: -1 }, '1930 年封存同名争议页并开新记录。', '诊疗没有停下，争议记录不再被继续复制；复核排入下月。')],
    [1932, '床位、欠费和救济名单不能混成一张', '事务台同时收到空床、未缴押金、已批准救济与等待出院四种消息。',
      opt('separate-ledgers', '将床位、费用、救济和出院各自登记并互相链接', { craft: 3, mind: 3 }, '1932 年拆分医院床位与费用账。', '一张错写空床的记录被发现；病人没有因此被赶出病房。'),
      opt('named-review', '由叶秋生逐日签答冲突项目', { network: 2, relation: 2 }, '1932 年建立具名床位费用复核。', '三笔欠费得到分期、救济与不批准三种答复，下一步清楚。'),
      opt('patient-receipt', '给每名病人一张已付、欠项与申请状态收据', { relation: 3, money: -1 }, '1932 年向病人提供分项费用收据。', '一名家属据收据找出重复收费；退款和更正经手人留名。')],
    [1934, '检验结果出来以后谁来解释', '一项结果超出参考范围，病人就在窗口追问是不是得了某种病。',
      opt('clinician', '核身份后把结果交负责诊疗者解释', { mind: 3, relation: 2 }, '1934 年按权限交付一项检验结果。', '诊疗者结合病史说明还需复核；技术结果没有被窗口一句话变成诊断。'),
      opt('technical-limit', '只说明样本、方法、范围和是否需重做', { knowledge: 3, fame: -1 }, '1934 年只解释检验技术范围。', '病人仍焦虑但得到明确复诊时段；技术员没有用权威填补职责外问题。'),
      opt('repeat-check', '先复核编号、质控和样本状态再发出', { craft: 4, health: -1 }, '1934 年复核异常结果后再发出。', '复核发现样本状态影响一项数值，报告附上限制并重新取样。')],
    [1936, '家属要求查看一整本病案', '家属关心病情，也可能看到病人没有同意公开的历史；亲属关系不等于无限阅览权。',
      opt('patient-consent', '先问病人同意哪些页、给谁和多久', { relation: 3, mind: 3 }, '1936 年按病人同意范围提供病案信息。', '家属得到照护所需摘要，私人陈述仍受限；关系没有因此自动破裂。'),
      opt('care-summary', '由负责诊疗者出具必要照护摘要', { knowledge: 2, relation: 2 }, '1936 年以具名照护摘要回应家属。', '摘要说明复诊和照料，不复制整本病案；诊疗者为内容负责。'),
      opt('decline-log', '拒绝无授权查阅并登记请求与理由', { mind: 4, fame: -1 }, '1936 年拒绝一次无授权病案查阅。', '家属不满但取得正式申请渠道；拒绝不是让请求凭空消失。')],
    [1938, '转移医院时先搬人、药还是病案', '战事迫近，病人、药品、样本、病案、设备和员工家属不可能一车带走。',
      opt('care-first', '先核病人与当日用药，再按清单转移病案摘要', { relation: 3, mind: 3, health: -1 }, '1938 年按病人连续照料优先转移。', '病人均有接收单，两箱完整病案晚到一周；摘要和原件状态分别记录。'),
      opt('records-stock', '先分紧急药品与核心索引，其余封存标址', { craft: 3, knowledge: 2 }, '1938 年转移核心药品与病案索引。', '新点能查到编号，旧址仍有封存物；一箱去向待核，没有写成丢失。'),
      opt('split-teams', '把病人、药剂、病案和设备交四名负责人', { network: 4, mind: 2 }, '1938 年建立四段医院转移交接。', '一段延误但责任清楚；负责人有自己的家属与去留，没有被写成工具。')],
    [1940, '试剂与药品短缺时怎样分配', '临床催结果，药房催补货，库房只有零散批次；先到不总等于最需要。',
      opt('criteria', '与各岗位公开列出优先条件和复核日', { mind: 4, network: 2 }, '1940 年建立短缺物资分配条件。', '三项需求被延后并得到替代去向；条件被质疑后修改一次。'),
      opt('conserve', '减少非必要重复并逐项记录节省与影响', { craft: 3, money: 1, fame: -1 }, '1940 年减少非必要物资消耗。', '库存多撑两周，一项复查也因此推迟；节省和损失同时入账。'),
      opt('shared-stock', '与另一机构按批次、所有和归还期限互借', { network: 3, money: -1 }, '1940 年建立有限医院物资互借。', '一批试剂按期归还，一批敷料改为付款；互借没有变成无主财产。')],
    [1942, '一张报告的错号已经发到病房', '错号可能改变诊疗，先改纸面还不够；必须找到谁看过、做了什么和病人当前情况。',
      opt('recall', '立即撤回、通知病房并核已采取的行动', { mind: 4, fame: -2, relation: 2 }, '1942 年撤回一份错号报告并追踪影响。', '病房尚未改变处置，病人重新取样；惊扰与延误仍记录。'),
      opt('incident-review', '保留原件并由多岗位复盘编号链', { craft: 3, network: 3 }, '1942 年完成错号事件复盘。', '发现接收和抄写各缺一次核对，两处流程分别调整。'),
      opt('patient-explain', '请负责诊疗者向病人说明并给出复查安排', { relation: 3, fame: -1 }, '1942 年向病人说明一次检验错号。', '病人要求换一名经手人并获得同意；信任没有被强行恢复。')],
    [1945, '战后重新开门先核什么', '旧员工、病案、库存、设备、欠薪和病人都陆续回来；门牌挂回去不等于医院已经复原。',
      opt('inventory', '逐间核人员、物资、设备状态和所有关系', { craft: 4, money: -1 }, '1945 年完成医院复开清单。', '两件设备需修、一批药品不能使用、三名旧同事另有去向。'),
      opt('limited-service', '只开放能明确负责的登记、药剂和基础检验', { mind: 3, fame: -1, relation: 2 }, '1945 年有限恢复医院辅助服务。', '服务范围每周更新，超出部分有转介；收入不足仍显示。'),
      opt('staff-terms', '先与返岗者谈职责、工资、欠薪和试做期', { network: 3, money: -2 }, '1945 年重订医院辅助岗位条件。', '四人返岗、一人拒绝；欠薪只确认一部分，没有用团结口号抵账。')],
    [1948, '下一阶段保留哪一种医院专业', '检验、药剂、病案和事务已经形成不同能力；你不必一辈子被称作泛化助手。',
      opt('laboratory', '转为检验与样本质量岗位', { knowledge: 3, craft: 3 }, '1948 年选择检验与样本质量工作。', '新岗位写出样本范围、复核人、工钱与不得解释诊断的边界。'),
      opt('pharmacy', '转为医院药剂、库存与处方复核岗位', { craft: 3, mind: 3 }, '1948 年选择医院药剂与库存工作。', '新岗位写出配发、批次、短缺和退回处方流程，改方仍不在权限内。'),
      opt('records-admin', '转为病案、费用、床位与医院事务岗位', { knowledge: 3, network: 2 }, '1948 年选择病案与医院事务工作。', '统一编号、借阅隐私、床位与费用成为正式职责，不再叫“帮忙”。')]
  ];

  var publicHealth = [
    [1924, '第一次社区调查先问什么', '住址、同住者、发病日期、饮水、工作和接触都可能有关，也都可能涉及隐私与误判。',
      opt('timeline', '先核时间线与最后能够确认的接触', { knowledge: 3, mind: 3 }, '1924 年完成一户有来源标记的卫生时间线。', '两条传闻被排除，一名接触者仍待找到；未知没有补成事实。'),
      opt('water-work', '先核饮水、工作与共同活动地点', { craft: 2, network: 3 }, '1924 年完成一段生活环境调查。', '查出共用水点需复查，但不能据此宣布病因；样本与报告另行处理。'),
      opt('consent-limit', '先说明用途、保密与可以拒答部分', { relation: 3, mind: 2 }, '1924 年按居民同意范围完成调查。', '一项私人关系未记录，必要日期仍取得；拒答没有被写成隐瞒。')],
    [1926, '街巷清洁问题由谁实际处理', '污水、垃圾、市场残物与井口各有使用人和管理人，发一张布告不会自己完成清运。',
      opt('responsibility-map', '逐段标地点、责任人、期限与复查日', { craft: 3, network: 3 }, '1926 年建立一段街巷卫生责任图。', '两处按期清理，一处因无运力延期；结果逐点更新。'),
      opt('resident-meeting', '请住户、摊主和清运者分别说明成本与困难', { relation: 3, network: 2 }, '1926 年召开具名街巷卫生协商。', '形成清运时段，也保留摊主对收费的异议；协商不是一致赞成。'),
      opt('limited-fix', '先处理最接近饮水点的一处并记录未处理范围', { mind: 3, money: -1 }, '1926 年优先处理一处饮水周边卫生问题。', '井口周边改善，远处污水仍在；一次工程没有冒充全街完成。')],
    [1928, '预防服务怎样取得同意并留下后账', '居民对效果、费用、身体反应和身份登记都有疑问；公共利益不能取消个人答复。',
      opt('explain-consent', '逐人说明已知、未知、可拒绝和复查处', { relation: 3, knowledge: 2 }, '1928 年以说明和同意开展一批预防服务。', '大部分人参加，三人暂缓；参加与拒绝分别留下复查入口。'),
      opt('priority-list', '按公开条件先接高暴露人群并公布更新日', { mind: 3, fame: 1 }, '1928 年建立预防服务优先名单。', '名额不足引发质疑，条件经公开说明后增加一类特殊情况复核。'),
      opt('record-batch', '先核来源、批次、保存、经手人与反应记录', { craft: 4, health: -1 }, '1928 年建立一批预防服务记录。', '一批保存状态不明而停用，没有为了数量继续；损失与责任入账。')],
    [1930, '疑似病例该怎样报告', '太慢可能扩大风险，太快公开姓名也会伤害本人；疑似、确认和排除必须分开。',
      opt('coded-report', '先以编号报告必要信息，身份限具名经手人', { mind: 4, relation: 2 }, '1930 年提交一份限范围的疑似病例报告。', '上级要求补一项时间和样本信息，姓名没有出现在公开布告。'),
      opt('rapid-review', '请两名具名人员在限定时间内复核', { network: 3, health: -1 }, '1930 年启动疑似病例限时复核。', '病例次日被排除，接触名单随之关闭；居民得到更正。'),
      opt('support-first', '先安排本人可接受的检查、住处与家庭联络', { relation: 3, money: -1 }, '1930 年先接住疑似者的检查与生活安排。', '本人完成复核，家中口粮有三日补助；公共措施的生活代价没有消失。')],
    [1932, '饮水问题证据还不完整时怎样处理', '多户腹泻与一处水井时间相近，但天气、食物和其他水源也可能相关。',
      opt('sample-compare', '比较不同水点、时间和住户，不先定罪', { knowledge: 4, health: -1 }, '1932 年完成多水点比较调查。', '问题集中于一段供水，但病因仍需检验；临时措施与结论分开。'),
      opt('temporary-notice', '发布有限期提醒并写明证据和更新日', { mind: 3, fame: 1, money: -1 }, '1932 年发布有期限的饮水提醒。', '居民多付出取水路程，两日后更新范围；提醒没有变成永久恐慌。'),
      opt('repair-audit', '核井口、排水、维护人和最近修缮记录', { craft: 3, network: 2 }, '1932 年完成饮水设施责任核查。', '找到一处破损和无人负责的交界，修缮后继续观察而非宣布结束。')],
    [1934, '妇幼卫生服务怎样避免替人作主', '产妇、母亲、婴儿与家属的需要并不相同，女性卫生也不能只被写成生育责任。',
      opt('woman-first', '先问女性本人要什么、拒绝什么和谁可在场', { relation: 4, mind: 2 }, '1934 年按女性本人选择安排卫生服务。', '本人接受复查但拒绝家属旁听；服务继续，拒绝权保留。'),
      opt('separate-records', '把本人健康、婴儿照护和家庭支持分开登记', { knowledge: 3, craft: 2 }, '1934 年分开建立妇女与婴儿照护记录。', '一项家庭困难转给救济，一项本人症状转诊；角色没有被合成“母婴”。'),
      opt('home-visit-limit', '核访问时间、人员、费用和退出方式', { network: 2, relation: 3 }, '1934 年建立有边界的家庭卫生访问。', '两户续访、一户拒绝；拒绝家庭没有被标记为不合作。')],
    [1936, '救济名单出现重名、缺址和未领取', '物资有限，登记错误可能让人失去口粮或药品；“发完了”不能代替逐项结果。',
      opt('identity-check', '按家庭、住址、同住者和申请日拆开重名', { craft: 3, mind: 3 }, '1936 年拆分救济名单中的重名记录。', '一人已领取、一人仍等待，第三条属于旧地址；状态得到更正。'),
      opt('unclaimed-followup', '逐户核未领原因、代领权限和保存期限', { relation: 3, health: -1 }, '1936 年追查一批未领取救济。', '两户迁走、一户病倒并委托代领；物资去向各有凭据。'),
      opt('appeal-date', '给未获批者具体理由、补件与复核日', { mind: 3, fame: -1 }, '1936 年建立救济复核答复。', '一户补件后获批，一户仍不符合范围；拒绝不再是没有下文。')],
    [1938, '大量迁入者怎样接住卫生与救济', '住处、饮水、登记、传染病风险、工作和家书一起压来，迁入身份不能被写成一种疾病。',
      opt('arrival-stations', '分设住址、卫生、救济与寻亲四个公开台账', { network: 4, mind: 2 }, '1938 年拆分迁入人口的公共服务台账。', '一人找到亲属、两户转去新住处，卫生记录没有向雇主公开。'),
      opt('water-shelter', '先核临时住处、饮水与厕所，再逐步登记', { craft: 3, relation: 2, money: -2 }, '1938 年优先处理临时住处卫生条件。', '两处水点得到明确管理人，登记仍排队；基础设施没有解决工作和家信。'),
      opt('mobile-team', '以有期限小组巡回调查并每日交接', { health: -2, network: 3, knowledge: 2 }, '1938 年参加迁入地区流动卫生小组。', '小组完成三处调查并转介病人，人员轮休后才继续下一段。')],
    [1940, '疫情消息和传言同时扩大', '有人说市场里人人都会染病，也有人说只是机构骗钱；恐惧有现实来源，不能只贴愚昧标签。',
      opt('known-unknown', '公开已确认、待核、排除和更新时间', { mind: 4, fame: 2 }, '1940 年发布分层疫情说明。', '一条夸大传言下降，另一个问题仍无答案；第二版如期更新。'),
      opt('community-questions', '收集居民问题并请具名专业人员逐项答复', { relation: 3, network: 3 }, '1940 年建立公开卫生问答。', '费用、隔离住处和家人通信成为前三项问题，说明据此修改。'),
      opt('correct-harm', '联系被错误点名的摊主并公开更正', { relation: 4, fame: -1, money: -1 }, '1940 年更正一条伤及具体摊主的传言。', '摊主仍损失两周生意，机构记录补偿申请；更正没有抹掉损害。')],
    [1942, '外勤人员暴露后怎样处理', '你与同事接触过一名后来需复核的人；继续工作、停工、收入和家人安全彼此冲突。',
      opt('report-rest', '报告暴露、暂停外勤并由具名同事接班', { health: 3, money: -2, mind: 2 }, '1942 年报告一次职业暴露并暂停外勤。', '复查后按条件返岗，少领一段补贴；代班同事也获得轮休。'),
      opt('split-duties', '转做不接触公众的记录与电话联络', { knowledge: 2, health: 2, network: 1 }, '1942 年因暴露暂转后台工作。', '调查没有中断，接触部分由他人负责；岗位改变有期限。'),
      opt('family-arrangement', '与家人谈清住处、口粮、通信和照料', { relation: 3, money: -1, health: 1 }, '1942 年与家人建立暴露期间生活安排。', '家人决定暂不同住但继续送信；他们没有被自动命令承担风险。')],
    [1945, '战后失联者与救济记录怎样结案', '名单里有人返回、迁走、失联或死亡待确认；机构不能为清账把所有空白写成同一结局。',
      opt('last-known', '保留最后地址、经手人、日期与未知状态', { mind: 4, knowledge: 2 }, '1945 年整理失联者最后已知记录。', '两人后来回信，一人仍未知；系统没有提前补写死亡。'),
      opt('family-confirm', '只在具名家属或文件确认后更新死亡', { relation: 3, mind: 2 }, '1945 年按证据更新救济对象生死状态。', '一项死亡得到确认，一项只是传闻继续待核。'),
      opt('transfer-open-cases', '将未结事项逐项移交新经手人', { network: 3, craft: 2 }, '1945 年移交未结救济与卫生事项。', '接收人签下范围和下次复核日，旧机构关门没有抹掉等待者。')],
    [1948, '下一阶段公共卫生工作怎样承接', '制度与地区即将变化，过去的调查、卫生、预防与救济经验需要重新核岗位、权限和居民关系。',
      opt('surveillance', '继续病例报告、调查与公开更新', { knowledge: 3, mind: 3 }, '1948 年选择继续疾病调查与报告。', '新岗位说明报告范围、隐私、复核人和工资，不自动拥有强制权。'),
      opt('community-health', '转向饮水、环境、妇幼与健康说明', { relation: 3, network: 2 }, '1948 年选择社区卫生与健康说明。', '具体街区、服务时段和转诊处得到确认，宣传不代替实际服务。'),
      opt('relief-coordination', '转向医疗、口粮、住处与寻亲救济协调', { mind: 3, relation: 2, money: -1 }, '1948 年选择卫生救济协调。', '资格、物资、领取、申诉和失联分别建账，救济不会变成身份标签。')]
  ];

  installDomainDecisions('D27', 'clinical', ROUTE_CLINICAL, clinical);
  installDomainDecisions('D28', 'hospital', ROUTE_HOSPITAL, hospital);
  installDomainDecisions('D29', 'publicHealth', ROUTE_PUBLIC_HEALTH, publicHealth);

  function scene(field, id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['sichuanmedicine'], priority: 20,
      sourceIds: sourceIds[field].slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }

  [
    ['d27-s01', '医学训练有期限与复核人', '课程、跟诊、病历、考核和资格逐项记录；在药铺长大、照料过亲人或认识医生都不等于能独立接诊。'],
    ['d27-s02', '一个门诊日不是一句看病', '预约、同意、病史、检查、判断、解释、费用、取药、复诊和转介分别有经手人。'],
    ['d27-s03', '病人可以拒绝示教与检查', '拒绝一项不等于拒绝全部照料；女性与男性都能提出在场人员、隐私和家属知情范围。'],
    ['d27-s04', '不知道与转诊是专业结果', '症状不典型、证据冲突或超出资格时，观察、复核和转诊比给一个体面病名更写实。'],
    ['d27-s05', '女医护与男医护共享专业标准', '女性更常面对住宿、夜班、婚家和病人性别门槛，男性更常被默认远路与连续值班；差异不修改能力。'],
    ['d27-s06', '疗效需要下一次确认', '开出安排不是治好；病人可以改善、无变化、加重、未取药、另求医或失联。'],
    ['d27-s07', '费用不能从病历里消失', '检查、药品、床位、路费、误工和救济分别记录，贫穷不把病人变成只有感恩的角色。'],
    ['d27-s08', '医疗错误会留下不能撤回的影响', '迟延、漏记和错误判断要联系病人、补救、复盘并保留原记录，不能用一次道歉清零。'],
    ['d27-s09', '医护人员也会生病和停工', '暴露、发热、眼痛、胃痛、失眠和过劳会引发请假、检查、工资与代班后果。'],
    ['d27-s10', '战争先打断连续照料', '病人、家属、病历、药品、床位和同事分别确认去向，医院迁移不等于所有人安全抵达。'],
    ['d27-s11', '旧病历可以诚实地不完整', '战后以本人陈述、纸据和新检查重建，历史病名、当前判断和未知分别标注。'],
    ['d27-s12', '临床职业有转入与退出', '继续诊疗、转带教、医院辅助、公卫或完全离开都要逐名移交病人并核新岗位。'],
  ].forEach(function (row) { scene('clinical', row[0], row[1], row[2], { routes: [ROUTE_CLINICAL], minAge: 14 }); });

  [
    ['d28-s01', '医院辅助岗位不是泛化帮忙', '检验、药剂、病案、费用、床位、库房与设备各有技能、工资、负责人和不得越过的权限。'],
    ['d28-s02', '样本从人到结果有完整链条', '申请、同意、采集、标签、运输、接收、检验、复核、发出和解释不能省略身份核对。'],
    ['d28-s03', '药剂岗位不替诊疗者改方', '字样冲突、缺货与替代要退回有资格者确认，批次、保存、配发和退药另有记录。'],
    ['d28-s04', '病案是劳动也是隐私', '统一编号、病历书写、重名、缺页、更正、借阅、归还和死亡确认都留下经手痕迹。'],
    ['d28-s05', '检验结果不自动等于诊断', '技术人员说明样本、方法、范围和限制，诊疗者结合病史解释，病人得到复诊去向。'],
    ['d28-s06', '女职员与男职员不只做性别化岗位', '女性常先被放在病案和窗口，男性常先搬运与夜班；双方都能做检验、药剂、管理和技术复核。'],
    ['d28-s07', '费用、床位和救济是三本账', '押金、欠费、救济、空床、出院与死亡不能为方便混成一个状态。'],
    ['d28-s08', '单位物资不能变成个人资产', '药品、试剂、设备、捐赠、借用、损耗与报废分别登记，管理不等于拥有。'],
    ['d28-s09', '错号必须追到病人后果', '撤回纸面只是第一步，还要核谁看过、是否采取行动、怎样解释和哪些影响不可撤回。'],
    ['d28-s10', '交班允许普通人结束一天', '未出结果、缺药、欠费、设备故障和病人请求交给具名下一人，不靠无限加班维持系统。'],
    ['d28-s11', '复院先核人、物、债和服务范围', '旧门牌、病案和设备不能自动恢复工资、岗位、药品和病人信任。'],
    ['d28-s12', '辅助职业也有明确上升与转行', '技术复核、药剂、病案管理、事务协调、临床、公卫和离院各有资格与交接。'],
  ].forEach(function (row) { scene('hospital', row[0], row[1], row[2], { routes: [ROUTE_HOSPITAL], minAge: 14 }); });

  [
    ['d29-s01', '公共卫生从具体住址和日期开始', '同住者、发病日期、饮水、工作、旅行和接触分别核来源，不把社区写成一个风险数字。'],
    ['d29-s02', '疑似、确认、排除和未知必须分开', '及时报告与保护姓名可以同时存在，统计不能替个体做诊断。'],
    ['d29-s03', '一张布告不会自己清理街道', '水井、排污、垃圾、市场与清运需要地点、负责人、费用、期限和复查结果。'],
    ['d29-s04', '居民的怀疑有具体生活来源', '费用、强制、住处、误工、身体反应和过去受骗经验需要逐项答复，怀疑不自动变成敌对。'],
    ['d29-s05', '女性不是只作为母亲进入公卫', '女性本人健康、职业暴露、夜路、经期、孕产和照料压力按本人需求处理；男性也承担家庭照料与健康选择。'],
    ['d29-s06', '预防服务需要同意和后账', '对象、批次、保存、经手、拒绝、身体反应与复查各有记录；游戏不提供现实操作参数。'],
    ['d29-s07', '救济不是领取一瞬间', '申请、资格、数量、领取、代领、未领、申诉、结束和失联分别给答复。'],
    ['d29-s08', '迁入人口不是疾病标签', '住处、饮水、工作、卫生、家书、救济和隐私各有公共服务入口。'],
    ['d29-s09', '传言更正不能抹掉已经发生的损失', '被错误点名的人、摊位和家庭获得说明、联系与补救记录，信任不被强行恢复。'],
    ['d29-s10', '外勤人员有身体和家庭', '暴露、轮休、工资、住处、通信与家人选择进入人生账，公共服务不是无限牺牲。'],
    ['d29-s11', '失联不能为结案补写成死亡', '只保存最后地址、日期、经手人和已知状态，后续确认才改变事实。'],
    ['d29-s12', '公共服务与政治身份分开', '调查、救济、卫生说明和机构任职不自动生成党籍、卧底、叛徒或秘密权限。'],
  ].forEach(function (row) { scene('publicHealth', row[0], row[1], row[2], { routes: [ROUTE_PUBLIC_HEALTH], minAge: 14 }); });

  C.annualRhythms[ROUTE_CLINICAL] = [
    '每名病人都有同意、病史、检查、判断、费用、复诊与转介，不是一句“看了很多病人”。',
    '不知道、复核、观察、拒绝与转诊都是实际工作结果；声望不能把未知改成确定。',
    '病人、同事、家人与自己都有身体、钱、时间和拒绝权，医疗不是主角单方面施救。',
  ];
  C.annualRhythms[ROUTE_HOSPITAL] = [
    '样本、处方、药品、病案、床位、费用与设备按编号和经手人流动，辅助劳动具体可追查。',
    '一处错号、缺药或缺页会在下一年形成病人、同事、工资与流程后果。',
    '检验、药剂、病案和行政各有上升与转行，不会永远停在“医院帮工”。',
  ];
  C.annualRhythms[ROUTE_PUBLIC_HEALTH] = [
    '一段公共卫生工作落在具体住址、水点、名单、报告、物资和下一次复查上。',
    '居民可以同意、拒绝、质疑、搬走或失联；机构不能把所有人写成服从数字。',
    '时代变化先改变疾病负担、人口流动、物资、岗位与公开信息，不自动改变个人政治身份。',
  ];

  C.sceneFrames[ROUTE_CLINICAL] = [
    { open: '门诊开门前，预约、旧病历、待复核检查、药品短缺、夜班交接和自己的睡眠一起摆上桌。', close: '今天只完成有限问诊与答复；病人决定、费用、未知和下一次复查分别留下。' },
    { open: '病房里没有“一个病例”，只有有名字、有家人、有支付能力和拒绝权的人。', close: '诊疗经验增加，不自动换成资格、疗效、声望或正确答案。' },
  ];
  C.sceneFrames[ROUTE_HOSPITAL] = [
    { open: '样本窗、药剂架、病案柜、床位表、费用账和设备故障在同一班次里互相牵动。', close: '编号、经手、复核、错误和未结项交给下一人；单位物资仍不是你的所有物。' },
    { open: '病人只看见一个窗口，窗口背后却是检验、药剂、病案、护理、诊疗和事务的多次交接。', close: '今天没有靠泛化“忙碌”过关，每项结果都能追到人和下一步。' },
  ];
  C.sceneFrames[ROUTE_PUBLIC_HEALTH] = [
    { open: '外勤簿上有住址、发病日期、水点、救济申请、未领物资、居民疑问和同事暴露记录。', close: '本日只确认一部分范围；公开信息、个人隐私、资源与未知分别更新。' },
    { open: '时代的大词落到一条街、一口井、一张名单和一个需要回信的人身上。', close: '公共职责完成一段，不生成群众拥护、政治身份或永远正确的结论。' },
  ];

  var bases = {};
  bases[ROUTE_CLINICAL] = {
    kind: 'clinical-medicine-training-and-practice', role: '医学训练、门诊、病房、复诊与转介工作者',
    workplace: '成都近郊合成医学训练所、门诊、病房与转诊机构', employer: '合成医院、诊所与有记录的教学岗位',
    supervisor: '按课程、资格、病历和诊疗结果负责的陆静和', colleague: '有自己工资、身体和去留的护理员何婉清', publicPerson: '决定同意、隐私、费用与复诊的病人周素英',
    terms: '按学期与岗位核课程、考核、资格、问诊、检查、病历、费用、错误、转诊、工资、请假、移交与退出',
    duties: '在资格和监督范围内问诊、检查、记录、解释未知、安排复诊与转介，不提供超出能力的确定答案',
    scenes: ['陆静和退回一份把推测写成事实的病历。', '何婉清补上夜间病情变化。', '周素英要求限制家属可见内容。'],
  };
  bases[ROUTE_HOSPITAL] = {
    kind: 'medical-technical-pharmacy-records-administration', role: '检验、药剂、病案与医院行政技术人员',
    workplace: '成都近郊合成医院样本台、药剂室、病案室与事务台', employer: '合成医院与分岗位领薪的医疗辅助系统',
    supervisor: '按样本、药剂、病案、权限和错误负责的秦明贞', colleague: '有自己技术贡献、工资和去留的药剂员高瑞芳', publicPerson: '等待结果、费用和隐私答复的病人叶秋生',
    terms: '按岗位核样本、处方、药品、病案、床位、费用、物资、错误、隐私、工钱、交班、升转与离院',
    duties: '核编号和经手链，完成技术复核、药剂准备、病案管理或医院事务，不越权下诊断、改处方或公开私人记录',
    scenes: ['秦明贞拒收一份错号样本。', '高瑞芳退回字样冲突的处方。', '叶秋生要求解释一笔重复费用。'],
  };
  bases[ROUTE_PUBLIC_HEALTH] = {
    kind: 'public-health-survey-relief', role: '防疫调查、社区卫生、预防服务与救济登记人员',
    workplace: '成都近郊合成卫生事务所、街巷、水点、临时住处与救济登记点', employer: '合成公共卫生机构与有期限的社区服务项目',
    supervisor: '按报告、范围、隐私和外勤安全负责的郭成义', colleague: '有自己家庭、身体、工资和去留的调查员蒋宜生', publicPerson: '决定答询、服务、救济和隐私范围的居民何秀兰',
    terms: '按项目与月核调查、报告、卫生设施、预防记录、公开说明、救济、物资、申诉、暴露、轮休、移交与退出',
    duties: '核住址、日期、环境与服务结果，区分疑似确认和未知，公开必要信息并保护个体隐私，不把社区身份写成风险标签',
    scenes: ['郭成义要求把疑似与确认分开。', '蒋宜生因暴露安排轮休。', '何秀兰追问一笔未领取救济的下落。'],
  };

  C.routeCareerProfilesByGender[ROUTE_CLINICAL] = {
    男: Object.assign({}, bases[ROUTE_CLINICAL], { role: '医学训练、外诊、门诊与病房诊疗工作者', duties: '较常被要求远路、夜班和尽快独立，也须逐项核资格、病人同意、诊疗未知、家务和身体，不自动成为名医' }),
    女: Object.assign({}, bases[ROUTE_CLINICAL], { role: '医学训练、门诊、女性病人服务与医院诊疗工作者', duties: '较常面对住宿、夜路、婚家、同工认可与病人性别门槛，也能做外诊、负责人和教学；限制不作能力扣分' }),
  };
  C.routeCareerProfilesByGender[ROUTE_HOSPITAL] = {
    男: Object.assign({}, bases[ROUTE_HOSPITAL], { role: '检验、药剂、设备物资、病案与医院事务技术员', duties: '较常先被派夜班、搬运和设备事务，也能做检验、药剂、病案与管理；重活不自动获得技术决定权' }),
    女: Object.assign({}, bases[ROUTE_HOSPITAL], { role: '检验、药剂、病案、费用与医院事务技术员', duties: '较常先被放在窗口和病案岗位，也能做检验、药剂、负责人和技术复核；全部劳动计薪，婚家不自动终止岗位' }),
  };
  C.routeCareerProfilesByGender[ROUTE_PUBLIC_HEALTH] = {
    男: Object.assign({}, bases[ROUTE_PUBLIC_HEALTH], { role: '外勤调查、环境卫生、公开说明与救济协调员', duties: '较常被派远路、夜间和高暴露外勤，也要核同意、隐私、居民质疑、家庭和轮休，不自动取得强制权' }),
    女: Object.assign({}, bases[ROUTE_PUBLIC_HEALTH], { role: '社区调查、妇女健康、环境卫生与救济协调员', duties: '较常先承担妇幼与登记，也能领导外勤、调查与公开说明；女性身份不等于免费照料或天然更会沟通' }),
  };

  Object.assign(C.routeContactProfiles, {
    'sichuan-clinical-medicine': [
      { id: 'd27_lu_jinghe', label: '陆静和', role: '按课程、资格、病历、诊疗与错误复盘负责的带教医师', status: 'supervisor', relation: 24, born: 1882 },
      { id: 'd27_he_wanqing', label: '何婉清', role: '有自己工资、护理记录、身体、家人与去留的护理同事', status: 'coworker', relation: 31, born: 1901 },
      { id: 'd27_chen_boming', label: '陈伯明', role: '按具体病例范围参加复核、会诊与转诊的医师', status: 'colleague', relation: 22, born: 1888 },
      { id: 'd27_zhou_suying', label: '周素英', role: '决定同意、隐私、费用、复诊和是否更换诊疗者的病人', status: 'nearby', relation: 25, born: 1896 },
      { id: 'd27_fang_jiren', label: '方济仁', role: '只对收到的转诊材料、能否接诊与回函范围负责的外院联络人', status: 'distant', relation: 19, born: 1885 },
      { id: 'd27_tang_yuchun', label: '唐玉春', role: '有自己课程、夜班、工资、婚家与改行决定的同届医学生', status: 'coworker', relation: 29, born: 1907 },
    ],
    'sichuan-hospital-services': [
      { id: 'd28_qin_mingzhen', label: '秦明贞', role: '按样本、检验、错号、复核与发出权限负责的技术主管', status: 'supervisor', relation: 24, born: 1887 },
      { id: 'd28_gao_ruifang', label: '高瑞芳', role: '有自己药剂贡献、工资、身体、家人与去留的同事', status: 'coworker', relation: 31, born: 1902 },
      { id: 'd28_song_wenxiu', label: '宋文秀', role: '核统一编号、重名、缺页、更正、借阅与病案隐私的管理员', status: 'colleague', relation: 27, born: 1891 },
      { id: 'd28_ye_qiusheng', label: '叶秋生', role: '等待样本、结果、费用、病案与申诉答复的病人', status: 'nearby', relation: 23, born: 1898 },
      { id: 'd28_luo_shuzhen', label: '罗淑贞', role: '有自己班次、工资、照料责任和拒绝无限代班权的事务同事', status: 'coworker', relation: 28, born: 1904 },
      { id: 'd28_wu_shouyi', label: '吴守义', role: '按库存、借用、设备、损耗和维修范围给答复的库房管理员', status: 'colleague', relation: 21, born: 1889 },
    ],
    'sichuan-public-health': [
      { id: 'd29_guo_chengyi', label: '郭成义', role: '按调查范围、报告、居民隐私、物资和外勤安全负责的卫生事务负责人', status: 'supervisor', relation: 24, born: 1884 },
      { id: 'd29_jiang_yisheng', label: '蒋宜生', role: '有自己调查记录、身体暴露、工资、家庭与去留的外勤同事', status: 'coworker', relation: 31, born: 1903 },
      { id: 'd29_he_xiulan', label: '何秀兰', role: '决定答询、预防服务、救济申请、申诉与隐私范围的居民', status: 'nearby', relation: 25, born: 1899 },
      { id: 'd29_wang_shouquan', label: '王守泉', role: '对一段街巷的清运、井口与市场维护条件给具体答复的人', status: 'nearby', relation: 22, born: 1889 },
      { id: 'd29_liu_yunzhi', label: '刘云枝', role: '收集居民疑问、更正传言并保留本人立场的社区联络人', status: 'colleague', relation: 27, born: 1901 },
      { id: 'd29_shen_muhua', label: '沈暮华', role: '只对一批预防服务记录、批次、保存和复查负责的医护人员', status: 'distant', relation: 20, born: 1892 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'sichuan-clinical-medicine': ['连续门诊、病房、夜班、久站与书写造成的腰腿肩颈、眼痛、手腕劳损和睡眠紊乱', '接触伤病者、通风与防护不足、饮食不定造成的发热、咳嗽、胃肠不适与职业暴露', '诊疗未知、错误、病人加重、欠费与家门冲突造成的失眠、内疚和焦虑'],
    'sichuan-hospital-services': ['显微观察、细小标签、久站、搬物与重复书写造成的眼痛、腰背、肩颈和手腕劳损', '样本、药物粉尘、试剂、病区和通风不足造成的咳嗽、皮肤不适、发热与职业暴露', '错号、短缺、欠费、夜班、隐私冲突和交班压力造成的失眠与焦虑'],
    'sichuan-public-health': ['长途步行、外勤、搬运物资、久站登记和恶劣天气造成的腿脚、腰背和睡眠问题', '疫区、拥挤住处、饮水环境与防护不足造成的发热、咳嗽、胃肠不适与职业暴露', '居民恐惧、物资不足、失联、强制争议和家庭风险造成的失眠、警觉与内疚'],
  });

  Object.assign(C.publicRouteProfiles, {
    'sichuan-clinical-medicine': { publicGroup: '合成的公开门诊、复诊、转诊与医疗费用事务簿', publicRole: '核公开服务范围、资格、复诊、转诊、费用、投诉与错误改进', covertRole: '医师、病案和病人关系不自动生成党籍、秘密组织、卧底或情报资格', infiltrationRole: '不以病历、药品、夜班、救护或转诊提供现实隐蔽与伤害教程，公共医疗与高风险事务分开', contact: { id: 'public_d27', label: '顾怀安', role: '登记公开门诊、转诊、费用与申诉答复的经手人', status: 'colleague', relation: 20, born: 1890 } },
    'sichuan-hospital-services': { publicGroup: '合成的公开医院病案、费用、物资与服务事务簿', publicRole: '核公开病案申请、费用更正、物资说明、服务范围与错误申诉', covertRole: '医院岗位、药剂、样本和档案权限不自动生成党籍、卧底、叛徒或秘密权力', infiltrationRole: '不以药品、样本、病案、库房或设备提供现实滥用教程；技术权限与政治身份严格分开', contact: { id: 'public_d28', label: '许兰心', role: '登记公开病案、费用、服务与申诉答复的经手人', status: 'colleague', relation: 20, born: 1893 } },
    'sichuan-public-health': { publicGroup: '合成的公开卫生说明、调查同意、救济与申诉事务簿', publicRole: '核公开卫生变化、调查范围、居民问题、服务、救济和错误更正', covertRole: '防疫、公卫、救济与居民名单不自动生成党籍、秘密组织、卧底、叛徒或强制资格', infiltrationRole: '不以调查、隔离、名单、物资、住址或流动服务提供现实跟踪、隐蔽或伤害教程；公开服务只保留可问责流程', contact: { id: 'public_d29', label: '邓宜秋', role: '登记公开卫生说明、居民问题、救济与申诉答复的经手人', status: 'colleague', relation: 20, born: 1891 } },
  });

  C.post1949RouteJobs = C.post1949RouteJobs || {};
  var destinationPlaces = {
    mainland: ['当地合成医院与社区门诊', '当地合成医院检验药剂病案科', '当地合成卫生防疫与社区服务站'],
    'hong-kong': ['香港一间合成街坊医院与门诊', '香港一间合成医院医技与病案科', '香港一处合成街坊卫生与救济服务点'],
    taiwan: ['台湾一间合成城镇医院与门诊', '台湾一间合成医院检验药剂病案科', '台湾一处合成卫生与社区服务机构'],
    overseas: ['落脚城市一间合成社区医院', '落脚城市一间合成医院医技与药剂部门', '落脚城市一处合成社区卫生与救济机构'],
    'in-motion': ['当前落脚地的合成临时诊疗与转介点', '当前落脚地的合成临时药剂病案点', '当前落脚地的合成流动卫生与救济点'],
    unsettled: ['暂住地一间合成诊所与转诊点', '暂住地一间合成医院辅助服务点', '暂住地一处合成卫生与救济登记点'],
    macau: ['澳门一间合成医院与街坊门诊', '澳门一间合成医院医技药剂病案科', '澳门一处合成街坊卫生与救济服务点'],
    'southeast-asia': ['新加坡一间合成华人社区医院与门诊', '新加坡一间合成医院医技与药剂部门', '新加坡一处合成社区卫生与救济机构'],
  };
  var destinationPeople = {
    mainland: [
      ['诊疗负责人韩静川', '护理员周雪芹', '复诊病人罗惠生'], ['检验主管罗佩真', '药剂员方静宜', '窗口病人贺兰生'], ['卫生事务负责人周明远', '调查员杜素文', '申请居民韩玉真'],
    ],
    'hong-kong': [
      ['门诊负责人梁杏华', '护理员何婉贞', '复诊病人陈启华'], ['医技主管何瑞安', '药剂员郭佩云', '窗口病人冯美仪'], ['街坊卫生主任陈少瑜', '调查员许德安', '申请居民梁慧兰'],
    ],
    taiwan: [
      ['门诊负责人林景和', '护理员张素真', '复诊病人吴明洁'], ['医技主管叶淑真', '药剂员邱志远', '窗口病人高文庆'], ['卫生事务员邱惠明', '调查员林静娟', '申请居民叶玉安'],
    ],
    overseas: [
      ['诊疗负责人许安福', '护理员黄玉莲', '复诊病人赵仁和'], ['医技主管黄玉莲', '药剂员林惠珠', '窗口病人陈文德'], ['社区卫生员郑仁和', '调查员许慧兰', '申请居民黄静安'],
    ],
    'in-motion': [
      ['临时诊疗经手人孟玉真', '护理员姜素华', '复诊病人秦良生'], ['临时医技经手人姜家和', '药剂员宋玉真', '窗口病人周平安'], ['流动卫生经手人秦平安', '调查员徐家和', '申请居民孟静宜'],
    ],
    unsettled: [
      ['诊所负责人潘雅琴', '护理员陆维清', '复诊病人沈瑞生'], ['医技负责人陆维清', '药剂员叶曼云', '窗口病人冯守义'], ['卫生登记员冯守义', '调查员唐静修', '申请居民潘玉莲'],
    ],
    macau: [
      ['门诊负责人何慧贞', '护理员郑景鸿', '复诊病人梁婉仪'], ['医技主管麦景鸿', '药剂员何瑞莲', '窗口病人陈庆安'], ['街坊卫生员梁婉仪', '调查员李卓文', '申请居民麦慧真'],
    ],
    'southeast-asia': [
      ['门诊负责人陈秀琴', '护理员林美珠', '复诊病人郑惠兰'], ['医技主管林文成', '药剂员郭秀琴', '窗口病人林德义'], ['社区卫生员郭德义', '调查员黄惠珠', '申请居民陈国安'],
    ],
  };
  [ROUTE_CLINICAL, ROUTE_HOSPITAL, ROUTE_PUBLIC_HEALTH].forEach(function (route, index) {
    C.post1949RouteJobs[route] = {};
    Object.keys(destinationPlaces).forEach(function (destination) {
      var roles = index === 0
        ? ['门诊与转诊医师', '临时诊疗与病历复核员', '问诊、检查、病历、复诊、转诊、费用与病人同意', '诊疗复核与新人带教医师', '减少夜班和远路，复核病历、转诊和错误改进']
        : index === 1
          ? ['检验、药剂与病案技术员', '临时样本药剂病案员', '样本、处方、药品、病案、费用、物资、错误与隐私', '医技病案复核与新人带教员', '减少搬运与夜班，复核样本、药剂、病案和错误记录']
          : ['公共卫生调查与救济协调员', '临时卫生调查与救济登记员', '住址、病例报告、环境卫生、预防记录、公开说明、救济与申诉', '公卫记录复核与新人带教员', '减少高暴露外勤，复核调查、公开说明、救济和未结事项'];
      var people = destinationPeople[destination][index];
      C.post1949RouteJobs[route][destination] = {
        track: 'care', role: roles[0], casualRole: roles[1], workplace: destinationPlaces[destination][index], duties: roles[2],
        terms: '先核资格、语言或登记条件并按一月试做；留用后按月领薪，住处、夜班、职业权限和公共身份分别办理',
        lighterRole: roles[3], lighterDuties: roles[4], supervisor: people[0],
        supervisorRole: '按具体资格、职责、工钱、错误与是否留用给答复的人',
        colleague: people[1],
        colleagueRole: '有自己的工资、身体、家庭、专业判断和去留决定的同事',
        publicPerson: people[2],
        publicRole: index === 0 ? '决定同意、隐私、费用、复诊和转诊的人' : index === 1 ? '等待结果、药品、病案、费用与申诉答复的人' : '决定答询、调查同意、服务、救济与隐私范围的人',
      };
    });
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('care', ROUTE_CLINICAL);
  addRouteToTrack('care', ROUTE_HOSPITAL);
  addRouteToTrack('care', ROUTE_PUBLIC_HEALTH);

  C.events.push(
    { id: 'd29-plague-1910', year: 1910, eraBrief: true, eraScope: '东北鼠疫与近代公共卫生体系形成', families: ['sichuanmedicine'], title: '东北鼠疫推动调查、隔离、交通与公开防疫进入全国视野', knownThrough: ['newspaper', 'books'], delta: { knowledge: 1, mind: -1 }, knownText: '家里从报刊与医药同行消息知道东北出现严重鼠疫，调查、隔离、交通管制和跨机构协作被反复讨论；远方疫情不会自动写成唐家患病。', unknownText: '药铺只听说北方有严重时疫和查验措施，具体病种、范围和个人消息仍无法确认。', fact: '1910—1911 年东北肺鼠疫及其防治成为中国近代公共卫生与防疫体系的重要转折。', historySource: { label: '国家档案局：伍连德与哈尔滨防治鼠疫、霍乱档案文献', url: 'https://www.saac.gov.cn/mowcn/cn/6sbs/202512/e293b373c6604aa2b45ce1f33d62875c.shtml' } },
    { id: 'd27-hospital-systems-1921', year: 1921, eraBrief: true, eraScope: '近代医院门诊、病房、病案与药剂分工', routes: ALL_ROUTES, title: '大型医院逐步建立门诊、病房、病案和药剂的专门分工', knownThrough: ['books', 'newspaper'], delta: { knowledge: 1, craft: 1 }, knownText: '你从医学材料知道一些医院已经把门诊、急诊、病房、病案和药剂分成不同职责；这不是所有地区同时拥有的条件。', unknownText: '本地同行先听说外地医院有更细的分科与记录，具体课程、资格和岗位仍需亲自核实。', fact: '1921 年北京协和医院逐步开放门诊与病房，并建立病案室等专门部门。', historySource: { label: '北京协和医院：百年院史与病案科史', url: 'https://www.pumch.cn/detail/28830.html' } },
    { id: 'd29-chabei-plague-1949', year: 1949, eraBrief: true, eraScope: '察北鼠疫与跨区域防疫', routes: ALL_ROUTES, title: '察北鼠疫促成紧急调查、交通与跨区域防疫协作', knownThrough: ['newspaper', 'letters'], delta: { knowledge: 1, mind: -1, position: -1 }, knownText: '你从公开消息知道察北出现鼠疫并组织跨区域防疫；对你而言，首先变化的是报告、物资、转介和培训，而不是自动获得全国现场经历。', unknownText: '本地只收到加强报告与物资核对的通知，远方病例、范围和个人命运仍不能凭传闻补全。', fact: '1949 年察北鼠疫发生后，多地力量参与紧急防疫并最终控制传播。', historySource: { label: '国家卫生健康委员会：我国病媒传播疾病防治历史背景', url: 'https://www.nhc.gov.cn/jnr/sjwsrzsxx/201403/66ebc5d40d35472abdd68f2f5fc9dec2.shtml' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
