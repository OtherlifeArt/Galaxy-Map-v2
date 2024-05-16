/**********/
/* MODALS */
/**********/

// When the user clicks on the button, open the modal
function displayModal() {
  // Get the modal
  let modal = document.getElementById("validation-modal");
  modal.style.display = "block";
}

function closeModal() {
  let modal = document.getElementById("validation-modal");
  modal.style.display = "none";
}

// Get the <span> element that closes the modal
var modalSpan = document.getElementsByClassName("close-validation-modal");
// When the user clicks on <span> (x), close the modal
modalSpan.onclick = function() {
  closeModal();
}

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

/* Source modal */
// When the user clicks on the button, open the modal
function displaySourceModal() {
  // Get the modal
  let modal = document.getElementById("source-modal");
  modal.style.display = "block";
}

/**
 * Close source modal
 */
function closeSourceModal() {
  let modal = document.getElementById("source-modal");
  modal.style.display = "none";
}

// Get the <span> element that closes the modal
var sourceModalSpan = document.getElementById("close-source-modal");
// When the user clicks on <span> (x), close the modal
/**
 * Trigger close source modal and highlight source buttons if source exists
 */
sourceModalSpan.onclick = function() {
  closeSourceModal();
  highlightSourceButtonsIfSourced(document.getElementById("object-tech-id").value); // Object
  highlightHyperrouteSourceButtonsIfSourced(document.getElementById("hyperroute-tech-id").value); // Hyperroute
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  // console.log(event.target);
  if (event.target == document.getElementById("source-modal")) {
    document.getElementById("source-modal").style.display = "none";
  }
}

/**
 * Open modal for object sourcing fields
 */
async function openDataFieldObjectSourceModal(eventTarget) {
  // Check if object exists (has ID) before going further
  const objectId = sanitizeText(document.getElementById('object-tech-id').value);
  if(!objectId) {
    alert("You must create object before adding sources. Tip : enter object name, save object, then resume editing object/sources.");
    return;
  }
  // console.log(eventTarget.parentElement.firstChild.nextSibling.getAttribute("for"));
  // const formEntryID = eventTarget.parentElement.firstChild.nextSibling.attributes !== undefined ? 
  //   eventTarget.parentElement.firstChild.nextSibling.getAttribute("for") : eventTarget.parentElement.firstChild.nextSibling.nextSibling.nextSibling.getAttribute("for");
  const formEntryId = eventTarget.parentElement.querySelector("label").getAttribute("for");
  // Get spreadhseet column matching source entry
  let columnEntryName = getCustomColumnEntryName(formEntryId);
  if (columnEntryName === undefined) {
    return;
  }
  // Display entry source in modal if it exists
  const sheetRange = `!${SPREADSHEET_HEADERS.OBJECT_SOURCES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECT_SOURCES.LAST_COLUMN_REF()}`;
  const sourceRows = await getSpreadSheetRowFromColumnKeyValuePairs(
    SPREADSHEET_ID, SHEETS.OBJECT_SOURCES.NAME, sheetRange, 
    [{key: SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.TARGET_COLUMN, value: columnEntryName}, 
    {key: SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.OBJECT_ID, value: objectId}]
  );
  // Fill in fields
  // Hidden fields
  document.getElementById('source-modal-column-source-name').value = columnEntryName;
  document.getElementById('source-modal-element-id').value = objectId;
  // Table fields
  // document.getElementById('object-column-source-id').value = doesSourceExists ? : ; // TODO with select 2
  const sourceTableBody = document.getElementById('source-modal-table-body');
  sourceTableBody.innerHTML = ""; // Clean table content

  if(sourceRows != undefined && sourceRows.length > 0) {
    // Building table content
    for (let sourceRowIndex = 0; sourceRowIndex < sourceRows.length; sourceRowIndex++) {
      const sourceRow = sourceRows[sourceRowIndex];
      console.log(sourceRow);
      // ROW
      let row = document.createElement("tr");
      // BUTTONS
      addActionCellToSourceModalTable(row, "OBJECT_SOURCES", "modal-object-source-id");
      // Source Row ID
      addHiddenTextCellToSourceModalTable(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID], "modal-object-source-id");
      // Source from list
      addSelect2SourceCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.SOURCE_ID], "modal-source-id");
      // Source PATH
      addInputTextCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.SOURCE_PATH], "modal-source-path");
      // Source URL
      addInputTextCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.URL], "modal-source-url");
      // Source Canon
      addInputCheckboxCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.CANON], "modal-source-canon");
      // Source LEGENDS
      addInputCheckboxCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.LEGENDS], "modal-source-legends");
      // Source Notes
      addTextAreaCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.NOTE], "modal-source-note");
      // Append row
      sourceTableBody.appendChild(row);
    }
  }
  displaySourceModal();
}

