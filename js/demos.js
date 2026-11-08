'use strict';
/* Interactive demos: overlay (slide / turn / flip), condition explorer, highlight-a-figure. */
const DEMO = (() => {
  const { V, mk } = G;
  const f2 = x => Math.round(x * 100) / 100;

  function svgPoint(svg, e) {
    const p = svg.createSVGPoint();
    p.x = e.clientX; p.y = e.clientY;
    const r = p.matrixTransform(svg.getScreenCTM().inverse());
    return [r.x, r.y];
  }

  /* ---------- Overlay: move a congruent copy onto the original ---------- */
  function overlay(o = {}) {
    const W = 340, H = 250;
    const box = U.el('div', { class: 'demo' });
    box.append(U.el('div', { class: 'demo-title', text: o.title || 'Slide, turn, flip' }));
    box.append(U.el('p', { class: 'small', html: TEX.render(o.intro || 'Drag the blue shape. Use the buttons to turn or flip it. Can you make it fit <b>exactly</b> on the black one?') }));
    const svg = mk('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fig', role: 'img', 'aria-label': 'Overlay demo' });
    svg.style.maxWidth = '560px';
    const status = U.el('div', { class: 'status', 'aria-live': 'polite' });
    box.append(U.el('div', { class: 'fig-wrap' }, svg), status);
    let L1, L2, base, fixedPts, fixedC, st;

    function newShape() {
      const n = o.shape ? o.shape.length : 3;
      L1 = o.letters1 || 'ABC';
      L2 = o.letters2 || U.letters(n, L1).join('');
      let pts = o.shape ? o.shape.map(p => p.slice()) : G.triFromAngles(...G.randAngles(35, 100, 12));
      pts = G.fitBox(pts, [30, 60, 130, 130]);
      fixedPts = pts;
      fixedC = G.centroid(pts);
      base = pts.map(p => V.sub(p, fixedC));
      st = { ang: U.pick([45, 90, 135, 180, 225, 270, 315, 60, 120, 240, 300]), flip: Math.random() < (o.flipChance != null ? o.flipChance : 0.5), pos: [240, 125], done: false };
      draw();
    }
    const world = () => base.map(p => V.add(st.pos, V.rot(st.flip ? [-p[0], p[1]] : p, st.ang)));
    // st.done: the shapes coincide right now; st.matched: they have fitted at least once
    // (after that, matching sides keep the same colour on both shapes, even when pulled apart).
    function draw() {
      U.clear(svg);
      const gF = mk('g', {}, svg), gM = mk('g', {}, svg), gC = mk('g', {}, svg), gT = mk('g', {}, svg);
      const n = base.length;
      const sideCol = i => G.COL((i % 3) + 1);
      mk('polygon', { points: fixedPts.map(p => p.map(f2).join(',')).join(' '), fill: 'none', stroke: 'var(--ink)', 'stroke-width': 1.8 }, gF);
      if (st.matched) {
        for (let i = 0; i < n; i++) {
          const a = fixedPts[i], b = fixedPts[(i + 1) % n];
          mk('line', { x1: f2(a[0]), y1: f2(a[1]), x2: f2(b[0]), y2: f2(b[1]), stroke: sideCol(i), 'stroke-width': 4, 'stroke-linecap': 'round' }, gC);
        }
      }
      fixedPts.forEach((p, i) => {
        const q = V.add(p, V.mul(V.unit(V.sub(p, fixedC)), st.done ? 24 : 13));
        mk('text', { x: f2(q[0]), y: f2(q[1]), class: 'lbl' }, gT).textContent = L1[i];
      });
      // moving shape (drawn on top so it can always be grabbed)
      const poly = mk('polygon', { fill: 'var(--blue)', 'fill-opacity': 0.18, stroke: st.matched ? 'none' : 'var(--blue)', 'stroke-width': 2, style: 'cursor:grab' }, gM);
      const mLines = st.matched ? [...Array(n)].map((_, i) => mk('line', { stroke: sideCol(i), 'stroke-width': 3, 'stroke-linecap': 'round', 'pointer-events': 'none' }, gM)) : [];
      const mLabels = [...Array(n)].map((_, i) => {
        const t = mk('text', { class: 'lbl', fill: 'var(--blue)', style: 'fill:var(--blue)' }, gT);
        t.textContent = L2[i];
        return t;
      });
      const place = () => {
        const wp = world(), mc = G.centroid(wp);
        poly.setAttribute('points', wp.map(p => p.map(f2).join(',')).join(' '));
        mLines.forEach((l, i) => {
          const a = wp[i], b = wp[(i + 1) % n];
          l.setAttribute('x1', f2(a[0])); l.setAttribute('y1', f2(a[1])); l.setAttribute('x2', f2(b[0])); l.setAttribute('y2', f2(b[1]));
        });
        mLabels.forEach((t, i) => {
          const r = V.add(wp[i], V.mul(V.unit(V.sub(wp[i], mc)), 13));
          t.setAttribute('x', f2(r[0])); t.setAttribute('y', f2(r[1]));
        });
      };
      place();
      let drag = null;
      poly.addEventListener('pointerdown', e => {
        drag = { start: svgPoint(svg, e), pos: st.pos.slice(), wasDone: st.done };
        poly.setPointerCapture(e.pointerId);
      });
      poly.addEventListener('pointermove', e => {
        if (!drag) return;
        const p = svgPoint(svg, e);
        st.pos = [drag.pos[0] + p[0] - drag.start[0], drag.pos[1] + p[1] - drag.start[1]];
        // keep the whole shape (and its labels) inside the picture
        const wp = world(), m = 16;
        const xs = wp.map(q => q[0]), ys = wp.map(q => q[1]);
        st.pos[0] += Math.max(0, m - Math.min(...xs)) - Math.max(0, Math.max(...xs) - (W - m));
        st.pos[1] += Math.max(0, m - Math.min(...ys)) - Math.max(0, Math.max(...ys) - (H - m));
        if (st.done && V.dist(st.pos, fixedC) > 4) { st.done = false; updateStatus(); }
        place();
      });
      const end = () => {
        if (!drag) return;
        const pulledApart = drag.wasDone && V.dist(st.pos, fixedC) > 4;
        drag = null;
        if (pulledApart) { st.done = false; draw(); } else testFit();
      };
      poly.addEventListener('pointerup', end);
      poly.addEventListener('pointercancel', end);
      updateStatus();
    }
    function testFit() {
      const angOk = ((st.ang % 360) + 360) % 360 === 0;
      st.done = !st.flip && angOk && V.dist(st.pos, fixedC) < 38;
      if (st.done) { st.pos = fixedC.slice(); st.matched = true; }
      draw();
    }
    function updateStatus() {
      const n = base.length;
      const pairs = [...L1].map((c, i) => c + ' ↔ ' + L2[i]).join(', ');
      const sym = n === 3 ? '\\triangle ' : '';
      if (st.done) {
        status.className = 'status good';
        status.innerHTML = TEX.render(`They fit exactly, so they are congruent: $${sym}${L1} \\cong ${sym}${L2}$.<br>Corresponding vertices: ${pairs}. Matching sides are shown in the same colour. Drag the blue shape away to compare them side by side.`);
      } else if (st.matched) {
        status.className = 'status good';
        status.innerHTML = TEX.render(`$${sym}${L1} \\cong ${sym}${L2}$ — ${pairs}.<br>Matching sides keep the same colour, wherever you move, turn or flip the blue shape. Drag it back to make them fit again.`);
      } else {
        status.className = 'status';
        const angOk = ((st.ang % 360) + 360) % 360 === 0;
        const hint = st.flip ? 'Hint: this one has been flipped over — you will need the Flip button.'
          : angOk ? 'It faces the right way now — drag it on top of the black one.'
          : 'Turn it until it faces the same way, then drag it on top.';
        status.innerHTML = hint;
      }
    }
    const btn = (t, f, aria) => U.el('button', { type: 'button', class: 'btn ghost small', text: t, 'aria-label': aria || t, onclick: () => { f(); testFit(); } });
    box.append(U.el('div', { class: 'btn-row' },
      btn('↺ Turn', () => { st.ang -= 15; }, 'Turn anticlockwise 15 degrees'),
      btn('↻ Turn', () => { st.ang += 15; }, 'Turn clockwise 15 degrees'),
      btn('Flip', () => { st.flip = !st.flip; st.ang = -st.ang; }),
      btn('New shapes', () => { newShape(); })));
    newShape();
    return box;
  }

  /* ---------- Condition explorer ---------- */
  const ang = (V0, U0, W0) => {
    const a = V.sub(U0, V0), b = V.sub(W0, V0);
    return Math.acos(Math.max(-1, Math.min(1, V.dot(a, b) / (V.len(a) * V.len(b))))) / G.R;
  };
  const d = (p, q) => V.dist(p, q);
  const pol = (r, t) => [r * Math.cos(t * G.R), r * Math.sin(t * G.R)];
  const CONFIG = {
    SSS: { given: '$AB = 5$, $BC = 6$, $CA = 4$', slider: 'Swing side AB around B', min: 15, max: 165, step: 0.1,
      build: t => ({ A: pol(5, t), B: [0, 0], C: [6, 0] }),
      checks: P => [{ l: 'AB', v: d(P.A, P.B), t: 5 }, { l: 'BC', v: d(P.B, P.C), t: 6 }, { l: 'CA', v: d(P.C, P.A), t: 4 }],
      good: true },
    SAS: { given: '$AB = 5$, $\\angle ABC = 50^\\circ$, $BC = 6$', slider: 'Swing side AB around B', min: 15, max: 165, step: 0.1,
      build: t => ({ A: pol(5, t), B: [0, 0], C: [6, 0] }),
      checks: P => [{ l: 'AB', v: d(P.A, P.B), t: 5 }, { l: '∠ABC', v: ang(P.B, P.A, P.C), t: 50, deg: 1 }, { l: 'BC', v: d(P.B, P.C), t: 6 }],
      good: true },
    ASA: { given: '$\\angle ABC = 50^\\circ$, $BC = 6$, $\\angle BCA = 60^\\circ$', slider: 'Slide A along the 50° line', min: 1, max: 10, step: 0.01,
      build: t => ({ A: pol(t, 50), B: [0, 0], C: [6, 0] }),
      checks: P => [{ l: '∠ABC', v: ang(P.B, P.A, P.C), t: 50, deg: 1 }, { l: 'BC', v: d(P.B, P.C), t: 6 }, { l: '∠BCA', v: ang(P.C, P.B, P.A), t: 60, deg: 1 }],
      good: true },
    AAS: { given: '$\\angle ABC = 50^\\circ$, $\\angle BAC = 70^\\circ$, $BC = 6$', slider: 'Slide A along the 50° line', min: 1, max: 10, step: 0.01,
      build: t => ({ A: pol(t, 50), B: [0, 0], C: [6, 0] }),
      checks: P => [{ l: '∠ABC', v: ang(P.B, P.A, P.C), t: 50, deg: 1 }, { l: '∠BAC', v: ang(P.A, P.B, P.C), t: 70, deg: 1 }, { l: 'BC', v: d(P.B, P.C), t: 6 }],
      good: true },
    RHS: { given: '$\\angle BCA = 90^\\circ$, hypotenuse $AB = 6.5$, $BC = 4$', slider: 'Slide A up the perpendicular line', min: 0.5, max: 8, step: 0.01,
      build: t => ({ A: [4, t], B: [0, 0], C: [4, 0] }),
      checks: P => [{ l: '∠BCA', v: ang(P.C, P.B, P.A), t: 90, deg: 1 }, { l: 'AB', v: d(P.A, P.B), t: 6.5 }, { l: 'BC', v: d(P.B, P.C), t: 4 }],
      good: true },
    SSA: { given: '$AB = 6$, $BC = 4$, $\\angle BAC = 35^\\circ$ (the angle is <b>not</b> between the two sides)', slider: 'Slide C along the 35° line', min: 0.5, max: 9, step: 0.01,
      build: t => ({ A: [0, 0], B: [6, 0], C: pol(t, 35) }),
      checks: P => [{ l: 'AB', v: d(P.A, P.B), t: 6 }, { l: 'BC', v: d(P.B, P.C), t: 4 }, { l: '∠BAC', v: ang(P.A, P.B, P.C), t: 35, deg: 1 }],
      good: false },
    AAA: { given: '$\\angle BAC = 70^\\circ$, $\\angle ABC = 50^\\circ$, $\\angle BCA = 60^\\circ$', slider: 'Change the length of BC', min: 2.5, max: 8, step: 0.01,
      build: s => { const ab = s * Math.sin(60 * G.R) / Math.sin(70 * G.R); return { A: pol(ab, 50), B: [0, 0], C: [s, 0] }; },
      checks: P => [{ l: '∠BAC', v: ang(P.A, P.B, P.C), t: 70, deg: 1 }, { l: '∠ABC', v: ang(P.B, P.A, P.C), t: 50, deg: 1 }, { l: '∠BCA', v: ang(P.C, P.B, P.A), t: 60, deg: 1 }],
      good: false },
  };
  const okCheck = c => Math.abs(c.v - c.t) <= (c.deg ? 0.35 : 0.03);

  function solutions(cfg) {
    const N = 6000, runs = [];
    let cur = null;
    for (let i = 0; i <= N; i++) {
      const t = cfg.min + (cfg.max - cfg.min) * i / N;
      const all = cfg.checks(cfg.build(t)).every(okCheck);
      if (all) { if (!cur) cur = [t, t]; else cur[1] = t; } else if (cur) { runs.push(cur); cur = null; }
    }
    if (cur) runs.push(cur);
    return runs.map(r => (r[0] + r[1]) / 2);
  }

  function explorer() {
    const box = U.el('div', { class: 'demo' });
    box.append(U.el('div', { class: 'demo-title', text: 'Condition explorer' }));
    box.append(U.el('p', { class: 'small', text: 'Three parts are fixed. Move the slider and try to build a DIFFERENT triangle that still has all three parts. When can you? When can\'t you?' }));
    const tabs = U.el('div', { class: 'seg-tabs', role: 'tablist' });
    const givenP = U.el('p');
    const svg = mk('svg', { viewBox: '0 0 340 230', class: 'fig', role: 'img', 'aria-label': 'Triangle being built' });
    svg.style.maxWidth = '560px';
    const sliderLab = U.el('label', { class: 'small' });
    const slider = U.el('input', { type: 'range' });
    sliderLab.append(slider);
    const checks = U.el('ul', { class: 'checks' });
    const status = U.el('div', { class: 'status', 'aria-live': 'polite' });
    box.append(tabs, givenP, U.el('div', { class: 'fig-wrap' }, svg), sliderLab, checks, status);
    let cfg, sols, found, key, S, ox, oy;
    const toSvg = p => [ox + p[0] * S, oy - p[1] * S];

    function select(k) {
      key = k; cfg = CONFIG[k]; sols = solutions(cfg); found = new Set();
      tabs.querySelectorAll('button').forEach(b => { b.classList.toggle('on', b.dataset.k === k); b.setAttribute('aria-selected', b.dataset.k === k); });
      givenP.innerHTML = '<b>Fixed:</b> ' + TEX.render(cfg.given);
      // scale to fit all positions
      const all = [];
      for (let i = 0; i <= 40; i++) { const P = cfg.build(cfg.min + (cfg.max - cfg.min) * i / 40); all.push(P.A, P.B, P.C); }
      const xs = all.map(p => p[0]), ys = all.map(p => p[1]);
      const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
      S = Math.min(280 / (maxx - minx || 1), 180 / (maxy - miny || 1));
      ox = 170 - (minx + maxx) / 2 * S; oy = 115 + (miny + maxy) / 2 * S;
      slider.min = cfg.min; slider.max = cfg.max; slider.step = cfg.step;
      slider.value = cfg.min + (cfg.max - cfg.min) * 0.15;
      slider.setAttribute('aria-label', cfg.slider);
      sliderLab.firstChild && sliderLab.firstChild.nodeType === 3 ? (sliderLab.firstChild.textContent = cfg.slider) : sliderLab.prepend(cfg.slider);
      update();
    }

    function update() {
      let t = Number(slider.value);
      const snap = (cfg.max - cfg.min) * 0.012;
      if (key !== 'AAA') sols.forEach((s, i) => { if (Math.abs(t - s) < snap) { t = s; found.add(i); } });
      const P = cfg.build(t);
      const cs = cfg.checks(P);
      const allOk = cs.every(okCheck);
      U.clear(svg);
      // ghosts of found triangles
      if (key !== 'AAA') found.forEach(i => {
        const Q = cfg.build(sols[i]);
        mk('polygon', { points: [Q.A, Q.B, Q.C].map(toSvg).map(p => p.map(f2).join(',')).join(' '), class: 'ghost' }, svg);
      });
      const pts = [P.A, P.B, P.C].map(toSvg);
      mk('polygon', { points: pts.map(p => p.map(f2).join(',')).join(' '), fill: allOk ? 'var(--blue)' : 'none', 'fill-opacity': 0.15, stroke: allOk ? 'var(--blue)' : 'var(--ink)', 'stroke-width': 2 }, svg);
      const c = G.centroid(pts);
      ['A', 'B', 'C'].forEach((L, i) => {
        const q = V.add(pts[i], V.mul(V.unit(V.sub(pts[i], c)), 13));
        mk('text', { x: f2(q[0]), y: f2(q[1]), class: 'lbl' }, svg).textContent = L;
      });
      U.clear(checks);
      cs.forEach(ch => {
        const good = okCheck(ch);
        const val = ch.deg ? Math.round(ch.v) + '°' : ch.v.toFixed(2);
        const tgt = ch.deg ? ch.t + '°' : ch.t;
        checks.append(U.el('li', { class: good ? 'yes' : 'no' }, U.el('span', { class: 'mk', text: good ? '✓' : '·' }), U.el('span', { html: TEX.m(`${ch.l} = ${val}`) + (good ? '' : ` <span class="muted">(needs ${tgt})</span>`) })));
      });
      let msg = '', good = false;
      if (key === 'AAA') {
        good = true;
        msg = 'All three angles match at <b>every</b> size. Same shape, different sizes — so AAA is <b>not</b> a condition for congruent triangles.';
      } else if (allOk) {
        good = true;
        if (cfg.good) msg = `This is the <b>only</b> position that works — you cannot build a different triangle. So ${key} guarantees congruence.`;
        else if (found.size < sols.length) msg = 'Found one triangle with all three parts. Is it the only one? Keep sliding…';
        else msg = 'Two <b>different</b> triangles both have these three parts (see the dashed outline). So SSA is <b>not</b> a condition for congruent triangles.';
      } else {
        msg = key === 'SSA' && found.size ? `You have found ${found.size} of ${sols.length}. Keep sliding.` : 'Not all three parts match yet.';
      }
      status.className = 'status' + (good ? ' good' : '');
      status.innerHTML = msg;
    }
    Object.keys(CONFIG).forEach(k => {
      const b = U.el('button', { type: 'button', role: 'tab', 'data-k': k, class: CONFIG[k].good ? '' : 'bad-cond', text: k });
      b.addEventListener('click', () => select(k));
      tabs.append(b);
    });
    slider.addEventListener('input', update);
    select('SSS');
    return box;
  }

  /* ---------- Figure with toggle buttons that highlight parts ---------- */
  function hlfig(o) {
    const box = U.el('div', { class: 'demo' });
    if (o.title) box.append(U.el('div', { class: 'demo-title', text: o.title }));
    if (o.intro) box.append(U.el('p', { class: 'small', html: TEX.render(o.intro) }));
    const fig = G.draw(o.fig);
    const note = U.el('div', { class: 'status', 'aria-live': 'polite' });
    const row = U.el('div', { class: 'btn-row' });
    o.buttons.forEach(b => {
      row.append(U.el('button', {
        type: 'button', class: 'btn ghost small', html: TEX.render(b.label), onclick: () => {
          fig.clearHL(); fig.highlight(EX.hlList(b.hl)); note.innerHTML = TEX.render(b.note || '');
        },
      }));
    });
    row.append(U.el('button', { type: 'button', class: 'btn ghost small', text: 'Clear', onclick: () => { fig.clearHL(); note.innerHTML = ''; } }));
    box.append(U.el('div', { class: 'fig-wrap' }, fig.svg), row, note);
    return box;
  }

  return { overlay, explorer, hlfig };
})();
