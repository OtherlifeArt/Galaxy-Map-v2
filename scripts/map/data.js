/******** CONSTANTS ****/

// URL Paths to data
const url_points = "././data/astronomicalobjects/SW_Map_Points.geojson"
const url_roads = "././data/astronomicalobjects/roads.geojson"
const url_areas = "././data/astronomicalobjects/SW_Map_Polygons.geojson"

// Hard coded parameters to display on map
const OBJECT_TYPES_TO_IGNORE = [
  "Universe", "Galaxy Cluster", "Galaxy Group", "Galaxy",
  "Sector", "Region",
];

/******** VARIABLES ****/

// Map param
const mapMinZoomLevel = -3;
const mapStarSystemMaxZoomLevel = 7;
const mapMaxZoomLevel = mapStarSystemMaxZoomLevel + 3;
const mapStartZoomLevel = -2;
const mapStartCenterCoordinates = [-450.0,0];

/************* DATA POINTS  ************/
// Filtered data
// var filteredData;

/************* USER OPTIONS ************/
// User options for point display
var userOptions = {
  continuity: {
    canon: true,
    legends: true,
    unlicensed: true,
  },
  display: {
    points: true,
    starSystems: false,
    ignoreObjectZoomLevelRestriction: false,
  }
};

/************** ROADS ***************/

function styleLines(feature) {
  /*Set roads style depending on properties*/
  return {
              color: feature.properties.color,
              weight: feature.properties.weight,
              opacity: feature.properties.opacity,
              smoothFactor: feature.properties.smoothFactor
          };
}

var roads = L.geoJSON(null,{
    pane:'roads',
    style:styleLines,
    snapIgnore: true,
    pmIgnore:true
});
$.getJSON(url_roads, function(data) {
  roads.addData(data);
});


/************** POINTS ***************/
/* Top-level layer */
const points = L.layerGroup([], { pane: 'points', title: 'All points'});
/* Top-level layers */
// Non star system layer group with coordinates
const innerStarSystemMainObjectLG = L.layerGroup([], { pane: 'points', title: 'Inner star system main objects' });
// Star system layer group with coordinates
const starSystemLG = L.layerGroup([], { pane: 'points', title: 'Star systems' });
// Other objects
const otherObjectLG = L.layerGroup([], { pane: 'points', title: 'Other objects' });

/* 1st level sub layers */
// Non star system layer group with coordinates
const innerStarSystemMainObjectCanonOnlyLG = L.layerGroup([], { pane: 'points', title: 'Inner star system main objects (canon only)' });
const innerStarSystemMainObjectLegendsOnlyLG = L.layerGroup([], { pane: 'points', title: 'Inner star system main objects (legends only)' });
const innerStarSystemMainObjectCanonAndLegendsLG = L.layerGroup([], { pane: 'points', title: 'Inner star system main objects (canon/legends)'});
const innerStarSystemMainObjectUnlicencedLG = L.layerGroup([], { pane: 'points', title: 'Inner star system main objects (unlicensed)'});
// Star system layer group with coordinates
const starSystemCanonOnlyLG = L.layerGroup([], { pane: 'points', title: 'Star systems (canon only)'});
const starSystemLegendsOnlyLG = L.layerGroup([], { pane: 'points', title: 'Star systems (legends only)'});
const starSystemCanonAndLegendsLG = L.layerGroup([], { pane: 'points', title: 'Star systems (canon/legends)'});
const starSystemUnlicencedLG = L.layerGroup([], { pane: 'points', title: 'Star systems (unlicensed)'});
// Other objects
const otherObjectCanonOnlyLG = L.layerGroup([], { pane: 'points', title: 'Other objects (canon only)'});
const otherObjectLegendsOnlyLG = L.layerGroup([], { pane: 'points', title: 'Other objects (legends only)'});
const otherObjectCanonAndLegendsLG = L.layerGroup([], { pane: 'points', title: 'Other objects (canon/legends)'});
const otherObjectUnlicencedLG = L.layerGroup([], { pane: 'points', title: 'Other objects (unlicensed)'});

/* Add sublayers to main layer */
points.addLayer(innerStarSystemMainObjectLG);
points.addLayer(starSystemLG);
points.addLayer(otherObjectLG);
/* Add subLayers to layers */
// Non star system layer group with coordinates
innerStarSystemMainObjectLG.addLayer(innerStarSystemMainObjectCanonOnlyLG);
innerStarSystemMainObjectLG.addLayer(innerStarSystemMainObjectLegendsOnlyLG);
innerStarSystemMainObjectLG.addLayer(innerStarSystemMainObjectCanonAndLegendsLG);
innerStarSystemMainObjectLG.addLayer(innerStarSystemMainObjectUnlicencedLG);
// Star system layer group with coordinates
starSystemLG.addLayer(starSystemCanonOnlyLG);
starSystemLG.addLayer(starSystemLegendsOnlyLG);
starSystemLG.addLayer(starSystemCanonAndLegendsLG);
starSystemLG.addLayer(starSystemUnlicencedLG);
// Other objects
otherObjectLG.addLayer(otherObjectCanonOnlyLG);
otherObjectLG.addLayer(otherObjectLegendsOnlyLG);
otherObjectLG.addLayer(otherObjectCanonAndLegendsLG);
otherObjectLG.addLayer(otherObjectUnlicencedLG);

