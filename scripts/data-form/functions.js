/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  isGapiLoaded = true;
  enableAuthButton();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  isGisLoaded = true;
  enableAuthButton();
}

/**
 * When scripts are loaded, authentication may begin
 */
function enableAuthButton() {
  if(isGapiLoaded && isGisLoaded) {
    document.getElementById('authenticate-button').style.visibility = 'visible';
  }
}

function handleAuthenticateClick() {
  gapi.load('client', initializeGapiClient);
  postGisLoaded();
  document.getElementById('authenticate-button').style.visibility = 'hidden';
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY_INPUT.value,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function postGisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID_INPUT.value,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize-button').style.visibility = 'visible';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('signout-button').style.visibility = 'visible';
    document.getElementById('authorize-button').innerText = 'Refresh';
    //await listMajors();
    // List objects
    await listObjects();
    await listTypes();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    document.getElementById('authorize-button').innerText = 'Authorize';
    document.getElementById('signout-button').style.visibility = 'hidden';
  }
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
async function listMajors() {
  let response;
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      range: 'Class Data!A2:E',
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById('content').innerText = 'No values found.';
    return;
  }
  // Flatten to string to display
  const output = range.values.reduce(
      (str, row) => `${str}${row[0]}, ${row[4]}\n`,
      'Name, Major:\n');
  document.getElementById('content').innerText = output;
}

/**
 * List Astronomical objects
 */
async function listObjects() {
  // Get data
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEET_NAMES.OBJECTS, '!A2:Z');
  // Populate select2 search array
  astronomicalObjectSearchArray = [];
  console.log(spreadSheetData.values[0]);
  for(i=0; i<spreadSheetData.values.length; i++){
    const rowValues = spreadSheetData.values[i];
    const namesString = `${rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.NAME]}${rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.ALT_NAMES] === "" ? "" : "/"+rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.ALT_NAMES]}`;
    let typeString = rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE];
    if(rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE_CLASSES] !== undefined && rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE_CLASSES] !== "") {
      typeString += " - "+rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE_CLASSES];
    }
    const canonLegendsString = canonLegendsToString([rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.CANON],rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.LEGENDS]]);
    const dateString = prettifyDateFromDateTo([rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.DATE_FROM],rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.DATE_TO]]);
    astronomicalObjectSearchArray.push({
      id: rowValues[SPREADSHEET_HEADERS.OBJECTS.columns.ID],
      text: `${namesString} (${typeString}) [${canonLegendsString}] ${dateString === "" ? "" : "("+(dateString)+")"}`
    });
  }
  console.log(astronomicalObjectSearchArray);
  // Load select2
  loadAstroObjectsSelect2();
}

/**
 * List Astronomical types
 */
async function listTypes() {
  // Get data
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEET_NAMES.OBJECT_TYPES, '!A2:D');
  // Populate select2 search array
  astronomicalObjectTypes = [];
  console.log(spreadSheetData.values[0]);
  for(i=0; i<spreadSheetData.values.length; i++){
    const rowValues = spreadSheetData.values[i];
    const labelString = rowValues[0];
    const typeString = rowValues[1];
    astronomicalObjectTypes.push({
      id: labelString,
      text: `${labelString} (${typeString})`
    });
  }
  console.log(astronomicalObjectTypes);
  // Load select2
  loadTypeSelect2();
}

/**
 * Load search and parent Select2
 */
function loadAstroObjectsSelect2() {
  $(document).ready(function() {
    // Create select 2
    // Astro object search
    $("#object-search").select2({
      data: astronomicalObjectSearchArray,
      placeholder: 'Astronomical object search....',
      allowClear: true
    });
    // Astro object Parents
    $("#object-parent").select2({
      data: astronomicalObjectSearchArray,
      placeholder: 'Parent ....',
      allowClear: true
    });
    // Populate form on select
    $("#object-search").on('change', function() {
      console.log('Selected value:', $("#object-search").val());
      loadObjectForm($("#object-search").val());
    });
  });
}

/**
 * Load object form from technical ID
 */
