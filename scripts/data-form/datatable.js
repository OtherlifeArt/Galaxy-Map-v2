const OBJECT_DATATABLE_PARAMS = {
  footerSearchType: [
    null, // action
    null, // dt control (child)
    "text", // name
    "text", // Type and subtypes
    "text", // humanParent
    "text", // Date
    "text", // Continuity
    "text", // Grid
    "text", // Coords
    "select", // Conj Name
    "select", // Conjtype
  ]
}

const HYPERROUTE_DATATABLE_PARAMS = {
  footerSearchType: [
    null, // action
    null, // dt control (child)
    "text", // name
    "text", // humanParent
    "text", // Date
    "text", // Continuity
    "text", // Level
    "select", // Conj Name
  ]
}

function refreshDatatable(datatableLabel) {
  let datatable;
  let data;
  if(datatableLabel === "objectDatatable") {
    datatable = objectDatatable;
    data = astronomicalObjectSearchArray;
  } else if (datatableLabel === "hyperrouteDatatable") {
    datatable = hyperrouteDatatable;
    data = hyperrouteArray;
  }
  datatable.clear();
  datatable.rows.add(data);
  datatable.draw();
}

function initDatatableEvents(datatableLabel) {
  let table;
  if(datatableLabel === "objectDatatable") {
    table = objectDatatable;
  } else if (datatableLabel === "hyperrouteDatatable") {
    table = hyperrouteDatatable;
  }
  table.on('click', 'td.dt-control', function (e) {
    let tr = e.target.closest('tr');
    let row = table.row(tr);
 
    if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
    }
    else {
        // Open this row
        row.child(datatableChildContent(row.data(), datatableLabel)).show();
    }
  });
}

function datatableChildContent(rowData, datatableLabel) {
  if(datatableLabel === "objectDatatable") {
    return (
      "<div>"+
        "<div>Al Names: "+rowData.altNames+"</div>"+
        "<div>Orbital Position: "+rowData.orbitalRank+"</div>"+
        "<div>In movie: "+rowData.inMovie+"</div>"+
        "<div>Capital at current level: "+rowData.isCapital+"</div>"+
        "<div>Native Species: "+rowData.nativeSpecies+"</div>"+
        "<div>Known Environments: "+rowData.knownEnvironments+"</div>"+
        // Radius
        // Appearance
        // Pop
        // Gravity
        // Governement
        // Tech level
        // CLimates
        // Atmosphere
        // Water
        // Ressources ...
        // Export
        // Import
        // POINTS_OF_INTEREST	LENGTH_OF_DAY	LENGTH_OF_YEAR	CAPITAL	STARPORTS	IMMIGRANT_SPECIES
        "</div>"+
        "<div>"+
        "<div>Last updated: "+rowData.lastUpdated+"</div>"+
        "<div>Placement certitude: "+rowData.placementCertitude+"</div>"+
        "<div>Placement logic: "+rowData.placementLogic+"</div>"+
        "<div>Sort ID: "+rowData.sortId+"</div>"+
        "<div>Map Zoom Level: "+rowData.zoomLevel+"</div>"+
        "<div>ID: "+rowData.id+"</div>"+
        "<div>Parent ID: "+rowData.parentId+"</div>"+
        "</div>"+
        "<div>Desc: "+rowData.Desc+"</div>"+
        "<div>Interesting: "+rowData.interesting+"</div>"+
        "<div>Notes: "+rowData.notes+"</div>"+
        "<div>Interesting: "+rowData.Desc+"</div>"
        // URLS ...
        // WIKIDATA URL
    );
  } else if (datatableLabel === "hyperrouteDatatable") {
    
  }
}

