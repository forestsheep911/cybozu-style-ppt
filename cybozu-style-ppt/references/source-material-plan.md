# Source Material Plan

## Related Repository

`SH-SE/cybozush-internal-knowledge-qa-foundation` was cloned locally as a nearby reference project:

`C:\Users\bxu\dev\cybozush\cybozush-internal-knowledge-qa-foundation`

The repository currently contains the private/internal QA foundation architecture, schemas, and ingestion scripts. It does not include actual PPT, PDF, or image source files in git. Its documentation states that private raw files, processed outputs, indexes, storage, and exports are intentionally ignored.

## Implication For This Skill

Treat that repository as a future ingestion/source pipeline, not as the current visual asset library. When real public or approved internal PPT/PDF samples become available, inspect them separately and only bring reusable, permitted design observations or redrawn assets into this skill.

## Current Corpus Status

The kintone guest-space source at `https://cybozush.cybozu.cn/k/guest/35/807/` has been connected locally through `.env` and the official `@kintone/rest-api-client`.

Current local outputs:

- Attachment manifest: `data/raw/kintone-guest-35-app-807/attachment-manifest.json`
- Downloaded `.pptx` files: `data/raw/kintone-guest-35-app-807/pptx/`
- PPTX download manifest: `data/raw/kintone-guest-35-app-807/pptx-download-manifest.json`
- PPTX inventory: `data/processed/style-analysis/pptx-inventory.json`
- Rendered sample previews: `data/processed/style-analysis/previews/`
- Extracted media inventories: `data/processed/style-analysis/media/`

Current scope: only `.pptx` files were downloaded. PDF, old `.ppt`, ZIP, AI, image-only, video, Office documents, and knowledge/reference materials were intentionally left out for the first style-focused phase.

Helper scripts:

- `scripts/kintone-list-attachments.mjs`
- `scripts/kintone-download-pptx.mjs`
- `scripts/pptx-inventory.py`
- `scripts/export-pptx-preview.ps1`
- `scripts/pptx-media-inventory.py`

## Asset Standardization Workflow

For each approved PPT/PDF source batch:

1. Inventory files by type, topic, language, and likely usage rights.
2. Render representative pages to images for visual review.
3. Identify repeated cybozu-style elements:
   - employee/person characters: man, woman, manager, customer, engineer, support, executive
   - poses/actions: presenting, pointing, thinking, worried, approving, working at desk, discussing, operating laptop
   - UI motifs: dashboard panels, application cards, workflow arrows, status tags, form/list/table blocks
   - section devices: yellow labels, ribbons, tabs, badges, dividers
4. Separate style observations from actual copyrighted source artwork.
5. Rebuild standard elements as editable PPT-native shapes where practical. Use raster assets only when native reconstruction would materially hurt quality or consume too much time.
6. Store reusable assets under `assets/` with clear names and usage notes.
7. Update `SKILL.md` or a focused reference file only with patterns that help future deck creation.

## Guardrails

- Do not commit private source documents or extracted private pages.
- Do not copy proprietary figures blindly into reusable assets unless usage is approved.
- Prefer redrawn, simplified, editable components over bitmap extraction.
- Preserve source provenance in local notes when deriving a component style.
