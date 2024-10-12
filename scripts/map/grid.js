// /**
//  * Grid display
//  */

// /* CONFIGURATION */
// /*const gridSystem = {
//   x_0: 0,
//   y_0: 0,
//   line_square_number: ,
//   square_side_length: ,
//   column_square_number: ,
// }

// const gridParameters = {
//   line: {
//     default : ,
//   },
// }*/

// /* FUNCTIONS */

// /*// Add grid layer
// function addGridLayer(gridSystem) {
//   // Getting origin coordinates
//   let originCoord = [
//     parseFloat(gridSystem.x_0),
//     parseFloat(gridSystem.y_0)
//   ];
//   // Placing columns (letters)
//   let colYTopCoord = originCoord[1] + gridSystem.line_square_number * parseFloat(gridSystem.square_side_length);
//   let rowXRightmostCoord = originCoord[0] + gridSystem.column_square_number * parseFloat(gridSystem.square_side_length);
//   for(col=0; col <= gridSystem.column_square_number; col++) {
//     let colXCoord = originCoord[0] + col * gridSystem.square_side_length;
//     let colPointList = [ xy2latlng(colXCoord, originCoord[1]), xy2latlng(colXCoord, colYTopCoord)];
//     // Line
//     window.gridLayer.addLayer(L.polyline(colPointList, window.gridParameters.line.default));
//   }
//   // Placing rows
//   for(row=0; row <= gridSystem.line_square_number; row++) {
//     let rowYCoord = originCoord[1] + row*gridSystem.square_side_length;
//     let rowPointList = [ xy2latlng(originCoord[0], rowYCoord), xy2latlng(rowXRightmostCoord, rowYCoord)];
//     window.gridLayer.addLayer(L.polyline(rowPointList, window.gridParameters.line.default));
//   }
// }*/





// //GRID LINES LON (vertical lines) -- 124.73 - 131.25 = 6.52 / 10 = .652

// //var gridLon000a = new L.LatLng(-53, 124.730); var gridLon000b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon000a, gridLon000b];
// //var gridLon000 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon000);

// //var gridLon001a = new L.LatLng(-53, 124.730); var gridLon001b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon001a, gridLon001b];
// //var gridLon001 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon001);

// //var gridLon002a = new L.LatLng(-53, 124.730); var gridLon002b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon002a, gridLon002b];
// //var gridLon002 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon002);

// //var gridLon003a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon004a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon005a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon006a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon007a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon008a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon009a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);
// //-----
// //var gridLon010a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon011a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon012a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon013a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon014a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon015a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon016a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon017a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon018a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon019a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);
// //-----
// //var gridLon020a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon021a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon022a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon023a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon024a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon025a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon026a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon027a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon028a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon029a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);
// //-----
// //var gridLon030a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon031a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon032a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon033a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon034a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon035a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon036a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon037a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// //var gridLon038a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
// //var pointList = [gridLon00a, gridLon00b];
// //var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

// var gridLon039a = new L.LatLng(-53, 78.430); var gridLon039b = new L.LatLng(-203, 78.430);
// var pointList = [gridLon039a, gridLon039b];
// var gridLon039 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon039);
// //-----
// var gridLon040a = new L.LatLng(-53, 79.082); var gridLon040b = new L.LatLng(-203, 79.082);
// var pointList = [gridLon040a, gridLon040b];
// var gridLon040 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon041a = new L.LatLng(-53, 79.734); var gridLon041b = new L.LatLng(-203, 79.734);
// var pointList = [gridLon041a, gridLon041b];
// var gridLon041 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon041);

// var gridLon042a = new L.LatLng(-53, 80.386); var gridLon042b = new L.LatLng(-203, 80.386);
// var pointList = [gridLon042a, gridLon042b];
// var gridLon042 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon042);

// var gridLon043a = new L.LatLng(-53, 81.038); var gridLon043b = new L.LatLng(-203, 81.038);
// var pointList = [gridLon043a, gridLon043b];
// var gridLon043 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon043);

// var gridLon044a = new L.LatLng(-53, 81.690); var gridLon044b = new L.LatLng(-203, 81.690);
// var pointList = [gridLon044a, gridLon044b];
// var gridLon044 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon044);

// var gridLon046a = new L.LatLng(-53, 82.342); var gridLon046b = new L.LatLng(-203, 82.342);
// var pointList = [gridLon046a, gridLon046b];
// var gridLon046 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon046);

// var gridLon046a = new L.LatLng(-53, 82.994); var gridLon046b = new L.LatLng(-203, 82.994);
// var pointList = [gridLon046a, gridLon046b];
// var gridLon046 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon046);

// var gridLon047a = new L.LatLng(-53, 83.646); var gridLon047b = new L.LatLng(-203, 83.646);
// var pointList = [gridLon047a, gridLon047b];
// var gridLon047 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon047);

// var gridLon048a = new L.LatLng(-53, 84.298); var gridLon048b = new L.LatLng(-203, 84.298);
// var pointList = [gridLon048a, gridLon048b];
// var gridLon048 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon048);

// var gridLon049a = new L.LatLng(-53, 84.950); var gridLon049b = new L.LatLng(-203, 84.950);
// var pointList = [gridLon049a, gridLon049b];
// var gridLon049 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon049);
// //-----
// var gridLon050a = new L.LatLng(-53, 85.602); var gridLon050b = new L.LatLng(-203, 85.602);
// var pointList = [gridLon050a, gridLon050b];
// var gridLon050 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon051a = new L.LatLng(-53, 86.266); var gridLon051b = new L.LatLng(-203, 86.266);
// var pointList = [gridLon051a, gridLon051b];
// var gridLon051 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon051);

// var gridLon052a = new L.LatLng(-53, 86.930); var gridLon052b = new L.LatLng(-203, 86.930);
// var pointList = [gridLon052a, gridLon052b];
// var gridLon052 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon052);

// var gridLon053a = new L.LatLng(-53, 87.582); var gridLon053b = new L.LatLng(-203, 87.582);
// var pointList = [gridLon053a, gridLon053b];
// var gridLon053 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon053);

// var gridLon054a = new L.LatLng(-53, 88.234); var gridLon054b = new L.LatLng(-203, 88.234);
// var pointList = [gridLon054a, gridLon054b];
// var gridLon054 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon054);

// var gridLon055a = new L.LatLng(-53, 88.886); var gridLon055b = new L.LatLng(-203, 88.886);
// var pointList = [gridLon055a, gridLon055b];
// var gridLon055 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon055);

// var gridLon056a = new L.LatLng(-53, 89.538); var gridLon056b = new L.LatLng(-203, 89.538);
// var pointList = [gridLon056a, gridLon056b];
// var gridLon056 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon056);

// var gridLon057a = new L.LatLng(-53, 90.190); var gridLon057b = new L.LatLng(-203, 90.190);
// var pointList = [gridLon057a, gridLon057b];
// var gridLon057 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon057);

// var gridLon058a = new L.LatLng(-53, 90.842); var gridLon058b = new L.LatLng(-203, 90.842);
// var pointList = [gridLon058a, gridLon058b];
// var gridLon058 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon058);

// var gridLon059a = new L.LatLng(-53, 91.494); var gridLon059b = new L.LatLng(-203, 91.494);
// var pointList = [gridLon059a, gridLon059b];
// var gridLon059 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon059);
// //-----
// var gridLon060a = new L.LatLng(-53, 92.146); var gridLon060b = new L.LatLng(-203, 92.146);
// var pointList = [gridLon060a, gridLon060b];
// var gridLon060 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon061a = new L.LatLng(-53, 92.798); var gridLon061b = new L.LatLng(-203, 92.798);
// var pointList = [gridLon061a, gridLon061b];
// var gridLon061 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon061);

// var gridLon062a = new L.LatLng(-53, 93.450); var gridLon062b = new L.LatLng(-203, 93.450);
// var pointList = [gridLon062a, gridLon062b];
// var gridLon062 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon062);

// var gridLon063a = new L.LatLng(-53, 94.102); var gridLon063b = new L.LatLng(-203, 94.102);
// var pointList = [gridLon063a, gridLon063b];
// var gridLon063 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon063);

// var gridLon064a = new L.LatLng(-53, 94.754); var gridLon064b = new L.LatLng(-203, 94.754);
// var pointList = [gridLon064a, gridLon064b];
// var gridLon064 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon064);

// var gridLon065a = new L.LatLng(-53, 95.406); var gridLon065b = new L.LatLng(-203, 95.406);
// var pointList = [gridLon065a, gridLon065b];
// var gridLon065 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon065);

// var gridLon066a = new L.LatLng(-53, 96.058); var gridLon066b = new L.LatLng(-203, 96.058);
// var pointList = [gridLon066a, gridLon066b];
// var gridLon066 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon066);

// var gridLon067a = new L.LatLng(-53, 96.710); var gridLon067b = new L.LatLng(-203, 96.710);
// var pointList = [gridLon067a, gridLon067b];
// var gridLon067 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon067);

// var gridLon068a = new L.LatLng(-53, 97.362); var gridLon068b = new L.LatLng(-203, 97.362);
// var pointList = [gridLon068a, gridLon068b];
// var gridLon068 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon068);

// var gridLon069a = new L.LatLng(-53, 98.014); var gridLon069b = new L.LatLng(-203, 98.014);
// var pointList = [gridLon069a, gridLon069b];
// var gridLon069 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon069);
// //-----
// var gridLon070a = new L.LatLng(-53, 98.666); var gridLon070b = new L.LatLng(-203, 98.666);
// var pointList = [gridLon070a, gridLon070b];
// var gridLon070 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon071a = new L.LatLng(-53, 99.310); var gridLon071b = new L.LatLng(-203, 99.310);
// var pointList = [gridLon071a, gridLon071b];
// var gridLon071 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon071);

// var gridLon072a = new L.LatLng(-53, 99.962); var gridLon072b = new L.LatLng(-203, 99.962);
// var pointList = [gridLon072a, gridLon072b];
// var gridLon072 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon072);

// var gridLon073a = new L.LatLng(-53, 100.614); var gridLon073b = new L.LatLng(-203, 100.614);
// var pointList = [gridLon073a, gridLon073b];
// var gridLon073 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon073);

// var gridLon074a = new L.LatLng(-53, 101.266); var gridLon074b = new L.LatLng(-203, 101.266);
// var pointList = [gridLon074a, gridLon074b];
// var gridLon074 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon074);

// var gridLon075a = new L.LatLng(-53, 101.918); var gridLon075b = new L.LatLng(-203, 101.918);
// var pointList = [gridLon075a, gridLon075b];
// var gridLon075 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon075);

// var gridLon076a = new L.LatLng(-53, 102.570); var gridLon076b = new L.LatLng(-203, 102.570);
// var pointList = [gridLon076a, gridLon076b];
// var gridLon076 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon076);

// var gridLon077a = new L.LatLng(-53, 103.222); var gridLon077b = new L.LatLng(-203, 103.222);
// var pointList = [gridLon077a, gridLon077b];
// var gridLon077 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon077);

// var gridLon078a = new L.LatLng(-53, 103.874); var gridLon078b = new L.LatLng(-203, 103.874);
// var pointList = [gridLon078a, gridLon078b];
// var gridLon078 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon078);

// var gridLon079a = new L.LatLng(-53, 104.526); var gridLon079b = new L.LatLng(-203, 104.526);
// var pointList = [gridLon079a, gridLon079b];
// var gridLon079 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon079);
// //-----
// var gridLon080a = new L.LatLng(-53, 105.178); var gridLon080b = new L.LatLng(-203, 105.178);
// var pointList = [gridLon080a, gridLon080b];
// var gridLon080 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon081a = new L.LatLng(-53, 105.830); var gridLon081b = new L.LatLng(-203, 105.830);
// var pointList = [gridLon081a, gridLon081b];
// var gridLon081 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon081);

// var gridLon082a = new L.LatLng(-53, 106.482); var gridLon082b = new L.LatLng(-203, 106.482);
// var pointList = [gridLon082a, gridLon082b];
// var gridLon082 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon082);

// var gridLon083a = new L.LatLng(-53, 107.134); var gridLon083b = new L.LatLng(-203, 107.134);
// var pointList = [gridLon083a, gridLon083b];
// var gridLon083 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon083);

