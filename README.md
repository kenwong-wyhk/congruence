# F2 Ch5 Congruence — self-study site

A static website for WYHK F2 students to use before or after class. No login, no server, and nothing leaves the
student's device (progress ticks are kept in that browser only).

## What's inside

| Page | What students do |
| --- | --- |
| 5.1–5.4 | **Learn** (key points + interactive demo) → **Examples** (reveal the solution step by step, tap a line to see it on the figure) → **Practice** (instant feedback, hint → stronger hint → solution) → **Traps** |
| 5.5 | Animated compass-and-straight-edge constructions (marked "Not in test/exam") |
| Game | Correspondence Game, levels L0 (no figure) to L4 (shared parts), plus a 60-second Speed Round |
| Traps | Trap Gallery — every common mistake with "the trap" vs "do this" |
| Challenge | 10 random questions from a pool of 30 (5.1–5.4); Practice mode or 35-minute Test mode (answers and time are saved, so a refresh loses nothing) |
| Revision sheet | Key points, conditions and reasons on one printable page (`#/sheet`) |
| 5.1 Live | `s51-live.html`: the lesson as full-screen scenes for teaching from the front (arrow keys or a clicker; F for full screen). Engine and styles in `live/`. Linked from the 5.1 page. |

Progress: a practice question counts as **solved** only if the student gets it right without opening the
solution; "first try" is counted separately. Both are stored only in that browser.

## Files

```
index.html          page shell (loads everything)
css/style.css       look and feel (WYHK Design System colours; light theme only)
js/                 the engine — you should not need to edit these
  core.js           helpers, maths rendering, reasons list, local progress
  geom.js           draws figures from a short description
  check.js          marks answers (vertex order, full angle names, numbers)
  question.js       question cards (fill-in, multiple choice, statement builder, proof bank)
  examples.js       step-by-step worked examples
  demos.js          overlay demo, condition explorer, highlight-a-figure
  construct.js      5.5 construction animations
  game.js           Correspondence Game
  app.js            pages and navigation
data/               the content — edit these to change questions
  s51.js … s55.js   one file per section
  traps.js          Trap Gallery
  challenge.js      Mixed Challenge pool
  sheet.js          printable revision sheet
vendor/katex/       KaTeX (maths typesetting, MIT licence) — served from the site itself
tools/stamp_versions.py   refreshes the ?v= tags in index.html (run automatically by the git hook)
tools/site-checks.js      browser checks to run before publishing (see ../PLAYBOOK.md, section 6)
.githooks/pre-commit      runs the script before every commit
favicon.svg, icon-180.png, preview.png   tab icon, phone home-screen icon, link-preview image
```

## Previewing on your computer

The site needs to be served by a small web server (opening `index.html` directly mostly works, but a server is safer):

```bash
python -m http.server 8000 --directory "Congruence Website"
```

Then open http://localhost:8000.

## Editing questions

Each section file has a `practice` list. Maths is LaTeX between `$...$`, exactly as in your worksheets.
Inside proof lines you can also type the symbols directly: `∠ △ ≅ ° // ⊥ ∴ ∵`.

### Fill-in question

```js
{
  id: '51-9', level: 1,
  q: 'Given that $\\triangle ABC \\cong \\triangle PQR$, find',
  lines: ['$PQ = $ [[side:AB]]', '$\\angle QPR = $ [[angle:BAC]]', '$x = $ [[num:56]]°'],
  hints: ['First hint', 'Stronger hint'],
  sol: [{ s: 'PQ = AB', r: 'corr. sides, ≅ △s' }],
}
```

Blanks: `[[num:56]]` (marked exactly: 6.3 and 6.30 are right, 6.35 is wrong; fractions like `[[num:1/2]]` work), `[[side:AB]]` (BA also accepted), `[[angle:ABC]]` (∠CBA accepted, ∠B rejected with a hint),
`[[tri:PQR]]`, `[[reason:given]]`, `[[cond:SAS]]`, `[[choice:Yes*|No]]` (the `*` marks the right option, before or after it).
Use `|` for alternatives, e.g. `[[num:56|124]]`.

