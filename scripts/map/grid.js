/**
 * Grid display
 */

/* CONFIGURATION */
const gridSystem = {
  x_0: 0,
  y_0: 0,
  line_square_number: ,
  square_side_length: ,
  column_square_number: ,
}

const gridParameters = {
  line: {
    default : ,
  },
}

/* FUNCTIONS */

// Add grid layer
function addGridLayer(gridSystem) {
  // Getting origin coordinates
  let originCoord = [
    parseFloat(gridSystem.x_0),
    parseFloat(gridSystem.y_0)
  ];
  // Placing columns (letters)
  let colYTopCoord = originCoord[1] + gridSystem.line_square_number * parseFloat(gridSystem.square_side_length);
  let rowXRightmostCoord = originCoord[0] + gridSystem.column_square_number * parseFloat(gridSystem.square_side_length);
  for(col=0; col <= gridSystem.column_square_number; col++) {
    let colXCoord = originCoord[0] + col * gridSystem.square_side_length;
    let colPointList = [ xy2latlng(colXCoord, originCoord[1]), xy2latlng(colXCoord, colYTopCoord)];
    // Line
    window.gridLayer.addLayer(L.polyline(colPointList, window.gridParameters.line.default));
  }
  // Placing rows
  for(row=0; row <= gridSystem.line_square_number; row++) {
    let rowYCoord = originCoord[1] + row*gridSystem.square_side_length;
    let rowPointList = [ xy2latlng(originCoord[0], rowYCoord), xy2latlng(rowXRightmostCoord, rowYCoord)];
    window.gridLayer.addLayer(L.polyline(rowPointList, window.gridParameters.line.default));
  }
}