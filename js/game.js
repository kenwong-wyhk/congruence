'use strict';
/* The Correspondence Game (Section 5.1).
   Levels: L0 no figure · L1 side by side · L2 turned · L3 flipped · L4 shared parts.
   Round types: pick the matching part · tap the matching part · build the statement. */
const GAME = (() => {
  const { V } = G;
  const UNLOCK = 6;
  const LEVELS = [
    { name: 'L0', title: 'No figure', desc: 'Only the statement — use the order of the letters.' },
    { name: 'L1', title: 'Side by side', desc: 'Two triangles facing the same way.' },
    { name: 'L2', title: 'Turned', desc: 'The second triangle has been turned.' },
    { name: 'L3', title: 'Flipped', desc: 'The second triangle has been flipped over (and maybe turned).' },
    { name: 'L4', title: 'Shared parts', desc: 'Both triangles are inside one figure and share a side, angle or vertex.' },
  ];
  const ORD = ['1st', '2nd', '3rd'];
  const tx = s => TEX.k(s);
  const tri = s => '△' + s;

  /* ---------- helpers ---------- */
  function statementOrder(t1, t2) {
    const p = U.perm3();
    return [p.map(i => t1[i]).join(''), p.map(i => t2[i]).join('')];
  }
  const sideName = (t, i, j) => (Math.random() < 0.5 ? t[i] + t[j] : t[j] + t[i]);
  const angName = (t, i) => { const o = [0, 1, 2].filter(k => k !== i); if (Math.random() < 0.5) o.reverse(); return t[o[0]] + t[i] + t[o[1]]; };
  const pairs = [[0, 1], [1, 2], [0, 2]];

  function explainPart(L, R, kind, idxs) {
    // L, R: statement strings as displayed; idxs: indices into L
    const pos = idxs.map(i => ORD[i]).join(' and ');
    const left = idxs.map(i => L[i]).join(''), right = idxs.map(i => R[i]).join('');
    if (kind === 'pt') return `${left} is the ${pos} letter on the left, so it matches the ${pos} letter on the right: ${right}.`;
    if (kind === 'seg') return `${left} uses the ${pos} letters on the left, so it matches the ${pos} letters on the right: ${right}.`;
    return '';
  }

  /* ---------- figure builders ---------- */
  function pairFig(level, t1, t2, withMarks) {
    const angs = G.randAngles(35, 100, 12);
    const base = G.triFromAngles(...angs);
    const xs = base.map(p => p[0]), ys = base.map(p => p[1]);
    const k = 118 / Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    let p1 = base.map(p => V.mul(p, k));
    const c1 = G.centroid(p1);
    p1 = p1.map(p => V.add(V.sub(p, c1), [88, 100]));
    let rot = 0, flip = false;
    if (level === 2) rot = U.pick([60, 90, 120, 150, 180, 210, 240, 270, 300]);
    if (level === 3) { flip = true; rot = U.pick([0, 0, 60, 120, 180, 240, 300]); }
    let p2 = G.transform(p1, { rot, flip });
    const c2 = G.centroid(p2);
    p2 = p2.map(p => V.add(V.sub(p, c2), [255, 100]));
    const pts = {};
    [...t1].forEach((L, i) => { pts[L] = p1[i]; });
    [...t2].forEach((L, i) => { pts[L] = p2[i]; });
    const spec = { w: 340, h: 200, pts, polys: [t1, t2] };
    if (withMarks) {
      spec.ticks = {};
      pairs.forEach(([i, j], n) => { spec.ticks[t1[i] + t1[j]] = n + 1; spec.ticks[t2[i] + t2[j]] = n + 1; });
    }
    return spec;
  }

  // Shared-part templates. Roles are replaced by random letters.
  const TEMPLATES = [
    { name: 'kite', pts: { X: [30, 100], Y: [300, 100], U: [125, 28], W: [125, 172] }, t1: 'UXY', t2: 'WXY', polys: ['UXY', 'WXY'], ticks: { XU: 1, XW: 1, YU: 2, YW: 2 } },
    { name: 'bowtie', pts: { C: [170, 100], A: [70, 32], B: [92, 172], P: [270, 168], Q: [248, 28] }, t1: 'ABC', t2: 'PQC', polys: ['ABC', 'PQC'], ticks: { AC: 1, PC: 1, BC: 2, QC: 2 } },
    { name: 'isosceles', pts: { A: [170, 22], B: [55, 178], C: [285, 178], D: [170, 178] }, t1: 'ABD', t2: 'ACD', polys: ['ABD', 'ACD'], ticks: { AB: 1, AC: 1, BD: 2, CD: 2 } },
    { name: 'parallelogram', pts: { A: [85, 35], B: [40, 168], C: [255, 168], D: [300, 35] }, t1: 'ABC', t2: 'CDA', polys: ['ABC', 'CDA'], ticks: { AB: 1, CD: 1, BC: 2, DA: 2 } },
  ];
  function sharedFig(withMarks) {
    const T = U.pick(TEMPLATES);
    const roles = Object.keys(T.pts);
    const letters = U.letters(roles.length);
    const m = {}; roles.forEach((r, i) => { m[r] = letters[i]; });
    const sub = s => [...s].map(c => m[c]).join('');
    const flip = Math.random() < 0.5;
    const pts = {};
    roles.forEach(r => { const p = T.pts[r]; pts[m[r]] = flip ? [340 - p[0], p[1]] : p.slice(); });
    const spec = { w: 340, h: 200, pts, polys: T.polys.map(sub) };
    if (withMarks) { spec.ticks = {}; for (const k in T.ticks) spec.ticks[sub(k)] = T.ticks[k]; }
    if (T.name === 'bowtie' && withMarks) { spec.arcs = {}; spec.arcs[sub('ACB')] = 1; spec.arcs[sub('PCQ')] = 1; }
    return { spec, t1: sub(T.t1), t2: sub(T.t2), name: T.name };
  }

  /* ---------- round generators ---------- */
  function roundOptions(t1, t2, L, R) {
    const type = U.pick(['side', 'angle', 'angle', 'nottrue']);
    if (type === 'side') {
      const [i, j] = U.pick(pairs);
      const q = sideName(t1, i, j);
      const ans = G.segKey(t2[i], t2[j]);
      const opts = U.shuffle(pairs.map(([a, b]) => sideName(t2, a, b)));
      const li = [...q].map(c => L.indexOf(c)).sort();
      return { ui: 'options', prompt: `Which side is equal to ${tx(q)}?`, opts: opts.map(o => ({ html: tx(o), val: G.segKey(o[0], o[1]) })), ans, explain: explainPart(L, R, 'seg', li) };
    }
    if (type === 'angle') {
      const i = U.rint(0, 2);
      const q = angName(t1, i);
      const ans = G.angKey(angName(t2, i));
      const opts = U.shuffle([0, 1, 2].map(k => angName(t2, k)));
      const li = L.indexOf(t1[i]);
      return { ui: 'options', prompt: `Which angle is equal to ${tx('∠' + q)}?`, opts: opts.map(o => ({ html: tx('∠' + o), val: G.angKey(o) })), ans,
        explain: `The vertex of ${'∠' + q} is ${t1[i]}, the ${ORD[li]} letter on the left. The ${ORD[li]} letter on the right is ${R[li]}, so the angle is ${'∠' + angName(t2, i)}.` };
    }
    // which may NOT be true
    const facts = [];
    const pool = [...pairs.map(p => ['s', p]), ...[0, 1, 2].map(i => ['a', i])];
    const pickd = U.shuffle(pool).slice(0, 4);
    const wrongAt = U.rint(0, 3);
    pickd.forEach(([k, v], n) => {
      if (k === 's') {
        const [i, j] = v;
        let rhs = sideName(t2, i, j);
        if (n === wrongAt) { const other = U.pick(pairs.filter(p => p[0] !== i || p[1] !== j)); rhs = sideName(t2, other[0], other[1]); }
        facts.push(`${sideName(t1, i, j)} = ${rhs}`);
      } else {
        const i = v;
        let rhs = angName(t2, i);
        if (n === wrongAt) rhs = angName(t2, U.pick([0, 1, 2].filter(x => x !== i)));
        facts.push(`∠${angName(t1, i)} = ∠${rhs}`);
      }
    });
    return { ui: 'options', prompt: 'Which of the following may <b>NOT</b> be true?', opts: facts.map((f, n) => ({ html: tx(f), val: n })), ans: wrongAt,
      explain: `Match letters by position: ${[0, 1, 2].map(i => L[i] + '↔' + R[i]).join(', ')}. Option ${'ABCD'[wrongAt]} breaks this.` };
  }

  function roundBuildFacts(t1, t2) {
    const facts = U.shuffle(pairs.map(([i, j]) => (Math.random() < 0.5 ? `${sideName(t1, i, j)} = ${sideName(t2, i, j)}` : `${sideName(t2, i, j)} = ${sideName(t1, i, j)}`)));
    return { ui: 'build', prompt: `It is given that ${facts.map(tx).join(', ')}.<br>Write the congruence statement.`, t1, t2, letters: [...t1, ...t2].sort(),
      explain: `Corresponding vertices: ${[0, 1, 2].map(i => t1[i] + '↔' + t2[i]).join(', ')}. One answer: ${tx(tri(t1) + ' ≅ ' + tri(t2))}.` };
  }

  function roundTap(spec, t1, t2, L, R) {
    const kind = U.pick(['pt', 'seg', 'ang']);
    const tri = () => '△' + R;
    let hl, ans, prompt, hit, explain;
    if (kind === 'pt') {
      const i = U.rint(0, 2);
      hl = t1[i]; ans = t2[i];
      hit = [...t2];
      prompt = `Tap the vertex of ${tx(tri(t2))} that corresponds to ${tx(t1[i])}.`;
      explain = explainPart(L, R, 'pt', [L.indexOf(t1[i])]);
    } else if (kind === 'seg') {
      const [i, j] = U.pick(pairs);
      hl = t1[i] + t1[j]; ans = G.segKey(t2[i], t2[j]);
      hit = pairs.map(([a, b]) => t2[a] + t2[b]);
      prompt = `Tap the side of ${tx(tri(t2))} that corresponds to ${tx(sideName(t1, i, j))}.`;
      explain = explainPart(L, R, 'seg', [L.indexOf(t1[i]), L.indexOf(t1[j])].sort());
    } else {
      const i = U.rint(0, 2);
      const a1 = angName(t1, i);
      hl = a1; ans = G.angKey(angName(t2, i));
      hit = [0, 1, 2].map(k => angName(t2, k));
      prompt = `Tap the angle of ${tx(tri(t2))} that corresponds to ${tx('∠' + a1)}.`;
      const li = L.indexOf(t1[i]);
      explain = `The vertex ${t1[i]} is the ${ORD[li]} letter on the left, so the matching vertex is ${R[li]}: ${'∠' + angName(t2, i)}.`;
    }
    return { ui: 'tap', fig: spec, hl, ans, hit, prompt, explain, ansPart: ans };
  }

  function makeRound(level, speed) {
    if (level === 0) {
      const ls = U.letters(6), t1 = ls.slice(0, 3).join(''), t2 = ls.slice(3).join('');
      const [L, R] = statementOrder(t1, t2);
      if (!speed && Math.random() < 0.3) return roundBuildFacts(t1, t2);
      return Object.assign(roundOptions(t1, t2, L, R), { statement: tri(L) + ' ≅ ' + tri(R) });
    }
    let spec, t1, t2;
    if (level === 4) {
      const s = sharedFig(true);
      spec = s.spec; t1 = s.t1; t2 = s.t2;
    } else {
      const ls = U.letters(6); t1 = ls.slice(0, 3).join(''); t2 = ls.slice(3).join('');
      spec = pairFig(level, t1, t2, true);
    }
    const build = !speed && Math.random() < 0.4;
    if (build) {
      return { ui: 'build', fig: spec, prompt: 'Use the equal-side marks to write the congruence statement.', t1, t2, letters: Object.keys(spec.pts).sort(),
        explain: `Same marks belong together: ${[0, 1, 2].map(i => t1[i] + '↔' + t2[i]).join(', ')}. One answer: ${tx(tri(t1) + ' ≅ ' + tri(t2))}.` };
    }
    const tapSpec = Object.assign({}, spec); delete tapSpec.ticks; delete tapSpec.arcs;
    const [L, R] = statementOrder(t1, t2);
    return Object.assign(roundTap(tapSpec, t1, t2, L, R), { statement: tri(L) + ' ≅ ' + tri(R) });
  }

  /* ---------- UI ---------- */
  function render() {
    const gs = Store.game();
    const box = U.el('div');
    let level = Math.min(gs.unlocked || 0, 4), streak = 0, speed = null;
    const levelsEl = U.el('div', { class: 'levels', role: 'tablist', 'aria-label': 'Levels' });
    const stats = U.el('div', { class: 'stats' });
    const levelInfo = U.el('p', { class: 'small muted' });
    const area = U.el('div', { class: 'demo' });
    const speedBtn = U.el('button', { type: 'button', class: 'btn ghost', text: 'Speed Round (60 s)', onclick: () => startSpeed() });
    box.append(U.el('div', { class: 'game-top' }, levelsEl, stats), levelInfo, area, U.el('div', { class: 'btn-row' }, speedBtn));

    function paintTop() {
      U.clear(levelsEl);
      LEVELS.forEach((lv, i) => {
        const b = U.el('button', { type: 'button', role: 'tab', class: i === level && !speed ? 'on' : '', text: lv.name, title: lv.title, 'aria-selected': i === level, disabled: i > gs.unlocked || !!speed });
        b.addEventListener('click', () => { level = i; streak = 0; next(); });
        levelsEl.append(b);
      });
      const cnt = (gs.counts[level] || 0);
      if (speed) {
        stats.textContent = `Score ${speed.score} · Best ${gs.best || 0}`;
        levelInfo.textContent = 'Speed Round: answer as many as you can. Levels 0–3 mixed.';
      } else {
        stats.textContent = `Streak ${streak}`;
        const lv = LEVELS[level];
        levelInfo.textContent = `${lv.name} ${lv.title}: ${lv.desc}` + (level === gs.unlocked && level < 4 ? `  ·  ${Math.min(cnt, UNLOCK)}/${UNLOCK} correct to unlock ${LEVELS[level + 1].name}.` : '');
      }
    }

    function record(ok) {
      if (speed) { if (ok) speed.score++; paintTop(); return; }
      if (ok) {
        streak++;
        gs.counts[level] = (gs.counts[level] || 0) + 1;
        if (level === gs.unlocked && level < 4 && gs.counts[level] >= UNLOCK) { gs.unlocked = level + 1; Store.save(); paintTop(); return 'unlock'; }
        Store.save();
      } else streak = 0;
      paintTop();
      return null;
    }

    function showRound(r) {
      U.clear(area);
      if (speed) area.append(U.el('div', { class: 'timer', 'aria-live': 'off', id: 'speedTimer', text: speed.left + ' s' }));
      if (r.statement) area.append(U.el('div', { class: 'big-stmt', html: 'Given: ' + tx(r.statement) }));
      let fig = null;
      if (r.fig) { fig = G.draw(r.fig); area.append(U.el('div', { class: 'fig-wrap' }, fig.svg)); }
      area.append(U.el('div', { class: 'game-q', html: r.prompt }));
      const fb = U.el('div', { class: 'feedback', 'aria-live': 'polite' });
      const nextBtn = U.el('button', { type: 'button', class: 'btn hidden', text: 'Next ▶', onclick: () => next() });
      let answered = false;
      const finish = (ok, revealFn) => {
        if (answered) return;
        answered = true;
        const res = record(ok);
        if (revealFn) revealFn();
        fb.className = 'feedback show ' + (ok ? 'good' : 'bad');
        U.clear(fb).append(U.el('div', { class: 'fb-title', text: ok ? (res === 'unlock' ? 'Correct! New level unlocked.' : 'Correct!') : 'Not this one' }), U.el('div', { html: r.explain || '' }));
        if (speed) { setTimeout(() => { if (speed) next(); }, ok ? 350 : 1400); return; }
        nextBtn.classList.remove('hidden');
        if (ok) setTimeout(() => { if (area.contains(nextBtn) && !nextBtn.classList.contains('hidden')) next(); }, 1600);
      };
      if (r.ui === 'options') {
        const opts = U.el('div', { class: 'opts' });
        const btns = r.opts.map((o, i) => {
          const b = U.el('button', { type: 'button', class: 'opt' }, U.el('span', { class: 'ol', text: 'ABCD'[i] + '.' }), U.el('span', { html: o.html }));
          b.addEventListener('click', () => {
            if (answered) return;
            const ok = o.val === r.ans;
            finish(ok, () => { b.classList.add(ok ? 'right' : 'wrong'); btns.forEach((x, j) => { if (r.opts[j].val === r.ans) x.classList.add('right'); }); });
          });
          opts.append(b);
          return b;
        });
        area.append(opts);
      } else if (r.ui === 'tap') {
        fig.highlight([[r.hl, 1]]);
        fig.enableHit(r.hit, key => {
          if (answered) return;
          const ok = key === r.ans;
          finish(ok, () => { fig.disableHit(); fig.highlight([[r.ansPart, ok ? 1 : 2]]); if (!ok) fig.highlight([[key, 0]]); });
        });
        area.append(U.el('p', { class: 'small muted', text: 'The blue part is in the first triangle. Tap its partner in the second one.' }));
      } else {
        const sb = QR.StatementBuilder(r.letters);
        sb.onChange = () => sb.mark(null);
        const chk = U.el('button', { type: 'button', class: 'btn', text: 'Check' });
        chk.addEventListener('click', () => {
          if (answered) return;
          const [Ls, Rs] = sb.get();
          const res = CK.statement(Ls, Rs, r.t1, r.t2);
          if (res.hint === 'Fill in all the letters.') { fb.className = 'feedback show bad'; U.clear(fb).append(U.el('div', { text: res.hint })); return; }
          sb.mark(res.ok);
          finish(res.ok);
          if (!res.ok && res.hint) fb.prepend(U.el('div', { text: res.hint }));
        });
        area.append(sb.node, U.el('div', { class: 'btn-row' }, chk));
      }
      area.append(fb, U.el('div', { class: 'btn-row' }, nextBtn));
    }

    function next() {
      paintTop();
      const lv = speed ? U.rint(0, Math.min(3, Math.max(gs.unlocked, 1))) : level;
      showRound(makeRound(lv, !!speed));
    }

    function startSpeed() {
      if (speed) return;
      speed = { score: 0, left: 60 };
      speedBtn.disabled = true;
      speed.timer = setInterval(() => {
        speed.left--;
        const t = document.getElementById('speedTimer');
        if (t) t.textContent = speed.left + ' s';
        if (speed.left <= 0) endSpeed();
      }, 1000);
      next();
    }
    function endSpeed() {
      clearInterval(speed.timer);
      const score = speed.score;
      const isBest = score > (gs.best || 0);
      if (isBest) { gs.best = score; Store.save(); }
      speed = null;
      speedBtn.disabled = false;
      paintTop();
      U.clear(area).append(
        U.el('div', { class: 'demo-title', text: 'Time!' }),
        U.el('div', { class: 'score-big', text: String(score) }),
        U.el('p', { text: isBest ? 'New personal best on this device!' : `Personal best: ${gs.best}.` }),
        U.el('div', { class: 'btn-row' }, U.el('button', { type: 'button', class: 'btn', text: 'Back to levels', onclick: () => next() }), U.el('button', { type: 'button', class: 'btn ghost', text: 'Play again', onclick: () => startSpeed() })));
    }
    box.cleanup = () => { if (speed) clearInterval(speed.timer); speed = null; };
    next();
    return box;
  }

  return { render, makeRound };
})();
