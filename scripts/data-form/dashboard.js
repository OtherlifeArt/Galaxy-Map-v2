const DOM_DASHBOARD_CONTAINER = document.getElementById("dashboard-container");
const DASHBOARD_DIVS = DOM_DASHBOARD_CONTAINER.getElementsByTagName('div');

/* PARAMETERS */
const OBJECT_TYPE_WITH_MANDATORY_COORD = [
  "Location", "Exotic", "Natural Object", "Artificial Object", 
  "Interstellar Matter", "Nebula", "Interstellar Cloud", 
  "Rogue Planet", "Rogue Moon", "Rogue Asteroid", "Rogue Comet", "Star System", 
  "Anomaly", "Void Space", "Rings", "Star Cluster", "Galaxy"
];

const OBJECT_MADATORY_DATA = [
  "id", "name", "sortId",
];

const OBJECT_DUPLICATED_DATA = [
  "id", "sortId", "name",
];

/**
 * Build a table showing object by type even if they are not in Object Types database
 */
function objectByTypeTable(parentDiv) {
  // Build table
  let table = document.createElement('table');
  table.classList.add("dashboard-table");
  // Table headers
  let tableHeader = table.createTHead();
  let tableHeaderRow = tableHeader.insertRow(0);
  let objectTypeCell = tableHeaderRow.insertCell(0);
  objectTypeCell.innerHTML = "<b>Object Type</b>";
  let numberOfObjectCell = tableHeaderRow.insertCell(1);
  numberOfObjectCell.innerHTML = "<b>Object Number</b>";
  // Add table body
  let tableBody = table.createTBody();
  // Build table content from object ids
  const objectArrayCountByType = countObjectByValue(astronomicalObjectSearchArray, "objectType");
  let totalIncorrectValues = 0;
  Object.entries(objectArrayCountByType).forEach(entry => {
    const [key, value] = entry;
    let row = tableBody.insertRow();
    let typeCell = row.insertCell();
    typeCell.innerHTML = key;
    let numberCell = row.insertCell();
    numberCell.innerHTML = value;
    // If type doesn't exists in Object Type DB we colorize background in red
    if(!astronomicalObjectTypes.some(type => type.id === key)) {
      // console.log(`Type ${key} not found in DB`);
      totalIncorrectValues += value;
      typeCell.classList.add("dashboard-incorrect-value");
      numberCell.classList.add("dashboard-incorrect-value");
    }
  });
  const objectArrayCountByTypeKeys = Object.keys(objectArrayCountByType);
  // Add Table lines for not used type and add them with 0 value
  astronomicalObjectTypes.forEach(objectType => {
    if(objectArrayCountByTypeKeys.find((key) => objectType.id === key) === undefined) {
      let row = tableBody.insertRow();
      let typeCell = row.insertCell();
      typeCell.innerHTML = objectType.id;
      let numberCell = row.insertCell();
      numberCell.innerHTML = "0";
    }
  });
  // generate widget
  const collapsibleButtonInnerHTML = `${totalIncorrectValues} incorrect object types`;
  const containerDivId = "dashboard-table-object-by-type";
  generateCollapsibleWidget(parentDiv, collapsibleButtonInnerHTML, table, containerDivId);
}

function objectByParentTable(parentDiv) {
  // Build table
  let table = document.createElement('table');
  table.classList.add("dashboard-table");
  // Table headers
  let tableHeader = table.createTHead();
  let tableHeaderRow = tableHeader.insertRow(0);
  let objectParentCell = tableHeaderRow.insertCell(0);
  objectParentCell.innerHTML = "<b>Parent Object</b>";
  let numberOfObjectCell = tableHeaderRow.insertCell(1);
  numberOfObjectCell.innerHTML = "<b>Children Number</b>";
  // Add table body
  let tableBody = table.createTBody();
  // Build table content from object ids
  const objectArrayCountByParent = countObjectByValue(astronomicalObjectSearchArray, "parentId");
  let totalEmptyValues = 0;
  Object.entries(objectArrayCountByParent).forEach(entry => {
    const [key, value] = entry;
    let row = tableBody.insertRow();
    let typeCell = row.insertCell();
    let numberCell = row.insertCell();
    numberCell.innerHTML = value;
    // If parent id is empty we colorize background in red
    if(key === "" || key === undefined || key === null) {
      typeCell.innerHTML = "No parent";
      // console.log(`Type ${key} not found in DB`);
      totalEmptyValues += value;
      typeCell.classList.add("dashboard-incorrect-value");
      numberCell.classList.add("dashboard-incorrect-value");
    } else {
      const object = astronomicalObjectSearchArray?.find(object => {
        return object.id === key
      });
      typeCell.innerHTML = object?.text === undefined ? key : object.text;
    }
  });
  // generate widget
  const collapsibleButtonInnerHTML = `${totalEmptyValues} objects without parent`;
  const containerDivId = "dashboard-table-object-parent";
  generateCollapsibleWidget(parentDiv, collapsibleButtonInnerHTML, table, containerDivId);
}

