---
name: cybozu-style-ppt
description: Create PowerPoint decks in a cybozu/kintone-inspired style, including editable Route A decks and image-first Route B visual-story decks. Use when Codex needs to design or generate PPT/PPTX slides for product introductions, solution proposals, LP-to-deck conversions, service demos, event materials, sales narratives, or internal enablement decks that should borrow cybozu/kintone visual language.
---

# Cybozu Style PPT

## Core Rule

Default to native, editable PPT elements for Route A. Do not flatten Route A slides into full-page screenshots. Use raster images only for product screenshots, illustration references, photos, or deliberate bitmap assets; build layout, text, buttons, cards, diagrams, charts, badges, and section markers as editable PPT objects.

Route B is the deliberate exception: it produces complete full-slide images when visual storytelling, first-glance comprehension, and free composition matter more than editability. In Route B, PowerPoint is only a delivery container for those generated full-slide images.

## Production Routes

Use Route A as the default production route.

Route A is native editable PPTX production:

- Route A starts from the shared Text Lock, not from Route B imagery. It expresses the locked claims and support content as editable business slides.
- A1: generate native PowerPoint elements with code when a slide or component must be built dynamically.
- A2: reuse and adapt existing PPTX templates, layouts, and component pages whenever a suitable cybozu-style pattern exists.
- A4: directly inspect or edit PPTX OOXML only as a low-level fallback for template duplication, structural cleanup, relationship fixes, or edits that high-level libraries cannot perform reliably.

Prefer the combined Route A strategy: use A2 to preserve brand/style quality, use A1 for missing dynamic components, and reserve A4 for structural repair or precise template manipulation.

Route B is image-first full-slide production:

- Route B starts from the shared Text Lock, not from Route A slide layouts. It expresses the locked claims and support content as complete generated slide images: text design, visual metaphor, small visual elements, scene, composition, and hierarchy are resolved inside one whole-slide image.
- Use generated full-slide images when the user explicitly wants image-first output, when visual storytelling matters more than manual editability, or when the deck should feel like a designed visual narrative rather than an editable business document.
- Route B is not an A-route beautification layer. It is an independent visual-story production route based on Text Lock, storyboard, full-slide image prompts, generated slide PNGs, and one-image-per-slide PPTX packaging.
- Route B should inherit the topic, claims, audience, and brand cues from the source brief, but it should not inherit A-route slide layouts, card grids, left/right splits, or component structures unless they genuinely serve the visual idea.
- If Route B is used, make clear that the main slide content is bitmap-final. Do not promise editable text, charts, shapes, or layout objects inside the slide image.
- Use Route A for editable business-document decks: data, tables, legal copy, pricing, detailed implementation text, and frequently revised material. Use Route B for visual-narrative decks: covers, chapters, concepts, pain scenes, before/after changes, workflow metaphors, operating loops, proposal openers, and memorable story transitions.

## Workflow

1. Clarify the deck goal: audience, language, use case, desired action, required slide count or duration, and whether the deck is for pitch, proposal, training, demo, or executive review.
2. Collect product inputs: product/service name, one-sentence value proposition, top 3 differentiators, target industries, decision makers, company size, conversion or next-step goal, proof points, existing URLs, screenshots, and brand assets.
3. Create the Text Lock before choosing Route A or Route B. The Text Lock is the shared content/narrative final draft, not a layout draft.
4. Choose Route A or Route B after the Text Lock is stable:
   - Route A turns the Text Lock into an editable business PPT.
   - Route B turns the Text Lock into generated full-slide images, then packages those images into a non-editable visual-story PPTX.
5. Translate cybozu/kintone web style into PPT-native or visual-story patterns:
   - Large confident Japanese or Chinese headline with generous whitespace.
   - Warm yellow accents, black primary text, white or pale cream backgrounds, and restrained gray dividers.
   - For Route A: rounded cards with light borders, simple shadows, clear grouped modules, and editable dashboard mockups.
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
3. Convert each storyboard slide into a model-ready full-slide image prompt. The prompt must describe the whole 16:9 slide image, including composition, text placement, visual hierarchy, style, and negative constraints. Text, icons, small elements, scene objects, arrows, labels, and background belong inside the generated image, not as later PPT overlays.
4. Use small visual asset families only as prompt references or style motifs, not as PPT objects to be manually arranged after generation. Current motif families are:
   - `b-pain-workers.png`: pain / current-state burden / scattered work.
   - `b-loop-hub.png`: kintone loop / input-approval-notification-aggregation / solution concept.
   - `b-style-board.png`: route-B asset system / reusable motif explanation / method pages.
   - `b-cloud-helper.png`: operation / support / AI or helper / cover and closing atmosphere.
