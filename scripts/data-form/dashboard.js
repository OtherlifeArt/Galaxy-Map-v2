const DOM_DASHBOARD_CONTAINER = document.getElementById("dashboard-container");
const DASHBOARD_DIVS = DOM_DASHBOARD_CONTAINER.getElementsByTagName('div');

/* PARAMETERS */
const OBJECT_TYPE_WITH_MANDATORY_COORD = [
  "Location", "Exotic", "Natural Object", "Artificial Object", 
  "Interstellar Matter", "Nebula", "Interstellar Cloud", 
  "Rogue Planet", "Rogue Moon", "Rogue Asteroid", "Rogue Comet", "Star System", 
  "Anomaly", "Void Space", "Rings", "Star Cluster", "Galaxy"
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

/* Init dashboard functions */
function initDashboard() {
  // Empty dashboard content
  DASHBOARD_DIVS[0].innerHTML = "";
  DASHBOARD_DIVS[1].innerHTML = "";
  // Recreate dashboard pannels
  objectByTypeTable(DASHBOARD_DIVS[0]);
  objectByParentTable(DASHBOARD_DIVS[0]);
  objectCoordinateByType(DASHBOARD_DIVS[0]);
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