/* Tooltips and popups */

function roadDisplayPopup(e) {
  const layer = e.target;
  const feature = layer.feature;
  const fp = feature.properties;
  const sectionProperties = fp.SECTIONS_PROPERTIES;
  if (debug) {
    console.log(fp);
  }
  let fullName = "";
  // Conjectural Name
  if(fp.CONJECTURAL_NAME && fp.CONJECTURAL_NAME === "YES") {
    fullName += '(?) ';
    
  }
  // Name
  fullName += fp.NAME;
  let continuity = getContinuityString(fp);
  // ALT NAMES
  if (fp['ALT_NAMES']){
    console.log(fp['ALT_NAMES']);
    fullName = fullName + "/" + fp['ALT_NAMES'];
  }
  // URL
  if(fp["URLS"]) {
    fullName = stringListToURL(fp["URLS"], fullName);
  }
  let text = '<h2>'+fullName+'</h2><div>';
  // DATES
  if (fp.DATE_FROM !== "" || fp.DATE_TO != "") {
    text+= '<p><b>Period : </b>' + getDateString(fp) + '</p>';
  }
  // PARENT
  if (fp.PARENT){
    text+= '<p><b>Parent : </b>'+ fp.PARENT + '</p>';
  }
  // Continuity
  text+= '<p><b>Continuity : </b>'+ continuity + '</p>';

  // Road wih travel time
  let roadSectionDetails = "";
  for (let index = 0; index < sectionProperties.length; index++) {
    const roadSection = sectionProperties[index];
    for (let index2 = 0; index2 < roadSection.length; index2++) {
      const roadLocation = roadSection[index2];
      if(index2 === 0) {
        roadSectionDetails += `<pre>${roadLocation.text}`;
      } else if (index2 < roadSection.length - 1) {
        if(roadLocation.averageTravelTime != "") {
          roadSectionDetails += ` <=> ${roadLocation.text} (${(travelTimeToString(roadLocation.averageTravelTime))})</pre><pre>${roadLocation.text}`;
        } else {
          roadSectionDetails += ` <=> ${roadLocation.text}</pre><pre>${roadLocation.text}`;
        }
      } else {
        if(roadLocation.averageTravelTime) {
          roadSectionDetails += ` <=> ${roadLocation.text} (${(travelTimeToString(roadLocation.averageTravelTime))})</pre>`;
        } else {
          roadSectionDetails += ` <=> ${roadLocation.text}</pre>`;
        }
      }
    }
  }
  text+= '<p><b>Road sections : </b><br/>'+ roadSectionDetails + '</p>';

  let zoomLevel = map.getZoom();
  let latLng;
  if(e.latlng) { // On map click
    // console.log(e.latlng);
    latLng = e.latlng;
  } else { // On map search
    console.log(e.target.feature);
    const midpoint = getMidpointOfMiddleSegment(e.target.feature.geometry);
    latLng = L.latLng(midpoint[1], midpoint[0])
  }
  let popupDisplacement = [latLng.lat + 380 / Math.pow(2, zoomLevel+4), latLng.lng - 125 / Math.pow(2, zoomLevel+4)];
  text+='</div>'
  L.popup()
    .setLatLng(popupDisplacement)
    .setContent(text)
    .openOn(map);
}

// Display label on mouseover
function roadDisplayTooltip(e) {
  // console.log(e);
  let layer = e.target;
  // Update tooltip visibility
  layer.openTooltip();
}

// Remove label on mouseout
function roadHideTooltip(e) {
  e.target.layer?.closeTooltip(); // Hide tooltip
}

