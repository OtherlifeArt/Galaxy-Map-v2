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
    ID: "209526164", NAME: "Object type classes",
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
      IN_MOVIES: 11,
      TYPE: 12,
      TYPE_CLASSES: 13,
      IS_CAPITAL: 14,
      X_GRID: 15,
      Y_GRID: 16,
      X_COORD: 17,
      Y_COORD: 18,
      Z_COORD: 19,
      ORBITAL_RANK: 20,
      DESC: 21,
      CONJECTURAL_NAME: 22,
      CONJECTURAL_TYPE: 23,
      PLACEMENT_CERTITUDE: 24,
      PLACEMENT_LOGIC: 25,
      NATIVE_SPECIES: 26,
      KNOWN_ENVIRONMENTS: 27,
      NOTES: 28,
      INTERESTING: 29,
      URL: 30,
      ZOOM_LEVEL: 31,
      tooltip_permanent: 32,
      tooltip_direction: 33,
      className: 34,
      index_geo: 35,
      updated_at: 36,
      is_certified: 37,
      WIKI_DATA_ID: 38,
      GEOM: 39,
    },
    FIRST_COLUMN_REF: 'A',
    LAST_COLUMN_REF: () => {
      // Search of column index (2 letters limit - 676 columns should be enough) 
      const COLUMN_NUMBER = SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_INDEX_NUMBER();
      const FIRST_CHAR = String.fromCharCode(64 + parseInt(COLUMN_NUMBER / 26));
      const LAST_CHAR = String.fromCharCode(65 + COLUMN_NUMBER % 26);
      return FIRST_CHAR + LAST_CHAR;
    },
    LAST_COLUMN_INDEX_NUMBER: () => { return Object.keys(SPREADSHEET_HEADERS.OBJECTS.COLUMNS).length -1},
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

// Trick to export some values from other scopes
window.dataToUpdate = [];
window.fromJQuery = {
};

/* MAIN */

// Activate object tab
openSection(undefined, 'astro-object-tab');
document.querySelector("#default-tab").className += " active";


/* EVENTS */
// Called directly in webpage : handleAuthClick(), handleSignoutClick(), gapiLoaded(), gisLoaded()

// Authenticate
SEARCH_INPUT.addEventListener('select2:select', loadObjectForm);




