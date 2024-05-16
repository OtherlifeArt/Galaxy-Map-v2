/***************** VARS *************************/
var dragPointsStatus = false
var draggedPoints = []
let completedCount = 0;

/***************** FUNCTIONS ********************/
function enableEditingForTargetFeature(targetFeature) {
    // Enable editing for the target feature using Leaflet-Geoman
    targetFeature.pm.enable();
}

function removeArrayWithFirstValue(arrays, testedValue) {
    for (var i = 0; i < arrays.length; i++) {
      if (arrays[i][0] === testedValue) {
        arrays.splice(i, 1); // Remove the array at index i
      }
    }
    return arrays
  }

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

function executeDragUpdate() {
    const sheetRange = `!${SPREADSHEET_HEADERS.OBJECT_SOURCES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECT_SOURCES.LAST_COLUMN_REF()}`;
    draggedPoints.forEach(async (innerArray) => {
        await updateSpreadSheetRowDataDragPoints(SPREADSHEET_ID, SHEETS.OBJECTS, sheetRange, SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID, innerArray);
        completedCount++;
    })
    draggedPoints = []
}

/***************** EVENTS ********************/
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

// Listen if the points are dragenable
points.on('pm:dragenable', function(e) {
    dragPointsStatus = true
})

// Listen for dragend events on the GeoJSON layer
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

//Listen on drag end event
points.on('pm:dragdisable', function(e) {
    dragPointsStatus = false
})

// Add event listener to the button
document.getElementById('geom-edit-points-save').addEventListener('click', executeDragUpdate);
