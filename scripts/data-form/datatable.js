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

async function refreshDatatable(datatableLabel, reloadData = false) {
  let datatable;
  let data;
  let refreshButtonId;
  if(datatableLabel === "objectDatatable") {
    refreshButtonId = "refresh-astro-object-datatable-button";
    document.getElementById(refreshButtonId).disabled = true;
    datatable = objectDatatable;
    if(reloadData) {
      await refreshForm();
    }
    data = astronomicalObjectSearchArray;
  } else if (datatableLabel === "hyperrouteDatatable") {
    refreshButtonId = "refresh-hyperroute-datatable-button";
    document.getElementById(refreshButtonId).disabled = true;
    if(reloadData) {
      await refreshHyperrouteForm();
    }
    datatable = hyperrouteDatatable;
    data = hyperrouteArray;
  }
  datatable.clear();
  datatable.rows.add(data);
  datatable.draw();
  document.getElementById(refreshButtonId).disabled = false;
}

function initDatatableEvents(datatableLabel) {
  let table;
  if(datatableLabel === "objectDatatable") {
    table = objectDatatable;
  } else if (datatableLabel === "hyperrouteDatatable") {
    table = hyperrouteDatatable;
  }
  table.on('click', 'td.dt-control', async function (e) {
    let tr = e.target.closest('tr');
    let row = table.row(tr);
 
    if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
    }
    else {
        // Open this row
        await row.child(datatableChildContent(row.data(), datatableLabel)).show();
    }
  });
}

