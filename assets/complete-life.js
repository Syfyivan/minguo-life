// 民国人生 · 完整人生扩建包 v0.5
// 把 1949 改为人生中段分水岭，并补入地域后半生、晚年与死亡前的生活内容。
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before complete-life.js');

  C.version = '0.5.0';
  C.milestoneYear = 1949;
  C.maximumAge = 105;
  C.post1949Paths = {
    mainland: { name: '留在中国大陆', place: '中国大陆的现有落脚处', rhythmKey: 'post-mainland' },
    'hong-kong': { name: '迁往香港', place: '香港', rhythmKey: 'post-hong-kong' },
    taiwan: { name: '迁往台湾', place: '台湾', rhythmKey: 'post-taiwan' },
    overseas: { name: '前往其他海外地区', place: '海外落脚地', rhythmKey: 'post-overseas' },
    'in-motion': { name: '暂时继续流动', place: '不断变化的临时落脚处', rhythmKey: 'post-in-motion' },
    unsettled: { name: '长期落点尚未确定', place: '1949 年时的暂住地', rhythmKey: 'post-unsettled' },
  };

  // 1949 年后的“谋生”不是一个可以无限重复、只加属性的按钮。
  // 每次求职、试工与续工都会进入可保存的状态，并指向一个具体岗位。
  C.employmentStatusLabels = {
    'not-started': '尚未安排',
    seeking: '正在找门路',
    casual: '已有按日短工',
    trial: '正在试工',
    employed: '已经留用',
    'reduced-hours': '已经减少工时',
  };
  C.livelihoodTrackRoutes = {
    care: ['shen-professional'],
    literate: ['shen-scholar', 'shen-newwoman', 'shanghai-professional'],
    skilled: ['subei-millworker', 'shanghai-heir', 'shanghai-newwoman'],
  };
  C.post1949Jobs = {
    mainland: {
      manual: { role: '装卸与修缮工', casualRole: '集市装卸短工', workplace: '当地运输站与修缮队', duties: '搬运到货、修补屋面并登记每天完成的工段', terms: '短工按日结算；留用后按旬核对工钱' },
      skilled: { role: '机器检修工', casualRole: '农具与机器修理短工', workplace: '当地生产单位的修理间', duties: '检查传动、替换损件并把用料写入维修簿', terms: '先试工一个月，留用后按月结算' },
      literate: { role: '文书登记员', casualRole: '代写与登记短工', workplace: '当地学校或办事处', duties: '誊写名册、核对来函并保管能够追查的登记页', terms: '按月领薪，职责以登记和抄写为限' },
      care: { role: '诊所医护员', casualRole: '临时出诊助手', workplace: '当地诊所', duties: '接诊、配药并留下可复查的病历记录', terms: '按月领薪，药品短缺和夜间出诊另行登记' },
    },
    'hong-kong': {
      manual: { role: '货仓理货工', casualRole: '码头货仓短工', workplace: '临海货仓', duties: '按货单分拣、搬运并当面核对当天工钱', terms: '短工按日结算；固定位置按月结算' },
      skilled: { role: '棉纺机器看护工', casualRole: '纺织工场试班工', workplace: '九龙一间棉纺工场', duties: '看护纺机、处理断线并记录停机原因', terms: '先试做一个月，工钱按月结算，加班另记' },
      literate: { role: '商号抄账员', casualRole: '商号临时抄单员', workplace: '上环一间进出口商号', duties: '核对货单、抄写往来账并整理来函', terms: '先试做一个月，按月结算工钱' },
      care: { role: '街坊诊所登记员', casualRole: '诊所临时配药助手', workplace: '一间街坊诊所', duties: '登记病家、分装常用药并核对复诊地址', terms: '先试做一个月，夜间值班另行商量' },
    },
    taiwan: {
      manual: { role: '货站搬运工', casualRole: '市场与货站短工', workplace: '城镇货站', duties: '按批次搬运、清点货包并核对当天工钱', terms: '短工按日结算；固定班次按月结算' },
      skilled: { role: '工场机修员', casualRole: '机修试工', workplace: '一间小型工场', duties: '检修机器、登记零件并说明停机原因', terms: '先试工一个月，留用后按月结算' },
      literate: { role: '学校事务员', casualRole: '临时文书员', workplace: '一所学校的事务室', duties: '整理名册、收发公文并核对用品账', terms: '按月领薪，住处与工作手续分别办理' },
      care: { role: '诊所医护助理', casualRole: '临时医护助手', workplace: '一间城镇诊所', duties: '登记、配药并协助基础照料', terms: '先试做一个月，值班范围当面写清' },
    },
    overseas: {
      manual: { role: '货栈工', casualRole: '码头货栈短工', workplace: '落脚城市的一处货栈', duties: '搬运、分拣并按工票核对当天收入', terms: '按日结算，工期随船货批次确定' },
      skilled: { role: '修理店技工', casualRole: '修理店试工', workplace: '一间华人经营的修理店', duties: '拆检旧件、完成修理并学习当地工具叫法', terms: '先试工一个月，材料损耗单独登记' },
      literate: { role: '商店文书员', casualRole: '临时抄单与翻译助手', workplace: '当地华人商店', duties: '抄写货单、整理来函并学习当地工作用语', terms: '按月结算，语言学习时间由自己安排' },
      care: { role: '社区诊所助理', casualRole: '临时诊疗助手', workplace: '当地社区诊所', duties: '登记病家、分装药物并学习当地诊疗用语', terms: '先试做一个月，资格范围当面说明' },
    },
    'in-motion': {
      manual: { role: '车站装卸工', casualRole: '车站装卸短工', workplace: '当前落脚地的车站货场', duties: '装卸一批货物并按工票核对口粮和工钱', terms: '按日结算，工期只写到本批货物结束' },
      skilled: { role: '流动修理工', casualRole: '工具修理短工', workplace: '当前落脚地的修理摊', duties: '修补农具与日用品，用完工件数结算', terms: '逐件结算，不保证下一处仍有同样工作' },
      literate: { role: '代写与记账人', casualRole: '代写书信与货单短工', workplace: '当前落脚地的集市', duties: '代写书信、抄货单并留下可转寄的地址', terms: '逐件结算，离开前当面清账' },
      care: { role: '临时救护助手', casualRole: '临时药棚帮工', workplace: '当前落脚地的临时药棚', duties: '登记伤病、清洗器具并分装有限药品', terms: '按工期结算，药棚迁走后工作即结束' },
    },
    unsettled: {
      manual: { role: '市场转运工', casualRole: '市场转运短工', workplace: '暂住地附近的市场', duties: '装卸货包、清点件数并核对当天工钱', terms: '按日结算，固定摊位空缺出现后再谈留用' },
      skilled: { role: '修理工', casualRole: '修理铺试工', workplace: '暂住地的一间修理铺', duties: '修理工具、登记用料并完成当面验收', terms: '先试做一个月，再决定是否长期留下' },
      literate: { role: '登记抄写员', casualRole: '临时抄写员', workplace: '暂住地的一处登记点', duties: '誊写名册、核对地址并区分已证实与口头消息', terms: '按工作批次结算，住处不随工作自动续期' },
      care: { role: '诊所代班助理', casualRole: '诊所临时代班', workplace: '暂住地附近的诊所', duties: '登记、配药并协助基础照料', terms: '先按代班天数结算，再谈固定位置' },
    },
  };

  C.routes['shen-professional'] = {
    name: '医护与地方服务', family: 'jiangnanshen',
    summary: '把家学转成医护、登记与地方服务，在专业责任和家门之间谋生。',
  };
  C.routes['shanghai-professional'] = {
    name: '技术职员与独立营生', family: 'shanghaigongshang',
    summary: '离开家业继承位置，以技术、账务和受薪工作建立自己的城市生活。',
  };

  function decision(id) {
    return C.decisions.find(function (item) { return item.id === id; });
  }

  var learnCharacters = C.actions.find(function (item) { return item.id === 'learn-characters'; });
  learnCharacters.maxAge = 17;
  learnCharacters.note = '童年与少年阶段练习识字；成年以后会转入读书、写信、工作记录或专业学习。';

  var education = decision('education');
  education.prompt = '六岁这一年，家里把纸笔、学费和一门能立刻帮上家计的活摆在桌上。你不能替家里支配所有钱，却可以说出自己愿意怎样度过接下来的几年。';
  education.options[0].label = '我请家里先让我跟先生读旧学与家塾';
  education.options[1].label = '我争取进新式学堂，并承担纸笔与学费的家计压力';
  education.options[2].label = '我先跟家里学一门能实际帮上忙的活计';

  var shenPath = decision('shen-path');
  shenPath.prompt = '1921 年，沈家的书房、学堂介绍信和一处地方医护机构同时向你打开了有限的门。家里只能支持一段起步时间，你需要亲自决定把知识换成哪一种长期生计。';
  shenPath.options.splice(1, 0, {
    id: 'professional-service',
    label: '我去学习医护与登记事务，靠专业工作和地方服务谋生',
    route: 'shen-professional',
    delta: { knowledge: 5, craft: 3, money: -2 },
    channels: ['books'],
    fact: '1921 年选择学习医护与登记事务，并开始以专业工作和地方服务谋生。',
  });

  var shanghaiPath = decision('shanghai-path');
  shanghaiPath.prompt = '1921 年，父亲把账房钥匙放在你面前，学堂同事也带来一份受薪技术工作的介绍。你可以接入家业，也可以离开继承位置，靠自己的技术与工资建立生活。';
  shanghaiPath.options.splice(1, 0, {
    id: 'salaried-professional',
    label: '我不接家业继承位置，先去做受薪技术与账务工作',
    route: 'shanghai-professional',
    delta: { craft: 4, knowledge: 3, relation: -2, money: 1 },
    channels: ['books'],
    fact: '1921 年没有进入家业继承位置，而是开始从事受薪技术与账务工作。',
  });

  var subeiWar = decision('subei-war');
  subeiWar.prompt = '征丁的人已经到村口，邻村也传来战火和逃难人群的消息。你能决定的是自己今天去哪里、带什么、找谁商量；母亲、配偶和其他家人仍会按各自身体与家口条件作答。';
  subeiWar.options.find(function (item) { return item.id === 'join-army'; }).label = '我带上换洗衣物跟队伍走，争取不再牵连家里其他人';
  subeiWar.options.find(function (item) { return item.id === 'flee-south'; }).label = '我先询问每个人是否能同行，再带愿意且走得动的人向南找落脚处';

  var shenWar = decision('shen-war');
  shenWar.options[0].label = '我把南迁消息告诉家里人，和愿意同行的人分别准备住处、书箱与盘缠';
  shenWar.options[1].label = '我留在当前城市，继续承担教育、医护或公共工作';

  var shanghaiWar = decision('shanghai-war');
  shanghaiWar.prompt = '厂房受损以后，孙立根带来账房清单，徐云则拿着几户工友的住址。你只能亲自先做一件事：安排家口疏散、转移账目机器，或把自己的技术和少量工具带往内地另找落点。';
  shanghaiWar.options[0].label = '我先逐户询问工友家口的打算，再提供车钱、住址和能带走的物资';
  shanghaiWar.options[1].label = '我先清点并转移账本与机器，同时把停工和欠薪情况告诉工友';
  shanghaiWar.options.push({
    id: 'relocate-own-work',
    label: '我带上自己的证件、技术记录和少量工具，先去内地寻找工作落点',
    keepRoute: true,
    warTurn: 'shanghai-relocate',
    delta: { craft: 2, money: -5, position: -4, network: 2 },
    subjectEffects: { connections: { strength: 3 } },
    fact: '1937 年带着证件、技术记录和少量工具前往内地寻找工作落点。',
  });

  var postwar = decision('postwar-settlement');
  postwar.prompt = '战争结束后，旧屋、旧单位、亲人消息和眼前住处没有一起恢复。你只能先做一项能亲自完成的安排，再让家人与旧识分别决定是否接回这条路。';
  postwar.options[0].label = '我先续下现有住处和工作，把能确认的家口日常重新排起来';
  postwar.options[1].label = '我托可靠的人探路并亲自核对旧屋、旧单位和亲友消息';
  postwar.options[2].label = '我暂不押在单一路上，同时续住处、留盘缠并维持两边通信';

  var refugee1944 = decision('route-subei-refugee-1944');
  if (refugee1944) {
    refugee1944.options.find(function (item) { return item.id === 'deepen-back-area-life'; }).label = '我暂时不返乡，先续下后方住处并把手里的零工稳定下来';
    refugee1944.options.find(function (item) { return item.id === 'allow-split-paths'; }).label = '我把归返信息告诉每个人，分别商量谁想回去、谁想留下以及各自缺什么';
  }

  var final1949 = decision('final-1949');
  final1949.title = '1949 · 民国阶段结束后的去向';
  final1949.prompt = '1949 年改变了制度、边界与许多旧关系，但你仍然只有三十九至四十一岁。你现在决定的是下一段生活从哪里开始，不是这一生怎样结束；家人、配偶、成年晚辈和旧识仍各自决定去留。';
  final1949.options = [
    {
      id: 'stay-mainland',
      label: '我留在中国大陆的当前落脚处，先接住住处、工作和能够确认的家人消息',
      delta: { mind: 2, position: 1 },
      post1949Choice: 'mainland',
      fact: '1949 年选择留在中国大陆，并从当前落脚处继续安排住处、工作与家人消息。',
    },
    {
      id: 'move-hong-kong',
      label: '我拿出现有盘缠前往香港，抵达后先找住处与能够继续的工作',
      gate: { money: 15 },
      delta: { money: -15, relation: -3, position: -2 },
      post1949Choice: 'hong-kong',
      fact: '1949 年使用已有盘缠前往香港，准备重新寻找住处与工作。',
    },
    {
      id: 'move-taiwan',
      label: '我带好证件和盘缠前往台湾，抵达后亲自办理住处与谋生手续',
      gate: { money: 15 },
      delta: { money: -15, relation: -3, position: -2 },
      post1949Choice: 'taiwan',
      fact: '1949 年带着证件和盘缠前往台湾，准备重新安排住处与谋生。',
    },
    {
      id: 'move-overseas',
      label: '我循已经核实的外部门路出海，并保留能寄回故乡的地址与联系人',
      gate: { money: 30, network: 45 },
      requiredChannels: ['newspaper'],
      delta: { money: -30, relation: -5, position: -3 },
      post1949Choice: 'overseas',
      fact: '1949 年循已经核实的外部门路前往其他海外地区，并留下可供通信的地址。',
    },
    {
      id: 'remain-in-motion',
      label: '我暂时跟随能确认的车船与工作消息继续移动，每到一处都重新核对住处和同行者',
      delta: { health: -2, mind: 1, position: -3 },
      post1949Choice: 'in-motion',
      fact: '1949 年没有确定长期落点，继续随能够核实的交通与工作消息移动。',
    },
    {
      id: 'leave-unsettled',
      label: '我先留在当前暂住地，不承诺长期去向，继续寻找证件、家人消息和下一份工作',
      delta: { mind: 2, network: 1 },
      post1949Choice: 'unsettled',
      fact: '1949 年暂未确定长期落点，先留在当时的暂住地继续寻找证件、家人消息与工作。',
    },
  ];

  C.actions.push(
    {
      id: 'clinic-service', name: '在诊所值班并整理病历', routes: ['shen-professional'], minAge: 18, spirit: 4,
      delta: { craft: 4, knowledge: 2, money: 2, health: -1 }, subjectDelta: { support: { strength: 2 } },
      contactEffects: { lu_junping: { relation: 1 } }, note: '在地方诊所接诊、配药并记录病情；专业责任能换来生计，也会积累疲劳。',
    },
    {
      id: 'mobile-care-record', name: '出诊并核对地方健康登记', routes: ['shen-professional'], minAge: 20, spirit: 3,
      delta: { network: 3, craft: 3, mind: 2 }, channels: ['conversation'], subjectDelta: { connections: { strength: 2 } },
      note: '带着药箱走访病家，把口头病情、住址和能否复诊分别记下。',
    },
    {
      id: 'salaried-technical-work', name: '做受薪技术与账务工作', routes: ['shanghai-professional'], minAge: 18, spirit: 4,
      delta: { craft: 4, money: 3, knowledge: 1, health: -1 }, subjectDelta: { ledger: { strength: 2 } },
      contactEffects: { sun_ligen: { relation: 1 } }, note: '按工时完成制图、核账或机器记录，收入较明确，但工作位置并不由家业保证。',
    },
    {
      id: 'independent-technical-commission', name: '承接独立技术委托', routes: ['shanghai-professional'], minAge: 20, spirit: 3,
      delta: { craft: 3, network: 3, money: 2 }, subjectDelta: { connections: { strength: 2 } },
      contactEffects: { tang_huizhen: { relation: 1 } }, note: '亲自谈清工作范围、报酬和交付日期，不把父辈家业当作默认担保。',
    },

    { id: 'mainland-rebuild-work', name: '在本地重接营生与证件', livelihoodAction: true, minYear: 1950, post1949Choices: ['mainland'], spirit: 4, delta: { craft: 2, money: 3, position: 2 }, subjectDelta: { ledger: { strength: 2 } }, note: '逐项核对住处、工作和必要证明，让原有手艺在新的生活条件下继续使用。' },
    { id: 'mainland-keep-letters', name: '维持故乡与旧识通信', minYear: 1950, post1949Choices: ['mainland'], spirit: 2, delta: { relation: 3, network: 2, mind: 1 }, channels: ['conversation'], note: '把已经确认的地址分别抄写寄出，维持联系但不替失联的人补写去向。' },
    { id: 'hongkong-find-work', name: '在香港逐处应聘并谈清工钱', livelihoodAction: true, minYear: 1950, post1949Choices: ['hong-kong'], spirit: 4, delta: { money: 3, network: 2, position: 2, health: -1 }, note: '按自己的经历选择商号、诊所、货仓或工场，完成面谈或试工，并在当年得到明确答复。' },
    { id: 'hongkong-room-network', name: '与同住者协调房租和照料', minYear: 1950, post1949Choices: ['hong-kong'], spirit: 3, delta: { relation: 3, network: 2, money: -1 }, subjectDelta: { support: { strength: 2 } }, note: '同住不等于一家人；需要把房租、做饭、照料和各自亲属来信分别商量。' },
    { id: 'taiwan-settle-work', name: '在台湾核实并接下一份工作', livelihoodAction: true, minYear: 1950, post1949Choices: ['taiwan'], spirit: 4, delta: { position: 2, money: 3, craft: 1, health: -1 }, note: '带着证件完成面谈或试工，当年确认岗位、结算办法与是否留用。' },
    { id: 'taiwan-trace-contacts', name: '寻找同行者和旧关系消息', minYear: 1950, post1949Choices: ['taiwan'], spirit: 3, delta: { network: 3, relation: 2, mind: 1 }, channels: ['conversation'], note: '把最后已知单位、籍贯和地址分开登记，确认联系，也保留仍然没有消息的人。' },
    { id: 'overseas-adapt-trade', name: '用旧经验应聘当地工作', livelihoodAction: true, minYear: 1950, post1949Choices: ['overseas'], spirit: 4, delta: { craft: 3, knowledge: 2, money: 3, health: -1 }, note: '从工具名称、工序和当地规矩重新学起，完成一份有明确职责与结算办法的试工。' },
    { id: 'overseas-write-home', name: '经转寄地址给故乡写信', minYear: 1950, post1949Choices: ['overseas'], spirit: 3, delta: { relation: 3, mind: 2, money: -1 }, channels: ['newspaper'], subjectDelta: { connections: { strength: 2 } }, note: '使用已经核实的转寄地址写信；寄出证明你仍在寻找联系，不保证对方一定收到。' },
    { id: 'motion-short-work', name: '在临时落脚处接一段短工', livelihoodAction: true, minYear: 1950, post1949Choices: ['in-motion'], spirit: 4, delta: { money: 2, craft: 2, health: -2, position: 1 }, note: '先问清岗位、工期、口粮和结算日；短工结束会明确记为结束，不冒充长期职位。' },
    { id: 'motion-secure-papers', name: '保管证件并核对下一段路', minYear: 1950, post1949Choices: ['in-motion'], spirit: 3, delta: { mind: 2, network: 2, position: 2, money: -1 }, channels: ['conversation'], note: '把证件、车船消息和联系人分别核实，减少因一句传闻再次走错方向的风险。' },
    { id: 'unsettled-test-shelter', name: '续下暂住处并试做一份工作', livelihoodAction: true, minYear: 1950, post1949Choices: ['unsettled'], spirit: 3, delta: { position: 2, money: 2, craft: 1 }, subjectDelta: { support: { strength: 1 } }, note: '完成一份有岗位、期限和结算办法的试工，同时保留以后更换落点的余地。' },
    { id: 'unsettled-search-kin', name: '继续寻找家人、证件与可靠地址', minYear: 1950, post1949Choices: ['unsettled'], spirit: 3, delta: { network: 3, relation: 2, mind: 1 }, channels: ['conversation'], subjectDelta: { connections: { strength: 2 } }, note: '逐条核对姓名、最后地址和转寄人，把确定消息与传闻分开留下。' }
  );

  function option(id, label, delta, echo, fact, followTitle, followText, extras) {
    var result = { id: id, label: label, delta: delta, echo: echo, fact: fact, followup: { title: followTitle, text: followText } };
    Object.keys(extras || {}).forEach(function (key) {
      if (key === 'followupDelta') result.followup.delta = extras[key];
      else if (key === 'followupSubjectEffects') result.followup.subjectEffects = extras[key];
      else if (key === 'followupContactEffects') result.followup.contactEffects = extras[key];
      else result[key] = extras[key];
    });
    return result;
  }

  function installDecision(item) {
    item.options.forEach(function (choice) {
      if (!choice.followup) return;
      var followup = choice.followup;
      var event = {
        id: 'echo-' + choice.echo.replace(/:/g, '-'), title: followup.title, text: followup.text,
        priority: 40, requiresEchoes: [choice.echo], delta: followup.delta,
        subjectEffects: followup.subjectEffects, contactEffects: followup.contactEffects,
      };
      if (item.followYear != null) event.year = item.followYear;
      if (item.followAge != null) event.yearByAge = item.followAge;
      if (item.routes) event.routes = item.routes.slice();
      if (item.post1949Choices) event.post1949Choices = item.post1949Choices.slice();
      if (choice.post1949Choices) event.post1949Choices = choice.post1949Choices.slice();
      if (choice.followupEmploymentStatuses) event.employmentStatuses = choice.followupEmploymentStatuses.slice();
      C.ordinaryEvents.push(event);
      delete choice.followup;
      delete choice.followupEmploymentStatuses;
    });
    delete item.followYear;
    delete item.followAge;
    C.decisions.push(item);
  }

  installDecision({
    id: 'route-shen-professional-1929', year: 1929, followYear: 1930, routes: ['shen-professional'], title: '地方医护怎样成为长期生计',
    prompt: '诊所缺药、病家付不起全额费用，登记册又必须有人持续整理。你只能先把一项工作做实，并承担另一项暂时接不住的后果。',
    options: [
      option('clinic-post', '我先守住固定诊所值班，并把收费与欠账逐项说明', { craft: 3, money: 3, relation: 1 }, 'shen-professional:1929:clinic', '1929 年优先维持固定诊所值班，并把收费与欠账分别记录。', '诊所门口又排起了人', '第二年，固定值班让附近病家知道何时能找到你；药品和费用不足仍迫使每次接诊重新说明边界。', { endingFact: true }),
      option('mobile-care', '我带药箱到附近乡镇出诊，同时留下可复诊的地址', { network: 3, craft: 2, health: -2 }, 'shen-professional:1929:mobile', '1929 年开始到附近乡镇出诊，并为病家留下复诊地址。', '药箱上的新磨痕', '第二年，几户病家按地址找来，长途往返也让你的身体和药品储备承受更多压力。', { endingFact: true }),
      option('records-first', '我先把病历、药账和住址整理清楚，减少口头消息丢失', { knowledge: 3, mind: 2, money: -1 }, 'shen-professional:1929:records', '1929 年优先整理病历、药账和病家住址。', '一册能够追查的登记簿', '第二年，登记簿帮助一次复诊找到旧记录，也暴露出许多病家已因生计搬离原址。', { endingFact: true })
    ],
  });

  installDecision({
    id: 'route-shen-professional-1942', year: 1942, followYear: 1943, routes: ['shen-professional'], title: '战时医护先接住什么',
    prompt: '伤病、药品短缺和迁徙人群同时来到。你不能承诺治好所有人，只能亲自决定先保住药品周转、流动救护或更多人的基础照料办法。',
    options: [
      option('protect-medicine', '我先清点并分装有限药品，把能治和不能治的情况说清楚', { craft: 3, mind: 3, relation: -1 }, 'shen-professional:1942:medicine', '1942 年清点并分装有限药品，明确说明能够处理的伤病范围。', '药柜里空出的格子', '第二年，分装办法避免了一部分浪费，但药柜仍比来求助的人更快见底。', { endingFact: true }),
      option('mobile-relief', '我加入流动救护，带着药箱和登记册去临时落脚点', { craft: 3, network: 3, health: -3 }, 'shen-professional:1942:relief', '1942 年参加流动救护，前往多个临时落脚点处理伤病。', '登记册上的不同地名', '第二年，登记册记录了几处已经撤走的落脚点；你接住了一部分伤病，也失去继续追踪另一些人的条件。', { endingFact: true }),
      option('train-assistants', '我教几名愿意承担的人做清洁、包扎和病情记录', { knowledge: 2, relation: 3, network: 2 }, 'shen-professional:1942:assistants', '1942 年训练数名助手进行清洁、包扎与病情记录。', '助手第一次独立值班', '第二年，有人能够独立处理基础伤情，也有人因迁移离开；照料能力被分出去，却没有变成无限资源。', { endingFact: true })
    ],
  });

  installDecision({
    id: 'route-shanghai-professional-1929', year: 1929, followYear: 1930, routes: ['shanghai-professional'], title: '受薪位置与独立营生怎样取舍',
    prompt: '单位愿意给固定工资，外面的零散委托可能挣得更多，夜间进修又会减少眼前收入。你需要亲自确定下一年的主要工作方式。',
    options: [
      option('keep-salary', '我先守住固定受薪位置，并把工时与职责写清楚', { money: 3, craft: 2, position: 2 }, 'shanghai-professional:1929:salary', '1929 年优先保住固定受薪位置，并明确工时与职责。', '一张按月领取的工资单', '第二年，固定工资接住了房租，单位调整和加班仍随时可能改变这份稳定。', { endingFact: true }),
      option('take-commissions', '我减少固定工时，亲自承接能够谈清报酬的技术委托', { money: 3, network: 3, position: -1 }, 'shanghai-professional:1929:commission', '1929 年减少固定工时，开始承接独立技术委托。', '两份交期撞在一起的委托', '第二年，独立委托带来新客户，也让收入、休息和违约风险同时落到你自己身上。', { endingFact: true }),
      option('night-training', '我少接一部分工作，晚上继续学习制图、机器或账务', { knowledge: 3, craft: 3, money: -2 }, 'shanghai-professional:1929:training', '1929 年减少部分工作，继续学习制图、机器与账务技能。', '一册写满批注的讲义', '第二年，新技能让你能接不同工作，少掉的工资却仍要由当时的家计承担。', { endingFact: true })
    ],
  });

  installDecision({
    id: 'route-shanghai-professional-1942', year: 1942, followYear: 1943, routes: ['shanghai-professional'], title: '战时把技术带到哪里',
    prompt: '原单位时开时停，内地有工作消息，同事家口也在分散。你只能决定自己的证件、工具和时间先放在哪一种可持续安排上。',
    options: [
      option('keep-city-post', '我留在城市，先维持还能运转的技术与账务工作', { money: 2, craft: 2, health: -2 }, 'shanghai-professional:1942:city', '1942 年留在城市，维持仍能运转的技术与账务工作。', '反复变更的值班表', '第二年，工作没有完全中断，收入和安全却都随着停工与管制不断变化。', { endingFact: true }),
      option('move-skills-inland', '我带证件和工具去内地，按可靠地址寻找新的受薪位置', { position: 2, network: 3, money: -3 }, 'shanghai-professional:1942:inland', '1942 年带着证件和工具前往内地寻找新的受薪位置。', '工具箱到了新的桌边', '第二年，旧技能在新单位派上用场，原城市的同事与家人消息仍只能靠转寄维持。', { endingFact: true }),
      option('support-colleagues', '我与同事合用住处、工具和工作消息，先维持小规模互助', { relation: 3, network: 2, money: -2 }, 'shanghai-professional:1942:mutual', '1942 年与同事共享住处、工具和工作消息，维持小规模互助。', '轮流使用的一套工具', '第二年，这套工具让几个人接到短工，也因损耗、借期和各自家口需要不断重新协商。', { endingFact: true })
    ],
  });

  var arrivalOptions = [
    option('mainland-local-work', '我到街道、村镇或原单位逐项核对工作和住处，再决定先接哪份营生', { position: 3, craft: 2, money: 2 }, 'post49:mainland:work', '1950 年在中国大陆核对住处与工作后，先接下一份能够持续的营生。', '新的工作名单', '第二年，你的名字出现在一份新的工作或互助名单上；原有手艺得到使用，旧职业身份并没有原样恢复。', { post1949Choices: ['mainland'], postProfile: { arrival: '留在原有地域并完成新的住处与工作核对', place: '中国大陆的现有落脚处', livelihood: '以原有手艺和新工作安排继续谋生', companions: '与愿意留下且能共同生活的人继续往来', leftBehind: '离开的亲友只能通过后来消息确认' }, endingFact: true }),
    option('mainland-nearby-town', '我去附近城镇试做一份工作，同时保留回原住处的地址', { network: 3, money: 2, relation: -1 }, 'post49:mainland:town', '1950 年前往附近城镇试做工作，并保留原住处通信地址。', '两地之间的第一封回信', '第二年，工作在城镇接续，回信也到过一次；两地生活都需要时间，无法同时维持原样。', { post1949Choices: ['mainland'], postProfile: { arrival: '从原落脚处转往附近城镇', place: '中国大陆的一处城镇', livelihood: '在城镇以受薪工作或手艺谋生', companions: '同行者按各自工作与家口分别落脚', leftBehind: '原住处的家人和旧识仍保留通信可能' }, endingFact: true }),
    option('mainland-two-places', '我先保留两处地址，亲自往返核对家人、工作与旧账', { relation: 2, network: 2, money: -2 }, 'post49:mainland:two', '1950 年保留两处地址，在家人、工作与旧账之间往返。', '一本写着两处地址的小册子', '第二年，两处地址都仍能收到部分消息；往返费用和照料责任也让这种安排难以长期不变。', { post1949Choices: ['mainland'], postProfile: { arrival: '在两个大陆落脚处之间维持往返', place: '中国大陆的两处往返落脚地', livelihood: '以短期工作和原有关系维持两地生活', companions: '不同家人按自己的条件留在不同地点', leftBehind: '没有一处关系被假定为自动团聚' }, endingFact: true }),

    option('hongkong-bedspace-work', '我先租下一处床位，再沿街坊与码头逐家询问工作', { position: 3, money: 2, health: -1 }, 'post49:hongkong:bedspace', '1950 年在香港租下床位，并从街坊与码头的工作消息开始谋生。', '床位旁挂起的工作衣', '第二年，住处和短工暂时接上，拥挤、房租和不固定工期仍让每天的安排很紧。', { post1949Choices: ['hong-kong'], postProfile: { arrival: '抵达香港并租下一处床位', place: '香港一处拥挤的街坊', livelihood: '靠短工、商号或原有手艺谋生', companions: '只与实际同行并共同租住的人维持日常', leftBehind: '留在原地的家人与旧识通过转寄地址联系' }, endingFact: true }),
    option('hongkong-use-contact', '我拿着已经核实的介绍信去找商号、学校或工场，并亲自谈清报酬', { network: 3, money: 3, mind: 1 }, 'post49:hongkong:contact', '1950 年凭核实过的介绍信在香港寻找商号、学校或工场工作。', '介绍人没有替你签下的工作', '第二年，介绍信带来一次面谈，真正的工作仍靠你谈清职责和报酬后才留下。', { post1949Choices: ['hong-kong'], postProfile: { arrival: '抵达香港并通过介绍信寻找工作', place: '香港的商号、学校或工场附近', livelihood: '以专业、教育、技术或账务工作谋生', companions: '同行者按各自介绍与能力分别找工作', leftBehind: '故乡关系依靠转寄信件维持' }, endingFact: true }),
    option('hongkong-share-rent', '我和同行者逐项商量房租、做饭和照料，再共同租下一间屋', { relation: 3, money: -2, position: 3 }, 'post49:hongkong:share', '1950 年与同行者协商责任后，在香港共同租屋。', '门后贴着的轮值纸', '第二年，轮值纸接住了做饭和照料，也因为有人换工、离开或接来亲属而不断重写。', { post1949Choices: ['hong-kong'], postProfile: { arrival: '抵达香港后与同行者共同租屋', place: '香港一间合租住处', livelihood: '在合租网络与零散工作之间维持生活', companions: '与明确同意共同承担房租和照料的人同行', leftBehind: '未同行者保留自己的住处与选择' }, endingFact: true }),

    option('taiwan-register-work', '我先办理临时住处与工作登记，再去核实一份受薪位置', { position: 3, money: 2, craft: 1 }, 'post49:taiwan:register', '1950 年在台湾办理临时住处与工作登记，并开始受薪工作。', '证件袋里多出的几张纸', '第二年，这些纸帮助你续下住处与工作，却没有自动解决家人是否团聚和职业是否长久的问题。', { post1949Choices: ['taiwan'], postProfile: { arrival: '抵达台湾并办理临时住处与工作登记', place: '台湾的一处城镇', livelihood: '以受薪工作和原有技能谋生', companions: '实际同行者分别办理自己的生活手续', leftBehind: '未同行家人与旧识的去向继续通过消息确认' }, endingFact: true }),
    option('taiwan-find-colleagues', '我按最后已知单位和姓名寻找旧同事，同时独立安排自己的工作', { network: 3, relation: 2, money: 1 }, 'post49:taiwan:colleagues', '1950 年在台湾寻找旧同事，并独立安排自己的工作。', '找到和没有找到的姓名', '第二年，名单上有几个人重新取得联系，另一些仍停留在最后已知单位；你的工作没有等待名单全部补齐。', { post1949Choices: ['taiwan'], postProfile: { arrival: '抵达台湾并从旧同事名单寻找联系', place: '台湾的工作单位与临时住处之间', livelihood: '在独立受薪工作与同事介绍中谋生', companions: '重逢的同事各自维持自己的家口', leftBehind: '未找到的人仍保留为未知去向' }, endingFact: true }),
    option('taiwan-household-first', '我先与同行家人分别核对住处、药物和工作需要，再安排自己的谋生', { relation: 3, position: 2, money: -2 }, 'post49:taiwan:household', '1950 年在台湾先核对同行家人的住处与照料需要，再安排个人工作。', '各自写下的一张需要清单', '第二年，几项最急的需要得到接续；每个人的工作与去留仍然不同，没有被一张家庭清单统一。', { post1949Choices: ['taiwan'], postProfile: { arrival: '抵达台湾并先处理同行家人的住处与照料', place: '台湾的一处家庭落脚地', livelihood: '在家口责任之外重新寻找工作', companions: '只与实际同行并愿意共同生活的家人安顿', leftBehind: '留在原地的人继续拥有自己的生活道路' }, endingFact: true }),

    option('overseas-sponsored-room', '我先住进联系人提供的临时房间，再亲自核对工作、工资和居留条件', { position: 3, network: 2, money: 2 }, 'post49:overseas:sponsor', '1950 年在海外联系人提供的临时住处落脚，并核对工作与居留条件。', '临时房间里没有拆完的行李', '第二年，工作与住处暂时续下，行李仍未完全拆开；联系人提供的是入口，不是永久保证。', { post1949Choices: ['overseas'], postProfile: { arrival: '抵达海外并住进联系人提供的临时房间', place: '海外一座城市的临时住处', livelihood: '通过核实后的工作与原有技能谋生', companions: '同行者分别面对自己的工作与居留条件', leftBehind: '故乡家人与旧识只能依靠跨境通信联系' }, endingFact: true }),
    option('overseas-use-craft', '我带着旧工具寻找能试工的地方，用实际手艺换第一份收入', { craft: 3, money: 3, health: -1 }, 'post49:overseas:craft', '1950 年在海外以旧工具和实际手艺换得第一份收入。', '旧工具有了新的叫法', '第二年，你已经能按当地要求完成部分工作；语言、材料和资格差异仍限制能接的活。', { post1949Choices: ['overseas'], postProfile: { arrival: '抵达海外后从试工开始落脚', place: '海外的一处工场或小店附近', livelihood: '让旧手艺适应当地工序后谋生', companions: '同行者按各自技能分别找工作', leftBehind: '与故乡的关系通过缓慢转寄维持' }, endingFact: true }),
    option('overseas-study-work', '我白天做短工、晚上学习当地语言和工作规矩', { knowledge: 3, craft: 1, money: 1, health: -2 }, 'post49:overseas:study', '1950 年在海外一边做短工，一边学习当地语言与工作规矩。', '写着两种文字的工钱单', '第二年，你能听懂更多工作要求，也因学习和短工并行积累了明显疲劳。', { post1949Choices: ['overseas'], postProfile: { arrival: '抵达海外后以短工和学习并行落脚', place: '海外一处学习与工作往返的社区', livelihood: '通过短工、语言学习和技能转换谋生', companions: '同行者各自适应新的工作与语言条件', leftBehind: '故乡来信并非每次都能抵达' }, endingFact: true }),

    option('motion-follow-work', '我只跟随已经核实的短工消息移动，并在上路前问清口粮与住处', { money: 2, position: 1, health: -2 }, 'post49:motion:work', '1950 年跟随核实过的短工消息继续移动，并在上路前确认口粮与住处。', '一张只写到下个月的工期纸', '第二年，短工接住了一段盘缠，工期结束后你仍需重新寻找下一处落点。', { post1949Choices: ['in-motion'], postProfile: { arrival: '没有永久抵达，只在短工地点暂时停留', place: '随工作变化的临时落脚处', livelihood: '靠短工、手艺和有限盘缠继续移动', companions: '同行者可能在不同路口按各自条件离开', leftBehind: '许多关系只保留最后一次确认的地点' }, endingFact: true }),
    option('motion-stay-season', '我在当前屋檐先住一季，修好身体并试着接一份本地零工', { health: 3, position: 2, money: 1 }, 'post49:motion:season', '1950 年在当前屋檐停留一季，休养并尝试本地零工。', '包袱第一次放进柜子', '第二年，身体和零工都有所接续；包袱仍未完全打开，说明这里还不是确定的长期家。', { post1949Choices: ['in-motion'], postProfile: { arrival: '在一处临时屋檐停留了一个季节', place: '尚未决定是否久留的临时住处', livelihood: '以本地零工和有限储备维持生活', companions: '同住者各自决定是否继续上路', leftBehind: '故乡和前一落脚处的联系仍不稳定' }, endingFact: true }),
    option('motion-contact-kin', '我暂缓下一段路，先托可靠的人核实一个亲友地址', { network: 3, relation: 3, money: -2 }, 'post49:motion:kin', '1950 年暂缓移动，先核实一处亲友地址。', '终于有回音的一封短札', '第二年，一个地址得到确认，其他亲友仍没有消息；这封短札提供了方向，没有替你决定是否前往。', { post1949Choices: ['in-motion'], postProfile: { arrival: '为核实亲友地址暂时停留', place: '等待转寄消息的临时落脚处', livelihood: '以零工维持等待期间的生活', companions: '是否再度同行需在消息确认后分别商量', leftBehind: '没有回音的人仍记为未知' }, endingFact: true }),

    option('unsettled-check-papers', '我先把证件、旧地址和能证明的经历逐项整理，再决定下一步', { mind: 3, position: 2, knowledge: 1 }, 'post49:unsettled:papers', '1950 年整理证件、旧地址与可证明的经历，暂未确定长期去向。', '一个按来源分开的纸袋', '第二年，部分经历有了可出示的凭据，长期住处和工作仍需另行寻找。', { post1949Choices: ['unsettled'], postProfile: { arrival: '仍在暂住地整理证件与经历', place: '1949 年后的暂住地', livelihood: '依靠临时工作和有限储备生活', companions: '同行关系仍在协商，没有统一去向', leftBehind: '未确认的人与地点继续保留为未知' }, endingFact: true }),
    option('unsettled-search-family', '我先沿可靠地址寻找家人消息，同时维持眼前住处和零工', { network: 3, relation: 3, money: -1 }, 'post49:unsettled:family', '1950 年在维持暂住与零工的同时，沿可靠地址寻找家人消息。', '被划掉又重写的地址', '第二年，一条消息得到核实，其他地址已经失效；你的日常不能等所有人都有答案才继续。', { post1949Choices: ['unsettled'], postProfile: { arrival: '没有离开暂住地，继续寻找家人消息', place: '一处等待消息的暂住地', livelihood: '以零工维持寻找期间的生活', companions: '实际同住者各自承担自己的日常', leftBehind: '未找到的家人继续保留最后已知信息' }, endingFact: true }),
    option('unsettled-test-work', '我先试做一份三个月的工作，用这段时间判断是否值得留下', { craft: 2, money: 2, position: 2 }, 'post49:unsettled:work', '1950 年试做一份短期工作，以此判断是否在暂住地继续生活。', '一份到期后重新商量的工约', '第二年，工作曾经续期一次；是否长期留下仍取决于住处、家人消息和身体能否接住。', { post1949Choices: ['unsettled'], postProfile: { arrival: '以一份短期工作测试暂住地', place: '可能继续留下的暂住地', livelihood: '依靠短期工作观察长期可能', companions: '同住者不因你的试工自动留下', leftBehind: '其他路线仍没有完全关闭' }, endingFact: true })
  ];

  var arrivalEmploymentModes = {
    'mainland-local-work': 'trial', 'mainland-nearby-town': 'trial', 'mainland-two-places': 'casual',
    'hongkong-bedspace-work': 'casual', 'hongkong-use-contact': 'interview', 'hongkong-share-rent': 'seeking',
    'taiwan-register-work': 'trial', 'taiwan-find-colleagues': 'interview', 'taiwan-household-first': 'seeking',
    'overseas-sponsored-room': 'interview', 'overseas-use-craft': 'trial', 'overseas-study-work': 'casual',
    'motion-follow-work': 'casual', 'motion-stay-season': 'casual', 'motion-contact-kin': 'seeking',
    'unsettled-check-papers': 'seeking', 'unsettled-search-family': 'casual', 'unsettled-test-work': 'trial',
  };
  arrivalOptions.forEach(function (choice) {
    choice.employmentEntry = arrivalEmploymentModes[choice.id];
  });

  var hongKongContact = arrivalOptions.find(function (choice) { return choice.id === 'hongkong-use-contact'; });
  hongKongContact.followup.title = '第一张写明工钱的单据';
  hongKongContact.followup.text = '第二年，你按当年谈定的职责继续试做。试工完成后，对方必须当面说明是否留用；工作名称、结算办法和下一步都会作为明确事实留下，不再由介绍人含糊转述。';
  hongKongContact.followupEmploymentStatuses = ['employed'];

  installDecision({
    id: 'post49-arrival', year: 1950, followYear: 1951, title: '下一段生活怎样真正落地',
    prompt: '1949 年的去向只确定了方向。现在你面对的是一张床、第一份收入、同行者各自的需要和仍然收不到的消息；你必须亲自完成一项能让日常开始运转的安排。',
    options: arrivalOptions,
  });

  installDecision({
    id: 'later-life-livelihood', yearByAge: 50, followAge: 51, title: '五十岁以后怎样继续谋生',
    prompt: '旧职业已经被战争、迁徙和制度变化改过几次。你的身体还能做事，却不能假定原来的工作会一直存在；需要决定把经验放回旧行当、换成新工作，还是减少工时接住家口。',
    options: [
      option('keep-old-trade', '我核对身体和当地条件后，继续做仍然能够承担的旧行当', { craft: 3, money: 2, health: -1 }, 'later:50:trade', '五十岁以后继续从事仍能承担的旧行当。', '旧工具仍在手边', '一年后，旧经验仍能换来收入；身体恢复变慢，工作方式已经不能照年轻时原样维持。', { postProfile: { livelihoodLater: '继续使用原有职业与手艺' }, endingFact: true }),
      option('change-work', '我把旧经验拆成能在当地使用的技能，亲自寻找一份较轻的新工作', { craft: 2, knowledge: 2, position: 2, money: 1 }, 'later:50:change', '五十岁以后将旧经验转换成当地可用的较轻工作。', '工作名称变了，做事办法还在', '一年后，你已经能完成新的工作要求；身份和收入改变，旧经验没有完全失去作用。', { postProfile: { livelihoodLater: '把旧经验转换成新的较轻工作' }, endingFact: true }),
      option('reduce-for-household', '我减少工时，和家人或同住者谈清收入、照料与各自责任', { relation: 3, health: 3, money: -2 }, 'later:50:household', '五十岁以后减少工时，并与同住者重新协商收入和照料责任。', '重新排过的每周安排', '一年后，身体得到一些恢复，家中也有人接手部分事务；减少的收入仍需全家按各自条件承受。', { postProfile: { livelihoodLater: '减少工时并重新分配照料责任' }, endingFact: true })
    ],
  });

  installDecision({
    id: 'later-life-relationships', yearByAge: 60, followAge: 61, title: '六十岁以后把联系留在哪里',
    prompt: '有些人已经去世，有些地址多年没有回信，新认识的人则在眼前生活。你不能同时维持所有关系，需要决定把有限精力放在跨地通信、当地互助还是下一代身上。',
    options: [
      option('keep-distant-letters', '我整理仍然可靠的地址，固定给故乡、亲友和旧同事写信', { relation: 3, mind: 2, money: -1 }, 'later:60:letters', '六十岁以后仍固定维持一部分跨地通信。', '一封隔很久才到的回信', '一年后，一封回信确认了旧识的近况；另一些地址仍没有回应，没有被写成已经断绝或已经团聚。', { postProfile: { correspondence: '晚年仍维持一部分跨地通信' }, endingFact: true }),
      option('build-local-network', '我与邻里、同事或同乡会谈清轮值，建立当地互助办法', { network: 3, relation: 2, position: 1 }, 'later:60:local', '六十岁以后把更多精力放在当地邻里与同事互助。', '门边多了一张轮值表', '一年后，互助表在一次生病时真正派上用场；参与者也会因工作和家口变化调整责任。', { postProfile: { correspondence: '把主要关系放在当地互助网络' }, endingFact: true }),
      option('support-younger-life', '我把经验和一部分钱留给具体晚辈，但让对方自己决定怎样生活', { relation: 3, money: -2, craft: 2 }, 'later:60:younger', '六十岁以后开始长期支持一名具体晚辈，同时保留对方的生活选择。', '晚辈带着自己的计划回来', '一年后，对方使用了部分帮助，也拒绝了另一部分安排；支持形成了联系，没有形成所有权。', { postProfile: { correspondence: '与具体晚辈保持长期往来' }, endingFact: true })
    ],
  });

  installDecision({
    id: 'late-life-care', yearByAge: 70, followAge: 71, title: '七十岁以后怎样安排照料',
    prompt: '体力恢复明显变慢，旧伤和慢性病开始影响每天能做什么。你需要亲自说出自己的照料意愿，并与家人、邻里或能够支付的服务分别谈清边界。',
    options: [
      option('family-care-terms', '我和家人逐项谈清住处、医药和照料轮值，不默认由某一个人承担', { relation: 3, health: 2, money: -1 }, 'late:70:family', '七十岁以后与家人协商了住处、医药和照料轮值。', '照料表第一次被改动', '一年后，轮值接住了一次病中生活，也因每个人的工作与身体状况重新调整。', { postProfile: { care: '与家人协商住处、医药和照料轮值' }, endingFact: true }),
      option('community-care', '我与邻里和旧同事建立互相探望、送药与代办事情的安排', { network: 3, health: 2, relation: 2 }, 'late:70:community', '七十岁以后与邻里和旧同事建立了晚年互助安排。', '一次按约定到来的敲门声', '一年后，有人在你不便出门时按约送来药和消息；互助仍依赖具体的人是否在场。', { postProfile: { care: '依靠邻里与旧同事的晚年互助' }, endingFact: true }),
      option('independent-care', '我减少其他开支，给自己保留较独立的住处、医药和照料费用', { money: -4, position: 3, health: 2 }, 'late:70:independent', '七十岁以后减少其他开支，为独立住处、医药与照料保留费用。', '单独放好的医药与房租钱', '一年后，这笔钱让你能自行决定一次治疗和住处安排；物价和身体变化仍可能改变它能支撑多久。', { postProfile: { care: '以储备维持较独立的住处与照料选择' }, endingFact: true })
    ],
  });

  installDecision({
    id: 'late-life-record', yearByAge: 80, followAge: 81, title: '八十岁以后留下些什么',
    prompt: '有些经历只有你还能讲清，有些事情你也从未得到答案。你需要决定怎样把确认过的事实、个人记忆和仍然未知的部分分别留下。',
    options: [
      option('tell-one-person', '我把几段最重要的经历讲给一名具体的人，并允许对方保留不同记忆', { relation: 3, mind: 2 }, 'late:80:person', '八十岁以后将几段重要经历讲给一名具体的人。', '对方带着问题再次来访', '一年后，对方记住了部分细节，也带来与你不同的理解；这段人生没有因此变成唯一版本。', { postProfile: { legacy: '把重要经历讲给一名具体的人' }, endingFact: true }),
      option('sort-records', '我把旧信、证件和账本按年份整理，并标出无法确认的地方', { knowledge: 3, mind: 2, money: -1 }, 'late:80:records', '八十岁以后整理旧信、证件与账本，并标明未知事实。', '一只按年份分好的箱子', '一年后，家人和旧识从箱中确认了几段经历；缺失的年份仍明确留空，没有被补写。', { postProfile: { legacy: '整理旧信、证件与账本并标出未知' }, endingFact: true }),
      option('leave-oral-account', '我请人记录口述，只讲亲历和确知的事，不替失联者写结局', { fame: 2, knowledge: 2, relation: 1 }, 'late:80:oral', '八十岁以后留下了一份区分亲历、转述与未知的口述记录。', '记录稿上的几处空白', '一年后，记录被亲友校对，几处名字得到补充，另一些空白继续保留。', { postProfile: { legacy: '留下区分亲历、转述与未知的口述记录' }, endingFact: true })
    ],
  });

  C.ordinaryEvents.push(
    { id: 'shen-professional-night-call', title: '夜里有人来敲诊所门', routes: ['shen-professional'], text: '一名病家半夜来求助，药柜里只剩有限药品；你先检查病情、说明能做什么，再把复诊和费用写在登记簿上。', delta: { craft: 1, health: -1, relation: 1 }, subjectEffects: { support: { strength: 1 } } },
    { id: 'shen-professional-fee-ledger', title: '付不起的诊费', routes: ['shen-professional'], text: '病家拿不出全部诊费，你没有把免收写成自己的名声，而是与对方谈好分期、帮工或转介，并把未结部分单独记下。', delta: { money: -1, mind: 2, relation: 1 }, subjectEffects: { ledger: { strength: 1 } } },
    { id: 'shen-professional-medicine-route', title: '药品迟迟没有到', routes: ['shen-professional'], text: '原定送来的药品没有按时抵达，你与同事逐一核对库存、替代办法和不能接诊的情况，最后仍有几位病家只能等待。', delta: { craft: 1, network: 1, position: -1 }, contactEffects: { lu_junping: { relation: 1 } } },
    { id: 'shanghai-professional-overtime', title: '一张临时加班单', routes: ['shanghai-professional'], text: '主管临时要求赶完图纸和账目，你先问清加班报酬与交付范围；同事有人留下、有人因家口不能留下，工作被重新拆分。', delta: { craft: 2, money: 1, health: -1 }, contactEffects: { sun_ligen: { relation: 1 } } },
    { id: 'shanghai-professional-client', title: '委托人改了第三次要求', routes: ['shanghai-professional'], text: '一份独立委托第三次改变范围，你拿出原先写下的交付条件，与对方重新谈报酬和日期；最终只接下能负责的部分。', delta: { mind: 2, money: 1, network: 1 }, subjectEffects: { ledger: { strength: 1 } } },
    { id: 'shanghai-professional-family-key', title: '父亲又递来账房钥匙', routes: ['shanghai-professional'], text: '父亲再次问你是否回家业帮忙，你说明自己已经有受薪工作，只答应核对一笔急账；家门得到帮助，没有重新获得替你决定职业的权力。', delta: { relation: 1, mind: 2, money: -1 }, subjectEffects: { father: { agency: 1 } } },

    { id: 'post-mainland-old-address', title: '旧地址还在，人已经不全', minYear: 1952, post1949Choices: ['mainland'], text: '你按旧地址找到一处仍在的门牌，住户却已经换过。邻人只确认其中一人的去向，其他名字仍停在最后消息；你把确定和未知分别写下。', delta: { mind: 2, relation: 1 }, channels: ['conversation'] },
    { id: 'post-mainland-work-change', title: '工作名称换了', minYear: 1953, post1949Choices: ['mainland'], text: '原来熟悉的工作换了单位、名称或组织方式。你拿出旧手艺重新说明自己会做什么，也承认有些旧办法已经不再适用。', delta: { craft: 2, position: 1 } },
    { id: 'post-mainland-family-visit', title: '一次没有团圆所有人的探望', minYear: 1954, post1949Choices: ['mainland'], text: '一名亲友按新地址来访，带来几条已经核实的消息。你们谈了留下、迁居和照料，却没有替不在场的人决定下一步。', delta: { relation: 2, mind: 1 } },
    { id: 'post-hongkong-rent-day', title: '交房租的日子', minYear: 1952, post1949Choices: ['hong-kong'], text: '房东来收租时，同住者各自拿出这一月能承担的钱。有人刚换工、有人要寄钱回家，你们重新排了床位、做饭和欠下的部分。', delta: { money: -1, relation: 1 }, subjectEffects: { support: { strength: 1 } } },
    { id: 'post-hongkong-forwarded-letter', title: '经几处地址转来的信', minYear: 1953, post1949Choices: ['hong-kong'], text: '一封信经过商号和同乡的几次转寄才到手，纸上确认了一位亲友的近况，也说明另一个地址已经失效。', delta: { relation: 2, mind: 1 }, channels: ['conversation'] },
    { id: 'post-hongkong-old-skill', title: '旧手艺在新地方试了一次', minYear: 1954, post1949Choices: ['hong-kong'], text: '你带着工具或旧工作记录去试工，对方只认实际做出的结果。旧经验帮你接下一份活，也暴露出材料和规矩已经不同。', delta: { craft: 2, money: 1 } },
    { id: 'post-taiwan-name-list', title: '名单上的重逢与空白', minYear: 1952, post1949Choices: ['taiwan'], text: '你把最后已知单位和姓名交给一名愿意帮忙核对的人，几天后名单上多了两个地址，也留下几个仍无法确认的空格。', delta: { network: 2, relation: 1 }, channels: ['conversation'] },
    { id: 'post-taiwan-work-transfer', title: '工作又要换地方', minYear: 1953, post1949Choices: ['taiwan'], text: '单位提出调动，你先核对住处、家口和身体能否承受，再决定只接受其中一段安排；同行家人分别说出自己的选择。', delta: { mind: 2, position: -1 } },
    { id: 'post-taiwan-household-letter', title: '写给留在原地的人', minYear: 1954, post1949Choices: ['taiwan'], text: '你把抵达后的住址、工作和仍不确定的部分分别写进信里，没有用“已经安顿”掩盖临时住处和未确认消息。', delta: { relation: 2, knowledge: 1 } },
    { id: 'post-overseas-first-winter', title: '第一个不熟悉的冬天', minYear: 1952, post1949Choices: ['overseas'], text: '天气、食物和工时都与过去不同。你与同住者把取暖、房租和做饭重新分配，身体仍需要时间适应。', delta: { health: -1, mind: 2, relation: 1 } },
    { id: 'post-overseas-work-words', title: '工作里学会的新词', minYear: 1953, post1949Choices: ['overseas'], text: '你把工作中反复出现的词记在纸边，向同事确认工具、危险和报酬的含义；能够沟通以后，仍有资格和身份门槛没有消失。', delta: { knowledge: 2, craft: 1 } },
    { id: 'post-overseas-letter-returned', title: '一封被退回的故乡信', minYear: 1954, post1949Choices: ['overseas'], text: '写给故乡的信被退回，信封只能证明这个地址已经失效。你保留原信，又托可靠联系人寻找新的转寄办法。', delta: { mind: 2, relation: -1 }, subjectEffects: { connections: { strength: 1 } } },
    { id: 'post-motion-bus-stop', title: '车站边重新核对消息', minYear: 1952, post1949Choices: ['in-motion'], text: '上车前，你发现工作地点和传闻说的不完全一样，于是先找司机、做过这份工的人和当地住户交叉核对，再决定只走到下一站。', delta: { network: 2, position: 1, money: -1 } },
    { id: 'post-motion-fever', title: '上路前发起低烧', minYear: 1953, post1949Choices: ['in-motion'], text: '出发前夜身体发热，你把已经买好的票暂时放下，与同住者谈清药费和延期；错过这班车留下损失，也避免把病拖到路上。', delta: { health: -1, money: -1, mind: 2 } },
    { id: 'post-motion-parting', title: '同行者在路口分开', minYear: 1954, post1949Choices: ['in-motion'], text: '一名同行者决定转向另一处亲友地址。你们交换最后已知落脚点和转寄人，各自上路，没有把分开写成关系终止。', delta: { relation: 1, mind: 2 } },
    { id: 'post-unsettled-three-month-job', title: '三个月的工作到期', minYear: 1952, post1949Choices: ['unsettled'], text: '短期工约到期，雇主愿意再续一段，却不能保证住处。你把工资、房租和寻找家人的时间重新放在一起计算。', delta: { money: 1, position: -1, mind: 2 } },
    { id: 'post-unsettled-address-book', title: '地址簿里划掉一行', minYear: 1953, post1949Choices: ['unsettled'], text: '一封退信证明地址已经失效，你没有删去这个人，只在旁边记下最后确认年份，再把力气放到仍可核实的线索上。', delta: { knowledge: 1, mind: 2 } },
    { id: 'post-unsettled-room-choice', title: '是否再续这间屋', minYear: 1954, post1949Choices: ['unsettled'], text: '房租即将到期，你与同住者分别说出是否愿意继续留下。最终只续了较短期限，为可能出现的新消息保留余地。', delta: { position: 1, relation: 1, money: -1 } }
  );

  C.annualRhythms['shen-professional'] = [
    '诊所、药账和病家住址把这一年分成许多不能互相替代的小事；能处理的伤病被记录，不能处理的也明确留下边界。',
    '你在出诊、值班和家门责任之间重新排过时间，专业工作维持了生计，也让身体积累了需要承认的疲劳。',
    '登记簿里有人复诊、有人搬走、有人再没有消息；记录帮助你确认事实，没有保证所有人都会回来。',
  ];
  C.annualRhythms['shanghai-professional'] = [
    '受薪工作、独立委托和家门临时求助在这一年几次撞期，你只接下能够说明职责与报酬的部分。',
    '旧技能仍然有用，单位、材料和工作规矩却不断变化；你靠重新学习维持了自己的城市生计。',
    '一份工资单和两张委托收据被放进同一只抽屉，收入来源增加，也意味着风险不再由家业替你承担。',
  ];
  C.annualRhythms['post-mainland'] = [
    '新的工作与住处逐渐形成次序，旧地址仍只传回部分消息；你把能够确认的家人近况与没有答案的名字分开记录。',
    '原有手艺在新的单位或地方生活中换了用途，收入和责任没有恢复成战前原样，却真实接住了这一年的日常。',
    '一次探望带回了某个人的近况，也确认另一些关系已经需要新的地址；留下没有等于所有人自动团聚。',
  ];
  C.annualRhythms['post-hong-kong'] = [
    '房租、床位、工期和转寄信件构成了这一年；拥挤的住处接住日常，也要求同住者不断重新谈清各自责任。',
    '一份短工结束后又有新的工作消息，你靠街坊和旧技能继续谋生，收入仍要在房租、医药和寄回的钱之间排序。',
    '经几处地址转来的信确认了一个人的近况，另一个地址已经失效；跨地联系继续存在，却始终带着延迟和空白。',
  ];
  C.annualRhythms['post-taiwan'] = [
    '住处、工作登记与同行者各自的需要重新排过一次；临时手续帮助生活继续，没有把每个人的去向合成同一个答案。',
    '旧同事名单上有人重获联系、有人仍无消息，你在等待与谋生之间维持自己的日常，没有等所有空格填满。',
    '原有技能在新的工作位置派上用场，职业名称和生活关系已经改变；与故乡的通信仍要经过不稳定的转寄。',
  ];
  C.annualRhythms['post-overseas'] = [
    '语言、工序、房租和居留条件都需要重新学习；旧经验帮助你开始谋生，也不能替代当地资格与实际工作要求。',
    '一封写给故乡的信经过很久仍没有回音，你保留副本与最后地址，让未知继续是事实的一部分。',
    '同住者与同事各自承担自己的工作和亲属责任，你们互相帮助，却没有因为身在异乡就自动成为一个家庭。',
  ];
  C.annualRhythms['post-in-motion'] = [
    '短工、车船消息和临时屋檐把这一年分成几段；每次上路前，你都重新核对口粮、证件和同行者是否仍愿意继续。',
    '身体需要停下，下一份工作却在别处。你只走到已经核实的地点，没有把继续移动写成已经找到长期家。',
    '有人在路口分开，也有人在下一站加入；最后地址被一遍遍改写，关系并没有因此得到统一结论。',
  ];
  C.annualRhythms['post-unsettled'] = [
    '暂住处又续了几个月，短工也只保证到下一季；你继续核对证件与家人消息，没有把临时生活误写成永久安顿。',
    '一个地址失效，另一条工作线索得到确认。日常在不确定中继续运转，寻找答案没有取代吃饭、休息与谋生。',
    '同住者分别谈了是否留下，你只为自己的住处和工作作答；其他人的下一步仍由他们自己决定。',
  ];

  C.sceneFrames = {
    subeipoor: [
      { open: '清早，周淑兰在灶间和院门之间来回张罗，母亲则把当天能用的钱粮摊在桌上。', close: '你们先用眼前能做到的办法把事情接住，并把借物、照料和答应过的话分别记下；今天过去了，下一季谁还能出力仍没有答案。' },
      { open: '午后，村路和田埂上的消息一起传进家门，丁友顺带来一种说法，母亲又按自家身体与粮账提出另一种意见。', close: '最后只完成了最急的一步，其余事情留待后来核对；这次安排改变了家计和人情，却没有替任何人决定下一次去留。' },
      { open: '天色将晚，你把粮袋、药钱和家里能出力的人重新数了一遍，才发现一句简单的答应会牵动几户人的日子。', close: '事情暂时有了落点，借下的物、欠下的工和没有说准的消息都被留下；它们可能在以后成为帮助，也可能成为新的后账。' },
    ],
    jiangnanshen: [
      { open: '午后的沈家书房里，沈静兰带来家门消息，陆君平则把学校或工作的实际账目放到桌上。', close: '你只处理了自己能承担的部分，并让其他人分别作答；眼前问题暂时接住，家门、职业和个人生活之间的牵制仍会继续。' },
      { open: '学堂散后，信件、薪水和家用在一张桌上摊开，纸面上的道理必须落到具体住处、时间和费用上。', close: '这次商量留下了一个可执行办法，也留下尚未确认的人与地址；知识帮助你说明问题，没有自动消除现实限制。' },
      { open: '一封转寄多次的信抵达时，方云和的地址已经改变，家里人也各自带着不同责任来到桌边。', close: '你们把确定消息和各自选择分别记下，只先解决最急的一项；关系仍在，却不再由同一所旧屋替所有人作答。' },
    ],
    shanghaigongshang: [
      { open: '傍晚的账房里，孙立根拿着账目，徐云带来厂门口和工友家口的实际情况，两份消息并不能互相替代。', close: '你亲自完成了一项能负责的安排，同时把工钱、家口和账面后果分别留下；厂务继续运转，不等于每个人的生活都已接住。' },
      { open: '弄堂和厂房之间的一天还没结束，父亲、同事与家人已经分别提出住处、工作和钱财上的需要。', close: '最后的做法只保护了其中一部分，并让其他主体保留自己的决定；账本记住数目，具体的人仍会在以后回应这次取舍。' },
      { open: '报纸消息刚送到账房，机器、货款和家用的变化已经先发生；唐慧贞与徐云分别从工作和家口角度说明眼前困难。', close: '你把能够确认的事实写下并完成最急的一步，未知部分没有被好听的说法补齐；新的责任也随这次安排进入下一年。' },
    ],
    'subei-stay': [
      { open: '天刚亮，周淑兰在田埂边叫住你；收成、旧租账和堤上的活一起逼近，谁先出力、谁先拿粮必须当面说清。', close: '你们先按能承担的工和粮把事情接住，换工与借物也分别记下；这次安排解决了今天，下一季能否还账仍没有答案。' },
      { open: '村口的风声还没说准，丁友顺已经带着农具来到院里，母亲则提醒家中药钱和口粮都只够先保一头。', close: '你亲自做完最急的一项，也让家人和乡邻保留各自选择；留下的名额、租账或人情会在后来继续被追问。' },
    ],
    'subei-millworker': [
      { open: '换班铃响过以后，陈福生在通铺边摊开工钱和医药账，机器不会因为谁家有急事就自动停下。', close: '你们先把班次、工钱和照料责任分清，眼前日子勉强接上；身体损耗与欠下的人情仍会带到下一班。' },
      { open: '厂门口的消息传进车间时，工友已经在为房租、寄款和受伤后的接班重新算账。', close: '你只承诺自己能做到的部分，并把具体人的需要留下；机器重新开动，不表示伤病与家口问题已经结束。' },
    ],
    'subei-soldier': [
      { open: '临时驻地天还没亮，丁友顺和几名同伴已经在清点口粮、鞋和能够送出的家书，下一次调动没有确定日期。', close: '你先完成能亲手做到的一步，并记下同伴最后消息；队伍继续移动，失联、伤病和归路仍没有被提前写成结局。' },
      { open: '点名以后少了几个熟悉名字，路边能找到的药和食物也很有限，你必须在身体、同伴和家书之间先接住一项。', close: '事情暂时得到处理，名单和口信被保存下来；没有出现的人仍只停在最后已知消息，不能被补写成死亡。' },
    ],
    'subei-refugee': [
      { open: '临时落脚处的灶火刚点起，同路人便把粮、住处和下一段路的消息摆在一起，每一家能承担的都不同。', close: '你们先商量出一段能过夜的办法，并留下各自最后地址；有人可能继续走、有人可能留下，今天的合作没有替以后作答。' },
      { open: '集市边又来了一批人，包袱、病痛和寻人纸条挤在同一处屋檐下，你只能先处理自己确实能接住的事情。', close: '短工或互助接住了眼前几天，未核实的消息仍被单独留下；落脚不等于已经回家，同行也不等于永远同路。' },
    ],
    'shen-scholar': [
      { open: '课后，陆君平把房租和薪水摊开，方云和又带来一封退稿；学生仍在门外等下一次上课。', close: '你亲自决定先完成哪一项工作，并把不能兼顾的部分说清；知识生活继续，稿费、校务与家门责任仍会在下一年相撞。' },
      { open: '书稿和学生名册被放在同一张桌上，学校能否继续、稿子能否发表与家里能否接住开支成了三个不同问题。', close: '这次只保住了一种连续性，其他后果没有消失；具体学生和同事会按自己的条件继续回应。' },
    ],
    'shen-newwoman': [
      { open: '女学散课以后，沈静兰与一名学生分别带来婚家来信和欠下的学费，唐突的“替她决定”解决不了任何实际问题。', close: '你把住处、费用和可行选择说明清楚，只处理自己能承担的部分；她们如何生活仍由各自条件决定。' },
      { open: '课堂缺少纸笔，家门又催问婚事，学校同事则希望你多接一段无报酬工作，三件事同时占用同一份时间。', close: '你亲自保住了其中一项，也明确拒绝了无法承担的部分；个人生计、婚家和公共工作之间的后账进入下一年。' },
    ],
    'shen-refugee': [
      { open: '后方借来的屋檐下，书箱、学生名单和家人的不同地址又被摊开，能带走和能留下的东西都有限。', close: '你先完成一项能让日常继续的安排，并让家人分别决定自己的落点；临时课堂与住处接上了，归路仍需后来核对。' },
      { open: '一封经过多次转寄的信终于到了，方云和与陆君平的地址都已改变，家门内部也有人准备留下、有人想回去。', close: '确定消息被记下，未知部分继续留空；你只为自己的工作和住处作答，没有把“举家”写成所有人同向。' },
    ],
    'shen-professional': [
      { open: '诊所门口已经有人等候，药柜、费用和病家住址却都有缺口，陆君平带来的登记纸也只够先处理最急的一批。', close: '你说明了能做与不能做的部分，并把复诊和欠账分别记下；一项伤病得到接住，药品与身体压力仍留到以后。' },
      { open: '一次出诊把你带到陌生住处，病家、同行者和家门分别提出不同需要，专业判断必须落到有限药物和时间上。', close: '你完成了自己能够负责的照料，没有承诺无法保证的结果；这次记录会帮助后来复诊，也可能留下新的未确认消息。' },
    ],
    'shanghai-heir': [
      { open: '夜里的账房还亮着灯，孙立根核对工钱，徐云则说明几户工友的医药与住处，账面平衡和家口生活并不是一件事。', close: '你先承担了一项明确责任，并把机器、工钱和具体人物分别记下；家业没有因此自动保全，工友也没有失去自己的决定。' },
      { open: '一件机器零件迟迟未到，货款、停工和工友家口同时受影响，父亲的旧办法也不能直接解决新的限制。', close: '你亲自选择了一种损失先承担，其他人按自己的条件调整；这笔后账会在复工、欠薪或离开时继续出现。' },
    ],
    'shanghai-newwoman': [
      { open: '工作室里，唐慧贞把房租和委托账分开，徐云又带来诊所与工友家口的需要，公共服务不能吞掉全部个人生计。', close: '你谈清了能承担的课时、费用和照料，并让其他人保留自己的工作与婚家选择；新的合作进入下一年。' },
      { open: '一名学生在门口等待家里回信，工作室又有付费委托到期，你必须在住处、收入和课程之间亲自作出有限安排。', close: '眼前的一项需要得到处理，另一项被明确延期而不是假装解决；个人工作继续存在，也继续承担真实代价。' },
    ],
    'shanghai-professional': [
      { open: '受薪单位临时改变工时，委托人又催交图纸，孙立根带来的家门急账只能成为第三件需要商量的事。', close: '你按书面职责完成能负责的部分，并拒绝让家业替你无限担保；收入接上，工作风险也由自己承担。' },
      { open: '工具、工资单和一封家门来信放在桌上，固定职位、独立委托与家庭责任都想占用同一段时间。', close: '你亲自确定了优先次序，也把未接下的事务说清；职业独立没有切断关系，却改变了谁能替你作决定。' },
    ],
  };

  C.lifeDensityStandard.authoredActions = C.actions.length;
  C.lifeDensityStandard.authoredDecisions = C.decisions.length;
  C.lifeDensityStandard.decisionOptions = C.decisions.reduce(function (sum, item) { return sum + item.options.length; }, 0);
  C.lifeDensityStandard.authoredLifeScenes = C.ordinaryEvents.length;
})(typeof window !== 'undefined' ? window : globalThis);