/* Zoom level sub layers */
// Non star system layer group with coordinates
initializeZoomLayerGroup(innerStarSystemMainObjectCanonOnlyLG);
initializeZoomLayerGroup(innerStarSystemMainObjectLegendsOnlyLG);
initializeZoomLayerGroup(innerStarSystemMainObjectCanonAndLegendsLG);
initializeZoomLayerGroup(innerStarSystemMainObjectUnlicencedLG);
// Star system layer group with coordinates
initializeZoomLayerGroup(starSystemCanonOnlyLG);
initializeZoomLayerGroup(starSystemLegendsOnlyLG);
initializeZoomLayerGroup(starSystemCanonAndLegendsLG);
initializeZoomLayerGroup(starSystemUnlicencedLG);
// Other objects
initializeZoomLayerGroup(otherObjectCanonOnlyLG);
initializeZoomLayerGroup(otherObjectLegendsOnlyLG);
initializeZoomLayerGroup(otherObjectCanonAndLegendsLG);
initializeZoomLayerGroup(otherObjectUnlicencedLG);

// Functions

/**
 * Initialize layer group for zoom
 */
function initializeZoomLayerGroup(zoomLayerGroup) {
  const zoomLayerIndexCount = mapMaxZoomLevel - mapMinZoomLevel;
  for (let index = 0; index < zoomLayerIndexCount; index++) {
    zoomLayerGroup.addLayer(L.geoJSON(null,{
      pane:'points',
      title: `${zoomLayerGroup.options.title} - zoom level ${index}`,
      pointToLayer:pointToLayerPoints,
      style:pointStyle,
      onEachFeature:onEachFeaturePoints
    }));
  }
}

/**
 * Create geoJSON filtered data structure in order to add data to each sub layers
 */
function initFilteredDataObject() {
  const zoomLayerIndexCount = mapMaxZoomLevel - mapMinZoomLevel;
  // First (object display category) level filter
  let filteredData = { "innerStarSystemMainObjects": {}, "starSystemObjects": {}, "otherObjects": {} };
  for (const astroObjectCategory in filteredData) {
    // console.log(`${astroObjectCategory}: ${filteredData[astroObjectCategory]}`);
    // 2nd (continuity) level filter
    filteredData[astroObjectCategory] = {"canon": [], "canonAndLegends": [], "legends": [], "unlicensed": [] };
    // 3rd (zoom) level filter
    for (const astroObjectContinuity in filteredData[astroObjectCategory]) {
      for (let index = 0; index < zoomLayerIndexCount; index++) {
        // Create empty feature collection for each zoom layer
        filteredData[astroObjectCategory][astroObjectContinuity][index] = {
          "type": "FeatureCollection",
          "features": []
        };
      }
    }
  }
  // console.log(filteredData);
  return filteredData;
}

/**
 * Filter and add data to GeoJSON filtered data
 * 
 * @param {*} pointData geoJSON feature collection for points
 */
