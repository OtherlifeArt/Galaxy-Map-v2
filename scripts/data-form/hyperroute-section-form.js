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
  secondColumnDiv.classList.add("grid-wrapper-fixed-3-columns");
  // First line
  // const firstLineDiv =  document.createElement("div");
  addInputTextFieldToHyperrouteSection(secondColumnDiv, "grid-column-one field-wrapper", "hyperroute-section-sorting-id", "Sorting ID", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.HUMAN_ID]), "Sorting/Human ID", true);
  addInputCheckboxFieldToHyperrouteSection(secondColumnDiv, "grid-column-two field-wrapper", "hyperroute-section-data-certified", "Publish on Map", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.is_certified]), "Are data fully checked or sufficient, and ready for publication ?");
  addSelect2FieldToHyperrouteSection(secondColumnDiv, "grid-column-one-to-three field-wrapper", "hyperroute-section-location-a-id", "Location A", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.LOCATION_A_ID]), "A Section End (Astronomical Object)");
  addSelect2FieldToHyperrouteSection(secondColumnDiv, "grid-column-one-to-three field-wrapper", "hyperroute-section-location-b-id", "Location B", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.LOCATION_B_ID]), "B Section End (Astronomical Object)");
  addInputNumberFieldToHyperrouteSection(secondColumnDiv, 0.01, "grid-column-one field-wrapper", "hyperroute-section-date-from", "Date : From", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.DATE_FROM]), "Start date");
  addInputNumberFieldToHyperrouteSection(secondColumnDiv, 0.01, "grid-column-two field-wrapper", "hyperroute-section-date-to", "To", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.DATE_TO]), "End date");
  // Second line
  // const secondLineDiv =  document.createElement("div");
  addInputCheckboxFieldToHyperrouteSection(secondColumnDiv, "grid-column-one field-wrapper", "hyperroute-section-canon", "Canon", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.CANON]), "Is Hyperroute Section Canon (\"© Disney\" canon) ?");
  addInputCheckboxFieldToHyperrouteSection(secondColumnDiv, "grid-column-two field-wrapper", "hyperroute-section-legends", "Legends", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.LEGENDS]), "Is Hyperroute Section Legends (original/old canon) ?"
  );
  addInputCheckboxFieldToHyperrouteSection(secondColumnDiv, "grid-column-three field-wrapper", "hyperroute-section-unlicenced", "Unlicenced", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.UNLICENSED]), "Is Hyperroute Section unlicenced (neither Canon nor Legends) ?");
  addTravelTimeFieldToHyperrouteSection(secondColumnDiv, "grid-column-one-to-three field-wrapper", "hyperroute-section-travel-time", "Section Travel Time", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.AVERAGE_TRAVEL_TIME]), "Average travel time in days, hours, minutes, seconds");
  addTextAreaFieldToHyperrouteSection(secondColumnDiv, "grid-column-one-to-three field-wrapper", "hyperroute-section-desc", "Desc", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.DESC]), "Hyperroute Section Description");
  addInputTextFieldToHyperrouteSection(secondColumnDiv, "grid-column-one field-wrapper", "hyperroute-section-placement-certitude", "Placement Certitude", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.PLACEMENT_CERTITUDE]), "Indicate Hyperroute Section placement certitude");
  addTextAreaFieldToHyperrouteSection(secondColumnDiv, "grid-column-two-to-three field-wrapper", "hyperroute-section-placement-logic", "Placement Logic", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.PLACEMENT_LOGIC]), "Explain object placement logic");
  addTextAreaFieldToHyperrouteSection(secondColumnDiv, "grid-column-one-to-three field-wrapper", "hyperroute-section-notes", "Notes", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.NOTES]), "Notes");
  addTextAreaFieldToHyperrouteSection(secondColumnDiv, "grid-column-one-to-three field-wrapper", "hyperroute-section-interesting", "Interesting", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.INTERESTING]), "Additionnal elements of interest");
  addTextAreaFieldToHyperrouteSection(secondColumnDiv, "grid-column-one-to-two field-wrapper", "hyperroute-section-geom", "GEOM", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.GEOM]), "Geometry for complex objects like lines, polygons …", true);
  addInputTextFieldToHyperrouteSection(secondColumnDiv, "grid-column-three field-wrapper", "hyperroute-section-geom-type", "GEOM TYPE", sanitizeText(sectionDataArray[HYPERROUTE_SECTION_COLUMN.GEOM_TYPE]), "Used to build Geojson files.");

  // Append elements
  rootDiv.appendChild(firstColumnDiv);
  // secondColumnDiv.appendChild(firstLineDiv);
  // secondColumnDiv.appendChild(secondLineDiv);
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
    let returnCode = await deleteHyperrouteSectionRowByID(hyperrouteSectionId);
    if(returnCode) {
      console.log("Hyper route section of id "+sectionRow[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.ID]+" has been successfully deleted !");
      alert('"Hyper route section of id "+sectionRow[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.ID]+" has been successfully deleted !"');
    } else {
      alert("Deleted hyperroute section seems to no have any entry in database. Else it could be an error ! Check console (F12) for more details if you have doubts !");
    }
    // Remove row
    row.remove();
  }
}

