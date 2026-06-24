# AB Route Test Review: kintone Field Feedback Loop

## Outputs

- Shared Text Lock: `../work/text-lock.md`
- Shared storyboard: `../work/storyboard.md`
- Route A deck: `route-a-editable-kintone-loop.pptx`
- Route B deck: `route-b-image-kintone-loop.pptx`
- Combined contact sheet: `ab-contact-sheet.jpg`
- Route A preview: `route-a-contact-sheet.jpg`
- Route B preview: `route-b-contact-sheet.jpg`

## Mechanical Checks

- Route A PPTX opened in PowerPoint and exported 4 slide PNGs.
- Route B PPTX opened in PowerPoint and exported 4 slide PNGs.
- Route B deck uses one full-slide bitmap per page.
- Both decks use the same 4-slide Text Lock and storyboard.

## Route A Observations

Route A is controlled and editable, but this test output is not presentation-ready. It follows the new rule mechanically: text, arrows, cards, loop nodes, and labels are native PPT objects; people/helper visuals are inserted as raster assets from the catalog instead of being drawn from primitive shapes. That proves the production boundary, but not the final quality bar.

Strengths:

- Safe for business-document pages that need later editing.
- Claims and structure are easy to revise.
- No fake character drawing or shape-built mascot.
- Good for workflow, cards, process, and next-action pages.

Weak spots:

- The visual hierarchy is too weak: small titles, small body text, and large empty white areas make the pages feel like a wireframe.
- Source assets feel pasted on rather than composed into the page. They satisfy the asset rule but do not yet create a stage-quality visual scene.
- The yellow top/bottom rules are consistent but too generic; they do not create enough cybozu/kintone character by themselves.
- The slide rhythm is too similar: title plus sparse objects repeated across pages.
- The proof objects are thin. The workflow loop and cards explain the idea, but they do not yet have the density, polish, or specificity expected from a client-facing presentation.
- It needs a real Route A template layer: stronger title treatments, curated asset slots, better scale rules, more intentional whitespace, and reusable composition patterns.

## Route B Observations

Route B has much stronger first-glance storytelling. It successfully turns the same text into a coherent visual sequence, and the blue field worker / dark business manager / yellow helper remain broadly recognizable across slides.

Strengths:

- Better emotional arc: stress, connection, relief, continued improvement.
- Stronger full-slide composition and scene integration.
- Character continuity is viable; the same role can gain new expressions and poses.
- Better suited for proposal openings, concept pages, and visual-narrative moments.

Weak spots:

- The first generated second slide mixed English and Japanese; regenerating with a hard `ENGLISH ONLY` rule fixed the visible mixed-language issue for this test.
- The model still tends to add small labels, pseudo-document marks, and UI-like fragments unless the prompt explicitly forbids them.
- Some in-image text is not guaranteed to match exactly or remain legible.
- B needs a stricter prompt pattern: one large title, only essential labels, no tiny document text, no fake app/icon/logo marks.
- Identity-locked assets still need explicit handling when a real product mark is required.

## Practical Rule From This Test

- Use Route A for editable argument structure: workflow, cards, data, approvals, tables, next steps, and pages likely to be revised.
- Use Route B for story pages: opening, pain scenes, before/after, improvement loop metaphor, closing mood, or any slide where audience comprehension depends on visual emotion.
- Do not expect Route B to handle precise legal/product text inside the image. Keep exact wording either very large or in Route A.
- Do not expect Route A to create stage-quality representational art. Use curated assets or switch that page to Route B.
- Current Route A implementation should be treated as a structural prototype, not the final design standard. The next Route A milestone should be a stronger template/component system, not more ad hoc slide code.