function filterData(pointData, filteredData) {
  pointData.features.forEach(function(feature) {
    console.log(feature);
    const fp = feature.properties;
    /* Ignore object list */
    if(OBJECT_TYPES_TO_IGNORE.find((typeToIgnore) => typeToIgnore === fp.TYPE)) {
      console.log(`Ignoring ${fp.NAME} feature as point`);
      return;
    };
    /* Object category */
    // Star systems with coordinates
    if(fp.TYPE.toLowerCase() === "star system") {
      if(fp.X_COORD && fp.X_COORD !== "" && fp.Y_COORD && fp.Y_COORD !== "") {
        /* Continuity */
        if(fp.LEGENDS.toLowerCase() === "yes") {
          if(fp.CANON.toLowerCase() === "yes") {
            // CANON and LEGENDS
            addDataToZoomLevelFilteredFeatureCollection(filteredData.starSystemObjects.canonAndLegends, feature);
          } else {
            // LEGENDS only
            addDataToZoomLevelFilteredFeatureCollection(filteredData.starSystemObjects.legends, feature);
          }
        } else if(fp.CANON.toLowerCase() === "yes") {
          // CANON only
          addDataToZoomLevelFilteredFeatureCollection(filteredData.starSystemObjects.canon, feature);
        } else if (fp.UNLICENSED.toLowerCase() === "yes") {
          // UNLICENSED
          addDataToZoomLevelFilteredFeatureCollection(filteredData.starSystemObjects.unlicensed, feature);
        }
      }
    } else {
      // Inner star system objects
      let starSystemCoordinates = getParentStarSystemCoordinatesIfAstroObjectFeatureIsInAStarSystem(pointData, fp);
      // We take into account only star systems with coordinates (That's why star system must have coordinates in data sheet)
      if(starSystemCoordinates.length > 0) {
        // Object have not its own coordinates, we add star system's ones
        if(!fp.X_COORD || fp.X_COORD === "" || !fp.Y_COORD || fp.Y_COORD === "") {
          feature.properties.X_COORD = starSystemCoordinates[0];
          feature.properties.Y_COORD = starSystemCoordinates[1];
        }
        // Add object to the inner star system object's zoom level filtered feature collection at object zoom level
        if(fp.X_COORD && fp.X_COORD !== "" && fp.Y_COORD && fp.Y_COORD !== "") {
          /* Continuity */
          if(fp.LEGENDS.toLowerCase() === "yes") {
            if(fp.CANON.toLowerCase() === "yes") {
              // CANON and LEGENDS
              addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemMainObjects.canonAndLegends, feature, mapStarSystemMaxZoomLevel + 1);
            } else {
              // LEGENDS only
              addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemMainObjects.legends, feature, mapStarSystemMaxZoomLevel + 1);
            }
          } else if(fp.CANON.toLowerCase() === "yes") {
            // CANON only
            addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemMainObjects.canon, feature, mapStarSystemMaxZoomLevel + 1);
          } else if (fp.UNLICENSED.toLowerCase() === "yes") {
            // UNLICENSED
            addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemMainObjects.unlicensed, feature, mapStarSystemMaxZoomLevel + 1);
          }
        }
      // Other objects with coordinates and not part of star system
      } else if(fp.X_COORD && fp.X_COORD !== "" && fp.Y_COORD && fp.Y_COORD !== "") {
        /* Continuity */
        if(fp.LEGENDS.toLowerCase() === "yes") {
          if(fp.CANON.toLowerCase() === "yes") {
            // CANON and LEGENDS
            addDataToZoomLevelFilteredFeatureCollection(filteredData.otherObjects.canonAndLegends, feature);
          } else {
            // LEGENDS only
            addDataToZoomLevelFilteredFeatureCollection(filteredData.otherObjects.legends, feature);
          }
        } else if(fp.CANON.toLowerCase() === "yes") {
          // CANON only
          addDataToZoomLevelFilteredFeatureCollection(filteredData.otherObjects.canon, feature);
        } else if (fp.UNLICENSED.toLowerCase() === "yes") {
          // UNLICENSED
          addDataToZoomLevelFilteredFeatureCollection(filteredData.otherObjects.unlicensed, feature);
        }
      }
    }
  });
  // console.log(filteredData);
  console.log(filteredData.innerStarSystemMainObjects);
  return filteredData;
}

/**
 * Check if astronomical object is in star system by entering its feature
 * 
 * @param {*} featureProperty Feature properties of astro object
 * @param {*} pointData GeoJSON feature collection for points
 * 
 * @returns {Array} [] if astro object is not in any star system, [x,y] star system coordinates array otherwise
 */
function getParentStarSystemCoordinatesIfAstroObjectFeatureIsInAStarSystem(pointData, featureProperty) {
  // Feature property undefined or null
  if(!featureProperty) {
    return [];
  }
  // Object type not belonging to star system
  if(OBJECT_TYPES_TO_IGNORE.find((typeToIgnore) => typeToIgnore === featureProperty.TYPE)) {
    return [];
  };
  const parentObject = pointData.features.find(feature => feature.properties.ID === featureProperty.PARENT_ID);
  if(parentObject && parentObject.properties.TYPE.toLowerCase() === "star system") {
    if(parentObject.properties.X_COORD && parentObject.properties.X_COORD !== "" && parentObject.properties.Y_COORD && parentObject.properties.Y_COORD !== "") {
      return [parentObject.properties.X_COORD, parentObject.properties.Y_COORD];
    } else {
      return [];
    }
  } else {
    return getParentStarSystemCoordinatesIfAstroObjectFeatureIsInAStarSystem(pointData, parentObject);
  }
}

// function mapStarSystemHierarchyBuilder(pointData, featureProperty) {
  
// }

/**
 * Add feature to right zoom level feature collection
 * 
 * @param {*} FeatureCollections Parent of zoom level feature collection
 * @param {*} feature From unfiltered featurecollection
 * @param {number|null} [forcedFeatureZoomLevelIndex] force feature collection to be added to this zoom level; Default null
 */
