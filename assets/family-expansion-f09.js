// 民国人生 · F09 东北垦殖与移民家庭运行时包 v0.7.13
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f09.js');

  C.version = '0.7.13';
  C.familyDecisionKeys.northeastsettlers = { path: 'northeast-settler-path', war: 'northeast-settler-occupation' };
  Object.assign(C.designRegistry.families.F09, {
    designStatus: 'runtime-reviewed-first-round', runtimeStatus: 'playable-verified', runtimeFamilyKey: 'northeastsettlers',
  });
  C.runtimeFamilyDesignMap.northeastsettlers = 'F09';
  Object.assign(C.legacyRouteDomainMap, {
    'northeast-seasonal-farm-worker': 'D02',
    'northeast-household-farm-sideline': 'D03',
    'northeast-rural-tool-repairer': 'D04',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F09-JILIN-ORAL-HISTORY': {
      label: '吉林省地方志：《寻路关东——长白山区移民口述实录》出版介绍',
      url: 'https://dfz.jl.gov.cn/fzdt/201809/t20180929_5223225.html',
      supports: ['以长白山区聚居地和田野口述记录清末至二十世纪六十年代移民及后裔的生存经历；不能替合成家庭提供精确个人事实'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F09-MIGRATION-CONTEXT': {
      label: '国家民委道中华：长城内外都是家，“闯关东”圆梦第二故乡',
      url: 'https://www.neac.gov.cn/seac/c103391/202301/1160027.shtml',
      supports: ['关内向东北的长期迁移、携家带口与寻亲落脚形成跨地亲缘；来源中的宏观叙述不等于每户都取得土地或融入顺利'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F09-MIXED-COMMUNITIES': {
      label: '国家民委：中国朝鲜族历史沿革',
      url: 'https://www.neac.gov.cn/seac/ztzl/cxz/lsyg.shtml',
      supports: ['十九世纪后东北边地存在朝鲜族移民、招垦与多族群杂居；朴顺姬及其家庭为合成人物，不代表所有朝鲜族居民'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F09-LAND-SEIZURE': {
      label: '新华社：东北烈士纪念馆文物见证日本农业移民侵略',
      url: 'https://www.news.cn/local/20240918/d9fbcb926b89459c8d79d1fb4a766a30/c.html',
      supports: ['九一八后日本农业移民侵略与土地侵占改变东北农户的土地、住处和生计；不把合成地块写成馆藏文物的真实个案'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F09-LIAONING-HISTORY': {
      label: '辽宁省人民政府：历史沿革',
      url: 'https://www.ln.gov.cn/web/sqgk/lsyg/index.shtml',
      supports: ['东北长期存在多族群居民、农业开垦和人口流动；1931 年九一八事变后东北进入日本殖民统治时期'],
      status: 'source-reviewed-first-round',
    },
  });

  C.families.northeastsettlers = {
    key: 'northeastsettlers', name: '东北垦殖、移民与邻屯生计家', born: 1910,
    place: '吉林合成长白山北麓邻屯与小站附近', defaultSeed: 910,
    defaultNames: { 男: '王守田', 女: '王守兰' },
    motif: '关内来信、尚待核清的垦作记录、邻屯既有用地、严寒冬储和小站货工共同决定一家怎样留下；耕过不等于拥有，熟人引路不等于取得土地或岗位。',
    start: { body: 49, knowledge: 22, craft: 37, mind: 42, network: 29, fame: 9 },
    startRes: { money: 8, health: 77, relation: 69, position: 17 },
    subjects: {
      mother: { label: '母亲', status: 'alive-working', health: 67, agency: 97, note: '经营菜园、酱缸和寄宿饭食，保留菜种、器具、收入与娘家通信' },
      father: { label: '父亲', status: 'alive-working', health: 69, agency: 92, note: '做佃作、垦作与季节运输，只能处理已确认地块、借种和自己的工钱' },
      spouse: { label: '配偶', status: 'not-met', health: 70, agency: 95, note: '婚后保留自己的土地／工资、原籍责任、语言、住处和是否迁移的决定' },
      household: { label: '两地亲缘与现住家口', status: 'settling-with-two-place-ties', strength: 55, agency: 91 },
      support: { label: '邻屯农户、菜农、修理人和货场工', status: 'cooperate-with-boundaries', strength: 31, agency: 95 },
      connections: { label: '农忙、货场、集市与修理试工门路', status: 'trial-only', strength: 25, agency: 92 },
      workers: { label: '季节雇工、帮饭人、修理学徒与货场短工', status: 'separate-wages-and-tools', strength: 24, agency: 95 },
      ledger: { label: '地块、借种、冬储、副业、工具与工票分账', status: 'confirmed-disputed-unknown', strength: 31, agency: 97 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 89, note: '不自动继承争议地、父母债、车站岗位、工具或两地照料责任' },
    },
    contacts: {
      f09_wang_zhanhai: { label: '王占海', role: '核已确认地块、借种、收成和季节运输工钱的父亲', status: 'family', relation: 63, agency: 92, note: '可继续佃作、转季节工、伤病或再迁，不能凭先来后到处分邻屯用地' },
      f09_liu_suzhi: { label: '刘素芝', role: '经营菜园、做酱与寄宿饭食并保留娘家通信的母亲', status: 'family', relation: 72, agency: 97, note: '可拒绝以副业收入和菜种替争议土地作担保' },
      f09_wang_lanzhi: { label: '王兰芝', role: '在农作、车站识字工作和自己婚或不婚生活之间选择的手足', status: 'family', relation: 55, agency: 97, note: '不默认守地或养老，可试工、落选、迁走、成家、独居或有限返家' },
      f09_yao_chunyi: { label: '姚春义', role: '维护自家用地、水井次序并以修农具换粮的邻屯农户', status: 'nearby', relation: 29, agency: 95, note: '能说明自己的地界和工具，不能替全屯分地或保证王家资格' },
      f09_piao_shunji: { label: '朴顺姬', role: '保留家庭菜地、语言、客户和运输决定的近郊菜农', status: 'nearby', relation: 31, agency: 98, note: '可拼车、竞争、分账或停止合作，不是王家的固定翻译与免费门路' },
      f09_chen_ronggui: { label: '陈荣贵', role: '按件数、车次和工票核装卸并争取稳定班的货场工', status: 'nearby', relation: 24, agency: 93, note: '只能告知公开缺工，不能保证录用或把临时工票写成固定岗位' },
    },
  };

  Object.assign(C.routes, {
    'northeast-seasonal-farm-worker': { name: '东北佃作、农忙雇工与季节运输', family: 'northeastsettlers', summary: '逐季核地块、种粮、东家、工钱、食宿、欠薪、冻伤和换工；耕过、雇过或住过都不自动产生土地权利。' },
    'northeast-household-farm-sideline': { name: '东北菜园、养殖与家庭副业经营', family: 'northeastsettlers', summary: '管理菜种、禽畜、酱缸、饭食、寄宿客、摊位、损耗和家庭劳动报酬；副业不是女性无偿家务，也不保证年年盈利。' },
    'northeast-rural-tool-repairer': { name: '东北邻屯农具修理、车站货工与小作坊', family: 'northeastsettlers', summary: '从借用工具、修犁具和货场短工做起，处理材料、工单、返工、工资、工具产权与停工；会修不等于拥有姚家的工具或车站职位。' },
  });

  C.actions.push(
    { id: 'f09-land-seed-winter-ledger', name: '跟父亲核地界、借种、农时与冬储', families: ['northeastsettlers'], minAge: 6, spirit: 3, delta: { craft: 3, knowledge: 2, relation: 1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f09_wang_zhanhai: { relation: 2 }, f09_yao_chunyi: { relation: 1 } }, note: '已确认、争议与借用分别记；干过几年不能替代所有人和经手记录。' },
    { id: 'f09-garden-food-lodging-ledger', name: '跟母亲管菜种、酱缸、饭食与寄宿账', families: ['northeastsettlers'], minAge: 6, spirit: 2, delta: { craft: 3, mind: 1, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f09_liu_suzhi: { relation: 2 }, f09_piao_shunji: { relation: 1 } }, note: '菜种、预付饭钱、客人物件和母亲收入不进入土地债。' },
    { id: 'f09-station-literacy-tool-practice', name: '去小站认车次、工票、货号与修理工单', families: ['northeastsettlers'], minAge: 8, spirit: 3, delta: { knowledge: 3, craft: 2, network: 1 }, contactEffects: { f09_chen_ronggui: { relation: 2 }, f09_yao_chunyi: { relation: 1 } }, note: '只练公开单据和工具交接；认识货场人不等于录用。' },
    { id: 'f09-seasonal-field-shift', name: '完成一段播种、除草、收割或运输季工', routes: ['northeast-seasonal-farm-worker'], minAge: 15, spirit: 4, careerAction: true, delta: { body: 2, craft: 3, money: 2, health: -1 }, contactEffects: { f09_field_supervisor: { relation: 1 }, f09_field_coworker: { relation: 2 } }, note: '先写东家、地块、工期、食宿、工钱与结算日；停工和欠薪当年给结果。' },
    { id: 'f09-seasonal-wage-health-followup', name: '核季工工钱、食宿、冻伤与下一份活', routes: ['northeast-seasonal-farm-worker'], minAge: 17, spirit: 3, careerAction: true, delta: { mind: 3, network: 2, health: 1 }, contactEffects: { f09_field_supervisor: { relation: 1 }, f09_field_customer: { relation: 1 } }, note: '已做工、欠款、看诊、休工和换东家分别处理。' },
    { id: 'f09-sideline-production-market', name: '完成一轮菜园、禽畜、做酱、饭食与赶集', routes: ['northeast-household-farm-sideline'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, money: 2, network: 2, health: -1 }, contactEffects: { f09_piao_shunji: { relation: 2 }, f09_sideline_customer: { relation: 1 } }, note: '原料、照料、损耗、家人劳动、客人实付和未卖出分别入账。' },
    { id: 'f09-sideline-animal-loss-account', name: '核菜损、禽畜病、寄宿饭钱与合运分账', routes: ['northeast-household-farm-sideline'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 3, relation: 1 }, contactEffects: { f09_sideline_supplier: { relation: 1 }, f09_sideline_coworker: { relation: 2 } }, note: '损失、治疗、退钱、停止合作和下季是否再做都有具体答复。' },
    { id: 'f09-rural-repair-order', name: '完成一件农具检查、拆修、试用与工钱交接', routes: ['northeast-rural-tool-repairer'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 4, knowledge: 1, money: 2, health: -1 }, contactEffects: { f09_yao_chunyi: { relation: 2 }, f09_repair_customer: { relation: 1 } }, note: '旧损、材料、借用工具、工时、试用与返工范围写在同一张工单。' },
    { id: 'f09-repair-station-handoff', name: '核修理材料、货场短工、工具归还与下一单', routes: ['northeast-rural-tool-repairer'], minAge: 17, spirit: 3, careerAction: true, delta: { craft: 2, mind: 2, network: 2 }, contactEffects: { f09_repair_supervisor: { relation: 1 }, f09_repair_coworker: { relation: 2 } }, note: '修理、运输和货场工票是三种结算，不把临时缺工写成固定岗位。' }
  );

  var sourceIds = ['SRC-F09-JILIN-ORAL-HISTORY', 'SRC-F09-MIGRATION-CONTEXT', 'SRC-F09-MIXED-COMMUNITIES', 'SRC-F09-LAND-SEIZURE', 'SRC-F09-LIAONING-HISTORY'];
  function option(id, label, delta, echo, fact, followTitle, followText, extra) {
    return Object.assign({ id: id, label: label, delta: delta, echo: echo, fact: fact, endingFact: true, followup: { title: followTitle, text: followText } }, extra || {});
  }
  function installDecision(item) {
    item.options.forEach(function (choice) {
      var followup = choice.followup;
      C.ordinaryEvents.push({
        id: 'echo-' + choice.echo.replace(/:/g, '-'), title: followup.title, text: followup.text,
        year: item.followYear, priority: 45, requiresEchoes: [choice.echo],
        families: item.families ? item.families.slice() : undefined, routes: item.routes ? item.routes.slice() : undefined,
        sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
      });
      delete choice.followup;
    });
    delete item.followYear;
    C.decisions.push(item);
  }

  installDecision({
    id: 'northeast-settler-path', year: 1924, followYear: 1925, families: ['northeastsettlers'], title: '三份有期限的活里哪一份成为成年第一段谋生',
    prompt: '农忙东家、刘素芝与朴顺姬的副业合做、姚春义与陈荣贵的修理和货场短工都只给一次机会。你要问清地块或物件、职责、工期、食宿、工钱、工具和答复日。',
    options: [
      option('seasonal-farm-trial', '去已确认地块试做农忙、收割与季节运输', { body: 3, craft: 2, money: 1 }, 'f09:path:seasonal', '1924 年进入有东家、工期和结算日的农业季工。', '农忙结束给出工资与下一季答复', '男工更常被安排重负和远运，女工更常兼分拣、饭食与近地农活；两者的实际工时都要结算，也都可能转班、伤病或被欠薪。', { route: 'northeast-seasonal-farm-worker' }),
      option('household-sideline-trial', '跟母亲和朴顺姬试做菜园、禽畜、做酱与饭食', { craft: 3, relation: 2, money: 1 }, 'f09:path:sideline', '1924 年进入有原料、劳动与分账的家庭副业试做。', '第一批菜、酱和饭食得到真实收支', '刘素芝保留菜种与缸具，朴顺姬只投入列明菜筐和运输；你按实际劳动取报酬，没有因同住取得母亲收入。', { route: 'northeast-household-farm-sideline' }),
      option('rural-repair-trial', '跟姚春义修一批农具，并核一班货场短工', { craft: 3, knowledge: 2, money: 1 }, 'f09:path:repair', '1924 年进入邻屯农具修理与小站短工试做。', '一件修理和一张工票分别结算', '姚春义按工单核修件，陈荣贵只给当日货场工票；男工较常兼搬运，女工较常从清点、缝补和零件交接进入，谁都没有自动取得工具或固定班。', { route: 'northeast-rural-tool-repairer' }),
    ],
  });

  installDecision({
    id: 'northeast-settler-winter-debt-1921', year: 1921, followYear: 1922, families: ['northeastsettlers'], title: '种粮、冬储、漏屋与原籍来信同时压来时先接哪一头',
    prompt: '原籍老人病了，家里刚借到来季种粮，屋顶漏风，母亲还有寄宿客预付饭钱。有限粮钱不能被一句“顾全全家”含糊分掉。',
    options: [
      option('winter-keep-seed-food', '封存最低种粮、柴和口粮，再写明能寄多少', { money: -1, health: 2, craft: 1 }, 'f09:winter:seed', '1921 年先保留最低种粮、柴和冬储。', '屋里有粮柴但原籍只收到有限答复', '王占海封好来季种粮，刘素芝留足寄宿客已付的饭食；原籍收到一笔小钱和下一次回信日，没有被承诺无限接济。'),
      option('winter-send-limited-remittance', '按能力寄一笔并明确此后不能持续', { money: -3, relation: 3, health: -1 }, 'f09:winter:remit', '1921 年向原籍寄出有上限的一笔钱。', '两地亲缘得到答复，现住屋却少修一处', '信中写清金额与下一次只能寄信，原籍亲属自己决定怎样使用；王家暂补最漏的一段屋顶，寒潮时仍要另找柴。'),
      option('winter-repair-house-delay-debt', '先修屋买柴，与具名债权人约下一次还款', { money: -2, health: 3, position: -1 }, 'f09:winter:house', '1921 年先修漏屋并把一笔债延期到春耕后。', '住处挡住风，延期债没有消失', '姚春义只借一套修屋工具，债权人留下春耕后日期；母亲的饭食预付未被动用，原籍先收到说明而不是假钱。'),
    ],
  });

  installDecision({
    id: 'route-northeast-seasonal-farm-worker-1929', year: 1929, followYear: 1930, routes: ['northeast-seasonal-farm-worker'], title: '东家说收成不足，只肯结一半季工钱时怎样处理',
    prompt: '你和同伴已经做完约定地块，东家把天气损失、食宿和工钱混在一起。每个人工日、预支、粮食和欠款都应分开确认。',
    options: [
      option('seasonal-count-workdays', '按工日、地块和已领食宿逐项核算', { knowledge: 2, mind: 3, money: 1 }, 'f09:seasonal:count', '1929 年按工日核一笔农业季工欠薪。', '已确认工钱和歉收损失分开', '东家结清七成并写余款日，天气损失没有全扣给雇工；两名同伴各自拿到自己的工日记录。'),
      option('seasonal-take-part-leave-date', '先收无争议部分，写明余款和离场日期', { money: 2, relation: 1, position: -1 }, 'f09:seasonal:part', '1929 年收下无争议季工钱并保留余款。', '离场没有把欠款变成已经结清', '你取走已确认钱粮，交还借用工具并离开；欠款人、金额范围和下次核对日仍在，不让“各退一步”抹掉。'),
      option('seasonal-change-employer', '停止继续做工，带记录换一名已核东家', { network: 2, money: -1, mind: 2 }, 'f09:seasonal:change', '1929 年因欠薪停止为原东家继续做工。', '换工损失几日却形成新条件', '陈荣贵只介绍公开缺工，你仍核工期和食宿；旧欠薪没有自动追回，新东家也没有因介绍保证长久。'),
    ],
  });
  installDecision({
    id: 'route-northeast-seasonal-farm-worker-1946', year: 1946, followYear: 1947, routes: ['northeast-seasonal-farm-worker'], title: '战后是继续受薪、转固定农事还是组织有限季工小队',
    prompt: '地块、东家和工票都在重新确认。多年农活经验能换岗位，却不能让你取得别人土地，也不能让同伴无条件跟随。',
    options: [
      option('seasonal-remain-waged', '继续按季受薪，只接地块和结算明确的活', { money: 2, health: 1, position: 1 }, 'f09:seasonal:waged', '1946 年继续做有工期和工资答复的农业季工。', '一季一结而非自动稳定', '你减少最重远运，仍按地块和工日结算；东家、食宿和下一季缺工分别答复，土地仍归实际权利人。'),
      option('seasonal-fixed-field-hand', '转一处固定农事岗位，写清住处与休工', { money: 2, relation: 1, health: 1 }, 'f09:seasonal:fixed', '1946 年转为一处有期限的固定农事帮工。', '固定岗位仍有东家和退出日期', '协议列明住处、农时、冬季轻活和伤病休工；王家争议地没有并入雇主土地，原籍责任仍另谈。'),
      option('seasonal-limited-work-team', '以自有工具和明示工资组织有限季工小队', { money: -4, craft: 3, network: 2 }, 'f09:seasonal:team', '1946 年组织有工具、工钱和退出边界的季工小队。', '小队第一季只有四名雇工和两处地块', '四名雇工逐人登记工日与食宿，姚春义只借一套标明归还日的工具；小队按劳动服务收费，不取得东家土地、粮食或家口。', { enterpriseStart: { id: 'f09-seasonal-work-team', name: '吉林合成守义农忙小队', domainKey: 'D43', kind: 'bounded-seasonal-farm-work-team', workplace: '吉林合成北麓邻屯两处已确认作业地', product: '按地块、工日、食宿和结算日提供的季节农业劳动', employees: 4, partners: [{ personId: 'contact:f09_yao_chunyi', role: '有限工具出借与修理合作者' }], asset: { id: 'seasonal-team-tools', kind: 'documented-farm-work-tools', description: '主角自有工具与一套按期归还的借用工具' }, debt: { id: 'seasonal-team-wage-buffer', creditor: '具名邻屯借款人', purpose: '首季雇工工资与食宿周转' } } }),
    ],
  });

  installDecision({
    id: 'route-northeast-household-farm-sideline-1929', year: 1929, followYear: 1930, routes: ['northeast-household-farm-sideline'], title: '寒害与禽病同时出现时怎样保住副业边界',
    prompt: '一畦菜受寒，一批禽畜出现相似症状，寄宿客已经预付饭钱。不能把病畜、客饭和下季菜种混成一笔损失。',
    options: [
      option('sideline-isolate-record', '隔离有症状禽畜，逐项记录菜损和客饭', { craft: 3, health: 1, money: -1 }, 'f09:sideline:isolate', '1929 年隔离有症状禽畜并分开记录副业损失。', '没有靠猜测继续出售', '有症状禽畜停止出手，剩余菜按成色说明；寄宿客仍吃到已付饭食，朴顺姬决定暂停本次合运。'),
      option('sideline-reduce-refund', '缩掉易坏品项，退回无法履行的预付', { money: -2, mind: 3, relation: 2 }, 'f09:sideline:refund', '1929 年缩减副业并退回无法履行的一部分预付。', '少收入换来清楚答复', '刘素芝保留菜种和酱缸，退两名客人未吃饭钱；损失没有摊给帮饭人，下一季是否恢复另行决定。'),
      option('sideline-sell-confirmed-safe', '只出售确认无问题的部分并停止新订单', { money: 1, position: 1, network: -1 }, 'f09:sideline:safe', '1929 年只处理确认无问题的菜与饭食。', '顾客减少但病损没有继续扩散', '三位顾客得到成色与缺货答复，病畜继续隔离；朴顺姬保留自己的菜筐和客户，没有替王家补损。'),
    ],
  });
  installDecision({
    id: 'route-northeast-household-farm-sideline-1946', year: 1946, followYear: 1947, routes: ['northeast-household-farm-sideline'], title: '母亲减少重活后副业怎样继续',
    prompt: '刘素芝腿痛加重，但菜种、缸具、寄宿客和收入仍由她决定。朴顺姬也有自己的菜地、语言、家口和客户。',
    options: [
      option('sideline-remain-paid-helper', '继续按月取劳动报酬，母亲保留经营决定', { money: 2, relation: 2, health: 1 }, 'f09:sideline:helper', '1946 年继续受薪管理家庭副业而不接管母亲资产。', '交班表没有变成自动继承', '刘素芝减少挑水和久站，仍决定菜种与寄宿客；你按月取钱，朴顺姬只参加自己的合运。'),
      option('sideline-limited-food-garden', '按菜种、器具、现金和劳动建立有限菜食合营', { money: -4, craft: 2, relation: 3 }, 'f09:sideline:partnership', '1946 年建立有库存、雇员和退出边界的菜食合营。', '合营第一年只有两名雇员和三方份额', '刘素芝投入列明菜种与缸具，朴顺姬投入一批菜和运输劳动，你投入现金；两名雇员按月领薪，客饭、菜损和退伙分别结算。', { enterpriseStart: { id: 'f09-garden-food-partnership', name: '吉林合成素顺菜食合营', domainKey: 'D44', kind: 'bounded-garden-food-lodging-business', workplace: '吉林合成小站集市登记摊屋', supplier: '刘素芝、朴顺姬与两户具名供货人', product: '有来源、损耗、实收和退订记录的菜蔬、酱食与有限饭食', employees: 2, partners: [{ personId: 'parent:mother', role: '菜种、缸具与旧客边界合伙人' }, { personId: 'contact:f09_piao_shunji', role: '有限菜货与运输劳动合伙人' }], asset: { id: 'garden-food-tools', kind: 'garden-jars-stall-tools', description: '三方列明的菜种、缸具、灶具与摊屋工具' }, debt: { id: 'garden-food-opening-credit', creditor: '两户具名供货人', purpose: '首批原料、摊屋与雇员工资周转' }, license: { id: 'garden-food-market-record', kind: 'documented-market-operation-record', authority: '吉林合成小站集市管理经手人', scope: '只限登记菜蔬、酱食与有限饭食品项' } } }),
      option('sideline-independent-small-stall', '只用自购原料另摆小摊，不拿母亲和朴家客户', { money: -3, network: 2, position: -1 }, 'f09:sideline:independent', '1946 年以自购原料另做独立菜食小摊。', '新摊从零核顾客与损耗', '你只带自己的包装与首批货，母亲和朴顺姬保留原有菜、客户和停业权；三名顾客重新决定是否购买。', { enterpriseStart: { id: 'f09-independent-food-stall', name: '吉林合成守兰菜食摊', domainKey: 'D44', kind: 'sole-rural-market-stall', workplace: '吉林合成小站集市登记摊位', supplier: '两户具名菜蔬供货人', product: '有来源、成色、实收与损耗记录的小批菜食', employees: 0, asset: { id: 'personal-food-stall-tools', kind: 'personal-stall-tools-stock', description: '主角自购包装、案板与首批原料' } } }),
    ],
  });

  installDecision({
    id: 'route-northeast-rural-tool-repairer-1929', year: 1929, followYear: 1930, routes: ['northeast-rural-tool-repairer'], title: '修过的犁具再次断裂时怎样核返工责任',
    prompt: '客户说修件两日后又坏，姚春义记得原木柄已有暗裂，货场短工又借走过一把工具。旧损、材料、修理和使用不能凭口气定责。',
    options: [
      option('repair-open-inspect-order', '拿原工单共同拆检旧损、材料与修理处', { craft: 3, knowledge: 2, money: -1 }, 'f09:repair:inspect', '1929 年按原工单复核一件返修农具。', '返工停在确知部位', '新断处在旧木柄，修补铁件仍牢；你免工钱重装一次，客户另付新木料，姚春义只对自己经手段作证。'),
      option('repair-refund-confirmed-labor', '退已确认有误的工钱，材料另议', { money: -2, relation: 2, mind: 2 }, 'f09:repair:refund', '1929 年退回一件修理中确有问题的工钱。', '赔付有范围而非全包', '你承认铆接不足并退对应工钱，原有裂柄和客户后续使用另记；借用工具按时归还，没有拿姚家工具抵赔。'),
      option('repair-decline-unsupported-claim', '拒绝无证扩大责任，但给出下一次检查日', { position: 1, relation: -1, mind: 3 }, 'f09:repair:decline', '1929 年拒绝承担无法证明的整件损失。', '失去一名客户但保留证据', '客户取回农具并停止来往，你保存原工单、材料和见证人；陈荣贵没有让货场替客户施压，也没有保证你不会失去后续订单。'),
    ],
  });
  installDecision({
    id: 'route-northeast-rural-tool-repairer-1946', year: 1946, followYear: 1947, routes: ['northeast-rural-tool-repairer'], title: '战后继续受薪修理、转货场设备还是建立有限小作坊',
    prompt: '姚春义的工具、陈荣贵的货场工票和你的修理经验仍属不同的人与单位。想开作坊必须先列工具、材料、工资、债务和客户范围。',
    options: [
      option('repair-remain-waged', '继续按件受薪修理，借用工具逐次归还', { money: 2, craft: 2, health: 1 }, 'f09:repair:waged', '1946 年继续做有工单和工具交接的受薪修理。', '经验没有自动变成工具产权', '姚春义按件结钱，你交还每件借具；客户得到试用和返工日，货场短工另按工票结算。'),
      option('repair-station-maintenance', '转做小站工具与推车维护，保留职责范围', { knowledge: 2, craft: 3, position: 1 }, 'f09:repair:station', '1946 年转入小站工具与推车维护岗位。', '固定设备岗仍有负责人和班表', '陈荣贵只负责介绍，设备负责人核试修后给六周岗位；你不接车辆调度与货物责任，工资和夜班另写。'),
      option('repair-limited-workshop', '与姚春义按工具、现金和劳动建立有限修理作坊', { money: -5, craft: 3, network: 2 }, 'f09:repair:workshop', '1946 年建立有工具、雇员和退伙边界的小型农具修理作坊。', '作坊第一年只有两名雇员和两套工具', '姚春义只投入列明工具，你投入现金和劳动；两名雇员按月领薪，材料债、返工和退出分别记录，不取得车站设备或邻屯客户。', { enterpriseStart: { id: 'f09-rural-repair-workshop', name: '吉林合成春田农具修理作坊', domainKey: 'D43', kind: 'bounded-rural-tool-repair-workshop', workplace: '吉林合成邻屯与小站之间登记修理间', supplier: '两家具名木料与铁件供货人', product: '有工单、材料、试用和返工范围的农具与手车修理', employees: 2, partners: [{ personId: 'contact:f09_yao_chunyi', role: '有限工具与修理劳动合伙人' }], asset: { id: 'rural-repair-tools', kind: 'documented-rural-repair-tools', description: '两套逐件列明所有人的修理工具与工作台' }, debt: { id: 'repair-material-credit', creditor: '两家具名材料供货人', purpose: '首批木料、铁件、房租与雇员工资' }, license: { id: 'repair-workshop-record', kind: 'documented-rural-workshop-record', authority: '吉林合成邻屯与小站管理经手人', scope: '只限登记农具与手车修理，不含车站设备产权' } } }),
    ],
  });

  installDecision({
    id: 'northeast-settler-occupation', year: 1931, followYear: 1932, families: ['northeastsettlers'], title: '九一八事变后怎样先保住人、住处、粮和可核记录',
    prompt: '占领与制度变化压到屯地、货路和登记。父母、兰芝、姚家、朴家、同事与伴侣各有住处和生计；土地、工作与身份不能由主角一次替所有人决定。',
    options: [
      option('settler-remain-confirmed-livelihood', '只留在可确认住处和生计，逐项核地物与登记', { mind: 3, money: -1, relation: 1 }, 'f09:occupation:remain', '1931 年留在可确认住处并逐项核生计记录。', '留下不等于土地和工作照旧', '王家只继续已确认地块与公开民生工作，争议处停作；姚家、朴家各自说明用地和家口，新的登记结果仍待后续确认。', { warTurn: 'remain-confirmed-livelihood' }),
      option('settler-verify-station-bed-work', '先去小站或城市核具体岗位、床位和家人地址', { network: 2, money: -2, position: 1 }, 'f09:occupation:verify-move', '1931 年先核异地岗位和床位再决定迁移。', '介绍信只换来限期短工', '陈荣贵找到一段具名货场短工，却没有家庭床位；兰芝按自己的报名行动，父母分别决定留守、近迁或等待，不因主角去向自动同行。', { warTurn: 'verify-station-bed-work' }),
      option('settler-split-addresses-records', '家人分批保留地址、粮、地物记录与下次核信日', { network: 3, mind: 2, relation: 1 }, 'f09:occupation:split', '1931 年家人分别保存住处、生计和下次核信日期。', '分散没有被补写成失踪或死亡', '父亲留一份地物记录，母亲带菜种与饭食账，兰芝按工作近迁；朴顺姬只保存自己家庭地址，一次退信只让一个地址失效。', { warTurn: 'split-addresses-records' }),
    ],
  });
  installDecision({
    id: 'northeast-settler-transition-1948', year: 1948, followYear: 1949, families: ['northeastsettlers'], title: '进入 1949 年前怎样核两地亲缘、土地、岗位与副业',
    prompt: '战后仍有地物记录、旧工票、借种、工具、寄宿预付、原籍来信和未确认住处。先逐项整理，1949 年后的人生才不会被一句“留下或回乡”替代。',
    options: [
      option('settler-keep-current-records', '留在现住地，核已确认地块、工作、住处与家口', { mind: 2, relation: 2, money: 1 }, 'f09:transition:local', '1948 年逐项核现住地的土地、工作和家庭记录。', '留下只保留已确认部分', '你列出地块、工票、副业、工具、父母和兰芝地址；争议地、欠薪和断信继续标未知，不因新年份自动解决。'),
      option('settler-return-after-address-check', '先核原籍住处和同行人，再放弃可交接部分', { network: 3, money: -2, position: -1 }, 'f09:transition:return', '1948 年先核原籍地址与同行人并准备返乡。', '返乡有床位和工作缺口', '原籍只确认一处暂住和一名联系人；母亲、父亲、兰芝与伴侣分别答复是否同行，现住地工具、客户和欠款逐项交接。'),
      option('settler-take-documented-skill', '带可核履历去其他大陆城市或继续流动', { knowledge: 2, craft: 2, money: -1 }, 'f09:transition:skill', '1948 年以可核农作、副业或修理履历寻找异地生计。', '技能只换来试工和临时住处', '新地方给一次有期限岗位与床位答复，旧地权利没有跟随技能迁移；家人和合作者保留原住处、财物和拒绝权。'),
    ],
  });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['northeastsettlers'], priority: 12,
      sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }
  var allRoutes = ['northeast-seasonal-farm-worker', 'northeast-household-farm-sideline', 'northeast-rural-tool-repairer'];
  scene('f09-s01', '借来的农具、自家菜种和代存种子各有主人', '王占海把借具挂回姚春义的记号处，刘素芝把自家菜种与替朴家代存的一包分开；东西进屋没有自动归王家。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f09-s02', '冬储、客饭预付和土地债不能混用', '入冬前，母亲把柴、粮、腌菜和寄宿客预付饭钱分放，说明客人已付的饭不能拿去填未经确认的地债。', { minAge: 3, maxAge: 6, priority: 23 });
  scene('f09-s03', '雪化后看不清的地界先不翻动', '姚春义与父亲各说一段旧界，双方找到两根旧桩却仍缺经手记录；争议处暂不下种，没有用邻里情分假装已经解决。', { minAge: 5, maxAge: 8, priority: 23 });
  scene('f09-s04', '认地、管饭食账和去小站识字撞在同一上午', '你只能去一处，父母分别安排剩下的活；兰芝也能查自己的学习门路，不被默认留下做饭。', { minAge: 6, maxAge: 10, priority: 22 });
  scene('f09-s05', '原籍病信和眼前冬天同时要钱', '信中只确认老人病了，家中却刚借到种粮且屋顶漏风；寄回、冬储、修屋和延期债都在下一年给具体结果。', { year: 1921, priority: 35 });
  scene('f09-s06', '两家菜合运仍要分筐与损耗', '朴顺姬提出拼车去小站，按各家筐数、坏损和实收分账；她自己决定用哪种语言与客户交涉，不替王家永久跑门路。', { minAge: 9, maxAge: 14, priority: 21 });
  scene('f09-s07', '兰芝查的是自己的训练条件', '王兰芝去问小站清点、抄票与饭食工作，得到时间、识字和班次要求；父亲只能陪她问，不能保证录用或令她永久免费守家。', { minAge: 10, maxAge: 15, priority: 21 });
  scene('f09-s08', '三份试做各有地块、物件、工钱和答复日', '农忙、副业与修理货工分别写清职责、食宿、工具、结算与结果日期；介绍只让你得到一次实际试做。', { year: 1924, routes: allRoutes, priority: 30 });
  scene('f09-s09', '第一份成年谋生终于有具体名字', '东家、刘素芝与朴顺姬，或姚春义与陈荣贵给出结果；岗位、地点、负责人、同事、顾客、结算和下一步进入职业账。', { year: 1925, routes: allRoutes, priority: 28 });
  scene('f09-s10', '严寒会让手脚、住处和工期同时变化', '一次远运后父亲手脚冻伤，先检查能否握工具和走路；治疗、少做一班、谁代替、少领多少钱和复工日分别确认。', { minAge: 16, maxAge: 34, priority: 21 });
  scene('f09-s11', '收成与工钱不是一笔账', '东家歉收不等于雇工没有劳动；工日、食宿、预支、可结部分和仍欠部分逐人记录，换东家也不会抹掉旧欠薪。', { minAge: 18, maxAge: 50, routes: ['northeast-seasonal-farm-worker'], priority: 22 });
  scene('f09-s12', '菜病、禽病与寄宿客饭钱分别处理', '刘素芝隔离有症状禽畜，朴顺姬决定自己的菜是否合运，寄宿客按已付饭钱得到饭或退款；家庭副业不是一团家务。', { minAge: 18, maxAge: 50, routes: ['northeast-household-farm-sideline'], priority: 22 });
  scene('f09-s13', '返工要回到旧损、材料和经手人', '一件修过的农具再坏，姚春义、客户和你按原工单拆检；借用工具、货场工票与客户赔付没有被混在一起。', { minAge: 18, maxAge: 50, routes: ['northeast-rural-tool-repairer'], priority: 22 });
  scene('f09-s14', '1931 年以后每个人面对的不是同一张去留牌', '占领与制度变化改变屯地、线路和登记；王家、姚家、朴家、兰芝和伴侣各自核住处与生计，没有被写成同一遭遇。', { year: 1931, routes: allRoutes, priority: 38 });
  scene('f09-s15', '土地登记变化不能把侵占写成中性手续', '新的土地与农业安排可能要求重核或迫使原住农户离开。系统记录谁实际使用、谁提出要求、谁失去什么与哪些未知，不把侵略性掠地称为普通升级。', { minYear: 1932, maxYear: 1937, priority: 24 });
  scene('f09-s16', '婚后争吵的是两地老人、冬储、收入和下一次迁移', '你与伴侣分别说明自己的父母、土地或工资、语言与住处责任；两人可分账同住、近处分居、固定通信或暂不合并财产。', { minAge: 23, maxAge: 43, priority: 20 });
  scene('f09-s17', '疾病会让具体农活和照料停下来', '冻伤、腰伤、咳嗽、胃痛或手部裂伤发生时，看诊、药钱、代班、未结工钱、家人照料和复工日逐项进入记录。', { minAge: 24, maxAge: 58, priority: 20 });
  scene('f09-s18', '朋友与邻屯人保留自己的家庭和退出', '朴顺姬可能因家中需要停止合运，陈荣贵会被调班，姚春义也会先保自家工具；你可协商但不能调用他们的一生。', { minAge: 25, maxAge: 58, priority: 19 });
  scene('f09-s19', '公开互助与政治身份分开', '屯里与小站有人登记欠薪、冻伤、失所和公开救济，也有人提出高风险联络。你可公开参与、另行申请、保持无党派或拒绝；农工、菜贩和修理人身份本身不等于党籍或秘密身份。', { minAge: 18, maxAge: 45, priority: 18 });
  scene('f09-s20', '1945 年先核仍在的人、地、工具与工票', '占领结束后，你核父母、兰芝、姚家与朴家的住处，逐项看地物记录、种粮、工具、工票、副业和未结钱；结束没有自动恢复战前状态。', { year: 1945, priority: 35 });
  scene('f09-s21', '1949 是土地、岗位与两地亲缘的中段回收', '系统列出已确认地块、争议地、当前工作、副业、工具、父母、兰芝、伴侣、原籍地址和未知债，再进入大陆、港澳台、海外、流动或未定的后半生。', { year: 1949, routes: allRoutes, priority: 40 });
  scene('f09-s22', '父亲减少远运，母亲仍决定菜种与饭食', '王占海不能再做长途重活却可核地界与工日，刘素芝减少挑水却仍决定缸具、客饭和停业；二人分别协商轻活、医药与住处。', { minAge: 43, maxAge: 67, priority: 19 });
  scene('f09-s23', '缩业与退出也要给雇工、顾客和合作者答复', '你退一处作业、少养一批、归还借具、结清一名雇工或结束合运；每个人知道取回什么、损失什么和下次是否联系。', { minAge: 50, maxAge: 72, priority: 18 });
  scene('f09-s24', '死亡与地物、工具、工钱和两地消息分开确认', '父母、合作者、原籍亲属或主角去世后，发生、知情、确认、借种、欠薪、工具、客户预付和争议地分别处理，不因死亡自动全归主角。', { minAge: 58, priority: 17 });

  C.annualRhythms['northeast-seasonal-farm-worker'] = [
    '每季先确认东家、地块、农活、工期、食宿、工资和结算日；天气损失、停工、欠薪与换东家不能用一句收成不好相抵。',
    '播种、除草、收割、装车和季节运输各有身体负担；同伴逐人记工，女性兼做分拣或饭食时也必须计入劳动。',
    '多年季工可以转固定农事或有限小队，却不取得东家土地、粮食和家口；严寒、伤病、迁移与退休会真实中断工作。',
  ];
  C.annualRhythms['northeast-household-farm-sideline'] = [
    '菜种、禽畜、酱缸、寄宿饭食、摊费、合运和实收逐项记录；家庭副业有原料、病损、客户与停止经营，不是免费的家务背景。',
    '刘素芝、朴顺姬、帮饭人和主角分别拥有工具、货物、工资、家口和退出权；合作与语言往来不把几家合成一个主体。',
    '女性较常承担密集照料和柜前劳动，男性更常兼远运；这是时代分工与家务压力，不是能力惩罚，双方都可经营、受薪或退出。',
  ];
  C.annualRhythms['northeast-rural-tool-repairer'] = [
    '每件农具先写旧损、材料、工具所有人、修理部位、工时、试用和返工范围；会修不等于拥有借具或客户物件。',
    '邻屯修理、季节运输和货场短工分别结算；一张临时工票不生成固定岗位，货场关系也不替客户承担返工。',
    '经验可转设备维护或有限作坊，仍要处理材料债、雇员工资、工具份额、客户投诉、停工和退出，不把手艺写成自动致富。',
  ];
  C.sceneFrames.northeastsettlers = [
    { open: '天亮后，地界桩、借种袋、母亲的菜筐、姚春义的工具和小站工票同时需要有人核对。', close: '今天只处理了一块地、一项副业或一件修理；谁拥有、谁劳动、谁付钱、谁等待和哪些仍未知分别留下。' },
    { open: '寒风穿过合成邻屯，王家、姚家、朴家与货场工各自先看自己的粮、工具、客户和家口。', close: '你得到具体结果，也承担钱、身体、住处或关系代价；迁来不自动取得土地，熟人不替你取得岗位。' },
  ];
  C.sceneFrames['northeast-seasonal-farm-worker'] = C.sceneFrames.northeastsettlers;
  C.sceneFrames['northeast-household-farm-sideline'] = C.sceneFrames.northeastsettlers;
  C.sceneFrames['northeast-rural-tool-repairer'] = C.sceneFrames.northeastsettlers;

  C.parentProfiles.northeastsettlers = {
    mother: { name: '刘素芝', born: 1885, occupation: '经营菜园、做酱与有限寄宿饭食，保留菜种、缸具和娘家通信', deathAgeBase: 78, activities: ['核菜种、禽畜、酱缸、客饭预付和实收', '自己决定合运、借钱、休息、探亲或停掉一项副业', '晚年减少挑水久站但仍决定缸具、旧客和交接'], words: ['“客人先付的饭钱，是饭钱，不是地债。”', '“朴家的菜归朴家，合一趟车也要分筐。”', '“我少做重活，不等于菜种、缸和旧账都给你。”'] },
    father: { name: '王占海', born: 1881, occupation: '在已确认地块做佃作、垦作并接季节运输', deathAgeBase: 74, activities: ['核地界、借种、收成、工日和自己的运输工钱', '争议处停作或找经手人复核，不凭耕作年数定所有权', '晚年减少远运并整理地物和欠薪记录'], words: ['“雪埋了桩，不能就说那块地是咱们的。”', '“陈荣贵说缺人，只是让你去问，不是已经留你。”', '“我能交给你的是记录和经验，不是姚家的地和工具。”'] },
  };
  C.spouseProfiles.northeastsettlers = {
    男: { name: '赵春梅', bornOffset: 1, occupation: '邻屯菜园、缝补与季节饭食劳动者，保留自己的收入和娘家责任', values: '同住前要谈清两地老人、冬储、劳动报酬与是否迁移，不接受无偿接下全部家务和争议地' },
    女: { name: '孙守义', bornOffset: -1, occupation: '小站货工与农具修理短工，按工票领钱并照料自己的母亲', values: '愿意分担家用与照料，不把妻子的副业、客户、地物记录或迁移决定据为己有' },
  };
  C.childNames.northeastsettlers = ['王北宁', '王冬禾'];

  var seasonalBase = { kind: 'seasonal-agricultural-labor', role: '佃作、农忙雇工与季节运输工', workplace: '吉林合成北麓邻屯已确认地块与季节运输路段', employer: '具名农户东家与季节用工经手人', supervisor: '农忙经手人郭守成', colleague: '同季工马秀禾', publicPerson: '核工日和交粮的东家于庆山', terms: '按地块、工期或工日结算；食宿、预支、欠薪、伤病、停工、工具与换东家分别记录', duties: '完成播种、田间、收割与有限运输，核工日和食宿，拒绝以天气或土地争议吞掉全部工资', scenes: ['于庆山说歉收只能付一半，你拿工日表逐项核。', '马秀禾冻伤停工，代班、治疗和各人工钱分别结算。', '下一季东家改变地块，你先核使用权与食宿再接活。'] };
  var sidelineBase = { kind: 'household-agricultural-sideline', role: '菜园、禽畜、做酱、饭食与集市副业劳动经营人', workplace: '吉林合成王家菜园、有限寄宿饭桌与小站集市', employer: '经营者刘素芝', supervisor: '刘素芝', colleague: '合运菜农朴顺姬', publicPerson: '按日买菜和订饭的货场工曹守安', terms: '按实际劳动、原料和销售结算；菜种、禽畜、缸具、客饭预付、病损、合运和家庭收入分别记录', duties: '照料菜园和禽畜、制作酱食、核客饭与赶集实收，给顾客和帮工实际答复并保留母亲与朴家的产权', scenes: ['曹守安预付两日饭钱，缺粮时得到退款或替代答复。', '朴顺姬少出一趟车照料家人，各家菜筐和收入仍分开。', '一批禽畜发病，你隔离、停卖并核治疗与损失。'] };
  var repairBase = { kind: 'rural-tool-repair-and-station-labor', role: '邻屯农具修理、货场短工与小作坊工', workplace: '吉林合成姚家修理间与小站货场边缘作业点', employer: '修理人姚春义与具名货场用工经手人', supervisor: '修理负责人姚春义', colleague: '修理与清点同事周桂枝', publicPerson: '送来犁具并要求试用答复的客户邹广成', terms: '有限试做后按件或工票结算；工具所有人、旧损、材料、工时、返工、货物与车站班次分别记录', duties: '检查、拆修、试用农具与手车并核材料和借具；货场短工另按件数和工票结算，不冒领固定岗位', scenes: ['邹广成拿回断裂犁具，你按原工单拆检。', '姚春义借出一把工具，归还日和磨损写明。', '陈荣贵临时叫一班货工，修理工资与工票分别结算。'] };
  C.routeCareerProfilesByGender['northeast-seasonal-farm-worker'] = {
    男: Object.assign({}, seasonalBase, { role: '农忙重活、收割与季节运输工', duties: '较常承担重负、远地和运输，也逐项核工日、食宿、欠薪与冻伤，不因体力劳动取得土地' }),
    女: Object.assign({}, seasonalBase, { role: '田间农活、分拣、种粮处理与季节饭食工', duties: '在时代分工下常兼分拣和饭食，但全部劳动计入工时；可做田间、转班或带有限小队，不作能力惩罚' }),
  };
  C.routeCareerProfilesByGender['northeast-household-farm-sideline'] = {
    男: Object.assign({}, sidelineBase, { role: '菜园、禽畜、集市运输与饭食副业劳动经营人', duties: '较常兼挑运与外出赶集，也承担日常照料、收付和帮工工资，不取代母亲与朴家的资产' }),
    女: Object.assign({}, sidelineBase, { role: '菜园、禽畜、做酱、饭食与集市副业劳动经营人', duties: '密集照料与柜前劳动全部计价，保留休息、现金、合伙和迁移决定，不把副业当无偿家务' }),
  };
  C.routeCareerProfilesByGender['northeast-rural-tool-repairer'] = {
    男: Object.assign({}, repairBase, { role: '农具拆修、重件试用与货场短工', duties: '较常承担重件拆装与货场搬运，仍按工单和工票分账，不取得借用工具或车站货物' }),
    女: Object.assign({}, repairBase, { role: '农具零件整理、缝补、清点与修理交接工', duties: '在时代岗位限制下从零件、清点、缝补与客户交接进入，可继续学习拆修和维护，不作能力惩罚' }),
  };

  Object.assign(C.routeContactProfiles, {
    'northeast-seasonal-farm-worker': [
      { id: 'f09_field_supervisor', label: '郭守成', role: '写明地块、农活、工日、食宿和结算日的季工经手人', status: 'supervisor', relation: 21, born: 1884 },
      { id: 'f09_field_coworker', label: '马秀禾', role: '有自己的工日、原籍通信与冻伤休工决定的同季工', status: 'coworker', relation: 27, born: 1902 },
      { id: 'f09_field_customer', label: '于庆山', role: '按季雇工并须答复工资、歉收与停工范围的农户东家', status: 'nearby', relation: 18, born: 1887 },
    ],
    'northeast-household-farm-sideline': [
      { id: 'f09_sideline_supplier', label: '朴顺姬', role: '按筐、成色、运输和实收核自己菜货的邻屯供货合作者', status: 'nearby', relation: 25, born: 1888 },
      { id: 'f09_sideline_coworker', label: '钱月英', role: '按班领钱并保留孩子照料时间的帮饭与赶集同事', status: 'coworker', relation: 28, born: 1904 },
      { id: 'f09_sideline_customer', label: '曹守安', role: '按日订饭买菜并会要求缺货或退款答复的货场工顾客', status: 'nearby', relation: 19, born: 1893 },
    ],
    'northeast-rural-tool-repairer': [
      { id: 'f09_repair_supervisor', label: '姚春义', role: '核工具所有人、旧损、材料、工时、试用与返工的修理负责人', status: 'supervisor', relation: 24, born: 1883 },
      { id: 'f09_repair_coworker', label: '周桂枝', role: '按件整理零件、缝补和清点并保留父亲照料时间的同事', status: 'coworker', relation: 27, born: 1903 },
      { id: 'f09_repair_customer', label: '邹广成', role: '送来农具并会追问材料、试用、返工与赔付范围的客户', status: 'nearby', relation: 18, born: 1889 },
    ],
  });
  Object.assign(C.healthProfiles, {
    'northeast-seasonal-farm-worker': ['严寒远作造成的冻伤、咳嗽与关节疼痛', '弯腰、负重与长途运输造成的腰背膝伤', '季节失业、欠薪和住处压力造成的胃痛失眠'],
    'northeast-household-farm-sideline': ['挑水、蹲作、久站与赶集造成的腰腿和手指疼痛', '禽畜、烟尘、严寒和潮湿造成的咳嗽与皮肤不适', '照料、客饭、病损和现金周转造成的过劳失眠'],
    'northeast-rural-tool-repairer': ['锤击、弯腰和重件拆装造成的手腕腰背伤', '金属木屑、炉烟、严寒货场造成的眼鼻咳嗽不适', '返工、材料债、短工空档和夜班造成的失眠胃痛'],
  });
  Object.assign(C.publicRouteProfiles, {
    'northeast-seasonal-farm-worker': { publicGroup: '合成的季工工日、欠薪、伤病与住处公开答复簿', publicRole: '核公开工日、食宿、欠薪、冻伤与失所转介', covertRole: '只有另经独立政治申请与考验才可能参与有限联络；熟悉屯路和季工本身不等于组织身份', infiltrationRole: '不借找活、借宿或地界争议套取隐私，高风险事务需独立授权并允许拒绝、失败与退出', contact: { id: 'public_f09_seasonal', label: '赵明义', role: '登记季工工日、欠薪和伤病答复的公开互助经手人', status: 'colleague', relation: 19, born: 1900 } },
    'northeast-household-farm-sideline': { publicGroup: '合成的菜食、寄宿、病损与公开救济登记簿', publicRole: '核公开客饭、菜损、妇幼照料、失物和救济转介', covertRole: '副业和语言往来不自动形成秘密身份；只有另经选择才可能参与有限联络', infiltrationRole: '不把顾客、寄宿客、朴家和家人变成默认情报来源，任何秘密任务都要独立授权', contact: { id: 'public_f09_sideline', label: '金慧贞', role: '登记菜食、妇幼照料与公开救济答复的邻屯经手人', status: 'colleague', relation: 20, born: 1904 } },
    'northeast-rural-tool-repairer': { publicGroup: '合成的修理工钱、返工、工具与货场伤病公开簿', publicRole: '核公开工单、返工、借具、工票和伤病答复', covertRole: '接触工具与车站不自动产生卧底、破坏或秘密身份；另经申请也只承担有边界的事务', infiltrationRole: '不提供破坏交通或规避检查教程，职业物件与政治事务严格分开并允许退出', contact: { id: 'public_f09_repair', label: '冯守信', role: '登记修理返工、工具和货场工票争议的公开互助经手人', status: 'colleague', relation: 19, born: 1901 } },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('rural', 'northeast-seasonal-farm-worker');
  addRouteToTrack('trade', 'northeast-household-farm-sideline');
  addRouteToTrack('skilled', 'northeast-rural-tool-repairer');

  C.events.push(
    { id: 'northeast-migration-context-1910', year: 1910, eraBrief: true, eraScope: '东北关内移民与地方社会', families: ['northeastsettlers'], title: '长期迁移已经形成跨地亲缘与多种聚居', knownThrough: ['storytelling', 'conversation'], delta: { network: 1 }, knownText: '你出生时，关内向东北的长期迁移已经形成许多跨地亲缘与聚居；迁来者仍要面对既有居民、用地、语言、市场与具体落脚条件。', unknownText: '家里只知道原籍来信和眼前邻屯，尚不能说清几代人的迁移规模；每一家为何来、在哪里落脚和怎样相处都不同。', fact: '清末至二十世纪中期，关内向东北的长期迁移形成多处聚居与跨地家庭关系。', historySource: { label: '吉林省地方志：《寻路关东——长白山区移民口述实录》出版介绍', url: 'https://dfz.jl.gov.cn/fzdt/201809/t20180929_5223225.html' } },
    { id: 'northeast-occupation-1931', year: 1931, eraBrief: true, eraScope: '东北地区', families: ['northeastsettlers'], title: '九一八事变后东北进入日本殖民统治时期', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { money: -2, health: -1, position: -2 }, knownText: '你知道九一八事变后东北的政治与制度环境改变，屯地、线路、工作、住处和人员消息都要重新核实；一次去留不能替代此后多年生活。', unknownText: '线路、登记和货路先发生变化，你只知道眼前地块、工票和家人最后地址，还不能确认新的控制会持续多久。', fact: '1931 年九一八事变后，东北进入日本殖民统治时期。', historySource: { label: '辽宁省人民政府：历史沿革', url: 'https://www.ln.gov.cn/web/sqgk/lsyg/index.shtml' } },
    { id: 'northeast-land-seizure-1936', year: 1936, eraBrief: true, eraScope: '东北农业与土地关系', families: ['northeastsettlers'], title: '农业移民侵略与侵占土地继续扩大', knownThrough: ['newspaper', 'conversation'], delta: { money: -2, position: -2, relation: -1 }, knownText: '你知道日本农业移民侵略与土地侵占正在改变原有农户的地、屋和生计；所谓整理、收买或迁出不能被写成普通市场交易。', unknownText: '屯里先出现新的地物要求、迁出压力和用工变化，你只确认谁仍住、谁仍耕、谁提出要求和谁失去什么，完整制度来由尚不全知。', fact: '九一八事变后，日本农业移民侵略伴随对东北土地的侵占，许多原有农户失去土地与住处。', historySource: { label: '新华社：东北烈士纪念馆文物见证日本农业移民侵略', url: 'https://www.news.cn/local/20240918/d9fbcb926b89459c8d79d1fb4a766a30/c.html' } },
    { id: 'northeast-occupation-end-1945', year: 1945, eraBrief: true, eraScope: '东北战后社会', families: ['northeastsettlers'], title: '日本殖民统治结束，旧地物与工作关系仍须逐项确认', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { position: 1, network: 1, money: -1 }, knownText: '你知道日本殖民统治结束，但地块、屋、工具、工票、借种、家人和失联者不会自动恢复到 1931 年以前；每项都要找仍在的人和记录。', unknownText: '原有管理停止或变化，你先核住处、粮、工具和最后在场的人；战争结束并未立即给所有旧问题同一答案。', fact: '1945 年日本战败后，东北结束日本殖民统治，普通人的土地、工作与住处仍经历后续重整。', historySource: { label: '辽宁省人民政府：历史沿革', url: 'https://www.ln.gov.cn/web/sqgk/lsyg/index.shtml' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
