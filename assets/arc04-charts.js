// ARC·04 读书人 · 图表脚本
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#a5342c';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#356b64';
  var ink = style.getPropertyValue('--ink').trim() || '#3a2e23';
  var muted = style.getPropertyValue('--muted').trim() || '#7c6a52';
  var rule = style.getPropertyValue('--rule').trim() || '#cbb488';

  var el = document.getElementById('chart-purchasing');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  // 以战前(1936)月薪实际购买力=100 为基线的示意曲线。
  // 数据依据法币恶性通胀走势（HI 级）：1937 战前物价基准 → 1945 抗战胜利已数百倍 →
  // 1948.8 法币近乎废纸(约 604 万亿发行) → 1948.8 金圆券 → 1949 金圆券再度崩溃。
  var points = [
    ['1936\n战前', 100],
    ['1937\n开战', 92],
    ['1940', 55],
    ['1943', 18],
    ['1945\n胜利', 6],
    ['1946', 2.2],
    ['1947', 0.5],
    ['1948.8\n金圆券', 0.08],
    ['1949.4\n再崩', 0.002]
  ];

  chart.setOption({
    textStyle: { fontFamily: "'Lora','Songti SC','STSong',serif", color: ink },
    grid: { left: 58, right: 28, top: 46, bottom: 60 },
    title: {
      text: '战前=100，纵轴为对数刻度',
      textStyle: { fontSize: 12, color: muted, fontWeight: 'normal' },
      left: 'center', top: 6
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (p) {
        var d = p[0];
        return d.name.replace('\n', ' ') + '<br/>实际购买力 ≈ ' + d.value + ' (战前=100)';
      }
    },
    xAxis: {
      type: 'category',
      data: points.map(function (d) { return d[0]; }),
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11, interval: 0, lineHeight: 14 }
    },
    yAxis: {
      type: 'log',
      min: 0.001,
      max: 100,
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule, opacity: 0.35 } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    series: [{
      name: '实际购买力',
      type: 'line',
      data: points.map(function (d) { return d[1]; }),
      smooth: true,
      symbol: 'circle',
      symbolSize: 7,
      lineStyle: { color: accent, width: 3 },
      itemStyle: { color: accent, borderColor: '#fff', borderWidth: 1 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(165,52,44,0.28)' },
            { offset: 1, color: 'rgba(165,52,44,0.02)' }
          ]
        }
      },
      markPoint: {
        symbol: 'pin', symbolSize: 46,
        itemStyle: { color: accent2 },
        label: { color: '#fff', fontSize: 10 },
        data: [
          { name: '金圆券登场', coord: ['1948.8\n金圆券', 0.08], value: '换券' }
        ]
      }
    }]
  });

  window.addEventListener('resize', function () { chart.resize(); });
})();
