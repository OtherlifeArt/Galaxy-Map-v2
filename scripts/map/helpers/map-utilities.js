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