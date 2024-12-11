/******** CONSTANTS ****/

// URL Paths to data
const url_points = "././data/astronomicalobjects/SW_Map_Points.geojson"
const url_roads = "././data/astronomicalobjects/SW_Map_Lines.geojson"
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

// Road param
const roadZoomLevelStep = 2;

/************* DATA POINTS  ************/
// Downloaded data from geojson files
var pointData;
var roadData;

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
    roads: true,
    starSystems: false,
    ignoreObjectZoomLevelRestriction: false,
  }
};

/************** ROADS ***************/
/* Top-level layer */
const roads = L.layerGroup([], { pane: 'roads', title: 'All roads'});
/* Continuity leve layer */
const roadCanonOlyLG = L.layerGroup([], { pane: 'roads', title: 'Roads (canon only)' });
const roadLegendsOnlyLG = L.layerGroup([], { pane: 'roads', title: 'Roads (legends only)' });
const roadCanonAndLegendsLG= L.layerGroup([], { pane: 'roads', title: 'Roads (canon and legends)' });
const roadUnlicencedLG = L.layerGroup([], { pane: 'roads', title: 'Roads (unlicenced)' });
/* Add sublayers to main layer */
roads.addLayer(roadCanonOlyLG);
roads.addLayer(roadLegendsOnlyLG);
roads.addLayer(roadCanonAndLegendsLG);
roads.addLayer(roadUnlicencedLG);
/* Zoom level sub layers */
initializeZoomLayerRoadGroup(roadCanonOlyLG);
initializeZoomLayerRoadGroup(roadLegendsOnlyLG);
initializeZoomLayerRoadGroup(roadCanonAndLegendsLG);
initializeZoomLayerRoadGroup(roadUnlicencedLG);

function* roadColorGenerator() {
  while(true) {
    yield "#262673"; // Navy
    yield "#ffd8b1"; // Apricot
    yield "#C98B5E"; // Orange
    yield "#DCA3D9"; // Magenta
    yield "#AAFFC3"; // Mint
    yield "#F58231"; // Orange
    yield "#42d4f4"; // Cyan
    yield "#3cb44b"; // Green
    yield "#800000"; // Maroon
    yield "#4363d8"; // Blue
    yield "#AFCC66"; // Lime
    yield "#EEEECD"; // Pale
    yield "#94A5DB"; // Lavander
    yield "#fffac8"; // Beige
    yield "#ff8080"; // Light Red
    yield "#FF0000"; // Red
    yield "#b09cc8"; // Purple
    yield "#93e98e"; // Green 2
    yield "#FCB001"; // Yellow
    yield "#00bfff"; // Blue 2
  }
}

function styleLines(feature){
  let color = feature.properties.color && feature.properties.color !== "" ? feature.properties.color : roadColorGen.next().value;
  let weight = feature.properties.weight && feature.properties.weight !== "" ? parseFloat(feature.properties.weight) : 5 - parseInt(feature.properties.LEVEL); // From 4 to 1
  let opacity = feature.properties.opacity && feature.properties.opacity !== "" ? parseFloat(feature.properties.opacity) :  0.9;
  let smoothFactor = feature.properties.smoothFactor && feature.properties.smoothFactor !== "" ? feature.properties.smoothFactor : 1.0;
  
  return {
    color: color,
    weight: weight,
    opacity: opacity,
    smoothFactor: smoothFactor,
    dashArray: feature.properties.weight === 1 || parseInt(feature.properties.LEVEL) >= 4 ? '20, 20' : '20, 0', // Dotted lines on level 4 roads
    dashOffset: '0'
  }
}

function initializeZoomLayerRoadGroup(zoomLayerGroup){
  const zoomLayerIndexCount = mapMaxZoomLevel - mapMinZoomLevel;
  for (let index = 0; index < zoomLayerIndexCount; index++) {
    zoomLayerGroup.addLayer(L.geoJSON(null,{
      pane:'roads',
      title: `${zoomLayerGroup.options.title} - zoom level ${index}`,
      style: styleLines,
      snapIgnore : true,
      pmIgnore: true,
      onEachFeature: onEachFeatureRoads
    }));
  }
}

function initFilteredRoadDataObject() {
  const zoomLayerIndexCount = mapMaxZoomLevel - mapMinZoomLevel;
  const filteredData = {"canon": [], "canonAndLegends": [], "legends": [], "unlicensed": [] };
  for (const routeContinuity in filteredData) {
    for (let index = 0; index < zoomLayerIndexCount; index++) {
      // Create empty feature collection for each zoom layer
      filteredData[routeContinuity][index] = {
        "type": "FeatureCollection",
        "features": []
      };
    }
  }
  // console.log(filteredData);
  return filteredData;
}

function filterRoadData(roadData, filteredData) {
  roadData.features.forEach(function(feature) {
    const fp = feature.properties;
    const fpZoomLevel = fp.ZOOM_LEVEL !== "" ? parseInt(fp.ZOOM_LEVEL) : (parseInt(fp.LEVEL) - 1) * roadZoomLevelStep;
    if(!fpZoomLevel && fpZoomLevel !== 0) {
      console.warn(feature.properties);
      alert("ZOOM_LEVEL or LEVEL data missing for route " + fp.NAME + " !! Check console !!");
      return; // we ignore this road
    }
    /* Continuity */
    if(fp.LEGENDS.toLowerCase() === "yes") {
      if(fp.CANON.toLowerCase() === "yes") {
        // CANON and LEGENDS
        addDataToZoomLevelFilteredFeatureCollection(filteredData.canonAndLegends, feature, fpZoomLevel);
      } else {
        // LEGENDS only
        addDataToZoomLevelFilteredFeatureCollection(filteredData.legends, feature, fpZoomLevel);
      }
    } else if(fp.CANON.toLowerCase() === "yes") {
      // CANON only
      addDataToZoomLevelFilteredFeatureCollection(filteredData.canon, feature, fpZoomLevel);
    } else if (fp.UNLICENSED.toLowerCase() === "yes") {
      // UNLICENSED
      addDataToZoomLevelFilteredFeatureCollection(filteredData.unlicensed, feature, fpZoomLevel);
    }
  });
  const styles = ['color: black', 'background: lightgreen','font-weight: bold'].join(';');
  console.log("%c[INIT] Road Data filtered", styles);
  return filteredData;
}

function addFilteredRoadData(filteredData) {
  const mapZoomLevelCount = mapMaxZoomLevel - mapMinZoomLevel;
  for (let index = 0; index < mapZoomLevelCount; index++) {
    roadCanonOlyLG.getLayers()[index].addData(filteredData.canon[index]);
    roadLegendsOnlyLG.getLayers()[index].addData(filteredData.legends[index]);
    roadCanonAndLegendsLG.getLayers()[index].addData(filteredData.canonAndLegends[index]);
    roadUnlicencedLG.getLayers()[index].addData(filteredData.unlicensed[index]);
  }
}

