# Ryo Materials 26 Visual Catalog

Source deck copied from `C:\Users\bxu\Downloads\呂の素材集26.pptx`.

- Project copy: `../assets/source-decks/ryo-materials-26.pptx`
- Slide preview folder: `source-deck-previews/ryo-materials-26/`
- Slide contact sheet: `source-deck-previews/ryo-materials-26-contact-sheet.jpg`
- Extracted media folder: `../assets/source-decks/ryo-materials-26-media/ryo-materials-26/images/`
- Full media inventory: `../assets/source-decks/ryo-materials-26-media/ryo-materials-26/media-inventory.json`
- Small element index: `ryo-materials-26-element-index.csv`
- Layout metadata index: `ryo-materials-26-layout-metadata.csv`
- Detailed per-element catalog: `ryo-materials-26-detailed-asset-catalog.csv`
- Small element contact sheet: `../assets/source-decks/ryo-materials-26-media/ryo-materials-26/small-assets-contact-sheet.jpg`
- Labeled element contact sheets: `source-deck-previews/ryo-materials-26-labeled-elements/elements-01.jpg` through `elements-07.jpg`

## Inventory Summary

- Slides: 17
- Embedded image media: 309
- Small image candidates: 262
- Small candidates with alpha channel: 261
- Transparent cutout candidates: 137
- Source type: mixed asset collection, not a single finished deck template.

## Per-Element Catalog Fields

Use `ryo-materials-26-detailed-asset-catalog.csv` as the primary working file when selecting assets for production. It combines visual recognition and layout metadata for each `RYO26-###` asset.

Key fields:

- `asset_id`: stable project ID, matched to the labeled contact sheets.
- `file`: extracted PNG path under the media folder.
- `asset_name`: concrete English visual identification, such as `abacus`, `stressed man at computer`, or `kintone English logo`.
- `semantic_category`: searchable family such as `finance-calculation`, `business-person-scene`, `kintone-mascot-scene`, or `identity-logo`.
- `subject_keywords`: what the element can represent in a slide.
- `visual_style`: observed style family.
- `best_use`: recommended use in PPT production.
- `caution`: usage boundary, including identity-asset warnings.
- `width_px` / `height_px`: source pixel size.
- `aspect_ratio_decimal` / `aspect_ratio_simple`: layout ratio for slot planning.
- `orientation`: `square`, `landscape`, or `portrait`.
- `has_alpha`: whether the file has an alpha channel.
- `transparent_pixel_ratio`: rough ratio of non-opaque pixels; high values usually mean a cutout with transparent whitespace.
- `ppt_crop_behavior`: placement guidance for transparent versus opaque assets.
- `layout_slot_hint`: suggested layout role, such as icon node, logo strip, standing person, or scene illustration.
- `scale_caution`: reminder not to over-enlarge small raster assets.

Use `ryo-materials-26-layout-metadata.csv` when only geometry, transparency, and layout behavior matter.

## Visual Baseline

This deck is useful for locating a cybozu/kintone-adjacent visual tone:

- light, friendly, Japanese business-document atmosphere;
- white canvas with small colorful elements rather than heavy decorative backgrounds;
- yellow kintone mascot and cloud shapes as high-recognition brand motifs;
- compact app/product icons arranged in clean grids;
- simple business people in flat/semi-flat illustration styles;
- operational icons for approval, schedule, documents, email, phone, finance, factory, logistics, and IT;
- light comic-like line drawings for casual explanation, pain points, and support scenes.

It should not be treated as a production-quality template by itself. The source mixes multiple illustration families, icon sets, and brand assets. Use it as an asset source and tone reference, then apply stricter consistency rules in final decks.

## Asset Families

