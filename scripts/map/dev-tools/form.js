/** CONSTANTS **/

// PLACEHOLDERS
const objectList = [
  {name: "Coruscant"},
  {name: "Tatooine"}
];

// PARAMETERS
const namePlaceholder = "Coruscant/Notron";
const continuities = [
  "Canon",
  "Legends",
  "Canon/Legends",
];
const ancestorPlaceholder = "Coruscant system/Corusca system";
const types = [
  "Planet",
  "Star System",
  "Nebula",
  "Galaxy",
  "Area",
  "Location",
];
const typeClasses = {
  "Planet": ["Terrestrial", "Gazeous"],
  "Star System": [""],
  "Nebula": [""],
  "Galaxy": [""],
  "Area": ["Sector", "Region", "Universe"],
  "Location": ["Named Location"],
};
const placementCertitude = [
  "Exact",
  "Grid/Square",
  "Region",
  "Vague",
];
const sources = [
  "The Essential Atlas",
  "Galactic Atlas",
];

// SEARCH
const searchInput = document.getElementById("search");
// ACTION

// FORM
const nameInput = document.getElementById("name");
const continuitySelect = document.getElementById("continuity");
const ancestorNameInput = document.getElementById("ancestor-name");
const typeSelect = document.getElementById("type");
const typeClassSelect = document.getElementById("type-class");
const xCoordInput = document.getElementById("x-coord");
const yCoordInput = document.getElementById("y-coord");
const zCoordInput = document.getElementById("z-coord");
const dateFromInput = document.getElementById("date-from");
const dateToInput = document.getElementById("date-to");
const placementCertitudeSelect = document.getElementById("placement-certitude");
const sourceSelect = document.getElementById("sources");

/** VARIABLES **/

/** FUNCTIONS **/

/**
 * Init option values for select
 * @param {*} select 
 * @param {*} options
 */
function initSelectOptions(select, options) {
  // Erase all
  select.innerHTML = "";
  // Loop through the options array and create <option> elements
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.text = options[i];
    option.value = options[i]; // Set the option's value (optional)
  
    // Append the option to the select element
    select.appendChild(option);
  }
}

/**
 * Init placeholders
 * @param {*} input 
 * @param {*} placeholder 
 */
function setPlaceHolder(input, placeholder) {
  input.placeholder = placeholder;
}

/**
 * Select2 for object search
 */
$(document).ready(function() {
  $('#search').select2({
    data: function() {
      return objectList.map((item) => { return {"id": item.name, "text": item.name} })
    }
  });
});

/** INIT **/
setPlaceHolder(nameInput, namePlaceholder);
setPlaceHolder(ancestorNameInput, ancestorPlaceholder);
initSelectOptions(continuitySelect, continuities);
initSelectOptions(typeSelect, types);
initSelectOptions(typeClassSelect, typeClasses.Planet);
initSelectOptions(placementCertitudeSelect, placementCertitude);
initSelectOptions(sourceSelect, sources);


/** EVENTS **/

/**
 * Load type class list function of selected class
 */
typeSelect.addEventListener('change', function(e){
  //console.log(typeSelect.value);
  initSelectOptions(typeClassSelect, typeClasses[typeSelect.value]);
});