function filterRoads() {
  const mapTotalZoomLevel = mapMaxZoomLevel - mapMinZoomLevel;
  if(debug) {
    console.log("-------------- STARTS FILTERING ROADS -----------------");
  }
  // Check road layer display option before filtering
  if(!userOptions.display.roads) {
    map.removeLayer(roads);
  } else {
    /* Continuity */
    // Unlicensed
    if(userOptions.continuity.unlicensed) {
      if(debug) {
        console.log("(+) unlicensed");
      }
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        if(debug) {
          console.log("(+) Ignore zoom restriction");
        }
        // Ignore zoom restriction (show all objects)
        filterHighEndLayersByZoomLevel(roadUnlicencedLG, mapTotalZoomLevel);
        if(debug) {
          console.log("[X] Roads - unlicensed - all zoom level");
        }
      } else {
        filterHighEndLayersByZoomLevel(roadUnlicencedLG);
        if(debug) {
          console.log("[X] Roads - unlicensed - filtered zoom level");
        }
      }
      if(debug) {
        console.log("[X] Roads slayer group - unlicensed");
      }
    } else {
      map.removeLayer(roadUnlicencedLG);
      if(debug) {
        console.log("[ ] Roads layer group - unlicensed");
      }
    }
    // Legends
    if (userOptions.continuity.legends) {
      if(debug) {
        console.log("(+) legends");
      }
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        if(debug) {
          console.log("(+) Ignore zoom restriction");
        }
        // Ignore zoom restriction (show all objects)
        filterHighEndLayersByZoomLevel(roadLegendsOnlyLG, mapTotalZoomLevel);
        if(debug) {
          console.log("[X] Roads - legends - all zoom level");
        }
      } else {
        filterHighEndLayersByZoomLevel(roadLegendsOnlyLG);
        if(debug) {
          console.log("[X] Roads - legends - filtered zoom level");
        }
      }
      if(debug) {
        console.log("[X] Roads layer group - legends");
      }
    } else {
      map.removeLayer(roadLegendsOnlyLG);
      if(debug) {
        console.log("[ ] Roads layer group - legends");
      }
    }
    // Canon
    if (userOptions.continuity.canon) {
      if(debug) {
        console.log("(+) canon");
      }
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        if(debug) {
          console.log("(+) Ignore zoom restriction");
        }
        // Ignore zoom restriction (show all objects)
        filterHighEndLayersByZoomLevel(roadCanonOlyLG, mapTotalZoomLevel);
        if(debug) {
          console.log("[X] Roads - canon - all zoom level");
        }
      } else {
        filterHighEndLayersByZoomLevel(roadCanonOlyLG);
        if(debug) {
          console.log("[X] Roads - canon - filtered zoom level");
        }
      }
      if(debug) {
        console.log("[X] Roads layer group - canon");
      }
    } else {
      map.removeLayer(roadCanonOlyLG);
      if(debug) {
        console.log("[ ] Roads layer group - canon");
      }
    }
    // Canon or Legends
    if (userOptions.continuity.legends || userOptions.continuity.canon) {
      if(debug) {
        console.log("(+) canon/legends");
      }
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        if(debug) {
          console.log("(+) Ignore zoom restriction");
        }
        // Ignore zoom restriction (show all objects)
        filterHighEndLayersByZoomLevel(roadCanonAndLegendsLG, mapTotalZoomLevel);
        if(debug) {
          console.log("[X] Roads - canon/legends - all zoom level");
        }
      } else {
        filterHighEndLayersByZoomLevel(roadCanonAndLegendsLG);
        if(debug) {
          console.log("[X] Roads - canon/legends - filtered zoom level");
        }
      }
      if(debug) {
        console.log("[X] Roads layer group - canon/legends");
      }
    } else {
      map.removeLayer(roadCanonAndLegendsLG);
      if(debug) {
        console.log("[ ] Roads layer group - canon/legends");
      }
    }
    map.addLayer(roads);
  }
  if(debug) {
    console.log("-------------- ENDS FILTERING ROADS -----------------");
  }
  const styles = ['color: black', 'background: lightgreen','font-weight: bold'].join(';');
  console.log("%c[RUN] Roads displayed", styles);
}

function onEachFeatureRoads(feature, layer) {
  layer.bindTooltip(feature.properties.NAME, { sticky: true });
  layer.on({
    mouseover: function(e) {
      roadDisplayTooltip(e);
    },
    mouseout: function(e) {
      roadHideTooltip(e);
      // resetCircleMarkerStyle(e);
    },
    click: function(e) {
      roadDisplayPopup(e);
    },
  });
}

// const roads = L.geoJSON(null,{
//     pane:'roads',
//     style:styleLines,
//     snapIgnore: true,
//     pmIgnore:true
// });

// Load data from local geojson and initialize the road layer
const roadColorGen = roadColorGenerator();
$.getJSON(url_roads, function(data) {
  roadData = data;
  // roads.addData(data);
  let filteredData = initFilteredRoadDataObject();
  filteredData = filterRoadData(data, filteredData);
  addFilteredRoadData(filteredData);
  map.addLayer(roads);
  filterRoads();
});


/************** POINTS ***************/
/* Top-level layer */
const points = L.layerGroup([], { pane: 'points', title: 'All points'});
/* Top-level layers */
// Inner star system layer group with coordinates
const innerStarSystemObjectLG = L.layerGroup([], { pane: 'points', title: 'Inner star system objects' });
// Star system layer group with coordinates
const starSystemLG = L.layerGroup([], { pane: 'points', title: 'Star systems' });
// Inner main object(s) as star system (display star system coordinates with main inner body name, type, url ...)
const innerMainObjectAsStarSystemLG = L.layerGroup([], { pane: 'points', title: 'Inner main objects as star systems' });
// Other objects
const otherObjectLG = L.layerGroup([], { pane: 'points', title: 'Other objects' });

/* 1st level sub layers */
// Inner star system layer group with coordinates
const innerStarSystemObjectCanonOnlyLG = L.layerGroup([], { pane: 'points', title: 'Inner star system objects (canon only)' });
const innerStarSystemObjectLegendsOnlyLG = L.layerGroup([], { pane: 'points', title: 'Inner star system objects (legends only)' });
const innerStarSystemObjectCanonAndLegendsLG = L.layerGroup([], { pane: 'points', title: 'Inner star system objects (canon/legends)'});
const innerStarSystemObjectUnlicencedLG = L.layerGroup([], { pane: 'points', title: 'Inner star system objects (unlicensed)'});
// Star system layer group with coordinates
const starSystemCanonOnlyLG = L.layerGroup([], { pane: 'points', title: 'Star systems (canon only)'});
const starSystemLegendsOnlyLG = L.layerGroup([], { pane: 'points', title: 'Star systems (legends only)'});
const starSystemCanonAndLegendsLG = L.layerGroup([], { pane: 'points', title: 'Star systems (canon/legends)'});
const starSystemUnlicencedLG = L.layerGroup([], { pane: 'points', title: 'Star systems (unlicensed)'});
// Inner main object(s) as star system (display star system coordinates with main inner body name, type, url ...)
const innerMainObjectAsStarSystemCanonOnlyLG = L.layerGroup([], { pane: 'points', title: 'Inner main objects as star systems (canon only)'});
const innerMainObjectAsStarSystemLegendsOnlyLG = L.layerGroup([], { pane: 'points', title: 'Inner main objects as star systems (legends only)'});
const innerMainObjectAsStarSystemCanonAndLegendsLG = L.layerGroup([], { pane: 'points', title: 'Inner main objects as star systems (canon/legends)'});
const innerMainObjectAsStarSystemUnlicencedLG = L.layerGroup([], { pane: 'points', title: 'Inner main objects as star systems (unlicensed)'});
// Other objects
const otherObjectCanonOnlyLG = L.layerGroup([], { pane: 'points', title: 'Other objects (canon only)'});
const otherObjectLegendsOnlyLG = L.layerGroup([], { pane: 'points', title: 'Other objects (legends only)'});
const otherObjectCanonAndLegendsLG = L.layerGroup([], { pane: 'points', title: 'Other objects (canon/legends)'});
const otherObjectUnlicencedLG = L.layerGroup([], { pane: 'points', title: 'Other objects (unlicensed)'});

