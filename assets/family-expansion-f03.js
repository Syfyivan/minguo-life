// 民国人生 · F03 江南佃作、蚕桑与缫丝家庭运行时包 v0.7.16
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f03.js');

  C.version = '0.7.16';
  C.familyDecisionKeys.jiangnansilkwater = { path: 'jiangnan-silk-path', war: 'jiangnan-silk-war-break-1937' };
  Object.assign(C.designRegistry.families.F03, {
    designStatus: 'runtime-reviewed-first-round', runtimeStatus: 'playable-verified', runtimeFamilyKey: 'jiangnansilkwater',
  });
  C.runtimeFamilyDesignMap.jiangnansilkwater = 'F03';
  Object.assign(C.legacyRouteDomainMap, {
    'jiangnan-tenant-water-farmer': 'D01',
    'jiangnan-sericulture-silk-household': 'D03',
    'jiangnan-silk-reeling-mill-worker': 'D07',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F03-WUXI-SILK': {
      label: '无锡市档案史志馆：无锡的丝茧业',
      url: 'https://daj.wuxi.gov.cn/doc/2015/12/31/2424865.shtml',
      supports: ['无锡农村长期存在栽桑养蚕、土丝出售、茧行收购与丝厂需求；家庭养蚕、茧行报价和工厂岗位必须分开'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F03-WUXI-MILLS': {
      label: '无锡市档案史志馆：南下塘的“丝都”传奇',
      url: 'https://daj.wuxi.gov.cn/doc/2015/06/15/2425419.shtml',
      supports: ['民国无锡机器缫丝厂具有具体厂房、丝车、工人和生产规模；入厂劳动不等于取得厂产或稳定终身岗位'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F03-WARTIME-LOSS': {
      label: '无锡市档案史志馆：抗日战争时期无锡县民族工业损失情况',
      url: 'https://daj.wuxi.gov.cn/doc/2015/06/28/2427436.shtml',
      supports: ['1937 年后无锡丝厂、织厂、仓库、设备与生产能力遭到严重破坏；合成角色只经历其工作地能够确认的停工、迁移和财物损失'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F03-SUZHOU-FLOOD': {
      label: '苏州工业园区档案管理中心《唯亭镇志》自然灾害',
      url: 'https://www.sipac.gov.cn/szdaglzx/yqfzwtzz/202102/1fda771f36fb48e38bb25f5452dd4095.shtml',
      supports: ['苏州水网地区在 1931 年发生大洪涝、1934 年发生大旱，田地、街道、水位、交通和收成都受具体影响'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F03-SUZHOU-WATER': {
      label: '苏州工业园区档案管理中心《胜浦镇志》水利',
      url: 'https://www.sipac.gov.cn/szdaglzx/yqfzspzz/202102/5bcb43d447464935b31b17cf20b7a134.shtml',
      supports: ['新中国成立前当地排灌能力有限，1950 年代以后水利工程逐步改变劳务、圩堤、排灌和土地生活；不能把一次出工写成工程产权'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F03-FARMER-BANK': {
      label: '江苏省档案馆：江苏省农民银行档案',
      url: 'https://www.dajs.gov.cn/art/2022/11/17/art_123_9709.html',
      supports: ['1927 年后江苏出现面向农村金融与合作事业的制度尝试，但覆盖和振兴作用有限；申请、熟人和章程不等于实际获贷'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F03-SILK-ARCHIVE': {
      label: '江苏省档案馆：苏州中国丝绸档案馆开馆介绍',
      url: 'https://www.dajs.gov.cn/art/2023/6/9/art_40_7458.html',
      supports: ['近现代苏州丝绸档案保存百余年工商业、企业与贸易记录；合成工厂、工人和账册不得冒充真实企业档案'],
      status: 'source-reviewed-first-round',
    },
  });

  C.families.jiangnansilkwater = {
    key: 'jiangnansilkwater', name: '江南佃作与蚕桑副业家', born: 1910,
    place: '江南合成水网乡、镇上茧行与丝厂通勤线之间', defaultSeed: 310,
    defaultNames: { 男: '顾守田', 女: '顾春兰' },
    motif: '一块佃田、一轮水次、一间蚕房、母亲的蚕具与丝款、茧行报价和丝厂工票分属不同关系；住在水乡不等于富足，养过蚕也不等于拥有桑田、丝厂或稳定市场。',
    start: { body: 45, knowledge: 27, craft: 38, mind: 42, network: 30, fame: 10 },
    startRes: { money: 9, health: 76, relation: 70, position: 17 },
    subjects: {
      mother: { label: '母亲', status: 'alive-working', health: 66, agency: 98, note: '掌握自己的蚕种、蚕架、竹匾、丝货、季节现金和停养、合养或入厂决定' },
      father: { label: '父亲', status: 'alive-working', health: 68, agency: 96, note: '只续租自己同意的田亩，逐季核地租、水次、种粮、工钱和是否改做长工' },
      spouse: { label: '配偶', status: 'not-met', health: 72, agency: 97, note: '婚后保留工资、蚕具、旧债、父母照料、住处和是否共同经营的决定' },
      household: { label: '佃田、桑叶、蚕房与两套季节劳动', status: 'shared-life-separate-rights', strength: 54, agency: 95 },
      support: { label: '邻户、水利轮次、茧行、工友与镇上训练', status: 'bounded-reciprocity', strength: 32, agency: 96 },
      connections: { label: '续佃、收茧、工厂试工与正式信贷门路', status: 'terms-and-answer-required', strength: 25, agency: 95 },
      workers: { label: '季工、合养人、丝厂同事与帮工', status: 'separate-wages-tools-and-exit', strength: 22, agency: 97 },
      ledger: { label: '地租、水次、蚕种、桑叶、蚕具、茧级、丝款、工资和债务分账', status: 'confirmed-partial-disputed', strength: 34, agency: 99 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 91, note: '不自动继承佃权、母亲蚕具、丝厂工位、合养份额、债务或养老责任' },
    },
    contacts: {
      f03_gu_ashui: { label: '顾阿水', role: '逐季核佃田、种粮、水次、地租与季工的父亲', status: 'family', relation: 65, agency: 96, note: '可失田、减租、改做长工或晚年只管菜地，不让主角替他续佃或认债' },
      f03_zhou_sanniang: { label: '周三娘', role: '养蚕、土法缫丝并自行处分蚕具和丝款的母亲', status: 'family', relation: 74, agency: 99, note: '可合养、停养、转缫丝或入厂，不把收入自动交给地租和家中男性' },
      f03_gu_chunmei: { label: '顾春妹', role: '学习看茧价和识字并决定入厂、继续学习、婚或不婚的手足', status: 'family', relation: 57, agency: 99, born: 1912, note: '不自动留家做蚕季免费劳力，也不与主角共享录用结果' },
      f03_lu_qiaoyun: { label: '陆巧云', role: '保住自家蚕种、桑叶、女儿照料和合养退出权的邻户养蚕人', status: 'nearby', relation: 33, agency: 99, born: 1888, note: '可互助、合购、竞争桑叶或因蚕病停止互借器具' },
      f03_yu_maosheng: { label: '俞茂生', role: '按契核续佃、租粮和水利分摊并向上交账的经租人', status: 'nearby', relation: 20, agency: 95, born: 1879, note: '可宽限、换佃或拒绝续租，不是永久恶人也不提供无条件保护' },
      f03_qian_boheng: { label: '钱伯衡', role: '按当日等级、潮湿和病茧情况验货并给出报价的茧行经手人', status: 'nearby', relation: 24, agency: 96, born: 1880, note: '报价不等于成交，可压级、退货、守规验货或介绍公开缫丝端口' },
    },
  };

  Object.assign(C.routes, {
    'jiangnan-tenant-water-farmer': { name: '江南佃田、水次与季工农作', family: 'jiangnansilkwater', summary: '逐季核租约、田亩、水次、种粮、收成、租粮、季工工资、灾害与退佃，不把多年耕作自动写成产权。' },
    'jiangnan-sericulture-silk-household': { name: '江南养蚕、卖茧与家庭缫丝副业', family: 'jiangnansilkwater', summary: '从蚕种、桑叶、温湿、病蚕、器具、验茧、报价和回款进入家庭丝业，保留每名劳动者的工具、收入与退出。' },
    'jiangnan-silk-reeling-mill-worker': { name: '江南丝厂试工、缫丝与检验工人', family: 'jiangnansilkwater', summary: '经过报名、核年龄、试工和答复进入具体工序，处理工票、计件／计时、返工、伤病、停工、迁厂与退休。' },
  });

  C.actions.push(
    { id: 'f03-field-water-rent-ledger', name: '跟父亲核田亩、水次、种粮、租账与季工', families: ['jiangnansilkwater'], minAge: 6, spirit: 3, delta: { body: 2, knowledge: 2, craft: 2 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f03_gu_ashui: { relation: 2 }, f03_yu_maosheng: { relation: 1 } }, note: '耕作事实、续佃意愿、租粮与水次分别记；帮忙不等于替父亲续租或取得田权。' },
    { id: 'f03-silkworm-tool-cash-ledger', name: '跟母亲核蚕种、桑叶、蚕具、病蚕、丝货与季节现金', families: ['jiangnansilkwater'], minAge: 6, spirit: 3, delta: { craft: 3, knowledge: 2, relation: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f03_zhou_sanniang: { relation: 2 }, f03_lu_qiaoyun: { relation: 1 } }, note: '母亲的蚕具、丝款和是否停养由她决定；家庭缺租不自动吞掉全部副业收入。' },
    { id: 'f03-literacy-price-work-ticket', name: '与春妹学数字、茧级、租账、工票与地址', families: ['jiangnansilkwater'], minAge: 7, spirit: 3, delta: { knowledge: 4, mind: 2, network: 1 }, channels: ['books'], contactEffects: { f03_gu_chunmei: { relation: 2 }, f03_qian_boheng: { relation: 1 } }, note: '识字能核报价与工票，不能自动获得贷款、工位或经租权限。' },
    { id: 'f03-tenant-season-cycle', name: '完成一季整田、排灌、插收、租粮与工钱核对', routes: ['jiangnan-tenant-water-farmer'], minAge: 15, spirit: 4, careerAction: true, delta: { body: 3, craft: 2, money: 2, health: -1 }, contactEffects: { f03_tenant_coworker: { relation: 2 }, f03_yu_maosheng: { relation: 1 } }, note: '田亩、工日、借具、收成、租粮与实收工资逐项写清。' },
    { id: 'f03-tenant-rent-water-followup', name: '核续佃、水次、欠租、灾损和下一季答复', routes: ['jiangnan-tenant-water-farmer'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 3, position: 1 }, contactEffects: { f03_yu_maosheng: { relation: 1 }, f03_tenant_customer: { relation: 1 } }, note: '宽限、部分减租、退佃、换田与拒绝分别结案，不把“继续种田”当无限循环。' },
    { id: 'f03-sericulture-cycle', name: '完成一批蚕种、桑叶、喂养、隔离、上蔟、验茧与回款', routes: ['jiangnan-sericulture-silk-household'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 4, money: 2, health: -1 }, contactEffects: { f03_lu_qiaoyun: { relation: 2 }, f03_qian_boheng: { relation: 1 } }, note: '批次、器具所有人、异常、等级、报价、成交和未售茧分别记录。' },
    { id: 'f03-silk-grade-cash-followup', name: '核茧级、退货、自缫、合运、丝款与下一批', routes: ['jiangnan-sericulture-silk-household'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, craft: 2, mind: 2 }, contactEffects: { f03_zhou_sanniang: { relation: 1 }, f03_qian_boheng: { relation: 1 } }, note: '茧行报价只是一次答复；母亲、邻户和主角各自承担自己批次与工序。' },
    { id: 'f03-mill-shift-ticket', name: '完成一班选茧、煮茧、缫丝、接绪、复摇或检验与工票', routes: ['jiangnan-silk-reeling-mill-worker'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 4, money: 2, health: -2 }, contactEffects: { f03_mill_coworker: { relation: 2 }, f03_mill_supervisor: { relation: 1 } }, note: '具体工序、检查人、计件／计时、返工、工票和实发工资同班结算。' },
    { id: 'f03-mill-wage-health-followup', name: '核工票、返工、停机、烫伤、咳嗽、请假与留用答复', routes: ['jiangnan-silk-reeling-mill-worker'], minAge: 17, spirit: 3, careerAction: true, delta: { mind: 2, knowledge: 2, health: 1 }, contactEffects: { f03_mill_supervisor: { relation: 1 }, f03_mill_coworker: { relation: 2 } }, note: '入厂不等于终身留用；工资、伤病、停机、宿舍和回乡分别处理。' }
  );

  var sourceIds = ['SRC-F03-WUXI-SILK', 'SRC-F03-WUXI-MILLS', 'SRC-F03-WARTIME-LOSS', 'SRC-F03-SUZHOU-FLOOD', 'SRC-F03-SUZHOU-WATER', 'SRC-F03-FARMER-BANK', 'SRC-F03-SILK-ARCHIVE'];
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

  installDecision({ id: 'jiangnan-silk-child-work-1918', year: 1918, followYear: 1919, families: ['jiangnansilkwater'], title: '蚕忙、看水和识字撞在同一上午时先跟哪一处', prompt: '母亲要挑桑叶，父亲要守水次，春妹要去识字班。你只能投入半日，其他人的工作不会因为你的选择消失。', options: [
    option('f03-child-silkworm', '跟母亲辨叶、喂蚕并归还陆巧云的竹匾', { craft: 3, relation: 2 }, 'f03:child:silkworm', '1918 年第一次完成一段蚕季劳动和借物归还。', '竹匾归还，异常蚕另放一处', '母亲和陆巧云分别核自己的器具；你只记录看见的征兆，没有替任何人诊断整批蚕。'),
    option('f03-child-water', '跟父亲看水位、田埂和本轮用水顺序', { body: 2, knowledge: 2, relation: 1 }, 'f03:child:water', '1918 年第一次跟父亲确认田亩和水次。', '一段田埂补好，下一轮水次仍待确认', '父亲只处理自己佃作范围，邻田的水和经租人的续佃答复没有被你代定。'),
    option('f03-child-literacy', '与春妹去短时识字班，练茧级、租账和地址', { knowledge: 4, mind: 2 }, 'f03:child:literacy', '1918 年与春妹开始学习茧级、租账和地址。', '练习纸能对照账目却没有取得账本', '父母分别拿自己的数字让你核，真实租约、丝款和他人姓名仍由当事人保管。'),
  ] });
  installDecision({ id: 'jiangnan-silk-credit-1928', year: 1928, followYear: 1929, families: ['jiangnansilkwater'], title: '水退后种粮、修埂和来年蚕种不能全顾时怎样筹钱', prompt: '亲族借粮、正式农贷／合作渠道和减少田亩各有期限、条件与损失。听说省里新设农民银行不等于本乡能借到。', options: [
    option('f03-credit-formal-check', '先找公开经手人核申请、用途、担保和答复日', { knowledge: 3, network: 2, money: -1 }, 'f03:credit:formal', '1928 年留下正式信贷与合作渠道的核实记录。', '经手人只收件，未承诺放款', '第二年得到缺担保和覆盖有限的答复；家里仍要少种一块，没有把政策消息写成钱已到账。'),
    option('f03-credit-kin-written', '向亲族借粮，写清数量、期限和不用母亲蚕具抵债', { relation: 2, money: 1, knowledge: 1 }, 'f03:credit:kin', '1928 年形成有数量、期限和财产边界的亲缘借粮。', '第一期用收成归还，蚕具仍归母亲', '亲族收到约定部分，余项顺延；母亲的蚕架和丝款没有因同住被拿走。'),
    option('f03-credit-less-land', '少续一块田，父亲接季工并保住来年蚕种', { money: 1, body: -1, position: -1 }, 'f03:credit:less', '1928 年减少佃田并以季工补部分现金。', '田亩减少，季工工资得到一次结算', '父亲少种一块、按日领到部分工钱；来年蚕种保住，收入下降也如实留下。'),
  ] });
  installDecision({ id: 'jiangnan-silk-path', year: 1924, followYear: 1925, families: ['jiangnansilkwater'], title: '三份有条件、有试做也可能落选的谋生里选哪一份', prompt: '续佃季工、家庭养蚕缫丝和镇上丝厂都要说明负责人、工时、物件、报酬、住处和答复日。春妹也会独立选择。', options: [
    option('f03-path-tenant', '跟父亲核一季佃田与季工，按工日和租账试做', { body: 2, craft: 2, money: 1 }, 'f03:path:tenant', '1924 年进入有田亩、工日和租账的佃作季工。', '一季结束给出续佃和工钱答复', '你按实际工日领钱并继续一块田；父亲保留自己的租约决定，男女都能核账和田作但分配的重活与家务时间不同。', { route: 'jiangnan-tenant-water-farmer' }),
    option('f03-path-sericulture', '与母亲、陆巧云各管器具和批次，试做一批蚕与丝', { craft: 3, knowledge: 1, money: 1 }, 'f03:path:sericulture', '1924 年进入有批次、器具和验货答复的蚕桑副业。', '第一批茧得到等级、成交和未售数量', '母亲、陆巧云与你的劳动和器具分别记；女性劳动不再写成免费家务，男性也可喂蚕、缫丝和核账。', { route: 'jiangnan-sericulture-silk-household' }),
    option('f03-path-mill', '去镇上丝厂核年龄、工序、试工费、宿舍和答复日', { craft: 2, knowledge: 2, money: 1 }, 'f03:path:mill', '1924 年进入有工序和试工答复的丝厂劳动。', '试工结束得到具体留用工序', '女性较常先入选茧、缫丝和检验，男性较常先做搬运、机修辅助与复摇；双方都按实际劳动领试工费，也都可能落选或转工序。', { route: 'jiangnan-silk-reeling-mill-worker' }),
  ] });
  installDecision({ id: 'route-jiangnan-tenant-water-farmer-1929', year: 1929, followYear: 1930, routes: ['jiangnan-tenant-water-farmer'], title: '收成不足、经租人仍来核租时怎样结一季账', prompt: '灾损、实际收成、已交租粮、修埂工日和父亲旧欠要分开。不能把“欠租”一次变成失地或自动宽免。', options: [
    option('f03-tenant-measure-settle', '当面量收成、核已交租粮并申请分期', { knowledge: 2, relation: 1, money: -2 }, 'f03:tenant:measure', '1929 年按实际收成和已交租粮核一季欠项。', '经租人同意一次分期并写明下次日期', '分期只覆盖本季已核欠项，俞茂生不替上家免掉全部租；父亲是否续佃仍另答。'),
    option('f03-tenant-work-offset', '用具名修埂工日抵一部分，余项不混算', { body: -1, craft: 2, money: -1 }, 'f03:tenant:work', '1929 年以具名修埂工日抵一部分租项。', '工日核完，额外劳动没有无限延长', '每一日由见证人核完即止，父亲和你各自的季工工资没有被全部扣入租账。'),
    option('f03-tenant-return-plot', '退掉低田，保留较小田块与母亲蚕房', { position: -2, mind: 2, relation: -1 }, 'f03:tenant:return', '1929 年退掉一块低田并结清已确认部分。', '田亩减少，蚕房和母亲工具没有被收走', '经租人收回低田，家里缩小种粮；蚕房、蚕架和丝货不是租田附属物。'),
  ] });
  installDecision({ id: 'route-jiangnan-sericulture-silk-household-1929', year: 1929, followYear: 1930, routes: ['jiangnan-sericulture-silk-household'], title: '一批蚕出现相似异常时怎样止损', prompt: '温湿、桑叶、蚕种与器具往来都可能相关。你只能记录征兆、隔离和经手，不能凭空诊断或把损失推给邻户。', options: [
    option('f03-silk-isolate-review', '隔离异常批次，请陆巧云只核她看见的征兆', { craft: 3, relation: 2, money: -1 }, 'f03:silk:isolate', '1929 年隔离一批异常蚕并留下观察记录。', '异常没有扩到全部器具，损失仍存在', '母亲停用一套竹匾，陆巧云取回自己的器具；没人保证病因，下一批先做清洁和小量复养。'),
    option('f03-silk-sell-healthy-part', '把尚可部分提前验货出售，异常部分停止流转', { money: 1, fame: -1, mind: 2 }, 'f03:silk:early', '1929 年提前出售一部分尚可茧并停止异常批次流转。', '茧行压级成交，异常批次没有混卖', '钱伯衡说明等级和折价，母亲自己接受已确认报价；现金少于预期但责任清楚。'),
    option('f03-silk-stop-batch', '整批停养，保留器具与来年小规模复养机会', { money: -3, health: 2, mind: 3 }, 'f03:silk:stop', '1929 年停止整批养蚕并保存器具。', '一年没有蚕款，器具所有人仍清楚', '家里改接短工，母亲和陆巧云各自清洁并收回工具；停养不是永久失败，也没有自动痊愈。'),
  ] });
  installDecision({ id: 'route-jiangnan-silk-reeling-mill-worker-1929', year: 1929, followYear: 1930, routes: ['jiangnan-silk-reeling-mill-worker'], title: '工票被扣了一段返工时数时怎样核', prompt: '原料等级、机器停转、你经手工序和检验标准都可能影响返工。工头不能只说“做坏了”，你也不能只凭关系要求补薪。', options: [
    option('f03-mill-ticket-review', '拿班次、工序、停机和检验记录逐项复核', { knowledge: 3, mind: 2, relation: 1 }, 'f03:mill:review', '1929 年按班次和工序复核一次扣工争议。', '补回停机时数，返工部分仍不计件', '工头确认一段是机器停转，一段是工序返做；补薪和未补部分分别写入工票。'),
    option('f03-mill-partial-settle', '接受已确认工资，保留争议时数并换工序试做', { money: 1, craft: 2, position: -1 }, 'f03:mill:partial', '1929 年先领已确认工资并保留一段争议。', '换工序后得到新的检查人和答复', '争议时数没有凭空消失，新工序另有试做期；换岗不是升职，也不代表春妹同样被调。'),
    option('f03-mill-leave-after-pay', '领清已确认部分后离厂，带走工票副记和住址', { money: 1, mind: 3, position: -2 }, 'f03:mill:leave', '1929 年在领清已确认工资后离开丝厂。', '离厂结束本段工作，下一步另找岗位', '你归还工牌和厂具，保留自己的工票副记；宿舍床位和厂内机器没有变成离职补偿。'),
  ] });
  installDecision({ id: 'jiangnan-silk-war-break-1937', year: 1937, followYear: 1938, families: ['jiangnansilkwater'], title: '战事使丝厂、收茧、道路和田作同时中断时先接住什么', prompt: '父母、春妹、伴侣、田租、蚕具、未售茧、厂内工资和宿舍地址各自不同。没有消息的人只保留最后已知状态。', options: [
    option('f03-war-stay-water-farm', '留乡保住田作、蚕具和家人地址，停止不安全收货', { craft: 2, relation: 2, money: -3 }, 'f03:war:stay', '1937 年留乡处理田作、蚕具和家人确认。', '田与蚕房都缩小，丝厂亲友仍需通信核实', '父母分别决定继续的工作，春妹的厂内消息只记到最后来信；未确认者没有被补写成死亡。', { warTurn: 'stay-water-farm' }),
    option('f03-war-town-work', '带个人凭据进镇核新岗位和住处，不拿走他人蚕具', { knowledge: 2, money: -3, network: 2 }, 'f03:war:town', '1937 年带个人凭据进镇重新核工作与床位。', '只得到临时整理与民生工作', '原丝厂岗位没有自动恢复，你按日领薪；母亲蚕具和父亲租账留在原处，通信地址另存。', { warTurn: 'town-work' }),
    option('f03-war-split-household', '一人先探工与住处，其余守田并约定两次确认方式', { mind: 3, relation: 1, money: -2 }, 'f03:war:split', '1937 年家人分两处生活并约定核信办法。', '两处都得到地址，仍有一封信未到', '探路者只核到临时活，留乡者继续处理租粮和蚕具；一封迟到信保留为未知，没有强行团聚。', { warTurn: 'split-household' }),
  ] });
  installDecision({ id: 'route-jiangnan-tenant-water-farmer-1946', year: 1946, followYear: 1947, routes: ['jiangnan-tenant-water-farmer'], title: '战后继续佃作、组织季工队还是转做水田服务', prompt: '田地、农具、水次、劳力和旧租账都有所有人。经营先写雇员工资、借具、债、灾损和退出，不把种田经验变成土地所有。', options: [
    option('f03-tenant-remain-seasonal', '继续小规模佃作并按季核租与工钱', { money: 2, health: 1, craft: 2 }, 'f03:tenant:seasonal', '1946 年继续有租账和工日答复的小规模佃作。', '一季收成有限，租账按实结算', '你没有扩大田亩，父亲减少重活；母亲丝款没有自动补进租账。'),
    option('f03-tenant-water-service', '用自有小工具做按次整田、排水和修埂服务', { money: -2, craft: 3, network: 1 }, 'f03:tenant:service', '1946 年建立不雇人的有限水田服务组。', '第一年只接三户具名小活', '每次写清田主、工具、工日和结算；没有取得水利设施或他人田地。', { enterpriseStart: { id: 'f03-water-field-service', name: '江南合成守田水田服务组', domainKey: 'D01', kind: 'bounded-water-field-service', workplace: '江南合成水网乡三处具名田块', product: '有田主、工具、工日、水次、完工与结算记录的整田排水修埂服务', employees: 0, asset: { id: 'f03-service-tools', kind: 'documented-small-field-tools', description: '主角自购并逐件登记的绳、锹、木耙和水位尺' }, license: { id: 'f03-service-record', kind: 'documented-field-service-record', authority: '合成乡公开经手人', scope: '只限具名田块劳务，不含田权、水权或公共设施产权' } } }),
    option('f03-tenant-seasonal-team', '与一名季工按劳动份额组织有限农忙队', { money: -4, body: -1, network: 2 }, 'f03:tenant:team', '1946 年建立有四名雇工和退出边界的农忙队。', '首年只完成两季具名农忙', '四名雇工按日领薪，同事只投入列明工具和劳动；借具、伙食、伤病、欠工与退出逐项结算。', { enterpriseStart: { id: 'f03-seasonal-farm-team', name: '江南合成水田农忙队', domainKey: 'D01', kind: 'bounded-seasonal-farm-team', workplace: '江南合成水网乡具名承作田块', supplier: '具名种粮与农具出借人', product: '有田主、工日、借具、伙食、工资和完工记录的季节田作劳务', employees: 4, partners: [{ personId: 'contact:f03_tenant_coworker', role: '有限劳动与自有工具合伙人' }], asset: { id: 'f03-team-tools', kind: 'documented-partner-field-tools', description: '按所有人列明的农具、绳索与防水用具' }, debt: { id: 'f03-team-wage-credit', creditor: '具名粮食与工具出借人', purpose: '开工伙食、借具费与雇工工资' }, license: { id: 'f03-team-record', kind: 'documented-seasonal-work-record', authority: '合成乡公开经手人', scope: '只限公开季节农作劳务，不含田权或征调权限' } } }),
  ] });
  installDecision({ id: 'route-jiangnan-sericulture-silk-household-1946', year: 1946, followYear: 1947, routes: ['jiangnan-sericulture-silk-household'], title: '战后继续卖茧、自缫还是组织有限合养缫丝', prompt: '母亲、陆巧云和你各有蚕具、桑叶来源、劳动和丝款。合养不能吞掉个人工具，经营也不保证每批成活或成交。', options: [
    option('f03-silk-sell-cocoons', '继续小批养蚕，逐批验茧和成交', { money: 2, craft: 2, health: 1 }, 'f03:silk:sell', '1946 年继续逐批验货的小规模养蚕。', '一批成交、一批压级，现金分别入账', '母亲决定自己的批次和丝款，你只处分自己经手部分；钱伯衡的报价没有变成长期合同。'),
    option('f03-silk-own-reeling', '用自有器具做不雇人的小批自缫', { money: -2, craft: 3, position: 1 }, 'f03:silk:reeling', '1946 年建立不雇人的家庭自缫工作间。', '首年只完成两小批丝货', '每批记录蚕茧所有人、器具、工时、质量与成交；母亲和主角的丝款分别结算。', { enterpriseStart: { id: 'f03-family-reeling-room', name: '江南合成春兰自缫间', domainKey: 'D03', kind: 'bounded-family-reeling-room', workplace: '江南合成水网乡自有小间', product: '按茧批、器具、工时、质量与成交记录的小批土丝', employees: 0, asset: { id: 'f03-reeling-tools', kind: 'documented-personal-reeling-tools', description: '主角自购的小锅、丝车部件与晾丝架' }, license: { id: 'f03-reeling-record', kind: 'documented-small-reeling-record', authority: '合成乡镇公开经手人', scope: '只限自有和具名委托茧批，不含母亲蚕具或丝厂设备' } } }),
    option('f03-silk-limited-coop', '与母亲、陆巧云按器具和劳动份额组织有限合养缫丝', { money: -5, relation: 3, network: 2 }, 'f03:silk:coop', '1946 年建立有两名雇员和三方份额的有限合养缫丝社。', '首年只收三方具名蚕茧并完成两批', '两名雇员按月领薪，三方工具、蚕茧、现金和劳动分别记份额；病蚕、坏丝、欠款和退伙各自结算。', { enterpriseStart: { id: 'f03-sericulture-reeling-coop', name: '江南合成三巧蚕丝合营', domainKey: 'D03', kind: 'bounded-sericulture-reeling-coop', workplace: '江南合成水网乡合租蚕房与缫丝间', supplier: '三方具名桑叶、蚕种与茧批提供人', product: '有批次、隔离、验茧、工时、丝质、工资与成交记录的有限蚕丝加工', employees: 2, partners: [{ personId: 'contact:f03_zhou_sanniang', role: '独立蚕具、茧批与劳动合伙人' }, { personId: 'contact:f03_lu_qiaoyun', role: '独立蚕具、桑叶与劳动合伙人' }], asset: { id: 'f03-coop-tools', kind: 'documented-partner-sericulture-tools', description: '三方分别列明的蚕架、竹匾、锅、丝车部件和晾丝架' }, debt: { id: 'f03-coop-working-credit', creditor: '具名蚕种、桑叶与房租提供人', purpose: '首批蚕种桑叶、房租与雇员工资' }, license: { id: 'f03-coop-record', kind: 'documented-sericulture-coop-record', authority: '合成乡镇公开经手人', scope: '只限具名蚕茧和有限加工，不含田权、丝厂或他人工具' } } }),
  ] });
  installDecision({ id: 'route-jiangnan-silk-reeling-mill-worker-1946', year: 1946, followYear: 1947, routes: ['jiangnan-silk-reeling-mill-worker'], title: '战后回厂、转检验登记还是建立有限丝货整理组', prompt: '旧工龄、工票、厂房、丝车和宿舍分别核。多年做工不等于拥有机器；经营只能使用列明自购工具和公开委托。', options: [
    option('f03-mill-return-waged', '重新核工序和工票，继续受薪缫丝或复摇', { money: 2, craft: 2, health: 1 }, 'f03:mill:waged', '1946 年重新得到有工序和工资答复的受薪岗位。', '旧工龄只核到可证明部分', '你归还厂具并按班领薪，未证明年资保留争议；春妹另有自己的工作答复。'),
    option('f03-mill-quality-records', '转做选茧、质量检验与生产登记', { knowledge: 2, craft: 2, health: 1 }, 'f03:mill:quality', '1946 年转到有检查人和台账的质量登记岗位。', '第一年查出两批混级和一次停机', '你只记录能观察的等级与工序，不替厂方定价或处分机器；工资和工作负担另核。'),
    option('f03-mill-finishing-group', '与一名工友用自购小工具建立有限丝货整理组', { money: -5, craft: 3, network: 2 }, 'f03:mill:group', '1946 年建立有三名雇员和两方份额的有限丝货整理组。', '首年只有两家公开委托人', '三名雇员按月领薪，工友与你各自列现金、劳动和工具份额；来料所有权、返工、工资、租金与退出分别记录。', { enterpriseStart: { id: 'f03-silk-finishing-group', name: '江南合成兰秀丝货整理组', domainKey: 'D07', kind: 'bounded-silk-finishing-group', workplace: '江南合成镇上合租整理小间', supplier: '两家具名丝货委托人', product: '有来料、分级、复摇、检验、返工、工资与交付记录的有限丝货整理', employees: 3, partners: [{ personId: 'contact:f03_mill_coworker', role: '有限自有工具与劳动合伙人' }], asset: { id: 'f03-finishing-tools', kind: 'documented-partner-finishing-tools', description: '自购且按所有人列明的小型复摇、检验与晾丝工具' }, debt: { id: 'f03-finishing-rent-wage-credit', creditor: '具名房东与委托人', purpose: '小间租金、工具修理与雇员工资' }, license: { id: 'f03-finishing-record', kind: 'documented-silk-finishing-record', authority: '合成镇公开经手人', scope: '只限公开来料整理，不含原丝厂、厂房或机器产权' } } }),
  ] });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({ id: id, title: title, text: text, families: ['jiangnansilkwater'], priority: 12, sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review' }, extra || {}));
  }
  var allRoutes = ['jiangnan-tenant-water-farmer', 'jiangnan-sericulture-silk-household', 'jiangnan-silk-reeling-mill-worker'];
  scene('f03-s01', '湿草鞋、蚕架和种粮各有不能受潮的地方', '父亲把田具留在门边，母亲垫高蚕架和蚕种；一间屋共享生活，却不合并工具、种粮和丝款。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f03-s02', '借来的竹匾要先归还原主人', '春妹提醒陆巧云明日要用竹匾，母亲核清哪一只属于谁；忙蚕季也不能把邻户器具变成自家资产。', { minAge: 4, maxAge: 7, priority: 23 });
  scene('f03-s03', '异常蚕只记录看见的征兆', '陆巧云查看闷热后的蚕房，只说明活动和食叶变化；母亲决定隔离与是否求助，儿童不作诊断。', { minAge: 5, maxAge: 9, priority: 23 });
  scene('f03-s04', '蚕忙、看水和识字撞在同一上午', '你只能投入半日，父母和春妹继续各自工作；童年选择形成经验，不锁死成年路线。', { minAge: 6, maxAge: 10, priority: 22 });
  scene('f03-s05', '两筐茧被验成不同等级', '钱伯衡指出潮湿、颜色和病茧差异，母亲要求说明可观察理由；报价、成交和退回是三件事。', { minAge: 8, maxAge: 12, priority: 22 });
  scene('f03-s06', '经租人带来的租账与母亲蚕种钱不能混', '父亲提出用粮交一部分，母亲拒绝先动来年蚕种钱；争执围绕可见资产和期限，不是随机降好感。', { minAge: 10, maxAge: 14, priority: 22 });
  scene('f03-s07', '水退后先排种粮、修埂和生活粮', '三项不能全额覆盖时，正式信贷、亲缘借粮和少种都有真实条件；传闻不等于贷款到账。', { minAge: 11, maxAge: 18, priority: 22 });
  scene('f03-s08', '三份试做都说明负责人、工时和答复日', '续佃季工、家庭蚕丝和丝厂岗位分别给实际任务；认识人只到核验门口。', { year: 1924, routes: allRoutes, priority: 31 });
  scene('f03-s09', '第一份工作终于说清田、批次或工序', '你知道给谁做、谁检查、物件属于谁、怎样计钱、哪里住和什么时候得到下一次答复。', { year: 1925, routes: allRoutes, priority: 29 });
  scene('f03-s10', '一季田作有田亩、水次、工日和租粮', '经租人、父亲、季工和你只核各自关系；多年耕作不会自动变成田权。', { minAge: 15, maxAge: 55, routes: ['jiangnan-tenant-water-farmer'], priority: 22 });
  scene('f03-s11', '一批蚕丝有器具、异常、等级、报价和回款', '母亲、陆巧云、茧行和你分别对经手阶段负责；合养不等于同账，压级也不等于整批无价值。', { minAge: 15, maxAge: 55, routes: ['jiangnan-sericulture-silk-household'], priority: 22 });
  scene('f03-s12', '一班丝厂劳动有工序、工票、返工和实发工资', '选茧、煮茧、缫丝、接绪、复摇、检验和搬运不能用“进厂”概括；机器和宿舍仍属厂方。', { minAge: 15, maxAge: 55, routes: ['jiangnan-silk-reeling-mill-worker'], priority: 22 });
  scene('f03-s13', '春妹的录用结果属于她自己', '她可能通过试工而你落选，也可能另选学习或回乡；家人可以祝贺、争吵或重新分工，不能代她辞工或结婚。', { minAge: 16, maxAge: 28, priority: 21 });
  scene('f03-s14', '婚后争吵的是田租、蚕具、工资、旧债和双方父母', '同住分账、近处分居、蚕季互助和暂不合伙都可持续回响；关系不会自动合并资产或免费劳动。', { minAge: 20, maxAge: 44, priority: 20 });
  scene('f03-s15', '母亲想停大批养蚕，父亲仍想续一小块田', '两人的身体、收入和晚年打算不必一致；照料者只能分别商量，不能把“为了家”当作替他们决定。', { minAge: 40, maxAge: 68, priority: 20 });
  scene('f03-s16', '弯腰、潮湿、热水与纤维粉尘留下具体疾病过程', '腰痛、咳嗽、烫伤、眼手劳损或失眠先有征兆，再有求医、诊断、休工、复诊和复工答复。', { minAge: 18, maxAge: 65, priority: 20 });
  scene('f03-s17', '邻户、经租人、茧行和工友会换活、迁走和拒绝', '陆巧云可能停养，俞茂生会换佃，钱伯衡会停收，同事会成家离厂；关系不是永久资源。', { minAge: 18, maxAge: 66, priority: 19 });
  scene('f03-s18', '丝业、信贷与公开互助不自动生成政治身份', '工友互助、行业登记、救济、识字和合作可能进入生活；参加一次公开事务不等于入党、卧底、叛徒或秘密权限。', { minAge: 18, maxAge: 50, priority: 19 });
  scene('f03-s19', '1931 年洪水先改变田、蚕房、道路、饮水和住处', '水位、田亩、桑叶、蚕具、厂路和家人最后所在分别确认；受灾不等于全家遭遇完全相同。', { year: 1931, priority: 38 });
  scene('f03-s20', '1934 年旱情使水次、稻田、桑叶和船路各自受限', '父亲核哪块田能灌，母亲核桑叶来源，工人核是否到厂；“大旱”必须落到可观察的生活后果。', { year: 1934, priority: 37 });
  scene('f03-s21', '1937 年逐人核丝厂、田作、蚕具和最后地址', '工厂受损与交通中断后，父母、春妹、伴侣、工友和邻户分别决定留、走、转工或等待；失联不等于死亡。', { year: 1937, priority: 40 });
  scene('f03-s22', '1949 是田、蚕、工票、债与家口的中段回收', '系统列父母、春妹、伴侣、当前工作、田地使用、蚕具所有、工资、债务和未知消息，再进入八种后半生。', { year: 1949, routes: allRoutes, priority: 40 });
  scene('f03-s23', '1950 年代水利变化带来劳务也改变旧水次', '出工有工段、工具、工资、伤病和结束日；参加一次修堤排灌不等于拥有设施、取得田权或终身编制。', { minAge: 40, maxAge: 58, priority: 20 });
  scene('f03-s24', '死亡不自动结清田租、蚕具、工资、丝款和迟到的信', '父母、邻户、工友、伴侣或主角去世后，发生、知情、确认、财产归属、欠项和未知消息分别处理。', { minAge: 55, priority: 18 });

  C.annualRhythms['jiangnan-tenant-water-farmer'] = [
    '每季先核田亩、租期、水次、种粮、借具、工日、收成、租粮和实收工资；耕作履历不是土地所有证明。',
    '男性较常承担犁耙与远处水工，女性较常兼秧作、粮账和密集家务；实际劳动逐项计酬，岗位差异不作能力扣分。',
    '续佃、退佃、季工队、水田服务、灾损和晚年退出都有具体答复；留乡不是没有职业变化。',
  ];
  C.annualRhythms['jiangnan-sericulture-silk-household'] = [
    '每批写蚕种、桑叶、器具、温湿、异常、隔离、上蔟、验茧、等级、报价、成交和回款；养蚕不是一句家庭副业。',
    '母亲、邻户、主角与帮工各有工具、批次、工资、丝款和退出；女性家庭劳动必须显性计酬。',
    '病蚕、压级、停收、合养、自缫、债务和拆伙都可能发生；有丝货不等于稳定盈利。',
  ];
  C.annualRhythms['jiangnan-silk-reeling-mill-worker'] = [
    '每班写选茧、煮茧、缫丝、接绪、复摇、检验或搬运中的具体工序、工票、检查、返工和工资。',
    '女性更常进入缫丝检验，男性更常进入搬运机修辅助；双方都可能转工序、受伤、停工、组织有限经营或退出。',
    '厂房、机器、宿舍和来料仍属各自所有人；多年做工、留用和工龄都不等于工厂产权。',
  ];
  C.sceneFrames.jiangnansilkwater = [
    { open: '天亮后，田里水次、蚕房温湿、母亲丝款、父亲租账、春妹工票和你自己的身体同时等着处理。', close: '今天只完成一段田作、一批蚕丝或一班工；谁拥有、谁经手、谁领钱、谁等待和哪些仍未知分别留下。' },
    { open: '水网乡镇的船路、茧行和丝厂受季节、市场与时代影响，家人、邻户、经租人和工友各自先顾自己的生活。', close: '你得到具体答复，也承担钱、身体、关系或岗位代价；经验只让下一步更清楚，不保证上行。' },
  ];
  C.sceneFrames['jiangnan-tenant-water-farmer'] = C.sceneFrames.jiangnansilkwater;
  C.sceneFrames['jiangnan-sericulture-silk-household'] = C.sceneFrames.jiangnansilkwater;
  C.sceneFrames['jiangnan-silk-reeling-mill-worker'] = C.sceneFrames.jiangnansilkwater;

  C.parentProfiles.jiangnansilkwater = {
    mother: { name: '周三娘', born: 1885, occupation: '养蚕、土法缫丝并自己决定蚕具、丝款、合养和停工', deathAgeBase: 76, activities: ['核蚕种、桑叶、蚕架、竹匾、异常、丝货和自己的季节现金', '自己决定隔离、停养、合养、自缫、入厂或病休', '晚年减少大批养蚕但保留小量缫丝、旧客和工具交接'], words: ['“田租缺钱，也不能不问我就拿蚕种钱。”', '“同一间蚕房，要说清哪批蚕、哪套器具是谁的。”', '“我少养一批，不等于蚕架和丝款自动给你。”'] },
    father: { name: '顾阿水', born: 1882, occupation: '佃田耕作并逐季协调水次、租粮和季工', deathAgeBase: 77, activities: ['核田亩、租期、水次、种粮、收成、租粮和工日', '自己决定续佃、少种、退田、改做季工或短工', '晚年减少整日田作但保留菜地与租账意见'], words: ['“种了多年是履历，不是田契。”', '“水轮到哪块田，要按当季说清。”', '“我能教你看田，不能替你把经租人的答复写好。”'] },
  };
  C.spouseProfiles.jiangnansilkwater = {
    男: { name: '沈月秀', bornOffset: 1, occupation: '丝厂检验与家庭小批缫丝劳动者，保留工资、工票、工具和父母照料', values: '同住前谈清田租、蚕具、工资、轮班和双方父母，不接受成为免费蚕工或默认守家人' },
    女: { name: '陆水生', bornOffset: -1, occupation: '水田季工与丝货短途运输人，按工日领钱并照料自己的父亲', values: '愿意分担家务和照料，不把妻子的丝款、工票、蚕具、合伙份额或迁移决定据为己有' },
  };
  C.childNames.jiangnansilkwater = ['顾水宁', '顾桑安'];

  var tenantBase = { kind: 'tenant-water-farming', role: '佃田、水次与季工农作人', workplace: '江南合成水网乡具名佃田、圩埂与季工田块', employer: '具名经租关系与季工雇主', supervisor: '经租人俞茂生与当季领工人', colleague: '有自己工日和债务的季工严桂芳', publicPerson: '等待水次和完工答复的邻田农户沈阿根', terms: '按季与工日结算；田亩、租期、水次、借具、收成、租粮、工资、灾损与退佃分别记录', duties: '整田、排灌、插收、修埂并核租粮和季工工资，不把耕作、借具或修水写成产权', scenes: ['俞茂生带来租账，你先核田亩和已交粮。', '严桂芳核少算的一日工钱和借具归还。', '沈阿根只同意交换一次水次，不提供永久用水。'] };
  var silkBase = { kind: 'household-sericulture-reeling', role: '养蚕、卖茧与家庭缫丝劳动者', workplace: '江南合成水网乡蚕房、桑叶来源地与镇上茧行', employer: '自营、家庭分账或有限合养', supervisor: '独立养蚕人周三娘与验茧人钱伯衡', colleague: '有自己蚕具和女儿照料的合养人陆巧云', publicPerson: '按批次验级并等待成交答复的茧行经手人钱伯衡', terms: '逐批结算；蚕种、桑叶、器具、异常、隔离、等级、报价、成交、丝款、工资与退出分别记录', duties: '喂蚕、隔离、上蔟、选茧、缫丝、验级与交货，不混用母亲、邻户和主角的批次与工具', scenes: ['一批蚕少食，你只记征兆并隔离。', '钱伯衡把两筐茧验成不同等级。', '陆巧云收回自己的竹匾并决定是否继续合养。'] };
  var millBase = { kind: 'silk-reeling-mill-work', role: '丝厂缫丝、复摇与检验工人', workplace: '江南合成镇上机器缫丝厂、工棚与通勤船路', employer: '合成民用丝厂或公开丝货整理单位', supervisor: '工头吴德新', colleague: '有自己工票、工资和成家决定的工友沈兰秀', publicPerson: '带来具名丝货并等待质量交付的委托人金素娥', terms: '按工票计件或计时；工序、机器停转、返工、工资、宿舍、伤病、留用和离厂分别记录', duties: '在选茧、煮茧、缫丝、接绪、复摇、检验或搬运中的具名工序工作并核工票，不处分厂房机器和来料', scenes: ['吴德新给出当天工序和检查标准。', '沈兰秀核工票少记的停机时数。', '金素娥只对具名委托丝货等待返工答复。'] };
  C.routeCareerProfilesByGender['jiangnan-tenant-water-farmer'] = {
    男: Object.assign({}, tenantBase, { role: '犁耙、修埂、远处水工与季节重活农作人', duties: '较常先承担重田作与夜间看水，也必须核工日、伤病、家务和租账，不自动取得田权' }),
    女: Object.assign({}, tenantBase, { role: '秧作、收割、粮账、水次核对与季节农作人', duties: '较常兼密集田作、粮账与家务，全部实际劳动计酬，也能组织水田服务或季工队' }),
  };
  C.routeCareerProfilesByGender['jiangnan-sericulture-silk-household'] = {
    男: Object.assign({}, silkBase, { role: '桑叶运输、喂蚕、上蔟、缫丝与茧批交货人', duties: '较常兼远路桑叶和交货，也逐批核器具、丝款和异常，不因体力取得母亲或邻户蚕具' }),
    女: Object.assign({}, silkBase, { role: '蚕房管理、喂蚕、隔离、缫丝、验级与丝款经手人', duties: '女性家庭丝业劳动显性计薪，可管理批次、核价、组织合养或退出，不是默认无偿副业' }),
  };
  C.routeCareerProfilesByGender['jiangnan-silk-reeling-mill-worker'] = {
    男: Object.assign({}, millBase, { role: '搬茧、煮茧、复摇、机修辅助与工票核对工人', duties: '较常先进入搬运和机修辅助，也可学习缫丝检验；厂具、工票和工资边界相同' }),
    女: Object.assign({}, millBase, { role: '选茧、缫丝、接绪、复摇与质量检验工人', duties: '较常进入缫丝和检验并承受热水、潮湿与计件压力，可转工序、登记、合伙经营或离厂' }),
  };

  Object.assign(C.routeContactProfiles, {
    'jiangnan-tenant-water-farmer': [
      { id: 'f03_yu_maosheng', label: '俞茂生', role: '按契核田亩、租期、水次、租粮、宽限与退佃答复的经租人', status: 'supervisor', relation: 20, born: 1879 },
      { id: 'f03_tenant_coworker', label: '严桂芳', role: '有自己的工日、工资、借具、伤病、债务和迁移决定的季工', status: 'coworker', relation: 29, born: 1906 },
      { id: 'f03_tenant_customer', label: '沈阿根', role: '等待一次水次交换、修埂完工和结算答复的邻田农户', status: 'nearby', relation: 22, born: 1889 },
    ],
    'jiangnan-sericulture-silk-household': [
      { id: 'f03_zhou_sanniang', label: '周三娘', role: '只处分自己蚕种、蚕具、丝款和批次并核合养边界的独立养蚕人', status: 'supervisor', relation: 33, born: 1885 },
      { id: 'f03_lu_qiaoyun', label: '陆巧云', role: '有自己的蚕具、桑叶、女儿照料、丝款与停养决定的合养同事', status: 'coworker', relation: 31, born: 1888 },
      { id: 'f03_qian_boheng', label: '钱伯衡', role: '按批次、潮湿、病茧和等级给报价并等待成交答复的茧行经手人', status: 'nearby', relation: 22, born: 1880 },
    ],
    'jiangnan-silk-reeling-mill-worker': [
      { id: 'f03_mill_supervisor', label: '吴德新', role: '按工序、工票、停机、返工、工资、留用和离厂给答复的丝厂工头', status: 'supervisor', relation: 21, born: 1883 },
      { id: 'f03_mill_coworker', label: '沈兰秀', role: '有自己的工票、工资、宿舍、伤病、成家与离厂决定的丝厂工友', status: 'coworker', relation: 30, born: 1907 },
      { id: 'f03_mill_customer', label: '金素娥', role: '带来具名丝货并等待分级、返工与交付答复的公开委托人', status: 'nearby', relation: 21, born: 1891 },
    ],
  });
  Object.assign(C.healthProfiles, {
    'jiangnan-tenant-water-farmer': ['长期弯腰、涉水、挑担与修埂造成的腰膝肩背和皮肤伤病', '潮湿、饮水与季节暴露造成的反复咳嗽、发热和肠胃不适', '欠租、灾损、欠工、续佃和家人分散造成的胃痛失眠'],
    'jiangnan-sericulture-silk-household': ['长期弯腰、密集手工和睡眠中断造成的肩背手指与眼部劳损', '蚕房温湿、粉尘、煮茧热气与饮食不规律造成的咳嗽和胃肠不适', '病蚕、压级、停收、丝款和合养争议造成的焦虑失眠'],
    'jiangnan-silk-reeling-mill-worker': ['热水、蒸汽、机器、久站与重复动作造成的烫伤、手臂肩背和腿部劳损', '丝屑、潮湿、拥挤工棚与轮班造成的咳嗽、眼鼻不适和反复发热', '计件、扣工、停机、失业、宿舍和家人通信造成的胃痛失眠'],
  });
  Object.assign(C.publicRouteProfiles, {
    'jiangnan-tenant-water-farmer': { publicGroup: '合成的水次、欠工、灾损与公开农事互助簿', publicRole: '核公开水次、工日、欠工、伤病、灾损与续佃答复', covertRole: '熟悉水路和田埂不自动形成秘密资格；另经政治选择也不得占用邻田、工具或他人住址', infiltrationRole: '不提供破坏水利、藏匿、规避查验或秘密运输教程，公开农事与高风险事务严格分开', contact: { id: 'public_f03_tenant', label: '范水琴', role: '登记水次、欠工、灾损和公开农事互助答复的经手人', status: 'colleague', relation: 19, born: 1894 } },
    'jiangnan-sericulture-silk-household': { publicGroup: '合成的蚕病、验茧、丝款与公开合作互助簿', publicRole: '核公开蚕病观察、验茧争议、丝款、救济与合作答复', covertRole: '养蚕、合运和认识茧行不自动生成党籍、卧底或秘密联络身份；申请与正式身份分开', infiltrationRole: '不把桑叶、蚕具、丝货、顾客或水路写成默认秘密载体，不提供现实可复用隐蔽方法', contact: { id: 'public_f03_silk', label: '蒋惠芬', role: '登记蚕病、验茧、丝款和公开合作答复的经手人', status: 'colleague', relation: 20, born: 1896 } },
    'jiangnan-silk-reeling-mill-worker': { publicGroup: '合成的工票、劳资、伤病与公开工友互助簿', publicRole: '核公开工票、扣工、伤病、失业登记、职业介绍和救济答复', covertRole: '工友关系、技术和行业活动不自动生成政治身份、秘密权限或忠诚标签', infiltrationRole: '不以厂房、机器、工票、宿舍和职工名册提供现实隐蔽教程，公开劳资与高风险事务分开', contact: { id: 'public_f03_mill', label: '顾文清', role: '登记丝厂工票、伤病、劳资和公开职业答复的经手人', status: 'colleague', relation: 20, born: 1893 } },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('rural', 'jiangnan-tenant-water-farmer');
  addRouteToTrack('manual', 'jiangnan-sericulture-silk-household');
  addRouteToTrack('factory', 'jiangnan-silk-reeling-mill-worker');

  C.events.push(
    { id: 'jiangsu-rural-finance-f03-1928', year: 1928, eraBrief: true, eraScope: '江苏农村金融与合作尝试', families: ['jiangnansilkwater'], title: '农村金融与合作机构出现，但覆盖和能力都有限', knownThrough: ['newspaper', 'conversation', 'books'], delta: { knowledge: 1, network: 1 }, knownText: '你知道江苏省农民银行在 1928 年开业并承担调剂农村金融、扶助合作的制度目标；实际申请仍要核本地机构、用途、担保、答复与还款。', unknownText: '乡镇先传来“有低利资金”的说法，你只能确认本地有没有经手人和是否收件；没有把章程或传闻写成到账。', fact: '1928 年江苏省农民银行开业，目标包括调剂农村金融与扶助合作，但实际覆盖和振兴能力有限。', historySource: { label: '江苏省档案馆：江苏省农民银行档案', url: 'https://www.dajs.gov.cn/art/2022/11/17/art_123_9709.html' } },
    { id: 'f03-suzhou-flood-1931', year: 1931, eraBrief: true, eraScope: '苏州水网地区洪涝', families: ['jiangnansilkwater'], title: '连续降雨使乡间农田、道路、蚕房与住处进水', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { money: -4, health: -3, position: -2 }, knownText: '你知道苏州水网地区在 1931 年发生大洪涝，乡间农田积水、城乡街道进水；每块田、每批蚕、厂路和家人所在仍逐项核实。', unknownText: '水先漫过田埂、低屋和船路，你只知道哪块田、哪套蚕具和哪名家人最后在哪里；更大范围要等公开消息。', fact: '1931 年苏州水网地区发生大洪涝，农田、街道和生活交通受到具体影响。', historySource: { label: '苏州工业园区档案管理中心《唯亭镇志》自然灾害', url: 'https://www.sipac.gov.cn/szdaglzx/yqfzwtzz/202102/1fda771f36fb48e38bb25f5452dd4095.shtml' } },
    { id: 'f03-suzhou-drought-1934', year: 1934, eraBrief: true, eraScope: '苏州水网地区大旱', families: ['jiangnansilkwater'], title: '河湖水缩、田土龟裂，水次、桑叶与船路同时受限', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { money: -3, health: -1, position: -1 }, knownText: '你知道 1934 年苏州地区久旱，河湖水位下降、田土龟裂并影响船行；田作、桑叶、茧行和到厂路分别受影响。', unknownText: '你先看到水位退、船难行和高田缺水，只能确认自家与附近的后果；没有把整个江南写成同一损失。', fact: '1934 年苏州地区发生大旱，河湖水缩、田土龟裂并影响农业与交通。', historySource: { label: '苏州工业园区档案管理中心《唯亭镇志》自然灾害', url: 'https://www.sipac.gov.cn/szdaglzx/yqfzwtzz/202102/1fda771f36fb48e38bb25f5452dd4095.shtml' } },
    { id: 'f03-wuxi-industry-loss-1937', year: 1937, eraBrief: true, eraScope: '无锡丝厂与江南工业损失', families: ['jiangnansilkwater'], title: '战事严重破坏丝厂、设备、仓库、生产和工人生活', knownThrough: ['newspaper', 'conversation', 'letters'], delta: { money: -5, position: -3, health: -2 }, knownText: '你知道无锡多家丝厂、织厂、仓库和设备在战事中遭受严重破坏；合成角色只按自己的厂、工序、宿舍、工资和家人消息记录。', unknownText: '你先得到停工、厂路受阻或宿舍撤离的局部消息，其他厂与失联者状态要等第二条相容信息确认。', fact: '1937 年后无锡丝业与民族工业的厂房、设备和生产能力遭受严重损失。', historySource: { label: '无锡市档案史志馆：抗日战争时期无锡县民族工业损失情况', url: 'https://daj.wuxi.gov.cn/doc/2015/06/28/2427436.shtml' } },
    { id: 'f03-postwar-silk-reconnect-1946', year: 1946, eraBrief: true, eraScope: '江南丝业与农村生计重接', families: ['jiangnansilkwater'], title: '收茧、丝货、工厂和农村金融逐项恢复，旧关系不会自动回来', knownThrough: ['newspaper', 'conversation', 'letters'], delta: { network: 1, knowledge: 1, money: -1 }, knownText: '你知道战后机构和生产尝试恢复；每次收茧、复工、信贷和职业介绍仍要核收件、缺件、试工、等待和正式答复。', unknownText: '乡镇先出现收货与招工口风，你只能确认本地经手人和自己的结果；没有把行业恢复写成每户盈利。', fact: '战后江南丝业、农村金融和就业逐项重接，但恢复程度和个体结果不同。', historySource: { label: '江苏省档案馆：苏州中国丝绸档案馆开馆介绍', url: 'https://www.dajs.gov.cn/art/2023/6/9/art_40_7458.html' } },
    { id: 'f03-suzhou-water-control-1954', year: 1954, eraBrief: true, eraScope: '苏州水网地区洪涝与水利建设', families: ['jiangnansilkwater'], post1949Choices: ['mainland'], title: '大洪涝后圩堤、排灌与农田水利劳务逐步展开', knownThrough: ['newspaper', 'conversation', 'books'], delta: { network: 1, position: 1, health: -1 }, knownText: '你知道 1954 年苏州地区大洪涝后，圩堤、排灌和农田整治逐步改变地方劳务与水次；参加一段工作仍须核工段、工具、工资、伤病和结束日。', unknownText: '你先看到修堤、排水和招工通知，只能确认本段工地与自己田块；工程全貌和长期权利要等公开记录。', fact: '1954 年苏州地区大洪涝后，圩堤、排灌和农田水利建设逐步展开。', historySource: { label: '苏州工业园区档案管理中心《胜浦镇志》水利', url: 'https://www.sipac.gov.cn/szdaglzx/yqfzspzz/202102/5bcb43d447464935b31b17cf20b7a134.shtml' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
