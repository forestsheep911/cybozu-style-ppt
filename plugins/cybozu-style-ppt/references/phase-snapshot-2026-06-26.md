# Phase Snapshot: Route and Asset Baseline

Date: 2026-06-26

This snapshot freezes the current project stage so future work can resume without reconstructing the route decisions from chat history.

## What Is Fixed For Now

### Route A / native-first

Route A is the editable PowerPoint-first route. Use it for maintainable business-document slides: tables, detailed process steps, pricing, legal notes, implementation detail, dashboards, status boards, and slides that users will revise manually.

Route A may use native PPT objects for information structure: text boxes, cards, tables, charts, badges, arrows, connectors, callouts, labels, frames, and abstract workflow nodes.

Route A must not draw representational art from primitive shapes. Do not build people, mascots, phones, buildings, tools, product marks, or realistic objects from dots, lines, polygons, freeform paths, or stacked geometric shapes.

### Route B / image-first

Route B is the generated-image route.

**B-pure** creates one complete full-slide generated image per page. It has the strongest composition freedom but low downstream editability and higher risk of text, logo, icon, and UI drift.

**B-hybrid** creates a generated background or scene, then adds a controlled editable PPT overlay layer. This is the strongest current path for reusable customer-facing static proposal pages.

B-hybrid layer contract:

- generated background: atmosphere, emotional force, people, scene, broad metaphor;
- editable text: customer names, product names, claims, CTA, language variants, legal notes, page marks;
- faithful assets: logos, product marks, app icons, screenshots, and approved finished icons inserted as original assets.

### Route C / web-first

Route C uses Reveal.js, HTML, CSS, and JavaScript as the authoring surface.

Current sub-routes:

- **C-live:** browser presentation. Best when motion, reveal timing, or demo-like interaction matters.
- **C-export:** one screenshot per slide packaged into PPTX. High visual fidelity, low editability.
- **C-hybrid-export:** background-only screenshots plus editable PPT overlays. Similar layer logic to B-hybrid, but the background comes from web rendering.
- **C-fragment-export:** selected Reveal fragment states become separate PPTX slides. Useful only when each exported state changes meaning.
- **C-component-export:** selected web-rendered components become PNG/SVG assets inside native PPT pages. Promising as a Route A support path.

C-native-reconstruction is deferred. It should not be pursued until repeated layouts justify building a compiler-like HTML-to-PPTX mapping layer.

## Experiment Findings

- Route A is dependable for editable information pages, but visually weaker for high-impact storytelling when it tries to construct scenes from native shapes.
- B-hybrid currently has the strongest promise for static, reusable proposal pages: generated backgrounds create impact, while text and identity overlays stay editable and faithful.
- C-live works technically, but should be used only when live browser behavior adds value.
- C-export is reliable for visual handoff, but bitmap-final.
- C-hybrid-export works only if a background-only screenshot pass is built intentionally. Full web screenshots with baked-in copy cannot be cleanly reused as editable PPT backgrounds.
- C-fragment-export can overproduce slides. The first phone-record test expanded 3 live slides to 13 PPTX pages.
- C-component-export looks useful for polished UI boards, status boards, and process modules inside otherwise native PPT decks.

## Current Key Artifacts

### Route and Skill Docs

- `plugins/cybozu-style-ppt/skills/cybozu-style-ppt/SKILL.md`
- `plugins/cybozu-style-ppt/references/production-routes.md`
- `plugins/cybozu-style-ppt/references/route-c-revealjs.md`
- `plugins/cybozu-style-ppt/references/route-c-experiment-plan.md`
- `outputs/c-route-experiment-summary.md`

### Asset References

- `plugins/cybozu-style-ppt/assets/source-decks/ryo-materials-26.pptx`
- `plugins/cybozu-style-ppt/references/ryo-materials-26-visual-catalog.md`
- `plugins/cybozu-style-ppt/references/ryo-materials-26-detailed-asset-catalog.csv`
- `plugins/cybozu-style-ppt/references/ryo-materials-26-layout-metadata.csv`
- `plugins/cybozu-style-ppt/assets/characters/manifest.json`
- `plugins/cybozu-style-ppt/assets/characters/ASSET_CATALOG.md`

### Output Experiments

- `outputs/ab-route-test-kintone-loop/`
- `outputs/b-hybrid-kintone-loop-v2/`
- `outputs/b-hybrid-phone-record/`
- `outputs/c-web-first-phone-record/`
- `outputs/c-web-first-field-feedback/`

## Route Selection Rule Of Thumb

Use Route A when correctness, manual editability, dense structure, or maintenance matters most.

Use B-hybrid when the page needs emotional impact, scene-setting, or proposal-level polish, but text, customer name, product name, logo, or CTA must remain quickly adjustable.

Use C-live when browser-native motion, staged reveal, or demo-like interaction is part of the actual presentation value.

Use C-export when the web-rendered result is the desired visual and a PPTX file is needed for sharing.

Use C-component-export when a web-rendered dashboard, status board, or process module can strengthen an otherwise native PPT deck.

## Near-Term Gaps

1. Route C needs a reusable capture/export script template instead of scenario-specific scripts.
2. Character asset metadata should be English-normalized. The Ryo asset catalog is already English-oriented, but `assets/characters/manifest.json` and `ASSET_CATALOG.md` still contain Chinese descriptions and usage fields.
3. The older untracked B-hybrid experiment leftovers should be either committed intentionally or removed after checking whether anything unique remains.
4. Main experiment folders should expose consistent commands for rebuild, screenshot capture, PPT export, and preview/contact-sheet generation.
5. Future production tests should include at least one real customer/proposal scenario with customer-name replacement and language replacement pressure.
