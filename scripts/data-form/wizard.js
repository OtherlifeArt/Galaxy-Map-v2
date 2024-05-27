const DOM_WIZARD_CONTAINER = document.getElementById('wizard-container');

function initWizard() {
  document.getElementById('refresh-wizard-button').disabled = true;
  // Empty dashboard content
  DOM_WIZARD_CONTAINER.innerHTML = '';
  // Recreate wizard pannels
  createObjectParentWizard(DOM_WIZARD_CONTAINER);
  createInnerObjectSystemBuilderWizard(DOM_WIZARD_CONTAINER);
  document.getElementById('object-parent-wizard-previous-button').disabled = true;
  document.getElementById('object-parent-wizard-save-stage-button').disabled = true;
  updateCollapsible();
  document.getElementById('refresh-wizard-button').disabled = false;
}

/** Object Parent Finder **/

function createObjectParentWizard(parentDiv) {
  createObjectParentWizardStorageData();
  createObjectParentWizardStructure(parentDiv);
  objectParentWizardLoadObject();
}

function createObjectParentWizardStructure(parentDiv) {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'object-parent-wizard-content';
  const firstColumnDiv = document.createElement('div');
  const secondColumnDiv = document.createElement('div');
  // buttons
  const buttonSpan = document.createElement('span');
  firstColumnDiv.appendChild(buttonSpan);
  const previousObjectButton = document.createElement('button');
  previousObjectButton.innerHTML = 'Previous';
  previousObjectButton.id = 'object-parent-wizard-previous-button';
  previousObjectButton.addEventListener('click', function(){
    objectParentWizardLoadPreviousObject();
  });
  buttonSpan.appendChild(previousObjectButton);
  const stageSaveButton = document.createElement('button');
  stageSaveButton.innerHTML = 'Save Filled Objects';
  stageSaveButton.id = 'object-parent-wizard-save-stage-button';
  stageSaveButton.addEventListener('click', function(){
    objectParentWizardSaveFilledObjects();
  });
  buttonSpan.appendChild(stageSaveButton);
  const nextObjectButton = document.createElement('button');
  nextObjectButton.innerHTML = 'Next';
  nextObjectButton.id = 'object-parent-wizard-next-button';
  nextObjectButton.addEventListener('click', function(){
    objectParentWizardLoadNextObject();
  });
  buttonSpan.appendChild(nextObjectButton);
  // object data fieldset
  const objectFieldset = document.createElement('fieldset');
  const objectFieldsetLegend = document.createElement('legend');
  objectFieldsetLegend.textContent = 'Object Identification';
  objectFieldset.appendChild(objectFieldsetLegend);
  firstColumnDiv.appendChild(objectFieldset);
  const objectDataTextDiv = document.createElement('div');
  const objectDataText = document.createElement('span');
  objectDataText.id = 'object-parent-wizard-current-object-text';
  objectDataTextDiv.appendChild(objectDataText);
  objectFieldset.appendChild(objectDataTextDiv);
  const objectDataNameDiv = document.createElement('div');
  const objectDataNameLabel = document.createElement('label');
  objectDataNameLabel.innerHTML = 'Name : ';
  const objectDataName = document.createElement('span');
  objectDataName.id = 'object-parent-wizard-current-object-name';
  objectDataNameDiv.appendChild(objectDataNameLabel);
  objectDataNameDiv.appendChild(objectDataName);
  objectFieldset.appendChild(objectDataNameDiv);
  const objectDataAltNamesDiv = document.createElement('div');
  const objectDataAltNamesLabel = document.createElement('label');
  objectDataAltNamesLabel.innerHTML = 'Alt Names : ';
  const objectDataAltNames = document.createElement('span');
  objectDataAltNames.id = 'object-parent-wizard-current-object-alt-names';
  objectDataAltNamesDiv.appendChild(objectDataAltNamesLabel);
  objectDataAltNamesDiv.appendChild(objectDataAltNames);
  objectFieldset.appendChild(objectDataAltNamesDiv);
  const objectDataParentTextDiv = document.createElement('div');
  const objectDataParentTextLabel = document.createElement('label');
  const objectDataParentText = document.createElement('span');
  objectDataParentText.id = 'object-parent-wizard-current-object-parent-text';
  objectDataParentTextDiv.appendChild(objectDataParentTextLabel);
  objectDataParentTextLabel.innerHTML = 'Parent as Displayed : ';
  objectDataParentTextDiv.appendChild(objectDataParentText);
  objectFieldset.appendChild(objectDataParentTextDiv);
  const objectDataIdDiv = document.createElement('div');
  const objectDataUrlDisplayerDiv = document.createElement('div');
  objectDataUrlDisplayerDiv.id = 'object-parent-wizard-current-object-urls';
  objectFieldset.appendChild(objectDataUrlDisplayerDiv);
  const objectDataIdLabel = document.createElement('span');
  objectDataIdDiv.innerHTML = 'Id : ';
  const objectDataId = document.createElement('span');
  objectDataId.id = 'object-parent-wizard-current-object-id';
  objectDataIdDiv.appendChild(objectDataIdLabel);
  objectDataIdDiv.appendChild(objectDataId);
  objectFieldset.appendChild(objectDataIdDiv);
  const objectDataSortIdDiv = document.createElement('div');
  const objectDataSortIdLabel = document.createElement('span');
  objectDataSortIdLabel.innerHTML = 'Sort Id : ';
  const objectDataSortId = document.createElement('span');
  objectDataSortId.id = 'object-parent-wizard-current-object-sort-id';
  objectDataSortIdDiv.appendChild(objectDataSortIdLabel);
  objectDataSortIdDiv.appendChild(objectDataSortId);
  objectFieldset.appendChild(objectDataSortIdDiv);
  // Suggestion div
  const suggestionSelectFieldset = document.createElement('fieldset');
  const suggestionSelectFieldsetLegend = document.createElement('legend');
  suggestionSelectFieldsetLegend.textContent = 'Object Parent Selection';
  suggestionSelectFieldset.appendChild(suggestionSelectFieldsetLegend);
  firstColumnDiv.appendChild(suggestionSelectFieldset);
  const suggestionSelectDivSelect = document.createElement('select');
  const suggestionSelectDivSelectLabel = document.createElement('label');
  suggestionSelectDivSelectLabel.innerHTML = 'Sugested Parents :';
  suggestionSelectDivSelect.id = 'object-parent-wizard-suggestion-select';
  suggestionSelectDivSelect.addEventListener('change', function(){
    spreadSelectSelectionToSelect2(this.value);
  });
  suggestionSelectFieldset.appendChild(suggestionSelectDivSelectLabel);
  const select2Div = document.createElement('div');
  const select2DivSelect = document.createElement('select');
  select2DivSelect.id = 'object-parent-wizard-select2-select';
  suggestionSelectFieldset.appendChild(document.createElement("br"));
  suggestionSelectFieldset.appendChild(suggestionSelectDivSelect);
  suggestionSelectFieldset.appendChild(document.createElement("hr"));
  select2Div.appendChild(select2DivSelect);
  suggestionSelectFieldset.appendChild(select2Div);
  secondColumnDiv.appendChild(suggestionSelectFieldset);
  // Structure
  rootDiv.appendChild(firstColumnDiv);
  rootDiv.appendChild(secondColumnDiv);
  // Into collapsible
  const orphanObjectNumber = astronomicalObjectSearchArray.filter(o => o.parentId === "").length;
  generateCollapsibleWidget(parentDiv, `Object Parent (${orphanObjectNumber} orphan objects)`, rootDiv, 'object-parent-wizard');
  // Select2 init
  $(document).ready(function() {
    $('#object-parent-wizard-select2-select').select2({
      data: astronomicalObjectSearchArray,
      placeholder: 'Astronomical object search....',
      allowClear: true,
      // width: 'style',
    });
    $("#object-parent-wizard-select2-select").val('').trigger('change'); // unselect everything
    $("#object-parent-wizard-select2-select").on('change', function() { // store value on change
      const objectId = $("#object-parent-wizard-select2-select").val();
      objectParentWizardStoreFilledObjects(objectId);
    });
  });
}

