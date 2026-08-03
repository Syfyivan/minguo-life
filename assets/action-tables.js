// 民国人生 · 行动表页面渲染（读 window.MINGUO）
(function () {
  var M = window.MINGUO;
  if (!M) { console.error('MINGUO data not loaded'); return; }

  var attrName = {}, attrColor = {};
  M.attrs.forEach(function (a) { attrName[a.key] = a.name; attrColor[a.key] = a.color; });
  M.resources.forEach(function (r) { attrName[r.key] = r.name; attrColor[r.key] = r.color; });

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  // ---- A 平衡参数 ----
  (function () {
    var b = M.balance;
    var html = '<table><tbody>' +
      row('每日时段', '晨 / 午 / 晚 / 夜（4 个行动位）') +
      row('每日精神上限', b.spiritMax + ' 点；耗尽后当日后续行动产出 ×' + b.tiredPenalty) +
      row('边际递减公式', 'gain(n) = ' + b.marginalBase + ' / (1 + ' + b.marginalK + '·(n−1))，n=本旬内第几次做同一行动') +
      row('时间结构', '一月 = 三旬 = ' + b.monthDays + ' 天；市集/发薪/月考按旬月循环') +
      '</tbody></table>';
    document.getElementById('param-box').innerHTML = html;
    function row(k, v) { return '<tr><td style="width:180px;font-weight:700">' + k + '</td><td>' + v + '</td></tr>'; }
  })();

  // ---- B 分级门槛 ----
  (function () {
    var cuts = M.levelCuts;
    var head = '<tr><th>属性</th>';
    for (var i = 0; i < cuts.length; i++) head += '<th>Lv' + i + ' · ≥' + cuts[i] + '</th>';
    head += '</tr>';
    var body = '';
    M.attrs.forEach(function (a) {
      var names = M.levelNames[a.key] || [];
      body += '<tr><td style="font-weight:700;color:' + a.color + '">' + a.name + '</td>';
      for (var i = 0; i < cuts.length; i++) body += '<td>' + (names[i] || '-') + '</td>';
      body += '</tr>';
    });
    document.getElementById('level-box').innerHTML = '<table>' + head + body + '</table>';
  })();

  // ---- C 六种出身行动表 ----
  (function () {
    var nav = '', box = '';
    Object.keys(M.origins).forEach(function (key) {
      var o = M.origins[key];
      nav += '<a href="#o-' + key + '">' + o.person + '·' + o.name + '</a>';

      // 起点属性 chips
      var chips = '';
      M.attrs.forEach(function (a) {
        chips += '<span class="chip" style="background:' + a.color + '">' + a.name + ' ' + (o.start[a.key] || 0) + '</span>';
      });
      var rchips = '';
      M.resources.forEach(function (r) {
        rchips += '<span class="chip" style="background:' + r.color + ';opacity:.85">' + r.name + ' ' + (o.startRes[r.key] || 0) + '</span>';
      });

      // 行动行
      var rows = '';
      o.actions.forEach(function (act) {
        var slots = act.slots.map(function (s) { return M.balance.slotLabel[s].split(' ')[0]; }).join('/');
        var out = '';
        for (var k in act.out) {
          var v = act.out[k];
          out += '<span class="' + (v >= 0 ? 'up' : 'down') + '">' + attrName[k] + (v >= 0 ? '+' : '') + v + '</span> ';
        }
        var gate = '';
        if (act.gate) { for (var g in act.gate) gate += attrName[g] + '≥' + act.gate[g] + ' '; }
        var ev = act.event ? ' <span class="tag-ev">事件</span>' : '';
        rows += '<tr>' +
          '<td style="font-weight:700;white-space:nowrap">' + esc(act.name) + ev + '</td>' +
          '<td class="small" style="white-space:nowrap">' + slots + '</td>' +
          '<td>精' + act.spirit + '</td>' +
          '<td class="out">' + out + '</td>' +
          '<td class="gate">' + (gate || '—') + '</td>' +
          '<td class="small">' + esc(act.note || '') + '</td>' +
          '</tr>';
      });

      box += '<div class="origin" id="o-' + key + '">' +
        '<div class="head">' +
          '<div class="who"><span class="role">' + o.name + '</span>' + o.person + '</div>' +
          '<div class="meta">' + o.gender + ' · ' + o.born + '年生 · ' + o.place + '</div>' +
          '<div class="motif">「' + esc(o.motif) + '」</div>' +
        '</div>' +
        '<div class="starts">' + chips + rchips + '</div>' +
        '<table><tr><th>行动</th><th>时段</th><th>精神</th><th>产出</th><th>门槛</th><th>说明</th></tr>' + rows + '</table>' +
        '</div>';
    });
    document.getElementById('orignav').innerHTML = nav;
    document.getElementById('origins-box').innerHTML = box;
  })();

  // ---- D 年度事件 ----
  (function () {
    var box = '';
    Object.keys(M.events).forEach(function (key) {
      var o = M.origins[key];
      var rows = '';
      M.events[key].forEach(function (ev) {
        var kind = ev.chanceBy ? '<span class="tag-ev">掷</span>' : '定值';
        var chanceInfo = ev.chanceBy ? ('由 ' + ev.chanceBy.map(function (k) { return attrName[k]; }).join('+') + ' 决定') : '必定发生';
        var gate = '';
        if (ev.gate) { for (var g in ev.gate) gate += attrName[g] + '≥' + ev.gate[g] + ' '; }
        var eff = '';
        var src = ev.effect || {};
        for (var k in src) { var v = src[k]; eff += '<span class="' + (v >= 0 ? 'up' : 'down') + '">' + attrName[k] + (v >= 0 ? '+' : '') + v + '</span> '; }
        if (ev.success) eff += '<br><span class="small">成：' + esc(ev.success.desc) + ' / 败：' + esc(ev.fail.desc) + '</span>';
        rows += '<tr>' +
          '<td style="white-space:nowrap">' + ev.year + '</td>' +
          '<td style="font-weight:700;white-space:nowrap">' + esc(ev.name) + ' ' + kind + '<span class="rel ' + (ev.hist === 'HI' ? 'hi' : 'mid') + '">' + ev.hist + '</span></td>' +
          '<td class="gate">' + (gate || '—') + '</td>' +
          '<td class="small">' + chanceInfo + '</td>' +
          '<td class="out">' + eff + '</td>' +
          '</tr>';
      });
      box += '<div class="origin"><div class="head"><div class="who"><span class="role">' + o.name + '</span>' + o.person + ' · 年度事件</div></div>' +
        '<table><tr><th>年</th><th>事件</th><th>门槛</th><th>成败取决于</th><th>后果</th></tr>' + rows + '</table></div>';
    });
    document.getElementById('events-box').innerHTML = box;
  })();
})();