/**
 * Open modal for hyperroute sourcing fields
 */
async function openDataFieldHyperrouteSourceModal(eventTarget) {
  // Check if hyperroute exists (has ID) before going further
  const hyperrouteId = sanitizeText(document.getElementById('hyperroute-tech-id').value);
  if(!hyperrouteId) {
    alert("You must select or create hyperroute before adding sources. Tip : enter hyperroute name, save hyperroute, then resume editing hyperroute/sources.");
    return;
  }
  // console.log(eventTarget.parentElement.firstChild.nextSibling.getAttribute("for"));
  // const formEntryID = eventTarget.parentElement.firstChild.nextSibling.attributes !== undefined ? 
  //   eventTarget.parentElement.firstChild.nextSibling.getAttribute("for") : eventTarget.parentElement.firstChild.nextSibling.nextSibling.nextSibling.getAttribute("for");
  const formEntryId = eventTarget.parentElement.querySelector("label").getAttribute("for");
  // Get spreadhseet column matching source entry
  let columnEntryName = getCustomColumnEntryName(formEntryId);
  if (columnEntryName === undefined) {
    return;
  }
  // Display entry source in modal if it exists
  const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.LAST_COLUMN_REF()}`;
  const sourceRows = await getSpreadSheetRowFromColumnKeyValuePairs(
    SPREADSHEET_ID, SHEETS.HYPERROUTE_SOURCES.NAME, sheetRange, 
    [{key: SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.TARGET_COLUMN, value: columnEntryName}, 
    {key: SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.HYPERROUTE_ID, value: hyperrouteId}]
  );
  // Fill in fields
  // Hidden fields
  document.getElementById('source-modal-column-source-name').value = columnEntryName;
  document.getElementById('source-modal-element-id').value = hyperrouteId;
  // Table fields
  // document.getElementById('object-column-source-id').value = doesSourceExists ? : ; // TODO with select 2
  const sourceTableBody = document.getElementById('source-modal-table-body');
  sourceTableBody.innerHTML = ""; // Clean table content

  if(sourceRows != undefined && sourceRows.length > 0) {
    // Building table content
    for (let sourceRowIndex = 0; sourceRowIndex < sourceRows.length; sourceRowIndex++) {
      const sourceRow = sourceRows[sourceRowIndex];
      console.log(sourceRow);
      // ROW
      let row = document.createElement("tr");
      // BUTTONS
      addActionCellToSourceModalTable(row, "HYPERROUTE_SOURCES", "modal-hyperroute-source-id");
      // Source Row ID
      addHiddenTextCellToSourceModalTable(row, sourceRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.ID], "modal-hyperroute-source-id");
      // Source from list
      addSelect2SourceCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.SOURCE_ID], "modal-source-id");
      // Source PATH
      addInputTextCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.SOURCE_PATH], "modal-source-path");
      // Source URL
      addInputTextCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.URL], "modal-source-url");
      // Source Canon
      addInputCheckboxCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.CANON], "modal-source-canon");
      // Source LEGENDS
      addInputCheckboxCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.LEGENDS], "modal-source-legends");
      // Source Notes
      addTextAreaCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.NOTE], "modal-source-note");
      // Append row
      sourceTableBody.appendChild(row);
    }
  }
  displaySourceModal();
}

/**
 * Save hyperroute source modal content to spreadsheet
 */
function saveDataFromHyperrouteSourceModal() {
  console.log("Hyperroute source save");
  // Count
  // let addedSourceNumber = 0, updatedSourceNumber = 0;
  // Data
  const sourceModalTableBody = document.getElementById("source-modal-table-body");
  const columnEntryName = document.getElementById('source-modal-column-source-name').value;
  const hyperrouteId = sanitizeText(document.getElementById('source-modal-element-id').value);
  const hyperrouteName = sanitizeText(document.getElementById('hyperroute-name').value);
  const hyperrouteSourceLineCount = sourceModalTableBody.childNodes.length;
  let messageCount = {"addedSources": 0, "updatedSources":0};
  sourceModalTableBody.childNodes.forEach(async hyperrouteSourceLine => {
    // For each line check if it exists and update it
    const hyperrouteSourceId = hyperrouteSourceLine.querySelector(".modal-hyperroute-source-id").innerHTML;
    const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.LAST_COLUMN_REF()}`;
    const result = await searchForSpreadSheetValueByElementID(SPREADSHEET_ID, SHEETS.HYPERROUTE_SOURCES, sheetRange, SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.ID, hyperrouteSourceId);
    
    const sourceId = sanitizeText(hyperrouteSourceLine.querySelector(".modal-source-id").value);
    // Build data array
    let dataRow = [];
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.ID] = hyperrouteSourceId;
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.HYPERROUTE_ID] = hyperrouteId;
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.HYPERROUTE_NAME] = hyperrouteName;
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.SOURCE_ID] = sourceId;
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.SOURCE_NAME] = findObjectById(sourceSearchArray, sourceId).name;
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.SOURCE_PATH] = sanitizeText(hyperrouteSourceLine.querySelector(".modal-source-path").value);
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.TARGET_COLUMN] = columnEntryName;
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.URL] = sanitizeText(hyperrouteSourceLine.querySelector(".modal-source-url").value);
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.CANON] = hyperrouteSourceLine.querySelector(".modal-source-canon").checked ? "YES" : "";
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.LEGENDS] = hyperrouteSourceLine.querySelector(".modal-source-legends").checked ? "YES" : "";
    dataRow[SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.NOTE] = sanitizeText(hyperrouteSourceLine.querySelector(".modal-source-note").value);
    // Check results
    if(result.length === 1) {
      console.log("Hyperroute Source found ... Updating");
      // Update in spreadsheet
      let returnCode = await updateSpreadSheetRowData(SPREADSHEET_ID, SHEETS.HYPERROUTE_SOURCES, sheetRange, SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.ID, dataRow);
      if(!returnCode) {
        alert("Error encoutered ! Check console (F12) for more details");
      } else {
        messageCount.updatedSources = messageCount.updatedSources + 1;
        if(messageCount.updatedSources + messageCount.addedSources === hyperrouteSourceLineCount) {
          alert(`HyperrouteSources :\nAdded entries : ${messageCount.addedSources}\nUpdated entries : ${messageCount.updatedSources}`);
        }
        console.log(`Hyperroute source for has been successfully updated !`);
      }
    } else if(result.length === 0) { // Or create it as new line
      console.log("Hyperroute Source not found ... Adding");
      // Add at the end of spreadsheet in a new line
      console.log(`sheetRange : ${sheetRange}`);
      let returnCode = await addSpreadSheetRowData(SPREADSHEET_ID, SHEETS.HYPERROUTE_SOURCES, sheetRange, dataRow);
      if(!returnCode) {
        alert("Error encoutered ! Check console (F12) for more details");
      } else {
        messageCount.addedSources = messageCount.addedSources + 1;
        console.log("Hyperroute source has been successfully created at the end of the spreadsheet !");
        if(messageCount.updatedSources + messageCount.addedSources === hyperrouteSourceLineCount) {
          alert(`HyperrouteSources :\nAdded entries : ${messageCount.addedSources}\nUpdated entries : ${messageCount.updatedSources}`);
        }
      }     
    } else {
      console.log("Number of found hyperroutes is different than expected. Expected 0 or 1. results =>", result);
      alert("Error encoutered ! Check console (F12) for more details");
    }
  });
  // alert(`Added entries : ${addedSourceNumber}\nUpdated entries : ${updatedSourceNumber}`);
}

