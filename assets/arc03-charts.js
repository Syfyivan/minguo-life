// ARC·03 纱厂女工 · 图表脚本
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#a5342c';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#356b64';
  var ink = style.getPropertyValue('--ink').trim() || '#3a2e23';
  var muted = style.getPropertyValue('--muted').trim() || '#7c6a52';
  var rule = style.getPropertyValue('--rule').trim() || '#cbb488';

  var el = document.getElementById('chart-freedom');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  // 陈阿宝一生的"人身自由 / 觉悟"示意曲线：满分=100。
  // 与 ARC·04(单调下滑) / ARC·05(过山车) 对照 —— 触底反弹、从0一点点赎回。
  // 走势依据这条线的事件骨架：出生几乎为0 → 10岁被卖清零 →
  // 包身契三年谷底 → 1925五卅觉醒抬头 → 夜校识字/契满自赎爬升 →
  // 婚姻自主 → 抗战漂泊小挫 → 1949成为能支配自己的人。
  var years = ['1910\n出生', '1920\n被卖', '1923\n包身', '1925\n五卅', '1928\n夜校', '1932\n契满', '1937\n抗战', '1949\n自立'];
  var freedom = [8, 2, 5, 22, 40, 62, 55, 82];
  var awake = [3, 3, 6, 45, 60, 70, 74, 88];

  chart.setOption({
    textStyle: { fontFamily: "'Lora','Songti SC','STSong',serif", color: ink },
    grid: { left: 52, right: 28, top: 56, bottom: 60 },
    title: {
      text: '满分=100 · 从谷底一点点爬升',
      textStyle: { fontSize: 12, color: muted, fontWeight: 'normal' },
      left: 'center', top: 6
    },
    legend: {
      data: ['人身自由', '觉悟'],
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
        name: '人身自由',
        type: 'line',
        data: freedom,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: accent2, width: 3 },
        itemStyle: { color: accent2, borderColor: '#fff', borderWidth: 1 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(53,107,100,0.24)' },
              { offset: 1, color: 'rgba(53,107,100,0.02)' }
            ]
          }
        },
        markPoint: {
          symbol: 'pin', symbolSize: 46,
          itemStyle: { color: accent },
          label: { color: '#fff', fontSize: 9, lineHeight: 11, formatter: '{b}' },
          data: [
            { name: '谷底', value: '谷底', coord: ['1920\n被卖', 2] }
          ]
        }
      },
      {
        name: '觉悟',
        type: 'line',
        data: awake,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: accent, width: 2.4, type: 'dashed' },
        itemStyle: { color: accent, borderColor: '#fff', borderWidth: 1 },
        markPoint: {
          symbol: 'pin', symbolSize: 46,
          itemStyle: { color: accent2 },
          label: { color: '#fff', fontSize: 9, lineHeight: 11, formatter: '{b}' },
          data: [
            { name: '五卅觉醒', value: '五卅觉醒', coord: ['1925\n五卅', 45] }
          ]
        }
      }
    ]
  });

  window.addEventListener('resize', function () { chart.resize(); });
})();
