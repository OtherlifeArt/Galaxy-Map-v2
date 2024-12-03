/* CONSTANTS */
const GEOJSON_EXPORT_PARAMETERS = {
  POINTS: {
    VALID_TYPES: [
      // Coordinates required
      { NAME: 'Area', COORD: true}, { NAME: 'Region', COORD: true}, { NAME: 'Sector', COORD: true},
      // No coordinates required
      { NAME: 'Galaxy'}, { NAME: 'Quasar'},
      { NAME: 'Unknown'}, { NAME: 'Location'}, { NAME: 'Exotic'}, { NAME: 'Natural Object'}, { NAME: 'Artificial Object'}, { NAME: 'Anomaly'}, { NAME: 'Void Space'},
      { NAME: 'Interstellar Matter'}, { NAME: 'Nebula'}, { NAME: 'Interstellar Cloud'},
      { NAME: 'Planet'}, { NAME: 'Planet Barycenter'}, { NAME: 'Rogue Planet'}, { NAME: 'Dwarf Planet'},
      { NAME: 'Moon'},  { NAME: 'Rogue Moon'}, { NAME: 'Dwarf Moon'},
      { NAME: 'Asteroid'}, { NAME: 'Asteroid Belt'}, { NAME: 'Asteroid Field'},
      { NAME: 'Comet'}, { NAME: 'Rogue Comet'}, { NAME: 'Comet Cluster'},
      { NAME: 'Star'}, { NAME: 'Star Barycenter'}, { NAME: 'Star Cluster'}, { NAME: 'Star System'},
      { NAME: 'Rings'},
    ],
  },
  AREAS: {},
  // ROUTES: {},
};

/* VARIABLES */

