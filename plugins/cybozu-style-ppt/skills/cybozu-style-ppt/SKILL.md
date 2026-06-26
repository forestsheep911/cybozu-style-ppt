---
name: cybozu-style-ppt
description: Create cybozu/kintone-inspired presentation artifacts, including editable Route A PPTX decks, image-first Route B visual-story decks, and experimental Route C web-first Reveal.js decks or screenshot-derived PPTX exports. Use when Codex needs to design or generate slides for product introductions, solution proposals, LP-to-deck conversions, service demos, event materials, sales narratives, or internal enablement decks that should borrow cybozu/kintone visual language.
---

# Cybozu Style PPT

## Core Rule

Default to native, editable PPT elements for Route A / native-first. Do not flatten Route A slides into full-page screenshots. Use raster images for people, objects, mascots, product screenshots, illustration references, photos, or deliberate bitmap assets; build layout, text, buttons, cards, diagrams, charts, badges, arrows, callouts, labels, and section markers as editable PPT objects.

Route A must not use native PowerPoint dots, lines, polygons, freeform paths, or stacked geometric shapes to draw representational art such as people, faces, mascots, devices, trucks, tools, clouds, buildings, product marks, or other real-world objects. That shape-drawing route is too weak for production-stage visual quality. Route A native drawing is allowed for information structure only: boxes, dividers, arrows, connectors, tables, simple charts, status chips, labels, frames, and abstract workflow/architecture nodes.

Route B / image-first is the deliberate exception for image-first visual storytelling. It has two delivery modes:

- `B-pure`: one complete generated full-slide image per page. PowerPoint is only a delivery container for those generated images.
- `B-hybrid`: generated image backgrounds or generated partial visual regions, plus a small controlled layer of editable PPT overlays. Its positioning principle is: the generated background provides emotional force and scene comprehension; editable text overlays provide fast replacement of customer names, product names, claims, CTAs, and language variants; faithful logo/icon/product overlays preserve exact original design without model drift.

Route C / web-first is an experimental route using Reveal.js/HTML/CSS/JS. Use it when motion, interactivity, browser-native layout, local live presentation, or web-rendered component quality matters. It can be delivered as `C-live` browser presentation, `C-export` screenshot-based PPTX, `C-hybrid-export` screenshot backgrounds plus editable PPT overlays, `C-fragment-export` selected reveal states, or `C-component-export` web-rendered modules inside native PPT pages. See `../../references/route-c-revealjs.md` before implementing Route C.

## Production Routes

Use Route A as the default production route.

Route A is native editable PPTX production:

- Route A starts from the shared Text Lock, not from Route B imagery. It expresses the locked claims and support content as editable business slides.
- A1: generate native PowerPoint elements with code when a slide or component must be built dynamically.
- A2: reuse and adapt existing PPTX templates, layouts, and component pages whenever a suitable cybozu-style pattern exists.
- A4: directly inspect or edit PPTX OOXML only as a low-level fallback for template duplication, structural cleanup, relationship fixes, or edits that high-level libraries cannot perform reliably.
- Route A visual assets for people, objects, mascots, product-like marks, and scenes must come from approved raster/vector assets, verified source decks, product screenshots, photos, or user-provided files. Do not create those assets by drawing them from primitive PPT shapes.
- Route A may use native PPT shapes for controlled business-presentation grammar: text boxes, arrows, connectors, callout boxes, card containers, process lanes, tables, charts, badges, UI mockup frames, and other abstract information structures.

Prefer the combined Route A strategy: use A2 to preserve brand/style quality, use A1 for missing dynamic information components, use curated raster/vector assets for representational visuals, and reserve A4 for structural repair or precise template manipulation.

Route B is image-first visual production:

- Route B starts from the shared Text Lock, not from Route A slide layouts. It expresses the locked claims and support content as complete generated slide images: text design, visual metaphor, small visual elements, scene, composition, and hierarchy are resolved inside one whole-slide image.
- Use generated full-slide images when the user explicitly wants image-first output, when visual storytelling matters more than manual editability, or when the deck should feel like a designed visual narrative rather than an editable business document.
- Route B is not an A-route beautification layer. It is an independent visual-story production route based on Text Lock, storyboard, full-slide image prompts, generated slide PNGs, and one-image-per-slide PPTX packaging.
- Route B should inherit the topic, claims, audience, and brand cues from the source brief, but it should not inherit A-route slide layouts, card grids, left/right splits, or component structures unless they genuinely serve the visual idea.
- Use `B-pure` when visual expression, one-off customization, composition freedom, and emotional storytelling matter more than downstream editability. This is strongest for highly customized cover pages, concept pages, mood scenes, pain scenes, and cinematic before/after pages, but logos, icons, product UI, and small exact text may drift if generated inside the image.
- Use `B-hybrid` when the generated visual should carry atmosphere, scene, metaphor, emotion, and background composition, while user-adjustable or identity-sensitive elements remain editable in PPT. This is strongest for reusable customer variants: leave space for logos, customer names, product names, title text, CTA, legal notes, or approved finished assets so the same visual can be quickly adapted for multiple users.
- `B-hybrid` should treat each slide as three responsibility layers:
  - Generated background layer: mood, storytelling, people, scene, emotional contrast, and broad business metaphor.
  - Editable text layer: customer name, product name, claim, subtitle, CTA, legal/compliance text, slide number, and language-localized wording.
  - Faithful asset layer: logos, app icons, product marks, official UI screenshots, and approved finished icons inserted as original PPT/image assets so they remain crisp, movable, and unchanged.
- Route B may visually derive from approved people, object, mascot, and scene assets. It can generate new expressions, poses, gestures, camera angles, and scene variants as long as the audience can still recognize the asset family and role continuity from the source reference.
- Route B derivation must preserve character continuity: key silhouette, face/hair cues, clothing color, role markers, and overall illustration family should remain stable unless the storyboard explicitly calls for contrast or change.
- Route B must not freely alter identity assets. Logos, product marks, official brand characters, app icons, and product UI should be used only as verified references or preserved source assets; do not invent modified versions that could be mistaken for official marks.
- If Route B is used, make clear which mode is used. For `B-pure`, the main slide content is bitmap-final. For `B-hybrid`, the generated visual layer is bitmap-final, but the explicitly overlaid PPT objects remain editable and movable.
- Route C is web-first visual production. Use `C-live` when the browser presentation itself is the artifact. Use `C-export` when PowerPoint is required but static screenshot fidelity is acceptable. Use `C-hybrid-export` when web-rendered backgrounds should be preserved but customer/product names, main titles, logos, page marks, or compliance text should remain editable in PPT. Use `C-fragment-export` only for meaningful reveal states, and use `C-component-export` when a web-rendered UI/status/process module can strengthen an otherwise native PPT page.
- Use Route A for editable business-document decks: data, tables, legal copy, pricing, detailed implementation text, and frequently revised material. Use Route B for visual-narrative static decks: covers, chapters, concepts, pain scenes, before/after changes, workflow metaphors, operating loops, proposal openers, and memorable story transitions. Use Route C for browser-native motion, interaction, step-by-step demos, and web-grade layout experiments that may later be exported to PPTX.

## Workflow

1. Clarify the deck goal: audience, language, use case, desired action, required slide count or duration, and whether the deck is for pitch, proposal, training, demo, or executive review.
2. Collect product inputs: product/service name, one-sentence value proposition, top 3 differentiators, target industries, decision makers, company size, conversion or next-step goal, proof points, existing URLs, screenshots, and brand assets.
3. Create the Text Lock before choosing Route A or Route B. The Text Lock is the shared content/narrative final draft, not a layout draft.
4. Choose Route A, Route B, or experimental Route C after the Text Lock is stable:
   - Route A turns the Text Lock into an editable business PPT.
   - Route B turns the Text Lock into generated full-slide images, then packages those images into a non-editable visual-story PPTX.
   - Route C turns the Text Lock into a Reveal.js/web deck, then optionally exports screenshots or screenshot-plus-overlay PPTX.
5. Translate cybozu/kintone web style into PPT-native or visual-story patterns:
   - Large confident Japanese or Chinese headline with generous whitespace.
   - Warm yellow accents, black primary text, white or pale cream backgrounds, and restrained gray dividers.
   - For Route A: rounded cards with light borders, simple shadows, clear grouped modules, editable dashboard mockups, and curated bitmap/vector assets for people, objects, mascots, and scenes.
   - For Route B: claim-led typography, scene composition, small visual elements, metaphor, storyboard rhythm, and bitmap-final full-slide images.
   - Friendly but businesslike illustrations or pictograms, never decorative clutter.
6. Build slides according to the chosen route's editability boundary.
7. Verify readability at presentation scale. Check long labels, multilingual text, footer/navigation clutter, and whether every slide has one dominant message.

## Text Lock

