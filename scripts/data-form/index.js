/* CONSTANTS */

// Main spreadheet
const SPREADSHEET_ID = "1roSF9J7vqFq7rOswCIXv7Htw0_nL9FxANDzqZxfZyDY";
// Spreadsheet tabs
const SHEETS = {
  OBJECTS: {
    ID: "219651912", NAME: "Objects",
  },
  HYPERROUTES: {
    ID: "591513308", NAME: "Hyperroutes",
  },
  HYPERROUTE_SECTIONS: {
    ID: "1856049918", NAME: "Hyperroute sections",
  },
  OBJECT_TYPES: {
    ID: "0", NAME: "Object types",
  },
  OBJECT_TYPE_CLASSES: {
    ID: "1472204423", NAME: "Object type classes",
  },
  OBJECT_SOURCES: {
    ID: "288489171", NAME: "Object Sources",
  },
  HYPERROUTE_SOURCES: {
    ID: "551196436", NAME: "Hyperroute Sources",
  },
  SOURCES: {
    ID: "1968171245", NAME: "Sources",
  },
}

// SPREADSHEET COLUMNS

const SPREADSHEET_HEADERS = {
  "OBJECTS": {
    COLUMNS : {
      ID: 0,
      HUMAN_ID: 1,
      HUMAN_NAME: 2,
      NAME: 3,
      ALT_NAMES: 4,
      PARENT_ID: 5,
      PARENT_HUMAN: 6,
      DATE_FROM: 7,
      DATE_TO: 8,
      CANON: 9,
      LEGENDS: 10,
      UNLICENSED: 11,
      IN_MOVIES: 12,
      TYPE: 13,
      TYPE_CLASSES: 14,
      IS_CAPITAL: 15,
      X_GRID: 16,
      Y_GRID: 17,
      X_COORD: 18,
      Y_COORD: 19,
      Z_COORD: 20,
      ORBITAL_RANK: 21,
      DESC: 22,
      CONJECTURAL_NAME: 23,
      CONJECTURAL_TYPE: 24,
      PLACEMENT_CERTITUDE: 25,
      PLACEMENT_LOGIC: 26,
      NATIVE_SPECIES: 27,
      KNOWN_ENVIRONMENTS: 28,
      NOTES: 29,
      INTERESTING: 30,
      URL: 31,
      ZOOM_LEVEL: 32,
      tooltip_permanent: 33,
      tooltip_direction: 34,
      className: 35,
      index_geo: 36,
      updated_at: 37,
      is_certified: 38,
      WIKI_DATA_ID: 39,
      GEOM: 40,
      GEOM_TYPE: 41,
      PUNCTUAL: 42,
      SIZE: 43,
      APPEARANCE_FROM_ORBIT: 44,
      POPULATION: 45,
      GRAVITY: 46,
      GOVERNMENT: 47,
      TECH_LEVEL: 48,
      KNOWN_CLIMATES: 49,
      KNOWN_ATMOSPHERE: 50,
      KNOWN_SURFACE_WATER: 51,
      KNOWN_RESOURCES: 52,
      KNOWN_EXPORTS: 53,
      KNOWN_IMPORTS: 54,
      POINTS_OF_INTEREST: 55,
      LENGTH_OF_DAY: 56,
      LENGTH_OF_YEAR: 57,
      CAPITAL: 58,
      STARPORTS: 59,
      IMMIGRANT_SPECIES: 60,
    },
    FIRST_COLUMN_REF: 'A',
    LAST_COLUMN_REF: () => {
      // Search of column index (2 letters limit - 676 columns should be enough) 
      const COLUMN_NUMBER = SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_INDEX_NUMBER();
      const FIRST_CHAR = COLUMN_NUMBER / 26 >= 1 ? String.fromCharCode(64 + parseInt(COLUMN_NUMBER / 26)) : "";
      const LAST_CHAR = String.fromCharCode(65 + COLUMN_NUMBER % 26);
      return FIRST_CHAR + LAST_CHAR;
    },
    LAST_COLUMN_INDEX_NUMBER: () => { return Object.keys(SPREADSHEET_HEADERS.OBJECTS.COLUMNS).length -1},
  },
  "OBJECT_SOURCES": {
    COLUMNS : {
      ID: 0,
      OBJECT_ID: 1,
      OBJECT_NAME: 2,
      SOURCE_ID: 3,
      SOURCE_NAME: 4,
      SOURCE_PATH: 5,
      TARGET_COLUMN: 6,
      URL: 7,
      CANON: 8,
      LEGENDS: 9,
      NOTE: 10,
    },
    FIRST_COLUMN_REF: 'A',
    LAST_COLUMN_REF: () => {
      // Search of column index (2 letters limit - 676 columns should be enough) 
      const COLUMN_NUMBER = SPREADSHEET_HEADERS.OBJECT_SOURCES.LAST_COLUMN_INDEX_NUMBER();
      const FIRST_CHAR = COLUMN_NUMBER / 26 >= 1 ? String.fromCharCode(64 + parseInt(COLUMN_NUMBER / 26)) : "";
      const LAST_CHAR = String.fromCharCode(65 + COLUMN_NUMBER % 26);
      return FIRST_CHAR + LAST_CHAR;
    },
    LAST_COLUMN_INDEX_NUMBER: () => { return Object.keys(SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS).length -1},
  },
  "SOURCES": {
    COLUMNS : {
      ID: 0,
      NAME: 1,
      CONTINUITY: 2,
      RELEASED: 3,
      TYPE: 4,
      ERA: 5,
      TIMELINE_DATE: 6,
      TIMELINE_NOTES: 7,
      AUTHORS: 8,
      WOOKIEPEDIA: 9,
    },
    FIRST_COLUMN_REF: 'A',
    LAST_COLUMN_REF: () => {
      // Search of column index (2 letters limit - 676 columns should be enough) 
      const COLUMN_NUMBER = SPREADSHEET_HEADERS.OBJECT_SOURCES.LAST_COLUMN_INDEX_NUMBER();
      const FIRST_CHAR = COLUMN_NUMBER / 26 >= 1 ? String.fromCharCode(64 + parseInt(COLUMN_NUMBER / 26)) : "";
      const LAST_CHAR = String.fromCharCode(65 + COLUMN_NUMBER % 26);
      return FIRST_CHAR + LAST_CHAR;
    },
    LAST_COLUMN_INDEX_NUMBER: () => { return Object.keys(SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS).length -1},
  },
  "OBJECT_TYPE_CLASSES": {
    COLUMNS : {
      NAME: 0,
      CODE: 1,
      TYPE_CLASS_LEVEL: 2,
      RELATION_WITH_OBJECT_TYPE: 3,
      PARENT_TYPE_CLASS: 4,
      DESC: 5,
      SPACE_ENGINE_CODE: 6,
    },
    FIRST_COLUMN_REF: 'A',
    LAST_COLUMN_REF: () => {
      // Search of column index (2 letters limit - 676 columns should be enough) 
      const COLUMN_NUMBER = SPREADSHEET_HEADERS.OBJECT_TYPE_CLASSES.LAST_COLUMN_INDEX_NUMBER();
      const FIRST_CHAR = COLUMN_NUMBER / 26 >= 1 ? String.fromCharCode(64 + parseInt(COLUMN_NUMBER / 26)) : "";
      const LAST_CHAR = String.fromCharCode(65 + COLUMN_NUMBER % 26);
      return FIRST_CHAR + LAST_CHAR;
    },
    LAST_COLUMN_INDEX_NUMBER: () => { return Object.keys(SPREADSHEET_HEADERS.OBJECT_TYPE_CLASSES.COLUMNS).length -1},
  },
  "HYPERROUTES":{
    COLUMNS : {
      ID: 0,
      HUMAN_ID: 1,
      NAME: 2,
      ALT_NAMES: 3,
      PARENT_ID: 4,
      PARENT_NAME: 5,
      DATE_FROM: 6,
      DATE_TO: 7,
      CANON: 8,
      LEGENDS: 9,
      UNLICENSED: 10,
      TYPE: 11,
      TRADE_ROUTE_LEVEL: 12,
      URLS: 13,
      WIKI_DATA_ID: 14,
      DESC: 15,
      ZOOM_LEVEL: 16,
      CONJECTURAL_NAME: 17,
      NOTES: 18,
      INTERESTING: 19,
      updated_at: 20,
      is_certified: 21,
      GEOM: 22,
      GEOM_TYPE: 23,
    },
    FIRST_COLUMN_REF: 'A',
    LAST_COLUMN_REF: () => {
      // Search of column index (2 letters limit - 676 columns should be enough) 
      const COLUMN_NUMBER = SPREADSHEET_HEADERS.HYPERROUTES.LAST_COLUMN_INDEX_NUMBER();
      const FIRST_CHAR = COLUMN_NUMBER / 26 >= 1 ? String.fromCharCode(64 + parseInt(COLUMN_NUMBER / 26)) : "";
      const LAST_CHAR = String.fromCharCode(65 + COLUMN_NUMBER % 26);
      return FIRST_CHAR + LAST_CHAR;
    },
    LAST_COLUMN_INDEX_NUMBER: () => { return Object.keys(SPREADSHEET_HEADERS.HYPERROUTES.COLUMNS).length -1},
  },
  "HYPERROUTE_SECTIONS":{
    COLUMNS : {
      ID: 0,
      HUMAN_ID: 1,
      LOCATION_A_ID: 2,
      LOCATION_A: 3,
      LOCATION_B_ID: 4,
      LOCATION_B: 5,
      HYPERROUTE_ID: 6,
      HYPERROUTE: 7,
      DATE_FROM: 8,
      DATE_TO: 9,
      CANON: 10,
      LEGENDS: 11,
      UNLICENSED: 12,
      AVERAGE_TRAVEL_TIME: 13,
      DESC: 14,
      PLACEMENT_CERTITUDE: 15,
      PLACEMENT_LOGIC: 16,
      NOTES: 17,
      INTERESTING: 18,
      updated_at: 19,
      is_certified: 20,
      GEOM: 21,
      GEOM_TYPE: 22,
    },
    FIRST_COLUMN_REF: 'A',
    LAST_COLUMN_REF: () => {
      // Search of column index (2 letters limit - 676 columns should be enough) 
      const COLUMN_NUMBER = SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.LAST_COLUMN_INDEX_NUMBER();
      const FIRST_CHAR = COLUMN_NUMBER / 26 >= 1 ? String.fromCharCode(64 + parseInt(COLUMN_NUMBER / 26)) : "";
      const LAST_CHAR = String.fromCharCode(65 + COLUMN_NUMBER % 26);
      return FIRST_CHAR + LAST_CHAR;
    },
    LAST_COLUMN_INDEX_NUMBER: () => { return Object.keys(SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS).length -1},
  },
  "HYPERROUTE_SOURCES": {
    COLUMNS : {
      ID: 0,
      HYPERROUTE_ID: 1,
      HYPERROUTE_NAME: 2,
      SOURCE_ID: 3,
      SOURCE_NAME: 4,
      SOURCE_PATH: 5,
      TARGET_COLUMN: 6,
      URL: 7,
      CANON: 8,
      LEGENDS: 9,
      NOTE: 10,
    },
    FIRST_COLUMN_REF: 'A',
    LAST_COLUMN_REF: () => {
      // Search of column index (2 letters limit - 676 columns should be enough) 
      const COLUMN_NUMBER = SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.LAST_COLUMN_INDEX_NUMBER();
      const FIRST_CHAR = COLUMN_NUMBER / 26 >= 1 ? String.fromCharCode(64 + parseInt(COLUMN_NUMBER / 26)) : "";
      const LAST_CHAR = String.fromCharCode(65 + COLUMN_NUMBER % 26);
      return FIRST_CHAR + LAST_CHAR;
    },
    LAST_COLUMN_INDEX_NUMBER: () => { return Object.keys(SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS).length -1},
  },
}