function createObjectParentWizardStorageData() {
  objectParentWizard = {
    currentObjectId: "", // Store id of object viewed in last stage
    updatedObjects: {}, // Store object with new values for parent (id + parent ID + parent text)
  }
}

function objectParentWizardLoadPreviousObject() {
  const currentObjectIndex = astronomicalObjectSearchArray.findIndex(object => object.id === objectParentWizard.currentObjectId);
  // Find previous object
  const previousObject = astronomicalObjectSearchArray.slice(undefined, currentObjectIndex-1).toReversed().find(object => object.parentId === "");
  if(previousObject !== undefined) {
    objectParentWizard.currentObjectId = previousObject.id;
  } else {
    alert("Beginning of object list reached !");
    return;
  }
  const previousObjectIndex = astronomicalObjectSearchArray.findIndex(object => object.id === objectParentWizard.currentObjectId);
  // Check second previous to disable button
  if(previousObjectIndex === 0) {
    document.getElementById('object-parent-wizard-previous-button').disabled = true;
  }
  const secondPreviousObject = astronomicalObjectSearchArray.slice(undefined, previousObjectIndex-1).toReversed().find(object => object.parentId === "");
  if(secondPreviousObject === undefined){  
    document.getElementById('object-parent-wizard-previous-button').disabled = true;
  }
  objectParentWizardLoadObject();
  document.getElementById('object-parent-wizard-next-button').disabled = false;
}

function objectParentWizardLoadNextObject() {
  const currentObjectIndex = astronomicalObjectSearchArray.findIndex(object => object.id === objectParentWizard.currentObjectId);
  // if(currentObjectIndex === -1){
  // }
  if(currentObjectIndex + 1 === astronomicalObjectSearchArray.length) {
    alert("Objects without parent are all browsed !");
    document.getElementById('object-parent-wizard-next-button').disabled = true;
    return;
  }
  let nextInterestingObject = astronomicalObjectSearchArray.slice(currentObjectIndex+1).find(object => object.parentId === "");
  if(nextInterestingObject) {
    objectParentWizard.currentObjectId = nextInterestingObject.id;
  } else {
    alert("Objects without parent are all browsed !");
    document.getElementById('object-parent-wizard-next-button').disabled = true;
    return;
  }
  objectParentWizardLoadObject();
  document.getElementById('object-parent-wizard-previous-button').disabled = false;
}

