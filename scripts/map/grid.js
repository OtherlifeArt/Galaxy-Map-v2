// /**
//  * Grid display
//  */

/******************** CONSTANT *******************/
const GRID_LABEL_MARKER_DEFAULT_SETTINGS = {
  GRID_LABEL_OFFSET_PX: 20,
  GRID_HALF_STEP: 50,
  NORTH_LETTER_Y: 975,
  SOUTH_LETTER_Y: -1500,
  WEST_NUMBER_X: -1200,
  EAST_NUMBER_X: 1300,
};

/******************** VARIABLES ******************/

/*************************************************/

function getGeom(feature) {
  return feature.geometry.coordinates
}

/************* STATIC GRID *************/

// Paths to data
const url_grid = "././data/grid/grid.geojson"

$.getJSON(url_grid, function (data) {
  grid.addData(data);
});

/************* ADAPTATIVE GRID *************/

// Define grid options
var grid100Options = {
  weight: 1,
  color: '#d39178',
  opacity: 0.5,
  interactive: false,
  pmIgnore: true,
  snapIgnore: true
};

var grid10Options = {
  weight: 0.2,
  color: '#bbbbbb',
  // color: '#000',
  opacity: 0.5,
  interactive: false,
  pmIgnore: true,
  snapIgnore: true
};

var grid1Options = {
  weight: 0.15,
  // color: '#000',
  color: '#888888',
  opacity: 0.5,
  interactive: false,
  pmIgnore: true,
  snapIgnore: true
};

// Create feature groups
var grid100 = new L.FeatureGroup(null, { interactive: false, pmIgnore: true, snapIgnore: true });
var grid10 = new L.FeatureGroup(null, { interactive: false, pmIgnore: true, snapIgnore: true });
var grid1 = new L.FeatureGroup(null, { interactive: false, pmIgnore: true, snapIgnore: true });

// Add grid lines for squares of 100 meters (zoom -3 to -8)
for (var i = -1100; i <= 1200; i += 100) {
  grid100.addLayer(L.polyline(
    [[900, i], [-1400, i]],
    grid100Options
  ));
}

for (var j = 900; j >= -1400; j -= 100) {
  grid100.addLayer(L.polyline(
    [[j, -1100], [j, 1200]],
    grid100Options
  ));
}

// Add grid lines for squares of 10 meters (zoom 1 to 8)
for (var i = -1100; i <= 1200; i += 10) {
  grid10.addLayer(L.polyline(
    [[900, i], [-1400, i]],
    grid10Options
  ));
}

for (var j = 900; j >= -1400; j -= 10) {
  grid10.addLayer(L.polyline(
    [[j, -1100], [j, 1200]],
    grid10Options
  ));
}

// Add grid lines for squares of 1 meter (zoom 5 to 8)
for (var i = -1100; i <= 1200; i += 1) {
  grid1.addLayer(L.polyline(
    [[900, i], [-1400, i]],
    grid1Options
  ));
}

for (var j = 900; j >= -1400; j -= 1) {
  grid1.addLayer(L.polyline(
    [[j, -1100], [j, 1200]],
    grid1Options
  ));
}

/************* GRID LABELS *************/
// Paths to data
const url_gridlabels = "././data/grid/grid_labels.geojson"
let defaultGridLabel;

function bindGridTooltip(feature, layer) {
  if (feature.properties) {
    layer.bindTooltip(feature.properties.label, {
      permanent: true,
      direction: "center",
      className: 'leaflet-tooltip-crd'
    })
  }
}

function pointToLayerGridPoints(feature, latlng) {
  return L.circleMarker(latlng, {
    radius: 0,
    opacity: 0,
    interactive: false,
    pmIgnore: true,
    snapIgnore: true
  }
  );
}

var grid_labels = L.geoJSON(null, {
  pane: 'grid_labels',
  onEachFeature: bindGridTooltip,
  pointToLayer: pointToLayerGridPoints,
  pmIgnore: true,
  snapIgnore: true,
  interactive: false
});

/************* DYNAMIC GRID LABELS *************/

