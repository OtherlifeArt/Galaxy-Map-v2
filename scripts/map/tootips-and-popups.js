/**
 * Here we display tooltips and popups
 */

// Display tooltip on click
function pointDisplayPopup(e) {
  let layer = e.target;
  let feature = layer.feature;

  let fullName = feature.properties.NAME;
  let continuity = getContinuity(feature.properties);
  // ALT NAMES
  if (feature.properties['ALT_NAMES (/ separated']){
    console.log(feature.properties['ALT_NAMES (/ separated']);
    fullName = fullName + "/" + feature.properties['ALT_NAMES (/ separated'];
  }
  // URL
  if(feature.properties["URLS (sources)"]) {
    fullName = stringListToURL(feature.properties["URLS (sources)"], fullName);
  }
  let text = '<h2>'+fullName+'</h2><div>';

  if (feature.properties.GEOM_TYPE){
    text+= '<p><i>'+ feature.properties.GEOM_TYPE + '</i></p>';
  }
  // TYPE and TYPE class
  if (feature.properties.TYPE){
    if (feature.properties.TYPE_CLASSES){
      text+= '<p><b>Type class : </b>' + feature.properties.TYPE_CLASSES + ' (' + (feature.properties.TYPE) + ')' + '</p>';
    } else {
      text+= '<p><b>Type : </b>'+ feature.properties.TYPE + '</p>';
      }
  }
  // PARENT
  if (feature.properties.PARENT){
    text+= '<p><b>Parent : </b>'+ feature.properties.PARENT.replace(" < The Galaxy < The Galaxy local group < The universe", "") + '</p>';
  }
  // Continuity
  text+= '<p><b>Continuity : </b>'+ continuity + '</p>';
  // Grid
  if (feature.properties.X_GRID !== "" && feature.properties.Y_GRID){
    text+= '<p><b>Grid : </b>'+ feature.properties.X_GRID + '-' + feature.properties.Y_GRID + '</p>';
  }
  // Star system details
  if(feature.properties.starSystemHierarchy?.length > 0){
    text += '<p><b>Star system details: </b>';
    text += popupFormatStarSystemHierarchy(feature.properties.starSystemHierarchy);
    text += '</p>';
  }
  text+='</div>'
  
  // [y,x] function of zoom level
  let zoomLevel = map.getZoom();
  let popupDisplacement = [feature.geometry.coordinates[1] + 380 / Math.pow(2, zoomLevel+4), feature.geometry.coordinates[0] - 125 / Math.pow(2, zoomLevel+4)];

  L.popup()
    .setLatLng(popupDisplacement)
    .setContent(text)
    .openOn(map);
}

// points.on('click', function(e) {
//   var feature = e.layer.feature;
//     // Do something with the properties, e.g., display in a popup
// });

// Display label on mouseover
function pointDisplayTooltip(e) {
  // console.log(e);
  let layer = e.target;
  // Update tooltip visibility
  layer.openTooltip();
}

// Remove label on mouseout
function pointHideTooltip(e) {
  e.target.layer?.closeTooltip(); // Hide tooltip
}

