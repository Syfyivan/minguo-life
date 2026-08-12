// 民国人生 · 公共生活与政治参与层 v0.7
// 历史组织与公共事件使用可核对名称；所有玩家角色、联络人与个人经历均为合成虚构。
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before public-life.js');

  C.version = '0.7.0';
  C.publicLifeStandard = {
    optional: true,
    contactBeforeMembership: true,
    factualOutcomeLanguage: true,
    minimumDecisionStages: 7,
    minimumAuthoredScenes: 21,
  };

  C.publicStatusLabels = {
    unaffiliated: '没有参加政治组织',
    'public-participant': '参与公开公共活动',
    'peripheral-helper': '承担外围具体事务',
    applicant: '等待组织答复',
    member: '组织成员',
    'nonparty-helper': '无党派公共工作者',
    'secret-worker': '秘密联络与交通工作',
    infiltration: '以公开职业维持隐蔽身份',
    inactive: '政治活动已经中断',
    withdrawn: '已经退出原有活动',
    'coerced-cooperation': '受压后曾向调查者提供信息',
  };
  C.publicSecrecyLabels = { open: '公开', limited: '只向少数家人说明风险范围', secret: '身份与任务不公开' };
  C.familyKnowledgeLabels = { none: '家人不知道', partial: '家人只知道风险范围', full: '家人知道能够公开说明的经历' };
  C.publicOrganizations = {
    ccp: { name: '中国共产党', short: '中共' },
    kmt: { name: '中国国民党', short: '国民党' },
    nonparty: { name: '无党派公共网络', short: '无党派' },
  };

  C.publicRouteProfiles = {
    'subei-stay': {
      publicGroup: '乡村识字、互助与减租讨论小组', publicRole: '替乡邻认告示、记租账并组织换工',
      covertRole: '在集市与村落之间核对消息、转告人员是否平安', infiltrationRole: '以赶集和租账往来维持公开身份，观察征派与地方动向',
      contact: { id: 'public_liu_qinghe', label: '刘庆和', role: '走村教识字、也替人核对告示的青年', status: 'distant', relation: 14, born: 1903 },
    },
    'subei-millworker': {
      publicGroup: '纱厂夜校与工友互助会', publicRole: '抄工票、教工友认字并核对工伤与欠薪名单',
      covertRole: '在工友住处和夜校之间传递已经核实的口信', infiltrationRole: '继续在车间上班，以正常换班和工票往来维持身份',
      contact: { id: 'public_he_yuzhen', label: '何玉贞', role: '纱厂夜校教员，逐户核对工友家口', status: 'coworker', relation: 16, born: 1901 },
    },
    'subei-soldier': {
      publicGroup: '部队读报与伤员互助小组', publicRole: '替不识字的士兵读信、记伤员去向并说明队伍消息',
      covertRole: '在驻地、伤员转送处与地方联络人之间核对消息', infiltrationRole: '以文书和伤员搬运职责接近需要了解的军政机构',
      contact: { id: 'public_luo_zhenhua', label: '罗振华', role: '负责识字课与伤员名册的文书员', status: 'traveling', relation: 15, born: 1898 },
    },
    'subei-refugee': {
      publicGroup: '难民登记与救济互助点', publicRole: '抄寻人名单、登记药粮并向新来的人说明落脚条件',
      covertRole: '替失散者和救济点转送不含猜测的平安口信', infiltrationRole: '以短工和难民登记帮手身份接近关卡与运输机构',
      contact: { id: 'public_qiu_shuren', label: '邱淑仁', role: '在救济点登记姓名、药粮与最后地址', status: 'traveling', relation: 17, born: 1904 },
    },
    'shen-scholar': {
      publicGroup: '学生读书会与公开讲习小组', publicRole: '整理讲义、联系教室并记录被停课学生的去向',
      covertRole: '借教书和稿件往来承担联络、转送与确认地址', infiltrationRole: '以教师或校对身份进入学校、报馆或行政机构维持隐蔽身份',
      contact: { id: 'public_zhou_hengyi', label: '周衡一', role: '组织读书会、同时靠校对稿件谋生的青年教师', status: 'colleague', relation: 17, born: 1900 },
    },
    'shen-newwoman': {
      publicGroup: '女学、妇女识字与救济小组', publicRole: '安排课程、核对住处并帮助女工与女学生写信',
      covertRole: '借女学和救济往来确认人员住处与平安消息', infiltrationRole: '以教员或社会服务人员身份进入学校和地方机构维持隐蔽身份',
      contact: { id: 'public_lin_yuying', label: '林毓英', role: '女学教员，负责学员住处与救济登记', status: 'colleague', relation: 18, born: 1902 },
    },
    'shen-refugee': {
      publicGroup: '流亡学校与后方救济网络', publicRole: '保管学生名册、安排临时课堂并核对失散家长消息',
      covertRole: '沿学校迁移线路转送已核实的人员与住处消息', infiltrationRole: '以流亡教师或登记员身份接触运输与地方救济机构',
      contact: { id: 'public_gu_mingxiu', label: '顾明秀', role: '随学校迁移、保管学生与住处名册的教师', status: 'traveling', relation: 17, born: 1901 },
    },
    'shen-professional': {
      publicGroup: '诊所、妇幼与伤病救济小组', publicRole: '登记病人、分清欠费与救济并安排超出能力的转诊',
      covertRole: '借出诊和转诊核对伤病者身份与下一处接应', infiltrationRole: '以医护或药房人员身份进入医院、机关或运输节点维持隐蔽身份',
      contact: { id: 'public_du_qiulan', label: '杜秋兰', role: '在诊所与救济点之间核对药品和病人去向的护士', status: 'colleague', relation: 19, born: 1903 },
    },
    'shanghai-heir': {
      publicGroup: '工友夜校、同业与救济筹款网络', publicRole: '提供场地、核对工钱与救济账，并让工友自己决定是否参加',
      covertRole: '借商号、货栈与账房往来确认人员和物资是否抵达', infiltrationRole: '以商号经理和同业往来身份进入货栈、商会或行政关系网',
      contact: { id: 'public_chen_jingzhi', label: '陈敬之', role: '替工友夜校找场地、也在商号做会计', status: 'nearby', relation: 15, born: 1897 },
    },
    'shanghai-newwoman': {
      publicGroup: '妇女职业、识字与城市救济网络', publicRole: '提供课程和工作场地，核对委托、学费与救济名单',
      covertRole: '借工作室和女学往来确认住处、伤病与转移消息', infiltrationRole: '以工作室主理人或教员身份进入学校、商号与社会服务机构',
      contact: { id: 'public_xia_ruolan', label: '夏若兰', role: '妇女职业互助会干事，自己也靠缝纫收入生活', status: 'colleague', relation: 18, born: 1902 },
    },
    'shanghai-professional': {
      publicGroup: '技术职员读书会与同行互助组', publicRole: '整理技术资料、核对工时并替同行说明停工与欠薪',
      covertRole: '借图纸、维修和单位往来确认人员与机构近况', infiltrationRole: '以制图、报务或技术职员身份进入目标单位维持隐蔽身份',
      contact: { id: 'public_wen_qiming', label: '温启明', role: '机器行技术员，也组织同行读书和互助', status: 'coworker', relation: 16, born: 1899 },
    },
  };

  C.actions.push(
    {
      id: 'public-association-work', name: '参加眼前的公开社团事务', minYear: 1925, maxYear: 1949, minAge: 15, spirit: 3,
      publicStatuses: ['public-participant', 'peripheral-helper', 'applicant', 'member', 'nonparty-helper'],
      publicEffect: { trustDelta: 3, exposureDelta: 2, roleFromRoute: 'publicRole', historyText: '继续承担公开社团中的具体事务。' },
      delta: { network: 2, mind: 2, health: -1 }, note: '会写清社团、联系人和本年实际事务；参加公共活动不等于自动加入任何党派。',
    },
    {
      id: 'organization-routine', name: '完成已经答应的组织事务', minYear: 1930, maxYear: 1949, minAge: 18, spirit: 3,
      publicStatuses: ['member', 'secret-worker', 'infiltration'], publicEffect: { trustDelta: 4, exposureDelta: 3, historyText: '完成一次已经答应、且与当前身份相符的组织事务。' },
      delta: { mind: 2, network: 1, health: -1 }, note: '不会只增加“忠诚值”；它会留下做了什么、谁知道、公开身份是否受到影响。',
    },
    {
      id: 'covert-liaison', name: '核对一次秘密联络是否仍然安全', minYear: 1937, maxYear: 1949, minAge: 20, spirit: 4,
      publicStatuses: ['secret-worker', 'infiltration'], publicSecrecy: ['secret'],
      publicEffect: { trustDelta: 3, exposureDelta: 6, roleFromRoute: 'covertRole', historyText: '核对了一次联络；没有出现的人仍记作失联，不能补写成死亡或被捕。' },
      delta: { mind: 3, health: -2, relation: -1 }, note: '风险会提高；结果只确认消息是否抵达，不展示可复制的秘密操作细节。',
    },
    {
      id: 'protect-family-boundary', name: '与家人谈清政治活动的风险边界', minYear: 1925, maxYear: 1955, minAge: 18, spirit: 2,
      publicStatuses: ['public-participant', 'peripheral-helper', 'applicant', 'member', 'nonparty-helper', 'secret-worker', 'infiltration', 'inactive', 'coerced-cooperation'],
      publicEffect: { familyKnowledge: 'partial', exposureDelta: -2, historyText: '向家人说明了风险范围和紧急联系办法，没有要求家人替自己承担任务。' },
      delta: { relation: 2, mind: 2 }, note: '家人只知道需要知道的风险，并保留自己的住处、工作和去留决定。',
    },
    {
      id: 'verify-public-contact', name: '核对一名旧联系人最后的可靠消息', minYear: 1937, minAge: 20, spirit: 3,
      publicStatuses: ['peripheral-helper', 'applicant', 'member', 'nonparty-helper', 'secret-worker', 'infiltration', 'inactive', 'withdrawn', 'coerced-cooperation'],
      publicEffect: { trustDelta: 1, exposureDelta: -1, historyText: '通过两条现有关系核对旧联系人最后消息；无法交叉确认的部分继续保留未知。' },
      delta: { mind: 3, network: 1 }, note: '只更新可以确认的时间、地点和消息来源，不把猜测写成事实。',
    },
    {
      id: 'record-public-past', name: '整理能够确认的公共经历', minYear: 1950, minAge: 40, spirit: 2,
      publicStatuses: ['public-participant', 'peripheral-helper', 'applicant', 'member', 'nonparty-helper', 'secret-worker', 'infiltration', 'inactive', 'withdrawn', 'coerced-cooperation'],
      publicEffect: { familyKnowledge: 'full', exposureDelta: -1, historyText: '整理了能够确认的组织经历、公开活动和未知部分，没有替失联者补写真相。' },
      delta: { mind: 3, relation: 1 }, note: '晚年记录会区分亲历、后来确认、他人指控和仍然未知。',
    }
  );

  C.decisions.push(
    {
      id: 'public-life-contact', year: 1925, title: '街面、厂门或学校里出现了公共行动',
      prompt: '五卅运动前后，罢工、学生请愿、商人停市与救济筹款同时进入许多人的生活。你没有资格替任何组织或身边人作决定，只能决定自己是否走近一项具体的公开事务。',
      options: [
        { id: 'join-open-public-work', label: '我跟着熟人参加一次公开活动，并先承担可以说明白的事务', echo: 'public:open-contact', publicEffect: { status: 'public-participant', organizationKey: 'nonparty', secrecy: 'open', familyKnowledge: 'partial', trustDelta: 12, exposureDelta: 8, addRouteContact: true, roleFromRoute: 'publicRole', historyText: '通过具体熟人第一次参加公开公共活动。' }, delta: { network: 3, mind: 3, health: -1 }, fact: '1925 年通过具体熟人参加公开公共活动，尚未加入任何政治党派。', endingFact: true },
        { id: 'help-practical-public-work', label: '我只接一件救济、识字、登记或核账的具体事务', echo: 'public:practical-contact', publicEffect: { status: 'peripheral-helper', organizationKey: 'nonparty', secrecy: 'open', familyKnowledge: 'partial', trustDelta: 8, exposureDelta: 3, addRouteContact: true, roleFromRoute: 'publicRole', historyText: '从外围承担一项有明确对象和交付结果的公共事务。' }, delta: { craft: 2, network: 2, relation: 1 }, fact: '1925 年开始从外围承担具体公共事务，但没有加入政治党派。', endingFact: true },
        { id: 'keep-public-distance', label: '我说明家计和工作接不住这项责任，暂时保持距离', echo: 'public:distance', publicEffect: { status: 'unaffiliated', organizationKey: null, secrecy: 'open', familyKnowledge: 'none', historyText: '因家计、工作或风险选择暂不参加；这不是失败结局。' }, delta: { relation: 1, health: 1, mind: 2 }, fact: '1925 年没有参加眼前的公共组织活动，继续以家计和工作为先。', endingFact: true },
      ],
    },
    {
      id: 'political-organization-application', year: 1928, publicStatuses: ['public-participant', 'peripheral-helper'], title: '公共事务之后，要不要申请加入政治组织',
      prompt: '几年的公开事务让你认识了具体的人，也看见组织内部有介绍、观察和责任。加入不是读到一张传单后的即时升级；申请以后仍要等待答复，并承担身份暴露、工作与家人的现实后果。',
      options: [
        { id: 'apply-ccp', label: '我请认识的成员说明条件，申请加入中国共产党并等待组织答复', echo: 'public:apply-ccp', publicEffect: { status: 'applicant', organizationKey: null, pendingOrganizationKey: 'ccp', secrecy: 'limited', familyKnowledge: 'partial', trustDelta: 10, exposureDelta: 8, historyText: '经具体成员介绍申请加入中国共产党，尚未被写成已经入党。' }, delta: { mind: 3, network: 1, relation: -1 }, fact: '1928 年经介绍申请加入中国共产党，申请与正式接收被分开记录。', endingFact: true },
        { id: 'apply-kmt', label: '我通过学校、行业或地方关系申请加入中国国民党地方组织', echo: 'public:apply-kmt', publicEffect: { status: 'applicant', organizationKey: null, pendingOrganizationKey: 'kmt', secrecy: 'open', familyKnowledge: 'partial', trustDelta: 9, exposureDelta: 10, historyText: '通过公开关系申请加入中国国民党地方组织，尚未把申请写成成员身份。' }, delta: { network: 2, position: 1, mind: 2 }, fact: '1928 年通过公开关系申请加入中国国民党地方组织，等待明确答复。', endingFact: true },
        { id: 'remain-nonparty-helper', label: '我继续做具体公共事务，但不申请加入任何党派', echo: 'public:nonparty', publicEffect: { status: 'nonparty-helper', organizationKey: 'nonparty', pendingOrganizationKey: null, secrecy: 'open', familyKnowledge: 'full', trustDelta: 6, exposureDelta: 2, historyText: '明确保留无党派身份，继续承担公共事务。' }, delta: { craft: 2, network: 2, mind: 3 }, fact: '1928 年决定保持无党派身份，继续承担公开公共事务。', endingFact: true },
        { id: 'withdraw-before-joining', label: '我退出这批活动，把原因和未完成事务当面交代清楚', echo: 'public:withdrawn', publicEffect: { status: 'withdrawn', organizationKey: null, pendingOrganizationKey: null, secrecy: 'open', trustDelta: -4, exposureDelta: -3, historyText: '在加入任何党派前退出，并交代了已经答应的事务。' }, delta: { health: 2, relation: -1, mind: 2 }, fact: '1928 年在加入任何政治党派前退出公共活动。', endingFact: true },
      ],
    },
    {
      id: 'political-organization-answer', year: 1930, publicStatuses: ['applicant'], title: '申请终于得到答复',
      prompt: '介绍人带来组织答复，并再次说明日常责任与暴露风险。你仍可以接受、继续做外围事务，或在正式接收前退出；系统只记录你实际作出的选择。',
      options: [
        { id: 'accept-membership', label: '我接受答复，成为该组织成员并承担经常事务', echo: 'public:member', publicEffect: { status: 'member', organizationFromPending: true, pendingOrganizationKey: null, trustDelta: 15, exposureDelta: 5, roleFromRoute: 'publicRole', historyText: '申请得到答复后成为组织成员，开始承担经常事务。' }, delta: { mind: 3, network: 2, health: -1 }, fact: '1930 年申请得到答复，正式成为所申请政治组织的成员。', endingFact: true },
        { id: 'continue-peripheral-after-answer', label: '我说明目前接不住成员责任，继续只做外围事务', echo: 'public:remain-peripheral', publicEffect: { status: 'peripheral-helper', organizationKey: 'nonparty', pendingOrganizationKey: null, secrecy: 'open', trustDelta: 3, exposureDelta: -2, historyText: '没有接受成员身份，继续只承担外围事务。' }, delta: { craft: 2, relation: 1, mind: 2 }, fact: '1930 年没有接受成员身份，继续承担外围公共事务。', endingFact: true },
        { id: 'decline-membership', label: '我拒绝这次接收，并把已经掌握的联系边界说清', echo: 'public:declined', publicEffect: { status: 'withdrawn', organizationKey: null, pendingOrganizationKey: null, secrecy: 'limited', trustDelta: -5, exposureDelta: -4, historyText: '在正式接收时拒绝加入，并结束原有联系。' }, delta: { mind: 3, relation: -1, health: 1 }, fact: '1930 年拒绝加入所申请的政治组织，并结束原有组织联系。', endingFact: true },
      ],
    },
    {
      id: 'wartime-public-role', year: 1937, publicStatuses: ['public-participant', 'peripheral-helper', 'member', 'nonparty-helper'], title: '战争扩大后，公共身份要怎样继续',
      prompt: '战争使救济、宣传、交通、医护和情报同时变得紧迫。公开服务、秘密联络和以职业维持隐蔽身份不是同一件事；每一项都会改变家人知道多少、工作是否还能继续以及身份暴露程度。',
      options: [
        { id: 'wartime-open-service', label: '我继续公开救济、教育、医护或工友互助，不承担秘密身份', echo: 'public:wartime-open', publicEffect: { status: 'public-participant', secrecy: 'open', familyKnowledge: 'full', trustDelta: 7, exposureDelta: 6, roleFromRoute: 'publicRole', historyText: '战争时期继续承担公开公共服务，没有把它写成秘密工作。' }, delta: { network: 3, relation: 2, health: -2 }, fact: '1937 年以后继续从事公开救济、教育、医护或互助工作。', endingFact: true },
        { id: 'wartime-secret-liaison', label: '我接受秘密联络与交通工作，同时保留原来的公开职业', echo: 'public:secret-work', publicEffect: { status: 'secret-worker', secrecy: 'secret', familyKnowledge: 'partial', trustDelta: 15, exposureDelta: 18, roleFromRoute: 'covertRole', coverFromCareer: true, historyText: '在公开职业之外承担秘密联络与交通工作。' }, delta: { mind: 4, health: -3, relation: -2 }, fact: '1937 年以后在原有职业之外承担秘密联络与交通工作。', endingFact: true },
        { id: 'wartime-infiltration', label: '我以现有职业进入一个机构维持隐蔽身份，承担内部联络', echo: 'public:infiltration', publicEffect: { status: 'infiltration', secrecy: 'secret', familyKnowledge: 'partial', trustDelta: 18, exposureDelta: 24, roleFromRoute: 'infiltrationRole', coverFromCareer: true, historyText: '以公开职业进入相关机构，维持隐蔽身份并承担内部联络。' }, delta: { mind: 5, health: -4, relation: -3, position: -2 }, fact: '1937 年以后以公开职业维持隐蔽身份，承担内部联络；具体机构与经历属于合成叙事。', endingFact: true },
        { id: 'wartime-reduce-public-work', label: '我交接现有事务，把主要精力转回生计和家人', echo: 'public:wartime-inactive', publicEffect: { status: 'inactive', secrecy: 'limited', familyKnowledge: 'full', trustDelta: -3, exposureDelta: -6, historyText: '战争扩大后交接公共事务，把主要精力转回生计和家人。' }, delta: { health: 2, relation: 3, network: -1 }, fact: '1937 年战争扩大后中断政治与公共活动，转回生计和家人。', endingFact: true },
      ],
    },
    {
      id: 'public-family-boundary', year: 1940, publicStatuses: ['public-participant', 'member', 'nonparty-helper', 'secret-worker', 'infiltration'], title: '家里人究竟应该知道多少',
      prompt: '最近一次迟归或陌生来客已经影响共同生活。你不能把家人当成天然掩护，也不能替他们接受风险；这次谈话只决定你说清多少，以及家人之后怎样独立安排住处和工作。',
      options: [
        { id: 'tell-family-risk-range', label: '我说明身份性质与风险范围，让家人自己决定住处和去留', echo: 'public:family-full', publicEffect: { familyKnowledge: 'full', exposureDelta: 3, trustDelta: 1, historyText: '向家人说明了身份性质与风险范围，家人自行决定住处和去留。' }, delta: { relation: 3, mind: 2, position: -1 }, fact: '1940 年向家人说明政治活动的性质与风险范围，没有要求家人替自己承担任务。', endingFact: true },
        { id: 'tell-family-emergency-only', label: '我不说明具体联系人，只谈紧急时谁去哪里、找谁核实消息', echo: 'public:family-partial', publicEffect: { familyKnowledge: 'partial', exposureDelta: -2, historyText: '只向家人说明紧急安排，没有泄露具体联系人或要求家人代办。' }, delta: { mind: 3, relation: 1 }, fact: '1940 年只与家人谈清紧急安排，具体组织联系人仍未公开。', endingFact: true },
        { id: 'end-secret-work-for-family', label: '我交接秘密事务，停止让共同生活继续承担这层风险', echo: 'public:family-withdraw', publicStatuses: ['secret-worker', 'infiltration'], publicEffect: { status: 'inactive', secrecy: 'limited', familyKnowledge: 'full', trustDelta: -6, exposureDelta: -8, historyText: '因共同生活持续承受风险而交接秘密事务。' }, delta: { relation: 4, health: 2, network: -2 }, fact: '1940 年因家庭与共同生活风险交接并中断秘密工作。', endingFact: true },
      ],
    },
    {
      id: 'public-detention-pressure', year: 1943, publicStatuses: ['secret-worker', 'infiltration'], title: '一次拘留与问话留下了不同程度的事实',
      prompt: '公开身份受到怀疑后，你被带去问话。系统不设置“忠诚值”，也不用“叛徒”替代事实；你要决定自己实际说了什么，身体、家人和其他联系人将分别承担后果。',
      options: [
        { id: 'state-public-identity-only', label: '我只说明公开职业与可核对行程，不确认秘密联系', echo: 'public:pressure-public-only', publicEffect: { status: 'secret-worker', coercionDelta: 22, exposureDelta: 16, trustDelta: 3, historyText: '拘留中只说明公开职业与可核对行程，没有确认秘密联系。' }, delta: { health: -6, mind: 3, position: -2 }, fact: '1943 年一次拘留中只说明公开职业与可核对行程，没有确认秘密联系。', endingFact: true },
        { id: 'admit-own-role-no-names', label: '我承认自己承担过联络，但不提供其他人的姓名和住址', echo: 'public:pressure-own-role', publicEffect: { status: 'inactive', coercionDelta: 30, exposureDelta: 28, trustDelta: -8, familyKnowledge: 'full', historyText: '拘留中承认自己的联络活动，但没有提供其他人的姓名和住址；此后活动中断。' }, delta: { health: -4, mind: 2, relation: -2, position: -3 }, fact: '1943 年一次拘留中承认自己的联络活动，但没有提供其他人的姓名和住址；此后活动中断。', endingFact: true },
        { id: 'provide-address-under-pressure', label: '我在压力下提供一个曾经使用的地址，并接受以后协助辨认的条件', echo: 'public:pressure-address', publicEffect: { status: 'coerced-cooperation', coercionDelta: 45, exposureDelta: 40, trustDelta: -35, familyKnowledge: 'full', historyText: '拘留中提供一个曾使用的地址，并接受以后协助辨认的条件；地址带来的具体后果仍需后来确认。' }, delta: { health: -2, mind: -4, relation: -5, position: -4 }, fact: '1943 年一次拘留中在压力下提供了一个曾使用的地址，并接受以后协助辨认的条件；由此造成的具体后果当时尚未完全确认。', endingFact: true },
      ],
    },
    {
      id: 'public-past-after-1949', year: 1951, publicStatuses: ['public-participant', 'peripheral-helper', 'applicant', 'member', 'nonparty-helper', 'secret-worker', 'infiltration', 'inactive', 'withdrawn', 'coerced-cooperation'], title: '新落点怎样处理过去的政治经历',
      prompt: '1949 年后的实际地域已经不同，旧组织关系、公开履历、被捕记录和他人指控不会得到同一种处理。你只能说明自己能够确认的经历；不同落点如何回应，要继续留在地域与时代记录中。',
      options: [
        { id: 'state-confirmed-public-past', label: '我逐项说明能够确认的组织经历，把未知和他人指控分开', echo: 'public:post1949-disclosed', publicEffect: { familyKnowledge: 'full', secrecy: 'open', exposureDelta: 8, historyText: '在新落点逐项说明能够确认的政治经历，并把未知与他人指控分开。' }, delta: { mind: 3, position: -1 }, fact: '1951 年在新落点说明能够确认的政治经历，未知与他人指控没有被写成事实。', endingFact: true },
        { id: 'verify-before-stating-past', label: '我先通过旧信和仍在联系的人核对，再说明有来源的部分', echo: 'public:post1949-verified', publicEffect: { secrecy: 'limited', exposureDelta: -2, trustDelta: 1, historyText: '先核对旧信与联系人，再说明有来源支持的政治经历。' }, delta: { knowledge: 2, mind: 3, network: 1 }, fact: '1951 年先核对旧信与联系人，再说明有来源支持的政治经历。', endingFact: true },
        { id: 'end-political-activity-keep-record', label: '我停止继续参加政治活动，只保留个人记录和仍然未知的名单', echo: 'public:post1949-withdrawn', publicEffect: { status: 'withdrawn', secrecy: 'limited', exposureDelta: -5, historyText: '停止继续参加政治活动，只保留个人记录与未知边界。' }, delta: { health: 1, relation: 2, mind: 2 }, fact: '1951 年停止继续参加政治活动，保留了能够确认的个人记录。', endingFact: true },
      ],
    }
  );

  var publicScenes = [
    { id: 'public-open-meeting', title: '第一次把名字写在公开名单上', minYear: 1925, maxYear: 1927, requiresEchoes: ['public:open-contact'], text: '何玉贞一类的具体联系人先把活动时间、地点和要做的事务说清。你只在公开名单上写下自己愿意承担的一项工作，没有把一次到场写成已经加入政治组织；回家后还得解释为何少做了半日工。', delta: { mind: 1, network: 1 } },
    { id: 'public-practical-ledger', title: '救济名单上有一个重复名字', minYear: 1925, maxYear: 1927, requiresEchoes: ['public:practical-contact'], text: '登记时发现同一个名字出现两次。你没有立刻说有人冒领，而是请联系人分别核对住处与家口，最后确认是一对同名的人；粮食照实分开，名单旁也留下核对方式。', delta: { craft: 1, mind: 1 } },
    { id: 'public-distance-aftermath', title: '没有参加，也仍然听见后续消息', minYear: 1925, maxYear: 1927, requiresEchoes: ['public:distance'], text: '你没有参加眼前的活动，工作和家计因此没有立刻中断。几天后熟人来说明谁受伤、谁回去上工；你只把听见的事实记下来，没有把保持距离写成冷漠或失败。', delta: { mind: 1 } },
    { id: 'public-ccp-application-wait', title: '申请之后仍然只是等待', minYear: 1928, maxYear: 1929, requiresEchoes: ['public:apply-ccp'], text: '介绍人没有给你一个立刻生效的身份，只问了工作、家人和此前承担的事务，又说明答复不会在公开场合送来。你继续原有职业，也开始明白申请与正式成为成员是两件事。', delta: { mind: 2 } },
    { id: 'public-kmt-application-wait', title: '地方组织先核对公开履历', minYear: 1928, maxYear: 1929, requiresEchoes: ['public:apply-kmt'], text: '负责登记的人先核对学校、行业或地方介绍关系，又问你能否承担公开会议和日常事务。你递交申请后仍照常做工；名册是否接收、谁负责联系，都没有被一句“加入”跳过去。', delta: { network: 1, mind: 1 } },
    { id: 'public-nonparty-work', title: '不入党仍然要把事务做完', minYear: 1928, maxYear: 1936, requiresEchoes: ['public:nonparty'], text: '你拒绝把公共工作等同于某个党派身份，却仍要核对场地、欠费、救济或参与者去向。有人试着替你贴上立场标签，你只说明自己实际答应了什么、没有答应什么。', delta: { craft: 1, mind: 2 } },
    { id: 'public-withdraw-before-membership', title: '退出以后先把借来的名册交还', minYear: 1928, maxYear: 1930, requiresEchoes: ['public:withdrawn'], text: '你在加入任何党派以前退出，先把借来的名册和未结清的事务交还。熟人没有因此立刻消失，却也不再把新的名单交给你；往后记录的是关系怎样变远，而不是给退出行为判胜负。', delta: { mind: 1, network: -1 } },
    { id: 'public-member-routine', title: '成员身份没有替你免掉日常工作', minYear: 1930, maxYear: 1936, requiresEchoes: ['public:member'], text: '得到正式答复以后，第一件事仍是完成此前没有做完的登记、教学、工友或行业事务。组织身份没有替你挣工钱、照顾父母或解决房租，反而要求你把时间和风险重新排进日常。', delta: { mind: 2, health: -1 } },
    { id: 'public-remain-peripheral-after-answer', title: '没有接受成员身份，答应的外围事务仍要交付', minYear: 1930, maxYear: 1934, requiresEchoes: ['public:remain-peripheral'], text: '你没有接受成员身份，介绍人仍来核对已经答应的识字、登记或救济事务。双方把能够继续做的部分重新写清，此后不再以成员纪律要求你；工作、家计和联系边界分别保留。', delta: { craft: 1, mind: 1 } },
    { id: 'public-declined-membership-aftermath', title: '拒绝接收以后，联系逐步结束', minYear: 1930, maxYear: 1934, requiresEchoes: ['public:declined'], text: '你在正式接收时拒绝加入，并与介绍人逐项交代哪些地址和事务已经停止使用。对方没有替你作道德结论；往后能确认的只是来往减少、原有公共工作中断，以及你重新安排生计。', delta: { health: 1, network: -1 } },
    { id: 'public-open-war-service', title: '公开救济点先问能接住多少人', minYear: 1937, maxYear: 1944, requiresEchoes: ['public:wartime-open'], text: '战事扩大后，救济点的人比物资增长得更快。你与同事先写清药、粮、住处和转介条件，再告诉排在后面的人哪些今天办不到；公开服务会被看见，也会带来工作停顿和家人担心。', delta: { relation: 1, health: -1 } },
    { id: 'public-secret-missed-contact', title: '联络人没有按约出现', minYear: 1938, maxYear: 1942, requiresEchoes: ['public:secret-work'], text: '约定时间过去后，联系人没有出现。你没有继续等到公开身份变得可疑，只按事先说清的边界回到工作；账本只记“本次未接上”，没有把对方补写成被捕、死亡或转向。', delta: { mind: 2, position: -1 } },
    { id: 'public-infiltration-cover-job', title: '公开职业必须真的做得下去', minYear: 1938, maxYear: 1942, requiresEchoes: ['public:infiltration'], text: '隐蔽身份不能只靠一个假称呼。老板要求你补完本职工作的差错，同事又追问迟到原因；你先把公开职责做完，内部消息只记到能够确认的范围，家庭时间却因此再次被挤掉。', delta: { craft: 1, health: -2, relation: -1 } },
    { id: 'public-wartime-inactive-aftermath', title: '交接公共事务以后，生活没有立刻恢复原样', minYear: 1937, maxYear: 1941, requiresEchoes: ['public:wartime-inactive'], text: '你把现有事务交给能够接手的人，重新把时间放回工资、住处和家人。旧联系人偶尔仍来核对消息，但不再默认你会承担任务；家庭压力有所缓解，先前留下的公开身份却不会从别人的记忆里消失。', delta: { relation: 1, health: 1 } },
    { id: 'public-family-full-aftermath', title: '家人知道以后没有自动同意', minYear: 1940, maxYear: 1942, requiresEchoes: ['public:family-full'], text: '家人听完风险后没有立刻支持或反对，而是先问住处、工作和孩子怎么办。你们把能够各自决定的部分分开：是否搬走、是否继续工作、出了事找谁核实，都由当事人自己答复。', delta: { relation: 1, mind: 1 } },
    { id: 'public-family-partial-aftermath', title: '一张只写紧急地址的纸', minYear: 1940, maxYear: 1942, requiresEchoes: ['public:family-partial'], text: '家人只知道发生危险时到哪里核实消息，不知道具体联系人和任务。他们接受的是自己的应对安排，不是替你保管秘密工作的责任；纸上的地址后来又因住处变化被重新核对。', delta: { mind: 1 } },
    { id: 'public-family-withdraw-aftermath', title: '交接秘密事务以后，家人重新安排共同生活', minYear: 1940, maxYear: 1943, requiresEchoes: ['public:family-withdraw'], text: '你交接秘密事务后，家人没有把一切当作已经过去。他们先确认住处是否还安全、工作能否继续、旧联系人该怎样拒绝；共同生活逐渐恢复，但活动中断与关系变化都被保留在账本里。', delta: { relation: 2, health: 1 } },
    { id: 'public-pressure-public-only-echo', title: '释放以后，公开职业已经留下缺口', minYear: 1943, maxYear: 1945, requiresEchoes: ['public:pressure-public-only'], text: '问话时没有确认秘密联系，不代表生活没有后果。回到工作地点后，老板追问缺勤，同事知道你被带走过，家人也要求重新讨论住处；身体留下的伤与身份暴露分别进入记录。', delta: { health: -2, position: -1 } },
    { id: 'public-pressure-own-role-echo', title: '活动中断以后，旧联系人没有自动安全', minYear: 1943, maxYear: 1946, requiresEchoes: ['public:pressure-own-role'], text: '你承认自己的联络活动后没有提供其他姓名，但原有联系仍被迫中断。旧联系人是否及时转移不能由你代替确认；家里只知道你暂时不再外出，工作也需要重新解释空缺。', delta: { mind: 2, network: -1 } },
    { id: 'public-pressure-address-echo', title: '一个地址造成了什么，后来才逐项确认', minYear: 1943, maxYear: 1947, requiresEchoes: ['public:pressure-address'], text: '你在压力下说出的旧地址并没有立刻生成一个全知结局。后来只能确认房东受到询问、一名常去的人提前离开；另一名联系人的去向仍然未知，不能用“出卖了所有人”或“没有造成后果”代替事实。', delta: { mind: -1, relation: -2 } },
    { id: 'public-post1949-record-echo', title: '不同落点对同一段履历有不同问题', minYear: 1951, maxYear: 1956, requiresAnyEchoes: ['public:post1949-disclosed', 'public:post1949-verified', 'public:post1949-withdrawn'], text: '新落点的登记人员、雇主、邻居和旧联系人分别关心不同部分：有人只问工作年资，有人追问组织关系，也有人只想知道某位失联者是否还活着。你把亲历、后来确认和他人指控分栏记录，没有让一句身份标签吞掉一生。', delta: { mind: 2 } },
  ];
  publicScenes.forEach(function (scene) { C.ordinaryEvents.push(scene); });

  function source(label, url) { return { label: label, url: url }; }

  C.events.push(
    {
      id: 'may-fourth-1919', year: 1919, eraBrief: true, eraScope: '全国学生、工人和商界', title: '五四运动扩展到多地',
      knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'], knownText: '你从报刊、学校或街谈中知道北京学生游行后，罢课、罢工和罢市扩展到多座城市；当时你仍是孩子，只能从大人的争论与生计变化理解它。',
      unknownText: '大人突然更常谈论学生、罢市和外国人的会议，但年幼的你只看见学堂、铺面或工钱受到影响。', fact: '1919 年五四运动及其扩展进入社会生活；主人公当时年幼，没有被写成运动领导者。',
      historySource: source('中华人民共和国外交部：1919 年五四运动', 'https://www.fmprc.gov.cn/ziliao_674904/historytoday_674971/200305/t20030504_9284558.shtml'),
    },
    {
      id: 'ccp-founding-1921', year: 1921, eraBrief: true, eraScope: '上海、嘉兴与早期政治组织', title: '中国共产党成立',
      knownThrough: ['newspaper', 'books'], knownText: '你从有限的报刊或学校消息中知道上海出现了新的政治组织，但当时只有十一至十三岁，也不在筹建者名单中；这不是可以让主角硬插进去的“建党机会”。',
      unknownText: '这次规模很小的会议没有直接改变你当年的家计；多年后你才可能知道它在上海与嘉兴发生。', fact: '1921 年中国共产党成立；主人公当时只有十一至十三岁，没有参与建党。',
      historySource: source('共产党员网：中国共产党第一次全国代表大会', 'https://www.12371.cn/special/lcddh/ddh1/'),
    },
    {
      id: 'first-united-front-1924', year: 1924, eraBrief: true, eraScope: '全国政治组织与群众运动', title: '国民党一大与第一次国共合作',
      knownThrough: ['newspaper', 'books', 'conversation'], knownText: '你知道国民党完成改组，国共合作进入公开政治与群众运动；这让学校、工会、农会和地方组织出现新的接触渠道，也带来后来分裂时的复杂身份。',
      unknownText: '地方社团、学校和行业组织忽然出现更多新的名称与来人，但你还不知道这些变化与广州会议的关系。', fact: '1924 年国民党一大召开，第一次国共合作正式形成。',
      historySource: source('中国国家博物馆：国民党一大委员会名单', 'https://www.chnmuseum.cn/zp/zpml/gmww/202209/t20220907_257288.shtml'),
    },
    {
      id: 'political-split-1927', year: 1927, eraBrief: true, eraScope: '上海及多地政治组织', title: '国共合作破裂与大规模搜捕',
      knownThrough: ['newspaper', 'books', 'conversation'], knownText: '你知道国共合作破裂，上海及多地发生针对共产党人和相关群众的搜捕与杀害；公开社团、介绍关系和党员身份的风险随之改变。',
      unknownText: '熟悉的社团停止开门，有人突然不再来上工或上课；你先看到人消失和名单收紧，之后才可能知道政治分裂的名称。', fact: '1927 年国共合作破裂，政治组织与公开活动的风险发生结构性变化。',
      historySource: source('中央党史和文献研究院：入党介绍制度的历史变化', 'https://www.dswxyjy.org.cn/n1/2022/0228/c244516-32361263.html'),
    },
    {
      id: 'mukden-incident-1931', year: 1931, eraBrief: true, eraScope: '东北与全国', title: '九一八事变与东北局势突变',
      knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'], knownText: '你知道日军侵占东北后，流亡学生、难民、军人和救亡团体陆续进入关内；报刊消息、募捐和对日政策争论也进入城市与学校。',
      unknownText: '外地来的人突然增多，募捐与寻人名单出现在街面；你先接触到流亡者的住处和生计，未必立刻知道战事全貌。', fact: '1931 年九一八事变后，东北流亡、救亡活动与全国政治讨论扩大。',
      historySource: source('中国政府网：中国近代史概况', 'https://www.gov.cn/guoqing/2021-04/09/content_5555766.htm'),
    },
    {
      id: 'december-ninth-1935', year: 1935, eraBrief: true, eraScope: '北平学生与全国救亡网络', title: '一二·九学生运动',
      knownThrough: ['newspaper', 'books', 'conversation'], knownText: '你知道北平学生因华北局势上街请愿，消息随后通过学校、报刊和同乡网络扩散；是否参与仍取决于角色所在地域、关系与当时能承担的风险。',
      unknownText: '学校和街面开始讨论“华北还能不能放下一张书桌”，但你只从停课、募捐和来信中感到局势逼近。', fact: '1935 年一二·九运动发生，学生救亡活动扩展；个人是否参与由现实条件决定。',
      historySource: source('共产党员网：一二九抗日爱国学生运动', 'https://www.12371.cn/2021/05/31/VIDE1622445721193360.shtml'),
    },
    {
      id: 'xian-incident-1936', year: 1936, eraBrief: true, eraScope: '西安与全国抗日局势', title: '西安事变',
      knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'], knownText: '你从报刊或口风中知道张学良、杨虎城在西安扣留蒋介石，停止内战、一致抗日成为全国关注的问题；不同政治组织和普通人的判断并不因此自动相同。',
      unknownText: '报纸忽然更难买到，街谈都在说西安出了大事；你先感到部队、交通和政治口风变化，完整经过后来才逐步知道。', fact: '1936 年西安事变发生，全国抗日与政治合作问题进入新的阶段。',
      historySource: source('中国国家博物馆：张学良手令', 'https://www.chnmuseum.cn/zp/zpml/gmww/202112/t20211207_252694.shtml'),
    },
    {
      id: 'shanghai-underground-traffic-1947', year: 1947, eraBrief: true, eraScope: '上海学生、工人和秘密交通网络', title: '城市搜捕与地下交通线',
      knownThrough: ['newspaper', 'books', 'conversation'], routes: ['shen-scholar', 'shen-newwoman', 'shen-professional', 'shanghai-heir', 'shanghai-newwoman', 'shanghai-professional', 'subei-millworker'],
      knownText: '你知道学生和其他公共活动者面临逮捕风险，部分已经暴露的人通过秘密交通线转移；“地下工作”在这里首先是具体的联络、疏散与身份后果，不是结局标签。',
      unknownText: '熟悉的人开始更换住处或突然停工，某些学校与单位的名单被收走；你只知道有人需要离开，无法确认每个人去了哪里。', fact: '1947 年以后上海秘密交通与疏散工作加强，暴露、转移和失联必须分别记录。',
      historySource: source('上海市文史研究馆：上海地下秘密交通线', 'https://wsyjg.sh.gov.cn/detailpage/zzdt-3793.html'),
    }
  );

  var upgrades = {
    'may-thirtieth-1925': { eraBrief: true, eraScope: '上海工人、学生与商界', historySource: source('中共一大纪念馆五卅运动文物史料展', 'https://mzj.sh.gov.cn/lnb-xw/20250401/56f87fc312c94102b0dd3c39ced5f18c.html') },
    'war-1937': { eraBrief: true, eraScope: '全国战争与迁徙', historySource: source('美国国务院历史文献：1937 年中国战事', 'https://history.state.gov/historicaldocuments/frus1937v03/d658') },
    'war-end-1945': { eraBrief: true, eraScope: '中国战区与战后重接', historySource: source('国家档案局：中国战区受降档案', 'https://www.saac.gov.cn/zt/2014-08/26/content_64056.htm') },
  };
  C.events.forEach(function (event) {
    if (upgrades[event.id]) Object.keys(upgrades[event.id]).forEach(function (key) { event[key] = upgrades[event.id][key]; });
    if (['may-fourth-1919', 'ccp-founding-1921', 'first-united-front-1924', 'may-thirtieth-1925', 'political-split-1927', 'mukden-incident-1931', 'december-ninth-1935', 'xian-incident-1936', 'war-1937', 'war-end-1945', 'shanghai-underground-traffic-1947'].indexOf(event.id) >= 0) event.publicLifeEra = true;
  });
})(typeof window !== 'undefined' ? window : globalThis);