// console.log(SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF());
// console.log(SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_INDEX_NUMBER());


// API AUTH
const API_KEY_INPUT = document.getElementById("api-key");
const CLIENT_ID_INPUT = document.getElementById("client-id");

// Discovery doc URL for APIs
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
// const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

// OTHER STATIC VALUES

const WIKIDATA_PAGE_PREFIX = 'https://www.wikidata.org/wiki/';

// FORM

// Element shortcuts
const SEARCH_INPUT = document.getElementById('object-search');
const CLASS_TYPE_SELECT_CONTAINER = document.getElementById('object-type-classes');

// Preformated Values
PREFORMATED_VALUES = {
  YES_NO_EMPTY_ARRAY: ["YES", "NO", ""],
  TRUE_FALSE_EMPTY_ARRAY: ["TRUE", "FALSE", ""],
}

/* VARIABLES */
let tokenClient;
let isGapiLoaded = false;
let isGisLoaded = false;
let gapiInited = false;
let gisInited = false;

document.getElementById('authenticate-button').style.visibility = 'hidden';
document.getElementById('authorize-button').style.visibility = 'hidden';
document.getElementById('signout-button').style.visibility = 'hidden';

let astronomicalObjectSearchArray = [];
let selectedAstronomicalObject;
let astronomicalObjectTypes = [];
let astronomicalObjectTypeClasses = [];
let sourceSearchArray = [];

