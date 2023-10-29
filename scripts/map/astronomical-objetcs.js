/** VARIABLES **/
// CanvasIconLayers for locations with icons and zoom levels
var zoom04CIL = null;
var zoom05CIL = null;
var zoom06CIL = null;
var zoom07CIL = null;
var zoom08CIL = null;
var zoom09CIL = null;
var zoom10CIL = null;
var zoom11CIL = null;
// Display any zoom level astro objects and current zoomlevel ones
var anyZoomCIL = new L.canvasIconLayer({}).addTo(map).addLayers(anyZoomLocationMarkers);
// Open tooltips (labels)
// anyZoomLocationMarkers.forEach((marker) => {
//   marker.openTooltip();
//   marker.on('mouseout', function(e) {
//     alert();
//   });
// });

var zoomLevelCILs = [zoom04CIL,zoom05CIL,zoom06CIL,zoom07CIL,zoom08CIL,zoom09CIL,zoom10CIL,zoom11CIL];
var zoomLevelLocationMarkers = [
  zoom04LocationMarkers, zoom05LocationMarkers, zoom06LocationMarkers, zoom07LocationMarkers,
  zoom08LocationMarkers, zoom09LocationMarkers, zoom10LocationMarkers, zoom11LocationMarkers
];

/** INIT **/
manageCurrentZoomLevel(true);

/** DEBUG/TEST **/

// Independant tooltip try
L.tooltip().setLatLng([-58.86, 128.86]).setContent("Belkadan", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).addTo(map);
L.tooltip().setLatLng([-111.67, 124.73]).setContent("Coruscant (Notron)", { permanent: true, direction: 'left', offset: [-5, 3], className: 'leaflet-tooltip-mov' }).addTo(map);
