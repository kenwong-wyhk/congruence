'use strict';
/* One-page revision sheet (printable). Uses the same blocks as the Learn pages. */
C5.sheet = [
  { h: '1. Congruent figures' },
  { key: 'Congruent figures have the <b>same shape and size</b>: one can be slid, turned or flipped to fit exactly on the other. Symbol: $\\cong$.<br>If $\\triangle ABC \\cong \\triangle XYZ$, then $A \\leftrightarrow X$, $B \\leftrightarrow Y$, $C \\leftrightarrow Z$ (letters in the same position correspond), and<ul><li>$AB = XY$, $BC = YZ$, $CA = ZX$ &nbsp;[<b>corr. sides, ≅ △s</b>]</li><li>$\\angle BAC = \\angle YXZ$, $\\angle ABC = \\angle XYZ$, $\\angle BCA = \\angle YZX$ &nbsp;[<b>corr. ∠s, ≅ △s</b>]</li></ul>Always name angles in full: $\\angle ABC$, not $\\angle B$.' },
  { h: '2. Conditions for congruent triangles' },
  {
    table: {
      head: ['Condition', 'Three pairs of equal parts', 'Watch out'],
      rows: [
        ['<b>SSS</b>', 'three sides', ''],
        ['<b>SAS</b>', 'two sides and the <b>included</b> angle', 'the angle must be between the two sides'],
        ['<b>ASA</b>', 'two angles and the side <b>between</b> them', ''],
        ['<b>AAS</b>', 'two angles and a side <b>not</b> between them', 'two angles known ⇒ third angle known (∠ sum of △)'],
        ['<b>RHS</b>', 'right angle, <b>hypotenuse</b>, one other side', 'the hypotenuses must be equal'],
        ['<s>SSA</s>, <s>AAA</s>', '—', '<b>not</b> conditions: two different triangles (SSA), or different sizes (AAA)'],
      ],
    },
  },
  { h: '3. Reasons you will use' },
  {
    table: {
      head: ['Situation', 'Reason'],
      rows: [
        ['Fact stated in the question (including "C is the mid-point of BD")', 'given'],
        ['Side / angle shared by both triangles', 'common side / common ∠'],
        ['Two straight lines crossing', 'vert. opp. ∠s'],
        ['Equal angles ⇒ equal sides (in one triangle)', 'sides opp. equal ∠s'],
        ['Equal sides ⇒ equal angles (in one triangle)', 'base ∠s, isos. △'],
        ['Angles of a triangle', '∠ sum of △'],
        ['Exterior angle = sum of the two interior opposite angles', 'ext. ∠ of △'],
        ['Angles on a straight line add to 180°', 'adj. ∠s on st. line'],
        ['Parallel lines (given)', 'corr. ∠s, AB // CD &nbsp;/&nbsp; alt. ∠s, AB // CD'],
        ['Proving lines parallel', 'corr. ∠s equal &nbsp;/&nbsp; alt. ∠s equal'],
        ['After proving congruence', 'corr. sides, ≅ △s &nbsp;/&nbsp; corr. ∠s, ≅ △s'],
        ['Angles of an $n$-sided polygon add to $(n - 2) \\times 180^\\circ$', '∠ sum of polygon'],
      ],
    },
  },
  { h: '4. Writing a proof' },
  { key: '<ol><li>Split the figure: name the two triangles ("In △… and △…,").</li><li>Mark the given facts. Hunt for hidden equal parts (table above). Build sides by adding equal pieces if needed, and show the working.</li><li>One fact per line, with a reason on every line — "given" too.</li><li>Last line: the triangles in <b>matching vertex order</b>, and the condition.</li><li>Three triangles? Prove two pairs congruent.</li></ol>' },
  { h: '5. Congruent polygons' },
  { key: 'Matching sides and matching angles must be equal, <b>in the same order</b> around the shape. Find the correspondence from a unique angle or side, then walk round in the same direction (or the opposite one if flipped).<br>Always congruent if equal: circles (radius, area or circumference), squares (side, area or perimeter), regular polygons with the same number of sides (side or perimeter). Not enough: rectangles or parallelograms with the same area.' },
  { h: '6. Top traps' },
  { list: ['Wrong vertex order in the statement.', 'Matching parts by position in a turned or flipped figure.', 'SSA is not SAS — check the angle is included.', 'RHS needs the hypotenuse; a right angle between the two equal sides is SAS.', 'ASA vs AAS — is the side between the two angles?', 'Forgetting "given", "common side", "vert. opp. ∠s".', 'Using "corr. sides, ≅ △s" before proving the triangles congruent.', 'Same angles in a different order ⇒ polygons not congruent.'] },
];
