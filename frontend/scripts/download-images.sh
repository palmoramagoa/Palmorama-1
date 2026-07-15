#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../public/images" && pwd)"
BASE="https://palmorama.in"

download_palmorama() {
  local path="$1"
  local dest="$ROOT/$path"
  mkdir -p "$(dirname "$dest")"
  if [[ -f "$dest" && -s "$dest" ]]; then
    echo "skip (exists): $path"
    return 0
  fi
  echo "fetch: $path"
  curl -fsSL --connect-timeout 30 --max-time 120 -o "$dest" "$BASE/$path"
}

# About & hero
download_palmorama "img/about/1.jpg"
download_palmorama "img/about/2.jpg"

# Gallery (1–24)
for i in $(seq 1 24); do
  download_palmorama "img/gallery/${i}.jpg"
done

# Rooms
for f in chandra-room.jpg chandra-dome-1.jpg chandra-dome-2.jpg room-1.jpg room-2.jpg room-3.jpg; do
  download_palmorama "img/rooms/$f"
done

# Attractions
for i in 1 2 3; do
  download_palmorama "img/attractions/${i}.jpg"
done

# Srot (original Emergent assets)
mkdir -p "$ROOT/srot"
EMERGENT="https://customer-assets.emergentagent.com/job_palmorama-journey/artifacts"

download_emergent() {
  local url="$1"
  local dest="$2"
  if [[ -f "$dest" && -s "$dest" ]]; then
    echo "skip (exists): $(basename "$dest")"
    return 0
  fi
  echo "fetch: $(basename "$dest")"
  curl -fsSL --connect-timeout 30 --max-time 180 -o "$dest" "$url"
}

download_emergent \
  "${EMERGENT}/b371wygh_Palmorama%20Photo%2017.jpg" \
  "$ROOT/srot/yoga-shala.jpg"

download_emergent \
  "${EMERGENT}/7guamwzr_Palmorama%20Photo%2020%20%282%29.jpg" \
  "$ROOT/srot/sound-healing.jpg"

if [[ ! -f "$ROOT/srot/holistic-living.jpg" ]]; then
  if [[ -f "$ROOT/experiences/pool.jpg" ]]; then
    cp "$ROOT/experiences/pool.jpg" "$ROOT/srot/holistic-living.jpg"
    echo "copied: experiences/pool.jpg -> srot/holistic-living.jpg"
  else
    download_emergent \
      "${EMERGENT}/vqglgd9j_RISH7520.JPG" \
      "$ROOT/srot/holistic-living.jpg"
  fi
fi

echo "done."
echo "Compressing for web..."
python3 "$(dirname "$0")/compress-images.py"