// var gridLon084a = new L.LatLng(-53, 107.786); var gridLon084b = new L.LatLng(-203, 107.786);
// var pointList = [gridLon084a, gridLon084b];
// var gridLon084 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon084);

// var gridLon085a = new L.LatLng(-53, 108.438); var gridLon085b = new L.LatLng(-203, 108.438);
// var pointList = [gridLon085a, gridLon085b];
// var gridLon085 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon085);

// var gridLon086a = new L.LatLng(-53, 109.090); var gridLon086b = new L.LatLng(-203, 109.090);
// var pointList = [gridLon086a, gridLon086b];
// var gridLon086 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon086);

// var gridLon087a = new L.LatLng(-53, 109.742); var gridLon087b = new L.LatLng(-203, 109.742);
// var pointList = [gridLon087a, gridLon087b];
// var gridLon087 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon087);

// var gridLon088a = new L.LatLng(-53, 110.394); var gridLon088b = new L.LatLng(-203, 110.394);
// var pointList = [gridLon088a, gridLon088b];
// var gridLon088 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon088);

// var gridLon089a = new L.LatLng(-53, 111.046); var gridLon089b = new L.LatLng(-203, 111.046);
// var pointList = [gridLon089a, gridLon089b];
// var gridLon089 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon089);
// //-----
// var gridLon090a = new L.LatLng(-53, 111.698); var gridLon090b = new L.LatLng(-203, 111.698);
// var pointList = [gridLon090a, gridLon090b];
// var gridLon090 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon091a = new L.LatLng(-53, 112.346); var gridLon091b = new L.LatLng(-203, 112.346);
// var pointList = [gridLon091a, gridLon091b];
// var gridLon091 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon091);

// var gridLon092a = new L.LatLng(-53, 112.994); var gridLon092b = new L.LatLng(-203, 112.994);
// var pointList = [gridLon092a, gridLon092b];
// var gridLon092 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon092);

// var gridLon093a = new L.LatLng(-53, 113.646); var gridLon093b = new L.LatLng(-203, 113.646);
// var pointList = [gridLon093a, gridLon093b];
// var gridLon093 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon093);

// var gridLon094a = new L.LatLng(-53, 114.298); var gridLon094b = new L.LatLng(-203, 114.298);
// var pointList = [gridLon094a, gridLon094b];
// var gridLon094 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon094);

// var gridLon095a = new L.LatLng(-53, 114.950); var gridLon095b = new L.LatLng(-203, 114.950);
// var pointList = [gridLon095a, gridLon095b];
// var gridLon095 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon095);

// var gridLon096a = new L.LatLng(-53, 115.602); var gridLon096b = new L.LatLng(-203, 115.602);
// var pointList = [gridLon096a, gridLon096b];
// var gridLon096 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon096);

// var gridLon097a = new L.LatLng(-53, 116.254); var gridLon097b = new L.LatLng(-203, 116.254);
// var pointList = [gridLon097a, gridLon097b];
// var gridLon097 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon097);

// var gridLon098a = new L.LatLng(-53, 116.906); var gridLon098b = new L.LatLng(-203, 116.906);
// var pointList = [gridLon098a, gridLon098b];
// var gridLon098 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon098);

// var gridLon099a = new L.LatLng(-53, 117.558); var gridLon099b = new L.LatLng(-203, 117.558);
// var pointList = [gridLon099a, gridLon099b];
// var gridLon099 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon099);
// //-----
// var gridLon100a = new L.LatLng(-53, 118.210); var gridLon100b = new L.LatLng(-203, 118.210);
// var pointList = [gridLon100a, gridLon100b];
// var gridLon100 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon101a = new L.LatLng(-53, 118.862); var gridLon101b = new L.LatLng(-203, 118.862);
// var pointList = [gridLon101a, gridLon101b];
// var gridLon101 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon101);

// var gridLon102a = new L.LatLng(-53, 119.514); var gridLon102b = new L.LatLng(-203, 119.514);
// var pointList = [gridLon102a, gridLon102b];
// var gridLon102 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon102);

// var gridLon103a = new L.LatLng(-53, 120.166); var gridLon103b = new L.LatLng(-203, 120.166);
// var pointList = [gridLon103a, gridLon103b];
// var gridLon103 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon103);

// var gridLon104a = new L.LatLng(-53, 120.818); var gridLon104b = new L.LatLng(-203, 120.818);
// var pointList = [gridLon104a, gridLon104b];
// var gridLon104 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon104);

// var gridLon105a = new L.LatLng(-53, 121.470); var gridLon105b = new L.LatLng(-203, 121.470);
// var pointList = [gridLon105a, gridLon105b];
// var gridLon105 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon105);

// var gridLon106a = new L.LatLng(-53, 122.122); var gridLon106b = new L.LatLng(-203, 122.122);
// var pointList = [gridLon106a, gridLon106b];
// var gridLon106 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon106);

// var gridLon107a = new L.LatLng(-53, 122.774); var gridLon107b = new L.LatLng(-203, 122.774);
// var pointList = [gridLon107a, gridLon107b];
// var gridLon107 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon107);

// var gridLon108a = new L.LatLng(-53, 123.426); var gridLon108b = new L.LatLng(-203, 123.426);
// var pointList = [gridLon108a, gridLon108b];
// var gridLon108 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon108);

// var gridLon109a = new L.LatLng(-53, 124.078); var gridLon109b = new L.LatLng(-203, 124.078);
// var pointList = [gridLon109a, gridLon109b];
// var gridLon109 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon109);
// //-----
// var gridLon110a = new L.LatLng(-53, 124.730); var gridLon110b = new L.LatLng(-203, 124.730);
// var pointList = [gridLon110a, gridLon110b];
// var gridLon110 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon111a = new L.LatLng(-53, 125.382); var gridLon111b = new L.LatLng(-203, 125.382);
// var pointList = [gridLon111a, gridLon111b];
// var gridLon111 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon111);

// var gridLon112a = new L.LatLng(-53, 126.034); var gridLon112b = new L.LatLng(-203, 126.034);
// var pointList = [gridLon112a, gridLon112b];
// var gridLon112 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon112);

// var gridLon113a = new L.LatLng(-53, 126.686); var gridLon113b = new L.LatLng(-203, 126.686);
// var pointList = [gridLon113a, gridLon113b];
// var gridLon113 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon113);

// var gridLon114a = new L.LatLng(-53, 127.338); var gridLon114b = new L.LatLng(-203, 127.338);
// var pointList = [gridLon114a, gridLon114b];
// var gridLon114 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon114);

// var gridLon115a = new L.LatLng(-53, 127.990); var gridLon115b = new L.LatLng(-203, 127.990);
// var pointList = [gridLon115a, gridLon115b];
// var gridLon115 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon115);

// var gridLon116a = new L.LatLng(-53, 128.642); var gridLon116b = new L.LatLng(-203, 128.642);
// var pointList = [gridLon116a, gridLon116b];
// var gridLon116 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon116);

// var gridLon117a = new L.LatLng(-53, 129.294); var gridLon117b = new L.LatLng(-203, 129.294);
// var pointList = [gridLon117a, gridLon117b];
// var gridLon117 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon117);

// var gridLon118a = new L.LatLng(-53, 129.946); var gridLon118b = new L.LatLng(-203, 129.946);
// var pointList = [gridLon118a, gridLon118b];
// var gridLon118 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon118);

// var gridLon119a = new L.LatLng(-53, 130.598); var gridLon119b = new L.LatLng(-203, 130.598);
// var pointList = [gridLon119a, gridLon119b];
// var gridLon119 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon119);
// //-----
// var gridLon120a = new L.LatLng(-53, 131.250); var gridLon120b = new L.LatLng(-203, 131.250);
// var pointList = [gridLon120a, gridLon120b];
// var gridLon120 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon121a = new L.LatLng(-53, 131.902); var gridLon121b = new L.LatLng(-203, 131.902);
// var pointList = [gridLon121a, gridLon121b];
// var gridLon121 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon121);

// var gridLon122a = new L.LatLng(-53, 132.554); var gridLon122b = new L.LatLng(-203, 132.554);
// var pointList = [gridLon122a, gridLon122b];
// var gridLon122 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon122);

// var gridLon123a = new L.LatLng(-53, 133.206); var gridLon123b = new L.LatLng(-203, 133.206);
// var pointList = [gridLon123a, gridLon123b];
// var gridLon123 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon123);

// var gridLon124a = new L.LatLng(-53, 133.858); var gridLon124b = new L.LatLng(-203, 133.858);
// var pointList = [gridLon124a, gridLon124b];
// var gridLon124 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon124);

// var gridLon125a = new L.LatLng(-53, 134.510); var gridLon125b = new L.LatLng(-203, 134.510);
// var pointList = [gridLon125a, gridLon125b];
// var gridLon125 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon125);

// var gridLon126a = new L.LatLng(-53, 135.162); var gridLon126b = new L.LatLng(-203, 135.162);
// var pointList = [gridLon126a, gridLon126b];
// var gridLon126 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon126);

// var gridLon127a = new L.LatLng(-53, 135.814); var gridLon127b = new L.LatLng(-203, 135.814);
// var pointList = [gridLon127a, gridLon127b];
// var gridLon127 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon127);

// var gridLon128a = new L.LatLng(-53, 136.466); var gridLon128b = new L.LatLng(-203, 136.466);
// var pointList = [gridLon128a, gridLon128b];
// var gridLon128 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon128);

// var gridLon129a = new L.LatLng(-53, 137.118); var gridLon129b = new L.LatLng(-203, 137.118);
// var pointList = [gridLon129a, gridLon129b];
// var gridLon129 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon129);
// //-----
// var gridLon130a = new L.LatLng(-53, 137.770); var gridLon130b = new L.LatLng(-203, 137.770);
// var pointList = [gridLon130a, gridLon130b];
// var gridLon130 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon131a = new L.LatLng(-53, 138.422); var gridLon131b = new L.LatLng(-203, 138.422);
// var pointList = [gridLon131a, gridLon131b];
// var gridLon131 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon131);

// var gridLon132a = new L.LatLng(-53, 139.074); var gridLon132b = new L.LatLng(-203, 139.074);
// var pointList = [gridLon132a, gridLon132b];
// var gridLon132 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon132);

// var gridLon133a = new L.LatLng(-53, 139.726); var gridLon133b = new L.LatLng(-203, 139.726);
// var pointList = [gridLon133a, gridLon133b];
// var gridLon133 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon133);

// var gridLon134a = new L.LatLng(-53, 140.378); var gridLon134b = new L.LatLng(-203, 140.378);
// var pointList = [gridLon134a, gridLon134b];
// var gridLon134 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon134);

// var gridLon135a = new L.LatLng(-53, 141.030); var gridLon135b = new L.LatLng(-203, 141.030);
// var pointList = [gridLon135a, gridLon135b];
// var gridLon135 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon135);

// var gridLon136a = new L.LatLng(-53, 141.682); var gridLon136b = new L.LatLng(-203, 141.682);
// var pointList = [gridLon136a, gridLon136b];
// var gridLon136 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon136);

// var gridLon137a = new L.LatLng(-53, 142.334); var gridLon137b = new L.LatLng(-203, 142.334);
// var pointList = [gridLon137a, gridLon137b];
// var gridLon137 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon137);

// var gridLon138a = new L.LatLng(-53, 142.986); var gridLon138b = new L.LatLng(-203, 142.986);
// var pointList = [gridLon138a, gridLon138b];
// var gridLon138 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon138);

// var gridLon139a = new L.LatLng(-53, 143.638); var gridLon139b = new L.LatLng(-203, 143.638);
// var pointList = [gridLon139a, gridLon139b];
// var gridLon139 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon139);
// //-----
// var gridLon140a = new L.LatLng(-53, 144.290); var gridLon140b = new L.LatLng(-203, 144.290);
// var pointList = [gridLon140a, gridLon140b];
// var gridLon140 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon141a = new L.LatLng(-53, 144.942); var gridLon141b = new L.LatLng(-203, 144.942);
// var pointList = [gridLon141a, gridLon141b];
// var gridLon141 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon141);

// var gridLon142a = new L.LatLng(-53, 145.594); var gridLon142b = new L.LatLng(-203, 145.594);
// var pointList = [gridLon142a, gridLon142b];
// var gridLon142 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon142);

