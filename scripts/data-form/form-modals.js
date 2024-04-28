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
        allowClear: true
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
      addSelect2CellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.SOURCE_ID]);
      // row.appendChild(sourcePathCell);
      addInputTextCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.SOURCE_PATH]);
      // Source URL
      addInputTextCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.URL]);
      // Source Notes
      addTextAreaCellToSourceModalContent(row, sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.NOTE]);
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
  let sourceID = document.createElement("td");
  sourceID.appendChild(document.createTextNode(textContent));
  sourceID.style.display = "none";
  sourceID.classList.add(className);
  parentRow.appendChild(sourceID);
}

/**
 * Add select2 cell to source modal content
 */
function addSelect2CellToSourceModalContent(parentRow, selectedDataID) {
  let sourceCell = document.createElement("td");
  let sourceCellSelect = document.createElement("select");
  sourceCellSelect.classList.add("modal-source-field");
  loadSourcesSelect2(sourceCellSelect, selectedDataID);
  sourceCell.appendChild(sourceCellSelect);
  parentRow.appendChild(sourceCell);
}

/**
 * Add input type text cell to source modal content
 */
function addInputTextCellToSourceModalContent(parentRow, textContent) {
  let sourcePathCell = document.createElement("td");
  let sourcePathCellInput = document.createElement("input");
  sourcePathCellInput.setAttribute('type', 'text');
  sourcePathCellInput.value = textContent;
  sourcePathCell.appendChild(sourcePathCellInput);
  parentRow.appendChild(sourcePathCell);
}

/**
 * Add text area cell to source modal content
 */
function addTextAreaCellToSourceModalContent(parentRow, textContent) {
  let sourceNotes = document.createElement("td");
  let sourceNotesInput = document.createElement("textarea");
  sourceNotesInput.value = textContent;
  sourceNotes.appendChild(sourceNotesInput);
  parentRow.appendChild(sourceNotes);
}

/**
 * Add new empty line on source modal table
 */
function addNewEmptyLineOnSourceModalTable() {
  const sourceModalTableBody = document.getElementById("source-modal-table-body");
  let row = document.createElement("tr"); // ROW
  addActionCellToSourceModalTable(row); // BUTTONS
  addHiddenTextCellToSourceModalTable(row, generateUUIDv7(), "modal-object-source-id"); // Source Row ID
  addSelect2CellToSourceModalContent(row, null); // Source from list
  addInputTextCellToSourceModalContent(row, "");// Source path
  addInputTextCellToSourceModalContent(row, ""); // Source URL
  addTextAreaCellToSourceModalContent(row, "");// Source Notes
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