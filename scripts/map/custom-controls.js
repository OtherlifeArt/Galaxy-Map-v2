/*********** CUSTOM CONTROLS ********/

/**
 * Scale bar
 */
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

var spatialScaleBar = new L.Control.SpatialScalebar();

/**
 * Custom home button
 */
// Custom "Home" button with button control
const HomeControl = L.Control.extend({
options: {
    position: 'topleft', // Default position of the control
    homeCoordinates: [0, 0], // Default coordinates
    homeZoom: 1 // Default zoom level
  },
  initialize: function(options) {
      // Merge custom options with defaults
      L.Util.setOptions(this, options);
  },
  onAdd: function(map) {
    const container = L.DomUtil.create('div', 'home-button');
    container.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        `;
    container.onclick = () => {
      map.setView(this.options.homeCoordinates, this.options.homeZoom, this.options.position);
    };
    return container;
  }
});