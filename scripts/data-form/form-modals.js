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
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

/**
 * Load sources Select2
 */
async function loadSourcesSelect2() {
  $(document).ready(function() {
    $(".modal-source-field").each(function (){
      $(this).select2({
          data: astronomicalObjectSourceSearchArray,
          placeholder: 'Source search....',
          allowClear: true
        });
    });
  });
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
      let sourceAction = document.createElement("td");
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete Row";
      deleteButton.style.backgroundColor = "red";
      deleteButton.style.borderColor = "red";
      deleteButton.addEventListener("click", function(e) {
        console.log(e.target);
      });
      sourceAction.appendChild(deleteButton);
      row.appendChild(sourceAction);
      // Source Row ID
      let sourceID = document.createElement("td");
      sourceID.appendChild(document.createTextNode(sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.ID]));
      sourceID.style.display = "none";
      row.appendChild(sourceID);
      // Source from list
      let sourceCell = document.createElement("td");
      let sourceCellSelect = document.createElement("select");
      sourceCellSelect.classList.add("modal-source-field");
      loadSourcesSelect2(sourceCellSelect);
      sourceCell.appendChild(sourceCellSelect);
      row.appendChild(sourceCell);
      // Source path
      let sourcePathCell = document.createElement("td");
      let sourcePathCellInput = document.createElement("input");
      sourcePathCellInput.setAttribute('type', 'text');
      sourcePathCellInput.value = sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.SOURCE_PATH];
      sourcePathCell.appendChild(sourcePathCellInput);
      row.appendChild(sourcePathCell);
      // Source URL
      let sourceUrl = document.createElement("td");
      let sourceUrlInput = document.createElement("input");
      sourceUrlInput.setAttribute('type', 'text');
      sourceUrlInput.value = sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.URL];
      sourceUrl.appendChild(sourceUrlInput);
      row.appendChild(sourceUrl);
      // Source Notes
      let sourceNotes = document.createElement("td");
      let sourceNotesInput = document.createElement("textarea");
      sourceNotesInput.value = sourceRow[SPREADSHEET_HEADERS.OBJECT_SOURCES.COLUMNS.NOTE];
      sourceNotes.appendChild(sourceNotesInput);
      row.appendChild(sourceNotes);
      // Append row
      sourceTableBody.appendChild(row);
    }
  }
  displaySourceModal();
}

/**
 * Save source modal content to spreadsheet
 */
function saveDataFromSourceModal() {

}
