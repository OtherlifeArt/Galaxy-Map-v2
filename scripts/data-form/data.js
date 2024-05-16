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
function getPointColor(type) {
  return (
      type === "Planet" || type === "Dwarf Planet"
          ? "#2FA044"
          : type === "Moon" || type === "Dwarf Moon"
          ? "#FEFEFE"
          : type === "Star System"
          ? "#C70039"
          : type === "Artificial object"
          ? "#606261"
          : type === "Asteroid Field" || type === "Asteroid"
          ? "#1D204D"
          : type === "Star" || type === "Star Cluster"
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
  layer.on({
      mouseover: highlightCircleMarker,
      mouseout: resetCircleMarkerStyle
  });
}

points = L.geoJSON(null,{
    pane:'points',
    style:pointStyle,
    pointToLayer:pointToLayerPoints,
    onEachFeature:onEachFeaturePoints
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
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      //click: zoomToFeature
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


//*************** EVENTS ****************/
  points.on('click', function(e) {
    var features = e.layer.feature;
      // Do something with the properties, e.g., display in a popup
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
        .setLatLng([features.geometry.coordinates[1],features.geometry.coordinates[0]])
        .setContent(texte)
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
  /*
points.on('mouseover'), function(e) {
  var feature = e.layer.feature;
  var tooltip = L.tooltip({
    permanent: false, // Show the tooltip permanently
    direction: 'top', // Position the tooltip above the marker
})
.setContent(features.properties.NAME); // Set the content of the tooltip

this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
}

areas.on('mouseover'), function(e) {
  var feature = e.layer.feature;
  var tooltip = L.tooltip({
    permanent: false, // Show the tooltip permanently
    direction: 'top', // Position the tooltip above the marker
})
.setContent(features.properties.NAME); // Set the content of the tooltip

this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
}*/