/* Add sublayers to main layer */
points.addLayer(innerStarSystemObjectLG);
points.addLayer(starSystemLG);
points.addLayer(innerMainObjectAsStarSystemLG);
points.addLayer(otherObjectLG);
/* Add subLayers to layers */
// Non star system layer group with coordinates
innerStarSystemObjectLG.addLayer(innerStarSystemObjectCanonOnlyLG);
innerStarSystemObjectLG.addLayer(innerStarSystemObjectLegendsOnlyLG);
innerStarSystemObjectLG.addLayer(innerStarSystemObjectCanonAndLegendsLG);
innerStarSystemObjectLG.addLayer(innerStarSystemObjectUnlicencedLG);
// Star system layer group with coordinates
starSystemLG.addLayer(starSystemCanonOnlyLG);
starSystemLG.addLayer(starSystemLegendsOnlyLG);
starSystemLG.addLayer(starSystemCanonAndLegendsLG);
starSystemLG.addLayer(starSystemUnlicencedLG);
// Inner main object(s) as star system (display star system coordinates with main inner body name, type, url ...)
innerMainObjectAsStarSystemLG.addLayer(innerMainObjectAsStarSystemCanonOnlyLG);
innerMainObjectAsStarSystemLG.addLayer(innerMainObjectAsStarSystemLegendsOnlyLG);
innerMainObjectAsStarSystemLG.addLayer(innerMainObjectAsStarSystemCanonAndLegendsLG);
innerMainObjectAsStarSystemLG.addLayer(innerMainObjectAsStarSystemUnlicencedLG);
// Other objects
otherObjectLG.addLayer(otherObjectCanonOnlyLG);
otherObjectLG.addLayer(otherObjectLegendsOnlyLG);
otherObjectLG.addLayer(otherObjectCanonAndLegendsLG);
otherObjectLG.addLayer(otherObjectUnlicencedLG);

/* Zoom level sub layers */
// Non star system layer group with coordinates
initializeZoomLayerPointGroup(innerStarSystemObjectCanonOnlyLG);
initializeZoomLayerPointGroup(innerStarSystemObjectLegendsOnlyLG);
initializeZoomLayerPointGroup(innerStarSystemObjectCanonAndLegendsLG);
initializeZoomLayerPointGroup(innerStarSystemObjectUnlicencedLG);
// Star system layer group with coordinates
initializeZoomLayerPointGroup(starSystemCanonOnlyLG);
initializeZoomLayerPointGroup(starSystemLegendsOnlyLG);
initializeZoomLayerPointGroup(starSystemCanonAndLegendsLG);
initializeZoomLayerPointGroup(starSystemUnlicencedLG);
// Inner main object(s) as star system (display star system coordinates with main inner body name, type, url ...)
initializeZoomLayerPointGroup(innerMainObjectAsStarSystemCanonOnlyLG);
initializeZoomLayerPointGroup(innerMainObjectAsStarSystemLegendsOnlyLG);
initializeZoomLayerPointGroup(innerMainObjectAsStarSystemCanonAndLegendsLG);
initializeZoomLayerPointGroup(innerMainObjectAsStarSystemUnlicencedLG);
// Other objects
initializeZoomLayerPointGroup(otherObjectCanonOnlyLG);
initializeZoomLayerPointGroup(otherObjectLegendsOnlyLG);
initializeZoomLayerPointGroup(otherObjectCanonAndLegendsLG);
initializeZoomLayerPointGroup(otherObjectUnlicencedLG);

// Functions

/**
 * Initialize layer group for zoom
 */