async function deleteHyperrouteSectionRowByID(hyperrouteSectionId) {
  const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.LAST_COLUMN_REF()}`;
  return await deleteSpreadSheetRowData (SPREADSHEET_ID, SHEETS.HYPERROUTE_SECTIONS, sheetRange, SPREADSHEET_HEADERS.HYPERROUTE_SOURCES.COLUMNS.ID, hyperrouteSectionId);
}

/**
 * 
 */
async function deleteAllHyperrouteSectionRowByHyperrouteId(hyperrouteId) {
  const sheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.LAST_COLUMN_REF()}`;
  // Get sections
  const sectionRows = await getSpreadSheetRowFromColumnKeyValuePairs(SPREADSHEET_ID, SHEETS.HYPERROUTE_SECTIONS.NAME, sheetRange, 
    [{key: SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.HYPERROUTE_ID, value: hyperrouteId}]
  );
  let sectionStatus = [true, 0];
  // Delete sections
  for (const sectionRow of sectionRows) {
    let returnCode = await deleteHyperrouteSectionRowByID(sectionRow[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.ID]);
    if(returnCode) {
      console.log("Hyper route section of id "+sectionRow[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.ID]+" has been successfully deleted !");
    } else {
      alert("Deleted hyperroute section seems to no have any entry in database. Else it could be an error ! Check console (F12) for more details if you have doubts !");
    }
    sectionStatus[0] = sectionStatus[0] && returnCode;
    sectionStatus[1]++;
  }
  return sectionStatus;
}

function addInputHiddenFieldToHyperrouteSection(parentDiv, fieldClassName, value) {
  // Field
  let field = document.createElement("input");
  field.type = "hidden";
  field.classList.add(fieldClassName);
  field.value = value;
  // Append fields
  parentDiv.appendChild(field);
}

function addInputTextFieldToHyperrouteSection(parentDiv, wrapperClassName, fieldClassName, label, value, tooltip, isReadonly=false) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Field
  let field = document.createElement("input");
  field.type = "text";
  field.readOnly = isReadonly;
  field.classList.add(fieldClassName);
  field.value = value;
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  wrapperClassName.split(" ").forEach(className => container.classList.add(className));
  container.appendChild(labelField);
  container.appendChild(field);
  parentDiv.appendChild(container);
}

function addInputNumberFieldToHyperrouteSection(parentDiv, rangeStep, wrapperClassName, fieldClassName, label, value, tooltip, isReadonly=false) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Field
  let field = document.createElement("input");
  field.type = "number";
  field.step = rangeStep;
  field.readOnly = isReadonly;
  field.classList.add(fieldClassName);
  field.value = value;
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  wrapperClassName.split(" ").forEach(className => container.classList.add(className));
  container.appendChild(labelField);
  container.appendChild(field);
  parentDiv.appendChild(container);
}

function addSelect2FieldToHyperrouteSection(parentDiv, wrapperClassName, fieldClassName, label, value, tooltip) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Field
  let field = document.createElement("select");
  field.classList.add(fieldClassName);
  loadLocationSelect2ToHyperrouteSection(field, value);
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  wrapperClassName.split(" ").forEach(className => container.classList.add(className));
  container.appendChild(labelField);
  container.appendChild(field);
  parentDiv.appendChild(container);
}

function addInputCheckboxFieldToHyperrouteSection(parentDiv, wrapperClassName, fieldClassName, label, value, tooltip, isReadonly=false) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Field
  let field = document.createElement("input");
  field.type = "checkbox";
  field.readOnly = isReadonly;
  field.classList.add(fieldClassName);
  setCheckboxElementStateFromValue(field, value, PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  wrapperClassName.split(" ").forEach(className => container.classList.add(className));
  container.appendChild(labelField);
  container.appendChild(field);
  parentDiv.appendChild(container);
}

