
/**
 * Load all data lists, refresh/init dashboard
 */
async function initDataLoad() {
  
  // List objects
  await listObjects();
  await listTypes();
  await listTypeClasses();
  await listSources();
  // Dashboard
  initDashboard();
}

/**
 * Create or recreate astromical array
 */
async function loadAstronomicalObjectArray() {
  // Get data
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.OBJECTS.NAME, '!A2:Z');
  // Populate select2 search array
  astronomicalObjectSearchArray = [];
  // console.log(spreadSheetData.values[0]);
  for(i=0; i<spreadSheetData.values.length; i++){
    const rowValues = spreadSheetData.values[i];
    const namesString = `${rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NAME]}${rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ALT_NAMES] === "" ? "" : "/"+rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ALT_NAMES]}`;
    let typeString = rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE];
    if(rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE_CLASSES] !== undefined && rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE_CLASSES] !== "") {
      typeString += " - "+rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE_CLASSES];
    }
    const canonLegendsString = canonLegendsToString([rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.CANON],rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.LEGENDS]]);
    const dateString = prettifyDateFromDateTo([rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.DATE_FROM],rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.DATE_TO]]);
    astronomicalObjectSearchArray.push({
      id: rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID],
      text: `${namesString} (${typeString}) [${canonLegendsString}] ${dateString === "" ? "" : "("+(dateString)+")"}`,
      objectType: rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE],
      objectTypeClass: rowValues[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE_CLASSES],
    });
  }
}

/**
 * List Astronomical objects
 */
async function listObjects() {
  await loadAstronomicalObjectArray();
  // Load select2 and bind events
  await initAstroObjectsSelect2AndLinkedEvents();
}

/**
 * List Astronomical types
 */
async function listTypes() {
  // Get data
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.OBJECT_TYPES.NAME, '!A2:D');
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
  // console.log("OBJECT TYPE List : ", astronomicalObjectTypes);
  // Load select2
  loadTypeSelect2();
}

/**
 * List Astronomical type classes
 */
async function listTypeClasses() {
  // Get data
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.OBJECT_TYPE_CLASSES.NAME, '!A2:G');
  // Populate select2 search array
  astronomicalObjectTypeClasses = [];
  // console.log(spreadSheetData.values[0]);
  for(i=0; i<spreadSheetData.values.length; i++){
    const rowValues = spreadSheetData.values[i];
    
    astronomicalObjectTypeClasses.push({
      name: sanitizeText(rowValues[SPREADSHEET_HEADERS.OBJECT_TYPE_CLASSES.COLUMNS.NAME]),
      code: sanitizeText(rowValues[SPREADSHEET_HEADERS.OBJECT_TYPE_CLASSES.COLUMNS.CODE]),
      level: sanitizeText(rowValues[SPREADSHEET_HEADERS.OBJECT_TYPE_CLASSES.COLUMNS.TYPE_CLASS_LEVEL]),
      relationWithObjectType: sanitizeText(rowValues[SPREADSHEET_HEADERS.OBJECT_TYPE_CLASSES.COLUMNS.RELATION_WITH_OBJECT_TYPE]),
      parentTypeClass: sanitizeText(rowValues[SPREADSHEET_HEADERS.OBJECT_TYPE_CLASSES.COLUMNS.PARENT_TYPE_CLASS]),
      desc: sanitizeText(rowValues[SPREADSHEET_HEADERS.OBJECT_TYPE_CLASSES.COLUMNS.DESC]),
      // spaceEngineCode: sanitizeText(rowValues[SPREADSHEET_HEADERS.OBJECT_TYPE_CLASSES.COLUMNS.SPACE_ENGINE_CODE]),
    });
  }
  console.log("OBJECT TYPE CLASSES List : ", astronomicalObjectTypeClasses);
}

/**
 * List Sources
 */