/* Source modal table content */

/**
 * Add new button to source modal content
 */
function addActionCellToSourceModalTable(parentRow, sheetNameLabel, elementIdClassName) {
  let sourceAction = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Row";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.borderColor = "red";
  deleteButton.addEventListener("click", function(e) {
    // console.log(e.target);
    deleteDataLineFromSourceModal(e.target.parentNode.parentNode, sheetNameLabel, elementIdClassName);
  });
  sourceAction.appendChild(deleteButton);
  parentRow.appendChild(sourceAction);
}

/**
 * Add hidden text cell to source modal content
 */
function addHiddenTextCellToSourceModalTable(parentRow, textContent, className) {
  let hiddenTextTd = document.createElement("td");
  hiddenTextTd.appendChild(document.createTextNode(sanitizeText(textContent)));
  hiddenTextTd.style.display = "none";
  hiddenTextTd.classList.add(className);
  parentRow.appendChild(hiddenTextTd);
}

/**
 * Add select2 cell to source modal content
 */
function addSelect2SourceCellToSourceModalContent(parentRow, selectedDataID, className) {
  let sourceCellTd = document.createElement("td");
  let sourceCellSelect = document.createElement("select");
  sourceCellSelect.classList.add("modal-source-field");
  sourceCellSelect.classList.add(className);
  loadSourcesSelect2(sourceCellSelect, selectedDataID);
  sourceCellTd.appendChild(sourceCellSelect);
  parentRow.appendChild(sourceCellTd);
}

