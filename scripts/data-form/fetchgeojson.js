// Client ID and API key from the Developer Console
const CLIENT_ID = CLIENT_ID_INPUT;
const API_KEY = API_KEY_INPUT;

// ID of the Google Sheet
const SHEET_ID = SPREADSHEET_ID;

// Google Sheets API endpoint
const SHEETS_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet`;

// Array of column names
const COLUMN_NAMES = [
  'ID',
  'NAME',
  'PARENT_ID',
  'PARENT',
  'TYPE',
  'TYPE_CLASSES',
  'CANON',
  'IN MOVIES ?',
  'LEGENDS',
  'UNLICENSED',
  'X_GRID',
  'Y_GRID',
  'X_COORD',
  'Y_COORD'
];

// Function to fetch data from Google Sheets and create GeoJSON
function fetchDataAndCreateGeoJSON() {
  // Fetch data from Google Sheets
  fetch(`${SHEETS_ENDPOINT}?ranges=A:Z&majorDimension=ROWS&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      // Extract column headers
      const headers = data.valueRanges[0].values[0];
      // Extract rows of data
      const rows = data.valueRanges[0].values.slice(1);
      
      // Create GeoJSON features
      const features = rows.map(row => {
        const properties = {};
        COLUMN_NAMES.forEach((columnName, index) => {
          properties[columnName] = row[index] || ''; // Handle empty values
        });
        // Create GeoJSON Point geometry
        const coordinates = [parseFloat(row[headers.indexOf('X_COORD')]), parseFloat(row[headers.indexOf('Y_COORD')])];
        const geometry = {
          type: 'Point',
          coordinates: coordinates
        };
        // Create GeoJSON feature
        return {
          type: 'Feature',
          properties: properties,
          geometry: geometry
        };
      });
      
      // Create GeoJSON object
      const geojson = {
        type: 'FeatureCollection',
        features: features
      };
      
      // Use the GeoJSON as needed (e.g., update UI, save to file, etc.)
      console.log(geojson);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch data and create GeoJSON
const thegeojsonpoints = fetchDataAndCreateGeoJSON();
