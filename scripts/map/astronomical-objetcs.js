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

/** EVENTS **/

/** DEBUG/TEST **/

// Independant and permanent tooltip try
// map.on click make them disappear
// var t1 = L.tooltip().setLatLng([-58.86, 128.86]).setContent("Belkadan", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); t1.addTo(map).openTooltip();;
// var t2 = L.tooltip().setLatLng([-111.67, 124.73]).setContent("Coruscant (Notron)", { permanent: true, direction: 'left', offset: [-5, 3], className: 'leaflet-tooltip-mov' }).addTo(map);
// This one works with circle radius to 0 and opacity 0
var m1 = L.circleMarker([-58.86, 128.86], { radius: 0, fillOpacity: 0 }).bindTooltip("Belkadan", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(BelkadanPopup, customOptions).addTo(map);