function objectParentWizardLoadObject() {
  // Init
  if(objectParentWizard.currentObjectId === "") {
    objectParentWizard.currentObjectId = astronomicalObjectSearchArray.find(object => object.parentId === "").id;
    document.getElementById('object-parent-wizard-previous-button').disabled = true;
  }
  const currentObject = astronomicalObjectSearchArray.find(object => object.id === objectParentWizard.currentObjectId);
  document.getElementById('object-parent-wizard-current-object-text').innerHTML = currentObject.text;
  document.getElementById('object-parent-wizard-current-object-name').innerHTML = currentObject.name;
  document.getElementById('object-parent-wizard-current-object-alt-names').innerHTML = currentObject.altNames;
  document.getElementById('object-parent-wizard-current-object-parent-text').innerHTML = currentObject.humanParent;
  // Urls
  const urlUL = document.createElement("ul");
  const urlDiv = document.getElementById('object-parent-wizard-current-object-urls');
  urlDiv.innerHTML = "";
  urlDiv.appendChild(urlUL);
  const urlList = separateStringToLinkList(currentObject.urls.join(','));
  for (const element of urlList) {
    let li = urlUL.appendChild(document.createElement("li"));
    li.appendChild(element);
  }
  if(currentObject.wikidataId !== "") {
    let li = urlUL.appendChild(document.createElement("li"));
    li.appendChild(separateStringToLinkList((WIKIDATA_PAGE_PREFIX + currentObject.wikidataId), ",")[0]);
  }
  // Others
  document.getElementById('object-parent-wizard-current-object-id').innerHTML = currentObject.id;
  document.getElementById('object-parent-wizard-current-object-sort-id').innerHTML = currentObject.sortId;
  // Create suggestion select
  const suggestionSelect = document.getElementById('object-parent-wizard-suggestion-select');
  suggestionSelect.innerHTML = "";
  let emptyOption = document.createElement('option');
  emptyOption.value = "";
  emptyOption.innerHTML = "";
  suggestionSelect.appendChild(emptyOption);
  createSuggestionObjectArray(currentObject).forEach((suggestedObject) => {
    let opt = document.createElement('option');
    opt.value = suggestedObject.id;
    opt.innerHTML = suggestedObject.text;
    suggestionSelect.appendChild(opt);
  });
  // Load parent in select2 if it exists
  const currentObjectId = objectParentWizard.currentObjectId;
  const valueToLoad = objectParentWizard.updatedObjects[currentObjectId] ?? "";
  $(document).ready(function() {
    $("#object-parent-wizard-select2-select").val(valueToLoad).trigger('change'); // load stored value or no value
    });
}

