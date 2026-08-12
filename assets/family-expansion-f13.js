// 民国人生 · F13 广东侨乡与侨汇家庭运行时包 v0.7.8
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f13.js');

  C.version = '0.7.8';
  C.familyDecisionKeys.guangdongqiaoxiang = { path: 'qiaoxiang-path', war: 'qiaoxiang-war' };
  Object.assign(C.designRegistry.families.F13, {
    designStatus: 'runtime-reviewed-first-round',
    runtimeStatus: 'playable-verified',
    runtimeFamilyKey: 'guangdongqiaoxiang',
  });
  C.runtimeFamilyDesignMap.guangdongqiaoxiang = 'F13';
  Object.assign(C.legacyRouteDomainMap, {
    'qiaoxiang-local-shop': 'D05',
    'qiaopi-correspondence-clerk': 'D34',
    'qiaopi-remittance-clerk': 'D35',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F13-UNESCO-QIAOPI': {
      label: '联合国教科文组织《侨批与银信》世界记忆名录申报资料',
      url: 'https://media.unesco.org/sites/default/files/webform/mow001/china_qiaopi_and_yinxin.pdf',
      supports: ['侨批包含家书、汇款回执、账簿与递送记录，并记录侨乡家庭经济、情感和社会生活'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F13-GD-QIAOPI-ATLAS': {
      label: '广东省档案馆《侨批档案图鉴》',
      url: 'https://www.da.gd.gov.cn/portal_home/content/8105',
      supports: ['侨批、银信、印章、地名、批局与回执等档案形态'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F13-GD-POSTAL-1929-1949': {
      label: '广东省档案馆《民国时期广东邮政管理局侨批档案选编（1929—1949）》介绍',
      url: 'https://www.da.gd.gov.cn/portal_home/wap/detail/8610',
      supports: ['1929—1949 年侨批与邮政管理衔接的史料范围'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F13-SAAC-QIAOPI': {
      label: '国家档案局侨批档案介绍',
      url: 'https://www.saac.gov.cn/daj/lhgjk/201808/173c0eade22242949126f13ed90af615.shtml',
      supports: ['侨批作为海外华侨与国内眷属之间书信和汇款凭证的档案边界'],
      status: 'source-linked-needs-final-review',
    },
  });

  C.families.guangdongqiaoxiang = {
    key: 'guangdongqiaoxiang',
    name: '广东侨乡与侨汇家',
    born: 1910,
    place: '广东合成侨乡河埠镇',
    defaultSeed: 1310,
    defaultNames: { 男: '梁守信', 女: '梁月清' },
    motif: '父亲在海外做工，母亲守着田地和小铺；家书、汇款、回执、地址和亲人状态必须分开核实，跨海关系不会被一句“断信”或“侨汇”概括。',
    start: { body: 46, knowledge: 25, craft: 29, mind: 42, network: 35, fame: 24 },
    startRes: { money: 21, health: 70, relation: 72, position: 32 },
    subjects: {
      mother: { label: '母亲', status: 'alive', health: 62, agency: 92, note: '田地、小铺、赊账、汇款用途和是否等候丈夫由她本人决定' },
      father: { label: '父亲', status: 'distant', health: 58, agency: 86, note: '在东南亚一处合成商埠做店工；断信、失址、失业与死亡严格分开' },
      spouse: { label: '配偶', status: 'not-met', health: 66, agency: 88, note: '婚后去留、两地工作、账户、生育与双方父母照料逐项协商' },
      household: { label: '同住家口', status: 'together', strength: 59, agency: 85 },
      support: { label: '侨眷、邻里与代写信支持', status: 'kin-and-neighbors', strength: 38, agency: 82 },
      connections: { label: '批局、邮政、钱庄与海外地址门路', status: 'trial-and-records-only', strength: 33, agency: 80 },
      workers: { label: '店员、递送人和账务同事', status: 'separate-duties-and-testimony', strength: 22, agency: 84 },
      ledger: { label: '家书汇款回执、小铺与家庭分账', status: 'separate-records', strength: 42, agency: 88 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 83, note: '不自动出生，也不被默认留乡或出洋接续父母道路' },
    },
    contacts: {
      f13_liang_zhicheng: { label: '梁志成', role: '在海外合成商埠做店工并寄回家书与汇款的父亲', status: 'distant', relation: 53, agency: 86, note: '可换工、失业、改地址、回乡或继续在外；断信绝不自动写成死亡' },
      f13_chen_yuehao: { label: '陈月好', role: '经营小铺、照看田地并决定汇款用途的母亲', status: 'family', relation: 67, agency: 92, note: '保留自己的客户、货架、欠账、劳动和是否随迁的决定' },
      f13_liang_popo: { label: '梁婆婆', role: '熟悉亲族称谓和旧地址、但会忘记近年变化的祖母', status: 'family', relation: 58, agency: 77, note: '她的记忆是线索，不是对远方生死的最终证明' },
      f13_liang_xiuzhi: { label: '梁秀枝', role: '想读书、学代写信或自己申请出洋工作的手足', status: 'family', relation: 49, agency: 94, note: '她有独立申请、工资、婚姻和留乡决定，不是主角的替补照料者' },
      f13_xu_shuicheng: { label: '许水成', role: '按件递送侨批、留下回执与退信原因的水客经手人', status: 'nearby', relation: 25, agency: 82, note: '只回答自己经手的批次，不保证所有路线畅通，也不代替收款人签收' },
      f13_deng_qiwen: { label: '邓绮文', role: '教公开读写、替不识字者代写并复诵全文的女教师', status: 'nearby', relation: 30, agency: 93, note: '代写前由寄信人逐句决定，封口后不把内容转作闲谈' },
    },
  };

  Object.assign(C.routes, {
    'qiaoxiang-local-shop': { name: '侨乡小铺、集市采购与家庭分账', family: 'guangdongqiaoxiang', summary: '在母亲产权和客户边界下做进货、零售、赊账与集市交易，可受薪、有限合伙或独立开柜。' },
    'qiaopi-correspondence-clerk': { name: '侨批书信、地址与回执经办', family: 'guangdongqiaoxiang', summary: '处理公开书信、地址、退件、递送与回执；代写不改写，断信不自动变成死亡。' },
    'qiaopi-remittance-clerk': { name: '银信兑付、汇款凭据与账务核对', family: 'guangdongqiaoxiang', summary: '逐笔核寄款人、收款人、金额、手续费、凭据与是否兑付，不用一笔侨汇概括家庭经济。' },
  });

  C.actions.push(
    { id: 'f13-letter-readback', name: '听家书逐句复诵并认称谓地址', families: ['guangdongqiaoxiang'], minAge: 5, maxAge: 14, spirit: 2, delta: { knowledge: 3, mind: 2, relation: 1 }, channels: ['conversation'], contactEffects: { f13_deng_qiwen: { relation: 2 }, f13_liang_popo: { relation: 1 } }, note: '只认识公开称谓、地址和日期；寄信人的话由本人决定，不替人润色立场。' },
    { id: 'f13-shop-stock-ledger', name: '帮母亲核货架、进价、赊账与售出', families: ['guangdongqiaoxiang'], minAge: 6, spirit: 2, delta: { craft: 2, knowledge: 2, money: 1, relation: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f13_chen_yuehao: { relation: 2 } }, note: '铺货和客户属于母亲经营，不因父亲寄钱就自动归父亲或主角。' },
    { id: 'f13-receipt-match', name: '把汇款凭据、回执和实际到款分开核', families: ['guangdongqiaoxiang'], minAge: 9, spirit: 3, delta: { knowledge: 4, mind: 2, network: 1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f13_xu_shuicheng: { relation: 1 } }, note: '汇款通知、实际兑付、家书到达和寄件人近况不是同一个状态。' },
    { id: 'f13-shop-purchase-sale', name: '核一批进货、损耗、赊账与集市售出', routes: ['qiaoxiang-local-shop'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, money: 2, network: 2, health: -1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f13_he_supplier: { relation: 1 }, f13_luo_customer: { relation: 1 } }, note: '毛收入、进货、损耗、赊账和母亲产权分别记录。' },
    { id: 'f13-shop-customer-answer', name: '给顾客明确货品、价格、欠期与退换答复', routes: ['qiaoxiang-local-shop'], minAge: 17, spirit: 3, careerAction: true, delta: { mind: 2, network: 3, money: 1 }, contactEffects: { f13_luo_customer: { relation: 2 }, f13_chen_yuehao: { relation: 1 } }, note: '每次交易都落到具体顾客和答复，不把一年写成“打理生意”。' },
    { id: 'f13-letter-address-register', name: '登记寄件人、收件人、地址、转递与退件', routes: ['qiaopi-correspondence-clerk'], minAge: 15, spirit: 4, careerAction: true, delta: { knowledge: 4, mind: 2, money: 1 }, subjectDelta: { connections: { strength: 2 }, ledger: { strength: 2 } }, contactEffects: { f13_peng_postal: { relation: 1 }, f13_xu_shuicheng: { relation: 1 } }, note: '只登记公开流转信息，不拆看未授权内容。' },
    { id: 'f13-letter-readwrite-service', name: '按本人原话代写、复诵、封口并记回信日', routes: ['qiaopi-correspondence-clerk'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 3, relation: 2, money: 1 }, contactEffects: { f13_deng_qiwen: { relation: 1 }, f13_mai_sender: { relation: 2 } }, note: '代写人不能替寄信人作重大承诺，也不把隐私变成门路。' },
    { id: 'f13-remittance-proof-check', name: '核寄款人、收款人、金额、手续费与兑付签记', routes: ['qiaopi-remittance-clerk'], minAge: 15, spirit: 4, careerAction: true, delta: { knowledge: 4, mind: 3, money: 1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f13_zhou_accountant: { relation: 2 }, f13_fang_recipient: { relation: 1 } }, note: '处理凭据和账务不等于可动用客户汇款。' },
    { id: 'f13-remittance-dispute', name: '把少款、迟款、退回和未兑付逐项答复', routes: ['qiaopi-remittance-clerk'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, relation: 2, mind: 2, money: 1 }, contactEffects: { f13_zhou_accountant: { relation: 1 }, f13_fang_recipient: { relation: 2 } }, note: '只给可证明部分的结果；一张回执不能证明远方亲人当前安危。' }
  );

  function option(id, label, delta, echo, fact, followTitle, followText, extra) {
    return Object.assign({
      id: id, label: label, delta: delta, echo: echo, fact: fact, endingFact: true,
      followup: { title: followTitle, text: followText },
    }, extra || {});
  }

  function installDecision(item) {
    item.options.forEach(function (choice) {
      var followup = choice.followup;
      C.ordinaryEvents.push({
        id: 'echo-' + choice.echo.replace(/:/g, '-'), title: followup.title, text: followup.text,
        year: item.followYear, priority: 45, requiresEchoes: [choice.echo],
        families: item.families ? item.families.slice() : undefined,
        routes: item.routes ? item.routes.slice() : undefined,
        sourceIds: ['SRC-F13-UNESCO-QIAOPI', 'SRC-F13-GD-QIAOPI-ATLAS', 'SRC-F13-GD-POSTAL-1929-1949', 'SRC-F13-SAAC-QIAOPI'],
        reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete choice.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  installDecision({
    id: 'qiaoxiang-path', year: 1924, followYear: 1925, families: ['guangdongqiaoxiang'], title: '第一段学习怎样落成具体工作',
    prompt: '母亲的小铺、侨批收发处和银信账房各给一段有限试工。你必须问清岗位、经手范围、报酬、负责人、隐私边界和答复日期。',
    options: [
      option('local-shop-trial', '在母亲小铺做进货、零售与赊账试工', { craft: 3, money: 1, relation: 2 }, 'f13:path:shop', '1924 年进入侨乡小铺做有期限试工。', '小铺给出经营边界和留用答复', '陈月好确认你只经手列明的进货、零售和赊账；货架、旧存货和她的客户仍归她本人，次年按月结算劳动。', { route: 'qiaoxiang-local-shop' }),
      option('correspondence-trial', '去侨批收发处学地址、转递与回执登记', { knowledge: 3, network: 2, money: 1 }, 'f13:path:letter', '1924 年进入侨批书信与回执登记试工。', '收发试工给出具名职责', '彭绍文让你核寄收姓名、地址、日期、转递和退件，不拆看未授权内容；女性角色更多从代写与回执台进入。', { route: 'qiaopi-correspondence-clerk' }),
      option('remittance-trial', '去银信经办处学凭据、手续费与兑付核对', { knowledge: 3, mind: 2, money: 1 }, 'f13:path:money', '1924 年进入银信凭据与兑付核对试工。', '账房明确能看和不能动的钱', '周账房只让你核寄款人、收款人、金额、手续费和签记；客户款项、钥匙和最终兑付各有授权，识字没有直接变成掌柜。', { route: 'qiaopi-remittance-clerk' }),
    ],
  });

  installDecision({
    id: 'route-qiaoxiang-local-shop-1929', year: 1929, followYear: 1930, routes: ['qiaoxiang-local-shop'], title: '迟到的汇款和小铺进货怎样分开处理',
    prompt: '父亲的一笔汇款只到通知未实际兑付，小铺又到补货日。母亲要在缩库存、具名借款和等待到款之间作决定。',
    options: [
      option('shop-reduce-stock', '缩减易坏货，只补能够周转的日用品', { money: -1, mind: 3, craft: 1 }, 'f13:shop:reduce', '1929 年在汇款未兑付时缩减小铺库存。', '少进的货对应一段真实生意', '陈月好停进两类易坏货，保留盐、灯油和针线；两名顾客改去别处，月底没有新增债，父亲汇款仍标未兑付。'),
      option('shop-named-kin-loan', '向具名亲族借一笔有期限进货款', { money: 2, relation: -1, mind: 1 }, 'f13:shop:loan', '1929 年借入一笔有债权人与期限的进货款。', '借款买来的货没有变成免费侨汇', '梁二叔写明本金、还款日和不连带母亲田地；你补齐三类货，随后用实际售出逐笔还债，远方汇款仍单独等待。'),
      option('shop-trace-before-purchase', '请经手人追查汇款状态，暂缓大宗进货', { network: 2, money: -2, knowledge: 2 }, 'f13:shop:trace', '1929 年先追查汇款状态并暂缓大宗进货。', '回执只回答钱走到哪一步', '许水成找到上一段递送签记，银信处确认款仍待兑；小铺错过一次低价进货，父亲是否换工和身体如何仍没有答案。'),
    ],
  });

  installDecision({
    id: 'route-qiaoxiang-local-shop-1942', year: 1942, followYear: 1943, routes: ['qiaoxiang-local-shop'], title: '继续受薪、有限合伙还是独立开柜',
    prompt: '你已能独立核进货与客户，但母亲的旧货架、客户和汇款投入仍有明确归属。三条路的产权、债务和工作量不同。',
    options: [
      option('remain-family-shop-wage', '继续按月受薪，母亲保留铺面和存货产权', { money: 2, relation: 2, health: 1 }, 'f13:shop:wage', '1942 年继续在母亲小铺按月受薪。', '受薪工作也有具体经营结果', '你负责每旬进货和二十户赊账，陈月好决定库存与关铺时间；工资、家庭共同支出和她的利润分开入账。'),
      option('family-shop-partnership', '与母亲、秀枝按现金、货架、存货和劳动建立有限合伙', { money: -2, craft: 2, relation: 3 }, 'f13:shop:partnership', '1942 年与母亲、秀枝按现金、货架、存货和劳动建立有限合伙。', '有限合伙完成第一月结账', '陈月好投入自有货架和旧存货，秀枝投入明确现金并保留退伙权，你投入劳动与新进货；工资、分成、坏账和各自财产逐项登记。', { enterpriseStart: { id: 'f13-family-shop', name: '合成月好侨乡日用小铺', kind: 'qiaoxiang-retail-partnership', workplace: '广东合成侨乡河埠镇集市铺位', supplier: '何记日用杂货供货人', product: '盐、灯油、针线与地方日用品', employees: 0, partners: [{ personId: 'parent:mother', role: '货架、旧存货与经营判断合伙人' }, { personId: 'contact:f13_liang_xiuzhi', role: '有限现金与账务合伙人' }], asset: { id: 'shelves-stock', kind: 'retail-shelves-and-stock', description: '陈月好自有货架与三人逐项盘点的日用存货' } } }),
      option('independent-market-counter', '另租集市小柜并承担具名押金与进货债', { money: -4, network: 2, mind: 2 }, 'f13:shop:independent', '1942 年另租小柜并登记押金与首批进货债。', '独立开柜没有继承母亲的客户', '你只带走自己购入的工具和两名同意转介的顾客；押金、供货债、坏损和每日现金分别入账，母亲小铺继续由她决定。', { enterpriseStart: { id: 'f13-independent-counter', name: '合成守月日用小柜', kind: 'sole-market-counter', workplace: '广东合成侨乡河埠镇集市小柜位', supplier: '何记日用杂货供货人', product: '日用品与代写购物清单', employees: 0, asset: { id: 'counter-stock', kind: 'counter-and-retail-stock', description: '自购小柜、量具和首批有来源日用存货' }, debt: { id: 'opening-stock', creditor: '何记日用杂货供货人', purpose: '柜位押金与首批进货' } } }),
    ],
  });

  installDecision({
    id: 'route-qiaopi-correspondence-clerk-1929', year: 1929, followYear: 1930, routes: ['qiaopi-correspondence-clerk'], title: '地址失效以后怎样处理书信和亲人状态',
    prompt: '一封给父亲的信退回“地址不详”，同批另一封已有回执。退信只能说明该地址失效，不能替远方补写失业、失踪或死亡。',
    options: [
      option('letter-forward-public-addresses', '经已知批局、邮局和亲友地址逐站转询', { knowledge: 3, network: 2, money: -1 }, 'f13:letter:forward', '1929 年经公开地址逐站转询父亲的新址。', '多站转询得到有限新消息', '第二站确认父亲已离开原店，第三站只留下可能的新商号；家书尚未送达，人物状态仍标远方失址而非死亡。'),
      option('letter-returning-traveler', '请具名归乡人只转交自己的询问信', { relation: 2, money: -1, mind: 2 }, 'f13:letter:traveler', '1929 年托具名归乡人转交一封询问信。', '口信提供线索但不是最终证明', '归乡人记得父亲半年前换过街区，却不知道现状；你保存他的姓名、见面时间和原话，等待直接回信或下一份可核凭据。'),
      option('letter-stop-spending-keep-unknown', '暂停按预期汇款花钱，同时保留父亲状态未知', { money: 1, mind: 3, relation: -1 }, 'f13:letter:unknown', '1929 年暂停依赖未到汇款并保留父亲状态未知。', '家庭预算改变而生死没有被杜撰', '母亲缩减一项进货，秀枝继续读半日书；退信、未到款、父亲最后地址和最后确知在世日期分别保存在账。'),
    ],
  });

  installDecision({
    id: 'route-qiaopi-correspondence-clerk-1942', year: 1942, followYear: 1943, routes: ['qiaopi-correspondence-clerk'], title: '通信中断时保留哪些可验证工作',
    prompt: '部分跨海路线中断，积压信件增加。你可以做退件与地址清理、转入本地邮务，或减少班次照料家人；都不能把未知内容补成戏剧。',
    options: [
      option('letter-return-register', '逐封登记退件原因、最后地址和下一次查询日', { knowledge: 3, mind: 2, money: 1 }, 'f13:letter:return', '1942 年专做积压退件与地址登记。', '退件簿保住了未知的边界', '你处理四十七封退件，只把地址失效、路线中断和收件人拒收分别标记；没有一封因多年未达被直接改成死亡通知。'),
      option('letter-local-postal-work', '转入有班表的本地收发与回执岗位', { money: 1, position: 1, network: 2 }, 'f13:letter:local', '1942 年转入本地公开收发与回执岗位。', '本地邮务给出清楚班表', '彭绍文确认你只收发本县公开邮件、核回执和退件；跨海积压另册保存，收入降低但工作没有消失。'),
      option('letter-reduced-hours-care', '减少收发班次并与家人分担店务和照料', { relation: 3, money: -2, health: 1 }, 'f13:letter:care', '1942 年减少收发班次并逐人协商照料。', '少做的班次没有吞掉家人的人生', '母亲保留小铺上午生意，秀枝只接自己同意的代写时段，伴侣继续原工作；你每周三日清理退件并留下复班日期。'),
    ],
  });

  installDecision({
    id: 'route-qiaopi-remittance-clerk-1929', year: 1929, followYear: 1930, routes: ['qiaopi-remittance-clerk'], title: '金额不符时先回答哪一段',
    prompt: '方婶的通知金额与实际兑付差一截。寄款、换算、手续费、分批兑付和签收都有可能，但你只能从凭据回答。',
    options: [
      option('money-check-each-entry', '逐项核原金额、换算、手续费、到款与签收', { knowledge: 4, mind: 2, money: 1 }, 'f13:money:entries', '1929 年逐项复核一笔金额不符的银信。', '少款原因得到可证明答复', '周账房查出一段手续费和一次分批兑付，仍有一小段待上游回函；方婶先领已确认部分，没有被要求签收全部。'),
      option('money-pay-confirmed-part', '先兑付无争议部分，余款另立待查单', { relation: 3, money: -1, position: -1 }, 'f13:money:partial', '1929 年先兑付无争议部分并另立余款待查。', '部分兑付没有抹去争议', '方婶按实际领取签字，余款、查询人和答复日期另列；你因此多做一旬核账，不能动用别人的款补差。'),
      option('money-refuse-blank-signature', '拒绝让收款人空白签收，要求经办人补齐凭据', { mind: 3, money: -2, position: -1 }, 'f13:money:refuse', '1929 年拒绝空白签收并要求补齐凭据。', '拒签带来停班也留下责任边界', '你被停一周账台，随后调到回执整理；方婶未被写成已经全额收款，缺失金额继续由具名经办人回答。'),
    ],
  });

  installDecision({
    id: 'route-qiaopi-remittance-clerk-1942', year: 1942, followYear: 1943, routes: ['qiaopi-remittance-clerk'], title: '路线不稳时怎样处理汇款、家庭预算和岗位',
    prompt: '到款时间拉长，一笔高价代兑又没有清楚凭据。继续核公开账、转做本地商号账务或离开不明代兑，都要写清下一份工作。',
    options: [
      option('money-documented-remittance-only', '只处理来源、金额、收款人与回执可核的汇款', { mind: 2, money: -1, position: 1 }, 'f13:money:documented', '1942 年只处理凭据完整的汇款。', '少做的业务对应清楚边界', '你拒掉三笔无原单代兑，收入下降；二十一笔公开汇款逐项答复，父亲来款是否到达仍不代表他当前身体和岗位。'),
      option('money-local-merchant-ledger', '转入本地商号做受薪往来账与采购核对', { knowledge: 2, network: 2, money: 1 }, 'f13:money:local', '1942 年转入本地商号受薪账务岗位。', '换工作以后仍有老板和具体职责', '何掌柜给出六周班表，你核进货、赊账和付款日，不经手客户侨汇；旧银信争议由周账房继续答复。'),
      option('money-leave-unclear-exchange', '拒绝不明代兑并转做公开回执与家庭账务', { money: -2, position: -1, mind: 3 }, 'f13:money:leave', '1942 年离开不明代兑，转做公开回执与家庭账务。', '离开账台后不是空白一年', '邓绮文转介六户侨眷做回执和家庭预算，你按件收钱；没有掌柜头衔，也不能替客户保管未授权现金。'),
    ],
  });

  installDecision({
    id: 'qiaoxiang-war', year: 1937, followYear: 1938, families: ['guangdongqiaoxiang'], title: '通信与汇款不稳时怎样保存家庭事实',
    prompt: '跨海路线、工作与住处都在变化。父亲来信、汇款状态、母亲小铺、秀枝计划、伴侣岗位和每个人地址必须分别确认。',
    options: [
      option('split-address-and-accounts', '家人按各自工作保留地址、账户与下次核信日', { network: 2, relation: 1, mind: 3 }, 'f13:war:split', '1937 年家人分别保存地址、账户和下次核信日期。', '分开记录没有拆散所有关系', '母亲保留小铺账，秀枝保留代写收入，伴侣保留自己的岗位；父亲最后地址、最后来信和最后兑付分别更新，一处失效不覆盖其余事实。', { warTurn: 'split-address-and-accounts' }),
      option('trace-through-public-channels', '经批局、邮政、亲友与回执多路追查', { knowledge: 2, network: 3, money: -2 }, 'f13:war:trace', '1937 年经公开渠道追查，并把汇款、书信、地址和父亲状态分别标记。', '多路追查只补上能够证明的部分', '邮政答复路线中断，旧批局确认最后一笔已兑，亲友只见过父亲半年前仍在工作；当前地址继续未知，没有断信即死亡。', { warTurn: 'trace-through-public-channels' }),
      option('protect-local-life-keep-unknown', '先维持本地生计，停止预支未到汇款并保留未知', { money: 1, relation: -1, mind: 2 }, 'f13:war:local', '1937 年先维持本地生计，不预支未到汇款。', '本地日常继续，远方仍待确认', '小铺缩库存，收发处减少班次，家中按现有收入排支出；父亲没有因剧情需要突然归来或死亡，下一次查询日期进入事实账。', { warTurn: 'protect-local-life-keep-unknown' }),
    ],
  });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['guangdongqiaoxiang'], priority: 12,
      sourceIds: ['SRC-F13-UNESCO-QIAOPI', 'SRC-F13-GD-QIAOPI-ATLAS', 'SRC-F13-GD-POSTAL-1929-1949', 'SRC-F13-SAAC-QIAOPI'],
      reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }

  scene('f13-s01', '父亲的信和钱不是同一天到', '陈月好先收到一封旧地址转来的家书，三日后才见汇款通知，实际兑付还要再等。信、通知、到款和父亲近况从出生起就是四项事实。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f13-s02', '母亲的小铺不是侨汇附属品', '陈月好清点盐、灯油和针线，说明哪些用她自己的积蓄进货，哪些用父亲上次汇款。两笔钱共同养家，却没有抹掉经营人和用途。', { minAge: 3, maxAge: 6, priority: 23 });
  scene('f13-s03', '祖母记得旧称谓却不知新地址', '梁婆婆能说出父亲信里的亲族称谓，却把两处旧商号混在一起。邓绮文把她的原话写成线索，不把记忆误差写成确定地址。', { minAge: 5, maxAge: 8, priority: 22 });
  scene('f13-s04', '三种童年时间撞在一起', '认家书、核小铺货架和帮秀枝做家务排在同一下午。你只能先做一项，母亲和秀枝分别决定余下工作，不默认女孩承担全部。', { minAge: 6, maxAge: 10, priority: 21 });
  scene('f13-s05', '汇款通知不能拿来直接买货', '一张通知写着金额，但银信处尚未兑付。母亲取消一批易坏货，保留能周转的日用品；家庭没有把未来的钱提前写进资产。', { minAge: 8, maxAge: 12, priority: 21 });
  scene('f13-s06', '代写以前先由寄信人决定', '邓绮文替一位不识字的侨眷写信，每写一段就复诵确认。她拒绝替对方加入没说过的请求，也不把信中争吵讲给街坊。', { minAge: 10, maxAge: 14, priority: 20 });
  scene('f13-s07', '秀枝也可以申请自己的道路', '梁秀枝想读书、学代写信，后来也可能自己申请出洋工作。她的申请、工资和风险都属于她，不是父亲叫一声就由你替她决定。', { minAge: 11, maxAge: 15, priority: 20 });
  scene('f13-s08', '三份试工都列明经手边界', '小铺、侨批收发和银信账房分别说明岗位、报酬、能看的凭据、不能动的钱与答复日；没有一份介绍提前变成正式职业。', { year: 1924, routes: ['qiaoxiang-local-shop', 'qiaopi-correspondence-clerk', 'qiaopi-remittance-clerk'], priority: 28 });
  scene('f13-s09', '次年写清留用和岗位', '试工结束后，陈月好、彭绍文或周账房给出继续、换工序或不留用的答复；当前岗位、工作地点、工资与下一步进入人生账。', { year: 1925, routes: ['qiaoxiang-local-shop', 'qiaopi-correspondence-clerk', 'qiaopi-remittance-clerk'], priority: 10 });
  scene('f13-s10', '一笔侨批至少有四个状态', '寄出、在途、退件和签收分别标记；若夹有汇款，再另记通知、兑付与实际领款人。你只回答自己经手的一段。', { routes: ['qiaopi-correspondence-clerk', 'qiaopi-remittance-clerk'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f13-s11', '顾客拿赊账抵未到汇款', '一位熟客说等海外亲人寄钱后再付货款。母亲决定只给一小笔、有日期的赊账；亲近、信用和未来汇款没有混成无限额度。', { routes: ['qiaoxiang-local-shop'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f13-s12', '退信只让一个地址失效', '父亲旧商号寄出的信被退回。系统保留最后确知在世日、最后工作、最后地址、退件原因和下一次查询日，不用红字补写死亡。', { minAge: 18, maxAge: 35, priority: 21 });
  scene('f13-s13', '母亲是否等候由她自己说', '亲族劝陈月好卖掉小铺出洋寻夫，她逐项核通行、住处、工作、债务和秀枝安排后拒绝立即动身。主角不能替她表演忠贞或放弃。', { minAge: 20, maxAge: 40, priority: 19 });
  scene('f13-s14', '结婚后争吵的是两地账户和谁先走', '你与伴侣为是否出洋、谁保留工作、汇款进共同账还是个人账以及双方父母照料争吵。次日分别写下能承担和不能承担的事项。', { minAge: 23, maxAge: 43, priority: 19 });
  scene('f13-s15', '湿热、久坐和奔走让人停工', '连续发热、眼痛或腰背疼痛让你停下一段班次。看诊、药钱、谁代交回执和复工日期分别记录，不用“恢复了”抹掉损失。', { minAge: 25, maxAge: 50, priority: 18 });
  scene('f13-s16', '朋友不是免费通信网络', '许水成准备换路线，邓绮文减少代写时段，各自说明最后经手日和能转介的人。关系可以继续，工作能力却不会永久供主角调用。', { minAge: 28, maxAge: 50, priority: 17 });
  scene('f13-s17', '1945 年重核积压信件和旧账', '路线恢复一部分后，你逐封核积压信、退件和旧回执；有的亲人确认在世，有的地址仍失效，有的款项已经兑付却没有新信。', { year: 1945, priority: 34 });
  scene('f13-s18', '1949 年逐项核现状', '系统列出父母、秀枝、伴侣、朋友、小铺、岗位、最后地址、最后来信、汇款、回执、企业资产和债。民国分段结束，人生继续。', { year: 1949, routes: ['qiaoxiang-local-shop', 'qiaopi-correspondence-clerk', 'qiaopi-remittance-clerk'], priority: 36 });
  scene('f13-s19', '中晚年把经手工作交清', '你可减少赶集、转做回执整理、带新人核账或停止受薪工作。最后一批客户、未结款、钥匙、账簿和查询日逐项移交。', { minAge: 50, maxAge: 69, priority: 15 });
  scene('f13-s20', '异地死亡仍要经过消息和确认', '父母、伴侣、手足、朋友或主人公异地死亡时，家书、同住者证明、医疗记录和返乡人口述可能先后到达；发生、知情、确认和遗留账务分开保存。', { minAge: 62, priority: 14 });

  C.annualRhythms['qiaoxiang-local-shop'] = [
    '今天核一批进货、损耗、赊账与售出；毛收入先扣货款和坏损，母亲的铺面与个人财产不因共同生活消失。',
    '何供货人只答复本批货，罗顾客只答复自己的欠账；你完成一次交易，没有凭侨汇自动变成富商或掌柜。',
    '赶集、照料、发热和等待汇款会改变当年库存；每次少进或退货都有顾客、钱与下次答复，不写成泛泛“经营一年”。',
  ];
  C.annualRhythms['qiaopi-correspondence-clerk'] = [
    '寄件人、收件人、地址、日期、转递、退件与回执逐项登记；代写内容由本人决定，封口后不作为闲谈。',
    '一处地址失效只触发转询和待确认；最后来信、最后确知在世和最后汇款各自更新，不用断信制造死亡。',
    '男性与女性角色进入的柜台、外递和代写岗位不同，但都只处理授权书信与公开流转记录，不获得全知视角。',
  ];
  C.annualRhythms['qiaopi-remittance-clerk'] = [
    '每笔银信核寄款人、收款人、原金额、换算、手续费、通知、兑付和签收；任何缺项都有具名答复人和期限。',
    '周账房能决定当前账台工作，方婶能决定是否领取无争议部分；你不能借经手凭据动用客户款或替其签收。',
    '久坐核账、灯光、湿热和争议带来眼痛、疲劳与停班；识字让职责扩大，却不会自动取得钱庄所有权。',
  ];
  C.sceneFrames.guangdongqiaoxiang = [
    { open: '河埠先送来一封转递家书，小铺又催补货，陈月好、许水成和银信账房各只回答自己经手的一段。', close: '今天只确认了一段书信、钱或生意；未到汇款、失效地址、父亲近况、母亲货物和下次查询日分别留账。' },
    { open: '顾客赊账、退信、家人争吵和岗位班表撞在一起，秀枝与伴侣也各自说明自己的工作和去留。', close: '你得到具体答复，也付出钱、身体、时间或关系代价；跨海联系没有让任何人失去主体性。' },
  ];
  C.sceneFrames['qiaoxiang-local-shop'] = C.sceneFrames.guangdongqiaoxiang;
  C.sceneFrames['qiaopi-correspondence-clerk'] = C.sceneFrames.guangdongqiaoxiang;
  C.sceneFrames['qiaopi-remittance-clerk'] = C.sceneFrames.guangdongqiaoxiang;

  C.parentProfiles.guangdongqiaoxiang = {
    mother: {
      name: '陈月好', born: 1885, occupation: '经营侨乡小铺并管理田地、赊账和自己的汇款使用决定', deathAgeBase: 80,
      activities: ['逐项盘过货架、赊账和实际到款', '拒绝在通行与住处未明时卖铺出洋', '晚年减少赶集后仍决定保留哪些客户和货架'],
      words: ['“通知是通知，钱到手才是到手，铺里的货不能拿盼头来付。”', '“你爹的信要等，我的铺、田和秀枝的日子也要照常算。”', '“同一家人可以合伙，货架和谁出的本钱还是要写名字。”'],
    },
    father: {
      name: '梁志成', born: 1881, occupation: '在东南亚一处合成商埠做店工，岗位和地址随实际来信更新', deathAgeBase: 74,
      activities: ['在来信中说明一次换工与新地址', '失联期间只保留最后确知消息而不补写生死', '晚年若确认回乡或留外，分别结清最后工作与住处'],
      words: ['“这封信写的是上月的店和住处，收到时若已变，要再等下一封核。”', '“寄多少、扣多少、你们实领多少，要看回执，不要只看我写的数。”', '“我在外做工不是一句发财，换店、欠薪、病和回不回去都要一件件说。”'],
    },
  };
  C.spouseProfiles.guangdongqiaoxiang = {
    男: { name: '郑慧兰', bornOffset: 1, occupation: '本地学校与代写信劳动者，保留自己的工资、隐私和出洋选择', values: '共同生活要谈两地账户、双方父母、生育和谁先迁，不接受自动停工守候远方亲人' },
    女: { name: '冯启安', bornOffset: -1, occupation: '商号采购与货物交接人，按批次核工钱和地址', values: '愿意共同承担住处与照料，但不把妻子经手的侨批、客户款或母亲铺面视为自己门路' },
  };
  C.childNames.guangdongqiaoxiang = ['梁安批', '梁念归'];

  var shopBase = {
    kind: 'employment', role: '侨乡小铺采购、零售与账务劳动者', workplace: '广东合成侨乡月好日用小铺与河埠集市', employer: '经营者陈月好', supervisor: '陈月好', colleague: '账务帮工梁秀枝', publicPerson: '赊购日用品的罗客人', terms: '有限试工后按月或按集结算；铺面、存货、汇款投入、赊账、工资与合伙分成分别记录',
    duties: '核进货来源、成本、损耗、价格、售出与赊账，向顾客给出退换和还款日期，不混用母亲财产与家庭共同支出',
    scenes: ['一批灯油少了一罐，你按进货、搬运和售出找到漏损，只从实际经手段处理。', '罗客人等海外汇款还账，你只延一小笔并写日期，没有把未来汇款变成无限信用。', '母亲减少赶集后仍保留货架和旧客户，你按劳动领薪或按合伙账分成，不能自动继承。'],
  };
  var letterBase = {
    kind: 'employment', role: '侨批收发、地址与回执登记员', workplace: '广东合成侨乡河埠侨批收发处', employer: '合成侨批收发经办处', supervisor: '收发经办彭绍文', colleague: '递送经手许水成', publicPerson: '请人代写家书的麦玉婶', terms: '有限试工后按月与按件混合结算；寄收姓名、地址、转递、退件、回执、内容隐私与经手权限分别记录',
    duties: '登记公开书信流转，按寄信人原话代写并复诵，处理转递、退件和回执；不拆看或转述未授权内容',
    scenes: ['一封退信只让旧地址失效，你保留最后来信和下一次查询，没有补写收件人死亡。', '麦玉婶逐句决定代写内容，你复诵、封口并记寄出日，没有替她承诺卖田或迁居。', '两封同名收件人的信到站，你按籍贯、亲属称谓和原址分开转询，不凭猜测交付。'],
  };
  var moneyBase = {
    kind: 'employment', role: '银信凭据、兑付与往来账务助理', workplace: '广东合成侨乡河埠银信经办处', employer: '合成银信与账务经办处', supervisor: '周账房', colleague: '回执登记员郭淑勤', publicPerson: '核少款与签收的方婶', terms: '有限试工后按月结算；寄款、换算、手续费、通知、兑付、签收、钥匙与客户款权限分别记录',
    duties: '核寄款人与收款人、金额、手续费、分批兑付和签记，只处理授权凭据，不动用客户款或代签空白回执',
    scenes: ['通知金额与实领不符，你查出一段手续费和一次分批兑付，余款另立待查单。', '方婶只签无争议部分，账房不能把签字扩成全额收款，你也不能拿别人的款补差。', '一笔款已兑却没有新信，你只更新钱的状态，寄款人当前工作、地址和身体仍待确认。'],
  };
  Object.assign(C.routeCareerProfiles, {
    'qiaoxiang-local-shop': shopBase,
    'qiaopi-correspondence-clerk': letterBase,
    'qiaopi-remittance-clerk': moneyBase,
  });
  C.routeCareerProfilesByGender = C.routeCareerProfilesByGender || {};
  C.routeCareerProfilesByGender['qiaoxiang-local-shop'] = {
    男: Object.assign({}, shopBase, { role: '乡村小店进货与赶集经办人', workplace: '广东合成侨乡月好小铺与外埠赶集路线', duties: '在具名供货人与母亲授权下做较远进货、赶集和零售，核运输损耗、价格与赊账' }),
    女: Object.assign({}, shopBase, { role: '母亲铺面账务与零售经营人', workplace: '广东合成侨乡月好小铺柜台与近村集市', duties: '在时代流动门槛下核柜台、存货、客户与近村采购，保留自己的工资、休息和合伙决定' }),
  };
  C.routeCareerProfilesByGender['qiaopi-correspondence-clerk'] = {
    男: Object.assign({}, letterBase, { role: '侨批收发、外递与地址核对助理', workplace: '广东合成侨乡河埠侨批收发处与公开递送路线', duties: '核收发、地址、转递和退件，并在具名路线做公开递送；不进入未授权机构或拆看内容' }),
    女: Object.assign({}, letterBase, { role: '代写书信与侨批回执登记员', workplace: '广东合成侨乡女塾代写台与侨批回执柜', supervisor: '女教师邓绮文', duties: '按本人原话代写并复诵，核回执、退件和家属查询，在时代门槛下不假定可独自进入所有外递路线' }),
  };
  C.routeCareerProfilesByGender['qiaopi-remittance-clerk'] = {
    男: Object.assign({}, moneyBase, { role: '银信兑付与外埠账房助理', workplace: '广东合成侨乡河埠银信兑付柜与外埠往来账台', duties: '核外埠原单、换算、手续费、兑付与签收，在授权下接触账台但不能动用客户款或决定所有汇率' }),
    女: Object.assign({}, moneyBase, { role: '侨眷汇款凭据核对与家庭账务员', workplace: '广东合成侨乡侨眷凭据核对台与家庭账务处', duties: '核侨眷通知、回执、实领和家庭用途，在时代岗位门槛下不把家庭账务写成无权接触的柜房所有权' }),
  };

  Object.assign(C.routeContactProfiles, {
    'qiaoxiang-local-shop': [
      { id: 'f13_he_supplier', label: '何德昌', role: '按批给货、说明进价和退换日期的日用杂货供货人', status: 'nearby', relation: 17, born: 1888 },
      { id: 'f13_luo_customer', label: '罗桂婶', role: '会赊购日用品并保留自己还款与换货意见的顾客', status: 'nearby', relation: 22, born: 1896 },
      { id: 'f13_liang_second_uncle', label: '梁二叔', role: '只在写明本金、期限和抵押边界后出借进货款的亲族', status: 'nearby', relation: 19, born: 1878 },
    ],
    'qiaopi-correspondence-clerk': [
      { id: 'f13_peng_postal', label: '彭绍文', role: '安排公开收发、核转递与退件原因的经办人', status: 'supervisor', relation: 16, born: 1886 },
      { id: 'f13_mai_sender', label: '麦玉婶', role: '逐句决定代写内容并核封口寄出的侨眷', status: 'nearby', relation: 23, born: 1892 },
      { id: 'f13_guo_receipt', label: '郭淑勤', role: '核回执、失效地址和查询日期的女登记员', status: 'coworker', relation: 24, born: 1905 },
    ],
    'qiaopi-remittance-clerk': [
      { id: 'f13_zhou_accountant', label: '周账房', role: '按权限安排凭据核对并答复少款争议的账房', status: 'supervisor', relation: 15, born: 1884 },
      { id: 'f13_fang_recipient', label: '方婶', role: '只签实际领取部分并追问余款的侨眷收款人', status: 'nearby', relation: 22, born: 1894 },
      { id: 'f13_he_merchant', label: '何掌柜', role: '提供本地进货与往来账受薪岗位的商号经营人', status: 'employer', relation: 14, born: 1887 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'qiaoxiang-local-shop': ['赶集负重与久站造成的腰腿疼痛', '湿热和雨淋后的反复发热', '灯油、灰尘和食物存放造成的呼吸与皮肤不适'],
    'qiaopi-correspondence-clerk': ['长期伏案与昏暗光线造成的眼痛头痛', '反复书写造成的手腕与肩背疼痛', '递送奔走和雨季造成的发热与足部损伤'],
    'qiaopi-remittance-clerk': ['久坐核账与灯光造成的眼疲劳', '争议和长时核对造成的失眠头痛', '湿热环境与纸尘造成的皮肤和呼吸不适'],
  });

  Object.assign(C.publicRouteProfiles, {
    'qiaoxiang-local-shop': {
      publicGroup: '合成的侨乡供货、赊账与公开缺工互助簿', publicRole: '核公开供货、欠账、集市摊位和照料轮值',
      covertRole: '不进入秘密身份线，不把顾客汇款和家书转作未授权信息', infiltrationRole: '不借小铺冒名接近机构或套取客户隐私',
      contact: { id: 'public_f13_luo_an', label: '罗安', role: '登记公开供货、欠账答复与失效地址的互助经手人', status: 'colleague', relation: 17, born: 1904 },
    },
    'qiaopi-correspondence-clerk': {
      publicGroup: '合成的公开回执、退件与家属查询互助簿', publicRole: '核公开退件原因、最后地址、查询日期和代写缺工',
      covertRole: '不进入秘密身份线，只保存本人获准经手的公开流转信息', infiltrationRole: '不进入冒名投递或拆信线，不借岗位收集未授权内容',
      contact: { id: 'public_f13_guo_an', label: '郭安', role: '登记公开回执、退件与查询日期的互助经手人', status: 'colleague', relation: 18, born: 1906 },
    },
    'qiaopi-remittance-clerk': {
      publicGroup: '合成的公开兑付答复、少款查询与家庭预算互助簿', publicRole: '核公开凭据、实际兑付、少款答复和失效收款地址',
      covertRole: '不进入秘密身份线，不把客户金额和账户转作未授权情报', infiltrationRole: '不进入冒名兑付或空白签收线，只处理有授权的凭据',
      contact: { id: 'public_f13_fang_an', label: '方安', role: '登记公开兑付答复、待查余款和查询日期的互助经手人', status: 'colleague', relation: 17, born: 1905 },
    },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('skilled', 'qiaoxiang-local-shop');
  addRouteToTrack('literate', 'qiaopi-correspondence-clerk');
  addRouteToTrack('literate', 'qiaopi-remittance-clerk');
})(typeof window !== 'undefined' ? window : globalThis);
