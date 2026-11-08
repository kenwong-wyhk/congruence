'use strict';
/* Section 5.4 Concept of Congruent 2-D Figures */
(() => {
  // Quadrilateral shapes (computed so the drawn angles match the labels).
  const Q1 = [[0, 0], [6, 0], [4.76, -4.33], [-0.56, -1.96]];              // 106, 74, 82, 98
  const Q2 = [[0, 0], [5.5, 0], [4.13, -3.22], [1.24, -2.66]];             // 65, 67, 102, 126 (AB 5.5, BC 3.5)
  const Q3a = [[0, 0], [4.5, 0], [1.25, -8.93], [-1.24, -4.62]];           // 105, 70, 50, 135
  const Q3b = [[0, 0], [2.5, 0], [0.45, -5.64], [-1.78, -1.78]];           // 135, 70, 50, 105
  const QP3 = [[0, 0], [9, 0], [10.15, -10.94], [0.35, -9.91]];            // 88, 96, 78, 98
  const QP4 = [[0, 0], [10, 0], [13.69, -4.73], [-1.06, -10.10]];          // C96, D128, A72, B64 (order C D A B)
  const QP5a = [[0, 0], [3, 0], [1.19, -6.76], [-1.05, -2.88]];            // 110, 75, 45, 130
  const QP5b = [[0, 0], [3.5, 0], [1.17, -8.69], [-2.28, -2.72]];          // 130, 75, 45, 110

  // grid figures for "which are congruent?"
  function gridFig() {
    const S = 14;
    const shapes = [
      { keys: 'ABCDEF', pts: [[0, 0], [2, 0], [2, 2], [1, 2], [1, 3], [0, 3]], at: [2, 2], tag: 'Given' },
      { keys: 'GHIJKL', pts: [[3, 0], [3, 2], [1, 2], [1, 1], [0, 1], [0, 0]], at: [8, 2.5], tag: 'I' },
      { keys: 'MNOPQR', pts: [[2, 0], [0, 0], [0, 2], [1, 2], [1, 3], [2, 3]], at: [14.5, 2], tag: 'II' },
      { keys: 'STUVWX', pts: [[0, 0], [2, 0], [2, 2], [1, 2], [1, 4], [0, 4]], at: [20, 1.5], tag: 'III' },
    ];
    const pts = {}, polys = [], texts = [];
    shapes.forEach(sh => {
      sh.pts.forEach((p, i) => { pts[sh.keys[i]] = [(sh.at[0] + p[0]) * S, (sh.at[1] + p[1]) * S]; });
      polys.push(sh.keys);
      texts.push({ at: [(sh.at[0] + 1.2) * S, 1.2 * S], t: sh.tag });
    });
    return { w: 336, h: 110, pts, polys, texts, grid: S, noLabels: true, fit: false };
  }

  C5.sections['5.4'] = {
    id: '5.4',
    title: 'Concept of Congruent 2-D Figures',
    blurb: 'Congruent polygons, finding corresponding parts by inspection, and when figures are NOT congruent.',
    traps: ['poly-arrange', 'flip', 'area', 'order', 'fullname'],
    learn: [
      { title: 'Congruent figures', key: 'Figures which can <b>coincide</b> with each other are called <b>congruent figures</b>. They have the same shape and the same size.<br>Sliding, turning and flipping do not change a figure, so the result is congruent to the original.' },
      { demo: 'overlay', opts: { title: 'Try it with quadrilaterals', shape: Q1, letters1: 'ABCD', letters2: 'PQRS', intro: 'Drag, turn and flip $PQRS$ so it fits exactly on $ABCD$.' } },
      { title: 'Congruent polygons', key: 'Two polygons are congruent if<ol><li>each pair of corresponding sides are equal, and</li><li>each pair of corresponding angles are equal.</li></ol>If $ABCD \\cong PQRS$, then<br>$AB = PQ$, $BC = QR$, $CD = RS$, $DA = SP$, and<br>$\\angle DAB = \\angle SPQ$, $\\angle ABC = \\angle PQR$, $\\angle BCD = \\angle QRS$, $\\angle CDA = \\angle RSP$.',
        fig: { w: 340, h: 170, make: [{ tri: 'ABCD', shape: Q1, box: [15, 20, 140, 130] }], derive: [{ src: 'ABCD', dst: 'PQRS', shift: [175, 0] }], polys: ['ABCD', 'PQRS'], ticks: { AB: 1, PQ: 1, BC: 2, QR: 2, CD: 3, RS: 3 }, arcs: { DAB: 1, SPQ: 1, ABC: 2, PQR: 2, BCD: 3, QRS: 3 } } },
      { tip: 'In a polygon, the full name of an angle uses the two neighbouring vertices: the angle at A in $ABCD$ is $\\angle DAB$ (or $\\angle BAD$).', title: 'Full angle names in polygons' },
      { title: 'Always congruent if…', key: '<ul><li>two <b>circles</b> have equal radii (or equal areas, or equal circumferences);</li><li>two <b>squares</b> have equal sides (or equal areas, or equal perimeters);</li><li>two <b>regular polygons</b> with the same number of sides have equal sides (or equal perimeters).</li></ul>But two rectangles, or two parallelograms, with the same area are <b>not</b> necessarily congruent.' },
      { title: 'Finding the correspondence by inspection', tip: 'Look for a part that appears only once (a unique angle or side). Match it first. Then walk around both shapes in the same direction — or in opposite directions if one is flipped.' },
      { title: 'Same angles ≠ congruent', tip: 'Two quadrilaterals can have exactly the same four angles and still not be congruent, if the angles are in a different order around the shape. See Example 3.' },
    ],
    examples: [
      {
        level: 1,
        q: 'In the figure, $ABCD \\cong PQRS$. Find $x$, $y$ and $z$.',
        fig: { w: 340, h: 180, make: [{ tri: 'ABCD', shape: Q1, box: [5, 20, 130, 130] }], derive: [{ src: 'ABCD', dst: 'PQRS', rot: 35, at: [282, 92] }], polys: ['ABCD', 'PQRS'], at: { BCD: 'x', DAB: 'y', QRS: '82°', SPQ: '106°' }, st: { AB: '6 cm', BC: '4.5 cm', PQ: 'z cm' } },
        tip: 'When $ABCD \\cong PQRS$: $A \\leftrightarrow P$, $B \\leftrightarrow Q$, $C \\leftrightarrow R$, $D \\leftrightarrow S$.',
        steps: [
          { s: '∵ ABCD ≅ PQRS' },
          { s: '∴ ∠BCD = ∠QRS', hl: [['BCD', 'QRS', 1]] },
          { s: 'x = \\underline{\\underline{82°}}' },
          { s: '∠DAB = ∠SPQ', hl: [['DAB', 'SPQ', 2]] },
          { s: 'y = \\underline{\\underline{106°}}' },
          { s: 'PQ = AB', hl: [['AB', 'PQ', 3]] },
          { s: 'z = \\underline{\\underline{6}}' },
        ],
      },
      {
        level: 1,
        q: 'In the figure, the two quadrilaterals are congruent. Find $BC$ and $\\angle BCD$.',
        fig: { w: 400, h: 200, make: [{ tri: 'ABCD', shape: Q2, box: [5, 20, 170, 150] }], derive: [{ src: 'ABCD', dst: 'PSRQ', flip: true, rot: 15, at: [325, 100] }], polys: ['ABCD', 'PQRS'], at: { DAB: '65°', CDA: '126°', SPQ: '65°', PQR: '126°', QRS: '102°', RSP: '67°' }, arcR: 13, st: { SR: '7 cm', PS: '11 cm' } },
        tip: 'Find two pairs of matching angles: $\\angle DAB = \\angle SPQ = 65^\\circ$ and $\\angle CDA = \\angle PQR = 126^\\circ$. So $A \\leftrightarrow P$ and $D \\leftrightarrow Q$.',
        steps: [
          { t: 'By inspection, $A$, $B$, $C$, $D$ correspond to $P$, $S$, $R$, $Q$ respectively.', hl: [['DAB', 'SPQ', 1], ['CDA', 'PQR', 2]] },
          { s: '∴ ABCD ≅ PSRQ' },
          { s: 'BC = SR', hl: [['BC', 'SR', 3]] },
          { s: '= \\underline{\\underline{7 cm}}' },
          { s: '∠BCD = ∠SRQ', hl: [['BCD', 'QRS', 1]] },
          { s: '= \\underline{\\underline{102°}}' },
        ],
      },
      {
        level: 2,
        q: 'Refer to the figure. Explain why the two quadrilaterals are not congruent.',
        fig: { w: 340, h: 190, make: [{ tri: 'ABCD', shape: Q3a, box: [10, 15, 150, 160], rot: 75 }, { tri: 'WXYZ', shape: Q3b, box: [185, 15, 145, 160], rot: 75 }], polys: ['ABCD', 'WXYZ'], at: { DAB: '105°', ABC: '70°', BCD: '50°', CDA: '135°', ZWX: '135°', WXY: '70°', XYZ: '50°', YZW: '105°' }, arcR: 13 },
        tip: 'Both shapes have angles 105°, 70°, 50° and 135°. Check what is <b>next to</b> each angle.',
        steps: [
          { t: 'Only $\\angle DAB$ and $\\angle YZW$ are $105^\\circ$.', hl: [['DAB', 'YZW', 1]] },
          { t: 'If the quadrilaterals were congruent, $\\angle DAB$ would correspond to $\\angle YZW$.' },
          { t: 'The angles next to $\\angle DAB$ are $70^\\circ$ and $135^\\circ$.', hl: [['ABC', 'CDA', 2]] },
          { t: 'The angles next to $\\angle YZW$ are $50^\\circ$ and $135^\\circ$ — none of them is $70^\\circ$.', hl: [['XYZ', 'ZWX', 3]] },
          { t: 'So $ABCD$ and $WXYZ$ are <b>not</b> congruent.' },
        ],
      },
    ],
    practice: [
      {
        id: '54-1', level: 1, type: 'mcq',
        q: 'Which of the following are true?<br>I. Any two parallelograms with the same area must be congruent.<br>II. Any two circles with the same circumference must be congruent.<br>III. Any two squares with the same perimeter must be congruent.',
        options: ['I and II only', 'I and III only', 'II and III only', 'I, II and III'],
        ans: 2,
        why: { 0: 'I is false: a 2 × 6 and a 3 × 4 rectangle (both parallelograms) have the same area.', 1: 'I is false: parallelograms with the same area can have different shapes.', 3: 'I is false: parallelograms with the same area can have different shapes.' },
        whyTrap: { 0: 'area', 1: 'area', 3: 'area' },
        trap: 'area',
        sol: ['II: the circumference fixes the radius, so the circles are congruent. ✓', 'III: the perimeter fixes the side, so the squares are congruent. ✓', 'I: same area does not fix the shape of a parallelogram. ✗', 'The answer is <b>C</b>.'],
      },
      {
        id: '54-2', level: 1,
        q: 'It is given that $ABCDE \\cong QPTSR$, $AB = 11$ cm, $\\angle CDE = 128^\\circ$ and $\\angle DEA = 96^\\circ$. Find',
        letters: 'ABCDEPQRST',
        lines: ['(a) $QP = $ [[num:11]] cm', '(b) $\\angle TSR = $ [[num:128]]°', '(c) $\\angle SRQ = $ [[num:96]]°'],
        wrongs: [{ tok: 1, val: 96, hint: 'The vertex of ∠TSR is S, the 4th letter of QPTSR. The 4th letter of ABCDE is D.' }, { tok: 2, val: 128, hint: 'The vertex of ∠SRQ is R, the 5th letter. The 5th letter of ABCDE is E.' }],
        hints: ['A ↔ Q, B ↔ P, C ↔ T, D ↔ S, E ↔ R.'],
        trap: 'order',
        sol: [{ t: '$A \\leftrightarrow Q$, $B \\leftrightarrow P$, $C \\leftrightarrow T$, $D \\leftrightarrow S$, $E \\leftrightarrow R$' }, { s: 'QP = AB = 11 cm' }, { s: '∠TSR = ∠CDE = 128°' }, { s: '∠SRQ = ∠DEA = 96°' }],
      },
      {
        id: '54-3', level: 1, type: 'mcq',
        q: 'In the figure, $ABCD \\cong HGFE$. Find $x$ and $y$.',
        fig: { w: 340, h: 180, make: [{ tri: 'ABCD', shape: QP3, box: [5, 20, 130, 135] }], derive: [{ src: 'ABCD', dst: 'HGFE', flip: true, rot: 180, at: [270, 88] }], polys: ['ABCD', 'HGFE'], at: { ABC: '96°', BCD: '78°', HGF: 'x' }, st: { AB: '9 cm', BC: '11 cm', FG: 'y cm' } },
        options: ['$x = 78^\\circ$, $y = 9$', '$x = 78^\\circ$, $y = 11$', '$x = 96^\\circ$, $y = 9$', '$x = 96^\\circ$, $y = 11$'],
        ans: 3,
        why: { 0: 'G is the 2nd letter of HGFE, so it matches B (not C). And FG matches CB.', 1: 'G matches B, so x = ∠ABC.', 2: 'FG matches CB (3rd and 2nd letters), not AB.' },
        whyTrap: { 0: 'position', 1: 'position', 2: 'order' },
        sol: ['$A \\leftrightarrow H$, $B \\leftrightarrow G$, $C \\leftrightarrow F$, $D \\leftrightarrow E$.', '$x = \\angle HGF = \\angle ABC = 96^\\circ$, $y = FG = CB = 11$. The answer is <b>D</b>.'],
      },
      {
        id: '54-4', level: 2,
        q: 'In the figure, the two quadrilaterals are congruent. Find $\\angle SPQ$.',
        fig: { w: 400, h: 210, make: [{ tri: 'CDAB', shape: QP4, box: [10, 15, 185, 180] }], derive: [{ src: 'CDAB', dst: 'PQRS', flip: true, rot: 160, at: [305, 105] }], polys: ['ABCD', 'PQRS'], at: { ADC: '128°', DAB: '72°', ABC: '64°', PQR: '128°' }, atPos: { DAB: 24, ADC: 18 }, st: { AD: '6 cm', DC: '10 cm', PQ: '10 cm', QR: '6 cm' }, arcR: 13 },
        lines: ['$\\angle SPQ = $ [[num:96]]°'],
        wrongs: [{ tok: 0, val: 72, hint: 'Match first: the 128° angles give D ↔ Q; the 6 cm sides give A ↔ R; the 10 cm sides give C ↔ P. So ∠SPQ = ∠BCD, not ∠DAB.', trap: 'position' }, { tok: 0, val: 64, hint: 'Match first: D ↔ Q (128°), A ↔ R (6 cm side), C ↔ P (10 cm side). So ∠SPQ = ∠BCD.' }],
        hints: ['Start from the 128° angles: D ↔ Q. Then use the 6 cm and 10 cm sides next to them.', '∠SPQ matches ∠BCD. Find ∠BCD with the angle sum of a quadrilateral (360°).'],
        sol: [{ t: 'By inspection, $C$, $D$, $A$, $B$ correspond to $P$, $Q$, $R$, $S$.' }, { s: '∠BCD = 360° − 128° − 72° − 64°', r: '∠ sum of polygon' }, { s: '= 96°' }, { s: '∠SPQ = ∠BCD' }, { s: '= \\underline{\\underline{96°}}' }],
      },
      {
        id: '54-5', level: 2, type: 'mcq',
        q: 'Refer to the figure. Which is the correct explanation of why the two quadrilaterals are <b>not</b> congruent?',
        fig: { w: 340, h: 190, make: [{ tri: 'ABCD', shape: QP5a, box: [10, 15, 150, 160], rot: 75 }, { tri: 'WXYZ', shape: QP5b, box: [185, 15, 145, 160], rot: 75 }], polys: ['ABCD', 'WXYZ'], at: { DAB: '110°', ABC: '75°', BCD: '45°', CDA: '130°', ZWX: '130°', WXY: '75°', XYZ: '45°', YZW: '110°' }, arcR: 13 },
        options: [
          'Their angles have different sizes.',
          '∠DAB and ∠YZW are the only 110° angles, so A would correspond to Z. But ∠DAB is next to a 75° angle and ∠YZW is not.',
          'They face different directions.',
          'They have different numbers of sides.',
        ],
        ans: 1,
        why: { 0: 'Look again: both shapes have 110°, 75°, 45° and 130°.', 2: 'Turning or flipping does not stop figures being congruent.', 3: 'Both are quadrilaterals.' },
        whyTrap: { 0: 'poly-arrange', 2: 'flip' },
        trap: 'poly-arrange',
        sol: ['The angles are the same four sizes, but in a different arrangement. The unique 110° angles would have to correspond, and their neighbours do not match. The answer is <b>B</b>.'],
      },
      {
        id: '54-6', level: 1, type: 'mcq',
        q: 'Which of the figures I, II and III are congruent to the given figure?',
        fig: gridFig(),
        options: ['I and II only', 'I and III only', 'II and III only', 'I, II and III'],
        ans: 0,
        why: { 1: 'Count the squares in III: it has a longer tail (6 squares, not 5).', 2: 'Count the squares in III: it has a longer tail.', 3: 'III has 6 squares; the given figure has 5.' },
        whyTrap: { 0: 'flip' },
        sol: ['I is the given figure turned through 90°. II is the given figure flipped over. Both are congruent.', 'III has 6 squares, so it is bigger — not congruent. The answer is <b>A</b>.'],
      },
      { id: '54-r', gen: 's54rand' },
    ],
  };

  /* Randomised quadrilateral question */
  function quadShape(ang, s0, s1) {
    const R = Math.PI / 180, hs = [0];
    for (let k = 1; k <= 3; k++) hs.push(hs[k - 1] + (180 - ang[k]));
    const u = hs.map(a => [Math.cos(a * R), Math.sin(a * R)]);
    const rx = -(s0 * u[0][0] + s1 * u[1][0]), ry = -(s0 * u[0][1] + s1 * u[1][1]);
    const det = u[2][0] * u[3][1] - u[3][0] * u[2][1];
    const c = (rx * u[3][1] - u[3][0] * ry) / det, d = (u[2][0] * ry - rx * u[2][1]) / det;
    const P = [[0, 0]];
    [s0, s1, c].forEach((L, i) => { const q = P[P.length - 1]; P.push([q[0] + L * u[i][0], q[1] + L * u[i][1]]); });
    return { pts: P.map(p => [p[0], -p[1]]), c, d };
  }
  C5.gens.s54rand = () => {
    let ang, shp, s0;
    for (let tries = 0; tries < 400; tries++) {
      ang = [U.rint(60, 130), U.rint(60, 130), U.rint(60, 130)];
      const d = 360 - ang[0] - ang[1] - ang[2];
      if (d < 60 || d > 140) continue;
      ang.push(d);
      s0 = U.rint(40, 99) / 10;
      const s1 = s0 * (0.6 + Math.random() * 0.6);
      shp = quadShape(ang, s0, s1);
      const sides = [s0, s1, shp.c, shp.d];
      if (Math.min(...sides) > 0 && Math.min(...sides) / Math.max(...sides) > 0.4) break;
      shp = null;
    }
    if (!shp) { ang = [100, 80, 90, 90]; s0 = 6; shp = quadShape(ang, 6, 5); }
    const ls = U.letters(8), L1 = ls.slice(0, 4).join(''), L2 = ls.slice(4).join('');
    const k = U.rint(0, 3);
    const order = [0, 1, 2, 3].map(i => (i + k) % 4);
    const S1 = order.map(i => L1[i]).join(''), S2 = order.map(i => L2[i]).join('');
    const angKey = (L, i) => L[(i + 3) % 4] + L[i] + L[(i + 1) % 4];
    const at = {};
    [0, 1, 2].forEach(i => { at[angKey(L1, i)] = ang[i] + '°'; });
    at[angKey(L2, 3)] = 'x';
    const st = {}; st[L1[0] + L1[1]] = s0 + ' cm'; st[L2[0] + L2[1]] = 'y cm';
    const x = ang[3];
    return {
      q: `In the figure, $${S1} \\cong ${S2}$. Find $x$ and $y$.`,
      fig: { w: 340, h: 190, make: [{ tri: L1, shape: shp.pts, box: [5, 20, 130, 150] }], derive: [{ src: L1, dst: L2, rot: U.pick([0, 90, 180, 270, 45, 135]), flip: Math.random() < 0.5, at: [275, 95] }], polys: [L1, L2], at, st, arcR: 13 },
      lines: [`$x = $ [[num:${x}]]°`, `$y = $ [[num:${s0}]]`],
      wrongs: [0, 1, 2].map(i => ({ tok: 0, val: ang[i], hint: `x is at ${L2[3]}, which matches ${L1[3]} — the angle that is not marked. Use the angle sum of a quadrilateral (360°).`, trap: 'anglesum' })),
      hints: [`Read the statement: ${[0, 1, 2, 3].map(i => S1[i] + ' ↔ ' + S2[i]).join(', ')}.`, 'The angles of a quadrilateral add up to 360°.'],
      sol: [
        { s: `∠${angKey(L1, 3)} = 360° − ${ang[0]}° − ${ang[1]}° − ${ang[2]}°`, r: '∠ sum of polygon' }, { s: `= ${x}°` },
        { s: `x = ∠${angKey(L2, 3)} = ∠${angKey(L1, 3)}` }, { s: `= \\underline{\\underline{${x}°}}` },
        { s: `y = ${L2[0]}${L2[1]} = ${L1[0]}${L1[1]}` }, { s: `= \\underline{\\underline{${s0}}}` },
      ],
    };
  };
})();
