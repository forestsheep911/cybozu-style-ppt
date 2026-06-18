# Review: Route B Whole-Image Prototype

## Result

- Deck: `cybozu-kintone-loop-b-whole-image.pptx`
- Preview: `preview.png`
- PowerPoint render check: passed; 4 slides exported to `powerpoint-preview/cybozu-kintone-loop-b-whole-image/`.
- Structural check: passed; each slide has exactly one picture object and zero native shape objects.
- Notes check: passed; 4 notes slides are present.

## Route B Fit

This run follows the revised Route B definition:

- Text Lock and storyboard define the narrative first.
- Each slide is generated as one complete 16:9 image.
- The PPTX is only a presentation container for full-slide bitmap images.
- Visible slide content is bitmap-final and not natively editable.
- Editing should happen by revising `work/text-lock.md`, `work/storyboard.md`, or `prompts/*.md`, then regenerating slide images.

## Visual Review

- The overall style is coherent: warm yellow, friendly business illustration, and a recurring cloud helper.
- Slide composition is no longer built from separate generated parts inside PowerPoint.
- Main Japanese headlines are readable in the preview.
- Small handwritten labels inside generated scenes may still contain unstable or semi-legible text; future B-route prompts should either avoid tiny text or reserve text for large title areas only.

## Fix Log

- 2026-06-18: Regenerated slide `03_continue.png` because the small calendar stamp text `振り返り` was blurry. The revised slide keeps `振り返って 気づく` in the large loop step and uses only short, larger calendar labels such as `確認`, `改善`, and `決定`.

## Recommended Next Iteration

- Keep one strong headline per slide.
- Avoid many small in-image labels unless they are essential.
- For product-accurate diagrams, generate the atmosphere and structure first, then use a separate A-route/native layer only if editability or exact legal/product wording is required.
