# Route C: Web-first Reveal.js Route

Route C is an experimental web-first route for cybozu/kintone-style presentation work. It uses Reveal.js, HTML, CSS, and JavaScript as the primary authoring environment, then delivers either a local web presentation or a PPTX export derived from rendered pages.

## Positioning

Route C is worth testing when the presentation needs:

- stronger motion, step-by-step reveal, or interaction than PowerPoint can comfortably express;
- web-grade layout control, responsive composition, and reusable theme tokens;
- a local demo experience for internal review or online meetings;
- an export path back to PPTX for sharing, archive, or customer handoff.

Route C should not replace Route A for high-maintenance editable business slides, and it should not replace B-hybrid for fast image-led static proposal pages. Treat it as a third route for dynamic or web-native presentation experiences.

## Relationship to Existing Routes

- Route A / native-first: editable PowerPoint business-document route. Best for tables, implementation steps, pricing, legal text, dense process detail, and frequent manual edits.
- Route B / image-first, B-pure: generated full-slide image route. Best for one-off visual-story pages where downstream editing is not important.
- Route B / image-first, B-hybrid: generated background plus editable PPT overlay route. Best for static proposal pages where visual impact and customer/product/logo replacement both matter.
- Route C / web-first: Reveal.js/HTML/CSS/JS route. Best for animated, interactive, or strongly controlled layouts that can be shown live and optionally exported to PPTX.

## Delivery Modes

### C-live

Use Reveal.js as the final presentation:

- run a local dev server;
- present in the browser;
- keep animation, fragments, transitions, embedded demos, and interactions live.

This is strongest for internal demos, online meetings, product concept walkthroughs, and storyboards where the browser is an acceptable delivery surface.

### C-export

Render each Reveal.js slide to a screenshot and place each screenshot as one full-slide image in PPTX.

This is the most reliable PowerPoint export path:

- visual fidelity is high;
- CSS, animation end states, custom layouts, and web rendering match the browser;
- PPTX editability is low because each page is essentially a bitmap.

Use this when the final handoff must be a PPTX but visual fidelity matters more than editability.

### C-hybrid-export

Render each Reveal.js slide to a screenshot background, then add a small editable PPT overlay layer.

This mirrors B-hybrid, but the background is produced by web rendering rather than image generation:

- screenshot background: layout, illustration, web UI, animation end state, scene composition;
- editable text layer: customer names, product names, slide titles, CTAs, legal notes, language variants;
- faithful asset layer: logos, icons, product marks, screenshots, and official UI inserted separately when exactness matters.

This is the preferred PPTX export mode for Route C experiments because it keeps the most reusable parts editable while preserving web-rendered visual quality.

## Other Export Options

### SVG export

HTML or SVG components can be exported as SVG and inserted into PPTX, but this is fragile. PowerPoint support for SVG/CSS is incomplete, especially for fonts, filters, masks, shadows, gradients, and `foreignObject`.

Use SVG export only for simple vector diagrams or icons with limited styling.

### Native PPTX reconstruction

HTML can act as a design compiler: build layout in web code, then use a script to recreate equivalent native PPTX objects. This gives editability but is expensive and brittle.

Use this only after Route C patterns become stable enough to justify a compiler-style pipeline.

## Recommended First Experiment

For the current multi-experiment plan, see `route-c-experiment-plan.md`. That plan supersedes this single first-experiment outline when running a batch of Route C tests.

Use the phone call record management scenario as the first Route C test:

1. Create a 3-slide Reveal.js story:
   - pain: phone calls and handwritten notes scatter follow-up;
   - system: kintone turns calls into shared records;
   - outcome: follow-up status and customer context become easier to reuse.
2. Serve it locally with a standard dev server.
3. Export two PPTX variants:
   - `C-export`: full-slide screenshots only;
   - `C-hybrid-export`: screenshots as backgrounds plus editable title/logo/page overlays.
4. Render previews and compare against A and B-hybrid outputs.

## Route C Workflow

