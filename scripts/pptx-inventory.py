from __future__ import annotations

import csv
import json
import re
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "data" / "raw" / "kintone-guest-35-app-807"
MANIFEST_PATH = SOURCE_ROOT / "pptx-download-manifest.json"
OUT_DIR = ROOT / "data" / "processed" / "style-analysis"


CATEGORY_RULES = [
    ("template", re.compile(r"template|テンプレ|模板|ppt資料template|スライドテンプレート", re.I)),
    ("company-intro", re.compile(r"会社紹介|公司介绍|Global", re.I)),
    ("product-intro", re.compile(r"製品資料|产品资料|ご紹介|紹介資料|簡介", re.I)),
    ("proposal", re.compile(r"提案|proposal|ご提案|改善", re.I)),
    ("seminar", re.compile(r"seminar|セミナー|webinar|学习会|勉強会", re.I)),
    ("solution-map", re.compile(r"ソリューションマップ|map|マップ", re.I)),
    ("workflow", re.compile(r"WF|ワークフロー|工作流程|流程", re.I)),
    ("sfa-sales", re.compile(r"SFA|営業|商談|销售", re.I)),
    ("manufacturing", re.compile(r"製造|制造|工場|工厂|生産|生产|購買|采购", re.I)),
    ("hr", re.compile(r"人事|勤怠|考勤|人才|人材", re.I)),
    ("security", re.compile(r"security|セキュリティ|安全|証明書|证书|NDA", re.I)),
    ("case-study", re.compile(r"事例|hive|カフェ|cafe", re.I)),
    ("flyer", re.compile(r"チラシ|单页|宣传单页|flyer", re.I)),
]


def classify(name: str) -> list[str]:
    categories = [label for label, pattern in CATEGORY_RULES if pattern.search(name)]
    return categories or ["other"]


def inspect_pptx(path: Path) -> dict[str, int | bool | str]:
    info: dict[str, int | bool | str] = {
        "slide_count": 0,
        "media_count": 0,
        "image_count": 0,
        "video_count": 0,
        "has_slide_master": False,
        "has_notes": False,
    }
    with zipfile.ZipFile(path) as archive:
        names = archive.namelist()
        info["slide_count"] = sum(
            1
            for name in names
            if re.fullmatch(r"ppt/slides/slide\d+\.xml", name)
        )
        media = [name for name in names if name.startswith("ppt/media/")]
        info["media_count"] = len(media)
        info["image_count"] = sum(
            1 for name in media if Path(name).suffix.lower() in {".png", ".jpg", ".jpeg", ".gif", ".svg"}
        )
        info["video_count"] = sum(
            1 for name in media if Path(name).suffix.lower() in {".mp4", ".mov", ".wmv", ".avi"}
        )
        info["has_slide_master"] = any(name.startswith("ppt/slideMasters/") for name in names)
        info["has_notes"] = any(name.startswith("ppt/notesSlides/") for name in names)
    return info


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    rows = []

    for item in manifest["downloaded"] + manifest["skipped"]:
        rel_path = item["path"]
        file_path = SOURCE_ROOT / rel_path
        inspection = inspect_pptx(file_path)
        rows.append(
            {
                "record_id": item["recordId"],
                "field_code": item["fieldCode"],
                "name": item["name"],
                "path": rel_path,
                "size": item["size"],
                "size_mb": round(item["size"] / 1024 / 1024, 2),
                "categories": ",".join(classify(item["name"])),
                **inspection,
            }
        )

    rows.sort(key=lambda row: (row["categories"], row["record_id"], row["name"]))
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / "pptx-inventory.json").write_text(
        json.dumps(rows, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    with (OUT_DIR / "pptx-inventory.csv").open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    by_category: dict[str, int] = {}
    for row in rows:
        for category in str(row["categories"]).split(","):
            by_category[category] = by_category.get(category, 0) + 1

    print(f"pptx_count={len(rows)}")
    print(f"inventory_json={OUT_DIR / 'pptx-inventory.json'}")
    print(f"inventory_csv={OUT_DIR / 'pptx-inventory.csv'}")
    print("categories=" + ", ".join(f"{key}:{value}" for key, value in sorted(by_category.items())))


if __name__ == "__main__":
    main()
