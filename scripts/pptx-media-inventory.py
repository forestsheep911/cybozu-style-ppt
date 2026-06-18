from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import zipfile
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUT = ROOT / "data" / "processed" / "style-analysis" / "media"
IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tif", ".tiff", ".webp"}


def safe_name(value: str) -> str:
    value = re.sub(r'[<>:"/\\|?*\x00-\x1f]', "_", value)
    value = re.sub(r"\s+", " ", value).strip().rstrip(".")
    return value


def extract_media(pptx_path: Path, out_root: Path) -> dict:
    deck_name = safe_name(pptx_path.stem)
    deck_out = out_root / deck_name
    image_out = deck_out / "images"
    image_out.mkdir(parents=True, exist_ok=True)

    rows = []
    with zipfile.ZipFile(pptx_path) as archive:
        for member in archive.namelist():
            if not member.startswith("ppt/media/"):
                continue
            suffix = Path(member).suffix.lower()
            if suffix not in IMAGE_SUFFIXES:
                continue
            target = image_out / safe_name(Path(member).name)
            with archive.open(member) as source, target.open("wb") as dest:
                shutil.copyfileobj(source, dest)

            try:
                with Image.open(target) as image:
                    width, height = image.size
                    mode = image.mode
            except Exception:
                width = height = 0
                mode = "unknown"

            area = width * height
            rows.append(
                {
                    "deck": deck_name,
                    "pptx": str(pptx_path),
                    "member": member,
                    "file": str(target.relative_to(deck_out)),
                    "width": width,
                    "height": height,
                    "area": area,
                    "mode": mode,
                    "small_asset_candidate": 0 < area <= 300_000 and width <= 900 and height <= 900,
                }
            )

    rows.sort(key=lambda row: (not row["small_asset_candidate"], row["area"], row["file"]))
    (deck_out / "media-inventory.json").write_text(
        json.dumps(rows, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    candidates = [row for row in rows if row["small_asset_candidate"]]
    if candidates:
        contact_inputs = [str(deck_out / row["file"]) for row in candidates[:80]]
        contact_path = deck_out / "small-assets-contact-sheet.jpg"
        subprocess.run(
            [
                "magick",
                "montage",
                *contact_inputs,
                "-thumbnail",
                "140x140",
                "-tile",
                "10x",
                "-geometry",
                "+8+8",
                "-background",
                "white",
                str(contact_path),
            ],
            check=True,
        )

    return {
        "deck": deck_name,
        "image_count": len(rows),
        "small_asset_candidate_count": len(candidates),
        "out": str(deck_out),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract image media inventory from PPTX files.")
    parser.add_argument("pptx", nargs="+", type=Path)
    parser.add_argument("--out-root", type=Path, default=DEFAULT_OUT)
    args = parser.parse_args()

    args.out_root.mkdir(parents=True, exist_ok=True)
    summary = [extract_media(path.resolve(), args.out_root) for path in args.pptx]
    (args.out_root / "summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    for item in summary:
        print(
            f"deck={item['deck']} images={item['image_count']} "
            f"small_candidates={item['small_asset_candidate_count']} out={item['out']}"
        )


if __name__ == "__main__":
    main()
