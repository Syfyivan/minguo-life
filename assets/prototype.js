// 民国人生 · 可玩原型逻辑（读 window.MINGUO）
(function () {
  var M = window.MINGUO;
  if (!M) { console.error('MINGUO data missing'); return; }

  var $ = function (id) { return document.getElementById(id); };
  var attrName = {}, attrColor = {};
  M.attrs.forEach(function (a) { attrName[a.key] = a.name; attrColor[a.key] = a.color; });
  M.resources.forEach(function (r) { attrName[r.key] = r.name; attrColor[r.key] = r.color; });

  var G = null;        // 当前游戏状态
  var curveChart = null;

  // ---------- 出身选择 ----------
  var picked = null;
  (function renderPickers() {
    var html = '';
    Object.keys(M.origins).forEach(function (key) {
      var o = M.origins[key];
      html += '<div class="pick" data-k="' + key + '">' +
        '<span class="role">' + o.name + '</span>' +
        '<div class="nm">' + o.person + '</div>' +
        '<div class="mo">' + o.gender + '·' + o.born + '生·' + o.place + '<br>' + o.motif + '</div>' +
        '</div>';
    });
    $('pickers').innerHTML = html;
    Array.prototype.forEach.call(document.querySelectorAll('.pick'), function (el) {
      el.addEventListener('click', function () {
        document.querySelectorAll('.pick').forEach(function (p) { p.classList.remove('sel'); });
        el.classList.add('sel');
        picked = el.getAttribute('data-k');
        $('start-btn').disabled = false;
      });
    });
  })();

  $('start-btn').addEventListener('click', function () { startGame(picked); });
  $('restart').addEventListener('click', function () {
    $('game').classList.remove('on');
    $('picker-wrap').style.display = '';
    G = null;
  });

  // ---------- 开局 ----------
  function startGame(key) {
    var o = M.origins[key];
    G = {
      key: key, origin: o,
      year: o.born + 16,          // 从 16 岁开始可操作
      age: 16,
      month: 1, day: 1,
      state: {},                   // 六维 + 四资源当前值
      xunCount: {},                // 本旬各行动已做次数（边际递减）
      chosen: {},                  // 当天四时段所选
      spirit: M.balance.spiritMax,
      curve: [],                   // [{year, value}]
      firedEvents: {}
    };
    M.attrs.forEach(function (a) { G.state[a.key] = o.start[a.key] || 0; });
    M.resources.forEach(function (r) { G.state[r.key] = o.startRes[r.key] || 0; });

    $('picker-wrap').style.display = 'none';
    $('game').classList.add('on');
    initCurve();
    sampleCurve('起点');
    resetDay();
    log('day', o.person + '的一生从 ' + G.year + ' 年（' + G.age + ' 岁）开始。');
    renderAll();
  }

  // ---------- 每天四时段 ----------
  function resetDay() {
    G.chosen = {};
    G.spirit = M.balance.spiritMax;
    renderSlots();
  }

  function renderSlots() {
    var o = G.origin;
    var html = '';
    M.balance.slots.forEach(function (slot) {
      var acts = o.actions.filter(function (a) { return a.slots.indexOf(slot) >= 0; });
      var chips = acts.map(function (a) {
        var locked = !M.meetGate(a.gate, G.state);
        var sel = G.chosen[slot] === a.id;
        var out = '';
        for (var k in a.out) { out += attrName[k] + (a.out[k] >= 0 ? '+' : '') + a.out[k] + ' '; }
        return '<span class="act ' + (sel ? 'chosen' : '') + (locked ? ' locked' : '') + '" data-slot="' + slot + '" data-act="' + a.id + '">' +
          a.name + '<span class="o">' + out.trim() + '</span></span>';
      }).join('');
      html += '<div class="slot"><div class="lab">' + M.balance.slotLabel[slot] + '</div><div class="acts">' + chips + '</div></div>';
    });
    $('slots').innerHTML = html;
    Array.prototype.forEach.call(document.querySelectorAll('.act'), function (el) {
      if (el.classList.contains('locked')) return;
      el.addEventListener('click', function () {
        var slot = el.getAttribute('data-slot');
        G.chosen[slot] = el.getAttribute('data-act');
        renderSlots();
      });
    });
  }

  // ---------- 过完一天：结算所选行动 ----------
  function passDay() {
    var o = G.origin;
    var did = 0;
    M.balance.slots.forEach(function (slot) {
      var actId = G.chosen[slot];
      if (!actId) return;
      var act = o.actions.filter(function (a) { return a.id === actId; })[0];
      if (!act) return;
      // 精神消耗 & 疲劳惩罚
      var penalty = (G.spirit <= 0) ? M.balance.tiredPenalty : 1;
      G.spirit -= act.spirit;
      // 边际递减：本旬第几次
      var times = G.xunCount[actId] || 0;
      for (var k in act.out) {
        var base = act.out[k];
        var gain;
        if (base >= 0) gain = M.marginalGain(base, times) * penalty;
        else gain = base; // 负向（消耗）不打折
        G.state[k] = Math.max(0, Math.round(((G.state[k] || 0) + gain) * 10) / 10);
      }
      G.xunCount[actId] = times + 1;
      did++;
    });
    if (!did) { log('day', G.year + '年 ' + G.month + '月：这天什么也没做。'); }
    advanceDate();
  }

  function advanceDate() {
    G.day += 1;
    // 旬切换：清空边际计数
    if (G.day % M.balance.daysPerXun === 1) G.xunCount = {};
    // 月切换
    if (G.day > M.balance.monthDays) {
      G.day = 1; G.month += 1;
      monthSettle();
    }
    // 年切换
    if (G.month > 12) {
      G.month = 1;
      yearSettle();
    }
    resetDay();
    renderAll();
  }

  // ---------- 月结算：房租/健康损耗 ----------
  function monthSettle() {
    G.state.money = Math.max(0, Math.round((G.state.money - 1) * 10) / 10); // 基本开销
    if (G.spirit < 0) G.state.health = Math.max(0, G.state.health - 1);     // 上月透支
  }

  // ---------- 年结算：时代乘子 + 年度事件 + 曲线打点 ----------
  function yearSettle() {
    G.year += 1; G.age += 1;
    // 时代乘子作用于资源
    var mul = M.eraMultiplier(G.year);
    if (mul.money !== 1) G.state.money = Math.round(G.state.money * mul.money * 10) / 10;
    if (mul.position !== 1) G.state.position = Math.round(G.state.position * mul.position * 10) / 10;

    // 触发本年度事件
    var evs = M.events[G.key] || [];
    evs.forEach(function (ev) {
      if (ev.year !== G.year || G.firedEvents[ev.id]) return;
      G.firedEvents[ev.id] = true;
      if (!M.meetGate(ev.gate, G.state)) {
        log('ev', G.year + '年【' + ev.name + '】门槛未达（' + gateText(ev.gate) + '），擦肩而过。');
        return;
      }
      if (ev.chanceBy) {
        var p = M.eventChance(ev, G.state);
        var roll = Math.random();
        if (roll <= p) {
          applyEffect(ev.success);
          log('ok', G.year + '年【' + ev.name + '】掷骰成功（概率' + Math.round(p * 100) + '%）：' + ev.success.desc);
        } else {
          applyEffect(ev.fail);
          log('bad', G.year + '年【' + ev.name + '】掷骰失败（概率' + Math.round(p * 100) + '%）：' + ev.fail.desc);
        }
      } else {
        applyEffect(ev.effect);
        log('ev', G.year + '年【' + ev.name + '】' + ev.desc + '。');
      }
    });

    sampleCurve(G.year + '年');
    renderAll();
  }

  function gateText(gate) { var s = ''; for (var k in gate) s += attrName[k] + '≥' + gate[k] + ' '; return s.trim(); }
  function applyEffect(eff) {
    if (!eff) return;
    for (var k in eff) {
      if (k === 'desc') continue;
      G.state[k] = Math.max(0, Math.round(((G.state[k] || 0) + eff[k]) * 10) / 10);
    }
  }

  // ---------- 命运曲线：综合处境值 ----------
  function compositeValue() {
    // 处境值 = 属性均值*0.5 + 资源均值*0.5（示意加权）
    var aSum = 0; M.attrs.forEach(function (a) { aSum += G.state[a.key] || 0; });
    var rSum = 0; M.resources.forEach(function (r) { rSum += G.state[r.key] || 0; });
    var aAvg = aSum / M.attrs.length;
    var rAvg = rSum / M.resources.length;
    return Math.round((aAvg * 0.5 + rAvg * 0.5) * 10) / 10;
  }
  function sampleCurve(label) {
    G.curve.push({ x: G.year, label: label, value: compositeValue() });
    drawCurve();
  }

  // ---------- 渲染：属性条 / 资源 / HUD ----------
  function renderAll() { renderHUD(); renderAttrs(); }
  function renderHUD() {
    var o = G.origin;
    $('hud-who').textContent = o.person + '·' + o.name;
    $('hud-date').textContent = G.year + '年 ' + G.month + '月 ' + G.day + '日 · ' + G.age + '岁';
    var sp = G.spirit;
    $('hud-spirit').textContent = '精神 ' + sp + '/' + M.balance.spiritMax + (sp <= 0 ? ' ⚠透支' : '');
  }
  function renderAttrs() {
    var html = '';
    M.attrs.forEach(function (a) {
      var v = G.state[a.key] || 0;
      var lv = M.levelOf(v);
      var lname = (M.levelNames[a.key] || [])[lv] || '';
      var pct = Math.min(100, v / 1.6); // 160 满标度
      html += '<div class="bar"><div class="t"><span>' + a.name + ' <span class="lv">Lv' + lv + '·' + lname + '</span></span><span>' + v + '</span></div>' +
        '<div class="track"><div class="fill" style="width:' + pct + '%;background:' + a.color + '"></div></div></div>';
    });
    $('attrs').innerHTML = html;
    var res = '';
    M.resources.forEach(function (r) {
      res += '<span class="r" style="background:' + r.color + '">' + r.name + ' ' + (G.state[r.key] || 0) + '</span>';
    });
    $('res').innerHTML = res;
  }

  // ---------- 日志 ----------
  function log(type, text) {
    var el = document.createElement('div');
    el.className = 'li';
    el.innerHTML = '<span class="' + type + '">' + text + '</span>';
    $('log').insertBefore(el, $('log').firstChild);
  }

  // ---------- 曲线图 ----------
  function initCurve() {
    var el = $('life-curve');
    if (!el || typeof echarts === 'undefined') return;
    curveChart = echarts.init(el, null, { renderer: 'svg' });
    window.addEventListener('resize', function () { curveChart && curveChart.resize(); });
  }
  function drawCurve() {
    if (!curveChart) return;
    var style = getComputedStyle(document.documentElement);
    var accent = style.getPropertyValue('--accent').trim() || '#a5342c';
    var accent2 = style.getPropertyValue('--accent2').trim() || '#356b64';
    var muted = style.getPropertyValue('--muted').trim() || '#7c6a52';
    var rule = style.getPropertyValue('--rule').trim() || '#cbb488';
    curveChart.setOption({
      textStyle: { fontFamily: "'Lora',serif", color: '#3a2e23' },
      grid: { left: 42, right: 20, top: 20, bottom: 34 },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category', data: G.curve.map(function (p) { return p.x; }),
        axisLine: { lineStyle: { color: rule } }, axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: {
        type: 'value', min: 0, max: 100,
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule, opacity: .3 } }, axisLabel: { color: muted, fontSize: 11 }
      },
      series: [{
        type: 'line', smooth: false,
        data: G.curve.map(function (p) { return p.value; }),
        symbol: 'circle', symbolSize: 7,
        lineStyle: { color: accent, width: 3 }, itemStyle: { color: accent, borderColor: '#fff', borderWidth: 1 },
        areaStyle: { color: 'rgba(165,52,44,0.10)' },
        markLine: {
          silent: true, symbol: 'none', lineStyle: { color: accent2, type: 'dashed' },
          data: [{ xAxis: String(1937) }], label: { formatter: '抗战', color: accent2, fontSize: 10 }
        }
      }]
    });
  }

  // ---------- 按钮 ----------
  $('pass-day').addEventListener('click', passDay);
  $('pass-month').addEventListener('click', function () {
    // 沿用当前所选模板快进整月
    for (var i = 0; i < M.balance.monthDays; i++) passDayQuiet();
    resetDay(); renderAll();
    log('day', '（快进一个月，沿用行动模板）');
  });
  $('pass-year').addEventListener('click', function () {
    var guard = 0;
    var startY = G.year;
    while (G.year === startY && guard < 400) { passDayQuiet(); guard++; }
    resetDay(); renderAll();
  });

  // 快进用：不重绘 slot，仅结算
  function passDayQuiet() {
    var o = G.origin;
    M.balance.slots.forEach(function (slot) {
      var actId = G.chosen[slot];
      if (!actId) {
        // 无模板则挑该时段第一个可用行动作为默认日常
        var av = o.actions.filter(function (a) { return a.slots.indexOf(slot) >= 0 && M.meetGate(a.gate, G.state) && !a.event; });
        if (av.length) actId = av[0].id;
      }
      if (!actId) return;
      var act = o.actions.filter(function (a) { return a.id === actId; })[0];
      if (!act) return;
      var penalty = (G.spirit <= 0) ? M.balance.tiredPenalty : 1;
      G.spirit -= act.spirit;
      var times = G.xunCount[actId] || 0;
      for (var k in act.out) {
        var base = act.out[k];
        var gain = base >= 0 ? M.marginalGain(base, times) * penalty : base;
        G.state[k] = Math.max(0, Math.round(((G.state[k] || 0) + gain) * 10) / 10);
      }
      G.xunCount[actId] = times + 1;
    });
    // 日期推进（静默版，不 resetDay）
    G.day += 1;
    if (G.day % M.balance.daysPerXun === 1) G.xunCount = {};
    if (G.day > M.balance.monthDays) { G.day = 1; G.month += 1; monthSettle(); }
    if (G.month > 12) { G.month = 1; yearSettle(); }
  }
})();
