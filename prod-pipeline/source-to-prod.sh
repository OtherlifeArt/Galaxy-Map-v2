#!/bin/bash
# ==============================================================================
# Asset Optimization Script (Enhanced Speed, Error Handling, and Modern Tooling)
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# Base directories
SRC_DIR="./src"
DIST_DIR="./dist"

# Remove and recreate dist folder cleanly
rm -rf "$DIST_DIR" && mkdir -p "$DIST_DIR/styles"

# ------------------------------------------------------------------------------
# 1️⃣ Adding Graphical assets
# ------------------------------------------------------------------------------
echo "🖼️ Adding graphical assets..."

cp -R "$SRC_DIR/images" "$DIST_DIR/" && rm -rf "$DIST_DIR/LgLocationImages" "$DIST_DIR/SmLocationImages"
cp "$SRC_DIR/scripts/vendor/leaflet.fullscreen-3.0.1/icon-fullscreen.svg" "$DIST_DIR/styles/"
cp $SRC_DIR/scripts/vendor/leaflet-search-4.0.0/images/{loader.gif,search-icon-mobile.png,search-icon.png} "$DIST_DIR/images/"

echo "🚀 Starting asset optimization..."

# ------------------------------------------------------------------------------
# 2️⃣ JavaScript Optimization
# ------------------------------------------------------------------------------
echo "📦 Processing JavaScript..."

JS_VENDOR_SRC="$SRC_DIR/scripts/vendor"
JS_MAP_LOADING_SRC="$SRC_DIR/scripts/map/loading"
JS_MAP_SRC="$SRC_DIR/scripts/map"
JS_SHARED_SRC="$SRC_DIR/scripts/shared"

JS_VENDOR_DIST="$DIST_DIR/scripts/vendor"
JS_MAP_DIST="$DIST_DIR/scripts/map"
JS_MAP_LOADING_DIST="$DIST_DIR/scripts/map/loading"

# Change debug value
perl -0777 -i -pe '
s|const debug = true;|const debug = false;|gs;
' "$JS_MAP_SRC"/main.js

mkdir -p "$JS_VENDOR_DIST" "$JS_MAP_DIST" "$JS_MAP_LOADING_DIST"

# Concatenate Vendor JS
cat "$JS_VENDOR_SRC"/leaflet-1.9.4/leaflet.js \
    "$JS_VENDOR_SRC"/Leaflet.Control.Layers.Tree/L.Control.Layers.Tree.js \
    "$JS_VENDOR_SRC"/Leaflet.Control.Opacity/L.Control.Opacity.js \
    "$JS_VENDOR_SRC"/leaflet-canvas-markers/leaflet.canvas-markers.js \
    "$JS_VENDOR_SRC"/leaflet.fullscreen-3.0.1/Control.FullScreen.js \
    "$JS_VENDOR_SRC"/leaflet-search-4.0.0/dist/leaflet-search.src.js \
    "$JS_VENDOR_SRC"/leaflet-geoman-free-2.17.0/leaflet-geoman.js \
    "$JS_VENDOR_SRC"/aprilandjan.leaflet.mesure/leaflet.measure.js \
    > "$JS_VENDOR_DIST"/all.js

# Copy third-party pre-minified assets directly
cp "$JS_VENDOR_SRC"/jquery/jquery-3.7.1.min.js "$JS_VENDOR_DIST"/jquery.min.js

# Concatenate Loading
cat "$JS_MAP_LOADING_SRC"/loading-overlay.js > "$JS_MAP_LOADING_DIST"/all.js

# Concatenate Map Core JS (Fixed order sequence)
cat "$JS_MAP_SRC"/helpers/map-utilities.js \
    "$JS_MAP_SRC"/icons.js \
    "$JS_MAP_SRC"/tootips-and-popups.js \
    "$JS_SHARED_SRC"/data.js \
    "$JS_MAP_SRC"/data.js \
    "$JS_MAP_SRC"/grid.js \
    "$JS_MAP_SRC"/custom-controls.js \
    "$JS_MAP_SRC"/tools.js \
    "$JS_MAP_SRC"/legend.js \
    "$JS_MAP_SRC"/search.js \
    "$JS_MAP_SRC"/main.js \
    > "$JS_MAP_DIST"/all.js