async function listSources() {
  // Get data
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.SOURCES.NAME, '!A2:T');
  // Populate select2 search array
  astronomicalObjectSourceSearchArray = [];
  for(i=0; i<spreadSheetData.values.length; i++){
    const rowValues = spreadSheetData.values[i];

    const NAME = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.NAME]);
    const CONTINUITY = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.CONTINUITY]);
    const ERA = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.ERA]);
    const TIMELINE_DATE = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.TIMELINE_DATE]).replace(/ *\[[^)]*\] */g, "");
    const TYPE = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.TYPE]);
    const RELEASED = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.RELEASED]);
    const AUTHORS = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.AUTHORS]);
    
    // Don't push if line is empty (used as separator for presentation)
    if(NAME !== "") {

      let text = `${NAME} [${CONTINUITY}`;
      if (ERA !== "") {
        text += `/${ERA}`;
      }
      if (TIMELINE_DATE !== "") {
        text += `/${TIMELINE_DATE}`;
      }
      text += `] (${TYPE}`;
      if (RELEASED !== "") {
        text += `|${RELEASED}`;
      }
      if (AUTHORS !== "") {
        text += `|${AUTHORS}`;
      }
      text += `)`;

      astronomicalObjectSourceSearchArray.push({
        id: rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.ID],
        name: rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.NAME],
        continuity: rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.CONTINUITY],
        url: rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.URL],
        // Select 2 display
        text: text,
      });
    }
  }
  console.log(astronomicalObjectSourceSearchArray);
}



/**
 * Init search and parent Select2
 * Bind events when element are selected
 */
async function initAstroObjectsSelect2AndLinkedEvents() {
  $(document).ready(async function() {
    // Create select 2
    initFormSelect2();
    // Populate search form on select
    loadFormOnAstroObjectSelect();
    // Populate (human) parent on parent select
    generateHierarchicalStringOnAstroObjectParentSelect();
  });
}

/**
 * Init form select2
 */
async function initFormSelect2() {
  // Astro object search
  loadAstroObjectsSelect2();
  // Astro object Parents
  loadAstroObjectParentsSelect2();
}

/**
 * Reload form content (data) and refresh display
 */
async function refreshForm() {
  await loadAstronomicalObjectArray();
  $(document).ready(function() {
    // Object
    // Reset select2
    document.getElementById("object-search").value = "";
    $("#object-search").empty().val('').trigger('change');
    loadAstroObjectsSelect2();
    // $('#object-search').select2({
    //     data: astronomicalObjectSearchArray
    // });
    // Parent
    document.getElementById("object-parent").value = "";
    $("#object-parent").empty().val('').trigger('change');
    loadAstroObjectParentsSelect2();
    // $('#object-parent').select2({
    //     data: astronomicalObjectSearchArray
    // });
  });
}

/**
 * Load astronomical object select2
 */
function loadAstroObjectsSelect2() {
  // Create select 2
  // Astro object search
  $("#object-search").select2({
    data: astronomicalObjectSearchArray,
    placeholder: 'Astronomical object search....',
    allowClear: true
  });
}

/**
 * Load astronomical object parents select2
 */
function loadAstroObjectParentsSelect2() {
  // Create select 2
  // Astro object parent search
  $("#object-parent").select2({
    data: astronomicalObjectSearchArray,
    placeholder: 'Parent ....',
    allowClear: true
  });
}

/**
 * Populate search form on astro object select and hightlight sources button if exists
 */
function loadFormOnAstroObjectSelect() {
  $("#object-search").on('change', function() {
    const objectId = $("#object-search").val();
    console.log(`Selected value (objectId) : ${objectId}`);
    loadObjectForm(objectId);
    highlightSourceButtonsIfSourced(objectId);
  });
}

/**
 * Populate (human) parent on parent select
 */
