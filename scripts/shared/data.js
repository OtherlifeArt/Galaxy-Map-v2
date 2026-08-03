/* Those parameters are shared between map main application and data form */

/******** CONSTANTS ****/
// Hard coded parameters to display on map
const OBJECT_TYPES_TO_IGNORE = [
  "Universe", "Galaxy Cluster", "Galaxy Group", "Galaxy",
  "Sector", "Region",
];

// URL Paths to data
// const url_points = "././data/astronomicalobjects/SW_Map_Points.geojson"
const url_optimized_points = "././data/astronomicalobjects/SW_Map_Optimized_Points.json"
// const url_roads = "././data/astronomicalobjects/SW_Map_Lines.geojson";
const url_optimized_roads = "././data/astronomicalobjects/SW_Map_Optimized_Lines.json";
const url_areas = "././data/astronomicalobjects/SW_Map_Polygons.geojson";

/******** VARIABLES ****/

// Map param
const mapMinZoomLevel = -2;
const mapStarSystemMaxZoomLevel = 11;
const mapMaxZoomLevel = mapStarSystemMaxZoomLevel + 3;
const defaultObjectZoomIndex = 6;

const roadZoomLevelStep = 2;