/**
 * Add input type text cell to source modal content
 */
function addInputTextCellToSourceModalContent(parentRow, textContent, className) {
  let inputTextTd = document.createElement("td");
  let inputText = document.createElement("input");
  inputText.setAttribute('type', 'text');
  inputText.value = sanitizeText(textContent);
  inputText.classList.add(className);
  inputTextTd.appendChild(inputText);
  parentRow.appendChild(inputTextTd);
}

/**
 * Add text area cell to source modal content
 */
function addTextAreaCellToSourceModalContent(parentRow, textContent, className) {
  let textAreaTd = document.createElement("td");
  let textArea = document.createElement("textarea");
  textArea.value = sanitizeText(textContent);
  textArea.classList.add(className);
  textAreaTd.appendChild(textArea);
  parentRow.appendChild(textAreaTd);
}

/**
 * Add input checkbox cell to source modal content
 */
function addInputCheckboxCellToSourceModalContent(parentRow, textContent, className) {
  let textAreaTd = document.createElement("td");
  let checkbox = document.createElement("input");
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = sanitizeText(textContent) === "YES" || sanitizeText(textContent).toUpperCase() === "TRUE";
  checkbox.classList.add(className);
  textAreaTd.appendChild(checkbox);
  parentRow.appendChild(textAreaTd);
}

/**
 * Add new empty line on source modal table
 */