// Display popup on mouse click
function areaDisplayPopup(e) {
  console.log(e);
  let layer = e.target;
  let feature = layer.feature;

  let fullName = feature.properties.NAME;
  let continuity = getContinuity(feature.properties);

  // ALT NAMES
  if (feature.properties['ALT_NAMES (/ separated']){
    console.log(feature.properties['ALT_NAMES (/ separated']);
    fullName = fullName + "/" + feature.properties['ALT_NAMES (/ separated'];
  }
  // URL
  if(feature.properties["URLS (sources)"]) {
    fullName = stringListToURL(feature.properties["URLS (sources)"], fullName);
  }
  let text = '<h2>'+fullName+'</h2><div>';

  if (feature.properties.GEOM_TYPE){
    text+= '<p><i>'+ feature.properties.GEOM_TYPE + '</i></p>';
  }
  // TYPE and TYPE class
  if (feature.properties.TYPE){
    if (feature.properties.TYPE_CLASSES){
      text+= '<p><b>Type class : </b>' + feature.properties.TYPE_CLASSES + ' (' + (feature.properties.TYPE) + ')' + '</p>';
    } else {
      text+= '<p><b>Type : </b>'+ feature.properties.TYPE + '</p>';
      }
  }
  // PARENT
  if (feature.properties.PARENT){
    text+= '<p><b>Parent : </b>'+ feature.properties.PARENT.replace(" < The Galaxy local group < The universe", "") + '</p>';
  }
  // Continuity
  text+= '<p><b>Continuity : </b>'+ continuity + '</p>';

  let zoomLevel = map.getZoom();
  let latLng;
  if(e.latlng) { // On map click
    // console.log(e.latlng);
    latLng = e.latlng;
  } else { // On map search
    console.log(e.target.feature);
    latLng = calculatePointInMultiPolygon(e.target.feature);
  }
  let popupDisplacement = [latLng.lat + 380 / Math.pow(2, zoomLevel+4), latLng.lng - 125 / Math.pow(2, zoomLevel+4)];
  text+='</div>'
  L.popup()
    .setLatLng(popupDisplacement)
    .setContent(text)
    .openOn(map);
}

// Display tooltip on mouseover
function areaDisplayTooltip(e) {
  let layer = e.target;
  // Update tooltip visibility
  layer.openTooltip();
}

// Hide tooltip on mouseout
function areaHideTooltip(e) {
  e.target.layer?.closeTooltip(); // Hide tooltip
}

// Format star system hierarchy
function popupFormatStarSystemHierarchy(starSystemHierarchyArray) {
  if(starSystemHierarchyArray) {
    // console.log(starSystemHierarchyArray);
    return "<br/>" + (starSystemHierarchyArray.flat()).join('<br/>');
  }
}

/*
points.on('mouseover'), function(e) {
var feature = e.layer.feature;
var tooltip = L.tooltip({
  permanent: false, // Show the tooltip permanently
  direction: 'top', // Position the tooltip above the marker
})
.setContent(features.properties.NAME); // Set the content of the tooltip

this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
}

areas.on('mouseover'), function(e) {
var feature = e.layer.feature;
var tooltip = L.tooltip({
  permanent: false, // Show the tooltip permanently
  direction: 'top', // Position the tooltip above the marker
})
.setContent(features.properties.NAME); // Set the content of the tooltip

this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
}*/


// /** EXAMPLES **/

// /* Location tooltips */

// // We use invisible circle markers to keep tooltip permanent since canves icon layer doesn't work this way
// var m1 = L.circleMarker([-58.86, 128.86], { radius: 0, fillOpacity: 0 }).bindTooltip("Belkadan", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(BelkadanPopup, customOptions).addTo(map);

// /* Routes */
// var pointList = [tyt002, tyt003, tyt004, tyt005, tyt006, tyt007]; // First and last point are taken out so markers are still clickable
// var tythonTrailInvisible = new L.Polyline(pointList, {
//   color: "#262673",
//   weight: 3,
//   opacity: 0,
//   smoothFactor: 1,
//   renderer: L.svg() // Used to render above evrything
// });
// /* Routes tooltips */
// tythonTrailInvisible.bindTooltip("Koros-Tython hyperlane", { permanent: false, direction: 'right', offset: [2, 0], className: 'route-tooltip'});

// /* Routes PopUps */
// var tythonTrailPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Koros-Tython_hyperlane' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmLocationImages/SmNoImage.png' alt='Tython trail' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Hyperroute<br>Start: Koros Major<br>End: Tython<br><hr></div><p><b>Koros-Tython hyperlane</b></p><br>&emsp;&emsp;A hyperlane ran from Koros Major to Tython in the Deep Core.";
// tythonTrailInvisible.bindPopup(tythonTrailPopup, customOptions);
// tythonTrailInvisible.addTo(map);