Text Lock is the common upstream artifact for both Route A and Route B. It is a slide-by-slide content final draft, not a visual layout, wireframe, or component plan.

Create or infer a Text Lock before production whenever the task is more than a small targeted edit. If the user already provides a finalized outline, proposal text, script, or source deck, convert it into Text Lock form before deciding the route.

Each Text Lock slide should include:

- `claim`: one sentence the audience should remember.
- `support`: the facts, examples, steps, proof points, or explanation needed to support the claim.
- `speaker note`: how the presenter should explain the slide.
- `must keep`: exact product names, client names, numbers, legal/compliance language, CTA, and other non-negotiable text.
- `free to change`: optional wording, visual metaphor, scene, sequence, emphasis, and layout freedom.

Text Lock rules:

- Do not include layout instructions such as left/right split, three cards, dashboard mockup, or image on right unless the user explicitly requires that structure.
- Separate content truth from visual expression. A and B should share claims and required facts, but they do not need to share slide layout.
- Keep claims sharp enough that Route B can turn them into a visual scene and Route A can turn them into a business slide.
- If a slide mainly contains numbers, legal text, pricing, dense tables, or frequently revised implementation details, mark it as `Route A preferred`.
- If a slide mainly needs first-glance comprehension, emotion, visual metaphor, or memorable positioning, mark it as `Route B eligible`.

Recommended production chain:

`source material / brief` -> `Text Lock` -> `Route A editable deck` and/or `Route B visual-story deck`.

## Route B Visual-Story Workflow

Use this workflow when the user asks for `B方案`, `bitmap-b`, visual-first proposal pages, or a deck derived from `../../assets/bitmap-b/` experiments.

1. Start from a claim list, not from A-route slide layouts. Each slide needs one sentence the audience should remember. Treat that sentence as the page's visual anchor, not merely as a title.
2. Create a slide storyboard from the Text Lock. For each slide record: slide ID, title/claim, primary job, support points, speaker notes, and a visual metaphor. Do not include PowerPoint layout instructions.
3. Convert each storyboard slide into a model-ready full-slide image prompt. The prompt must describe the whole 16:9 slide image, including composition, text placement, visual hierarchy, style, source-reference assets, allowed variation, continuity constraints, and negative constraints. Text, icons, small elements, scene objects, arrows, labels, and background belong inside the generated image, not as later PPT overlays.
4. Use small visual asset families as prompt references, identity/role anchors, or style motifs, not as PPT objects to be manually arranged after generation. Route B may expand a character or object family into additional expressions, poses, and scene variants when the new image still reads as the same family. Current motif families are:
   - `b-pain-workers.png`: pain / current-state burden / scattered work.
   - `b-loop-hub.png`: kintone loop / input-approval-notification-aggregation / solution concept.
   - `b-style-board.png`: route-B asset system / reusable motif explanation / method pages.
   - `b-cloud-helper.png`: operation / support / AI or helper / cover and closing atmosphere.
5. For each source-reference asset used in generation, record whether it is `free-derivative`, `continuity-locked`, or `identity-locked`:
   - `free-derivative`: generic objects, non-brand pictograms, and loose scene motifs can be adapted freely to the storyboard.
   - `continuity-locked`: people, character families, kintone-style helper figures, and recurring scene assets can gain new expressions or poses, but must keep recognizable silhouette, colors, role, and style.
   - `identity-locked`: logos, product marks, official brand characters, app icons, and product UI must not be redesigned, parodied, recolored, or mutated into pseudo-official variants.
6. Choose `B-pure` or `B-hybrid` per deck or per slide before generation:
   - For `B-pure`, generate one complete full-slide image per storyboard slide.
   - For `B-hybrid`, generate the visual background or partial scene with intentional safe space for editable overlays. The prompt should explicitly reserve safe areas for the text layer and faithful asset layer. Record each overlay's asset, role, approximate position, and editability contract.
7. Generate the image asset for each storyboard slide. The normal source image path should be `assets/generated-slides/<slide-id>.png` inside the run/output folder.
8. Package the generated images into PPTX only after all PNGs exist:
   - `B-pure` PPTX must contain exactly one full-slide image per slide and no native editable visible content beyond notes.
   - `B-hybrid` PPTX may contain the generated image layer plus a small number of explicit editable overlays: logos, page marks, title text, fixed CTA, compliance notes, or approved finished assets. Do not add arbitrary editable slide decoration that turns the page back into Route A.
