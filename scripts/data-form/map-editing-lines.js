/*******************************************************/
/*********************** LINES *************************/
/*******************************************************/

// Init variables
var drawnItems = new L.FeatureGroup([]);
map.addLayer(drawnItems);
drawnItems.setZIndex(2000)
var maxShapes = 1;
var shapesDrawn = 0;
var lastEditedCoordinates = null;

function inverseLatLong(points) {
    // Iterate over each point in the array
    var invertedPoints = points.map(function(point) {
        // Swap latitude and longitude values
        return [point[1], point[0]];
    });
    return invertedPoints;
}

function addGeometryFromInput() {
    var inputElement = document.getElementById('hyperroute-geom');
    var geometryValue = inputElement.value;

    if (geometryValue) {
        var coordinates = JSON.parse(geometryValue);
        //console.log(coordinates)
        //Create a polyline object with GEOM column value
        var geometry = L.polyline(coordinates);
        drawnItems.clearLayers();
        drawnItems.addLayer(geometry);
        shapesDrawn = 1
        lastEditedCoordinates = coordinates
    } else {
        alert("No geometry value found in the input.");
    }
}
document.getElementById('geom-create-road-load').addEventListener('click', addGeometryFromInput);

function clearGEOMField(){
    var inputElement = document.getElementById('hypperoute-geom');
    inputElement.value = '';
    document.getElementById('hypperroute-geom-type').value = '';
}
document.getElementById('geom-create-road-clear').addEventListener('click', clearGEOMField);


map.on('pm:create', function(e) {
    e.layer.bringToFront()
    if (e.layer instanceof L.Polyline) {
        lastEditedCoordinates = e.layer.toGeoJSON().geometry.coordinates; // Get array of LatLng coordinates
        lastEditedCoordinates = inverseLatLong(lastEditedCoordinates)
        console.log("Initial geometry:", lastEditedCoordinates);
    }

    if (shapesDrawn < maxShapes) {
        drawnItems.addLayer(e.layer);
        shapesDrawn++;

        // Add event listener for editing
        e.layer.on('pm:edit', function(editEvent) {
            lastEditedCoordinates = editEvent.layer.toGeoJSON().geometry.coordinates;
            lastEditedCoordinates = inverseLatLong(lastEditedCoordinates)
            console.log("Edited geometry:", lastEditedCoordinates);
        });
    } else {
        alert("You have reached the maximum number of shapes allowed.");
        map.removeLayer(e.layer);
    }
});

drawnItems.on('pm:edit', function (e) {
    e.layer.bringToFront()
    lastEditedCoordinates = e.layer.toGeoJSON().geometry.coordinates;
    lastEditedCoordinates = inverseLatLong(lastEditedCoordinates)
    console.log("Edited geometry:", lastEditedCoordinates);
});

// Listen for removal event
map.on('pm:remove', function(e) {
    shapesDrawn--;
    lastEditedCoordinates = null;
});

// Handle button click event
document.getElementById('geom-create-road-save').addEventListener('click', function() {
    if (lastEditedCoordinates) {
        // Send last edited coordinates to an HTML input
        var inputElement = document.getElementById('hyperroute-geom');
        document.getElementById('hyperroute-geom-type').value = 'MultiLineString';
        console.log(lastEditedCoordinates);
        inputElement.value = JSON.stringify(lastEditedCoordinates);
    } else {
        alert("No geometry has been edited yet.");
    }
});