# Cybozu Style PPT

This repository develops a cybozu/kintone-inspired presentation production skill. The current stage is a route exploration and asset-system baseline, not a finalized one-click deck generator.

## Current Stage

The project currently defines three production routes:

- **Route A / native-first:** editable PowerPoint-first production for business-document pages, tables, process detail, legal/pricing content, and frequently revised slides.
- **Route B / image-first:** generated-image presentation production.
  - **B-pure:** one generated full-slide image per slide.
  - **B-hybrid:** generated background or scene plus a small editable PPT overlay layer for text, logos, product names, page marks, and other controlled assets.
- **Route C / web-first:** Reveal.js/HTML/CSS/JS production for live browser presentations and screenshot-derived PPTX exports.

See `plugins/cybozu-style-ppt/references/phase-snapshot-2026-06-26.md` for the current freeze-point summary.

## Main References

- `plugins/cybozu-style-ppt/skills/cybozu-style-ppt/SKILL.md`: active skill instructions.
- `plugins/cybozu-style-ppt/references/production-routes.md`: route definitions and selection guidance.
- `plugins/cybozu-style-ppt/references/route-c-revealjs.md`: Route C implementation guidance and QA gates.
- `plugins/cybozu-style-ppt/references/route-c-experiment-plan.md`: Route C experiment plan.
- `outputs/c-route-experiment-summary.md`: Route C experiment findings.
- `plugins/cybozu-style-ppt/references/ryo-materials-26-visual-catalog.md`: source-deck asset catalog and usage rules.

## Current Output Sets

- `outputs/ab-route-test-kintone-loop/`: A/B comparison test.
- `outputs/b-hybrid-kintone-loop-v2/`: B-hybrid kintone loop deck.
- `outputs/b-hybrid-phone-record/`: B-hybrid phone record concept page.
- `outputs/c-web-first-phone-record/`: Route C phone record experiment, including C-live, C-export, C-hybrid-export, C-fragment-export, and C-component-export.
- `outputs/c-web-first-field-feedback/`: Route C field feedback experiment, including C-export and C-hybrid-export.

## Working Principles

- Start from a Text Lock before choosing a route.
- Use Route A for maintainability, Route B-hybrid for static visual impact with controlled editability, and Route C for motion, interaction, browser-native layout, or web-rendered component quality.
- Do not draw complex people, mascots, devices, vehicles, buildings, product marks, or realistic objects from primitive PPT or CSS shapes. Use source assets, generated images, screenshots, or verified image assets.
- Keep official logos, product marks, app icons, and customer marks as faithful inserted assets whenever exactness matters.

## Known Follow-ups

- Create a reusable Route C capture/export script template.
- English-normalize the character asset catalog metadata.
- Decide whether to keep or remove older untracked B-hybrid experiment leftovers.
- Add automated preview/contact-sheet commands for the main experiment folders.
