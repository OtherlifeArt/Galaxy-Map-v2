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
var mapMinZoomLevel = -3;
var mapMaxZoomLevel = 8;
var mapStartZoomLevel = -2;
var mapStartCenterCoordinates = [-450.0,0];

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
const points = L.layerGroup([], { pane: 'points' });
/* Top-level layers */
// Non star system layer group with coordinates
const innerStarSystemMainObjectLG = L.layerGroup([], { pane: 'points' });
// Star system layer group with coordinates
const starSystemLG = L.layerGroup([], { pane: 'points' });
// Other objects
const otherObjectLG = L.layerGroup([], { pane: 'points' });

/* 1st level sub layers */
// Non star system layer group with coordinates
const innerStarSystemMainObjectCanonOnlyLG = L.layerGroup([], { pane: 'points' });
const innerStarSystemMainObjectLegendsOnlyLG = L.layerGroup([], { pane: 'points' });
const innerStarSystemMainObjectCanonAndLegendsLG = L.layerGroup([], { pane: 'points' });
const innerStarSystemMainObjectUnlicencedLG = L.layerGroup([], { pane: 'points' });
// Star system layer group with coordinates
const starSystemCanonOnlyLG = L.layerGroup([], { pane: 'points' });
const starSystemLegendsOnlyLG = L.layerGroup([], { pane: 'points' });
const starSystemCanonAndLegendsLG = L.layerGroup([], { pane: 'points' });
const starSystemUnlicencedLG = L.layerGroup([], { pane: 'points' });
// Other objects
const otherObjectCanonOnlyLG = L.layerGroup([], { pane: 'points' });
const otherObjectLegendsOnlyLG = L.layerGroup([], { pane: 'points' });
const otherObjectCanonAndLegendsLG = L.layerGroup([], { pane: 'points' });
const otherObjectUnlicencedLG = L.layerGroup([], { pane: 'points' });

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


// Create layers
// var points;

// points = L.geoJSON(null,{
//   pane:'points',
//   pointToLayer:pointToLayerPoints,
//   style:pointStyle,
//   onEachFeature:onEachFeaturePoints
// });

// Functions

/**
 * Initialize layer group for zoom
 */
