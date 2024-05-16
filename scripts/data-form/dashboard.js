const DOM_DASHBOARD_CONTAINER = document.getElementById("dashboard-container");
const DASHBOARD_DIVS = DOM_DASHBOARD_CONTAINER.getElementsByTagName('div');

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

/* Init dashboard functions */
function initDashboard() {
  objectByTypeTable(DASHBOARD_DIVS[0]);
  objectByParentTable(DASHBOARD_DIVS[0]);
}

/**********/
/* EVENTS */
/**********/
document.getElementById('refresh-dashboard').addEventListener('click', async function (e) {
  await refreshForm();
  initDashboard();
  initWidgets();
});