// 民国人生 · F02 苏北乡村手艺与集市小贩家庭运行时包 v0.7.15
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f02.js');

  C.version = '0.7.15';
  C.familyDecisionKeys.subeiartisans = { path: 'subei-artisan-path', war: 'subei-artisan-market-break-1938' };
  Object.assign(C.designRegistry.families.F02, {
    designStatus: 'runtime-reviewed-first-round', runtimeStatus: 'playable-verified', runtimeFamilyKey: 'subeiartisans',
  });
  C.runtimeFamilyDesignMap.subeiartisans = 'F02';
  Object.assign(C.legacyRouteDomainMap, {
    'subei-village-tool-repairer': 'D04',
    'subei-itinerant-market-vendor': 'D13',
    'subei-market-stall-shopkeeper': 'D05',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F02-ZHENJIANG-CHAMBER': {
      label: '江苏省档案馆：镇江商会档案介绍',
      url: 'https://www.dajs.gov.cn/art/2022/5/5/art_123_9681.html',
      supports: ['近代江苏商会档案包含行业、商工、市场、开业歇业与登记资料；不替合成乡村和家庭提供真实铺户、金额或个人经历'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F02-SOCIAL-AFFAIRS': {
      label: '江苏省档案馆：民国江苏省社会处档案介绍',
      url: 'https://www.dajs.gov.cn/art/2022/6/14/art_321_40996.html',
      supports: ['1945—1949 年档案涉及劳资、失业登记、职业介绍、合作供销、物资运销和灾害救济；不能把全省制度写成每个乡镇同步落地'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F02-FARMER-BANK': {
      label: '江苏省档案馆：江苏省农民银行档案',
      url: 'https://www.dajs.gov.cn/art/2022/11/17/art_123_9709.html',
      supports: ['1927 年后江苏出现面向农村金融与合作事业的制度尝试，同时官方材料明确其能力有限；熟人、申请或合作名义不等于实际获贷'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F02-FLOOD-1931': {
      label: '华东师范大学中国现代城市研究中心：1931 年江淮大水研究',
      url: 'https://www.clhm.ecnu.edu.cn/_upload/article/files/a2/f8/6ac640fa4f5f9ab0b4b51bd1a6f9/c383ccb3-4f2f-49a2-bb00-2192483032b1.pdf',
      supports: ['1931 年江淮流域洪灾广泛影响江苏等地的交通、农作、市场、疾病与救济；合成家庭只承受其所在地能够确认的生活后果'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F02-HUAI-CONTROL': {
      label: '江苏省档案馆：治淮的超级工程',
      url: 'https://www.dajs.gov.cn/art/2021/9/1/art_170_1619.html',
      supports: ['1951 年苏北治淮工程进入制度化建设阶段并改变劳务、交通与地方生活；不把参与一段工地劳动写成工程所有权或终身编制'],
      status: 'source-reviewed-first-round',
    },
  });

  C.families.subeiartisans = {
    key: 'subeiartisans', name: '苏北乡村手艺与集市小贩家', born: 1910,
    place: '苏北合成运河堤乡与两处集市之间', defaultSeed: 210,
    defaultNames: { 男: '丁守成', 女: '丁守兰' },
    motif: '修农具的工具、针线货箱、赶集路线、熟客欠账和少量现金分属不同的人；会手艺、认识摊主或跟过一次集，都不等于已经有铺面、稳定客户或可以替家人收钱。',
    start: { body: 47, knowledge: 24, craft: 39, mind: 41, network: 31, fame: 9 },
    startRes: { money: 8, health: 78, relation: 70, position: 16 },
    subjects: {
      mother: { label: '母亲', status: 'alive-working', health: 67, agency: 98, note: '赶集卖针线与缝补，保留货箱、客户、回款、进货钱和停赶远集的决定' },
      father: { label: '父亲', status: 'alive-working', health: 69, agency: 94, note: '挑工具走村修农具，只处分自己的工具、工钱和已经确认的客户修件' },
      spouse: { label: '配偶', status: 'not-met', health: 71, agency: 96, note: '婚后保留自己的工资、债务、工具、父母照料、住处与是否合伙的决定' },
      household: { label: '家口、工具与两条赶集路线', status: 'shared-life-separate-ledgers', strength: 55, agency: 93 },
      support: { label: '铁匠、摊主、熟客、邻村与识字班', status: 'bounded-reciprocity', strength: 31, agency: 96 },
      connections: { label: '试工、集市、铺面与进货门路', status: 'trial-and-answer-required', strength: 25, agency: 94 },
      workers: { label: '学徒、帮摊、短工与送货人', status: 'separate-work-wages-and-exit', strength: 23, agency: 96 },
      ledger: { label: '工具、客户修件、货箱、赊欠、摊租、进货与家用分账', status: 'confirmed-partial-disputed', strength: 32, agency: 98 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 90, note: '不自动继承父母工具、母亲货箱、客户欠账、铺面、债务或养老责任' },
    },
    contacts: {
      f02_ding_shouyi: { label: '丁守义', role: '挑工具走村修农具并逐件核修理、交付和工钱的父亲', status: 'family', relation: 64, agency: 94, note: '可伤手、改坐摊、转短工或退休，不能替主角赊修、收徒或处分母亲货款' },
      f02_ge_lanying: { label: '葛兰英', role: '经营针线货与缝补并保留货本和回款的母亲', status: 'family', relation: 73, agency: 98, note: '可拒绝赊货、停赶远集、与人合摊、病休或独立经营，不是全家的无偿售货人' },
      f02_ding_xiaohe: { label: '丁小禾', role: '想学记账、试新集市并决定自己工作与婚或不婚生活的手足', status: 'family', relation: 56, agency: 98, note: '不自动继承家业或照料父母，可入铺、摆摊、迁走、成家、独居或有限返家' },
      f02_cao_erbao: { label: '曹二保', role: '只按炉火、材料、交货和试工表现安排活的合成镇上铁匠', status: 'nearby', relation: 28, agency: 95, note: '只给有期限试工，不保证收徒、铺位、工具或终身饭碗' },
      f02_xu_cuifeng: { label: '徐翠凤', role: '靠油盐摊养自己和女儿并维护摊位、货源与欠账边界的摊主', status: 'nearby', relation: 31, agency: 98, note: '可合运、竞争、分租、拆伙或停摊，不替丁家垫无限货款' },
      f02_wu_changgeng: { label: '吴长庚', role: '播种收割前要修好工具并保住自家口粮的农户熟客', status: 'nearby', relation: 29, agency: 95, note: '可用粮、劳力或延期结算，也可能失约、迁走或停止来往' },
    },
  };

  Object.assign(C.routes, {
    'subei-village-tool-repairer': { name: '苏北走村农具修理、铁匠学徒与坐摊手艺', family: 'subeiartisans', summary: '从整理料头、看火、磨刃与逐件修理做起，处理工具产权、客户旧损、材料、返工、工钱、伤手、带徒与晚年交接。' },
    'subei-itinerant-market-vendor': { name: '苏北流动针线杂货、两地赶集与送货小贩', family: 'subeiartisans', summary: '逐趟核货源、路线、天气、摊位、查验、熟客、现钱、赊账与未售货；流动不是没有经营，也不保证年年能到同一集。' },
    'subei-market-stall-shopkeeper': { name: '苏北集市固定摊、乡村小店与缝补修配经营', family: 'subeiartisans', summary: '从分租半个摊位或小间铺面做起，处理租位、库存、客户物件、帮工工资、合伙份额、坏账、歇业和制度变化。' },
  });

  C.actions.push(
    { id: 'f02-tool-order-ledger', name: '跟父亲核工具、客户旧损、修理、交付与工钱', families: ['subeiartisans'], minAge: 6, spirit: 3, delta: { craft: 3, knowledge: 2, relation: 1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f02_ding_shouyi: { relation: 2 }, f02_wu_changgeng: { relation: 1 } }, note: '父亲工具、客户修件、材料和工钱分别记；帮忙不等于有权赊修或收走客户物件。' },
    { id: 'f02-needle-stock-market-ledger', name: '跟母亲核针线货、缝补件、进货、现钱与赊账', families: ['subeiartisans'], minAge: 6, spirit: 2, delta: { craft: 2, knowledge: 2, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f02_ge_lanying: { relation: 2 }, f02_xu_cuifeng: { relation: 1 } }, note: '货本、客户衣物、母亲收入和家用分开；父亲熟人不能自动挂母亲的账。' },
    { id: 'f02-literacy-route-practice', name: '去识字班认数字、欠项、地名与两条赶集路线', families: ['subeiartisans'], minAge: 7, spirit: 3, delta: { knowledge: 4, mind: 2, network: 1 }, channels: ['books'], contactEffects: { f02_ding_xiaohe: { relation: 2 }, f02_xu_cuifeng: { relation: 1 } }, note: '练习纸与真实客户账分开；识字能减少错账，不能自动取得铺面或贷款。' },
    { id: 'f02-repair-order-shift', name: '完成一件检查、拆修、试用、返工与收款', routes: ['subei-village-tool-repairer'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 4, money: 2, health: -1 }, contactEffects: { f02_repair_supervisor: { relation: 1 }, f02_repair_customer: { relation: 2 } }, note: '旧损、材料、借用工具、工时、试用、返工和实收写在同一张工单。' },
    { id: 'f02-repair-tool-wage-health', name: '核工具归还、工钱、伤手、停炉与下一单', routes: ['subei-village-tool-repairer'], minAge: 17, spirit: 3, careerAction: true, delta: { craft: 2, mind: 2, health: 1 }, contactEffects: { f02_repair_supervisor: { relation: 1 }, f02_repair_coworker: { relation: 2 } }, note: '学徒、受薪、借工具和客户订单是不同关系；停炉或伤病当年给答复。' },
    { id: 'f02-vendor-market-trip', name: '完成一趟进货、赶集、摆摊、送货与回款', routes: ['subei-itinerant-market-vendor'], minAge: 15, spirit: 4, careerAction: true, delta: { body: 1, craft: 2, money: 2, network: 2, health: -1 }, contactEffects: { f02_vendor_coworker: { relation: 2 }, f02_vendor_customer: { relation: 1 } }, note: '每趟写清货主、路线、摊位、现钱、赊欠、损耗、未售货和回家时间。' },
    { id: 'f02-vendor-weather-credit-followup', name: '核天气、查验、坏货、熟客欠账与下一集', routes: ['subei-itinerant-market-vendor'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 3, network: 1 }, contactEffects: { f02_vendor_supervisor: { relation: 1 }, f02_vendor_customer: { relation: 1 } }, note: '没赶上、被退货、赊欠、换路线和停止往来分别结算，不用“生意不好”概括。' },
    { id: 'f02-stall-shop-day', name: '完成一天开摊、缝补修配、售货、盘点与结钱', routes: ['subei-market-stall-shopkeeper'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, money: 2, network: 1, health: -1 }, contactEffects: { f02_shop_coworker: { relation: 2 }, f02_shop_customer: { relation: 1 } }, note: '客户物件、待售货、合伙货、帮工工资和家用现金分别入账。' },
    { id: 'f02-stall-rent-stock-wage', name: '核摊租、库存、坏账、帮工工资与续租答复', routes: ['subei-market-stall-shopkeeper'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 2, position: 1 }, contactEffects: { f02_shop_supervisor: { relation: 1 }, f02_shop_coworker: { relation: 1 } }, note: '坐摊不等于拥有铺面；续租、登记、欠账、歇业和合伙退出逐项确认。' }
  );

  var sourceIds = ['SRC-F02-ZHENJIANG-CHAMBER', 'SRC-F02-SOCIAL-AFFAIRS', 'SRC-F02-FARMER-BANK', 'SRC-F02-FLOOD-1931', 'SRC-F02-HUAI-CONTROL'];
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

  installDecision({ id: 'subei-artisan-child-skill-1918', year: 1918, followYear: 1919, families: ['subeiartisans'], title: '逢集、送修件和识字班撞在同一上午时先学哪一件事', prompt: '父亲要送回吴长庚的犁铧，母亲要核针线货，小禾要去识字班。儿童只能选半日跟一处，其他人仍按自己的工作安排。', options: [
    option('f02-child-follow-repair', '跟父亲送修件，只记物件、旧损和收款人', { craft: 3, relation: 1 }, 'f02:child:repair', '1918 年第一次跟父亲完成一件修件交付。', '半袋杂粮与一笔欠项分别记下', '吴长庚先交半袋杂粮，余款写明到收割后；你没有替父亲答应下一件赊修。'),
    option('f02-child-follow-market', '跟母亲看摊，核货包、现钱和邻摊边界', { knowledge: 2, craft: 2, network: 1 }, 'f02:child:market', '1918 年第一次跟母亲核一趟集市货账。', '少掉的一包针找到经手人', '葛兰英逐笔核货，徐翠凤说明看见谁挪过货包；母亲自己决定是否继续交易，没有让父亲熟人含糊挂账。'),
    option('f02-child-literacy', '与小禾去短时识字班，另抄练习账', { knowledge: 4, mind: 2 }, 'f02:child:literacy', '1918 年与小禾开始学习数字、地名和简单账目。', '练习纸没有泄露真实欠账', '母亲另给废纸抄数字，真实客户姓名和欠项仍锁在货本里；识字增加了核账能力，没有直接换来工作。'),
  ] });
  installDecision({ id: 'subei-artisan-customer-debt-1920', year: 1920, followYear: 1921, families: ['subeiartisans'], title: '熟客拿不出播种前的修理款时怎样交付', prompt: '吴长庚急着取修好的工具，却只能拿出一点粮。客户的播种、父亲工钱和全家口粮都是真的，熟人关系不能替代结算。', options: [
    option('f02-debt-part-grain', '收一部分粮，列清余款和下一次核对日', { money: 1, relation: 2, knowledge: 1 }, 'f02:debt:grain', '1920 年以粮和延期方式结算一件修理。', '播种赶上，欠项仍有日期', '父亲交付修件，葛兰英把粮种类与余款分开；吴长庚在收割后给出第二次答复，没有被写成已经结清。'),
    option('f02-debt-labor-exchange', '由客户用两日具名劳力抵一部分，余款另记', { relation: 2, craft: 2, money: 1 }, 'f02:debt:labor', '1920 年以两日具名劳力抵一部分修理款。', '换工完成，双方没有互相占有劳力', '吴长庚只完成约定搬料与修棚两日，父亲核完即结束；母亲货摊没有因此欠他无期限人情。'),
    option('f02-debt-hold-item', '暂不交付，给出取件期限和另借工具的建议', { mind: 3, relation: -2, position: 1 }, 'f02:debt:hold', '1920 年因未结款暂缓交付修件。', '客户另借工具，关系变冷但责任清楚', '父亲保管修件并写明期限，吴长庚从邻户借工具播种；双方后来只按现钱往来，没有把拒绝赊账写成道德失败。'),
  ] });
  installDecision({ id: 'subei-artisan-path', year: 1924, followYear: 1925, families: ['subeiartisans'], title: '三份有试做、有负责人也可能落选的活里选哪一份', prompt: '曹二保的炉边、母亲与徐翠凤的两地赶集、镇上半个固定摊位都只给一次实际试做。先问清物件、工具、货源、工时、报酬和答复日。', options: [
    option('f02-repair-trial', '去曹二保处整理料头、看火并试修一件农具', { craft: 3, body: 1, money: 1 }, 'f02:path:repair', '1924 年进入有期限和试工费的农具修理试做。', '一次试修得到留用或延试答复', '男性较常先搬料看火，女性较常先清点、磨刃与接件；两者都按实际劳动领试工费，也都没有自动收徒。', { route: 'subei-village-tool-repairer' }),
    option('f02-vendor-trial', '跟母亲和徐翠凤跑两处集市，自己核一小批货', { craft: 2, network: 3, money: 1 }, 'f02:path:vendor', '1924 年进入有货主、路线和分账的流动小贩试做。', '两趟集市算出实收、损耗和未售货', '你只经手列明针线杂货，母亲和徐翠凤各保留自己的货与客户；女性更常进入针线缝补，男性更常兼挑运，但双方都能采购、售货和核账。', { route: 'subei-itinerant-market-vendor' }),
    option('f02-stall-trial', '试租半个摊位，兼做缝补、磨刃与小杂货', { craft: 2, knowledge: 2, money: 1 }, 'f02:path:stall', '1924 年进入有摊租、库存和收款边界的固定摊试做。', '半个摊位得到一个月续租答复', '徐翠凤只分租边角并各管货款，你核客户物件和每天实收；有熟客不等于拥有摊位，也没有把母亲货箱变成合伙资产。', { route: 'subei-market-stall-shopkeeper' }),
  ] });
  installDecision({ id: 'route-subei-village-tool-repairer-1929', year: 1929, followYear: 1930, routes: ['subei-village-tool-repairer'], title: '客户说修后仍不好用时怎样核返工责任', prompt: '农具旧损、客户继续使用、材料质量、你经手工序和曹二保复核都可能影响结果。返工不能直接写成学徒全赔或客户无理。', options: [
    option('f02-repair-inspect-old-damage', '当面复查旧损、修理处、试用和后来新增损坏', { craft: 3, mind: 2, relation: 1 }, 'f02:repair:inspect', '1929 年按工序核一件农具返工争议。', '确认一处返工和一处新增损坏', '你免费重做自己经手的一处，客户为新增破损付材料；曹二保只核他检查过的步骤。'),
    option('f02-repair-refund-labor-only', '退自己已收工钱，客户取回物件并另找人', { money: -2, mind: 2, position: -1 }, 'f02:repair:refund', '1929 年退还一件未达约定效果的修理工钱。', '退钱结束本单，没有交出全部工具', '客户取回物件和剩余材料，你只退自己收的工钱；曹二保的工具与铺内材料没有被拿走。'),
    option('f02-repair-second-review', '请另一名具名师傅复核一次再定赔付', { money: -1, network: 2, knowledge: 2 }, 'f02:repair:review', '1929 年请具名师傅复核返工责任。', '复核给出有限赔付与下次工序', '第二名师傅写清材料问题和一道漏做工序，你补工并分担一部分材料；复核不是永久担保。'),
  ] });
  installDecision({ id: 'route-subei-itinerant-market-vendor-1929', year: 1929, followYear: 1930, routes: ['subei-itinerant-market-vendor'], title: '连雨取消远集，一批针线杂货怎样处理', prompt: '货物仍属于列明货主，回程挑运、近村售卖、退货与坏损各有成本。不能把未卖出货直接算成全家损失。', options: [
    option('f02-vendor-near-village-sale', '改走近村逐户卖，只带不怕潮的一半货', { body: 1, network: 2, money: 1 }, 'f02:vendor:near', '1929 年改走近村完成一趟有限售货。', '卖出一半，另一半仍回原货主', '你核每件实收和未售货，母亲保留自己的缝补单；近村熟客没有自动成为固定客户。'),
    option('f02-vendor-return-stock', '按货主逐件退回，承担已发生的脚钱', { money: -1, mind: 2, relation: 1 }, 'f02:vendor:return', '1929 年因集市取消退回未售货。', '库存保住，脚钱成为本趟损失', '徐翠凤收回自己的货，葛兰英另存针线箱；你支付挑运脚钱，没有把损失塞进母亲账。'),
    option('f02-vendor-dry-and-wait', '租一晚干燥处保货，等下一次公开集日', { money: -2, craft: 2, position: 1 }, 'f02:vendor:wait', '1929 年租干燥处保存货物等待下一集。', '大部分货保住，下一集仍有查验', '房主写明一夜费用和物件数量；下一集照常核摊位与货源，没有因保存过夜取得仓房。'),
  ] });
  installDecision({ id: 'route-subei-market-stall-shopkeeper-1929', year: 1929, followYear: 1930, routes: ['subei-market-stall-shopkeeper'], title: '顾客把修理款交给合摊人后说已经付过，怎样结账', prompt: '修理、杂货、缝补和各自欠账在一个摊上同时发生。徐翠凤收到钱不等于丁家自动收到，也不该由关系值直接判断谁撒谎。', options: [
    option('f02-stall-same-day-reconcile', '当天让顾客、徐翠凤与你逐项核金额与用途', { knowledge: 2, relation: 2, mind: 2 }, 'f02:stall:reconcile', '1929 年当面核清一笔错交摊款。', '钱转到正确账本并留下收据', '徐翠凤说明收到的是油盐货款，顾客补清修理款；三方各自签一条，合摊没有把账合并。'),
    option('f02-stall-hold-separate-envelope', '暂收进独立信封，当日收摊后再核', { mind: 2, money: 1, relation: -1 }, 'f02:stall:envelope', '1929 年将一笔用途不明的钱暂存待核。', '收摊后确认一半属于修理', '你只取已确认部分，余款退回顾客；等待期间没有拿去进货或发工资。'),
    option('f02-stall-end-shared-cashbox', '取消共用钱匣，继续合租但各自收款', { relation: -2, knowledge: 3, position: 1 }, 'f02:stall:separate', '1929 年取消合摊共用钱匣。', '合作变冷，账目更可追溯', '你和徐翠凤仍分摊租位，却各自收钱、保货和处理欠账；她可以以后退出，不被写成背叛。'),
  ] });
  installDecision({ id: 'subei-artisan-market-break-1938', year: 1938, followYear: 1939, families: ['subeiartisans'], title: '熟悉集日中断、远村路线不安全时怎样接住工具、货与人', prompt: '已经修好的客户工具、母亲余货、父亲工具、小禾工作地址和伴侣打算都不同。家人可以分开行动，传闻、失联、受伤和死亡不能混写。', options: [
    option('f02-break-near-repair', '改走近村流动修理，逐件通知原客户取件处', { craft: 3, network: 1, money: -1 }, 'f02:break:near', '1938 年改走近村修理并重新登记客户地址。', '大部分修件交回，两件仍待主人消息', '父亲保留自有工具，母亲只带愿意同行的一小批货；未联系客户的修件列最后地址，没有当成无主物。', { warTurn: 'near-repair' }),
    option('f02-break-town-stall', '迁到镇上分租摊位，先核租处、货主和家人去向', { money: -3, position: 2, network: 2 }, 'f02:break:town', '1938 年迁到镇上分租摊位继续谋生。', '一家没有自动整队迁移', '母亲和小禾分别决定是否同行，父亲暂守工具与待取件；约定收信点，仍未知的人保留最后消息。', { warTurn: 'town-stall' }),
    option('f02-break-split-work', '一人进城试工，其余保住工具、余货和通信', { relation: 1, money: -2, mind: 3 }, 'f02:break:split', '1938 年家人按条件分开工作并约定核信办法。', '两处生活各有地址和责任', '进城者只得到一次试工，留乡者逐件保管工具和货；同行与留下都是个人答复，没有自动团聚或失联补死。', { warTurn: 'split-work' }),
  ] });
  installDecision({ id: 'route-subei-village-tool-repairer-1946', year: 1946, followYear: 1947, routes: ['subei-village-tool-repairer'], title: '战后继续受薪、独立坐摊还是组织有限修配作坊', prompt: '曹二保的炉具、父亲工具、客户修件和你自己买下的工具仍属不同主体。经营必须先列工资、材料债、客户责任和退出。', options: [
    option('f02-repair-remain-waged', '继续受薪修理，按件核工资与工具归还', { money: 2, health: 1, craft: 2 }, 'f02:repair:waged', '1946 年继续做有工单和工资答复的受薪修理。', '经验没有自动变成铺面和炉具', '你减少最重锤击，仍按件修农具；曹二保保留炉具，父亲保留自家工具。'),
    option('f02-repair-independent-bench', '只用自有工具租一张修理台，逐件接单', { money: -2, craft: 3, position: 1 }, 'f02:repair:bench', '1946 年建立不雇人的独立修理台。', '第一年只接熟客小件并承担返工', '租台、工具、材料和客户件逐件登记；没有借曹二保名义或占用父亲全部工具。', { enterpriseStart: { id: 'f02-independent-repair-bench', name: '苏北合成守成修理台', domainKey: 'D43', kind: 'bounded-independent-repair-bench', workplace: '苏北合成镇集分租修理台', product: '按旧损、材料、工时、试用与返工范围修理的农具和生活器具', employees: 0, asset: { id: 'f02-bench-tools', kind: 'documented-personal-repair-tools', description: '主角自己购置并逐件登记的锤、钳、锉和磨具' }, license: { id: 'f02-bench-record', kind: 'documented-small-repair-record', authority: '合成镇集公开经手人', scope: '只限公开民用器具修理，不含铺面产权或他人工具' } } }),
    option('f02-repair-limited-workshop', '与一名同事按工具和劳动份额开有限修配作坊', { money: -5, craft: 3, network: 2 }, 'f02:repair:workshop', '1946 年建立有雇员、工具份额和退出边界的有限修配作坊。', '作坊首年只有两名雇员', '两名雇员按月领薪，同事只投入列明工具，你投入现金和劳动；材料债、客户返工与退伙分别记录。', { enterpriseStart: { id: 'f02-limited-repair-workshop', name: '苏北合成成桂农具修配作坊', domainKey: 'D43', kind: 'bounded-rural-repair-workshop', workplace: '苏北合成镇集修配小间', supplier: '两家具名铁料与木料供货人', product: '有工单、试用、返工和交付记录的农具与生活器具修配', employees: 2, partners: [{ personId: 'contact:f02_repair_coworker', role: '有限自有工具与劳动合伙人' }], asset: { id: 'f02-workshop-tools', kind: 'documented-partner-repair-tools', description: '按所有人列明的修理工具、磨台与工作台' }, debt: { id: 'f02-workshop-material-credit', creditor: '具名材料供货人', purpose: '首批材料、房租与雇员工资' }, license: { id: 'f02-workshop-record', kind: 'documented-rural-workshop-record', authority: '合成镇集公开经手人', scope: '只限民用修配，不含旧铁匠铺产权或公共权力' } } }),
  ] });
  installDecision({ id: 'route-subei-itinerant-market-vendor-1946', year: 1946, followYear: 1947, routes: ['subei-itinerant-market-vendor'], title: '战后继续流动、固定一处摊位还是组织有限合运', prompt: '旧路线、货源、集日和查验都在重接。多年赶集经验能换客户，却不能让你取得母亲货箱、徐翠凤摊位或同行者货物。', options: [
    option('f02-vendor-keep-mobile', '继续走两处已确认集市，每趟独立分账', { money: 2, network: 2, health: -1 }, 'f02:vendor:mobile', '1946 年继续做逐趟结算的流动小贩。', '路线恢复一处，另一处仍不稳定', '你只带能确认货源的一批货，写清脚钱、损耗与实收；母亲决定自己的货是否同行。'),
    option('f02-vendor-fixed-stall', '固定一处小摊，保留另一条路线为季节送货', { money: -3, position: 2, network: 1 }, 'f02:vendor:fixed', '1946 年分租一处固定小摊并保留季节送货。', '固定摊位仍按期续租', '你核租期、货主和每天实收，徐翠凤另管自己的油盐货；熟客不能替代登记与租金。'),
    option('f02-vendor-limited-haul-coop', '与母亲、徐翠凤按各自货物和劳动组织有限合运', { money: -4, relation: 3, network: 2 }, 'f02:vendor:coop', '1946 年建立有两名雇员和三方份额的有限集市合运社。', '合运首年只跑两条公开路线', '两名雇员按趟领薪，三方货物、现金和劳动分别记份额；坏货、退货、停止路线和退伙各自结算。', { enterpriseStart: { id: 'f02-market-haul-coop', name: '苏北合成兰凤集市合运社', domainKey: 'D45', kind: 'bounded-rural-market-haul-cooperative', workplace: '苏北合成两处集市与公开寄货点', supplier: '具名针线杂货与油盐货主', product: '有货主、路线、脚钱、损耗、实收与退回记录的有限集市合运', employees: 2, partners: [{ personId: 'contact:f02_ge_lanying', role: '独立针线货与缝补劳动合伙人' }, { personId: 'contact:f02_xu_cuifeng', role: '独立油盐货与路线劳动合伙人' }], asset: { id: 'f02-haul-baskets', kind: 'documented-market-baskets-and-covers', description: '三方分别列明的货筐、防雨布与称具' }, debt: { id: 'f02-haul-working-credit', creditor: '具名货主与脚夫', purpose: '首批货款、脚钱与雇员工资' }, license: { id: 'f02-haul-record', kind: 'documented-market-haul-record', authority: '合成两处集市公开经手人', scope: '只限列明货物和公开路线，不含垄断摊位或他人库存' } } }),
  ] });
  installDecision({ id: 'route-subei-market-stall-shopkeeper-1946', year: 1946, followYear: 1947, routes: ['subei-market-stall-shopkeeper'], title: '战后固定摊与小店怎样继续而不吞掉家人和合伙人财物', prompt: '母亲货箱、徐翠凤库存、客户待修物、帮工工资和铺租都要单列。开店不等于盈利，也不等于一家人无偿工作。', options: [
    option('f02-shop-remain-stall', '继续分租固定摊，按日盘点和结工资', { money: 2, knowledge: 2, health: 1 }, 'f02:shop:stall', '1946 年继续经营按期续租的固定摊。', '摊位保住，帮工仍按日领钱', '你只售自有货并接列明修配，母亲和徐翠凤各收自己的钱；没有因同摊取得全部客户。'),
    option('f02-shop-family-separate-ledgers', '与母亲同处经营，但货、钱、客户和工时分别记', { money: -2, relation: 3, craft: 2 }, 'f02:shop:family', '1946 年与母亲在同一小店分账经营。', '同处生活没有合并产权', '母亲保留货箱和缝补客户，你保留修配和杂货库存；相互帮忙按工时结，任何一方都可减少工作或退出。'),
    option('f02-shop-limited-partnership', '与徐翠凤、小禾建立有限修配杂货小店', { money: -5, relation: 2, network: 2 }, 'f02:shop:partnership', '1946 年建立有三名雇员、三方份额和歇业边界的小店。', '小店首年登记三名雇员和有限库存', '三名雇员按月领薪，徐翠凤、小禾与你各自列明现金、库存与劳动份额；供货债、客户物件、租约与退出分别记录。', { enterpriseStart: { id: 'f02-repair-goods-shop', name: '苏北合成翠禾修配杂货小店', domainKey: 'D44', kind: 'bounded-rural-repair-goods-shop', workplace: '苏北合成镇集分租小店', supplier: '具名杂货、针线与修理材料供货人', product: '有进货、盘点、客户物件、修配、现钱、赊欠与退货记录的小店服务', employees: 3, partners: [{ personId: 'contact:f02_xu_cuifeng', role: '独立油盐库存与售货劳动合伙人' }, { personId: 'contact:f02_ding_xiaohe', role: '独立记账、采购与客户答复合伙人' }], asset: { id: 'f02-shop-stock-tools', kind: 'documented-shop-stock-and-tools', description: '三方分别列明的库存、修理工具、货架与钱匣' }, debt: { id: 'f02-shop-supplier-credit', creditor: '具名供货人', purpose: '首批库存、租金与雇员工资' }, license: { id: 'f02-shop-record', kind: 'documented-rural-shop-record', authority: '合成镇集公开经手人', scope: '只限列明杂货、缝补与民用修配，不含铺面产权或他人客户' } } }),
  ] });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({ id: id, title: title, text: text, families: ['subeiartisans'], priority: 12, sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review' }, extra || {}));
  }
  var allRoutes = ['subei-village-tool-repairer', 'subei-itinerant-market-vendor', 'subei-market-stall-shopkeeper'];
  scene('f02-s01', '沾泥农具和针线货箱不能堆在一起', '丁守义把客户农具放在门外干处，葛兰英把针线货箱移远；二人争的是雨水、锈损和谁赔，不是抽象家庭关系。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f02-s02', '半袋杂粮只抵一部分修理款', '吴长庚取件时先交杂粮，父亲说清余款，母亲把粮的种类和客户欠项分别记下。', { minAge: 4, maxAge: 7, priority: 23 });
  scene('f02-s03', '少一包针先核经手人', '收摊少货时，葛兰英逐笔点数，徐翠凤说明相邻摊发生什么；父亲一句“熟人拿了”不能结母亲的账。', { minAge: 5, maxAge: 9, priority: 23 });
  scene('f02-s04', '逢集、送件和识字班撞在同一上午', '你只能跟一处学习，父母和小禾各自安排剩下的事；第一次入口不会锁死成年职业。', { minAge: 6, maxAge: 10, priority: 22 });
  scene('f02-s05', '练习账与真实客户账分开', '小禾用另抄纸练数字，客户姓名、修件和欠项仍由父母保管；识字不是取得客户隐私的许可。', { minAge: 9, maxAge: 13, priority: 22 });
  scene('f02-s06', '连雨让远集取消，近村却催修农具', '父母分别提出保货与赶修方案，你只能排具体两日轮次；未售货和待修件分别保存。', { minAge: 10, maxAge: 14, priority: 22 });
  scene('f02-s07', '母亲发热眩晕时由她决定是否停工', '求医、复诊、药钱、远集订单、替班和一把坏钳分别安排；照料不能替葛兰英决定继续赶集。', { minAge: 11, maxAge: 18, priority: 22 });
  scene('f02-s08', '三份试做都有负责人、物件、工时和答复日', '曹二保的炉边、两地赶集和半个摊位分别给实际任务；认识人只能到门口，次年必须结算留用、延试或落选。', { year: 1924, routes: allRoutes, priority: 31 });
  scene('f02-s09', '第一份工作终于说清给谁做、做什么、怎样收钱', '你知道工具或货物属于谁、谁检查、谁同行、谁是客户、当天实收多少和下一步是什么。', { year: 1925, routes: allRoutes, priority: 29 });
  scene('f02-s10', '返工回到旧损、材料、工序和试用', '客户说不好用时，师傅、同事和你只说明各自经手段；赔付按确认责任，不把学徒或客户一方全部定罪。', { minAge: 15, maxAge: 55, routes: ['subei-village-tool-repairer'], priority: 22 });
  scene('f02-s11', '每一趟赶集都有货主、路线、天气和未售货', '改道、查验、受潮、赊账与退回逐件结算；走得远不等于货属于你，熟客也不保证下一集出现。', { minAge: 15, maxAge: 55, routes: ['subei-itinerant-market-vendor'], priority: 22 });
  scene('f02-s12', '同摊不等于同账', '修理款、杂货款、缝补件、合伙库存、摊租和帮工工资各有经手；一只共用钱匣不能抹掉所有人。', { minAge: 15, maxAge: 55, routes: ['subei-market-stall-shopkeeper'], priority: 22 });
  scene('f02-s13', '小禾收到自己的铺内短工答复', '她核工时、工资、住处与下一次答复，家里只能说明困难，不能替她拒绝、结婚或承担终身照料。', { minAge: 16, maxAge: 27, priority: 21 });
  scene('f02-s14', '婚后争吵的是债、货、工具、双方父母和赶集时间', '你与伴侣可以分账同住、近处分居、共同核债或暂不合伙；婚姻不会自动合并生意和照料。', { minAge: 20, maxAge: 43, priority: 20 });
  scene('f02-s15', '父亲想教小禾，外姓年轻人也来问学徒', '两人能投入的时间和未来打算不同，父亲只教自己会的部分；家业不按性别继承，学徒也有退出权。', { minAge: 25, maxAge: 50, priority: 20 });
  scene('f02-s16', '疾病会让具体订单和路线停下来', '伤手、腰痛、眼病、发热或长期咳嗽发生时，检查、药钱、未交修件、坏货、替班和复工日逐项确认。', { minAge: 18, maxAge: 62, priority: 20 });
  scene('f02-s17', '朋友、师傅、摊主和熟客会换工作与离开', '曹二保可能停炉，徐翠凤会拆伙，吴长庚会迁走；关系能留下消息，不能把任何人当永久工具、顾客或贷款担保。', { minAge: 18, maxAge: 65, priority: 19 });
  scene('f02-s18', '市场身份与政治组织分开', '商会、合作、救济、识字和公开职业介绍可能进入生活；有摊位、参加一次合作或帮人代写，不自动生成党籍、秘密身份或道德标签。', { minAge: 18, maxAge: 48, priority: 19 });
  scene('f02-s19', '1931 年洪水先改变路、货、工具、饮水和疾病', '集市是否开、哪段路能走、客户修件在哪里、家人最后所在和救济答复分别确认；受灾不等于全家同一种命运。', { year: 1931, priority: 38 });
  scene('f02-s20', '1938 年逐件收回修件、余货和联系人地址', '集日与路线中断后，父母、小禾、伴侣、客户和合作者逐人决定留、走、试工或等待；没有消息的人保留最后已知状态。', { year: 1938, priority: 38 });
  scene('f02-s21', '1945 年先核铺摊、货源、职业介绍和救济答复', '战争结束没有自动恢复旧集市、客户和住处；每项申请都可能收件、缺件、等待、获准或被拒。', { year: 1945, priority: 36 });
  scene('f02-s22', '1949 是工具、货账、铺摊与家口的中段回收', '系统列父母、小禾、伴侣、当前工作、工具所有人、库存、债务、租位与未知客户消息，再进入八种后半生去向。', { year: 1949, routes: allRoutes, priority: 40 });
  scene('f02-s23', '父亲减少重锤，母亲减少远集但仍决定自己的东西', '丁守义可做磨刃轻修，葛兰英可接近处缝补；二人分别安排工具、货箱、医药、住处和是否交接。', { minAge: 45, maxAge: 70, priority: 19 });
  scene('f02-s24', '死亡不自动结清工具、货账、客户物件和铺租', '父母、师傅、摊主、熟客、伴侣或主角去世后，发生、知情、确认、未交件、欠账、库存、工资和未知消息分别处理。', { minAge: 55, priority: 18 });

  C.annualRhythms['subei-village-tool-repairer'] = [
    '每天先核客户旧损、材料、工具所有人、工序、试用、返工、工钱和交付日；会修不等于拥有客户物件或师傅炉具。',
    '男性较常先搬料看火，女性较常先接件清点与磨刃；实际劳动与能力逐项记录，双方都能继续学艺、带徒、坐摊或退出。',
    '受薪、独立修理台与有限作坊都可能停炉、欠料、受伤或歇业；开门营业不是成功结局。',
  ];
  C.annualRhythms['subei-itinerant-market-vendor'] = [
    '每趟写货主、路线、天气、摊位、查验、现钱、赊账、损耗和未售货；流动经营不是一句赶集，也不保证固定熟客。',
    '母亲、同行摊主、脚夫和主角各管自己的货、钱、劳动与去留；一家人同行不合并产权。',
    '战后可继续流动、固定摊位或有限合运，仍要处理雇员工资、坏货、债务、登记、停线和退伙。',
  ];
  C.annualRhythms['subei-market-stall-shopkeeper'] = [
    '开摊先核租期、库存、客户物件、修配、实收、赊欠和帮工工资；同摊不等于同账。',
    '母亲、徐翠凤、小禾和伴侣保留自己的货、工具、工资、客户与退出决定，不是默认免费帮工。',
    '固定摊与小店可能续租、搬迁、合伙、拆伙、歇业或改行；有店名不等于盈利和安稳。',
  ];
  C.sceneFrames.subeiartisans = [
    { open: '天亮后，客户修件、父亲工具、母亲货箱、赶集路线、欠账和家里药钱同时等着处理。', close: '今天只完成一件修理、一趟集或一项家事；谁拥有、谁经手、谁收钱、谁等待和哪些仍未知分别留下。' },
    { open: '堤乡到集市的路受天气和时局影响，师傅、摊主、熟客与家人各自先顾自己的工作、物件和亲人。', close: '你得到具体结果，也承担钱、身体、关系或岗位代价；会手艺和认识人都只让下一步更清楚。' },
  ];
  C.sceneFrames['subei-village-tool-repairer'] = C.sceneFrames.subeiartisans;
  C.sceneFrames['subei-itinerant-market-vendor'] = C.sceneFrames.subeiartisans;
  C.sceneFrames['subei-market-stall-shopkeeper'] = C.sceneFrames.subeiartisans;

  C.parentProfiles.subeiartisans = {
    mother: { name: '葛兰英', born: 1886, occupation: '赶集卖针线并替人缝补，保留货箱、客户、回款与停赶远集的决定', deathAgeBase: 75, activities: ['核针线货、客户衣物、现钱、赊账、进货和自己的收入', '自己决定远集、近村售货、合摊、病休或停止接单', '晚年减少远集但保留近处缝补、旧客与货箱交接'], words: ['“你爹的熟人，不等于能挂我的货账。”', '“同一个摊位，也要说清谁的货、谁收的钱。”', '“我少走远路，不等于货箱和旧客自动给你。”'] },
    father: { name: '丁守义', born: 1883, occupation: '挑工具走村修农具，只核自己经手的修件、工具和工钱', deathAgeBase: 76, activities: ['核客户旧损、材料、工序、试用、返工和交付', '逐件保管客户物件并拒绝替未知损坏认账', '晚年减少重锤，保留磨刃轻修和工具所有权'], words: ['“客户的犁是客户的，我的钳是我的，修过也不能混。”', '“曹师傅给你试工，不等于收徒。”', '“我能教你手艺，不能把别人的铺和工具传给你。”'] },
  };
  C.spouseProfiles.subeiartisans = {
    男: { name: '韩月贞', bornOffset: 1, occupation: '缝补、售货与识字代写劳动者，保留自己的客户、工资和父母照料', values: '同住前要谈清债务、货物、工具、赶集时间和双方父母，不接受成为免费帮摊人' },
    女: { name: '周桂生', bornOffset: -1, occupation: '农具修理与短途送货人，按工单领钱并照料自己的母亲', values: '愿意分担家务和照料，不把妻子的货款、摊位、客户、工具或迁移决定据为己有' },
  };
  C.childNames.subeiartisans = ['丁禾安', '丁路宁'];

  var repairBase = { kind: 'rural-tool-repair', role: '走村农具修理、铁匠学徒与坐摊修配人', workplace: '苏北合成运河堤乡、曹二保修理铺与镇集修配摊', employer: '合成铁匠曹二保或自营有限修理台', supervisor: '铁匠曹二保', colleague: '修理同事郑桂芳', publicPerson: '送来犁铧并等待试用答复的农户吴长庚', terms: '按件或按月结算；旧损、材料、工具、工序、试用、返工、工钱、伤病与交付分别记录', duties: '检查、拆修、磨刃、试用与交付农具和生活器具，逐件归还工具并说明返工范围', scenes: ['吴长庚送来犁铧，你先写旧损和取件日。', '郑桂芳发现材料不合，停工等曹二保复核。', '客户试用后提出返工，你只承担自己经手的部分。'] };
  var vendorBase = { kind: 'itinerant-rural-market-vendor', role: '流动针线杂货、两地赶集与送货小贩', workplace: '苏北合成两处集市、沿路村庄与公开寄货点', employer: '自营或与具名货主逐趟分账', supervisor: '货主与路线经手人徐翠凤', colleague: '同行挑货售货人赵月梅', publicPerson: '在两处集市购买针线杂货并可能赊账的熟客孙嫂', terms: '逐趟结算；货主、路线、摊位、脚钱、查验、现钱、赊账、损耗、未售货和退回分别记录', duties: '核货源、挑运、摆摊、售货、送货、回款与退货，不把同行和家人的货写成自己的', scenes: ['孙嫂只付一半货款，你写明余款和下次集日。', '赵月梅改走近村，你们分开核脚钱和货物。', '连雨取消远集，你按货主退回未售货。'] };
  var shopBase = { kind: 'rural-market-stall-and-shop', role: '固定摊、乡村小店与缝补修配经营者', workplace: '苏北合成镇集分租摊位与小店', employer: '自营或有限合伙小店', supervisor: '摊位出租经手人与合伙人徐翠凤', colleague: '记账采购同事丁小禾', publicPerson: '送来缝补件、修配物与购买杂货的顾客马婶', terms: '按日盘点；租期、库存、客户物件、实收、赊账、工资、供货债、登记、歇业与退出分别记录', duties: '开摊、售货、接缝补修配、盘点、结工资与答复客户，不混用合伙库存和家人收入', scenes: ['马婶交来衣物和一件小修配物，你分别开收件条。', '丁小禾核出一笔错账，三方当日对清。', '续租只批三个月，你重新安排库存和帮工。'] };
  C.routeCareerProfilesByGender['subei-village-tool-repairer'] = {
    男: Object.assign({}, repairBase, { role: '炉边搬料、看火、锤修与走村交付学徒', duties: '较常先承担重件和远路，也必须核工具、工钱、伤病与返工，不自动成为师傅或铺主' }),
    女: Object.assign({}, repairBase, { role: '接件清点、磨刃、零件修配与坐摊交付手艺人', duties: '在时代岗位限制下较常从清点与轻修进入，可继续学习锤修和带徒；岗位限制不作能力惩罚' }),
  };
  C.routeCareerProfilesByGender['subei-itinerant-market-vendor'] = {
    男: Object.assign({}, vendorBase, { role: '挑运、采购、两地赶集与送货小贩', duties: '较常兼远路挑运，也逐件核货主、实收、赊账和损耗，不因体力取得同行货物' }),
    女: Object.assign({}, vendorBase, { role: '针线杂货、缝补、两地赶集与送货小贩', duties: '较常从针线缝补与近身售货进入，也能采购、核账和组织合运；全部劳动计酬' }),
  };
  C.routeCareerProfilesByGender['subei-market-stall-shopkeeper'] = {
    男: Object.assign({}, shopBase, { role: '修配、采购、盘点与固定摊经营者', duties: '较常兼采购和修配，也必须核合伙份额、客户物件、工资与供货债，不自动成为掌柜' }),
    女: Object.assign({}, shopBase, { role: '缝补修配、售货、盘点与固定摊经营者', duties: '在摊位和家庭劳动夹缝中承担密集客户工作，所有劳动计薪，且可成为独立经营或合伙人' }),
  };

  Object.assign(C.routeContactProfiles, {
    'subei-village-tool-repairer': [
      { id: 'f02_repair_supervisor', label: '曹二保', role: '按炉火、材料、工序、试工、工资和返工安排修理的师傅', status: 'supervisor', relation: 22, born: 1878 },
      { id: 'f02_repair_coworker', label: '郑桂芳', role: '有自己的工资、工具、伤病休工与成家决定的修理同事', status: 'coworker', relation: 28, born: 1907 },
      { id: 'f02_repair_customer', label: '吴长庚', role: '送来农具并等待试用、返工和结算答复的农户客户', status: 'nearby', relation: 23, born: 1888 },
    ],
    'subei-itinerant-market-vendor': [
      { id: 'f02_vendor_supervisor', label: '徐翠凤', role: '核货主、路线、摊位、脚钱、实收与退货的独立摊主', status: 'supervisor', relation: 25, born: 1887 },
      { id: 'f02_vendor_coworker', label: '赵月梅', role: '按趟领钱并保留自己货物、女儿照料与路线决定的同行小贩', status: 'coworker', relation: 29, born: 1906 },
      { id: 'f02_vendor_customer', label: '孙嫂', role: '购买针线杂货并需要真实赊账与退货答复的两地熟客', status: 'nearby', relation: 21, born: 1892 },
    ],
    'subei-market-stall-shopkeeper': [
      { id: 'f02_shop_supervisor', label: '徐翠凤', role: '只分租摊位并按各自货、钱和欠账核合伙边界的摊主', status: 'supervisor', relation: 24, born: 1887 },
      { id: 'f02_shop_coworker', label: '丁小禾', role: '有自己的工资、采购、住处与婚或不婚决定的记账同事和手足', status: 'coworker', relation: 31, born: 1908 },
      { id: 'f02_shop_customer', label: '马婶', role: '送来缝补修配物并购买杂货、等待收件和交付答复的顾客', status: 'nearby', relation: 21, born: 1890 },
    ],
  });
  Object.assign(C.healthProfiles, {
    'subei-village-tool-repairer': ['重锤、久站、走村和旧伤造成的手腕肩背膝痛', '炉烟、铁屑与磨刃粉尘造成的咳嗽和眼鼻不适', '返工、材料债、客户催件与伤手停工造成的胃痛失眠'],
    'subei-itinerant-market-vendor': ['长期挑担、步行和天气暴露造成的腰膝足伤', '雨淋、饮水与人群接触造成的反复发热和肠胃不适', '坏货、查验、欠账、路线中断与家人分散造成的焦虑失眠'],
    'subei-market-stall-shopkeeper': ['久坐久站、缝补和修配造成的肩颈手指与眼部劳损', '集市人群、潮湿库存与饮食不规律造成的咳嗽和胃肠不适', '铺租、供货债、坏账、帮工工资与合伙争议造成的胃痛失眠'],
  });
  Object.assign(C.publicRouteProfiles, {
    'subei-village-tool-repairer': { publicGroup: '合成的修件、欠工、伤手与公开职业互助簿', publicRole: '核公开工单、返工、工资、伤病和客户交付答复', covertRole: '手艺和走村路线不自动形成秘密资格；另经政治选择也不得借客户物件传递未知内容', infiltrationRole: '不提供破坏、藏匿、规避查验或秘密运输教程，公开职业与高风险事务严格分开', contact: { id: 'public_f02_repair', label: '许守平', role: '登记手艺人欠工、伤病与客户纠纷答复的公开互助经手人', status: 'colleague', relation: 19, born: 1895 } },
    'subei-itinerant-market-vendor': { publicGroup: '合成的集市路线、货损、失所与公开救济登记簿', publicRole: '核公开集日、货损、失所、救济与职业介绍答复', covertRole: '熟悉路线不自动生成卧底、联络员或秘密身份；高风险事务必须另经选择且保留拒绝与退出', infiltrationRole: '不把顾客、货物、住址和脚夫变成默认情报来源，不提供现实可复用的隐蔽方法', contact: { id: 'public_f02_vendor', label: '林月香', role: '登记集市货损、失所、救济和职业介绍答复的公开经手人', status: 'colleague', relation: 20, born: 1897 } },
    'subei-market-stall-shopkeeper': { publicGroup: '合成的摊租、劳资、供销与公开合作答复簿', publicRole: '核公开摊租、工资、供货、失业登记和合作事务答复', covertRole: '有摊位、参加合作或认识商会经手人不自动生成党籍与秘密权限', infiltrationRole: '不以顾客账、合伙库存或职员名册提供现实隐蔽教程，申请与正式身份分开', contact: { id: 'public_f02_shop', label: '周文秀', role: '登记摊租、工资、供货与公开合作答复的基层经手人', status: 'colleague', relation: 20, born: 1894 } },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('manual', 'subei-village-tool-repairer');
  addRouteToTrack('trade', 'subei-itinerant-market-vendor');
  addRouteToTrack('trade', 'subei-market-stall-shopkeeper');

  C.events.push(
    { id: 'jiangsu-rural-finance-attempt-1928', year: 1928, eraBrief: true, eraScope: '江苏农村金融与合作尝试', families: ['subeiartisans'], title: '农村金融与合作机构开始出现，但覆盖和能力有限', knownThrough: ['newspaper', 'conversation', 'books'], delta: { knowledge: 1, network: 1 }, knownText: '你知道江苏出现面向农村金融与合作事业的制度尝试；实际申请仍要核机构、担保、用途、答复与还款，认识人或听见政策不等于拿到贷款。', unknownText: '集市先传来“可以借钱办合作”的说法，你只能确认本地有没有经手人、是否收件和何时答复；没有把传闻直接写成到账。', fact: '1927 年后江苏出现农村金融与合作事业的制度尝试，但覆盖与实际能力有限。', historySource: { label: '江苏省档案馆：江苏省农民银行档案', url: 'https://www.dajs.gov.cn/art/2022/11/17/art_123_9709.html' } },
    { id: 'f02-jianghuai-flood-1931', year: 1931, eraBrief: true, eraScope: '江淮洪灾与苏北生活', families: ['subeiartisans'], title: '江淮洪灾中断道路、集市、农作与清洁饮水', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { money: -4, health: -3, position: -2 }, knownText: '你知道江淮大水广泛影响江苏等地的交通、农作、市场、疾病与救济；每件客户工具、每批货和每名家人的状态仍按所在地核实。', unknownText: '水先漫到路、井和集市，你只知道哪段路断、哪些货受潮、谁最后在哪儿；更大范围要等报纸或返乡人说明。', fact: '1931 年江淮洪灾广泛影响江苏等地的交通、农作、市场、疾病与救济。', historySource: { label: '华东师范大学中国现代城市研究中心：1931 年江淮大水研究', url: 'https://www.clhm.ecnu.edu.cn/_upload/article/files/a2/f8/6ac640fa4f5f9ab0b4b51bd1a6f9/c383ccb3-4f2f-49a2-bb00-2192483032b1.pdf' } },
    { id: 'jiangsu-postwar-social-supply-1946', year: 1946, eraBrief: true, eraScope: '江苏战后劳资、救济与合作供销', families: ['subeiartisans'], title: '战后职业介绍、合作供销、物资运销与救济重新组织', knownThrough: ['newspaper', 'conversation', 'books'], delta: { network: 1, knowledge: 1, money: -1 }, knownText: '你知道战后江苏档案中出现失业登记、职业介绍、合作供销、物资运销、劳资处理与灾害救济；每项申请仍有收件、缺件、等待和实际答复。', unknownText: '集市先出现新登记表、供货口风和职业介绍消息，你只确认本地经手人和自己的答复；不能把全省制度写成本乡同步完成。', fact: '1945—1949 年江苏战后社会行政涉及职业介绍、合作供销、物资运销、劳资处理与灾害救济。', historySource: { label: '江苏省档案馆：民国江苏省社会处档案介绍', url: 'https://www.dajs.gov.cn/art/2022/6/14/art_321_40996.html' } },
    { id: 'subei-huai-control-1951', year: 1951, eraBrief: true, eraScope: '苏北治淮工程与地方生活', families: ['subeiartisans'], post1949Choices: ['mainland'], title: '治淮工程改变堤工、运输、市场路线与乡村劳务', knownThrough: ['newspaper', 'conversation', 'books'], delta: { network: 1, position: 1, health: -1 }, knownText: '你知道苏北治淮进入制度化建设阶段，堤工、运输、修配和物资供应出现新的公开劳务；参加一段工作仍须核岗位、工资、工具、伤病和结束日期。', unknownText: '你先看到工地招短工、路线上出现新物资和修理需求；工程全貌、编制与长期影响要等公开通知和实际经历。', fact: '1951 年苏北治淮工程进入制度化建设阶段并改变地方劳务、运输与生活。', historySource: { label: '江苏省档案馆：治淮的超级工程', url: 'https://www.dajs.gov.cn/art/2021/9/1/art_170_1619.html' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
