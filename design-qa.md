# Design QA

## Comparison target

- Source visual truth: `/workspace/scratch/29063637964e/upload/01-83990.jpg`
- Implementation screenshot: `/workspace/sites/helper-skills-dialogue/implementation-v2-reference-state.jpg`
- Combined full-view comparison: `/tmp/design-qa-comparison.jpg`
- Combined focused comparison: `/tmp/design-qa-focused.jpg`
- Route/state: `http://terminal.local:4173/v2#v2-nonjudgmental-stance`, light theme, left navigation visible, technique 01 selected, first two cases entering the viewport.
- CSS viewport: `1363 x 936`; browser content width: `1348 x 926` after scrollbar.
- Source pixels: `1536 x 1152` photograph of a monitor; implementation pixels: `1348 x 926` browser capture.
- Density normalization: both comparison inputs were resized to a common visual width before the side-by-side review; the source includes a monitor bezel and camera perspective, so the review evaluates composition, hierarchy, spacing rhythm, tokens, and copy structure rather than pixel-perfect geometry.

## Evidence

The full-view comparison shows the same editorial composition: a narrow fixed navigation column, a quiet document canvas, numbered technique navigation, a technique header, a dashed “别做啥 / 要说啥” guardrail strip, a core-definition row, a quoted case, and paired pink/green response panels.

The focused comparison covers the first technique card and its first case. The implementation preserves the reference’s thin rules, compact mono labels, restrained off-white palette, blue accent, two-column comparison, and low-decoration reading density. The implementation adds the requested three wrong replies and three better replies without changing the visual grammar.

The mobile pass changes the sidebar into a compact sticky header: the brand and two essential controls share the first row, the 18 technique links form a single horizontal touch rail, long labels truncate instead of wrapping into a tall menu, and anchored techniques reserve space below the sticky header. The active technique remains highlighted while the reader scrolls.

## Fidelity surfaces

- Typography: compact sans-serif body copy, mono labels, restrained weights, and clear heading scale match the reference direction. Chinese line wrapping is readable at the captured width.
- Spacing and layout: sidebar/content split, card padding, section rules, case rhythm, and paired comparison columns are coherent. No horizontal overflow was reported (`scrollWidth === clientWidth === 1348`).
- Mobile navigation: the `<=900px` layout keeps the top navigation compact and sticky; the `<=640px` layout shortens control labels, hides duplicate header chrome, and reserves approximately 101px for anchor targets.
- Colors and tokens: off-white canvas, blue structural accent, muted red wrong-state panels, and muted green better-state panels are consistent with the target. No gradients or decorative effects were introduced.
- Image quality and assets: the target is a photographed UI reference with no product imagery that needs to be reproduced. The implementation uses no decorative raster, hand-drawn SVG, emoji, or placeholder image asset.
- Copy and content: the second edition presents 18 techniques across three chapters, 54 cases, three wrong replies plus three better replies per case, technique mnemonics, and a 12-prompt flashcard area.

## Interactions tested

- Sidebar anchor: clicking `03. 具体化` changed the URL to `#v2-concretization` and brought the heading into view.
- Active navigation: the clicked technique and the technique currently in view receive the `is-active` state.
- Flashcard: `换一个场景` changed the prompt from `我觉得自己很失败，连休息都不敢。` to `我不想生孩子，家里人说我自私。`.
- Theme: the toggle changed the shell class from `v2-shell` to `v2-shell v2-dark`, then returned to `v2-shell`.
- Mutual version links: the new edition opened `/`; the old edition exposed `阅读版 v2` and returned to `/v2`.
- Console: no app-origin runtime errors were produced during the clean interaction pass. A browser-extension metadata error was present in the browser log and is external to the site.

## Findings

- No actionable P0, P1, or P2 visual findings remain.
- P3 / acceptable deviation: the source is a perspective photograph and the implementation is a clean browser capture, so exact font rasterization and bezel/camera treatment cannot match by design. The responsive implementation intentionally reflows the paired panels below the mobile breakpoint.

## Comparison history

1. Initial comparison: no P0/P1/P2 drift found in composition, guardrail strip, case layout, or response panels. No corrective visual iteration was required.
2. Interaction pass: verified navigation, recall state, dark/light state, active technique state, and two-way version routing; no app-origin runtime error appeared.
3. Mobile navigation iteration: replaced the tall mobile sidebar with a sticky horizontal touch rail, added compact labels and anchor offsets, then reran lint, build, and rendered-preview checks.

## Implementation checklist

- [x] Reference-style reading edition at `/v2`
- [x] Original practice-map edition retained at `/`
- [x] Two-way version links
- [x] Three wrong and three better responses per case
- [x] Mnemonics and do/don't guardrails
- [x] Random flashcard prompt
- [x] Responsive sidebar and stacked mobile comparison panels
- [x] Sticky mobile header with horizontal technique rail and active state
- [x] Light/dark theme toggle

final result: passed
