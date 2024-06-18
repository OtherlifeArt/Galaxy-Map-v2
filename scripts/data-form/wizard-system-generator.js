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
  // Radio boxes to choose method
  // Kepler 3rd law span
  const kepler3rdLawRadioTooltip = document.createElement('span');
  // kepler3rdLawRadioTooltip.classList.add("tooltip");
  // const kepler3rdLawRadioTooltipText = document.createElement('span');
  // kepler3rdLawRadioTooltipText.classList.add("tooltiptext");
  kepler3rdLawRadioTooltip.innerHTML = 
  `In order to use Kepler 3rd Law fomula you need <b>object masses</b> (except for barycenters), <b>length of year, and orbital rank/position</b>.
  <b>Mass</b> can be computed from <b/>object size/diameter<b> and <b>type/type class</b> using statistical data.
  If a large amount of above mandatory data are missing, consider using any of Hill Radius method`;
  // Kepler 3rd law radio button
  const kepler3rdLawRadio = document.createElement('input');
  kepler3rdLawRadio.type = 'radio';
  kepler3rdLawRadio.id = 'system-builder-kepler-3rd-law-radio';
  kepler3rdLawRadio.name = 'system-builder-method';  // Shared name for the radiogroup
  kepler3rdLawRadio.value = 'kepler-3rd-law';
  kepler3rdLawRadio.checked = true;
  // Label for Kepler 3rd law radio button
  const kepler3rdLawRadioLabel = document.createElement('label');
  kepler3rdLawRadioLabel.htmlFor = 'system-builder-kepler-3rd-law-radio';
  kepler3rdLawRadioLabel.appendChild(document.createTextNode('Kepler 3rd Law'));
  canvasButtonSpan.appendChild(kepler3rdLawRadioTooltip);
  canvasButtonSpan.appendChild(document.createElement("br"));
  canvasButtonSpan.appendChild(kepler3rdLawRadio);
  canvasButtonSpan.appendChild(kepler3rdLawRadioLabel);
  // kepler3rdLawRadioTooltip.appendChild(kepler3rdLawRadioTooltipText);
  // Hill radius with power law radio button
  const hillRadiusWithPowerLawRadio = document.createElement('input');
  hillRadiusWithPowerLawRadio.type = 'radio';
  hillRadiusWithPowerLawRadio.id = 'system-builder-hill-radius-power-law-radio';
  hillRadiusWithPowerLawRadio.name = 'system-builder-method';  // Shared name for the radiogroup
  hillRadiusWithPowerLawRadio.value = 'hill-radius-power-law';
  // Label for Hill radius with power law radio button
  const hillRadiusWithPowerLawRadioLabel = document.createElement('label');
  hillRadiusWithPowerLawRadioLabel.htmlFor = 'system-builder-hill-radius-power-law-radio';
  hillRadiusWithPowerLawRadioLabel.appendChild(document.createTextNode('Hill Radius with Power Law'));
  canvasButtonSpan.appendChild(hillRadiusWithPowerLawRadio);
  canvasButtonSpan.appendChild(hillRadiusWithPowerLawRadioLabel);
  // Hill radius with logarithm distribution
  const hillRadiusWithLogarithmDistributionRadio = document.createElement('input');
  hillRadiusWithLogarithmDistributionRadio.type = 'radio';
  hillRadiusWithLogarithmDistributionRadio.id = 'system-builder-hill-radius-logarithm-distribution-radio';
  hillRadiusWithLogarithmDistributionRadio.name = 'system-builder-method';  // Shared name for the radiogroup
  hillRadiusWithLogarithmDistributionRadio.value = 'hill-radius-logarithm-distribution';
  // Label for  Hill radius with logarithm distribution radio button
  const hillRadiusWithLogarithmDistributionRadioLabel = document.createElement('label');
  hillRadiusWithLogarithmDistributionRadioLabel.htmlFor = 'system-builder-hill-radius-logarithm-distribution-radio';
  hillRadiusWithLogarithmDistributionRadioLabel.appendChild(document.createTextNode('Hill Radius with Logarithm Distribution'));
  canvasButtonSpan.appendChild(hillRadiusWithLogarithmDistributionRadio);
  canvasButtonSpan.appendChild(hillRadiusWithLogarithmDistributionRadioLabel);
  // Generate system button
  const generateSystemButton = document.createElement('button');
  generateSystemButton.innerHTML = 'Generate System';
  generateSystemButton.id = 'system-builder-wizard-generate-system-button';
  generateSystemButton.addEventListener('click', function(){
    const methodRadios = document.getElementsByName('system-builder-method');
    const selectMethod = (Array.from(methodRadios)).find(radio => radio.checked)?.value;
    objectSystemBuilderGenerateSystem(selectMethod);
  });
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
        } else {
          const inputText = document.createElement("input");
          inputText.type = "text";
          inputText.setAttribute("objectProperty", columnKey);
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
//  * Semi major axis guess must be done using tituis-bode, power law or logarithmic distribution
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
 * Generate data for empty but useful/madatory fields/property using random and according to other fields or database
 */
function objectSystemBuilderGeneratePseudoRandomData() {

}

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
function objectSystemBuilderGenerateSystem(method) {
// To use Kepler 3rd Law
  if(method === "kepler-3rd-law") {
    // Check data before generating system
    const kepler3rdLawMissingData = objectSystemBuilderCheckForMandatoryMissingDataToUseKeplerThirdLaw();
    if(kepler3rdLawMissingData.missingData) {
      const randomGenerate = confim("You are missing following data to use Kepler 3rd law to calculate object orbit radii (object semi-major axes) :\n\n" + kepler3rdLawMissingData.message + "\n\nDo you want to pseudo-random genrate them ?\n\nIf you don't have them and don't want to random fill/generate them consider using the next methods to complete system generation");
      if(randomGenerate) {
        // TODO : find masses function of object types and diameters
        // TODO : generate orbital periods
        const message = objectSystemBuilderFindObjectsSemiMajorAxisUsingKeplerThirdLaw(wizardObjectSystemStore[objectSystemWizard.currentSystemIndex]);
        alert(message);
      }
    }
  }
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