

// // Creating the Map
// L.CRS.MySimple = L.extend({}, L.CRS.Simple, {
//   transformation: new L.Transformation(0, 2000, -1 / 75, 134)
// });


// L.CRS.pr = L.extend({}, L.CRS.Simple, {
//   projection: L.Projection.LonLat, //Equirectangular or Plate Carree projection (directly maps X as longitude, Y as latitude)
//   //didn't work -- bounds: L.bounds([0,0], [34500, 34500])

//   transformation: new L.Transformation(1 / 128, 0, 1 / 128, 0),

//   scale: function (zoom) {
//     return Math.pow(1, zoom);

//     //var bounds = [[0,0], [23,23]]; //No effect?
//   },

//   zoom: function (scale) {
//     return Math.log(scale) / Math.LN2;
//   },

//   distance: function (latlng1, latlng2) {
//     var dx = latlng2.lng - latlng1.lng,
//       dy = latlng2.lat - latlng1.lat;

//     return Math.sqrt(dx * dx + dy * dy);
//   },
//   infinite: true,
// });

// // Adds tiles to map, Sets zoom limits, Sets where map view starts out centered
// //var map = L.map('map', {crs: L.CRS.Simple}).setView([-121.75, 124.625], 0);
// var map = L.map('map', {
//     crs: L.CRS.Simple ,
//     // Display optimization
//     preferCanvas: true,
//     // Full screen control
//     fullscreenControl: true,
// }).setView([-108.063, 147.797], 6);

// L.tileLayer('map/{z}/{x}/{y}.png', {
//   continuousWorld: false,
//   //maxBounds: bounds
//   noWrap: true,
//   minZoom: 3,
//   maxZoom: 11,
// }).addTo(map);


// // This made all the markers disappear >>    map.fitBounds(bounds);

// //L.control.scale().addTo(map);

// // Custom scalebar
// addAstronomicalScaleBarControl();


// /* Test Leaflet canvas markers */
// // Adds a layer
// //var ciLayer = L.canvasIconLayer().addTo(map);

// // Marker definition
// //var testMarker =  L.marker([0, 0], {icon: planetIcon}).bindTooltip('<b>Coruscant</b>', { permanent: true, direction: 'right' });
// //var testMarker =  L.marker([-108.063, 147.797], {icon: planetIcon}).bindTooltip('<b>Coruscant</b>', { permanent: true, direction: 'right' });

// // Adding marker to layer
// //ciLayer.addMarker(testMarker);

// /*var markers = [];
//     for (var i = 0; i < 10000; i++) {
//       let marker = L.marker([58.5578 + Math.random()*1.8, 29.0087 + Math.random()*3.6], {icon: planetIcon}).bindPopup("I Am "+i);
//     markers.push(marker);
//     }
// ciLayer.addLayers(markers);*/


// //Markers from StackOverflow
// /*var coords = L.latLng(-111.6, 124.55);
// var marker = L.marker(coords).addTo(map);

// var textMarker = L.marker(coords, {
//   icon: L.divIcon({
//     className: 'text-below-marker',
//     html: "Coruscant2",
//   })
// }).addTo(map);

// const markerIcon = L.icon({
//   iconUrl: 'images/planet-normal.png',
//   iconSize: [10, 10], // size of the icon
//   iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
// });

// // From StackOverflow (Labels only appear if zoom Leaflet) "Instead of adding the label to the map, add it to a L.featuregroup"
// var fg = L.featureGroup().addTo(map);

// function createLabel(layer, text, count) { }*/

// //FeatureGroups for other locations without icons and zoom levels
// var zoom04 = new L.FeatureGroup();
// var zoom05 = new L.FeatureGroup();
// var zoom06 = new L.FeatureGroup();
// var zoom07 = new L.FeatureGroup();
// var zoom08 = new L.FeatureGroup();
// var zoom09 = new L.FeatureGroup();
// var zoom10 = new L.FeatureGroup();
// var zoom11 = new L.FeatureGroup();

