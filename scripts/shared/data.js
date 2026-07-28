/* Those parameters are shared between map main application and data form */

/******** CONSTANTS ****/
// Hard coded parameters to display on map
const OBJECT_TYPES_TO_IGNORE = [
  "Universe", "Galaxy Cluster", "Galaxy Group", "Galaxy",
  "Sector", "Region",
];

// URL Paths to data
const url_points = "././data/astronomicalobjects/SW_Map_Points.geojson"
const url_optimized_points = "././data/astronomicalobjects/SW_Map_Optimized_Points.json"
const url_roads = "././data/astronomicalobjects/SW_Map_Lines.geojson";
const url_areas = "././data/astronomicalobjects/SW_Map_Polygons.geojson";

/******** VARIABLES ****/

// Map param
const mapMinZoomLevel = -2;
const mapStarSystemMaxZoomLevel = 11;
const mapMaxZoomLevel = mapStarSystemMaxZoomLevel + 3;
const defaultObjectZoomIndex = 6;



/**
 * Add feature to right zoom level feature collection
 * 
 * @param {*} featureCollections Parent of zoom level feature collection
 * @param {*} feature From unfiltered featurecollection
 * @param {number|null} [forcedFeatureZoomLevelIndex] force feature collection to be added to this zoom level; Default null
 */
function addDataToZoomLevelFilteredFeatureCollection(featureCollections, feature, forcedFeatureZoomLevelIndex = null) {
  // console.log(feature);
  let featureZoomLevelIndex;
  if(forcedFeatureZoomLevelIndex === null){
    if(feature.properties.ZOOM_LEVEL === undefined || feature.properties.ZOOM_LEVEL === null || feature.properties.ZOOM_LEVEL === "") {
      featureZoomLevelIndex = defaultObjectZoomIndex;
    } else {
      featureZoomLevelIndex = parseInt(feature.properties.ZOOM_LEVEL);
      // console.log(feature.properties.NAME, feature.properties.ZOOM_LEVEL);
      
    }
  } else {
    featureZoomLevelIndex = forcedFeatureZoomLevelIndex;
  }
  // Duplicate level 1 feature collection to add "glow background" with a deep copy
  if (feature.properties.LEVEL === "1" || feature.properties.LEVEL === 1) {
    const DEEP_COPIED_FEATURE = JSON.parse(JSON.stringify(feature));
    if(DEEP_COPIED_FEATURE.properties.weight === undefined || DEEP_COPIED_FEATURE.properties.weight === "") {
      DEEP_COPIED_FEATURE.properties.weight = 4 * roadGlowWidthFactor;
    } else {
      DEEP_COPIED_FEATURE.properties.weight = parseInt(DEEP_COPIED_FEATURE.properties.weight) * roadGlowWidthFactor;
    }
    DEEP_COPIED_FEATURE.properties.opacity = roadGlowOpacity;
    // Add glow route before route
    featureCollections[featureZoomLevelIndex].features.push(DEEP_COPIED_FEATURE);
  }
  // Push feature into feature collection according to its zoom level
  featureCollections[featureZoomLevelIndex].features.push(feature);
}

/**
 * Check if astronomical object is in star system by entering its feature
 * 
 * @param {*} featureProperty Feature properties of astro object
 * @param {*} featureCollection GeoJSON feature collection for points
 * 
 * @returns {Array} [] if astro object is not in any star system, [x,y] star system coordinates array otherwise
 */
function getParentStarSystemCoordinatesIfAstroObjectFeatureIsInAStarSystem(featureCollection, featureProperty) {
  // Feature property undefined or null
  if(!featureProperty) {
    return [];
  }
  // Object type not belonging to star system
  if(OBJECT_TYPES_TO_IGNORE.find((typeToIgnore) => typeToIgnore === featureProperty.TYPE)) {
    return [];
  };
  const parentObject = featureCollection.find(feature => feature.properties.ID === featureProperty.PARENT_ID);
  if(parentObject && parentObject.properties.TYPE.toLowerCase() === "star system") {
    if(parentObject.properties.X_COORD && parentObject.properties.X_COORD !== "" && parentObject.properties.Y_COORD && parentObject.properties.Y_COORD !== "") {
      return [parentObject.properties.X_COORD, parentObject.properties.Y_COORD];
    } else {
      return [];
    }
  } else {
    return getParentStarSystemCoordinatesIfAstroObjectFeatureIsInAStarSystem(featureCollection, parentObject);
  }
}
