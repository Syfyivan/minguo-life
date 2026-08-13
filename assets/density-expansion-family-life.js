// 民国人生 · 18 家庭具体生活密度包 v0.7.23
// 本包补足父母、朋友、婚姻、疾病、工作与顾客六类日常；人物均为合成虚构。
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before density-expansion-family-life.js');

  C.version = '0.7.23';

  var profiles = {
    subeipoor: {
      code: 'f01', place: '苏北河埠与租田之间', worksite: '河埠集市的粮担旁',
      object: '一只补过两次的粮袋', product: '受潮后重新筛过的杂粮',
      boss: '管租人赵有德', coworker: '丁友顺', customer: '买粮的船娘冯三姐', supplier: '借出种子的周淑兰', doctor: '走村看病的蒋郎中',
      symptom1: '午后发冷、夜里高热并连续咳嗽', symptom2: '常年挑担留下的腰痛和膝肿',
      expense: '母亲的药钱、租粮和两边老人照料', move: '要不要离开租田去城里接短工',
      sourceIds: ['SRC-F02-SOCIAL-AFFAIRS', 'SRC-F02-FLOOD-1931'],
    },
    jiangnanshen: {
      code: 'f04', place: '江南沈家书房与明德中学之间', worksite: '明德中学校务室',
      object: '一册受潮后逐页编号的旧书', product: '校订后的讲义和副刊稿件',
      boss: '校长严伯修', coworker: '教员陆君平', customer: '来问停学办法的学生何佩真', supplier: '送纸墨的同兴书铺', doctor: '惠民诊所的马会宁医师',
      symptom1: '连日低热、咽痛并在授课时失声', symptom2: '多年伏案造成的眼痛和手指麻木',
      expense: '房租、纸墨、双方父母医药和亲族借款', move: '是否为新教职迁居并保留各自工作',
      sourceIds: ['SRC-D19-NJU-COURSES', 'SRC-D21-SHANGHAI-PRESS'],
    },
    shanghaigongshang: {
      code: 'f06', place: '上海棉布号、织造作场与租界街面之间', worksite: '顾记棉布号后院作场',
      object: '一张写明色号、尺数和交期的货单', product: '小批棉布和成衣铺订单',
      boss: '账房孙立根', coworker: '挡车女工徐云', customer: '成衣铺薛老板', supplier: '恒丰货栈的棉纱经手人', doctor: '同仁诊所的周医师',
      symptom1: '机器间棉尘引起的胸闷、咳嗽和眼红', symptom2: '长期核账造成的头痛与失眠',
      expense: '工友欠薪、夫妻家用和双方父母医药', move: '是否把住处迁近作场并由谁放弃原岗位',
      sourceIds: ['SRC-F05-SHANGHAI-SOCIETY', 'SRC-D47-SH-FINANCE-ARCHIVES'],
    },
    sichuanmedicine: {
      code: 'f16', place: '成都近郊药铺与饮食摊之间', worksite: '赵茂春药铺的柜台和后库',
      object: '一包写着药名、剂量和经手人的纸包', product: '验过气味与受潮情况的药材',
      boss: '药铺掌柜赵茂春', coworker: '登记员钱文淑', customer: '反复取药的罗嫂', supplier: '送药材的山货行经手人', doctor: '坐堂看诊者蒋济川',
      symptom1: '吃坏食物后的腹痛、呕吐和脱水', symptom2: '久站切药留下的腕痛与腰酸',
      expense: '病亲药钱、摊位炉火和双方父母照料', move: '是否离开家铺接受卫生所训练',
      sourceIds: ['SRC-F16-COMMERCE', 'SRC-D27-WCH-HISTORY'],
    },
    guanzhongirrigation: {
      code: 'f17', place: '关中村渠、集市与迁移落脚处之间', worksite: '村渠分水口与粮店账桌',
      object: '一块刻着轮水次序的木牌', product: '按户分清的水时和秋粮',
      boss: '渠首何老成', coworker: '邻户周满仓', customer: '来换水时的菜农刘嫂', supplier: '集市粮店的赵掌柜', doctor: '镇上仁安药铺的田先生',
      symptom1: '饮水不洁后的腹泻、发热和虚弱', symptom2: '修渠挑土留下的肩伤与旧寒腿',
      expense: '粮债、迁居盘缠和两边老人照料', move: '灾年先迁谁、留下谁看地和多久汇一次钱',
      sourceIds: ['SRC-F17-IRRIGATION', 'SRC-F17-FAMINE'],
    },
    xianartisans: {
      code: 'f18', place: '西安手艺铺、车站与客店之间', worksite: '德顺修理铺的工台',
      object: '一张画着尺寸并写明材料的修理工单', product: '修好的车轮、锁件和客店器具',
      boss: '铺主马敬修', coworker: '学徒白守成', customer: '客店掌柜许瑞和', supplier: '东关五金行的送货人', doctor: '西关惠安诊所的梁医师',
      symptom1: '金属屑入眼后的刺痛、流泪和视物模糊', symptom2: '多年弯腰锉磨造成的腕麻和腰痛',
      expense: '工具债、铺租和双方父母医药', move: '是否随车站新活迁铺并让谁承担旧客户',
      sourceIds: ['SRC-F18-XIAN-ECONOMY-LOWER', 'SRC-F18-MARKET-MEMORY'],
    },
    shanghailabor: {
      code: 'f05', place: '上海纱厂、棚户租屋与市场之间', worksite: '纱厂验布间和挡车工段',
      object: '一张逐班写着停机时辰的工票', product: '验出疵点并重新标记的棉纱与坯布',
      boss: '工头赵炳坤', coworker: '验布女工周惠珍', customer: '来取布的裁衣铺吴师傅', supplier: '仓库领料员罗季生', doctor: '工房附近济民诊所的沈医师',
      symptom1: '棉尘、夜班后出现的咳嗽、气短和头晕', symptom2: '卷布碰伤手指后反复肿痛',
      expense: '房租、停工日的口粮和双方父母药钱', move: '是否换厂、搬屋以及谁继续照看孩子和老人',
      sourceIds: ['SRC-F05-SHANGHAI-SOCIETY', 'SRC-F05-SHANGHAI-ADMIN'],
    },
    northeastrailworkers: {
      code: 'f10', place: '东北站区、货场与工人住区之间', worksite: '宽城子站货场检修棚',
      object: '一本写着车次、件数和交接人的工簿', product: '检修后的车轴部件和封好的货件',
      boss: '检修领工周连山', coworker: '货场木工林福来', customer: '托运药箱的商户金顺玉', supplier: '机务材料库的韩保成', doctor: '站区诊疗所的崔医师',
      symptom1: '冬夜值班后的高热、胸痛和持续咳嗽', symptom2: '搬运与检修留下的腰伤和听力下降',
      expense: '站区房租、煤钱和双方父母照料', move: '岗位调动时是否随迁以及谁保留原来的工作',
      sourceIds: ['SRC-F10-KUANCHENGZI', 'SRC-F10-JILIN-ECONOMY'],
    },
    guangdongqiaoxiang: {
      code: 'f13', place: '广东侨乡圩镇、侨批铺与学校之间', worksite: '侨批代写与汇款核对柜台',
      object: '一封分开写明寄款人、收款人和转递地址的侨批', product: '核过印记、金额与回信地址的汇款单',
      boss: '侨批铺经手人陈启隆', coworker: '代写信者郑慧兰', customer: '等候远方回款的梁伯母', supplier: '往返县城的邮递员冯启安', doctor: '圩镇仁济所的黄医师',
      symptom1: '湿热季节反复发作的高热与寒战', symptom2: '长期伏案代写造成的眼痛和手腕麻木',
      expense: '两地家用、双方父母医药和出洋盘缠', move: '谁先出洋、谁留在本地工作及多久汇一次钱',
      sourceIds: ['SRC-F13-UNESCO-QIAOPI', 'SRC-F13-GD-POSTAL-1929-1949'],
    },
    guangdongcoastal: {
      code: 'f14', place: '广东沿海埠头、客栈与船票房之间', worksite: '内港船票房和小客栈柜台',
      object: '一张写着船名、舱位、行李件数和退票条件的票据', product: '核过船期的客位与分件托运货物',
      boss: '票房掌事伍启祥', coworker: '客栈账务许瑞芳', customer: '带两只木箱候船的陈玉嫂', supplier: '码头货栈验件人梁炳生', doctor: '内港同善堂的何医师',
      symptom1: '晕船后持续呕吐、脱水和站立不稳', symptom2: '夜班守柜与搬箱留下的胃痛和肩伤',
      expense: '船费、客栈租金和两边老人照料', move: '是否迁港、由谁守住原工作和何时接家人',
      sourceIds: ['SRC-F14-GD-WATER-GUEST-CERTIFICATE', 'SRC-F14-GD-CUSTOMS'],
    },
    hankouport: {
      code: 'f11', place: '汉口码头、河街饭摊与车行之间', worksite: '码头货栈短驳点',
      object: '一块写着货号、件数和搬运班次的木牌', product: '按件交清的棉包、木箱和食材',
      boss: '码头领班郭长顺', coworker: '短驳工赵诚安', customer: '催送食材的饭馆孙荷香', supplier: '船行交件人蔡伯安', doctor: '河街济生诊所的罗医师',
      symptom1: '洪水后饮水不净造成的腹痛、发热和脱水', symptom2: '拉车搬包留下的膝伤、腰痛和手掌裂口',
      expense: '车份、房租、药钱和双方父母照料', move: '涨水或停航时先搬谁、工具放哪和谁继续挣钱',
      sourceIds: ['SRC-F11-HUBEI-DOCK-RECORDS', 'SRC-F11-WUHAN-FLOOD-1931'],
    },
    tianjinclerks: {
      code: 'f08', place: '天津手艺铺、邮务站与租住房之间', worksite: '成衣铺账桌和邮务递送点',
      object: '一张写明尺码、订金和取货日的成衣单', product: '按样核过的成衣与逐件登记的邮件',
      boss: '铺主韩守义', coworker: '核样女工刘瑞芳', customer: '来改冬衣的王太太', supplier: '布行送样人赵广成', doctor: '南市平民诊所的杜医师',
      symptom1: '冬季受寒后的高热、咽痛和耳痛', symptom2: '久坐抄账与缝纫造成的眼痛和腕伤',
      expense: '房租、煤钱和双方父母医药', move: '新岗位远离住处时由谁换工、谁照料老人',
      sourceIds: ['SRC-F08-TIANJIN-GUILDS', 'SRC-F08-TIANJIN-INDUSTRY'],
    },
    hankoucommerce: {
      code: 'f12', place: '汉口江汉商街、行栈与干货摊之间', worksite: '行栈账房和仓间',
      object: '一张分列货主、经手人、船期和受潮情况的货单', product: '分装干货与核过包装的寄卖货',
      boss: '行栈账房徐立臣', coworker: '仓栈验货人蔡伯安', customer: '自有摊位的蒋秀英', supplier: '母亲冯月娥的干货供货人', doctor: '江汉路惠民诊所的陈医师',
      symptom1: '误食变质干货后的腹痛、呕吐和发热', symptom2: '抄单盘货留下的眼痛、胃痛和腕伤',
      expense: '铺租、赊账、双方父母药钱和雇员工资', move: '是否共同开店、谁出库存以及失败后怎样分账',
      sourceIds: ['SRC-F12-HANKOU-CHAMBER', 'SRC-F12-JIANGHAN-ROAD'],
    },
    northeastsettlers: {
      code: 'f09', place: '东北邻屯、垦地与小站之间', worksite: '屯边垦地和农具修理棚',
      object: '一本画着地界、播种日和借用牲口的薄册', product: '按垄清点的粮豆与修好的农具',
      boss: '屯长赵守义', coworker: '邻屯农户孙福来', customer: '换农具的菜农赵春梅', supplier: '小站粮栈的金掌柜', doctor: '邻屯巡诊的朴医师',
      symptom1: '严寒后手脚冻伤、发热和伤口渗液', symptom2: '多年开荒留下的腰伤与慢性咳嗽',
      expense: '种子债、冬储煤粮和双方父母照料', move: '地权有争议时留下、换屯或去小站做工',
      sourceIds: ['SRC-F09-MIGRATION-CONTEXT', 'SRC-F09-MIXED-COMMUNITIES'],
    },
    southwestwarworkers: {
      code: 'f15', place: '西南迁入工厂、住区与防空洞之间', worksite: '迁入工厂民用维修间',
      object: '一张分列机器编号、停机原因和经手人的维修卡', product: '修复后的民用机件和仓务清单',
      boss: '维修领班蒋守文', coworker: '住区代课者何碧兰', customer: '来领生活器具的周师傅', supplier: '材料库登记员罗秋白', doctor: '工厂医务室的钱医师',
      symptom1: '空袭后耳鸣、失眠和突发心悸', symptom2: '夜班维修造成的手伤、腰痛和长期疲倦',
      expense: '租屋、两地家书、双方父母医药和战后迁费', move: '战后回原籍、留川还是分两地继续工作',
      sourceIds: ['SRC-F15-MOVED-INDUSTRY', 'SRC-F15-BOMBING'],
    },
    subeiartisans: {
      code: 'f02', place: '苏北乡村作坊、河埠与集市之间', worksite: '赶集摊位和农具修理桌',
      object: '一张写明修什么、用谁的料和何时取件的工单', product: '修好的镰刀、木桶与小批针线货',
      boss: '集市摊头周桂生', coworker: '缝补代写者韩月贞', customer: '带裂桶来修的王嫂', supplier: '镇江货行送小五金的经手人', doctor: '圩镇保生堂的许先生',
      symptom1: '锈钉划伤后红肿、发热和手指难屈', symptom2: '常年赶集挑担留下的肩痛与足底裂口',
      expense: '工具债、货款和双方父母药钱', move: '是否离村摆摊、谁保管工具和旧客怎样交代',
      sourceIds: ['SRC-F02-ZHENJIANG-CHAMBER', 'SRC-F02-SOCIAL-AFFAIRS'],
    },
    jiangnansilkwater: {
      code: 'f03', place: '江南水田、蚕房与丝厂之间', worksite: '蚕房缫丝灶和丝厂检验台',
      object: '一本写着蚕种、工票、丝重和受潮情况的小账', product: '分级蚕茧与检过粗细的生丝',
      boss: '丝厂领班陆水生', coworker: '检验女工沈月秀', customer: '收茧商陈掌柜', supplier: '送蚕种的合作户顾阿嫂', doctor: '水乡仁济所的吴医师',
      symptom1: '蚕房闷热后高热、头痛和持续乏力', symptom2: '缫丝热水造成的手部皮炎与关节痛',
      expense: '田租、蚕种、药钱和双方父母照料', move: '进丝厂、守蚕房或迁往亲族处时怎样分工',
      sourceIds: ['SRC-F03-WUXI-SILK', 'SRC-F03-SILK-ARCHIVE'],
    },
    northchinadroughtfarm: {
      code: 'f07', place: '华北旱地、庙会与铁路小站之间', worksite: '旱地麦田和庙会货摊',
      object: '一本分列粮债、驴车份额和短工工票的薄账', product: '留种麦、庙会小货与铁路短工工票',
      boss: '粮行管事孙守安', coworker: '季节农工冯安秀', customer: '来换留种粮的赵大嫂', supplier: '庙会货商刘掌柜', doctor: '县城施诊所的高医师',
      symptom1: '饥饿与风沙后持续咳嗽、发热和虚弱', symptom2: '拉车收割留下的膝伤与胃痛',
      expense: '粮债、牲口草料和双方父母医药', move: '旱年外出做工时谁守地、谁带老人和钱怎么寄回',
      sourceIds: ['SRC-F07-NORTH-FAMINE-1921', 'SRC-F07-TEMPLE-FAIR'],
    },
  };

  var effects = {
    parent: { relation: 2, mind: 1, money: -1 }, friend: { network: 2, relation: 1, money: -1 },
    spouse: { relation: 1, mind: 1, money: -2 }, health: { health: -2, money: -2, mind: -1 },
    work: { craft: 2, money: 1, health: -1 }, customer: { money: 1, network: 1, mind: -1 },
  };

  function parent(familyKey, key) {
    return (C.parentProfiles[familyKey] || {})[key] || {
      name: key === 'mother' ? '母亲' : '父亲', occupation: '维持家计', activities: ['核对当天家用'], words: ['“先把谁做了什么说清。”'],
    };
  }

  function contacts(familyKey) {
    return Object.keys((C.families[familyKey] || {}).contacts || {}).map(function (key) {
      var item = C.families[familyKey].contacts[key];
      return { name: item.label || item.name || '一名邻人', role: item.role || '有自己生计的熟人' };
    });
  }

  function spouseText(familyKey, makeText) {
    var profiles = C.spouseProfiles[familyKey] || {};
    return {
      男: makeText(profiles['男'] || { name: '伴侣', occupation: '有自己的工作', values: '共同商量生活安排' }),
      女: makeText(profiles['女'] || { name: '伴侣', occupation: '有自己的工作', values: '共同商量生活安排' }),
    };
  }

  function install(familyKey, profile, slug, category, title, text, scope) {
    var event = Object.assign({
      id: 'density-' + profile.code + '-' + slug,
      title: title,
      text: typeof text === 'string' ? text : text['男'],
      textByGender: typeof text === 'string' ? null : text,
      families: [familyKey],
      priority: 25,
      delta: effects[category],
      sourceIds: profile.sourceIds.slice(),
      reviewStatus: 'human-authored-source-linked-first-pass-reviewed',
      reviewNote: '已检查具名人物、地点、实物、矛盾、当年结果与后续影响；还需在全量五千场景完成后统一文字终审。',
      densityPack: 'family-life-v1',
      densityCategory: category,
      familyOriginOnly: true,
      densityFacets: ['named-person', 'specific-place', 'physical-object', 'conflict', 'same-year-result', 'later-consequence'],
    }, scope || {});
    C.ordinaryEvents.push(event);
  }

  Object.keys(profiles).forEach(function (familyKey) {
    var p = profiles[familyKey];
    var mother = parent(familyKey, 'mother');
    var father = parent(familyKey, 'father');
    var people = contacts(familyKey);
    var friendA = people[0] || { name: p.coworker, role: '邻人' };
    var friendB = people[1] || people[0] || { name: p.customer, role: '熟人' };

    install(familyKey, p, 'parent-mother', 'parent', mother.name + '把自己的营生和家用分开',
      '在' + p.place + '，' + mother.name + '没有只等孩子替她安排生活。她先' + mother.activities[0] + '，再把' + p.object + '、当日收入和不能挪用的一份药钱分开。家里希望她把钱全并进公账，她拒绝后亲自说明：“' + String(mother.words[0]).replace(/[“”]/g, '') + '” 当年少还一笔旧账，下一年却能查清她自己的劳动、身体和选择。',
      { minAge: 5, maxAge: 22 });
    install(familyKey, p, 'parent-father', 'parent', father.name + '带回一份没有被夸大的工作答复',
      '傍晚回到' + p.place + '，' + father.name + '说清自己' + father.occupation + '，并' + father.activities[0] + '。家里原以为这次门路能立刻解决' + p.expense + '，他却拿出' + p.object + '逐项说明已经结算、仍欠和根本没有答应的部分。当天只补上一处缺口；以后再谈工作时，全家不再把介绍、试工和正式留用混成一件事。',
      { minAge: 9, maxAge: 28 });
    install(familyKey, p, 'friend-shared-object', 'friend', friendA.name + '不肯让一次帮忙变成长期欠情',
      '在' + p.place + '，' + friendA.name + '以' + friendA.role + '的身份借走' + p.object + '，答应两日后归还。第二日对方因自家急事无法赴约，却没有消失，而是托人送来一张新日期和半份补偿。你可以生气，也必须决定是否续借；物件最终归还，关系少了一点想当然，后来共同做事时双方都会先写清时间和责任。',
      { minAge: 11, maxAge: 35 });
    install(familyKey, p, 'friend-separate-choice', 'friend', friendB.name + '选择了与你不同的去向',
      friendB.name + '在' + p.place + '告诉你，自己作为' + friendB.role + '，决定先处理家里的住处和收入，不参加你计划中的' + p.move + '。你们为谁先失约争了几句，最后把已经共同垫付的钱、' + p.object + '和下一次联系地点分别记下。当年这项计划缩小了；几年后重逢时，他有自己的工作和亲属消息，而不是一直停在原地等你调用。',
      { minAge: 16, maxAge: 43 });
    install(familyKey, p, 'spouse-household-ledger', 'spouse', '婚后第一次把爱意、家用和个人工资分开谈',
      spouseText(familyKey, function (spouse) {
        return '在' + p.place + '，' + spouse.name + '结束一天“' + spouse.occupation + '”的工作后，发现家里准备未经商量就从其工资拿钱支付' + p.expense + '。两人为“成婚后是不是所有钱都该合并”争吵。' + spouse.name + '坚持' + spouse.values + '。当晚两人重做共同家用、个人储备和两边亲属支出三栏账；关系没有自动变好，但下一年谁能动哪笔钱已经有可追查的约定。';
      }), { minAge: 21, maxAge: 48, requiresSubjectNotStatus: { spouse: 'not-met' } });
    install(familyKey, p, 'spouse-work-move', 'spouse', '一份新工作让夫妻必须决定谁迁、谁留',
      spouseText(familyKey, function (spouse) {
        return spouse.name + '在' + p.place + '收到一份有岗位、工钱和报到日的工作答复，恰好与你计划的“' + p.move + '”冲突。你担心分居，' + spouse.name + '则不接受自己的职业被当成可随时放弃。两人把住处、路费、探亲、双方父母与工作期限逐项谈完，先试行半年异地并保留各自收入；半年后可以团聚、续分居或结束关系，没有由性别替任何人预定牺牲。';
      }), { minAge: 24, maxAge: 52, requiresSubjectNotStatus: { spouse: 'not-met' } });
    install(familyKey, p, 'health-acute', 'health', p.symptom1 + '让这一年真正停下来',
      '在' + p.place + '，你先出现' + p.symptom1 + '，仍撑着去' + p.worksite + '，结果半日后无法继续。' + p.doctor + '只记录能看见和问到的症状，说明暂时处理、危险征象与何时复诊，没有保证治愈。家里为两日停工、药费和谁来照料发生争执；当年收入减少，复诊后症状缓解，但这次停工和欠下的人情会留到下一年。',
      { minAge: 8, maxAge: 38 });
    install(familyKey, p, 'health-chronic', 'health', p.symptom2 + '不是一句自然衰老',
      '多年后在' + p.worksite + '，你因' + p.symptom2 + '漏做一项工序。' + p.coworker + '先替你接住当日工作，' + p.doctor + '随后询问发作时间、旧伤与劳动强度，只给出减量、复查和可能无法恢复的边界。你支付一笔检查费并与雇主重排班次；疼痛没有神奇消失，晚年能做的活、收入和是否需要别人帮助都因此改变。',
      { minAge: 39, maxAge: 72 });
    install(familyKey, p, 'work-boss-order', 'work', p.boss + '交来一项有期限也有权限边界的工作',
      '在' + p.worksite + '，' + p.boss + '要求你当天处理' + p.product + '，却没有说清损耗由谁承担。你与' + p.coworker + '用' + p.object + '核对数量、成色、经手人和交付时辰，只接下自己有权确认的一段。当天少完成一批，却避免把未知损失记到普通工钱里；次月结算时，这份记录决定了谁补货、谁返工以及你是否继续留任。',
      { minAge: 17, maxAge: 55 });
    install(familyKey, p, 'work-colleague-error', 'work', p.coworker + '犯错以后没有凭关系消失',
      p.coworker + '在' + p.worksite + '把' + p.product + '的一处编号抄错，' + p.customer + '已经按旧号来取。你没有替同事掩掉，也没有把整批损失全推给他，而是拿出' + p.object + '复核谁抄写、谁批准和哪部分还能补救。当日双方加班改正并各自留下责任；后来考核既记录错误，也记录主管未复核和你实际补救的范围。',
      { minAge: 20, maxAge: 59 });
    install(familyKey, p, 'customer-complaint', 'customer', p.customer + '带着具体问题回来要求答复',
      p.customer + '来到' + p.worksite + '，指出收到的' + p.product + '与先前约定不符，并把' + p.object + '放在桌上作证。你不能用“老顾客通融”打发，只能当面选择返工、退掉问题部分、补偿或停止交易。双方最终退回一段款并重写交期；当年少赚的钱换来一份清楚结果，下一次成交也不再靠模糊口头情面。',
      { minAge: 21, maxAge: 63 });
    install(familyKey, p, 'customer-credit', 'customer', p.supplier + '拒绝继续把赊欠当成人情',
      '在' + p.place + '，' + p.supplier + '送来下一批' + p.product + '，同时拿出旧账，要求先说明上次欠款、这次货权和最迟付款日。家里有人希望再拖一季，你则把' + p.object + '、现钱、不能担保的个人财物和可能卖不出的部分逐项列开。双方只成交原计划的一半；生意缩小了，但供应者、顾客与家人终于知道失败时各自能收回什么。',
      { minAge: 25, maxAge: 67 });
  });

  C.densityExpansion = C.densityExpansion || {};
  C.densityExpansion.familyLifeV1 = {
    version: '0.7.23', familyCount: Object.keys(profiles).length, scenesPerFamily: 12,
    sceneCount: Object.keys(profiles).length * 12,
    categories: ['parent', 'friend', 'spouse', 'health', 'work', 'customer'],
    note: '第一批家庭具体生活密度包；不代表五千条场景总门槛已经完成。',
  };
})(typeof window !== 'undefined' ? window : globalThis);