// var gridLon143a = new L.LatLng(-53, 146.246); var gridLon143b = new L.LatLng(-203, 146.246);
// var pointList = [gridLon143a, gridLon143b];
// var gridLon143 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon143);

// var gridLon144a = new L.LatLng(-53, 146.898); var gridLon144b = new L.LatLng(-203, 146.898);
// var pointList = [gridLon144a, gridLon144b];
// var gridLon144 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon144);

// var gridLon145a = new L.LatLng(-53, 147.550); var gridLon145b = new L.LatLng(-203, 147.550);
// var pointList = [gridLon145a, gridLon145b];
// var gridLon145 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon145);

// var gridLon146a = new L.LatLng(-53, 148.202); var gridLon146b = new L.LatLng(-203, 148.202);
// var pointList = [gridLon146a, gridLon146b];
// var gridLon146 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon146);

// var gridLon147a = new L.LatLng(-53, 148.854); var gridLon147b = new L.LatLng(-203, 148.854);
// var pointList = [gridLon147a, gridLon147b];
// var gridLon147 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon147);

// var gridLon148a = new L.LatLng(-53, 149.506); var gridLon148b = new L.LatLng(-203, 149.506);
// var pointList = [gridLon148a, gridLon148b];
// var gridLon148 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon148);

// var gridLon149a = new L.LatLng(-53, 150.158); var gridLon149b = new L.LatLng(-203, 150.158);
// var pointList = [gridLon149a, gridLon149b];
// var gridLon149 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon149);
// //-----
// var gridLon150a = new L.LatLng(-53, 150.810); var gridLon150b = new L.LatLng(-203, 150.810);
// var pointList = [gridLon150a, gridLon150b];
// var gridLon150 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon151a = new L.LatLng(-53, 151.462); var gridLon151b = new L.LatLng(-203, 151.462);
// var pointList = [gridLon151a, gridLon151b];
// var gridLon151 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon151);

// var gridLon152a = new L.LatLng(-53, 152.114); var gridLon152b = new L.LatLng(-203, 152.114);
// var pointList = [gridLon152a, gridLon152b];
// var gridLon152 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon152);

// var gridLon153a = new L.LatLng(-53, 152.766); var gridLon153b = new L.LatLng(-203, 152.766);
// var pointList = [gridLon153a, gridLon153b];
// var gridLon153 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon153);

// var gridLon154a = new L.LatLng(-53, 153.418); var gridLon154b = new L.LatLng(-203, 153.418);
// var pointList = [gridLon154a, gridLon154b];
// var gridLon154 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon154);

// var gridLon155a = new L.LatLng(-53, 154.070); var gridLon155b = new L.LatLng(-203, 154.070);
// var pointList = [gridLon155a, gridLon155b];
// var gridLon155 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon155);

// var gridLon156a = new L.LatLng(-53, 154.722); var gridLon156b = new L.LatLng(-203, 154.722);
// var pointList = [gridLon156a, gridLon156b];
// var gridLon156 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon156);

// var gridLon157a = new L.LatLng(-53, 155.374); var gridLon157b = new L.LatLng(-203, 155.374);
// var pointList = [gridLon157a, gridLon157b];
// var gridLon157 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon157);

// var gridLon158a = new L.LatLng(-53, 156.026); var gridLon158b = new L.LatLng(-203, 156.026);
// var pointList = [gridLon158a, gridLon158b];
// var gridLon158 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon158);

// var gridLon159a = new L.LatLng(-53, 156.678); var gridLon159b = new L.LatLng(-203, 156.678);
// var pointList = [gridLon159a, gridLon159b];
// var gridLon159 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon159);
// //-----
// var gridLon160a = new L.LatLng(-53, 157.330); var gridLon160b = new L.LatLng(-203, 157.330);
// var pointList = [gridLon160a, gridLon160b];
// var gridLon160 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon161a = new L.LatLng(-53, 157.982); var gridLon161b = new L.LatLng(-203, 157.982);
// var pointList = [gridLon161a, gridLon161b];
// var gridLon161 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon161);

// var gridLon162a = new L.LatLng(-53, 158.634); var gridLon162b = new L.LatLng(-203, 158.634);
// var pointList = [gridLon162a, gridLon162b];
// var gridLon162 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon162);

// var gridLon163a = new L.LatLng(-53, 159.286); var gridLon163b = new L.LatLng(-203, 159.286);
// var pointList = [gridLon163a, gridLon163b];
// var gridLon163 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon163);

// var gridLon164a = new L.LatLng(-53, 159.938); var gridLon164b = new L.LatLng(-203, 159.938);
// var pointList = [gridLon164a, gridLon164b];
// var gridLon164 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon164);

// var gridLon165a = new L.LatLng(-53, 160.590); var gridLon165b = new L.LatLng(-203, 160.590);
// var pointList = [gridLon165a, gridLon165b];
// var gridLon165 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon165);

// var gridLon166a = new L.LatLng(-53, 161.242); var gridLon166b = new L.LatLng(-203, 161.242);
// var pointList = [gridLon166a, gridLon166b];
// var gridLon166 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon166);

// var gridLon167a = new L.LatLng(-53, 161.894); var gridLon167b = new L.LatLng(-203, 161.894);
// var pointList = [gridLon167a, gridLon167b];
// var gridLon167 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon167);

// var gridLon168a = new L.LatLng(-53, 162.546); var gridLon168b = new L.LatLng(-203, 162.546);
// var pointList = [gridLon168a, gridLon168b];
// var gridLon168 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon168);

// var gridLon169a = new L.LatLng(-53, 163.198); var gridLon169b = new L.LatLng(-203, 163.198);
// var pointList = [gridLon169a, gridLon169b];
// var gridLon169 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon169);
// //-----
// var gridLon170a = new L.LatLng(-53, 163.850); var gridLon170b = new L.LatLng(-203, 163.850);
// var pointList = [gridLon170a, gridLon170b];
// var gridLon170 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon171a = new L.LatLng(-53, 164.502); var gridLon171b = new L.LatLng(-203, 164.502);
// var pointList = [gridLon171a, gridLon171b];
// var gridLon171 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon171);

// var gridLon172a = new L.LatLng(-53, 165.154); var gridLon172b = new L.LatLng(-203, 165.154);
// var pointList = [gridLon172a, gridLon172b];
// var gridLon172 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon172);

// var gridLon173a = new L.LatLng(-53, 165.806); var gridLon173b = new L.LatLng(-203, 165.806);
// var pointList = [gridLon173a, gridLon173b];
// var gridLon173 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon173);

// var gridLon174a = new L.LatLng(-53, 166.458); var gridLon174b = new L.LatLng(-203, 166.458);
// var pointList = [gridLon174a, gridLon174b];
// var gridLon174 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon174);

// var gridLon175a = new L.LatLng(-53, 167.110); var gridLon175b = new L.LatLng(-203, 167.110);
// var pointList = [gridLon175a, gridLon175b];
// var gridLon175 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon175);

// var gridLon176a = new L.LatLng(-53, 167.762); var gridLon176b = new L.LatLng(-203, 167.762);
// var pointList = [gridLon176a, gridLon176b];
// var gridLon176 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon176);

// var gridLon177a = new L.LatLng(-53, 168.414); var gridLon177b = new L.LatLng(-203, 168.414);
// var pointList = [gridLon177a, gridLon177b];
// var gridLon177 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon177);

// var gridLon178a = new L.LatLng(-53, 169.076); var gridLon178b = new L.LatLng(-203, 169.076);
// var pointList = [gridLon178a, gridLon178b];
// var gridLon178 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon178);

// var gridLon179a = new L.LatLng(-53, 169.738); var gridLon179b = new L.LatLng(-203, 169.738);
// var pointList = [gridLon179a, gridLon179b];
// var gridLon179 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon179);
// //-----
// var gridLon180a = new L.LatLng(-53, 170.410); var gridLon180b = new L.LatLng(-203, 170.410);
// var pointList = [gridLon180a, gridLon180b];
// var gridLon180 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon181a = new L.LatLng(-53, 171.062); var gridLon181b = new L.LatLng(-203, 171.062);
// var pointList = [gridLon181a, gridLon181b];
// var gridLon181 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon181);

// var gridLon182a = new L.LatLng(-53, 171.714); var gridLon182b = new L.LatLng(-203, 171.714);
// var pointList = [gridLon182a, gridLon182b];
// var gridLon182 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon182);

// var gridLon183a = new L.LatLng(-53, 172.366); var gridLon183b = new L.LatLng(-203, 172.366);
// var pointList = [gridLon183a, gridLon183b];
// var gridLon183 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon183);

// var gridLon184a = new L.LatLng(-53, 173.018); var gridLon184b = new L.LatLng(-203, 173.018);
// var pointList = [gridLon184a, gridLon184b];
// var gridLon184 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon184);

// var gridLon185a = new L.LatLng(-53, 173.670); var gridLon185b = new L.LatLng(-203, 173.670);
// var pointList = [gridLon185a, gridLon185b];
// var gridLon185 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon185);

// var gridLon186a = new L.LatLng(-53, 174.322); var gridLon186b = new L.LatLng(-203, 174.322);
// var pointList = [gridLon186a, gridLon186b];
// var gridLon186 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon186);

// var gridLon187a = new L.LatLng(-53, 174.974); var gridLon187b = new L.LatLng(-203, 174.974);
// var pointList = [gridLon187a, gridLon187b];
// var gridLon187 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon187);

// var gridLon188a = new L.LatLng(-53, 175.626); var gridLon188b = new L.LatLng(-203, 175.626);
// var pointList = [gridLon188a, gridLon188b];
// var gridLon188 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon188);

// var gridLon189a = new L.LatLng(-53, 176.278); var gridLon189b = new L.LatLng(-203, 176.278);
// var pointList = [gridLon189a, gridLon189b];
// var gridLon189 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon189);
// //-----
// var gridLon190a = new L.LatLng(-53, 176.930); var gridLon190b = new L.LatLng(-203, 176.930);
// var pointList = [gridLon190a, gridLon190b];
// var gridLon190 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon191a = new L.LatLng(-53, 177.582); var gridLon191b = new L.LatLng(-203, 177.582);
// var pointList = [gridLon191a, gridLon191b];
// var gridLon191 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon191);

// var gridLon192a = new L.LatLng(-53, 178.234); var gridLon192b = new L.LatLng(-203, 178.234);
// var pointList = [gridLon192a, gridLon192b];
// var gridLon192 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon192);

// var gridLon193a = new L.LatLng(-53, 178.886); var gridLon193b = new L.LatLng(-203, 178.886);
// var pointList = [gridLon193a, gridLon193b];
// var gridLon193 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon193);

// var gridLon194a = new L.LatLng(-53, 179.538); var gridLon194b = new L.LatLng(-203, 179.538);
// var pointList = [gridLon194a, gridLon194b];
// var gridLon194 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon194);

// var gridLon195a = new L.LatLng(-53, 180.190); var gridLon195b = new L.LatLng(-203, 180.190);
// var pointList = [gridLon195a, gridLon195b];
// var gridLon195 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon195);

// var gridLon196a = new L.LatLng(-53, 180.842); var gridLon196b = new L.LatLng(-203, 180.842);
// var pointList = [gridLon196a, gridLon196b];
// var gridLon196 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon196);

// var gridLon197a = new L.LatLng(-53, 181.494); var gridLon197b = new L.LatLng(-203, 181.494);
// var pointList = [gridLon197a, gridLon197b];
// var gridLon197 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon197);

// var gridLon198a = new L.LatLng(-53, 182.146); var gridLon198b = new L.LatLng(-203, 182.146);
// var pointList = [gridLon198a, gridLon198b];
// var gridLon198 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon198);

// var gridLon199a = new L.LatLng(-53, 182.798); var gridLon199b = new L.LatLng(-203, 182.798);
// var pointList = [gridLon199a, gridLon199b];
// var gridLon199 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon199);
// //-----
// var gridLon200a = new L.LatLng(-53, 183.450); var gridLon200b = new L.LatLng(-203, 183.450);
// var pointList = [gridLon200a, gridLon200b];
// var gridLon200 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLon201a = new L.LatLng(-53, 184.102); var gridLon201b = new L.LatLng(-203, 184.102);
// var pointList = [gridLon201a, gridLon201b];
// var gridLon201 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon201);

