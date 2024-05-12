async function initHyperroutes() {
  await listHyperroutes();
}

async function listHyperroutes() {
  await loadHyperrouteArray();
  await initHyperrouteSelect2AndLinkedEvents();
}

async function loadHyperrouteArray() {
  // Get data
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.HYPERROUTES.NAME, '!A2:M');
  // Populate hyperroute list
  hyperrouteArray = [];
  // console.log(spreadSheetData.values[0]);
  for(i=0; i<spreadSheetData.values.length; i++){
    const rowValues = spreadSheetData.values[i];
    const namesString = `${rowValues[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.NAME]}${rowValues[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ALT_NAMES] === "" ? "" : "/"+rowValues[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ALT_NAMES]}`;
    const canonLegendsString = canonLegendsToString([rowValues[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.CANON],rowValues[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.LEGENDS]]);
    const dateString = prettifyDateFromDateTo([rowValues[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.DATE_FROM],rowValues[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.DATE_TO]]);
    hyperrouteArray.push({
      id: rowValues[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID],
      text: `${namesString} [${canonLegendsString}] ${dateString === "" ? "" : "("+(dateString)+")"}`,
    });
  }
}

async function initHyperrouteSelect2AndLinkedEvents() {
  $(document).ready(async function() {
    // Create select 2
    loadHyperrouteFormSelect2();
    // Populate search form on select
    loadFormOnHyperrouteSelect();
    // Populate (human) parent on parent select
    generateHierarchicalStringOnHyperrouteParentSelect();
  });
}

function loadHyperrouteFormSelect2() {
  // Create select 2
  // Astro object search
  $("#hyperroute-search").select2({
    data: hyperrouteArray,
    placeholder: 'Hyperroute search....',
    allowClear: true
  });
  // Parent
  document.getElementById("hyperroute-parent").value = "";
  $("#hyperroute-parent").empty().val('').trigger('change');
  loadHyperrouteParentsSelect2();
}

/**
 * Load astronomical object parents select2
 */
function loadHyperrouteParentsSelect2() {
  // Create select 2
  // Astro object parent search
  $("#hyperroute-parent").select2({
    data: hyperrouteArray,
    placeholder: 'Parent ....',
    allowClear: true
  });
}

function loadFormOnHyperrouteSelect() {
  $("#hyperroute-search").on('change', function() {
    const hyperrouteId = $("#hyperroute-search").val();
    console.log(`Selected value (hyperrouteId) : ${hyperrouteId}`);
    loadHyperrouteForm(hyperrouteId);
    //highlightSourceButtonsIfSourced(hyperrouteId);
  });
}

function generateHierarchicalStringOnHyperrouteParentSelect() {
  $("#hyperroute-parent").on('change', async function() {
    let selectedValue = $("#hyperroute-parent").val();
    console.log('Selected value:', selectedValue);
    document.getElementById('hyperroute-parent-raw').value = await getHyperrouteParentHierarchy(selectedValue);
  });
}

/**
 * Reload form content (data) and refresh display
 */
async function refreshHyperrouteForm() {
  await loadHyperrouteArray();
  $(document).ready(function() {
    // Object
    // Reset select2
    document.getElementById("hyperroute-search").value = "";
    $("#hyperroute-search").empty().val('').trigger('change');
    loadHyperrouteFormSelect2();
    // Parent
    document.getElementById("object-parent").value = "";
    $("#hyperroute-parent").empty().val('').trigger('change');
    loadHyperrouteParentsSelect2();
  });
}