/**
 * List objects type with or without coordinates
 */
function objectCoordinateByType(parentDiv) {
  // Build table
  let table = document.createElement('table');
  table.classList.add("dashboard-table");
  let tableHeader = table.createTHead();
  let tableHeaderRow = tableHeader.insertRow(0);
  let objectParentCell = tableHeaderRow.insertCell(0);
  objectParentCell.innerHTML = "<b>Object Type</b>";
  let numberOfObjectCell = tableHeaderRow.insertCell(1);
  numberOfObjectCell.innerHTML = "<b>Object Number</b>";
  // Add table body
  let tableBody = table.createTBody();
  // Build table content from object type
  let objectAggregationByType = aggregateObjectsByValue(astronomicalObjectSearchArray, "objectType");
  let objectAggregationByTypeAndCoord = {};
  let totalEligibleObjectWithCoordinate = 0;
  let totalEligibleObjectWithoutCoordinate = 0;
  let totalIneligibleObjectWithCoordinate = 0;
  for (const [key, value] of Object.entries(objectAggregationByType)) {
    // console.log(`${key}: ${value}`);
    objectAggregationByTypeAndCoord[key] = countObjectArrayByEmptyArray(value, "coords");
    let row = tableBody.insertRow();
    let typeCell = row.insertCell();
    typeCell.innerHTML = key;
    let numberCell = row.insertCell();
    const objectWithCoordNumber = objectAggregationByTypeAndCoord[key].coords["Value"] === undefined ? 0 : objectAggregationByTypeAndCoord[key].coords["Value"];
    const objectWithoutCoordNumber = objectAggregationByTypeAndCoord[key].coords["No value"] === undefined ? 0 : objectAggregationByTypeAndCoord[key].coords["No value"];
    numberCell.innerHTML = `${objectWithCoordNumber} / ${objectWithoutCoordNumber + objectWithCoordNumber}`;
    // If type needs coordinate and we are missing them, we colorize cell background in red
    if(objectAggregationByTypeAndCoord[key].coords["No value"] > 0) {
      if(OBJECT_TYPE_WITH_MANDATORY_COORD.includes(key)) {
        typeCell.classList.add("dashboard-incorrect-value");
        numberCell.classList.add("dashboard-incorrect-value");
        totalEligibleObjectWithoutCoordinate += objectWithoutCoordNumber;
      }
    }
    if(objectAggregationByTypeAndCoord[key].coords["Value"] > 0) {
      if(OBJECT_TYPE_WITH_MANDATORY_COORD.includes(key)) {
        totalEligibleObjectWithCoordinate += objectWithCoordNumber;
      } else {
        totalIneligibleObjectWithCoordinate += objectWithCoordNumber;
        typeCell.classList.add("dashboard-warning-value");
        numberCell.classList.add("dashboard-warning-value");
      }
    }
  }
  // Table headers
  // generate widget
  const collapsibleButtonInnerHTML = `${totalEligibleObjectWithCoordinate} / ${totalEligibleObjectWithoutCoordinate + totalEligibleObjectWithCoordinate} eligible objects with coordinates (objects with possibly non-useful coordinates : ${totalIneligibleObjectWithCoordinate})`;
  const containerDivId = "dashboard-table-object-coordinates";
  generateCollapsibleWidget(parentDiv, collapsibleButtonInnerHTML, table, containerDivId);
}

function aggregateObjectsByValue(objectArray, key) {
  let aggregatedObjectArray = {};
  objectArray.forEach(value => {
    if(aggregatedObjectArray?.[value[key]] === undefined) {
      aggregatedObjectArray[value[key]] = [];
    }
    aggregatedObjectArray[value[key]].push(value);
  });
  return aggregatedObjectArray;
}

function countObjectByValue(objectArray, key) {
  let objectArrayCountByKey = {};
  objectArray.forEach(value => {
    if(objectArrayCountByKey?.[value[key]] === undefined) {
      objectArrayCountByKey[value[key]] = 1;
    } else {
      objectArrayCountByKey[value[key]] += 1;
    }
  });
  return objectArrayCountByKey;
}

function countObjectArrayByEmptyArray(objectArray, arrayKey) {
  let objectCountByKey = {};
  if(objectCountByKey[arrayKey] === undefined) {
    objectCountByKey[arrayKey] = {
      "No value": 0,
      "Value": 0,
    }
  }
  objectArray.forEach(object => {
    object[arrayKey].length === 0 ? objectCountByKey[arrayKey]["No value"] += 1 : objectCountByKey[arrayKey]["Value"] += 1;
  });
  return objectCountByKey;
}