function createSuggestionObjectArray(object) {
  let suggestions = {
    "by-parent-name": [],
    "by-alt-names": [],
    "by-name": [],
  };

  const objectTypeToConsider = {
    "Area" : [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon","Rogue Asteroid","Rogue Comet",
      "Planet","Dwarf Planet","Moon","Dwarf Moon","Asteroid","Comet","Comet Cluster","Cometary Cloud","Asteroid Belt","Asteroid Field"
    ],
    "Unknown": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon","Rogue Asteroid","Rogue Comet",
      "Planet","Dwarf Planet","Moon","Dwarf Moon","Asteroid","Comet","Comet Cluster","Cometary Cloud","Asteroid Belt","Asteroid Field"
    ],
    "Location": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon","Rogue Asteroid","Rogue Comet",
      "Planet","Dwarf Planet","Moon","Dwarf Moon","Asteroid","Comet","Comet Cluster","Cometary Cloud","Asteroid Belt","Asteroid Field"
    ],
    "Exotic": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon","Rogue Asteroid","Rogue Comet",
      "Planet","Dwarf Planet","Moon","Dwarf Moon","Asteroid","Comet","Comet Cluster","Cometary Cloud","Asteroid Belt","Asteroid Field"
    ],
    "Anomaly": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon","Rogue Asteroid","Rogue Comet",
      "Planet","Dwarf Planet","Moon","Dwarf Moon","Asteroid","Comet","Comet Cluster","Cometary Cloud","Asteroid Belt","Asteroid Field"
    ],
    "Void Space": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector"
    ],
    "Artificial Object": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon","Rogue Asteroid","Rogue Comet",
      "Planet","Dwarf Planet","Moon","Dwarf Moon","Asteroid","Comet","Comet Cluster","Cometary Cloud","Asteroid Belt","Asteroid Field"
    ],
    "Natural Object": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon","Rogue Asteroid","Rogue Comet",
      "Planet","Dwarf Planet","Moon","Dwarf Moon","Asteroid","Comet","Comet Cluster","Cometary Cloud","Asteroid Belt","Asteroid Field"
    ],
    "Universe": [],
    "Galaxy Cluster": ["Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe"],
    "Galaxy Group":   ["Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster"],
    "Galaxy":         ["Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group"],
    "Quasar":         ["Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group"],
    "Region":         ["Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar"],
    "Sector": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region"
    ],
    "Interstellar Matter": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System"
    ],
    "Nebula": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System"
    ],
    "Interstellar Cloud": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System"
    ],
    "Star Cluster": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud",
    ],
    "Star System": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster"
    ],
    "Star": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System"
    ],
    "Rings": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon","Rogue Asteroid","Rogue Comet",
      "Planet","Dwarf Planet","Moon","Dwarf Moon","Asteroid","Comet","Comet Cluster","Cometary Cloud","Asteroid Belt","Asteroid Field"
    ],
    "Rogue Planet": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster"
    ],
    "Rogue Moon": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster"
    ],
    "Rogue Asteroid": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster"
    ],
    "Rogue Comet": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster"
    ],
    "Planet": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star"
    ],
    "Dwarf Planet": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings",
    ],
    "Moon": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet",
      "Planet","Dwarf Planet"
    ],
    "Dwarf Moon": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon",
      "Planet","Dwarf Planet","Moon"
    ],
    "Asteroid": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon","Rogue Asteroid","Rogue Comet",
      "Planet","Dwarf Planet","Moon","Dwarf Moon","Asteroid","Comet","Comet Cluster","Cometary Cloud","Asteroid Belt","Asteroid Field"
    ],
    "Comet": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System"
    ],
    "Comet Cluster": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System"
    ],
    "Cometary Cloud": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System"
    ],
    "Asteroid Belt": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System"
    ],
    "Asteroid Field": [
      "Unknown","Location","Exotic","Anomaly","Void Space","Artificial Object","Natural Object","Universe","Galaxy Cluster","Galaxy Group","Galaxy","Quasar",
      "Region","Sector","Interstellar Matter","Nebula","Interstellar Cloud","Star Cluster","Star System","Star","Rings","Rogue Planet","Rogue Moon","Rogue Asteroid","Rogue Comet",
      "Planet","Dwarf Planet","Moon","Dwarf Moon","Asteroid","Asteroid Belt","Asteroid Field"
    ],
    "Hyperspace Route": ["Hyperspace Route","Hyperspace route section"],
    "Hyperspace route section": [],
  };
  const stringToRemoveFromArrayToSearchFor = ["the", "of", "region", "sector", "system", "station", "field", "worlds", "province", "nebula", "cluster"];

  // console.log("Name : ", object.name);
  // console.log("Alt Name : ", object.altNames);
  // console.log("Parent Name : ", object.humanParent);

  // Create string array to search for suggestions
  let stringArrayToSearchFor = [];
  stringArrayToSearchFor = [...stringArrayToSearchFor, ...object.name.split(" ")];
  stringArrayToSearchFor = [...stringArrayToSearchFor, ...object.altNames.replace(/[/]/g, " ").replace(/[?<>()[\]]/g, "").replace(/  +/g, ' ').split(" ")];
  stringArrayToSearchFor = [...stringArrayToSearchFor, ...object.humanParent.replace(/[/,;]/g, " ").replace(/[?<>()[\]]/g, "").replace(/  +/g, ' ').split(" ").toReversed()]; // reversing term cause often, parent names are included in names, alt names and parent text in lastest position
  stringArrayToSearchFor = [...new Set(stringArrayToSearchFor)].sort((a, b) => b.length - a.length).filter(elm => elm); // Sort descending, longer item first ; remove duplicates with Set ; remove empty string, undefined  or null value with filter
  stringArrayToSearchFor = stringArrayToSearchFor.filter( ( el ) => !stringToRemoveFromArrayToSearchFor.includes( el.toLowerCase()) ); // Remove words determined by another array
  
  // Search for 
  astronomicalObjectSearchArray.forEach(element => {
    if(element.id === object.id) { // Avoid suggesting same object
      return;
    }
    if(objectTypeToConsider[object.objectType].includes(element.objectType)) {
      // Find with alt names
      let altNameWordFound = element.altNames.replace(/[/,;]/g, " ").replace(/[?<>()[\]]/g, "").replace(/  +/g, ' ').split(" ").find(word => stringArrayToSearchFor.includes(word));
      if(altNameWordFound !== undefined) {
        if(suggestions["by-alt-names"][altNameWordFound.length] === undefined) {
          suggestions["by-alt-names"][altNameWordFound.length] = [];
        }
        suggestions["by-alt-names"][altNameWordFound.length].push({id: element.id, text: element.text});
        return;
      }
      // Find with names
      let nameWordFound = element.name.split("/").join(" ").split(" ").find(word => stringArrayToSearchFor.includes(word));
      if(nameWordFound !== undefined) {
        if(suggestions["by-name"][nameWordFound.length] === undefined) {
          suggestions["by-name"][nameWordFound.length] = [];
        }
        suggestions["by-name"][nameWordFound.length].push({id: element.id, text: element.text});
        return;
      }
      // Find with parents
      let parentHumanWordFound = element.humanParent.replace(/[/,;]/g, " ").replace(/[?<>()[\]]/g, "").replace(/  +/g, ' ').split(" ").find(word => stringArrayToSearchFor.includes(word));
      if(parentHumanWordFound !== undefined) {
        if(suggestions["by-parent-name"][parentHumanWordFound.length] === undefined) {
          suggestions["by-parent-name"][parentHumanWordFound.length] = [];
        }
        suggestions["by-parent-name"][parentHumanWordFound.length].push({id: element.id, text: element.text});
        return;
      }
    } else {
      return;
    }
  });

  // Reorder array with priorities removing duplicates and reversing array to have words with more letter suggested first cause they gives punctually good matching result
  suggestions = [
    , ...suggestions["by-name"].reverse().flat(), ...suggestions["by-alt-names"].reverse().flat(), ...suggestions["by-parent-name"].reverse().flat()
  ];

  // console.log("Object Suggestions : ",suggestions);
  return suggestions;
}