| Family ID | Source slides | What it contains | Style | Best use | Caution |
|---|---:|---|---|---|---|
| RYO26-F01 | 1-2 | Source notes and reference links | plain documentation page | Provenance trail and future source checking. | Do not use as slide design reference. |
| RYO26-F02 | 3 | cybozu, kintone, Garoon, サイボウズ marks and mascot marks | official/brand-adjacent logo sheet | Brand recognition reference, placement scale, color relationship. | Treat as identity assets. Do not redraw, approximate, recolor, or use as pseudo-logo without verified rights and context. |
| RYO26-F03 | 4-6 | dense app/service icon grids, round icons, square icons, decorative strips | colorful flat icon systems | Category labels, app lists, feature map placeholders, dashboard legends. | Avoid mixing round and square systems on one slide. Do not claim these are official kintone app icons unless provenance is verified. |
| RYO26-F04 | 7 | yellow kintone mascot scenes, helper poses, cloud-like characters | cute yellow mascot illustration | Friendly opening, support/help page, workflow guide, light CTA, Route B prompt reference. | Keep away from serious legal, pricing, security, or dense data slides. One mascot family per slide. |
| RYO26-F05 | 8 | document, email, phone, OK stamp, gears, paper stack, device icons | utilitarian business pictograms | Process diagrams, approval flow, notification flow, admin/settings callouts. | These are functional pictograms; do not use as decorative filler. |
| RYO26-F06 | 9 | generic symbols: checklist, arrows, delete, calendar, lock, Wi-Fi, truck, chart | flat operational icon cutouts | Quick status markers, process nodes, before/after labels, field-service stories. | Some symbols are dated; use at small or medium size only. |
| RYO26-F07 | 10-12 | standing office workers, business avatars, call center / PC workers | Japanese business illustration, early 2010s PPT style | Role/persona pages, customer/user representation, office workflow scenes. | Style is dated and mixed. Do not combine with modern kintone mascot assets unless intentionally contrasting "old work" and "new work". |
| RYO26-F08 | 13-15 | doctors, factory workers, construction workers, service staff, many occupations | vertical/portrait business character set | Industry-specific proposal slides, role maps, stakeholder clusters. | Good for broad industry signaling, weak for premium hero visuals. Keep figures small to medium. |
| RYO26-F09 | 16 | many small business activity cutouts | mixed flat business scenes | Appendix-like role libraries, training/example pages, small scenario callouts. | Use only after picking one consistent subset. A collage of many poses will look like a raw asset-library page. |
| RYO26-F10 | 17 | hand-drawn line characters and task scenes | loose monochrome line illustration with yellow accents | Pain-point narration, casual internal training, idea sketches, low-pressure explanation. | Do not mix with flat colorful icon grids or formal brand pages. |

## Element Usage Rules

### Brand / identity elements

Use only when the deck explicitly concerns cybozu/kintone or related products and the asset provenance is acceptable for the audience.

- Suitable: title page logo placement reference, product family explanation, internal style analysis.
- Unsuitable: generated fake logos, decorative icon replacement, unofficial public-facing brand marks.
- Production rule: preserve original asset files if used; do not manually recreate the mark with shapes.

### App and function icons

Use as a secondary visual language for modules, features, or workflow nodes.

- Round icons: softer, older, suitable for low-stakes category clusters or app pack overview.
- Square rounded icons: stronger dashboard/app-tile feeling; better for kintone-like app map pages.
- Long-shadow icons: dated but readable; use when a retro SaaS asset-library feel is acceptable.
- Avoid: mixing icon backgrounds, shadow systems, and corner radii in the same component group.

### Yellow mascot and cloud helpers

Use to soften transitions and make the deck feel approachable.

- Suitable: cover corner, help/support slide, "guide" role, onboarding, summary, Route B mood reference.
- Unsuitable: compliance, security, pricing, detailed KPI, executive decision slide.
- Rule: one mascot role per slide. If the mascot is present, keep other character families quiet.

### Business people

Use for roles, stakeholders, "before/after work style", or industry personas.

- Office workers: business users, managers, admins, sales, support.
- Factory/construction workers: frontline, field work, manufacturing, maintenance.
- Doctors/service roles: industry examples, customer vertical pages.
- Rule: keep character scale consistent. Do not build a hero page from many small mismatched people.

### Line drawings

Use when the page should feel like a sketch, note, or problem discovery.

- Suitable: pain point, workshop, internal explanation, low-fidelity process sketch.
- Unsuitable: polished proposal cover, brand statement, formal product architecture.
- Rule: pair with simple black/gray text and one yellow accent; avoid colorful icon clusters.

## Suggested Use In Cybozu-Style PPT Production

For Route A:

- Treat the source PPTX as a visual source deck, not a layout template.
- Copy verified bitmap assets only as illustrations inside editable PPT layouts.
- Keep titles, cards, labels, arrows, badges, process blocks, and callouts as native editable PPT objects.
- Use `ryo-materials-26-element-index.csv` to locate candidate media files, then inspect the actual PNG before using it.

For Route B:

- Use this deck as prompt vocabulary and style reference: "friendly Japanese business asset collection, white canvas, kintone yellow helper, small colorful app icons, lightweight operational scenes."
- Do not assemble Route B pages by manually placing many extracted PNGs. Generate or design one complete full-slide visual when Route B is requested.

## Selection Checklist

Before using any element from this deck:

1. Does the visual family match the rest of the slide?
2. Is the element brand/identity-related? If yes, is provenance and usage acceptable?
3. Is the element carrying meaning, not just filling space?
4. Is the element large enough to read but not so large that its dated style dominates?
5. Are labels, arrows, and explanatory text still editable PPT objects?

## Open Cleanup Backlog

- Create a curated subset folder after visual review, instead of using all 309 extracted images directly.
- Rename high-value assets from `image###.png` to semantic filenames.
- Promote only approved assets into `assets/characters/` or a future `assets/ryo-materials-26-curated/` folder.
- Add per-family contact sheets once the first production deck uses this source.
