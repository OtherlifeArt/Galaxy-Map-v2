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
    // List objects
    await listObjects();
    await listTypes();
    await listTypeClasses();
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
 * List Astronomical objects
 */
async function listObjects() {
  // Get data
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEET_NAMES.OBJECTS, '!A2:Z');
  // Populate select2 search array
  astronomicalObjectSearchArray = [];
  // console.log(spreadSheetData.values[0]);
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
  // console.log(spreadSheetData.values[0]);
  for(i=0; i<spreadSheetData.values.length; i++){
    const rowValues = spreadSheetData.values[i];
    const labelString = rowValues[0];
    const typeString = rowValues[2] ? `(${rowValues[2]})` : "";
    astronomicalObjectTypes.push({
      id: labelString,
      text: `${labelString} ${typeString}`,
      parentId: rowValues[2],
    });
  }
  console.log(astronomicalObjectTypes);
  // Load select2
  loadTypeSelect2();
}

/**
 * List Astronomical type classes
 */
async function listTypeClasses() {
  // Get data
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEET_NAMES.OBJECT_TYPE_CLASSES, '!A2:G');
  // Populate select2 search array
  astronomicalObjectTypeClasses = [];
  // console.log(spreadSheetData.values[0]);
  for(i=0; i<spreadSheetData.values.length; i++){
    const rowValues = spreadSheetData.values[i];
    
    astronomicalObjectTypeClasses.push({
      name: rowValues[0],
      typeClass: rowValues[1],
      subClass: rowValues[2],
      classLevel: rowValues[3],
      classIndex: rowValues[4],
      desc: rowValues[5],
      relationWithObjectType: rowValues[6],
    });
  }
  console.log(astronomicalObjectTypeClasses);
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
    // Populate search form on select
    $("#object-search").on('change', function() {
      console.log('Selected value:', $("#object-search").val());
      loadObjectForm($("#object-search").val());
    });
    // Populate (human) parent on parent select
    $("#object-parent").on('change', async function() {
      let selectedValue = $("#object-parent").val();
      console.log('Selected value:', selectedValue);
      document.getElementById('object-parent-raw').value = await getParentHierarchy(selectedValue);
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
  } else if(foundObjects == 0 && objectID) {
    alert(`Bug alert - ID ${objectID} doesn't exist !!! Fix source code`);
    return;
  } else if (!objectID) {
    console.log("No object selected !");
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
      let updateDate = new Date(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.updated_at]).toLocaleString();
      document.getElementById('object-updated-at').value = updateDate; // Updated At
      document.getElementById('object-data-certified').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.is_certified] === "YES"; // Data certified ?
      document.getElementById('object-name').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.NAME]); // Name
      document.getElementById('object-alt-name').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.ALT_NAMES]); // Alt Names
      document.getElementById('object-capital').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.IS_CAPITAL] === "YES"; // Capital
      document.getElementById('object-type-raw').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE]); // Type RAW DATA
      $(document).ready(function() { // Type
        $('#object-type').select2().val(sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE]));
        $('#object-type').select2().trigger('change');

      });
      document.getElementById('object-type-classes').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE_CLASSES]); // Type classes
      document.getElementById('object-conjectural-name').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.CONJECTURAL_NAME] === "YES"; // Conjectural name
      document.getElementById('object-conjectural-type').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.CONJECTURAL_TYPE] === "YES"; // Conjectural type
      document.getElementById('object-orbital-rank').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.ORBITAL_RANK]); // Orbital rank
      document.getElementById('object-parent-raw').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.columns.PARENT_HUMAN]); // Parent RAW DATA
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
      let urlList = separateStringToLinkList(sanitizeText(document.getElementById('object-sources').value), ",");
      console.log(urlList);
      let urlDisplayerSpan = document.getElementById('url-displayer')
      urlDisplayerSpan.innerHTML = "";
      for (const element of urlList) {
        let div = urlDisplayerSpan.appendChild(document.createElement("div"));
        div.appendChild(element);
      }
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
    alert(err.message);
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
    alert(err.message);
    return;
  }
  console.log("Astronomical objects :", response.result);
  const range = response.result;
  const values = range.values;
  if (!range || !values || values.length == 0) {
    document.getElementById('content').innerText = 'No values found.';
    alert(err.message);
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
 * Update spreadsheet data
 */
async function updateSpreadSheetRowData(spreadsheetId, sheetName, sheetRange, dataRowToUpdate) {
  let response;
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: sheetName + sheetRange,
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    alert(err.message);
    return;
  }
  console.log("Astronomical objects :", response.result);
  const range = response.result;
  const values = range.values;
  if (!range || !values || values.length == 0) {
    document.getElementById('content').innerText = 'No values found.';
    return false;
  }

  // Find row number matching technical ID and return it
  const rowIndex = values.findIndex((row) => row[SPREADSHEET_HEADERS.OBJECTS.columns.ID] === dataRowToUpdate[0]);

  if (rowIndex === -1) {
    console.log('Value not found.');
    alert('Value not found in spreadsheet.');
  } else {
    console.log(`Row number where the value is found: ${rowIndex + 1}`);
    console.log(values[rowIndex]);

    // Update row
    try {
      response = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: sheetName + `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}${rowIndex + 1}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF}${rowIndex + 1}`,
        valueInputOption: "RAW",
        majorDimension: "ROWS",
        values: [dataRowToUpdate]
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      alert(err.message);
      return false;
    }
    console.log("Astronomical object updated :", response.result);
    return true;
  }
}