function addTextAreaFieldToHyperrouteSection(parentDiv, wrapperClassName, fieldClassName, label, value, tooltip, isReadonly=false) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Field
  let field = document.createElement("textarea");
  field.readOnly = isReadonly;
  field.classList.add(fieldClassName);
  field.value = value;
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  wrapperClassName.split(" ").forEach(className => container.classList.add(className));
  container.appendChild(labelField);
  container.appendChild(field);
  parentDiv.appendChild(container);
}

function addTravelTimeFieldToHyperrouteSection(parentDiv, wrapperClassName, fieldClassName, label, value, tooltip, isReadonly=false) {
  // Label
  let labelField = document.createElement("label");
  labelField.innerHTML = label;
  // Value
  const duration = value === "" ? ["", "", "", ""] : value.split(":");
  // Fields
  let dayField = document.createElement("input");
  dayField.type = "number";
  dayField.readOnly = isReadonly;
  dayField.classList.add(fieldClassName+"-day");
  dayField.min = 0;
  dayField.value = duration[0];
  let hourField = document.createElement("input");
  hourField.type = "number";
  hourField.readOnly = isReadonly;
  hourField.classList.add(fieldClassName+"-hour");
  hourField.min = 0;
  hourField.max = 23;
  hourField.value = duration[1];
  let minuteField = document.createElement("input");
  minuteField.type = "number";
  minuteField.readOnly = isReadonly;
  minuteField.classList.add(fieldClassName+"-minute");
  minuteField.min = 0;
  minuteField.max = 59;
  minuteField.value = duration[2];
  let secondField = document.createElement("input");
  secondField.type = "number";
  secondField.readOnly = isReadonly;
  secondField.classList.add(fieldClassName+"-second");
  secondField.min = 0;
  secondField.max = 59;
  secondField.value = duration[3];
  // Append fields
  let container = addFieldTooltiToHyperrouteSection(tooltip);
  wrapperClassName.split(" ").forEach(className => container.classList.add(className));
  container.appendChild(labelField);
  container.appendChild(dayField);
  container.appendChild(hourField);
  container.appendChild(minuteField);
  container.appendChild(secondField);
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

function averageTravelTimeArrayToString (dayHourMinuteSecondArray) {
  if(dayHourMinuteSecondArray[0] !== "" || dayHourMinuteSecondArray[1] !== "" || dayHourMinuteSecondArray[2] !== "" || dayHourMinuteSecondArray[3] !== "") {
    for (let index = 0; index < dayHourMinuteSecondArray.length; index++) {
      if(dayHourMinuteSecondArray[index] === "") {
        dayHourMinuteSecondArray[index] = 0;
      }
    }
    return dayHourMinuteSecondArray.join(":");
  } else {
    return "";
  }
}

function convertHyperrouteSectionFormToArray() {
  const HYPERROUTE_SECTION_COLUMN = SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS;
  const HYPERROUTE_SECTION_FORM_ROWS = document.getElementsByClassName("hyperroute-section-row");
  let allHyperrouteSectionArray = [];
  // Formatted values
  const hyperrouteId = sanitizeText(document.getElementById('hyperroute-tech-id').value);
  const hyperrouteName = sanitizeText(document.getElementById('hyperroute-name').value);
  // Automated values
  const updateDateTime = new Date().toUTCString();
  // Format hyperroute section row into array
  Array.from(HYPERROUTE_SECTION_FORM_ROWS).forEach((domSection) => { // getElementsByClassName return a HTMLCollection that must be casted to array
    let hyperrouteSectionArray = [];
    // formatted values
    const locationAId = sanitizeText(domSection.querySelector('.hyperroute-section-location-a-id').value);
    const locationBId = sanitizeText(domSection.querySelector('.hyperroute-section-location-b-id').value);
    const locationAName = locationAId === "" ? "" : astronomicalObjectSearchArray.find(astroObject => astroObject.id === locationAId).text;
    const locationBName = locationBId === "" ? "" : astronomicalObjectSearchArray.find(astroObject => astroObject.id === locationAId).text;
    const averageTravelTime = averageTravelTimeArrayToString([
      sanitizeText(domSection.querySelector('.hyperroute-section-travel-time-day').value),
      sanitizeText(domSection.querySelector('.hyperroute-section-travel-time-hour').value),
      sanitizeText(domSection.querySelector('.hyperroute-section-travel-time-minute').value),
      sanitizeText(domSection.querySelector('.hyperroute-section-travel-time-second').value)
    ]);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.HYPERROUTE] = hyperrouteName;
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.LOCATION_A_ID] = locationAId;
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.LOCATION_A] = locationAName;
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.LOCATION_B_ID] = locationBId;
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.LOCATION_B] = locationBName;
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.updated_at] = updateDateTime;
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.HYPERROUTE_ID] = hyperrouteId
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.AVERAGE_TRAVEL_TIME] = averageTravelTime;
    // form values
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.ID] = sanitizeText(domSection.querySelector('.hyperroute-section-id').value);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.HUMAN_ID] = sanitizeText(domSection.querySelector('.hyperroute-section-sorting-id').value);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.DATE_FROM] = sanitizeText(domSection.querySelector('.hyperroute-section-date-from').value);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.DATE_TO] = sanitizeText(domSection.querySelector('.hyperroute-section-date-to').value);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.CANON] = getValueFromCheckboxElementState(domSection.querySelector('.hyperroute-section-canon'), PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.LEGENDS] = getValueFromCheckboxElementState(domSection.querySelector('.hyperroute-section-legends'), PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.UNLICENSED] = getValueFromCheckboxElementState(domSection.querySelector('.hyperroute-section-unlicenced'), PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.DESC] = sanitizeText(domSection.querySelector('.hyperroute-section-desc').value);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.PLACEMENT_CERTITUDE] = sanitizeText(domSection.querySelector('.hyperroute-section-placement-certitude').value);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.PLACEMENT_LOGIC] = sanitizeText(domSection.querySelector('.hyperroute-section-placement-logic').value);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.NOTES] = sanitizeText(domSection.querySelector('.hyperroute-section-notes').value);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.INTERESTING] = sanitizeText(domSection.querySelector('.hyperroute-section-interesting').value);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.is_certified] = getValueFromCheckboxElementState(domSection.querySelector('.hyperroute-section-data-certified'), PREFORMATED_VALUES.YES_NO_EMPTY_ARRAY);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.GEOM] = sanitizeText(domSection.querySelector('.hyperroute-section-geom').value);
    hyperrouteSectionArray[HYPERROUTE_SECTION_COLUMN.GEOM_TYPE] = sanitizeText(domSection.querySelector('.hyperroute-section-geom-type').value);
    
    // Append to array
    allHyperrouteSectionArray.push(hyperrouteSectionArray);
  });
  return allHyperrouteSectionArray;
}