/* FUNCTIONS */
// Function to fetch data from Google spreadsheet and return a GeoJSON object containg poctual localized objects
function fetchSheetDataPoints(spreadsheetId, sheetName) {

  return new Promise((resolve, reject) => {
    const sheetRange = `!A:BD`;
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: sheetName + sheetRange
    }).then(function(response) {
      console.log(response)
        var values = response.result.values;
        if (values.length > 0) {
            var headerRow = values[0];
            var xCoordIndex = SPREADSHEET_HEADERS.OBJECTS.COLUMNS.X_COORD;
            // var xCoordIndex = headerRow.indexOf('X_COORD');
            var yCoordIndex = SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Y_COORD;
            // var yCoordIndex = headerRow.indexOf('Y_COORD');
            var features = [];
            for (var i = 1; i < values.length; i++) { // Start from 1 to skip header row
                var row = values[i];
                // Test wether coordinates are empty or undefined
                var xCoord = row[xCoordIndex] && row[xCoordIndex] !== "" ? parseFloat(row[xCoordIndex]) : null;
                var yCoord = row[yCoordIndex] && row[yCoordIndex] !== "" ? parseFloat(row[yCoordIndex]) : null;
                // if (isNaN(xCoord) === false && isNaN(yCoord) === false) { // Check if X_COORD and Y_COORD are not empty
                // We skip invalid objects by forcing for loop to go to next iteration
                const validTypeFound = GEOJSON_EXPORT_PARAMETERS.POINTS.VALID_TYPES.find(type => type.NAME.toLowerCase() === row[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE].toLowerCase());
                if(validTypeFound === undefined || ((xCoord === null || yCoord === null) && validTypeFound.COORD === true)
                ) {
                  continue;
                }
                // Empty coordinates condition removed since null coordinates will be ignored on map 
                // or star system inner object will be referenced by star system parent object
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
              // }
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

  // Function to trigger download of GeoJSON Route file
async function downloadLinesGeoJSON() {
  const spreadsheetId = SPREADSHEET_ID;
  const routeSheetName = SHEETS.HYPERROUTES.NAME;
  const routeSectionSheetName = SHEETS.HYPERROUTE_SECTIONS.NAME;
  await fetchDataLines(spreadsheetId, routeSheetName, routeSectionSheetName).then(function(geojson) {
    // Convert GeoJSON to string
    const geojsonStr = JSON.stringify(geojson);

    // Create Blob
    const blob = geoJSONPointDBFile = new Blob([geojsonStr], { type: 'application/json' });

    // Create download link
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'SW_Map_Lines.geojson';
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

// Function to fetch data hyperroute and hyperroute section data already loaded from Google spreadsheet and return a GeoJSON object containing line objects
function fetchDataLines() {
  // Iterate throught hyperroutes data
  return hyperrouteArray.map((hyperroute) => {
    // Build hyperroute section data as MultiLineString
    const hyperrouteLineSectionData = []; // Array of section forming a line (no branch)
    const hyperrouteLineSectionCoords = []; // Array of section forming a line (no branch) (coordinates only)
    let lastLocationBCoords = null;
    for (const section of hyperroute.sections) {

      if((section.locationACoord === null && section.locationAId === "") || (section.locationBCoord === null && section.locationBId === "")) {
        continue; // Skip this hyperroute section since location A or B is not available
      }

      const locationACoord = section.locationACoord === null ? astronomicalObjectSearchArray.find((astroObject) => {
        // console.log(astroObject);
        return astroObject.id === section.locationAId // Find astro object
        }).coords
        : section.locationACoord;

      console.log(astronomicalObjectSearchArray.find((astroObject) => {
        // console.log(astroObject);
        return astroObject.id === section.locationBId // Find astro object
      }));
      const locationBCoord = section.locationBCoord === null ? astronomicalObjectSearchArray.find((astroObject) => {
        // console.log(astroObject);
        return astroObject.id === section.locationBId // Find astro object
      }).coords
      : section.locationBCoord;
      
      // Detection of route branch
      if(lastLocationBCoords === null || (lastLocationBCoords[0] !== locationACoord[0] && lastLocationBCoords[1] !== locationACoord[1])) {
        // Add first route point
        const locationACoords = [locationACoord[0], locationACoord[1]];
        hyperrouteLineSectionData[hyperrouteLineSectionData.length] = [{coords : locationACoords}];
        hyperrouteLineSectionCoords[hyperrouteLineSectionCoords.length] = [locationACoords];
      }
      
      // Add route point
      const locationBCoords = [locationBCoord[0], locationBCoord[1]];
      lastLocationBCoords = locationBCoords;
      hyperrouteLineSectionData[hyperrouteLineSectionData.length-1].push({ 
          coords : locationBCoords,
          averageTravelTime: section.averageTravelTime,
          continuity: section.continuity,
          desc: section.desc,
          placementCert: section.placementCert
      });
      hyperrouteLineSectionCoords[hyperrouteLineSectionCoords.length-1].push(locationBCoords);
    }

    return {
      // Put all together
      "type": "Feature",
      "geometry": {
          "type": "MultiLineString",
          "coordinates": hyperrouteLineSectionCoords,
      },
      "properties": {
        ID: hyperroute.id,
        NAME: hyperroute.name,
        ALT_NAMES: hyperroute.altNames,
        PARENT_ID: hyperroute.parentId,
        PARENT_NAME: hyperroute.parentName,
        DATE_FROM: hyperroute.dates[0],
        DATE_TO: hyperroute.dates[1],
        CANON: hyperroute.continuity.canon,
        LEGENDS: hyperroute.continuity.legends,
        UNLICENSED: hyperroute.continuity.unlicensed,
        LEVEL: hyperroute.level,
        ZOOM_LEVEL: hyperroute.zoomLevel,
        CONJECTURAL_NAME: hyperroute.conjName,
        URLS: hyperroute.urls,
        DESC: hyperroute.desc,
        // LINE_STRINGS: hyperroute.sections.map((hyperrouteSection) => ({
        SECTIONS_PROPERTIES: hyperrouteLineSectionData
        // })),
      },
    }
  });
}


  /**
   * MAP DATA EVENT LISTENERS
   */
  // Add event listener to download button
  document.getElementById('downloadPointsButton').addEventListener('click', downloadPointsGeoJSON);
  document.getElementById('downloadLinesButton').addEventListener('click', downloadLinesGeoJSON);


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