let hyperrouteArray = [];
let selectedHyperroute;

// Trick to export some values from other scopes
window.dataToUpdate = [];
window.fromJQuery = {
};
// Trick to make leaflet search control work on the first try
let isLeafletSearchControlAlreadyInitialized = false;

// Datatable
let objectDatatable;
let hyperrouteDatatable;

// Wizard
let objectParentWizard;

/* FUNCTIONS */
/**
 * Load all data lists, refresh/init dashboard
 */
async function initDataLoad() {
  
  // Init Astronomical Objects
  await initAstronomicalObjects(); // Object, type, type classes, object sources
  document.getElementById("refresh-astro-objects-button").disabled = false;
  // document.getElementById("refresh-types-button").disabled = false;
  // document.getElementById("refresh-type-classes-button").disabled = false;
  // Init hyper routes
  await initHyperroutes();
  document.getElementById("refresh-hyperroute-and-sections-button").disabled = false;
  // Dashboard
  initDashboard();
  document.getElementById("refresh-dashboard-button").disabled = false;
  // Widgets
  initWidgets();
  // Datatables
  loadObjectDatatable();
  document.getElementById("refresh-astro-object-datatable-button").disabled = false;
  loadHyperrouteDatatable();
  document.getElementById("refresh-hyperroute-datatable-button").disabled = false;
  // Wizard
  initWizard();
}

