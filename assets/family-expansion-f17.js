// 民国人生 · F17 关中灌溉与灾荒迁移家庭运行时包 v0.7.4
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f17.js');

  C.version = '0.7.4';
  C.familyDecisionKeys.guanzhongirrigation = { path: 'guanzhong-path', war: 'guanzhong-war' };
  Object.assign(C.designRegistry.families.F17, {
    designStatus: 'runtime-reviewed-first-round',
    runtimeStatus: 'playable-verified',
    runtimeFamilyKey: 'guanzhongirrigation',
  });
  C.runtimeFamilyDesignMap.guanzhongirrigation = 'F17';
  Object.assign(C.legacyRouteDomainMap, {
    'guanzhong-farmwater': 'D06',
    'guanzhong-market': 'D05',
    'guanzhong-migration': 'D40',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F17-IRRIGATION': {
      label: '陕西省地方志办公室《泾惠渠志》',
      url: 'https://dfz.shaanxi.gov.cn/zslm/fzzlk/dqcs/201706/P020240925365205471358.pdf',
      supports: ['关中近代引泾工程、灌区、轮水、管理和工程维护背景'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F17-FAMINE': {
      label: '陕西省地方志办公室陕西省近代史迹资料',
      url: 'https://dfz.shaanxi.gov.cn/zslm/sxsq/msgj/201405/t20140513_2621656.html',
      supports: ['1929 年久旱、大馑和迁往其他地方就食的史实边界'],
      status: 'source-linked-needs-final-review',
    },
  });

  C.families.guanzhongirrigation = {
    key: 'guanzhongirrigation',
    name: '关中灌溉迁移家',
    born: 1910,
    place: '关中东部合成乡村',
    defaultSeed: 1710,
    defaultNames: { 男: '马保川', 女: '马秀梅' },
    motif: '地、水次、种粮、粮债与外出工作逐项确认；旱灾改变生活，但不会用一句“逃荒”吞掉资产、亲人和后来几十年。',
    start: { body: 54, knowledge: 16, craft: 34, mind: 40, network: 30, fame: 20 },
    startRes: { money: 18, health: 72, relation: 70, position: 28 },
    subjects: {
      mother: { label: '母亲', status: 'alive', health: 58, agency: 84, note: '掌管口粮、种粮、纺线收入与借贷边界' },
      father: { label: '父亲', status: 'alive', health: 62, agency: 74, note: '耕作和做季节渠工，不能替全村分水' },
      spouse: { label: '配偶', status: 'not-met', health: 65, agency: 78, note: '是否返乡、汇款和照料两地老人都要重新协商' },
      household: { label: '家口', status: 'together', strength: 60, agency: 74 },
      support: { label: '安身支持', status: 'kin-neighbor-and-market', strength: 36, agency: 72 },
      connections: { label: '异地门路', status: 'one-confirmed-address', strength: 22, agency: 68 },
      workers: { label: '换工与同事', status: 'seasonal', strength: 20, agency: 76 },
      ledger: { label: '地水粮债账', status: 'separate-records', strength: 38, agency: 74 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 76, note: '不自动继承地债、轮水争议或返乡义务' },
    },
    contacts: {
      f17_qiao_sane: { label: '乔三娥', role: '邻村寡居农户兼纺织经营者，有自己的地、水次和孩子', status: 'nearby', relation: 31, agency: 88, note: '可换工、争水、拒借或迁走' },
      f17_wei_yongnian: { label: '魏永年', role: '记录已确认轮水、停水、修护与争议的经手人', status: 'nearby', relation: 20, agency: 72, note: '能记账和作证，不能凭空创造水量' },
      f17_gao_shunlai: { label: '高顺来', role: '集市粮店帮工兼季节运输人', status: 'nearby', relation: 22, agency: 76, note: '能给试工，不能保证长久位置' },
      f17_ma_xiumei: { label: '马秀梅', role: '想学水账、集市工作或城市手艺的手足', status: 'nearby', relation: 54, agency: 88, note: '自己决定工作、婚姻与住处' },
      f17_tian_sao: { label: '田嫂', role: '借过种粮、也会归还或拒绝继续借粮的亲族', status: 'nearby', relation: 25, agency: 78, note: '借贷和照料都按实际能力重新回答' },
      f17_liu_zhanggui: { label: '刘掌柜', role: '集市粮店东家，核袋号、秤数、工钱和缺额', status: 'distant', relation: 14, agency: 70, note: '可留用、欠薪或结束短工' },
    },
  };

  Object.assign(C.routes, {
    'guanzhong-farmwater': { name: '耕作、轮水与季节渠工', family: 'guanzhongirrigation', summary: '在地块、种粮、轮水记录、修护换工和身体承受之间过日子。' },
    'guanzhong-market': { name: '集市粮店与季节运输', family: 'guanzhongirrigation', summary: '核秤、寄存粮、袋号、车脚和短工结算，为家庭建立第二份现金收入。' },
    'guanzhong-migration': { name: '灾荒迁移与异地做工', family: 'guanzhongirrigation', summary: '凭已确认的住处和工作线索迁移，逐件处理留下的地物、通信和返乡边界。' },
  });

  C.actions.push(
    { id: 'f17-learn-water-ledger', name: '认田块、农具与轮水记录', families: ['guanzhongirrigation'], minAge: 6, maxAge: 17, spirit: 2, delta: { craft: 3, knowledge: 2, mind: 1 }, contactEffects: { f17_wei_yongnian: { relation: 1 } }, note: '记清哪块地、哪次轮水与谁经手，不让孩子替村里分水。' },
    { id: 'f17-help-grain-spinning', name: '帮母亲分口粮、种粮与纺线账', families: ['guanzhongirrigation'], minAge: 6, maxAge: 17, spirit: 2, delta: { craft: 2, relation: 2, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 1 } }, contactEffects: { f17_ma_xiumei: { relation: 1 } }, note: '家粮、种粮、代存粮和母亲收入分别记。' },
    { id: 'f17-learn-market-scale', name: '去集市学识字、认秤与袋号', families: ['guanzhongirrigation'], minAge: 9, spirit: 3, delta: { knowledge: 4, mind: 2, network: 1 }, channels: ['conversation'], contactEffects: { f17_gao_shunlai: { relation: 1 } }, note: '学习可核对的称量、寄存和车脚记录。' },
    { id: 'f17-work-field-water', name: '照地块与轮水安排完成农活', routes: ['guanzhong-farmwater'], minAge: 13, spirit: 4, careerAction: true, delta: { body: 3, craft: 3, money: 1, health: -1 }, subjectDelta: { ledger: { strength: 2 }, workers: { strength: 1 } }, contactEffects: { f17_qiao_sane: { relation: 1 }, f17_wei_yongnian: { relation: 1 } }, note: '按实际轮到的地块做工，缺水地另记，不把全部收成写成一个数。' },
    { id: 'f17-maintain-channel', name: '参加有记录的清淤与修护换工', routes: ['guanzhong-farmwater'], minAge: 16, spirit: 4, careerAction: true, delta: { body: 2, craft: 3, relation: 2, health: -2 }, subjectDelta: { workers: { strength: 2 } }, contactEffects: { f17_he_laoshi: { relation: 2 } }, note: '清淤、修护、换工天数和身体损耗分别记录。' },
    { id: 'f17-market-weighing', name: '在粮店核秤、袋号和寄存粮', routes: ['guanzhong-market'], minAge: 13, spirit: 3, careerAction: true, delta: { knowledge: 2, craft: 2, money: 2 }, contactEffects: { f17_gao_shunlai: { relation: 2 }, f17_liu_zhanggui: { relation: 1 } }, note: '按当日工钱结算，破袋、短秤和寄存责任逐项确认。' },
    { id: 'f17-seasonal-transport', name: '跟车送粮并核对车脚与交接', routes: ['guanzhong-market'], minAge: 16, spirit: 4, careerAction: true, delta: { body: 2, network: 2, money: 3, health: -1 }, contactEffects: { f17_gao_shunlai: { relation: 2 } }, note: '只交给已确认的领取人，迟到、破包和车脚各有经手记录。' },
    { id: 'f17-migrant-warehouse-shift', name: '在异地仓场做装卸与记包短工', routes: ['guanzhong-migration'], minAge: 13, spirit: 4, careerAction: true, delta: { body: 3, money: 2, network: 1, health: -2 }, subjectDelta: { connections: { strength: 2 } }, contactEffects: { f17_zhao_laifu: { relation: 2 }, f17_feng_dechang: { relation: 1 } }, note: '床位和短工分别确认，不把暂住写成已经安家。' },
    { id: 'f17-confirm-address-remittance', name: '核住处、寄信并按上限汇款', routes: ['guanzhong-migration'], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 2, relation: 2, money: -1, network: 2 }, channels: ['conversation'], subjectDelta: { connections: { strength: 2 }, household: { strength: 1 } }, contactEffects: { f17_wu_shen: { relation: 2 }, f17_ma_xiumei: { relation: 1 } }, note: '只记录已寄出、已收到和仍未回信，不把通信当作团聚。' }
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
        sourceIds: ['SRC-F17-IRRIGATION', 'SRC-F17-FAMINE'],
        reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete choice.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  installDecision({
    id: 'guanzhong-path', year: 1923, followYear: 1924, families: ['guanzhongirrigation'], title: '第一段成年谋生怎样试',
    prompt: '田地与渠工、集市粮店、异地仓场各给出一段有期限的机会。你要先问清地点、职责、工钱、食宿和谁给最后答复。',
    options: [
      option('farm-water-work', '留在地里兼做渠工，把轮水和换工写清', { craft: 3, body: 2, relation: 1 }, 'f17:path:farmwater', '1923 年留乡做耕作与有记录的季节渠工。', '第一季地块与工钱结果', '第二年，轮到水的地块留下实际收成，未轮到的地块另记损失；清淤换工按天确认，没有把全家劳力写成免费。', { route: 'guanzhong-farmwater' }),
      option('market-grain-work', '去集市粮店试做核秤、寄存与送货', { knowledge: 2, craft: 2, money: 1 }, 'f17:path:market', '1923 年进入集市粮店做有期限试工。', '粮店给出的明确答复', '刘掌柜按袋号、秤数和交接记录确认你继续做帮工；高顺来说明固定缺额仍要逐季重谈，工钱按实际班次结。', { route: 'guanzhong-market' }),
      option('verified-migration-work', '去已核住处的异地仓场，先接短工再确认能否留下', { network: 2, money: 1, relation: -1 }, 'f17:path:migration', '1923 年凭已确认地址去异地仓场做短工。', '床位与工作分别得到答复', '第二年，床位可以再住一季，仓场只给固定几日工；你把留乡家人的地址、已汇出的钱和尚未收到的回信分开记录。', { route: 'guanzhong-migration' }),
    ],
  });

  installDecision({
    id: 'route-guanzhong-farmwater-1929', year: 1929, followYear: 1930, routes: ['guanzhong-farmwater'], title: '久旱时先保哪一项',
    prompt: '本季轮水缩短，种粮、口粮和债都不能同时保住。你只能先做一项能由当事人核实的安排。',
    options: [
      option('verify-water-and-shrink', '与邻户核轮水后缩种，保住能浇到的地块', { mind: 3, relation: 2, money: -2 }, 'f17:farm:drought-verify', '1929 年核过轮水后缩减种植地块。', '缩种后的第一季', '第二年，少种的地没有凭空有收成，保下的地也只得到有限粮食；乔三娥与魏永年各自保留自己的记录。'),
      option('keep-seed-grain', '先封存最低种粮，另找口粮与分期还债办法', { craft: 2, mind: 2, relation: -1 }, 'f17:farm:seed', '1929 年先封存最低种粮并重谈粮债。', '没有动用的一袋种粮', '第二年，那袋粮进入播种而不是饭锅；家里因此少吃和欠下一段债，孙桂枝也保留是否再借纺线钱的决定。'),
      option('seasonal-work-for-grain', '放下本季争议地，去做有期限的换粮短工', { body: -1, money: 2, network: 2 }, 'f17:farm:seasonal', '1929 年暂放争议地，改做有期限的换粮短工。', '换回粮以后空着的地', '第二年，短工换回一笔粮，原地块仍缺水且杂草增加；收入没有替你确认土地和下一季水次。'),
    ],
  });

  installDecision({
    id: 'route-guanzhong-farmwater-1942', year: 1942, followYear: 1943, routes: ['guanzhong-farmwater'], title: '劳力和修护都不足时怎样继续',
    prompt: '父亲腰腿转弱，渠段仍要修，家中只有有限劳力。地、换工和身体必须分别安排。',
    options: [
      option('maintain-core-plot', '缩到能照看的核心地块，其余停止承诺', { craft: 2, health: 2, money: -2 }, 'f17:farm:core', '1942 年缩到能够实际照看的核心地块。', '减少地块后的账', '第二年，核心地块得到照看，放下的地不再被算入预期收成；家人少了过劳，也少了一部分粮。'),
      option('join-dredging-ledger', '参加清淤换工，但写清每人天数与替班', { body: 2, relation: 3, health: -2 }, 'f17:farm:dredge', '1942 年参加有名单与替班记录的渠段修护。', '换工名单上的缺口', '第二年，渠段完成一段修护，一户未能出工也留下原因；你得到约定水次，没有把集体事务写成无代价。'),
      option('reduce-heavy-labor', '停止重渠工，改认地、记账和协调轻活', { knowledge: 2, mind: 2, money: -1, health: 2 }, 'f17:farm:light', '1942 年停止重渠工，改做轮水与地块记录。', '换成轻活的一年', '第二年，你少了一笔重工钱，却能继续核对田块与水次；重活由具名换工者承担并另算。'),
    ],
  });

  installDecision({
    id: 'route-guanzhong-market-1929', year: 1929, followYear: 1930, routes: ['guanzhong-market'], title: '粮紧以后柜上先守哪条线',
    prompt: '寄存粮、店里货、赈济登记和主顾欠账同时挤到柜上，任何一袋都不能只凭熟人一句话改名。',
    options: [
      option('public-relief-ledger', '按公开条件协助登记赈济，不替任何人保证领取', { knowledge: 3, relation: 2, money: -1 }, 'f17:market:relief', '1929 年按公开条件协助登记赈济。', '名单给出的不同结果', '第二年，有人按记录领到一份，也有人因条件或份额不足没有领到；你只保留申请、答复和经手人，不把登记写成已经获救。'),
      option('protect-deposit-grain', '先封存寄存粮，逐袋找存粮人确认', { mind: 3, fame: 2, money: -2 }, 'f17:market:deposit', '1929 年先封存并核对寄存粮。', '被领走和仍封存的粮', '第二年，三袋由本人领走，一袋仍找不到经手人；店里少卖了一部分粮，也没有把寄存物变成自有货。'),
      option('move-stock-with-owner', '只转运归属清楚的店货和家粮', { network: 2, craft: 2, money: 1 }, 'f17:market:move', '1929 年只转运归属能够确认的粮货。', '到站后的少一袋', '第二年，交接时发现一袋破损，刘掌柜、高顺来和车脚分别核记录；损失落到具体批次，没有平均摊给全部帮工。'),
    ],
  });

  installDecision({
    id: 'route-guanzhong-market-1942', year: 1942, followYear: 1943, routes: ['guanzhong-market'], title: '短工、送货和家中照料怎样排',
    prompt: '粮店只给有限班次，送货路更远，父母又需要帮助。你不能把三项都写成自己独力完成。',
    options: [
      option('fixed-scale-shifts', '保住固定核秤班次，其余不接', { money: 2, mind: 2, relation: -1 }, 'f17:market:fixed', '1942 年只保留固定核秤班次。', '一张较短的班次表', '第二年，固定班次按约结钱，临时送货另找了人；收入有上限，家中也知道你哪几日能够回来。'),
      option('shared-transport', '与高顺来分段送货，各自核交接和车脚', { network: 3, money: 2, health: -1 }, 'f17:market:transport', '1942 年与高顺来分段承担送货。', '两段交接的货单', '第二年，一批货在中途完成交接，各自工钱和破损范围也分开；合作没有把全部路线责任压给一个人。'),
      option('leave-unsafe-credit', '拒绝来源和归属不清的赊货，承受少工钱', { mind: 3, fame: 1, money: -2 }, 'f17:market:credit', '1942 年拒绝经手归属不清的赊货。', '没有接下的一车货', '第二年，店里少给你两次班，也有寄存人继续找你核旧袋号；拒绝没有自动带来奖励。'),
    ],
  });

  installDecision({
    id: 'route-guanzhong-migration-1929', year: 1929, followYear: 1930, routes: ['guanzhong-migration'], title: '家人怎样从旱灾中分开移动',
    prompt: '只确认一处亲属地址和一段短工，车上带不走全部人和物。谁先走、谁暂留都要由本人同意。',
    options: [
      option('send-vulnerable-first', '先送体弱者去已确认亲属处，主角留后处理地物', { relation: 3, money: -2, mind: 2 }, 'f17:migrate:vulnerable', '1929 年先送体弱家人去已确认住处。', '两处分别收到的消息', '第二年，亲属回信确认人已抵达，主角仍在原处处理委托和路费；分开不是失散，也还不是团聚。'),
      option('whole-household-confirmed-address', '全家只去已确认有床位和短工线索的地方', { network: 3, money: -3, relation: 1 }, 'f17:migrate:household', '1929 年家口前往一处已确认住处与短工线索。', '抵达后的第一张清单', '第二年，床位能继续，工作仍按日找；带来的织具、农具和借据分别入账，留下的地物仍待亲邻回信。'),
      option('stay-for-seasonal-work', '主角留异地做短工，家人按自己条件决定是否随后来', { money: 3, relation: -2, network: 2 }, 'f17:migrate:work', '1929 年主角留异地做短工，家人未被自动带走。', '没有同时抵达的人', '第二年，一人决定随后来，另一人继续留乡照看自己的营生；你的汇款已经寄出，但是否收到仍要等回信。'),
    ],
  });

  installDecision({
    id: 'route-guanzhong-migration-1942', year: 1942, followYear: 1943, routes: ['guanzhong-migration'], title: '异地工作和返乡线索怎样取舍',
    prompt: '异地雇主给出下一季工作，原村也传来地与水次可能核回的消息；两边都不是保证。',
    options: [
      option('keep-city-work', '先续已确认工作，托具名亲邻核原村地水', { money: 3, network: 2, relation: -1 }, 'f17:migrate:city', '1942 年先续异地工作并委托亲邻核乡里地水。', '工作续下与乡信未齐', '第二年，工作按月继续，乡里只确认一块地的最后经手人；留城不等于放弃，委托也不等于已经收回。'),
      option('return-check-land', '本人返乡逐项核田、水次与家人意愿', { relation: 2, money: -3, mind: 2 }, 'f17:migrate:return', '1942 年返乡核田、水次和家人去留。', '返乡后没有复原的生活', '第二年，一处田界得到确认，水次仍有争议；异地岗位已由别人接下，返乡带来事实也带来失去的工钱。'),
      option('two-place-household', '两地分居，约定汇款、探亲和照料上限', { relation: 2, network: 2, health: -1 }, 'f17:migrate:twoplaces', '1942 年形成有期限的两地生活安排。', '第一次按约复核两地安排', '第二年，汇款到达一次，探亲因路途延期；配偶和父母分别说明是否愿意继续，而不是永久等候。'),
    ],
  });

  installDecision({
    id: 'guanzhong-war', year: 1937, followYear: 1938, families: ['guanzhongirrigation'], title: '交通与工作变化时先保哪条确认线',
    prompt: '路途、粮运和住处都更不稳定。主角只能先把一条地址、工作或返乡线索核清，不能替家人统一去留。',
    options: [
      option('keep-family-address-ledger', '保住公开通信地址，逐人记录最后已知住处', { relation: 2, mind: 3, money: -1 }, 'f17:war:address', '1937 年建立家人最后已知地址与回信记录。', '回来的信和退回的信', '第二年，两封信得到回音，一封原址失效；系统保留最后已知地点，没有把退信写成死亡。', { keepRoute: true }),
      option('split-work-with-addresses', '家人分处工作，各自保留工资、床位和联系上限', { network: 3, money: 1, relation: -1 }, 'f17:war:split', '1937 年家人分处工作并约定地址与汇款边界。', '各自工作后的第一次对账', '第二年，两处工作都有具体结果，一笔汇款延期；分处没有取消婚家，也没有让任何人天然守家。', { keepRoute: true }),
      option('return-to-known-kin', '只回到已确认能暂住的亲族处，再重新找活', { relation: 2, money: -2, position: -1 }, 'f17:war:kin', '1937 年先回到已确认的亲族住处。', '住下以后仍要找工作', '第二年，床位得到续住答复，原工作已经结束；亲族提供住处，没有被写成无限供养。', { keepRoute: true }),
    ],
  });

  var sourceIds = ['SRC-F17-IRRIGATION', 'SRC-F17-FAMINE'];
  var reviewStatus = 'runtime-regression-and-source-linked-needs-final-review';
  function scene(id, title, text, scope) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['guanzhongirrigation'],
      sourceIds: sourceIds.slice(), reviewStatus: reviewStatus,
      reviewNote: '来源已绑定并进入固定种子回归；精确水费、地租、赈济量、工价与地方手续仍待最终史实和敏感性审校。',
    }, scope || {}));
  }

  scene('f17-s01', '分开扎口的几袋粮', '父亲把自家农具、借来的铁件和渠工公用工具分开，母亲把口粮、种粮与替乔三娥代存的一袋粮分别扎口。经手不等于所有。', { maxAge: 3, priority: 20 });
  scene('f17-s02', '门后记下的两块地', '一次轮水比预期短，父亲把哪块地浇到、哪块没轮到写在门后，没有把具体损失说成“今年什么都完了”。', { minAge: 4, maxAge: 6, priority: 20 });
  scene('f17-s03', '差了半日的水次', '乔三娥拿自己的记录来对，和马家说法差半日。双方先找魏永年核账，合作和争议同时存在。', { minAge: 5, maxAge: 8, priority: 21 });
  scene('f17-s04', '三个上午撞在一起', '田间认水、母亲粮账和集市识秤排在同一上午。你说出想学什么，也听父母说明农时、替班和纸笔成本。', { minAge: 6, maxAge: 9, priority: 22 });
  scene('f17-s05', '上游停水以后', '上游停水与本村记录不合，父亲和乔三娥分别标出受影响地块，再决定核对、缩种或转工，没人能用一句话替全村归责。', { minAge: 8, maxAge: 11, priority: 20 });
  scene('f17-s06', '秀梅想学水账', '秀梅想跟魏永年学记水账，也想去集市识字。她要求查公开条件，不接受用永久守家换一次学习。', { minAge: 9, maxAge: 13, genders: ['女'], priority: 23 });
  scene('f17-s07', '父亲弯不下腰', '父亲清渠后腰腿疼痛，母亲先问他能否弯腰、挑担和走远，再谈休工、换轻活或复查；身体不是一个静态扣分。', { minAge: 10, maxAge: 17, priority: 21 });
  scene('f17-s08', '第一段有期限的试工', '田地渠工、粮店核秤和异地仓场都只给有限机会。你逐项问清职责、工钱、食宿、经手人和答复日期。', { year: 1923, routes: ['guanzhong-farmwater', 'guanzhong-market', 'guanzhong-migration'], priority: 28 });
  scene('f17-s09', '次年得到明确结果', '试工结束后，你得到继续做、只留季节工或不留用的明确答复；路线、岗位、报酬和下一步进入人生账，不再年年只写找工作。', { year: 1924, routes: ['guanzhong-farmwater', 'guanzhong-market', 'guanzhong-migration'], priority: 10 });
  scene('f17-s10', '十几袋寄存粮', '高顺来让你核袋号和破口，只按当日结钱。寄存粮、店货和工钱分账，少一袋也先找交接记录。', { routes: ['guanzhong-market'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f17-s11', '轮到和没轮到的地', '魏永年与你核过一次轮水，乔三娥也带来她的记号。得到水的地、未得到的地和换工天数各自进入账本。', { routes: ['guanzhong-farmwater'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f17-s12', '一处床位和几日短工', '异地亲属只确认一处床位，仓场只确认几日工。你把抵达、续住、工作、汇款与尚未回信分别记录。', { routes: ['guanzhong-migration'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f17-s13', '1929 年的逐项清单', '井、渠、粮价和借粮都变得紧张，家中已有虚弱者。你们列出能申请的救济、已确认亲属地址、地物与每个人愿不愿移动。', { year: 1929, priority: 26 });
  scene('f17-s14', '一辆车带不走的东西', '农具、织具、粮、被褥和借据不能全带走。父母与秀梅分别决定带走、委托、变卖或保留未知，主角不能一人代签。', { minAge: 19, maxAge: 25, priority: 18 });
  scene('f17-s15', '伴侣问两地怎样生活', '伴侣问清是否返乡、两地老人、地债、工资与未来照料，不接受主角用“都是一家人”跳过分账、住处和探亲上限。', { minAge: 20, maxAge: 33, priority: 18 });
  scene('f17-s16', '抵达第一年', '异地有床位却无长期工作，留下者有田却缺水与劳力，第一封信也未确认收到。迁移没有被一句“去了城里”概括。', { minAge: 20, maxAge: 36, routes: ['guanzhong-migration'], priority: 17 });
  scene('f17-s17', '原村和异地各有一个答复', '原村只确认部分田和水次能再核，异地雇主则给出下一季工作。回、留和两地生活都有资格、成本与失去的东西。', { minAge: 28, maxAge: 42, priority: 17 });
  scene('f17-s18', '1949 年的地水人账', '这一年列出父母、秀梅、伴侣、乔家关系、地与水次、当前雇佣、两地住处、债和未知亲属。民国阶段结束，人生继续。', { year: 1949, priority: 24 });
  scene('f17-s19', '父母减少重活', '父亲不能再做重渠工但仍能认地和旧记录，母亲减少纺线仍决定自己的织具与借贷。轻活、帮工与迁居分别协商。', { minAge: 48, maxAge: 66, priority: 15 });
  scene('f17-s20', '死亡以后仍有争议', '父母、乔三娥或异地亲属死亡后，地、水次、工具、寄存粮、借据和最后地址仍有已知与未知。死亡不替系统判清所有权。', { minAge: 55, maxAge: 75, priority: 15 });

  C.annualRhythms.guanzhongirrigation = [
    '地块、轮水、种粮与口粮在这一年重新核过，父母分别说明自己能承担的劳动、借贷和照料上限。',
    '集市工钱、农时和一处异地地址互相挤压；已确认结果进入账，未回信的部分继续保持未知。',
    '你与乔三娥或魏永年核对一项具体记录，争议没有因此全部消失，但下一步由谁经手已经清楚。',
  ];
  C.annualRhythms['guanzhong-farmwater'] = [
    '你按实际轮水照看地块，又把未浇到的地和换工天数分别记下；收成、欠缺和身体损耗没有合成一句农忙。',
    '渠段修护由具名换工者分担，父亲与乔三娥也各自决定自己的天数；公共事务没有取消个人生计。',
    '一季结束后，种粮、口粮、债和下一次水次重新核过，不能确认的地方保留争议。',
  ];
  C.annualRhythms['guanzhong-market'] = [
    '粮店的袋号、秤数、寄存人与当日工钱逐项核对，一处破损找到经手人，另一处仍等答复。',
    '你与高顺来分段送货，车脚、迟到和交接各自入账；刘掌柜只为自己批准的安排负责。',
    '一位存粮人回来领粮，另一笔赊欠没有收回；现金和关系都留下具体变化。',
  ];
  C.annualRhythms['guanzhong-migration'] = [
    '异地床位、仓场短工和一封家信构成这一年的生活；三项得到答复的时间并不相同。',
    '你按约汇出一笔钱并核对工作班次，留乡家人仍自己决定农时、照料和是否迁来。',
    '返乡消息和异地岗位同时出现，你只先确认其中一项，其余去向没有被补写成已经决定。',
  ];
  C.sceneFrames.guanzhongirrigation = [
    { open: '天刚亮，孙桂枝先分开口粮、种粮和代存粮，马守田又带回一项需要核对的轮水或换工记录。', close: '当天只确认了一部分结果；谁经手、下一次何时复核、哪块地或哪封信仍未知，都被分别留下。' },
    { open: '集市与田间的安排撞在一起，高顺来、乔三娥和魏永年各带来一项不同责任，任何人都不能替另一户或另一份工作作答。', close: '你完成自己能负责的一步，也付出工钱、时间、身体或关系上的实际代价；其余当事人保留下一次选择。' },
  ];
  C.sceneFrames['guanzhong-farmwater'] = C.sceneFrames.guanzhongirrigation;
  C.sceneFrames['guanzhong-market'] = C.sceneFrames.guanzhongirrigation;
  C.sceneFrames['guanzhong-migration'] = C.sceneFrames.guanzhongirrigation;

  C.parentProfiles.guanzhongirrigation = {
    mother: {
      name: '孙桂枝', born: 1883, occupation: '管粮、纺线与亲族借贷，也决定自己是否迁移', deathAgeBase: 76,
      activities: ['分过口粮、种粮和一笔亲族借粮', '把纺线钱与家中地债分开核算', '与秀梅商量自己愿意承担多久照料'],
      words: ['“种粮动了，明年就要另找种；我的纺线钱也不能当作没有来处。”', '“去不去、什么时候去，我要知道住处和路上谁接手。”', '“照料可以轮，但不是谁留在家里就归谁一辈子。”'],
    },
    father: {
      name: '马守田', born: 1880, occupation: '小农兼季节渠工，按记录参与轮水和清淤', deathAgeBase: 72,
      activities: ['核过一块地的轮水与未浇到部分', '按换工名单参加一段渠沟修护', '腰腿转弱后改做认地与旧记录'],
      words: ['“我能记自己这块和做过几天工，不能替上游那户认账。”', '“缺水不是全村一模一样，先把哪块没轮到说清。”', '“重活停了不等于地就是你的，旧账还得逐项交。”'],
    },
  };
  C.spouseProfiles.guanzhongirrigation = {
    男: { name: '周兰英', bornOffset: 1, occupation: '集市纺织与小货帮工，保留自己的工资和住处决定', values: '共同生活不等于自动随主角返乡或承担全部老人照料' },
    女: { name: '何清川', bornOffset: -1, occupation: '粮店送货与季节农工，按班结钱', values: '愿意分担两地生活，但要求汇款、探亲与双方父母照料都有上限' },
  };
  C.childNames.guanzhongirrigation = ['马念渠', '马知禾'];

  Object.assign(C.routeCareerProfiles, {
    'guanzhong-farmwater': {
      kind: 'family-work', role: '耕作人兼轮水记录与季节渠工', workplace: '合成的北塬村田地与东渠换工段', employer: '马家农作与具名换工组', supervisor: '轮水记录经手人魏永年', colleague: '邻户乔三娥', publicPerson: '借粮亲族田嫂', terms: '自家地按收成结算，渠工按记录的换工天数与水次核对',
      duties: '照看实际地块、核轮水、保种粮并参加有限清淤修护',
      scenes: [
        '魏永年带来本次轮水记录，你和乔三娥逐块对照实际浇到的位置。半块地没有轮到就另记损失，没有把争议平均摊掉。',
        '清淤换工时父亲腰腿不适，你只接下自己约定的工段，另一个工段由具名替班者完成；天数、水次和是否欠工分别留下。',
        '收季后，孙桂枝先封存最低种粮，再与你核口粮和粮债。少收的部分没有用下一季尚未发生的收成补平。',
      ],
    },
    'guanzhong-market': {
      kind: 'employment', role: '粮店记秤与寄存粮帮工', workplace: '合成的南集粮店与送货车路', employer: '粮店东家刘掌柜', supervisor: '高顺来', colleague: '帮工陈小锁', publicPerson: '存粮人田嫂', terms: '试工后按班结钱；寄存粮、店货和车脚分别核对',
      duties: '核秤、记袋号与破口、保管寄存记录并按货单完成有限送货',
      scenes: [
        '田嫂来领寄存粮，你按袋号和旧破口核对后才交出。另一袋无人认领继续封存，没有被刘掌柜算进当天店货。',
        '高顺来与你分段送一批粮，途中一袋受潮。你们按交接点找出发生在哪一段，返工和车脚没有平均扣给所有帮工。',
        '月底工钱少算半日，你拿班次记录找刘掌柜复核。补回的钱有明确日期，尚未结的一次远路车脚仍留到下次。',
      ],
    },
    'guanzhong-migration': {
      kind: 'employment', role: '异地粮栈装卸与记包短工', workplace: '西安近郊合成粮栈与仓场', employer: '仓场东家冯德昌', supervisor: '班头高顺来', colleague: '同住短工赵来福', publicPerson: '栈房邻人吴婶', terms: '先按日结短工；床位、固定班次和汇款分别确认',
      duties: '按货单装卸、记录包数与破损、核当天工钱并保留家人通信地址',
      scenes: [
        '冯德昌只给三日装卸，你按货单核完包数并当日结钱。栈房床位可以再住七日，工作和住处没有被写成同一个承诺。',
        '赵来福替你看一班货，你替他寄一封家信。两件事分别经手，谁也没有因此成为对方的永久担保人。',
        '一笔汇款寄出后迟迟没有回信。你保留票据和最后已知地址，只记“尚未确认收到”，没有补写家人已经怎样。',
      ],
    },
  });

  Object.assign(C.routeContactProfiles, {
    'guanzhong-farmwater': [
      { id: 'f17_he_laoshi', label: '何老实', role: '同一渠段换工者，也要照看自己的两块地', status: 'coworker', relation: 17, born: 1895 },
      { id: 'f17_chen_mujiang', label: '陈木匠', role: '修农具并按件收钱的乡村手艺人', status: 'nearby', relation: 13, born: 1888 },
      { id: 'f17_tian_sao_route', label: '田嫂', role: '借过种粮、会说明能否归还的亲族农户', status: 'nearby', relation: 20, born: 1892 },
    ],
    'guanzhong-market': [
      { id: 'f17_chen_xiaosuo', label: '陈小锁', role: '同班核袋和装卸的粮店帮工', status: 'coworker', relation: 18, born: 1908 },
      { id: 'f17_wu_chefu', label: '吴车夫', role: '按段结车脚并核交接的运输人', status: 'nearby', relation: 14, born: 1890 },
      { id: 'f17_feng_ke', label: '冯客', role: '寄存粮后会回来核袋号与破口的主顾', status: 'nearby', relation: 19, born: 1898 },
    ],
    'guanzhong-migration': [
      { id: 'f17_zhao_laifu', label: '赵来福', role: '同住栈房、也在找固定班次的短工', status: 'coworker', relation: 20, born: 1909 },
      { id: 'f17_feng_dechang', label: '冯德昌', role: '按日给仓场短工并决定是否续班的东家', status: 'employer', relation: 12, born: 1883 },
      { id: 'f17_wu_shen', label: '吴婶', role: '经营栈房床位并替住客收过信的邻人', status: 'nearby', relation: 18, born: 1887 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'guanzhong-farmwater': ['长期弯腰后的腰腿疼痛', '暑热劳作后的眩晕', '粮食不足时的乏力'],
    'guanzhong-market': ['装卸后的腰背疼痛', '粮尘引起的咳嗽', '赶集早起造成的长期疲惫'],
    'guanzhong-migration': ['长途移动后的足伤', '仓场重活后的腰痛', '住处拥挤时的发热'],
  });

  Object.assign(C.publicRouteProfiles, {
    'guanzhong-farmwater': {
      publicGroup: '合成的渠段修护与轮水记录互助组', publicRole: '核换工、轮水和困难家口的公开记录',
      covertRole: '借地水往来确认迁出家口的最后消息', infiltrationRole: '以渠工和农户身份维持公开工作并接触地方经手人',
      contact: { id: 'public_f17_han_ruolan', label: '韩若兰', role: '核渠段换工与困难家口的合成互助记录员', status: 'colleague', relation: 16, born: 1902 },
    },
    'guanzhong-market': {
      publicGroup: '合成的集市寄存与困难家口登记网', publicRole: '核寄存粮、短工缺额与公开救济条件',
      covertRole: '借货路确认迁出者是否抵达和地址是否有效', infiltrationRole: '以粮店帮工身份维持公开生计并接触街面经手人',
      contact: { id: 'public_f17_du_yulan', label: '杜玉兰', role: '登记寄存粮与困难家口答复的合成互助经手人', status: 'nearby', relation: 17, born: 1904 },
    },
    'guanzhong-migration': {
      publicGroup: '合成的异地短工与住处互助网', publicRole: '登记床位、短工答复和失效地址',
      covertRole: '借栈房与仓场往来确认迁移者最后消息', infiltrationRole: '以仓场短工身份维持公开工作并接触地方机构',
      contact: { id: 'public_f17_song_ying', label: '宋英', role: '核异地床位、工期和退信的合成互助经手人', status: 'colleague', relation: 18, born: 1905 },
    },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('skilled', 'guanzhong-farmwater');
  addRouteToTrack('literate', 'guanzhong-market');
  addRouteToTrack('manual', 'guanzhong-migration');
})(typeof window !== 'undefined' ? window : globalThis);