5. Generate one full-slide image per storyboard slide. The normal source image path should be `assets/generated-slides/<slide-id>.png` inside the run/output folder.
6. Package the generated slide PNGs into PPTX only after all PNGs exist. The PPTX must contain exactly one full-slide image per slide and no native editable text boxes, charts, tables, shapes, labels, or manually arranged illustration pieces.
7. Add speaker notes to the PPTX notes pane from the storyboard. Notes are the editable presenter layer; the slide itself is bitmap-final.
8. Produce a preview/contact sheet from the generated PNGs and review it at thumbnail size and full size.
9. Audit the PPTX. A valid B-route PPTX passes only when each slide contains one full-slide picture and no native editable slide content beyond notes.
10. Name outputs specifically. Suggested B-route run shape:
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
- Shapes: use 4-8 px corner radius equivalents for cards and buttons; use larger rounded containers only for dashboard mockups or intentional soft panels.
- Icons: use simple line or filled icons where possible. Keep icon style consistent within a deck.
- Data visuals: prefer editable bars, donut segments, status tags, timelines, and flow arrows over imported chart screenshots.

## Reference Files

Read these only when needed:

- `../../references/ppt-style-notes.md`: condensed guidance extracted from the initial teammate material and screenshots.
- `../../references/production-routes.md`: Route A/Route B strategy for native editable PPTX versus image-first output.
- `../../references/route-a-validation.md`: first Route A editable-PPTX validation result and next validation step.
- `../../references/source-material-plan.md`: plan for inspecting future PPT/PDF source batches and turning repeated cybozu-style elements into reusable editable assets.
- `../../references/source-quality-assessment.md`: judgment that the PPTX corpus is useful for brand cues but not a design-quality benchmark.
- `../../references/visual-language-observations.md`: first visual-language observations from rendered cybozu/kintone PPTX samples.
- `../../references/source/kintone-html-skill-experience.md`: original teammate note about a kintone-style HTML skill.
- `../../references/screenshots/official-site-reference.png`: official-site style reference.
- `../../references/screenshots/generated-page-reference.png`: generated-page style reference.

## Output Expectations

When creating a Route A deck, deliver the editable PPTX and mention any non-editable raster assets used. If a slide intentionally uses a screenshot, keep it as a framed content asset rather than the whole slide.

When creating a Route B deck, deliver it as a visual-story artifact made from generated full-slide images. The PPTX, if requested, is a non-editable image container with one full-slide image per page. Speaker notes are part of the deliverable. If source material is thin, produce a reasonable first draft and flag the exact missing inputs that would improve the next iteration.

## Bundled Assets

- `../../assets/cybozu-style-components.pptx`: editable Route A component library generated by `npm run assets:build-components`. Use it as the starting reference for native slide chrome, section pages, problem cards, app-pack layouts, workflow/process blocks, dashboard mockups with callouts, solution maps, product intro pages, industry proposal one-pagers, implementation paths, and role/responsibility labels. Treat it as v1: cleaner and more useful than the validation prototype, but still pending PowerPoint-rendered visual QA and approved icon assets.
- `../../assets/characters/`: approved candidate transparent PNG character and scenario assets extracted from existing PPT materials. Use these as raster illustrations inside editable PPT layouts; keep labels, callouts, arrows, cards, and role chips as native PPT elements.
- People and cloud mascot drawings should not be recreated with native geometric PPT shapes. Production decks should use role/responsibility labels, approved screenshots, photos, or the approved character assets instead.
- `../../assets/bitmap-b/`: Route B reference motifs and previous experiments. Use these to inform full-slide image prompts and style direction. Do not assemble Route B slides by placing these files as separate PPT objects; the intended B-route output is a complete generated slide image.
