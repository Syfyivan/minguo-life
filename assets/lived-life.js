// 民国人生 · 具体生活层 v0.6
// 所有人物与单位均为合成虚构；本文件把路线标签落实为职业、家人、朋友、疾病与心理记录。
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before lived-life.js');

  C.version = '0.6.0';
  C.subjectStatusLabels.separated = '暂时分居';
  C.subjectStatusLabels.widowed = '配偶已经去世';
  C.employmentStatusLabels.retired = '已经停止固定工作';
  C.relationshipStatusLabels = {
    single: '尚未形成伴侣关系', delayed: '婚事已经延后', 'single-by-choice': '明确独身',
    married: '共同生活', 'partnered-separate-homes': '伴侣关系，各自保留住处', separated: '暂时分居',
    'separated-by-war': '因战争分别安身', 'living-apart': '异地生活并保持联系', widowed: '配偶已经去世',
  };
  C.livedLifeStandard = {
    parentProfilesPerFamily: 2,
    routeContactsPerRoute: 3,
    minimumKnownPeoplePerAdultLife: 6,
    minimumHealthEpisodesPerLife: 4,
    yearlyPersonalRecord: true,
  };

  C.parentProfiles = {
    subeipoor: {
      mother: {
        name: '张桂枝', born: 1878, occupation: '料理家计、纺线并替邻家照看产育', deathAgeBase: 60,
        activities: ['把药钱、口粮和借来的种子分开包好', '替邻家看过一个下午的孩子，换回一小袋杂粮', '在灶边纺线，把能卖的线团单独留下'],
        words: ['“别只问我喝不喝药，先把明天吃什么算明白。”', '“你走哪条路都要自己想清，别拿照料我的话替你作主。”', '“人情能借一次，秋后该还的工不能忘。”'],
      },
      father: {
        name: '李守田', born: 1875, occupation: '农闲时替船行挑货、修堤和做季节短工', deathAgeBase: 67,
        activities: ['从河埠短工回来，把当天工钱和欠下的脚力钱分别说明', '跟着邻村人修了一段堤，换回几天口粮', '托人捎来一张写着工期和回程日期的纸条'],
        words: ['“外头的活不是天天有，没拿到手的钱不能先算进家账。”', '“我能替你问门路，不能替你把一辈子的工做完。”', '“回不回来要看工期，也要看家里谁还能接住地里的活。”'],
      },
    },
    jiangnanshen: {
      mother: {
        name: '许婉和', born: 1877, occupation: '管理家用、亲族往来并替女眷核对嫁妆与私房账', deathAgeBase: 75,
        activities: ['把当月家用、亲族借款和自己的安身钱分成三本小账', '回绝了一次没有说清责任的亲族请求', '替家中女眷核对住处和学费，没有替她们答应婚事'],
        words: ['“一家人也要把谁答应了什么说清，不能全记在情分上。”', '“读书能让你说明道理，日子还得落实到钱和住处。”', '“婚事不是只看门第，谁照料谁、谁放弃什么都要先谈。”'],
      },
      father: {
        name: '沈庭筠', born: 1873, occupation: '在私塾授课、替人修书并处理家门文书', deathAgeBase: 73,
        activities: ['替学生改完一册文章，又去亲族家写了一封契约', '把受潮书页逐张揭开晾干，记下缺失的页码', '收到旧学生来信，核对了学校停课后的新地址'],
        words: ['“文章能传出去，先得有人付纸墨和房租。”', '“不知道的地方就留白，别因为想讲完整就补成事实。”', '“家学若只能让一家人得益，也未必真能留下去。”'],
      },
    },
    shanghaigongshang: {
      mother: {
        name: '顾周惠娴', born: 1879, occupation: '维持家用、工友家口往来并保管自己的安身钱', deathAgeBase: 78,
        activities: ['让伙房把工友家属领米和自家采买分开登记', '去看望一户病中工友家口，回来后重排了家用', '核对柜中首饰与现钱，留下不许挪作厂款的一份'],
        words: ['“账房说发了钱，不等于工友家里真的收到。”', '“这是我的安身钱，帮家里也由我自己决定拿多少。”', '“生意有生意的账，家里人的病不能只写成损耗。”'],
      },
      father: {
        name: '顾伯衡', born: 1872, occupation: '经营顾记棉布号与小织造作场，维系钱庄和货栈往来', deathAgeBase: 71,
        activities: ['去货栈核对迟到的棉纱，又与钱庄重谈一笔短借', '在账房逐项问过货款、工钱和机器修理费', '因胸闷提前离开作场，把当天急账交给孙立根'],
        words: ['“有订单不等于赚到钱，原料、工钱和退货都要算。”', '“你若接账房，接的也包括欠薪和坏账，不只是钥匙。”', '“老关系可以开门，新货还是得照样验。”'],
      },
    },
  };

  C.spouseProfiles = {
    subeipoor: {
      男: { name: '周杏云', bornOffset: 1, occupation: '替人缝补衣物，也在集市帮忙称粮', values: '希望家用、照料与外出做工分别说清' },
      女: { name: '赵文山', bornOffset: -1, occupation: '做河埠短工并在农忙时帮人收割', values: '不把妻子的劳动当成默认家务' },
    },
    jiangnanshen: {
      男: { name: '吴静川', bornOffset: 1, occupation: '小学教员兼书局校对', values: '希望双方都保留工作和给原生家庭的责任' },
      女: { name: '顾君白', bornOffset: -2, occupation: '中学教员，偶尔替报馆誊校稿件', values: '愿意共同生活，但不要求一方放弃职业' },
    },
    shanghaigongshang: {
      男: { name: '宋月珍', bornOffset: 0, occupation: '商号记账员，婚后仍保留自己的薪水', values: '坚持家业、夫妻家用与个人储备分账' },
      女: { name: '程彦之', bornOffset: -1, occupation: '机器行制图员，按月领薪', values: '愿意分担家务，也要求工作调动共同商量' },
    },
  };

  C.childNames = {
    subeipoor: ['李小满', '李秋禾'],
    jiangnanshen: ['沈知遥', '沈言秋'],
    shanghaigongshang: ['顾宁之', '顾素行'],
  };

  C.routeCareerProfiles = {
    'subei-stay': {
      kind: 'farm', role: '佃农兼集市粮贩', workplace: '李家租种的田地与河埠集市', employer: '按季收租的田主与集市买主', supervisor: '管租人赵有德', colleague: '丁友顺', publicPerson: '买粮的船娘冯三姐', terms: '收成先缴租，集市交易当面称量结账',
      duties: '下田、修农具、核对租粮，并把能卖的余粮背到集市',
      scenes: [
        '赵有德在田头说今年租粮仍照旧数。你拿出受水地块的记录与他逐畦核对，最后只争下延期十日；周淑兰答应秋收来换工，这笔人情也被记进后账。',
        '冯三姐在河埠称粮时发现一袋受潮，提出压价。你当面拆袋挑出坏粮，只卖掉能说清成色的部分；少赚的钱换回了她下一集仍肯来找你的承诺。',
        '丁友顺家的牛病了，收割可能赶不上。你们把两家能出的人和工具排成两天换工，先保住最容易烂在地里的那块；自家的晚熟田因此推迟了一日。',
      ],
    },
    'subei-millworker': {
      kind: 'employment', role: '纺纱挡车工', workplace: '申和纱厂二车间', employer: '申和纱厂', supervisor: '工头赵炳坤', colleague: '陈福生', publicPerson: '同班女工吴阿巧', terms: '按班计工，月底结算，停机与请假会扣工钱',
      duties: '接头、看锭、清理飞花并记录自己这一班的断头数',
      scenes: [
        '工头赵炳坤把一排频繁断头的锭位交给你和陈福生，要求下班前补足产数。你们先停下一台查出皮带偏位，少做了一段产量，却避免把手继续伸进不稳的机器。',
        '吴阿巧因孩子发热迟到，工头准备把整班缺数算到她名下。你拿出换班记录说明自己接过半班，最后工资各扣一小段；她答应下周替你跑一次药铺。',
        '月底工钱袋比工票少了两角。你和陈福生逐日核对停机时辰，账房承认漏记一次加班并补在下月；钱还没到手，但欠数和经手人已经写清。',
      ],
    },
    'subei-soldier': {
      kind: 'military', role: '步兵兼伤病搬运员', workplace: '所在连队的临时驻地', employer: '所在连队', supervisor: '周排长', colleague: '丁友顺', publicPerson: '卫生兵罗明山', terms: '领取口粮与饷项，调动、欠饷和补给均可能中断',
      duties: '行军警戒、搬运伤员、清点口粮，并记录同伴最后所在',
      scenes: [
        '周排长临时点名时少了两人，你与丁友顺沿上一处宿营地找回一只写有姓名的布包。人没有找到，你只把最后见到的时辰和方向记进名单。',
        '罗明山让你按住一名伤员的腿，他重新清洗布条并说明哪种伤必须后送。你学会了包扎，却也知道队里现有药品接不住所有人。',
        '发下来的口粮少了一袋，周排长要求各班自行匀。你把自己班的数目当面摊开，决定先给发热的人和明日担架手；下一顿在哪里仍没人能保证。',
      ],
    },
    'subei-refugee': {
      kind: 'mobile-work', role: '修补杂工兼临时搬运', workplace: '后方集市与临时落脚处', employer: '逐次雇工的铺户和住户', supervisor: '木器铺掌柜何正清', colleague: '同路人马顺子', publicPerson: '来补箱子的秦嫂', terms: '小活当日结，大件按完工结算，不保证下一次仍有活',
      duties: '补箱、修门、搬货，用当天工钱换口粮和住处',
      scenes: [
        '秦嫂抱来一只裂开的木箱，要赶在第二天上路前修好。你说清只能加固不能恢复原样，收下一半工钱买钉；她取箱时补齐余款，还留下下一处集市的地址。',
        '何正清让你和马顺子卸一车木料，却只肯按一个人的工钱算。你们当面拆分搬运数量，最后各领到半日钱；这家铺户是否再雇人仍没有保证。',
        '临时住处漏雨，你用一上午修门窗，房主答应抵掉三日床钱。材料不够，最里侧仍会进水；同住几户重新排了谁睡哪一边。',
      ],
    },
    'shen-scholar': {
      kind: 'teaching', role: '中学教员兼撰稿人', workplace: '明德中学与《江声》副刊', employer: '明德中学校务会与副刊编辑部', supervisor: '校长严伯修', colleague: '陆君平', publicPerson: '学生何佩真', terms: '教薪按月，稿费按采用篇数另结',
      duties: '备课、授课、批改文章，并在课余完成报刊稿件',
      scenes: [
        '何佩真交来的作文写到家里准备让她退学。你没有替她答应或拒绝，只把剩余学费、可借住处和课程进度写成一张清单，让她带回去继续商量。',
        '严伯修通知下月教薪可能延发，却希望课程照常。你与陆君平把必开的课和可延期的讲习分开，保住学生连续上课，也不得不把一篇稿子推迟交付。',
        '《江声》退回一篇稿，编辑说论点太散。你按退稿批注删去一段无法核实的传闻，改投后终于采用；稿费补上半月房租，文章也留下了明确的资料边界。',
      ],
    },
    'shen-newwoman': {
      kind: 'teaching', role: '女学教员兼识字班组织者', workplace: '启明女学与街坊识字班', employer: '启明女学校务会', supervisor: '教务主任陆君平', colleague: '沈静兰', publicPerson: '学生陶阿珍', terms: '女学按月发薪，街坊班按能够承担的学费维持',
      duties: '教授国文和算术，核对学生学费、住处与停学原因',
      scenes: [
        '陶阿珍连续三日没来，沈静兰陪你到她做工的铺面询问。她不是不想读，而是晚班换不了；你们把识字班挪到两日晚间，她仍要自己决定能否继续。',
        '校务会要求你多带一班却暂不加薪。你拿出已有课时和备课量，只答应代课两周；陆君平随后重新排班，额外工作没有被写成无尽的热心。',
        '一名学生的婚家来信催她停学。你把已交学费、可住地址和考试日期逐项告诉她，没有替她回信；第二周，她带着自己写好的答复回来请你校字。',
      ],
    },
    'shen-refugee': {
      kind: 'teaching', role: '临时学校教员', workplace: '后方借用祠堂开设的临时学校', employer: '迁校教师共同维持的校务组', supervisor: '陆君平', colleague: '方云和', publicPerson: '流动学生叶小川', terms: '教薪常以口粮和零散现钱混合发放',
      duties: '清点流动学生、抄写教材、授课并保存最后联系地址',
      scenes: [
        '叶小川只上了三天课就要随家人再走。你把学到的页码、下一处学校地址和他的家乡姓名写在一张纸上；课程中断了，学习没有被假装成已经完成。',
        '借用的祠堂临时要收回一间屋。你与方云和搬走书箱，把低年级并到廊下；少了一间教室，却保住了名册和下一周还能开的课。',
        '本月教薪只发到一袋米和半数现钱。校务组逐人说明缺口，你选择先接下能维持住处的部分，并把欠下数目写进共同账，不把欠薪说成奉献。',
      ],
    },
    'shen-professional': {
      kind: 'medical', role: '诊所接诊与药房助理', workplace: '惠民小诊所', employer: '诊所合伙人马会宁医师', supervisor: '马会宁医师', colleague: '护士罗秋白', publicPerson: '复诊病人陈桂嫂', terms: '按月领薪，出诊另记，欠费与转介分账',
      duties: '登记病情、配药、处理基础伤口并安排不能接治者转诊',
      scenes: [
        '陈桂嫂夜里抱着发热的孩子来敲门。你先量体温、核对吃过的药，再由马会宁决定转诊；她付不起全部车钱，诊所与她把欠费和返诊日期分别写下。',
        '罗秋白发现药柜里一批药受了潮。你们逐瓶停用并通知三个复诊病人改期，损失没有藏进总账；能替代的药和不能延误的病人被分开处理。',
        '一次外伤超出诊所能处理的范围，病家希望你们“先缝上再说”。你说明风险并联系更大的医院，陪到车来；没有收到这笔诊费，却避免把有限能力写成万能。',
      ],
    },
    'shanghai-heir': {
      kind: 'business', role: '顾记棉布号与织造作场经理', workplace: '顾记棉布号及后院织造作场', employer: '顾记家业，由你承担经营责任', supervisor: '父亲顾伯衡与账房孙立根', colleague: '女工徐云', publicPerson: '成衣铺客户薛老板', terms: '货款、工钱、原料和退货分别结账，账面收入不等于可支现金',
      duties: '接货单、采购棉纱、安排生产、验货并按期发放工钱',
      business: { name: '顾记棉布号', supplier: '恒丰货栈', product: '棉布与小批织造订单' },
      scenes: [
        '薛老板送回两匹染色不匀的布，要求整单扣款。你与徐云逐匹验出问题只在其中半匹，答应重做并退这一段货款；客户没有被一句“老关系”打发，作场也留下返工成本。',
        '恒丰货栈的棉纱迟了六天，机器和工人都在等。你拒绝先收一批明显受潮的货，改用较贵的小批现货接住两日班次；订单没有全丢，利润却真实减少。',
        '发薪日前一笔货款仍未到账。孙立根把现钱缺口摊在桌上，你先付普通工钱，自己和家门账延后；徐云代表工友确认数目，欠下的管理报酬另记而不是消失。',
      ],
    },
    'shanghai-newwoman': {
      kind: 'business', role: '缝纫与识字工作室主理人', workplace: '明仪缝纫识字工作室', employer: '自营工作室', supervisor: '你与合作者共同核账', colleague: '唐慧贞', publicPerson: '客户吴太太', terms: '课程按月收取低额学费，缝纫委托预收材料钱、交付后结余款',
      duties: '安排课程、量体裁衣、采购材料、核对委托范围和合作者工钱',
      business: { name: '明仪缝纫识字工作室', supplier: '福新布庄', product: '成衣修改、识字课程与小型委托' },
      scenes: [
        '吴太太取衣时临时要求改袖口，却不愿增加工钱。你拿出量体单和原约，只接下能在两日内完成的一次修改；她最终补了半份工钱，交付日期也重新写明。',
        '福新布庄送来的布比样布薄，唐慧贞担心已接的委托无法完成。你们退回不合规格的一卷，先联系三位客户说明延期；工作室保住信誉，也损失了这周收入。',
        '识字班一名学员付不起整月学费，却愿意每周来打扫两次。你把课程费和劳动时间写清，没有把帮工无限延长；她学完当月内容后自行决定继续缴费还是暂停。',
      ],
    },
    'shanghai-professional': {
      kind: 'employment', role: '机器行制图兼核账员', workplace: '协成机器行制图室', employer: '协成机器行', supervisor: '主任工程员曹克勤', colleague: '制图员程彦之', publicPerson: '订货客户周师傅', terms: '按月领薪，外部小委托另签范围和交付日',
      duties: '绘制零件图、核对材料数量、记录修改版本并与车间确认尺寸',
      scenes: [
        '曹克勤要求你当晚重画一张零件图，却没有说明是哪一版尺寸。你先到车间与周师傅核对实物，发现旧图抄错一个孔距；加班到夜里，返工范围和加班钱也写进单据。',
        '客户临时把一台机器的修配范围扩大一倍。你拿出原委托逐项圈出新增内容，只答应先完成停机最急的零件；其余另报工期，没有让“顺手”吞掉几天劳动。',
        '材料账和仓库实数差了两件铜套。你与程彦之沿领料单查到一次未签字的夜班领用，补齐经手记录；没人因此被随意定成偷料，库存问题也没有继续藏着。',
      ],
    },
  };

  C.routeContactProfiles = {
    'subei-stay': [
      { id: 'zhao_youde', label: '赵有德', role: '替田主管租，也熟悉各户收成', status: 'nearby', relation: 16, born: 1884 },
      { id: 'feng_sanjie', label: '冯三姐', role: '河埠买粮与贩菜的船娘', status: 'nearby', relation: 12, born: 1894 },
      { id: 'liu_muchang', label: '刘木匠', role: '替村里修车轮和农具', status: 'nearby', relation: 14, born: 1888 },
    ],
    'subei-millworker': [
      { id: 'zhao_bingkun', label: '赵炳坤', role: '申和纱厂二车间工头', status: 'coworker', relation: 12, born: 1886 },
      { id: 'wu_aqiao', label: '吴阿巧', role: '同班挡车女工，也照看一个孩子', status: 'coworker', relation: 20, born: 1907 },
      { id: 'luo_jisheng', label: '罗季生', role: '负责修机与停机记录的机匠', status: 'coworker', relation: 15, born: 1891 },
    ],
    'subei-soldier': [
      { id: 'zhou_paizhang', label: '周排长', role: '负责点名、口粮与调动的排长', status: 'traveling', relation: 13, born: 1892 },
      { id: 'luo_mingshan', label: '罗明山', role: '物资有限的卫生兵', status: 'traveling', relation: 22, born: 1903 },
      { id: 'he_yongfu', label: '何永福', role: '同班士兵，常替人写家书地址', status: 'traveling', relation: 18, born: 1909 },
    ],
    'subei-refugee': [
      { id: 'he_zhengqing', label: '何正清', role: '偶尔雇短工的木器铺掌柜', status: 'nearby', relation: 14, born: 1889 },
      { id: 'ma_shunzi', label: '马顺子', role: '同路做搬运和修补的伙伴', status: 'traveling', relation: 23, born: 1906 },
      { id: 'qin_sao', label: '秦嫂', role: '带着孩子迁徙、靠小买卖过日子', status: 'traveling', relation: 19, born: 1901 },
    ],
    'shen-scholar': [
      { id: 'yan_boxiu', label: '严伯修', role: '明德中学校长', status: 'colleague', relation: 14, born: 1878 },
      { id: 'he_peizhen', label: '何佩真', role: '需要在学业与家计间商量的学生', status: 'nearby', relation: 18, born: 1915 },
      { id: 'jiang_editor', label: '蒋述文', role: '《江声》副刊编辑', status: 'distant', relation: 15, born: 1893 },
    ],
    'shen-newwoman': [
      { id: 'tao_azhen', label: '陶阿珍', role: '白天做工、晚上来识字班的学生', status: 'nearby', relation: 21, born: 1913 },
      { id: 'qian_jiawu', label: '钱嘉梧', role: '启明女学教务员', status: 'colleague', relation: 15, born: 1890 },
      { id: 'sun_yulan', label: '孙玉兰', role: '负责住宿与学费登记的女学同事', status: 'colleague', relation: 18, born: 1901 },
    ],
    'shen-refugee': [
      { id: 'ye_xiaochuan', label: '叶小川', role: '随家人流动、断续上课的学生', status: 'traveling', relation: 18, born: 1927 },
      { id: 'zheng_shuyi', label: '郑淑仪', role: '共同保管书箱与学生名册的教师', status: 'traveling', relation: 23, born: 1902 },
      { id: 'wang_zhanggui', label: '王掌柜', role: '愿意用后屋换取教孩子识字的铺户', status: 'nearby', relation: 14, born: 1886 },
    ],
    'shen-professional': [
      { id: 'ma_huining', label: '马会宁', role: '惠民小诊所合伙医师', status: 'colleague', relation: 18, born: 1885 },
      { id: 'luo_qiubai', label: '罗秋白', role: '负责换药和病人登记的护士', status: 'colleague', relation: 23, born: 1902 },
      { id: 'chen_guisao', label: '陈桂嫂', role: '带孩子多次复诊的街坊病人', status: 'nearby', relation: 14, born: 1898 },
    ],
    'shanghai-heir': [
      { id: 'xue_laoban', label: '薛老板', role: '向顾记订棉布的成衣铺客户', status: 'nearby', relation: 16, born: 1884 },
      { id: 'hengfeng_laoqian', label: '钱守义', role: '恒丰货栈负责棉纱交付的伙计', status: 'nearby', relation: 14, born: 1890 },
      { id: 'cao_jigong', label: '曹师傅', role: '负责作场机器检修的机工', status: 'coworker', relation: 18, born: 1881 },
    ],
    'shanghai-newwoman': [
      { id: 'wu_taitai', label: '吴太太', role: '常来修改衣服、会当面谈价的客户', status: 'nearby', relation: 14, born: 1887 },
      { id: 'fuxin_zhou', label: '周启元', role: '福新布庄负责送布和结账的伙计', status: 'nearby', relation: 13, born: 1892 },
      { id: 'lin_xiaomei', label: '林小梅', role: '工作室学徒兼识字班学员', status: 'colleague', relation: 21, born: 1912 },
    ],
    'shanghai-professional': [
      { id: 'cao_keqin', label: '曹克勤', role: '协成机器行主任工程员', status: 'coworker', relation: 15, born: 1883 },
      { id: 'zhou_shifu', label: '周师傅', role: '负责把图纸落实到车床的师傅', status: 'coworker', relation: 19, born: 1889 },
      { id: 'lin_weiyuan', label: '林维元', role: '经常修改要求的机器行客户', status: 'nearby', relation: 12, born: 1880 },
    ],
  };

  C.post1949People = {
    mainland: { employer: '地方劳动介绍处的秦干事', coworker: '同班做事的赵玉成', neighbor: '新住处邻居梁嫂' },
    'hong-kong': { employer: '用工管事何启昌', coworker: '同班工友阿泉', neighbor: '合租住户麦嫂' },
    taiwan: { employer: '单位人事员林正修', coworker: '同组同事陈月琴', neighbor: '同院住户吴伯' },
    overseas: { employer: '工场领班陈炳祥', coworker: '同工段的何瑞安', neighbor: '房东玛丽亚' },
    'in-motion': { employer: '短工介绍人老金', coworker: '同路做工的许达', neighbor: '临时客店的老板娘' },
    unsettled: { employer: '铺户掌柜鲁成发', coworker: '短工搭档小孟', neighbor: '暂住处邻居高嫂' },
  };

  C.healthProfiles = {
    'subei-stay': ['风寒发热', '腰腿疼痛', '雨季后的肠胃不适'],
    'subei-millworker': ['飞花引起的久咳', '机器噪声后的耳鸣', '手指与肩背劳损'],
    'subei-soldier': ['行军旧伤', '反复失眠与惊醒', '缺粮后的胃痛'],
    'subei-refugee': ['迁徙中的低烧', '饮水不洁后的腹泻', '长期负重造成的腰痛'],
    'shen-scholar': ['久读后的眼痛', '过劳头痛', '久坐与欠眠造成的胸闷'],
    'shen-newwoman': ['连续授课后的失声', '过劳头痛', '长期站立造成的腿痛'],
    'shen-refugee': ['途中发热', '缺食后的胃病', '久行造成的足伤'],
    'shen-professional': ['夜间出诊后的过劳', '接触病患后的发热', '长期站立造成的腰痛'],
    'shanghai-heir': ['账房熬夜后的胃痛', '长期焦虑造成的失眠', '作场粉尘引起的咳嗽'],
    'shanghai-newwoman': ['赶工后的手腕疼痛', '连续授课后的失声', '睡眠不足造成的头痛'],
    'shanghai-professional': ['伏案制图造成的眼痛', '车间噪声后的耳鸣', '加班造成的胃痛'],
  };

  var workActionIds = {
    farm: true, market: true, 'repair-dike-tools': true, 'negotiate-rent-ledger': true,
    'mill-shift': true, 'learn-machine-repair': true, 'worker-injury-fund': true,
    'military-drill': true, 'field-first-aid': true, 'keep-comrade-roll': true,
    'flee-road': true, 'odd-job': true, 'build-temporary-shelter': true,
    'write-and-teach': true, 'preserve-library': true, 'public-lecture': true,
    'literacy-class': true, 'negotiate-school-terms': true,
    'preserve-school-register': true, 'organize-temporary-school': true,
    'clinic-service': true, 'clinic-study': true,
    'run-business': true, 'audit-wages': true, 'diversify-orders': true,
    workroom: true, 'paid-commission': true, 'organize-care-network': true,
    'salaried-technical-work': true, 'independent-commission': true,
  };
  C.actions.forEach(function (action) {
    if (workActionIds[action.id]) action.careerAction = true;
  });

  C.actions.push(
    { id: 'seek-treatment', name: '把这次不舒服看明白', minAge: 5, spirit: 2, lifeAction: 'health', delta: { money: -2, health: 3, mind: 1 }, note: '去找能够接触到的医生、药铺或照料者，说清症状、费用和接下来如何休养。' },
    { id: 'talk-with-family', name: '坐下来听一位家人把话说完', minAge: 10, spirit: 2, lifeAction: 'family', delta: { relation: 2, mind: 1 }, note: '不是泛泛“陪家人”，而是听父母、配偶或孩子说出当年的工作、身体和需要。' },
    { id: 'share-evening-with-spouse', name: '与配偶谈清最近的一次分歧', minAge: 18, spirit: 2, lifeAction: 'spouse', requiresSpouse: true, delta: { relation: 2, mind: 2 }, note: '谈钱、家务、双方父母或工作时间；可能和好，也可能明确仍未解决的部分。' },
    { id: 'spend-time-with-friend', name: '去见一位具体朋友并听近况', minAge: 12, spirit: 2, lifeAction: 'friend', delta: { network: 1, relation: 2, mind: 1 }, note: '朋友有自己的工作、家人和去向；见面会留下名字、谈话和关系变化。' }
  );

  var marriage = C.decisions.find(function (item) { return item.id === 'marriage'; });
  if (marriage) {
    marriage.options.forEach(function (option) {
      option.relationshipEntry = option.id === 'marry-with-terms' ? 'married' : (option.id === 'refuse-marriage' ? 'single-by-choice' : 'delayed');
    });
  }

  C.decisions.push(
    {
      id: 'adult-partnership', yearByAge: 26, requiresSubjectStatus: { spouse: 'not-met' }, title: '二十六岁时怎样安排亲密生活',
      prompt: '此前没有成婚不等于生活停在空白处。工作和往来中出现了一位愿意继续相处的人，你要说明是否共同生活、保持各自住处，还是明确继续独身；三种选择都会改变以后由谁分担日常。',
      options: [
        { id: 'later-partnership', label: '我与对方谈清工作、钱和双方父母的责任，再开始共同生活', relationshipEntry: 'married-later', spouseStatus: 'married-with-terms', delta: { relation: 3, mind: 2, money: -2 }, fact: '二十六岁时与工作往来中认识的人协商后开始共同生活。' },
        { id: 'separate-homes-partnership', label: '我保留各自住处和收入，先建立不合并全部家计的伴侣关系', relationshipEntry: 'partner-separate-homes', spouseStatus: 'married-with-terms', delta: { relation: 2, mind: 3, money: -1 }, fact: '二十六岁时建立伴侣关系，但双方继续保留各自住处与收入。' },
        { id: 'continue-single-life', label: '我明确继续独身，把照料和晚年支持放在朋友、亲族与自己的储备上', relationshipEntry: 'single-by-choice', spouseStatus: 'not-met', delta: { mind: 4, network: 2 }, fact: '二十六岁时决定继续独身，并开始经营非婚姻的长期支持网络。' },
      ],
    },
    {
      id: 'marriage-conflict', yearByAge: 29, requiresSubjectStatus: { spouse: 'married-with-terms' }, title: '一笔钱和一个夜晚引发的争吵',
      prompt: '这个月的钱只够先接住一件事：你想给父母寄钱或补生意缺口，配偶却已经为房租、医药或自己的家人留了用途。争吵真正涉及的不是谁更孝顺，而是谁有权决定共同收入和谁总在承担没有写下的劳动。',
      options: [
        { id: 'rebuild-shared-budget', label: '我先承认没有提前商量，把双方收入、家用和各自可支配的钱重新分账', relationshipResolution: 'reconcile-budget', delta: { relation: 4, mind: 2, money: -1 }, fact: '一次因钱和家庭责任发生的争吵后，夫妻重新划分了共同家用与个人支配的钱。', endingFact: true },
        { id: 'divide-household-labor', label: '我把做饭、照料、跑腿和加班时间逐项写下，重新分担而不是只谈钱', relationshipResolution: 'reconcile-labor', delta: { relation: 3, health: 1, mind: 3 }, fact: '一次争吵后，夫妻把家务、照料和工作时间重新分担。', endingFact: true },
        { id: 'temporary-separation', label: '我承认现在谈不拢，先分开住一段时间，并约定何时再谈钱和去留', relationshipResolution: 'separate', delta: { relation: -3, mind: 2, position: -2 }, subjectEffects: { spouse: { status: 'separated' } }, fact: '一次争吵后，夫妻暂时分开居住，并保留以后重新协商的日期。', endingFact: true },
      ],
    },
    {
      id: 'midlife-health-response', yearByAge: 46, title: '身体第一次不肯照旧配合',
      prompt: '一种反复出现的不适已经影响工作和睡眠。你不能只看“健康”数字，需要决定是否花钱看病、减少一段工作，或先记下症状并向熟悉的人求助。',
      options: [
        { id: 'seek-doctor-and-rest', label: '我说明症状和持续时间，花钱求医并停下一部分工作', healthResolution: 'treatment', delta: { money: -4, health: 5, mind: 2 }, fact: '四十六岁时为反复不适求医并减少了一段工作。', endingFact: true },
        { id: 'reduce-workload', label: '我和雇主、客户或家人谈清，暂时减少最伤身体的职责', healthResolution: 'reduced-work', delta: { money: -2, health: 4, relation: 1 }, fact: '四十六岁时因身体不适调整了工作职责与工时。', endingFact: true },
        { id: 'record-and-observe', label: '我先逐日记录发作、饮食和工时，请熟人帮忙判断何时必须就医', healthResolution: 'monitor', delta: { knowledge: 2, mind: 3, health: 1 }, fact: '四十六岁时开始持续记录反复不适，并设下必须就医的条件。', endingFact: true },
      ],
    },
    {
      id: 'business-customer-terms', yearByAge: 31, routes: ['shanghai-heir', 'shanghai-newwoman'], title: '一位老客户临时改变了约定',
      prompt: '材料已经买下、工已经做到一半，客户却要求改规格并沿用原价。你还要顾及供应商账期、合作者工钱与以后是否继续往来，不能只用“经营”两个字跳过这笔具体生意。',
      options: [
        { id: 'renegotiate-customer', label: '我拿出原单，把新增材料、工时和交期逐项重谈', businessResolution: 'renegotiate', delta: { mind: 2, network: 1, money: 1 }, fact: '三十一岁时面对客户临时改约，按新增材料和工时重新谈定价格与交期。', endingFact: true },
        { id: 'honor-original-scope', label: '我只完成原先写明的部分，拒绝把新增要求算成同一笔工', businessResolution: 'hold-scope', delta: { mind: 3, fame: 1, money: -1 }, fact: '三十一岁时坚持按原约交付，没有无偿接下客户新增的要求。', endingFact: true },
        { id: 'absorb-one-time-loss', label: '我承担这一次返工，但把损失和以后不再接受的条件写进账', businessResolution: 'one-time-loss', delta: { money: -3, relation: 1, craft: 2 }, fact: '三十一岁时承担了一次返工损失，并为以后订单重新设定边界。', endingFact: true },
      ],
    }
  );
})(typeof window !== 'undefined' ? window : globalThis);
