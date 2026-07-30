/********** URLS **********/

// Paths to data
var url_points = "././data/astronomicalobjects/SW_Map_Points.geojson"
// var url_roads = "././data/astronomicalobjects/SW_Map_Lines.geojson"
// var url_areas = "././data/astronomicalobjects/SW_Map_Polygons.geojson"

/************** ROADS ***************/

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

function styleLines(feature) {
  console.log("Mapping "+ feature.properties.NAME +" road");
  /*Set roads style depending on properties*/
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

// Load data from local geojson and initialize the road layer
const roadColorGen = roadColorGenerator();
var roads = L.geoJSON(null,{
    pane:'roads',
    style:styleLines,
    snapIgnore: true,
    pmIgnore:true,
    onEachFeature: onEachFeatureRoads
});
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


// Display label on mouseover
function roadDisplayTooltip(e) {
  // console.log(e);
  let layer = e.target;
  // Update tooltip visibility
  layer.openTooltip();
}

// Remove label on mouseout
function roadHideTooltip(e) {
  e.target.layer?.closeTooltip(); // Hide tooltip
}
$.getJSON(url_roads, function(data) {
    roads.addData(data);
});

function roadDisplayPopup(e) {
  var feature = e.target.feature;
  
  var text = '<h2>'+feature.properties.NAME+'</h2><div>'
  text+= '<p><i>'+ feature.properties.ID + '</i></p>';
  if (feature.properties.PARENT){
    text+= '<p><b>Parent : </b>'+ feature.properties.PARENT + '</p>';
  }
  text+='</div>'
L.popup()
    .setLatLng(e.latlng)
    .setContent(text)
    .openOn(map);
}

/// Re.load data (roads only) from the DB and display them on the map
var roadsgeojson;
async function getRoadsGeoJSON() {
  const spreadsheetId = SPREADSHEET_ID;
  const routeSheetName = SHEETS.HYPERROUTES.NAME;
  const routeSectionSheetName = SHEETS.HYPERROUTE_SECTIONS.NAME;
  const geojson = await fetchDataLines(spreadsheetId, routeSheetName, routeSectionSheetName);
  roads.clearLayers();
  roadsgeojson = geojson;
  roads.addData(roadsgeojson);
}

/************** POINTS ***************/
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

// Functions
function pointStyle(feature){
    return {
        fillColor: getPointColor(feature.properties.TYPE),
        fillOpacity: 0.6,
        color: getPointColor(feature.properties.TYPE),
        opacity: 1,
        weight: 1,
  }
}

function pointToLayerPoints(feature,latlng) {
    return L.circleMarker(latlng, {
        pane:"points",
        radius:2,
        interactive: true
    }
    );
}

// Create layers
var points;

function highlightCircleMarker(e) {
  var layer = e.target;
  layer.setStyle({
      weight: 8
  });
  layer.bringToFront();
}

function resetCircleMarkerStyle(e) {
  points.resetStyle(e.target);
}

function onEachFeaturePoints(feature, layer) {
  layer.bindTooltip(feature.properties.NAME, { sticky: false, direction: 'right' });
  layer.on({
      mouseover: function(e) {
        highlightCircleMarker(e);
        //pointDisplayTooltip(e);
      },
      mouseout: function(e) {
        //pointHideTooltip(e);
        resetCircleMarkerStyle(e);
      },
  });
}
function pointDisplayTooltip(e) {
  // console.log(e);
  let layer = e.target;
  // Update tooltip visibility
  layer.openTooltip();
}
// Remove label on mouseout
function pointHideTooltip(e) {
  e.target.layer?.closeTooltip(); // Hide tooltip
}

points = L.geoJSON(null,{
    pane:'points',
    style:pointStyle,
    pointToLayer:pointToLayerPoints,
    //onEachFeature:onEachFeaturePoints
});
//Load data from local geojson
/*
$.getJSON(url_points, function(data) {
    points.addData(data);
});*/

/// Re.load data (points only) from the DB and display them on the map
var pointsgeojson;
async function getPointsGeoJSON(geomType) {
  var spreadsheetId = SPREADSHEET_ID
  var sheetName = SHEETS.OBJECTS.NAME
  await fetchSheetDataPoints(spreadsheetId, sheetName).then(function(geojson) {
    points.clearLayers()
    pointsgeojson = geojson
    points.addData(pointsgeojson)
  }).catch(function(error) {
    console.error('Error loading Geojson:', error);
  });
}

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
      mouseover: function (e) {
        highlightFeature(e);
        areaDisplayTooltip(e);
      },
      mouseout: function (e) {
        resetHighlight(e);
        areaHideTooltip(e);
      },
      //click: zoomToFeature
  });
}
// Display label on mouseover
function areaDisplayTooltip(e) {
  // console.log(e);
  let layer = e.target;
  // Update tooltip visibility
  layer.openTooltip();
}