async function loadHyperrouteForm(hyperrouteId) {
  const foundHyperroutes = hyperrouteArray.filter((element) => element.id === hyperrouteId);
  // console.log(foundHyperroutes);
  // Alert if several object meet conditions (i.e. duplicated technical ID !!!!!)
  if(foundHyperroutes > 1) {
    alert(`Same ID ${hyperrouteId} for multiple object !!! Must be corrected manually in spreadsheet `);
    return;
  } else if(foundHyperroutes == 0 && hyperrouteId) {
    alert(`Bug alert - ID ${hyperrouteId} doesn't exist !!! Fix source code`);
    return;
  } else if (!hyperrouteId) {
    console.log("No object selected !");
    return;
  }
  if(hyperrouteId !== undefined) {
    // Search matching row
    const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTES.LAST_COLUMN_REF()}`;
    const results = await getSpreadSheetRowFromColumnKeyValuePairs(SPREADSHEET_ID, SHEETS.HYPERROUTES.NAME, sheetRange, [{key:SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID, value:hyperrouteId}]);
    // console.log(results);
    // ID must be unique
    if(results.length > 1) {
      alert("ID must be unique ! Check console (F12)");
      return;
    }
    const rowValues = results[0];
    console.log("Hyperroute loading ...", rowValues);
    // Populate form
    let hyperroute = rowValues;
    window.selectedHyperroute = rowValues;
    // Fields
    document.getElementById('hyperroute-tech-id').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID]); // Tech ID
    document.getElementById('hyperroute-human-id').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.HUMAN_ID]); // Human ID
    let updateDate = new Date(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.updated_at]).toLocaleString();
    document.getElementById('hyperroute-updated-at').value = updateDate; // Updated At
    setCheckboxStateFromValue('hyperroute-data-certified', sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.is_certified]), PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY); // Data certified ?
    document.getElementById('hyperroute-name').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.NAME]); // Name
    document.getElementById('hyperroute-alt-name').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ALT_NAMES]); // Alt Names
    setCheckboxStateFromValue('hyperroute-conjectural-name', sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.CONJECTURAL_NAME]), PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY); // Conjectural name
    document.getElementById('hyperroute-level').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.TRADE_ROUTE_LEVEL]); // Date from
    document.getElementById('hyperroute-parent-raw').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.PARENT_HUMAN]); // Parent RAW DATA
    $(document).ready(function() { // Parent
      $('#hyperroute-parent').select2().val(sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.PARENT_ID]));
      $('#hyperroute-parent').select2().trigger('change');
    });
    document.getElementById('hyperroute-datefrom').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.DATE_FROM]); // Date from
    document.getElementById('hyperroute-dateto').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.DATE_TO]); // Date to
    setCheckboxStateFromValue('hyperroute-canon', sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.CANON]), PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY); // Canon
    setCheckboxStateFromValue('hyperroute-legends', sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.LEGENDS]), PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY); // Legends
    setCheckboxStateFromValue('hyperroute-unlicensed', sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.UNLICENSED]), PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY); // Unlicensed
    document.getElementById('hyperroute-desc').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.DESC]); // Description
    document.getElementById('hyperroute-notes').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.NOTES]); // Notes
    document.getElementById('hyperroute-interesting').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.INTERESTING]); // Interesting
    document.getElementById('hyperroute-sources').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.URLS]); // Sources
    let urlList = separateStringToLinkList(sanitizeText(document.getElementById('hyperroute-sources').value), ",");
    console.log(urlList);
    let urlDisplayerSpan = document.getElementById('url-displayer')
    urlDisplayerSpan.innerHTML = "";
    // Source URL displayer
    for (const element of urlList) {
      let div = urlDisplayerSpan.appendChild(document.createElement("div"));
      div.appendChild(element);
    }
    document.getElementById('hyperroute-wikidata-id').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.WIKI_DATA_ID]); // WikidataID
    // Wiki DATA display
    let div = urlDisplayerSpan.appendChild(document.createElement("div"));
    div.appendChild(separateStringToLinkList(WIKIDATA_PAGE_PREFIX + sanitizeText(document.getElementById('hyperroute-wikidata-id').value), ",")[0]);
    document.getElementById('hyperroute-zoom-level').value = sanitizeText(hyperroute[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ZOOM_LEVEL]); // Zoom level
  }
}

async function getHyperrouteParentHierarchy(hyperrouteId) {
  const previousParentValue = document.getElementById('hyperroute-parent-raw').value;
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.HYPERROUTES.NAME, '!A2:F');
  const data = spreadSheetData.values;
  // Get parents recursively
  let currentHyperrouteId = hyperrouteId;
  // console.log("hyperroute Id : ", hyperrouteId);
  // console.log("data : ", data  ,"hyperrouteId : ", currentHyperrouteId ,"object row : ", data.find((row) => row[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] === currentHyperrouteId));
  let currentDataRow = data.find((row) => row[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID] === currentHyperrouteId);
  let parentString = "";
  // Avoid infinite loop and send message
  while(currentDataRow !== undefined && currentDataRow !== null) {
    // if(currentDataRow !== undefined && currentDataRow !== null && currentDataRow !== "") {
    if(currentDataRow[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.PARENT_ID] === currentDataRow[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID]) {
      alert(
        `Can't display parent hierarchy cause of hyperroute referencing itself :
        Hyperroute ID : ${currentDataRow[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID]}
        Hyperroute Name : ${currentDataRow[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.NAME]}
        Hyperroute Parent ID : ${currentDataRow[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.PARENT_ID]}`
      );
      break;
    }
    if(parentString !== "") {
      parentString += " < ";
    }
    parentString += currentDataRow[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.NAME];
    // Parent ID is missing
    if(currentDataRow[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.PARENT_ID] === "") {
      break;
    }
    // }
    currentDataRow = data.find((row) => row[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID] === currentDataRow[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.PARENT_ID]); // parentID
  }
  if(parentString === undefined || parentString === null || parentString === "") {
    console.log("parent string : ", parentString);
    return previousParentValue;
  } else {
    return parentString;
  }
}

/**
 * Hightlight source button if object data is sourced
 */
async function highlightSourceButtonsIfSourced (hyperrouteId) {
  // FFCB5D or EEBA4A
  
  const buttonBackGroundColor = "#FFCB5D";
  // Get all sources for object ID
  const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.LAST_COLUMN_REF()}`;
  const sourceRows = await getSpreadSheetRowFromColumnKeyValuePairs(
    SPREADSHEET_ID, SHEETS.HYPERROUTE_SOURCES.NAME, sheetRange, 
    [{key: SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.HYPERROUTE_ID, value: hyperrouteId}]
  );
  // console.log("SOURCE ROWS",sourceRows);
  document.querySelectorAll(".hyperroute-source-entry-button").forEach(button => {
    // console.log(button.parentElement.querySelector("label").getAttribute("for"));
    // Column stuff
    const formEntryId = button.parentElement.querySelector("label").getAttribute("for");
    const columnEntryName = getCustomColumnEntryName(formEntryId);
    if (columnEntryName === undefined) {
      return;
    }
    // Check if source column matches
    const isColumnFound = sourceRows.some(sourceRow => sourceRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.TARGET_COLUMN] === columnEntryName);
    if(isColumnFound) {
      // Highlight button
      button.style.backgroundColor = buttonBackGroundColor;
      button.style.borderColor = buttonBackGroundColor;
    } else {
      // Reset to default color
      button.style.backgroundColor = "";
      button.style.borderColor = "";
    }
  });
}