async function loadObjectForm(objectID) {
  const foundObjects = astronomicalObjectSearchArray.filter((element) => element.id === objectID);
  console.log(foundObjects);
  // Alert if several object meet conditions (i.e. duplicated technical ID !!!!!)
  if(foundObjects > 1) {
    alert(`Same ID ${objectID} for multiple object !!! Must be corrected manually in spreadsheet `);
    return;
  }
  if(foundObjects == 0) {
    alert(`Bug alert - ID ${objectID} doesn't exist !!! Fix source code`);
    return;
  }
  if(objectID !== undefined) {
    // Search matching row
    const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF}`;
    const rowValues = await getSpreadSheetRowFromColumnValues(SPREADSHEET_ID, SHEET_NAMES.OBJECTS, sheetRange, SPREADSHEET_HEADERS.OBJECTS.columns.ID, objectID);
    console.log(rowValues);
    // Get data
    // const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}${2+parseInt(objectID)}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF}${2+parseInt(objectID)}`;
    // const range = await getSpreadSheetData(SPREADSHEET_ID, SHEET_NAMES.OBJECTS, sheetRange);
    // console.log(range.values);
    // Populate form
    if(rowValues !== undefined) {
      let astroObject = rowValues;
      window.selectedAstronomicalObject = rowValues;
      document.getElementById('object-tech-id').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.ID]); // Tech ID
      document.getElementById('object-human-id').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.HUMAN_ID]); // Human ID
      document.getElementById('object-name').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.NAME]); // Name
      document.getElementById('object-alt-name').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.ALT_NAMES]); // Alt Names
      document.getElementById('object-capital').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.IS_CAPITAL] === "YES"; // Capital
      // document.getElementById('object-type').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE]); // Type
      $(document).ready(function() { // Type
        $('#object-type').select2().val(sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE]));
        $('#object-type').select2().trigger('change');

      });
      document.getElementById('object-type-classes').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE_CLASSES]); // Type classes
      document.getElementById('object-conjectural-name').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.CONJECTURAL_NAME] === "YES"; // Conjectural name
      document.getElementById('object-conjectural-type').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.CONJECTURAl_TYPE] === "YES"; // Conjectural type
      document.getElementById('object-orbital-rank').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.ORBITAL_RANK]); // Orbital rank
      // document.getElementById('object-parent').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.PARENT]); // Parent
      $(document).ready(function() { // Parent
        $('#object-parent').select2().val(sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.PARENT_ID]));
        $('#object-parent').select2().trigger('change');

      });
      document.getElementById('object-datefrom').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.DATE_FROM]); // Date from
      document.getElementById('object-dateto').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.DATE_TO]); // Date to
      document.getElementById('object-canon').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.CANON] === "YES"; // Canon
      document.getElementById('object-legends').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.LEGENDS] === "YES"; // Legends
      document.getElementById('object-inmovies').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.IN_MOVIES] === "YES"; // In movies
      document.getElementById('object-grid-x').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.X_GRID]); // Grid X
      document.getElementById('object-grid-y').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.Y_GRID]); // Grid Y
      document.getElementById('object-coord-x').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.X_COORD]); // X Coordinate
      document.getElementById('object-coord-y').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.Y_COORD]); // Y Coordinate
      document.getElementById('object-coord-z').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.Z_COORD]); // Z Coordinate
      document.getElementById('object-desc').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.DESC]); // Description
      document.getElementById('object-placement-certitude').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.PLACEMENT_CERTITUDE]); // Placement certitude
      document.getElementById('object-placement-logic').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.PLACEMENT_LOGIC]); // Placement logic
      document.getElementById('object-native-species').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.NATIVE_SPECIES]); // Native species
      document.getElementById('object-known-environments').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.KNOWN_ENVIRONMENTS]); // Known Environment
      document.getElementById('object-notes').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.NOTES]); // Notes
      document.getElementById('object-interesting').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.INTERESTING]); // Interesting      document.getElementById('object-').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.]); // 
      document.getElementById('object-sources').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.URL]); // Sources
      document.getElementById('object-zoom-level').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.ZOOM_LEVEL]); // Zoom level
      document.getElementById('object-tooltip-permanent').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.tooltip_permanent]); // Tooltip permanent
      document.getElementById('object-tooltip-direction').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.tooltip_direction]); // Tooltip direction
      document.getElementById('object-class-name').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.className]); // Tooltip Class Name
      document.getElementById('object-index-geo').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.index_geo]); // Index Geo
    }
  }
}