// var gridLon202a = new L.LatLng(-53, 184.754); var gridLon202b = new L.LatLng(-203, 184.754);
// var pointList = [gridLon202a, gridLon202b];
// var gridLon202 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon202);

// var gridLon203a = new L.LatLng(-53, 185.406); var gridLon203b = new L.LatLng(-203, 185.406);
// var pointList = [gridLon203a, gridLon203b];
// var gridLon203 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon203);

// var gridLon204a = new L.LatLng(-53, 186.058); var gridLon204b = new L.LatLng(-203, 186.058);
// var pointList = [gridLon204a, gridLon204b];
// var gridLon204 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon204);

// var gridLon205a = new L.LatLng(-53, 186.710); var gridLon205b = new L.LatLng(-203, 186.710);
// var pointList = [gridLon205a, gridLon205b];
// var gridLon205 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon205);

// var gridLon206a = new L.LatLng(-53, 187.362); var gridLon206b = new L.LatLng(-203, 187.362);
// var pointList = [gridLon206a, gridLon206b];
// var gridLon206 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon206);

// var gridLon207a = new L.LatLng(-53, 188.014); var gridLon207b = new L.LatLng(-203, 188.014);
// var pointList = [gridLon207a, gridLon207b];
// var gridLon207 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon207);

// var gridLon208a = new L.LatLng(-53, 188.666); var gridLon208b = new L.LatLng(-203, 188.666);
// var pointList = [gridLon208a, gridLon208b];
// var gridLon208 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon208);

// var gridLon209a = new L.LatLng(-53, 189.318); var gridLon209b = new L.LatLng(-203, 189.318);
// var pointList = [gridLon209a, gridLon209b];
// var gridLon209 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon209);
// //-----
// var gridLon210a = new L.LatLng(-53, 189.970); var gridLon210b = new L.LatLng(-203, 189.970);
// var pointList = [gridLon210a, gridLon210b];
// var gridLon210 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// //GRID LINES LAT (horizontal lines)  -- 124.73 - 131.25 = 6.52 / 10 = .652
// var gridLat011a = new L.LatLng(-53.636, 53); var gridLat011b = new L.LatLng(-53.636, 203);
// var pointList = [gridLat011a, gridLat011b];
// var gridLat011 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat011);

// var gridLat012a = new L.LatLng(-54.288, 53); var gridLat012b = new L.LatLng(-54.288, 203);
// var pointList = [gridLat012a, gridLat012b];
// var gridLat012 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat012);

// var gridLat013a = new L.LatLng(-54.940, 53); var gridLat013b = new L.LatLng(-54.940, 203);
// var pointList = [gridLat013a, gridLat013b];
// var gridLat013 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat013);

// var gridLat014a = new L.LatLng(-55.592, 53); var gridLat014b = new L.LatLng(-55.592, 203);
// var pointList = [gridLat014a, gridLat014b];
// var gridLat014 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat014);

// var gridLat015a = new L.LatLng(-56.244, 53); var gridLat015b = new L.LatLng(-56.244, 203);
// var pointList = [gridLat015a, gridLat015b];
// var gridLat015 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat015);

// var gridLat016a = new L.LatLng(-56.896, 53); var gridLat016b = new L.LatLng(-56.896, 203);
// var pointList = [gridLat016a, gridLat016b];
// var gridLat016 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat016);

// var gridLat017a = new L.LatLng(-57.548, 53); var gridLat017b = new L.LatLng(-57.548, 203);
// var pointList = [gridLat017a, gridLat017b];
// var gridLat017 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat017);

// var gridLat018a = new L.LatLng(-58.200, 53); var gridLat018b = new L.LatLng(-58.200, 203);
// var pointList = [gridLat018a, gridLat018b];
// var gridLat018 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat018);

// var gridLat019a = new L.LatLng(-58.852, 53); var gridLat019b = new L.LatLng(-58.852, 203);
// var pointList = [gridLat019a, gridLat019b];
// var gridLat019 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat019);

// var gridLat020a = new L.LatLng(-59.504, 53); var gridLat020b = new L.LatLng(-59.504, 203);
// var pointList = [gridLat020a, gridLat020b];
// var gridLat020 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
// //-----
// var gridLat021a = new L.LatLng(-60.156, 53); var gridLat021b = new L.LatLng(-60.156, 203);
// var pointList = [gridLat021a, gridLat021b];
// var gridLat021 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat021);

// var gridLat022a = new L.LatLng(-60.808, 53); var gridLat022b = new L.LatLng(-60.808, 203);
// var pointList = [gridLat022a, gridLat022b];
// var gridLat022 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat022);

// var gridLat023a = new L.LatLng(-61.460, 53); var gridLat023b = new L.LatLng(-61.460, 203);
// var pointList = [gridLat023a, gridLat023b];
// var gridLat023 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat023);

// var gridLat024a = new L.LatLng(-62.112, 53); var gridLat024b = new L.LatLng(-62.112, 203);
// var pointList = [gridLat024a, gridLat024b];
// var gridLat024 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat024);

// var gridLat025a = new L.LatLng(-62.764, 53); var gridLat025b = new L.LatLng(-62.764, 203);
// var pointList = [gridLat025a, gridLat025b];
// var gridLat025 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat025);

// var gridLat026a = new L.LatLng(-63.416, 53); var gridLat026b = new L.LatLng(-63.416, 203);
// var pointList = [gridLat026a, gridLat026b];
// var gridLat026 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat026);

// var gridLat027a = new L.LatLng(-64.068, 53); var gridLat027b = new L.LatLng(-64.068, 203);
// var pointList = [gridLat027a, gridLat027b];
// var gridLat027 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat027);

// var gridLat028a = new L.LatLng(-64.720, 53); var gridLat028b = new L.LatLng(-64.720, 203);
// var pointList = [gridLat028a, gridLat028b];
// var gridLat028 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat028);

// var gridLat029a = new L.LatLng(-65.372, 53); var gridLat029b = new L.LatLng(-65.372, 203);
// var pointList = [gridLat029a, gridLat029b];
// var gridLat029 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat029);

// var gridLat030a = new L.LatLng(-66.024, 53); var gridLat030b = new L.LatLng(-66.024, 203);
// var pointList = [gridLat030a, gridLat030b];
// var gridLat030 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
// //-----
// var gridLat031a = new L.LatLng(-66.676, 53); var gridLat031b = new L.LatLng(-66.676, 203);
// var pointList = [gridLat031a, gridLat031b];
// var gridLat031 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat031);

// var gridLat032a = new L.LatLng(-67.328, 53); var gridLat032b = new L.LatLng(-67.328, 203);
// var pointList = [gridLat032a, gridLat032b];
// var gridLat032 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat032);

// var gridLat033a = new L.LatLng(-67.980, 53); var gridLat033b = new L.LatLng(-67.980, 203);
// var pointList = [gridLat033a, gridLat033b];
// var gridLat033 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat033);

// var gridLat034a = new L.LatLng(-68.632, 53); var gridLat034b = new L.LatLng(-68.632, 203);
// var pointList = [gridLat034a, gridLat034b];
// var gridLat034 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat034);

// var gridLat035a = new L.LatLng(-69.284, 53); var gridLat035b = new L.LatLng(-69.284, 203);
// var pointList = [gridLat035a, gridLat035b];
// var gridLat035 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat035);

// var gridLat036a = new L.LatLng(-69.936, 53); var gridLat036b = new L.LatLng(-69.936, 203);
// var pointList = [gridLat036a, gridLat036b];
// var gridLat036 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat036);

// var gridLat037a = new L.LatLng(-70.588, 53); var gridLat037b = new L.LatLng(-70.588, 203);
// var pointList = [gridLat037a, gridLat037b];
// var gridLat037 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat037);

// var gridLat038a = new L.LatLng(-71.240, 53); var gridLat038b = new L.LatLng(-71.240, 203);
// var pointList = [gridLat038a, gridLat038b];
// var gridLat038 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat038);

// var gridLat039a = new L.LatLng(-71.892, 53); var gridLat039b = new L.LatLng(-71.892, 203);
// var pointList = [gridLat039a, gridLat039b];
// var gridLat039 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat039);

// var gridLat040a = new L.LatLng(-72.544, 53); var gridLat040b = new L.LatLng(-72.544, 203);
// var pointList = [gridLat040a, gridLat040b];
// var gridLat040 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
// //-----
// var gridLat041a = new L.LatLng(-73.196, 53); var gridLat041b = new L.LatLng(-73.196, 203);
// var pointList = [gridLat041a, gridLat041b];
// var gridLat041 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat041);

// var gridLat042a = new L.LatLng(-73.848, 53); var gridLat042b = new L.LatLng(-73.848, 203);
// var pointList = [gridLat042a, gridLat042b];
// var gridLat042 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat042);

// var gridLat043a = new L.LatLng(-74.500, 53); var gridLat043b = new L.LatLng(-74.500, 203);
// var pointList = [gridLat043a, gridLat043b];
// var gridLat043 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat043);

// var gridLat044a = new L.LatLng(-75.152, 53); var gridLat044b = new L.LatLng(-75.152, 203);
// var pointList = [gridLat044a, gridLat044b];
// var gridLat044 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat044);

// var gridLat045a = new L.LatLng(-75.804, 53); var gridLat045b = new L.LatLng(-75.804, 203);
// var pointList = [gridLat045a, gridLat045b];
// var gridLat045 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat045);

// var gridLat046a = new L.LatLng(-76.456, 53); var gridLat046b = new L.LatLng(-76.456, 203);
// var pointList = [gridLat046a, gridLat046b];
// var gridLat046 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat046);

// var gridLat047a = new L.LatLng(-77.108, 53); var gridLat047b = new L.LatLng(-77.108, 203);
// var pointList = [gridLat047a, gridLat047b];
// var gridLat047 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat047);

// var gridLat048a = new L.LatLng(-77.760, 53); var gridLat048b = new L.LatLng(-77.760, 203);
// var pointList = [gridLat048a, gridLat048b];
// var gridLat048 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat048);

// var gridLat049a = new L.LatLng(-78.412, 53); var gridLat049b = new L.LatLng(-78.412, 203);
// var pointList = [gridLat049a, gridLat049b];
// var gridLat049 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat049);

// var gridLat050a = new L.LatLng(-79.064, 53); var gridLat050b = new L.LatLng(-79.064, 203);
// var pointList = [gridLat050a, gridLat050b];
// var gridLat050 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
// //-----
// var gridLat051a = new L.LatLng(-79.716, 53); var gridLat051b = new L.LatLng(-79.716, 203);
// var pointList = [gridLat051a, gridLat051b];
// var gridLat051 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat051);

// var gridLat052a = new L.LatLng(-80.368, 53); var gridLat052b = new L.LatLng(-80.368, 203);
// var pointList = [gridLat052a, gridLat052b];
// var gridLat052 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat052);

// var gridLat053a = new L.LatLng(-81.020, 53); var gridLat053b = new L.LatLng(-81.020, 203);
// var pointList = [gridLat053a, gridLat053b];
// var gridLat053 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat053);

// var gridLat054a = new L.LatLng(-81.672, 53); var gridLat054b = new L.LatLng(-81.672, 203);
// var pointList = [gridLat054a, gridLat054b];
// var gridLat054 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat054);

// var gridLat055a = new L.LatLng(-82.324, 53); var gridLat055b = new L.LatLng(-82.324, 203);
// var pointList = [gridLat055a, gridLat055b];
// var gridLat055 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat055);

// var gridLat056a = new L.LatLng(-82.976, 53); var gridLat056b = new L.LatLng(-82.976, 203);
// var pointList = [gridLat056a, gridLat056b];
// var gridLat056 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat056);

// var gridLat057a = new L.LatLng(-83.628, 53); var gridLat057b = new L.LatLng(-83.628, 203);
// var pointList = [gridLat057a, gridLat057b];
// var gridLat057 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat057);

// var gridLat058a = new L.LatLng(-84.280, 53); var gridLat058b = new L.LatLng(-84.280, 203);
// var pointList = [gridLat058a, gridLat058b];
// var gridLat058 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat058);

// var gridLat059a = new L.LatLng(-84.932, 53); var gridLat059b = new L.LatLng(-84.932, 203);
// var pointList = [gridLat059a, gridLat059b];
// var gridLat059 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat059);