function objectParentWizardStoreFilledObjects(objectId) {
  const currentObjectId = objectParentWizard.currentObjectId;
  objectParentWizard.updatedObjects[currentObjectId] = objectId;
  for (const key in objectParentWizard.updatedObjects) {
    // console.log(`${key}: ${obj[key]}`);
    if(objectParentWizard.updatedObjects[key]) {
      document.getElementById('object-parent-wizard-save-stage-button').disabled = false;
      break;
    }
    document.getElementById('object-parent-wizard-save-stage-button').disabled = true;
  }
}

async function objectParentWizardSaveFilledObjects() {
  document.getElementById('object-parent-wizard-save-stage-button').disabled = true;
  let objectArrayToUpdate = [];
  for (const [key, value] of Object.entries(objectParentWizard.updatedObjects)) {
    if(value !== undefined && value !== null) {
      let object = [];
      object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID] = key;
      object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_ID] = value;
      // object[SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_HUMAN] = await getParentHierarchy(key);  // Doest work since spreadsheet isn't updated yet, must be done with automated tools
      objectArrayToUpdate.push(object);
    }
  }
  // update array
  const sheetRange = `!${SPREADSHEET_HEADERS.OBJECTS.FIRST_COLUMN_REF}:${SPREADSHEET_HEADERS.OBJECTS.LAST_COLUMN_REF()}`;
  const cellRangeToUpdate = [ SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_ID, SPREADSHEET_HEADERS.OBJECTS.COLUMNS.PARENT_ID];
  const updateResult = await updateSpreadSheetBatchCellRangeData(SPREADSHEET_ID, SHEETS.OBJECTS, sheetRange, SPREADSHEET_HEADERS.OBJECTS.COLUMNS.ID, objectArrayToUpdate, cellRangeToUpdate);
  if(updateResult) {
    alert(`Object parents are sucessfully updated into spreadsheet ! Reloading form`);
    // Reload wizard and objects
    await refreshForm();
    refreshDatatable("objectDatatable");
    initWizard();
  } else {
    alert("Error encoutered on Object parents update ! Check console (F12) for more details");
  }
}

function spreadSelectSelectionToSelect2(objectID) {
  $(document).ready(function() {
    $("#object-parent-wizard-select2-select").val(objectID).trigger('change'); // select value
  });
}

/** Inner system builder  **/

function createInnerObjectSystemBuilderWizard(parentDiv) {
  generateWizardObjectSystems();
  createInnerObjectSystemBuilderWizardStorageData();
  createInnerObjectSystemBuilderWizardStructure(parentDiv);
  loadInnerSystemObject();
}

function createInnerObjectSystemBuilderWizardStorageData () {
  objectSystemWizard = {
    currentSystemIndex: "", // Store id of object viewed in last stage
    updatedSystems: [], // Store object with new values for parent
  }
}

