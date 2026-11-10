'use strict';
/* Section 5.1 Concept of Congruent Triangles */
C5.sections['5.1'] = {
  id: '5.1',
  title: 'Concept of Congruent Triangles',
  blurb: 'What "congruent" means, matching vertices, and finding unknown sides and angles.',
  live: 's51-live.html',   // the step-through version shown in class (live/ holds its engine)
  traps: ['order', 'position', 'fullname', 'anglesum', 'reasonformat', 'flip'],
  learn: [
    { key: 'Two figures are <b>congruent</b> if they have the <b>same shape and the same size</b>. You can slide, turn or flip one so that it fits <b>exactly</b> on top of the other.<br>We use the symbol $\\cong$, read "is congruent to".', title: 'What does congruent mean?' },
    { demo: 'overlay', opts: { title: 'Try it: make the triangles coincide', letters1: 'ABC' } },
    {
      title: 'Definition of congruent triangles',
      key: 'Two triangles are congruent if<ol><li>each of the three pairs of <b>corresponding sides</b> are equal, and</li><li>each of the three pairs of <b>corresponding angles</b> are equal.</li></ol>If any pair of corresponding sides or angles is <b>not</b> equal, the triangles are <b>not</b> congruent.',
      fig: { w: 340, h: 180, pts: { A: [60, 30], B: [20, 150], C: [150, 150], X: [230, 30], Y: [190, 150], Z: [320, 150] }, polys: ['ABC', 'XYZ'], ticks: { AB: 1, XY: 1, BC: 2, YZ: 2, CA: 3, ZX: 3 }, arcs: { CAB: 1, ZXY: 1, ABC: 2, XYZ: 2, BCA: 3, YZX: 3 } },
      cap: '$\\triangle ABC \\cong \\triangle XYZ$. Same marks and same colours show corresponding parts.',
    },
    {
      title: 'The order of the letters tells you the correspondence',
      key: 'In $\\triangle ABC \\cong \\triangle XYZ$, the 1st letters match, the 2nd letters match and the 3rd letters match:<br>$A \\leftrightarrow X$, $B \\leftrightarrow Y$, $C \\leftrightarrow Z$ — these are <b>corresponding vertices</b>.<br>So $\\triangle ABC \\cong \\triangle XYZ$ is <b>not</b> the same as $\\triangle ABC \\cong \\triangle XZY$.',
    },
    {
      title: 'Properties of congruent triangles',
      key: 'If $\\triangle ABC \\cong \\triangle XYZ$, then<ul><li>$AB = XY$, $BC = YZ$, $CA = ZX$ &nbsp;&nbsp;[reason: <b>corr. sides, ≅ △s</b>]</li><li>$\\angle BAC = \\angle YXZ$, $\\angle ABC = \\angle XYZ$, $\\angle BCA = \\angle YZX$ &nbsp;&nbsp;[reason: <b>corr. ∠s, ≅ △s</b>]</li></ul>',
    },
    { tip: 'Always name an angle with <b>three letters</b>, vertex in the middle: write $\\angle ABC$, not $\\angle B$. When several angles meet at B, "$\\angle B$" is unclear. The full name always works — make it a habit.', title: 'Good habit: full angle names' },
    { tip: 'When the second triangle is turned or flipped, do <b>not</b> match parts by their position in the picture. Read the letters of the congruence statement instead.', title: 'Trick for turned figures' },
    { cta: { href: '#/game', label: 'Play the Correspondence Game', text: 'Train yourself to spot matching vertices, sides and angles fast.' } },
  ],
  examples: [
    {
      level: 1,
      q: 'In the figure, $\\triangle PQR \\cong \\triangle XYZ$. Find $x$, $y$ and $z$.',
      fig: { w: 340, h: 165, pts: { P: [70, 25], Q: [20, 140], R: [150, 140], X: [240, 25], Y: [190, 140], Z: [320, 140] }, polys: ['PQR', 'XYZ'], at: { PQR: 'x', PRQ: 'y', XYZ: '66°', XZY: '55°' }, st: { QR: '8 cm', YZ: 'z cm' } },
      tip: 'When $\\triangle PQR \\cong \\triangle XYZ$: $P \\leftrightarrow X$, $Q \\leftrightarrow Y$, $R \\leftrightarrow Z$.',
      steps: [
        { s: '∵ △PQR ≅ △XYZ' },
        { s: '∴ ∠PQR = ∠XYZ', r: 'corr. ∠s, ≅ △s', hl: [['PQR', 'XYZ', 1]] },
        { s: 'x = \\underline{\\underline{66°}}' },
        { s: '∠PRQ = ∠XZY', r: 'corr. ∠s, ≅ △s', hl: [['PRQ', 'XZY', 2]] },
        { s: 'y = \\underline{\\underline{55°}}' },
        { s: 'YZ = QR', r: 'corr. sides, ≅ △s', hl: [['QR', 'YZ', 3]] },
        { s: 'z = \\underline{\\underline{8}}' },
      ],
    },
    {
      level: 1,
      q: 'In the figure, $\\triangle ABC \\cong \\triangle PRQ$. Find $x$ and $y$.',
      fig: { w: 340, h: 200, pts: { A: [20, 150], B: [160, 150], C: [55, 70] }, derive: [{ src: 'ABC', dst: 'PRQ', rot: 100, at: [262, 100] }], polys: ['ABC', 'PRQ'], at: { BAC: '66°', ABC: '37°', QPR: 'y' }, st: { AB: '5 cm', BC: '4.7 cm', PR: 'x cm' } },
      tip: 'The second triangle is turned. Don\'t match by position — read the statement: $A \\leftrightarrow P$, $B \\leftrightarrow R$, $C \\leftrightarrow Q$.',
      steps: [
        { s: '∵ △ABC ≅ △PRQ' },
        { s: '∴ PR = AB', r: 'corr. sides, ≅ △s', hl: [['AB', 'PR', 1]] },
        { s: 'x = \\underline{\\underline{5}}' },
        { s: '∠QPR = ∠CAB', r: 'corr. ∠s, ≅ △s', hl: [['CAB', 'QPR', 2]] },
        { s: 'y = \\underline{\\underline{66°}}' },
      ],
    },
    {
      level: 2,
      q: 'In the figure, $AED$ and $BEC$ are straight lines, $\\angle ABE = 90^\\circ$ and $\\triangle ABE \\cong \\triangle DCE$. Find<br>(a) $\\angle AEB$,<br>(b) $AD$.',
      fig: { w: 340, h: 190, pts: { A: [34.5, 66.6], B: [100, 150], E: [170, 95], D: [305.5, 123.4], C: [240, 40] }, polys: ['ABE', 'DCE'], rights: ['ABE'], at: { EDC: '40°' }, st: { AE: '5 cm' } },
      split: ['ABE', 'DCE'],
      tip: 'Split the figure into $\\triangle ABE$ and $\\triangle DCE$. Then use the angle sum of $\\triangle ABE$.',
      steps: [
        { t: '(a)' },
        { s: '∵ △ABE ≅ △DCE' },
        { s: '∴ ∠BAE = ∠CDE', r: 'corr. ∠s, ≅ △s', hl: [['BAE', 'CDE', 1]] },
        { s: '= 40°' },
        { t: 'In $\\triangle ABE$,' },
        { s: '∠AEB + ∠BAE + ∠ABE = 180°', r: '∠ sum of △' },
        { s: '∠AEB + 40° + 90° = 180°' },
        { s: '∠AEB = \\underline{\\underline{50°}}' },
        { t: '(b)' },
        { s: 'DE = AE', r: 'corr. sides, ≅ △s', hl: [['AE', 'DE', 2]] },
        { s: '= 5 cm' },
        { s: 'AD = AE + DE' },
        { s: '= (5 + 5) cm' },
        { s: '= \\underline{\\underline{10 cm}}' },
      ],
    },
  ],
  practice: [
    {
      id: '51-1', level: 1,
      q: 'It is given that $\\triangle DEF \\cong \\triangle QRP$. Complete the following.',
      letters: 'DEFPQR',
      lines: ['$DE = $ [[side:QR]]', '$EF = $ [[side:RP]]', '$DF = $ [[side:QP]]', '$\\angle DEF = $ [[angle:QRP]]', '$\\angle EFD = $ [[angle:RPQ]]'],
      hints: ['Match letters by position: D ↔ Q, E ↔ R, F ↔ P.', 'DE uses the 1st and 2nd letters of △DEF, so the answer uses the 1st and 2nd letters of △QRP.'],
      trap: 'order',
      sol: [{ t: '$D \\leftrightarrow Q$, $E \\leftrightarrow R$, $F \\leftrightarrow P$' }, { s: 'DE = QR, EF = RP, DF = QP', r: 'corr. sides, ≅ △s' }, { s: '∠DEF = ∠QRP, ∠EFD = ∠RPQ', r: 'corr. ∠s, ≅ △s' }],
    },
    {
      id: '51-2', level: 1, type: 'mcq',
      q: 'If $\\triangle KLM \\cong \\triangle STR$, which of the following may <b>NOT</b> be true?',
      options: ['$KM = SR$', '$LM = TR$', '$\\angle LKM = \\angle TSR$', '$\\angle KML = \\angle RST$'],
      ans: 3,
      why: { 0: 'K ↔ S and M ↔ R, so KM = SR is true.', 1: 'L ↔ T and M ↔ R, so LM = TR is true.', 2: 'The vertex K matches S, and the other letters match too. This is true.' },
      trap: 'order',
      sol: ['$K \\leftrightarrow S$, $L \\leftrightarrow T$, $M \\leftrightarrow R$.', 'The vertex of $\\angle KML$ is M, which matches R. So $\\angle KML = \\angle SRT$, not $\\angle RST$. The answer is <b>D</b>.'],
    },
    {
      id: '51-3', level: 1,
      q: 'In the figure, $\\triangle ABC \\cong \\triangle DFE$. Find $x$, $y$ and $z$.',
      fig: { w: 340, h: 200, pts: { A: [20, 40], B: [40, 150], C: [160, 110] }, derive: [{ src: 'ABC', dst: 'DFE', flip: true, rot: 30, at: [262, 100] }], polys: ['ABC', 'DFE'], at: { BAC: '53°', ACB: '45°', DFE: 'x', DEF: 'y' }, st: { AC: '7.8 cm', BC: '6.3 cm', FE: 'z cm' } },
      lines: ['$x = $ [[num:82]]°', '$y = $ [[num:45]]°', '$z = $ [[num:6.3]]'],
      wrongs: [{ tok: 0, val: 53, hint: 'x is at F, and F matches B. ∠ABC is not marked — find it with the angle sum first.', trap: 'anglesum' }, { tok: 0, val: 45, hint: 'x is at F, which matches B (not C).' }, { tok: 2, val: 7.8, hint: 'z is on FE, which matches BC (F ↔ B, E ↔ C).' }],
      hints: ['A ↔ D, B ↔ F, C ↔ E. The triangle on the right is flipped — use the letters.', 'For x: find ∠ABC first using the angle sum of △ABC.'],
      sol: [
        { t: 'In $\\triangle ABC$,' }, { s: '∠ABC = 180° − 53° − 45°', r: '∠ sum of △' }, { s: '= 82°' },
        { s: '∠DFE = ∠ABC', r: 'corr. ∠s, ≅ △s' }, { s: 'x = \\underline{\\underline{82°}}' },
        { s: '∠DEF = ∠ACB', r: 'corr. ∠s, ≅ △s' }, { s: 'y = \\underline{\\underline{45°}}' },
        { s: 'FE = BC', r: 'corr. sides, ≅ △s' }, { s: 'z = \\underline{\\underline{6.3}}' },
      ],
    },
    {
      id: '51-4', level: 1,
      q: 'Given that $\\triangle LMN \\cong \\triangle UVW$, $LN = 9$ cm, $MN = 7$ cm, $\\angle UVW = 48^\\circ$ and $\\angle VWU = 75^\\circ$. Find<br>(a) $UW$, &nbsp; (b) $\\angle MLN$.',
      lines: ['(a) $UW = $ [[num:9]] cm', '(b) $\\angle MLN = $ [[num:57]]°'],
      wrongs: [{ tok: 0, val: 7, hint: 'MN matches VW, not UW. UW matches LN.' }, { tok: 1, val: 48, hint: '∠UVW matches ∠LMN, not ∠MLN.' }, { tok: 1, val: 75, hint: '∠VWU matches ∠MNL, not ∠MLN.' }],
      hints: ['L ↔ U, M ↔ V, N ↔ W. No figure here — use the letters only.', '∠MLN matches ∠VUW. Find ∠VUW with the angle sum of △UVW.'],
      trap: 'anglesum',
      sol: [
        { t: '(a)' }, { s: 'UW = LN', r: 'corr. sides, ≅ △s' }, { s: '= \\underline{\\underline{9 cm}}' },
        { t: '(b) In $\\triangle UVW$,' }, { s: '∠VUW = 180° − 48° − 75°', r: '∠ sum of △' }, { s: '= 57°' },
        { s: '∠MLN = ∠VUW', r: 'corr. ∠s, ≅ △s' }, { s: '= \\underline{\\underline{57°}}' },
      ],
    },
    {
      id: '51-5', level: 2,
      q: 'In the figure, $ABCD$ is a quadrilateral and $\\triangle ABC \\cong \\triangle CDA$. Find<br>(a) $BC$, &nbsp; (b) $\\angle BCA$, &nbsp; (c) $\\angle BAC$.',
      fig: { w: 320, h: 180, pts: { A: [80, 30], B: [40, 150], C: [240, 150], D: [280, 30] }, polys: ['ABCD'], lines: ['AC'], at: { ADC: '72°', DAC: '37°' }, st: { AD: '10 cm' } },
      lines: ['(a) $BC = $ [[num:10]] cm', '(b) $\\angle BCA = $ [[num:37]]°', '(c) $\\angle BAC = $ [[num:71]]°'],
      wrongs: [{ tok: 1, val: 72, hint: '∠BCA has vertex C, which matches A. Look at the angle at A in △CDA.' }, { tok: 2, val: 37, hint: '∠BAC has vertex A, which matches C. You need ∠DCA — use the angle sum of △CDA.' }],
      hints: ['A ↔ C, B ↔ D, C ↔ A.', 'For (c): ∠BAC = ∠DCA. Find ∠DCA with the angle sum of △CDA.'],
      sol: [
        { t: '$A \\leftrightarrow C$, $B \\leftrightarrow D$, $C \\leftrightarrow A$' },
        { t: '(a)' }, { s: 'BC = DA', r: 'corr. sides, ≅ △s' }, { s: '= \\underline{\\underline{10 cm}}' },
        { t: '(b)' }, { s: '∠BCA = ∠DAC', r: 'corr. ∠s, ≅ △s' }, { s: '= \\underline{\\underline{37°}}' },
        { t: '(c) In $\\triangle CDA$,' }, { s: '∠DCA = 180° − 72° − 37°', r: '∠ sum of △' }, { s: '= 71°' },
        { s: '∠BAC = ∠DCA', r: 'corr. ∠s, ≅ △s' }, { s: '= \\underline{\\underline{71°}}' },
      ],
    },
    {
      id: '51-6', level: 2,
      q: 'In the figure, $\\triangle ABC \\cong \\triangle ADC$. Find $\\angle BAC$.',
      fig: { w: 300, h: 200, pts: { A: [150, 125], B: [60, 180], C: [260, 180], D: [140, 20] }, polys: ['ABC', 'ADC'], at: { ABC: '31°', ACD: '27°' } },
      lines: ['$\\angle BAC = $ [[num:122]]°'],
      wrongs: [{ tok: 0, val: 149, hint: 'You also need ∠ACB. It equals ∠ACD (corr. ∠s, ≅ △s).' }, { tok: 0, val: 58, hint: 'Check: in △ABC the three angles must add up to 180°.' }],
      hints: ['C ↔ C, so ∠ACB = ∠ACD.', 'Then use the angle sum of △ABC.'],
      sol: [{ s: '∠ACB = ∠ACD', r: 'corr. ∠s, ≅ △s' }, { s: '= 27°' }, { t: 'In $\\triangle ABC$,' }, { s: '∠BAC = 180° − 31° − 27°', r: '∠ sum of △' }, { s: '= \\underline{\\underline{122°}}' }],
    },
    {
      id: '51-7', level: 1, type: 'mcq',
      q: 'In the figure, $\\triangle ABC \\cong \\triangle XYZ$. Find $x$.',
      fig: { w: 340, h: 170, make: [{ tri: 'ABC', ang: [25, 120, 35], box: [15, 30, 150, 110] }], derive: [{ src: 'ABC', dst: 'XYZ', flip: true, rot: 200, at: [255, 85] }], polys: ['ABC', 'XYZ'], at: { BAC: '25°', ABC: '120°', XZY: 'x' } },
      options: ['$25^\\circ$', '$30^\\circ$', '$35^\\circ$', '$120^\\circ$'],
      ans: 2,
      why: { 0: 'x is at Z. Z matches C, not A.', 1: 'Use the angle sum: 180° − 25° − 120° = ?', 3: '120° is at B, which matches Y. x is at Z.' },
      trap: 'anglesum',
      sol: [{ s: '∠ACB = 180° − 25° − 120°', r: '∠ sum of △' }, { s: '= 35°' }, { s: 'x = ∠XZY = ∠ACB', r: 'corr. ∠s, ≅ △s' }, { s: '= 35°' }, { t: 'The answer is <b>C</b>.' }],
    },
    { id: '51-r', gen: 's51rand' },
  ],
};