/**
 * Build table with objects referencing them as their own parent
 * 
 * @param {*} parentDiv 
 */
function displayObjectHavingThemselvesAsParent(parentDiv) {
  // Build table
  let table = document.createElement('table');
  table.classList.add("dashboard-table");
  // Table headers
  let tableHeader = table.createTHead();
  let tableHeaderRow = tableHeader.insertRow(0);
  let objectIdCell = tableHeaderRow.insertCell(0);
  objectIdCell.innerHTML = "<b>ID</b>";
  let objectHumanIdCell = tableHeaderRow.insertCell(1);
  objectHumanIdCell.innerHTML = "<b>Object Sort ID</b>";
  let objectHumanNameCell = tableHeaderRow.insertCell(2);
  objectHumanNameCell.innerHTML = "<b>Object Readable Name</b>";
  // Add table body
  let tableBody = table.createTBody();
  // Build table content from object ids
  const foundObjects = astronomicalObjectSearchArray.filter((object) => object.id === object.parentId);
  for (const object of foundObjects) {
    let row = tableBody.insertRow();
    let objectIdCell = row.insertCell();
    objectIdCell.innerHTML = object.id;
    let objectHumanIdCell = row.insertCell();
    objectHumanIdCell.innerHTML = object.sortId;
    let objectReadableNameCell = row.insertCell();
    objectReadableNameCell.innerHTML = object.humanName; 
  }
  // generate widget
  const collapsibleButtonInnerHTML = `${foundObjects.length} objects referencing themselves as parent`;
  const containerDivId = "dashboard-table-object-as-parent";
  generateCollapsibleWidget(parentDiv, collapsibleButtonInnerHTML, table, containerDivId);
}

/**
 * Build a table showing mandatory data misssing by object
 */
function objectWithMissingMandatoryDataTable(parentDiv) {
  // Build table
  let table = document.createElement('table');
  table.classList.add("dashboard-table");
  // Table headers
  let tableHeader = table.createTHead();
  let tableHeaderRow = tableHeader.insertRow(0);
  let objectNameCell = tableHeaderRow.insertCell(0);
  objectNameCell.innerHTML = "<b>Name</b>";
  let technicalIdCell = tableHeaderRow.insertCell(1);
  technicalIdCell.innerHTML = "<b>Technical ID</b>";
  let sortingIdCell = tableHeaderRow.insertCell(2);
  sortingIdCell.innerHTML = "<b>Sorting/Human ID</b>";
  // Add table body
  let tableBody = table.createTBody();
  // Build table content from object ids
  const foundObjects = astronomicalObjectSearchArray.filter((object) => {
    for (let index = 0; index < OBJECT_MADATORY_DATA.length; index++) {
      const mandatoryElement = OBJECT_MADATORY_DATA[index];
      if(object && object[mandatoryElement] === "") return object;
    }
  });
  for (const object of foundObjects) {
    let row = tableBody.insertRow();
    let objectNameCell = row.insertCell();
    objectNameCell.innerHTML = object.name;
    let objectIdCell = row.insertCell();
    objectIdCell.innerHTML = object.id;
    let objectHumanIdCell = row.insertCell();
    objectHumanIdCell.innerHTML = object.sortId;
  }
  // generate widget
  const collapsibleButtonInnerHTML = `${foundObjects.length} object with missing mandatory value(s)`;
  const containerDivId = "dashboard-table-object-with-mandatory-values";
  generateCollapsibleWidget(parentDiv, collapsibleButtonInnerHTML, table, containerDivId);
}

/**
 * Build a table showing forbidden duplicated data by object
 */
