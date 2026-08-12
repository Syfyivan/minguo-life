// 民国人生 · F05 上海城市劳工与棚户家庭运行时包 v0.7.6
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f05.js');

  C.version = '0.7.6';
  C.familyDecisionKeys.shanghailabor = { path: 'shanghai-labor-path', war: 'shanghai-labor-war' };
  Object.assign(C.designRegistry.families.F05, {
    designStatus: 'runtime-reviewed-first-round',
    runtimeStatus: 'playable-verified',
    runtimeFamilyKey: 'shanghailabor',
  });
  C.runtimeFamilyDesignMap.shanghailabor = 'F05';
  Object.assign(C.legacyRouteDomainMap, {
    'shanghai-textile-worker': 'D07',
    'shanghai-transport-worker': 'D10',
    'shanghai-domestic-service': 'D18',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F05-SHANGHAI-SOCIETY': {
      label: '上海市档案馆《社会团体档案指南》',
      url: 'https://www.shda.gov.cn/daly/gczn/202509/t20250919_74644.html',
      supports: ['近代上海工人生活、失业、工资、住房、夜校与劳资纠纷的档案范围'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F05-SHANGHAI-ADMIN': {
      label: '上海市档案馆《地方行政档案指南》',
      url: 'https://www.shda.gov.cn/daly/gczn/202509/t20250919_74648.html',
      supports: ['近代上海人力车、车租、劳工医疗、失业、工资与工人生活的档案范围'],
      status: 'source-linked-needs-final-review',
    },
  });

  C.families.shanghailabor = {
    key: 'shanghailabor',
    name: '上海城市劳工与棚户家',
    born: 1910,
    place: '上海合成东区棚户弄堂',
    defaultSeed: 510,
    defaultNames: { 男: '李守成', 女: '李玉兰' },
    motif: '床位、房租押金、车租、洗衣钱、工厂工资和亲属照料分别记账；有介绍只代表一次试工，不代表已经有职业。',
    start: { body: 49, knowledge: 20, craft: 30, mind: 40, network: 35, fame: 20 },
    startRes: { money: 14, health: 67, relation: 70, position: 22 },
    subjects: {
      mother: { label: '母亲', status: 'alive', health: 57, agency: 88, note: '洗衣、缝补和钟点家务的工钱归她本人，是否住进雇主家由她决定' },
      father: { label: '父亲', status: 'alive', health: 59, agency: 76, note: '租车拉客兼运货，车、押金和车租都不属于家庭资产' },
      spouse: { label: '配偶', status: 'not-met', health: 65, agency: 84, note: '共同住处、工资账户、生育、双方父母照料和迁移都要重新协商' },
      household: { label: '同住家口', status: 'one-rented-bed-space', strength: 55, agency: 80 },
      support: { label: '住处与照料支持', status: 'rent-and-neighbor-exchange', strength: 34, agency: 75 },
      connections: { label: '车行工厂与雇主门路', status: 'trial-introductions-only', strength: 25, agency: 74 },
      workers: { label: '同事、帮工与合伙人', status: 'separate-wages-and-terms', strength: 22, agency: 82 },
      ledger: { label: '房租车租工资与客户账', status: 'separate-records', strength: 38, agency: 80 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 80, note: '不自动出生，也不自动承担挣钱、照料或继承债务' },
    },
    contacts: {
      f05_li_qingyuan: { label: '李庆元', role: '租车拉客兼短途运货的父亲，按日交车租', status: 'family', relation: 58, agency: 76, note: '受伤后可决定治疗、退车或改做轻活，不能被自动安排继续夜班' },
      f05_wu_abao: { label: '吴阿宝', role: '做洗衣缝补和钟点家务的母亲，保留自己的客户与工钱', status: 'family', relation: 61, agency: 88, note: '可以拒绝住家雇佣或合伙，不是家庭默认无薪劳力' },
      f05_li_xiaoman: { label: '李小满', role: '年幼手足，长大后自己选择读书、做工、婚姻和住处', status: 'family', relation: 50, agency: 90, note: '童年照料有期限，成年后不自动成为主角的帮工' },
      f05_gu_sanniang: { label: '顾三娘', role: '收房租并协调床位、灶位和用水的二房东', status: 'nearby', relation: 21, agency: 82, note: '能催租、退租或同意延期，也要说明押金和维修责任' },
      f05_cao_fuchang: { label: '曹福昌', role: '车行经办人，掌握租车、押金、修车与缺班记录', status: 'nearby', relation: 18, agency: 72, note: '可以给试工和停租答复，不能把所有车损无凭推给车夫' },
      f05_zhao_yindi: { label: '赵银娣', role: '弄堂朋友，后来进入纱厂并保留自己的工资和住处选择', status: 'nearby', relation: 31, agency: 91, note: '能互换消息或按约合伙，也可以拒绝担保、婚配与迁住' },
    },
  };

  Object.assign(C.routes, {
    'shanghai-textile-worker': { name: '纱厂机台、验布与计件工作', family: 'shanghailabor', summary: '从有期限试工进入具体班组，逐班面对机台、工钱、伤病、停工和去留。' },
    'shanghai-transport-worker': { name: '人力车、短途运货与弄堂送件', family: 'shanghailabor', summary: '按性别与实际门路进入不同可见岗位，逐日核车租、货物、路线、伤病和结算。' },
    'shanghai-domestic-service': { name: '洗衣缝补与受薪家务服务', family: 'shanghailabor', summary: '把住家、钟点、洗衣、客户物件和自营合伙分开，不把照料劳动写成天生义务。' },
  });

  C.actions.push(
    { id: 'f05-help-laundry-ledger', name: '帮母亲核衣物记号与洗衣钱', families: ['shanghailabor'], minAge: 6, maxAge: 17, spirit: 2, delta: { craft: 3, knowledge: 1, relation: 1, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 1 } }, contactEffects: { f05_wu_abao: { relation: 1 }, f05_gu_sanniang: { relation: 1 } }, note: '认客户衣物、约定日期和已付钱；儿童不接触滚水或强碱。' },
    { id: 'f05-night-school-literacy', name: '去夜校或识字班学工牌与地址', families: ['shanghailabor'], minAge: 8, spirit: 3, delta: { knowledge: 4, mind: 2, network: 1 }, channels: ['conversation'], contactEffects: { f05_zhao_yindi: { relation: 1 } }, note: '能核工牌、工资条、地址和客户记号，但识字不自动带来白领岗位。' },
    { id: 'f05-care-for-sibling-by-turn', name: '按轮值照看小满并保留上学时段', families: ['shanghailabor'], minAge: 6, maxAge: 15, spirit: 2, delta: { relation: 3, mind: 1, knowledge: -1 }, subjectDelta: { household: { strength: 2 }, children: { agency: 1 } }, contactEffects: { f05_li_xiaoman: { relation: 2 } }, note: '只承担约定时段，不把照看手足变成永久退学或替父母决定。' },
    { id: 'f05-textile-shift-check', name: '核机台、班次、计件与坏纱', routes: ['shanghai-textile-worker'], minAge: 13, spirit: 4, careerAction: true, delta: { craft: 3, body: 1, money: 2, health: -1 }, subjectDelta: { ledger: { strength: 2 }, workers: { strength: 1 } }, contactEffects: { f05_zhao_yindi: { relation: 1 }, f05_qian_ban: { relation: 1 } }, note: '把个人产量、机台故障、坏纱和停机时段分别记录。' },
    { id: 'f05-textile-wage-review', name: '与同班核工资条、罚扣和伤假', routes: ['shanghai-textile-worker'], minAge: 16, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 2, relation: 1, money: 1 }, contactEffects: { f05_zhao_yindi: { relation: 2 }, f05_chen_jie: { relation: 1 } }, note: '只核能证明的工时、计件和罚扣，不承诺一次争议就改变整座工厂。' },
    { id: 'f05-transport-route-ledger', name: '核车租、货件、路线与交接人', routes: ['shanghai-transport-worker'], minAge: 13, spirit: 4, careerAction: true, delta: { body: 2, craft: 2, money: 2, health: -1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f05_cao_fuchang: { relation: 1 }, f05_sun_shun: { relation: 1 } }, note: '男女人物会进入不同可见工作，但货件、路线与报酬都要有具体交接。' },
    { id: 'f05-transport-customer-handoff', name: '向乘客或客户确认地址、迟误与赔付', routes: ['shanghai-transport-worker'], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 3, network: 2, money: 1 }, contactEffects: { f05_lu_customer: { relation: 2 }, f05_sun_shun: { relation: 1 } }, note: '迟误、损坏和改地址按发生环节处理，不用一句“跑运输”跳过过程。' },
    { id: 'f05-domestic-service-ledger', name: '核客户衣物、钟点与已做家务', routes: ['shanghai-domestic-service'], minAge: 13, spirit: 3, careerAction: true, delta: { craft: 3, knowledge: 2, money: 2, health: -1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f05_wu_abao: { relation: 1 }, f05_lin_client: { relation: 1 } }, note: '客户物件、母亲客户、主角客户和雇主家务分别登记。' },
    { id: 'f05-domestic-boundary-talk', name: '谈钟点、住家、休息与离开条件', routes: ['shanghai-domestic-service'], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 3, relation: 1, position: 1, money: 1 }, contactEffects: { f05_lin_client: { relation: 2 }, f05_zhao_yindi: { relation: 1 } }, note: '照料和家务是工作条件，不因性别、贫穷或同住自动无限延长。' }
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
        sourceIds: ['SRC-F05-SHANGHAI-SOCIETY', 'SRC-F05-SHANGHAI-ADMIN'],
        reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete choice.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  installDecision({
    id: 'shanghai-labor-path', year: 1924, followYear: 1925, families: ['shanghailabor'], title: '第一份有答复的工作怎样试',
    prompt: '赵银娣带来纱厂试工，曹福昌只给一段运输缺工，吴阿宝另有一户按钟点招人。三份工作都要问地点、班次、报酬、住处、危险和答复日期。',
    options: [
      option('textile-trial', '进纱厂做有期限试工，先学机台与工资条', { craft: 3, body: 1, money: 1 }, 'f05:path:textile', '1924 年进入合成纱厂做有期限试工。', '纱厂给出具体班组答复', '钱班头确认你进入一段有班表的机台或验布工作；赵银娣仍领自己的工资，你们的工牌和罚扣分别记录。', { route: 'shanghai-textile-worker' }),
      option('transport-trial', '接一段有路线和结算人的运输试工', { body: 2, network: 2, money: 1 }, 'f05:path:transport', '1924 年进入合成东区运输与送件试工。', '运输试工落成具体工作', '曹福昌只为车行租车答复，孙顺只核交接路线；你的性别和门路会影响岗位，但每天都有货件或乘客、报酬与收工结果。', { route: 'shanghai-transport-worker' }),
      option('domestic-service-trial', '接按钟点结算的洗衣缝补与家务试工', { craft: 2, relation: 2, money: 1 }, 'f05:path:domestic', '1924 年进入按钟点结算的洗衣缝补与家务服务。', '雇主说明工作与离开条件', '林太太列出洗衣、缝补、清扫和照看时段，试工结束后按钟点留用；住家服务仍需另行同意，母亲客户没有转成你的财产。', { route: 'shanghai-domestic-service' }),
    ],
  });

  installDecision({
    id: 'route-shanghai-textile-worker-1929', year: 1929, followYear: 1930, routes: ['shanghai-textile-worker'], title: '工资、机伤和停班怎样留下结果',
    prompt: '工资条少记两班，邻台又有人手伤；钱班头把坏纱、停机和个人动作混在一起扣钱。',
    options: [
      option('verify-piecework-ledger', '拿工牌与同班记录逐项核工资和坏纱', { knowledge: 2, mind: 2, money: 1 }, 'f05:textile:verify', '1929 年逐项复核工牌、计件、停机和坏纱记录。', '两班工资得到明确答复', '一班因停机补回，另一班仍因工牌记录不全待查；坏纱只落到已经确认的机台时段，没有平均扣全班。'),
      option('report-machine-injury', '先陪伤者就医并保留机台与经手记录', { relation: 3, money: -1, position: -1 }, 'f05:textile:injury', '1929 年先处理同班机伤并保存当班记录。', '伤情和停班分别确认', '陈姐手伤得到处理并停下原机台，钱班头取消你下一次加班；伤者没有在次年文本里无故恢复，你也没有被写成唯一救命人。'),
      option('leave-after-unpaid-shifts', '结清能证明的工资后离开这段班组', { money: -2, mind: 3, network: 1 }, 'f05:textile:leave', '1929 年结清可证明工资后离开原班组。', '离开之后出现下一份明确工作', '你凭旧工牌进入一间较小的验布作坊，工钱降低但班次和负责人明确；不是继续年年“找工作”，也不是一步升成管理者。'),
    ],
  });

  installDecision({
    id: 'route-shanghai-textile-worker-1942', year: 1942, followYear: 1943, routes: ['shanghai-textile-worker'], title: '战时班组与住处怎样安排',
    prompt: '原厂班次反复变化，一间小作坊有具名负责人，弄堂洗衣服务也缺人；每个选择都会改变收入、照料和身体负担。',
    options: [
      option('stay-documented-shift', '只接班表、工资和负责人可核的原厂班次', { money: 1, position: 1, health: -1 }, 'f05:textile:stay', '1942 年保留原厂有记录的班次。', '固定下来的只是当前班表', '你拿到六周班表和结算日，临时加班仍逐次同意；伴侣和父母知道具体夜班，没人被默认守家。'),
      option('move-with-confirmed-workshop', '拿到地址和工钱答复后转入小验布作坊', { craft: 2, network: 2, money: 1 }, 'f05:textile:move', '1942 年转入地址、职责与工钱已确认的小验布作坊。', '转厂没有抹掉旧工资', '新作坊按月结验布工钱，旧厂尚欠的一班继续单独追索；赵银娣选择留在原厂，你们仍交换公开缺工消息。'),
      option('leave-for-lane-service', '离开机台，转做弄堂洗衣缝补与送件', { health: 2, craft: 2, money: -1 }, 'f05:textile:lane', '1942 年离开机台转入弄堂服务工作。', '职业改变带来新的具体客户', '你接下四户洗衣缝补和两条送件路线，收入低于旺班时期；机台咳嗽有所缓解，热水和久站又成为新的身体负担。'),
    ],
  });

  installDecision({
    id: 'route-shanghai-transport-worker-1929', year: 1929, followYear: 1930, routes: ['shanghai-transport-worker'], title: '父亲受伤和车租怎样处理',
    prompt: '李庆元摔伤后不能继续整日拉车，曹福昌仍按日催车租。治疗、退车、借款和家中各人的工作不能混成一句“全家扛过去”。',
    options: [
      option('return-rented-cart-treat-father', '退还租车、核车损，先让父亲治疗', { money: -3, relation: 3, health: 1 }, 'f05:transport:return', '1929 年退车并把父亲治疗列为当期支出。', '退车和伤情各有结果', '曹福昌核完旧损后退回一部分押金，父亲停下拉车接受治疗；你少一条熟路收入，母亲没有被强迫住进雇主家补钱。'),
      option('keep-cart-with-recorded-debt', '暂留租车并把车租欠款写明债权人与期限', { money: 1, health: -2, mind: 1 }, 'f05:transport:debt', '1929 年暂留租车并登记一笔有期限车租欠款。', '留车换来收入也留下债', '你接替能完成的白班，父亲只做认路和轻交接；曹福昌写明欠租、归还日和停租条件，没有把债写成全家终身义务。'),
      option('split-cargo-and-care-shifts', '与母亲和小满逐人协商工作与照料时段', { relation: 2, money: -1, mind: 2 }, 'f05:transport:split', '1929 年逐人协商运货、洗衣和父亲照料时段。', '照料表没有抹掉各自工作', '吴阿宝保留三户洗衣工，小满只承担放学后一个时段，你减少两次远途送件；父亲自己决定复诊和何时尝试轻活。'),
    ],
  });

  installDecision({
    id: 'route-shanghai-transport-worker-1942', year: 1942, followYear: 1943, routes: ['shanghai-transport-worker'], title: '货物来源和工作职责怎样确认',
    prompt: '一批民生送件有客户签收，一间仓房给固定班，一条高价路线却不说明货物、领取人和赔付边界。',
    options: [
      option('verified-civilian-delivery', '只接货物、地址与领取人可核的民生送件', { relation: 2, money: -1, mind: 2 }, 'f05:transport:verified', '1942 年只接可核验的民生货件和乘客。', '少接的路线换来清楚交接', '药包、衣物和食物各有领取人签记；你拒掉两次高价匿名货，收入下降，但没有在事后被写成知道其最终用途。'),
      option('fixed-warehouse-shift', '转入有固定班表与负责人的仓房搬运交接', { money: 2, body: 1, health: -1 }, 'f05:transport:warehouse', '1942 年进入有固定班表的仓房搬运交接岗位。', '仓房岗位写清了上下班', '孙顺负责上一段货路，你只核入库、码放和出库签；六周后续班得到确认，超出职责的调度仍由具名经办人决定。'),
      option('leave-unclear-cargo', '拒绝不说明货物与领取人的路线并另找公开短工', { money: -2, position: -1, mind: 3 }, 'f05:transport:leave', '1942 年拒绝不明货路并转接公开短工。', '拒绝以后不是空白一年', '曹福昌停掉你三次班，你随后接到洗衣送件和市场卸货两类公开短工；每次地点、经手人和结算日都进入记录。'),
    ],
  });

  installDecision({
    id: 'route-shanghai-domestic-service-1929', year: 1929, followYear: 1930, routes: ['shanghai-domestic-service'], title: '雇主家务、客户衣物和母亲生计怎样分开',
    prompt: '林家想把钟点工作改成住家，母亲与赵银娣又各有自己的客户；同在一间屋里做事不等于客户、工资和责任自动共有。',
    options: [
      option('protect-client-ledger-boundary', '把母亲、自己和赵银娣的客户与工钱分别登记', { knowledge: 2, relation: 2, money: 1 }, 'f05:domestic:ledger', '1929 年建立三份客户、衣物与工钱记录。', '分账保住以后合伙的可能', '吴阿宝继续收自己的洗衣钱，赵银娣只为她介绍的一户负责；你按自己完成的钟点结算，三人约定日后合伙也要重新列出出资。'),
      option('separate-laundry-and-housework', '只保留洗衣缝补，拒绝无限增加家务', { craft: 2, money: -1, mind: 2 }, 'f05:domestic:separate', '1929 年把洗衣缝补与雇主家务拆成两份工作。', '少做一类工作也有明确后果', '林家另请人做清扫，你失去一段钟点钱，仍保留四户衣物客户；衣物损坏、取送日期和返工范围更容易核对。'),
      option('leave-overnight-employer', '拒绝住家安排并结清已经完成的钟点', { money: -2, position: -1, relation: 1 }, 'f05:domestic:leave', '1929 年拒绝住家服务并结清已做钟点。', '离开雇主后出现具体新生计', '你转与母亲分时使用灶边和晾衣处，又接两户缝补；顾三娘提高一点用水分摊，收入、房租和休息变成新的现实压力。'),
    ],
  });

  installDecision({
    id: 'route-shanghai-domestic-service-1942', year: 1942, followYear: 1943, routes: ['shanghai-domestic-service'], title: '受薪服务还是按约经营',
    prompt: '已有客户能支撑继续钟点服务，也能与母亲和赵银娣有限合伙，或独租一间缝补小屋；三条路的产权、债务和工作量不同。',
    options: [
      option('remain-hourly-service', '继续按钟点受薪，只接能完成的客户', { money: 2, relation: 1, health: 1 }, 'f05:domestic:hourly', '1942 年继续按钟点受薪并限制客户数量。', '受薪服务形成稳定客户表', '你保留六户固定客户和两日休息，林家不能临时把钟点改为住家；母亲减少重洗衣后仍收自己的两户工钱。'),
      option('lane-laundry-partnership', '与母亲、赵银娣按现金、工具和劳动有限合伙', { money: -2, craft: 2, relation: 3 }, 'f05:domestic:partnership', '1942 年与母亲、赵银娣建立有限洗衣缝补合伙。', '合伙社完成第一批客户交接', '吴阿宝投入两只自有木盆，赵银娣投入客户介绍和一段现金，你投入劳动与账务；首批六户衣物逐件签记，三人的退出条件也写入合伙账。', { enterpriseStart: { id: 'f05-lane-laundry', name: '合成阿宝银娣洗衣缝补社', kind: 'laundry-mending-partnership', workplace: '上海合成东区弄堂洗衣缝补间', product: '洗衣、缝补与有签记的取送服务', employees: 0, partners: [{ personId: 'parent:mother', role: '木盆与洗衣技艺合伙人' }, { personId: 'contact:f05_zhao_yindi', role: '有限现金与客户交接合伙人' }], asset: { id: 'wash-tools', kind: 'washbasins-and-mending-tools', description: '吴阿宝自有的两只木盆与三人逐项登记的缝补工具' } } }),
      option('independent-mending-room', '独租小屋并承担具名押金和工具债', { money: -4, network: 2, mind: 2 }, 'f05:domestic:independent', '1942 年独租缝补小屋并登记开业债。', '独立经营先出现债和有限客户', '顾三娘列明押金与用水条件，布行供货人记下一笔线料债；母亲和赵银娣的旧客户没有自动转来，你第一月只完成三户缝补。', { enterpriseStart: { id: 'f05-independent-mending', name: '合成玉兰缝补间', kind: 'sole-mending-room', workplace: '上海合成东区一间租用小屋', supplier: '合成布行许掌柜', product: '衣物缝补、改尺寸与取送', employees: 0, asset: { id: 'mending-tools', kind: 'mending-tools', description: '自购针线、熨具和一张二手工作台' }, debt: { id: 'opening-deposit-and-thread', creditor: '顾三娘与合成布行许掌柜', purpose: '小屋押金、用水预付与首批线料' } } }),
    ],
  });

  installDecision({
    id: 'shanghai-labor-war', year: 1937, followYear: 1938, families: ['shanghailabor'], title: '住处、工作和家人怎样在变动中确认',
    prompt: '原住处与工作都可能中断。父亲伤情、母亲客户、小满去向、伴侣意见和每个人能抵达的地址必须逐项确认。',
    options: [
      option('follow-confirmed-workplace', '只在工作、住处与同行人都确认后迁近岗位', { money: -2, position: 1, mind: 2 }, 'f05:war:workplace', '1937 年在岗位和住处均有答复后迁移。', '迁住后逐人确认结果', '你抵达有具名负责人的工作点，伴侣按自己的岗位另作安排；父母选择暂留原弄堂，小满的地址由本人回来确认。', { warTurn: 'follow-confirmed-workplace' }),
      option('stay-and-care-injured-parent', '暂留照料伤病父亲，同时保留一段公开工作', { relation: 3, money: -2, health: -1 }, 'f05:war:care', '1937 年暂留照料父亲并减少工作。', '照料没有吞掉所有人的人生', '父亲接受复诊，母亲保留两户洗衣客户，你只接半日班；伴侣可以选择另住或轮值，小满没有被默认叫回家。', { warTurn: 'stay-and-care-injured-parent' }),
      option('separate-address-work', '家人按各自工作分开住，并约定核地址和失联期限', { network: 2, relation: -1, mind: 3 }, 'f05:war:separate', '1937 年家人按各自工作暂时分住并建立地址确认表。', '分住不是失踪或死亡', '你、父母、小满和伴侣各留一个最后确认地址、经手人和下次通信日期；一封退信只把该地址标为失效，没有把收信人补写成死亡。', { warTurn: 'separate-address-work' }),
    ],
  });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['shanghailabor'], priority: 12,
      sourceIds: ['SRC-F05-SHANGHAI-SOCIETY', 'SRC-F05-SHANGHAI-ADMIN'],
      reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }

  scene('f05-s01', '一张床位也有押金和轮换', '顾三娘收下一个床位的押金，说明谁睡、谁做饭、何时用水。父母的工资不因同住自动并成一笔，欠租也要写明是哪一段。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f05-s02', '父亲每天先交车租', '李庆元天未亮去曹福昌处领租车，先核旧损、当日车租和归还时间；拉到的钱不是毛收入全归家里，车也不是他的资产。', { minAge: 2, maxAge: 5, priority: 23, sourceIds: ['SRC-F05-SHANGHAI-ADMIN'] });
  scene('f05-s03', '母亲认衣物也认客户', '吴阿宝给每件衣物缝不同记号，写下取衣日期和已付钱。她替一户做钟点家务，洗衣客户、雇主和家里各是不同关系。', { minAge: 3, maxAge: 6, priority: 22 });
  scene('f05-s04', '三种童年时间撞在一起', '洗衣记号、识字班和照看小满排在同一晚。你只能选一段先做，父母也要说明剩下的活由谁承担，而不是默认由女儿补上。', { minAge: 6, maxAge: 9, priority: 21 });
  scene('f05-s05', '欠租不是一句穷困', '这一月差一段房租，顾三娘提出延期、退押金换小床位或搬去更挤的转租间。每种安排都写清期限、用水和谁同住。', { minAge: 7, maxAge: 11, priority: 20 });
  scene('f05-s06', '小满也有自己的选择', '李小满想继续识字，不愿整日帮母亲送衣。家里把放学后的一个时段写进轮值，余下时间仍由她自己使用。', { minAge: 9, maxAge: 13, priority: 20 });
  scene('f05-s07', '朋友带来的只是一次试工', '赵银娣说纱厂缺人，却明确不知道会不会留用；她只答应带到门口和说明班次，不替班头保证工钱。', { minAge: 11, maxAge: 15, priority: 20 });
  scene('f05-s08', '三份试工都要等答复', '纱厂、运输和钟点家务各给一段有限机会。你问清岗位、危险、报酬、住处和最后答复人，没有把“介绍过”写成“已经找到工作”。', { year: 1924, routes: ['shanghai-textile-worker', 'shanghai-transport-worker', 'shanghai-domestic-service'], priority: 28 });
  scene('f05-s09', '次年写清工作结果', '试工结束后，班组、路线或客户表给出继续、换岗或不留用的答复；当前职业、工作地点、结算方式和下一步进入人生账。', { year: 1925, routes: ['shanghai-textile-worker', 'shanghai-transport-worker', 'shanghai-domestic-service'], priority: 10 });
  scene('f05-s10', '坏纱和停机不混扣', '一卷坏纱横跨两班，你与赵银娣核机台、停机和交接时间。只确认一段经手责任，其余等待钱班头拿记录答复。', { routes: ['shanghai-textile-worker'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f05-s11', '一趟运输有起点和收件人', '你接下一名乘客或三件衣物，从出发、改地址到签收逐段确认。雨天迟误带来少收钱或赔付，却没有用“奔波一年”略过。', { routes: ['shanghai-transport-worker'], minYear: 1925, maxYear: 1936, priority: 20, sourceIds: ['SRC-F05-SHANGHAI-ADMIN'] });
  scene('f05-s12', '雇主临时增加住家要求', '林家想让你留宿看顾病人，你问清新增时段、报酬、睡处和离开日期。拒绝会失去工钱，同意也不是永久交出人身安排。', { routes: ['shanghai-domestic-service'], minYear: 1925, maxYear: 1936, priority: 20 });
  scene('f05-s13', '父亲摔伤后的第二天', '李庆元的伤情、未交车租、车上旧损和当天没跑成的货分别处理。谁去复诊、谁少上一班、谁与曹福昌说话都有名字。', { minAge: 18, maxAge: 29, priority: 19 });
  scene('f05-s14', '结婚以后先谈四本账', '你与伴侣核各自工资、共同房租、双方父母支出和个人可支配钱。一次争吵围绕夜班与小满借住，次日约定重新谈，不用“感情稳定”抹平。', { minAge: 23, maxAge: 40, priority: 18 });
  scene('f05-s15', '一次发热改变班次', '连续发热与咳嗽使你停下两班，医生、药钱和谁代交工牌都有记录。恢复后先接轻班，工资损失不会被一句痊愈消失。', { minAge: 26, maxAge: 48, priority: 18 });
  scene('f05-s16', '朋友不是永远同路', '赵银娣打算转厂或参与洗衣合伙，你们核她自己的工资、客户、住处和风险。她可以拒绝与你合伙，友情也不会因此自动清零。', { minAge: 28, maxAge: 50, priority: 17 });
  scene('f05-s17', '合伙第一月先处理错衣', '一户客户拿错衣物，三人按记号、取送和经手表找回。返工由实际经手范围承担，没有从每个人分成中平均扣除。', { routes: ['shanghai-domestic-service'], minYear: 1943, maxYear: 1955, priority: 18 });
  scene('f05-s18', '1949 年逐项核现状', '系统列出父母、小满、伴侣、朋友、工作、床位、押金、车租、客户衣物、工资尾款、企业资产和债。民国分段结束，人生继续。', { year: 1949, routes: ['shanghai-textile-worker', 'shanghai-transport-worker', 'shanghai-domestic-service'], priority: 35 });
  scene('f05-s19', '父母分别减少工作', '李庆元停下整日拉车，只偶尔认路；吴阿宝减少重洗衣，仍决定保留哪些缝补客户和自己的两只木盆。退休没有自动转移工资与资产。', { minAge: 50, maxAge: 68, priority: 15 });
  scene('f05-s20', '死亡以后还要结清具体事项', '父母、伴侣、朋友、雇主或合伙人死亡后，工资尾款、客户衣物、房租押金、工具份额和未回信件仍按最后记录处理；不确定的继续标为未知。', { minAge: 62, priority: 14 });

  C.annualRhythms['shanghai-textile-worker'] = [
    '机台、班次、工牌、计件、坏纱和停机逐项核对；你完成一段具体工作，也面对一次噪声、棉尘或罚扣带来的代价。',
    '钱班头只答复当前班表，赵银娣核自己的工资；你处理一笔少算工钱或一处机台故障，没有凭熟练自动升任管理者。',
    '一班收入接住房租，另一段身体不适迫使你少做加班；工作、家务和照料的缺口由具体的人重新协商。',
  ];
  C.annualRhythms['shanghai-transport-worker'] = [
    '今天的乘客或货件有起点、地址、经手人与结算；车租、脚钱、迟误和损坏分别记录，跑得多不等于净收入都归自己。',
    '性别和时代门槛改变你能见到的岗位：有人租车拉客，有人沿客户与商号路线送件；两者都不是抽象的“做运输”。',
    '你完成一段白班或送件路线，又因雨天、伤病或照料放弃一单；曹福昌只决定车行事务，家人的去留仍由本人回答。',
  ];
  C.annualRhythms['shanghai-domestic-service'] = [
    '客户衣物、钟点家务、住家要求和母亲自己的生计分别结算；你只为已经接下并能完成的服务负责。',
    '林家改了一次时段，顾三娘又核用水钱；你保住几户客户，也因休息、病痛或照料退掉一户，不用“操持家务”概括全年。',
    '如果已经合伙，现金、木盆、针线、客户和工时按出资人分开；如果仍受薪，雇主也不能把同住写成无限工作。',
  ];
  C.sceneFrames.shanghailabor = [
    { open: '弄堂里先响起收衣和催租声，吴阿宝核客户记号，李庆元又要去车行说明车租、旧损与今天能不能上路。', close: '这一天只完成了可核的一段工作；未结工钱、未回客户、父亲伤情和下次房租日期分别留在记录里。' },
    { open: '班表、送件地址、雇主钟点和家中照料撞在一起，赵银娣、顾三娘与曹福昌各只回答自己负责的事项。', close: '你得到一次具体答复，也付出钱、身体、时间或关系上的代价；母亲、手足、伴侣和朋友仍保留各自的工资与去留。' },
  ];
  C.sceneFrames['shanghai-textile-worker'] = C.sceneFrames.shanghailabor;
  C.sceneFrames['shanghai-transport-worker'] = C.sceneFrames.shanghailabor;
  C.sceneFrames['shanghai-domestic-service'] = C.sceneFrames.shanghailabor;

  C.parentProfiles.shanghailabor = {
    mother: {
      name: '吴阿宝', born: 1885, occupation: '洗衣缝补与钟点家务劳动者，保留自己的客户、工钱与工具', deathAgeBase: 76,
      activities: ['核过客户衣物、取衣日期和洗衣钱', '拒绝把钟点工作无条件改成住家', '减少重洗衣后保留有限缝补客户'],
      words: ['“衣裳是谁送来的、钱付到哪一步，要缝在记号里。”', '“我能去做这几小时，住不住进去要另说。”', '“木盆是我买的，合伙可以用，不能一句一家人就没了名字。”'],
    },
    father: {
      name: '李庆元', born: 1882, occupation: '租车拉客与短途运货人，按日核车租、旧损和路线', deathAgeBase: 72,
      activities: ['天亮前核过租车与旧损', '摔伤后停整日拉车并做有限认路', '晚年只替熟人说明路线与车行规矩'],
      words: ['“车是曹家的，今天挣的钱先要扣车租，不能只看手里一把铜元。”', '“我伤了先看伤，退车和欠租一件件算。”', '“熟路可以告诉你，车、押金和客户不会自己变成你的。”'],
    },
  };
  C.spouseProfiles.shanghailabor = {
    男: { name: '周惠珍', bornOffset: 1, occupation: '验布与缝补劳动者，保留自己的工资、休息日和住处选择', values: '愿意共同付房租与照料双方父母，但不接受自动辞工守家或替企业担保' },
    女: { name: '孙顺', bornOffset: -1, occupation: '市场搬运与货物交接人，按班次和货件结算', values: '共同生活要谈夜班、家务、生育、双方父母与个人工资，不把妻子客户视为家庭共有' },
  };
  C.childNames.shanghailabor = ['李安时', '李念清'];

  var textileBase = {
    kind: 'employment', role: '纱厂机台与验布工', workplace: '上海合成东区纱厂班组', employer: '合成纱厂', supervisor: '钱班头', colleague: '赵银娣', publicPerson: '工伤后转做验布的陈姐', terms: '有期限试工后按班与计件结算；工牌、停机、坏纱、罚扣和伤假分别记录',
    duties: '按班操作低风险工序或验布，核工牌、计件、坏纱与停机并处理已确认的工资争议',
    scenes: ['一卷坏纱跨过两班，你用工牌和停机时刻拆开责任；赵银娣的工资没有替你补扣。', '陈姐手伤后改做验布，你替她核一日工牌，没有把她写成恢复原机台。', '月底少记一班，你拿同班签记找钱班头复核；补发有日期，下一月班表仍需重新确认。'],
  };
  var transportBase = {
    kind: 'employment', role: '城市短途运输与送件劳动者', workplace: '上海合成东区车行和弄堂商号路线', employer: '曹记车行与逐单客户', supervisor: '车行经办曹福昌', colleague: '交接人孙顺', publicPerson: '改过一次地址的陆客人', terms: '按日车租、班工或逐件脚钱结算；货物、路线、旧损、迟误和赔付分别记录',
    duties: '按确认路线运送乘客或货件，核起点、地址、交接人、报酬与可证明的迟误损坏',
    scenes: ['雨天使一件衣物晚到，你向客户说明改道时间并少收一段脚钱；车行没有替客户决定赔付。', '曹福昌说车有新损，你拿领车时的旧损记号复核，只承担已经确认的一处。', '孙顺交来三件货，你只接能在收工前送到的两件，另一件提前退回并保留经手记录。'],
  };
  var domesticBase = {
    kind: 'employment', role: '洗衣缝补与受薪家务服务人', workplace: '上海合成东区弄堂客户与林家钟点岗位', employer: '逐户客户与林家雇主', supervisor: '客户经手人林太太', colleague: '吴阿宝与赵银娣', publicPerson: '送洗衣物的许客人', terms: '按件和钟点结算；住家、休息、取送、客户物件、返工与离开条件另行约定',
    duties: '核衣物记号与取送，完成约定钟点家务并说明新增服务、损坏和退款范围',
    scenes: ['许客人拿错一件衣服，你按缝记和取送表找回；返工没有平均扣给所有洗衣人。', '林家临时要求留宿，你只完成已约钟点并给出是否接受新条件的答复日期。', '母亲减少重洗衣，你接下一户但不继承她其余客户；两只木盆仍标明她本人所有。'],
  };
  Object.assign(C.routeCareerProfiles, {
    'shanghai-textile-worker': textileBase,
    'shanghai-transport-worker': transportBase,
    'shanghai-domestic-service': domesticBase,
  });
  C.routeCareerProfilesByGender = C.routeCareerProfilesByGender || {};
  C.routeCareerProfilesByGender['shanghai-textile-worker'] = {
    男: Object.assign({}, textileBase, { role: '纱厂搬筒、机修辅助与验布工', workplace: '上海合成东区纱厂搬筒与机修辅助班', duties: '搬运纱筒、做低风险机修辅助并核验成布；不能越权处理带电或高速机器' }),
    女: Object.assign({}, textileBase, { role: '纱厂挡车与验布女工', workplace: '上海合成东区纱厂女工机台与验布班', duties: '按班看机、接头与验布，核工牌、坏纱、停机、罚扣和女工住处条件' }),
  };
  C.routeCareerProfilesByGender['shanghai-transport-worker'] = {
    男: Object.assign({}, transportBase, { role: '租车拉客与短途运货人', workplace: '上海合成东区福昌车行与固定货路', duties: '按日租车拉客或短途运货，核车租、旧损、路线、乘客或货件和结算' }),
    女: Object.assign({}, transportBase, { role: '货物交接与弄堂送件人', workplace: '上海合成东区洗衣客户与商号送件路线', employer: '逐户洗衣客户与合成商号', supervisor: '送件经手人赵银娣', duties: '沿可进入的弄堂和商号路线取送衣物与小件，核地址、经手人、脚钱和迟误' }),
  };
  C.routeCareerProfilesByGender['shanghai-domestic-service'] = {
    男: Object.assign({}, domesticBase, { role: '雇主宅院杂役、送件与清扫工', workplace: '上海合成东区林家外勤与杂役岗位', duties: '完成约定清扫、搬运、送件与守门时段，拒绝把临时留宿自动改成永久住家' }),
    女: Object.assign({}, domesticBase, { role: '洗衣缝补与钟点家务女工', workplace: '上海合成东区弄堂洗衣客户与林家钟点岗位', duties: '核衣物记号、取送与缝补，按钟点完成家务并保留休息、离开与身体安排' }),
  };

  Object.assign(C.routeContactProfiles, {
    'shanghai-textile-worker': [
      { id: 'f05_qian_ban', label: '钱班头', role: '给班表、核工牌并答复工资争议的班头', status: 'supervisor', relation: 14, born: 1880 },
      { id: 'f05_chen_jie', label: '陈姐', role: '机伤后转做验布、保留自己伤假与工资请求的同事', status: 'coworker', relation: 22, born: 1902 },
      { id: 'f05_xu_clerk', label: '许账房', role: '按工牌和班表核工资条的厂内账房', status: 'nearby', relation: 12, born: 1890 },
    ],
    'shanghai-transport-worker': [
      { id: 'f05_sun_shun', label: '孙顺', role: '核货件、路线和交接时刻的市场搬运人', status: 'coworker', relation: 21, born: 1909 },
      { id: 'f05_lu_customer', label: '陆客人', role: '会改地址并要求说明迟误与赔付范围的客户', status: 'nearby', relation: 15, born: 1895 },
      { id: 'f05_he_repair', label: '何修车', role: '逐项说明旧损、新损、修车钱和停租日期的修车人', status: 'nearby', relation: 13, born: 1887 },
    ],
    'shanghai-domestic-service': [
      { id: 'f05_lin_client', label: '林太太', role: '提出钟点或住家条件并负责结算的雇主经手人', status: 'employer', relation: 17, born: 1893 },
      { id: 'f05_xu_customer', label: '许客人', role: '按记号送取衣物并核返工范围的客户', status: 'nearby', relation: 18, born: 1899 },
      { id: 'f05_zhou_helper', label: '周惠珍', role: '按件做验布与缝补、保留自己工资和客户的同伴', status: 'coworker', relation: 23, born: 1911 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'shanghai-textile-worker': ['棉尘与通风不足造成的反复咳嗽', '机台噪声后的耳鸣', '接头与验布造成的手指外伤'],
    'shanghai-transport-worker': ['长途拉运或搬送后的腰腿疼痛', '雨淋与寒冷后的发热', '车辆或货件造成的擦伤扭伤'],
    'shanghai-domestic-service': ['强碱和湿衣造成的手部皲裂', '灶烟与潮湿造成的咳嗽', '久站、提水和睡眠不足造成的腰背疼痛'],
  });

  Object.assign(C.publicRouteProfiles, {
    'shanghai-textile-worker': {
      publicGroup: '合成的工牌、伤假与公开缺工互助簿', publicRole: '核班表、伤假、工资答复和公开缺工信息',
      covertRole: '不进入秘密身份线，只保存本人经手的公开地址与最后消息', infiltrationRole: '不进入冒名接近机构线，维持有来源可核的公开职业',
      contact: { id: 'public_f05_chen_ru', label: '陈如', role: '登记公开缺工、伤假答复与失效地址的互助经手人', status: 'colleague', relation: 17, born: 1904 },
    },
    'shanghai-transport-worker': {
      publicGroup: '合成的车行短工与送件地址互助簿', publicRole: '核短工、车损、送件与公开住处信息',
      covertRole: '不进入秘密身份线，只核本人接触过的货件和地址', infiltrationRole: '不进入冒名接近机构线，不以运输工作套取未授权信息',
      contact: { id: 'public_f05_sun_lan', label: '孙兰', role: '核公开路线、短工答复与退信地址的互助经手人', status: 'nearby', relation: 16, born: 1906 },
    },
    'shanghai-domestic-service': {
      publicGroup: '合成的洗衣客户、钟点缺工与临时照料互助簿', publicRole: '登记公开客户、钟点缺工、临时照料和失效地址',
      covertRole: '不进入秘密身份线，不借家务服务收集私密信息', infiltrationRole: '不进入冒名接近机构线，雇主家庭信息只用于约定服务',
      contact: { id: 'public_f05_zhao_qing', label: '赵青', role: '核钟点缺工、照料轮值与退信地址的互助经手人', status: 'colleague', relation: 18, born: 1907 },
    },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('worker', 'shanghai-textile-worker');
  addRouteToTrack('worker', 'shanghai-transport-worker');
  addRouteToTrack('service', 'shanghai-domestic-service');
})(typeof window !== 'undefined' ? window : globalThis);
