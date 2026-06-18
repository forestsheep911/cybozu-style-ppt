# Route A Validation

## Prototype

First Route A validation prototype:

- Script: `scripts/build-route-a-validation.mjs`
- Command: `npm run validate:route-a`
- Output PPTX: `data/processed/style-analysis/validation/cybozu-style-route-a-validation.pptx`
- Rendered preview: `data/processed/style-analysis/validation/preview/cybozu-style-route-a-validation/`
- First reusable component asset deck: `plugins/cybozu-style-ppt/assets/cybozu-style-components.pptx`
- Asset build command: `npm run assets:build-components`

The prototype uses PptxGenJS to create editable native PowerPoint elements:

- text boxes
- rectangles and rounded rectangles
- lines and arrows
- simple icon tiles
- native dashboard mockup shapes
- simple mascot placeholder built from shapes

It intentionally does not embed extracted internal bitmap characters or icons.

## Validation Result

PowerPoint 16.0 opened the generated PPTX and exported all 5 slides to PNG.

The contact sheet passed the first visual-system check:

- yellow top/bottom rules read as kintone-style chrome;
- pale cream and white backgrounds match recent proposal decks;
- problem cards, app-pack layout, workflow steps, and dashboard mockup are legible;
- the deck remains native/editable rather than image-first.

## Findings

The Route A approach is viable for layout grammar and component scaffolding.

The current prototype still looks like a clean wireframe, not a finished cybozu-quality business deck. The missing layer is the standardized visual asset system:

- approved kintone/cloud badge treatment;
- proper app icons;
- human character poses;
- kintone mascot variants;
- better dashboard screenshot/mockup fidelity;
- more faithful title/section slide variants from real templates.

PptxGenJS can generate the basic native structure, but the skill should not rely on pure code for final quality. Use the combined Route A strategy:

1. Start from reusable template/component PPTX pages when available.
2. Use PptxGenJS for dynamic grids, flows, mockups, and generated variants.
3. Use OOXML only for template duplication or structural operations that PptxGenJS cannot handle.

## Tooling Note

One early generated deck failed to open in PowerPoint. The issue was isolated to the fifth slide after adding a complex card composition. A conservative replacement using simpler native shapes opened successfully. This supports keeping validation strict: every generated PPTX must be opened or rendered by PowerPoint before being considered valid.

## Next Validation Step

The first reusable component deck now exists under `plugins/cybozu-style-ppt/assets/`.
It has been upgraded from a copied validation prototype into a generated v1 component library with 11 editable pages.

Current generated examples include:

- title/section chrome
- problem card set
- app icon tile set
- workflow/process components
- dashboard mockup components
- solution map and before/after modules
- product introduction skeleton
- industry proposal one-pager
- implementation path and next action page
- role/responsibility labels without people drawings
- native-shape people and cloud mascot candidate pages, derived from an imagegen style reference

Next, open/render the v1 component deck in PowerPoint and tighten visual issues found in the preview pass. Future deck work should copy from this component deck first, generating new shapes only when needed.

## Polish Backlog

Prioritize these improvements before calling the component deck production-ready:

- Do not use people or mascot drawings by default. The current native-shape people and cloud mascot pages are candidates only; promote them to default components only after PowerPoint visual QA and user approval.
- Replace text-glyph app icons with editable icon drawings or approved icon assets.
- Add stronger title/section variants based on the newer kintone proposal decks.
- Add denser but controlled proposal slides: 2x2 cards, before/after, app-pack map, workflow, and dashboard plus callouts.
- Add a source-deck template-following experiment: duplicate one real proposal slide into a new PPTX and replace text while preserving its visual skeleton.
- Keep every candidate deck under PowerPoint render QA; a generated PPTX that cannot open is invalid even if the package is a valid zip.