async function updateOrAddHyperrouteSectionData() {
  const hyperrouteSectionArray = convertHyperrouteSectionFormToArray();
  let hyperrouteSectionArrayToAddOrUpdate = {
    "update": [],
    "add": [],
  };
  const searchSheetRange = `!A:A`; // Id must be first column
  // Check if section exists
  const spreadSheetData = await getSpreadSheetData(SPREADSHEET_ID, SHEETS.HYPERROUTE_SECTIONS.NAME, searchSheetRange); // loading data
  hyperrouteSectionArray.forEach(section => {
    if(spreadSheetData.values.find(dataRow => dataRow[0] === section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.ID])){
      hyperrouteSectionArrayToAddOrUpdate.update.push(section);
      console.log(`Hyperroute sections to update : ${section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A]} - ${section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B]}`);
    } else {
      hyperrouteSectionArrayToAddOrUpdate.add.push(section);
      console.log(`Hyperroute sections to add : ${section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_A]} - ${section[SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.LOCATION_B]}`);
    }
  });
  const updateorAddSheetRange = `!${SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.LAST_COLUMN_REF()}`; // Id must be first column
  // Update
  let updateResult = true;
  if(hyperrouteSectionArrayToAddOrUpdate.update.length > 0) {
    updateResult = updateSpreadSheetBatchRowData(SPREADSHEET_ID, SHEETS.HYPERROUTE_SECTIONS, updateorAddSheetRange, SPREADSHEET_HEADERS.HYPERROUTE_SECTIONS.COLUMNS.ID, hyperrouteSectionArrayToAddOrUpdate.update);
  }
  // Add
  let addResult = true;
  if(hyperrouteSectionArrayToAddOrUpdate.add.length > 0) {
    addResult = addSpreadSheetBatchRowData(SPREADSHEET_ID, SHEETS.HYPERROUTE_SECTIONS, updateorAddSheetRange, hyperrouteSectionArrayToAddOrUpdate.add);
  }
  return [updateResult && addResult, {add: hyperrouteSectionArrayToAddOrUpdate.add.length, update: hyperrouteSectionArrayToAddOrUpdate.update.length}]; // both must be true
}