function initializeZoomLayerPointGroup(zoomLayerGroup) {
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
  let filteredData = { "innerStarSystemObjects": {}, "starSystemObjects": {}, "innerMainObjectAsStarSystems":{}, "otherObjects": {} };
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
 * Filter and add Point data to GeoJSON filtered data
 * 
 * @param {*} pointData geoJSON feature collection for points
 */
function filterPointData(pointData, filteredData) {
  // let childrenCount = 0;
  let starSystemFeatureWithCoordinatesStore = [];

  pointData.features.forEach(function(feature) {
    // console.log(feature);
    const fp = feature.properties;
    /* Ignore object list */
    if(OBJECT_TYPES_TO_IGNORE.find((typeToIgnore) => typeToIgnore === fp.TYPE)) {
      if(debug) {
        console.log(`Ignoring ${fp.NAME} feature as point`);
      }
      return;
    };
    // Create a link to children in feature properties
    const parentObjectFeature = getParentObjectFeature(pointData.features, feature);
    if(parentObjectFeature) {
      // console.log(`Creating link to parent in feature properties for object ${fp.NAME}`);
      // console.log(++childrenCount);
      if(parentObjectFeature.properties.childrenFeatures === undefined) {
        parentObjectFeature.properties.childrenFeatures = [];
      }
      parentObjectFeature.properties.childrenFeatures.push(feature);
      // console.log(parentObjectFeature.properties.childrenFeatures);
      
    }
    /* Object category */
    // Star systems with coordinates
    if(fp.TYPE.toLowerCase() === "star system") {
      /* We add to layer only systems with coordinates */
      if(fp.X_COORD && fp.X_COORD !== "" && fp.Y_COORD && fp.Y_COORD !== "") {
        // Storing star system for later use as inner main object display as star system
        starSystemFeatureWithCoordinatesStore.push(feature);
        /* Add star system hierarchy */
        feature.properties.starSystemHierarchy = mapStarSystemHierarchyBuilder(pointData, feature.properties); // Performance to improve (if possible)
        // console.log(feature.properties.starSystemHierarchy);
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
      let starSystemCoordinates = getParentStarSystemCoordinatesIfAstroObjectFeatureIsInAStarSystem(pointData.features, fp);
      // We take into account only star systems with coordinates (That's why star system must have coordinates in data sheet)
      if(starSystemCoordinates.length > 0) {
        // Object have not its own coordinates, we add star system's ones
        if(!fp.X_COORD || fp.X_COORD === "" || !fp.Y_COORD || fp.Y_COORD === "") {
          // feature.properties.X_COORD = starSystemCoordinates[0];
          // feature.properties.Y_COORD = starSystemCoordinates[1];
          feature.geometry.coordinates = starSystemCoordinates.map((coord) => parseFloat(coord));
          feature.geometry.type = "Point";
        }
        // Add object to the inner star system object's zoom level filtered feature collection at object zoom level
        if(fp.X_COORD && fp.X_COORD !== "" && fp.Y_COORD && fp.Y_COORD !== "") {
          /* Continuity */
          if(fp.LEGENDS.toLowerCase() === "yes") {
            if(fp.CANON.toLowerCase() === "yes") {
              // CANON and LEGENDS
              addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemObjects.canonAndLegends, feature, mapStarSystemMaxZoomLevel + 1);
            } else {
              // LEGENDS only
              addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemObjects.legends, feature, mapStarSystemMaxZoomLevel + 1);
            }
          } else if(fp.CANON.toLowerCase() === "yes") {
            // CANON only
            addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemObjects.canon, feature, mapStarSystemMaxZoomLevel + 1);
          } else if (fp.UNLICENSED.toLowerCase() === "yes") {
            // UNLICENSED
            addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemObjects.unlicensed, feature, mapStarSystemMaxZoomLevel + 1);
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
  /* Create feature collection for inner main objects as star system */
  createInnerSystemMainObjectAsStarSystemFeatureAndAddItTofilteredData(starSystemFeatureWithCoordinatesStore, filteredData.innerMainObjectAsStarSystems);
  // console.log(filteredData);
  const styles = ['color: black', 'background: lightgreen','font-weight: bold'].join(';');
  console.log("%c[INIT] Point Data filtered", styles);
  return filteredData;
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

/**
 * Search for a parent object feature in the feature collection by ID and return it
 * 
 * @param {*} featureCollection 
 * @param {*} objectFeature 
 * @returns {*} Feature of parent object or null if not found
 */
function getParentObjectFeature(featureCollection, objectFeature) {
  // Object feature property undefined or null, parent ID undefined, null or empty
  if(!objectFeature.properties || !objectFeature.properties.PARENT_ID || objectFeature.properties.PARENT_ID === "") {
    return null;
  }
  return featureCollection.find(feature => feature.properties.ID === objectFeature.properties.PARENT_ID);
}

function createInnerSystemMainObjectAsStarSystemFeatureAndAddItTofilteredData(starSystemFeatureCollection, innerMainObjectAsStarSystemFilteredData) {
  for (const feature of starSystemFeatureCollection) {
    // Deep copy object
    const innerMainObjectAsStarSystemFeature = JSON.parse(JSON.stringify(feature));
    // Add marker to avoid search as inner system object
    innerMainObjectAsStarSystemFeature.properties.innerObjectAsStarSystem = true;
    const fp = feature.properties;
    // Change properties function of inner objects
    const innerSystemMainObjectFeatureProperties = getInnerSystemMainObjectFeatureProperties(innerMainObjectAsStarSystemFeature);
    // Replace properties
    for (const key in innerSystemMainObjectFeatureProperties) {
      if (Object.prototype.hasOwnProperty.call(innerSystemMainObjectFeatureProperties, key)) {
        // Add new properties only if not empty
        if(innerSystemMainObjectFeatureProperties[key].length > 0) {
          innerMainObjectAsStarSystemFeature.properties[key] = innerSystemMainObjectFeatureProperties[key].join(" & ");
        }
      }
    }
    // console.log(innerMainObjectAsStarSystemFeature);
    
    // Create Inner main object(s) as star system feature
    if(fp.LEGENDS.toLowerCase() === "yes") {
      if(fp.CANON.toLowerCase() === "yes") {
        // CANON and LEGENDS
        addDataToZoomLevelFilteredFeatureCollection(innerMainObjectAsStarSystemFilteredData.canonAndLegends, innerMainObjectAsStarSystemFeature);// Main inner object(s) as star system
      } else {
        // LEGENDS only
        addDataToZoomLevelFilteredFeatureCollection(innerMainObjectAsStarSystemFilteredData.legends, innerMainObjectAsStarSystemFeature);// Main inner object(s) as star system
      }
    } else if(fp.CANON.toLowerCase() === "yes") {
      // CANON only
      addDataToZoomLevelFilteredFeatureCollection(innerMainObjectAsStarSystemFilteredData.canon, innerMainObjectAsStarSystemFeature);// Main inner object(s) as star system
    } else if (fp.UNLICENSED.toLowerCase() === "yes") {
      // UNLICENSED
      addDataToZoomLevelFilteredFeatureCollection(innerMainObjectAsStarSystemFilteredData.unlicensed, innerMainObjectAsStarSystemFeature);// Main inner object(s) as star system
    }
    // TODO Remove children properties from feature to lighten feature collection
  }
}

/**
 * Format/alter parent object feature properties with main children feature properties
 * 
 * @param {*} innerMainObjectAsStarSystemFeature initial feature object with properties.children key
 * @param {boolean} [firstChild=true] If it's the first child (default: true) we add its ID to the feature
 * @param {boolean} [onlyCapital=false] If "IS_CAPITAL" feature property is found on any children
 * @returns feature properties
 */
function getInnerSystemMainObjectFeatureProperties(innerMainObjectAsStarSystemFeature, firstChild = true, onlyCapital = false) {
  const sfp = innerMainObjectAsStarSystemFeature.properties;
  let newProperties = {
    NAME: [],
    TYPE: [],
    ["URLS (sources)"]: [],
  };
  // Only first child
  if(firstChild) {
    newProperties.ID = [generateUUIDv7()], // ID need to remain unique
    newProperties.PARENT_ID = [sfp.ID], // Need to change this property to find parent object on map
    newProperties.PARENT = [sfp.NAME+" < "+ sfp.PARENT];
    firstChild = false;
  }
  // Searching for main objects
  if(sfp.childrenFeatures && sfp.childrenFeatures.length > 0) {
    for (const child of sfp.childrenFeatures) {
      const cfp = child.properties;
      if(cfp.IS_CAPITAL.toLowerCase() === "yes") {
        onlyCapital = true;
      }
      if(onlyCapital) { // Only "capital" children are selected
        if(cfp.IS_CAPITAL.toLowerCase() === "yes") {
          newProperties.NAME.push(cfp["ALT_NAMES (/ separated)"] && cfp["ALT_NAMES (/ separated)"] !== "" ?
            cfp.NAME + "/" + cfp["ALT_NAMES (/ separated)"] : cfp.NAME
          );
          newProperties.TYPE.push(cfp.TYPE_CLASSES || cfp.TYPE_CLASSES !== "" ? 
            cfp.TYPE_CLASSES + " (" + cfp.TYPE + ")" : cfp.TYPE
          );
          if(cfp["URLS (sources)"] && cfp["URLS (sources)"] !== "") {
            newProperties["URLS (sources)"].push(cfp["URLS (sources)"]);
          }
        }
      } else {
        if(sfp.childrenFeatures.length === 1 && cfp.childrenFeatures === undefined) { // Object is not capital, is alone and has no child
          newProperties.NAME.push(cfp["ALT_NAMES (/ separated)"] && cfp["ALT_NAMES (/ separated)"] !== "" ?
            cfp.NAME + "/" + cfp["ALT_NAMES (/ separated)"] : cfp.NAME
          );
          newProperties.TYPE.push(cfp.TYPE_CLASSES || cfp.TYPE_CLASSES !== "" ? 
            cfp.TYPE_CLASSES + " (" + cfp.TYPE + ")" : cfp.TYPE
          );
          if(cfp["URLS (sources)"] && cfp["URLS (sources)"] !== "") {
            newProperties["URLS (sources)"].push(cfp["URLS (sources)"]);
          }
        }
      }
      // if(newProperties["URLS (sources)"].length > 0) {
      //   console.log("Found URLs:", newProperties["URLS (sources)"]);
      // }
      // Add childrenFeatures of child properties to new properties
      const childrenNewProperties = getInnerSystemMainObjectFeatureProperties(child, firstChild, onlyCapital);
      // console.log("before:");
      // console.log("PARENT:", sfp.NAME, "CURRENT:", cfp.NAME);
      // console.log(newProperties);
      // console.log(childrenNewProperties);
      // console.log("after");
      newProperties.NAME = [...newProperties.NAME, ...childrenNewProperties.NAME]; // "..." spread operator to merge small arrays
      newProperties.TYPE = [...newProperties.TYPE, ...childrenNewProperties.TYPE]; // "..." spread operator to merge small arrays
      if(childrenNewProperties["URLS (sources)"].length>0) {
        newProperties["URLS (sources)"] = [(newProperties["URLS (sources)"].concat(childrenNewProperties["URLS (sources)"])).join(",")];
      }
      // newProperties["URLS (sources)"] = [([...newProperties["URLS (sources)"],...childrenNewProperties["URLS (sources)"]]).join(",")]; // "..." spread operator to merge small arrays
    }
  }
  // if(debug && newProperties.NAME.length > 0) {
  //   console.log(newProperties);
  // }
  return newProperties;
}



/**
 * Concatenate all star system children objects by hierarchy level
 * 
 * @param {*} pointData data GeoJSON feature collection for points
 * @param {*} featureProperty feature properties of star system
 * @returns {Array} Array of star system children objects
 */
function mapStarSystemHierarchyBuilder(pointData, featureProperty) {
  // Find all star system children objects by hierarchy level
  let hierarchy = [];
  const children = pointData.features.filter(feature => feature.properties.PARENT_ID === featureProperty.ID);
  children.forEach(childrenFeature => {
    const cFp = childrenFeature.properties;
    let subType = cFp["TYPE_CLASSES"]!== "" ? " - " + cFp["TYPE_CLASSES"] : "";
    hierarchy.push(`${cFp.HUMAN_READABLE_NAME} (${cFp.TYPE}${subType})`);
    hierarchy = hierarchy.concat(mapStarSystemHierarchyBuilder(pointData, cFp));
  });
  // if(hierarchy !== "") { 
  //   console.log(hierarchy)  
  // };
  return hierarchy;
}


// /**
//  * Create feature for inner star system main object(s) as if it were star system itself (for display purposes)
//  * 
//  * @param {*} starSystemFeature feature of star system
//  * @param {*} pointData data GeoJSON feature collection for points
//  * @returns feature for inner star system main object(s) as if it were star system itself
//  */
// function createFeatureForInnerMainObjectAsStarSystem(pointData, starSystemFeature) {
//   // Duplicate star system feature
//   const innerStarSystemMainObjectAsStarSystemFeature = JSON.parse(JSON.stringify(pointData, starSystemFeature));
//   // Find star system main objects
//   const innerStarSystemMainObjectFeatures = findChildrenMainObjectFeatures(pointData, starSystemFeature.properties.ID);
//   console.log(innerStarSystemMainObjectFeatures);
//   // Add star system inner main object(s) properties
//   // innerStarSystemMainObjectAsStarSystemFeature.properties.NAME = starSystemFeature.properties.NAME;
//   // innerStarSystemMainObjectAsStarSystemFeature.properties.ALT_NAMES = "";
//   // innerStarSystemMainObjectAsStarSystemFeature.properties.TYPE = "Star System";
//   // innerStarSystemMainObjectAsStarSystemFeature.properties.TYPE_CLASSES = "";
//   return innerStarSystemMainObjectAsStarSystemFeature;
// }

function findChildrenMainObjectFeatures(pointData, parentId) {
  // Find all star system children on any levels
  const children = pointData.features.filter(feature => feature.properties.PARENT_ID === parentId);
  let mainChildren = [];
  for (const child of children) {
    // If child is capital or only child, add it and all its children recursively
    if(child.properties.IS_CAPITAL.toLowerCase() === "yes" || children.length === 1) {
      mainChildren.push(child);
      // mainChildren.concat(findChildrenMainObjectFeatures(pointData, child.properties.ID));
      console.log(mainChildren);        
    }
  }
  return mainChildren;
}

/**
 * Add feature to right zoom level feature collection
 * 
 * @param {*} FeatureCollections Parent of zoom level feature collection
 * @param {*} feature From unfiltered featurecollection
 * @param {number|null} [forcedFeatureZoomLevelIndex] force feature collection to be added to this zoom level; Default null
 */
function addDataToZoomLevelFilteredFeatureCollection(FeatureCollections, feature, forcedFeatureZoomLevelIndex = null) {
  // console.log(feature);
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
    innerStarSystemObjectCanonOnlyLG.getLayers()[index].addData(filteredData.innerStarSystemObjects.canon[index]);
    innerStarSystemObjectLegendsOnlyLG.getLayers()[index].addData(filteredData.innerStarSystemObjects.legends[index]);
    innerStarSystemObjectCanonAndLegendsLG.getLayers()[index].addData(filteredData.innerStarSystemObjects.canonAndLegends[index]);
    innerStarSystemObjectUnlicencedLG.getLayers()[index].addData(filteredData.innerStarSystemObjects.unlicensed[index]);
    // Star system objects
    starSystemCanonOnlyLG.getLayers()[index].addData(filteredData.starSystemObjects.canon[index]);
    starSystemLegendsOnlyLG.getLayers()[index].addData(filteredData.starSystemObjects.legends[index]);
    starSystemCanonAndLegendsLG.getLayers()[index].addData(filteredData.starSystemObjects.canonAndLegends[index]);
    starSystemUnlicencedLG.getLayers()[index].addData(filteredData.starSystemObjects.unlicensed[index]);
    // Inner star system objects as star systems
    innerMainObjectAsStarSystemCanonOnlyLG.getLayers()[index].addData(filteredData.innerMainObjectAsStarSystems.canon[index]);
    innerMainObjectAsStarSystemLegendsOnlyLG.getLayers()[index].addData(filteredData.innerMainObjectAsStarSystems.legends[index]);
    innerMainObjectAsStarSystemCanonAndLegendsLG.getLayers()[index].addData(filteredData.innerMainObjectAsStarSystems.canonAndLegends[index]);
    innerMainObjectAsStarSystemUnlicencedLG.getLayers()[index].addData(filteredData.innerMainObjectAsStarSystems.unlicensed[index]);
    // Star system objects as star systems as star systems as star systems
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
  if(debug) {
    console.log("-------------- STARTS FILTERING POINTS -----------------");
  }
  // Check point layer display option before filtering
  if(!userOptions.display.points) {
    map.removeLayer(points);
  } else {
    /** Inner star system objects **/
    if(map.getZoom() > mapStarSystemMaxZoomLevel) { // Display only inner objects at max star system zoom level
      if(debug) {
        console.log("(+) Inner objects");
      }
      map.removeLayer(starSystemLG);
      map.removeLayer(innerMainObjectAsStarSystemLG);
      if(debug && map.getZoom() > mapStarSystemMaxZoomLevel) {
        console.log("[ ] Star system objects layer group");
        console.log("[ ] Inner objects as star system objects layer group");
      }
      /* Continuity */
      // Unlicensed
      if(userOptions.continuity.unlicensed) {
        if(debug) {
          console.log("(+) unlicensed");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(innerStarSystemObjectUnlicencedLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Inner objects - unlicensed - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(innerStarSystemObjectUnlicencedLG);
          if(debug) {
            console.log("[X] Inner objects - unlicensed - filtered zoom level");
          }
        }
        // Adding inner objects once all sub layers are filtered
        map.addLayer(innerStarSystemObjectUnlicencedLG);
        if(debug) {
          console.log("[X] Inner objects layer group - unlicensed");
        }
      } else {
        map.removeLayer(innerStarSystemObjectUnlicencedLG);
        if(debug) {
          console.log("[ ] Inner objects layer group - unlicensed");
        }
      }
      // Legends
      if (userOptions.continuity.legends) {
        if(debug) {
          console.log("(+) legends");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(innerStarSystemObjectLegendsOnlyLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Inner objects - legends - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(innerStarSystemObjectLegendsOnlyLG);
          if(debug) {
            console.log("[X] Inner objects - legends - filtered zoom level");
          }
        }
        // Adding legends inner objects once all sub layers are filtered
        map.addLayer(innerStarSystemObjectLegendsOnlyLG);
        if(debug) {
          console.log("[X] Inner objects layer group - legends");
        }
      } else {
        map.removeLayer(innerStarSystemObjectLegendsOnlyLG);
        if(debug) {
          console.log("[ ] Inner objects layer group - legends");
        }
      }
      // Canon
      if (userOptions.continuity.canon) {
        if(debug) {
          console.log("(+) canon");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(innerStarSystemObjectCanonOnlyLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Inner objects - canon - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(innerStarSystemObjectCanonOnlyLG);
          if(debug) {
            console.log("[X] Inner objects - canon - filtered zoom level");
          }
        }
        // Adding canon inner objects once all sub layers are filtered
        map.addLayer(innerStarSystemObjectCanonOnlyLG);
        if(debug) {
          console.log("[X] Inner objects layer group - canon");
        }
      } else {
        map.removeLayer(innerStarSystemObjectCanonOnlyLG);
        if(debug) {
          console.log("[ ] Inner objects layer group - canon");
        }
      }
      // Canon or Legends
      if (userOptions.continuity.legends || userOptions.continuity.canon) {
        if(debug) {
          console.log("(+) canon/legends");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(innerStarSystemObjectCanonAndLegendsLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Inner objects - canon/legends - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(innerStarSystemObjectCanonAndLegendsLG);
          if(debug) {
            console.log("[X] Inner objects - canon/legends - filtered zoom level");
          }
        }
        // Adding canon/legends inner objects once all sub layers are filtered
        map.addLayer(innerStarSystemObjectCanonAndLegendsLG);
        if(debug) {
          console.log("[X] Inner objects layer group - canon/legends");
        }
      } else {
        map.removeLayer(innerStarSystemObjectCanonAndLegendsLG);
        if(debug) {
          console.log("[ ] Inner objects layer group - canon/legends");
        }
      }
      // Adding inner objects once all sub layers are filtered
      if(debug) {
        console.log("[X] Inner objects layer group");
      }
      map.addLayer(innerStarSystemObjectLG);

    } else if(userOptions.display.starSystems) {
      /** Star system objects **/
      if(debug) {
        console.log("(+) Star systems");
      }
      map.removeLayer(innerStarSystemObjectLG);
      map.removeLayer(innerMainObjectAsStarSystemLG);
      if(debug) {
        console.log("[ ] Inner objects layer group");
        console.log("[ ] Inner objects as star system objects layer group");
      }
      /* Continuity */
      // Unlicensed
      if(userOptions.continuity.unlicensed) {
        if(debug) {
          console.log("(+) unlicensed");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(starSystemUnlicencedLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Star system objects - unlicensed - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(starSystemUnlicencedLG);
          if(debug) {
            console.log("[X] Star system objects - unlicensed - filtered zoom level");
          }
        }
        // Adding inner objects once all sub layers are filtered
        map.addLayer(starSystemUnlicencedLG);
        if(debug) {
          console.log("[X] Star system objects layer group - unlicensed");
        }
      } else {
        map.removeLayer(starSystemUnlicencedLG);
        if(debug) {
          console.log("[ ] Star system objects layer group - unlicensed");
        }
      }
      // Legends
      if (userOptions.continuity.legends) {
        if(debug) {
          console.log("(+) legends");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(starSystemLegendsOnlyLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Star system objects - legends - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(starSystemLegendsOnlyLG);
          if(debug) {
            console.log("[X] Star system objects - legends - filtered zoom level");
          }
        }
        // Adding legends inner objects once all sub layers are filtered
        map.addLayer(starSystemLegendsOnlyLG);
        if(debug) {
          console.log("[X] Star system objects layer group - legends");
        }
      } else {
        map.removeLayer(starSystemLegendsOnlyLG);
        if(debug) {
          console.log("[ ] Star system objects layer group - legends");
        }
      }
      // Canon
      if (userOptions.continuity.canon) {
        if(debug) {
          console.log("(+) canon");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(starSystemCanonOnlyLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Star system - canon - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(starSystemCanonOnlyLG);
          if(debug) {
            console.log("[X] Star system - canon - filtered zoom level");
          }
        }
        // Adding canon inner objects once all sub layers are filtered
        map.addLayer(starSystemCanonOnlyLG);
        if(debug) {
          console.log("[X] Star system objects layer group - canon");
        }
      } else {
        map.removeLayer(starSystemCanonOnlyLG);
        if(debug) {
          console.log("[ ] Star system layer group - canon");
        }
      }
      // Canon or Legends
      if (userOptions.continuity.legends || userOptions.continuity.canon) {
        if(debug) {
          console.log("(+) canon/legends");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(starSystemCanonAndLegendsLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Star system - canon/legends - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(starSystemCanonAndLegendsLG);
          if(debug) {
            console.log("[X] Star system - canon/legends - filtered zoom level");
          }
        }
        // Adding canon/legends inner objects once all sub layers are filtered
        map.addLayer(starSystemCanonAndLegendsLG);
        if(debug) {
          console.log("[X] Star system layer group - canon/legends");
        }
        
      } else {
        map.removeLayer(starSystemCanonAndLegendsLG);
        if(debug) {
          console.log("[ ] Star system layer group - canon/legends");
        }
      }
      // Adding star system objects once all sub layers are filtered
      map.addLayer(starSystemLG);
      if(debug) {
        console.log("[X] Star system objects layer group");
      }
    } else { 
      /** Display inner main object data on star system location **/
      if(debug) {
        console.log("(+) Inner main objects as star systems");
      }
      map.removeLayer(innerStarSystemObjectLG);
      map.removeLayer(starSystemLG);
      if(debug) {
        console.log("[ ] Inner objects layer group");
        console.log("[ ] Star system objects layer group");
      }
      /* Continuity */
      // Unlicensed
      if(userOptions.continuity.unlicensed) {
        if(debug) {
          console.log("(+) unlicensed");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(innerMainObjectAsStarSystemUnlicencedLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Inner main objects as star systems - unlicensed - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(innerMainObjectAsStarSystemUnlicencedLG);
          if(debug) {
            console.log("[X] Inner main objects as star systems - unlicensed - filtered zoom level");
          }
        }
        // Adding inner main objects as star system once all sub layers are filtered
        map.addLayer(innerMainObjectAsStarSystemUnlicencedLG);
        if(debug) {
          console.log("[X] Inner main objects as star systems layer group - unlicensed");
        }
      } else {
        map.removeLayer(innerMainObjectAsStarSystemUnlicencedLG);
        if(debug) {
          console.log("[ ] Inner main objects as star systems layer group - unlicensed");
        }
      }
      // Legends
      if (userOptions.continuity.legends) {
        if(debug) {
          console.log("(+) legends");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(innerMainObjectAsStarSystemLegendsOnlyLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Inner main objects as star systems - legends - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(innerMainObjectAsStarSystemLegendsOnlyLG);
          if(debug) {
            console.log("[X] Inner main objects as star systems - legends - filtered zoom level");
          }
        }
        // Adding legends inner main objects as star systems once all sub layers are filtered
        map.addLayer(innerMainObjectAsStarSystemLegendsOnlyLG);
        if(debug) {
          console.log("[X] Inner main objects as star systems layer group - legends");
        }
      } else {
        map.removeLayer(innerMainObjectAsStarSystemLegendsOnlyLG);
        if(debug) {
          console.log("[ ] Inner main objects as star systems layer group - legends");
        }
      }
      // Canon
      if (userOptions.continuity.canon) {
        if(debug) {
          console.log("(+) canon");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(innerMainObjectAsStarSystemCanonOnlyLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Star system - canon - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(innerMainObjectAsStarSystemCanonOnlyLG);
          if(debug) {
            console.log("[X] Star system - canon - filtered zoom level");
          }
        }
        // Adding canon inner main objects as star systems once all sub layers are filtered
        map.addLayer(innerMainObjectAsStarSystemCanonOnlyLG);
        if(debug) {
          console.log("[X] Inner main objects as star systems layer group - canon");
        }
      } else {
        map.removeLayer(innerMainObjectAsStarSystemCanonOnlyLG);
        if(debug) {
          console.log("[ ] Inner main objects as star systems layer group - canon");
        }
      }
      // Canon or Legends
      if (userOptions.continuity.legends || userOptions.continuity.canon) {
        if(debug) {
          console.log("(+) canon/legends");
        }
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          if(debug) {
            console.log("(+) Ignore zoom restriction");
          }
          // Ignore zoom restriction (show all objects)
          filterHighEndLayersByZoomLevel(innerMainObjectAsStarSystemCanonAndLegendsLG, mapTotalZoomLevel);
          if(debug) {
            console.log("[X] Inner main objects as star systems layer group - canon/legends - all zoom level");
          }
        } else {
          filterHighEndLayersByZoomLevel(innerMainObjectAsStarSystemCanonAndLegendsLG);
          if(debug) {
            console.log("[X] Inner main objects as star systems layer group - canon/legends - filtered zoom level");
          }
        }
        // Adding canon/legends inner main objects as star systems once all sub layers are filtered
        map.addLayer(innerMainObjectAsStarSystemCanonAndLegendsLG);
        if(debug) {
          console.log("[X] Inner main objects as star systems layer group - canon/legends");
        }
        
      } else {
        map.removeLayer(innerMainObjectAsStarSystemCanonAndLegendsLG);
        if(debug) {
          console.log("[ ] Inner main objects as star systems layer group - canon/legends");
        }
      }
      // Adding inner main objects as star systems objects once all sub layers are filtered
      map.addLayer(innerMainObjectAsStarSystemLG);
      if(debug) {
        console.log("[X] Inner main objects as star systems layer group");
      }
    }

    /** Other objects **/
    if(debug) {
      console.log("(+) Other objects");
    }
    /* Continuity */
    // Unlicensed
    if(userOptions.continuity.unlicensed) {
      if(debug) {
        console.log("(+) unlicensed");
      }
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        if(debug) {
          console.log("(+) Ignore zoom restriction");
        }
        // Ignore zoom restriction (show all objects)
        filterHighEndLayersByZoomLevel(otherObjectUnlicencedLG, mapTotalZoomLevel);
        if(debug) {
          console.log("[X] Other objects - unlicensed - all zoom level");
        }
      } else {
        filterHighEndLayersByZoomLevel(otherObjectUnlicencedLG);
        if(debug) {
          console.log("[X] Other objects - unlicensed - filtered zoom level");
        }
      }
      // Adding inner objects once all sub layers are filtered
      map.addLayer(otherObjectUnlicencedLG);
      if(debug) {
        console.log("[X] Other objects layer group - unlicensed");
      }
    } else {
      map.removeLayer(otherObjectUnlicencedLG);
      if(debug) {
        console.log("[ ] Other objects layer group - unlicensed");
      }
    }
    // Legends
    if (userOptions.continuity.legends) {
      if(debug) {
        console.log("(+) legends");
      }
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        if(debug) {
          console.log("(+) Ignore zoom restriction");
        }
        // Ignore zoom restriction (show all objects)
        filterHighEndLayersByZoomLevel(otherObjectLegendsOnlyLG, mapTotalZoomLevel);
        if(debug) {
          console.log("[X] Other objects - legends - all zoom level");
        }
      } else {
        filterHighEndLayersByZoomLevel(otherObjectLegendsOnlyLG);
        if(debug) {
          console.log("[X] Other objects - legends - filtered zoom level");
        }
      }
      // Adding legends inner objects once all sub layers are filtered
      map.addLayer(otherObjectLegendsOnlyLG);
      if(debug) {
        console.log("[X] Other objects layer group - legends");
      }
    } else {
      map.removeLayer(otherObjectLegendsOnlyLG);
      if(debug) {
        console.log("[ ] Other objects layer group - legends");
      }
    }
    // Canon
    if (userOptions.continuity.canon) {
      if(debug) {
        console.log("(+) canon");
      }
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        if(debug) {
          console.log("(+) Ignore zoom restriction");
        }
        // Ignore zoom restriction (show all objects)
        filterHighEndLayersByZoomLevel(otherObjectCanonOnlyLG, mapTotalZoomLevel);
        if(debug) {
          console.log("[X] Other objects - canon - all zoom level");
        }
      } else {
        filterHighEndLayersByZoomLevel(otherObjectCanonOnlyLG);
        if(debug) {
          console.log("[X] Other objects - canon - filtered zoom level");
        }
      }
      // Adding canon inner objects once all sub layers are filtered
      map.addLayer(otherObjectCanonOnlyLG);
      if(debug) {
        console.log("[X] Other objects layer group - canon");
      }
    } else {
      map.removeLayer(otherObjectCanonOnlyLG);
      if(debug) {
        console.log("[ ] Other objects layer group - canon");
      }
    }
    // Canon or Legends
    if (userOptions.continuity.legends || userOptions.continuity.canon) {
      if(debug) {
        console.log("(+) canon/legends");
      }
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        if(debug) {
          console.log("(+) Ignore zoom restriction");
        }
        // Ignore zoom restriction (show all objects)
        filterHighEndLayersByZoomLevel(otherObjectCanonAndLegendsLG, mapTotalZoomLevel);
        if(debug) {
          console.log("[X] Other objects - canon/legends - all zoom level");
        }
      } else {
        filterHighEndLayersByZoomLevel(otherObjectCanonAndLegendsLG);
        if(debug) {
          console.log("[X] Other objects - canon/legends - filtered zoom level");
        }
      }
      // Adding canon/legends inner objects once all sub layers are filtered
      map.addLayer(otherObjectCanonAndLegendsLG);
      if(debug) {
        console.log("[X] Other objects layer group - canon/legends");
      }
    } else {
      map.removeLayer(otherObjectCanonAndLegendsLG);
      if(debug) {
        console.log("[ ] Other objects layer group - canon/legends");
      }
    }
    // Adding other objects once all sub layers are filtered
    map.addLayer(otherObjectLG);
    if(debug) {
      console.log("[X] Other objects layer group");
    }
    map.addLayer(points);
  }
  console.log("-------------- ENDS FILTERING POINTS -----------------");
  const styles = ['color: black', 'background: lightgreen','font-weight: bold'].join(';');
  console.log("%c[RUN] Point displayed", styles);
}

/**
 * Display/hide layers function of zoom
 * 
 * @param {*} zoomParentGroupLayer parent zoom layer array
 * @param {*} mapZoom zoom level you want to filter. Default : current zoom level
 */
function filterHighEndLayersByZoomLevel(zoomParentGroupLayer, mapZoom = map.getZoom() - mapMinZoomLevel) {
  const groupLayers = zoomParentGroupLayer.getLayers();
  // console.log(groupLayers); 
  for (let index = 0; index < groupLayers.length; index++) {
    if(index <= mapZoom) {
      map.addLayer(groupLayers[index]);
      console.log("Adding layer: " + groupLayers[index].options.title + " ("+groupLayers[index].getLayers().length+" objects)");
    } else {
      map.removeLayer(groupLayers[index]);
      console.log("Removing layer: " + groupLayers[index].options.title + " ("+groupLayers[index].getLayers().length+" objects)");
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
  // TYPE (use of contain permits to overload type when displaying multiple objects at star system location)

  // Not displayed objects
  if (
    feature.properties.TYPE.includes("Galaxy") || feature.properties.TYPE.includes("Universe") || feature.properties.TYPE.includes("Region") || feature.properties.TYPE.includes("Sector")
    // feature.properties.TYPE === "Galaxy Cluster"  || feature.properties.TYPE === "Galaxy Group" || 
    // feature.properties.TYPE === "Universe" || feature.properties.TYPE === "Region" || feature.properties.TYPE === "Sector" ||
    // feature.properties.TYPE === "Galaxy"
  ) {
    return;

  // Cloud objects
  } else if(
    feature.properties.TYPE.includes("Nebula") || feature.properties.TYPE.includes("Interstellar Cloud") || feature.properties.TYPE.includes("Interstellar Matter")
    // feature.properties.TYPE === "Nebula" || feature.properties.TYPE === "Interstellar Cloud" || feature.properties.TYPE === "Interstellar Matter"
  ) {
    useIcon = true;
    iconParams[0] = "NEBULA";
  
  // Star clusters
  } else if (
    feature.properties.TYPE.includes("Star Cluster")
    // feature.properties.TYPE === "Star Cluster"
  ) {
    useIcon = true;
    iconParams[0] = "CLUSTER";

  // Black hole
  } else if (
    (feature.properties.TYPE.toLowerCase() === "star" && feature.properties.TYPE_CLASSES.toLowerCase() === "black hole")
    || feature.properties.TYPE.toLowerCase().includes("black hole")
  ) {
    useIcon = true;
    iconParams[0] = "BLACKHOLE";
  
  // System, star and planet-like types
  } else if(
    feature.properties.TYPE.includes("Star") || feature.properties.TYPE.includes("Planet") || feature.properties.TYPE.includes("Moon") ||
    feature.properties.TYPE.includes("Asteroid") || feature.properties.TYPE.includes("Comet") || feature.properties.TYPE.includes("Rings") ||
    feature.properties.TYPE.includes("Location")
      // feature.properties.TYPE === "Star System" || feature.properties.TYPE === "Star" || feature.properties.TYPE === "Star Barycenter" ||
      // feature.properties.TYPE === "Planet" || feature.properties.TYPE === "Planet Barycenter" || feature.properties.TYPE === "Rogue Planet" || feature.properties.TYPE === "Dwarf Planet" ||
      // feature.properties.TYPE === "Moon" || feature.properties.TYPE === "Rogue Moon" ||  feature.properties.TYPE === "Dwarf Moon" || 
      // feature.properties.TYPE === "Asteroid" || feature.properties.TYPE === "Asteroid Belt" || feature.properties.TYPE === "Asteroid Field" || feature.properties.TYPE === "Rogue Asteroid" ||
      // feature.properties.TYPE === "Comet" || feature.properties.TYPE === "Rogue Comet" || feature.properties.TYPE === "Comet Cluster" || feature.properties.TYPE === "Cometary Cloud" ||
      // feature.properties.TYPE === "Rings" || feature.properties.TYPE === "Location"
    ) {
    useIcon = true;
    iconParams[0] = "PLANET";

  // Exotic objects
  } else if(
    // feature.properties.TYPE === "Exotic" || feature.properties.TYPE === "Anomaly"
    feature.properties.TYPE.includes("Exotic") || feature.properties.TYPE.includes("Anomaly")
  ) {
    useIcon = true;
    iconParams[0] = "PHENOMENA";

  // Artifficial objects
  } else if(
    // feature.properties.TYPE === "Artificial Object"
    feature.properties.TYPE.includes("Artificial Object")
  ) {
    useIcon = true;
    iconParams[0] = "STATION";

  // Unknown objects
  } else if(
    // feature.properties.TYPE === "Unknown"
    feature.properties.TYPE.includes("Unknown") || feature.properties.TYPE === ""
  ) {
    useIcon = true;
    iconParams[0] = "UNKNOWN";

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
  pointData = data; // Storing data for later use
  // console.log(data);
  // filterPoints(data);
  let filteredData = initFilteredDataObject();
  filteredData = filterPointData(data, filteredData);
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
        // zoomToFeature(e);
        areaDisplayPopup(e);
      },
  });
}
// Display tooltip on mouseover
function areaDisplayTooltip(e) {
  let layer = e.target;
  // Update tooltip visibility
  layer.openTooltip();
}

// Hide tooltip on mouseout
function areaHideTooltip(e) {
  e.target.layer?.closeTooltip(); // Hide tooltip
}
// Create layers
const areas = L.geoJSON(null,{
  pane:'areas',
  style:getRegionsStyle,
  onEachFeature:onEachFeature,
  snapIgnore: true,
  pmIgnore: true
});
$.getJSON(url_areas, function(data) {
  areas.addData(data);
});