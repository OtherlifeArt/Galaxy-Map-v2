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
  
// Function to trigger download of GeoJSON file of points
async function downloadPointsGeoJSON() {
  // Get Blob
  var geojsonStr = await generatePointsGeoJSON();

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
}

// Function to generate GeoJSON file of points
async function generatePointsGeoJSON() {
  var spreadsheetId = SPREADSHEET_ID
  var sheetName = SHEETS.OBJECTS.NAME
  return await fetchSheetDataPoints(spreadsheetId, sheetName).then(function(geojson) {
    // Convert GeoJSON to string
    var geojsonStr = JSON.stringify(geojson);
    return geojsonStr;
  }).catch(function(error) {
    console.error('Error generating GeoJSON:', error);
  });
}

// Function to trigger create and download of already filtered Point Data for map (optimization of GeoJSON)
async function downloadPointsArray() {
  // Get point file
  var geojsonStr = await generatePointsGeoJSON();

  // Filter point data
  let filteredData = initFilteredDataObject();
  filteredData = filterPointData(JSON.parse(geojsonStr), filteredData);

  let filteredPointDataJSON = JSON.stringify(filteredData);

  // Create Blob
  var blob = geoJSONPointDBFile = new Blob([filteredPointDataJSON], { type: 'application/json' });

  // Create download link
  var a = document.createElement('a');
  var url = URL.createObjectURL(blob);
  a.href = url;
  a.download = 'SW_Map_Optimized_Points.json';
  document.body.appendChild(a);

  // Trigger download
  a.click();

  // Clean up
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

/**
 * Create geoJSON filtered data structure in order to add data to each sub layers
 */
function initFilteredDataObject() {
  const zoomLayerIndexCount = mapMaxZoomLevel - mapMinZoomLevel;
  // First (object display category) level filter
  let filteredData = { "innerStarSystemObjects": {}, "starSystemObjects": {}, "innerMainObjectAsStarSystems":{}, "otherObjects": {} };
  for (const astroObjectCategory in filteredData) {
    // console.log(`${astroObjectCategory}: ${filteredData[astroObjectCategory]}`);
    // 2nd (continuity) level filter
    filteredData[astroObjectCategory] = {"canon": [], "canonAndLegends": [], "legends": [], "unlicensed": [] };
    // 3rd (zoom) level filter
    for (const astroObjectContinuity in filteredData[astroObjectCategory]) {
      for (let index = 0; index < zoomLayerIndexCount; index++) {
        // Create empty feature collection for each zoom layer
        filteredData[astroObjectCategory][astroObjectContinuity][index] = {
          "type": "FeatureCollection",
          "features": []
        };
      }
    }
  }
  // console.log(filteredData);
  return filteredData;
}

/**
 * Filter and add Point data to GeoJSON filtered data
 * 
 * @param {*} pointData geoJSON feature collection for points
 */
function filterPointData(pointData, filteredData) {
  //console.log(pointData);
  // let childrenCount = 0;
  let starSystemFeatureWithCoordinatesStore = [];

  pointData.features.forEach(function(feature) {
    // console.log(feature);
    const fp = feature.properties;
    /* Ignore object list */
    if(OBJECT_TYPES_TO_IGNORE.find((typeToIgnore) => typeToIgnore === fp.TYPE)) {
      if(debug) {
        console.log(`Ignoring ${fp.NAME} feature as point`);
      }
      return;
    };
    // Create a link to children in feature properties
    const parentObjectFeature = getParentObjectFeature(pointData.features, feature);
    if(parentObjectFeature) {
      // console.log(`Creating link to parent in feature properties for object ${fp.NAME}`);
      // console.log(++childrenCount);
      if(parentObjectFeature.properties.childrenFeatures === undefined) {
        parentObjectFeature.properties.childrenFeatures = [];
      }
      parentObjectFeature.properties.childrenFeatures.push(feature);
      // console.log(parentObjectFeature.properties.childrenFeatures);
      
    }
    /* Object category */
    // Star systems with coordinates
    if(fp.TYPE.toLowerCase() === "star system") {
      /* We add to layer only systems with coordinates */
      if(fp.X_COORD && fp.X_COORD !== "" && fp.Y_COORD && fp.Y_COORD !== "") {
        // Storing star system for later use as inner main object display as star system
        starSystemFeatureWithCoordinatesStore.push(feature);
        /* Add star system hierarchy */
        feature.properties.starSystemHierarchy = mapStarSystemHierarchyBuilder(pointData, feature.properties); // Performance to improve (if possible)
        // console.log(feature.properties.starSystemHierarchy);
        /* Continuity */
        if(fp.LEGENDS.toLowerCase() === "yes") {
          if(fp.CANON.toLowerCase() === "yes") {
            // CANON and LEGENDS
            addDataToZoomLevelFilteredFeatureCollection(filteredData.starSystemObjects.canonAndLegends, feature);
          } else {
            // LEGENDS only
            addDataToZoomLevelFilteredFeatureCollection(filteredData.starSystemObjects.legends, feature);
          }
        } else if(fp.CANON.toLowerCase() === "yes") {
          // CANON only
          addDataToZoomLevelFilteredFeatureCollection(filteredData.starSystemObjects.canon, feature);
        } else if (fp.UNLICENSED.toLowerCase() === "yes") {
          // UNLICENSED
          addDataToZoomLevelFilteredFeatureCollection(filteredData.starSystemObjects.unlicensed, feature);
        }
      }
    } else {
      // Inner star system objects
      let starSystemCoordinates = getParentStarSystemCoordinatesIfAstroObjectFeatureIsInAStarSystem(pointData.features, fp);
      // We take into account only star systems with coordinates (That's why star system must have coordinates in data sheet)
      if(starSystemCoordinates.length > 0) {
        // Object have not its own coordinates, we add star system's ones
        if(!fp.X_COORD || fp.X_COORD === "" || !fp.Y_COORD || fp.Y_COORD === "") {
          // feature.properties.X_COORD = starSystemCoordinates[0];
          // feature.properties.Y_COORD = starSystemCoordinates[1];
          feature.geometry.coordinates = starSystemCoordinates.map((coord) => parseFloat(coord));
          feature.geometry.type = "Point";
        }
        // Add object to the inner star system object's zoom level filtered feature collection at object zoom level
        if(fp.X_COORD && fp.X_COORD !== "" && fp.Y_COORD && fp.Y_COORD !== "") {
          /* Continuity */
          if(fp.LEGENDS.toLowerCase() === "yes") {
            if(fp.CANON.toLowerCase() === "yes") {
              // CANON and LEGENDS
              addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemObjects.canonAndLegends, feature, mapStarSystemMaxZoomLevel + 1);
            } else {
              // LEGENDS only
              addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemObjects.legends, feature, mapStarSystemMaxZoomLevel + 1);
            }
          } else if(fp.CANON.toLowerCase() === "yes") {
            // CANON only
            addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemObjects.canon, feature, mapStarSystemMaxZoomLevel + 1);
          } else if (fp.UNLICENSED.toLowerCase() === "yes") {
            // UNLICENSED
            addDataToZoomLevelFilteredFeatureCollection(filteredData.innerStarSystemObjects.unlicensed, feature, mapStarSystemMaxZoomLevel + 1);
          }
        }
      // Other objects with coordinates and not part of star system
      } else if(fp.X_COORD && fp.X_COORD !== "" && fp.Y_COORD && fp.Y_COORD !== "") {
        /* Continuity */
        if(fp.LEGENDS.toLowerCase() === "yes") {
          if(fp.CANON.toLowerCase() === "yes") {
            // CANON and LEGENDS
            addDataToZoomLevelFilteredFeatureCollection(filteredData.otherObjects.canonAndLegends, feature);
          } else {
            // LEGENDS only
            addDataToZoomLevelFilteredFeatureCollection(filteredData.otherObjects.legends, feature);
          }
        } else if(fp.CANON.toLowerCase() === "yes") {
          // CANON only
          addDataToZoomLevelFilteredFeatureCollection(filteredData.otherObjects.canon, feature);
        } else if (fp.UNLICENSED.toLowerCase() === "yes") {
          // UNLICENSED
          addDataToZoomLevelFilteredFeatureCollection(filteredData.otherObjects.unlicensed, feature);
        }
      }
    }
  });
  /* Create feature collection for inner main objects as star system */
  createInnerSystemMainObjectAsStarSystemFeatureAndAddItTofilteredData(starSystemFeatureWithCoordinatesStore, filteredData.innerMainObjectAsStarSystems);
  // console.log(filteredData);
  const styles = ['color: black', 'background: lightgreen','font-weight: bold'].join(';');
  console.log("%c[INIT] Point Data filtered", styles);
  return filteredData;
}

