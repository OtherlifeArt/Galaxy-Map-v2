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
      objectSystemBuilderStoreFilledData(); // Save before change
      const selectedValue = $("#system-builder-wizard-system-select").val();
      const selectedIndex = wizardObjectSystemStore.findIndex(system => system.id === selectedValue);
      loadInnerSystemObject(selectedIndex);
      objectSystemWizard.currentSystemIndex = selectedIndex;
      if(objectSystemWizard.currentSystemIndex === wizardObjectSystemStore.length -1) {
        document.getElementById('system-builder-wizard-next-button').disabled = true;
      } else {
        document.getElementById('system-builder-wizard-next-button').disabled = false;
      }
      if(objectSystemWizard.currentSystemIndex === 0) {
        document.getElementById('system-builder-wizard-previous-button').disabled = true;
      } else {
        document.getElementById('system-builder-wizard-previous-button').disabled = false;
      }
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
  // Store button
  const stageStoreButton = document.createElement('button');
  stageStoreButton.innerHTML = 'Store Generated & Filled Data';
  stageStoreButton.id = 'system-builder-wizard-store-stage-button';
  stageStoreButton.addEventListener('click', function(){
    objectSystemBuilderStoreFilledData();
    loadInnerSystemObject(objectSystemWizard.currentSystemIndex);
  });
  buttonSpan.appendChild(stageStoreButton);
  // Reset stored data button
  const resetStoredDataButton = document.createElement('button');
  resetStoredDataButton.innerHTML = 'Reset Filled Data';
  resetStoredDataButton.id = 'system-builder-wizard-reset-filled-data-button';
  resetStoredDataButton.addEventListener('click', function(){
    objectSystemBuilderResetStoredData();
    loadInnerSystemObject(objectSystemWizard.currentSystemIndex);
  });
  buttonSpan.appendChild(resetStoredDataButton);
  // Save button
  const stageSaveButton = document.createElement('button');
  stageSaveButton.innerHTML = 'Save Generated & Filled Data';
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

  // canvas buttons
  const canvasButtonSpan = document.createElement("span");
  // Estimation Method fieldset
  const canvasGenerationEstimationMethodFieldset = document.createElement("fieldset");
  const canvasGenerationEstimationMethodFieldsetLegend = document.createElement('legend');
  canvasGenerationEstimationMethodFieldsetLegend.textContent = 'Estimation Method';
  canvasGenerationEstimationMethodFieldset.appendChild(canvasGenerationEstimationMethodFieldsetLegend);
  // Radio boxes to choose method
  // Titius-Bode law
  const titiusBodeLawRadio = document.createElement('input');
  titiusBodeLawRadio.type = 'radio';
  titiusBodeLawRadio.id = 'system-builder-titius-bode-law-radio';
  titiusBodeLawRadio.name = 'system-builder-estimation-method';  // Shared name for the radiogroup
  titiusBodeLawRadio.value = 'titius-bode-law';
  titiusBodeLawRadio.checked = true;
  const titiusBodeLawRadioLabel = document.createElement('label');
  titiusBodeLawRadioLabel.appendChild(document.createTextNode('Titius-Bode Law'));
  titiusBodeLawRadioLabel.htmlFor = 'system-builder-titius-bode-law-radio';
  // Power law
  const powerLawRadio = document.createElement('input');
  powerLawRadio.type = 'radio';
  powerLawRadio.id = 'system-builder-power-law-radio';
  powerLawRadio.name = 'system-builder-estimation-method';  // Shared name for the radiogroup
  powerLawRadio.value = 'power-law';
  const powerLawRadioLabel = document.createElement('label');
  powerLawRadioLabel.appendChild(document.createTextNode('Power Law'));
  powerLawRadioLabel.htmlFor = 'system-builder-power-law-radio';
  // Logarithmic distribution
  const logarithmicDistributionRadio = document.createElement('input');
  logarithmicDistributionRadio.type = 'radio';
  logarithmicDistributionRadio.id = 'system-builder-logarithmic-distribution-radio';
  logarithmicDistributionRadio.name = 'system-builder-estimation-method';  // Shared name for the radiogroup
  logarithmicDistributionRadio.value = 'logarithmic-distribution';
  const logarithmicDistributionRadioLabel = document.createElement('label');
  logarithmicDistributionRadioLabel.appendChild(document.createTextNode('Logarithmic Distribution'));
  logarithmicDistributionRadioLabel.htmlFor = 'system-builder-logarithmic-distribution-radio';
  // Append radios
  canvasGenerationEstimationMethodFieldset.appendChild(titiusBodeLawRadio);
  canvasGenerationEstimationMethodFieldset.appendChild(titiusBodeLawRadioLabel);
  canvasGenerationEstimationMethodFieldset.appendChild(powerLawRadio);
  canvasGenerationEstimationMethodFieldset.appendChild(powerLawRadioLabel);
  canvasGenerationEstimationMethodFieldset.appendChild(logarithmicDistributionRadio);
  canvasGenerationEstimationMethodFieldset.appendChild(logarithmicDistributionRadioLabel);

  // Calculation Method fieldset
  const canvasGenerationButtonFieldset = document.createElement("fieldset");
  const canvasGenerationButtonFieldsetLegend = document.createElement('legend');
  canvasGenerationButtonFieldsetLegend.textContent = 'Calculation Method';
  canvasGenerationButtonFieldset.appendChild(canvasGenerationButtonFieldsetLegend);
  // Kepler 3rd law span
  const kepler3rdLawRadioTooltip = document.createElement('span');
  // kepler3rdLawRadioTooltip.classList.add("tooltip");
  // const kepler3rdLawRadioTooltipText = document.createElement('span');
  // kepler3rdLawRadioTooltipText.classList.add("tooltiptext");
  kepler3rdLawRadioTooltip.innerHTML = 
  `In order to use Kepler 3rd Law fomula you need <b>object masses</b> (except for barycenters), <b>length of year, and orbital rank/position</b>.
  <b>Mass</b> can be computed from <b/>object size/diameter<b> and <b>type/type class</b> using statistical data.
  If a large amount of above mandatory data are missing, consider using Hill radius method or only estimation and no (\"None\") calculation method`;
  canvasGenerationButtonFieldset.appendChild(kepler3rdLawRadioTooltip);
  canvasGenerationButtonFieldset.appendChild(document.createElement("br"));
  // Radio boxes to choose method
  // Kepler 3rd law radio button
  const noCalculationMethodRadio = document.createElement('input');
  noCalculationMethodRadio.type = 'radio';
  noCalculationMethodRadio.id = 'system-builder-no-calculation-method-radio';
  noCalculationMethodRadio.name = 'system-builder-calculation-method';  // Shared name for the radiogroup
  noCalculationMethodRadio.value = 'none';
  noCalculationMethodRadio.checked = true;
  // Label for Kepler 3rd law radio button
  const noCalculationMethodRadioLabel = document.createElement('label');
  noCalculationMethodRadioLabel.htmlFor = 'system-builder-no-calculation-method-radio';
  noCalculationMethodRadioLabel.appendChild(document.createTextNode('None'));
  canvasGenerationButtonFieldset.appendChild(noCalculationMethodRadio);
  canvasGenerationButtonFieldset.appendChild(noCalculationMethodRadioLabel);
  // Kepler 3rd law radio button
  const kepler3rdLawRadio = document.createElement('input');
  kepler3rdLawRadio.type = 'radio';
  kepler3rdLawRadio.id = 'system-builder-kepler-3rd-law-radio';
  kepler3rdLawRadio.name = 'system-builder-calculation-method';  // Shared name for the radiogroup
  kepler3rdLawRadio.value = 'kepler-3rd-law';
  // Label for Kepler 3rd law radio button
  const kepler3rdLawRadioLabel = document.createElement('label');
  kepler3rdLawRadioLabel.htmlFor = 'system-builder-kepler-3rd-law-radio';
  kepler3rdLawRadioLabel.appendChild(document.createTextNode('Kepler 3rd Law'));
  canvasGenerationButtonFieldset.appendChild(kepler3rdLawRadio);
  canvasGenerationButtonFieldset.appendChild(kepler3rdLawRadioLabel);
  // kepler3rdLawRadioTooltip.appendChild(kepler3rdLawRadioTooltipText);
  // Hill radius button
  const hillRadiusRadio = document.createElement('input');
  hillRadiusRadio.type = 'radio';
  hillRadiusRadio.id = 'system-builder-hill-radius';
  hillRadiusRadio.name = 'system-builder-calculation-method';  // Shared name for the radiogroup
  hillRadiusRadio.value = 'hill-radius';
  // Label for  Hill radius with logarithm distribution radio button
  const hillRadiusRadioLabel = document.createElement('label');
  hillRadiusRadioLabel.htmlFor = 'system-builder-hill-radius';
  hillRadiusRadioLabel.appendChild(document.createTextNode('Hill Radius'));
  canvasGenerationButtonFieldset.appendChild(hillRadiusRadio);
  canvasGenerationButtonFieldset.appendChild(hillRadiusRadioLabel);
  // Generate system button
  const generateSystemButton = document.createElement('button');
  generateSystemButton.innerHTML = 'Generate System';
  generateSystemButton.id = 'system-builder-wizard-generate-system-button';
  generateSystemButton.addEventListener('click', function(){
    const estimationMethodRadios = document.getElementsByName('system-builder-estimation-method');
    const selectedEstimationMethod = (Array.from(estimationMethodRadios)).find(radio => radio.checked)?.value;
    const calculationMethodRadios = document.getElementsByName('system-builder-calculation-method');
    const selectedCalculationMethod = (Array.from(calculationMethodRadios)).find(radio => radio.checked)?.value;
    objectSystemBuilderStoreFilledData(); // Store input data
    objectSystemBuilderGenerateSystem(selectedCalculationMethod, selectedEstimationMethod); // Then generate system
  });
  canvasButtonSpan.appendChild(canvasGenerationEstimationMethodFieldset);
  canvasButtonSpan.appendChild(canvasGenerationButtonFieldset);
  canvasButtonSpan.appendChild(generateSystemButton);
  firstColumnDiv.appendChild(canvasButtonSpan);
  // Canvas
  const systemPreviewWrapperDiv = document.createElement("div");
  systemPreviewWrapperDiv.id = "system-builder-preview-wrapper";
  const systemPreviewDiv = document.createElement("div");
  const systemCanvas = document.createElement("canvas");
  systemCanvas.id = "system-builder-preview";
  systemPreviewDiv.appendChild(systemCanvas);
  systemPreviewWrapperDiv.appendChild(systemPreviewDiv);
  firstColumnDiv.appendChild(systemPreviewWrapperDiv);
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
    "mass": "Mass in solar mass",
    "size": "Size in km",
    "distanceToParent": "Distance to Parent in km",
    "orbitExcentricity": "Orbit Excentricity",
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
    systemTableBodyRow.setAttribute("objectId", innerSystemObject.id);
    systemTableBody.appendChild(systemTableBodyRow);
    for (const columnKey in tableHeadColumns) {
      const systemTableBodyCell = document.createElement("td");
      if(columnKey === "name" && level > 0) {
        systemTableBodyCell.innerHTML = "  ".repeat(level-1) + "╚═" + " " + innerSystemObject[columnKey];
      } else {
        if(columnKey === "name" || columnKey === "continuityString" || columnKey === "objectType" || columnKey === "objectTypeClass") {
          systemTableBodyCell.innerHTML = innerSystemObject[columnKey];
          systemTableBodyCell.setAttribute("objectProperty", columnKey);
        // else if objecttype classes avec choix dépendant du type ! TODO
        } else {
          const inputText = document.createElement("input");
          inputText.type = "text";
          inputText.setAttribute("objectProperty", columnKey);
          inputText.classList.remove("dashboard-modified-value");
          if(innerSystemObject.modifiedData?.[columnKey]) { // If modified we display modified data
            inputText.value = innerSystemObject.modifiedData?.[columnKey];
            inputText.classList.add("dashboard-modified-value");
          } else if(innerSystemObject[columnKey] !== undefined && innerSystemObject[columnKey] !== "") { // If filled cell we insert value in input type text field
            inputText.value = innerSystemObject[columnKey];
          }
          systemTableBodyCell.appendChild(inputText);
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

// /**
//  * Generate system coordinates and draw result on preview
//  */
// function objectSystemBuilderGenerateSystem() {
//   objectSystemBuilderStoreFilledData();
//   /* Simplified Method for Estimating Orbits */
//   // 1. Assign Masses to Bodies
//   // - Use typical mass ranges for different types of celestial bodies (e.g., terrestrial planets, gas giants, etc.).

//   // 2. Assign Semi-Major Axes
//   // - The semi-major axis 𝑎 a is the average distance of the orbiting body from the star.
//   // - Use empirical distributions such as the Titius-Bode law for initial guesses: a_n = a_0 + d * (1.5^n)
//   //      where a_0 is a starting distance, d is a scaling factor, and n is the orbit index.

//   // Seems better to use generalized Titius-Bode Relation
//   // A common form of the generalized Titius-Bode relation is: a_n = a_0 + d * c^n
//   // a_n is the semi-major axis of the n-th planet
//   // a_0 is the semi-major axis of the innermost planet (starting point).
//   // d is a scaling factor
//   // c is a constant factor representing the ratio of successive orbits.
//   // n is the index of the planet (starting from 0 for the innermost planet).
//   // example : 
//   // 1. Choose Parameters:
//   // Determine a_0, the distance of the first planet.
//   // Choose d and c based on the system you are modeling. In the classical Titius-Bode law for the Solar System, a_0≈0.4 AU, d≈0.3 AU, and c≈2
//   // 2. Calculate Semi-Major Axes:
//   // For each planet index n, compute a_n

//   // Seems even better to use Hill Radius and Mutual Hill Stability method
//   // In multi-planet systems, the concept of the Hill radius (the region where a planet's gravity dominates over the star's gravity) can be used to ensure that planets are spaced far enough apart to be dynamically stable.
//   // R_H = a (m/3M*)^1/3
//   // R_H is the Hill radius,
//   // a is the semi-major axis of the planet,
//   // m is the mass of the planet,
//   // M∗ is the mass of the star.
//   // Planets should be separated by several mutual Hill radii to avoid close encounters and instability.

//   // 3. Assign Orbital Eccentricities:
//   // - Assign eccentricities e based on statistical distributions
//   //    - Terrestrial planets: e ≈ 0.0 to 0.3
//   //    - Gas giants: e ≈ 0.0 to 0.4
//   // - A simple method could be: e = random(0, e_max) where e_max is the maximum expected eccentricity for the body type.

//   // 4. Assign Orbital Inclinations:
//   // - Inclinations i are usually small for planets in a system, but can be higher for comets and asteroids.
//   // For planets : i = random (0.5°)
//   // For asteroids and comets : i = random (0.3°)

//   // 5. Generate Orbital Parameters:
//   // True Anomaly (ν), Argument of Periapsis (ω), and Longitude of Ascending Node (Ω) can be randomly assigned or based on distribution models.

// }

// /**
//  * Returns list of semi-major axis for orbiting body using Titius-Bode relation
//  * 
//  * @param {float} innerMostBodySemiMajorAxis is the semi-major axis of the innermost planet (positive float in AU)
//  * @param {float} scalingFactor is a constant that determines the rate of spacing (positive float)
//  * @param {} constantFactor is a constant factor representing the ratio of successive orbits (positive float)
//  * @param {int} numberOfOrbitingBodies is the planet number (positive int)
//  * @returns a list of semi major axis for orbitting bodies
//  */
// function objectSystemBuilderComputeInnerSystemBodiesSemiMajorAxisUsingTitiusBodeLaw(innerMostBodySemiMajorAxis, scalingFactor, constantFactor, numberOfOrbitingBodies) {
//   let semiMajorAxis = [];
//   for (let index = 0; index < numberOfOrbitingBodies; index++) {
//     semiMajorAxis.push(innerMostBodySemiMajorAxis + scalingFactor * Math.pow(constantFactor,numberOfOrbitingBodies));
//   }
//   return semiMajorAxis;
// }

// /**
//  * Calculate Hill radius stability forst first object
//  * 
//  * @param {float} semiMajorAxisOfOrbitingBody positive float in AU
//  * @param {float} orbitingBodyMass positive float in Earth Mass (M⊕)
//  * @param {float} centralBodyMass positive float in Solar Mass (M⊙)
//  * @returns hill radius of orbiting body in AU
//  */
// function objectSystemBuilderComputeHillRadius(semiMajorAxisOfOrbitingBody, orbitingBodyMass, centralBodyMass) {
//   return semiMajorAxisOfOrbitingBody * (orbitingBodyMass / (3 * centralBodyMass))^(1/3);
// }

// /**
//  * 
//  * @param {*} previousBodyComputedSemiMajorAxis 
//  * @param {*} currentBodyGuessedSemiMajorAxis 
//  * @param {*} previousBodyMass 
//  * @param {*} currentBodyMass 
//  * @param {*} centralBodyMass 
//  * @returns 
//  */
// function objectSystemBuilderComputeMutualHillRadius(previousBodyComputedSemiMajorAxis, currentBodyGuessedSemiMajorAxis, previousBodyMass, currentBodyMass, centralBodyMass) {
//    return ((previousBodyComputedSemiMajorAxis + currentBodyGuessedSemiMajorAxis) / 2) * ((previousBodyMass + currentBodyMass) / (3 * centralBodyMass))^(1/3);
// }

// /**
//  * Semi major axis guess must be done using Titius-bode, power law or logarithmic distribution
//  * 
//  * @param {[float,float]} mutualHillRadiusFactorRange [min, max], default [3,5]
//  * @param {float} centralBodyMass in solar mass
//  * @param {float[]} massOfOrbitingBodies in earth mass
//  * @param {float} innerMostBodySemiMajorAxis in AU
//  * @param {{name:"logarithmicDistribution", rateOfSpacing:float} | {name:"powerLawDistribution", semiMajorAxisScale:float, rateOfSpacing:float} | {name:"titiusBodeLaw", scalingFactor: float, constantFactor:float}} algorithmParam 
//  * @returns {float[]} semi major axis for inner system bodies
//  */
// function objectSystemBuilderComputeStarSystemOrbitalBodiesSemiMajorAxisHillStability (mutualHillRadiusFactorRange=[3,5], centralBodyMass, massOfOrbitingBodies, innerMostBodySemiMajorAxis, algorithmParam={name:"logarithmicDistribution", rateOfSpacing:1}) {
//   let semiMajorAxis = [];
//   if (algorithmParam.name === "logarithmicDistribution") {
//     semiMajorAxis.concat(objectSystemBuilderComputeInnerSystemBodiesSemiMajorAxisUsingLogarithmicDistribution(innerMostBodySemiMajorAxis, algorithmParam.rateOfSpacing, massOfOrbitingBodies.length));
//   } else if (algorithmParam.name="powerLawDistribution") {
//     semiMajorAxis.concat(objectSystemBuilderComputeInnerSystemBodiesSemiMajorAxisUsingPowerLawDistribution(algorithmParam.semiMajorAxisScale, algorithmParam.rateOfSpacing, massOfOrbitingBodies.length));
//   } else if (algorithmParam.name="titiusBodeLaw") {
//     semiMajorAxis.concat(objectSystemBuilderComputeInnerSystemBodiesSemiMajorAxisUsingTitiusBodeLaw(innerMostBodySemiMajorAxis, algorithmParam.scalingFactor, algorithmParam.constantFactor, massOfOrbitingBodies.length));
//   } else {
//     console.error("Algorithm choice error : algorithm choised : "+algorithmChoice);
//     alert("Algorithm choice error ! Check console (F12) for more information");
//   }
//   // Choice of hill radius factor from range
//   const hillRadiusFactorRange = (Math.random() * (mutualHillRadiusFactorRange[1] - mutualHillRadiusFactorRange[0])) + mutualHillRadiusFactorRange[0];
//   // Calculate each body semi-major axis
//   for (let bodyIndex = 0; bodyIndex < massOfOrbitingBodies.length-1; bodyIndex++) {
//     const previousBodyMass = massOfOrbitingBodies[bodyIndex];
//     const previousBodyComputedSemiMajorAxis = semiMajorAxis[bodyIndex];
//     const currentBodyMass = massOfOrbitingBodies[bodyIndex+1];
//     const currentBodyGuessedSemiMajorAxis = semiMajorAxis[bodyIndex+1];
//     // Calculate Mutual hill radius
//     const mutualHillRadius = objectSystemBuilderComputeMutualHillRadius(previousBodyComputedSemiMajorAxis, currentBodyGuessedSemiMajorAxis, previousBodyMass, currentBodyMass, centralBodyMass);
//     semiMajorAxis[bodyIndex+1] = mutualHillRadius * hillRadiusFactorRange + massOfOrbitingBodies[bodyIndex];
//     // Calculate semi-major axis
//   }
//   return semiMajorAxis;
// }

// function objectSystemBuilderComputeInnerPlanetarySystemOrbitalBodiesSemiMajorAxisHillStability (mutualHillRadiusFactorRange=[3,5], starBodyMass, planetBodyMass, massOfOrbitingMoonBodies, hillRadiusMoonStabilityRatio=0.5, innerMostBodySemiMajorAxis, algorithmParam={name:"logarithmicDistribution", rateOfSpacing:1}) {
//   // Calculating the planet Hill radius
//   const planetHillRadius = objectSystemBuilderComputeHillRadius(innerMostBodySemiMajorAxis, planetBodyMass, starBodyMass);
//   // Determining Maximum Orbital Radius for Moons
//   const maximumMoonSemiMajorAxis = hillRadiusMoonStabilityRatio * planetHillRadius;
//   // Determining initial semi major axis using algorithm
//   let semiMajorAxis = [];
//   if (algorithmParam.name === "logarithmicDistribution") {
//     semiMajorAxis.concat(objectSystemBuilderComputeInnerSystemBodiesSemiMajorAxisUsingLogarithmicDistribution(innerMostBodySemiMajorAxis, algorithmParam.rateOfSpacing, massOfOrbitingBodies.length));
//   } else if (algorithmParam.name="powerLawDistribution") {
//     semiMajorAxis.concat(objectSystemBuilderComputeInnerSystemBodiesSemiMajorAxisUsingPowerLawDistribution(algorithmParam.semiMajorAxisScale, massOfOrbitingBodies.length, maximumMoonSemiMajorAxis));
//   } else if (algorithmParam.name="titiusBodeLaw") {
//     semiMajorAxis.concat(objectSystemBuilderComputeInnerSystemBodiesSemiMajorAxisUsingTitiusBodeLaw(innerMostBodySemiMajorAxis, algorithmParam.scalingFactor, algorithmParam.constantFactor, massOfOrbitingBodies.length));
//   } else {
//     console.error("Algorithm choice error : algorithm choised : "+algorithmChoice);
//     alert("Algorithm choice error ! Check console (F12) for more information");
//   }
// }

// /**
//  * Returns list of semi-major axis for orbiting body using logarithmic distribution
//  * 
//  * @param {float} semiMajorAxisScale is a constant that scales the distance positive float in AU
//  * @param {float} rateOfSpacing is a constant that determines the rate of spacing. (positive float)
//  * @param {int} numberOfOrbitingBodies is the planet number (positive int)
//  * @returns {float[]} semi major axis list for the n bodies
//  */
// function objectSystemBuilderComputeInnerSystemBodiesSemiMajorAxisUsingPowerLawDistribution(semiMajorAxisScale, numberOfOrbitingBodies, maximumMoonSemiMajorAxis) {
//   let semiMajorAxis = [];
//   for (let index = 0; index < numberOfOrbitingBodies; index++) {
//     semiMajorAxis.push(semiMajorAxisScale * Math.pow(maximumMoonSemiMajorAxis / semiMajorAxisScale, index / numberOfOrbitingBodies));
//   }
//   return semiMajorAxis;
// }

// /**
//  * Returns list of semi-major axis for orbiting body using power law distribution
//  * 
//  * @param {float} semiMajorAxisScale is a constant that scales the distance positive float in AU
//  * @param {float} rateOfSpacing is a constant that determines the rate of spacing. (positive float)
//  * @param {int} numberOfOrbitingBodies is the planet number (positive int)
//  * @returns semi major axis list for the n bodies
//  */
// function objectSystemBuilderComputeInnerPlanetarySystemBodiesSemiMajorAxisUsingPowerLawDistribution(semiMajorAxisScale, rateOfSpacing, numberOfOrbitingBodies, planetRadius) {
//   let semiMajorAxis = [];
//   for (let index = 0; index < numberOfOrbitingBodies; index++) {
//     semiMajorAxis.push(planetRadius * (semiMajorAxisScale) * Math.exp(rateOfSpacing*index));
//   }
//   return semiMajorAxis;
// }

// /**
//  * Returns list of semi-major axis for orbiting body using power law distribution
//  * 
//  * @param {float} innerMostBodySemiMajorAxis is the semi-major axis of the innermost planet (positive float in AU)
//  * @param {float} rateOfSpacing is a constant that determines the rate of spacing (positive float)
//  * @param {int} numberOfOrbitingBodies is the planet number (positive int)
//  * @returns semi major axis list for the n bodies
//  */
// function objectSystemBuilderComputeInnerSystemBodiesSemiMajorAxisUsingLogarithmicDistribution(innerMostBodySemiMajorAxis, rateOfSpacing, numberOfOrbitingBodies) {
//   let semiMajorAxis = [innerMostBodySemiMajorAxis];
//   for (let index = 1; index < numberOfOrbitingBodies; index++) {
//     semiMajorAxis.push(innerMostBodySemiMajorAxis * Math.pow(index, rateOfSpacing));
//   }
//   return semiMajorAxis;
// }

// /**
//  * Returns list of semi-major axis for orbiting body using power law distribution
//  * 
//  * @param {float} innerMostBodySemiMajorAxis is the semi-major axis of the innermost planet (positive float in AU)
//  * @param {float} rateOfSpacing is a constant that determines the rate of spacing (positive float)
//  * @param {int} numberOfOrbitingBodies is the planet number (positive int)
//  * @returns semi major axis list for the n bodies
//  */
// function objectSystemBuilderComputeInnerPlanetarySystemBodiesSemiMajorAxisUsingLogarithmicDistribution(innerMostBodySemiMajorAxis, rateOfSpacing, numberOfOrbitingBodies, planetRadius) {
//   let semiMajorAxis = [innerMostBodySemiMajorAxis];
//   for (let index = 0; index < numberOfOrbitingBodies; index++) {
//     semiMajorAxis.push(planetRadius * Math.exp((index / (numberOfOrbitingBodies - 1)) * Math.log(/planetRadius)));
//   }
//   return semiMajorAxis;
// }

/**
 * Store filled input fields with data
 */
function objectSystemBuilderStoreFilledData() {
  const table = document.getElementById("system-builder-wizard-table");
  table.querySelectorAll("tbody > tr").forEach(row => {
    const objectId = row.getAttribute("objectid");
    const object = findObjectInWizardObjectSystemStore(objectId);
    row.querySelectorAll("td > input").forEach(input => {
      const attrName = input.getAttribute("objectproperty");
      if(input.value !== object[attrName]) {
        (object.modifiedData ??= {})[attrName] = input.value;;
      }
    });
  });
}

function objectSystemBuilderResetStoredData() {
  const table = document.getElementById("system-builder-wizard-table");
  table.querySelectorAll("tbody > tr").forEach(row => {
    const objectId = row.getAttribute("objectid");
    const object = findObjectInWizardObjectSystemStore(objectId);
    row.querySelectorAll("td > input").forEach(input => {
      object.modifiedData = {};
    });
  });
}

/**
 * Generate orbits within star systems
 */
function objectSystemBuilderGenerateSystem(calculationMethod, estimationMethod) {
  let isReadyToGenerate = false;
  // To use Kepler 3rd Law
  // if(method === "kepler-3rd-law") {
  //   // Check data before generating system
  //   const kepler3rdLawMissingData = objectSystemBuilderCheckForMandatoryMissingDataToUseKeplerThirdLaw();
  //   if(kepler3rdLawMissingData.missingData) {
  //     const randomGenerate = confirm("You are missing following data to use Kepler 3rd law to calculate object orbit radii (object semi-major axes) :\n\n" + kepler3rdLawMissingData.message + "\n\nDo you want to pseudo-random generate them ?\n\nIf you don't have them and don't want to random fill/generate them consider using the next methods to complete system generation");
  //     if(randomGenerate) {
  //       // TODO : find masses function of object types and diameters
  //       objectSystemBuilderGenerateMassesOfObject();
  //       // TODO : generate orbital periods
  //       const message = objectSystemBuilderFindObjectsSemiMajorAxisUsingKeplerThirdLaw(wizardObjectSystemStore[objectSystemWizard.currentSystemIndex]);
  //       alert(message);
  //       isReadyToGenerate = true;
  //     }
  //   }
  // // Else other methods
  // else if (method === "hill-radius-power-law") {

  // }
  // else if (method === "hill-radius-logarithm-distribution") {

  // }
  if (estimationMethod === "titius-bode-law") {
    // Check prerequisites
    isReadyToGenerate = objectSystemBuilderCheckPrerequisitesTitiusBodeLaw();
  } else if (estimationMethod === "power-law") {
    // Check prerequisites
  } else if (estimationMethod === "logarithmic-distribution") {
    // Check prerequisites
  } else if (calculationMethod === "kepler-3rd-law") {
    // Check prerequisites
  } else {
    alert(`Estimation method ${estimationMethod} unknown`);
    return;
  }
  if (calculationMethod === "kepler-3rd-law") {
    // Check prerequisites
  } else if (calculationMethod === "hill-radius") {
    // Check prerequisites
  } else if (calculationMethod !== "none") {
    alert(`Calculation method ${calculationMethod} unknown`);
    return;
  }
  // Draw on canvas
  if(isReadyToGenerate) {
    const system = wizardObjectSystemStore[objectSystemWizard.currentSystemIndex];
    console.log(system);
    objectSystemBuilderGenerateMassesOfSystemObject(system);
    if(estimationMethod === "titius-bode-law" && calculationMethod === "none") {
      objectSystemBuilderGenerateSystemUsingTitiusBodeLaw(system);
    }
    console.log(system);
    
    drawSystemBuilderCanvas();
  }
}

/**
 * Pseudo random generate object masses function of object type/subtype and diameter (is diameter is unknown random generate it)
 */
function objectSystemBuilderGenerateMassesOfSystemObject(system) {
  // Generate masses of star type objetcs
  objectSystemBuilderGenerateBaseDataOfStarTypeObjects(system);
  console.log(system);
  // Generate masses of non star objects
  const maxNonStarMassInSolarMass = objectSystemBuilderEstimateNonStarTotalMass(system);
  const maxNonStarMassInEarthMass = maxNonStarMassInSolarMass * 333030;
  console.log("Non star total mass in solar mass : ", maxNonStarMassInSolarMass);
  console.log("Non star total mass in earth mass : ", maxNonStarMassInEarthMass);
  const MAX_PLANET_ITERATIONCOUNT = 100000;
  let planetIterationCount = 0;
  let maxNonStarMassInEarthMassLeft;
  do {
    maxNonStarMassInEarthMassLeft = objectSystemBuilderGenerateMassesOfNonStarTypeObjects(system, maxNonStarMassInEarthMass);
    planetIterationCount++;
  } while (maxNonStarMassInEarthMassLeft < 0 || planetIterationCount >= MAX_PLANET_ITERATIONCOUNT )
  console.log("System generated !", system);
}

/**
 * Estimate non star total mass
 */
function objectSystemBuilderEstimateNonStarTotalMass(object, nonStarTotalMass = 0) {
  let objectFound = false;
  if(object.objectType === "Star") {
    for (const [key, value] of Object.entries(wizardSystemGeneratorDatabase["star"])) {
      if(value["starClasses"] !== undefined) {
        for (const [subKey, subValue] of Object.entries(value["starClasses"])) {
          if(subValue.codes.includes(
            object.modifiedData?.objectTypeClass ? 
              object.modifiedData.objectTypeClass : object.objectTypeClass
          )) {
            objectFound = true;
            break;
          }
        }
      } else {
        if(value.codes.includes(
          object.modifiedData?.objectTypeClass ? 
          object.modifiedData.objectTypeClass : object.objectTypeClass
        )) {
            objectFound = true;
          }
        }
        if(objectFound) {
          const PLANET_MASS_DISTRIBUTION = value["otherBodiesMassDistributionWithinSystem"]["planets"];
          const ESTIMATED_PLANET_MASS_DISTRIBUTION = Math.random() * (PLANET_MASS_DISTRIBUTION[1] - PLANET_MASS_DISTRIBUTION[0]) + PLANET_MASS_DISTRIBUTION[0];
          nonStarTotalMass = nonStarTotalMass + (ESTIMATED_PLANET_MASS_DISTRIBUTION * object.modifiedData.mass);
          break;
      }
    }
  }
  // Inner objects
  for (const innerObject of object.innerObjects) {
    nonStarTotalMass += objectSystemBuilderEstimateNonStarTotalMass(innerObject, nonStarTotalMass);
  }
  return nonStarTotalMass;
}

// maxStarMass to spread max star mass while generating star mass (outer stars are less massives then innner stars)
function objectSystemBuilderGenerateBaseDataOfStarTypeObjects(object, maxStarMass = Infinity) {
  if(object.objectType === "Star") { // Star object
    if(object.objectTypeClass !== "") { // With subclass
      if(object.objectTypeClass.match(/^[O,B,A,F,G,K,M]/)) { // Standard stars
        maxStarMass = oSBGBDoSTOStandardStar(object, maxStarMass);
      } else { // Non standard stars
        maxStarMass = oSBGBDoSTONonStandardStar(object, maxStarMass);
      }
    } else { // No subclass : determining random star class using statistics
      maxStarMass = oSBGBDoSTODetermineStarObject(object, maxStarMass);
    }
    console.log(`${object.name} is now a ${object.objectType} of with ${object.modifiedData?.objectTypeClass || object.objectTypeClass} subclass and has a mass of ${object.modifiedData?.mass} solar mass and a size of ${object.modifiedData?.size} km !`);
  }
  // Inner objects
  for (const innerObject of object.innerObjects) {
    maxStarMass = objectSystemBuilderGenerateBaseDataOfStarTypeObjects(innerObject, maxStarMass);
  }
  return maxStarMass;
}

/**
 * Generate Mass for strandard star with OBAFGKM spectral type
 * @param {*} object 
 */
function oSBGBDoSTOStandardStar (object, maxStarMass) {
  const classes = (object.modifiedData?.objectTypeClass ? object.modifiedData?.objectTypeClass : object.objectTypeClass).split(" ");
  const SPECTRAL_CLASS = classes[0];
  let luminosityClass;
  let generatedStarMass;

  if(classes[1] !== undefined) { // Luminosity class is known
    luminosityClass = classes[1];
  } else { // We pseudo-random choose spectralclasses (may be improved by inverting classes in data i.e. luminosity by spectre)
    const randomNumber = Math.random();
    let cumulativeDistribution = 0;
    for (const [key, value] of Object.entries(wizardSystemGeneratorDatabase["star"])) {
      if(randomNumber >= cumulativeDistribution && randomNumber <= cumulativeDistribution + value.distribution) {
        luminosityClass = key;
        // We get first object with matching mass
        if(maxStarMass >= wizardSystemGeneratorDatabase["star"][luminosityClass]["starClasses"][SPECTRAL_CLASS].massInSolarMass[0]) {
          (object.modifiedData??={}).objectTypeClass = `${SPECTRAL_CLASS} ${luminosityClass}`;
          break;
        }
      }
      cumulativeDistribution += value.distribution;
    }
  }
  // We now know luminosity class and generate mass
  OBJECT_DATA = wizardSystemGeneratorDatabase["star"][luminosityClass]["starClasses"][SPECTRAL_CLASS];
  if(OBJECT_DATA.massInSolarMass[1] > maxStarMass && OBJECT_DATA.massInSolarMass[0] < maxStarMass) {
    generatedStarMass = Math.random() * (maxStarMass - OBJECT_DATA.massInSolarMass[0]) + OBJECT_DATA.massInSolarMass[0];
  } else {
    generatedStarMass = Math.random() * (OBJECT_DATA.massInSolarMass[1] - OBJECT_DATA.massInSolarMass[0]) + OBJECT_DATA.massInSolarMass[0];
  }
  (object.modifiedData??={}).mass = generatedStarMass;
  if(object.size === "" || isNaN(object.size) || object.size < 0) {
    (object.modifiedData??={}).size = (Math.random() * (OBJECT_DATA.sizeRangeInSolarRadius[1] - OBJECT_DATA.sizeRangeInSolarRadius[0]) + OBJECT_DATA.sizeRangeInSolarRadius[0]) * wizardSystemGeneratorDatabase["units"].solarRadius * 2;
  }
  return (object.modifiedData??={}).mass * (
    Math.random * (
      wizardSystemGeneratorDatabase["star"][luminosityClass]["otherBodiesMassDistributionWithinSystem"]["companionStar"][1] - wizardSystemGeneratorDatabase["star"][luminosityClass]["otherBodiesMassDistributionWithinSystem"]["companionStar"][0]
    )
    + wizardSystemGeneratorDatabase["star"][luminosityClass]["otherBodiesMassDistributionWithinSystem"]["companionStar"][0]);
}

/**
 * Generate Mass for NON strandard star ()
 * @param {*} object 
 */
function oSBGBDoSTONonStandardStar(object, maxStarMass) {
  let found = false;
  let generatedStarMass;
  // We search for corresponding code in star database
  for (const [key, value] of Object.entries(wizardSystemGeneratorDatabase["star"])) {
    if(value.codes.includes(object.objectTypeClass)) {
      if(value.massInSolarMass !== undefined && value.sizeRangeInSolarRadius !== undefined) { // mass and size are referenced
        if(value.massInSolarMass[1] > maxStarMass && value.massInSolarMass[0] < maxStarMass) {
          generatedStarMass = Math.random() * (maxStarMass - value.massInSolarMass[0]) + value.massInSolarMass[0];
        } else {
          generatedStarMass = Math.random() * (value.massInSolarMass[1] - value.massInSolarMass[0]) + value.massInSolarMass[0];
        }
        (object.modifiedData??={}).mass = generatedStarMass;
        if(object.size === "" || isNaN(object.size) || object.size < 0) {
          (object.modifiedData??={}).size = (Math.random() * (value.sizeRangeInSolarRadius[1] - value.sizeRangeInSolarRadius[0]) + value.sizeRangeInSolarRadius[0]) * wizardSystemGeneratorDatabase["units"].solarRadius * 2;
        }
        return oSBGBDoSTODetermineCompanionMaxStarMass(object.modifiedData.mass, wizardSystemGeneratorDatabase["star"][key]["otherBodiesMassDistributionWithinSystem"]["companionStar"]);
      } else { // We need to determinate subclass to get its mass
        const randomNumber = Math.random();
        let cumulativeDistribution = 0;
        for (const [subKey, subValue] of Object.entries(wizardSystemGeneratorDatabase["star"][key]["starClasses"])) {
          if(randomNumber >= cumulativeDistribution && randomNumber <= cumulativeDistribution + value.distribution) {
            if(subValue.massInSolarMass[1] > maxStarMass && subValue.massInSolarMass[0] < maxStarMass){
              generatedStarMass = Math.random() * (maxStarMass - subValue.massInSolarMass[0]) + subValue.massInSolarMass[0];
            } else {
              generatedStarMass = Math.random() * (subValue.massInSolarMass[1] - subValue.massInSolarMass[0]) + subValue.massInSolarMass[0];
            }
            (object.modifiedData??={}).mass = generatedStarMass;
            if(object.size === "" || isNaN(object.size) || object.size < 0) {
              (object.modifiedData??={}).size = (Math.random() * (subValue.sizeRangeInSolarRadius[1] - subValue.sizeRangeInSolarRadius[0]) + subValue.sizeRangeInSolarRadius[0]) * wizardSystemGeneratorDatabase["units"].solarRadius * 2;
            }
            // random choose code
            (object.modifiedData??={}).objectTypeClass = subValue.codes[Math.floor(Math.random() * subValue.codes.length)];
            return oSBGBDoSTODetermineCompanionMaxStarMass(object.modifiedData.mass, wizardSystemGeneratorDatabase["star"][key]["otherBodiesMassDistributionWithinSystem"]["companionStar"]);
          }
          cumulativeDistribution += value.distribution;
        }
      }
    }
    for (const [subKey, subValue] of Object.entries(wizardSystemGeneratorDatabase["star"][key]["starClasses"])) { // Iterate subclasses
      if(subValue.codes.includes(object.objectTypeClass)) {
        if(subValue.massInSolarMass[1] > maxStarMass && subValue.massInSolarMass[0] < maxStarMass){
          generatedStarMass = Math.random() * (maxStarMass - subValue.massInSolarMass[0]) + subValue.massInSolarMass[0];
        } else {
          generatedStarMass = Math.random() * (subValue.massInSolarMass[1] - subValue.massInSolarMass[0]) + subValue.massInSolarMass[0];
        }
        (object.modifiedData??={}).mass = generatedStarMass
        if(object.size === "" || isNaN(object.size) || object.size < 0) {
          (object.modifiedData??={}).size = (Math.random() * (subValue.sizeRangeInSolarRadius[1] - subValue.sizeRangeInSolarRadius[0]) + subValue.sizeRangeInSolarRadius[0]) * wizardSystemGeneratorDatabase["units"].solarRadius * 2;
        }
        return oSBGBDoSTODetermineCompanionMaxStarMass(object.modifiedData.mass, wizardSystemGeneratorDatabase["star"][key]["otherBodiesMassDistributionWithinSystem"]["companionStar"]);
      }
    }
  }
}

function oSBGBDoSTODetermineStarObject(object, maxStarMass) {
  let cumulativeDistribution = 0;
  let generatedStarMass;
  let classIterationCount = 0;
  const MAX_CLASS_ITERATIONCOUNT = 10000000;
  const MAX_SUBCLASS_ITERATIONCOUNT = 1000000;

  do {
    const randomNumber = Math.random();
    // Iterate star database
    for (const [key, value] of Object.entries(wizardSystemGeneratorDatabase["star"])) {
      if(randomNumber >= cumulativeDistribution && randomNumber <= cumulativeDistribution + value.distribution) {
        if(value.massInSolarMass !== undefined) { // No sub class is needed
          // Pseudo-random generate mass
          if(value.massInSolarMass[0] <= maxStarMass || classIterationCount >= MAX_CLASS_ITERATIONCOUNT - 1){
            if(classIterationCount >= MAX_CLASS_ITERATIONCOUNT - 1) {
              console.log(`${object.name} mass will exceed parent star mass ! To optimize !`);
            }
            generatedStarMass = Math.random() * ((maxStarMass < value.massInSolarMass[1] ? maxStarMass : value.massInSolarMass[1]) - value.massInSolarMass[0]) + value.massInSolarMass[0];
            (object.modifiedData??={}).mass = generatedStarMass;
            if(object.size === "" || isNaN(object.size) || object.size < 0) {
              (object.modifiedData??={}).size = (Math.random() * (value.sizeRangeInSolarRadius[1] - value.sizeRangeInSolarRadius[0]) + value.sizeRangeInSolarRadius[0]) * wizardSystemGeneratorDatabase["units"].solarRadius * 2;
            }
            (object.modifiedData??={}).objectTypeClass =  value.codes[Math.floor(Math.random() * value.codes.length)];
            classIterationCount = MAX_CLASS_ITERATIONCOUNT;
            
            return oSBGBDoSTODetermineCompanionMaxStarMass(object.modifiedData.mass, wizardSystemGeneratorDatabase["star"][key]["otherBodiesMassDistributionWithinSystem"]["companionStar"]);
          }
        } else { // Sub class needed
          let subclassIterationCount = 0;
          do {
            const classRandomNumber = Math.random();
            let classCumulativeDistribution = 0;
            for (const [subclassKey, subclassValue] of Object.entries(wizardSystemGeneratorDatabase["star"][key]["starClasses"])) {
              if(classRandomNumber <= subclassValue.distribution + classCumulativeDistribution && classRandomNumber >= classCumulativeDistribution) {
                if(subclassValue.massInSolarMass[0] <= maxStarMass || subclassIterationCount >= MAX_SUBCLASS_ITERATIONCOUNT - 1){
                  if(subclassIterationCount >= MAX_SUBCLASS_ITERATIONCOUNT - 1) {
                    console.log(`${object.name} mass will exceed parent star mass ! To optimize !`);
                  }

                  generatedStarMass = Math.random() * ((maxStarMass < subclassValue.massInSolarMass[1] ? maxStarMass : subclassValue.massInSolarMass[1]) - subclassValue.massInSolarMass[0]) + subclassValue.massInSolarMass[0];
                  (object.modifiedData??={}).mass = generatedStarMass;

                  if(object.size === "" || isNaN(object.size) || object.size < 0) {
                    (object.modifiedData??={}).size = (Math.random() * (subclassValue.sizeRangeInSolarRadius[1] - subclassValue.sizeRangeInSolarRadius[0]) + subclassValue.sizeRangeInSolarRadius[0]) * wizardSystemGeneratorDatabase["units"].solarRadius * 2;
                  }

                  (object.modifiedData??={}).objectTypeClass = subclassValue.codes[Math.floor(Math.random() * subclassValue.codes.length)];
                  subclassIterationCount = MAX_SUBCLASS_ITERATIONCOUNT;
                  classIterationCount = MAX_CLASS_ITERATIONCOUNT;
                  const debugVar = wizardSystemGeneratorDatabase["star"][key]["otherBodiesMassDistributionWithinSystem"]["companionStar"];
                  return oSBGBDoSTODetermineCompanionMaxStarMass(object.modifiedData.mass, wizardSystemGeneratorDatabase["star"][key]["otherBodiesMassDistributionWithinSystem"]["companionStar"]);
                }
              }
              classCumulativeDistribution += subclassValue.distribution;
            }
            subclassIterationCount++;
          } while(subclassIterationCount < MAX_SUBCLASS_ITERATIONCOUNT)
        }
      }
      cumulativeDistribution += value.distribution;
    }
    classIterationCount++;
  } while(classIterationCount < MAX_CLASS_ITERATIONCOUNT)
}

function oSBGBDoSTODetermineCompanionMaxStarMass(primaryStarMass, companionStarMassRateRange) {
  return primaryStarMass * (Math.random() * (companionStarMassRateRange[1] - companionStarMassRateRange[0]) + companionStarMassRateRange[0]);
}

/**
 * Return object from wizardObjectSystemStore with id objectId
 * @param {UUIDV7} objectId 
 */
function findObjectInWizardObjectSystemStore(objectId) {
  let objectFound = null;
  wizardObjectSystemStore.forEach(system => {
    objectFound = findObjectInWizardObjectSystemStoreRecursive(objectId, system);
    if(objectFound !== null) {
      return;
    }
  });
  return objectFound;
}

function findObjectInWizardObjectSystemStoreRecursive(objectId, object) {
  if(object.id === objectId) {
    objectFound = object;
    return objectFound;
  } else {
    object.innerObjects.forEach(innerObject => {
      objectFound = findObjectInWizardObjectSystemStoreRecursive(objectId, innerObject);
      if(objectFound !== null) {
        return;
      }
    });
  }
  return objectFound;
}

function objectSystemBuilderGenerateSystemUsingTitiusBodeLaw(system) {
  // console.log(system);
  objectSystemBuilderGenerateSystemUsingTitiusBodeLawRecursive(system.innerObjects);
}

function objectSystemBuilderGenerateSystemUsingTitiusBodeLawRecursive(innerObjects) {
  // Safety factor Base distance is around 10 to 20 times the star's radius
  // This distance ensures that the innermost planet is far enough from the star to avoid extreme tidal forces and high temperatures.
  // Let's use 2 to 28 star radiuses with gauss law
  const K = (gaussianRandom(15, 3) * 2) / 2; // 15 is center, 3 is flatness (*2/2 for positive number)
  const baseDistance = K * (innerObjects[0].size / 2 / wizardSystemGeneratorDatabase["units"].astronomicalUnit); // From diameter in km to radius in AU
  // Spread of planets, arbitrary between 0.1 and 1 AU
  const scalingFactor = (gaussianRandom(0.55, 3) * 2) / 2; //  (*2/2 for positive number)

  for (let index = 0; index < innerObjects.length; index++) {
    const innerObject = innerObjects[index];
    if(innerObject.orbitalRank > 0) {
      const distanceToParentAU = objectSystemBuilderTitiusBodeLaw(innerObject.orbitalRank, baseDistance, scalingFactor);
      (innerObject.modifiedData??={}).distanceToParent = distanceToParentAU * wizardSystemGeneratorDatabase["units"]["astronomicalUnit"];
      console.log(`${innerObject.name} and is ${innerObject.modifiedData.distanceToParent} km away from its parent (${distanceToParentAU} Astronomic Unit)`);
    }
    if(innerObject.innerObjects?.length > 0) {
      objectSystemBuilderGenerateSystemUsingTitiusBodeLawRecursive(innerObject.innerObjects);
    }
  }
}

function objectSystemBuilderGenerateMassesOfNonStarTypeObjects(object, maxNonStarMassInEarthMass) {

  // Non managed and already managed (star like) object types
  if (object.objectType === "Star System" || object.objectType === "Star" || object.objectType === "Planet Barycenter") {
    console.log(`Skipping already computed ${object.name} of type ${object.objectType}`);

  } else if(object.objectType === "Planet" || object.objectType === "Rogue Planet") { // Planet
    const suportedObjectTyClasses = [
      "Terrestrial", "Chthonian Planet", "Carbon Planet", "Coreless Planet", "Gas Giant",
      "Gas Dwarf", "Helium Planet", "Hycean Planet", "Ice Giant", "Ice-Rock Planet", "Ice Planet",
      "Iron Planet", "Lava Planet", "Desert Planet", "Puffy Planet", "Super-puff Planet"
    ];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);

  } else if(object.objectType === "Dwarf Planet") {
    const suportedObjectTyClasses = ["Dwarf Planet"];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);

  } else if(object.objectType === "Moon" || object.objectType === "Rogue Moon") {
    const suportedObjectTyClasses = ["Moon", "Large Moon", "Medium-sized Moon", "Small Moon"];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);

  } else if(object.objectType === "Dwarf Moon") {
    const suportedObjectTyClasses = ["Dwarf Moon"];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);

  } else if(object.objectType === "Asteroid" || object.objectType === "Rogue Asteroid") {
    const suportedObjectTyClasses = ["Asteroid"];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);

  } else if(object.objectType === "Comet" || object.objectType === "Rogue Comet") {
    const suportedObjectTyClasses = ["Comet"];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);

  } else if(object.objectType === "Comet Cluster") {
    const suportedObjectTyClasses = ["Comet"];
    const objectDB = wizardSystemGeneratorDatabase["planet"]["type"].objectType;
    const numberOfBodies = Math.random() * (objectDB["numberOfBodies"][1] - objectDB["numberOfBodies"][0]) + objectDB["numberOfBodies"][1];
    const spaceBetweenBodies = Math.random() * (objectDB["spaceBetweenBodies"][1] - objectDB["spaceBetweenBodies"][0]) + objectDB["spaceBetweenBodies"][1];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);
    // Updating data with multiple comets
    if((object.modifiedData??={}).size !== "") {
      // Approximation of a sphere (the cluster) containing multiple little spheres (the comets) distant to each other (spaceBetweenBodies)
      object.modifiedData.size = 2 * Math.pow((3 * numberOfBodies * (spaceBetweenBodies + object.modifiedData.size)^3) / (4 * Math.PI), 1/3);
    }
    if((object.modifiedData??={}).mass !== "") {
      object.modifiedData.mass *= numberOfBodies;
    }
  } else if(object.objectType === "Cometary Cloud") {
    const suportedObjectTyClasses = ["Comet"];
    const objectDB = wizardSystemGeneratorDatabase["planet"]["type"].objectType;
    const numberOfBodies = Math.random() * (objectDB["numberOfBodies"][1] - objectDB["numberOfBodies"][0]) + objectDB["numberOfBodies"][1];
    // const spaceBetweenBodies = Math.random() * (objectDB["spaceBetweenBodies"][1] - objectDB["spaceBetweenBodies"][0]) + objectDB["spaceBetweenBodies"][1];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);
    // Updating data with multiple comets
    if((object.modifiedData??={}).mass !== "") {
      object.modifiedData.mass *= numberOfBodies;
    }
    // Distance to its primary star must be known to estimate thickess of sphere shell

  } else if(object.objectType === "Asteroid Field") {
    const suportedObjectTyClasses = ["Asteroid"];
    const objectDB = wizardSystemGeneratorDatabase["planet"]["type"].objectType;
    const numberOfBodies = Math.random() * (objectDB["numberOfBodies"][1] - objectDB["numberOfBodies"][0]) + objectDB["numberOfBodies"][1];
    const spaceBetweenBodies = Math.random() * (objectDB["spaceBetweenBodies"][1] - objectDB["spaceBetweenBodies"][0]) + objectDB["spaceBetweenBodies"][1];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);
    if((object.modifiedData??={}).size !== "") {
      // Approximation of a sphere (the field) containing multiple little spheres (the asteroids) distant to each other (spaceBetweenBodies)
      object.modifiedData.size = 2 * Math.pow((3 * numberOfBodies * (spaceBetweenBodies + object.modifiedData.size)^3) / (4 * Math.PI), 1/3);
    }
    if((object.modifiedData??={}).mass !== "") {
      object.modifiedData.mass *= numberOfBodies;
    }

  } else if(object.objectType === "Asteroid Belt") {
    const suportedObjectTyClasses = ["Asteroid"];
    const objectDB = wizardSystemGeneratorDatabase["planet"]["type"].objectType;
    const numberOfBodies = Math.random() * (objectDB["numberOfBodies"][1] - objectDB["numberOfBodies"][0]) + objectDB["numberOfBodies"][1];
    // const spaceBetweenBodies = Math.random() * (objectDB["spaceBetweenBodies"][1] - objectDB["spaceBetweenBodies"][0]) + objectDB["spaceBetweenBodies"][1];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);
    if((object.modifiedData??={}).mass !== "") {
      object.modifiedData.mass *= numberOfBodies;
    }
    // Distance to its primary star must be known to estimate thickess of the belt ring

  } else if(object.objectType === "Protoplanet") {
    const suportedObjectTyClasses = ["Protoplanet"];
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses);

  } else if(object.objectType === "Artificial") {
    if((object.modifiedData??={}).mass !== "") {
      object.modifiedData.mass = 1E-24; // Arbitrary and ridiculously small
    }

  } else if(object.objectType === "") { // We must determine wich object type our object is
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfUnknownPlanetTypeObject(object, maxNonStarMassInEarthMass);

  } else {
    console.log(`${object.objectType} is unmanaged !`);
  }

  if(object.objectType !== "Star System" && object.objectType !== "Star" && object.objectType !== "Planet Barycenter") {
    console.log(`${object.name} is now a ${object.objectType} of with ${object.modifiedData?.objectTypeClass || object.objectTypeClass} subclass and has a mass of ${object.modifiedData?.mass} solar mass and a size of ${object.modifiedData?.size} km !`);
    console.log(`Non star mass left in system : ${maxNonStarMassInEarthMass}`);
  }
  // Inner objects
  for (const innerObject of object.innerObjects) {
    maxNonStarMassInEarthMass = objectSystemBuilderGenerateMassesOfNonStarTypeObjects(innerObject, maxNonStarMassInEarthMass);
  }
  return maxNonStarMassInEarthMass;
}