// Remove label on mouseout
function areaHideTooltip(e) {
  e.target.layer?.closeTooltip(); // Hide tooltip
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


//*************** EVENTS ****************/
  points.on('click', function(e) {
    var features = e.layer.feature;
      // Do something with the properties, e.g., display in a popup
      var text = '<h2>'+features.properties.NAME+'</h2><div>'
      if (features.properties.GEOM_TYPE){
        text+= '<p><i>'+ features.properties.GEOM_TYPE + '</i></p>';
      }
      text+= '<p><i>'+ features.properties.ID + '</i></p>';
      if (features.properties.TYPE){
          text+= '<p><b>Type : </b>'+ features.properties.TYPE + '</p>';
      }
      if (features.properties.CLASSE){
        text+= '<p><b>Type classe : </b>'+ features.properties.TYPE_CLASSE + '</p>';
      }
      if (features.properties.PARENT){
        text+= '<p><b>Parent : </b>'+ features.properties.PARENT + '</p>';
      }
      if (features.properties.X_GRID){
        text+= '<p><b>Grid : </b>'+ features.properties.X_GRID+"-"+features.properties.Y_GRID + '</p>';
      }
      if (features.properties.X_COORD){
        text+= '<p><b>Coords : </b>'+ features.properties.X_COORD+", "+features.properties.Y_COORD +", "+features.properties.Z_COORD+ '</p>';
      }
      if (features.properties.CONJECTURAL_NAME){
        text+= '<p><b>Conj. Name : </b>'+ features.properties.CONJECTURAL_NAME + '</p>';
      }
      if (features.properties.CONJECTURAL_TYPE){
        text+= '<p><b>Conj. Type : </b>'+ features.properties.CONJECTURAL_TYPE + '</p>';
      }
      text+= '<p><b>Placement cert. Type : </b>'+ features.properties["PLACEMENT_CERT."] + '</p>';
      text+= '<p><b>Placement logic : </b>'+ features.properties.PLACEMENT_LOGIC + '</p>';
      text+='</div>'
    L.popup()
        .setLatLng([features.geometry.coordinates[1],features.geometry.coordinates[0]])
        .setContent(text)
        .openOn(map);
  });


  areas.on('click', function(e) {
    var features = e.layer.feature;

      var texte = '<h2>'+features.properties.NAME+'</h2><div>'
      if (features.properties.GEOM_TYPE){
        texte+= '<p><i>'+ features.properties.GEOM_TYPE + '</i></p>';
    }
      if (features.properties.TYPE){
          texte+= '<p><b>Type : </b>'+ features.properties.TYPE + '</p>';
      }
      if (features.properties.CLASSE){
        texte+= '<p><b>Type classe : </b>'+ features.properties.TYPE_CLASSE + '</p>';
      }
      if (features.properties.PARENT){
        texte+= '<p><b>Parent : </b>'+ features.properties.PARENT + '</p>';
      }
      texte+='</div>'
    L.popup()
        .setLatLng(e.latlng)
        .setContent(texte)
        .openOn(map);
  });

points.on('mouseover'), function(e) {
  var feature = e.layer.feature;
  var tooltip = L.tooltip({
    permanent: false, // Show the tooltip permanently
    direction: 'top', // Position the tooltip above the marker
})
.setContent(feature.properties.NAME); // Set the content of the tooltip

this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
}

// areas.on('mouseover'), function(e) {
//   var feature = e.layer.feature;
//   var tooltip = L.tooltip({
//     permanent: false, // Show the tooltip permanently
//     direction: 'top', // Position the tooltip above the marker
// })
// .setContent(feature.properties.NAME); // Set the content of the tooltip

// this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
// }

// roads.on('mouseover'), function(e) {
//   var feature = e.layer.feature;
//   var tooltip = L.tooltip({
//     permanent: false, // Show the tooltip permanently
//     direction: 'top', // Position the tooltip above the marker
// })
// .setContent(feature.properties.NAME); // Set the content of the tooltip

// this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
// }