/**
 * Search for a parent object feature in the feature collection by ID and return it
 * 
 * @param {*} featureCollection 
 * @param {*} objectFeature 
 * @returns {*} Feature of parent object or null if not found
 */
function getParentObjectFeature(featureCollection, objectFeature) {
  // Object feature property undefined or null, parent ID undefined, null or empty
  if(!objectFeature.properties || !objectFeature.properties.PARENT_ID || objectFeature.properties.PARENT_ID === "") {
    return null;
  }
  return featureCollection.find(feature => feature.properties.ID === objectFeature.properties.PARENT_ID);
}

function createInnerSystemMainObjectAsStarSystemFeatureAndAddItTofilteredData(starSystemFeatureCollection, innerMainObjectAsStarSystemFilteredData) {
  for (const feature of starSystemFeatureCollection) {
    // Deep copy object
    const innerMainObjectAsStarSystemFeature = JSON.parse(JSON.stringify(feature));
    // Add marker to avoid search as inner system object
    innerMainObjectAsStarSystemFeature.properties.innerObjectAsStarSystem = true;
    const fp = feature.properties;
    // Change properties function of inner objects
    const innerSystemMainObjectFeatureProperties = getInnerSystemMainObjectFeatureProperties(innerMainObjectAsStarSystemFeature);
    // Replace properties
    for (const key in innerSystemMainObjectFeatureProperties) {
      if (Object.prototype.hasOwnProperty.call(innerSystemMainObjectFeatureProperties, key)) {
        // Add new properties only if not empty
        if(innerSystemMainObjectFeatureProperties[key].length > 0) {
          innerMainObjectAsStarSystemFeature.properties[key] = innerSystemMainObjectFeatureProperties[key].join(" & ");
        }
      }
    }
    // console.log(innerMainObjectAsStarSystemFeature);
    
    // Create Inner main object(s) as star system feature
    if(fp.LEGENDS.toLowerCase() === "yes") {
      if(fp.CANON.toLowerCase() === "yes") {
        // CANON and LEGENDS
        addDataToZoomLevelFilteredFeatureCollection(innerMainObjectAsStarSystemFilteredData.canonAndLegends, innerMainObjectAsStarSystemFeature);// Main inner object(s) as star system
      } else {
        // LEGENDS only
        addDataToZoomLevelFilteredFeatureCollection(innerMainObjectAsStarSystemFilteredData.legends, innerMainObjectAsStarSystemFeature);// Main inner object(s) as star system
      }
    } else if(fp.CANON.toLowerCase() === "yes") {
      // CANON only
      addDataToZoomLevelFilteredFeatureCollection(innerMainObjectAsStarSystemFilteredData.canon, innerMainObjectAsStarSystemFeature);// Main inner object(s) as star system
    } else if (fp.UNLICENSED.toLowerCase() === "yes") {
      // UNLICENSED
      addDataToZoomLevelFilteredFeatureCollection(innerMainObjectAsStarSystemFilteredData.unlicensed, innerMainObjectAsStarSystemFeature);// Main inner object(s) as star system
    }
    // TODO Remove children properties from feature to lighten feature collection
  }
}

