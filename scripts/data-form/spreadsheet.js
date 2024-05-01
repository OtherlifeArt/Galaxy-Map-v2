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
  console.log("Results :", response.result);
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById('content').innerText = 'No values found.';
    return;
  }
  return range;
}

/**
 * Get spreadsheet row from column value (key/value pairs)
 */
async function getSpreadSheetRowFromColumnKeyValuePairs(spreadsheetId, sheetName, sheetRange, keyValueObjectArray) {
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
  console.log("Results :", response.result);
  const range = response.result;
  const values = range.values;
  if (!range || !values || values.length == 0) {
    // document.getElementById('content').innerText = 'No values found.';
    console.error('No values found.');
    alert(err.message);
    return;
  }

  // Find row number and return it
  //const rowIndex = values.findIndex((row) => row[columnToSearch] === searchValue);
  const filteredValues = findArrayOfObjectByKeyValuePairs(values, keyValueObjectArray);

  if (filteredValues.length === 0) {
    console.log(keyValueObjectArray, 'Values not found in spreadsheet.');
  } else {
    console.log(`Number of results found: ${filteredValues.length}`);
    console.log('Results : ', filteredValues);
    // return filteredValues;
  }
  return filteredValues;
}

/**
 * Search for spreadsheet element by ID
 */
async function searchForSpreadSheetValueByElementID(spreadsheetId, sheetIdNameEntry, sheetRange, objectIdColumnNumber, objectID) {
 return await getSpreadSheetRowFromColumnKeyValuePairs(spreadsheetId, sheetIdNameEntry.NAME, sheetRange, [{key: objectIdColumnNumber, value: objectID}]);
}

/**
 * Update spreadsheet data
 */
async function updateSpreadSheetRowData(spreadsheetId, sheetIdNameEntry, sheetRange, objectIdColumnNumber, dataRowToUpdate) {
  let response;
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: sheetIdNameEntry.NAME + sheetRange,
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    alert(err.message);
    return;
  }
  console.log("Results :", response.result);
  const range = response.result;
  const values = range.values;
  if (!range || !values || values.length == 0) {
    console.err('No data/spreadsheet found.');
    return false;
  }

  // Find row number matching technical ID and return it
  const rowIndex = values.findIndex((row) => row[objectIdColumnNumber] === dataRowToUpdate[objectIdColumnNumber]);

  if (rowIndex === -1) {
    console.log('Value not found.');
    console.error('Value not found in spreadsheet.');
    return false;
  } else {
    console.log(`Row number where the value is found: ${rowIndex + 1}`);
    console.log(values[rowIndex]);

    // Update row
    try {
      response = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: sheetIdNameEntry.NAME + `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}${rowIndex + 1}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF()}${rowIndex + 1}`,
        valueInputOption: "RAW",
        majorDimension: "ROWS",
        values: [dataRowToUpdate]
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      // alert(err.message);
      return false;
    }
    console.log("Object updated :", response.result);
    return true;
  }
}

/**
 * Add new spreadsheet line with data from form
 */
async function addSpreadSheetRowData(spreadsheetId, sheetIdNameEntry, sheetRange, dataRowToAppend) {
  // Add row
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: sheetIdNameEntry.NAME + sheetRange,
      valueInputOption: "RAW",
      majorDimension: "ROWS",
      values: [dataRowToAppend]
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    alert(err.message);
    return false;
  }
  console.log("DATA added :", response.result);
  return true;
}

async function deleteSpreadSheetRowData (spreadsheetId, sheetIdNameEntry, sheetRange, objectIdColumnNumber, objectIDToDelete) {
  console.log("Sheet Name : " + sheetIdNameEntry.NAME, "Sheet ID : " + sheetIdNameEntry.ID);
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: sheetIdNameEntry.NAME + sheetRange,
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    alert(err.message);
    return;
  }
  console.log("Result :", response.result);
  const range = response.result;
  const values = range.values;
  if (!range || !values || values.length == 0) {
    document.getElementById('content').innerText = 'No values found.';
    return false;
  }

  // Find row number matching technical ID and return it
  const rowIndex = values.findIndex((row) => row[objectIdColumnNumber] === objectIDToDelete);

  if (rowIndex === -1) {
    console.log('Value not found.');
    console.error('Value not found in spreadsheet.');
    return false;
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
                  sheetId: sheetIdNameEntry.ID,
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
    console.log("DATA deleted :", response.result);
    return true;
  }
}