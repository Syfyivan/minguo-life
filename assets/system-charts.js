// 民国人生 · 模拟系统层 · 图表脚本
// 四张图：六维属性雷达 / 单日行动点数分配 / XP 边际递减 / 逐年成长被历史打断
(function () {
  if (typeof echarts === 'undefined') return;
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#a5342c';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#356b64';
  var ink = style.getPropertyValue('--ink').trim() || '#3a2e23';
  var muted = style.getPropertyValue('--muted').trim() || '#7c6a52';
  var rule = style.getPropertyValue('--rule').trim() || '#cbb488';
  var gold = '#c98a1a';
  var serifFont = "'Lora','Songti SC','STSong',serif";
  var charts = [];

  function make(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    var c = echarts.init(el, null, { renderer: 'svg' });
    charts.push(c);
    return c;
  }

  // ---------- 图1：六维属性雷达（同一天，三种出身的起点差异） ----------
  (function () {
    var c = make('sys-radar');
    if (!c) return;
    var indicator = [
      { name: '体魄', max: 100 }, { name: '学识', max: 100 },
      { name: '手艺', max: 100 }, { name: '心智', max: 100 },
      { name: '人脉', max: 100 }, { name: '声望', max: 100 }
    ];
    c.setOption({
      textStyle: { fontFamily: serifFont, color: ink },
      title: {
        text: '同一天·同为 20 岁，三种出身的属性起点',
        subtext: '满分=100 · 差异来自出身与前 20 年的日常累积，而非天赋',
        left: 'center', top: 4,
        textStyle: { fontSize: 13, color: ink, fontWeight: 700 },
        subtextStyle: { fontSize: 11, color: muted }
      },
      legend: {
        data: ['佃农之子·李根生', '士绅之女·沈毓秀', '资本家之子·顾承业'],
        bottom: 2, textStyle: { color: ink, fontSize: 11 }, itemGap: 14
      },
      tooltip: {},
      radar: {
        center: ['50%', '54%'], radius: '58%',
        indicator: indicator,
        axisName: { color: ink, fontSize: 12 },
        splitLine: { lineStyle: { color: rule, opacity: 0.6 } },
        splitArea: { areaStyle: { color: ['rgba(203,180,136,0.04)', 'rgba(203,180,136,0.10)'] } },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar', symbolSize: 5,
        data: [
          { value: [82, 15, 70, 40, 20, 10], name: '佃农之子·李根生',
            lineStyle: { color: accent, width: 2 }, itemStyle: { color: accent },
            areaStyle: { color: 'rgba(165,52,44,0.14)' } },
          { value: [45, 78, 30, 72, 55, 60], name: '士绅之女·沈毓秀',
            lineStyle: { color: accent2, width: 2 }, itemStyle: { color: accent2 },
            areaStyle: { color: 'rgba(53,107,100,0.14)' } },
          { value: [55, 68, 22, 58, 88, 80], name: '资本家之子·顾承业',
            lineStyle: { color: gold, width: 2 }, itemStyle: { color: gold },
            areaStyle: { color: 'rgba(201,138,26,0.12)' } }
        ]
      }]
    });
  })();

  // ---------- 图2：单日行动点数分配（一天四时段，你怎么花 → 涨什么点） ----------
  (function () {
    var c = make('sys-day');
    if (!c) return;
    // 一个佃农之子"典型的一天"：晨/午/晚/夜四时段各选一个行动，产出不同点数
    var slots = ['晨\n卯—辰', '午\n巳—未', '晚\n申—酉', '夜\n戌—亥'];
    // 每个时段选定的行动，及其在六维上的产出（示意值）
    var acts = ['下田佃作', '给东家打短工', '夜校识字', '照料病母'];
    var body = [8, 5, 0, 2];      // 体魄
    var craft = [4, 6, 0, 0];     // 手艺
    var know = [0, 0, 9, 0];      // 学识
    var mind = [1, 2, 4, 5];      // 心智
    var relation = [0, 3, 2, 1];  // 人脉
    c.setOption({
      textStyle: { fontFamily: serifFont, color: ink },
      title: {
        text: '「典型的一天」：四个时段各选一个行动，涨不同的点',
        subtext: '示例 · 佃农之子·李根生 · 每格上方标注该时段所选行动',
        left: 'center', top: 4,
        textStyle: { fontSize: 13, color: ink, fontWeight: 700 },
        subtextStyle: { fontSize: 11, color: muted }
      },
      legend: { data: ['体魄', '手艺', '学识', '心智', '人脉'], top: 46, textStyle: { color: ink, fontSize: 11 } },
      grid: { left: 46, right: 24, top: 84, bottom: 70 },
      tooltip: {
        trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: function (p) {
          var i = p[0].dataIndex;
          var s = p[0].name.replace('\n', ' ') + '　→　<b>' + acts[i] + '</b>';
          p.forEach(function (d) { if (d.value > 0) s += '<br/>' + d.marker + d.seriesName + ' +' + d.value; });
          return s;
        }
      },
      xAxis: {
        type: 'category', data: slots,
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 11, lineHeight: 14, interval: 0 }
      },
      yAxis: {
        type: 'value', name: '当日获得点数', nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule, opacity: 0.3 } },
        axisLabel: { color: muted, fontSize: 11 }
      },
      series: [
        { name: '体魄', type: 'bar', stack: 'x', data: body, itemStyle: { color: accent } },
        { name: '手艺', type: 'bar', stack: 'x', data: craft, itemStyle: { color: gold } },
        { name: '学识', type: 'bar', stack: 'x', data: know, itemStyle: { color: accent2 } },
        { name: '心智', type: 'bar', stack: 'x', data: mind, itemStyle: { color: '#8a6d3b' } },
        {
          name: '人脉', type: 'bar', stack: 'x', data: relation, itemStyle: { color: '#6a8caf' },
          markLine: {
            silent: true, symbol: 'none',
            lineStyle: { color: accent, type: 'dashed', width: 1.5 },
            label: { color: accent, fontSize: 10, formatter: '每日行动点上限' },
            data: [{ yAxis: 15 }]
          }
        }
      ]
    });
  })();

  // ---------- 图3：XP 边际递减（同一行动重复做，收益越来越低） ----------
  (function () {
    var c = make('sys-xp');
    if (!c) return;
    // gain(n) = base / (1 + k*(n-1))，base=20，k=0.18
    var base = 20, k = 0.18;
    var xs = [], gain = [], cum = [];
    var total = 0;
    for (var n = 1; n <= 20; n++) {
      var g = Math.round(base / (1 + k * (n - 1)) * 10) / 10;
      total = Math.round((total + g) * 10) / 10;
      xs.push('第' + n + '次'); gain.push(g); cum.push(total);
    }
    c.setOption({
      textStyle: { fontFamily: serifFont, color: ink },
      title: {
        text: '同一件事反复做，单次收益递减 —— 逼你去做别的事',
        subtext: '模型 gain(n)=20/(1+0.18·(n-1)) · 柱=单次收益，线=累计',
        left: 'center', top: 4,
        textStyle: { fontSize: 13, color: ink, fontWeight: 700 },
        subtextStyle: { fontSize: 11, color: muted }
      },
      legend: { data: ['单次收益', '累计经验'], top: 46, textStyle: { color: ink, fontSize: 11 } },
      grid: { left: 50, right: 54, top: 82, bottom: 52 },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category', data: xs,
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 10, interval: 1 }
      },
      yAxis: [
        { type: 'value', name: '单次', nameTextStyle: { color: muted, fontSize: 10 },
          axisLine: { lineStyle: { color: rule } }, splitLine: { lineStyle: { color: rule, opacity: 0.3 } },
          axisLabel: { color: muted, fontSize: 10 } },
        { type: 'value', name: '累计', nameTextStyle: { color: muted, fontSize: 10 },
          axisLine: { lineStyle: { color: rule } }, splitLine: { show: false },
          axisLabel: { color: muted, fontSize: 10 } }
      ],
      series: [
        { name: '单次收益', type: 'bar', data: gain, itemStyle: { color: accent2 }, barWidth: '55%' },
        { name: '累计经验', type: 'line', yAxisIndex: 1, data: cum, smooth: true,
          symbol: 'circle', symbolSize: 5, lineStyle: { color: accent, width: 2.5 }, itemStyle: { color: accent } }
      ]
    });
  })();

  // ---------- 图4：逐年成长被历史打断（个人努力 vs 时代冲击） ----------
  (function () {
    var c = make('sys-year');
    if (!c) return;
    var years = ['1928', '1929', '1930', '1931', '1932', '1933', '1934', '1935', '1936', '1937', '1938'];
    // 学识：靠日常稳定累积，逐年上升
    var know = [30, 38, 45, 51, 57, 62, 67, 71, 75, 78, 80];
    // 钱财(家产指数)：受时代冲击，1931九一八、1937抗战全面爆发处断崖
    var wealth = [60, 66, 70, 40, 44, 52, 58, 63, 68, 22, 15];
    c.setOption({
      textStyle: { fontFamily: serifFont, color: ink },
      title: {
        text: '你能稳定累积「学识」，却守不住「钱财」——时代会替你清零',
        subtext: '示意 · 学识靠日常累积单调上升；家产在 1931 九一八、1937 抗战处断崖',
        left: 'center', top: 4,
        textStyle: { fontSize: 13, color: ink, fontWeight: 700 },
        subtextStyle: { fontSize: 11, color: muted }
      },
      legend: { data: ['学识(个人累积)', '钱财(受时代冲击)'], top: 46, textStyle: { color: ink, fontSize: 11 } },
      grid: { left: 46, right: 26, top: 82, bottom: 46 },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category', data: years, boundaryGap: false,
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: {
        type: 'value', min: 0, max: 100,
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule, opacity: 0.3 } },
        axisLabel: { color: muted, fontSize: 11 }
      },
      series: [
        { name: '学识(个人累积)', type: 'line', data: know, smooth: true,
          symbol: 'circle', symbolSize: 6, lineStyle: { color: accent2, width: 3 }, itemStyle: { color: accent2 },
          areaStyle: { color: 'rgba(53,107,100,0.10)' } },
        { name: '钱财(受时代冲击)', type: 'line', data: wealth, smooth: false,
          symbol: 'circle', symbolSize: 6, lineStyle: { color: accent, width: 3 }, itemStyle: { color: accent },
          markPoint: {
            symbol: 'pin', symbolSize: 48, itemStyle: { color: accent },
            label: { color: '#fff', fontSize: 9, lineHeight: 11 },
            data: [
              { name: '九一八', value: '九一八', coord: ['1931', 40] },
              { name: '抗战', value: '抗战', coord: ['1937', 22] }
            ]
          } }
      ]
    });
  })();

  window.addEventListener('resize', function () {
    charts.forEach(function (c) { c.resize(); });
  });
})();