function updateGridLabels() {
  const bounds = map.getBounds();
  const northLat = bounds.getNorth();
  const southLat = bounds.getSouth();
  const westLng = bounds.getWest();
  const eastLng = bounds.getEast();
  const mapWidth = map.getSize().x;
  const mapHeight = map.getSize().y;

  // Create new grid labels within visible bounds
  // console.log(defaultGridLabel);
  grid_labels.eachLayer(function(layer) {
    const labelPosition = layer.feature.properties.layer;
    if (labelPosition.startsWith("col")) { // column / letters
      // if (layer.getLatLng().lng - GRID_LABEL_MARKER_DEFAULT_SETTINGS.GRID_HALF_STEP > westLng 
      //   && layer.getLatLng().lng + GRID_LABEL_MARKER_DEFAULT_SETTINGS.GRID_HALF_STEP < eastLng) {
        let newLat;
        if(labelPosition === "col_name_north") { // North label
          // Static or adaptative function of map boundaries
          newLat = northLat >= GRID_LABEL_MARKER_DEFAULT_SETTINGS.NORTH_LETTER_Y ? 
            GRID_LABEL_MARKER_DEFAULT_SETTINGS.NORTH_LETTER_Y
            : map.containerPointToLatLng([mapHeight * 0.5, GRID_LABEL_MARKER_DEFAULT_SETTINGS.GRID_LABEL_OFFSET_PX]).lat;
        } else { // South label
          newLat = southLat <= GRID_LABEL_MARKER_DEFAULT_SETTINGS.SOUTH_LETTER_Y ?
            GRID_LABEL_MARKER_DEFAULT_SETTINGS.SOUTH_LETTER_Y
            : map.containerPointToLatLng([mapHeight * 0.5, mapHeight - GRID_LABEL_MARKER_DEFAULT_SETTINGS.GRID_LABEL_OFFSET_PX]).lat;
        }
        layer.setLatLng([newLat, layer.getLatLng().lng]);
      // }
    } else { // lines / numbers
      // if (layer.getLatLng().lat - GRID_LABEL_MARKER_DEFAULT_SETTINGS.GRID_HALF_STEP > southLat 
      //   && layer.getLatLng().lat + GRID_LABEL_MARKER_DEFAULT_SETTINGS.GRID_HALF_STEP < northLat) {
        let newLng;
        if(labelPosition === "line_name_west") { // West label
          newLng = westLng <= GRID_LABEL_MARKER_DEFAULT_SETTINGS.WEST_NUMBER_X ?
          GRID_LABEL_MARKER_DEFAULT_SETTINGS.WEST_NUMBER_X
          : map.containerPointToLatLng([GRID_LABEL_MARKER_DEFAULT_SETTINGS.GRID_LABEL_OFFSET_PX, mapWidth * 0.5]).lng;
        } else { // East label
          newLng = eastLng >= GRID_LABEL_MARKER_DEFAULT_SETTINGS.EAST_NUMBER_X ?
          GRID_LABEL_MARKER_DEFAULT_SETTINGS.EAST_NUMBER_X
          : map.containerPointToLatLng([mapWidth - GRID_LABEL_MARKER_DEFAULT_SETTINGS.GRID_LABEL_OFFSET_PX, mapWidth * 0.5]).lng;
        }
        layer.setLatLng([layer.getLatLng().lat, newLng]);
        // grid_labels.addLayer(layer);
      // }
    }
  });
  
}

/************* INITIALIZE GRID LABELS *************/

// Initialize grid labels
$.getJSON(url_gridlabels, function (data) {
  grid_labels.addData(data);
  defaultGridLabel = L.geoJson(grid_labels.toGeoJSON()); // Store default grid labels
  updateGridLabels();
});

/********* Define full grid layer ***********/

var completegrid = L.layerGroup([grid_labels, grid100], {
  pane: 'grid',
  pmIgnore: true,
  snapIgnore: true,
  interactive: false
});

/************* GRID SEARCH *************/

// Grid search collapse button
const gridSearchWrapper = document.querySelector('.tabgeomcontent-wrapper');
const gridSearchButton = gridSearchWrapper.querySelector('.tabgeomcontent-toggle-btn');
const fieldset = gridSearchWrapper.querySelector('.tabgeomcontent-collapsible');

gridSearchButton.addEventListener('click', () => {
  const collapsed = fieldset.classList.toggle('gridsearch-is-collapsed');
  gridSearchWrapper.classList.toggle('gridsearch-is-collapsed', collapsed);

  gridSearchButton.textContent = collapsed ? 'Show grid search' : 'Hide grid search';
  gridSearchButton.setAttribute('aria-expanded', !collapsed);
  gridSearchButton.classList.toggle('gridsearch-is-collapsed', !collapsed);
});

// Grid squares for grid search
var grid = L.geoJSON(null, {
  pane: 'grid_search',
  pmIgnore: true,
  snapIgnore: true
});

//Function to highlight a grid square on the map according to its coordinates
var select = L.geoJSON()
function zoomOn() {

  var num = document.getElementById("line_num").value
  console.log(num)
  var letter = document.getElementById("col_letter").value.toUpperCase()
  console.log(letter)

  select.clearLayers()
  select = L.geoJSON(null, {
    pane: 'grid_search',
    style: {
      fillColor: 'white',
      fillOpacity: 0,
      weight: 4,
      opacity: 0.8,
      color: '#4BF5DE'
    },
    pmIgnore: true,
    snapIgnore: true,
    filter: function (feature, layer) {
      return (feature.properties.line == num && feature.properties.col == letter);

    }
  });
  $.getJSON(url_grid, function (data) {
    select.addData(data);
    console.log(select.getBounds().getCenter());
    map.fitBounds(select.getBounds());
  });
  select.addTo(map)

  select.on('click', function () {
    map.fitBounds(select.getBounds());
    map.setView([-250.0, 0], -2);
  });
};

document.getElementById("gridsearchbut").addEventListener("click", e => zoomOn());

// Function to reset the grid search tool
function removeGridPointer(geoJsonMain, responseJson) {
  if (select) {
    select.removeFrom(map);
  }
  document.getElementById("line_num").value = ""
  document.getElementById("col_letter").value = ""
  map.setView([-250.0, 0], -2);
}
document.getElementById("gridsearchreset").addEventListener("click", e => removeGridPointer());
