/**
 * Utilities for leaflet
 */

/*
  Used to reverse x and y coordinates
  because leaflet use (y,x) instead of (x,y)
*/
function xy2latlng (x, y) {
  if (L.Util.isArray(x)) {    // When doing xy([x, y]);
      return L.latLng(x[1], x[0]);
  }
  return L.latLng(y, x);  // When doing xy(x, y);
};

/* Reverse xy2latlng function */
function latlng2xy (latlng) {
  if (L.Util.isArray(latlng)) {    // When doing xy([x, y]);
    return {x: latlng[1], y: latlng[0]};
  }
  return [latlng.lng, latlng.lat];
}

/* List to URL in HTML anchor element*/
function arrayToURL(array) {
  let urlList = "";
  for (const url of array) {
    urlList += '<a href="'+url+'">URL</a>';
  }
  return urlList;
}

/* Return full continuity for object (Canon/Legends/Unlicensed) */
function getContinuity(properties) {
  let continuity = "";
  if(properties.CANON === "YES") {
    continuity += "Canon";
  }
  if(properties.LEGENDS === "YES") {
    if(continuity !== "") {
      continuity += "/";
    }
    continuity += "Legends";
  }
  if(properties.UNLICENSED === "YES") {
    if(continuity !== "") {
      continuity += "/";
    }
    continuity += "Unlicensed";
  }
  return continuity;
}