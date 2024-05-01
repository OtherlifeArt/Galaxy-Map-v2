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

function closeSourceModal() {
  let modal = document.getElementById("source-modal");
  modal.style.display = "none";
}

// Get the <span> element that closes the modal
var sourceModalSpan = document.getElementById("close-source-modal");
// When the user clicks on <span> (x), close the modal
sourceModalSpan.onclick = function() {
  closeSourceModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  // console.log(event.target);
  if (event.target == document.getElementById("source-modal")) {
    document.getElementById("source-modal").style.display = "none";
  }
}

/**
 * Load sources Select2
 */
async function loadSourcesSelect2(selectDomElement, selectedID) {
  $(document).ready(function() {
    // $(".modal-source-field").each(function (){
    $(selectDomElement).select2({
        data: astronomicalObjectSourceSearchArray,
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
 * Open modal for sourcing fields
 */
async function openDataFieldSourceModal(eventTarget) {
  // Check if object exists (has ID) before going further
  const objectId = sanitizeText(document.getElementById('object-tech-id').value);
  if(!objectId) {
    alert("You must create object before adding sources. Tip : enter object name, save object, then resume editing object/sources.");
    return;
  }
  // console.log(eventTarget.parentElement.firstChild.nextSibling.getAttribute("for"));
  const formEntryID = eventTarget.parentElement.firstChild.nextSibling.getAttribute("for");
  // Get spreadhseet column matching source entry
  let columnEntryName;
  switch (formEntryID) {
    case "object-name":
      columnEntryName = "NAME";
      break;
    default:
      console.log(`Entry with ID ${formEntryID} not referenced !`);
      alert("Source error : entry unknown - check console (F12)");
      break;
  }
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
  document.getElementById('object-column-source-column-index').value = columnEntryName;
  document.getElementById('object-column-source-object-id').value = objectId;
  // Table fields
  // document.getElementById('object-column-source-id').value = doesSourceExists ? : ; // TODO with select 2
  if(sourceRows != undefined && sourceRows.length > 0) {
    // Building table content
    const sourceTableBody = document.getElementById('source-modal-table-body');
    sourceTableBody.innerHTML = ""; // Clean table content
    for (let sourceRowIndex = 0; sourceRowIndex < sourceRows.length; sourceRowIndex++) {
      const sourceRow = sourceRows[sourceRowIndex];
      console.log(sourceRow);
      // ROW
      let row = document.createElement("tr");
      // BUTTONS
      addActionCellToSourceModalTable(row);
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

/* Source modal table content */

/**
 * Add new button to source modal content
 */
function addActionCellToSourceModalTable(parentRow) {
  let sourceAction = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Row";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.borderColor = "red";
  deleteButton.addEventListener("click", function(e) {
    // console.log(e.target);
    deleteDataLineFromSourceModal(e.target.parentNode.parentNode);
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
  let row = document.createElement("tr"); // ROW
  addActionCellToSourceModalTable(row); // BUTTONS
  addHiddenTextCellToSourceModalTable(row, generateUUIDv7(), "modal-object-source-id"); // Source Row ID
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
async function deleteDataLineFromSourceModal(tableRowElement) {
  // console.log(tableRowElement);
  // Delete Spreadsheet data if exists
  const objectSourceID = tableRowElement.querySelector(".modal-object-source-id").innerHTML;
  // console.log(objectSourceID);
  if(confirm("Are you sure you want to delete object source line with ID "+ objectSourceID +" ?")) {
    const sheetRange = `!${SPREADSHEET_HEADERS.OBJECT_SOURCES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECT_SOURCES.LAST_COLUMN_REF()}`;
    let returnCode = await deleteSpreadSheetRowData(SPREADSHEET_ID, SHEETS.OBJECT_SOURCES, sheetRange, SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID, objectSourceID);
    if(returnCode) {
      console.log("Object source has been successfully deleted !");
    } else {
      alert("Error encoutered ! Check console (F12) for more details");
    }
  }
  // Delete modal table line
  tableRowElement.remove();
}

/**
 * Save source modal content to spreadsheet
 */
function saveDataFromSourceModal() {
  console.log("Object source save");
  const sourceModalTableBody = document.getElementById("source-modal-table-body");
  const columnEntryName = document.getElementById('object-column-source-column-index').value;
  const objectId = document.getElementById('object-column-source-object-id').value;
  sourceModalTableBody.childNodes.forEach(async objectSourceLine => {
    // For each line check if it exists and update it
    const objectSourceId = objectSourceLine.querySelector(".modal-object-source-id").innerHTML;
    const sheetRange = `!${SPREADSHEET_HEADERS.OBJECT_SOURCES.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECT_SOURCES.LAST_COLUMN_REF()}`;
    const result = await searchForSpreadSheetValueByElementID(SPREADSHEET_ID, SHEETS.OBJECT_SOURCES, sheetRange, SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID, objectSourceId);
    // Build data array
    let dataRow = [];
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID] = objectSourceId;
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.OBJECT_ID] = objectId;
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.SOURCE_ID] = sanitizeText(objectSourceLine.querySelector(".modal-source-id").value);
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.NOTES] = sanitizeText(objectSourceLine.querySelector(".modal-source-note").value);
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.SOURCE_PATH] = sanitizeText(objectSourceLine.querySelector(".modal-source-path").value);
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.TARGET_COLUMN] = columnEntryName;
    dataRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.URL] = sanitizeText(objectSourceLine.querySelector(".modal-source-url").value);
    // Check results
    if(result.length === 1) {
      console.log("Object Source found ... Updating");
      // Update in spreadsheet
      let returnCode = await updateSpreadSheetRowData(SPREADSHEET_ID, SHEETS.OBJECT_SOURCES, sheetRange, SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID, dataRow);
      if(!returnCode) {
        alert("Error encoutered ! Check console (F12) for more details");
      }
    } else if(result.length === 0) { // Or create it as new line
      console.log("Object Source not found ... Adding");
      // Add at the end of spreadsheet in a new line
      let returnCode = await addSpreadSheetRowData(SPREADSHEET_ID, SHEETS.OBJECT_SOURCES, sheetRange, dataRow);
      if(!returnCode) {
        alert("Error encoutered ! Check console (F12) for more details");
      }
    } else {
      console.log("Number of found objects is different than expected. Expected 0 or 1. results =>", result);
      alert("Error encoutered ! Check console (F12) for more details");
    }
    
  });
  // TODO
  // TODO
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
  saveDataFromSourceModal();
});