// let prevZoom, postZoom;
// let zoomLevels = [zoom04,zoom05,zoom06,zoom07,zoom08,zoom09,zoom10,zoom11];

// /** FUNCTIONS **/

// function getZoomLevel(zoomLevel) {
//   return zoomLevels[zoomLevel-4];
// }

// /*
// * Add markers managed by Canvas Icon Layers library depending on zoom level
// */
// function addCanvasIconLayer(zoomLevel) {
//   let index = zoomLevel - 4;
//   if(window.zoomLevelLocationMarkers[index].length > 0) { // Trick : check for array not empty to avoid error (library lacks control)
//     window.zoomLevelCILs[index] = new L.canvasIconLayer({}).addTo(map); // Trick : creating canvasIconLayer at the last moment to avoid empty layer array error (library lacks control)
//     window.zoomLevelCILs[index].addLayers(window.zoomLevelLocationMarkers[index]);
//     // window.zoomLevelLocationMarkers[index].forEach((marker) => { 
//     //   marker.openTooltip(); // Open tooltips
//     // }); 
//   }
// }

// /*
// * Remove markers managed by Canvas Icon Layers library depending on zoom level
// */
// function removeCanvasIconLayer(zoomLevel) {
//   let index = zoomLevel - 4;
//   if(window.zoomLevelCILs[index] !== null && window.zoomLevelLocationMarkers[index].length > 0) { // Trick : check for array not empty and canvasIconLayer existence to avoid error (library lacks control)
//     window.zoomLevelLocationMarkers[index].forEach((marker) => 
//     {
//       // marker.closeTooltip();
//       window.zoomLevelCILs[index].removeLayer(marker); // Library lacks batch layer removal
//     }); 
//     window.zoomLevelCILs[index] = null; // Trick : destroys canvasIconLayer to avoid error on empty markerArray (library lacks control)
//   }
// }

// /*
// * Manage current zoom level
// */
// function manageCurrentZoomLevel(init=false) {
//   postZoom = map.getZoom();
//   console.log(`Zoom level changed: ${prevZoom}->${postZoom}`);

//   // Map initalisation : displaying all current zoom layers
//   if(init) {
//     prevZoom = 0;
//   }

//   // Skip if zoom level stayed the same
//   if(prevZoom == postZoom) return;

//   // Boolean to determine if we're adding [true] or removing [false] layers in the loop
//   let adding = prevZoom < postZoom;

//   // If zoom level increased => show layers up to zoom level
//   // If zoom level decreased => hide layers exceeding zoom level
//   for(i = Math.min(postZoom,prevZoom)+1; i<=Math.max(postZoom,prevZoom); i++) {
//     let startTime = performance.now();
    
//     let layer = getZoomLevel(i);
//     if(layer !== undefined) {
//       if(adding) {
//         console.log("Showing layer " + i);
//         map.addLayer(layer);
//         addCanvasIconLayer(i);
//       }
//       else {
//         console.log("Hiding layer " + i);
//         map.removeLayer(layer);
//         removeCanvasIconLayer(i);
//       }
  
//       let endTime = performance.now();
//       let elementNumber = layer.getLayers().length + (window.zoomLevelLocationMarkers[i-4].length > 0 ? window.zoomLevelLocationMarkers[i-4].length : 0);
//       console.log(`Layer ${i} took ${endTime-startTime}ms for ${elementNumber} Elements`);
//     }
//   }
// }

// // Display object for current zoom level
// prevZoom = map.getZoom();

// /** EVENTS **/

// map.on('zoomstart', function () {
//   prevZoom = map.getZoom();
// })

// map.on('zoomend', function () {
//   manageCurrentZoomLevel();
// });

// //Sidebar
// /*function onEachFeature(feature, layer) {
//   layer.on({
//     click: function populate() {
//       document.getElementById('sidebar').innerHTML = "BLAH BLAH BLAH " + feature.properties.name + "<br>" + feature.properties.description;
//     }
//   });
// }*/


