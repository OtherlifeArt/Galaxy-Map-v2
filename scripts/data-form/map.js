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

/******** LAYERS PANES *********/

map.createPane("points");
map.getPane("points").style.zIndex = "598";
map.createPane("roads");
map.getPane("roads").style.zIndex = "595";
map.createPane('areas');
map.getPane('areas').style.zIndex = "594";

/******** OVERLAYS PANES *********/

map.createPane("arkanis_EA");
map.getPane("arkanis_EA").style.zIndex = "454";
map.createPane("yavin_EA");
map.getPane("yavin_EA").style.zIndex = "453";
map.createPane("kashyyyk_EA");
map.getPane("kashyyyk_EA").style.zIndex = "452";
map.createPane("deep_core_EA");
map.getPane("deep_core_EA").style.zIndex = "451";
map.createPane("core_EA");
map.getPane("core_EA").style.zIndex = "450";
map.createPane("colonies_EA");
map.getPane("colonies_EA").style.zIndex = "449";

/******** LAYERS CONTROL *********/

completegrid.addTo(map);
points.addTo(map);
roads.addTo(map);
areas.addTo(map);

var baseLayers = [];

var overLayers = [
  {label: 'Grid', layer: completegrid, name: 'Grid'},
  {label: 'Data',selectAllCheckbox: false,
    children: [
          
          {label: "Points", layer: points},
          {label: "Hyperlanes", layer: roads},
          {label: "Areas", layer: areas},
            ]
  },
  {label: 'Source maps',
    children: [
      {label: 'Essential Atlas', collapsed:true, 
       children: [
          {label: 'Sector scale maps',collapsed:true,
            children: [
              {label: "Arkanis", layer: ArkanisOverlay},
              {label: "Kashyyyk", layer: KashyyykOverlay},
              //{label:"Yavin and the Gordian Reach",layer:YavinOverlay} //OVERLAY NEED more transformations
            ]
          },
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


/******** OPACITY CONTROL *********/
const Map_AddLayer = {
  "Arkanis": ArkanisOverlay,
  "Kashyyyk":KashyyykOverlay,
  //"Yavin and the Gordian Reach":YavinOverlay, //OVERLAY NEED more transformations
  "Deep Core": DeepCoreOverlay,
  "Core": CoreOverlay,
  "Colonies": ColoniesOverlay,
  "Inner Rim": InnerRimOverlay,
  "Expansion Region": ExpansionRegionOverlay,
  "Expansion Region - Sectors": ExpensionRegionSOverlay,
  "Mid Rim": MidRimOverlay,
  "Mid Rim - Sectors": MidRimSOverlay,
  "Hutt Space": HuttSpaceOverlay,
  "Outer Rim": OuterRimOverlay,
  "Outer Rim - Sectors": OuterRimSOverlay,
  "Other regions": ClientsOverlay,
  "Galaxy (FR)": GalaxyFROverlay,
  "Galaxy (Timelines Book)": GalaxyTimelinesOverlay,
  "Galaxy (Modi, 2006)": GalaxyModiOverlay,
  "Galaxy (TFA Roleplay)": GalaxyTFARPOverlay
};

L.control.opacity(Map_AddLayer, {
        label: 'Layers Opacity    ',
        collapsed: true
    })
    .addTo(map);

var searchLayer = L.layerGroup([points,areas]);
//... adding data in searchLayer ...
map.addControl( new L.Control.Search({
    layer: searchLayer,
    propertyName: 'NAME',
    initial:true,
    textPlaceholder:"Search an object by name",
    zoom:5,
    marker:{
      icon:false,
      circle:{
        pane:"points",
        SIZE:20
    }
    }
}) );

////////// FORM COMPLETION PART //////////////

var marker = null; // Variable to store marker instance
var markerAdded = false; // Variable to track if marker is added

function chooseMarkerLocation(){
  var xcoord = document.getElementById('object-coord-x').value.trim();
  var ycoord = document.getElementById('object-coord-y').value.trim();

  if (xcoord === "" && ycoord === "") {
    document.getElementById('backupXY').innerHTML = "Initial X: <span id=backupX></span>EMPTY - Initial Y: <span id=backupY></span>EMPTY"
    return markercoords = [0, 0]
  } else {
    document.getElementById('backupXY').innerHTML = "Initial X: <span id=backupX>" + document.getElementById('object-coord-x').value.toString() + '</span> - Initial Y: <span id=backupY>' + document.getElementById('object-coord-y').value.toString() + '</span>'
    return markercoords = [ycoord,xcoord]
  }
}

function addMarker() {
  if (marker === null) {
    var position = chooseMarkerLocation()
    marker = L.marker(position, { draggable: true }).addTo(map);

    marker.on('move', function(e) {
      var lat = marker.getLatLng().lat.toFixed(6);
      var lng = marker.getLatLng().lng.toFixed(6);
      marker.bindPopup("X: " + lng + "<br>Y: " + lat).openPopup();
    });

    markerAdded = true; // Update markerAdded variable
    updateButtonState(); // Update button state
  }
}

function removeMarker() {
  if (marker !== null) {
    map.removeLayer(marker);
    document.getElementById('backupXY').innerHTML = ""
    marker = null;
    markerAdded = false; // Update markerAdded to false
    updateButtonState(); // Update button state
  }
}

function updateXYCoordsInForm() {
  // Send the coordinate of the marker to the HTML form (X and X inputs)
  if (marker !== null) {
    var lat = marker.getLatLng().lat.toFixed(6);
    var lng = marker.getLatLng().lng.toFixed(6);
    document.getElementById('object-coord-x').value = lat;
    document.getElementById('object-coord-y').value = lng;
  }
}

function resetXYCoordsInForm() {
  // Send the coordinate of the marker to the HTML form (X and X inputs)
  document.getElementById('object-coord-x').value = document.getElementById('backupX').innerText;
  document.getElementById('object-coord-y').value = document.getElementById('backupY').innerText;

  var xcoord = document.getElementById('backupX').innerText;
  var ycoord = document.getElementById('backupY').innerText;
  
  if (xcoord === "" && ycoord === "") {
    marker.setLatLng([0, 0]);
  } else {
    marker.setLatLng([ycoord,xcoord])
  }
}

function updateButtonState() {
  // Enable/Disable Add marker and Remove marker button, to never have more than one marker on the map
  var addButton = document.getElementById('xyaddmarker');
  var removeButton = document.getElementById('xyremovemarker');
  var sendValueButton = document.getElementById('xytoform');
  var retrievePreviousValue = document.getElementById('xygetinitialvalues')

  addButton.disabled = markerAdded; // Disable add marker button if marker is added
  removeButton.disabled = !markerAdded; // Disable remove marker button if marker is not added
  sendValueButton.disabled = !markerAdded; // Disable send data to form button if marker is not added
  retrievePreviousValue.disabled = !markerAdded;
}

document.getElementById('xyaddmarker').addEventListener('click', addMarker);
document.getElementById('xytoform').addEventListener('click', updateXYCoordsInForm);
document.getElementById('xyremovemarker').addEventListener('click', removeMarker);
document.getElementById('xygetinitialvalues').addEventListener('click', resetXYCoordsInForm);
updateButtonState(); // Call initially to set button state