9. Add speaker notes to the PPTX notes pane from the storyboard. Notes are the editable presenter layer; in `B-pure` the slide itself is bitmap-final; in `B-hybrid` only the overlay layer is editable.
10. Produce a preview/contact sheet from the generated PNGs and final PPTX renders; review at thumbnail size and full size.
11. Audit the PPTX. A valid `B-pure` route passes only when each slide contains one full-slide picture and no native editable visible slide content beyond notes. A valid `B-hybrid` route passes when all editable overlays are intentional, listed, and limited to the agreed overlay contract.
12. Name outputs specifically. Suggested B-route run shape:
   - `work/text-lock.md`
   - `work/storyboard.md`
   - `prompts/README.md`
   - `prompts/<slide-id>.md`
   - `assets/generated-slides/<slide-id>.png`
   - `dist/<deck-name>.pptx`
   - `dist/preview.png`
   - `dist/review.md`

Route B QA gates:

- The deck should not look like isolated one-off images; the contact sheet needs a consistent but varied visual system, like a coherent visual storybook or editorial campaign.
- The deck should not look like an A-route deck with nicer pictures placed into the same boxes. If the contact sheet still reads as card grids, left/right business slides, dashboard placeholders, or manually assembled PPT objects, Route B has not been used fully.
- No slide should be driven by decorative imagery alone. Each slide needs a memorable claim and a visual metaphor that proves or dramatizes that claim.
- Recurring people, helper characters, objects, and scenes must maintain visible continuity across slides. New expressions or poses are welcome only when the viewer can still recognize the same source character or asset family.
- Identity-locked assets must remain cleanly bounded. In `B-pure`, avoid putting exact logos, product marks, app icons, and product UI inside the generated image unless the risk is acceptable for a draft. In `B-hybrid`, prefer adding those assets as separate PPT picture overlays so they remain crisp, movable, and unmutated.
- `B-hybrid` overlays must be few and purposeful. If the slide gains many editable cards, arrows, labels, and charts, it has crossed back into Route A and should be built as Route A instead.
- `B-hybrid` must preserve the layer contract: background for impact, editable text for fast customer/product/language switching, faithful assets for exact logo/icon/product appearance. Do not ask the image model to recreate official logos, product icons, customer marks, exact UI, or final slide copy when those elements can be overlaid.
- First-glance comprehension matters more than editability. A B-route slide passes only if the theme is clear before reading all body text.
- Do not use Route B for pages whose main risk is maintenance accuracy: numbers, long tables, quotations, pricing, legal notes, or frequently revised implementation details.
- Notes must be present in the PPTX package for production demos, not only in external planning text.
- The final response must identify B-route slides as bitmap-final / non-editable slide images.
- Visual polish from local PowerPoint, SVG, HTML, canvas, PIL, or shape-based assembly does not count as B-route image generation. Do not use local rendering as a substitute for generated full-slide images when the B-route deliverable claims to be image-first.

## Design Guidance

Use the reference screenshots and downloaded PPTX corpus only as brand/style direction, not as a design-quality benchmark or a layout to copy blindly. The source decks contain many rough, dense, and outdated slides; preserve recognizable cybozu/kintone cues while producing cleaner, stronger editable presentations.

For PPT, compress web sections into slide-level arguments:

- A website hero becomes a title or problem framing slide with one visual mockup.
- A diagnosis/card grid becomes a comparison or segmentation slide.
- A problem list becomes a 3-to-6 item pain slide with icons and short descriptions.
- A solution section becomes a workflow, architecture, or before/after slide.
- CTA buttons become next-step badges or closing-slide actions.

Keep decks operational rather than marketing-heavy. Avoid landing-page filler, long scrolling-page composition, and excessive decorative bands. Each slide should work as a standalone presentation page.

Do not imitate weak source-deck habits such as crowded screenshots, tiny tables, generic clip art, weak title hierarchy, old cyan gradient templates, or logo walls without editorial structure.

## Visual Defaults

- Canvas: 16:9 widescreen unless the user specifies another format.
- Palette: kintone-like yellow as the primary accent, black/dark charcoal for text, white and pale warm backgrounds, light gray for borders and panels, and a small number of secondary colors for charts or status tags.
- Typography: prefer clean sans-serif fonts available in PowerPoint. Use bold weight for headings, regular weight for body text, and avoid dense paragraphs.
- Shapes: use 4-8 px corner radius equivalents for cards and buttons; use larger rounded containers only for dashboard mockups or intentional soft panels. Do not use shape stacks to draw characters, mascots, objects, or branded marks.
- Icons: use existing icon assets, verified source-deck icons, or a consistent external icon family where possible. Keep icon style consistent within a deck. Do not invent product-like icons with primitive shapes when an asset is available.
- Data visuals: prefer editable bars, donut segments, status tags, timelines, and flow arrows over imported chart screenshots.

