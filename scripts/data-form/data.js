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
    style:styleLines
});
$.getJSON(url_roads, function(data) {
    roads.addData(data);
});


/************** POINTS ***************/
function getPointColor(type) {
  return (
      type === "Planet" || type === "Dwarf Planet"
          ? "#800026"
          : type === "Moon" || type === "Dwarf Moon"
          ? "#BD0026"
          : type === "Star System"
          ? "#E31A1C"
          : type === "Artificial object"
          ? "#FC4E2A"
          : type === "Asteroid Field" || type === "Asteroid"
          ? "#FD8D3C"
          : type === "Star" || type === "Star Cluster"
          ? "#FEB24C"
          : type === "Comet" || type === "Comet Cluster"
          ? "#FED976"
          : type === "Nebula"
          ? "#B663EF"
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
        fillOpacity: 0.2,
        weight: 1,
        opacity: 1,
        color: getPointColor(feature.properties.TYPE),
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
      weight: 3,
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
      click: zoomToFeature
  });
}

// Create layers
areas = L.geoJSON(null,{
  pane:'areas',
  style:getRegionsStyle,
  onEachFeature:onEachFeature
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