function addDataToZoomLevelFilteredFeatureCollection(FeatureCollections, feature, forcedFeatureZoomLevelIndex = null) {
  if(forcedFeatureZoomLevelIndex === null){
    let featureZoomLevelIndex;
    if(feature.ZOOM_LEVEL === undefined || feature.ZOOM_LEVEL === null || feature.ZOOM_LEVEL === "") {
      featureZoomLevelIndex = 0;
    } else {
      featureZoomLevelIndex = parseInt(feature.ZOOM_LEVEL);
    }
    FeatureCollections[featureZoomLevelIndex].features.push(feature);
  } else {
    FeatureCollections[forcedFeatureZoomLevelIndex].features.push(feature);
  }
}

/**
 * Add each filtered feature collection to right geoJSON object
 * 
 * @param {*} filteredData filtered feature collections
 */
function addFilteredData(filteredData) {
  const mapZoomLevelCount = mapMaxZoomLevel - mapMinZoomLevel;
  for (let index = 0; index < mapZoomLevelCount; index++) {
    // inner star system objects
    innerStarSystemMainObjectCanonOnlyLG.getLayers()[index].addData(filteredData.innerStarSystemMainObjects.canon[index]);
    innerStarSystemMainObjectLegendsOnlyLG.getLayers()[index].addData(filteredData.innerStarSystemMainObjects.legends[index]);
    innerStarSystemMainObjectCanonAndLegendsLG.getLayers()[index].addData(filteredData.innerStarSystemMainObjects.canonAndLegends[index]);
    innerStarSystemMainObjectUnlicencedLG.getLayers()[index].addData(filteredData.innerStarSystemMainObjects.unlicensed[index]);
    // Star system objects
    starSystemCanonOnlyLG.getLayers()[index].addData(filteredData.starSystemObjects.canon[index]);
    starSystemLegendsOnlyLG.getLayers()[index].addData(filteredData.starSystemObjects.legends[index]);
    starSystemCanonAndLegendsLG.getLayers()[index].addData(filteredData.starSystemObjects.canonAndLegends[index]);
    starSystemUnlicencedLG.getLayers()[index].addData(filteredData.starSystemObjects.unlicensed[index]);
    // Other objects
    otherObjectCanonOnlyLG.getLayers()[index].addData(filteredData.otherObjects.canon[index]);
    otherObjectLegendsOnlyLG.getLayers()[index].addData(filteredData.otherObjects.legends[index]);
    otherObjectCanonAndLegendsLG.getLayers()[index].addData(filteredData.otherObjects.canonAndLegends[index]);
    otherObjectUnlicencedLG.getLayers()[index].addData(filteredData.otherObjects.unlicensed[index]);
  }
  // console.log(points);
}

/**
 * Display or hide layers function of user options/parameters
 */
