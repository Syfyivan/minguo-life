// assets/charts.js — 民国人生设计文档图表
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart: 时间线 ---
  var tlEl = document.getElementById('chart-timeline');
  if (tlEl) {
    var events = [
      { y: 1911, t: '辛亥革命' },
      { y: 1919, t: '五四运动' },
      { y: 1925, t: '五卅运动' },
      { y: 1927, t: '四·一二清党' },
      { y: 1931, t: '九一八·东北沦陷' },
      { y: 1937, t: '全面抗战·南京' },
      { y: 1941, t: '日军占租界' },
      { y: 1945, t: '抗战胜利' },
      { y: 1948, t: '金圆券崩溃' },
      { y: 1949, t: '政权更替' }
    ];
    var tl = echarts.init(tlEl, null, { renderer: 'svg' });
    tl.setOption({
      animation: false,
      tooltip: { trigger: 'axis', appendToBody: true,
        formatter: function (p) { return p[0].data[0] + ' 年<br/>' + events[p[0].dataIndex].t; } },
      grid: { left: 40, right: 30, top: 40, bottom: 90 },
      xAxis: {
        type: 'value', min: 1908, max: 1952, interval: 4,
        axisLabel: { color: muted, fontFamily: 'monospace' },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule, opacity: 0.4 } }
      },
      yAxis: { type: 'value', min: 0, max: 2, show: false },
      series: [{
        type: 'scatter', symbolSize: 16,
        data: events.map(function (e, i) { return [e.y, 1]; }),
        itemStyle: { color: accent, borderColor: '#fff', borderWidth: 2 },
        label: {
          show: true, formatter: function (p) { return events[p.dataIndex].t; },
          position: function (p) { return p.dataIndex % 2 === 0 ? 'top' : 'bottom'; },
          color: ink, fontSize: 11, rotate: 0, align: 'center',
          distance: 12
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: accent2, width: 2, type: 'solid' },
          data: [{ yAxis: 1 }],
          label: { show: false }
        }
      }]
    });
    window.addEventListener('resize', function () { tl.resize(); });
  }

  // --- Chart: 通胀（对数轴）---
  var infEl = document.getElementById('chart-inflation');
  if (infEl) {
    var inf = echarts.init(infEl, null, { renderer: 'svg' });
    inf.setOption({
      animation: false,
      tooltip: { trigger: 'axis', appendToBody: true },
      grid: { left: 70, right: 30, top: 30, bottom: 50 },
      xAxis: {
        type: 'category',
        data: ['1937\n抗战前', '1945\n胜利', '1948.8\n金圆券前'],
        axisLabel: { color: muted, fontFamily: 'monospace', lineHeight: 16 },
        axisLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'log', name: '法币发行量(元,对数)',
        nameTextStyle: { color: muted },
        axisLabel: { color: muted, fontFamily: 'monospace' },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule, opacity: 0.4 } }
      },
      series: [{
        type: 'bar',
        // 14亿=1.4e9, 5569亿=5.569e11, 604万亿=6.04e14
        data: [1.4e9, 5.569e11, 6.04e14],
        itemStyle: { color: accent },
        barWidth: '46%',
        label: {
          show: true, position: 'top', color: ink, fontFamily: 'monospace', fontSize: 12,
          formatter: function (p) {
            var v = p.value;
            if (v >= 1e14) return '≈604万亿';
            if (v >= 1e11) return '≈5569亿';
            return '≈14亿';
          }
        }
      }]
    });
    window.addEventListener('resize', function () { inf.resize(); });
  }
})();
