/**
 * Load sources Select2
 */
async function loadSourcesSelect2(selectDomElement, selectedID) {
  $(document).ready(function() {
    // $(".modal-source-field").each(function (){
    $(selectDomElement).select2({
        data: sourceSearchArray,
        placeholder: 'Source search....',
        allowClear: true,
        // dropdownAutoWidth: true, width: 'auto',
        containerCssClass: "modal-source-id-select2" 
    });
    $(selectDomElement).select2().val(selectedID);
    $(selectDomElement).select2().trigger('change');
  });
  // });
}

/**
 * List Sources
 */
async function listSources() {
  // Get data
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.SOURCES.NAME, '!A2:T');
  // Populate select2 search array
  sourceSearchArray = [];
  for(i=0; i<spreadSheetData.values.length; i++){
    const rowValues = spreadSheetData.values[i];

    const ID = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.ID]);
    const NAME = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.NAME]);
    const CONTINUITY = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.CONTINUITY]);
    const ERA = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.ERA]);
    const TIMELINE_DATE = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.TIMELINE_DATE]).replace(/ *\[[^)]*\] */g, "");
    const TYPE = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.TYPE]);
    const RELEASED = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.RELEASED]);
    const AUTHORS = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.AUTHORS]);
    const WOOKIEPEDIA = sanitizeText(rowValues[SPREADSHEET_HEADERS.SOURCES.COLUMNS.WOOKIEPEDIA]);
    
    // Don't push if source id is empty (used as separator for presentation)
    if(ID !== "") {

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

      sourceSearchArray.push({
        id: ID,
        name: NAME,
        continuity: CONTINUITY,
        url: WOOKIEPEDIA,
        // Select 2 display
        text: text,
      });
    }
  }
  console.log("Sources", sourceSearchArray);
}

/**
 * Returns custom column name from form entry id (input label id)
 */
function getCustomColumnEntryName(formEntryId) {
  let columnEntryName;
  switch (formEntryId) {
    // Object
    case "object-name":
      columnEntryName = "NAME";
      break;
    case "object-alt-name":
      columnEntryName = "ALT_NAME";
      break;
    case "object-capital":
      columnEntryName = "IS_CAPITAL";
      break;
    case "object-type":
      columnEntryName = "TYPE";
      break;
    case "object-type-classes":
      columnEntryName = "TYPE_CLASSES";
      break;
    case "object-parent":
      columnEntryName = "PARENT";
      break;
    case "object-orbital-rank":
      columnEntryName = "ORBITAL_RANK";
      break;
    case "object-size":
      columnEntryName = "SIZE";
      break;
    case "object-datefrom":
      columnEntryName = "DATE_FROM";
      break;
    case "object-dateto":
      columnEntryName = "DATE_TO";
      break;
    case "object-grid-y":
      columnEntryName = "X_Y_GRID";
      break;
    case "object-coord-z":
      columnEntryName = "X_Y_Z_COORD";
      break;
    case "object-desc":
        columnEntryName = "DESC";
        break;
    case "object-native-species":
      columnEntryName = "NATIVE_SPECIES";
      break;
    case "object-known-environments":
      columnEntryName = "KNOWN_ENVIRONMENTS";
      break;
    case "object-interesting":
      columnEntryName = "INTERESTING";
      break;
    case "object-orbit-appearance":
      columnEntryName = "APPEARANCE_FROM_ORBIT";
      break;
    case "object-known-climate":
      columnEntryName = "KNOWN_CLIMATES";
      break;
    case "object-known-atmosphere":
      columnEntryName = "KNOWN_ATMOSPHERE";
      break;
    case "object-known-surface-water":
      columnEntryName = "KNOWN_SURFACE_WATER";
      break;
    case "object-known-resources":
      columnEntryName = "KNOWN_RESOURCES";
      break;
    case "object-known-exports":
      columnEntryName = "KNOWN_EXPORTS";
      break;
    case "object-known-imports":
      columnEntryName = "KNOWN_IMPORTS";
      break;
    case "object-point-of-interest":
      columnEntryName = "POINT_OF_INTEREST";
      break;
    case "object-length-of-day":
      columnEntryName = "LENGTH_OF_DAY";
      break;
    case "object-length-of-year":
      columnEntryName = "LENGTH_OF_YEAR";
      break;
    case "object-capital-city":
      columnEntryName = "CAPITAL";
      break;
    case "object-starports":
      columnEntryName = "STARPORTS";
      break;
    case "object-placement-certitude":
      columnEntryName = "PLACEMENT_CERTITUDE";
      break;
    // Hyperroute
    case "hyperroute-name":
      columnEntryName = "NAME";
      break;
    case "hyperroute-alt-name":
      columnEntryName = "ALT_NAME";
      break;
    case "hyperroute-level":
      columnEntryName = "TRADE_ROUTE_LEVEL";
      break;
    case "hyperroute-parent":
      columnEntryName = "PARENT";
      break;
    case "hyperroute-datefrom":
      columnEntryName = "DATE_FROM";
      break;
    case "hyperroute-dateto":
      columnEntryName = "DATE_TO";
      break;
      case "hyperroute-desc":
        columnEntryName = "DESC";
        break;
      case "hyperroute-interesting":
        columnEntryName = "INTERESTING";
        break;
    // Debug
    default:
      console.log(`Entry with ID ${formEntryId} not referenced !`);
      alert("Source error : entry unknown - check console (F12)");
      break;
  }
  return columnEntryName;
}

