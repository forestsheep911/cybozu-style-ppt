# Production Routes

## Route A: Native Editable PPTX

Route A is the primary route for this skill. It combines three techniques:

- **A1: Code-generated native elements.** Use libraries such as PptxGenJS or python-pptx to create editable text boxes, shapes, charts, tables, image frames, arrows, cards, and dashboard mockups.
- **A2: Template-driven production.** Reuse existing PPTX layouts, master slides, component pages, and branded slide patterns. Copy slides or layouts, then replace content while preserving the original style.
- **A4: OOXML fallback.** Unpack and edit PPTX XML directly only when needed for structural operations, relationship fixes, cleanup, or precision edits that high-level libraries cannot perform.

Use A2 first when a suitable cybozu-style pattern exists. Use A1 to fill gaps with dynamic components. Use A4 sparingly as an engineering fallback.

This mirrors the practical pattern in Anthropic's public PPTX skill: PptxGenJS for creating from scratch, template analysis and XML-level editing for adapting existing decks, and visual QA by rendering slides.

## Route B: Image-First PPTX

Route B packages generated images into slides. It can create more visually polished first drafts, but the result is not manually editable as native PPT objects.

Use Route B only when:

- the user explicitly wants image-first output;
- the deck is intended as a visual concept, story moodboard, or non-editable presentation artifact;
- speed and visual polish matter more than downstream PowerPoint editing.

## Current Direction

For cybozu-style business decks, prioritize Route A. The immediate work is not to invent a new rendering engine, but to learn how cybozu-style elements are drawn:

- character/person assets and poses;
- yellow section devices, ribbons, labels, badges, and tabs;
- dashboard and kintone-like UI panels;
- before/after problem diagrams;
- workflow and approval/process diagrams;
- card grids, solution maps, and proposal templates.

The 210 downloaded PPTX files are the first corpus for extracting these reusable visual patterns.