# Minify JS in Parallel using Background Jobs (&) (-m=mangling removed until stable)
uglifyjs "$JS_MAP_LOADING_DIST"/all.js -o "$JS_MAP_LOADING_DIST"/all.min.js -c -m &
uglifyjs "$JS_VENDOR_DIST"/all.js -o "$JS_VENDOR_DIST"/all.min.js -c &
uglifyjs "$JS_MAP_DIST"/all.js -o "$JS_MAP_DIST"/all.min.js -c -m &
# uglifyjs "$JS_MAP_LOADING_DIST"/all.js -o "$JS_MAP_LOADING_DIST"/all.min.js -c -m &
# uglifyjs "$JS_MAP_DIST"/all.js -o "$JS_MAP_DIST"/all.min.js -c -m &

# ------------------------------------------------------------------------------
# 3️⃣ CSS & HTML Optimization
# ------------------------------------------------------------------------------
echo "🎨 Processing CSS & 📝 HTML..."
CSS_SRC="$SRC_DIR/styles"
CSS_DIST="$DIST_DIR/styles"
mkdir -p "$CSS_DIST"

# Change HTML style and script locations
cp $SRC_DIR/index.html $DIST_DIR/index.html
perl -0777 -i -pe '
s|<!-- STYLE -->.*?<!-- STYLE:END -->|<link rel="stylesheet" href="styles/vendor.min.css"><link rel="stylesheet" href="styles/style.min.css">|gs;
s|<!-- SCRIPTS -->.*?<!-- SCRIPTS:END -->|<script src="scripts/map/loading/all.min.js"></script><script src="scripts/vendor/jquery.min.js"></script><script src="scripts/vendor/all.min.js"></script><script src="scripts/map/all.min.js"></script>|gs;
' $DIST_DIR/index.html

# Run CSS and HTML minification in background
csso "$CSS_SRC"/style.css -o "$CSS_DIST/style.min.css" &

# Concatenate Vendor CSS
cat \
  "$SRC_DIR/scripts/vendor/leaflet-1.9.4/leaflet.css" \
  "$SRC_DIR/scripts/vendor/Leaflet.Control.Layers.Tree/L.Control.Layers.Tree.css" \
  "$SRC_DIR/scripts/vendor/Leaflet.Control.Opacity/L.Control.Opacity.css" \
  "$SRC_DIR/scripts/vendor/leaflet.fullscreen-3.0.1/Control.FullScreen.css" \
  "$SRC_DIR/scripts/vendor/leaflet-search-4.0.0/dist/leaflet-search.min.css" \
  "$SRC_DIR/scripts/vendor/leaflet-geoman-free-2.17.0/leaflet-geoman.css" \
  "$SRC_DIR/scripts/vendor/aprilandjan.leaflet.mesure/leaflet.measure.css" \
> "$CSS_DIST/vendor.min.css" &

csso "$CSS_DIST"/vendor.min.css -o "$CSS_DIST/vendor.min.css" &

# NOTE: If your index.html points to "style.min.css" and "all.min.js", 
# the output filename should match what your production HTML expects. 
# Usually, keeping it as index.html inside the /dist folder is best practice.
html-minifier-terser \
    --collapse-whitespace \
    --remove-comments \
    --minify-css true \
    --minify-js true \
    "$DIST_DIR"/index.html -o "$DIST_DIR/index.html" &

# ------------------------------------------------------------------------------
# 4️⃣ GEOJSON Optimization & Obfuscation
# ------------------------------------------------------------------------------
echo "🌌 Processing & Obfuscating GEOJSON..."
GEO_ASTRO_OBJ_SRC="$SRC_DIR/data/astronomicalobjects"
GEO_GRID_SRC="$SRC_DIR/data/grid"

GEO_ASTRO_OBJ_DIST="$DIST_DIR/data/astronomicalobjects"
GEO_GRID_DIST="$DIST_DIR/data/grid"
mkdir -p "$GEO_ASTRO_OBJ_DIST" "$GEO_GRID_DIST"

