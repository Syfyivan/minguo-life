// ARC·01 佃农之子 · 图表脚本
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#a5342c';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#356b64';
  var ink = style.getPropertyValue('--ink').trim() || '#3a2e23';
  var muted = style.getPropertyValue('--muted').trim() || '#7c6a52';
  var rule = style.getPropertyValue('--rule').trim() || '#cbb488';

  var el = document.getElementById('chart-land');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  // 李根生一生的"土地 / 温饱"示意曲线：满分=100。
  // 与 ARC·04(下滑) / ARC·05(过山车) / ARC·03(反弹) 对照 ——
  // 佃农线的形状最特殊：前四十年贴地徘徊、被灾荒兵灾砸出深坑，末年绝地跃升。
  // 走势依据事件骨架：出生贴底 → 交租/借债 → 1931灾年逃荒探底 →
  // 抓壮丁再砸坑 → 战乱徘徊 → 1949分田第一次跃升。
  var years = ['1908\n出生', '1921\n交租', '1931\n灾年', '1934\n抓丁', '1940\n战乱', '1946\n观望', '1949\n分田'];
  var land = [10, 8, 2, 3, 6, 12, 78];
  var food = [22, 15, 4, 8, 18, 24, 70];

  chart.setOption({
    textStyle: { fontFamily: "'Lora','Songti SC','STSong',serif", color: ink },
    grid: { left: 52, right: 28, top: 56, bottom: 60 },
    title: {
      text: '满分=100 · 长期贴底 · 末年绝地跃升',
      textStyle: { fontSize: 12, color: muted, fontWeight: 'normal' },
      left: 'center', top: 6
    },
    legend: {
      data: ['土地', '温饱'],
      top: 26, textStyle: { color: muted, fontSize: 12 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11, interval: 0, lineHeight: 14 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule, opacity: 0.35 } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    series: [
      {
        name: '土地',
        type: 'line',
        data: land,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: accent, width: 3 },
        itemStyle: { color: accent, borderColor: '#fff', borderWidth: 1 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(165,52,44,0.24)' },
              { offset: 1, color: 'rgba(165,52,44,0.02)' }
            ]
          }
        },
        markPoint: {
          symbol: 'pin', symbolSize: 48,
          itemStyle: { color: accent2 },
          label: { color: '#fff', fontSize: 9, lineHeight: 11, formatter: '{b}' },
          data: [
            { name: '灾年探底', value: '灾年探底', coord: ['1931\n灾年', 2] },
            { name: '分田翻身', value: '分田翻身', coord: ['1949\n分田', 78] }
          ]
        }
      },
      {
        name: '温饱',
        type: 'line',
        data: food,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: accent2, width: 2.4, type: 'dashed' },
        itemStyle: { color: accent2, borderColor: '#fff', borderWidth: 1 }
      }
    ]
  });

  window.addEventListener('resize', function () { chart.resize(); });
})();
