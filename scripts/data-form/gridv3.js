// Paths to data
var url_grid = "././data/grid/grid.geojson"
var url_gridlabels = "././data/grid/grid_labels.geojson"

// Grid squares for grid search
var gridsearch = L.geoJSON(null,{
    pane:'grid_search',
    pmIgnore:true,
    snapIgnore: true
});
$.getJSON(url_grid, function(data) {
    gridsearch.addData(data);
});

function getGeom(feature){
    return feature.geometry.coordinates
}

// Grid labels
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
        radius:0,
        opacity: 0,
        interactive: false,
        pmIgnore:true,
        snapIgnore: true
    }
    );
}

var grid_labels = L.geoJSON(null,{
    pane:'grid_labels',
    onEachFeature:bindGridTooltip,
    pointToLayer:pointToLayerGridPoints,
    pmIgnore:true,
    snapIgnore: true,
    interactive: false
});

$.getJSON(url_gridlabels, function(data) {
    grid_labels.addData(data);
});

// Define grid options
var grid100Options = {
    weight: 1,
    color: '#d39178',
    opacity: 0.5,
    interactive: false,
    pmIgnore:true,
    snapIgnore: true
};

var grid10Options = {
    weight: 0.2,
    color: '#000',
    opacity: 0.5,
    interactive: false,
    pmIgnore:true,
    snapIgnore: true
};

var grid1Options = {
    weight: 0.15,
    color: '#000',
    opacity: 0.5,
    interactive: false,
    pmIgnore:true,
    snapIgnore: true
};

// Create feature groups
var grid100 = new L.FeatureGroup(null,{interactive: false,pmIgnore:true,snapIgnore:true});
var grid10 = new L.FeatureGroup(null,{interactive: false,pmIgnore:true,snapIgnore:true});
var grid1 = new L.FeatureGroup(null,{interactive: false,pmIgnore:true,snapIgnore:true});

// Define full grid layer
var completegrid = L.layerGroup([grid_labels,grid100],{ 
    pane:'grid',
    pmIgnore:true,
    snapIgnore:true,
    interactive: false});

// Add grid lines for squares of 100 meters (zoom -3 to -8)
for (var i = -1100; i <= 1200; i += 100) {
    grid100.addLayer(L.polyline(
        [[900,i], [-1400,i]],
        grid100Options
    ));
}

for (var j = 900; j >= -1400; j -= 100) {
    grid100.addLayer(L.polyline(
        [[j,-1100], [j,1200]],
        grid100Options
    ));
}

// Add grid lines for squares of 10 meters (zoom 1 to 8)
for (var i = -1100; i <= 1200; i += 10) {
    grid10.addLayer(L.polyline(
        [[900,i], [-1400,i]],
        grid10Options
    ));
}

for (var j = 900; j >= -1400; j -= 10) {
    grid10.addLayer(L.polyline(
        [[j,-1100], [j,1200]],
        grid10Options
    ));
}

// Add grid lines for squares of 1 meter (zoom 5 to 8)
for (var i = -1100; i <= 1200; i += 1) {
    grid1.addLayer(L.polyline(
        [[900,i], [-1400,i]],
        grid1Options
    ));
}

for (var j = 900; j >= -1400; j -= 1) {
    grid1.addLayer(L.polyline(
        [[j,-1100], [j,1200]],
        grid1Options
    ));
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
        pane:'grid_search',
        style:{
            fillColor: 'white',
            fillOpacity: 0,
            weight: 4,
            opacity: 0.8,
            color: '#4BF5DE'
        },
        pmIgnore:true,
        snapIgnore: true,
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
    
    select.on('click', function() {
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