function objectWithDuplicatedDataTable(parentDiv) {
  let duplicatedValuesFound = 0;
  // Build table
  let table = document.createElement('table');
  table.classList.add("dashboard-table");
  // Table headers
  let tableHeader = table.createTHead();
  let tableHeaderRow = tableHeader.insertRow(0);
  let objectNameCell1 = tableHeaderRow.insertCell(0);
  objectNameCell1.innerHTML = "<b>Obj1 Name</b>";
  let objectTypeCell1 = tableHeaderRow.insertCell(1);
  objectTypeCell1.innerHTML = "<b>Obj1 Type</b>";
  let technicalIdCell1 = tableHeaderRow.insertCell(2);
  technicalIdCell1.innerHTML = "<b>Obj1 Technical ID</b>";
  let sortingIdCell1 = tableHeaderRow.insertCell(3);
  sortingIdCell1.innerHTML = "<b>Obj1 Sorting/Human ID</b>";
  let objectNameCell2 = tableHeaderRow.insertCell(4);
  objectNameCell2.innerHTML = "<b>Obj2 Name</b>";
  let objectTypeCell2 = tableHeaderRow.insertCell(5);
  objectTypeCell2.innerHTML = "<b>Obj1 Type</b>";
  let technicalIdCell2 = tableHeaderRow.insertCell(6);
  technicalIdCell2.innerHTML = "<b>Obj2 Technical ID</b>";
  let sortingIdCell2 = tableHeaderRow.insertCell(7);
  sortingIdCell2.innerHTML = "<b>Obj2 Sorting/Human ID</b>";
  // Add table body
  let tableBody = table.createTBody();
  // Build table content from object ids
  for (let index = 0; index < astronomicalObjectSearchArray.length; index++) {
    const astroObject = astronomicalObjectSearchArray[index];
    // Optimized by starting iteration with next index2 = index +1 (avoid reiterating previous objects and speed processing)
    for (let index2 = index+1; index2 < astronomicalObjectSearchArray.length; index2++) {
      const astroObjectToCompare = astronomicalObjectSearchArray[index2];
      const duplicatedElements = [];
      for (let elementIndex = 0; elementIndex < OBJECT_DUPLICATED_DATA.length; elementIndex++) {
        const element = OBJECT_DUPLICATED_DATA[elementIndex];
        // Don't compare same object
        if(astroObjectToCompare === astroObject) continue;
        // Search for duplicated elements
        if(astroObject[element] === astroObjectToCompare[element]) {
          duplicatedValuesFound++;
          duplicatedElements.push(element);
        }
      }
      // Build table with duplicated elements
      if(duplicatedElements.length > 0) {
        let row = tableBody.insertRow();
        // Object 1
        // Name
        let objectNameCell1 = row.insertCell();
        objectNameCell1.innerHTML = astroObject.name;
        if(duplicatedElements.includes('name')) {
          objectNameCell1.classList.add("dashboard-warning-value");
        }
        // Type
        let objectTypeCell1 = row.insertCell();
        objectTypeCell1.innerHTML = astroObject.objectType;
        // Tech ID
        let objectIdCell1 = row.insertCell();
        objectIdCell1.innerHTML = astroObject.id;
        if(duplicatedElements.includes('id')) {
          objectIdCell1.classList.add("dashboard-incorrect-value");
        }
        // Sort Id
        let objectHumanIdCell1 = row.insertCell();
        objectHumanIdCell1.innerHTML = astroObject.sortId;
        if(duplicatedElements.includes('sortId')) {
          objectHumanIdCell1.classList.add("dashboard-incorrect-value");
        }
        // Object 2
        // Name
        let objectNameCell2 = row.insertCell();
        objectNameCell2.innerHTML = astroObjectToCompare.name;
        if(duplicatedElements.includes('name')) {
          objectNameCell2.classList.add("dashboard-warning-value");
        }
        // Type
        let objectTypeCell2 = row.insertCell();
        objectTypeCell2.innerHTML = astroObjectToCompare.objectType;
        // Tech ID
        let objectIdCell2 = row.insertCell();
        objectIdCell2.innerHTML = astroObjectToCompare.id;
        if(duplicatedElements.includes('id')) {
          objectIdCell2.classList.add("dashboard-incorrect-value");
        }
        // Sort Id
        let objectHumanIdCell2 = row.insertCell();
        objectHumanIdCell2.innerHTML = astroObjectToCompare.sortId;
        if(duplicatedElements.includes('sortId')) {
          objectHumanIdCell2.classList.add("dashboard-incorrect-value");
        }
      }
    }
  };
  // generate widget
  const collapsibleButtonInnerHTML = `${duplicatedValuesFound} duplicated mandatory value(s) (in red), and possible duplicated values (in yellow/gold)`;
  const containerDivId = "dashboard-table-object-with-duplicated-values";
  generateCollapsibleWidget(parentDiv, collapsibleButtonInnerHTML, table, containerDivId);
}

/* Init dashboard functions */
function initDashboard() {
  // Empty dashboard content
  DASHBOARD_DIVS[0].innerHTML = "";
  DASHBOARD_DIVS[1].innerHTML = "";
  // Recreate dashboard pannels
  objectByTypeTable(DASHBOARD_DIVS[0]);
  objectByParentTable(DASHBOARD_DIVS[0]);
  objectCoordinateByType(DASHBOARD_DIVS[0]);
  displayObjectHavingThemselvesAsParent(DASHBOARD_DIVS[0]);
  objectWithMissingMandatoryDataTable(DASHBOARD_DIVS[0]);
  objectWithDuplicatedDataTable(DASHBOARD_DIVS[0]);
}

/**********/
/* EVENTS */
/**********/
document.getElementById('refresh-dashboard-button').addEventListener('click', async function (e) {
  document.getElementById("refresh-dashboard-button").disabled = true;
  await refreshForm();
  initDashboard();
  initWidgets();
  document.getElementById("refresh-dashboard-button").disabled = false;
});