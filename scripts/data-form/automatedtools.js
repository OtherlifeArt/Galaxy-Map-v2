/* VARIABLES */
// point geojson db
let geoJSONPointDBFile = null;

/* FUNCTIONS */
// Function to fetch data from Google spreadsheet and return a GeoJSON object containg poctual localized objects
function fetchSheetDataPoints(spreadsheetId, sheetName) {

    return new Promise((resolve, reject) => {
      const sheetRange = `!A:AP`;
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: sheetName + sheetRange
      }).then(function(response) {
        console.log(response)
          var values = response.result.values;
          if (values.length > 0) {
              var headerRow = values[0];
              var xCoordIndex = headerRow.indexOf('X_COORD');
              var yCoordIndex = headerRow.indexOf('Y_COORD');
              var features = [];
              for (var i = 1; i < values.length; i++) { // Start from 1 to skip header row
                  var row = values[i];
                  var xCoord = parseFloat(row[xCoordIndex]);
                  var yCoord = parseFloat(row[yCoordIndex]);
                  if (isNaN(xCoord) === false && isNaN(yCoord) === false) { // Check if X_COORD and Y_COORD are not empty 
                    var feature = {
                          "type": "Feature",
                          "geometry": {
                              "type": "Point",
                              "coordinates": [xCoord, yCoord]
                          },
                          "properties": {}
                      };
                      // Add other properties
                      for (var j = 0; j < headerRow.length; j++) {
                          feature.properties[headerRow[j]] = row[j];
                      }
                      features.push(feature);
                  }
              }
              var geojson = {
                  "type": "FeatureCollection",
                  "features": features
              };
              resolve(geojson);
          } else {
              console.log('No data found.');
              reject('No data found');
          }
      }).catch(function(error) {
          console.error('Error fetching data from spreadsheet:', error);
          reject(error);
      });
    });
  }

// Function to download GeoJSON point file
function downloadPointsGeoJSONFile() {
  if(geoJSONPointDBFile !== null) {
    // Create download link
    let a = document.createElement('a');
    let url = URL.createObjectURL(geoJSONPointDBFile);
    a.href = url;
    a.download = 'SW_Map_Points.geojson';
    document.body.appendChild(a);
    // Trigger download
    a.click();
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } else {
    alert("Click 'Re.Load Points' button first !");
  }
}
  
// Function to trigger download of GeoJSON file
async function downloadPointsGeoJSON() {
    var spreadsheetId = SPREADSHEET_ID
    var sheetName = SHEETS.OBJECTS.NAME
    await fetchSheetDataPoints(spreadsheetId, sheetName).then(function(geojson) {
      // Convert GeoJSON to string
      var geojsonStr = JSON.stringify(geojson);
  
      // Create Blob
      var blob = geoJSONPointDBFile = new Blob([geojsonStr], { type: 'application/json' });
  
      // Create download link
      var a = document.createElement('a');
      var url = URL.createObjectURL(blob);
      a.href = url;
      a.download = 'SW_Map_Points.geojson';
      document.body.appendChild(a);
  
      // Trigger download
      a.click();
  
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }).catch(function(error) {
      console.error('Error generating GeoJSON:', error);
    });
  }


  /**
   * MAP DATA EVENT LISTENERS
   */
  // Add event listener to download button
  document.getElementById('downloadPointsButton').addEventListener('click', downloadPointsGeoJSON);


/**
 * Batch update object parent name into spreadsheet
 */