/**
 * Convert form (human readable) values to technical values
*/
async function convertHyperrouteFormValuesToData() {
  // Get form data
  let formData = new FormData(document.getElementById("hyperroute-form"));
  console.log(formData, selectedHyperroute);
  // Data formating
  window.dataToUpdate.length = 0; // reset array
  let name = sanitizeText(document.getElementById('hyperroute-name').value);
  
  // Making sure document.ready is ready before continuing....
  // Create a Promise that resolves when the document is ready
  let documentReadyPromise = new Promise(function(resolve) {
    $(document).ready(resolve);
  });
  // Use the Promise to execute code after the document is ready
  await documentReadyPromise.then(function() {
    // Below will only run after document is ready

    // Data array populating
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID] = sanitizeText(document.getElementById('hyperroute-tech-id').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.HUMAN_ID] = sanitizeText(document.getElementById('hyperroute-human-id').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.NAME] = name;
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ALT_NAMES] = sanitizeText(document.getElementById('hyperroute-alt-name').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.is_certified] = getValueFromCheckboxState('hyperroute-data-certified', PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.CONJECTURAL_NAME] = getValueFromCheckboxState('hyperroute-conjectural-name', PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.TRADE_ROUTE_LEVEL] = sanitizeText(document.getElementById('hyperroute-level').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.TYPE] = "Hyperspace Route";
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.PARENT_ID] = sanitizeText(document.getElementById('hyperroute-parent').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.PARENT_NAME] = sanitizeText(document.getElementById('hyperroute-parent-raw').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.DATE_FROM] = sanitizeText(document.getElementById('hyperroute-datefrom').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.DATE_TO] = sanitizeText(document.getElementById('hyperroute-dateto').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.CANON] = getValueFromCheckboxState('hyperroute-canon', PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.LEGENDS] = getValueFromCheckboxState('hyperroute-legends', PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.UNLICENSED] = getValueFromCheckboxState('hyperroute-unlicensed', PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.DESC] = sanitizeText(document.getElementById('hyperroute-desc').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.NOTES] = sanitizeText(document.getElementById('hyperroute-notes').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.INTERESTING] = sanitizeText(document.getElementById('hyperroute-interesting').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.URLS] = sanitizeText(document.getElementById('hyperroute-sources').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.WIKI_DATA_ID] = sanitizeText(document.getElementById('hyperroute-wikidata-id').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ZOOM_LEVEL] = sanitizeText(document.getElementById('hyperroute-zoom-level').value);
    // Auto values
    window.dataToUpdate[SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.updated_at] = new Date().toUTCString();
  });
}