1. Create or reuse a Text Lock. Route C still starts from claims and speaker notes, not from decoration.
2. Write a Reveal storyboard: slide id, claim, support, interaction/reveal steps, and desired final screenshot state.
3. Build a project-local Reveal.js deck under an output folder, not inside the plugin source unless the route is being formalized.
4. Define a small theme system: colors, fonts, spacing, slide-safe areas, logo position, footer rules, and overlay-safe zones.
5. Run a local dev server and inspect the live deck in browser.
6. Capture deterministic screenshots at 16:9 presentation resolution.
7. If exporting to PPTX:
   - for C-export, place one screenshot per slide;
   - for C-hybrid-export, place the screenshot as background and add the listed editable overlays.
8. Render the exported PPTX to PNG and compare it with browser screenshots.
9. Save a manifest documenting route mode, live URL, screenshot source, export method, overlays, and known non-editable regions.

## QA Gates

- C-live must fit the visible browser viewport without requiring scrolling at normal presentation zoom. If the content exceeds the screen, reduce the Reveal canvas size, simplify the layout, or split the content into more slides.
- Browser slides must be readable at 16:9 presentation scale before export.
- The exported PPTX preview must visually match the browser screenshot.
- Animation or fragment states used for screenshots must be deterministic and documented.
- Route C should use web-native strengths: text, cards, tables, status boards, dashboards, charts, simple icons, layout, transitions, and faithful logo/image assets. Do not build people, mascots, phones, vehicles, buildings, or other complex representational objects out of CSS/HTML primitive elements.
- Route C may pair with image generation for complex representational visuals. In that pattern, imagegen provides scene, people, object, or atmosphere assets; the web layer provides text, cards, tables, status boards, layout, interaction, and timing.
- C-hybrid-export overlays must be few and purposeful. If many cards, labels, arrows, or charts need to stay editable, use Route A or build a native reconstruction pipeline.
- C-hybrid-export must use a background-only screenshot pass. Hide title blocks, logo slots, page marks, and any primary copy that will become PPT overlay text.
- C-fragment-export should export only meaningful states by default. Do not turn every fragment into a PPTX slide unless the user explicitly wants presenter-step granularity.
- C-component-export is allowed when a web-rendered UI board, dashboard, or process module improves visual quality inside an otherwise native PPT page.
- Exact logos, product marks, app icons, and customer marks should be inserted as faithful assets, not redrawn in HTML unless the source asset is directly embedded unchanged.
- If live interactivity is the point, do not judge Route C only by the static PPTX export; evaluate C-live separately.

## Output Shape

Suggested run folder:

- `work/text-lock.md`
- `work/storyboard.md`
- `web/`
- `web/index.html`
- `web/src/` or `web/assets/`
- `screenshots/<slide-id>.png`
- `dist/<deck-name>.pptx`
- `dist/manifest.json`
- `dist/review.md`

## Open Questions

- Whether Reveal.js should become a formal plugin dependency or remain an experiment-local dependency.
- Whether screenshots should capture only final slide states or every fragment state as separate PPTX pages.
- Whether a lightweight HTML-to-PPTX native reconstruction layer is worth building for repeated layouts.
- Whether Route C should use generated image assets, source-deck assets, or pure web/CSS illustration for its first production-level test.

## Early Experiment Notes

The first Route C experiments suggest:

- phone call record management is a moderate fit for Route C, but B-hybrid is stronger for emotional scene-setting;
- field feedback improvement loops are a stronger fit for Route C because process nodes and staged states benefit from web-first layout and reveal timing;
- web-first drawings should avoid CSS-built characters or complex objects; use cards, tables, status boards, screenshots, logos, and simple icons instead;
- pairing Route C with imagegen is promising when a live deck needs emotional scene-setting plus web-native structure;
- C-component-export may become a practical support path for Route A / native-first when a polished UI-like module is needed but full-slide screenshots are too rigid;
- C-native-reconstruction should stay deferred until repeated layouts justify the engineering cost.
