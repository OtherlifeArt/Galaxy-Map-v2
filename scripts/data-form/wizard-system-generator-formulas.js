/**
 * Browse system and check for mandatory data
 */
function objectSystemBuilderCheckForMandatoryData(currentObject, mandatoryData, generateMissingData=false) {
  let message = "";
  // Check for mandatory data
  if(currentObject.objectType !== "Star System"){
    mandatoryData.forEach(data => {
      // We don't check for barycenter mass
      if((currentObject.objectType === "Star Barycenter" || currentObject.objectType === "Planet Barycenter") && data === "mass") {
        return;
      }
      if((currentObject[data] === undefined || currentObject[data] === "") && (currentObject.modifiedData?.[data] === undefined || currentObject.modifiedData?.[data] === "")) {
        message += `${currentObject.name} : ${data}\n`;
      }
    });
  }
  // Recursion for inner objects
  currentObject.innerObjects.forEach(innerObject => {
    const result = objectSystemBuilderCheckForMandatoryData(innerObject, mandatoryData, generateMissingData);
    message += result.message;
  });
  return { 
    missingData: message !== "",
    message,
  };
}

/**
 * Mandatory DATA Check function to use Kepler 3rd law
 */
function objectSystemBuilderCheckForMandatoryMissingDataToUseKeplerThirdLaw() {
  const mandatoryData = ["mass", "lengthOfYear", "orbitalRank"];
  const currentSystem = wizardObjectSystemStore[objectSystemWizard.currentSystemIndex];
  console.log(currentSystem);
  return objectSystemBuilderCheckForMandatoryData(currentSystem, mandatoryData);
}

/**
 * Generate Object semi major Axis Using Kepler Third Law (we generate semi major axis for orbital ranks)
 * 
 * @param {*} currentObject 
 * @returns 
 */
function objectSystemBuilderFindObjectsSemiMajorAxisUsingKeplerThirdLaw(currentObject, currentParentObject=null) {
  let message = "";
  if(currentObject.objectType !== "Star System"){
    const AU = 149597870.7; // Astronomical units in kms
    const YEAR_IN_DAYS = 365.25;
    const CENTRAL_OBJECT_MASSES = objectSystemBuilderFindCentralSystemObjectsMasses(currentObject, currentParentObject);
    const SAME_ORBITAL_RANK_OBJECT_MASSES = objectSystemBuilderFindSameOrbitalRankObjectMasses(currentParentObject, currentObject.orbitalRank);
    currentObject.distanceToParent = AU * objectSystemBuilderComputeObjectSemiMajorAxisUsingKepler3rdLaw(CENTRAL_OBJECT_MASSES, SAME_ORBITAL_RANK_OBJECT_MASSES, currentObject.lengthOfYear / YEAR_IN_DAYS);
    message += `Parent ${currentParentObject} Orbital rank ${currentObject.orbitalRank} distance to parent : ${currentObject.distanceToParent} km`;
  }
  let alreadyComputedOrbitalRanks = []; // Permit to store already computed radius for orbital rank
  for (let index = 0; index < currentObject.innerObjects.length; index++) {
    const innerObject = currentObject.innerObjects[index];
    if(!alreadyComputedOrbitalRanks.includes(innerObject.orbitalRank)) {
      alreadyComputedOrbitalRanks.push(innerObject.orbitalRank);
      message += objectSystemBuilderFindObjectsSemiMajorAxisUsingKeplerThirdLaw(innerObject, currentObject);
    }
  }
  return message;
}

/**
 * Return object semi-major axis using Kepler 3rd law formula
 * 
 * @param {float} innerObjectMasses (in solar masses) if multiple objects, add their masses
 * @param {float} sameOrbitalRankObjectMasses (in solar masses)
 * @param {float} orbitalPeriod (in years)
 * @returns {float} object semi-major axis in AU (astronomical units, 1 AU = sun-earth distance)
 */
function objectSystemBuilderComputeObjectSemiMajorAxisUsingKepler3rdLaw(innerObjectMasses, sameOrbitalRankObjectMasses, orbitalPeriod) {
  const G = 39.47841760435743;  // Gravitational constant in appropriate units
  const aCubed = (G * (innerObjectMasses + sameOrbitalRankObjectMasses) * (orbitalPeriod^2)) / ( 4 * (Math.PI^2));
  return aCubed^(1/3);
}


/**
 * Returns total mass of objects being at a lesser orbital position than current object
 * 
 * @param {*} currentObject 
 * @param {*} currentParentObject 
 * @param {*} objectOrbitalRank 
 * @returns 
 */
function objectSystemBuilderFindCentralSystemObjectsMasses(currentObject, currentParentObject, objectOrbitalRank=-1) {
  // In all case we search for central massive object with orbital rank lesser than current object and barycenters
  let totalMass = 0;
  if(objectOrbitalRank === -1) {
    objectOrbitalRank = currentObject.orbitalRank; // Init
  }
  currentParentObject.innerObjects.forEach(innerObject => {
    if(innerObject.orbitalRank < objectOrbitalRank) {
      totalMass += innerObject.mass;
      innerObject.innerObjects.forEach(innerInnerObject => {
        totalMass += objectSystemBuilderFindCentralSystemObjectsMasses(innerInnerObject, innerObject, Infinity)
      });
    }
  });
  return totalMass;
}

/**
 * Returns total mass of object at same orbital position and its inner system ones
 * 
 * @param {*} currentParentObject 
 * @param {*} objectOrbitalRank 
 * @returns 
 */
function objectSystemBuilderFindSameOrbitalRankObjectMasses(currentParentObject, objectOrbitalRank) {
  let totalMass = 0;
  currentParentObject.innerObjects.forEach(innerObject => {
    if(objectOrbitalRank === -1 || innerObject.orbitalRank === objectOrbitalRank) {
      totalMass += innerObject.mass;
      totalMass += objectSystemBuilderFindSameOrbitalRankObjectMasses(innerObject, -1);
    }
  });
  return totalMass;
}

