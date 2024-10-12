/**
 * MAP TOOLS
 */

// Measure tool
var measureTool = L.control.measure({
  formatDistance: function (val) {
    return parseFloat((val*15).toFixed(0)) + ' parsecs / ' + parseFloat((val*48.9).toFixed(0)) + ' light-years';
  },
  lineColor: '#fdfcfc'
});