function filterPoints() {
  const mapTotalZoomLevel = mapMaxZoomLevel - mapMinZoomLevel;
  console.log("-------------- STARTS FILTERING POINTS -----------------");

    /** Inner star system objects **/
    if(!userOptions.display.starSystems) {
      console.log("(+) Inner objects");
      map.removeLayer(starSystemLG);
      console.log("[ ] Star system objects layer group");
      /* Continuity */
      // Unlicensed
      if(userOptions.continuity.unlicensed) {
        console.log("(+) unlicensed");
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          console.log("(+) Ignore zoom restriction");
          // Ignore zoom restriction (show all objects)
          filterPointsByZoomLevel(innerStarSystemMainObjectUnlicencedLG, mapTotalZoomLevel);
          console.log("[X] Inner objects - unlicensed - all zoom level");
        } else {
          filterPointsByZoomLevel(innerStarSystemMainObjectUnlicencedLG);
          console.log("[X] Inner objects - unlicensed - filtered zoom level");
        }
        // Adding inner objects once all sub layers are filtered
        map.addLayer(innerStarSystemMainObjectUnlicencedLG);
        console.log("[X] Inner objects layer group - unlicensed");
      } else {
        map.removeLayer(innerStarSystemMainObjectUnlicencedLG);
        console.log("[ ] Inner objects layer group - unlicensed");
      }
      // Legends
      if (userOptions.continuity.legends) {
        console.log("(+) legends");
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          console.log("(+) Ignore zoom restriction");
          // Ignore zoom restriction (show all objects)
          filterPointsByZoomLevel(innerStarSystemMainObjectLegendsOnlyLG, mapTotalZoomLevel);
          console.log("[X] Inner objects - legends - all zoom level");
        } else {
          filterPointsByZoomLevel(innerStarSystemMainObjectLegendsOnlyLG);
          console.log("[X] Inner objects - legends - filtered zoom level");
        }
        // Adding legends inner objects once all sub layers are filtered
        map.addLayer(innerStarSystemMainObjectLegendsOnlyLG);
        console.log("[X] Inner objects layer group - legends");
      } else {
        map.removeLayer(innerStarSystemMainObjectLegendsOnlyLG);
        console.log("[ ] Inner objects layer group - legends");
      }
      // Canon
      if (userOptions.continuity.canon) {
        console.log("(+) canon");
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          console.log("(+) Ignore zoom restriction");
          // Ignore zoom restriction (show all objects)
          filterPointsByZoomLevel(innerStarSystemMainObjectCanonOnlyLG, mapTotalZoomLevel);
          console.log("[X] Inner objects - canon - all zoom level");
        } else {
          filterPointsByZoomLevel(innerStarSystemMainObjectCanonOnlyLG);
          console.log("[X] Inner objects - canon - filtered zoom level");
        }
        // Adding canon inner objects once all sub layers are filtered
        map.addLayer(innerStarSystemMainObjectCanonOnlyLG);
        console.log("[X] Inner objects layer group - canon");
      } else {
        map.removeLayer(innerStarSystemMainObjectCanonOnlyLG);
        console.log("[ ] Inner objects layer group - canon");
      }
      // Canon or Legends
      if (userOptions.continuity.legends || userOptions.continuity.canon) {
        console.log("(+) canon/legends");
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          console.log("(+) Ignore zoom restriction");
          // Ignore zoom restriction (show all objects)
          filterPointsByZoomLevel(innerStarSystemMainObjectCanonAndLegendsLG, mapTotalZoomLevel);
          console.log("[X] Inner objects - canon/legends - all zoom level");
        } else {
          filterPointsByZoomLevel(innerStarSystemMainObjectCanonAndLegendsLG);
          console.log("[X] Inner objects - canon/legends - filtered zoom level");
        }
        // Adding canon/legends inner objects once all sub layers are filtered
        map.addLayer(innerStarSystemMainObjectCanonAndLegendsLG);
        console.log("[X] Inner objects layer group - canon/legends");
      } else {
        map.removeLayer(innerStarSystemMainObjectCanonAndLegendsLG);
        console.log("[ ] Inner objects layer group - canon/legends");
      }
      // Adding inner objects once all sub layers are filtered
      console.log("[X] Inner objects layer group");
      map.addLayer(innerStarSystemMainObjectLG);

      /** Star system objects **/
    } else {
      console.log("(+) Star systems");
      map.removeLayer(innerStarSystemMainObjectLG);
      console.log("[ ] Inner objects layer group");
      /* Continuity */
      // Unlicensed
      if(userOptions.continuity.unlicensed) {
        console.log("(+) unlicensed");
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          console.log("(+) Ignore zoom restriction");
          // Ignore zoom restriction (show all objects)
          filterPointsByZoomLevel(starSystemUnlicencedLG, mapTotalZoomLevel);
          console.log("[X] Star system objects - unlicensed - all zoom level");
        } else {
          filterPointsByZoomLevel(starSystemUnlicencedLG);
          console.log("[X] Star system objects - unlicensed - filtered zoom level");
        }
        // Adding inner objects once all sub layers are filtered
        map.addLayer(starSystemUnlicencedLG);
        console.log("[X] Star system objects layer group - unlicensed");
      } else {
        map.removeLayer(starSystemUnlicencedLG);
        console.log("[ ] Star system objects layer group - unlicensed");
      }
      // Legends
      if (userOptions.continuity.legends) {
        console.log("(+) legends");
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          console.log("(+) Ignore zoom restriction");
          // Ignore zoom restriction (show all objects)
          filterPointsByZoomLevel(starSystemLegendsOnlyLG, mapTotalZoomLevel);
          console.log("[X] Star system objects - legends - all zoom level");
        } else {
          filterPointsByZoomLevel(starSystemLegendsOnlyLG);
          console.log("[X] Star system objects - legends - filtered zoom level");
        }
        // Adding legends inner objects once all sub layers are filtered
        map.addLayer(starSystemLegendsOnlyLG);
        console.log("[X] Star system objects layer group - legends");
      } else {
        map.removeLayer(starSystemLegendsOnlyLG);
        console.log("[ ] Star system objects layer group - legends");
      }
      // Canon
      if (userOptions.continuity.canon) {
        console.log("(+) canon");
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          console.log("(+) Ignore zoom restriction");
          // Ignore zoom restriction (show all objects)
          filterPointsByZoomLevel(starSystemCanonOnlyLG, mapTotalZoomLevel);
          console.log("[X] Star system - canon - all zoom level");
        } else {
          filterPointsByZoomLevel(starSystemCanonOnlyLG);
          console.log("[X] Star system - canon - filtered zoom level");
        }
        // Adding canon inner objects once all sub layers are filtered
        map.addLayer(starSystemCanonOnlyLG);
        console.log("[X] Star system objects layer group - canon");
      } else {
        map.removeLayer(starSystemCanonOnlyLG);
        console.log("[ ] Star system layer group - canon");
      }
      // Canon or Legends
      if (userOptions.continuity.legends || userOptions.continuity.canon) {
        console.log("(+) canon/legends");
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          console.log("(+) Ignore zoom restriction");
          // Ignore zoom restriction (show all objects)
          filterPointsByZoomLevel(starSystemCanonAndLegendsLG, mapTotalZoomLevel);
          console.log("[X] Star system - canon/legends - all zoom level");
        } else {
          filterPointsByZoomLevel(starSystemCanonAndLegendsLG);
          console.log("[X] Star system - canon/legends - filtered zoom level");
        }
        // Adding canon/legends inner objects once all sub layers are filtered
        map.addLayer(starSystemCanonAndLegendsLG);
        console.log("[X] Star system layer group - canon/legends");
        
      } else {
        map.removeLayer(starSystemCanonAndLegendsLG);
        console.log("[ ] Star system layer group - canon/legends");
      }
      // Adding star system objects once all sub layers are filtered
      map.addLayer(starSystemLG);
      console.log("[X] Star system objects layer group");
    }

    /** Other objects **/
    console.log("(+) Other objects");
    /* Continuity */
    // Unlicensed
    if(userOptions.continuity.unlicensed) {
      console.log("(+) unlicensed");
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        console.log("(+) Ignore zoom restriction");
        // Ignore zoom restriction (show all objects)
        filterPointsByZoomLevel(otherObjectUnlicencedLG, mapTotalZoomLevel);
        console.log("[X] Other objects - unlicensed - all zoom level");
      } else {
        filterPointsByZoomLevel(otherObjectUnlicencedLG);
        console.log("[X] Other objects - unlicensed - filtered zoom level");
      }
      // Adding inner objects once all sub layers are filtered
      map.addLayer(otherObjectUnlicencedLG);
      console.log("[X] Other objects layer group - unlicensed");
    } else {
      map.removeLayer(otherObjectUnlicencedLG);
      console.log("[ ] Other objects layer group - unlicensed");
    }
    // Legends
    if (userOptions.continuity.legends) {
      console.log("(+) legends");
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        console.log("(+) Ignore zoom restriction");
        // Ignore zoom restriction (show all objects)
        filterPointsByZoomLevel(otherObjectLegendsOnlyLG, mapTotalZoomLevel);
        console.log("[X] Other objects - legends - all zoom level");
      } else {
        filterPointsByZoomLevel(otherObjectLegendsOnlyLG);
        console.log("[X] Other objects - legends - filtered zoom level");
      }
      // Adding legends inner objects once all sub layers are filtered
      map.addLayer(otherObjectLegendsOnlyLG);
      console.log("[X] Other objects layer group - legends");
    } else {
      map.removeLayer(otherObjectLegendsOnlyLG);
      console.log("[ ] Other objects layer group - legends");
    }
    // Canon
    if (userOptions.continuity.canon) {
      console.log("(+) canon");
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        console.log("(+) Ignore zoom restriction");
        // Ignore zoom restriction (show all objects)
        filterPointsByZoomLevel(otherObjectCanonOnlyLG, mapTotalZoomLevel);
        console.log("[X] Other objects - canon - all zoom level");
      } else {
        filterPointsByZoomLevel(otherObjectCanonOnlyLG);
        console.log("[X] Other objects - canon - filtered zoom level");
      }
      // Adding canon inner objects once all sub layers are filtered
      map.addLayer(otherObjectCanonOnlyLG);
      console.log("[X] Other objects layer group - canon");
    } else {
      map.removeLayer(otherObjectCanonOnlyLG);
      console.log("[ ] Other objects layer group - canon");
    }
    // Canon or Legends
    if (userOptions.continuity.legends || userOptions.continuity.canon) {
      console.log("(+) canon/legends");
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        console.log("(+) Ignore zoom restriction");
        // Ignore zoom restriction (show all objects)
        filterPointsByZoomLevel(otherObjectCanonAndLegendsLG, mapTotalZoomLevel);
        console.log("[X] Other objects - canon/legends - all zoom level");
      } else {
        filterPointsByZoomLevel(otherObjectCanonAndLegendsLG);
        console.log("[X] Other objects - canon/legends - filtered zoom level");
      }
      // Adding canon/legends inner objects once all sub layers are filtered
      map.addLayer(otherObjectCanonAndLegendsLG);
      console.log("[X] Other objects layer group - canon/legends");
    } else {
      map.removeLayer(otherObjectCanonAndLegendsLG);
      console.log("[ ] Other objects layer group - canon/legends");
    }
    // Adding other objects once all sub layers are filtered
    map.addLayer(otherObjectLG);
    console.log("[X] Other objects layer group");
  console.log("-------------- ENDS FILTERING POINTS -----------------");
}

