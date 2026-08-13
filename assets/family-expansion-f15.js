// 民国人生 · F15 西南战时迁入工厂与基层事务家庭运行时包 v0.7.14
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f15.js');

  C.version = '0.7.14';
  C.familyDecisionKeys.southwestwarworkers = { path: 'southwest-warworker-path', war: 'southwest-air-raid-1939' };
  Object.assign(C.designRegistry.families.F15, {
    designStatus: 'runtime-reviewed-first-round', runtimeStatus: 'playable-verified', runtimeFamilyKey: 'southwestwarworkers',
  });
  C.runtimeFamilyDesignMap.southwestwarworkers = 'F15';
  Object.assign(C.legacyRouteDomainMap, {
    'southwest-wartime-warehouse-supply': 'D12',
    'southwest-mechanical-drawing-repair': 'D33',
    'southwest-clinic-records-clerk': 'D31',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F15-MOVED-INDUSTRY': {
      label: '国家档案局：迁川工厂联合会与钢迁会档案介绍',
      url: 'https://www.saac.gov.cn/daj/c100250/201409/9ec1c63c39814ae3b2a6c95f05c3ad1a.shtml',
      supports: ['战时重庆存在大规模迁川工厂组织与工业迁建；不替合成单位提供具体岗位、工资或个人履历'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F15-STEEL-RELOCATION': {
      label: '重庆市档案馆：钢铁厂迁建委员会档案',
      url: 'https://jda.cq.gov.cn/web/article/1514919470135484416/web/content_1514919470135484416.html',
      supports: ['1938—1949 年工业西迁涉及设备拆卸、运输、选址建厂、防空、生产与人才培养；游戏不呈现武器生产教程'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F15-WARTIME-ARCHIVES': {
      label: '重庆市档案馆：《抗日战争档案汇编》简介',
      url: 'https://jda.cq.gov.cn/web/article/1464360890486710272/web/content_1464360890486710272.html',
      supports: ['战时工厂档案包含机构、章则、会议、人员名录、生产与财务；合成角色只处理民用可见的仓储、工资、住处和人员记录'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F15-BOMBING': {
      label: '重庆市人民政府：“重庆大轰炸”档案入选中国档案文献遗产名录',
      url: 'https://www.cq.gov.cn/zwgk/zfxxgkml/zdlyxxgk/ggwh/wh/zxdt/202506/t20250610_14701318.html',
      supports: ['1938—1943 年重庆空袭造成具体人员伤亡与房屋财产损失；失联、受伤、死亡与损失必须分别确认'],
      status: 'source-reviewed-first-round',
    },
    'SRC-F15-AIR-DEFENSE': {
      label: '重庆市档案馆：重庆防空概况及空袭损害统计表',
      url: 'https://jda.cq.gov.cn/web/article/1494011077816893440/web/content_1494011077816893440.html',
      supports: ['战时重庆存在避难管制、救护、工务、消防与交通管制；游戏只呈现公开避险、救护登记与灾后确认'],
      status: 'source-reviewed-first-round',
    },
  });

  C.families.southwestwarworkers = {
    key: 'southwestwarworkers', name: '西南战时迁入工厂与基层事务家', born: 1930,
    place: '汉口合成原厂街区（1938 年后迁入重庆合成长江北岸住区）', defaultSeed: 1514,
    defaultNames: { 男: '郭承安', 女: '郭承宁' },
    motif: '迁厂名册、设备清单、原籍行李、租院用水、母亲饭食收入、临时学校和防空避险共同组成成长环境；进入单位不等于终身岗位，随迁也不等于自动取得本地住房与资源。',
    start: { body: 45, knowledge: 29, craft: 32, mind: 40, network: 26, fame: 8 },
    startRes: { money: 9, health: 76, relation: 68, position: 16 },
    subjects: {
      mother: { label: '母亲', status: 'alive-working', health: 67, agency: 97, note: '经营住区饭食与缝补，保留锅灶、针线、食客预付、收入和是否再迁的决定' },
      father: { label: '父亲', status: 'alive-working', health: 68, agency: 91, note: '只核自己经手的设备清单、领料和仓储交接，不拥有单位财物、岗位或宿舍' },
      spouse: { label: '配偶', status: 'not-met', health: 70, agency: 96, note: '婚后保留自己的单位、工龄、住处、原籍亲人和回迁／留川决定' },
      household: { label: '原籍与现住家口', status: 'moved-with-separate-addresses', strength: 54, agency: 93 },
      support: { label: '房东、同事、临时学校与诊疗点', status: 'bounded-local-support', strength: 31, agency: 96 },
      connections: { label: '仓储、维修制图、诊疗登记与基层文书门路', status: 'qualification-and-trial-required', strength: 25, agency: 93 },
      workers: { label: '仓工、学徒、登记员、饭食帮工与搬运短工', status: 'separate-shifts-wages-and-injuries', strength: 23, agency: 96 },
      ledger: { label: '单位清单、家庭行李、租约、配给、工资、工龄与原籍证明分账', status: 'confirmed-partial-unknown', strength: 31, agency: 98 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 90, note: '不自动继承单位岗位、工龄、宿舍、原籍争议、母亲经营或照料责任' },
    },
    contacts: {
      f15_guo_mingde: { label: '郭明德', role: '核设备清单、领料、仓储交接、工资和宿舍答复的父亲', status: 'family', relation: 62, agency: 91, note: '可转仓管、技术辅助、受伤、缩编、回迁或留川，不是工程师、厂主或单位财物所有人' },
      f15_ye_xiufang: { label: '叶秀芳', role: '经营住区饭食与缝补并保留食客预付和收入的母亲', status: 'family', relation: 72, agency: 97, note: '可进食堂、有限合营、病休、拒绝再迁或独立经营，不是全家无偿后勤' },
      f15_guo_jingyi: { label: '郭静宜', role: '在临时学校、文书训练、诊疗登记和自己的婚或不婚生活间选择的手足', status: 'family', relation: 56, agency: 98, note: '不自动做照料者，可升学、落选、就业、迁走、成家、独居或有限返家' },
      f15_zhao_kejian: { label: '赵克俭', role: '只按清单、轮班、试工和复核权限安排仓储工作的合成单位负责人', status: 'nearby', relation: 27, agency: 94, note: '能给一次试工和答复，不能保证终身岗位、宿舍、工龄或替未知损失签字' },
      f15_zhou_biyun: { label: '周碧云', role: '保留自家院落、租金、用水、小食经营与亲属生活的本地房东', status: 'nearby', relation: 31, agency: 98, note: '可续租、调整条件、合做饭食、拒绝扩住或搬离，不是迁入家庭的无限住房资源' },
      f15_xiong_ruifang: { label: '熊瑞芳', role: '登记伤病、药品、转诊和家属地址并维护自己班次的诊疗点护士', status: 'nearby', relation: 29, agency: 98, note: '可教基础照护与登记，不让无资格者诊断、处置或触碰病历；也会过劳、病休、调院或失联' },
    },
  };

  Object.assign(C.routes, {
    'southwest-wartime-warehouse-supply': { name: '西南迁厂仓储、领料与民生供应交接', family: 'southwestwarworkers', summary: '从编号、清单、领料与仓位试工进入，逐班处理单位物资、家庭行李、工资、轮班、宿舍、损失复核与战后工龄；只写普通人可见的民生和仓储职责。' },
    'southwest-mechanical-drawing-repair': { name: '西南民用机械维修、制图抄描与设备保全', family: 'southwestwarworkers', summary: '从量具归还、零件清点、民用修理与图样抄描做起，处理资格、返工、工具、夜班、伤病与战后转岗；不呈现武器制造或破坏教程。' },
    'southwest-clinic-records-clerk': { name: '西南诊疗登记、伤病转介与基层文书', family: 'southwestwarworkers', summary: '登记姓名、住址、伤情描述、转诊、配给和公开证明流转，保留护士、医生、机关经手人的权限；识字不等于诊断权、编制或政治身份。' },
  });

  C.actions.push(
    { id: 'f15-list-luggage-storage-practice', name: '跟父亲分清设备清单、单位箱与自家行李', families: ['southwestwarworkers'], minAge: 6, spirit: 3, delta: { knowledge: 2, craft: 3, mind: 1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f15_guo_mingde: { relation: 2 }, f15_zhao_kejian: { relation: 1 } }, note: '只抄编号、封条、仓位和经手人；赶时间也不拆未知箱或替负责人签损失。' },
    { id: 'f15-food-sewing-rent-ledger', name: '跟母亲核饭食、缝补、食客预付与租院用水', families: ['southwestwarworkers'], minAge: 6, spirit: 2, delta: { craft: 3, relation: 2, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f15_ye_xiufang: { relation: 2 }, f15_zhou_biyun: { relation: 1 } }, note: '母亲收入、食客预付、家用与房东财物分开；同住不自动取得院落和用水权。' },
    { id: 'f15-school-air-raid-first-aid', name: '去临时学校识字并学习公开避险与传递伤病信息', families: ['southwestwarworkers'], minAge: 7, spirit: 3, delta: { knowledge: 4, mind: 2, network: 1 }, channels: ['books'], contactEffects: { f15_guo_jingyi: { relation: 2 }, f15_xiong_ruifang: { relation: 1 } }, note: '只学习公开避险、姓名住址和求助流程；不让儿童进入正式生产、诊断或秘密任务。' },
    { id: 'f15-warehouse-shift-ledger', name: '完成一班清点、入仓、领料与工资交接', routes: ['southwest-wartime-warehouse-supply'], minAge: 14, spirit: 4, careerAction: true, delta: { craft: 3, knowledge: 2, money: 2, health: -1 }, contactEffects: { f15_warehouse_supervisor: { relation: 1 }, f15_warehouse_coworker: { relation: 2 } }, note: '物资编号、数量、经手权限、工时、工资、缺损与下班交接当班写清。' },
    { id: 'f15-warehouse-housing-seniority', name: '核轮班、工资、宿舍、伤病与工龄证明', routes: ['southwest-wartime-warehouse-supply'], minAge: 16, spirit: 3, careerAction: true, delta: { knowledge: 3, mind: 2, position: 1 }, contactEffects: { f15_warehouse_supervisor: { relation: 1 }, f15_warehouse_customer: { relation: 1 } }, note: '做过、领过钱、有无床位、能否复工和工龄是否承认分别答复。' },
    { id: 'f15-repair-drawing-order', name: '完成一件民用设备检查、制图抄描、修理与试用', routes: ['southwest-mechanical-drawing-repair'], minAge: 14, spirit: 4, careerAction: true, delta: { craft: 4, knowledge: 2, money: 2, health: -1 }, contactEffects: { f15_repair_supervisor: { relation: 1 }, f15_repair_coworker: { relation: 2 } }, note: '旧损、量具、图样版本、修理部位、试用和返工范围写清；不处理武器结构或破坏方法。' },
    { id: 'f15-repair-tool-shift-health', name: '核工具归还、夜班、返工、伤病与下一项民用任务', routes: ['southwest-mechanical-drawing-repair'], minAge: 16, spirit: 3, careerAction: true, delta: { craft: 2, mind: 2, health: 1 }, contactEffects: { f15_repair_customer: { relation: 1 }, f15_repair_coworker: { relation: 1 } }, note: '岗位资格、借用工具、返工工资和伤病休班不混在一句赶工里。' },
    { id: 'f15-clinic-record-referral', name: '完成一次伤病登记、地址核对、转诊与家属通知', routes: ['southwest-clinic-records-clerk'], minAge: 14, spirit: 4, careerAction: true, delta: { knowledge: 3, mind: 2, network: 2, health: -1 }, contactEffects: { f15_records_supervisor: { relation: 1 }, f15_records_coworker: { relation: 2 } }, note: '只记录当事人陈述、护士或医生结论与转诊去向；登记员不诊断、不改病历。' },
    { id: 'f15-clerk-document-result', name: '核一份公开证明、配给申请或人员名录的去向与答复', routes: ['southwest-clinic-records-clerk'], minAge: 16, spirit: 3, careerAction: true, delta: { knowledge: 3, mind: 2, position: 1 }, contactEffects: { f15_records_supervisor: { relation: 1 }, f15_records_customer: { relation: 1 } }, note: '收件、补件、转交、退回和最终决定机关分开；经手不等于批准、编制或组织身份。' }
  );

  var sourceIds = ['SRC-F15-MOVED-INDUSTRY', 'SRC-F15-STEEL-RELOCATION', 'SRC-F15-WARTIME-ARCHIVES', 'SRC-F15-BOMBING', 'SRC-F15-AIR-DEFENSE'];
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
    id: 'southwest-housing-ration-1937', year: 1937, followYear: 1938, families: ['southwestwarworkers'], title: '迁入前后房租、单位床位与母亲饭食同时变化时先接哪一头',
    prompt: '周碧云只肯按人数和用水续租，单位床位还在申请，叶秀芳的食客主要在现住院落。住处、岗位和母亲经营不能用“全家随厂”一句合并。',
    options: [
      option('f15-renew-rented-courtyard', '先续租并写清人数、用水、押金和到期日', { money: -2, relation: 2, health: 1 }, 'f15:housing:rent', '1937 年先保留有边界的租院住处。', '租约保住一间屋，没有取得整个院落', '周碧云列清一间屋、共用水缸与晾衣时段；叶秀芳保留食客，单位床位继续等待，租住没有被写成产权。'),
      option('f15-apply-bed-keep-rent', '申请单位床位，但在书面答复前不退现住处', { money: -2, knowledge: 2, position: 1 }, 'f15:housing:bed', '1937 年同时保留租处并等待单位床位答复。', '床位只批给父亲一人', '单位给郭明德一张限期床位，家口仍住租院；两处通勤和钱分别核算，没有把一人宿舍资格扩成全家住房。'),
      option('f15-reduce-food-keep-cash', '缩小饭食单量，留下现金应对搬迁与续租', { money: 2, relation: -1, mind: 2 }, 'f15:housing:cash', '1937 年缩小母亲饭食经营以保留搬迁现金。', '少接订单也少了两名熟客', '叶秀芳自己决定只保留已预付的饭食并退掉新单；现金留作搬运和房租，两名熟客另找饭处，没有被系统写成关系背叛。'),
    ],
  });

  installDecision({
    id: 'southwest-air-raid-1939', year: 1939, followYear: 1940, families: ['southwestwarworkers'], title: '空袭警报后家人、住处与工作区消息互相冲突时怎样确认',
    prompt: '父亲最后在仓区，母亲和周碧云在院里，静宜在学校，诊疗点接到伤病名单。你只能按公开避险与救护秩序行动，失联、受伤、死亡和财损必须分开。',
    options: [
      option('f15-air-raid-people-first', '先到公开避险点核家人最后所在与伤病名单', { mind: 3, relation: 2, money: -2 }, 'f15:raid:people', '1939 年先核家人与同住者的最后所在。', '家人逐一找到，仓区损失仍待复核', '静宜在学校避险点，母亲和周碧云在另一处，父亲轻伤送诊；一只单位箱仍未知，没有因人找齐就替仓区签完损失。', { warTurn: 'people-first' }),
      option('f15-air-raid-record-injuries', '警报解除后协助登记伤病、地址与转诊', { knowledge: 2, network: 2, health: -1 }, 'f15:raid:records', '1939 年协助熊瑞芳登记已确认伤病与地址。', '登记没有越过护士与医生权限', '你只抄姓名、住址、最后所在与转诊点，熊瑞芳核伤情，医生作处置；两名暂未联系的人保留最后消息，没有被补写死亡。', { warTurn: 'record-injuries' }),
      option('f15-air-raid-duty-only', '只核自己职责内物资，拒绝替未知整仓签字', { craft: 2, position: 1, relation: -1 }, 'f15:raid:duty', '1939 年只处理职责内清单和已见损失。', '一批已见物资确认，整仓责任继续调查', '你与父亲只列自己经手编号、封条和已见破损，拒绝认领未进过的仓位；负责人另找经手人，工作关系受压但事实没有被赶工抹平。', { warTurn: 'duty-only' }),
    ],
  });

  installDecision({
    id: 'southwest-warworker-path', year: 1943, followYear: 1944, families: ['southwestwarworkers'], title: '三份有期限的训练与试工里哪一份成为第一段成年谋生',
    prompt: '仓储清点、民用维修／制图抄描、诊疗登记／基层文书都列出资格、试做日、负责人、工资与答复日。识字、父亲在单位或认识护士都不等于录用。',
    options: [
      option('f15-warehouse-trial', '参加仓储、领料与民生供应交接试工', { craft: 2, knowledge: 2, money: 1 }, 'f15:path:warehouse', '1943 年进入有清单、班次和试工费的仓储试做。', '三日试工得到具名岗位答复', '赵克俭按编号、实物与交接差错给结果；男性较常被安排搬运，女性较常从清点和发放窗口进入，两者都有工资和责任边界。', { route: 'southwest-wartime-warehouse-supply' }),
      option('f15-repair-drawing-trial', '参加民用维修、量具与制图抄描试工', { craft: 3, knowledge: 2, money: 1 }, 'f15:path:repair', '1943 年进入有工具、图样版本和返工范围的技术试做。', '一件民用修理与一张抄图分别复核', '男学徒较常先搬件拆洗，女学徒较常从量具、零件与抄描进入；二者都可继续学修理，也都没有自动成为工程师。', { route: 'southwest-mechanical-drawing-repair' }),
      option('f15-records-trial', '参加诊疗登记、伤病转介与基层文书试工', { knowledge: 3, mind: 2, network: 1 }, 'f15:path:records', '1943 年进入有权限和答复日的登记文书试做。', '一份登记被录用，一项处置权限被拒绝', '熊瑞芳核登记准确，现地文书负责人给限期岗位；你能收件、抄写和转交，不能诊断、批准、盖未知印或因此取得编制。', { route: 'southwest-clinic-records-clerk' }),
    ],
  });

  installDecision({
    id: 'route-southwest-wartime-warehouse-supply-1944', year: 1944, followYear: 1945, routes: ['southwest-wartime-warehouse-supply'], title: '领料单与实物差一箱时怎样处理赶工压力',
    prompt: '你只经手其中一段，父亲核过另一段，赵克俭要求当天给答复。单位物资、运输损失、仓位记录和个人责任不能合并。',
    options: [
      option('f15-warehouse-recount-handoffs', '按编号、封条、仓位和每段经手人重新清点', { knowledge: 3, craft: 2, mind: 2 }, 'f15:warehouse:recount', '1944 年重新核一批短少物资的交接链。', '短少停在未签收的一段', '已入仓数量与清单相符，缺箱停在前一运输段；父亲只说明自己经手部分，同班工各自签自己的清点结果。'),
      option('f15-warehouse-confirm-seen-loss', '只签已亲见的破损和数量，未知另列', { position: 1, mind: 3, relation: -1 }, 'f15:warehouse:seen', '1944 年只确认亲见的一段仓储损失。', '保留岗位压力与未决责任', '你签一只破箱和实际件数，拒绝把整批未知写成自己的过失；负责人另开复核，排班受影响但工资与调查分别处理。'),
      option('f15-warehouse-transfer-audited-stock', '先移交无争议物资，争议箱隔离待查', { craft: 2, money: 1, network: 1 }, 'f15:warehouse:isolate', '1944 年先交付无争议物资并隔离一项疑点。', '生产与复核没有互相吞掉', '已核部分按单领走，疑点箱封存并写复核人；你没有因“不能耽误”让未知箱混入，也没有接触产品制造细节。'),
    ],
  });
  installDecision({
    id: 'route-southwest-mechanical-drawing-repair-1944', year: 1944, followYear: 1945, routes: ['southwest-mechanical-drawing-repair'], title: '图样版本不一致、修件返工与借用量具同时到来时怎样定责',
    prompt: '旧图、抄描图、实际零件、借用量具和试用结果各自证明一段。赶工不能让你修未经授权的设备或把同事工具算成个人资产。',
    options: [
      option('f15-repair-version-check', '先核版本、尺寸、旧损和授权范围再动手', { knowledge: 3, craft: 3, money: -1 }, 'f15:repair:version', '1944 年先核版本与授权后完成一件民用返修。', '返工停在可证明的尺寸差', '抄图漏了一处改版记号，你重画并返修对应部位；旧损与客户使用另记，量具按时归还。'),
      option('f15-repair-refund-known-error', '承认自己抄错的一段并退对应工钱', { money: -2, relation: 2, mind: 2 }, 'f15:repair:refund', '1944 年承担一段可确认的制图与修理错误。', '赔付没有扩大到整件设备', '你退回对应工钱并无偿重抄，材料旧损和他人装配不由你全包；同事工具没有被拿去抵赔。'),
      option('f15-repair-stop-unsafe-order', '停止来源与用途不明的任务，转做公开民用修理', { position: -1, mind: 3, network: 1 }, 'f15:repair:stop', '1944 年拒绝一项来源与职责不明的技术任务。', '少一班工钱但保留公开职业边界', '你交回图样和工具，只接水泵、手车与住区器具的公开修理；系统不提供武器、破坏或规避检查细节。'),
    ],
  });
  installDecision({
    id: 'route-southwest-clinic-records-clerk-1944', year: 1944, followYear: 1945, routes: ['southwest-clinic-records-clerk'], title: '一份原籍证明只被承认一部分，病人家属又催你改伤情时怎样处理',
    prompt: '你能登记、补件和转交，不能替医生诊断或替机关批准。原籍学历、现地试做、病人陈述和正式结论各属不同事实。',
    options: [
      option('f15-records-note-partial-qualification', '记录已承认部分并补一项现地试做', { knowledge: 3, position: 1, money: -1 }, 'f15:records:partial', '1944 年以补件与实际试做处理资格缺口。', '取得限期登记岗位而非自动编制', '负责人承认识字与一段旧学习，要求四周试做；你按时领薪，是否长期留用另有答复。'),
      option('f15-records-lower-grade-role', '先接低一档有期限岗位并写清复核日', { money: 2, mind: 2, position: -1 }, 'f15:records:lower', '1944 年接受一份低一档、有限期的登记工作。', '岗位具体但没有被美化成升迁', '你负责收件、排号与家属地址，不能碰诊断和批准；六周后才重核工资与职责。'),
      option('f15-records-refuse-alter-diagnosis', '拒绝改伤情，只附家属陈述并转护士复核', { mind: 3, relation: -1, knowledge: 2 }, 'f15:records:refuse', '1944 年拒绝越权修改伤病结论。', '家属不满，记录仍保留两种来源', '你把家属所述另附，熊瑞芳和医生核正式伤情；一项补助是否成立由有权经手人答复，不由登记员代批。'),
    ],
  });

  installDecision({
    id: 'route-southwest-wartime-warehouse-supply-1946', year: 1946, followYear: 1947, routes: ['southwest-wartime-warehouse-supply'], title: '战后单位回迁、留川或缩编时仓储经验怎样继续',
    prompt: '父亲、你和同班人的岗位答复不同；单位清单、工龄、工资、宿舍和原籍住处分开确认。',
    options: [
      option('f15-warehouse-remain-waged', '留川继续有期限的仓储与民生供应岗位', { money: 2, health: 1, position: 1 }, 'f15:warehouse:remain', '1946 年留川继续受薪仓储工作。', '留岗不等于取得仓库和宿舍', '你按新班表核民生物资与工资，宿舍只续三个月；父亲、静宜和伴侣分别决定住处与工作。'),
      option('f15-warehouse-return-confirmed-post', '只在回迁岗位和原籍住处均确认后离开', { network: 2, money: -2, mind: 2 }, 'f15:warehouse:return', '1946 年按已确认岗位与床位准备回迁。', '回迁第一年先住临时床位', '原城市只确认一份仓务试工与一处暂住，家人逐人答复是否同行；现住租约、母亲食客与未结工资逐项交接。'),
      option('f15-warehouse-limited-inventory-team', '以自有文具和明确工资组织有限盘点交接小队', { money: -4, knowledge: 3, network: 2 }, 'f15:warehouse:team', '1946 年建立只做民生库存盘点的有限小队。', '小队首年只有三名雇员和两份订单', '三名雇员按班领薪，只盘点客户自有民生库存；单位仓库、旧清单和宿舍不进入企业资产。', { enterpriseStart: { id: 'f15-inventory-team', name: '重庆合成安明民生盘点小队', domainKey: 'D43', kind: 'bounded-civilian-inventory-service-team', workplace: '重庆合成住区与两处民生仓点', product: '有货主、清单、数量、经手人与交接日的民生库存盘点', employees: 3, partners: [{ personId: 'contact:f15_zhao_kejian', role: '只提供两份公开订单的有限介绍人' }], asset: { id: 'inventory-ledger-tools', kind: 'personal-ledgers-tags-scale', description: '主角自有账册、号签与一把登记秤具' }, debt: { id: 'inventory-wage-buffer', creditor: '具名住区借款人', purpose: '首月雇员工资、文具与交通' }, license: { id: 'inventory-service-record', kind: 'documented-civilian-service-record', authority: '重庆合成住区公开事务经手人', scope: '只限民生库存清点，不含单位财物处分权' } } }),
    ],
  });
  installDecision({
    id: 'route-southwest-mechanical-drawing-repair-1946', year: 1946, followYear: 1947, routes: ['southwest-mechanical-drawing-repair'], title: '战后继续受薪、转民用设备维护还是建立有限修理抄图间',
    prompt: '技术经验、单位量具、旧图样和个人工具仍属不同主体。想经营必须先列客户范围、雇员工资、材料债与禁止接触的任务。',
    options: [
      option('f15-repair-remain-waged', '继续做有工单和工具交接的受薪民用维护', { money: 2, craft: 2, health: 1 }, 'f15:repair:waged', '1946 年继续受薪做公开民用设备维护。', '经验没有自动变成单位工具产权', '你逐件交还量具，只接公开水泵、手车和住区设备；工资、夜班、伤病和返工各有答复。'),
      option('f15-repair-local-maintenance', '转本地公共设施维护，重新试修与核工资', { craft: 3, knowledge: 2, position: 1 }, 'f15:repair:local', '1946 年转入本地公共设施维护岗位。', '转岗要重新试修而非继承职位', '新负责人只承认一部分履历，给六周试修；你不因旧单位经历取得工程师称号或审批权。'),
      option('f15-repair-limited-shop', '与同事按自有工具、现金和劳动开有限修理抄图间', { money: -5, craft: 3, network: 2 }, 'f15:repair:shop', '1946 年建立有雇员、工具和退伙边界的民用修理抄图间。', '小店首年只有两名雇员和三类民用任务', '两名雇员按月领薪，同事只投入列明工具，你投入现金和劳动；材料债、返工和退出分别记录，不取得旧单位量具、图样或客户。', { enterpriseStart: { id: 'f15-civilian-repair-drawing-shop', name: '重庆合成承宁民用修理抄图间', domainKey: 'D43', kind: 'bounded-civilian-repair-drawing-shop', workplace: '重庆合成住区登记修理间', supplier: '两家具名民用材料供货人', product: '有来源、工单、版本、试用和返工范围的住区器具修理与公开图样抄描', employees: 2, partners: [{ personId: 'contact:f15_repair_coworker', role: '有限自有工具与劳动合伙人' }], asset: { id: 'repair-drawing-tools', kind: 'documented-personal-repair-drawing-tools', description: '逐件列明所有人的民用修理工具、量具与绘图板' }, debt: { id: 'repair-drawing-material-credit', creditor: '两家具名材料供货人', purpose: '首批民用材料、房租与雇员工资' }, license: { id: 'repair-drawing-record', kind: 'documented-civilian-workshop-record', authority: '重庆合成住区公开事务经手人', scope: '只限民用器具修理和公开抄图，不含受控设备或审批权' } } }),
    ],
  });
  installDecision({
    id: 'route-southwest-clinic-records-clerk-1946', year: 1946, followYear: 1947, routes: ['southwest-clinic-records-clerk'], title: '战后诊疗登记与基层文书怎样继续而不越权',
    prompt: '熊瑞芳、医生、机关经手人和你各有权限。工龄、档案、住处、伤病和补助申请不能因会写字就由你决定。',
    options: [
      option('f15-records-remain-clerk', '继续受薪登记，只收件、核地址与转交', { money: 2, knowledge: 2, position: 1 }, 'f15:records:clerk', '1946 年继续做权限明确的受薪登记文书。', '留下岗位但没有取得诊断或审批权', '你按表登记并给申请人收件答复，护士核伤病，机关决定证明；缺件和退件写出下一步。'),
      option('f15-records-community-referral', '转公开社区转介与书信代写，逐件收费', { network: 3, money: 1, mind: 2 }, 'f15:records:referral', '1946 年转做公开伤病转介与书信代写。', '每份委托都有实际收件人与结果', '你只帮核姓名地址、代写陈述并指向诊疗点或有权机关；对方可能收件、要求补件或退回，没有由你保证批准。'),
      option('f15-records-limited-service-coop', '与熊瑞芳和静宜建立有限登记转介服务社', { money: -4, knowledge: 2, relation: 3 }, 'f15:records:coop', '1946 年建立有权限说明和退出边界的登记转介服务社。', '服务社首年只有两名雇员和三方份额', '熊瑞芳只提供公开照护与转诊指引，静宜投入自己的文书劳动，你投入现金；两名雇员按月领薪，不诊断、不审批、不持官方印章。', { enterpriseStart: { id: 'f15-records-referral-coop', name: '重庆合成瑞宜登记转介服务社', domainKey: 'D44', kind: 'bounded-records-referral-service-cooperative', workplace: '重庆合成住区公开服务间', product: '有委托人、收件人、补件、转交与退回记录的公开登记、转介与书信服务', employees: 2, partners: [{ personId: 'contact:f15_xiong_ruifang', role: '有限公开照护与转诊指引合伙人' }, { personId: 'contact:f15_guo_jingyi', role: '独立文书劳动与客户答复合伙人' }], asset: { id: 'records-service-tools', kind: 'desks-ledgers-public-forms', description: '三方列明的桌椅、账册、公开表样与文具' }, debt: { id: 'records-service-opening-credit', creditor: '具名文具与房租出借人', purpose: '服务间押金、文具与雇员工资' }, license: { id: 'records-service-registration', kind: 'documented-public-service-record', authority: '重庆合成住区公开事务经手人', scope: '只限代写、登记与转介，不含诊断、审批、官方印章或政治身份' } } }),
    ],
  });

  installDecision({
    id: 'southwest-transition-1948', year: 1948, followYear: 1949, families: ['southwestwarworkers'], title: '进入 1949 年前怎样核原籍、现住地、单位、租约与每个人的去向',
    prompt: '父母、静宜、伴侣、同事与房东各有岗位、住处和打算。旧单位证明、现地工资、母亲食客预付和原籍房屋消息不能被一次“回去或留下”代签。',
    options: [
      option('f15-transition-stay-southwest', '留在西南，核新岗位、租约、经营与家人地址', { mind: 2, relation: 2, money: 1 }, 'f15:transition:stay', '1948 年逐项核留川后的岗位、住处和家庭记录。', '留下只保留已确认部分', '你列出工资、工龄、租屋、母亲经营、静宜和伴侣地址；旧单位、原籍房屋与未结款继续标未知。'),
      option('f15-transition-return-confirmed', '只按已确认回迁岗位和原籍床位准备返回', { network: 3, money: -2, position: -1 }, 'f15:transition:return', '1948 年按具名岗位与住处准备回原城市。', '回迁没有让全家自动同行', '父母、静宜和伴侣分别答复，周碧云收回院落，母亲处理食客预付；新地只确认试工和临时床位。'),
      option('f15-transition-other-destination', '带可核履历去其他大陆城市或依住处条件选择港澳台／继续流动', { knowledge: 2, craft: 2, money: -2 }, 'f15:transition:other', '1948 年以可核履历和住处条件准备另寻落点。', '技能只换来试工，不携带旧单位权力', '新地点给有期限岗位与床位答复；旧单位工具、客户、档案和宿舍不随履历迁移，同行者逐人决定。'),
    ],
  });

  installDecision({
    id: 'f15-public-contact-1945', year: 1945, followYear: 1946, families: ['southwestwarworkers'], title: '战争结束前后，住区公开互助要不要接下一件具体事务',
    prompt: '伤病转介、欠薪核对、失所登记与识字代写都需要人，但认识同事、进入单位或会写字都不等于加入政治组织。你只能决定自己是否承担一件有对象、有权限、有交付结果的公开事务。',
    options: [
      option('f15-public-open-work', '跟具名联系人参加公开互助，并先写清本次职责', { network: 3, mind: 2, health: -1 }, 'f15:public:open', '1945 年通过具名联系人参加住区公开互助，尚未加入任何政治党派。', '第一次公开事务得到具体答复', '你核完一份伤病、欠薪或失所登记，罗守正一类的经手人确认收件与下一步；你的名字只进入本次公开簿，没有被补成任何党派成员。', { publicEffect: { status: 'public-participant', organizationKey: 'nonparty', secrecy: 'open', familyKnowledge: 'partial', trustDelta: 10, exposureDelta: 5, addRouteContact: true, roleFromRoute: 'publicRole', historyText: '通过具名联系人第一次承担住区公开互助事务。' } }),
      option('f15-public-practical-only', '只接一件登记、转介、欠薪或识字代写事务', { craft: 2, network: 2, relation: 1 }, 'f15:public:practical', '1945 年从外围承担一件公开事务，没有加入政治党派。', '外围帮手也要把答应的事交完', '你把一名当事人的材料交到具名收件人手里，并留下补件或退回结果；做完这一件没有自动取得长期身份、编制或组织关系。', { publicEffect: { status: 'peripheral-helper', organizationKey: 'nonparty', secrecy: 'open', familyKnowledge: 'partial', trustDelta: 7, exposureDelta: 2, addRouteContact: true, roleFromRoute: 'publicRole', historyText: '从外围承担一项有对象和交付结果的公开事务。' } }),
      option('f15-public-keep-distance', '说明家计、轮班与照料接不住，暂时不参加', { health: 1, relation: 1, mind: 2 }, 'f15:public:distance', '1945 年没有参加眼前的公共组织活动，继续以家计和工作为先。', '没有参加仍然会听到后续结果', '具名联系人后来告知收件和救济结果，你只记录能确认的消息；保持距离没有被写成冷漠、失败或隐藏立场。', { publicEffect: { status: 'unaffiliated', organizationKey: null, secrecy: 'open', familyKnowledge: 'none', historyText: '因家计、轮班或照料责任选择暂不参加；这不是失败结局。' } }),
    ],
  });

  installDecision({
    id: 'f15-public-family-boundary-1946', year: 1946, followYear: 1947, families: ['southwestwarworkers'], publicStatuses: ['public-participant', 'peripheral-helper'], title: '继续公共事务以前，家里应该知道多少、承担多少',
    prompt: '父母、静宜与伴侣都有自己的单位、住处、照料和去向。你的公开活动不能默认占用他们的房间、工作关系、客户或时间，也不能让家人替你保管名单和承担任务。',
    options: [
      option('f15-public-explain-scope', '说明活动名称、实际职责、风险范围与紧急核实人', { relation: 3, mind: 2 }, 'f15:public:family-scope', '1946 年向家人说明公开活动的实际职责与风险范围。', '家人知道范围，但没有自动同意', '父母和静宜分别说明能否帮忙、是否同住和遇事找谁；他们知道核实方法，不因此成为成员、联系人或无偿后勤。', { publicEffect: { familyKnowledge: 'full', exposureDelta: -1, historyText: '向家人说明公开活动、实际职责、风险范围与紧急核实人，没有要求他们承担任务。' } }),
      option('f15-public-emergency-contact-only', '只留下紧急核实人与公开收件处，不交名单', { relation: 1, mind: 3 }, 'f15:public:family-contact', '1946 年只向家人留下公开紧急核实办法。', '一张核实纸不等于替你保密', '纸上只有公开收件处、具名经手人与失联后如何查询；家人不保管名单、不替你传话，也保留搬走或拒绝卷入的决定。', { publicEffect: { familyKnowledge: 'partial', exposureDelta: -2, historyText: '只向家人留下公开紧急核实办法，没有交付名单或任务。' } }),
      option('f15-public-handover-for-family', '交清已答应事务，先退出以处理住处、疾病与家计', { health: 2, relation: 2, network: -1 }, 'f15:public:family-handover', '1946 年交清公开事务并退出活动。', '退出先完成交接，不抹掉旧关系', '你归还表格并说明未完成事项，联系人另找经手人；家里重排住处和照料，旧活动事实保留但不再默认继续。', { publicEffect: { status: 'withdrawn', organizationKey: null, secrecy: 'open', trustDelta: -3, exposureDelta: -2, historyText: '因住处、疾病与家计交清公开事务并退出活动。' } }),
    ],
  });

  installDecision({
    id: 'f15-political-application-1947', year: 1947, followYear: 1948, families: ['southwestwarworkers'], publicStatuses: ['public-participant', 'peripheral-helper'], title: '做过公开事务以后，要不要加入一个合成地方网络',
    prompt: '具名经手人说明介绍、审查、日常责任、退出办法和可能没有答复的现实。这里的个人组织均为合成虚构；真实党派只进入时代近况。你可以申请一个合成网络、保持无党派或退出。',
    options: [
      option('f15-apply-public-civic-network', '申请加入“合成迁入住区公共事务社”，先核公开职责与退出办法', { mind: 3, network: 1, relation: -1 }, 'f15:public:apply-civic-open', '1947 年申请加入合成迁入住区公共事务社，申请与正式接收分开记录。', '申请之后仍然只有等待状态', '经手人核此前公开事务、家计与能承担的责任；你继续原有工作，是否接收尚无答复，没有因递交申请就生成任何真实党派身份。', { publicEffect: { status: 'applicant', organizationKey: null, pendingOrganizationKey: 'civic-open', secrecy: 'open', familyKnowledge: 'partial', trustDelta: 9, exposureDelta: 6, historyText: '申请加入合成迁入住区公共事务社，仍在等待正式答复。' } }),
      option('f15-apply-mutual-aid-network', '申请加入“合成迁厂职工互助网络”，只做工资伤病住处事务', { network: 2, position: 1, mind: 2 }, 'f15:public:apply-civic-mutual', '1947 年申请加入合成迁厂职工互助网络，等待明确答复。', '公开履历与职责先被逐项核对', '经手人核工作、住处与能承担的公开事务；你递交申请后仍照常上班，网络是否接收没有被一句“加入”跳过。', { publicEffect: { status: 'applicant', organizationKey: null, pendingOrganizationKey: 'civic-mutual', secrecy: 'limited', familyKnowledge: 'partial', trustDelta: 8, exposureDelta: 6, historyText: '申请加入合成迁厂职工互助网络，仍在等待明确答复。' } }),
      option('f15-remain-nonparty-helper', '继续公开互助，但明确不申请加入任何党派', { craft: 2, network: 2, mind: 3 }, 'f15:public:nonparty', '1947 年决定保持无党派身份，继续承担公开公共事务。', '不入党也要交付具体事务', '你继续核一份伤病、欠薪或失所材料，联系人只按公开职责分工；无党派不是空白标签，也不被系统暗写成某一组织外围成员。', { publicEffect: { status: 'nonparty-helper', organizationKey: 'nonparty', pendingOrganizationKey: null, secrecy: 'open', familyKnowledge: 'full', trustDelta: 5, exposureDelta: 2, historyText: '明确保持无党派身份，继续承担公开公共事务。' } }),
      option('f15-withdraw-before-joining', '在加入以前退出，并交清借来的表格与未完事务', { health: 2, relation: -1, mind: 2 }, 'f15:public:withdraw', '1947 年在加入任何政治党派前退出公共活动。', '退出后往来逐步减少', '你归还表格、列明未办事项和停止使用的联系；旧熟人没有被抹掉，但不再把新事务默认交给你。', { publicEffect: { status: 'withdrawn', organizationKey: null, pendingOrganizationKey: null, secrecy: 'open', trustDelta: -4, exposureDelta: -3, historyText: '在加入任何党派以前退出，并交清已经答应的事务。' } }),
    ],
  });

  installDecision({
    id: 'f15-public-role-1948', year: 1948, followYear: 1949, families: ['southwestwarworkers'], publicStatuses: ['public-participant', 'peripheral-helper', 'applicant', 'nonparty-helper'], title: '局势变化、单位调整与人员流动加剧时，公共事务怎样继续',
    prompt: '失所、伤病、欠薪、回迁与名单核对同时增加。公开服务、等待组织答复、有限高风险联络与退出不是同一状态；职业出入权不能被借去接触病历、受控图样或未知仓位。',
    options: [
      option('f15-public-continue-open', '继续公开登记、转介、识字或工友互助，等待原有答复', { network: 2, relation: 2, health: -1 }, 'f15:public:continue-open', '1948 年继续承担公开事务，没有把职业权限变成秘密权限。', '公开事务留下收件与退件结果', '你完成一件失所、伤病或欠薪材料，申请中的组织答复仍未到；同事和家人只承担自己同意的部分。', { publicEffect: { secrecy: 'open', trustDelta: 3, exposureDelta: 3, roleFromRoute: 'publicRole', historyText: '局势变化中继续承担公开事务，并等待已经提出的组织申请答复。' } }),
      option('f15-public-limited-liaison', '经独立接触只核一项人员平安消息，并保留拒绝与退出', { mind: 3, health: -2, relation: -1 }, 'f15:public:limited-liaison', '1948 年经独立接触承担一次有限消息核对，未借职业权限接触受控资料。', '没有出现的人继续记作未知', '你只得到一名人员最后所在与一条无法交叉确认的口信；系统不展示秘密方法，不把失联补成死亡、被捕或倒戈，家人也没有被默认卷入。', { publicEffect: { status: 'secret-worker', secrecy: 'secret', familyKnowledge: 'partial', trustDelta: 5, exposureDelta: 7, roleFromRoute: 'covertRole', coverFromCareer: true, historyText: '经独立接触承担一次有限消息核对，保留拒绝、失败与退出边界。' } }),
      option('f15-public-stop-and-handover', '停止活动，交清公开材料并保留个人事实记录', { health: 2, relation: 2, network: -1 }, 'f15:public:stop', '1948 年停止继续参加公共活动，并完成材料交接。', '活动停止，旧事实没有消失', '具名经手人收回表格并接手未办事项；你恢复工作和家计，过去的申请、公开名单与来往仍按事实保留。', { publicEffect: { status: 'inactive', organizationKey: null, pendingOrganizationKey: null, secrecy: 'limited', trustDelta: -2, exposureDelta: -3, historyText: '停止继续参加公共活动，交清材料并保留个人事实记录。' } }),
    ],
  });

  installDecision({
    id: 'f15-political-answer-1949', year: 1949, followYear: 1950, families: ['southwestwarworkers'], publicStatuses: ['applicant'], title: '合成公共网络的申请得到答复时，是否接受成员责任',
    prompt: '经手人带来迟到的正式答复，并再次说明日常责任、地域变化与退出办法。你可以接受，也可以继续外围工作或拒绝；系统不会由此生成真实党派身份。',
    options: [
      option('f15-accept-network-membership', '接受答复，成为所申请合成网络成员并承担经常事务', { mind: 3, network: 2, health: -1 }, 'f15:public:member', '1949 年申请得到答复，成为所申请合成公共网络的成员。', '网络成员身份没有替你解决工资、住处和照料', '第一件经常事务仍有对象和交付结果；你继续处理工作、房租、父母与伴侣生活，合成网络身份没有变成免除日常的等级。', { publicEffect: { status: 'member', organizationFromPending: true, pendingOrganizationKey: null, trustDelta: 12, exposureDelta: 5, roleFromRoute: 'publicRole', historyText: '申请得到正式答复后成为合成公共网络成员，并开始承担有边界的经常事务。' } }),
      option('f15-continue-peripheral', '说明目前接不住成员责任，只继续外围公开事务', { craft: 2, relation: 1, mind: 2 }, 'f15:public:peripheral', '1949 年没有接受成员身份，继续只承担外围公共事务。', '外围职责重新写清', '介绍人不再以成员责任要求你，双方只保留公开登记、转介或互助事务；家人和职业联系人没有被自动纳入。', { publicEffect: { status: 'peripheral-helper', organizationKey: 'nonparty', pendingOrganizationKey: null, secrecy: 'open', trustDelta: 2, exposureDelta: -1, historyText: '没有接受成员身份，重新写清能够继续承担的外围公开事务。' } }),
      option('f15-decline-membership', '拒绝正式接收，并结束原有组织申请关系', { mind: 3, relation: -1, health: 1 }, 'f15:public:decline', '1949 年拒绝加入所申请的政治组织，并结束原有申请关系。', '拒绝以后联系逐步结束', '你交代停止使用的联系与尚未完成的公开事务，对方没有替你作道德结论；往后只记录来往减少与生活重排。', { publicEffect: { status: 'withdrawn', organizationKey: null, pendingOrganizationKey: null, secrecy: 'limited', trustDelta: -5, exposureDelta: -3, historyText: '在正式接收时拒绝加入，并结束原有组织申请关系。' } }),
    ],
  });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['southwestwarworkers'], priority: 12,
      sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }
  var allRoutes = ['southwest-wartime-warehouse-supply', 'southwest-mechanical-drawing-repair', 'southwest-clinic-records-clerk'];
  scene('f15-s01', '单位清单、自家行李和母亲食客预付分成三本', '郭明德只在单位箱清单上签经手栏，叶秀芳把家用、食客预付和自己的进货钱分开；随厂移动没有把三种财物并成单位或家长资产。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f15-s02', '周碧云先说明院落、水缸和晾衣处属于谁', '迁来人多，房东仍逐间说明租用范围、共用水与押金；郭家得到住处，不取得整院和房东的小食生意。', { minAge: 4, maxAge: 7, priority: 23 });
  scene('f15-s03', '编号不符的箱子宁可次日复核', '父亲把一只封条和清单不合的箱子放到待核处，只记录所见，不拆箱、不改号、不因赶工塞进已点清仓位。', { minAge: 5, maxAge: 9, priority: 23 });
  scene('f15-s04', '清单、饭食缝补与临时学校撞在同一上午', '你只能选一处学习，父母各自安排剩下的活；静宜也能查自己的课程和训练，不被默认留下排队做家务。', { minAge: 6, maxAge: 10, priority: 22 });
  scene('f15-s05', '一张床位通知没有解决全家住处', '父亲可能得到单位床位，母亲的食客和家口仍在租院；通勤、押金、用水和下一次答复分别写明。', { year: 1937, priority: 33 });
  scene('f15-s06', '工业西迁落到设备、人员、船期和临时住处', '1938 年，家里不是从一个地点黑屏到另一个地点；每只自家行李、单位箱、途中消息、到达名册与现地床位都逐项确认。', { year: 1938, priority: 36 });
  scene('f15-s07', '静宜问的是自己的报名条件', '郭静宜去问临时学校、文书或护理训练，得到识字、年龄、名额和试做要求；父母不能保证录用，也不能把她的机会自动换成家庭照料。', { minAge: 9, maxAge: 14, priority: 22 });
  scene('f15-s08', '诊疗点只让儿童传准姓名和住址', '熊瑞芳让你把伤者姓名、住址与家属去向传清，不让你碰处置记录或替她判断伤情；帮忙不等于获得诊断权。', { minAge: 10, maxAge: 14, priority: 22 });
  scene('f15-s09', '空袭后人、房屋、单位物资和消息分别确认', '避险点、学校、诊疗点、租院与仓区给出的消息并不同时到达；暂时找不到的人保留最后所在，不补写成死亡。', { year: 1939, priority: 38 });
  scene('f15-s10', '防空与救护有公开秩序和权限', '警报、避难、伤病登记、转诊、消防与交通管制由不同经手人负责；主角能按公开流程帮忙，不能进入受控设施或秘密行动。', { minYear: 1939, maxYear: 1943, priority: 23 });
  scene('f15-s11', '三份成年试做终于写出资格、试工费和答复日', '仓储、民用维修制图、诊疗登记文书分别列出负责人、班次、物件、工资与留用结果；父亲、护士或介绍信只能带你到门口。', { year: 1943, routes: allRoutes, priority: 31 });
  scene('f15-s12', '第一份工作有单位、负责人、同事和服务对象', '你知道在哪一间仓点、修理间或登记处做什么，谁复核、谁同行、谁领取结果、怎样结钱和下一步是什么。', { year: 1944, routes: allRoutes, priority: 29 });
  scene('f15-s13', '仓储差错回到每段清单和经手人', '短少、破损、错仓或领料争议按编号、封条、仓位与签收逐段核；做过一班不等于承担整仓，也不取得单位物资。', { minAge: 14, maxAge: 50, routes: ['southwest-wartime-warehouse-supply'], priority: 22 });
  scene('f15-s14', '返工回到图样版本、旧损、工具和授权', '民用修件或抄图出错时，客户、同事和你只说明自己经手段；单位量具按时归还，系统不展开武器结构或破坏方法。', { minAge: 14, maxAge: 50, routes: ['southwest-mechanical-drawing-repair'], priority: 22 });
  scene('f15-s15', '登记员不替医生与机关作决定', '病人陈述、护士记录、医生结论、补助申请、收件与批准分别保存；会写字、在机关出入或拿过表格不自动生成编制和政治身份。', { minAge: 14, maxAge: 50, routes: ['southwest-clinic-records-clerk'], priority: 22 });
  scene('f15-s16', '工作、母亲饭食、静宜考试和伤病复查撞在一周', '谁减班、谁付有限照料、谁放弃订单和谁保留考试逐项协商；母亲、静宜、伴侣和同事不由主角统一安排。', { minAge: 15, maxAge: 38, priority: 20 });
  scene('f15-s17', '婚后争吵的是两地父母、单位宿舍、夜班与回不回原籍', '你与伴侣分别说明工龄、工资、住处和亲人责任；可分账同住、近处分居、固定通信或暂不合并财物。', { minAge: 20, maxAge: 43, priority: 20 });
  scene('f15-s18', '疾病会让具体轮班和家庭订单停下来', '腰伤、眼痛、咳嗽、胃痛或过劳发生时，检查、药钱、代班、停接饭食、未结工资和复工日逐项确认。', { minAge: 18, maxAge: 58, priority: 20 });
  scene('f15-s19', '朋友、房东和同事有自己的战后去向', '周碧云可能收回租屋，熊瑞芳会调院或病休，赵克俭也可能回迁或缩编；关系能协商，不能把他们当永久资源。', { minAge: 18, maxAge: 60, priority: 19 });
  scene('f15-s20', '公开互助、单位身份与政治组织分开', '住区能登记伤病、欠薪、失所与公开救济；进入工厂、诊疗点或基层文书岗位本身不等于党籍、卧底、告密者或“叛徒”。', { minAge: 18, maxAge: 45, priority: 19 });
  scene('f15-s21', '1945 年先核单位、工资、工龄、租约和每个人', '战争结束没有让单位、宿舍、原籍房屋和家庭自动复原；父母、静宜、伴侣、房东和同事逐人收到回迁、留川、缩编或等待答复。', { year: 1945, priority: 36 });
  scene('f15-s22', '1949 是两地单位、住处与家口的中段回收', '系统列出父母、静宜、伴侣、当前工作、工资工龄、母亲经营、租约、原籍地址与未知消息，再进入八种后半生去向。', { year: 1949, routes: allRoutes, priority: 40 });
  scene('f15-s23', '父亲减少轮班，母亲仍决定锅灶、针线和旧客', '郭明德能核旧清单却不再适合夜班，叶秀芳减少大量饭食却仍决定自己的器具、预付与停业；二人分别安排轻活、医药和住处。', { minAge: 42, maxAge: 68, priority: 19 });
  scene('f15-s24', '死亡不自动结清单位、租屋与两地财物', '父母、同事、房东、原籍亲属或主角去世后，发生、知情、确认、工资尾款、工具、押金、食客预付和未知地址分别处理。', { minAge: 55, priority: 18 });

  C.annualRhythms['southwest-wartime-warehouse-supply'] = [
    '每班先核编号、清单、仓位、领料、经手人、工资和交接日；短少、破损、停工与未知责任不能用赶工一句吞掉。',
    '单位物资、客户民生货、自家行李和同事工具分别有主人；进入单位不取得仓库、宿舍、工龄和整批责任。',
    '战后可继续受薪、回迁、转民生盘点或离开，但岗位、住处和家人去向逐项重核，不把随厂写成终身保障。',
  ];
  C.annualRhythms['southwest-mechanical-drawing-repair'] = [
    '每项民用任务先写旧损、图样版本、工具所有人、授权、修理部位、试用和返工；系统不提供武器制造、破坏或规避检查教程。',
    '男性较常从重件拆洗进入，女性较常从量具、零件与抄描进入；实际能力与劳动逐项记录，双方都能继续学习、转岗或经营。',
    '经验可转公共设施维护或有限修理间，仍须处理雇员工资、材料债、客户投诉、工具份额、伤病、停业与退出。',
  ];
  C.annualRhythms['southwest-clinic-records-clerk'] = [
    '姓名、住址、当事人陈述、护士记录、医生结论、转诊、收件与批准分别保存；登记员不能诊断或代批。',
    '识字与单位出入能换来试工，却不自动生成编制、官方印章、政治身份或对他人档案的无限权限。',
    '战后可继续受薪、转公开转介代写或有限服务社，仍要给每名委托人具体收件、补件、退回和下一步答复。',
  ];
  C.sceneFrames.southwestwarworkers = [
    { open: '天亮后，单位清单、自家行李、母亲饭食账、租院用水、学校与诊疗点同时需要有人处理。', close: '今天只完成一班、一份记录或一项家事；谁拥有、谁经手、谁作决定、谁等待和哪些仍未知分别留下。' },
    { open: '江边雾气压住合成住区，迁入者、本地房东、同事、护士和学生各自先顾自己的工作、住处与亲人。', close: '你得到具体结果，也承担钱、身体、关系或岗位代价；进入单位不等于终身位置，随迁不等于取得本地人的资源。' },
  ];
  C.sceneFrames['southwest-wartime-warehouse-supply'] = C.sceneFrames.southwestwarworkers;
  C.sceneFrames['southwest-mechanical-drawing-repair'] = C.sceneFrames.southwestwarworkers;
  C.sceneFrames['southwest-clinic-records-clerk'] = C.sceneFrames.southwestwarworkers;

  C.parentProfiles.southwestwarworkers = {
    mother: { name: '叶秀芳', born: 1903, occupation: '经营住区饭食与缝补，保留锅灶、针线、食客预付和是否再迁的决定', deathAgeBase: 77, activities: ['核食客预付、原料、缝补件、实收和自己的进货钱', '自己决定接单、进食堂、有限合营、病休或拒绝再迁', '晚年减少大量饭食但仍决定锅灶、针线、旧客和交接'], words: ['“食客先付的钱，要么给饭，要么退回，不能拿去填单位的缺口。”', '“周家的院子归周家，租给我们也不是让我们随便占。”', '“我少做重活，不等于锅、针线和旧客都自动给你。”'] },
    father: { name: '郭明德', born: 1899, occupation: '随迁后做仓储、领料与技术辅助，只核自己经手的清单和交接', deathAgeBase: 75, activities: ['核设备编号、民生物资、领料、仓位、工资与宿舍答复', '对未知箱和未见损失拒绝越权签字', '晚年减少轮班并整理工龄、工资与原籍住处记录'], words: ['“清单是单位的，行李是自家的，不能因为一起上船就混成一笔。”', '“赵主任给你试工，不等于已经留用。”', '“我能交给你的是履历和做事方法，不是单位仓库、工龄和宿舍。”'] },
  };
  C.spouseProfiles.southwestwarworkers = {
    男: { name: '何碧兰', bornOffset: 1, occupation: '住区学校代课与饭食缝补劳动者，保留自己的工资、父母责任和留川决定', values: '同住前要谈清夜班、双方父母、租屋、收入与战后去向，不接受被当作免费单位后勤' },
    女: { name: '蒋守文', bornOffset: -1, occupation: '民用维修与仓务短工，按工单领钱并照料自己的父亲', values: '愿意分担家务与照料，不把妻子的文书、工资、工龄、客户或迁移决定据为己有' },
  };
  C.childNames.southwestwarworkers = ['郭川平', '郭江宁'];

  var warehouseBase = { kind: 'wartime-warehouse-and-supply', role: '迁厂仓储、领料与民生供应交接员', workplace: '重庆合成长江北岸合成单位仓点与住区民生供应点', employer: '合成迁入单位后勤与仓储部门', supervisor: '仓储负责人赵克俭', colleague: '同班清点员严桂芬', publicPerson: '领取民生物资并核签收的住区经手人廖守成', terms: '按班结算工资；清单、仓位、单位物资、家庭行李、短少、伤病、宿舍与工龄分别记录', duties: '清点、入仓、领料与交接公开民生物资，核经手和工资，拒绝替未知整仓或受控生产签字', scenes: ['廖守成领取一批民生物资，你逐项核编号与实数。', '严桂芬发现一只破箱，停在待核处而不是混入已点仓位。', '宿舍只续三个月，你重新核租院与通勤。'] };
  var repairBase = { kind: 'civilian-mechanical-drawing-repair', role: '民用机械维修、制图抄描与设备保全工', workplace: '重庆合成住区民用修理间与公共设施维护点', employer: '合成单位民用维护组或本地公共设施经手人', supervisor: '民用维护负责人陈厚生', colleague: '量具与抄图同事林月清', publicPerson: '送来水泵和手车并等待试用答复的住区客户方师傅', terms: '按工单或班次结算；旧损、版本、授权、工具、材料、试用、返工、夜班与伤病分别记录', duties: '检查、抄描、修理与试用公开民用器具，逐件归还工具；不接来源不明或超出权限的受控任务', scenes: ['方师傅送来水泵，你先写旧损和返工范围。', '林月清发现抄图版本不一，两人先核改版记号。', '一把单位量具下班前逐件归还。'] };
  var recordsBase = { kind: 'clinic-records-and-local-clerical', role: '诊疗登记、伤病转介与基层文书员', workplace: '重庆合成住区诊疗登记处与公开基层事务窗口', employer: '合成诊疗点或住区公开事务经手单位', supervisor: '护士熊瑞芳与文书负责人许文忠', colleague: '登记同事郭静宜', publicPerson: '提交伤病、地址或公开证明材料的住区居民程嫂', terms: '按月或按件结算；收件、补件、退件、转诊、医生结论、机关决定、工资与岗位期限分别记录', duties: '核姓名地址、抄写陈述、登记与转交公开材料，给出收件和下一步；不诊断、不审批、不持未知印章', scenes: ['程嫂补一份地址证明，你写清收件与下一步。', '熊瑞芳核伤情，你只抄正式结论。', '一份材料被退回，你说明缺哪一项而不保证批准。'] };
  C.routeCareerProfilesByGender['southwest-wartime-warehouse-supply'] = {
    男: Object.assign({}, warehouseBase, { role: '仓储清点、搬运与领料交接员', duties: '较常兼重件搬运与夜班，也逐项核工时、工资、伤病与交接，不因体力劳动取得仓库或宿舍' }),
    女: Object.assign({}, warehouseBase, { role: '仓储清点、号签、发放窗口与交接员', duties: '在时代岗位限制下较常从清点与发放进入，实际搬运、夜班和文书都计薪；可转仓管或组织有限盘点队' }),
  };
  C.routeCareerProfilesByGender['southwest-mechanical-drawing-repair'] = {
    男: Object.assign({}, repairBase, { role: '民用设备拆洗、维修与制图学徒', duties: '较常先承担重件拆洗，也必须核版本、授权、工具与返工，不自动成为工程师' }),
    女: Object.assign({}, repairBase, { role: '量具、零件清点、制图抄描与民用修理工', duties: '较常从量具、清点与抄描进入，可继续学习拆修和维护；岗位限制不作能力惩罚' }),
  };
  C.routeCareerProfilesByGender['southwest-clinic-records-clerk'] = {
    男: Object.assign({}, recordsBase, { role: '基层文书、伤病转介与人员名录登记员', duties: '较常进入公开事务收件与外勤核址，仍不得诊断、审批、代签或由岗位推断政治身份' }),
    女: Object.assign({}, recordsBase, { role: '诊疗登记、伤病转介与基层文书员', duties: '在护理和文书岗位机会中承担密集登记与家属沟通，全部劳动计薪，且不被默认承担无偿照料' }),
  };

  Object.assign(C.routeContactProfiles, {
    'southwest-wartime-warehouse-supply': [
      { id: 'f15_warehouse_supervisor', label: '赵克俭', role: '按清单、班次、试工、工资和复核权限安排仓储的负责人', status: 'supervisor', relation: 22, born: 1894 },
      { id: 'f15_warehouse_coworker', label: '严桂芬', role: '有自己的工资、床位、伤病休班与回迁决定的同班清点员', status: 'coworker', relation: 28, born: 1923 },
      { id: 'f15_warehouse_customer', label: '廖守成', role: '按清单领取民生物资并须确认实数与交接的住区经手人', status: 'nearby', relation: 19, born: 1908 },
    ],
    'southwest-mechanical-drawing-repair': [
      { id: 'f15_repair_supervisor', label: '陈厚生', role: '核民用任务来源、图样版本、工具、试用与返工的维护负责人', status: 'supervisor', relation: 23, born: 1901 },
      { id: 'f15_repair_coworker', label: '林月清', role: '按班领薪并保留母亲照料时间的量具、抄图与修理同事', status: 'coworker', relation: 29, born: 1924 },
      { id: 'f15_repair_customer', label: '方师傅', role: '送来水泵与手车并等待试用、返工和赔付答复的住区客户', status: 'nearby', relation: 18, born: 1902 },
    ],
    'southwest-clinic-records-clerk': [
      { id: 'f15_records_supervisor', label: '许文忠', role: '核收件、补件、工资、岗位期限与有权决定机关的文书负责人', status: 'supervisor', relation: 22, born: 1900 },
      { id: 'f15_records_coworker', label: '郭静宜', role: '有自己的训练、工资、住处与去向的登记文书同事和手足', status: 'coworker', relation: 30, born: 1925 },
      { id: 'f15_records_customer', label: '程嫂', role: '提交伤病、地址或公开证明材料并需要真实答复的住区居民', status: 'nearby', relation: 20, born: 1907 },
    ],
  });
  Object.assign(C.healthProfiles, {
    'southwest-wartime-warehouse-supply': ['搬运、夜班与潮湿仓点造成的腰背膝伤', '粉尘、拥挤住区和空袭后环境造成的咳嗽与眼鼻不适', '工资、宿舍、短少责任和两地家人压力造成的胃痛失眠'],
    'southwest-mechanical-drawing-repair': ['久站、锤击和重件拆洗造成的手腕腰背伤', '炉烟、金属木屑与长时抄图造成的咳嗽和眼痛', '返工、夜班、材料债与资格压力造成的胃痛失眠'],
    'southwest-clinic-records-clerk': ['久坐、长时书写与奔走核址造成的肩颈手指疼痛', '诊疗点拥挤、过劳与睡眠不足造成的反复发热咳嗽', '伤病名单、家属催问、退件和岗位期限造成的焦虑失眠'],
  });
  Object.assign(C.publicRouteProfiles, {
    'southwest-wartime-warehouse-supply': { publicGroup: '合成的仓工工资、伤病、宿舍与民生物资公开答复簿', publicRole: '核公开工资、工伤、床位、失所与民生交接答复', covertRole: '单位仓储身份不自动形成秘密资格；另经政治申请也不得借工作权限接触受控信息', infiltrationRole: '不提供窃取、破坏、规避检查或秘密运输教程，公开职业与高风险事务严格分开', contact: { id: 'public_f15_warehouse', label: '罗守正', role: '登记仓工工资、伤病与宿舍答复的公开互助经手人', status: 'colleague', relation: 19, born: 1911 } },
    'southwest-mechanical-drawing-repair': { publicGroup: '合成的民用返工、工具、工资与伤病公开簿', publicRole: '核公开工单、返工、借具、工资与伤病答复', covertRole: '技术岗位不自动生成卧底、破坏或秘密身份；另经选择也只承担有边界的非暴力事务', infiltrationRole: '不提供受控图样、破坏技术或隐蔽教程，拒绝任务、失败与退出均有后果', contact: { id: 'public_f15_repair', label: '宋月华', role: '登记民用修理返工、工具与伤病答复的公开互助经手人', status: 'colleague', relation: 20, born: 1913 } },
    'southwest-clinic-records-clerk': { publicGroup: '合成的伤病转介、失所、证明退件与公开救济登记簿', publicRole: '核公开伤病、地址、转诊、退件与救济答复', covertRole: '文书和诊疗点出入不自动形成组织身份或无限档案权限；政治申请与正式接收另走独立过程', infiltrationRole: '不把病人、家属、档案与表格变成默认情报来源，不提供现实可复用的隐蔽或伤害方法', contact: { id: 'public_f15_records', label: '杜明霞', role: '登记伤病转介、失所与证明退件答复的公开服务经手人', status: 'colleague', relation: 20, born: 1915 } },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('manual', 'southwest-wartime-warehouse-supply');
  addRouteToTrack('skilled', 'southwest-mechanical-drawing-repair');
  addRouteToTrack('literate', 'southwest-clinic-records-clerk');

  C.events.push(
    { id: 'southwest-industrial-relocation-1938', year: 1938, eraBrief: true, eraScope: '重庆战时工业迁建与人口迁入', families: ['southwestwarworkers'], title: '工厂、设备与人员向西南迁移并重新落脚', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { network: 1, money: -2, position: -1 }, knownText: '你知道迁川工厂与工业迁建涉及设备拆运、人员名录、选址、防空和重新生产；到达只意味着开始核仓位、工资、床位与本地租住关系。', unknownText: '家里先面对箱号、船期、失散消息和临时床位，还说不清这场大规模迁移的全貌；每家单位和人员的结果不同。', fact: '1938 年前后，工业西迁使大量设备、人员与家庭在重庆等地重新落脚。', historySource: { label: '国家档案局：迁川工厂联合会与钢迁会档案介绍', url: 'https://www.saac.gov.cn/daj/c100250/201409/9ec1c63c39814ae3b2a6c95f05c3ad1a.shtml' } },
    { id: 'chongqing-bombing-1939', year: 1939, eraBrief: true, eraScope: '重庆空袭与民众生活', families: ['southwestwarworkers'], title: '持续空袭造成伤亡与房屋财产损失', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { health: -3, money: -3, mind: -1 }, knownText: '你知道重庆空袭造成具体人员伤亡、房屋与财产损失；避险、最后所在、伤病、转诊、死亡和财损必须由相应记录分别确认。', unknownText: '警报、失散和破损先压到眼前，你只知道家人最后所在、避险点和一部分伤病名单，不能把没有回音的人补成死亡。', fact: '1938—1943 年间，重庆持续遭受空袭并形成具体伤亡与房屋财产损失记录。', historySource: { label: '重庆市人民政府：“重庆大轰炸”档案入选中国档案文献遗产名录', url: 'https://www.cq.gov.cn/zwgk/zfxxgkml/zdlyxxgk/ggwh/wh/zxdt/202506/t20250610_14701318.html' } },
    { id: 'chongqing-air-defense-public-order-1941', year: 1941, eraBrief: true, eraScope: '重庆公开防空、救护与交通秩序', families: ['southwestwarworkers'], title: '避难、救护、消防与交通管制形成公开分工', knownThrough: ['newspaper', 'conversation', 'books'], delta: { knowledge: 1, network: 1, health: -1 }, knownText: '你知道避难管制、救护、消防、工务和交通各有公开经手人；普通人能学习避险、传准地址和协助登记，但不能越权诊断、进入受控区域或代签损失。', unknownText: '你先记住最近避险点、诊疗点和谁负责登记；更完整的城市防护安排要通过学校、单位通知或报纸才知道。', fact: '战时重庆以避难、救护、消防、工务和交通等公开分工应对持续空袭。', historySource: { label: '重庆市档案馆：重庆防空概况及空袭损害统计表', url: 'https://jda.cq.gov.cn/web/article/1494011077816893440/web/content_1494011077816893440.html' } },
    { id: 'southwest-postwar-factory-transition-1945', year: 1945, eraBrief: true, eraScope: '重庆战后工业与人员重接', families: ['southwestwarworkers'], title: '战争结束后单位、人员与设备进入回迁、留川或调整', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { position: 1, network: 1, money: -1 }, knownText: '你知道战时迁建单位在胜利后面对回迁、留川、缩编或调整，但每名职工的岗位、工龄、工资、宿舍和家人住处仍需单独答复。', unknownText: '单位先发出等待、缩班或回迁口风，你只确认自己和家人的岗位、租屋与工资；战争结束没有自动恢复原籍住房和旧职位。', fact: '1945 年战争结束后，战时迁建单位与人员进入回迁、留川或调整阶段。', historySource: { label: '重庆市档案馆：钢铁厂迁建委员会档案', url: 'https://jda.cq.gov.cn/web/article/1514919470135484416/web/content_1514919470135484416.html' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