// var gridLat060a = new L.LatLng(-85.584, 53); var gridLat060b = new L.LatLng(-85.584, 203);
// var pointList = [gridLat060a, gridLat060b];
// var gridLat060 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
// //-----
// var gridLat061a = new L.LatLng(-86.236, 53); var gridLat061b = new L.LatLng(-86.236, 203);
// var pointList = [gridLat061a, gridLat061b];
// var gridLat061 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat061);

// var gridLat062a = new L.LatLng(-86.888, 53); var gridLat062b = new L.LatLng(-86.888, 203);
// var pointList = [gridLat062a, gridLat062b];
// var gridLat062 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat062);

// var gridLat063a = new L.LatLng(-87.540, 53); var gridLat063b = new L.LatLng(-87.540, 203);
// var pointList = [gridLat063a, gridLat063b];
// var gridLat063 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat063);

// var gridLat064a = new L.LatLng(-88.192, 53); var gridLat064b = new L.LatLng(-88.192, 203);
// var pointList = [gridLat064a, gridLat064b];
// var gridLat064 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat064);

// var gridLat065a = new L.LatLng(-88.844, 53); var gridLat065b = new L.LatLng(-88.844, 203);
// var pointList = [gridLat065a, gridLat065b];
// var gridLat065 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat065);

// var gridLat066a = new L.LatLng(-89.496, 53); var gridLat066b = new L.LatLng(-89.496, 203);
// var pointList = [gridLat066a, gridLat066b];
// var gridLat066 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat066);

// var gridLat067a = new L.LatLng(-90.148, 53); var gridLat067b = new L.LatLng(-90.148, 203);
// var pointList = [gridLat067a, gridLat067b];
// var gridLat067 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat067);

// var gridLat068a = new L.LatLng(-90.800, 53); var gridLat068b = new L.LatLng(-90.800, 203);
// var pointList = [gridLat068a, gridLat068b];
// var gridLat068 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat068);

// var gridLat069a = new L.LatLng(-91.452, 53); var gridLat069b = new L.LatLng(-91.452, 203);
// var pointList = [gridLat069a, gridLat069b];
// var gridLat069 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat069);

// var gridLat070a = new L.LatLng(-92.104, 53); var gridLat070b = new L.LatLng(-92.104, 203);
// var pointList = [gridLat070a, gridLat070b];
// var gridLat070 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
// //-----
// var gridLat071a = new L.LatLng(-92.756, 53); var gridLat071b = new L.LatLng(-92.756, 203);
// var pointList = [gridLat071a, gridLat071b];
// var gridLat071 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat071);

// var gridLat072a = new L.LatLng(-93.408, 53); var gridLat072b = new L.LatLng(-93.408, 203);
// var pointList = [gridLat072a, gridLat072b];
// var gridLat072 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat072);

// var gridLat073a = new L.LatLng(-94.060, 53); var gridLat073b = new L.LatLng(-94.060, 203);
// var pointList = [gridLat073a, gridLat073b];
// var gridLat073 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat073);

// var gridLat074a = new L.LatLng(-94.712, 53); var gridLat074b = new L.LatLng(-94.712, 203);
// var pointList = [gridLat074a, gridLat074b];
// var gridLat074 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat074);

// var gridLat075a = new L.LatLng(-95.364, 53); var gridLat075b = new L.LatLng(-95.364, 203);
// var pointList = [gridLat075a, gridLat075b];
// var gridLat075 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat075);

// var gridLat076a = new L.LatLng(-96.016, 53); var gridLat076b = new L.LatLng(-96.016, 203);
// var pointList = [gridLat076a, gridLat076b];
// var gridLat076 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat076);

// var gridLat077a = new L.LatLng(-96.668, 53); var gridLat077b = new L.LatLng(-96.668, 203);
// var pointList = [gridLat077a, gridLat077b];
// var gridLat077 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat077);

// var gridLat078a = new L.LatLng(-97.320, 53); var gridLat078b = new L.LatLng(-97.320, 203);
// var pointList = [gridLat078a, gridLat078b];
// var gridLat078 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat078);

// var gridLat079a = new L.LatLng(-97.972, 53); var gridLat079b = new L.LatLng(-97.972, 203);
// var pointList = [gridLat079a, gridLat079b];
// var gridLat079 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat079);

// var gridLat080a = new L.LatLng(-98.624, 53); var gridLat080b = new L.LatLng(-98.624, 203);
// var pointList = [gridLat080a, gridLat080b];
// var gridLat080 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLat081a = new L.LatLng(-99.276, 53); var gridLat081b = new L.LatLng(-99.276, 203);
// var pointList = [gridLat081a, gridLat081b];
// var gridLat081 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat081);

// var gridLat082a = new L.LatLng(-99.928, 53); var gridLat082b = new L.LatLng(-99.928, 203);
// var pointList = [gridLat082a, gridLat082b];
// var gridLat082 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat082);

// var gridLat083a = new L.LatLng(-100.580, 53); var gridLat083b = new L.LatLng(-100.580, 203);
// var pointList = [gridLat083a, gridLat083b];
// var gridLat083 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat083);

// var gridLat084a = new L.LatLng(-101.232, 53); var gridLat084b = new L.LatLng(-101.232, 203);
// var pointList = [gridLat084a, gridLat084b];
// var gridLat084 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat084);

// var gridLat085a = new L.LatLng(-101.884, 53); var gridLat085b = new L.LatLng(-101.884, 203);
// var pointList = [gridLat085a, gridLat085b];
// var gridLat085 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat085);

// var gridLat086a = new L.LatLng(-102.536, 53); var gridLat086b = new L.LatLng(-102.536, 203);
// var pointList = [gridLat086a, gridLat086b];
// var gridLat086 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat086);

// var gridLat087a = new L.LatLng(-103.188, 53); var gridLat087b = new L.LatLng(-103.188, 203);
// var pointList = [gridLat087a, gridLat087b];
// var gridLat087 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat087);

// var gridLat088a = new L.LatLng(-103.840, 53); var gridLat088b = new L.LatLng(-103.840, 203);
// var pointList = [gridLat088a, gridLat088b];
// var gridLat088 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat088);

// var gridLat089a = new L.LatLng(-104.492, 53); var gridLat089b = new L.LatLng(-104.492, 203);
// var pointList = [gridLat089a, gridLat089b];
// var gridLat089 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat089);
// //-----
// var gridLat090a = new L.LatLng(-105.144, 53); var gridLat090b = new L.LatLng(-105.144, 203);
// var pointList = [gridLat090a, gridLat090b];
// var gridLat090 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLat091a = new L.LatLng(-105.796, 53); var gridLat091b = new L.LatLng(-105.796, 203);
// var pointList = [gridLat091a, gridLat091b];
// var gridLat091 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat091);

// var gridLat092a = new L.LatLng(-106.448, 53); var gridLat092b = new L.LatLng(-106.448, 203);
// var pointList = [gridLat092a, gridLat092b];
// var gridLat092 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat092);

// var gridLat093a = new L.LatLng(-107.100, 53); var gridLat093b = new L.LatLng(-107.100, 203);
// var pointList = [gridLat093a, gridLat093b];
// var gridLat093 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat093);

// var gridLat094a = new L.LatLng(-107.752, 53); var gridLat094b = new L.LatLng(-107.752, 203);
// var pointList = [gridLat094a, gridLat094b];
// var gridLat094 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat094);

// var gridLat095a = new L.LatLng(-108.404, 53); var gridLat095b = new L.LatLng(-108.404, 203);
// var pointList = [gridLat095a, gridLat095b];
// var gridLat095 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat095);

// var gridLat096a = new L.LatLng(-109.056, 53); var gridLat096b = new L.LatLng(-109.056, 203);
// var pointList = [gridLat096a, gridLat096b];
// var gridLat096 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat096);

// var gridLat097a = new L.LatLng(-109.708, 53); var gridLat097b = new L.LatLng(-109.708, 203);
// var pointList = [gridLat097a, gridLat097b];
// var gridLat097 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat097);

// var gridLat098a = new L.LatLng(-110.360, 53); var gridLat098b = new L.LatLng(-110.360, 203);
// var pointList = [gridLat098a, gridLat098b];
// var gridLat098 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat098);

// var gridLat099a = new L.LatLng(-111.012, 53); var gridLat099b = new L.LatLng(-111.012, 203);
// var pointList = [gridLat099a, gridLat099b];
// var gridLat099 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat099);
// //-----
// var gridLat100a = new L.LatLng(-111.664, 53); var gridLat100b = new L.LatLng(-111.664, 203);
// var pointList = [gridLat100a, gridLat100b];
// var gridLat100 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLat101a = new L.LatLng(-112.316, 53); var gridLat101b = new L.LatLng(-112.316, 203);
// var pointList = [gridLat101a, gridLat101b];
// var gridLat101 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat101);

// var gridLat102a = new L.LatLng(-112.968, 53); var gridLat102b = new L.LatLng(-112.968, 203);
// var pointList = [gridLat102a, gridLat102b];
// var gridLat102 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat102);

// var gridLat103a = new L.LatLng(-113.620, 53); var gridLat103b = new L.LatLng(-113.620, 203);
// var pointList = [gridLat103a, gridLat103b];
// var gridLat103 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat103);

// var gridLat104a = new L.LatLng(-114.272, 53); var gridLat104b = new L.LatLng(-114.272, 203);
// var pointList = [gridLat104a, gridLat104b];
// var gridLat104 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat104);

// var gridLat105a = new L.LatLng(-114.924, 53); var gridLat105b = new L.LatLng(-114.924, 203);
// var pointList = [gridLat105a, gridLat105b];
// var gridLat105 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat105);

// var gridLat106a = new L.LatLng(-115.576, 53); var gridLat106b = new L.LatLng(-115.576, 203);
// var pointList = [gridLat106a, gridLat106b];
// var gridLat106 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat106);

// var gridLat107a = new L.LatLng(-116.228, 53); var gridLat107b = new L.LatLng(-116.228, 203);
// var pointList = [gridLat107a, gridLat107b];
// var gridLat107 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat107);

// var gridLat108a = new L.LatLng(-116.880, 53); var gridLat108b = new L.LatLng(-116.880, 203);
// var pointList = [gridLat108a, gridLat108b];
// var gridLat108 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat108);

// var gridLat109a = new L.LatLng(-117.532, 53); var gridLat109b = new L.LatLng(-117.532, 203);
// var pointList = [gridLat109a, gridLat109b];
// var gridLat109 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat109);
// //-----
// var gridLat110a = new L.LatLng(-118.184, 53); var gridLat110b = new L.LatLng(-118.184, 203);
// var pointList = [gridLat110a, gridLat110b];
// var gridLat110 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLat111a = new L.LatLng(-118.836, 53); var gridLat111b = new L.LatLng(-118.836, 203);
// var pointList = [gridLat111a, gridLat111b];
// var gridLat111 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat111);

// var gridLat112a = new L.LatLng(-119.488, 53); var gridLat112b = new L.LatLng(-119.488, 203);
// var pointList = [gridLat112a, gridLat112b];
// var gridLat112 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat112);

// var gridLat113a = new L.LatLng(-120.140, 53); var gridLat113b = new L.LatLng(-120.140, 203);
// var pointList = [gridLat113a, gridLat113b];
// var gridLat113 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat113);

// var gridLat114a = new L.LatLng(-120.792, 53); var gridLat114b = new L.LatLng(-120.792, 203);
// var pointList = [gridLat114a, gridLat114b];
// var gridLat114 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat114);

// var gridLat115a = new L.LatLng(-121.444, 53); var gridLat115b = new L.LatLng(-121.444, 203);
// var pointList = [gridLat115a, gridLat115b];
// var gridLat115 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat115);

// var gridLat116a = new L.LatLng(-122.096, 53); var gridLat116b = new L.LatLng(-122.096, 203);
// var pointList = [gridLat116a, gridLat116b];
// var gridLat116 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat116);

// var gridLat117a = new L.LatLng(-122.748, 53); var gridLat117b = new L.LatLng(-122.748, 203);
// var pointList = [gridLat117a, gridLat117b];
// var gridLat117 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat117);

