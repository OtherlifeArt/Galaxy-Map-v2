function getSystemBuilderCanvas() {
  return document.getElementById("system-builder-preview");
}

/**
 * Draw (again) all canvas elements
 */
function drawSystemBuilderCanvas() {
  const canvas = getSystemBuilderCanvas();
  // Get system most distant object (probably outer body or sattelite)
  const maxDistance = systemBuilderGetSystemMaxDistance();
  console.log(maxDistance);
  // Recursive Iterate system and call draw functions for orbits and bodies
}

/**
 * Return system most distant object distance to parent
 */
function systemBuilderGetSystemMaxDistance() {
  const system = wizardObjectSystemStore[objectSystemWizard.currentSystemIndex];
  const mostDistantObject = systemBuilderGetSystemMaxDistanceRecusive(system);
  return mostDistantObject;
}
function systemBuilderGetSystemMaxDistanceRecusive(currentObject, maxDistance = -1) {
  let distance = -1;
  for (const innerSystemObject of currentObject.innerObjects) {
    if(!isNaN(innerSystemObject.distanceToParent)) {
      if(!isNaN(parseFloat(innerSystemObject.distanceToParent))) {
        distance = innerSystemObject.distanceToParent;
        distance += systemBuilderGetSystemMaxDistanceRecusive(innerSystemObject, distance);
      }
      if(distance > maxDistance) {
        maxDistance = distance;
      }
    }
  }
  return maxDistance;
}

/**
 * 
 */
function drawTextInfoOnCanvas () {

}

/**
 * Draw orbit
 */
function drawOrbitOnCanvas () {

}

/**
 * Draw scale
 */
function drawScaleOnCanvas () {

}

/**
 * Draw planet
 */
function drawPlanetOnCanvas () {

}

/**
 * Draw ring
 */
function drawRingOnCanvas () {

}

/**
 * Draw star
 */
function drawStarOnCanvas () {

}

/**
 * Draw comet
 */
function drawCometOnCanvas () {

}

/**
 * 
 */
function drawAsteroidOnCanvas () {

}

/**
 * Draw fields
 */
function drawFieldOnCanvas () {

}

/**
 * 
 */
function drawHillSphereOnCanvas () {

}

/**
 * 
 */
function drawCircumstellarHabitableZoneOnCanvas () {

}

/**
 * Draw circle
 */
function drawCircleOnCanvas () {

}