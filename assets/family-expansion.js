// 民国人生 · 新家庭运行时扩建包 v0.7.3
// 第一批只接入完成来源绑定、固定种子回归与具体生活闭环的 F16；其余家庭继续隐藏。
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion.js');

  C.version = '0.7.3';
  C.familyDecisionKeys = {
    subeipoor: { path: 'subei-livelihood', war: 'subei-war' },
    jiangnanshen: { path: 'shen-path', war: 'shen-war' },
    shanghaigongshang: { path: 'shanghai-path', war: 'shanghai-war' },
    sichuanmedicine: { path: 'sichuan-path', war: 'sichuan-war' },
  };

  Object.keys(C.designRegistry.families).forEach(function (key) {
    var family = C.designRegistry.families[key];
    if (family.designStatus === 'outline') family.designStatus = 'authored-draft';
    if (key !== 'F01' && key !== 'F04' && key !== 'F06') {
      family.firstRoundContent = { people: 6, decisions: 8, scenes: 20 };
    }
  });
  Object.assign(C.designRegistry.families.F16, {
    designStatus: 'runtime-reviewed-first-round',
    runtimeStatus: 'playable-verified',
    runtimeFamilyKey: 'sichuanmedicine',
  });
  C.runtimeFamilyDesignMap.sichuanmedicine = 'F16';
  Object.assign(C.legacyRouteDomainMap, {
    'sichuan-pharmacy': 'D25',
    'sichuan-foodshop': 'D15',
    'sichuan-care': 'D26',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F16-COMMERCE': {
      label: '四川省地方志工作办公室《四川省志·商业志》介绍',
      url: 'http://scdfz.sc.gov.cn/scfzg/zssjk/scsz/dylsz18401985/content_4353',
      supports: ['F16 的药材、饮食、前店后堂、市场与赊销边界'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F16-CRAFT': {
      label: '四川省人民政府第一批省级非物质文化遗产名录',
      url: 'http://scdfz.sc.gov.cn/zwgk/fgwj/sjgfxwj/content_1982',
      supports: ['成都中药炮制、传统制剂与饮食制作存在性'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F16-FOOD': {
      label: '重庆市档案馆忠州豆腐乳档案介绍',
      url: 'https://jda.cq.gov.cn/web/article/web/content_1461371423580454912.html',
      supports: ['民国时期地方饮食加工与经营存在性'],
      status: 'source-linked-needs-final-review',
    },
  });

  C.families.sichuanmedicine = {
    key: 'sichuanmedicine',
    name: '川西医药饮食家',
    born: 1910,
    place: '成都近郊乡镇',
    defaultSeed: 1610,
    defaultNames: { 男: '唐济生', 女: '唐秀莲' },
    motif: '药铺、饮食摊、病亲照料与个人生计彼此争时间；识药不等于行医，成婚也不等于得到一名免费帮工。',
    start: { body: 48, knowledge: 20, craft: 38, mind: 42, network: 28, fame: 18 },
    startRes: { money: 22, health: 74, relation: 68, position: 35 },
    subjects: {
      mother: { label: '母亲', status: 'alive', health: 56, agency: 82, note: '经营饭食并决定自己的收入与照料上限' },
      father: { label: '父亲', status: 'alive', health: 58, agency: 72, note: '药铺柜伙，不越权看诊或改处方' },
      spouse: { label: '配偶', status: 'not-met', health: 64, agency: 76, note: '不会自动成为店员、账房或照料者' },
      household: { label: '家口', status: 'together', strength: 58, agency: 72 },
      support: { label: '安身支持', status: 'kin-and-neighbors', strength: 38, agency: 68 },
      connections: { label: '外部门路', status: 'thin', strength: 25, agency: 64 },
      workers: { label: '同事与同行', status: 'none', strength: 0, agency: 74 },
      ledger: { label: '药食营生账', status: 'family-and-workroom', strength: 34, agency: 72 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 76, note: '不默认继承药铺、食摊或照料责任' },
    },
    contacts: {
      f16_zhao_maochun: { label: '赵茂春', role: '药铺掌柜，核进货、库存、处方交接和柜伙权限', status: 'nearby', relation: 24, agency: 70, note: '可留用、记过或辞退，但也要为自己的批准负责' },
      f16_jiang_jichuan: { label: '蒋济川', role: '坐堂看诊者，为自己的判断与处方负责', status: 'nearby', relation: 18, agency: 78, note: '与药铺账目和主角能力分开' },
      f16_he_xingfang: { label: '何杏芳', role: '邻摊饮食经营者，也有自己的炉具、客人和女儿', status: 'nearby', relation: 30, agency: 86, note: '可拼摊、竞争、拆伙或拒绝无偿帮忙' },
      f16_qian_wenshu: { label: '钱文淑', role: '乡镇卫生所登记员，说明护理训练和岗位条件', status: 'distant', relation: 14, agency: 76, note: '能说明公开条件，不能保证录取' },
      f16_luo_sao: { label: '罗嫂', role: '需要反复取药和说明家中支付能力的病家', status: 'nearby', relation: 20, agency: 80, note: '可同意赊欠、转介或停止继续在本店取药' },
      f16_zhou_xiaoqin: { label: '周小琴', role: '食摊常客兼布店帮工，会当面说明分量和工时问题', status: 'nearby', relation: 22, agency: 78, note: '不是只为增加口碑出现的顾客' },
    },
  };

  Object.assign(C.routes, {
    'sichuan-pharmacy': { name: '药房柜伙与采购', family: 'sichuanmedicine', summary: '在来源、标签、处方交接、库存与病家支付之间守住权限。' },
    'sichuan-foodshop': { name: '饮食摊与小店', family: 'sichuanmedicine', summary: '从备料、顾客、坏账与合伙分账中建立自己的饮食营生。' },
    'sichuan-care': { name: '护理与卫生登记', family: 'sichuanmedicine', summary: '通过训练、值班和转介承担有限而具体的照护职责。' },
  });

  C.actions.push(
    { id: 'f16-learn-labels', name: '认药材标签与柜上权限', families: ['sichuanmedicine'], minAge: 6, maxAge: 17, spirit: 2, delta: { knowledge: 3, craft: 2, mind: 1 }, contactEffects: { f16_zhao_maochun: { relation: 1 } }, note: '先学认来源、标签和何时必须复核；不让儿童配药或看诊。' },
    { id: 'f16-help-food-stall', name: '帮母亲备料并核对收款', families: ['sichuanmedicine'], minAge: 6, maxAge: 17, spirit: 2, delta: { craft: 3, relation: 1, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 1 } }, contactEffects: { f16_he_xingfang: { relation: 1 } }, note: '原料、客户预付与家庭钱分别放置。' },
    { id: 'f16-study-hygiene', name: '识字并学习卫生登记', families: ['sichuanmedicine'], minAge: 9, spirit: 3, delta: { knowledge: 4, mind: 2 }, channels: ['books'], contactEffects: { f16_qian_wenshu: { relation: 1 } }, note: '学习记录、清洁与转介边界，不提供现实诊疗建议。' },
    { id: 'f16-pharmacy-shift', name: '在药铺核货与按单拣取', routes: ['sichuan-pharmacy'], minAge: 13, spirit: 4, careerAction: true, delta: { craft: 4, knowledge: 2, money: 2, health: -1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f16_zhao_maochun: { relation: 2 }, f16_jiang_jichuan: { relation: 1 } }, note: '按处方与复核权限做事，字样不清就退回确认。' },
    { id: 'f16-check-stock', name: '核药材来源、潮损与欠账', routes: ['sichuan-pharmacy'], minAge: 16, spirit: 3, careerAction: true, delta: { craft: 3, mind: 2, money: 1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f16_luo_sao: { relation: 1 } }, note: '把库存、病家赊欠和药铺现钱分开结算。' },
    { id: 'f16-run-food-stall', name: '备料、出摊并当日结账', routes: ['sichuan-foodshop'], minAge: 13, spirit: 4, careerAction: true, delta: { craft: 4, money: 3, health: -1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f16_he_xingfang: { relation: 2 }, f16_zhou_xiaoqin: { relation: 1 } }, note: '说明分量和食材状态，撤下不能确认质量的食物。' },
    { id: 'f16-negotiate-food-orders', name: '与顾客重谈分量、交期和返工', routes: ['sichuan-foodshop'], minAge: 18, spirit: 3, careerAction: true, delta: { mind: 3, network: 2, money: 1 }, contactEffects: { f16_zhou_xiaoqin: { relation: 2 } }, note: '用一笔具体订单形成客户结果，不用“生意兴隆”概括。' },
    { id: 'f16-care-shift', name: '完成护理值班与病人登记', routes: ['sichuan-care'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, knowledge: 2, relation: 2, health: -1 }, subjectDelta: { support: { strength: 2 } }, contactEffects: { f16_qian_wenshu: { relation: 2 }, f16_luo_sao: { relation: 1 } }, note: '记录症状和复查安排，超出职责就转给能负责的人。' },
    { id: 'f16-arrange-referral', name: '核住址、费用并安排转介', routes: ['sichuan-care'], minAge: 18, spirit: 3, careerAction: true, delta: { mind: 3, network: 2, craft: 1 }, channels: ['conversation'], contactEffects: { f16_jiang_jichuan: { relation: 1 }, f16_qian_wenshu: { relation: 2 } }, note: '转介有经手人、地址和是否抵达的后账。' }
  );

  function option(id, label, delta, echo, fact, followTitle, followText, extra) {
    return Object.assign({
      id: id, label: label, delta: delta, echo: echo, fact: fact, endingFact: true,
      followup: { title: followTitle, text: followText },
    }, extra || {});
  }

  function installDecision(item) {
    item.options.forEach(function (choice) {
      if (!choice.followup) return;
      var followup = choice.followup;
      C.ordinaryEvents.push({
        id: 'echo-' + choice.echo.replace(/:/g, '-'), title: followup.title, text: followup.text,
        year: item.followYear, priority: 45, requiresEchoes: [choice.echo],
        families: item.families ? item.families.slice() : undefined,
        routes: item.routes ? item.routes.slice() : undefined,
        sourceIds: ['SRC-F16-COMMERCE', 'SRC-F16-CRAFT'],
        reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete choice.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  installDecision({
    id: 'sichuan-path', year: 1923, followYear: 1924, families: ['sichuanmedicine'], title: '第一段成年谋生怎样试',
    prompt: '药铺、饮食摊和卫生所各给了一次有期限的机会。你要亲自问清职责、试工天数、报酬和谁来确认结果。',
    options: [
      option('pharmacy-clerk', '去药铺做柜伙试工，只在权限内核货和按单拣取', { craft: 3, knowledge: 2, money: 1 }, 'f16:path:pharmacy', '1923 年进入药铺做有期限的柜伙试工。', '药铺给出的明确答复', '试工结束后，赵茂春按核货、标签和交接记录逐项复核，确认你留作柜伙；看诊和改方仍由蒋济川负责。', { route: 'sichuan-pharmacy' }),
      option('food-shop', '与母亲和何杏芳分账，先从有限品项的饮食摊做起', { craft: 3, money: 2, relation: 1 }, 'f16:path:food', '1923 年从分账清楚的饮食摊开始谋生。', '第一批回头客与坏账', '第二年已有顾客再次来买，也有一笔赊账没有收回；原料、劳动、现金和坏账分别记在三个人名下。', { route: 'sichuan-foodshop' }),
      option('care-training', '报名护理与卫生登记训练，先确认课程和实习范围', { knowledge: 3, craft: 2, money: -1 }, 'f16:path:care', '1923 年进入护理与卫生登记训练。', '训练期后的岗位结果', '钱文淑核过出勤、登记和照护操作后，给出一段卫生所值班；你能承担的职责和必须转介的情形都写进交接。', { route: 'sichuan-care' }),
    ],
  });

  installDecision({
    id: 'route-sichuan-pharmacy-1929', year: 1929, followYear: 1930, routes: ['sichuan-pharmacy'], title: '一张字样不清的处方',
    prompt: '顾客急着赶路，但药名或用量有一处无法确认。柜上不能靠猜测留住这笔生意。',
    options: [
      option('return-for-confirmation', '找原看诊者重新确认后再拣取', { mind: 3, relation: 1, money: -1 }, 'f16:pharmacy:confirm', '1929 年将字样不清的处方退回原看诊者确认。', '确认以后少掉的一包药', '第二年，罗嫂带来另一张处方时主动预留了复核时间；店里少做了一笔急单，也没有把猜测交给病家承担。'),
      option('refuse-unclear-part', '只交付已确认部分，不清部分当面退回', { mind: 3, fame: 1, money: -1 }, 'f16:pharmacy:partial', '1929 年只按处方中已确认的部分交付。', '病家重新回来的一天', '罗嫂后来带着补清的处方回来，缺少部分才完成交接；等待造成的不便和谁作确认都被留下。'),
      option('refer-another-shop', '说明本店无法核实，协助转去能确认的药铺或机构', { network: 2, relation: 2, money: -2 }, 'f16:pharmacy:refer', '1929 年把无法核实的处方转给能负责的机构。', '转介是否抵达', '第二年收到病家的回话：人已抵达另一处药铺并重新问过；你没有获得这笔货款，却保留了可核实的去向。'),
    ],
  });

  installDecision({
    id: 'route-sichuan-pharmacy-1942', year: 1942, followYear: 1943, routes: ['sichuan-pharmacy'], title: '缺货时怎样守住柜上责任',
    prompt: '若干常用药材断货，病家增加，旧供货人又提出来源不清的替代货。',
    options: [
      option('verified-stock-only', '缩减品项，只售来源与标签能确认的库存', { money: -2, mind: 3, fame: 2 }, 'f16:pharmacy:verified', '1942 年缩减药铺品项，只保留来源可确认的库存。', '空掉的货格', '第二年，货格仍没有补满，病家却能知道哪些确实有、哪些必须另找；收入下降没有被好听话掩盖。'),
      option('coordinate-referrals', '与看诊者和其他药铺建立公开转介清单', { network: 3, relation: 2, money: -1 }, 'f16:pharmacy:network', '1942 年建立了缺货时的公开转介清单。', '一张反复改过的转介表', '第二年，几处地址失效又补上新处；转介接住部分病家，也增加了核地址和回信的工作。'),
      option('shift-to-records', '减少拣取，转做库存与病家登记', { knowledge: 2, craft: 1, money: -1, health: 2 }, 'f16:pharmacy:records', '1942 年减少柜上拣取，更多承担库存与病家登记。', '记录找回一笔错账', '第二年，登记查清一批货和两笔欠账；工资没有增加，职责和身体负担却与过去不同。'),
    ],
  });

  installDecision({
    id: 'route-sichuan-foodshop-1929', year: 1929, followYear: 1930, routes: ['sichuan-foodshop'], title: '合租摊位怎样分账',
    prompt: '何杏芳提出合租一角，但炉具、原料、每天劳动、赊账和收款都不能写成一句“合伙”。',
    options: [
      option('shared-stall-ledger', '合租摊位，逐日记录工具、劳动和各自货款', { money: 2, relation: 2, craft: 2 }, 'f16:food:share', '1929 年与何杏芳合租摊位并逐项分账。', '第一次拆分当日收入', '第二年，一笔多收的钱按原料和劳动退回两边；合租继续，谁也没有因此失去自己的客人和器具。'),
      option('transport-only', '只合作进货与运输，各自出摊收款', { network: 2, money: 2, relation: 1 }, 'f16:food:transport', '1929 年只与何杏芳合作进货运输，经营仍各自独立。', '同车不同账', '第二年，两家合运省下一段脚钱，一筐损耗仍按各自货物结算；合作范围没有被悄悄扩大。'),
      option('independent-small-menu', '保持独立摊位，缩成少量稳定品项', { craft: 3, mind: 2, money: 1 }, 'f16:food:small', '1929 年保持独立摊位并缩减经营品项。', '少了品项后的回头客', '第二年，周小琴仍为稳定的一样食物回来，收入上限较低，备料和质量也更能说清。'),
    ],
  });

  installDecision({
    id: 'route-sichuan-foodshop-1942', year: 1942, followYear: 1943, routes: ['sichuan-foodshop'], title: '原料紧张时怎样继续做饭食',
    prompt: '来客增加，原料和燃料却不稳；扩大品项会带来更多无法保证的分量与质量。',
    options: [
      option('local-food-substitute', '只用能确认的本地原料，公开说明品项变化', { craft: 3, fame: 2, money: 1 }, 'f16:food:local', '1942 年改用可确认的本地原料并说明品项变化。', '改过菜单以后', '第二年，一部分旧客不再来，新的熟客却知道每天能买到什么；分量、价格和缺货都写在摊前。'),
      option('fixed-meal-orders', '先接有数量和交期的固定饭食订单', { money: 3, network: 2, health: -2 }, 'f16:food:orders', '1942 年优先承接数量和交期明确的饭食订单。', '一张完成与退掉的订单表', '第二年，按时完成的订单带来现金，超出炉灶能力的一单被提前退回，没有变成无限加班。'),
      option('reduce-hours-care', '减少出摊时段，把一部分时间留给病亲和休息', { health: 3, relation: 2, money: -3 }, 'f16:food:reduce', '1942 年减少出摊时段，以接住照料和身体。', '少开半日的后果', '第二年，收入确实减少，病亲复诊和自己的睡眠也终于有固定时间；照料没有被写成无成本美德。'),
    ],
  });

  installDecision({
    id: 'route-sichuan-care-1929', year: 1929, followYear: 1930, routes: ['sichuan-care'], title: '训练之后接哪一种职责',
    prompt: '卫生所只能给一种起步位置：病人登记、护理值班或外出复查联络，三种都有限期与复核人。',
    options: [
      option('patient-register', '先做病人登记与欠费／救济分流', { knowledge: 3, mind: 2, money: 2 }, 'f16:care:register', '1929 年开始承担病人登记与费用分流。', '第一本被重新核过的登记册', '第二年，一处重名和一个旧地址得到更正；纸面没有治好疾病，却让复诊和经手人不再混乱。'),
      option('nursing-shift', '接护理值班，按交接范围照护并记录变化', { craft: 3, relation: 2, health: -2 }, 'f16:care:nursing', '1929 年开始承担有交接范围的护理值班。', '夜班后的交接', '第二年，钱文淑按记录确认你能继续值班，也要求减少连续夜班；照护工作同时留下技能和劳损。'),
      option('followup-contact', '负责复查地址、通知与是否抵达', { network: 3, mind: 2, money: 1 }, 'f16:care:followup', '1929 年开始负责复查联络与地址确认。', '一封退回的复查通知', '第二年，一户地址得到更新，另一封仍退回；失联没有被补写成拒诊或死亡。'),
    ],
  });

  installDecision({
    id: 'route-sichuan-care-1942', year: 1942, followYear: 1943, routes: ['sichuan-care'], title: '病人增加以后先保哪一段连续性',
    prompt: '值班、登记和转介同时增加，你不能全接，只能让不同经手人分别承担。',
    options: [
      option('keep-core-care', '保住明确交接的护理班次，其余及时转介', { craft: 3, relation: 2, health: -2 }, 'f16:care:core', '1942 年优先保住明确交接的护理班次。', '班次表被重新排过', '第二年，核心班次没有中断，超出人手的病人也留下转介去向；你的连续夜班被限制。'),
      option('split-care-records', '把护理、登记和物资分别交给不同负责人', { network: 3, mind: 3, fame: 1 }, 'f16:care:split', '1942 年把护理、登记和物资职责分给不同负责人。', '别人独立完成的一天', '第二年，你缺席半日时工作没有停止；共同承担也带来需要反复核对的交接。'),
      option('family-care-boundary', '减少一段公共值班，明确家中照料的期限', { relation: 3, health: 2, money: -2 }, 'f16:care:family', '1942 年减少一段值班并与家人谈清照料期限。', '家里重新排过的照料表', '第二年，秀莲、父母和病亲各自承担有限部分；没有一个人被默认永久停工守家。'),
    ],
  });

  installDecision({
    id: 'sichuan-war', year: 1937, followYear: 1938, families: ['sichuanmedicine'], title: '战时街市与住处先接哪一头',
    prompt: '迁入人口增加，药材、食物、燃料和住处同时承压。你只能先做一项能由自己负责并留下经手记录的安排。',
    options: [
      option('keep-verified-stock', '缩减品项，先保住来源和质量能确认的药食库存', { money: -2, mind: 3, position: 1 }, 'f16:war:stock', '1937 年缩减品项，保留来源与质量可确认的库存。', '缩减品项后的第一年', '第二年，柜上和摊位都出现空缺，顾客却能知道哪些确实有、哪些必须另找；少掉的收入被照实记下。', { keepRoute: true }),
      option('local-food-substitute', '转用可确认的本地食材，公开说明分量与价格变化', { craft: 3, money: 1, fame: 1 }, 'f16:war:food', '1937 年转用可确认的本地食材维持饭食。', '换原料后的顾客', '第二年，有旧客不接受新口味，也有迁入者成为固定顾客；营业变化没有被概括成“生意更好”。', { keepRoute: true }),
      option('split-family-work', '家人分处工作，约定公开地址、汇款与照料上限', { network: 2, relation: 2, position: -2 }, 'f16:war:split', '1937 年家人分处工作，并约定通信与照料边界。', '第一封确认地址的信', '第二年，一处工作和床位得到确认，另一名家人的来信迟到；分处没有被写成失散，也没有假装已经团聚。', { keepRoute: true }),
    ],
  });

  var sourceIds = ['SRC-F16-COMMERCE', 'SRC-F16-CRAFT', 'SRC-F16-FOOD'];
  var reviewStatus = 'runtime-regression-and-source-linked-needs-final-review';
  function scene(id, title, text, scope) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['sichuanmedicine'],
      sourceIds: sourceIds.slice(), reviewStatus: reviewStatus,
      reviewNote: '来源已绑定并进入固定种子回归；精确价格、药材规格与制度手续仍待最终史实和文字审校。',
    }, scope || {}));
  }

  scene('f16-s01', '分开的柜与罐', '父亲把药铺包纸与家中食材分柜放，母亲又把客人预付饭钱和自家零钱分进两个罐。你还不能做决定，只记住经手不等于所有。', { maxAge: 3, priority: 20 });
  scene('f16-s02', '撤下的一坛腌物', '母亲发现一坛腌物气味异常，当众撤下并记住供料人，没有因为已有熟客就继续卖。损耗、说明和是否退货都进入摊账。', { minAge: 4, maxAge: 6, priority: 20 });
  scene('f16-s03', '不肯猜的药名', '父亲按处方拣取时遇到自己不确定的字，先把包纸放在一边等蒋济川复核。柜伙的本事首先是知道何时不能越权。', { minAge: 5, maxAge: 8, priority: 21 });
  scene('f16-s04', '三个半日撞在一起', '药铺认标签、母亲摊位盘点和识字课排在同一上午。你把自己的愿望告诉父母，也听他们分别说明工钱、纸笔和谁来替班。', { minAge: 6, maxAge: 9, priority: 22 });
  scene('f16-s05', '赊药与下一批原料', '熟病家想继续赊药，家中病亲也要花钱，母亲下一批食材款当天到期。父母把三笔钱分开说，没有用一句“救人要紧”抹掉营生。', { minAge: 8, maxAge: 11, priority: 20 });
  scene('f16-s06', '秀莲问训练名额', '秀莲问药铺和护理训练是否收女学员，父亲只能替她查公开条件，不能保证名额。她又说明不愿用永久帮摊换一次报名。', { minAge: 9, maxAge: 13, genders: ['女'], priority: 23 });
  scene('f16-s07', '病亲自己的意见', '病亲说清愿意找谁看、能不能搬动以及最怕拖累哪项营生。家人先记本人意见，再核交通、费用与每个人能承担多久。', { minAge: 10, maxAge: 17, priority: 20 });
  scene('f16-s08', '三日试工', '赵茂春让你盘一格库存并把虫蛀、潮损、来源不清分别列出，只付三日试工钱。期满由谁复核、何时答复都写在纸上。', { year: 1923, routes: ['sichuan-pharmacy', 'sichuan-foodshop', 'sichuan-care'], priority: 28 });
  scene('f16-s09', '第一份工作结果', '试工或训练结束，你得到留用、继续实习或不留用的明确答复；职责、报酬和下一步随路线进入人生账，不再年年停在“去找工作”。', { year: 1924, routes: ['sichuan-pharmacy', 'sichuan-foodshop', 'sichuan-care'], priority: 10 });
  scene('f16-s10', '分量不同的一碗饭', '周小琴说今天分量与昨日不同，母亲先核是谁备料、谁收钱和是否退补。顾客、返工、成本和口碑落到这一单，而不是随机扣钱。', { routes: ['sichuan-foodshop'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f16-s11', '病家重新取药', '罗嫂带着上次的包纸回来，说明服用与复查只到哪一步。你核对处方、余药和欠账，不根据她的表情擅自判断病情。', { routes: ['sichuan-pharmacy'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f16-s12', '登记册里的同名', '卫生所两位病人同名，钱文淑要求你按住址和经手人分别核对。改正延误了半日，也避免复查通知送错一家。', { routes: ['sichuan-care'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f16-s13', '伴侣不做免费帮工', '伴侣问清夜班、病亲照料、摊债与药铺责任，明说共同生活不等于自动守摊、配药或替你照料父母。你们把家用和各自收入分开谈。', { minAge: 20, maxAge: 32, priority: 18 });
  scene('f16-s14', '一次复诊与旺时相撞', '病亲复诊和营生最忙时段持续相撞，秀莲、父母、主角和病亲各自说出能做与不能做的部分。安排设有复核日期，不是终身承诺。', { minAge: 24, maxAge: 40, priority: 17 });
  scene('f16-s15', '战时来客与原料', '外来人口增加但药食原料更难找，饭摊来客多却燃料和住处承压。机会和代价同时进入账本，没有只写“后方繁荣”。', { year: 1937, priority: 26 });
  scene('f16-s16', '变化落地的第一年', '缩品项者保住真货却少收入，转营者有新客却要重做工具，分处家人只收到一封确认地址的信。每项安排都有具体落点和缺口。', { year: 1938, priority: 10 });
  scene('f16-s17', '战后旧账与新工作', '战争结束后，药铺押款、摊位器具、卫生所岗位和异地亲属消息没有一起恢复。你只先核一项，其他部分保留经手人与未知。', { year: 1946, priority: 24 });
  scene('f16-s18', '1949 年的逐项清单', '这一年列出父母、秀莲、伴侣、病亲、雇佣、摊位、工具、库存、赊账、住处和未确认关系。民国阶段结束，此后人生仍继续。', { year: 1949, priority: 24 });
  scene('f16-s19', '父母减少固定营生', '父亲眼力和手稳不再适合独立拣取但能管旧账，母亲减少出摊仍决定自己的器具和配方。轻活、帮工或停业分别由本人协商。', { minAge: 48, maxAge: 66, priority: 15 });
  scene('f16-s20', '死亡后的药食账', '父母、病亲或合伙人死亡后，药铺押款、食摊工具、客户预付、赊账和未结工资仍需找经手人。死亡没有替系统清空资产和责任。', { minAge: 55, maxAge: 75, priority: 15 });

  C.annualRhythms.sichuanmedicine = [
    '药铺、食摊与病亲照料在这一年反复争用同一段时间；每个人都只承诺自己实际能承担的部分。',
    '原料、药材、顾客欠账和家庭开支重新核过，母亲与父亲分别保留自己营生的决定。',
    '街市消息先改变了货源和来客，完整来由后来才从报刊、同行与回信中逐步得到确认。',
  ];
  C.annualRhythms['sichuan-pharmacy'] = [
    '柜上每一次拣取都核对来源、标签与处方交接；不清楚的部分被退回确认，没有靠猜测留客。',
    '库存、病家欠账与药铺现钱分别结算，赵茂春和蒋济川也各自为权限内的决定负责。',
    '一位病家回来说明上次取药后的情况，复查、转介与欠费在不同记录里继续发生。',
  ];
  C.annualRhythms['sichuan-foodshop'] = [
    '备料、出摊、顾客意见与当日收款构成主要工作，坏掉或无法确认质量的食物被撤下。',
    '何杏芳与你核过工具、劳动、原料和各自客人，合作没有把两份营生合成一份所有权。',
    '一笔具体订单完成，另一笔因分量或交期谈不拢被退回；收入和失去的客户都照实记下。',
  ];
  C.annualRhythms['sichuan-care'] = [
    '值班、登记、复查与转介占去这一年的许多时间，超出职责的事情被交给能够负责的人。',
    '病人地址和身体变化需要反复核对；记录没有治好疾病，却让下一位经手人知道发生过什么。',
    '连续夜班影响身体，你与钱文淑重排职责；照护他人没有取消自己的求医和休息。',
  ];

  C.sceneFrames.sichuanmedicine = [
    { open: '清早，廖玉珍把食材、客人预付和家用分开，唐德生又从药铺带回一项需要核清的交接。', close: '你只接下自己能负责的一步，并把谁经手、何时复核和哪一项仍未知写下；家人的营生没有因此并进你的账。' },
    { open: '午后的街市里，赵茂春、何杏芳和一位病家分别带来库存、顾客与身体上的需要，三件事不能互相替代。', close: '当天得到一个具体结果，也留下钱、时间或关系上的代价；下一次是否继续由各当事人重新作答。' },
  ];
  C.sceneFrames['sichuan-pharmacy'] = C.sceneFrames.sichuanmedicine;
  C.sceneFrames['sichuan-foodshop'] = C.sceneFrames.sichuanmedicine;
  C.sceneFrames['sichuan-care'] = C.sceneFrames.sichuanmedicine;

  C.parentProfiles.sichuanmedicine = {
    mother: {
      name: '廖玉珍', born: 1883, occupation: '经营面食与腌制小食，也按能力照料病亲', deathAgeBase: 75,
      activities: ['核过当天食材、客人赊账和自己的周转钱', '与何杏芳谈清一次拼摊的工具和劳动', '减少半日出摊，按约陪病亲复查'],
      words: ['“摊上的钱不是谁急就能全拿走，明天还要进货。”', '“照料可以轮到我，但不能永远只轮到我。”', '“我的炉具和配方，我自己决定交给谁、什么时候停。”'],
    },
    father: {
      name: '唐德生', born: 1880, occupation: '药铺柜伙，按来源、标签、处方与复核权限收发药材', deathAgeBase: 72,
      activities: ['在药铺核对一批货的来源、潮损和经手人', '把一张字样不清的处方退回看诊者确认', '因眼力下降改做旧账与库存记录'],
      words: ['“认得药名不等于能替人看病，柜上不能越过这条线。”', '“不清楚就退回问，少一笔生意也比猜一包药强。”', '“我的旧账可以教你看，店不是一句话就成了你的。”'],
    },
  };
  C.spouseProfiles.sichuanmedicine = {
    男: { name: '何静宜', bornOffset: 1, occupation: '布店记账兼接缝补活，保留自己的工资', values: '共同生活不等于自动到药铺或食摊无偿帮工' },
    女: { name: '周明远', bornOffset: -1, occupation: '粮店帮工兼短途送货，按月结算', values: '愿意分担家务，也要求双方父母照料按时间协商' },
  };
  C.childNames.sichuanmedicine = ['唐知味', '唐念安'];

  Object.assign(C.routeCareerProfiles, {
    'sichuan-pharmacy': {
      kind: 'employment', role: '药铺柜伙兼库存记录员', workplace: '合成的益生药铺', employer: '药铺掌柜赵茂春', supervisor: '赵茂春', colleague: '柜伙许长福', publicPerson: '反复取药的罗嫂', terms: '试工三日后留用，按月结算；不越权看诊或修改处方',
      duties: '核对货源和标签、按已确认处方拣取、登记库存潮损与病家欠账',
      scenes: [
        '赵茂春让你核一格新到药材，外包标签与进货单有一处不同。你先封存这包货并找经手人，少卖半日，也没有把来源不清的东西放进药柜。',
        '罗嫂拿来一张被雨水洇开的处方。你只拣出字样能确认的部分，再请蒋济川重写其余内容；她多等了一趟，谁作确认也有了记录。',
        '月底库存与账面差一包药。你和许长福沿领用、退货与潮损记录查到一笔未登记退回，补齐经手人，没有让差额变成某人的品行结论。',
      ],
    },
    'sichuan-foodshop': {
      kind: 'business', role: '饮食摊主兼备料人', workplace: '河街合成饭食摊', employer: '自己承担盈亏的饮食摊', supervisor: '本人和合伙人按分账约定共同核对', colleague: '何杏芳', publicPerson: '常客周小琴', terms: '原料、炉具、劳动与当日收款分账；坏账和返工归到具体订单',
      duties: '采购和检查原料、备料出摊、说明分量与品项、当日收款并处理顾客退补',
      business: { enterpriseType: 'food-stall', ownership: 'sole-or-limited-partnership', employees: 1 },
      scenes: [
        '周小琴说今天一碗分量不足。你重新称过本批食材，确认备料时少算一份，当面补足；这次少收的钱和经手过程写进当日账。',
        '何杏芳提出两家合进一批原料。你们按各自筐数和损耗拆账，一筐受潮只落在它实际归属的一边，合作没有抹去两家库存。',
        '一位客人临时把十份饭食改成二十份。你只接下炉灶能按时完成的数量，其余提前退回；少了一笔收入，也没有让帮工无限延时。',
      ],
    },
    'sichuan-care': {
      kind: 'employment', role: '护理员兼卫生登记员', workplace: '合成的仁和卫生所', employer: '仁和卫生所', supervisor: '登记员钱文淑', colleague: '护理员陈桂芳', publicPerson: '复查病家罗嫂', terms: '完成训练与试班后按月结算，护理、登记与转介各有交接范围',
      duties: '完成基础护理、登记病人住址与变化、通知复查并把超出职责的情况转交',
      scenes: [
        '钱文淑发现登记册里有两位同名病人。你按住址、年龄和上次经手人拆开记录，复查通知晚了半日，却没有送错一家。',
        '夜班一名病人的情况超出你的交接范围。你先记录变化并通知能够负责的人，没有因为想表现本事自行处理；第二天谁接手也写进记录。',
        '一封复查通知被退回。你与陈桂芳核对旧地址和亲属口信，只把最后已知消息留下，没有把失联补成拒绝复查。',
      ],
    },
  });

  Object.assign(C.routeContactProfiles, {
    'sichuan-pharmacy': [
      { id: 'f16_xu_changfu', label: '许长福', role: '同柜柜伙，负责另一格库存与交接', status: 'coworker', relation: 18, born: 1904 },
      { id: 'f16_chen_yunsheng', label: '陈允生', role: '按批交货、也会被退回不清货物的药材经手人', status: 'nearby', relation: 13, born: 1891 },
      { id: 'f16_luo_sao_route', label: '罗嫂', role: '会说明支付能力和复查结果的病家', status: 'nearby', relation: 20, born: 1896 },
    ],
    'sichuan-foodshop': [
      { id: 'f16_wang_shun', label: '王顺', role: '按日帮灶并要求说清工钱和收工时间', status: 'coworker', relation: 17, born: 1912 },
      { id: 'f16_liu_huozhu', label: '刘货主', role: '供应部分食材并处理退货的经手人', status: 'nearby', relation: 13, born: 1890 },
      { id: 'f16_zhou_xiaoqin_route', label: '周小琴', role: '会当面提出分量、交期和质量问题的常客', status: 'nearby', relation: 21, born: 1907 },
    ],
    'sichuan-care': [
      { id: 'f16_chen_guifang', label: '陈桂芳', role: '同班护理员，也照料自己的母亲', status: 'coworker', relation: 21, born: 1908 },
      { id: 'f16_he_yisheng', label: '何允中', role: '接收超出护理范围情况的医师', status: 'colleague', relation: 14, born: 1887 },
      { id: 'f16_liu_ama', label: '刘阿妈', role: '需要家属共同说明住处与复查安排的病人', status: 'nearby', relation: 18, born: 1872 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'sichuan-pharmacy': ['久站后的腰腿疼痛', '药材粉尘引起的咳嗽', '核小字后的眼痛'],
    'sichuan-foodshop': ['灶前烟火引起的咳嗽', '久站后的腿痛', '饮食不定时造成的胃痛'],
    'sichuan-care': ['连续夜班后的过劳', '长期站立造成的腰痛', '接触病人后的发热'],
  });

  Object.assign(C.publicRouteProfiles, {
    'sichuan-pharmacy': {
      publicGroup: '药铺、病家与公开救济联络网', publicRole: '核缺药、病家住址与公开转介信息',
      covertRole: '借药铺往来确认伤病者平安与转移消息', infiltrationRole: '以药铺柜伙身份维持公开工作并接触地方机构',
      contact: { id: 'public_f16_huang_wenshu', label: '黄文淑', role: '核药品与病家地址的公开救济登记员', status: 'colleague', relation: 16, born: 1901 },
    },
    'sichuan-foodshop': {
      publicGroup: '街市饭食与迁入家口互助网', publicRole: '说明饭食供应、登记临时住处与轮值帮工',
      covertRole: '借街市往来确认人员是否抵达和住处是否仍有效', infiltrationRole: '以饮食经营者身份维持公开生计并接触街市消息',
      contact: { id: 'public_f16_zheng_qiaozhen', label: '郑巧珍', role: '组织街市饭食轮值、自己也靠摊位生活的经营者', status: 'nearby', relation: 17, born: 1904 },
    },
    'sichuan-care': {
      publicGroup: '卫生所、妇幼与迁入病家服务网', publicRole: '登记复查、核对住处并把超出能力的病人转介',
      covertRole: '借复查联络确认伤病者与家属最后消息', infiltrationRole: '以护理和登记工作维持公开身份并接触地方机构',
      contact: { id: 'public_f16_sun_qiulan', label: '孙秋兰', role: '负责复查与迁入病家登记的护理员', status: 'colleague', relation: 18, born: 1903 },
    },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('skilled', 'sichuan-pharmacy');
  addRouteToTrack('skilled', 'sichuan-foodshop');
  addRouteToTrack('care', 'sichuan-care');
})(typeof window !== 'undefined' ? window : globalThis);
