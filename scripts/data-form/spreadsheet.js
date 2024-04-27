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
  const rowIndex = values.findIndex((row) => row[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] === dataRowToUpdate[0]);

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
        range: sheetName + `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}${rowIndex + 1}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF()}${rowIndex + 1}`,
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

async function deleteSpreadSheetRowData (spreadsheetId, sheetName, sheetRange, objectIDToDelete) {
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
  const rowIndex = values.findIndex((row) => row[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] === objectIDToDelete);

  if (rowIndex === -1) {
    console.log('Value not found.');
    alert('Value not found in spreadsheet.');
  } else {
    console.log(`Row number where the value is found: ${rowIndex + 1}`);
    console.log(values[rowIndex]);

    // Delete row
    try {
    // Delete the row using the sheet ID
      response = await gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId,
        resource: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId: SHEETS.OBJECTS.ID,
                  dimension: 'ROWS',
                  startIndex: rowIndex,
                  endIndex: rowIndex + 1,
                },
              },
            },
          ],
        },
      });
      console.log(response.data);

    } catch (err) {
      document.getElementById('content').innerText = err.message;
      alert(err.message);
      return false;
    }
    console.log("Astronomical object deleted :", response.result);
    return true;
  }
}