function createInnerObjectSystemBuilderWizardStructure(parentDiv) {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'system-builder-wizard-content';
  const firstColumnDiv = document.createElement('div');
  const secondColumnDiv = document.createElement('div');
  // Select
  const systemSelect2Div = document.createElement('div');
  const systemSelect2 = document.createElement('select');
  systemSelect2.id = 'system-builder-wizard-system-select';
  systemSelect2Div.appendChild(systemSelect2);
  firstColumnDiv.appendChild(systemSelect2Div);
  // Load select 2
  $(document).ready(function() {
    $("#system-builder-wizard-system-select").select2({
      data: wizardObjectSystemStore,
      placeholder: 'System ...',
      allowClear: false
    });
    // Populate class type on type select
    $("#system-builder-wizard-system-select").on('change', function() {
      const selectedValue = $("#system-builder-wizard-system-select").val();
      const selectedIndex = wizardObjectSystemStore.findIndex(system => system.id === selectedValue);
      loadInnerSystemObject(selectedIndex);
    });
  });
  // buttons
  const buttonSpan = document.createElement('span');
  firstColumnDiv.appendChild(buttonSpan);
  // Previous button
  const previousObjectButton = document.createElement('button');
  previousObjectButton.innerHTML = 'Previous';
  previousObjectButton.id = 'system-builder-wizard-previous-button';
  previousObjectButton.addEventListener('click', function(){
    objectSystemBuilderLoadPreviousObject();
  });
  buttonSpan.appendChild(previousObjectButton);
  // Next button
  const nextObjectButton = document.createElement('button');
  nextObjectButton.innerHTML = 'Next';
  nextObjectButton.id = 'system-builder-wizard-next-button';
  nextObjectButton.addEventListener('click', function(){
    objectSystemBuilderLoadNextObject();
  });
  buttonSpan.appendChild(nextObjectButton);
  // Generate button
  const generateSystemButton = document.createElement('button');
  generateSystemButton.innerHTML = 'Generate System';
  generateSystemButton.id = 'system-builder-wizard-generate-system-button';
  generateSystemButton.addEventListener('click', function(){
    objectSystemBuilderGenerateSystem();
  });
  buttonSpan.appendChild(generateSystemButton);
  // Generate preudo random data button
  const generatePseudoRandomDataButton = document.createElement('button');
  generatePseudoRandomDataButton.innerHTML = 'Generate System';
  generatePseudoRandomDataButton.id = 'system-builder-wizard-generate-pseudo-random-data-button';
  generatePseudoRandomDataButton.addEventListener('click', function(){
    objectSystemBuilderGeneratePseudoRandomData();
  });
  buttonSpan.appendChild(generatePseudoRandomDataButton);
  // Save button
  const stageSaveButton = document.createElement('button');
  stageSaveButton.innerHTML = 'Save Filled Objects';
  stageSaveButton.id = 'system-builder-wizard-save-stage-button';
  stageSaveButton.addEventListener('click', function(){
    objectSystemBuilderSaveConfiguration();
  });
  buttonSpan.appendChild(stageSaveButton);
  // object data fieldset
  const systemFieldset = document.createElement('fieldset');
  const systemFieldsetLegend = document.createElement('legend');
  systemFieldsetLegend.textContent = 'System';
  systemFieldset.appendChild(systemFieldsetLegend);
  firstColumnDiv.appendChild(systemFieldset);
  const systemNameDiv = document.createElement('div');
  systemNameDiv.id = 'system-builder-wizard-system-name';
  const systemTableDiv = document.createElement('div');
  // System table
  const systemTable = document.createElement('table');
  systemTable.id = 'system-builder-wizard-table';
  // Table headers
  const systemTableHead = document.createElement('thead');
  systemTableHead.id = 'system-builder-wizard-table-head';
  // Body
  const systemTableBody = document.createElement('tbody');
  systemTableBody.id = 'system-builder-wizard-table-body';
  // Append to parent elements
  systemTable.appendChild(systemTableHead);
  systemTable.appendChild(systemTableBody);
  systemTableDiv.appendChild(systemTable);
  systemFieldset.appendChild(systemNameDiv);
  systemFieldset.appendChild(systemTableDiv); 
  // Structure
  rootDiv.appendChild(firstColumnDiv);
  rootDiv.appendChild(secondColumnDiv);
  // Into collapsible
  generateCollapsibleWidget(parentDiv, 'System Builder', rootDiv, 'system-builder-wizard');
}

function generateInnerSystemTable(systemIndex) {
  const systemTableHead = document.getElementById('system-builder-wizard-table-head');
  const systemTableBody = document.getElementById('system-builder-wizard-table-body');
  const systemName = document.getElementById('system-builder-wizard-system-name');
  const currentSystem = wizardObjectSystemStore[systemIndex];

  // Reset all
  systemTableHead.innerHTML = systemTableBody.innerHTML = systemName.innerHTML = "";
  systemName.innerHTML = `<b>${currentSystem.text}</b>`;
  // Build table header
  const tableHeadColumns = {
    "name": "Name",
    "continuityString": "Continuity",
    "objectType": "Type",
    "objectTypeClass": "Type Class",
    "orbitalRank": "Position",
    "gravity": "Gravity",
    "size": "Size in km",
    "distanceToParent": "Distance to Parent in km",
    "lengthOfDay": "Rotation Period (Length of day in hour)",
    "lengthOfYear": "Orbital Period (Length of Year in day)",
  }
  const systemTableHeadRow = document.createElement("tr");
  systemTableHead.appendChild(systemTableHeadRow);
  for (const columnKey in tableHeadColumns) {
    const systemTableHeadCell = document.createElement("th");
    systemTableHeadCell.innerHTML = tableHeadColumns[columnKey];
    systemTableHeadRow.appendChild(systemTableHeadCell);
  }
  // Build table Body
  generateInnerSystemTableRow (systemTableBody, currentSystem, tableHeadColumns);
}

