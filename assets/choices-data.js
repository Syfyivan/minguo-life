// 民国人生 · 抉择情境全集（条件 → 选项 → 后果）
// 建立在 actions-data.js（属性 body/knowledge/craft/mind/network/fame，资源 money/health/relation/position）
// 与 world-data.js（场景/生命阶段/解锁）之上，把 world-data.js 里只有名字的 choice 钩子逐个填满。
//
// 每个情境（situation）结构：
//   id / name / scene(挂靠场景) / stage(推荐生命阶段) / origins(哪些出身会遇到, '*'=全部)
//   trigger  : 何时冒出来（年龄/年份/属性档/资源低于线/已触发事件）
//   prompt   : 呈现给玩家的一句情境描述
//   options[]: 可做的选择，每项含
//       label   : 选项文案
//       gate    : 硬门槛（不达标则此选项灰掉不可选），可空
//       roll    : 若存在则为"掷判"选项——chanceBy 指定用哪些属性算成功率(复用 0.1~0.92)
//       eff     : 稳定后果（无 roll 时直接结算）：属性/资源增量
//       succ/fail: 有 roll 时的成/败后果
//       cost    : 明确写出的代价（此长彼消，供 UI 高亮）
//       echo    : 写入长期状态标记（多年后被结局/其它情境读取）——这是"回响"
//       note    : 设计备注
//   hist     : 史实可靠性 HI 权威 / MID 需核实 / LO 仅方向
//
// ⚠ 所有属性点、资源增量、概率、年份门槛均为【设计示意值】，需试玩校准；
//    历史骨架（禁缠足、五卅、二五减租、庚款留学、金圆券、1949去留等）为真实史实。
(function () {
  var C = {};

  C.situations = [

    // ============================================================
    // 幼年 · 启蒙类型（写入一生底色）
    // ============================================================
    {
      id: 'enlighten', name: '开蒙抉择', scene: 'kitchen', stage: 'infancy', origins: '*',
      trigger: { age: 6, once: true },
      prompt: '六岁发蒙。家里托人问："这孩子，往后念什么书？"——这一步定下你一生的知识底色。',
      options: [
        { label: '进私塾读旧学', gate: { money: 2 },
          eff: { knowledge: 10, mind: 4 }, echo: 'edu:old',
          note: '四书五经根底扎实；日后科举已废，旧学变现难，但"通文"人设稳。' },
        { label: '进新式学堂', gate: { money: 4 },
          eff: { knowledge: 8, mind: 3, fame: 2 }, cost: { money: -2 },
          echo: 'edu:new', note: '算术地理体操；学费贵。解锁日后"留学/办报"上限。' },
        { label: '中西并重（延师又入学堂）', gate: { money: 6, network: 20 },
          eff: { knowledge: 12, mind: 5, fame: 3 }, cost: { money: -4 },
          echo: 'edu:both', note: '最贵，需家底与人脉；日后各条上升路都不吃亏。' },
        { label: '不读书，随即下地/学徒', 
          eff: { body: 6, craft: 6 }, cost: { knowledge: -0 },
          echo: 'edu:none', note: '底层默认项。省钱、早顶事，但学识线基本关闭，靠体魄手艺活。' }
      ],
      hist: 'HI'
    },

    // ============================================================
    // 学龄/壮年 · 病榻：健康跌破线时强制弹出
    // ============================================================
    {
      id: 'sell-for-cure', name: '卖田典当求医', scene: 'sickbed', stage: 'schoolage', origins: '*',
      trigger: { resLow: { health: 40 }, note: '亲人或自己健康跌破 40 时弹出' },
      prompt: '亲人卧病不起，郎中开的方子要现钱。药，抓还是不抓？',
      options: [
        { label: '卖田/典当，倾家救人', gate: { position: 10 },
          eff: { relation: 8, mind: 3, health: 6 }, cost: { money: -8, position: -6 },
          echo: 'debt:cure', note: '守住关系账与良心，但家底被掏空，可能连锁触发高利贷情境。' },
        { label: '借高利贷救急', 
          eff: { health: 6, relation: 4 }, cost: { money: -2 },
          echo: 'debt:usury', note: '暂时救人，埋下"高利贷上门"涌现事件的引信。' },
        { label: '拖着不治，先顾生计', 
          eff: { money: 2 }, cost: { relation: -8, mind: -4, health: -3 },
          echo: 'guilt:untreated', note: '省下钱，但关系账断裂、心里留疤；亲人可能病亡。' }
      ],
      hist: 'MID'
    },

    // ============================================================
    // 乡镇 · 议租（每年秋收，1927 后开政策窗口）
    // ============================================================
    {
      id: 'rent-negotiate', name: '与东家议租', scene: 'field', stage: 'schoolage',
      origins: ['tenant'],
      trigger: { everyYear: '秋收', note: '佃农每年秋收结算' },
      prompt: '秋收了，东家来收租。今年年景不好，这租……',
      options: [
        { label: '硬顶，联合佃户抗租', gate: { fame: 30, network: 20 }, roll: { chanceBy: ['network', 'mind'] },
          succ: { desc: '佃户齐心，东家让步减租', money: 4, fame: 6 },
          fail: { desc: '被记恨，来年夺佃', position: -6, relation: -4 },
          cost: { relation: -3 }, note: '声望人脉够才敢；赢了长脸，输了丢地。' },
        { label: '忍气交足租', 
          eff: { relation: 3 }, cost: { money: -6, mind: -2 },
          note: '安稳保住佃权，但钱粮吃紧、憋屈。' },
        { label: '援引"二五减租"政策（1927后）', gate: { knowledge: 30 }, trigger: { yearFrom: 1927 },
          roll: { chanceBy: ['knowledge', 'network'] },
          succ: { desc: '援引政策成功减租两成五', money: 6, fame: 4, mind: 3 },
          fail: { desc: '政策未落地，反遭刁难', relation: -3 },
          echo: 'awake:rights', note: '需识字懂政策；成功则政治意识觉醒，为日后土改埋线。' }
      ],
      hist: 'HI'
    },

    // ============================================================
    // 宗祠/家宅 · 婚约（少年，父母之命）
    // ============================================================
    {
      id: 'arranged-marriage', name: '父母之命·婚约', scene: 'ancestral', stage: 'youth',
      origins: ['gentrywoman', 'tenant', 'scholar', 'millworker'],
      trigger: { ageRange: [15, 20] },
      prompt: '媒人上门，父母已经点头。庚帖就在案上——你嫁不嫁 / 娶不娶？',
      options: [
        { label: '顺从婚约', 
          eff: { relation: 8, position: 4 }, cost: { mind: -2 },
          echo: 'married:arranged', note: '家庭关系账大涨、处境稳；但自主性被压，心智微挫。' },
        { label: '拖延周旋（先读书/先立业）', gate: { mind: 40 },
          eff: { mind: 4 }, cost: { relation: -3 },
          echo: 'marriage:delayed', note: '缓兵之计，为抗婚或自由恋爱争取时间。' },
        { label: '公开抗婚', gate: { mind: 60 }, roll: { chanceBy: ['mind', 'knowledge', 'fame'] },
          succ: { desc: '据理力争，家人妥协', fame: 6, mind: 6 },
          fail: { desc: '被锁在家/断绝往来', relation: -8, position: -5 },
          cost: { relation: -6 }, echo: 'rebel:marriage',
          note: '心智门槛高才敢；女性出身走通此项，直接铺向"娜拉出走"。' }
      ],
      hist: 'MID'
    },

    // ============================================================
    // 士绅之女 · 娜拉出走（抗婚成功后延伸）
    // ============================================================
    {
      id: 'nora-leave', name: '娜拉时刻·是否出走', scene: 'newschool', stage: 'primeyouth',
      origins: ['gentrywoman'],
      trigger: { attr: { mind: 100, knowledge: 60 }, hasEcho: 'rebel:marriage' },
      prompt: '你受够了这方宅院。门就在那里——推开它，就再没有回头路。走，还是留？',
      options: [
        { label: '毅然出走，靠学识自立', gate: { knowledge: 60 }, roll: { chanceBy: ['mind', 'knowledge', 'money'] },
          succ: { desc: '在外站稳脚跟，教书/撰稿自立', fame: 8, knowledge: 4 },
          fail: { desc: '举目无亲，钱尽而困顿', health: -4, money: -6 },
          cost: { position: -20, money: -10, relation: -6 }, echo: 'nora:out',
          note: '娜拉走后要么堕落要么回来——本设计给"自立"留一条窄门，靠学识撑住。' },
        { label: '留下，做体面的抗争（办女学/兴女权）', gate: { fame: 40 },
          eff: { fame: 6, network: 5, mind: 4 }, cost: { relation: -2 },
          echo: 'reform:inside', note: '不出走，在体制内推动；风险小、上限也低。' },
        { label: '认命回家', 
          eff: { relation: 4 }, cost: { mind: -8, fame: -3 },
          echo: 'nora:back', note: '心智重挫；一生留憾，晚年常回望这一刻。' }
      ],
      hist: 'MID'
    },

    // ============================================================
    // 学堂 · 庚款留学考（青年·读书人核心分岔）
    // ============================================================
    {
      id: 'study-abroad', name: '备考庚款留学', scene: 'newschool', stage: 'primeyouth',
      origins: ['scholar', 'gentrywoman', 'capitalist'],
      trigger: { attr: { knowledge: 100 }, yearAround: 1934, notEcho: 'edu:none' },
      prompt: '清华庚款留美预备放榜在即。这一考，可能是"衣锦还乡"，也可能是竹篮打水。',
      options: [
        { label: '全力应考', gate: { knowledge: 100 }, roll: { chanceBy: ['knowledge', 'mind'] },
          succ: { desc: '金榜题名，负笈留洋', fame: 12, network: 6, money: 8 },
          fail: { desc: '名落孙山，母亲典当的端砚白当了', mind: -3, fame: 3 },
          echo: 'abroad:gone', note: '成功写入"留洋镀金"，决定 1949 能否选"出国"结局。' },
        { label: '放弃留学，就任助教/办报', gate: { knowledge: 60 },
          eff: { money: 6, fame: 4, network: 3 }, echo: 'stay:teach',
          note: '稳妥务实；留在国内深耕，抗战中与师生共命运。' },
        { label: '弃学从商/接家业', gate: { network: 40 }, origins: ['capitalist'],
          eff: { money: 10, network: 5 }, cost: { fame: -2 },
          echo: 'give-up:study', note: '资本家之子专属——放下书本接过账房。' }
      ],
      hist: 'HI'
    },

    // ============================================================
    // 工厂 · 参与罢工（五卅等年份）
    // ============================================================
    {
      id: 'strike', name: '参与罢工', scene: 'millfloor', stage: 'primeyouth',
      origins: ['millworker'],
      trigger: { attr: { network: 30 }, yearAround: 1925, note: '五卅前后' },
      prompt: '工头又克扣工钱，工友们把机器停了。领头的看向你——你上不上？',
      options: [
        { label: '站到最前面，当代表谈判', gate: { network: 30, mind: 40 }, roll: { chanceBy: ['network', 'mind', 'fame'] },
          succ: { desc: '罢工获胜，工钱提高、一举成名', money: 5, fame: 8, network: 6 },
          fail: { desc: '被开除并列入黑名单', money: -4, position: -5 },
          echo: 'labor:leader', note: '赢了成为工人领袖；输了丢工作进黑名单。' },
        { label: '跟着罢工，但不出头', 
          eff: { network: 4, mind: 3 }, cost: { money: -2 },
          note: '随大流，风险小、收益也小；扣几天工钱。' },
        { label: '照常上工，不参与', 
          eff: { money: 3 }, cost: { network: -4, fame: -3 },
          echo: 'scab', note: '保住工钱，但被工友孤立，人脉受损。' }
      ],
      hist: 'HI'
    },

    // ============================================================
    // 工厂 · 赎身自立（攒够钱）
    // ============================================================
    {
      id: 'redeem-self', name: '赎身自立', scene: 'dorm', stage: 'primeyouth',
      origins: ['millworker'],
      trigger: { attr: { money: 30 }, hasEcho: null },
      prompt: '包身契还剩最后一笔。攒了这么多年的血汗钱，够赎回一个自由身了。',
      options: [
        { label: '赎身，从此自己挣自己的', gate: { money: 30 },
          eff: { position: 15, mind: 5, fame: 3 }, cost: { money: -30 },
          echo: 'free:redeemed', note: '花光积蓄换自由；处境与尊严质变，人生第一次真正属于自己。' },
        { label: '再忍两年，多攒点本钱', 
          eff: { money: 4, mind: -2 }, cost: { health: -3 },
          note: '推迟自由，多攒本钱；但工伤风险累积。' }
      ],
      hist: 'MID'
    },

    // ============================================================
    // 租界 · 是否依附洋行（财富 vs 名声）
    // ============================================================
    {
      id: 'comprador', name: '是否依附洋行', scene: 'foreignfirm', stage: 'prime',
      origins: ['capitalist', 'scholar'],
      trigger: { attr: { network: 60 } },
      prompt: '洋行开出优渥的买办职位。钱途无量，只是往后"洋奴"两个字，怕是甩不掉了。',
      options: [
        { label: '依附洋行，闷声发财', gate: { network: 60 },
          eff: { money: 12, network: 6 }, cost: { fame: -6 },
          echo: 'comprador:yes', note: '财富暴涨；背上道德污名，触发"洋奴骂名"涌现事件。' },
        { label: '拒绝，以实业救国自持', gate: { fame: 40 },
          eff: { fame: 6, mind: 4 }, cost: { money: -4 },
          echo: 'national:industry', note: '守住名节；钱少，但抗战舆论中站得住脚。' },
        { label: '两头下注（暗中合作、明面撇清）', gate: { mind: 60, network: 60 }, roll: { chanceBy: ['mind', 'network'] },
          succ: { desc: '左右逢源，名利双收', money: 8, network: 4, fame: 2 },
          fail: { desc: '两面派败露，两头不讨好', fame: -8, network: -5 },
          note: '高心智才玩得转的走钢丝；败露则名声人脉双崩。' }
      ],
      hist: 'MID'
    },

    // ============================================================
    // 流亡路 · 途中危机（高风险赌命）
    // ============================================================
    {
      id: 'road-crisis', name: '流亡途中危机', scene: 'refugeeflow', stage: 'prime',
      origins: '*',
      trigger: { hasEvent: ['homeland-fall', 'war-loss', 'conscript'], attr: { body: 30 } },
      prompt: '关卡盘查、头顶轰炸、身边有人染了时疫。前面就是封锁线——怎么过？',
      options: [
        { label: '冒险抢关，连夜突进', gate: { body: 60 }, roll: { chanceBy: ['body', 'mind', 'network'] },
          succ: { desc: '一家平安抵达后方', mind: 6, relation: 5, position: 4 },
          fail: { desc: '途中失散/亲人病亡', relation: -10, health: -6 },
          echo: 'road:survived', note: '体魄门槛高；赌赢全家过关，赌输骨肉分离。' },
        { label: '绕远路，稳妥求生', 
          eff: { mind: 3, relation: 2 }, cost: { money: -4, health: -3 },
          note: '安全但耗尽盘缠体力；多走几个月。' },
        { label: '就地投赈济所', gate: { }, 
          eff: { money: 2, network: 3 }, cost: { fame: -3 },
          echo: 'relief:dependent', note: '伤自尊换活命；进入赈济所场景与相关涌现。' }
      ],
      hist: 'HI'
    },

    // ============================================================
    // 大后方 · 通胀下的抉择（1945 后）
    // ============================================================
    {
      id: 'inflation-choice', name: '通胀下的抉择', scene: 'lianda', stage: 'midlife',
      origins: ['scholar', 'capitalist'],
      trigger: { yearFrom: 1945 },
      prompt: '一麻袋法币换不来一麻袋米。教授薪水一夜蒸发，家里快揭不开锅了。',
      options: [
        { label: '变卖藏书/家当度日', gate: { position: 20 },
          eff: { money: 6, mind: -3 }, cost: { position: -8, fame: -2 },
          echo: 'sold:legacy', note: '换现金活命；半生积累的书与体面被通胀吞掉。' },
        { label: '拉下面子兼职/摆摊', 
          eff: { money: 5, craft: 3 }, cost: { fame: -3, health: -2 },
          note: '教授上街摆摊——务实活命，斯文扫地。' },
        { label: '举债硬撑，等物价回落', roll: { chanceBy: ['network', 'mind'] },
          succ: { desc: 'friend接济，勉强撑过', relation: 3 },
          fail: { desc: '债台高筑，越陷越深', money: -10, relation: -5 },
          echo: 'debt:inflation', note: '赌时局回稳；恶性通胀下多半是输。' }
      ],
      hist: 'HI'
    },

    // ============================================================
    // 终局 · 1949 去留三选一（晚年·总账）
    // ============================================================
    {
      id: 'stay-or-go-1949', name: '1949 · 去留三选一', scene: 'movedfactory', stage: 'late',
      origins: '*',
      trigger: { yearAround: 1949, once: true },
      prompt: '时代要翻篇了。走的走、留的留，火车票、船票、还是脚下这片土——你替这一生做最后一个大主意。',
      options: [
        { label: '留在大陆', 
          eff: { position: 4, mind: 3 },
          echo: 'end:mainland',
          note: '结局分支随一生"回响标记"分化：佃农→分到土地翻身；资本家→公私合营/被清算；工人领袖→受重用。' },
        { label: '迁居香港/台湾', gate: { money: 20 },
          eff: { position: 6 }, cost: { money: -20, relation: -6 },
          echo: 'end:hktw', note: '需盘缠；保住部分家业，却与故土亲族两隔。' },
        { label: '携资出海（需留洋背景）', gate: { money: 40 }, requireEcho: 'abroad:gone',
          eff: { position: 8 }, cost: { money: -40, relation: -10 },
          echo: 'end:overseas', note: '仅"留洋镀金"者可选——一生回响在此收口，远走他乡。' },
        { label: '走投无路，随命运漂流', 
          eff: { mind: 2 }, cost: { health: -3 },
          echo: 'end:drift', note: '没钱没背景的默认项；结局由健康/关系账余量决定善终与否。' }
      ],
      hist: 'HI'
    }

  ];

  // 情境是否对当前玩家开放（供原型调用；只做设计层判定示意）
  C.isAvailable = function (sit, state) {
    var t = sit.trigger || {}, a = (state && state.attrs) || {}, r = (state && state.res) || {},
        ev = (state && state.firedEvents) || [], echoes = (state && state.echoes) || [];
    if (sit.origins && sit.origins !== '*' && sit.origins.indexOf(state.origin) < 0) return false;
    if (t.attr) { for (var k in t.attr) if ((a[k] || 0) < t.attr[k]) return false; }
    if (t.resLow) { var any = false; for (var rk in t.resLow) if ((r[rk] || 999) < t.resLow[rk]) any = true; if (!any) return false; }
    if (t.hasEcho && echoes.indexOf(t.hasEcho) < 0) return false;
    if (t.notEcho && echoes.indexOf(t.notEcho) >= 0) return false;
    if (t.hasEvent) { if (!t.hasEvent.some(function (e) { return ev.indexOf(e) >= 0; })) return false; }
    return true;
  };

  // 选项是否可选（硬门槛判定，复用 MINGUO.meetGate 逻辑）
  C.optionEnabled = function (opt, state) {
    if (!opt.gate) return true;
    var a = (state && state.attrs) || {}, r = (state && state.res) || {};
    for (var k in opt.gate) {
      var have = (a[k] != null ? a[k] : (r[k] != null ? r[k] : 0));
      if (have < opt.gate[k]) return false;
    }
    if (opt.requireEcho && ((state && state.echoes) || []).indexOf(opt.requireEcho) < 0) return false;
    return true;
  };

  // 统计用
  C.count = function () {
    var n = 0; C.situations.forEach(function (s) { n += s.options.length; }); return n;
  };

  window.MINGUO_CHOICES = C;
})();
