// 民国人生 · F08 天津手艺铺与基层职员家庭运行时包 v0.7.11
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before family-expansion-f08.js');

  C.version = '0.7.11';
  C.familyDecisionKeys.tianjinclerks = { path: 'tianjin-clerk-path', war: 'tianjin-clerk-war' };
  Object.assign(C.designRegistry.families.F08, {
    designStatus: 'runtime-reviewed-first-round', runtimeStatus: 'playable-verified', runtimeFamilyKey: 'tianjinclerks',
  });
  C.runtimeFamilyDesignMap.tianjinclerks = 'F08';
  Object.assign(C.legacyRouteDomainMap, {
    'tianjin-commercial-clerk': 'D22',
    'tianjin-tailoring-garment-worker': 'D23',
    'tianjin-postal-school-clerk': 'D34',
  });

  C.reviewSources = Object.assign(C.reviewSources || {}, {
    'SRC-F08-TIANJIN-ARCHIVES': {
      label: '国家档案局：天津市档案馆馆藏介绍',
      url: 'https://www.saac.gov.cn/daj/c100168/201805/b29e68b35c87469a8c5f24c2ef010a76.shtml',
      supports: ['天津商会、天津海关与天津邮政档案均为馆藏重要文献；游戏只据此建立研究边界，不虚构具体档案内容'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F08-TIANJIN-GUILDS': {
      label: '国家图书馆出版社：近代天津各行业同业公会档案选编',
      url: 'https://www.nlcpress.com/ProductView.aspx?Id=11719',
      supports: ['1906—1949 年天津同业公会档案含职员名册、许可证、营业执照、企业登记、开歇业、收支报表与行业纠纷；精确制度仍待逐件核查'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F08-TIANJIN-HISTORY': {
      label: '天津政务网：天津历史沿革',
      url: 'https://www.tj.gov.cn/sq/tjgk/tjls/lsyg/',
      supports: ['天津近代商贸、邮政、教育与工商业城市背景，以及 1949 年 1 月天津城市制度分水岭；不推出合成人物命运'],
      status: 'source-linked-needs-final-review',
    },
    'SRC-F08-TIANJIN-INDUSTRY': {
      label: '天津市工业和信息化局：近代天津工业发展回顾',
      url: 'https://gyxxh.tj.gov.cn/ZWXX5652/GXDT9285/202112/t20211227_5761812.html',
      supports: ['1912—1937 年天津城市工业加速发展；1937—1945 年占领时期和战后接收重组影响企业与中小工厂，不等于每个岗位同一命运'],
      status: 'source-linked-needs-final-review',
    },
  });

  C.families.tianjinclerks = {
    key: 'tianjinclerks', name: '天津手艺铺与基层职员家', born: 1910,
    place: '天津合成商街与租住里院', defaultSeed: 810,
    defaultNames: { 男: '许文清', 女: '许文澜' },
    motif: '父亲经手的单据、母亲接下的衣物、每月房租和一次次报名答复，把“识字”和“有手艺”拆成具体责任；介绍能带到门口，不能替你签下工作。',
    start: { body: 47, knowledge: 31, craft: 39, mind: 41, network: 27, fame: 12 },
    startRes: { money: 10, health: 79, relation: 67, position: 25 },
    subjects: {
      mother: { label: '母亲', status: 'alive-working', health: 67, agency: 95, note: '接裁缝与改衣，保留剪刀、缝纫机份额、客户衣物和收款决定' },
      father: { label: '父亲', status: 'alive-working', health: 69, agency: 89, note: '在商号做文书跑单，只能签自己权限内的收据与交接' },
      spouse: { label: '配偶', status: 'not-met', health: 70, agency: 92, note: '婚后保留自己的岗位、工钱、父母责任、住处与是否生育的决定' },
      household: { label: '租住里院家口', status: 'together', strength: 57, agency: 87 },
      support: { label: '同院女工、旧同学与同事支持', status: 'neighbors-and-colleagues', strength: 31, agency: 91 },
      connections: { label: '商号、裁缝铺、邮务与学校报名门路', status: 'application-only', strength: 28, agency: 88 },
      workers: { label: '文书、裁缝、递送与校务同事', status: 'separate-wages-and-responsibility', strength: 29, agency: 92 },
      ledger: { label: '房租、衣物、工资、押金与文件分账', status: 'separate-records', strength: 35, agency: 94 },
      children: { label: '子女与晚辈', status: 'none', strength: 0, agency: 86, note: '不自动继承职位、客户、缝纫工具或照料责任' },
    },
    contacts: {
      f08_xu_wenshun: { label: '许文顺', role: '送单、核收据并守住签字权限的商号文书父亲', status: 'family', relation: 62, agency: 89, note: '能介绍一次试工，不能替主角长期担保或补签' },
      f08_cui_xiuyun: { label: '崔秀云', role: '接裁缝、改衣并保管客户衣物与工具的母亲', status: 'family', relation: 70, agency: 95, note: '可拒绝用自己的工具抵债、免费带徒或把铺位自动传给主角' },
      f08_xu_jingan: { label: '许静安', role: '想在学校、邮务训练和裁缝活之间选择的手足', status: 'family', relation: 55, agency: 96, note: '不自动留家帮工，可报名、落选、就业、迁走、婚或不婚' },
      f08_feng_qingzhang: { label: '冯庆章', role: '核文件、现金、印章与职责范围的商号账房负责人', status: 'nearby', relation: 24, agency: 85, note: '会考验、留用、记过或辞退，不能替掌柜授予越权签字' },
      f08_liu_guizhi: { label: '刘桂枝', role: '保留自己客户、工钱与女儿照料时间的同院裁缝女工', status: 'nearby', relation: 35, agency: 95, note: '可合单、竞争、拆伙或拒绝把收入并入许家' },
      f08_hao_shichang: { label: '郝世昌', role: '按公开流程收寄、分拣和交接的基层邮务职员', status: 'nearby', relation: 26, agency: 89, note: '只告知报名条件和答复日，不能改成绩或保证录用' },
    },
  };

  Object.assign(C.routes, {
    'tianjin-commercial-clerk': { name: '天津商号文书、账单与采购交接', family: 'tianjinclerks', summary: '从抄单、跑单和核存根进入商号，逐笔处理印章权限、现金交接、客户催单、差错、停职与转岗。' },
    'tianjin-tailoring-garment-worker': { name: '天津裁缝、改衣与成衣手艺', family: 'tianjinclerks', summary: '从量体、裁剪、缝补和客户余款做起，处理返工、工具产权、帮工工资、视力劳损与有限铺位经营。' },
    'tianjin-postal-school-clerk': { name: '天津邮务、递送与学校基层事务', family: 'tianjinclerks', summary: '通过报名、考试和有限试工进入收寄分拣、地址核验、递送或校务文书，落选、退件、保密和调岗都有明确答复。' },
  });

  C.actions.push(
    { id: 'f08-receipt-address-practice', name: '替父亲对地址、收据、存根与送达答复', families: ['tianjinclerks'], minAge: 6, spirit: 2, delta: { knowledge: 3, mind: 1, relation: 1 }, subjectDelta: { ledger: { strength: 2 } }, contactEffects: { f08_xu_wenshun: { relation: 2 }, f08_feng_qingzhang: { relation: 1 } }, note: '只抄公开字段并核谁接收；识字不等于取得印章或签字权。' },
    { id: 'f08-measure-clothes-ledger', name: '替母亲核衣物、尺寸、订钱与交期', families: ['tianjinclerks'], minAge: 6, spirit: 2, delta: { craft: 3, knowledge: 1, money: 1 }, subjectDelta: { mother: { agency: 1 }, ledger: { strength: 2 } }, contactEffects: { f08_cui_xiuyun: { relation: 2 }, f08_liu_guizhi: { relation: 1 } }, note: '客户衣物、订钱、余款和母亲工具分别登记；帮忙不等于接管生意。' },
    { id: 'f08-rent-school-work-plan', name: '核房租、学费、赶工与本月现金', families: ['tianjinclerks'], minAge: 8, spirit: 3, delta: { mind: 3, knowledge: 1, money: -1, relation: 1 }, subjectDelta: { household: { strength: 1 }, ledger: { strength: 2 } }, note: '把停学、预支、赶工和欠租分别写清，不用“家境困难”概括。' },
    { id: 'f08-commercial-document-shift', name: '完成一班抄单、跑单、核存根与客户答复', routes: ['tianjin-commercial-clerk'], minAge: 15, spirit: 3, careerAction: true, delta: { knowledge: 3, mind: 2, money: 2 }, contactEffects: { f08_feng_qingzhang: { relation: 2 }, f08_clerk_coworker: { relation: 1 } }, note: '记录文件、经手人、权限、送达、退件和结算；不能替掌柜补签。' },
    { id: 'f08-commercial-error-followup', name: '核退单、错数、责任段与更正答复', routes: ['tianjin-commercial-clerk'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 3, position: 1 }, contactEffects: { f08_clerk_supervisor: { relation: 1 }, f08_clerk_customer: { relation: 2 } }, note: '承认确知错误，保留原件，不把上级指示或客户口述补成事实。' },
    { id: 'f08-tailoring-order-shift', name: '完成量体、裁剪、缝补、试衣与余款交接', routes: ['tianjin-tailoring-garment-worker'], minAge: 15, spirit: 4, careerAction: true, delta: { craft: 3, network: 2, money: 2, health: -1 }, contactEffects: { f08_cui_xiuyun: { relation: 1 }, f08_tailor_customer: { relation: 2 } }, note: '每件衣物对应布料、尺寸、经手人、返工和收款；客多不等于已经盈利。' },
    { id: 'f08-tailoring-tools-wages', name: '核布料损耗、工具归属、帮工工资与返工', routes: ['tianjin-tailoring-garment-worker'], minAge: 17, spirit: 3, careerAction: true, delta: { craft: 2, mind: 2, money: 1, relation: 1 }, contactEffects: { f08_liu_guizhi: { relation: 2 }, f08_tailor_coworker: { relation: 1 } }, note: '母亲剪刀和机位、主角工钱、帮工工资与客户布料不能并成一笔。' },
    { id: 'f08-postal-school-shift', name: '完成一班收寄、分拣、地址核验或校务登记', routes: ['tianjin-postal-school-clerk'], minAge: 15, spirit: 3, careerAction: true, delta: { knowledge: 3, network: 1, money: 2 }, contactEffects: { f08_hao_shichang: { relation: 1 }, f08_postal_coworker: { relation: 2 } }, note: '只处理岗位授权字段；退件、错址、缺件与保密分别答复。' },
    { id: 'f08-postal-return-exam-followup', name: '核退件、考试、调岗与下一次报名条件', routes: ['tianjin-postal-school-clerk'], minAge: 17, spirit: 3, careerAction: true, delta: { knowledge: 2, mind: 3, position: 1 }, contactEffects: { f08_postal_supervisor: { relation: 1 }, f08_postal_customer: { relation: 2 } }, note: '落选会说明缺额、成绩或资格，退件保留最后可核地址；都不等于一生结束。' }
  );

  var sourceIds = ['SRC-F08-TIANJIN-ARCHIVES', 'SRC-F08-TIANJIN-GUILDS', 'SRC-F08-TIANJIN-HISTORY', 'SRC-F08-TIANJIN-INDUSTRY'];
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
    id: 'tianjin-clerk-path', year: 1924, followYear: 1925, families: ['tianjinclerks'], title: '三份报名与试工里哪一份成为第一段成年谋生',
    prompt: '冯庆章的商号、崔秀云与刘桂枝的裁缝合单、郝世昌转来的邮务／学校公开报名各有一次机会。你必须问清职责、工钱、工具、考试、试工和答复日。',
    options: [
      option('commercial-clerk-trial', '去商号试做抄单、跑单、存根与客户交接', { knowledge: 3, mind: 2, money: 1 }, 'f08:path:clerk', '1924 年进入天津合成商号做有限文书试工。', '商号给出一份有权限边界的岗位', '冯庆章留你做抄单与跑单，掌柜保留印章和大额签字；男性较易被派外跑单，女性较常从内账、存根和客户回执进入，两者都按实际职责领钱。', { route: 'tianjin-commercial-clerk' }),
      option('tailoring-trial', '跟母亲与刘桂枝试做量体、改衣、试样与收款', { craft: 3, relation: 2, money: 1 }, 'f08:path:tailor', '1924 年在天津合成裁缝合单中做有工资边界的试工。', '第一批衣物分别留下工钱与返工责任', '崔秀云保留工具和旧客，你按件领钱；男性更常从裁剪、采购和外送进入，女性更常从量体、缝制和客户试衣进入，岗位差异不决定能力高低。', { route: 'tianjin-tailoring-garment-worker' }),
      option('postal-school-trial', '参加公开报名，接受考试、核址与有限试工', { knowledge: 3, network: 1, position: 1 }, 'f08:path:postal', '1924 年参加天津合成邮务／学校基层岗位公开报名。', '考试以后得到录用、候补或落选答复', '郝世昌只说明条件和答复日；你凭试卷与试做进入收寄分拣、递送或校务登记，性别与学历影响入口，但没有人替你改成绩。', { route: 'tianjin-postal-school-clerk' }),
    ],
  });

  installDecision({
    id: 'route-tianjin-commercial-clerk-1929', year: 1929, followYear: 1930, routes: ['tianjin-commercial-clerk'], title: '一张单据数字不一致时怎样停住越权补写',
    prompt: '客户联、存根和口头新数不一致，上级暗示照新数补写。谁抄写、谁核对、谁批准与谁收货尚未查清。',
    options: [
      option('clerk-preserve-original', '保留原件，逐栏核抄写、核对、批准与送达', { knowledge: 3, mind: 3, money: -1 }, 'f08:clerk:original', '1929 年保留原单并逐段核文件差错。', '更正只落在能证明的一栏', '冯庆章查出客户口述未获掌柜批准，原单不重写；你改正自己的抄写标点，客户另等正式新单，责任没有全压给最低职员。'),
      option('clerk-admit-known-error', '立即承认自己确知的抄写错误，拒绝承认未知部分', { mind: 3, relation: 2, position: 1 }, 'f08:clerk:admit', '1929 年承认可核抄写错误并保留未知。', '一次记过没有吞掉全部履历', '你重抄一栏并受一次书面记过，冯庆章继续核金额来源；下月仍留岗，但必须双人复核，没有被写成自动升职或终身失业。'),
      option('clerk-refuse-unauthorized-signature', '拒绝补签，要求有权限的人重新出件', { mind: 3, money: -2, network: -1 }, 'f08:clerk:refuse', '1929 年拒绝越权补签并要求重新出件。', '失去一次好感却保住签字边界', '掌柜暂时停你外跑两周，随后由有权经手人重出单据；客户收到延迟答复，你保留原件和工资争议，没有伪造签名。'),
    ],
  });
  installDecision({
    id: 'route-tianjin-commercial-clerk-1946', year: 1946, followYear: 1947, routes: ['tianjin-commercial-clerk'], title: '商号重整后继续受薪、转专门账务还是有限合伙',
    prompt: '战后商号重新核店册、执照和债务。你的文书经验可换稳定岗位，也可能投入少量现金与劳动；旧客户、印章和全部商号并不属于你。',
    options: [
      option('clerk-salaried-records', '继续按月做文书与采购交接，不承担商号旧债', { money: 2, position: 2, mind: 1 }, 'f08:clerk:salary', '1946 年继续受薪核文书、采购与客户交接。', '新班表把旧债留给原商号', '你核六周进销单和客户答复，冯庆章继续管印章；工资按月结，旧债与股权没有因多年任职落到你名下。'),
      option('clerk-specialized-bookkeeping', '转专门账务与报表，停止无权限外跑签字', { knowledge: 3, health: 1, position: 2 }, 'f08:clerk:bookkeeping', '1946 年转入专门账务、报表与库存核对。', '轻岗位仍有老板、同事与差错责任', '新账房要求你核库存、收支与开歇业材料，每张表由冯庆章复核；你减少奔走，也失去部分外勤介绍费。'),
      option('clerk-limited-stationery-partnership', '以现金与劳动建立有限文具账表小铺', { money: -5, craft: 2, network: 2 }, 'f08:clerk:shop', '1946 年建立有范围与退伙边界的文具账表小铺。', '小铺首月只有两名雇员与一批具名货', '你与许静安分别投入现金和劳动，两名雇员按月领薪；纸张、印制、库存、房租、欠款与退出逐项登记，没有取得原商号印章或客户所有权。', { enterpriseStart: { id: 'f08-stationery-record-shop', name: '天津合成文静文具账表小铺', domainKey: 'D44', kind: 'bounded-stationery-record-shop', workplace: '天津合成商街登记铺位', supplier: '合成津门纸张与印制供货人', product: '有来源的文具、账表与公开印制服务', employees: 2, partners: [{ personId: 'contact:f08_xu_jingan', role: '有限现金与校务经验合伙人' }], asset: { id: 'stationery-stock-tools', kind: 'stationery-stock-printing-tools', description: '逐项登记的纸张、账表存货与有限印制工具' }, debt: { id: 'stationery-opening-credit', creditor: '具名纸张供货人', purpose: '首批纸张、铺位押金与印制工具' }, license: { id: 'stationery-shop-registration', kind: 'documented-shop-registration', authority: '天津合成商街管理单位', scope: '仅限文具、账表与公开印制品项' } } }),
    ],
  });

  installDecision({
    id: 'route-tianjin-tailoring-garment-worker-1929', year: 1929, followYear: 1930, routes: ['tianjin-tailoring-garment-worker'], title: '一批校服返工时怎样分布料、工钱与责任',
    prompt: '十二件校服袖长不一，客户布料只够改一次。母亲、刘桂枝、帮工和你分别经手量体、裁剪、缝制与试衣，不能由一个人包下全部返工。',
    options: [
      option('tailor-trace-garment-steps', '逐件核尺寸、布料、经手工序和试衣记录', { craft: 3, knowledge: 2, money: -1 }, 'f08:tailor:trace', '1929 年逐件核校服返工工序。', '十二件衣服得到十二个答复', '四件量体写错、两件裁剪偏差、六件尺寸无误；每位经手人只返自己的部分，客户补一次试衣，帮工不被整批扣薪。'),
      option('tailor-protect-worker-wages', '先付无争议工钱，再按证据分摊返工', { money: -2, relation: 3, craft: 1 }, 'f08:tailor:wage', '1929 年先付无争议帮工工钱并分段返工。', '帮工留下工资与是否续做的选择', '刘桂枝和帮工先领完成部分工钱，两人各自决定是否接返工；母亲的客户布料不作赔偿池，短缺部分由明确失误段补。'),
      option('tailor-bounded-customer-settlement', '与客户写明可改范围、交期和未能恢复的部分', { money: -3, relation: 2, mind: 2 }, 'f08:tailor:settlement', '1929 年与客户完成有限返工和解。', '一次退价没有伪装成所有问题解决', '八件按新交期改完，四件退部分工费；布料旧瑕疵仍标未知，客户决定下批先试一件，没有被剧情强迫永久留下。'),
    ],
  });
  installDecision({
    id: 'route-tianjin-tailoring-garment-worker-1946', year: 1946, followYear: 1947, routes: ['tianjin-tailoring-garment-worker'], title: '母亲眼力下降后怎样继续衣业生计',
    prompt: '崔秀云夜间看针脚困难，想减少急活。剪刀、机位、旧客、铺租、帮工工资和主角劳动不能混成一句“把铺子给你”。',
    options: [
      option('tailor-remain-salaried-cutter', '继续按件做裁剪与核样，母亲保留工具和关铺决定', { money: 2, health: 1, relation: 2 }, 'f08:tailor:salary', '1946 年继续按件做裁剪与核样并保留母亲产权。', '交班表替代自动继承', '崔秀云减少夜活，仍决定工具维修和是否退租；你按件领钱，刘桂枝保留自己的客户，三人的劳动与产权分开。'),
      option('tailor-limited-garment-workshop', '按工具、现金与劳动成立可退伙的成衣改制小作坊', { money: -4, craft: 3, relation: 2 }, 'f08:tailor:workshop', '1946 年建立有工具与退伙边界的成衣改制作坊。', '作坊第一月没有自动盈利', '母亲投入列明机位和剪刀，刘桂枝只投入部分客户与劳动，你投入现金和裁剪；三名雇员按件领薪，布料、返工、押租、订单和退出逐项入账。', { enterpriseStart: { id: 'f08-tailoring-workshop', name: '天津合成秀桂成衣改制作坊', domainKey: 'D43', kind: 'bounded-tailoring-garment-workshop', workplace: '天津合成衣业街登记作坊位', supplier: '具名布料与线扣供货人', product: '有尺寸、试样与交期记录的改衣和小批成衣', employees: 3, partners: [{ personId: 'parent:mother', role: '具名机位、剪刀与经验合伙人' }, { personId: 'contact:f08_liu_guizhi', role: '有限客户与劳动合伙人' }], asset: { id: 'tailoring-tools-machines', kind: 'sewing-machine-cutting-tools', description: '崔秀云具名机位、剪刀与三人盘点的裁缝工具' }, license: { id: 'tailoring-workshop-registration', kind: 'documented-workshop-registration', authority: '天津合成衣业同业与街区管理单位', scope: '仅限登记改衣与小批成衣品项' } } }),
      option('tailor-independent-alterations', '只带自购工具另做改衣，不拿走母亲旧客与机位', { money: -3, network: 2, position: -1 }, 'f08:tailor:independent', '1946 年以自购工具另做有限改衣。', '独立接单从零核客户和房租', '你只带自己的针剪和首批辅料，母亲保留原机位与旧账；三位客户各自决定是否转单，没有因亲属关系自动跟来。', { enterpriseStart: { id: 'f08-independent-alterations', name: '天津合成文澜改衣案', domainKey: 'D43', kind: 'sole-alterations-workbench', workplace: '天津合成里院租用工作位', supplier: '具名线扣辅料供货人', product: '按件核尺寸、交期和余款的改衣', employees: 0, asset: { id: 'personal-tailoring-tools', kind: 'personal-needles-scissors-tools', description: '主角自购针剪、尺与首批辅料' }, debt: { id: 'alterations-opening-supplies', creditor: '具名辅料供货人', purpose: '首批线扣、租位押金与自购工具' } } }),
    ],
  });

  installDecision({
    id: 'route-tianjin-postal-school-clerk-1929', year: 1929, followYear: 1930, routes: ['tianjin-postal-school-clerk'], title: '一封退件和一份报名表怎样保留未知',
    prompt: '一封信因地址不全退回，一名报名者又坚持“熟人说能录取”。寄件人状态、收件人地址、考试成绩和岗位缺额都不是你能替人补写的事实。',
    options: [
      option('postal-return-record', '按原地址、退回原因和日期登记，不猜收件人去向', { knowledge: 3, mind: 2, position: 1 }, 'f08:postal:return', '1929 年按原地址与退件原因登记一封信。', '退件只让一个地址失效', '郝世昌保留封件和退戳，寄件人另查新地址；没有收到回信不等于失联者死亡，也不证明对方拒绝联系。'),
      option('postal-public-exam-answer', '只说明公开条件、成绩与下一次报名日', { knowledge: 2, relation: 2, network: 1 }, 'f08:postal:exam', '1929 年以公开条件回应一次岗位报名。', '熟人介绍没有改写录取结果', '报名者成绩合格但本轮无缺额，进入有期限候补；下一次报名日写清，郝世昌没有私下添名额。'),
      option('postal-refuse-private-opening', '拒绝私拆或代改地址，交由有权限经手人处理', { mind: 3, money: -1, position: 2 }, 'f08:postal:boundary', '1929 年拒绝越权拆件和代改地址。', '边界带来一次问责也保住封件', '主管核实后确认你无权拆件，改由正式流程退回；催件人不满但收到具名答复，信中内容没有变成主角的全知信息。'),
    ],
  });
  installDecision({
    id: 'route-tianjin-postal-school-clerk-1946', year: 1946, followYear: 1947, routes: ['tianjin-postal-school-clerk'], title: '机构重整时怎样保住履历又接受重新核岗',
    prompt: '旧机构、学校与邮务网正在重核名册、岗位和地址。旧工牌能证明部分履历，不能保证原岗、工资和住处全部延续。',
    options: [
      option('postal-submit-recorded-service', '提交可核工龄、职责和考核，接受新岗答复', { knowledge: 2, position: 2, money: 1 }, 'f08:postal:record', '1946 年以可核履历接受重新核岗。', '工龄被承认但岗位发生变化', '你保留四段可核职责，新单位安排分拣与地址复核；旧津贴未自动延续，六周后才确认新工资。'),
      option('postal-school-transfer', '凭文书与地址经验转学校注册、图书或校务', { knowledge: 3, health: 1, network: 1 }, 'f08:postal:school', '1946 年转入学校注册与校务文书。', '转岗有校长、同事、学生与答复', '校务主任给试用班表，你核学生名册、借书与家长地址；旧邮务同事继续自己的岗位，你没有自动获得教师身份。'),
      option('postal-community-copy-desk', '建立只做公开代写、表格与地址抄录的有限案桌', { money: -3, craft: 2, network: 2 }, 'f08:postal:desk', '1946 年建立公开代写与地址抄录案桌。', '案桌不能私拆信件或替人保证资格', '你与许静安按班工作，一名雇员领薪；只代写公开信件、表格和地址，客户自行确认内容，不能使用旧岗位名册或印章。', { enterpriseStart: { id: 'f08-public-copy-desk', name: '天津合成静澜公开代写案桌', domainKey: 'D44', kind: 'bounded-public-copy-desk', workplace: '天津合成学校与邮务街口登记案桌', product: '公开代写、表格填写、地址抄录与回执整理', employees: 1, partners: [{ personId: 'contact:f08_xu_jingan', role: '有限校务劳动与时间合伙人' }], asset: { id: 'copy-desk-tools', kind: 'desk-paper-writing-tools', description: '自购桌椅、纸笔与公开表格样本' }, license: { id: 'copy-desk-registration', kind: 'documented-copy-service-registration', authority: '天津合成街区管理单位', scope: '只限公开代写和表格服务，不含机构印章与私拆信件' } } }),
    ],
  });

  installDecision({
    id: 'tianjin-rent-school-1921', year: 1921, followYear: 1922, families: ['tianjinclerks'], title: '房租、学费和一批急衣同时到期时先保什么',
    prompt: '房东催租，学校催学费，母亲又接到一批交期紧的衣物，父亲可以向商号预支但要从此后工资扣回。每个办法都会让另一个人承担真实成本。',
    options: [
      option('tianjin-protect-rent-pause-school', '先保住房，暂停一学期并保留复学答复日', { money: -2, position: 2, knowledge: -1 }, 'f08:rent:school', '1921 年先保房租并记录一学期停学。', '停学有复学日而不是教育结束', '房租结清，学校保留下一学期名额条件；你在家继续用废纸练字，父母没有把一次停学写成永远不能读书。'),
      option('tianjin-mother-limited-rush-order', '由母亲自己决定只接可承受的急单并加付帮工', { money: 2, health: -1, relation: 2 }, 'f08:rent:order', '1921 年母亲只接有限急单并支付帮工工资。', '赶工没有抹掉母亲的身体和产权', '崔秀云拒绝超出夜间两班的数量，刘桂枝按件领钱；学费付上，母亲眼痛需要停一晚复查。'),
      option('tianjin-father-written-advance', '父亲预支一月工资并写清扣还，不动母亲工具', { money: 2, mind: 1, position: -1 }, 'f08:rent:advance', '1921 年父亲取得一笔写清扣还的工资预支。', '预支解决本月也留下工资债', '冯庆章写明三月扣还，父亲仍保留离职权；母亲剪刀与机位没有作抵押，下月可用现金相应减少。'),
    ],
  });
  installDecision({
    id: 'tianjin-clerk-war', year: 1937, followYear: 1938, families: ['tianjinclerks'], title: '城市进入占领时期时怎样处理岗位、工具和地址',
    prompt: '1937 年战事与占领打断商号、衣业、邮务、学校和住房。父母、静安、伴侣与同事都有自己的岗位和家口，不能由主角统一决定留下或迁走。',
    options: [
      option('tianjin-verified-unit-move', '只随职责、负责人、住处和同行人都确认的岗位迁移', { money: -2, network: 2, position: 1 }, 'f08:war:move', '1937 年只随已确认岗位和住处迁移。', '迁到新地点仍要重新核岗与房租', '你拿到具名单位的临时岗位和床位，父母分别保工具与最后地址；静安按自己的报名结果行动，伴侣没有因婚姻被自动带走。', { warTurn: 'verified-unit-move' }),
      option('tianjin-local-bounded-work', '留城只做对象、用途与经手人明确的民生日常', { craft: 2, money: 1, relation: 1 }, 'f08:war:local', '1937 年留在天津维持用途明确的文书、改衣或递送。', '本地工作逐项减少又重排', '你拒绝来源不明的高价文件和包件，只接具名客户、衣物与公开事务；收入下降，父母是否继续原岗仍由身体和实际单位决定。', { warTurn: 'local-bounded-work' }),
      option('tianjin-split-records-addresses', '家人分别保存工具、凭据、现金、最后地址与核信日', { network: 3, mind: 2, relation: 1 }, 'f08:war:split', '1937 年家人分别保存工作凭据、工具和最后地址。', '一次退件没有变成全家失踪', '母亲保住剪刀和客户衣物，父亲带走存根，静安保留报名回执，伴侣守自己的工钱；每人状态分开更新。', { warTurn: 'split-records-addresses' }),
    ],
  });
  installDecision({
    id: 'tianjin-postwar-reorganization-1948', year: 1948, followYear: 1949, families: ['tianjinclerks'], title: '城市与机构再变化前怎样核最后一份岗位和家账',
    prompt: '物价、机构、商号和住处仍在变化。1949 即将成为人生中段，但父母晚年、旧债、工具、工作和去向必须逐项处理，不能提前写结局。',
    options: [
      option('tianjin-keep-current-records', '留在原岗位，逐项核工资、债务、工具和家庭住处', { money: 1, mind: 2, relation: 1 }, 'f08:postwar:stay', '1948 年逐项核原岗位与家庭账。', '1949 前的最后账没有变成终局', '工资、铺租、母亲工具、父亲存根和静安地址分别确认；未结事项带入下一年，民国结束不等于主人公死亡。'),
      option('tianjin-apply-new-role', '拿可核履历申请新岗位，接受落选或试用', { knowledge: 2, position: 2, money: -1 }, 'f08:postwar:apply', '1948 年凭可核履历申请一次新岗位。', '介绍信只换来面谈和六周试用', '对方核职责与报酬后给六周试用，旧岗位结清；录用尚未发生，下一年必须给明确答复。'),
      option('tianjin-protect-household-assets', '先保住处、工具、药与可携文件，再决定去向', { money: -2, health: 2, position: 2 }, 'f08:postwar:assets', '1948 年先保住处、谋生工具、药物和可携文件。', '保守安排保留下一步而非自动成功', '家中结清一部分欠租，母亲工具和父亲可公开存根各自装箱；未确认岗位和异地去向继续标未知。'),
    ],
  });

  function scene(id, title, text, extra) {
    C.ordinaryEvents.push(Object.assign({
      id: id, title: title, text: text, families: ['tianjinclerks'], priority: 12,
      sourceIds: sourceIds.slice(), reviewStatus: 'runtime-regression-and-source-linked-needs-final-review',
    }, extra || {}));
  }
  scene('f08-s01', '父亲的文件包和母亲的衣物柜各有主人', '许文顺把待送单据挂高，崔秀云把客户衣物、剪刀和机位另锁一柜；两人的工作、现金和责任不是同一本家庭账。', { minAge: 0, maxAge: 3, priority: 24 });
  scene('f08-s02', '客人只付订钱，衣物仍要逐件交接', '崔秀云记下衣物、尺寸、订钱、余款和交期，不让孩子替她答应急活；客户也能在试衣后要求有范围的返工。', { minAge: 3, maxAge: 6, priority: 23 });
  scene('f08-s03', '退件先问谁抄、谁核、谁送', '父亲带回一张地址少字的退件，冯庆章逐段问经手人；职位最低不等于自动承担全部差错。', { minAge: 5, maxAge: 8, priority: 23 });
  scene('f08-s04', '送单、量布和学校撞在同一上午', '你只能去一处，父母分别安排剩下的工作；静安也保留自己的课程，不因性别自动守家。', { minAge: 6, maxAge: 10, priority: 22 });
  scene('f08-s05', '房租、学费和急衣同时到期', '家里列出住房、学校、帮工、母亲眼力与父亲预支债，每个选择都把下一月谁少了什么写清。', { year: 1921, priority: 35 });
  scene('f08-s06', '废账纸能练字，未结客户名不能看', '父亲同意用废纸练字，却先剪去未结客户姓名；家庭支持没有取消职业保密。', { minAge: 9, maxAge: 13, priority: 21 });
  scene('f08-s07', '刘桂枝谈的是合单，不是并户', '她提出合做一批校服，要求按各自件数收钱、返工也各自承担；两家不会因为合作合并收入和照料责任。', { minAge: 10, maxAge: 15, priority: 21 });
  scene('f08-s08', '三份试工各有老板、工钱和答复日', '商号、裁缝合单、邮务／学校报名分别写明职责、考试、工具、试工和结果日期；介绍只把人带到门口。', { year: 1924, routes: ['tianjin-commercial-clerk', 'tianjin-tailoring-garment-worker', 'tianjin-postal-school-clerk'], priority: 30 });
  scene('f08-s09', '第一份稳定工作终于有具体名字', '冯庆章、崔秀云／刘桂枝或具名邮务校务主管给出留用、候补或落选；岗位、同事、公众对象、工时与结算进入职业账。', { year: 1925, routes: ['tianjin-commercial-clerk', 'tianjin-tailoring-garment-worker', 'tianjin-postal-school-clerk'], priority: 22 });
  scene('f08-s10', '商号差错不是一枚声望扣分', '原件、存根、口述、印章和送达分别核验；记过、停职、留用、补件或辞职都有明确下一步。', { routes: ['tianjin-commercial-clerk'], minAge: 18, maxAge: 47, priority: 21 });
  scene('f08-s11', '裁缝返工要落到每件衣服', '尺寸、布料、裁剪、缝制、试衣和余款分别有经手人；客户能留下、换人或停止下单。', { routes: ['tianjin-tailoring-garment-worker'], minAge: 18, maxAge: 47, priority: 21 });
  scene('f08-s12', '退件和落选都必须告诉下一步', '退件只让一个地址失效，落选只说明本轮缺额、成绩或资格；重新查址、补课、候补或换岗都有答复日。', { routes: ['tianjin-postal-school-clerk'], minAge: 18, maxAge: 47, priority: 21 });
  scene('f08-s13', '顾客不是一句生意不错', '一位客户催单、一位家长问报名、一位寄件人查退件；你只能按自己经手的事实答复，每人会继续、换人或停止往来。', { minAge: 20, maxAge: 52, priority: 20 });
  scene('f08-s14', '结婚后争吵的是班次、钱和两边父母', '你与伴侣为夜班、房租、工具、双方父母医药钱和是否生育争吵；两人分别说出不能放下的工作，再决定同住、近居或暂缓。', { minAge: 23, maxAge: 43, priority: 20 });
  scene('f08-s15', '眼痛、手腕痛和奔走腿伤会真正停工', '夜缝伤眼、反复抄写伤腕、长途跑单与递送伤膝。看诊、药钱、代班、工钱与复工日分别处理，部分旧伤进入晚年。', { minAge: 24, maxAge: 58, priority: 20 });
  scene('f08-s16', '朋友也有客户、孩子和退出', '刘桂枝因照顾女儿减少接单，提出只合购布料；她可拒绝大单、转铺或拆伙，不是永远等待主角使用的帮工。', { minAge: 22, maxAge: 57, priority: 19 });
  scene('f08-s17', '1937 年先让单据、衣物和人停在不同地点', '商号停单、客户取衣、邮路变化、学校停课和住处不安分别发生；没有用一句“战乱”抹掉每个人最后可核状态。', { year: 1937, priority: 37 });
  scene('f08-s18', '占领时期的工作逐年重排', '你只处理对象和用途明确的民生文件、衣物、信件与校务；高价不明委托可拒绝，职业不会自动生成秘密身份。', { minYear: 1938, maxYear: 1944, priority: 23 });
  scene('f08-s19', '1945 年以后原机构和原岗位不是同一件事', '商号、作坊、邮务和学校分别核名册、工具、库存与职责；旧履历能证明经历，不能保证原岗、工资或住处原样回来。', { year: 1945, priority: 34 });
  scene('f08-s20', '经营账里必须看见雇员和所有权', '开小铺或作坊时，雇员工资、母亲工具、合伙份额、库存、债务、登记与退出分别显示；有店名不等于已经发财。', { minAge: 36, maxAge: 58, priority: 20 });
  scene('f08-s21', '父亲晚年只能交经验，不能交职位', '许文顺减少跑单后可教地址核对和存根习惯，却不能把商号职位、印章或客户当遗产；主角仍需自己受聘。', { minAge: 42, maxAge: 62, priority: 19 });
  scene('f08-s22', '母亲晚年自己决定工具和住处', '崔秀云眼力下降后可停夜活、保留机位、卖掉一件自有工具或继续管账；她不因年老自动把财产和决定权交给孩子。', { minAge: 43, maxAge: 65, priority: 19 });
  scene('f08-s23', '1949 只回收中段事实', '系统列出父母、静安、伴侣、岗位、客户衣物、工具、债务、最后地址和未结答复，再进入此后人生；没有提前生成成功或失败结局。', { year: 1949, priority: 40 });
  scene('f08-s24', '死亡与工资、工具、信件交接分开确认', '本人或家人死亡后，最后工资、客户衣物、工具、押租与退件仍逐项交给有权接收者；死亡发生、知情、确认和财物处理不是同一步。', { minAge: 52, priority: 18 });

  C.annualRhythms['tianjin-commercial-clerk'] = [
    '每天先从冯庆章处领取具名原件，抄完后把存根、印章、送达对象和答复日逐项交回；介绍人只负责引见，留用、工钱与差错仍由实际掌柜核定。',
    '商号里的一笔买卖要经过客户询价、伙计开单、账房复核、仓间备货和收款结算；你只签自己经手的一段，不能用“在商号做事”替代当天的结果。',
    '许文顺会讲旧地址和存根习惯，却不能替你取得职位；遇到退单、少款或停工时，你要等具名负责人给出补件、记过、留用、离职或下次答复日。',
  ];
  C.annualRhythms['tianjin-tailoring-garment-worker'] = [
    '每件衣物分别记录主人、布料、尺寸、订钱、裁剪、缝制、试衣、返工和余款；崔秀云、刘桂枝、帮工与主角各自保留工具、工资和退出权。',
    '今天来的顾客可能催一件校服、退一条裤脚或只问价不下单；收到的现钱要扣掉布料、铺租、帮工工资和返工，客多不等于已经盈利。',
    '夜缝会伤眼和手腕，急单也会挤掉照料与休息；是否接单、谁来代工、哪件延交、少收多少钱和何时复诊都必须留下明确答复。',
  ];
  C.annualRhythms['tianjin-postal-school-clerk'] = [
    '一封信或一份报名表要核姓名、地址、资费或资格、收件人和回执；退件与落选只说明本次结果，还要写清补址、候补、补课或改投岗位的日期。',
    '郝世昌分派柜台、递送或校务记录，寄件人、家长、学生和同事只回答自己经手的一段；试用、轮班、病休与工资不会被一句“当了职员”略过。',
    '邮路、学期和机构安排改变时，你先核仍有效的名册、钥匙、票据和公众答复；旧履历能换来审查或面谈，却不会自动换来编制、住房和终身职位。',
  ];
  C.sceneFrames.tianjinclerks = [
    { open: '天亮后，父亲的文件包、母亲的衣物柜、静安的课程与这一月房租同时摆在眼前。', close: '这一天只处理了一份单据、一件衣物或一次报名；谁经手、谁付钱、谁等待以及下次答复日分别记下，没有被概括成“日子照过”。' },
    { open: '街面的商号、成衣铺、邮务柜台与学校各自开门，冯庆章、刘桂枝和郝世昌只对自己的岗位负责。', close: '你得到一个具体结果，也承担工资、工具、身体或关系上的代价；父母与伴侣仍保留自己的工作、财物和是否继续合作的决定。' },
  ];
  C.sceneFrames['tianjin-commercial-clerk'] = C.sceneFrames.tianjinclerks;
  C.sceneFrames['tianjin-tailoring-garment-worker'] = C.sceneFrames.tianjinclerks;
  C.sceneFrames['tianjin-postal-school-clerk'] = C.sceneFrames.tianjinclerks;

  C.parentProfiles.tianjinclerks = {
    mother: { name: '崔秀云', born: 1885, occupation: '接裁缝、改衣并保管客户衣物、剪刀与机位产权', deathAgeBase: 76, activities: ['逐件核尺寸、订钱、余款与交期', '眼痛后自己决定减急活、看诊或停夜班', '晚年保留工具、客户和是否退租的决定'], words: ['“衣服是谁的、收了多少订钱，先记清再下剪。”', '“我的剪刀和机位不能替旁人的债作保。”', '“你若想接铺位，我们先把工具、工资和客户逐项说清。”'] },
    father: { name: '许文顺', born: 1882, occupation: '在商号抄单、跑单并核收据与送达', deathAgeBase: 73, activities: ['交回文件、收据与送达答复', '差错时只承认自己经手的一段', '晚年教核地址和存根，不把岗位当遗产'], words: ['“我只能签自己经手的，掌柜的名字不能替他写。”', '“介绍你去见冯账房，不等于他一定留你。”', '“原件先别动，谁在哪一步写错就查哪一步。”'] },
  };
  C.spouseProfiles.tianjinclerks = {
    男: { name: '刘瑞芳', bornOffset: 1, occupation: '成衣铺核样与校务短工，保留工资和母亲照料时间', values: '共同生活要谈清房租、夜班、双方父母和孩子，不接受自动免费帮店' },
    女: { name: '韩守诚', bornOffset: -1, occupation: '邮务递送与商号库存短工，按班领薪并照料自己的父亲', values: '愿意分担家用和照料，不把妻子的客户、工具或岗位门路据为己有' },
  };
  C.childNames.tianjinclerks = ['许津宁', '许静和'];

  var clerkBase = { kind: 'commercial-clerical-work', role: '商号文书、账单与采购交接职员', workplace: '天津合成裕成商号文书房与客户柜台', employer: '天津合成裕成商号', supervisor: '账房负责人冯庆章', colleague: '同事郑启明', publicPerson: '催货与核收据的姚掌柜', terms: '有限试工后按月结算；原件、存根、印章权限、现金、送达、退件、记过与辞退分别记录', duties: '抄写与核对订单、收据和采购交接，向客户说明送达与差错结果，不替掌柜越权签字', scenes: ['客户要求改一栏金额，你先核原件与批准人。', '同事漏附收据，你只补自己能证明的交接。', '一份采购单延期，姚掌柜收到具名答复与新日期。'] };
  var tailorBase = { kind: 'tailoring-garment-work', role: '裁缝、改衣与成衣核样劳动者', workplace: '天津合成秀云裁缝案与衣业合单铺位', employer: '经营者崔秀云', supervisor: '崔秀云', colleague: '同院裁缝刘桂枝', publicPerson: '试衣与付余款的顾客孙太太', terms: '有限试工后按件结算；工具、布料、尺寸、返工、帮工工资、余款和交期分别记录', duties: '量体、裁剪、缝制、试衣和返工，逐件核客户衣物与收款，并保留母亲工具产权', scenes: ['孙太太试衣后指出袖长，你按原尺寸判断返工范围。', '刘桂枝少做一班去照顾女儿，实际工钱照结。', '一块客户布料有旧瑕疵，剪前由双方具名确认。'] };
  var postalBase = { kind: 'postal-school-clerical-work', role: '邮务收寄、分拣、地址核验与校务登记职员', workplace: '天津合成邮务支局与相邻学校事务处', employer: '天津合成邮务／学校基层机构', supervisor: '邮务主管郝世昌', colleague: '同事赵毓华', publicPerson: '查询退件与报名答复的陈女士', terms: '公开报名与有限试工后按月结算；考试、缺额、地址、封件、退件、保密、调岗与离职分别记录', duties: '收寄分拣、核地址与退件，或登记学生与借阅；只处理岗位授权内容并给出下一步', scenes: ['退件只让一个旧地址失效，你不猜收件人命运。', '陈女士问报名结果，你说明成绩、缺额和候补期限。', '主管要求复核一袋分件，同事共同签交接而非互相推责。'] };
  Object.assign(C.routeCareerProfiles, { 'tianjin-commercial-clerk': clerkBase, 'tianjin-tailoring-garment-worker': tailorBase, 'tianjin-postal-school-clerk': postalBase });
  C.routeCareerProfilesByGender = C.routeCareerProfilesByGender || {};
  C.routeCareerProfilesByGender['tianjin-commercial-clerk'] = {
    男: Object.assign({}, clerkBase, { role: '商号外勤跑单、抄单与采购交接职员', duties: '在时代岗位分工下更多承担外勤送单与采购，同时核存根和权限；跑得远不等于有签字权' }),
    女: Object.assign({}, clerkBase, { role: '商号内账抄录、存根与客户回执职员', duties: '在时代招工门槛下更多从内账、存根、回执与柜台答复进入，不假定能自由取得所有外勤职位' }),
  };
  C.routeCareerProfilesByGender['tianjin-tailoring-garment-worker'] = {
    男: Object.assign({}, tailorBase, { role: '裁剪、布料采购与成衣外送劳动者', duties: '承担裁剪、采购与外送，也核尺寸、返工和工钱，不取代母亲工具产权' }),
    女: Object.assign({}, tailorBase, { role: '量体、缝制、试衣与成衣核样劳动者', duties: '在时代劳动分工下管理量体、缝制、试衣和客户余款，保留工资、休息与合伙决定' }),
  };
  C.routeCareerProfilesByGender['tianjin-postal-school-clerk'] = {
    男: Object.assign({}, postalBase, { role: '邮务递送、分拣与地址核验基层职员', duties: '承担更多外勤递送与分拣，核地址、封件与交接，不因递送路线获得私拆或套取信息权' }),
    女: Object.assign({}, postalBase, { role: '邮务柜台、分拣与学校登记基层职员', duties: '在时代考试和招工门槛下从柜台、分拣、名册和借阅进入，不假定女性普遍取得全部外勤岗位' }),
  };

  Object.assign(C.routeContactProfiles, {
    'tianjin-commercial-clerk': [
      { id: 'f08_clerk_supervisor', label: '冯庆章', role: '核原件、存根、印章权限与现金交接的账房负责人', status: 'supervisor', relation: 20, born: 1880 },
      { id: 'f08_clerk_coworker', label: '郑启明', role: '能说明同一批单据、送达和实际工时的文书同事', status: 'coworker', relation: 26, born: 1901 },
      { id: 'f08_clerk_customer', label: '姚书恒', role: '会催货、核收据并要求差错答复的商号客户', status: 'nearby', relation: 18, born: 1889 },
    ],
    'tianjin-tailoring-garment-worker': [
      { id: 'f08_tailor_coworker', label: '高巧兰', role: '按件领薪并保留弟弟照料时间的成衣帮工', status: 'coworker', relation: 27, born: 1903 },
      { id: 'f08_tailor_supplier', label: '孟福泰', role: '按批核布料、线扣、旧瑕疵与付款日的供货人', status: 'nearby', relation: 19, born: 1887 },
      { id: 'f08_tailor_customer', label: '孙毓华', role: '会试衣、付余款并对返工范围作决定的顾客', status: 'nearby', relation: 21, born: 1894 },
    ],
    'tianjin-postal-school-clerk': [
      { id: 'f08_postal_supervisor', label: '郝世昌', role: '说明考试、缺额、分拣、地址与保密边界的基层主管', status: 'supervisor', relation: 20, born: 1882 },
      { id: 'f08_postal_coworker', label: '赵毓华', role: '共同核封件、分拣袋、名册和实际班次的同事', status: 'coworker', relation: 26, born: 1902 },
      { id: 'f08_postal_customer', label: '陈静仪', role: '查询退件、报名与下一次答复日的寄件人和家长', status: 'nearby', relation: 19, born: 1892 },
    ],
  });
  Object.assign(C.healthProfiles, {
    'tianjin-commercial-clerk': ['长时间抄写造成的眼痛与手腕疼痛', '反复跑单和寒风造成的膝踝旧伤与咳嗽', '差错追责、停职和欠薪造成的失眠胃痛'],
    'tianjin-tailoring-garment-worker': ['夜间细缝和光线不足造成的眼痛', '久坐、踩机与剪裁造成的腰背和手指疼痛', '急单、返工与房租压力造成的过劳胃痛'],
    'tianjin-postal-school-clerk': ['分拣抄录造成的眼腕劳损', '外勤递送与冬季奔走造成的腿伤和反复咳嗽', '考试、退件与机构调岗造成的长期失眠'],
  });
  Object.assign(C.publicRouteProfiles, {
    'tianjin-commercial-clerk': { publicGroup: '合成的商号职员工钱、差错与越权公开答复簿', publicRole: '核公开工钱、职务、文件差错与越权指示', covertRole: '只有另经独立政治申请与考验才可能参与有限联络；识字和经手文件本身不等于组织身份', infiltrationRole: '不借商号文件套取客户隐私，任何高风险工作都需独立授权并允许拒绝、失败与退出', contact: { id: 'public_f08_clerk', label: '邵守文', role: '登记公开职务、欠薪和差错答复的职员互助经手人', status: 'colleague', relation: 19, born: 1900 } },
    'tianjin-tailoring-garment-worker': { publicGroup: '合成的衣业工钱、返工与工具边界公开簿', publicRole: '核公开帮工工资、返工、客户衣物与工具产权', covertRole: '只有另经独立选择才可能参与有限公共联络；裁缝客户不会自动变成情报来源', infiltrationRole: '不借量体、送衣或客户住址套话，秘密身份与职业必须分开记录', contact: { id: 'public_f08_tailor', label: '吴兰英', role: '登记衣业工资、返工与工具纠纷的公开互助经手人', status: 'colleague', relation: 20, born: 1902 } },
    'tianjin-postal-school-clerk': { publicGroup: '合成的退件、考试与基层岗位公开答复簿', publicRole: '核公开报名、退件、调岗与保密边界', covertRole: '邮务路线或学校名册不自动赋予秘密身份；另经选择时也只处理被授权的有限事实', infiltrationRole: '不私拆信件、不套取学生与家长隐私，任何压力、退出和失败均留事实账', contact: { id: 'public_f08_postal', label: '林淑贞', role: '登记退件、报名和公开岗位答复的基层互助经手人', status: 'colleague', relation: 20, born: 1901 } },
  });

  function addRouteToTrack(track, routeKey) {
    C.livelihoodTrackRoutes[track] = C.livelihoodTrackRoutes[track] || [];
    if (C.livelihoodTrackRoutes[track].indexOf(routeKey) === -1) C.livelihoodTrackRoutes[track].push(routeKey);
  }
  addRouteToTrack('literate', 'tianjin-commercial-clerk');
  addRouteToTrack('skilled', 'tianjin-tailoring-garment-worker');
  addRouteToTrack('literate', 'tianjin-postal-school-clerk');

  C.events.push(
    { id: 'tianjin-urban-industry-1933', year: 1933, eraBrief: true, eraScope: '天津工商业城市', families: ['tianjinclerks'], title: '天津的工厂、商号与城市事务继续扩张', knownThrough: ['newspaper', 'conversation'], delta: { network: 1, position: 1 }, knownText: '你知道天津已是北方重要工业与商贸城市，商号、衣业、邮务和学校岗位都增加了更细的分工；岗位增多仍须报名、试工与明确录用。', unknownText: '街上新的工厂、商号和事务机构带来更多单据、衣物与邮件，你先从工作量感到城市扩张，还不知道全市统计。', fact: '1933 年前后的天津处于 1912—1937 年城市工业加速发展时期。', historySource: { label: '天津市工业和信息化局：近代天津工业发展回顾', url: 'https://gyxxh.tj.gov.cn/ZWXX5652/GXDT9285/202112/t20211227_5761812.html' } },
    { id: 'tianjin-occupation-1937', year: 1937, eraBrief: true, eraScope: '天津城市生活', families: ['tianjinclerks'], title: '天津进入日军占领时期', knownThrough: ['newspaper', 'conversation', 'storytelling'], delta: { money: -2, health: -1, position: -2 }, knownText: '你知道 1937 年 7 月后天津进入占领时期，商号、工厂、邮务、学校与住处长期变化；一次去留不能替代此后八年的逐年日常。', unknownText: '战事、封路和单位变化先打断单据、衣物、邮件和住处，你只知道眼前岗位与家人最后地址，尚不能确认城市会持续多久。', fact: '1937 年 7 月至 1945 年 8 月天津处于日军占领时期。', historySource: { label: '天津市工业和信息化局：近代天津工业发展回顾', url: 'https://gyxxh.tj.gov.cn/ZWXX5652/GXDT9285/202112/t20211227_5761812.html' } },
    { id: 'tianjin-postwar-industry-reception-1945', year: 1945, eraBrief: true, eraScope: '天津工商业与机构', families: ['tianjinclerks'], title: '战后企业与机构开始接收和重组', knownThrough: ['newspaper', 'conversation'], delta: { position: 1, money: -1, network: 1 }, knownText: '你知道日本投降后天津较大工业企业与机构经历接收、重组，中小工厂也有停顿；旧工牌、旧工具、原岗位和新录用必须分别确认。', unknownText: '原来的招牌、主管和班表不再完全对应，你先拿旧履历逐一问答，还不知道哪些单位会恢复、改组或停办。', fact: '1945 年后天津企业与机构进入接收和重组阶段。', historySource: { label: '天津市工业和信息化局：近代天津工业发展回顾', url: 'https://gyxxh.tj.gov.cn/ZWXX5652/GXDT9285/202112/t20211227_5761812.html' } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