/**
 * Display/hide layers function of zoom
 * 
 * @param {*} zoomParentGroupLayer parent zoom layer array
 * @param {*} mapZoom zoom level you want to filter. Default : current zoom level
 */
function filterPointsByZoomLevel(zoomParentGroupLayer, mapZoom = map.getZoom() - mapStartZoomLevel) {
  const groupLayers = zoomParentGroupLayer.getLayers();
  // console.log(groupLayers);
  for (let index = 0; index < groupLayers.length; index++) {
    if(index <= mapZoom) {
      map.addLayer(groupLayers[index]);
      console.log("Adding layer: " + groupLayers[index].options.title);
    } else {
      map.removeLayer(groupLayers[index]);
      console.log("Removing layer: " + groupLayers[index].options.title);
    }
  }
}

/**
 * Format and display point with coordinates according to user options
 * 
 * @param {*} feature 
 * @param {*} latlng 
 * @returns 
 */
function pointToLayerPoints(feature,latlng) {
  // console.log(feature.properties);

  let useIcon = false;
  let iconParams = [];
  //// Use markers with icons ////
  // TYPE

  // Not displayed objects
  if (feature.properties.TYPE === "Galaxy Cluster" || feature.properties.TYPE === "Galaxy Group" || 
    feature.properties.TYPE === "Universe" || feature.properties.TYPE === "Region" || feature.properties.TYPE === "Sector" ||
    feature.properties.TYPE === "Galaxy"
  ) {
    return;

  // Cloud objects
  } else if(feature.properties.TYPE === "Nebula" || feature.properties.TYPE === "Interstellar Cloud" || feature.properties.TYPE === "Interstellar Matter") {
    useIcon = true;
    iconParams[0] = "NEBULA";
  
  // Star clusters
  } else if (feature.properties.TYPE === "Star Cluster") {
    useIcon = true;
    iconParams[0] = "CLUSTER";

  // Black hole
  } else if (feature.properties.TYPE === "Star" && feature.properties.TYPE_CLASSES === "Black Hole") {
    useIcon = true;
    iconParams[0] = "BLACKHOLE";
  
  // System, star and planet-like types
  } else if(
      feature.properties.TYPE === "Star System" || feature.properties.TYPE === "Star" || feature.properties.TYPE === "Star Barycenter" ||
      feature.properties.TYPE === "Planet" || feature.properties.TYPE === "Planet Barycenter" || feature.properties.TYPE === "Rogue Planet" || feature.properties.TYPE === "Dwarf Planet" ||
      feature.properties.TYPE === "Moon" || feature.properties.TYPE === "Rogue Moon" ||  feature.properties.TYPE === "Dwarf Moon" || 
      feature.properties.TYPE === "Asteroid" || feature.properties.TYPE === "Asteroid Belt" || feature.properties.TYPE === "Asteroid Field" || feature.properties.TYPE === "Rogue Asteroid" ||
      feature.properties.TYPE === "Comet" || feature.properties.TYPE === "Rogue Comet" || feature.properties.TYPE === "Comet Cluster" || feature.properties.TYPE === "Cometary Cloud" ||
      feature.properties.TYPE === "Rings" || feature.properties.TYPE === "Location"
    ) {
    useIcon = true;
    iconParams[0] = "PLANET";

  // Exotic objects
  } else if(feature.properties.TYPE === "Exotic" || feature.properties.TYPE === "Anomaly") {
    useIcon = true;
    iconParams[0] = "PHENOMENA";

  // Artifficial objects
  } else if(feature.properties.TYPE === "Artificial Object") {
    useIcon = true;
    iconParams[0] = "STATION";

  // Unknown objects
  // } else if(feature.properties.TYPE === "Unknown") {
  //   useIcon = true;
  //   iconParams[0] = "STATION";

  // Message log
  } else {
    console.log(`No icon for object type ${feature.properties.TYPE} (${feature.properties.NAME})`);
  }
  
  // Continuity icon switch
  if(useIcon) {
    // CONTINUITY
    if(feature.properties.CANON === "YES" && feature.properties.LEGENDS === "YES") {
      iconParams[1] = "CANON_AND_LEGENDS";
    } else if (feature.properties.CANON === "YES") {
      iconParams[1] = "CANON";
    } else if (feature.properties.LEGENDS === "YES") {
      iconParams[1] = "LEGENDS";
    } else {
      iconParams[1] = "DEFAULT";
    }
    // MOVIE or NOT
    if(feature.properties.IN_MOVIES === "YES") {
      iconParams[2] = "MOVIE";
    } else {
      iconParams[2] = "DEFAULT";
    }
  }
  // Icon found ?
  if(!useIcon || !ASTRO_ICONS[iconParams[0]] || !ASTRO_ICONS[iconParams[0]][iconParams[1]] || !ASTRO_ICONS[iconParams[0]][iconParams[1]][iconParams[2]]) {
    // use regular circleMarkers
    return L.circleMarker(latlng, {
      pane:"points",
      radius:4,
      interactive: true
    });
  } else {
    // use icon
    return L.marker(latlng, {
      pane:"points",
      icon: ASTRO_ICONS[iconParams[0]][iconParams[1]][iconParams[2]],
      interactive: true,
    });
  }
}

