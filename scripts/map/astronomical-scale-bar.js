/** 
* Custom scale bar units
*/

/** CONFIGURATION **/
// Each grid square should be 1500 parsecs long (galaxy diameter on map is 23 squares long * 1500 pc = 34500pc <=>  112523,95 ly wich is roughly galaxy diameter)
// const customScaleUnits =
//   [
//     // Parsecs (1 units = 227.28 parsecs)
//     {
//       unitName: "parsecs",
//       unitRatio: 227.28,
//     },
//     // LY (1 unit = 741.2941752 LY), 1 pc = 3.26156  ly
//     {
//       unitName: "ly",
//       unitRatio: 741.2941752,
//     },
//   ]

// /** FUNCTIONS **/
// function addAstronomicalScaleBarControl() {
//   const customScaleControl = L.control.scale({
//     imperial: true, // Set to true if you want imperial units (miles, feet)
//     maxWidth: 200,  // Set the maximum width of the scale control
//     metric: true,   // Set to true for metric units (meters, kilometers)
//     updateWhenIdle: true,
//   });

//   // Extends 
//   L.Control.AstronomicalScale = L.Control.Scale.extend({
//     _updateMetric: function (maxMeters) {
//         let meters = this._getRoundNum(maxMeters);
//         let labelLength = meters * customScaleUnits[0].unitRatio;
//         let labelUnit = " " + customScaleUnits[0].unitName;
//         let scaleBarLength = meters / maxMeters;
//         //console.log(meters + " meters");
//         //console.log(maxMeters + " maxMeters");
//         this._updateScale(this._mScale, labelLength+labelUnit, scaleBarLength);
//     },
//     _updateImperial: function (maxMeters) {
//       let meters = this._getRoundNum(maxMeters);
//       let labelLength = meters * customScaleUnits[1].unitRatio;
//       let labelUnit = " " + customScaleUnits[1].unitName;
//       let scaleBarLength = meters / maxMeters;
//       //console.log(meters + " meters");
//       //console.log(maxMeters + " maxMeters");
//       this._updateScale(this._iScale, labelLength+labelUnit, scaleBarLength);
//   }
//   });
    
//   // Add the custom scale control to the map
//   const customControlScale = (new L.Control.AstronomicalScale({
//     imperial: true, // Set to true if you want imperial units (miles, feet)
//     maxWidth: 200,  // Set the maximum width of the scale control
//     metric: true,   // Set to true for metric units (meters, kilometers)
//     updateWhenIdle: true,
//   })).addTo(map);
// }

/*********** CUSTOM SCALE BAR ********/
L.Control.SpatialScalebar = L.Control.Scale.extend({
  _updateMetric: function (maxMeters) {
      var meters = this._getRoundNum(maxMeters),
          label = meters*15 + ' parsecs';
      this._updateScale(this._mScale, label, meters / maxMeters);
  },
  _updateImperial: function (maxMeters) {
  var meters = this._getRoundNum(maxMeters),
          label = meters*48.9 + ' l-y';
      this._updateScale(this._iScale, label, meters / maxMeters);
}});