/* MAIN */

// Activate object tab
openSection(undefined, 'astro-object-tab');
document.querySelector("#default-tab").className += " active";

// Disable refresh buttons
document.getElementById("refresh-astro-objects-button").disabled = true;
// document.getElementById("refresh-types-button").disabled = true;
// document.getElementById("refresh-type-classes-button").disabled = true;
document.getElementById("refresh-astro-object-datatable-button").disabled = true;
document.getElementById("refresh-hyperroute-and-sections-button").disabled = true;
document.getElementById("refresh-hyperroute-datatable-button").disabled = true;
document.getElementById("refresh-dashboard-button").disabled = true;



/* EVENTS */
// Called directly in webpage : handleAuthClick(), handleSignoutClick(), gapiLoaded(), gisLoaded()

// Authenticate
SEARCH_INPUT.addEventListener('select2:select', loadObjectForm);

/**
 * Object Sources button click
 */
document.querySelectorAll('.object-source-entry-button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault(); // Skip form default action
    document.getElementById("source-modal-sheet-id").value = SHEETS.OBJECT_SOURCES.ID;
    openDataFieldObjectSourceModal(e.target);
  });
});

/**
 * Hyperroute Sources button click
 */
document.querySelectorAll('.hyperroute-source-entry-button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault(); // Skip form default action
    document.getElementById("source-modal-sheet-id").value = SHEETS.HYPERROUTE_SOURCES.ID;
    openDataFieldHyperrouteSourceModal(e.target);
  });
});





