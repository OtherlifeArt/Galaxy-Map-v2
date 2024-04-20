
// Function to fetch data from Google spreadsheet and return a GeoJSON object containg poctual localized objects
function fetchSheetData(spreadsheetId, sheetName) {

    return new Promise((resolve, reject) => {
      const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF}`;
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: sheetName + sheetRange
      }).then(function(response) {
        console.log(response)
          var values = response.result.values;
          if (values.length > 0) {
              var headerRow = values[0];
              var xCoordIndex = headerRow.indexOf('X_COORD');
              var yCoordIndex = headerRow.indexOf('Y_COORD');
              var features = [];
              for (var i = 1; i < values.length; i++) { // Start from 1 to skip header row
                  var row = values[i];
                  var xCoord = parseFloat(row[xCoordIndex]);
                  var yCoord = parseFloat(row[yCoordIndex]);
                  if (isNaN(xCoord) === false && isNaN(yCoord) === false) { // Check if X_COORD and Y_COORD are not empty 
                    var feature = {
                          "type": "Feature",
                          "geometry": {
                              "type": "Point",
                              "coordinates": [xCoord, yCoord]
                          },
                          "properties": {}
                      };
                      // Add other properties
                      for (var j = 0; j < headerRow.length; j++) {
                          feature.properties[headerRow[j]] = row[j];
                      }
                      features.push(feature);
                  }
              }
              var geojson = {
                  "type": "FeatureCollection",
                  "features": features
              };
              resolve(geojson);
          } else {
              console.log('No data found.');
              reject('No data found');
          }
      }).catch(function(error) {
          console.error('Error fetching data from spreadsheet:', error);
          reject(error);
      });
    });
  }
  
  // Function to trigger download of GeoJSON file
  async function downloadGeoJSON() {
    var spreadsheetId = SPREADSHEET_ID
    var sheetName = SHEET_NAMES.OBJECTS
    await fetchSheetData(spreadsheetId, sheetName).then(function(geojson) {
      // Convert GeoJSON to string
      var geojsonStr = JSON.stringify(geojson);
  
      // Create Blob
      var blob = new Blob([geojsonStr], { type: 'application/json' });
  
      // Create download link
      var a = document.createElement('a');
      var url = URL.createObjectURL(blob);
      a.href = url;
      a.download = 'SW_Map_Points.geojson';
      document.body.appendChild(a);
  
      // Trigger download
      a.click();
  
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }).catch(function(error) {
      console.error('Error generating GeoJSON:', error);
    });
  }
  
  // Add event listener to download button
  document.getElementById('downloadPointsButton').addEventListener('click', downloadGeoJSON);