function generateInnerSystemTableRow (systemTableBody, currentSystem, tableHeadColumns, level=0) {
  for (const innerSystemObject of currentSystem.innerObjects) {
    const systemTableBodyRow = document.createElement("tr");
    systemTableBody.appendChild(systemTableBodyRow);
    for (const columnKey in tableHeadColumns) {
      const systemTableBodyCell = document.createElement("td");
      if(columnKey === "name" && level > 0) {
        systemTableBodyCell.innerHTML = "  ".repeat(level-1) + "├─" + " " + innerSystemObject[columnKey];
      } else {
        // If empty cell we insert input type text field
        if(innerSystemObject[columnKey] === "") {
          const inputText = document.createElement("input");
          inputText.type = "text";
          systemTableBodyCell.appendChild(inputText);
        } else {
          systemTableBodyCell.innerHTML = innerSystemObject[columnKey];
        }
      }
      systemTableBodyRow.appendChild(systemTableBodyCell);
    }
    if(innerSystemObject["innerObjects"].length > 0) {
      generateInnerSystemTableRow (systemTableBody, innerSystemObject, tableHeadColumns, level+1);
    }
  }
}

function loadInnerSystemObject (systemIndex) {
  if(systemIndex === undefined) { // init
    systemIndex = 0;
    objectSystemWizard.currentSystemIndex = 0;
    document.getElementById('system-builder-wizard-previous-button').disabled = true;
    if(wizardObjectSystemStore.length <= 1) {
      document.getElementById('system-builder-wizard-next-button').disabled = true;
    }
  }
  $(document).ready(function() { // load select2
    // We don't want to triger change event but need data to be changed into select
    $("#system-builder-wizard-system-select").val(wizardObjectSystemStore[systemIndex].id).trigger('change.select2');
  });
  // Table
  generateInnerSystemTable(systemIndex);
  // Display
}

function objectSystemBuilderLoadNextObject() {
  objectSystemBuilderStoreFilledData();
  loadInnerSystemObject(++objectSystemWizard.currentSystemIndex);
  document.getElementById('system-builder-wizard-previous-button').disabled = false;
  if(objectSystemWizard.currentSystemIndex === wizardObjectSystemStore.length -1) {
    document.getElementById('system-builder-wizard-next-button').disabled = true;
  }
}

function objectSystemBuilderLoadPreviousObject() {
  objectSystemBuilderStoreFilledData();
  loadInnerSystemObject(--objectSystemWizard.currentSystemIndex);
  document.getElementById('system-builder-wizard-next-button').disabled = false;
  if(objectSystemWizard.currentSystemIndex === 0) {
    document.getElementById('system-builder-wizard-previous-button').disabled = true;
  }
}

function objectSystemBuilderSaveConfiguration() {
  alert("Nothing to See Here... Move Along... Move Along");
}

/**
 * Return star systems and their inner objects (Deep copy of arrays - doesn't alter object array)
 * TODO : systems of system (moon systems for example)
 */
function generateWizardObjectSystems() {
  wizardObjectSystemStore = []; // Reset data
  astronomicalObjectSearchArray.forEach((object) => {
    if(object.objectType.toLowerCase() === "star system") {
      let system = JSON.parse(JSON.stringify(object)); // Deep copy
      system["innerObjects"] = generateWizardObjectInnerSystem(object.id);
      wizardObjectSystemStore.push(system);
    }
  });
}

function generateWizardObjectInnerSystem(parentObjectId) {
  let objects = [];
  astronomicalObjectSearchArray.forEach(object => {
    if(object.parentId === parentObjectId) {
      //parentObject["innerObjects"] = generateWizardObjectInnerSystem(object); // TODO
      let currentObject = JSON.parse(JSON.stringify(object));
      if(object.id !== object.parentId) {
        currentObject["innerObjects"] = generateWizardObjectInnerSystem(object.id);
      } else {
        console.error(`System generator : ignored object ${object.name} with id ${object.id} because it is mistakenly its own parent`);
      }
      objects.push(currentObject);
    }
  });
  return objects.toSorted((a,b) => a.orbitalRank - b.orbitalRank); // return sorted array by orbital positions
}

/**
 * Generate system coordinates and draw result on preview
 */
function objectSystemBuilderGenerateSystem() {
  objectSystemBuilderStoreFilledData();
  /* Simplified Method for Estimating Orbits */
  // 1. Assign Masses to Bodies
  // - Use typical mass ranges for different types of celestial bodies (e.g., terrestrial planets, gas giants, etc.).

  // 2. Assign Semi-Major Axes
  // - The semi-major axis 𝑎 a is the average distance of the orbiting body from the star.
  // - Use empirical distributions such as the Titius-Bode law for initial guesses: a_n = a_0 + d * (1.5^n)
  //      where a_0 is a starting distance, d is a scaling factor, and n is the orbit index.

  // Seems better to use generalized Titius-Bode Relation
  // A common form of the generalized Titius-Bode relation is: a_n = a_0 + d * c^n
  // a_n is the semi-major axis of the n-th planet
  // a_0 is the semi-major axis of the innermost planet (starting point).
  // d is a scaling factor
  // c is a constant factor representing the ratio of successive orbits.
  // n is the index of the planet (starting from 0 for the innermost planet).
  // example : 
  // 1. Choose Parameters:
  // Determine a_0, the distance of the first planet.
  // Choose d and c based on the system you are modeling. In the classical Titius-Bode law for the Solar System, a_0≈0.4 AU, d≈0.3 AU, and c≈2
  // 2. Calculate Semi-Major Axes:
  // For each planet index n, compute a_n

  // Seems even better to use Hill Radius and Mutual Hill Stability method
  // In multi-planet systems, the concept of the Hill radius (the region where a planet's gravity dominates over the star's gravity) can be used to ensure that planets are spaced far enough apart to be dynamically stable.
  // R_H = a (m/3M*)^1/3
  // R_H is the Hill radius,
  // a is the semi-major axis of the planet,
  // m is the mass of the planet,
  // M∗ is the mass of the star.
  // Planets should be separated by several mutual Hill radii to avoid close encounters and instability.

  // 3. Assign Orbital Eccentricities:
  // - Assign eccentricities e based on statistical distributions
  //    - Terrestrial planets: e ≈ 0.0 to 0.3
  //    - Gas giants: e ≈ 0.0 to 0.4
  // - A simple method could be: e = random(0, e_max) where e_max is the maximum expected eccentricity for the body type.

  // 4. Assign Orbital Inclinations:
  // - Inclinations i are usually small for planets in a system, but can be higher for comets and asteroids.
  // For planets : i = random (0.5°)
  // For asteroids and comets : i = random (0.3°)

  // 5. Generate Orbital Parameters:
  // True Anomaly (ν), Argument of Periapsis (ω), and Longitude of Ascending Node (Ω) can be randomly assigned or based on distribution models.

}