/**
 * Set some form data in order to append them as new line in spreadsheet
 */
function setNewHyperrouteDataFormValues() {
  window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] = generateUUIDv7();
  window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.HUMAN_ID] = "";
}

/**
 * Show data changes before update
 */
async function showHyperrouteDataChange () {
  // Populate Validation Table
  await populateHyperrouteValidationTable(window.selectedHyperroute, window.dataToUpdate);
  // Display modal
  document.getElementById("modal-sheet-data-id-to-update").value = SHEETS.HYPERROUTES.ID;
  displayModal();
}

/**
 * Populate modal table with data from spreadsheet and form to check changes before spreadsheet update
 */
async function populateHyperrouteValidationTable(currentData, newData) {
  console.log(currentData, newData);
  let tableBody = document.getElementById('modal-table-body');
  tableBody.innerHTML = '';
  // console.log(tableBody);
  for (let index=0; index <= SPREADSHEET_HEADERS.HYPERROUTES.LAST_COLUMN_INDEX_NUMBER(); index++) {
    let tr = document.createElement('tr');
    
    let td1 = document.createElement('td');
    td1.textContent = getKeyByObjectValue(SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS, index);
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

/**********/
/* EVENTS */
/**********/

async function showHyperrouteDataAndUpdate() {
  // Convertion work
  await convertHyperrouteFormValuesToData();
  showHyperrouteDataChange();
}

async function updateHyperrouteData() {
  await convertHyperrouteFormValuesToData();
  const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTES.LAST_COLUMN_REF()}`;
  let returnCode = await updateSpreadSheetRowData(SPREADSHEET_ID, SHEETS.HYPERROUTES, sheetRange, SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID, window.dataToUpdate);
  if(returnCode) {
    alert("Hyperroute has been successfully updated !");
    closeModal();
    // Reload object array
    refreshForm();
  } else {
    alert("Error encoutered ! Check console (F12) for more details");
  }
}

async function addHyperrouteNewData() {
  await convertHyperrouteFormValuesToData();
  setNewHyperrouteDataFormValues();
  const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTES.LAST_COLUMN_REF()}`;
  let returnCode = await addSpreadSheetRowData(SPREADSHEET_ID, SHEETS.HYPERROUTES, sheetRange, window.dataToUpdate);
  // Confirm dialog
  // Add data
  // Confirmation and instruction dialog
  if(returnCode) {
    alert("Hyperroute has been successfully created at the end of the spreadsheet ! Add/reorganize human index manually ");
    // Reload select 2 arrays
    refreshHyperrouteForm();
  } else {
    alert("Error encoutered ! Check console (F12) for more details");
  }
}

async function deleteHyperrouteData() {
  const hyperrouteIdToDelete = document.getElementById('hyperroute-tech-id').value;
  // Confirm dialog
  if(confirm("Are you sure you want to delete object "+ document.getElementById('object-name').value + " with ID "+ hyperrouteIdToDelete +" ?")) {
    const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTES.LAST_COLUMN_REF()}`;
    let returnCode = await deleteSpreadSheetRowData(SPREADSHEET_ID, SHEETS.HYPERROUTES, sheetRange, SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS.ID, hyperrouteIdToDelete);
    // Delete data
    if(returnCode) {
      alert("Hyperroute has been successfully deleted ! Add/reorganize human index manually");
      // Reload object array
      refreshForm();
    } else {
      alert("Error encoutered ! Check console (F12) for more details");
    }
  }
}