function pointStyle(feature){
    return {
      fillColor: getPointColor(feature.properties.TYPE),
      fillOpacity: 0.6,
      color: getPointColor(feature.properties.TYPE),
      opacity: 1,
      weight: 1,
  }
}

function getPointColor(type) {
  return (
      type === "Planet" || type === "Dwarf Planet" || type === "Planet Barycenter"
          ? "#2FA044"
          : type === "Moon" || type === "Dwarf Moon"
          ? "#FEFEFE"
          : type === "Star System"
          ? "#C70039"
          : type === "Artificial object"
          ? "#606261"
          : type === "Asteroid Field" || type === "Asteroid"
          ? "#1D204D"
          : type === "Star" || type === "Star Cluster" || type === "Star Barycenter"
          ? "#E5D91D"
          : type === "Comet" || type === "Comet Cluster" || type === "Cometary Cloud"
          ? "#EDAC0C"
          : type === "Nebula"
          ? "#0C1DED"
          : type === "Location"
          ? "#7CAFBB"
          : type === "Exotic"
          ? "#78D3C3"
          : type === "Unknown"
          ? "#DEE048"
          : "Unknown"
  );
}

function onEachFeaturePoints(feature, layer) {
  layer.bindTooltip(feature.properties.NAME);
  layer.on({
    mouseover: function(e) {
      pointDisplayTooltip(e);
      highlightCircleMarker(e);
    },
    mouseout: function(e) {
      pointHideTooltip(e);
      // resetCircleMarkerStyle(e);
    },
    click: function(e) {
      pointDisplayPopup(e);
    },
  });
}

