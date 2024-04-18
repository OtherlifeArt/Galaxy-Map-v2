/**
 * MAP by Solenn Tual
 * Sources : https://portulans.github.io/maps/star-wars/galaxy.html
 */

/******** MAPS *********/
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom:-3,
  maxZoom:8,
  fullscreenControl: true,
  fullscreenControlOptions: {
      position: 'topleft'
  },
}).setView([900, 900], -3);

var bounds = [[0,0], [2488,2000]];
map.fitBounds(bounds);
/*********** PANE ***********/
map.createPane("grid");
map.getPane("grid").style.zIndex = "597";
map.createPane("gridids");
map.getPane("gridids").style.zIndex = "597";

map.createPane("zones");
map.getPane("zones").style.zIndex = "598";

map.createPane("roads");
map.getPane("roads").style.zIndex = "599";

map.createPane("planets");
map.getPane("planets").style.zIndex = "600";

/******** FUNCTIONS *********/

function getColor(type) {
  return type == 'planet' ? '#0F87F1' :
          type == 'neb' ? '#A16CD3':
              '#A16CD3';
}

function getBorderColor(type) {
  return type == 'planet' ? '#094F8D' :
          type == 'neb' ? '#5C3F78':
              '#5C3F78';
}

function getColorLines(type) {
  return type == 'main' ? '#BEC3C3' :
      type == 'secondary' ? '#FDFEFE':
              '#A16CD3';
}

function getLinesWeight(type){
  return type == 'main' ? 3 :
      type == 'secondary' ? 1:
              1;
}

function getTypeName(type){
  return type == 'planet' ? 'Planète' :
  type == 'neb' ? 'Nébuleuse':
      'Autre';
}

function getZonesColor(name){
  return name == 'Deep Core' ? '#E7E5E6' :
  name == 'Core' ? '#FFC300':
  name == 'Colonies' ? '#E884FA' :
  name == 'Inner Rim' ? '#F07746':
  name == 'Expension Region' ? '#59C4DC' :
  name == 'Mid Rim' ? '#FA84F6':
  name == 'Outter Rim' ? '#5970E3':
  name == 'Hutt Space' ? '#DE178C':
  name == 'Bothan Space' ? '#DE178C':
  name == 'Corporate Sector' ? '#DE178C':
      '#000000';
}

function onEachPlanet(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.name) {
      texte = '<h4>'+feature.properties.name+'</h4>' +
          '<p><b>Type : </b><i>'+ getTypeName(feature.properties.type) + '</i><br/>'+
          '<a href="https://starwars.fandom.com/fr/wiki/' + feature.properties.name + '" target="_blank">En savoir plus (FR)</a><br/>'+
          '<a href="https://starwars.fandom.com/wiki/' + feature.properties.name + '" target="_blank">En savoir plus (UK)</a>'
          texte += '</p>';
      layer.bindPopup(texte).bindTooltip(feature.properties.name);
  }
};

function pointToLayer(feature,latlng) {
  return L.circleMarker(latlng, {
      radius:3,
      fillColor: getColor(feature.properties.type),
      color: getBorderColor(feature.properties.type),
      weight: 1,
      opacity: 1,
      fillOpacity: 1,
      pane:'planets'
  }
  );
}

function styleLines(feature) {
  //Style des lignes en fonction des types d'objets
  return {
              color: getColorLines(feature.properties.type),
              weight: getLinesWeight(feature.properties.type),
              lineJoin: 'round'
          };
}

function zoneStyle(feature){
return {
      fillColor: getZonesColor(feature.properties.name),
      weight: 1,
      opacity: 1,
      color: getZonesColor(feature.properties.name),
      fillOpacity: 0.5
}
};

function gridStyle(feature){
  return {
      fillColor: 'white',
      fillOpacity: 0,
      weight: 1,
      opacity: 0.8,
      color: '#4BF5DE'
}
}

function loadGridColLine(feature,layer){
  if (feature.properties){
      layer.bindTooltip(feature.properties.id,{
          permanent: true, 
          direction:"center",
          className: 'leaflet-tooltip-grid' 
      })
  }
}

function pointToLayerGridPoints(feature,latlng) {
  return L.circleMarker(latlng, {
      radius:0,
      opacity: 0,
  }
  );
}

function getGeom(feature){
  return feature.geometry.coordinates
}

var select = L.geoJSON()
function zoomOn(){
  
  var num = document.getElementById("line_num").value
  console.log(num)
  var letter = document.getElementById("col_letter").value
  console.log(letter)

  var url4 = "./data-convert/grid.geojson"
  select.clearLayers()
  select = L.geoJSON(null, {
      pane:'grid',
      style:{
          fillColor: 'white',
          fillOpacity: 0,
          weight: 4,
          opacity: 0.8,
          color: '#4BF5DE'
      },
      filter: function(feature, layer) {
          return (feature.properties.line_num == num && feature.properties.col_letter == letter);

      }
  });
  $.getJSON(url4, function(data) {
      select.addData(data);
  });
  select.addTo(map)

  map.on('click', function() {
      map.fitBounds(select.getBounds());
  });
};

document.getElementById("gridsearchbut").addEventListener("click", e => zoomOn());

/******** VECTEUR *********/
var url1 = "./data-convert/zones.geojson"

var zones = L.geoJSON(null, {
  pane:'zones',
  style: zoneStyle,
  /*filter: function(feature, layer) {
      return feature.properties.id == 2;
  }*/
  });
  $.getJSON(url1, function(data) {
      zones.addData(data);
});

var url3 = "./data-convert/planets.geojson"
var planets = L.geoJSON(null, {
  onEachFeature:onEachPlanet,
  pointToLayer:pointToLayer
});
$.getJSON(url3, function(data) {
  planets.addData(data);
});

var url2 = "./data-convert/roads.geojson"
var roads = L.geoJSON(null, {
  pane:'roads',
  style:styleLines
});
$.getJSON(url2, function(data) {
  roads.addData(data);
});

var url4 = "./data-convert/grid.geojson"
var grid = L.geoJSON(null, {
  style:gridStyle,
  pane:'grid'
});
$.getJSON(url4, function(data) {
  grid.addData(data);
});

var url5 = "./data-convert/gridids.geojson"
var gridids = L.geoJSON(null, {
  gridids:'gridids',
  onEachFeature:loadGridColLine,
  pointToLayer:pointToLayerGridPoints
});
$.getJSON(url5, function(data) {
  gridids.addData(data);
});

var completegrid = L.layerGroup([grid,gridids]);

/****** SEARCH ********/

var searchLayer = L.layerGroup([planets]);
//... adding data in searchLayer ...
map.addControl( new L.Control.Search({
  layer: searchLayer,
  propertyName: 'name',
  initial:false,
  textPlaceholder:"Search object or area..."
}) );

/******** ADD LAYERS *********/
zones.addTo(map)
planets.addTo(map)
roads.addTo(map)
completegrid.addTo(map)

var baseMaps = {
  
};

var overlayMaps = {
  "Planets":planets,
  "Roads":roads,
  "Grid":completegrid
};

L.control.layers(baseMaps, overlayMaps, {
collapsed:false
}).addTo(map);
map.removeLayer(completegrid);