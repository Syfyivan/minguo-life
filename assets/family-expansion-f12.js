// 民国人生 · F12 汉口行栈、商号雇员与小商家运行时包 v0.7.12
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f12.js');

  C.version = '0.7.12';
  C.familyDecisionKeys.hankoucommerce = { path: 'hankou-commerce-path', war: 'hankou-commerce-war' };
  Object.assign(C.designRegistry.families.F12, {
    designStatus: 'runtime-reviewed-first-round', runtimeStatus: 'playable-verified', runtimeFamilyKey: 'hankoucommerce',
  });
  C.runtimeFamilyDesignMap.hankoucommerce = 'F12';
  Object.assign(C.legacyRouteDomainMap, {
    'hankou-trading-house-clerk': 'D14',
    'hankou-warehouse-freight-clerk': 'D16',
    'hankou-dry-goods-small-trader': 'D15',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F12-HANKOU-CHAMBER': {
      label: '国家档案局：武汉市档案馆馆藏汉口商会档案介绍',
      url: 'https://www.saac.gov.cn/daj/c100230/202011/be5820779e244b2d9130b57af19a49c2.shtml',
      supports: ['1899—1949 年汉口商会、同业组织、商号、银行及政府关系构成商业制度背景；馆方同时说明材料年代和分布并不完整'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F12-JIANGHAN-ROAD': {
      label: '武汉市档案馆：江汉路商业史料',
      url: 'https://www.whda.org.cn/dawh/whjy/202512/t20251223_2699331.shtml',
      supports: ['江汉路连接华界与租界商业空间，近代银行、公司、传统商店及中外商品并存；不据此虚构某一真实商号客户'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F12-WUHAN-OCCUPATION': {
      label: '武汉市档案馆：《武汉沦陷时期档案史料丛编》介绍',
      url: 'https://www.whda.org.cn/dawh/bycg/202512/t20251203_2689132.html',
      supports: ['1938 年 10 月至 1945 年 9 月武汉沦陷期间存在连续的社会、经济、市政与战争记录，不能用一句战乱概括七年商业日常'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F12-HANKOU-MAY-1949': {
      label: '武汉市档案馆：汉口银行月报所见 1949 年 5 月',
      url: 'https://www.whda.org.cn/dawh/whjy/202512/t20251223_2699334.shtml',
      supports: ['1949 年 5 月汉口出现物价、停业、人员缩减、基础设施破坏、复业、货币流通和机构接管等连续变化；并非所有店铺同日同样变化'],
      status: 'source-reviewed-first-round',
    },
  });

  C.families.hankoucommerce = {
    key: 'hankoucommerce', name: '汉口行栈、商号雇员与小商家', born: 1910,
    place: '汉口合成江汉商街、行栈与仓间附近', defaultSeed: 1210,
    defaultNames: { 男: '罗绍安', 女: '罗慧安' },
    motif: '父亲送回的货单、母亲分装的干货、仓间交接和熟客赊账把“会做生意”拆成不同人的权限、货物、工资与风险；认识掌柜不等于拥有商号，守住小摊也不等于没有事业。',
    start: { body: 46, knowledge: 30, craft: 37, mind: 42, network: 32, fame: 13 },
    startRes: { money: 11, health: 78, relation: 67, position: 25 },
    subjects: {
      mother: { label: '母亲', status: 'alive-working', health: 66, agency: 96, note: '经营干货小摊，保留库存、赊客、周转钱和是否租铺的决定' },
      father: { label: '父亲', status: 'alive-working', health: 68, agency: 90, note: '在行栈做柜伙与送单，只能签自己核过和获授权的一段' },
      spouse: { label: '配偶', status: 'not-met', health: 69, agency: 93, note: '婚后保留自己的岗位、现金、父母责任、住处与是否共同经营的决定' },
      household: { label: '商街租住家口', status: 'together', strength: 58, agency: 88 },
      support: { label: '同业摊贩、仓间同事与旧同学', status: 'neighbors-and-colleagues', strength: 33, agency: 92 },
      connections: { label: '行栈、仓栈、小店与公开报名门路', status: 'trial-only', strength: 29, agency: 89 },
      workers: { label: '柜伙、账房、理货人、帮工与送单人', status: 'separate-wages-and-responsibility', strength: 28, agency: 94 },
      ledger: { label: '商号货、家庭库存、寄卖货、工资与赊债分账', status: 'separate-records', strength: 36, agency: 95 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 87, note: '不自动继承摊位、客户、商号职位、债权或照料责任' },
    },
    contacts: {
      f12_luo_qisheng: { label: '罗启盛', role: '在行栈核货单、送样与收据权限的父亲', status: 'family', relation: 62, agency: 90, note: '可升账房、转岗、被辞或退休，不能替掌柜签大额合约' },
      f12_feng_yuee: { label: '冯月娥', role: '经营干货小摊并亲自决定赊账和库存的母亲', status: 'family', relation: 70, agency: 96, note: '可拒绝以自有货物替商号或亲属担保' },
      f12_luo_huiqin: { label: '罗慧琴', role: '想学珠算书信并寻找商号、仓栈、学校或独立摊位的手足', status: 'family', relation: 54, agency: 96, note: '不默认嫁出或守店，可试工、落选、就业、合伙、成家或独居' },
      f12_xu_lichen: { label: '徐立臣', role: '核货单、仓单、船期、货款与经手人的行栈账房', status: 'nearby', relation: 25, agency: 88, note: '能考核、留用、记过或作证，不能让下级承担未知坏账' },
      f12_cai_boan: { label: '蔡伯安', role: '核件数、包装、受潮与入仓时间的仓栈验货人', status: 'nearby', relation: 24, agency: 90, note: '能出具经手记录，不能替货主定价或认领未知货损' },
      f12_jiang_xiuying: { label: '蒋秀英', role: '有自己供货人、摊位、女儿和周转钱的干货商贩', status: 'nearby', relation: 35, agency: 96, note: '可拼货、合租、竞争或拆伙，不把信用和库存并给罗家' },
    },
  };

  Object.assign(C.routes, {
    'hankou-trading-house-clerk': { name: '汉口行栈柜伙、账单与采购交接', family: 'hankoucommerce', summary: '从样品、货单和收据做起，处理签字权限、工资、差错、客户催单、采购与商号开歇业；多年任职也不自动取得股权。' },
    'hankou-warehouse-freight-clerk': { name: '汉口仓栈理货、货运文书与批发交接', family: 'hankoucommerce', summary: '逐批核件数、包装、仓单、船期、受潮、货主和入仓人，让短少、货损、停运与恢复落在真实交接段。' },
    'hankou-dry-goods-small-trader': { name: '汉口干货摊、杂货小店与同业拼货', family: 'hankoucommerce', summary: '从分装、成色、赊客和小单做起，处理供货人、顾客、帮工、租金、坏货、合伙与歇业；忙碌和盈利分别计算。' },
  });

  C.actions.push(
    { id: 'f12-order-receipt-practice', name: '替父亲核货单、样品、收据与签字权限', families: ['hankoucommerce'], minAge: 6, spirit: 2, delta: { knowledge: 3, mind: 2, relation: 1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f12_luo_qisheng: { relation: 2 }, f12_xu_lichen: { relation: 1 } }, note: '只填自己看过的经手栏；认识字不等于能替掌柜签单。' },
    { id: 'f12-dry-goods-stock-credit', name: '替母亲核成色、分装、寄卖货与熟客赊期', families: ['hankoucommerce'], minAge: 6, spirit: 2, delta: { craft: 3, knowledge: 1, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f12_feng_yuee: { relation: 2 }, f12_jiang_xiuying: { relation: 1 } }, note: '自家货、寄卖货、坏货与赊款分别登记；帮忙不取得母亲库存。' },
    { id: 'f12-household-guarantee-plan', name: '核房租、进货、工资与任何担保请求', families: ['hankoucommerce'], minAge: 8, spirit: 3, delta: { mind: 3, knowledge: 1, money: -1, relation: 1 }, subjectDelta: { household: { strength: 1 }, ledger: { strength: 2 } }, note: '先问金额、货物、权限、期限和谁同意，不把“讲信用”当作无限连带责任。' },
    { id: 'f12-trading-house-order-shift', name: '完成一班样品、开单、存根与客户答复', routes: ['hankou-trading-house-clerk'], minAge: 15, spirit: 3, careerAction: true, delta: { knowledge: 3, mind: 2, money: 2 }, contactEffects: { f12_xu_lichen: { relation: 2 }, f12_clerk_coworker: { relation: 1 } }, note: '记录货主、品名、数量、批准人、送达和结算；不能用多年资历越权落款。' },
    { id: 'f12-trading-house-customer-error', name: '核退单、少款、越权指示与下一次答复', routes: ['hankou-trading-house-clerk'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 3, position: 1 }, contactEffects: { f12_clerk_supervisor: { relation: 1 }, f12_clerk_customer: { relation: 2 } }, note: '承认自己确知的一段，保留原件、工资和未知责任。' },
    { id: 'f12-warehouse-cargo-handoff', name: '完成一批验货、仓单、入仓与船期交接', routes: ['hankou-warehouse-freight-clerk'], minAge: 15, spirit: 4, careerAction: true, delta: { body: 1, knowledge: 2, craft: 3, money: 2, health: -1 }, contactEffects: { f12_cai_boan: { relation: 2 }, f12_warehouse_coworker: { relation: 1 } }, note: '每批货留下包装、件数、时间、货主和经手人；仓间经验不等于拥有货物。' },
    { id: 'f12-warehouse-damage-followup', name: '核受潮、短少、搬运伤与货主答复', routes: ['hankou-warehouse-freight-clerk'], minAge: 17, spirit: 3, careerAction: true, delta: { craft: 2, mind: 3, network: 1, health: 1 }, contactEffects: { f12_warehouse_supervisor: { relation: 1 }, f12_warehouse_customer: { relation: 2 } }, note: '货损、治疗、工资、赔付与未知分别给结果，不从全体工钱里含糊扣除。' },
    { id: 'f12-small-trade-market-shift', name: '完成一日进货、分装、叫卖、收款与坏损', routes: ['hankou-dry-goods-small-trader'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, network: 2, money: 2, health: -1 }, contactEffects: { f12_feng_yuee: { relation: 1 }, f12_trader_customer: { relation: 2 } }, note: '顾客、品项、成色、实际收款与损耗逐项入账；客多不自动变成利润。' },
    { id: 'f12-small-trade-supplier-worker', name: '核供货、赊期、帮工工资与铺租', routes: ['hankou-dry-goods-small-trader'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, network: 3, money: 1 }, contactEffects: { f12_trader_supplier: { relation: 2 }, f12_trader_coworker: { relation: 1 } }, note: '母亲库存、主角劳动、帮工工资、供货款和利润不是一笔钱。' }
  );

  var sourceIds = ['SRC-F12-HANKOU-CHAMBER', 'SRC-F12-JIANGHAN-ROAD', 'SRC-F12-WUHAN-OCCUPATION', 'SRC-F12-HANKOU-MAY-1949'];
  function option(id, label, delta, echo, fact, followTitle, followText, extra) {
    return Object.assign({ id: id, label: label, delta: delta, echo: echo, fact: fact, endingFact: true, followup: { title: followTitle, text: followText } }, extra || {});
  }
  function installDecision(item) {
    item.options.forEach(function (choice) {
      var followup = choice.followup;
      C.ordinaryEvents.push({
        id: 'echo-' + choice.echo.replace(/:/g, '-'), title: followup.title, text: followup.text,
        year: item.followYear, priority: 45, requiresEchoes: [choice.echo],
        families: item.families ? item.families.slice() : undefined, routes: item.routes ? item.routes.slice() : undefined,
        sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete choice.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  installDecision({
    id: 'hankou-commerce-path', year: 1924, followYear: 1925, families: ['hankoucommerce'], title: '三份试工里哪一份成为第一段成年谋生',
    prompt: '徐立臣的行栈、蔡伯安的仓间和冯月娥与蒋秀英的干货合单各给一次有限机会。你必须问清职责、工钱、货物、权限、班次与答复日。',
    options: [
      option('trading-house-clerk-trial', '去行栈试做样品、开单、存根与客户交接', { knowledge: 3, mind: 2, money: 1 }, 'f12:path:clerk', '1924 年进入汉口合成行栈做有限柜伙与文书试工。', '行栈给出一份有权限边界的岗位', '徐立臣留你做样品、开单和存根；男性较常兼外勤采购与送单，女性较常由内账、柜台和客户回执进入，两者都不能替掌柜签大额合约。', { route: 'hankou-trading-house-clerk' }),
      option('warehouse-freight-trial', '去仓栈试做验货、仓单、件数与船期交接', { craft: 3, knowledge: 2, money: 1 }, 'f12:path:warehouse', '1924 年进入汉口合成仓栈做有限理货与货运文书试工。', '一批货给出明确留用答复', '蔡伯安按件数和仓单核你的试做；男性较常兼搬运现场验货，女性较常从仓单、清点和窗口交接进入，岗位不同但都对具名经手段负责。', { route: 'hankou-warehouse-freight-clerk' }),
      option('dry-goods-trader-trial', '跟母亲与蒋秀英试做分装、摊售、赊客与收摊', { craft: 3, relation: 2, money: 1 }, 'f12:path:trader', '1924 年在汉口干货摊与同业合单中做有工资边界的试工。', '第一批货留下工钱、库存和顾客结果', '冯月娥保留自家库存与旧客，蒋秀英只投入列明货物；你按日领钱并核三名顾客，没有因亲属关系取得摊位或周转金。', { route: 'hankou-dry-goods-small-trader' }),
    ],
  });

  installDecision({
    id: 'route-hankou-trading-house-clerk-1929', year: 1929, followYear: 1930, routes: ['hankou-trading-house-clerk'], title: '掌柜要求替一批未知货值落名时怎样回应',
    prompt: '货主催船期，掌柜说只需“替商号写个名字”，却没有列货值、经手范围、批准人和担保期限。父亲多年做事也没有权替家庭同意。',
    options: [
      option('clerk-refuse-unclear-guarantee', '拒绝不清担保，只完成已授权交接', { mind: 3, money: -1, position: 1 }, 'f12:clerk:refuse', '1929 年拒绝为未知货值和权限作担保。', '失去一次好感但没有吞下商号风险', '掌柜停你两周外勤，改由有权人落款；无争议工资仍结清，冯月娥的库存与家庭住处没有进入商号债务。'),
      option('clerk-sign-verified-scope', '只对亲手核过的件数、日期和经手栏签收', { knowledge: 3, mind: 2, position: 1 }, 'f12:clerk:scope', '1929 年只签亲手核过的商号经手范围。', '一张限定签收没有变成无限担保', '你确认二十件入仓与当日外观，不保证货价、后续船损和客户回款；徐立臣复核并留下权限人，责任停在可证明的一段。'),
      option('clerk-family-limited-cash', '经母亲本人同意，只投入列明现钱并另立账', { money: -3, relation: 2, network: 1 }, 'f12:clerk:cash', '1929 年经母亲同意以有限现钱参与一批货。', '投入是一笔有上限的交易而非家庭担保', '冯月娥只拿出自己同意的周转余款，货、份额、退回日与亏损上限另写；她的其余库存、摊位和住处不作抵押。'),
    ],
  });
  installDecision({
    id: 'route-hankou-trading-house-clerk-1946', year: 1946, followYear: 1947, routes: ['hankou-trading-house-clerk'], title: '商号复业后继续受薪、转采购还是建立有限行号',
    prompt: '旧客户、旧债、库存和印章正在重核。你的经验可换受薪岗位，也可投入有限本钱；任职多年并不让原商号自动归你。',
    options: [
      option('clerk-remain-salaried', '继续按月做柜伙、账单与客户交接，不接旧债', { money: 2, position: 2, mind: 1 }, 'f12:clerk:salary', '1946 年继续在汉口行栈做受薪柜伙与账单交接。', '复业班表把工资和旧债分开', '徐立臣安排六周新班表，掌柜继续管印章和旧债；你核现有订单并按月领薪，旧客户可自行决定是否回来。'),
      option('clerk-specialized-purchasing', '转专门采购与供货答复，只签授权范围', { knowledge: 3, network: 2, health: 1 }, 'f12:clerk:purchase', '1946 年转入有授权范围的采购与供货交接。', '专门岗位仍有老板和客户追问', '你核三家供货人的品项、价格和交期，徐立臣复核批准；一次缺货得到替代或退款答复，没有被“门路广”掩盖。'),
      option('clerk-limited-trading-partnership', '以现金、劳动和具名货物建立有限日用行号', { money: -6, craft: 2, network: 3 }, 'f12:clerk:firm', '1946 年建立有范围、雇员和退伙边界的小型日用行号。', '行号首月只有两名雇员和三批货', '你与罗慧琴分别投入现金和劳动，两名雇员按月领薪；三批货、房租、供货债与客户回款逐项核对，没有取得旧商号招牌、印章或全部客路。', { enterpriseStart: { id: 'f12-limited-trading-firm', name: '汉口合成安琴日用行号', domainKey: 'D45', kind: 'bounded-daily-goods-trading-firm', workplace: '汉口合成江汉商街登记铺位', supplier: '三家具名日用货供货人', product: '有来源、件数、货主与结算日的日用杂货批零交接', employees: 2, partners: [{ personId: 'contact:f12_luo_huiqin', role: '有限现金与账务劳动合伙人' }], asset: { id: 'trading-firm-stock-tools', kind: 'documented-stock-ledger-tools', description: '三批具名库存、货架和账表工具' }, debt: { id: 'trading-firm-opening-credit', creditor: '三家具名供货人', purpose: '首批库存、铺位押金与运输费' }, license: { id: 'trading-firm-registration', kind: 'documented-trading-registration', authority: '汉口合成商街与同业管理单位', scope: '仅限登记日用货品项与铺位' } } }),
    ],
  });

  installDecision({
    id: 'route-hankou-warehouse-freight-clerk-1929', year: 1929, followYear: 1930, routes: ['hankou-warehouse-freight-clerk'], title: '外包完好、内层受潮的一批货怎样定责',
    prompt: '货物入仓后发现内层受潮，船上记录与仓单相差半日。货主、船方、仓栈和搬运人各掌握一段，不能从整班工资中直接扣赔。',
    options: [
      option('warehouse-seal-and-trace', '封存现状，逐层核包装、时间与具名交接', { craft: 3, mind: 3, money: -1 }, 'f12:warehouse:trace', '1929 年封存并逐段核一批受潮货。', '货损停在可证明的交接段', '外包无新裂口，船单记有此前淋湿，仓间晚半日入库；可售、退回与未知损失分开，班组未被整笔扣薪。'),
      option('warehouse-pay-confirmed-shortage', '先补已确认短少，保留受潮原因继续查', { money: -2, relation: 2, mind: 2 }, 'f12:warehouse:confirmed', '1929 年只处理已确认短少并保留受潮未知。', '客户先得到一部分实际答复', '仓间补齐两件点数差，货主收到可售清单；受潮货值待开包复核，蔡伯安不替船方和供货人认责。'),
      option('warehouse-witness-only', '每人只陈述亲眼所见，不拼成假确定', { network: 2, mind: 3, position: 1 }, 'f12:warehouse:witness', '1929 年以分段证词回应仓储货损。', '四份记录保留了边界和未知', '你只确认入仓件数，蔡伯安确认包装，搬运人说明路段，货主保留原货单；无争议工资先结，未知责任另定复核日。'),
    ],
  });
  installDecision({
    id: 'route-hankou-warehouse-freight-clerk-1946', year: 1946, followYear: 1947, routes: ['hankou-warehouse-freight-clerk'], title: '货路恢复后继续理货、转批发交接还是组织有限仓运',
    prompt: '船期与仓间重新排班，你可继续受薪，也可用记录能力做批发交接，或以有限工具组织小队；每条路都有货损、工资和退出成本。',
    options: [
      option('warehouse-salaried-tally', '继续按月理货与仓单交接，停止主要负重', { money: 2, health: 2, position: 1 }, 'f12:warehouse:salary', '1946 年继续做受薪理货与仓单交接。', '轻岗位仍有班表和差错责任', '蔡伯安安排你核件数、包装和入仓人，搬运班另领工资；你减少负重，也失去一部分按件收入。'),
      option('warehouse-wholesale-desk', '转做批发货单、供货与客户交接职员', { knowledge: 3, network: 2, money: 1 }, 'f12:warehouse:wholesale', '1946 年转入批发货单与供货交接岗位。', 'D16 的批发工作有具体货物和客户', '你处理三批干货与日用品，逐笔核货主、仓位、客户和付款日；老板保留定价权，你只签授权文书。'),
      option('warehouse-limited-storage-team', '以手车、秤具和工资表成立有限仓运小队', { money: -5, craft: 3, network: 2 }, 'f12:warehouse:team', '1946 年建立有工具、雇员和责任范围的仓运小队。', '小队第一月只有四名工人与两处仓位', '你与蔡伯安只投入列明工具和劳动，四名工人按班领薪；火损、受潮、车损和停班分别记，不因队名拥有仓库或客户货物。', { enterpriseStart: { id: 'f12-limited-warehouse-team', name: '汉口合成伯安仓运小队', domainKey: 'D45', kind: 'bounded-warehouse-freight-team', workplace: '汉口合成仓间与码头之间两处登记作业点', product: '有仓单、货号和交接人的理货、短驳与批发货物交接', employees: 4, partners: [{ personId: 'contact:f12_cai_boan', role: '有限秤具与验货劳动合伙人' }], asset: { id: 'warehouse-team-tools', kind: 'handcarts-scales-storage-tools', description: '两辆手车、两套秤具与具名工具份额' }, license: { id: 'warehouse-team-work-registration', kind: 'documented-warehouse-work-registration', authority: '汉口合成仓栈与街区管理单位', scope: '只限登记仓位、货类与短驳范围' } } }),
    ],
  });

  installDecision({
    id: 'route-hankou-dry-goods-small-trader-1929', year: 1929, followYear: 1930, routes: ['hankou-dry-goods-small-trader'], title: '熟客到期未还却又要赊货时怎样处理',
    prompt: '一名饭馆熟客仍欠上一批钱，又要赊新的干货。供货款、帮工工资和铺租都将到期，“熟”不能替代谁承担现金缺口。',
    options: [
      option('trader-stop-new-credit', '停止新增赊货，只催已确认欠款', { money: 1, mind: 3, relation: -1 }, 'f12:trader:stop', '1929 年停止给一名欠款熟客新增赊货。', '少一个熟客和收回的钱分别出现', '顾客改去别摊，两周后还一半旧款并约余款日；摊位失去一段介绍，也没有继续拿帮工工资垫客账。'),
      option('trader-written-installments', '接受分期，但写清品项、日期和停止供货线', { money: 1, relation: 2, mind: 2 }, 'f12:trader:installment', '1929 年把一笔熟客欠款改为有期限分期。', '分期得到两次付款和一次停供答复', '饭馆先付一部分并缩小新单，第二次逾期后停止供货；冯月娥的其他库存不作担保，供货人另收到付款计划。'),
      option('trader-write-off-reduce-stock', '承认部分无法追回，减少下一批进货', { money: -2, health: 1, mind: 3 }, 'f12:trader:writeoff', '1929 年确认一笔坏账并减少后续库存。', '止损没有被写成失败结局', '摊位缩掉两项易坏货，按时付帮工工钱；旧客停止往来，蒋秀英不替罗家接下欠款，下一月现金虽少却可核。'),
    ],
  });
  installDecision({
    id: 'route-hankou-dry-goods-small-trader-1946', year: 1946, followYear: 1947, routes: ['hankou-dry-goods-small-trader'], title: '母亲减少出摊后怎样继续干货生计',
    prompt: '冯月娥腿痛加重，想减少久站。她的库存、旧客、周转钱、摊位与关店权不能被一句“把生意传给你”抹掉。',
    options: [
      option('trader-remain-salaried-manager', '继续受薪管货和收款，母亲保留库存与关店决定', { money: 2, relation: 2, health: 1 }, 'f12:trader:manager', '1946 年继续受薪管理母亲干货摊并保留她的产权。', '交班表替代自动继承', '冯月娥减少早班，仍决定进货和是否退摊；你按月领钱，蒋秀英只做自己的合单，三人的货与劳动分开。'),
      option('trader-limited-dry-goods-shop', '按库存、现金与劳动成立可退伙的干货小店', { money: -4, craft: 2, relation: 3 }, 'f12:trader:shop', '1946 年建立有库存、雇员和退伙边界的干货小店。', '小店第一月有三名股东和两名雇员', '冯月娥投入列明库存，蒋秀英只投入一批货和劳动，你投入现金；两名雇员按月领薪，铺租、坏货、供货债和退出逐项结算。', { enterpriseStart: { id: 'f12-dry-goods-shop', name: '汉口合成月秀干货小店', domainKey: 'D44', kind: 'bounded-dry-goods-retail-shop', workplace: '汉口合成商街登记小铺', supplier: '三家具名干货与杂货供货人', product: '按成色、重量、来源和收款记录的干货与日用杂货', employees: 2, partners: [{ personId: 'parent:mother', role: '具名库存与旧客边界合伙人' }, { personId: 'contact:f12_jiang_xiuying', role: '有限货物与柜台劳动合伙人' }], asset: { id: 'dry-goods-shop-stock-tools', kind: 'dry-goods-stock-scales-shelves', description: '三人盘点的库存、秤具、货架与分装工具' }, debt: { id: 'dry-goods-shop-supplier-credit', creditor: '三家具名供货人', purpose: '首批补货、铺位押金与包装' }, license: { id: 'dry-goods-shop-registration', kind: 'documented-retail-shop-registration', authority: '汉口合成商街与同业管理单位', scope: '仅限登记干货与日用杂货品项' } } }),
      option('trader-independent-market-stall', '只带自购货物另摆小摊，不拿走母亲旧客和库存', { money: -3, network: 2, position: -1 }, 'f12:trader:independent', '1946 年以自购货物另做独立干货小摊。', '独立营生从零核顾客和摊费', '你只带自己的秤、包装和首批货，母亲保留原摊与旧账；三名顾客各自决定是否转买，没有因亲属关系自动跟来。', { enterpriseStart: { id: 'f12-independent-market-stall', name: '汉口合成慧安干货摊', domainKey: 'D44', kind: 'sole-dry-goods-market-stall', workplace: '汉口合成市场登记摊位', supplier: '具名干货供货人', product: '有来源、成色、重量与实收记录的小批干货', employees: 0, asset: { id: 'personal-stall-stock-tools', kind: 'personal-scale-packaging-stock', description: '主角自购秤具、包装与首批货' }, debt: { id: 'market-stall-opening-stock', creditor: '具名干货供货人', purpose: '首批货、摊费与分装工具' } } }),
    ],
  });

  installDecision({
    id: 'hankou-commerce-credit-1921', year: 1921, followYear: 1922, families: ['hankoucommerce'], title: '房租、进货和一笔亲友借款同时到期时先保什么',
    prompt: '母亲要决定下一批进货，父亲可向行栈预支工资，亲友又愿意借钱但想以母亲全部库存作保。每个办法都必须写清谁同意、谁还钱和什么不在担保内。',
    options: [
      option('credit-protect-home-reduce-stock', '先保住房并减少一批进货，不作无限担保', { money: -2, position: 2, network: -1 }, 'f12:credit:home', '1921 年先付房租并减少一批干货进货。', '库存缩小但住处和退出权保住', '冯月娥停进两项慢货，三位顾客得到缺货答复；家中没有以整摊库存担保，下一批可按现金再决定。'),
      option('credit-written-wage-advance', '由父亲取得写清扣还的工资预支', { money: 2, mind: 1, position: -1 }, 'f12:credit:wage', '1921 年父亲取得一笔有期限的工资预支。', '本月现金对应三个月工资扣还', '徐立臣写明每月扣还和离职时的结算，父亲只以自己工资承担；母亲库存、主角未来收入和住处不作抵押。'),
      option('credit-mother-limited-borrowing', '由母亲本人决定借有限现钱，只列部分库存', { money: 2, relation: 2, mind: 1 }, 'f12:credit:mother', '1921 年母亲取得一笔有上限的小摊周转借款。', '借款只覆盖一批具名货和日期', '冯月娥选择三项可核货物并保留其余库存，蒋秀英只作见证不作共同债务人；分期日与停止进货线写清。'),
    ],
  });
  installDecision({
    id: 'hankou-commerce-war', year: 1938, followYear: 1939, families: ['hankoucommerce'], title: '武汉进入沦陷时期时怎样处理岗位、库存和住处',
    prompt: '空袭、撤离、管制与货路中断让行栈、仓栈和小摊受到不同影响。父母、慧琴、伴侣、同事和合伙人都有自己的工作与家口，不能由主角统一去留。',
    options: [
      option('hankou-commerce-verified-unit-move', '只随职责、负责人、住处和同行人都确认的单位迁移', { money: -2, network: 2, position: 1 }, 'f12:war:move', '1938 年只随已确认工作和住处迁移。', '迁移以后仍要重新核岗和床位', '你拿到具名仓栈或商号临时岗位，父母分别决定保留摊货或最后地址；慧琴按自己的工作行动，伴侣没有因婚姻自动同行。', { warTurn: 'verified-unit-move' }),
      option('hankou-commerce-local-bounded-trade', '留汉口只做货主、用途与经手人明确的民生日常', { craft: 2, money: 1, relation: 1 }, 'f12:war:local', '1938 年留在汉口维持对象明确的民生货物与小店工作。', '本地商业逐项缩减而非一句照旧', '你拒绝来源不明的高价货，只接具名干货、日用品与仓间交接；收入下降，母亲缩摊，父亲是否留行栈仍由实际岗位决定。', { warTurn: 'local-bounded-trade' }),
      option('hankou-commerce-split-addresses-stock', '家人分别保存地址、现金、库存、凭据和下次核信日', { network: 3, mind: 2, relation: 1 }, 'f12:war:split', '1938 年家人分别保存工作、库存、住处与下次核信日期。', '分开生活没有被补写成失踪或死亡', '母亲保留一批易存货，父亲停在最后可核行栈，慧琴随岗位近迁，伴侣保留自己的工资；一次退信只让一个地址失效。', { warTurn: 'split-addresses-stock' }),
    ],
  });
  installDecision({
    id: 'hankou-commerce-transition-1948', year: 1948, followYear: 1949, families: ['hankoucommerce'], title: '物价、停业与制度变化前怎样核最后一份商业生活',
    prompt: '物价、货币、商号、银行、仓栈和住处继续变化。你必须先列清工资、库存、欠款、雇员、家人和未结客户，再进入 1949 年后的八种人生承接。',
    options: [
      option('hankou-commerce-keep-current-ledgers', '留在现有岗位，逐项核工资、库存、债务与住处', { money: 1, mind: 2, relation: 1 }, 'f12:transition:ledger', '1948 年逐项核现有商业岗位与家庭账。', '1949 年 5 月的变化逐日落到账上', '部分机构停业后又复业，你只处理仍可确认的工资、货物和客户；旧招牌不等于旧权力延续，未结事项继续标未知。'),
      option('hankou-commerce-reduce-stock-protect-wages', '减少易坏库存，先结雇员工资和具名供货款', { money: -2, position: 2, relation: 2 }, 'f12:transition:wages', '1948 年减少库存并优先结清雇员工资与具名货款。', '缩业保住了具体人的答复', '两名雇员收到已做工钱，三家供货人各得付款或延期日；一部分货折价处理，停业与复业不再只是一行背景字。'),
      option('hankou-commerce-apply-documented-role', '拿可核履历申请新岗位，接受落选或限期试用', { knowledge: 2, position: 2, money: -1 }, 'f12:transition:apply', '1948 年凭可核商业履历申请一次新岗位。', '介绍信只换来面谈和限期试用', '新单位核你的职责、货物和报酬后给六周试用；旧岗位先结清，1949 年制度变化后还要重新确认登记与工资。'),
    ],
  });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['hankoucommerce'], priority: 12,
      sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }
  scene('f12-s01', '商号样品、家庭库存和寄卖货分三处放', '罗启盛把行栈样品锁进公用箱，冯月娥把自家干货与客人寄卖货分格；同住没有把三种资产混成罗家财产。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f12-s02', '受潮边缘的货要当面说明', '母亲分装一批干货，告诉客人哪些能卖、哪些退给供货人；成色、降价和返货由她决定，孩子不能替她承诺。', { minAge: 3, maxAge: 6, priority: 23 });
  scene('f12-s03', '只有掌柜能签的栏空在那里', '父亲送回一张货单，徐立臣只让他填经手栏；赶船期不创造签字权，职位最低也不承担整批风险。', { minAge: 5, maxAge: 8, priority: 23 });
  scene('f12-s04', '认货单、盘干货和珠算课撞在同一上午', '你只能去一处，父母分别安排剩下的工作；慧琴也可问自己的课程，不因她是女孩就默认守摊。', { minAge: 6, maxAge: 10, priority: 22 });
  scene('f12-s05', '房租、进货和借款同时到期', '家里列出住处、工资预支、母亲库存、还款日和哪些财物绝不担保；每个选择都让下一月的缺口可见。', { year: 1921, priority: 35 });
  scene('f12-s06', '慧琴问的是自己的报名条件', '罗慧琴想学珠算并问商号、仓栈或学校是否收女职员；父亲只能帮她查公开条件，不能保证录用，也不能留下她免费守摊。', { minAge: 9, maxAge: 14, priority: 21 });
  scene('f12-s07', '一批货外包完好、内层却受潮', '蔡伯安把船上记录、到仓时间和包装状态分开，不让任何人凭印象先认全部责任；这份证据会在后续货损中真正使用。', { minAge: 10, maxAge: 15, priority: 21 });
  scene('f12-s08', '三份试工各有老板、货物、工钱和答复日', '行栈、仓栈与干货合单分别写明职责、班次、权限、货物和结果日期；介绍只把人带到门口。', { year: 1924, routes: ['hankou-trading-house-clerk', 'hankou-warehouse-freight-clerk', 'hankou-dry-goods-small-trader'], priority: 30 });
  scene('f12-s09', '第一份稳定工作终于有具体名字', '徐立臣、蔡伯安或冯月娥给出留用结果；你的岗位、工作地点、老板、同事、顾客、结算与下一步进入职业账。', { year: 1925, routes: ['hankou-trading-house-clerk', 'hankou-warehouse-freight-clerk', 'hankou-dry-goods-small-trader'], priority: 26 });
  scene('f12-s10', '江汉商街的繁盛不替任何人保证工作', '银行、公司、传统商店与不同商品并在街面出现，你仍要逐家问缺额、试工、工资和权限；城市繁华不是个人自动上升。', { year: 1930, priority: 28 });
  scene('f12-s11', '顾客不是一句生意不错', '一位饭馆客人催货、一位货主追问受潮、一位买家只问价不下单；每个人得到交货、退款、复核或停止往来的实际答复。', { minAge: 20, maxAge: 52, priority: 21 });
  scene('f12-s12', '合伙不是把两家和两个人并成一户', '蒋秀英提出拼一批货，要求库存、摊位劳动、回款与女儿照料时间分别记；她可竞争、拆伙或拒绝续投。', { minAge: 20, maxAge: 48, priority: 21 });
  scene('f12-s13', '结婚后争吵的是夜班、货钱和两边父母', '你与伴侣为晚间盘货、铺租、担保、双方父母医药钱和是否共同经营争吵；两人各自说明工作与亲属责任，再决定同住、近居或分账。', { minAge: 23, maxAge: 43, priority: 20 });
  scene('f12-s14', '眼痛、手腕伤、腰伤和胃痛会真正停工', '抄单伤眼腕、仓间搬验伤腰、久站与饮食不定伤胃。看诊、药钱、代班、未结工资和复工日分别处理，旧伤可能进入晚年。', { minAge: 24, maxAge: 58, priority: 20 });
  scene('f12-s15', '朋友和同事有自己的顾客与退出', '蒋秀英要照顾女儿而少出两班，仓间同事想换工，客户也会转买；你可合作、竞争、重排或结束往来，没人永远等你调用。', { minAge: 25, maxAge: 58, priority: 19 });
  scene('f12-s16', '公开同业互助与政治身份分开', '同行讨论货损、欠薪、停业和公开互助，也有人试探高风险联络。你可参加公开工作、另行申请、保持无党派或拒绝；做店员、账房和商人本身不等于任何组织身份。', { minAge: 18, maxAge: 45, priority: 18 });
  scene('f12-s17', '1938 年货路、岗位、库存与住处分开中断', '行栈可能撤离，仓间停一段船，小摊缺一批货，家人各有最后地址；没有用一句“继续经商”跨过沦陷时期。', { year: 1938, priority: 37 });
  scene('f12-s18', '沦陷时期每年仍有具体商业日常', '你只处理货主、用途和经手人明确的民生货物；停班、短货、改址、拒单、疾病与家人消息逐年发生，职业不自动生成秘密身份。', { minYear: 1939, maxYear: 1944, priority: 23 });
  scene('f12-s19', '1945 年恢复先从还在的人和货开始', '你核仍在的同事、老板、仓位、库存、旧债、顾客、工具和家人地址；战争结束没有让失效商号、死亡者和旧权力自动恢复。', { year: 1945, priority: 34 });
  scene('f12-s20', '有店名以后还要看雇员和所有权', '开行号、仓运小队或干货店时，雇员工资、股东货物、资产、债务、登记、顾客与退出逐项显示；成为老板不是一句结局。', { minAge: 36, maxAge: 58, priority: 20 });
  scene('f12-s21', '1949 年 5 月的变化不是一张终局牌', '停业、基础设施受损、复业、货币流通和机构接管先后改变工作；系统只回收当时可确认的人、货、工资与住处，再继续后半生。', { year: 1949, routes: ['hankou-trading-house-clerk', 'hankou-warehouse-freight-clerk', 'hankou-dry-goods-small-trader'], priority: 40 });
  scene('f12-s22', '父亲晚年只能交经验，母亲仍决定自己的货', '罗启盛不再长途送单但可核旧账，冯月娥减少出摊却仍决定库存怎样清；二人分别协商轻活、医药、住处和帮助。', { minAge: 43, maxAge: 66, priority: 19 });
  scene('f12-s23', '歇业也有客户、雇员和供货人的答复', '你减少品项、退一处仓位、结清一名雇员、退还寄卖货或结束合伙；每个人知道收回什么、失去什么和何时再联系。', { minAge: 50, maxAge: 72, priority: 18 });
  scene('f12-s24', '死亡与尾款、货物、份额和确认分开', '父母、合伙人、客户或主角去世后，发生、知情、确认、工资尾款、寄卖货、合伙份额和未知欠款分别处理，不自动免债或全归主角。', { minAge: 58, priority: 17 });

  C.annualRhythms['hankou-trading-house-clerk'] = [
    '每天从徐立臣处领取具名样品、货单或存根，处理后交回批准人、客户和答复日；多年任职不扩大签字权限，也不自动生成商号股权。',
    '一笔交易经过询价、开单、复核、备货、送达和收款；你只签自己经手的一段，退单、缺货、少款和客户变更各有下一步。',
    '男性更常被派采购和外勤，女性更多从内账与柜台进入；这是时代岗位机会差异，不是能力数值惩罚，两者都可升账务、转行、被辞或有限创业。',
  ];
  C.annualRhythms['hankou-warehouse-freight-clerk'] = [
    '每批货先核货主、包装、件数、船期、入仓时间与经手人；没有船、货未到或仓位停用都会形成具体空班和工资结果。',
    '蔡伯安、搬运人、船方和客户只回答各自经手段；短少、受潮、火损、治疗、工资与赔付不能从一张总账含糊相抵。',
    '仓栈经验可转批发交接或组织有限小队，却不取得货主库存、仓库产权和无限路线；女性进入仓单与清点时也保留升岗和外勤可能。',
  ];
  C.annualRhythms['hankou-dry-goods-small-trader'] = [
    '每天把进货、成色、重量、实际收款、赊账、帮工工资、摊费和坏损分开；顾客多与赚钱不是一件事。',
    '冯月娥保留库存、旧客与关店权，蒋秀英和帮工保留货物、工资、女儿照料与退出权；亲属和合伙都不能免费接管。',
    '缺货、物价、战争和 1949 年变化会逐项改变品项与客流；缩摊、租铺、合伙、独立、歇业或转为受薪都能成为完整人生。',
  ];
  C.sceneFrames.hankoucommerce = [
    { open: '天亮后，父亲的行栈货单、母亲的干货格、慧琴的报名和仓间船期同时摆在眼前。', close: '今天只处理了一张单、一批货或一位顾客；谁拥有、谁经手、谁付钱、谁等待和下次答复日分别留下。' },
    { open: '江汉商街开门，徐立臣、蔡伯安和蒋秀英各自核自己的单据、货物、工资与家口。', close: '你得到具体工作结果，也承担钱、身体、货损或关系代价；熟人没有替你变成掌柜，家人也没有失去自己的决定。' },
  ];
  C.sceneFrames['hankou-trading-house-clerk'] = C.sceneFrames.hankoucommerce;
  C.sceneFrames['hankou-warehouse-freight-clerk'] = C.sceneFrames.hankoucommerce;
  C.sceneFrames['hankou-dry-goods-small-trader'] = C.sceneFrames.hankoucommerce;

  C.parentProfiles.hankoucommerce = {
    mother: { name: '冯月娥', born: 1885, occupation: '经营干货小摊、库存、赊客与自己的周转钱', deathAgeBase: 77, activities: ['逐批核成色、重量、进价和实际收款', '自己决定是否赊客、借款、合摊或租铺', '晚年减少久站但仍决定库存、旧客和关店'], words: ['“熟客也要说哪天还，熟不能替他付钱。”', '“这格是我的货，那格是寄卖的，谁也不能混着担保。”', '“你若想合伙，先把库存、工资和退伙写清。”'] },
    father: { name: '罗启盛', born: 1882, occupation: '在行栈做柜伙、送单并核自己权限内的收据', deathAgeBase: 73, activities: ['交回样品、货单、送达人与答复', '拒绝或限定未经授权的担保与签字', '晚年教核存根与客户地址，不把职位当遗产'], words: ['“掌柜能签的栏，我不能替他赶着写。”', '“我介绍你见徐账房，不等于他一定留你。”', '“商号的货、你娘的货和客人的寄卖货，要分开认。”'] },
  };
  C.spouseProfiles.hankoucommerce = {
    男: { name: '顾秀兰', bornOffset: 1, occupation: '商号柜台与学校短工，保留工资和母亲照料时间', values: '共同生活要谈清夜班、货款、双方父母与是否合伙，不接受自动免费管店或担保' },
    女: { name: '韩守义', bornOffset: -1, occupation: '仓栈文书与短途送货工，按班领薪并照料自己的父亲', values: '愿意分担家用和照料，不把妻子的客户、库存、摊位或账务门路据为己有' },
  };
  C.childNames.hankoucommerce = ['罗汉宁', '罗清和'];

  var clerkBase = { kind: 'trading-house-clerical-work', role: '行栈柜伙、货单与采购交接职员', workplace: '汉口合成广源行栈文书房与客户柜台', employer: '汉口合成广源行栈', supervisor: '账房负责人徐立臣', colleague: '同柜伙郑启文', publicPerson: '催货与核收据的贺老板', terms: '有限试工后按月结算；样品、原件、存根、签字权限、现金、送达、担保、记过和辞退分别记录', duties: '开单、核存根、送样与采购交接，向客户说明交期和差错结果，不替掌柜越权签字或拿家庭财产担保', scenes: ['贺老板要求改货数，你先核原单和批准人。', '同事漏附收据，你只补自己能证明的交接。', '一批采购延期，客户收到缺货、替代或退款的具名答复。'] };
  var warehouseBase = { kind: 'warehouse-wholesale-freight-work', role: '仓栈理货、货运文书与批发交接职员', workplace: '汉口合成顺平码头仓栈与批发货间', employer: '汉口合成顺平仓栈', supervisor: '验货负责人蔡伯安', colleague: '理货同事吴金枝', publicPerson: '托运干货的邓货主', terms: '有限试工后按班或按月结算；货主、仓单、件数、包装、船期、入仓、受潮、短少和停运分别记录', duties: '验包装与件数、开仓单、核船期和批发交接，给货主、搬运人和雇主分段答复并处理身体代价', scenes: ['一包内层受潮，你封存包装并核船单。', '船迟一日，客户收到新日期，空班工资另结。', '同事搬货伤腰后先停工，治疗、代班和工钱分别处理。'] };
  var traderBase = { kind: 'dry-goods-small-trade', role: '干货摊、杂货小店与同业拼货经营人', workplace: '汉口合成江汉商街月娥干货摊与登记铺位', employer: '经营者冯月娥', supervisor: '冯月娥', colleague: '同业蒋秀英', publicPerson: '按批买货的饭馆顾客陈掌柜', terms: '有限试工后按日或按月结算；库存、寄卖货、成色、重量、赊账、帮工工资、铺租、坏损和利润分别记录', duties: '进货分装、说明成色、收款与催账，给顾客、供货人和帮工明确答复，并保留母亲与合伙人的产权', scenes: ['陈掌柜旧账未清又要赊货，你按期限决定。', '蒋秀英少做两班照顾女儿，实际工钱照结。', '供货人送来受潮一包，你当面核重量和退回。'] };
  Object.assign(C.routeCareerProfiles, { 'hankou-trading-house-clerk': clerkBase, 'hankou-warehouse-freight-clerk': warehouseBase, 'hankou-dry-goods-small-trader': traderBase });
  C.routeCareerProfilesByGender = C.routeCareerProfilesByGender || {};
  C.routeCareerProfilesByGender['hankou-trading-house-clerk'] = {
    男: Object.assign({}, clerkBase, { role: '行栈外勤送样、开单与采购交接柜伙', duties: '在时代岗位分工下更多承担外勤采购和送样，同时核存根与权限；跑得远不等于拥有签字和担保权' }),
    女: Object.assign({}, clerkBase, { role: '行栈内账抄录、存根与客户柜台职员', duties: '在时代招工门槛下更多从内账、存根、样品和柜台答复进入，不假定能自由取得所有外勤职位' }),
  };
  C.routeCareerProfilesByGender['hankou-warehouse-freight-clerk'] = {
    男: Object.assign({}, warehouseBase, { role: '仓栈现场验货、理货与货运文书职员', duties: '承担更多仓间现场和装卸边缘验货，核件数、包装与交接；体力参与不产生货物所有权' }),
    女: Object.assign({}, warehouseBase, { role: '仓栈仓单、清点与批发窗口交接职员', duties: '在时代岗位限制下从仓单、清点、缝包和窗口交接进入，保留升为理货与外勤的可能，不作能力惩罚' }),
  };
  C.routeCareerProfilesByGender['hankou-dry-goods-small-trader'] = {
    男: Object.assign({}, traderBase, { role: '干货采购、搬运、摊售与外送经营人', duties: '承担较远采购和外送，也核成色、收款与帮工工资，不取代母亲库存产权' }),
    女: Object.assign({}, traderBase, { role: '干货分装、摊售、赊账与小店经营人', duties: '在时代劳动分工下管理分装、柜台、收付和帮工排班，保留工资、休息与合伙决定' }),
  };

  Object.assign(C.routeContactProfiles, {
    'hankou-trading-house-clerk': [
      { id: 'f12_clerk_supervisor', label: '徐立臣', role: '核样品、原件、存根、签字权限与现金交接的账房负责人', status: 'supervisor', relation: 21, born: 1880 },
      { id: 'f12_clerk_coworker', label: '郑启文', role: '能说明同一批开单、送样与实际工时的柜伙同事', status: 'coworker', relation: 26, born: 1901 },
      { id: 'f12_clerk_customer', label: '贺书恒', role: '会催货、核收据并要求差错答复的商号客户', status: 'nearby', relation: 18, born: 1889 },
    ],
    'hankou-warehouse-freight-clerk': [
      { id: 'f12_warehouse_supervisor', label: '蔡伯安', role: '核包装、件数、船期、受潮与入仓时间的验货负责人', status: 'supervisor', relation: 22, born: 1882 },
      { id: 'f12_warehouse_coworker', label: '吴金枝', role: '按班核仓单、清点和缝包并保留弟弟照料时间的同事', status: 'coworker', relation: 27, born: 1903 },
      { id: 'f12_warehouse_customer', label: '邓绍昌', role: '会追问短少、受潮、船期与赔付范围的干货货主', status: 'nearby', relation: 19, born: 1888 },
    ],
    'hankou-dry-goods-small-trader': [
      { id: 'f12_trader_supplier', label: '余庆丰', role: '按批核干货成色、重量、退货与付款日的供货人', status: 'nearby', relation: 19, born: 1887 },
      { id: 'f12_trader_coworker', label: '高荷香', role: '按班领薪并保留父亲照料时间的分装与柜台帮工', status: 'coworker', relation: 27, born: 1903 },
      { id: 'f12_trader_customer', label: '陈守福', role: '按批买货、可能赊账也会亲自决定停买的饭馆顾客', status: 'nearby', relation: 21, born: 1893 },
    ],
  });
  Object.assign(C.healthProfiles, {
    'hankou-trading-house-clerk': ['长时间抄单造成的眼痛与手腕疼痛', '反复送样和湿冷奔走造成的膝踝旧伤与咳嗽', '差错、担保与停业压力造成的失眠胃痛'],
    'hankou-warehouse-freight-clerk': ['搬验、弯腰清点与站立造成的腰背膝伤', '仓间潮湿、粉尘与受潮货造成的反复咳嗽和皮肤不适', '船期、货损与轮班造成的过劳失眠'],
    'hankou-dry-goods-small-trader': ['久站、搬货与分装造成的腰腿和手指疼痛', '粉尘、湿热与霉损货物造成的呼吸不适', '早市、赊账、物价和铺租压力造成的胃痛失眠'],
  });
  Object.assign(C.publicRouteProfiles, {
    'hankou-trading-house-clerk': { publicGroup: '合成的商号职员工钱、担保与差错公开答复簿', publicRole: '核公开工钱、签字权限、担保和文件差错', covertRole: '只有另经独立政治申请与考验才可能参与有限联络；识字、客户与货单本身不等于组织身份', infiltrationRole: '不借客户单据套取隐私，任何高风险工作都需独立授权并允许拒绝、失败与退出', contact: { id: 'public_f12_clerk', label: '邵守仁', role: '登记公开职务、欠薪和越权指示的职员互助经手人', status: 'colleague', relation: 19, born: 1900 } },
    'hankou-warehouse-freight-clerk': { publicGroup: '合成的仓栈工钱、货损与伤病公开答复簿', publicRole: '核公开班次、仓单、货损、工伤与少结工资', covertRole: '只有另经独立选择才可能参与有限联络；熟悉货路不自动成为情报身份', infiltrationRole: '不借仓单、包裹或货主地址套话，秘密身份与职业必须分账并记录压力和退出', contact: { id: 'public_f12_warehouse', label: '陈河清', role: '登记仓栈班次、货损和工伤答复的公开互助经手人', status: 'colleague', relation: 19, born: 1901 } },
    'hankou-dry-goods-small-trader': { publicGroup: '合成的摊贩赊账、供货与临时救济公开簿', publicRole: '核公开赊账、供货、失物与需要转介的街坊困难', covertRole: '小摊只处理顾客主动提供的公开事实；若另经选择参与联络，不能把所有顾客和家人变成情报来源', infiltrationRole: '不借赊货、送货或住址冒名套话，任何秘密任务都需要独立授权并允许拒绝或失败', contact: { id: 'public_f12_trader', label: '魏宁芳', role: '登记摊贩供货、赊账与街坊转介的公开互助经手人', status: 'colleague', relation: 20, born: 1905 } },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('literate', 'hankou-trading-house-clerk');
  addRouteToTrack('skilled', 'hankou-warehouse-freight-clerk');
  addRouteToTrack('trade', 'hankou-dry-goods-small-trader');

  C.events.push(
    { id: 'hankou-commercial-center-1930', year: 1930, eraBrief: true, eraScope: '汉口江汉商业空间', families: ['hankoucommerce'], title: '江汉商街连接多种商业机构与货物流动', knownThrough: ['newspaper', 'conversation'], delta: { network: 1, position: 1 }, knownText: '你知道江汉商业空间连接不同管理区域，银行、公司、传统商店与中外商品并存；岗位与货路增加仍须试工、授权、库存和真实客户。', unknownText: '街面新招牌与货物来得更杂，你先从送单、仓位和顾客变化感到商业中心扩大，还不知道全部机构关系。', fact: '近代汉口江汉路一带成为连接不同商业区域、机构与商品的重要商业空间。', historySource: { label: '武汉市档案馆：江汉路商业史料', url: 'https://www.whda.org.cn/dawh/whjy/202512/t20251223_2699331.shtml' } },
    { id: 'hankou-commerce-occupation-1938', year: 1938, eraBrief: true, eraScope: '武汉与汉口商业生活', families: ['hankoucommerce'], title: '武汉进入长期沦陷时期', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { money: -2, health: -1, position: -2 }, knownText: '你知道 1938 年 10 月下旬汉口进入沦陷时期，交通、经济、市政与社会生活此后长期变化；一次去留不能替代七年的商号、仓栈和家庭日常。', unknownText: '空袭、撤离和管制先打断货单、船期、库存与住处，你只知道眼前岗位和家人最后地址，尚不能确认变化会持续多久。', fact: '1938 年 10 月汉口进入持续至 1945 年受降前后的沦陷时期。', historySource: { label: '武汉市档案馆：《武汉沦陷时期档案史料丛编》介绍', url: 'https://www.whda.org.cn/dawh/bycg/202512/t20251203_2689132.html' } },
    { id: 'hankou-commerce-may-1949', year: 1949, eraBrief: true, eraScope: '汉口城市商业与金融机构', families: ['hankoucommerce'], title: '1949 年 5 月汉口商业从停顿转入复业与接管', knownThrough: ['newspaper', 'conversation'], delta: { money: -1, position: 1, network: 1 }, knownText: '你知道物价、停业、人员缩减、基础设施损坏、复业、人民币流通与机构接管先后发生；旧岗位、旧债、库存、工资和登记必须分别确认。', unknownText: '几天里商店先关又开，货币和管理办法改变，你只能先核眼前雇主、雇员、货物和住处，还不知道每项旧关系怎样承接。', fact: '1949 年 5 月汉口经历商业金融停顿、复业、人民币流通及机构接管等连续变化。', historySource: { label: '武汉市档案馆：汉口银行月报所见 1949 年 5 月', url: 'https://www.whda.org.cn/dawh/whjy/202512/t20251223_2699334.shtml' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
