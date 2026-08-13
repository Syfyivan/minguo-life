// 民国人生 · D19／D21／D24 教育文化完整领域包 v0.7.18
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before domain-expansion-education-knowledge.js');

  C.version = '0.7.18';

  var ROUTE_STUDY = 'shen-higher-study';
  var ROUTE_PRESS = 'shen-news-publishing';
  var ROUTE_LIBRARY = 'shen-library-research';
  var ALL_ROUTES = [ROUTE_STUDY, ROUTE_PRESS, ROUTE_LIBRARY];

  Object.assign(C.legacyRouteDomainMap, {
    'shen-higher-study': 'D19',
    'shen-news-publishing': 'D21',
    'shen-library-research': 'D24',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-D19-NJU-COURSES': {
      label: '南京大学校史博物馆：中央大学前期发展与教学工作',
      url: 'https://dawww.nju.edu.cn/xswh/ndxs/zydx/zydxqqfz1/jxgzjgygk.htm',
      supports: ['院系课程、学生刊物和学术团体支持把求学写成课程、考核、刊物与同学关系，而非单一学识数值'],
      status: 'source-reviewed-first-round',
    },
    'SRC-D19-NJU-WOMEN': {
      label: '南京大学：百年前的男女同校与女大学生',
      url: 'https://www.nju.edu.cn/info/3191/178921.htm',
      supports: ['女性进入大学的制度变化及其现实门槛支持男女共享能力体系、但拥有不同入学与住宿处境'],
      status: 'source-reviewed-first-round',
    },
    'SRC-D19-NJU-RETURN': {
      label: '南京大学校友会：1946 年复员前后的国立中央大学',
      url: 'https://alumni.nju.edu.cn/49/d2/c58548a674258/page.htm',
      supports: ['战时与复员前后的课程、考试、学生宿舍和物资困难支持学校迁移与恢复的过程叙事'],
      status: 'source-reviewed-first-round',
    },
    'SRC-D24-NJU-RESEARCH': {
      label: '南京大学校史博物馆：安定、充实、发展',
      url: 'https://historymuseum.nju.edu.cn/xswh/ndxs/zydx/zydxqqfz1/_ad_cs_fz_.htm',
      supports: ['研究项目、经费、课程要求和学生宿舍支持知识工作中的委托、署名、资料与生活成本边界'],
      status: 'source-reviewed-first-round',
    },
    'SRC-D24-NLC-UNION-CATALOG': {
      label: '国家图书馆：馆史沿革',
      url: 'https://www.nlc.cn/web/dsb_footer/gygt/lsyg/index_3.shtml',
      supports: ['1929 年开始的全国图书联合目录工作支持卡片、馆际查询、版本核对和长期编目劳动'],
      status: 'source-reviewed-first-round',
    },
    'SRC-D21-SHANGHAI-PRESS': {
      label: '上海市文化和旅游局：徐家汇藏书楼里的近代报刊与申报',
      url: 'https://whlyj.sh.gov.cn/gqfc/20230209/146ed38ed0df480387008c5639f7247e.html',
      supports: ['长期出版的报纸、新闻、评论、广告与社会生活材料支持新闻出版的多工种与读者回响'],
      status: 'source-reviewed-first-round',
    },
    'SRC-D21-PUBLISHING-MUSEUM': {
      label: '上海市文化和旅游局：中国近现代新闻出版博物馆',
      url: 'https://whlyj.sh.gov.cn/wbzx/20230315/d2ea7eb7c023440e903dfa78288b3632.html',
      supports: ['民国图书、报刊、印刷器物与出版史料支持编辑、校对、印刷、发行和保存分工'],
      status: 'source-reviewed-first-round',
    },
    'SRC-D21-ARCHIVE-PAPERS': {
      label: '国家档案局：广西梧州民国报纸数字化',
      url: 'https://www.saac.gov.cn/daj/c100242/202209/8c6c1c41d7e244d5a3ecbafb79eb5369.shtml',
      supports: ['1928—1949 年地方报纸留存及审查痕迹支持地方新闻、版面变动与出版风险的历史边界'],
      status: 'source-reviewed-first-round',
    },
  });

  Object.assign(C.routes, {
    'shen-higher-study': {
      name: '新学、高等求学与进修', family: 'jiangnanshen',
      summary: '从入学、学费、住宿、课程、考试和研究训练走到毕业、中断或转入具体知识职业；求学是有期限的生活阶段。',
    },
    'shen-news-publishing': {
      name: '采访、编辑、校对与出版', family: 'jiangnanshen',
      summary: '从试稿和校样进入编辑部、印刷所与作者读者网络，逐篇处理来源、署名、稿酬、改稿、勘误、纸张和停刊风险。',
    },
    'shen-library-research': {
      name: '图书馆、编目与研究助理', family: 'jiangnanshen',
      summary: '从卡片和版本核对进入馆藏、阅览、联合目录与研究委托，逐件处理来源、借阅、保存、署名和归还。',
    },
  });

  var shenPath = C.decisions.find(function (item) { return item.id === 'shen-path'; });
  if (shenPath && !shenPath.options.some(function (item) { return item.id === 'higher-study'; })) {
    shenPath.prompt = '沈家能供一段新学，但学费、住处、课程、试做与最后去向都要逐项确认；家门不能替你决定此后把知识用在哪里。';
    shenPath.options.push(
      { id: 'higher-study', label: '报考新学与高等课程，先核学费、住宿和考核', route: ROUTE_STUDY, delta: { knowledge: 5, mind: 3, money: -2 }, channels: ['books'], fact: '1921 年进入有课程、学费、住宿和考核记录的新学与高等求学阶段。' },
      { id: 'news-publishing', label: '从抄稿与校样试做进入报刊出版', route: ROUTE_PRESS, delta: { knowledge: 3, craft: 2, network: 2 }, channels: ['newspaper'], fact: '1921 年通过抄稿和校样试做进入报刊出版工作。' },
      { id: 'library-research', label: '从图书登记与卡片试做进入知识工作', route: ROUTE_LIBRARY, delta: { knowledge: 4, craft: 2, mind: 2 }, channels: ['books'], fact: '1921 年通过图书登记和卡片试做进入图书馆与研究辅助工作。' }
    );
  }

  C.actions.push(
    { id: 'd19-entrance-file', name: '核报名表、旧成绩、推荐、费用与答复日', routes: [ROUTE_STUDY], minAge: 13, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 2, money: -1 }, channels: ['books'], note: '明确缺件和补交日；认识老师不等于录取，报名也不等于已经取得学籍。' },
    { id: 'd19-course-attendance', name: '完成一周具名课程、阅读、实验或讨论', routes: [ROUTE_STUDY], minAge: 13, spirit: 4, careerAction: true, delta: { knowledge: 5, mind: 2, health: -1 }, channels: ['books'], note: '课程、教师、作业、缺席和反馈逐项记录，不用“继续读书”概括一整年。' },
    { id: 'd19-tuition-housing', name: '核学费、膳宿、书本、兼职与下月缺口', routes: [ROUTE_STUDY], minAge: 13, spirit: 3, careerAction: true, delta: { knowledge: 2, money: -2, mind: 2 }, note: '奖助、家款和兼职收入分别记；住宿许可与入学资格也不是同一答复。' },
    { id: 'd19-exam-review', name: '参加一次有范围、监考、成绩与补考的考核', routes: [ROUTE_STUDY], minAge: 14, spirit: 4, careerAction: true, delta: { knowledge: 4, mind: 3, health: -1 }, note: '通过、补考、重修或改方向都有具体结果，失败不抹掉已完成课程。' },
    { id: 'd19-library-notes', name: '到阅览室核版本、页码、出处与借阅期限', routes: [ROUTE_STUDY], minAge: 14, spirit: 3, careerAction: true, delta: { knowledge: 5, craft: 1 }, channels: ['books'], contactEffects: { d19_gu_qingyi: { relation: 1 }, d19_shen_jingwen: { relation: 1 } }, note: '笔记保留出处与未知，借到一本书不等于拥有或可以任意转借。' },
    { id: 'd19-study-correspondence', name: '写一封课程、交换学习或进修询问信', routes: [ROUTE_STUDY], minAge: 15, spirit: 2, careerAction: true, delta: { knowledge: 2, network: 2, mind: 1 }, channels: ['books'], contactEffects: { d19_zhou_yingqiu: { relation: 2 } }, note: '对方可以给条件、拒绝或不回；通信只证明询问与答复，不生成名额。' },
    { id: 'd19-paid-tutoring', name: '为学费做一次有课时和报酬的辅导', routes: [ROUTE_STUDY], minAge: 16, spirit: 4, careerAction: true, delta: { knowledge: 2, money: 2, health: -1 }, contactEffects: { d19_luo_suying: { relation: 1 } }, note: '学生、课时、教材和实收报酬写清；助学劳动不是无限无偿照料。' },
    { id: 'd19-health-absence', name: '因眼痛、发热或失眠请假并补排课程', routes: [ROUTE_STUDY], minAge: 13, spirit: 2, careerAction: true, delta: { health: 2, mind: 2, money: -1 }, contactEffects: { d19_he_peizhen: { relation: 1 } }, note: '症状、请假、诊治、缺课和补交期限分别处理，不用意志力取消身体后果。' },

    { id: 'd21-assignment-brief', name: '核一篇稿子的题目、字数、来源、署名、稿酬与交期', routes: [ROUTE_PRESS], minAge: 13, spirit: 3, careerAction: true, delta: { knowledge: 2, craft: 2, money: 1 }, channels: ['newspaper'], contactEffects: { d21_qin_zhiwen: { relation: 1 } }, note: '口头约稿、采用、刊出和结清稿酬是四次不同答复。' },
    { id: 'd21-interview-verify', name: '采访两名知情人并把相同、冲突和未知分开', routes: [ROUTE_PRESS], minAge: 15, spirit: 4, careerAction: true, delta: { knowledge: 3, network: 2, health: -1 }, channels: ['conversation', 'newspaper'], contactEffects: { d21_lu_yunsheng: { relation: 2 } }, note: '不把单一传闻写成事实，也不替采访对象补写动机。' },
    { id: 'd21-desk-edit', name: '完成一篇稿件的删改、核名、标题与版面说明', routes: [ROUTE_PRESS], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 4, knowledge: 2, mind: 1 }, contactEffects: { d21_tang_manzhen: { relation: 1 } }, note: '作者意见、编辑责任和事实核查分别留下，不让改稿抹掉原署名。' },
    { id: 'd21-proof-print', name: '校一轮日期、人名、数字、铅字与印张', routes: [ROUTE_PRESS], minAge: 13, spirit: 3, careerAction: true, delta: { craft: 4, knowledge: 2, health: -1 }, contactEffects: { d21_wu_deyuan: { relation: 2 } }, note: '校样、改版、印刷和发行各有经手人；发现错字不等于来得及全部更换。' },
    { id: 'd21-payment-ledger', name: '核作者稿酬、工钱、纸张、印费与欠项', routes: [ROUTE_PRESS], minAge: 16, spirit: 3, careerAction: true, delta: { knowledge: 2, money: 2, mind: 2 }, contactEffects: { d21_qin_zhiwen: { relation: 1 }, d21_wu_deyuan: { relation: 1 } }, note: '声望不能代替作者、校对和印工的具名报酬。' },
    { id: 'd21-correction', name: '为已经刊出的错误写勘误并联系受影响的人', routes: [ROUTE_PRESS], minAge: 16, spirit: 3, careerAction: true, delta: { mind: 3, fame: -1, relation: 2 }, contactEffects: { d21_fan_yirong: { relation: 1 } }, note: '说明错在哪里、怎样改和哪些损害不能撤回；勘误不等于事情从未发生。' },
    { id: 'd21-reader-letters', name: '处理三封署名、匿名与地址不全的读者来信', routes: [ROUTE_PRESS], minAge: 15, spirit: 2, careerAction: true, delta: { knowledge: 2, network: 2, mind: 1 }, channels: ['newspaper'], contactEffects: { d21_fan_yirong: { relation: 2 } }, note: '来信可以刊、回、存或拒绝；地址与私人内容不自动公开。' },
    { id: 'd21-preserve-issue', name: '保存一期样报、作者合同、勘误与停印说明', routes: [ROUTE_PRESS], minAge: 15, spirit: 2, careerAction: true, delta: { knowledge: 3, craft: 2 }, channels: ['books'], contactEffects: { d21_chen_yixiu: { relation: 1 } }, note: '保存不是偷带全部档案；样报、合同和私人信件按各自权限处理。' },

    { id: 'd24-accession-provenance', name: '核一批书的赠者、版本、数量、状态与入藏号', routes: [ROUTE_LIBRARY], minAge: 13, spirit: 3, careerAction: true, delta: { knowledge: 3, craft: 3 }, channels: ['books'], contactEffects: { d24_song_qizhang: { relation: 1 } }, note: '赠阅、寄存、购买和借展不是同一种所有关系，来源不明继续标注待核。' },
    { id: 'd24-catalog-cards', name: '写一组作者、题名、版本、主题与索书卡', routes: [ROUTE_LIBRARY], minAge: 13, spirit: 4, careerAction: true, delta: { knowledge: 4, craft: 3, health: -1 }, channels: ['books'], contactEffects: { d24_luo_wenqing: { relation: 2 } }, note: '同名异书、异名同人和缺页本分开记录；抄卡速度不替代版本核对。' },
    { id: 'd24-reader-request', name: '接一份有用途、范围、期限和隐私边界的查书请求', routes: [ROUTE_LIBRARY], minAge: 14, spirit: 3, careerAction: true, delta: { knowledge: 3, network: 2, mind: 1 }, contactEffects: { d24_jiang_suyan: { relation: 2 } }, note: '找到、部分找到、无法提供和需等待各自答复，不暴露别人的借阅记录。' },
    { id: 'd24-research-notes', name: '做一组带页码、异文、疑点与引用人的研究卡', routes: [ROUTE_LIBRARY], minAge: 15, spirit: 4, careerAction: true, delta: { knowledge: 5, mind: 2, health: -1 }, channels: ['books'], contactEffects: { d24_xu_zhenghe: { relation: 1 } }, note: '区分原文、转述和自己的推断；助手劳动必须进入署名或致谢记录。' },
    { id: 'd24-preservation-repair', name: '检查潮湿、虫蛀、缺页并做可逆的基础保护', routes: [ROUTE_LIBRARY], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 4, knowledge: 2, health: -1 }, contactEffects: { d24_he_ruilan: { relation: 2 } }, note: '只做能力范围内的清洁、隔离和包护，珍贵版本不得擅自重装或裁切。' },
    { id: 'd24-union-catalog', name: '给另一馆抄一份版本与馆藏状态查询', routes: [ROUTE_LIBRARY], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 3, network: 2, craft: 2 }, channels: ['books'], contactEffects: { d24_song_qizhang: { relation: 1 } }, note: '馆际卡片只证明某时点的记录；外借、复制与到馆查阅仍需另行答复。' },
    { id: 'd24-commission-terms', name: '核研究委托的范围、经费、资料权限、署名与交付', routes: [ROUTE_LIBRARY], minAge: 18, spirit: 3, careerAction: true, delta: { knowledge: 2, money: 2, mind: 2 }, contactEffects: { d24_xu_zhenghe: { relation: 2 } }, note: '委托方付费不等于取得全部原始资料或可以删去助理署名。' },
    { id: 'd24-reference-session', name: '为一名读者完成一次检索、说明和未找到答复', routes: [ROUTE_LIBRARY], minAge: 15, spirit: 3, careerAction: true, delta: { knowledge: 3, network: 2, mind: 1 }, contactEffects: { d24_jiang_suyan: { relation: 2 } }, note: '知识服务包含“没有找到”与下一步线索，不用假答案维持权威。' }
  );

  var sourceIds = {
    study: ['SRC-D19-NJU-COURSES', 'SRC-D19-NJU-WOMEN', 'SRC-D19-NJU-RETURN', 'SRC-D24-NJU-RESEARCH'],
    press: ['SRC-D21-SHANGHAI-PRESS', 'SRC-D21-PUBLISHING-MUSEUM', 'SRC-D21-ARCHIVE-PAPERS', 'SRC-D19-NJU-COURSES'],
    library: ['SRC-D24-NLC-UNION-CATALOG', 'SRC-D24-NJU-RESEARCH', 'SRC-D19-NJU-RETURN', 'SRC-D21-PUBLISHING-MUSEUM'],
  };

  function choice(id, label, delta, echo, fact, followTitle, followText, extra) {
    return Object.assign({
      id: id, label: label, delta: delta, echo: echo, fact: fact, endingFact: true,
      followup: { title: followTitle, text: followText },
    }, extra || {});
  }

  function installDecision(field, routeKey, item) {
    item.routes = [routeKey];
    item.options.forEach(function (option) {
      var followup = option.followup;
      C.ordinaryEvents.push({
        id: 'echo-' + option.echo.replace(/:/g, '-'), title: followup.title, text: followup.text,
        year: item.followYear, priority: 46, requiresEchoes: [option.echo],
        families: ['jiangnanshen'], routes: option.route && option.route !== routeKey ? undefined : [routeKey],
        sourceIds: sourceIds[field].slice(),
        reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete option.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  var studyDecisions = [
    [1922, '第一学年先接住哪一项门槛', '报名已经通过初核，但学费、膳宿、家款和课程同时压来；男女都有同一学习能力，女性还要得到具名住宿与到课安排。',
      choice('d19-22-fees', '先交最低学费并取得缴费与欠费清单', { money: -3, knowledge: 2, mind: 2 }, 'd19:22:fees', '1922 年取得学费缴付和欠费清单。', '缴费只接住本学期，书本与膳宿仍分开', '收据写明已交部分和补交日；家里没有因此承诺承担全部未来费用。'),
      choice('d19-22-housing', '先核宿舍、亲属寄住或每日通学三种住法', { position: 2, money: -2, mind: 3 }, 'd19:22:housing', '1922 年取得一处有期限的求学住处。', '住处落实，但路程和作息改变课程选择', '女性宿舍床位与晚间出入规则被单独写明；这不是能力限制，却真实占用她的时间。'),
      choice('d19-22-work', '先接有课时的辅导活，减少本学期课程', { money: 2, knowledge: 2, health: -1 }, 'd19:22:work', '1922 年以具名辅导劳动补贴求学。', '学费缺口缩小，一门课延到下学期', '家长按课时付钱，学生不成为主角的附属；延课有记录，没有伪造成按时修完。')],
    [1923, '课程表塞不下时怎样取舍', '必修、语言、实验、写作、通学与家务占用同一周；多选不等于能同时学好。',
      choice('d19-23-foundation', '先补牢语言、数学与基础阅读', { knowledge: 5, mind: 2 }, 'd19:23:foundation', '1923 年优先完成基础课程。', '基础考核通过，专业课推迟一学期', '教师说明补基础不是落后标签；同学各自选择课程，没有被写成竞争数值。'),
      choice('d19-23-practical', '选一门实验、调查或资料整理课', { craft: 3, knowledge: 3, health: -1 }, 'd19:23:practical', '1923 年完成一门有实作记录的课程。', '第一次提交具名调查或实验记录', '工具、样本与资料仍归课程单位；完成作业不自动生成职业资格。'),
      choice('d19-23-writing', '选写作与学生刊物，练事实和署名', { knowledge: 3, fame: 1, network: 2 }, 'd19:23:writing', '1923 年参加学生刊物并保留署名。', '稿件被采用一段，也收到具体退改', '编辑同学说明删改理由；刊出不等于取得报馆岗位或永远拥有版面。')],
    [1924, '一次入级考核没有达到原先预想', '成绩单列出通过、需补考和无法判断的部分；家里只看见一个总分，你知道每门课后果不同。',
      choice('d19-24-resit', '按范围补考，不隐瞒原成绩', { knowledge: 4, mind: 3, health: -1 }, 'd19:24:resit', '1924 年完成一次有原成绩记录的补考。', '补考通过一门，另一门仍需重修', '登记员保留两次成绩和重修期限；失败没有被成绩上涨抹去。'),
      choice('d19-24-change', '承认不合适，调整专业而保留已修课程', { mind: 4, knowledge: 2, position: -1 }, 'd19:24:change', '1924 年在保留已修记录后调整方向。', '新方向承认部分课程，其余重新修读', '转向不是从零重开，旧同学关系也没有自动消失。'),
      choice('d19-24-pause', '休学一学期处理身体与家计，再申请复学', { health: 4, money: 1, knowledge: -1 }, 'd19:24:pause', '1924 年正式办理短期休学。', '身体缓解并取得下一学期复学答复', '请假、退费、住处和复学条件逐项结案；休学不是被系统写成退学。')],
    [1925, '学生团体邀请你承担一项公共事务', '刊物、讲座、互助和政治立场可能相邻，却不是同一身份；你只能承诺公开、可说明的具体工作。',
      choice('d19-25-journal', '只负责公开学生刊物的校对和账目', { craft: 2, network: 2, knowledge: 2 }, 'd19:25:journal', '1925 年承担公开学生刊物校对与账目。', '一期刊物按署名、印费和退稿结清', '参与刊物没有自动生成党籍、秘密权限或对所有文章的认同。'),
      choice('d19-25-mutual', '参加有名单和用途的膳宿互助', { relation: 2, network: 3, money: -1 }, 'd19:25:mutual', '1925 年参加公开膳宿互助。', '两名同学得到短期接济，你也少了一笔储备', '互助记录用途和期限；同学以后可以退出或拒绝回报。'),
      choice('d19-25-distance', '保持距离，把时间留给课程和兼职', { knowledge: 3, mind: 2, network: -1 }, 'd19:25:distance', '1925 年没有参加该学生团体。', '课程接住了，几段同学往来变淡', '拒绝参加不被写成胆怯或背叛；发起人保留自己的评价和生活。')],
    [1926, '家里寄来的钱比约定少了一半', '父母有自己的收入、病痛和家中责任；你需要决定减少哪项开支或劳动，不能把缺口变成抽象穷困。',
      choice('d19-26-cut-board', '搬到更远的合租住处，保住核心课程', { money: 2, health: -1, knowledge: 2 }, 'd19:26:board', '1926 年为保住课程更换住处。', '房租降低，通学时间和夜路风险增加', '室友的床位、家务和访客规则逐项协商；合租不自动形成亲密关系。'),
      choice('d19-26-tutor', '增加两名辅导学生，但设每周课时上限', { money: 3, health: -2, craft: 2 }, 'd19:26:tutor', '1926 年以有限辅导课时补学费。', '缺口暂时接住，连续授课造成失声', '学生家长按月结算，主角请假一周；收入与健康代价同时留下。'),
      choice('d19-26-reduce', '少修一门课，向家里写清实际缺口', { mind: 3, relation: 2, knowledge: -1 }, 'd19:26:reduce', '1926 年减少一门课程并说明家计。', '父母只承诺下一季可承担的部分', '家信没有催出无限钱款；母亲与父亲分别说明自己的边界。')],
    [1927, '反复眼痛和失眠影响上课', '身体不是扣一次健康就结束；诊治、请假、补课和生活费用都会继续。',
      choice('d19-27-clinic', '说明持续时间，求医并停用一段夜间阅读', { health: 5, money: -3, knowledge: -1 }, 'd19:27:clinic', '1927 年为眼痛和失眠求医并调整阅读。', '症状缓解，夜间课程改为白天借笔记', '医生没有保证根治；同学愿意借笔记，但不替主角完成作业。'),
      choice('d19-27-load', '与教师协商减量和延交，不隐瞒病况', { health: 3, mind: 3, fame: -1 }, 'd19:27:load', '1927 年因病获得有限延交。', '两份作业延期，一份课程仍判缺席', '教师的宽限有边界；身体代价没有因诚实说明而消失。'),
      choice('d19-27-endure', '继续原课表，只记录何时必须停下', { knowledge: 3, health: -4, mind: 1 }, 'd19:27:endure', '1927 年带病维持原课程。', '成绩保住一部分，症状在考试后加重', '记录证明了过劳过程，也说明坚持不是无代价的美德。')],
    [1928, '教授提出一份有经费的资料助理工作', '工作能补学费，也涉及资料权限、劳动署名和导师评价；“跟老师做研究”不能抹掉具体任务。',
      choice('d19-28-assist', '先写清抄录范围、时数、报酬和致谢', { knowledge: 3, money: 2, craft: 2 }, 'd19:28:assist', '1928 年承担有范围和报酬的研究助理工作。', '资料按期交付，报告列出助理贡献', '导师保留研究结论，主角获得劳动记录而非自动共同作者身份。'),
      choice('d19-28-course', '拒绝额外助理工作，先完成毕业课程', { knowledge: 4, mind: 2, money: -1 }, 'd19:28:course', '1928 年拒绝额外助理工作并优先课程。', '课程进度接住，导师另找助理', '拒绝没有使导师成为敌人；岗位与关系都可以被别人接走。'),
      choice('d19-28-negotiate', '只接版本核对，不接无法署名的整篇代写', { mind: 4, knowledge: 2, network: 1 }, 'd19:28:scope', '1928 年限定研究助理工作范围。', '导师接受版本核对，另安排主文撰写', '边界让报酬减少，也留下可信的工作记录。')],
    [1929, '外校来函提供一学期交换进修', '名额写着课程和接收人，却不包含路费、住处和回程；女性还要核当地宿舍与监护规则。',
      choice('d19-29-go', '核实住处、路费和返校承认后前往', { money: -5, knowledge: 4, network: 3 }, 'd19:29:go', '1929 年完成一次有承认课程的外地进修。', '抵达后只修两门课，并保留回程盘缠', '女性住处由学校具名管理，不由陌生介绍人决定；男性也需承担路费和远行风险。'),
      choice('d19-29-local', '留校，用馆际书信和借阅完成同一专题', { knowledge: 4, money: -1, network: 1 }, 'd19:29:local', '1929 年以馆际通信完成专题学习。', '收到三份目录答复，其中一册无法借出', '没有把“留学失败”写成价值判断；本地学习有不同资源和限制。'),
      choice('d19-29-defer', '保留录取函，因家人身体和费用延期', { relation: 3, mind: 2, position: -1 }, 'd19:29:defer', '1929 年因家计延期一次外地进修。', '学校同意保留到下一学期，但不保证宿舍', '家人各自说明需要，延期不等于主角必须永久留家。')],
    [1930, '女性同学的住宿许可被临时改变', '这不是“女性不能读书”的能力判定，而是现实制度和家门压力占用了时间、钱与安全；男性同学也要决定是否共同承担。',
      choice('d19-30-joint-petition', '与具名同学共同要求书面住宿答复', { network: 3, mind: 3, position: -1 }, 'd19:30:petition', '1930 年参与公开住宿条件申诉。', '校方恢复部分床位，并留下新的出入规定', '女同学自己签名和选择住处；男同学的支持不替她们作答。'),
      choice('d19-30-hostel-fund', '建立透明的小额住宿互助账', { money: -2, relation: 2, knowledge: 1 }, 'd19:30:fund', '1930 年参与有用途和期限的住宿互助。', '两名同学接住一个学期，账目公开结清', '互助没有换来对方忠诚，也不产生永久资助义务。'),
      choice('d19-30-own-study', '不介入申诉，但把课程笔记共享给缺课同学', { knowledge: 3, relation: 1, network: -1 }, 'd19:30:notes', '1930 年向缺课同学共享具名课程笔记。', '同学补上一门课，住宿问题仍由她们继续处理', '提供笔记是有限帮助，不被包装成替别人解决制度门槛。')],
    [1931, '水患与交通中断影响学校、书库和家信', '校舍受影响不等于所有人同样受灾；住处、家人、书籍、课程和同学最后消息分别确认。',
      choice('d19-31-people', '先逐人核住处和伤病，再处理课程资料', { relation: 3, health: 2, knowledge: -1 }, 'd19:31:people', '1931 年先确认同住者和同学安危。', '大多数人有消息，一名同学仍只到最后地址', '失联保持未知；课程延期由学校另行答复。'),
      choice('d19-31-records', '与馆员转移借阅簿、学籍副本和受潮书', { craft: 3, knowledge: 2, health: -2 }, 'd19:31:records', '1931 年参与校内资料抢护。', '关键名册和一批书得到临时安置', '主角只经手列明资料，私人信件和他人学籍没有被擅自公开。'),
      choice('d19-31-home', '先回家确认父母住处，正式办理停课', { relation: 4, position: -2, knowledge: -1 }, 'd19:31:home', '1931 年因水患停课并回家确认亲人。', '父母住处确认，返校时间仍待道路恢复', '家人没有被灾情自动写死，课程也没有无记录消失。')],
    [1932, '毕业论文或结业报告的资料不够', '你可以缩小问题、延期补资料或改成共同项目，但不能编造缺失的来源。',
      choice('d19-32-narrow', '缩小题目，只写能核实的材料', { knowledge: 4, mind: 3, fame: -1 }, 'd19:32:narrow', '1932 年缩小结业题目并保留证据边界。', '报告按期通过，结论范围更小', '评阅人说明限制；“不知道”被保留为正式结论的一部分。'),
      choice('d19-32-delay', '延期一学期补版本与访谈', { knowledge: 5, money: -2, position: -1 }, 'd19:32:delay', '1932 年延期补全结业资料。', '新增两条资料，一条关键问题仍未证实', '延长时间增加成本，却没有保证更漂亮的结论。'),
      choice('d19-32-team', '与同学共同研究，逐项写各自贡献', { network: 3, knowledge: 3, relation: 1 }, 'd19:32:team', '1932 年完成有贡献记录的共同研究。', '两人共享报告署名，原始笔记仍各自保存', '合作没有合并所有材料、声誉或以后职业。')],
    [1933, '求学阶段必须给出真实去向', '学籍、课程和结业记录已经足够形成一个阶段；此后不能永远停在“继续读书”，需要选择具名学校、编辑部或图书研究岗位。',
      choice('d19-33-teach', '带着已核课程进入学校教书', { knowledge: 3, fame: 2, money: 1 }, 'd19:33:teach', '1933 年结束主要求学阶段并进入教书工作。', '学校只承认列明课程，先给一年聘期', '宿舍、课程、薪水和续聘分别写入新职业；学历没有自动换成终身岗位。', { route: 'shen-scholar' }),
      choice('d19-33-press', '以学生刊物和写作记录应聘编辑出版', { craft: 3, network: 2, money: 1 }, 'd19:33:press', '1933 年结束主要求学阶段并进入新闻出版。', '编辑部给出三个月校对和助编试用', '试用只承认具名稿件与校样；人脉没有替代考试和实际工作。', { route: ROUTE_PRESS }),
      choice('d19-33-library', '以版本核对和研究助理记录进入图书研究', { knowledge: 4, craft: 2, money: 1 }, 'd19:33:library', '1933 年结束主要求学阶段并进入图书研究。', '图书馆给出编目与参考辅助试用', '入馆不是取得馆藏；资料、工资、署名与借阅权限分别核定。', { route: ROUTE_LIBRARY })]
  ];

  studyDecisions.forEach(function (row) {
    installDecision('study', ROUTE_STUDY, { id: 'route-d19-' + row[0], year: row[0], followYear: row[0] + 1, title: row[1], prompt: row[2], options: row.slice(3) });
  });

  var pressDecisions = [
    [1924, '第一次独立校样怎样交出去', '一张校样同时有日期、人名、数字、作者改动和印刷时限；赶快不是唯一标准。',
      choice('d21-24-check', '逐项核名与数字，宁可晚一版', { craft: 3, knowledge: 2, position: -1 }, 'd21:24:check', '1924 年第一次独立完成具名校样。', '两处数字改正，末班印刷因此推迟', '编辑承担版面延误，印工按新增时数结算；你没有把责任甩给排字工。'),
      choice('d21-24-query', '把作者改动不清的地方退回确认', { mind: 3, relation: 1, craft: 1 }, 'd21:24:query', '1924 年为一处含混改动等待作者确认。', '作者改回原句，该段没有误刊', '等待让一栏留白，却保存了作者意思和编辑记录。'),
      choice('d21-24-deadline', '按时付印并标记待下期勘误', { fame: 1, craft: 2, mind: -1 }, 'd21:24:deadline', '1924 年按时付印并留下待核项。', '一期按时出刊，一处地名下期勘误', '速度带来可见错误；勘误不会被后来声望抵消。')],
    [1926, '一条重要消息只有一个来源', '消息看似及时，却只有一名转述者，没有文件和第二名知情人。',
      choice('d21-26-hold', '暂缓刊出，继续找第二个相容来源', { knowledge: 3, fame: -1, mind: 3 }, 'd21:26:hold', '1926 年因单一来源暂缓一条消息。', '次日第二名知情人只证实其中一半', '刊出的范围缩小，未证实部分明确保留未知。'),
      choice('d21-26-label', '作为未完全证实的来函摘录，并说明来源', { knowledge: 2, fame: 1, position: -1 }, 'd21:26:label', '1926 年以明确来源边界刊出一则来函。', '读者知道谁说了什么，也看见编辑未能确认的部分', '标注来源降低误导，却不能消除传播后果。'),
      choice('d21-26-reject', '拒绝刊出并把核验记录归档', { mind: 4, network: -1 }, 'd21:26:reject', '1926 年拒绝刊出无法核实的消息。', '提供者转投别处，编辑部保留拒稿理由', '失去独家消息没有被写成失败；关系也因此变淡。')],
    [1928, '采访对象要求删去会伤害家人的细节', '他的经历是真实材料，但公开范围仍需协商；记者不能以“历史价值”占有全部私人生活。',
      choice('d21-28-consent', '逐段确认可公开、匿名和不公开内容', { relation: 3, knowledge: 2, craft: 1 }, 'd21:28:consent', '1928 年按采访对象同意范围刊出。', '报道保留核心事实，隐去住址和家人细节', '匿名降低暴露，不保证无人猜出；风险在刊前说清。'),
      choice('d21-28-delay', '暂不刊出，给对方一天重新考虑', { mind: 3, fame: -1, relation: 2 }, 'd21:28:delay', '1928 年为采访对象保留撤回时间。', '对方同意刊一半并取回私人信件', '材料归还，不因采访发生就成为报馆财产。'),
      choice('d21-28-public-only', '只使用已经公开的事实，放弃私人细节', { knowledge: 2, mind: 3, fame: -1 }, 'd21:28:public', '1928 年只用公开材料完成报道。', '文章较短，但没有越过私人边界', '编辑记录为何删去细节，读者不会得到虚构补白。')],
    [1930, '作者、译者和校对为署名与稿酬争执', '同一篇稿件经过多人劳动；编辑部不能用一句“共同完成”吞掉具体贡献和欠款。',
      choice('d21-30-credit', '按原稿、译文、改稿和校样逐项列名', { relation: 3, fame: 1, money: -2 }, 'd21:30:credit', '1930 年为一篇多人稿件逐项署名。', '四人得到不同署名和应付金额', '报馆现金只付一部分，欠项和答复日仍明确留下。'),
      choice('d21-30-withhold', '在署名未谈清前不付印', { mind: 4, position: -2, network: -1 }, 'd21:30:withhold', '1930 年因署名争议延迟付印。', '争议谈成，版面由另一稿暂代', '作者可以撤稿，报馆没有因排版投入取得强行刊登权。'),
      choice('d21-30-editor-note', '保留主署名并加编辑说明与校译名单', { craft: 2, relation: 1, fame: 1 }, 'd21:30:note', '1930 年以编辑说明记录多人贡献。', '作者接受，译者仍对稿酬提出异议', '署名暂结不等于欠款结清，两条问题分开保存。')],
    [1932, '版面被要求临时删去一整栏', '审查、所有者决定、纸张不足和事实问题必须分开写；停刊风险不能成为刺激性胜负玩法。',
      choice('d21-32-record', '保存原稿、删改通知和付印版三份记录', { knowledge: 3, mind: 3, position: -2 }, 'd21:32:record', '1932 年保存一次删版过程的三份记录。', '该栏没有刊出，但作者知道是谁何时作了决定', '记录不提供规避审查教程，只保留劳动、权责和事实经过。'),
      choice('d21-32-replace', '用已核实且不牵连私人住址的地方消息补版', { craft: 3, fame: 1, health: -1 }, 'd21:32:replace', '1932 年以已核地方消息补足空版。', '报纸按时出版，原稿待另行答复', '补版不是暗号，也没有把陌生人写成秘密联络者。'),
      choice('d21-32-blank', '留出说明性空白并承担停印风险', { mind: 4, fame: 1, money: -2 }, 'd21:32:blank', '1932 年因无法负责替稿而保留版面空缺。', '印数减少，作者和印工各自得到说明', '选择产生收入损失，但不自动授予英雄或叛徒标签。')],
    [1934, '报道一场劳资争议时谁先说话', '雇主、工人、受伤者家属和公开记录相互冲突；认识其中一方不等于替其拥有全部事实。',
      choice('d21-34-multi', '分别采访并把未回应的位置留出', { knowledge: 3, network: 2, health: -1 }, 'd21:34:multi', '1934 年完成一篇多方回应的劳资报道。', '三方回应刊出，一方在截稿前未答', '未回应不被解释为默认承认；记者写明请求答复的时间。'),
      choice('d21-34-docs', '先核工资表、医药单和公开通知', { knowledge: 4, craft: 2, fame: -1 }, 'd21:34:docs', '1934 年先以可核文件报道劳资争议。', '文章只确认工资和伤病处理程序', '动机、责任和长期后果仍留待当事人和后续材料。'),
      choice('d21-34-human', '只写一名伤者的已同意经历与待答问题', { relation: 3, fame: 2, knowledge: 1 }, 'd21:34:human', '1934 年刊出一名伤者同意范围内的经历。', '读者来信增加，争议整体仍未结案', '个人故事没有代表所有工人，也没有替雇主定罪。')],
    [1936, '升任编辑、留在校对还是独立撰稿', '职位变化会改变工资、责任、时间和失误后果；上升不是唯一合理方向。',
      choice('d21-36-editor', '接受编辑职，承担核稿、排版与人员答复', { position: 3, money: 2, health: -2 }, 'd21:36:editor', '1936 年成为有具名职责的编辑。', '工资提高，也第一次为整版错误负责', '同事不是部属资源；排班、署名和退稿仍逐人答复。'),
      choice('d21-36-proof', '留在高级校对，换取较清楚的工时', { craft: 4, health: 1, fame: -1 }, 'd21:36:proof', '1936 年选择继续专业校对。', '工时较稳，公开署名较少', '专业停留不被写成失败；收入和技术记录仍然增长。'),
      choice('d21-36-freelance', '离开固定编辑部，按篇签约撰稿', { mind: 3, network: 2, position: -2 }, 'd21:36:free', '1936 年转为按篇约稿的自由撰稿人。', '得到两份约稿，也遇到一次无故退稿', '编辑部关系变成客户关系；没有固定薪水和无限版面。')],
    [1938, '战时消息、家人地址与出版安全撞在一起', '路线和人员频繁变化，消息必须分级确认；报刊工作不自动变成秘密情报身份。',
      choice('d21-38-address', '先保存家人和同事的最后确认地址', { relation: 3, knowledge: 1, position: -2 }, 'd21:38:address', '1938 年建立分开的家人与同事地址簿。', '两封信抵达，一名印工仍只有最后工厂消息', '地址簿不公开、不作秘密联络教程，失联保持未知。'),
      choice('d21-38-civil', '只做公开民生、物价、学校和救济信息', { knowledge: 3, fame: 1, health: -2 }, 'd21:38:civil', '1938 年转做可公开核实的民生报道。', '三条信息帮助读者找到公开服务', '公共信息与组织身份分开；编辑没有因此获得特殊通行权。'),
      choice('d21-38-pause', '停刊一段，先安置印工与保存样报', { money: -3, relation: 3, craft: 2 }, 'd21:38:pause', '1938 年暂停出版并安置具名同事。', '印工各自找到临时去处，样报保存一部分', '停刊不是所有人同时失业或死亡，每个人另有答复。')],
    [1941, '纸张不足只能保留一半版面', '新闻、公告、广告、读者来信和稿酬都受影响；删谁不是纯粹数值优化。',
      choice('d21-41-core', '保留已核新闻和必要公共信息', { knowledge: 3, fame: 1, money: -2 }, 'd21:41:core', '1941 年因纸张不足缩减版面。', '广告和长文延期，核心信息按来源刊出', '延期稿件逐一通知作者，已完成劳动进入欠酬清单。'),
      choice('d21-41-small', '改成小开本并减少印数', { craft: 3, money: -1, health: -1 }, 'd21:41:small', '1941 年以小开本和少印数维持出版。', '读者变少，印工仍有有限班次', '技术调整没有解决纸价和工资问题，只延长了运转时间。'),
      choice('d21-41-pause-pay', '暂停一期，先结一部分印工和作者款', { relation: 3, money: -3, fame: -2 }, 'd21:41:pay', '1941 年停一期并优先支付部分欠款。', '出版间断，具名欠项减少', '没有钱时不能用理想要求他人免费劳动。')],
    [1943, '一则会引发抢购的传闻正在扩散', '消息可能直接改变家庭口粮；报道速度必须与伤害风险一起计算。',
      choice('d21-43-verify', '核市场、供应人和公开通知后再写', { knowledge: 4, mind: 3, health: -1 }, 'd21:43:verify', '1943 年延后报道一则供应传闻。', '核实后发现只有一处短缺，不是全城断供', '报道限定地点与时间，避免把局部情况扩成全面恐慌。'),
      choice('d21-43-service', '只刊公开购买规则和求助地址', { fame: 1, relation: 2, knowledge: 2 }, 'd21:43:service', '1943 年刊出已核公共服务信息。', '读者获得具体地址，供应量仍有限', '报纸没有承诺人人都能买到，也不替经手人分配物资。'),
      choice('d21-43-silence', '不刊传闻，记录为何无法负责', { mind: 4, fame: -1, network: -1 }, 'd21:43:silence', '1943 年拒绝传播无法核实的抢购传闻。', '别家刊出后出现排队，你保留当时核验记录', '没有把后来的混乱归功或归罪于单一编辑选择。')],
    [1945, '复刊时旧同事、旧稿与旧产权怎样接回', '战争结束不让报馆自动恢复；场地、机器、工资、作者稿件和同事去向分别确认。',
      choice('d21-45-roster', '先逐人核同事去向、欠薪和是否愿意回来', { relation: 3, network: 2, money: -2 }, 'd21:45:roster', '1945 年为复刊逐人核同事和欠薪。', '四人回来，两人另有工作，一人仍失联', '失联没有写死；拒绝回来也不是背叛旧同事。'),
      choice('d21-45-rights', '先核场地、机器、报头和旧稿权利', { knowledge: 3, craft: 2, position: -1 }, 'd21:45:rights', '1945 年核实复刊所需资产与稿件权利。', '只确认部分设备和有限报头使用', '多年劳动不等于报馆产权；作者旧稿也不自动归编辑部。'),
      choice('d21-45-new', '另组小型编辑与印务合作，列清份额', { money: -4, network: 3, mind: 2 }, 'd21:45:new', '1945 年建立有限编辑印务合作。', '首期只雇两人并刊一张小报', '合作者、印工、设备和债务分别登记，没有一夜成为传媒大亨。')],
    [1948, '物价上涨使薪水、稿酬和纸款再次失去意义', '一份刊物能否继续不只看销量；员工吃饭、纸商账期、订户退款和旧欠款同时到期。',
      choice('d21-48-wages', '缩减期数，先按人结一部分工资与稿酬', { relation: 3, money: -4, fame: -1 }, 'd21:48:wages', '1948 年缩减出版并优先支付具名劳动。', '欠款减少，刊期变得不稳定', '每个人知道已付、欠付和下一次答复，不以未来声望抵工资。'),
      choice('d21-48-subscribe', '重谈短期订阅、退款和纸张用量', { craft: 3, network: 2, money: -2 }, 'd21:48:subscribe', '1948 年重订短期出版与订阅条件。', '保住三个月小规模发行，部分订户退款', '收了订金不等于永久供刊，失败批次有退款与欠项记录。'),
      choice('d21-48-close', '完成最后一期，结清能结的账并保存档案', { mind: 4, money: -2, position: -3 }, 'd21:48:close', '1948 年结束一段报刊工作并保存记录。', '出版停止，技能和往来转入下一段生活', '关门不是人生失败；未结稿酬、设备归属和同事去向继续留在事实表。')]
  ];

  pressDecisions.forEach(function (row) {
    installDecision('press', ROUTE_PRESS, { id: 'route-d21-' + row[0], year: row[0], followYear: row[0] + 1, title: row[1], prompt: row[2], options: row.slice(3) });
  });

  var libraryDecisions = [
    [1924, '第一批入藏书怎样登记', '赠者说是赠送，经手人又说只是寄存；没有书面范围就不能直接盖馆藏章。',
      choice('d24-24-hold', '暂存并向两方分别确认所有关系', { knowledge: 3, mind: 3, position: -1 }, 'd24:24:hold', '1924 年暂存一批权属未清的书。', '三周后确认多数赠送、两册仍为寄存', '寄存书不盖永久馆藏章，赠者和经手人的说法分别保存。'),
      choice('d24-24-list', '先做临时清单和状态照片式文字记录', { craft: 4, knowledge: 2 }, 'd24:24:list', '1924 年为权属未清书籍建立临时清单。', '缺页、题记和版本差异得到记录', '清单不改变所有权，只让后续确认有可比证据。'),
      choice('d24-24-return', '退回未能说明来源的部分', { mind: 4, network: -1, fame: -1 }, 'd24:24:return', '1924 年退回来源无法说明的书籍。', '馆藏数量没有增加，争议也没有进入借阅', '拒收不是浪费知识；保存机构不能以公共名义占有来路不明财物。')],
    [1926, '同名作者和不同版本被混在一张卡上', '读者已经按错卡借过一次；改卡必须保留旧记录和影响。',
      choice('d24-26-split', '按版本、年份和责任者拆成多张卡', { craft: 4, knowledge: 3 }, 'd24:26:split', '1926 年纠正一组混合书目卡。', '读者能区分三种版本，旧卡留存作废痕迹', '系统改正没有假装过去从未出错。'),
      choice('d24-26-authority', '建立作者异名互见并标注待考', { knowledge: 4, mind: 2 }, 'd24:26:authority', '1926 年建立作者异名互见记录。', '两个人名确认相同，第三个仍待考', '不确定身份没有被强行合并，读者能看见证据状态。'),
      choice('d24-26-reader', '先联系受影响读者并更正借阅答复', { relation: 3, knowledge: 2, fame: -1 }, 'd24:26:reader', '1926 年向受错卡影响的读者说明更正。', '读者重新预约正确版本', '馆员承认错误，没有用专业术语要求读者自行承担。')],
    [1928, '另一馆来函查询本馆是否有一部罕见版本', '馆际目录能减少重复寻找，但一张卡不能保证书仍可借、可复制或状态完好。',
      choice('d24-28-verify', '到书架核实版本、缺页和当前状态再回函', { knowledge: 4, craft: 2, health: -1 }, 'd24:28:verify', '1928 年完成一次馆际版本核查。', '确认有该版本但缺两页，只能到馆查阅', '回函写明日期和限制，没有把目录记录当成实时事实。'),
      choice('d24-28-copy', '抄录题名页、版次与藏号，不复制全文', { craft: 3, knowledge: 3 }, 'd24:28:copy', '1928 年向另一馆提供书目信息。', '对方据此排除一种误认版本', '书目信息共享不等于转让馆藏或开放私人题记。'),
      choice('d24-28-decline', '因书况不明暂缓答复并说明复查日', { mind: 3, position: -1, knowledge: 1 }, 'd24:28:decline', '1928 年暂缓一次馆际书目答复。', '复查后确认书已送修，目录状态得到更新', '慢答复带来等待，却避免了错误承诺。')],
    [1930, '一名读者要查另一人的借阅记录', '他声称为共同研究，却没有对方授权；知识服务不能把隐私当成便利。',
      choice('d24-30-private', '拒绝透露个人记录，只提供公开书目', { mind: 4, relation: -1, knowledge: 2 }, 'd24:30:private', '1930 年拒绝披露他人借阅记录。', '读者改用公开目录寻找资料', '馆员说明可以由本人授权，但不凭关系越过边界。'),
      choice('d24-30-consent', '联系本人并等待是否同意分享书目', { relation: 2, network: 1, position: -1 }, 'd24:30:consent', '1930 年为共享借阅书目征得本人答复。', '本人只同意分享三本公开书目', '未同意的阅读记录继续私密，合作范围由本人决定。'),
      choice('d24-30-reference', '不查个人记录，按研究题目另做参考咨询', { knowledge: 4, craft: 1 }, 'd24:30:reference', '1930 年以主题检索替代个人记录查询。', '找到五条公开线索，其中两条需外馆查询', '解决问题不要求侵犯他人生活。')],
    [1932, '一批受潮旧刊应修、应拆还是停止借阅', '装订、纸张、霉变和缺页各有风险；“抢救”也可能造成不可逆损害。',
      choice('d24-32-isolate', '先隔离、通风和逐册记损，不贸然重装', { craft: 4, health: -1, knowledge: 2 }, 'd24:32:isolate', '1932 年隔离一批受潮旧刊。', '霉变没有继续扩散，修复方案仍待专业答复', '基础保护不被夸成完全修复；接触风险也进入健康记录。'),
      choice('d24-32-use-copy', '保留原件停借，提供已有副本和摘录', { knowledge: 3, relation: 2, position: -1 }, 'd24:32:copy', '1932 年暂停受损原件借阅。', '读者仍得到部分内容，原件损耗停止增加', '无法提供的页面明确标注，不凭记忆补写。'),
      choice('d24-32-specialist', '向有经验的装订人询价并列可逆工序', { network: 2, money: -2, craft: 3 }, 'd24:32:specialist', '1932 年为旧刊取得有限修护方案。', '只处理最危险的封面与散页', '装订人按件收费并保留拒接权，馆员不擅自裁切。')],
    [1934, '研究委托要求查遍馆藏却不给助理署名', '经费、资料权限、劳动时数、结论所有和署名需要在开工前分开谈。',
      choice('d24-34-credit', '要求在报告中列出检索和整理贡献', { mind: 4, knowledge: 2, position: -1 }, 'd24:34:credit', '1934 年谈定研究助理贡献记录。', '报告列出检索者，结论仍由委托研究者负责', '署名范围不被夸成共同作者，劳动也没有消失。'),
      choice('d24-34-hours', '只承诺有报酬的明确时数和馆藏范围', { money: 2, craft: 2, mind: 2 }, 'd24:34:hours', '1934 年限定研究委托时数与范围。', '按期交付一份目录，未查部分另行报价', '付费范围结束后没有无限加做。'),
      choice('d24-34-refuse', '拒绝无署名无范围的委托', { mind: 4, network: -2, fame: -1 }, 'd24:34:refuse', '1934 年拒绝一份边界不清的研究委托。', '委托人另找人，馆方保留拒绝原因', '失去工作没有被写成软弱；下一份委托仍需重新谈。')],
    [1936, '你的整理被上级当作自己的成果发表', '资料属于馆方不等于劳动可以无记录；公开争执也可能影响岗位。',
      choice('d24-36-record', '先拿出工单、卡片和交付日期私下核对', { knowledge: 2, mind: 4, relation: 1 }, 'd24:36:record', '1936 年以工作记录提出贡献异议。', '上级在再版致谢中补列姓名', '补列不能撤回第一次遗漏，关系也变得更谨慎。'),
      choice('d24-36-joint', '要求以后项目先写贡献表', { craft: 2, network: 2, mind: 3 }, 'd24:36:joint', '1936 年推动研究项目预先记录贡献。', '新项目开始按任务和署名范围登记', '制度改善不是主角个人拥有，其他助理也可以使用和质疑。'),
      choice('d24-36-leave', '结束该项目，保留可公开工作证明', { position: -2, mind: 3, network: 1 }, 'd24:36:leave', '1936 年退出一项署名争议项目。', '馆内岗位仍在，研究合作停止', '退出项目不是离开整个职业，已完成劳动保留事实。')],
    [1938, '战时迁移时哪些馆藏先走', '人、借阅者、目录、珍本、普通书、私人寄存和运输能力不能压成一个优先级。',
      choice('d24-38-people', '先确认人员、借阅者与私人寄存联系', { relation: 3, position: -2, knowledge: 1 }, 'd24:38:people', '1938 年先核人员和寄存关系。', '多数人员有去处，两名读者借书转为待归还', '没有为了完整馆藏把人写成搬运资源，失联仍待确认。'),
      choice('d24-38-register', '先复制目录与装箱清单，再分批转移', { craft: 4, health: -2, money: -2 }, 'd24:38:register', '1938 年建立战时馆藏装箱清单。', '三批书有箱号和去向，一箱途中消息不明', '未知箱件没有自动写成毁坏或被盗。'),
      choice('d24-38-local', '保留常用资料服务当地读者，珍本另行安置', { knowledge: 3, relation: 2, position: -2 }, 'd24:38:local', '1938 年维持有限战时阅览服务。', '读者仍能查公开资料，开放时间显著缩短', '服务不自动变成政治身份或秘密联络工作。')],
    [1941, '稀缺资料只能满足一个请求', '教师、学生、公开救济人员和私人研究者都有理由；熟人关系不能替代规则。',
      choice('d24-41-queue', '按登记时间和紧急用途建立可见队列', { mind: 3, relation: 2, fame: 1 }, 'd24:41:queue', '1941 年为稀缺资料建立公开使用队列。', '三人按期使用，一人因时间不合放弃', '放弃者没有失去以后资格，队列也可被质疑和修改。'),
      choice('d24-41-copy', '制作有限摘录供多人查阅，原件减少翻动', { craft: 3, knowledge: 3, health: -1 }, 'd24:41:copy', '1941 年以有限摘录分担资料需求。', '多人获得必要段落，原件仍按预约使用', '摘录标页码和省略，不能冒充全文。'),
      choice('d24-41-refuse-friend', '拒绝熟人插队并说明下一次时段', { mind: 4, network: -1, fame: 1 }, 'd24:41:refuse', '1941 年拒绝一次熟人插队。', '关系变淡，其他预约没有被取消', '公平选择有关系代价，不自动换来全体称赞。')],
    [1943, '目录里的一批书已经找不到', '战争、迁移、未还、误架和损毁都有可能；找不到不能立刻写成被偷或毁灭。',
      choice('d24-43-trace', '按最后借阅、装箱、架位和经手人逐项追查', { knowledge: 3, craft: 3, health: -1 }, 'd24:43:trace', '1943 年追查一批失位馆藏。', '找回两册，一册确认损坏，三册仍未知', '每册状态分开，不把统计缺口平均成同一结局。'),
      choice('d24-43-status', '将目录改为状态不明并公开查询', { mind: 3, network: 2, fame: -1 }, 'd24:43:status', '1943 年公开标注一批馆藏状态不明。', '外馆回信确认其中一册曾转存', '公开未知没有损害专业性，反而留下继续核对的入口。'),
      choice('d24-43-rebuild', '以其他馆目录重建书目信息，不冒充实物在馆', { knowledge: 4, craft: 2 }, 'd24:43:rebuild', '1943 年重建缺失馆藏的书目记录。', '题名版本恢复，实物状态仍显示不明', '知识记录和物理所有严格分开。')],
    [1945, '复员后有人要求取回寄存与失散藏书', '旧收据、题记、装箱清单、口述和现有占有相互冲突；“归还文化”不能替代逐件核实。',
      choice('d24-45-claims', '逐件登记主张、证据和暂不处理理由', { knowledge: 3, mind: 3, position: -1 }, 'd24:45:claims', '1945 年建立馆藏归还主张清单。', '一批归还原主，两批继续暂存待核', '申请人知道进度和缺件，馆员没有先入为主决定。'),
      choice('d24-45-return', '先归还有明确收据和相符题记的部分', { relation: 3, knowledge: 2, position: -1 }, 'd24:45:return', '1945 年归还一批证据相符的寄存书。', '原主确认数量，也指出一册状态变差', '归还不抹掉保存期间的损伤，责任继续记录。'),
      choice('d24-45-board', '请多名经手人共同核争议版本', { network: 3, mind: 2, money: -1 }, 'd24:45:board', '1945 年以共同复核处理争议馆藏。', '复核仍无结论，书暂不外借', '多人参与不保证真相，只降低单人擅断。')],
    [1948, '经费不足时怎样保住人员与服务', '馆员工资、房租、基础保存、读者开放与研究委托同时缺钱；藏书多不等于机构能运转。',
      choice('d24-48-hours', '缩短开放时段，保住具名工资和基础保存', { relation: 2, money: -3, fame: -1 }, 'd24:48:hours', '1948 年缩短图书馆开放时段。', '人员工资支付一部分，读者等待变长', '每项服务写明暂停范围和下一次答复。'),
      choice('d24-48-project', '只接有范围、有署名和预付款的研究委托', { money: 2, knowledge: 2, network: 1 }, 'd24:48:project', '1948 年以有限研究委托补贴馆务。', '完成一项委托，收入只接住三个月', '委托方没有取得馆藏所有或全部读者记录。'),
      choice('d24-48-transfer', '将部分重复本按清单移交有接收条件的机构', { craft: 3, position: -1, mind: 2 }, 'd24:48:transfer', '1948 年清单式移交部分重复馆藏。', '接收方确认数量和保管责任', '移交不等于清空或出售；珍本、寄存本和争议本留在原处。')]
  ];

  libraryDecisions.forEach(function (row) {
    installDecision('library', ROUTE_LIBRARY, { id: 'route-d24-' + row[0], year: row[0], followYear: row[0] + 1, title: row[1], prompt: row[2], options: row.slice(3) });
  });

  function scene(field, id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['jiangnanshen'], priority: 20,
      sourceIds: sourceIds[field].slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }

  [
    ['d19-s01', '录取名单之外还有费用与住处', '名字出现在初核名单上，只证明可以继续办理；缴费、宿舍、课程与正式学籍仍各有答复。', { minAge: 13, maxAge: 17 }],
    ['d19-s02', '女同学和男同学面对不同时间账', '课程标准相同，女性更常额外核住宿、夜路和家门许可，男性更常被催促尽快谋生；差异不作能力加减。', { minAge: 13, maxAge: 24 }],
    ['d19-s03', '一张课程表写出每周真实生活', '必修、实验、阅读、辅导挣钱、通学、家务和休息占用同一时间，不能一回合同时全部做满。', { minAge: 13, maxAge: 25 }],
    ['d19-s04', '同学会转科、休学、成家或离校', '周映秋、罗素英和其他同学各自处理钱、身体与家庭，不是永远等主角触发的陪衬。', { minAge: 15, maxAge: 27 }],
    ['d19-s05', '考试给出范围、成绩与后续', '通过、补考、重修、转科和退课各自记录；知识增长不能覆盖曾经缺课或失败的事实。', { minAge: 14, maxAge: 25 }],
    ['d19-s06', '助学劳动也有报酬与边界', '辅导、抄录和研究助理按课时、页数或任务结算；学生身份不要求免费替学校和导师劳动。', { minAge: 16, maxAge: 26 }],
    ['d19-s07', '身体会打断理想课表', '眼痛、失眠、发热和营养不足先有征兆，再有请假、求医、延交、补考和费用后果。', { minAge: 16, maxAge: 27 }],
    ['d19-s08', '外地进修先核路费和返程', '课程录取不包含住宿、交通和回校承认；去、留、延期都可能是有证据的合理选择。', { minAge: 18, maxAge: 26 }],
    ['d19-s09', '学生刊物不是职业与政治身份捷径', '校对、写稿和公开互助能形成经验；参加一次活动不自动生成党籍、秘密资格或对全部内容的认同。', { minAge: 16, maxAge: 27 }],
    ['d19-s10', '水患先改变校舍、住处与家信', '同学、父母、书籍和课程分别确认，学校受灾不等于所有人同样失去住处或亲人。', { year: 1931 }],
    ['d19-s11', '结业报告可以诚实地变小', '材料不足时缩小问题、标注未知或延期，比编造完整结论更接近真正的知识工作。', { minAge: 21, maxAge: 27 }],
    ['d19-s12', '求学最终进入具名下一站', '毕业、中断或转向后必须写出学校、编辑部、图书馆或其他现实工作，不能用“成为知识分子”结束。', { minAge: 23, maxAge: 28 }],
  ].forEach(function (row) { scene('study', row[0], row[1], row[2], Object.assign({ routes: [ROUTE_STUDY] }, row[3])); });

  [
    ['d21-s01', '一天的报刊工作有十几次交接', '采访、抄稿、核名、改稿、校样、排字、印刷、发行、稿酬和勘误分别有经手人。'],
    ['d21-s02', '记者认识人不等于消息已经证实', '一名知情者、两条相容来源、公开文件和无法确认的部分用不同语言呈现。'],
    ['d21-s03', '作者可以拒绝改稿或撤稿', '编辑说明篇幅、事实与风险，作者保留署名和撤回权；排版投入不产生强制刊登权。'],
    ['d21-s04', '校对劳动会留下身体后果', '久坐、夜间灯光、铅尘、赶版和重复阅读可能带来眼痛、咳嗽、胃痛与失眠。'],
    ['d21-s05', '女记者与男记者共享专业标准', '女性更常被挡在夜间与某些公共场所之外，男性更常被派远路；岗位门槛和安全成本分开写，不作能力扣分。'],
    ['d21-s06', '读者来信来自具体生活', '署名者、匿名者、地址不全者和要求保密者有不同处理，来信不会自动公开或变成忠实读者资产。'],
    ['d21-s07', '稿酬、印工与纸款不能靠理想代替', '采用、刊出、结算和欠付分别记录；名气不能充当他人的工资。'],
    ['d21-s08', '勘误是下一段后果的开始', '错误已经影响名字、数字或关系时，说明、联系和补救不能让原刊事实消失。'],
    ['d21-s09', '停刊让每个人走向不同地方', '编辑、校对、印工、作者和发行人可能转工、迁走、失联或重组，不被一句报馆停了同时抹去。'],
    ['d21-s10', '战时公共消息与秘密身份分开', '可以核民生、物价、学校和救济信息；不会从报刊技能自动获得卧底、情报或秘密组织权限。'],
    ['d21-s11', '复刊先核人、物、债和稿件权利', '旧报头、机器、房租、欠薪、作者旧稿和同事意愿各自给答复，战争结束不自动复原。'],
    ['d21-s12', '关门也有专业结案', '最后一期、订户退款、作者稿件、工钱欠项、设备归属和样报保存能让职业结束成为事实而非失败标签。'],
  ].forEach(function (row, index) { scene('press', row[0], row[1], row[2], { routes: [ROUTE_PRESS], minAge: index < 4 ? 13 : 18, maxAge: index < 10 ? 58 : undefined }); });

  [
    ['d24-s01', '一本书先有来源与所有关系', '购买、赠阅、寄存、借展和来路不明各自登记；进了书库不等于都归馆方所有。'],
    ['d24-s02', '目录卡不是书本身', '作者、题名、版本、年份和藏号帮助寻找，但书可能送修、外借、失位或状态不明。'],
    ['d24-s03', '女馆员与男馆员共享专业标准', '女性更常被安排台内和读者服务，男性更常搬运与远馆联络；双方都能编目、研究、管理项目并承担身体代价。'],
    ['d24-s04', '读者可以听到没有找到', '参考服务写出已查范围、部分答案、无法提供和下一步，而不是为了权威编一个完整答案。'],
    ['d24-s05', '研究助理需要可见贡献', '检索、抄录、校勘、统计和整理各有工时、报酬与署名范围，资料归机构不等于劳动无名。'],
    ['d24-s06', '旧书保护不等于翻新', '潮湿、虫蛀、缺页和装订先记录，基础清洁、隔离与包护保持可逆，不擅自裁切珍贵版本。'],
    ['d24-s07', '借阅记录属于具体读者', '公开书目可以共享，个人借阅、住址和私人题记需要本人或规则允许。'],
    ['d24-s08', '馆际目录是一种长期协作', '询问、回函、版本核对和状态日期逐项保存，一张卡不会自动开放外借或复制。'],
    ['d24-s09', '战时装箱也会留下未知', '人员、目录、珍本、普通书和寄存本按箱号与去向分开；找不到不立刻写成毁坏或盗窃。'],
    ['d24-s10', '公开阅览不生成秘密权限', '知识、地址和馆藏位置不得被写成现实隐蔽教程；公共服务、政治选择与秘密身份是三条不同状态。'],
    ['d24-s11', '复员后的归还需要逐件证据', '旧收据、题记、装箱单和口述可能冲突，归还、暂存和争议都保留下一次答复。'],
    ['d24-s12', '经费不足先说明停什么', '工资、房租、保存、开放和委托各自核钱；缩时、移交或结案不把馆员和读者写成同一损失。'],
  ].forEach(function (row, index) { scene('library', row[0], row[1], row[2], { routes: [ROUTE_LIBRARY], minAge: index < 4 ? 13 : 18, maxAge: index < 10 ? 65 : undefined }); });

  C.annualRhythms[ROUTE_STUDY] = [
    '这一周有具名课程、阅读、作业、兼职、膳宿和身体账；求学不是只把“学识”加高。',
    '同学、教师、登记员与家人分别给出课程、费用、住处和去向答复，没有谁永远等你。',
    '每年都更接近毕业、中断或转入职业；系统不会让“继续读书”无限代替现实落脚。',
  ];
  C.annualRhythms[ROUTE_PRESS] = [
    '一篇稿从来源、采访、署名、改稿、校样、印刷到稿酬和勘误逐项经过不同的人。',
    '编辑部有人入职、离开、退稿、欠薪和改行；刊物是否继续与个人是否继续生活分开。',
    '报刊带来公共可见性，也带来眼病、赶版、关系与事实责任；声望不能抵消这些代价。',
  ];
  C.annualRhythms[ROUTE_LIBRARY] = [
    '一册书的来源、版本、卡片、架位、借阅、状态与归还分别记录，知识工作不是安静地看书。',
    '馆员、读者、研究者、装订人和委托人有自己的时间、资料与拒绝权，关系不能越过权限。',
    '找不到、状态不明和证据冲突都是合格答复；长期记录让未知能够以后被继续确认。',
  ];

  C.sceneFrames[ROUTE_STUDY] = [
    { open: '早晨，课程表、学费单、住处、家信、同学近况和你的眼睛同时等着处理。', close: '今天只完成有限课程或一项答复；成绩、费用、关系、身体和未知分别留下。' },
    { open: '校园并不悬在生活之外，膳宿、兼职、家门和时代变化不断改写能够上哪一堂课。', close: '你更清楚下一步，却没有从一次选择自动得到毕业、职业或正确立场。' },
  ];
  C.sceneFrames[ROUTE_PRESS] = [
    { open: '编辑部里，采访笔记、作者来信、校样、印工班次、纸账和读者地址堆在同一张桌上。', close: '这一版只处理了一部分事实；谁署名、谁领钱、谁受影响和哪些待核分别留下。' },
    { open: '街上的消息比核验更快，刊物的时间、人的安全和纸张成本却不肯同步。', close: '付印或停下都会产生后果；职业经验提高，不保证销量、职位或道德答案。' },
  ];
  C.sceneFrames[ROUTE_LIBRARY] = [
    { open: '开馆前，归还书、目录卡、读者请求、受潮旧刊、研究委托和同事的身体先后摆到面前。', close: '今天只确认若干版本和去向；馆藏、劳动、隐私与未知没有被混成一个数字。' },
    { open: '一间图书馆靠许多慢工作维持：登记、核版、上架、查找、修护、回函和说出没有找到。', close: '记录让下一次能够继续，但不会把知识、机构财产或别人的生活变成你的所有物。' },
  ];

  var studyBase = {
    kind: 'formal-study-and-training', role: '新学、高等课程与研究训练学生',
    workplace: '江南合成新式学校、阅览室、宿舍与外地短期进修点', employer: '学校、家款、奖助与具名兼职共同维持',
    supervisor: '课程导师顾清仪与教务登记员何佩贞', colleague: '有自己学费、住处和去向的同学周映秋',
    publicPerson: '等待具名辅导课程与收费答复的学生罗素英',
    terms: '按学期核学费、膳宿、课程、考试、缺席、兼职、奖助、学籍、结业和转出；求学阶段必须结束或转入具名职业',
    duties: '完成具名课程、阅读、作业、考核和研究训练，核费用与住宿，不把认识教师写成录取、学位或职位',
    scenes: ['顾清仪退回一份范围过大的报告。', '何佩贞列出欠费、缺课和补交日期。', '周映秋说明她下学期可能转科。'],
  };
  var pressBase = {
    kind: 'news-editing-publishing', role: '采访、编辑、校对与出版工作者',
    workplace: '江南合成报刊编辑部、印刷所、发行点与采访现场', employer: '合成地方报刊与有限编辑印务合作',
    supervisor: '按稿件、校样、稿酬和版面答复的编辑秦知闻', colleague: '有自己署名、工资和去留的校对唐曼贞',
    publicPerson: '等待采访范围、署名与刊出答复的读者范宜蓉',
    terms: '按篇、期或月核来源、采访、署名、改稿、校样、印刷、发行、稿酬、工资、勘误、停刊与离职',
    duties: '采访具名来源，编辑和校对人名、日期与数字，协调作者、印工和读者，不把传闻、私人材料或版面写成个人所有',
    scenes: ['秦知闻只给一篇稿的采用答复。', '唐曼贞指出校样上一个错误年份。', '范宜蓉要求删去家人住址。'],
  };
  var libraryBase = {
    kind: 'library-catalog-research', role: '图书馆编目、参考服务与研究助理',
    workplace: '江南合成学校图书馆、联合目录卡室、旧刊库与阅览室', employer: '合成学校图书馆与有范围的研究委托',
    supervisor: '按入藏、权限、工资与项目答复的馆长宋启章', colleague: '有自己卡片、署名和去留的编目员罗文清',
    publicPerson: '带着具名问题等待检索答复的读者蒋素言',
    terms: '按件、项目或月核来源、所有、版本、目录、借阅、修护、隐私、委托、报酬、署名、移交与离馆',
    duties: '登记入藏来源，制作和核对目录，接读者查询，保护旧刊并记录研究贡献，不处分馆藏、私人记录与他人笔记',
    scenes: ['宋启章要求先核赠书是否其实寄存。', '罗文清拆开两种同名版本的卡片。', '蒋素言接受一项没有找到的答复。'],
  };

  C.routeCareerProfilesByGender[ROUTE_STUDY] = {
    男: Object.assign({}, studyBase, { role: '新学、高等课程、外地进修与研究训练学生', duties: '较常承受尽快谋生、远行和家门延续压力，也逐项核费用、课程、身体与结业，不把性别变成自动录取' }),
    女: Object.assign({}, studyBase, { role: '新学、高等课程、住宿协商与研究训练学生', duties: '在同一课程标准外更常核宿舍、夜路、家门与婚约门槛，可转入任何知识职业，限制不作能力扣分' }),
  };
  C.routeCareerProfilesByGender[ROUTE_PRESS] = {
    男: Object.assign({}, pressBase, { role: '采访、外勤、编辑、校对与出版工作者', duties: '较常先被派远路和夜间外勤，也承担核验、安全、家务和身体成本，不自动取得消息或升任编辑' }),
    女: Object.assign({}, pressBase, { role: '采访、内外勤编辑、校对与出版工作者', duties: '较常面对采访场所、夜间工作、署名和婚家门槛，可做外勤、主编或独立撰稿，标准不作能力扣分' }),
  };
  C.routeCareerProfilesByGender[ROUTE_LIBRARY] = {
    男: Object.assign({}, libraryBase, { role: '编目、馆际联络、搬运、参考与研究助理', duties: '较常兼远馆联络和重件搬运，也需核版本、隐私、署名和身体，不因搬运取得馆藏决定权' }),
    女: Object.assign({}, libraryBase, { role: '编目、读者服务、旧刊保护与研究助理', duties: '较常先进入台内、卡片和读者服务，也能管理项目和研究；全部知识劳动计薪并记录署名' }),
  };

  // 1949 后换制度或地域，不应把已经形成的新闻、出版、编目与读者服务
  // 无故压成“文书登记员”或“机器检修工”。下面仍允许失业、试工与转行，
  // 但选择继续本业时必须显示具体岗位、单位、职责、报酬与下一步。
  C.post1949RouteJobs = C.post1949RouteJobs || {};
  C.post1949RouteJobs[ROUTE_PRESS] = {
    mainland: { track: 'literate', role: '报刊编辑与校对员', casualRole: '报刊临时校对与抄稿员', workplace: '当地合成报刊编辑部与印刷点', duties: '核来源、人名、日期、校样、勘误、作者稿酬与印工结算', terms: '先按一期试做，留用后按月领薪；采访、署名和私人材料仍逐项征得同意' },
    'hong-kong': { track: 'literate', role: '华文报刊编辑与校对员', casualRole: '华文报馆临时校样员', workplace: '香港一间合成华文报馆', duties: '编排本地民生稿、核来信与广告事实、校样并登记稿酬和印费', terms: '先按三期试做，留用后按月结算；住处、工作和采访权限分别办理' },
    taiwan: { track: 'literate', role: '出版编辑与校对员', casualRole: '出版社临时审读与校样员', workplace: '台湾一间合成出版机构', duties: '核作者、版本、引文、校样、印数与退改记录', terms: '先以一本书或一期刊物试做，采用、刊印和结清报酬分别答复' },
    overseas: { track: 'literate', role: '华文报刊采编员', casualRole: '侨社刊物抄编与翻译助手', workplace: '落脚城市一间合成华文报社', duties: '核当地消息、采访同意、工作用语、版面、读者来信与勘误', terms: '按篇或按期结算，语言学习、居留和工作资格不因会写中文自动解决' },
    'in-motion': { track: 'literate', role: '流动通讯与刊物抄编员', casualRole: '临时通讯抄写与校对员', workplace: '当前落脚地的合成通讯点与印刷摊', duties: '核一批住址、来函、民生消息和校样，注明无法确认与下一转寄点', terms: '逐批结算，迁走前交清原稿、版面和私人地址；下一站不保证仍有同岗' },
    unsettled: { track: 'literate', role: '地方印务编辑与校对员', casualRole: '印刷铺临时校样员', workplace: '暂住地的一间合成印刷铺与小报编辑点', duties: '核启事、商号单据、地方稿件、校样、印数与欠付工钱', terms: '先按一批印件试做，再由具名负责人答复是否续工' },
    macau: { track: 'literate', role: '澳门华文报刊校对与编辑员', casualRole: '澳门印务所临时校样员', workplace: '澳门一间合成华文报刊与印务所', duties: '核本地稿件、来函、铅字、版面、勘误与作者印工结算', terms: '按期试做并核具体职责；报馆关系不自动生成任何政治或秘密身份' },
    'southeast-asia': { track: 'literate', role: '新加坡华文报刊编辑与校对员', casualRole: '华文报馆临时抄稿与校样员', workplace: '新加坡一间合成华文报馆', duties: '核港区与社区稿件、采访同意、工作用语、校样、发行和读者来信', terms: '先按三期试做，工钱按期结；语言、住房和工作资格逐项处理' },
  };
  C.post1949RouteJobs[ROUTE_LIBRARY] = {
    mainland: { track: 'literate', role: '图书编目与读者服务员', casualRole: '图书整理与卡片编目临时员', workplace: '当地合成学校图书室与公共阅览点', duties: '核入藏来源、作者题名版本、架位、借还、读者查询与受潮书状态', terms: '先按一批书试做，留用后按月领薪；馆藏、私人题记和研究贡献仍分别登记' },
    'hong-kong': { track: 'literate', role: '学校图书馆编目与参考员', casualRole: '学校图书室临时整理员', workplace: '香港一所合成学校图书馆', duties: '编制中外文目录卡、核赠书权属、处理借还和具名参考问题', terms: '先按一个学期试做，住处、语言和机构权限另行确认' },
    taiwan: { track: 'literate', role: '图书馆编目与参考服务员', casualRole: '馆藏清点与卡片临时员', workplace: '台湾一间合成公共图书机构', duties: '清点来源与状态、核版本和目录、接读者查询并记录未找到结果', terms: '先按一批馆藏试做，留用后按月领薪；外借和复制权限另行答复' },
    overseas: { track: 'literate', role: '华人学校图书与资料服务员', casualRole: '侨社资料室临时整理员', workplace: '落脚城市一所合成华人学校与资料室', duties: '核捐赠来源、编目双语资料、处理借阅与家书查询并保护私人记录', terms: '按学期或项目结算，语言学习、居留和工作资格分别办理' },
    'in-motion': { track: 'literate', role: '流动学校图书与资料管理员', casualRole: '临时书箱与名册整理员', workplace: '当前落脚地的合成临时学校与书箱点', duties: '逐箱核书目、来源、借出人、受损状态和下一移交地址', terms: '按迁移批次结算；找不到的书和人保留最后记录，不补成毁坏或死亡' },
    unsettled: { track: 'literate', role: '地方阅览与编目员', casualRole: '阅览室临时清点员', workplace: '暂住地一间合成学校阅览室', duties: '核新旧图书来源、卡片、架位、借还、修护和读者问题', terms: '先按一批书与一个月阅览服务试做，再答复是否续工' },
    macau: { track: 'literate', role: '澳门阅览室编目与参考员', casualRole: '澳门资料室临时整理员', workplace: '澳门一间合成学校阅览室与资料馆', duties: '核中外文版本、捐赠与寄存、目录、读者查询、旧刊修护和归还', terms: '按项目与月分别结算；馆藏知识不自动生成所有权或秘密权限' },
    'southeast-asia': { track: 'literate', role: '新加坡学校图书与资料服务员', casualRole: '华校资料室临时编目员', workplace: '新加坡一所合成华校图书室', duties: '核华文与工作用语资料、捐赠来源、编目、借还、读者查询和受潮状态', terms: '先按一个学期试做；住房、语言、资格与工资逐项答复' },
  };
  Object.keys(C.post1949RouteJobs[ROUTE_PRESS]).forEach(function (destination) {
    Object.assign(C.post1949RouteJobs[ROUTE_PRESS][destination], {
      lighterRole: '审稿、校样与新人带教员',
      lighterDuties: '减少外勤和夜班，复核稿件来源、校样、勘误与稿酬记录，并带新人熟悉可公开说明的编辑流程',
    });
  });
  Object.keys(C.post1949RouteJobs[ROUTE_LIBRARY]).forEach(function (destination) {
    Object.assign(C.post1949RouteJobs[ROUTE_LIBRARY][destination], {
      lighterRole: '编目复核、参考咨询与新人带教员',
      lighterDuties: '减少重件搬运，复核入藏来源、版本、编目、借阅隐私与未找到答复，并带新人熟悉移交记录',
    });
  });
  var postRoutePeople = {
    mainland: { press: ['编辑主任杜明川', '校对员周雪芹', '来信读者罗惠生'], library: ['图书室负责人韩素文', '编目员方静宜', '查资料的教师贺兰生'] },
    'hong-kong': { press: ['编辑梁少瑜', '校对员何婉贞', '社区通讯人陈启华'], library: ['馆务主任许佩云', '编目员郭瑞安', '查书学生冯美仪'] },
    taiwan: { press: ['出版编辑林景衡', '校对员张素真', '投稿作者吴明洁'], library: ['馆务负责人邱志远', '编目员叶淑娟', '参考读者高文庆'] },
    overseas: { press: ['华文编辑郑安福', '校对员黄玉莲', '侨社通讯人赵仁和'], library: ['资料室负责人许文德', '编目员林惠珠', '查家书的读者陈慧兰'] },
    'in-motion': { press: ['通讯点经手人孟承志', '校样员姜素华', '等待转寄的读者秦良生'], library: ['临时学校负责人徐玉真', '书箱登记员宋家和', '查借书记录的学生周平安'] },
    unsettled: { press: ['印务负责人潘维清', '校样员陆雅琴', '托印启事的顾客沈瑞生'], library: ['阅览室负责人唐静修', '清点员叶曼云', '来查旧刊的教员冯守义'] },
    macau: { press: ['华文编辑李景鸿', '校对员郑慧贞', '本地来信人梁婉仪'], library: ['资料馆负责人何卓文', '编目员麦瑞莲', '查旧报的读者陈庆安'] },
    'southeast-asia': { press: ['华文编辑陈国安', '校对员林美珠', '港区通讯人郑惠兰'], library: ['华校馆务员黄秀琴', '编目员郭文成', '查华文资料的学生林德义'] },
  };
  Object.keys(postRoutePeople).forEach(function (destination) {
    [['press', ROUTE_PRESS], ['library', ROUTE_LIBRARY]].forEach(function (pair) {
      var people = postRoutePeople[destination][pair[0]];
      Object.assign(C.post1949RouteJobs[pair[1]][destination], {
        supervisor: people[0], supervisorRole: '按具体职责、工钱、权限与是否留用给答复的人',
        colleague: people[1], colleagueRole: '有自己的工资、身体、家庭与去留决定的同事',
        publicPerson: people[2], publicRole: pair[0] === 'press' ? '决定来稿、采访、署名或私人材料范围的往来者' : '带着具体问题、期限和隐私边界使用资料的人',
      });
    });
  });

  Object.assign(C.routeContactProfiles, {
    'shen-higher-study': [
      { id: 'd19_gu_qingyi', label: '顾清仪', role: '按课程、报告、考核和研究范围给答复的导师', status: 'supervisor', relation: 24, born: 1883 },
      { id: 'd19_he_peizhen', label: '何佩贞', role: '核学费、学籍、缺课、宿舍和结业手续的教务登记员', status: 'colleague', relation: 22, born: 1890 },
      { id: 'd19_zhou_yingqiu', label: '周映秋', role: '有自己课程、费用、家门和转科决定的女同学', status: 'coworker', relation: 31, born: 1908 },
      { id: 'd19_shen_jingwen', label: '沈静文', role: '在兼职、家款和毕业去向之间作自己选择的男同学', status: 'coworker', relation: 28, born: 1907 },
      { id: 'd19_luo_suying', label: '罗素英', role: '按课时学习并由自己和家长决定是否续课的辅导学生', status: 'nearby', relation: 24, born: 1914 },
      { id: 'd19_xu_yizhou', label: '徐宜舟', role: '只对一学期课程、住处和承认学分作答的外校联络人', status: 'distant', relation: 18, born: 1888 },
    ],
    'shen-news-publishing': [
      { id: 'd21_qin_zhiwen', label: '秦知闻', role: '按稿件、来源、版面、稿酬和采用给答复的编辑', status: 'supervisor', relation: 23, born: 1884 },
      { id: 'd21_tang_manzhen', label: '唐曼贞', role: '有自己工资、署名、眼病、家人和离职决定的校对同事', status: 'coworker', relation: 31, born: 1905 },
      { id: 'd21_lu_yunsheng', label: '陆云生', role: '有自己采访来源、安全边界和改行决定的记者同事', status: 'coworker', relation: 27, born: 1903 },
      { id: 'd21_wu_deyuan', label: '吴德元', role: '按铅字、印张、工时、纸张和返工结算的印工', status: 'colleague', relation: 25, born: 1889 },
      { id: 'd21_fan_yirong', label: '范宜蓉', role: '决定采访范围、匿名与撤回私人材料的读者和采访对象', status: 'nearby', relation: 22, born: 1898 },
      { id: 'd21_chen_yixiu', label: '陈宜修', role: '保留原稿、署名和撤稿权并等待稿酬答复的作者', status: 'distant', relation: 21, born: 1892 },
    ],
    'shen-library-research': [
      { id: 'd24_song_qizhang', label: '宋启章', role: '按入藏、权限、项目、工资和移交给答复的馆长', status: 'supervisor', relation: 23, born: 1880 },
      { id: 'd24_luo_wenqing', label: '罗文清', role: '有自己编目贡献、工资、身体和去留的同事', status: 'coworker', relation: 31, born: 1904 },
      { id: 'd24_he_ruilan', label: '何瑞兰', role: '只承接列明装订与可逆修护工序的旧书修护人', status: 'colleague', relation: 25, born: 1886 },
      { id: 'd24_xu_zhenghe', label: '徐正和', role: '按范围、经费、资料权限和署名委托研究的学者', status: 'distant', relation: 20, born: 1882 },
      { id: 'd24_jiang_suyan', label: '蒋素言', role: '带着具体问题、期限和隐私边界来查资料的读者', status: 'nearby', relation: 23, born: 1901 },
      { id: 'd24_huang_jingyi', label: '黄敬仪', role: '对版本状态、馆际查询和是否借出另行答复的外馆员', status: 'distant', relation: 19, born: 1890 },
    ],
  });

  Object.assign(C.healthProfiles, {
    'shen-higher-study': ['长期阅读、灯光与书写造成的眼痛、头痛和颈肩手腕劳损', '膳宿不足、通学、考试与兼职造成的胃痛、发热和睡眠紊乱', '费用、成绩、婚家、住宿和去向压力造成的反复失眠与焦虑'],
    'shen-news-publishing': ['夜间校样、铅字、粉尘和久坐造成的眼痛、咳嗽、头痛与颈肩手腕劳损', '外勤、赶版、饮食不定和印刷环境造成的发热、胃痛与睡眠紊乱', '来源风险、勘误、停刊、欠薪和关系冲突造成的失眠与焦虑'],
    'shen-library-research': ['长期伏案、取书、搬运与细小字体造成的眼痛、腰背肩臂和手指劳损', '旧书粉尘、霉菌、寒湿书库和饮食不定造成的咳嗽、过敏与胃肠不适', '状态不明、署名争议、经费、读者等待与战时迁移造成的失眠和焦虑'],
  });

  Object.assign(C.publicRouteProfiles, {
    'shen-higher-study': { publicGroup: '合成的公开学生刊物、课程与膳宿互助簿', publicRole: '核公开课程、学费、住宿、刊物劳动和学生互助答复', covertRole: '学生身份、识字和同学关系不自动生成党籍、卧底、情报或秘密资格', infiltrationRole: '不以宿舍、课程表、学生名册或书信提供现实隐蔽教程，公开学习与高风险事务分开', contact: { id: 'public_d19', label: '许怀真', role: '登记公开课程、住宿与学生互助答复的经手人', status: 'colleague', relation: 19, born: 1893 } },
    'shen-news-publishing': { publicGroup: '合成的公开报刊、勘误、作者与读者事务簿', publicRole: '核公开来源、勘误、稿酬、读者来信和民生信息答复', covertRole: '记者身份、消息来源和公共表达不自动生成党籍、卧底、叛徒或秘密权限', infiltrationRole: '不以采访、印刷、发行、地址簿或版面提供现实可复用隐蔽方法，秘密状态必须另经选择与答复', contact: { id: 'public_d21', label: '梁书平', role: '登记公开勘误、稿酬和读者事务答复的经手人', status: 'colleague', relation: 20, born: 1891 } },
    'shen-library-research': { publicGroup: '合成的公开阅览、馆际目录与研究事务簿', publicRole: '核公开馆藏状态、读者查询、研究贡献、归还与移交答复', covertRole: '馆藏知识、地址和研究关系不自动生成党籍、秘密联络或情报身份', infiltrationRole: '不以索书号、书库、借阅记录和装箱清单提供现实隐蔽教程，个人隐私与公共目录分开', contact: { id: 'public_d24', label: '叶静秋', role: '登记公开阅览、馆际查询和归还答复的经手人', status: 'colleague', relation: 20, born: 1894 } },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('literate', ROUTE_STUDY);
  addRouteToTrack('literate', ROUTE_PRESS);
  addRouteToTrack('literate', ROUTE_LIBRARY);

  C.events.push(
    { id: 'd19-coeducation-1920', year: 1920, eraBrief: true, eraScope: '高等教育中的男女同校变化', families: ['jiangnanshen'], genders: ['女'], title: '部分高等学校开始正式招收女学生', knownThrough: ['newspaper', 'books'], delta: { knowledge: 1, mind: 1 }, knownText: '你从学校与报刊知道部分高校已经招收女学生；制度入口扩大，却不取消学费、住宿、家门和就业门槛。', unknownText: '家里先听说外地已有女子进入大学，但具体学校、考试、费用和住处仍需逐项核实。', fact: '1920 年前后，中国部分高等学校开始正式招收女学生，男女同校成为教育制度变化的一部分。', historySource: { label: '南京大学：百年前的男女同校与女大学生', url: 'https://www.nju.edu.cn/info/3191/178921.htm' } },
    { id: 'd24-union-catalog-1929', year: 1929, eraBrief: true, eraScope: '全国图书联合目录工作', routes: ALL_ROUTES, title: '跨馆书目协作开始形成更系统的联合目录', knownThrough: ['books', 'newspaper'], delta: { knowledge: 1, network: 1 }, knownText: '你知道 1929 年起出现全国图书联合目录工作；它依靠卡片、版本核对与馆际回函，不代表所有书都能外借。', unknownText: '馆员先收到外馆查询和抄卡要求，只知道本馆要核题名、版本与状态；更大协作范围仍从公开材料了解。', fact: '1929 年起，国立北平图书馆等机构开展全国图书联合目录工作。', historySource: { label: '国家图书馆：馆史沿革', url: 'https://www.nlc.cn/web/dsb_footer/gygt/lsyg/index_3.shtml' } },
    { id: 'd19-campus-return-1946', year: 1946, eraBrief: true, eraScope: '战后学校复员与教学重建', routes: ALL_ROUTES, title: '战后学校、宿舍、课程和资料开始复员重建', knownThrough: ['books', 'newspaper', 'letters'], delta: { knowledge: 1, position: -1 }, knownText: '你从校友、报刊或馆际消息知道学校复员涉及校舍、宿舍、课程、考试和物资，不是一句“恢复上课”。', unknownText: '旧同事先传来校舍和课程将恢复的消息，具体岗位、住处、薪水和资料仍要等具名答复。', fact: '1946 年前后，战时迁移的高校陆续复员，教学、宿舍与物资在困难中重新安排。', historySource: { label: '南京大学校友会：1946 年复员前后的国立中央大学', url: 'https://alumni.nju.edu.cn/49/d2/c58548a674258/page.htm' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
