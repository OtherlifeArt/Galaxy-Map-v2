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
    const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF()}`;
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
  const geojson = await fetchDataLines(spreadsheetId, routeSheetName, routeSectionSheetName);
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
}

// Function to fetch data hyperroute and hyperroute section data already loaded from Google spreadsheet and return a GeoJSON object containing line objects
async function fetchDataLines() {
  // refresh data
  await refreshForm();
  await refreshHyperrouteForm();
  // Iterate throught hyperroutes data
  // const hyperrouteFeatures = hyperrouteArray.map((hyperroute) => {
  let hyperrouteFeatures = [];
  for (const hyperroute of hyperrouteArray) {
    // Build hyperroute section data as MultiLineString
    const hyperrouteLineSectionData = []; // Array of section forming a line (no branch)
    const hyperrouteLineSectionCoords = []; // Array of section forming a line (no branch) (coordinates only)
    let lastLocationBCoords = null;
    for (const section of hyperroute.sections) {

      if((section.locationACoord === null && section.locationAId === "") || (section.locationBCoord === null && section.locationBId === "")) {
        continue; // Skip this hyperroute section since location A or B is not available
      }

      console.log(section.locationAText);
      const locationACoord = section.locationACoord === null ? astronomicalObjectSearchArray.find((astroObject) => {
        return astroObject.id === section.locationAId // Find astro object
        }).coords
        : section.locationACoord;

      // console.log(astronomicalObjectSearchArray.find((astroObject) => {
      //   // console.log(astroObject);
      //   return astroObject.id === section.locationBId // Find astro object
      // }));
      console.log(section.locationBText);
      const locationBCoord = section.locationBCoord === null ? astronomicalObjectSearchArray.find((astroObject) => {
        return astroObject.id === section.locationBId // Find astro object
      }).coords
      : section.locationBCoord;
      
      // Detection of route branch
      if(lastLocationBCoords === null || (lastLocationBCoords[0] !== parseFloat(locationACoord[0]) && lastLocationBCoords[1] !== parseFloat(locationACoord[1]))) {
        // Add first route point
        const locationACoords = [parseFloat(locationACoord[0]), parseFloat(locationACoord[1])];
        hyperrouteLineSectionData[hyperrouteLineSectionData.length] = [{
          text: section.locationAText,
          coords : locationACoords,
        }];
        hyperrouteLineSectionCoords[hyperrouteLineSectionCoords.length] = [locationACoords]; // New linestring
      }
      
      // Add route point
      const locationBCoords = [parseFloat(locationBCoord[0]), parseFloat(locationBCoord[1])];
      lastLocationBCoords = locationBCoords;
      hyperrouteLineSectionData[hyperrouteLineSectionData.length-1].push({
          text: section.locationBText,
          coords : locationBCoords,
          averageTravelTime: section.averageTravelTime,
          continuity: section.continuity,
          desc: section.desc,
          placementCert: section.placementCert
      });
      hyperrouteLineSectionCoords[hyperrouteLineSectionCoords.length-1].push(locationBCoords); // Append to linestring
    }

    // Return if coordinate array is not empty (i.e. road has at least a point)
    if(hyperrouteLineSectionCoords.length > 0) {
      hyperrouteFeatures.push({
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
          TYPE: "Hyperspace Route",
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
          color: hyperroute.color,
          weight: hyperroute.weight,
          opacity: hyperroute.opacity,
          smoothFactor: hyperroute.smoothFactor,
          // LINE_STRINGS: hyperroute.sections.map((hyperrouteSection) => ({
          SECTIONS_PROPERTIES: hyperrouteLineSectionData
          // })),
        },
      });
    }
  };

  return {
    "type": "FeatureCollection",
    "name": "roads",
    "features": hyperrouteFeatures
  }  
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
 * Format and download CSV for location designer tool 
 */
async function formatAndDownloadDATAForLocationDesigner() {
  // get all objects

  // Object spreadsheet
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.OBJECTS.NAME, `!${convertSpreadsheetColumnNumberToLetters(SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID)}2:${convertSpreadsheetColumnNumberToLetters(SPREADSHEET_HEADERS.OBJECTS.COLUMNS.URL)}`);
  const data = spreadSheetData.values;
  // Hyperroute section spreadsheet
  const hyperrouteSectionSpreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.HYPERROUTE_SECTIONS.NAME, `!${convertSpreadsheetColumnNumberToLetters(SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.ID)}2:${convertSpreadsheetColumnNumberToLetters(SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_COORD_Z)}`);
  const hyperrouteSectionData = hyperrouteSectionSpreadSheetData.values;
  // Hyperroute spreadsheet
  const hyperrouteSpreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.HYPERROUTES.NAME, `!${convertSpreadsheetColumnNumberToLetters(SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID)}2:${convertSpreadsheetColumnNumberToLetters(SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.TRADE_ROUTE_LEVEL)}`);
  const hyperrouteData = hyperrouteSpreadSheetData.values;

  // Unammed route section point index counter
  let unnamedRouteSectionIndexCounter = 0;
  
  // Table structure
  const locationDesignerDataTable = [];
  locationDesignerDataTable.push(['Region', 'Sector', 'System', 'Planet', 'X', 'Y', 'Z', 'Planet link', 'Region link', 'System link', 'Sector link', 'Grid', 'technicalId', 'Connections']);
  // Format
  for (let index = 1; index < data.length; index++) {
    const object = data[index];
    // Only include object with coordinates
    // X
    const xCoord = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.X_COORD]);
    // Y
    const yCoord = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Y_COORD]);
    // Z
    const zCoord = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Z_COORD]);

    // We check only objects withh coordinates
    if(xCoord !== "" && yCoord !== "") {
      const objectID = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID]);
      const parentID = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_ID]);
      const parentObject = data.find(object => sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID]) === parentID);
      const grandParentObject = parentObject !== undefined  && sanitizeText(parentObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_ID]) !== "" ?
        data.find(object => object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] === sanitizeText(parentObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_ID])) : undefined;

      // Object Name
      const astroObject = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NAME]);
      // System (ignored)
      const system = "";
      // Sector or parent object
      const sector = parentObject !== undefined ? sanitizeText(parentObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NAME]) : "";
      // Region or sector parent object
      const region = grandParentObject !== undefined ? sanitizeText(grandParentObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NAME]) : "";
      // Object link
      const link = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.URL]).split(",")[0];
      // System link (ignored)
      const systemLink = "";
      // Sector link
      const sectorLink = parentObject !== undefined ? sanitizeText(parentObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.URL]).split(",")[0] : "";
      // Region link
      const regionLink = grandParentObject !== undefined ? sanitizeText(grandParentObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.URL]).split(",")[0] : "";
      // Grid
      const grid = sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Y_GRID]) === "" ?
        "" : sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.X_GRID]) + "-" + sanitizeText(object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Y_GRID]);
      // Technical ID
      const techId = objectID;
      // Connections (comma separated list of object connexion to other objects with route level between parentheses)
      const connections = hyperrouteSectionData.filter((section) => 
        sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_ID]) === techId || sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_ID]) === techId)
      .map(filteredSection => {
        const hyperrouteLevel = hyperrouteData.find((hyperroute) => 
          sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID]) === sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.HYPERROUTE_ID])
        )[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.TRADE_ROUTE_LEVEL];
        // Location A
        if(sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_ID]) === techId) {
          if(sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_ID]) !== "") {
            return `${sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_ID])}(${hyperrouteLevel})`;
          } else if (
            sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_COORD_X]) !== "" 
            && sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_COORD_Y]) !== ""
          ) {
            locationDesignerDataTable.push(["", "", "", 
              sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B]), 
              sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_COORD_X]),
              sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_COORD_Y]),
              "", "", "", "", "", "", unnamedRouteSectionIndexCounter, ""
            ]);
            return `${unnamedRouteSectionIndexCounter++}(${hyperrouteLevel})`; // Returns index counter then increment it
          }
        // Or location B
        } else {
          if(sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_ID]) !== "") {
            return `${sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_ID])}(${hyperrouteLevel})`;
          } else if (
            sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_COORD_X]) !== "" 
            && sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_COORD_Y]) !== ""
          ) {
            locationDesignerDataTable.push(["", "", "", 
              sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A]), 
              sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_COORD_X]),
              sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_COORD_Y]),
              "", "", "", "", "", "", unnamedRouteSectionIndexCounter, ""
            ]);
            return `${unnamedRouteSectionIndexCounter++}(${hyperrouteLevel})`; // Returns index counter then increment it
          }
        }}).join(",");
      // Append to table
      locationDesignerDataTable.push([region, sector, system, astroObject, xCoord, yCoord, zCoord, link, regionLink, systemLink, sectorLink, grid, techId, connections]);
    }
  }

  // We add coordinates from sections with object coordiantes and no object ID
  for (let index = 1; index < hyperrouteSectionData.length; index++) {
    const section = hyperrouteSectionData[index];
    if(
      sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_ID]) === ""
      && sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_ID]) === ""
      && sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_COORD_X]) !== ""
      && sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_COORD_Y]) !== ""
      && sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_COORD_X]) !== ""
      && sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_COORD_Y]) !== ""
    ) {
      locationDesignerDataTable.push(["", "", "", 
        sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A]), 
        sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_COORD_X]),
        sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A_COORD_Y]),
        "", "", "", "", "", "", unnamedRouteSectionIndexCounter, (unnamedRouteSectionIndexCounter+1)
      ]);
      unnamedRouteSectionIndexCounter++;
      locationDesignerDataTable.push(["", "", "", 
        sanitizeText(filteredSection[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B]), 
        sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_COORD_X]),
        sanitizeText(section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B_COORD_Y]),
        "", "", "", "", "", "", unnamedRouteSectionIndexCounter, (unnamedRouteSectionIndexCounter-1)
      ]);
      unnamedRouteSectionIndexCounter++;
    }
  }

  console.log(locationDesignerDataTable);
  // Convert data to CSV
  const csvData = locationDesignerDataTable.map(row => row.join(';')).join('\n');
  // Create Blob
  const blob = new Blob([csvData], { type: 'text/csv' });

  // Create download link
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  const d = new Date();
  const datestring = d.getFullYear()+""+("0"+(d.getMonth()+1)).slice(-2)+""+("0" + d.getDate()).slice(-2);
  a.download = 'location_designer_objects_raw_data_'+datestring+'_v2.csv';
  document.body.appendChild(a);

  // Trigger download
  a.click();
}

/**
 * Spreadsheet DATA EVENT LISTENERS
 */
// Event listener to batch update object parent name into spreadsheet
document.getElementById('spreadsheet-data-batch-update-object-readable-names-button').addEventListener('click', function() {
  batchUpdateAllObjectReadableNames();
});
// Event listener to batch update object human readable name into spreadsheet
document.getElementById('spreadsheet-data-batch-update-object-redable-parent-names-button').addEventListener('click', function() {
  batchUpdateAllObjectParentReadableNames();
});

// EXTERNAL TOOLS
// Event listener to format and download CSV for location designer tool
document.getElementById('format-to-location-designer-and-download').addEventListener('click', function() {
  formatAndDownloadDATAForLocationDesigner();
});