/**
 * Format/alter parent object feature properties with main children feature properties
 * 
 * @param {*} innerMainObjectAsStarSystemFeature initial feature object with properties.children key
 * @param {boolean} [firstChild=true] If it's the first child (default: true) we add its ID to the feature
 * @param {boolean} [onlyCapital=false] If "IS_CAPITAL" feature property is found on any children
 * @returns feature properties
 */
function getInnerSystemMainObjectFeatureProperties(innerMainObjectAsStarSystemFeature, firstChild = true, onlyCapital = false) {
  const sfp = innerMainObjectAsStarSystemFeature.properties;
  let newProperties = {
    NAME: [],
    TYPE: [],
    ["URLS (sources)"]: [],
  };
  // Only first child
  if(firstChild) {
    newProperties.ID = [generateUUIDv7()], // ID need to remain unique
    newProperties.PARENT_ID = [sfp.ID], // Need to change this property to find parent object on map
    newProperties.PARENT = [sfp.NAME+" < "+ sfp.PARENT];
    firstChild = false;
  }
  // Searching for main objects
  if(sfp.childrenFeatures && sfp.childrenFeatures.length > 0) {
    for (const child of sfp.childrenFeatures) {
      const cfp = child.properties;
      if(cfp.IS_CAPITAL.toLowerCase() === "yes") {
        onlyCapital = true;
      }
      if(onlyCapital) { // Only "capital" children are selected
        if(cfp.IS_CAPITAL.toLowerCase() === "yes") {
          newProperties.NAME.push(cfp["ALT_NAMES (/ separated)"] && cfp["ALT_NAMES (/ separated)"] !== "" ?
            cfp.NAME + "/" + cfp["ALT_NAMES (/ separated)"] : cfp.NAME
          );
          newProperties.TYPE.push(cfp.TYPE_CLASSES || cfp.TYPE_CLASSES !== "" ? 
            cfp.TYPE_CLASSES + " (" + cfp.TYPE + ")" : cfp.TYPE
          );
          if(cfp["URLS (sources)"] && cfp["URLS (sources)"] !== "") {
            newProperties["URLS (sources)"].push(cfp["URLS (sources)"]);
          }
        }
      } else {
        if(sfp.childrenFeatures.length === 1 && cfp.childrenFeatures === undefined) { // Object is not capital, is alone and has no child
          newProperties.NAME.push(cfp["ALT_NAMES (/ separated)"] && cfp["ALT_NAMES (/ separated)"] !== "" ?
            cfp.NAME + "/" + cfp["ALT_NAMES (/ separated)"] : cfp.NAME
          );
          newProperties.TYPE.push(cfp.TYPE_CLASSES || cfp.TYPE_CLASSES !== "" ? 
            cfp.TYPE_CLASSES + " (" + cfp.TYPE + ")" : cfp.TYPE
          );
          if(cfp["URLS (sources)"] && cfp["URLS (sources)"] !== "") {
            newProperties["URLS (sources)"].push(cfp["URLS (sources)"]);
          }
        }
      }
      // if(newProperties["URLS (sources)"].length > 0) {
      //   console.log("Found URLs:", newProperties["URLS (sources)"]);
      // }
      // Add childrenFeatures of child properties to new properties
      const childrenNewProperties = getInnerSystemMainObjectFeatureProperties(child, firstChild, onlyCapital);
      // console.log("before:");
      // console.log("PARENT:", sfp.NAME, "CURRENT:", cfp.NAME);
      // console.log(newProperties);
      // console.log(childrenNewProperties);
      // console.log("after");
      newProperties.NAME = [...newProperties.NAME, ...childrenNewProperties.NAME]; // "..." spread operator to merge small arrays
      newProperties.TYPE = [...newProperties.TYPE, ...childrenNewProperties.TYPE]; // "..." spread operator to merge small arrays
      if(childrenNewProperties["URLS (sources)"].length>0) {
        newProperties["URLS (sources)"] = [(newProperties["URLS (sources)"].concat(childrenNewProperties["URLS (sources)"])).join(",")];
      }
      // newProperties["URLS (sources)"] = [([...newProperties["URLS (sources)"],...childrenNewProperties["URLS (sources)"]]).join(",")]; // "..." spread operator to merge small arrays
    }
  }
  // if(debug && newProperties.NAME.length > 0) {
  //   console.log(newProperties);
  // }
  return newProperties;
}

/**
 * Concatenate all star system children objects by hierarchy level
 * 
 * @param {*} pointData data GeoJSON feature collection for points
 * @param {*} featureProperty feature properties of star system
 * @returns {Array} Array of star system children objects
 */
function mapStarSystemHierarchyBuilder(pointData, featureProperty) {
  // Find all star system children objects by hierarchy level
  let hierarchy = [];
  const children = pointData.features.filter(feature => feature.properties.PARENT_ID === featureProperty.ID);
  children.forEach(childrenFeature => {
    const cFp = childrenFeature.properties;
    let subType = cFp["TYPE_CLASSES"]!== "" ? " - " + cFp["TYPE_CLASSES"] : "";
    hierarchy.push(`${cFp.HUMAN_READABLE_NAME} (${cFp.TYPE}${subType})`);
    hierarchy = hierarchy.concat(mapStarSystemHierarchyBuilder(pointData, cFp));
  });
  // if(hierarchy !== "") { 
  //   console.log(hierarchy)  
  // };
  return hierarchy;
}

/********* LINES/ROADS  *********/

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
  document.getElementById('downloadOptimizedPointsButton').addEventListener('click', downloadPointsArray);
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