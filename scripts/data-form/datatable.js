const OBJECT_DATATABLE_PARAMS = {
  footerSearchType: [
    null, // action
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

function refreshObjectDatatable(datatable) {
  datatable.clear();
  datatable.rows.add(astronomicalObjectSearchArray);
  datatable.draw();
}

function loadObjectDatatable() {
  objectDatatable = new DataTable('#astro-object-datatable', {
    data: astronomicalObjectSearchArray,
    columns: [
      { data: null,
        render: function (data, type, row) {
            return `
                <button class="view-btn" onclick="datatableGoToMap('${data.id}')">Go To (WIP)</button>
                <button class="edit-btn" onclick="datatableEditOnForm('${data.id}', 'objectDatatable')">Edit</button>
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
      { data: 'canonLegendsString' },
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
  }
}