// /** DEBUG/HELPERS **/

// /**
// * Draggable Coordinate Finder Marker
// */
// var marker = L.marker([-108.063, 147.797], {
//   draggable: true,
// }).addTo(map);

// //Returns coordinates for Draggable Marker (ends up adding a 'LatLng Marker' popup label to Corulag)
// marker.bindPopup('LatLng Marker').openPopup();
// marker.on('dragend', function (e) {
//   marker.getPopup().setContent(marker.getLatLng().toString()).openOn(map);
// });

// //Creates "blue pin" marker" that displays borderless tooltip on mouseover (currently above 0,0)
// L.marker([23.37, 1.579]).bindTooltip('Look revealing label!').addTo(map);


/** REWORK **/

/******** MAP *********/
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom:-3,
  maxZoom:8,
  fullscreenControl: true,
  fullscreenControlOptions: {
      position: 'topleft'
  },
  //preferCanvas: true, // It disable interaction with multiple layers (point and areas)...
}).setView([-450.0,0], -2);

/******** GRID PANES *********/

map.createPane("grid");
map.getPane("grid").style.zIndex = "590";
map.createPane("grid_labels");
map.getPane("grid_labels").style.zIndex = "590";
map.createPane("grid_search");
map.getPane("grid_search").style.zIndex = "589";

/******** LAYERS PANES *********/
map.createPane('drawnItems');
map.getPane('drawnItems').style.zIndex = "594";
map.createPane("points");
map.getPane("points").style.zIndex = "595";
map.createPane("roads");
map.getPane("roads").style.zIndex = "594";
map.createPane('areas');
map.getPane('areas').style.zIndex = "593";

/******** OVERLAYS PANES *********/

map.createPane("sector_overlays");
map.getPane("sector_overlays").style.zIndex = "400";
map.createPane("deep_core_EA");
map.getPane("deep_core_EA").style.zIndex = "399";
map.createPane("core_EA");
map.getPane("core_EA").style.zIndex = "398";
map.createPane("colonies_EA");
map.getPane("colonies_EA").style.zIndex = "397";

/******** LAYERS CONTROL *********/

completegrid.addTo(map);
roads.addTo(map);
points.addTo(map);
areas.addTo(map);

var baseLayers = [];

var overLayers = [
  {label: 'Grid', layer: completegrid, name: 'Grid'},
  {label: 'Data',
    children: [
          {label:"Current",
            children: [
              {label: "Points (load from db)", layer: points},
              {label: "Areas", layer: areas}
            ]
          },
          {label:"Deprecated",collapsed:true,
          children:[
            //{label: "Points (last export)", layer: points},
            {label: "Hyperlanes", layer: roads},
            
          ]
        }
        ]
  },
];

L.control.layers.tree(baseLayers, overLayers, {
  namedToggle: true,
  collapsed:false
}).addTo(map);

/////////////// TOOLS //////////////////////

measureTool.addTo(map); // Add measure tool

////////////////////// SEARCH CONTROL //////////////////////

map.addControl(searchControl);  //inizialize search control

/////////////// LEGEND //////////////////////

legend.addTo(map);

/////////////// GRID DISPLAY ///////////////
// Display grid levels depending on zoom
map.on("zoomend", function() {
  var zoomlevel = map.getZoom();
  console.log("Current Zoom Level = " + zoomlevel);

  if (zoomlevel > 1) {
      if (map.hasLayer(grid10) == false) {
          completegrid.addLayer(grid10);
      }
  } else if (zoomlevel <= 1) {
      if (map.hasLayer(grid10)) {
          completegrid.removeLayer(grid10);
      }
  }

  if (zoomlevel > 4) {
      if (map.hasLayer(grid1) == false) {
          completegrid.addLayer(grid1);
      }
  } else if (zoomlevel <= 4) {
      if (map.hasLayer(grid1)) {
          completegrid.removeLayer(grid1);
      }
  }
});

/////////////// SCALE BAR ///////////////
spatialScaleBar.addTo(map);