// var gridLat118a = new L.LatLng(-123.400, 53); var gridLat118b = new L.LatLng(-123.400, 203);
// var pointList = [gridLat118a, gridLat118b];
// var gridLat118 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat118);

// var gridLat119a = new L.LatLng(-124.052, 53); var gridLat119b = new L.LatLng(-124.052, 203);
// var pointList = [gridLat119a, gridLat119b];
// var gridLat119 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat119);
// //-----
// var gridLat120a = new L.LatLng(-124.704, 53); var gridLat120b = new L.LatLng(-124.704, 203);
// var pointList = [gridLat120a, gridLat120b];
// var gridLat120 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLat121a = new L.LatLng(-125.356, 53); var gridLat121b = new L.LatLng(-125.356, 203);
// var pointList = [gridLat121a, gridLat121b];
// var gridLat121 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat121);

// var gridLat122a = new L.LatLng(-126.008, 53); var gridLat122b = new L.LatLng(-126.008, 203);
// var pointList = [gridLat122a, gridLat122b];
// var gridLat122 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat122);

// var gridLat123a = new L.LatLng(-126.660, 53); var gridLat123b = new L.LatLng(-126.660, 203);
// var pointList = [gridLat123a, gridLat123b];
// var gridLat123 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat123);

// var gridLat124a = new L.LatLng(-127.312, 53); var gridLat124b = new L.LatLng(-127.312, 203);
// var pointList = [gridLat124a, gridLat124b];
// var gridLat124 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat124);

// var gridLat125a = new L.LatLng(-127.964, 53); var gridLat125b = new L.LatLng(-127.964, 203);
// var pointList = [gridLat125a, gridLat125b];
// var gridLat125 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat125);

// var gridLat126a = new L.LatLng(-128.616, 53); var gridLat126b = new L.LatLng(-128.616, 203);
// var pointList = [gridLat126a, gridLat126b];
// var gridLat126 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat126);

// var gridLat127a = new L.LatLng(-129.268, 53); var gridLat127b = new L.LatLng(-129.268, 203);
// var pointList = [gridLat127a, gridLat127b];
// var gridLat127 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat127);

// var gridLat128a = new L.LatLng(-129.920, 53); var gridLat128b = new L.LatLng(-129.920, 203);
// var pointList = [gridLat128a, gridLat128b];
// var gridLat128 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat128);

// var gridLat129a = new L.LatLng(-130.592, 53); var gridLat129b = new L.LatLng(-130.592, 203);
// var pointList = [gridLat129a, gridLat129b];
// var gridLat129 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat129);

// var gridLat130a = new L.LatLng(-131.288, 53); var gridLat130b = new L.LatLng(-131.288, 203);
// var pointList = [gridLat130a, gridLat130b];
// var gridLat130 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
// //-----
// var gridLat131a = new L.LatLng(-131.940, 53); var gridLat131b = new L.LatLng(-131.940, 203);
// var pointList = [gridLat131a, gridLat131b];
// var gridLat131 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat131);

// var gridLat132a = new L.LatLng(-132.592, 53); var gridLat132b = new L.LatLng(-132.592, 203);
// var pointList = [gridLat132a, gridLat132b];
// var gridLat132 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat132);

// var gridLat133a = new L.LatLng(-133.244, 53); var gridLat133b = new L.LatLng(-133.244, 203);
// var pointList = [gridLat133a, gridLat133b];
// var gridLat133 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat133);

// var gridLat134a = new L.LatLng(-133.896, 53); var gridLat134b = new L.LatLng(-133.896, 203);
// var pointList = [gridLat134a, gridLat134b];
// var gridLat134 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat134);

// var gridLat135a = new L.LatLng(-134.548, 53); var gridLat135b = new L.LatLng(-134.548, 203);
// var pointList = [gridLat135a, gridLat135b];
// var gridLat135 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat135);

// var gridLat136a = new L.LatLng(-135.200, 53); var gridLat136b = new L.LatLng(-135.200, 203);
// var pointList = [gridLat136a, gridLat136b];
// var gridLat136 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat136);

// var gridLat137a = new L.LatLng(-135.852, 53); var gridLat137b = new L.LatLng(-135.852, 203);
// var pointList = [gridLat137a, gridLat137b];
// var gridLat137 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat137);

// var gridLat138a = new L.LatLng(-136.504, 53); var gridLat138b = new L.LatLng(-136.504, 203);
// var pointList = [gridLat138a, gridLat138b];
// var gridLat138 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat138);

// var gridLat139a = new L.LatLng(-137.156, 53); var gridLat139b = new L.LatLng(-137.156, 203);
// var pointList = [gridLat139a, gridLat139b];
// var gridLat139 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat139);
// //-----
// var gridLat140a = new L.LatLng(-137.808, 53); var gridLat140b = new L.LatLng(-137.808, 203);
// var pointList = [gridLat140a, gridLat140b];
// var gridLat140 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// var gridLat141a = new L.LatLng(-138.460, 53); var gridLat141b = new L.LatLng(-138.460, 203);
// var pointList = [gridLat141a, gridLat141b];
// var gridLat141 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat141);

// var gridLat142a = new L.LatLng(-139.112, 53); var gridLat142b = new L.LatLng(-139.112, 203);
// var pointList = [gridLat142a, gridLat142b];
// var gridLat142 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat142);

// var gridLat143a = new L.LatLng(-139.764, 53); var gridLat143b = new L.LatLng(-139.764, 203);
// var pointList = [gridLat143a, gridLat143b];
// var gridLat143 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat143);

// var gridLat144a = new L.LatLng(-140.416, 53); var gridLat144b = new L.LatLng(-140.416, 203);
// var pointList = [gridLat144a, gridLat144b];
// var gridLat144 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat144);

// var gridLat145a = new L.LatLng(-141.068, 53); var gridLat145b = new L.LatLng(-141.068, 203);
// var pointList = [gridLat145a, gridLat145b];
// var gridLat145 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat145);

// var gridLat146a = new L.LatLng(-141.720, 53); var gridLat146b = new L.LatLng(-141.720, 203);
// var pointList = [gridLat146a, gridLat146b];
// var gridLat146 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat146);

// var gridLat147a = new L.LatLng(-142.372, 53); var gridLat147b = new L.LatLng(-142.372, 203);
// var pointList = [gridLat147a, gridLat147b];
// var gridLat147 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat147);

// var gridLat148a = new L.LatLng(-143.024, 53); var gridLat148b = new L.LatLng(-143.024, 203);
// var pointList = [gridLat148a, gridLat148b];
// var gridLat148 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat148);

// var gridLat149a = new L.LatLng(-143.676, 53); var gridLat149b = new L.LatLng(-143.676, 203);
// var pointList = [gridLat149a, gridLat149b];
// var gridLat149 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat149);
// //-----
// var gridLat150a = new L.LatLng(-144.328, 53); var gridLat150b = new L.LatLng(-144.328, 203);
// var pointList = [gridLat150a, gridLat150b];
// var gridLat150 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

// //GRID LINES CORELLIAN SECTOR LON (vertical lines) -- 123.40 - 124.70 = 1.3 / 10 = .065
// var corGridLon000a = new L.LatLng(-123.40, 134.510); var corGridLon000b = new L.LatLng(-124.70, 134.510);
// var pointList = [corGridLon000a, corGridLon000b];
// var corGridLon000 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(corGridLon000);

// var corGridLon001a = new L.LatLng(-123.40, 134.575); var corGridLon001b = new L.LatLng(-124.70, 134.575);
// var pointList = [corGridLon001a, corGridLon001b];
// var corGridLon001 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon001);

// var corGridLon002a = new L.LatLng(-123.40, 134.640); var corGridLon002b = new L.LatLng(-124.70, 134.640);
// var pointList = [corGridLon002a, corGridLon002b];
// var corGridLon002 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon002);

// var corGridLon003a = new L.LatLng(-123.40, 134.705); var corGridLon003b = new L.LatLng(-124.70, 134.705);
// var pointList = [corGridLon003a, corGridLon003b];
// var corGridLon003 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon003);

// var corGridLon004a = new L.LatLng(-123.40, 134.770); var corGridLon004b = new L.LatLng(-124.70, 134.770);
// var pointList = [corGridLon004a, corGridLon004b];
// var corGridLon004 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon004);

// var corGridLon005a = new L.LatLng(-123.40, 134.835); var corGridLon005b = new L.LatLng(-124.70, 134.835);
// var pointList = [corGridLon005a, corGridLon005b];
// var corGridLon005 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon005);

// var corGridLon006a = new L.LatLng(-123.40, 134.900); var corGridLon006b = new L.LatLng(-124.70, 134.900);
// var pointList = [corGridLon006a, corGridLon006b];
// var corGridLon006 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon006);

// var corGridLon007a = new L.LatLng(-123.40, 134.965); var corGridLon007b = new L.LatLng(-124.70, 134.965);
// var pointList = [corGridLon007a, corGridLon007b];
// var corGridLon007 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon007);

// var corGridLon008a = new L.LatLng(-123.40, 135.030); var corGridLon008b = new L.LatLng(-124.70, 135.030);
// var pointList = [corGridLon008a, corGridLon008b];
// var corGridLon008 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon008);

// var corGridLon009a = new L.LatLng(-123.40, 135.095); var corGridLon009b = new L.LatLng(-124.70, 135.095);
// var pointList = [corGridLon009a, corGridLon009b];
// var corGridLon009 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon009);

// var corGridLon010a = new L.LatLng(-123.40, 135.160); var corGridLon010b = new L.LatLng(-124.70, 135.160);
// var pointList = [corGridLon010a, corGridLon010b];
// var corGridLon010 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(corGridLon010);

// var corGridLon011a = new L.LatLng(-123.40, 135.225); var corGridLon011b = new L.LatLng(-124.70, 135.225);
// var pointList = [corGridLon011a, corGridLon011b];
// var corGridLon011 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon011);

// var corGridLon012a = new L.LatLng(-123.40, 135.290); var corGridLon012b = new L.LatLng(-124.70, 135.290);
// var pointList = [corGridLon012a, corGridLon012b];
// var corGridLon012 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon012);

// var corGridLon013a = new L.LatLng(-123.40, 135.355); var corGridLon013b = new L.LatLng(-124.70, 135.355);
// var pointList = [corGridLon013a, corGridLon013b];
// var corGridLon013 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon013);

// var corGridLon014a = new L.LatLng(-123.40, 135.420); var corGridLon014b = new L.LatLng(-124.70, 135.420);
// var pointList = [corGridLon014a, corGridLon014b];
// var corGridLon014 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon014);

// var corGridLon015a = new L.LatLng(-123.40, 135.485); var corGridLon015b = new L.LatLng(-124.70, 135.485);
// var pointList = [corGridLon015a, corGridLon015b];
// var corGridLon015 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon015);

// var corGridLon016a = new L.LatLng(-123.40, 135.550); var corGridLon016b = new L.LatLng(-124.70, 135.550);
// var pointList = [corGridLon016a, corGridLon016b];
// var corGridLon016 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon016);

// var corGridLon017a = new L.LatLng(-123.40, 135.615); var corGridLon017b = new L.LatLng(-124.70, 135.615);
// var pointList = [corGridLon017a, corGridLon017b];
// var corGridLon017 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon017);

// var corGridLon018a = new L.LatLng(-123.40, 135.680); var corGridLon018b = new L.LatLng(-124.70, 135.680);
// var pointList = [corGridLon018a, corGridLon018b];
// var corGridLon018 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon018);

// var corGridLon019a = new L.LatLng(-123.40, 135.745); var corGridLon019b = new L.LatLng(-124.70, 135.745);
// var pointList = [corGridLon019a, corGridLon019b];
// var corGridLon019 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon019);

// var corGridLon020a = new L.LatLng(-123.40, 135.814); var corGridLon020b = new L.LatLng(-124.70, 135.814);
// var pointList = [corGridLon020a, corGridLon020b];
// var corGridLon020 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(corGridLon020);

// //GRID LINES CORELLIAN SECTOR LAT (horizontal lines) -- 123.40 - 124.70 = 1.3 / 10 = .065
// var corGridLat000a = new L.LatLng(-123.40, 134.510); var corGridLat000b = new L.LatLng(-123.40, 135.814);
// var pointList = [corGridLat000a, corGridLat000b];
// var corGridLat000 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(corGridLat000);