/* Randomised "find the unknowns" question for 5.1 */
C5.gens.s51rand = () => {
  // angs[2] is the angle students find with the angle sum; it is not marked. Keep it at least 45°:
  // a smaller one makes the side between the two marked angles short, and their labels collide.
  let angs;
  do { angs = G.randAngles(35, 100, 10); } while (angs[2] < 45);
  const ls = U.letters(6), t1 = ls.slice(0, 3).join(''), t2 = ls.slice(3).join('');
  const p = U.perm3(), L = p.map(i => t1[i]).join(''), R = p.map(i => t2[i]).join('');
  const side = U.rint(30, 95) / 10;
  const rot = U.pick([0, 60, 120, 180, 240, 300]), flip = Math.random() < 0.5;
  const at = {}, st = {};
  at[t1[2] + t1[0] + t1[1]] = angs[0] + '°';
  at[t1[0] + t1[1] + t1[2]] = angs[1] + '°';
  at[t2[0] + t2[2] + t2[1]] = 'x';
  at[t2[1] + t2[0] + t2[2]] = 'y';
  st[t1[1] + t1[2]] = side + ' cm';
  st[t2[1] + t2[2]] = 'z cm';
  const a = angs;
  return {
    q: `In the figure, $\\triangle ${L} \\cong \\triangle ${R}$. Find $x$, $y$ and $z$.`,
    fig: { w: 340, h: 190, make: [{ tri: t1, ang: angs, box: [20, 20, 140, 150] }], derive: [{ src: t1, dst: t2, rot, flip, at: [255, 95] }], polys: [t1, t2], at, st },
    lines: [`$x = $ [[num:${a[2]}]]°`, `$y = $ [[num:${a[0]}]]°`, `$z = $ [[num:${side}]]`],
    wrongs: [
      { tok: 0, val: a[0], hint: `x is at ${t2[2]}, which matches ${t1[2]} — the angle that is not marked. Use the angle sum first.`, trap: 'anglesum' },
      { tok: 0, val: a[1], hint: `x is at ${t2[2]}, which matches ${t1[2]} — the angle that is not marked. Use the angle sum first.`, trap: 'anglesum' },
      { tok: 1, val: a[1], hint: `y is at ${t2[0]}, which matches ${t1[0]}.` },
    ],
    hints: [`Read the statement: ${[0, 1, 2].map(i => L[i] + ' ↔ ' + R[i]).join(', ')}.`, 'One of the angles is not marked on the first triangle — use the angle sum of a triangle.'],
    sol: [
      { t: `In $\\triangle ${t1}$,` },
      { s: `∠${t1[0]}${t1[2]}${t1[1]} = 180° − ${a[0]}° − ${a[1]}°`, r: '∠ sum of △' }, { s: `= ${a[2]}°` },
      { s: `x = ∠${t2[0]}${t2[2]}${t2[1]} = ∠${t1[0]}${t1[2]}${t1[1]}`, r: 'corr. ∠s, ≅ △s' }, { s: `= \\underline{\\underline{${a[2]}°}}` },
      { s: `y = ∠${t2[1]}${t2[0]}${t2[2]} = ∠${t1[1]}${t1[0]}${t1[2]}`, r: 'corr. ∠s, ≅ △s' }, { s: `= \\underline{\\underline{${a[0]}°}}` },
      { s: `z = ${t2[1]}${t2[2]} = ${t1[1]}${t1[2]}`, r: 'corr. sides, ≅ △s' }, { s: `= \\underline{\\underline{${side}}}` },
    ],
  };
};
