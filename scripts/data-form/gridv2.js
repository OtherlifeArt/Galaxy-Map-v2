/********** GRID **********/

// Paths to data
var url_grid = "././data/grid/grid.geojson"
var url_gridlabels = "././data/grid/grid_labels.geojson"

// Functions
function gridStyle(feature){
    return {
        fillColor: 'white',
        fillOpacity: 0,
        weight: 1,
        opacity: 0.25,
        color: '#d39178'
  }
}

function bindGridTooltip(feature,layer){
    if (feature.properties){
        layer.bindTooltip(feature.properties.label,{
            permanent: true, 
            direction:"center",
            className: 'leaflet-tooltip-crd' 
        })
    }
}

function pointToLayerGridPoints(feature,latlng) {
    return L.circleMarker(latlng, {
        SIZE:0,
        opacity: 0,
    }
    );
}

// Create layers
var grid = L.geoJSON(null,{
    pane:'grid',
    style:gridStyle
});
$.getJSON(url_grid, function(data) {
    grid.addData(data);
});

//// Add data to map
var grid_labels = L.geoJSON(null,{
    pane:'grid_labels',
    onEachFeature:bindGridTooltip,
    pointToLayer:pointToLayerGridPoints
});

$.getJSON(url_gridlabels, function(data) {
    grid_labels.addData(data);
});

var completegrid = L.layerGroup([grid,grid_labels]);

//// Search grid cell

function getGeom(feature){
    return feature.geometry.coordinates
}

//Function to highlight a grid square on the map according to its coordinates
var select = L.geoJSON()
function zoomOn(){
    
    var num = document.getElementById("line_num").value
    console.log(num)
    var letter = document.getElementById("col_letter").value.toUpperCase()
    console.log(letter)

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
            return (feature.properties.line == num && feature.properties.col == letter);

        }
    });
    $.getJSON(url_grid, function(data) {
        select.addData(data);
        console.log(select.getBounds().getCenter());
        map.fitBounds(select.getBounds());
    });
    select.addTo(map)
    
    map.on('click', function() {
        map.fitBounds(select.getBounds());
        map.setView([-250.0,0], -2);
    });
  };

document.getElementById("gridsearchbut").addEventListener("click", e => zoomOn());

// Function to reset the grid search tool
function removeGridPointer(geoJsonMain, responseJson) {
    if(select){
      select.removeFrom(map);
    }
    document.getElementById("line_num").value = ""
    document.getElementById("col_letter").value = ""
    map.setView([-250.0,0], -2);
}
document.getElementById("gridsearchreset").addEventListener("click", e => removeGridPointer());