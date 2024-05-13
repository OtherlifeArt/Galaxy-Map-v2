/**
 * Load all hyperroute sections
 */
async function loadHyperrouteSections() {
  resetHyperrouteSectionDivOnForm(); // Reset section list
  // Search for all sections
  const hyperrouteId = sanitizeText(document.getElementById('hyperroute-tech-id').value);
  const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.LAST_COLUMN_REF()}`;
  const result = await searchForSpreadSheetValueByElementID(SPREADSHEET_ID, SHEETS.HYPERROUTE_SECTIONS, sheetRange, SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.HYPERROUTE_ID, hyperrouteId);
  if(result.length > 0) {
    console.log("Hyperroute sections found", result);
    result.forEach(hyperrouteSection => {
      addHyperrouteSectionDivOnForm(hyperrouteSection);
    });
  } else {
    console.log("No Hyperroute section found !");
  }
}

function resetHyperrouteSectionDivOnForm() {
  document.getElementById("hyperroute-section-form-content").innerHTML = "";
}

function addEmptyHyperrouteSectionDivOnForm(e) {
  e.preventDefault(); // Skip form default action
  const hyperrouteId = sanitizeText(document.getElementById('hyperroute-tech-id').value);
  if(!hyperrouteId) {
    alert("You must select or create hyperroute before adding hyperroute section. Tip : enter hyperroute name, save hyperroute, then resume editing hyperroute and sections.");
    return;
  } else {
    const HYPERROUTE_SECTION_COLUMN = SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS;
    sectionDataArray = [];
    sectionDataArray[HYPERROUTE_SECTION_COLUMN.ID] = generateUUIDv7();
    addHyperrouteSectionDivOnForm(sectionDataArray);
  }
}

function addHyperrouteSectionDivOnForm(sectionDataArray) {
  const HYPERROUTE_SECTION_COLUMN = SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS;
  const HYPERROUTE_SECTION_FORM_CONTENT = document.getElementById("hyperroute-section-form-content");
  // Create tab content
  const rootDiv =  document.createElement("div");
  rootDiv.classList.add("hyperroute-section-row");
  // First column
  const firstColumnDiv =  document.createElement("div");
  // Button and hidden elements
  addActionFieldToHyperrouteSection(firstColumnDiv);
  addInputHiddenFieldToHyperrouteSection(firstColumnDiv, "hyperroute-section-id", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.ID]));
  // Second column
  const secondColumnDiv =  document.createElement("div");
  // First line
  const firstLineDiv =  document.createElement("div");
  addInputTextFieldToHyperrouteSection(firstLineDiv, "hyperroute-section-sorting-id", "Sorting ID", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.HUMAN_ID]), "Sorting/Human ID", true);
  addSelect2FieldToHyperrouteSection(firstLineDiv, "hyperroute-section-location-a", "Location A", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.LOCATION_A_ID]), "A Section End (Astronomical Object)");
  addSelect2FieldToHyperrouteSection(firstLineDiv, "hyperroute-section-location-b", "Location B", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.LOCATION_B_ID]), "B Section End (Astronomical Object)");
  addInputNumberFieldToHyperrouteSection(firstLineDiv, 0.01, "hyperroute-section-date-from", "Date : From", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.DATE_FROM]), "Start date");
  addInputNumberFieldToHyperrouteSection(firstLineDiv, 0.01, "hyperroute-section-date-to", "To", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.DATE_TO]), "End date");
  // Second line
  const secondLineDiv =  document.createElement("div");
  addInputCheckboxFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-canon", "Canon", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.CANON]), "Is Hyperroute Section Canon (\"© Disney\" canon) ?");
  addInputCheckboxFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-legends", "Legends", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.LEGENDS]), "Is Hyperroute Section Legends (original/old canon) ?"
  );
  addInputCheckboxFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-unlicenced", "Unlicenced", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.UNLICENSED]), "Is Hyperroute Section unlicenced (neither Canon nor Legends) ?");
  addTravelTimeFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-travel-time", "Section Travel Time", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.AVERAGE_TRAVEL_TIME]), "Average travel time in days, hours, minutes, seconds");
  addTextAreaFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-desc", "Desc", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.DESC]), "Hyperroute Section Description");
  addInputTextFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-placement-certitude", "Placement Certitude", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.PLACEMENT_CERTITUDE]), "Indicate Hyperroute Section placement certitude");
  addTextAreaFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-placement-logic", "Placement Logic", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.PLACEMENT_LOGIC]), "Explain object placement logic");
  addTextAreaFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-notes", "Notes", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.NOTES]), "Notes");
  addTextAreaFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-interesting", "Interesting", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.INTERESTING]), "Additionnal elements of interest");
  addInputCheckboxFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-data-certified", "Publish on map ?", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.is_certified]), "Are data fully checked or sufficient, and ready for publication ?");
  addTextAreaFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-geom", "GEOM", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.GEOM]), "Geometry for complex objects like lines, polygons …", true);
  addInputTextFieldToHyperrouteSection(secondLineDiv, "hyperroute-section-geom-type", "GEOM TYPE", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.GEOM_TYPE]), "Used to build Geojson files.");

  // Append elements
  rootDiv.appendChild(firstColumnDiv);
  secondColumnDiv.appendChild(firstLineDiv);
  secondColumnDiv.appendChild(secondLineDiv);
  rootDiv.appendChild(secondColumnDiv);
  HYPERROUTE_SECTION_FORM_CONTENT.appendChild(rootDiv);
}

function addFieldTooltiToHyperrouteSection(tooltip) {
  let container = document.createElement("span");
  container.classList.add("tooltip");
  let tooltipTextSpan = document.createElement("span");
  tooltipTextSpan.classList.add("tooltiptext");
  tooltipTextSpan.innerHTML = tooltip;
  container.appendChild(tooltipTextSpan);
  return container;
}

function addActionFieldToHyperrouteSection(parentDiv) {
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Row";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.borderColor = "red";
  deleteButton.addEventListener("click", function(e) {
    e.preventDefault(); // Skip form default action
    console.log(e.target);
    //deleteDataLineFromSourceModal(e.target.parentNode.parentNode, sheetNameLabel, elementIdClassName);
    deleteHyperrouteSectionRow(e.target);
  });
  parentDiv.appendChild(deleteButton);
}

async function deleteHyperrouteSectionRow(eventTarget) {
  // console.log(eventTarget.closest(".hyperroute-section-row"));
  const row = eventTarget.closest(".hyperroute-section-row");
  const hyperrouteSectionId = row.querySelector(".hyperroute-section-id").value;
  // console.log("Hyperroute section id", hyperrouteSectionId);
  // Delete hyperroute section on spreadsheet if it exists
  if(confirm("Are you sure you want to delete hyperroute section with ID "+ hyperrouteSectionId +" ?")) {
    const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.LAST_COLUMN_REF()}`;
    let returnCode = await deleteSpreadSheetRowData (SPREADSHEET_ID, SHEETS.HYPERROUTE_SECTIONS, sheetRange, SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.ID, hyperrouteSectionId);
    if(returnCode) {
      console.log("Hyper route section has been successfully deleted !");
      alert('Hyper route section has been successfully deleted !');
    } else {
      alert("Deleted hyperroute section seems to no have any entry in database. Else it could be an error ! Check console (F12) for more details if you have doubts !");
    }
    // Remove row
    row.remove();
  }
}

