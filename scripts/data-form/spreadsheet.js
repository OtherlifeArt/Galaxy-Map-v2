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
    console.log(`No value found for ${sheetName} search !, ${keyValueObjectArray}`);
    return [];
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
// async function updateSpreadSheetRowData(spreadsheetId, sheetIdNameEntry, sheetRange, objectIdColumnNumber, dataRowToUpdate) {
//   let response;
//   try {
//     // Fetch first 10 files
//     response = await gapi.client.sheets.spreadsheets.values.get({
//       spreadsheetId: spreadsheetId,
//       range: sheetIdNameEntry.NAME + sheetRange,
//     });
//   } catch (err) {
//     document.getElementById('content').innerText = err.message;
//     alert(err.message);
//     return;
//   }
//   console.log("Results :", response.result);
//   const range = response.result;
//   const values = range.values;
//   if (!range || !values || values.length == 0) {
//     console.err('No data/spreadsheet found.');
//     return false;
//   }

//   // Find row number matching technical ID and return it
//   const rowIndex = values.findIndex((row) => row[objectIdColumnNumber] === dataRowToUpdate[objectIdColumnNumber]);

//   if (rowIndex === -1) {
//     console.log('Value not found.');
//     console.error('Value not found in spreadsheet.');
//     return false;
//   } else {
//     console.log(`Row number where the value is found: ${rowIndex + 1}`);
//     console.log(values[rowIndex]);

//     const sheetRangeArray = sheetRange.split(":");
//     let newSheetRange = `${sheetRangeArray[0]}${rowIndex + 1}:${sheetRangeArray[1]}${rowIndex + 1}`;

//     // Update row
//     try {
//       response = await gapi.client.sheets.spreadsheets.values.update({
//         spreadsheetId: spreadsheetId,
//         range: sheetIdNameEntry.NAME + newSheetRange,
//         valueInputOption: "RAW",
//         majorDimension: "ROWS",
//         values: [dataRowToUpdate]
//       });
//     } catch (err) {
//       document.getElementById('content').innerText = err.message;
//       // alert(err.message);
//       return false;
//     }
//     console.log("Object updated :", response.result);
//     return true;
//   }
// }

/**
 * Update spreadsheet single row data (and keep compatibility with old/commented, to remove function)
 */
function updateSpreadSheetRowData(spreadsheetId, sheetIdNameEntry, sheetRange, objectIdColumnNumber, dataRowToUpdate) {
  return updateSpreadSheetBatchRowData(spreadsheetId, sheetIdNameEntry, sheetRange, objectIdColumnNumber, [dataRowToUpdate]);
}

/**
 * Update spreadsheet multiple row data
 * 
 * @param {String} spreadsheetId ex: SPREADSHEET_ID
 * @param {{ID: string, NAME: string}} sheetIdNameEntry ex: SHEETS.HYPERROUTES
 * @param {*} @param {String} sheetRange ex: `!${SPREADSHEET_HEADERS.HYPERROUTES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTES.LAST_COLUMN_REF()}`
 * @param {*} objectIdColumnNumber 
 * @param {*} batchDataRowToUpdate 
 * @returns {boolean}
 */
async function updateSpreadSheetBatchRowData(spreadsheetId, sheetIdNameEntry, sheetRange, objectIdColumnNumber, batchDataRowToUpdate) {
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

  // Find all rows matching technical Ids
  const rowToUpdateIndexes = batchDataRowToUpdate.map(dataRowToUpdate => {
    // Find index in spreadsheetrow where the ID cell matches the ID of data to update
    return values.findIndex(row => row[objectIdColumnNumber] === dataRowToUpdate[objectIdColumnNumber]) + 1;
  // and sort the array with ascending values
  }).sort((a, b) => a - b);
  
  if(rowToUpdateIndexes.length < 1) {
    console.log('Values not found.');
    // console.error('Values not found in spreadsheet.');
    return false;
  } else {
    console.log('Spreadsheet row numbers where the values are found: ', rowToUpdateIndexes);
    //console.log('Row where the values are found: ', values.filter(row => batchDataRowToUpdate.map(dataRowToUpdate => dataRowToUpdate[objectIdColumnNumber]).has(row[objectIdColumnNumber])));  // Too slow, only for debugging purpose
  }

  const sheetRangeArray = sheetRange.split(":");
  let batchData = [];

  // Build data to batch update
  for (let index = 0; index < rowToUpdateIndexes.length; index++) {
    const spreadsheetRowIndex = rowToUpdateIndexes[index];
    const dataRowToUpdate = batchDataRowToUpdate[index];
    const newSheetRange = `${sheetRangeArray[0]}${spreadsheetRowIndex}:${sheetRangeArray[1]}${spreadsheetRowIndex}`;
    // Append to data array
    batchData.push({
      range: sheetIdNameEntry.NAME + newSheetRange,
      majorDimension: 'ROWS',
      values: [dataRowToUpdate]
    });
  }

  // Batch update row
  try {
    response = await gapi.client.sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: {
        valueInputOption: "RAW",
        data: batchData
      }
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    console.log(err);
    console.error(err.message);
    // alert(err.message);
    return false;
  }
  console.log("Object updated :", response.result);
  return true;
}

/**
 * Add new spreadsheet line with data from form
 */
async function addSpreadSheetRowData(spreadsheetId, sheetIdNameEntry, sheetRange, dataRowToAppend) {
  return await addSpreadSheetBatchRowData(spreadsheetId, sheetIdNameEntry, sheetRange, [dataRowToAppend]);
}

/**
 * Add new several lines to spreadsheet with data from form
 * 
 * @param {String} spreadsheetId ex: SPREADSHEET_ID
 * @param {{ID: string, NAME: string}} sheetIdNameEntry ex: SHEETS.HYPERROUTES
 * @param {String} sheetRange ex: `!${SPREADSHEET_HEADERS.HYPERROUTES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTES.LAST_COLUMN_REF()}`
 * @param {String[][]} batchRowDataToAppend ex: `[ [line1Cell1], [line1Cell2], ..., [line1CellN] ], [ [line2Cell1], [line2Cell2], ..., [line2CellN] ], ...,[ [lineNCell1], [lineNCell2], ..., [lineNCellN] ]`
 * @returns {boolean}
 */
async function addSpreadSheetBatchRowData(spreadsheetId, sheetIdNameEntry, sheetRange, batchRowDataToAppend) {
  // Add rows
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: sheetIdNameEntry.NAME + sheetRange,
      valueInputOption: "RAW",
      majorDimension: "ROWS",
      values: batchRowDataToAppend
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