function loadObjectDatatable() {
  objectDatatable = new DataTable('#astro-object-datatable', {
    data: astronomicalObjectSearchArray,
    columns: [
      {
        className: 'dt-control',
        orderable: false,
        data: null,
        defaultContent: ''
      },
      { data: null,
        render: function (data, type, row) {
            return `
                <button class="edit-btn" onclick="datatableEditOnForm('${data.id}', 'objectDatatable')">Edit</button>
                <button class="view-btn" onclick="datatableGoToMap('${data.id}')">Show on Map (WIP)</button>
            `;
        }
      },
      { data: 'name' },
      // { data: 'humanName'},
      { data: (data) => {
        if(data.objectTypeClass !== undefined && data.objectTypeClass !== "") {
          return sanitizeText(data.objectType)+" / "+data.objectTypeClass;
        } else {
          return sanitizeText(data.objectType);
        }
      }},
      { data: 'humanParent' },
      { data: (data) => {
        data.dates.join(" to ")
        let dateString = "";
        if(data.dates[0] !== undefined && data.dates[0] !== "") {
          dateString = "From " + data.dates[0]
        }
        if(data.dates[1] !== undefined && data.dates[1] !== "") {
          dateString += " Until " + data.dates[1]
        }
        return dateString;
      }},
      { data: 'continuityString' },
      { data: (data) => data.grid.join("-")},
      { data: (data) => data.coords.join("; ")},
      { data: 'conjName' },
      { data: 'conjType' },
    ],
    // Footer search
    initComplete: function () {
      this.api().columns().every(function () {
        let column = this;
        let title = column.footer().textContent;
        // Select for certain column
        if(OBJECT_DATATABLE_PARAMS.footerSearchType[column[0][0]] === "text") {
          // Input type text by default
          // Create input element
          let input = document.createElement('input');
          input.placeholder = title;
          column.footer().replaceChildren(input);
  
          // Event listener for user input
          input.addEventListener('keyup', () => {
              if (column.search() !== this.value) {
                  column.search(input.value).draw();
              }
          });
        } else if (OBJECT_DATATABLE_PARAMS.footerSearchType[column[0][0]] === "select") {
            // Create select element
            let select = document.createElement('select');
            select.add(new Option(''));
            column.footer().replaceChildren(select);

            // Apply listener for user change in value
            select.addEventListener('change', function () {
                column
                    .search(select.value, {exact: true})
                    .draw();
            });

            // Add list of options
            column
               .data()
               .unique()
               .sort()
               .each(function (d, j) {
                   select.add(new Option(d));
            });
        }
      });
    },
  });
  initDatatableEvents("objectDatatable");
}



function loadHyperrouteDatatable() {
  hyperrouteDatatable = new DataTable('#hyperroute-datatable', {
    data: hyperrouteArray,
    columns: [
      {
        className: 'dt-control',
        orderable: false,
        data: null,
        defaultContent: ''
      },
      { data: null,
        render: function (data, type, row) {
            return `
                <button class="edit-btn" onclick="datatableEditOnForm('${data.id}', 'hyperrouteDatatable')">Edit</button>
                <button class="view-btn" onclick="datatableGoToMap('${data.id}')">Show on Map (WIP)</button>
            `;
        }
      },
      { data: 'name' },
      // { data: 'humanName'},
      { data: 'parentName' },
      { data: (data) => {
        data.dates.join(" to ")
        let dateString = "";
        if(data.dates[0] !== undefined && data.dates[0] !== "") {
          dateString = "From " + data.dates[0]
        }
        if(data.dates[1] !== undefined && data.dates[1] !== "") {
          dateString += " Until " + data.dates[1]
        }
        return dateString;
      }},
      { data: 'continuityString' },
      { data: 'level' },
      { data: 'conjName' },
    ],
    // Footer search
    initComplete: function () {
      this.api().columns().every(function () {
        let column = this;
        let title = column.footer().textContent;
        // Select for certain column
        if(HYPERROUTE_DATATABLE_PARAMS.footerSearchType[column[0][0]] === "text") {
          // Input type text by default
          // Create input element
          let input = document.createElement('input');
          input.placeholder = title;
          column.footer().replaceChildren(input);
  
          // Event listener for user input
          input.addEventListener('keyup', () => {
              if (column.search() !== this.value) {
                  column.search(input.value).draw();
              }
          });
        } else if (HYPERROUTE_DATATABLE_PARAMS.footerSearchType[column[0][0]] === "select") {
            // Create select element
            let select = document.createElement('select');
            select.add(new Option(''));
            column.footer().replaceChildren(select);

            // Apply listener for user change in value
            select.addEventListener('change', function () {
                column
                    .search(select.value, {exact: true})
                    .draw();
            });

            // Add list of options
            column
               .data()
               .unique()
               .sort()
               .each(function (d, j) {
                   select.add(new Option(d));
            });
        }
      });
    },
  });
  initDatatableEvents("hyperrouteDatatable");
}

function datatableEditOnForm(itemId, datatableName) {
  // console.log(datatableName);
  if(datatableName === "objectDatatable") {
    // console.log("Object ID", itemId);
    // Load object in form
    $(document).ready(function() {
      $('#object-search').select2().val(sanitizeText(itemId));
      $('#object-search').select2().trigger('change');
    });
    // Go to form tab
    openSection(null, 'astro-object-tab');
    // Set active tab
    document.getElementById("default-tab").classList.add("active");
  } else if ("hyperrouteDatatable") {
    // Load hyperroute in form
    $(document).ready(function() {
      $('#hyperroute-search').select2().val(sanitizeText(itemId));
      $('#hyperroute-search').select2().trigger('change');
    });
    // Go to form tab
    openSection(null, 'hyper-route-tab');
    // Set active tab
    document.getElementById("hyperroute-tab").classList.add("active");
  }
}
