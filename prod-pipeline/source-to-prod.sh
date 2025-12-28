#!/bin/bash
# ============================================
# Asset optimization script preserving folder structure
# ============================================

# Base directories
SRC_DIR="./src"
DIST_DIR="./dist"

# Remove and create dist folder
rm -rf "$DIST_DIR" && mkdir -p "$DIST_DIR"

echo "✅ Starting asset optimization with folder structure..."

# ------------------------
# 1️⃣ JavaScript
# ------------------------
echo "📦 Processing JavaScript..."
JS_VENDOR_SRC="$SRC_DIR/scripts/vendor"
JS_MAP_SRC="$SRC_DIR/scripts/map"
JS_MAP_HELPER_SRC="$SRC_DIR/scripts/map/helpers"
JS_VENDOR_DIST="$DIST_DIR/scripts/vendor"
JS_MAP_DIST="$DIST_DIR/scripts/map"
JS_MAP_HELPER_DIST="$DIST_DIR/scripts/map/helpers"
mkdir -p "$JS_VENDOR_DIST" "$JS_MAP_DIST" "$JS_VENDOR_DIST"/jquery

# Concatenate all used JS files
cat "$JS_VENDOR_SRC"/leaflet-canvas-markers/leaflet.canvas-markers.js \
    "$JS_VENDOR_SRC"/leaflet.fullscreen-3.0.1/Control.FullScreen.js \
    "$JS_VENDOR_SRC"/leaflet-search-4.0.0/dist/leaflet-search.src.js \
    "$JS_VENDOR_SRC"/leaflet-geoman-free-2.17.0/leaflet-geoman.js \
    "$JS_VENDOR_SRC"/aprilandjan.leaflet.mesure/leaflet.measure.js \
    > "$JS_VENDOR_DIST"/all.js

cp "$JS_VENDOR_SRC"/jquery/jquery-3.7.1.min.js "$JS_VENDOR_DIST"/jquery/


cat "$JS_MAP_SRC"/*.js > "$JS_DIST"/all.js
cat "$JS_MAP_SRC"/loading-overlay.js \
    "$JS_MAP_SRC"/helpers/map-utilities.js \
    "$JS_MAP_SRC"/icons.js \
    "$JS_MAP_SRC"/tootips-and-popups.js \
    "$JS_MAP_SRC"/data.js \
    "$JS_MAP_SRC"/grid.js \
    "$JS_MAP_SRC"/custom-controls.js \
    "$JS_MAP_SRC"/tools.js \
    "$JS_MAP_SRC"/legend.js \
    "$JS_MAP_SRC"/search.js \
    "$JS_MAP_SRC"/main.js \
    > "$JS_MAP_DIST"/all.js

cp "$JS_MAP_HELPER_SRC"/map-utilities.js "$JS_MAP_HELPER_DIST"/all.js

# Minify concatenated JS
uglifyjs "$JS_VENDOR_DIST"/all.js -o "$JS_VENDOR_DIST"/all.min.js -c -m
uglifyjs "$JS_MAP_DIST"/all.js -o "$JS_MAP_DIST"/all.min.js -c -m
uglifyjs "$JS_MAP_HELPER_DIST"/all.js -o "$JS_MAP_HELPER_DIST"/all.min.js -c -m
echo "✔ JS done"

# ------------------------
# 2️⃣ CSS
# ------------------------
echo "🎨 Processing CSS..."
CSS_SRC="$SRC_DIR/styles"
CSS_DIST="$DIST_DIR/styles"
mkdir -p "$CSS_DIST"

csso "$CSS_SRC"/style.css -o "$CSS_DIST/style.min.css"
echo "✔ CSS done"

# ------------------------
# 3️⃣ HTML
# ------------------------
echo "📝 Processing HTML..."
HTML_SRC="$SRC_DIR"
HTML_DIST="$DIST_DIR"
mkdir -p "$HTML_DIST"

html-minifier-terser \
    --collapse-whitespace \
    --remove-comments \
    --minify-css true \
    --minify-js true \
    "$HTML_SRC"/index.html -o "$HTML_DIST/index.min.html"
echo "✔ HTML done"

# ------------------------
# 4️⃣ SVG
# ------------------------
# echo "🖼 Processing SVG..."
# SVG_SRC="$SRC_DIR/svg"
# SVG_DIST="$DIST_DIR/svg"
# mkdir -p "$SVG_DIST"

# for f in "$SVG_SRC"/*.svg; do
#     [ "$f" != "*.min.svg" ] && svgo "$f" -o "$SVG_DIST/$(basename ${f%.svg}.min.svg)"
# done
# echo "✔ SVG done"

# ------------------------
# 5️⃣ GEOJSON
# ------------------------
echo "🌌 Processing GEOJSON..."
GEO_ASTRO_OBJ_SRC="$SRC_DIR/data/astronomicalobjects"
GEO_GRID_SRC="$SRC_DIR/data/grid"
GEO_ASTRO_OBJ_DIST="$DIST_DIR/data/grid"
GEO_GRID_DIST="$DIST_DIR/data/grid"
mkdir -p "$GEO_ASTRO_OBJ_DIST" "$GEO_GRID_DIST"

# Combine all FeatureCollections
jq -s '{ type: "FeatureCollection", features: map(.features) | add }' "$GEO_ASTRO_OBJ_SRC"/SW_Map_*.geojson > "$GEO_GRID_SRC"/combined.geojson
jq -s '{ type: "FeatureCollection", features: map(.features) | add }' "$GEO_GRID_SRC"/*.geojson > "$GEO_GRID_DIST"/combined.geojson
# Minify combined GEOJSON
jsonminify "$GEO_ASTRO_OBJ_DIST"/combined.geojson > "$GEO_ASTRO_OBJ_DIST"/combined.min.geojson
jsonminify "$GEO_GRID_DIST"/combined.geojson > "$GEO_GRID_DIST"/combined.min.geojson
echo "✔ GEOJSON done"

echo "🎉 All assets optimized! Folder structure preserved in dist/"