// Display tooltip on click
function pointDisplayPopup(e) {
  let layer = e.target;
  let feature = layer.feature;
  const fp = feature.properties;
  
  let fullName = "";
  // Conjectural Name
  if(fp.CONJECTURAL_NAME && fp.CONJECTURAL_NAME === "YES") {
    console.log(fp.NAME);
    fullName += '(?) ';
  }
  // Name
  fullName += fp.NAME;
  let continuity = getContinuityString(fp);
  // ALT NAMES
  if (fp['ALT_NAMES (/ separated']){
    console.log(fp['ALT_NAMES (/ separated']);
    fullName = fullName + "/" + fp['ALT_NAMES (/ separated'];
  }
  // URL
  if(fp["URLS (sources)"]) {
    fullName = stringListToURL(fp["URLS (sources)"], fullName);
  }
  let text = '<h2>'+fullName+'</h2><div>';
  // TYPE and TYPE class
  if (fp.TYPE){
    if (fp.TYPE_CLASSES){
      if(fp.CONJECTURAL_TYPE && fp.CONJECTURAL_TYPE === "YES") {
        text+= '<p><b>Type : </b>(?) ' + fp.TYPE_CLASSES + ' (' + (fp.TYPE) + ')' + '</p>';
      } else {
        text+= '<p><b>Type : </b>' + fp.TYPE_CLASSES + ' (' + (fp.TYPE) + ')' + '</p>';
      }
    } else {
      if(fp.CONJECTURAL_TYPE && fp.CONJECTURAL_TYPE === "YES") {
        text+= '<p><b>Type : </b>(?) '+ fp.TYPE + '</p>';
        
      } else {
        text+= '<p><b>Type : </b>'+ fp.TYPE + '</p>';
      }
    }
    // console.log(fp);
  }
  // DATES
  if (fp.DATE_FROM !== "" || fp.DATE_TO != "") {
    text+= '<p><b>Period : </b>' + getDateString(fp) + '</p>';
  }
  // PARENT
  if (fp.PARENT){
    text+= '<p><b>Parent : </b>'+ fp.PARENT.replace(" < The Galaxy < The Galaxy local group < The universe", "") + '</p>';
  }
  // Continuity
  text+= '<p><b>Continuity : </b>'+ continuity + '</p>';
  // Grid
  if (fp.X_GRID !== "" && fp.Y_GRID){
    text+= '<p><b>Grid : </b>'+ fp.X_GRID + '-' + fp.Y_GRID + '</p>';
  }
  // Star system details
  if(fp.starSystemHierarchy?.length > 0){
    text += '<p><b>Star system details: </b>';
    text += popupFormatStarSystemHierarchy(fp.starSystemHierarchy);
    text += '</p>';
  }
  text+='</div>'
  
  // [y,x] function of zoom level
  let zoomLevel = map.getZoom();
  let popupDisplacement = [feature.geometry.coordinates[1] + 380 / Math.pow(2, zoomLevel+4), feature.geometry.coordinates[0] - 125 / Math.pow(2, zoomLevel+4)];

  let popup = L.popup()
    .setLatLng(popupDisplacement)
    .setContent(text)
    .openOn(map);

  // // Readd marker on popup close
  // popup.on("remove", function(){
  //   // alert("Popup removed");
  //   // e.originalEvent?.preventDefault();
  //   // e.originalEvent?.stopPropagation();
  //   pointDisplayTooltip(e);
  // });
  // popup.on("click", function(){
  //   alert("Popup clicked");
  //   // e.originalEvent?.preventDefault();
  //   // e.originalEvent?.stopPropagation();
  //   pointDisplayTooltip(e);
  // });

  // Re-add marker on popup click ; not perfect but working
  L.DomEvent.on(
      popup.getElement(),
      "click",
      function (event) {
        // console.log("Popup clicked");
        pointDisplayTooltip(e);
      }
  );
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
// function pointHideTooltip(e) {
//   e.target.layer?.closeTooltip(); // Hide tooltip
// }

// Display popup on mouse click
function areaDisplayPopup(e) {
  // console.log(e);
  let layer = e.target;
  let feature = layer.feature;
  const fp = feature.properties;

  let fullName = "";
  // Conjectural Name
  if(fp.CONJECTURAL_NAME && fp.CONJECTURAL_NAME === "YES") {
    console.log(fp.NAME);
    fullName += '(?) ';
  }
  fullName += fp.NAME;

  // ALT NAMES
  if (fp['ALT_NAMES (/ separated']){
    console.log(fp['ALT_NAMES (/ separated']);
    fullName = fullName + "/" + fp['ALT_NAMES (/ separated'];
  }
  // URL
  if(fp["URLS (sources)"]) {
    fullName = stringListToURL(fp["URLS (sources)"], fullName);
  }
  let text = '<h2>'+fullName+'</h2><div>';
  // TYPE and TYPE class
  if (fp.TYPE){
    if (fp.TYPE_CLASSES){
      if(fp.CONJECTURAL_TYPE && fp.CONJECTURAL_TYPE === "YES") {
        text+= '<p><b>Type : </b>(?) ' + fp.TYPE_CLASSES + ' (' + (fp.TYPE) + ')' + '</p>';
      } else {
        text+= '<p><b>Type : </b>' + fp.TYPE_CLASSES + ' (' + (fp.TYPE) + ')' + '</p>';
      }
    } else {
      if(fp.CONJECTURAL_TYPE && fp.CONJECTURAL_TYPE === "YES") {
        text+= '<p><b>Type : </b>(?) '+ fp.TYPE + '</p>';
      } else {
        text+= '<p><b>Type : </b>'+ fp.TYPE + '</p>';
      }
    }
  }
  // PARENT
  if (fp.PARENT){
    text+= '<p><b>Parent : </b>'+ fp.PARENT.replace(" < The Galaxy local group < The universe", "") + '</p>';
  }
  // Continuity
  text+= '<p><b>Continuity : </b>'+ getContinuityString(fp) + '</p>';

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

// Show system tooltip on popup close (Tooltip diseappear by default, needs to be redisplayed)


// Format star system hierarchy
function popupFormatStarSystemHierarchy(starSystemHierarchyArray) {
  if(starSystemHierarchyArray) {
    // console.log(starSystemHierarchyArray);
    // flatArray = starSystemHierarchyArray.flat();
    // restring = flatArray.map(str => str.substring(1));
    // joinedString = restring.join('</pre><pre>');
    return "<br/><pre>" + ((starSystemHierarchyArray.flat()).map((str) => {
      const spacesCount = str.search(/\S/); // Count spaces before the first non-space characters
      return str.substring(parseInt(spacesCount-(-1+spacesCount/5)));
    })).join('</pre><pre>') + "</pre>";
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