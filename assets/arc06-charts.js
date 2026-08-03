// ARC·06 东北流亡者 · 图表脚本
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#a5342c';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#356b64';
  var ink = style.getPropertyValue('--ink').trim() || '#3a2e23';
  var muted = style.getPropertyValue('--muted').trim() || '#7c6a52';
  var rule = style.getPropertyValue('--rule').trim() || '#cbb488';

  var el = document.getElementById('chart-homeland');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  // 赵长庚一生的"断崖流亡"曲线：满分=100。
  // 与其他五条线(沉降/震荡/反弹/跃升/挣脱)对照 —— 一条高位平线被1931九一八垂直砍断。
  // 走势依据历史骨架(HI/MID):1931前故土满值→九一八垂直清零→流亡关内漂泊里程一路走高→
  // 1945光复故土第一次回升→旋即被内战再次打落。
  var years = ['1913\n出生', '1928\n少年', '1931\n九一八', '1935\n流亡', '1937\n抗战', '1943\n后方', '1945\n光复', '1948\n内战'];
  var homeland = [90, 92, 6, 8, 8, 8, 55, 22];   // 故土:高位→断崖→贴底→光复回升→内战再落
  var drift = [5, 6, 40, 62, 72, 85, 60, 78];     // 漂泊里程:九一八后一路走高

  chart.setOption({
    textStyle: { fontFamily: "'Lora','Songti SC','STSong',serif", color: ink },
    grid: { left: 52, right: 28, top: 58, bottom: 60 },
    title: {
      text: '满分=100 · 断崖流亡(1931垂直砍断,故土再难归零)',
      textStyle: { fontSize: 12, color: muted, fontWeight: 'normal' },
      left: 'center', top: 6
    },
    legend: {
      data: ['故土', '漂泊里程'],
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
        name: '故土',
        type: 'line',
        data: homeland,
        smooth: false,
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
            { name: '断崖', value: '断崖', coord: ['1931\n九一八', 6] },
            { name: '光复', value: '光复', coord: ['1945\n光复', 55] }
          ]
        }
      },
      {
        name: '漂泊里程',
        type: 'line',
        data: drift,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: accent2, width: 2.5, type: 'dashed' },
        itemStyle: { color: accent2, borderColor: '#fff', borderWidth: 1 }
      }
    ]
  });

  window.addEventListener('resize', function () { chart.resize(); });
})();