function addInputHiddenFieldToHyperrouteSection(parentDiv, className, value) {
  // Field
  let field = document.createElement("input");
  field.type = "hidden";
  field.classList.add(className);
  field.value = value;
  // Append fields
  parentDiv.appendChild(field);
}

function addInputTextFieldToHyperrouteSection(parentDiv, className, label, value, tooltip, isReadonly=false) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Field
  let field = document.createElement("input");
  field.type = "text";
  field.readOnly = isReadonly;
  field.classList.add(className);
  field.value = value;
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  labelField.appendChild(field);
  container.appendChild(labelField);
  parentDiv.appendChild(container);
}

function addInputNumberFieldToHyperrouteSection(parentDiv, rangeStep, className, label, value, tooltip, isReadonly=false) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Field
  let field = document.createElement("input");
  field.type = "number";
  field.step = rangeStep;
  field.readOnly = isReadonly;
  field.classList.add(className);
  field.value = value;
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  labelField.appendChild(field);
  container.appendChild(labelField);
  parentDiv.appendChild(container);
}

function addSelect2FieldToHyperrouteSection(parentDiv, className, label, value, tooltip) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Field
  let field = document.createElement("select");
  field.classList.add(className);
  loadLocationSelect2ToHyperrouteSection(field, value);
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  labelField.appendChild(field);
  container.appendChild(labelField);
  parentDiv.appendChild(container);
}

function addInputCheckboxFieldToHyperrouteSection(parentDiv, className, label, value, tooltip, isReadonly=false) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Field
  let field = document.createElement("input");
  field.type = "checkbox";
  field.readOnly = isReadonly;
  field.classList.add(className);
  setCheckboxElementStateFromValue(field, value, PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  labelField.appendChild(field);
  container.appendChild(labelField);
  parentDiv.appendChild(container);
}

function addTextAreaFieldToHyperrouteSection(parentDiv, className, label, value, tooltip, isReadonly=false) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Field
  let field = document.createElement("textarea");
  field.readOnly = isReadonly;
  field.classList.add(className);
  field.value = value;
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  labelField.appendChild(field);
  container.appendChild(labelField);
  parentDiv.appendChild(container);
}

function addTravelTimeFieldToHyperrouteSection(parentDiv, className, label, value, tooltip, isReadonly=false) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Value
  const duration = value === "" ? ["", "", "", ""] : value.split(":");
  // Fields
  let dayField = document.createElement("input");
  dayField.type = "number";
  dayField.readOnly = isReadonly;
  dayField.classList.add(className+"-day");
  dayField.min = 0;
  dayField.value = duration[0];
  let hourField = document.createElement("input");
  hourField.type = "number";
  hourField.readOnly = isReadonly;
  hourField.classList.add(className+"-hour");
  hourField.min = 0;
  hourField.max = 24;
  hourField.value = duration[1];
  let minuteField = document.createElement("input");
  minuteField.type = "number";
  minuteField.readOnly = isReadonly;
  minuteField.classList.add(className+"-minute");
  minuteField.min = 0;
  minuteField.max = 60;
  minuteField.value = duration[2];
  let secondField = document.createElement("input");
  secondField.type = "number";
  secondField.readOnly = isReadonly;
  secondField.classList.add(className+"-second");
  secondField.min = 0;
  secondField.max = 60;
  secondField.value = duration[3];
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  labelField.appendChild(dayField);
  labelField.appendChild(hourField);
  labelField.appendChild(minuteField);
  labelField.appendChild(secondField);
  container.appendChild(labelField);
  parentDiv.appendChild(container);
}

function loadLocationSelect2ToHyperrouteSection(selectDomElement, selectedId) {
  $(document).ready(function() {
    $(selectDomElement).select2({
        data: astronomicalObjectSearchArray,
        placeholder: 'Astro Object search....',
        allowClear: true,
        // containerCssClass: "modal-source-id-select2"
    });
    $(selectDomElement).select2().val(selectedId);
    $(selectDomElement).select2().trigger('change');
  });
}