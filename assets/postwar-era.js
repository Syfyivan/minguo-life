// 民国人生 · 1949 后时代层 v0.5.1
// 把个人年度日常与所在地的时代变化分开；史实事件只写到可核实范围。
(function (root) {
  'use strict';

  var C = root.MINGUO_GAME_CONTENT;
  if (!C) throw new Error('MINGUO_GAME_CONTENT is required before postwar-era.js');

  C.version = '0.5.1';

  // 旧内容包中的普通场景为民国阶段所写。除明确按晚年年龄触发的回响外，
  // 不得在 1950 年以后继续抽取，避免士兵点名、流亡屋檐等战时画面串入新落点。
  (C.ordinaryEvents || []).forEach(function (event) {
    var lateLifeEcho = Number(event.yearByAge || 0) >= 50 || Number(event.minAge || 0) >= 50;
    if (!event.post1949Choices && !lateLifeEcho && event.maxYear == null) event.maxYear = 1949;
  });

  var majorExistingIds = [
    'footbinding-ban-1912', 'may-thirtieth-1925', 'subei-flood-1931',
    'war-1937', 'war-end-1945', 'gold-yuan-1948', 'land-change-1949',
  ];

  function source(label, url) {
    return { label: label, url: url };
  }

  var existingHistorySources = {
    'footbinding-ban-1912': source('中国社会科学院近代史研究所：孙中山与劝禁缠足史料', 'https://jds.cssn.cn/webpic/web/jdsww/UploadFiles/zyqk/2010/12/jdsyj198103.pdf'),
    'may-thirtieth-1925': source('上海市人民政府：纪念五卅运动 100 周年', 'https://www.shanghai.gov.cn/nw15343/20250527/8f8e0856c76445b7a9841deab121303f.html'),
    'subei-flood-1931': source('华东师范大学中国现代城市研究中心：1931 年江淮大水研究', 'https://www.clhm.ecnu.edu.cn/_upload/article/files/a2/f8/6ac640fa4f5f9ab0b4b51bd1a6f9/c383ccb3-4f2f-49a2-bb00-2192483032b1.pdf'),
    'war-1937': source('中国国家博物馆：卢沟桥事变史料', 'https://www.chnmuseum.cn/zp/zpml/gmww/202112/t20211214_253214.shtml'),
    'war-end-1945': source('中国国家博物馆：抗日战争胜利史料', 'https://www.chnmuseum.cn/zp/zpml/gmww/202112/t20211214_253211.shtml'),
    'gold-yuan-1948': source('中央银行券币数位博物馆：金圆券', 'https://museum.cbc.gov.tw/web/en-us/history/introduce/mainland/gold'),
    'land-change-1949': source('中国国家博物馆：中央人民政府公布土地改革法', 'https://www.chnmuseum.cn/zp/zpml/gshww/202109/t20210927_251551_wap.shtml'),
  };
  (C.events || []).forEach(function (event) {
    if (majorExistingIds.indexOf(event.id) < 0) return;
    event.eraBrief = true;
    event.historySource = existingHistorySources[event.id];
  });

  var allPostPaths = ['mainland', 'hong-kong', 'taiwan', 'overseas', 'in-motion', 'unsettled'];
  C.events.push(
    {
      id: 'korean-war-1950', year: 1950, eraBrief: true, eraScope: '东亚与世界', post1949Choices: allPostPaths,
      title: '朝鲜战争爆发', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { money: -1, mind: 1 },
      knownText: '你得知 6 月朝鲜战争爆发。东亚的船期、物资流动、边境检查和转口贸易很快趋紧；具体怎样落到眼前生活，仍要看你所在的地方。',
      unknownText: '船期、货源和通行检查忽然变紧，工作与物价先发生变化；你当时还不知道这些波动与半岛战事有关。',
      fact: '1950 年朝鲜战争爆发，东亚交通、贸易与物资流动进入新的紧张期。',
      historySource: source('联合国档案：朝鲜重建署历史', 'https://archives.un.org/en/content/united-nations-korean-reconstruction-agency-unkra'),
    },
    {
      id: 'hongkong-population-1950', year: 1950, eraBrief: true, eraScope: '香港', post1949Choices: ['hong-kong'],
      title: '人口涌入与住屋紧张', knownThrough: ['newspaper', 'conversation', 'books'],
      delta: { money: -2, position: -1, network: 1 },
      knownText: '你知道 1949 年至 1950 年春大量人口进入香港，到 1950 年中人口估计已约 220 万。床位、棚屋、房租和找工机会因此同时吃紧。',
      unknownText: '街坊里不断有人寻找床位和工作，租金、通铺与短工排队都比抵达前听说的更紧；你只先看见人口增加带来的生活压力。',
      fact: '1950 年身处战后人口迅速增加、住屋与就业压力上升的香港。',
      historySource: source('香港年报：战后历史', 'https://www.yearbook.gov.hk/2020/en/pdf/E22.pdf'),
    },
    {
      id: 'mainland-land-law-1950', year: 1950, eraBrief: true, eraScope: '中国大陆乡村', post1949Choices: ['mainland'], routes: ['subei-stay'],
      title: '土地改革法与地方实施', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { position: 2, mind: 1 }, subjectEffects: { ledger: { status: 'land-reform-local-process', strength: 2 } },
      knownText: '你知道《中华人民共和国土地改革法》已经公布，但丈量、登记、分配和旧账处理仍要看当地的实际进程，不能把全国政策写成同一天落到每个村。',
      unknownText: '村里的田界、租账与会议次序开始改变，你先被要求重新说明土地和家口情况，还不能说清整套制度如何推进。',
      fact: '1950 年所在地开始在新的土地制度下重新处理田界、租账与家庭生产关系。',
      historySource: source('中国国家博物馆：中央人民政府公布土地改革法', 'https://www.chnmuseum.cn/zp/zpml/gshww/202109/t20210927_251551_wap.shtml'),
    },
    {
      id: 'taiwan-martial-law-1950', year: 1950, eraBrief: true, eraScope: '台湾', post1949Choices: ['taiwan'],
      title: '戒严体制进入日常', knownThrough: ['newspaper', 'books', 'conversation'],
      delta: { position: -1, mind: 2 },
      knownText: '你知道台湾自 1949 年起处于戒严，户口、通信、出版、集会与行动受到严格管控。办住处和工作手续时，哪些话能公开说也成为现实问题。',
      unknownText: '住处登记、通信和公开谈话都多了检查与限制，你先学会谨慎保存证件，却未必知道这些规定属于怎样的长期体制。',
      fact: '1950 年在台湾戒严体制下安排住处、工作与通信。',
      historySource: source('台湾历史博物馆：戒严令与它的时代', 'https://the.nmth.gov.tw/nmth/zh-TW/Location/c0cfcbed-98b7-48aa-96e2-854e1faa7083'),
    },
    {
      id: 'hongkong-embargo-1951', year: 1951, eraBrief: true, eraScope: '香港', post1949Choices: ['hong-kong'],
      title: '禁运改变转口与工厂', knownThrough: ['newspaper', 'books', 'conversation'],
      delta: { money: -2, craft: 2, position: -1 },
      knownText: '你从报刊或商号得知，朝鲜战争引发的联合国对华禁运正在压缩香港原有转口贸易；纺织等制造业开始吸收更多工作人口。',
      unknownText: '码头与商号的一部分旧货路突然收紧，附近却有纺织和加工工场继续招人；你先看到工作从港口转向工厂。',
      fact: '1951 年香港贸易受禁运冲击，制造业在转口受阻后加快发展。',
      historySource: source('香港年报：战后历史', 'https://www.yearbook.gov.hk/2020/en/pdf/E22.pdf'),
    },
    {
      id: 'refugee-convention-1951', year: 1951, eraBrief: true, eraScope: '国际', post1949Choices: ['overseas', 'in-motion', 'unsettled'],
      title: '《难民地位公约》通过', knownThrough: ['newspaper', 'books'],
      delta: { knowledge: 2, mind: 1 },
      knownText: '你知道国际社会通过《难民地位公约》，开始形成共同定义与最低保护标准；但 1951 年文本原有时间与地域限制，你不能据此假定自己自动取得身份或居留权。',
      unknownText: '报馆和办证机构开始使用新的国际名词讨论流离者，但你的证件、住处和工作资格仍取决于所在国家与个案。',
      fact: '1951 年国际难民保护制度形成新的法律基线，但个人是否适用仍未能一概而论。',
      historySource: source('联合国难民署：1951 年难民公约', 'https://www.unhcr.org/about-unhcr/overview/1951-refugee-convention'),
    },
    {
      id: 'mainland-first-five-year-plan-1953', year: 1953, eraBrief: true, eraScope: '中国大陆', post1949Choices: ['mainland'],
      title: '第一个五年计划开始', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { craft: 2, position: 1, money: 1 },
      knownText: '你知道第一个五年计划从 1953 年开始，工业建设、单位安排以及农业和手工业组织方式都将改变工作与生产。不同地方、职业受到的影响并不相同。',
      unknownText: '单位名称、生产安排和招工方向开始改变，熟悉的手艺被要求接入新的组织方式；你先看见工作变化，还说不全全国计划。',
      fact: '1953 年第一个五年计划开始，所在地的工作与生产组织逐步改变。',
      historySource: source('国家发展改革委：第一个五年计划', 'https://www.ndrc.gov.cn/fggz/fzzlgh/gjfzgh/202112/P020211214370085847910.pdf'),
    },
    {
      id: 'hongkong-shek-kip-mei-fire-1953', year: 1953, eraBrief: true, eraScope: '香港', post1949Choices: ['hong-kong'],
      title: '石硖尾大火与徙置房', knownThrough: ['newspaper', 'conversation', 'storytelling'],
      delta: { position: -2, relation: 1, mind: 2 }, subjectEffects: { support: { strength: 2 } },
      knownText: '你得知圣诞夜石硖尾寮屋区大火令五万多人无家可归。紧急安置随后推动多层徙置房建设，香港公共房屋由此进入新的阶段。',
      unknownText: '大火后的灾民、救济物资和临时住处涌入街坊，徙置安排开始改变居住秩序；你先接触到安置压力，后来才知道火灾规模。',
      fact: '1953 年香港石硖尾大火推动紧急安置和公共房屋建设。',
      historySource: source('香港房屋委员会：石硖尾屋邨历史', 'https://www.housingauthority.gov.hk/hdw/en/aboutus/events/community/heritage/about_history.html'),
    },
    {
      id: 'taiwan-land-to-tiller-1953', year: 1953, eraBrief: true, eraScope: '台湾', post1949Choices: ['taiwan'],
      title: '耕者有其田实施', knownThrough: ['newspaper', 'books', 'conversation'],
      delta: { position: 1, mind: 1 },
      knownText: '你知道台湾的农地改革由三七五减租、公地放领推进到耕者有其田。即使住在城镇，地租、亲族财产和乡间来信也可能因此改变。',
      unknownText: '乡间亲友来信开始谈新的地租和土地手续，城里的资产与工作关系也出现间接变化；你还没有完整政策说明。',
      fact: '1953 年台湾实施耕者有其田，农地与租佃关系继续调整。',
      historySource: source('国家档案管理局：耕者有其田政策', 'https://art.archives.gov.tw/tw/art/1399.html'),
    },
    {
      id: 'mainland-great-leap-1958', year: 1958, eraBrief: true, eraScope: '中国大陆', post1949Choices: ['mainland'],
      title: '大跃进与人民公社化', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { money: -2, health: -1, position: -1 }, subjectEffects: { ledger: { strength: -2 } },
      knownText: '你知道“大跃进”和人民公社化正在重组生产、劳动与供给。高指标和快速转换使原有家计、工时与粮食安排承受越来越大压力。',
      unknownText: '劳动、报表和供给办法在很短时间里反复改变，家里能自行安排的粮与时间减少；你先承受加码的任务，还难以判断全局后果。',
      fact: '1958 年生产与生活因大跃进和人民公社化发生剧烈调整。',
      historySource: source('国家统计局：产业结构调整历史', 'https://www.stats.gov.cn/zt_18555/ztfx/xzg50nxlfxbg/202303/t20230301_1920440.html'),
    },
    {
      id: 'mainland-hardship-1960', year: 1960, eraBrief: true, eraScope: '中国大陆', post1949Choices: ['mainland'],
      title: '生产失衡与生活困难', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { money: -4, health: -4, mind: 2 }, subjectEffects: { household: { strength: -2 }, ledger: { strength: -2 } },
      knownText: '你已经看见重工业急进、农业下降与供给紧张造成严重生活困难。公开说法、地方报表和家中实际口粮之间并不总能对上。',
      unknownText: '口粮、药物和日用品明显不足，劳动要求却没有同步减轻；你先从身体和家计知道局面严重，仍难取得完整数字。',
      fact: '1960 年所在地受到生产失衡与物资短缺造成的生活困难。',
      historySource: source('国家统计局：产业结构调整历史', 'https://www.stats.gov.cn/zt_18555/ztfx/xzg50nxlfxbg/202303/t20230301_1920440.html'),
    },
    {
      id: 'mainland-cultural-revolution-1966', year: 1966, eraBrief: true, eraScope: '中国大陆', post1949Choices: ['mainland'],
      title: '文化大革命开始', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { position: -4, network: -3, mind: 2 }, subjectEffects: { ledger: { strength: -2 }, support: { strength: -2 } },
      knownText: '你知道文化大革命开始，学校、单位、基层组织和人际关系迅速卷入政治运动。过去的工作经历、书信和关系可能被重新审查。',
      unknownText: '学校与单位秩序突然改变，人们开始谨慎处理旧信、履历和公开来往；你先感到关系与工作不再按原规则运转。',
      fact: '1966 年文化大革命开始，工作、教育与社会关系受到严重冲击。',
      historySource: source('中国人大网：国家政权建设历史', 'https://www.npc.gov.cn/npc/c2/c30834/201909/t20190917_300767.html'),
    },
    {
      id: 'hongkong-disturbances-1967', year: 1967, eraBrief: true, eraScope: '香港', post1949Choices: ['hong-kong'],
      title: '六七暴动与社会停摆', knownThrough: ['newspaper', 'conversation', 'storytelling'],
      delta: { money: -2, position: -2, health: -1, mind: 2 },
      knownText: '你知道 1967 年一连串骚乱影响交通、工厂、街道和日常安全，经济一度近乎停摆。出门、上工和接送家人都需要重新判断。',
      unknownText: '罢工、封路和街面冲突让交通与开工忽停忽续，你先按当天消息改变路线，还不能确认整场动荡会持续多久。',
      fact: '1967 年香港社会动荡影响交通、工作与日常安全。',
      historySource: source('香港年报：战后历史', 'https://www.yearbook.gov.hk/2020/en/pdf/E22.pdf'),
    },
    {
      id: 'refugee-protocol-1967', year: 1967, eraBrief: true, eraScope: '国际', post1949Choices: ['overseas', 'in-motion', 'unsettled'],
      title: '难民议定书扩大适用范围', knownThrough: ['newspaper', 'books'],
      delta: { knowledge: 2, position: 1 },
      knownText: '你知道 1967 年议定书取消了 1951 年公约原有的时间与地域限制，使国际保护框架具有普遍适用可能；个人资格仍取决于所在国家是否加入及具体审查。',
      unknownText: '办证机构开始引用新的国际规则，但不同国家执行并不相同；你的居留与工作仍需逐项核实。',
      fact: '1967 年难民议定书扩大国际保护框架的适用范围。',
      historySource: source('联合国难民署：1951 年公约与 1967 年议定书', 'https://www.unhcr.org/about-unhcr/overview/1951-refugee-convention'),
    },
    {
      id: 'taiwan-un-seat-1971', year: 1971, eraBrief: true, eraScope: '台湾与国际', post1949Choices: ['taiwan'],
      title: '联合国中国代表权改变', knownThrough: ['newspaper', 'books', 'conversation'],
      delta: { position: -2, mind: 2 },
      knownText: '你知道联合国大会通过第 2758 号决议，中华人民共和国取得中国在联合国的代表权。台湾的国际处境、单位对外联系与来往文件随之变化。',
      unknownText: '单位对外通信、证件称谓和国际消息突然出现变化，你先从手续与报纸版面感到国际处境改变。',
      fact: '1971 年联合国中国代表权改变，台湾的国际处境随之调整。',
      historySource: source('联合国数字图书馆：第 2758 号决议', 'https://digitallibrary.un.org/record/192054'),
    },
    {
      id: 'hongkong-housing-programme-1972', year: 1972, eraBrief: true, eraScope: '香港', post1949Choices: ['hong-kong'],
      title: '十年建屋计划与新市镇', knownThrough: ['newspaper', 'conversation', 'books'],
      delta: { position: 3, network: 1, money: -1 }, subjectEffects: { support: { strength: 2 } },
      knownText: '你知道香港开始十年建屋计划，并推动新界新市镇发展。轮候、搬迁、通勤和家庭是否同住，成为许多人的新选择。',
      unknownText: '街坊开始讨论轮候公屋、搬到更远的新住处和每天通勤；你先看见住屋选择增加，也看见搬迁带来的关系成本。',
      fact: '1972 年香港启动十年建屋计划和新市镇发展。',
      historySource: source('香港房屋委员会：公共房屋五十年', 'https://www.housingauthority.gov.hk/en/aboutus/events/50yrsexhibition/highlights.html'),
    },
    {
      id: 'mainland-reform-1978', year: 1978, eraBrief: true, eraScope: '中国大陆', post1949Choices: ['mainland'],
      title: '改革开放转折', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { craft: 2, money: 2, network: 2, mind: 1 },
      knownText: '你知道十一届三中全会决定把工作重点转向现代化建设，并着手改革过度集中的经济管理体制。农村生产、轻工业和个人谋生空间随后逐步变化。',
      unknownText: '集市、单位和乡间生产办法开始出现新的余地，旧规矩没有一夜消失；你先从工作与收入选择增加感到方向转变。',
      fact: '1978 年改革开放转折开始改变生产、单位与个人谋生条件。',
      historySource: source('国家发展改革委：十一届三中全会', 'https://www.ndrc.gov.cn/fggz/fgjh/djzc/202104/t20210429_1278631.html'),
    },
    {
      id: 'hongkong-joint-declaration-1984', year: 1984, eraBrief: true, eraScope: '香港', post1949Choices: ['hong-kong'],
      title: '中英联合声明签署', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { mind: 3, position: -1 },
      knownText: '你知道中英两国在 12 月签署关于香港问题的联合声明，确认中国将于 1997 年 7 月 1 日恢复对香港行使主权。住屋、工作与家人去留再次被放进长期计划。',
      unknownText: '街坊、单位和家人突然频繁谈论“九七”，房产、工作和移居打算都被重新衡量；你先感到未来时间表变得具体。',
      fact: '1984 年中英联合声明签署，香港进入通往 1997 年的过渡期。',
      historySource: source('香港政制及内地事务局：联合声明', 'https://www.cmab.gov.hk/sc/issues/jd2.htm'),
    },
    {
      id: 'taiwan-martial-law-lifted-1987', year: 1987, eraBrief: true, eraScope: '台湾', post1949Choices: ['taiwan'],
      title: '解除戒严', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { position: 3, network: 2, mind: 2 },
      knownText: '你知道台湾在 7 月解除持续 38 年的戒严。集会、出版、结社和公共表达逐步打开，但长期形成的限制与个人经历不会当日消失。',
      unknownText: '报纸、社团和公共谈话的边界开始松动，过去不便说的经历有人重新提起；你先从日常空间变宽感到制度改变。',
      fact: '1987 年台湾解除戒严，社会进入新的政治开放阶段。',
      historySource: source('台湾历史博物馆：戒严令与它的时代', 'https://the.nmth.gov.tw/nmth/zh-TW/Location/c0cfcbed-98b7-48aa-96e2-854e1faa7083'),
    },
    {
      id: 'taiwan-direct-election-1996', year: 1996, eraBrief: true, eraScope: '台湾', post1949Choices: ['taiwan'],
      title: '第一次总统直接选举', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { mind: 2, position: 2 },
      knownText: '你知道台湾举行第一次总统直接选举。对已经历戒严、解严与长期迁居的人来说，公开投票成为可亲身见到的新制度经验。',
      unknownText: '投票与竞选进入街坊日常，许多人第一次公开讨论怎样选择最高领导人；你先从周围人的参与感到制度已不同。',
      fact: '1996 年台湾举行第一次总统直接选举。',
      historySource: source('总统府：总统直选历史', 'https://www.president.gov.tw/News/40029'),
    },
    {
      id: 'hongkong-handover-1997', year: 1997, eraBrief: true, eraScope: '香港', post1949Choices: ['hong-kong'],
      title: '香港主权移交', knownThrough: ['newspaper', 'books', 'conversation', 'storytelling'],
      delta: { mind: 2, position: 1 },
      knownText: '你知道 7 月 1 日香港特别行政区成立，《基本法》生效。长期谈论的“九七”成为现实，身份文件、机构名称和公共生活进入新阶段。',
      unknownText: '街道旗帜、机构名称和证件手续在这一年改变，多年来的时间表终于落到日常；你从具体文件先感到时代翻页。',
      fact: '1997 年香港特别行政区成立，香港进入新的制度阶段。',
      historySource: source('香港基本法：背景资料', 'https://www.basiclaw.gov.hk/sc/basiclaw/facts.html'),
    },
    {
      id: 'asian-financial-crisis-1997', year: 1997, eraBrief: true, eraScope: '亚洲经济', post1949Choices: ['hong-kong', 'taiwan', 'overseas'],
      title: '亚洲金融危机', knownThrough: ['newspaper', 'books', 'conversation'],
      delta: { money: -4, position: -1, mind: 1 }, subjectEffects: { ledger: { strength: -2 } },
      knownText: '你知道亚洲金融危机从 7 月迅速扩散。汇率、工作、积蓄和跨地汇款承受冲击；若你身处亚洲以外，实际影响仍取决于所在国家与收入来源。',
      unknownText: '汇款数额、工作订单和积蓄购买力忽然波动，你先从账面和亲友来信感到冲击，还不能判断危机会扩散多远。',
      fact: '1997 年亚洲金融危机影响工作、积蓄与跨地汇款。',
      historySource: source('国际货币基金组织：亚洲金融危机时间线', 'https://www.imf.org/external/about/timeline/index.htm'),
    }
  );

  var postFrames = {
    'post-mainland': [
      { open: '清早，住处附近的通知、单位安排与家中旧账被放到一起，你需要先分清哪些是本地已经执行的变化。', close: '你按眼前实际条件接住了一项生活安排，也把政策名称、地方执行和亲友传闻分开记录；时代变化并没有替每个人给出相同结果。' },
      { open: '这一年的工作证明、粮食或收入安排又有变化，家人和旧识从各自所在地方带回的说法并不完全一致。', close: '你先核对自己能确认的住处与生计，再保留仍需追问的消息；制度进入生活，但不会把具体人的经历压成一句口号。' },
    ],
    'post-hong-kong': [
      { open: '香港街坊一早已经为床位、房租和当天开不开工忙起来，码头与商号传来的消息又改变了找工次序。', close: '你把本月房租、工钱和能够寄出的信重新排好，也记下仍需核实的工作消息；城市继续变化，日常先由一张床和一份收入接住。' },
      { open: '电车、渡轮与街边报摊把外面的变化带进合租住处，同住者则各自计算工时、医药和要寄给别处亲人的钱。', close: '你们只共同处理明确同意的房租与照料，没有把彼此的家人合成一个家庭；新的城市机会和拥挤代价一起进入下一年。' },
    ],
    'post-taiwan': [
      { open: '住处登记、工作通知和一封久候的来信在同一天抵达，同行者仍要分别处理自己的证件与家口。', close: '你完成了自己能负责的手续和工作，并把确定消息与传闻分开；新的制度环境改变日常，却没有让失联的人自动出现。' },
      { open: '城镇里的报纸、单位和街坊对同一件变化有不同说法，你先从工资、交通和通信中确认它怎样影响眼前生活。', close: '这次安排只解决了近期住处或工作，旧关系仍依靠缓慢消息维持；你没有用“已经安顿”遮住具体的不确定。' },
    ],
    'post-overseas': [
      { open: '所在城市的公告、工作语言和故乡来信需要被放在三列里理解，同一个国际事件在不同国家也可能落成不同规定。', close: '你只按已经核实的当地条件安排工作与住处，并保留原文和译文；适应新地方不等于已经弄清所有制度。' },
      { open: '工资单、居留文件和一封经过转寄的信一起到手，同行者各自面对不同的工作资格与亲属责任。', close: '你完成了自己的续期或谋生安排，也明确哪些帮助只来自具体联系人；海外不是一个统一地点，未知部分继续留在记录中。' },
    ],
    'post-in-motion': [
      { open: '车站或码头的告示刚刚换过，短工地点、通行检查和同行者愿不愿再走必须重新核对。', close: '你只走向能够确认的下一处，并留下最后地址与转寄人；这一段移动得到说明，长期落点仍没有被提前写好。' },
      { open: '临时屋檐下的人带来几种相互冲突的路线消息，证件、盘缠和身体只能支持其中一段。', close: '你先验证交通和工作条件，再决定是否动身；没有继续同行的人保留自己的去向，关系只记到最后确知之处。' },
    ],
    'post-unsettled': [
      { open: '暂住处的期限、零工和家人线索又在同一周到期，所在地的制度变化也只能从有限公告和口信中拼出。', close: '你续下近期生活并保存能够核实的证件与地址；尚未决定长期去向是一项事实，不是等待作者替你补写的空白。' },
      { open: '一封退信和一条新工作消息同时出现，同住者对留下或离开也各有自己的现实理由。', close: '你只为自己的住处和工作作答，并把其他人的选择分别留下；时代继续前进，落点未定的人也仍在过具体日子。' },
    ],
  };
  C.sceneFrames = C.sceneFrames || {};
  Object.keys(postFrames).forEach(function (key) { C.sceneFrames[key] = postFrames[key]; });
})(typeof window !== 'undefined' ? window : globalThis);
