// 民国人生 · D42／D47／D48 高风险身份、金融经营与澳门旅业娱乐专营完整领域包 v0.7.22
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before domain-expansion-identity-finance-concession.js');

  C.version = '0.7.22';

  var ROUTE_IDENTITY = 'high-risk-double-identity';
  var ROUTE_FINANCE = 'banking-investment-insurance-owner';
  var ROUTE_CONCESSION = 'macao-tourism-entertainment-concession';

  Object.assign(C.legacyRouteDomainMap, {
    'high-risk-double-identity': 'D42',
    'banking-investment-insurance-owner': 'D47',
    'macao-tourism-entertainment-concession': 'D48',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-D42-SH-SECURITY-ARCHIVES': {
      label: '上海市档案馆：民国时期上海军事警务司法档案指南',
      url: 'https://www.shda.gov.cn/daly/gczn/202509/t20250919_74646.html',
      supports: ['调查、监视、拘押、审讯和机构记录存在；机构记录、当事人口述、后来确认与未知必须分开'], status: 'source-reviewed-first-round',
    },
    'SRC-D42-SH-HIDDEN-FRONT': {
      label: '上海市档案馆：隐蔽战线史料中的公开职业与个人经历',
      url: 'https://www.shda.gov.cn/daxw/zxsd/202601/t20260122_76433.html',
      supports: ['公开商业、会计与职业身份可能与隐蔽经历重叠；互动角色和关系网必须合成且不冒充真实人物'], status: 'source-reviewed-first-round',
    },
    'SRC-D42-SH-1949-INVESTIGATION': {
      label: '上海市档案馆：1949 年前后上海社会调查档案',
      url: 'https://www.shda.gov.cn/dawh/hsda/202509/t20250919_74954.html',
      supports: ['制度更替时履历、单位、住址、关系和调查材料会被重新核对，不能由单一标签代替事实'], status: 'source-reviewed-first-round',
    },
    'SRC-D42-SH-ARCHIVE-BOUNDARY': {
      label: '上海市档案馆：档案叙事、来源与人物事实边界',
      url: 'https://www.shda.gov.cn/dawh/dacq/202509/t20250919_74739.html',
      supports: ['晚年回收需要标明亲历、传闻、机构记录、后来确认和仍未知部分'], status: 'source-reviewed-first-round',
    },
    'SRC-D47-SH-FINANCE-ARCHIVES': {
      label: '上海市档案馆：馆藏民国时期上海金融及相关行业企业档案指南',
      url: 'https://www.shda.gov.cn/daly/gczn/202509/t20250919_74643.html',
      supports: ['银行、钱庄、信托、保险与证券企业的资本、章程、股东会、董事会、贷款、复业、接管、清理和理赔档案'], status: 'source-reviewed-first-round',
    },
    'SRC-D47-BOC-HISTORY': {
      label: '中国银行：1912—1949 历史沿革梗概',
      url: 'https://www.boc.cn/aboutboc/ab1/200808/t20080814_972_76.htm',
      supports: ['银行职能会随制度变化，从中央银行、国际汇兑、国际贸易专业银行到 1949 后重新承接'], status: 'source-reviewed-first-round',
    },
    'SRC-D47-BOC-RUN-1916': {
      label: '中国银行：1916 年停兑风潮与信用压力',
      url: 'https://www.boc.cn/aboutboc/ab7/200809/t20080926_6929.html',
      supports: ['准备金、挤兑、政府命令、存款人信心与兑现压力会共同改变银行经营'], status: 'source-reviewed-first-round',
    },
    'SRC-D47-HKMA-LICENSING': {
      label: '香港金融管理局：银行监管制度与牌照边界',
      url: 'https://www.hkma.gov.hk/gb_chi/key-functions/banking/banking-regulatory-and-supervisory-regime/',
      supports: ['1949 后香港银行经营需要牌照、风险管理与内部控制；客户存款不等于股东资本'], status: 'source-reviewed-first-round',
    },
    'SRC-D48-DICJ-HISTORY': {
      label: '澳门博彩监察协调局：澳门博彩业历史',
      url: 'https://www.dicj.gov.mo/web/cn/history/index.html',
      supports: ['1937 集中专营、1942 部分活动停办、1961 公开竞投、1962 新公司与娱乐业经营、1970 葡京酒店开业'], status: 'source-reviewed-first-round',
    },
    'SRC-D48-LAW-1496': {
      label: '澳门政府公报：1961 年第1496号立法性法规',
      url: 'https://bo.dsaj.gov.mo/bo/i/61/26/dil1496_cn.asp?mobile=1',
      supports: ['幸运博彩经营须在法定批给、场所、监督与公共利益边界内进行，不能由一般旅业自动生成'], status: 'source-reviewed-first-round',
    },
    'SRC-D48-LAW-TENDER': {
      label: '澳门政府公报：1961 年第1496号立法性法规的原始公报页',
      url: 'https://bo.dsaj.gov.mo/bo/i/61/26/dil1496_cn.asp',
      supports: ['1961 年 7 月 4 日第1496号立法性法规管制幸运博彩设立；与当时的公开竞投及批给背景绑定'], status: 'source-reviewed-first-round',
    },
    'SRC-D48-COURT-CONCESSION': {
      label: '澳门政府公报：终审法院对专营批给制度沿革的说明',
      url: 'https://bo.dsaj.gov.mo/bo/i/2023/10/out01_cn.asp?mobile=1',
      supports: ['1961 制度以公开竞投和专营批给为核心；游戏中的经营权必须有来源、期限、范围和合成角色声明'], status: 'source-reviewed-first-round',
    },
  });

  Object.assign(C.routes, {
    'high-risk-double-identity': {
      name: '高风险联络、双重身份与事实追认', family: 'shanghaigongshang',
      summary: '先有真实公开职业，再因主动选择承担高风险联络；逐年处理任务边界、家人知情、拘留压力、误伤、退出和后来追认，不用“卧底”“英雄”“叛徒”替代事实，也不提供现实隐蔽或伤害教程。',
    },
    'banking-investment-insurance-owner': {
      name: '银行、投资与保险经营治理', family: 'guangdongqiaoxiang',
      summary: '从汇兑和账务经历转入有资本、股东、准备、客户、贷款、保单、理赔、牌照与董事会责任的金融企业；可以成长为重要企业家，也可能遇到挤兑、坏账、接管、合并或清理。',
    },
    'macao-tourism-entertainment-concession': {
      name: '澳门旅业、娱乐与专营竞投经营', family: 'guangdongcoastal',
      summary: '只有实际落脚澳门并长期积累旅店、交通、商贸或金融经验的人，才可能在 1961—1962 公开竞投窗口进入合成新财团；进入后也只是多名主要经营股东之一，继续承担酒店、员工、债务、顾客伤害、监管、社会义务与交接。',
    },
  });

  // D42 只由玩家在 1937 年明确选择高风险工作后转入；公开服务与政治身份不会自动生成。
  var wartimeRole = C.decisions.find(function (item) { return item.id === 'wartime-public-role'; });
  if (wartimeRole) {
    ['wartime-secret-liaison', 'wartime-limited-fact-check'].forEach(function (id) {
      var choice = wartimeRole.options.find(function (item) { return item.id === id; });
      if (choice) choice.route = ROUTE_IDENTITY;
    });
  }

  // D47 从长期侨汇账务进入股本、牌照与客户资金分账；仍可拒绝或继续受薪。
  if (!C.decisions.some(function (item) { return item.id === 'd47-finance-ownership-entry-1946'; })) {
    C.decisions.push({
      id: 'd47-finance-ownership-entry-1946', year: 1946, routes: ['qiaopi-remittance-clerk'], title: '汇兑经验能否转成金融企业经营责任',
      prompt: '战后汇兑、保险经办和实业融资重新出现机会。客户款、股东出资、准备、工资和个人家产必须分账；多年核账经验只能带来入场资格，不能自动变成银行老板。',
      options: [
        { id: 'd47-remain-salaried', label: '继续做受薪汇兑与客户账务，只承担写明的经手权限', delta: { money: 2, knowledge: 2, position: 1 }, echo: 'd47:1946:waged', fact: '1946 年继续做有工资、职责和客户资金边界的汇兑账务。', endingFact: true },
        { id: 'd47-form-share-finance-firm', label: '与三名具名出资人建立有章程的汇兑、保险经办与实业投资公司', route: ROUTE_FINANCE, gate: { money: 28, knowledge: 42, network: 35 }, delta: { money: -12, knowledge: 3, network: 3, position: 2 }, echo: 'd47:1946:ownership', fact: '1946 年以可核出资、章程、股东、客户资金分账与有限许可进入金融企业经营。', endingFact: true,
          enterpriseStart: { id: 'd47-qiaoan-finance', name: '合成侨安汇兑保险与实业投资股份社', domainKey: 'D47', kind: 'licensed-share-finance-insurance-investment-firm', workplace: '广东合成侨乡与港口之间的金融经办处', product: '有客户授权、凭据、准备、保单经办、实业投资决议和申诉记录的金融服务', employees: 6, shareStatus: '主角与三名合成股东按实缴出资、劳动职责、表决和退出条款持股；客户资金不计入任何股东财产', partners: [{ personId: 'contact:d47_lin_suying', role: '有实缴股份、专业判断、工资与独立表决权的保险经理' }, { personId: 'contact:d47_zhou_renhe', role: '只按章程与董事会决议承担信贷复核的股东董事' }], asset: { id: 'd47-ledger-safe-office', kind: 'office-ledgers-safe-and-verified-securities', description: '自有办公用具、账册、保险档案柜与逐项核属的投资凭证，不含客户存款' }, debt: { id: 'd47-opening-capital-credit', creditor: '具名股东与房东', purpose: '办公押金、雇员首月工资与法定准备之外的开业周转' }, license: { id: 'd47-finance-scope', kind: 'documented-finance-insurance-operating-scope', authority: '当时所在地具名金融主管机关（合成记录）', scope: '只在登记范围内办理汇兑、保险经办与经董事会批准的实业投资；不得把客户本金、保费或受托款作股东自用' } } },
        { id: 'd47-decline-ownership', label: '拒绝动用客户款作资本，转一般商号会计或保险文书', delta: { mind: 3, health: 1, position: -1 }, echo: 'd47:1946:decline', fact: '1946 年拒绝以客户款或空白担保进入金融经营，转回受薪会计与保险文书。', endingFact: true },
      ],
    });
  }

  // D48 复用既有 1962 澳门竞投节点，把极稀有选项改为明确的合成历史角色槽。
  var macauTender = C.decisions.find(function (item) { return item.id === 'macau-hospitality-concession-1962'; });
  if (macauTender) {
    macauTender.title = '1961—1962 公开竞投后，是否承担合成新财团的主要经营责任';
    macauTender.prompt = '史实中的公开竞投、新财团中标与专营制度保持不变；互动人物和公司关系全部合成。只有已在澳门落脚、具长期旅店／交通／商贸／金融经验、足够资本信用和治理能力的人，才可能占据合成新财团中的一个主要经营角色；这不是冒充任何真实历史人物。';
    var rare = macauTender.options.find(function (item) { return item.id === 'macau-limited-concession-network-partner'; });
    if (rare) {
      Object.assign(rare, {
        label: '以长期经营记录、合资格资本和共同治理方案成为合成新财团的主要经营股东之一',
        routes: ['port-guesthouse-caterer', 'coastal-passenger-cargo-operator', 'recorded-coastal-small-trader', ROUTE_FINANCE],
        route: ROUTE_CONCESSION,
        gate: { money: 45, network: 58, position: 48, knowledge: 42 },
        delta: { money: -18, network: 4, position: 4, mind: -1 },
        echo: 'd48:1962:major-shareholder',
        fact: '1962 年在合成角色叙事中成为公开中标新财团的多名主要经营股东之一；不冒充真实公司股东或历史人物。', endingFact: true,
        syncEmploymentToRoute: true,
        enterpriseStart: { id: 'd48-composite-concession-company', name: '合成澳门海莲旅游娱乐股份公司（合成叙事）', domainKey: 'D48', kind: 'fictionalized-major-tourism-entertainment-concession-company', workplace: '澳门合成旅店、交通、旅游与持牌娱乐场经营网络', product: '公开批给范围内的酒店、旅游、交通与娱乐场经营，并逐项记录顾客、员工、债务、社会代价和申诉', employees: 60, shareStatus: '主角是多名合成主要经营股东和工作董事之一，并非唯一控制者；真实中标公司、真实股东姓名和实际董事席位均不被游戏角色占用', partners: [{ personId: 'contact:d48_he_huilan', role: '有独立实缴股份、酒店经营责任、工资与表决权的合成女股东' }, { personId: 'contact:d48_liang_jinghe', role: '有交通旅业资产、债务责任和退出条款的合成股东' }, { personId: 'contact:d48_ma_dechang', role: '只按章程、资本和公共合同参与治理的合成财务股东' }], asset: { id: 'd48-hotel-transport-entertainment-assets', kind: 'hotel-transport-entertainment-assets', description: '列明归属、估值、抵押和维护责任的酒店筹建、交通接驳、接待与持牌场所资产' }, debt: { id: 'd48-construction-and-wage-debt', creditor: '具名银行、承建人、供应商与股东借款人', purpose: '酒店、交通、场所建设、雇员工资与法定保证，不得由顾客赌款或未授权资金含混填补' }, license: { id: 'd48-operating-license', kind: 'tourism-hotel-entertainment-operating-license', authority: '澳门当时具名主管机关', scope: '仅限公开批给和许可列明的酒店、旅游、交通与娱乐场经营；其他地点不自动继承' }, concession: { id: 'd48-public-concession', kind: 'fictionalized-role-within-1961-publicly-awarded-exclusive-concession', authority: '澳门当时具名批给机关', scope: '按 1961 年公开竞投形成的专营合同经营列明业务，并承担酒店、旅游、年金、监督与公共利益义务', awardMethod: '1961 年公开竞投；游戏以合成人物槽呈现中标新财团，不声称新增另一家史实中标公司', status: 'active-source-bounded-fiction', startedYear: 1962 } },
      });
    }
  }

  C.actions.push(
    { id: 'd42-scope-and-consent', name: '只核这一项请求的来源、范围、本人是否同意和能够拒绝的部分', routes: [ROUTE_IDENTITY], minAge: 18, spirit: 4, careerAction: true, delta: { mind: 4, knowledge: 2, health: -1 }, contactEffects: { d42_lu_wenqing: { relation: 2 } }, note: '不展示暗号、路线、藏匿、跟踪或规避查验方法；只记录决定、压力和后果。' },
    { id: 'd42-public-job-shift', name: '完成一班真实公开工作并核迟到、工资、同事和顾客后果', routes: [ROUTE_IDENTITY], minAge: 18, spirit: 4, careerAction: true, delta: { craft: 3, money: 2, relation: 1, health: -2 }, contactEffects: { d42_chen_shuzhen: { relation: 2 } }, note: '公开职业必须真的完成，不能只充当万能掩护。' },
    { id: 'd42-family-risk-talk', name: '与家人只谈风险范围、紧急核信地址和各自去留', routes: [ROUTE_IDENTITY], minAge: 18, spirit: 3, careerAction: true, delta: { relation: 3, mind: 2 }, contactEffects: { d42_fang_huiru: { relation: 2 } }, note: '家人不是天然掩护、传话人或共同责任人。' },
    { id: 'd42-conflicting-records', name: '把机构记录、本人陈述、后来消息和未知分栏保存', routes: [ROUTE_IDENTITY], minAge: 18, spirit: 3, careerAction: true, delta: { knowledge: 4, mind: 2 }, contactEffects: { d42_gu_jinghe: { relation: 2 } }, note: '不以“英雄”“卧底”“叛徒”或“清白”吞掉可核事实。' },
    { id: 'd42-harm-followup', name: '核一次错误消息、拘留或指认具体影响了谁以及仍未知什么', routes: [ROUTE_IDENTITY], minAge: 18, spirit: 4, careerAction: true, delta: { relation: 2, mind: -1, fame: -1 }, contactEffects: { d42_zhou_yulan: { relation: 2 } }, note: '承认实际伤害和压力，不计算忠诚值，也不补写未确认生死。' },
    { id: 'd42-refuse-or-exit', name: '对范围不明的请求明确拒绝、交接或退出，并记录现实代价', routes: [ROUTE_IDENTITY], minAge: 18, spirit: 3, careerAction: true, delta: { mind: 4, position: -1, health: 1 }, contactEffects: { d42_lu_wenqing: { relation: -1 } }, note: '退出是可玩人生，不是失败按钮；旧关系和暴露不会立即归零。' },
    { id: 'd42-recover-health-work', name: '因惊恐、失眠、伤痛或耗竭减少活动并重接普通工作', routes: [ROUTE_IDENTITY], minAge: 18, spirit: 2, careerAction: true, delta: { health: 4, money: -1, relation: 1 }, contactEffects: { d42_chen_shuzhen: { relation: 1 } }, note: '高风险经历会作用于身体、婚姻、父母、朋友和职业，不只作用于身份标签。' },
    { id: 'd42-late-record-review', name: '晚年逐条标亲历、转述、机构记录、后来确认与未知', routes: [ROUTE_IDENTITY], minAge: 45, spirit: 3, delta: { knowledge: 3, mind: 3 }, contactEffects: { d42_tang_mingshu: { relation: 2 } }, note: '这是退出旧工作后仍可进行的个人记录行动；不替失联者补结局，不用晚年荣誉覆盖受压、误伤或退出。' },

    { id: 'd47-client-capital-separation', name: '核客户本金、保费、受托款、股本、准备和个人家产六本账', routes: [ROUTE_FINANCE], minAge: 25, spirit: 4, careerAction: true, delta: { knowledge: 4, mind: 3, money: 1 }, contactEffects: { d47_lin_suying: { relation: 2 } }, note: '客户资金永远不是老板个人资产或可随意投资的资本。' },
    { id: 'd47-board-minutes', name: '召开一次有提案、利益冲突、异议、表决和执行人的董事会', routes: [ROUTE_FINANCE], minAge: 25, spirit: 3, careerAction: true, delta: { position: 2, knowledge: 3, relation: 1 }, contactEffects: { d47_zhou_renhe: { relation: 2 } }, note: '强势经营者也不能替股东、经理、女职员和客户统一表态。' },
    { id: 'd47-loan-file', name: '核一笔贷款的借款人、用途、现金流、担保、拒绝和复核日', routes: [ROUTE_FINANCE], minAge: 25, spirit: 4, careerAction: true, delta: { knowledge: 3, money: 2, mind: 2 }, contactEffects: { d47_chen_qiming: { relation: 2 } }, note: '不把熟人、性别、籍贯或政治关系直接当信用。' },
    { id: 'd47-policy-claim', name: '核一份保单的承保范围、缴费、损失调查、理赔和申诉', routes: [ROUTE_FINANCE], minAge: 25, spirit: 4, careerAction: true, delta: { knowledge: 3, relation: 2, money: 1 }, contactEffects: { d47_fang_meizhen: { relation: 2 } }, note: '保单、事故、调查、核赔、实付和争议分别记录。' },
    { id: 'd47-reserve-liquidity', name: '核准备、现金、到期债务、提款请求与可变现资产', routes: [ROUTE_FINANCE], minAge: 25, spirit: 4, careerAction: true, delta: { mind: 4, money: 1, position: 1 }, contactEffects: { d47_ma_dean: { relation: 2 } }, note: '高账面利润不能替代即时偿付能力。' },
    { id: 'd47-staff-wage-control', name: '核职员工资、双人复核、休息、差错与申诉', routes: [ROUTE_FINANCE], minAge: 25, spirit: 3, careerAction: true, delta: { relation: 3, health: 2, money: -1 }, contactEffects: { d47_lin_suying: { relation: 1 } }, note: '金融企业不是老板一个人的传奇，女经理和基层职员有工资、权限、异议与离开权。' },
    { id: 'd47-investment-governance', name: '核一项实业投资的股本、董事席位、关联交易与退出条件', routes: [ROUTE_FINANCE], minAge: 25, spirit: 4, careerAction: true, delta: { knowledge: 3, network: 2, money: 1 }, contactEffects: { d47_zhou_renhe: { relation: 1 } }, note: '投资不自动生成对被投企业、员工或资产的私人控制。' },
    { id: 'd47-bad-debt-resolution', name: '把逾期、展期、减值、追索、和解与无法收回逐项处理', routes: [ROUTE_FINANCE], minAge: 25, spirit: 3, careerAction: true, delta: { mind: 3, money: -1, fame: -1 }, contactEffects: { d47_chen_qiming: { relation: 1 } }, note: '坏账会减少资本和信誉，不能用新客户资金盖住。' },

    { id: 'd48-contract-obligation', name: '核专营合同、酒店旅游义务、年金、许可范围和到期事项', routes: [ROUTE_CONCESSION], minAge: 45, spirit: 4, careerAction: true, delta: { knowledge: 4, position: 2, money: -1 }, contactEffects: { d48_tang_shouwen: { relation: 2 } }, note: '公开中标不是永久私权；每项经营都有地点、范围、监督和期限。' },
    { id: 'd48-hotel-guest-shift', name: '核一班酒店房间、住客、餐食、行李、投诉与实际结算', routes: [ROUTE_CONCESSION], minAge: 45, spirit: 4, careerAction: true, delta: { craft: 3, money: 2, relation: 1, health: -1 }, contactEffects: { d48_he_huilan: { relation: 2 } }, note: '成为大经营者后仍要看到具体住客和基层服务，不用“生意兴隆”概括一年。' },
    { id: 'd48-worker-pay-safety', name: '核酒店、交通与场所职员的工资、班次、伤病、休息与投诉', routes: [ROUTE_CONCESSION], minAge: 45, spirit: 3, careerAction: true, delta: { relation: 3, health: 2, money: -2 }, contactEffects: { d48_mai_suying: { relation: 2 } }, note: '员工不是专营权附属物；女性职员也能管理、晋升、拒绝越界和离开。' },
    { id: 'd48-customer-harm-response', name: '核一名顾客的欠款、家庭求助、自我限制请求和场所责任', routes: [ROUTE_CONCESSION], minAge: 45, spirit: 4, careerAction: true, delta: { relation: 2, money: -1, fame: 1 }, contactEffects: { d48_liu_jiaan: { relation: 2 } }, note: '不展示玩法、赔率、诱导投注或规避监管；只处理损失、求助和经营责任。' },
    { id: 'd48-shareholder-governance', name: '召开有资本、债务、关联利益、异议与退出条款的股东董事会', routes: [ROUTE_CONCESSION], minAge: 45, spirit: 4, careerAction: true, delta: { position: 3, mind: 3, relation: -1 }, contactEffects: { d48_liang_jinghe: { relation: 2 } }, note: '主角不是唯一控制者，不能抹掉其他股东、经理、员工、债权人和监管方。' },
    { id: 'd48-debt-construction-ledger', name: '核酒店建设、供应商、银行债、工资、延期和抵押边界', routes: [ROUTE_CONCESSION], minAge: 45, spirit: 4, careerAction: true, delta: { knowledge: 3, money: 1, mind: 2 }, contactEffects: { d48_ma_dechang: { relation: 2 } }, note: '营收、顾客赌款、建设借款和股东出资不互相遮盖。' },
    { id: 'd48-public-complaint', name: '答复一宗场所秩序、收费、员工行为或顾客伤害申诉', routes: [ROUTE_CONCESSION], minAge: 45, spirit: 3, careerAction: true, delta: { mind: 4, fame: 1, money: -1 }, contactEffects: { d48_tang_shouwen: { relation: 1 } }, note: '投诉人保留陈述和复核，不因企业声望被写成闹事。' },
    { id: 'd48-handover-successor', name: '核下一代经理、股权、职业能力、家庭关系与有期限交接', routes: [ROUTE_CONCESSION], minAge: 55, spirit: 3, careerAction: true, delta: { knowledge: 2, relation: 3, position: -1 }, contactEffects: { d48_mai_suying: { relation: 1 } }, note: '子女和配偶不自动继承经营权，职业经理也不是家族工具人。' }
  );

  // D48 只能在 1962 年后的澳门人生中进入，因此它的具体职业行动必须在后半生继续可玩。
  C.actions.filter(function (action) {
    return action.routes && action.routes.indexOf(ROUTE_CONCESSION) >= 0;
  }).forEach(function (action) {
    action.post1949Choices = ['macau'];
  });

  var sourceIds = {
    identity: ['SRC-D42-SH-SECURITY-ARCHIVES', 'SRC-D42-SH-HIDDEN-FRONT', 'SRC-D42-SH-1949-INVESTIGATION', 'SRC-D42-SH-ARCHIVE-BOUNDARY'],
    finance: ['SRC-D47-SH-FINANCE-ARCHIVES', 'SRC-D47-BOC-HISTORY', 'SRC-D47-BOC-RUN-1916', 'SRC-D47-HKMA-LICENSING'],
    concession: ['SRC-D48-DICJ-HISTORY', 'SRC-D48-LAW-1496', 'SRC-D48-LAW-TENDER', 'SRC-D48-COURT-CONCESSION'],
  };

  function opt(id, label, delta, result, next, extra) {
    return Object.assign({ id: id, label: label, delta: delta, result: result, next: next }, extra || {});
  }

  function installDomainDecisions(domain, field, route, rows) {
    rows.forEach(function (row) {
      var year = row[0];
      var options = row.slice(3).map(function (item) {
        var echo = domain.toLowerCase() + ':' + year + ':' + item.id;
        C.ordinaryEvents.push({
          id: 'echo-' + echo.replace(/:/g, '-'), title: row[1] + '：次年结果', text: item.next,
          year: year + 1, priority: 47, requiresEchoes: [echo], routes: [route], sourceIds: sourceIds[field].slice(),
          reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
        });
        var runtimeOption = Object.assign({}, item, { echo: echo, fact: item.result, endingFact: true });
        delete runtimeOption.result;
        delete runtimeOption.next;
        return runtimeOption;
      });
      C.decisions.push({ id: 'route-' + domain.toLowerCase() + '-' + year, year: year, routes: [route], title: row[1], prompt: row[2], options: options });
    });
  }

  var identity = [
    [1938, '第一次高风险请求只接到什么范围', '联系人只说明要核一条已公开消息，却希望你顺便判断一个陌生人的身份。你必须把自愿接受、拒绝和未知边界分开。',
      opt('public-fact-only', '只核公开可证的一条事实，拒绝评价陌生人', { mind: 3, knowledge: 2 }, '1938 年只核一条公开事实，没有替陌生人定性。', '陆文清收下有来源的公开消息；陌生人的身份仍未知，你的公开工作迟到一次并被扣半日钱。'),
      opt('ask-scope-first', '要求说清对象、用途与退出办法，再决定本次不接', { mind: 4, position: -1 }, '1938 年因范围不明拒绝第一次追加请求。', '联系没有立刻中断，信任下降；你按时完成商号账务，家人只知道有人来找过。'),
      opt('exit-early', '说明家庭和职业接不住风险，交回本次事务', { health: 2, relation: 2, network: -2 }, '1938 年在第一次任务后有记录地退出。', '公开生活暂时接稳，旧联系人不再交新事项；别人仍记得你曾参与，风险没有归零。')],
    [1939, '公开职业与隐蔽责任同时出错时先补哪一边', '商号账少一笔、同事替你多做一班，另一边又催问尚未核实的消息。公开职业不能只是一个不必完成的称呼。',
      opt('repair-public-work', '先向老板和同事承认缺口、补账并结代班钱', { craft: 3, relation: 3, money: -1 }, '1939 年先补公开工作和同事代班。', '陈淑珍拿到代班钱，账差找到；另一边只收到“本次未核”，没有因赶时间补猜测。'),
      opt('reduce-both', '两边都减量，只保留能够亲自完成的部分', { health: 3, money: -1, position: -1 }, '1939 年同时缩减公开班次与高风险事务。', '工资减少，迟到停止；联系人改由别人承担一段工作，家庭晚饭恢复两次。'),
      opt('hide-job-error', '先掩下公开差错，希望以后补回', { mind: -2, money: 1, fame: -2 }, '1939 年没有及时说明公开工作差错。', '次月复核发现账差与缺勤，同事被误问一次；你补薪并书面更正，公开信誉受损。')],
    [1941, '一条未经证实的指认会不会进入记录', '有人说顾景和“身份可疑”，只给出一次同席和一张机构抄件。制度记录存在，不等于其中每句话都是人物真相。',
      opt('separate-allegation', '标成他人指认，并列本人陈述和缺失证据', { knowledge: 4, mind: 3 }, '1941 年把指认、陈述与未知分栏。', '顾景和没有因一张抄件被写成确定身份；后来只确认他在公开单位任职。'),
      opt('ask-person', '在公开职业关系里让当事人说明可说明的部分', { relation: 3, position: -1 }, '1941 年先听取当事人的有限陈述。', '他确认同席但拒绝猜测他人；你保留拒答权，没有把沉默写成承认。'),
      opt('pass-unverified', '原样转交未经证实的指认', { network: 2, mind: -2, relation: -3 }, '1941 年转交一条未经证实的指认。', '顾景和被多问一次并失去一班工作；你后来确认材料不足，伤害事实不能由更正抹掉。')],
    [1942, '家里人拒绝继续承受迟归与陌生来客', '方惠如要求你在共同住处、她的工作和风险之间作出具体安排。她不是你的掩护，也没有义务替你保密或随迁。',
      opt('family-chooses', '说明风险范围，让她独立决定住处与工作', { relation: 4, mind: 2, position: -1 }, '1942 年让家人独立安排风险下的生活。', '她暂住姐姐家并保留原工作，你承担新增房租；关系继续，但不再共享所有日常。'),
      opt('emergency-only', '只留下紧急核信人，不让家人接任何事务', { mind: 3, relation: 1 }, '1942 年只与家人约定紧急核信边界。', '一张纸只写具名公开地址；方惠如拒绝认识其他联系人，选择得到尊重。'),
      opt('stop-for-household', '交接高风险事务，先重建共同生活', { health: 3, relation: 4, network: -2 }, '1942 年因共同生活风险中断高风险事务。', '旧联系停止，公开工作重新排班；家人仍需时间处理此前恐惧，退出没有一键修复关系。')],
    [1944, '拘留之后怎样确认说出的话造成了什么', '你只能确认自己说过什么、身体受过什么、谁被问过；失联者的去向不能由内疚或自辩补写。',
      opt('harm-ledger', '逐项核自己陈述、后来问话、失业、失联和未知', { mind: 3, knowledge: 3, relation: -1 }, '1944 年建立受压经历与影响清单。', '一名房东受问、一位熟人换工，另一人仍无消息；没有写成“害死”或“毫无后果”。'),
      opt('contact-affected', '在安全的公开关系中询问受影响者愿意说明什么', { relation: 3, health: -1 }, '1944 年由受影响者决定是否说明后果。', '周玉兰只确认自己被停工三日，不愿谈其他人；她的边界进入记录。'),
      opt('deny-everything', '因羞惧否认拘留与陈述曾发生', { mind: -3, relation: -2, position: 1 }, '1944 年曾试图否认受压经历。', '家人从别处得知问话，信任再次下降；后来档案保留机构记录与你当时否认两种来源。')],
    [1946, '战后要继续、转公开工作还是彻底退出', '旧关系重组，公开职业也在招人。继续不代表永不质疑，退出也不代表过去从记录中消失。',
      opt('public-records-work', '只做公开档案、寻人和社会服务受薪工作', { position: 2, money: 2, relation: 2 }, '1946 年转入公开记录与寻人服务。', '岗位写明工资、资料和申诉范围；秘密关系不再由职业自动延续。'),
      opt('bounded-continue', '只承担一次有来源、无人员指认的有限核信', { knowledge: 2, mind: 2, health: -1 }, '1946 年继续一项边界明确的有限事务。', '任务结清并给出结束答复；旧联系人没有取得无限调用你职业和家庭的权力。'),
      opt('full-exit', '归还材料、列未结事项并结束联系', { health: 3, mind: 3, network: -2 }, '1946 年完成具名交接并退出高风险活动。', '公开工作续上，两个联系人变远；一项旧指控仍待后来档案核对。')],
    [1947, '别人用“叛徒”或“英雄”要求你统一定性', '一张传单和一份机构材料对同一人给出相反标签。人物曾做什么、在何种压力下说什么、影响谁，不能被标签吞掉。',
      opt('fact-language', '只写行为、压力、来源、后果与未知', { knowledge: 3, mind: 4 }, '1947 年拒绝用价值标签代替事实。', '材料改成时间线；受压陈述、后续伤害和未证部分都保留。'),
      opt('multiple-accounts', '让当事人、家属和机构记录分别署明来源', { relation: 3, network: 2 }, '1947 年保留多方互不代签的版本。', '三种说法有冲突，档案没有强造唯一结论；家属也没有替当事人认错或领功。'),
      opt('accept-hero-story', '为换取工作接受统一英雄叙述', { position: 2, fame: 2, mind: -2 }, '1947 年一度接受简化的英雄叙述。', '你获得短期讲述工作，却发现受压、退出和受伤者被删去；次年提出补注。')],
    [1948, '地点变化前哪些关系能够跟随', '工作、家人、旧联系人、机构记录和一名仍失联的人各有不同去向。不能把换城市写成全员安全转移。',
      opt('separate-destinations', '逐人核去向、最后地址和是否愿意联系', { knowledge: 3, relation: 3 }, '1948 年逐项核地点变化中的人物去向。', '家人选择留下，公开同事换城，一名旧联系人未知；你只带走自己的抄件。'),
      opt('ordinary-job-first', '先落实公开住处与工作，再决定保留哪些联系', { position: 3, money: 2, network: -1 }, '1948 年先落实公开生活再核旧联系。', '新雇主给出试用答复；旧关系没有被当作求职捷径，家庭地址分别寄存。'),
      opt('end-all-contact', '停止主动联系，但保存最后已知事实', { health: 2, mind: 3, relation: -2 }, '1948 年停止旧联系并保留最后消息。', '没有新任务，一些友情也中断；失联者仍记最后确知在世日期。')],
    [1952, '新落点怎样处理过去的公开职业与秘密经历', '雇主、登记人、家人和旧熟人问的不是同一件事。你只能提供有来源的个人经历，不能替组织或他人作证。',
      opt('disclose-sourced', '按时间说明公开岗位、个人选择和后来确认', { mind: 3, knowledge: 3, position: -1 }, '1952 年按来源说明个人经历。', '工作审查延长一月，最终只接公开文书；未知关系没有被补成组织证明。'),
      opt('ordinary-work-only', '求职只提供岗位所需履历，另存个人记录', { money: 2, position: 2, mind: 1 }, '1952 年以可核公开职业重新谋生。', '雇主核实工作年资后留用；过去仍可能在其他场合被问，不由本次录用统一解决。'),
      opt('withdraw-public-life', '停止所有组织与公共活动，照料身体和家人', { health: 4, relation: 3, network: -2 }, '1952 年退出政治活动并转普通生活。', '关系和睡眠逐步恢复，经济收入下降；过去的拘留、退出和伤害仍留在事实账。')],
    [1958, '曾受影响的人要求看你保存的材料', '周玉兰想知道自己为何被停工，但材料也含有其他人的隐私和未经证实指认。补救不能靠整包交出。',
      opt('person-own-record', '只提供与她本人直接相关的来源、时间和更正', { relation: 4, knowledge: 2 }, '1958 年向当事人开放与本人相关的记录。', '她确认一项问话与三日停工，拒绝公开其他内容；你补写她的陈述。'),
      opt('independent-review', '请无利益关系的人核哪些可以交付', { mind: 4, position: -1 }, '1958 年由独立经手人复核材料边界。', '一页可交、两页遮去无关姓名、一项指认标未证；过程留下申诉办法。'),
      opt('refuse-all', '因害怕暴露拒绝任何查看', { mind: 2, relation: -3, fame: -1 }, '1958 年拒绝当事人查看旧材料。', '周玉兰中断来往并提出异议；晚年记录保留你的恐惧和她未获答复的事实。')],
    [1966, '机构材料与个人记忆再次冲突', '一份旧档写你在某年仍“积极活动”，而工资簿和家人记忆显示你已经退出。不能因档案有章就压倒其他来源。',
      opt('source-comparison', '并列档案、工资簿、家书和本人记忆', { knowledge: 4, mind: 3 }, '1966 年完成一项多来源比对。', '结论只到“机构记录未及时更新”；你没有由此证明所有个人记忆都准确。'),
      opt('record-objection', '留下书面异议与可核附件', { mind: 4, position: -1 }, '1966 年对旧材料提出有来源的异议。', '异议被收件但未立即改档；收件日期、附件和仍未答复继续保存。'),
      opt('destroy-own-copy', '因压力毁掉自己的一份抄件', { health: 1, mind: -2, knowledge: -2 }, '1966 年曾毁掉一份私人抄件。', '风险感暂时下降，一段可核细节也永久缺失；机构原件是否存在仍未知。')],
    [1978, '晚年怎样讲述一段不能完整确认的高风险人生', '后辈想听传奇，受影响者只想知道事实。你的记忆、旧档和他人经历都有边界。',
      opt('annotated-timeline', '留下标明亲历、转述、档案、后来确认和未知的时间线', { knowledge: 3, mind: 4 }, '1978 年留下有来源边界的个人时间线。', '公开职业、主动选择、拘留压力、退出与误伤同时被看见，没有统一英雄化。'),
      opt('affected-voices', '请家人、同事和受影响者分别决定是否留下自己的版本', { relation: 4, network: 2 }, '1978 年收集互不代签的多方回忆。', '有人写、有人拒绝、有人只更正一个日期；空白和分歧一并保存。'),
      opt('keep-private', '只整理给家人看的个人材料，不公开他人姓名', { relation: 2, mind: 3 }, '1978 年选择有限私存而非公开传奇。', '材料交给具名家人并写查阅边界；失联者和真实历史人物没有被合成角色冒名。')]
  ];

  var finance = [
    [1947, '开业第一年先建立哪条不可跨越的账务边界', '股东催放款、客户来兑付、保险经办要缴费，账面现金看似充足，却分属不同主体。',
      opt('six-ledgers', '先分客户款、保费、受托款、股本、准备和家产', { knowledge: 4, mind: 3 }, '1947 年建立六类资金分账。', '一笔被误当利润的客户款退回客户账户；股东少分一次红，企业没有挪用。'),
      opt('reserve-first', '先留足兑付与理赔准备，再排投资', { money: -2, position: 2, mind: 3 }, '1947 年优先留足准备。', '两项投资延期，一轮集中兑付被接住；准备金仍按月复核。'),
      opt('use-client-float', '短期动用客户待兑款补开业缺口', { money: 4, fame: -3, mind: -3 }, '1947 年曾越界动用客户待兑款。', '次月到款迟延导致两户等候，你补回本金并向董事会报告；信誉与资本均受损。')],
    [1948, '一笔熟人实业贷款怎样进入董事会', '借款人是股东亲族，工场确有订单，也有旧欠款。亲近关系不能替代现金流和利益冲突披露。',
      opt('conflict-recusal', '关联股东回避，独立复核用途、还款与担保', { knowledge: 3, position: 2 }, '1948 年按利益冲突程序审一笔贷款。', '贷款缩额并分段拨付，回避写入会议记录；工场按首批交货获得第二段。'),
      opt('decline-related', '因资料不足拒绝并给补件清单', { mind: 4, relation: -1 }, '1948 年拒绝资料不足的关联贷款。', '亲族关系变冷，客户获得具体补件和复核日；股东未能口头放款。'),
      opt('chair-decides', '由你凭经验直接批准整笔', { money: 3, position: 1, fame: -2 }, '1948 年曾越过董事会批准关联贷款。', '首期回款迟延，林素英提出书面异议；你失去单独签批权。')],
    [1950, '制度变化后企业、客户与职员怎样分别承接', '牌照、股权、存量客户、职员工资和过去合同进入重新登记。一个旧章不能证明当前经营权。',
      opt('relicense-separate', '逐项核牌照、客户余额、工资和股东权益', { knowledge: 4, position: 2, money: -2 }, '1950 年按新条件逐项承接金融事务。', '本地只保留公开结算与保险文书，投资业务另行处理；客户余额逐人答复。'),
      opt('employee-transition', '先保障工资、客户答复和岗位转介', { relation: 4, money: -2, position: -1 }, '1950 年优先处理职员与客户过渡。', '六名职员各获留用、转岗或结薪答复；企业规模缩小但没有一夜消失。'),
      opt('move-capital', '在合法范围内把部分股本与业务迁往新落点', { network: 3, money: -3, health: -1 }, '1950 年迁移部分可核股本与业务。', '客户款不随股东迁走，只有已结股本和自有档案进入新公司申请。')],
    [1952, '一次集中提款怎样处理', '传闻引来客户排队，现金无法同时覆盖所有期限，但企业仍有可变现资产和到期回款。',
      opt('publish-liquidity', '公布可兑现范围、次序、资产和每日答复', { mind: 4, fame: 2, money: -2 }, '1952 年公开处理集中提款。', '多数小额客户当日兑付，大额按合同排期；林素英每日签实数。'),
      opt('sell-assets', '出售自有投资资产补流动性，不动客户凭据', { money: -4, position: -1, mind: 3 }, '1952 年变现自有资产接提款。', '企业失去一项长期收益，客户兑付接住；股东承担损失。'),
      opt('delay-without-record', '口头劝客户等待，不给书面期限', { money: 2, fame: -4, relation: -3 }, '1952 年曾无明确答复拖延提款。', '队伍扩大并出现投诉；监管经手人要求补余额、顺序与每日现金表。')],
    [1955, '火灾保险理赔由谁决定', '保户报告仓房失火，保单、缴费、损失清单、消防记录和未见财物不完全一致。',
      opt('independent-loss', '由未承保该单的人调查可见损失并听取保户陈述', { knowledge: 3, relation: 3 }, '1955 年独立核一宗火险理赔。', '可证部分先赔，争议货物另给申诉；调查费由公司承担。'),
      opt('partial-payment', '先付无争议部分，不要求签放弃全部', { money: -3, fame: 2, mind: 2 }, '1955 年先支付一宗无争议保险款。', '保户用款重租仓位，争议仍可继续；实付与申请额分别入账。'),
      opt('deny-by-technicality', '抓住一处文字差异拒绝整单', { money: 3, fame: -3, relation: -2 }, '1955 年曾以单一文字差异拒赔。', '保户申诉后复核确认部分责任，公司补赔并承担迟延费用。')],
    [1958, '女经理的权限和工资是否与实际责任一致', '林素英主持保险经办和风险复核，却仍被写作“协助”；她要求职位、签字、工资和董事会席位相符。',
      opt('recognize-manager', '按实际责任确认经理职位、工资和签字范围', { relation: 4, position: 2, money: -1 }, '1958 年确认女经理的实际职位与权限。', '她独立主持一条业务并承担错误答复；公司不再由你代签她的判断。'),
      opt('board-seat', '由股东会表决她的董事席位和利益冲突规则', { network: 3, relation: 3 }, '1958 年通过有记录表决增加女董事。', '表决通过，反对意见也入册；家庭身份没有成为资格或否决理由。'),
      opt('keep-assistant-title', '继续让她实际负责但只给助理名义', { money: 2, relation: -4, fame: -2 }, '1958 年一度拒绝匹配女经理职位。', '林素英辞去一项签字职责，两名职员跟随离开；客户交接成本由企业承担。')],
    [1962, '跨地经营是否能直接沿用原牌照', '香港、澳门或其他落点出现业务机会，但当地牌照、资本、语言和客户保护各不相同。',
      opt('local-license', '重新申请当地许可并设独立资本和客户账', { money: -3, knowledge: 3, network: 2 }, '1962 年为跨地金融业务重新申请许可。', '只获有限保险与投资顾问范围，存款业务未获准；宣传按实际牌照修改。'),
      opt('partner-bank', '与当地持牌机构签有限代理合同', { network: 4, position: 1, money: 1 }, '1962 年通过持牌机构做有限金融经办。', '合同列职责、客户资金、投诉和退出；你的公司没有冒充银行。'),
      opt('use-old-title', '沿用旧“银行”名义先收客户款', { money: 4, fame: -5, position: -3 }, '1962 年曾在未获牌照时沿用旧金融名义。', '业务被叫停，客户款逐笔退还；企业承担罚损和公开更正。')],
    [1966, '一项高收益投资与客户利益冲突', '被投企业承诺高回报，却由一名董事控制并希望使用受托资金。',
      opt('client-excluded', '禁止使用客户与受托资金，只让自愿股东表决自有资本', { mind: 4, money: -1 }, '1966 年把客户资金排除在关联投资外。', '两名股东拒绝出资，项目缩小；客户余额没有承担股东冒险。'),
      opt('external-valuation', '请独立会计核资产、负债和关联交易', { knowledge: 4, money: -2 }, '1966 年独立估值一项关联投资。', '估值发现负债遗漏，董事会否决原方案并保留复议。'),
      opt('follow-high-return', '因高回报承诺批准使用受托资金', { money: 5, mind: -4, fame: -4 }, '1966 年曾越界把受托款投向关联企业。', '项目延期，客户提款受阻；股东补资并进入监管复核。')],
    [1970, '坏账增加时怎样面对资本损失', '三笔贷款逾期，一家企业仍有订单，一家愿意和解，一家已经停业。不能用统一催收或新客户款填洞。',
      opt('case-by-case', '分别展期、和解、减值与清理担保', { knowledge: 3, mind: 3, money: -2 }, '1970 年逐案处理坏账。', '一笔恢复、一笔折价和解、一笔确认损失；资本下降被公开。'),
      opt('shareholder-call', '由股东按章程补资并暂停分红', { money: 1, relation: -2, position: 2 }, '1970 年由股东承担坏账资本缺口。', '三名股东补资，一人选择退出；客户资金不承担股东损失。'),
      opt('rollover-hide', '用新贷款和新客户款遮住逾期', { money: 4, fame: -5, mind: -4 }, '1970 年曾滚动掩盖逾期。', '第二轮到期暴露更大缺口；公司进入限制业务和独立审计。')],
    [1974, '企业长大后由家人、职业经理还是股东治理', '子女并未自动在公司工作，林素英和新经理有职业能力，老股东也有不同退出意愿。',
      opt('professional-governance', '按能力聘经理，董事会保留监督与解聘程序', { position: 3, relation: 2 }, '1974 年转向职业经理治理。', '经理获得明确工资与权限，家人可应聘但不自动继承。'),
      opt('family-apply', '让愿意的子女从有期限岗位公开试做', { relation: 3, knowledge: 2 }, '1974 年让家人按普通岗位试做。', '一人留用、一人离开，股份继承和工作能力继续分开。'),
      opt('founder-control', '保留所有签字权，不设接替期限', { position: 2, health: -3, relation: -2 }, '1974 年一度维持创办人集中控制。', '一次住院让三项业务停摆；董事会随后要求双签和代理人。')],
    [1978, '改革与新市场机会怎样重新定边界', '新的外汇、贸易、保险和投资机会出现，旧经验有用，却不能替代当前制度、牌照与风险。',
      opt('new-license-scope', '在当前制度下重新核许可、资本和客户范围', { knowledge: 4, network: 2, money: -2 }, '1978 年按新制度扩展有限金融业务。', '公司只进入获准领域，未获准部分转介持牌机构。'),
      opt('staff-training', '先让职员学习新规则并演练客户答复', { knowledge: 3, relation: 3, money: -1 }, '1978 年先更新职员能力与内控。', '两项旧表样被撤，一名老职员转轻量复核；扩张晚一年。'),
      opt('old-network-first', '凭旧关系先接业务，手续以后再补', { money: 4, position: -2, fame: -3 }, '1978 年曾先接后补一批业务。', '一宗客户争议暴露授权不足，公司退费并暂停扩张。')],
    [1982, '晚年是合并、清理还是保留小规模经营', '资本、牌照、客户、职员、股东意愿和你的身体已经不同。企业结局不是个人成功或失败排名。',
      opt('merge-protected', '与持牌机构合并并逐项保护客户与职员', { position: 1, relation: 3, health: 2 }, '1982 年完成有条件合并。', '客户余额、保单、工资和股权各有承接表；你退出日常签字。'),
      opt('orderly-liquidation', '停止新业务、收回贷款、兑付客户并依法清理', { mind: 4, health: 2, money: -2 }, '1982 年启动有序清理。', '多数事项结清，两笔争议进入后续程序；企业结束不等于员工和客户人生结束。'),
      opt('small-advisory', '退回受限业务，只保留获准的小型保险与投资顾问', { knowledge: 2, health: 2, money: 1 }, '1982 年缩成有限顾问与经办企业。', '员工降为四人，牌照、客户资金和收费边界重新公布。')]
  ];

  var concession = [
    [1963, '中标开业后第一年先把什么写进经营账', '专营合同、酒店筹建、临时场所、交通接驳、六十名职员和供应商同时开始。中标没有让钱、人和许可自动就位。',
      opt('contract-ledger', '先列每项合同义务、期限、负责人和未完成部分', { knowledge: 4, position: 2 }, '1963 年建立专营合同履行清单。', '年金、酒店工程、临时经营、交通和社会义务各有责任人；两项延期被公开。'),
      opt('staff-wages-first', '先落实岗位、工资、班次、住宿与申诉', { relation: 4, money: -3 }, '1963 年先接住职员的实际工作与生活。', '六十人得到岗位和首月工资，九人拒绝夜班并重排；开业规模缩小。'),
      opt('open-before-ready', '先用声势开业，合同与工资以后补', { money: 5, fame: 2, mind: -4 }, '1963 年曾在准备不足时扩张开业。', '两宗工资投诉和一项场所越界出现；企业退费、补薪并缩回许可范围。')],
    [1965, '娱乐场顾客欠款已经影响家庭怎样处理', '刘家安的家人来说明借款和生活费问题，他本人也要求停止继续入场。经营收入不能吞掉当事人请求和家庭代价。',
      opt('honor-self-limit', '记录本人限制请求，停止新增场内信用并给申诉答复', { relation: 4, money: -2, fame: 1 }, '1965 年执行一名顾客的自我限制与信用停止。', '刘家安停止入场，既有债务转公开和解；家人没有替他签全部决定。'),
      opt('debt-support-referral', '把债务、生活困难和医疗求助分别转介', { relation: 3, network: 2, money: -1 }, '1965 年将顾客伤害分项转介。', '欠款有还款表，家口获得社会服务信息；企业不以继续消费换宽限。'),
      opt('keep-credit', '因他是熟客继续提供场内信用', { money: 4, fame: -4, relation: -3 }, '1965 年曾继续向受损顾客提供信用。', '欠款扩大并出现家庭申诉；董事会取消你的单独信用权限。')],
    [1967, '股东之间对利润、酒店和社会义务发生冲突', '有人要先分红，有人要继续建设，有人要求增加员工住房和顾客保护。主要股东身份不等于一票决定全部。',
      opt('recorded-vote', '披露利益后逐项表决并保留反对意见', { position: 3, mind: 3, relation: -1 }, '1967 年按章程处理一次股东冲突。', '分红减少、工程继续、员工住房增加一项；反对股东保留退出权。'),
      opt('independent-budget', '请独立会计列现金、债务、工资与合同义务后再议', { knowledge: 4, money: -1 }, '1967 年以独立预算重开董事会。', '账面利润扣除建设与债务后大幅下降，股东接受较低分配。'),
      opt('founder-orders', '以创办人威望直接决定先分红', { money: 4, position: 1, relation: -4 }, '1967 年曾越过共同治理优先分红。', '供应商款和工资吃紧，两名股东要求审计；你的表决权进入限制。')],
    [1969, '新酒店建设延期又超支怎样回答', '承建人、银行、供应商、员工和未来住客受到不同影响。不能用“宏伟工程”掩盖欠款与停工。',
      opt('publish-delay', '公布已完工、延期、超支、欠款和新日期', { mind: 4, fame: 1, money: -2 }, '1969 年公开酒店工程延期与超支。', '供应商获分期表，招聘缩减，开业日期后移；股东补充资本。'),
      opt('reduce-scope', '先完成住宿、消防、员工区和必要交通，推迟装饰', { knowledge: 3, money: 2, position: -1 }, '1969 年缩减非必要工程保住基本开业。', '基本设施按期验收，装饰留待现金恢复；没有借顾客资金补建设。'),
      opt('hide-overrun', '继续按原日期宣传并拖欠供应商', { fame: 2, money: 3, mind: -4 }, '1969 年曾隐瞒工程超支。', '开业前供应商停供，宣传撤回并赔付；企业信用下降。')],
    [1970, '旗舰酒店开业怎样落到具体一天', '房间、餐食、行李、场所、交通、员工与投诉同时涌来。历史大事必须变成住客和职员能够感到的生活。',
      opt('limited-opening', '先限量开房和场所，逐班复核服务与安全', { craft: 3, relation: 3, money: 1 }, '1970 年以有限规模开业。', '首日有明确入住、退房和投诉答复，员工加班获得工资；第二周再扩。'),
      opt('guest-worker-ledger', '按每名住客和每班职员核服务、结算与休息', { knowledge: 3, money: 2, health: -1 }, '1970 年建立旗舰酒店具体运营账。', '一宗行李错交得到返还和赔付，夜班少一人便停止增开房间。'),
      opt('full-capacity', '为声势第一天开满全部业务', { money: 5, fame: 2, health: -3 }, '1970 年曾在首日满负荷经营。', '员工过劳、两宗投诉和一项结算差错出现；随后被迫减量整改。')],
    [1971, '女性酒店经理能否进入最高经营会议', '何惠兰实际负责客房、员工和供应商，却常被只写作接待。她要求职位、股份、工资和决策责任相符。',
      opt('full-manager-role', '确认她的经理职位、签字范围、工资与董事席位', { relation: 4, position: 2, money: -1 }, '1971 年确认女经理的实际治理权。', '她独立答复一项客房系统改造，董事会记录其异议与责任。'),
      opt('shareholder-vote', '由股东按同一资格标准表决', { network: 3, relation: 2 }, '1971 年以统一标准表决女经理进入董事会。', '表决通过但非一致；家庭身份和性别没有成为自动资格或阻碍。'),
      opt('ceremonial-title', '只给荣誉头衔，不给签字和工资', { fame: 1, money: 2, relation: -4 }, '1971 年一度只给女经理名义荣誉。', '何惠兰拒绝代担责任并辞去一项事务；客户与员工交接成本出现。')],
    [1973, '监管申诉指向场所秩序与员工行为', '一名顾客与一名女职员对同一晚说法不同，保安记录也不完整。公司不能只保住名声。',
      opt('parallel-statements', '分别保留顾客、职员与当班记录并独立复核', { mind: 4, relation: 3 }, '1973 年独立复核一宗场所申诉。', '确认两项管理缺口和一项待核争议；职员没有因投诉被停薪。'),
      opt('temporary-scope-cut', '在复核期间缩小相关场所开放与信用服务', { money: -3, fame: 1, health: 1 }, '1973 年申诉复核期间主动缩减业务。', '收入下降，投诉人和职员获得明确答复日；整改后有限恢复。'),
      opt('silence-complaint', '以补偿换取不留正式投诉', { money: -1, fame: -3, mind: -3 }, '1973 年曾试图私下压下一宗申诉。', '投诉后来由他人再次提出，企业承担更大复核和信任代价。')],
    [1975, '供应商、银行和股东都要求先拿钱', '现金流紧张时，工资、税费年金、供应商、到期债务和股东分配不能由最有权的人先拿。',
      opt('priority-ledger', '按法律、合同和生活影响公开付款次序', { knowledge: 3, mind: 4 }, '1975 年公开处理一次现金流紧张。', '工资与必要运营先付，股东分配暂停；供应商得到分期和退出选择。'),
      opt('sell-noncore', '出售非核心自有资产接住工资与债务', { money: -3, position: -1, relation: 2 }, '1975 年出售非核心资产保住经营责任。', '一项扩张计划取消，员工和到期债务按期处理。'),
      opt('delay-wages', '为维持分红先拖员工工资', { money: 4, relation: -5, fame: -3 }, '1975 年曾优先分红并拖欠工资。', '职员集体申诉、两名主管离开；股东返还部分分红补薪。')],
    [1977, '经营规模是否继续扩张', '新场所、酒店房间和交通线路都有机会，债务、员工和顾客伤害记录也在增加。',
      opt('measured-growth', '只扩已有人员、资本和监管能接住的一项业务', { money: 2, knowledge: 2, position: 1 }, '1977 年只完成一项有限扩张。', '新增交通接驳而未增娱乐场规模，投诉与工资仍能按期答复。'),
      opt('harm-review-first', '先复核顾客损失、员工劳损和投诉再决定', { relation: 3, fame: 2, money: -1 }, '1977 年以社会代价复核决定扩张边界。', '董事会取消一项高收入方案，增设求助转介和职员休息。'),
      opt('rapid-expansion', '同时扩酒店、场所和交通以抢占机会', { money: 5, health: -3, relation: -3 }, '1977 年曾同时快速扩张。', '债务、培训和投诉答复失衡；次年缩减两项计划。')],
    [1979, '子女与亲属是否自动接班', '家人有人愿意进公司，也有人有自己的职业和家庭。股份继承、职业资格、董事席位与亲情不是一件事。',
      opt('open-recruitment', '让家人与外部候选人按相同岗位试做和考核', { relation: 3, knowledge: 2 }, '1979 年以公开岗位选择接班人。', '一名家人通过、一名职业经理胜出、一名亲属退出；结果逐项记录。'),
      opt('family-share-no-job', '可依法处理股份，但不自动给经营职位', { mind: 3, relation: 2 }, '1979 年把家族股份与职业职位分开。', '家人保留投资选择，经理继续按能力负责；冲突进入股东协议。'),
      opt('appoint-relative', '直接任命亲属管理重要业务', { position: 2, relation: 1, fame: -2 }, '1979 年曾未经考核任命亲属。', '一项供应合同出现利益冲突，董事会要求回避并撤职。')],
    [1981, '专营合同调整前怎样面对未来不确定', '监管、合同与社会要求正在变化。大经营者也不能把续约、权力或家族地位当成确定事实。',
      opt('scenario-plans', '分别准备续约、缩减、交接和失去经营权方案', { knowledge: 4, mind: 3 }, '1981 年准备多种合同结局。', '员工、客户、债权人和股东各有承接表；没有把续约写成必然。'),
      opt('independent-audit', '在谈未来前完成资产、债务、投诉和合同审计', { money: -2, position: 2, mind: 2 }, '1981 年完成独立经营审计。', '审计揭示两项关联交易和一项未结申诉，先整改再谈未来。'),
      opt('assume-permanent', '按永久经营继续借债扩张', { money: 4, mind: -4, position: -2 }, '1981 年曾把专营权当作永久安排。', '债权人要求额外担保，董事会暂停工程并重估期限风险。')],
    [1983, '晚年怎样交出一间带有巨大权力和代价的企业', '你的身体、股东关系、员工职业、顾客记录、债务与合同都需要承接；“赌王”称号不能替代这些事实。',
      opt('governed-handover', '按合同和董事会程序交给职业团队，保留监督期限', { health: 3, relation: 3, position: -1 }, '1983 年完成有期限的职业治理交接。', '你退出日常签字，何惠兰与经理团队接任；家人只保留实际股份和自愿角色。'),
      opt('reduce-and-repair', '先缩减高伤害与高债务业务，再逐项交接', { fame: 2, mind: 4, money: -2 }, '1983 年先缩减并修复后交接。', '一处业务关闭、员工获转岗或补偿、顾客申诉继续处理；企业规模变小。'),
      opt('family-control', '把主要权力直接交给家族成员', { relation: 1, position: 2, fame: -3 }, '1983 年曾试图直接家族交权。', '其他股东、经理和监管方提出异议；最终仍需按章程重做交接。')]
  ];

  installDomainDecisions('D42', 'identity', ROUTE_IDENTITY, identity);
  installDomainDecisions('D47', 'finance', ROUTE_FINANCE, finance);
  installDomainDecisions('D48', 'concession', ROUTE_CONCESSION, concession);

  function scene(field, route, id, title, text) {
    C.ordinaryEvents.push({ id: id, title: title, text: text, routes: [route], minAge: 13, priority: 21,
      sourceIds: sourceIds[field].slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review' });
  }

  [
    ['d42-s01', '高风险身份必须从一次主动选择开始', '公开工作、入党、外围事务、秘密联络和双重身份彼此不自动生成；只有 1937 年明确接受高风险工作才进入本线。'],
    ['d42-s02', '公开职业必须真实完成', '老板、工资、同事、顾客和差错逐项存在；它不是一句万能掩护，也不会因秘密经历自动升职。'],
    ['d42-s03', '任务只写边界与后果', '系统不展示暗号、路线、藏匿、跟踪、规避查验、破坏或伤害操作，只记录请求、拒绝、压力、身体和关系后果。'],
    ['d42-s04', '家人不是掩护和工具人', '家人只需知道自己生活所需的风险范围，可独立搬走、工作、拒绝联系或结束关系。'],
    ['d42-s05', '机构记录不等于人物真相', '调查材料、当事人口述、家书、工资簿和后来消息并列，权力更大的一方不能自动成为唯一事实。'],
    ['d42-s06', '拘留不做忠诚小游戏', '系统记录说了什么、在何种压力下、身体怎样、谁受影响与仍未知什么，不用数值判英雄或叛徒。'],
    ['d42-s07', '错误信息会伤到具体的人', '停工、问话、搬家、关系中断和失联分别确认，更正纸面也不能撤回真实代价。'],
    ['d42-s08', '退出是一条完整人生', '可以拒绝、交接、退出、恢复普通职业与家庭；旧暴露、健康和关系不会一键清零。'],
    ['d42-s09', '组织身份与高风险工作分开', '成员可拒绝秘密工作，无党派者也可能被单次联络；任何一种都需独立过程和明确选择。'],
    ['d42-s10', '男女都可能进入也承受不同门槛', '女性常被低估或被期待利用家庭关系，男性常被推向外勤和沉默；两者均可管理、拒绝、退出和留下异议。'],
    ['d42-s11', '1949 后不是统一答案', '不同落点对履历有不同处理，求职、登记、家庭、旧关系和档案分别发生。'],
    ['d42-s12', '晚年不留下传奇定论', '亲历、转述、机构记录、后来确认、伤害、退出和未知同在；真实人物姓名不被合成角色占用。'],
  ].forEach(function (row) { scene('identity', ROUTE_IDENTITY, row[0], row[1], row[2]); });

  [
    ['d47-s01', '金融经营从受薪账务和有限资本开始', '多年核账只提供入场经验；仍需股本、章程、许可、股东、员工和客户，不能一键成为银行家。'],
    ['d47-s02', '客户钱不是老板钱', '存款、汇款、保费和受托款与股本、准备、利润和家产分账，任何高收益机会都不能越过。'],
    ['d47-s03', '董事会必须真有异议和回避', '亲属贷款、关联投资、分红和增资要披露利益、留下反对票并指定执行人。'],
    ['d47-s04', '贷款会被拒绝也会形成坏账', '申请、调查、担保、批准、拨付、还款、展期、减值、和解与清理是不同状态。'],
    ['d47-s05', '保险要追到实际理赔', '保单、缴费、事故、损失调查、核赔、实付和申诉分别保存，不用“投保”代替结果。'],
    ['d47-s06', '挤兑首先是偿付与信任压力', '准备、现金、到期债务、提款队伍和可变现资产共同决定结果，高账面利润不能替代流动性。'],
    ['d47-s07', '女性能成为经理、董事与股东', '职位、工资、签字和责任按实际工作匹配，婚姻与家族关系不是资格或天然否决。'],
    ['d47-s08', '企业家不会独自完成一生', '员工、客户、借款人、保险人、股东、债权人、监管人与家人都有自己的决定和退出。'],
    ['d47-s09', '制度和地域会改变牌照', '大陆、香港、台湾、澳门、新加坡与其他落点不能沿用同一个旧称号，业务必须按当地重新核。'],
    ['d47-s10', '大企业也可能缩小、合并或清理', '坏账、资本不足、接管、牌照变化和身体都会改变公司，不用财富排名评价一生。'],
    ['d47-s11', '家人不自动继承职位', '股份、职业、董事席位与亲情分开；子女可试做、拒绝或另有职业。'],
    ['d47-s12', '历史银行只提供制度背景', '玩家公司、股东和客户全部合成，不占用真实银行的董事、股东、贷款或经营成绩。'],
  ].forEach(function (row) { scene('finance', ROUTE_FINANCE, row[0], row[1], row[2]); });

  [
    ['d48-s01', '抵达澳门不等于得到经营权', '旅店、交通、商贸或金融经验要长期积累，1961—1962 公开竞投窗口还需资本、信用、治理和合同方案。'],
    ['d48-s02', '合成角色不冒充真实赌王', '史实公开竞投、新财团中标和专营制度不变；玩家只占合成叙事中的主要经营槽，不使用真实股东姓名。'],
    ['d48-s03', '专营权有范围、期限和义务', '酒店、旅游、交通、年金、场所、监管与社会责任逐项履行，中标不是永久私人权力。'],
    ['d48-s04', '成为大经营者仍要做具体工作', '每天有房间、住客、餐食、行李、员工、供应商、投诉和结算，不用“经营酒店”概括一年。'],
    ['d48-s05', '博彩不做玩法教学', '系统不展示赔率、投注策略、诱导技巧、洗钱或规避监管，只呈现许可、劳动、债务、顾客伤害和社会代价。'],
    ['d48-s06', '顾客不是收入数字', '欠款、自我限制、家庭求助、医疗或社会转介与申诉分别发生，企业必须对实际经营边界负责。'],
    ['d48-s07', '员工不是专营权附属物', '工资、班次、住处、身体、晋升、投诉和离开进入账本；女性能进入最高管理而非只做接待。'],
    ['d48-s08', '主角不是唯一控制者', '其他股东、董事、经理、员工、债权人、供应商、监管方和公众均能提出异议或阻止越界。'],
    ['d48-s09', '酒店开业也可能超支与延期', '工程、银行债、供应商、工资和开业日分别回答，宏伟建筑不会抹去拖欠。'],
    ['d48-s10', '利润不能先于所有责任', '工资、税费年金、必要运营、到期债务、供应商和股东分配按制度与生活影响排序。'],
    ['d48-s11', '子女不自动成为下一代赌王', '股份、职业能力、董事席位和家庭关系分开，职业经理与家人按同一程序进入。'],
    ['d48-s12', '企业晚年也有事实结局', '交接、缩减、失去经营权、合并或清理都是可能结果，不用成功失败评价。'],
  ].forEach(function (row) { scene('concession', ROUTE_CONCESSION, row[0], row[1], row[2]); });

  C.routeCareerProfiles = C.routeCareerProfiles || {};
  C.routeCareerProfilesByGender = C.routeCareerProfilesByGender || {};
  var identityBase = {
    kind: 'dual-identity-with-real-public-work', role: '公开职业劳动者与高风险联络经历当事人',
    workplace: '上海合成商号、学校、工场或公共服务岗位及各自真实日常', employer: '只对公开岗位工资与差错负责的合成雇主',
    supervisor: '公开岗位主管陈淑珍', colleague: '有自己工资、家庭、判断与离开权的同事顾景和', publicPerson: '要求了解自己为何受影响的周玉兰',
    terms: '公开岗位按月或按班领薪；高风险事项逐次同意、可拒绝或退出，不领取万能身份与无限任务权',
    duties: '先完成真实公开职业，只在明确选择后承担有范围的高风险联络；记录请求、压力、家人、拘留、误伤、退出与后来确认，不提供现实隐蔽或伤害方法',
    scenes: ['陈淑珍要求你补完一笔公开账和同事代班钱。', '顾景和对一份未经证实的指认提出异议。', '周玉兰只要求查看与自己停工直接相关的材料。'],
  };
  var financeBase = {
    kind: 'licensed-finance-insurance-investment-business', role: '汇兑、保险与实业投资股份企业经营董事',
    workplace: '合成侨安汇兑保险与实业投资股份社的账台、董事室与客户柜', employer: '本人和多名合成股东共同治理的持牌股份企业',
    supervisor: '按章程、牌照与董事会复核的周仁和', colleague: '有实缴股份、经理工资、独立签字与退出权的林素英', publicPerson: '会申请、被拒、还款、展期并申诉的客户陈启明',
    terms: '股本、客户款、保费、受托款、准备、工资和家产分账；贷款、理赔、投资、分红、坏账与清理均有会议和答复',
    duties: '主持资本和董事会治理，核客户资金、贷款、保险、准备、员工、关联交易与监管；不能把银行家称号变成私人动用客户款的权力',
    scenes: ['林素英要求职位、工资和实际签字责任相符。', '陈启明的贷款获缩额而非熟人全额放款。', '方美真对火险理赔的未决部分继续申诉。'],
  };
  var concessionBase = {
    kind: 'source-bounded-tourism-entertainment-concession-business', role: '澳门旅业、娱乐与专营企业主要经营股东及工作董事',
    workplace: '澳门合成酒店、旅游交通、持牌娱乐场与董事会网络', employer: '合成澳门海莲旅游娱乐股份公司（合成叙事）',
    supervisor: '按公开合同和监管答复的唐守文', colleague: '有独立股份、酒店治理权、工资与异议权的何惠兰', publicPerson: '会请求停止信用、处理欠款并保留申诉的顾客刘家安',
    terms: '只在 1961—1962 公开竞投史实窗口、澳门实际落脚、长期行业经验、资本信用与共同治理门槛同时满足后进入；专营合同有范围、监督、年金、酒店旅游义务和交接',
    duties: '经营酒店、旅游、交通和获批场所，核员工、顾客伤害、债务、股东、工程、监管和社会义务；不展示博彩玩法或冒充真实历史股东',
    scenes: ['何惠兰要求进入最高经营会议并按责任领薪。', '刘家安提出停止场内信用和债务转介。', '唐守文要求公司逐项答复合同、员工与投诉。'],
  };
  Object.assign(C.routeCareerProfiles, {
    'high-risk-double-identity': identityBase,
    'banking-investment-insurance-owner': financeBase,
    'macao-tourism-entertainment-concession': concessionBase,
  });
  C.routeCareerProfilesByGender[ROUTE_IDENTITY] = {
    男: Object.assign({}, identityBase, { role: '公开商号／工场劳动者与高风险联络经历当事人', duties: identityBase.duties + '。时代处境：较常被推向外勤、夜间和沉默，也必须完成账务、照料、家人沟通和伤害答复；男性身份不生成勇敢或忠诚' }),
    女: Object.assign({}, identityBase, { role: '公开文书／教育／商号劳动者与高风险联络经历当事人', duties: identityBase.duties + '。时代处境：较常被低估为家属、文书或天然掩护，也能管理、判断、拒绝和退出；家庭关系不变成无偿风险工具' }),
  };
  C.routeCareerProfilesByGender[ROUTE_FINANCE] = {
    男: Object.assign({}, financeBase, { role: '金融股份企业经营董事与信贷投资负责人', duties: financeBase.duties + '。时代处境：较易接近柜台和董事室，也必须接受共同表决、回避和客户资金边界；男性不自动拥有全部公司' }),
    女: Object.assign({}, financeBase, { role: '保险、客户资金与金融股份企业经营董事', duties: financeBase.duties + '。时代处境：较常从家庭账、保险和文书进入并遭遇签字门槛，也能成为实缴股东、经理和董事；职位工资按实际责任确认' }),
  };
  C.routeCareerProfilesByGender[ROUTE_CONCESSION] = {
    男: Object.assign({}, concessionBase, { role: '澳门合成旅业娱乐专营财团主要经营股东与工作董事', duties: concessionBase.duties + '。时代处境：较常被推到资本、交通和公开谈判，也必须核酒店基层、顾客伤害、家人和照料；不能成为唯一“赌王”' }),
    女: Object.assign({}, concessionBase, { role: '澳门合成酒店旅游与持牌娱乐企业主要经营股东及工作董事', duties: concessionBase.duties + '。时代处境：较常从酒店、账务和接待被低估，也能进入资本、竞投、最高经营会议和交接；婚姻不替代股份与治理资格' }),
  };

  Object.assign(C.routeContactProfiles, {
    'high-risk-double-identity': [
      { id: 'd42_lu_wenqing', label: '陆文清', role: '只说明本次请求范围、能够拒绝与是否结束的合成联系人', status: 'distant', relation: 22, born: 1897 },
      { id: 'd42_chen_shuzhen', label: '陈淑珍', role: '只对公开职业班次、工资、差错和留用负责的女主管', status: 'supervisor', relation: 27, born: 1895 },
      { id: 'd42_gu_jinghe', label: '顾景和', role: '有自己公开工作、家口、陈述、拒答与申诉的同事', status: 'coworker', relation: 29, born: 1903 },
      { id: 'd42_fang_huiru', label: '方惠如', role: '会独立决定住处、工作、关系与是否知道风险范围的家人', status: 'nearby', relation: 31, born: 1908 },
      { id: 'd42_zhou_yulan', label: '周玉兰', role: '曾受停工与问话影响、能查看本人记录并留下异议的人', status: 'nearby', relation: 25, born: 1906 },
      { id: 'd42_tang_mingshu', label: '唐明述', role: '晚年只按亲历、档案、转述与未知整理材料的经手人', status: 'distant', relation: 20, born: 1915 },
    ],
    'banking-investment-insurance-owner': [
      { id: 'd47_lin_suying', label: '林素英', role: '有实缴股份、经理工资、独立签字、董事表决和退出权的保险经理', status: 'coworker', relation: 31, born: 1904 },
      { id: 'd47_zhou_renhe', label: '周仁和', role: '按章程主持利益冲突回避、贷款与投资表决的股东董事', status: 'supervisor', relation: 24, born: 1893 },
      { id: 'd47_chen_qiming', label: '陈启明', role: '会申请、补件、被拒、还款、展期和申诉的实业借款人', status: 'nearby', relation: 23, born: 1901 },
      { id: 'd47_fang_meizhen', label: '方美真', role: '只签实际获赔部分并追问争议的保险客户', status: 'nearby', relation: 27, born: 1907 },
      { id: 'd47_ma_dean', label: '马德安', role: '逐日核准备、现金、提款次序与可变现资产的财务主管', status: 'colleague', relation: 26, born: 1899 },
      { id: 'd47_xu_minglan', label: '许明兰', role: '核工资、双人复核、客户投诉和职员休息的柜台主管', status: 'coworker', relation: 28, born: 1911 },
    ],
    'macao-tourism-entertainment-concession': [
      { id: 'd48_he_huilan', label: '何惠兰', role: '有独立实缴股份、酒店治理、经理工资、董事表决和退出权的合成女股东', status: 'coworker', relation: 31, born: 1912 },
      { id: 'd48_liang_jinghe', label: '梁景和', role: '以旅业交通资产、债务责任和章程参与治理的合成股东', status: 'colleague', relation: 26, born: 1901 },
      { id: 'd48_ma_dechang', label: '马德昌', role: '只按资本、债务、独立预算和股东决议签字的合成财务股东', status: 'colleague', relation: 24, born: 1898 },
      { id: 'd48_mai_suying', label: '麦素英', role: '会核工资、班次、员工伤病、晋升、投诉和离开的酒店职员主管', status: 'coworker', relation: 29, born: 1918 },
      { id: 'd48_liu_jiaan', label: '刘家安', role: '能请求停止信用、处理欠款、求助和申诉的顾客', status: 'nearby', relation: 22, born: 1910 },
      { id: 'd48_tang_shouwen', label: '唐守文', role: '只按公开合同、许可、投诉和答复期限进行复核的合成监管经手人', status: 'distant', relation: 20, born: 1905 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'high-risk-double-identity': ['公开工作、迟归、奔走与不定时休息造成的头痛、胃痛、腰腿和长期疲劳', '拘留、伤痛、营养与医疗中断造成的旧伤、反复发热和身体功能下降', '暴露、恐惧、误伤、失联、内疚与家庭冲突造成的失眠、惊醒、回避和耗竭'],
    'banking-investment-insurance-owner': ['久坐核账、长时会议、昏暗照明和出差造成的眼痛、肩颈、手腕与腰背劳损', '集中提款、坏账、理赔争议、监管与资本压力造成的失眠、胃痛、胸闷和耗竭', '客户冲突、关联关系和创办人控制造成的焦虑、易怒与家庭工作边界破裂'],
    'macao-tourism-entertainment-concession': ['酒店巡查、夜间营业、长期会议和交通往返造成的失眠、腰腿、心悸与慢性疲劳', '餐饮、拥挤场所、烟气、噪声和跨班劳动造成的呼吸、胃肠、听力与血压问题', '巨额债务、员工投诉、顾客伤害、股东冲突、监管与公众声望造成的焦虑、内疚和耗竭'],
  });

  Object.assign(C.publicRouteProfiles, {
    'high-risk-double-identity': { publicGroup: '合成的个人公开职业、高风险经历、拘留压力、退出与后来追认材料簿', publicRole: '只核本人真实公开岗位、工资、同事、客户和可说明的公共事务', covertRole: '高风险身份只由 1937 年明确选择生成，不由党籍、职业、家庭、救济或识字工作自动生成', infiltrationRole: '不提供暗号、秘密路线、藏匿、跟踪、甄别、审讯规避、破坏或伤害操作；只写范围、选择、压力与后果', contact: { id: 'public_d42', label: '沈静和', role: '只按来源登记公开履历、个人异议、后来确认和未知的经手人', status: 'colleague', relation: 20, born: 1902 } },
    'banking-investment-insurance-owner': { publicGroup: '合成的金融企业牌照、资本、客户、董事会、职员与申诉公开簿', publicRole: '核许可范围、客户资金、贷款、理赔、准备、股东表决、工资与监管答复', covertRole: '银行、投资、保险、侨汇和客户关系不自动生成党籍、秘密联络、政治融资或情报身份', infiltrationRole: '不利用账户、贷款、保单、客户资料或企业关系提供现实隐蔽、追踪、洗钱、欺诈或规避监管方法', contact: { id: 'public_d47', label: '郑安和', role: '登记金融企业许可、客户申诉、董事会异议和清理答复的经手人', status: 'colleague', relation: 20, born: 1900 } },
    'macao-tourism-entertainment-concession': { publicGroup: '合成的澳门旅业娱乐专营合同、员工、顾客伤害、债务与申诉公开簿', publicRole: '核公开竞投、合同义务、酒店旅游、许可、年金、员工、顾客、债务、投诉和交接', covertRole: '旅店、交通、商贸、金融或娱乐场经营不自动生成政治身份、秘密资金、黑社会或现实历史人物关系', infiltrationRole: '不展示博彩玩法、赔率、诱导、洗钱、暴力、追债、规避监管或伤害操作；只写制度、劳动与社会代价', contact: { id: 'public_d48', label: '梁安澜', role: '登记专营合同、员工与顾客申诉、债务和社会义务答复的经手人', status: 'colleague', relation: 20, born: 1910 } },
  });

  C.post1949RouteJobs = C.post1949RouteJobs || {};
  var destinations = Object.keys(C.post1949Paths);
  var places = {
    mainland: ['当地合成公开履历与档案整理岗位', '当地合成金融结算、保险文书与企业财务机构', '离开澳门后当地合成旅店旅游企业治理顾问处'],
    'hong-kong': ['香港合成商号、学校或社会服务文书岗位', '香港合成持牌银行、保险与投资企业', '香港合成酒店、旅游交通与娱乐企业总部'],
    taiwan: ['台湾合成公开机构档案与普通职业岗位', '台湾合成银行、保险与企业投资机构', '台湾合成酒店旅游与娱乐企业顾问处'],
    overseas: ['落脚城市合成公开职业与个人档案整理岗位', '落脚城市合成持牌金融保险企业', '落脚城市合成酒店旅游与娱乐企业'],
    'in-motion': ['当前落脚地合成临时文书与公开求职案桌', '当前落脚地合成临时会计、保险文书案桌', '当前落脚地合成旅店柜台、交通账务与合同整理岗位'],
    unsettled: ['暂住地合成公开文书与个人材料整理岗位', '暂住地合成会计、理赔与客户答复岗位', '暂住地合成旅店、旅游交通与企业清理岗位'],
    macau: ['澳门合成公开职业、档案与社会服务岗位', '澳门合成持牌银行、保险与投资企业', '澳门合成酒店、旅游交通与持牌娱乐企业'],
    'southeast-asia': ['新加坡合成公开商号、学校与社团文书岗位', '新加坡合成持牌银行、保险与投资企业', '新加坡合成酒店旅游、交通与娱乐企业（无澳门专营权）'],
  };
  var people = {
    mainland: [['主管陈淑珍', '同事顾景和', '材料当事人周玉兰'], ['金融负责人周仁和', '保险经理林素英', '客户方美真'], ['旅业负责人何惠兰', '经理麦素英', '住客刘家安']],
    'hong-kong': [['主管梁惠贞', '同事陈景和', '当事人郭玉兰'], ['董事梁仁和', '经理陈素英', '客户麦美真'], ['董事何惠兰', '经理梁素英', '住客陈家安']],
    taiwan: [['主管林淑贞', '同事叶景和', '当事人邱玉兰'], ['董事林仁和', '经理叶素英', '客户吴美真'], ['董事林惠兰', '经理邱素英', '住客叶家安']],
    overseas: [['主管许淑贞', '同事黄景和', '当事人赵玉兰'], ['董事许仁和', '经理黄素英', '客户林美真'], ['董事许惠兰', '经理郑素英', '住客黄家安']],
    'in-motion': [['经手人孟平安', '文书姜静和', '当事人宋玉兰'], ['临时账务人姜仁和', '文书宋素英', '客户秦美真'], ['旅店经手人秦平安', '经理徐素英', '住客孟家安']],
    unsettled: [['主管潘维清', '同事陆景和', '当事人唐玉兰'], ['董事潘仁和', '经理陆素英', '客户冯美真'], ['董事潘惠兰', '经理唐素英', '住客陆家安']],
    macau: [['主管何景鸿', '同事郑景和', '当事人梁玉兰'], ['董事何仁和', '经理郑素英', '客户麦美真'], ['监管经手唐守文', '经理何惠兰', '顾客刘家安']],
    'southeast-asia': [['主管陈文成', '同事林景和', '当事人郭玉兰'], ['董事陈仁和', '经理林素英', '客户黄美真'], ['董事陈惠兰', '经理郭素英', '住客林家安']],
  };
  var routeMeta = {};
  routeMeta[ROUTE_IDENTITY] = ['literate', '公开职业与个人经历档案整理员', '普通文书、会计或求职材料整理员', '只做真实公开职业，并按本人授权整理亲历、机构记录、后来确认、异议与未知；不继续危险身份和操作', '个人材料复核与事实边界带教员', '减少外勤与公开讲述，只整理来源、异议、伤害、退出和未知'];
  routeMeta[ROUTE_FINANCE] = ['literate', '金融、保险与企业投资治理负责人', '临时会计、理赔与客户答复员', '按当地许可核资本、客户款、贷款、保单、准备、董事会、工资、申诉、坏账与清理', '金融内控、理赔与董事会记录顾问', '退出日常签字，复核客户资金、利益冲突、理赔、坏账与交接'];
  routeMeta[ROUTE_CONCESSION] = ['skilled', '澳门合成酒店旅游与持牌娱乐企业主要经营股东及工作董事', '旅店柜台、交通账务与合同整理员', '只在澳门实际批给范围内核酒店旅游、员工、顾客伤害、债务、投诉与合同；其他地点无澳门专营权', '旅业企业员工、顾客与合同治理顾问', '退出夜间经营与日常签字，复核员工、顾客、债务、合同与交接'];
  [ROUTE_IDENTITY, ROUTE_FINANCE, ROUTE_CONCESSION].forEach(function (route, index) {
    C.post1949RouteJobs[route] = {};
    destinations.forEach(function (destination) {
      var meta = routeMeta[route];
      var named = people[destination][index];
      C.post1949RouteJobs[route][destination] = {
        track: meta[0], role: meta[1], casualRole: meta[2], workplace: places[destination][index], duties: meta[3],
        terms: '按实际落点重新核语言、牌照、公开履历、工资、住处与试做；过去身份、旧公司、澳门批给和当前职业分别办理',
        lighterRole: meta[4], lighterDuties: meta[5], supervisor: named[0], supervisorRole: '只按当前岗位、许可、错误、投诉和是否留用给具体答复的人',
        colleague: named[1], colleagueRole: '有自己的工资、股份、专业判断、家庭、异议与离开权的同事', publicPerson: named[2], publicRole: index === 0 ? '决定本人材料、陈述、查看和是否公开的人' : index === 1 ? '能申请、拒绝、还款、理赔和申诉的客户' : '能入住、消费、拒绝、求助、限制信用和申诉的顾客或住客',
      };
    });
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('literate', ROUTE_IDENTITY);
  addRouteToTrack('literate', ROUTE_FINANCE);
  addRouteToTrack('skilled', ROUTE_CONCESSION);

  C.annualRhythms[ROUTE_IDENTITY] = [
    '一份真实公开工作、一个具名同事、家里一次谈话和一项有边界的高风险请求构成一年；秘密身份不吞掉工资与日常。',
    '本轮只记录谁提出什么、你接受或拒绝什么、谁受影响、哪些后来确认与哪些仍未知；不展示现实隐蔽或伤害方法。',
    '退出以后普通工作、疾病、父母、伴侣、朋友和档案继续变化；高风险线不是永远执行任务。',
  ];
  C.annualRhythms[ROUTE_FINANCE] = [
    '客户兑付、贷款、保单、准备、职员工资、董事会和家庭现金流共同构成一年；利润不是唯一结果。',
    '每一笔钱都有主体、用途、权限、到期和申诉，客户资金、股本与个人家产不相互覆盖。',
    '企业会扩张、被拒、遇到挤兑和坏账，也会缩小、合并或清理；老板称号不能跳过制度与人。',
  ];
  C.annualRhythms[ROUTE_CONCESSION] = [
    '酒店房间、住客、员工班次、供应商、债务、顾客伤害、股东会议和专营合同共同构成一年。',
    '本轮只在澳门实际落脚和 1961—1962 史实窗口内取得合成角色经营槽；真实公司和人物不被玩家冒名。',
    '成为大经营者以后仍会生病、与家人争执、被员工与顾客申诉、失去表决或交接经营；不提供博彩玩法教学。',
  ];
  C.sceneFrames[ROUTE_IDENTITY] = [
    { open: '公开岗位的工资差错、家里一次迟归谈话和一份来源不足的材料同时出现。', close: '你只处理自己能证和能决定的一段，受影响者、机构记录与未知分别留下。' },
    { open: '旧联系人、普通雇主和家人提出彼此冲突的要求，身体也已接不住连续奔走。', close: '本轮可以拒绝、减量或退出；公开生活和伤害后果继续进入下一年。' },
  ];
  C.sceneFrames[ROUTE_FINANCE] = [
    { open: '客户提款、保险理赔、职员工资和董事会投资提案在同一日到期，每笔钱却属于不同主体。', close: '你按牌照、账本与表决处理，利润、风险、客户和股东结果分别进入下一年。' },
    { open: '企业声望吸引新业务，也放大准备、坏账、关联交易和员工过劳。', close: '经营者可以扩张或缩小，客户钱、股本、家产与责任仍没有混成一个数字。' },
  ];
  C.sceneFrames[ROUTE_CONCESSION] = [
    { open: '澳门酒店房间、交通接驳、员工工资、顾客求助和专营合同事项同时进入经营会议。', close: '公司只在公开批给范围内继续，员工、顾客、股东、债权人与监管方都留下自己的答复。' },
    { open: '巨额营收与巨额债务同在，公众称号、家族期待和职业经理的判断发生冲突。', close: '你不是唯一控制者；本轮结果落到具体人、合同、申诉、健康与下一次交接。' },
  ];

  C.events.push(
    { id: 'd42-shanghai-record-pressure-1943', year: 1943, eraBrief: true, eraScope: '战时城市调查、拘留与个人生活', routes: [ROUTE_IDENTITY], title: '高风险身份被调查时，机构记录、受压陈述和后来后果不会自动一致', knownThrough: ['conversation', 'letters', 'newspaper'], delta: { health: -3, mind: -2, position: -2 }, knownText: '你知道公开职业受到怀疑后可能出现调查、拘留、问话和失业；系统只记录合成人物的亲历、压力、具体陈述、身体、家人和后来确认，不给忠诚评分。', unknownText: '你先经历缺勤、家人担心和一份机构记录，其他联系人是否安全仍无法确认。', fact: '战时上海等城市存在调查、监视、拘押与审讯档案，单一机构记录不能替代完整个人事实。', historySource: { label: '上海市档案馆：民国时期上海军事警务司法档案指南', url: 'https://www.shda.gov.cn/daly/gczn/202509/t20250919_74646.html' } },
    { id: 'd47-postwar-finance-transition-1946', year: 1946, eraBrief: true, eraScope: '战后金融、保险与通货压力', routes: ['qiaopi-remittance-clerk', ROUTE_FINANCE], title: '战后汇兑、保险和实业融资恢复，却同时面对通货、信用和制度变化', knownThrough: ['newspaper', 'conversation', 'books'], delta: { money: -2, knowledge: 2, mind: -1 }, knownText: '你知道金融企业要重新核资本、准备、客户、贷款、保险、职员与牌照；物价和信用压力会让账面金额迅速失去意义。', unknownText: '客户先来问到款、保单和能否借钱，你还不能从街面热闹判断企业是否有足够准备与合法权限。', fact: '1946—1949 年恶性通货膨胀与制度变动显著影响银行、汇兑、保险、客户和企业经营。', historySource: { label: '中国银行：1912—1949 历史沿革', url: 'https://www.boc.cn/aboutboc/ab7/' } },
    { id: 'd48-macao-concession-company-1962', year: 1962, eraBrief: true, eraScope: '澳门公开竞投与旅业娱乐专营', post1949Choices: ['macau'], title: '公开竞投形成新财团、公司注册与第一批经营，酒店旅游义务继续推进', knownThrough: ['newspaper', 'conversation', 'books'], delta: { network: 2, position: 1, money: -1 }, knownText: '你知道 1961 年公开竞投后新财团中标，1962 年公司注册并开始经营；获得经营角色仍要满足资本信用、合法组织、酒店旅游义务、年金和监督。', unknownText: '旅店、交通和娱乐场出现招工与合作消息，你只能核自己是否已在澳门、具长期经验、资本和共同治理能力，不能从传闻跳成承批人。', fact: '1961 年澳门以公开竞投重新批给幸运博彩专营，1962 年新专营公司注册并开始经营，1970 年旗舰酒店及娱乐场开业。', historySource: { label: '澳门博彩监察协调局：博彩业历史', url: 'https://www.dicj.gov.mo/web/cn/history/index.html' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