async function batchUpdateAllObjectReadableNames() {
  document.getElementById('spreadsheet-data-batch-update-object-readable-names-button').disabled = true;
  let batchDataCellToUpdate = [];
  // get all objects
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.OBJECTS.NAME, `!${convertSpreadsheetColumnNumberToLetters(SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID)}2:${convertSpreadsheetColumnNumberToLetters(SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ORBITAL_RANK)}`);
  const data = spreadSheetData.values;
  for (const object of data) {
    let objectToUpdate = [];
    const objectId = object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID];
    const objectName = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NAME]);
    const orbitalRank = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ORBITAL_RANK]);
    const altName = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ALT_NAMES]);
    // Generate readable name
    const nameString = convertObjectNameToHumanReadableName(objectName, altName, orbitalRank, objectId);
    // compare new and old parent string, update if different
    if(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.HUMAN_NAME] !== nameString) {
      objectToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] = objectId;
      objectToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.HUMAN_NAME] = nameString;
      // console.log(objectToUpdate);
      batchDataCellToUpdate.push(objectToUpdate);
    }
  }
  // Update parent names
  const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF()}`;
  const cellRangeToUpdate = [ SPREADSHEET_HEADERS.OBJECTS.COLUMNS.HUMAN_NAME, SPREADSHEET_HEADERS.OBJECTS.COLUMNS.HUMAN_NAME];
  const updateResult = await updateSpreadSheetBatchCellRangeData(SPREADSHEET_ID, SHEETS.OBJECTS, sheetRange, SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID, batchDataCellToUpdate, cellRangeToUpdate);
  if(updateResult) {
    alert(`Object readable names are sucessfully updated into spreadsheet ! Reloading form`);
    // Reload wizard and objects
    await refreshForm();
    refreshDatatable("objectDatatable");
    initWizard();
  } else {
    alert("Error encoutered on Object readable name update ! Check console (F12) for more details");
  }
  document.getElementById('spreadsheet-data-batch-update-object-readable-names-button').disabled = false;
}

/**
 * Batch update object human readable name into spreadsheet
 */
async function batchUpdateAllObjectParentReadableNames() {
  document.getElementById('spreadsheet-data-batch-update-object-redable-parent-names-button').disabled = true;
  let batchDataCellToUpdate = [];
  // get all objects
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.OBJECTS.NAME, `!${convertSpreadsheetColumnNumberToLetters(SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID)}2:${convertSpreadsheetColumnNumberToLetters(SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_HUMAN)}`);
  const data = spreadSheetData.values;
  for (const object of data) {
    let objectToUpdate = [];
    const objectId = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID]);
    const parentID = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_ID]);
    // Generate parent hierarchy string
    const parentNameString =  await getParentHierarchy(objectId, null, data, false);
    // compare new and old parent string, update if different
    if(parentID != "" && object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_HUMAN] !== parentNameString) {
      objectToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] = objectId;
      objectToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_HUMAN] = parentNameString;
      // console.log(objectToUpdate);
      batchDataCellToUpdate.push(objectToUpdate);
    }
  }
  // Update parent names
  const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF()}`;
  const cellRangeToUpdate = [ SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_HUMAN, SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_HUMAN];
  const updateResult = await updateSpreadSheetBatchCellRangeData(SPREADSHEET_ID, SHEETS.OBJECTS, sheetRange, SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID, batchDataCellToUpdate, cellRangeToUpdate);
  if(updateResult) {
    alert(`Object parents names are sucessfully updated into spreadsheet ! Reloading form`);
    // Reload wizard and objects
    await refreshForm();
    refreshDatatable("objectDatatable");
    initWizard();
  } else {
    alert("Error encoutered on Object parent name update ! Check console (F12) for more details");
  }
  document.getElementById('spreadsheet-data-batch-update-object-redable-parent-names-button').disabled = false;
} 

/**
 * Spreadsheet DATA EVENT LISTENERS
 */
// Event listener to batch update object parent name into spreadsheet
document.getElementById('spreadsheet-data-batch-update-object-readable-names-button').addEventListener('click', function() {
  batchUpdateAllObjectReadableNames()
});
// Event listener to batch update object human readable name into spreadsheet
document.getElementById('spreadsheet-data-batch-update-object-redable-parent-names-button').addEventListener('click', function() {
  batchUpdateAllObjectParentReadableNames()
});