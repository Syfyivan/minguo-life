// 民国人生 · F18 西安手艺、商号与交通服务家庭运行时包 v0.7.5
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f18.js');

  C.version = '0.7.5';
  C.familyDecisionKeys.xianartisans = { path: 'xian-path', war: 'xian-war' };
  Object.assign(C.designRegistry.families.F18, {
    designStatus: 'runtime-reviewed-first-round',
    runtimeStatus: 'playable-verified',
    runtimeFamilyKey: 'xianartisans',
  });
  C.runtimeFamilyDesignMap.xianartisans = 'F18';
  Object.assign(C.legacyRouteDomainMap, {
    'xian-repair': 'D11',
    'xian-station': 'D09',
    'xian-shop': 'D14',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F18-XIAN-ECONOMY-UPPER': {
      label: '陕西省地方志办公室《西安市志》第三卷·经济（上）',
      url: 'https://dfz.shaanxi.gov.cn/zslm/fzzlk/xbsxsxz/xbsxz/xas_16198/201405/P020240923626065468911.pdf',
      supports: ['西安近代工业、手工业、交通与铁路相关经济背景'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F18-XIAN-ECONOMY-LOWER': {
      label: '陕西省地方志办公室《西安市志》第四卷·经济（下）',
      url: 'https://dfz.shaanxi.gov.cn/zslm/fzzlk/xbsxsxz/xbsxz/xas_16198/201405/P020240923625626488272.pdf',
      supports: ['西安商号、市场、生活服务与经营管理背景'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F18-MARKET-MEMORY': {
      label: '陕西省地方志办公室《昔日的骡马市》',
      url: 'https://dfz.shaanxi.gov.cn/zslm/zjyd/fzsy/201811/t20181128_2623618.html',
      supports: ['骡马市附近小客店、杂货、染房与手艺营生的空间背景'],
      status: 'source-linked-needs-final-review',
    },
  });

  C.families.xianartisans = {
    key: 'xianartisans',
    name: '西安手艺商号与交通家',
    born: 1910,
    place: '西安城内合成街区',
    defaultSeed: 1810,
    defaultNames: { 男: '杜修远', 女: '杜月琴' },
    motif: '客户送修物、东家材料、自家工具、客店寄存物和家庭钱分别登记；铁路改变客流与岗位，但不会自动把学徒写成老板。',
    start: { body: 48, knowledge: 26, craft: 38, mind: 42, network: 36, fame: 24 },
    startRes: { money: 26, health: 70, relation: 68, position: 34 },
    subjects: {
      mother: { label: '母亲', status: 'alive', health: 60, agency: 86, note: '客店账房兼饭食经营，工资、灶具与寄存责任属于她自己' },
      father: { label: '父亲', status: 'alive', health: 61, agency: 78, note: '民用修理匠，区分自家工具、东家材料与客户送修物' },
      spouse: { label: '配偶', status: 'not-met', health: 66, agency: 80, note: '是否夜班、迁铺、合伙与照料双方父母都要共同商量' },
      household: { label: '家口', status: 'together', strength: 58, agency: 76 },
      support: { label: '安身支持', status: 'street-shop-and-guesthouse', strength: 40, agency: 74 },
      connections: { label: '交通与商号门路', status: 'trial-introductions-only', strength: 28, agency: 72 },
      workers: { label: '师傅同事与学徒', status: 'separate-terms', strength: 24, agency: 80 },
      ledger: { label: '工单寄存与企业账', status: 'separate-records', strength: 42, agency: 78 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 78, note: '不自动继承铺位、客户、工具债或照料义务' },
    },
    contacts: {
      f18_sun_shaoting: { label: '孙绍庭', role: '修理铺东家兼接单人，决定报价、材料与是否返工', status: 'nearby', relation: 22, agency: 75, note: '能留用或结束合作，不能把自己改料的损失全推给工匠' },
      f18_feng_baoyi: { label: '冯宝义', role: '车站货房临时理货人，核货票、件数、破损和班工钱', status: 'nearby', relation: 20, agency: 76, note: '能给有限试班，不能保证正式铁路职位' },
      f18_bai_xiuzhen: { label: '白秀珍', role: '街区小客店兼杂货经营者，有自己的店位、存货和女儿', status: 'nearby', relation: 27, agency: 88, note: '可介绍公开缺工、拼购或拒绝担保' },
      f18_du_yueqin: { label: '杜月琴', role: '想学修理、商号记账或车站文书的手足', status: 'nearby', relation: 53, agency: 90, note: '自己决定就业、婚姻与住处，不是免费账房' },
      f18_luo_ke: { label: '罗先生', role: '会带原工单回来核返工责任的送修客户', status: 'distant', relation: 15, agency: 74, note: '能提出赔偿要求，也要说明物件后来怎样使用' },
      f18_zhao_wenshu: { label: '赵文淑', role: '代写地址与货票、也找固定文书工作的识字人', status: 'nearby', relation: 19, agency: 82, note: '可互相复核，不能无偿承担全部错字责任' },
    },
  };

  Object.assign(C.routes, {
    'xian-repair': { name: '民用修理、验件与带徒', family: 'xianartisans', summary: '从有期限学徒做起，逐件处理工单、材料、返工、工具和是否开铺。' },
    'xian-station': { name: '车站货房理货与运输文书', family: 'xianartisans', summary: '核货票、件数、破损、领取人、班次和工资，铁路职位不由一次介绍自动保证。' },
    'xian-shop': { name: '客店商号账房与饭食服务', family: 'xianartisans', summary: '管理房钱、食材、寄存物、采购与顾客交接，并决定继续受薪还是按约合伙。' },
  });

  C.actions.push(
    { id: 'f18-learn-work-orders', name: '认工具、工单与返工边界', families: ['xianartisans'], minAge: 6, maxAge: 17, spirit: 2, delta: { craft: 3, knowledge: 2, mind: 1 }, contactEffects: { f18_sun_shaoting: { relation: 1 } }, note: '分清客户送修物、东家材料和自家工具；儿童不操作危险机器。' },
    { id: 'f18-help-guest-ledger', name: '帮母亲核房钱、饭食与寄存签', families: ['xianartisans'], minAge: 6, maxAge: 17, spirit: 2, delta: { knowledge: 2, craft: 2, relation: 1, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 1 } }, contactEffects: { f18_bai_xiuzhen: { relation: 1 } }, note: '客人寄存物不进入店货或家庭资产。' },
    { id: 'f18-learn-address-cargo', name: '学识字、地址与货票核对', families: ['xianartisans'], minAge: 9, spirit: 3, delta: { knowledge: 4, mind: 2, network: 1 }, channels: ['conversation'], contactEffects: { f18_feng_baoyi: { relation: 1 }, f18_zhao_wenshu: { relation: 1 } }, note: '只学公开货票与地址，不让孩子替车站放货。' },
    { id: 'f18-repair-bench-shift', name: '按工单完成修理与交件复核', routes: ['xian-repair'], minAge: 13, spirit: 4, careerAction: true, delta: { craft: 4, knowledge: 1, money: 2, health: -1 }, subjectDelta: { ledger: { strength: 2 }, workers: { strength: 1 } }, contactEffects: { f18_sun_shaoting: { relation: 2 }, f18_zhao_apprentice: { relation: 1 } }, note: '材料变化、返工原因和谁批准逐项写在工单上。' },
    { id: 'f18-customer-repair-handoff', name: '与客户核旧损伤、返工和赔偿范围', routes: ['xian-repair'], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 3, network: 2, money: 1 }, contactEffects: { f18_luo_ke: { relation: 2 }, f18_sun_shaoting: { relation: 1 } }, note: '只赔已经确认由本次修理造成的范围，争议继续留档。' },
    { id: 'f18-station-cargo-check', name: '在货房核货票、件数与破损', routes: ['xian-station'], minAge: 13, spirit: 4, careerAction: true, delta: { body: 2, knowledge: 2, craft: 2, money: 2, health: -1 }, contactEffects: { f18_feng_baoyi: { relation: 2 }, f18_ma_yong: { relation: 1 } }, note: '领取人、货损和交接班分别确认，不凭口信越权放货。' },
    { id: 'f18-station-shift-ledger', name: '核班次、临时工钱和下一次缺额', routes: ['xian-station'], minAge: 16, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 2, network: 2, money: 1 }, channels: ['conversation'], contactEffects: { f18_feng_baoyi: { relation: 2 }, f18_zhao_wenshu_route: { relation: 1 } }, note: '临时班、固定班和正式职位使用不同答复。' },
    { id: 'f18-shop-room-account', name: '核客房、饭食、采购与寄存账', routes: ['xian-shop'], minAge: 13, spirit: 3, careerAction: true, delta: { knowledge: 3, craft: 2, money: 2 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f18_bai_xiuzhen: { relation: 2 }, f18_zhou_guest: { relation: 1 } }, note: '工资、分成、店货、寄存物和母亲自己的灶具分别登记。' },
    { id: 'f18-shop-customer-service', name: '处理住客改期、退房和饭食改约', routes: ['xian-shop'], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 3, relation: 2, network: 1, money: 1 }, contactEffects: { f18_bai_xiuzhen: { relation: 1 }, f18_zhou_guest: { relation: 2 } }, note: '按已住天数、已备食材和未完成服务分别结算。' }
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
        sourceIds: ['SRC-F18-XIAN-ECONOMY-UPPER', 'SRC-F18-XIAN-ECONOMY-LOWER', 'SRC-F18-MARKET-MEMORY'],
        reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete choice.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  installDecision({
    id: 'xian-path', year: 1923, followYear: 1924, families: ['xianartisans'], title: '第一段成年谋生怎样试',
    prompt: '修理铺、车站货房与客店商号各只给一次有期限机会。你要问清工作地点、师傅或复核人、职责、工钱、住处和答复日期。',
    options: [
      option('repair-apprentice', '进民用修理铺做有期限学徒，先学工单与验件', { craft: 3, knowledge: 1, money: 1 }, 'f18:path:repair', '1923 年进入合成修理铺做有期限学徒。', '修理铺给出留用边界', '孙绍庭确认你继续做修理学徒，工资、伙食、工具使用和返工责任分别写清；客户和铺中材料仍不属于你。', { route: 'xian-repair' }),
      option('station-service', '去车站货房试做理货与货票核对', { knowledge: 2, body: 1, network: 2, money: 1 }, 'f18:path:station', '1923 年进入车站货房做三日试班。', '临时班得到明确答复', '冯宝义核完三日货票和破包记录，只确认你可继续接临时班；固定班缺额和正式职位仍分别等待答复。', { route: 'xian-station' }),
      option('shop-ledger-service', '去客店商号试做账房、采购与饭食服务', { knowledge: 2, craft: 2, relation: 1, money: 1 }, 'f18:path:shop', '1923 年进入合成客店商号做有期限试工。', '客店说明岗位与结算', '白秀珍按房钱、采购和寄存签复核试工，确认按月留用；魏兰芳的工资和灶具分成没有并入你的岗位。', { route: 'xian-shop' }),
    ],
  });

  installDecision({
    id: 'route-xian-repair-1929', year: 1929, followYear: 1930, routes: ['xian-repair'], title: '返工与赔偿怎样查',
    prompt: '罗先生说送修件再次损坏，孙绍庭先要你免费全赔；原工单、后来使用和东家改料记录并不一致。',
    options: [
      option('trace-work-order-material', '找原工单、材料和经手人共同复核', { mind: 3, knowledge: 2, relation: 1 }, 'f18:repair:trace', '1929 年按工单和材料记录共同复核返工责任。', '责任链被分段确认', '原工单确认一处装配由你返工，另一处便宜材料由孙绍庭临时决定；客户后来摔落的损伤仍保留争议。'),
      option('refund-confirmed-labor', '退回已确认的一段工钱，材料另议', { money: -2, relation: 2, fame: 1 }, 'f18:repair:refund', '1929 年退回已确认范围内的工钱，材料责任另行核对。', '退款没有吞掉其他争议', '罗先生收回一段工钱并把物件留作复核；孙绍庭仍需回答换料责任，你少了一笔收入但没有承认全部损坏。'),
      option('refuse-unproven-expansion', '拒绝无凭扩大责任，同时保留复核日期', { relation: -2, mind: 2, fame: -1 }, 'f18:repair:refuse', '1929 年拒绝承担无法由记录证明的扩大赔偿。', '拒赔带来具体关系后果', '罗先生暂不再送新件，孙绍庭扣下尚未结的一段奖励；原工单没有被销毁，下一次仍可由第三人核对。'),
    ],
  });

  installDecision({
    id: 'route-xian-repair-1942', year: 1942, followYear: 1943, routes: ['xian-repair'], title: '带徒或开铺怎样形成真实责任',
    prompt: '修理经验已经能独立验件，但工具、客户、铺位、现金和学徒条件都不属于同一人。',
    options: [
      option('remain-salaried-trainer', '继续受薪，只带一名有期限学徒', { money: 2, craft: 2, relation: 1 }, 'f18:repair:salaried', '1942 年继续受薪并按期限带一名学徒。', '带徒没有自动变成继承铺子', '赵小年完成第一阶段验件训练并按约领伙食和工钱；孙绍庭仍持有铺位和客户，你只为自己批准的工单负责。'),
      option('family-repair-partnership', '与父母按工具、现金和劳动形成有限合伙', { money: -2, craft: 2, relation: 2 }, 'f18:repair:partnership', '1942 年与父母按实际出资和劳动建立有限修理合伙。', '合伙账出现第一笔订单', '杜正和列入三件自有工具，魏兰芳只投入明确现金而不替店担保；首笔订单、返工上限和各人工时进入同一份合伙账。', { enterpriseStart: { id: 'f18-family-repair', name: '合成和月民用修理铺', kind: 'repair-workshop', workplace: '西安城内合成修理铺位', product: '民用器具修理与验件', employees: 1, partners: [{ personId: 'parent:father', role: '工具出资与验件合伙人' }, { personId: 'parent:mother', role: '有限现金出资与账务合伙人' }], asset: { id: 'repair-tools', kind: 'repair-tools', description: '列明个人归属与合伙使用期限的修理工具' } } }),
      option('independent-repair-bench', '独立租小铺并承担明确工具债', { money: -4, network: 2, mind: 2 }, 'f18:repair:independent', '1942 年独立租下小铺并登记开业工具债。', '独立开铺先面对现金与债务', '押金、三件工具和一笔有具名债权人的借款分别入账；孙绍庭的旧客户没有自动跟来，第一月只接到两件可核工单。', { enterpriseStart: { id: 'f18-independent-repair', name: '合成修远修理铺', kind: 'sole-repair-shop', workplace: '西安城内合成小铺位', product: '民用器具修理与验件', employees: 0, asset: { id: 'repair-tools', kind: 'repair-tools', description: '租铺后购入并逐件编号的三件修理工具' }, debt: { id: 'opening-tools', creditor: '白秀珍', purpose: '铺位押金与三件开业工具' } } }),
    ],
  });

  installDecision({
    id: 'route-xian-station-1929', year: 1929, followYear: 1930, routes: ['xian-station'], title: '新线路带来的货客流怎样接',
    prompt: '站城之间货物变多，旧街客户、送货人、货房和临时帮工各有一段责任，通勤与房租也在上涨。',
    options: [
      option('limited-old-city-orders', '保住旧街住处，只接有限车站班次', { relation: 2, money: 1, position: -1 }, 'f18:station:limited', '1929 年保留旧街住处并限制车站班次数量。', '有限班次保住另一部分生活', '你只接六个已排班日期，错过两次临时加班；魏兰芳仍能和你轮换照料，房租没有因搬近车站而增加。'),
      option('station-city-handoff', '在站城之间做有货票的交接与送件', { network: 3, body: 1, health: -1 }, 'f18:station:handoff', '1929 年开始按货票做站城交接与送件。', '第一批交接找出缺件位置', '一批四件货在修理铺交出、车夫接手、货房入站三个节点分别签记；少的一件停在车夫交接前，没有平均扣所有人的钱。'),
      option('salaried-cargo-position', '申请有固定班次的货房受薪岗位', { knowledge: 2, money: 2, position: 2 }, 'f18:station:salaried', '1929 年申请并获得一段固定货房班次。', '固定班次也有明确范围', '货房给出三个月固定班表和月结工资，夜班住处仍由你自己解决；这不是铁路终身职位，也没有带来铺位所有权。'),
    ],
  });

  installDecision({
    id: 'route-xian-station-1942', year: 1942, followYear: 1943, routes: ['xian-station'], title: '战时货房责任怎样守住边界',
    prompt: '货房出现来源清楚的民生货、职责明确的后勤班和一批用途与领取人都不清的货物。',
    options: [
      option('verified-civilian-cargo', '只接领取人和用途可核的民生货', { relation: 2, money: -1, mind: 2 }, 'f18:station:civilian', '1942 年只经手用途和领取人可核的民生货。', '少接班次但交接清楚', '你少领两次夜班钱，完成的粮食、布匹与药材箱都有领取人和破损记录；无法确认的一批没有进入你的签名。'),
      option('documented-logistics-shift', '进入职责与班次明确的后勤理货岗位', { money: 2, knowledge: 2, health: -1 }, 'f18:station:logistics', '1942 年进入有书面职责和班次的后勤理货岗位。', '岗位没有扩写成危险制造', '你的工作只包括核票、件数、破损和交接班；货物最终用途不由你决定，超出权限的处置交给具名负责人。'),
      option('leave-unclear-cargo', '拒绝签收用途和责任不清的货物', { money: -2, position: -1, mind: 3 }, 'f18:station:leave', '1942 年拒绝签收用途和责任不清的货物。', '拒绝带来停班而非抽象惩罚', '班头取消你下一周两次临时班，冯宝义保留你的旧货票记录；你转去接一段公开客店送货，收入下降有明确期限。'),
    ],
  });

  installDecision({
    id: 'route-xian-shop-1929', year: 1929, followYear: 1930, routes: ['xian-shop'], title: '客流变化后寄存与店货怎样分开',
    prompt: '来客增多后，一只寄存箱、一批杂货和母亲自备的灶具挤在同一间后房，任何一件都不能凭位置改变所有权。',
    options: [
      option('separate-guest-property-ledger', '按房号、封签和经手人另立寄存物账', { knowledge: 3, relation: 2, money: -1 }, 'f18:shop:separate', '1929 年为住客寄存物建立独立账和封签。', '第一件错放物得到确认', '周客人的箱子从店货旁移回独立格位，封签与房号一致；另一件无主包袱只记最后经手人，没有被当作店里库存。'),
      option('station-guest-delivery', '只为有地址和收件人的住客代办送站', { network: 3, money: 2, mind: 1 }, 'f18:shop:delivery', '1929 年开始办理有限、有票据的送站服务。', '送站服务形成责任上限', '第一批两件行李按地址和收件人交出，临时加来的一件因无人签收退回客店；车脚和保管钱分别结算。'),
      option('refuse-unclear-storage', '拒收来源、期限或领取人不清的寄存物', { relation: -1, mind: 3, fame: -1 }, 'f18:shop:refuse', '1929 年拒收来源和领取人不清的寄存物。', '拒收减少一笔钱也避免混账', '一名住客转去别店并带走饭食订单，白秀珍少收一笔保管钱；后房没有新增无法确认归属的包袱。'),
    ],
  });

  installDecision({
    id: 'route-xian-shop-1942', year: 1942, followYear: 1943, routes: ['xian-shop'], title: '继续受薪还是按约形成小店',
    prompt: '魏兰芳、白秀珍、伴侣和你分别掌握账务、铺位、灶具、现金与劳动；合伙不能由“都是一家人”代替。',
    options: [
      option('remain-salaried-ledger', '继续做受薪账房，不承担店债与存货', { money: 2, knowledge: 2, relation: 1 }, 'f18:shop:salaried', '1942 年继续做受薪账房并拒绝承担店债。', '工资与店主责任保持分开', '白秀珍按月付工资，你负责房钱、采购与寄存账；一笔店铺进货债仍由她处理，母亲的灶具没有变成店铺抵押物。'),
      option('family-limited-partnership', '按铺位、灶具、现金和劳动形成有限合伙', { money: -2, relation: 3, craft: 1 }, 'f18:shop:partnership', '1942 年与母亲和白秀珍建立有边界的小店合伙。', '有限合伙开始逐项经营', '白秀珍提供有期限铺位，魏兰芳只投入两件灶具，你投入现金和劳动；工资、分成、寄存责任与退伙条件进入书面账。', { enterpriseStart: { id: 'f18-family-shop', name: '合成兰珍客饭小店', kind: 'guesthouse-food-partnership', workplace: '西安城内合成客店附属铺位', supplier: '具名粮菜与杂货供应人', product: '客饭、杂货与有限寄存服务', employees: 1, partners: [{ personId: 'parent:mother', role: '灶具与账务合伙人' }, { personId: 'contact:f18_bai_xiuzhen', role: '期限铺位与存货合伙人' }], asset: { id: 'stoves-stock', kind: 'stoves-and-stock', description: '两件具名灶具与第一批逐项盘点的食材杂货' } } }),
      option('independent-food-counter', '另租小柜并承担明确押金与进货债', { money: -4, network: 2, mind: 2 }, 'f18:shop:independent', '1942 年另租小柜并登记押金与开业进货债。', '独立小柜没有继承原店客源', '你只带走自己购入的器具和已同意转介的两名顾客；押金、首批食材债、退货条件和每日现金分别入账。', { enterpriseStart: { id: 'f18-independent-counter', name: '合成月琴客饭小柜', kind: 'sole-food-counter', workplace: '西安城内合成街市小柜位', supplier: '白记粮菜供货人', product: '客饭与随行干粮', employees: 0, asset: { id: 'counter-tools', kind: 'cooking-tools-and-stock', description: '自购小灶、食具和首批有来源食材' }, debt: { id: 'opening-stock', creditor: '白记粮菜供货人', purpose: '柜位押金与首批食材' } } }),
    ],
  });

  installDecision({
    id: 'xian-war', year: 1937, followYear: 1938, families: ['xianartisans'], title: '战时订单与公开生计怎样取舍',
    prompt: '高价订单不说明最终用途，民用修理钱少但责任清楚，另有一份只写明理货、维修或食宿登记的后勤岗位。',
    options: [
      option('civilian-repair-only', '只接民用与用途明确的修理、客店和运输事务', { money: -2, relation: 2, mind: 2 }, 'f18:war:civilian', '1937 年只承接民用和用途明确的工作。', '收入减少与客户留存分别发生', '你拒掉一份来源不清的高价订单，保住三位能说明用途的旧客户；少掉的钱没有被声望补平，下一季仍要重新找班。', { warTurn: 'civilian-repair-only' }),
      option('documented-logistics-job', '进入职责、班次和负责人明确的后勤岗位', { money: 2, knowledge: 2, health: -1 }, 'f18:war:logistics', '1937 年进入有明确职责边界的后勤岗位。', '后勤岗位留下交接边界', '岗位只要求修理民用器具、核货或登记住处，危险制造和最终调度不在你的职责内；加班、工资和负责人都有记录。', { warTurn: 'documented-logistics-job' }),
      option('decline-unclear-orders', '拒绝来源与责任不清的订单，缩小本季工作', { money: -3, position: -1, mind: 3 }, 'f18:war:decline', '1937 年拒绝来源和责任不清的订单并缩小工作。', '缩工后重新安排家口', '本季少了近半订单，魏兰芳保留客店工资，杜正和只接验件轻活；月琴自己决定是否另找文书班，不被安排免费补店。', { warTurn: 'decline-unclear-orders' }),
    ],
  });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['xianartisans'], priority: 12,
      sourceIds: ['SRC-F18-XIAN-ECONOMY-UPPER', 'SRC-F18-XIAN-ECONOMY-LOWER'],
      reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }

  scene('f18-s01', '三类物件不放在一起', '杜正和把客户送修的铜锁、自家工具和孙绍庭给的材料分三处挂；魏兰芳又给客人寄存包袱贴上房号。经手没有改变所有权。', { minAge: 0, maxAge: 3, priority: 24, sourceIds: ['SRC-F18-XIAN-ECONOMY-LOWER', 'SRC-F18-MARKET-MEMORY'] });
  scene('f18-s02', '提前退房逐项结算', '客人提前退房，魏兰芳按已住天数、饭钱和寄存物逐项核对；熟客关系没有免掉已经发生的费用，也没有让她替客店无凭担保。', { minAge: 4, maxAge: 6, priority: 23, sourceIds: ['SRC-F18-MARKET-MEMORY'] });
  scene('f18-s03', '换材料要写经手人', '父亲修好一把椅子，却发现孙绍庭临时换了便宜材料。他在交件前把原工单、换料决定和自己完成的部分分别写下。', { minAge: 5, maxAge: 8, priority: 22 });
  scene('f18-s04', '三个学习入口撞在一起', '工具工单、客店账和地址课排在同一上午。你只能先完成一段学习，月琴也会按自己的兴趣与公开条件选择，并不自动补上家务。', { minAge: 6, maxAge: 9, priority: 21 });
  scene('f18-s05', '旧损伤和返工责任', '罗先生拿回再次损坏的修件，孙绍庭先要父亲全赔。父亲要求看原损伤、后来使用和换料记录，再谈退款与返工。', { minAge: 8, maxAge: 11, priority: 20 });
  scene('f18-s06', '月琴去问公开条件', '月琴想学修理或车站文书，有人只叫她回家做饭。她自己去问识字、夜班、住处和试工要求，得到一次有期限答复。', { minAge: 9, maxAge: 12, priority: 20 });
  scene('f18-s07', '新工具先问使用代价', '一件新工具能接不同修理，但租用、合购和独买分别涉及押金、维修、学习与闲置。父亲没有把“新式”直接当作更好生活。', { minAge: 10, maxAge: 13, priority: 19 });
  scene('f18-s08', '三处试工各有期限', '修理铺、车站货房和客店商号各给一段有限机会。你逐项问清职责、师傅或复核人、报酬、食宿和谁给最后答复。', { year: 1923, routes: ['xian-repair', 'xian-station', 'xian-shop'], priority: 28 });
  scene('f18-s09', '次年得到岗位结果', '试工结束后，岗位写明继续做、只留临时班或不留用；工作地点、报酬、当前职业和下一步进入人生账，不再年年只写找工作。', { year: 1924, routes: ['xian-repair', 'xian-station', 'xian-shop'], priority: 10 });
  scene('f18-s10', '一张工单的返工', '孙绍庭交来一件返工，你按原损伤、材料和交件时间重做自己负责的部分。另一处东家改料只记录，不从所有学徒工钱里平摊。', { routes: ['xian-repair'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f18-s11', '三日货房试班', '冯宝义让你核一批到站货的件数、破包和领取人，只给三日临时班。结束时工钱已经结清，固定缺额仍是另一件事。', { routes: ['xian-station'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f18-s12', '客房和寄存物不是店货', '周客人改了退房日期，你重算已住天数和已备饭食；他寄存的箱子按封签交回，没有因放在后房就进入店铺库存。', { routes: ['xian-shop'], minYear: 1925, maxYear: 1936, priority: 20, sourceIds: ['SRC-F18-XIAN-ECONOMY-LOWER', 'SRC-F18-MARKET-MEMORY'] });
  scene('f18-s13', '站城交接少了一件货', '一批送往车站的修件少了一件，修理铺、车夫和货房各有一段记录。你们按交接点核票，只先处理已确认的责任范围。', { routes: ['xian-repair', 'xian-station'], minAge: 20, maxAge: 38, priority: 18 });
  scene('f18-s14', '夜班和家务成为具体争执', '伴侣问清夜班、工具债、双方父母、是否迁铺和谁做饭，不接受自动守店或免费记账。争执最后留下一个未决期限和一次重新协商。', { routes: ['xian-repair', 'xian-station', 'xian-shop'], minAge: 24, maxAge: 46, priority: 17 });
  scene('f18-s15', '用途不清的高价订单', '高价订单没有说明最终用途，民用修理或客店登记钱少但责任清楚。你只为自己能核的工作签名，拒绝也会减少本季收入。', { routes: ['xian-repair', 'xian-station', 'xian-shop'], minYear: 1937, maxYear: 1945, priority: 21 });
  scene('f18-s16', '带徒与合伙先写条件', '父母、月琴、伴侣和外姓学徒分别说明工具、现金、劳动、工资或伙食。即使共同做事，也没有人因亲属身份失去自己的份额和退出条件。', { routes: ['xian-repair', 'xian-station', 'xian-shop'], minAge: 30, maxAge: 52, priority: 16 });
  scene('f18-s17', '开铺第一年也要逐单过日子', '小铺有订单却现金紧，受薪岗位有稳定钱却不能自己定价。你先核一笔客户改约、一笔进货和一次返工，没有用“生意兴隆”跳过过程。', { routes: ['xian-repair', 'xian-shop'], minAge: 34, maxAge: 55, priority: 15 });
  scene('f18-s18', '1949 年逐项核现状', '系统列出父母、月琴、伴侣、东家或学徒、雇佣、铺位、工具、债、寄存物、住处和未确认订单。民国分段在这里结束，人生没有结束。', { year: 1949, routes: ['xian-repair', 'xian-station', 'xian-shop'], priority: 35 });
  scene('f18-s19', '父母分别减少工作', '杜正和停下重修，只做验件与有限带徒；魏兰芳减少夜班，仍决定自己的账本经验、灶具和是否继续分成。退休没有自动转移资产。', { minAge: 50, maxAge: 68, priority: 14 });
  scene('f18-s20', '死亡以后仍要清工单', '父母、东家、客户或合伙人死亡后，送修件、寄存物、工资尾款、学徒约定、铺债与工具份额仍按最后记录交接；不能确认的继续标为未知。', { minAge: 62, priority: 13 });

  C.annualRhythms['xian-repair'] = [
    '工台上只有几件能按工单接下的民用修理；材料变化、返工和客户答复分别找经手人确认。',
    '你与赵小年分开使用工具，孙绍庭核交期和报价；一笔奖励已经结清，另一笔返工仍待客户带旧件回来。',
    '新工具增加一种修理可能，也带来维护和学习时间；这一年没有凭手艺熟练自动得到铺位与客户。',
  ];
  C.annualRhythms['xian-station'] = [
    '货房的货票、件数、破损、领取人和交接班逐项核对；临时班工钱当天结，固定缺额另等答复。',
    '冯宝义交给你一段公开班次，马永负责另一段；货损只落到有记录的交接点，没有平均扣给全班。',
    '站城客流改变住处和通勤，你保留一位旧街联系人，也认识一名新货主；两边责任没有合并。',
  ];
  C.annualRhythms['xian-shop'] = [
    '房钱、饭食、采购、店货和住客寄存物分别入账，白秀珍只为自己批准的进货和铺位安排负责。',
    '周客人改了一次日期，你按已完成服务重算；母亲的工资与灶具分成没有混进你的结算。',
    '铁路带来新客也提高房租与食材压力，你只接下当前人手能完成的订单，另一笔提前退回。',
  ];
  C.sceneFrames.xianartisans = [
    { open: '街门刚开，魏兰芳先核房钱、饭食和寄存签，杜正和又从修理铺带回一张需要说明材料与经手人的工单。', close: '这一天只确认了具体岗位、物件和责任的一部分；未结工资、未回客户和下一次复核日期分别留在账上。' },
    { open: '车站货流、旧街客户和家中照料撞在一起，孙绍庭、冯宝义与白秀珍各只回答自己能负责的事项。', close: '你完成自己能执行的一步，也付出时间、身体、现金或关系上的实际代价；他人的工具、工资与去留仍归本人决定。' },
  ];
  C.sceneFrames['xian-repair'] = C.sceneFrames.xianartisans;
  C.sceneFrames['xian-station'] = C.sceneFrames.xianartisans;
  C.sceneFrames['xian-shop'] = C.sceneFrames.xianartisans;

  C.parentProfiles.xianartisans = {
    mother: {
      name: '魏兰芳', born: 1884, occupation: '客店账房兼饭食经营者，保留自己的工资、灶具与分成', deathAgeBase: 78,
      activities: ['核过房钱、饭食与一件寄存物', '把自己的工资和灶具分成从店账中拆开', '减少夜班后只接有限账务与备餐'],
      words: ['“住客放在这里的东西，不会因为过了一夜就成了店里的货。”', '“我可以投这两件灶具，但不能替整间店和别人的债担保。”', '“少做夜班是我的身体安排，不等于把账本和工资都交出去。”'],
    },
    father: {
      name: '杜正和', born: 1881, occupation: '民用木器与金工修理匠，按工单处理材料与返工', deathAgeBase: 74,
      activities: ['核过一张工单与材料变化', '手伤后改做验件和轻修', '停重活后只带一名有期限学徒'],
      words: ['“客户的件、东家的料、我的工具，挂在一面墙上也不是一回事。”', '“返工要看原损伤和谁换了料，不能一句师傅负责全包。”', '“会验件可以教，铺位、客户和债不能当作自然传给你。”'],
    },
  };
  C.spouseProfiles.xianartisans = {
    男: { name: '许清仪', bornOffset: 1, occupation: '商号采购与地址文书，保留自己的工资和夜班选择', values: '共同生活不等于免费守店、做账或承担对方工具债' },
    女: { name: '马敬川', bornOffset: -1, occupation: '车站送货与客店维修帮工，按班和工单结钱', values: '愿意分担双方父母照料，但要求夜班、迁铺和合伙分别协商' },
  };
  C.childNames.xianartisans = ['杜知件', '杜念安'];

  Object.assign(C.routeCareerProfiles, {
    'xian-repair': {
      kind: 'employment', role: '民用修理匠兼工单验件人', workplace: '合成的绍庭民用修理铺', employer: '修理铺东家孙绍庭', supervisor: '孙绍庭', colleague: '学徒赵小年', publicPerson: '送修客户罗先生', terms: '试工后按月与计件混合结算；工具、材料、返工和赔偿权限分别记录',
      duties: '按工单验件与修理、说明材料变化、交件并处理已确认范围的返工',
      scenes: [
        '罗先生带旧件回来，你按原损伤、材料和后来使用逐项复核，只重做自己经手的一处；孙绍庭换料的一处由他另行答复。',
        '赵小年误拿一件客户工具，你在当天盘点时找回并更正编号；他的伙食和学习期限没有因此被永久扣除。',
        '一位客户要求次日交三件，你只接下工台能完成的一件，另两件提前退回；少了收入，也没有让学徒无限延时。',
      ],
    },
    'xian-station': {
      kind: 'employment', role: '车站货房理货与货票核对员', workplace: '西安城外合成车站货房', employer: '合成车站货运经办处', supervisor: '班头冯宝义', colleague: '理货帮工马永', publicPerson: '送货商户赵文淑', terms: '先按日结临时班，固定班次另立月表；正式职位不由介绍信自动生成',
      duties: '核货票、件数、破损与领取人，记录交接班并确认临时工钱和固定缺额',
      scenes: [
        '马永交来一批破包货，你按上一班、入站与当前盘点三处记录确定破损时间；补包钱没有平摊给所有临时工。',
        '赵文淑的货票有一处地址字样不清，你退回给她确认，没有凭熟悉就放货；货物晚走一班但没有交错人。',
        '月底固定班表少记一天，你拿交接签找冯宝义复核。补发工资有日期，正式岗位申请仍显示等待。',
      ],
    },
    'xian-shop': {
      kind: 'employment', role: '客店商号账房兼饭食服务人', workplace: '合成的白记客店与杂货柜', employer: '经营者白秀珍', supervisor: '白秀珍', colleague: '账务帮工杜月琴', publicPerson: '住客周先生', terms: '试工后按月结工资；饭食分成、采购、寄存责任和铺位资本分别核算',
      duties: '核房钱、采购与饭食改约，保管寄存签并向顾客说明已完成服务和退款范围',
      scenes: [
        '周先生提前退房，你按已住天数和已备饭食重算；他寄存的箱子依封签交回，没有被列入店货。',
        '白秀珍与魏兰芳拼购一批食材，你按各自数量和受潮部分拆账；母亲的两件灶具仍标明本人所有。',
        '一位住客临时增加十份干粮，你只接下灶台能按时完成的六份，其余退订；帮工工时和顾客退款分别写明。',
      ],
    },
  });

  Object.assign(C.routeContactProfiles, {
    'xian-repair': [
      { id: 'f18_zhao_apprentice', label: '赵小年', role: '有期限学徒，要求写清伙食、工钱和完成标准', status: 'coworker', relation: 18, born: 1912 },
      { id: 'f18_he_supplier', label: '何师傅', role: '按批供应民用修理材料并接受退换核对', status: 'nearby', relation: 13, born: 1889 },
      { id: 'f18_luo_customer_route', label: '罗先生', role: '带旧工单与物件回来核返工责任的客户', status: 'nearby', relation: 19, born: 1894 },
    ],
    'xian-station': [
      { id: 'f18_ma_yong', label: '马永', role: '同班理货帮工，也在等待固定班次答复', status: 'coworker', relation: 18, born: 1907 },
      { id: 'f18_zhao_wenshu_route', label: '赵文淑', role: '核地址与货票、保留自己委托责任的商户文书', status: 'nearby', relation: 17, born: 1904 },
      { id: 'f18_liu_carrier', label: '刘车夫', role: '按交接段收车脚并说明货损发生位置', status: 'nearby', relation: 14, born: 1888 },
    ],
    'xian-shop': [
      { id: 'f18_zhou_guest', label: '周先生', role: '会改期、退房并核寄存签的常住客', status: 'nearby', relation: 19, born: 1897 },
      { id: 'f18_chen_helper', label: '陈桂香', role: '按日帮灶并要求说清工钱与收工时间', status: 'coworker', relation: 20, born: 1908 },
      { id: 'f18_he_vendor', label: '何菜贩', role: '按批供货并处理受潮、短斤与退货的经手人', status: 'nearby', relation: 14, born: 1891 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'xian-repair': ['金属边造成的手部外伤', '长期低头验件后的眼痛', '敲打与久站后的腕肩疼痛'],
    'xian-station': ['搬货后的腰背疼痛', '夜班造成的长期疲惫', '货尘引起的咳嗽'],
    'xian-shop': ['灶前烟火引起的咳嗽', '久站后的腿痛', '作息不定造成的胃痛'],
  });

  Object.assign(C.publicRouteProfiles, {
    'xian-repair': {
      publicGroup: '合成的民用修理与困难家口器具互助网', publicRole: '核修理缺额、工单和公开转介信息',
      covertRole: '借修理交接确认迁出者的最后消息', infiltrationRole: '以民用修理匠身份维持公开职业并接触地方经手人',
      contact: { id: 'public_f18_qin_ru', label: '秦如', role: '登记民用修理缺额与困难家口器具需求的合成经手人', status: 'colleague', relation: 16, born: 1902 },
    },
    'xian-station': {
      publicGroup: '合成的货房短工与失效地址互助网', publicRole: '核临时班、货损、退信与公开住处信息',
      covertRole: '借站城交接确认人员是否抵达和地址是否仍有效', infiltrationRole: '以货房理货身份维持公开工作并接触地方机构',
      contact: { id: 'public_f18_tian_lan', label: '田兰', role: '核临时班答复和退信地址的合成互助记录员', status: 'colleague', relation: 17, born: 1903 },
    },
    'xian-shop': {
      publicGroup: '合成的客店住处与饭食轮值互助网', publicRole: '登记临时住处、饭食轮值和失效寄存签',
      covertRole: '借客店往来确认迁入者最后消息', infiltrationRole: '以账房和饭食服务维持公开生计并接触街区经手人',
      contact: { id: 'public_f18_luo_qing', label: '罗青', role: '核临时住处、饭食与退信的合成互助经手人', status: 'nearby', relation: 18, born: 1905 },
    },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('skilled', 'xian-repair');
  addRouteToTrack('literate', 'xian-station');
  addRouteToTrack('skilled', 'xian-shop');
})(typeof window !== 'undefined' ? window : globalThis);