function addNewEmptyLineOnSourceModalTable() {
  const sourceModalTableBody = document.getElementById("source-modal-table-body");
  let sheetNameLabel;
  let elementIdClassName;
  let sourceSheetId = document.getElementById("source-modal-sheet-id").value;
  switch (sourceSheetId) {
    // Object
    case SHEETS.OBJECT_SOURCES.ID:
      sheetNameLabel = "OBJECT_SOURCES";
      elementIdClassName = "modal-object-source-id";
      break;
    // Hyperroute
    case SHEETS.HYPERROUTE_SOURCES.ID:
      sheetNameLabel = "HYPERROUTE_SOURCES";
      elementIdClassName = "modal-hyperroute-source-id";
      break;
    // DEBUG
    default:
      alert(`Unknown sheet ID ${sourceSheetId} !`);
      break;
  }
  let row = document.createElement("tr"); // ROW
  addActionCellToSourceModalTable(row, sheetNameLabel, elementIdClassName); // BUTTONS
  addHiddenTextCellToSourceModalTable(row, generateUUIDv7(), elementIdClassName); // Source Row ID
  addSelect2SourceCellToSourceModalContent(row, null, "modal-source-id"); // Source from list
  addInputTextCellToSourceModalContent(row, "", "modal-source-path");// Source path
  addInputTextCellToSourceModalContent(row, "", "modal-source-url"); // Source URL
  addInputCheckboxCellToSourceModalContent(row, "", "modal-source-canon"); // Source CANON
  addInputCheckboxCellToSourceModalContent(row, "", "modal-source-legends"); // Source LEGENDS
  addTextAreaCellToSourceModalContent(row, "", "modal-source-note");// Source Notes
  sourceModalTableBody.appendChild(row);
}

/**
 * Delete Source Modal Data (line)
 */
async function deleteDataLineFromSourceModal(tableRowElement, sheetNameLabel, elementIdClassName) {
  // console.log(tableRowElement);
  // Delete Spreadsheet data if exists
  // const objectSourceID = tableRowElement.querySelector(".modal-object-source-id").innerHTML;
  const elementSourceID = tableRowElement.querySelector("."+elementIdClassName).innerHTML;
  // console.log(objectSourceID);
  if(confirm("Are you sure you want to delete object source line with ID "+ elementSourceID +" ?")) {
    const sheetRange = `!${SPREADSHEET_HEADERS[sheetNameLabel].FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS[sheetNameLabel].LAST_COLUMN_REF()}`;
    let returnCode = await deleteSpreadSheetRowData(SPREADSHEET_ID, SHEETS[sheetNameLabel], sheetRange, SPREADSHEET_HEADERS[sheetNameLabel].COLUMNS.ID, elementSourceID);
    if(returnCode) {
      console.log("Source element has been successfully deleted !");
      alert('Source element has been successfully deleted !');
    } else {
      alert("Deleted source element seems to no have any entry in database. Else it could be an error ! Check console (F12) for more details if you have doubts !");
    }
    // Delete modal table line
    tableRowElement.remove();
  }
}

/**
 * Save object source modal content to spreadsheet
 */