function objectSystemBuilderGenerateMassesOfUnknownPlanetTypeObject(object, maxNonStarMassInEarthMass){
  const systemDB = wizardSystemGeneratorDatabase["starSystem"];
  const planetDB = wizardSystemGeneratorDatabase["planet"]["type"];
  let possibleObjectClasses;
  // Is system young (in formation) or mature ?
  const youngSystemProbability = Math.random() * (systemDB.youngSystemProbability[1] - systemDB.youngSystemProbability[0]) + systemDB.youngSystemProbability[0];
  let systemProbabilityProperty;
  if(Math.random() <= youngSystemProbability) { // System is in formation
    systemProbabilityProperty = "probabilityOfAppearanceInYoungStarSystem";
  } else { // System is mature
    systemProbabilityProperty = "probabilityOfAppearanceInStarSystem";
  }

  // Total probability
  let totalProbability = 0;
  for (const key in planetDB) {
    totalProbability += planetDB[key][systemProbabilityProperty];
  }
  // Choosing body
  let choosedObjectSubType;
  const randomNumber = Math.random();
  let cumulativeDistribution = 0;
  for (const key in planetDB) {
    if(randomNumber >= cumulativeDistribution && randomNumber < planetDB[key][systemProbabilityProperty] + cumulativeDistribution) {
      choosedObjectSubType = key;
    }
  }
  if(planetDB[choosedObjectSubType].parent === null) {
    (object.modifiedData??={}).objectType = choosedObjectSubType;
  } else {
    (object.modifiedData??={}).objectTypeClass = choosedObjectSubType;
    (object.modifiedData??={}).objectType = planetDB[choosedObjectSubType].parent;
  }

  return  objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, [choosedObjectSubType]);
}

