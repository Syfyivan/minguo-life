// 民国人生 · 模拟系统层 · 共享数据与规则
// 被 action-tables.html 与 prototype.html 共用；纯数据 + 公式，无副作用。
// 注意：所有属性点/资源/概率参数均为【设计示意值】，需试玩校准；史实事件为真实。
(function () {
  var M = {};

  // ---------- 全局平衡参数 ----------
  M.balance = {
    slots: ['morning', 'noon', 'evening', 'night'], // 一天四时段
    slotLabel: { morning: '晨 卯—辰', noon: '午 巳—未', evening: '晚 申—酉', night: '夜 戌—亥' },
    spiritMax: 12,        // 每日精神/体力上限
    tiredPenalty: 0.5,    // 精神耗尽后，当日后续行动产出打 5 折
    marginalBase: 20,     // 边际递减：单次基准收益
    marginalK: 0.18,      // 边际递减系数 gain(n)=base/(1+k*(n-1))
    monthDays: 30, daysPerXun: 10 // 一月三旬
  };

  // ---------- 六维属性 ----------
  M.attrs = [
    { key: 'body', name: '体魄', color: '#a5342c' },
    { key: 'knowledge', name: '学识', color: '#356b64' },
    { key: 'craft', name: '手艺', color: '#c98a1a' },
    { key: 'mind', name: '心智', color: '#8a6d3b' },
    { key: 'network', name: '人脉', color: '#6a8caf' },
    { key: 'fame', name: '声望', color: '#9c5b8f' }
  ];

  // ---------- 四类资源 ----------
  M.resources = [
    { key: 'money', name: '钱财', color: '#c98a1a', desc: '铜钱/银元/法币 · 通胀会清零' },
    { key: 'health', name: '健康', color: '#a5342c', desc: '过劳/疾病/战乱骤降 · 难恢复' },
    { key: 'relation', name: '关系账', color: '#6a8caf', desc: '家庭/恩义/债务 · 可透支断裂' },
    { key: 'position', name: '处境', color: '#356b64', desc: '房产/田契/户籍/身份 · 被政权改写' }
  ];

  // ---------- 属性分级门槛（累计点数 → 等级） ----------
  // 通用五级；不同属性套用不同名称
  M.levelCuts = [0, 30, 60, 100, 150]; // 达到该累计点数即进入对应等级
  M.levelNames = {
    knowledge: ['蒙昧', '识字', '通文', '秀才之才', '学者'],
    body: ['孱弱', '寻常', '强健', '筋骨过人', '铁打之身'],
    craft: ['生手', '入门', '熟练', '匠人', '大师'],
    mind: ['懵懂', '明理', '通达', '沉稳', '洞明'],
    network: ['孤身', '有相识', '有靠山', '八方通', '手眼通天'],
    fame: ['无名', '乡里知', '一方闻', '远近扬', '名动天下']
  };
  M.levelOf = function (val) {
    var lv = 0;
    for (var i = 0; i < M.levelCuts.length; i++) if (val >= M.levelCuts[i]) lv = i;
    return lv; // 0..4
  };

  // ---------- 边际递减 ----------
  M.marginalGain = function (baseOut, timesDoneThisXun) {
    var b = M.balance;
    var factor = 1 / (1 + b.marginalK * timesDoneThisXun);
    return Math.round(baseOut * factor * 10) / 10;
  };

  // ---------- 六种出身的行动表 ----------
  // 每个行动：id/name/slots(可用时段)/spirit(精神消耗)/out(属性资源增量)/gate(门槛,可空)/note
  M.origins = {
    tenant: {
      key: 'tenant', name: '佃农之子', person: '李根生', gender: '男', born: 1908, place: '苏北乡村',
      motif: '交不完的租、还不清的债；唯有时代翻天，才第一次拥有自己的地。',
      start: { body: 82, knowledge: 15, craft: 70, mind: 40, network: 20, fame: 10 },
      startRes: { money: 8, health: 85, relation: 60, position: 20 },
      actions: [
        { id: 'farm', name: '下田佃作', slots: ['morning', 'noon'], spirit: 4, out: { body: 8, craft: 4 }, note: '雨天不可；主力生计' },
        { id: 'hire', name: '给东家打短工', slots: ['noon', 'evening'], spirit: 3, out: { craft: 6, network: 3, money: 3 }, note: '看东家脸色，声望有风险' },
        { id: 'night-school', name: '夜校识字', slots: ['night'], spirit: 3, out: { knowledge: 9, mind: 4 }, gate: { money: 1 }, note: '需交学费；耗精神' },
        { id: 'care-mother', name: '照料病母', slots: ['morning', 'noon', 'evening', 'night'], spirit: 2, out: { mind: 5, relation: 4 }, note: '占一格，不产钱' },
        { id: 'market', name: '赶集卖粮', slots: ['morning'], spirit: 3, out: { money: 8, network: 2 }, xun: [0, 2], note: '仅上/下旬市集日' },
        { id: 'rest', name: '听书歇脚', slots: ['evening', 'night'], spirit: -3, out: { mind: 3 }, note: '回复精神，防过劳' },
        { id: 'militia-run', name: '躲抓丁', slots: ['morning', 'noon', 'evening', 'night'], spirit: 5, out: { body: 2, mind: 2 }, event: true, note: '兵灾时被迫，占满精力' }
      ]
    },
    gentrywoman: {
      key: 'gentrywoman', name: '士绅之女', person: '沈毓秀', gender: '女', born: 1906, place: '江南城镇',
      motif: '缠足与放足、父母之命与自由恋爱；娜拉出走之后，靠什么活下去？',
      start: { body: 45, knowledge: 78, craft: 30, mind: 72, network: 55, fame: 60 },
      startRes: { money: 40, health: 70, relation: 75, position: 65 },
      actions: [
        { id: 'girls-school', name: '进女学读书', slots: ['morning', 'noon'], spirit: 3, out: { knowledge: 8, mind: 4 }, gate: { money: 2 }, note: '家里开明才准；核心上升通道' },
        { id: 'embroider', name: '女红刺绣', slots: ['noon', 'evening'], spirit: 2, out: { craft: 6, fame: 1 }, note: '闺阁本分，可换零钱' },
        { id: 'read-newspaper', name: '读报结社', slots: ['evening', 'night'], spirit: 3, out: { knowledge: 5, network: 4, mind: 3 }, note: '接触新思潮，人脉扩展' },
        { id: 'social', name: '应酬交际', slots: ['noon', 'evening'], spirit: 2, out: { network: 5, fame: 3 }, note: '维系家族关系网' },
        { id: 'resist-marriage', name: '抗拒婚约', slots: ['morning', 'noon', 'evening', 'night'], spirit: 6, out: { mind: 8, fame: 2, relation: -6 }, gate: { mind: 60 }, note: '心智够高才敢；损家庭关系' },
        { id: 'teach-self', name: '靠学识自立', slots: ['morning', 'noon'], spirit: 4, out: { knowledge: 4, money: 6, fame: 3 }, gate: { knowledge: 60 }, note: '出走后的生计；需通文级' },
        { id: 'rest-w', name: '静养读诗', slots: ['night'], spirit: -3, out: { mind: 3 }, note: '回复精神' }
      ]
    },
    millworker: {
      key: 'millworker', name: '纱厂女工', person: '陈阿宝', gender: '女', born: 1910, place: '苏北→上海',
      motif: '被包身契卖进日商纱厂当童工，却在压榨、罢工与夜校里第一次握住工钱与婚姻。',
      start: { body: 60, knowledge: 8, craft: 55, mind: 45, network: 25, fame: 5 },
      startRes: { money: 3, health: 55, relation: 40, position: 10 },
      actions: [
        { id: 'mill-shift', name: '纱厂做工', slots: ['morning', 'noon', 'evening'], spirit: 5, out: { craft: 7, money: 4, health: -3 }, note: '12小时工，伤身；主力生计' },
        { id: 'workers-school', name: '工人夜校', slots: ['night'], spirit: 3, out: { knowledge: 9, mind: 4, network: 3 }, note: '第一次识字；结识工友' },
        { id: 'strike', name: '参与罢工', slots: ['morning', 'noon', 'evening', 'night'], spirit: 6, out: { mind: 6, network: 5, fame: 4, money: -2 }, gate: { network: 30 }, event: true, note: '有靠山才敢；扣工钱有风险' },
        { id: 'save-wage', name: '攒工钱', slots: ['evening'], spirit: 1, out: { money: 3, mind: 2 }, note: '省吃俭用；对抗包身契' },
        { id: 'help-fellow', name: '帮衬同乡', slots: ['noon', 'evening'], spirit: 2, out: { network: 4, relation: 3 }, note: '底层互助网' },
        { id: 'rest-m', name: '亭子间歇息', slots: ['night'], spirit: -4, out: { health: 2 }, note: '回复精神与健康' }
      ]
    },
    scholar: {
      key: 'scholar', name: '读书人', person: '沈砚之', gender: '男', born: 1912, place: '江南城镇',
      motif: '科举已废，旧学无用；沿"新学→留学→教授/办报"走，却在盛年撞上抗战与通胀。',
      start: { body: 50, knowledge: 82, craft: 20, mind: 65, network: 50, fame: 55 },
      startRes: { money: 45, health: 72, relation: 70, position: 60 },
      actions: [
        { id: 'study-new', name: '新式学堂苦读', slots: ['morning', 'noon'], spirit: 4, out: { knowledge: 9, mind: 3 }, gate: { money: 2 }, note: '主升学识；需学费' },
        { id: 'write-essay', name: '撰文投稿', slots: ['evening', 'night'], spirit: 4, out: { knowledge: 4, fame: 5, money: 3 }, gate: { knowledge: 60 }, note: '通文级可换稿费与名声' },
        { id: 'debate-club', name: '结社论政', slots: ['evening'], spirit: 3, out: { network: 5, mind: 4, fame: 2 }, note: '同人圈；抗战中有风险' },
        { id: 'prep-abroad', name: '备考留学', slots: ['morning', 'noon', 'night'], spirit: 5, out: { knowledge: 6, mind: 3 }, gate: { knowledge: 100 }, note: '秀才之才方可；通向"衣锦还乡"' },
        { id: 'tutor', name: '课徒授业', slots: ['noon', 'evening'], spirit: 3, out: { money: 6, fame: 3, network: 2 }, gate: { knowledge: 60 }, note: '教书糊口' },
        { id: 'march-southwest', name: '随校南迁', slots: ['morning', 'noon', 'evening', 'night'], spirit: 7, out: { body: 3, mind: 6, fame: 3, health: -4 }, event: true, note: '抗战步行南迁；极耗体力' },
        { id: 'rest-s', name: '临帖静思', slots: ['night'], spirit: -3, out: { mind: 3 }, note: '回复精神' }
      ]
    },
    capitalist: {
      key: 'capitalist', name: '资本家之子', person: '顾承业', gender: '男', born: 1908, place: '上海租界',
      motif: '生在实业顶点，却要接过在列强、官僚资本、战火与通胀间反复被碾的家业。',
      start: { body: 55, knowledge: 68, craft: 22, mind: 58, network: 88, fame: 80 },
      startRes: { money: 90, health: 75, relation: 70, position: 85 },
      actions: [
        { id: 'learn-biz', name: '随父学商', slots: ['morning', 'noon'], spirit: 3, out: { craft: 4, network: 5, mind: 3 }, note: '接班训练；主升人脉' },
        { id: 'foreign-college', name: '入洋学堂', slots: ['morning', 'noon'], spirit: 4, out: { knowledge: 8, fame: 3 }, gate: { money: 3 }, note: '新式教育；学费高' },
        { id: 'socialite', name: '交际应酬', slots: ['evening', 'night'], spirit: 2, out: { network: 6, fame: 4, money: -2 }, note: '舞厅酒会；烧钱攒人脉' },
        { id: 'run-mill', name: '打理纱厂', slots: ['morning', 'noon', 'evening'], spirit: 5, out: { money: 10, craft: 3, network: 3 }, gate: { network: 60 }, note: '有靠山方可掌事；主力产钱' },
        { id: 'bribe-official', name: '打点官场', slots: ['evening'], spirit: 3, out: { position: 5, network: 4, money: -4 }, note: '换处境安全；花钱' },
        { id: 'flee-inflation', name: '抢购保值', slots: ['morning', 'noon', 'evening', 'night'], spirit: 5, out: { position: 3, money: -2 }, event: true, note: '恶性通胀时抢购实物' },
        { id: 'rest-c', name: '西式休养', slots: ['night'], spirit: -4, out: { health: 3, mind: 2 }, note: '回复精神健康' }
      ]
    },
    refugee: {
      key: 'refugee', name: '难民/流亡者', person: '赵长庚', gender: '男', born: 1905, place: '华北→西南流亡',
      motif: '断崖式流亡：家园沦陷、一路南逃，在颠沛中守住性命与最后一点尊严。',
      start: { body: 65, knowledge: 40, craft: 45, mind: 55, network: 30, fame: 25 },
      startRes: { money: 15, health: 50, relation: 35, position: 5 },
      actions: [
        { id: 'flee', name: '赶路南逃', slots: ['morning', 'noon'], spirit: 5, out: { body: 3, mind: 3, health: -3 }, note: '逃难主线；耗体力' },
        { id: 'odd-job', name: '沿途做工', slots: ['noon', 'evening'], spirit: 4, out: { craft: 4, money: 3 }, note: '换口粮盘缠' },
        { id: 'beg-help', name: '求助赈济', slots: ['morning', 'evening'], spirit: 2, out: { money: 2, relation: 2, fame: -1 }, note: '难民收容；伤自尊' },
        { id: 'join-group', name: '结伴同行', slots: ['evening', 'night'], spirit: 2, out: { network: 5, mind: 3 }, note: '抱团取暖，安全感' },
        { id: 'protect-family', name: '护送家人', slots: ['morning', 'noon', 'evening', 'night'], spirit: 6, out: { relation: 6, mind: 4, health: -2 }, note: '占满精力；守住关系' },
        { id: 'settle-try', name: '寻地落脚', slots: ['noon', 'evening'], spirit: 4, out: { position: 4, network: 2 }, gate: { money: 5 }, note: '攒够盘缠才可能安家' },
        { id: 'rest-r', name: '路边歇脚', slots: ['night'], spirit: -3, out: { health: 2 }, note: '回复精神' }
      ]
    }
  };

  // ---------- 年度事件（门槛 + 成败概率），供曲线打点 ----------
  // trigger: {year? 或 attr门槛}；chance: 由某些属性/资源线性决定；success/fail: 后果
  M.events = {
    tenant: [
      { id: 'flood-1931', year: 1931, name: '江淮大水', desc: '1931 特大洪灾，颗粒无收', effect: { money: -6, health: -5, position: -3 }, hist: 'HI' },
      { id: 'conscript', year: 1937, name: '兵灾抓丁', desc: '抗战爆发，壮丁被抓', gate: { body: 60 },
        chanceBy: ['mind', 'network'], success: { desc: '躲过抓丁', mind: 4 }, fail: { desc: '被抓走当兵', health: -8, relation: -5 }, hist: 'HI' },
      { id: 'landreform', year: 1949, name: '土地改革', desc: '第一次分到自己的地', effect: { position: 30, fame: 6 }, hist: 'HI' }
    ],
    gentrywoman: [
      { id: 'footbind-ban', year: 1912, name: '禁缠足令', desc: '孙中山禁缠足，得以放足', effect: { body: 10, mind: 3 }, hist: 'HI' },
      { id: 'run-away', year: 1926, name: '出走抉择', desc: '娜拉时刻：是否出走', gate: { mind: 100, knowledge: 60 },
        chanceBy: ['mind', 'network', 'money'], success: { desc: '成功出走并自立', fame: 8, position: -20, money: -10 }, fail: { desc: '被迫回家', mind: -6, relation: -4 }, hist: 'MID' },
      { id: 'war-mobilize', year: 1937, name: '抗战妇女动员', desc: '投身战时妇女工作', gate: { fame: 60 }, effect: { fame: 6, network: 5, health: -3 }, hist: 'HI' }
    ],
    millworker: [
      { id: 'contract', year: 1922, name: '包身契', desc: '被卖进日商纱厂当童工', effect: { money: -3, health: -5, position: -5, relation: -4 }, hist: 'HI' },
      { id: 'big-strike', year: 1925, name: '五卅罢工', desc: '大罢工爆发，是否参与', gate: { network: 30 },
        chanceBy: ['network', 'mind'], success: { desc: '罢工胜利，工钱提高', money: 5, fame: 5, network: 4 }, fail: { desc: '被开除上黑名单', money: -4, position: -3 }, hist: 'HI' },
      { id: 'own-wage', year: 1930, name: '赎身自立', desc: '攒够钱赎回自由身', gate: { money: 30 }, effect: { position: 15, mind: 5, fame: 3 }, hist: 'MID' }
    ],
    scholar: [
      { id: 'exam-abroad', year: 1934, name: '留学考试', desc: '清华留美预备，是否考取', gate: { knowledge: 100 },
        chanceBy: ['knowledge', 'mind'], success: { desc: '考取留学，衣锦还乡', fame: 12, network: 6, money: 8 }, fail: { desc: '落第，转教书办报', fame: 3, mind: -3 }, hist: 'HI' },
      { id: 'lianda', year: 1937, name: '西南联大南迁', desc: '随校步行南迁三千里', effect: { mind: 8, fame: 4, health: -6, body: 3 }, hist: 'HI' },
      { id: 'inflation-45', year: 1945, name: '战后恶性通胀', desc: '教授薪水一夜蒸发', effect: { money: -15, mind: -4 }, hist: 'HI' }
    ],
    capitalist: [
      { id: 'take-over', year: 1935, name: '接掌家业', desc: '父病，接过纱厂', gate: { network: 60 },
        chanceBy: ['network', 'knowledge'], success: { desc: '平稳接班', money: 12, fame: 5 }, fail: { desc: '经营失手', money: -10, position: -5 }, hist: 'MID' },
      { id: 'war-loss', year: 1937, name: '八一三·厂毁', desc: '淞沪会战，纱厂化为焦土', effect: { money: -20, position: -15, health: -3 }, hist: 'HI' },
      { id: 'gold-yuan', year: 1948, name: '金圆券崩溃', desc: '强制兑金圆券，家产清零', effect: { money: -30, position: -10 }, hist: 'HI' }
    ],
    refugee: [
      { id: 'homeland-fall', year: 1937, name: '家园沦陷', desc: '华北失守，被迫南逃', effect: { position: -10, health: -5, relation: -3 }, hist: 'HI' },
      { id: 'road-crisis', year: 1938, name: '流亡途中', desc: '关卡、轰炸、疫病', gate: { body: 60 },
        chanceBy: ['body', 'mind', 'network'], success: { desc: '一家平安抵达后方', mind: 6, relation: 5 }, fail: { desc: '途中失散/病亡', relation: -10, health: -6 }, hist: 'HI' },
      { id: 'resettle', year: 1940, name: '后方落脚', desc: '在西南寻得栖身之所', gate: { money: 5 }, effect: { position: 12, network: 4, mind: 4 }, hist: 'MID' }
    ]
  };

  // ---------- 事件成败概率：由指定属性/资源归一化平均决定 ----------
  M.eventChance = function (ev, state) {
    if (!ev.chanceBy) return 1;
    var sum = 0, n = 0;
    ev.chanceBy.forEach(function (k) {
      var v = state[k] != null ? state[k] : 0;
      sum += Math.min(1, v / 120); // 以120为满参考
      n++;
    });
    var base = n ? sum / n : 0.5;
    return Math.max(0.1, Math.min(0.92, 0.25 + base * 0.7)); // 概率区间 0.1~0.92
  };

  // ---------- 门槛判定 ----------
  M.meetGate = function (gate, state) {
    if (!gate) return true;
    for (var k in gate) if ((state[k] || 0) < gate[k]) return false;
    return true;
  };

  // ---------- 时代乘子（对钱财/处境的年度冲击系数，示意） ----------
  M.eraMultiplier = function (year) {
    if (year >= 1946) return { money: 0.5, position: 0.85 };   // 战后恶性通胀
    if (year >= 1937) return { money: 0.8, position: 0.7 };    // 抗战
    if (year >= 1931) return { money: 0.92, position: 0.9 };   // 九一八后
    return { money: 1, position: 1 };
  };

  // ===================================================================
  // 两层人生模型（试点）：出生家庭（起点，开局给定） → 人生路径（过程走出来）
  //   · 修正旧模型"出生即职业"的荒谬：出生只定 家庭/地域/性别/初始点，
  //     职业（女工/佃农/难民…）靠"关键事件分叉 + 行动积累"走出来。
  //   · 复用现有六条 origin 线：track.fromOrigin 直接借其 actions/events，
  //     不重复造数据；六条 origin 保留作对照，引擎两种模式并存。
  //   · 所有条件/年份为【设计示意值】，需试玩校准；史实骨架沿用 HI/MID/LO。
  // ===================================================================
  // ---------- 童年通用行动（幼年层，解决"0-6 岁只能照顾病母"） ----------
  //   没人一出生就下田/做工/读大书；孩子的日子是玩、帮家务、放牛拾柴、(供得起才)开蒙。
  //   stageMax：过了这个阶段该童年行动自然淡出（长大就不做了），由引擎按世界层阶段过滤。
  //   这些行动不挂靠世界层场景（actionAvailable 对未挂场景者放行），仅受 stageMax 约束。
  M.childhood = [
    { id: 'play', name: '村口玩耍', slots: ['morning', 'noon', 'evening'], spirit: -2, out: { mind: 2, body: 1 }, stageMax: 'schoolage', note: '孩子的天性；跑跳玩闹，回点精神' },
    { id: 'chores', name: '帮做家务', slots: ['morning', 'noon', 'evening'], spirit: 2, out: { craft: 3, relation: 2 }, stageMax: 'schoolage', note: '烧火、带弟妹、洒扫；讨长辈欢心' },
    { id: 'graze', name: '放牛拾柴', slots: ['morning', 'noon'], spirit: 3, out: { body: 3, money: 1 }, stageMax: 'schoolage', note: '农家娃的活计，也能换点零钱' },
    { id: 'tag-along', name: '跟大人赶集', slots: ['morning'], spirit: 2, out: { network: 2, mind: 2 }, stageMax: 'schoolage', note: '看热闹、长见识，认得几个乡邻' },
    { id: 'enlighten-read', name: '描红认字', slots: ['evening', 'night'], spirit: 2, out: { knowledge: 4, mind: 2 }, gate: { money: 1 }, stageMax: 'youth', note: '供得起笔墨才有；开蒙第一步' }
  ];

  M.families = {
    subeipoor: {
      key: 'subeipoor', name: '苏北贫农家', place: '苏北乡村', born: 1910,
      motif: '一家人交不完的租、还不清的债。你生在这里——往后长成什么样，看时代，也看你自己走哪条路。',
      genderPool: ['男', '女'],
      // 出生家庭只给"底子"：低学识、够用的体魄手艺、几乎没钱没声望
      start: { body: 58, knowledge: 8, craft: 38, mind: 34, network: 12, fame: 6 },
      startRes: { money: 6, health: 80, relation: 60, position: 12 },
      // 通用行动 = 童年层(玩耍/家务/放牛/赶集/开蒙) + 学龄后层(下田/赶集卖粮/夜校)；随年龄自然切换
      commonActions: ['play', 'chores', 'graze', 'tag-along', 'care-mother', 'enlighten-read', 'farm', 'market', 'night-school', 'rest'],
      // 这个家庭能长出的人生路径（主干固定、有历史逻辑）
      tracks: ['sold-mill', 'flee-refugee', 'stay-farm']
    },

    jiangnanshen: {
      key: 'jiangnanshen', name: '江南沈家', place: '江南城镇', born: 1908,
      motif: '书香门第，家有薄产。男丁沿"新学→留学"求功名，女儿在缠足与放足、父母之命与自由之间挣一条出路——直到抗战把满门卷进流亡。',
      genderPool: ['男', '女'],
      // 士绅家底子：学识/心智/声望偏高，有些田产铺面
      start: { body: 45, knowledge: 40, craft: 20, mind: 50, network: 45, fame: 50 },
      startRes: { money: 40, health: 72, relation: 72, position: 62 },
      // 城镇孩子：玩/家务/赶集/描红开蒙 + 学龄后苦读、应酬、静养
      commonActions: ['play', 'chores', 'tag-along', 'care-mother', 'enlighten-read', 'study-new', 'social', 'rest-s'],
      // 男→读书人主干；女→新女性主干；抗战可 override 把满门推上流亡路
      tracks: ['scholar-path', 'newwoman-path', 'flee-refugee']
    },

    shanghaigongshang: {
      key: 'shanghaigongshang', name: '上海工商家', place: '上海租界', born: 1908,
      motif: '生在实业顶点，人脉与银元堆起来的家。男丁被押着接过在列强、官僚资本、战火与通胀间反复被碾的家业；女儿则被送进洋学堂，长成一个新女性。',
      genderPool: ['男', '女'],
      // 工商家底子：人脉/声望/钱财极高，学识中等
      start: { body: 48, knowledge: 35, craft: 18, mind: 48, network: 60, fame: 65 },
      startRes: { money: 85, health: 75, relation: 68, position: 80 },
      // 租界少爷小姐：玩/家务/跟大人应酬/开蒙 + 学龄后洋学堂、交际、西式休养
      commonActions: ['play', 'chores', 'tag-along', 'care-mother', 'enlighten-read', 'foreign-college', 'socialite', 'rest-c'],
      // 男→实业接班主干；女→新女性主干（工商家不轻易变难民，靠自身事件线承接时代冲击）
      tracks: ['biz-heir', 'newwoman-path']
    }
  };

  // 人生路径：fromOrigin 指向复用哪条 origin 的行动+事件；enter 定义"何时走上这条路"
  //   enter.type: 'event'   → 命中某入口事件（含 cond 附加条件）即走上此路，并触发该事件后果
  //               'default' → 到 minAge 仍无其它分叉命中时的兜底主干
  //   enter.override:true   → 即便已在别的路径上，也能被强制切换（如战争把人变难民）
  M.tracks = {
    'sold-mill': {
      key: 'sold-mill', name: '纱厂女工', fromOrigin: 'millworker',
      enter: { type: 'event', event: 'contract', cond: { gender: '女', resLow: { money: 12 }, yearFrom: 1920 } },
      note: '家遭难、被一纸包身契卖进纱厂当童工，从此在压榨、罢工与夜校里挣命。'
    },
    'flee-refugee': {
      key: 'flee-refugee', name: '逃荒难民', fromOrigin: 'refugee',
      enter: { type: 'event', event: 'homeland-fall', cond: { yearFrom: 1937 }, override: true, chance: 0.6 },
      note: '战火烧到家门口，举家南逃，在流亡路上守住性命与最后一点尊严。'
    },
    'stay-farm': {
      key: 'stay-farm', name: '留乡佃农', fromOrigin: 'tenant',
      enter: { type: 'default', minAge: 13 },
      note: '守着几亩租田、交不完的租过一辈子，直到 1949 年第一次分到自己的地。'
    },
    // —— 江南沈家 / 上海工商家 的主干（default 型，按性别分叉；有历史逻辑，不自由发挥） ——
    'scholar-path': {
      key: 'scholar-path', name: '读书人', fromOrigin: 'scholar',
      enter: { type: 'default', minAge: 13, cond: { gender: '男' } },
      note: '科举已废，沿"新学→留学→教授/办报"走，盛年撞上抗战与通胀。'
    },
    'newwoman-path': {
      key: 'newwoman-path', name: '新女性', fromOrigin: 'gentrywoman',
      enter: { type: 'default', minAge: 13, cond: { gender: '女' } },
      note: '读女学、抗婚约、靠学识自立——娜拉出走之后，靠什么活下去。'
    },
    'biz-heir': {
      key: 'biz-heir', name: '实业接班人', fromOrigin: 'capitalist',
      enter: { type: 'default', minAge: 13, cond: { gender: '男' } },
      note: '接过纱厂家业，在列强、官僚资本、战火与恶性通胀间反复挣扎。'
    }
  };

  // 取某出身/路径的入口事件对象（供引擎在"分叉判定"时读取其后果）
  M.findEvent = function (originKey, eventId) {
    var list = M.events[originKey] || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === eventId) return list[i];
    return null;
  };

  // 按 id 在所有出身的行动表里查找一个 action（供家庭通用行动跨出身复用）
  M.findAction = function (id) {
    // 先查童年通用行动
    for (var c = 0; c < M.childhood.length; c++) if (M.childhood[c].id === id) return M.childhood[c];
    var keys = Object.keys(M.origins);
    for (var k = 0; k < keys.length; k++) {
      var acts = M.origins[keys[k]].actions;
      for (var i = 0; i < acts.length; i++) if (acts[i].id === id) return acts[i];
    }
    return null;
  };

  // 组装"当前可用行动池"：家庭通用行动 + （已走上的路径所借 origin 的行动），按 id 去重
  M.actionPoolFor = function (familyKey, trackKey) {
    var fam = M.families[familyKey];
    if (!fam) return [];
    var seen = {}, pool = [];
    function push(a) { if (a && !seen[a.id]) { seen[a.id] = 1; pool.push(a); } }
    // 幼年通用行动：跨出身按 id 全局查找（不再限定 tenant）
    (fam.commonActions || []).forEach(function (id) { push(M.findAction(id)); });
    if (trackKey && M.tracks[trackKey]) {
      var o = M.origins[M.tracks[trackKey].fromOrigin];
      if (o) o.actions.forEach(push);
    }
    return pool;
  };

  window.MINGUO = M;
})();
