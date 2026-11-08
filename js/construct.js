'use strict';
/* Compass-and-straight-edge constructions, animated step by step (Section 5.5). */
const CONS = (() => {
  const { V, mk } = G;
  const f2 = x => Math.round(x * 100) / 100;
  const deg = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]) / G.R;
  const at = (c, r, a) => [c[0] + r * Math.cos(a * G.R), c[1] + r * Math.sin(a * G.R)];
  function cc(c1, r1, c2, r2) {
    const d = V.dist(c1, c2), a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
    const u = V.unit(V.sub(c2, c1)), m = V.add(c1, V.mul(u, a)), p = V.perp(u);
    return [V.add(m, V.mul(p, h)), V.add(m, V.mul(p, -h))];
  }
  const higher = (p, q) => (p[1] < q[1] ? p : q);
  // drawing primitives
  const seg = (a, b, cls = 'c-line') => ({ k: 'seg', a, b, cls });
  const ext = (a, b, e1, e2, cls = 'c-line') => { const u = V.unit(V.sub(b, a)); return { k: 'seg', a: V.add(a, V.mul(u, -e1)), b: V.add(b, V.mul(u, e2)), cls }; };
  const arc = (c, r, a1, a2) => ({ k: 'arc', c, r, a1: Math.min(a1, a2), a2: Math.max(a1, a2) });
  const arcAt = (c, r, target, span = 18) => { const a = deg(c, target); return arc(c, r, a - span, a + span); };
  const pt = (p, label, lp) => ({ k: 'pt', p, label, lp });

  const LIST = [
    {
      id: 'perp-bisector', title: 'Perpendicular bisector of a line segment',
      build() {
        const A = [80, 160], B = [260, 110], r = 0.68 * V.dist(A, B);
        const [P1, Q1] = cc(A, r, B, r); const P = higher(P1, Q1), Q = P === P1 ? Q1 : P1;
        const M = V.mid(A, B);
        return [
          { text: 'We are given the line segment AB.', els: [seg(A, B), pt(A, 'A', [-12, 6]), pt(B, 'B', [12, 4])] },
          { text: 'Open the compasses to <b>more than half</b> of AB. With centre A, draw an arc above AB and an arc below AB.', els: [arcAt(A, r, P), arcAt(A, r, Q)] },
          { text: 'Keep the <b>same radius</b>. With centre B, draw arcs cutting the first two arcs at P and Q.', els: [arcAt(B, r, P), arcAt(B, r, Q), pt(P, 'P', [0, -12]), pt(Q, 'Q', [0, 14])] },
          { text: 'Join PQ. PQ is the perpendicular bisector of AB: it cuts AB at its mid-point M at 90°.', els: [ext(P, Q, 15, 15, 'c-result'), pt(M, 'M', [12, 10])] },
        ];
      },
      why: 'AP = BP = AQ = BQ (same radius) and PQ is a common side, so △APQ ≅ △BPQ (SSS). Then ∠APM = ∠BPM, so △APM ≅ △BPM (SAS). Hence AM = BM, and ∠AMP = ∠BMP = 90° (they are equal and add up to 180°).',
    },
    {
      id: 'angle-bisector', title: 'Angle bisector',
      build() {
        const B = [70, 190], A = at(B, 210, -52), C = [320, 190];
        const P = at(B, 95, -52), Q = at(B, 95, 0);
        const [R1, R2] = cc(P, 80, Q, 80); const R = V.dist(R1, B) > V.dist(R2, B) ? R1 : R2;
        return [
          { text: 'We are given ∠ABC.', els: [seg(B, A), seg(B, C), pt(A, 'A', [8, -8]), pt(B, 'B', [-12, 6]), pt(C, 'C', [10, 6])] },
          { text: 'With centre B, draw an arc cutting BA at P and BC at Q.', els: [arc(B, 95, -62, 10), pt(P, 'P', [-12, -4]), pt(Q, 'Q', [4, 14])] },
          { text: 'With centres P and Q and the <b>same radius</b>, draw two arcs that meet at R.', els: [arcAt(P, 80, R, 16), arcAt(Q, 80, R, 16), pt(R, 'R', [10, -8])] },
          { text: 'Join BR. BR is the angle bisector: ∠ABR = ∠RBC.', els: [ext(B, R, 0, 60, 'c-result')] },
        ];
      },
      why: 'BP = BQ (same radius), PR = QR (same radius) and BR is a common side, so △BPR ≅ △BQR (SSS). Hence ∠PBR = ∠QBR (corr. ∠s, ≅ △s).',
    },
    {
      id: 'copy-angle', title: 'Copy an angle',
      build() {
        const B = [40, 120], A = at(B, 130, -38), C = [170, 120];
        const E = [190, 210], F = [325, 210];
        const r = 62, P = at(B, r, -38), Q = at(B, r, 0), R = at(E, r, 0), pq = V.dist(P, Q);
        const [S1, S2] = cc(E, r, R, pq); const S = higher(S1, S2);
        return [
          { text: 'We are given ∠ABC, and a ray EF where the copy will go.', els: [seg(B, A), seg(B, C), seg(E, F), pt(A, 'A', [8, -6]), pt(B, 'B', [-12, 4]), pt(C, 'C', [10, 4]), pt(E, 'E', [-12, 4]), pt(F, 'F', [10, 4])] },
          { text: 'With centre B, draw an arc cutting BA at P and BC at Q.', els: [arc(B, r, -50, 8), pt(P, 'P', [-10, -6]), pt(Q, 'Q', [4, 14])] },
          { text: 'With the <b>same radius</b> and centre E, draw an arc cutting EF at R.', els: [arc(E, r, -65, 8), pt(R, 'R', [4, 14])] },
          { text: 'Set the compasses to the distance PQ. With centre R, draw an arc cutting the last arc at S.', els: [arcAt(R, pq, S, 18), pt(S, 'S', [-4, -12])] },
          { text: 'Join ES and extend it. ∠SER = ∠ABC.', els: [ext(E, S, 0, 60, 'c-result')] },
        ];
      },
      why: 'BP = ES, BQ = ER (same radius) and PQ = SR (same setting), so △BPQ ≅ △ESR (SSS). Hence ∠PBQ = ∠SER (corr. ∠s, ≅ △s).',
    },
    {
      id: 'perp-point', title: 'Perpendicular through a point on a line',
      build() {
        const A = [30, 190], B = [310, 190], P = [170, 190];
        const X = [100, 190], Y = [240, 190];
        const [R1, R2] = cc(X, 110, Y, 110); const R = higher(R1, R2);
        return [
          { text: 'We are given a line AB and a point P on it.', els: [seg(A, B), pt(A, 'A', [-4, 14]), pt(B, 'B', [4, 14]), pt(P, 'P', [8, 14])] },
          { text: 'With centre P, draw arcs cutting AB at X and Y (so PX = PY).', els: [arcAt(P, 70, X, 14), arcAt(P, 70, Y, 14), pt(X, 'X', [0, 14]), pt(Y, 'Y', [0, 14])] },
          { text: 'With centres X and Y and a <b>larger, equal</b> radius, draw arcs meeting at R.', els: [arcAt(X, 110, R, 14), arcAt(Y, 110, R, 14), pt(R, 'R', [10, -8])] },
          { text: 'Join PR. PR ⊥ AB.', els: [ext(P, R, 0, 20, 'c-result')] },
        ];
      },
      why: 'PX = PY, XR = YR and PR is common, so △PXR ≅ △PYR (SSS). Hence ∠XPR = ∠YPR. They add up to 180° (adj. ∠s on st. line), so each is 90°.',
    },
    {
      id: 'parallel', title: 'Line through a point parallel to a line',
      build() {
        const P = [30, 200], Q = [320, 165], A = [175, 70];
        const B = V.add(P, V.mul(V.sub(Q, P), 80 / 290));
        const r = 50, uBA = V.unit(V.sub(A, B)), uPQ = V.unit(V.sub(Q, P));
        const X = V.add(B, V.mul(uPQ, r)), Y = V.add(B, V.mul(uBA, r));
        const Y2 = V.add(A, V.mul(uBA, r)), X2 = V.add(A, V.mul(uPQ, r)), xy = V.dist(X, Y);
        return [
          { text: 'We are given a line PQ and a point A not on it.', els: [seg(P, Q), pt(P, 'P', [-6, 14]), pt(Q, 'Q', [8, 12]), pt(A, 'A', [-12, -4])] },
          { text: 'Draw any line through A cutting PQ at B. Extend it beyond A.', els: [ext(B, A, 20, 70), pt(B, 'B', [-4, 15])] },
          { text: 'With centre B, draw an arc cutting BQ at X and BA at Y. With the <b>same radius</b> and centre A, draw an arc cutting the extended line at Y′.', els: [arc(B, r, deg(B, Y) - 10, deg(B, X) + 10), arc(A, r, deg(A, Y2) - 10, deg(A, X2) + 25), pt(X, 'X', [6, 12]), pt(Y, 'Y', [-12, -2]), pt(Y2, 'Y′', [-14, -4])] },
          { text: 'Set the compasses to XY. With centre Y′, draw an arc cutting the arc at X′.', els: [arcAt(Y2, xy, X2, 20), pt(X2, 'X′', [8, -10])] },
          { text: 'Join AX′ and extend it both ways. This line is parallel to PQ.', els: [ext(A, X2, 130, 110, 'c-result')] },
        ];
      },
      why: 'BX = AX′, BY = AY′ (same radius) and XY = X′Y′, so △BXY ≅ △AX′Y′ (SSS). Hence ∠XBY = ∠X′AY′. These are corresponding angles, and equal corresponding angles mean the lines are parallel (corr. ∠s equal).',
    },
    {
      id: 'sixty', title: 'An angle of 60°',
      build() {
        const O = [60, 195], E = [320, 195], r = 140;
        const P = [O[0] + r, O[1]], Q = at(O, r, -60);
        return [
          { text: 'Draw a ray OE.', els: [seg(O, E), pt(O, 'O', [-12, 4])] },
          { text: 'With centre O, draw a large arc cutting OE at P.', els: [arc(O, r, -75, 6), pt(P, 'P', [4, 14])] },
          { text: 'With the <b>same radius</b> and centre P, draw an arc cutting the first arc at Q.', els: [arcAt(P, r, Q, 12), pt(Q, 'Q', [-6, -12])] },
          { text: 'Join OQ. ∠QOP = 60°.', els: [ext(O, Q, 0, 25, 'c-result')] },
        ];
      },
      why: 'OP = OQ = PQ (all equal to the radius), so △OPQ is equilateral and each of its angles is 60°.',
    },
    {
      id: 'thirty', title: 'An angle of 30°',
      build() {
        const O = [60, 195], E = [320, 195], r = 140;
        const P = [O[0] + r, O[1]], Q = at(O, r, -60);
        const [R1, R2] = cc(P, 90, Q, 90); const R = V.dist(R1, O) > V.dist(R2, O) ? R1 : R2;
        return [
          { text: 'Construct a 60° angle ∠QOP (as in the 60° construction).', els: [seg(O, E), arc(O, r, -75, 6), arcAt(P, r, Q, 12), seg(O, Q), pt(O, 'O', [-12, 4]), pt(P, 'P', [4, 14]), pt(Q, 'Q', [-6, -12])] },
          { text: 'With centres P and Q and the <b>same radius</b>, draw two arcs meeting at R.', els: [arcAt(P, 90, R, 16), arcAt(Q, 90, R, 16), pt(R, 'R', [10, -6])] },
          { text: 'Join OR. OR bisects the 60° angle, so ∠ROP = 30°.', els: [ext(O, R, 0, 40, 'c-result')] },
        ];
      },
      why: 'Bisecting 60° gives 30°. The bisector works because △OPR ≅ △OQR (SSS).',
    },
    {
      id: 'fortyfive', title: 'An angle of 45°',
      build() {
        const A = [30, 200], B = [320, 200], P = [150, 200];
        const X = [85, 200], Y = [215, 200];
        const [R1, R2] = cc(X, 105, Y, 105); const R = higher(R1, R2);
        const Yb = [P[0] + 80, P[1]], Z = [P[0], P[1] - 80];
        const [T1, T2] = cc(Yb, 80, Z, 80); const T = V.dist(T1, P) > V.dist(T2, P) ? T1 : T2;
        return [
          { text: 'Construct the perpendicular PR to AB at P (as in the perpendicular construction).', els: [seg(A, B), arcAt(P, 65, X, 12), arcAt(P, 65, Y, 12), arcAt(X, 105, R, 12), arcAt(Y, 105, R, 12), ext(P, R, 0, 15), pt(A, 'A', [-4, 14]), pt(B, 'B', [4, 14]), pt(P, 'P', [-4, 15]), pt(R, 'R', [-12, -4])] },
          { text: 'With centre P, draw an arc cutting PB at Y and PR at Z.', els: [arc(P, 80, -98, 8), pt(Yb, 'Y', [4, 14]), pt(Z, 'Z', [-12, 2])] },
          { text: 'With centres Y and Z and the <b>same radius</b>, draw arcs meeting at T.', els: [arcAt(Yb, 80, T, 16), arcAt(Z, 80, T, 16), pt(T, 'T', [10, -6])] },
          { text: 'Join PT. PT bisects the right angle, so ∠TPB = 45°.', els: [ext(P, T, 0, 40, 'c-result')] },
        ];
      },
      why: 'First make 90° (perpendicular), then bisect it: half of 90° is 45°.',
    },
  ];

  function render() {
    const box = U.el('div', { class: 'demo' });
    const list = U.el('div', { class: 'cons-list', role: 'tablist' });
    const title = U.el('div', { class: 'demo-title' });
    const svg = mk('svg', { viewBox: '0 0 340 240', class: 'fig', role: 'img', 'aria-label': 'Construction drawing' });
    svg.style.maxWidth = '560px';
    const stepText = U.el('div', { class: 'cons-step', 'aria-live': 'polite' });
    const why = U.el('details', {}, U.el('summary', { text: 'Why does it work?' }), U.el('p'));
    let cur, steps, i = 0, timer = null;
    const prev = U.el('button', { type: 'button', class: 'btn ghost small', text: '◀ Back', onclick: () => go(i - 1) });
    const next = U.el('button', { type: 'button', class: 'btn small', text: 'Next ▶', onclick: () => go(i + 1) });
    const play = U.el('button', { type: 'button', class: 'btn ghost small', text: 'Play all', onclick: () => playAll() });
    const again = U.el('button', { type: 'button', class: 'btn ghost small', text: 'Start again', onclick: () => { stop(); go(0); } });
    box.append(list, title, U.el('div', { class: 'fig-wrap' }, svg), stepText, U.el('div', { class: 'btn-row' }, prev, next, play, again), why);

    function drawEl(e, isNew) {
      let node;
      if (e.k === 'seg') {
        node = mk('line', { x1: f2(e.a[0]), y1: f2(e.a[1]), x2: f2(e.b[0]), y2: f2(e.b[1]), class: e.cls }, svg);
        if (isNew) animate(node, V.dist(e.a, e.b));
      } else if (e.k === 'arc') {
        const s = at(e.c, e.r, e.a1), t = at(e.c, e.r, e.a2), span = e.a2 - e.a1;
        node = mk('path', { d: `M${f2(s[0])} ${f2(s[1])} A${f2(e.r)} ${f2(e.r)} 0 ${span > 180 ? 1 : 0} 1 ${f2(t[0])} ${f2(t[1])}`, class: 'c-arc' }, svg);
        if (isNew) animate(node, e.r * span * G.R);
      } else if (e.k === 'pt') {
        mk('circle', { cx: f2(e.p[0]), cy: f2(e.p[1]), r: 2.8, class: 'c-pt' + (isNew ? ' new' : '') }, svg);
        if (e.label) {
          const lp = e.lp || [8, -8];
          mk('text', { x: f2(e.p[0] + lp[0]), y: f2(e.p[1] + lp[1]), class: 'lbl' }, svg).textContent = e.label;
        }
      }
    }
    function animate(node, len) {
      if (!node.animate) return;
      node.style.strokeDasharray = len;
      const a = node.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 1100, easing: 'ease-out', fill: 'forwards' });
      a.onfinish = () => { node.style.strokeDasharray = ''; };
    }
    function go(k) {
      i = Math.max(0, Math.min(steps.length - 1, k));
      U.clear(svg);
      // points drawn last so they sit on top
      const pts = [];
      for (let j = 0; j <= i; j++) steps[j].els.forEach(e => { if (e.k === 'pt') pts.push([e, j === i]); else drawEl(e, j === i); });
      pts.forEach(([e, n]) => drawEl(e, n));
      stepText.innerHTML = `<span class="stepno">Step ${i + 1} of ${steps.length}.</span> ` + steps[i].text;
      prev.disabled = i === 0; next.disabled = i === steps.length - 1;
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; play.textContent = 'Play all'; } }
    function playAll() {
      if (timer) { stop(); return; }
      go(0);
      play.textContent = 'Pause';
      timer = setInterval(() => { if (i >= steps.length - 1) stop(); else go(i + 1); }, 2200);
    }
    function select(c) {
      stop();
      cur = c; steps = c.build();
      list.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.id === c.id));
      title.textContent = c.title;
      why.querySelector('p').textContent = c.why;
      why.open = false;
      go(0);
    }
    LIST.forEach(c => {
      const b = U.el('button', { type: 'button', role: 'tab', 'data-id': c.id, text: c.title });
      b.addEventListener('click', () => select(c));
      list.append(b);
    });
    select(LIST[0]);
    return box;
  }
  return { render, LIST };
})();