function generateHierarchicalStringOnAstroObjectParentSelect() {
  $("#object-parent").on('change', async function() {
    let selectedValue = $("#object-parent").val();
    console.log('Selected value:', selectedValue);
    document.getElementById('object-parent-raw').value = await getParentHierarchy(selectedValue);
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
    const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF()}`;
    const results = await getSpreadSheetRowFromColumnKeyValuePairs(SPREADSHEET_ID, SHEETS.OBJECTS.NAME, sheetRange, [{key:SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID, value:objectID}]);
    console.log(results);
    // ID must be unique
    if(results.length > 1) {
      alert("ID must be unique ! Check console (F12)");
      return;
    }
    const rowValues = results[0];
    // Populate form
    let astroObject = rowValues;
    window.selectedAstronomicalObject = rowValues;
    document.getElementById('object-tech-id').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID]); // Tech ID
    document.getElementById('object-human-id').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.HUMAN_ID]); // Human ID
    let updateDate = new Date(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.updated_at]).toLocaleString();
    document.getElementById('object-updated-at').value = updateDate; // Updated At
    document.getElementById('object-data-certified').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.is_certified] === "YES"; // Data certified ?
    document.getElementById('object-name').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NAME]); // Name
    document.getElementById('object-alt-name').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ALT_NAMES]); // Alt Names
    document.getElementById('object-capital').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.IS_CAPITAL] === "YES"; // Capital
    document.getElementById('object-type-raw').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE]); // Type RAW DATA
    $(document).ready(function() { // Type
      $('#object-type').select2().val(sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE]));
      $('#object-type').select2().trigger('change');
      // Type classes
      document.getElementById('object-type-classes-raw').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE_CLASSES]);
      // $('#object-type-classes').select2().val(sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECT_TYPE_CLASSES.COLUMNS.NAME]));
    });
    document.getElementById('object-conjectural-name').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.CONJECTURAL_NAME] === "YES"; // Conjectural name
    document.getElementById('object-conjectural-type').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.CONJECTURAL_TYPE] === "YES"; // Conjectural type
    document.getElementById('object-orbital-rank').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ORBITAL_RANK]); // Orbital rank
    document.getElementById('object-size').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.SIZE]); // Orbital rank
    document.getElementById('object-parent-raw').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_HUMAN]); // Parent RAW DATA
    $(document).ready(function() { // Parent
      $('#object-parent').select2().val(sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_ID]));
      $('#object-parent').select2().trigger('change');
    });
    document.getElementById('object-datefrom').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.DATE_FROM]); // Date from
    document.getElementById('object-dateto').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.DATE_TO]); // Date to
    document.getElementById('object-canon').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.CANON] === "YES"; // Canon
    document.getElementById('object-legends').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.LEGENDS] === "YES"; // Legends
    document.getElementById('object-unlicensed').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.UNLICENSED] === "YES"; // Unlicensed
    document.getElementById('object-inmovies').checked = astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.IN_MOVIES] === "YES"; // In movies
    document.getElementById('object-grid-x').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.X_GRID]); // Grid X
    document.getElementById('object-grid-y').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Y_GRID]); // Grid Y
    document.getElementById('object-coord-x').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.X_COORD]); // X Coordinate
    document.getElementById('object-coord-y').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Y_COORD]); // Y Coordinate
    document.getElementById('object-coord-z').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Z_COORD]); // Z Coordinate
    document.getElementById('object-desc').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.DESC]); // Description
    document.getElementById('object-placement-certitude').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PLACEMENT_CERTITUDE]); // Placement certitude
    document.getElementById('object-placement-logic').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PLACEMENT_LOGIC]); // Placement logic
    document.getElementById('object-native-species').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NATIVE_SPECIES]); // Native species
    document.getElementById('object-orbit-appearance').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.APPEARANCE_FROM_ORBIT]); // Appearance from orbit
    document.getElementById('object-known-climate').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_CLIMATES]); // Known Climates
    document.getElementById('object-known-atmosphere').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_ATMOSPHERE]); // Known Atmosphere
    document.getElementById('object-known-surface-water').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_SURFACE_WATER]); // Known Surface Water
    document.getElementById('object-known-environments').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_ENVIRONMENTS]); // Known Environment
    document.getElementById('object-known-resources').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_ENVIRONMENTS]); // Known Resources
    document.getElementById('object-known-exports').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_EXPORTS]); // Known Exports
    document.getElementById('object-known-imports').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_IMPORTS]); // Known Imports
    document.getElementById('object-point-of-interest').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.POINT_OF_INTEREST]); // Point of interest
    document.getElementById('object-length-of-day').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.LENGTH_OF_DAY]); // Length of day
    document.getElementById('object-length-of-year').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.LENGTH_OF_YEAR]); // Length of year
    document.getElementById('object-capital-city').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.CAPITAL]); // Capital
    document.getElementById('object-starports').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.STARPORTS]); // Starports
    document.getElementById('object-notes').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NOTES]); // Notes
    document.getElementById('object-interesting').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.INTERESTING]); // Interesting
    document.getElementById('object-sources').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.URL]); // Sources
    let urlList = separateStringToLinkList(sanitizeText(document.getElementById('object-sources').value), ",");
    console.log(urlList);
    let urlDisplayerSpan = document.getElementById('url-displayer')
    urlDisplayerSpan.innerHTML = "";
    // Source URL displayer
    for (const element of urlList) {
      let div = urlDisplayerSpan.appendChild(document.createElement("div"));
      div.appendChild(element);
    }

    document.getElementById('object-wikidata-id').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.WIKI_DATA_ID]); // WikidataID
    // Wiki DATA display
    let div = urlDisplayerSpan.appendChild(document.createElement("div"));
    div.appendChild(separateStringToLinkList(WIKIDATA_PAGE_PREFIX + sanitizeText(document.getElementById('object-wikidata-id').value), ",")[0]);

    document.getElementById('object-zoom-level').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ZOOM_LEVEL]); // Zoom level
    document.getElementById('object-tooltip-permanent').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.tooltip_permanent]); // Tooltip permanent
    document.getElementById('object-tooltip-direction').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.tooltip_direction]); // Tooltip direction
    document.getElementById('object-class-name').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.className]); // Tooltip Class Name
    document.getElementById('object-index-geo').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.index_geo]); // Index Geo
    document.getElementById('object-geom').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.GEOM]); // Index Geo
    document.getElementById('object-geom-type').value = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.GEOM_TYPE]); // Geom Type
    document.getElementById('object-punctual').checked = sanitizeText(astroObject[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PUNCTUAL]) === "YES"; // Punctual
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
    // Populate class type on type select
    $("#object-type").on('change', function() {
      console.log('Selected value:', $("#object-type").val());
      loadTypeClasses($("#object-type").val());
    });
    // Populate class type raw on change
    $("#object-type-classes").on('select2:select', function() {
      console.log('Selected value:', $("#object-type-classes").val());
      document.getElementById("object-type-classes-raw").value = $("#object-type-classes").val(); // set type classes value in form
    });
    // 
    $("#object-type-classes").on('select2:clear', function() {
      document.getElementById("object-type-classes-raw").value = ""; // Clean form input
    });
  });
}

/**
 * Load type class selects function of type
 */
function loadTypeClasses(astroObjectType) {
  const astroObjectTypeEntry = astronomicalObjectTypes.find(type => type.id === astroObjectType);
  const matchingTypes = (astroObjectTypeEntry.parentId  && astroObjectTypeEntry.parentId !== "") ? astroObjectTypeEntry.parentId : astroObjectTypeEntry.id;
  loadTypeClassesSelect2(matchingTypes);
}

/**
 * Load type classes select2
 * 
 * @param {String} astroObjectType 
 */
function loadTypeClassesSelect2(matchingTypes) {
  // Extract current selection of type classes related to type
  let relatedAstroObjectTypeClasses = getRelatedAstroObjectTypeClasses(matchingTypes);
  $(document).ready(function() {
    // Reset select2
    document.getElementById("object-type-classes").value = "";
    $("#object-type-classes").empty().val('').trigger('change');
    // Create select 2
    $("#object-type-classes").select2({
      data: relatedAstroObjectTypeClasses,
      allowClear: true,
      placeholder: 'Astronomical Type Class ...',
      templateResult: formatTypeClassResult,
    });
  });
}

function formatTypeClassResult(node) {
  var $result = $('<span style="padding-left:' + (20 * node.level) + 'px;">' + node.text + '</span>');
  return $result;
};

/**
 * Return array of related object type classes
 * 
 * @param {String[]} objectTypes 
 */
function getRelatedAstroObjectTypeClasses(objectTypes) {
  let relatedAstroObjectTypeClasses = [{id: "", text: "", level: 0,}]; // Array with empty value as first value
  console.log(objectTypes);
  for(let typeClass of astronomicalObjectTypeClasses) {
    if(objectTypes === typeClass.relationWithObjectType) {
      relatedAstroObjectTypeClasses.push({
        id: typeClass.name,
        text: typeClass.name,
        level: typeClass.level,
      });
    }
  }
  return relatedAstroObjectTypeClasses;
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
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] = sanitizeText(document.getElementById('object-tech-id').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.HUMAN_ID] = sanitizeText(document.getElementById('object-human-id').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.HUMAN_NAME] = humanName;
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NAME] = name;
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ALT_NAMES] = sanitizeText(document.getElementById('object-alt-name').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.is_certified] = document.getElementById('object-data-certified').checked ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.IS_CAPITAL] = document.getElementById('object-capital').checked ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE] = sanitizeText(document.getElementById('object-type').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.TYPE_CLASSES] = sanitizeText(document.getElementById('object-type-classes-raw').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.CONJECTURAL_NAME] = document.getElementById('object-conjectural-name').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.CONJECTURAL_TYPE] = document.getElementById('object-conjectural-type').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ORBITAL_RANK] = orbitalRank;
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.SIZE] = sanitizeText(document.getElementById('object-size').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_ID] = sanitizeText(document.getElementById('object-parent').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_HUMAN] = sanitizeText(document.getElementById('object-parent-raw').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.DATE_FROM] = sanitizeText(document.getElementById('object-datefrom').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.DATE_TO] = sanitizeText(document.getElementById('object-dateto').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.CANON] = document.getElementById('object-canon').checked ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.LEGENDS] = document.getElementById('object-legends').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.UNLICENSED] = document.getElementById('object-unlicensed').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.IN_MOVIES] = document.getElementById('object-inmovies').checked  ? "YES" : "";
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.X_GRID] = sanitizeText(document.getElementById('object-grid-x').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Y_GRID] = sanitizeText(document.getElementById('object-grid-y').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.X_COORD] = sanitizeText(document.getElementById('object-coord-x').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Y_COORD] = sanitizeText(document.getElementById('object-coord-y').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.Z_COORD] = sanitizeText(document.getElementById('object-coord-z').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.DESC] = sanitizeText(document.getElementById('object-desc').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PLACEMENT_CERTITUDE] = sanitizeText(document.getElementById('object-placement-certitude').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PLACEMENT_LOGIC] = sanitizeText(document.getElementById('object-placement-logic').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NATIVE_SPECIES] = sanitizeText(document.getElementById('object-native-species').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.APPEARANCE_FROM_ORBIT] = sanitizeText(document.getElementById('object-orbit-appearance').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_CLIMATES] = sanitizeText(document.getElementById('object-known-climate').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_ATMOSPHERE] = sanitizeText(document.getElementById('object-known-atmosphere').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_SURFACE_WATER] = sanitizeText(document.getElementById('object-known-surface-water').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_ENVIRONMENTS] = sanitizeText(document.getElementById('object-known-environments').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_RESOURCES] = sanitizeText(document.getElementById('object-known-resources').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_EXPORTS] = sanitizeText(document.getElementById('object-known-exports').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.KNOWN_IMPORTS] = sanitizeText(document.getElementById('object-known-imports').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.POINT_OF_INTEREST] = sanitizeText(document.getElementById('object-point-of-interest').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.LENGTH_OF_DAY] = sanitizeText(document.getElementById('object-length-of-day').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.LENGTH_OF_YEAR] = sanitizeText(document.getElementById('object-length-of-year').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.CAPITAL] = sanitizeText(document.getElementById('object-capital-city').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.STARPORTS] = sanitizeText(document.getElementById('object-starports').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NOTES] = sanitizeText(document.getElementById('object-notes').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.INTERESTING] = sanitizeText(document.getElementById('object-interesting').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.URL] = sanitizeText(document.getElementById('object-sources').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ZOOM_LEVEL] = sanitizeText(document.getElementById('object-zoom-level').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.tooltip_permanent] = sanitizeText(document.getElementById('object-tooltip-permanent').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.tooltip_direction] = sanitizeText(document.getElementById('object-tooltip-direction').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.className] = sanitizeText(document.getElementById('object-class-name').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.index_geo] = sanitizeText(document.getElementById('object-index-geo').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.WIKI_DATA_ID] = sanitizeText(document.getElementById('object-wikidata-id').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.GEOM] = sanitizeText(document.getElementById('object-geom').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.GEOM_TYPE] = sanitizeText(document.getElementById('object-geom-type').value);
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PUNCTUAL] = document.getElementById('object-punctual').checked  ? "YES" : "NO";
    // Auto values
    window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.updated_at] = new Date().toUTCString();
  });
}

/**
 * Set some form data in order to append them as new line in spreadsheet
 */
function setNewDataFormValues() {
  window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] = generateUUIDv7();
  window.dataToUpdate[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.HUMAN_ID] = "";
}


/**
 * Populate modal table with data from spreadsheet and form to check changes before spreadsheet update
 */
async function populateValidationTable(currentData, newData) {
  console.log(currentData, newData);
  let tableBody = document.getElementById('modal-table-body');
  tableBody.innerHTML = '';
  // console.log(tableBody);
  for (let index=0; index <= SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_INDEX_NUMBER(); index++) {
    let tr = document.createElement('tr');
    
    let td1 = document.createElement('td');
    td1.textContent = getKeyByObjectValue(SPREADSHEET_HEADERS.OBJECTS.COLUMNS, index);
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
 * Return formatted string of inverted parent hierarchy from higher parent to object  
 * Example : Dolduur sector < Mid Rim < The Galaxy
 * 
 * @param objectID UUID
 */
async function getParentHierarchy(objectID) {
  const previousParentValue = document.getElementById('object-parent-raw').value;
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.OBJECTS.NAME, '!A2:F');
  const data = spreadSheetData.values;
  // Get parents recursively
  let currentObjectID = objectID;
  console.log("objectID : ", objectID);
  // console.log("data : ", data  ,"objectid : ", currentObjectID ,"object row : ", data.find((row) => row[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] === currentObjectID));
  let currentDataRow = data.find((row) => row[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] === currentObjectID);
  let parentString = "";
  while(currentDataRow !== undefined && currentDataRow !== null) {
    if(currentDataRow !== undefined && currentDataRow !== null) {
      if(parentString !== "") {
        parentString += " < ";
      }
      parentString += currentDataRow[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.NAME];
    }
    currentDataRow = data.find((row) => row[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] === currentDataRow[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_ID]); // parentID
  }
  if(parentString === undefined || parentString === null) {
    console.log("parent string : ", parentString);
    return previousParentValue;
  } else {
    return parentString;
  }
}

/**
 * Hightlight source button if object data is sourced
 */
async function highlightSourceButtonsIfSourced (objectId) {
  // FFCB5D or EEBA4A
  
  const buttonBackGroundColor = "#FFCB5D";
  // Get all sources for object ID
  const sheetRange = `!${SPREADSHEET_HEADERS.OBJECT_SOURCES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECT_SOURCES.LAST_COLUMN_REF()}`;
  const sourceRows = await getSpreadSheetRowFromColumnKeyValuePairs(
    SPREADSHEET_ID, SHEETS.OBJECT_SOURCES.NAME, sheetRange, 
    [{key: SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.OBJECT_ID, value: objectId}]
  );
  // console.log("SOURCE ROWS",sourceRows);
  if(sourceRows != undefined && sourceRows.length > 0) {
    document.querySelectorAll(".object-source-entry-button").forEach(button => {
      // console.log(button.parentElement.querySelector("label").getAttribute("for"));
      // Column stuff
      const formEntryId = button.parentElement.querySelector("label").getAttribute("for");
      const columnEntryName = getCustomColumnEntryName(formEntryId);
      if (columnEntryName === undefined) {
        return;
      }
      // Check if source column matches
      const isColumnFound = sourceRows.some(sourceRow => sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.TARGET_COLUMN] === columnEntryName);
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
}

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
  const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF()}`;
  let returnCode = await updateSpreadSheetRowData(SPREADSHEET_ID, SHEETS.OBJECTS, sheetRange, SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID, window.dataToUpdate);
  if(returnCode) {
    alert("Object has been successfully updated !");
    closeModal();
    // Reload object array
    refreshForm();
  } else {
    alert("Error encoutered ! Check console (F12) for more details");
  }
}

async function addNewData() {
  await convertFormValuesToData();
  setNewDataFormValues();
  const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF()}`;
  let returnCode = await addSpreadSheetRowData(SPREADSHEET_ID, SHEETS.OBJECTS, sheetRange, window.dataToUpdate);
  // Confirm dialog
  // Add data
  // Confirmation and instruction dialog
  if(returnCode) {
    alert("Object has been successfully created at the end of the spreadsheet ! Add/reorganize human index manually ");
    // Reload select 2 arrays
    refreshForm();
  } else {
    alert("Error encoutered ! Check console (F12) for more details");
  }
}

async function deleteData() {
  const objectIDToDelete = document.getElementById('object-tech-id').value;
  // Confirm dialog
  if(confirm("Are you sure you want to delete object "+ document.getElementById('object-name').value + " with ID "+ objectIDToDelete +" ?")) {
    const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF()}`;
    let returnCode = await deleteSpreadSheetRowData(SPREADSHEET_ID, SHEETS.OBJECTS, sheetRange, SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID, objectIDToDelete);
    // Delete data
    if(returnCode) {
      alert("Object has been successfully deleted ! Add/reorganize human index manually");
      // Reload object array
      refreshForm();
    } else {
      alert("Error encoutered ! Check console (F12) for more details");
    }
  }
}