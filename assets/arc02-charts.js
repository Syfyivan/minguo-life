// ARC·02 士绅之女 · 图表脚本
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#a5342c';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#356b64';
  var ink = style.getPropertyValue('--ink').trim() || '#3a2e23';
  var muted = style.getPropertyValue('--muted').trim() || '#7c6a52';
  var rule = style.getPropertyValue('--rule').trim() || '#cbb488';

  var el = document.getElementById('chart-autonomy');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  // 沈毓秀一生的"阶梯式挣脱"曲线：满分=100。
  // 与其他四条线(沉降/震荡/反弹/贴底跃升)对照 —— 台阶状,每一次关键选择是一级可上可下的台阶。
  // 走势依据历史骨架(HI/MID):放足→进女学→抗婚(自主权跃升但经济独立仍为0)→
  // 出走(自主权高、经济独立成为硬门槛)→靠学识自立(经济独立补齐)→抗战中兑现为社会价值。
  var years = ['1906\n出生', '1912\n放足', '1918\n进女学', '1924\n抗婚', '1926\n出走', '1930\n自立', '1937\n抗战', '1949\n结算'];
  var autonomy = [5, 20, 38, 60, 68, 78, 88, 92];   // 自主权:阶梯上升
  var economy = [0, 0, 8, 10, 12, 62, 80, 85];       // 经济独立:出走前贴底,自立后补齐

  chart.setOption({
    textStyle: { fontFamily: "'Lora','Songti SC','STSong',serif", color: ink },
    grid: { left: 52, right: 28, top: 58, bottom: 60 },
    title: {
      text: '满分=100 · 阶梯挣脱(每一级台阶=一次关键选择)',
      textStyle: { fontSize: 12, color: muted, fontWeight: 'normal' },
      left: 'center', top: 6
    },
    legend: {
      data: ['自主权', '经济独立'],
      top: 28, textStyle: { color: ink, fontSize: 12 }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (p) {
        var s = p[0].name.replace('\n', ' ');
        p.forEach(function (d) { s += '<br/>' + d.marker + d.seriesName + ' ≈ ' + d.value; });
        return s;
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
      max: 100,
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule, opacity: 0.35 } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    series: [
      {
        name: '自主权',
        type: 'line',
        data: autonomy,
        step: 'middle',
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: accent, width: 3 },
        itemStyle: { color: accent, borderColor: '#fff', borderWidth: 1 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(165,52,44,0.22)' },
              { offset: 1, color: 'rgba(165,52,44,0.02)' }
            ]
          }
        },
        markPoint: {
          symbol: 'pin', symbolSize: 46,
          itemStyle: { color: accent2 },
          label: { color: '#fff', fontSize: 9, lineHeight: 11, formatter: '{b}' },
          data: [
            { name: '抗婚', value: '抗婚', coord: ['1924\n抗婚', 60] },
            { name: '自立', value: '自立', coord: ['1930\n自立', 78] }
          ]
        }
      },
      {
        name: '经济独立',
        type: 'line',
        data: economy,
        step: 'middle',
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: accent2, width: 2.5, type: 'dashed' },
        itemStyle: { color: accent2, borderColor: '#fff', borderWidth: 1 }
      }
    ]
  });

  window.addEventListener('resize', function () { chart.resize(); });
})();