## Reference Files

Read these only when needed:

- `../../references/ppt-style-notes.md`: condensed guidance extracted from the initial teammate material and screenshots.
- `../../references/production-routes.md`: Route A/Route B/Route C strategy for native editable PPTX, image-first output, and web-first presentation output.
- `../../references/route-c-revealjs.md`: experimental Reveal.js route for C-live, C-export, and C-hybrid-export.
- `../../references/route-c-experiment-plan.md`: planned Route C experiment batches, including C-live, C-export, C-hybrid-export, C-fragment-export, C-component-export, and native reconstruction spike.
- `../../references/phase-snapshot-2026-06-26.md`: current freeze-point summary of route decisions, experiment findings, artifacts, and near-term gaps.
- `../../references/route-a-validation.md`: first Route A editable-PPTX validation result and next validation step.
- `../../references/source-material-plan.md`: plan for inspecting future PPT/PDF source batches and turning repeated cybozu-style elements into reusable editable assets.
- `../../references/source-quality-assessment.md`: judgment that the PPTX corpus is useful for brand cues but not a design-quality benchmark.
- `../../references/visual-language-observations.md`: first visual-language observations from rendered cybozu/kintone PPTX samples.
- `../../references/ryo-materials-26-visual-catalog.md`: catalog for `呂の素材集26.pptx`, including visual baseline, asset families, usage rules, and links to the full small-element index.
- `../../references/source/kintone-html-skill-experience.md`: original teammate note about a kintone-style HTML skill.
- `../../references/screenshots/official-site-reference.png`: official-site style reference.
- `../../references/screenshots/generated-page-reference.png`: generated-page style reference.

## Output Expectations

When creating a Route A deck, deliver the editable PPTX and mention any non-editable raster/vector assets used. If a slide intentionally uses a screenshot or illustration asset, keep it as a framed/supporting content asset rather than the whole slide unless the user explicitly asks for a bitmap page.

When creating a Route B deck, identify whether it is `B-pure` or `B-hybrid`. For `B-pure`, deliver it as a visual-story artifact made from generated full-slide images; the PPTX is a non-editable image container with one full-slide image per page. For `B-hybrid`, deliver the generated image layer plus the agreed editable overlay objects, and list those overlays in the manifest or review. Speaker notes are part of both deliverables. If source material is thin, produce a reasonable first draft and flag the exact missing inputs that would improve the next iteration.

## Bundled Assets

- `../../assets/cybozu-style-components.pptx`: editable Route A component library generated by `npm run assets:build-components`. Use it as the starting reference for native slide chrome, section pages, problem cards, app-pack layouts, workflow/process blocks, dashboard mockups with callouts, solution maps, product intro pages, industry proposal one-pagers, implementation paths, and role/responsibility labels. Treat it as v1: cleaner and more useful than the validation prototype, but still pending PowerPoint-rendered visual QA and approved icon assets. Do not promote any native-shape people or mascot candidates into production defaults.
- `../../assets/source-decks/ryo-materials-26.pptx`: copied source asset collection from `呂の素材集26.pptx`. Use as a visual/source deck for cybozu/kintone-adjacent tone and candidate small elements. See `../../references/ryo-materials-26-visual-catalog.md` and `../../references/ryo-materials-26-detailed-asset-catalog.csv` before using any asset.
- `../../assets/characters/`: approved candidate transparent PNG character and scenario assets extracted from existing PPT materials. Use these as raster illustrations inside editable PPT layouts; keep labels, callouts, arrows, cards, and role chips as native PPT elements.
- People, object, and cloud mascot drawings must not be recreated with native geometric PPT shapes. Production decks should use role/responsibility labels, approved screenshots, photos, verified source assets, or the approved character assets instead.
- `../../assets/bitmap-b/`: Route B reference motifs and previous experiments. Use these to inform full-slide image prompts and style direction. Do not assemble Route B slides by manually placing many motif files as separate PPT objects. For `B-pure`, the intended output is one complete generated slide image. For `B-hybrid`, separate PPT overlays are limited to the explicit overlay contract such as logos, fixed titles, page marks, CTA, legal notes, or approved finished assets.
