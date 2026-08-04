// 民国人生 · 世界层（地图 / 场景 / 解锁 / 交互 / 日常循环 / 支线涌现）
// 建立在 actions-data.js（六维属性 body/knowledge/craft/mind/network/fame，四资源 money/health/relation/position，六出身）之上。
// 回答四个问题：① 一辈子怎么分段玩 ② 地图上有哪些场景、何时解锁 ③ 每天在每个场景分别能干什么 ④ 场景里有什么交互与支线。
// 所有数值/概率/年份门槛为【设计示意值】需试玩校准；历史骨架为真实史实（沿用 HI/MID/LO 分级）。
(function () {
  var W = {};

  // ===================================================================
  // 一、生命阶段：一辈子分七段，每段的"每日可支配格数、主母题、主线压力"不同
  //     这是"玩一辈子"的骨架——不是一路平铺，而是随年龄改变节奏与开放度。
  // ===================================================================
  W.lifeStages = [
    { key: 'infancy', name: '幼年', age: '0–6', slots: 2, note: '格数少，多由长辈代管；主要是"启蒙类型"的一次性选择。', motif: '被安排的人生底色' },
    { key: 'schoolage', name: '学龄', age: '7–12', slots: 3, note: '可自主安排 3 格；升学窗口开启，家庭经济压力第一次逼你选择。', motif: '上升通道的第一道闸' },
    { key: 'youth', name: '少年', age: '13–18', slots: 4, note: '全四格开放；婚约、辍学、进城、入学社团等分岔集中爆发。', motif: '第一次替自己拿主意' },
    { key: 'primeyouth', name: '青年', age: '19–28', slots: 4, note: '事业/学业/成家的黄金期；跨出身场景（城市、租界、学堂、工厂）大量解锁。', motif: '命运曲线爬升最陡的十年' },
    { key: 'prime', name: '壮年', age: '29–37', slots: 4, note: '抗战爆发常落在此段；主线事件密度最高，资源被时代乘子反复冲击。', motif: '被大时代直接碾过' },
    { key: 'midlife', name: '中年', age: '38–45', slots: 3, note: '精神上限下降、健康开始拖后腿；通胀/清算/去留三选一多在此段。', motif: '守成与止损' },
    { key: 'late', name: '晚年', age: '46+', slots: 2, note: '格数收缩、行动产出打折；进入结局采样与"回响道具"回收。', motif: '一生的总账' }
  ];

  // 阶段 → 每日格数（原型可据此把四时段收缩为 2/3 格）
  W.slotsByStage = function (age) {
    var s = W.lifeStages;
    for (var i = s.length - 1; i >= 0; i--) {
      var lo = parseInt(s[i].age, 10);
      if (age >= lo) return s[i].slots;
    }
    return 4;
  };
  W.stageOf = function (age) {
    var s = W.lifeStages, cur = s[0];
    for (var i = 0; i < s.length; i++) { if (age >= parseInt(s[i].age, 10)) cur = s[i]; }
    return cur;
  };

  // ===================================================================
  // 二、地图分区：8 个大区，是所有场景挂靠的容器。
  //     region.unlock 决定"这一整片区域什么时候在地图上亮起来"。
  // ===================================================================
  W.regions = [
    { key: 'home', name: '家宅', icon: '🏠', desc: '出生地。灶台、账房、病榻、祖屋——最早开放，贯穿一生。',
      unlock: { type: 'always' } },
    { key: 'village', name: '乡镇', icon: '🌾', desc: '田埂、集市、宗祠、私塾。农耕出身的主场，也是"离开"的起点。',
      unlock: { type: 'always' } },
    { key: 'school', name: '学堂', icon: '📖', desc: '新式学堂、女学、夜校、大学。上升通道的核心区。',
      unlock: { type: 'stageOrAttr', stage: 'schoolage', attrAny: { knowledge: 1 } } },
    { key: 'factory', name: '工厂码头', icon: '🏭', desc: '纱厂、面粉厂、码头、包身工宿舍。城市底层的血汗现场。',
      unlock: { type: 'eventOrCity', city: true } },
    { key: 'city', name: '城市街市', icon: '🏙️', desc: '商铺、报馆、戏园、洋行。进城后开放，是人脉与钱财的放大器。',
      unlock: { type: 'moveToCity' } },
    { key: 'concession', name: '租界', icon: '🏛️', desc: '国中之国：巡捕房、洋行、舞厅、教堂。风险与机遇同样极端。',
      unlock: { type: 'attr', attrAny: { network: 60, money: 40 } } },
    { key: 'road', name: '流亡路', icon: '🧭', desc: '难民潮、关卡、轰炸区、赈济所。由战争事件强制开启。',
      unlock: { type: 'event', anyOf: ['homeland-fall', 'war-loss', 'lianda', 'conscript'] } },
    { key: 'rear', name: '大后方', icon: '⛰️', desc: '西南联大、内迁工厂、陪都重庆。逃出生天后的重建之地。',
      unlock: { type: 'event', anyOf: ['resettle', 'lianda', 'road-crisis'] } }
  ];

  // ===================================================================
  // 三、场景清单：每个场景挂在一个 region 下，含
  //     unlock（何时解锁）、stage（推荐生命阶段）、interactions（在此能做什么交互）。
  //     interactions 分三类：
  //       action  → 复用 actions-data.js 里对应出身的日常行动（涨点）
  //       talk    → 与该场景 NPC 的对话/关系交互（推进支线、改关系账）
  //       choice  → 一次性情境抉择（触发支线事件，多在特定年份/属性门槛）
  // ===================================================================
  W.scenes = [
    // ---- 家宅 ----
    { key: 'kitchen', region: 'home', name: '灶台·堂屋', stage: 'infancy',
      unlock: { type: 'always' },
      desc: '一家人吃饭、算账、争吵的地方。最早的关系与经济压力都从这里发出。',
      interactions: [
        { type: 'action', ref: ['care-mother', 'care-family', 'protect-family'], label: '照料家人', gain: '心智↑ 关系账↑', cost: '占格不产钱' },
        { type: 'talk', npc: '父母/长辈', label: '与长辈商议', effect: '推进"启蒙类型/升学/婚约"支线；可能改写下一阶段可选项' },
        { type: 'choice', ref: 'enlighten', label: '开蒙抉择（一次性）', when: '幼年', desc: '读旧书 / 进新学堂 / 中西并重——写入长期状态「启蒙类型」' }
      ] },
    { key: 'sickbed', region: 'home', name: '病榻', stage: 'schoolage',
      unlock: { type: 'resource', resLow: { health: 40 } },
      desc: '亲人卧病或自己积劳。健康资源一旦跌破线，这个场景会主动弹出，逼你在"救人"与"生计"间取舍。',
      interactions: [
        { type: 'action', ref: ['rest', 'rest-w', 'rest-m', 'rest-s', 'rest-c', 'rest-r'], label: '侍疾/静养', gain: '健康↑ 精神↑', cost: '一整天停摆' },
        { type: 'choice', ref: 'sell-for-cure', label: '卖田/典当求医', when: '健康<40', desc: '钱财−、处境−，换亲人一命；不救则关系账断裂' }
      ] },

    // ---- 乡镇 ----
    { key: 'field', region: 'village', name: '田埂', stage: 'schoolage',
      unlock: { type: 'always' },
      desc: '佃作、看天、交租。农耕出身的主力生计现场。',
      interactions: [
        { type: 'action', ref: ['farm'], label: '下田佃作', gain: '体魄↑ 手艺↑', cost: '雨天不可' },
        { type: 'choice', ref: 'rent-negotiate', label: '与东家议租', when: '每年秋收', desc: '硬顶（声望↑关系↓）/ 忍让（钱财−）/ 二五减租政策窗口（1927后）' }
      ] },
    { key: 'market', region: 'village', name: '集市', stage: 'schoolage',
      unlock: { type: 'always' },
      desc: '逢集才开。卖粮、打短工、听消息、遇见外乡人。',
      interactions: [
        { type: 'action', ref: ['market', 'hire', 'odd-job'], label: '赶集卖粮/打短工', gain: '钱财↑ 人脉↑', cost: '仅上/下旬集市日' },
        { type: 'talk', npc: '货郎/说书人', label: '打听时局', effect: '提前得知即将到来的事件（预警），可提前准备' }
      ] },
    { key: 'ancestral', region: 'village', name: '宗祠', stage: 'youth',
      unlock: { type: 'attr', attrAny: { fame: 30 } },
      desc: '族规、婚丧、话语权。声望在这里被"读取"，决定你在乡里的分量。',
      interactions: [
        { type: 'talk', npc: '族长/乡绅', label: '族中议事', effect: '声望够高可争话语权；女性出身在此受族规压制，触发抗争支线' },
        { type: 'choice', ref: 'arranged-marriage', label: '父母之命·婚约', when: '少年', desc: '顺从（关系↑自主↓）/ 抗婚（心智门槛，声望↑关系账−）' }
      ] },

    // ---- 学堂 ----
    { key: 'oldschool', region: 'school', name: '私塾', stage: 'schoolage',
      unlock: { type: 'stageOrAttr', stage: 'schoolage' },
      desc: '四书五经、旧学根底。启蒙选"旧学"者的主场。',
      interactions: [
        { type: 'action', ref: ['night-school', 'study-new', 'girls-school'], label: '读书识字', gain: '学识↑ 心智↑', cost: '需交学费(钱财门槛)' }
      ] },
    { key: 'newschool', region: 'school', name: '新式学堂 / 女学', stage: 'youth',
      unlock: { type: 'attr', attrAny: { knowledge: 30 }, note: '需先识字' },
      desc: '算术、地理、体操、新思潮。六三三学制的阶梯。女性进此场景本身即是一次抗争。',
      interactions: [
        { type: 'action', ref: ['study-new', 'girls-school', 'foreign-college'], label: '入学苦读', gain: '学识↑↑ 声望↑', cost: '学费高' },
        { type: 'talk', npc: '同窗/进步教师', label: '结社论学', effect: '人脉↑；接触新思潮，为出走/救亡支线埋线' },
        { type: 'choice', ref: 'study-abroad', label: '备考庚款留学', when: '青年·学识达秀才之才', desc: '考取→衣锦还乡巨额跃升；落第→转教书办报' }
      ] },
    { key: 'nightschool', region: 'school', name: '工人夜校', stage: 'primeyouth',
      unlock: { type: 'eventOrCity', city: true },
      desc: '底层唯一的识字通道。女工、学徒在此第一次握住"字"与"工友"。',
      interactions: [
        { type: 'action', ref: ['workers-school'], label: '夜校识字', gain: '学识↑ 人脉↑ 心智↑', cost: '做工后仍耗精神' },
        { type: 'talk', npc: '夜校组织者', label: '结识工友', effect: '人脉达门槛后解锁"参与罢工"支线' }
      ] },

    // ---- 工厂码头 ----
    { key: 'millfloor', region: 'factory', name: '纱厂车间', stage: 'primeyouth',
      unlock: { type: 'moveToCity' },
      desc: '12 小时工、机器轰鸣、包身工制。伤身，却是进城底层的第一份工钱。',
      interactions: [
        { type: 'action', ref: ['mill-shift', 'run-mill'], label: '纱厂做工/打理', gain: '手艺↑ 钱财↑', cost: '健康↓（长期磨损）' },
        { type: 'choice', ref: 'strike', label: '参与罢工', when: '人脉达门槛/五卅等年份', desc: '胜→工钱涨声望涨；败→开除上黑名单' }
      ] },
    { key: 'dorm', region: 'factory', name: '包身工宿舍/亭子间', stage: 'primeyouth',
      unlock: { type: 'moveToCity' },
      desc: '拥挤、克扣、监视。也是同乡互助网结成的地方。',
      interactions: [
        { type: 'action', ref: ['save-wage', 'help-fellow', 'rest-m'], label: '攒钱/帮衬同乡', gain: '钱财↑ 关系账↑', cost: '省吃俭用' },
        { type: 'choice', ref: 'redeem-self', label: '赎身自立', when: '钱财达门槛', desc: '攒够钱赎回自由身：处境↑↑ 心智↑' }
      ] },

    // ---- 城市街市 ----
    { key: 'shopstreet', region: 'city', name: '商铺/账房', stage: 'primeyouth',
      unlock: { type: 'moveToCity' },
      desc: '学徒、跑街、掌事。城市里的钱与人脉在此放大。',
      interactions: [
        { type: 'action', ref: ['learn-biz', 'run-mill', 'tutor'], label: '学商/掌事/课徒', gain: '人脉↑ 钱财↑', cost: '需靠山(人脉门槛)' },
        { type: 'talk', npc: '掌柜/同行', label: '行帮往来', effect: '人脉扩展；为"打理纱厂/接掌家业"铺路' }
      ] },
    { key: 'newspaper', region: 'city', name: '报馆', stage: 'primeyouth',
      unlock: { type: 'attr', attrAny: { knowledge: 60 } },
      desc: '投稿、论政、办报。读书人把"学识"变现为"声望"的地方，也是跨出身相遇的枢纽。',
      interactions: [
        { type: 'action', ref: ['write-essay', 'read-newspaper'], label: '撰文投稿/读报', gain: '声望↑ 钱财↑', cost: '抗战中论政有风险' },
        { type: 'talk', npc: '主笔/投稿人', label: '笔会往来', effect: '⚑ 跨线枢纽：可收到东北流亡者投来的救亡文章（交汇钩子）' }
      ] },
    { key: 'teahouse', region: 'city', name: '茶楼戏园', stage: 'youth',
      unlock: { type: 'always' },
      desc: '听书、会客、传闲话。回复精神，也是消息与人脉的低成本入口。',
      interactions: [
        { type: 'action', ref: ['rest', 'rest-s', 'social'], label: '听书/会客歇脚', gain: '精神↑ 心智↑', cost: '几乎无' },
        { type: 'talk', npc: '茶客/艺人', label: '闲谈得讯', effect: '低成本情报；偶发奇遇支线' }
      ] },

    // ---- 租界 ----
    { key: 'foreignfirm', region: 'concession', name: '洋行', stage: 'prime',
      unlock: { type: 'attr', attrAny: { network: 60 } },
      desc: '买办、外汇、洋货。财富的顶点，也是"洋奴"骂名的来源。',
      interactions: [
        { type: 'action', ref: ['run-mill', 'foreign-college'], label: '洋行事务', gain: '钱财↑↑ 学识↑', cost: '声望背负道德污名' },
        { type: 'choice', ref: 'comprador', label: '是否依附洋行', when: '青年', desc: '财富与名声的对冲：越靠近越有钱，也越背骂名' }
      ] },
    { key: 'ballroom', region: 'concession', name: '舞厅/酒会', stage: 'prime',
      unlock: { type: 'attr', attrAny: { money: 40, fame: 60 } },
      desc: '交际场。烧钱换人脉与声望，也是政商关系的润滑剂。',
      interactions: [
        { type: 'action', ref: ['socialite', 'social'], label: '交际应酬', gain: '人脉↑ 声望↑', cost: '钱财↓' },
        { type: 'talk', npc: '官僚/名流', label: '打点关系', effect: '换处境安全；1948"打老虎"时决定生死' }
      ] },

    // ---- 流亡路 ----
    { key: 'refugeeflow', region: 'road', name: '难民潮/关卡', stage: 'prime',
      unlock: { type: 'event', anyOf: ['homeland-fall', 'war-loss', 'conscript'] },
      desc: '拖家带口、露宿、被盘查。战争把所有出身都可能推上这条路。',
      interactions: [
        { type: 'action', ref: ['flee', 'protect-family', 'beg-help'], label: '赶路/护家/求助', gain: '关系账↑ 心智↑', cost: '健康↓' },
        { type: 'choice', ref: 'road-crisis', label: '流亡途中危机', when: '体魄门槛', desc: '平安抵达 / 途中失散病亡（高风险赌命）' }
      ] },
    { key: 'reliefcamp', region: 'road', name: '赈济所', stage: 'prime',
      unlock: { type: 'event', anyOf: ['homeland-fall', 'road-crisis'] },
      desc: '难民收容、施粥、登记。伤自尊，却能续命。',
      interactions: [
        { type: 'action', ref: ['beg-help', 'join-group'], label: '领赈/结伴', gain: '钱财↑ 人脉↑', cost: '声望↓（自尊）' },
        { type: 'talk', npc: '同路难民', label: '抱团取暖', effect: '结伴同行提升安全感，降低下一次危机失败率' }
      ] },

    // ---- 大后方 ----
    { key: 'lianda', region: 'rear', name: '西南联大/内迁校', stage: 'prime',
      unlock: { type: 'event', anyOf: ['lianda', 'resettle'] },
      desc: '茅草房、跑警报、弦歌不辍。读书人在流亡中守住治学的地方。',
      interactions: [
        { type: 'action', ref: ['march-southwest', 'study-new', 'write-essay'], label: '治学/教书', gain: '心智↑ 声望↑', cost: '健康↓ 钱财被通胀吞噬' },
        { type: 'choice', ref: 'inflation-choice', label: '通胀下的抉择', when: '1945后', desc: '薪水蒸发：变卖藏书 / 兼职 / 借债' }
      ] },
    { key: 'movedfactory', region: 'rear', name: '内迁工厂', stage: 'prime',
      unlock: { type: 'event', anyOf: ['resettle', 'war-loss'] },
      desc: '宜昌大撤退后在后方重建的厂。资本家在废墟上再起的最后机会。',
      interactions: [
        { type: 'action', ref: ['run-mill', 'flee-inflation'], label: '重建生产/抢购保值', gain: '钱财↑ 处境↑', cost: '战时物资奇缺' },
        { type: 'choice', ref: 'stay-or-go-1949', label: '1949 去留三选一', when: '晚年', desc: '留大陆·公私合营 / 迁香港 / 携资去海外' }
      ] }
  ];

  // ===================================================================
  // 四、解锁判定：把 unlock.type 解释成"给定当前状态是否解锁"
  //     state 需含：age, attrs{}, res{}, firedEvents[](已触发事件id), inCity(bool)
  // ===================================================================
  W.isUnlocked = function (unlock, state) {
    if (!unlock) return true;
    var a = state.attrs || {}, r = state.res || {}, ev = state.firedEvents || [];
    switch (unlock.type) {
      case 'always': return true;
      case 'attr':
        for (var k in unlock.attrAny) { if ((a[k] || 0) >= unlock.attrAny[k]) return true; }
        return false;
      case 'resource':
        if (unlock.resLow) { for (var rk in unlock.resLow) if ((r[rk] || 999) < unlock.resLow[rk]) return true; return false; }
        return true;
      case 'stageOrAttr': {
        var okStage = W.stageIndex(state.age) >= W.stageKeyIndex(unlock.stage);
        if (okStage) return true;
        if (unlock.attrAny) { for (var k2 in unlock.attrAny) if ((a[k2] || 0) >= unlock.attrAny[k2]) return true; }
        return false;
      }
      case 'moveToCity': return !!state.inCity;
      case 'eventOrCity': return !!state.inCity || (unlock.anyOf || []).some(function (e) { return ev.indexOf(e) >= 0; });
      case 'event': return (unlock.anyOf || []).some(function (e) { return ev.indexOf(e) >= 0; });
      default: return true;
    }
  };
  W.stageIndex = function (age) { var s = W.lifeStages; for (var i = s.length - 1; i >= 0; i--) if (age >= parseInt(s[i].age, 10)) return i; return 0; };
  W.stageKeyIndex = function (key) { var s = W.lifeStages; for (var i = 0; i < s.length; i++) if (s[i].key === key) return i; return 0; };

  // ===================================================================
  // 五、支线涌现事件：不是固定年份的主线事件，而是"当你反复出入某场景 / 属性到某档位 /
  //     携带某长期状态时"概率涌现的小剧情。这是解决"剧情太简单"的关键——
  //     同一套框架下，玩家的行动轨迹会长出不同的支线。
  // ===================================================================
  W.emergent = [
    { id: 'em-benefactor', scene: 'newspaper', name: '贵人赏识',
      trigger: { attr: { fame: 60 }, visits: 3 }, chanceBy: ['fame', 'network'],
      good: { desc: '主笔赏识你的文章，引荐入圈', gain: { network: 8, fame: 5 } },
      bad: { desc: '文章惹祸，遭当局约谈', gain: { fame: -4, position: -3 } }, hist: 'LO' },
    { id: 'em-strike-lead', scene: 'nightschool', name: '被推为工人代表',
      trigger: { attr: { network: 40, mind: 60 }, visits: 4 }, chanceBy: ['network', 'mind'],
      good: { desc: '工友推你出面谈判，一举成名', gain: { fame: 8, network: 6 } },
      bad: { desc: '被厂方盯上，列入黑名单', gain: { position: -5, money: -3 } }, hist: 'MID' },
    { id: 'em-love', scene: 'teahouse', name: '一场相遇',
      trigger: { age: 18, visits: 2 }, chanceBy: ['fame', 'mind'],
      good: { desc: '茶楼偶遇一位知己，情愫暗生', gain: { mind: 5, relation: 6 } },
      bad: { desc: '门第悬殊，无疾而终', gain: { mind: -3 } }, hist: 'LO' },
    { id: 'em-usury', scene: 'market', name: '高利贷上门',
      trigger: { resLow: { money: 5 } }, chanceBy: ['mind', 'network'],
      good: { desc: '说服债主宽限，渡过难关', gain: { mind: 4 } },
      bad: { desc: '利滚利，被迫卖地/卖身', gain: { money: -5, position: -6, relation: -4 } }, hist: 'HI' },
    { id: 'em-comprador-shame', scene: 'foreignfirm', name: '"洋奴"骂名',
      trigger: { visits: 3 }, chanceBy: ['mind', 'fame'],
      good: { desc: '你以实业救国自辩，舆论缓和', gain: { fame: 3 } },
      bad: { desc: '学潮中被点名羞辱', gain: { fame: -6, mind: -3 } }, hist: 'HI' },
    { id: 'em-cross-relief', scene: 'reliefcamp', name: '故人相逢',
      trigger: { visits: 2 }, chanceBy: ['network'],
      good: { desc: '⚑ 在赈济所遇见另一条命运线的旧识，彼此接济', gain: { relation: 6, network: 4 } },
      bad: { desc: '认出旧识却无力相助，愧疚', gain: { mind: -2 } }, hist: 'LO' }
  ];

  // 支线涌现概率：与事件成败同构，复用 0.1~0.92 区间
  W.emergentChance = function (em, state) {
    var a = state.attrs || {};
    if (!em.chanceBy) return 0.5;
    var sum = 0, n = 0;
    em.chanceBy.forEach(function (k) { sum += Math.min(1, (a[k] || 0) / 120); n++; });
    var base = n ? sum / n : 0.5;
    return Math.max(0.1, Math.min(0.92, 0.25 + base * 0.7));
  };

  // ===================================================================
  // 六、日常循环说明（给 UI 用的文案骨架）：一天怎么过 → 一旬 → 一年 → 一生
  // ===================================================================
  W.loop = {
    day: '每天按生命阶段开放 2–4 个时段格；在已解锁场景里各放一个交互（行动/对话/抉择）。重复同一行动触发边际递减，逼你在多个场景间轮换。',
    xun: '一旬（10 天）结算一次：精神清空重置，边际递减计数归零，集市类周期场景刷新。',
    year: '一年结算：属性按累计点数升级；资源被"时代乘子"冲击；命中门槛的主线/支线事件按概率触发，命运曲线打一个采样点。',
    life: '一生 = 幼年到晚年七个阶段，格数由多变少、产出由高到低；地图随年龄、属性、事件逐片点亮；晚年进入结局采样与回响道具回收。'
  };

  window.MINGUO_WORLD = W;
})();