/**
 * Add new spreadsheet line with data from form
 */
async function addSpreadSheetRowData(spreadsheetId, sheetName, sheetRange, dataRowToAppend) {
  // Add row
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: sheetName + sheetRange,
      valueInputOption: "RAW",
      majorDimension: "ROWS",
      values: [dataRowToAppend]
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    alert(err.message);
    return false;
  }
  console.log("Astronomical object added :", response.result);
  return true;
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
      allowClear: false
    });
  });
  // Populate class type on type select
  $("#object-type").on('change', function() {
    console.log('Selected value:', $("#object-type").val());
    loadTypeClasses($("#object-type").val());
  });
}

/**
 * Load type class selects function of type
 */
function loadTypeClasses(astroObjectType) {
  const astroObjectTypeEntry = astronomicalObjectTypes.find(type => type.id === astroObjectType);
  const matchingType = astroObjectTypeEntry.parentId !== "" ? astroObjectTypeEntry.parentId : astroObjectTypeEntry.id;
  const typeClassSelects = CLASS_TYPE_SELECT_CONTAINER.getElementsByTagName('select');
  while(typeClassSelects[1]) { // Remove all level 1+ elements and their event listeners
    typeClassSelects[1].remove();
  }
  populateTypeClassSelect(matchingType, 0);
}

function populateTypeClassSelect(matchingType, classLevel) {
  const typeClassesSelects = CLASS_TYPE_SELECT_CONTAINER.getElementsByTagName('select');
  if(typeClassesSelects[classLevel] === undefined) {
    CLASS_TYPE_SELECT_CONTAINER.appendChild(document.createElement("select"));
  }
  typeClassesSelects[classLevel].innerHTML = "<option><option/>"
  for(let typeClass of astronomicalObjectTypeClasses) {
    // Load first level select   
    if(matchingType === typeClass.typeClass && parseInt(typeClass.classLevel) === classLevel) {
      let option = document.createElement("option");
      option.value = typeClass.subClass;
      option.text = typeClass.name;
      typeClassesSelects[classLevel].appendChild(option);
    }
  }
  // Add event listener
  typeClassesSelects[classLevel].addEventListener('change', function(event) {
    const typeClassesSelects = CLASS_TYPE_SELECT_CONTAINER.getElementsByTagName('select');
    let indexFromWhereToRemoveElements = typeClassesSelects.findIndex(select => select === event.target);
    // Remove next level elements
    while (typeClassesSelects[indexFromWhereToRemoveElements]) {
      typeClassesSelects[indexFromWhereToRemoveElements].remove();
    }
    // Add new next level elements
    matchingType ??????
    populateTypeClassSelect(matchingType, indexFromWhereToRemoveElements);
  });
}



/**
 * Update object
 */
function updateObjectData() {
  
}

/**
 * Show data changes before update
 */
async function showObjectDataChange () {
  // Populate Validation Table
  await populateValidationTable(window.selectedAstronomicalObject, window.dataToUpdate);
  // Display modal
  displayModal();
}

/**
 * Convert form (human readable) values to technical values
*/
async function convertFormValuesToData() {
  // Get form data
  let formData = new FormData(document.getElementById("astro-object-form"));
  console.log(formData, selectedAstronomicalObject);
  // Data formating
  window.dataToUpdate.length = 0; // reset array
  let orbitalRank = sanitizeText(document.getElementById('object-orbital-rank').value);
  let name = sanitizeText(document.getElementById('object-name').value);
  let humanName = (orbitalRank !== "" ? "  "+orbitalRank.toString()+". " : "") + name;
  // let humanParent = getParentHierarchy(window.selectedAstronomicalObject[SPREADSHEET_HEADERS.ID]);
  
  // Making sure document.ready is ready before continuing....
  // Create a Promise that resolves when the document is ready
  let documentReadyPromise = new Promise(function(resolve) {
    $(document).ready(resolve);
  });
  // Use the Promise to execute code after the document is ready
  await documentReadyPromise.then(function() {
    // console.log($('#object-parent option:selected').text());
    // window.fromJQuery.humanParent = sanitizeText($('#object-parent option:selected').text());
    // Below will only run after document is ready

    // Data array populating
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.ID] = sanitizeText(document.getElementById('object-tech-id').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.HUMAN_ID] = sanitizeText(document.getElementById('object-human-id').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.HUMAN_NAME] = humanName;
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.NAME] = name;
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.ALT_NAMES] = sanitizeText(document.getElementById('object-alt-name').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.is_certified] = document.getElementById('object-data-certified').checked ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.IS_CAPITAL] = document.getElementById('object-capital').checked ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE] = sanitizeText(document.getElementById('object-type').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.TYPE_CLASSES] = sanitizeText(document.getElementById('object-type-classes').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.CONJECTURAL_NAME] = document.getElementById('object-conjectural-name').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.CONJECTURAL_TYPE] = document.getElementById('object-conjectural-type').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.ORBITAL_RANK] = orbitalRank;
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.PARENT_ID] = sanitizeText(document.getElementById('object-parent').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.PARENT_HUMAN] = sanitizeText(document.getElementById('object-parent-raw').value);
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
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.updated_at] = new Date().toUTCString();
  });
}