function objectSystemBuilderGenerateMassesOfPlanetTypeObjects(object, maxNonStarMassInEarthMass, suportedObjectTyClasses) {
  if (object.objectTypeClass === "") { // No subclass
    let totalProbability = 0;
    for (const typeClass of suportedObjectTyClasses) {
      totalProbability += wizardSystemGeneratorDatabase["planet"]["type"][typeClass]["probabilityOfAppearanceInStarSystem"];
    }
    const randomNumber = Math.random();
    let currentProbabilitySum = 0;
    for (const typeClass of suportedObjectTyClasses) {
      if(randomNumber >=  currentProbabilitySum / totalProbability && randomNumber < (currentProbabilitySum + wizardSystemGeneratorDatabase["planet"]["type"][typeClass]["probabilityOfAppearanceInStarSystem"]) / totalProbability) {
        (object.modifiedData??={}).objectTypeClass = typeClass;
        break;
      } else {
        currentProbabilitySum += wizardSystemGeneratorDatabase["planet"]["type"][typeClass]["probabilityOfAppearanceInStarSystem"];
      }
    }
  }
  // Subclass
  const objectTypeClass = object.objectTypeClass === "" ? object.modifiedData.objectTypeClass : object.objectTypeClass;
  if (suportedObjectTyClasses.includes(objectTypeClass)) {
    const objectDB = wizardSystemGeneratorDatabase["planet"]["type"][objectTypeClass];
    if ((object.modifiedData??={}).mass === "" && object.size === "") { // mass and size are unknown
      const massInEarthMass = (Math.random() * (objectDB.massInEarthMass[1] - objectDB.massInEarthMass[0]) + objectDB.massInEarthMass[0]);
      (object.modifiedData??={}).mass = massInEarthMass * wizardSystemGeneratorDatabase["units"].earthMass / wizardSystemGeneratorDatabase["units"].solarMass;
      const massInGram = massInEarthMass * wizardSystemGeneratorDatabase["units"].earthMass * 1000;
      const volume = massInGram / (Math.random() * (objectDB.density[1] - objectDB.density[0]) + objectDB.density[1]); // in cm³
      object.modifiedData.size = Math.pow((3*volume/(4*Math.PI)), 1/3) * 2 / 100000; // diameter in km;
      return maxNonStarMassInEarthMass - (object.modifiedData.mass * wizardSystemGeneratorDatabase["units"].earthMass / wizardSystemGeneratorDatabase["units"].solarMass);
    } else {
      if(object.size !== "") {
        // diameter in km is known
        const volume = 4/3 * Math.PI * (parseFloat(object.size) / 2 * 100000)^3; // Sphere volume with radius in cm from km
        const density = Math.random() * (objectDB.density[1] - objectDB.density[0]) + objectDB.density[0];
        // Mass in solar mass
        (object.modifiedData??={}).mass = volume * density / (1000 * wizardSystemGeneratorDatabase["units"].solarMass)
        return maxNonStarMassInEarthMass - (object.modifiedData.mass * wizardSystemGeneratorDatabase["units"].earthMass / wizardSystemGeneratorDatabase["units"].solarMass);

      } else if ((object.modifiedData??={}).mass !== "") {
        // Mass is known
        const density = Math.random() * (objectDB.density[1] - objectDB.density[0]) + objectDB.density[0];
        const volume = (parseFloat(object.mass) * 100000 / density); // volume in cm³
        (object.modifiedData??={}).size = Math.pow((3*volume/(4*Math.PI)), 1/3) * 2 * 100000; // diameter in km
        return maxNonStarMassInEarthMass - (object.mass * wizardSystemGeneratorDatabase["units"].earthMass / wizardSystemGeneratorDatabase["units"].solarMass);
      }
    }
    
  } else {
    console.log(`${objectTypeClass} is unmanaged !`);
    return maxNonStarMassInEarthMass;
  }
}