// var corGridLat001a = new L.LatLng(-123.465, 134.510); var corGridLat001b = new L.LatLng(-123.465, 135.814);
// var pointList = [corGridLat001a, corGridLat001b];
// var corGridLat001 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat001);

// var corGridLat002a = new L.LatLng(-123.530, 134.510); var corGridLat002b = new L.LatLng(-123.530, 135.814);
// var pointList = [corGridLat002a, corGridLat002b];
// var corGridLat002 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat002);

// var corGridLat003a = new L.LatLng(-123.595, 134.510); var corGridLat003b = new L.LatLng(-123.595, 135.814);
// var pointList = [corGridLat003a, corGridLat003b];
// var corGridLat003 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat003);

// var corGridLat004a = new L.LatLng(-123.660, 134.510); var corGridLat004b = new L.LatLng(-123.660, 135.814);
// var pointList = [corGridLat004a, corGridLat004b];
// var corGridLat004 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat004);

// var corGridLat005a = new L.LatLng(-123.725, 134.510); var corGridLat005b = new L.LatLng(-123.725, 135.814);
// var pointList = [corGridLat005a, corGridLat005b];
// var corGridLat005 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat005);

// var corGridLat006a = new L.LatLng(-123.790, 134.510); var corGridLat006b = new L.LatLng(-123.790, 135.814);
// var pointList = [corGridLat006a, corGridLat006b];
// var corGridLat006 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat006);

// var corGridLat007a = new L.LatLng(-123.855, 134.510); var corGridLat007b = new L.LatLng(-123.855, 135.814);
// var pointList = [corGridLat007a, corGridLat007b];
// var corGridLat007 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat007);

// var corGridLat008a = new L.LatLng(-123.920, 134.510); var corGridLat008b = new L.LatLng(-123.920, 135.814);
// var pointList = [corGridLat008a, corGridLat008b];
// var corGridLat008 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat008);

// var corGridLat009a = new L.LatLng(-123.985, 134.510); var corGridLat009b = new L.LatLng(-123.985, 135.814);
// var pointList = [corGridLat009a, corGridLat009b];
// var corGridLat009 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat009);

// var corGridLat010a = new L.LatLng(-124.050, 134.510); var corGridLat010b = new L.LatLng(-124.050, 135.814);
// var pointList = [corGridLat010a, corGridLat010b];
// var corGridLat010 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(corGridLat010);

// var corGridLat011a = new L.LatLng(-124.115, 134.510); var corGridLat011b = new L.LatLng(-124.115, 135.814);
// var pointList = [corGridLat011a, corGridLat011b];
// var corGridLat011 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat011);

// var corGridLat012a = new L.LatLng(-124.180, 134.510); var corGridLat012b = new L.LatLng(-124.180, 135.814);
// var pointList = [corGridLat012a, corGridLat012b];
// var corGridLat012 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat012);

// var corGridLat013a = new L.LatLng(-124.245, 134.510); var corGridLat013b = new L.LatLng(-124.245, 135.814);
// var pointList = [corGridLat013a, corGridLat013b];
// var corGridLat013 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat013);

// var corGridLat014a = new L.LatLng(-124.310, 134.510); var corGridLat014b = new L.LatLng(-124.310, 135.814);
// var pointList = [corGridLat014a, corGridLat014b];
// var corGridLat014 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat014);

// var corGridLat015a = new L.LatLng(-124.375, 134.510); var corGridLat015b = new L.LatLng(-124.375, 135.814);
// var pointList = [corGridLat015a, corGridLat015b];
// var corGridLat015 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat015);

// var corGridLat016a = new L.LatLng(-124.440, 134.510); var corGridLat016b = new L.LatLng(-124.440, 135.814);
// var pointList = [corGridLat016a, corGridLat016b];
// var corGridLat016 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat016);

// var corGridLat017a = new L.LatLng(-124.505, 134.510); var corGridLat017b = new L.LatLng(-124.505, 135.814);
// var pointList = [corGridLat017a, corGridLat017b];
// var corGridLat017 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat017);

// var corGridLat018a = new L.LatLng(-124.570, 134.510); var corGridLat018b = new L.LatLng(-124.570, 135.814);
// var pointList = [corGridLat018a, corGridLat018b];
// var corGridLat018 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat018);

// var corGridLat019a = new L.LatLng(-124.635, 134.510); var corGridLat019b = new L.LatLng(-124.635, 135.814);
// var pointList = [corGridLat019a, corGridLat019b];
// var corGridLat019 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat019);

// //GRID LINES HAPAN CLUSTER LON (vertical lines) -- 123.40 - 124.70 = 1.3 / 10 = .065
// var hapGridLon000a = new L.LatLng(-107.754, 147.549); var hapGridLon000b = new L.LatLng(-108.406, 147.549);
// var pointList = [hapGridLon000a, hapGridLon000b];
// var hapGridLon000 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(hapGridLon000);

// var hapGridLon001a = new L.LatLng(-107.754, 147.614); var hapGridLon001b = new L.LatLng(-108.406, 147.614);
// var pointList = [hapGridLon001a, hapGridLon001b];
// var hapGridLon001 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon001);

// var hapGridLon002a = new L.LatLng(-107.754, 147.679); var hapGridLon002b = new L.LatLng(-108.406, 147.679);
// var pointList = [hapGridLon002a, hapGridLon002b];
// var hapGridLon002 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon002);

// var hapGridLon003a = new L.LatLng(-107.754, 147.744); var hapGridLon003b = new L.LatLng(-108.406, 147.744);
// var pointList = [hapGridLon003a, hapGridLon003b];
// var hapGridLon003 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon003);

// var hapGridLon004a = new L.LatLng(-107.754, 147.809); var hapGridLon004b = new L.LatLng(-108.406, 147.809);
// var pointList = [hapGridLon004a, hapGridLon004b];
// var hapGridLon004 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon004);

// var hapGridLon005a = new L.LatLng(-107.754, 147.874); var hapGridLon005b = new L.LatLng(-108.406, 147.874);
// var pointList = [hapGridLon005a, hapGridLon005b];
// var hapGridLon005 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon005);

// var hapGridLon006a = new L.LatLng(-107.754, 147.939); var hapGridLon006b = new L.LatLng(-108.406, 147.939);
// var pointList = [hapGridLon006a, hapGridLon006b];
// var hapGridLon006 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon006);

// var hapGridLon007a = new L.LatLng(-107.754, 148.004); var hapGridLon007b = new L.LatLng(-108.406, 148.004);
// var pointList = [hapGridLon007a, hapGridLon007b];
// var hapGridLon007 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon007);

// var hapGridLon008a = new L.LatLng(-107.754, 148.069); var hapGridLon008b = new L.LatLng(-108.406, 148.069);
// var pointList = [hapGridLon008a, hapGridLon008b];
// var hapGridLon008 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon008);

// var hapGridLon009a = new L.LatLng(-107.754, 148.136); var hapGridLon009b = new L.LatLng(-108.406, 148.136);
// var pointList = [hapGridLon009a, hapGridLon009b];
// var hapGridLon009 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon009);

// var hapGridLon010a = new L.LatLng(-107.754, 148.202); var hapGridLon010b = new L.LatLng(-108.406, 148.202);
// var pointList = [hapGridLon010a, hapGridLon010b];
// var hapGridLon010 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(hapGridLon010);

// //GRID LINES HAPAN CLUSTER LAT (horizontal lines) -- 123.40 - 124.70 = 1.3 / 10 = .065
// var hapGridLat000a = new L.LatLng(-107.754, 147.549); var hapGridLat000b = new L.LatLng(-107.754, 148.202);
// var pointList = [hapGridLat000a, hapGridLat000b];
// var hapGridLat000 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(hapGridLat000);

// var hapGridLat001a = new L.LatLng(-107.819, 147.549); var hapGridLat001b = new L.LatLng(-107.819, 148.202);
// var pointList = [hapGridLat001a, hapGridLat001b];
// var hapGridLat001 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat001);

// var hapGridLat002a = new L.LatLng(-107.884, 147.549); var hapGridLat002b = new L.LatLng(-107.884, 148.202);
// var pointList = [hapGridLat002a, hapGridLat002b];
// var hapGridLat002 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat002);

// var hapGridLat003a = new L.LatLng(-107.949, 147.549); var hapGridLat003b = new L.LatLng(-107.949, 148.202);
// var pointList = [hapGridLat003a, hapGridLat003b];
// var hapGridLat003 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat003);

// var hapGridLat004a = new L.LatLng(-108.014, 147.549); var hapGridLat004b = new L.LatLng(-108.014, 148.202);
// var pointList = [hapGridLat004a, hapGridLat004b];
// var hapGridLat004 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat004);

// var hapGridLat005a = new L.LatLng(-108.079, 147.549); var hapGridLat005b = new L.LatLng(-108.079, 148.202);
// var pointList = [hapGridLat005a, hapGridLat005b];
// var hapGridLat005 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat005);

// var hapGridLat006a = new L.LatLng(-108.144, 147.549); var hapGridLat006b = new L.LatLng(-108.144, 148.202);
// var pointList = [hapGridLat006a, hapGridLat006b];
// var hapGridLat006 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat006);

// var hapGridLat007a = new L.LatLng(-108.209, 147.549); var hapGridLat007b = new L.LatLng(-108.209, 148.202);
// var pointList = [hapGridLat007a, hapGridLat007b];
// var hapGridLat007 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat007);

// var hapGridLat008a = new L.LatLng(-108.274, 147.549); var hapGridLat008b = new L.LatLng(-108.274, 148.202);
// var pointList = [hapGridLat008a, hapGridLat008b];
// var hapGridLat008 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat008);

// var hapGridLat009a = new L.LatLng(-108.339, 147.549); var hapGridLat009b = new L.LatLng(-108.339, 148.202);
// var pointList = [hapGridLat009a, hapGridLat009b];
// var hapGridLat009 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat009);

// var hapGridLat010a = new L.LatLng(-108.404, 147.549); var hapGridLat010b = new L.LatLng(-108.404, 148.202);
// var pointList = [hapGridLat010a, hapGridLat010b];
// var hapGridLat010 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(hapGridLat010);

// //=== COORDINATE MARKERS ===== Y COORD / X COORD ======================================================================================================= X / Y
// const LetterAtop = L.marker([-52.00, 56.50], { icon: invisible1 }).bindTooltip("A", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterBtop = L.marker([-52.00, 63.00], { icon: invisible1 }).bindTooltip("B", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterCtop = L.marker([-52.00, 69.50], { icon: invisible1 }).bindTooltip("C", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterDtop = L.marker([-52.00, 76.00], { icon: invisible1 }).bindTooltip("D", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterEtop = L.marker([-52.00, 82.50], { icon: invisible1 }).bindTooltip("E", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterFtop = L.marker([-52.00, 89.00], { icon: invisible1 }).bindTooltip("F", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterGtop = L.marker([-52.00, 95.50], { icon: invisible1 }).bindTooltip("G", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterHtop = L.marker([-52.00, 102.00], { icon: invisible1 }).bindTooltip("H", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterItop = L.marker([-52.00, 108.50], { icon: invisible1 }).bindTooltip("I", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterJtop = L.marker([-52.00, 115.00], { icon: invisible1 }).bindTooltip("J", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterKtop = L.marker([-52.00, 121.50], { icon: invisible1 }).bindTooltip("K", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterLtop = L.marker([-52.00, 128.00], { icon: invisible1 }).bindTooltip("L", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterMtop = L.marker([-52.00, 134.50], { icon: invisible1 }).bindTooltip("M", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterNtop = L.marker([-52.00, 141.00], { icon: invisible1 }).bindTooltip("N", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterOtop = L.marker([-52.00, 147.50], { icon: invisible1 }).bindTooltip("O", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterPtop = L.marker([-52.00, 154.00], { icon: invisible1 }).bindTooltip("P", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterQtop = L.marker([-52.00, 160.50], { icon: invisible1 }).bindTooltip("Q", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterRtop = L.marker([-52.00, 167.00], { icon: invisible1 }).bindTooltip("R", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterStop = L.marker([-52.00, 173.50], { icon: invisible1 }).bindTooltip("S", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterTtop = L.marker([-52.00, 180.00], { icon: invisible1 }).bindTooltip("T", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterUtop = L.marker([-52.00, 186.50], { icon: invisible1 }).bindTooltip("U", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterVtop = L.marker([-52.00, 193.00], { icon: invisible1 }).bindTooltip("V", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterWtop = L.marker([-52.00, 199.50], { icon: invisible1 }).bindTooltip("W", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);