function datatableChildContent(rowData, datatableLabel) {
  let urls = "<span>";
  if(rowData.urls !== "") {
    rowData.urls.forEach((url) => {
      try {
        url = new URL(url);
      } catch (_) {
        return;
      }
      urls += "<a href="+url+">"+new URL(url).hostname+"</a> ";
    });
  }
  if(rowData.wikidataId !== "") {
    urls += "<a href="+WIKIDATA_PAGE_PREFIX+rowData.wikidataId+">Wikidata</a>";
  }
  urls += "</span>";
  if(datatableLabel === "objectDatatable") {
    return (
      "<div class='datatable-child-row-wrapper'>"+
        "<div class='datatable-child-row-element-data'>"+
          "<div><b><i>Alt Names: </i></b>"+rowData.altNames+"</div>"+
          "<div><b><i>Capital at current level: </i></b>"+rowData.isCapital+"</div>"+
          "<div><b><i>In movie: </i></b>"+rowData.inMovie+"</div>"+
          "<div><b><i>Size: </i></b>"+(rowData.size === "" ? "" : rowData.size + " km" )+"</div>"+
          "<div><b><i>Length of Day: </i></b>"+(rowData.lengthOfDay === "" ? "" : rowData.size + " hours" )+"</div>"+
          "<div><b><i>Length of Year: </i></b>"+(rowData.lengthOfYear === "" ? "" : rowData.size + " days" )+"</div>"+
          "<div><b><i>Orbital Position: </i></b>"+rowData.orbitalRank+"</div>"+
          "<div><b><i>Appearance: </i></b>"+rowData.appearance+"</div>"+
          "<div><b><i>Gravity: </i></b>"+rowData.gravity+"</div>"+
          "<div><b><i>Population: </i></b>"+rowData.population+"</div>"+
          "<div><b><i>Native Species: </i></b>"+rowData.nativeSpecies+"</div>"+
          "<div><b><i>Immigrant Species: </i></b>"+rowData.immigrantSpecies+"</div>"+
          "<div><b><i>Known Environments: </i></b>"+rowData.knownEnvironments+"</div>"+
          "<div><b><i>Known Climates: </i></b>"+rowData.knownClimates+"</div>"+
          "<div><b><i>Known Atmosphere: </i></b>"+rowData.knownAtmosphere+"</div>"+
          "<div><b><i>Known Surface Water: </i></b>"+rowData.knownSurfaceWater+"</div>"+
          "<div><b><i>Government: </i></b>"+rowData.government+"</div>"+
          "<div><b><i>Capital: </i></b>"+rowData.capital+"</div>"+
          "<div><b><i>Starports: </i></b>"+rowData.starports+"</div>"+
          "<div><b><i>Tech level: </i></b>"+rowData.techLevel+"</div>"+
          "<div><b><i>Known Resources: </i></b>"+rowData.knownResources+"</div>"+  
          "<div><b><i>Known Exports: </i></b>"+rowData.knownExports+"</div>"+
          "<div><b><i>Known Imports: </i></b>"+rowData.knownImports+"</div>"+
          "<div><b><i>Points of Interests: </i></b>"+rowData.pointsOfInterest+"</div>"+
        "</div>"+
        "<div class='datatable-child-row-tech-data'>"+
          "<div><b><i>Placement certitude: </i></b>"+rowData.placementCertitude+"</div>"+
          "<div><b><i>Placement logic: </i></b>"+rowData.placementLogic+"</div>"+
          "<div><b><i>Is Certified : </i></b>"+rowData.isCertified+"</div>"+
          "<div><b><i>ID: </i></b>"+rowData.id+"</div>"+
          "<div><b><i>Last updated: </i></b>"+rowData.lastUpdated+"</div>"+
          "<div><b><i>Sorting ID: </i></b>"+rowData.sortId+"</div>"+
          "<div><b><i>Map Zoom Level: </i></b>"+rowData.zoomLevel+"</div>"+
          "<div><b><i>Parent ID: </i></b>"+rowData.parentId+"</div>"+
        "</div>"+
        "<div class='object-datatable-child-row-3'><b><i>URLS: </i></b>"+urls+"</div>"+
        "<div class='object-datatable-child-row-4'><b><i>Desc: </i></b>"+rowData.desc+"</div>"+
        "<div class='object-datatable-child-row-5'><b><i>Interesting: </i></b>"+rowData.interesting+"</div>"+
        "<div class='object-datatable-child-row-6'><b><i>Notes: </i></b>"+rowData.notes+"</div>"+
      "</div>"
    );
  } else if (datatableLabel === "hyperrouteDatatable") {
    let formatedSections = "";
    rowData.sections.forEach((section) => {
      formatedSections += "<div>"+section.text+"</div>";
    });
    return (
      "<div class='datatable-child-row-wrapper'>"+
        "<div class='datatable-child-row-element-data'>"+
          "<div><b><i>Alt Names: </i></b>"+rowData.altNames+"</div>"+
        "</div>"+
        "<div class='datatable-child-row-tech-data'>"+
          "<div><b><i>ID: </i></b>"+rowData.id+"</div>"+
          "<div><b><i>Last updated: </i></b>"+rowData.lastUpdated+"</div>"+
          "<div><b><i>Sorting ID: </i></b>"+rowData.sortId+"</div>"+
          "<div><b><i>Parent ID: </i></b>"+rowData.parentId+"</div>"+
          "<div><b><i>Map Zoom Level: </i></b>"+rowData.zoomLevel+"</div>"+
          "<div><b><i>Is Certified : </i></b>"+rowData.isCertified+"</div>"+
        "</div>"+
        "<div class='datatable-child-row-3'><b><i>URLS: </i></b>"+urls+"</div>"+
        "<div class='datatable-child-row-4'><b><i>Desc: </i></b>"+rowData.desc+"</div>"+
        "<div class='datatable-child-row-5'><b><i>Interesting: </i></b>"+rowData.interesting+"</div>"+
        "<div class='datatable-child-row-6'><b><i>Notes: </i></b>"+rowData.notes+"</div>"+
        "<div class='datatable-child-row-hyperspace-sections'><i><b>Sections: </b>"+rowData.sections.length+"</i><div>"+formatedSections+"</div></div>"+
      "</div>"
    );
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
                <button class="view-btn" onclick="datatableGoToMap('${data.id}', 'astronomicalObject')">Show on Map</button>
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
                <button class="view-btn" onclick="datatableGoToMap('${data.id}', 'hyperroute')">Show on Map</button>
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

function datatableGoToMap(itemId, itemType) {
  let element;
  if(itemType === "astronomicalObject") {
    element = astronomicalObjectSearchArray.find(object => object.id === itemId);
  } else if (itemType === "hyperroute") {
    element = hyperrouteArray.find(object => object.id === itemId);
  }
  // TODO search item by id
  performSearch(element.name);
}
