# Production Routes

## Route A: Native-first PPTX

Route A is the native-first route for this skill. It combines three techniques:

- **A1: Code-generated native elements.** Use libraries such as PptxGenJS or python-pptx to create editable text boxes, shapes, charts, tables, image frames, arrows, cards, and dashboard mockups.
- **A2: Template-driven production.** Reuse existing PPTX layouts, master slides, component pages, and branded slide patterns. Copy slides or layouts, then replace content while preserving the original style.
- **A4: OOXML fallback.** Unpack and edit PPTX XML directly only when needed for structural operations, relationship fixes, cleanup, or precision edits that high-level libraries cannot perform.

Use A2 first when a suitable cybozu-style pattern exists. Use A1 to fill gaps with dynamic components. Use A4 sparingly as an engineering fallback.

This mirrors the practical pattern in Anthropic's public PPTX skill: PptxGenJS for creating from scratch, template analysis and XML-level editing for adapting existing decks, and visual QA by rendering slides.

## Route B: Image-first PPTX

Route B packages generated images into slides. It can create more visually polished first drafts and stronger scene-level storytelling than native editable composition.

Route B now has two modes:

- **B-pure:** one generated full-slide image per page. The slide itself is bitmap-final; PowerPoint is mainly a delivery container.
- **B-hybrid:** generated image backgrounds or partial visual regions, plus a small controlled editable overlay layer.

For B-hybrid, keep a clear three-layer contract:

- generated background: emotional force, scene comprehension, people, mood, and broad metaphor;
- editable text: customer names, product names, claims, CTAs, legal notes, page marks, and language variants that must be quickly replaced;
- faithful assets: logos, app icons, product marks, screenshots, and approved finished icons inserted as original PPT/image assets so they remain crisp and unchanged.

Use Route B only when:

- the user explicitly wants image-first output;
- the deck is intended as a visual concept, story moodboard, or visual-story presentation artifact;
- speed and visual polish matter more than full downstream PowerPoint editing;
- for B-hybrid specifically, the desired editability is limited to controlled overlays rather than the whole slide.

## Route C: Web-first Reveal.js

Route C is an experimental web-first route. It uses Reveal.js, HTML, CSS, and JavaScript as the main authoring environment, then delivers either a browser presentation or a PPTX derived from rendered screenshots.

Use Route C when:

- motion, fragments, interaction, or step-by-step reveal are central to the presentation;
- web-grade layout control is more valuable than native PowerPoint editing;
- the user can present from a local browser or wants a live demo-like experience;
- a PPTX export is still useful for sharing, archive, or customer handoff.

Route C has five tested or planned delivery modes:

- **C-live:** run a local server and present in the browser. This preserves motion and interaction.
- **C-export:** screenshot each Reveal.js slide and package the screenshots as full-slide PPTX images.
- **C-hybrid-export:** screenshot each Reveal.js slide as a background, then add a small editable PPT overlay layer for titles, logos, customer names, product names, CTAs, legal notes, or page marks.
- **C-fragment-export:** export selected Reveal fragment states as separate PPTX pages when each state changes presenter meaning.
- **C-component-export:** export selected web-rendered UI/status/process components into otherwise native PPT pages.

See `route-c-revealjs.md` before implementation. Route C should be evaluated separately from B-hybrid because the source of visual quality is browser rendering rather than image generation.

## Current Direction

For cybozu-style business decks, prioritize Route A for maintainable information pages, B-hybrid for high-impact static proposal pages, and Route C for experimental motion/web-first presentations or web-rendered components. The immediate work is not to invent a new rendering engine, but to learn how cybozu-style elements are drawn:

- character/person assets and poses;
- yellow section devices, ribbons, labels, badges, and tabs;
- dashboard and kintone-like UI panels;
- before/after problem diagrams;
- workflow and approval/process diagrams;
- card grids, solution maps, and proposal templates.

The 210 downloaded PPTX files are the first corpus for extracting these reusable visual patterns.
