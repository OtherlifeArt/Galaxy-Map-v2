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
  const foundObjects = astronomicalObjectSearchArray.filter((element) => element.id === hyperrouteId);
  // console.log(foundObjects);
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
    
  }
}

async function getHyperrouteParentHierarchy(hyperrouteId) {
  
}