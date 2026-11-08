'use strict';
/* Trap Gallery. Each trap: id, title, sections, bad (the mistake), good (what to do), why, optional fig/cap.
   Question hints can link here with  trap:'<id>'. */
C5.traps = [
  {
    id: 'order', title: 'Writing the vertices in the wrong order', sections: ['5.1', '5.2', '5.3', '5.4'],
    bad: 'A ↔ X, B ↔ Z, C ↔ Y, but the student writes $\\triangle ABC \\cong \\triangle XYZ$.',
    good: 'Write corresponding vertices in the same position: $\\triangle ABC \\cong \\triangle XZY$ (or $\\triangle BAC \\cong \\triangle ZXY$, …).',
    why: 'The order of the letters <b>is</b> the correspondence. A wrong order says that the wrong sides and angles are equal. Any order is fine as long as both sides are re-ordered the same way.',
  },
  {
    id: 'position', title: 'Matching parts by where they are in the picture', sections: ['5.1', '5.4'],
    bad: '"AB is the bottom side of the first triangle, so it equals the bottom side of the second triangle."',
    good: 'Use the letters (or the equal marks), not the position. In $\\triangle ABC \\cong \\triangle PRQ$, AB matches PR wherever PR is drawn.',
    why: 'The second figure may be turned or flipped over. Turning and flipping do not change the sizes, so the figures are still congruent — but "the bottom side" may now be a different side.',
  },
  {
    id: 'fullname', title: 'Short angle names like ∠B', sections: ['5.1', '5.2', '5.3', '5.4'],
    bad: '$\\angle B = \\angle E$ in a figure where several angles meet at B.',
    good: 'Always use three letters with the vertex in the middle: $\\angle ABC = \\angle DEF$.',
    why: 'When two or more angles share a vertex, ∠B could mean any of them. The full name is never ambiguous, so we always use it.',
  },
  {
    id: 'anglesum', title: 'Forgetting the third angle', sections: ['5.1', '5.2'],
    bad: 'The question asks for the angle that is not marked, so the student copies one of the marked angles.',
    good: 'Find the third angle with the angle sum of a triangle first: $180^\\circ - (\\text{the other two})$, reason (∠ sum of △).',
    why: 'Knowing two angles of a triangle means you know all three. This is also why ASA and AAS can turn into each other.',
  },
  {
    id: 'reasonformat', title: 'Writing reasons in your own words', sections: ['5.1', '5.3'],
    bad: '$AB = XY$ (because they are congruent)',
    good: '$AB = XY$ (corr. sides, ≅ △s) and $\\angle ABC = \\angle XYZ$ (corr. ∠s, ≅ △s)',
    why: 'Use the standard abbreviations from the textbook. Markers look for them.',
  },
  {
    id: 'ssa', title: 'SSA (ASS) is NOT a condition', sections: ['5.2', '5.3'],
    bad: '$AB = XY$, $BC = YZ$ and $\\angle BAC = \\angle YXZ$, so $\\triangle ABC \\cong \\triangle XYZ$ (SAS).',
    good: 'In SAS the angle must be the <b>included angle</b> — the angle between the two sides. Here ∠BAC is not between AB and BC, so no conclusion can be made.',
    why: 'With two sides and a non-included angle you can often draw <b>two different</b> triangles. Try it in the Condition explorer (5.2, Learn).',
    fig: {
      w: 320, h: 175,
      pts: { A: [70, 150], B: [238, 150], C: [135.9, 103.8], D: [229.5, 38.3] },
      polys: ['ABC'], lines: ['ACD', 'BD'], dashed: ['BD'],
      ticks: { BC: 1, BD: 1 }, arcs: { BAC: 1 }, fit: false,
    },
    cap: '△ABC and △ABD share AB and the angle at A, and BC = BD. Same S, S, A — but clearly different triangles.',
  },
  {
    id: 'aaa', title: 'AAA is NOT a condition', sections: ['5.2'],
    bad: 'All three pairs of angles are equal, so the triangles are congruent (AAA).',
    good: 'Equal angles give the same <b>shape</b> but not necessarily the same <b>size</b>. You need at least one pair of equal sides.',
    why: 'A small triangle and its enlargement have the same angles but are not congruent.',
  },
  {
    id: 'included', title: 'SAS needs the included angle', sections: ['5.2'],
    bad: 'Choosing the angle that is opposite one of the two sides.',
    good: 'Check the angle is formed by the two sides: for sides AB and AC the included angle is ∠BAC.',
    why: 'Only the included angle locks the triangle. A non-included angle gives SSA, which is not a condition.',
  },
  {
    id: 'rhs', title: 'RHS needs the hypotenuse', sections: ['5.2', '5.3'],
    bad: 'Two right-angled triangles with one pair of equal legs and a common leg, written as RHS.',
    good: 'RHS = Right angle, Hypotenuse, Side. One of the equal pairs must be the hypotenuses (the sides opposite the right angles). If the right angle is between the two equal sides, it is SAS.',
    why: 'Students see a right angle and write RHS automatically. Always check which sides are equal.',
  },
  {
    id: 'asa-aas', title: 'ASA or AAS? Look at where the side is', sections: ['5.2', '5.3'],
    bad: '$\\angle ABC = \\angle XYZ$, $\\angle BCA = \\angle YZX$, $AB = XY$, so ASA.',
    good: 'The side between ∠ABC and ∠BCA is BC. AB is not between them, so this is <b>AAS</b>.',
    why: 'ASA: the side is between the two angles. AAS: the side is opposite one of the angles. (Both are valid conditions — just name the right one.)',
  },
  {
    id: 'given', title: 'Forgetting the reason "given"', sections: ['5.2', '5.3'],
    bad: '$AB = DC$ (blank)  or  $AB = DC$ (SSS)',
    good: '$AB = DC$ (given)',
    why: 'Every line of a proof needs a reason. A fact stated in the question has the reason "given". The condition (SSS, SAS, …) only goes on the last line.',
  },
  {
    id: 'common', title: 'Missing the hidden equal parts', sections: ['5.2', '5.3'],
    bad: 'Saying "we only have two pairs of equal parts" when the triangles share a side, share an angle, or meet at vertically opposite angles.',
    good: 'Look for: a <b>common side</b> (reason: common side), a <b>common angle</b> (common ∠), and <b>vertically opposite angles</b> (vert. opp. ∠s).',
    why: 'In many figures the third pair of equal parts is not written in the question — it is hiding in the figure.',
  },
  {
    id: 'segadd', title: 'Using a sum of segments without showing it', sections: ['5.3'],
    bad: '$AF = ED$ (given)  — but the question only says $AE = FD$.',
    good: 'Show it: $AF = AE + EF = FD + EF = ED$.',
    why: 'AF = ED is not given. You must show where it comes from, by adding (or subtracting) the same piece on both sides.',
  },
  {
    id: 'parallel', title: 'Assuming lines are parallel because they look parallel', sections: ['5.3'],
    bad: '"AB and CD look parallel, so the alternate angles are equal."',
    good: 'Only use parallel lines if the question says so (or you proved it). To <b>prove</b> lines are parallel, use corr. ∠s equal or alt. ∠s equal.',
    why: 'Figures are not always drawn to scale. Never read facts off a picture.',
  },
  {
    id: 'sides-opp', title: 'Mixing up "sides opp. equal ∠s" and "base ∠s, isos. △"', sections: ['5.3'],
    bad: '$\\angle EBC = \\angle ECB$, so $EB = EC$ (base ∠s, isos. △)',
    good: 'Equal angles ⇒ equal sides: (sides opp. equal ∠s). Equal sides ⇒ equal angles: (base ∠s, isos. △).',
    why: 'They are converse facts. Use the one that goes in the direction you need.',
  },
  {
    id: 'circular', title: 'Using what you are trying to prove', sections: ['5.3'],
    bad: 'Proving $\\triangle ABC \\cong \\triangle DEF$ with the line $AB = DE$ (corr. sides, ≅ △s).',
    good: 'You can only use "corr. sides, ≅ △s" <b>after</b> the triangles have been proved congruent.',
    why: 'Before the proof is finished, you do not yet know the triangles are congruent. Only use given facts and facts you can justify from the figure.',
  },
  {
    id: 'poly-arrange', title: 'Same angles but not congruent polygons', sections: ['5.4'],
    bad: 'Two quadrilaterals both have angles 105°, 70°, 50° and 135°, so they are congruent.',
    good: 'Check the <b>arrangement</b>: matching angles must be next to matching angles, in the same order around the shape.',
    why: 'If the unique 105° angle has a 70° neighbour in one shape but not in the other, the shapes cannot coincide.',
  },
  {
    id: 'flip', title: 'Thinking a flipped figure is not congruent', sections: ['5.1', '5.4'],
    bad: '"The second triangle faces the other way, so they are not congruent."',
    good: 'Turned or flipped over, a figure keeps all its lengths and angles, so it is still congruent.',
    why: 'Congruent means you can make the figures coincide — and you are allowed to slide, turn <b>and flip</b>.',
  },
  {
    id: 'area', title: 'Same area or perimeter does not mean congruent', sections: ['5.4'],
    bad: 'Two rectangles with the same area must be congruent.',
    good: 'A 2 × 6 rectangle and a 3 × 4 rectangle have the same area but different shapes. Same area or perimeter is enough only for shapes fixed by one length: circles, squares, and regular polygons with the same number of sides.',
    why: 'For a circle, the area fixes the radius, so the whole circle is fixed. For a rectangle or parallelogram, many shapes share the same area.',
  },
];
