"""Rebuild the hero WebP and 256px member thumbnails.

Requires Pillow with WebP support. Run from the repository root:

    python3 scripts/optimize-images.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images"


def save_webp(image: Image.Image, destination: Path) -> None:
    image.convert("RGB").save(destination, "WEBP", quality=72, method=6)


def main() -> None:
    hero = ROOT / "assets" / "background.png"
    if hero.exists():
        save_webp(Image.open(hero), ROOT / "assets" / "background.webp")

    thumb_dir = ROOT / "members" / "thumbs"
    thumb_dir.mkdir(parents=True, exist_ok=True)
    for source in (ROOT / "members").iterdir():
        if not source.is_file() or source.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        image = Image.open(source)
        image.thumbnail((256, 256), Image.Resampling.LANCZOS)
        save_webp(image, thumb_dir / f"{source.stem}.webp")


if __name__ == "__main__":
    main()
