/********** URLS **********/

// Paths to data
var url_points = "././data/astronomicalobjects/SW_Map_Points.geojson"
var url_roads = "././data/astronomicalobjects/roads.geojson"
var url_areas = "././data/astronomicalobjects/SW_Map_Polygons.geojson"

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
// Create layers
var points;

points = L.geoJSON(null,{
  pane:'points',
  pointToLayer:pointToLayerPoints,
  style:pointStyle,
  onEachFeature:onEachFeaturePoints
});

// Functions

/**
 * Format and display point with coordinates
 * 
 * @param {*} feature 
 * @param {*} latlng 
 * @returns 
 */
function pointToLayerPoints(feature,latlng) {
  console.log(feature.properties);
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
      resetCircleMarkerStyle(e);
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

function resetCircleMarkerStyle(e) {
  points.resetStyle(e.target);
}

//Load data from local geojson
$.getJSON(url_points, function(data) {
    points.addData(data);
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