/**
 * Set some form data in order to append them as new line in spreadsheet
 */
function setNewDataFormValues() {
  window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.ID] = generateUUIDv5();
  window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.columns.HUMAN_ID] = "";
}

/**
 * Generate UUID v7
 */
function generateUUIDv5() {
  // from https://gist.github.com/fabiolimace/c0c11c5ea013d4ec54cf6b0d43d366c6
  return 'tttttttt-tttt-7xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.trunc(Math.random() * 16);
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).replace(/^[t]{8}-[t]{4}/, function() {
    const unixtimestamp = Date.now().toString(16).padStart(12, '0');
    return unixtimestamp.slice(0, 8) + '-' + unixtimestamp.slice(8);
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

/**
 * Parse data separated by char to html url link list
 */
function separateStringToLinkList(string, separator) {
  let urls = string.split(separator);
  let urlList = [];
  for (const url of urls) {
    let a = document.createElement("a");
    a.href =  url;
    a.target = "_blank";
    a.innerText = url;
    urlList.push(a);
  }
  return urlList;
}

/**
 * Return formatted string of parent hierarchy from higher parent to object
 * Example : 
 * @param {UUID} objectID 
 */
async function getParentHierarchy(objectID) {
  const previousParentValue = document.getElementById('object-parent-raw').value;
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEET_NAMES.OBJECTS, '!A2:F');
  const data = spreadSheetData.values;
  // Get parents recursively
  let currentObjectID = objectID;
  console.log("objectID : ", objectID);
  // console.log("data : ", data  ,"objectid : ", currentObjectID ,"object row : ", data.find((row) => row[SPREADSHEET_HEADERS.OBJECTS.columns.ID] === currentObjectID));
  let currentDataRow = data.find((row) => row[SPREADSHEET_HEADERS.OBJECTS.columns.ID] === currentObjectID);
  let parentString = "";
  while(currentDataRow !== undefined && currentDataRow !== null) {
    if(currentDataRow !== undefined && currentDataRow !== null) {
      if(parentString !== "") {
        parentString += " < ";
      }
      parentString += currentDataRow[SPREADSHEET_HEADERS.OBJECTS.columns.NAME];
    }
    currentDataRow = data.find((row) => row[SPREADSHEET_HEADERS.OBJECTS.columns.ID] === currentDataRow[SPREADSHEET_HEADERS.OBJECTS.columns.PARENT_ID]); // parentID
  }
  if(parentString === undefined || parentString === null) {
    console.log("parent string : ", parentString);
    return previousParentValue;
  } else {
    return parentString;
  }
}

/**********/
/*  TABS  */
/**********/

function openSection(evt, sectionName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(sectionName).style.display = "block";
  if(evt) {
    evt.currentTarget.className += " active";
  }
} 

/**********/
/* MODALS */
/**********/

// When the user clicks on the button, open the modal
function displayModal() {
  // Get the modal
  let modal = document.getElementById("validationModal");
  modal.style.display = "block";
}

function closeModal() {
  let modal = document.getElementById("validationModal");
  modal.style.display = "none";
}

// Get the <span> element that closes the modal
var modalSpan = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
modalSpan.onclick = function() {
  closeModal();
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

async function showDataAndUpdate() {
  // Convertion work
  await convertFormValuesToData();
  showObjectDataChange();
}

async function updateData() {
  await convertFormValuesToData();
  const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF}`;
  let returnCode = await updateSpreadSheetRowData(SPREADSHEET_ID, SHEET_NAMES.OBJECTS, sheetRange, window.dataToUpdate);
  if(returnCode) {
    alert("Object has been successfully updated !");
    closeModal();
  } else {
    alert("Error encoutered ! Check console (F12) for more details");
  }
}

async function addNewData() {
  await convertFormValuesToData();
  setNewDataFormValues();
  const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF}`;
  let returnCode = await addSpreadSheetRowData(SPREADSHEET_ID, SHEET_NAMES.OBJECTS, sheetRange, window.dataToUpdate);
  // Confirm dialog
  // Add data
  // Confirmation and instruction dialog
  if(returnCode) {
    alert("Object has been successfully created at the end of the spreadsheet ! Add/reorganize human index manually ")
  } else {
    alert("Error encoutered ! Check console (F12) for more details")
  }
}

function deleteData() {
  // Confirm dialog
  // Delete data
  // Confirmation and instruction dialog
  if(returnCode) {
    alert("Object has been successfully deleted ! Add/reorganize human index manually ")
  } else {
    alert("Error encoutered ! Check console (F12) for more details")
  }
}