/**
 * Get spreadsheet DATA
 */
async function getSpreadSheetData(spreadsheetId, sheetName, sheetRange) {
  let response;
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: sheetName + sheetRange,
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
  console.log("Astronomical objects :", response.result);
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById('content').innerText = 'No values found.';
    return;
  }
  return range;
}

/**
 * Get spreadsheet row from column values
 */
async function getSpreadSheetRowFromColumnValues(spreadsheetId, sheetName, sheetRange, columnToSearch, searchValue) {
  let response;
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: sheetName + sheetRange,
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
  console.log("Astronomical objects :", response.result);
  const range = response.result;
  const values = range.values;
  if (!range || !values || values.length == 0) {
    document.getElementById('content').innerText = 'No values found.';
    return;
  }

  // Find row number and return it
  const rowIndex = values.findIndex((row) => row[columnToSearch] === searchValue);

  if (rowIndex === -1) {
    console.log('Value not found.');
    alert('Value not found in spreadsheet.');
  } else {
    console.log(`Row number where the value is found: ${rowIndex + 1}`);
    console.log(values[rowIndex]);
    return values[rowIndex];
  }
}

/**
 * Translate canon/legends YES values to "Canon / Legends" text
 */
function canonLegendsToString(canonLegendsArray) {
  if(canonLegendsArray.length === 2) {
    if(canonLegendsArray[0] === "YES") {
      if(canonLegendsArray[1] === "YES") {
        return "Canon/Legends";
      } else {
        return "Canon";
      }
    } else {
      return "Legends";
    }
  }
}

/**
 * Prettify date from - date to display
 */
function prettifyDateFromDateTo(dateArray) {
  if(dateArray.length === 2) {
    if(dateArray[0] !== "") {
      if(dateArray[1] !== "") {
        return `from ${dateArray[0]} to ${dateArray[1]}`;
      } else {
        return `from ${dateArray[0]}`;
      }
    } else {
      if(dateArray[1] !== "") {
        return `until ${dateArray[0]}`;
      } else {
        return "";
      }
    }
  }
}

/**
 * Set undefined to empty string and trim trailing and leading spaces
 */
function sanitizeText(value) {
  if(value === undefined) {
    return "";
  } else {
    return value.trim();
  }
}

/**
 * Load Type Select2
 */
function loadTypeSelect2() {
  $(document).ready(function() {
    // Create select 2
    $("#object-type").select2({
      data: astronomicalObjectTypes,
      placeholder: 'Astronomical Type ...',
      allowClear: true
    });
  });
}

/**
 * Update object
 */
function updateObjectData() {
  console.log("TODO : update object in spreadsheet");
}

/**
 * Show data changes before update
 */
async function showObjectDataChange () {
  // Get form data
  let formData = new FormData(document.getElementById("form"));
  console.log(formData, selectedAstronomicalObject);
  // Convertion work
  await convertFormValuesToData();
  // Populate Validation Table
  await populateValidationTable(window.selectedAstronomicalObject, window.dataToUpdate);
  // Display modal
  displayModal();
}

