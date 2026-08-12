// 民国人生 · F14 广东沿海水客、航运与跨境小商家庭运行时包 v0.7.9
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f14.js');

  C.version = '0.7.9';
  C.familyDecisionKeys.guangdongcoastal = { path: 'coastal-path', war: 'coastal-war' };
  Object.assign(C.designRegistry.families.F14, {
    designStatus: 'runtime-reviewed-first-round',
    runtimeStatus: 'playable-verified',
    runtimeFamilyKey: 'guangdongcoastal',
  });
  C.runtimeFamilyDesignMap.guangdongcoastal = 'F14';
  Object.assign(C.legacyRouteDomainMap, {
    'coastal-passenger-cargo-operator': 'D46',
    'port-guesthouse-caterer': 'D17',
    'recorded-coastal-small-trader': 'D45',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F14-GD-WATER-GUEST-CERTIFICATE': {
      label: '广东省档案馆：水客身份证明档案',
      url: 'https://www.da.gd.gov.cn/portal_home/wap/archivesDetail/5130',
      supports: ['水客身份与递送活动可由具体档案凭据核查，不能把所有跨境携带都写成无手续自由通行'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F14-GD-WATER-GUEST-LETTER': {
      label: '广东省档案馆：水客携带的侨批实物档案',
      url: 'https://www.da.gd.gov.cn/portal_home/wap/archivesDetail/5132',
      supports: ['水客可能承担具名书信递送，但一件实物档案不代表所有路线、货物和年代具有相同规则'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F14-GD-CUSTOMS': {
      label: '广东省档案馆：近代广东海关档案介绍',
      url: 'https://www.da.gd.gov.cn/portal_home/content/8084',
      supports: ['口岸、海关、货物流转与地方经济社会记录构成沿海谋生的制度背景'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F14-GD-MACAU-CUSTOMS': {
      label: '广东省档案馆：拱北海关与澳门相关档案概览',
      url: 'https://www.da.gd.gov.cn/portal_home/content/8725',
      supports: ['1889—1946 年拱北关贸易报告涉及澳门货物、物价、风灾、治安、疫病与基础设施等具体变化'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F14-GD-HUANGPU': {
      label: '广东地方志：黄埔港史料',
      url: 'https://dfz.gd.gov.cn/dfz/book/65f45afe0aa3402f922579cc53932fdd/140.pdf',
      supports: ['1940 年代后期黄埔与上海之间存在以货运为主的客货航运记录'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-POST-MACAU-CENSUS-1950': {
      label: '澳门统计暨普查局：澳门人口普查历史',
      url: 'https://censos.dsec.gov.mo/CensosIntroduction.aspx?lang=zh-CN',
      supports: ['1950 年澳门人口与住户普查为战后住屋和人口压力提供可核基线'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-POST-MACAU-INNER-HARBOUR': {
      label: '澳门记忆：内港与水上居民',
      url: 'https://www.macaumemory.mo/entries_53a121566344472e988c9b43d340989b',
      supports: ['内港是航运、渡运和水上谋生的重要生活空间'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-POST-SG-KEPPEL': {
      label: '新加坡国家文物局：Keppel Bay 港口史',
      url: 'https://www.roots.gov.sg/stories-landing/stories/the-story-of-keppel-bay/story',
      supports: ['20 世纪中叶船货由驳船转运，1950 年代港区繁忙并存在除锈、清理与船舶维护等具体工作'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-POST-SG-HOUSING': {
      label: '新加坡政府：1950—1960 年代住屋短缺',
      url: 'https://www.remembering.gov.sg/life-and-contributions/mr-lee-and-singapore/housing-the-nation/',
      supports: ['1950—1960 年代存在严重住屋短缺、拥挤住处与卫生压力'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-POST-MACAU-GAMING-HISTORY': {
      label: '澳门博彩监察协调局：博彩业历史',
      url: 'https://www.dicj.gov.mo/web/cn/history/index.html',
      supports: ['1961 年公开竞投与新财团中标、1962 年公司注册并开始经营的历史边界；角色不能靠一次选择自动成为承批人'],
      status: 'source-linked-needs-final-review',
    },
  });

  C.families.guangdongcoastal = {
    key: 'guangdongcoastal',
    name: '广东沿海水客、航运与跨境小商家',
    born: 1910,
    place: '广东合成沿海埠镇',
    defaultSeed: 1410,
    defaultNames: { 男: '梁海宁', 女: '梁燕宁' },
    motif: '船期、票据、货件、客栈床位与跨境消息把一家人连在几处港口；每件货、每位旅客和每个家人的去留都要由具名经手人与凭据接住。',
    start: { body: 49, knowledge: 19, craft: 35, mind: 40, network: 31, fame: 18 },
    startRes: { money: 18, health: 73, relation: 68, position: 29 },
    subjects: {
      mother: { label: '母亲', status: 'alive', health: 64, agency: 93, note: '掌管客栈饭食、床位、采购和自己愿意承担的债务' },
      father: { label: '父亲', status: 'absent-for-work', health: 61, agency: 89, note: '按船期做客货杂务和有凭据递送，可停航、换线、返家或另处落脚' },
      spouse: { label: '配偶', status: 'not-met', health: 67, agency: 90, note: '婚后住处、航线、店务、汇款、生育和双方父母责任逐项协商' },
      household: { label: '同住家口与住客边界', status: 'together', strength: 57, agency: 87 },
      support: { label: '码头邻里、客栈帮工与同行支持', status: 'kin-and-neighbors', strength: 35, agency: 84 },
      connections: { label: '船行、票房、客栈与公开口岸门路', status: 'trial-and-records-only', strength: 34, agency: 82 },
      workers: { label: '船员、柜台、脚夫与客栈帮工', status: 'separate-duties-and-testimony', strength: 27, agency: 86 },
      ledger: { label: '客票、货单、床位、采购与跨境小货分账', status: 'separate-records', strength: 39, agency: 90 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 84, note: '不自动继承航线、客栈或跨境生意' },
    },
    contacts: {
      f14_liang_haisheng: { label: '梁海生', role: '按船期做客货杂务和有凭据递送的父亲', status: 'family', relation: 61, agency: 89, note: '拒带来源不明的包裹，可停航、返家、换工或另处安身' },
      f14_cai_yulian: { label: '蔡玉莲', role: '经营港口客栈饭食、床位、采购和账务的母亲', status: 'family', relation: 68, agency: 93, note: '铺具、客户、债务和是否随迁都由她本人决定' },
      f14_liang_yantang: { label: '梁燕棠', role: '想学语言、票据和柜台文书并独立决定去留的手足', status: 'family', relation: 52, agency: 95, note: '不是免费家务或替补照料者，也不因主角迁移自动同行' },
      f14_chen_qirong: { label: '陈启荣', role: '安排公开客票、货单与到岸交接的船行经办人', status: 'nearby', relation: 24, agency: 83, note: '只保证写入票单和班次表的事项' },
      f14_huang_shaoqiong: { label: '黄绍琼', role: '要求明确工钱、分成与休息日的客栈帮工', status: 'nearby', relation: 31, agency: 94, note: '她还要照顾自己的孩子，可拒绝加班、合伙或随迁' },
      f14_ye_rongqing: { label: '叶荣庆', role: '按批次合作的水客与小货伙伴', status: 'traveling', relation: 22, agency: 88, note: '每次可接受、延迟、拒绝或失去联系，不是永久可调用路线' },
    },
  };

  Object.assign(C.routes, {
    'coastal-passenger-cargo-operator': { name: '客货航运、票据与有限运输经营', family: 'guangdongcoastal', summary: '从客票、货单、甲板和到岸交接做起，逐步承担小型客货运输份额；船、货、乘客与许可分别入账。' },
    'port-guesthouse-caterer': { name: '港口客栈、饭食与旅客服务', family: 'guangdongcoastal', summary: '管理床位、饭食、采购、行李交接和住客欠账，可受薪、有限合伙或另租小柜。' },
    'recorded-coastal-small-trader': { name: '有凭据的沿海小货与跨境商贸', family: 'guangdongcoastal', summary: '只做来源、货主、数量、税费与交付可核的小批货，不用“走私传奇”抹掉风险和经手责任。' },
  });

  C.actions.push(
    { id: 'f14-guesthouse-bed-ledger', name: '帮母亲核床位、饭食、采购与住客欠账', families: ['guangdongcoastal'], minAge: 6, spirit: 2, delta: { craft: 2, knowledge: 2, relation: 1, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f14_cai_yulian: { relation: 2 }, f14_huang_shaoqiong: { relation: 1 } }, note: '知道谁住哪张床、吃过什么和何时结账；不把母亲与帮工的劳动算成免费家务。' },
    { id: 'f14-ticket-cargo-copy', name: '抄客票、货单、到岸签记与下一班船期', families: ['guangdongcoastal'], minAge: 8, spirit: 2, delta: { knowledge: 3, mind: 2, network: 1 }, subjectDelta: { connections: { strength: 1 }, ledger: { strength: 2 } }, contactEffects: { f14_chen_qirong: { relation: 1 } }, note: '票、货、乘客与船期是不同记录；抄写不等于取得开船、验货或通关权。' },
    { id: 'f14-language-public-letter', name: '学港口用语并替本人复诵公开书信', families: ['guangdongcoastal'], minAge: 9, maxAge: 17, spirit: 3, delta: { knowledge: 4, relation: 1, mind: 1 }, channels: ['conversation'], contactEffects: { f14_liang_yantang: { relation: 2 }, f14_ye_rongqing: { relation: 1 } }, note: '只处理本人同意的公开内容，不以会几种口音取得未授权信息。' },
    { id: 'f14-ship-ticket-cargo-handoff', name: '核一班客票、货单、装船与到岸交接', routes: ['coastal-passenger-cargo-operator'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, knowledge: 2, money: 2, health: -1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f14_chen_qirong: { relation: 2 }, f14_ship_captain: { relation: 1 } }, note: '每名乘客、每批货和每段经手责任分别确认；票房收入不等于船行利润。' },
    { id: 'f14-ship-delay-damage-answer', name: '给延误、受潮和错交货主逐项答复', routes: ['coastal-passenger-cargo-operator'], minAge: 17, spirit: 3, careerAction: true, delta: { mind: 3, network: 2, money: 1 }, contactEffects: { f14_cargo_owner: { relation: 2 }, f14_ship_captain: { relation: 1 } }, note: '按装船、保管、天气和交付记录划分责任，不用一笔赔偿抹掉全部事实。' },
    { id: 'f14-guesthouse-room-meal-shift', name: '完成一班床位、饭食、行李与住客账', routes: ['port-guesthouse-caterer'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, money: 2, relation: 1, health: -1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f14_huang_shaoqiong: { relation: 2 }, f14_guest: { relation: 1 } }, note: '每位住客得到明确床位、餐食、寄存边界和结算日，不把“照料客人”写成无尽劳动。' },
    { id: 'f14-guesthouse-supplier-answer', name: '与供货人核食材、坏损、欠款与下次送货', routes: ['port-guesthouse-caterer'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, network: 3, money: 1 }, contactEffects: { f14_food_supplier: { relation: 2 }, f14_cai_yulian: { relation: 1 } }, note: '毛收入先扣食材、燃料、坏损、工钱和房租；住客多不等于已经赚钱。' },
    { id: 'f14-trade-source-delivery-ledger', name: '核一批小货的来源、货主、数量与交付签记', routes: ['recorded-coastal-small-trader'], minAge: 15, spirit: 4, careerAction: true, delta: { knowledge: 3, mind: 2, money: 2 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f14_ye_rongqing: { relation: 2 }, f14_trade_buyer: { relation: 1 } }, note: '只经手能够说明来源与交付的人货；拒绝空白包裹、冒名货主和未说明的夹带。' },
    { id: 'f14-trade-buyer-dispute', name: '给买主答复成色、迟到、退货与余款', routes: ['recorded-coastal-small-trader'], minAge: 17, spirit: 3, careerAction: true, delta: { network: 3, mind: 2, money: 1 }, contactEffects: { f14_trade_buyer: { relation: 2 }, f14_customs_broker: { relation: 1 } }, note: '成交、退货、损耗和未付余款各有答复人；不把跨境差价直接写成暴富。' }
  );

  var sourceIds = ['SRC-F14-GD-WATER-GUEST-CERTIFICATE', 'SRC-F14-GD-WATER-GUEST-LETTER', 'SRC-F14-GD-CUSTOMS', 'SRC-F14-GD-MACAU-CUSTOMS', 'SRC-F14-GD-HUANGPU'];

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
        post1949Choices: item.post1949Choices ? item.post1949Choices.slice() : undefined,
        sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete choice.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  installDecision({
    id: 'coastal-path', year: 1924, followYear: 1925, families: ['guangdongcoastal'], title: '童年学到的事怎样落成第一份具体工作',
    prompt: '客货船、母亲客栈和有凭据的小货行各给一次有限试工。你要亲自问清岗位、班次、工钱、能经手的票货、负责人和答复日。',
    options: [
      option('ship-ticket-trial', '把认票、货单和船期的经验用在客货船行试工', { knowledge: 3, craft: 2, money: 1 }, 'f14:path:ship', '1924 年进入客货船行做有期限的票货交接试工。', '船行给出留用岗位和权限', '陈启荣按实际表现让你继续核客票、货单和到岸签记；男性更多从甲板交接进入，女性更多从票房与行李登记进入，二者都没有取得船主权。', { route: 'coastal-passenger-cargo-operator' }),
      option('guesthouse-trial', '把床位、饭食和账务经验用在母亲客栈试工', { craft: 3, relation: 2, money: 1 }, 'f14:path:guesthouse', '1924 年进入港口客栈做有期限的床位、饭食与账务试工。', '母亲与帮工给出清楚分工', '蔡玉莲保留铺具、旧客户和经营决定，黄绍琼取得明确工钱与休息日；你按班接床位、采购或柜台，而不是以家人身份免费接管。', { route: 'port-guesthouse-caterer' }),
      option('recorded-trade-trial', '把语言和公开书信经验用在有凭据的小货试工', { knowledge: 3, network: 2, mind: 1 }, 'f14:path:trade', '1924 年进入有凭据的沿海小货交付试工。', '第一批货留下来源与交付答复', '叶荣庆只接来源、货主、数量和交付人齐全的两批小货；你获准核单、催答复和结余款，没有被一句“跨境门路”变成商号老板。', { route: 'recorded-coastal-small-trader' }),
    ],
  });

  installDecision({
    id: 'route-coastal-passenger-cargo-operator-1929', year: 1929, followYear: 1930, routes: ['coastal-passenger-cargo-operator'], title: '货物受潮又迟到时怎样划分责任',
    prompt: '一批布包在途中受潮并晚到，货主要求船行全赔。装船、舱位、天气、保管与到岸记录并不指向同一个经手人。',
    options: [
      option('ship-compare-records', '逐项对照装船、舱位、天气和到岸记录', { knowledge: 3, mind: 3, money: -1 }, 'f14:ship:records', '1929 年按全段记录核定受潮与迟到责任。', '记录只让可证明的部分落账', '船员确认途中进水，货主也承认外包旧损；船行赔可核损失、免本次运费，未能证明的货值另留争议，不让柜台一人背全责。'),
      option('ship-bounded-compensation', '先给货主有限补偿，再向具名经手段追偿', { money: -3, relation: 2, network: 1 }, 'f14:ship:compensate', '1929 年先作有限补偿并保留分段追偿。', '补偿换来时间但没有抹掉后账', '货主收到写明范围的补偿，陈启荣向装船与舱管分别追查；你保住客户，也承担现金紧张和下一批必须改包装的条件。'),
      option('ship-exit-with-evidence', '拒绝空泛全赔，交出记录并退出该货主后续业务', { mind: 3, money: -2, network: -1 }, 'f14:ship:exit', '1929 年交出经手证据并退出无法划界的货主业务。', '失去客户以后仍留下可追查交接', '船行失去两批后续货，你完成票单、照片式文字描述和具名交接；货主可另行追索，责任没有被写成已经消失。'),
    ],
  });

  installDecision({
    id: 'route-coastal-passenger-cargo-operator-1946', year: 1946, followYear: 1947, routes: ['coastal-passenger-cargo-operator'], title: '航线恢复后继续受薪、取得有限船份还是转岸上工作',
    prompt: '船行想恢复一条短线。你有交接经验，却没有足够资本独自买船；船份、修理、燃料、船员工资、货损与许可都要分别承担。',
    options: [
      option('ship-remain-salaried', '继续按月受薪，负责票货交接而不承担船债', { money: 2, position: 2, health: 1 }, 'f14:ship:wage', '1946 年继续在船行按月受薪并限制经手责任。', '复航后的第一张工资与事故单', '你完成六班票货交接，工钱按月结；一次机械故障由船主与修理人负责，你只提供当班记录，没有因熟悉航线自动成为股东。'),
      option('ship-limited-share', '以现金、劳动和客户记录取得一份有上限的小船份', { money: -4, craft: 2, network: 2 }, 'f14:ship:share', '1946 年以有限出资和劳动取得小型客货艇的一份船份。', '有限船份完成首月账', '梁海生只投入列明工具，陈启荣投入有限现金，你投入现金、交接劳动与客户记录；燃料、修理、船员工资、赔付和退出条件逐项结算。', { enterpriseStart: { id: 'f14-limited-launch', name: '合成海安客货艇有限合伙', domainKey: 'D46', kind: 'limited-passenger-cargo-launch', workplace: '广东合成沿海埠镇短程客货泊位', product: '有票单的短程客运与小批货运', employees: 2, partners: [{ personId: 'parent:father', role: '列明航具与经验的有限合伙人' }, { personId: 'contact:f14_chen_qirong', role: '有限现金与票货经办合伙人' }], asset: { id: 'limited-launch-share', kind: 'documented-launch-share', description: '只占合成海安客货艇的有限船份，不等于独占船只与航线' }, license: { id: 'short-route-operation', kind: 'documented-route-operation-permission', authority: '合成口岸具名管理机关', scope: '仅限记录所列短程客货班次' } } }),
      option('ship-shore-transfer', '转到岸上货栈与票房，保留航运经验但停止跟船', { knowledge: 2, money: 1, health: 2 }, 'f14:ship:shore', '1946 年转入岸上货栈与票房工作。', '岸上岗位也有老板与交接结果', '货栈许主任给出固定班表，你核到货、行李和转运；旧船班由原船员继续，你的收入减少风险，也失去一部分船份机会。'),
    ],
  });

  installDecision({
    id: 'route-port-guesthouse-caterer-1929', year: 1929, followYear: 1930, routes: ['port-guesthouse-caterer'], title: '住客欠账、帮工工钱和食材款先接哪一项',
    prompt: '两位住客等船欠下床饭钱，黄绍琼的工钱到期，供货人又要求结清上一批食材。客栈不能用“人多生意好”概括现金缺口。',
    options: [
      option('guesthouse-protect-wage', '先付帮工工钱，缩菜单并逐位重谈住客欠期', { money: -2, relation: 3, craft: 1 }, 'f14:guest:wage', '1929 年先付帮工工钱并缩减客栈菜单。', '缩菜单保住劳动关系', '黄绍琼按期领到工钱并自定是否续班；两位住客写下欠期，供货人少送易坏食材，客栈没有把帮工收入拿去无限垫住客。'),
      option('guesthouse-named-supplier-credit', '向具名供货人延一批货款并写清还款日', { money: 2, network: 1, mind: 1 }, 'f14:guest:credit', '1929 年取得一笔有供货人和期限的食材赊款。', '赊来的食材变成明确债务', '许菜商写明金额、日期与停供条件；客栈维持饭食，下一月收入先还货款，蔡玉莲的铺具和黄绍琼工资不作抵押。'),
      option('guesthouse-end-unpaid-stay', '结清已付部分并停止继续给两位住客挂账', { money: 1, relation: -2, mind: 3 }, 'f14:guest:end', '1929 年停止无期限住客挂账并完成行李交接。', '空出的床位对应一段关系后果', '两位住客带走签记过的行李，其中一人转去同乡处，一人补付半数；客栈空出床位，也失去他们可能带来的后续介绍。'),
    ],
  });

  installDecision({
    id: 'route-port-guesthouse-caterer-1946', year: 1946, followYear: 1947, routes: ['port-guesthouse-caterer'], title: '母亲减少当班后怎样继续经营',
    prompt: '蔡玉莲想减少夜班，黄绍琼只愿在工钱、分成和照料孩子的时间写清后参与。铺具、床位、客户、现金和劳动不能混成“家业归你”。',
    options: [
      option('guesthouse-remain-manager', '继续按月做经营人，母亲保留铺具与最终关店权', { money: 2, relation: 2, health: 1 }, 'f14:guest:manager', '1946 年继续按月管理客栈并保留母亲产权。', '交班表替代自动继承', '蔡玉莲减少三晚当班，仍决定铺具维修和关店；你核床饭与采购，黄绍琼按班领薪，三人没有因同住变成共同所有人。'),
      option('guesthouse-limited-partnership', '与母亲、绍琼按铺具、现金和劳动建立有限合伙', { money: -3, relation: 3, craft: 2 }, 'f14:guest:partnership', '1946 年建立有退伙边界的港口客栈饭食合伙。', '客栈有限合伙完成首月结账', '蔡玉莲投入列明铺具，黄绍琼投入有限现金并保留照料时间，你投入现金和劳动；工资、分成、坏账、住客寄存和退出条件分别入账。', { enterpriseStart: { id: 'f14-port-guesthouse', name: '合成玉琼港口客栈饭食社', domainKey: 'D44', kind: 'guesthouse-catering-partnership', workplace: '广东合成沿海埠镇客栈铺位', supplier: '许记食材供货人', product: '床位、饭食与有签记的行李寄存', employees: 1, partners: [{ personId: 'parent:mother', role: '铺具与经营判断合伙人' }, { personId: 'contact:f14_huang_shaoqiong', role: '有限现金、劳动与照料时间合伙人' }], asset: { id: 'beds-kitchen-tools', kind: 'beds-and-kitchen-tools', description: '蔡玉莲具名铺具、床位与三人逐件盘点的厨房器具' } } }),
      option('guesthouse-independent-counter', '另租小柜做饭食与行李交接，承担具名押金债', { money: -4, network: 2, mind: 2 }, 'f14:guest:independent', '1946 年另租港口小柜并登记押金与开业债。', '独立小柜没有带走原客栈资产', '你只带走自购器具和两名同意转介的客人；押金、食材债、退货与每日现金分别入账，母亲和黄绍琼继续决定原客栈。', { enterpriseStart: { id: 'f14-independent-food-counter', name: '合成燕宁港口饭食小柜', domainKey: 'D44', kind: 'sole-port-food-counter', workplace: '广东合成沿海埠镇租用小柜位', supplier: '许记食材供货人', product: '客饭、干粮与有签记的短时行李交接', employees: 0, asset: { id: 'counter-kitchen-tools', kind: 'counter-and-kitchen-tools', description: '自购小灶、食具与首批有来源食材' }, debt: { id: 'opening-deposit-stock', creditor: '铺位房东与许记食材供货人', purpose: '柜位押金与首批食材' } } }),
    ],
  });

  installDecision({
    id: 'route-recorded-coastal-small-trader-1929', year: 1929, followYear: 1930, routes: ['recorded-coastal-small-trader'], title: '陌生人托带未开封包裹时怎样作答',
    prompt: '一名陌生人愿付高价托带未开封包裹，只说到岸有人认领。叶荣庆也不知道货主、内容、数量和交付人。',
    options: [
      option('trade-refuse-unknown-parcel', '拒绝来源、内容与收货人不明的包裹', { mind: 3, money: -2, position: 1 }, 'f14:trade:refuse', '1929 年拒绝经手来源和内容不明的包裹。', '少赚的高价对应清楚边界', '陌生人转找别处，你失去眼前收入；叶荣庆在下一批公开货上仍与你合作，因为拒绝记录也进入双方的经手账。'),
      option('trade-formal-channel', '请对方经公开货行补齐货主、清单与交付手续', { knowledge: 2, network: 2, money: -1 }, 'f14:trade:formal', '1929 年要求陌生货物转入有凭据的公开经办渠道。', '补不齐的包裹没有上船', '对方只补出一个收货称呼，无法说明货主和内容，货行拒收；你留下询问经过，没有把未发生的交易写成查获传奇。'),
      option('trade-verified-accept', '只有验明货物、货主和收货人后才有限接单', { knowledge: 2, money: 2, mind: 1 }, 'f14:trade:verify', '1929 年在验明货主、货物和收货人后接下有限订单。', '验货后的订单按普通价格结算', '包裹拆验为可公开交付的日用品，货主接受普通费率和到岸签收；高价诱因消失，你得到的是一笔可核小生意而非暴利。'),
    ],
  });

  installDecision({
    id: 'route-recorded-coastal-small-trader-1946', year: 1946, followYear: 1947, routes: ['recorded-coastal-small-trader'], title: '怎样使用战后第一笔周转资本',
    prompt: '路线恢复一部分，你手里的钱只能支持床位与返程储备、两批有凭据小货或一段公开商号合作。一次押尽可能扩大生意，也可能让全家失去退路。',
    options: [
      option('trade-reserve-return-money', '先保留房租、船票与返程储备，只做一批小货', { money: 1, mind: 3, position: 2 }, 'f14:trade:reserve', '1946 年先保留住处与返程储备，只做一批小货。', '小批成交没有变成错失一生', '一批日用品按期交付，利润有限；另一批低价机会被放弃，家中仍有房租、看病和更换路线的现金。'),
      option('trade-documented-partnership', '与叶荣庆按现金、客户和交付劳动建立有限商号合伙', { money: -4, network: 3, craft: 1 }, 'f14:trade:partnership', '1946 年建立有凭据的沿海小货有限合伙。', '小商号完成第一轮进销账', '你投入现金和账务，叶荣庆投入有限客户介绍与交付劳动；两批货的来源、库存、坏损、买主、欠款和退出条件分别入账。', { enterpriseStart: { id: 'f14-coastal-trading-house', name: '合成荣宁沿海小货商号', domainKey: 'D45', kind: 'documented-coastal-trading-partnership', workplace: '广东合成沿海埠镇公开货行铺位', supplier: '具名日用品与干货供货人', product: '来源与交付可核的日用品和干货小批贸易', employees: 0, partners: [{ personId: 'contact:f14_ye_rongqing', role: '有限客户介绍与交付劳动合伙人' }], asset: { id: 'documented-stock', kind: 'documented-trading-stock', description: '逐批标记来源、货主、数量和交付条件的小货存货' }, license: { id: 'registered-trade-scope', kind: 'documented-trade-registration', authority: '合成口岸具名管理机关', scope: '仅限登记货类与公开交付路线' } } }),
      option('trade-salaried-merchant-clerk', '转入公开商号做采购与交付账务，保留迁移储备', { money: 2, knowledge: 2, position: 2 }, 'f14:trade:clerk', '1946 年转入公开商号做受薪采购与交付账务。', '固定岗位给出老板和责任', '伍掌柜给出六周班表，你核采购、库存、买主和付款日；叶荣庆继续自己的路线，你不再承担全部货损，也没有自动取得商号股份。'),
    ],
  });

  installDecision({
    id: 'coastal-war', year: 1938, followYear: 1939, families: ['guangdongcoastal'], title: '封航、战事与地址变化时怎样接住一家人的生活',
    prompt: '船班缩减，货路与通信反复中断。父亲、母亲、燕棠、绍琼、伴侣与住客都在不同岗位和住处，不能由主角替所有人决定同行。',
    options: [
      option('coastal-stop-new-finish-confirmed', '停止接新远单，只完成已经确认的近程客货与住客交接', { mind: 3, money: -2, position: 1 }, 'f14:war:finish', '1938 年停止新远单并完成可确认的近程交接。', '缩线后每个人得到具体答复', '船行退回未装货，客栈逐位说明床位期限，小货客户收到交接或退款；父亲停一段远班，母亲保留客栈，其他人分别决定是否继续留下。', { warTurn: 'stop-new-finish-confirmed' }),
      option('coastal-local-legal-work', '转做本地可核的货栈、饭食与短程运输', { craft: 2, money: 1, network: 1 }, 'f14:war:local', '1938 年转做本地可核货栈、饭食与短程运输。', '本地工作不是一句避战', '你取得货栈班表和结算日，蔡玉莲缩床位增饭食，黄绍琼另接半日照料；父亲是否返家仍由船期、身体和他本人决定。', { warTurn: 'local-documented-work' }),
      option('coastal-split-addresses', '家人按各自工作保留地址、钱和下一次核信日', { network: 3, relation: 1, mind: 2 }, 'f14:war:split', '1938 年家人分别保存住处、工作、储备与下次核信日期。', '分开安置没有替任何人补写结局', '母亲守客栈，父亲停在最后可核港口，燕棠随文书岗位近迁，绍琼带孩子回亲族处；伴侣保留自己的工作，每人最后地址和下一次联系分别记录。', { warTurn: 'split-addresses-and-reserves' }),
    ],
  });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['guangdongcoastal'], priority: 12,
      sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }

  scene('f14-s01', '父亲回家先交船期与经手单', '梁海生把上次船班、应领工钱、实际到手、替人递送的具名书信和未交货件分别说明；海上见闻没有自动变成全知消息。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f14-s02', '母亲每天重排床位和饭食', '蔡玉莲按住客船期、能付的钱和是否带孩子重排床位；黄绍琼说清当日只能做一班，客栈没有一个永远有空的照料者。', { minAge: 2, maxAge: 6, priority: 23 });
  scene('f14-s03', '陌生包裹不能靠熟人一句话上船', '一名熟客托带未开封包裹，父亲要求货主、内容和收货人写清；熟悉只帮助找到答复人，不替代验明和记录。', { minAge: 4, maxAge: 8, priority: 22 });
  scene('f14-s04', '三个童年去处不能同一下午完成', '客栈账桌、船行票房和燕棠的语言课同时开始。你选一处，母亲、父亲和燕棠分别安排其余事务，没有默认女孩留在客栈。', { minAge: 6, maxAge: 11, priority: 22 });
  scene('f14-s05', '住客的行李需要双向签记', '住客寄存一只木箱，黄绍琼复述外观和不能代管的贵重物；取走时由本人核对，不把客栈写成对所有丢失无限负责。', { minAge: 8, maxAge: 13, priority: 21 });
  scene('f14-s06', '燕棠要学的是自己的工作', '梁燕棠想学语言与票据，明确不愿一辈子只替客栈跑腿。她的学费、试工、工资和是否离开埠镇单独记录。', { minAge: 10, maxAge: 15, priority: 21 });
  scene('f14-s07', '水客提供路线也可能拒绝', '叶荣庆只愿接一封有寄收地址的公开书信，拒绝一件没有货主的包裹；门路是逐次判断，不是主角永久拥有的能力。', { minAge: 11, maxAge: 16, priority: 20 });
  scene('f14-s08', '三份试工都要等留用答复', '船行、客栈和小货行分别列出岗位、班次、工钱、能经手的票货与答复日；介绍只带来试工，次年才确认是否留用。', { year: 1924, routes: ['coastal-passenger-cargo-operator', 'port-guesthouse-caterer', 'recorded-coastal-small-trader'], priority: 30 });
  scene('f14-s09', '第一次留用以后出现具体老板', '陈启荣、蔡玉莲或伍掌柜给出岗位与结算办法；你的工作地点、负责人、同事、顾客和下一步进入人生账。', { year: 1925, routes: ['coastal-passenger-cargo-operator', 'port-guesthouse-caterer', 'recorded-coastal-small-trader'], priority: 10 });
  scene('f14-s10', '迟到的船先影响三种人', '住客多付一晚床钱，货主错过交付日，船员延后一班工钱；同一次延误在三本账里产生不同后果。', { minYear: 1925, maxYear: 1937, priority: 20 });
  scene('f14-s11', '受潮货物按经手段核责任', '装船人、舱管、天气记录和到岸人各说明一段。赔付只覆盖可核损失，货主仍可对未决部分继续追问。', { routes: ['coastal-passenger-cargo-operator', 'recorded-coastal-small-trader'], minYear: 1926, maxYear: 1937, priority: 21 });
  scene('f14-s12', '客栈满房也可能没有现金', '三张床仍欠账，食材款与帮工工钱却已到期。蔡玉莲先核实际收款，再决定缩菜单、催款或停接新住客。', { routes: ['port-guesthouse-caterer'], minYear: 1926, maxYear: 1937, priority: 21 });
  scene('f14-s13', '结婚后争吵的是航线和两份工作', '你与伴侣为谁随船、谁保留岸上工作、双方父母的钱从哪本账出和是否要孩子争吵。两人分别说出不能放下的责任。', { minAge: 23, maxAge: 43, priority: 20 });
  scene('f14-s14', '父亲停航不等于失去主体性', '梁海生因腰伤少跑一班，亲族建议他把路线交给主角。他只交出能核的联系人，保留是否复航、转岸上或退休的决定。', { minAge: 26, maxAge: 48, priority: 19 });
  scene('f14-s15', '湿热、晕船与久站会让人停工', '发热、胃痛、晕船或腿伤迫使你少做一班。看诊、药钱、代班人、未完成交接和复工日分别记录。', { minAge: 25, maxAge: 55, priority: 19 });
  scene('f14-s16', '朋友的路线和家口也会改变', '叶荣庆改做另一段路线，黄绍琼因孩子生病减少班次，陈启荣准备转岸上；每人给出最后经手日，没人永久待命。', { minAge: 29, maxAge: 55, priority: 18 });
  scene('f14-s17', '1945 年先重核人、货和旧债', '恢复部分船班后，你逐项核仍在的船员、失效客户、未交货、住客欠账和亲人地址；没有凭和平消息把所有关系恢复原状。', { year: 1945, priority: 34 });
  scene('f14-s18', '1949 年去向落到八种可能', '系统列出家人、配偶、朋友、船份、铺具、存货、债务、证件与可核联系人，再让你从大陆、香港、台湾、澳门、东南亚、其他海外、继续流动或暂未定居中选择下一段。', { year: 1949, routes: ['coastal-passenger-cargo-operator', 'port-guesthouse-caterer', 'recorded-coastal-small-trader'], priority: 36 });
  scene('f14-s19', '中晚年把最后一班与未结账交清', '你可减少随船、转岸上、带新人、缩店或停止固定工作；最后顾客、未交货、住客寄存、船份、钥匙和债务逐项移交。', { minAge: 50, maxAge: 70, priority: 16 });
  scene('f14-s20', '异地去世仍要确认到人和账', '亲人、同事或主角在港口、船上或异地去世时，同行者口述、住处记录和后续证明可能先后到达；发生、知情、确认和遗留货账分别处理。', { minAge: 62, priority: 15 });

  C.annualRhythms['coastal-passenger-cargo-operator'] = [
    '一班船对应客票、货单、船员、燃料、天气与到岸签记；票房收入先扣实际成本，熟悉航线不会自动变成船主。',
    '陈启荣、船长和货主各只回答经手的一段；延误与货损有下一次答复，不用“跑了一年船”遮住具体结果。',
    '女性与男性进入票房、行李、甲板和到岸岗位的门槛不同，但都能积累可核经营能力，不获得时代外的自由流动。',
  ];
  C.annualRhythms['port-guesthouse-caterer'] = [
    '每位住客都有床位、饭食、行李与结算状态；客栈收入先扣采购、燃料、工钱、坏损和房租。',
    '蔡玉莲保留铺具与经营判断，黄绍琼保留工钱、休息和退伙权；家庭共同生活没有抹掉产权与劳动边界。',
    '船期变化会让住客延住、退房或欠账；每次答复落到具体人，满房不会自动变成盈利。',
  ];
  C.annualRhythms['recorded-coastal-small-trader'] = [
    '每批货核来源、货主、数量、保管、交付与余款；拒绝空白包裹和冒名签收，不以神秘路线制造暴利。',
    '叶荣庆可接单、延迟、拒绝或离线，买主也可退货和追问；人脉帮助获得答复，不替代凭据和本金。',
    '成交收入先扣进货、运输、坏损、退货、债与住处储备；跨境差价不会把小商人一步写成大企业家。',
  ];
  C.sceneFrames.guangdongcoastal = [
    { open: '港口先传来船期变化，客栈又有住客催饭与欠账，蔡玉莲、陈启荣和叶荣庆各只回答自己经手的一段。', close: '今天只接住一段人、票、货或床位；未到船班、受潮货、住客欠账和家人去向分别留待具名答复。' },
    { open: '潮水、雨势、票房和厨房同时改变一天的次序，燕棠、绍琼与伴侣也各自保留工作和家庭责任。', close: '你得到具体工作结果，也承担钱、身体、时间或关系代价；沿海流动没有让任何人变成主角的永久工具。' },
  ];
  C.sceneFrames['coastal-passenger-cargo-operator'] = C.sceneFrames.guangdongcoastal;
  C.sceneFrames['port-guesthouse-caterer'] = C.sceneFrames.guangdongcoastal;
  C.sceneFrames['recorded-coastal-small-trader'] = C.sceneFrames.guangdongcoastal;

  C.parentProfiles.guangdongcoastal = {
    mother: {
      name: '蔡玉莲', born: 1884, occupation: '经营港口客栈的床位、饭食、采购和账务并保留铺具产权', deathAgeBase: 79,
      activities: ['核过床位、实际收款、食材账和帮工工钱', '拒绝用自己的铺具替陌生货单担保', '晚年减少夜班但仍决定铺具与是否退伙'],
      words: ['“床睡满了，不等于钱都收到了，先看谁付了、谁欠着。”', '“绍琼的工钱是她养孩子的钱，不能拿一句一家人顶过去。”', '“铺具是我一件件攒的，合伙可以，谁的东西仍要写名字。”'],
    },
    father: {
      name: '梁海生', born: 1880, occupation: '按船期做客货杂务与有凭据递送，逐班核工钱和最后落点', deathAgeBase: 73,
      activities: ['交回一班客票、货件和实际工钱记录', '拒绝一件没有货主与收货人的高价包裹', '晚年减少跟船并亲自决定转岸上或停止固定工作'],
      words: ['“我带的是这张单上写清的人货，别的包裹谁开口都不接。”', '“船晚到只说明船晚到，人、货和钱要各自再核。”', '“熟路不是我的船，想入一份也要把修理、船员和赔货都算进去。”'],
    },
  };
  C.spouseProfiles.guangdongcoastal = {
    男: { name: '许瑞芳', bornOffset: 1, occupation: '港口票房与住客账务劳动者，保留自己的工资和娘家责任', values: '共同生活要谈清船期、夜班、两边父母与是否迁港，不接受自动守店和随迁' },
    女: { name: '伍启明', bornOffset: -1, occupation: '货栈验件与采购助理，按班领薪并照料自己的母亲', values: '愿意共同承担家用，不把妻子的客栈、货单或语言能力当成个人门路' },
  };
  C.childNames.guangdongcoastal = ['梁潮安', '梁泊宁'];

  var shipBase = {
    kind: 'transport-business', role: '客货船票据、货件与到岸交接劳动者', workplace: '广东合成沿海埠镇客货船行与短程泊位', employer: '合成海安客货船行', supervisor: '票货经办陈启荣', colleague: '船长邝柏年', publicPerson: '托运布包的赵货主', terms: '有限试工后按月与按班混合结算；客票、货单、船员、燃料、货损、赔付和经营份额分别记录',
    duties: '核客票、货主、件数、装船、舱位、到岸和签收，并对延误与受损给出分段答复',
    scenes: ['一批货到岸少一包，你按装船、舱位和卸货签记找到错放段，船长负责返运。', '船期因天气延后，住客、货主和船员得到三种不同答复与结算。', '票房多收一名同名旅客的钱，你核身份和班次退回差额，没有拿次日票补账。'],
  };
  var guesthouseBase = {
    kind: 'hospitality-business', role: '港口客栈床位、饭食与住客账务经营人', workplace: '广东合成沿海埠镇玉莲客栈', employer: '经营者蔡玉莲', supervisor: '蔡玉莲', colleague: '帮工黄绍琼', publicPerson: '候船住客麦先生', terms: '有限试工后按月或按班结算；铺具、床位、采购、帮工工资、住客欠账、行李与利润分别记录',
    duties: '安排床位与饭食，核采购、坏损、工钱、住客欠账和行李交接，每日给出明确结算与下一步',
    scenes: ['麦先生因船晚延住两晚，你先谈床饭钱，再由他决定续住或转同乡处。', '黄绍琼需要照顾生病的孩子，你们重排一班并记录代班工钱，没有把缺口默认为她的责任。', '食材到货少一筐，你与许供货人当面核件数，只付实际收到部分。'],
  };
  var tradeBase = {
    kind: 'trading-business', role: '有凭据的沿海小货采购、交付与账务劳动者', workplace: '广东合成沿海埠镇公开货行与交付路线', employer: '合成荣宁小货经办处', supervisor: '商号伍掌柜', colleague: '水客伙伴叶荣庆', publicPerson: '采购日用品的苏买主', terms: '有限试工后按批结算；来源、货主、数量、交付、退货、欠款与个人周转金分别记录',
    duties: '核小货来源与清单、谈交付条件、处理迟到退货和余款，只接能够说明货主与收货人的业务',
    scenes: ['苏买主说货色不一，你按原样单拆出两件退货并重算余款。', '叶荣庆临时改线，你停止承诺原到货日，给买主退款或改期选择。', '陌生人出高价托带包裹，你要求公开验货与货主资料，补不齐便拒绝。'],
  };
  Object.assign(C.routeCareerProfiles, {
    'coastal-passenger-cargo-operator': shipBase,
    'port-guesthouse-caterer': guesthouseBase,
    'recorded-coastal-small-trader': tradeBase,
  });
  C.routeCareerProfilesByGender = C.routeCareerProfilesByGender || {};
  C.routeCareerProfilesByGender['coastal-passenger-cargo-operator'] = {
    男: Object.assign({}, shipBase, { role: '客货轮甲板交接与码头货件助理', workplace: '广东合成沿海埠镇客货艇甲板与码头泊位', duties: '在时代岗位门槛下做甲板、货件与码头交接，核班次、件数与到岸签记，不自动取得船权' }),
    女: Object.assign({}, shipBase, { role: '客票、行李签与到岸交接登记员', workplace: '广东合成沿海埠镇船行票房与到岸登记台', duties: '在时代流动门槛下核客票、行李与到岸签记，并参与可公开的货件答复，不假定可自由进入所有船上岗位' }),
  };
  C.routeCareerProfilesByGender['port-guesthouse-caterer'] = {
    男: Object.assign({}, guesthouseBase, { role: '港口客栈采购、夜间床位与行李交接人', duties: '做较远采购、夜间床位与行李交接，同时核食材、房租和住客欠账，不取代母亲经营权' }),
    女: Object.assign({}, guesthouseBase, { role: '港口客栈饭食、床位与住客账务经营人', duties: '在时代劳动分工下管理饭食、床位、柜台与帮工排班，保留工资、休息和合伙决定' }),
  };
  C.routeCareerProfilesByGender['recorded-coastal-small-trader'] = {
    男: Object.assign({}, tradeBase, { role: '沿海小批货采购与码头交付经办人', duties: '在公开货行与码头核采购、货主、运输和交付，承担可证明的外勤风险而不接不明包裹' }),
    女: Object.assign({}, tradeBase, { role: '客栈柜台小货与侨眷订单账务经营人', workplace: '广东合成沿海埠镇客栈柜台与公开货行账台', duties: '在时代行动门槛下从柜台、侨眷订单和账务进入小货经营，逐步取得公开交付权限' }),
  };

  Object.assign(C.routeContactProfiles, {
    'coastal-passenger-cargo-operator': [
      { id: 'f14_ship_captain', label: '邝柏年', role: '对船况、班次与甲板交接负责的船长', status: 'supervisor', relation: 17, born: 1882 },
      { id: 'f14_cargo_owner', label: '赵德隆', role: '会追问迟到、受潮与赔付边界的布货托运人', status: 'nearby', relation: 18, born: 1888 },
      { id: 'f14_shore_clerk', label: '许梅真', role: '核客票、行李签与到岸回执的女登记员', status: 'coworker', relation: 24, born: 1903 },
    ],
    'port-guesthouse-caterer': [
      { id: 'f14_food_supplier', label: '许德菜', role: '按批说明食材数量、坏损与付款日的供货人', status: 'nearby', relation: 18, born: 1886 },
      { id: 'f14_guest', label: '麦宗礼', role: '因候船延住、会亲自决定续住与欠期的旅客', status: 'nearby', relation: 20, born: 1891 },
      { id: 'f14_luggage_worker', label: '卢少芬', role: '逐件核行李寄存与取件签记的客栈柜台工', status: 'coworker', relation: 23, born: 1904 },
    ],
    'recorded-coastal-small-trader': [
      { id: 'f14_trade_buyer', label: '苏月娥', role: '会验成色、退货并按实际交付付余款的小货买主', status: 'nearby', relation: 22, born: 1895 },
      { id: 'f14_customs_broker', label: '伍成礼', role: '只处理公开货单与具名手续的货行经办人', status: 'supervisor', relation: 16, born: 1884 },
      { id: 'f14_packaging_worker', label: '邓海珠', role: '核包装、件数和受潮责任的货行同事', status: 'coworker', relation: 25, born: 1902 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'coastal-passenger-cargo-operator': ['晕船与风浪后的反复呕吐', '甲板湿滑造成的腰腿损伤', '夜班与船期变化造成的失眠头痛'],
    'port-guesthouse-caterer': ['久站与搬运造成的腰腿疼痛', '厨房烟气与湿热造成的呼吸不适', '夜间接客和早市采购造成的过劳'],
    'recorded-coastal-small-trader': ['雨季奔走后的反复发热', '负重与久坐核账造成的肩背疼痛', '交易争议与不稳船期造成的失眠胃痛'],
  });

  Object.assign(C.publicRouteProfiles, {
    'coastal-passenger-cargo-operator': {
      publicGroup: '合成的公开船期、失物与货损答复簿', publicRole: '核公开班次、失物、迟到货与具名答复日',
      covertRole: '不进入秘密身份线，不借客票与货单收集未授权人员信息', infiltrationRole: '不冒名登船或套取旅客隐私，只处理岗位授权记录',
      contact: { id: 'public_f14_ship', label: '邝海宜', role: '登记公开船期、失物与货损答复的经手人', status: 'colleague', relation: 18, born: 1905 },
    },
    'port-guesthouse-caterer': {
      publicGroup: '合成的港口床位、饭食与旅客互助簿', publicRole: '核公开床位、欠账、行李与需要转介的旅客困难',
      covertRole: '不进入秘密身份线，不把住客姓名、书信和行李转作未授权信息', infiltrationRole: '不借住店套取行踪，只处理住客主动提供的住宿事实',
      contact: { id: 'public_f14_guest', label: '黄佩宜', role: '登记公开床位、欠账与旅客转介的互助经手人', status: 'colleague', relation: 19, born: 1906 },
    },
    'recorded-coastal-small-trader': {
      publicGroup: '合成的公开货源、退货与交付答复簿', publicRole: '核公开货主、件数、退货、欠款与下一次交付日',
      covertRole: '不进入秘密身份线，不接空白包裹或以顾客货单交换未授权消息', infiltrationRole: '不冒名货主或收货人，只处理可核公开商贸',
      contact: { id: 'public_f14_trade', label: '伍海宜', role: '登记公开货源、退货与交付争议的经手人', status: 'colleague', relation: 17, born: 1904 },
    },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('skilled', 'coastal-passenger-cargo-operator');
  addRouteToTrack('skilled', 'port-guesthouse-caterer');
  addRouteToTrack('literate', 'recorded-coastal-small-trader');

  // 1949 后八类去向：F14 同时把此前只在设计注册表中的澳门和东南亚落成可玩状态。
  C.post1949Paths.macau = { name: '迁往澳门', place: '澳门', rhythmKey: 'post-macau' };
  C.post1949Paths['southeast-asia'] = { name: '迁往东南亚（本轮抵达新加坡）', place: '新加坡', rhythmKey: 'post-southeast-asia' };
  Object.assign(C.designRegistry.post1949Destinations.macau, { runtimeStatus: 'playable-verified', legacyKeys: ['macau'] });
  Object.assign(C.designRegistry.post1949Destinations['southeast-asia'], { runtimeStatus: 'playable-verified', legacyKeys: ['southeast-asia'] });
  C.legacyPost1949DestinationMap.macau = 'macau';
  C.legacyPost1949DestinationMap['southeast-asia'] = 'southeast-asia';

  C.post1949Jobs.macau = {
    manual: { role: '内港装卸与艇务工', casualRole: '内港驳运与装卸短工', workplace: '澳门内港货运泊位', duties: '按船货批次装卸、清点并核对工票与当天工钱', terms: '短工按日结算；固定艇务班次另行登记' },
    skilled: { role: '客货艇检修与交接员', casualRole: '艇具修理试工', workplace: '澳门内港一间艇务修理处', duties: '检查艇具、修补损件并登记交接与材料', terms: '先试工一个月，留用后按月结算' },
    literate: { role: '旅店与船务账务员', casualRole: '旅店柜台与船单抄写员', workplace: '澳门内港附近旅店与船务柜台', duties: '核床位、来客、船单、采购和付款日，不接触未授权客人隐私', terms: '先试做一个月，按月结算工钱' },
    care: { role: '街坊诊所登记与照料员', casualRole: '诊所临时代班助手', workplace: '澳门一间街坊诊所', duties: '登记病家、分装常用药并核复诊地址', terms: '先试做一个月，资格范围和夜班当面说明' },
  };
  C.post1949Jobs['southeast-asia'] = {
    manual: { role: '港区驳船与货栈工', casualRole: '新加坡港区驳船装卸短工', workplace: '新加坡港区货栈与驳船泊位', duties: '按货单转运、清点并核工票与当天工钱', terms: '短工按船货批次结算；固定班次另谈' },
    skilled: { role: '船体清理与修理工', casualRole: '船坞除锈与修理试工', workplace: '新加坡港区船坞', duties: '清理船体、除锈、补漆并登记工具与危险工段', terms: '先试工一个月，材料损耗与工伤另记' },
    literate: { role: '华商货单与双语文书员', casualRole: '货栈抄单与语言助手', workplace: '新加坡一间华商货栈', duties: '核货单、来函、转运地址并学习当地工作用语', terms: '按月结算，语言学习不替代工作与居留条件' },
    care: { role: '社区诊疗登记助手', casualRole: '社区临时照料助手', workplace: '新加坡一处社区诊疗点', duties: '登记病家、分装药物并核语言与转诊信息', terms: '先试做一个月，资格范围当面说明' },
  };
  C.post1949People.macau = { employer: '内港用工经办梁景泉', coworker: '同班工友何月珍', neighbor: '合租住户郭嫂' };
  C.post1949People['southeast-asia'] = { employer: '港区用工经办陈国添', coworker: '同工段的林美珠', neighbor: '合租房东郑太太' };

  var final1949 = C.decisions.find(function (item) { return item.id === 'final-1949'; });
  if (final1949 && !final1949.options.some(function (item) { return item.id === 'move-macau'; })) {
    final1949.options.splice(3, 0,
      { id: 'move-macau', label: '我凭已经核实的船期、证件和联系人前往澳门，抵达后先找床位与明确岗位', gate: { money: 18, network: 25 }, delta: { money: -18, relation: -3, position: -2 }, post1949Choice: 'macau', fact: '1949 年凭可核船期、证件和联系人前往澳门，准备从内港附近重新安排住处与谋生。' },
      { id: 'move-southeast-asia', label: '我凭已核实的航线、入境条件和联系人前往东南亚，本轮先抵达新加坡', gate: { money: 28, network: 38 }, requiredChannels: ['conversation'], delta: { money: -28, relation: -5, position: -3 }, post1949Choice: 'southeast-asia', fact: '1949 年凭可核航线、入境条件和联系人前往东南亚，本轮先抵达新加坡安排住处与工作。' }
    );
  }

  C.actions.push(
    { id: 'macau-inner-harbour-work', name: '在澳门内港完成一轮找工、试工或续工', livelihoodAction: true, minYear: 1950, post1949Choices: ['macau'], spirit: 4, delta: { craft: 2, money: 3, position: 2, health: -1 }, note: '根据原有技能进入装卸、艇务、旅店账务或诊所岗位，当年得到明确试工或留用答复。' },
    { id: 'macau-room-route-ledger', name: '核内港床位、船期、家书与每月开支', minYear: 1950, post1949Choices: ['macau'], spirit: 3, delta: { mind: 2, network: 2, relation: 1, money: -1 }, channels: ['conversation'], note: '把床位、工作、船期和亲人地址分开核，不用“到了澳门”概括已经安顿。' },
    { id: 'singapore-port-work', name: '在新加坡港区完成一轮找工、试工或续工', livelihoodAction: true, minYear: 1950, post1949Choices: ['southeast-asia'], spirit: 4, delta: { craft: 3, knowledge: 1, money: 3, health: -1 }, note: '根据原有技能进入驳运、船坞、货栈文书或社区照料，当年得到岗位、工钱与是否留用答复。' },
    { id: 'singapore-language-room-network', name: '核工作用语、合租床位与转寄地址', minYear: 1950, post1949Choices: ['southeast-asia'], spirit: 3, delta: { knowledge: 3, network: 2, relation: 1, money: -1 }, channels: ['conversation'], note: '语言、住屋与跨境通信分别处理；同乡联系人提供入口，不替你保证长期工作。' }
  );

  function appendArrival(choice, employmentEntry) {
    var decision = C.decisions.find(function (item) { return item.id === 'post49-arrival'; });
    if (!decision || decision.options.some(function (item) { return item.id === choice.id; })) return;
    var followup = choice.followup;
    C.ordinaryEvents.push({
      id: 'echo-' + choice.echo.replace(/:/g, '-'), title: followup.title, text: followup.text,
      year: 1951, priority: 45, requiresEchoes: [choice.echo], post1949Choices: choice.post1949Choices.slice(),
      sourceIds: choice.post1949Choices[0] === 'macau' ? ['SRC-POST-MACAU-CENSUS-1950', 'SRC-POST-MACAU-INNER-HARBOUR'] : ['SRC-POST-SG-KEPPEL', 'SRC-POST-SG-HOUSING'],
      reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    });
    delete choice.followup;
    choice.employmentEntry = employmentEntry;
    decision.options.push(choice);
  }

  appendArrival(option('macau-inner-harbour-bed-work', '我先在内港附近租床位，再逐处核船务、旅店或货栈工作', { position: 3, money: 2, health: -1 }, 'post49:macau:bed-work', '1950 年在澳门内港附近租下床位并开始逐处找工。', '床位旁挂起第一件工作衣', '第二年，一份试工得到留用答复，床位和工钱暂时接上；房租、拥挤和船期仍要求每月重排。', { post1949Choices: ['macau'], postProfile: { arrival: '抵达澳门并在内港附近租下一处床位', place: '澳门内港附近的合租住处', livelihood: '从船务、旅店、货栈或原有手艺试工', companions: '同行者按各自岗位和床位分别落脚', leftBehind: '未同行家人与旧识依靠转寄地址联系' } }), 'trial');
  appendArrival(option('macau-verified-contact-work', '我拿核实过的介绍信去船务、旅店或诊所亲自谈岗位与工钱', { network: 3, money: 2, mind: 1 }, 'post49:macau:contact', '1950 年在澳门凭核实介绍获得一次明确面谈与试工。', '介绍人没有替你签下的岗位', '第二年，试工按职责给出留用或结束答复；介绍人只提供见面，工作仍靠你完成并谈清报酬。', { post1949Choices: ['macau'], postProfile: { arrival: '抵达澳门并凭核实介绍寻找工作', place: '澳门内港与街坊工作地点之间', livelihood: '以原有航运、账务、旅店或照料技能谋生', companions: '同行者各自面对岗位与住处条件', leftBehind: '原居地关系通过有限船邮联系' } }), 'interview');
  appendArrival(option('macau-family-room-work', '我与实际同行家人逐项谈房租、工作和照料，再共同租屋', { relation: 3, position: 2, money: -2 }, 'post49:macau:family', '1950 年在澳门与实际同行家人协商后共同租屋。', '门后重写过的工作与照料表', '第二年，房租、做饭和照料有了轮值，各人的工作仍独立；有人换班或来信时，这张表会继续改。', { post1949Choices: ['macau'], postProfile: { arrival: '抵达澳门后与实际同行家人共同租屋', place: '澳门一处合租家庭住处', livelihood: '在家口责任之外逐步接续工作', companions: '只包括实际同行且同意共同生活的人', leftBehind: '没有同行的人保留原住处和自己的道路' } }), 'seeking');
  appendArrival(option('singapore-port-bed-work', '我先在港区附近找到床位，再从驳运、船坞或货栈试工', { position: 3, money: 2, health: -1 }, 'post49:singapore:port', '1950 年在新加坡港区附近租下床位并开始试工。', '第一张写着工段的工票', '第二年，你在具体工段获得续工或结束答复；港区繁忙带来工作，也带来拥挤住屋、危险和不固定班次。', { post1949Choices: ['southeast-asia'], postProfile: { arrival: '抵达新加坡并在港区附近租床位', place: '新加坡港区附近的拥挤合租住处', livelihood: '从驳运、船坞、货栈或原有技能试工', companions: '同行者按各自工作与住屋条件分别落脚', leftBehind: '故乡与其他港口关系依靠跨境转寄' } }), 'trial');
  appendArrival(option('singapore-language-trade-work', '我白天做有工票的短工，晚上学工作用语与货单', { knowledge: 3, craft: 1, money: 1, health: -2 }, 'post49:singapore:language', '1950 年在新加坡以短工和工作语言学习并行落脚。', '写着几种用语的货单边角', '第二年，你听懂更多危险、工序和工钱要求；语言进步没有消除住屋、资格和工作波动。', { post1949Choices: ['southeast-asia'], postProfile: { arrival: '抵达新加坡后以短工和语言学习并行', place: '新加坡港区与华商社区之间', livelihood: '通过短工、语言和货单能力接续谋生', companions: '同住者各自承担工作与亲属汇款', leftBehind: '来信与汇款可能经多处转寄才抵达' } }), 'casual');
  appendArrival(option('singapore-family-address-work', '我先核实亲友住址与各自工作，再决定是否共同租住', { relation: 3, network: 2, position: 2, money: -2 }, 'post49:singapore:family', '1950 年在新加坡核实亲友地址和工作后安排共同住处。', '地址核实后才添上的一张床', '第二年，一位实际愿意同行的家人或亲友加入合租，其他人仍在各自地点；团聚只发生到能够确认的范围。', { post1949Choices: ['southeast-asia'], postProfile: { arrival: '抵达新加坡并按核实地址寻找亲友', place: '新加坡一处华人社区合租住处', livelihood: '一边维持零工一边核实更长期岗位', companions: '只与实际找到且愿意共同承担房租的人生活', leftBehind: '未找到的人继续保留最后可知消息' } }), 'seeking');

  C.ordinaryEvents.push(
    { id: 'post-macau-inner-harbour-shift', title: '内港一班船货改变床位与工钱', minYear: 1952, post1949Choices: ['macau'], text: '一班船货迟到，你的工时延后，合租住户也要重排做饭和照料。用工经办给出实际工票，床位与寄回的钱重新计算。', delta: { money: 1, health: -1, mind: 1 }, sourceIds: ['SRC-POST-MACAU-INNER-HARBOUR'], reviewStatus: 'runtime-regression-and-source-linked-needs-final-review' },
    { id: 'post-macau-room-census-question', title: '住屋里的人需要分别登记', minYear: 1953, post1949Choices: ['macau'], text: '房东逐位核住客姓名、工作和实际同住关系。你只说明自己的住处与岗位，没有把远方亲属或临时借宿者写成永久家口。', delta: { position: 1, mind: 2 }, sourceIds: ['SRC-POST-MACAU-CENSUS-1950'], reviewStatus: 'runtime-regression-and-source-linked-needs-final-review' },
    { id: 'post-macau-old-route-new-job', title: '旧航运经验换成一项岸上职责', minYear: 1954, post1949Choices: ['macau'], text: '你用过去的票货、客栈或账务记录争取一项更固定职责。负责人只认实际能做的部分，旧门路没有自动带来经营权。', delta: { craft: 2, position: 1 } },
    { id: 'post-singapore-port-batch', title: '港区一批船货按工票结算', minYear: 1952, post1949Choices: ['southeast-asia'], text: '驳船送来一批货，你与同工段的人按件数、工段和工票核收入；少一件货由具名经手段追查，没有从整班工资里含糊扣除。', delta: { money: 1, craft: 1 }, sourceIds: ['SRC-POST-SG-KEPPEL'], reviewStatus: 'runtime-regression-and-source-linked-needs-final-review' },
    { id: 'post-singapore-crowded-room', title: '拥挤住处又要加一张床', minYear: 1953, post1949Choices: ['southeast-asia'], text: '房东想在合租屋再添床位。住户逐项谈通道、做饭、清洁和租金；你可以接受、换屋或只续短期，没有被同乡关系强迫留下。', delta: { money: -1, relation: 1, mind: 2 }, sourceIds: ['SRC-POST-SG-HOUSING'], reviewStatus: 'runtime-regression-and-source-linked-needs-final-review' },
    { id: 'post-singapore-work-words', title: '工作用语终于不再只靠猜', minYear: 1954, post1949Choices: ['southeast-asia'], text: '你向林美珠核对危险、工具、工钱与休息的说法，再把它写进货单边角。沟通改善一项工作，资格和住屋压力仍然存在。', delta: { knowledge: 2, craft: 1 } }
  );

  C.annualRhythms['post-macau'] = [
    '内港船期、床位、工票与转寄家书构成这一年；每次工作都落到具体泊位、负责人和结算日。',
    '航运、旅店和街坊工作彼此相连，却不自动变成博彩经营权；许可、资本、合伙和公开批给需要另外取得。',
    '同住者各自承担工作、医药与亲属责任，你们共同排房租和做饭，不把彼此家人合成一个家口。',
  ];
  C.annualRhythms['post-southeast-asia'] = [
    '本轮在新加坡，港区工票、语言、拥挤床位与跨境来信构成一年；东南亚不是一个没有地方差异的统一场景。',
    '一批船货带来短工，也可能因船期结束而停；你按实际工段接续技能，没有把港口繁忙写成人人发财。',
    '同乡和华商联系人能提供一次见面、翻译或床位，长期工作、居留与亲属汇款仍需各自核实。',
  ];
  C.sceneFrames['post-macau'] = [
    { open: '内港船期、合租床位和一封转寄家书同时变化，用工经办与邻人只回答各自知道的一段。', close: '你接住一班工作和近期住处，并把许可、货账、家人地址和仍未知的消息分别留下。' },
    { open: '旅店、艇务与街坊工作各传来一次机会，过去的航运经验只能帮助你争取实际试工。', close: '岗位给出明确答复，经营权仍要靠资本、合伙与公开程序逐步取得；没有因抵达澳门自动成为富商。' },
  ];
  C.sceneFrames['post-southeast-asia'] = [
    { open: '新加坡港区的驳船、货栈工票和拥挤住处把一天排满，工作用语仍需向具名同事确认。', close: '你完成一项工段并核工钱，也重新安排房租与转寄地址；港口机会和生活压力一起进入下一年。' },
    { open: '一批船货结束、另一份华商货单开始，同住者各自计算要寄给亲人的钱和能否续床位。', close: '你只按本轮新加坡的实际条件作答，没有把整个东南亚写成同一种社会与命运。' },
  ];

  var koreanWar = C.events.find(function (event) { return event.id === 'korean-war-1950'; });
  if (koreanWar) ['macau', 'southeast-asia'].forEach(function (key) { if (koreanWar.post1949Choices.indexOf(key) < 0) koreanWar.post1949Choices.push(key); });
  C.events.push(
    { id: 'macau-census-and-housing-1950', year: 1950, eraBrief: true, eraScope: '澳门', post1949Choices: ['macau'], title: '人口普查与战后住屋现实', knownThrough: ['newspaper', 'conversation', 'books'], delta: { position: -1, mind: 1 }, knownText: '你知道澳门在 1950 年进行人口普查；人口与住户资料能说明战后住屋规模，却不会替你保证床位、岗位或家人一定团聚。', unknownText: '街坊开始逐户核实际住客与家口，你先感到床位、工作和登记都需要更具体的证明，还不知道全澳数字。', fact: '1950 年澳门人口普查进入地方生活记录，个人住处与工作仍需分别落实。', historySource: { label: '澳门统计暨普查局：澳门人口普查历史', url: 'https://censos.dsec.gov.mo/CensosIntroduction.aspx?lang=zh-CN' } },
    { id: 'singapore-port-housing-1950', year: 1950, eraBrief: true, eraScope: '新加坡', post1949Choices: ['southeast-asia'], title: '繁忙港区与严重住屋短缺', knownThrough: ['newspaper', 'conversation', 'books'], delta: { money: -1, health: -1, network: 1 }, knownText: '你知道港区船货与船体维护提供工作，同时 1950 年代住屋短缺和拥挤卫生问题十分突出；工作机会与生活代价必须一起计算。', unknownText: '港区不断招短工，合租屋也不断加床位。你先从工票、房租和拥挤生活感到城市压力，还不知道更大的政策变化。', fact: '1950 年身处港口工作繁忙而住屋严重短缺的新加坡。', historySource: { label: '新加坡国家文物局与政府住屋史', url: 'https://www.roots.gov.sg/stories-landing/stories/the-story-of-keppel-bay/story' } },
    { id: 'macau-gaming-tender-1961', year: 1961, eraBrief: true, eraScope: '澳门', post1949Choices: ['macau'], title: '博彩经营进入公开竞投与新批给阶段', knownThrough: ['newspaper', 'conversation', 'books'], delta: { network: 1, mind: 1 }, knownText: '你知道澳门博彩经营进入公开竞投与重新批给阶段。它牵动旅店、交通、账务和娱乐服务，但一般从业者不会因为在澳门生活就自动成为承批人。', unknownText: '旅店、交通和娱乐服务忽然传出扩张消息，你先看到招工与合作询问增加，还不能确认最终批给和每项业务边界。', fact: '1961 年澳门博彩经营进入公开竞投与重新批给阶段。', historySource: { label: '澳门博彩监察协调局：博彩业历史', url: 'https://www.dicj.gov.mo/web/cn/history/index.html' } }
  );

  // 稀有企业链：可以成为旅业、交通与娱乐经营网络中的重要经营者，不能用一次点击伪造史实承批人。
  installDecision({
    id: 'macau-hospitality-concession-1962', year: 1962, followYear: 1963, post1949Choices: ['macau'], title: '澳门旅业与娱乐经营扩张时怎样参与',
    prompt: '新的独家批给已经形成历史事实。你可以继续受薪、建立有许可的旅运住宿协作企业，或在资本、关系和经营记录足够时成为获批经营网络的有限合作方；这不等于改写真实承批人名单。',
    options: [
      option('macau-remain-salaried-professional', '继续当前受薪岗位，只承接写明职责的旅店、交通或账务工作', { money: 2, position: 2, health: 1 }, 'f14:macau:wage', '1962 年继续在澳门做有明确岗位和工钱的受薪工作。', '扩张行业没有吞掉原有生活', '你完成一项旅店、交通或账务职责并按月结算；博彩扩张改变周边工作，却没有把你自动写成经营者。'),
      option('macau-licensed-hospitality-supplier', '用有限资本建立有许可的旅店、交通与餐饮协作企业', { money: -8, network: 3, craft: 2 }, 'f14:macau:supplier', '1962 年建立有许可的澳门旅运住宿协作企业。', '第一份许可和合同只覆盖列明业务', '企业取得旅店接待、交通联络与餐饮供应中的有限业务，首份合同列明客户、期限和结算；没有博彩承批权，也不能借客户关系进入未授权经营。', { gate: { money: 28, network: 38 }, enterpriseStart: { id: 'f14-macau-hospitality-supplier', name: '合成海莲旅运住宿协作社', domainKey: 'D44', kind: 'licensed-hospitality-transport-supplier', workplace: '澳门内港与旅店区之间', supplier: '具名食材、车辆与旅店用品供应人', product: '旅店接待、交通联络与餐饮供应', employees: 3, asset: { id: 'guest-transport-tools', kind: 'hospitality-and-transport-tools', description: '列明归属的接待柜、行李车与餐饮器具' }, license: { id: 'hospitality-transport-scope', kind: 'hospitality-and-transport-license', authority: '澳门当时具名主管机关', scope: '仅限许可列明的旅店接待、交通联络与餐饮服务' } } }),
      option('macau-limited-concession-network-partner', '以长期经营记录和有限资本加入获批经营网络的旅运住宿合作层', { money: -14, network: 4, position: 3 }, 'f14:macau:network-partner', '1962 年成为澳门获批经营网络中有独立账目的有限旅运住宿合作方。', '稀有经营路径保留真实批给边界', '你的合成企业没有被写成另一家史实承批公司，而以有限股权、旅运住宿资产和独立账目进入获批经营网络；员工工资、客户合同、许可和退出条件继续接受逐项审查。', { gate: { money: 45, network: 58, position: 48 }, enterpriseStart: { id: 'f14-macau-limited-concession-network', name: '合成海湾旅业娱乐协作联合体', domainKey: 'D48', kind: 'bounded-fiction-concession-network-partner', workplace: '澳门旅店、交通与娱乐服务区', supplier: '具名旅店用品、交通与餐饮供应人', product: '在史实承批网络下有合同边界的旅运、住宿与娱乐配套服务', employees: 8, shareStatus: '合成角色持有限经营股与劳动责任，不冒充史实承批公司或实际历史股东', asset: { id: 'hotel-transport-service-assets', kind: 'hotel-transport-service-assets', description: '列明归属与抵押边界的旅店接待、车辆和账务资产' }, license: { id: 'contracted-service-license', kind: 'contracted-hospitality-entertainment-service-license', authority: '澳门当时具名主管机关与史实承批经营网络', scope: '仅限合同列明的旅运、住宿与娱乐配套服务' }, concession: { id: 'network-participation', kind: 'limited-participation-under-historical-concession', authority: '澳门当时具名主管机关', scope: '不取得独立博彩承批人身份，只记录在史实批给网络下的有限合作权益', awardMethod: '在 1961 年公开竞投与新财团中标、1962 年公司注册并开始经营的史实边界下，以合成有限合作身份进入', status: 'active-bounded-fiction', startedYear: 1962 } } }),
    ],
  });
})(typeof window !== 'undefined' ? window : globalThis);
