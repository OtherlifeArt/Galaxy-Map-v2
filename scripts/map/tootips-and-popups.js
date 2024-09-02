// /**
//  * Here we display tooltips and popups so they stay above all canvas and remain clickable
//  */

// /** EXAMPLES **/

// /* Location tooltips */

// // We use invisible circle markers to keep tooltip permanent since canves icon layer doesn't works this way
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