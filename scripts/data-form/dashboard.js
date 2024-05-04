const DOM_DASHBOARD_CONTAINER = document.getElementById("dashboard-container");
const DASHBOARD_DIVS = DOM_DASHBOARD_CONTAINER.getElementsByTagName('div');

/**
 * Build a table showing object by type even if they are not in Object Types database
 */
function objectByTypeTable(parentDiv) {
  // Build table
  let table = document.createElement('table');
  table.classList.add("dashboard-table");
  table.id = "dashboard-table-object-by-type";
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
      typeCell.classList.add("dashboard-incorrect-value");
      numberCell.classList.add("dashboard-incorrect-value");
    }
  });
  // Append table to div
  document.getElementById("dashboard-table-object-by-type")?.remove();
  parentDiv.appendChild(table);
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

/* Init dashboard functions */
function initDashboard() {
  objectByTypeTable(DASHBOARD_DIVS[0]);
}

/**********/
/* EVENTS */
/**********/
document.getElementById('refresh-dashboard').addEventListener('click', e => {
  refreshFormSelect2()
    .then(initDashboard());
});