// 民国人生 · F10 东北铁路、矿业与附属服务工人家庭运行时包 v0.7.7
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f10.js');

  C.version = '0.7.7';
  C.familyDecisionKeys.northeastrailworkers = { path: 'northeast-worker-path', war: 'northeast-worker-system-change' };
  Object.assign(C.designRegistry.families.F10, {
    designStatus: 'runtime-reviewed-first-round',
    runtimeStatus: 'playable-verified',
    runtimeFamilyKey: 'northeastrailworkers',
  });
  C.runtimeFamilyDesignMap.northeastrailworkers = 'F10';
  Object.assign(C.legacyRouteDomainMap, {
    'northeast-railway-worker': 'D09',
    'northeast-mining-ground-worker': 'D08',
    'northeast-repair-worker': 'D11',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F10-KUANCHENGZI': {
      label: '吉林省地方志《宽城子搬家》',
      url: 'https://dfz.jl.gov.cn/zsjl/201712/t20171201_5216560.html',
      supports: ['宽城子车站、铁路附属地、工厂商店与居住空间形成的历史背景'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F10-TOUDAOGOU': {
      label: '吉林省地方志《长春历史上的头道沟》',
      url: 'https://dfz.jl.gov.cn/jgdg/201802/t20180228_5219014.html',
      supports: ['长春铁路枢纽、附属地与城市空间分隔的历史背景'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F10-JILIN-ECONOMY': {
      label: '吉林省地方志《辛亥革命至“九一八”事变前的吉林（续）》',
      url: 'https://dfz.jl.gov.cn/jgdg/201604/t20160406_5218957.html',
      supports: ['铁路、矿业、工厂、通信与外来资本扩张形成的劳动环境'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F10-MANTETSU-ARCHIVES': {
      label: '辽宁省档案馆满铁档案开放资料介绍',
      url: 'https://www.ln.gov.cn/web/ywdt/zymtkln/2025061009160159814/index.shtml',
      supports: ['满铁对交通、矿业与经济控制及其侵略性质的档案边界'],
      status: 'source-linked-needs-final-review',
    },
  });

  C.families.northeastrailworkers = {
    key: 'northeastrailworkers',
    name: '东北铁路、矿业与附属服务工人家',
    born: 1910,
    place: '长春合成铁北工人聚居区',
    defaultSeed: 1010,
    defaultNames: { 男: '韩守勤', 女: '韩素秋' },
    motif: '班次、工牌、宿舍、食客账、工具押金和伤情分别记录；制度更换改变岗位与住处，却不替普通人添加全知的政治身份。',
    start: { body: 53, knowledge: 21, craft: 33, mind: 39, network: 29, fame: 18 },
    startRes: { money: 16, health: 66, relation: 69, position: 24 },
    subjects: {
      mother: { label: '母亲', status: 'alive', health: 60, agency: 89, note: '饭食、缝补、食客信用和工钱由她本人管理，不能并入父亲班次工资' },
      father: { label: '父亲', status: 'alive', health: 57, agency: 80, note: '线路杂工后转货场，伤情、事故陈述和是否复工由本人回答' },
      spouse: { label: '配偶', status: 'not-met', health: 66, agency: 85, note: '班次、住处、迁站、生育与双方父母照料都要逐项协商' },
      household: { label: '同住家口', status: 'railway-housing-dependent', strength: 53, agency: 81 },
      support: { label: '班组医务与邻里支持', status: 'limited-worksite-support', strength: 31, agency: 77 },
      connections: { label: '铁路矿区与修理铺门路', status: 'trial-and-records-only', strength: 26, agency: 76 },
      workers: { label: '同事、工头与经办人', status: 'separate-duties-and-testimony', strength: 30, agency: 83 },
      ledger: { label: '工牌工资宿舍与工具账', status: 'separate-records', strength: 37, agency: 82 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 81, note: '不自动出生，也不默认接班、照料或承担父母的事故责任' },
    },
    contacts: {
      f10_han_jingfu: { label: '韩景福', role: '做线路杂工后转货场的父亲，按班核工牌与工具', status: 'family', relation: 59, agency: 80, note: '可决定治伤、复核事故、换段或退工，主角不能代签事故责任' },
      f10_jin_guifen: { label: '金桂芬', role: '经营宿舍区饭食和缝补的母亲，保留食客账与工钱', status: 'family', relation: 63, agency: 89, note: '可扩大、缩减、合伙或停止生意，不是班组的附属无薪劳力' },
      f10_han_qiusheng: { label: '韩秋生', role: '想学机修或离开工区读书的手足', status: 'family', relation: 49, agency: 91, note: '会竞争有限学徒位，也能拒绝介绍工作或迁站安排' },
      f10_zhao_wanshun: { label: '赵万顺', role: '安排线路试班、工具交接与停班答复的工头', status: 'nearby', relation: 18, agency: 78, note: '只能处理本班职责，可记过、停班或认可技术，不是永久靠山' },
      f10_anna_petrova: { label: '安娜·彼得罗娃', role: '核公开票货、通知与多语姓名的车站翻译文书', status: 'nearby', relation: 25, agency: 91, note: '只教公开术语，不替任何一方担保，也不交出受限文件' },
      f10_sun_ruiqin: { label: '孙瑞琴', role: '登记伤情、有限治疗与复工建议的工区护理人员', status: 'nearby', relation: 27, agency: 90, note: '不能保证治愈，也不能代替本人或工头决定复工' },
    },
  };

  Object.assign(C.routes, {
    'northeast-railway-worker': { name: '铁路线路、站场与票货交接', family: 'northeastrailworkers', summary: '在岗位门槛和性别差异下进入线路、站场或票货工作，逐班核职责、工具、工资、伤情和制度更换。' },
    'northeast-mining-ground-worker': { name: '矿区地面运料、筛选与灯房工作', family: 'northeastrailworkers', summary: '从有期限地面试工进入具体班组，面对粉尘、重物、停工、事故和宿舍资格，避免把矿业概括成一句苦力。' },
    'northeast-repair-worker': { name: '机修铺学徒、机件登记与检修', family: 'northeastrailworkers', summary: '通过工具清单、师徒权限和实际修理逐步形成技能；识字或熟练都不自动变成工程师或管理者。' },
  });

  C.actions.push(
    { id: 'f10-shift-meal-bag', name: '听班次铃并帮父亲核手套饭包', families: ['northeastrailworkers'], minAge: 5, maxAge: 14, spirit: 2, delta: { craft: 2, relation: 2, mind: 1 }, subjectDelta: { father: { health: 1 }, ledger: { strength: 1 } }, contactEffects: { f10_han_jingfu: { relation: 2 } }, note: '只辨认生活用品和公开工具清单，不让儿童接触线路或运转设备。' },
    { id: 'f10-meal-ledger', name: '帮母亲核食客、欠饭钱与原料', families: ['northeastrailworkers'], minAge: 6, spirit: 2, delta: { knowledge: 2, craft: 2, money: 1, relation: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f10_jin_guifen: { relation: 2 } }, note: '食客账属于母亲经营，不因食客与父亲同班就由父亲决定宽限。' },
    { id: 'f10-public-words', name: '向车站文书学公开姓名与票货字样', families: ['northeastrailworkers'], minAge: 8, spirit: 3, delta: { knowledge: 4, mind: 2, network: 1 }, channels: ['conversation'], contactEffects: { f10_anna_petrova: { relation: 2 } }, note: '只学习公开用字、站名和交接格式，不接触受限文件或替人担保。' },
    { id: 'f10-rail-duty-check', name: '核本班线路、站场职责与工具交接', routes: ['northeast-railway-worker'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, body: 1, money: 2, health: -1 }, subjectDelta: { ledger: { strength: 2 }, workers: { strength: 1 } }, contactEffects: { f10_zhao_wanshun: { relation: 1 }, f10_luo_huochang: { relation: 1 } }, note: '巡线、货场、票货岗位按实际可见机会不同；越权设备明确排除。' },
    { id: 'f10-rail-wage-housing', name: '核工牌工资、停班与宿舍答复', routes: ['northeast-railway-worker'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 3, mind: 2, money: 1, position: 1 }, subjectDelta: { household: { strength: 1 }, ledger: { strength: 2 } }, contactEffects: { f10_zhao_wanshun: { relation: 1 }, f10_anna_petrova: { relation: 1 } }, note: '停班、失业和宿舍资格分别确认；一张通知不自动回答全部后果。' },
    { id: 'f10-mine-ground-shift', name: '核地面运料、筛选或灯房班次', routes: ['northeast-mining-ground-worker'], minAge: 15, spirit: 4, careerAction: true, delta: { body: 2, craft: 2, money: 2, health: -2 }, subjectDelta: { workers: { strength: 1 } }, contactEffects: { f10_ma_banzhang: { relation: 1 }, f10_liu_xiaoqin: { relation: 1 } }, note: '不把所有矿区劳动都写成下井；岗位、粉尘、重量和交班各自记录。' },
    { id: 'f10-mine-health-record', name: '到医务所登记咳嗽、擦伤与复工建议', routes: ['northeast-mining-ground-worker'], minAge: 17, spirit: 3, careerAction: true, delta: { health: 2, mind: 2, money: -1, relation: 1 }, subjectDelta: { support: { strength: 2 } }, contactEffects: { f10_sun_ruiqin: { relation: 2 }, f10_liu_xiaoqin: { relation: 1 } }, note: '记录不会自动赔偿或治愈，但会改变复工、换岗和长期健康叙事。' },
    { id: 'f10-repair-tool-ledger', name: '核机件、工具、拆装步骤与归还人', routes: ['northeast-repair-worker'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 4, knowledge: 2, money: 1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f10_song_shifu: { relation: 2 }, f10_han_qiusheng: { relation: 1 } }, note: '学徒只做被示范并授权的工序；损坏按领用、经手和归还记录复核。' },
    { id: 'f10-repair-customer-handoff', name: '向送修人说明故障、工钱与交付日期', routes: ['northeast-repair-worker'], minAge: 17, spirit: 3, careerAction: true, delta: { craft: 2, network: 2, money: 2, mind: 1 }, contactEffects: { f10_song_shifu: { relation: 1 }, f10_gu_customer: { relation: 2 } }, note: '能修什么、谁定价、何时交付和旧件归属逐项说明，不凭熟练自动取得铺面。' }
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
        sourceIds: ['SRC-F10-KUANCHENGZI', 'SRC-F10-TOUDAOGOU', 'SRC-F10-JILIN-ECONOMY', 'SRC-F10-MANTETSU-ARCHIVES'],
        reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete choice.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  installDecision({
    id: 'northeast-worker-path', year: 1925, followYear: 1926, families: ['northeastrailworkers'], title: '第一段训练怎样真正落成工作',
    prompt: '赵万顺、矿区地面运料点和宋师傅各给一段有期限试班。你必须问清岗位、工具、工钱、住处、危险、负责人和答复日期。',
    options: [
      option('railway-trial', '接线路、站场或票货岗位的有限试班', { craft: 3, knowledge: 1, money: 1 }, 'f10:path:railway', '1925 年进入铁路线路、站场或票货岗位试班。', '铁路试班给出具名岗位答复', '赵万顺确认男性角色进入线路和货场辅助，女性角色进入票货文书与交接；两种岗位都列明班表、工牌和不能触碰的设备。', { route: 'northeast-railway-worker' }),
      option('mining-ground-trial', '接矿区地面运料、筛选或灯房试班', { body: 2, craft: 2, money: 1 }, 'f10:path:mining', '1925 年进入矿区地面班组试工。', '矿区没有把所有人都写成下井', '马班长按性别、体力和当期空缺分配地面运料、筛选或灯房辅助；班次、粉尘、重量、工钱和医务所位置都有记录。', { route: 'northeast-mining-ground-worker' }),
      option('repair-trial', '去机修铺做工具登记与低风险学徒工序', { craft: 3, knowledge: 2, money: 1 }, 'f10:path:repair', '1925 年进入合成北站机修铺学徒试工。', '修理铺明确学徒权限', '宋师傅先让你核工具、清洗旧件和观察拆装，能独立做的工序逐项签认；识字和手巧都没有直接把你变成工程师。', { route: 'northeast-repair-worker' }),
    ],
  });

  installDecision({
    id: 'route-northeast-railway-worker-1929', year: 1929, followYear: 1930, routes: ['northeast-railway-worker'], title: '货场擦伤和工具缺件怎样分开处理',
    prompt: '一只扳手在换班时找不到，一名同事又在货场擦伤。工头先核经手，医务所先处理伤情；你只知道亲眼看见的一段。',
    options: [
      option('rail-treat-and-record', '先陪伤者就医，再写下亲眼所见与工具交接', { relation: 3, money: -1, position: -1 }, 'f10:rail:treat', '1929 年先处理伤情并保存本班交接记录。', '伤情和工具分别得到答复', '孙瑞琴登记擦伤与停班两日；扳手次日在上一班工具箱找到，你的陈述只保留亲眼所见，没有替任何人定责。'),
      option('rail-verify-shift-ledger', '拿班表和领用簿逐项复核工钱、工具与停班', { knowledge: 3, mind: 2, money: 1 }, 'f10:rail:verify', '1929 年逐项复核班表、工牌和工具领用。', '一次复核只解决可证明的部分', '漏记的一班工资得到补发，工具缺件仍等待上一班答复；赵万顺承认你的记录完整，却没有因此永久保你留岗。'),
      option('rail-leave-unclear-duty', '拒绝替未见设备签字并转到职责清楚的货场班', { mind: 3, money: -1, position: -1 }, 'f10:rail:leave', '1929 年拒绝越权签字并转入具名货场班。', '换班以后不是空白工作', '罗继山接收你的货场交接，每日只核进出货签和本班工具；原班少算的一段工资仍单独追索。'),
    ],
  });

  installDecision({
    id: 'route-northeast-railway-worker-1942', year: 1942, followYear: 1943, routes: ['northeast-railway-worker'], title: '运输压力增加以后只承担哪段职责',
    prompt: '夜班与货运增加，一张高价临时差事没有说明货物和交接人；医务所同时提醒父亲旧伤和你的睡眠已受影响。',
    options: [
      option('rail-documented-shifts', '只接班表、货物和交接人可核的岗位', { mind: 2, money: -1, position: 1 }, 'f10:rail:documented', '1942 年只接职责和交接均可核的铁路班次。', '少接的班次留下清楚边界', '你保留六周班表，拒绝两次无交接人的临时差事；收入下降，伴侣与父母却能按确切夜班协商照料。'),
      option('rail-transfer-day-cargo', '转到固定白班的民生货物交接岗位', { health: 2, network: 2, money: -1 }, 'f10:rail:day', '1942 年转入固定白班的公开民生货物交接。', '白班有具体工作也有降薪', '你逐件核食物、衣物和药材的入库出库，工资低于夜班；父亲旧伤复诊与母亲食客时段得到重新安排。'),
      option('rail-pause-for-family-care', '减少班次照料伤病家人并保留复工日期', { relation: 3, money: -2, health: 1 }, 'f10:rail:care', '1942 年减少班次并登记复工复核日期。', '照料没有吞掉所有人的职业', '母亲保留饭食客户，伴侣只轮值自己同意的时段，你在八周后重新核岗；父亲本人决定是否继续复诊和退工。'),
    ],
  });

  installDecision({
    id: 'route-northeast-mining-ground-worker-1929', year: 1929, followYear: 1930, routes: ['northeast-mining-ground-worker'], title: '粉尘咳嗽、停班和高风险加钱怎样取舍',
    prompt: '你连续咳嗽，原地面班停两日；另一班给更高工钱，却不说明重量和防护。孙瑞琴只给医疗建议，不能替班组保证换岗。',
    options: [
      option('mine-record-and-light-duty', '登记症状并申请有期限的轻班', { health: 3, money: -2, mind: 2 }, 'f10:mine:light', '1929 年登记粉尘症状并转入有限轻班。', '轻班不是一句已经痊愈', '你在灯房和工具发放处做四周，收入减少；咳嗽缓解但继续留档，是否回原岗位到期再评估。'),
      option('mine-verified-ground-shift', '只接重量、时长与交接人写清的地面运料', { body: 1, craft: 2, money: 1, health: -1 }, 'f10:mine:verified', '1929 年只接条件可核的地面运料班。', '一班收入对应一段身体代价', '刘小琴与你分别核各自车次和装载量；你完成四班后因腰痛停一班，工资和伤休没有混算。'),
      option('mine-leave-unclear-risk', '拒绝不明高风险班并去货场找公开短工', { mind: 3, money: -2, network: 1 }, 'f10:mine:leave', '1929 年拒绝条件不明的高风险班并转找货场短工。', '离开矿区后出现下一份明确工作', '你先失去三周工钱，随后由罗继山安排有期限货场装卸；住处资格只延长一个月，下一步仍需重新确认。'),
    ],
  });

  installDecision({
    id: 'route-northeast-mining-ground-worker-1942', year: 1942, followYear: 1943, routes: ['northeast-mining-ground-worker'], title: '战时增产、医务建议和家人住处怎样协调',
    prompt: '地面班次加长，父亲旧伤复发，宿舍管理又催问谁仍在岗。继续工作、转医务后勤或离开工区都要说明收入和住处。',
    options: [
      option('mine-limited-ground-shifts', '只做有上限的地面班并保留伤病记录', { money: 1, health: -1, mind: 2 }, 'f10:mine:limited', '1942 年只接受时长与重量有记录的地面班。', '限定班次没有消除压力', '马班长同意六周限时班，你少拿加班钱；一次咳嗽和一次腰痛仍分别登记，母亲没有被迫用饭食收入填满缺口。'),
      option('mine-clinic-logistics', '转做医务所公开物资与伤员登记后勤', { knowledge: 2, health: 2, money: -1, relation: 2 }, 'f10:mine:clinic', '1942 年转做工区医务所公开后勤。', '医务后勤有清楚权限', '孙瑞琴让你核纱布、净水和伤员到所时间，不让你诊断或决定复工；工资降低，粉尘接触减少。'),
      option('mine-exit-with-housing-date', '离开矿区并先确认宿舍退出、工资尾款与去处', { money: -2, position: -1, mind: 3 }, 'f10:mine:exit', '1942 年结清工资与宿舍日期后离开矿区。', '迁出没有把家人自动捆在一起', '你转去站区公开装卸，父母暂留原住处，伴侣按自己的岗位选择是否同行；每个人留下最后地址和下次核信日期。'),
    ],
  });

  installDecision({
    id: 'route-northeast-repair-worker-1929', year: 1929, followYear: 1930, routes: ['northeast-repair-worker'], title: '学徒损件和独立工序怎样确认',
    prompt: '一只送修轴承在拆洗后出现裂纹。送修人催交，宋师傅先核旧损、领用、拆装和谁有权定价；秋生又在争取同一张工作台。',
    options: [
      option('repair-recheck-old-damage', '按入铺记录、拆洗步骤和旧损逐项复核', { craft: 3, knowledge: 2, money: 1 }, 'f10:repair:recheck', '1929 年逐项复核送修机件的旧损与经手。', '裂纹责任得到有限结论', '入铺记号显示裂纹已有旧痕，你承担一次拆洗不完整的返工，宋师傅承担定价答复；没有把全部损失推给学徒。'),
      option('repair-share-bench-with-sibling', '与秋生分时用工作台并分别签工具', { relation: 3, craft: 2, money: -1 }, 'f10:repair:share', '1929 年与秋生分时学工并分别登记工具。', '手足没有合并成一个学徒名额', '你做清洗与装配，秋生练量具和锉削；两人各有工序签认，彼此不能代领工钱或承担损件。'),
      option('repair-leave-unpaid-trial', '结清已做工序后离开长期无薪试工', { mind: 3, money: -2, network: 1 }, 'f10:repair:leave', '1929 年离开没有结束期限的无薪试工。', '离铺以后有一份具体岗位', '顾客顾成义介绍你到货场修具间做有期限辅助，负责人、工钱和工具清单明确；旧铺欠下的两次工钱仍保留追索记录。'),
    ],
  });

  installDecision({
    id: 'route-northeast-repair-worker-1942', year: 1942, followYear: 1943, routes: ['northeast-repair-worker'], title: '修理单用途不明时接什么工作',
    prompt: '铺里同时收到水泵、民用车具和一批不说明用途与领取人的机件。熟练只能证明会修，不能替你知道最终用途。',
    options: [
      option('repair-civilian-orders', '只接用途、送修人和领取人可核的民用修理', { craft: 2, mind: 2, money: -1 }, 'f10:repair:civilian', '1942 年只接可核的水泵、车具与生活机件。', '少接订单换来明确交付', '你完成两台水泵和一批车具，拒收无领取人的机件；收入下降，旧件和返修仍按送修单处理。'),
      option('repair-fixed-utility-shop', '转入有班表的站区公用设备检修间', { craft: 3, money: 1, position: 1, health: -1 }, 'f10:repair:utility', '1942 年进入站区公用设备检修间。', '固定岗位写清了授权范围', '你只检修照明、水泵和货场手工具，值班与停机有具名负责人；不能接触的设备仍在工牌权限外。'),
      option('repair-train-apprentice-with-limits', '减少接单并教一名学徒低风险工序', { relation: 2, craft: 2, money: -1, health: 1 }, 'f10:repair:teach', '1942 年减少接单并按权限带一名学徒。', '带徒没有变成铺面所有权', '学徒只做清洗、量具和低风险装配，你仍向宋师傅结算工钱；工作量下降，铺面和工具产权没有自动转到你名下。'),
    ],
  });

  installDecision({
    id: 'northeast-worker-system-change', year: 1931, followYear: 1932, families: ['northeastrailworkers'], title: '制度突变后岗位、住处和家人怎样确认',
    prompt: '车站和工区出现新的人员通知、名称与负责人，旧工牌仍在手里但是否有效尚未确认。你只能处理眼前岗位、住处、工资和家人选择。',
    options: [
      option('stay-with-duty-boundary', '留岗，但只承诺工牌上已确认的本职', { mind: 2, position: 1, money: 1 }, 'f10:system:stay', '1931 年留在原地，只承担已经确认的岗位职责。', '留下不等于认同所有制度安排', '新负责人只确认本月班表和旧工牌暂用；你不替未接触的事务签字，父母与伴侣也分别决定自己的工作和住处。'),
      option('move-with-confirmed-station-work', '等岗位、住处和家人答复都确认后迁到另一站区', { network: 2, money: -2, mind: 2 }, 'f10:system:move', '1931 年在岗位、住处和家人答复都确认后迁到另一站区。', '迁站以后逐项重建生活', '你拿到具名岗位和六周住处答复才动身；母亲因食客账选择晚一个月迁，父亲先处理工牌，秋生留下自己的最后地址。'),
      option('leave-railway-for-public-work', '结清工钱与住处后转向民间修理或公开服务', { position: -1, money: -2, craft: 2 }, 'f10:system:leave', '1931 年结清可确认事项后离开原铁路工区。', '离开机构没有让一年变成空白', '你在民间修理铺、货运短工或公开饭食帮工中取得一段具名工作；旧工龄是否承认仍标未知，家人去留没有被代替。'),
    ],
  });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['northeastrailworkers'], priority: 12,
      sourceIds: ['SRC-F10-KUANCHENGZI', 'SRC-F10-TOUDAOGOU', 'SRC-F10-JILIN-ECONOMY', 'SRC-F10-MANTETSU-ARCHIVES'],
      reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }

  scene('f10-s01', '班次铃、饭包与宿舍门口', '班次铃响后，韩景福带走装着干粮和手套的包；金桂芬按食客姓名摆碗。父亲工资、母亲饭食收入和宿舍资格从一开始就是三本账。', { minAge: 0, maxAge: 4, priority: 24 });
  scene('f10-s02', '旧零件不是孩子的玩具', '你捡到一只带陌生字样的旧零件，父亲说明它属于线路工具并带你归还。你可以画下形状和公开记号，却不能把工区物件带回家。', { minAge: 5, maxAge: 7, priority: 23 });
  scene('f10-s03', '欠下两顿饭的同班工友', '一名食客欠下两顿饭钱，父亲想宽限同班工友，母亲要求由她核原料和客户账后回答。共同生活不取消母亲的经营决定。', { minAge: 6, maxAge: 9, priority: 22 });
  scene('f10-s04', '三种半日学习撞在一起', '认线路工具、帮母亲核饭食账和向安娜学公开用字排在同一下午。你只能先做一项，剩下的由父母分别说明是否延期。', { minAge: 7, maxAge: 10, priority: 21 });
  scene('f10-s05', '停班还没有等于失业', '线路封闭让父亲停班，宿舍本月仍能住，下月资格却没有答复。家里分别核临时货场活、食客收入、积蓄和学校支出。', { minAge: 8, maxAge: 11, priority: 21 });
  scene('f10-s06', '车站文书只教公开用字', '安娜请你替母亲核对食客写下的不同姓名，只教公开站名、票货与日期格式；她拒绝翻看一份来源不明的封袋。', { minAge: 10, maxAge: 13, priority: 20 });
  scene('f10-s07', '秋生也想要一套工具', '秋生争取修理铺旁听，家中只够买一套简单量具。轮流、让他先去或另学一门都留下不同关系，他的机会不自动转成你的。', { minAge: 11, maxAge: 14, priority: 20 });
  scene('f10-s08', '三份试班都写明答复日', '线路站场、矿区地面班和修理铺分别说明地点、工序、工具、危险、工钱与答复日；没有一份介绍被提前写成正式职业。', { year: 1925, routes: ['northeast-railway-worker', 'northeast-mining-ground-worker', 'northeast-repair-worker'], priority: 28 });
  scene('f10-s09', '次年有正式岗位结果', '试班结束后，班组或师傅给出留用、换工序或不留用的答复。当前岗位、负责人、工资结算、住处影响与下一步进入人生账。', { year: 1926, routes: ['northeast-railway-worker', 'northeast-mining-ground-worker', 'northeast-repair-worker'], priority: 10 });
  scene('f10-s10', '本班职责要能复述', '你被要求复述本班工具、交接人、能做的工序和不能触碰的设备。一次说不清会带来再训练或停班，不用“进了铁路／矿区”掩盖权限。', { routes: ['northeast-railway-worker', 'northeast-mining-ground-worker', 'northeast-repair-worker'], minYear: 1926, maxYear: 1936, priority: 20 });
  scene('f10-s11', '事故现场有两套流程', '一名工友受伤，工头先问谁看见，孙瑞琴先处理伤情。你只说亲眼所见，未知部分继续未知；救治、工资、停班和责任分别确认。', { minAge: 18, maxAge: 32, priority: 20 });
  scene('f10-s12', '新通知没有一次回答所有事', '1931 年岗位名称、负责人和工牌使用出现变化。你逐项核本月班表、旧工资、宿舍和家人去向，制度背景不会替角色生成秘密身份。', { year: 1931, priority: 34 });
  scene('f10-s13', '迁站会失去母亲的食客', '母亲说明迁站意味着放弃现有食客和欠饭账，父亲则担心不迁失去班次。全家迁、分开迁或一人探路都要由每个人回答。', { minAge: 21, maxAge: 38, priority: 18 });
  scene('f10-s14', '结婚后争吵的是夜班和两边父母', '你与伴侣为夜班、宿舍、谁陪父亲复诊以及是否接母亲来住争吵。次日你们列各自班表、工资与不能承担的时段，没有一句“婚后安稳”跳过去。', { minAge: 23, maxAge: 42, priority: 19 });
  scene('f10-s15', '一场发热和咳嗽改变排班', '连续发热与咳嗽让你停下两班，孙瑞琴记录症状、药钱和复工建议。恢复后先接轻班，少掉的工资与家中照料重新协商。', { minAge: 25, maxAge: 50, priority: 18 });
  scene('f10-s16', '安娜准备离开原岗位', '安娜因岗位变化准备迁走，只能交还公开术语笔记并留下可公开联系的地址；受限文件没有成为礼物，她离开后也不自动死亡。', { minAge: 25, maxAge: 44, priority: 17 });
  scene('f10-s17', '1945 年重新核单位与工龄', '旧单位名称和负责人再次变化，技能仍在，工资与工龄却需凭工牌、工资条和两名旧同事分别核实；证明不全的部分保留未知。', { year: 1945, priority: 34 });
  scene('f10-s18', '1949 年逐项核现状', '系统列出当前站区、岗位、父母住处、秋生最后地址、伴侣工作、工牌、工资尾款、宿舍、工具和伤病记录。民国分段结束，人生继续。', { year: 1949, routes: ['northeast-railway-worker', 'northeast-mining-ground-worker', 'northeast-repair-worker'], priority: 36 });
  scene('f10-s19', '中晚年不再机械做同一种重活', '技术和身体变化后，你可带徒、转工具登记、做仓储交接、减少班次或离开固定岗位。最后职责、交接人和退工时间进入事实账。', { minAge: 50, maxAge: 68, priority: 15 });
  scene('f10-s20', '异地死亡要经过确认', '父母、伴侣、手足、同事或主人公异地死亡时，医务记录、同住者来信和旧同事消息可能不完整；发生、知情与确认年份分开保存。', { minAge: 62, priority: 14 });

  C.annualRhythms['northeast-railway-worker'] = [
    '班表、工牌、线路或票货职责、工具和交接人逐项核对；完成一段具体工作，也面对停班、寒冷、噪声或夜班的代价。',
    '赵万顺只回答本班事务，安娜只核公开票货文字；你处理一笔工资或一次交接，没有凭熟练自动升为调度或管理者。',
    '男性与女性角色能看到的岗位不同：有人巡线装卸，有人核票货和货场交接；两者都不是抽象的“在铁路工作”。',
  ];
  C.annualRhythms['northeast-mining-ground-worker'] = [
    '地面运料、筛选、灯房和工具发放分属不同岗位；班次、重量、粉尘、工资和停工各自留下结果。',
    '一次咳嗽或擦伤带来医务记录和轻班建议，马班长仍要另给岗位答复；看过医生不等于赔偿、痊愈或永久留岗。',
    '你完成一段能说明重量和交接人的工作，也可能因身体、照料或住处放弃高价班；家人的工资与决定不会自动并入。',
  ];
  C.annualRhythms['northeast-repair-worker'] = [
    '每件送修物都有旧损、领件人、工具、拆装步骤、工钱和交付日；学徒只对已授权并实际经手的工序负责。',
    '宋师傅决定铺内定价，秋生保留自己的工具与工资；你解决一次故障或返工，没有自动取得铺面和全部客户。',
    '识字、量具和手艺让可独立工序逐步增加，同时伴随油污、割伤、久站或视力疲劳，不把技术成长写成无代价升级。',
  ];
  C.sceneFrames.northeastrailworkers = [
    { open: '班次铃、食客叫饭和宿舍催问同时响起，韩景福核工牌，金桂芬核自己的饭食账，秋生又在等修理铺答复。', close: '今天只完成了可核的一段工作；未结工资、下一班、食客欠账、伤情和家人地址分别留到后账。' },
    { open: '站场、矿区或修理铺给出一份具体差事，工头、医务所、文书与家人各只回答自己有权处理的事项。', close: '你得到一次岗位或生活答复，也付出钱、身体、时间或关系代价；制度变化没有抹掉普通人的未知和边界。' },
  ];
  C.sceneFrames['northeast-railway-worker'] = C.sceneFrames.northeastrailworkers;
  C.sceneFrames['northeast-mining-ground-worker'] = C.sceneFrames.northeastrailworkers;
  C.sceneFrames['northeast-repair-worker'] = C.sceneFrames.northeastrailworkers;

  C.parentProfiles.northeastrailworkers = {
    mother: {
      name: '金桂芬', born: 1886, occupation: '经营工人住区饭食与缝补，保留食客账、原料和收入', deathAgeBase: 78,
      activities: ['按食客姓名核饭钱和欠账', '制度变动时重新决定是否迁走食客与锅具', '晚年减少做饭后仍保留有限缝补客户'],
      words: ['“和你爹一个班的，也要把哪顿欠了写清楚。”', '“迁站是你们的岗位，锅、客人和欠账要我自己算。”', '“我能少做几桌，不等于把这些东西一句话交出去。”'],
    },
    father: {
      name: '韩景福', born: 1883, occupation: '线路杂工后转货场，按班核工牌、工具与身体', deathAgeBase: 73,
      activities: ['天亮前核过手套、工具和本班交接', '伤后转到货场轻班并保留复诊记录', '晚年只说明旧线路和工具规矩，不再承担夜班'],
      words: ['“看见哪一段就说哪一段，没看见的事故不能替人补。”', '“先把伤看明白，工牌和宿舍再一项项问。”', '“熟路能教你，工位、工具和责任不会自动传给孩子。”'],
    },
  };
  C.spouseProfiles.northeastrailworkers = {
    男: { name: '林瑞芳', bornOffset: 1, occupation: '站区食堂记账与缝补劳动者，保留自己的收入和迁住决定', values: '共同生活要谈班次、住房、双方父母与生育，不接受自动离职随迁或代签事故证明' },
    女: { name: '周连海', bornOffset: -1, occupation: '货场木工与包装修理人，按件核工具和工钱', values: '愿意分担住处与照料，但不把妻子工资、文书或技术看成自己可支配的门路' },
  };
  C.childNames.northeastrailworkers = ['韩安铃', '韩念实'];

  var railwayBase = {
    kind: 'employment', role: '铁路线路、站场与票货劳动者', workplace: '长春合成北站线路与货场班组', employer: '合成北站铁路经办机构', supervisor: '线路工头赵万顺', colleague: '货场交接人罗继山', publicPerson: '核公开票货文字的安娜·彼得罗娃', terms: '有期限试班后按班结算；工牌、工具、停班、宿舍与制度更换分别答复',
    duties: '在授权范围内完成线路辅助、货场装卸或票货交接，记录工具、班表、货物与不能触碰的设备',
    scenes: ['换班时少一只扳手，你按领用和归还簿找到上一班经手，没有把缺件平均算给全班。', '一次夜班后持续头痛，你少接下一班并去医务所登记；工资损失和复工日期分别保存。', '人员通知改了岗位名称，你只核自己的工牌、负责人和本月班表，不声称知道全部制度决定。'],
  };
  var miningBase = {
    kind: 'employment', role: '矿区地面生产与后勤劳动者', workplace: '东北合成矿区地面运料、筛选与灯房班组', employer: '合成矿区地面经办机构', supervisor: '地面班长马同山', colleague: '筛选与灯房工刘小琴', publicPerson: '记录伤情的护理人员孙瑞琴', terms: '按班或按车次结算；地面岗位、重量、粉尘、停工、医务记录和住处资格分别确认',
    duties: '完成已说明的地面运料、筛选、灯房或工具发放，核重量、交班与身体症状，不越权下井或操作陌生设备',
    scenes: ['一车矿料跨过交班时间，你与刘小琴分别签各自经手段，少算工钱只追到有记录的车次。', '咳嗽加重后孙瑞琴建议四周轻班，马班长另给岗位答复；治疗和留用没有合成一句。', '高价临时班不说明重量和防护，你拒绝后少拿三日工钱，次周接到一段条件清楚的地面班。'],
  };
  var repairBase = {
    kind: 'employment', role: '机修铺学徒与检修劳动者', workplace: '长春合成北站机修铺', employer: '宋记机修铺与逐件送修人', supervisor: '机修师傅宋广成', colleague: '学徒韩秋生', publicPerson: '送修水泵与车具的顾成义', terms: '有期限学徒后按工序或按月结算；工具、旧损、授权、返工、定价和交付日期分别记录',
    duties: '核送修旧损和工具，完成获准的清洗、量具、装配与检修工序，向送修人说明结果和不能修的部分',
    scenes: ['轴承拆洗后发现旧裂纹，你按入铺记号和经手表核清，只承担一次清洗返工。', '秋生要用同一张工作台，你们分时并各签工具，彼此不能代领工资或承担损件。', '顾成义催取水泵，你说明还需一次试转和新交付日；宋师傅仍负责定价与最终承诺。'],
  };
  Object.assign(C.routeCareerProfiles, {
    'northeast-railway-worker': railwayBase,
    'northeast-mining-ground-worker': miningBase,
    'northeast-repair-worker': repairBase,
  });
  C.routeCareerProfilesByGender = C.routeCareerProfilesByGender || {};
  C.routeCareerProfilesByGender['northeast-railway-worker'] = {
    男: Object.assign({}, railwayBase, { role: '线路巡查与货场装卸工', workplace: '长春合成北站线路辅助与货场班', duties: '在具名工头带领下巡看被分配的线路段、搬运货件并核工具、班表和交接' }),
    女: Object.assign({}, railwayBase, { role: '车站票货文书与货场交接员', workplace: '长春合成北站公开票货窗口与货场交接处', supervisor: '票货经办安娜·彼得罗娃', duties: '核公开站名、票货、日期、货件和领取人，在时代限制下不被安排到未开放或未授权岗位' }),
  };
  C.routeCareerProfilesByGender['northeast-mining-ground-worker'] = {
    男: Object.assign({}, miningBase, { role: '矿区地面运料与工具发放工', workplace: '东北合成矿区地面运料与工具班', duties: '按车次做地面运料、装卸与工具发放，核重量、交接、粉尘和身体负担' }),
    女: Object.assign({}, miningBase, { role: '矿区筛选、灯房与地面运料女工', workplace: '东北合成矿区筛选场与灯房地面班', duties: '做筛选、灯房和有限地面运料，核班次、工具、粉尘、工钱与女工住处门槛' }),
  };
  C.routeCareerProfilesByGender['northeast-repair-worker'] = {
    男: Object.assign({}, repairBase, { role: '机修铺钳工学徒与检修工', workplace: '长春合成北站机修铺钳工台', duties: '从工具清洗、锉削和量具学起，按授权做拆装与检修并逐项签认' }),
    女: Object.assign({}, repairBase, { role: '机件登记、清洗与修理铺辅助工', workplace: '长春合成北站机修铺登记与低风险工序台', duties: '核送修单、旧损、工具和交付，完成清洗、量具与获准的低风险装配，不用手巧掩盖岗位门槛' }),
  };

  Object.assign(C.routeContactProfiles, {
    'northeast-railway-worker': [
      { id: 'f10_luo_huochang', label: '罗继山', role: '核货件、交接时刻与本班工具的货场工', status: 'coworker', relation: 21, born: 1899 },
      { id: 'f10_du_wage', label: '杜文书', role: '按工牌与班表答复工资和停班记录的经办人', status: 'nearby', relation: 14, born: 1891 },
      { id: 'f10_tian_injured', label: '田守良', role: '货场擦伤后保留自己治疗和复工意见的同事', status: 'coworker', relation: 20, born: 1904 },
    ],
    'northeast-mining-ground-worker': [
      { id: 'f10_ma_banzhang', label: '马同山', role: '安排地面班、核重量和给出停班答复的班长', status: 'supervisor', relation: 15, born: 1888 },
      { id: 'f10_liu_xiaoqin', label: '刘小琴', role: '做筛选与灯房、保留自己工资和换岗请求的同事', status: 'coworker', relation: 23, born: 1907 },
      { id: 'f10_zheng_housing', label: '郑嫂', role: '只处理宿舍床位、取暖与迁出日期的住处经办人', status: 'nearby', relation: 16, born: 1895 },
    ],
    'northeast-repair-worker': [
      { id: 'f10_song_shifu', label: '宋广成', role: '示范工序、授权工具并负责定价答复的机修师傅', status: 'supervisor', relation: 18, born: 1885 },
      { id: 'f10_gu_customer', label: '顾成义', role: '送修水泵和车具、要求说明旧损与交期的客户', status: 'nearby', relation: 17, born: 1894 },
      { id: 'f10_xu_parts', label: '徐料管', role: '按单发放机件并核旧件归还的材料经办人', status: 'nearby', relation: 13, born: 1890 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'northeast-railway-worker': ['严寒与夜班后的反复头痛和发热', '装卸和巡查造成的腰腿劳损', '货场噪声造成的耳鸣'],
    'northeast-mining-ground-worker': ['粉尘环境造成的反复咳嗽', '地面运料与筛选造成的腰背疼痛', '矿料与工具造成的擦伤扭伤'],
    'northeast-repair-worker': ['油污和清洗剂造成的手部皮炎', '锉削与机件边缘造成的手指割伤', '量具、灯光和久站造成的视力与腰背疲劳'],
  });

  Object.assign(C.publicRouteProfiles, {
    'northeast-railway-worker': {
      publicGroup: '合成的铁路工牌、工资与公开住处互助簿', publicRole: '核班表、伤假、工资答复、退信地址与公开缺工',
      covertRole: '不进入秘密身份线，只保留本人经手的公开工牌、货件和最后地址', infiltrationRole: '不进入冒名接近机构线，不借铁路岗位获取未授权文件',
      contact: { id: 'public_f10_luo_an', label: '罗安', role: '登记公开班表、工资答复和失效地址的互助经手人', status: 'colleague', relation: 17, born: 1903 },
    },
    'northeast-mining-ground-worker': {
      publicGroup: '合成的工区伤情、轻班与住处互助簿', publicRole: '登记公开医务答复、轻班、宿舍日期和失联同事',
      covertRole: '不进入秘密身份线，不把工友伤情和住址转作未授权信息', infiltrationRole: '不进入冒名接近机构线，只处理公开地面劳动和生活互助',
      contact: { id: 'public_f10_liu_an', label: '刘安', role: '核公开轻班、伤假与宿舍退住日期的互助经手人', status: 'colleague', relation: 18, born: 1906 },
    },
    'northeast-repair-worker': {
      publicGroup: '合成的民用修理、工具借用与工伤互助簿', publicRole: '核公开送修单、工具借用、伤假与学徒缺工',
      covertRole: '不进入秘密身份线，不借修理工作推断客户未说明的用途', infiltrationRole: '不进入冒名接近机构线，只接有送修人和领取人的公开工作',
      contact: { id: 'public_f10_song_ping', label: '宋平', role: '登记公开送修、工具借还与学徒答复的互助经手人', status: 'colleague', relation: 17, born: 1905 },
    },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('worker', 'northeast-railway-worker');
  addRouteToTrack('worker', 'northeast-mining-ground-worker');
  addRouteToTrack('worker', 'northeast-repair-worker');
})(typeof window !== 'undefined' ? window : globalThis);