A proof line is split at its first `=` so the equal signs line up; a text line (`{ t: 'In $\triangle ABE$,' }`) starts a new block.

A proof table uses `rows` instead of `lines`: `{ s: 'AB = [[side:DC]]', r: '[[reason:given]]' }`.

Targeted hints for common wrong answers: `wrongs: [{ tok: 0, val: 53, hint: '...', trap: 'anglesum' }]`
(`tok` counts the blanks from 0).

### Multiple choice

```js
{ id: '52-11', type: 'mcq', q: '...', options: ['SSS', 'SAS', 'ASA', 'RHS'], ans: 1, why: { 3: 'hint if they pick D' } }
```

### Proof bank (students build the proof)

```js
{
  id: '53-9', type: 'bank', q: '...', fig: { ... },
  intro: 'In $\\triangle ABC$ and $\\triangle DCB$,',
  routes: [{ lines: [{ s: 'AB = DC', r: 'given' }, { s: 'AC = DB', r: 'given' }, { s: 'BC = CB', r: 'common side' }], cond: 'SSS' }],
  distract: [{ s: '∠ABC = ∠DCB', why: 'Not given — it comes from the congruence.' }],
  concl: '△ABC ≅ △DCB',
}
```

Add a second entry to `routes` if another proof is also correct (e.g. ASA and AAS).

### Build the statement

```js
{ type: 'statement', pairs: [['ABD', 'CBD'], ['ADE', 'CDE']], letters: 'ABCDE' }   // any listed pair is accepted, in any consistent order
```

### Curved figures

```js
fig: { w: 320, h: 120, fit: false, noLabels: true, pts: {},
       shapes: [{ d: 'M -28 -26 L 28 -26 L 28 0 A 28 28 0 0 1 -28 0 Z', at: [95, 60], rot: 90, flip: true, scale: 1.2 }] }
```

### Figures

```js
fig: {
  w: 340, h: 190,
  pts: { A: [20, 150], B: [160, 150], C: [55, 70] },            // or make: [{ tri:'ABC', ang:[66,37,77], box:[...] }]
  derive: [{ src: 'ABC', dst: 'PRQ', rot: 100, at: [262, 100] }], // a congruent copy (turned / flipped)
  polys: ['ABC', 'PRQ'], lines: ['BCD'],
  ticks: { AB: 1, PR: 1 }, arcs: { ABC: 1 }, rights: ['ACB'], arrows: { AB: 1 },
  st: { AB: '5 cm' }, at: { BAC: '66°', QPR: 'y' },
}
```

Coordinates have y going **down**. Full notes are at the top of `js/geom.js`.

### Randomised questions and AI-made variants

`C5.gens.s51rand` (in `s51.js`) and `C5.gens.s54rand` (in `s54.js`) generate new numbers every time.
To add more variants later, ask Claude to "add N new practice questions to data/s53.js in the same format",
check them in the preview, then publish. Nothing is generated while students use the site.

## Publishing on GitHub Pages

1. Create a new **public** repository on GitHub, e.g. `congruence`.
2. Upload the **contents** of this folder (so `index.html` is at the top level of the repository).
3. In the repository: **Settings → Pages → Build and deployment → Deploy from a branch**, choose `main` and `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/congruence/`. Post that link on Google Classroom.

To update the site later, commit and push with git. Students' progress is not affected.
Each script and style link in `index.html` carries a `?v=` tag made from that file's contents, so students' browsers
fetch exactly the files that changed. A git hook refreshes the tags automatically on every commit. In a fresh copy
of the repository, switch the hook on once with `git config core.hooksPath .githooks`, or run
`python tools/stamp_versions.py` yourself before committing.

## Notes

- Everything is served from the site itself — KaTeX (`vendor/katex/`, MIT) and the fonts Oswald and Noto Sans HK
  (`vendor/fonts/`, Latin subsets, SIL Open Font License) — so a visit makes **no requests to any other server**.
  Versions and checksums are in each folder's `VERSION.txt`. The school's licensed font files are **not** included.
- No school badge is used, to avoid needing College approval.
- The worksheet PDFs are not included; all questions are new, modelled on the worksheet examples.