# Define the jq obfuscation filter as a reusable variable
# This maps long property names to index strings "0", "1", "2"...
JQ_LINE_OBFUSCATE_FILTER='
  # 1. Define the translation map
  {"ID": "0","NAME": "1","ALT_NAMES": "2","TYPE": "3","PARENT_ID": "4","PARENT_NAME": "5","DATE_FROM": "6","DATE_TO": "7","CANON": "8","LEGENDS": "9","UNLICENSED": "10","LEVEL": "11","ZOOM_LEVEL": "12","CONJECTURAL_NAME": "13","URLS": "14","DESC": "15","color": "16","weight": "17","opacity": "18","smoothFactor": "19","SECTIONS_PROPERTIES": "20"} as $map |
  
  # 2. Combine files into a FeatureCollection
  {
    type: "FeatureCollection",
    features: [
      .[] | .features[] | 
      
      # 3. Reconstruct each feature, rewriting the properties object
      .properties |= (
        to_entries | 
        map(.key as $k | if $map[$k] then .key = $map[$k] else . end) | 
        from_entries
      )
    ]
  }
'

JQ_POINT_OBFUSCATE_FILTER='
  # 1. Define the translation map
  {"ID": "0","HUMAN_ID": "1","HUMAN_READABLE_NAME": "2","NAME": "3","ALT_NAMES (/ separated)": "4","PARENT_ID": "5","PARENT": "6","DATE_FROM": "7","DATE_TO": "8","CANON": "9","LEGENDS": "10","UNLICENSED": "11","IN_MOVIES": "12","TYPE": "13","TYPE_CLASSES": "14","IS_CAPITAL": "15","X_GRID": "16","Y_GRID": "17","X_COORD": "18","Y_COORD": "19","Z_COORD": "20","ORBITAL_RANK": "21","ZOOM_LEVEL": "22","tooltip_permanent": "23","tooltip_direction": "24","className": "25","index_geo": "26","DISTANCE_TO_PARENT": "27","DIAMETER/SIZE": "28","MOONS": "29","GRAVITY": "30","LENGTH_OF_DAY": "31","LENGTH_OF_YEAR": "32","KNOWN_ATMOSPHERE": "33","KNOWN_CLIMATES": "34","KNOWN_ENVIRONMENTS": "35","KNOWN_SURFACE_WATER": "36","APPEARANCE_FROM_ORBIT": "37","NATIVE_SAPIENTS": "38","IMMIGRANT_SAPIENTS": "39","FAUNA": "40","FLORA": "41","POPULATION": "42","GOVERNMENT": "43","TECH_LEVEL": "44","KNOWN_EXPORTS": "45","KNOWN_IMPORTS": "46","KNOWN_RESOURCES": "47","CAPITAL": "48","STARPORTS": "49","POINTS_OF_INTEREST": "50","NOTES": "51","INTERESTING (move to 2nd to last position)": "52","URLS (sources)": "53","CONJECTURAL_NAME": "54","CONJECTURAL_TYPE": "55","PLACEMENT_CERT": "56","PLACEMENT_LOGIC": "57","last_updated": "58","data_certified": "59","WikiDataID": "60","GEOM": "61","GEOM_TYPE": "62","PONCTUAL": "63"} as $map |
  
  # 2. Combine files into a FeatureCollection
  {
    type: "FeatureCollection",
    features: [
      .[] | .features[] | 
      
      # 3. Reconstruct each feature, rewriting the properties object
      .properties |= (
        to_entries | 
        map(.key as $k | if $map[$k] then .key = $map[$k] else . end) | 
        from_entries
      )
    ]
  }
'