/**
 * Returns list of semi-major axis for orbiting body using Titius-Bode relation
 * 
 * @param {float} innerMostBodySemiMajorAxis is the semi-major axis of the innermost planet (positive float in AU)
 * @param {float} scalingFactor is a constant that determines the rate of spacing (positive float)
 * @param {} constantFactor is a constant factor representing the ratio of successive orbits (positive float)
 * @param {int} numberOfOrbitingBodies is the planet number (positive int)
 * @returns a list of semi major axis for orbitting bodies
 */
function objectSystemBuilderComputeBodiesSemiMajorAxisUsingTitiusBodeLaw() {
  let semiMajorAxis = [];
  for (let index = 0; index < numberOfOrbitingBodies; index++) {
    semiMajorAxis.push(innerMostBodySemiMajorAxis + scalingFactor * Math.pow(constantFactor,numberOfOrbitingBodies));
  }
  return semiMajorAxis;
}

/**
 * Calculate Hill radius : radius between stable bodies
 * 
 * @param {float} semiMajorAxisOfOrbitingBody positive float in AU
 * @param {float} orbitingBodyMass positive float in Earth Mass (M⊕)
 * @param {float} centralBodyMass positive float in Solar Mass (M⊙)
 * @returns hill radius of orbiting body in AU
 */
function objectSystemBuilderComputeHillRadius(semiMajorAxisOfOrbitingBody, orbitingBodyMass, centralBodyMass) {
  return semiMajorAxisOfOrbitingBody * (orbitingBodyMass / (3 * centralBodyMass))^(1/3);
}

objectSystemBuilderComputeBodiesSemiMajorAxisHillRadius () {

}

/**
 * Returns list of semi-major axis for orbiting body using logarithmic distribution
 * 
 * @param {float} semiMajorAxisScale is a constant that scales the distance positive float in AU
 * @param {float} rateOfSpacing is a constant that determines the rate of spacing. (positive float)
 * @param {int} numberOfOrbitingBodies is the planet number (positive int)
 * @returns semi major axis list for the n bodies
 */
function objectSystemBuilderComputeBodiesSemiMajorAxisUsingPowerLawDistribution(semiMajorAxisScale, rateOfSpacing, numberOfOrbitingBodies) {
  let semiMajorAxis = [];
  for (let index = 1; index < numberOfOrbitingBodies+1; index++) {
    semiMajorAxis.push(semiMajorAxisScale * Math.exp(rateOfSpacing*index));
  }
  return semiMajorAxis;
}

/**
 * Returns list of semi-major axis for orbiting body using power law distribution
 * 
 * @param {float} innerMostBodySemiMajorAxis is the semi-major axis of the innermost planet (positive float in AU)
 * @param {float} rateOfSpacing is a constant that determines the rate of spacing (positive float)
 * @param {int} numberOfOrbitingBodies is the planet number (positive int)
 * @returns semi major axis list for the n bodies
 */
function objectSystemBuilderComputeBodiesSemiMajorAxisUsingLogarithmicDistribution(innerMostBodySemiMajorAxis, rateOfSpacing, numberOfOrbitingBodies) {
  let semiMajorAxis = [];
  for (let index = 0; index < numberOfOrbitingBodies; index++) {
    semiMajorAxis.push(innerMostBodySemiMajorAxis * Math.pow(index, rateOfSpacing));
  }
  return semiMajorAxis;
}

/**
 * Generate data for empty but useful fields/property using random and according to other fields
 */
function objectSystemBuilderGeneratePseudoRandomData() {
  objectSystemBuilderStoreFilledData();
}

/**
 * Store filled input fields with data
 */
function objectSystemBuilderStoreFilledData() {
  
}

/**
 * Event listeners
 */

document.getElementById('refresh-wizard-button').addEventListener('click', async function () {
  await refreshForm();
  refreshDatatable("objectDatatable");
  initWizard();
});