function initializeZoomLayerGroup(zoomLayerGroup) {
  const zoomLayerIndexCount = mapMaxZoomLevel - mapMinZoomLevel;
  for (let index = 0; index < zoomLayerIndexCount; index++) {
    zoomLayerGroup.addLayer(L.geoJSON(null,{
      pane:'points',
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
    // console.log(feature);
    const fp = feature.properties;
    /* Ignore object list */
    if(OBJECT_TYPES_TO_IGNORE.find((typeToIgnore) => typeToIgnore === fp.TYPE)) {
      console.log(`Ignoring ${fp.NAME} feature as point`);
      return;
    };
    /* Object category */
    // Star systems
    if(fp.TYPE.toLowerCase() === "star system") {
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
    // Inner star system objects
    // else if () {

    // }
    // Other objects
    else {
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
  });
  // console.log(filteredData);
  return filteredData;
}

/**
 * Add feature to right zoom level feature collection
 * 
 * @param {*} FeatureCollections Parent of zoom level feature collection
 * @param {*} feature From unfiltered featurecollection
 */
function addDataToZoomLevelFilteredFeatureCollection(FeatureCollections, feature) {
  let featureZoomLevelIndex;
  if(feature.ZOOM_LEVEL === undefined || feature.ZOOM_LEVEL === null || feature.ZOOM_LEVEL === "") {
    featureZoomLevelIndex = 0;
  } else {
    featureZoomLevelIndex = parseInt(feature.ZOOM_LEVEL);
  }
  FeatureCollections[featureZoomLevelIndex].features.push(feature);
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
  console.log(points);
}

/**
 * Display or hide layers function of user options/parameters
 */
function filterPoints() {
  /* Inner star system objects */
  if(!userOptions.display.starSystems) {
    // Hide all star system layers
    map.removeLayer(starSystemLG);
    /* Continuity */
    // Unlicensed
    if(userOptions.continuity.unlicensed) {
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        // Ignore zoom restriction (show all objects)
        map.addLayer(innerStarSystemMainObjectUnlicencedLG);
      } else {
        filterPointsByZoomLevel(innerStarSystemMainObjectUnlicencedLG);
      }
    } else {
      map.removeLayer(innerStarSystemMainObjectUnlicencedLG); // Unlicensed removed
    }
    if (userOptions.continuity.legends) {
      if (userOptions.continuity.canon) {
        // Canon and legends
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          // Ignore zoom restriction (show all objects)
          map.addLayer(innerStarSystemMainObjectLegendsOnlyLG);
          map.addLayer(innerStarSystemMainObjectCanonAndLegendsLG);
          map.addLayer(innerStarSystemMainObjectCanonOnlyLG);
        } else {
          filterPointsByZoomLevel(innerStarSystemMainObjectLegendsOnlyLG);
          filterPointsByZoomLevel(innerStarSystemMainObjectCanonAndLegendsLG);
          filterPointsByZoomLevel(innerStarSystemMainObjectCanonOnlyLG);
        }
      } else {
        map.removeLayer(innerStarSystemMainObjectCanonOnlyLG); // Canon removed
        // Add Legends only
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          // Ignore zoom restriction (show all objects)
          map.addLayer(innerStarSystemMainObjectLegendsOnlyLG);
          map.addLayer(innerStarSystemMainObjectCanonAndLegendsLG);
        } else {
          filterPointsByZoomLevel(innerStarSystemMainObjectLegendsOnlyLG);
          filterPointsByZoomLevel(innerStarSystemMainObjectCanonAndLegendsLG);
        }
      }
    } else {
      if (userOptions.continuity.canon) {
        map.removeLayer(innerStarSystemMainObjectLegendsOnlyLG); // Legends removed
        // Canon only
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          // Ignore zoom restriction (show all objects)
          map.addLayer(innerStarSystemMainObjectCanonAndLegendsLG);
          map.addLayer(innerStarSystemMainObjectCanonOnlyLG);
        } else {
          filterPointsByZoomLevel(innerStarSystemMainObjectCanonAndLegendsLG);
          filterPointsByZoomLevel(innerStarSystemMainObjectCanonOnlyLG);
        }
      } else {
        map.removeLayer(innerStarSystemMainObjectCanonOnlyLG); // Neither Canon nor legends
        map.removeLayer(innerStarSystemMainObjectLegendsOnlyLG); // Neither Canon nor legends
        map.removeLayer(innerStarSystemMainObjectCanonAndLegendsLG); // Neither Canon nor legends
      }
    }
  }
  /* Star system objects */
  else {
    // Hide all inner star system layers
    map.removeLayer(innerStarSystemMainObjectLG);
    /* Continuity */
    // Unlicensed
    if(userOptions.continuity.unlicensed) {
      filterPointsByZoomLevel(starSystemUnlicencedLG);
    } else {
      map.removeLayer(starSystemUnlicencedLG); // Unlicensed removed
    }
    if (userOptions.continuity.legends) {
      if (userOptions.continuity.canon) {
        // Canon and legends
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          // Ignore zoom restriction (show all objects)
          map.addLayer(starSystemLegendsOnlyLG);
          map.addLayer(starSystemCanonAndLegendsLG);
          map.addLayer(starSystemCanonOnlyLG);
        } else {
          filterPointsByZoomLevel(starSystemLegendsOnlyLG);
          filterPointsByZoomLevel(starSystemCanonAndLegendsLG);
          filterPointsByZoomLevel(starSystemCanonOnlyLG);
        }
      } else {
        map.removeLayer(starSystemCanonOnlyLG); // Canon removed
        // Add Legends only
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          // Ignore zoom restriction (show all objects)
          map.addLayer(starSystemLegendsOnlyLG);
          map.addLayer(starSystemCanonAndLegendsLG);
        } else {
          filterPointsByZoomLevel(starSystemLegendsOnlyLG);
          filterPointsByZoomLevel(starSystemCanonAndLegendsLG);
        }
      }
    } else {
      if (userOptions.continuity.canon) {
        map.removeLayer(starSystemLegendsOnlyLG); // Legends removed
        // Canon only
        if (userOptions.display.ignoreObjectZoomLevelRestriction) {
          // Ignore zoom restriction (show all objects)
          map.addLayer(starSystemCanonAndLegendsLG);
          map.addLayer(starSystemCanonOnlyLG);
        } else {
          filterPointsByZoomLevel(starSystemCanonAndLegendsLG);
          filterPointsByZoomLevel(starSystemCanonOnlyLG);
        }
      } else {
        map.removeLayer(starSystemCanonOnlyLG); // Neither Canon nor legends
        map.removeLayer(starSystemLegendsOnlyLG); // Neither Canon nor legends
        map.removeLayer(starSystemCanonAndLegendsLG); // Neither Canon nor legends
      }
    }
  }
  /* Other objects */
  /* Continuity */
  // Unlicensed
  if(userOptions.continuity.unlicensed) {
    filterPointsByZoomLevel(otherObjectUnlicencedLG);
  } else {
    map.removeLayer(otherObjectUnlicencedLG); // Unlicensed removed
  }
  if (userOptions.continuity.legends) {
    if (userOptions.continuity.canon) {
      // Canon and legends
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        // Ignore zoom restriction (show all objects)
        map.addLayer(otherObjectLegendsOnlyLG);
        map.addLayer(otherObjectCanonAndLegendsLG);
        map.addLayer(otherObjectCanonOnlyLG);
      } else {
        filterPointsByZoomLevel(otherObjectLegendsOnlyLG);
        filterPointsByZoomLevel(otherObjectCanonAndLegendsLG);
        filterPointsByZoomLevel(otherObjectCanonOnlyLG);
      }
    } else {
      map.removeLayer(otherObjectCanonOnlyLG); // Canon removed
      // Add Legends only
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        // Ignore zoom restriction (show all objects)
        map.addLayer(otherObjectLegendsOnlyLG);
        map.addLayer(otherObjectCanonAndLegendsLG);
      } else {
        filterPointsByZoomLevel(otherObjectLegendsOnlyLG);
        filterPointsByZoomLevel(otherObjectCanonAndLegendsLG);
      }
    }
  } else {
    if (userOptions.continuity.canon) {
      map.removeLayer(otherObjectLegendsOnlyLG); // Legends removed
      // Canon only
      if (userOptions.display.ignoreObjectZoomLevelRestriction) {
        // Ignore zoom restriction (show all objects)
        map.addLayer(otherObjectCanonAndLegendsLG);
        map.addLayer(otherObjectCanonOnlyLG);
      } else {
        filterPointsByZoomLevel(otherObjectCanonAndLegendsLG);
        filterPointsByZoomLevel(otherObjectCanonOnlyLG);
      }
    } else {
      map.removeLayer(otherObjectCanonOnlyLG); // Neither Canon nor legends
      map.removeLayer(otherObjectLegendsOnlyLG); // Neither Canon nor legends
      map.removeLayer(otherObjectCanonAndLegendsLG); // Neither Canon nor legends
    }
  }
}

/**
 * Display/hide layers function of zoom
 * 
 * @param {*} zoomParentGroupLayer parent zoom layer array
 */
function filterPointsByZoomLevel(zoomParentGroupLayer) {
  const mapZoom = map.getZoom() - mapStartZoomLevel;
  const groupLayers = zoomParentGroupLayer.getLayers();
  console.log(groupLayers);
  for (let index = 0; index < groupLayers.length; index++) {
    if(index <= mapZoom) {
      map.addLayer(groupLayers[index]);
    } else {
      map.removeLayer(groupLayers[index]);
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

//Load data from local geojson and initialize the layer
$.getJSON(url_points, function(data) {
  // console.log(data);
  // filterPoints(data);
  let filteredData = initFilteredDataObject();
  filteredData = filterData(data, filteredData);
  // console.log(filteredData);
  addFilteredData(filteredData);
  filterPoints();
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