JQ_POLYGON_OBFUSCATE_FILTER='
  # 1. Define the translation map
  {"ID": "0","HUMAN_ID": "1","HUMAN_READABLE_NAME": "2","NAME": "3","ALT_NAMES (/ separated)": "4","PARENT_ID": "5","PARENT": "6","DATE_FROM": "7","DATE_TO": "8","CANON": "9","LEGENDS": "10","IN_MOVIES": "11","TYPE": "12","TYPE_CLASSES": "13","IS_CAPITAL": "14","X_GRID": "15","Y_GRID": "16","X_COORD": "17","Y_COORD": "18","Z_COORD": "19","ORBITAL_RANK": "20","DESC": "21","CONJECTURAL_NAME": "22","CONJECTURAl_TYPE": "23","PLACEMENT_CERT": "24","PLACEMENT_LOGIC": "25","NATIVE_SPECIES": "26","KNOWN_ENVIRONMENTS": "27","NOTES": "28","INTERESTING": "29","URLS (sources)": "30","ZOOM_LEVEL": "31","tooltip_permanent": "32","tooltip_direction": "33","className": "34","index_geo": "35","last_updated": "36","data_certified": "37","WikiDataID": "38","PONCTUAL": "39","RADIUS": "40","APPEARANCE_FROM_ORBIT": "41","POPULATION": "42","GRAVITY": "43","GOVERNMENT": "44","TECH_LEVEL": "45","KNOWN_CLIMATES": "46","KNOWN_ATMOSPHERE": "47","KNOWN_SURFACE_WATER": "48","KNOWN_RESOURCES": "49","KNOWN_EXPORTS": "50","KNOWN_IMPORTS": "51","POINTS_OF_INTEREST": "52","LENGTH_OF_DAY": "53","LENGTH_OF_YEAR": "54","CAPITAL": "55","STARPORTS": "56","UNLICENSED": "57"} as $map |
  
  # 2. Combine files into a FeatureCollection
  {
    type: "FeatureCollection",
    features: [
      .[] | .features[] | 
      
      # 3. Reconstruct each feature, rewriting the properties object
      .properties |= (
        to_entries | 
        map(.key as $k | if $map[$k] then .key = $map[$k] else . end) | 
        from_entries
      )
    ]
  }
'

# Combine, Obfuscate, and Minify in parallel
# jq -c -s "$JQ_LINE_OBFUSCATE_FILTER" "$GEO_ASTRO_OBJ_SRC"/SW_Map_Lines.geojson > "$GEO_ASTRO_OBJ_DIST"/SW_Map_Lines.geojson &
# jq -c -s "$JQ_POINT_OBFUSCATE_FILTER" "$GEO_ASTRO_OBJ_SRC"/SW_Map_Points.geojson > "$GEO_ASTRO_OBJ_DIST"/SW_Map_Points.geojson &
# jq -c -s "$JQ_POLYGON_OBFUSCATE_FILTER" "$GEO_ASTRO_OBJ_SRC"/SW_Map_Polygons.geojson > "$GEO_ASTRO_OBJ_DIST"/SW_Map_Polygons.geojson &

# (Combine), and Minify in parallel
jq -c -s '{ type: "FeatureCollection", features: map(.features) | add }' "$GEO_ASTRO_OBJ_SRC"/SW_Map_Lines.geojson > "$GEO_ASTRO_OBJ_DIST"/SW_Map_Lines.geojson &
# jq -c -s '{ type: "FeatureCollection", features: map(.features) | add }' "$GEO_ASTRO_OBJ_SRC"/SW_Map_Points.geojson > "$GEO_ASTRO_OBJ_DIST"/SW_Map_Points.geojson &
jq -c -s '{ type: "FeatureCollection", features: map(.features) | add }' "$GEO_ASTRO_OBJ_SRC"/SW_Map_Polygons.geojson > "$GEO_ASTRO_OBJ_DIST"/SW_Map_Polygons.geojson &
jq -c . "$GEO_ASTRO_OBJ_SRC"/SW_Map_Optimized_Points.json > "$GEO_ASTRO_OBJ_DIST"/SW_Map_Optimized_Points.json &
jq -c -s '{ type: "FeatureCollection", features: map(.features) | add }' "$GEO_ASTRO_OBJ_SRC"/roads.geojson > "$GEO_ASTRO_OBJ_DIST"/roads.geojson &
jq -c -s '{ type: "FeatureCollection", features: map(.features) | add }' "$GEO_GRID_SRC"/grid.geojson > "$GEO_GRID_DIST"/grid.geojson &
jq -c -s '{ type: "FeatureCollection", features: map(.features) | add }' "$GEO_GRID_SRC"/grid_labels.geojson > "$GEO_GRID_DIST"/grid_labels.geojson &

# ------------------------------------------------------------------------------
# ⏳ Sync & Cleanup
# ------------------------------------------------------------------------------
# Wait for all background optimization tasks to finish
wait

# Clean up unminified source-concatenations from production directory
rm -f "$JS_VENDOR_DIST"/all.js "$JS_MAP_DIST"/all.js "$JS_MAP_HELPER_DIST"/all.js

echo "🎉 All assets optimized successfully in $DIST_DIR/"