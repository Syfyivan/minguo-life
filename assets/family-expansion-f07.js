// 民国人生 · F07 华北小农、长工、庙会与铁路家庭运行时包 v0.7.17
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f07.js');

  C.version = '0.7.17';
  C.familyDecisionKeys.northchinadroughtfarm = { path: 'northchina-farm-path', war: 'northchina-farm-war-1937' };
  Object.assign(C.designRegistry.families.F07, {
    designStatus: 'runtime-reviewed-first-round', runtimeStatus: 'playable-verified', runtimeFamilyKey: 'northchinadroughtfarm',
  });
  C.runtimeFamilyDesignMap.northchinadroughtfarm = 'F07';
  Object.assign(C.legacyRouteDomainMap, {
    'northchina-seasonal-farm-laborer': 'D02',
    'northchina-temple-fair-vendor': 'D05',
    'northchina-railway-maintenance-worker': 'D09',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F07-HEBEI-ARCHIVE': { label: '国家档案局：河北省档案馆馆藏介绍', url: 'https://www.saac.gov.cn/daj/c100172/201806/bb981f442ed349fa94744aff4b35c674.shtml', supports: ['清末民国直隶、河北的钱粮册、户籍、地契、民事诉讼、财政金融、物价与粮食档案支持土地、债务和粮账边界'], status: 'source-reviewed-first-round' },
    'SRC-F07-NORTH-FAMINE-1921': { label: '盐田档案与史志信息网：1921 年中国北方饥荒', url: 'https://www.yantian.gov.cn/ytdayszxxw/lsjt/content/post_11736844.html', supports: ['1921 年北方持续干旱和饥荒使儿童、老弱者、逃荒者面临严重生计危机；合成人物的具体死亡与迁移仍逐人确认'], status: 'source-reviewed-first-round' },
    'SRC-F07-TEMPLE-FAIR': { label: '北京市文物局：妙峰山进香图与古香道', url: 'https://wwj.beijing.gov.cn/bjww/wwjzzcslm/1731063/1731066/djs/1731072/1731340/index.html', supports: ['明清至民国的妙峰山庙会兼具香道、茶棚、杂耍和商贩设摊；庙会是有日期、路线、摊货、损耗和收摊的季节市场'], status: 'source-reviewed-first-round' },
    'SRC-F07-RAILWAY-HERITAGE': { label: '北京市文物局：京张铁路南口段至八达岭段', url: 'https://wwj.beijing.gov.cn/bjww/362771/362779/dqpqgzdwwbhdw/523544/index.html', supports: ['1905—1909 年建设的京张铁路包含车站、机车车辆厂、线路、职工宿舍与监工处；铁路工作必须写具体工段、设施和岗位边界'], status: 'source-reviewed-first-round' },
    'SRC-F07-RAILWAY-WORKERS': { label: '首都之窗：百年二七厂见证中国早期工人运动', url: 'https://www.beijing.gov.cn/renwen/whrl/rdtj/202106/t20210610_2410391.html', supports: ['长辛店铁路工厂留有工资单、工厂和工人教育及劳动组织史料；工资、识字、公开活动与政治身份不能互相自动推导'], status: 'source-reviewed-first-round' },
    'SRC-F07-LUGOU-1937': { label: '国家档案局：档案里的卢沟桥事变', url: 'https://www.saac.gov.cn/zt/2014-08/22/content_63605.htm', supports: ['1937 年 7 月卢沟桥事变及北平、天津相继沦陷改变华北道路、铁路、工作与家人通信；角色只知道渠道能够确认的部分'], status: 'source-reviewed-first-round' },
    'SRC-F07-FANGSHAN-FLOOD-1939': { label: '北京市文物局：房山民国石碑与 1939 年洪水', url: 'https://wwj.beijing.gov.cn/bjww/362760/362770/1696632/index.html', supports: ['1939 年永定河及房山、良乡洪灾影响村庄、铁路和迁移；具体损失必须落到住处、田地、道路和人员确认'], status: 'source-reviewed-first-round' },
    'SRC-F07-NORTH-DROUGHT-1942': { label: '河北省政协：华北与太行区 1942—1943 年旱灾资料', url: 'https://www.hebzx.gov.cn/system/2024/08/19/030302264.shtml', supports: ['1942—1943 年华北大旱使农业歉收、救灾与地方生产安排承受长期压力；不能把区域数字平均写到每户'], status: 'source-reviewed-first-round' },
    'SRC-F07-LAND-REFORM-1950': { label: '中华人民共和国土地改革法', url: 'https://www.sqlzw.gov.cn/sitesources/zmdjw/page_pc/ztzl/dsxxjyzl/dswx/articlef521a67ddc494a04bbd18b8556d2b960.html', supports: ['1950 年土地改革法规定土地、耕畜、农具、房屋与工商业有不同处理边界；角色必须经历当地调查、登记和答复，不能从全国法条直接跳到个人结果'], status: 'source-reviewed-first-round' },
  });

  C.families.northchinadroughtfarm = {
    key: 'northchinadroughtfarm', name: '华北小农、长工与灾荒迁移家', born: 1910,
    place: '华北合成永定河支流村、庙会古道与铁路工段之间', defaultSeed: 710,
    defaultNames: { 男: '赵守田', 女: '赵秋禾' },
    motif: '少量自种地、借种和工债、母亲管的口粮与牲畜份额、父亲的季工日、庙会货担和铁路工段分别记账；遇到灾荒不等于全家同时失去一切，沿铁路外出也不等于已经找到工作。',
    start: { body: 48, knowledge: 23, craft: 34, mind: 41, network: 27, fame: 8 },
    startRes: { money: 7, health: 74, relation: 68, position: 14 },
    subjects: {
      mother: { label: '母亲', status: 'alive-working', health: 65, agency: 99, note: '掌握自己经手的口粮、种子、纺线收入、牲畜照料份额和卖或不卖的决定' },
      father: { label: '父亲', status: 'alive-working', health: 67, agency: 97, note: '逐季核自己的地、借种、长工日、饭食抵扣、工钱和是否继续受雇' },
      spouse: { label: '配偶', status: 'not-met', health: 71, agency: 98, note: '婚后保留工资、旧债、父母照料、住处、迁移和是否共同经营的决定' },
      household: { label: '少地、借种、粮缸、牲畜份额与季节劳力', status: 'shared-life-separate-rights', strength: 48, agency: 97 },
      support: { label: '邻户、亲族、庙会同行、同工与工段住处', status: 'bounded-reciprocity', strength: 29, agency: 97 },
      connections: { label: '季工、货路、铁路试工与迁移消息', status: 'introduction-needs-verification', strength: 24, agency: 96 },
      workers: { label: '季工、摊贩帮手与养路临工', status: 'separate-wages-tools-and-exit', strength: 20, agency: 98 },
      ledger: { label: '田地使用、借种、粮账、牲畜、工日、货账、工票、住处与债务', status: 'confirmed-partial-disputed', strength: 30, agency: 99 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 92, note: '不自动继承土地、牲畜、摊货、工段岗位、债务、迁移决定或养老责任' },
    },
    contacts: {
      f07_zhao_mancang: { label: '赵满仓', role: '耕少量地并逐日核长工、季工饭食与工钱的父亲', status: 'family', relation: 66, agency: 97, note: '可失地、换雇主、转铁路杂工、病休或晚年只做轻活，不让主角替他认欠工或卖资产' },
      f07_yang_suqin: { label: '杨素琴', role: '管口粮、种子、纺线收入与牲畜照料份额的母亲', status: 'family', relation: 74, agency: 99, note: '可拒绝卖牲畜或拿走纺线收入还他人债，会迁移、病休、独立摆货或停止劳动' },
      f07_zhao_erning: { label: '赵二宁', role: '在识字、庙会买卖和外出做工之间作自己选择的手足', status: 'family', relation: 57, agency: 99, born: 1913, note: '不默认守地、随主角或参加任何组织，可先迁、回乡、成家、失联或另建生活' },
      f07_guo_chunting: { label: '郭春亭', role: '按农时雇季工并面对自己债务和结算压力的较大农户', status: 'nearby', relation: 21, agency: 95, born: 1878, note: '可补付、部分结算、辞工或再雇，不是永久反派也不提供无限庇护' },
      f07_feng_yuezhi: { label: '冯月枝', role: '跑庙会粮食小买卖并照料幼弟、保留驴车份额的邻户', status: 'nearby', relation: 34, agency: 99, born: 1905, note: '可合运、拒借、卖自己的份额、迁亲族处或独立经营，不因友情自动担保' },
      f07_sun_yanfu: { label: '孙延福', role: '有自己的工票、工具、伤病和调段决定，只带人到工段核名试工的养路临工', status: 'nearby', relation: 25, agency: 97, born: 1888, note: '介绍只到核验和试工，可调段、受伤、停招、离职或给出公开退路信息' },
    },
  };

  Object.assign(C.routes, {
    'northchina-seasonal-farm-laborer': { name: '华北农忙季工、长工与小农生产', family: 'northchinadroughtfarm', summary: '逐季核地块、借种、牲畜、工日、饭食抵扣、实发工钱、伤病、欠工和离雇，不把多年劳动写成田权。' },
    'northchina-temple-fair-vendor': { name: '华北庙会货担、合运与乡村摊贩', family: 'northchinadroughtfarm', summary: '按庙期、香道、货主、驴车份额、摊位、叫价、成交、坏货、赊欠、收摊与停市逐次结算。' },
    'northchina-railway-maintenance-worker': { name: '华北铁路养路、巡检与工段临工', family: 'northchinadroughtfarm', summary: '经过核名、体检、试工和答复进入具名工段，处理枕木、道砟、巡检、工票、住处、欠薪、事故、调段与退出。' },
  });

  C.actions.push(
    { id: 'f07-grain-seed-animal-ledger', name: '跟母亲核口粮、种子、纺线收入与牲畜份额', families: ['northchinadroughtfarm'], minAge: 6, spirit: 3, delta: { knowledge: 2, craft: 2, relation: 2 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f07_yang_suqin: { relation: 2 }, f07_zhao_erning: { relation: 1 } }, note: '粮食用途和牲畜照料份额逐项记；家庭缺债不等于主角或父亲可以替母亲出售。' },
    { id: 'f07-farm-day-wage-ledger', name: '跟父亲核地块、借种、长工日、饭食抵扣与实发工钱', families: ['northchinadroughtfarm'], minAge: 6, spirit: 3, delta: { body: 2, knowledge: 2, craft: 2 }, subjectDelta: { father: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f07_zhao_mancang: { relation: 2 }, f07_guo_chunting: { relation: 1 } }, note: '多留半日、两顿饭和欠下的工钱分别记，不能用“帮东家干活”概括。' },
    { id: 'f07-literacy-price-address', name: '与二宁学数字、叫价成交、工票和迁移地址', families: ['northchinadroughtfarm'], minAge: 7, spirit: 3, delta: { knowledge: 4, mind: 2, network: 1 }, channels: ['books'], contactEffects: { f07_zhao_erning: { relation: 2 }, f07_feng_yuezhi: { relation: 1 } }, note: '识字能分叫价和成交、保存地址与工票，不能自动获得贷款、摊位或铁路岗位。' },
    { id: 'f07-seasonal-farm-cycle', name: '完成一季播种、锄收、牲畜借用、工日与结算', routes: ['northchina-seasonal-farm-laborer'], minAge: 15, spirit: 4, careerAction: true, delta: { body: 3, craft: 2, money: 2, health: -1 }, contactEffects: { f07_guo_chunting: { relation: 1 }, f07_farm_coworker: { relation: 2 } }, note: '地块、种子、工具、饭食、工日、伤病和实收工资逐项写清。' },
    { id: 'f07-seasonal-wage-health-followup', name: '核欠工、饭食抵扣、伤病、续雇与离雇答复', routes: ['northchina-seasonal-farm-laborer'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 3, health: 1 }, contactEffects: { f07_guo_chunting: { relation: 1 }, f07_farm_coworker: { relation: 2 } }, note: '付清、部分结算、无果和辞工各自结案，不让“去讨工钱”无限重复。' },
    { id: 'f07-temple-fair-trade-cycle', name: '完成一次备货、合运、摆摊、叫价、成交、坏货与收摊', routes: ['northchina-temple-fair-vendor'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 2, network: 3, money: 2, health: -1 }, contactEffects: { f07_feng_yuezhi: { relation: 2 }, f07_market_keeper: { relation: 1 } }, note: '庙期、货主、驴车、摊位、货损、实收与未售货分别记录。' },
    { id: 'f07-temple-fair-account-followup', name: '核货主、车脚、摊位、赊欠、退货和下一次庙期', routes: ['northchina-temple-fair-vendor'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, network: 2, mind: 2 }, contactEffects: { f07_feng_yuezhi: { relation: 1 }, f07_market_customer: { relation: 1 } }, note: '庙会热闹不等于每摊盈利；停市、雨损、赊欠和改路线都有具体答复。' },
    { id: 'f07-railway-shift-ticket', name: '完成一班换枕、整砟、巡线、工具归还与工票', routes: ['northchina-railway-maintenance-worker'], minAge: 15, spirit: 4, careerAction: true, delta: { body: 3, craft: 3, money: 2, health: -2 }, contactEffects: { f07_sun_yanfu: { relation: 1 }, f07_rail_coworker: { relation: 2 } }, note: '工段、里程、领工人、工具、封锁时段、完成检查和实发工资同班结算。' },
    { id: 'f07-railway-wage-safety-followup', name: '核工票、停工、伤病、住处、调段和留用答复', routes: ['northchina-railway-maintenance-worker'], minAge: 17, spirit: 3, careerAction: true, delta: { mind: 2, knowledge: 2, health: 1 }, contactEffects: { f07_rail_supervisor: { relation: 1 }, f07_rail_coworker: { relation: 2 } }, note: '介绍与试工不等于正式编制；工票、伤病、工棚、调段和返乡分别处理。' }
  );

  var sourceIds = ['SRC-F07-HEBEI-ARCHIVE', 'SRC-F07-NORTH-FAMINE-1921', 'SRC-F07-TEMPLE-FAIR', 'SRC-F07-RAILWAY-HERITAGE', 'SRC-F07-RAILWAY-WORKERS', 'SRC-F07-LUGOU-1937', 'SRC-F07-FANGSHAN-FLOOD-1939', 'SRC-F07-NORTH-DROUGHT-1942', 'SRC-F07-LAND-REFORM-1950'];
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

  installDecision({ id: 'northchina-farm-child-work-1918', year: 1918, followYear: 1919, families: ['northchinadroughtfarm'], title: '放牲畜、送饭认工日和识字赶庙会撞在同一上午时先做什么', prompt: '父亲在别人地里做工，母亲要看种子和牲畜，二宁想去识字并辨庙会叫价。你只能投入半日，其他人会继续自己的安排。', options: [
    option('f07-child-animal', '跟母亲看牲畜走路、喂料并核谁有处置权', { craft: 3, relation: 2 }, 'f07:child:animal', '1918 年第一次记录牲畜健康和照料份额。', '蹄部不适得到观察，出售决定仍未发生', '母亲请邻人看走路情况并让牲畜休息；你没有凭一次异常诊断重病，也没有替她答应出售。'),
    option('f07-child-farm', '给父亲送饭，记下地块、领工人和多留的半日', { body: 2, knowledge: 2, relation: 1 }, 'f07:child:farm', '1918 年第一次留下父亲的具名工日。', '半日工被记下，怎样结算仍待东家答复', '父亲与同工各自说明听见的约定；两顿饭和工资分开，没有用一句“管饭”抹掉工日。'),
    option('f07-child-literacy', '跟二宁去短时识字，练叫价、成交、工票和地址', { knowledge: 4, mind: 2 }, 'f07:child:literacy', '1918 年与二宁开始学习价格、工票和地址。', '能标记未确认的叫价，却没有取得摊货', '冯月枝让你们分清叫价与真正成交；二宁保留自己是否继续读书或跑庙会的决定。'),
  ] });
  installDecision({ id: 'northchina-famine-1921', year: 1921, followYear: 1922, families: ['northchinadroughtfarm'], title: '北方饥荒压到本村时怎样分口粮、种子、牲畜和外出试路', prompt: '档案只证明区域危机，不能替赵家决定谁死亡、谁卖资产或谁外出。母亲、父亲、二宁和主角分别表态，未确认消息保留未知。', options: [
    option('f07-famine-ration-seed', '缩短每日口粮但封存来季种子，逐人记身体变化', { health: -3, money: -2, mind: 2 }, 'f07:famine:ration', '1921 年保留一部分来季种子并实行具名口粮表。', '下一季仍能播一小块，家人出现不同身体后果', '母亲掌管种子封存，父亲减少重活，二宁需要额外照看；没有把全家写成同一健康值。'),
    option('f07-famine-seasonal-route', '由一人先去有确认人的镇集找短工，留下回信地址', { money: -2, network: 2, relation: -1 }, 'f07:famine:route', '1921 年一名家人按已核路线外出试工。', '只找到有期限的搬运和一处床位', '外出者先寄地址和工期，未找到长期活；留乡者继续管粮、种子和牲畜，迁移没有一次跳过多年。'),
    option('f07-famine-sell-share', '只出售母亲同意的牲畜份额，保留另一部分生产工具', { money: 2, position: -2, relation: 1 }, 'f07:famine:sell', '1921 年经母亲同意出售一项牲畜份额。', '口粮暂时接住，下一季耕作能力下降', '买主、价格和份额写清，母亲保留未卖部分；出售不是自动解债，也没有替二宁决定去向。'),
  ] });
  installDecision({ id: 'northchina-farm-path', year: 1924, followYear: 1925, families: ['northchinadroughtfarm'], title: '三份有日期、试做、结算也可能落选的谋生里选哪一份', prompt: '农忙季工、庙会货担和铁路养路都要说明负责人、物件、报酬、住处、检查与答复日。孙延福的介绍不等于铁路留用。', options: [
    option('f07-path-seasonal', '给郭春亭做一季农活，先核地块、工日、饭食和结算日', { body: 2, craft: 2, money: 1 }, 'f07:path:seasonal', '1924 年进入有工日和结算答复的季节农业劳动。', '一季结束得到实发工钱和是否续雇的答复', '男女都能做农活和核账，但重负远路、粮账、家务和照料时间按实际岗位分别记录。', { route: 'northchina-seasonal-farm-laborer' }),
    option('f07-path-vendor', '与冯月枝各带自己的货和份额跑一次庙会', { craft: 2, network: 2, money: 1 }, 'f07:path:vendor', '1924 年进入有货主、路线、摊位和收摊账的庙会买卖。', '第一趟结清车脚、坏货、实收和未售货', '冯月枝保留驴车和货物份额，主角只处分自己的批次；庙会人多不等于一定赚钱。', { route: 'northchina-temple-fair-vendor' }),
    option('f07-path-rail', '跟孙延福去工段核名、体力、工具、试工、工棚和答复日', { body: 2, craft: 2, knowledge: 1 }, 'f07:path:rail', '1924 年进入有工段、任务和留用答复的铁路试工。', '试工结束只得到具名工序和期限岗位', '女性较常先做工具料具登记、碎石筛分与近段检查，男性较常先做换枕整砟；双方都按工票领试工钱，也都可能落选。', { route: 'northchina-railway-maintenance-worker' }),
  ] });
  installDecision({ id: 'route-northchina-seasonal-farm-laborer-1929', year: 1929, followYear: 1930, routes: ['northchina-seasonal-farm-laborer'], title: '一季工钱被扣饭食、又有一天跌伤时怎样结账', prompt: '约定工日、饭食、伤日、治疗、同工证言和实发工资分别核。不能把欠工一次写成自动讨回，也不能为了钱抹掉身体过程。', options: [
    option('f07-seasonal-treat-witness', '先治疗并请同工核班次、跌伤和约定饭食', { health: 3, knowledge: 2, money: -1 }, 'f07:seasonal:treat', '1929 年先治疗并留下工日和伤情见证。', '伤日不计工，未伤工日补回一部分', '郭春亭按见证补一段工资，治疗费用另记；同工只证明亲见部分，没有替你保证长期工作。'),
    option('f07-seasonal-partial-leave', '领已确认部分后结束本季，换一户有明示条件的活', { money: 1, mind: 3, position: -1 }, 'f07:seasonal:leave', '1929 年部分结算后结束本次受雇。', '下一户先写清工日和饭食，不继承旧口头约定', '未付部分保留为争议，旧东家没有永久消失或自动变好；你的离雇记录和新试做分开。'),
    option('f07-seasonal-finish-recorded', '只做完已约天数，要求逐日见证后结清', { body: -2, craft: 2, relation: 1 }, 'f07:seasonal:finish', '1929 年按见证做完已约工日并停止加班。', '约定工日结清，额外招呼没有继续', '实发与饭食抵扣逐项列出，伤痛进入复查；没有把硬撑写成勇敢奖励或自动痊愈。'),
  ] });
  installDecision({ id: 'route-northchina-temple-fair-vendor-1929', year: 1929, followYear: 1930, routes: ['northchina-temple-fair-vendor'], title: '雨后坏货、车脚和一笔赊欠挤在同一次收摊时怎样结', prompt: '冯月枝的驴车、两家货主、你的货、顾客赊欠、坏货和摊位各有所有人。同行关系不能把亏损平分成一句“共同承担”。', options: [
    option('f07-vendor-itemized-settle', '逐批盘点坏货、实收、车脚和各自份额', { knowledge: 3, relation: 2, money: -1 }, 'f07:vendor:itemized', '1929 年逐批结清一次雨损庙会货账。', '两批坏货各归经手人，一笔赊欠留下期限', '冯月枝保留驴车份额，你没有拿她的实收补自己的坏货；下一次先缩小易坏货。'),
    option('f07-vendor-cash-only', '停止新赊欠，接受少卖并把未售货退还货主', { money: 1, network: -1, mind: 2 }, 'f07:vendor:cash', '1929 年改为小批现钱交易并退回未售货。', '现金少但账目结束，老顾客重新决定是否来', '退货数量和成色有答复，停止赊欠没有被写成永久失去人缘，也没有强迫冯月枝跟随。'),
    option('f07-vendor-change-fair', '核另一处庙期和摊位后再转路线，不带走他人顾客', { money: -2, network: 3, position: -1 }, 'f07:vendor:route', '1929 年核实另一处庙期、路线和临时摊位。', '只得到一次试摆，路费和未售风险增加', '新地点有自己的经手人和顾客；冯月枝决定是否同去，你没有把她的驴车与熟客变成路线资产。'),
  ] });
  installDecision({ id: 'route-northchina-railway-maintenance-worker-1929', year: 1929, followYear: 1930, routes: ['northchina-railway-maintenance-worker'], title: '工票少记停工时数、工具又有一件损坏时怎样核', prompt: '天气停工、工段封锁、你经手的工具、正常磨损、领工检查和工资分别核；认识孙延福不能替代记录。', options: [
    option('f07-rail-ticket-tool-review', '按里程、班次、封锁时段和工具领还逐项复核', { knowledge: 3, mind: 2, relation: 1 }, 'f07:rail:review', '1929 年复核一次工票与工具争议。', '补回一段待命时数，工具磨损由工段登记', '领工人确认停工待命和正常磨损，未做工时不计；补薪、未补和工具责任分别写清。'),
    option('f07-rail-change-section', '接受已确认工资，转另一小段重新试做', { money: 1, craft: 2, position: -1 }, 'f07:rail:section', '1929 年领清已确认工资并转段试做。', '新段有新领工人和两周答复期', '旧争议保留，新工段不继承旧口头承诺；调段不是升职，工棚床位也要重新确认。'),
    option('f07-rail-leave-after-pay', '归还工具、领清已确认部分并结束本段工作', { money: 1, mind: 3, position: -2 }, 'f07:rail:leave', '1929 年在归还工具后离开养路工段。', '本段工作结案，下一步另核季工或货运活', '你保留工票副记和地址，轨道、枕木、工具与床位均归原单位；离职不等于失去全部技能。'),
  ] });
  installDecision({ id: 'northchina-farm-war-1937', year: 1937, followYear: 1938, families: ['northchinadroughtfarm'], title: '卢沟桥事变后道路、铁路、庙会和村庄消息同时中断时先确认什么', prompt: '父母、二宁、伴侣、田地、牲畜、摊货、工资、工棚和最后地址各自不同。真实战事进入时代层，合成人物只按两条相容消息确认生死。', options: [
    option('f07-war-stay-village', '留乡逐户核家人、粮种、牲畜和可用道路', { craft: 2, relation: 2, money: -3 }, 'f07:war:stay', '1937 年留乡核家人、粮种、牲畜和道路。', '家庭缩小生产，铁路亲友仍只到最后工段消息', '父母分别决定留乡工作，二宁若外出只保留最后地址；没有把失联补写成死亡。', { warTurn: 'stay-village' }),
    option('f07-war-rail-town', '带个人凭据去镇站核临时民生工作和住处', { knowledge: 2, money: -3, network: 2 }, 'f07:war:rail', '1937 年到镇站重新核工作、床位和通信地址。', '只得到有期限的搬运与路面清理活', '原工段没有自动恢复，你按日领薪；母亲牲畜和父亲地账留在原处，家信分开保存。', { warTurn: 'rail-town' }),
    option('f07-war-split-household', '一人先探路，其余守粮和地并约定两种核信方式', { mind: 3, relation: 1, money: -2 }, 'f07:war:split', '1937 年家庭分两处生活并留下核信办法。', '两处各有地址，仍有一名亲友消息未确认', '探路者只核到临时活，留乡者处理粮债和牲畜；迟到信保留未知，没有强行团聚。', { warTurn: 'split-household' }),
  ] });
  installDecision({ id: 'route-northchina-seasonal-farm-laborer-1946', year: 1946, followYear: 1947, routes: ['northchina-seasonal-farm-laborer'], title: '战后继续受雇、自接小活还是组织有限农忙队', prompt: '地块、种子、工具、牲畜、工日和旧债都有所有人。经营先写工资、借具、伤病、欠工和退出，不把劳动经验变成土地所有。', options: [
    option('f07-seasonal-remain-waged', '继续按季受雇，逐日核饭食、工钱和休工', { money: 2, craft: 2, health: 1 }, 'f07:seasonal:waged', '1946 年继续有工日和结算答复的季节受雇。', '一季工钱结清，下一季仍重新约定', '你没有取得东家地、粮或牲畜，父亲减少重活；母亲纺线收入没有自动补欠工。'),
    option('f07-seasonal-own-service', '用自有小工具接三户具名农忙短活', { money: -2, craft: 3, network: 1 }, 'f07:seasonal:service', '1946 年建立不雇人的有限农忙服务担。', '第一季只接三户具名短活', '每户写清地块、工具、工日和结算；没有取得土地、种粮或公共调工权。', { enterpriseStart: { id: 'f07-independent-farm-service', name: '华北合成守田农忙服务担', domainKey: 'D02', kind: 'bounded-farm-day-service', workplace: '华北合成村三处具名地块', product: '有地块、工具、工日、饭食、伤病、完工与结算记录的短期农忙劳动', employees: 0, asset: { id: 'f07-service-tools', kind: 'documented-personal-farm-tools', description: '主角自购并逐件登记的锄、镰、绳和扁担' }, license: { id: 'f07-service-record', kind: 'documented-farm-service-record', authority: '合成村镇公开经手人', scope: '只限具名地块劳务，不含地权、牲畜或调工权限' } } }),
    option('f07-seasonal-limited-team', '与一名同工按劳动和工具份额组织有限农忙队', { money: -4, body: -1, network: 2 }, 'f07:seasonal:team', '1946 年建立有四名雇工和退出边界的农忙队。', '首年只完成两季具名农忙', '四名雇工逐日领薪，同工只投入列明工具和劳动；借具、伙食、伤病、欠工与退伙分别结算。', { enterpriseStart: { id: 'f07-limited-farm-team', name: '华北合成田安农忙小队', domainKey: 'D02', kind: 'bounded-seasonal-farm-team', workplace: '华北合成村镇具名承作地块', supplier: '具名工具出借人与粮食供给人', product: '有东家、地块、工日、饭食、工资、工具和完工记录的季节农业劳动', employees: 4, partners: [{ personId: 'contact:f07_farm_coworker', role: '有限劳动与自有工具合伙人' }], asset: { id: 'f07-team-tools', kind: 'documented-partner-farm-tools', description: '按所有人列明的农具、绳索和运输用具' }, debt: { id: 'f07-team-wage-credit', creditor: '具名粮食与工具出借人', purpose: '首季伙食、借具费与雇工工资' }, license: { id: 'f07-team-record', kind: 'documented-seasonal-work-record', authority: '合成村镇公开经手人', scope: '只限公开农忙劳务，不含土地或征调权限' } } }),
  ] });
  installDecision({ id: 'route-northchina-temple-fair-vendor-1946', year: 1946, followYear: 1947, routes: ['northchina-temple-fair-vendor'], title: '战后继续赶庙会、独立小摊还是与冯月枝有限合运', prompt: '庙期、货主、驴车、摊位、库存、顾客和两人的旧债分别核。合运不吞掉个人货物，热闹也不保证盈利。', options: [
    option('f07-vendor-remain-itinerant', '继续小批走会，逐次盘点并当日收摊', { money: 2, network: 2, health: 1 }, 'f07:vendor:itinerant', '1946 年继续逐次结账的小批庙会走卖。', '两次有实收，一次因天气提前收摊', '冯月枝决定自己的路线和货物，你只处分自己经手批次；叫价和成交继续分开。'),
    option('f07-vendor-independent-stall', '用自购货和器具租一次固定试摊', { money: -2, craft: 2, position: 1 }, 'f07:vendor:stall', '1946 年建立不雇人的独立庙会试摊。', '首年只登记两次庙期和有限库存', '货主、库存、摊租、坏货与实收逐批记录；没有取得永久摊位、庙产或冯月枝顾客。', { enterpriseStart: { id: 'f07-independent-fair-stall', name: '华北合成秋禾庙会货摊', domainKey: 'D05', kind: 'bounded-temple-fair-stall', workplace: '华北合成古道两次登记庙期摊位', supplier: '两家具名粮食与日用小货供货人', product: '有货主、庙期、摊位、叫价、成交、损耗、实收与退货记录的小批货摊', employees: 0, asset: { id: 'f07-stall-tools', kind: 'documented-personal-stall-tools', description: '主角自购的货筐、防雨布、量具和有限库存' }, license: { id: 'f07-stall-record', kind: 'documented-fair-stall-record', authority: '合成庙会公开经手人', scope: '只限两次登记庙期和列明货品，不含永久摊位或庙产' } } }),
    option('f07-vendor-limited-haul', '与冯月枝按驴车、货物、现金和劳动组织有限合运', { money: -5, relation: 3, network: 2 }, 'f07:vendor:haul', '1946 年建立有两名雇员和两方份额的有限庙会合运。', '首年只跑两处公开庙期和三批货', '两名雇员按趟领薪，冯月枝的驴车份额、货物和照料时间独立；坏货、赊欠、停会、退货和退伙逐项结算。', { enterpriseStart: { id: 'f07-temple-fair-haul', name: '华北合成月禾庙会合运', domainKey: 'D05', kind: 'bounded-temple-fair-haul', workplace: '华北合成古道两处庙会与公开寄货点', supplier: '具名粮食、干货与日用小货供货人', product: '有货主、庙期、路线、车脚、摊位、损耗、工资、实收与退回记录的有限合运', employees: 2, partners: [{ personId: 'contact:f07_feng_yuezhi', role: '独立驴车份额、货物与路线劳动合伙人' }], asset: { id: 'f07-haul-cart-stock', kind: 'documented-partner-cart-and-stock', description: '双方分别列明的驴车份额、货筐、防雨布、量具和库存' }, debt: { id: 'f07-haul-working-credit', creditor: '具名货主与车脚提供人', purpose: '首批货款、车脚、摊租与雇员工资' }, license: { id: 'f07-haul-record', kind: 'documented-fair-haul-record', authority: '合成两处庙会公开经手人', scope: '只限列明货物和登记庙期，不含垄断路线或他人顾客' } } }),
  ] });
  installDecision({ id: 'route-northchina-railway-maintenance-worker-1946', year: 1946, followYear: 1947, routes: ['northchina-railway-maintenance-worker'], title: '战后回工段、转工具登记还是建立有限民用整修组', prompt: '工龄、工票、轨道、枕木、工具和工棚分别核。多年养路不等于拥有铁路；经营只能做列明的民用场地和搬运整修。', options: [
    option('f07-rail-return-waged', '重新核工段、工票和住处，继续受薪养路', { money: 2, craft: 2, health: 1 }, 'f07:rail:waged', '1946 年重新得到有工段和工资答复的受薪岗位。', '旧工龄只核到可证明部分', '你按班领薪并归还工具，未证明年资保留争议；孙延福另有自己的调段和退休答复。'),
    option('f07-rail-tools-records', '转做料具登记、工票复核与近段巡检', { knowledge: 2, craft: 2, health: 1 }, 'f07:rail:records', '1946 年转到有检查人和台账的料具登记岗位。', '第一年查出两次领还差异和一段待修路基', '你只记录可观察的料具与工票，不处分铁路资产或决定通车；工资和工作负担另核。'),
    option('f07-rail-limited-repair', '与一名工友用自购工具建立有限民用场地整修组', { money: -5, craft: 3, network: 2 }, 'f07:rail:group', '1946 年建立有三名雇员和两方份额的有限整修组。', '首年只有两家公开委托人', '三名雇员按月领薪，工友与你各列现金、劳动和工具；不得承接铁路线路、桥梁或信号设施，来料、返工、工资和退出分别记录。', { enterpriseStart: { id: 'f07-civil-ground-repair', name: '华北合成秋延民用整修组', domainKey: 'D43', kind: 'bounded-civil-ground-repair', workplace: '华北合成镇站外合租民用整修场', supplier: '两家具名木料与石料供货人', product: '有委托人、场地、材料、工具、工时、检查、返工、工资与交付记录的民用道路和院落整修', employees: 3, partners: [{ personId: 'contact:f07_rail_coworker', role: '有限自有工具与劳动合伙人' }], asset: { id: 'f07-repair-tools', kind: 'documented-partner-civil-tools', description: '自购并按所有人列明的锹、夯、尺、手车和修整工具' }, debt: { id: 'f07-repair-rent-wage-credit', creditor: '具名房东与材料供货人', purpose: '场地租金、首批材料与雇员工资' }, license: { id: 'f07-repair-record', kind: 'documented-civil-repair-record', authority: '合成镇站公开经手人', scope: '只限民用道路与院落，不含铁路线路、桥梁、信号、车辆或公共通行权限' } } }),
  ] });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({ id: id, title: title, text: text, families: ['northchinadroughtfarm'], priority: 12, sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review' }, extra || {}));
  }
  var allRoutes = ['northchina-seasonal-farm-laborer', 'northchina-temple-fair-vendor', 'northchina-railway-maintenance-worker'];
  scene('f07-s01', '口粮、种子、纺线钱和牲畜份额放在不同地方', '母亲逐项说明哪一份能吃、能种、能换，父亲回家只核自己能动的部分；同住不合并决定权。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f07-s02', '牲畜走路不稳先观察蹄部与食量', '母亲请邻人只说看见的变化，父亲核次日农活能否调整；儿童不诊断，也不替任何人卖牲畜。', { minAge: 4, maxAge: 7, priority: 23 });
  scene('f07-s03', '父亲多留半日却没听清怎样结算', '母亲让他回来立刻记地块、领工人、饭食和同工；欠工从具体班次产生，不凭空生成。', { minAge: 5, maxAge: 9, priority: 23 });
  scene('f07-s04', '放牲畜、送饭和识字赶庙会撞在同一上午', '你只能投入半日，父母与二宁继续自己的工作；童年经验不锁死成年路线。', { minAge: 6, maxAge: 10, priority: 22 });
  scene('f07-s05', '庙会的叫价不是成交价', '二宁只记得摊主喊出的数字，冯月枝带你们回去核真正成交、车脚和未售货；未确认信息继续标明来源。', { minAge: 8, maxAge: 12, priority: 22 });
  scene('f07-s06', '借种、商业债和少种一块各有下一季后果', '父母分别核期限、抵押、工时和口粮，不用一条“家里欠债”吞掉所有财产。', { minAge: 10, maxAge: 15, priority: 22 });
  scene('f07-s07', '卖牲畜必须先问一直照料和拥有份额的人', '母亲明确说出能卖、不能卖和保留哪件农具；家庭压力不让主角越过她的财产意见。', { minAge: 11, maxAge: 18, priority: 22 });
  scene('f07-s08', '三份试做都说明负责人、地点、物件和答复日', '季工、庙会货担和铁路工段分别给实际任务；介绍只到核验门口。', { year: 1924, routes: allRoutes, priority: 31 });
  scene('f07-s09', '第一份工作终于说清地块、货批或工段', '你知道给谁做、谁检查、物件属于谁、怎样计钱、哪里住和什么时候得到下一次答复。', { year: 1925, routes: allRoutes, priority: 29 });
  scene('f07-s10', '一季农活有地块、种子、牲畜、工日和实发工钱', '郭春亭、父亲、同工和你只核各自关系；多年出工不会自动变成地权。', { minAge: 15, maxAge: 55, routes: ['northchina-seasonal-farm-laborer'], priority: 22 });
  scene('f07-s11', '一次庙会有日期、路线、货主、摊位、坏货和收摊账', '冯月枝、货主、顾客和你分别对经手部分负责；热闹、叫价与利润不是同一事实。', { minAge: 15, maxAge: 55, routes: ['northchina-temple-fair-vendor'], priority: 22 });
  scene('f07-s12', '一班养路有里程、工具、封锁时段、检查和工票', '换枕、整砟、巡线、料具登记和搬运不能用“在铁路做工”概括；线路和工棚仍属单位。', { minAge: 15, maxAge: 55, routes: ['northchina-railway-maintenance-worker'], priority: 22 });
  scene('f07-s13', '二宁的工作和迁移答复属于自己', '他可能留乡、跑庙会、外出试工、回乡或失联；家人能争吵和协商，不能代他签工作、婚姻或组织身份。', { minAge: 16, maxAge: 30, priority: 21 });
  scene('f07-s14', '婚后争吵的是旧债、土地收益、寄款和双方父母', '同住分灶、近处分居、一方外出和暂停共同经营都有后续；关系不会自动合并资产或免费劳动。', { minAge: 20, maxAge: 44, priority: 20 });
  scene('f07-s15', '父亲想停整日长工，母亲仍愿管粮和轻纺', '两人的身体、收入和晚年计划不必一致；照料只能分别商量，不以“为了家”替他们决定。', { minAge: 40, maxAge: 68, priority: 20 });
  scene('f07-s16', '重负、尘土、寒暑和重复动作留下疾病过程', '腰膝痛、外伤、咳嗽、胃病或失眠先有征兆，再有求助、诊断、休工、复查和复工答复。', { minAge: 18, maxAge: 65, priority: 20 });
  scene('f07-s17', '东家、同行、工段和朋友会欠账、换活、迁走和拒绝', '郭春亭可能停雇，冯月枝会卖份额，孙延福会调段，同工会成家离开；关系不是永久资源。', { minAge: 18, maxAge: 66, priority: 19 });
  scene('f07-s18', '工资、识字和公开互助不自动生成政治身份', '工人补习、行业互助、救灾和公开事务可以进入生活；参加一次活动不等于入党、卧底、叛徒或秘密权限。', { minAge: 18, maxAge: 50, priority: 19 });
  scene('f07-s19', '1937 年逐人核村路、铁路工段、摊货和最后地址', '战事改变北平、天津与华北交通后，父母、二宁、伴侣、同工和邻户分别决定留、走、转工或等待。', { year: 1937, priority: 40 });
  scene('f07-s20', '1939 年洪水先改变住处、地块、道路和铁路', '水位、牲畜、粮种、摊货、工段和每名家人的最后所在分别确认；受灾不等于所有人遭遇同一结果。', { year: 1939, priority: 39 });
  scene('f07-s21', '1942—1943 年旱灾把种粮、口粮、工价和迁移重新排队', '区域灾情只限定压力，赵家每项损失、救助、外出和身体后果仍按当年事实逐项产生。', { year: 1942, priority: 38 });
  scene('f07-s22', '1949 是土地、牲畜、货账、工票、旧债和家口的中段回收', '系统列父母、二宁、伴侣、当前工作、土地使用、资产所有、工资、债务和未知消息，再进入八种后半生。', { year: 1949, routes: allRoutes, priority: 40 });
  scene('f07-s23', '1950 年后的土地处理要等本地调查、登记和答复', '全国法律改变制度边界，但每块地、耕畜、农具、房屋和工商业的个人结果必须经过当地过程，不能一夜自动改写。', { minAge: 40, maxAge: 58, priority: 20 });
  scene('f07-s24', '死亡不自动结清土地、牲畜、货款、工资、工票和迟到的信', '父母、邻户、同工、伴侣或主角去世后，发生、知情、确认、财产归属、欠项和未知消息分别处理。', { minAge: 55, priority: 18 });

  C.annualRhythms['northchina-seasonal-farm-laborer'] = [
    '每季先核地块、种子、牲畜、工具、饭食、工日、伤病、实发工资、欠工和是否续雇；劳动履历不是土地所有证明。',
    '男性较常承担犁耙、扛运与远处重活，女性较常兼播种、收割、粮账和密集家务；实际劳动逐项计酬，差异不作能力扣分。',
    '付清、部分结算、换雇主、农忙队、灾损、迁移和晚年退出都有具体答复；留乡不是没有职业变化。',
  ];
  C.annualRhythms['northchina-temple-fair-vendor'] = [
    '每次写庙期、路线、货主、驴车、摊位、叫价、成交、坏货、赊欠、车脚、实收、未售货和收摊。',
    '冯月枝、主角、货主与帮工各有资产、货批、工资、家庭照料和退出；女性小贩劳动必须显性计酬。',
    '雨损、停会、坏账、改路线、独立摊、有限合运和拆伙都可能发生；赶会不等于稳定盈利。',
  ];
  C.annualRhythms['northchina-railway-maintenance-worker'] = [
    '每班写工段、里程、换枕、整砟、巡线、料具登记或搬运中的具体任务、工具、检查、工票和工资。',
    '男性较常进入重件养路，女性较常进入碎石筛分、料具登记和近段巡检；双方都可能转岗、受伤、停工、经营有限民用服务或退出。',
    '线路、桥梁、信号、工具和工棚属于各自单位；多年做工、留用和工龄都不等于铁路产权。',
  ];
  C.sceneFrames.northchinadroughtfarm = [
    { open: '天亮后，粮缸、种子、牲畜、父亲工日、母亲纺线钱、二宁去向和你自己的身体同时等着处理。', close: '今天只完成一段农活、一次庙会或一班工段；谁拥有、谁经手、谁领钱、谁等待和哪些仍未知分别留下。' },
    { open: '村路、庙会古道与铁路受季节、灾荒和时代变化影响，家人、东家、同行与工友各自先顾自己的生活。', close: '你得到具体答复，也承担钱、身体、关系或岗位代价；经验只让下一步更清楚，不保证上行。' },
  ];
  C.sceneFrames['northchina-seasonal-farm-laborer'] = C.sceneFrames.northchinadroughtfarm;
  C.sceneFrames['northchina-temple-fair-vendor'] = C.sceneFrames.northchinadroughtfarm;
  C.sceneFrames['northchina-railway-maintenance-worker'] = C.sceneFrames.northchinadroughtfarm;

  C.parentProfiles.northchinadroughtfarm = {
    mother: { name: '杨素琴', born: 1885, occupation: '管粮、种子、纺线收入与牲畜份额并自己决定出售、迁移和病休', deathAgeBase: 76, activities: ['核口粮、种子、纺线、借还粮与牲畜健康和份额', '自己决定卖或不卖、换货、跑会、迁移、照料和病休', '晚年减少重家务但保留粮账、轻纺和资产交接意见'], words: ['“粮缸分三格，不是哪一格都能拿去还债。”', '“牲畜是我一直照料的，卖不卖先问我。”', '“我少纺一点，不等于钱和粮账自动交给你。”'] },
    father: { name: '赵满仓', born: 1882, occupation: '耕少量地并逐季做长工、季工，核工日、饭食和工资', deathAgeBase: 77, activities: ['核地块、借种、农具、工日、饭食抵扣和实发工资', '自己决定续雇、换东家、转铁路杂工、留乡或外出', '晚年停止整日重活但保留小块菜地和欠工意见'], words: ['“多留半日也得记，不能只说东家管饭。”', '“干了多年是工日，不是人家的地契。”', '“我能带你认农活，不能替东家给你留用。”'] },
  };
  C.spouseProfiles.northchinadroughtfarm = {
    男: { name: '冯安秀', bornOffset: 1, occupation: '庙会货账与季节农作劳动者，保留货物、工资、驴车份额和父母照料', values: '同住前谈清粮债、土地收益、货物、寄款和双方父母，不接受成为免费帮工或默认守家人' },
    女: { name: '孙守安', bornOffset: -1, occupation: '铁路临工与农忙季工，按工票领钱并照料自己的母亲', values: '愿意分担家务和照料，不把妻子的货款、粮账、牲畜份额、合伙收入或迁移决定据为己有' },
  };
  C.childNames.northchinadroughtfarm = ['赵路宁', '赵禾安'];

  var farmBase = { kind: 'seasonal-farm-labor', role: '农忙季工、长工与小农生产人', workplace: '华北合成村具名地块、场院与季工住处', employer: '具名农户郭春亭与分季雇主', supervisor: '东家郭春亭与当季领工人', colleague: '有自己工日、伤病和去留的同工田桂芳', publicPerson: '等待农忙完工与结算答复的邻户李占平', terms: '按日和季结算；地块、种子、牲畜、工具、饭食、工日、伤病、工资、欠工与离雇分别记录', duties: '播种、锄草、收割、打场、运粮并核工日和饭食，不把长期劳动、借具或代管牲畜写成产权', scenes: ['郭春亭带来一季工日，你先核饭食抵扣。', '田桂芳核少算的一日工资和跌伤见证。', '李占平只委托一段农忙，不提供永久地块。'] };
  var vendorBase = { kind: 'temple-fair-vending', role: '庙会货担、合运与乡村摊贩', workplace: '华北合成庙会古道、茶棚外登记摊位与两处镇集', employer: '自营、货主寄卖或有限合运', supervisor: '独立小贩冯月枝与庙会经手人刘同顺', colleague: '有自己驴车、货物和幼弟照料的同行冯月枝', publicPerson: '购买具名货物并等待赊欠答复的顾客高三娘', terms: '逐会结算；庙期、货主、驴车、摊位、叫价、成交、坏货、赊欠、车脚、工资、实收与退货分别记录', duties: '备货、合运、摆摊、量货、收钱、盘点和收摊，不混用冯月枝、货主和主角的货物、顾客与车份额', scenes: ['雨前先把两家货主的货分开盖好。', '刘同顺只给本次庙期的临时摊位。', '高三娘说明上次赊欠能还多少。'] };
  var railBase = { kind: 'railway-maintenance-work', role: '铁路养路、巡检与料具工人', workplace: '华北合成铁路工段、料具房、工棚与近站线路', employer: '合成铁路养路工段或公开民用整修单位', supervisor: '领工段长韩继周', colleague: '有自己工票、伤病、住处和调段决定的工友孙延福', publicPerson: '等待线路封锁结束与通行答复的站外货主周德源', terms: '按工票计时；工段、里程、任务、封锁、工具领还、检查、工资、工棚、伤病、留用与离段分别记录', duties: '在换枕、整砟、巡线、料具登记或搬运中的具名任务工作并核工票，不处分线路、桥梁、信号、工具和工棚', scenes: ['韩继周给出里程、封锁时段和检查标准。', '孙延福核工票少记的待命时数。', '周德源只等待公开通行答复，不取得工段权限。'] };
  C.routeCareerProfilesByGender['northchina-seasonal-farm-laborer'] = {
    男: Object.assign({}, farmBase, { role: '犁耙、扛运、打场与远处重活季工', duties: '较常承担重农活，也必须核工日、伤病、家务和饭食，不自动取得地权或牲畜' }),
    女: Object.assign({}, farmBase, { role: '播种、锄收、粮账、打场与季节农作人', duties: '较常兼密集农活、粮账与家务，全部实际劳动计酬，也能换雇主、组织农忙队或退出' }),
  };
  C.routeCareerProfilesByGender['northchina-temple-fair-vendor'] = {
    男: Object.assign({}, vendorBase, { role: '远路挑运、搭摊、采购、量货与收摊人', duties: '较常兼远路和重货，也逐批核货主、车脚、坏货和实收，不因体力取得同行驴车或货物' }),
    女: Object.assign({}, vendorBase, { role: '备货、盘点、量货、售卖、赊账与收摊人', duties: '女性小贩劳动显性计薪，可管货批、核价、组织合运、独立摆摊或退出，不是默认随行家属' }),
  };
  C.routeCareerProfilesByGender['northchina-railway-maintenance-worker'] = {
    男: Object.assign({}, railBase, { role: '换枕、整砟、扛运、巡线与工具核对工人', duties: '较常先进入重件养路，也可学习料具登记与检查；线路、工具、工票和工资边界相同' }),
    女: Object.assign({}, railBase, { role: '碎石筛分、料具登记、工票复核与近段巡检工人', duties: '较常进入料具和近段辅助，也承担明确生产劳动并计薪，可转工序、整修服务或离段' }),
  };

  Object.assign(C.routeContactProfiles, {
    'northchina-seasonal-farm-laborer': [
      { id: 'f07_guo_chunting', label: '郭春亭', role: '按地块、工日、饭食、欠工、伤病和续雇给答复的季工东家', status: 'supervisor', relation: 21, born: 1878 },
      { id: 'f07_farm_coworker', label: '田桂芳', role: '有自己的工日、工资、见证、伤病、债务和迁移决定的季工', status: 'coworker', relation: 29, born: 1906 },
      { id: 'f07_farm_customer', label: '李占平', role: '等待具名农忙短活、工具归还和结算答复的邻户', status: 'nearby', relation: 22, born: 1889 },
    ],
    'northchina-temple-fair-vendor': [
      { id: 'f07_feng_yuezhi', label: '冯月枝', role: '只处分自己驴车份额、货物、客户和路线劳动并核合运边界的独立小贩', status: 'coworker', relation: 34, born: 1905 },
      { id: 'f07_market_keeper', label: '刘同顺', role: '按庙期核临时摊位、货类、收摊和下次开放答复的公开经手人', status: 'supervisor', relation: 22, born: 1882 },
      { id: 'f07_market_customer', label: '高三娘', role: '购买具名货物并对自己的赊欠、退货与继续交易作答的顾客', status: 'nearby', relation: 23, born: 1891 },
    ],
    'northchina-railway-maintenance-worker': [
      { id: 'f07_rail_supervisor', label: '韩继周', role: '按工段、里程、封锁、工具、检查、工票、工资、留用和离段给答复的段长', status: 'supervisor', relation: 21, born: 1881 },
      { id: 'f07_sun_yanfu', label: '孙延福', role: '有自己的工票、工具、伤病、工棚、调段和离职决定的养路工友', status: 'coworker', relation: 30, born: 1888 },
      { id: 'f07_rail_customer', label: '周德源', role: '等待具名封锁时段结束和公开通行答复的站外货主', status: 'nearby', relation: 21, born: 1890 },
    ],
  });
  Object.assign(C.healthProfiles, {
    'northchina-seasonal-farm-laborer': ['长期弯腰、负重、打场、牲畜与农具造成的腰膝肩背和外伤', '寒暑、尘土、饮水与季节暴露造成的咳嗽、发热和肠胃不适', '欠工、歉收、债务、续雇和家人分散造成的胃痛失眠'],
    'northchina-temple-fair-vendor': ['长期挑担、步行、搭摊和收摊造成的肩背膝足与手部劳损', '风尘、雨淋、饮食不定和人群拥挤造成的咳嗽、发热和肠胃不适', '坏货、赊欠、停会、货债和同行争议造成的焦虑失眠'],
    'northchina-railway-maintenance-worker': ['枕木、道砟、工具、久站和重复动作造成的砸伤、腰背手臂与腿部劳损', '粉尘、寒暑、工棚与轮班造成的咳嗽、眼鼻不适和反复发热', '工票、欠薪、事故、停工、调段、住处和家人通信造成的胃痛失眠'],
  });
  Object.assign(C.publicRouteProfiles, {
    'northchina-seasonal-farm-laborer': { publicGroup: '合成的工日、欠工、灾损与公开救济互助簿', publicRole: '核公开工日、欠工、伤病、粮种、灾损、救济和续雇答复', covertRole: '熟悉田路和村人不自动形成党籍、秘密资格或忠诚标签；另经政治选择也不得占用他人粮种与住址', infiltrationRole: '不提供藏匿、破坏、规避查验或秘密运输教程，公开农事与高风险事务严格分开', contact: { id: 'public_f07_farm', label: '马水兰', role: '登记工日、欠工、灾损和公开救济答复的经手人', status: 'colleague', relation: 19, born: 1894 } },
    'northchina-temple-fair-vendor': { publicGroup: '合成的庙期、货损、赊欠与公开同行互助簿', publicRole: '核公开庙期、摊位、货损、赊欠、救济与同行答复', covertRole: '跑庙会、熟悉古道和认识顾客不自动生成卧底、联络、党籍或秘密权限', infiltrationRole: '不把货担、香道、茶棚、顾客或驴车写成默认秘密载体，不提供现实可复用隐蔽方法', contact: { id: 'public_f07_vendor', label: '梁秀芝', role: '登记庙期、货损、赊欠和公开同行互助答复的经手人', status: 'colleague', relation: 20, born: 1896 } },
    'northchina-railway-maintenance-worker': { publicGroup: '合成的工票、伤病、失业与公开工友互助簿', publicRole: '核公开工票、扣工、伤病、失业登记、职业介绍和救济答复', covertRole: '铁路技能、工友关系、识字班和公开活动不自动生成政治身份、秘密权限或人格标签', infiltrationRole: '不以线路、工棚、工票、料具和职工名单提供现实隐蔽或破坏教程，公开劳资与高风险事务分开', contact: { id: 'public_f07_rail', label: '王文秀', role: '登记工段工票、伤病、劳资和公开职业答复的经手人', status: 'colleague', relation: 20, born: 1893 } },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('rural', 'northchina-seasonal-farm-laborer');
  addRouteToTrack('trade', 'northchina-temple-fair-vendor');
  addRouteToTrack('worker', 'northchina-railway-maintenance-worker');

  C.events.push(
    { id: 'f07-north-famine-1921', year: 1921, eraBrief: true, eraScope: '中国北方持续干旱与饥荒', families: ['northchinadroughtfarm'], title: '持续干旱使粮食、种子、牲畜、儿童与逃荒者的生活同时承压', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { money: -5, health: -4, position: -2 }, knownText: '你知道 1921 年春北方饥荒仍在加重，部分地区儿童和逃荒者处境尤其危险；赵家每个人、每项资产与迁移仍逐项确认。', unknownText: '村里先出现粮少、树皮被剥和外出找食的消息，你只知道自家口粮、种子、牲畜和亲友最后所在；更大范围要等公开消息。', fact: '1921 年春中国北方持续干旱和饥荒，儿童、老弱者与逃荒者面临严重生计危机。', historySource: { label: '盐田档案与史志信息网：1921 年中国北方饥荒', url: 'https://www.yantian.gov.cn/ytdayszxxw/lsjt/content/post_11736844.html' } },
    { id: 'f07-rail-workers-1923', year: 1923, eraBrief: true, eraScope: '长辛店铁路工人与早期劳动组织', families: ['northchinadroughtfarm'], title: '铁路工人的工资、识字、劳动组织与冲突进入公开消息', knownThrough: ['newspaper', 'conversation', 'books'], delta: { knowledge: 1, network: 1 }, knownText: '你知道长辛店铁路工人留下工资单、补习与劳动组织史料；普通工人是否参加、申请或保持距离仍须个人选择和正式答复。', unknownText: '工段里有人谈到工资、识字和集体交涉，你只知道自己听到的部分；会做铁路活不自动产生任何政治身份。', fact: '20 世纪 20 年代长辛店铁路工人的工资、教育与劳动组织成为中国早期工人运动的重要史实。', historySource: { label: '首都之窗：百年二七厂见证中国早期工人运动', url: 'https://www.beijing.gov.cn/renwen/whrl/rdtj/202106/t20210610_2410391.html' } },
    { id: 'f07-temple-fair-1925', year: 1925, eraBrief: true, eraScope: '北平郊外庙会与香道市场', families: ['northchinadroughtfarm'], title: '固定庙期把香客、茶棚、杂耍和小商贩聚到同一路线上', knownThrough: ['conversation', 'storytelling', 'newspaper'], delta: { network: 1, knowledge: 1 }, knownText: '你知道明清至民国妙峰山庙会有固定庙期、香道、茶棚和商贩设摊；每名小贩仍需核货主、路线、摊位、损耗和实收。', unknownText: '你先听见某段古道将开庙会，只能核本次日期、摊位和路况；人多不等于货能卖完。', fact: '民国时期妙峰山庙会仍是华北重要庙会，商贩在香道和寺庙附近设摊售货。', historySource: { label: '北京市文物局：妙峰山进香图与古香道', url: 'https://wwj.beijing.gov.cn/bjww/wwjzzcslm/1731063/1731066/djs/1731072/1731340/index.html' } },
    { id: 'f07-lugou-1937', year: 1937, eraBrief: true, eraScope: '卢沟桥事变与华北沦陷', families: ['northchinadroughtfarm'], title: '卢沟桥战事后北平、天津和华北交通与生活迅速改变', knownThrough: ['newspaper', 'conversation', 'letters'], delta: { money: -5, position: -3, health: -2 }, knownText: '你知道 1937 年 7 月卢沟桥事变发生，月底北平、天津相继沦陷；角色只按自己的村路、工段、摊货、住处和家人消息记录。', unknownText: '你先得到停车、封路、撤人或村外枪声的局部消息，其他地区和失联者状态要等第二条相容信息确认。', fact: '1937 年 7 月卢沟桥事变后，北平、天津相继沦陷，华北道路、铁路、工作与家庭通信受到重大影响。', historySource: { label: '国家档案局：档案里的卢沟桥事变', url: 'https://www.saac.gov.cn/zt/2014-08/22/content_63605.htm' } },
    { id: 'f07-fangshan-flood-1939', year: 1939, eraBrief: true, eraScope: '永定河、房山与良乡洪灾', families: ['northchinadroughtfarm'], title: '连日暴雨和河水上涨淹村、断路并冲击铁路', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { money: -4, health: -3, position: -2 }, knownText: '你知道 1939 年永定河及房山、良乡发生严重洪灾，村庄与铁路受淹；每块地、每件牲畜、每段路和每个人仍逐项确认。', unknownText: '水先过村路、低地和铁路路基，你只能确认自家与附近后果；没有把整个华北写成同一损失。', fact: '1939 年永定河流域及房山、良乡发生严重洪灾，村庄、迁移与铁路交通受到影响。', historySource: { label: '北京市文物局：房山民国石碑与 1939 年洪水', url: 'https://wwj.beijing.gov.cn/bjww/362760/362770/1696632/index.html' } },
    { id: 'f07-north-drought-1942', year: 1942, eraBrief: true, eraScope: '华北与太行区大旱', families: ['northchinadroughtfarm'], title: '连续旱情使田禾、口粮、救灾、工价与迁移长期承压', knownThrough: ['newspaper', 'conversation', 'letters'], delta: { money: -4, health: -3, position: -2 }, knownText: '你知道 1942—1943 年华北大旱，太行区等地受灾严重；赵家只按自己的田、粮、身体、救助答复和迁移记录后果。', unknownText: '你先看到雨迟、田禾受损、粮价与找工变化，只能确认附近情况；区域统计没有被平均写进每户。', fact: '1942—1943 年华北多地遭遇严重旱灾，农业、救灾与人口生活长期承压。', historySource: { label: '河北省政协：华北与太行区 1942—1943 年旱灾资料', url: 'https://www.hebzx.gov.cn/system/2024/08/19/030302264.shtml' } },
    { id: 'f07-land-reform-1950', year: 1950, eraBrief: true, eraScope: '中国大陆土地改革制度变化', families: ['northchinadroughtfarm'], post1949Choices: ['mainland'], title: '土地、耕畜、农具、房屋和工商业进入新的调查与处理制度', knownThrough: ['newspaper', 'conversation', 'books'], delta: { knowledge: 2, position: 1 }, knownText: '你知道 1950 年《土地改革法》公布，土地、耕畜、农具、房屋与工商业有不同处理规定；个人结果仍要等本地调查、登记、分配或保留答复。', unknownText: '村里先来登记和政策说明，你只能确认哪些材料被收、哪些事实待核；没有从全国法条直接跳到“主角得到土地”。', fact: '1950 年 6 月《中华人民共和国土地改革法》公布施行，农村土地与相关财产进入分地区实施过程。', historySource: { label: '中华人民共和国土地改革法', url: 'https://www.sqlzw.gov.cn/sitesources/zmdjw/page_pc/ztzl/dsxxjyzl/dswx/articlef521a67ddc494a04bbd18b8556d2b960.html' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
