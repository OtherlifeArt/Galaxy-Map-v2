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
var points = L.geoJSON(null,{
    pane:'points',
    style:pointStyle,
    pointToLayer:pointToLayerPoints
});
$.getJSON(url_points, function(data) {
    points.addData(data);
});

/************** POLYGONS ***************/
// Assume geojsonLayer is your GeoJSON layer
function whenClicked(feature,layer) {
  // Do something with the properties, e.g., display in a popup
  var texte = '<h2>'+feature.properties.NAME+'</h2><div>'
  if (feature.properties.GEOM_TYPE){
    texte+= '<p><i>'+ feature.properties.GEOM_TYPE + '</i></p>';
}
  if (feature.properties.TYPE){
      texte+= '<p><b>Type : </b>'+ feature.properties.TYPE + '</p>';
  }
  if (feature.properties.CLASSE){
    texte+= '<p><b>Type classe : </b>'+ feature.properties.TYPE_CLASSE + '</p>';
  }
  if (feature.properties.PARENT){
    texte+= '<p><b>Parent : </b>'+ feature.properties.PARENT + '</p>';
  }
  texte+='</div>'
layer.bindPopup(texte)//.bindTooltip(feature.properties.NAME);
};

function getRegionsColor(name,area) {
  if (name == 'Deep Core') {
    color = "#F3F3E8"
  } else if (name == "Core Worlds") {
    color = "#BD0026"
  } else if (name == "Inner Rim"){
    color = "#E31A1C"
  } else if (name == "Colonies"){
    color = "#FC4E2A"
  } else if (name == "Hutt Space"){
    color = "#B663EF"
  } else if (name == "Unknown Regions"){
    color = "#7CAFBB"
  } else if (name == "Wild Space"){
    color = "#78D3C3"
  } else {
    if (area.includes("Expansion")) {
      color = "#FD8D3C"
    } else if (area.includes("Mid")) {
      color = "#FEB24C"
    } else if (area.includes("Outer")) {
      color = "#FED976"
    } else if (area.includes("Wild Space")) {
      color = "#78D3C3"
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

// Create layers
var areas = L.geoJSON(null,{
  pane:'areas',
  style:getRegionsStyle,
  onEachFeature:whenClicked
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
  // Do something with the properties, e.g., display in a popup
  L.popup()
      .setLatLng([features.geometry.coordinates[1],features.geometry.coordinates[0]])
      .setContent(texte)
      .openOn(map);
});