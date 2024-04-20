/**
 * MAP by Solenn Tual
 * Sources : https://portulans.github.io/maps/star-wars/galaxy.html
 */

/******** MAPS *********/
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom:-3,
  maxZoom:8,
  fullscreenControl: true,
  fullscreenControlOptions: {
      position: 'topleft'
  },
  // Display optimization
  preferCanvas: true,
}).setView([-250.0,0], -2);

//var bounds = [[-1400,-1200], [900,1100]];
//map.fitBounds(bounds);

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
}
});
var scale = (new L.Control.SpatialScalebar()).addTo(map);

/******** GRID PANES *********/

map.createPane("grid");
map.getPane("grid").style.zIndex = "597";
map.createPane("grid_labels");
map.getPane("grid_labels").style.zIndex = "597";

/******** LAYERS CONTROL *********/

completegrid.addTo(map)

var baseLayers = [];

var overLayers = [
  {label: 'Grid', layer: completegrid, name: 'Grid'},
  {label: 'Source maps',
    children: [
      {label: 'Essential Atlas', collapsed:true, 
       children: [
          {label: "Deep Core", layer: DeepCoreOverlay},
          {label: "Core", layer: CoreOverlay},
          {label: "Colonies", layer: ColoniesOverlay},
          {label: "Inner Rim", layer: InnerRimOverlay},
          {label: "Expansion Region", layer: ExpansionRegionOverlay},
          {label: "Expansion Region - Sectors", layer: ExpensionRegionSOverlay},
          {label: "Mid Rim", layer: MidRimOverlay},
          {label: "Mid Rim - Sectors", layer: MidRimSOverlay},
          {label: "Hutt Space", layer: HuttSpaceOverlay},
          {label: "Outer Rim", layer: OuterRimOverlay},
          {label: "Outer Rim - Sectors", layer: OuterRimSOverlay},
          {label: "Other regions", layer: ClientsOverlay},
          {label: "Galaxy (FR)", layer: GalaxyFROverlay}
        ]
      },
      {label: 'Others', collapsed:true, 
      children: [
          {label: "Galaxy (Timelines Book)", layer: GalaxyTimelinesOverlay},
          {label: "Galaxy (Modi, 2006)", layer: GalaxyModiOverlay},
          {label: "Galaxy (TFA Roleplay)", layer: GalaxyTFARPOverlay}
      ]
    }
  ]
  },
];

L.control.layers.tree(baseLayers, overLayers, {
  namedToggle: true,
  collapsed:false
}).addTo(map);