function highlightCircleMarker(e) {
  var layer = e.target;
  if (!!layer.setStyle) {
    layer.setStyle({
      weight: 8
    });
  }
  if (!!layer.bringToFront) {
    layer.bringToFront();
  }
}

// function resetCircleMarkerStyle(e) {
//   points.resetStyle(e.target);
//   e.target.resetStyle(e.target);
// }

// Load data from local geojson and initialize the layer
$.getJSON(url_points, function(data) {
  // console.log(data);
  // filterPoints(data);
  let filteredData = initFilteredDataObject();
  filteredData = filterData(data, filteredData);
  // console.log(filteredData);
  addFilteredData(filteredData);
  map.addLayer(points);
  filterPoints();
  // Show points on map
  // points.addData(data);
});

/************** POLYGONS ***************/

function getRegionsColor(name,area) {
  if (name == 'Deep Core') {
    color = "#e0e0d7"
  } else if (name == "Core Worlds") {
    color = "#e0cd4f"
  } else if (name == "Inner Rim"){
    color = "#e68b57"
  } else if (name == "Colonies"){
    color = "#bd89c4"
  } else if (name == "Hutt Space"){
    color = "#db4476"
  } else if (name == "Unknown Regions"){
    color = "#848385"
  } else if (name == "Wild Space"){
    color = "#646266"
  } else {
    if (area.includes("Expansion")) {
      color = "#5778e6"
    } else if (area.includes("Mid")) {
      color = "#d437ba"
    } else if (area.includes("Outer")) {
      color = "#7944ad"
    } else if (area.includes("Wild Space")) {
      color = "#646266"
    } else if (area.includes("Inner")) {
      color = "#e68b57"
    } else if (area.includes("Colonies")) {
      color = "#bd89c4"
    } else if (area.includes("Core Worlds")) {
      color = "#e0cd4f"
    } else {
      color = "#000000"
    }
  }
  return color
}

function getRegionsStyle(feature) {
  return {
      fillColor: getRegionsColor(feature.properties.NAME,feature.properties.PARENT),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '1',
      fillOpacity: 0.4
  };
}

var areas;

function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
      weight: 2,
      dashArray: '',
  });
  layer.bringToFront();
}

function resetHighlight(e) {
  areas.resetStyle(e.target);
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.bindTooltip(feature.properties.NAME, { sticky: true });
  layer.on({
      mouseover: function(e) {
        highlightFeature(e);
        areaDisplayTooltip(e);
      },
      mouseout: function(e) {
        resetHighlight(e);
        areaHideTooltip(e);
      },
      click:  function(e) {
        zoomToFeature(e);
        areaDisplayPopup(e);
      },
  });
}

// Create layers
areas = L.geoJSON(null,{
  pane:'areas',
  style:getRegionsStyle,
  onEachFeature:onEachFeature,
  snapIgnore: true,
  pmIgnore: true
});
$.getJSON(url_areas, function(data) {
  areas.addData(data);
});