/**
 * Convert form (human readable) values to technical values
*/
async function convertFormValuesToData() {
  // Data formating
  window.dataToUpdate.length = 0; // reset array
  let orbitalRank = sanitizeText(document.getElementById('object-orbital-rank').value);
  let name = sanitizeText(document.getElementById('object-name').value);
  let humanName = (orbitalRank !== "" ? "  "+orbitalRank.toString()+". " : "") + name;
  
  // Making sure document.ready is ready before continuing....
  // Create a Promise that resolves when the document is ready
  let documentReadyPromise = new Promise(function(resolve) {
    $(document).ready(resolve);
  });
  // Use the Promise to execute code after the document is ready
  await documentReadyPromise.then(function() {
    console.log($('#object-parent option:selected').text());
    window.fromJQuery.humanParent = sanitizeText($('#object-parent option:selected').text());
    // Below will only run after document is ready

    // Data array populating
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.ID] = sanitizeText(document.getElementById('object-tech-id').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.HUMAN_ID] = sanitizeText(document.getElementById('object-human-id').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.HUMAN_NAME] = humanName;
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.NAME] = name;
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.ALT_NAMES] = sanitizeText(document.getElementById('object-alt-name').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.IS_CAPITAL] = document.getElementById('object-capital').checked ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE] = sanitizeText(document.getElementById('object-type').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE_CLASSES] = sanitizeText(document.getElementById('object-type-classes').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.CONJECTURAL_NAME] = document.getElementById('object-conjectural-name').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.CONJECTURAl_TYPE] = document.getElementById('object-conjectural-type').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.ORBITAL_RANK] = orbitalRank;
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.PARENT_ID] = sanitizeText(document.getElementById('object-parent').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.PARENT_HUMAN] = window.fromJQuery.humanParent;
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.DATE_FROM] = sanitizeText(document.getElementById('object-datefrom').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.DATE_TO] = sanitizeText(document.getElementById('object-dateto').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.CANON] = document.getElementById('object-canon').checked ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.LEGENDS] = document.getElementById('object-legends').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.IN_MOVIES] = document.getElementById('object-inmovies').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.X_GRID] = sanitizeText(document.getElementById('object-grid-x').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.Y_GRID] = sanitizeText(document.getElementById('object-grid-y').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.X_COORD] = sanitizeText(document.getElementById('object-coord-x').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.Y_COORD] = sanitizeText(document.getElementById('object-coord-y').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.Z_COORD] = sanitizeText(document.getElementById('object-coord-z').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.DESC] = sanitizeText(document.getElementById('object-desc').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.PLACEMENT_CERTITUDE] = sanitizeText(document.getElementById('object-placement-certitude').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.PLACEMENT_LOGIC] = sanitizeText(document.getElementById('object-placement-logic').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.NATIVE_SPECIES] = sanitizeText(document.getElementById('object-native-species').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.KNOWN_ENVIRONMENTS] = sanitizeText(document.getElementById('object-known-environments').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.NOTES] = sanitizeText(document.getElementById('object-notes').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.INTERESTING] = sanitizeText(document.getElementById('object-interesting').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.URL] = sanitizeText(document.getElementById('object-sources').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.ZOOM_LEVEL] = sanitizeText(document.getElementById('object-zoom-level').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.tooltip_permanent] = sanitizeText(document.getElementById('object-tooltip-permanent').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.tooltip_direction] = sanitizeText(document.getElementById('object-tooltip-direction').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.className] = sanitizeText(document.getElementById('object-class-name').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.index_geo] = sanitizeText(document.getElementById('object-index-geo').value);
  });
}

/**
 * Populate modal table with data from spreadsheet and form to check changes before spreadsheet update
 */
async function populateValidationTable(currentData, newData) {
  console.log(currentData, newData);
  let tableBody = document.getElementById('modal-table-body');
  tableBody.innerHTML = '';
  // console.log(tableBody);
  for (let index=0; index <= SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_INDEX_NUMBER; index++) {
    let tr = document.createElement('tr');
    
    let td1 = document.createElement('td');
    td1.textContent = getKeyByObjectValue(SPREADSHEET_HEADERS.OBJECTS.columns, index);
    tr.appendChild(td1);
    
    let td2 = document.createElement('td');
    td2.textContent = currentData[index];
    tr.appendChild(td2);

    let td3 = document.createElement('td');
    td3.textContent = newData[index];
    tr.appendChild(td3);

    // Update color
    if(currentData[index] !== newData[index]) {
      td3.style.backgroundColor = "lightblue";
    }
    
    tableBody.appendChild(tr);
    // console.log(tr);
  }
  // console.log(tableBody);
}

/**
 * Return key of object searching value
 */
function getKeyByObjectValue(object, value) {
  return Object.keys(object).find(key =>
    object[key] === value);
}

/**********/
/* MODALS */
/**********/

// Get the modal
var modal = document.getElementById("validationModal");
// Get the <span> element that closes the modal
var modalSpan = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function displayModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
modalSpan.onclick = function() {
  modal.style.display = "none";
}

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

/**********/
/* EVENTS */
/**********/

function onValidationUpdate() {
  showObjectDataChange();
  updateObjectData();
}
