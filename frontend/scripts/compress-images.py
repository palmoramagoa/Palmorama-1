#!/usr/bin/env python3
"""Compress images under public/images/ for faster page loads."""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "public" / "images"

# (max width in px, JPEG quality) — tuned for web display sizes in the UI
RULES: list[tuple[str, tuple[int, int]]] = [
    ("img/gallery", (1400, 78)),
    ("img/about", (1920, 82)),
    ("img/rooms", (1600, 82)),
    ("img/attractions", (1400, 80)),
    ("cafe", (1920, 82)),
    ("experiences", (1920, 82)),
    ("srot", (1920, 82)),
]

LOGO_MAX_WIDTH = 512
LOGO_PNG_COMPRESS = 9


def rule_for(rel: str) -> tuple[int, int]:
    normalized = rel.replace("\\", "/")
    for prefix, settings in RULES:
        if normalized.startswith(prefix + "/") or f"/{prefix}/" in normalized:
            return settings
    return (1920, 82)


def human_size(num: int) -> str:
    if num < 1024:
        return f"{num} B"
    if num < 1024 * 1024:
        return f"{num / 1024:.1f} KB"
    return f"{num / (1024 * 1024):.1f} MB"


def resize_width(img: Image.Image, max_width: int) -> Image.Image:
    w, h = img.size
    if w <= max_width:
        return img
    ratio = max_width / w
    return img.resize((max_width, max(1, int(h * ratio))), Image.Resampling.LANCZOS)


def compress_file(path: Path) -> tuple[int, int]:
    before = path.stat().st_size
    rel = str(path.relative_to(ROOT))
    max_width, quality = rule_for(rel)
    suffix = path.suffix.lower()

    img = Image.open(path)
    # Skip re-encoding small JPEGs that are already web-sized
    if (
        suffix in {".jpg", ".jpeg"}
        and before < 220_000
        and img.size[0] <= max_width
    ):
        return before, before

    if suffix == ".png":
        if path.name in ("logo.png", "srot-logo.png") or "logo" in path.name.lower():
            max_width = LOGO_MAX_WIDTH
        if img.mode not in ("RGBA", "RGB"):
            img = img.convert("RGBA")
        img = resize_width(img, max_width)
        img.save(path, format="PNG", optimize=True, compress_level=LOGO_PNG_COMPRESS)
    else:
        if img.mode != "RGB":
            img = img.convert("RGB")
        img = resize_width(img, max_width)
        img.save(
            path,
            format="JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
        )

    after = path.stat().st_size
    return before, after


def main() -> None:
    if not ROOT.is_dir():
        raise SystemExit(f"Missing images directory: {ROOT}")

    total_before = 0
    total_after = 0
    count = 0

    for dirpath, _, filenames in os.walk(ROOT):
        for name in sorted(filenames):
            if Path(name).suffix.lower() not in {".jpg", ".jpeg", ".png"}:
                continue
            path = Path(dirpath) / name
            try:
                before, after = compress_file(path)
            except Exception as exc:  # noqa: BLE001
                print(f"FAIL {path.relative_to(ROOT)}: {exc}")
                continue
            total_before += before
            total_after += after
            count += 1
            pct = 100 - (after / before * 100) if before else 0
            print(
                f"{path.relative_to(ROOT)}: "
                f"{human_size(before)} → {human_size(after)} ({pct:.0f}% smaller)"
            )

    saved = total_before - total_after
    pct_total = (saved / total_before * 100) if total_before else 0
    print()
    print(f"Compressed {count} files")
    print(f"Total: {human_size(total_before)} → {human_size(total_after)} ({pct_total:.0f}% saved)")


if __name__ == "__main__":
    main()