function saveDataFromObjectSourceModal() {
  console.log("Object source save");
  // Count
  // let addedSourceNumber = 0, updatedSourceNumber = 0;
  // Data
  const sourceModalTableBody = document.getElementById("source-modal-table-body");
  const columnEntryName = document.getElementById('source-modal-column-source-name').value;
  const objectId = sanitizeText(document.getElementById('source-modal-element-id').value);
  const objectName = sanitizeText(document.getElementById('object-name').value);
  const objectSourceLineCount = sourceModalTableBody.childNodes.length;
  let messageCount = {"addedSources": 0, "updatedSources":0};
  sourceModalTableBody.childNodes.forEach(async objectSourceLine => {
    // For each line check if it exists and update it
    const objectSourceId = objectSourceLine.querySelector(".modal-object-source-id").innerHTML;
    const sheetRange = `!${SPREADSHEET_HEADERS.OBJECT_SOURCES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECT_SOURCES.LAST_COLUMN_REF()}`;
    const result = await searchForSpreadSheetValueByElementID(SPREADSHEET_ID, SHEETS.OBJECT_SOURCES, sheetRange, SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID, objectSourceId);
    
    const sourceId = sanitizeText(objectSourceLine.querySelector(".modal-source-id").value);
    // Build data array
    let dataRow = [];
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID] = objectSourceId;
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.OBJECT_ID] = objectId;
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.OBJECT_NAME] = objectName;
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.SOURCE_ID] = sourceId;
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.SOURCE_NAME] = findObjectById(sourceSearchArray, sourceId).name;
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.SOURCE_PATH] = sanitizeText(objectSourceLine.querySelector(".modal-source-path").value);
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.TARGET_COLUMN] = columnEntryName;
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.URL] = sanitizeText(objectSourceLine.querySelector(".modal-source-url").value);
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.CANON] = objectSourceLine.querySelector(".modal-source-canon").checked ? "YES" : "";
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.LEGENDS] = objectSourceLine.querySelector(".modal-source-legends").checked ? "YES" : "";
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.NOTE] = sanitizeText(objectSourceLine.querySelector(".modal-source-note").value);
    // Check results
    if(result.length === 1) {
      console.log("Object Source found ... Updating");
      // Update in spreadsheet
      let returnCode = await updateSpreadSheetRowData(SPREADSHEET_ID, SHEETS.OBJECT_SOURCES, sheetRange, SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID, dataRow);
      if(!returnCode) {
        alert("Error encoutered ! Check console (F12) for more details");
      } else {
        messageCount.updatedSources = messageCount.updatedSources + 1;
        if(messageCount.updatedSources + messageCount.addedSources === objectSourceLineCount) {
          alert(`ObjectSources :\nAdded entries : ${messageCount.addedSources}\nUpdated entries : ${messageCount.updatedSources}`);
        }
        console.log(`Object source form has been successfully updated !`);
      }
    } else if(result.length === 0) { // Or create it as new line
      console.log("Object Source not found ... Adding");
      // Add at the end of spreadsheet in a new line
      console.log(`sheetRange : ${sheetRange}`);
      let returnCode = await addSpreadSheetRowData(SPREADSHEET_ID, SHEETS.OBJECT_SOURCES, sheetRange, dataRow);
      if(!returnCode) {
        alert("Error encoutered ! Check console (F12) for more details");
      } else {
        messageCount.addedSources = messageCount.addedSources + 1;
        console.log("Object source has been successfully created at the end of the spreadsheet !");
        if(messageCount.updatedSources + messageCount.addedSources === objectSourceLineCount) {
          alert(`ObjectSources :\nAdded entries : ${messageCount.addedSources}\nUpdated entries : ${messageCount.updatedSources}`);
        }
      }     
    } else {
      console.log("Number of found objects is different than expected. Expected 0 or 1. results =>", result);
      alert("Error encoutered ! Check console (F12) for more details");
    }
  });
  // alert(`Added entries : ${addedSourceNumber}\nUpdated entries : ${updatedSourceNumber}`);
}



/**
 * Updata data : switch to right update method (object or hyperroute)
 */
function updateDataFromValidationModal() {
  let dataTabIdToUpdate = document.getElementById("modal-sheet-data-id-to-update").value;
  switch (dataTabIdToUpdate) {
    case SHEETS.OBJECTS.ID:
      updateObjectData();
      break;
    case SHEETS.HYPERROUTES.ID:
      updateHyperrouteData();
      break;
    default:
      alert(`Sheet ID ${dataTabIdToUpdate} is unknown !`);
      break;
  }
}

/** EVENTS **/

/**
 * Add line on source modal table
 */
document.getElementById("source-modal-table-add-line-button").addEventListener('click', function(e) {
  e.preventDefault(); // Skip form default action
  addNewEmptyLineOnSourceModalTable();
});

/**
 * Save Source Modal Data
 */
document.getElementById("source-modal-table-save-data").addEventListener('click', function(e) {
  e.preventDefault(); // Skip form default action
  let sourceSheetId = document.getElementById("source-modal-sheet-id").value;
  switch (sourceSheetId) {
    // Object
    case SHEETS.OBJECT_SOURCES.ID:
      saveDataFromObjectSourceModal();
      break;
    // Hyperroute
    case SHEETS.HYPERROUTE_SOURCES.ID:
      saveDataFromHyperrouteSourceModal();
      break;
    // DEBUG
    default:
      alert(`Unknown sheet ID ${sourceSheetId} !`);
      break;
  }
});