// const LetterAbot = L.marker([-204.00, 56.50], { icon: invisible1 }).bindTooltip("A", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterBbot = L.marker([-204.00, 63.00], { icon: invisible1 }).bindTooltip("B", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterCbot = L.marker([-204.00, 69.50], { icon: invisible1 }).bindTooltip("C", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterDbot = L.marker([-204.00, 76.00], { icon: invisible1 }).bindTooltip("D", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterEbot = L.marker([-204.00, 82.50], { icon: invisible1 }).bindTooltip("E", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterFbot = L.marker([-204.00, 89.00], { icon: invisible1 }).bindTooltip("F", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterGbot = L.marker([-204.00, 95.50], { icon: invisible1 }).bindTooltip("G", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterHbot = L.marker([-204.00, 102.00], { icon: invisible1 }).bindTooltip("H", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterIbot = L.marker([-204.00, 108.50], { icon: invisible1 }).bindTooltip("I", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterJbot = L.marker([-204.00, 115.00], { icon: invisible1 }).bindTooltip("J", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterKbot = L.marker([-204.00, 121.50], { icon: invisible1 }).bindTooltip("K", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterLbot = L.marker([-204.00, 128.00], { icon: invisible1 }).bindTooltip("L", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterMbot = L.marker([-204.00, 134.50], { icon: invisible1 }).bindTooltip("M", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterNbot = L.marker([-204.00, 141.00], { icon: invisible1 }).bindTooltip("N", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterObot = L.marker([-204.00, 147.50], { icon: invisible1 }).bindTooltip("O", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterPbot = L.marker([-204.00, 154.00], { icon: invisible1 }).bindTooltip("P", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterQbot = L.marker([-204.00, 160.50], { icon: invisible1 }).bindTooltip("Q", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterRbot = L.marker([-204.00, 167.00], { icon: invisible1 }).bindTooltip("R", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterSbot = L.marker([-204.00, 173.50], { icon: invisible1 }).bindTooltip("S", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterTbot = L.marker([-204.00, 180.00], { icon: invisible1 }).bindTooltip("T", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterUbot = L.marker([-204.00, 186.50], { icon: invisible1 }).bindTooltip("U", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterVbot = L.marker([-204.00, 193.00], { icon: invisible1 }).bindTooltip("V", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const LetterWbot = L.marker([-204.00, 199.50], { icon: invisible1 }).bindTooltip("W", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);

// const Number01left = L.marker([-56.20, 52.00], { icon: invisible1 }).bindTooltip("01", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number02left = L.marker([-62.70, 52.00], { icon: invisible1 }).bindTooltip("02", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number03left = L.marker([-69.20, 52.00], { icon: invisible1 }).bindTooltip("03", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number04left = L.marker([-75.70, 52.00], { icon: invisible1 }).bindTooltip("04", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number05left = L.marker([-82.20, 52.00], { icon: invisible1 }).bindTooltip("05", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number06left = L.marker([-88.70, 52.00], { icon: invisible1 }).bindTooltip("06", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number07left = L.marker([-95.20, 52.00], { icon: invisible1 }).bindTooltip("07", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number08left = L.marker([-101.70, 52.00], { icon: invisible1 }).bindTooltip("08", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number09left = L.marker([-108.20, 52.00], { icon: invisible1 }).bindTooltip("09", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number10left = L.marker([-114.70, 52.00], { icon: invisible1 }).bindTooltip("10", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number11left = L.marker([-121.20, 52.00], { icon: invisible1 }).bindTooltip("11", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number12left = L.marker([-127.70, 52.00], { icon: invisible1 }).bindTooltip("12", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number13left = L.marker([-134.20, 52.00], { icon: invisible1 }).bindTooltip("13", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number14left = L.marker([-140.70, 52.00], { icon: invisible1 }).bindTooltip("14", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number15left = L.marker([-147.20, 52.00], { icon: invisible1 }).bindTooltip("15", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number16left = L.marker([-153.70, 52.00], { icon: invisible1 }).bindTooltip("16", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number17left = L.marker([-160.20, 52.00], { icon: invisible1 }).bindTooltip("17", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number18left = L.marker([-166.70, 52.00], { icon: invisible1 }).bindTooltip("18", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number19left = L.marker([-173.20, 52.00], { icon: invisible1 }).bindTooltip("19", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number20left = L.marker([-179.70, 52.00], { icon: invisible1 }).bindTooltip("20", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number21left = L.marker([-186.20, 52.00], { icon: invisible1 }).bindTooltip("21", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number22left = L.marker([-192.70, 52.00], { icon: invisible1 }).bindTooltip("22", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number23left = L.marker([-199.20, 52.00], { icon: invisible1 }).bindTooltip("23", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);

// const Number01right = L.marker([-56.20, 204.00], { icon: invisible1 }).bindTooltip("01", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number02right = L.marker([-62.70, 204.00], { icon: invisible1 }).bindTooltip("02", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number03right = L.marker([-69.20, 204.00], { icon: invisible1 }).bindTooltip("03", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number04right = L.marker([-75.70, 204.00], { icon: invisible1 }).bindTooltip("04", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number05right = L.marker([-82.20, 204.00], { icon: invisible1 }).bindTooltip("05", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number06right = L.marker([-88.70, 204.00], { icon: invisible1 }).bindTooltip("06", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number07right = L.marker([-95.20, 204.00], { icon: invisible1 }).bindTooltip("07", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number08right = L.marker([-101.70, 204.00], { icon: invisible1 }).bindTooltip("08", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number09right = L.marker([-108.20, 204.00], { icon: invisible1 }).bindTooltip("09", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number10right = L.marker([-114.70, 204.00], { icon: invisible1 }).bindTooltip("10", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number11right = L.marker([-121.20, 204.00], { icon: invisible1 }).bindTooltip("11", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number12right = L.marker([-127.70, 204.00], { icon: invisible1 }).bindTooltip("12", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number13right = L.marker([-134.20, 204.00], { icon: invisible1 }).bindTooltip("13", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number14right = L.marker([-140.70, 204.00], { icon: invisible1 }).bindTooltip("14", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number15right = L.marker([-147.20, 204.00], { icon: invisible1 }).bindTooltip("15", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number16right = L.marker([-153.70, 204.00], { icon: invisible1 }).bindTooltip("16", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number17right = L.marker([-160.20, 204.00], { icon: invisible1 }).bindTooltip("17", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number18right = L.marker([-166.70, 204.00], { icon: invisible1 }).bindTooltip("18", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number19right = L.marker([-173.20, 204.00], { icon: invisible1 }).bindTooltip("19", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number20right = L.marker([-179.70, 204.00], { icon: invisible1 }).bindTooltip("20", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number21right = L.marker([-186.20, 204.00], { icon: invisible1 }).bindTooltip("21", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number22right = L.marker([-192.70, 204.00], { icon: invisible1 }).bindTooltip("22", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
// const Number23right = L.marker([-199.20, 204.00], { icon: invisible1 }).bindTooltip("23", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);


/************* GRID DISPLAY*************/

// Paths to data
var url_grid = "././data/grid/grid.geojson"
var url_gridlabels = "././data/grid/grid_labels.geojson"

// Grid squares for grid search
var gridsearch = L.geoJSON(null,{
    pane:'grid_search',
    pmIgnore:true,
    snapIgnore: true
});
$.getJSON(url_grid, function(data) {
    gridsearch.addData(data);
});

function getGeom(feature){
    return feature.geometry.coordinates
}

// Grid labels
function bindGridTooltip(feature,layer){
    if (feature.properties){
        layer.bindTooltip(feature.properties.label,{
            permanent: true, 
            direction:"center",
            className: 'leaflet-tooltip-crd' 
        })
    }
}

function pointToLayerGridPoints(feature,latlng) {
    return L.circleMarker(latlng, {
        radius:0,
        opacity: 0,
        interactive: false,
        pmIgnore:true,
        snapIgnore: true
    }
    );
}

var grid_labels = L.geoJSON(null,{
    pane:'grid_labels',
    onEachFeature:bindGridTooltip,
    pointToLayer:pointToLayerGridPoints,
    pmIgnore:true,
    snapIgnore: true,
    interactive: false
});

$.getJSON(url_gridlabels, function(data) {
    grid_labels.addData(data);
});

// Define grid options
var grid100Options = {
    weight: 1,
    color: '#d39178',
    opacity: 0.5,
    interactive: false,
    pmIgnore:true,
    snapIgnore: true
};

var grid10Options = {
    weight: 0.2,
    color: '#000',
    opacity: 0.5,
    interactive: false,
    pmIgnore:true,
    snapIgnore: true
};

var grid1Options = {
    weight: 0.15,
    color: '#000',
    opacity: 0.5,
    interactive: false,
    pmIgnore:true,
    snapIgnore: true
};

// Create feature groups
var grid100 = new L.FeatureGroup(null,{interactive: false,pmIgnore:true,snapIgnore:true});
var grid10 = new L.FeatureGroup(null,{interactive: false,pmIgnore:true,snapIgnore:true});
var grid1 = new L.FeatureGroup(null,{interactive: false,pmIgnore:true,snapIgnore:true});

// Define full grid layer
var completegrid = L.layerGroup([grid_labels,grid100],{ 
    pane:'grid',
    pmIgnore:true,
    snapIgnore:true,
    interactive: false});

// Add grid lines for squares of 100 meters (zoom -3 to -8)
for (var i = -1100; i <= 1200; i += 100) {
    grid100.addLayer(L.polyline(
        [[900,i], [-1400,i]],
        grid100Options
    ));
}

for (var j = 900; j >= -1400; j -= 100) {
    grid100.addLayer(L.polyline(
        [[j,-1100], [j,1200]],
        grid100Options
    ));
}

// Add grid lines for squares of 10 meters (zoom 1 to 8)
for (var i = -1100; i <= 1200; i += 10) {
    grid10.addLayer(L.polyline(
        [[900,i], [-1400,i]],
        grid10Options
    ));
}

for (var j = 900; j >= -1400; j -= 10) {
    grid10.addLayer(L.polyline(
        [[j,-1100], [j,1200]],
        grid10Options
    ));
}

// Add grid lines for squares of 1 meter (zoom 5 to 8)
for (var i = -1100; i <= 1200; i += 1) {
    grid1.addLayer(L.polyline(
        [[900,i], [-1400,i]],
        grid1Options
    ));
}

for (var j = 900; j >= -1400; j -= 1) {
    grid1.addLayer(L.polyline(
        [[j,-1100], [j,1200]],
        grid1Options
    ));
}

//Function to highlight a grid square on the map according to its coordinates
var select = L.geoJSON()
function zoomOn(){
    
    var num = document.getElementById("line_num").value
    console.log(num)
    var letter = document.getElementById("col_letter").value.toUpperCase()
    console.log(letter)

    select.clearLayers()
    select = L.geoJSON(null, {
        pane:'grid_search',
        style:{
            fillColor: 'white',
            fillOpacity: 0,
            weight: 4,
            opacity: 0.8,
            color: '#4BF5DE'
        },
        pmIgnore:true,
        snapIgnore: true,
        filter: function(feature, layer) {
            return (feature.properties.line == num && feature.properties.col == letter);

        }
    });
    $.getJSON(url_grid, function(data) {
        select.addData(data);
        console.log(select.getBounds().getCenter());
        map.fitBounds(select.getBounds());
    });
    select.addTo(map)
    
    select.on('click', function() {
        map.fitBounds(select.getBounds());
        map.setView([-250.0,0], -2);
    });
  };

document.getElementById("gridsearchbut").addEventListener("click", e => zoomOn());

// Function to reset the grid search tool
function removeGridPointer(geoJsonMain, responseJson) {
    if(select){
      select.removeFrom(map);
    }
    document.getElementById("line_num").value = ""
    document.getElementById("col_letter").value = ""
    map.setView([-250.0,0], -2);
}
document.getElementById("gridsearchreset").addEventListener("click", e => removeGridPointer());
