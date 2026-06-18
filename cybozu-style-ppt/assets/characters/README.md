# Character Assets

Transparent PNG assets extracted from existing cybozu/kintone-style PPT materials.

Use these as raster illustration assets inside editable PPT layouts:

- Keep labels, callouts, arrows, cards, and role chips as native PPT elements.
- Use one illustration family per slide.
- Prefer these assets over rough native-shape people drawings.
- Do not mix these with unrelated stock avatars or customer-specific logo material unless the slide context requires it.

Current set:

- 50 transparent PNG assets.
- `manifest.json` is the source of truth for stable IDs, labels, Chinese descriptions, categories, recommended usage, cautions, and image dimensions.
- `ASSET_CATALOG.md` is the human-readable catalog. Refer to assets by stable ID such as `CHAR-021`.

Preview:

- `character-assets-contact-sheet.jpg`
- `character-assets-numbered.jpg`

ID policy:

- Do not change an existing `CHAR-xxx` ID after it has been used in a deck or prompt.
- Add new assets at the end of `manifest.json` with the next available ID.
- If an asset is retired, keep the ID in notes rather than reusing it for a different image.
