// Initialize Leaflet Geoman
map.pm.addControls({
    position: 'topleft',
    drawMarker: false,
    drawCircleMarker: false,
    drawCircle: false,
    drawPolyline: false,
    drawPolygon: false,
    drawRectangle: false,
    drawText: false,
    editMode: false,
    dragMode:false,
    cutPolygon:false,
    removalMode:false,
    rotateMode:false
  });


//Choose Leaflet Geoman mode for editing depending on the type of geometry
function updateGeomanControl(event) {
    var selectedType = event.target.value;
    
    if (selectedType === 'geom-edit-points') {
        map.pm.addControls({
            dragMode:true,
            editMode:false,
            drawPolyline: false,
            cutPolygon:false,
            removalMode: false})
        points.options.pmIgnore = false
        points.options.snapIgnore = true
        areas.options.pmIgnore = true
        roads.options.pmIgnore = true
    } else if (selectedType === 'geom-edit-roads') {
        map.pm.addControls({
            dragMode:false,
            drawPolyline: true,
            editMode:true,
            cutPolygon:false,
            removalMode: true});
        points.options.pmIgnore = true
        points.options.snapIgnore = false
        areas.options.pmIgnore = true
        roads.options.pmIgnore = false
        roads.options.snapIgnore = false
    } else if (selectedType === 'geom-edit-areas') {
        map.pm.addControls({
            dragMode:false,
            editMode:true,
            cutPolygon:true,
            removalMode: false
        });
        points.options.pmIgnore = true
        points.options.snapIgnore = true,
        areas.options.pmIgnore = false
        roads.options.pmIgnore = true
    } else if (selectedType === 'geom-edit-disabled') {
        map.pm.addControls({
            dragMode:false,
            editMode:false,
            cutPolygon:false,
            drawPolyline: false,
            removalMode: false
        });
        points.options.pmIgnore = true
        points.options.snapIgnore = true,
        areas.options.pmIgnore = true
        roads.options.pmIgnore = true
    }
  }

// Add event listener to radio buttons
var radioButtons = document.querySelectorAll('input[name="geom-edit"]');
radioButtons.forEach(function(radioButton) {
  radioButton.addEventListener('change', updateGeomanControl);
});

// Assuming you have a Leaflet map 'map' and a GeoJSON layer 'geojsonLayer' containing your features

// Function to enable editing for the target feature
function enableEditingForTargetFeature(targetFeature) {
    // Enable editing for the target feature using Leaflet-Geoman
    targetFeature.pm.enable();
}

// Listen for click event on the GeoJSON layer
points.on('click', function(e) {
    const clickedFeature = e.layer;
    const targetFeatureID = clickedFeature.feature.properties.ID;

    if (targetFeatureID) {
        enableEditingForTargetFeature(clickedFeature);
    } else {
        console.error("Feature ID not found.");
    }
});

var dragPointsStatus = false
var draggedPoints = []

function removeArrayWithFirstValue(arrays, testedValue) {
    for (var i = 0; i < arrays.length; i++) {
      if (arrays[i][0] === testedValue) {
        arrays.splice(i, 1); // Remove the array at index i
      }
    }
    return arrays
  }

points.on('pm:dragenable', function(e) {
    dragPointsStatus = true
})

// Listen for Leaflet-Geoman's dragend events on the GeoJSON layer
points.on('pm:dragend', function(e) {
    const draggedLayer = e.layer;
    const featureID = draggedLayer.feature.properties.ID;

    if (featureID) {
        var newCoordinates = e.layer.getLatLng();
        // Send updated coordinates to the database
        var x = newCoordinates.lng.toString().replace(/,/g, '.');
        var y = newCoordinates.lat.toString().replace(/,/g, '.');
        var newArray = [featureID,x,y]
        draggedPoints = removeArrayWithFirstValue(draggedPoints,featureID) 
        draggedPoints.push(newArray)
        console.log(draggedPoints)
    } else {
        console.error("Feature ID not found.");
    }
});

points.on('pm:dragdisable', function(e) {
    dragPointsStatus = false
})


async function updateSpreadSheetRowDataDragPoints(spreadsheetId, sheetIdNameEntry, sheetRange, objectIdColumnNumber, dataRowToUpdate) {
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: sheetIdNameEntry.NAME + sheetRange,
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      alert(err.message);
      return;
    }
    console.log("Results :", response.result);
    const range = response.result;
    const values = range.values;
    if (!range || !values || values.length == 0) {
      console.err('No data/spreadsheet found.');
      return false;
    }
  
    // Find row number matching technical ID and return it
    const rowIndex = values.findIndex((row) => row[objectIdColumnNumber] === dataRowToUpdate[objectIdColumnNumber]);
  
    if (rowIndex === -1) {
      console.log('Value not found.');
      console.error('Value not found in spreadsheet.');
      return false;
    } else {
      console.log(`Row number where the value is found: ${rowIndex + 1}`);
      console.log(values[rowIndex]);
  
      // Update row
      var coords = [dataRowToUpdate[1],dataRowToUpdate[2]]
      try {
        response = await gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: spreadsheetId,
          range: sheetIdNameEntry.NAME + `!S${rowIndex + 1}:T${rowIndex + 1}`,
          valueInputOption: "RAW",
          majorDimension: "ROWS",
          values: [coords]
        });
      } catch (err) {
        document.getElementById('content').innerText = err.message;
        // alert(err.message);
        return false;
      }
      console.log("Object updated :", response.result);
      return true;
    }
  }
  
// Function to execute when the button is clicked
let completedCount = 0;
function executeDragUpdate() {
    const sheetRange = `!${SPREADSHEET_HEADERS.OBJECT_SOURCES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECT_SOURCES.LAST_COLUMN_REF()}`;
    draggedPoints.forEach(async (innerArray) => {
        await updateSpreadSheetRowDataDragPoints(SPREADSHEET_ID, SHEETS.OBJECTS, sheetRange, SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID, innerArray);
        completedCount++;
    })
    draggedPoints = []
}

// Add event listener to the button
document.getElementById('geom-edit-points-save').addEventListener('click', executeDragUpdate);

/*******************************************************/
/*********************** LINES *************************/
/*******************************************************/

// Init variables
var drawnItems = new L.FeatureGroup();
/*map.createPane('drawnItems');
map.getPane('drawnItems').style.zIndex = 600;
drawnItems.setPane('drawnItems');*/
map.addLayer(drawnItems);
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
    var inputElement = document.getElementById('object-geom');
    var geometryValue = inputElement.value;

    if (geometryValue) {
        var coordinates = JSON.parse(geometryValue);
        console.log(coordinates)
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
    var inputElement = document.getElementById('object-geom');
    inputElement.value = '';
    document.getElementById('object-geom-type').value = '';
}
document.getElementById('geom-create-road-clear').addEventListener('click', clearGEOMField);


map.on('pm:create', function(e) {
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
        var inputElement = document.getElementById('object-geom');
        document.getElementById('object-geom-type').value = 'MultiLineString';
        //document.getElementById('object-ponctual').checked = false;
        console.log(lastEditedCoordinates);
        inputElement.value = JSON.stringify(lastEditedCoordinates);
    } else {
        alert("No geometry has been edited yet.");
    }
});