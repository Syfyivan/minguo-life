// ARC·05 资本家之子 · 图表脚本
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#a5342c';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#356b64';
  var ink = style.getPropertyValue('--ink').trim() || '#3a2e23';
  var muted = style.getPropertyValue('--muted').trim() || '#7c6a52';
  var rule = style.getPropertyValue('--rule').trim() || '#cbb488';

  var el = document.getElementById('chart-fortune');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  // 顾家资产的"过山车"示意曲线：以一战鼎盛(1918)=100 为基线。
  // 用于表达 ARC·05 与 ARC·04 单调下滑曲线的对照 —— 骤起骤落、大起大落。
  // 走势依据历史骨架(HI)：一战黄金时代鼎盛 → 1922棉纺危机(张謇破产) →
  // 1930年代恢复 → 1937抗战摧毁/内迁损耗 → 1945战后短暂回升 → 1948打老虎清零。
  var years = ['1912\n幼年', '1918\n鼎盛', '1922\n萧条', '1930\n恢复', '1937\n开战', '1938\n内迁', '1945\n胜利', '1948.8\n打老虎', '1949\n去留'];
  var values = [70, 100, 28, 65, 60, 22, 40, 4, 3];

  chart.setOption({
    textStyle: { fontFamily: "'Lora','Songti SC','STSong',serif", color: ink },
    grid: { left: 52, right: 28, top: 46, bottom: 60 },
    title: {
      text: '一战鼎盛(1918)=100 · 大起大落',
      textStyle: { fontSize: 12, color: muted, fontWeight: 'normal' },
      left: 'center', top: 6
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (p) {
        var d = p[0];
        return d.name.replace('\n', ' ') + '<br/>家业规模 ≈ ' + d.value + ' (鼎盛=100)';
      }
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11, interval: 0, lineHeight: 14 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 110,
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule, opacity: 0.35 } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    series: [{
      name: '家业规模',
      type: 'line',
      data: values,
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: { color: accent, width: 3 },
      itemStyle: { color: accent, borderColor: '#fff', borderWidth: 1 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(165,52,44,0.26)' },
            { offset: 1, color: 'rgba(165,52,44,0.02)' }
          ]
        }
      },
      markPoint: {
        symbol: 'pin', symbolSize: 48,
        itemStyle: { color: accent2 },
        label: { color: '#fff', fontSize: 9, lineHeight: 11, formatter: '{b}' },
        data: [
          { name: '鼎盛', value: '鼎盛', coord: ['1918\n鼎盛', 100] },
          { name: '清零', value: '清零', coord: ['1948.8\n打老虎', 4] }
        ]
      }
    }]
  });

  window.addEventListener('resize', function () { chart.resize(); });
})();
