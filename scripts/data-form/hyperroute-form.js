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