//<div id="map" style="width: 100%; height: 100%; background: #000000;"></div>
//<script>

//Creating the Map
L.CRS.MySimple = L.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(0, 2000, -1 / 75, 134)
});

L.CRS.pr = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat, //Equirectangular or Plate Carree projection (directly maps X as longitude, Y as latitude)
  //didn't work -- bounds: L.bounds([0,0], [34500, 34500])

  transformation: new L.Transformation(1 / 128, 0, 1 / 128, 0),

  scale: function (zoom) {
    return Math.pow(1, zoom);

    //var bounds = [[0,0], [23,23]]; //No effect?
  },

  zoom: function (scale) {
    return Math.log(scale) / Math.LN2;
  },

  distance: function (latlng1, latlng2) {
    var dx = latlng2.lng - latlng1.lng,
      dy = latlng2.lat - latlng1.lat;

    return Math.sqrt(dx * dx + dy * dy);
  },
  infinite: true,
});

// Adds tiles to map, Sets zoom limits, Sets where map view starts out centered
//var map = L.map('map', {crs: L.CRS.Simple}).setView([-121.75, 124.625], 0);
var map = L.map('map', {
    crs: L.CRS.Simple ,
    // Display optimization
    preferCanvas: true,
    // Full screen control
    fullscreenControl: true,
}).setView([-108.063, 147.797], 6);

L.tileLayer('map/{z}/{x}/{y}.png', {
  continuousWorld: false,
  //maxBounds: bounds
  noWrap: true,
  minZoom: 3,
  maxZoom: 11,
}).addTo(map);


// This made all the markers disappear >>    map.fitBounds(bounds);

//L.control.scale().addTo(map);

// Custom scalebar
addAstronomicalScaleBarControl();

//Draggable Coordinate Finder Marker
var marker = L.marker([-108.063, 147.797], {
  draggable: true,
}).addTo(map);

//Icons

//Invisible Icon
var invisible1 = L.icon({
  iconUrl: 'images/planet-shadow.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [10, 10], // size of the icon
  shadowSize: [1, 1], // size of the shadow
  iconAnchor: [5, 0], // point of the icon which will correspond to marker's location
  shadowAnchor: [0, 0], // the same for the shadow
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

//Non-Movie Planet Icons
var pltIconBlk = L.icon({
  iconUrl: 'images/planet-blk.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [16, 16], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var pltIconCan = L.icon({
  iconUrl: 'images/planet-grn.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [16, 16], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var pltIconLeg = L.icon({
  iconUrl: 'images/planet-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [16, 16], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var pltIconCaL = L.icon({
  iconUrl: 'images/planet-grn-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [16, 16], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

//Movie Planet Icons
var pltIconBlk2 = L.icon({
  iconUrl: 'images/planetMov-blk.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [18, 18], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var pltIconCan2 = L.icon({
  iconUrl: 'images/planetMov-grn.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [18, 18], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var pltIconLeg2 = L.icon({
  iconUrl: 'images/planetMov-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [18, 18], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var pltIconCaL2 = L.icon({
  iconUrl: 'images/planetMov-grn-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [18, 18], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

//Non-Movie Nebula Icons

var nebIconBlk = L.icon({
  iconUrl: 'images/nebula-normal.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [12, 12], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var nebIconCan = L.icon({
  iconUrl: 'images/nebula-grn.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [16, 16], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var nebIconLeg = L.icon({
  iconUrl: 'images/nebula-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [16, 16], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var nebIconCaL = L.icon({
  iconUrl: 'images/nebula-grn-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [16, 16], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

//Movie Nebula Icons
var nebIconCan2 = L.icon({
  iconUrl: 'images/nebulaMov-grn.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [18, 18], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var nebIconLeg2 = L.icon({
  iconUrl: 'images/nebulaMov-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [18, 18], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var nebIconCaL2 = L.icon({
  iconUrl: 'images/nebulaMov-grn-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [18, 18], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

//Non-Movie Station Icons
var staIconCan = L.icon({
  iconUrl: 'images/staton-grn.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [20, 20], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var staIconLeg = L.icon({
  iconUrl: 'images/staton-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [20, 20], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var staIconCaL = L.icon({
  iconUrl: 'images/staton-grn-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [20, 20], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

//Movie Station Icons
var staIconBlk2 = L.icon({
  iconUrl: 'images/statonMov-blk.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [20, 20], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var staIconCan2 = L.icon({
  iconUrl: 'images/statonMov-grn.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [20, 20], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var staIconLeg2 = L.icon({
  iconUrl: 'images/statonMov-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [20, 20], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var staIconCaL2 = L.icon({
  iconUrl: 'images/statonMov-grn-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [20, 20], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

//Non-Movie Phenomena Icons

var pheIconBlk = L.icon({
  iconUrl: 'images/phenom-normal.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [10, 10], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var pheIconCan = L.icon({
  iconUrl: 'images/phenom-grn.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [10, 10], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var pheIconLeg = L.icon({
  iconUrl: 'images/phenom-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [10, 10], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var pheIconCaL = L.icon({
  iconUrl: 'images/phenom-grn-blu.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [10, 10], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

//Others/Old
var planetIcon = L.icon({
  iconUrl: 'images/planet-normal.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [10, 10], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var planetIcon2 = L.icon({
  iconUrl: 'images/planet-movie.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [14, 14], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var statonIcon = L.icon({
  iconUrl: 'images/staton-normal.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [12, 12], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var statonIcon2 = L.icon({
  iconUrl: 'images/staton-movie.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [18, 18], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var clustrIcon = L.icon({
  iconUrl: 'images/clustr-normal.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [13, 13], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

var blkhleIcon = L.icon({
  iconUrl: 'images/blkhle-normal.png',
  shadowUrl: 'images/planet-shadow.png',
  iconSize: [10, 10], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
  shadowAnchor: [5, 5],   // the same for the shadow
  popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
});

//Markers
var coruscant = L.marker([0, 0], { icon: planetIcon, }).bindTooltip('<b>Coruscant</b>', { permanent: true, direction: 'right' }).addTo(map);
var alderaan = L.marker([24.37, -1.579], { icon: planetIcon, }).bindTooltip('<b>Alderaan</b>').addTo(map);
var corellia = L.marker([-26.37, -2.579], { radius: 20 }).bindPopup('<b>Corellia</b>').addTo(map);
var commenor = L.marker([-28.21, -1.24], { icon: planetIcon }).bindTooltip("Commenor").addTo(map);

//Markers from StackOverflow
/*var coords = L.latLng(-111.6, 124.55);
var marker = L.marker(coords).addTo(map);

var textMarker = L.marker(coords, {
  icon: L.divIcon({
    className: 'text-below-marker',
    html: "Coruscant2",
  })
}).addTo(map);

const markerIcon = L.icon({
  iconUrl: 'images/planet-normal.png',
  iconSize: [10, 10], // size of the icon
  iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
});

// From StackOverflow (Labels only appear if zoom Leaflet) "Instead of adding the label to the map, add it to a L.featuregroup"
var fg = L.featureGroup().addTo(map);

function createLabel(layer, text, count) { }*/


// create popup contents
//===== row 01 =====
var BelkadanPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Belkadan' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Belkadan/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Belkadan from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 1</div><p><b>BELKADAN</b></p><br>&emsp;&emsp;Located in the remote Tingel Arm, Belkadan was a forested world of tall dalloralla trees. Featured rainforests and swamps, as well as many small seas and lakes. <hr style='visibility:hidden;'/>&emsp;&emsp;Ruled by the Rakata from c. 30,000 BBY but the warrior species fled upon the collapse of their empire c. 25,000 BBY. Later it was ruled by a puppet government loyal to the Sith Empire.<hr style='visibility:hidden;'/>&emsp;&emsp;World was overrun by Praetorite Vong in 25 ABY; its atmosphere was altered due to a Yuuzhan Vong bioweapon in the form of a beetle that produced massive amounts of carbon dioxide and sulfur. The Vong built a shipyard here on their way into the Galaxy.";
//===== row 02 =====
var GreePopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Gree' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Gree/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Gree from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type II<br><hr>Star: unknown<br>Moons: unknown</div><p><b>GREE</b></p><br>&emsp;&emsp;Home of the Gree, six-tentacled cephalopods who were masters of technology in antiquity. Their society fall into ruin in later millennia when individuals began to prize personal power and exclusive knowledge over innovation, sometimes dying before they could pass on knowledge of how their inventions worked.<hr style='visibility:hidden;'/>&emsp;&emsp;It served as capital and cultural center of the Gree Enclave, revered by all Gree as a sacred world. By the time of the Empire it had fallen into ruin after the near-collapse of Gree society.<hr style='visibility:hidden;'/>&emsp;&emsp; By this time only one major city remained, and most of the remainder of the surface was covered in wastelands, barren plains and abandoned ruins. The Gree tightly restricted non-Gree from visiting unless they were specifically permitted by the planetary grand council.";
//===== row 03 =====
var BastionPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Bastion' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Bastion/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmBastion.png' alt='Bastion from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 1</div><p><b>BASTION (SARTINAYNIAN)</b></p><br>&emsp;&emsp;This capital world of the Imperial Remnant was positioned at the end of the Braxant Run hyperroute. Originally, ''Bastion'' was merely a term for the current home of the Remnant's Council of Moffs and administrative HQ. The world previously known as Sartinaynian became the last of these in 19 ABY.<hr style='visibility:hidden;'/>&emsp;&emsp;Bastion was originally settled by Humans who opposed alien membership in the Republic, but they eventually were forced to join the Republic and later ended up relying on the Muuns of the InterGalactic Banking Clan for financial support.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Clone Wars, the world was located in Seperatist space; Bastion later became the capital of the Fel Empire, and eventually Roan Fel's Empire-in-exile.";
var LahMuPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Lah%27mu' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmLahMu.png' alt='Lah'Mu from Orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,618 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 1</div><p><b>LAH'MU</b></p><br>&emsp;&emsp;Remote rainy agriworld located far from major hyperlanes, named from a Neimoidian word meaning ''prosperity''. By the time of the Clone Wars it still had one moon, though one or more others had been pulverized, resulting in a wide silica ring orbiting the planet.<hr style='visibility:hidden;'/>&emsp;&emsp;A turbulent period early in its history led to geologic upheaval, bringing many minerals to the surface. While volcanoes dotted the eastern hemisphere, the planet's few settlers favored the western hemisphere.<hr style='visibility:hidden;'/>&emsp;&emsp;The Erso family settled here to hide out after the rise of the Galactic Empire, until Orson Krennic tracked them down. Lyra Erso was killed, Galen was captured, and a young Jyn hid and was later rescued by Saw Gerrera.";
var CadomaiPrPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Cadomai_Prime' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Cadomai_Prime/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Cadomai Prime from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: 1</div><p><b>CADOMAI PRIME</b></p><br>&emsp;&emsp;Also known simply as Cadomai, this world was located along the Hydian Way near the Corporate Sector. Its climate was frigid at the best of times, and unbearably cold in wintertime. The Snivvian species called Cadomai Prime's tundras home.<hr style='visibility:hidden;'/>&emsp;&emsp;Despite a bloody early history and its unforgiving climate, Cadomai eventually became a popular resort world,as it was renowned for its art and large caverns, to which the Snivvians migrated in wintertime.<hr style='visibility:hidden;'/>&emsp;&emsp;Cadomai was historically a Republic member world. Later, it was often a target of the Imperial Coalition for Progress, which endeavored to monitor artistic pursuits to be sure they kept in line with Imperial tenets.";
var MytusPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Mytus' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Mytus_VII' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmMytus.png' alt='Mytus VII from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: Mytus<br>Moons: unknown</div><p><b>MYTUS VII</b></p><br>&emsp;&emsp;This outermost planet of the Mytus system in Wild Space was home to the Stars' End penal facility, which was run by the Corporate Sector Authority.<hr style='visibility:hidden;'/>&emsp;&emsp;In 2 BBY, Han solo led a team of infiltrators to rescue prisoners from the complex, which boasted a 40-story tower with molecularly bonded armor. Solo severely damaged the facility during the rescue when a stray blaster shot overloaded the facility's main power generator, blasting the tower into the atmosphere.<hr style='visibility:hidden;'/>&emsp;&emsp;Despite this, the tower survived due to its advanced armor and anti-concussion fields. Within months, the facility was again able to hold some prisoners. Several Rebel prisoners escaped to Kashyyyk aboard the bulk freighter Genue where they were rescued by Alliance forces.";
var BonadanPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Bonadan' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Bonadan/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmBonadan.png' alt='Bonadan from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 13,100 km<br>Atmosphere: Type I<br><hr>Star: Bonadan<br>Moons: 2</div><p><b>BONADAN</b></p><br>&emsp;&emsp;This main port world of the Corporate Sector, located at the end of the Hydian Way super-hyperroute, had 10 gigantic spaceports. It was parched and eroded, its environment all but destroyed by massive mining and drilling operations.<hr style='visibility:hidden;'/>&emsp;&emsp;It was covered in shipyards, docks, factories and refineries. The corporations that ran the world used a massive weather-control station in the mountains to the north of the main cities to create sweeper storms in an ineffective effort to clean the polluted air.<hr style='visibility:hidden;'/>&emsp;&emsp;During the early years of the Galactic Civil War, the planet was controlled by the Empire. Rebel Y-wings destroyed several Imperial containers and freighters near the planet and escaped before the Imperial frigate <i>Enforcer</i> arrived.";
//===== row 04 =====
var KaleePopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kalee' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Kalee/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmKalee.png' alt='Kalee from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 13,850 km<br>Atmosphere: unknown<br><hr>Star: Iminec<br>Moons: 1</div><p><b>KALEE</b></p><br>&emsp;&emsp;This resource-starved world on the border of the Kadok Regions was a harsh world covered in beaches, moss-covered cliffs, canyons, and tropical-looking foliage. The local Kaleesh architecture was temple-like, featuring stepped pyramids and stone-built terraces.<hr style='visibility:hidden;'/>&emsp;&emsp;Kalee was discovered during the Old Republic era, and the native Kaleesh were known as honorable, proud and deadly warriors to the rest of the galaxy by the time of the Galactic War, c. 3640 BBY. Their history of warfare contributed to their poverty.<hr style='visibility:hidden;'/>&emsp;&emsp;The Republic meddled in Kalee's affairs and later sided with the neighboring Huks in a war c. 42 BBY. It was the homeworld of the cybernetic Kaleesh General Grievous, formerly known as Qymaen jai Sheelal.";
var DantooinePopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Dantooine' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Dantooine/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmDantooine.png' alt='Dantooine from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 9,830<br>Atmosphere: Type I<br><hr>Star: Dina<br>Moons: 2</div><p><b>DANTOOINE</b></p><br>&emsp;&emsp;Inhabited by the primitive Dantari as well as Human farmers, Dantooine was a lightly populated pastoral world of lakes, rivers, forests, and grasslands dotted with spiky biba trees.<hr style='visibility:hidden;'/>&emsp;&emsp;Though it was once part of the Rakata's Infinite Empire, by the time of the Galactic Civil War, it had no advanced technology or industrial settlements, though for a short time it did host a temporary Rebel base.<hr style='visibility:hidden;'/>&emsp;&emsp;During Lei Organa's capture by the Empire just prior to the Battle of Yavin, she revealed the location of Dantooine's Rebel base as a feint away from the main base at Yavin 4; Grand Moff Tarkin discovered that it was abandoned and punished her by destroying Alderaan with the Death Star.";
var TelosPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Telos' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Telos_IV' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmTelos.png' alt='Telos from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 0</div><p><b>TELOS IV</b></p><br>&emsp;&emsp;Also known simply as Telos, this former agriworld was well-positioned along the Hydian Way super-hyperroute. In antiquity the world was devastated by forces of the Sith Empire after former Republic admiral Saul Karath bombarded the world from orbit under Darth Malak's orders.<hr style='visibility:hidden;'/>&emsp;&emsp;The Jedi Order, fearful of losing many valuable relics, chose this world for the site of a secret Jedi academy and repository, but these were eventually taken over by Master Atris and Echani handmaidens.<hr style='visibility:hidden;'/>&emsp;&emsp;In 3955 BBY, Telos was chosen as the first planet to be restored as part of a Republic-sponsored restoration effort. Citadel Station, a massive space station built as a base from which to implement the restoration. ";
//===== row 05 =====
var MygeetoPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Mygeeto' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Mygeeto/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmMygeeto.png' alt='Mygeeto from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 10,088 km<br>Atmosphere: Type I<br><hr>Star: Malola<br>Moons: 2</div><p><b>MYGEETO</b></p><br><hr style='visibility:hidden;'/>&emsp;&emsp;A wealthy InterGalactic Banking Clan colony world locked in an ice age and surrounded by an asteroid field. Its surface was covered in crystallized glaciation, ice, and huge crystal spurs. Its name meant ''gem'' in the ancient Muun trade language.<hr style='visibility:hidden;'/>&emsp;&emsp;There was no known volcanic activity on Mygeeto, and therefore there was an immense amount of precious metals in the planet's crust, making it an economic rival of Coruscant itself.<hr style='visibility:hidden;'/>&emsp;&emsp;The few cities on the world's sunken surface drew power from synthesized crystals constructed in large capacitor towers. The native Lurmens were reduced to servitude when the Muun-controlled InterGalactic Banking Clan took over.";
var AjanKlossPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Ajan_Kloss' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmAjanKloss.png' alt='Ajan Kloss from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Moon<br>Diameter: 11,353 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 2</div><p><b>AJAN KLOSS</b></p><br>&emsp;&emsp;This jungle moon orbited a gas giant but had two moons of its own. Though rich in insect and fungal life, it lacked large predators. Its planet reflected sunlight onto the moon, providing native flora with sustenance even at night.<hr style='visibility:hidden;'/>&emsp;&emsp;Just prior to the breakout of the Galactic Civil War, Ajan Kloss and its planet Ajara were discovered by Alderaanian scouts, who hid it from the Imperial Senate in case it could be used as a secret base. By then, the former inhabitants, called the Kloss, had long since vanished.<hr style='visibility:hidden;'/>&emsp;&emsp;Luke and Leia used it as a training ground sometime after the Battle of Endor, but it never became more than a quiet waypoint until the Resistance needed a refuge following the Battle of Crait. The mission to find Exegol was launched from the base here.";
var MantooinePopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Mantooine' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Mantooine/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmMantooine.png' alt='Mantooine from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: unknown</div><p><b>MANTOOINE</b></p><br>&emsp;&emsp;During Dooku's Jedi Padawan years, Yoda took him on a mission to Mantooine. The world was colonized during the Kymoodon Era (15,000 BBY - 11,987 BBY), and warred with its neighboring world Fest throughout its history.<hr style='visibility:hidden;'/>&emsp;&emsp;In 5 BBY, a resistance group called the Mantooine Liberators seized an Imperial garrison here but were soon decimated by a counterattack by the Imperial Navy.<hr style='visibility:hidden;'/>&emsp;&emsp;Despite their prior knowledge of the reprisal, the rebels of Fest were unable to warn the Liberators because the groups were not in contact with each other due to the planets' fraught history. Ultimately, this led to both worlds' resistance groups working together and eventually joining the Rebel Alliance.";
var SerennoPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Serenno' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Serenno/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmSerenno.png' alt='Serenno from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 2</div><p><b>SERENNO</b></p><br>&emsp;&emsp;This beautiful world was covered in plains, dense rainforests, mountains, and a large body of water called the Belsallian Sea. It occupied a prime spot along a maze of key hyperspace lanes near Toprawa and the northern end of the Hydian Way.<hr style='visibility:hidden;'/>&emsp;&emsp;According to local legend, the world was once controlled by the Sith Empire, but the eight great noble houses united to expel the Sith without the assistance of the Jedi. It was then renamed after its ruling family, House Serenno.<hr style='visibility:hidden;'/>&emsp;&emsp;Around 232 BBY, Serenno was represented in the Republic Senate by Izzet Noor, who represented most recently annexed Outer Rim locations. During the Clone Wars, Serenno aligned with the Seperatists, led by the former Jedi, Count Dooku of House Serenno.";
var MorabandPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Moraband' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Korriban' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmMoraband.png' alt='Moraband from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 16,890 km<br>Atmosphere: Type I<br><hr>Star: Horuset<br>Moons: 7</div><p><b>MORABAND (KORRIBAN)</b></p><br>&emsp;&emsp;Infamous tombworld of the ancient Sith, Moraband (or Korriban as it was known in antiquity) was abandoned after many wars. The Valley of the Dark Lords was the resting place of many famed Sith, including Darth Bane.<hr style='visibility:hidden;'/>&emsp;&emsp;It was the original homeworld of the red-skinned Sith Pureblood species, which was later bred out of existence through intermarriage with baseline Humans. It was the site of a Sith Academy, and later the headquarters of the One Sith.<hr style='visibility:hidden;'/>&emsp;&emsp;It once had a fertile habitat, but was corrupted and turned into a wasteland, like a number of other Sith worlds. During the Clone Wars, Yoda traveled here in a bid to discover the secrets of eternal consciousness.";
var CantonicaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Cantonica' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmCantonica.png' alt='Cantonica from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: at least 2</div><p><b>CANTONICA</b></p><br>&emsp;&emsp;This desert world was home to the casino city Canto Bight, which sat on the shores of a ridiculously expensive artificial ocean, and was a popular destination for gamblers and wealthy tourists. War profiteers made up a significant portion of the casino's clientele.<hr style='visibility:hidden;'/>&emsp;&emsp;Cantonica was considered to be part of the Corporate Sector. Earlier in its history, it was a quiet, dusty planet of ancient cities' ruins, serving as a hideout for unsavory types.<hr style='visibility:hidden;'/>&emsp;&emsp;In 34 ABY, Resistance operatives Rose and Finn traveled here in an effort to recruit the Master Codebreaker to save the remaining Resistance fleet by disabling the First Order's hyperspace tracker. However, they ended up convincing a slicer named DJ to help them in exchange for his freedom.";
//===== row 06 =====
var ZoshaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Zosha' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Zosha from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown km<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>ZOSHA</b></p><br>&emsp;&emsp;Circa 3640 BBY, members of the Republic Navy's Aegis Squadron planned an operation to destroy the infamous <i>Harrower</i>-class dreadnaught <i>Scream of Ragnos</i> in orbit over Zosha. <hr style='visibility:hidden;'/>&emsp;&emsp;A member of the squadron and three <i>Thranta</i>-class corvettes were sent against the dreadnaught (which had participated in the sacking of Coruscant) and its escorts.<hr style='visibility:hidden;'/>&emsp;&emsp;The battle lasted only minutes and resulted in the destruction of the <i>Scream of Ragnos</i> and a <i>Terminus</i>-class destroyer sent to support it, as well as heavy damage to the dreadnaught's other escorts. The Republic forces escaped into hyperspace shortly afterward.<br><br><br><br>";
var IthorPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Ithor' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Ithor/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmIthor.png' alt='Ithor from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 13,310 km<br>Atmosphere: unknown<br><hr>Star: Ottega<br>Moons: 6</div><p><b>ITHOR</b></p><br>&emsp;&emsp;The Ithorians--also known as ''Hammerheads''--who so revered their world-spanning jungles that they built massive repulsorlift cities to keep from damaging their ecosystems. Setting foot on the planet was forbidden, unless one stayed there permanently.<hr style='visibility:hidden;'/>&emsp;&emsp;Ithor joined the Republic before 8,000 BBY. Grand Master Yoda was reported dead in an incident here in 19 BBY, but he had actually gone into exile on Dagobah.<hr style='visibility:hidden;'/>&emsp;&emsp;Sometime before the Battle of Yavin, the Empire laid siege to Ithor, demanding its leaders turn over knowledge of their agricultural techniques. Momaw Nadon revealed those secrets to protect the ''mother jungle'' from destruction and was banished, eventually ending up in Chalmun's cantina on Tatooine.";
var UrthhaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Earth' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Earth/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmUrthha.png' alt='Urthha from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,742 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 1</div><p><b>URTHHA</b></p><br>&emsp;&emsp;The capital of the Heaven system. The Star Tours travel agency operated here at some point c. 0 BBY, connecting it to other worlds such as Coruscant, Kashyyyk, Naboo, Hoth, Geonosis, and Tatooine; c. 4.3 ABY it also launched flights to Endor before Star Tours was shut down.<hr style='visibility:hidden;'/>&emsp;&emsp;A major proportion of its suface was covered in oceans, with the rest covered with raised landmasses, at least one area of which was covered in forests. Its surface was partly obscured by a netting of white clouds.<hr style='visibility:hidden;'/>&emsp;&emsp;It was noted that an Intergalactic Passport was unfortunately useless as a planetary passport for any of Urthha's nation-states.";
var CademimuPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Cademimu_V' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Cademimu V from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: at least 1</div><p><b>CADEMIMU V</b></p><br>&emsp;&emsp;Also known simply as Cademimu, this ecumenopolis was a major trade world along the Celanon Spur hyperroute. It was heavily industrialized and had a strong military tradition, as it was first colonized as an obscure waypoint for military patrols.<hr style='visibility:hidden;'/>&emsp;&emsp;Later the world acquired great strategic importance and became a major Republic munitions depot. During the Great Galactic War, its missile stores were depleted twice, but both times they were built back larger than before.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Cold War of 3653 - 3642 BBY, Cademimu's corrupt governor took control of the planet with aid from the Mantellian Seperatist Movement, declaring it independent from the Republic, sparking backlash and riots until he was removed from power. By the Galactic Civil War the world was a shadowport.";
var DathomirPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Dathomir' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Dathomir/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmDathomir.png' alt='Dathomir from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 10,460 km<br>Atmosphere: Type I<br><hr>Star: Domir<br>Moons: 4</div><p><b>DATHOMIR</b></p><br>&emsp;&emsp;The remote, verdant Dathomir was lit by Dormir, a red star. The world was strong in the dark side of the Force, and the swamps of Dathomir were occupied by a group known as the Nightsisters, who ruled over the Nightbrothers, a group of warlike Zabraks.<hr style='visibility:hidden;'/>&emsp;&emsp;A Nightsister named Asajj Ventress who was trained, then betrayed by Count Dooku inadvertently drew the Sith Lord's attention to Dathomir, resulting in the near-extinction of the Nightsisters. In 10 BBY, Maul led the criminal group Crimson Dawn from Dathomir.<hr style='visibility:hidden;'/>&emsp;&emsp;In 2 BBY, Maul and Ezra Bridger took part in a ritual during which they summoned the spirits of fallen Nightsisters to gain information from holocrons, and learned that Obi-Wan Kenobi was hiding on a planet with twin suns.";
var Yavin4Popup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Yavin_4' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Yavin_4/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmYavin4.png' alt='Yavin 4 from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Moon<br>Diameter: 10,200 km<br>Atmosphere: Type I<br><hr>Star: Yavin<br>Moons: -</div><p><b>YAVIN 4</b></p><br>&emsp;&emsp;One of 26 moons orbiting the Gas Giant Yavin (but one of only three habitable satellites); despite its remoteness it played an outsize role in galactic events. Exar Kun fell to the dark side here, and it was the site of the deaths of famed Sith Lord Freedon Nadd and mad Jedi Revan.<hr style='visibility:hidden;'/>&emsp;&emsp;Rebel Alliance used the massive stone temple ruins built by the vanished Massassi warrior race as a makeshift base, from which the attack on the first Death Star was launched. Afterwards, the Rebels had to evacuate quickly to avoid Imperial retribution.<hr style='visibility:hidden;'/>&emsp;&emsp; About 6 months after the Battle of Endor, Shara Bey and Kes Dameron settled down here. In 11 ABY Luke Skywalker chose it as the site of his Jedi Academy.";
var FeluciaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Felucia' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Felucia/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmFelucia.png' alt='Felucia from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 9,100 km<br>Atmosphere: Type I<br><hr>Star: Felix<br>Moons: 8</div><p><b>FELUCIA</b></p><br>&emsp;&emsp;This small jungle world was dominated by a variety of large and small fungi, dotted with small farming villages and occasional cities. The Commerce Guild's headquarters were located just outside the capital of Kway Teow.<hr style='visibility:hidden;'/>&emsp;&emsp;The Felucian natives were stort-statured, long-necked reptilian beings who farmed a valuable healing herb called nysillin, which was the planet's dominant agricultural export. The Gossams colonized Felucia around 27,000 BBY, claiming a common ancestor with the native peaceful Felucians and exploiting them.<hr style='visibility:hidden;'/>&emsp;&emsp;The amphibious Jungle Felucians, a separate species, possessed two sets of arms and heads covered in a thick mass of tendrils. It became a battleground throughout the Clone Wars due to its strategic location along the Perlemian Trade Route.";
var OssusPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Ossus' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Ossus/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmOssus.png' alt='Ossus from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 29,000 km<br>Atmosphere: Type I<br><hr>Stars: Adega Prime, Adega Besh<br>Moons: 2</div><p><b>OSSUS (IDUX)</b></p><br>&emsp;&emsp;In 25,000 BBY, the Jedi relocated from Tython to Ossus and established a Jedi Academy and famous library. Ossus became a popular world of the Galactic Republic and was rich and verdant.<hr style='visibility:hidden;'/>&emsp;&emsp;Tragedy struck during the Great Sith War, when Sith Lord Exar Kun attacked Ossus, leading to the multiple-supernova detonation of the Cron Cluster, resulting in a shockwave that ruined Ossus, turning it into an arid wasteland c. 4000 BBY.<hr style='visibility:hidden;'/>&emsp;&emsp;The Jedi saved as many artifacts as they could before the arrival of the shockwave, and later recovered the mosaic floor of the Jedi Temple, moving it to the newer Coruscant temple. A small number of beings survived the destruction, becoming the primitive Ysanna over generations.";
var MonCalaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Mon_Cala' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Dac/' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmMonCala.png' alt='Mon Cala from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 11,030 km<br>Atmosphere: Type I<br><hr>Stars: 2, including Daca<br>Moons: 1</div><p><b>MON CALA (DAC)</b></p><br>&emsp;&emsp;This oceanic world was home to a number of sentient species, the most well-known of which were the Mon Cal and the Quarren. Natives referred to the planet as Dac.<hr style='visibility:hidden;'/>&emsp;&emsp;The Mon Calamari constructed graceful floating cities as well as massive shipyards in an orbiting ring, while the Quarren tended to live in the ocean depths; the two species were often at odds throughout history.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Imperial Era, The Mon Cal joined the Rebellion and converted floating cities or luxury spaceliners into battle cruisers, bolstering the Rebel fleet and helping to lead the charge against the second Death Star at Endor.";
//===== row 07 =====
var IlumPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Ilum' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Ilum/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmIlum.png' alt='Ilum from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 660 km / 5,870 km<br>Atmosphere: Type I<br><hr>Star: Asar<br>Moons: 2</div><p><b>Ilum</b></p><br>&emsp;&emsp;Soon after the formation of the Jedi Order on Ahch-To, a Jedi scout using the Force for navigation was drawn to Ilum via a powerful resonance in the Force.<hr style='visibility:hidden;'/>&emsp;&emsp;Rich in the naturally forming kyber crystals that powered lightsabers, Ilum was secured by the Jedi in antiquity; it was left off all star maps and all mentions of the world were deleted. During the Clone Wars, Jedi younglings traveled here to undergo trials to find their kyber crystals and build their first lightsabers.<hr style='visibility:hidden;'/>&emsp;&emsp;Later, The Empire strip-mined the world on a massive scale, creating an enormous equatorial trench. The First Order capitalized on this and Ilum's kyber crystalline core, when it turned the world into a mobile superweapon called Starkiller Base.";
var IridoniaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Iridonia' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Iridonia/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmIridonia.png' alt='Iridonia from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 2</div><p><b>IRIDONIA</b></p><br>&emsp;&emsp;The Zabrak, horned near-Humans who were native to Iridonia, took to spaceflight early in galactic history; by the time the Duros encountered them, they had colonized five nearby worlds.<hr style='visibility:hidden;'/>&emsp;&emsp;Via its position in the Mid Rim, Iridonia became a key gateway from the Inner Rim to the Outer Rim and was the site of numerous conflicts and battles throughout the centuries.<hr style='visibility:hidden;'/>&emsp;&emsp;Luke Skywalker once visited the world as a New Republic ambassador, and foiled a plot by a Zabrak mad scientist, who had recovered Darth Maul's brain after his death and connected it to a solid-state holographic body, using it to terrorize the local government.";
var OrdMantellPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Ord_Mantell' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Ord_Mantell/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmOrdMantell.png' alt='Ord Mantell from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 14,050 km<br>Atmosphere: Type I<br><hr>Star: Bright Jewel<br>Moons: at least 15</div><p><b>ORD MANTELL</b></p><br>&emsp;&emsp;Colonized c. 12,000 BBY by Corellian settlers, temperate Ord Mantell became one of many Ordnance/Regional Depots at the height of the Galactic Republic. All of its landmasses were dotted with mountain chains.<hr style='visibility:hidden;'/>&emsp;&emsp;Although the Empire established a deepdock here, the planet still managed to maintain neutrality during the Galactic Civil War. Ord Mantell was home to Mantellian Savrips, who were thought to be non-sentient and hunted for many years. Their appearance inspired a dejarik holochess piece.<hr style='visibility:hidden;'/>&emsp;&emsp;Just prior to the Battle of Hoth, Han Solo's run-in with the bounty hunter Skorr on Ord Mantell led to a decision to abandon the Rebel Alliance and deal with his outstanding debt to Jabba the Hutt.";
var NumidianPrPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Numidian_Prime' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmNumidianPr.png' alt='Numidian Prime from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: unknown</div><p><b>NUMIDIAN PRIME</b></p><br>&emsp;&emsp;A beautiful world, it was covered in jungles and swamps inhabited by numerous bird species. It was known as a haven for smugglers, pirates and thieves.<hr style='visibility:hidden;'/>&emsp;&emsp;The female Falleen bounty hunter Shenda Mol operated a stronghold here during the Republic. After Qui-Gon Jinn and Dooku (then a Jedi) tracked her here and captured her, she was imprisoned on Stygeon Prime.<hr style='visibility:hidden;'/>&emsp;&emsp;After being abandoned by Lando Calrissian on Savareen following the infamous Kessel Run incident, Han Solo and Chewbacca eventually made their way here. Solo then won the Millennium Falcon from Calrissian here in a game of sabacc, a card game which had an alternative set of rules based on Numidian Prime.";
var TarisPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Taris' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Taris/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmTaris.png' alt='Taris from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,200 km<br>Atmosphere: Type I<br><hr>Star: Taris<br>Moons: 4</div><p><b>TARIS</b></p><br>&emsp;&emsp;Settled by Human colonists of unknown origin, Taris rapidly developed into an ecumenopolis. It garnered massive wealth from its strategic position at the nexus of important trade routes, but eventually those shifted and Taris's fortunes fell.<hr style='visibility:hidden;'/>&emsp;&emsp;Residents fled; social unrest festered; famine and urban decay set in. Lasting prejudices between Humanocentric nobles and a mostly non-Human underclass led to the Tarisian Civil War c. 4056 BBY. During the Jedi Civil War, the world was conquered and bombed by Revan's Sith Empire.<hr style='visibility:hidden;'/>&emsp;&emsp;Surviving residents moved into ramshackle tenements or old shipping containers. During the Imperial era, Taris's Imperial senator, Tynnra Pamlo, was present at the Rebels' Yavin base just prior to the Battle of Scarif.";
var MandalorePopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Mandalore' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Mandalore/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmMandalore.png' alt='Mandalore from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 9,200 km<br>Atmosphere: Type I (but inhospitable)<br><hr>Star: Mandalore<br>Moons: 1</div><p><b>MANDALORE</b></p><br>&emsp;&emsp;Centuries of war left the world inhospitable, forcing the Mandalorians into domed cities. Prior to the Clone Wars, a pacifist regime came to power. Under Duchess Satine Kryze, those who refused to give up their warrior ways were exiled to Mandalore's moon Concordia.<hr style='visibility:hidden;'/>&emsp;&emsp;This New Mandalorian regime was overthrown by former Sith Lord Maul's Shadow Collective, though the Empire took control after the Clone Wars ended.<hr style='visibility:hidden;'/>&emsp;&emsp;After an insurgency by Bo-Katan Kryze and Clan Wren, the Empire executed a near-genocide against the Mandalorians, scattering them across the galaxy. Around 9 ABY, Bo-Katan took possession of the Darksaber and began gathering forces in an effort to retake Mandalore from the Empire.";
var TheWheelPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/The_Wheel' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/The_Wheel/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmTheWheel.png' alt='The Wheel from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: Besh Gorgon<br>Moons: -</div><p><b>THE WHEEL</b></p><br>&emsp;&emsp;This enormous orbital structure was built as early as the waning years of the Republic, when the Jedi made an uneasy agreement with the station's administrator to stay away from the Wheel. It had a massive central ring the diameter of a small moon.<hr style='visibility:hidden;'/>&emsp;&emsp;Filled with cantinas, casinos (including the famed Crimson Casino and Grand Casino), shopping malls and sporting arenas, it also had a central axis, and at its top, an Executive Tower where administrators lived and worked. airflow cars provided quick access to various areas of the station.<hr style='visibility:hidden;'/>&emsp;&emsp;Sprouting from the central wheel were nearly 100 luxury docking piers. Cheaper nearby docking buoys featured shuttle service to the main station.";
var LothalPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Lothal' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmLothal.png' alt='Lothal from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown km<br>Atmosphere: Type I<br><hr>Star: Lothal<br>Moons: 2</div><p><b>LOTHAL</b></p><br>&emsp;&emsp;Lothal was known for its grassy plains, spine tree forests, low, snow-capped mountains, and shallow inland seas. Aside from Capital City, Lothal was sparsely populated. A hidden Jedi Temple marked the site of a vergence in the Force.<hr style='visibility:hidden;'/>&emsp;&emsp;During the early Imperial era, Lothal suffered from economic woes and invited the Empire to nationalize their industries. While this did bring jobs and prosperity, it also brought Imperial repression, leading to Rebellion.<hr style='visibility:hidden;'/>&emsp;&emsp;A Rebel cell known as the Spectres attracted the attention of Darth Vader and Grand Moff Tarkin, and later Grand Admiral Thrawn. The Spectres and their allies eventually executed a daring raid that drove the Imperials off Lothal entirely.";
//===== row 08 =====
var ExegolPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Exegol' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmExegol.png' alt='Exegol from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 13,649 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 0</div><p><b>EXEGOL (IXIGUL)</b></p><br>&emsp;&emsp;According to legend, this dark desert planet had once been a fertile world before the arrival of the Sith. By the modern era it was a desert wasteland broken only by vast fissures and bathed in dry static lightning.<hr style='visibility:hidden;'/>&emsp;&emsp;One of the oldest Sith bastions, it was completely inhabited by Sith Eternal cultists. Palpatine planned to use it as his permanent seat of power, making it the site of experiments to extend his lifespan via cloning technology, and it was the birthplace of Supreme Leader Snoke.<hr style='visibility:hidden;'/>&emsp;&emsp;Palpatine had a fleet of planet-killing <i>Xyston</i>-class Star Destroyers built here, but they were destroyed during a climactic showdown between the First Order, the Resistance, and a massive civilian fleet called to their aid.";
var CsillaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Csilla' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Csilla/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmCsilla.png' alt='Csilla from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 11,080 km<br>Atmosphere: unknown<br><hr>Star: Csilla<br>Moons: 3</div><p><b>CSILLA</b></p><br>&emsp;&emsp;of the Chiss and capital of the Chiss Ascendancy, Csilla was an ice-locked world unknown to the larger galaxy in the Imperial era. Later surveys revealed it was reachable via careful hyperjumps.<hr style='visibility:hidden;'/>&emsp;&emsp;Scientific studies concluded that the Chiss were descendants of baseline humans who reached Csilla in sleeper ships between 27,500 and 27,000 BBY, and that the ice age that began c. 5000 BBY had spurred few physical changes in the Chiss, whose blue skin was the result of a mineral in the planet's hydrosphere.<hr style='visibility:hidden;'/>&emsp;&emsp;Its capital city of Csaplar was mostly underground. Visitors to the world were led to believe it was heavily populated, but by the close of the Clone Wars, only 60-70 million Chiss remained onworld. Most of those lived in deep, lush, brightly lit and heated caves.";
var DorinPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Dorin' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Dorin/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmDorin.png' alt='Dorin from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 13,400 km<br>Atmosphere: Type III<br><hr>Star: unknown<br>Moons: 1</div><p><b>DORIN</b></p><br>&emsp;&emsp;The homeworld of the Kel Dor was located between two black holes, making navigation to and from the planet treacherous. The atmosphere contained helium and unique gases, with a very low oxygen content Kel Dor had to wear breath masks to filter out oxygen when visiting Type I atmosphere environments.<hr style='visibility:hidden;'/>&emsp;&emsp;Buildings here were constructed to withstand violent weather due to Dorin's unpredictable storms. The Baran Do Sages, a local Force tradition that predated the Jedi, used their gifts to predict weather phenomena.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Clone Wars, the Republic successfully defended Dorin from General Grievous's forces. Jedi General Plo Koon and his niece Sha Koon were from Dorin.";
var BilbringiPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Bilbringi_system' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Bilbringi_VII' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmBilbringi.png' alt='Bilbringi VII from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planetoid<br>Diameter: unknown<br>Atmosphere: none<br><hr>Star: unknown<br>Moons: -</div><p><b>BILBRINGI VII</b></p><br>&emsp;&emsp;The Bilbringi system was home to the important Bilbringi Shipyards, and was strewn with asteroids and other debris. Its placement on the Namadii Corridor hyperlane and close to several military shipping lanes made it a key target during the Thrawn Campaign.<hr style='visibility:hidden;'/>&emsp;&emsp;Bilbringi VII was the largest asteroid in the system and was home of the mineral-based crustaceans known as crystal barnacles despite its lack of atmosphere.<hr style='visibility:hidden;'/>&emsp;&emsp;Grand Moff Tarkin learned that the Seperatist Dreadnaught <i>Lucid Voice</i> was dismantled at Bilbringi just after the Clone Wars. Han Solo was fond of Bilbringi food and shared peppered Bilbringi cheesy meat pies with Leia at their home on Hosnian Prime in 28 ABY.";
var ArkaniaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Arkania' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Arkania/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Arkania from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: Olim<br>Moons: 0</div><p><b>ARKANIA</b></p><br>&emsp;&emsp;Arkania was a frigid world of canyons, mountains, and tundra, rich in diamonds and other precious minerals; many residents worked in mining. The white-eyed Arkanians built enclosed cities to keep the cold out.<hr style='visibility:hidden;'/>&emsp;&emsp;Jedi Master Arca Jeth called Arkania home c. 4000 BBY. The Arkanians were famed for their genetic experiments, including those conducted on the Yaka, from a nearby system. During the Clone Wars, the world managed to avoid any battles but the Arkanians were restricted from exporting any cloning technology. <hr style='visibility:hidden;'/>&emsp;&emsp;In the weeks after the Battle of Endor, The New Republic engaged in a ground battle on Arkania. Later, Arkania was captured by the Yuuzhan Vong until liberated at the end of the war.";
var BerchestPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Berchest' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Berchest/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmBerchest.png' alt='Berchest from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 1</div><p><b>BERCHEST</b></p><br>&emsp;&emsp;An extremly beautiful world, major tourist destination, and later a tradeworld, Berchest featured highly saline seas and strong tides that created gargantuan crystal deposits on the planet's shores, from which the natives sculpted entire cities.<hr style='visibility:hidden;'/>&emsp;&emsp;The most impressive of these was Calius saj Leeloo, or the City of Glowing Crystal, which was considered one of the Twenty Wonders of the Galaxy. In 21 BBY the planet was liberated from the Confederacy of Independent Systems.<hr style='visibility:hidden;'/>&emsp;&emsp;Though the Clone Wars and Galactic Civil War hurt its tourist trade, it used its position along several important trade routes to reinvent itself as a trade nexus. Grand Admiral Thrawn used the world to distract the New Republic forces trying to track his deployments.";
var ObroaSkaiPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Obroa-skai' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Obroa-skai/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmObroaSkai.png' alt='Obroa-skai from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: unknown</div><p><b>OBROA-SKAI</b></p><br>&emsp;&emsp;This planet was famed as a library world, with computers said to store the complete knowledge of the galaxy, including the data records of over 300,000 species, as well as a large collection of Jedi antiquities later destroyed by the Imperial Security Bureau.<hr style='visibility:hidden;'/>&emsp;&emsp;It had a mix of icy deserts, grasslands, mountains, tundras, and frozen oceans. Around 990 BBY a Jedi training academy was located here specializing in data collection and analysis.<hr style='visibility:hidden;'/>&emsp;&emsp;By 4 ABY it was an Imperial fortress world, but was abandoned by the Empire in 5 ABY and was a New Republic stronghold by 7 ABY. Grand Admiral Thrawn raided its information stores for the secret location of Wayland in 9 ABY. It was captured by the invaders during the Yuuzhan Vong War.";
var TaanabPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Taanab' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Taanab/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmTaanab.png' alt='Taanab from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 13,090 km<br>Atmosphere: Type I<br><hr>Star: Tive<br>Moons: 1</div><p><b>TAANAB</b></p><br>&emsp;&emsp;An agriworld supplying food to billions of inhabitants of Mid and Outer Rim worlds, Taanab was located on the Perlemian Trade Route, one of the galaxy's top five super-hyperroutes. Rebel Pilot Wes Janson was born here.<hr style='visibility:hidden;'/>&emsp;&emsp;Crime lord Dryden Vos owned a storehouse on Taanab that held artifacts he had collected. The day after the Battle of Yavin, Rebel Alliance Lieutenant Caluan Ematt was ambushed by Imperial forces on Taanab but fled to the planet Cyrkon in Hutt Space before an Imperial blockade went up.<hr style='visibility:hidden;'/>&emsp;&emsp;Lando Calrissian was fond of recounting his participation in the Battle of Taanab, where he defeated a pirate fleet at some point before the Battle of Endor.";
var WobaniPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Wobani' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmWobani.png' alt='Wobani from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: unknown</div><p><b>WOBANI</b></p><br>&emsp;&emsp;A temperate world covered in hills, rock formations, and mud plains, Wobani was partially hidden by a swirling dust cloud when viewed from orbit. Princess Leia Organa traveled here at 16 on a humanitarian mission, and tricked the Imperial officer in charge into allowing her to resettl 100 locals to Alderaan as refugees.<hr style='visibility:hidden;'/>&emsp;&emsp;Jyn Erso was held in an Imperial labor camp on Wobani until she was recued by the Rebel Alliance's Extraction Team Bravo and K-2SO, a former Imperial KX-series security droid.<hr style='visibility:hidden;'/>&emsp;&emsp;After successfully extracting Erso from the camp, their U-wing encountered a minor technical issue and was forced to take cover in an asteroid field. A Rebel X-wing squadron known as Red Flight came to their aid and rescued them from Imperial forces.";
var KijimiPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kijimi' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmKijimi.png' alt='Kijimi from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 9,874 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 0</div><p><b>KIJIMI</b></p><br>&emsp;&emsp;This rugged world was covered in snow-drifted mountains. After the Empire collapsed, the already lawless Kijimi devolved into anarchy, though it was stabilized by its inhabitants' self-interests.<hr style='visibility:hidden;'/>&emsp;&emsp;The New Republic's relative weakness shook up the galaxy's spice market, leading to increased competition and Zorii Bliss's Spice Runners of Kijimi struck a deal with mine owners on Kessel, allowing Kijimi an exclusive route in an expanded Kessel Run.<hr style='visibility:hidden;'/>&emsp;&emsp;Eventually, the First Order brutally occupied Kijimi. Finn, Poe,and C-3PO traveled here to find droidsmith Babu Frik, hoping he could retrieve information on Exegol's location from C-3PO's memory banks. Shortly afterwards, Kijimi was obliterated by a Xyston-class Star Destroyer's superlaser.";
var SaleucamiPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Saleucami' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Saleucami/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmSaleucami.png' alt='Saleucami from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 14,920 km<br>Atmosphere: Type I<br><hr>Star: Stisste<br>Moons: 3</div><p><b>SALEUCAMI</b></p><br>&emsp;&emsp;Covered in swamps and arid deserts, Saleucami's inhabitants were unable to stay out of the Clone Wars when it was invaded by the Seperatists. A Clone Trooper named Cut deserted here after his gunship crashed and his squad was cut down by battle droids.<hr style='visibility:hidden;'/>&emsp;&emsp;Later he married Twi'lek local Suu Lawquane and made a home for them and her two children. After being separated from Republic forces during a running battle with General Grievous, Rex discovered Cut but decided not to turn him in.<hr style='visibility:hidden;'/>&emsp;&emsp;Jedi Master Stass Allie was killed here during once of the final battles of the Clone Wars, when Order 66 was carried out. During the first days of the Empire, Clone Force 99 helped Cut, Suu, and their children escape offworld.";
var GandPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Gand' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Gand/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmGand.png' alt='Gand from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: ? km<br>Atmosphere: Type IV<br><hr>Star: unknown<br>Moons: unknown</div><p><b>GAND</b></p><br>&emsp;&emsp;Small pocket colonies covered the surface of this rocky world, separated by kilometers of thick mists, giving rise to a local Force tradition of findsmen: shamanistic bounty hunters who worshiped the mists, and tracked their targets by divining omens. <hr style='visibility:hidden;'/>&emsp;&emsp;Though the ammonia atmosphere was suitable to the native Gand, it was poisonous to most other life-forms. Trade and commerce were carried out aboard five orbiting space stations. Ruled by a totalitarian government.<hr style='visibility:hidden;'/>&emsp;&emsp;Remained independent of the Republic during the Clone Wars, but later overrun by the Empire, whose agents brought sophisticated sensor equipment to the world, leading to a decline in findsman traditions.";
//===== row 09 =====
var ChandrilaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Chandrila' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Chandrila/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmChandrila.png' alt='ChandrilaOrbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 13,500 km<br>Atmosphere: Type I<br><hr>Star: Chandrila<br>Moons: 2</div><p><b>CHANDRILA</b></p><br>&emsp;&emsp;Wealthy agriworld with a pleasantly mild climate in the Ringali Shell's Bormea sector. Industry was limited to only one major city, and even there it was subject to strict envronmental regulations.<hr style='visibility:hidden;'/>&emsp;&emsp;All citizens had a direct voice in government and were known for their fierce political debates, though these normally remained nonviolent. At some point, Chandrilan colonists settled G'rho, near Bakura.<hr style='visibility:hidden;'/>&emsp;&emsp;Settled by 25,000 BBY; became one of the Core Founder worlds that came together to found the Republic. Mon Mothma (one of the founders of the Rebellion) hailed from Chandrila and was declared a traitor by Palpatine's New Order.";
var CoruscantPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Coruscant' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Coruscant/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmCoruscant.png' alt='Coruscant from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,240 km<br>Atmosphere: Type I<br><hr>Star: Coruscant Prime<br>Moons: 4</div><p><b>CORUSCANT (NOTRON)</b></p><br>&emsp;&emsp;Capital of governments. An ecumenopolis nicknamed ''Queen of the Core'' or ''City of Spires''; also variously known as Republic Center and Imperial Center. Located at the convergence of numerous major hyperlanes; operated as the effective sociopolitical center of the galaxy for much of its history.<hr style='visibility:hidden;'/>&emsp;&emsp;Ancient home of the Taung race, who later became the original Mandalorians before eventually disappearing.<hr style='visibility:hidden;'/>&emsp;&emsp;Had 5,127 city levels built up from the crust by time of the Clone Wars; levels were divided into megablocks, blocks and subblocks. Once mostly covered in oceans, it was later drained; the artificial Western Sea was a tourist hotspot.";
var UtrostPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Utrost' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Utrost from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>UTROST</b></p><br>&emsp;&emsp;This cospompolitan planet was located only a few light-years from Coruscant and was the homeworld of Rebel Alliance slicer Pash Galae.<br><br><br><br><br><br><br><br><br><br><br><br>";
var BessimirPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Bessimir' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Bessimir from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: 2</div><p><b>BESSIMIR</b></p><br>&emsp;&emsp;This Core world was located only 15 parsecs from Coruscant and c. 6 ABY, it was the location of Operation Hammerblow, the final training mission of the New Republic Fifth Battle Group.<hr style='visibility:hidden;'/>&emsp;&emsp;This fleet was the first in the New Republic Defense Fleet to be comprised entirely of New Class starships such as the Nebula-class Star Destroyer and Endurance-class Fleet carrier, and served during the Black Fleet Crisis.<hr style='visibility:hidden;'/>&emsp;&emsp;<br><br><br><br><br>";
var BelgothsBeacPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Belgoth's_Beacon' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmBelgothsBeac.png' alt='Belgoth's Beacon from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Hyperspace beacon<br>Diameter: unknown<br>Atmosphere: none<br><hr>Star: none<br>Moons: -</div><p><b>BELGOTH'S BEACON</b></p><br>&emsp;&emsp;This hyperspace beacon located along the Perlemian Trade Route was commissioned by Borte Belgoth c. 25,100 BBY. It was one of the original hyperspace beacons.<hr style='visibility:hidden;'/>&emsp;&emsp;Its hull featured the massive sculpted faces of a Columi, a cacodemon, and the mythological Alderaanian creature known as a molator, which also appeared as a dejarik holochess piece.<hr style='visibility:hidden;'/>&emsp;&emsp; Though it was destroyed c. 15,600 BBY during the Second Alsakan Conflict, the historian Vicendi later counted it among the Twenty Wonders of the Galaxy in his work <i>Arturum Galactinum</i>, which was published c. 10,000 BBY.<br><br><br>";
var QuenkPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Quenk_system' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Quenk system' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: System<br>Diameter: -<br>Atmosphere: -<br><hr>Star: unknown<br>Moons: -</div><p><b>QUENK</b></p><br>&emsp;&emsp;Quenk jazz originated in this star System in the Corusca sector.<br><br><br><br><br><br><br><br><br><br><br><br><br>";
var KesPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kes_(Core_Worlds)' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Kes from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>KES</b></p><br>&emsp;&emsp;In 16,921 BBY, this planet was the site of the Battle of Kes during the First Alsakan Conflict, a dispute that arose between Coruscant and Alsakan's brazen competition for worlds in the Expansion Region area of the Slice, for colonization and natural resources.<br><br><br><br><br><br><br><br><br><br><br>";
var AlsakanPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Alsakan' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Alsakan/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmAlsakan.png' alt='Alsakan from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>ALSAKAN</b></p><br>&emsp;&emsp;This ancient, wealthy ecumenopolis world on the Perlemian Trade Route was a regional power broker for centuries. It fought a series of seventeen Alsakan Conflicts with Coruscant over the nature and shape of the early Republic.<hr style='visibility:hidden;'/>&emsp;&emsp;Once a Killik colony, the insectoids were transported to the Unknown Regions c. 30,000 BBY. The major city of Rucapar was site of the Alsakan Mosaics, considered an Ancient Wonder of the Galaxy, but both city and mosaics were mostly destroyed during the Third Alsakan Conflict in 14,450 BBY.<hr style='visibility:hidden;'/>&emsp;&emsp;Alsakan remained loyal to the Republic during the Clone Wars, and later was an Imperial world, though it changed hands several times during the late Galactic Civil War. It was the homeworld of Dr. Cornelius Evazan and Allegiant General Enric Pryde.";
var OpatajjiPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Opatajji' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Opatajji from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>OPATAJJI</b></p><br>&emsp;&emsp;Neera Opatajji-Hirken, the Human female wife of Mirkovig Hirken, was the daughter of the Duke of Opatajji.<br><br><br><br><br><br><br><br><br><br><br><br><br>";
var PerlemiaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Perlemia' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Perlemia from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>PERLEMIA</b></p><br>&emsp;&emsp;In antiquity, extensive shipyards were located at Perlemia, which produced numerous scoutships for hyperspace explorers of the early Galactic Republic. Due to this, it gave the Perlemian Trade Route--one of the five super-hyperroutes of the galaxy--its name.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Tionese war c. 24,000 BBY, the shipyards were destroyed by pressure bombs.<br><br><br><br><br><br><br><br>";
var SkakoPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Skako' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Skako/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmSkako.png' alt='Skako from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type IV<br><hr>Star: unknown<br>Moons: 2</div><p><b>SKAKO</b></p><br>&emsp;&emsp;Skako was an ecumenopolis that nevertheless retained some of its original ecosystems: vast fields of sprawling vines. Due to the dense, methane-based atmospheres, any Skakoans traveling offworld required complicated pressurized environmental suits.<hr style='visibility:hidden;'/>&emsp;&emsp;Skako was discovered by the wider galaxy before the establishment of the Republic, but mostly tried to stay out of wars and other galactic affairs. However, their leading interest in the Techno Union drew them into the Clone Wars.<hr style='visibility:hidden;'/>&emsp;&emsp;After Techno Union Foreman Wat Tambor was murdered on Mustafar along with the rest of the Seperatist Council, the newly formed Galactic Empire crushed the Techno Union and persecuted the Skakoans.";
var HapesPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Hapes' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Hapes/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmHapes.png' alt='Hapes from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,254 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 7</div><p><b>HAPES</b></p><br>&emsp;&emsp;Capital of the Hapes Cluster. Due to its seven shining moons, and surrounded by the shimmering nebulae of the Transitory Mists, Hapes never experienced a true night, and Hapans developed poor night-vision in response.<hr style='visibility:hidden;'/>&emsp;&emsp;Hapes had only a few small, neat cities such as Ta'a Chume'Dan to handle the Hapan Consortium's legal and commercial institutions and the needs of the state bureaucracy.<hr style='visibility:hidden;'/>&emsp;&emsp;Much of the rest of the planet was an unspoiled wilderness. The wild lands of Hapes contained lush primeval forest, snow-capped mountains and broad oceans. Around 3100 BBY, a Queen Mother sealed the borders of the Consortium, beginning a period of isolationism that lasted until 8 ABY, when Leia Organa traveled to Hapes to discuss a possible alliance with the New Republic.";
var OnderonPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Onderon' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Onderon/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmOnderon.png' alt='Onderon from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 15,190 km<br>Atmosphere: Type I<br><hr>Star: Prael<br>Moons: at least 4</div><p><b>ONDERON</b></p><br>&emsp;&emsp;In antiquity, the ancient primitive humans of Onderon struggled to survive due to the vicious flying beasts, who migrated from Onderon's moon Dxun during the closest point of its orbit, when the two bodies' atmospheres overlapped.<hr style='visibility:hidden;'/>&emsp;&emsp;A massive walled city called Iziz sprung up and most inhabitants took refuge there, but criminals were cast out and survived by taming the beasts, leading to centuries of conflict between Iziz and the beast-riders, eventually mediated by Jedi.<hr style='visibility:hidden;'/>&emsp;&emsp; During the Clone Wars, the king was overthrown by Seperatist supporters, but his rule was eventually restored by the efforts of native Saw Gerrera and his martyred sister Steela Gerrera.";
var KashyyykPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kashyyyk' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Kashyyyk/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmKashyyyk.png' alt='Kashyyyk from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,765 km<br>Atmosphere: Type I<br><hr>Star: Kashyyyk<br>Moons: 3</div><p><b>KASHYYYK</b></p><br>&emsp;&emsp;Homeworld of the arboreal Wookiees, its landcape was dominated by kilometers-tall wroshyr trees. On this wild and untamed world, only the bravest or most foolhardy Wookiees ventured to the forest floor, where deadly flora and fauna dominated.<hr style='visibility:hidden;'/>&emsp;&emsp;There were also small desert regions and some large plains, and in its coastal regions the ground and lower levels of forest were less dangerous.<hr style='visibility:hidden;'/>&emsp;&emsp;A major battle of the Clone Wars was fought here, with the Wookiees and Republic emerging victorious. During the Galactic Civil War, Wookiees were enslaved by the Empire and used as slave labor, including during construction of the first Death Star.";
var KintanPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kintan' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Kintan/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmKintan.png' alt='Kintan from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,054 km<br>Atmosphere: Type I<br><hr>Star: Kintan<br>Moons: 3</div><p><b>KINTAN</b></p><br>&emsp;&emsp;The homeworld of the Nikto species was filled with harsh environments including rivers of fire and endless wastes. Many millennia before the Galactic Civil War, a nearby star called M'dweshuu went supernova, bathing Kintan in radiation.<hr style='visibility:hidden;'/>&emsp;&emsp;The Nikto evolved into six distinct sub-species in response to this radiation and their local environments. Around 25,130 BBY a violent cult worshiping the supernova came to power, leading to four civil wars. Under the Treaty of Vontor in 25,100 BBY, the Nikto were permanently indentured to the Hutts.<hr style='visibility:hidden;'/>&emsp;&emsp;Kintan striders, favored pets of the Hutts and the inspiration for one of the pieces in dejarik holochess, were originally from this world, but were eventually driven extinct on Kintan.";
var KlatooinePopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Klatooine' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Klatooine/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmKlatooine.png' alt='Klatooine from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: 1</div><p><b>KLATOOINE</b></p><br>&emsp;&emsp;The humanoid Klatooinian species called this world of mostly desert and some savanna home. The world was conquered by the Hutts as of the Treaty of Vontor in 25,100 BBY. Though the Klatooinian Council of Elders ruled the planet, the Hutt controlled all Klatooinian activities offworld.<hr style='visibility:hidden;'/>&emsp;&emsp;A fountain of liquid wintrium in the Derelkoos Desert was called the Fountain of Ancients and revered as a holy site by the Klatooinians. The native paddy-frogs were a Hutt delicacy. Voraxx, bracil, and the lesser houdoggin also called Klatooine home.<hr style='visibility:hidden;'/>&emsp;&emsp;In 44 ABY the Treaty of Vontor was revoked and a slave revolt against the Hutts broke out; Leia Organa Solo and Galactic Alliance negotiators helped Klatooine gain admission to the Alliance.";
//===== row 10 =====
var JedhaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Jedha' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Jedha/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmJedha.png' alt='Jedha from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Moon<br>Diameter: 11,263 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: -</div><p><b>JEDHA</b></p><br>&emsp;&emsp;Also known as the Pilgrim Moon, Jedha was a cold desert moon of the crystalline oceanic world NaJedha. Its history and spiritual significance gave it a status as a holy site for pilgrims and world of worship for believers in the Force, including the Guardians of the Whills.<hr style='visibility:hidden;'/>&emsp;&emsp;the Empire occupied the moon to control its kyber crystal resources, which were needed for superlaser construction, provoking an insurgency by Onderonian rebel extremist Saw Gerrera and his Partisans.<hr style='visibility:hidden;'/>&emsp;&emsp;Imperial Director Orson Krennic, under the supervision of Grand Moff Tarkin, tested the Death Star's main weapon on the Holy City, obliterating the populace and cracking open the moon.";
var FoerostPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Foerost' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Foerost/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Foerost from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>FOEROST</b></p><br>&emsp;&emsp;Originally a vassal colony of Kaikielius, Foerost gained full Republic membership by 11,000 BBY. In 5,000 BBY, During the Great Hyperspace War, the Foerost Shipyards were attacked by Naga Sadow's fleet.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Great Sith War in 3,996 BBY, a Krath and Mandalorian fleet stole 300 Republic warships from the Foerost shipyards, using them to assault Coruscant. History repeated itself in 3,959 BBY when Sith Lords Revan and Malak stole another Republic fleet, setting off the Jedi Civil War.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Clone Wars, Foerost's shipyards lost some of its prestige to Kuat. Pao, a Drabatan who served in the Rebel Alliance, carried out his first demolitions job here, to destroy a communications tower.";
var TythonPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Tython' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Tython/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmTython.png' alt='Tython from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: Tythos<br>Moons: At least 2</div><p><b>TYTHON</b></p><br>&emsp;&emsp;A world shrouded in myth, one of the earliest first Jedi Temples was built here. In 36,453 BBY, the starships known as Tho Yor deposited Force-sensitive pilgrims from many worlds here, where they established the Je'daii Order.<hr style='visibility:hidden;'/>&emsp;&emsp;Tython experienced intense Force-storms when the balance of the Force was disrupted. In the wake of the Force Wars, the Jedi left for Ossus. The planet was still held by the Republic, though it was abandoned and rediscovered several times over the millennia before becoming obscure by the Imperial era.<hr style='visibility:hidden;'/>&emsp;&emsp;Dr. Chelli Aphra drew Vader's hunt for the Rebel base here to attract attention away from Hoth. Around 9 ABY, Din Djarin brought Grogu here at the urging of Ahsoka Tano, but the child was abducted by Moff Gideon's Dark troopers.";
var IxtlarPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Ixtlar' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Ixtlar/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Ixtlar from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>IXTLAR</b></p><br>&emsp;&emsp;A shopper's paradise where any merchandise could be found, Ixtlar was covered in an eye-dazzling variety of holographic signs and billboards. In 20 BBY it was the site of the Clone Wars Battle of Ixtlar between the Republic's Victory Fleet and the Seperatist Bulwark Fleet.<hr style='visibility:hidden;'/>&emsp;&emsp;At some point, a space station used as the meeting place of a Human-only faction of the Bounty Hunters' Guild exploded, possibly due to sabotage by a rival faction. This event led the guild to accept recruits of any species, and even droids.<hr style='visibility:hidden;'/>&emsp;&emsp;The world was conquered by the Yuuzhan Vong, who were later driven from the Core Worlds after the fall of Yuuzhan'tar.<br><br>";
var AlderaanPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Alderaan' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Alderaan/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmAlderaan.png' alt='Alderaan from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,500 km<br>Atmosphere: Type I<br><hr>Star: Alderaan<br>Moons: 1</div><p><b>ALDERAAN</b></p><br>&emsp;&emsp;Planet of great natural beauty; its residents constructed cities in harmony with nature and strove to protect their natural resources. Among the oldest members of the Galactic Republic.<hr style='visibility:hidden;'/>&emsp;&emsp;Later, during the Galactic Civil War it played an outsize role in the establishment of the Rebel Alliance; subsequently destroyed by Grand Moff Tarkin's first Death Star during the Galactic Civil War.<hr style='visibility:hidden;'/>&emsp;&emsp;Upheld pacifist values. Sometime before the Galactic Civil War its leaders loaded Alderaan's weaponry of war onto a space cruiser and sent it on an autopiloted hyperspace journey, only to be recalled in case of dire emergency. Home to the powerful Organa family, including Bail and his adopted daughter Leia.";
var KuatPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kuat' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Kuat/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmKuat.png' alt='Kuat from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 10,000 km<br>Atmosphere: Type I<br><hr>Star: Kuat<br>Moons: 2</div><p><b>KUAT</b></p><br>&emsp;&emsp;This planet was one of the earliest members of the Galactic Republic. Its massive shipyards encircled the planet for thousands of kilometers and built warships for the Republic, and later the Empire--including Star Destroyers.<hr style='visibility:hidden;'/>&emsp;&emsp;This world of continents and scattered islands had varied environments, including lush forests, rolling green plains, and carefully-tended gardens. Kuat's terraformers were careful not to introduce any dangerous wildlife.<hr style='visibility:hidden;'/>&emsp;&emsp;Settled by Coruscanti via sleeper ship c. 27,500 BBY, Kuat's aristocracy grew as quickly as its shipyards. Kuat, in turn, colonized Axum, Tepasi, and Humbarine. The patronage of the Empire elevated Kuat's wealth to previously unimaginable heights.";
var CommenorPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Commenor' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Commenor/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmCommenor.png' alt='Commenor from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: 2</div><p><b>COMMENOR</b></p><br>&emsp;&emsp;A massive spaceport and trade outpost just outside the Core Worlds, it was well-known for its brandy and gemstones. It began as a colony of Humbarine but later declared its independence, joining the Republic between 25,000 and 22,000 BBY.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Seperatist crisis, Senator Amidala spoke at the University of Commenor. The world was later attacked by the Confederacy of Independent Systems. Jan Dodonna, a native of Commenor, became one of the first Republic Star Destroyer captains and later became a Rebel Alliance General.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Imperial era, Rebel pilots of Red Squadron traveled here to receive astromech droids from smuggler Nera Dantels. By 4 ABY it was an Imperial fortress world.";
var UmbaraPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Umbara' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Umbara/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmUmbara.png' alt='Umbara from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: unknown</div><p><b>UMBARA</b></p><br>&emsp;&emsp;Barely any light from its sun reached the planet because it was shrouded deep in the Ghost Nebula; it was informally known as Shadow World. <hr style='visibility:hidden;'/>&emsp;&emsp;Umbara was part of the Republic from its earliest days. After 3629 BBY, conflict broke out here during the renewed war between the Republic and the Sith Empire. By 1002 BBY, Umbara was controlled by the New Sith Empire and its Umbaran founder, Darth Ruin.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Clone Wars, Umbara joined the Seperatists after its Republic Senator was assassinated. The Republic army led an invasion to retake the planet but were hampered by stiff resistance and betrayal by their Jedi General, Pong Krell.";
var KwennPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kwenn' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Kwenn/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmKwenn.png' alt='Kwenn from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>KWENN</b></p><br>&emsp;&emsp;Sitting on the important Ootmian Pabol Trade Route, on the border between the Mid Rim and Hutt Space, Kwenn was best known for its orbiting space station, a sizeable port with drydock facilities large enough to accomodate a Star Destroyer.<hr style='visibility:hidden;'/>&emsp;&emsp;Kwenn was a part of the Galactic Empire and later on it was a New Republic world. It was the homeworld of Arndall Lott, an Imperial Army General.<hr style='visibility:hidden;'/>&emsp;&emsp;After the Invasion of Naboo, a team of Republic operatives traveled to Kwenn Station on a hunt for a missing Republic arsenal ship. They were attacked by reactivated battle droids on the station's lower levels. During the Yuuzhan Vong War and invasion of the galaxy, it was attacked by the warrior race.";
var KesselPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kessel' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Kessel/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmKessel.png' alt='Kessel from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 7,200 km<br>Atmosphere: Type I<br><hr>Star: Kessa<br>Moons: 3</div><p><b>KESSEL</b></p><br>&emsp;&emsp;While its northern hemisphere was devoted to mining spice, coaxium, and Kesselstone (resulting in barren, tortured landscape), the southern hemisphere was given over to lush sanctuaries. During the Imperial era, the Empire and the Pykes ran several slave-worked mining operations.<hr style='visibility:hidden;'/>&emsp;&emsp;By 10 BBY, the Pyke syndicate operated a coaxium mine using slave labor. Han Solo, Chewbacca, Qi'ra and L3-37 undertook a mission to acquire coaxium fuel, and freed the facility's droids and slave miners as well.<hr style='visibility:hidden;'/>&emsp;&emsp;As Han fled from Imperial TIE fighters, he flew the Millennium Falcon through the Maw black hole cluster, completing the Kessel Run in just twelve parsecs.";
var EaduPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Eadu' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmEadu.png' alt='Eadu from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 14,121 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 1</div><p><b>EADU</b></p><br>&emsp;&emsp;This stormy world featured heavy cloud cover and frequent rainstorms, high winds, and lightning. Deep canyons and tall rock spires characterized an area of the northern hemisphere where the Empire hid a high energy conversion laboratory.<hr style='visibility:hidden;'/>&emsp;&emsp;Orson Krennic put Galen Erso to work on the Death Star superlaser at this facility, but he sent Imperial pilot and defector Bodhi Rook to Jedha with a message for Saw Gerrera about the Death Star's exhaust port.<hr style='visibility:hidden;'/>&emsp;&emsp;a team of Rebels led by Jyn Erso and Cassian Andor arrived to try to locate her father, but Krennic had Erso's team of scientists shot and Rebel starfighters arrived to bomb the complex. Galen Erso died just after being reunited with his daughter.";
//===== row 11 =====
var RakataPrPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Rakata_Prime' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Rakata_Prime/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmRakataPr.png' alt='Rakata Prime from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 9,120 km<br>Atmosphere: Type I<br><hr>Star: Abo<br>Moons: 2</div><p><b>RAKATA PRIME (LEHON)</b></p><br>&emsp;&emsp;Homeworld of the Rakata and secret capital of their empire, this tropical world occupied an area of the Unknown Regions known as the Tempered Wastes, which was otherwise largely void.<hr style='visibility:hidden;'/>&emsp;&emsp;From c. 35,000 - 25,000 BBY, the Rakata ruled the Infinite Empire, using their advanced technology and natural Force sensitivity to subjugate hundreds of worlds and species. Eventually, several disaster befell them and forced them back to their homeworld, which suffered through a brutal civil war that decimated the planet's surface.<hr style='visibility:hidden;'/>&emsp;&emsp;Eventually the Rakatan space station known as the Star Forge was destroyed in a battle between the Republic and Sith, littering the system with wreckage that made it difficult to access the planet. Eventually the Republic annexed it as a historical preserve.";
var ByssPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Byss' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Byss/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmByss.png' alt='Byss from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 21,600 km<br>Atmosphere: Type I<br><hr>Star: Beshqek<br>Moons: 5</div><p><b>BYSS</b></p><br>&emsp;&emsp;Originally ruled by the Rakata c. 30,000 BBY, it was rediscovered no earlier than 45 BBY. Despite the eerie blue-green light from its star, Byss had a lush and fertile environment and was touted as the perfect place to live.<hr style='visibility:hidden;'/>&emsp;&emsp;Emperor Palpatine used the propaganda of a beautiful, mysterious world to lure unsuspecting immigrants here and later drew on their life energies even as he prepared a secret supply of clone bodies for himself.<hr style='visibility:hidden;'/>&emsp;&emsp;Reaching Byss was incredibly hard due the density of surrounding stars and its proximity to the galactic center. It was situated at the end of the Byss Run (an artificial hyperlane kept open by non-mass S-thread boosters).";
var LettowPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Lettow' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Lettow/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Lettow from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>LETTOW</b></p><br>&emsp;&emsp;Lettow was discovered by the wider galaxy sometime between 25,000 and 24,500 BBY, when a Jedi named Xendor requested to establish an academy to study alternate Force traditions. When the Jedi order denied his request, he, Arden Lyn, and several other Jedi, left to start the academy on Lettow anyway.<hr style='visibility:hidden;'/>&emsp;&emsp;Xendor fell to the dark side and continued to attract followers to his newly-formed Legions of Lettow, leading to war with the Jedi and the First Great Schism.<hr style='visibility:hidden;'/>&emsp;&emsp;Eventually Xendor was slain in battle on Columus, the remaining Legions under Arden Lyn were defeated on Lettow, and she fled the planet, pursued by the Jedi.";
var CorelliaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Corellia' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Corellia/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmCorellia.png' alt='Corellia from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 11,000 km<br>Atmosphere: Type I<br><hr>Star: Corell<br>Moons: At least 2</div><p><b>CORELLIA</b></p><br>&emsp;&emsp;Known for its shipyards and ace pilots, it was the homeworld of Han Solo, Wedge Antilles, and many others. Its coastal capital, Coronet City, built Star Destroyers for the Empire.<hr style='visibility:hidden;'/>&emsp;&emsp;Corellia was known as an ancient world whose Human populace held a deep wanderlust. Crime syndicates such as Lady Proxima's White Worms used street urchins known as scrumrats (including a young Han Solo) to do their dirty work. Solo eventually traveled offworld by joining the Imperial army.<hr style='visibility:hidden;'/>&emsp;&emsp; Corellia and its system's other planets were collectively known as the Five Brothers; historians believed an ancient race known as the Celestials built the Corellian system using a massive nearby construct known as Centerpoint Station, which was later colonized.";
var CatoNeimoidiaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Cato_Neimoidia' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Cato_Neimoidia/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmCatoNeimoidia.png' alt='Cato Neimoidia from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 2</div><p><b>CATO NEIMOIDIA</b></p><br>&emsp;&emsp;Located near the Neimoidian homeworld, Cato Neimoidia was the oldest of the Neimoidian purse worlds and featured cities built on massive hammock-like bridges suspended beneath colossal rock arches that curved over the world's acidic oceans.<hr style='visibility:hidden;'/>&emsp;&emsp;It was base of operations for the Trade Federation, who signed the world over to the InterGalactic Banking Clan to gain equity in a new droid factory; nevertheless, the Neimoidians managed to hold the planet.<hr style='visibility:hidden;'/>&emsp;&emsp;At the end of the Clone Wars, Jedi General Plo Koon managed to wrest the world back from the Speratists, but then was executed by his own Clone Troopers when Order 66 was enacted.";
var RuusanPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Ruusan' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Ruusan/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmRuusan.png' alt='Ruusan from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 21,000 km<br>Atmosphere: Type I<br><hr>Stars: Hoth's Brand, Petja<br>Moons: 3</div><p><b>RUUSAN</b></p><br><hr style='visibility:hidden;'/>&emsp;&emsp;Originally a temperate world of forests and rivers, it was inhabited by Humans, near-Human Ruusanians, and a strange, ball-shaped sentient species known as Bouncers.<hr style='visibility:hidden;'/>&emsp;&emsp;The Ruusan Campaign between the Jedi and Sith in 1000 BBY took place here. During the last of seven battles, Sith Lord Kaan set off a thought bomb, wiping out all life forms within the radius of the explosion, including several cities. The Ruusan Reformations that followed restructured the government of the Republic.<hr style='visibility:hidden;'/>&emsp;&emsp;Dark Jedi Jerec tried to claim the power of the Valley of the Jedi, site of the Seventh Battle of Ruusan and a powerful Force nexus, but was defeated by Jedi Kyle Katarn.";
var DaSoochaVPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Da_Soocha_V' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmDaSoochaV.png' alt='Da Soocha V from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Moon<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: Cyax<br>Moons: -</div><p><b>DA SOOCHA V</b></p><br>&emsp;&emsp;Located in the uncharted Cyax system. Da Soocha's fifth satellite was known as the Pinnacle Moon due to its spindly, kilometer-high volcanic spires.<hr style='visibility:hidden;'/>&emsp;&emsp;After the Imperial invasion of Coruscant in 10 ABY, the New Republic was forced to retreat from the Core and established a command base on the Pinnacle Moon due to its obscurity. The sole sentient species were the primitive, winged Ixlls, who were delighted by the arrival of the New Republic, largely because their starships frightened away the predatory tumnors.<hr style='visibility:hidden;'/>&emsp;&emsp;After Luke Skywalker's capture by the reborn Emperor Palpatine, the Emperor's <i>Eclipse</i>-class dreadnaught was destroyed here. Later, however, Palpatine destroyed the moon with the Galaxy Gun's first world-destroying missile.";
var AdubaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Aduba-3' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Aduba-3/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmAduba.png' alt='Aduba-3 from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: Aduba<br>Moons: 1</div><p><b>ADUBA-3</b></p><br>&emsp;&emsp;This isolated world on the Triellus Trade Route was originally settled by colonists of the Sacred Way religion, but was the target of a bogus chromium rush perpetrated by the criminal Tenloss Syndicate.<hr style='visibility:hidden;'/>&emsp;&emsp;Criminals and spacers with nowhere else to go flocked to the planet's sole city, Tun Aduban, turning it into a thriving shadowport by the Galactic Civil War era. The rest of the planet was covered in desert or grassland plains interspersed with occasional maze-stalk farms.<hr style='visibility:hidden;'/>&emsp;&emsp;1n 0 ABY, Han Solo visited to lie low after the Battle of Yavin, but ended up assembling a posse known as the Star-Hoppers of Aduba-3 to stand against a local swoop gang called the Cloud-Riders. These events later inspired a popular holo-doc.";
//===== row 12 =====
var HosnianPrPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Hosnian_Prime' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmHosnianPr.png' alt='Hosnian Prime from Orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: unknown</div><p><b>HOSNIAN PRIME</b></p><br>&emsp;&emsp;A cosmopolitan ecumenopolis like Coruscant. During the last years of the Republic, a factory complex run by Czerka Arms onworld imported slaves, despite slavery's illegality.<hr style='visibility:hidden;'/>&emsp;&emsp;By 28 ABY, Hosnian Prime was voted as capital of the New Republic. That same year, the senatorial complex was bombed by a former Imperial TIE pilot with ties to the First Order. Leia's blood relation to Darth Vader was revealed here, leading to her resignation from the senate to found the Resistance. In 29 ABY, the droid BB-8 was built here.<hr style='visibility:hidden;'/>&emsp;&emsp;In 34 ABY, believing the New Republic to be an illegitimate government, the First Order destroyed Hosnian Prime and its star system using Starkiller Base, turning the planet into a second star surrounded by a new pocket nova.";
var MimbanPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Mimban' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Mimban/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmMimban.png' alt='Mimban from Orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 7,042 km<br>Atmosphere: Type I<br><hr>Star: Circarpous Major<br>Moons: 2</div><p><b>MIMBAN (CIRCARPOUS V)</b></p><br>&emsp;&emsp;A swamp-laden world that was home to several sentient species, including the red-skinned Mimbanese. It was the site of intense conflict between its natives and offworld mining interests drawn to its deep hyperbaride mineral deposits.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Clone Wars, the Republic Army helped the Mimbanese repel an invading Seperatist army, but they were invaded again by the Empire during the Galactic Civil War. The planet's dense, ionized atmosphere constantly draped its marshlands, swamps and rainforests in thunderstorms or mist.<hr style='visibility:hidden;'/>&emsp;&emsp; Han Solo briefly served here during his stint in the Imperial Army before rescuing Chewbacca from Imperial slavery and deserting from Imperial service with Tobias Beckett and his gang.";
var SintaGlacierPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Sinta_Glacier' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmSintaGlacier.png' alt='Name from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Ice asteroid colony<br>Diameter: unknown<br>Atmosphere: none<br><hr>Star: Sinta<br>Moons: -</div><p><b>SINTA GLACIER</b></p><br>&emsp;&emsp;The Sinta Glacier was a massive iceberg in space, billions of years old. It was once the core of a mega-comet that had been caught in orbit around the star Sinta.<hr style='visibility:hidden;'/>&emsp;&emsp;The Sinta Glacier Colony was a settlement bored into the ice of the glacier, which extracted ice cores containing traces of malsarr, a mineral used in the construction of communications equipment, droids and other electronics.<hr style='visibility:hidden;'/>&emsp;&emsp;When Resistance sympathizer Boolio--who worked as a mine overseer at the Sinta Colony--obtained intelligence from a First Order traitor, he contacted the Resistance. Poe Dameron and Finn showed traveled to Sinta in the Millennium Falcon to download the data, but after they left, Boolio was captured and executed by the First Order.";
var HollastinPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Hollastin' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Hollastin/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Hollastin from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: 1</div><p><b>HOLLASTIN</b></p><br>&emsp;&emsp;A minor trade world in Hutt Space, it operated as a clearinghouse for goods imported from other regions of space. <hr style='visibility:hidden;'/>&emsp;&emsp;Located along the Hollastin Run where it met the Pando Spur, the world grew in importance after the Yuuzhan Vong invasion because it remained untouched by the invaders.<br><br><br><br><br><br><br><br><br>";
var TethPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Teth' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Teth/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmTeth.png' alt='Teth from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 8,151 km<br>Atmosphere: Type I<br><hr>Star: Teth<br>Moons: 2</div><p><b>TETH</b></p><br>&emsp;&emsp;This Wild Space world was covered in a mix of tangled, twisted jungles and rocky ground interspersed with high mesas, many of which were topped with their own jungles. Its misty atmosphere filtered light into shades of deep purple to light mauve.<hr style='visibility:hidden;'/>&emsp;&emsp;At one time, Teth served as a prominent vacation spot for the Hutts, but suffered an economic meltdown when the Republic began to crack down on local pirates and other criminals, driving the Hutts offworld.<hr style='visibility:hidden;'/>&emsp;&emsp;During the early Clone Wars, Seperatist forces kidnapped Jabba the Hutt's son and holed up in a fortress-like B'omarr Monastery on a tall, sheer mesa. Republic forces under Anakin Skywalker and his new apprentice Ahsoka Tano recovered the child.";
//===== row 13 =====
var JakkuPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Jakku' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmJakku.png' alt='Jakku from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 6,400 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 2</div><p><b>JAKKU</b></p><br>&emsp;&emsp;A remote desert world considered by many to be worthless, though it later came to be the site of important events that shaped galactic history.<hr style='visibility:hidden;'/>&emsp;&emsp;In 5 ABY it was the site of the Battle of Jakku, which decided the outcome of the Galactic Civil War in favor of the New Republic and littered the planet with starship wrecks. Sometime after the battle, Niima the Hutt established Niima Outpost as a base for scavengers looking to strip the hulks for parts to sell.<hr style='visibility:hidden;'/>&emsp;&emsp;Palpatine discovered the boy Galli here, and used him to carry out his contingency plans in case of his death. Later, the girl Rey was sold to Unkar Plutt here as a child. In 34 ABY, Poe Dameron met Lor San Tekka in the village of Tuanul to retrieve the map to Luke Skywalker's hiding place before being captured by Kylo Ren.";
var DonadusPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Donadus/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Donadus from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown</div><p><b>DONADUS</b></p><br>&emsp;&emsp;The sentient Donadi species originated here, and were known for their meditation techniques, during which they entered a deep trance in which they could see deeper meanings in images. The technique was instrumental in the creation of the Donadi's famed stain-paintings.<hr style='visibility:hidden;'/>&emsp;&emsp;A pirate group known as the Chorran shipjackers operated out of Donadus. At some point between 17 BBY and 0 ABY, bounty hunter Beilert Valance led a group of mercenaries to defeat the pirates, helping to cement his status as an elite hunter and warrior.<br><br><br><br><br>";
var AbregadoRaePopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Abregado-rae' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Abregado-rae/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmAbregadoRae.png' alt='Abregado-rae from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,000 km<br>Atmosphere: Type I<br><hr>Star: Anza<br>Moons: 1</div><p><b>ABREGADO-RAE</b></p><br>&emsp;&emsp;Despite its temperate climate, there was relatively little native life aside from two sentient species, the Gados and the small, low-intelligence Moochers. Considered a backward world, it was also a known smugglers' paradise. The coastal city of Le Yer was also a popular resort, drawing tourists from across the galaxy.<hr style='visibility:hidden;'/>&emsp;&emsp;At some point during the Imperial era, bounty hunter Beilert Valance ran into former fellow Imperial cadet Han Solo on a hit job that became a skirmish at the infamous spaceport on Abregado-rae.<hr style='visibility:hidden;'/>&emsp;&emsp;During Grand Admiral Thrawn's campaign against the New Republic, he gained control of space near Abregado-rae to prepare for a possible attack on Coruscant.";
var MrlsstPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Mrlsst' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Mrlsst/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Mrlsst from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: Mennaalii<br>Moons: unknown</div><p><b>MRLSST</b></p><br>&emsp;&emsp;Only planet in its sector with an indigenous non-Human race. It was a voting member of the League of Tapani Freeworlds. A thick asteroid ring surrounded the world; it was the site of several research stations as well as mining operations for raw materials. <hr style='visibility:hidden;'/>&emsp;&emsp; A moist, humid world; its marshes and sandy swamps were dominated by the ubiquitous towering greenstalk plants, which grew everywhere except the poles.<hr style='visibility:hidden;'/>&emsp;&emsp;Thousands of years before the Galactic Civil War, the world was plagued by frequent groundquakes and tidal waves, leading is native Mrlssi to value knowledge rather than possessions. Mrlsst was home to the famous Mrlsst Trade and Science Academy, the best in its sector and one of the best universities outside of the Core Worlds.";
var DevaronPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Devaron' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Devaron/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmDevaron.png' alt='Devaron from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 2</div><p><b>DEVARON</b></p><br>&emsp;&emsp;The planet's low mountains and deep valleys were linked by thousands of rivers. It was home to the Devaronians, whose lifestyles rapidly developed from hunter-gatherer to industrial, achieving hyperspace travel by 30,000 BBY. <hr style='visibility:hidden;'/>&emsp;&emsp;While the Devaronians' early tribal culture featured strongly divided gender roles; their latter-day representative democracies matured to blur those lines; females became the most prestigious officials, leading to a matriarchal system while males typically opted for roles that suited their primal wanderlust.<hr style='visibility:hidden;'/>&emsp;&emsp;.In 22 BBY, Republic Senator Elsah'sai'Moro was assassinated by Aurra Sing. Soon after, bounty hunter Cad Bane attacked a Republic outpost to capture the Jedi who held a memory crystal that held the locations of Force-sensitive children.";
var PasaanaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Pasaana' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmPasaana.png' alt='Pasaana from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 11,135 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 1</div><p><b>PASAANA</b></p><br>&emsp;&emsp;This desert world was home to the Aki-Aki species, who mostly subsisted by dust farming, using specialized electro-sifters to pluck dangerous seed spores from the desert winds.<hr style='visibility:hidden;'/>&emsp;&emsp;Every 42 years, the Aki-Aki held the Festival of the Ancestors, a legendary event that drew 500,000 Aki-Aki and 5,000 or so offworlders to a site called the Forbidden Valley. Local chiefs hired mercenaries as security during these events.<hr style='visibility:hidden;'/>&emsp;&emsp;Luke Skywalker and Lando Calrissian traveled here sometime after the Battle of Endor to learn more about the Jedi and Sith. In 35 ABY, during a Festival of the Ancients, Rey, Finn, Poe, Chewbacca, C-3P0, and BB-8 traveled here while searching for clues to the location of the revived Emperor Palpatine's hidden world of Exegol.";
//===== row 14 =====
var ThyferraPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Thyferra' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Thyferra/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmThyferra.png' alt='Thyferra from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 10,221<br>Atmosphere: Type I<br><hr>Star: Polith<br>Moons: 2</div><p><b>THYFERRA</b></p><br>&emsp;&emsp;Hot, humid homeworld of the mantis-like Vratix. Most of the galaxy's bacta was cultivated and brewed here, as few other worlds held exactly the right conditions for growing its ingredients. <hr style='visibility:hidden;'/>&emsp;&emsp;About half of Thyferra's surface was covered by rainforest, while the other half was blanketed in alazhi bacteria, one of the two major components of bacta. Although the Vratix pioneered its creation and refinement, they eventually lost or ceded control of the industry to Humans. Emperor Palpatine selected the Zaltin and Xucphra corporations to supply the Empire, eliminating any real competition in the bacta market.<hr style='visibility:hidden;'/>&emsp;&emsp;Arvel Crynyd, the Rebel A-wing pilot who helped destroy the Super Star Destroyer <i>Executor</i>, once piloted Z-95 Headhunters for a bacta cartel here.";
var YagDhulPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Yag&apos;Dhul' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Yag&apos;Dhul/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmYagDhul.png' alt='Yag&apos;Dhul from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: variable<br><hr>Star: unknown<br>Moons: 3</div><p><b>YAG'DHUL</b></p><br>&emsp;&emsp;This small, dense, barren world was the homeworld of the Givin. Its three large moons created extreme tidal forces such that often, the planet's water and atmosphere were drawn to different parts of the world, leaving some areas in vacuum.<hr style='visibility:hidden;'/>&emsp;&emsp;In response, the Givin evolved a hard exoskeleton that allowed them to seal all external orifices, allowing them to survive in vacuum for as long as a day. They were famed as mathematicians and joined the Confederacy of Independent Systems during the Clone Wars.<hr style='visibility:hidden;'/>&emsp;&emsp;The planet was conquered by Imperial Warlord Sander Delvardus after the Battle of Endor, but freed by the New Republic in 5 ABY. Yag'Dhul was a New Republic stronghold by the time of the Thrawn campaign.";
var VandorPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Vandor' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmVandor.png' alt='Vandor from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,500 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 2</div><p><b>VANDOR</b></p><br>&emsp;&emsp;Also known as Vandor-1 or ID 53-80, Vandor was a cold frontier planet occupied by the Empire during the early Imperial Era. Lando Calrissian holed up playing sabacc here as he waited to get the Millennium Falcon out of impound.<hr style='visibility:hidden;'/>&emsp;&emsp;Han Solo and Chewbacca joined Beckett's gang in a heist on an Imperial conveyex train to acquire coaxium for Crimson Dawn's Dryden Vos, but they were foiled by Enfys Nest and her Cloud-Riders, who tried to steal the fuel, forcing Han to drop the load.<hr style='visibility:hidden;'/>&emsp;&emsp;Vandor featured wide plains but was largely snowy and mountainous. The Iridium Mountains held both the Crispin Imperial Depository and Fort Ypso, a village with a saloon called the Lodge, which featured a gambling hall and a droid-fighting arena.";
var BothawuiPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Bothawui/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmBothawui.png' alt='Bothawui from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 9,000 km<br>Atmosphere: Type I<br><hr>Star: Both<br>Moons: 3</div><p><b>BOTHAWUI</b></p><br>&emsp;&emsp;Bothawui became a major trade world due to its location at the junction of four major hyperlanes, but it was known better as the center of the Bothan Spynet, which was widely agreed upon as the best info network in the galaxy and considered neutral territory by the Empire and Alliance, both of whom had spies here.<hr style='visibility:hidden;'/>&emsp;&emsp;The world experienced small ice ages in 70-year cycles of glaciation and retreat. Nearby Bothan colony Kothlis supported Bothawui's technology trade.<hr style='visibility:hidden;'/>&emsp;&emsp;Assassinations, espionage and sabotage were incredibly common here. The world was business-friendly and home to grain farms and ore mines. It was a longtime member of the Republic and had considerable influence due to the skill of its politicians.";
var TammuzAnPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Tammuz-an' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Tammuz-an/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmTammuzAn.png' alt='Tammuz-an from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: at least 2</div><p><b>TAMMUZ-AN</b></p><br>&emsp;&emsp;A double-ringed planet, Tammuz-an was occupied by the Tammuz-an species, tall purple- or blue-skinned humanoids ruled by a monarchy. For at least several decades before the Imperial era, the world lay within Hutt Space, but its borders shrank as the Hutts' influence waned following the Clone Wars, leaving it outside their territory.<hr style='visibility:hidden;'/>&emsp;&emsp;During the early Imperial era, a Tammuz-an prince named Mon Julpa was memory-wiped and banished by Ko Zatec-Cha, his vizier. Eventually, Mon Julpa regained his memory and retook his throne with the help of several outsiders, including R2-D2 and C-3PO.<hr style='visibility:hidden;'/>&emsp;&emsp;Mon Julpa managed to unite his people to drive off Gir Kybo Ren-Cha, a predatory pirate from nearby Tarnoonga.";
//===== row 15 =====
var BatuuPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Batuu' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmBatuu.png' alt='Batuu from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,750 km<br>Atmosphere: Type I<br><hr>Stars: 3<br>Moons: 2</div><p><b>BATUU</b></p><br>&emsp;&emsp;A remote world in a trinary star system on the fringes of the Outer Rim, Batuu was thick with jungles, oceans, and the remains of petrified tree trunks, referred to as ''spires'' by the locals. The opening of new hyperspace routes downgraded the planet from a popular stopover to a mostly forgotten backwater serving as a haven for smugglers, gamblers, explorers, and those looking to avoid the attention of authorities.<hr style='visibility:hidden;'/>&emsp;&emsp;Black Spire Outpost was the planet's largest settlement, while the town of Galma was known for its mechanics and the communities of Peka and Surabat were farming settlements.<hr style='visibility:hidden;'/>&emsp;&emsp;Batuu was populated by a wide variety of fauna, including Batlizards, braga bears, pipa birds, Snarloks, nightsnakes, terra tree toads, Spiran fireflies, and even Kowakian monkey-lizards and porgs. Leia Organa sent the spy Vi Moradi here to build a Resistance base here.";
var NacronisPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Nacronis' target='_blank'><img src='images/t-canon2.png' width='65px'></a><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Nacronis from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: unknown</div><p><b>NACRONIS</b></p><br>&emsp;&emsp;This marshland world was dotted with ancient citadels. Its unique weather led to high winds that occasionally caused massive siltstorms, throwing colorful mud into the air.<hr style='visibility:hidden;'/>&emsp;&emsp;The Empire's massive loss at the Battle of Endor triggered Operation: Cinder, a contingency plan set in place by Emperor Palpatine before his death. In orbit around Nacronis (as well as a number of other worlds), TIE Bombers from the 204th Imperial Fighter Wing deployed vortex detonators, which magnified the siltstorms until they covered the entire planet.<hr style='visibility:hidden;'/>&emsp;&emsp;Nacronis's cities were flooded with silt, drowning all life on the world. 204th Imperial Fighter Wing pilot Yrica Quell's guilt at allowing the attack to occur led her to desert to the New Republic after the genocide.";
var KafrenePopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kafrene_asteroid_belt' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmRingofKafrene.png' alt='Ring of Kafrene from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Asteroid Station<br>Diameter: ? km<br>Atmosphere: None<br><hr>Star: unknown<br>Moons: -</div><p><b>RING OF KAFRENE</b></p><br>&emsp;&emsp;Mining colony and deep-space trading post. Durasteel and plastoid towers joined two misshapen planetoids in the Kafrene asteroid belt.<hr style='visibility:hidden;'/>&emsp;&emsp;The interior of the outpost was given to labyrinthine warrens housing tenement shacks and prefabricated housing recycled from foreign colonies; outside the station's central core, its layout shifted almost daily. Many beings passing through the Ring became stranded here.<hr style='visibility:hidden;'/>&emsp;&emsp;The Ring was constructed by members of Galactic Republic nobility as a potentially lucrative mining venture, but the suspected mineral wealth never materialized. It acted as a junction between the Corellian Trade Spine and the Biox Detour.";
var KaminoPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kamino' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Kamino/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmKamino.png' alt='Kamino from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: _19,270 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 3</div><p><b>KAMINO</b></p><br>&emsp;&emsp;Located in a star system well above the galactic plane, Kamino was home to the Kaminoans: extremely tall, slender, long-necked beings known for their cloning technology, which was used to create the Republic's clone army.<hr style='visibility:hidden;'/>&emsp;&emsp;The ocean planet's existence was subsequently deleted from the Jedi records, but Obi-Wan Kenobi traced Jango Fett here and discovered the secretive cloning program.<hr style='visibility:hidden;'/>&emsp;&emsp;The Kaminoans built massive stilt-cities mostly devoted to cloning research and projects, scattered around the shallow seas. During the early Imperial era, the Empire halted the cloning programs and cleared out the facilities and destroyed all major facilities, including the capital of Tipoca City.";
var ScarifPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Scarif' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmScarif.png' alt='Scarif from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 9,112 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 0</div><p><b>SCARIF</b></p><br>&emsp;&emsp;This isolated tropical paradise was completely envoloped in a planetary deflector shield that could only be entered by a shield gate. It played an outsize role in the Empire's military-industrial complex.<hr style='visibility:hidden;'/>&emsp;&emsp;The Empire built a massive security complex and Citadel Tower across its small volcanic islands, connected by sandy spits and transit tubes. In 9 BBY the Death Star was moved from Geonosis to Scarif to complete its construction.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Battle of Scarif in 0 BBY, the Rebel Alliance successfully stole the battlestation's plans and handed the plans to Princess Leia aboard the <i>Tantive IV</i>. Grand Moff Tarkin fired the Death Star's superlaser at the complex in an effort to stop the transmission, obliterating the citadel, boiling Scarif's oceans, and burning an area of the surface.";
//===== row 16 =====
var LwhekkPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Lwhekk' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Lwhekk/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmLwhekk.png' alt='Lwhekk from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown km<br>Atmosphere: Type I<br><hr>Star: Ssi'kaat<br>Moons: unknown</div><p><b>LWHEKK</b></p><br>&emsp;&emsp;Capital of the Ssi-ruuvi Imperium, Lwhekk was a humid, jungle-dominant planet with volcanoes and oceans, located in the Ssi-ruuk Star Cluster, beyond the galaxy's main disk. The Ssi-ruuk built fragile-looking spired cities that housed a population of 10 billion.<hr style='visibility:hidden;'/>&emsp;&emsp;The xenophobic Ssi-ruuk overcame their fears of dying on ''unconsecrated'' worlds and began conquering worlds to enslave their populations. Eventually they discovered entechment, by which they could drain the life-force of living beings to power their droids.<hr style='visibility:hidden;'/>&emsp;&emsp;In 2 BBY, they struck a deal with Emperor Palpatine, who offered them dozens of worlds to entech in exchange for Ssi-ruuvi technology. They were defeated by the Rebel Alliance at Bakura, and their homeworld was later devastated by the Chiss.";
var BakuraPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Bakura' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Bakura/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmBakura.png' alt='Bakura from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 21,400 km<br>Atmosphere: Type I<br><hr>Star: Bakura<br>Moons: 2</div><p><b>BAKURA</b></p><br>&emsp;&emsp;Home of the indigenous Kurtzen and a sizeable human colonist population, it was one of the largest commercial hubs in Wild Space. Just after the Battle of Endor, Bakura was attacked by the Ssi-ruuk, a xenophobic saurian race, leading to a historic truce between the Rebel Alliance and the Empire, who repulsed the invaders together.<hr style='visibility:hidden;'/>&emsp;&emsp;Bakura briefly joined the New Republic c. 16 ABY but withdrew before 18 ABY. During the Yuuzhan Vong War the Ssi-ruuk again attempted to invade Bakura. Although berayed by its own Prime Minister, Bakura again managed to drive off the Ssi-ruuk and joined the Galactic Alliance.<hr style='visibility:hidden;'/>&emsp;&emsp;Many Bakurans followed the Religion of the Cosmic Balance, while the native Kurtzen followed their own totemic mystical faith.";
var EndorPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Endor' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Endor/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmEndor.png' alt='Endor from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Moon<br>Diameter: 4,900 km<br>Atmosphere: Type I<br><hr>Star: Ibleam<br>Moons: -</div><p><b>ENDOR</b></p><br>&emsp;&emsp;.<hr style='visibility:hidden;'/>&emsp;&emsp;The farthest moon orbiting the gas giant Endor, it was known for the vast number of species it supported, from the sentient Ewoks, Yuzzum, Duloks, Teeks, and Skandit to the semi-sentient Kagles, Wisties and the giant Goraxes.<hr style='visibility:hidden;'/>&emsp;&emsp;Numerous starship crashes on the backwater moon over the millennia haphazardly introduced new species and technologies, shaping the history and ecosystems of the forested moon.<hr style='visibility:hidden;'/>&emsp;&emsp;Although the moon was designated as a nature preserve and gained a reputation as a ''desert island in space'' where spacers were likely to become marooned, the Empire constructed its second Death Star here. Palpatine also chose it as the site of a trap for the Rebel Alliance, resulting in the Battle of Endor and the Emperor's own death.";
var CastilonPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Castilon' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmCastilon.png' alt='Castilon from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 2</div><p><b>CASTILON</b></p><br>&emsp;&emsp;This was the ocean homeworld of the Chelidae and site of the <i>Colossus</i>, a refueling and trading station run by Captain Imanuel Doza during the First Order era.<hr style='visibility:hidden;'/>&emsp;&emsp;Poe Dameron sent pilot-turned-spy Kazuda Xiono and Resistance droid BB-8 to this station to keep tabs on First Order forces, who were interested in taking over the station as a staging area.<hr style='visibility:hidden;'/>&emsp;&emsp;Eventually Xiono was outed as a spy, but with the help of former Rebellion pilot and commander Jarek Yeager, mechanic Neeku Vozo, they managed to rescue Captain Doza from First Order imprisonment, lift the station off the surface, and escape to hyperspace after activating its hyperdrive.";
var TakodanaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Takodana' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmTakodana.png' alt='Takodana from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,100 km<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: 0</div><p><b>TAKODANA</b></p><br>&emsp;&emsp;Covered in forests dotted with many small lakes, Takodana was a popular connection point between the Inner and Outer Rims, especially for smugglers or fugitives looking for a neutral haven.<hr style='visibility:hidden;'/>&emsp;&emsp;A millennia-old castle that was built over an ancient battleground between Jedi and Sith served as an open shadowport run by pirate Queen Maz Kanata. Jyn Erso once spent almost a year here before being leaving and being arrested by the Empire.<hr style='visibility:hidden;'/>&emsp;&emsp;In 34 ABY, Han Solo, Chewbacca, Rey, and Finn traveled here to meet with Kanata. Rey discovered the Skywalker lightsaber after it called out to her in the Force. Shortly afterward, they were betrayed to the First Order, and Takodana Castle was destroyed during heavy fighting between Resistance and First Order forces.";
var GlavisPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Glavis' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmGlavis.png' alt='Glavis from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Space Station<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: -</div><p><b>GLAVIS</b></p><br>&emsp;&emsp;This ringworld space station appeared to orbit a light source resembling a small star. Its interior surface was the site of a city occupied by a wide variety of species, while its outer surface was covered in industrial towers that jutted 'downward' into space. Orbiting mirrors created quick artificial day and night cycles.<hr style='visibility:hidden;'/>&emsp;&emsp;Elevated rail lines ran across and along the ring. Commercial passenger liners offering direct shuttle service to worlds such as Tatooine could dock at points along its sides. Most of the ring's interior was covered in urban sprawl, but it also had plazas and parklands.<hr style='visibility:hidden;'/>&emsp;&emsp;The Mandalorian Din Djarin visited Glavis to locate The Tribe, a small Mandalorian organization who had abandoned their previous covert on Nevarro. He also took a bounty on Klatooinian Kaba Baiz while there.";
var ChristophsisPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Christophsis' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Christophsis/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmChristophsis.png' alt='Christophsis from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 9,465 km<br>Atmosphere: unknown<br><hr>Star: Christoph<br>Moons: 1</div><p><b>CHRISTOPHSIS</b></p><br>&emsp;&emsp;This crystalline world was orbited by a single moon. Prior to 600 BBY, the planet was often struck by stray asteroids due to its proximity to a mineral-rich asteroid belt. However, Tepasi nobles later helped protect the world against asteroid strikes.<hr style='visibility:hidden;'/>&emsp;&emsp;Christophsis was turned into a mining hub, but in the first year of the Clone Wars the Seperatists, including Admiral Trench and General Whorm Loathsom blockaded and invaded the world. The Jedi led Republic forces to a costly victory against the aggressors, as several cities were leveled.<hr style='visibility:hidden;'/>&emsp;&emsp;Later, it reluctantly joined the Galactic Empire but after the latter's fall, it ignored all of the later galactic governments. Christophsis was covered in massive green hexagonal crystals.";
var SavareenPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Savareen' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmSavareen.png' alt='Savareen from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: unknown</div><p><b>SAVAREEN</b></p><br>&emsp;&emsp;Known for its famous brandy drink, this world of sandy landmasses was located at one spur of the Kessel Run. At some point prior to 10 BBY, the crime syndicate Crimson Dawn had a business here, and when the natives tried to fight back, their tongues were cut out.<hr style='visibility:hidden;'/>&emsp;&emsp;Around the same time, the mercenary Gallandro was hired to deal with a group called the Bellwing gang, who had been harassing the settlement of Dry Gulch and its refinery.<hr style='visibility:hidden;'/>&emsp;&emsp;After Han Solo's Kessel run, he and the rest of Beckett's gang traveled here to refine the coaxium they had stolen from the Pyke Syndicate on Kessel, but before they could give the fuel to Dryden Vos, they were caught in a standoff with Enfys Nest and her Cloud-Riders.";
var TatooinePopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Tatooine' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Tatooine/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmTatooine.png' alt='Tatooine from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 10,465 km<br>Atmosphere: Type I<br><hr>Stars: Tatoo I, Tatoo II<br>Moons: 3</div><p><b>TATOOINE</b></p><br>&emsp;&emsp;Covered in deserts and rock formations, Tatooine was hot and arid, with only a relatively mild habitable region in the northern hemisphere dotted with a few towns, settlements and scattered moisture farms.<hr style='visibility:hidden;'/>&emsp;&emsp;Once a lush world with oceans and a jungle, it was subjected to an severe orbital bombardment by the Rakata in antiquity. Prior to the Clone Wars the planet had a sizable slave population, including a young Anakin Skywalker.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Galactic Civil War, Anakin's son Luke left Tatooine after the Empire killed his moisture-farmer parents and he travelled offworld with Obi-Wan Kenobi. He later returned to rescue his friend Han Solo from Tatooine's notorious Hutt crimelord, Jabba.";
var KowakPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Kowak' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Kowak/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmKowak.png' alt='Kowak from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: unknown</div><p><b>KOWAK</b></p><br>&emsp;&emsp;Kowak's landmasses were almost completely covered in tropical rainforests, plateaus, and oceans. It was a colonial governorship and slaver's paradise, with six times as many slaves living onworld as there were free sentients.<hr style='visibility:hidden;'/>&emsp;&emsp;The planet was home to Kowakian ape-lizards. Their smaller cousins, the semi-sentient Kowakian monkey-lizards, possessed a gleeful malevolence that made them irritating to most other sentients at best--and dangerous at worst.<hr style='visibility:hidden;'/>&emsp;&emsp;A group of University of Coruscant zoologists once arrived hoping to study the monkey-lizards' sentience, but once the creatures' apprehensiveness wore off, their cruel pranks sent the scientists packing.";
//===== row 17 =====
var StarForgeStaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/StarForge_Station' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmStarForgeSta.png' alt='StarForge Station from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: -</div><p><b>STARFORGE STATION</b></p><br>&emsp;&emsp;This shadowport was located deep within the StarForge Nebula and was a stopover for smugglers and pirates traveling the Ado Spine. It was originally constructed c. 70 BBY, mostly from starship debris left over from battles fought within the nebula.<hr style='visibility:hidden;'/>&emsp;&emsp;It was respected as a neutral location during the Clone Wars, and its repair facilities were occasionally used by both sides. By the time of the Galactic Civil War, nearly 10,000 sentients occupied the station.<hr style='visibility:hidden;'/>&emsp;&emsp;In 0 ABY, the former Imperial Nebulon-B frigate <i>Far Orbit</i> came here to recruit a replacement crew and officially became a Rebel privateer ship. The hyperspace-capable station housed a shipyard and repair bays as well as warehouses, restaurants, and cyberdocs.";
var SullustPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Sullust' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Sullust/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmSullust.png' alt='Sullust from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,780 km<br>Atmosphere: Type II<br><hr>Star: Sullust<br>Moons: 2</div><p><b>SULLUST</b></p><br>&emsp;&emsp;Home to the Sullustan species, Sullust was a barren world of lava rivers, obsidian badlands, and turquoise lakes populated by hardy wildlife. Sullustans lived in advanced subterranean cities renowned for their beauty, in order to escape the poisonous atmosphere above.<hr style='visibility:hidden;'/>&emsp;&emsp;A network of shuttles and lifts carried the Sullustan workers to surface factories in day and night shifts. The massive conglomerate known as SoroSuub Corporation, famed for its starship factories, employed about half the population.<hr style='visibility:hidden;'/>&emsp;&emsp;Because the Empire reduced Sullust to a state of servitude, there was much sympathy for the Rebellion here; it was regarded as a Rebel safeworld and the Rebel fleet used the world as a staging area prior to the Battle of Endor.";
var CraitPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Crait' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmCrait.png' alt='Crait from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 7,400 km<br>Atmosphere: Type I<br><hr>Star: Crait<br>Moons: 0</div><p><b>CRAIT</b></p><br>&emsp;&emsp;Occupying a remote star system, this small, desolate, uninhabited world featured mountains, canyons, briny seas and vast white salt flats with bright red soil beneath. The world was occasionally wracked with large crystalstorms.<hr style='visibility:hidden;'/>&emsp;&emsp;An early Rebel group led secretly by Bail Organa established a base on the northern continent in 3 BBY. As his daughter Leia Organa investigated the outpost, she discovered her parents' involvement with the nascent Rebellion.<hr style='visibility:hidden;'/>&emsp;&emsp;Although it was abandoned some time before the Battle of Scarif in 0 BBY, the outpost was re-occupied by Resistance forces in 34 ABY. Luke Skywalker ''faced'' Kylo Ren via Force projection here, though he was physically still present on Ahch-To.";
var DQarPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/D&apos;Qar' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmDQar.png' alt='D'Qar from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 10,400 km<br>Atmosphere: Type I<br><hr>Star: Ileenium<br>Moons: 2</div><p><b>D'QAR</b></p><br>&emsp;&emsp;By the Imperial era, this lush planet's original inhabitants had long since disappeared, leaving behind massive ruins, and it served as a shadow planet and supply cache for the Rebel Alliance. By 34 ABY it was the headquarters of Leia Organa's Resistance, which launched its mission to destroy Starkiller Base from D'Qar.<hr style='visibility:hidden;'/>&emsp;&emsp;Afterwards the Resistance attempted to evacuate, but a First Order fleet intercepted them. The Resistance took heavy losses, but destroyed the First Order dreadnaught <i>Fulminatrix</i> and escaped into hyperspace.<hr style='visibility:hidden;'/>&emsp;&emsp;Shortly after the Resistance escape, the <i>Colossus</i>, a supertanker fuel depot fled here to escape the Empire but discovered the base was destroyed. Kazuda Xiono and the pirate Warbird gang instead looted the remains of the dreadnaught for coaxium.";
var NabooPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Naboo' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Naboo/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNaboo.png' alt='Naboo from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,120 km<br>Atmosphere: Type I<br><hr>Star: Naboo<br>Moons: 3</div><p><b>NABOO</b></p><br>&emsp;&emsp;Naboo was home to the Gungan species and a group of Humans known as the Naboo. It was the birthplace of Padme Amidala, mother of Luke and Leia Skywalker, as well as Sheev Palpatine, who became a Republic Senator and Chancellor, secret Sith Lord, and eventual Emperor of the Galactic Empire.<hr style='visibility:hidden;'/>&emsp;&emsp;Palpatine bore no love for his homeworld, choosing it as a target of his posthumous Operation Cinder, though it was spared due to the efforts of Leia Organa and Naboo Queen Sosha Soruna.<hr style='visibility:hidden;'/>&emsp;&emsp;Naboo lacked a molten core and instead had a porous rocky core filled with deep subsurface oceans populated by massive, ravenous sea beasts. The world also boasted great natural beauty in the form of tall waterfalls, rolling grassy plains, and swampy lakes.";
var RylothPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Ryloth' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Ryloth/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmRyloth.png' alt='Ryloth from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 10,600 km<br>Atmosphere: Type I<br><hr>Star: Ryloth<br>Moons: 5</div><p><b>RYLOTH</b></p><br>&emsp;&emsp;Ryloth was a world of dangerous wildlife and varied terrain; it was also home to the Twi'lek species, who mostly lived underground in caves or rock-cut dwellings.<hr style='visibility:hidden;'/>&emsp;&emsp;Located close to Wild Space, Ryloth served as a key spice production facility, whose inhabitants were exploited as slave labor by the Hutts during the Clone Wars, Ryloth suffered a full planet-wide invasion by the Seperatists but were eventually freed by the efforts of Twi'lek freedom fighters led by General Cham Syndulla, but before long the world was an Imperial protectorate.<hr style='visibility:hidden;'/>&emsp;&emsp;In 14 BBY, Syndulla carried out a failed assassination attempt against Darths Sidious and Vader. Cham's daughter Hera became a leader in the Rebellion and later an Alliance/New Republic general in her own right.";
var ShinbonePopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Shinbone' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Shinbone from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: unknown<br><hr>Star: unknown<br>Moons: unknown<br><br></div><p><b>SHINBONE</b></p><br>&emsp;&emsp;A hardscrabble mining world, it was hit by the Hardan plague at some point. <hr style='visibility:hidden;'/>&emsp;&emsp;It was the homeworld of Beilert Valance, a former human Imperial Stormtrooper who was seriously injured and was rebuilt as a cyborg, leading to a deep self-loathing and a hatred of droids. He later became a bounty hunter. <hr style='visibility:hidden;'/><br><br><br><br><br>";
//===== row 18 =====
var BespinPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Bespin' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Bespin/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmBespin.png' alt='Bespin from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet (Gas Giant)<br>Diameter: 118,000 km<br>Atmosphere: Type I<br><hr>Star: Bespin<br>Moons: More than 2</div><p><b>BESPIN</b></p><br>&emsp;&emsp;This gas giant had moderate temperatures and a breathable atmosphere wihin a 30 km thick ''life zone''. It was the site of several tibanna gas mining operations, including Cloud City and Tibannopolis.<hr style='visibility:hidden;'/>&emsp;&emsp;First discovered prior to the Mandalorian Wars, it was auctioned in 3963 and Empress Teta established a small gas mining operation here. It was first colonized in 1989 BBY, and Cloud City was commissioned by Lord Ecclessis Figg c. 400 BBY.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Imperial Era, Lando Calrissian served as Baron Administrator until Han Solo, Leia Organa, Chewbacca, and C-3PO fled here from Hoth. Darth Vader captured them to lure Luke Skywalker into a trap.";
var HothPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Hoth' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Hoth/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmHoth.png' alt='Hoth from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 7,200 km<br>Atmosphere: Type I<br><hr>Star: Hoth<br>Moons: 3</div><p><b>HOTH</b></p><br>&emsp;&emsp;Even with a surface blanketed in ice plains and glaciers, and temperatures dipping below -60°C after nightfall, Hoth supported a minimal web of life, including Wampas, Tauntauns, snowmice, ice scrabblers, and Dragon slugs.<hr style='visibility:hidden;'/>&emsp;&emsp;Apparently once part of the Rakata's Infinite Empire, Hoth was well-known by 4000 BBY, and the Republic suffered a major defeat against a Sith fleet in orbit, showering the frozen world in shipwrecks.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Imperial era, Hoth was occasionally visited by smugglers and pirates, and the Rebel Alliance established Echo Base here in 2 ABY. In 3 ABY the Empire discovered the base, resulting in the Battle of Hoth and the Rebels' desperate scramble to evacuate.";
var EriaduPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Eriadu' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Eriadu/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmEriadu.png' alt='Eriadu from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 13,490 km<br>Atmosphere: Type I<br><hr>Star: Eriadu<br>Moons: at least 1</div><p><b>ERIADU</b></p><br>&emsp;&emsp;A world of jungles and mountains, it was originally settled by Republic pioneers with Coruscant's permission while the growing galactic government sought new resources. It was polluted by industry and the mining of its chief export, lommite ore, a primary component of transparisteel.<hr style='visibility:hidden;'/>&emsp;&emsp;During the High Republic era, Eriadu was the site of tragedy during the Great Hyperspace Disaster, when a piece of debris from the freighter <i>Legacy Run</i> struck Eriadu's moon, killing 1.2 billion inhabitants.<hr style='visibility:hidden;'/>&emsp;&emsp;Eriadu was the homeworld of Imperial Grand Moff Wilhuff Tarkin, formerly lieutenant governor of the planet. After his death in the Battle of Yavin, the Tarkin Memorial Conference Center was built in Eriadu City to honor him.";
var ClakDorPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Bith_(planet)' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Clak&apos;dor_VII' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmClakDor.png' alt='Clak&apos;dor VII from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 9,881 km<br>Atmosphere: Type III<br><hr>Star: Colu<br>Moons: 0</div><p><b>CLAK'DOR VII (BITH)</b></p><br>&emsp;&emsp;Homeworld of the Bith Species, Clak'dor VII suffered ecological collapse due to biological, chemical, and radioactive effects from an ancient civil war. Rapidly mutating flora and fauna filled its poisoned swamps and jungles.<hr style='visibility:hidden;'/>&emsp;&emsp;The Bith people became staunch pacifists and retreated to domed cities tucked into the crags of mountain ranges, burrowing deep into the rock and building high within the domes to alleviate their cramped conditions.<hr style='visibility:hidden;'/>&emsp;&emsp;Offworlders, and even Bith who had grown up elsewhere, found the domed cities to be harsh and depressing. The mutated swamp creature known as the Ghhhk was the model for a dejarik chess-piece.";
//===== row 19 =====
var StarlightBPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Starlight_Beacon' target='_blank'><img src='images/t-canon2.png' width='65px'></a><br><br><img src='images/SmStarlightB.png' alt='Starlight Beacon from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Space Station<br>Diameter: unknown<br>Atmosphere: -<br><hr>Star: unknown<br>Moons: -</div><p><b>STARLIGHT BEACON</b></p><br>&emsp;&emsp;This space station, built on the Galactic Frontier during the High Republic era, was situated within the center of the region's unexplored dark zones, serving as a deep space beacon that guided travelers in this treacherous part of the Outer Rim.<hr style='visibility:hidden;'/>&emsp;&emsp;Regarded as one of the great accomplishments of Supreme Chancellor Lina Soh, Starlight Beacon was also a home to the Jedi, hosting the largest number of Jedi aside from Coruscant at that time, and prominently featured a Jedi temple.<hr style='visibility:hidden;'/>&emsp;&emsp; The station functioned as an observatory, hospital, market, cultural center, and research center, and military outpost of the Republic. The station's hull was nineteen percent triazurite, which helped to boost the station's tranmission signals.";
var MustafarPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Mustafar' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Mustafar/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmMustafar.png' alt='Mustafar from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 4,200 km<br>Atmosphere: Type II<br><hr>Star: Priate<br>Moons: 0</div><p><b>MUSTAFAR</b></p><br>&emsp;&emsp;This small garden world's orbit was shifted when Lady Corvax attempted to use the Bright Star artifact to resurrect her husband. When Mustafar ended up in a gravimetric tug-of-war between the gas giants Jestefad and Lefrani, its core was superheated and its surface was transformed into a volcanic hellscape.<hr style='visibility:hidden;'/>&emsp;&emsp;The arthropodal Mustafarians evolved to survive their changed environment. The ancient Sith were drawn here by legends of Lady Corvax's hunt for immortality, and built a temple here.<hr style='visibility:hidden;'/>&emsp;&emsp;It was later acquired by the Techno Union for mining purposes, and Black Sun's headquarters were located here. The Seperatists built battle droids here, and after Anakin and Obi-Wan's fateful duel, Vader built his personal fortress here.";
var SluisVanPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Sluis_Van' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Sluis_Van/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmSluisVan.png' alt='Sluis Van from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: unknown</div><p><b>SLUIS VAN</b></p><br>&emsp;&emsp;Homeworld of the Sluissi species, Sluis Van was the site of the famous Sluis Van Shipyards, which were the largest and most impressive in the area. The deep-space docking facility was defended by perimeter battle stations.<hr style='visibility:hidden;'/>&emsp;&emsp;The world's government was called the Sluis Van Congregate, and it centered mostly around the management of the shipyards. During the Great Galactic War, the Sluis Van shipyards were destroyed by the Sith.<hr style='visibility:hidden;'/>&emsp;&emsp;During the Thrawn campaign, the Sluis Van shipyards were the site of a battle between Thrawn's forces and the New Republic, and although the Grand Admiral failed to capture any ships during the raid, he did manage to knock out more than 40 vessels' control systems.";
var DagobahPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Dagobah' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Dagobah/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmDagobah.png' alt='Dagobah from Orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 8,900 km<br>Atmosphere: Type I<br><hr>Star: Darlo<br>Moons: 1</div><p><b>DAGOBAH</b></p><br>&emsp;&emsp;This remote, swampy world served as a refuge for Yoda after the events of Order 66 and the site of Luke Skywalker's training until Yoda's death in 4 ABY. Though it was located near the Rimma Trade Route (one of the galaxy's largest hyperlanes), Dagobah itself was only accessible by obscure hyperroutes.<hr style='visibility:hidden;'/>&emsp;&emsp;A humid, swampy world enshrouded in thick mists that could make navigation difficult, it was home to a host of wildlife including bogwings, dragonsnakes, swamp slugs, and sleen.<hr style='visibility:hidden;'/>&emsp;&emsp;It rarely appeared on astrography charts and was re-scouted several times. In 39 BBY the first official Republic survey ended in disaster when Alderaanian scouts were devoured by wildlife. A stranded pre-Clone Wars expedition resorted to cannibalism.";
var UtapauPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Utapau' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Utapau/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmUtapau.png' alt='Utapau from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: 12,900 km<br>Atmosphere: Type I<br><hr>Star: Utapau<br>Moons: 9</div><p><b>UTAPAU</b></p><br>&emsp;&emsp;This arid world's scrublands and savannas were pocked with massive sinkholes. THere was little surface water, but a vast, subterranean ocean encircled the world just below the upper crust.<hr style='visibility:hidden;'/>&emsp;&emsp;Due to the lack of large trees, Utapauan architecture made extensive use of large animal bones. The world attempted to remain neutral during most galacic conflicts. Two sentient species, the slender and tall Pau'ans, and the short and stubby Utai, called the world home.<hr style='visibility:hidden;'/>&emsp;&emsp;Obi-Wan Kenobi confronted General Grievous on Utapau and slew him after a protracted duel just before the execution of Order 66. Kenobi escaped, but many locals were transported to Byss, where they were used as slaves in ''recolonization efforts.''";
var OrtoPlutoniaPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Orto_Plutonia' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/Orto_Plutonia/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmNoImage.png' alt='Orto Plutonia from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: unknown<br>Atmosphere: Type I<br><hr>Star: unknown<br>Moons: at least 2</div><p><b>ORTO PLUTONIA & PANTORA</b></p><br>&emsp;&emsp;A desolate icy planet in the Pantora system, Orto Plutonia was orbited by its moons, including Pantora, home of the near-Human Pantorans. The tribes of Talz inhabiting Orto Plutonia were granted independence following a short conflict with the Pantorans during the Clone Wars.<hr style='visibility:hidden;'/>&emsp;&emsp;Pantora was a member of the Republic, represented by Riyo Chuchi in the Senate. In 21 BBY the moon was blockaded by the Trade Federation, who falsely claimed that Pantora owed them substantial debts, hoping to force them to join the Seperatists.<hr style='visibility:hidden;'/>&emsp;&emsp;Just after the declaration of the Galactic Empore, Clone Force 99 stopped here to refuel. Bounty hunter Fennec Shand pursued them before they managed to escape offworld.";

//	var namePopup  = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/name' target='_blank'><img src='images/t-canon2.png' width='65px'></a><a href='https://starwars.fandom.com/wiki/name/Legends' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmName.png' alt='Name from orbit' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Planet<br>Diameter: _,___ km<br>Atmosphere: Type I<br><hr>Star: ____<br>Moons: _</div><p><b>NAME</b></p><br>&emsp;&emsp;_.<hr style='visibility:hidden;'/>&emsp;&emsp;_.<hr style='visibility:hidden;'/>&emsp;&emsp;_.";

// Tokmia, Quesh, Pybus, -- Kokash, Botor -- Nar Kaaga, Allyuen?

// specify popup options 
var customOptions =
{
  'maxWidth': '500',
  'className': 'custom'
}

//FeatureGroups for Zoom Levels
var zoom04 = new L.FeatureGroup();
var zoom05 = new L.FeatureGroup();
var zoom06 = new L.FeatureGroup();
var zoom07 = new L.FeatureGroup();
var zoom08 = new L.FeatureGroup();
var zoom09 = new L.FeatureGroup();
var zoom10 = new L.FeatureGroup();
var zoom11 = new L.FeatureGroup();

//=== COORDINATE MARKERS ===== Y COORD / X COORD ======================================================================================================= X / Y
const LetterAtop = L.marker([-52.00, 56.50], { icon: invisible1 }).bindTooltip("A", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterBtop = L.marker([-52.00, 63.00], { icon: invisible1 }).bindTooltip("B", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterCtop = L.marker([-52.00, 69.50], { icon: invisible1 }).bindTooltip("C", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterDtop = L.marker([-52.00, 76.00], { icon: invisible1 }).bindTooltip("D", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterEtop = L.marker([-52.00, 82.50], { icon: invisible1 }).bindTooltip("E", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterFtop = L.marker([-52.00, 89.00], { icon: invisible1 }).bindTooltip("F", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterGtop = L.marker([-52.00, 95.50], { icon: invisible1 }).bindTooltip("G", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterHtop = L.marker([-52.00, 102.00], { icon: invisible1 }).bindTooltip("H", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterItop = L.marker([-52.00, 108.50], { icon: invisible1 }).bindTooltip("I", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterJtop = L.marker([-52.00, 115.00], { icon: invisible1 }).bindTooltip("J", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterKtop = L.marker([-52.00, 121.50], { icon: invisible1 }).bindTooltip("K", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterLtop = L.marker([-52.00, 128.00], { icon: invisible1 }).bindTooltip("L", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterMtop = L.marker([-52.00, 134.50], { icon: invisible1 }).bindTooltip("M", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterNtop = L.marker([-52.00, 141.00], { icon: invisible1 }).bindTooltip("N", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterOtop = L.marker([-52.00, 147.50], { icon: invisible1 }).bindTooltip("O", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterPtop = L.marker([-52.00, 154.00], { icon: invisible1 }).bindTooltip("P", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterQtop = L.marker([-52.00, 160.50], { icon: invisible1 }).bindTooltip("Q", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterRtop = L.marker([-52.00, 167.00], { icon: invisible1 }).bindTooltip("R", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterStop = L.marker([-52.00, 173.50], { icon: invisible1 }).bindTooltip("S", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterTtop = L.marker([-52.00, 180.00], { icon: invisible1 }).bindTooltip("T", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterUtop = L.marker([-52.00, 186.50], { icon: invisible1 }).bindTooltip("U", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterVtop = L.marker([-52.00, 193.00], { icon: invisible1 }).bindTooltip("V", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterWtop = L.marker([-52.00, 199.50], { icon: invisible1 }).bindTooltip("W", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);

const LetterAbot = L.marker([-204.00, 56.50], { icon: invisible1 }).bindTooltip("A", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterBbot = L.marker([-204.00, 63.00], { icon: invisible1 }).bindTooltip("B", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterCbot = L.marker([-204.00, 69.50], { icon: invisible1 }).bindTooltip("C", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterDbot = L.marker([-204.00, 76.00], { icon: invisible1 }).bindTooltip("D", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterEbot = L.marker([-204.00, 82.50], { icon: invisible1 }).bindTooltip("E", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterFbot = L.marker([-204.00, 89.00], { icon: invisible1 }).bindTooltip("F", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterGbot = L.marker([-204.00, 95.50], { icon: invisible1 }).bindTooltip("G", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterHbot = L.marker([-204.00, 102.00], { icon: invisible1 }).bindTooltip("H", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterIbot = L.marker([-204.00, 108.50], { icon: invisible1 }).bindTooltip("I", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterJbot = L.marker([-204.00, 115.00], { icon: invisible1 }).bindTooltip("J", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterKbot = L.marker([-204.00, 121.50], { icon: invisible1 }).bindTooltip("K", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterLbot = L.marker([-204.00, 128.00], { icon: invisible1 }).bindTooltip("L", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterMbot = L.marker([-204.00, 134.50], { icon: invisible1 }).bindTooltip("M", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterNbot = L.marker([-204.00, 141.00], { icon: invisible1 }).bindTooltip("N", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterObot = L.marker([-204.00, 147.50], { icon: invisible1 }).bindTooltip("O", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterPbot = L.marker([-204.00, 154.00], { icon: invisible1 }).bindTooltip("P", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterQbot = L.marker([-204.00, 160.50], { icon: invisible1 }).bindTooltip("Q", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterRbot = L.marker([-204.00, 167.00], { icon: invisible1 }).bindTooltip("R", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterSbot = L.marker([-204.00, 173.50], { icon: invisible1 }).bindTooltip("S", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterTbot = L.marker([-204.00, 180.00], { icon: invisible1 }).bindTooltip("T", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterUbot = L.marker([-204.00, 186.50], { icon: invisible1 }).bindTooltip("U", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterVbot = L.marker([-204.00, 193.00], { icon: invisible1 }).bindTooltip("V", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const LetterWbot = L.marker([-204.00, 199.50], { icon: invisible1 }).bindTooltip("W", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);

const Number01left = L.marker([-56.20, 52.00], { icon: invisible1 }).bindTooltip("01", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number02left = L.marker([-62.70, 52.00], { icon: invisible1 }).bindTooltip("02", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number03left = L.marker([-69.20, 52.00], { icon: invisible1 }).bindTooltip("03", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number04left = L.marker([-75.70, 52.00], { icon: invisible1 }).bindTooltip("04", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number05left = L.marker([-82.20, 52.00], { icon: invisible1 }).bindTooltip("05", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number06left = L.marker([-88.70, 52.00], { icon: invisible1 }).bindTooltip("06", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number07left = L.marker([-95.20, 52.00], { icon: invisible1 }).bindTooltip("07", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number08left = L.marker([-101.70, 52.00], { icon: invisible1 }).bindTooltip("08", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number09left = L.marker([-108.20, 52.00], { icon: invisible1 }).bindTooltip("09", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number10left = L.marker([-114.70, 52.00], { icon: invisible1 }).bindTooltip("10", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number11left = L.marker([-121.20, 52.00], { icon: invisible1 }).bindTooltip("11", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number12left = L.marker([-127.70, 52.00], { icon: invisible1 }).bindTooltip("12", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number13left = L.marker([-134.20, 52.00], { icon: invisible1 }).bindTooltip("13", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number14left = L.marker([-140.70, 52.00], { icon: invisible1 }).bindTooltip("14", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number15left = L.marker([-147.20, 52.00], { icon: invisible1 }).bindTooltip("15", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number16left = L.marker([-153.70, 52.00], { icon: invisible1 }).bindTooltip("16", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number17left = L.marker([-160.20, 52.00], { icon: invisible1 }).bindTooltip("17", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number18left = L.marker([-166.70, 52.00], { icon: invisible1 }).bindTooltip("18", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number19left = L.marker([-173.20, 52.00], { icon: invisible1 }).bindTooltip("19", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number20left = L.marker([-179.70, 52.00], { icon: invisible1 }).bindTooltip("20", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number21left = L.marker([-186.20, 52.00], { icon: invisible1 }).bindTooltip("21", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number22left = L.marker([-192.70, 52.00], { icon: invisible1 }).bindTooltip("22", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number23left = L.marker([-199.20, 52.00], { icon: invisible1 }).bindTooltip("23", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);

const Number01right = L.marker([-56.20, 204.00], { icon: invisible1 }).bindTooltip("01", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number02right = L.marker([-62.70, 204.00], { icon: invisible1 }).bindTooltip("02", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number03right = L.marker([-69.20, 204.00], { icon: invisible1 }).bindTooltip("03", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number04right = L.marker([-75.70, 204.00], { icon: invisible1 }).bindTooltip("04", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number05right = L.marker([-82.20, 204.00], { icon: invisible1 }).bindTooltip("05", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number06right = L.marker([-88.70, 204.00], { icon: invisible1 }).bindTooltip("06", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number07right = L.marker([-95.20, 204.00], { icon: invisible1 }).bindTooltip("07", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number08right = L.marker([-101.70, 204.00], { icon: invisible1 }).bindTooltip("08", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number09right = L.marker([-108.20, 204.00], { icon: invisible1 }).bindTooltip("09", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number10right = L.marker([-114.70, 204.00], { icon: invisible1 }).bindTooltip("10", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number11right = L.marker([-121.20, 204.00], { icon: invisible1 }).bindTooltip("11", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number12right = L.marker([-127.70, 204.00], { icon: invisible1 }).bindTooltip("12", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number13right = L.marker([-134.20, 204.00], { icon: invisible1 }).bindTooltip("13", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number14right = L.marker([-140.70, 204.00], { icon: invisible1 }).bindTooltip("14", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number15right = L.marker([-147.20, 204.00], { icon: invisible1 }).bindTooltip("15", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number16right = L.marker([-153.70, 204.00], { icon: invisible1 }).bindTooltip("16", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number17right = L.marker([-160.20, 204.00], { icon: invisible1 }).bindTooltip("17", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number18right = L.marker([-166.70, 204.00], { icon: invisible1 }).bindTooltip("18", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number19right = L.marker([-173.20, 204.00], { icon: invisible1 }).bindTooltip("19", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number20right = L.marker([-179.70, 204.00], { icon: invisible1 }).bindTooltip("20", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number21right = L.marker([-186.20, 204.00], { icon: invisible1 }).bindTooltip("21", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number22right = L.marker([-192.70, 204.00], { icon: invisible1 }).bindTooltip("22", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
const Number23right = L.marker([-199.20, 204.00], { icon: invisible1 }).bindTooltip("23", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-crd' }).addTo(map);
//=== SECTORS ================ Y COORD / X COORD ======================================================================================================= X / Y
const STwilightVoid = L.marker([-92.84, 73.91], { icon: invisible1 }).bindTooltip("TWILIGHTVOID", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(STwilightVoid);
const SStratosDistr = L.marker([-92.37, 80.34], { icon: invisible1 }).bindTooltip("STRATOS DISTRIBUTION", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SStratosDistr);
const SBlackHole = L.marker([-100.16, 93.99], { icon: invisible1 }).bindTooltip("BLACK HOLE SECTOR", { permanent: true, direction: 'center', offset: [0, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SBlackHole);
const STheWastes = L.marker([-64.35, 118.84], { icon: invisible1 }).bindTooltip("THE WASTES", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(STheWastes);
const SGreeEnclave = L.marker([-64.70, 124.59], { icon: invisible1 }).bindTooltip("GREE ENCLAVE", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SGreeEnclave);
const SVeragi = L.marker([-63.16, 125.84], { icon: invisible1 }).bindTooltip("VERAGI", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SVeragi);
const SDalonbian = L.marker([-62.94, 130.34], { icon: invisible1 }).bindTooltip("DALONBIAN", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SDalonbian);
const SSpinward = L.marker([-62.23, 136.67], { icon: invisible1 }).bindTooltip("SPINWARD", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SSpinward);
const STransVulta = L.marker([-96.23, 144.75], { icon: invisible1 }).bindTooltip("TRANS-VULTA", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(STransVulta);
const SOjoster = L.marker([-94.42, 143.89], { icon: invisible1 }).bindTooltip("OJOSTER", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SOjoster);
const SMeerian = L.marker([-91.27, 145.88], { icon: invisible1 }).bindTooltip("MEERIAN", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SMeerian);
const SMandalore = L.marker([-93.37, 146.27], { icon: invisible1 }).bindTooltip("MANDALORE", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SMandalore);
const SBelsmuth = L.marker([-91.04, 149.24], { icon: invisible1 }).bindTooltip("BELSMUTH", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SBelsmuth);
const SThusa = L.marker([-96.54, 149.40], { icon: invisible1 }).bindTooltip("THUSA", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SThusa);
const SDemetras = L.marker([-93.76, 152.93], { icon: invisible1 }).bindTooltip("DEMETRAS", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SDemetras);
const SGordianReach = L.marker([-84.30, 157.33], { icon: invisible1 }).bindTooltip("GORDIAN REACH", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SGordianReach);
const SBelderone = L.marker([-87.89, 165.33], { icon: invisible1 }).bindTooltip("BELDERONE", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SBelderone);
const SSpadja = L.marker([-85.80, 166.12], { icon: invisible1 }).bindTooltip("SPADJA", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SSpadja);
const SBortele = L.marker([-101.91, 169.02], { icon: invisible1 }).bindTooltip("BORTELE", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SBortele);
const SThanium = L.marker([-85.98, 170.17], { icon: invisible1 }).bindTooltip("THANIUM", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SThanium);
const SSuolriep = L.marker([-101.34, 172.45], { icon: invisible1 }).bindTooltip("SUOLRIEP", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SSuolriep);
const SPhelleem = L.marker([-96.58, 172.58], { icon: invisible1 }).bindTooltip("PHELLEEM", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SPhelleem);
const STharin = L.marker([-102.94, 176.81], { icon: invisible1 }).bindTooltip("THARIN", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(STharin);
const SAshWorlds = L.marker([-93.47, 177.94], { icon: invisible1 }).bindTooltip("ASH WORLDS", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SAshWorlds);
const SCadma = L.marker([-101.98, 179.14], { icon: invisible1 }).bindTooltip("CADMA", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SCadma);
const SJubilar = L.marker([-97.28, 180.58], { icon: invisible1 }).bindTooltip("JUBILAR", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SJubilar);
const SShadola = L.marker([-99.63, 183.22], { icon: invisible1 }).bindTooltip("SHADOLA", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SShadola);
const SCentrality = L.marker([-102.41, 183.55], { icon: invisible1 }).bindTooltip("CENTRALITY", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SCentrality);
const SDominus = L.marker([-96.20, 185.67], { icon: invisible1 }).bindTooltip("DOMINUS", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sec' }); zoom06.addLayer(SDominus);

const SSColunda = L.marker([-98.84, 171.48], { icon: invisible1 }).bindTooltip("COLUNDA", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sub' }); zoom07.addLayer(SSColunda);
const SSIotranExpan = L.marker([-104.94, 172.77], { icon: invisible1 }).bindTooltip("IOTRAN<br>EXPANSE", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sub' }); zoom07.addLayer(SSIotranExpan);
const SSKarstaxon = L.marker([-104.89, 173.80], { icon: invisible1 }).bindTooltip("KARSTAXON<br>REGIONS", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sub' }); zoom07.addLayer(SSKarstaxon);
const SSAnsuroer = L.marker([-103.56, 173.80], { icon: invisible1 }).bindTooltip("ANSUROER", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sub' }); zoom07.addLayer(SSAnsuroer);
const SSPeriphery = L.marker([-104.82, 176.01], { icon: invisible1 }).bindTooltip("THE PERIPHERY", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sub' }); zoom07.addLayer(SSPeriphery);
const SSLothal = L.marker([-93.91, 185.02], { icon: invisible1 }).bindTooltip("LOTHAL", { permanent: true, direction: 'center', offset: [-2, 0], className: 'leaflet-tooltip-sub' }); zoom07.addLayer(SSLothal);



//=== NAME =================== Y COORD / X COORD ======================================================================================================= X / Y
//========================================= row 01 ===== BELKADAN ==========================
const Belkadan = L.marker([-58.86, 128.86], { icon: pltIconLeg }).bindTooltip("Belkadan", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(BelkadanPopup, customOptions).addTo(map);
//========================================= row 02 ===== GREE ==============================
const Salfrem = L.marker([-63.84, 118.64], { icon: planetIcon }).bindTooltip("Salfrem", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Salfrem);
const Zeta = L.marker([-63.47, 119.83], { icon: planetIcon }).bindTooltip("Zeta", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Zeta);
const Mortis = L.marker([-63.92, 120.86], { icon: planetIcon }).bindTooltip("Crelythiumn / Mortis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mortis);
const NharquisL = L.marker([-64.90, 123.36], { icon: nebIconBlk }).bindTooltip("Nharquis'l", { permanent: true, direction: 'left', offset: [-1, -1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NharquisL);
const TeHasa = L.marker([-65.25, 123.95], { icon: planetIcon }).bindTooltip("Te Hasa", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(TeHasa);
const Malanose = L.marker([-65.84, 124.53], { icon: planetIcon }).bindTooltip("Malanose", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Malanose);
const Gree = L.marker([-65.40, 125.22], { icon: pltIconCaL }).bindTooltip("Gree", { permanent: true, direction: 'left', offset: [-3, -1], className: 'leaflet-tooltip    ' }).bindPopup(GreePopup, customOptions).addTo(map);
const LichaIn = L.marker([-65.53, 125.94], { icon: planetIcon }).bindTooltip("Licha In", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(LichaIn);
const Reyvia = L.marker([-62.17, 126.16], { icon: planetIcon }).bindTooltip("Reyvia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Reyvia);
const Rychel = L.marker([-64.97, 118.64], { icon: planetIcon }).bindTooltip("Rychel", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Rychel);
const Helska = L.marker([-63.97, 128.06], { icon: planetIcon }).bindTooltip("Helska", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Zipthar = L.marker([-65.81, 130.94], { icon: planetIcon }).bindTooltip("Zipthar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Zipthar);
const Hettitite = L.marker([-64.69, 131.75], { icon: planetIcon }).bindTooltip("Hettitite", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hettitite);
const Felin = L.marker([-64.13, 136.17], { icon: planetIcon }).bindTooltip("Felin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Felin);
const Xo = L.marker([-64.28, 138.41], { icon: planetIcon }).bindTooltip("Xo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const OrdJanon = L.marker([-60.88, 140.94], { icon: planetIcon }).bindTooltip("Ord Janon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Serianan = L.marker([-65.73, 156.72], { icon: planetIcon }).bindTooltip("Serianan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Salfrem);
//========================================= row 03 ===== BONADAN ===========================
const ArdisOutpost = L.marker([-71.80, 97.30], { icon: statonIcon }).bindTooltip("Ardis Outpost", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ArdisOutpost);
const PerannN = L.marker([-68.08, 102.75], { icon: nebIconBlk }).bindTooltip("PerannN", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PerannN);
const Rhand = L.marker([-68.28, 102.75], { icon: planetIcon }).bindTooltip("Rhand", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Rhand);
const Eckless = L.marker([-68.61, 112.95], { icon: planetIcon }).bindTooltip("Eckless", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Eckless);
const Orinackra = L.marker([-72.20, 114.87], { icon: planetIcon }).bindTooltip("Orinackra", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Orinackra);
const Xerton = L.marker([-68.48, 115.38], { icon: planetIcon }).bindTooltip("Xerton", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Xerton);
const Taspir = L.marker([-71.95, 115.92], { icon: planetIcon }).bindTooltip("Taspir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Taspir);
const Qonto = L.marker([-68.52, 116.87], { icon: planetIcon }).bindTooltip("Qonto", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Qonto);
const RimceeSta = L.marker([-69.91, 117.02], { icon: statonIcon }).bindTooltip("Rimcee Sta.", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(RimceeSta);
const Dolis = L.marker([-71.56, 117.38], { icon: planetIcon }).bindTooltip("Dolis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dolis);
const Kindlabethia = L.marker([-70.95, 117.63], { icon: planetIcon }).bindTooltip("Kindlabethia", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kindlabethia);
const Lokondo = L.marker([-70.61, 118.16], { icon: planetIcon }).bindTooltip("Lokondo", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lokondo);
const Bescane = L.marker([-71.90, 118.93], { icon: planetIcon }).bindTooltip("Bescane", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bescane);
const Bastion = L.marker([-69.38, 119.00], { icon: pltIconCaL }).bindTooltip("Bastion (Sartinaynian)", { permanent: true, direction: 'left', offset: [-2, -1], className: 'leaflet-tooltip    ' }).bindPopup(BastionPopup, customOptions).addTo(map);
const Anorelga = L.marker([-67.94, 119.38], { icon: planetIcon }).bindTooltip("Anorelga", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Anorelga);
const EdgeOfGalaxy = L.marker([-67.26, 119.63], { icon: planetIcon }).bindTooltip("Edge of the Galaxy", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(EdgeOfGalaxy);
const Aracara = L.marker([-66.58, 120.12], { icon: planetIcon }).bindTooltip("Aracara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Aracara);
const MulvarSta = L.marker([-71.91, 120.73], { icon: statonIcon }).bindTooltip("Mulvar Sensor Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(MulvarSta);
const Bnar = L.marker([-70.53, 120.92], { icon: planetIcon }).bindTooltip("Bnar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bnar);
const Artorias = L.marker([-68.48, 121.53], { icon: planetIcon }).bindTooltip("Artorias", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Artorias);
const CritonsPoint = L.marker([-69.34, 122.02], { icon: planetIcon }).bindTooltip("Criton's Point", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(CritonsPoint);
const Dubrillion = L.marker([-70.94, 122.59], { icon: planetIcon }).bindTooltip("Dubrillion", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }).addTo(map);
const Ahakista = L.marker([-71.59, 122.74], { icon: planetIcon }).bindTooltip("Ahakista", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ahakista);
const Tulatharri = L.marker([-70.08, 122.84], { icon: planetIcon }).bindTooltip("Tulatharri Junction", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tulatharri);
const Cilare = L.marker([-67.40, 123.89], { icon: planetIcon }).bindTooltip("Cilare", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cilare);
const Asation = L.marker([-66.43, 124.13], { icon: planetIcon }).bindTooltip("Asation", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Asation);
const Equanus = L.marker([-70.09, 124.13], { icon: planetIcon }).bindTooltip("Equanus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Equanus);
const Lonatro = L.marker([-66.86, 124.78], { icon: planetIcon }).bindTooltip("Lonatro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lonatro);
const LahMu = L.marker([-72.25, 125.13], { icon: pltIconCan2 }).bindTooltip("Lah'mu", { permanent: true, direction: 'right', offset: [2, -1], className: 'leaflet-tooltip-mov' }).bindPopup(LahMuPopup, customOptions).addTo(map);
const Kogan = L.marker([-70.20, 126.06], { icon: planetIcon }).bindTooltip("Kogan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kogan);
const Trassitan = L.marker([-68.50, 126.27], { icon: planetIcon }).bindTooltip("Trassitan", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Trassitan);
const Plesstil = L.marker([-67.13, 127.28], { icon: planetIcon }).bindTooltip("Plesstil", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Plesstil);
const Veragi = L.marker([-67.81, 127.28], { icon: planetIcon }).bindTooltip("Veragi", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Veragi);
const PitsOfPlooma = L.marker([-68.83, 127.38], { icon: pheIconBlk }).bindTooltip("Pits of Plooma", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PitsOfPlooma);
const Plooma = L.marker([-68.88, 127.48], { icon: planetIcon }).bindTooltip("Plooma", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Plooma);
const Vonak = L.marker([-66.59, 128.00], { icon: planetIcon }).bindTooltip("Vonak", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vonak);
const Altora = L.marker([-67.48, 128.06], { icon: planetIcon }).bindTooltip("Altora", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Altora);
const AmaxineSta = L.marker([-70.31, 128.39], { icon: statonIcon }).bindTooltip("Amaxine Sta.", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(AmaxineSta);
const Sernpidal = L.marker([-66.58, 129.34], { icon: planetIcon }).bindTooltip("Sernpidal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Sernpidal);
const Laerdocia = L.marker([-67.77, 130.17], { icon: planetIcon }).bindTooltip("Laerdocia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Laerdocia);
const Seline = L.marker([-67.77, 132.31], { icon: planetIcon }).bindTooltip("Seline", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Seline);
const Antmuel = L.marker([-69.42, 133.81], { icon: planetIcon }).bindTooltip("Antmuel", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Antmuel);
const TantissSta = L.marker([-68.30, 135.08], { icon: planetIcon }).bindTooltip("Tantiss Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TantissSta);
const Puloon = L.marker([-67.86, 135.69], { icon: planetIcon }).bindTooltip("Puloon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Puloon);
const Birgis = L.marker([-69.25, 136.73], { icon: planetIcon }).bindTooltip("Birgis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Lobaoc = L.marker([-66.50, 137.89], { icon: planetIcon }).bindTooltip("Lobaoc", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Lobaoc);
const Tiragga = L.marker([-71.08, 137.92], { icon: planetIcon }).bindTooltip("Tiragga", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tiragga);
const Sartoy = L.marker([-67.39, 138.28], { icon: planetIcon }).bindTooltip("Sartoy", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sartoy);
const Foxar = L.marker([-66.45, 140.08], { icon: planetIcon }).bindTooltip("Foxar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Foxar);
const Jentares = L.marker([-72.20, 143.09], { icon: planetIcon }).bindTooltip("Jentares", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const SeltayaMaj = L.marker([-72.44, 144.83], { icon: planetIcon }).bindTooltip("Seltaya Major", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(SeltayaMaj);
const Gorsh = L.marker([-68.05, 146.00], { icon: planetIcon }).bindTooltip("Gorsh", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Pitrillistia = L.marker([-71.41, 146.19], { icon: planetIcon }).bindTooltip("Pitrillistia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pitrillistia);
const BretaYaga = L.marker([-72.30, 147.17], { icon: planetIcon }).bindTooltip("Breta Yaga", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BretaYaga);
const MalthaObex = L.marker([-71.75, 147.83], { icon: planetIcon }).bindTooltip("Maltha Obex (Brath Qella)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(MalthaObex);
const Yntrann = L.marker([-68.81, 148.30], { icon: planetIcon }).bindTooltip("Yntrann", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Yntrann);
const BrinkSta = L.marker([-67.05, 148.72], { icon: statonIcon }).bindTooltip("Brink Sta.", { permanent: true, direction: 'left', offset: [2, 8], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BrinkSta);
const Sarnus = L.marker([-66.81, 148.73], { icon: planetIcon }).bindTooltip("Sarnus", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sarnus);
const BasePrime = L.marker([-66.72, 148.91], { icon: planetIcon }).bindTooltip("Bubble of the Lost/Base Prime", { permanent: true, direction: 'left', offset: [0, -8], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BasePrime);
const ChiloonRift = L.marker([-66.89, 148.92], { icon: nebIconBlk }).bindTooltip("Chiloon Rift", { permanent: true, direction: 'right', offset: [-2, 4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ChiloonRift);
const Valnoos = L.marker([-66.77, 149.02], { icon: planetIcon }).bindTooltip("Valnoos", { permanent: true, direction: 'right', offset: [-2, -6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Valnoos);
const Murninkam = L.marker([-70.33, 149.03], { icon: planetIcon }).bindTooltip("Murninkam", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Murninkam);
const Ramook = L.marker([-66.16, 149.31], { icon: planetIcon }).bindTooltip("Ramook", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ramook);
const TheHammers = L.marker([-69.74, 150.38], { icon: planetIcon }).bindTooltip("The Hammer's", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TheHammers);
const Peppel = L.marker([-69.80, 150.94], { icon: planetIcon }).bindTooltip("Peppel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Peppel);
const Soullex = L.marker([-69.17, 151.31], { icon: planetIcon }).bindTooltip("Soullex", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Soullex);
const Gulma = L.marker([-67.56, 151.41], { icon: planetIcon }).bindTooltip("Gulma", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gulma);
const Basteel = L.marker([-69.44, 151.53], { icon: planetIcon }).bindTooltip("Basteel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Basteel);
const Sormahil = L.marker([-70.45, 151.66], { icon: planetIcon }).bindTooltip("Sormahil", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sormahil);
const EolSha = L.marker([-72.03, 151.62], { icon: planetIcon }).bindTooltip("Eol Sha", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(EolSha);
const CauldronN = L.marker([-71.97, 151.75], { icon: nebIconBlk }).bindTooltip("Cauldron N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(CauldronN);
const Trascor = L.marker([-72.03, 154.52], { icon: planetIcon }).bindTooltip("Trascor", { permanent: true, direction: 'right', offset: [-2, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Trascor);
const Hakara = L.marker([-71.33, 154.58], { icon: planetIcon }).bindTooltip("Hakara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hakara);
const Hanod = L.marker([-72.38, 154.97], { icon: planetIcon }).bindTooltip("Hanod", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hanod);
const Babali = L.marker([-70.83, 155.09], { icon: planetIcon }).bindTooltip("Babali", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Babali);
const EthavMaj = L.marker([-68.16, 155.78], { icon: planetIcon }).bindTooltip("Ethav Major", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(EthavMaj);
const Pervick = L.marker([-71.58, 155.83], { icon: planetIcon }).bindTooltip("Pervick", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pervick);
const Kaisa = L.marker([-70.10, 155.83], { icon: planetIcon }).bindTooltip("Kaisa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kaisa);
const Ventooine = L.marker([-71.16, 155.88], { icon: planetIcon }).bindTooltip("Ventooine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ventooine);
const Oricon = L.marker([-72.00, 156.58], { icon: planetIcon }).bindTooltip("Oricon", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Oricon);
const ProximaDibal = L.marker([-66.69, 157.59], { icon: planetIcon }).bindTooltip("Proxima Dibal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ProximaDibal);
const Titan = L.marker([-71.75, 158.20], { icon: planetIcon }).bindTooltip("Titan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Titan);
const Bosph = L.marker([-69.25, 158.70], { icon: planetIcon }).bindTooltip("Bosph", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const StylarN = L.marker([-70.78, 158.74], { icon: nebIconBlk }).bindTooltip("Stylar N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(StylarN);
const Seelos = L.marker([-72.34, 158.73], { icon: planetIcon }).bindTooltip("Seelos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Seelos);
const Cerilia = L.marker([-71.80, 159.72], { icon: planetIcon }).bindTooltip("Cerilia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cerilia);
const ThantaZilbra = L.marker([-70.34, 159.80], { icon: planetIcon }).bindTooltip("Thanta Zilbra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ThantaZilbra);
const Hintivan = L.marker([-71.11, 160.06], { icon: planetIcon }).bindTooltip("Hintivan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hintivan);
const Kyoloria = L.marker([-69.97, 160.10], { icon: planetIcon }).bindTooltip("Kyoloria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kyoloria);
const Otunia = L.marker([-69.37, 161.16], { icon: planetIcon }).bindTooltip("OTUNIA", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Otunia);
const Neelgaimon = L.marker([-71.00, 161.75], { icon: planetIcon }).bindTooltip("Neelgaimon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Neelgaimon);
const Harrandarr = L.marker([-69.80, 162.36], { icon: planetIcon }).bindTooltip("Harrandarr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Harrandarr);
const Stic = L.marker([-71.72, 162.50], { icon: planetIcon }).bindTooltip("Stic", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Stic);
const Ruuria = L.marker([-72.00, 162.81], { icon: planetIcon }).bindTooltip("Ruuria", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ruuria);
const Chestrashus = L.marker([-66.81, 163.28], { icon: planetIcon }).bindTooltip("Chestrashus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Chestrashus);
const Jandolhoon = L.marker([-70.31, 163.47], { icon: planetIcon }).bindTooltip("Jandolhoon", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jandolhoon);
const Tralfin = L.marker([-72.44, 163.69], { icon: planetIcon }).bindTooltip("Tralfin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tralfin);
const XappyhSta = L.marker([-72.33, 164.28], { icon: statonIcon }).bindTooltip("Xappyh Sector Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(XappyhSta);
const Oshetti = L.marker([-71.56, 164.38], { icon: planetIcon }).bindTooltip("Oshetti", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Oshetti);
const Bendone = L.marker([-70.20, 165.44], { icon: planetIcon }).bindTooltip("Bendone", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bendone);
const GliteVen = L.marker([-70.89, 165.63], { icon: planetIcon }).bindTooltip("Glite-Ven", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(GliteVen);
const Wenderal = L.marker([-71.92, 165.72], { icon: planetIcon }).bindTooltip("Wenderal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Wenderal);
const HRelac = L.marker([-71.22, 165.92], { icon: planetIcon }).bindTooltip("H'relac", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(HRelac);
const Boztrok = L.marker([-72.42, 166.49], { icon: planetIcon }).bindTooltip("Boztrok", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Boztrok);
const Beshka = L.marker([-70.69, 166.58], { icon: planetIcon }).bindTooltip("Beshka", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Beshka);
const Hydra = L.marker([-71.95, 167.72], { icon: planetIcon }).bindTooltip("Hydra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hydra);
const Kwapi = L.marker([-68.53, 167.89], { icon: planetIcon }).bindTooltip("Kwapi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kwapi);
const CadomaiPr = L.marker([-71.63, 168.06], { icon: pltIconCaL }).bindTooltip("Cadomai", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(CadomaiPrPopup, customOptions).addTo(map);
const Mavva = L.marker([-70.70, 168.68], { icon: planetIcon }).bindTooltip("Mavva", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Mavva);
const Knolstee = L.marker([-72.14, 168.93], { icon: planetIcon }).bindTooltip("Knolstee", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Knolstee);
const Reltooine = L.marker([-71.69, 168.97], { icon: planetIcon }).bindTooltip("Reltooine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Reltooine);
const Monic = L.marker([-69.36, 169.02], { icon: planetIcon }).bindTooltip("Monic", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Monic);
const Trian = L.marker([-70.45, 169.19], { icon: planetIcon }).bindTooltip("Trian", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Trian);
const Davirien = L.marker([-72.53, 169.20], { icon: planetIcon }).bindTooltip("Davirien", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Davirien);
const Ekibo = L.marker([-70.55, 169.23], { icon: planetIcon }).bindTooltip("Ekibo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ekibo);
const Pypin = L.marker([-70.36, 169.80], { icon: planetIcon }).bindTooltip("Pypin", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pypin);
const MallOrdian = L.marker([-71.80, 169.94], { icon: planetIcon }).bindTooltip("Mall'ordian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(MallOrdian);
const Ninn = L.marker([-71.19, 170.33], { icon: planetIcon }).bindTooltip("Ninn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ninn);
const Lythos = L.marker([-71.99, 171.38], { icon: planetIcon }).bindTooltip("Lythos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lythos);
const Crispin = L.marker([-68.67, 171.02], { icon: planetIcon }).bindTooltip("Crispin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Crispin);
const Brochiib = L.marker([-70.05, 171.16], { icon: planetIcon }).bindTooltip("Brochiib", { permanent: true, direction: 'left', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Brochiib);
const Fibuli = L.marker([-70.25, 171.20], { icon: planetIcon }).bindTooltip("Fibuli", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fibuli);
const Hiit = L.marker([-70.70, 171.34], { icon: planetIcon }).bindTooltip("Hiit", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hiit);
const Perin = L.marker([-70.27, 172.05], { icon: planetIcon }).bindTooltip("Perin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Perin);
const Vinnax = L.marker([-68.39, 172.13], { icon: planetIcon }).bindTooltip("Vinnax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vinnax);
const Mytus = L.marker([-68.16, 172.69], { icon: pltIconCaL }).bindTooltip("Mytus", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(MytusPopup, customOptions).addTo(map);
const DIan = L.marker([-72.33, 172.81], { icon: planetIcon }).bindTooltip("D'ian", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(DIan);
const Atchorb = L.marker([-71.74, 172.89], { icon: planetIcon }).bindTooltip("Atchorb", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Atchorb);
const Ulicia = L.marker([-70.86, 173.11], { icon: planetIcon }).bindTooltip("Ulicia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ulicia);
const AboDreth = L.marker([-70.97, 173.33], { icon: planetIcon }).bindTooltip("Abo Dreth", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(AboDreth);
const Bonadan = L.marker([-72.45, 173.31], { icon: pltIconCaL }).bindTooltip("Bonadan", { permanent: true, direction: 'left', offset: [-2, 5], className: 'leaflet-tooltip    ' }).bindPopup(BonadanPopup, customOptions).addTo(map);
const Tothis = L.marker([-72.06, 173.45], { icon: planetIcon }).bindTooltip("Tothis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tothis);
const Deltooine = L.marker([-72.42, 174.28], { icon: planetIcon }).bindTooltip("Deltooine", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Deltooine);
const ThandonN = L.marker([-71.36, 173.61], { icon: nebIconBlk }).bindTooltip("Thandon N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(ThandonN);
const Ralla = L.marker([-72.44, 173.83], { icon: planetIcon }).bindTooltip("R'alla", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Ralla);
const Brosi = L.marker([-71.09, 173.83], { icon: planetIcon }).bindTooltip("Brosi", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Brosi);
const HullsStar = L.marker([-70.13, 173.95], { icon: planetIcon }).bindTooltip("Hull's Star", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(HullsStar);
const Kir = L.marker([-72.36, 173.92], { icon: planetIcon }).bindTooltip("Kir", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kir);
const Farana = L.marker([-70.66, 174.28], { icon: planetIcon }).bindTooltip("Farana", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Farana);
const Fether = L.marker([-72.39, 174.55], { icon: planetIcon }).bindTooltip("Fether", { permanent: true, direction: 'right', offset: [0, 6], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Fether);
const Ocsin = L.marker([-72.36, 174.64], { icon: planetIcon }).bindTooltip("Ocsin", { permanent: true, direction: 'left', offset: [0, -7], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Ocsin);
const Kamar = L.marker([-72.32, 174.77], { icon: planetIcon }).bindTooltip("Kamar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Kamar);
const Morellia = L.marker([-69.22, 174.88], { icon: planetIcon }).bindTooltip("Morellia", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Morellia);
const MorellianComm = L.marker([-69.12, 174.91], { icon: clustrIcon }).bindTooltip("Morellian Commonwealth", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(MorellianComm);
const ArtiodMin = L.marker([-69.12, 175.11], { icon: planetIcon }).bindTooltip("Artiod Minor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ArtiodMin);
//========================================= row 04 ===== DANTOOINE =========================
const Teptixii = L.marker([-74.39, 111.47], { icon: planetIcon }).bindTooltip("Teptixii", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Teptixii);
const Oben = L.marker([-77.34, 112.14], { icon: planetIcon }).bindTooltip("Oben", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Oben);
const Huk = L.marker([-75.17, 112.56], { icon: planetIcon }).bindTooltip("Huk", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Parshoone = L.marker([-77.06, 113.03], { icon: planetIcon }).bindTooltip("Parshoone", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Parshoone);
const BrodoAsogi = L.marker([-77.34, 113.34], { icon: planetIcon }).bindTooltip("Brodo Asogi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BrodoAsogi);
const Guiteica = L.marker([-73.64, 113.22], { icon: planetIcon }).bindTooltip("Guiteica", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Guiteica);
const Tovarskl = L.marker([-75.60, 113.86], { icon: planetIcon }).bindTooltip("Tovarskl", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tovarskl);
const Kalee = L.marker([-74.72, 113.88], { icon: pltIconCaL }).bindTooltip("Kalee", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(KaleePopup, customOptions).addTo(map);
const Gandrossi = L.marker([-75.92, 114.03], { icon: planetIcon }).bindTooltip("Gandrossi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gandrossi);
const Valc = L.marker([-78.01, 114.28], { icon: planetIcon }).bindTooltip("Valc", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Valc);
const CantrasGola = L.marker([-78.63, 114.69], { icon: planetIcon }).bindTooltip("Cantras Gola", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(CantrasGola);
const ZinTaal = L.marker([-76.45, 114.88], { icon: planetIcon }).bindTooltip("Zin Taal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ZinTaal);
const OrdThoden = L.marker([-73.45, 115.39], { icon: planetIcon }).bindTooltip("Ord Thoden", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdThoden);
const Vexta = L.marker([-74.08, 115.39], { icon: planetIcon }).bindTooltip("Vexta", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vexta);
const GHaris = L.marker([-78.97, 115.44], { icon: planetIcon }).bindTooltip("G'haris", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(GHaris);
const Sojourn = L.marker([-75.06, 115.66], { icon: planetIcon }).bindTooltip("Sojourn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sojourn);
const Delephr = L.marker([-74.67, 116.08], { icon: planetIcon }).bindTooltip("Delephr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Delephr);
const Dactruria = L.marker([-76.81, 116.55], { icon: planetIcon }).bindTooltip("Dactruria", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dactruria);
const Baramorra = L.marker([-74.34, 116.67], { icon: planetIcon }).bindTooltip("Baramorra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Baramorra);
const Gelda = L.marker([-75.42, 116.69], { icon: planetIcon }).bindTooltip("Gelda", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gelda);
const Bextar = L.marker([-78.11, 117.30], { icon: planetIcon }).bindTooltip("Bextar", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bextar);
const Bettok = L.marker([-77.84, 117.61], { icon: planetIcon }).bindTooltip("Bettok", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bettok);
const Varvrona = L.marker([-72.59, 118.29], { icon: planetIcon }).bindTooltip("Varvrona", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Varvrona);
const Capza = L.marker([-78.17, 118.67], { icon: planetIcon }).bindTooltip("Capza", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Capza);
const Entralla = L.marker([-77.72, 118.72], { icon: planetIcon }).bindTooltip("Entralla", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Entralla);
const Endoraan = L.marker([-76.70, 118.90], { icon: planetIcon }).bindTooltip("Endoraan", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Endoraan);
const Bisellia = L.marker([-76.17, 119.00], { icon: planetIcon }).bindTooltip("Bisellia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bisellia);
const Jaemus = L.marker([-73.34, 119.02], { icon: planetIcon }).bindTooltip("Jaemus", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Jaemus);
const Cezith = L.marker([-77.08, 119.72], { icon: planetIcon }).bindTooltip("Cezith", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cezith);
const Fegorosk = L.marker([-75.29, 119.16], { icon: planetIcon }).bindTooltip("Fegorosk", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fegorosk);
const Muunilinst = L.marker([-75.72, 119.34], { icon: planetIcon }).bindTooltip("Muunilinst", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Muunilinst);
const OrdSedra = L.marker([-76.61, 119.56], { icon: planetIcon }).bindTooltip("Ord Sedra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdSedra);
const Quanton = L.marker([-75.04, 120.09], { icon: planetIcon }).bindTooltip("Quanton", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Quanton);
const Praya = L.marker([-74.81, 120.28], { icon: planetIcon }).bindTooltip("Praya", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Praya);
const Karavis = L.marker([-73.34, 120.42], { icon: planetIcon }).bindTooltip("Karavis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Karavis);
const Marmoth = L.marker([-78.02, 120.61], { icon: planetIcon }).bindTooltip("Marmoth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Marmoth);
const Venestria = L.marker([-76.33, 121.09], { icon: planetIcon }).bindTooltip("Venestria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Venestria);
const AnthanPr = L.marker([-78.36, 121.45], { icon: planetIcon }).bindTooltip("Anthan Prime", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(AnthanPr);
const Gabredor = L.marker([-74.59, 121.83], { icon: planetIcon }).bindTooltip("Gabredor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gabredor);
const Kwevron = L.marker([-76.66, 122.56], { icon: planetIcon }).bindTooltip("Kwevron", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kwevron);
const Karka = L.marker([-77.75, 123.17], { icon: planetIcon }).bindTooltip("Karka", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Karka);
const Angor = L.marker([-74.97, 123.53], { icon: planetIcon }).bindTooltip("Angor", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Angor);
const Fodro = L.marker([-77.38, 123.59], { icon: planetIcon }).bindTooltip("Fodro", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fodro);
const Gwori = L.marker([-77.69, 124.52], { icon: planetIcon }).bindTooltip("Gwori", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gwori);
const Shramar = L.marker([-76.44, 124.59], { icon: planetIcon }).bindTooltip("Shramar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Shramar);
const Ushmin = L.marker([-78.20, 124.58], { icon: planetIcon }).bindTooltip("Kwevron", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kwevron);
const Dantooine = L.marker([-75.21, 124.79], { icon: pltIconCaL }).bindTooltip("Dantooine", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(DantooinePopup, customOptions).addTo(map);
const Verig = L.marker([-76.92, 124.83], { icon: planetIcon }).bindTooltip("Verig", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Verig);
const FerionicN = L.marker([-75.03, 124.84], { icon: nebIconBlk }).bindTooltip("Ferionic N.", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(FerionicN);
const Alurion = L.marker([-74.33, 125.00], { icon: planetIcon }).bindTooltip("Alurion", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Alurion);
const OrdTrasi = L.marker([-78.28, 125.79], { icon: planetIcon }).bindTooltip("Ord Trasi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(OrdTrasi);
const Sinsang = L.marker([-75.94, 126.01], { icon: planetIcon }).bindTooltip("Sinsang", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sinsang);
const TertiaryKesme = L.marker([-73.33, 126.03], { icon: planetIcon }).bindTooltip("Tertiary Kesmere", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(TertiaryKesme);
const KesmereMinor = L.marker([-74.33, 126.31], { icon: planetIcon }).bindTooltip("Kesmere Minor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(KesmereMinor);
const Neka = L.marker([-76.02, 126.55], { icon: planetIcon }).bindTooltip("Neka", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Neka);
const Kesmere = L.marker([-75.23, 126.63], { icon: planetIcon }).bindTooltip("Kesmere", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kesmere);
const AnxMinor = L.marker([-76.33, 126.72], { icon: planetIcon }).bindTooltip("Anx Minor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(AnxMinor);
const Morturia = L.marker([-77.56, 126.94], { icon: planetIcon }).bindTooltip("Morturia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Morturia);
const Shusugaunt = L.marker([-73.67, 127.53], { icon: planetIcon }).bindTooltip("Shusugaunt", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Shusugaunt);
const Grumwall = L.marker([-77.92, 129.20], { icon: planetIcon }).bindTooltip("Grumwall", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Grumwall);
const GravlexMed = L.marker([-75.12, 129.27], { icon: planetIcon }).bindTooltip("Gravlex Med", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(GravlexMed);
const RZ7611323 = L.marker([-75.88, 131.12], { icon: planetIcon }).bindTooltip("RZ7-6113-23", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(RZ7611323);
const Vantillia = L.marker([-77.31, 131.91], { icon: planetIcon }).bindTooltip("Vantillia", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Vantillia);
const MekTradi = L.marker([-76.53, 135.21], { icon: planetIcon }).bindTooltip("Mek'tradi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(MekTradi);
const Amaltanna = L.marker([-75.52, 138.02], { icon: planetIcon }).bindTooltip("Amaltanna", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Amaltanna);
const Nord = L.marker([-78.44, 138.81], { icon: planetIcon }).bindTooltip("Nord", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Nord);
const Ayceezee = L.marker([-73.69, 138.97], { icon: planetIcon }).bindTooltip("Ayceezee", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ayceezee);
const Malicar = L.marker([-73.08, 139.27], { icon: planetIcon }).bindTooltip("Malicar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Malicar);
const Bimmiel = L.marker([-75.13, 139.85], { icon: planetIcon }).bindTooltip("Bimmiel", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Bimmiel);
const Jerne = L.marker([-77.14, 140.25], { icon: planetIcon }).bindTooltip("Jerne", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jerne);
const MZX32905 = L.marker([-75.22, 140.27], { icon: planetIcon }).bindTooltip("MZX32905", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(MZX32905);
const Trif = L.marker([-78.47, 140.94], { icon: planetIcon }).bindTooltip("Trif", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Trif);
const Sipsk = L.marker([-75.94, 140.97], { icon: planetIcon }).bindTooltip("Sipsk", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sipsk);
const Argazda = L.marker([-77.48, 141.11], { icon: planetIcon }).bindTooltip("Argazda", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Argazda);
const Ereesus = L.marker([-76.41, 141.61], { icon: planetIcon }).bindTooltip("Ereesus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ereesus);
const Noremac = L.marker([-75.69, 142.00], { icon: planetIcon }).bindTooltip("Noremac", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Noremac);
const Thovinack = L.marker([-74.58, 142.25], { icon: planetIcon }).bindTooltip("Thovinack", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thovinack);
const KolAtorn = L.marker([-76.83, 142.39], { icon: planetIcon }).bindTooltip("Kol Atorn", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KolAtorn);
const KolHuro = L.marker([-76.98, 142.53], { icon: planetIcon }).bindTooltip("Kol Huro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KolHuro);
const Lorrd = L.marker([-76.14, 142.71], { icon: planetIcon }).bindTooltip("Lorrd", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Ibanjji = L.marker([-73.67, 143.91], { icon: planetIcon }).bindTooltip("Ibanjji", { permanent: true, direction: 'right', offset: [-1, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ibanjji);
const MentanarVosk = L.marker([-77.78, 144.39], { icon: planetIcon }).bindTooltip("Mentanar Vosk", { permanent: true, direction: 'left', offset: [0, 6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(MentanarVosk);
const Meserian = L.marker([-75.59, 144.48], { icon: planetIcon }).bindTooltip("Meserian", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Meserian);
const Kabieroun = L.marker([-77.14, 144.69], { icon: planetIcon }).bindTooltip("Kabieroun", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kabieroun);
const Arcanum = L.marker([-74.14, 145.64], { icon: statonIcon }).bindTooltip("Arcanum", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Arcanum);
const Zorb = L.marker([-75.36, 145.69], { icon: planetIcon }).bindTooltip("Zorb", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Zorb);
const Cryon = L.marker([-75.50, 145.78], { icon: planetIcon }).bindTooltip("Cryon", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cryon);
const Valfin = L.marker([-75.23, 146.30], { icon: planetIcon }).bindTooltip("Valfin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Valfin);
const Vannan = L.marker([-76.59, 146.33], { icon: planetIcon }).bindTooltip("Vannan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vannan);
const Skaross = L.marker([-78.04, 146.44], { icon: planetIcon }).bindTooltip("Skaross", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Skaross);
const DiWor = L.marker([-77.18, 146.77], { icon: planetIcon }).bindTooltip("Di'wor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(DiWor);
const Gaalt = L.marker([-73.81, 147.48], { icon: planetIcon }).bindTooltip("Gaalt", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gaalt);
const Miglar = L.marker([-78.14, 147.64], { icon: planetIcon }).bindTooltip("Miglar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Miglar);
const Tangrene = L.marker([-78.54, 147.66], { icon: planetIcon }).bindTooltip("Tangrene", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tangrene);
const Lusaanda = L.marker([-75.73, 147.77], { icon: planetIcon }).bindTooltip("Lusaanda", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lusaanda);
const Tholian = L.marker([-73.03, 149.17], { icon: planetIcon }).bindTooltip("Tholian", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tholian);
const SimentoThrek = L.marker([-75.53, 149.94], { icon: planetIcon }).bindTooltip("Simento-Threk", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(SimentoThrek);
const Misnor = L.marker([-78.08, 149.44], { icon: planetIcon }).bindTooltip("Misnor", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Misnor);
const Regalia = L.marker([-76.48, 149.70], { icon: planetIcon }).bindTooltip("Regalia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Regalia);
const Kauron = L.marker([-75.89, 150.56], { icon: planetIcon }).bindTooltip("Kauron", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kauron);
const Rentalles = L.marker([-78.31, 150.66], { icon: planetIcon }).bindTooltip("Rentalles", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rentalles);
const Xantar = L.marker([-73.42, 151.03], { icon: planetIcon }).bindTooltip("Xantar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Xantar);
const Demesel = L.marker([-75.59, 151.25], { icon: planetIcon }).bindTooltip("Demesel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Demesel);
const Chromovon = L.marker([-78.16, 151.38], { icon: planetIcon }).bindTooltip("Chromovon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Chromovon);
const Jandoon = L.marker([-73.31, 151.61], { icon: planetIcon }).bindTooltip("Jandoon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jandoon);
const Galaanus = L.marker([-74.49, 152.31], { icon: planetIcon }).bindTooltip("Galaanus", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Galaanus);
const Daranc = L.marker([-76.20, 152.30], { icon: planetIcon }).bindTooltip("Daranc", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Daranc);
const Langhesa = L.marker([-77.09, 152.36], { icon: planetIcon }).bindTooltip("Langhesa", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Langhesa);
const NFourso = L.marker([-75.50, 152.41], { icon: nebIconBlk }).bindTooltip("N. Fourso", { permanent: true, direction: 'right', offset: [-1, -1], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NFourso);
const Betha = L.marker([-73.97, 152.58], { icon: planetIcon }).bindTooltip("Betha", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Betha);
const SpawnN = L.marker([-74.36, 152.81], { icon: nebIconBlk }).bindTooltip("Spawn N.", { permanent: true, direction: 'right', offset: [-2, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(SpawnN);
const Corva = L.marker([-73.72, 152.83], { icon: planetIcon }).bindTooltip("Corva", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Corva);
const Jurio = L.marker([-74.97, 152.97], { icon: planetIcon }).bindTooltip("Jurio", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jurio);
const Tuulab = L.marker([-73.03, 153.02], { icon: planetIcon }).bindTooltip("Tuulab", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tuulab);
const Rindia = L.marker([-78.73, 153.22], { icon: planetIcon }).bindTooltip("Rindia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rindia);
const DelariPr = L.marker([-74.55, 153.34], { icon: planetIcon }).bindTooltip("Delari Prime", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(DelariPr);
const Thalassia = L.marker([-76.75, 153.47], { icon: planetIcon }).bindTooltip("Thalassia", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thalassia);
const Ligna = L.marker([-72.88, 154.00], { icon: planetIcon }).bindTooltip("Ligna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ligna);
const Sesid = L.marker([-73.31, 154.00], { icon: planetIcon }).bindTooltip("Sesid", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sesid);
const Praadost = L.marker([-77.97, 154.94], { icon: planetIcon }).bindTooltip("Praadost", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }).addTo(map);
const Kirtania = L.marker([-75.23, 155.22], { icon: planetIcon }).bindTooltip("Kirtania", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kirtania);
const QNithian = L.marker([-78.97, 155.39], { icon: planetIcon }).bindTooltip("Q'nithian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(QNithian);
const HKen = L.marker([-73.28, 155.42], { icon: planetIcon }).bindTooltip("H'ken", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(HKen);
const Carosi = L.marker([-75.61, 155.44], { icon: planetIcon }).bindTooltip("Carosi", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Carosi);
const Seikosha = L.marker([-76.70, 155.47], { icon: planetIcon }).bindTooltip("Seikosha", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Seikosha);
const Haaridin = L.marker([-74.41, 156.09], { icon: planetIcon }).bindTooltip("Haaridin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Haaridin);
const ShiKarStraits = L.marker([-76.22, 156.20], { icon: planetIcon }).bindTooltip("Shi'kar Straits", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(ShiKarStraits);
const Bizikia = L.marker([-73.92, 156.33], { icon: planetIcon }).bindTooltip("Bizikia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bizikia);
const Jaresh = L.marker([-73.02, 156.47], { icon: planetIcon }).bindTooltip("Jaresh", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jaresh);
const Rya = L.marker([-75.31, 156.42], { icon: planetIcon }).bindTooltip("Rya", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rya);
const Korlings = L.marker([-75.85, 156.97], { icon: planetIcon }).bindTooltip("Korlings", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Korlings);
const Jendar = L.marker([-77.84, 156.20], { icon: planetIcon }).bindTooltip("Jendar", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jendar);
const Direllia = L.marker([-78.20, 156.44], { icon: planetIcon }).bindTooltip("Direllia", { permanent: true, direction: 'right', offset: [-1, 4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Direllia);
const Picutorion = L.marker([-77.62, 157.61], { icon: planetIcon }).bindTooltip("Picutorion", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Picutorion);
const Artus = L.marker([-76.20, 157.84], { icon: planetIcon }).bindTooltip("Artus", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Artus);
const Aldivy = L.marker([-77.45, 157.87], { icon: planetIcon }).bindTooltip("Aldivy", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Aldivy);
const Telos = L.marker([-74.44, 158.03], { icon: pltIconCaL }).bindTooltip("Telos", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(TelosPopup, customOptions).addTo(map);
const Vendara = L.marker([-75.69, 158.14], { icon: planetIcon }).bindTooltip("Vendara", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vendara);
const Camus = L.marker([-78.45, 158.25], { icon: planetIcon }).bindTooltip("Camus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Camus);
const Jelucan = L.marker([-74.69, 158.27], { icon: planetIcon }).bindTooltip("Jelucan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Jelucan);
const Rakrir = L.marker([-73.66, 158.34], { icon: planetIcon }).bindTooltip("Rakrir (Ballikite)", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rakrir);
const Protazk = L.marker([-72.62, 158.45], { icon: planetIcon }).bindTooltip("Protazk", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Protazk);
const Doniphon = L.marker([-73.91, 158.54], { icon: planetIcon }).bindTooltip("Doniphon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Doniphon);
const KestosMin = L.marker([-75.72, 158.75], { icon: planetIcon }).bindTooltip("Kestos Minor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(KestosMin);
const Serpine = L.marker([-75.20, 158.97], { icon: planetIcon }).bindTooltip("Serpine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Serpine);
const Tantive = L.marker([-73.59, 159.00], { icon: planetIcon }).bindTooltip("Tantive", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tantive);
const Thila = L.marker([-76.97, 159.12], { icon: planetIcon }).bindTooltip("Thila", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Thila);
const LubangMaj = L.marker([-77.61, 159.59], { icon: planetIcon }).bindTooltip("Lubang Major", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(LubangMaj);
const LubangMin = L.marker([-77.70, 159.70], { icon: planetIcon }).bindTooltip("Lubang Minor", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(LubangMin);
const Listehol = L.marker([-73.14, 159.70], { icon: planetIcon }).bindTooltip("Listehol", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Listehol);
const Teagan = L.marker([-73.08, 159.81], { icon: planetIcon }).bindTooltip("Teagan", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Teagan);
const Werncin = L.marker([-73.86, 160.05], { icon: planetIcon }).bindTooltip("Werncin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Werncin);
const Ferro = L.marker([-75.95, 160.05], { icon: planetIcon }).bindTooltip("Ferro", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ferro);
const Melldia = L.marker([-78.04, 160.08], { icon: planetIcon }).bindTooltip("Melldia", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Melldia);
const Sathiemon = L.marker([-76.50, 160.30], { icon: planetIcon }).bindTooltip("Sathiemon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sathiemon);
const Mirial = L.marker([-74.81, 160.39], { icon: planetIcon }).bindTooltip("Mirial", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Teagan);
const Notonia = L.marker([-74.36, 160.83], { icon: planetIcon }).bindTooltip("Notonia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Notonia);
const Sagma = L.marker([-75.41, 161.06], { icon: planetIcon }).bindTooltip("Sagma", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sagma);
const Sikurd = L.marker([-76.00, 161.47], { icon: planetIcon }).bindTooltip("Sikurd", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Sikurd);
const Haffrin = L.marker([-77.58, 161.30], { icon: planetIcon }).bindTooltip("Haffrin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Haffrin);
const Peragus = L.marker([-73.31, 161.44], { icon: planetIcon }).bindTooltip("Peragus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Peragus);
const BuamlonCentra = L.marker([-77.19, 161.37], { icon: planetIcon }).bindTooltip("Buamlon Central", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BuamlonCentra);
const Antared = L.marker([-78.75, 161.92], { icon: planetIcon }).bindTooltip("Antared", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Antared);
const Gathus = L.marker([-76.39, 162.17], { icon: planetIcon }).bindTooltip("Gathus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gathus);
const SocoJarel = L.marker([-73.11, 162.98], { icon: planetIcon }).bindTooltip("Soco-Jarel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(SocoJarel);
const Critoki = L.marker([-77.84, 162.98], { icon: planetIcon }).bindTooltip("Critoki", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Critoki);
const NIldwab = L.marker([-76.94, 163.03], { icon: planetIcon }).bindTooltip("N'ildwab", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NIldwab);
const Javarica = L.marker([-73.95, 163.17], { icon: planetIcon }).bindTooltip("Javarica", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Javarica);
const Rokaria = L.marker([-75.25, 163.70], { icon: planetIcon }).bindTooltip("Rokaria", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rokaria);
const Korriz = L.marker([-77.48, 164.20], { icon: planetIcon }).bindTooltip("Korriz", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Korriz);
const Pegg = L.marker([-75.14, 164.37], { icon: planetIcon }).bindTooltip("Pegg", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pegg);
const Athiss = L.marker([-77.33, 164.97], { icon: planetIcon }).bindTooltip("Athiss", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Athiss);
const Naplousea = L.marker([-74.55, 165.06], { icon: planetIcon }).bindTooltip("Naplousea", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Naplousea);
const Ziost = L.marker([-77.88, 165.08], { icon: planetIcon }).bindTooltip("Ziost", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ziost);
const Begeren = L.marker([-79.02, 165.08], { icon: planetIcon }).bindTooltip("Begeren", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Begeren);
const TissSharl = L.marker([-72.67, 165.22], { icon: planetIcon }).bindTooltip("Tiss'sharl", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TissSharl);
const ChHodos = L.marker([-78.23, 165.22], { icon: planetIcon }).bindTooltip("Ch'hodos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(ChHodos);
const Savek = L.marker([-78.44, 165.26], { icon: planetIcon }).bindTooltip("Savek", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Savek);
const Lorpfan = L.marker([-73.10, 165.83], { icon: planetIcon }).bindTooltip("Lorpfan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Melldia);
const Gigor = L.marker([-75.31, 165.94], { icon: planetIcon }).bindTooltip("Gigor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Gigor);
const Bhargebba = L.marker([-77.55, 166.39], { icon: planetIcon }).bindTooltip("Bhargebba", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bhargebba);
const Svolten = L.marker([-77.23, 166.64], { icon: planetIcon }).bindTooltip("Svolten", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Svolten);
const Draethos = L.marker([-74.28, 167.00], { icon: planetIcon }).bindTooltip("Draethos (Thosa)", { permanent: true, direction: 'right', offset: [-1, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Draethos);
const Nfolgai = L.marker([-77.94, 167.17], { icon: planetIcon }).bindTooltip("Nfolgai", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nfolgai);
const Krayiss = L.marker([-78.63, 167.45], { icon: planetIcon }).bindTooltip("Krayiss", { permanent: true, direction: 'right', offset: [-1, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Krayiss);
const AnarakIV = L.marker([-75.22, 167.47], { icon: planetIcon }).bindTooltip("Anarak IV", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(AnarakIV);
const Thela = L.marker([-72.66, 167.59], { icon: planetIcon }).bindTooltip("Thela", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Thela);
const Glakka = L.marker([-74.58, 167.73], { icon: planetIcon }).bindTooltip("Glakka", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Glakka);
const PalGoral = L.marker([-77.66, 168.11], { icon: planetIcon }).bindTooltip("Pal Goral", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PalGoral);
const Lur = L.marker([-72.86, 168.29], { icon: planetIcon }).bindTooltip("Lur", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lur);
const Mudball = L.marker([-76.92, 168.48], { icon: planetIcon }).bindTooltip("''Mudball''", { permanent: true, direction: 'left', offset: [1, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mudball);
const Kormoran = L.marker([-75.66, 168.51], { icon: planetIcon }).bindTooltip("Kormoran", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kormoran);
const Kharzet = L.marker([-76.84, 168.53], { icon: planetIcon }).bindTooltip("Kharzet", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kharzet);
const Fislan = L.marker([-78.27, 168.58], { icon: planetIcon }).bindTooltip("Fislan", { permanent: true, direction: 'right', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Fislan);
const Lafra = L.marker([-74.38, 168.95], { icon: planetIcon }).bindTooltip("Lafra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lafra);
const Iliabath = L.marker([-77.41, 169.00], { icon: planetIcon }).bindTooltip("Iliabath", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Iliabath);
const Kail = L.marker([-72.56, 169.01], { icon: planetIcon }).bindTooltip("Kail", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kail);
const Dra = L.marker([-73.68, 169.84], { icon: planetIcon }).bindTooltip("Dra", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dra);
const Drog = L.marker([-72.66, 169.90], { icon: planetIcon }).bindTooltip("Drog", { permanent: true, direction: 'right', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Drog);
const Vyndal = L.marker([-77.86, 170.04], { icon: planetIcon }).bindTooltip("Vyndal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vyndal);
const Craci = L.marker([-73.47, 170.08], { icon: planetIcon }).bindTooltip("Craci", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Craci);
const Sevari = L.marker([-76.69, 170.91], { icon: planetIcon }).bindTooltip("Sevari", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sevari);
const Varic = L.marker([-77.02, 170.95], { icon: planetIcon }).bindTooltip("Varic", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Varic);
const Zygerria = L.marker([-75.95, 171.00], { icon: planetIcon }).bindTooltip("Zygerria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Zygerria);
const Nathema = L.marker([-78.20, 171.22], { icon: planetIcon }).bindTooltip("Nathema (Medriaas)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nathema);
const Jerrist = L.marker([-73.67, 171.41], { icon: planetIcon }).bindTooltip("Jerrist", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jerrist);
const Maryo = L.marker([-72.81, 171.42], { icon: planetIcon }).bindTooltip("Maryo", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Maryo);
const Rekkiad = L.marker([-78.45, 171.47], { icon: planetIcon }).bindTooltip("Rekkiad", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rekkiad);
const Tirsa = L.marker([-72.99, 171.58], { icon: planetIcon }).bindTooltip("Tirsa", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tirsa);
const Malachor = L.marker([-77.75, 171.58], { icon: planetIcon }).bindTooltip("Malachor", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Malachor);
const Saclas = L.marker([-74.14, 171.78], { icon: planetIcon }).bindTooltip("Saclas", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Saclas);
const Duroon = L.marker([-73.95, 171.92], { icon: planetIcon }).bindTooltip("Duroon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Duroon);
const Media = L.marker([-73.30, 172.08], { icon: planetIcon }).bindTooltip("Media", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Media);
const Xanlanner = L.marker([-75.34, 172.12], { icon: planetIcon }).bindTooltip("Xanlanner", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Xanlanner);
const Kip = L.marker([-76.30, 172.20], { icon: planetIcon }).bindTooltip("Kip", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kip);
const Etti = L.marker([-72.72, 172.59], { icon: planetIcon }).bindTooltip("ETTI", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Etti);
const Ession = L.marker([-73.08, 172.61], { icon: planetIcon }).bindTooltip("Ession", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ession);
const Ammuud = L.marker([-74.31, 172.67], { icon: planetIcon }).bindTooltip("Ammuud", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ammuud);
const Urdur = L.marker([-74.03, 172.98], { icon: planetIcon }).bindTooltip("Urdur", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Urdur);
const Saffalore = L.marker([-72.99, 173.09], { icon: planetIcon }).bindTooltip("Saffalore", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Saffalore);
const PondutSta = L.marker([-73.47, 173.09], { icon: statonIcon }).bindTooltip("Pondut Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(PondutSta);
const Sluudren = L.marker([-76.89, 173.12], { icon: planetIcon }).bindTooltip("Sluudren", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sluudren);
const Corus = L.marker([-75.22, 173.14], { icon: planetIcon }).bindTooltip("Corus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Corus);
const Biewa = L.marker([-73.59, 173.19], { icon: planetIcon }).bindTooltip("Biewa", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Biewa);
const Oslumpex = L.marker([-73.99, 173.27], { icon: planetIcon }).bindTooltip("Oslumpex", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Oslumpex);
const Vaynai = L.marker([-77.47, 173.48], { icon: planetIcon }).bindTooltip("Vaynai", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Vaynai);
const Kalla = L.marker([-73.39, 173.55], { icon: planetIcon }).bindTooltip("Kalla", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Malachor);
const Erysthes = L.marker([-72.66, 173.71], { icon: planetIcon }).bindTooltip("Erysthes", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Erysthes);
const Matra = L.marker([-74.08, 173.73], { icon: planetIcon }).bindTooltip("Matra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Matra);
const Rampa = L.marker([-72.64, 173.89], { icon: planetIcon }).bindTooltip("Rampa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rampa);
const Issagra = L.marker([-72.91, 173.89], { icon: planetIcon }).bindTooltip("Issagra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Issagra);
const BetaOlikark = L.marker([-74.64, 173.90], { icon: planetIcon }).bindTooltip("Beta Olikark", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(BetaOlikark);
const Sigil = L.marker([-78.33, 173.94], { icon: planetIcon }).bindTooltip("Sigil", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sigil);
const Orron = L.marker([-74.28, 173.95], { icon: planetIcon }).bindTooltip("Orron", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Orron);
const Sarlucif = L.marker([-75.64, 174.19], { icon: planetIcon }).bindTooltip("Sarlucif", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sarlucif);
const BanSatir = L.marker([-73.34, 174.21], { icon: planetIcon }).bindTooltip("Ban-Satir", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BanSatir);
const Gaurick = L.marker([-73.70, 174.44], { icon: planetIcon }).bindTooltip("Gaurick", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gaurick);
const Joodrudda = L.marker([-73.84, 174.50], { icon: planetIcon }).bindTooltip("Joodrudda", { permanent: true, direction: 'right', offset: [-2, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Joodrudda);
const Baltimn = L.marker([-76.48, 174.55], { icon: planetIcon }).bindTooltip("Baltimn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Baltimn);
const Troiken = L.marker([-79.00, 174.56], { icon: planetIcon }).bindTooltip("Troiken", { permanent: true, direction: 'right', offset: [-2, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Troiken);
const Kadavo = L.marker([-75.27, 175.78], { icon: planetIcon }).bindTooltip("Kadavo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kadavo);
const Loce = L.marker([-78.50, 176.09], { icon: planetIcon }).bindTooltip("Loce", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Loce);
const Natinati = L.marker([-77.59, 176.21], { icon: planetIcon }).bindTooltip("Natinati", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Natinati);
const ThIrus = L.marker([-72.99, 176.70], { icon: planetIcon }).bindTooltip("Th'irus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ThIrus);
const ParthovianCl = L.marker([-73.34, 178.80], { icon: clustrIcon }).bindTooltip("Parthovian Cl.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ParthovianCl);
//========================================= row 05 ===== MORABAND ==========================
const KanzerTemple = L.marker([-82.80, 91.17], { icon: statonIcon }).bindTooltip("Kanzer Temple", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(KanzerTemple);
const MunlaliMafir = L.marker([-82.85, 98.14], { icon: planetIcon }).bindTooltip("Munlali Mafir", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Quethold = L.marker([-85.33, 105.52], { icon: planetIcon }).bindTooltip("Quethold", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Quethold);
const Oristrom = L.marker([-85.06, 105.64], { icon: planetIcon }).bindTooltip("Oristrom", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Oristrom);
const KrinKoda = L.marker([-81.97, 106.14], { icon: planetIcon }).bindTooltip("Krin Koda (Koda's World)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Quethold);
const Tantsor = L.marker([-83.61, 107.44], { icon: planetIcon }).bindTooltip("Tantsor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tantsor);
const Braccio = L.marker([-82.80, 109.66], { icon: planetIcon }).bindTooltip("Braccio", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Braccio);
const Morcanth = L.marker([-84.47, 109.78], { icon: planetIcon }).bindTooltip("Morcanth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Morcanth);
const Nirauan = L.marker([-85.13, 110.75], { icon: planetIcon }).bindTooltip("Nirauan", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Pashvi = L.marker([-82.12, 111.28], { icon: planetIcon }).bindTooltip("Pashvi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Pashvi);
const Betal = L.marker([-82.57, 111.89], { icon: planetIcon }).bindTooltip("Betal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Betal);
const Kynachi = L.marker([-83.95, 112.39], { icon: planetIcon }).bindTooltip("Kynachi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kynachi);
const Kuratooine = L.marker([-80.56, 113.05], { icon: planetIcon }).bindTooltip("Kuratooine", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kuratooine);
const MarcelanPr = L.marker([-81.26, 114.38], { icon: planetIcon }).bindTooltip("Marcelan Prime", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(MarcelanPr);
const Marquarra = L.marker([-80.97, 114.83], { icon: planetIcon }).bindTooltip("Marquarra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Marquarra);
const Alashan = L.marker([-83.75, 115.30], { icon: planetIcon }).bindTooltip("Alashan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Alashan);
const Khonji = L.marker([-81.61, 115.95], { icon: planetIcon }).bindTooltip("Khonji", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Khonji);
const Brunet = L.marker([-81.55, 116.00], { icon: planetIcon }).bindTooltip("Brunet", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Brunet);
const Comra = L.marker([-84.69, 116.44], { icon: planetIcon }).bindTooltip("Comra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Comra);
const Churruma = L.marker([-79.78, 116.81], { icon: planetIcon }).bindTooltip("Churruma", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Churruma);
const Endex = L.marker([-79.16, 117.48], { icon: planetIcon }).bindTooltip("Endex", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Endex);
const BidJerma = L.marker([-82.27, 117.59], { icon: planetIcon }).bindTooltip("Bid'jerma", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BidJerma);
const KitarosN = L.marker([-83.30, 118.30], { icon: nebIconBlk }).bindTooltip("Kitaros N.", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KitarosN);
const Yorgraxx = L.marker([-82.75, 118.38], { icon: planetIcon }).bindTooltip("Yorgraxx", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Yorgraxx);
const Ompersan = L.marker([-80.59, 118.38], { icon: planetIcon }).bindTooltip("Ompersan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ompersan);
const YagaMinor = L.marker([-80.36, 118.45], { icon: planetIcon }).bindTooltip("Yaga Minor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(YagaMinor);
const Borosk = L.marker([-81.83, 118.45], { icon: planetIcon }).bindTooltip("Borosk", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Prefsbelt = L.marker([-81.33, 118.53], { icon: planetIcon }).bindTooltip("Prefsbelt (Prefid's Belt)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Prefsbelt);
const BarNeth = L.marker([-80.95, 118.92], { icon: planetIcon }).bindTooltip("Bar Neth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BarNeth);
const Carlac = L.marker([-85.45, 119.58], { icon: planetIcon }).bindTooltip("Carlac", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Carlac);
const Ancathia = L.marker([-79.78, 119.72], { icon: planetIcon }).bindTooltip("Ancathia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ancathia);
const Moskk = L.marker([-83.66, 119.88], { icon: planetIcon }).bindTooltip("Moskk", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Moskk);
const Reynon = L.marker([-82.24, 120.12], { icon: planetIcon }).bindTooltip("Reynon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Reynon);
const Ywllandr = L.marker([-85.39, 120.25], { icon: planetIcon }).bindTooltip("Ywllandr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ywllandr);
const Scipio = L.marker([-80.95, 120.27], { icon: planetIcon }).bindTooltip("Scipio", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Scipio);
const Quintus = L.marker([-80.41, 120.64], { icon: planetIcon }).bindTooltip("Quintus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Quintus);
const Monhudle = L.marker([-82.58, 120.69], { icon: planetIcon }).bindTooltip("Monhudle", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Monhudle);
const Minashee = L.marker([-81.48, 121.20], { icon: planetIcon }).bindTooltip("Minashee", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Minashee);
const Dibrook = L.marker([-81.06, 121.34], { icon: planetIcon }).bindTooltip("Dibrook", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dibrook);
const Mygeeto = L.marker([-79.43, 121.41], { icon: pltIconCaL2 }).bindTooltip("Mygeeto", { permanent: true, direction: 'left', offset: [-5, -1], className: 'leaflet-tooltip-mov' }).bindPopup(MygeetoPopup, customOptions).addTo(map);
const Biitu = L.marker([-81.86, 121.98], { icon: planetIcon }).bindTooltip("Biitu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Biitu);
const Garqi = L.marker([-82.47, 122.20], { icon: planetIcon }).bindTooltip("Garqi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Garqi);
const Haverling = L.marker([-80.44, 122.64], { icon: planetIcon }).bindTooltip("Haverling", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Haverling);
const Morishim = L.marker([-79.76, 122.70], { icon: planetIcon }).bindTooltip("Morishim", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Morishim);
const PeldonMinor = L.marker([-84.16, 122.72], { icon: planetIcon }).bindTooltip("Peldon Minor", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PeldonMinor);
const Aris = L.marker([-79.23, 122.77], { icon: planetIcon }).bindTooltip("ARIS", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Aris);
const OrdCanfre = L.marker([-84.61, 123.06], { icon: planetIcon }).bindTooltip("Ord Canfre", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdCanfre);
const Sinjan = L.marker([-82.03, 123.25], { icon: planetIcon }).bindTooltip("Sinjan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sinjan);
const Forsen = L.marker([-83.95, 123.27], { icon: planetIcon }).bindTooltip("Forsen", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Forsen);
const Cassander = L.marker([-83.12, 123.55], { icon: planetIcon }).bindTooltip("Cassander", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cassander);
const Oasis = L.marker([-79.92, 123.69], { icon: planetIcon }).bindTooltip("(Oasis)?", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Oasis);
const Altunna = L.marker([-85.06, 123.84], { icon: planetIcon }).bindTooltip("Altunna", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Altunna);
const MaelstromN = L.marker([-79.64, 123.88], { icon: nebIconBlk }).bindTooltip("Maelstrom N.", { permanent: true, direction: 'right', offset: [-1, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(MaelstromN);
const NewBakstre = L.marker([-83.36, 124.20], { icon: planetIcon }).bindTooltip("New Bakstre", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(NewBakstre);
const Anemcoro = L.marker([-81.58, 124.63], { icon: planetIcon }).bindTooltip("Anemcoro", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Anemcoro);
const OrdBiniir = L.marker([-81.16, 124.78], { icon: planetIcon }).bindTooltip("Ord Biniir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdBiniir);
const KalkiN = L.marker([-82.89, 124.89], { icon: nebIconBlk }).bindTooltip("Kalki N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KalkiN);
const Vykos = L.marker([-79.84, 125.14], { icon: planetIcon }).bindTooltip("Vykos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vykos);
const Moltok = L.marker([-81.73, 125.22], { icon: planetIcon }).bindTooltip("Moltok", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Moltok);
const Isiring = L.marker([-84.02, 125.90], { icon: planetIcon }).bindTooltip("ISIRING", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Isiring);
const Spefik = L.marker([-82.33, 126.50], { icon: planetIcon }).bindTooltip("Spefik", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Spefik);
const Gibbela = L.marker([-81.63, 126.94], { icon: planetIcon }).bindTooltip("Gibbela", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gibbela);
const Sestooine = L.marker([-80.36, 127.40], { icon: planetIcon }).bindTooltip("Sestooine", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sestooine);
const Rhuvia = L.marker([-79.86, 127.55], { icon: planetIcon }).bindTooltip("Rhuvia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rhuvia);
const SharAck = L.marker([-83.30, 127.92], { icon: planetIcon }).bindTooltip("Shar'Ack", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(SharAck);
const GreeBaaker = L.marker([-82.58, 128.15], { icon: planetIcon }).bindTooltip("Gree Baaker", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(GreeBaaker);
const Mantooine = L.marker([-80.78, 128.42], { icon: pltIconCaL }).bindTooltip("Mantooine", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(MantooinePopup, customOptions).addTo(map);
const Vuchelle = L.marker([-84.00, 128.47], { icon: planetIcon }).bindTooltip("Vuchelle", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vuchelle);
const Iridium = L.marker([-82.88, 128.69], { icon: planetIcon }).bindTooltip("Iridium", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Iridium);
const DesolationSta = L.marker([-81.07, 129.23], { icon: statonIcon }).bindTooltip("Desolation Sta.", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(DesolationSta);
const Despayre = L.marker([-81.07, 129.44], { icon: planetIcon }).bindTooltip("Despayre (Horuz)", { permanent: true, direction: 'right', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Despayre);
const Fedje = L.marker([-84.01, 129.50], { icon: planetIcon }).bindTooltip("Fedje", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Fedje);
const AjanKloss = L.marker([-84.88, 129.50], { icon: pltIconCan2 }).bindTooltip("Ajan Kloss", { permanent: true, direction: 'left', offset: [-5, -7], className: 'leaflet-tooltip-mov' }).bindPopup(AjanKlossPopup, customOptions).addTo(map);
const Fest = L.marker([-82.95, 130.06], { icon: planetIcon }).bindTooltip("Fest", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Fest);
const Zeffliffl = L.marker([-81.73, 130.20], { icon: planetIcon }).bindTooltip("Zeffliffl", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Zeffliffl);
const Devon = L.marker([-82.52, 130.30], { icon: planetIcon }).bindTooltip("Devon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Devon);
const Gurrisalia = L.marker([-79.18, 130.40], { icon: planetIcon }).bindTooltip("Gurrisalia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gurrisalia);
const Generis = L.marker([-82.14, 130.46], { icon: planetIcon }).bindTooltip("Generis / Atrivis", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Generis);
const NamTa = L.marker([-81.16, 130.55], { icon: planetIcon }).bindTooltip("Nam'ta", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NamTa);
const Noola = L.marker([-79.76, 130.66], { icon: planetIcon }).bindTooltip("Noola", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Noola);
const Hethar = L.marker([-81.72, 130.76], { icon: planetIcon }).bindTooltip("Hethar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hethar);
const Ketaris = L.marker([-84.97, 130.79], { icon: planetIcon }).bindTooltip("Ketaris", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ketaris);
const Yuvern = L.marker([-82.23, 131.72], { icon: planetIcon }).bindTooltip("Yuvern", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Yuvern);
const HarrodsPlanet = L.marker([-84.47, 132.41], { icon: planetIcon }).bindTooltip("Harrod's Planet", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(HarrodsPlanet);
const VosteltigShip = L.marker([-83.81, 132.67], { icon: statonIcon }).bindTooltip("Vosteltig Shipyards", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(VosteltigShip);
const Oplovis = L.marker([-82.95, 133.27], { icon: planetIcon }).bindTooltip("Oplovis", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Oplovis);
const OornTchis = L.marker([-84.67, 133.47], { icon: planetIcon }).bindTooltip("Oorn Tchis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OornTchis);
const Sronk = L.marker([-82.48, 133.78], { icon: planetIcon }).bindTooltip("Sronk", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sronk);
const Kebolar = L.marker([-85.26, 133.81], { icon: planetIcon }).bindTooltip("Kebolar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kebolar);
const Akuria = L.marker([-79.81, 133.91], { icon: planetIcon }).bindTooltip("Akuria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Akuria);
const Agamar = L.marker([-84.40, 134.28], { icon: planetIcon }).bindTooltip("Agamar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Agamar);
const Gandolo = L.marker([-80.95, 134.89], { icon: planetIcon }).bindTooltip("Gandolo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Gandolo);
const Chrellis = L.marker([-84.78, 135.28], { icon: planetIcon }).bindTooltip("Chrellis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Chrellis);
const CowlCrucible = L.marker([-85.45, 135.83], { icon: nebIconBlk }).bindTooltip("Cowl Crucible", { permanent: true, direction: 'right', offset: [-3, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(CowlCrucible);
const Gondagali = L.marker([-80.14, 136.05], { icon: planetIcon }).bindTooltip("Gondagali", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gondagali);
const Chabosh = L.marker([-82.44, 136.20], { icon: planetIcon }).bindTooltip("Chabosh", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Chabosh);
const HornStation = L.marker([-83.73, 136.53], { icon: planetIcon }).bindTooltip("Horn Station", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(HornStation);
const Gaddria = L.marker([-84.51, 137.30], { icon: planetIcon }).bindTooltip("Gaddria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gaddria);
const Hazzard = L.marker([-82.76, 137.58], { icon: planetIcon }).bindTooltip("Hazzard", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hazzard);
const PasSic = L.marker([-85.09, 137.62], { icon: planetIcon }).bindTooltip("Pas'sic", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PasSic);
const Mistar = L.marker([-81.66, 138.44], { icon: planetIcon }).bindTooltip("Mistar", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mistar);
const Aefao = L.marker([-85.25, 138.50], { icon: planetIcon }).bindTooltip("Aefao", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Aefao);
const Raspar = L.marker([-82.41, 138.86], { icon: planetIcon }).bindTooltip("Raspar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Raspar);
const Tinuvia = L.marker([-83.84, 138.94], { icon: planetIcon }).bindTooltip("Tinuvia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tinuvia);
const ShaumHii = L.marker([-82.01, 139.03], { icon: planetIcon }).bindTooltip("Shaum Hii", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ShaumHii);
const Argo = L.marker([-79.84, 139.12], { icon: planetIcon }).bindTooltip("Argo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Argo);
const BakisianDrift = L.marker([-81.86, 139.33], { icon: nebIconBlk }).bindTooltip("Bakisian Drift", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BakisianDrift);
const Maxet = L.marker([-82.72, 139.33], { icon: planetIcon }).bindTooltip("Maxet", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Maxet);
const M2934738 = L.marker([-81.61, 139.42], { icon: planetIcon }).bindTooltip("M2934738", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(M2934738);
const Liinade = L.marker([-80.75, 140.36], { icon: planetIcon }).bindTooltip("Liinade", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Liinade);
const Binquaros = L.marker([-82.17, 140.39], { icon: planetIcon }).bindTooltip("Binquaros", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Binquaros);
const Liok = L.marker([-80.41, 140.61], { icon: planetIcon }).bindTooltip("Liok", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Liok);
const Huro = L.marker([-81.08, 140.92], { icon: planetIcon }).bindTooltip("Huro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Huro);
const OrdTraga = L.marker([-83.11, 140.94], { icon: planetIcon }).bindTooltip("Ord Traga", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(OrdTraga);
const Ciutric = L.marker([-80.66, 141.17], { icon: planetIcon }).bindTooltip("Ciutric", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ciutric);
const CorvisMin = L.marker([-79.58, 141.19], { icon: planetIcon }).bindTooltip("Corvis Minor", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(CorvisMin);
const NewHolgha = L.marker([-83.41, 141.31], { icon: planetIcon }).bindTooltip("New Holgha", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NewHolgha);
const Abar = L.marker([-84.25, 141.31], { icon: planetIcon }).bindTooltip("Abar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Abar);
const Vrosynri = L.marker([-80.45, 141.69], { icon: planetIcon }).bindTooltip("Vrosynri", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vrosynri);
const PandemNai = L.marker([-85.48, 142.09], { icon: planetIcon }).bindTooltip("Pandem Nai*", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PandemNai);
const NewAgamar = L.marker([-83.79, 142.25], { icon: planetIcon }).bindTooltip("New Agamar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NewAgamar);
const Asher = L.marker([-83.33, 142.37], { icon: planetIcon }).bindTooltip("Asher", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Asher);
const Abafar = L.marker([-85.00, 142.37], { icon: planetIcon }).bindTooltip("Abafar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Abafar);
const Sprizen = L.marker([-84.36, 142.39], { icon: planetIcon }).bindTooltip("Sprizen", { permanent: true, direction: 'left', offset: [1, 5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sprizen);
const Thaylia = L.marker([-82.55, 142.59], { icon: planetIcon }).bindTooltip("Thaylia", { permanent: true, direction: 'right', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thaylia);
const Salin = L.marker([-84.23, 142.83], { icon: planetIcon }).bindTooltip("Salin", { permanent: true, direction: 'left', offset: [1, -6], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Salin);
const Nijune = L.marker([-80.35, 142.80], { icon: planetIcon }).bindTooltip("Nijune", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nijune);
const Zrak = L.marker([-81.44, 142.81], { icon: planetIcon }).bindTooltip("Zrak", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Zrak);
const Vinsoth = L.marker([-85.08, 142.97], { icon: planetIcon }).bindTooltip("Vinsoth", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vinsoth);
const Aar = L.marker([-79.27, 143.27], { icon: planetIcon }).bindTooltip("Aar", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Aar);
const Ethrani = L.marker([-84.19, 143.50], { icon: planetIcon }).bindTooltip("Ethrani", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ethrani);
const VeilN = L.marker([-84.48, 143.70], { icon: nebIconBlk }).bindTooltip("Veil N.", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(VeilN);
const Portminia = L.marker([-81.06, 143.70], { icon: planetIcon }).bindTooltip("Portminia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Portminia);
const HarkoSta = L.marker([-84.64, 143.73], { icon: statonIcon }).bindTooltip("Harko Sta.", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(HarkoSta);
const Valahari = L.marker([-84.89, 143.81], { icon: planetIcon }).bindTooltip("Valahari", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Valahari);
const Esooma = L.marker([-82.06, 143.91], { icon: planetIcon }).bindTooltip("Esooma", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Esooma);
const Ramoa = L.marker([-80.11, 144.05], { icon: planetIcon }).bindTooltip("Ramoa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ramoa);
const Jargridia = L.marker([-82.94, 144.17], { icon: planetIcon }).bindTooltip("Jargridia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jargridia);
const Isen = L.marker([-84.42, 144.22], { icon: planetIcon }).bindTooltip("Isen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Isen);
const Mestun = L.marker([-83.40, 144.47], { icon: planetIcon }).bindTooltip("Mestun", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mestun);
const SamarineProvi = L.marker([-84.72, 144.44], { icon: planetIcon }).bindTooltip("Samarine Province", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(SamarineProvi);
const KeepersWorld = L.marker([-80.66, 145.14], { icon: planetIcon }).bindTooltip("Keeper's World", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KeepersWorld);
const Axxila = L.marker([-84.56, 145.23], { icon: planetIcon }).bindTooltip("Axxila", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Axxila);
const PrioleDanna = L.marker([-82.81, 145.75], { icon: planetIcon }).bindTooltip("Priole Danna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PrioleDanna);
const Altyr = L.marker([-79.78, 146.61], { icon: planetIcon }).bindTooltip("Altyr", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Altyr);
const DurSabon = L.marker([-80.30, 147.03], { icon: planetIcon }).bindTooltip("Dur Sabon", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(DurSabon);
const NezPeron = L.marker([-84.72, 147.03], { icon: planetIcon }).bindTooltip("NEZ PERON", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(NezPeron);
const Nichen = L.marker([-83.03, 147.31], { icon: planetIcon }).bindTooltip("Nichen", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nichen);
const Ootoola = L.marker([-79.98, 147.42], { icon: planetIcon }).bindTooltip("Ootoola", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ootoola);
const Vandyne = L.marker([-82.69, 147.86], { icon: planetIcon }).bindTooltip("Vandyne", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vandyne);
const Camden = L.marker([-81.45, 148.20], { icon: planetIcon }).bindTooltip("Camden", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Camden);
const Rivvidu = L.marker([-83.83, 148.45], { icon: planetIcon }).bindTooltip("Rivvidu", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rivvidu);
const Edusa = L.marker([-80.14, 148.48], { icon: planetIcon }).bindTooltip("Edusa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Edusa);
const Thesme = L.marker([-85.03, 148.69], { icon: planetIcon }).bindTooltip("THESME", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thesme);
const Hexus = L.marker([-80.70, 149.06], { icon: planetIcon }).bindTooltip("Hexus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hexus);
const Clysm = L.marker([-82.64, 149.34], { icon: planetIcon }).bindTooltip("Clysm", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Clysm);
const FeriaeJunctio = L.marker([-85.17, 149.78], { icon: planetIcon }).bindTooltip("Feriae Junction", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(FeriaeJunctio);
const Galloa = L.marker([-79.47, 150.34], { icon: planetIcon }).bindTooltip("Galloa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Galloa);
const Sorrus = L.marker([-84.40, 150.34], { icon: planetIcon }).bindTooltip("Sorrus", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sorrus);
const Hynah = L.marker([-83.98, 150.66], { icon: planetIcon }).bindTooltip("Hynah", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Hynah);
const Simpla = L.marker([-83.51, 150.99], { icon: planetIcon }).bindTooltip("Simpla", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Simpla);
const MBardi = L.marker([-82.36, 151.16], { icon: planetIcon }).bindTooltip("M'Bardi", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(MBardi);
const FesweMin = L.marker([-85.14, 151.33], { icon: planetIcon }).bindTooltip("Feswe Minor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(FesweMin);
const Toprawa = L.marker([-82.86, 151.47], { icon: planetIcon }).bindTooltip("Toprawa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Toprawa);
const KhoNai = L.marker([-83.98, 151.42], { icon: planetIcon }).bindTooltip("Kho Nai", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KhoNai);
const Serenno = L.marker([-81.53, 151.50], { icon: pltIconCaL }).bindTooltip("Serenno", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(SerennoPopup, customOptions).addTo(map);
const FeswePrime = L.marker([-84.47, 151.59], { icon: planetIcon }).bindTooltip("Feswe Prime", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(FeswePrime);
const Teevan = L.marker([-80.22, 152.16], { icon: planetIcon }).bindTooltip("Teevan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Teevan);
const Gaftikar = L.marker([-81.81, 152.55], { icon: planetIcon }).bindTooltip("Gaftikar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gaftikar);
const Endymion = L.marker([-79.25, 152.58], { icon: planetIcon }).bindTooltip("Endymion", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Endymion);
const FesweCorridor = L.marker([-84.87, 152.70], { icon: planetIcon }).bindTooltip("Feswe Corridor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(FesweCorridor);
const PhoPhEah = L.marker([-80.80, 152.83], { icon: planetIcon }).bindTooltip("Pho Ph'eah", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(PhoPhEah);
const Shenio = L.marker([-82.70, 152.86], { icon: planetIcon }).bindTooltip("Shenio", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Shenio);
const Tandun = L.marker([-82.20, 152.95], { icon: planetIcon }).bindTooltip("Tandun", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tandun);
const Krylon = L.marker([-85.55, 153.50], { icon: planetIcon }).bindTooltip("Krylon", { permanent: true, direction: 'left', offset: [1, 5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Krylon);
const Tyshapahl = L.marker([-79.83, 153.98], { icon: planetIcon }).bindTooltip("Tyshapahl", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tyshapahl);
const Ladarra = L.marker([-84.75, 154.28], { icon: planetIcon }).bindTooltip("Ladarra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ladarra);
const Durollia = L.marker([-81.19, 154.30], { icon: planetIcon }).bindTooltip("Durollia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Durollia);
const Marrovia = L.marker([-84.08, 154.94], { icon: planetIcon }).bindTooltip("Marrovia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Marrovia);
const AthusKlee = L.marker([-80.81, 155.14], { icon: planetIcon }).bindTooltip("Athus Klee", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(AthusKlee);
const Daluba = L.marker([-80.31, 155.58], { icon: planetIcon }).bindTooltip("Daluba", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Daluba);
const KliAar = L.marker([-83.64, 155.75], { icon: planetIcon }).bindTooltip("Kli'aar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(KliAar);
const Saarn = L.marker([-79.35, 155.95], { icon: planetIcon }).bindTooltip("Saarn", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Saarn);
const Mogoshyn = L.marker([-82.19, 156.23], { icon: planetIcon }).bindTooltip("Mogoshyn", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mogoshyn);
const Betshish = L.marker([-82.99, 156.36], { icon: planetIcon }).bindTooltip("Betshish", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Betshish);
const Kushibah = L.marker([-81.56, 156.45], { icon: planetIcon }).bindTooltip("Kushibah", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Kushibah);
const Glade = L.marker([-84.75, 156.80], { icon: planetIcon }).bindTooltip("Glade", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Glade);
const Marranis = L.marker([-80.61, 157.00], { icon: planetIcon }).bindTooltip("Marranis", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Marranis);
const Mannova = L.marker([-82.44, 157.47], { icon: planetIcon }).bindTooltip("Mannova", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mannova);
const OrdRadama = L.marker([-79.67, 157.67], { icon: planetIcon }).bindTooltip("Ord Radama", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdRadama);
const Droxine = L.marker([-81.06, 158.17], { icon: planetIcon }).bindTooltip("Droxine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Droxine);
const WetyinsColony = L.marker([-83.67, 158.19], { icon: planetIcon }).bindTooltip("Wetyin's Colony", { permanent: true, direction: 'right', offset: [-2, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(WetyinsColony);
const TheRoil = L.marker([-84.97, 158.89], { icon: nebIconBlk }).bindTooltip("The Roil", { permanent: true, direction: 'right', offset: [-19, 10], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TheRoil);
const Troos = L.marker([-81.72, 159.69], { icon: planetIcon }).bindTooltip("Troos (Vynx)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Troos);
const Atorra = L.marker([-82.30, 159.89], { icon: planetIcon }).bindTooltip("Atorra", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Atorra);
const Chenowei = L.marker([-83.03, 160.20], { icon: planetIcon }).bindTooltip("Chenowei", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Chenowei);
const Elamposnia = L.marker([-82.28, 160.39], { icon: planetIcon }).bindTooltip("Elamposnia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Elamposnia);
const BTrilla = L.marker([-83.90, 160.42], { icon: planetIcon }).bindTooltip("B'trilla", { permanent: true, direction: 'right', offset: [0, 7], className: 'leaflet-tooltip    ' }); zoom04.addLayer(BTrilla);
const Feena = L.marker([-85.12, 160.58], { icon: planetIcon }).bindTooltip("Feena (Olgabl)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Feena);
const Lapez = L.marker([-79.31, 161.59], { icon: planetIcon }).bindTooltip("Lapez", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lapez);
const Kursid = L.marker([-80.44, 162.59], { icon: planetIcon }).bindTooltip("Kursid", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kursid);
const Arcopola = L.marker([-84.51, 162.94], { icon: planetIcon }).bindTooltip("Arcopola", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Arcopola);
const Corbos = L.marker([-81.81, 162.98], { icon: planetIcon }).bindTooltip("Corbos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Corbos);
const Thule = L.marker([-79.61, 163.17], { icon: planetIcon }).bindTooltip("Thule", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thule);
const OdacerFaustin = L.marker([-82.83, 163.33], { icon: planetIcon }).bindTooltip("Odacer-Faustin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OdacerFaustin);
const XV344H = L.marker([-83.17, 163.56], { icon: planetIcon }).bindTooltip("XV-344H", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(XV344H);
const JagasCl = L.marker([-83.89, 163.75], { icon: clustrIcon }).bindTooltip("Jaga's Cl.", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(JagasCl);
const Drezzi = L.marker([-80.80, 163.80], { icon: planetIcon }).bindTooltip("Drezzi", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Drezzi);
const LorattickN = L.marker([-83.69, 163.95], { icon: planetIcon }).bindTooltip("Lorattick N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(LorattickN);
const Bravis = L.marker([-84.83, 164.11], { icon: planetIcon }).bindTooltip("Bravis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bravis);
const NichtKa = L.marker([-79.94, 164.41], { icon: planetIcon }).bindTooltip("Nicht Ka", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NichtKa);
const Hallion = L.marker([-81.08, 164.45], { icon: planetIcon }).bindTooltip("Hallion", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hallion);
const Kalsunor = L.marker([-79.30, 164.84], { icon: planetIcon }).bindTooltip("Kalsunor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kalsunor);
const Moraband = L.marker([-81.30, 165.05], { icon: pltIconCaL }).bindTooltip("Moraband (Korriban)", { permanent: true, direction: 'right', offset: [2, -3], className: 'leaflet-tooltip    ' }).bindPopup(MorabandPopup, customOptions).addTo(map);
const Hermos = L.marker([-84.00, 165.11], { icon: planetIcon }).bindTooltip("Hermos", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hermos);
const AshasRee = L.marker([-79.66, 165.30], { icon: planetIcon }).bindTooltip("Ashas Ree", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(AshasRee);
const Stenos = L.marker([-85.06, 165.39], { icon: planetIcon }).bindTooltip("Stenos (Maldont)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Stenos);
const Qalydon = L.marker([-82.83, 165.49], { icon: planetIcon }).bindTooltip("Qalydon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Qalydon);
const Bosthirda = L.marker([-80.56, 165.61], { icon: planetIcon }).bindTooltip("Bosthirda", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bosthirda);
const OrdDalet = L.marker([-83.67, 165.84], { icon: planetIcon }).bindTooltip("Ord Dalet", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(OrdDalet);
const DromundKaas = L.marker([-80.23, 166.27], { icon: planetIcon }).bindTooltip("Dromund Kaas", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(DromundKaas);
const StygianCalder = L.marker([-79.22, 166.19], { icon: nebIconBlk }).bindTooltip("Stygian Caldera N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(StygianCalder);
const Elom = L.marker([-84.14, 166.06], { icon: planetIcon }).bindTooltip("Elom", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Elom);
const Jaguada = L.marker([-79.78, 166.52], { icon: planetIcon }).bindTooltip("Jaguada", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jaguada);
const Lamus = L.marker([-82.16, 166.56], { icon: planetIcon }).bindTooltip("Lamus", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lamus);
const Ermi = L.marker([-82.48, 166.72], { icon: planetIcon }).bindTooltip("Ermi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ermi);
const Tandgor = L.marker([-84.39, 166.95], { icon: planetIcon }).bindTooltip("Tandgor", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tandgor);
const Upekzar = L.marker([-80.97, 167.23], { icon: planetIcon }).bindTooltip("Upekzar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Upekzar);
const Sondarr = L.marker([-83.98, 167.23], { icon: planetIcon }).bindTooltip("Sondarr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sondarr);
const Brachi = L.marker([-81.81, 167.38], { icon: planetIcon }).bindTooltip("Brachi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Brachi);
const Arorua = L.marker([-84.34, 167.45], { icon: planetIcon }).bindTooltip("Arorua", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Arorua);
const Rhelg = L.marker([-80.33, 167.64], { icon: planetIcon }).bindTooltip("Rhelg", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rhelg);
const Curreck = L.marker([-83.41, 168.70], { icon: planetIcon }).bindTooltip("Curreck", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Curreck);
const Tervissis = L.marker([-82.03, 168.72], { icon: planetIcon }).bindTooltip("Tervissis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tervissis);
const Kejim = L.marker([-83.22, 168.92], { icon: planetIcon }).bindTooltip("Kejim", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kejim);
const Draflago = L.marker([-81.52, 169.11], { icon: planetIcon }).bindTooltip("Draflago", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Draflago);
const Yalln = L.marker([-80.47, 169.20], { icon: planetIcon }).bindTooltip("Yalln", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Yalln);
const Ranroon = L.marker([-80.06, 169.39], { icon: planetIcon }).bindTooltip("Ranroon", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ranroon);
const Vestral = L.marker([-81.27, 169.45], { icon: planetIcon }).bindTooltip("Vestral", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vestral);
const Syngia = L.marker([-82.31, 169.48], { icon: planetIcon }).bindTooltip("Syngia", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Syngia);
const Drayberia = L.marker([-83.83, 169.52], { icon: planetIcon }).bindTooltip("Drayberia", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Drayberia);
const Cantonica = L.marker([-79.17, 169.63], { icon: pltIconCan2 }).bindTooltip("Cantonica", { permanent: true, direction: 'right', offset: [3, -6], className: 'leaflet-tooltip-mov' }).bindPopup(CantonicaPopup, customOptions).addTo(map);
const Tahlboor = L.marker([-84.83, 170.00], { icon: planetIcon }).bindTooltip("Tahlboor", { permanent: true, direction: 'right', offset: [-2, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tahlboor);
const Fromiria = L.marker([-79.42, 170.12], { icon: planetIcon }).bindTooltip("Fromiria", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fromiria);
const Yutusk = L.marker([-81.84, 170.17], { icon: planetIcon }).bindTooltip("Yutusk", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Yutusk);
const Dakot = L.marker([-80.47, 170.22], { icon: planetIcon }).bindTooltip("Dakot", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dakot);
const Vanqor = L.marker([-82.11, 170.23], { icon: planetIcon }).bindTooltip("Vanqor", { permanent: true, direction: 'right', offset: [-2, -6], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vanqor);
const Florrum = L.marker([-82.17, 170.28], { icon: planetIcon }).bindTooltip("Florrum", { permanent: true, direction: 'right', offset: [-1, 5], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Florrum);
const Kestel = L.marker([-80.58, 170.30], { icon: planetIcon }).bindTooltip("Kestel", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kestel);
const Refrax = L.marker([-80.11, 170.33], { icon: planetIcon }).bindTooltip("Refrax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Refrax);
const Meliflar = L.marker([-79.88, 170.37], { icon: statonIcon }).bindTooltip("Meliflar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Meliflar);
const Kazarak = L.marker([-82.72, 170.81], { icon: planetIcon }).bindTooltip("Kazarak", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kazarak);
const ChoahBelt = L.marker([-81.36, 170.81], { icon: planetIcon }).bindTooltip("Choah Belt", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ChoahBelt);
const RMFacilityNo4 = L.marker([-83.15, 170.86], { icon: statonIcon }).bindTooltip("R/M Facility No. 4", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(RMFacilityNo4);
const Vornax = L.marker([-84.20, 171.13], { icon: planetIcon }).bindTooltip("Vornax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vornax);
const Fangol = L.marker([-81.72, 171.16], { icon: planetIcon }).bindTooltip("Fangol", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fangol);
const ShallowMarch = L.marker([-80.48, 171.20], { icon: planetIcon }).bindTooltip("Shallow March", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(ShallowMarch);
const Barundi = L.marker([-85.00, 171.42], { icon: planetIcon }).bindTooltip("Barundi", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Barundi);
const OrdTorrenze = L.marker([-82.14, 171.47], { icon: planetIcon }).bindTooltip("Ord Torrenze", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdTorrenze);
const Sembla = L.marker([-83.25, 171.58], { icon: planetIcon }).bindTooltip("Sembla (Utuvurk)", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sembla);
const Malkii = L.marker([-79.95, 171.61], { icon: planetIcon }).bindTooltip("Malkii", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Malkii);
const Livien = L.marker([-85.40, 171.63], { icon: planetIcon }).bindTooltip("Livien", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Livien);
const Almania = L.marker([-79.45, 171.66], { icon: planetIcon }).bindTooltip("Almania", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Almania);
const Lotide = L.marker([-81.00, 171.78], { icon: planetIcon }).bindTooltip("Lotide", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lotide);
const Kanaver = L.marker([-85.09, 172.16], { icon: planetIcon }).bindTooltip("Kanaver", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kanaver);
const OrdBueri = L.marker([-81.87, 172.19], { icon: planetIcon }).bindTooltip("Ord Bueri", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdBueri);
const Rhilithan = L.marker([-84.72, 172.30], { icon: planetIcon }).bindTooltip("Rhilithan", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rhilithan);
const ReapersWorld = L.marker([-80.47, 172.35], { icon: planetIcon }).bindTooltip("REAPER'S WORLD", { permanent: true, direction: 'right', offset: [-9, 12], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ReapersWorld);
const Folende = L.marker([-85.53, 172.35], { icon: planetIcon }).bindTooltip("Folende", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Folende);
const Minntaa = L.marker([-79.75, 172.63], { icon: planetIcon }).bindTooltip("Minntaa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Minntaa);
const JanodralMizar = L.marker([-83.84, 172.74], { icon: planetIcon }).bindTooltip("Janodral Mizar", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(JanodralMizar);
const Dalos = L.marker([-81.39, 172.89], { icon: planetIcon }).bindTooltip("Dalos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dalos);
const AnkKiShor = L.marker([-83.59, 172.97], { icon: planetIcon }).bindTooltip("Ank Ki'Shor", { permanent: true, direction: 'right', offset: [-1, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(AnkKiShor);
const Estaria = L.marker([-83.11, 173.17], { icon: planetIcon }).bindTooltip("Estaria", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Estaria);
const Risban = L.marker([-85.42, 173.41], { icon: planetIcon }).bindTooltip("Risban", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Risban);
const MakemTe = L.marker([-82.39, 173.63], { icon: planetIcon }).bindTooltip("Makem Te", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(MakemTe);
const Emmer = L.marker([-80.48, 173.72], { icon: planetIcon }).bindTooltip("Emmer (Umhul)", { permanent: true, direction: 'right', offset: [-1, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Emmer);
const Qotile = L.marker([-79.31, 173.81], { icon: planetIcon }).bindTooltip("Qotile", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Qotile);
const Kruskan = L.marker([-79.86, 174.09], { icon: planetIcon }).bindTooltip("Kruskan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kruskan);
const Endregaad = L.marker([-84.40, 174.22], { icon: planetIcon }).bindTooltip("Endregaad", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Endregaad);
const Quermia = L.marker([-81.47, 174.30], { icon: planetIcon }).bindTooltip("Quermia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Quermia);
const Shalyvane = L.marker([-83.89, 174.91], { icon: planetIcon }).bindTooltip("Shalyvane", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Shalyvane);
const Raxus = L.marker([-84.89, 175.00], { icon: planetIcon }).bindTooltip("Raxus", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Raxus);
const Tion = L.marker([-85.01, 175.19], { icon: planetIcon }).bindTooltip("Tion", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tion);
const Kashoon = L.marker([-80.62, 175.42], { icon: planetIcon }).bindTooltip("Kashoon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kashoon);
const Toola = L.marker([-81.42, 175.70], { icon: planetIcon }).bindTooltip("Toola", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Toola);
const SimusMin = L.marker([-79.95, 176.05], { icon: planetIcon }).bindTooltip("Simus Minor", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(SimusMin);
const GalshebbisPr = L.marker([-83.57, 176.39], { icon: planetIcon }).bindTooltip("Galshebbis Prime", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(GalshebbisPr);
const SonnVilmari = L.marker([-81.04, 176.61], { icon: planetIcon }).bindTooltip("Sonn Vilmari", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(SonnVilmari);
const NamPriax = L.marker([-84.45, 176.61], { icon: planetIcon }).bindTooltip("Nam Priax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NamPriax);
const Karkaris = L.marker([-82.26, 176.78], { icon: planetIcon }).bindTooltip("Karkaris", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Karkaris);
const Salissia = L.marker([-80.48, 177.17], { icon: planetIcon }).bindTooltip("Salissia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Salissia);
const Florn = L.marker([-83.03, 177.66], { icon: planetIcon }).bindTooltip("Florn (Tinatorn)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Florn);
const Zandrax = L.marker([-85.00, 177.73], { icon: planetIcon }).bindTooltip("Zandrax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Zandrax);
const Syruss = L.marker([-83.56, 177.92], { icon: planetIcon }).bindTooltip("Syruss", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Syruss);
const Cholganna = L.marker([-80.70, 178.30], { icon: planetIcon }).bindTooltip("Cholganna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Cholganna);
const Daltarra = L.marker([-84.61, 178.77], { icon: planetIcon }).bindTooltip("Daltarra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Daltarra);
const TonFalk = L.marker([-84.34, 178.98], { icon: planetIcon }).bindTooltip("Ton-Falk", { permanent: true, direction: 'right', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(TonFalk);
const Cujicor = L.marker([-85.45, 179.50], { icon: planetIcon }).bindTooltip("Cujicor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cujicor);
const Yaronn = L.marker([-81.61, 180.76], { icon: planetIcon }).bindTooltip("Yaronn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Yaronn);
const Crseih = L.marker([-85.29, 180.76], { icon: planetIcon }).bindTooltip("Crseih", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }).addTo(map);
const Drongar = L.marker([-83.31, 181.31], { icon: planetIcon }).bindTooltip("Drongar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Drongar);
const Seidhkona = L.marker([-83.97, 182.73], { icon: planetIcon }).bindTooltip("Seidhkona", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Seidhkona);
const Apiliria = L.marker([-79.48, 183.06], { icon: planetIcon }).bindTooltip("Apiliria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Apiliria);
//======================================== row 06 ===== YAVIN 4 ==========================
const Zosha = L.marker([-89.50, 87.63], { icon: pltIconLeg }).bindTooltip("Zosha", { permanent: true, direction: 'left', offset: [-4, -1], className: 'leaflet-tooltip    ' }).bindPopup(ZoshaPopup, customOptions).addTo(map);
const Durace = L.marker([-88.23, 98.98], { icon: planetIcon }).bindTooltip("Durace", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Durace);
const FarCradle = L.marker([-91.52, 99.59], { icon: statonIcon }).bindTooltip("Far Cradle", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(FarCradle);
const Parnassos = L.marker([-89.31, 100.69], { icon: planetIcon }).bindTooltip("Parnassos", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Parnassos);
const a244Core = L.marker([-90.28, 102.02], { icon: planetIcon }).bindTooltip("244Core (Sraato)", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(a244Core);
const UR2212GR = L.marker([-89.55, 102.61], { icon: planetIcon }).bindTooltip("UR-2212-GR", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(UR2212GR);
const Irkalla = L.marker([-86.24, 103.95], { icon: planetIcon }).bindTooltip("Irkalla", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Irkalla);
const Flacharia = L.marker([-89.98, 104.98], { icon: planetIcon }).bindTooltip("Flacharia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Flacharia);
const Veroleem = L.marker([-88.45, 105.72], { icon: planetIcon }).bindTooltip("Veroleem", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Veroleem);
const Thuna = L.marker([-88.02, 105.80], { icon: planetIcon }).bindTooltip("Thuna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Thuna);
const KroVar = L.marker([-85.67, 105.95], { icon: planetIcon }).bindTooltip("Kro Var", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(KroVar);
const Esfandia = L.marker([-89.41, 106.48], { icon: planetIcon }).bindTooltip("Esfandia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Taloron = L.marker([-90.03, 108.48], { icon: planetIcon }).bindTooltip("Taloron", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Taloron);
const Frunchettan = L.marker([-89.53, 108.94], { icon: planetIcon }).bindTooltip("Frunchettan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Frunchettan);
const Kariek = L.marker([-88.19, 109.64], { icon: planetIcon }).bindTooltip("Kariek", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Kariek);
const Dbari = L.marker([-90.99, 109.48], { icon: planetIcon }).bindTooltip("Dbari", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dbari);
const Malari = L.marker([-91.65, 110.12], { icon: planetIcon }).bindTooltip("Malari", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Malari);
const Lakra = L.marker([-88.57, 110.23], { icon: planetIcon }).bindTooltip("Lakra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lakra);
const Namadii = L.marker([-91.19, 111.20], { icon: planetIcon }).bindTooltip("Namadii", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Namadii);
const Ansion = L.marker([-92.09, 111.22], { icon: planetIcon }).bindTooltip("Ansion", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ansion);
const Diab = L.marker([-87.64, 111.84], { icon: planetIcon }).bindTooltip("Diab", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Diab);
const Hoogon = L.marker([-89.89, 111.92], { icon: planetIcon }).bindTooltip("Hoogon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hoogon);
const Adumar = L.marker([-88.73, 112.05], { icon: planetIcon }).bindTooltip("Adumar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Adumar);
const Alderbathe = L.marker([-91.57, 112.98], { icon: planetIcon }).bindTooltip("Alderbathe", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Alderbathe);
const Bardelberan = L.marker([-90.45, 113.09], { icon: planetIcon }).bindTooltip("Bardeberan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bardelberan);
const Kobbahn = L.marker([-88.37, 113.27], { icon: planetIcon }).bindTooltip("Kobbahn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kobbahn);
const Aeten = L.marker([-86.59, 113.78], { icon: planetIcon }).bindTooltip("Aeten", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Oracaia = L.marker([-89.20, 113.91], { icon: planetIcon }).bindTooltip("Oracaia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Oracaia);
const Keitum = L.marker([-90.84, 114.02], { icon: planetIcon }).bindTooltip("Keitum", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Keitum);
const Ariarch = L.marker([-91.66, 114.29], { icon: planetIcon }).bindTooltip("Ariarch", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ariarch);
const Ganlihk = L.marker([-88.81, 114.53], { icon: planetIcon }).bindTooltip("Ganlihk", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ganlihk);
const Dalron = L.marker([-90.05, 114.65], { icon: planetIcon }).bindTooltip("Dalron", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dalron);
const DreightonN = L.marker([-86.28, 115.02], { icon: nebIconBlk }).bindTooltip("Dreighton N.", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(DreightonN);
const Troska = L.marker([-87.45, 115.03], { icon: planetIcon }).bindTooltip("Troska", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Troska);
const Imdaar = L.marker([-85.72, 115.25], { icon: planetIcon }).bindTooltip("Imdaar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Imdaar);
const Arah = L.marker([-86.45, 115.47], { icon: planetIcon }).bindTooltip("Arah", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Arah);
const Dreighton = L.marker([-87.89, 115.73], { icon: planetIcon }).bindTooltip("Dreighton", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dreighton);
const Parliock = L.marker([-90.30, 116.06], { icon: planetIcon }).bindTooltip("Parliock", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Parliock);
const Ryloon = L.marker([-79.52, 116.09], { icon: planetIcon }).bindTooltip("Ryloon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ryloon);
const Quadrant7 = L.marker([-89.52, 116.12], { icon: planetIcon }).bindTooltip("Quadrant Seven", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Quadrant7);
const BarsBarka = L.marker([-90.38, 116.32], { icon: planetIcon }).bindTooltip("Bars Barka", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BarsBarka);
const Cirrus = L.marker([-88.96, 116.43], { icon: pltIconCaL }).bindTooltip("Cirrus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cirrus);
const Drompani = L.marker([-86.27, 116.45], { icon: planetIcon }).bindTooltip("Drompani", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Drompani);
const Sorl = L.marker([-87.70, 116.86], { icon: planetIcon }).bindTooltip("Sorl", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Sorl);
const Nosken = L.marker([-86.08, 116.95], { icon: planetIcon }).bindTooltip("Nosken", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nosken);
const Harridan = L.marker([-87.56, 117.23], { icon: planetIcon }).bindTooltip("Harridan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Harridan);
const Varvva = L.marker([-90.94, 117.44], { icon: planetIcon }).bindTooltip("Varvva", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Varvva);
const Uba = L.marker([-89.66, 117.58], { icon: planetIcon }).bindTooltip("Uba", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Uba);
const Ubertica = L.marker([-90.02, 117.99], { icon: planetIcon }).bindTooltip("Ubertica", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ubertica);
const Dontamo = L.marker([-88.52, 118.16], { icon: planetIcon }).bindTooltip("Dontamo", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dontamo);
const Kareas = L.marker([-86.92, 118.59], { icon: planetIcon }).bindTooltip("Kareas", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kareas);
const Poressi = L.marker([-87.76, 118.59], { icon: planetIcon }).bindTooltip("Poressi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Poressi);
const Deadon = L.marker([-88.23, 118.80], { icon: planetIcon }).bindTooltip("Deadon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Deadon);
const Virkoi = L.marker([-88.98, 119.59], { icon: planetIcon }).bindTooltip("Virkoi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Virkoi);
const OrdMynock = L.marker([-86.89, 119.69], { icon: planetIcon }).bindTooltip("Ord Mynock", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdMynock);
const Wynkahthu = L.marker([-91.60, 119.81], { icon: planetIcon }).bindTooltip("Wynkahthu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Wynkahthu);
const Angrallia = L.marker([-87.17, 120.22], { icon: planetIcon }).bindTooltip("Angrallia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Angrallia);
const Kemla = L.marker([-88.40, 120.27], { icon: planetIcon }).bindTooltip("Kemla", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kemla);
const Domgrin = L.marker([-85.94, 120.75], { icon: planetIcon }).bindTooltip("Domgrin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Domgrin);
const Merikon = L.marker([-87.55, 121.17], { icon: planetIcon }).bindTooltip("Merikon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Merikon);
const JanFathal = L.marker([-86.34, 121.13], { icon: planetIcon }).bindTooltip("JanFathal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(JanFathal);
const Wistril = L.marker([-86.84, 121.55], { icon: planetIcon }).bindTooltip("Wistril", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Wistril);
const Elegasso = L.marker([-89.54, 121.62], { icon: planetIcon }).bindTooltip("Elegasso", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Elegasso);
const Urttha = L.marker([-85.84, 121.88], { icon: pltIconCaL }).bindTooltip("Urthha", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(UrthhaPopup, customOptions).addTo(map);
const Gonmore = L.marker([-88.30, 122.63], { icon: planetIcon }).bindTooltip("Gonmore", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gonmore);
const Yarille = L.marker([-85.91, 122.66], { icon: planetIcon }).bindTooltip("Yarille", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Yarille);
const Orinda = L.marker([-88.92, 122.96], { icon: planetIcon }).bindTooltip("Orinda", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Orinda);
const Tangar = L.marker([-87.77, 123.24], { icon: planetIcon }).bindTooltip("Tangar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tangar);
const Lonnaw = L.marker([-89.77, 123.34], { icon: planetIcon }).bindTooltip("Lonnaw", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lonnaw);
const Smarck = L.marker([-86.19, 123.62], { icon: planetIcon }).bindTooltip("Smarck", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Smarck);
const OrdCantrell = L.marker([-87.35, 123.71], { icon: planetIcon }).bindTooltip("Ord Cantrell", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(OrdCantrell);
const Obredaan = L.marker([-90.75, 123.78], { icon: planetIcon }).bindTooltip("Obredaan", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Obredaan);
const OrdTessebok = L.marker([-91.64, 124.09], { icon: planetIcon }).bindTooltip("Ord Tessebok", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdTessebok);
const Miro = L.marker([-88.13, 124.63], { icon: planetIcon }).bindTooltip("Miro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Miro);
const EntropianHive = L.marker([-90.66, 125.84], { icon: statonIcon }).bindTooltip("Entropian Hive*", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(EntropianHive);
const Osskorn = L.marker([-91.37, 125.95], { icon: planetIcon }).bindTooltip("Osskorn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Osskorn);
const PortHaven = L.marker([-85.98, 127.16], { icon: planetIcon }).bindTooltip("Port Haven", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(PortHaven);
const Drada = L.marker([-88.08, 127.22], { icon: planetIcon }).bindTooltip("Drada", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Drada);
const Trenchenovu = L.marker([-89.97, 126.28], { icon: planetIcon }).bindTooltip("Trenchenovu*", { permanent: true, direction: 'right', offset: [-2, -5], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Trenchenovu);
const Entana = L.marker([-86.62, 126.52], { icon: planetIcon }).bindTooltip("Entana", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Entana);
const Magagran = L.marker([-87.75, 126.86], { icon: planetIcon }).bindTooltip("Magagran", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Magagran);
const Kwannot = L.marker([-91.39, 127.78], { icon: planetIcon }).bindTooltip("Kwannot", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kwannot);
const Lenico = L.marker([-87.97, 128.25], { icon: planetIcon }).bindTooltip("Lenico", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lenico);
const Phaeda = L.marker([-87.86, 128.34], { icon: planetIcon }).bindTooltip("Phaeda", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Phaeda);
const Tel = L.marker([-88.86, 128.38], { icon: planetIcon }).bindTooltip("Tel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tel);
const Entuur = L.marker([-90.37, 128.91], { icon: planetIcon }).bindTooltip("Entuur", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Entuur);
const Ebra = L.marker([-89.95, 129.16], { icon: planetIcon }).bindTooltip("Ebra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ebra);
const Urce = L.marker([-91.56, 129.52], { icon: planetIcon }).bindTooltip("Urce", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Urce);
const Harkrova = L.marker([-86.89, 129.59], { icon: planetIcon }).bindTooltip("Harkrova", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Harkrova);
const FitcaPr = L.marker([-91.22, 130.09], { icon: planetIcon }).bindTooltip("Fitca Prime", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(FitcaPr);
const Janguine = L.marker([-87.80, 130.22], { icon: planetIcon }).bindTooltip("Janguine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Janguine);
const Trinta = L.marker([-89.03, 130.28], { icon: planetIcon }).bindTooltip("Trinta", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Trinta);
const LesserPloorio = L.marker([-91.70, 130.52], { icon: clustrIcon }).bindTooltip("Lesser Plooriod Cl.", { permanent: true, direction: 'left', offset: [2, 5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(LesserPloorio);
const Arthon = L.marker([-90.95, 130.94], { icon: planetIcon }).bindTooltip("Arthon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Arthon);
const Burna = L.marker([-85.78, 131.08], { icon: planetIcon }).bindTooltip("Burna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Burna);
const Idolia = L.marker([-88.45, 131.31], { icon: planetIcon }).bindTooltip("Idolia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Idolia);
const Vessitoar = L.marker([-91.66, 131.41], { icon: planetIcon }).bindTooltip("Vessitoar", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vessitoar);
const Toskhowwl = L.marker([-89.95, 131.44], { icon: planetIcon }).bindTooltip("Toskhowwl", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Toskhowwl);
const Ottethan = L.marker([-89.61, 131.48], { icon: planetIcon }).bindTooltip("Ottethan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ottethan);
const Orocco = L.marker([-91.39, 131.69], { icon: planetIcon }).bindTooltip("Orocco", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Orocco);
const Essien = L.marker([-87.77, 131.70], { icon: planetIcon }).bindTooltip("Essien", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Essien);
const Viridia = L.marker([-88.09, 131.91], { icon: planetIcon }).bindTooltip("Viridia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Viridia);
const Wilpiet = L.marker([-87.23, 131.94], { icon: planetIcon }).bindTooltip("Wilpiet", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Wilpiet);
const Ithor = L.marker([-90.78, 131.78], { icon: pltIconCaL }).bindTooltip("Ithor", { permanent: true, direction: 'right', offset: [2, -1], className: 'leaflet-tooltip    ' }).bindPopup(IthorPopup, customOptions).addTo(map);
const Noonar = L.marker([-89.69, 132.56], { icon: planetIcon }).bindTooltip("Noonar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Noonar);
const Doan = L.marker([-89.08, 132.66], { icon: planetIcon }).bindTooltip("Doan", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Doan);
const Rimbaux = L.marker([-89.19, 132.78], { icon: planetIcon }).bindTooltip("Rimbaux", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rimbaux);
const Patch = L.marker([-88.17, 133.11], { icon: planetIcon }).bindTooltip("Patch", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Patch);
const BazarreSta = L.marker([-88.25, 133.22], { icon: statonIcon }).bindTooltip("Bazarre Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BazarreSta);
const Bazaar = L.marker([-88.39, 133.16], { icon: planetIcon }).bindTooltip("Bazaar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bazaar);
const Mackar = L.marker([-90.89, 133.22], { icon: planetIcon }).bindTooltip("Mackar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mackar);
const Cademimu = L.marker([-87.47, 133.41], { icon: pltIconLeg }).bindTooltip("Cademimu", { permanent: true, direction: 'right', offset: [2, -2], className: 'leaflet-tooltip    ' }).bindPopup(CademimuPopup, customOptions).addTo(map);
const Movris = L.marker([-90.13, 133.47], { icon: planetIcon }).bindTooltip("Movris", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Movris);
const PaarinMin = L.marker([-86.95, 133.53], { icon: planetIcon }).bindTooltip("Paarin Minor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PaarinMin);
const Oznek = L.marker([-86.23, 133.61], { icon: planetIcon }).bindTooltip("Oznek", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Oznek);
const Hitaka = L.marker([-86.45, 134.08], { icon: planetIcon }).bindTooltip("Hitaka", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Hitaka);
const Oricho = L.marker([-87.80, 134.30], { icon: planetIcon }).bindTooltip("Oricho", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Oricho);
const Polus = L.marker([-88.61, 134.39], { icon: planetIcon }).bindTooltip("Polus", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Polus);
const Baskarn = L.marker([-89.45, 134.39], { icon: planetIcon }).bindTooltip("Baskarn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Baskarn);
const Hewett = L.marker([-91.56, 134.64], { icon: planetIcon }).bindTooltip("Hewett", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Hewett);
const Tikath = L.marker([-90.53, 134.89], { icon: planetIcon }).bindTooltip("Tikath", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tikath);
const Veronia = L.marker([-88.33, 134.97], { icon: planetIcon }).bindTooltip("Veronia", { permanent: true, direction: 'right', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Veronia);
const Gandan = L.marker([-86.05, 135.61], { icon: planetIcon }).bindTooltip("Gandan", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gandan);
const Tastiged = L.marker([-87.02, 135.67], { icon: planetIcon }).bindTooltip("Tastiged", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tastiged);
const RialKroon = L.marker([-90.08, 135.95], { icon: planetIcon }).bindTooltip("Rial Kroon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(RialKroon);
const Balanor = L.marker([-90.75, 136.20], { icon: planetIcon }).bindTooltip("Balanor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Balanor);
const ErKit = L.marker([-89.98, 136.20], { icon: planetIcon }).bindTooltip("Er'Kit", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ErKit);
const BorgoPr = L.marker([-87.37, 136.08], { icon: planetIcon }).bindTooltip("Borgo Prime", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BorgoPr);
const Pleida = L.marker([-88.89, 136.39], { icon: planetIcon }).bindTooltip("Pleida", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pleida);
const Homana = L.marker([-91.89, 136.51], { icon: planetIcon }).bindTooltip("Homana", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Homana);
const Gobindi = L.marker([-89.53, 136.70], { icon: planetIcon }).bindTooltip("Gobindi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gobindi);
const Azura = L.marker([-88.36, 136.82], { icon: planetIcon }).bindTooltip("Azura", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Azura);
const Zongorlu = L.marker([-91.52, 136.84], { icon: planetIcon }).bindTooltip("Zongorlu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Zongorlu);
const Rol = L.marker([-90.17, 137.05], { icon: planetIcon }).bindTooltip("Rol", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rol);
const Sirdar = L.marker([-86.28, 137.64], { icon: planetIcon }).bindTooltip("Sirdar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sirdar);
const Targarth = L.marker([-88.14, 137.72], { icon: planetIcon }).bindTooltip("Targarth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Targarth);
const OrdSigatt = L.marker([-91.73, 137.83], { icon: planetIcon }).bindTooltip("Ord Sigatt", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdSigatt);
const Sintheti = L.marker([-89.86, 138.14], { icon: planetIcon }).bindTooltip("Sintheti", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sintheti);
const Vesla = L.marker([-86.67, 139.00], { icon: planetIcon }).bindTooltip("Vesla", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vesla);
const Guuko = L.marker([-89.20, 139.00], { icon: planetIcon }).bindTooltip("Guuko", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Guuko);
const Revery = L.marker([-90.61, 139.02], { icon: planetIcon }).bindTooltip("Revery", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Revery);
const Delderaan = L.marker([-91.56, 139.02], { icon: planetIcon }).bindTooltip("Delderaan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Delderaan);
const Storinal = L.marker([-90.55, 139.30], { icon: planetIcon }).bindTooltip("Storinal", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Storinal);
const Corosia = L.marker([-85.84, 139.44], { icon: planetIcon }).bindTooltip("Corosia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Corosia);
const Tangrada = L.marker([-91.25, 139.91], { icon: planetIcon }).bindTooltip("Tangrada", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tangrada);
const Rentaxius = L.marker([-88.23, 140.13], { icon: planetIcon }).bindTooltip("Rentaxius", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rentaxius);
const Jiruus = L.marker([-91.95, 140.14], { icon: planetIcon }).bindTooltip("Jiruus*", { permanent: true, direction: 'right', offset: [-1, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jiruus);
const OridolCl = L.marker([-91.58, 140.44], { icon: clustrIcon }).bindTooltip("Oridol Cl.*", { permanent: true, direction: 'right', offset: [2, 1], className: 'leaflet-tooltip    ' }); zoom04.addLayer(OridolCl);
const Harrikos = L.marker([-91.41, 140.63], { icon: planetIcon }).bindTooltip("Harrikos*", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Harrikos);
const Kurluvion = L.marker([-88.59, 140.95], { icon: planetIcon }).bindTooltip("Kurluvion", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kurluvion);
const GWenee = L.marker([-90.20, 140.97], { icon: planetIcon }).bindTooltip("G'wenee", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(GWenee);
const Borcorash = L.marker([-89.76, 141.38], { icon: planetIcon }).bindTooltip("Borcorash", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Borcorash);
const Prolifera = L.marker([-87.34, 141.48], { icon: planetIcon }).bindTooltip("Prolifera", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Prolifera);
const Barpine = L.marker([-91.81, 141.52], { icon: planetIcon }).bindTooltip("Barpine", { permanent: true, direction: 'right', offset: [0, 1], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Barpine);
const Skangravi = L.marker([-90.36, 141.57], { icon: planetIcon }).bindTooltip("Skangravi", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Skangravi);
const Jussafet = L.marker([-90.08, 141.63], { icon: planetIcon }).bindTooltip("Jussafet", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jussafet);
const IeTikkaht = L.marker([-85.78, 141.81], { icon: planetIcon }).bindTooltip("Ie-Tikkaht", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(IeTikkaht);
const Cathar = L.marker([-87.25, 143.38], { icon: planetIcon }).bindTooltip("Cathar", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Cathar);
const Marcellus = L.marker([-91.69, 143.42], { icon: planetIcon }).bindTooltip("Marcellus", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Marcellus);
const Halmad = L.marker([-89.78, 143.47], { icon: planetIcon }).bindTooltip("Halmad", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Halmad);
const MarcellusN = L.marker([-91.62, 143.56], { icon: nebIconBlk }).bindTooltip("Marcellus N.", { permanent: true, direction: 'right', offset: [-2, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(MarcellusN);
const Vnex = L.marker([-86.08, 143.73], { icon: planetIcon }).bindTooltip("Vnex", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vnex);
const Vahaba = L.marker([-89.86, 143.70], { icon: planetIcon }).bindTooltip("Vahaba", { permanent: true, direction: 'right', offset: [-3, -6], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vahaba);
const Selaggis = L.marker([-90.00, 144.11], { icon: planetIcon }).bindTooltip("Selaggis", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Selaggis);
const WolCabassh = L.marker([-89.08, 144.35], { icon: planetIcon }).bindTooltip("Wol Cabassh", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(WolCabassh);
const Thomquizzar = L.marker([-91.00, 144.47], { icon: planetIcon }).bindTooltip("Thomquizzar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Thomquizzar);
const Quelii = L.marker([-85.75, 144.56], { icon: planetIcon }).bindTooltip("Quelii", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Quelii);
const Romik = L.marker([-86.56, 144.86], { icon: planetIcon }).bindTooltip("Romik", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Romik);
const Paecia = L.marker([-87.55, 145.03], { icon: planetIcon }).bindTooltip("Paecia", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Paecia);
const Amorris = L.marker([-89.36, 145.05], { icon: planetIcon }).bindTooltip("Amorris", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Amorris);
const Morseer = L.marker([-86.14, 145.13], { icon: planetIcon }).bindTooltip("Morseer", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Morseer);
const Varn = L.marker([-87.42, 145.23], { icon: planetIcon }).bindTooltip("Varn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Varn);
const Cedre = L.marker([-88.11, 145.20], { icon: planetIcon }).bindTooltip("Cedre", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cedre);
const Wrodi = L.marker([-89.66, 145.23], { icon: planetIcon }).bindTooltip("Wrodi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Wrodi);
const Dathomir = L.marker([-88.00, 145.31], { icon: pltIconCaL }).bindTooltip("Dathomir", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(DathomirPopup, customOptions).addTo(map);
const Vanquo = L.marker([-91.70, 145.36], { icon: planetIcon }).bindTooltip("Vanquo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Vanquo);
const PravenPr = L.marker([-89.14, 145.45], { icon: planetIcon }).bindTooltip("Praven Prime", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(PravenPr);
const Fere = L.marker([-87.03, 145.53], { icon: planetIcon }).bindTooltip("Fere", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fere);
const Bandomeer = L.marker([-90.70, 145.73], { icon: planetIcon }).bindTooltip("Bandomeer", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Bandomeer);
const Corstris = L.marker([-86.67, 145.73], { icon: planetIcon }).bindTooltip("Corstris", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Corstris);
const Gorm = L.marker([-89.19, 145.84], { icon: planetIcon }).bindTooltip("Gorm", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gorm);
const Ova = L.marker([-87.26, 145.94], { icon: planetIcon }).bindTooltip("Ova", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ova);
const PilDiller = L.marker([-88.45, 146.22], { icon: planetIcon }).bindTooltip("Pil Diller", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PilDiller);
const OrdCestus = L.marker([-86.15, 146.23], { icon: planetIcon }).bindTooltip("Ord Cestus", { permanent: true, direction: 'right', offset: [-2, -8], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdCestus);
const Harloen = L.marker([-89.98, 146.30], { icon: planetIcon }).bindTooltip("Harloen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Harloen);
const Flyntaria = L.marker([-86.94, 146.38], { icon: planetIcon }).bindTooltip("Flyntaria", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Flyntaria);
const Lorardia = L.marker([-86.34, 146.52], { icon: planetIcon }).bindTooltip("Lorardia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lorardia);
const CrombachN = L.marker([-89.34, 146.36], { icon: nebIconBlk }).bindTooltip("Crombach N.", { permanent: true, direction: 'right', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(CrombachN);
const Orimanther = L.marker([-88.34, 146.48], { icon: planetIcon }).bindTooltip("Orimanther", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Orimanther);
const Drackmar = L.marker([-87.39, 146.67], { icon: planetIcon }).bindTooltip("Drackmar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Drackmar);
const Irmenu = L.marker([-89.62, 146.81], { icon: planetIcon }).bindTooltip("Irmenu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Irmenu);
const Rirsack = L.marker([-90.92, 146.98], { icon: planetIcon }).bindTooltip("Rirsack", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rirsack);
const Pedd = L.marker([-86.19, 147.14], { icon: planetIcon }).bindTooltip("Pedd", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Pedd);
const Katraasii = L.marker([-91.25, 147.27], { icon: planetIcon }).bindTooltip("Katraasii", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Katraasii);
const Botajef = L.marker([-88.75, 147.30], { icon: planetIcon }).bindTooltip("Botajef", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Botajef);
const Ventrux = L.marker([-87.83, 147.34], { icon: planetIcon }).bindTooltip("Ventrux", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ventrux);
const Moseum = L.marker([-87.25, 148.00], { icon: planetIcon }).bindTooltip("Moseum", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Moseum);
const Hijado = L.marker([-87.61, 148.14], { icon: planetIcon }).bindTooltip("Hijado", { permanent: true, direction: 'right', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hijado);
const Shadren = L.marker([-89.19, 148.16], { icon: planetIcon }).bindTooltip("Shadren", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Shadren);
const Doli = L.marker([-86.72, 148.25], { icon: planetIcon }).bindTooltip("Doli", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Doli);
const Tierell = L.marker([-87.20, 148.36], { icon: planetIcon }).bindTooltip("Tierell", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tierell);
const Borkeen = L.marker([-91.77, 148.61], { icon: planetIcon }).bindTooltip("Borkeen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Borkeen);
const Druulgotha = L.marker([-88.17, 148.64], { icon: planetIcon }).bindTooltip("Druulgotha", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Druulgotha);
const Qualtrough = L.marker([-88.69, 148.86], { icon: planetIcon }).bindTooltip("Qualtrough", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Qualtrough);
const Celanon = L.marker([-86.34, 148.94], { icon: planetIcon }).bindTooltip("Celanon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Celanon);
const NewBornalex = L.marker([-90.06, 148.94], { icon: planetIcon }).bindTooltip("New Bornalex", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NewBornalex);
const Sheris = L.marker([-90.23, 148.97], { icon: planetIcon }).bindTooltip("Sheris", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sheris);
const Belsmuth = L.marker([-90.39, 148.99], { icon: planetIcon }).bindTooltip("Belsmuth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Belsmuth);
const BorgoPr2 = L.marker([-85.95, 149.22], { icon: planetIcon }).bindTooltip("Borgo Prime (2)?", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BorgoPr2);
const Quyste = L.marker([-86.80, 149.34], { icon: planetIcon }).bindTooltip("Quyste", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Quyste);
const Narigus = L.marker([-89.41, 149.63], { icon: planetIcon }).bindTooltip("Narigus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Narigus);
const Galltine = L.marker([-87.26, 149.94], { icon: planetIcon }).bindTooltip("Galltine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Galltine);
const Alba = L.marker([-92.05, 149.94], { icon: planetIcon }).bindTooltip("Alba", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Alba);
const Landor = L.marker([-86.14, 150.05], { icon: planetIcon }).bindTooltip("Landor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Landor);
const FerrousAurora = L.marker([-86.45, 150.06], { icon: nebIconBlk }).bindTooltip("Ferrous Aurora N.", { permanent: true, direction: 'right', offset: [-2, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(FerrousAurora);
const MephaAsPr = L.marker([-90.72, 150.30], { icon: planetIcon }).bindTooltip("Mepha'as Prime", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(MephaAsPr);
const Katalia = L.marker([-87.97, 150.47], { icon: planetIcon }).bindTooltip("Katalia", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Katalia);
const Solaest = L.marker([-91.58, 150.56], { icon: planetIcon }).bindTooltip("Solaest", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Solaest);
const RaydoniaMaj = L.marker([-90.06, 150.67], { icon: planetIcon }).bindTooltip("Raydonia Major", { permanent: true, direction: 'right', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom04.addLayer(RaydoniaMaj);
const Uhltenden = L.marker([-89.56, 150.91], { icon: planetIcon }).bindTooltip("Uhltenden", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Uhltenden);
const TertiaryFeswe = L.marker([-86.03, 151.17], { icon: planetIcon }).bindTooltip("Tertiary Feswe", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TertiaryFeswe);
const Traptoforia = L.marker([-90.27, 151.38], { icon: planetIcon }).bindTooltip("Traptoforia", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Traptoforia);
const Syndaar = L.marker([-88.62, 151.47], { icon: planetIcon }).bindTooltip("SYNDAAR", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Syndaar);
const Azna = L.marker([-91.92, 151.52], { icon: planetIcon }).bindTooltip("Azna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Azna);
const Hettsk = L.marker([-91.25, 151.55], { icon: planetIcon }).bindTooltip("Hettsk", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hettsk);
const Kravos = L.marker([-88.06, 151.86], { icon: planetIcon }).bindTooltip("Kravos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kravos);
const Presbalin = L.marker([-87.73, 151.91], { icon: planetIcon }).bindTooltip("Presbalin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Presbalin);
const Selitan = L.marker([-86.37, 151.97], { icon: planetIcon }).bindTooltip("Selitan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Selitan);
const Dronseen = L.marker([-90.38, 152.19], { icon: planetIcon }).bindTooltip("Dronseen", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dronseen);
const DenariiSta = L.marker([-87.02, 152.25], { icon: statonIcon }).bindTooltip("Denarii Sta.", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(DenariiSta);
const Phatrong = L.marker([-89.25, 152.28], { icon: planetIcon }).bindTooltip("Phatrong", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Phatrong);
const Phindar = L.marker([-92.00, 152.45], { icon: planetIcon }).bindTooltip("Phindar", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Phindar);
const Algarra = L.marker([-88.92, 152.87], { icon: planetIcon }).bindTooltip("Algarra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Algarra);
const FarIndosa = L.marker([-88.39, 152.87], { icon: planetIcon }).bindTooltip("Far Indosa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(FarIndosa);
const Pinoora = L.marker([-86.77, 152.94], { icon: planetIcon }).bindTooltip("Pinoora", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Pinoora);
const DenariiN = L.marker([-87.19, 153.09], { icon: nebIconBlk }).bindTooltip("Denarii N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(DenariiN);
const ZonaMiki = L.marker([-91.14, 153.06], { icon: planetIcon }).bindTooltip("Zona Miki", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ZonaMiki);
const Bakkah = L.marker([-90.83, 153.53], { icon: planetIcon }).bindTooltip("Bakkah", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bakkah);
const NearIndosa = L.marker([-87.64, 153.59], { icon: planetIcon }).bindTooltip("Near Indosa", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NearIndosa);
const Malrev = L.marker([-91.59, 153.81], { icon: planetIcon }).bindTooltip("Malrev (-)", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Malrev);
const Trinovat = L.marker([-87.80, 154.42], { icon: planetIcon }).bindTooltip("Trinovat", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Trinovat);
const Yavin4 = L.marker([-85.70, 154.62], { icon: pltIconCaL2 }).bindTooltip("Yavin", { permanent: true, direction: 'right', offset: [2, -1], className: 'leaflet-tooltip-mov' }).bindPopup(Yavin4Popup, customOptions).addTo(map);
const Torque = L.marker([-86.87, 154.81], { icon: planetIcon }).bindTooltip("TORQUE", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Torque);
const Vispil = L.marker([-89.99, 154.84], { icon: planetIcon }).bindTooltip("Vispil", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vispil);
const Keros = L.marker([-91.67, 154.97], { icon: planetIcon }).bindTooltip("Keros", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Keros);
const DurgensStar = L.marker([-88.27, 155.48], { icon: planetIcon }).bindTooltip("Durgen's Star", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(DurgensStar);
const Edonaaris = L.marker([-91.73, 156.09], { icon: planetIcon }).bindTooltip("Edonaaris", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Edonaaris);
const Jovan = L.marker([-86.98, 156.11], { icon: planetIcon }).bindTooltip("Jovan", { permanent: true, direction: 'right', offset: [-2, 6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jovan);
const Xochtl = L.marker([-88.05, 156.48], { icon: planetIcon }).bindTooltip("Xochtl", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Xochtl);
const Vaal = L.marker([-85.62, 156.53], { icon: planetIcon }).bindTooltip("Vaal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vaal);
const Povanaria = L.marker([-88.53, 156.81], { icon: planetIcon }).bindTooltip("Povanaria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Povanaria);
const Altair = L.marker([-89.31, 157.11], { icon: planetIcon }).bindTooltip("Altair", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Altair);
const Bronsoon = L.marker([-87.84, 157.16], { icon: planetIcon }).bindTooltip("Bronsoon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bronsoon);
const Althir = L.marker([-91.39, 157.22], { icon: planetIcon }).bindTooltip("Althir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Althir);
const ValluskCl = L.marker([-86.74, 157.41], { icon: clustrIcon }).bindTooltip("Vallusk Cl.", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ValluskCl);
const Gulvitch = L.marker([-87.62, 157.70], { icon: planetIcon }).bindTooltip("Gulvitch", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gulvitch);
const Arkuda = L.marker([-87.36, 157.89], { icon: planetIcon }).bindTooltip("Arkuda", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Arkuda);
const Nadhe = L.marker([-90.50, 158.08], { icon: planetIcon }).bindTooltip("Nadhe", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nadhe);
const Maridun = L.marker([-88.45, 158.14], { icon: planetIcon }).bindTooltip("Maridun", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Maridun);
const Korphir = L.marker([-87.70, 158.83], { icon: planetIcon }).bindTooltip("Korphir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Korphir);
const Tenara = L.marker([-88.05, 159.09], { icon: planetIcon }).bindTooltip("Tenara", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tenara);
const TheCometwash = L.marker([-87.05, 159.11], { icon: planetIcon }).bindTooltip("The Cometwash", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(TheCometwash);
const Usta = L.marker([-86.11, 159.38], { icon: planetIcon }).bindTooltip("Usta", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Usta);
const Barison = L.marker([-85.72, 159.86], { icon: planetIcon }).bindTooltip("Barison", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Barison);
const FarasBelt = L.marker([-89.27, 160.06], { icon: planetIcon }).bindTooltip("Fara's Belt", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(FarasBelt);
const Divac = L.marker([-91.53, 160.09], { icon: planetIcon }).bindTooltip("Divac", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Divac);
const Vjun = L.marker([-91.23, 160.50], { icon: planetIcon }).bindTooltip("Vjun", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Vjun);
const Kalishik = L.marker([-86.11, 160.58], { icon: planetIcon }).bindTooltip("Kalishik", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kalishik);
const Chirrion = L.marker([-88.72, 160.73], { icon: planetIcon }).bindTooltip("Chirrion", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Chirrion);
const Capella = L.marker([-87.45, 160.92], { icon: planetIcon }).bindTooltip("Capella", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Capella);
const Arda = L.marker([-86.76, 160.98], { icon: planetIcon }).bindTooltip("Arda (Ethain)", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Arda);
const LittleCapella = L.marker([-88.05, 161.20], { icon: planetIcon }).bindTooltip("Little Capella", { permanent: true, direction: 'right', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(LittleCapella);
const Lucazec = L.marker([-90.27, 161.31], { icon: planetIcon }).bindTooltip("Lucazec", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Lucazec);
const Noryath = L.marker([-90.92, 161.39], { icon: planetIcon }).bindTooltip("Noryath", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Noryath);
const Quanducial = L.marker([-85.76, 161.44], { icon: planetIcon }).bindTooltip("Quanducial", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Quanducial);
const Randorn = L.marker([-88.08, 162.22], { icon: planetIcon }).bindTooltip("Randorn", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Randorn);
const Feldwes = L.marker([-86.73, 162.39], { icon: planetIcon }).bindTooltip("Feldwes", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Feldwes);
const Gormen = L.marker([-90.67, 162.45], { icon: planetIcon }).bindTooltip("Gormen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gormen);
const Paklan = L.marker([-91.81, 162.56], { icon: planetIcon }).bindTooltip("Paklan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Paklan);
const Pygorix = L.marker([-86.51, 162.94], { icon: planetIcon }).bindTooltip("Pygorix", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pygorix);
const KarstensWorld = L.marker([-87.01, 163.12], { icon: planetIcon }).bindTooltip("Karsten's World", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(KarstensWorld);
const Quell = L.marker([-89.97, 163.25], { icon: planetIcon }).bindTooltip("Quell", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Quell);
const BelderonePris = L.marker([-88.66, 163.34], { icon: statonIcon }).bindTooltip("Belderone Sector Prison Asteroid", { permanent: true, direction: 'left', offset: [3, -6], className: 'leaflet-tooltip' }); zoom06.addLayer(BelderonePris);
const Spintir = L.marker([-86.39, 163.52], { icon: planetIcon }).bindTooltip("Spintir", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Spintir);
const Helix = L.marker([-91.44, 163.91], { icon: planetIcon }).bindTooltip("Helix", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Helix);
const Mazhar = L.marker([-86.56, 163.94], { icon: planetIcon }).bindTooltip("Mazhar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Mazhar);
const Ychthyton = L.marker([-88.38, 163.95], { icon: planetIcon }).bindTooltip("Ychthyton", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ychthyton);
const Kodai = L.marker([-87.14, 164.30], { icon: planetIcon }).bindTooltip("Kodai", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kodai);
const Antamont = L.marker([-91.13, 164.34], { icon: planetIcon }).bindTooltip("Antamont", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Antamont);
const Seftek = L.marker([-89.53, 164.69], { icon: planetIcon }).bindTooltip("Seftek", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Seftek);
const Vorzyd = L.marker([-89.25, 165.00], { icon: planetIcon }).bindTooltip("Vorzyd", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vorzyd);
const Kilmaulsias = L.marker([-89.00, 165.05], { icon: planetIcon }).bindTooltip("Kilmaulsias", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kilmaulsias);
const Paigu = L.marker([-89.41, 165.11], { icon: planetIcon }).bindTooltip("Paigu", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Paigu);
const NDian = L.marker([-86.56, 165.35], { icon: planetIcon }).bindTooltip("N'dian", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NDian);
const Hraki = L.marker([-89.22, 165.36], { icon: planetIcon }).bindTooltip("Hraki", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hraki);
const OrdMarsax = L.marker([-88.96, 165.63], { icon: planetIcon }).bindTooltip("Ord Marsax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdMarsax);
const Keyorin = L.marker([-89.68, 165.86], { icon: planetIcon }).bindTooltip("Keyorin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Keyorin);
const GraalDiin = L.marker([-86.89, 166.00], { icon: planetIcon }).bindTooltip("Graal'diin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(GraalDiin);
const TillChorios = L.marker([-91.57, 166.03], { icon: planetIcon }).bindTooltip("Till Chorios", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(TillChorios);
const NamChorios = L.marker([-91.82, 166.50], { icon: planetIcon }).bindTooltip("Nam Chorios", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NamChorios);
const Bragkis = L.marker([-88.00, 166.52], { icon: planetIcon }).bindTooltip("Bragkis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bragkis);
const Galsol = L.marker([-89.32, 166.89], { icon: planetIcon }).bindTooltip("Galsol", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Galsol);
const Auratera = L.marker([-89.78, 167.83], { icon: planetIcon }).bindTooltip("Auratera", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Auratera);
const Nyemari = L.marker([-91.60, 167.88], { icon: planetIcon }).bindTooltip("Nyemari", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nyemari);
const RhenVar = L.marker([-88.63, 167.91], { icon: planetIcon }).bindTooltip("Rhen Var", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(RhenVar);
const Farbog = L.marker([-90.88, 167.94], { icon: planetIcon }).bindTooltip("Farbog", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Farbog);
const Draukyze = L.marker([-88.67, 168.35], { icon: planetIcon }).bindTooltip("Draukyze", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Draukyze);
const Tandankin = L.marker([-85.92, 168.50], { icon: planetIcon }).bindTooltip("Tandankin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tandankin);
const Tiems = L.marker([-89.39, 168.70], { icon: planetIcon }).bindTooltip("Tiems", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tiems);
const FalangMin = L.marker([-87.73, 168.84], { icon: planetIcon }).bindTooltip("Falang Minor", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(FalangMin);
const LolaSayu = L.marker([-90.17, 168.84], { icon: planetIcon }).bindTooltip("Lola Sayu", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(LolaSayu);
const Columex = L.marker([-90.33, 168.87], { icon: planetIcon }).bindTooltip("Columex (Nardolin)", { permanent: true, direction: 'left', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Columex);
const Yablari = L.marker([-90.52, 168.89], { icon: planetIcon }).bindTooltip("Yablari", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Yablari);
const Alzar = L.marker([-89.12, 168.92], { icon: planetIcon }).bindTooltip("Alzar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Alzar);
const Belderone = L.marker([-91.35, 168.92], { icon: planetIcon }).bindTooltip("Belderone (Vartholium)", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Belderone);
const Mossak = L.marker([-87.58, 169.00], { icon: planetIcon }).bindTooltip("Mossak", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Mossak);
const Felucia = L.marker([-86.97, 169.16], { icon: pltIconCaL2 }).bindTooltip("Felucia (Galush)", { permanent: true, direction: 'right', offset: [2, 1], className: 'leaflet-tooltip-mov' }).bindPopup(FeluciaPopup, customOptions).addTo(map);
const Galidraan = L.marker([-88.25, 169.20], { icon: planetIcon }).bindTooltip("Galidraan", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Galidraan);
const Nespis = L.marker([-91.99, 169.52], { icon: planetIcon }).bindTooltip("Nespis", { permanent: true, direction: 'left', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Nespis);
const Tharkos = L.marker([-86.17, 169.59], { icon: planetIcon }).bindTooltip("Tharkos", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tharkos);
const Sooma = L.marker([-87.83, 169.73], { icon: planetIcon }).bindTooltip("Sooma", { permanent: true, direction: 'right', offset: [0, 7], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sooma);
const Thanium = L.marker([-86.37, 169.91], { icon: planetIcon }).bindTooltip("Thanium", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thanium);
const Kadril = L.marker([-85.75, 169.94], { icon: planetIcon }).bindTooltip("Kadril", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kadril);
const Phoebus = L.marker([-87.33, 169.98], { icon: planetIcon }).bindTooltip("Phoebus", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Phoebus);
const Sikkem = L.marker([-88.91, 170.09], { icon: planetIcon }).bindTooltip("Sikkem", { permanent: true, direction: 'left', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sikkem);
const CronDrift = L.marker([-91.10, 170.28], { icon: pheIconBlk }).bindTooltip("Cron Drift", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(CronDrift);
const Elerion = L.marker([-86.77, 170.39], { icon: planetIcon }).bindTooltip("Elerion", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Elerion);
const Ossus = L.marker([-90.88, 170.37], { icon: pltIconCaL }).bindTooltip("Ossus (Idux)", { permanent: true, direction: 'right', offset: [2, -4], className: 'leaflet-tooltip    ' }).bindPopup(OssusPopup, customOptions).addTo(map);
const Arcan = L.marker([-87.77, 170.45], { icon: planetIcon }).bindTooltip("Arcan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Arcan);
const ForanTutha = L.marker([-90.05, 170.51], { icon: planetIcon }).bindTooltip("Foran Tutha", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(ForanTutha);
const Shaltin = L.marker([-86.52, 170.66], { icon: planetIcon }).bindTooltip("Shaltin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Shaltin);
const Lianna = L.marker([-87.47, 170.64], { icon: planetIcon }).bindTooltip("Lianna", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lianna);
const Janilis = L.marker([-88.52, 170.65], { icon: planetIcon }).bindTooltip("Janilis", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Janilis);
const Jhantoria = L.marker([-86.23, 170.97], { icon: planetIcon }).bindTooltip("Jhantoria", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jhantoria);
const Chandaar = L.marker([-88.91, 171.02], { icon: planetIcon }).bindTooltip("Chandaar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Chandaar);
const Oor = L.marker([-89.36, 171.13], { icon: planetIcon }).bindTooltip("Oor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Oor);
const Barseg = L.marker([-86.78, 171.14], { icon: planetIcon }).bindTooltip("Barseg", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Barseg);
const Galdria = L.marker([-89.60, 171.17], { icon: planetIcon }).bindTooltip("Galdria", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Galdria);
const Lorrad = L.marker([-86.45, 171.36], { icon: planetIcon }).bindTooltip("Lorrad", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lorrad);
const Spinax = L.marker([-87.81, 171.48], { icon: planetIcon }).bindTooltip("Spinax", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Spinax);
const Barancar = L.marker([-89.56, 171.50], { icon: planetIcon }).bindTooltip("Barancar", { permanent: true, direction: 'right', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Barancar);
const Chashima = L.marker([-91.13, 171.81], { icon: planetIcon }).bindTooltip("Chashima", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Chashima);
const Desevro = L.marker([-85.70, 171.89], { icon: planetIcon }).bindTooltip("Desevro", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Desevro);
const Soruus = L.marker([-89.67, 171.94], { icon: planetIcon }).bindTooltip("Soruus", { permanent: true, direction: 'right', offset: [-1, 8], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Soruus);
const Xifal = L.marker([-87.05, 171.98], { icon: planetIcon }).bindTooltip("Xifal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Xifal);
const Fial = L.marker([-91.35, 172.00], { icon: planetIcon }).bindTooltip("Fial", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Fial);
const Cadinth = L.marker([-88.11, 172.28], { icon: planetIcon }).bindTooltip("Cadinth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cadinth);
const Pasmin = L.marker([-89.61, 172.41], { icon: planetIcon }).bindTooltip("Pasmin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Pasmin);
const Murkhana = L.marker([-90.33, 172.52], { icon: planetIcon }).bindTooltip("Murkhana", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Murkhana);
const Kismaano = L.marker([-88.85, 172.70], { icon: planetIcon }).bindTooltip("Kismaano", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kismaano);
const Omman = L.marker([-85.67, 172.86], { icon: planetIcon }).bindTooltip("Omman", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Omman);
const Amarin = L.marker([-86.58, 172.86], { icon: planetIcon }).bindTooltip("Amarin", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Amarin);
const Gadon = L.marker([-89.10, 172.98], { icon: planetIcon }).bindTooltip("Gadon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gadon);
const Weytta = L.marker([-90.77, 173.11], { icon: planetIcon }).bindTooltip("Weytta", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Weytta);
const Desargorr = L.marker([-87.70, 173.16], { icon: planetIcon }).bindTooltip("Desargorr", { permanent: true, direction: 'left', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Desargorr);
const Embaril = L.marker([-87.99, 173.23], { icon: planetIcon }).bindTooltip("Embaril", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Embaril);
const Arramanx = L.marker([-89.60, 173.25], { icon: planetIcon }).bindTooltip("Arramanx", { permanent: true, direction: 'right', offset: [-4, 8], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Arramanx);
const Corlax = L.marker([-86.77, 173.39], { icon: planetIcon }).bindTooltip("Corlax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Corlax);
const Duinarbulon = L.marker([-89.50, 173.72], { icon: planetIcon }).bindTooltip("Duinarbulon", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Duinarbulon);
const Voss = L.marker([-87.74, 174.11], { icon: planetIcon }).bindTooltip("Voss", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Voss);
const Abraxin = L.marker([-85.84, 174.34], { icon: planetIcon }).bindTooltip("Abraxin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Abraxin);
const Jaminere = L.marker([-87.41, 174.55], { icon: planetIcon }).bindTooltip("JAMINERE", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jaminere);
const Derellium = L.marker([-89.20, 174.80], { icon: planetIcon }).bindTooltip("Derellium", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Derellium);
const Panna = L.marker([-88.58, 175.09], { icon: planetIcon }).bindTooltip("Panna", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Panna);
const Dravione = L.marker([-86.89, 175.14], { icon: planetIcon }).bindTooltip("Dravione", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dravione);
const IndrexuSpiral = L.marker([-86.42, 175.36], { icon: nebIconBlk }).bindTooltip("Indrexu Spiral", { permanent: true, direction: 'right', offset: [-2, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(IndrexuSpiral);
const Kintoni = L.marker([-91.08, 175.22], { icon: planetIcon }).bindTooltip("Kintoni", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kintoni);
const Eibon = L.marker([-89.60, 175.48], { icon: planetIcon }).bindTooltip("Eibon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Eibon);
const Argai = L.marker([-87.45, 175.53], { icon: planetIcon }).bindTooltip("Argai", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Argai);
const Argoon = L.marker([-85.66, 175.84], { icon: planetIcon }).bindTooltip("Argoon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Argoon);
const Nuswatta = L.marker([-88.38, 176.11], { icon: planetIcon }).bindTooltip("Nuswatta", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nuswatta);
const Kaon = L.marker([-87.63, 176.11], { icon: planetIcon }).bindTooltip("Kaon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kaon);
const Rudrig = L.marker([-86.20, 176.36], { icon: planetIcon }).bindTooltip("Rudrig", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rudrig);
const Clariv = L.marker([-87.20, 176.61], { icon: planetIcon }).bindTooltip("Clariv", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Clariv);
const Saheelindeel = L.marker([-90.42, 176.81], { icon: planetIcon }).bindTooltip("Saheelindeel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Saheelindeel);
const Stalimur = L.marker([-88.31, 176.86], { icon: planetIcon }).bindTooltip("Stalimur", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Stalimur);
const Eredenn = L.marker([-88.00, 177.06], { icon: planetIcon }).bindTooltip("Eredenn", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Eredenn);
const Orion = L.marker([-89.34, 177.00], { icon: planetIcon }).bindTooltip("Orion", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Orion);
const Escarte = L.marker([-86.31, 177.33], { icon: planetIcon }).bindTooltip("Escarte", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Escarte);
const Brigia = L.marker([-89.13, 177.66], { icon: planetIcon }).bindTooltip("Brigia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Brigia);
const Caluula = L.marker([-90.02, 177.86], { icon: planetIcon }).bindTooltip("Caluula", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Caluula);
const Mullan = L.marker([-88.55, 177.95], { icon: planetIcon }).bindTooltip("MULLAN", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mullan);
const Geillia = L.marker([-86.69, 178.30], { icon: planetIcon }).bindTooltip("Geillia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Geillia);
const Dellalt = L.marker([-90.78, 178.48], { icon: planetIcon }).bindTooltip("Dellalt", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Dellalt);
const Junobia = L.marker([-90.14, 178.72], { icon: planetIcon }).bindTooltip("Junobia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Junobia);
const Vaenrood = L.marker([-88.80, 179.81], { icon: planetIcon }).bindTooltip("Vaenrood", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vaenrood);
const Sran = L.marker([-90.91, 179.86], { icon: planetIcon }).bindTooltip("Sran", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sran);
const Pakuuni = L.marker([-86.22, 180.22], { icon: planetIcon }).bindTooltip("Pakuuni", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pakuuni);
const Refnar = L.marker([-87.77, 180.59], { icon: planetIcon }).bindTooltip("Refnar", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Refnar);
const Shaylin = L.marker([-86.80, 181.28], { icon: planetIcon }).bindTooltip("Shaylin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Shaylin);
const NewAlderaan = L.marker([-91.77, 181.41], { icon: planetIcon }).bindTooltip("New Alderaan", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NewAlderaan);
const Turkana = L.marker([-87.00, 181.91], { icon: planetIcon }).bindTooltip("Turkana", { permanent: true, direction: 'right', offset: [-2, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Turkana);
const Telaris = L.marker([-88.06, 181.94], { icon: planetIcon }).bindTooltip("Telaris", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Telaris);
const Eridicon = L.marker([-89.66, 181.97], { icon: planetIcon }).bindTooltip("Eridicon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Eridicon);
const MuntoCodru = L.marker([-87.66, 183.22], { icon: planetIcon }).bindTooltip("Munto Codru", { permanent: true, direction: 'right', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(MuntoCodru);
const Reginard = L.marker([-88.25, 183.34], { icon: planetIcon }).bindTooltip("Reginard", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Reginard);
const Minntooine = L.marker([-90.67, 183.39], { icon: planetIcon }).bindTooltip("Minntooine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Minntooine);
const Ruisto = L.marker([-89.74, 183.50], { icon: planetIcon }).bindTooltip("Ruisto", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ruisto);
const MonCala = L.marker([-90.22, 184.03], { icon: pltIconCaL }).bindTooltip("Mon Cala (Dac)", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(MonCalaPopup, customOptions).addTo(map);
const Pammant = L.marker([-90.46, 184.20], { icon: planetIcon }).bindTooltip("Pammant", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pammant);
const Mantan = L.marker([-91.27, 184.30], { icon: planetIcon }).bindTooltip("Mantan", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mantan);
const NewHeurkea = L.marker([-91.55, 184.65], { icon: planetIcon }).bindTooltip("New Heurkea", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NewHeurkea);
const Damendine = L.marker([-88.80, 185.15], { icon: planetIcon }).bindTooltip("Damendine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Damendine);
const Pinperu = L.marker([-89.96, 185.30], { icon: planetIcon }).bindTooltip("Pinperu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pinperu);
const Hast = L.marker([-86.58, 185.37], { icon: planetIcon }).bindTooltip("Hast", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hast);
const Giryulan = L.marker([-88.16, 186.00], { icon: planetIcon }).bindTooltip("Giryulan", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Giryulan);
const Zigoola = L.marker([-87.77, 186.19], { icon: planetIcon }).bindTooltip("Zigoola", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Zigoola);
const Krinemonen = L.marker([-90.78, 186.33], { icon: planetIcon }).bindTooltip("Krinemonen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Krinemonen);
const Hinakuu = L.marker([-91.91, 186.69], { icon: planetIcon }).bindTooltip("Hinakuu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hinakuu);
const Buchich = L.marker([-90.44, 187.11], { icon: planetIcon }).bindTooltip("Buchich", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Buchich);
//========================================== row 07 ===== MANDALORE ========================
const VunHanna = L.marker([-93.81, 74.44], { icon: planetIcon }).bindTooltip("Vun'Hanna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(VunHanna);
const Ilum = L.marker([-95.75, 97.72], { icon: pltIconCaL2 }).bindTooltip("Ilum", { permanent: true, direction: 'left', offset: [-5, 0], className: 'leaflet-tooltip    ' }).bindPopup(IlumPopup, customOptions).addTo(map);
const Yoggoy = L.marker([-95.63, 102.88], { icon: planetIcon }).bindTooltip("Yoggoy", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Yoggoy);
const Snevu = L.marker([-96.23, 103.14], { icon: planetIcon }).bindTooltip("Snevu", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Snevu);
const TheRedoubt = L.marker([-97.99, 103.73], { icon: planetIcon }).bindTooltip("The Redoubt", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Fhost = L.marker([-92.89, 104.63], { icon: planetIcon }).bindTooltip("Fhost", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Fhost);
const Qoribu = L.marker([-95.30, 104.70], { icon: planetIcon }).bindTooltip("Qoribu", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Qoribu);
const Volik = L.marker([-93.98, 104.91], { icon: planetIcon }).bindTooltip("Volik", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Volik);
const UR5292FH = L.marker([-93.33, 105.05], { icon: planetIcon }).bindTooltip("UR-5292-FH", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(UR5292FH);
const UR41284 = L.marker([-94.61, 105.39], { icon: planetIcon }).bindTooltip("UR41-284", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(UR41284);
const Bloxia = L.marker([-92.24, 105.61], { icon: planetIcon }).bindTooltip("Bloxia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bloxia);
const LostMurvey = L.marker([-92.60, 105.89], { icon: planetIcon }).bindTooltip("Lost Murvey", { permanent: true, direction: 'left', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom04.addLayer(LostMurvey);
const Regel = L.marker([-93.47, 105.53], { icon: planetIcon }).bindTooltip("Regel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Regel);
const Reo = L.marker([-93.86, 106.95], { icon: planetIcon }).bindTooltip("Reo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Reo);
const Ankus = L.marker([-93.20, 107.61], { icon: planetIcon }).bindTooltip("Ankus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ankus);
const Vixnix = L.marker([-95.08, 107.67], { icon: planetIcon }).bindTooltip("Vixnix", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vixnix);
const Burska = L.marker([-94.48, 108.08], { icon: planetIcon }).bindTooltip("Burska", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Burska);
const Rago = L.marker([-95.19, 108.13], { icon: planetIcon }).bindTooltip("Rago", { permanent: true, direction: 'left', offset: [-2, 4], className: 'leaflet-tooltip    ' }).addTo(map);
const Murgo = L.marker([-96.49, 108.00], { icon: planetIcon }).bindTooltip("Murgo", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Murgo);
const Acherin = L.marker([-92.31, 108.38], { icon: planetIcon }).bindTooltip("Acherin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Acherin);
const Moro = L.marker([-94.19, 109.03], { icon: planetIcon }).bindTooltip("Moro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Moro);
const KrilDor = L.marker([-95.33, 109.22], { icon: planetIcon }).bindTooltip("Kril'Dor", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(KrilDor);
const Sinton = L.marker([-93.67, 109.52], { icon: planetIcon }).bindTooltip("Sinton", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sinton);
const Voniss = L.marker([-96.36, 109.85], { icon: planetIcon }).bindTooltip("Voniss", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Voniss);
const Gilatter = L.marker([-92.85, 110.55], { icon: planetIcon }).bindTooltip("Gilatter", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gilatter);
const Marasaln = L.marker([-96.53, 110.66], { icon: planetIcon }).bindTooltip("Marasaln", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Marasaln);
const Zelaba = L.marker([-94.80, 110.96], { icon: planetIcon }).bindTooltip("Zelaba", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Zelaba);
const Crintlia = L.marker([-95.63, 111.14], { icon: planetIcon }).bindTooltip("Crintlia", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Crintlia);
const MaAlkerr = L.marker([-94.45, 111.22], { icon: planetIcon }).bindTooltip("Ma'alkerr", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(MaAlkerr);
const Masgen = L.marker([-93.09, 111.55], { icon: planetIcon }).bindTooltip("Masgen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Masgen);
const Kalaan = L.marker([-93.89, 111.84], { icon: planetIcon }).bindTooltip("Kalaan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kalaan);
const OrdVaree = L.marker([-94.56, 112.20], { icon: planetIcon }).bindTooltip("Ord Varee", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdVaree);
const OrdHallitron = L.marker([-96.95, 112.19], { icon: planetIcon }).bindTooltip("Ord Hallitron", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdHallitron);
const Mondress = L.marker([-98.06, 112.41], { icon: planetIcon }).bindTooltip("Mondress", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mondress);
const BelsharOthacu = L.marker([-95.31, 112.50], { icon: planetIcon }).bindTooltip("Belshar Othacuu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BelsharOthacu);
const Rustibar = L.marker([-92.86, 112.76], { icon: planetIcon }).bindTooltip("Rustibar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rustibar);
const GleeAnselm = L.marker([-96.08, 112.89], { icon: planetIcon }).bindTooltip("Glee Anselm", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(GleeAnselm);
const Evas = L.marker([-93.55, 113.55], { icon: planetIcon }).bindTooltip("Evas", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Evas);
const Vaced = L.marker([-97.31, 113.87], { icon: planetIcon }).bindTooltip("Vaced", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vaced);
const Jaloria = L.marker([-97.48, 113.98], { icon: planetIcon }).bindTooltip("Jaloria", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Jaloria);
const Carvandir = L.marker([-97.93, 114.42], { icon: planetIcon }).bindTooltip("Carvandir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Carvandir);
const ShuTorun = L.marker([-94.86, 114.81], { icon: planetIcon }).bindTooltip("Shu-Torun", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ShuTorun);
const Londor = L.marker([-94.17, 115.06], { icon: planetIcon }).bindTooltip("Londor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Londor);
const Darkon = L.marker([-95.85, 116.15], { icon: planetIcon }).bindTooltip("Darkon", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Darkon);
const Junction = L.marker([-97.89, 116.15], { icon: planetIcon }).bindTooltip("Junction", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Junction);
const Feldrona = L.marker([-92.89, 116.19], { icon: planetIcon }).bindTooltip("Feldrona", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Feldrona);
const Lorista = L.marker([-93.74, 116.21], { icon: planetIcon }).bindTooltip("Lorista", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lorista);
const Myomar = L.marker([-98.34, 116.33], { icon: planetIcon }).bindTooltip("Myomar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Myomar);
const Bezim = L.marker([-97.66, 116.48], { icon: planetIcon }).bindTooltip("Bezim", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bezim);
const Vicondor = L.marker([-98.12, 116.61], { icon: planetIcon }).bindTooltip("Vicondor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vicondor);
const Station88 = L.marker([-98.01, 116.81], { icon: statonIcon }).bindTooltip("Station 88", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Station88);
const Valrar = L.marker([-93.86, 116.89], { icon: planetIcon }).bindTooltip("Valrar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Valrar);
const Iridonia = L.marker([-92.50, 117.13], { icon: pltIconCaL }).bindTooltip("Iridonia", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(IridoniaPopup, customOptions).addTo(map);
const Iridia = L.marker([-92.72, 117.34], { icon: planetIcon }).bindTooltip("Iridia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Iridia);
const Fef = L.marker([-95.75, 117.84], { icon: planetIcon }).bindTooltip("Fef", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Fef);
const Pugal = L.marker([-93.20, 118.03], { icon: planetIcon }).bindTooltip("Pugal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pugal);
const Altarrn = L.marker([-96.89, 117.94], { icon: planetIcon }).bindTooltip("Altarrn", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Altarrn);
const Fornax = L.marker([-94.58, 118.17], { icon: planetIcon }).bindTooltip("Fornax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Fornax);
const Abaarian = L.marker([-98.12, 118.52], { icon: planetIcon }).bindTooltip("Abaarian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Abaarian);
const Vortex = L.marker([-97.25, 118.81], { icon: planetIcon }).bindTooltip("Vortex", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Vortex);
const Frithia = L.marker([-92.64, 118.92], { icon: planetIcon }).bindTooltip("Frithia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Frithia);
const Ipellrilla = L.marker([-95.42, 119.05], { icon: planetIcon }).bindTooltip("Ipellrilla", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ipellrilla);
const TravalPacor = L.marker([-92.19, 119.42], { icon: planetIcon }).bindTooltip("Traval-Pacor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TravalPacor);
const Nentan = L.marker([-96.58, 120.09], { icon: planetIcon }).bindTooltip("Nentan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nentan);
const Baltizaar = L.marker([-93.65, 120.63], { icon: planetIcon }).bindTooltip("Baltizaar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Baltizaar);
const PeldonMaj = L.marker([-98.53, 121.00], { icon: planetIcon }).bindTooltip("Peldon Major", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PeldonMaj);
const Maicombe = L.marker([-92.55, 121.05], { icon: planetIcon }).bindTooltip("Maicombe", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Maicombe);
const TOlan = L.marker([-96.17, 121.53], { icon: planetIcon }).bindTooltip("T'olan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TOlan);
const Grehollo = L.marker([-98.04, 121.72], { icon: planetIcon }).bindTooltip("Grehollo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Grehollo);
const Thory = L.marker([-94.89, 122.05], { icon: planetIcon }).bindTooltip("Thory", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thory);
const Manoe = L.marker([-96.90, 122.81], { icon: planetIcon }).bindTooltip("Manoe", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Manoe);
const Corthenia = L.marker([-92.25, 122.88], { icon: planetIcon }).bindTooltip("Corthenia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Corthenia);
const Dohu = L.marker([-95.79, 123.05], { icon: planetIcon }).bindTooltip("Dohu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dohu);
const Tyan = L.marker([-92.39, 124.37], { icon: planetIcon }).bindTooltip("Tyan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tyan);
const Yout = L.marker([-93.62, 124.77], { icon: planetIcon }).bindTooltip("Yout", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Yout);
const Qiilura = L.marker([-95.11, 124.78], { icon: planetIcon }).bindTooltip("Qiilura", { permanent: true, direction: 'left', offset: [0, -7], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Qiilura);
const Aleen = L.marker([-95.17, 124.83], { icon: planetIcon }).bindTooltip("Aleen", { permanent: true, direction: 'right', offset: [0, -7], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Aleen);
const OrdMantell = L.marker([-95.22, 124.94], { icon: pltIconCaL }).bindTooltip("Ord Mantell", { permanent: true, direction: 'left', offset: [-3, 6], className: 'leaflet-tooltip    ' }).bindPopup(OrdMantellPopup, customOptions).addTo(map);
const Jarnollen = L.marker([-96.06, 124.88], { icon: planetIcon }).bindTooltip("Jarnollen", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jarnollen);
const DorNameth = L.marker([-94.77, 125.63], { icon: planetIcon }).bindTooltip("Dor Nameth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(DorNameth);
const Luuq = L.marker([-98.42, 125.63], { icon: planetIcon }).bindTooltip("Luuq", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Luuq);
const Anobis = L.marker([-95.90, 125.83], { icon: planetIcon }).bindTooltip("Anobis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Anobis);
const Balnab = L.marker([-96.80, 125.91], { icon: planetIcon }).bindTooltip("Balnab", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Balnab);
const PatititePattu = L.marker([-96.60, 126.05], { icon: planetIcon }).bindTooltip("Patitite Pattuna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PatititePattu);
const NumidianPr = L.marker([-94.47, 126.38], { icon: pltIconCan2 }).bindTooltip("Numidian Prime", { permanent: true, direction: 'right', offset: [2, -1], className: 'leaflet-tooltip-mov' }).bindPopup(NumidianPrPopup, customOptions).addTo(map);
const Pickerin = L.marker([-95.04, 126.92], { icon: planetIcon }).bindTooltip("Pickerin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pickerin);
const Korvaii = L.marker([-94.00, 127.44], { icon: planetIcon }).bindTooltip("Korvaii", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Korvaii);
const Nilg = L.marker([-92.61, 127.89], { icon: planetIcon }).bindTooltip("Nilg", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nilg);
const Ilimardon = L.marker([-95.87, 127.93], { icon: planetIcon }).bindTooltip("Ilimardon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ilimardon);
const VV997JE2N71 = L.marker([-98.14, 127.91], { icon: planetIcon }).bindTooltip("VV-99-7JE-2N71", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(VV997JE2N71);
const Mengjini = L.marker([-97.84, 128.66], { icon: planetIcon }).bindTooltip("Mengjini", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mengjini);
const Melus = L.marker([-96.77, 129.14], { icon: planetIcon }).bindTooltip("Melus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Melus);
const Octavia = L.marker([-95.46, 129.67], { icon: planetIcon }).bindTooltip("Octavia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Octavia);
const Alderath = L.marker([-93.28, 129.70], { icon: planetIcon }).bindTooltip("Alderath", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Alderath);
const Kordu = L.marker([-94.66, 129.98], { icon: planetIcon }).bindTooltip("Kordu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kordu);
const PaHirAl = L.marker([-92.19, 130.44], { icon: planetIcon }).bindTooltip("Pa'hir'al", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PaHirAl);
const Tarchalia = L.marker([-96.78, 130.54], { icon: planetIcon }).bindTooltip("Tarchalia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tarchalia);
const Agriworld2079 = L.marker([-93.58, 131.05], { icon: planetIcon }).bindTooltip("Agriworld-2079", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Agriworld2079);
const Ylix = L.marker([-94.23, 131.36], { icon: planetIcon }).bindTooltip("Ylix", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ylix);
const Yde = L.marker([-95.56, 131.39], { icon: planetIcon }).bindTooltip("Yde", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Yde);
const Genassa = L.marker([-92.44, 131.44], { icon: planetIcon }).bindTooltip("Genassa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Genassa);
const Nicandra = L.marker([-95.08, 131.52], { icon: planetIcon }).bindTooltip("Nicandra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nicandra);
const Goelitz = L.marker([-94.36, 131.89], { icon: planetIcon }).bindTooltip("Goelitz", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Goelitz);
const FarDostany = L.marker([-92.67, 131.91], { icon: planetIcon }).bindTooltip("Far Dostany", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(FarDostany);
const Mapuzo = L.marker([-95.91, 131.94], { icon: planetIcon }).bindTooltip("Mapuzo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Mapuzo);
const Carnth = L.marker([-93.52, 132.06], { icon: planetIcon }).bindTooltip("Carnth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Carnth);
const WalinOr = L.marker([-97.25, 132.09], { icon: planetIcon }).bindTooltip("Walin'or", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(WalinOr);
const Belukat = L.marker([-97.86, 132.39], { icon: planetIcon }).bindTooltip("Belukat", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Belukat);
const Thairwsthis = L.marker([-92.20, 132.48], { icon: planetIcon }).bindTooltip("Thairwsthis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Thairwsthis);
const Corphelion = L.marker([-98.58, 132.53], { icon: planetIcon }).bindTooltip("Corphelion", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Corphelion);
const Otavon = L.marker([-96.25, 132.61], { icon: planetIcon }).bindTooltip("Otavon", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Otavon);
const Jestan = L.marker([-98.28, 132.61], { icon: planetIcon }).bindTooltip("Jestan", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jestan);
const Vretha = L.marker([-95.05, 133.47], { icon: planetIcon }).bindTooltip("Vretha", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vretha);
const Teya = L.marker([-97.77, 133.47], { icon: planetIcon }).bindTooltip("Teya", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Teya);
const Wyveral = L.marker([-95.16, 133.61], { icon: planetIcon }).bindTooltip("Wyveral", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Wyveral);
const FusionCloudsN = L.marker([-94.42, 133.73], { icon: nebIconBlk }).bindTooltip("Fusion Clouds N.", { permanent: true, direction: 'right', offset: [-2, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(FusionCloudsN);
const Viga = L.marker([-98.25, 133.73], { icon: planetIcon }).bindTooltip("Viga", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Viga);
const Vectinia = L.marker([-92.42, 133.78], { icon: planetIcon }).bindTooltip("Vectinia", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vectinia);
const Moer = L.marker([-92.97, 133.91], { icon: planetIcon }).bindTooltip("Moer", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Moer);
const Tartaglia = L.marker([-94.19, 133.91], { icon: planetIcon }).bindTooltip("Tartaglia", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tartaglia);
const Draria = L.marker([-97.83, 134.41], { icon: planetIcon }).bindTooltip("Draria", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Draria);
const Ceti597 = L.marker([-94.97, 134.47], { icon: planetIcon }).bindTooltip("Ceti 597", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ceti597);
const Pendal = L.marker([-96.14, 134.47], { icon: planetIcon }).bindTooltip("Pendal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pendal);
const Adin = L.marker([-97.63, 134.86], { icon: planetIcon }).bindTooltip("Adin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Adin);
const Oordo = L.marker([-92.88, 135.28], { icon: planetIcon }).bindTooltip("Oordo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Oordo);
const Triewahl = L.marker([-95.91, 135.36], { icon: planetIcon }).bindTooltip("Triewahl", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Triewahl);
const Blackfel = L.marker([-97.53, 135.45], { icon: planetIcon }).bindTooltip("Blackfel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Blackfel);
const Verossia = L.marker([-94.13, 135.55], { icon: planetIcon }).bindTooltip("Verossia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Verossia);
const Chennis = L.marker([-97.25, 135.56], { icon: planetIcon }).bindTooltip("Chennis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Chennis);
const Homon = L.marker([-96.31, 135.66], { icon: planetIcon }).bindTooltip("Homon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Homon);
const Djurmo = L.marker([-93.31, 135.75], { icon: planetIcon }).bindTooltip("Djurmo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Djurmo);
const Denuhi = L.marker([-98.39, 135.81], { icon: planetIcon }).bindTooltip("Denuhi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Denuhi);
const Asamin = L.marker([-94.70, 136.27], { icon: planetIcon }).bindTooltip("Asamin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Asamin);
const Xorao = L.marker([-95.52, 136.28], { icon: planetIcon }).bindTooltip("Xorao", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Xorao);
const Telkadis = L.marker([-97.81, 136.42], { icon: planetIcon }).bindTooltip("Telkadis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Telkadis);
const Shalam = L.marker([-98.28, 136.94], { icon: planetIcon }).bindTooltip("Shalam", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Shalam);
const Leafar = L.marker([-96.55, 136.95], { icon: planetIcon }).bindTooltip("Leafar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Leafar);
const Enferm = L.marker([-95.42, 137.17], { icon: planetIcon }).bindTooltip("Enferm", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Enferm);
const Corsin = L.marker([-96.43, 137.17], { icon: planetIcon }).bindTooltip("Corsin", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Corsin);
const SifKric = L.marker([-94.67, 137.28], { icon: planetIcon }).bindTooltip("Sif'kric", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(SifKric);
const GreaterPloori = L.marker([-96.58, 137.39], { icon: clustrIcon }).bindTooltip("Greater Plooriod Cl.", { permanent: true, direction: 'right', offset: [2, 5], className: 'leaflet-tooltip    ' }); zoom07.addLayer(GreaterPloori);
const Rijel = L.marker([-97.45, 137.42], { icon: planetIcon }).bindTooltip("Rijel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rijel);
const Lavisar = L.marker([-92.81, 137.47], { icon: planetIcon }).bindTooltip("Lavisar", { permanent: true, direction: 'right', offset: [0, 6], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Lavisar);
const Mezeg = L.marker([-93.61, 137.82], { icon: planetIcon }).bindTooltip("Mezeg", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mezeg);
const Plooriod = L.marker([-96.58, 137.83], { icon: planetIcon }).bindTooltip("Plooriod", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Plooriod);
const PleemsNexus = L.marker([-94.48, 138.06], { icon: planetIcon }).bindTooltip("Pleem's Nexus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PleemsNexus);
const Nyriaan = L.marker([-95.42, 138.38], { icon: planetIcon }).bindTooltip("Nyriaan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nyriaan);
const Pallaxides = L.marker([-92.61, 138.48], { icon: planetIcon }).bindTooltip("Pallaxides", { permanent: true, direction: 'left', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pallaxides);
const Comkin = L.marker([-97.41, 138.62], { icon: planetIcon }).bindTooltip("Comkin", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Comkin);
const Odryn = L.marker([-92.66, 138.95], { icon: planetIcon }).bindTooltip("Odryn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Odryn);
const Telerath = L.marker([-97.85, 139.39], { icon: planetIcon }).bindTooltip("Telerath", { permanent: true, direction: 'right', offset: [-1, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Telerath);
const Skorrupon = L.marker([-95.23, 139.52], { icon: planetIcon }).bindTooltip("Skorrupon", { permanent: true, direction: 'left', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Skorrupon);
const Null = L.marker([-94.16, 139.53], { icon: planetIcon }).bindTooltip("Null", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Null);
const Kroctar = L.marker([-98.17, 140.08], { icon: planetIcon }).bindTooltip("Kroctar", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kroctar);
const Bretta = L.marker([-93.29, 140.19], { icon: planetIcon }).bindTooltip("Bretta", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bretta);
const Ploo = L.marker([-96.45, 140.26], { icon: planetIcon }).bindTooltip("Ploo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ploo);
const SurdapanSta = L.marker([-92.71, 140.50], { icon: planetIcon }).bindTooltip("Surdapan Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(SurdapanSta);
const Vulta = L.marker([-95.34, 140.53], { icon: planetIcon }).bindTooltip("Vulta", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vulta);
const Ferros = L.marker([-94.66, 141.17], { icon: planetIcon }).bindTooltip("Ferros", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ferros);
const OrtoNorwe = L.marker([-95.42, 141.48], { icon: planetIcon }).bindTooltip("Orto Norwe", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrtoNorwe);
const Serroco = L.marker([-96.33, 141.50], { icon: planetIcon }).bindTooltip("Serroco", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Serroco);
const Dreve = L.marker([-96.72, 141.61], { icon: planetIcon }).bindTooltip("Dreve", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dreve);
const Talu = L.marker([-93.48, 141.70], { icon: planetIcon }).bindTooltip("Talu", { permanent: true, direction: 'right', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Talu);
const Jebble = L.marker([-94.05, 141.80], { icon: planetIcon }).bindTooltip("Jebble", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Jebble);
const Denova = L.marker([-92.24, 142.23], { icon: planetIcon }).bindTooltip("Denova", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Denova);
const Gerinia = L.marker([-95.97, 142.32], { icon: planetIcon }).bindTooltip("Gerinia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gerinia);
const Suurja = L.marker([-94.27, 142.44], { icon: planetIcon }).bindTooltip("Suurja", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Suurja);
const MagataranMael = L.marker([-97.31, 142.55], { icon: pheIconBlk }).bindTooltip("Magataran Maelstrom", { permanent: true, direction: 'left', offset: [-2, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(MagataranMael);
const Myrkr = L.marker([-96.46, 142.55], { icon: planetIcon }).bindTooltip("Myrkr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Myrkr);
const Boordii = L.marker([-96.19, 142.65], { icon: planetIcon }).bindTooltip("Boordii", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Boordii);
const Taris = L.marker([-92.82, 142.66], { icon: pltIconCaL }).bindTooltip("Taris", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }).bindPopup(TarisPopup, customOptions).addTo(map);
const Weyland = L.marker([-95.88, 142.72], { icon: planetIcon }).bindTooltip("Weyland (Wayland)", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Weyland);
const Viamarr = L.marker([-98.22, 142.97], { icon: planetIcon }).bindTooltip("Viamarr", { permanent: true, direction: 'right', offset: [-2, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Viamarr);
const NakatSingular = L.marker([-97.45, 143.02], { icon: planetIcon }).bindTooltip("Nakat Singularity", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NakatSingular);
const Okyaab = L.marker([-95.14, 143.22], { icon: planetIcon }).bindTooltip("Okyaab", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Okyaab);
const Vastrip = L.marker([-98.39, 143.31], { icon: planetIcon }).bindTooltip("Vastrip", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vastrip);
const AlkLellish = L.marker([-96.80, 143.47], { icon: planetIcon }).bindTooltip("Alk'Lellish", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(AlkLellish);
const OolexPulsar = L.marker([-96.56, 143.55], { icon: pheIconBlk }).bindTooltip("Oolex Pulsar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OolexPulsar);
const Geedon = L.marker([-97.05, 143.67], { icon: planetIcon }).bindTooltip("Geedon", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Geedon);
const OtorsHub = L.marker([-93.95, 143.80], { icon: planetIcon }).bindTooltip("Otor's Hub", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OtorsHub);
const Tarnith = L.marker([-93.20, 144.06], { icon: planetIcon }).bindTooltip("Tarnith", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tarnith);
const Tocan = L.marker([-97.55, 144.08], { icon: planetIcon }).bindTooltip("Tocan", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tocan);
const Cardellia = L.marker([-93.56, 144.20], { icon: planetIcon }).bindTooltip("Cardellia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cardellia);
const Aquaris = L.marker([-97.25, 144.27], { icon: planetIcon }).bindTooltip("Aquaris", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Aquaris);
const Xartun = L.marker([-95.75, 144.52], { icon: planetIcon }).bindTooltip("Xartun", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Xartun);
const Thustra = L.marker([-96.75, 144.50], { icon: planetIcon }).bindTooltip("Thustra", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thustra);
const Thorsgild = L.marker([-93.03, 144.64], { icon: planetIcon }).bindTooltip("Thorsgild", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thorsgild);
const Ramorea = L.marker([-98.36, 144.66], { icon: planetIcon }).bindTooltip("Ramorea", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ramorea);
const Reegian = L.marker([-97.05, 144.70], { icon: planetIcon }).bindTooltip("Reegian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Reegian);
const OrdFanthal = L.marker([-95.36, 144.86], { icon: planetIcon }).bindTooltip("Ord Fanthal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdFanthal);
const Draboon = L.marker([-94.55, 145.16], { icon: planetIcon }).bindTooltip("Draboon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Draboon);
const Flax = L.marker([-97.80, 145.46], { icon: planetIcon }).bindTooltip("Flax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Flax);
const Geris = L.marker([-96.42, 145.52], { icon: planetIcon }).bindTooltip("Geris", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Geris);
const Gargon = L.marker([-92.83, 145.69], { icon: planetIcon }).bindTooltip("Gargon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gargon);
const Surcaris = L.marker([-97.23, 146.01], { icon: planetIcon }).bindTooltip("Surcaris", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Surcaris);
const Flashpoint = L.marker([-92.20, 146.02], { icon: planetIcon }).bindTooltip("Flashpoint", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Flashpoint);
const Hrthging = L.marker([-95.63, 146.17], { icon: planetIcon }).bindTooltip("Hrthging", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hrthging);
const Tierfon = L.marker([-98.03, 146.47], { icon: planetIcon }).bindTooltip("Tierfon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tierfon);
const Dahgee = L.marker([-96.22, 146.69], { icon: planetIcon }).bindTooltip("Dahgee", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dahgee);
const Biravia = L.marker([-97.50, 146.63], { icon: planetIcon }).bindTooltip("Biravia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Biravia);
const Zanbar = L.marker([-93.92, 146.94], { icon: planetIcon }).bindTooltip("Zanbar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Zanbar);
const VorpaYa = L.marker([-95.28, 147.38], { icon: planetIcon }).bindTooltip("Vorpa'ya", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(VorpaYa);
const ConcordDawn = L.marker([-95.52, 147.46], { icon: planetIcon }).bindTooltip("Concord Dawn", { permanent: true, direction: 'right', offset: [-2, -6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ConcordDawn);
const Harswee = L.marker([-94.70, 147.47], { icon: planetIcon }).bindTooltip("Harswee", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Harswee);
const Ordo = L.marker([-93.28, 147.80], { icon: planetIcon }).bindTooltip("Ordo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ordo);
const Cheravh = L.marker([-92.22, 147.92], { icon: planetIcon }).bindTooltip("Cheravh", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cheravh);
const Jakelia = L.marker([-94.28, 148.41], { icon: planetIcon }).bindTooltip("Jakelia", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jakelia);
const Mandalore = L.marker([-93.92, 148.52], { icon: pltIconCaL }).bindTooltip("Mandalore", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(MandalorePopup, customOptions).addTo(map);
const Breshig = L.marker([-93.47, 148.95], { icon: planetIcon }).bindTooltip("Breshig", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Breshig);
const MesCavoli = L.marker([-97.41, 149.30], { icon: planetIcon }).bindTooltip("Mes Cavoli", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(MesCavoli);
const BedlamPulsar = L.marker([-95.89, 149.60], { icon: pheIconBlk }).bindTooltip("Bedlam Pulsar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BedlamPulsar);
const Bedlam = L.marker([-95.83, 149.69], { icon: planetIcon }).bindTooltip("Bedlam", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bedlam);
const Fenel = L.marker([-94.20, 150.00], { icon: planetIcon }).bindTooltip("Fenel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fenel);
const Belthu = L.marker([-94.90, 150.23], { icon: planetIcon }).bindTooltip("Belthu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Belthu);
const Kiva = L.marker([-98.18, 150.30], { icon: planetIcon }).bindTooltip("Kiva", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kiva);
const Aestilan = L.marker([-93.52, 151.14], { icon: planetIcon }).bindTooltip("Aestilan", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Aestilan);
const Msst = L.marker([-96.69, 151.28], { icon: planetIcon }).bindTooltip("Msst", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Msst);
const Cadannia = L.marker([-95.53, 151.30], { icon: planetIcon }).bindTooltip("Cadannia", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cadannia);
const Liul = L.marker([-92.50, 151.45], { icon: planetIcon }).bindTooltip("Liul", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Liul);
const Keresia = L.marker([-94.14, 151.53], { icon: planetIcon }).bindTooltip("Keresia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Keresia);
const MonTorri = L.marker([-97.11, 151.73], { icon: planetIcon }).bindTooltip("Mon Torri", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(MonTorri);
const Tlon = L.marker([-92.95, 151.92], { icon: planetIcon }).bindTooltip("Tlön", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tlon);
const Farseen = L.marker([-94.67, 152.39], { icon: planetIcon }).bindTooltip("Farseen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Farseen);
const Todirium = L.marker([-94.38, 152.69], { icon: planetIcon }).bindTooltip("Todirium", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Todirium);
const NewCanistel = L.marker([-93.33, 152.91], { icon: planetIcon }).bindTooltip("New Canistel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NewCanistel);
const Bseto = L.marker([-95.19, 152.95], { icon: planetIcon }).bindTooltip("Bseto", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bseto);
const Nuala = L.marker([-97.55, 153.06], { icon: planetIcon }).bindTooltip("Nuala", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nuala);
const NyarikanN = L.marker([-96.27, 153.56], { icon: nebIconBlk }).bindTooltip("Nyarikan N.", { permanent: true, direction: 'right', offset: [-1, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NyarikanN);
const KrakesPlanet = L.marker([-92.59, 153.56], { icon: planetIcon }).bindTooltip("Krake's Planet", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(KrakesPlanet);
const Obinipor = L.marker([-92.86, 153.78], { icon: planetIcon }).bindTooltip("Obinipor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Obinipor);
const Sundari = L.marker([-95.85, 154.00], { icon: planetIcon }).bindTooltip("Sundari / Garos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Sundari);
const Bellis = L.marker([-93.66, 154.19], { icon: planetIcon }).bindTooltip("Bellis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bellis);
const Reega = L.marker([-93.89, 154.37], { icon: planetIcon }).bindTooltip("Reega", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Reega);
const Dagro = L.marker([-95.39, 154.56], { icon: planetIcon }).bindTooltip("Dagro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dagro);
const Bompreil = L.marker([-92.97, 154.66], { icon: planetIcon }).bindTooltip("Bompreil", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Bompreil);
const Demigue = L.marker([-92.33, 154.75], { icon: planetIcon }).bindTooltip("Demigue", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Demigue);
const Anteevy = L.marker([-94.53, 154.81], { icon: planetIcon }).bindTooltip("Anteevy", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Anteevy);
const Tantajo = L.marker([-98.16, 155.00], { icon: planetIcon }).bindTooltip("Tantajo", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tantajo);
const Velmor = L.marker([-98.19, 155.15], { icon: planetIcon }).bindTooltip("Velmor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Velmor);
const Kromus = L.marker([-96.38, 155.26], { icon: planetIcon }).bindTooltip("Kromus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kromus);
const M2398 = L.marker([-97.32, 155.75], { icon: planetIcon }).bindTooltip("M2398", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(M2398);
const Fenion = L.marker([-93.05, 156.29], { icon: planetIcon }).bindTooltip("Fenion", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fenion);
const JoranSta = L.marker([-93.02, 157.14], { icon: statonIcon }).bindTooltip("Joran Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(JoranSta);
const Epidimi = L.marker([-93.52, 157.40], { icon: planetIcon }).bindTooltip("Epidimi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Epidimi);
const Santheria = L.marker([-97.05, 157.40], { icon: planetIcon }).bindTooltip("Santheria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Santheria);
const GgyYnt = L.marker([-95.56, 157.54], { icon: planetIcon }).bindTooltip("Ggy-ynt", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(GgyYnt);
const Thodia = L.marker([-94.05, 157.62], { icon: planetIcon }).bindTooltip("Thodia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thodia);
const Pinurquia = L.marker([-92.42, 157.64], { icon: planetIcon }).bindTooltip("Pinurquia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pinurquia);
const Italbos = L.marker([-98.11, 157.64], { icon: planetIcon }).bindTooltip("Italbos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Italbos);
const LobaqSta = L.marker([-92.77, 157.86], { icon: statonIcon }).bindTooltip("Lobaq Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(LobaqSta);
const Ubuuga = L.marker([-97.49, 157.92], { icon: planetIcon }).bindTooltip("Ubuuga", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ubuuga);
const Delphania = L.marker([-96.53, 158.12], { icon: planetIcon }).bindTooltip("Delphania", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Delphania);
const Eres = L.marker([-96.38, 158.62], { icon: planetIcon }).bindTooltip("Eres", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Eres);
const Daminia = L.marker([-94.61, 158.80], { icon: planetIcon }).bindTooltip("Daminia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Daminia);
const Atraken = L.marker([-92.22, 158.84], { icon: planetIcon }).bindTooltip("Atraken", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Atraken);
const Carpastor = L.marker([-93.30, 158.87], { icon: planetIcon }).bindTooltip("Carpastor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Carpastor);
const Gestron = L.marker([-95.47, 159.14], { icon: planetIcon }).bindTooltip("Gestron", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gestron);
const Pouffra = L.marker([-92.92, 159.20], { icon: planetIcon }).bindTooltip("Pouffra", { permanent: true, direction: 'right', offset: [-1, 8], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pouffra);
const Alagon = L.marker([-98.32, 159.72], { icon: planetIcon }).bindTooltip("Alagon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Alagon);
const Vandos = L.marker([-92.86, 159.76], { icon: planetIcon }).bindTooltip("Vandos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vandos);
const Trancret = L.marker([-94.66, 159.84], { icon: planetIcon }).bindTooltip("Trancret", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Trancret);
const NathGoordi = L.marker([-96.33, 159.89], { icon: planetIcon }).bindTooltip("Nah Goordi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NathGoordi);
const InduSan = L.marker([-93.61, 159.98], { icon: planetIcon }).bindTooltip("Indu San", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(InduSan);
const Casfield = L.marker([-97.30, 160.03], { icon: planetIcon }).bindTooltip("Casfield", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Casfield);
const Mooga = L.marker([-94.99, 160.04], { icon: planetIcon }).bindTooltip("Mooga", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mooga);
const Gala = L.marker([-92.16, 160.34], { icon: planetIcon }).bindTooltip("Gala", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gala);
const Gromas = L.marker([-94.13, 160.36], { icon: planetIcon }).bindTooltip("Gromas", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gromas);
const OrdTiddell = L.marker([-97.39, 160.98], { icon: planetIcon }).bindTooltip("Ord Tiddell", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdTiddell);
const StygeonPr = L.marker([-92.81, 161.03], { icon: planetIcon }).bindTooltip("Stygeon Prime", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(StygeonPr);
const Tabiid = L.marker([-95.99, 161.15], { icon: planetIcon }).bindTooltip("Tabiid", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tabiid);
const PointNadir = L.marker([-92.64, 161.17], { icon: statonIcon }).bindTooltip("Point Nadir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PointNadir);
const Diorda = L.marker([-96.78, 161.73], { icon: planetIcon }).bindTooltip("Diorda", { permanent: true, direction: 'left', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Diorda);
const Aargonar = L.marker([-95.41, 162.20], { icon: planetIcon }).bindTooltip("Aargonar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Aargonar);
const Maarka = L.marker([-93.92, 162.36], { icon: planetIcon }).bindTooltip("Maarka", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Maarka);
const KemStorAi = L.marker([-98.55, 162.65], { icon: planetIcon }).bindTooltip("Kem Stor Ai", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KemStorAi);
const Matabre = L.marker([-97.17, 163.09], { icon: planetIcon }).bindTooltip("Matabre", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Matabre);
const Ilamna = L.marker([-97.28, 163.10], { icon: planetIcon }).bindTooltip("Ilamna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ilamna);
const Uthtara = L.marker([-96.78, 163.59], { icon: planetIcon }).bindTooltip("Uthtara", { permanent: true, direction: 'left', offset: [1, -6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Uthtara);
const Hleua = L.marker([-97.77, 163.64], { icon: planetIcon }).bindTooltip("Hleua", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hleua);
const Euceron = L.marker([-98.05, 163.65], { icon: planetIcon }).bindTooltip("Euceron", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Euceron);
const Okator = L.marker([-96.91, 163.69], { icon: planetIcon }).bindTooltip("Okator", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Okator);
const CortiliumMaj = L.marker([-96.50, 163.75], { icon: planetIcon }).bindTooltip("Cortilium Major", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(CortiliumMaj);
const Jolia = L.marker([-98.57, 163.79], { icon: planetIcon }).bindTooltip("Jolia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jolia);
const Odos = L.marker([-92.75, 163.89], { icon: nebIconBlk }).bindTooltip("Odos", { permanent: true, direction: 'left', offset: [-2, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Odos);
const Caarimon = L.marker([-92.22, 164.03], { icon: planetIcon }).bindTooltip("Caarimon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Caarimon);
const Septevorres = L.marker([-93.45, 164.06], { icon: planetIcon }).bindTooltip("Septevorres", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Septevorres);
const Zuliria = L.marker([-97.10, 164.08], { icon: planetIcon }).bindTooltip("Zuliria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Zuliria);
const Entiia = L.marker([-93.81, 164.23], { icon: planetIcon }).bindTooltip("Entiia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Entiia);
const FarwellSta = L.marker([-96.63, 164.38], { icon: statonIcon }).bindTooltip("Farwell Sta.", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(FarwellSta);
const RingoVinda = L.marker([-98.08, 164.45], { icon: planetIcon }).bindTooltip("Ringo Vinda", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(RingoVinda);
const DamoniteYorsB = L.marker([-92.84, 164.56], { icon: planetIcon }).bindTooltip("Damonite Yors-B", { permanent: true, direction: 'left', offset: [2, 7], className: 'leaflet-tooltip    ' }); zoom06.addLayer(DamoniteYorsB);
const Ganzik = L.marker([-94.25, 164.72], { icon: planetIcon }).bindTooltip("Ganzik", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ganzik);
const Aralia = L.marker([-93.22, 164.95], { icon: planetIcon }).bindTooltip("Aralia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Aralia);
const Darlon = L.marker([-96.74, 165.17], { icon: planetIcon }).bindTooltip("Darlon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Darlon);
const Abhean = L.marker([-96.25, 165.22], { icon: planetIcon }).bindTooltip("Abhean", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Abhean);
const Loken = L.marker([-97.86, 165.40], { icon: planetIcon }).bindTooltip("Loken", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Loken);
const OrdAdinorr = L.marker([-92.23, 165.45], { icon: planetIcon }).bindTooltip("Ord Adinorr", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdAdinorr);
const BrachnisChori = L.marker([-92.50, 165.45], { icon: planetIcon }).bindTooltip("Brachnis Chorios", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BrachnisChori);
const TheWheel = L.marker([-95.44, 165.73], { icon: staIconCaL }).bindTooltip("The Wheel", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(TheWheelPopup, customOptions).addTo(map);
const Rydar = L.marker([-93.59, 165.75], { icon: planetIcon }).bindTooltip("Rydar", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rydar);
const Calgon = L.marker([-92.59, 165.81], { icon: planetIcon }).bindTooltip("Calgon", { permanent: true, direction: 'left', offset: [2, 7], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Calgon);
const PedducisChori = L.marker([-92.16, 165.95], { icon: planetIcon }).bindTooltip("Pedducis Chorios", { permanent: true, direction: 'left', offset: [2, -7], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PedducisChori);
const Krevas = L.marker([-93.02, 166.14], { icon: planetIcon }).bindTooltip("Krevas", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Krevas);
const Sorjus = L.marker([-92.28, 166.20], { icon: planetIcon }).bindTooltip("Sorjus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sorjus);
const Meridian = L.marker([-92.48, 166.31], { icon: planetIcon }).bindTooltip("Meridian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Meridian);
const Centares = L.marker([-94.55, 166.45], { icon: planetIcon }).bindTooltip("Centares", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Centares);
const Viidav = L.marker([-98.43, 166.53], { icon: planetIcon }).bindTooltip("Viidav", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Viidav);
const Antemeridias = L.marker([-93.83, 166.85], { icon: planetIcon }).bindTooltip("Antemeridias", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Antemeridias);
const Ryvester = L.marker([-92.73, 166.90], { icon: planetIcon }).bindTooltip("Ryvester", { permanent: true, direction: 'right', offset: [-1, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ryvester);
const Ampliquen = L.marker([-92.19, 167.07], { icon: planetIcon }).bindTooltip("Ampliquen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ampliquen);
const NewHolstice = L.marker([-97.08, 167.28], { icon: planetIcon }).bindTooltip("New Holstice", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(NewHolstice);
const Prishardia = L.marker([-94.06, 167.29], { icon: planetIcon }).bindTooltip("Prishardia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Prishardia);
const Budpock = L.marker([-92.58, 167.59], { icon: planetIcon }).bindTooltip("Budpock", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Budpock);
const Xxan = L.marker([-93.19, 167.74], { icon: planetIcon }).bindTooltip("Xxan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Xxan);
const NoAd = L.marker([-97.55, 167.95], { icon: planetIcon }).bindTooltip("No-ad", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NoAd);
const Cybloc = L.marker([-92.84, 168.01], { icon: planetIcon }).bindTooltip("Cybloc", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cybloc);
const DarOr = L.marker([-94.53, 168.12], { icon: planetIcon }).bindTooltip("Dar'Or", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(DarOr);
const Grathus = L.marker([-93.56, 168.23], { icon: planetIcon }).bindTooltip("Grathus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Grathus);
const Yhuli = L.marker([-94.89, 168.36], { icon: planetIcon }).bindTooltip("Yhuli", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Yhuli);
const Mileva = L.marker([-95.61, 168.51], { icon: planetIcon }).bindTooltip("Mileva", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Mileva);
const Chad = L.marker([-93.34, 168.58], { icon: planetIcon }).bindTooltip("Chad", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Chad);
const Trogan = L.marker([-93.09, 168.82], { icon: planetIcon }).bindTooltip("Trogan (Ethullum)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Trogan);
const Cardooine = L.marker([-92.97, 168.84], { icon: planetIcon }).bindTooltip("Cardooine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Cardooine);
const Dandrian = L.marker([-92.17, 168.87], { icon: planetIcon }).bindTooltip("Dandrian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dandrian);
const ExisSta = L.marker([-92.72, 168.93], { icon: statonIcon }).bindTooltip("Exis Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(ExisSta);
const Jomark = L.marker([-94.20, 169.20], { icon: planetIcon }).bindTooltip("Jomark (Bynas)", { permanent: true, direction: 'right', offset: [-1, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jomark);
const Waskiro = L.marker([-94.94, 169.61], { icon: planetIcon }).bindTooltip("Waskiro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Waskiro);
const Anzat = L.marker([-98.07, 169.67], { icon: planetIcon }).bindTooltip("Anzat", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Anzat);
const BalDemnic = L.marker([-92.47, 169.82], { icon: planetIcon }).bindTooltip("Bal'demnic", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BalDemnic);
const Colsassa = L.marker([-96.03, 169.86], { icon: planetIcon }).bindTooltip("Colsassa", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Colsassa);
const Triellus = L.marker([-95.31, 169.90], { icon: planetIcon }).bindTooltip("Triellus", { permanent: true, direction: 'left', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Triellus);
const Engira = L.marker([-94.02, 170.20], { icon: planetIcon }).bindTooltip("Engira", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Engira);
const Forscan = L.marker([-92.34, 170.21], { icon: planetIcon }).bindTooltip("Forscan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Forscan);
const Moorjhone = L.marker([-93.53, 170.25], { icon: planetIcon }).bindTooltip("Moorjhone", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Moorjhone);
const Urkupp = L.marker([-92.14, 170.29], { icon: planetIcon }).bindTooltip("Urkupp", { permanent: true, direction: 'right', offset: [-2, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Urkupp);
const Keedad = L.marker([-92.87, 170.34], { icon: planetIcon }).bindTooltip("Keedad", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Keedad);
const Gnithia = L.marker([-96.38, 170.34], { icon: planetIcon }).bindTooltip("Gnithia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gnithia);
const SyMyrth = L.marker([-95.33, 170.45], { icon: planetIcon }).bindTooltip("Sy Myrth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(SyMyrth);
const Pzandias = L.marker([-98.25, 170.56], { icon: planetIcon }).bindTooltip("Pzandias", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pzandias);
const Khoan = L.marker([-97.28, 170.69], { icon: planetIcon }).bindTooltip("Khoan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Khoan);
const ParabawSta = L.marker([-93.87, 170.86], { icon: statonIcon }).bindTooltip("Parabaw Sta.", { permanent: true, direction: 'right', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ParabawSta);
const Repea = L.marker([-92.25, 171.11], { icon: planetIcon }).bindTooltip("Repea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Repea);
const Kile = L.marker([-96.36, 171.14], { icon: planetIcon }).bindTooltip("Kile", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Kile);
const OrdZat = L.marker([-94.89, 171.23], { icon: planetIcon }).bindTooltip("Ord Zat", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdZat);
const Ramsir = L.marker([-93.56, 171.28], { icon: planetIcon }).bindTooltip("Ramsir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ramsir);
const ColundaPr = L.marker([-98.21, 171.50], { icon: planetIcon }).bindTooltip("COLUNDA PRIME", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ColundaPr);
const OrixonN = L.marker([-97.48, 171.78], { icon: nebIconBlk }).bindTooltip("Orixon N. (Kashi)", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrixonN);
const Nyasko = L.marker([-98.42, 171.84], { icon: planetIcon }).bindTooltip("Nyasko", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nyasko);
const AldoSpach = L.marker([-93.25, 171.86], { icon: planetIcon }).bindTooltip("Aldo Spach", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(AldoSpach);
const Vunakia = L.marker([-97.19, 171.89], { icon: planetIcon }).bindTooltip("Vunakia", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vunakia);
const Talvaria = L.marker([-95.61, 171.91], { icon: planetIcon }).bindTooltip("Talvaria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Talvaria);
const Naldar = L.marker([-94.11, 171.92], { icon: planetIcon }).bindTooltip("Naldar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Naldar);
const Alliga = L.marker([-96.92, 171.92], { icon: planetIcon }).bindTooltip("Alliga", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Alliga);
const PhinelsFolly = L.marker([-92.28, 172.43], { icon: planetIcon }).bindTooltip("Phinel's Folly", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PhinelsFolly);
const Zabian = L.marker([-94.84, 172.70], { icon: planetIcon }).bindTooltip("Zabian", { permanent: true, direction: 'left', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Zabian);
const HologramFunWo = L.marker([-94.90, 172.86], { icon: statonIcon }).bindTooltip("Hologram Fun World", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(HologramFunWo);
const Harda = L.marker([-96.17, 172.86], { icon: planetIcon }).bindTooltip("Harda", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Harda);
const Handooine = L.marker([-95.42, 172.87], { icon: planetIcon }).bindTooltip("Handooine (Gwynhes)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Handooine);
const SunderedVeilN = L.marker([-97.16, 172.91], { icon: nebIconBlk }).bindTooltip("Sundered Veil N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(SunderedVeilN);
const Sulorine = L.marker([-98.23, 173.12], { icon: planetIcon }).bindTooltip("Sulorine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Sulorine);
const Trasemene = L.marker([-95.89, 173.28], { icon: planetIcon }).bindTooltip("Trasemene", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Trasemene);
const Xuaquarres = L.marker([-94.37, 173.45], { icon: planetIcon }).bindTooltip("Xuaquarres", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Xuaquarres);
const Wyndigal = L.marker([-92.68, 173.83], { icon: planetIcon }).bindTooltip("Wyndigal (Huronom)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Wyndigal);
const Daronak = L.marker([-95.17, 173.94], { icon: planetIcon }).bindTooltip("Daronak", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Daronak);
const Jabiim = L.marker([-96.80, 174.03], { icon: planetIcon }).bindTooltip("Jabiim (Gwynhes Minor)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Jabiim);
const KyryllsWorld = L.marker([-96.15, 174.20], { icon: planetIcon }).bindTooltip("Kyryll's World", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(KyryllsWorld);
const Taskeed = L.marker([-98.03, 174.25], { icon: planetIcon }).bindTooltip("Taskeed", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Taskeed);
const Haashimut = L.marker([-92.25, 175.00], { icon: planetIcon }).bindTooltip("Haashimut", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Haashimut);
const Altratonne = L.marker([-94.43, 175.05], { icon: planetIcon }).bindTooltip("Altratonne (Kveror)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Altratonne);
const Maccent = L.marker([-96.76, 175.11], { icon: planetIcon }).bindTooltip("Maccent", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Maccent);
const Elkkasinn = L.marker([-96.40, 175.16], { icon: planetIcon }).bindTooltip("Elkkasinn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Elkkasinn);
const Nalyd = L.marker([-97.01, 175.25], { icon: planetIcon }).bindTooltip("Nalyd", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nalyd);
const Gligger = L.marker([-95.78, 175.47], { icon: planetIcon }).bindTooltip("Gligger", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gligger);
const Abyss = L.marker([-93.03, 176.19], { icon: planetIcon }).bindTooltip("Abyss", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Abyss);
const Keldimar = L.marker([-97.58, 176.50], { icon: planetIcon }).bindTooltip("Keldimar", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Keldimar);
const OHS384203 = L.marker([-94.02, 177.45], { icon: planetIcon }).bindTooltip("OHS3842-03 (Astigone)", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OHS384203);
const Agon = L.marker([-95.55, 177.85], { icon: planetIcon }).bindTooltip("Agon (Turallon)", { permanent: true, direction: 'right', offset: [-2, 7], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Agon);
const OHS178203 = L.marker([-96.64, 177.95], { icon: planetIcon }).bindTooltip("OHS1782-03 (Xoraes)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OHS178203);
const OHS414002 = L.marker([-93.00, 178.04], { icon: planetIcon }).bindTooltip("OHS4140-02 (Balshebr)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OHS414002);
const Jubilar = L.marker([-97.41, 178.13], { icon: planetIcon }).bindTooltip("Jubilar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jubilar);
const ExtricariumN = L.marker([-95.36, 178.37], { icon: nebIconBlk }).bindTooltip("Extricarium N.", { permanent: true, direction: 'left', offset: [1, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(ExtricariumN);
const Iego = L.marker([-95.35, 178.67], { icon: planetIcon }).bindTooltip("Iego (Maelibo)", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Iego);
const Cophrigin = L.marker([-94.30, 178.82], { icon: planetIcon }).bindTooltip("Cophrigin", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cophrigin);
const Nyny = L.marker([-93.84, 179.26], { icon: planetIcon }).bindTooltip("Nyny", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nyny);
const Hardex = L.marker([-98.36, 179.28], { icon: planetIcon }).bindTooltip("Hardex", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hardex);
const Yaled = L.marker([-97.82, 179.87], { icon: planetIcon }).bindTooltip("Yaled", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Yaled);
const Nixus = L.marker([-96.28, 181.01], { icon: planetIcon }).bindTooltip("Nixus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nixus);
const Uriek = L.marker([-95.49, 181.43], { icon: planetIcon }).bindTooltip("Uriek", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Uriek);
const OHS213204 = L.marker([-92.14, 181.84], { icon: planetIcon }).bindTooltip("OHS2132-04 (Ulonsus)", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OHS213204);
const ToongL = L.marker([-96.83, 182.53], { icon: planetIcon }).bindTooltip("Toong'l", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ToongL);
const Chiron = L.marker([-94.75, 182.88], { icon: planetIcon }).bindTooltip("Chiron", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Chiron);
const Poseidenna = L.marker([-92.64, 183.57], { icon: planetIcon }).bindTooltip("Poseidenna", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Poseidenna);
const Trailia = L.marker([-93.38, 183.59], { icon: planetIcon }).bindTooltip("Trailia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Trailia);
const Moldour = L.marker([-95.96, 183.82], { icon: planetIcon }).bindTooltip("Moldour", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Moldour);
const Benwabula = L.marker([-97.55, 183.90], { icon: planetIcon }).bindTooltip("Benwabula", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Benwabula);
const Dominus = L.marker([-95.01, 184.03], { icon: planetIcon }).bindTooltip("Dominus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dominus);
const Atollon = L.marker([-93.74, 184.26], { icon: planetIcon }).bindTooltip("Atollon*", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }).addTo(map);
const Ruac = L.marker([-95.52, 184.29], { icon: planetIcon }).bindTooltip("Ruac", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ruac);
const Taral = L.marker([-92.19, 184.75], { icon: planetIcon }).bindTooltip("Taral", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Taral);
const Solanus = L.marker([-97.14, 184.78], { icon: planetIcon }).bindTooltip("Solanus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Solanus);
const Solay = L.marker([-93.23, 184.82], { icon: planetIcon }).bindTooltip("Solay", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Solay);
const Sanctuary = L.marker([-92.56, 184.90], { icon: planetIcon }).bindTooltip("Sanctuary", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sanctuary);
const ArcheonN = L.marker([-94.28, 184.89], { icon: nebIconBlk }).bindTooltip("Archeon N.", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ArcheonN);
const Kamdon = L.marker([-92.84, 185.45], { icon: planetIcon }).bindTooltip("Kamdon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kamdon);
const DarkN = L.marker([-95.67, 185.45], { icon: nebIconBlk }).bindTooltip("Dark N.", { permanent: true, direction: 'right', offset: [-1, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(DarkN);
const Oon = L.marker([-93.69, 185.59], { icon: planetIcon }).bindTooltip("Oon", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Oon);
const Garel = L.marker([-94.42, 185.86], { icon: planetIcon }).bindTooltip("Garel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Garel);
const Lothal = L.marker([-93.22, 186.03], { icon: pltIconCan }).bindTooltip("Lothal", { permanent: true, direction: 'left', offset: [-2, -7], className: 'leaflet-tooltip    ' }).bindPopup(LothalPopup, customOptions).addTo(map);
const Dornea = L.marker([-93.44, 186.28], { icon: planetIcon }).bindTooltip("Dornea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dornea);
const Baros = L.marker([-95.31, 186.50], { icon: planetIcon }).bindTooltip("Baros", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Baros);
const Targonn = L.marker([-97.78, 187.20], { icon: planetIcon }).bindTooltip("Targonn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Targonn);
const Bulwark = L.marker([-92.31, 187.68], { icon: planetIcon }).bindTooltip("Bulwark", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bulwark);
const LiraSanN = L.marker([-98.07, 187.75], { icon: nebIconBlk }).bindTooltip("Lira San N.*", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(LiraSanN);
const LiraSan = L.marker([-98.36, 189.47], { icon: planetIcon }).bindTooltip("Lira San*", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
//======================================== row 08 ===== EXEGOL ===========================
const Tililix = L.marker([-101.42, 78.92], { icon: planetIcon }).bindTooltip("Tililix", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tililix);
const BogoRai = L.marker([-104.99, 80.96], { icon: planetIcon }).bindTooltip("Bogo Rai", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(BogoRai);
const Kinoss = L.marker([-103.72, 82.31], { icon: planetIcon }).bindTooltip("Kinoss", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kinoss);
const Oyokal = L.marker([-104.70, 83.63], { icon: planetIcon }).bindTooltip("Oyokal", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Oyokal);
const Thearterra = L.marker([-102.83, 84.27], { icon: planetIcon }).bindTooltip("Thearterra", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thearterra);
const Ool = L.marker([-104.06, 84.27], { icon: planetIcon }).bindTooltip("Ool", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ool);
const Exegol = L.marker([-99.20, 84.29], { icon: pltIconCan2 }).bindTooltip("Exegol (Ixigul)", { permanent: true, direction: 'left', offset: [-6, -1], className: 'leaflet-tooltip-mov' }).bindPopup(ExegolPopup, customOptions).addTo(map);
const Shihon = L.marker([-104.45, 84.35], { icon: planetIcon }).bindTooltip("Shihon", { permanent: true, direction: 'right', offset: [0, 6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Shihon);
const Avidich = L.marker([-103.83, 84.91], { icon: planetIcon }).bindTooltip("Avidich", { permanent: true, direction: 'left', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Avidich);
const Csilla = L.marker([-103.77, 86.12], { icon: pltIconCan }).bindTooltip("Csilla", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).bindPopup(CsillaPopup, customOptions).addTo(map);
const Sposia = L.marker([-102.45, 86.18], { icon: planetIcon }).bindTooltip("Sposia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sposia);
const ColonialCamCo = L.marker([-100.30, 86.20], { icon: planetIcon }).bindTooltip("Colonial Station Cam'co", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ColonialCamCo);
const Cioral = L.marker([-104.16, 86.25], { icon: planetIcon }).bindTooltip("Cioral", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cioral);
const Jamiron = L.marker([-102.98, 86.36], { icon: planetIcon }).bindTooltip("Jamiron", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jamiron);
const Rentor = L.marker([-103.34, 86.69], { icon: planetIcon }).bindTooltip("Rentor", { permanent: true, direction: 'right', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rentor);
const Naporar = L.marker([-101.84, 86.84], { icon: planetIcon }).bindTooltip("Naporar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Naporar);
const Schesa = L.marker([-100.72, 88.26], { icon: planetIcon }).bindTooltip("Schesa", { permanent: true, direction: 'left', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Schesa);
const Noris = L.marker([-101.08, 88.27], { icon: planetIcon }).bindTooltip("Noris", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Noris);
const Cormit = L.marker([-104.42, 88.34], { icon: planetIcon }).bindTooltip("Cormit", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cormit);
const Ornfra = L.marker([-101.78, 88.40], { icon: planetIcon }).bindTooltip("Ornfra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ornfra);
const Sharb = L.marker([-101.30, 88.88], { icon: planetIcon }).bindTooltip("Sharb", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sharb);
const Celwis = L.marker([-104.60, 90.63], { icon: planetIcon }).bindTooltip("Celwis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Celwis);
const Catlia = L.marker([-102.46, 92.24], { icon: planetIcon }).bindTooltip("Catlia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Catlia);
const PlunderMoon = L.marker([-99.66, 93.83], { icon: planetIcon }).bindTooltip("Plunder Moon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PlunderMoon);
const TheBlackHole = L.marker([-99.53, 93.88], { icon: blkhleIcon }).bindTooltip("The Black Hole", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TheBlackHole);
const Pesfavri = L.marker([-99.25, 96.63], { icon: planetIcon }).bindTooltip("Pesfavri", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pesfavri);
const Mother = L.marker([-102.77, 97.50], { icon: statonIcon }).bindTooltip("Mother", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Mother);
const Massoss = L.marker([-100.45, 97.72], { icon: planetIcon }).bindTooltip("Massoss", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Massoss);
const Thrago = L.marker([-100.73, 100.64], { icon: planetIcon }).bindTooltip("Thrago", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thrago);
const Forbelea = L.marker([-100.28, 101.14], { icon: planetIcon }).bindTooltip("Forbelea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Forbelea);
const Geroon = L.marker([-100.45, 105.30], { icon: planetIcon }).bindTooltip("Geroon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Woteba = L.marker([-99.56, 105.78], { icon: planetIcon }).bindTooltip("Woteba", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Woteba);
const TuskensEye = L.marker([-99.17, 105.87], { icon: planetIcon }).bindTooltip("Tusken's Eye", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(TuskensEye);
const UtegetuN = L.marker([-99.40, 105.91], { icon: nebIconBlk }).bindTooltip("Utegetu N.", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(UtegetuN);
const Tenupe = L.marker([-99.52, 105.94], { icon: planetIcon }).bindTooltip("Tenupe", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tenupe);
const Sarm = L.marker([-99.38, 106.08], { icon: planetIcon }).bindTooltip("Sarm", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sarm);
const Kilia = L.marker([-104.02, 106.19], { icon: planetIcon }).bindTooltip("Kilia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Kilia);
const Gargolyn = L.marker([-100.31, 107.33], { icon: planetIcon }).bindTooltip("Gargolyn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gargolyn);
const Wizar = L.marker([-101.03, 108.12], { icon: planetIcon }).bindTooltip("Wizar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Wizar);
const KurMinor = L.marker([-99.14, 108.50], { icon: planetIcon }).bindTooltip("Kur Minor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(KurMinor);
const Celdaru = L.marker([-99.90, 109.05], { icon: planetIcon }).bindTooltip("Celdaru", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Celdaru);
const MendicatSta = L.marker([-100.78, 109.25], { icon: statonIcon }).bindTooltip("Mendicat Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(MendicatSta);
const Escabar = L.marker([-100.18, 109.59], { icon: planetIcon }).bindTooltip("Escabar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Escabar);
const Roxuli = L.marker([-101.25, 109.95], { icon: planetIcon }).bindTooltip("Roxuli", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Roxuli);
const Thedavio = L.marker([-98.80, 110.11], { icon: planetIcon }).bindTooltip("Thedavio", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Thedavio);
const Dhandu = L.marker([-101.35, 111.16], { icon: planetIcon }).bindTooltip("Dhandu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dhandu);
const Horob = L.marker([-99.33, 111.30], { icon: planetIcon }).bindTooltip("Horob", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Horob);
const Kashir = L.marker([-100.68, 111.75], { icon: planetIcon }).bindTooltip("Kashir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kashir);
const Soun = L.marker([-102.21, 111.76], { icon: planetIcon }).bindTooltip("Soun", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Soun);
const Vardoss = L.marker([-99.59, 111.98], { icon: planetIcon }).bindTooltip("Vardoss", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vardoss);
const IchalinSta = L.marker([-101.30, 112.87], { icon: statonIcon }).bindTooltip("Ichalin Sta.", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(IchalinSta);
const OakaPr = L.marker([-101.93, 113.12], { icon: planetIcon }).bindTooltip("Oaka Prime", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OakaPr);
const Hijo = L.marker([-100.47, 113.41], { icon: planetIcon }).bindTooltip("Hijo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Hijo);
const Neshei = L.marker([-99.42, 113.42], { icon: planetIcon }).bindTooltip("Neshei", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Neshei);
const Belassar = L.marker([-99.89, 114.61], { icon: planetIcon }).bindTooltip("Belassar", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Belassar);
const Loth = L.marker([-100.95, 114.76], { icon: planetIcon }).bindTooltip("Loth", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Loth);
const Dorin = L.marker([-99.23, 115.38], { icon: pltIconCaL }).bindTooltip("Dorin", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(DorinPopup, customOptions).addTo(map);
const CothFuurasSta = L.marker([-99.69, 115.84], { icon: statonIcon }).bindTooltip("Coth Fuuras Sta.", { permanent: true, direction: 'left', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(CothFuurasSta);
const Fyrth = L.marker([-101.39, 116.00], { icon: planetIcon }).bindTooltip("Fyrth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fyrth);
const Reecee = L.marker([-104.85, 116.02], { icon: planetIcon }).bindTooltip("Reecee", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Rondai = L.marker([-100.45, 116.31], { icon: planetIcon }).bindTooltip("Rondai", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rondai);
const Bilbringi = L.marker([-101.14, 116.83], { icon: staIconCaL }).bindTooltip("Bilbringi", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(BilbringiPopup, customOptions).addTo(map);
const OrdMeglumine = L.marker([-102.13, 116.86], { icon: planetIcon }).bindTooltip("Ord Meglumine", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdMeglumine);
const Ryborea = L.marker([-98.68, 117.09], { icon: planetIcon }).bindTooltip("Ryborea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ryborea);
const Rafft = L.marker([-104.64, 117.09], { icon: planetIcon }).bindTooltip("Rafft", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rafft);
const Aramal = L.marker([-99.66, 117.51], { icon: planetIcon }).bindTooltip("Aramal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Aramal);
const Bengat = L.marker([-101.43, 117.52], { icon: planetIcon }).bindTooltip("Bengat", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bengat);
const XT987 = L.marker([-101.93, 117.77], { icon: planetIcon }).bindTooltip("XT987", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(XT987);
const Aphran = L.marker([-102.11, 118.34], { icon: planetIcon }).bindTooltip("Aphran", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Aphran);
const Doshan = L.marker([-99.70, 118.48], { icon: planetIcon }).bindTooltip("Doshan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Doshan);
const Meastrinnar = L.marker([-102.43, 118.56], { icon: planetIcon }).bindTooltip("Meastrinnar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Meastrinnar);
const Voltare = L.marker([-102.84, 118.67], { icon: planetIcon }).bindTooltip("Voltare", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Voltare);
const Neshtab = L.marker([-101.78, 118.75], { icon: planetIcon }).bindTooltip("Neshtab", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Neshtab);
const Carratos = L.marker([-103.47, 118.81], { icon: planetIcon }).bindTooltip("Carratos", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Carratos);
const Paig = L.marker([-99.03, 119.16], { icon: planetIcon }).bindTooltip("Paig", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Paig);
const Mittoblade = L.marker([-101.43, 119.43], { icon: planetIcon }).bindTooltip("Mittoblade", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mittoblade);
const Tharin = L.marker([-104.22, 119.44], { icon: planetIcon }).bindTooltip("Tharin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tharin);
const Muzara = L.marker([-99.84, 119.74], { icon: planetIcon }).bindTooltip("Muzara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Muzara);
const Brightday = L.marker([-100.81, 120.09], { icon: planetIcon }).bindTooltip("Brightday", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Brightday);
const Yetnis = L.marker([-102.95, 119.88], { icon: planetIcon }).bindTooltip("Yetnis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Yetnis);
const UpprBrightday = L.marker([-100.42, 120.09], { icon: planetIcon }).bindTooltip("Upper Brightday", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(UpprBrightday);
const Drannik = L.marker([-99.38, 120.30], { icon: planetIcon }).bindTooltip("Drannik", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Drannik);
const SifUwana = L.marker([-104.42, 120.31], { icon: planetIcon }).bindTooltip("Sif-Uwana", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(SifUwana);
const Osara = L.marker([-103.41, 120.69], { icon: planetIcon }).bindTooltip("Osara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Osara);
const Barenth = L.marker([-99.19, 120.88], { icon: planetIcon }).bindTooltip("Barenth", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Barenth);
const SifAlula = L.marker([-100.19, 121.12], { icon: planetIcon }).bindTooltip("Sif-Alula", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(SifAlula);
const Protogeyser = L.marker([-102.88, 121.28], { icon: planetIcon }).bindTooltip("Protogeyser", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Protogeyser);
const DixThaar = L.marker([-101.95, 121.41], { icon: planetIcon }).bindTooltip("Dix'thaar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(DixThaar);
const Waymancy = L.marker([-101.16, 121.43], { icon: planetIcon }).bindTooltip("Waymancy", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Waymancy);
const Vorian = L.marker([-100.08, 121.52], { icon: planetIcon }).bindTooltip("Vorian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Vorian);
const Gavana = L.marker([-103.72, 121.89], { icon: planetIcon }).bindTooltip("Gavana", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gavana);
const Anduvia = L.marker([-100.48, 123.08], { icon: planetIcon }).bindTooltip("Anduvia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Anduvia);
const Condor = L.marker([-102.59, 123.36], { icon: planetIcon }).bindTooltip("Condor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Condor);
const Caursito = L.marker([-104.76, 123.38], { icon: planetIcon }).bindTooltip("Caursito", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Caursito);
const Sooncanoo = L.marker([-101.20, 123.48], { icon: planetIcon }).bindTooltip("Sooncanoo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sooncanoo);
const Meldazar = L.marker([-99.52, 123.85], { icon: planetIcon }).bindTooltip("Meldazar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Meldazar);
const Gultanna = L.marker([-98.84, 123.87], { icon: planetIcon }).bindTooltip("Gultanna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gultanna);
const TheWhirl = L.marker([-103.12, 123.94], { icon: pheIconBlk }).bindTooltip("The Whirl", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TheWhirl);
const Immalia = L.marker([-100.73, 124.23], { icon: planetIcon }).bindTooltip("Immalia", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Immalia);
const Tantara = L.marker([-102.42, 124.48], { icon: planetIcon }).bindTooltip("Tantara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tantara);
const Arsteni = L.marker([-103.45, 124.94], { icon: planetIcon }).bindTooltip("Arsteni", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Arsteni);
const Setor = L.marker([-105.03, 125.02], { icon: planetIcon }).bindTooltip("Setor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Setor);
const Nyara = L.marker([-101.34, 125.13], { icon: planetIcon }).bindTooltip("Nyara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nyara);
const Baradas = L.marker([-104.16, 125.21], { icon: planetIcon }).bindTooltip("Baradas", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Baradas);
const Bevell = L.marker([-102.65, 125.27], { icon: planetIcon }).bindTooltip("Bevell", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bevell);
const Amador = L.marker([-100.71, 125.27], { icon: planetIcon }).bindTooltip("Amador / Mayvitch", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Amador);
const OrdLithone = L.marker([-101.05, 125.32], { icon: planetIcon }).bindTooltip("Ord Lithone", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdLithone);
const MaunDigitalis = L.marker([-103.88, 126.11], { icon: planetIcon }).bindTooltip("Maun Digitalis", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(MaunDigitalis);
const OrdAntalaha = L.marker([-105.04, 126.23], { icon: planetIcon }).bindTooltip("Ord Antalaha", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdAntalaha);
const YirTangee = L.marker([-103.48, 126.61], { icon: planetIcon }).bindTooltip("Yir Tangee", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(YirTangee);
const Dressia = L.marker([-104.23, 126.78], { icon: planetIcon }).bindTooltip("Dressia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dressia);
const Yinchorr = L.marker([-100.12, 126.86], { icon: planetIcon }).bindTooltip("Yinchorr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Yinchorr);
const Avedot = L.marker([-104.45, 127.08], { icon: planetIcon }).bindTooltip("Avedot", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Avedot);
const GoldenNyss = L.marker([-99.31, 127.56], { icon: planetIcon }).bindTooltip("Golden Nyss", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(GoldenNyss);
const Tyberious = L.marker([-101.93, 127.63], { icon: planetIcon }).bindTooltip("Tyberious", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tyberious);
const Balaidas = L.marker([-103.73, 127.69], { icon: planetIcon }).bindTooltip("Balaidas", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Balaidas);
const Barlok = L.marker([-103.00, 127.74], { icon: planetIcon }).bindTooltip("Barlok", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Barlok);
const Arcura = L.marker([-101.72, 127.76], { icon: planetIcon }).bindTooltip("Arcura", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Arcura);
const Milvayne = L.marker([-101.80, 127.94], { icon: planetIcon }).bindTooltip("Milvayne", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Milvayne);
const Noctralis = L.marker([-100.34, 128.28], { icon: planetIcon }).bindTooltip("Noctralis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Noctralis);
const Datar = L.marker([-101.14, 128.36], { icon: planetIcon }).bindTooltip("Datar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Datar);
const Julio = L.marker([-102.85, 128.73], { icon: planetIcon }).bindTooltip("Julio", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Julio);
const Nierport = L.marker([-104.16, 128.86], { icon: planetIcon }).bindTooltip("Nierport", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Nierport);
const Norclune = L.marker([-104.60, 129.06], { icon: planetIcon }).bindTooltip("Norclune", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Norclune);
const Wyloff = L.marker([-104.32, 129.20], { icon: planetIcon }).bindTooltip("Wyloff", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Wyloff);
const Shili = L.marker([-99.40, 129.30], { icon: planetIcon }).bindTooltip("Shili", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Shili);
const Vorrnti = L.marker([-102.06, 129.32], { icon: planetIcon }).bindTooltip("Vorrnti", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vorrnti);
const Champala = L.marker([-103.22, 129.37], { icon: planetIcon }).bindTooltip("Champala", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Champala);
const Wynth = L.marker([-104.06, 129.84], { icon: planetIcon }).bindTooltip("Wynth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Wynth);
const Drearia = L.marker([-102.48, 129.87], { icon: planetIcon }).bindTooltip("Drearia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Drearia);
const Tedel = L.marker([-99.99, 129.88], { icon: planetIcon }).bindTooltip("Tedel", { permanent: true, direction: 'right', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tedel);
const Kiros = L.marker([-99.38, 129.93], { icon: planetIcon }).bindTooltip("Kiros", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kiros);
const PerLupelo = L.marker([-101.69, 130.35], { icon: planetIcon }).bindTooltip("Per Lupelo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PerLupelo);
const Nieuth = L.marker([-104.89, 130.41], { icon: planetIcon }).bindTooltip("Nieuth", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nieuth);
const Paqualis = L.marker([-100.90, 130.88], { icon: planetIcon }).bindTooltip("Paqualis", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }).addTo(map);
const Kluistar = L.marker([-104.55, 131.45], { icon: planetIcon }).bindTooltip("Kluistar", { permanent: true, direction: 'right', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kluistar);
const Yaka = L.marker([-105.05, 131.61], { icon: planetIcon }).bindTooltip("Yaka", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Yaka);
const Hindasar = L.marker([-98.89, 131.63], { icon: planetIcon }).bindTooltip("Hindasar", { permanent: true, direction: 'left', offset: [0, 1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hindasar);
const Arkania = L.marker([-105.11, 131.81], { icon: pltIconCaL }).bindTooltip("Arkania", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(ArkaniaPopup, customOptions).addTo(map);
const Koovis = L.marker([-102.91, 131.00], { icon: planetIcon }).bindTooltip("Koovis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Koovis);
const Sljee = L.marker([-99.40, 131.42], { icon: planetIcon }).bindTooltip("Sljee", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Sljee);
const Bogden = L.marker([-100.20, 131.45], { icon: planetIcon }).bindTooltip("Bogden", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bogden);
const Quint = L.marker([-102.61, 131.75], { icon: planetIcon }).bindTooltip("Quint", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Quint);
const Silversisi = L.marker([-101.86, 132.03], { icon: planetIcon }).bindTooltip("Silversisi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Silversisi);
const Nessem = L.marker([-99.52, 132.13], { icon: planetIcon }).bindTooltip("Nessem", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nessem);
const Gannymeda = L.marker([-103.97, 132.28], { icon: planetIcon }).bindTooltip("Gannymeda", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gannymeda);
const Kidriff = L.marker([-99.13, 132.56], { icon: planetIcon }).bindTooltip("Kidriff", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kidriff);
const Doldrums = L.marker([-104.72, 132.69], { icon: planetIcon }).bindTooltip("Doldrums", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Doldrums);
const Uphrades = L.marker([-102.73, 132.91], { icon: planetIcon }).bindTooltip("Uphrades", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Uphrades);
const CaulusTertius = L.marker([-103.17, 132.92], { icon: planetIcon }).bindTooltip("Caulus Tertius", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(CaulusTertius);
const Omonoth = L.marker([-104.69, 132.97], { icon: planetIcon }).bindTooltip("Omonoth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Omonoth);
const Novar = L.marker([-99.55, 133.16], { icon: planetIcon }).bindTooltip("Novar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Novar);
const MilVelay = L.marker([-102.95, 133.58], { icon: planetIcon }).bindTooltip("Mil Velay", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(MilVelay);
const Mindor = L.marker([-102.05, 133.88], { icon: planetIcon }).bindTooltip("Mindor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Mindor);
const Xend = L.marker([-100.91, 133.92], { icon: planetIcon }).bindTooltip("Xend", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Xend);
const Berchest = L.marker([-103.25, 138.38], { icon: pltIconCaL }).bindTooltip("Berchest", { permanent: true, direction: 'right', offset: [3, -4], className: 'leaflet-tooltip    ' }).bindPopup(BerchestPopup, customOptions).addTo(map);
const Gorobei = L.marker([-100.42, 134.42], { icon: planetIcon }).bindTooltip("Gorobei", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Gorobei);
const Jazbina = L.marker([-98.98, 134.56], { icon: planetIcon }).bindTooltip("Jazbina", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jazbina);
const PaminaPr = L.marker([-104.09, 134.63], { icon: planetIcon }).bindTooltip("Pamina Prime", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PaminaPr);
const Ejolus = L.marker([-99.47, 134.69], { icon: planetIcon }).bindTooltip("Ejolus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ejolus);
const Mantessa = L.marker([-103.27, 135.02], { icon: planetIcon }).bindTooltip("Mantessa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Mantessa);
const Dubloviann = L.marker([-101.47, 135.72], { icon: planetIcon }).bindTooltip("Dubloviann", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dubloviann);
const Hijarna = L.marker([-104.80, 135.95], { icon: planetIcon }).bindTooltip("Hijarna", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hijarna);
const Kimanan = L.marker([-104.44, 136.23], { icon: planetIcon }).bindTooltip("Kimanan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kimanan);
const Poderis = L.marker([-103.98, 136.42], { icon: planetIcon }).bindTooltip("Poderis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Poderis);
const Salmagodro = L.marker([-101.20, 136.58], { icon: planetIcon }).bindTooltip("Salmagodro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Salmagodro);
const Joiol = L.marker([-104.98, 136.86], { icon: planetIcon }).bindTooltip("Joiol", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Joiol);
const Almera = L.marker([-102.23, 137.38], { icon: planetIcon }).bindTooltip("Almera", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Almera);
const DagaryMin = L.marker([-99.72, 137.33], { icon: planetIcon }).bindTooltip("Dagary Minor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(DagaryMin);
const Thyrsus = L.marker([-101.80, 137.63], { icon: planetIcon }).bindTooltip("Thyrsus", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thyrsus);
const Bengali = L.marker([-101.64, 137.70], { icon: planetIcon }).bindTooltip("Bengali", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bengali);
const Chazwa = L.marker([-104.66, 137.72], { icon: planetIcon }).bindTooltip("Chazwa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Chazwa);
const LittleAtullus = L.marker([-103.70, 137.89], { icon: planetIcon }).bindTooltip("Little Atullus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(LittleAtullus);
const Nouane = L.marker([-99.03, 137.98], { icon: planetIcon }).bindTooltip("Nouane", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Nouane);
const Eshan = L.marker([-102.11, 138.00], { icon: planetIcon }).bindTooltip("Eshan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Eshan);
const Phateem = L.marker([-99.69, 138.44], { icon: planetIcon }).bindTooltip("Phateem", { permanent: true, direction: 'right', offset: [0, -8], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Phateem);
const Rigovia = L.marker([-104.58, 138.75], { icon: planetIcon }).bindTooltip("Rigovia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rigovia);
const Dwartii = L.marker([-99.77, 139.16], { icon: planetIcon }).bindTooltip("Dwartii", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Dwartii);
const SabRufo = L.marker([-100.16, 139.17], { icon: planetIcon }).bindTooltip("Sab Rufo", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(SabRufo);
const Relatta = L.marker([-104.13, 139.41], { icon: planetIcon }).bindTooltip("Relatta", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Relatta);
const Gantonnerre = L.marker([-100.66, 139.55], { icon: planetIcon }).bindTooltip("Gantonnerre", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gantonnerre);
const Tyrusia = L.marker([-103.02, 139.59], { icon: planetIcon }).bindTooltip("Tyrusia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tyrusia);
const Nolar = L.marker([-103.64, 140.22], { icon: planetIcon }).bindTooltip("Nolar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nolar);
const Filordis = L.marker([-102.03, 140.31], { icon: planetIcon }).bindTooltip("Filordis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Filordis);
const CosmsWellCl = L.marker([-104.45, 140.66], { icon: clustrIcon }).bindTooltip("Cosm's Well Cl. (+5)", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(CosmsWellCl);
const Zekulae = L.marker([-104.80, 140.77], { icon: planetIcon }).bindTooltip("Zekulae (+2)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Zekulae);
const Juzzia = L.marker([-99.64, 140.89], { icon: planetIcon }).bindTooltip("Juzzia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Juzzia);
const Yantha = L.marker([-98.88, 141.52], { icon: planetIcon }).bindTooltip("Yantha", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Yantha);
const Levian = L.marker([-99.13, 141.61], { icon: planetIcon }).bindTooltip("Levian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Levian);
const Tirahn = L.marker([-103.83, 141.83], { icon: planetIcon }).bindTooltip("Tirahn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tirahn);
const Asrat = L.marker([-101.39, 142.48], { icon: planetIcon }).bindTooltip("Asrat", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Asrat);
const Lhosa = L.marker([-99.58, 143.08], { icon: planetIcon }).bindTooltip("Lhosa", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lhosa);
const Koaan = L.marker([-104.83, 143.08], { icon: planetIcon }).bindTooltip("Koaan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Koaan);
const Tandis = L.marker([-98.81, 143.70], { icon: planetIcon }).bindTooltip("Tandis", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tandis);
const ObroaSkai = L.marker([-100.31, 143.45], { icon: pltIconCaL }).bindTooltip("Obroa-skai", { permanent: true, direction: 'right', offset: [3, 0], className: 'leaflet-tooltip    ' }).bindPopup(ObroaSkaiPopup, customOptions).addTo(map);
const Carest = L.marker([-99.30, 143.81], { icon: planetIcon }).bindTooltip("Carest", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Carest);
const Matarri = L.marker([-101.31, 143.92], { icon: planetIcon }).bindTooltip("Matarri", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Matarri);
const Orchis = L.marker([-100.98, 144.19], { icon: planetIcon }).bindTooltip("Orchis", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Orchis);
const Pathandr = L.marker([-98.97, 144.42], { icon: planetIcon }).bindTooltip("Pathandr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pathandr);
const GarrLst = L.marker([-102.56, 144.63], { icon: planetIcon }).bindTooltip("Garr'lst", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(GarrLst);
const Mizra = L.marker([-101.42, 144.89], { icon: planetIcon }).bindTooltip("Mizra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Mizra);
const Chrona = L.marker([-100.55, 144.89], { icon: planetIcon }).bindTooltip("Chrona", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Chrona);
const Dalcretti = L.marker([-103.94, 145.09], { icon: planetIcon }).bindTooltip("Dalcretti", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dalcretti);
const Eislomi = L.marker([-99.36, 145.41], { icon: planetIcon }).bindTooltip("Eislomi (Eislo)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Eislomi);
const Paonid = L.marker([-100.70, 145.71], { icon: planetIcon }).bindTooltip("Paonid", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Paonid);
const Hoven = L.marker([-99.84, 145.77], { icon: planetIcon }).bindTooltip("Hoven", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hoven);
const Hapor = L.marker([-101.09, 146.00], { icon: planetIcon }).bindTooltip("Hapor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hapor);
const Korda = L.marker([-102.08, 146.14], { icon: planetIcon }).bindTooltip("Korda", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Korda);
const Pengalan = L.marker([-102.88, 146.42], { icon: planetIcon }).bindTooltip("Pengalan", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Pengalan);
const Amfar = L.marker([-101.48, 146.61], { icon: planetIcon }).bindTooltip("Amfar", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Amfar);
const Dentaria = L.marker([-100.14, 146.69], { icon: planetIcon }).bindTooltip("Dentaria", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dentaria);
const Gravan = L.marker([-101.11, 146.86], { icon: planetIcon }).bindTooltip("Gravan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gravan);
const Borloria = L.marker([-98.80, 146.95], { icon: planetIcon }).bindTooltip("Borloria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Borloria);
const Hasiki = L.marker([-102.20, 147.00], { icon: planetIcon }).bindTooltip("Hasiki", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hasiki);
const Avenel = L.marker([-104.41, 147.08], { icon: statonIcon }).bindTooltip("Avenel", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Avenel);
const Ratamesh = L.marker([-99.27, 147.20], { icon: planetIcon }).bindTooltip("Ratamesh", { permanent: true, direction: 'right', offset: [0, -7], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ratamesh);
const Clendor = L.marker([-103.70, 147.20], { icon: planetIcon }).bindTooltip("Clendor", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Clendor);
const Jendorn = L.marker([-99.38, 147.39], { icon: planetIcon }).bindTooltip("Jendorn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jendorn);
const Sorfina = L.marker([-103.42, 147.41], { icon: planetIcon }).bindTooltip("Sorfina", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sorfina);
const Farstey = L.marker([-100.47, 147.58], { icon: planetIcon }).bindTooltip("Farstey", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Farstey);
const Thisspias = L.marker([-100.20, 147.63], { icon: planetIcon }).bindTooltip("Thisspias", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thisspias);
const Taanab = L.marker([-104.42, 147.77], { icon: pltIconCaL }).bindTooltip("Taanab", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(TaanabPopup, customOptions).addTo(map);
const TheVeil = L.marker([-99.67, 148.13], { icon: nebIconBlk }).bindTooltip("The Veil", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TheVeil);
const Lerct = L.marker([-101.69, 148.06], { icon: planetIcon }).bindTooltip("Lerct", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lerct);
const Nexer = L.marker([-102.73, 148.09], { icon: planetIcon }).bindTooltip("Nexer", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nexer);
const Alpheridies = L.marker([-99.65, 148.34], { icon: planetIcon }).bindTooltip("Alpheridies", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Alpheridies);
const FaitDFait = L.marker([-98.75, 148.46], { icon: planetIcon }).bindTooltip("Fait d'Fait", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(FaitDFait);
const Quooria = L.marker([-100.85, 148.72], { icon: planetIcon }).bindTooltip("Quooria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Quooria);
const Sermeria = L.marker([-104.41, 148.97], { icon: planetIcon }).bindTooltip("Sermeria", { permanent: true, direction: 'left', offset: [0, 8], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Sermeria);
const Carcel = L.marker([-104.38, 149.31], { icon: planetIcon }).bindTooltip("Carcel", { permanent: true, direction: 'right', offset: [-4, -9], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Carcel);
const Cartao = L.marker([-102.30, 149.33], { icon: planetIcon }).bindTooltip("Cartao", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cartao);
const Venaari = L.marker([-99.41, 149.36], { icon: planetIcon }).bindTooltip("Venaari", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Venaari);
const Farsellah = L.marker([-101.09, 149.36], { icon: planetIcon }).bindTooltip("Farsellah", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Farsellah);
const VonAlai = L.marker([-101.75, 149.73], { icon: planetIcon }).bindTooltip("Von-Alai", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(VonAlai);
const Velex = L.marker([-102.47, 149.84], { icon: planetIcon }).bindTooltip("Velex", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Velex);
const Angeria = L.marker([-99.70, 149.94], { icon: planetIcon }).bindTooltip("Angeria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Angeria);
const Jweab = L.marker([-103.48, 149.97], { icon: planetIcon }).bindTooltip("Jweab", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jweab);
const Katarr = L.marker([-100.72, 150.00], { icon: planetIcon }).bindTooltip("Katarr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Katarr);
const Pirin = L.marker([-104.38, 150.13], { icon: planetIcon }).bindTooltip("Pirin", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pirin);
const Donovia = L.marker([-105.09, 150.45], { icon: planetIcon }).bindTooltip("Donovia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Donovia);
const TerAbbes = L.marker([-104.03, 150.69], { icon: planetIcon }).bindTooltip("Ter Abbes", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(TerAbbes);
const Contruum = L.marker([-102.89, 150.77], { icon: planetIcon }).bindTooltip("Contruum", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Contruum);
const Gizer = L.marker([-104.30, 151.48], { icon: planetIcon }).bindTooltip("Gizer", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gizer);
const Beauchen = L.marker([-99.77, 151.55], { icon: planetIcon }).bindTooltip("Beauchen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Beauchen);
const Bynarria = L.marker([-104.75, 152.09], { icon: planetIcon }).bindTooltip("Bynarria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bynarria);
const Vensor = L.marker([-101.02, 152.30], { icon: planetIcon }).bindTooltip("Vensor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vensor);
const Grimwald = L.marker([-101.97, 152.58], { icon: planetIcon }).bindTooltip("Grimwald", { permanent: true, direction: 'right', offset: [-2, -7], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Grimwald);
const Gascon = L.marker([-99.53, 152.61], { icon: planetIcon }).bindTooltip("Gascon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Gascon);
const Lantillies = L.marker([-103.75, 152.97], { icon: planetIcon }).bindTooltip("Lantillies", { permanent: true, direction: 'right', offset: [0, -7], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Lantillies);
const Fodurant = L.marker([-100.33, 153.09], { icon: planetIcon }).bindTooltip("Fodurant", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Fodurant);
const NewRalltiir = L.marker([-103.92, 153.69], { icon: planetIcon }).bindTooltip("New Ralltiir", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NewRalltiir);
const Azure = L.marker([-100.53, 154.05], { icon: planetIcon }).bindTooltip("Azure", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Azure);
const Ondara = L.marker([-102.55, 154.13], { icon: planetIcon }).bindTooltip("Ondara", { permanent: true, direction: 'right', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ondara);
const Phaseera = L.marker([-104.75, 154.39], { icon: planetIcon }).bindTooltip("Phaseera", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Phaseera);
const Dulathia = L.marker([-102.20, 154.45], { icon: planetIcon }).bindTooltip("Dulathia", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dulathia);
const Khorm = L.marker([-99.63, 155.42], { icon: planetIcon }).bindTooltip("Khorm", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Khorm);
const Rearqu = L.marker([-102.98, 156.45], { icon: planetIcon }).bindTooltip("Rearqu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rearqu);
const Daltarri = L.marker([-100.97, 156.78], { icon: planetIcon }).bindTooltip("Daltarri", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Daltarri);
const Pothor = L.marker([-102.06, 157.44], { icon: planetIcon }).bindTooltip("Pothor", { permanent: true, direction: 'left', offset: [3, -9], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pothor);
const LewEl = L.marker([-104.02, 157.55], { icon: planetIcon }).bindTooltip("Lew'el", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(LewEl);
const Gavryn = L.marker([-100.92, 158.30], { icon: planetIcon }).bindTooltip("Gavryn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gavryn);
const Jeyell = L.marker([-102.05, 158.31], { icon: planetIcon }).bindTooltip("Jeyell", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jeyell);
const Kostra = L.marker([-101.17, 158.59], { icon: planetIcon }).bindTooltip("Kostra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kostra);
const Shantipole = L.marker([-103.03, 158.66], { icon: planetIcon }).bindTooltip("Shantipole", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Shantipole);
const LowN = L.marker([-99.92, 158.70], { icon: planetIcon }).bindTooltip("Low'n", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(LowN);
const Roche = L.marker([-101.64, 159.31], { icon: planetIcon }).bindTooltip("Roche", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Roche);
const Fradian = L.marker([-100.97, 159.48], { icon: planetIcon }).bindTooltip("Fradian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fradian);
const Romin = L.marker([-99.53, 159.55], { icon: planetIcon }).bindTooltip("Romin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Romin);
const VaArt = L.marker([-101.83, 159.55], { icon: planetIcon }).bindTooltip("Va'art", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(VaArt);
const Lisal = L.marker([-103.34, 159.91], { icon: planetIcon }).bindTooltip("Lisal", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lisal);
const Quilan = L.marker([-100.30, 160.59], { icon: planetIcon }).bindTooltip("Quilan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Quilan);
const Thennqor = L.marker([-102.97, 160.66], { icon: planetIcon }).bindTooltip("Thennqor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Thennqor);
const Talesia = L.marker([-102.00, 160.80], { icon: planetIcon }).bindTooltip("Talesia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Talesia);
const Carbos = L.marker([-101.09, 161.00], { icon: planetIcon }).bindTooltip("Carbos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Carbos);
const Trasse = L.marker([-102.22, 161.19], { icon: planetIcon }).bindTooltip("Trasse", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Trasse);
const Orleon = L.marker([-99.86, 161.70], { icon: planetIcon }).bindTooltip("Orleon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Orleon);
const Endovan = L.marker([-104.16, 161.66], { icon: planetIcon }).bindTooltip("Endovan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Endovan);
const Torrad = L.marker([-98.86, 161.97], { icon: planetIcon }).bindTooltip("Torrad", { permanent: true, direction: 'left', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Torrad);
const Antolus = L.marker([-101.72, 162.17], { icon: planetIcon }).bindTooltip("Antolus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Antolus);
const Talcene = L.marker([-99.13, 162.48], { icon: planetIcon }).bindTooltip("Talcene", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Talcene);
const Anga = L.marker([-100.64, 162.58], { icon: planetIcon }).bindTooltip("Anga", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Anga);
const Salvara = L.marker([-98.80, 162.83], { icon: planetIcon }).bindTooltip("Salvara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Salvara);
const Sarka = L.marker([-101.94, 163.23], { icon: planetIcon }).bindTooltip("Sarka", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Sarka);
const GeskaPr = L.marker([-103.16, 163.53], { icon: planetIcon }).bindTooltip("Geska Prime", { permanent: true, direction: 'right', offset: [0, 1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(GeskaPr);
const Caramm = L.marker([-99.77, 164.39], { icon: planetIcon }).bindTooltip("Caramm", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Caramm);
const Metalorn = L.marker([-100.20, 164.55], { icon: planetIcon }).bindTooltip("Metalorn", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Metalorn);
const Vilosoria = L.marker([-102.77, 164.61], { icon: planetIcon }).bindTooltip("Vilosoria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vilosoria);
const Stronghold = L.marker([-104.86, 164.67], { icon: planetIcon }).bindTooltip("Stronghold", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Stronghold);
const Maltoria = L.marker([-103.39, 164.94], { icon: planetIcon }).bindTooltip("Maltoria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Maltoria);
const Deylerax = L.marker([-101.02, 165.09], { icon: planetIcon }).bindTooltip("Deylerax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Deylerax);
const Wobani = L.marker([-99.16, 165.37], { icon: pltIconCan2 }).bindTooltip("Wobani", { permanent: true, direction: 'left', offset: [-5, -3], className: 'leaflet-tooltip-mov' }).bindPopup(WobaniPopup, customOptions).addTo(map);
const Diado = L.marker([-103.89, 165.64], { icon: planetIcon }).bindTooltip("Diado", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Diado);
const Kijimi = L.marker([-100.34, 165.75], { icon: pltIconCan2 }).bindTooltip("Kijimi", { permanent: true, direction: 'left', offset: [-5, 6], className: 'leaflet-tooltip-mov' }).bindPopup(KijimiPopup, customOptions).addTo(map);
const Taria = L.marker([-102.30, 165.92], { icon: planetIcon }).bindTooltip("Taria", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Taria);
const Bryx = L.marker([-99.20, 166.20], { icon: planetIcon }).bindTooltip("Bryx", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Bryx);
const DuMai = L.marker([-99.59, 166.42], { icon: planetIcon }).bindTooltip("Du Mai", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(DuMai);
const Dithanune = L.marker([-103.42, 166.56], { icon: planetIcon }).bindTooltip("Dithanune", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dithanune);
const Gosfambling = L.marker([-101.20, 166.73], { icon: planetIcon }).bindTooltip("Gosfambling", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gosfambling);
const Ultaar = L.marker([-102.02, 166.88], { icon: planetIcon }).bindTooltip("Ultaar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ultaar);
const Saffa = L.marker([-104.06, 167.69], { icon: planetIcon }).bindTooltip("Saffa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Saffa);
const Birix = L.marker([-100.11, 168.28], { icon: planetIcon }).bindTooltip("Birix", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Birix);
const Zchtek = L.marker([-103.02, 168.98], { icon: planetIcon }).bindTooltip("Zchtek", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Zchtek);
const BorteleCl = L.marker([-100.98, 169.02], { icon: clustrIcon }).bindTooltip("Bortele Cl.", { permanent: true, direction: 'right', offset: [2, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BorteleCl);
const Ingo = L.marker([-100.63, 169.13], { icon: planetIcon }).bindTooltip("Ingo", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ingo);
const PegShar = L.marker([-104.58, 169.84], { icon: planetIcon }).bindTooltip("Peg Shar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PegShar);
const PusatSta = L.marker([-103.88, 170.16], { icon: statonIcon }).bindTooltip("Pusat Sta.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PusatSta);
const Ceitia = L.marker([-98.83, 170.17], { icon: planetIcon }).bindTooltip("Ceitia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ceitia);
const HurdsMoon = L.marker([-102.25, 170.25], { icon: planetIcon }).bindTooltip("Hurd's Moon", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(HurdsMoon);
const Bontormia = L.marker([-100.06, 170.33], { icon: planetIcon }).bindTooltip("Bontormia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bontormia);
const Hypotria = L.marker([-102.41, 170.78], { icon: planetIcon }).bindTooltip("Hypotria", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hypotria);
const Kalkovak = L.marker([-100.67, 170.89], { icon: planetIcon }).bindTooltip("Kalkovak", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kalkovak);
const Resilon = L.marker([-102.94, 171.00], { icon: planetIcon }).bindTooltip("Resilon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Resilon);
const Kazlin = L.marker([-104.36, 171.50], { icon: planetIcon }).bindTooltip("Kazlin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kazlin);
const Jurzuu = L.marker([-99.42, 171.73], { icon: planetIcon }).bindTooltip("Jurzuu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jurzuu);
const Laboi = L.marker([-101.81, 172.13], { icon: planetIcon }).bindTooltip("Laboi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Laboi);
const Nomaria = L.marker([-103.27, 171.94], { icon: planetIcon }).bindTooltip("Nomaria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nomaria);
const Alaspin = L.marker([-104.94, 172.11], { icon: planetIcon }).bindTooltip("Alaspin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Alaspin);
const Saleucami = L.marker([-100.67, 172.67], { icon: pltIconCaL2 }).bindTooltip("Saleucami", { permanent: true, direction: 'right', offset: [3, -5], className: 'leaflet-tooltip-mov' }).bindPopup(SaleucamiPopup, customOptions).addTo(map);
const Lythia = L.marker([-99.83, 173.25], { icon: planetIcon }).bindTooltip("Lythia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lythia);
const Suolriep = L.marker([-103.61, 173.25], { icon: planetIcon }).bindTooltip("Suolriep", { permanent: true, direction: 'left', offset: [2, -6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Suolriep);
const Komnor = L.marker([-98.73, 173.27], { icon: planetIcon }).bindTooltip("Komnor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Komnor);
const Iotra = L.marker([-104.42, 173.33], { icon: planetIcon }).bindTooltip("Iotra", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Iotra);
const Timja = L.marker([-102.77, 173.34], { icon: planetIcon }).bindTooltip("Timja", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Timja);
const Solarine = L.marker([-100.39, 173.39], { icon: planetIcon }).bindTooltip("Solarine", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Solarine);
const Boonta = L.marker([-101.92, 173.42], { icon: planetIcon }).bindTooltip("Boonta (Ko Vari)", { permanent: true, direction: 'right', offset: [-4, -10], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Boonta);
const Pirik = L.marker([-104.09, 173.46], { icon: planetIcon }).bindTooltip("Pirik", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pirik);
const OrdNamurt = L.marker([-102.67, 173.73], { icon: planetIcon }).bindTooltip("Ord Namurt", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(OrdNamurt);
const Annoo = L.marker([-100.38, 173.83], { icon: planetIcon }).bindTooltip("Annoo (Gelefil)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Annoo);
const Aaron = L.marker([-100.06, 174.00], { icon: planetIcon }).bindTooltip("Aaron", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Aaron);
const Lijuter = L.marker([-103.69, 174.05], { icon: planetIcon }).bindTooltip("Lijuter", { permanent: true, direction: 'left', offset: [2, 7], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lijuter);
const Karnst = L.marker([-104.19, 174.11], { icon: planetIcon }).bindTooltip("Karnst", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Karnst);
const Talir = L.marker([-104.31, 174.26], { icon: planetIcon }).bindTooltip("Talir", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Talir);
const Lant = L.marker([-104.64, 174.41], { icon: planetIcon }).bindTooltip("Lant", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lant);
const Novor = L.marker([-103.64, 174.52], { icon: planetIcon }).bindTooltip("Novor", { permanent: true, direction: 'right', offset: [-1, -6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Novor);
const Solacton = L.marker([-104.33, 174.56], { icon: planetIcon }).bindTooltip("Solacton", { permanent: true, direction: 'right', offset: [-3, 9], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Solacton);
const Heterkus = L.marker([-101.05, 174.59], { icon: planetIcon }).bindTooltip("Heterkus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Heterkus);
const Raddan = L.marker([-102.92, 174.69], { icon: planetIcon }).bindTooltip("Raddan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Raddan);
const Sespe = L.marker([-104.89, 174.69], { icon: planetIcon }).bindTooltip("Sespe", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sespe);
const TermanSta = L.marker([-104.69, 174.73], { icon: statonIcon }).bindTooltip("Terman Sta.", { permanent: true, direction: 'right', offset: [-1, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(TermanSta);
const MoogMot = L.marker([-98.80, 174.77], { icon: planetIcon }).bindTooltip("Moog Mot", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom04.addLayer(MoogMot);
const Vaathkree = L.marker([-104.28, 174.77], { icon: planetIcon }).bindTooltip("Vaathkree", { permanent: true, direction: 'left', offset: [5, -11], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vaathkree);
const Station3 = L.marker([-104.60, 174.79], { icon: statonIcon }).bindTooltip("Station 3", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Station3);
const AfEl = L.marker([-104.03, 174.84], { icon: planetIcon }).bindTooltip("Af'El", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(AfEl);
const Tragud = L.marker([-104.54, 174.97], { icon: planetIcon }).bindTooltip("Tragud", { permanent: true, direction: 'right', offset: [-2, -5], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Tragud);
const Verde = L.marker([-103.99, 175.02], { icon: planetIcon }).bindTooltip("Verde", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Verde);
const Sriluur = L.marker([-104.23, 175.06], { icon: planetIcon }).bindTooltip("Sriluur", { permanent: true, direction: 'right', offset: [-1, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Sriluur);
const Ques = L.marker([-104.94, 175.07], { icon: planetIcon }).bindTooltip("Ques", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ques);
const NwarcolPoint = L.marker([-103.81, 175.09], { icon: statonIcon }).bindTooltip("Nwarcol Point", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NwarcolPoint);
const Oovo = L.marker([-102.00, 175.14], { icon: planetIcon }).bindTooltip("Oovo", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Oovo);
const Dennogra = L.marker([-99.23, 175.38], { icon: planetIcon }).bindTooltip("Dennogra (Tialval)", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dennogra);
const NovolekBeacon = L.marker([-104.16, 175.40], { icon: pheIconBlk }).bindTooltip("Novolek Beacon", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom07.addLayer(NovolekBeacon);
const Sunin = L.marker([-100.73, 175.48], { icon: planetIcon }).bindTooltip("Sunin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sunin);
const Sedri = L.marker([-104.32, 175.48], { icon: planetIcon }).bindTooltip("Sedri", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Sedri);
const BNish = L.marker([-101.98, 175.53], { icon: planetIcon }).bindTooltip("B'nish", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BNish);
const Sargesso = L.marker([-101.29, 175.80], { icon: planetIcon }).bindTooltip("Sargesso", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sargesso);
const Bolad = L.marker([-103.44, 175.84], { icon: planetIcon }).bindTooltip("Bolad", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bolad);
const CarlixsFolly = L.marker([-102.54, 175.95], { icon: planetIcon }).bindTooltip("Carlix's Folly", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(CarlixsFolly);
const ForlonisMin = L.marker([-99.03, 176.41], { icon: planetIcon }).bindTooltip("Forlonis Minor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(ForlonisMin);
const KuthicWorlds = L.marker([-100.13, 176.49], { icon: planetIcon }).bindTooltip("Kuthic Worlds", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KuthicWorlds);
const Vartos = L.marker([-101.58, 176.80], { icon: planetIcon }).bindTooltip("Vartos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vartos);
const Ulkantha = L.marker([-104.56, 176.81], { icon: planetIcon }).bindTooltip("Ulkantha", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ulkantha);
const Yoribuunt = L.marker([-104.98, 176.91], { icon: planetIcon }).bindTooltip("Yoribuunt", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Yoribuunt);
const Bresallis = L.marker([-99.13, 177.10], { icon: planetIcon }).bindTooltip("Bresallis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bresallis);
const Tammar = L.marker([-104.09, 177.27], { icon: planetIcon }).bindTooltip("Tammar (Lelrais)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tammar);
const Nimat = L.marker([-101.80, 177.23], { icon: planetIcon }).bindTooltip("Nimat", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nimat);
const Junkfort = L.marker([-101.20, 177.27], { icon: planetIcon }).bindTooltip("Junkfort (Kossimur)", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Junkfort);
const Marleyvane = L.marker([-100.62, 177.23], { icon: planetIcon }).bindTooltip("Marleyvane", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Marleyvane);
const Orranana = L.marker([-98.80, 177.45], { icon: planetIcon }).bindTooltip("Orranana", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Orranana);
const Jexeria = L.marker([-102.38, 177.74], { icon: planetIcon }).bindTooltip("Jexeria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jexeria);
const Darvannis = L.marker([-104.57, 178.53], { icon: planetIcon }).bindTooltip("Darvannis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Darvannis);
const Garn = L.marker([-103.50, 179.05], { icon: planetIcon }).bindTooltip("Garn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Garn);
const DagelinMin = L.marker([-101.53, 179.10], { icon: planetIcon }).bindTooltip("Dagelin Minor", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(DagelinMin);
const Simbarc = L.marker([-101.39, 179.13], { icon: planetIcon }).bindTooltip("Simbarc", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Simbarc);
const Rullag = L.marker([-102.86, 179.31], { icon: planetIcon }).bindTooltip("Rullag", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rullag);
const MaphusTria = L.marker([-104.41, 180.84], { icon: planetIcon }).bindTooltip("Maphus Tria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(MaphusTria);
const Oseon = L.marker([-101.96, 180.89], { icon: planetIcon }).bindTooltip("Oseon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Oseon);
const Erilnar = L.marker([-102.14, 181.03], { icon: planetIcon }).bindTooltip("ERILNAR", { permanent: true, direction: 'left', offset: [0, 1], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Erilnar);
const Scillal = L.marker([-102.39, 181.19], { icon: planetIcon }).bindTooltip("Scillal", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Scillal);
const Sufezz = L.marker([-99.17, 181.34], { icon: planetIcon }).bindTooltip("Sufezz", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sufezz);
const Gand = L.marker([-100.09, 181.50], { icon: pltIconCaL }).bindTooltip("Gand", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); Gand.bindPopup(GandPopup, customOptions); zoom04.addLayer(Gand);
const Arleen = L.marker([-101.78, 181.54], { icon: planetIcon }).bindTooltip("Arleen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Arleen);
const Rafa = L.marker([-102.03, 181.57], { icon: planetIcon }).bindTooltip("Rafa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Rafa);
const Dela = L.marker([-102.30, 181.63], { icon: planetIcon }).bindTooltip("Dela", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dela);
const Lekua = L.marker([-102.67, 181.76], { icon: planetIcon }).bindTooltip("Lekua", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lekua);
const Cadma = L.marker([-102.95, 182.20], { icon: planetIcon }).bindTooltip("Cadma", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cadma);
const Zebitrope = L.marker([-103.50, 182.62], { icon: planetIcon }).bindTooltip("Zebitrope", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Zebitrope);
const Ringneldia = L.marker([-101.73, 183.00], { icon: planetIcon }).bindTooltip("Ringneldia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ringneldia);
const Kaski = L.marker([-104.97, 183.58], { icon: planetIcon }).bindTooltip("Kaski", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Kaski);
const Danos = L.marker([-98.98, 183.75], { icon: planetIcon }).bindTooltip("Danos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Danos);
const Krozurbia = L.marker([-100.78, 184.04], { icon: planetIcon }).bindTooltip("Krozurbia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Krozurbia);
const Renatasia = L.marker([-103.63, 184.11], { icon: planetIcon }).bindTooltip("Renatasia", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Renatasia);
const Dilonexa = L.marker([-101.66, 184.34], { icon: planetIcon }).bindTooltip("Dilonexa", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Dilonexa);
const Skeebo = L.marker([-99.98, 184.80], { icon: planetIcon }).bindTooltip("Skeebo", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Skeebo);
const Baummu = L.marker([-100.17, 184.95], { icon: planetIcon }).bindTooltip("Baummu", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Baummu);
const ThonBokaN = L.marker([-103.36, 184.83], { icon: nebIconBlk }).bindTooltip("ThonBoka N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ThonBokaN);
const Uaua = L.marker([-101.89, 185.03], { icon: planetIcon }).bindTooltip("Uaua", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Uaua);
const Hosrel = L.marker([-102.92, 185.47], { icon: planetIcon }).bindTooltip("Hosrel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hosrel);
const Maldra = L.marker([-99.36, 185.53], { icon: planetIcon }).bindTooltip("Maldra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Maldra);
const Falko = L.marker([-102.00, 185.64], { icon: planetIcon }).bindTooltip("Falko", { permanent: true, direction: 'right', offset: [-2, -7], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Falko);
const Trammis = L.marker([-102.38, 185.70], { icon: planetIcon }).bindTooltip("Trammis", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Trammis);
const Antipose = L.marker([-102.09, 185.89], { icon: planetIcon }).bindTooltip("Antipose", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Antipose);
const Paulking = L.marker([-102.61, 186.30], { icon: planetIcon }).bindTooltip("Paulking", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Paulking);
const Douglas = L.marker([-103.00, 186.58], { icon: planetIcon }).bindTooltip("Douglas", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Douglas);
const Tund = L.marker([-102.34, 187.06], { icon: planetIcon }).bindTooltip("Tund", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Pluthan = L.marker([-101.28, 187.95], { icon: planetIcon }).bindTooltip("Pluthan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pluthan);
const Malagarr = L.marker([-100.92, 190.30], { icon: planetIcon }).bindTooltip("Malagarr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Malagarr);
//======================================== row 09 ===== CORUSCANT ========================
const Rhigar = L.marker([-106.10, 85.39], { icon: planetIcon }).bindTooltip("Rhigar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rhigar);
const RataN = L.marker([-106.24, 85.47], { icon: nebIconBlk }).bindTooltip("Rata N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(RataN);
const Csaus = L.marker([-105.85, 86.83], { icon: planetIcon }).bindTooltip("Csaus", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Csaus);
const Copero = L.marker([-105.60, 87.47], { icon: planetIcon }).bindTooltip("Copero", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Copero);
const Sarvchi = L.marker([-105.27, 87.78], { icon: planetIcon }).bindTooltip("Sarvchi", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sarvchi);
const ColonialChaf = L.marker([-107.22, 86.94], { icon: planetIcon }).bindTooltip("Colonial Station Chaf", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ColonialChaf);
const KlasseEphemor = L.marker([-107.63, 88.17], { icon: planetIcon }).bindTooltip("Klasse Ephemora (Mobus)", { permanent: true, direction: 'right', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom04.addLayer(KlasseEphemor);
const Yashuvhu = L.marker([-107.33, 90.19], { icon: planetIcon }).bindTooltip("Yashuvhu", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Yashuvhu);
const Carrivar = L.marker([-109.82, 97.44], { icon: planetIcon }).bindTooltip("Carrivar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Carrivar);
const UmarenK = L.marker([-110.96, 97.47], { icon: planetIcon }).bindTooltip("Umaren'k", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(UmarenK);
const Osseriton = L.marker([-111.51, 98.14], { icon: planetIcon }).bindTooltip("Osseriton", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Osseriton);
const KharmortsN = L.marker([-106.28, 99.20], { icon: planetIcon }).bindTooltip("Kharmort's Miasma N.", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KharmortsN);
const VagarPraxut = L.marker([-106.00, 99.25], { icon: planetIcon }).bindTooltip("Vagar Praxut", { permanent: true, direction: 'left', offset: [0, -1], className: 'leaflet-tooltip    ' }).addTo(map);
const Shikitari = L.marker([-110.19, 101.83], { icon: planetIcon }).bindTooltip("Shikitari", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Shikitari);
const Selvaris = L.marker([-107.31, 111.08], { icon: planetIcon }).bindTooltip("Selvaris", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Selvaris);
const Throffdon = L.marker([-105.48, 112.55], { icon: planetIcon }).bindTooltip("Throffdon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Throffdon);
const Gwongdeen = L.marker([-108.41, 113.11], { icon: planetIcon }).bindTooltip("Gwongdeen", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Gwongdeen);
const Batorine = L.marker([-108.56, 115.19], { icon: planetIcon }).bindTooltip("Batorine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Batorine);
const Lontar = L.marker([-108.31, 115.38], { icon: planetIcon }).bindTooltip("Lontar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lontar);
const Tzarib = L.marker([-105.30, 115.53], { icon: planetIcon }).bindTooltip("Tzarib", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tzarib);
const Galagolos = L.marker([-106.55, 115.88], { icon: planetIcon }).bindTooltip("Galagolos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Galagolos);
const Dreffon = L.marker([-106.88, 116.09], { icon: planetIcon }).bindTooltip("Dreffon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Dreffon);
const Thrantin = L.marker([-105.84, 116.13], { icon: planetIcon }).bindTooltip("Thrantin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Thrantin);
const Mangan = L.marker([-108.25, 117.64], { icon: planetIcon }).bindTooltip("Mangan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Mangan);
const Horska = L.marker([-106.45, 117.88], { icon: planetIcon }).bindTooltip("Horska", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Horska);
const Bolenia = L.marker([-110.35, 118.30], { icon: planetIcon }).bindTooltip("Bolenia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bolenia);
const Callonia = L.marker([-105.87, 118.42], { icon: planetIcon }).bindTooltip("Callonia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Callonia);
const Aaeton = L.marker([-111.54, 118.42], { icon: planetIcon }).bindTooltip("Aaeton", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Aaeton);
const Vakkar = L.marker([-105.41, 118.59], { icon: planetIcon }).bindTooltip("Vakkar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vakkar);
const Ghaina = L.marker([-110.91, 118.70], { icon: planetIcon }).bindTooltip("Ghaina", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ghaina);
const Harix = L.marker([-107.46, 118.78], { icon: planetIcon }).bindTooltip("Harix", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Harix);
const DoneerSo = L.marker([-105.57, 118.80], { icon: planetIcon }).bindTooltip("Doneer'so", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(DoneerSo);
const XaFel = L.marker([-109.56, 118.79], { icon: planetIcon }).bindTooltip("Xa Fel", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(XaFel);
const Flankers = L.marker([-105.21, 118.92], { icon: planetIcon }).bindTooltip("Flankers", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Flankers);
const Duran = L.marker([-111.16, 118.80], { icon: planetIcon }).bindTooltip("Duran", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Duran);
const Davnar = L.marker([-109.78, 119.04], { icon: planetIcon }).bindTooltip("Davnar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Davnar);
const Pakrik = L.marker([-109.94, 119.18], { icon: planetIcon }).bindTooltip("Pakrik", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pakrik);
const Ragoon = L.marker([-110.62, 119.48], { icon: planetIcon }).bindTooltip("Ragoon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ragoon);
const Fakir = L.marker([-105.62, 119.01], { icon: planetIcon }).bindTooltip("Fakir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Abonshee = L.marker([-105.30, 119.04], { icon: planetIcon }).bindTooltip("Abonshee", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Abonshee);
const Halowan = L.marker([-106.08, 119.58], { icon: planetIcon }).bindTooltip("Halowan", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Halowan);
const Mycroft = L.marker([-105.91, 119.63], { icon: planetIcon }).bindTooltip("Mycroft", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Mycroft);
const Halpat = L.marker([-111.52, 119.86], { icon: planetIcon }).bindTooltip("Halpat", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Halpat);
const CheeyoomMatee = L.marker([-108.89, 120.03], { icon: planetIcon }).bindTooltip("Cheeyoom Matee", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(CheeyoomMatee);
const Sarnikken = L.marker([-106.26, 120.03], { icon: planetIcon }).bindTooltip("Sarnikken", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sarnikken);
const Lorimax = L.marker([-105.46, 120.05], { icon: planetIcon }).bindTooltip("Lorimax", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Lorimax);
const HoszhIszhir = L.marker([-109.62, 120.24], { icon: planetIcon }).bindTooltip("Hoszh Iszhir", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(HoszhIszhir);
const Sinkar = L.marker([-106.13, 120.26], { icon: planetIcon }).bindTooltip("Sinkar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sinkar);
const Tsukkia = L.marker([-105.21, 120.28], { icon: planetIcon }).bindTooltip("Tsukkia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Tsukkia);
const Alabash = L.marker([-105.58, 120.37], { icon: planetIcon }).bindTooltip("Alabash", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Alabash);
const Palanhi = L.marker([-105.32, 120.35], { icon: planetIcon }).bindTooltip("Palanhi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Palanhi);
const Kvabja = L.marker([-109.51, 120.35], { icon: planetIcon }).bindTooltip("Kvabja", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kvabja);
const Torpris = L.marker([-109.75, 120.50], { icon: planetIcon }).bindTooltip("Torpris", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Torpris);
const Merakai = L.marker([-108.42, 120.76], { icon: planetIcon }).bindTooltip("Merakai", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Merakai);
const Darada = L.marker([-108.46, 120.87], { icon: planetIcon }).bindTooltip("Darada", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Darada);
const Iyuta = L.marker([-105.86, 120.79], { icon: planetIcon }).bindTooltip("Iyuta", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Iyuta);
const Yirt4138Grek = L.marker([-106.44, 120.88], { icon: planetIcon }).bindTooltip("Yirt-4138-Grek-12", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Yirt4138Grek);
const Dachat = L.marker([-109.17, 120.95], { icon: planetIcon }).bindTooltip("Torpris", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Torpris);
const Makksre = L.marker([-110.16, 121.05], { icon: planetIcon }).bindTooltip("Makksre", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Makksre);
const Mrisst = L.marker([-107.19, 121.07], { icon: planetIcon }).bindTooltip("Mrisst", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Mrisst);
const Venjagga = L.marker([-107.42, 121.17], { icon: planetIcon }).bindTooltip("Venjagga", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Venjagga);
const Caprioril = L.marker([-108.99, 121.27], { icon: planetIcon }).bindTooltip("Caprioril", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Caprioril);
const Phorliss = L.marker([-108.68, 121.43], { icon: planetIcon }).bindTooltip("Phorliss", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Phorliss);
const KarAKatok = L.marker([-111.00, 121.41], { icon: planetIcon }).bindTooltip("Kar'a'katok", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(KarAKatok);
const Denevar = L.marker([-108.18, 121.65], { icon: planetIcon }).bindTooltip("Denevar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Denevar);
const Hyabb = L.marker([-109.62, 121.72], { icon: planetIcon }).bindTooltip("Hyabb", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hyabb);
const Golkus = L.marker([-106.11, 121.52], { icon: planetIcon }).bindTooltip("Golkus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Golkus);
const OrdMirit = L.marker([-106.87, 121.56], { icon: planetIcon }).bindTooltip("Ord Mirit", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdMirit);
const Noquivzor = L.marker([-105.20, 121.82], { icon: planetIcon }).bindTooltip("Noquivzor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Noquivzor);
const WorTandell = L.marker([-109.24, 121.89], { icon: planetIcon }).bindTooltip("Wor Tandell", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(WorTandell);
const OrdDolsan = L.marker([-111.36, 121.83], { icon: planetIcon }).bindTooltip("Ord Dolsan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdDolsan);
const Melahna = L.marker([-110.80, 121.91], { icon: planetIcon }).bindTooltip("Melahna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Melahna);
const Borleias = L.marker([-107.69, 122.00], { icon: planetIcon }).bindTooltip("Borleias", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Borleias);
const Dolomar = L.marker([-108.50, 122.05], { icon: planetIcon }).bindTooltip("Dolomar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dolomar);
const Kamparas = L.marker([-108.09, 122.46], { icon: planetIcon }).bindTooltip("Kamparas", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Kamparas);
const Balfron = L.marker([-109.02, 122.32], { icon: planetIcon }).bindTooltip("Balfron", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Balfron);
const Voon = L.marker([-109.20, 122.37], { icon: planetIcon }).bindTooltip("Voon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Voon);
const Pantolomin = L.marker([-108.76, 122.40], { icon: planetIcon }).bindTooltip("Pantolomin", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Pantolomin);
const Cortella = L.marker([-110.21, 122.87], { icon: planetIcon }).bindTooltip("Cortella", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cortella);
const Twith = L.marker([-108.87, 122.94], { icon: planetIcon }).bindTooltip("Twith", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Twith);
const Farrfin = L.marker([-108.27, 123.16], { icon: planetIcon }).bindTooltip("Farrfin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Farrfin);
const Gaios = L.marker([-109.42, 123.22], { icon: planetIcon }).bindTooltip("Gaios", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gaios);
const Coriallis = L.marker([-109.10, 123.35], { icon: planetIcon }).bindTooltip("Coriallis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Coriallis);
const Duneeden = L.marker([-111.09, 123.67], { icon: planetIcon }).bindTooltip("Duneeden", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Duneeden);
const Galvoni = L.marker([-109.69, 123.83], { icon: planetIcon }).bindTooltip("Galvoni", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Galvoni);
const Weerden = L.marker([-110.52, 123.91], { icon: planetIcon }).bindTooltip("Weerden", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Weerden);
const Trallan = L.marker([-106.26, 123.57], { icon: planetIcon }).bindTooltip("Trallan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Trallan);
const Candovant = L.marker([-107.22, 123.88], { icon: planetIcon }).bindTooltip("Candovant", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Candovant);
const Phraetiss = L.marker([-108.09, 123.91], { icon: planetIcon }).bindTooltip("Phraetiss", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Phraetiss);
const Charmath = L.marker([-108.56, 123.93], { icon: planetIcon }).bindTooltip("Charmath", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Charmath);
const Firro = L.marker([-108.47, 123.99], { icon: planetIcon }).bindTooltip("Firro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Firro);
const Metellos = L.marker([-111.57, 123.90], { icon: planetIcon }).bindTooltip("Metellos", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Metellos);
const Coruscant = L.marker([-111.67, 124.73], { icon: pltIconCaL2 }).bindTooltip("Coruscant (Notron)", { permanent: true, direction: 'left', offset: [-5, 3], className: 'leaflet-tooltip-mov' }).bindPopup(CoruscantPopup, customOptions).addTo(map);
const Utrost = L.marker([-111.51, 124.84], { icon: pltIconLeg }).bindTooltip("Utrost", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); Utrost.bindPopup(UtrostPopup, customOptions); zoom07.addLayer(Utrost);
const Bessimir = L.marker([-111.63, 124.89], { icon: pltIconLeg }).bindTooltip("Bessimir", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); Bessimir.bindPopup(BessimirPopup, customOptions); zoom06.addLayer(Bessimir);
const Mamendin = L.marker([-107.94, 124.15], { icon: planetIcon }).bindTooltip("Mamendin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Mamendin);
const Vardos = L.marker([-110.09, 124.15], { icon: planetIcon }).bindTooltip("Vardos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vardos);
const Prekaz = L.marker([-109.43, 124.41], { icon: planetIcon }).bindTooltip("Prekaz", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Prekaz);
const Tanjay = L.marker([-110.89, 124.34], { icon: planetIcon }).bindTooltip("Tanjay", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tanjay);
const Lovetus = L.marker([-108.78, 124.86], { icon: planetIcon }).bindTooltip("Lovetus", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lovetus);
const Quenk = L.marker([-110.69, 124.86], { icon: pltIconLeg }).bindTooltip("Quenk", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); Quenk.bindPopup(QuenkPopup, customOptions); zoom07.addLayer(Quenk);
const Perilix = L.marker([-105.73, 124.91], { icon: planetIcon }).bindTooltip("Perilix", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Perilix);
const Mirshaf = L.marker([-110.00, 124.92], { icon: planetIcon }).bindTooltip("Mirshaf", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Mirshaf);
const Axtria = L.marker([-108.01, 125.02], { icon: planetIcon }).bindTooltip("Axtria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Axtria);
const KidietOlgo = L.marker([-107.81, 125.16], { icon: planetIcon }).bindTooltip("Kidiet Olgo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KidietOlgo);
const Salgarus = L.marker([-106.94, 125.13], { icon: planetIcon }).bindTooltip("Salgarus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Salgarus);
const BelgothsBeac = L.marker([-111.33, 125.30], { icon: staIconLeg }).bindTooltip("Belgoth's Beacon", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); BelgothsBeac.bindPopup(BelgothsBeacPopup, customOptions); zoom06.addLayer(BelgothsBeac);
const Emurria = L.marker([-107.33, 125.30], { icon: planetIcon }).bindTooltip("Emurria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Emurria);
const Velusia = L.marker([-109.27, 125.31], { icon: planetIcon }).bindTooltip("Velusia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Velusia);
const Thorgeld = L.marker([-109.76, 125.59], { icon: planetIcon }).bindTooltip("Thorgeld", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Thorgeld);
const Thokos = L.marker([-110.55, 125.20], { icon: planetIcon }).bindTooltip("Thokos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Thokos);
const Kes = L.marker([-111.16, 125.62], { icon: pltIconLeg }).bindTooltip("Kes", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); Kes.bindPopup(KesPopup, customOptions); zoom07.addLayer(Kes);
const Alsakan = L.marker([-111.00, 125.89], { icon: pltIconCaL }).bindTooltip("Alsakan", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); Alsakan.bindPopup(AlsakanPopup, customOptions); zoom05.addLayer(Alsakan);
const Dexus = L.marker([-106.58, 125.89], { icon: planetIcon }).bindTooltip("Dexus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dexus);
const Opatajji = L.marker([-111.16, 126.07], { icon: pltIconLeg }).bindTooltip("Opatajji", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); Opatajji.bindPopup(OpatajjiPopup, customOptions); zoom07.addLayer(Opatajji);
const MieleNova = L.marker([-108.37, 126.02], { icon: planetIcon }).bindTooltip("Miele Nova", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(MieleNova);
const Quian = L.marker([-111.23, 128.74], { icon: planetIcon }).bindTooltip("Quian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Quian);
const Dervdis = L.marker([-108.98, 126.57], { icon: planetIcon }).bindTooltip("Dervdis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dervdis);
const Shawken = L.marker([-108.78, 126.66], { icon: planetIcon }).bindTooltip("Shawken", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Shawken);
const Perlemia = L.marker([-110.69, 126.42], { icon: pltIconLeg }).bindTooltip("Perlemia", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); Perlemia.bindPopup(PerlemiaPopup, customOptions); zoom07.addLayer(Perlemia);
const Markon = L.marker([-110.22, 126.46], { icon: planetIcon }).bindTooltip("Markon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Markon);
const Nara = L.marker([-107.33, 126.48], { icon: planetIcon }).bindTooltip("Nara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nara);
const Challon = L.marker([-108.27, 126.67], { icon: planetIcon }).bindTooltip("Challon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Challon);
const Grizmallt = L.marker([-110.55, 126.66], { icon: planetIcon }).bindTooltip("Grizmallt", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Grizmallt);
const Dorax = L.marker([-111.43, 127.38], { icon: planetIcon }).bindTooltip("Dorax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dorax);
const Anaxes = L.marker([-110.05, 127.51], { icon: planetIcon }).bindTooltip("Axum / Anaxes", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Anaxes);
const Myrenia = L.marker([-111.13, 127.78], { icon: planetIcon }).bindTooltip("Myrenia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Myrenia);
const OrdCarpagia = L.marker([-105.44, 127.50], { icon: planetIcon }).bindTooltip("Ord Carpagia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdCarpagia);
const Coronar = L.marker([-106.59, 127.55], { icon: planetIcon }).bindTooltip("Coronar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Coronar);
const TerraAsta = L.marker([-106.25, 127.15], { icon: planetIcon }).bindTooltip("TerraAsta", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(TerraAsta);
const Dankayo = L.marker([-105.30, 127.72], { icon: planetIcon }).bindTooltip("Dankayo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dankayo);
const Shwuy = L.marker([-105.55, 128.03], { icon: planetIcon }).bindTooltip("Shwuy", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Shwuy);
const UvuiyExen = L.marker([-105.86, 128.28], { icon: planetIcon }).bindTooltip("Uvuiy Exen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(UvuiyExen);
const Wakeelmui = L.marker([-107.11, 128.21], { icon: planetIcon }).bindTooltip("Wakeelmui", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Wakeelmui);
const Vento = L.marker([-109.86, 128.01], { icon: planetIcon }).bindTooltip("Vento", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Vento);
const Corulag = L.marker([-109.75, 128.03], { icon: planetIcon }).bindTooltip("Corulag", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Corulag);
const Tentator = L.marker([-107.61, 128.03], { icon: planetIcon }).bindTooltip("Tentator", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tentator);
const Adamastor = L.marker([-108.35, 128.48], { icon: planetIcon }).bindTooltip("Adamastor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Adamastor);
const Nadiri = L.marker([-109.01, 128.34], { icon: statonIcon }).bindTooltip("Nadiri", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Nadiri);
const Chandrila = L.marker([-109.54, 128.38], { icon: pltIconCaL }).bindTooltip("Chandrila", { permanent: true, direction: 'left', offset: [-4, -2], className: 'leaflet-tooltip    ' }).bindPopup(ChandrilaPopup, customOptions).addTo(map);
const Bormea = L.marker([-108.80, 128.45], { icon: planetIcon }).bindTooltip("Bormea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bormea);
const Brentaal = L.marker([-109.33, 128.74], { icon: planetIcon }).bindTooltip("Brentaal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Brentaal);
const Tolan = L.marker([-105.68, 128.69], { icon: planetIcon }).bindTooltip("Tolan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Tolan);
const Darsie = L.marker([-108.16, 128.84], { icon: planetIcon }).bindTooltip("Darsie", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Darsie);
const Ganthel = L.marker([-109.84, 128.71], { icon: planetIcon }).bindTooltip("Ganthel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Ganthel);
const Nopces = L.marker([-109.74, 128.83], { icon: planetIcon }).bindTooltip("Nopces", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Nopces);
const Basilisk = L.marker([-111.23, 128.74], { icon: planetIcon }).bindTooltip("Basilisk", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Basilisk);
const Esseles = L.marker([-109.16, 129.05], { icon: planetIcon }).bindTooltip("Esseles", { permanent: true, direction: 'right', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Esseles);
const Filby = L.marker([-110.80, 128.48], { icon: planetIcon }).bindTooltip("Filby", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Filby);
const Yerphonia = L.marker([-110.31, 128.87], { icon: planetIcon }).bindTooltip("Yerphonia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Yerphonia);
const Tarlandia = L.marker([-110.54, 129.16], { icon: planetIcon }).bindTooltip("Tarlandia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tarlandia);
const Melinz = L.marker([-110.27, 129.53], { icon: planetIcon }).bindTooltip("Melinz", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Melinz);
const Rhinnal = L.marker([-109.00, 129.34], { icon: planetIcon }).bindTooltip("Rhinnal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Rhinnal);
const Albecus = L.marker([-108.69, 129.44], { icon: planetIcon }).bindTooltip("Albecus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Albecus);
const Ralltiir = L.marker([-108.84, 129.61], { icon: planetIcon }).bindTooltip("Ralltiir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ralltiir);
const PrakithMinor = L.marker([-106.54, 129.84], { icon: planetIcon }).bindTooltip("Prakith Minor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(PrakithMinor);
const Skako = L.marker([-111.19, 130.00], { icon: pltIconCaL }).bindTooltip("Skako", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }); Skako.bindPopup(SkakoPopup, customOptions); zoom04.addLayer(Skako);
const Rubogea = L.marker([-111.55, 130.64], { icon: planetIcon }).bindTooltip("Rubogea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Rubogea);
const Neuvia = L.marker([-108.41, 130.31], { icon: planetIcon }).bindTooltip("Neuvia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Neuvia);
const Plavin = L.marker([-107.61, 130.50], { icon: planetIcon }).bindTooltip("Plavin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Plavin);
const Delle = L.marker([-108.23, 130.64], { icon: planetIcon }).bindTooltip("Delle", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Delle);
const Jatir = L.marker([-109.02, 130.67], { icon: planetIcon }).bindTooltip("Jatir", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jatir);
const Erigorm = L.marker([-109.62, 130.55], { icon: planetIcon }).bindTooltip("Erigorm", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Erigorm);
const Sittana = L.marker([-109.86, 130.64], { icon: planetIcon }).bindTooltip("Sittana", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sittana);
const Tepasi = L.marker([-110.61, 130.59], { icon: planetIcon }).bindTooltip("Tepasi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tepasi);
const Calabar = L.marker([-109.44, 130.93], { icon: planetIcon }).bindTooltip("Calabar", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Calabar);
const Kiribi = L.marker([-105.19, 131.20], { icon: planetIcon }).bindTooltip("Kiribi", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kiribi);
const Ranklinge = L.marker([-108.06, 131.34], { icon: planetIcon }).bindTooltip("Ranklinge", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ranklinge);
const Corann = L.marker([-109.56, 131.39], { icon: planetIcon }).bindTooltip("Corann", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Corann);
const Briston = L.marker([-108.41, 131.44], { icon: planetIcon }).bindTooltip("Briston", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Briston);
const Manella = L.marker([-110.73, 131.48], { icon: planetIcon }).bindTooltip("Manella", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Manella);
const Teardrop = L.marker([-108.69, 131.53], { icon: planetIcon }).bindTooltip("Teardrop", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Teardrop);
const Korfo = L.marker([-111.12, 131.68], { icon: planetIcon }).bindTooltip("Korfo", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Korfo);
const Tellivar = L.marker([-106.75, 131.78], { icon: planetIcon }).bindTooltip("Tellivar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tellivar);
const YabolOpa = L.marker([-107.53, 131.81], { icon: planetIcon }).bindTooltip("Yabol Opa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(YabolOpa);
const Minkring = L.marker([-109.25, 131.91], { icon: planetIcon }).bindTooltip("Minkring", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Minkring);
const Caamas = L.marker([-111.18, 132.02], { icon: planetIcon }).bindTooltip("Caamas", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Caamas);
const Khramboa = L.marker([-110.45, 132.05], { icon: planetIcon }).bindTooltip("Khramboa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Khramboa);
const Frommon = L.marker([-106.39, 132.23], { icon: planetIcon }).bindTooltip("Frommon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Frommon);
const Shelkonwa = L.marker([-108.86, 132.28], { icon: planetIcon }).bindTooltip("Shelkonwa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Shelkonwa);
const Chekria = L.marker([-110.08, 132.45], { icon: planetIcon }).bindTooltip("Chekria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Chekria);
const Orthellin = L.marker([-105.42, 132.58], { icon: planetIcon }).bindTooltip("Orthellin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Orthellin);
const Ifmix = L.marker([-107.03, 132.65], { icon: planetIcon }).bindTooltip("Ifmix", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ifmix);
const Findris = L.marker([-108.55, 132.90], { icon: planetIcon }).bindTooltip("Findris", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Findris);
const AshkasKov = L.marker([-110.30, 133.00], { icon: planetIcon }).bindTooltip("Ashkas-kov", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(AshkasKov);
const Belnar = L.marker([-107.63, 133.12], { icon: planetIcon }).bindTooltip("Belnar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Belnar);
const Shulstine = L.marker([-106.59, 133.37], { icon: planetIcon }).bindTooltip("Shulstine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Shulstine);
const Gepparin = L.marker([-109.61, 133.44], { icon: planetIcon }).bindTooltip("Gepparin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gepparin);
const Deneeli = L.marker([-111.25, 133.55], { icon: planetIcon }).bindTooltip("Deneeli", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Deneeli);
const Castell = L.marker([-106.35, 133.80], { icon: planetIcon }).bindTooltip("Castell", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Castell);
const Haldeen = L.marker([-108.83, 133.81], { icon: planetIcon }).bindTooltip("Haldeen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Haldeen);
const ArgaiMin = L.marker([-108.30, 133.84], { icon: planetIcon }).bindTooltip("Argai Minor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(ArgaiMin);
const Pelemax = L.marker([-107.13, 133.91], { icon: planetIcon }).bindTooltip("Pelemax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pelemax);
const AX456 = L.marker([-108.31, 134.20], { icon: planetIcon }).bindTooltip("AX-456", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(AX456);
const Purnham = L.marker([-111.02, 134.22], { icon: planetIcon }).bindTooltip("Purnham", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Purnham);
const Shoroni = L.marker([-110.05, 134.22], { icon: planetIcon }).bindTooltip("Shoroni", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Shoroni);
const NakShimor = L.marker([-106.13, 134.23], { icon: planetIcon }).bindTooltip("Nak Shimor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NakShimor);
const Raithal = L.marker([-106.09, 134.34], { icon: planetIcon }).bindTooltip("Raithal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Raithal);
const Drunost = L.marker([-111.26, 134.50], { icon: planetIcon }).bindTooltip("Drunost", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Drunost);
const OrdCarida = L.marker([-107.80, 134.55], { icon: planetIcon }).bindTooltip("(Ord) Carida", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OrdCarida);
const Chaastern = L.marker([-111.39, 134.56], { icon: planetIcon }).bindTooltip("Chaastern", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Chaastern);
const Dakshee = L.marker([-108.37, 134.63], { icon: planetIcon }).bindTooltip("Dakshee", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dakshee);
const Dorlon = L.marker([-108.20, 134.80], { icon: planetIcon }).bindTooltip("Dorlon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dorlon);
const Vasuuli = L.marker([-109.45, 134.89], { icon: planetIcon }).bindTooltip("Vasuuli", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vasuuli);
const BrellaTemior = L.marker([-108.77, 135.39], { icon: planetIcon }).bindTooltip("Brella Temior", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BrellaTemior);
const VurdonKa = L.marker([-105.44, 135.67], { icon: planetIcon }).bindTooltip("Vurdon Ka", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(VurdonKa);
const Adari = L.marker([-106.52, 135.72], { icon: planetIcon }).bindTooltip("Adari", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Adari);
const Loj = L.marker([-109.52, 135.86], { icon: planetIcon }).bindTooltip("Loj", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Loj);
const Grandine = L.marker([-111.27, 135.88], { icon: planetIcon }).bindTooltip("Grandine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Grandine);
const Herego = L.marker([-110.31, 136.02], { icon: planetIcon }).bindTooltip("Herego", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Herego);
const Hok = L.marker([-109.19, 136.16], { icon: planetIcon }).bindTooltip("Hok", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hok);
const Dalandae = L.marker([-110.66, 136.48], { icon: planetIcon }).bindTooltip("Dalandae", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dalandae);
const Adim = L.marker([-106.20, 136.63], { icon: planetIcon }).bindTooltip("Adim", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Adim);
const BerDeVal = L.marker([-109.16, 136.86], { icon: planetIcon }).bindTooltip("Ber de Val", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BerDeVal);
const Sochi = L.marker([-107.31, 137.33], { icon: planetIcon }).bindTooltip("Sochi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sochi);
const Rove = L.marker([-105.67, 137.58], { icon: planetIcon }).bindTooltip("Rove", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rove);
const Charenthoth = L.marker([-111.23, 137.88], { icon: planetIcon }).bindTooltip("Charenthoth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Charenthoth);
const Corroth = L.marker([-109.47, 138.14], { icon: planetIcon }).bindTooltip("Corroth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Corroth);
const Tibro = L.marker([-110.14, 138.17], { icon: planetIcon }).bindTooltip("Tibro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tibro);
const Kloper = L.marker([-109.23, 138.20], { icon: planetIcon }).bindTooltip("Kloper", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kloper);
const Tala = L.marker([-107.70, 138.41], { icon: planetIcon }).bindTooltip("Tala", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tala);
const Cordes = L.marker([-107.31, 138.53], { icon: planetIcon }).bindTooltip("Cordes", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cordes);
const Pindra = L.marker([-105.22, 138.55], { icon: planetIcon }).bindTooltip("Pindra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pindra);
const Manwess = L.marker([-110.83, 138.75], { icon: planetIcon }).bindTooltip("Manwess", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Manwess);
const Glassferra = L.marker([-105.63, 138.95], { icon: planetIcon }).bindTooltip("Glassferra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Glassferra);
const Berri = L.marker([-107.23, 139.39], { icon: planetIcon }).bindTooltip("Berri", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Berri);
const Korev = L.marker([-109.41, 139.42], { icon: planetIcon }).bindTooltip("Korev", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Korev);
const Tolfrania = L.marker([-106.78, 139.63], { icon: planetIcon }).bindTooltip("Tolfrania", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tolfrania);
const Spanthaer = L.marker([-107.83, 139.80], { icon: planetIcon }).bindTooltip("Spanthaer", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Spanthaer);
const Corvanni = L.marker([-110.58, 139.88], { icon: planetIcon }).bindTooltip("Corvanni", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Corvanni);
const Bamasia = L.marker([-105.78, 140.08], { icon: planetIcon }).bindTooltip("Bamasia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Bamasia);
const Vorsia = L.marker([-110.25, 140.08], { icon: planetIcon }).bindTooltip("Vorsia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vorsia);
const Colla = L.marker([-105.50, 140.48], { icon: planetIcon }).bindTooltip("Colla", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Colla);
const GelviddisCl = L.marker([-109.84, 141.64], { icon: clustrIcon }).bindTooltip("Gelviddis Cl.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(GelviddisCl);
const Gryphon = L.marker([-109.34, 142.17], { icon: planetIcon }).bindTooltip("Gryphon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gryphon);
const Almakar = L.marker([-107.67, 142.23], { icon: planetIcon }).bindTooltip("Almakar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Almakar);
const Charbodia = L.marker([-107.14, 143.02], { icon: planetIcon }).bindTooltip("Charbodia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Charbodia);
const Daedalon = L.marker([-105.59, 143.17], { icon: planetIcon }).bindTooltip("Daedalon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Daedalon);
const Vob = L.marker([-106.23, 143.25], { icon: planetIcon }).bindTooltip("Vob", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vob);
const Ktil = L.marker([-105.86, 143.45], { icon: planetIcon }).bindTooltip("Ktil", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ktil);
const Vundaria = L.marker([-108.48, 143.67], { icon: planetIcon }).bindTooltip("Vundaria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vundaria);
const Manress = L.marker([-109.86, 143.73], { icon: planetIcon }).bindTooltip("Manress", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Manress);
const TunWala = L.marker([-106.47, 143.75], { icon: planetIcon }).bindTooltip("Tun Wala", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TunWala);
const Tocoya = L.marker([-106.33, 144.08], { icon: planetIcon }).bindTooltip("Tocoya", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tocoya);
const NahsuMin = L.marker([-106.53, 144.17], { icon: planetIcon }).bindTooltip("Nahsu Minor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(NahsuMin);
const Marotan = L.marker([-109.13, 144.53], { icon: planetIcon }).bindTooltip("Marotan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Marotan);
const M478 = L.marker([-111.20, 144.95], { icon: planetIcon }).bindTooltip("M4-78", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(M478);
const Asmall = L.marker([-106.84, 144.97], { icon: planetIcon }).bindTooltip("Asmall", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Asmall);
const Delrian = L.marker([-106.39, 145.61], { icon: planetIcon }).bindTooltip("Delrian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Delrian);
const Hylaia = L.marker([-109.25, 145.78], { icon: planetIcon }).bindTooltip("Hylaia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Hylaia);
const Loped = L.marker([-110.55, 146.20], { icon: planetIcon }).bindTooltip("Loped", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Loped);
const Haariden = L.marker([-109.92, 146.86], { icon: planetIcon }).bindTooltip("Haariden", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Haariden);
const BlacktarCyst = L.marker([-106.25, 147.42], { icon: planetIcon }).bindTooltip("Blacktar Cyst", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BlacktarCyst);

const Lorell = L.marker([-108.243, 147.497], { icon: planetIcon }).bindTooltip("Lorell", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lorell);
const Andalia = L.marker([-108.119, 147.574], { icon: planetIcon }).bindTooltip("Andalia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Andalia);
const Sennex = L.marker([-108.085, 147.582], { icon: planetIcon }).bindTooltip("Sennex", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Sennex);
const TelkurSta = L.marker([-108.178, 147.594], { icon: statonIcon }).bindTooltip("Telkur Sta.", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(TelkurSta);
const Daruvvia = L.marker([-108.051, 147.598], { icon: planetIcon }).bindTooltip("Daruvvia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Daruvvia);
const Ket = L.marker([-108.027, 147.603], { icon: planetIcon }).bindTooltip("Ket", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Ket);
const Lovola = L.marker([-107.981, 147.619], { icon: planetIcon }).bindTooltip("Lovola", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Lovola);
const Maires = L.marker([-107.955, 147.623], { icon: planetIcon }).bindTooltip("Maires", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Maires);
const Vergill = L.marker([-107.938, 147.629], { icon: planetIcon }).bindTooltip("Vergill", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Vergill);
const Chosper = L.marker([-108.188, 147.646], { icon: planetIcon }).bindTooltip("Chosper", { permanent: true, direction: 'right', offset: [-2, 6], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Chosper);
const Modus = L.marker([-107.929, 147.651], { icon: planetIcon }).bindTooltip("Modus", { permanent: true, direction: 'left', offset: [4, -11], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Modus);
const Charubah = L.marker([-107.958, 147.653], { icon: planetIcon }).bindTooltip("Charubah", { permanent: true, direction: 'left', offset: [2, 8], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Charubah);
const Jodaka = L.marker([-108.072, 147.673], { icon: planetIcon }).bindTooltip("Jodaka", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Jodaka);
const Divora = L.marker([-108.005, 147.675], { icon: planetIcon }).bindTooltip("Divora", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Divora);
const Stalsinek = L.marker([-108.103, 147.679], { icon: planetIcon }).bindTooltip("Stalsinek", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Stalsinek);
const Cheruba = L.marker([-107.958, 147.692], { icon: planetIcon }).bindTooltip("Cheruba", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Cheruba);
const Sargon = L.marker([-107.904, 147.694], { icon: planetIcon }).bindTooltip("Sargon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Sargon);
const Algnadesh = L.marker([-107.995, 147.697], { icon: planetIcon }).bindTooltip("Algnadesh", { permanent: true, direction: 'left', offset: [2, -9], className: 'leaflet-tooltip    ' }); zoom11.addLayer(Algnadesh);
const Wodan = L.marker([-107.985, 147.700], { icon: planetIcon }).bindTooltip("Wodan", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom11.addLayer(Wodan);
const Relephon = L.marker([-107.970, 147.713], { icon: planetIcon }).bindTooltip("Relephon", { permanent: true, direction: 'left', offset: [3, 8], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Relephon);
const Nantuker = L.marker([-108.132, 147.713], { icon: planetIcon }).bindTooltip("Nantuker", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Nantuker);
const Farnica = L.marker([-108.008, 147.736], { icon: planetIcon }).bindTooltip("Farnica", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Farnica);
const Sivoria = L.marker([-108.021, 147.737], { icon: planetIcon }).bindTooltip("Sivoria", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Sivoria);
const Novi = L.marker([-107.994, 147.739], { icon: planetIcon }).bindTooltip("Novi", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom11.addLayer(Novi);
const Talcharaim = L.marker([-107.036, 147.739], { icon: planetIcon }).bindTooltip("Talcharaim", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Talcharaim);
const Gallinore = L.marker([-107.984, 147.743], { icon: planetIcon }).bindTooltip("Gallinore", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom11.addLayer(Gallinore);
const Baldavia = L.marker([-107.991, 147.753], { icon: planetIcon }).bindTooltip("Baldavia", { permanent: true, direction: 'right', offset: [-4, -10], className: 'leaflet-tooltip   ' }); zoom11.addLayer(Baldavia);
const Millinar = L.marker([-108.010, 147.762], { icon: planetIcon }).bindTooltip("Millinar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom11.addLayer(Millinar);
const LalmyAsh = L.marker([-107.022, 147.764], { icon: planetIcon }).bindTooltip("Lalmy'ash", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(LalmyAsh);
const KFarri = L.marker([-108.172, 147.766], { icon: planetIcon }).bindTooltip("k'Farri", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom07.addLayer(KFarri);
const Febrini = L.marker([-107.910, 147.767], { icon: planetIcon }).bindTooltip("Febrini", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Febrini);
const Theselon = L.marker([-107.993, 147.769], { icon: planetIcon }).bindTooltip("Theselon", { permanent: true, direction: 'right', offset: [-12, 13], className: 'leaflet-tooltip   ' }); zoom11.addLayer(Theselon);
const Archais = L.marker([-108.031, 147.770], { icon: planetIcon }).bindTooltip("Archais", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom11.addLayer(Archais);
const Phelope = L.marker([-107.943, 147.776], { icon: planetIcon }).bindTooltip("Phelope", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Phelope);
const Zadaria = L.marker([-107.929, 147.777], { icon: planetIcon }).bindTooltip("Zadaria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Zadaria);
const Selab = L.marker([-108.039, 147.786], { icon: planetIcon }).bindTooltip("Selab", { permanent: true, direction: 'left', offset: [1, 6], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Selab);
const Ediorung = L.marker([-107.968, 147.789], { icon: planetIcon }).bindTooltip("Ediorung", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Ediorung);
const Harterra = L.marker([-108.032, 147.796], { icon: planetIcon }).bindTooltip("Harterra", { permanent: true, direction: 'left', offset: [15, -13], className: 'leaflet-tooltip   ' }); zoom11.addLayer(Harterra);
const Carlania = L.marker([-107.981, 147.798], { icon: planetIcon }).bindTooltip("Carlania", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom11.addLayer(Carlania);
const Arabanth = L.marker([-107.995, 147.804], { icon: planetIcon }).bindTooltip("Arabanth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Arabanth);
const Ut = L.marker([-108.021, 147.806], { icon: planetIcon }).bindTooltip("Ut", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Ut);
const Hapes = L.marker([-108.008, 147.811], { icon: pltIconCaL }).bindTooltip("Hapes", { permanent: true, direction: 'right', offset: [3, 0], className: 'leaflet-tooltip    ' }).bindPopup(HapesPopup, customOptions).addTo(map);
const Tumani = L.marker([-107.971, 147.812], { icon: planetIcon }).bindTooltip("Tumani", { permanent: true, direction: 'right', offset: [-4, -10], className: 'leaflet-tooltip   ' }); zoom10.addLayer(Tumani);
const Jovaria = L.marker([-108.042, 147.812], { icon: planetIcon }).bindTooltip("Jovaria", { permanent: true, direction: 'left', offset: [3, 9], className: 'leaflet-tooltip    ' }); zoom11.addLayer(Jovaria);
const Orelon = L.marker([-107.842, 147.820], { icon: planetIcon }).bindTooltip("Orelon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Orelon);
const Lemmi = L.marker([-108.034, 147.823], { icon: planetIcon }).bindTooltip("Lemmi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Lemmi);
const Tinta = L.marker([-107.974, 147.824], { icon: planetIcon }).bindTooltip("Tinta", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom11.addLayer(Tinta);
const Thrakia = L.marker([-108.047, 147.825], { icon: planetIcon }).bindTooltip("Thrakia", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Thrakia);
const Rbollea = L.marker([-107.981, 147.832], { icon: planetIcon }).bindTooltip("Rbollea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Rbollea);
const Rynmar = L.marker([-107.876, 147.853], { icon: planetIcon }).bindTooltip("Rynmar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Rynmar);
const Norulac = L.marker([-105.26, 147.87], { icon: planetIcon }).bindTooltip("Norulac", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Norulac);
const Zalori = L.marker([-107.893, 147.886], { icon: planetIcon }).bindTooltip("Zalori", { permanent: true, direction: 'right', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom10.addLayer(Zalori);
const Terephon = L.marker([-107.901, 147.888], { icon: planetIcon }).bindTooltip("Terephon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Terephon);
const Rainboh = L.marker([-107.859, 147.889], { icon: planetIcon }).bindTooltip("Rainboh", { permanent: true, direction: 'right', offset: [-3, -10], className: 'leaflet-tooltip   ' }); zoom08.addLayer(Rainboh);
const Calfa = L.marker([-108.169, 147.893], { icon: planetIcon }).bindTooltip("Calfa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Calfa);
const Dreena = L.marker([-108.131, 147.921], { icon: planetIcon }).bindTooltip("Dreena", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Dreena);
const SheduMaad = L.marker([-107.921, 147.922], { icon: planetIcon }).bindTooltip("Shedu Maad", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(SheduMaad);
const Reboam = L.marker([-108.068, 147.951], { icon: planetIcon }).bindTooltip("Reboam", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Reboam);
const RoqooDepot = L.marker([-107.875, 147.979], { icon: planetIcon }).bindTooltip("Roqoo Depot", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(RoqooDepot);
const Onderon = L.marker([-110.50, 148.81], { icon: pltIconCaL }).bindTooltip("Onderon", { permanent: true, direction: 'left', offset: [-3, -1], className: 'leaflet-tooltip    ' }).bindPopup(OnderonPopup, customOptions).addTo(map);
const Kashyyyk = L.marker([-110.63, 155.94], { icon: pltIconCaL2 }).bindTooltip("Kashyyyk / Trandosha", { permanent: true, direction: 'right', offset: [3, -1], className: 'leaflet-tooltip-mov' }).bindPopup(KashyyykPopup, customOptions).addTo(map);
const Charros = L.marker([-107.63, 164.75], { icon: planetIcon }).bindTooltip("Charros", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Alee = L.marker([-110.00, 169.31], { icon: planetIcon }).bindTooltip("Alee", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Alee);
const Cyborrea = L.marker([-110.18, 173.00], { icon: planetIcon }).bindTooltip("Cyborrea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Cyborrea);
const Khorya = L.marker([-105.36, 174.74], { icon: planetIcon }).bindTooltip("Khorya", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Khorya);
const Vodran = L.marker([-105.24, 174.78], { icon: planetIcon }).bindTooltip("Vodran", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vodran);
const Kintan = L.marker([-105.40, 174.83], { icon: pltIconCaL }).bindTooltip("Kintan", { permanent: true, direction: 'left', offset: [-2, 6], className: 'leaflet-tooltip    ' }); Kintan.bindPopup(KintanPopup, customOptions); zoom04.addLayer(Kintan);
const TasLa = L.marker([-105.18, 174.95], { icon: planetIcon }).bindTooltip("Tas-La", { permanent: true, direction: 'left', offset: [2, -8], className: 'leaflet-tooltip    ' }); zoom07.addLayer(TasLa);
const Klatooine = L.marker([-105.36, 175.00], { icon: pltIconCaL }).bindTooltip("Klatooine", { permanent: true, direction: 'right', offset: [2, 2], className: 'leaflet-tooltip    ' }).bindPopup(KlatooinePopup, customOptions).addTo(map);
const SiKlaataCl = L.marker([-105.22, 175.03], { icon: clustrIcon }).bindTooltip("Si'Klaata Cl.", { permanent: true, direction: 'right', offset: [-1, -9], className: 'leaflet-tooltip    ' }); zoom07.addLayer(SiKlaataCl);
const Vontor = L.marker([-105.27, 175.13], { icon: planetIcon }).bindTooltip("Vontor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Vontor);
const Nimia = L.marker([-105.23, 175.75], { icon: planetIcon }).bindTooltip("Nimia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Nimia);
const AkritTar = L.marker([-107.47, 182.55], { icon: planetIcon }).bindTooltip("Akrit'tar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
//======================================== row 10 ===== ALDERAAN =========================
const ExplumeMinor = L.marker([-114.25, 87.50], { icon: planetIcon }).bindTooltip("Explume Minor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ExplumeMinor);
const Crakull = L.marker([-116.34, 95.06], { icon: planetIcon }).bindTooltip("Crakull", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Crakull);
const Jedha = L.marker([-114.69, 100.81], { icon: pltIconCan2 }).bindTooltip("Jedha", { permanent: true, direction: 'left', offset: [-4, -1], className: 'leaflet-tooltip-mov' }).bindPopup(JedhaPopup, customOptions).addTo(map);
const Iol = L.marker([-113.48, 105.38], { icon: planetIcon }).bindTooltip("Iol", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Iol);
const Ianane = L.marker([-112.44, 106.86], { icon: planetIcon }).bindTooltip("Ianane", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ianane);
const Stovax = L.marker([-114.55, 115.80], { icon: planetIcon }).bindTooltip("Stovax", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Stovax);
const Phracas = L.marker([-112.30, 117.24], { icon: planetIcon }).bindTooltip("Phracas", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Phracas);
const KhadajiS = L.marker([-113.34, 117.56], { icon: blkhleIcon }).bindTooltip("Khadaji Singularity", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(KhadajiS);
const Praxlis = L.marker([-112.90, 117.98], { icon: planetIcon }).bindTooltip("Praxlis", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Praxlis);
const Kokash = L.marker([-116.09, 117.56], { icon: planetIcon }).bindTooltip("Kokash", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Kokash);
const TheMarais = L.marker([-114.74, 118.13], { icon: clustrIcon }).bindTooltip("The Marais", { permanent: true, direction: 'left', offset: [-4, -1], className: 'leaflet-tooltip    ' }); zoom06.addLayer(TheMarais);
const Pollillus = L.marker([-115.88, 118.17], { icon: planetIcon }).bindTooltip("Pollillus", { permanent: true, direction: 'right', offset: [2, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pollillus);
const Widek = L.marker([-115.52, 118.48], { icon: planetIcon }).bindTooltip("Widek", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Widek);
const Galantos = L.marker([-115.37, 118.48], { icon: planetIcon }).bindTooltip("Galantos", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Galantos);
const Thobek = L.marker([-115.24, 118.51], { icon: planetIcon }).bindTooltip("Thobek", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Thobek);
const Tamban = L.marker([-114.61, 118.58], { icon: planetIcon }).bindTooltip("Tamban", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tamban);
const Granna = L.marker([-113.53, 118.45], { icon: planetIcon }).bindTooltip("Granna", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Granna);
const Bosch = L.marker([-112.70, 118.76], { icon: planetIcon }).bindTooltip("Bosch", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bosch);
const Norne = L.marker([-112.05, 119.01], { icon: planetIcon }).bindTooltip("Norne", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Norne);
const Wehttam = L.marker([-115.14, 118.66], { icon: planetIcon }).bindTooltip("Wehttam", { permanent: true, direction: 'left', offset: [-1, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Wehttam);
const Orooturoo = L.marker([-115.19, 118.79], { icon: planetIcon }).bindTooltip("Orooturoo", { permanent: true, direction: 'right', offset: [0, -1], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Orooturoo);
const KoornachtCl = L.marker([-115.35, 118.63], { icon: clustrIcon }).bindTooltip("Koornacht Cl.", { permanent: true, direction: 'right', offset: [3, 3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KoornachtCl);
const Aradia = L.marker([-114.05, 118.95], { icon: planetIcon }).bindTooltip("Aradia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Aradia);
const Osadia = L.marker([-112.96, 119.07], { icon: planetIcon }).bindTooltip("Osadia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Osadia);
const Jevelet = L.marker([-113.14, 119.64], { icon: planetIcon }).bindTooltip("Jevelet", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jevelet);
const Endrolia = L.marker([-113.52, 119.76], { icon: planetIcon }).bindTooltip("Endrolia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Endrolia);
const Ucret = L.marker([-112.39, 120.03], { icon: planetIcon }).bindTooltip("Ucret", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ucret);
const Coruschal = L.marker([-111.96, 120.49], { icon: planetIcon }).bindTooltip("Coruschal", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Coruschal);
const CalSeti = L.marker([-114.03, 120.00], { icon: planetIcon }).bindTooltip("Cal-Seti", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(CalSeti);
const Canastra = L.marker([-114.43, 120.01], { icon: planetIcon }).bindTooltip("Canastra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Canastra);
const Fresia = L.marker([-113.70, 120.89], { icon: planetIcon }).bindTooltip("Fresia", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fresia);
const Galand = L.marker([-113.39, 121.20], { icon: planetIcon }).bindTooltip("Galand", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Galand);
const WorruDu = L.marker([-112.91, 121.45], { icon: planetIcon }).bindTooltip("Worru'du", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(WorruDu);
const Volgax = L.marker([-112.51, 121.77], { icon: planetIcon }).bindTooltip("Volgax", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Volgax);
const Tallia = L.marker([-113.16, 121.80], { icon: planetIcon }).bindTooltip("Tallia", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tallia);
const Alland = L.marker([-112.96, 122.20], { icon: planetIcon }).bindTooltip("Alland", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Alland);
const Prakith = L.marker([-117.49, 121.93], { icon: planetIcon }).bindTooltip("Prakith", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Prakith);
const Norkronia = L.marker([-112.13, 122.68], { icon: planetIcon }).bindTooltip("Norkronia", { permanent: true, direction: 'left', offset: [-1, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Norkronia);
const Ondos = L.marker([-113.29, 122.75], { icon: planetIcon }).bindTooltip("Ondos", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ondos);
const Ensolica = L.marker([-112.16, 123.05], { icon: planetIcon }).bindTooltip("Ensolica", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Ensolica);
const Woqua = L.marker([-112.71, 122.97], { icon: planetIcon }).bindTooltip("Woqua", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Woqua);
const Salliche = L.marker([-112.96, 123.11], { icon: planetIcon }).bindTooltip("Salliche", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Salliche);
const Pizkoss = L.marker([-111.88, 123.12], { icon: planetIcon }).bindTooltip("Pizkoss", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Pizkoss);
const Stassia = L.marker([-112.55, 123.98], { icon: planetIcon }).bindTooltip("Stassia", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Stassia);
const Ruan = L.marker([-112.65, 124.71], { icon: planetIcon }).bindTooltip("Ruan", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ruan);
const Foerost = L.marker([-112.20, 124.78], { icon: pltIconCaL }).bindTooltip("Foerost", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }); Foerost.bindPopup(FoerostPopup, customOptions); zoom05.addLayer(Foerost);
const Kaikielius = L.marker([-112.47, 124.77], { icon: planetIcon }).bindTooltip("Kaikielius", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kaikielius);
const Jerrilek = L.marker([-113.17, 124.83], { icon: planetIcon }).bindTooltip("Jerrilek", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jerrilek);
const Jonsior = L.marker([-112.24, 124.93], { icon: planetIcon }).bindTooltip("Jonsior", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jonsior);
const Coruscul = L.marker([-112.82, 125.00], { icon: planetIcon }).bindTooltip("Coruscul", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Coruscul);
const Spira = L.marker([-113.02, 125.38], { icon: planetIcon }).bindTooltip("Spira", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Spira);
const Carlem = L.marker([-112.22, 125.98], { icon: planetIcon }).bindTooltip("Carlem", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Carlem);
const Symbia = L.marker([-115.00, 124.09], { icon: planetIcon }).bindTooltip("Symbia", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Symbia);
const KeearaMaj = L.marker([-115.49, 124.21], { icon: planetIcon }).bindTooltip("Keeara Major", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KeearaMaj);
const Kuar = L.marker([-114.57, 124.56], { icon: planetIcon }).bindTooltip("Kuar", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kuar);
const Tython = L.marker([-116.81, 124.86], { icon: pltIconCaL2 }).bindTooltip("Tython", { permanent: true, direction: 'left', offset: [-6, -1], className: 'leaflet-tooltip    ' }).bindPopup(TythonPopup, customOptions).addTo(map);
const Ronika = L.marker([-114.42, 124.78], { icon: planetIcon }).bindTooltip("Ronika", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Ronika);
const EmpressTeta = L.marker([-114.99, 124.84], { icon: planetIcon }).bindTooltip("Empress Teta", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(EmpressTeta);
const StarswarmCl = L.marker([-114.34, 125.38], { icon: clustrIcon }).bindTooltip("Starswarm Cl.", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(StarswarmCl);
const Iope = L.marker([-113.98, 125.46], { icon: planetIcon }).bindTooltip("Iope", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Iope);
const Peshara = L.marker([-112.21, 126.88], { icon: planetIcon }).bindTooltip("Peshara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Peshara);
const Ixtlar = L.marker([-111.95, 127.09], { icon: pltIconCaL }).bindTooltip("Ixtlar", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); Ixtlar.bindPopup(IxtlarPopup, customOptions); zoom05.addLayer(Ixtlar);
const Yulant = L.marker([-112.75, 126.95], { icon: planetIcon }).bindTooltip("Yulant", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Yulant);
const PrimusGoluud = L.marker([-114.08, 127.06], { icon: planetIcon }).bindTooltip("Primus Goluud", { permanent: true, direction: 'right', offset: [-1, -6], className: 'leaflet-tooltip    ' }); zoom06.addLayer(PrimusGoluud);
const Malpassia = L.marker([-112.84, 127.13], { icon: planetIcon }).bindTooltip("Malpassia", { permanent: true, direction: 'right', offset: [1, -6], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Malpassia);
const Aargau = L.marker([-112.99, 127.39], { icon: planetIcon }).bindTooltip("Aargau", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Aargau);
const Besero = L.marker([-114.15, 127.96], { icon: planetIcon }).bindTooltip("Besero", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Besero);
const Galdronia = L.marker([-113.63, 128.12], { icon: planetIcon }).bindTooltip("Galdronia", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Galdronia);
const Wukkar = L.marker([-112.57, 128.46], { icon: planetIcon }).bindTooltip("Wukkar", { permanent: true, direction: 'left', offset: [-1, -5], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Wukkar);
const Boruga = L.marker([-112.61, 128.58], { icon: planetIcon }).bindTooltip("Boruga", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Boruga);
const Vultar = L.marker([-112.05, 128.96], { icon: planetIcon }).bindTooltip("Vultar", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vultar);
const Korfanus = L.marker([-113.45, 128.57], { icon: planetIcon }).bindTooltip("Korfanus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Korfanus);
const Vulpter = L.marker([-114.85, 128.53], { icon: planetIcon }).bindTooltip("Vulpter", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Vulpter);
const GoluudMin = L.marker([-113.97, 128.69], { icon: planetIcon }).bindTooltip("Goluud Minor", { permanent: true, direction: 'right', offset: [-1, -3], className: 'leaflet-tooltip    ' }); zoom07.addLayer(GoluudMin);
const Broest = L.marker([-113.29, 129.02], { icon: planetIcon }).bindTooltip("Broest", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Broest);
const Bandonia = L.marker([-114.15, 129.51], { icon: planetIcon }).bindTooltip("Bandonia", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bandonia);
const Kailor = L.marker([-113.02, 129.30], { icon: planetIcon }).bindTooltip("Kailor", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kailor);
const HadAbbadon = L.marker([-116.78, 129.53], { icon: planetIcon }).bindTooltip("Had Abbadon", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(HadAbbadon);
const ButlersCove = L.marker([-114.84, 129.92], { icon: planetIcon }).bindTooltip("Butler's Cove", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(ButlersCove);
const Barbeen = L.marker([-116.07, 129.95], { icon: planetIcon }).bindTooltip("Barbeen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Barbeen);
const Vulderania = L.marker([-112.34, 130.14], { icon: planetIcon }).bindTooltip("Vulderania", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Vulderania);
const Xorth = L.marker([-113.52, 130.09], { icon: planetIcon }).bindTooltip("Xorth", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Xorth);
const Heliconia = L.marker([-114.94, 130.11], { icon: planetIcon }).bindTooltip("Heliconia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Heliconia);
const Nakadia = L.marker([-111.84, 130.50], { icon: planetIcon }).bindTooltip("Nakadia*", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Nakadia);
const Cardua = L.marker([-113.27, 130.43], { icon: planetIcon }).bindTooltip("Cardua", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cardua);
const Adana = L.marker([-115.75, 130.57], { icon: planetIcon }).bindTooltip("Adana", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Adana);
const Cambria = L.marker([-115.58, 130.59], { icon: planetIcon }).bindTooltip("Cambria", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cambria);
const Darellia = L.marker([-114.69, 130.99], { icon: planetIcon }).bindTooltip("Darellia", { permanent: true, direction: 'left', offset: [-1, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Darellia);
const Birsingrial = L.marker([-112.01, 131.17], { icon: planetIcon }).bindTooltip("Birsingrial", { permanent: true, direction: 'left', offset: [-1, 2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Birsingrial);
const Aldraig = L.marker([-112.98, 131.63], { icon: planetIcon }).bindTooltip("Aldraig", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Aldraig);
const KarnakAlpha = L.marker([-112.16, 131.71], { icon: planetIcon }).bindTooltip("Karnak Alpha", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(KarnakAlpha);
const Trantor = L.marker([-113.42, 132.08], { icon: planetIcon }).bindTooltip("Trantor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Trantor);
const Debray = L.marker([-114.62, 132.31], { icon: planetIcon }).bindTooltip("Debray", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Debray);
const Darwikia = L.marker([-111.76, 132.40], { icon: planetIcon }).bindTooltip("Darwikia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Darwikia);
const Demophon = L.marker([-113.83, 132.50], { icon: planetIcon }).bindTooltip("Demophon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Demophon);
const Palawa = L.marker([-112.67, 130.78], { icon: planetIcon }).bindTooltip("Palawa", { permanent: true, direction: 'right', offset: [1, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Palawa);
const Mowgle = L.marker([-116.10, 131.30], { icon: planetIcon }).bindTooltip("Mowgle", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Mowgle);
const Jumeria = L.marker([-113.73, 131.45], { icon: planetIcon }).bindTooltip("Jumeria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jumeria);
const Refgar = L.marker([-114.82, 131.49], { icon: planetIcon }).bindTooltip("Refgar", { permanent: true, direction: 'right', offset: [1, -2], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Refgar);
const Ator = L.marker([-116.58, 131.48], { icon: planetIcon }).bindTooltip("Ator", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ator);
const Dremulae = L.marker([-116.63, 131.38], { icon: planetIcon }).bindTooltip("Dremulae", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Dremulae);
const Vuma = L.marker([-115.52, 132.06], { icon: planetIcon }).bindTooltip("Vuma", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Vuma);
const Marfa = L.marker([-117.74, 132.28], { icon: planetIcon }).bindTooltip("Marfa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Marfa);
const BarLeth = L.marker([-116.58, 132.70], { icon: planetIcon }).bindTooltip("Bar'leth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BarLeth);
const Garwillia = L.marker([-117.42, 132.84], { icon: planetIcon }).bindTooltip("Garwillia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Garwillia);
const LeriaKerlsil = L.marker([-117.07, 132.95], { icon: planetIcon }).bindTooltip("Leria Kerlsil", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(LeriaKerlsil);
const Lenniera = L.marker([-115.73, 133.38], { icon: planetIcon }).bindTooltip("Lenniera", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lenniera);
const Magmar = L.marker([-116.83, 133.29], { icon: planetIcon }).bindTooltip("Magmar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Magmar);
const Jaxus = L.marker([-116.02, 133.77], { icon: planetIcon }).bindTooltip("Jaxus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jaxus);
const Tetso = L.marker([-112.70, 133.05], { icon: planetIcon }).bindTooltip("Tetso", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tetso);
const Glithnos = L.marker([-114.35, 133.05], { icon: planetIcon }).bindTooltip("Glithnos", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Glithnos);
const Alderaan = L.marker([-112.05, 133.22], { icon: pltIconCaL2 }).bindTooltip("Alderaan", { permanent: true, direction: 'right', offset: [3, -1], className: 'leaflet-tooltip-mov' }).bindPopup(AlderaanPopup, customOptions).addTo(map);
const Jastro = L.marker([-112.66, 133.40], { icon: planetIcon }).bindTooltip("Jastro", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jastro);
const Fedalle = L.marker([-115.05, 133.67], { icon: planetIcon }).bindTooltip("Fedalle", { permanent: true, direction: 'left', offset: [0, 1], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Fedalle);
const Badfellow = L.marker([-115.46, 133.90], { icon: statonIcon }).bindTooltip("Badfellow", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Badfellow);
const Sarapin = L.marker([-117.97, 134.12], { icon: planetIcon }).bindTooltip("Sarapin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sarapin);
const Lusdu = L.marker([-113.57, 133.95], { icon: planetIcon }).bindTooltip("Lusdu", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lusdu);
const Thixia = L.marker([-111.81, 133.92], { icon: planetIcon }).bindTooltip("Thixia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Thixia);
const TyedKant = L.marker([-113.17, 134.21], { icon: planetIcon }).bindTooltip("Tyed Kant", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TyedKant);
const Ferijia = L.marker([-113.85, 134.38], { icon: planetIcon }).bindTooltip("Ferijia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ferijia);
const Gendoraan = L.marker([-114.08, 134.44], { icon: planetIcon }).bindTooltip("Gendoraan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gendoraan);
const Nopachi = L.marker([-112.37, 134.59], { icon: planetIcon }).bindTooltip("Nopachi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nopachi);
const Talravin = L.marker([-116.58, 134.58], { icon: planetIcon }).bindTooltip("Talravin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Talravin);
const Lespectus = L.marker([-115.20, 134.93], { icon: planetIcon }).bindTooltip("Lespectus", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lespectus);
const Ruul = L.marker([-117.33, 134.98], { icon: planetIcon }).bindTooltip("Ruul", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ruul);
const Baylagon = L.marker([-115.24, 135.09], { icon: planetIcon }).bindTooltip("Baylagon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Baylagon);
const Marngar = L.marker([-116.17, 135.11], { icon: planetIcon }).bindTooltip("Marngar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Marngar);
const Trellen = L.marker([-118.13, 135.41], { icon: planetIcon }).bindTooltip("Trellen", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Trellen);
const FostarHaven = L.marker([-111.92, 135.18], { icon: statonIcon }).bindTooltip("Fostar Haven", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(FostarHaven);
const Corutarn = L.marker([-113.62, 135.32], { icon: planetIcon }).bindTooltip("Corutarn", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Corutarn);
const Tartaria = L.marker([-114.53, 135.48], { icon: planetIcon }).bindTooltip("Tartaria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tartaria);
const Raxxa = L.marker([-115.30, 135.69], { icon: planetIcon }).bindTooltip("Raxxa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Raxxa);
const Parkis = L.marker([-113.22, 135.86], { icon: planetIcon }).bindTooltip("Parkis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Parkis);
const Berrun = L.marker([-112.91, 135.97], { icon: planetIcon }).bindTooltip("Berrun", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Berrun);
const Montross = L.marker([-113.41, 137.07], { icon: planetIcon }).bindTooltip("Montross", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Montross);
const Kattada = L.marker([-113.27, 137.16], { icon: planetIcon }).bindTooltip("Kattada", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Kattada);
const Krintrino = L.marker([-111.86, 137.20], { icon: planetIcon }).bindTooltip("Krintrino", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Krintrino);
const Pria = L.marker([-117.16, 136.01], { icon: planetIcon }).bindTooltip("Pria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pria);
const Vannix = L.marker([-115.88, 136.13], { icon: planetIcon }).bindTooltip("Vannix", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vannix);
const Manaxia = L.marker([-116.25, 136.34], { icon: planetIcon }).bindTooltip("Manaxia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Manaxia);
const Kuat = L.marker([-115.46, 136.71], { icon: pltIconCaL }).bindTooltip("Kuat", { permanent: true, direction: 'left', offset: [-4, -1], className: 'leaflet-tooltip    ' }).bindPopup(KuatPopup, customOptions).addTo(map);
const BalmorraNeim = L.marker([-115.59, 136.88], { icon: planetIcon }).bindTooltip("Balmorra / Neimoidia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(BalmorraNeim);
const Sarconia = L.marker([-114.85, 137.16], { icon: planetIcon }).bindTooltip("Sarconia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sarconia);
const Bulano = L.marker([-117.66, 137.44], { icon: planetIcon }).bindTooltip("Bulano", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bulano);
const Humbarine = L.marker([-118.14, 137.05], { icon: planetIcon }).bindTooltip("Humbarine", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Humbarine);
const Reopi = L.marker([-117.09, 137.38], { icon: planetIcon }).bindTooltip("Reopi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Reopi);
const Gravdinia = L.marker([-112.06, 137.95], { icon: planetIcon }).bindTooltip("Gravdinia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gravdinia);
const Uquine = L.marker([-113.84, 138.16], { icon: planetIcon }).bindTooltip("Uquine", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Uquine);
const Foundry = L.marker([-116.53, 137.96], { icon: planetIcon }).bindTooltip("Foundry", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Foundry);
const Vertseth = L.marker([-117.44, 138.66], { icon: planetIcon }).bindTooltip("Vertseth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vertseth);
const Tasrin = L.marker([-115.28, 138.77], { icon: planetIcon }).bindTooltip("Tasrin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tasrin);
const Seraphan = L.marker([-116.59, 139.78], { icon: planetIcon }).bindTooltip("Seraphan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Seraphan);
const Commenor = L.marker([-118.03, 139.88], { icon: pltIconCaL }).bindTooltip("Commenor", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(CommenorPopup, customOptions).addTo(map);
const Telti = L.marker([-112.28, 143.64], { icon: planetIcon }).bindTooltip("Telti", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Telti);
const Zeltros = L.marker([-115.86, 147.77], { icon: planetIcon }).bindTooltip("Zeltros", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Umbara = L.marker([-113.05, 151.27], { icon: pltIconCaL }).bindTooltip("Umbara", { permanent: true, direction: 'right', offset: [3, 0], className: 'leaflet-tooltip    ' }).bindPopup(UmbaraPopup, customOptions).addTo(map);
const Kwenn = L.marker([-116.94, 166.87], { icon: pltIconCaL }).bindTooltip("Kwenn", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(KwennPopup, customOptions).addTo(map);
const Kessel = L.marker([-112.13, 180.31], { icon: pltIconCaL2 }).bindTooltip("Kessel", { permanent: true, direction: 'right', offset: [3, -1], className: 'leaflet-tooltip-mov' }).bindPopup(KesselPopup, customOptions).addTo(map);
const Eadu = L.marker([-114.72, 183.94], { icon: pltIconCan2 }).bindTooltip("Eadu", { permanent: true, direction: 'right', offset: [2, -1], className: 'leaflet-tooltip-mov' }).bindPopup(EaduPopup, customOptions).addTo(map);
//======================================== row 11 ===== CORELLIA =========================
const MuggFallow = L.marker([-120.23, 72.42], { icon: planetIcon }).bindTooltip("Mugg Fallow", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(MuggFallow);
const Viis = L.marker([-124.30, 85.86], { icon: planetIcon }).bindTooltip("Viis", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Viis);
const Persappa = L.marker([-119.47, 88.39], { icon: planetIcon }).bindTooltip("Persappa", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Throffdon);
const Tulpaa = L.marker([-120.50, 90.08], { icon: planetIcon }).bindTooltip("Tulpaa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tulpaa);
const Makatak = L.marker([-122.81, 91.14], { icon: planetIcon }).bindTooltip("Makatak", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Makatak);
const RakataPr = L.marker([-122.94, 94.75], { icon: pltIconCaL }).bindTooltip("Rakata Prime (Lehon)", { permanent: true, direction: 'left', offset: [-4, 9], className: 'leaflet-tooltip    ' }).bindPopup(RakataPrPopup, customOptions).addTo(map);
const LaoMon = L.marker([-123.83, 109.03], { icon: planetIcon }).bindTooltip("Lao-mon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Odik = L.marker([-118.81, 119.75], { icon: planetIcon }).bindTooltip("Odik", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Odik);
const Byss = L.marker([-123.50, 121.62], { icon: pltIconCaL }).bindTooltip("Byss", { permanent: true, direction: 'left', offset: [-4, -1], className: 'leaflet-tooltip    ' }).bindPopup(ByssPopup, customOptions).addTo(map);
const TsossBeacon = L.marker([-118.48, 125.44], { icon: statonIcon }).bindTooltip("Tsoss Beacon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TsossBeacon);
const Kampe = L.marker([-118.29, 125.79], { icon: planetIcon }).bindTooltip("Kampe", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kampe);
const TarkinsFang = L.marker([-121.06, 130.94], { icon: planetIcon }).bindTooltip("Tarkin's Fang", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(TarkinsFang);
const Eclipse = L.marker([-123.13, 131.14], { icon: planetIcon }).bindTooltip("Eclipse", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Eclipse);
const Murakam = L.marker([-124.47, 131.34], { icon: planetIcon }).bindTooltip("Murakam", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Murakam);
const Ebaq = L.marker([-120.95, 131.67], { icon: planetIcon }).bindTooltip("Ebaq", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ebaq);
const CosSecundu = L.marker([-119.61, 131.77], { icon: planetIcon }).bindTooltip("Cos Secundu", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(CosSecundu);
const Ojom = L.marker([-122.23, 131.77], { icon: planetIcon }).bindTooltip("Ojom", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Ojom);
const Cosia = L.marker([-119.85, 132.05], { icon: planetIcon }).bindTooltip("Cosia", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Cosia);
const Ottabesk = L.marker([-121.98, 132.06], { icon: planetIcon }).bindTooltip("Ottabesk", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ottabesk);
const Hakassi = L.marker([-121.58, 132.11], { icon: planetIcon }).bindTooltip("Hakassi", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Hakassi);
const Thoadeye = L.marker([-119.00, 132.41], { icon: planetIcon }).bindTooltip("Thoadeye", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thoadeye);
const Carconth = L.marker([-123.91, 132.58], { icon: planetIcon }).bindTooltip("Carconth", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Carconth);
const Solassus = L.marker([-118.38, 132.64], { icon: planetIcon }).bindTooltip("Solassus", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Solassus);
const Lettow = L.marker([-121.23, 132.86], { icon: pltIconCaL }).bindTooltip("Lettow", { permanent: true, direction: 'left', offset: [-4, 0], className: 'leaflet-tooltip    ' }).bindPopup(LettowPopup, customOptions).addTo(map);
const Ansata = L.marker([-123.12, 132.98], { icon: planetIcon }).bindTooltip("Ansata", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ansata);
const Verdanaia = L.marker([-118.94, 133.31], { icon: planetIcon }).bindTooltip("Verdanaia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Verdanaia);
const Columus = L.marker([-120.14, 133.41], { icon: planetIcon }).bindTooltip("Columus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Columus);
const Perma = L.marker([-118.58, 133.51], { icon: planetIcon }).bindTooltip("Perma", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Perma);
const Messia = L.marker([-124.41, 133.62], { icon: planetIcon }).bindTooltip("Messia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Messia);
const Ilthan = L.marker([-122.61, 133.67], { icon: planetIcon }).bindTooltip("Ilthan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ilthan);
const Lolnar = L.marker([-119.31, 133.76], { icon: planetIcon }).bindTooltip("Lolnar", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lolnar);
const Xerxes = L.marker([-122.23, 133.91], { icon: planetIcon }).bindTooltip("Xerxes", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Xerxes);
const Kamori = L.marker([-120.83, 133.98], { icon: planetIcon }).bindTooltip("Kamori", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kamori);
const Johria = L.marker([-118.98, 134.27], { icon: planetIcon }).bindTooltip("Johria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Johria);
const Rehemsa = L.marker([-121.52, 134.42], { icon: planetIcon }).bindTooltip("Rehemsa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Rehemsa);
const Sedratis = L.marker([-122.24, 134.59], { icon: planetIcon }).bindTooltip("Sedratis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sedratis);
const Fromish = L.marker([-120.01, 134.62], { icon: planetIcon }).bindTooltip("Fromish", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Fromish);
const Recopia = L.marker([-119.68, 134.69], { icon: planetIcon }).bindTooltip("Recopia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Recopia);
const Jumus = L.marker([-124.02, 134.85], { icon: planetIcon }).bindTooltip("Jumus", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Jumus);
const RydonniPr = L.marker([-123.08, 134.90], { icon: planetIcon }).bindTooltip("Rydonni Prime", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(RydonniPr);
const VelxShel = L.marker([-123.83, 134.92], { icon: planetIcon }).bindTooltip("Velx-Shel", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(VelxShel);
const Sacorria = L.marker([-123.97, 134.95], { icon: planetIcon }).bindTooltip("Sacorria", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Sacorria);
const XyuineII = L.marker([-124.17, 134.99], { icon: planetIcon }).bindTooltip("Xyuine II", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(XyuineII);
const Duro = L.marker([-124.34, 135.00], { icon: planetIcon }).bindTooltip("Duro", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Duro);
const Telepan = L.marker([-120.56, 135.09], { icon: planetIcon }).bindTooltip("Telepan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Telepan);
const Forvand = L.marker([-124.29, 135.14], { icon: planetIcon }).bindTooltip("Forvand", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Forvand);
const Dorsis = L.marker([-123.59, 135.01], { icon: planetIcon }).bindTooltip("Dorsis", { permanent: true, direction: 'left', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Dorsis);
const Graland = L.marker([-123.85, 135.01], { icon: planetIcon }).bindTooltip("Graland", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Graland);
const Craeen = L.marker([-123.75, 135.05], { icon: planetIcon }).bindTooltip("Craeen", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Craeen);
const Vagran = L.marker([-123.99, 135.05], { icon: planetIcon }).bindTooltip("Vagran", { permanent: true, direction: 'right', offset: [-9, -12], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Vagran);
const NewPlympto = L.marker([-124.14, 135.07], { icon: planetIcon }).bindTooltip("New Plympto", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(NewPlympto);
const Aurea = L.marker([-123.92, 135.10], { icon: planetIcon }).bindTooltip("Aurea", { permanent: true, direction: 'left', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Aurea);
const Saberhing = L.marker([-123.70, 135.12], { icon: planetIcon }).bindTooltip("Saberhing", { permanent: true, direction: 'left', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Saberhing);
const Vasar = L.marker([-123.78, 135.12], { icon: planetIcon }).bindTooltip("Vasar", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Vasar);
const Plympto = L.marker([-124.01, 135.12], { icon: planetIcon }).bindTooltip("Plympto", { permanent: true, direction: 'left', offset: [0, 6], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Plympto);
const Khomr = L.marker([-123.99, 135.16], { icon: planetIcon }).bindTooltip("Khomr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Khomr);
const Corfai = L.marker([-124.14, 135.18], { icon: planetIcon }).bindTooltip("Corfai", { permanent: true, direction: 'right', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Corfai);
const Corellia = L.marker([-123.86, 135.19], { icon: pltIconCaL2 }).bindTooltip("Corellia", { permanent: true, direction: 'right', offset: [3, -2], className: 'leaflet-tooltip-mov' }).bindPopup(CorelliaPopup, customOptions).addTo(map);
const Tanthior = L.marker([-124.05, 135.24], { icon: planetIcon }).bindTooltip("Tanthior", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Tanthior);
const Altawar = L.marker([-123.77, 135.25], { icon: planetIcon }).bindTooltip("Altawar", { permanent: true, direction: 'left', offset: [0, -8], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Altawar);
const Polanis = L.marker([-123.98, 135.28], { icon: planetIcon }).bindTooltip("Polanis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Polanis);
const Truuzdann = L.marker([-124.18, 135.29], { icon: planetIcon }).bindTooltip("Truuzdann", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Truuzdann);
const Keral = L.marker([-123.77, 135.33], { icon: planetIcon }).bindTooltip("Keral", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Keral);
const Nubia = L.marker([-124.36, 135.36], { icon: planetIcon }).bindTooltip("Nubia", { permanent: true, direction: 'right', offset: [0, 6], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Nubia);
const Sileria = L.marker([-124.16, 135.37], { icon: planetIcon }).bindTooltip("Sileria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Sileria);
const Rendili = L.marker([-120.85, 135.37], { icon: planetIcon }).bindTooltip("Rendili", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rendili);
const Phemis = L.marker([-123.93, 135.40], { icon: planetIcon }).bindTooltip("Phemis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom08.addLayer(Phemis);
const Goorla = L.marker([-124.10, 135.43], { icon: planetIcon }).bindTooltip("Goorla", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Goorla);
const Talfaglio = L.marker([-124.23, 135.44], { icon: planetIcon }).bindTooltip("Talfaglio", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Talfaglio);
const Govia = L.marker([-123.83, 135.44], { icon: planetIcon }).bindTooltip("Govia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom09.addLayer(Govia);
const Liaq = L.marker([-119.08, 135.47], { icon: planetIcon }).bindTooltip("Liaq", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Liaq);
const Mawan = L.marker([-118.91, 135.76], { icon: planetIcon }).bindTooltip("Mawan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Mawan);
const OrdSardoran = L.marker([-123.52, 136.04], { icon: planetIcon }).bindTooltip("Ord Sardoran", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdSardoran);
const Sestina = L.marker([-121.83, 136.09], { icon: planetIcon }).bindTooltip("Sestina", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sestina);
const Loretto = L.marker([-120.28, 136.31], { icon: planetIcon }).bindTooltip("Loretto", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Loretto);
const Verdoria = L.marker([-119.74, 136.31], { icon: planetIcon }).bindTooltip("Verdoria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Verdoria);
const Darakin = L.marker([-122.02, 136.34], { icon: planetIcon }).bindTooltip("Darakin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Darakin);
const Baraboo = L.marker([-121.23, 136.59], { icon: planetIcon }).bindTooltip("Baraboo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Baraboo);
const Gatalenta = L.marker([-118.25, 136.67], { icon: planetIcon }).bindTooltip("Gatalenta", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gatalenta);
const Bellassa = L.marker([-121.60, 136.69], { icon: planetIcon }).bindTooltip("Bellassa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bellassa);
const Zalso = L.marker([-123.82, 136.71], { icon: planetIcon }).bindTooltip("Zalso", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Zalso);
const Jaciprus = L.marker([-122.50, 136.95], { icon: planetIcon }).bindTooltip("Jaciprus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Jaciprus);
const Seyugi = L.marker([-119.53, 136.98], { icon: planetIcon }).bindTooltip("Seyugi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Seyugi);
const Voktunma = L.marker([-122.91, 137.06], { icon: planetIcon }).bindTooltip("Voktunma", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Voktunma);
const Jalin = L.marker([-124.46, 137.23], { icon: planetIcon }).bindTooltip("Jalin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Jalin);
const o2GS91E20 = L.marker([-118.70, 137.63], { icon: pheIconBlk }).bindTooltip("2GS-91E20", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(o2GS91E20);
const Kurdavvia = L.marker([-120.63, 137.66], { icon: planetIcon }).bindTooltip("Kurdavvia", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kurdavvia);
const Raed7 = L.marker([-122.64, 137.93], { icon: planetIcon }).bindTooltip("Raed-7", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Raed7);
const Vanjervalis = L.marker([-124.17, 138.25], { icon: planetIcon }).bindTooltip("Vanjervalis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vanjervalis);
const CatoNeimoidia = L.marker([-120.44, 138.73], { icon: pltIconCaL2 }).bindTooltip("Cato Neimoidia", { permanent: true, direction: 'right', offset: [3, -1], className: 'leaflet-tooltip-mov' }).bindPopup(CatoNeimoidiaPopup, customOptions).addTo(map);
const Talasea = L.marker([-121.79, 139.31], { icon: planetIcon }).bindTooltip("Talasea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Talasea);
const Manaan = L.marker([-121.03, 145.41], { icon: planetIcon }).bindTooltip("Manaan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Manaan);
const Cona = L.marker([-119.50, 146.02], { icon: planetIcon }).bindTooltip("Cona", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Cona);
const Ruusan = L.marker([-118.63, 156.69], { icon: pltIconCaL }).bindTooltip("Ruusan", { permanent: true, direction: 'right', offset: [3, 0], className: 'leaflet-tooltip    ' }).bindPopup(RuusanPopup, customOptions).addTo(map);
const Irith = L.marker([-119.94, 170.75], { icon: planetIcon }).bindTooltip("Irith", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const DaSoocha = L.marker([-121.02, 176.11], { icon: pltIconLeg }).bindTooltip("Da Soocha V", { permanent: true, direction: 'right', offset: [3, 0], className: 'leaflet-tooltip    ' }).bindPopup(DaSoochaVPopup, customOptions).addTo(map);
const Aduba = L.marker([-119.16, 185.47], { icon: pltIconCaL }).bindTooltip("Aduba-3", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(AdubaPopup, customOptions).addTo(map);
//========================================= row 12 ===== HOSNIAN ===========================
const Zakuul = L.marker([-130.97, 83.63], { icon: planetIcon }).bindTooltip("Zakuul", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Zakuul);
const Niorde = L.marker([-130.66, 87.41], { icon: planetIcon }).bindTooltip("Niorde", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Niorde);
const Hilak = L.marker([-127.42, 90.77], { icon: planetIcon }).bindTooltip("Hilak", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Hilak);
const Fitomp = L.marker([-126.66, 92.66], { icon: planetIcon }).bindTooltip("Fitomp", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Fitomp);
const Griwstrick = L.marker([-127.74, 93.38], { icon: planetIcon }).bindTooltip("Griwstrick", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Griwstrick);
const Malata = L.marker([-131.08, 95.20], { icon: planetIcon }).bindTooltip("Malata", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Malata);
const Adrathorpe = L.marker([-125.70, 101.16], { icon: planetIcon }).bindTooltip("Adrathorpe", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Adrathorpe);
const Rakaa = L.marker([-129.04, 114.48], { icon: planetIcon }).bindTooltip("Rakaa", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Rakaa);
const Kiliea = L.marker([-129.36, 115.81], { icon: planetIcon }).bindTooltip("Kiliea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kiliea);
const Frisal = L.marker([-130.67, 116.00], { icon: planetIcon }).bindTooltip("Frisal", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Frisal);
const Atrisia = L.marker([-130.42, 116.08], { icon: planetIcon }).bindTooltip("Atrisia (Kitel Phard)", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Atrisia);
const Cartusio = L.marker([-127.59, 116.03], { icon: planetIcon }).bindTooltip("Cartusio", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cartusio);
const Inysh = L.marker([-130.96, 116.97], { icon: planetIcon }).bindTooltip("Inysh", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Inysh);
const Questal = L.marker([-129.67, 117.03], { icon: planetIcon }).bindTooltip("Questal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Questal);
const Nathas = L.marker([-128.78, 117.28], { icon: planetIcon }).bindTooltip("Nathas", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nathas);
const OsssorckN = L.marker([-129.14, 118.11], { icon: nebIconBlk }).bindTooltip("Osssorck N.", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(OsssorckN);
const Adikaria = L.marker([-129.98, 118.92], { icon: planetIcon }).bindTooltip("Adikaria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Adikaria);
const Loedorvia = L.marker([-127.45, 119.00], { icon: planetIcon }).bindTooltip("Loedorvia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Loedorvia);
const Siola = L.marker([-127.98, 119.01], { icon: planetIcon }).bindTooltip("Siola", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Siola);
const KlerTerria = L.marker([-131.02, 119.41], { icon: planetIcon }).bindTooltip("Kler'terria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(KlerTerria);
const Iscno = L.marker([-127.96, 119.45], { icon: planetIcon }).bindTooltip("Iscno", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Iscno);
const Gyosha = L.marker([-129.68, 119.55], { icon: planetIcon }).bindTooltip("Gyosha", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gyosha);
const Piton = L.marker([-129.36, 120.71], { icon: planetIcon }).bindTooltip("Piton", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Piton);
const Cortina = L.marker([-129.78, 120.86], { icon: planetIcon }).bindTooltip("Cortina", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cortina);
const Vagneria = L.marker([-130.51, 122.11], { icon: planetIcon }).bindTooltip("Vagneria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vagneria);
const Thebeon = L.marker([-131.28, 122.65], { icon: planetIcon }).bindTooltip("Thebeon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Thebeon);
const Pargaux = L.marker([-130.47, 123.24], { icon: planetIcon }).bindTooltip("Pargaux", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pargaux);
const Kalist = L.marker([-124.74, 123.81], { icon: planetIcon }).bindTooltip("Kalist", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Kalist);
const Constancia = L.marker([-127.38, 123.82], { icon: planetIcon }).bindTooltip("Constancia", { permanent: true, direction: 'left', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Constancia);
const Daupherm = L.marker([-129.11, 123.53], { icon: planetIcon }).bindTooltip("Daupherm", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Daupherm);
const Lialic = L.marker([-126.44, 123.56], { icon: planetIcon }).bindTooltip("Lialic", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Lialic);
const Zamael = L.marker([-125.53, 123.86], { icon: planetIcon }).bindTooltip("Zamael", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Zamael);
const Thracior = L.marker([-129.76, 123.90], { icon: planetIcon }).bindTooltip("Thracior", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thracior);
const Kerensik = L.marker([-129.98, 124.30], { icon: planetIcon }).bindTooltip("Kerensik", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Kerensik);
const Botor = L.marker([-129.30, 124.48], { icon: planetIcon }).bindTooltip("Botor", { permanent: true, direction: 'right', offset: [0, -7], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Botor);
const Dulvoyinn = L.marker([-127.72, 124.52], { icon: planetIcon }).bindTooltip("Dulvoyinn", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Dulvoyinn);
const Gerrard = L.marker([-130.97, 124.55], { icon: planetIcon }).bindTooltip("Gerrard", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Gerrard);
const Numatra = L.marker([-130.24, 125.35], { icon: planetIcon }).bindTooltip("Numatra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Numatra);
const Khomm = L.marker([-128.28, 125.48], { icon: planetIcon }).bindTooltip("Khomm", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Khomm);
const Crystan = L.marker([-127.69, 125.56], { icon: planetIcon }).bindTooltip("Crystan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Crystan);
const Pkihantri = L.marker([-130.97, 127.42], { icon: planetIcon }).bindTooltip("Pkihantri", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pkihantri);
const Cioran = L.marker([-130.55, 127.81], { icon: planetIcon }).bindTooltip("Cioran", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cioran);
const Cerberon = L.marker([-127.88, 127.86], { icon: planetIcon }).bindTooltip("Cerberon*", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }).addTo(map);
const Lujo = L.marker([-128.82, 127.87], { icon: planetIcon }).bindTooltip("Lujo", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lujo);
const Azbrian = L.marker([-130.30, 128.70], { icon: planetIcon }).bindTooltip("Azbrian", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Azbrian);
const Shulxi = L.marker([-129.33, 128.73], { icon: planetIcon }).bindTooltip("Shulxi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Shulxi);
const Balosar = L.marker([-128.06, 129.09], { icon: planetIcon }).bindTooltip("Balosar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Balosar);
const Oligtaz = L.marker([-131.25, 129.90], { icon: planetIcon }).bindTooltip("Oligtaz", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Oligtaz);
const Forntay = L.marker([-131.13, 130.43], { icon: planetIcon }).bindTooltip("Forntay", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Forntay);
const Gama = L.marker([-127.78, 130.14], { icon: planetIcon }).bindTooltip("Gama", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gama);
const DiatiaMajor = L.marker([-126.86, 130.38], { icon: planetIcon }).bindTooltip("Diatia Major", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(DiatiaMajor);
const Dybrin = L.marker([-125.16, 130.66], { icon: planetIcon }).bindTooltip("Dybrin", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dybrin);
const Lansono = L.marker([-129.82, 131.05], { icon: planetIcon }).bindTooltip("Lansono", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Lansono);
const Hemei = L.marker([-125.79, 131.36], { icon: planetIcon }).bindTooltip("Hemei", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Hemei);
const Chamm = L.marker([-128.04, 131.62], { icon: planetIcon }).bindTooltip("Chamm", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Chamm);
const Kobaria = L.marker([-128.99, 131.95], { icon: planetIcon }).bindTooltip("Kobaria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kobaria);
const Shumogi = L.marker([-127.08, 132.15], { icon: planetIcon }).bindTooltip("Shumogi", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Shumogi);
const Danteel = L.marker([-128.72, 132.23], { icon: planetIcon }).bindTooltip("Danteel", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Danteel);
const Cavaell = L.marker([-129.26, 132.34], { icon: planetIcon }).bindTooltip("Cavaell", { permanent: true, direction: 'left', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cavaell);
const Karvoss = L.marker([-125.05, 132.36], { icon: planetIcon }).bindTooltip("Karvoss", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Karvoss);
const Bethars = L.marker([-129.38, 132.42], { icon: planetIcon }).bindTooltip("Bethars", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bethars);
const Maltorra = L.marker([-127.45, 132.88], { icon: planetIcon }).bindTooltip("Maltorra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Maltorra);
const Cedrell = L.marker([-129.23, 132.92], { icon: planetIcon }).bindTooltip("Cedrell", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Cedrell);
const Padua = L.marker([-126.27, 133.00], { icon: planetIcon }).bindTooltip("Padua", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Padua);
const Bantu = L.marker([-129.06, 133.02], { icon: planetIcon }).bindTooltip("Bantu", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Bantu);
const Sontara = L.marker([-124.77, 133.41], { icon: planetIcon }).bindTooltip("Sontara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sontara);
const Throova = L.marker([-130.97, 133.57], { icon: planetIcon }).bindTooltip("Throova", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Throova);
const Alkenak = L.marker([-130.18, 133.95], { icon: planetIcon }).bindTooltip("Alkenak", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Alkenak);
const Panela = L.marker([-127.95, 134.53], { icon: planetIcon }).bindTooltip("Panela", { permanent: true, direction: 'left', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Panela);
const Condular = L.marker([-129.59, 134.55], { icon: planetIcon }).bindTooltip("Condular", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Condular);
const Gailea = L.marker([-127.86, 134.59], { icon: planetIcon }).bindTooltip("Gailea", { permanent: true, direction: 'left', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gailea);
const EufornisMaj = L.marker([-129.28, 134.01], { icon: planetIcon }).bindTooltip("Eufornis Major", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(EufornisMaj);
const Zarsteck = L.marker([-125.15, 134.02], { icon: planetIcon }).bindTooltip("Zarsteck", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Zarsteck);
const Gandeal = L.marker([-130.08, 134.35], { icon: planetIcon }).bindTooltip("Gandeal", { permanent: true, direction: 'right', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Gandeal);
const HosnianPr = L.marker([-129.88, 134.43], { icon: pltIconCan2 }).bindTooltip("Hosnian Prime", { permanent: true, direction: 'left', offset: [-5, 1], className: 'leaflet-tooltip-mov' }).bindPopup(HosnianPrPopup, customOptions).addTo(map);
const Dreizan = L.marker([-126.13, 134.31], { icon: planetIcon }).bindTooltip("Dreizan", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dreizan);
const Chasin = L.marker([-127.93, 135.08], { icon: planetIcon }).bindTooltip("Chasin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Chasin);
const BlackN = L.marker([-129.95, 135.59], { icon: nebIconBlk }).bindTooltip("Black N.", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(BlackN);
const Caldoni = L.marker([-127.08, 135.69], { icon: planetIcon }).bindTooltip("Caldoni", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Caldoni);
const Tinnel = L.marker([-125.55, 135.76], { icon: planetIcon }).bindTooltip("Tinnel", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tinnel);
const AratFraca = L.marker([-128.87, 136.26], { icon: planetIcon }).bindTooltip("Arat Fraca", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(AratFraca);
const Kexeeria = L.marker([-130.69, 136.63], { icon: planetIcon }).bindTooltip("Kexeeria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kexeeria);
const Loronar = L.marker([-127.84, 136.66], { icon: planetIcon }).bindTooltip("Loronar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Loronar);
const Byblos = L.marker([-128.82, 137.15], { icon: planetIcon }).bindTooltip("Byblos", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Byblos);
const Luduria = L.marker([-126.47, 137.58], { icon: planetIcon }).bindTooltip("Luduria", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Luduria);
const Pencael = L.marker([-129.56, 137.62], { icon: planetIcon }).bindTooltip("Pencael", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pencael);
const Exodeen = L.marker([-125.11, 137.69], { icon: planetIcon }).bindTooltip("Exodeen", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Exodeen);
const Boudolayz = L.marker([-125.53, 137.84], { icon: planetIcon }).bindTooltip("Boudolayz", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Boudolayz);
const Herzob = L.marker([-125.92, 137.94], { icon: planetIcon }).bindTooltip("Herzob", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Herzob);
const Besnia = L.marker([-126.64, 138.16], { icon: planetIcon }).bindTooltip("Besnia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Besnia);
const Tholoth = L.marker([-126.38, 138.30], { icon: planetIcon }).bindTooltip("Tholoth", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Tholoth);
const Pestoriv = L.marker([-129.37, 138.31], { icon: planetIcon }).bindTooltip("Pestoriv", { permanent: true, direction: 'right', offset: [0, -2], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Pestoriv);
const Koensayr = L.marker([-127.31, 138.33], { icon: planetIcon }).bindTooltip("Koensayr", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Koensayr);
const Havricus = L.marker([-130.66, 138.37], { icon: planetIcon }).bindTooltip("Havricus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Havricus);
const Aquilae = L.marker([-128.62, 138.67], { icon: planetIcon }).bindTooltip("Aquilae", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Aquilae);
const Abednedo = L.marker([-131.28, 138.75], { icon: planetIcon }).bindTooltip("Abednedo", { permanent: true, direction: 'right', offset: [0, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Abednedo);
const Huulia = L.marker([-129.74, 139.24], { icon: planetIcon }).bindTooltip("Huulia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Huulia);
const Gantho = L.marker([-130.65, 139.58], { icon: planetIcon }).bindTooltip("Gantho", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Gantho);
const Mimban = L.marker([-124.88, 148.91], { icon: pltIconCaL2 }).bindTooltip("Circarpous V (Mimban)", { permanent: true, direction: 'right', offset: [3, -1], className: 'leaflet-tooltip-mov' }).bindPopup(MimbanPopup, customOptions).addTo(map);
const Cardovyte = L.marker([-130.42, 159.32], { icon: planetIcon2 }).bindTooltip("Cardovyte", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip-mov' }); zoom05.addLayer(Cardovyte);
const SintaGlacier = L.marker([-130.91, 159.09], { icon: staIconCan2 }).bindTooltip("Sinta", { permanent: true, direction: 'left', offset: [-5, -1], className: 'leaflet-tooltip-mov' }).bindPopup(SintaGlacierPopup, customOptions).addTo(map);
const Ivexia = L.marker([-129.44, 159.42], { icon: planetIcon2 }).bindTooltip("Ivexia", { permanent: true, direction: 'right', offset: [4, 3], className: 'leaflet-tooltip-mov' }); zoom05.addLayer(Ivexia);
const TyphonicN = L.marker([-129.13, 159.22], { icon: nebIconCan2 }).bindTooltip("Typhonic N.", { permanent: true, direction: 'left', offset: [-5, -1], className: 'leaflet-tooltip    ' }); zoom04.addLayer(TyphonicN);
const NalHutta = L.marker([-125.08, 170.78], { icon: planetIcon }).bindTooltip("NAL HUTTA / Nar Shaddaa", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(NalHutta);
const Hollastin = L.marker([-129.19, 174.43], { icon: pltIconCaL }).bindTooltip("Hollastin", { permanent: true, direction: 'right', offset: [3, 0], className: 'leaflet-tooltip    ' }).bindPopup(HollastinPopup, customOptions).addTo(map);
const Ylesia = L.marker([-125.69, 179.81], { icon: planetIcon }).bindTooltip("Ylesia", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ylesia);
const Teth = L.marker([-125.41, 184.28], { icon: pltIconCaL2 }).bindTooltip("Teth", { permanent: true, direction: 'right', offset: [3, -1], className: 'leaflet-tooltip-mov' }).bindPopup(TethPopup, customOptions).addTo(map);
//========================================= row 13 ===== JAKKU =============================
const AhchTo = L.marker([-133.06, 90.41], { icon: pltIconCan2 }).bindTooltip("Ahch-To", { permanent: true, direction: 'left', offset: [-5, 0], className: 'leaflet-tooltip-mov' }).addTo(map);
const ZonamaSekot = L.marker([-134.53, 91.52], { icon: planetIcon }).bindTooltip("Zonama Sekot (137 BBY)", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ZonamaSekot);
const PonemahTermin = L.marker([-135.42, 98.41], { icon: planetIcon }).bindTooltip("Ponemah Terminal", { permanent: true, direction: 'left', offset: [0, 4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(PonemahTermin);
const OReen = L.marker([-134.14, 103.50], { icon: planetIcon }).bindTooltip("O'reen", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(OReen);
const Jakku = L.marker([-131.78, 106.34], { icon: pltIconCan2 }).bindTooltip("Jakku", { permanent: true, direction: 'left', offset: [-5, 0], className: 'leaflet-tooltip-mov' }).bindPopup(JakkuPopup, customOptions).addTo(map);
const Donadus = L.marker([-136.70, 114.27], { icon: pltIconLeg }).bindTooltip("Donadus", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(DonadusPopup, customOptions).addTo(map);
const Permondiri = L.marker([-131.47, 117.37], { icon: planetIcon }).bindTooltip("Permondiri", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Permondiri);
const Necropolis = L.marker([-132.11, 117.84], { icon: planetIcon }).bindTooltip("Necropolis", { permanent: true, direction: 'left', offset: [0, 6], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Necropolis);
const OrdSabaok = L.marker([-132.01, 117.94], { icon: planetIcon }).bindTooltip("Ord Sabaok", { permanent: true, direction: 'left', offset: [0, -6], className: 'leaflet-tooltip    ' }); zoom06.addLayer(OrdSabaok);
const Protobranch = L.marker([-132.05, 118.16], { icon: planetIcon }).bindTooltip("Protobranch", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Protobranch);
const Cuvacia = L.marker([-131.62, 118.74], { icon: planetIcon }).bindTooltip("Cuvacia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Cuvacia);
const ZenoxCl = L.marker([-135.52, 119.73], { icon: clustrIcon }).bindTooltip("Zenox Cl.", { permanent: true, direction: 'left', offset: [4, 3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(ZenoxCl);
const Illodia = L.marker([-133.21, 120.07], { icon: planetIcon }).bindTooltip("Illodia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Illodia);
const Kloodavia = L.marker([-131.99, 120.36], { icon: planetIcon }).bindTooltip("Kloodavia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Kloodavia);
const Sarpazia = L.marker([-132.95, 120.96], { icon: planetIcon }).bindTooltip("Sarpazia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sarpazia);
const Karltonia = L.marker([-131.51, 122.37], { icon: planetIcon }).bindTooltip("Karltonia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Karltonia);
const Vrakolia = L.marker([-133.23, 122.99], { icon: planetIcon }).bindTooltip("Vrakolia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Vrakolia);
const Yarrv = L.marker([-132.73, 123.74], { icon: planetIcon }).bindTooltip("Yarrv", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Yarrv);
const Steelious = L.marker([-132.81, 123.56], { icon: planetIcon }).bindTooltip("Steelious", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Steelious);
const Belgaroth = L.marker([-133.52, 123.95], { icon: planetIcon }).bindTooltip("Belgaroth", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Belgaroth);
const Dentaal = L.marker([-132.98, 124.44], { icon: planetIcon }).bindTooltip("Dentaal", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Dentaal);
const AbregadoRae = L.marker([-132.28, 124.47], { icon: pltIconCaL }).bindTooltip("Abregado-rae", { permanent: true, direction: 'left', offset: [-3, 0], className: 'leaflet-tooltip    ' }).bindPopup(AbregadoRaePopup, customOptions).addTo(map);
const Rimma = L.marker([-134.10, 124.77], { icon: planetIcon }).bindTooltip("Rimma", { permanent: true, direction: 'left', offset: [0, 5], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Rimma);
const BithB = L.marker([-132.66, 124.84], { icon: planetIcon }).bindTooltip("Bith (B)", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(BithB);
const Eamus = L.marker([-131.55, 125.12], { icon: planetIcon }).bindTooltip("Eamus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Eamus);
const Plexis = L.marker([-132.02, 125.31], { icon: planetIcon }).bindTooltip("Plexis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Plexis);
const Diamal = L.marker([-134.07, 125.41], { icon: planetIcon }).bindTooltip("Diamal", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Diamal);
const Rurgavea = L.marker([-133.41, 125.45], { icon: planetIcon }).bindTooltip("Rurgavea", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Rurgavea);
const Isht = L.marker([-133.87, 125.58], { icon: planetIcon }).bindTooltip("Isht", { permanent: true, direction: 'right', offset: [0, -4], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Isht);
const Mrlsst = L.marker([-136.26, 126.55], { icon: pltIconCaL }).bindTooltip("Mrlsst", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(MrlsstPopup, customOptions).addTo(map);
const Frego = L.marker([-131.72, 126.63], { icon: planetIcon }).bindTooltip("Frego", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Frego);
const Tiisheraan = L.marker([-131.99, 127.25], { icon: planetIcon }).bindTooltip("Tiisheraan", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Tiisheraan);
const Ferrhast = L.marker([-132.01, 127.45], { icon: planetIcon }).bindTooltip("Ferrhast", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ferrhast);
const Iphigin = L.marker([-133.11, 127.59], { icon: planetIcon }).bindTooltip("Iphigin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Iphigin);
const Lali = L.marker([-132.39, 128.00], { icon: planetIcon }).bindTooltip("Lali", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lali);
const Weldii = L.marker([-133.00, 129.11], { icon: planetIcon }).bindTooltip("Weldii", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Weldii);
const Nunce = L.marker([-131.75, 130.06], { icon: planetIcon }).bindTooltip("Nunce", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Nunce);
const Andara = L.marker([-132.32, 131.07], { icon: planetIcon }).bindTooltip("Andara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Andara);
const Sestria = L.marker([-131.63, 131.40], { icon: planetIcon }).bindTooltip("Sestria", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Sestria);
const Sanjin = L.marker([-131.98, 132.11], { icon: planetIcon }).bindTooltip("Sanjin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sanjin);
const Devaron = L.marker([-135.87, 132.58], { icon: pltIconCaL }).bindTooltip("Devaron", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(DevaronPopup, customOptions).addTo(map);
const Atzerri = L.marker([-137.31, 136.75], { icon: planetIcon }).bindTooltip("Atzerri", { permanent: true, direction: 'left', offset: [3, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Atzerri);
const Iseno = L.marker([-131.80, 139.09], { icon: planetIcon }).bindTooltip("Iseno", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Iseno);
const Denon = L.marker([-132.28, 139.54], { icon: planetIcon }).bindTooltip("Denon", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Ardru = L.marker([-132.19, 139.81], { icon: planetIcon }).bindTooltip("Ardru", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Ardru);
const Chardaan = L.marker([-137.63, 139.88], { icon: planetIcon }).bindTooltip("Chardaan", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Pasaana = L.marker([-134.34, 149.78], { icon: pltIconCan2 }).bindTooltip("Pasaana", { permanent: true, direction: 'right', offset: [3, -1], className: 'leaflet-tooltip-mov' }).bindPopup(PasaanaPopup, customOptions).addTo(map);
const Romar = L.marker([-137.59, 179.50], { icon: planetIcon }).bindTooltip("ROMAR", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Romar);
//========================================= row 14 ===== VANDOR ============================
const Peroenia = L.marker([-138.94, 88.97], { icon: planetIcon }).bindTooltip("Peroenia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Peroenia);
const Giaca = L.marker([-140.84, 90.70], { icon: planetIcon }).bindTooltip("Giaca", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Giaca);
const Shor = L.marker([-139.37, 91.86], { icon: planetIcon }).bindTooltip("Shor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Shor);
const Altiria = L.marker([-140.56, 92.61], { icon: planetIcon }).bindTooltip("Altiria / Anarris", { permanent: true, direction: 'right', offset: [-1, 4], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Altiria);
const Seeratter = L.marker([-142.97, 96.55], { icon: planetIcon }).bindTooltip("Seeratter", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Seeratter);
const Iskadrell = L.marker([-140.25, 99.17], { icon: planetIcon }).bindTooltip("Iskadrell", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Iskadrell);
const Bormter = L.marker([-143.20, 99.39], { icon: planetIcon }).bindTooltip("Bormter", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Bormter);
const Pacara = L.marker([-140.97, 103.06], { icon: planetIcon }).bindTooltip("Pacara", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Pacara);
const VeslaMin = L.marker([-143.33, 105.47], { icon: planetIcon }).bindTooltip("Vesla Minor", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(VeslaMin);
const Orroman = L.marker([-141.33, 105.97], { icon: planetIcon }).bindTooltip("Orroman", { permanent: true, direction: 'right', offset: [0, -3], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Orroman);
const Jedd = L.marker([-142.02, 106.55], { icon: planetIcon }).bindTooltip("Jedd", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Jedd);
const Aruza = L.marker([-143.11, 110.31], { icon: planetIcon }).bindTooltip("Aruza", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Aruza);
const Lequabis = L.marker([-142.55, 110.92], { icon: planetIcon }).bindTooltip("Lequabis", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Lequabis);
const Frewwil = L.marker([-143.92, 111.06], { icon: planetIcon }).bindTooltip("Frewwil", { permanent: true, direction: 'right', offset: [0, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Frewwil);
const ShasfathCl = L.marker([-141.81, 112.56], { icon: clustrIcon }).bindTooltip("Shasfath Cl.", { permanent: true, direction: 'left', offset: [2, 2], className: 'leaflet-tooltip    ' }).addTo(map);
const Guagenia = L.marker([-140.44, 116.81], { icon: planetIcon }).bindTooltip("Guagenia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Guagenia);
const Kiffu = L.marker([-139.94, 126.38], { icon: planetIcon }).bindTooltip("Kiffu", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Thyferra = L.marker([-140.72, 129.12], { icon: pltIconCaL }).bindTooltip("Thyferra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).bindPopup(ThyferraPopup, customOptions).addTo(map);
const YagDhul = L.marker([-143.55, 130.27], { icon: pltIconCaL }).bindTooltip("Yag'Dhul", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(YagDhulPopup, customOptions).addTo(map);
const Bacrana = L.marker([-142.38, 149.44], { icon: planetIcon }).bindTooltip("Bacrana", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const NewCov = L.marker([-144.17, 151.11], { icon: planetIcon }).bindTooltip("New Cov / Churba", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(NewCov);
const Cularin = L.marker([-141.07, 151.38], { icon: planetIcon }).bindTooltip("Cularin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Cularin);
const Lelmra = L.marker([-143.29, 153.73], { icon: planetIcon }).bindTooltip("Lelmra", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Lelmra);
const Vandor = L.marker([-138.88, 154.38], { icon: pltIconCan2 }).bindTooltip("Vandor", { permanent: true, direction: 'right', offset: [3, -1], className: 'leaflet-tooltip-mov' }).bindPopup(VandorPopup, customOptions).addTo(map);
const DNile = L.marker([-142.70, 159.48], { icon: planetIcon }).bindTooltip("D'Nile", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(DNile);
const Denubba = L.marker([-142.93, 161.00], { icon: planetIcon }).bindTooltip("Denubba", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Denubba);
const Bothawui = L.marker([-140.28, 165.38], { icon: pltIconLeg }).bindTooltip("Bothawui", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(BothawuiPopup, customOptions).addTo(map);
const NearPando = L.marker([-138.53, 175.59], { icon: planetIcon }).bindTooltip("Near Pando", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const TammuzAn = L.marker([-141.25, 181.75], { icon: pltIconCaL }).bindTooltip("Tammuz-an", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(TammuzAnPopup, customOptions).addTo(map);
//========================================= row 15 ===== KAMINO ============================
const Batuu = L.marker([-149.15, 97.77], { icon: pltIconCan2 }).bindTooltip("Batuu", { permanent: true, direction: 'left', offset: [-5, -1], className: 'leaflet-tooltip    ' }).bindPopup(BatuuPopup, customOptions).addTo(map);
const Nacronis = L.marker([-145.69, 121.15], { icon: pltIconCan }).bindTooltip("Nacronis*", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(NacronisPopup, customOptions).addTo(map);
const Kafrene = L.marker([-147.81, 128.40], { icon: staIconCan2 }).bindTooltip("Ring of Kafrene", { permanent: true, direction: 'right', offset: [5, -1], className: 'leaflet-tooltip-mov' }).bindPopup(KafrenePopup, customOptions).addTo(map);
const Kira = L.marker([-150.72, 141.16], { icon: planetIcon }).bindTooltip("Kira", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Brevost = L.marker([-148.39, 145.73], { icon: planetIcon }).bindTooltip("Brevost", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Brevost);
const Kalarba = L.marker([-145.45, 151.06], { icon: planetIcon }).bindTooltip("Kalarba", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Kalarba);
const Druckenwell = L.marker([-146.42, 153.36], { icon: planetIcon }).bindTooltip("Druckenwell", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Druckenwell);
const Falleen = L.marker([-147.84, 155.89], { icon: planetIcon }).bindTooltip("Falleen", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Falleen);
const Algara = L.marker([-149.80, 156.39], { icon: planetIcon }).bindTooltip("Algara", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Algara);
const Andosha = L.marker([-150.53, 157.08], { icon: planetIcon }).bindTooltip("Andosha", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Andosha);
const Thape = L.marker([-149.62, 159.34], { icon: planetIcon }).bindTooltip("Thape", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Thape);
const BoraVio = L.marker([-146.69, 161.94], { icon: planetIcon }).bindTooltip("Bora Vio*", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Kamino = L.marker([-145.94, 171.56], { icon: pltIconCaL2 }).bindTooltip("Kamino", { permanent: true, direction: 'right', offset: [3, -1], className: 'leaflet-tooltip-mov' }).bindPopup(KaminoPopup, customOptions).addTo(map);
const Scarif = L.marker([-147.09, 172.65], { icon: pltIconCan2 }).bindTooltip("Scarif", { permanent: true, direction: 'right', offset: [3, 0], className: 'leaflet-tooltip-mov' }); Scarif.bindPopup(ScarifPopup, customOptions); zoom04.addLayer(Scarif);
const Pzob = L.marker([-149.97, 181.66], { icon: planetIcon }).bindTooltip("Pzob", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Pzob);
//========================================= row 16 ===== TATOOINE ==========================
const Lwhekk = L.marker([-153.31, 71.28], { icon: pltIconCaL }).bindTooltip("Lwhekk", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(LwhekkPopup, customOptions).addTo(map);
const Bakura = L.marker([-155.78, 95.21], { icon: pltIconCaL }).bindTooltip("Bakura", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(BakuraPopup, customOptions).addTo(map);
const Endor = L.marker([-156.26, 102.08], { icon: pltIconCaL2 }).bindTooltip("Endor", { permanent: true, direction: 'right', offset: [4, -1], className: 'leaflet-tooltip-mov' }).bindPopup(EndorPopup, customOptions).addTo(map);
const Castilon = L.marker([-153.16, 110.78], { icon: pltIconCan }).bindTooltip("Castilon", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(CastilonPopup, customOptions).addTo(map);
const Takodana = L.marker([-153.06, 112.75], { icon: pltIconCan2 }).bindTooltip("Takodana", { permanent: true, direction: 'right', offset: [2, -1], className: 'leaflet-tooltip-mov' }).bindPopup(TakodanaPopup, customOptions).addTo(map);
const BomisKoori = L.marker([-156.59, 120.75], { icon: planetIcon }).bindTooltip("Bomis Koori", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Nkllon = L.marker([-151.97, 128.63], { icon: planetIcon }).bindTooltip("Nkllon", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Malastare = L.marker([-156.70, 138.28], { icon: planetIcon }).bindTooltip("Malastare", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Malastare);
const Arrgaw = L.marker([-151.22, 139.41], { icon: planetIcon }).bindTooltip("Arrgaw", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Arrgaw);
const PhorsaGedd = L.marker([-151.89, 151.73], { icon: planetIcon }).bindTooltip("Phorsa Gedd", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(PhorsaGedd);
const Xandil = L.marker([-153.64, 152.28], { icon: planetIcon }).bindTooltip("Xandil", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Xandil);
const MonGazza = L.marker([-151.84, 158.38], { icon: planetIcon }).bindTooltip("Mon Gazza", { permanent: true, direction: 'left', offset: [0, -5], className: 'leaflet-tooltip    ' }); zoom04.addLayer(MonGazza);
const Glavis = L.marker([-152.27, 161.44], { icon: pltIconCan2 }).bindTooltip("Glavis*", { permanent: true, direction: 'right', offset: [2, -2], className: 'leaflet-tooltip    ' }).bindPopup(GlavisPopup, customOptions).addTo(map);
const Christophsis = L.marker([-156.03, 162.41], { icon: pltIconCaL2 }).bindTooltip("Christophsis", { permanent: true, direction: 'left', offset: [-5, -1], className: 'leaflet-tooltip-mov' }); zoom04.addLayer(Christophsis).bindPopup(ChristophsisPopup, customOptions).addTo(map);
const Savareen = L.marker([-156.56, 163.13], { icon: pltIconCan2 }).bindTooltip("Savareen", { permanent: true, direction: 'left', offset: [-2, 8], className: 'leaflet-tooltip-mov' }).bindPopup(SavareenPopup, customOptions).addTo(map);
const Tatooine = L.marker([-155.36, 166.75], { icon: pltIconCaL2 }).bindTooltip("Tatooine", { permanent: true, direction: 'right', offset: [0, -8], className: 'leaflet-tooltip-mov' }).bindPopup(TatooinePopup, customOptions).addTo(map);
const Geonosis = L.marker([-155.72, 167.00], { icon: planetIcon2 }).bindTooltip("Geonosis", { permanent: true, direction: 'right', offset: [4, 3], className: 'leaflet-tooltip-mov' }); zoom04.addLayer(Geonosis);
const Kowak = L.marker([-151.06, 176.47], { icon: pltIconCaL }).bindTooltip("Kowak", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(KowakPopup, customOptions).addTo(map);
//========================================= row 17 ===== RYLOTH ============================
const CorbettCl = L.marker([-158.22, 109.12], { icon: clustrIcon }).bindTooltip("Corbett Cl.", { permanent: true, direction: 'left', offset: [2, 2], className: 'leaflet-tooltip    ' }); zoom04.addLayer(CorbettCl);
const StarForgeSta = L.marker([-160.11, 131.72], { icon: staIconLeg }).bindTooltip("StarForge Sta.", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(StarForgeStaPopup, customOptions).addTo(map);
const Sullust = L.marker([-162.69, 134.69], { icon: pltIconCaL }).bindTooltip("Sullust", { permanent: true, direction: 'right', offset: [2, 2], className: 'leaflet-tooltip    ' }).bindPopup(SullustPopup, customOptions).addTo(map);
const Darkknell = L.marker([-160.89, 136.94], { icon: planetIcon }).bindTooltip("Darkknell", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Darkknell);
const Crait = L.marker([-160.97, 141.22], { icon: pltIconCan2 }).bindTooltip("Crait", { permanent: true, direction: 'left', offset: [-5, -1], className: 'leaflet-tooltip-mov' }).bindPopup(CraitPopup, customOptions).addTo(map);
const DQar = L.marker([-161.19, 146.19], { icon: pltIconCan2 }).bindTooltip("D'Qar", { permanent: true, direction: 'right', offset: [3, 0], className: 'leaflet-tooltip-mov' }).bindPopup(DQarPopup, customOptions).addTo(map);
const Naboo = L.marker([-157.94, 146.28], { icon: pltIconCaL2 }).bindTooltip("Naboo", { permanent: true, direction: 'left', offset: [-4, -2], className: 'leaflet-tooltip-mov' }).bindPopup(NabooPopup, customOptions).addTo(map);
const Ryloth = L.marker([-161.34, 168.69], { icon: pltIconCaL }).bindTooltip("Ryloth", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(RylothPopup, customOptions).addTo(map);
const Shinbone = L.marker([-159.50, 179.25], { icon: pltIconLeg }).bindTooltip("Shinbone", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(ShinbonePopup, customOptions).addTo(map);
//========================================= row 18 ===== BESPIN ============================
const KodaStation = L.marker([-164.60, 106.50], { icon: statonIcon }).bindTooltip("Koda Sta.", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Virgillia = L.marker([-168.59, 108.56], { icon: planetIcon }).bindTooltip("Virgillia", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Bespin = L.marker([-167.20, 118.50], { icon: pltIconCaL2 }).bindTooltip("Bespin", { permanent: true, direction: 'left', offset: [-5, -2], className: 'leaflet-tooltip-mov' }).bindPopup(BespinPopup, customOptions).addTo(map);
const Hoth = L.marker([-167.72, 118.59], { icon: pltIconCaL2 }).bindTooltip("Hoth", { permanent: true, direction: 'right', offset: [3, 0], className: 'leaflet-tooltip-mov' }).bindPopup(HothPopup, customOptions).addTo(map);
const BlackStallSta = L.marker([-170.09, 131.97], { icon: statonIcon }).bindTooltip("Black Stall Sta.", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(BlackStallSta);
const Eriadu = L.marker([-165.69, 134.84], { icon: pltIconCaL }).bindTooltip("ERIADU", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(EriaduPopup, customOptions).addTo(map);
const ClakDor = L.marker([-168.78, 135.06], { icon: pltIconCaL }).bindTooltip("Clak'dor", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(ClakDorPopup, customOptions).addTo(map);
const Triton = L.marker([-169.34, 135.00], { icon: planetIcon }).bindTooltip("Triton", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Triton);
const Xagobah = L.marker([-168.34, 136.91], { icon: planetIcon }).bindTooltip("Xagobah", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Xagobah);
const Sharlissia = L.marker([-165.00, 143.38], { icon: planetIcon }).bindTooltip("Sharlissia", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Sharlissia);
const LanBarell = L.marker([-164.75, 148.03], { icon: planetIcon }).bindTooltip("Lan Barell", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(LanBarell);
const Vergesso = L.marker([-163.98, 153.33], { icon: planetIcon }).bindTooltip("Vergesso", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const DomBradden = L.marker([-165.47, 160.41], { icon: planetIcon }).bindTooltip("Dom-Bradden", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(DomBradden);
//========================================= row 19 ===== DAGOBAH ===========================
const StarlightB = L.marker([-171.59, 108.50], { icon: staIconCan }).bindTooltip("Starlight Beacon", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(StarlightBPopup, customOptions).addTo(map);
const Quintas = L.marker([-171.44, 117.38], { icon: blkhleIcon }).bindTooltip("Quintas", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Quintas);
const Mustafar = L.marker([-175.87, 125.72], { icon: pltIconCaL2 }).bindTooltip("Mustafar", { permanent: true, direction: 'right', offset: [4, 0], className: 'leaflet-tooltip-mov' }).bindPopup(MustafarPopup, customOptions).addTo(map);
const OgothTiir = L.marker([-172.55, 130.20], { icon: planetIcon }).bindTooltip("Ogoth Tiir", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(OgothTiir);
const SluisVan = L.marker([-171.50, 135.06], { icon: pltIconCaL }).bindTooltip("Sluis Van", { permanent: true, direction: 'left', offset: [-2, 0], className: 'leaflet-tooltip    ' }).bindPopup(SluisVanPopup, customOptions).addTo(map);
const Denab = L.marker([-172.75, 135.01], { icon: planetIcon }).bindTooltip("Denab", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Denab);
const Tarabba = L.marker([-175.63, 135.20], { icon: planetIcon }).bindTooltip("Tarabba", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Tarabba);
const Dagobah = L.marker([-173.69, 135.31], { icon: pltIconCaL2 }).bindTooltip("Dagobah", { permanent: true, direction: 'right', offset: [4, 0], className: 'leaflet-tooltip-mov' }).bindPopup(DagobahPopup, customOptions).addTo(map);
const Utapau = L.marker([-176.25, 138.31], { icon: pltIconCaL2 }).bindTooltip("Utapau", { permanent: true, direction: 'right', offset: [4, 0], className: 'leaflet-tooltip-mov' }).bindPopup(UtapauPopup, customOptions).addTo(map);
const Baffop = L.marker([-171.41, 144.97], { icon: planetIcon }).bindTooltip("Baffop", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Baffop);
const Pantora = L.marker([-172.84, 152.56], { icon: pltIconCaL }).bindTooltip("Orto Plutonia / Pantora", { permanent: true, direction: 'right', offset: [2, 0], className: 'leaflet-tooltip    ' }).bindPopup(OrtoPlutoniaPopup, customOptions).addTo(map);
const Sabrixin = L.marker([-176.31, 161.66], { icon: planetIcon }).bindTooltip("Sabrixin", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
//========================================= row 20 ===== TERMINUS ==========================
const Seoul = L.marker([-182.08, 99.26], { icon: planetIcon }).bindTooltip("Seoul", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Terminus = L.marker([-183.00, 120.00], { icon: planetIcon }).bindTooltip("Terminus", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Vernid = L.marker([-183.20, 134.26], { icon: planetIcon }).bindTooltip("Vernid", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Vernid);
const Karideph = L.marker([-181.48, 135.30], { icon: planetIcon }).bindTooltip("Karideph", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Pergitor = L.marker([-182.50, 135.37], { icon: planetIcon }).bindTooltip("Pergitor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Pergitor);
const Haven = L.marker([-182.83, 136.16], { icon: planetIcon }).bindTooltip("Haven", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Haven);
const Vestar = L.marker([-181.53, 141.75], { icon: planetIcon }).bindTooltip("Vestar", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom04.addLayer(Vestar);
const Silken = L.marker([-177.66, 147.91], { icon: planetIcon }).bindTooltip("Silken", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
//========================================= row 21 ===== KATHOL ============================
const KalShebbol = L.marker([-185.13, 135.47], { icon: planetIcon }).bindTooltip("Kal'Shebbol", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Aaris = L.marker([-185.33, 135.49], { icon: planetIcon }).bindTooltip("Aaris", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Aaris);
const Galtea = L.marker([-185.70, 135.66], { icon: planetIcon }).bindTooltip("Galtea", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Galtea);
const Sebiris = L.marker([-185.63, 135.74], { icon: planetIcon }).bindTooltip("Sebiris", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Sebiris);
const TimbraOtt = L.marker([-185.95, 136.06], { icon: planetIcon }).bindTooltip("Timbra Ott", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(TimbraOtt);
const Binaros = L.marker([-186.15, 136.23], { icon: planetIcon }).bindTooltip("Binaros", { permanent: true, direction: 'left', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Binaros);
const Pitann = L.marker([-185.92, 136.56], { icon: planetIcon }).bindTooltip("Pitann", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom07.addLayer(Pitann);
const Uukaablis = L.marker([-186.33, 136.59], { icon: planetIcon }).bindTooltip("Uukaablis", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom06.addLayer(Uukaablis);
const Kesh = L.marker([-184.13, 136.84], { icon: planetIcon }).bindTooltip("Kesh", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Danoor = L.marker([-186.00, 136.89], { icon: planetIcon }).bindTooltip("Danoor", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Danoor);
const Kathol = L.marker([-186.50, 137.44], { icon: planetIcon }).bindTooltip("Kathol", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }).addTo(map);
const Ertrax = L.marker([-183.67, 138.25], { icon: planetIcon }).bindTooltip("Ertrax", { permanent: true, direction: 'right', offset: [0, 0], className: 'leaflet-tooltip    ' }); zoom05.addLayer(Ertrax);

let prevZoom, postZoom;
let zoomLevels = [zoom04,zoom05,zoom06,zoom07,zoom08,zoom09,zoom10,zoom11]

function getZoomLevel(zoomLevel) {
  return zoomLevels[zoomLevel-4];
}

map.on('zoomstart', function () {
  prevZoom = map.getZoom();
})

map.on('zoomend', function () {
  postZoom = map.getZoom();
  console.log(`Zoom level changed: ${prevZoom}->${postZoom}`);

  // Skip if zoom level stayed the same
  if(prevZoom == postZoom) return;

  // Boolean to determine if we're adding [true] or removing [false] layers in the loop
  let adding = prevZoom < postZoom

  // If zoom level increased => show layers up to zoom level
  // If zoom level decreased => hide layers exceeding zoom level
  for(i = Math.min(postZoom,prevZoom)+1; i<=Math.max(postZoom,prevZoom); i++) {
    startTime = performance.now();
    
    let layer = getZoomLevel(i);
    if(adding) {
      console.log("Showing layer " + i);
      map.addLayer(layer);
    }
    else {
      console.log("Hiding layer " + i);
      map.removeLayer(layer);
    }

    endTime = performance.now();
    console.log(`Layer ${i} took ${endTime-startTime}ms for ${layer.getLayers().length} Elements`);
  }
});

//GRID LINES LON (vertical lines) -- 124.73 - 131.25 = 6.52 / 10 = .652

//var gridLon000a = new L.LatLng(-53, 124.730); var gridLon000b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon000a, gridLon000b];
//var gridLon000 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon000);

//var gridLon001a = new L.LatLng(-53, 124.730); var gridLon001b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon001a, gridLon001b];
//var gridLon001 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon001);

//var gridLon002a = new L.LatLng(-53, 124.730); var gridLon002b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon002a, gridLon002b];
//var gridLon002 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon002);

//var gridLon003a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon004a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon005a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon006a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon007a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon008a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon009a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);
//-----
//var gridLon010a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon011a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon012a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon013a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon014a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon015a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon016a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon017a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon018a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon019a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);
//-----
//var gridLon020a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon021a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon022a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon023a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon024a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon025a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon026a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon027a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon028a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon029a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);
//-----
//var gridLon030a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon031a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon032a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon033a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon034a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon035a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon036a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon037a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

//var gridLon038a = new L.LatLng(-53, 124.730); var gridLon00b = new L.LatLng(-203, 124.730);
//var pointList = [gridLon00a, gridLon00b];
//var gridLon00 = new L.Polyline(pointList, {color: "#9d5033", weight: .9}); zoom06.addLayer(gridLon00);

var gridLon039a = new L.LatLng(-53, 78.430); var gridLon039b = new L.LatLng(-203, 78.430);
var pointList = [gridLon039a, gridLon039b];
var gridLon039 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon039);
//-----
var gridLon040a = new L.LatLng(-53, 79.082); var gridLon040b = new L.LatLng(-203, 79.082);
var pointList = [gridLon040a, gridLon040b];
var gridLon040 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon041a = new L.LatLng(-53, 79.734); var gridLon041b = new L.LatLng(-203, 79.734);
var pointList = [gridLon041a, gridLon041b];
var gridLon041 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon041);

var gridLon042a = new L.LatLng(-53, 80.386); var gridLon042b = new L.LatLng(-203, 80.386);
var pointList = [gridLon042a, gridLon042b];
var gridLon042 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon042);

var gridLon043a = new L.LatLng(-53, 81.038); var gridLon043b = new L.LatLng(-203, 81.038);
var pointList = [gridLon043a, gridLon043b];
var gridLon043 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon043);

var gridLon044a = new L.LatLng(-53, 81.690); var gridLon044b = new L.LatLng(-203, 81.690);
var pointList = [gridLon044a, gridLon044b];
var gridLon044 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon044);

var gridLon046a = new L.LatLng(-53, 82.342); var gridLon046b = new L.LatLng(-203, 82.342);
var pointList = [gridLon046a, gridLon046b];
var gridLon046 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon046);

var gridLon046a = new L.LatLng(-53, 82.994); var gridLon046b = new L.LatLng(-203, 82.994);
var pointList = [gridLon046a, gridLon046b];
var gridLon046 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon046);

var gridLon047a = new L.LatLng(-53, 83.646); var gridLon047b = new L.LatLng(-203, 83.646);
var pointList = [gridLon047a, gridLon047b];
var gridLon047 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon047);

var gridLon048a = new L.LatLng(-53, 84.298); var gridLon048b = new L.LatLng(-203, 84.298);
var pointList = [gridLon048a, gridLon048b];
var gridLon048 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon048);

var gridLon049a = new L.LatLng(-53, 84.950); var gridLon049b = new L.LatLng(-203, 84.950);
var pointList = [gridLon049a, gridLon049b];
var gridLon049 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon049);
//-----
var gridLon050a = new L.LatLng(-53, 85.602); var gridLon050b = new L.LatLng(-203, 85.602);
var pointList = [gridLon050a, gridLon050b];
var gridLon050 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon051a = new L.LatLng(-53, 86.266); var gridLon051b = new L.LatLng(-203, 86.266);
var pointList = [gridLon051a, gridLon051b];
var gridLon051 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon051);

var gridLon052a = new L.LatLng(-53, 86.930); var gridLon052b = new L.LatLng(-203, 86.930);
var pointList = [gridLon052a, gridLon052b];
var gridLon052 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon052);

var gridLon053a = new L.LatLng(-53, 87.582); var gridLon053b = new L.LatLng(-203, 87.582);
var pointList = [gridLon053a, gridLon053b];
var gridLon053 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon053);

var gridLon054a = new L.LatLng(-53, 88.234); var gridLon054b = new L.LatLng(-203, 88.234);
var pointList = [gridLon054a, gridLon054b];
var gridLon054 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon054);

var gridLon055a = new L.LatLng(-53, 88.886); var gridLon055b = new L.LatLng(-203, 88.886);
var pointList = [gridLon055a, gridLon055b];
var gridLon055 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon055);

var gridLon056a = new L.LatLng(-53, 89.538); var gridLon056b = new L.LatLng(-203, 89.538);
var pointList = [gridLon056a, gridLon056b];
var gridLon056 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon056);

var gridLon057a = new L.LatLng(-53, 90.190); var gridLon057b = new L.LatLng(-203, 90.190);
var pointList = [gridLon057a, gridLon057b];
var gridLon057 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon057);

var gridLon058a = new L.LatLng(-53, 90.842); var gridLon058b = new L.LatLng(-203, 90.842);
var pointList = [gridLon058a, gridLon058b];
var gridLon058 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon058);

var gridLon059a = new L.LatLng(-53, 91.494); var gridLon059b = new L.LatLng(-203, 91.494);
var pointList = [gridLon059a, gridLon059b];
var gridLon059 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon059);
//-----
var gridLon060a = new L.LatLng(-53, 92.146); var gridLon060b = new L.LatLng(-203, 92.146);
var pointList = [gridLon060a, gridLon060b];
var gridLon060 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon061a = new L.LatLng(-53, 92.798); var gridLon061b = new L.LatLng(-203, 92.798);
var pointList = [gridLon061a, gridLon061b];
var gridLon061 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon061);

var gridLon062a = new L.LatLng(-53, 93.450); var gridLon062b = new L.LatLng(-203, 93.450);
var pointList = [gridLon062a, gridLon062b];
var gridLon062 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon062);

var gridLon063a = new L.LatLng(-53, 94.102); var gridLon063b = new L.LatLng(-203, 94.102);
var pointList = [gridLon063a, gridLon063b];
var gridLon063 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon063);

var gridLon064a = new L.LatLng(-53, 94.754); var gridLon064b = new L.LatLng(-203, 94.754);
var pointList = [gridLon064a, gridLon064b];
var gridLon064 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon064);

var gridLon065a = new L.LatLng(-53, 95.406); var gridLon065b = new L.LatLng(-203, 95.406);
var pointList = [gridLon065a, gridLon065b];
var gridLon065 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon065);

var gridLon066a = new L.LatLng(-53, 96.058); var gridLon066b = new L.LatLng(-203, 96.058);
var pointList = [gridLon066a, gridLon066b];
var gridLon066 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon066);

var gridLon067a = new L.LatLng(-53, 96.710); var gridLon067b = new L.LatLng(-203, 96.710);
var pointList = [gridLon067a, gridLon067b];
var gridLon067 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon067);

var gridLon068a = new L.LatLng(-53, 97.362); var gridLon068b = new L.LatLng(-203, 97.362);
var pointList = [gridLon068a, gridLon068b];
var gridLon068 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon068);

var gridLon069a = new L.LatLng(-53, 98.014); var gridLon069b = new L.LatLng(-203, 98.014);
var pointList = [gridLon069a, gridLon069b];
var gridLon069 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon069);
//-----
var gridLon070a = new L.LatLng(-53, 98.666); var gridLon070b = new L.LatLng(-203, 98.666);
var pointList = [gridLon070a, gridLon070b];
var gridLon070 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon071a = new L.LatLng(-53, 99.310); var gridLon071b = new L.LatLng(-203, 99.310);
var pointList = [gridLon071a, gridLon071b];
var gridLon071 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon071);

var gridLon072a = new L.LatLng(-53, 99.962); var gridLon072b = new L.LatLng(-203, 99.962);
var pointList = [gridLon072a, gridLon072b];
var gridLon072 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon072);

var gridLon073a = new L.LatLng(-53, 100.614); var gridLon073b = new L.LatLng(-203, 100.614);
var pointList = [gridLon073a, gridLon073b];
var gridLon073 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon073);

var gridLon074a = new L.LatLng(-53, 101.266); var gridLon074b = new L.LatLng(-203, 101.266);
var pointList = [gridLon074a, gridLon074b];
var gridLon074 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon074);

var gridLon075a = new L.LatLng(-53, 101.918); var gridLon075b = new L.LatLng(-203, 101.918);
var pointList = [gridLon075a, gridLon075b];
var gridLon075 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon075);

var gridLon076a = new L.LatLng(-53, 102.570); var gridLon076b = new L.LatLng(-203, 102.570);
var pointList = [gridLon076a, gridLon076b];
var gridLon076 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon076);

var gridLon077a = new L.LatLng(-53, 103.222); var gridLon077b = new L.LatLng(-203, 103.222);
var pointList = [gridLon077a, gridLon077b];
var gridLon077 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon077);

var gridLon078a = new L.LatLng(-53, 103.874); var gridLon078b = new L.LatLng(-203, 103.874);
var pointList = [gridLon078a, gridLon078b];
var gridLon078 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon078);

var gridLon079a = new L.LatLng(-53, 104.526); var gridLon079b = new L.LatLng(-203, 104.526);
var pointList = [gridLon079a, gridLon079b];
var gridLon079 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon079);
//-----
var gridLon080a = new L.LatLng(-53, 105.178); var gridLon080b = new L.LatLng(-203, 105.178);
var pointList = [gridLon080a, gridLon080b];
var gridLon080 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon081a = new L.LatLng(-53, 105.830); var gridLon081b = new L.LatLng(-203, 105.830);
var pointList = [gridLon081a, gridLon081b];
var gridLon081 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon081);

var gridLon082a = new L.LatLng(-53, 106.482); var gridLon082b = new L.LatLng(-203, 106.482);
var pointList = [gridLon082a, gridLon082b];
var gridLon082 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon082);

var gridLon083a = new L.LatLng(-53, 107.134); var gridLon083b = new L.LatLng(-203, 107.134);
var pointList = [gridLon083a, gridLon083b];
var gridLon083 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon083);

var gridLon084a = new L.LatLng(-53, 107.786); var gridLon084b = new L.LatLng(-203, 107.786);
var pointList = [gridLon084a, gridLon084b];
var gridLon084 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon084);

var gridLon085a = new L.LatLng(-53, 108.438); var gridLon085b = new L.LatLng(-203, 108.438);
var pointList = [gridLon085a, gridLon085b];
var gridLon085 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon085);

var gridLon086a = new L.LatLng(-53, 109.090); var gridLon086b = new L.LatLng(-203, 109.090);
var pointList = [gridLon086a, gridLon086b];
var gridLon086 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon086);

var gridLon087a = new L.LatLng(-53, 109.742); var gridLon087b = new L.LatLng(-203, 109.742);
var pointList = [gridLon087a, gridLon087b];
var gridLon087 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon087);

var gridLon088a = new L.LatLng(-53, 110.394); var gridLon088b = new L.LatLng(-203, 110.394);
var pointList = [gridLon088a, gridLon088b];
var gridLon088 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon088);

var gridLon089a = new L.LatLng(-53, 111.046); var gridLon089b = new L.LatLng(-203, 111.046);
var pointList = [gridLon089a, gridLon089b];
var gridLon089 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon089);
//-----
var gridLon090a = new L.LatLng(-53, 111.698); var gridLon090b = new L.LatLng(-203, 111.698);
var pointList = [gridLon090a, gridLon090b];
var gridLon090 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon091a = new L.LatLng(-53, 112.346); var gridLon091b = new L.LatLng(-203, 112.346);
var pointList = [gridLon091a, gridLon091b];
var gridLon091 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon091);

var gridLon092a = new L.LatLng(-53, 112.994); var gridLon092b = new L.LatLng(-203, 112.994);
var pointList = [gridLon092a, gridLon092b];
var gridLon092 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon092);

var gridLon093a = new L.LatLng(-53, 113.646); var gridLon093b = new L.LatLng(-203, 113.646);
var pointList = [gridLon093a, gridLon093b];
var gridLon093 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon093);

var gridLon094a = new L.LatLng(-53, 114.298); var gridLon094b = new L.LatLng(-203, 114.298);
var pointList = [gridLon094a, gridLon094b];
var gridLon094 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon094);

var gridLon095a = new L.LatLng(-53, 114.950); var gridLon095b = new L.LatLng(-203, 114.950);
var pointList = [gridLon095a, gridLon095b];
var gridLon095 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon095);

var gridLon096a = new L.LatLng(-53, 115.602); var gridLon096b = new L.LatLng(-203, 115.602);
var pointList = [gridLon096a, gridLon096b];
var gridLon096 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon096);

var gridLon097a = new L.LatLng(-53, 116.254); var gridLon097b = new L.LatLng(-203, 116.254);
var pointList = [gridLon097a, gridLon097b];
var gridLon097 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon097);

var gridLon098a = new L.LatLng(-53, 116.906); var gridLon098b = new L.LatLng(-203, 116.906);
var pointList = [gridLon098a, gridLon098b];
var gridLon098 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon098);

var gridLon099a = new L.LatLng(-53, 117.558); var gridLon099b = new L.LatLng(-203, 117.558);
var pointList = [gridLon099a, gridLon099b];
var gridLon099 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon099);
//-----
var gridLon100a = new L.LatLng(-53, 118.210); var gridLon100b = new L.LatLng(-203, 118.210);
var pointList = [gridLon100a, gridLon100b];
var gridLon100 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon101a = new L.LatLng(-53, 118.862); var gridLon101b = new L.LatLng(-203, 118.862);
var pointList = [gridLon101a, gridLon101b];
var gridLon101 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon101);

var gridLon102a = new L.LatLng(-53, 119.514); var gridLon102b = new L.LatLng(-203, 119.514);
var pointList = [gridLon102a, gridLon102b];
var gridLon102 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon102);

var gridLon103a = new L.LatLng(-53, 120.166); var gridLon103b = new L.LatLng(-203, 120.166);
var pointList = [gridLon103a, gridLon103b];
var gridLon103 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon103);

var gridLon104a = new L.LatLng(-53, 120.818); var gridLon104b = new L.LatLng(-203, 120.818);
var pointList = [gridLon104a, gridLon104b];
var gridLon104 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon104);

var gridLon105a = new L.LatLng(-53, 121.470); var gridLon105b = new L.LatLng(-203, 121.470);
var pointList = [gridLon105a, gridLon105b];
var gridLon105 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon105);

var gridLon106a = new L.LatLng(-53, 122.122); var gridLon106b = new L.LatLng(-203, 122.122);
var pointList = [gridLon106a, gridLon106b];
var gridLon106 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon106);

var gridLon107a = new L.LatLng(-53, 122.774); var gridLon107b = new L.LatLng(-203, 122.774);
var pointList = [gridLon107a, gridLon107b];
var gridLon107 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon107);

var gridLon108a = new L.LatLng(-53, 123.426); var gridLon108b = new L.LatLng(-203, 123.426);
var pointList = [gridLon108a, gridLon108b];
var gridLon108 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon108);

var gridLon109a = new L.LatLng(-53, 124.078); var gridLon109b = new L.LatLng(-203, 124.078);
var pointList = [gridLon109a, gridLon109b];
var gridLon109 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon109);
//-----
var gridLon110a = new L.LatLng(-53, 124.730); var gridLon110b = new L.LatLng(-203, 124.730);
var pointList = [gridLon110a, gridLon110b];
var gridLon110 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon111a = new L.LatLng(-53, 125.382); var gridLon111b = new L.LatLng(-203, 125.382);
var pointList = [gridLon111a, gridLon111b];
var gridLon111 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon111);

var gridLon112a = new L.LatLng(-53, 126.034); var gridLon112b = new L.LatLng(-203, 126.034);
var pointList = [gridLon112a, gridLon112b];
var gridLon112 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon112);

var gridLon113a = new L.LatLng(-53, 126.686); var gridLon113b = new L.LatLng(-203, 126.686);
var pointList = [gridLon113a, gridLon113b];
var gridLon113 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon113);

var gridLon114a = new L.LatLng(-53, 127.338); var gridLon114b = new L.LatLng(-203, 127.338);
var pointList = [gridLon114a, gridLon114b];
var gridLon114 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon114);

var gridLon115a = new L.LatLng(-53, 127.990); var gridLon115b = new L.LatLng(-203, 127.990);
var pointList = [gridLon115a, gridLon115b];
var gridLon115 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon115);

var gridLon116a = new L.LatLng(-53, 128.642); var gridLon116b = new L.LatLng(-203, 128.642);
var pointList = [gridLon116a, gridLon116b];
var gridLon116 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon116);

var gridLon117a = new L.LatLng(-53, 129.294); var gridLon117b = new L.LatLng(-203, 129.294);
var pointList = [gridLon117a, gridLon117b];
var gridLon117 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon117);

var gridLon118a = new L.LatLng(-53, 129.946); var gridLon118b = new L.LatLng(-203, 129.946);
var pointList = [gridLon118a, gridLon118b];
var gridLon118 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon118);

var gridLon119a = new L.LatLng(-53, 130.598); var gridLon119b = new L.LatLng(-203, 130.598);
var pointList = [gridLon119a, gridLon119b];
var gridLon119 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon119);
//-----
var gridLon120a = new L.LatLng(-53, 131.250); var gridLon120b = new L.LatLng(-203, 131.250);
var pointList = [gridLon120a, gridLon120b];
var gridLon120 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon121a = new L.LatLng(-53, 131.902); var gridLon121b = new L.LatLng(-203, 131.902);
var pointList = [gridLon121a, gridLon121b];
var gridLon121 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon121);

var gridLon122a = new L.LatLng(-53, 132.554); var gridLon122b = new L.LatLng(-203, 132.554);
var pointList = [gridLon122a, gridLon122b];
var gridLon122 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon122);

var gridLon123a = new L.LatLng(-53, 133.206); var gridLon123b = new L.LatLng(-203, 133.206);
var pointList = [gridLon123a, gridLon123b];
var gridLon123 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon123);

var gridLon124a = new L.LatLng(-53, 133.858); var gridLon124b = new L.LatLng(-203, 133.858);
var pointList = [gridLon124a, gridLon124b];
var gridLon124 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon124);

var gridLon125a = new L.LatLng(-53, 134.510); var gridLon125b = new L.LatLng(-203, 134.510);
var pointList = [gridLon125a, gridLon125b];
var gridLon125 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon125);

var gridLon126a = new L.LatLng(-53, 135.162); var gridLon126b = new L.LatLng(-203, 135.162);
var pointList = [gridLon126a, gridLon126b];
var gridLon126 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon126);

var gridLon127a = new L.LatLng(-53, 135.814); var gridLon127b = new L.LatLng(-203, 135.814);
var pointList = [gridLon127a, gridLon127b];
var gridLon127 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon127);

var gridLon128a = new L.LatLng(-53, 136.466); var gridLon128b = new L.LatLng(-203, 136.466);
var pointList = [gridLon128a, gridLon128b];
var gridLon128 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon128);

var gridLon129a = new L.LatLng(-53, 137.118); var gridLon129b = new L.LatLng(-203, 137.118);
var pointList = [gridLon129a, gridLon129b];
var gridLon129 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon129);
//-----
var gridLon130a = new L.LatLng(-53, 137.770); var gridLon130b = new L.LatLng(-203, 137.770);
var pointList = [gridLon130a, gridLon130b];
var gridLon130 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon131a = new L.LatLng(-53, 138.422); var gridLon131b = new L.LatLng(-203, 138.422);
var pointList = [gridLon131a, gridLon131b];
var gridLon131 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon131);

var gridLon132a = new L.LatLng(-53, 139.074); var gridLon132b = new L.LatLng(-203, 139.074);
var pointList = [gridLon132a, gridLon132b];
var gridLon132 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon132);

var gridLon133a = new L.LatLng(-53, 139.726); var gridLon133b = new L.LatLng(-203, 139.726);
var pointList = [gridLon133a, gridLon133b];
var gridLon133 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon133);

var gridLon134a = new L.LatLng(-53, 140.378); var gridLon134b = new L.LatLng(-203, 140.378);
var pointList = [gridLon134a, gridLon134b];
var gridLon134 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon134);

var gridLon135a = new L.LatLng(-53, 141.030); var gridLon135b = new L.LatLng(-203, 141.030);
var pointList = [gridLon135a, gridLon135b];
var gridLon135 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon135);

var gridLon136a = new L.LatLng(-53, 141.682); var gridLon136b = new L.LatLng(-203, 141.682);
var pointList = [gridLon136a, gridLon136b];
var gridLon136 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon136);

var gridLon137a = new L.LatLng(-53, 142.334); var gridLon137b = new L.LatLng(-203, 142.334);
var pointList = [gridLon137a, gridLon137b];
var gridLon137 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon137);

var gridLon138a = new L.LatLng(-53, 142.986); var gridLon138b = new L.LatLng(-203, 142.986);
var pointList = [gridLon138a, gridLon138b];
var gridLon138 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon138);

var gridLon139a = new L.LatLng(-53, 143.638); var gridLon139b = new L.LatLng(-203, 143.638);
var pointList = [gridLon139a, gridLon139b];
var gridLon139 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon139);
//-----
var gridLon140a = new L.LatLng(-53, 144.290); var gridLon140b = new L.LatLng(-203, 144.290);
var pointList = [gridLon140a, gridLon140b];
var gridLon140 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon141a = new L.LatLng(-53, 144.942); var gridLon141b = new L.LatLng(-203, 144.942);
var pointList = [gridLon141a, gridLon141b];
var gridLon141 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon141);

var gridLon142a = new L.LatLng(-53, 145.594); var gridLon142b = new L.LatLng(-203, 145.594);
var pointList = [gridLon142a, gridLon142b];
var gridLon142 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon142);

var gridLon143a = new L.LatLng(-53, 146.246); var gridLon143b = new L.LatLng(-203, 146.246);
var pointList = [gridLon143a, gridLon143b];
var gridLon143 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon143);

var gridLon144a = new L.LatLng(-53, 146.898); var gridLon144b = new L.LatLng(-203, 146.898);
var pointList = [gridLon144a, gridLon144b];
var gridLon144 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon144);

var gridLon145a = new L.LatLng(-53, 147.550); var gridLon145b = new L.LatLng(-203, 147.550);
var pointList = [gridLon145a, gridLon145b];
var gridLon145 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon145);

var gridLon146a = new L.LatLng(-53, 148.202); var gridLon146b = new L.LatLng(-203, 148.202);
var pointList = [gridLon146a, gridLon146b];
var gridLon146 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon146);

var gridLon147a = new L.LatLng(-53, 148.854); var gridLon147b = new L.LatLng(-203, 148.854);
var pointList = [gridLon147a, gridLon147b];
var gridLon147 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon147);

var gridLon148a = new L.LatLng(-53, 149.506); var gridLon148b = new L.LatLng(-203, 149.506);
var pointList = [gridLon148a, gridLon148b];
var gridLon148 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon148);

var gridLon149a = new L.LatLng(-53, 150.158); var gridLon149b = new L.LatLng(-203, 150.158);
var pointList = [gridLon149a, gridLon149b];
var gridLon149 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon149);
//-----
var gridLon150a = new L.LatLng(-53, 150.810); var gridLon150b = new L.LatLng(-203, 150.810);
var pointList = [gridLon150a, gridLon150b];
var gridLon150 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon151a = new L.LatLng(-53, 151.462); var gridLon151b = new L.LatLng(-203, 151.462);
var pointList = [gridLon151a, gridLon151b];
var gridLon151 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon151);

var gridLon152a = new L.LatLng(-53, 152.114); var gridLon152b = new L.LatLng(-203, 152.114);
var pointList = [gridLon152a, gridLon152b];
var gridLon152 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon152);

var gridLon153a = new L.LatLng(-53, 152.766); var gridLon153b = new L.LatLng(-203, 152.766);
var pointList = [gridLon153a, gridLon153b];
var gridLon153 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon153);

var gridLon154a = new L.LatLng(-53, 153.418); var gridLon154b = new L.LatLng(-203, 153.418);
var pointList = [gridLon154a, gridLon154b];
var gridLon154 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon154);

var gridLon155a = new L.LatLng(-53, 154.070); var gridLon155b = new L.LatLng(-203, 154.070);
var pointList = [gridLon155a, gridLon155b];
var gridLon155 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon155);

var gridLon156a = new L.LatLng(-53, 154.722); var gridLon156b = new L.LatLng(-203, 154.722);
var pointList = [gridLon156a, gridLon156b];
var gridLon156 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon156);

var gridLon157a = new L.LatLng(-53, 155.374); var gridLon157b = new L.LatLng(-203, 155.374);
var pointList = [gridLon157a, gridLon157b];
var gridLon157 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon157);

var gridLon158a = new L.LatLng(-53, 156.026); var gridLon158b = new L.LatLng(-203, 156.026);
var pointList = [gridLon158a, gridLon158b];
var gridLon158 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon158);

var gridLon159a = new L.LatLng(-53, 156.678); var gridLon159b = new L.LatLng(-203, 156.678);
var pointList = [gridLon159a, gridLon159b];
var gridLon159 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon159);
//-----
var gridLon160a = new L.LatLng(-53, 157.330); var gridLon160b = new L.LatLng(-203, 157.330);
var pointList = [gridLon160a, gridLon160b];
var gridLon160 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon161a = new L.LatLng(-53, 157.982); var gridLon161b = new L.LatLng(-203, 157.982);
var pointList = [gridLon161a, gridLon161b];
var gridLon161 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon161);

var gridLon162a = new L.LatLng(-53, 158.634); var gridLon162b = new L.LatLng(-203, 158.634);
var pointList = [gridLon162a, gridLon162b];
var gridLon162 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon162);

var gridLon163a = new L.LatLng(-53, 159.286); var gridLon163b = new L.LatLng(-203, 159.286);
var pointList = [gridLon163a, gridLon163b];
var gridLon163 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon163);

var gridLon164a = new L.LatLng(-53, 159.938); var gridLon164b = new L.LatLng(-203, 159.938);
var pointList = [gridLon164a, gridLon164b];
var gridLon164 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon164);

var gridLon165a = new L.LatLng(-53, 160.590); var gridLon165b = new L.LatLng(-203, 160.590);
var pointList = [gridLon165a, gridLon165b];
var gridLon165 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon165);

var gridLon166a = new L.LatLng(-53, 161.242); var gridLon166b = new L.LatLng(-203, 161.242);
var pointList = [gridLon166a, gridLon166b];
var gridLon166 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon166);

var gridLon167a = new L.LatLng(-53, 161.894); var gridLon167b = new L.LatLng(-203, 161.894);
var pointList = [gridLon167a, gridLon167b];
var gridLon167 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon167);

var gridLon168a = new L.LatLng(-53, 162.546); var gridLon168b = new L.LatLng(-203, 162.546);
var pointList = [gridLon168a, gridLon168b];
var gridLon168 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon168);

var gridLon169a = new L.LatLng(-53, 163.198); var gridLon169b = new L.LatLng(-203, 163.198);
var pointList = [gridLon169a, gridLon169b];
var gridLon169 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon169);
//-----
var gridLon170a = new L.LatLng(-53, 163.850); var gridLon170b = new L.LatLng(-203, 163.850);
var pointList = [gridLon170a, gridLon170b];
var gridLon170 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon171a = new L.LatLng(-53, 164.502); var gridLon171b = new L.LatLng(-203, 164.502);
var pointList = [gridLon171a, gridLon171b];
var gridLon171 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon171);

var gridLon172a = new L.LatLng(-53, 165.154); var gridLon172b = new L.LatLng(-203, 165.154);
var pointList = [gridLon172a, gridLon172b];
var gridLon172 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon172);

var gridLon173a = new L.LatLng(-53, 165.806); var gridLon173b = new L.LatLng(-203, 165.806);
var pointList = [gridLon173a, gridLon173b];
var gridLon173 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon173);

var gridLon174a = new L.LatLng(-53, 166.458); var gridLon174b = new L.LatLng(-203, 166.458);
var pointList = [gridLon174a, gridLon174b];
var gridLon174 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon174);

var gridLon175a = new L.LatLng(-53, 167.110); var gridLon175b = new L.LatLng(-203, 167.110);
var pointList = [gridLon175a, gridLon175b];
var gridLon175 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon175);

var gridLon176a = new L.LatLng(-53, 167.762); var gridLon176b = new L.LatLng(-203, 167.762);
var pointList = [gridLon176a, gridLon176b];
var gridLon176 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon176);

var gridLon177a = new L.LatLng(-53, 168.414); var gridLon177b = new L.LatLng(-203, 168.414);
var pointList = [gridLon177a, gridLon177b];
var gridLon177 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon177);

var gridLon178a = new L.LatLng(-53, 169.076); var gridLon178b = new L.LatLng(-203, 169.076);
var pointList = [gridLon178a, gridLon178b];
var gridLon178 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon178);

var gridLon179a = new L.LatLng(-53, 169.738); var gridLon179b = new L.LatLng(-203, 169.738);
var pointList = [gridLon179a, gridLon179b];
var gridLon179 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon179);
//-----
var gridLon180a = new L.LatLng(-53, 170.410); var gridLon180b = new L.LatLng(-203, 170.410);
var pointList = [gridLon180a, gridLon180b];
var gridLon180 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon181a = new L.LatLng(-53, 171.062); var gridLon181b = new L.LatLng(-203, 171.062);
var pointList = [gridLon181a, gridLon181b];
var gridLon181 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon181);

var gridLon182a = new L.LatLng(-53, 171.714); var gridLon182b = new L.LatLng(-203, 171.714);
var pointList = [gridLon182a, gridLon182b];
var gridLon182 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon182);

var gridLon183a = new L.LatLng(-53, 172.366); var gridLon183b = new L.LatLng(-203, 172.366);
var pointList = [gridLon183a, gridLon183b];
var gridLon183 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon183);

var gridLon184a = new L.LatLng(-53, 173.018); var gridLon184b = new L.LatLng(-203, 173.018);
var pointList = [gridLon184a, gridLon184b];
var gridLon184 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon184);

var gridLon185a = new L.LatLng(-53, 173.670); var gridLon185b = new L.LatLng(-203, 173.670);
var pointList = [gridLon185a, gridLon185b];
var gridLon185 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon185);

var gridLon186a = new L.LatLng(-53, 174.322); var gridLon186b = new L.LatLng(-203, 174.322);
var pointList = [gridLon186a, gridLon186b];
var gridLon186 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon186);

var gridLon187a = new L.LatLng(-53, 174.974); var gridLon187b = new L.LatLng(-203, 174.974);
var pointList = [gridLon187a, gridLon187b];
var gridLon187 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon187);

var gridLon188a = new L.LatLng(-53, 175.626); var gridLon188b = new L.LatLng(-203, 175.626);
var pointList = [gridLon188a, gridLon188b];
var gridLon188 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon188);

var gridLon189a = new L.LatLng(-53, 176.278); var gridLon189b = new L.LatLng(-203, 176.278);
var pointList = [gridLon189a, gridLon189b];
var gridLon189 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon189);
//-----
var gridLon190a = new L.LatLng(-53, 176.930); var gridLon190b = new L.LatLng(-203, 176.930);
var pointList = [gridLon190a, gridLon190b];
var gridLon190 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon191a = new L.LatLng(-53, 177.582); var gridLon191b = new L.LatLng(-203, 177.582);
var pointList = [gridLon191a, gridLon191b];
var gridLon191 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon191);

var gridLon192a = new L.LatLng(-53, 178.234); var gridLon192b = new L.LatLng(-203, 178.234);
var pointList = [gridLon192a, gridLon192b];
var gridLon192 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon192);

var gridLon193a = new L.LatLng(-53, 178.886); var gridLon193b = new L.LatLng(-203, 178.886);
var pointList = [gridLon193a, gridLon193b];
var gridLon193 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon193);

var gridLon194a = new L.LatLng(-53, 179.538); var gridLon194b = new L.LatLng(-203, 179.538);
var pointList = [gridLon194a, gridLon194b];
var gridLon194 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon194);

var gridLon195a = new L.LatLng(-53, 180.190); var gridLon195b = new L.LatLng(-203, 180.190);
var pointList = [gridLon195a, gridLon195b];
var gridLon195 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon195);

var gridLon196a = new L.LatLng(-53, 180.842); var gridLon196b = new L.LatLng(-203, 180.842);
var pointList = [gridLon196a, gridLon196b];
var gridLon196 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon196);

var gridLon197a = new L.LatLng(-53, 181.494); var gridLon197b = new L.LatLng(-203, 181.494);
var pointList = [gridLon197a, gridLon197b];
var gridLon197 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon197);

var gridLon198a = new L.LatLng(-53, 182.146); var gridLon198b = new L.LatLng(-203, 182.146);
var pointList = [gridLon198a, gridLon198b];
var gridLon198 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon198);

var gridLon199a = new L.LatLng(-53, 182.798); var gridLon199b = new L.LatLng(-203, 182.798);
var pointList = [gridLon199a, gridLon199b];
var gridLon199 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon199);
//-----
var gridLon200a = new L.LatLng(-53, 183.450); var gridLon200b = new L.LatLng(-203, 183.450);
var pointList = [gridLon200a, gridLon200b];
var gridLon200 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLon201a = new L.LatLng(-53, 184.102); var gridLon201b = new L.LatLng(-203, 184.102);
var pointList = [gridLon201a, gridLon201b];
var gridLon201 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon201);

var gridLon202a = new L.LatLng(-53, 184.754); var gridLon202b = new L.LatLng(-203, 184.754);
var pointList = [gridLon202a, gridLon202b];
var gridLon202 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon202);

var gridLon203a = new L.LatLng(-53, 185.406); var gridLon203b = new L.LatLng(-203, 185.406);
var pointList = [gridLon203a, gridLon203b];
var gridLon203 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon203);

var gridLon204a = new L.LatLng(-53, 186.058); var gridLon204b = new L.LatLng(-203, 186.058);
var pointList = [gridLon204a, gridLon204b];
var gridLon204 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon204);

var gridLon205a = new L.LatLng(-53, 186.710); var gridLon205b = new L.LatLng(-203, 186.710);
var pointList = [gridLon205a, gridLon205b];
var gridLon205 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon205);

var gridLon206a = new L.LatLng(-53, 187.362); var gridLon206b = new L.LatLng(-203, 187.362);
var pointList = [gridLon206a, gridLon206b];
var gridLon206 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon206);

var gridLon207a = new L.LatLng(-53, 188.014); var gridLon207b = new L.LatLng(-203, 188.014);
var pointList = [gridLon207a, gridLon207b];
var gridLon207 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon207);

var gridLon208a = new L.LatLng(-53, 188.666); var gridLon208b = new L.LatLng(-203, 188.666);
var pointList = [gridLon208a, gridLon208b];
var gridLon208 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon208);

var gridLon209a = new L.LatLng(-53, 189.318); var gridLon209b = new L.LatLng(-203, 189.318);
var pointList = [gridLon209a, gridLon209b];
var gridLon209 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLon209);
//-----
var gridLon210a = new L.LatLng(-53, 189.970); var gridLon210b = new L.LatLng(-203, 189.970);
var pointList = [gridLon210a, gridLon210b];
var gridLon210 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

//GRID LINES LAT (horizontal lines)  -- 124.73 - 131.25 = 6.52 / 10 = .652
var gridLat011a = new L.LatLng(-53.636, 53); var gridLat011b = new L.LatLng(-53.636, 203);
var pointList = [gridLat011a, gridLat011b];
var gridLat011 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat011);

var gridLat012a = new L.LatLng(-54.288, 53); var gridLat012b = new L.LatLng(-54.288, 203);
var pointList = [gridLat012a, gridLat012b];
var gridLat012 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat012);

var gridLat013a = new L.LatLng(-54.940, 53); var gridLat013b = new L.LatLng(-54.940, 203);
var pointList = [gridLat013a, gridLat013b];
var gridLat013 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat013);

var gridLat014a = new L.LatLng(-55.592, 53); var gridLat014b = new L.LatLng(-55.592, 203);
var pointList = [gridLat014a, gridLat014b];
var gridLat014 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat014);

var gridLat015a = new L.LatLng(-56.244, 53); var gridLat015b = new L.LatLng(-56.244, 203);
var pointList = [gridLat015a, gridLat015b];
var gridLat015 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat015);

var gridLat016a = new L.LatLng(-56.896, 53); var gridLat016b = new L.LatLng(-56.896, 203);
var pointList = [gridLat016a, gridLat016b];
var gridLat016 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat016);

var gridLat017a = new L.LatLng(-57.548, 53); var gridLat017b = new L.LatLng(-57.548, 203);
var pointList = [gridLat017a, gridLat017b];
var gridLat017 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat017);

var gridLat018a = new L.LatLng(-58.200, 53); var gridLat018b = new L.LatLng(-58.200, 203);
var pointList = [gridLat018a, gridLat018b];
var gridLat018 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat018);

var gridLat019a = new L.LatLng(-58.852, 53); var gridLat019b = new L.LatLng(-58.852, 203);
var pointList = [gridLat019a, gridLat019b];
var gridLat019 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat019);

var gridLat020a = new L.LatLng(-59.504, 53); var gridLat020b = new L.LatLng(-59.504, 203);
var pointList = [gridLat020a, gridLat020b];
var gridLat020 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
//-----
var gridLat021a = new L.LatLng(-60.156, 53); var gridLat021b = new L.LatLng(-60.156, 203);
var pointList = [gridLat021a, gridLat021b];
var gridLat021 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat021);

var gridLat022a = new L.LatLng(-60.808, 53); var gridLat022b = new L.LatLng(-60.808, 203);
var pointList = [gridLat022a, gridLat022b];
var gridLat022 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat022);

var gridLat023a = new L.LatLng(-61.460, 53); var gridLat023b = new L.LatLng(-61.460, 203);
var pointList = [gridLat023a, gridLat023b];
var gridLat023 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat023);

var gridLat024a = new L.LatLng(-62.112, 53); var gridLat024b = new L.LatLng(-62.112, 203);
var pointList = [gridLat024a, gridLat024b];
var gridLat024 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat024);

var gridLat025a = new L.LatLng(-62.764, 53); var gridLat025b = new L.LatLng(-62.764, 203);
var pointList = [gridLat025a, gridLat025b];
var gridLat025 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat025);

var gridLat026a = new L.LatLng(-63.416, 53); var gridLat026b = new L.LatLng(-63.416, 203);
var pointList = [gridLat026a, gridLat026b];
var gridLat026 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat026);

var gridLat027a = new L.LatLng(-64.068, 53); var gridLat027b = new L.LatLng(-64.068, 203);
var pointList = [gridLat027a, gridLat027b];
var gridLat027 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat027);

var gridLat028a = new L.LatLng(-64.720, 53); var gridLat028b = new L.LatLng(-64.720, 203);
var pointList = [gridLat028a, gridLat028b];
var gridLat028 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat028);

var gridLat029a = new L.LatLng(-65.372, 53); var gridLat029b = new L.LatLng(-65.372, 203);
var pointList = [gridLat029a, gridLat029b];
var gridLat029 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat029);

var gridLat030a = new L.LatLng(-66.024, 53); var gridLat030b = new L.LatLng(-66.024, 203);
var pointList = [gridLat030a, gridLat030b];
var gridLat030 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
//-----
var gridLat031a = new L.LatLng(-66.676, 53); var gridLat031b = new L.LatLng(-66.676, 203);
var pointList = [gridLat031a, gridLat031b];
var gridLat031 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat031);

var gridLat032a = new L.LatLng(-67.328, 53); var gridLat032b = new L.LatLng(-67.328, 203);
var pointList = [gridLat032a, gridLat032b];
var gridLat032 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat032);

var gridLat033a = new L.LatLng(-67.980, 53); var gridLat033b = new L.LatLng(-67.980, 203);
var pointList = [gridLat033a, gridLat033b];
var gridLat033 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat033);

var gridLat034a = new L.LatLng(-68.632, 53); var gridLat034b = new L.LatLng(-68.632, 203);
var pointList = [gridLat034a, gridLat034b];
var gridLat034 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat034);

var gridLat035a = new L.LatLng(-69.284, 53); var gridLat035b = new L.LatLng(-69.284, 203);
var pointList = [gridLat035a, gridLat035b];
var gridLat035 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat035);

var gridLat036a = new L.LatLng(-69.936, 53); var gridLat036b = new L.LatLng(-69.936, 203);
var pointList = [gridLat036a, gridLat036b];
var gridLat036 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat036);

var gridLat037a = new L.LatLng(-70.588, 53); var gridLat037b = new L.LatLng(-70.588, 203);
var pointList = [gridLat037a, gridLat037b];
var gridLat037 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat037);

var gridLat038a = new L.LatLng(-71.240, 53); var gridLat038b = new L.LatLng(-71.240, 203);
var pointList = [gridLat038a, gridLat038b];
var gridLat038 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat038);

var gridLat039a = new L.LatLng(-71.892, 53); var gridLat039b = new L.LatLng(-71.892, 203);
var pointList = [gridLat039a, gridLat039b];
var gridLat039 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat039);

var gridLat040a = new L.LatLng(-72.544, 53); var gridLat040b = new L.LatLng(-72.544, 203);
var pointList = [gridLat040a, gridLat040b];
var gridLat040 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
//-----
var gridLat041a = new L.LatLng(-73.196, 53); var gridLat041b = new L.LatLng(-73.196, 203);
var pointList = [gridLat041a, gridLat041b];
var gridLat041 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat041);

var gridLat042a = new L.LatLng(-73.848, 53); var gridLat042b = new L.LatLng(-73.848, 203);
var pointList = [gridLat042a, gridLat042b];
var gridLat042 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat042);

var gridLat043a = new L.LatLng(-74.500, 53); var gridLat043b = new L.LatLng(-74.500, 203);
var pointList = [gridLat043a, gridLat043b];
var gridLat043 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat043);

var gridLat044a = new L.LatLng(-75.152, 53); var gridLat044b = new L.LatLng(-75.152, 203);
var pointList = [gridLat044a, gridLat044b];
var gridLat044 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat044);

var gridLat045a = new L.LatLng(-75.804, 53); var gridLat045b = new L.LatLng(-75.804, 203);
var pointList = [gridLat045a, gridLat045b];
var gridLat045 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat045);

var gridLat046a = new L.LatLng(-76.456, 53); var gridLat046b = new L.LatLng(-76.456, 203);
var pointList = [gridLat046a, gridLat046b];
var gridLat046 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat046);

var gridLat047a = new L.LatLng(-77.108, 53); var gridLat047b = new L.LatLng(-77.108, 203);
var pointList = [gridLat047a, gridLat047b];
var gridLat047 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat047);

var gridLat048a = new L.LatLng(-77.760, 53); var gridLat048b = new L.LatLng(-77.760, 203);
var pointList = [gridLat048a, gridLat048b];
var gridLat048 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat048);

var gridLat049a = new L.LatLng(-78.412, 53); var gridLat049b = new L.LatLng(-78.412, 203);
var pointList = [gridLat049a, gridLat049b];
var gridLat049 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat049);

var gridLat050a = new L.LatLng(-79.064, 53); var gridLat050b = new L.LatLng(-79.064, 203);
var pointList = [gridLat050a, gridLat050b];
var gridLat050 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
//-----
var gridLat051a = new L.LatLng(-79.716, 53); var gridLat051b = new L.LatLng(-79.716, 203);
var pointList = [gridLat051a, gridLat051b];
var gridLat051 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat051);

var gridLat052a = new L.LatLng(-80.368, 53); var gridLat052b = new L.LatLng(-80.368, 203);
var pointList = [gridLat052a, gridLat052b];
var gridLat052 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat052);

var gridLat053a = new L.LatLng(-81.020, 53); var gridLat053b = new L.LatLng(-81.020, 203);
var pointList = [gridLat053a, gridLat053b];
var gridLat053 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat053);

var gridLat054a = new L.LatLng(-81.672, 53); var gridLat054b = new L.LatLng(-81.672, 203);
var pointList = [gridLat054a, gridLat054b];
var gridLat054 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat054);

var gridLat055a = new L.LatLng(-82.324, 53); var gridLat055b = new L.LatLng(-82.324, 203);
var pointList = [gridLat055a, gridLat055b];
var gridLat055 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat055);

var gridLat056a = new L.LatLng(-82.976, 53); var gridLat056b = new L.LatLng(-82.976, 203);
var pointList = [gridLat056a, gridLat056b];
var gridLat056 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat056);

var gridLat057a = new L.LatLng(-83.628, 53); var gridLat057b = new L.LatLng(-83.628, 203);
var pointList = [gridLat057a, gridLat057b];
var gridLat057 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat057);

var gridLat058a = new L.LatLng(-84.280, 53); var gridLat058b = new L.LatLng(-84.280, 203);
var pointList = [gridLat058a, gridLat058b];
var gridLat058 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat058);

var gridLat059a = new L.LatLng(-84.932, 53); var gridLat059b = new L.LatLng(-84.932, 203);
var pointList = [gridLat059a, gridLat059b];
var gridLat059 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat059);

var gridLat060a = new L.LatLng(-85.584, 53); var gridLat060b = new L.LatLng(-85.584, 203);
var pointList = [gridLat060a, gridLat060b];
var gridLat060 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
//-----
var gridLat061a = new L.LatLng(-86.236, 53); var gridLat061b = new L.LatLng(-86.236, 203);
var pointList = [gridLat061a, gridLat061b];
var gridLat061 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat061);

var gridLat062a = new L.LatLng(-86.888, 53); var gridLat062b = new L.LatLng(-86.888, 203);
var pointList = [gridLat062a, gridLat062b];
var gridLat062 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat062);

var gridLat063a = new L.LatLng(-87.540, 53); var gridLat063b = new L.LatLng(-87.540, 203);
var pointList = [gridLat063a, gridLat063b];
var gridLat063 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat063);

var gridLat064a = new L.LatLng(-88.192, 53); var gridLat064b = new L.LatLng(-88.192, 203);
var pointList = [gridLat064a, gridLat064b];
var gridLat064 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat064);

var gridLat065a = new L.LatLng(-88.844, 53); var gridLat065b = new L.LatLng(-88.844, 203);
var pointList = [gridLat065a, gridLat065b];
var gridLat065 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat065);

var gridLat066a = new L.LatLng(-89.496, 53); var gridLat066b = new L.LatLng(-89.496, 203);
var pointList = [gridLat066a, gridLat066b];
var gridLat066 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat066);

var gridLat067a = new L.LatLng(-90.148, 53); var gridLat067b = new L.LatLng(-90.148, 203);
var pointList = [gridLat067a, gridLat067b];
var gridLat067 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat067);

var gridLat068a = new L.LatLng(-90.800, 53); var gridLat068b = new L.LatLng(-90.800, 203);
var pointList = [gridLat068a, gridLat068b];
var gridLat068 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat068);

var gridLat069a = new L.LatLng(-91.452, 53); var gridLat069b = new L.LatLng(-91.452, 203);
var pointList = [gridLat069a, gridLat069b];
var gridLat069 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat069);

var gridLat070a = new L.LatLng(-92.104, 53); var gridLat070b = new L.LatLng(-92.104, 203);
var pointList = [gridLat070a, gridLat070b];
var gridLat070 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
//-----
var gridLat071a = new L.LatLng(-92.756, 53); var gridLat071b = new L.LatLng(-92.756, 203);
var pointList = [gridLat071a, gridLat071b];
var gridLat071 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat071);

var gridLat072a = new L.LatLng(-93.408, 53); var gridLat072b = new L.LatLng(-93.408, 203);
var pointList = [gridLat072a, gridLat072b];
var gridLat072 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat072);

var gridLat073a = new L.LatLng(-94.060, 53); var gridLat073b = new L.LatLng(-94.060, 203);
var pointList = [gridLat073a, gridLat073b];
var gridLat073 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat073);

var gridLat074a = new L.LatLng(-94.712, 53); var gridLat074b = new L.LatLng(-94.712, 203);
var pointList = [gridLat074a, gridLat074b];
var gridLat074 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat074);

var gridLat075a = new L.LatLng(-95.364, 53); var gridLat075b = new L.LatLng(-95.364, 203);
var pointList = [gridLat075a, gridLat075b];
var gridLat075 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat075);

var gridLat076a = new L.LatLng(-96.016, 53); var gridLat076b = new L.LatLng(-96.016, 203);
var pointList = [gridLat076a, gridLat076b];
var gridLat076 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat076);

var gridLat077a = new L.LatLng(-96.668, 53); var gridLat077b = new L.LatLng(-96.668, 203);
var pointList = [gridLat077a, gridLat077b];
var gridLat077 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat077);

var gridLat078a = new L.LatLng(-97.320, 53); var gridLat078b = new L.LatLng(-97.320, 203);
var pointList = [gridLat078a, gridLat078b];
var gridLat078 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat078);

var gridLat079a = new L.LatLng(-97.972, 53); var gridLat079b = new L.LatLng(-97.972, 203);
var pointList = [gridLat079a, gridLat079b];
var gridLat079 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat079);

var gridLat080a = new L.LatLng(-98.624, 53); var gridLat080b = new L.LatLng(-98.624, 203);
var pointList = [gridLat080a, gridLat080b];
var gridLat080 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLat081a = new L.LatLng(-99.276, 53); var gridLat081b = new L.LatLng(-99.276, 203);
var pointList = [gridLat081a, gridLat081b];
var gridLat081 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat081);

var gridLat082a = new L.LatLng(-99.928, 53); var gridLat082b = new L.LatLng(-99.928, 203);
var pointList = [gridLat082a, gridLat082b];
var gridLat082 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat082);

var gridLat083a = new L.LatLng(-100.580, 53); var gridLat083b = new L.LatLng(-100.580, 203);
var pointList = [gridLat083a, gridLat083b];
var gridLat083 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat083);

var gridLat084a = new L.LatLng(-101.232, 53); var gridLat084b = new L.LatLng(-101.232, 203);
var pointList = [gridLat084a, gridLat084b];
var gridLat084 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat084);

var gridLat085a = new L.LatLng(-101.884, 53); var gridLat085b = new L.LatLng(-101.884, 203);
var pointList = [gridLat085a, gridLat085b];
var gridLat085 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat085);

var gridLat086a = new L.LatLng(-102.536, 53); var gridLat086b = new L.LatLng(-102.536, 203);
var pointList = [gridLat086a, gridLat086b];
var gridLat086 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat086);

var gridLat087a = new L.LatLng(-103.188, 53); var gridLat087b = new L.LatLng(-103.188, 203);
var pointList = [gridLat087a, gridLat087b];
var gridLat087 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat087);

var gridLat088a = new L.LatLng(-103.840, 53); var gridLat088b = new L.LatLng(-103.840, 203);
var pointList = [gridLat088a, gridLat088b];
var gridLat088 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat088);

var gridLat089a = new L.LatLng(-104.492, 53); var gridLat089b = new L.LatLng(-104.492, 203);
var pointList = [gridLat089a, gridLat089b];
var gridLat089 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat089);
//-----
var gridLat090a = new L.LatLng(-105.144, 53); var gridLat090b = new L.LatLng(-105.144, 203);
var pointList = [gridLat090a, gridLat090b];
var gridLat090 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLat091a = new L.LatLng(-105.796, 53); var gridLat091b = new L.LatLng(-105.796, 203);
var pointList = [gridLat091a, gridLat091b];
var gridLat091 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat091);

var gridLat092a = new L.LatLng(-106.448, 53); var gridLat092b = new L.LatLng(-106.448, 203);
var pointList = [gridLat092a, gridLat092b];
var gridLat092 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat092);

var gridLat093a = new L.LatLng(-107.100, 53); var gridLat093b = new L.LatLng(-107.100, 203);
var pointList = [gridLat093a, gridLat093b];
var gridLat093 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat093);

var gridLat094a = new L.LatLng(-107.752, 53); var gridLat094b = new L.LatLng(-107.752, 203);
var pointList = [gridLat094a, gridLat094b];
var gridLat094 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat094);

var gridLat095a = new L.LatLng(-108.404, 53); var gridLat095b = new L.LatLng(-108.404, 203);
var pointList = [gridLat095a, gridLat095b];
var gridLat095 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat095);

var gridLat096a = new L.LatLng(-109.056, 53); var gridLat096b = new L.LatLng(-109.056, 203);
var pointList = [gridLat096a, gridLat096b];
var gridLat096 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat096);

var gridLat097a = new L.LatLng(-109.708, 53); var gridLat097b = new L.LatLng(-109.708, 203);
var pointList = [gridLat097a, gridLat097b];
var gridLat097 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat097);

var gridLat098a = new L.LatLng(-110.360, 53); var gridLat098b = new L.LatLng(-110.360, 203);
var pointList = [gridLat098a, gridLat098b];
var gridLat098 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat098);

var gridLat099a = new L.LatLng(-111.012, 53); var gridLat099b = new L.LatLng(-111.012, 203);
var pointList = [gridLat099a, gridLat099b];
var gridLat099 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat099);
//-----
var gridLat100a = new L.LatLng(-111.664, 53); var gridLat100b = new L.LatLng(-111.664, 203);
var pointList = [gridLat100a, gridLat100b];
var gridLat100 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLat101a = new L.LatLng(-112.316, 53); var gridLat101b = new L.LatLng(-112.316, 203);
var pointList = [gridLat101a, gridLat101b];
var gridLat101 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat101);

var gridLat102a = new L.LatLng(-112.968, 53); var gridLat102b = new L.LatLng(-112.968, 203);
var pointList = [gridLat102a, gridLat102b];
var gridLat102 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat102);

var gridLat103a = new L.LatLng(-113.620, 53); var gridLat103b = new L.LatLng(-113.620, 203);
var pointList = [gridLat103a, gridLat103b];
var gridLat103 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat103);

var gridLat104a = new L.LatLng(-114.272, 53); var gridLat104b = new L.LatLng(-114.272, 203);
var pointList = [gridLat104a, gridLat104b];
var gridLat104 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat104);

var gridLat105a = new L.LatLng(-114.924, 53); var gridLat105b = new L.LatLng(-114.924, 203);
var pointList = [gridLat105a, gridLat105b];
var gridLat105 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat105);

var gridLat106a = new L.LatLng(-115.576, 53); var gridLat106b = new L.LatLng(-115.576, 203);
var pointList = [gridLat106a, gridLat106b];
var gridLat106 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat106);

var gridLat107a = new L.LatLng(-116.228, 53); var gridLat107b = new L.LatLng(-116.228, 203);
var pointList = [gridLat107a, gridLat107b];
var gridLat107 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat107);

var gridLat108a = new L.LatLng(-116.880, 53); var gridLat108b = new L.LatLng(-116.880, 203);
var pointList = [gridLat108a, gridLat108b];
var gridLat108 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat108);

var gridLat109a = new L.LatLng(-117.532, 53); var gridLat109b = new L.LatLng(-117.532, 203);
var pointList = [gridLat109a, gridLat109b];
var gridLat109 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat109);
//-----
var gridLat110a = new L.LatLng(-118.184, 53); var gridLat110b = new L.LatLng(-118.184, 203);
var pointList = [gridLat110a, gridLat110b];
var gridLat110 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLat111a = new L.LatLng(-118.836, 53); var gridLat111b = new L.LatLng(-118.836, 203);
var pointList = [gridLat111a, gridLat111b];
var gridLat111 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat111);

var gridLat112a = new L.LatLng(-119.488, 53); var gridLat112b = new L.LatLng(-119.488, 203);
var pointList = [gridLat112a, gridLat112b];
var gridLat112 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat112);

var gridLat113a = new L.LatLng(-120.140, 53); var gridLat113b = new L.LatLng(-120.140, 203);
var pointList = [gridLat113a, gridLat113b];
var gridLat113 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat113);

var gridLat114a = new L.LatLng(-120.792, 53); var gridLat114b = new L.LatLng(-120.792, 203);
var pointList = [gridLat114a, gridLat114b];
var gridLat114 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat114);

var gridLat115a = new L.LatLng(-121.444, 53); var gridLat115b = new L.LatLng(-121.444, 203);
var pointList = [gridLat115a, gridLat115b];
var gridLat115 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat115);

var gridLat116a = new L.LatLng(-122.096, 53); var gridLat116b = new L.LatLng(-122.096, 203);
var pointList = [gridLat116a, gridLat116b];
var gridLat116 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat116);

var gridLat117a = new L.LatLng(-122.748, 53); var gridLat117b = new L.LatLng(-122.748, 203);
var pointList = [gridLat117a, gridLat117b];
var gridLat117 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat117);

var gridLat118a = new L.LatLng(-123.400, 53); var gridLat118b = new L.LatLng(-123.400, 203);
var pointList = [gridLat118a, gridLat118b];
var gridLat118 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat118);

var gridLat119a = new L.LatLng(-124.052, 53); var gridLat119b = new L.LatLng(-124.052, 203);
var pointList = [gridLat119a, gridLat119b];
var gridLat119 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat119);
//-----
var gridLat120a = new L.LatLng(-124.704, 53); var gridLat120b = new L.LatLng(-124.704, 203);
var pointList = [gridLat120a, gridLat120b];
var gridLat120 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLat121a = new L.LatLng(-125.356, 53); var gridLat121b = new L.LatLng(-125.356, 203);
var pointList = [gridLat121a, gridLat121b];
var gridLat121 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat121);

var gridLat122a = new L.LatLng(-126.008, 53); var gridLat122b = new L.LatLng(-126.008, 203);
var pointList = [gridLat122a, gridLat122b];
var gridLat122 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat122);

var gridLat123a = new L.LatLng(-126.660, 53); var gridLat123b = new L.LatLng(-126.660, 203);
var pointList = [gridLat123a, gridLat123b];
var gridLat123 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat123);

var gridLat124a = new L.LatLng(-127.312, 53); var gridLat124b = new L.LatLng(-127.312, 203);
var pointList = [gridLat124a, gridLat124b];
var gridLat124 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat124);

var gridLat125a = new L.LatLng(-127.964, 53); var gridLat125b = new L.LatLng(-127.964, 203);
var pointList = [gridLat125a, gridLat125b];
var gridLat125 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat125);

var gridLat126a = new L.LatLng(-128.616, 53); var gridLat126b = new L.LatLng(-128.616, 203);
var pointList = [gridLat126a, gridLat126b];
var gridLat126 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat126);

var gridLat127a = new L.LatLng(-129.268, 53); var gridLat127b = new L.LatLng(-129.268, 203);
var pointList = [gridLat127a, gridLat127b];
var gridLat127 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat127);

var gridLat128a = new L.LatLng(-129.920, 53); var gridLat128b = new L.LatLng(-129.920, 203);
var pointList = [gridLat128a, gridLat128b];
var gridLat128 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat128);

var gridLat129a = new L.LatLng(-130.592, 53); var gridLat129b = new L.LatLng(-130.592, 203);
var pointList = [gridLat129a, gridLat129b];
var gridLat129 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat129);

var gridLat130a = new L.LatLng(-131.288, 53); var gridLat130b = new L.LatLng(-131.288, 203);
var pointList = [gridLat130a, gridLat130b];
var gridLat130 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);
//-----
var gridLat131a = new L.LatLng(-131.940, 53); var gridLat131b = new L.LatLng(-131.940, 203);
var pointList = [gridLat131a, gridLat131b];
var gridLat131 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat131);

var gridLat132a = new L.LatLng(-132.592, 53); var gridLat132b = new L.LatLng(-132.592, 203);
var pointList = [gridLat132a, gridLat132b];
var gridLat132 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat132);

var gridLat133a = new L.LatLng(-133.244, 53); var gridLat133b = new L.LatLng(-133.244, 203);
var pointList = [gridLat133a, gridLat133b];
var gridLat133 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat133);

var gridLat134a = new L.LatLng(-133.896, 53); var gridLat134b = new L.LatLng(-133.896, 203);
var pointList = [gridLat134a, gridLat134b];
var gridLat134 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat134);

var gridLat135a = new L.LatLng(-134.548, 53); var gridLat135b = new L.LatLng(-134.548, 203);
var pointList = [gridLat135a, gridLat135b];
var gridLat135 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat135);

var gridLat136a = new L.LatLng(-135.200, 53); var gridLat136b = new L.LatLng(-135.200, 203);
var pointList = [gridLat136a, gridLat136b];
var gridLat136 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat136);

var gridLat137a = new L.LatLng(-135.852, 53); var gridLat137b = new L.LatLng(-135.852, 203);
var pointList = [gridLat137a, gridLat137b];
var gridLat137 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat137);

var gridLat138a = new L.LatLng(-136.504, 53); var gridLat138b = new L.LatLng(-136.504, 203);
var pointList = [gridLat138a, gridLat138b];
var gridLat138 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat138);

var gridLat139a = new L.LatLng(-137.156, 53); var gridLat139b = new L.LatLng(-137.156, 203);
var pointList = [gridLat139a, gridLat139b];
var gridLat139 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat139);
//-----
var gridLat140a = new L.LatLng(-137.808, 53); var gridLat140b = new L.LatLng(-137.808, 203);
var pointList = [gridLat140a, gridLat140b];
var gridLat140 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

var gridLat141a = new L.LatLng(-138.460, 53); var gridLat141b = new L.LatLng(-138.460, 203);
var pointList = [gridLat141a, gridLat141b];
var gridLat141 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat141);

var gridLat142a = new L.LatLng(-139.112, 53); var gridLat142b = new L.LatLng(-139.112, 203);
var pointList = [gridLat142a, gridLat142b];
var gridLat142 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat142);

var gridLat143a = new L.LatLng(-139.764, 53); var gridLat143b = new L.LatLng(-139.764, 203);
var pointList = [gridLat143a, gridLat143b];
var gridLat143 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat143);

var gridLat144a = new L.LatLng(-140.416, 53); var gridLat144b = new L.LatLng(-140.416, 203);
var pointList = [gridLat144a, gridLat144b];
var gridLat144 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat144);

var gridLat145a = new L.LatLng(-141.068, 53); var gridLat145b = new L.LatLng(-141.068, 203);
var pointList = [gridLat145a, gridLat145b];
var gridLat145 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat145);

var gridLat146a = new L.LatLng(-141.720, 53); var gridLat146b = new L.LatLng(-141.720, 203);
var pointList = [gridLat146a, gridLat146b];
var gridLat146 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat146);

var gridLat147a = new L.LatLng(-142.372, 53); var gridLat147b = new L.LatLng(-142.372, 203);
var pointList = [gridLat147a, gridLat147b];
var gridLat147 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat147);

var gridLat148a = new L.LatLng(-143.024, 53); var gridLat148b = new L.LatLng(-143.024, 203);
var pointList = [gridLat148a, gridLat148b];
var gridLat148 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat148);

var gridLat149a = new L.LatLng(-143.676, 53); var gridLat149b = new L.LatLng(-143.676, 203);
var pointList = [gridLat149a, gridLat149b];
var gridLat149 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom06.addLayer(gridLat149);
//-----
var gridLat150a = new L.LatLng(-144.328, 53); var gridLat150b = new L.LatLng(-144.328, 203);
var pointList = [gridLat150a, gridLat150b];
var gridLat150 = new L.Polyline(pointList, { color: "#9d5033", weight: .4 }).addTo(map);

//GRID LINES CORELLIAN SECTOR LON (vertical lines) -- 123.40 - 124.70 = 1.3 / 10 = .065
var corGridLon000a = new L.LatLng(-123.40, 134.510); var corGridLon000b = new L.LatLng(-124.70, 134.510);
var pointList = [corGridLon000a, corGridLon000b];
var corGridLon000 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(corGridLon000);

var corGridLon001a = new L.LatLng(-123.40, 134.575); var corGridLon001b = new L.LatLng(-124.70, 134.575);
var pointList = [corGridLon001a, corGridLon001b];
var corGridLon001 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon001);

var corGridLon002a = new L.LatLng(-123.40, 134.640); var corGridLon002b = new L.LatLng(-124.70, 134.640);
var pointList = [corGridLon002a, corGridLon002b];
var corGridLon002 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon002);

var corGridLon003a = new L.LatLng(-123.40, 134.705); var corGridLon003b = new L.LatLng(-124.70, 134.705);
var pointList = [corGridLon003a, corGridLon003b];
var corGridLon003 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon003);

var corGridLon004a = new L.LatLng(-123.40, 134.770); var corGridLon004b = new L.LatLng(-124.70, 134.770);
var pointList = [corGridLon004a, corGridLon004b];
var corGridLon004 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon004);

var corGridLon005a = new L.LatLng(-123.40, 134.835); var corGridLon005b = new L.LatLng(-124.70, 134.835);
var pointList = [corGridLon005a, corGridLon005b];
var corGridLon005 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon005);

var corGridLon006a = new L.LatLng(-123.40, 134.900); var corGridLon006b = new L.LatLng(-124.70, 134.900);
var pointList = [corGridLon006a, corGridLon006b];
var corGridLon006 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon006);

var corGridLon007a = new L.LatLng(-123.40, 134.965); var corGridLon007b = new L.LatLng(-124.70, 134.965);
var pointList = [corGridLon007a, corGridLon007b];
var corGridLon007 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon007);

var corGridLon008a = new L.LatLng(-123.40, 135.030); var corGridLon008b = new L.LatLng(-124.70, 135.030);
var pointList = [corGridLon008a, corGridLon008b];
var corGridLon008 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon008);

var corGridLon009a = new L.LatLng(-123.40, 135.095); var corGridLon009b = new L.LatLng(-124.70, 135.095);
var pointList = [corGridLon009a, corGridLon009b];
var corGridLon009 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon009);

var corGridLon010a = new L.LatLng(-123.40, 135.160); var corGridLon010b = new L.LatLng(-124.70, 135.160);
var pointList = [corGridLon010a, corGridLon010b];
var corGridLon010 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(corGridLon010);

var corGridLon011a = new L.LatLng(-123.40, 135.225); var corGridLon011b = new L.LatLng(-124.70, 135.225);
var pointList = [corGridLon011a, corGridLon011b];
var corGridLon011 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon011);

var corGridLon012a = new L.LatLng(-123.40, 135.290); var corGridLon012b = new L.LatLng(-124.70, 135.290);
var pointList = [corGridLon012a, corGridLon012b];
var corGridLon012 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon012);

var corGridLon013a = new L.LatLng(-123.40, 135.355); var corGridLon013b = new L.LatLng(-124.70, 135.355);
var pointList = [corGridLon013a, corGridLon013b];
var corGridLon013 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon013);

var corGridLon014a = new L.LatLng(-123.40, 135.420); var corGridLon014b = new L.LatLng(-124.70, 135.420);
var pointList = [corGridLon014a, corGridLon014b];
var corGridLon014 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon014);

var corGridLon015a = new L.LatLng(-123.40, 135.485); var corGridLon015b = new L.LatLng(-124.70, 135.485);
var pointList = [corGridLon015a, corGridLon015b];
var corGridLon015 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon015);

var corGridLon016a = new L.LatLng(-123.40, 135.550); var corGridLon016b = new L.LatLng(-124.70, 135.550);
var pointList = [corGridLon016a, corGridLon016b];
var corGridLon016 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon016);

var corGridLon017a = new L.LatLng(-123.40, 135.615); var corGridLon017b = new L.LatLng(-124.70, 135.615);
var pointList = [corGridLon017a, corGridLon017b];
var corGridLon017 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon017);

var corGridLon018a = new L.LatLng(-123.40, 135.680); var corGridLon018b = new L.LatLng(-124.70, 135.680);
var pointList = [corGridLon018a, corGridLon018b];
var corGridLon018 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon018);

var corGridLon019a = new L.LatLng(-123.40, 135.745); var corGridLon019b = new L.LatLng(-124.70, 135.745);
var pointList = [corGridLon019a, corGridLon019b];
var corGridLon019 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLon019);

var corGridLon020a = new L.LatLng(-123.40, 135.814); var corGridLon020b = new L.LatLng(-124.70, 135.814);
var pointList = [corGridLon020a, corGridLon020b];
var corGridLon020 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(corGridLon020);

//GRID LINES CORELLIAN SECTOR LAT (horizontal lines) -- 123.40 - 124.70 = 1.3 / 10 = .065
var corGridLat000a = new L.LatLng(-123.40, 134.510); var corGridLat000b = new L.LatLng(-123.40, 135.814);
var pointList = [corGridLat000a, corGridLat000b];
var corGridLat000 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(corGridLat000);

var corGridLat001a = new L.LatLng(-123.465, 134.510); var corGridLat001b = new L.LatLng(-123.465, 135.814);
var pointList = [corGridLat001a, corGridLat001b];
var corGridLat001 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat001);

var corGridLat002a = new L.LatLng(-123.530, 134.510); var corGridLat002b = new L.LatLng(-123.530, 135.814);
var pointList = [corGridLat002a, corGridLat002b];
var corGridLat002 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat002);

var corGridLat003a = new L.LatLng(-123.595, 134.510); var corGridLat003b = new L.LatLng(-123.595, 135.814);
var pointList = [corGridLat003a, corGridLat003b];
var corGridLat003 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat003);

var corGridLat004a = new L.LatLng(-123.660, 134.510); var corGridLat004b = new L.LatLng(-123.660, 135.814);
var pointList = [corGridLat004a, corGridLat004b];
var corGridLat004 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat004);

var corGridLat005a = new L.LatLng(-123.725, 134.510); var corGridLat005b = new L.LatLng(-123.725, 135.814);
var pointList = [corGridLat005a, corGridLat005b];
var corGridLat005 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat005);

var corGridLat006a = new L.LatLng(-123.790, 134.510); var corGridLat006b = new L.LatLng(-123.790, 135.814);
var pointList = [corGridLat006a, corGridLat006b];
var corGridLat006 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat006);

var corGridLat007a = new L.LatLng(-123.855, 134.510); var corGridLat007b = new L.LatLng(-123.855, 135.814);
var pointList = [corGridLat007a, corGridLat007b];
var corGridLat007 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat007);

var corGridLat008a = new L.LatLng(-123.920, 134.510); var corGridLat008b = new L.LatLng(-123.920, 135.814);
var pointList = [corGridLat008a, corGridLat008b];
var corGridLat008 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat008);

var corGridLat009a = new L.LatLng(-123.985, 134.510); var corGridLat009b = new L.LatLng(-123.985, 135.814);
var pointList = [corGridLat009a, corGridLat009b];
var corGridLat009 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat009);

var corGridLat010a = new L.LatLng(-124.050, 134.510); var corGridLat010b = new L.LatLng(-124.050, 135.814);
var pointList = [corGridLat010a, corGridLat010b];
var corGridLat010 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(corGridLat010);

var corGridLat011a = new L.LatLng(-124.115, 134.510); var corGridLat011b = new L.LatLng(-124.115, 135.814);
var pointList = [corGridLat011a, corGridLat011b];
var corGridLat011 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat011);

var corGridLat012a = new L.LatLng(-124.180, 134.510); var corGridLat012b = new L.LatLng(-124.180, 135.814);
var pointList = [corGridLat012a, corGridLat012b];
var corGridLat012 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat012);

var corGridLat013a = new L.LatLng(-124.245, 134.510); var corGridLat013b = new L.LatLng(-124.245, 135.814);
var pointList = [corGridLat013a, corGridLat013b];
var corGridLat013 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat013);

var corGridLat014a = new L.LatLng(-124.310, 134.510); var corGridLat014b = new L.LatLng(-124.310, 135.814);
var pointList = [corGridLat014a, corGridLat014b];
var corGridLat014 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat014);

var corGridLat015a = new L.LatLng(-124.375, 134.510); var corGridLat015b = new L.LatLng(-124.375, 135.814);
var pointList = [corGridLat015a, corGridLat015b];
var corGridLat015 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat015);

var corGridLat016a = new L.LatLng(-124.440, 134.510); var corGridLat016b = new L.LatLng(-124.440, 135.814);
var pointList = [corGridLat016a, corGridLat016b];
var corGridLat016 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat016);

var corGridLat017a = new L.LatLng(-124.505, 134.510); var corGridLat017b = new L.LatLng(-124.505, 135.814);
var pointList = [corGridLat017a, corGridLat017b];
var corGridLat017 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat017);

var corGridLat018a = new L.LatLng(-124.570, 134.510); var corGridLat018b = new L.LatLng(-124.570, 135.814);
var pointList = [corGridLat018a, corGridLat018b];
var corGridLat018 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat018);

var corGridLat019a = new L.LatLng(-124.635, 134.510); var corGridLat019b = new L.LatLng(-124.635, 135.814);
var pointList = [corGridLat019a, corGridLat019b];
var corGridLat019 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(corGridLat019);

//GRID LINES HAPAN CLUSTER LON (vertical lines) -- 123.40 - 124.70 = 1.3 / 10 = .065
var hapGridLon000a = new L.LatLng(-107.754, 147.549); var hapGridLon000b = new L.LatLng(-108.406, 147.549);
var pointList = [hapGridLon000a, hapGridLon000b];
var hapGridLon000 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(hapGridLon000);

var hapGridLon001a = new L.LatLng(-107.754, 147.614); var hapGridLon001b = new L.LatLng(-108.406, 147.614);
var pointList = [hapGridLon001a, hapGridLon001b];
var hapGridLon001 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon001);

var hapGridLon002a = new L.LatLng(-107.754, 147.679); var hapGridLon002b = new L.LatLng(-108.406, 147.679);
var pointList = [hapGridLon002a, hapGridLon002b];
var hapGridLon002 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon002);

var hapGridLon003a = new L.LatLng(-107.754, 147.744); var hapGridLon003b = new L.LatLng(-108.406, 147.744);
var pointList = [hapGridLon003a, hapGridLon003b];
var hapGridLon003 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon003);

var hapGridLon004a = new L.LatLng(-107.754, 147.809); var hapGridLon004b = new L.LatLng(-108.406, 147.809);
var pointList = [hapGridLon004a, hapGridLon004b];
var hapGridLon004 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon004);

var hapGridLon005a = new L.LatLng(-107.754, 147.874); var hapGridLon005b = new L.LatLng(-108.406, 147.874);
var pointList = [hapGridLon005a, hapGridLon005b];
var hapGridLon005 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon005);

var hapGridLon006a = new L.LatLng(-107.754, 147.939); var hapGridLon006b = new L.LatLng(-108.406, 147.939);
var pointList = [hapGridLon006a, hapGridLon006b];
var hapGridLon006 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon006);

var hapGridLon007a = new L.LatLng(-107.754, 148.004); var hapGridLon007b = new L.LatLng(-108.406, 148.004);
var pointList = [hapGridLon007a, hapGridLon007b];
var hapGridLon007 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon007);

var hapGridLon008a = new L.LatLng(-107.754, 148.069); var hapGridLon008b = new L.LatLng(-108.406, 148.069);
var pointList = [hapGridLon008a, hapGridLon008b];
var hapGridLon008 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon008);

var hapGridLon009a = new L.LatLng(-107.754, 148.136); var hapGridLon009b = new L.LatLng(-108.406, 148.136);
var pointList = [hapGridLon009a, hapGridLon009b];
var hapGridLon009 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLon009);

var hapGridLon010a = new L.LatLng(-107.754, 148.202); var hapGridLon010b = new L.LatLng(-108.406, 148.202);
var pointList = [hapGridLon010a, hapGridLon010b];
var hapGridLon010 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(hapGridLon010);

//GRID LINES HAPAN CLUSTER LAT (horizontal lines) -- 123.40 - 124.70 = 1.3 / 10 = .065
var hapGridLat000a = new L.LatLng(-107.754, 147.549); var hapGridLat000b = new L.LatLng(-107.754, 148.202);
var pointList = [hapGridLat000a, hapGridLat000b];
var hapGridLat000 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(hapGridLat000);

var hapGridLat001a = new L.LatLng(-107.819, 147.549); var hapGridLat001b = new L.LatLng(-107.819, 148.202);
var pointList = [hapGridLat001a, hapGridLat001b];
var hapGridLat001 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat001);

var hapGridLat002a = new L.LatLng(-107.884, 147.549); var hapGridLat002b = new L.LatLng(-107.884, 148.202);
var pointList = [hapGridLat002a, hapGridLat002b];
var hapGridLat002 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat002);

var hapGridLat003a = new L.LatLng(-107.949, 147.549); var hapGridLat003b = new L.LatLng(-107.949, 148.202);
var pointList = [hapGridLat003a, hapGridLat003b];
var hapGridLat003 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat003);

var hapGridLat004a = new L.LatLng(-108.014, 147.549); var hapGridLat004b = new L.LatLng(-108.014, 148.202);
var pointList = [hapGridLat004a, hapGridLat004b];
var hapGridLat004 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat004);

var hapGridLat005a = new L.LatLng(-108.079, 147.549); var hapGridLat005b = new L.LatLng(-108.079, 148.202);
var pointList = [hapGridLat005a, hapGridLat005b];
var hapGridLat005 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat005);

var hapGridLat006a = new L.LatLng(-108.144, 147.549); var hapGridLat006b = new L.LatLng(-108.144, 148.202);
var pointList = [hapGridLat006a, hapGridLat006b];
var hapGridLat006 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat006);

var hapGridLat007a = new L.LatLng(-108.209, 147.549); var hapGridLat007b = new L.LatLng(-108.209, 148.202);
var pointList = [hapGridLat007a, hapGridLat007b];
var hapGridLat007 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat007);

var hapGridLat008a = new L.LatLng(-108.274, 147.549); var hapGridLat008b = new L.LatLng(-108.274, 148.202);
var pointList = [hapGridLat008a, hapGridLat008b];
var hapGridLat008 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat008);

var hapGridLat009a = new L.LatLng(-108.339, 147.549); var hapGridLat009b = new L.LatLng(-108.339, 148.202);
var pointList = [hapGridLat009a, hapGridLat009b];
var hapGridLat009 = new L.Polyline(pointList, { color: "#d39178", weight: .25 }); zoom07.addLayer(hapGridLat009);

var hapGridLat010a = new L.LatLng(-108.404, 147.549); var hapGridLat010b = new L.LatLng(-108.404, 148.202);
var pointList = [hapGridLat010a, hapGridLat010b];
var hapGridLat010 = new L.Polyline(pointList, { color: "#9d5033", weight: .9 }); zoom07.addLayer(hapGridLat010);

//HYPERLANES (* denotes conjectural name)
//=========================== Y COORD / X COORD ===============
//Tython Trail* [navy polyline]
var tyt001 = new L.LatLng(-114.99, 124.84); //Empress Teta
var tyt002 = new L.LatLng(-115.36, 124.89); //near Empress Teta
var tyt003 = new L.LatLng(-115.60, 124.88); //near Empress Teta 2
var tyt004 = new L.LatLng(-115.80, 124.78); //near Empress Teta 3
var tyt005 = new L.LatLng(-116.06, 124.70); //near Empress Teta 4
var tyt006 = new L.LatLng(-116.23, 124.70); //near Tython 1
var tyt007 = new L.LatLng(-116.47, 124.77); //near Tython 2
var tyt008 = new L.LatLng(-116.81, 124.86); //Tython

var pointList = [tyt001, tyt002, tyt003, tyt004, tyt005, tyt006, tyt007, tyt008];
var tythonTrail = new L.Polyline(pointList, {
  color: "#262673",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
tythonTrail.addTo(map);

//Byss Run [apricot polyline]
var bys001 = new L.LatLng(-114.99, 124.84); //Empress Teta
var bys002 = new L.LatLng(-115.09, 124.73); //near Empress Teta
var bys003 = new L.LatLng(-115.40, 124.45); //near Keeara Major
var bys004 = new L.LatLng(-115.49, 124.21); //Keeara Major
var bys005 = new L.LatLng(-116.06, 122.97); //near Keeara Major 2
var bys006 = new L.LatLng(-116.24, 122.77); //near Prakith
var bys007 = new L.LatLng(-116.50, 122.51); //near Prakith 2
var bys008 = new L.LatLng(-117.49, 121.93); //Prakith
var bys009 = new L.LatLng(-118.02, 120.83); //near Prakith 2
var bys010 = new L.LatLng(-118.19, 120.52); //near Prakith 3
var bys011 = new L.LatLng(-118.45, 120.16); //near Odik
var bys012 = new L.LatLng(-118.71, 119.82); //near Odik 2
var bys013 = new L.LatLng(-118.81, 119.75); //Odik
var bys014 = new L.LatLng(-118.97, 119.70); //near Odik 3
var bys015 = new L.LatLng(-119.18, 119.65); //near Odik 4
var bys016 = new L.LatLng(-119.49, 119.61); //near Odik 5
var bys017 = new L.LatLng(-119.81, 119.59); //near Odik 6
var bys018 = new L.LatLng(-120.80, 119.59); //near Odik 7
var bys019 = new L.LatLng(-120.92, 119.62); //near Odik 8
var bys020 = new L.LatLng(-121.45, 119.85); //near Odik 9
var bys021 = new L.LatLng(-122.02, 120.25); //near Odik 10
var bys022 = new L.LatLng(-123.50, 121.62); //Byss

var pointList = [bys001, bys002, bys003, bys004, bys005, bys006, bys007, bys008, bys009, bys010, bys011, bys012, bys013, bys014, bys015, bys016, bys017, bys018, bys019, bys020, bys021, bys022];
var byssRun = new L.Polyline(pointList, {
  color: "#ffd8b1",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
byssRun.addTo(map);

//Daragon Trail [orange polyline]
var dar001 = new L.LatLng(-114.99, 124.84); //Empress Teta
var dar002 = new L.LatLng(-111.30, 130.08); //near Skako
var dar003 = new L.LatLng(-106.19, 136.13); //Adari
var dar004 = new L.LatLng(-95.15, 149.69); //near Bedlam
var dar005 = new L.LatLng(-89.07, 157.00); //near Altair
var dar006 = new L.LatLng(-83.70, 162.90); //near Jaga's Cluster
var dar007 = new L.LatLng(-81.37, 165.06); //Moraband

var pointList = [dar001, dar002, dar003, dar004, dar005, dar006, dar007];
var daragonTrail = new L.Polyline(pointList, {
  color: "#C98B5E",
  weight: 3,
  opacity: .9,
  dashArray: '10,15',
  lineCap: 'square',
  smoothFactor: 1
});
daragonTrail.addTo(map);

//Empress Teta-Arkania Run (path partly conjectural) [magenta polyline]
var eta001 = new L.LatLng(-114.99, 124.84); //Empress Teta
var eta002 = new L.LatLng(-114.93, 124.65); //near Empress Teta
var eta003 = new L.LatLng(-114.68, 124.55); //near Kuar
var eta004 = new L.LatLng(-114.57, 124.56); //Kuar
var eta005 = new L.LatLng(-114.42, 124.78); //Ronika
var eta006 = new L.LatLng(-112.75, 126.95); //Yulant
var eta007 = new L.LatLng(-111.94, 128.17); //near Yulant
var eta008 = new L.LatLng(-111.55, 128.47); //near Basilisk
var eta009 = new L.LatLng(-111.23, 128.74); //Basilisk
var eta010 = new L.LatLng(-110.54, 129.16); //Tarlandia
var eta011 = new L.LatLng(-107.72, 130.45); //Plavin
var eta012 = new L.LatLng(-105.65, 131.45); //near Arkania
var eta013 = new L.LatLng(-105.11, 131.81); //Arkania

var pointList = [eta001, eta002, eta003, eta004, eta005, eta006, eta007, eta008, eta009, eta010, eta011, eta012, eta013];
var etArkaniaRun = new L.Polyline(pointList, {
  color: "#DCA3D9",
  weight: 3,
  opacity: .9,
  lineCap: 'square',
  smoothFactor: 1
}); zoom05.addLayer(etArkaniaRun);

//Metellos Trade Route [mint polyline]
var met001 = new L.LatLng(-111.67, 124.73); //Coruscant
var met002 = new L.LatLng(-111.57, 124.51); //near Coruscant
var met003 = new L.LatLng(-111.53, 124.27); //near Metellos
var met004 = new L.LatLng(-111.55, 124.05); //Near Metellos 2
var met005 = new L.LatLng(-111.57, 123.90); //Metellos
var met006 = new L.LatLng(-111.70, 123.41); //near Pizkoss
var met007 = new L.LatLng(-111.88, 123.12); //Pizkoss
var met008 = new L.LatLng(-112.13, 122.68); //Norkronia
var met009 = new L.LatLng(-112.50, 122.05); //near Volgax
var met010 = new L.LatLng(-112.91, 121.45); //Worru'du
var met011 = new L.LatLng(-114.03, 120.00); //Cal-Seti
var met012 = new L.LatLng(-114.52, 119.37); //near Cal-Seti
var met013 = new L.LatLng(-115.19, 118.79); //Orooturoo

var pointList = [met001, met002, met003, met004, met005, met006, met007, met008, met009, met010, met011, met012, met013];
var metellosTradeRoute = new L.Polyline(pointList, {
  color: "#AAFFC3",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
metellosTradeRoute.addTo(map);

//Widek Bypass [orange polyline]
var wbp001 = new L.LatLng(-115.19, 118.79); //Orooturoo
var wbp002 = new L.LatLng(-115.14, 118.66); //Wehttam
var wbp003 = new L.LatLng(-115.24, 118.51); //Thobek
var wbp004 = new L.LatLng(-115.37, 118.48); //Galantos
var wbp005 = new L.LatLng(-115.52, 118.48); //Widek

var pointList = [wbp001, wbp002, wbp003, wbp004, wbp005];
var widekBypass = new L.Polyline(pointList, {
  color: "#F58231",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
}); zoom05.addLayer(widekBypass);

//Namadii Corridor [cyan polyline]
var nam001 = new L.LatLng(-111.67, 124.73); //Coruscant
var nam002 = new L.LatLng(-110.89, 124.34); //Tanjay
var nam003 = new L.LatLng(-110.52, 123.91); //Weerden
var nam004 = new L.LatLng(-110.27, 123.93); //near Weerden
var nam005 = new L.LatLng(-109.93, 123.89); //near Weerden 2
var nam006 = new L.LatLng(-109.69, 123.83); //Galvoni
var nam007 = new L.LatLng(-109.42, 123.65); //near Galvoni
var nam008 = new L.LatLng(-109.12, 123.40); //near Coriallis
var nam009 = new L.LatLng(-109.10, 123.35); //Coriallis
var nam010 = new L.LatLng(-108.99, 123.20); //near Coriallis 2
var nam011 = new L.LatLng(-108.87, 122.94); //Twith
var nam012 = new L.LatLng(-108.76, 122.40); //Pantolomin
var nam013 = new L.LatLng(-108.57, 122.44); //near Pantolomin
var nam014 = new L.LatLng(-108.30, 122.48); //near Kamparas
var nam015 = new L.LatLng(-108.09, 122.46); //Kamparas
var nam016 = new L.LatLng(-107.69, 122.00); //Borleias
var nam017 = new L.LatLng(-106.87, 121.56); //Ord Mirit
var nam018 = new L.LatLng(-105.86, 120.79); //Iyuta
var nam019 = new L.LatLng(-105.32, 120.35); //Palanhi
var nam020 = new L.LatLng(-105.21, 120.28); //Tsukkia
var nam021 = new L.LatLng(-104.22, 119.44); //Tharin
var nam022 = new L.LatLng(-103.47, 118.81); //Carratos
var nam023 = new L.LatLng(-103.31, 118.73); //near Carratos
var nam024 = new L.LatLng(-103.08, 118.68); //near Voltare
var nam025 = new L.LatLng(-102.84, 118.67); //Voltare
var nam026 = new L.LatLng(-102.64, 118.63); //near Voltare 2
var nam027 = new L.LatLng(-102.43, 118.56); //Meastrinnar
var nam028 = new L.LatLng(-102.26, 118.46); //near Meastrinnar
var nam029 = new L.LatLng(-102.11, 118.34); //Aphran
var nam030 = new L.LatLng(-101.76, 117.93); //near Aphran
var nam031 = new L.LatLng(-101.43, 117.52); //Bengat
var nam032 = new L.LatLng(-101.14, 116.83); //Bilbringi
var nam033 = new L.LatLng(-100.96, 116.61); //near Bilbringi
var nam034 = new L.LatLng(-100.45, 116.31); //Rondai
var nam035 = new L.LatLng(-100.02, 116.09); //near Rondai
var nam036 = new L.LatLng(-99.69, 115.84); //Coth Fuuras Sta.
var nam037 = new L.LatLng(-99.23, 115.38); //Dorin
var nam038 = new L.LatLng(-97.93, 114.42); //Carvandir
var nam039 = new L.LatLng(-97.48, 113.98); //Jaloria
var nam040 = new L.LatLng(-97.31, 113.87); //Vaced
var nam041 = new L.LatLng(-96.08, 112.89); //Glee Anselm
var nam042 = new L.LatLng(-95.31, 112.50); //Belshar Othacuu
var nam043 = new L.LatLng(-94.56, 112.20); //Ord Varee
var nam044 = new L.LatLng(-93.89, 111.84); //Kalaan
var nam045 = new L.LatLng(-93.09, 111.55); //Masgen
var nam046 = new L.LatLng(-92.09, 111.22); //Ansion
var nam047 = new L.LatLng(-91.77, 111.20); //near Ansion
var nam048 = new L.LatLng(-91.52, 111.18); //near Namadii
var nam049 = new L.LatLng(-91.19, 111.20); //Namadii

var pointList = [nam001, nam002, nam003, nam004, nam005, nam006, nam007, nam008, nam009, nam010, nam011, nam012, nam013, nam014, nam015, nam016, nam017, nam018, nam019, nam020, nam021, nam022, nam023, nam024,
  nam025, nam026, nam027, nam028, nam029, nam030, nam031, nam032, nam033, nam034, nam035, nam036, nam037, nam038, nam039, nam040, nam041, nam042, nam043, nam044, nam045, nam046, nam047, nam048, nam049];

var namadiiCorridor = new L.Polyline(pointList, {
  color: "#42d4f4",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
namadiiCorridor.addTo(map);

//Coruscant-Dantooine Run [green polyline]
var crd001 = new L.LatLng(-102.11, 118.34); //Aphran
var crd002 = new L.LatLng(-102.05, 118.34); //near Aphran
var crd003 = new L.LatLng(-101.94, 118.45); //near Neshtab
var crd004 = new L.LatLng(-101.78, 118.75); //Neshtab
var crd005 = new L.LatLng(-101.52, 118.51); //near Neshtab
var crd006 = new L.LatLng(-101.27, 118.34); //near Neshtab 2
var crd007 = new L.LatLng(-100.59, 117.98); //near Aramal
var crd008 = new L.LatLng(-99.66, 117.51); //Aramal
var crd009 = new L.LatLng(-98.68, 117.09); //Ryborea
var crd010 = new L.LatLng(-98.01, 116.81); //Station88
var crd011 = new L.LatLng(-98.12, 116.61); //Vicondor
var crd012 = new L.LatLng(-97.96, 116.59); //near Vicondor
var crd013 = new L.LatLng(-97.66, 116.48); //Bezim
var crd014 = new L.LatLng(-97.45, 116.37); //near Bezim
var crd015 = new L.LatLng(-97.01, 116.30); //near Bezim 2
var crd016 = new L.LatLng(-96.30, 116.30); //near Darkon
var crd017 = new L.LatLng(-96.08, 116.24); //near Darkon 2
var crd018 = new L.LatLng(-95.85, 116.15); //Darkon
var crd019 = new L.LatLng(-95.23, 115.73); //near Darkon 3
var crd020 = new L.LatLng(-94.84, 115.41); //near Londor
var crd021 = new L.LatLng(-94.54, 115.17); //near Londor 2
var crd022 = new L.LatLng(-94.17, 115.06); //Londor
var crd023 = new L.LatLng(-94.34, 115.51); //near Londor
var crd024 = new L.LatLng(-94.44, 115.88); //near Londor 2
var crd025 = new L.LatLng(-94.44, 116.06); //near Londor 3
var crd026 = new L.LatLng(-94.41, 116.16); //near Londor 4
var crd027 = new L.LatLng(-94.08, 116.76); //near Londor 5
var crd028 = new L.LatLng(-93.98, 116.86); //near Londor 6
var crd029 = new L.LatLng(-93.86, 116.89); //Valrar
var crd030 = new L.LatLng(-93.02, 117.00); //near Valrar
var crd031 = new L.LatLng(-92.50, 117.13); //Iridonia
var crd032 = new L.LatLng(-92.41, 117.14); //near Tangar
var crd033 = new L.LatLng(-92.35, 117.18); //near Tangar 2
var crd034 = new L.LatLng(-92.03, 117.52); //near Tangar 3
var crd035 = new L.LatLng(-91.50, 118.14); //near Tangar 4
var crd036 = new L.LatLng(-90.80, 119.18); //near Tangar 5
var crd037 = new L.LatLng(-89.56, 120.87); //near Tangar 6
var crd038 = new L.LatLng(-88.52, 122.12); //near Tangar 7
var crd039 = new L.LatLng(-88.21, 122.52); //near Tangar 8
var crd040 = new L.LatLng(-88.05, 122.77); //near Tangar 9
var crd041 = new L.LatLng(-87.77, 123.24); //Tangar
var crd042 = new L.LatLng(-87.63, 123.52); //near Tangar 10
var crd043 = new L.LatLng(-87.52, 123.63); //near Tangar 11
var crd044 = new L.LatLng(-87.35, 123.71); //Ord Cantrell
var crd045 = new L.LatLng(-86.58, 124.05); //near Ord Cantrell 2
var crd046 = new L.LatLng(-86.37, 124.20); //near Ord Cantrell 3
var crd047 = new L.LatLng(-85.77, 125.11); //near Ord Cantrell 4
var crd048 = new L.LatLng(-85.53, 125.38); //near Ord Cantrell 5
var crd049 = new L.LatLng(-85.28, 125.54); //near Ord Cantrell 6
var crd050 = new L.LatLng(-84.85, 125.68); //near Ord Cantrell 7
var crd051 = new L.LatLng(-83.96, 125.73); //near Ord Cantrell 8
var crd052 = new L.LatLng(-83.63, 125.70); //near Ord Cantrell 9
var crd053 = new L.LatLng(-83.63, 125.70); //near Ord Cantrell 10
var crd054 = new L.LatLng(-83.38, 125.63); //near Ord Cantrell 11
var crd055 = new L.LatLng(-82.85, 125.38); //near Ord Cantrell 12
var crd056 = new L.LatLng(-82.31, 125.13); //near Ord Cantrell 13
var crd057 = new L.LatLng(-82.24, 125.13); //near Ord Cantrell 14
var crd058 = new L.LatLng(-81.84, 125.22); //near Ord Cantrell 15
var crd059 = new L.LatLng(-81.73, 125.22); //Moltok
var crd060 = new L.LatLng(-81.63, 125.16); //near Moltok
var crd061 = new L.LatLng(-81.16, 124.78); //Ord Biniir
var crd062 = new L.LatLng(-79.45, 123.67); //near Ord Biniir
var crd063 = new L.LatLng(-79.38, 123.63); //near Ord Biniir 2
var crd064 = new L.LatLng(-79.26, 123.59); //near Ord Biniir 3
var crd065 = new L.LatLng(-79.13, 123.60); //near Ord Biniir 4
var crd066 = new L.LatLng(-78.98, 123.72); //near Ord Biniir 5
var crd067 = new L.LatLng(-78.91, 123.88); //near Ord Biniir 6
var crd068 = new L.LatLng(-78.72, 124.88); //near Ord Biniir 7
var crd069 = new L.LatLng(-78.63, 125.25); //near Ord Biniir 8
var crd070 = new L.LatLng(-78.28, 125.79); //Ord Trasi
var crd071 = new L.LatLng(-78.18, 125.90); //near Ord Trasi
var crd072 = new L.LatLng(-78.07, 125.95); //near Ord Trasi 2
var crd073 = new L.LatLng(-77.97, 125.94); //near Ord Trasi 3
var crd074 = new L.LatLng(-77.77, 125.86); //near Ord Trasi 4
var crd075 = new L.LatLng(-77.72, 125.84); //near Ord Trasi 5
var crd076 = new L.LatLng(-77.72, 125.84); //near Ord Trasi 6
var crd077 = new L.LatLng(-77.64, 125.84); //near Ord Trasi 7
var crd078 = new L.LatLng(-77.42, 126.02); //near Ord Trasi 8
var crd079 = new L.LatLng(-77.02, 126.54); //near Ord Trasi 9
var crd080 = new L.LatLng(-76.90, 126.63); //near Ord Trasi 10
var crd081 = new L.LatLng(-76.63, 126.73); //near Ord Trasi 11
var crd082 = new L.LatLng(-76.51, 126.77); //near Ord Trasi 12
var crd083 = new L.LatLng(-76.39, 126.77); //near Ord Trasi 13
var crd084 = new L.LatLng(-76.33, 126.72); //Anx Minor
var crd085 = new L.LatLng(-76.32, 126.57); //near Anx Minor
var crd086 = new L.LatLng(-76.30, 126.52); //near Anx Minor 2
var crd087 = new L.LatLng(-75.94, 126.01); //Sinsang
var crd088 = new L.LatLng(-75.42, 125.33); //near Sinsang
var crd089 = new L.LatLng(-75.21, 124.79); //Dantooine

var pointList = [crd001, crd002, crd003, crd004, crd005, crd006, crd007, crd008, crd009, crd010, crd011, crd012, crd013, crd014, crd015, crd016, crd017, crd018, crd019, crd020, crd021, crd022, crd023, crd024,
  crd025, crd026, crd027, crd028, crd029, crd030, crd031, crd032, crd033, crd034, crd035, crd036, crd037, crd038, crd039, crd040, crd041, crd042, crd043, crd044, crd045, crd046, crd047, crd048, crd049,
  crd050, crd051, crd052, crd053, crd054, crd055, crd056, crd057, crd058, crd059, crd060, crd061, crd062, crd063, crd064, crd065, crd066, crd067, crd068, crd069, crd070, crd071, crd072, crd073, crd074,
  crd075, crd076, crd077, crd078, crd079, crd080, crd081, crd082, crd083, crd084, crd085, crd086, crd087, crd088, crd089];
var coruscantDantooineRun = new L.Polyline(pointList, {
  color: "#3cb44b",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
}); coruscantDantooineRun.addTo(map);

//Vento Run* [maroon polyline]
var vtr001 = new L.LatLng(-113.17, 124.83); //Jerrilek
var vtr002 = new L.LatLng(-113.12, 124.88); //near Jerrilek
var vtr003 = new L.LatLng(-113.05, 125.09); //near Spira
var vtr004 = new L.LatLng(-113.02, 125.38); //Spira
var vtr005 = new L.LatLng(-112.96, 125.50); //near Spira 2
var vtr006 = new L.LatLng(-111.85, 126.52); //near Carlem
var vtr007 = new L.LatLng(-109.86, 128.01); //Vento
var vtr008 = new L.LatLng(-109.75, 128.03); //Corulag

var pointList = [vtr001, vtr002, vtr003, vtr004, vtr005, vtr006, vtr007, vtr008];
var ventoRun = new L.Polyline(pointList, {
  color: "#800000",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
}); zoom05.addLayer(ventoRun);

//Koros Trunk Line* [blue polyline]
var ktl001 = new L.LatLng(-111.67, 124.73); //Coruscant
var ktl002 = new L.LatLng(-112.20, 124.78); //Foerost
var ktl003 = new L.LatLng(-112.47, 124.77); //Kaikielius
var ktl004 = new L.LatLng(-112.65, 124.71); //Ruan
var ktl005 = new L.LatLng(-113.17, 124.83); //Jerrilek
var ktl006 = new L.LatLng(-114.99, 124.84); //Empress Teta

var pointList = [ktl001, ktl002, ktl003, ktl004, ktl005, ktl006];
var korosTrunk = new L.Polyline(pointList, {
  color: "#4363d8",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
korosTrunk.addTo(map);

//Ag Circuit [lime polyline]
var agc001 = new L.LatLng(-114.03, 120.00); //Cal-Seti
var agc002 = new L.LatLng(-113.98, 120.50); //near Cal-Seti
var agc003 = new L.LatLng(-113.86, 120.80); //near Fresia
var agc004 = new L.LatLng(-113.70, 120.89); //Fresia
var agc005 = new L.LatLng(-113.55, 120.93); //near Fresia 2
var agc006 = new L.LatLng(-113.49, 120.98); //near Galand
var agc007 = new L.LatLng(-113.39, 121.20); //Galand
var agc008 = new L.LatLng(-113.16, 121.80); //Tallia
var agc009 = new L.LatLng(-112.96, 122.20); //Alland
var agc010 = new L.LatLng(-112.96, 123.11); //Salliche
var agc011 = new L.LatLng(-112.95, 123.15); //near Salliche
var agc012 = new L.LatLng(-112.63, 123.77); //near Stassia
var agc013 = new L.LatLng(-112.55, 123.98); //Stassia
var agc014 = new L.LatLng(-112.53, 124.09); //near Stassia 2
var agc015 = new L.LatLng(-112.51, 124.33); //near Stassia 3
var agc016 = new L.LatLng(-112.56, 124.57); //near Ruan
var agc017 = new L.LatLng(-112.65, 124.71); //Ruan
var agc018 = new L.LatLng(-112.55, 125.06); //near Ruan 2
var agc019 = new L.LatLng(-112.48, 125.94); //near Yulant 1
var agc020 = new L.LatLng(-112.59, 126.57); //near Yulant 2
var agc021 = new L.LatLng(-112.75, 126.95); //Yulant
var agc022 = new L.LatLng(-112.99, 127.39); //Aargau
var agc023 = new L.LatLng(-113.10, 127.85); //near Aargau
var agc024 = new L.LatLng(-113.18, 128.80); //near Broest
var agc025 = new L.LatLng(-113.29, 129.02); //Broest
var agc026 = new L.LatLng(-113.38, 129.46); //near Xorth
var agc027 = new L.LatLng(-113.52, 130.09); //Xorth

var pointList = [agc001, agc002, agc003, agc004, agc005, agc006, agc007, agc008, agc009, agc010, agc011, agc012, agc013, agc014, agc015, agc016, agc017, agc018, agc019, agc020, agc021, agc022, agc023, agc024,
  agc025, agc026, agc027];
var agCircuit = new L.Polyline(pointList, {
  color: "#AFCC66",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
agCircuit.addTo(map);

//Kuat Corridor* [mint polyline]
var kua001 = new L.LatLng(-113.52, 130.09); //Xorth
var kua002 = new L.LatLng(-113.69, 130.61); //near Xorth
var kua003 = new L.LatLng(-113.86, 131.09); //near Debray
var kua004 = new L.LatLng(-114.62, 132.31); //Debray
var kua005 = new L.LatLng(-114.84, 132.77); //near Debray 2
var kua006 = new L.LatLng(-115.05, 133.67); //Fedalle
var kua007 = new L.LatLng(-115.39, 136.36); //near Kuat
var kua008 = new L.LatLng(-115.46, 136.71); //Kuat
var kua009 = new L.LatLng(-115.59, 136.88); //Balmorra
var kua010 = new L.LatLng(-116.77, 137.49); //near Balmorra
var kua011 = new L.LatLng(-116.88, 137.58); //near Balmorra 2
var kua012 = new L.LatLng(-116.99, 137.75); //near Balmorra 3
var kua013 = new L.LatLng(-117.38, 138.58); //near Balmorra 4
var kua014 = new L.LatLng(-117.53, 138.79); //near Balmorra 5
var kua015 = new L.LatLng(-117.80, 139.22); //near Commenor
var kua016 = new L.LatLng(-117.94, 139.52); //near Commenor 2
var kua017 = new L.LatLng(-118.03, 139.88); //Commenor
var kua018 = new L.LatLng(-118.15, 140.20); //near Commenor 3
var kua019 = new L.LatLng(-119.37, 142.16); //near Commenor 4
var kua020 = new L.LatLng(-119.52, 142.49); //near Commenor 3
var kua021 = new L.LatLng(-120.19, 144.13); //Fadden
var kua022 = new L.LatLng(-120.76, 145.17); //near Manaan
var kua022 = new L.LatLng(-120.89, 145.28); //near Manaan 2
var kua023 = new L.LatLng(-121.03, 145.41); //Manaan

var pointList = [kua001, kua002, kua003, kua004, kua005, kua006, kua007, kua008, kua009, kua010, kua011, kua012, kua013, kua014, kua015, kua016, kua017, kua018, kua019, kua020, kua021, kua022, kua023];
var kuatCorridor = new L.Polyline(pointList, {
  color: "#BEE9CB",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
kuatCorridor.addTo(map);

//Leisure Corridor (path conjectural) [pale yellow polyline]
var lei001 = new L.LatLng(-112.47, 124.77); //Kaikielius
var lei002 = new L.LatLng(-112.59, 124.90); //near Kaikielius
var lei003 = new L.LatLng(-112.71, 124.95); //near Coruscul
var lei004 = new L.LatLng(-112.82, 125.00); //Coruscul
var lei005 = new L.LatLng(-113.18, 124.84); //Jerrilek
var lei006 = new L.LatLng(-113.13, 124.89); //near Jerrilek
var lei007 = new L.LatLng(-113.06, 125.10); //near Spira
var lei008 = new L.LatLng(-113.03, 125.39); //Spira
var lei009 = new L.LatLng(-112.98, 125.51); //near Spira 2
var lei010 = new L.LatLng(-112.80, 125.86); //near Spira 4
var lei011 = new L.LatLng(-112.64, 125.99); //near Spira 5
var lei012 = new L.LatLng(-112.54, 126.21); //near Spira 6
var lei013 = new L.LatLng(-112.37, 126.26); //near Spira 7
var lei014 = new L.LatLng(-112.26, 126.27); //near Spira 8
var lei015 = new L.LatLng(-112.20, 126.33); //near Spira 9
var lei016 = new L.LatLng(-112.08, 126.59); //near Spira 10
var lei017 = new L.LatLng(-112.08, 126.68); //near Spira 11
var lei018 = new L.LatLng(-111.95, 127.09); //Ixtlar
var lei019 = new L.LatLng(-112.44, 127.30); //near Ixtlar
var lei020 = new L.LatLng(-112.52, 127.38); //near Ixtlar 2
var lei021 = new L.LatLng(-112.58, 127.52); //near Ixtlar 3
var lei022 = new L.LatLng(-112.77, 127.77); //near Ixtlar 4
var lei023 = new L.LatLng(-112.94, 127.77); //near Ixtlar 5
var lei024 = new L.LatLng(-113.63, 128.12); //Galdronia
var lei025 = new L.LatLng(-113.30, 128.23); //near Galdronia
var lei026 = new L.LatLng(-113.22, 128.27); //near Galdronia 2
var lei027 = new L.LatLng(-113.20, 128.37); //near Galdronia 3
var lei028 = new L.LatLng(-113.14, 128.43); //near Galdronia 4
var lei029 = new L.LatLng(-113.08, 128.46); //near Galdronia 5
var lei030 = new L.LatLng(-113.05, 128.68); //near Galdronia 6
var lei031 = new L.LatLng(-113.02, 129.30); //Kailor
var lei032 = new L.LatLng(-113.23, 129.37); //near Kailor
var lei033 = new L.LatLng(-113.62, 129.63); //near Kailor 2
var lei034 = new L.LatLng(-113.63, 129.70); //near Kailor 3
var lei035 = new L.LatLng(-113.61, 129.76); //near Kailor 4
var lei036 = new L.LatLng(-113.64, 129.82); //near Kailor 5
var lei037 = new L.LatLng(-113.89, 129.91); //near Kailor 6
var lei038 = new L.LatLng(-113.93, 129.99); //near Kailor 7
var lei039 = new L.LatLng(-113.98, 130.21); //near Kailor 8
var lei040 = new L.LatLng(-113.99, 130.35); //near Kailor 9
var lei041 = new L.LatLng(-113.95, 130.40); //near Kailor 10
var lei042 = new L.LatLng(-114.06, 130.55); //near Kailor 11
var lei043 = new L.LatLng(-114.11, 130.67); //near Kailor 12
var lei044 = new L.LatLng(-114.10, 130.80); //near Kailor 13
var lei045 = new L.LatLng(-114.00, 130.95); //near Kailor 14
var lei046 = new L.LatLng(-113.83, 131.20); //near Kailor 15
var lei047 = new L.LatLng(-113.73, 131.45); //Jumeria
var lei048 = new L.LatLng(-113.42, 132.07); //Trantor
var lei049 = new L.LatLng(-113.38, 132.63); //near Trantor
var lei050 = new L.LatLng(-113.36, 132.82); //near Trantor 2
var lei051 = new L.LatLng(-113.31, 132.91); //near Trantor 3
var lei052 = new L.LatLng(-113.15, 133.05); //near Trantor 4
var lei053 = new L.LatLng(-113.13, 133.14); //near Trantor 5
var lei054 = new L.LatLng(-113.07, 133.20); //near Trantor 6
var lei055 = new L.LatLng(-113.05, 133.27); //near Trantor 7
var lei056 = new L.LatLng(-113.07, 133.40); //near Trantor 8
var lei057 = new L.LatLng(-113.15, 133.56); //near Tyed Kant
var lei058 = new L.LatLng(-113.19, 133.76); //near Tyed Kant 2
var lei059 = new L.LatLng(-113.17, 134.21); //Tyed Kant
var lei060 = new L.LatLng(-113.51, 134.63); //near Tyed Kant 3
var lei061 = new L.LatLng(-113.62, 134.68); //near Tyed Kant 4
var lei062 = new L.LatLng(-114.45, 134.70); //near Tyed Kant 5
var lei063 = new L.LatLng(-114.60, 134.65); //near Tyed Kant 6
var lei064 = new L.LatLng(-114.70, 134.69); //near Tyed Kant 7
var lei065 = new L.LatLng(-114.74, 134.74); //near Tyed Kant 8
var lei066 = new L.LatLng(-114.88, 134.83); //near Tyed Kant 9
var lei067 = new L.LatLng(-115.20, 134.93); //Lespectus

var pointList = [lei001, lei002, lei003, lei004, lei005, lei006, lei007, lei008, lei009, lei010, lei011, lei012, lei013, lei014, lei015, lei016, lei017, lei018, lei019, lei020, lei021, lei022, lei023, lei024,
  lei025, lei026, lei027, lei028, lei029, lei030, lei031, lei032, lei033, lei034, lei035, lei036, lei037, lei038, lei039, lei040, lei041, lei042, lei043, lei044, lei045, lei046, lei047, lei048, lei049, lei050,
  lei051, lei052, lei053, lei054, lei055, lei056, lei057, lei058, lei059, lei060, lei061, lei062, lei063, lei064, lei065, lei066, lei067];
var leisureCorridor = new L.Polyline(pointList, {
  color: "#EEEECD",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
zoom05.addLayer(leisureCorridor);

//Commenor Run [lavender polyline]
var cmn001 = new L.LatLng(-109.40, 128.79); //Brentaal
var cmn002 = new L.LatLng(-109.44, 129.48); //near Brentaal
var cmn003 = new L.LatLng(-109.53, 130.28); //near Erigorm
var cmn004 = new L.LatLng(-109.59, 130.49); //near Erigorm 2
var cmn005 = new L.LatLng(-109.62, 130.55); //Erigorm
var cmn006 = new L.LatLng(-109.75, 130.63); //near Sittana
var cmn007 = new L.LatLng(-109.86, 130.64); //Sittana
var cmn008 = new L.LatLng(-110.12, 130.67); //near Sittana 2
var cmn009 = new L.LatLng(-110.61, 130.59); //Tepasi
var cmn010 = new L.LatLng(-111.04, 131.30); //near Korfo
var cmn011 = new L.LatLng(-111.12, 131.68); //Korfo
var cmn012 = new L.LatLng(-111.18, 132.02); //Caamas
var cmn013 = new L.LatLng(-111.33, 132.68); //near Caamas
var cmn014 = new L.LatLng(-111.43, 132.99); //near Caamas 2
var cmn015 = new L.LatLng(-111.53, 133.16); //near Alderaan
var cmn016 = new L.LatLng(-111.66, 133.22); //near Alderaan 2
var cmn017 = new L.LatLng(-112.05, 133.22); //Alderaan
var cmn018 = new L.LatLng(-112.09, 133.21); //near Alderaan
var cmn019 = new L.LatLng(-112.25, 133.25); //near Alderaan 2
var cmn020 = new L.LatLng(-112.31, 133.27); //near Alderaan 3
var cmn021 = new L.LatLng(-112.45, 133.36); //Jastro
var cmn022 = new L.LatLng(-112.61, 133.48); //near Jastro
var cmn023 = new L.LatLng(-112.82, 133.68); //near Jastro 2
var cmn024 = new L.LatLng(-113.05, 133.94); //near Tyed Kant
var cmn025 = new L.LatLng(-113.17, 134.21); //Tyed Kant
var cmn026 = new L.LatLng(-113.21, 134.31); //near Tyed Kant 2
var cmn027 = new L.LatLng(-113.22, 135.86); //Parkis
var cmn028 = new L.LatLng(-113.27, 137.16); //Kattada
var cmn029 = new L.LatLng(-113.33, 137.39); //near Kattada
var cmn030 = new L.LatLng(-113.41, 137.64); //near Kattada 2
var cmn031 = new L.LatLng(-113.62, 137.94); //near Kattada 3
var cmn032 = new L.LatLng(-113.84, 138.16); //Uquine
var cmn033 = new L.LatLng(-114.42, 138.45); //near Uquine
var cmn034 = new L.LatLng(-114.92, 138.58); //near Tasrin
var cmn035 = new L.LatLng(-115.28, 138.77); //Tasrin
var cmn036 = new L.LatLng(-115.55, 139.05); //near Tasrin
var cmn037 = new L.LatLng(-115.92, 139.25); //near Tasrin 2
var cmn038 = new L.LatLng(-116.93, 139.54); //near Commenor
var cmn039 = new L.LatLng(-117.82, 139.71); //near Commenor 2
var cmn040 = new L.LatLng(-118.03, 139.88); //Commenor

var pointList = [cmn001, cmn002, cmn003, cmn004, cmn005, cmn006, cmn007, cmn008, cmn009, cmn010, cmn011, cmn012, cmn013, cmn014, cmn015, cmn016, cmn017, cmn018, cmn019, cmn020, cmn021, cmn022, cmn023, cmn024,
  cmn025, cmn026, cmn027, cmn028, cmn029, cmn030, cmn031, cmn032, cmn033, cmn034, cmn035, cmn036, cmn037, cmn038, cmn039, cmn040];
var commenorRun = new L.Polyline(pointList, {
  color: "#94A5DB",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
commenorRun.addTo(map);

//Shwuy Exchange [beige polyline]
var shw001 = new L.LatLng(-105.86, 128.28); //Uvuiy Exen
var shw002 = new L.LatLng(-105.30, 127.72); //Dankayo
var shw003 = new L.LatLng(-105.04, 126.23); //Ord Antalaha
var shw004 = new L.LatLng(-104.90, 125.73); //near Setor
var shw005 = new L.LatLng(-104.85, 124.87); //near Setor 2
var shw006 = new L.LatLng(-104.88, 124.57); //near Caursito
var shw007 = new L.LatLng(-104.95, 123.58); //near Caursito 2
var shw008 = new L.LatLng(-105.09, 122.77); //near Noquivzor
var shw009 = new L.LatLng(-105.20, 121.82); //Noquivzor
var shw010 = new L.LatLng(-105.18, 121.58); //near Noquivzor 2
var shw011 = new L.LatLng(-105.18, 121.24); //near Noquivzor 3
var shw012 = new L.LatLng(-105.21, 120.90); //near Palanhi
var shw013 = new L.LatLng(-105.32, 120.35); //Palanhi
var shw014 = new L.LatLng(-105.47, 120.05); //Lorimax
var shw015 = new L.LatLng(-105.57, 119.78); //near Lorimax
var shw016 = new L.LatLng(-105.64, 119.47); //near Fakir
var shw017 = new L.LatLng(-105.65, 119.20); //near Fakir 2
var shw018 = new L.LatLng(-105.62, 119.01); //Fakir
var shw019 = new L.LatLng(-105.57, 118.80); //Doneer'so
var shw020 = new L.LatLng(-105.41, 118.59); //Vakkar

var pointList = [shw001, shw002, shw003, shw004, shw005, shw006, shw007, shw008, shw009, shw010, shw011, shw012, shw013, shw014, shw015, shw016, shw017, shw018, shw019, shw020];
var shwuyExchange = new L.Polyline(pointList, {
  color: "#fffac8",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
shwuyExchange.addTo(map);

//Hapan Pass* [mint polyline]
var hpp001 = new L.LatLng(-104.42, 147.77); //Taanab
var hpp002 = new L.LatLng(-104.75, 147.82); //near Taanab
var hpp003 = new L.LatLng(-105.06, 147.84); //near Norulac
var hpp004 = new L.LatLng(-105.26, 147.87); //Norulac
var hpp005 = new L.LatLng(-106.64, 147.88); //near Blacktar Cyst
var hpp006 = new L.LatLng(-107.04, 147.84); //near Blacktar Cyst 2
var hpp007 = new L.LatLng(-107.25, 147.80); //near Blacktar Cyst 3
var hpp008 = new L.LatLng(-107.65, 147.78); //near Orleon
var hpp009 = new L.LatLng(-107.68, 147.79); //near Orleon 2
var hpp010 = new L.LatLng(-107.70, 147.82); //near Orleon 3
var hpp011 = new L.LatLng(-107.71, 147.86); //near Rainboh
var hpp012 = new L.LatLng(-107.69, 147.94); //near Rainboh 2
var hpp013 = new L.LatLng(-107.70, 147.97); //near Rainboh 3
var hpp014 = new L.LatLng(-107.78, 148.03); //near Roqoo Depot
var hpp015 = new L.LatLng(-107.80, 148.04); //near Roqoo Depot 2
var hpp016 = new L.LatLng(-107.85, 148.07); //near Roqoo Depot 3
var hpp017 = new L.LatLng(-107.92, 148.08); //near Shedu Maad
var hpp018 = new L.LatLng(-108.09, 148.06); //near Reboam
var hpp019 = new L.LatLng(-108.12, 148.06); //near Dreena
var hpp020 = new L.LatLng(-108.14, 148.07); //near Dreena 2
var hpp021 = new L.LatLng(-108.18, 148.08); //near Calfa
var hpp022 = new L.LatLng(-108.21, 148.07); //near Calfa 2
var hpp023 = new L.LatLng(-108.25, 148.04); //near Calfa 3
var hpp024 = new L.LatLng(-108.28, 148.00); //near Calfa 4
var hpp025 = new L.LatLng(-108.29, 147.99); //near Calfa 5
var hpp026 = new L.LatLng(-108.33, 147.98); //near Calfa 6
var hpp027 = new L.LatLng(-108.38, 147.98); //near Calfa 7
var hpp028 = new L.LatLng(-108.40, 147.99); //near Calfa 8
var hpp029 = new L.LatLng(-108.41, 148.00); //near Calfa 9
var hpp030 = new L.LatLng(-108.52, 148.20); //near Porus Vida
var hpp031 = new L.LatLng(-108.70, 148.51); //near Porus Vida 2
var hpp032 = new L.LatLng(-108.94, 149.05); //near Porus Vida 3
var hpp033 = new L.LatLng(-109.16, 149.82); //Porus Vida

var pointList = [hpp001, hpp002, hpp003, hpp004, hpp005, hpp006, hpp007, hpp008, hpp009, hpp010, hpp011, hpp012, hpp013, hpp014, hpp015, hpp016, hpp017, hpp018, hpp019, hpp020, hpp021, hpp022, hpp023, hpp024,
  hpp025, hpp026, hpp027, hpp028, hpp029, hpp030, hpp031, hpp032, hpp033];
var hapanPass = new L.Polyline(pointList, {
  color: "#BEE9CB",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
hapanPass.addTo(map);

//Lorell Route [pale yellow polyline]
var lor001 = new L.LatLng(-107.938, 147.629); //Vergill
var lor002 = new L.LatLng(-107.950, 147.627); //near Vergill
var lor003 = new L.LatLng(-107.955, 147.623); //Maires
var lor004 = new L.LatLng(-107.962, 147.620); //near Maires
var lor005 = new L.LatLng(-107.970, 147.622); //near Charubah
var lor006 = new L.LatLng(-107.981, 147.619); //Lovola
var lor007 = new L.LatLng(-107.995, 147.611); //unknown world 0.6.1 / 9.5.4 (1)
var lor008 = new L.LatLng(-108.009, 147.599); //near unknown world 0.6.1 / 9.5.4 (2)
var lor009 = new L.LatLng(-108.012, 147.599); //unknown world 0.6.1 / 9.5.4 (2)
var lor010 = new L.LatLng(-108.019, 147.602); //near Ket
var lor011 = new L.LatLng(-108.027, 147.603); //Ket
var lor012 = new L.LatLng(-108.032, 147.600); //near Ket 2
var lor013 = new L.LatLng(-108.042, 147.600); //near Daruvvia
var lor014 = new L.LatLng(-108.051, 147.598); //Daruvvia
var lor015 = new L.LatLng(-108.058, 147.599); //near Daruvvia 2
var lor016 = new L.LatLng(-108.061, 147.602); //near unknown world 0.6.1 / 9.5.5 (1)
var lor017 = new L.LatLng(-108.064, 147.603); //unknown world 0.6.1 / 9.5.5 (1)
var lor018 = new L.LatLng(-108.069, 147.599); //near unknown world 0.6.1 / 9.5.5 (1) 2
var lor019 = new L.LatLng(-108.078, 147.586); //near Sennex
var lor020 = new L.LatLng(-108.085, 147.582); //Sennex
var lor021 = new L.LatLng(-108.098, 147.576); //near Sennex
var lor022 = new L.LatLng(-108.109, 147.576); //near Andalia
var lor023 = new L.LatLng(-108.119, 147.574); //Andalia
var lor024 = new L.LatLng(-108.130, 147.562); //near Andalia 2
var lor025 = new L.LatLng(-108.176, 147.521); //near Lorell
var lor026 = new L.LatLng(-108.208, 147.502); //near Lorell 2
var lor027 = new L.LatLng(-108.243, 147.497); //Lorell
var lor028 = new L.LatLng(-108.261, 147.503); //near Lorell 3
var lor029 = new L.LatLng(-108.277, 147.521); //near Lorell 4
var lor030 = new L.LatLng(-108.289, 147.575); //near Telkur Sta.
var lor031 = new L.LatLng(-108.304, 147.627); //near Chosper
var lor032 = new L.LatLng(-108.325, 147.676); //near Chosper 2
var lor033 = new L.LatLng(-108.339, 147.717); //near Chosper 3
var lor034 = new L.LatLng(-108.355, 147.755); //near Chosper 4
var lor035 = new L.LatLng(-108.359, 147.781); //near Chosper 5
var lor036 = new L.LatLng(-108.354, 147.899); //near Chosper 6
var lor037 = new L.LatLng(-108.356, 147.948); //near Chosper 7
var lor038 = new L.LatLng(-108.365, 147.980); //Hapan Route

var pointList = [lor001, lor002, lor003, lor004, lor005, lor006, lor007, lor008, lor009, lor010, lor011, lor012, lor013, lor014, lor015, lor016, lor017, lor018, lor019, lor020, lor021, lor022, lor023, lor024,
  lor025, lor026, lor027, lor028, lor029, lor030, lor031, lor032, lor033, lor034, lor035, lor036, lor037, lor038];
var lorellRoute = new L.Polyline(pointList, {
  color: "#EEEECD",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
}); zoom06.addLayer(lorellRoute);

//Rynmar Trail [orange polyline]
var ryt001 = new L.LatLng(-107.876, 147.853); //Rynmar
var ryt002 = new L.LatLng(-107.875, 147.846); //near Rynmar
var ryt003 = new L.LatLng(-107.867, 147.836); //near Rynmar 2
var ryt004 = new L.LatLng(-107.868, 147.828); //near Rynmar 3
var ryt005 = new L.LatLng(-107.873, 147.822); //unknown world 0.6.5 / 9.5.2 (1)
var ryt006 = new L.LatLng(-107.893, 147.813); //near Rynmar 5
var ryt007 = new L.LatLng(-107.911, 147.794); //unknown world 0.6.4 / 9.5.3 (1)
var ryt008 = new L.LatLng(-107.914, 147.780); //unknown world 0.6.4 / 9.5.3 (2)
var ryt009 = new L.LatLng(-107.910, 147.767); //Febrini
var ryt010 = new L.LatLng(-107.911, 147.760); //near Febrini
var ryt011 = new L.LatLng(-107.916, 147.744); //unknown world 0.6.3 / 9.5.3 (1)
var ryt012 = new L.LatLng(-107.915, 147.735); //near unknown world 0.6.3 / 9.5.3 (1)
var ryt013 = new L.LatLng(-107.916, 147.729); //unknown world 0.6.3 / 9.5.3 (2)
var ryt014 = new L.LatLng(-107.914, 147.714); //unknown world 0.6.3 / 9.5.3 (3)
var ryt015 = new L.LatLng(-107.910, 147.703); //near Sargon
var ryt016 = new L.LatLng(-107.906, 147.699); //near Sargon 2
var ryt017 = new L.LatLng(-107.907, 147.684); //near Sargon 3
var ryt018 = new L.LatLng(-107.915, 147.674); //unknown world 0.6.2 / 9.5.3 (1)
var ryt019 = new L.LatLng(-107.928, 147.656); //near Modus
var ryt020 = new L.LatLng(-107.929, 147.651); //Modus
var ryt021 = new L.LatLng(-107.933, 147.644); //near Modus 2
var ryt022 = new L.LatLng(-107.935, 147.634); //near Vergill
var ryt023 = new L.LatLng(-107.938, 147.629); //Vergill

var pointList = [ryt001, ryt002, ryt003, ryt004, ryt005, ryt006, ryt007, ryt008, ryt009, ryt010, ryt011, ryt012, ryt013, ryt014, ryt015, ryt016, ryt017, ryt018, ryt019, ryt020, ryt021, ryt022, ryt023];
var rynmarTrail = new L.Polyline(pointList, {
  color: "#F58231",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
}); zoom07.addLayer(rynmarTrail);

//Rynmar Exchange* [lavender polyline]
var rye001 = new L.LatLng(-107.876, 147.853); //Rynmar
var rye002 = new L.LatLng(-107.870, 147.855); //near Rynmar
var rye003 = new L.LatLng(-107.863, 147.856); //near Erigorm

var pointList = [rye001, rye002, rye003];
var rynmarExchange = new L.Polyline(pointList, {
  color: "#94A5DB",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
rynmarExchange.addTo(map);

//Rainboh Road* [beige polyline]
var rai001 = new L.LatLng(-107.859, 147.889); //Rainboh
var rai002 = new L.LatLng(-107.862, 147.884); //near Rainboh
var rai003 = new L.LatLng(-107.865, 147.882); //near unknown world 0.6.6 / 9.5.2 (1)
var rai004 = new L.LatLng(-107.866, 147.879); //unknown world 0.6.6 / 9.5.2 (1)
var rai005 = new L.LatLng(-107.867, 147.870); //unknown world 0.6.5 / 9.5.2 (1)
var rai006 = new L.LatLng(-107.866, 147.864); //near unknown world 0.6.5 / 9.5.2 (1)
var rai007 = new L.LatLng(-107.863, 147.856); //unknown world 0.6.5 / 9.5.2 (2)
var rai008 = new L.LatLng(-107.853, 147.846); //near unknown world 0.6.5 / 9.5.2 (2)
var rai009 = new L.LatLng(-107.850, 147.842); //unknown world 0.6.5 / 9.5.2 (3)
var rai010 = new L.LatLng(-107.848, 147.832); //unknown world 0.6.5 / 9.5.2 (4)

var pointList = [rai001, rai002, rai003, rai004, rai005, rai006, rai007, rai008, rai009, rai010];
var rainbohRoad = new L.Polyline(pointList, {
  color: "#fffac8",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
rainbohRoad.addTo(map);

//Mandalorian Road [green polyline]
var mnd001 = new L.LatLng(-96.43, 137.17); //Corsin
var mnd002 = new L.LatLng(-96.58, 137.83); //Plooriod
var mnd003 = new L.LatLng(-96.65, 138.61); //near Plooriod
var mnd004 = new L.LatLng(-96.66, 138.87); //near Plooriod 2
var mnd005 = new L.LatLng(-96.56, 139.98); //near Ploo
var mnd006 = new L.LatLng(-96.51, 140.19); //near Ploo 2
var mnd007 = new L.LatLng(-96.45, 140.26); //Ploo
var mnd008 = new L.LatLng(-96.32, 140.34); //near Ploo 3
var mnd009 = new L.LatLng(-95.85, 140.38); //near Ploo 4
var mnd010 = new L.LatLng(-95.52, 140.45); //near Vulta
var mnd011 = new L.LatLng(-95.34, 140.53); //Vulta
var mnd012 = new L.LatLng(-94.66, 141.17); //Ferros
var mnd013 = new L.LatLng(-94.05, 141.80); //Jebble
var mnd014 = new L.LatLng(-92.82, 142.66); //Taris
var mnd015 = new L.LatLng(-92.72, 142.83); //near Taris
var mnd016 = new L.LatLng(-92.00, 144.30); //near Vanquo
var mnd017 = new L.LatLng(-91.74, 145.16); //near Vanquo 2
var mnd018 = new L.LatLng(-91.71, 145.27); //near Vanquo 3
var mnd019 = new L.LatLng(-91.70, 145.36); //Vanquo
var mnd020 = new L.LatLng(-92.13, 145.95); //near Flashpoint
var mnd021 = new L.LatLng(-92.20, 146.02); //Flashpoint
var mnd022 = new L.LatLng(-92.30, 146.13); //near Flashpoint 2
var mnd023 = new L.LatLng(-92.68, 146.88); //near Flashpoint 3
var mnd024 = new L.LatLng(-93.05, 147.54); //near Ordo
var mnd025 = new L.LatLng(-93.28, 147.80); //Ordo
var mnd026 = new L.LatLng(-93.49, 148.02); //near Ordo 2
var mnd027 = new L.LatLng(-94.02, 148.56); //near Mandalore
var mnd028 = new L.LatLng(-93.92, 148.52); //Mandalore

var pointList = [mnd001, mnd002, mnd003, mnd004, mnd005, mnd006, mnd007, mnd008, mnd009, mnd010, mnd011, mnd012, mnd013, mnd014, mnd015, mnd016, mnd017, mnd018, mnd019, mnd020, mnd021, mnd022, mnd023, mnd024,
  mnd025, mnd026, mnd027];
var mandalorianRoad = new L.Polyline(pointList, {
  color: "#3cb44b",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
mandalorianRoad.addTo(map);

//Weyland-Mandalore Hyperroute* [light red polyline]
var wym001 = new L.LatLng(-95.88, 142.72); //Weyland
var wym002 = new L.LatLng(-95.26, 143.10); //near Okyaab
var wym003 = new L.LatLng(-95.14, 143.22); //Okyaab
var wym004 = new L.LatLng(-95.09, 143.31); //near Okyaab 2
var wym005 = new L.LatLng(-94.87, 144.10); //near Okyaab 3
var wym006 = new L.LatLng(-94.63, 144.99); //near Draboon
var wym007 = new L.LatLng(-94.55, 145.16); //Draboon
var wym008 = new L.LatLng(-94.22, 146.67); //near Draboon 2
var wym009 = new L.LatLng(-93.92, 148.52); //Mandalore

var pointList = [wym001, wym002, wym003, wym004, wym005, wym006, wym007, wym008, wym009];
var weylandMandalore = new L.Polyline(pointList, {
  color: "#ff8080",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
weylandMandalore.addTo(map);

//Von-Alai-Mandalore Hyperroute* [beige polyline]
var vom001 = new L.LatLng(-101.75, 149.73); //Von-Alai
var vom002 = new L.LatLng(-101.33, 148.89); //near Von-Alai
var vom003 = new L.LatLng(-100.56, 147.86); //near Farstey
var vom004 = new L.LatLng(-100.20, 147.63); //Thisspias
var vom005 = new L.LatLng(-100.03, 147.69); //near Thisspias
var vom006 = new L.LatLng(-99.95, 147.75); //near Thisspias 2
var vom007 = new L.LatLng(-99.78, 148.19); //near Alpheridies
var vom008 = new L.LatLng(-99.65, 148.34); //Alpheridies
var vom009 = new L.LatLng(-99.30, 148.42); //near Alpheridies
var vom010 = new L.LatLng(-98.75, 148.46); //Fait d'Fait
var vom011 = new L.LatLng(-97.86, 148.50); //near Mes Cavoli
var vom012 = new L.LatLng(-96.18, 148.66); //near Bedlam
var vom013 = new L.LatLng(-94.80, 148.67); //near Jakelia
var vom014 = new L.LatLng(-94.06, 148.55); //near Mandalore

var pointList = [vom001, vom002, vom003, vom004, vom005, vom006, vom007, vom008, vom009, vom010, vom011, vom012, vom013, vom014];
var vonAlaiMandalore = new L.Polyline(pointList, {
  color: "#fffac8",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
vonAlaiMandalore.addTo(map);

//Tertiary Etti Route [lavender polyline]
var ter001 = new L.LatLng(-73.70, 174.44); //Gaurick
var ter002 = new L.LatLng(-73.61, 174.49); //near Gaurick
var ter003 = new L.LatLng(-73.52, 174.54); //near Gaurick 2
var ter004 = new L.LatLng(-73.11, 174.59); //near Issagra
var ter005 = new L.LatLng(-72.36, 174.64); //Ocsin
var ter006 = new L.LatLng(-72.34, 174.65); //near Ocsin
var ter007 = new L.LatLng(-71.94, 174.85); //near Kamar
var ter008 = new L.LatLng(-71.71, 174.87); //near Kamar 2
var ter009 = new L.LatLng(-71.40, 174.84); //near Thandon N.
var ter010 = new L.LatLng(-71.14, 174.71); //near Brosi
var ter011 = new L.LatLng(-71.14, 174.71); //near Farana
var ter012 = new L.LatLng(-70.66, 174.28); //Farana
var ter013 = new L.LatLng(-70.54, 174.16); //near Farana 2
var ter014 = new L.LatLng(-70.34, 174.03); //near Hull's Star
var ter015 = new L.LatLng(-70.13, 173.95); //Hull's Star
var ter016 = new L.LatLng(-69.75, 173.81); //near Hull's Star 2
var ter017 = new L.LatLng(-69.34, 173.66); //near Hull's Star 3
var ter018 = new L.LatLng(-69.10, 173.55); //near Mytus
var ter019 = new L.LatLng(-68.79, 173.38); //near Mytus 2
var ter020 = new L.LatLng(-68.53, 173.15); //near Mytus 3
var ter021 = new L.LatLng(-68.16, 172.69); //Mytus


var pointList = [ter001, ter002, ter003, ter004, ter005, ter006, ter007, ter008, ter009, ter010, ter011, ter012, ter013, ter014, ter015, ter016, ter017, ter018, ter019, ter020, ter021];
var tertiaryEttiRoute = new L.Polyline(pointList, {
  color: "#94A5DB",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
tertiaryEttiRoute.addTo(map);

//Kir-Kamar Hyperlane* [maroon polyline]
var kir001 = new L.LatLng(-72.36, 173.92); //Kir
var kir002 = new L.LatLng(-72.35, 173.98); //near Kir
var kir003 = new L.LatLng(-72.36, 174.02); //near Kir 2
var kir004 = new L.LatLng(-72.42, 174.28); //Deltooine
var kir005 = new L.LatLng(-72.39, 174.55); //Fether
var kir006 = new L.LatLng(-72.36, 174.64); //Ocsin
var kir007 = new L.LatLng(-72.32, 174.77); //Kamar

var pointList = [kir001, kir002, kir003, kir004, kir005, kir006, kir007];
var kirKamarHyperlane = new L.Polyline(pointList, {
  color: "#800000",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
kirKamarHyperlane.addTo(map);

//Hydian Way [red polyline]
var hyd001 = new L.LatLng(-72.45, 173.31); //Bonadan
var hyd002 = new L.LatLng(-72.33, 172.81); //D'ian
var hyd003 = new L.LatLng(-71.99, 171.38); //Lythos
var hyd004 = new L.LatLng(-71.80, 169.94); //Mall'ordian
var hyd005 = new L.LatLng(-71.69, 168.97); //Reltooine
var hyd006 = new L.LatLng(-71.63, 168.06); //Cadomai
var hyd007 = new L.LatLng(-71.63, 167.09); //near Cadomai
var hyd008 = new L.LatLng(-71.66, 165.80); //near Cadomai 2
var hyd009 = new L.LatLng(-71.73, 164.49); //near Oshetti
var hyd010 = new L.LatLng(-71.83, 163.69); //near Ruuria
var hyd011 = new L.LatLng(-72.00, 162.81); //Ruuria
var hyd012 = new L.LatLng(-72.30, 161.89); //near Ruuria 2
var hyd013 = new L.LatLng(-72.55, 161.00); //near Teagan
var hyd014 = new L.LatLng(-72.84, 160.26); //near Teagan 2
var hyd015 = new L.LatLng(-73.08, 159.81); //Teagan
var hyd016 = new L.LatLng(-73.14, 159.70); //Listehol
var hyd017 = new L.LatLng(-73.59, 159.00); //Tantive
var hyd018 = new L.LatLng(-73.91, 158.54); //Doniphon
var hyd019 = new L.LatLng(-74.44, 158.03); //Telos
var hyd020 = new L.LatLng(-77.97, 154.94); //Praadost
var hyd021 = new L.LatLng(-80.80, 152.83); //Pho Ph'eah
var hyd022 = new L.LatLng(-82.86, 151.47); //Toprawa
var hyd023 = new L.LatLng(-86.34, 148.94); //Celanon
var hyd024 = new L.LatLng(-90.70, 145.73); //Bandomeer
var hyd025 = new L.LatLng(-93.25, 142.88); //near Taris
var hyd026 = new L.LatLng(-95.23, 139.52); //Skorrupon
var hyd027 = new L.LatLng(-96.43, 137.17); //Corsin
var hyd028 = new L.LatLng(-97.25, 135.56); //Chennis
var hyd029 = new L.LatLng(-97.63, 134.86); //Adin
var hyd030 = new L.LatLng(-97.83, 134.41); //Draria
var hyd031 = new L.LatLng(-98.25, 133.73); //Viga
var hyd032 = new L.LatLng(-98.61, 133.19); //near Viga
var hyd033 = new L.LatLng(-99.13, 132.56); //Kidriff
var hyd034 = new L.LatLng(-99.52, 132.13); //Nessem
var hyd035 = new L.LatLng(-100.20, 131.45); //Bogden
var hyd036 = new L.LatLng(-100.90, 130.88); //Paqualis
var hyd037 = new L.LatLng(-101.69, 130.35); //Per Lupelo
var hyd038 = new L.LatLng(-102.48, 129.87); //Drearia
var hyd039 = new L.LatLng(-103.22, 129.37); //Champala
var hyd040 = new L.LatLng(-103.56, 129.16); //near Champala
var hyd041 = new L.LatLng(-104.16, 128.86); //Nierport
var hyd042 = new L.LatLng(-104.46, 128.68); //near Nierport
var hyd043 = new L.LatLng(-104.71, 128.61); //near Nierport 2
var hyd044 = new L.LatLng(-105.86, 128.28); //Uvuiy Exen
var hyd045 = new L.LatLng(-106.28, 128.24); //near Coronar
var hyd046 = new L.LatLng(-107.11, 128.21); //Wakeelmui
var hyd047 = new L.LatLng(-107.75, 128.19); //near Tentator
var hyd048 = new L.LatLng(-108.12, 128.21); //near Adamastor
var hyd049 = new L.LatLng(-108.40, 128.30); //near Adamastor 2
var hyd050 = new L.LatLng(-108.80, 128.45); //Bormea
var hyd051 = new L.LatLng(-109.40, 128.79); //Brentaal
var hyd052 = new L.LatLng(-111.19, 130.00); //Skako
var hyd053 = new L.LatLng(-111.92, 130.57); //Nakadia
var hyd054 = new L.LatLng(-113.83, 132.50); //Demophon
var hyd055 = new L.LatLng(-114.35, 133.05); //Glithnos
var hyd056 = new L.LatLng(-115.05, 133.67); //Fedalle
var hyd057 = new L.LatLng(-115.46, 133.90); //Badfellow
var hyd058 = new L.LatLng(-116.58, 134.58); //Talravin
var hyd059 = new L.LatLng(-117.33, 134.98); //Ruul
var hyd060 = new L.LatLng(-118.13, 135.41); //Trellen
var hyd061 = new L.LatLng(-118.91, 135.76); //Mawan
var hyd062 = new L.LatLng(-120.28, 136.31); //Loretto
var hyd063 = new L.LatLng(-126.64, 138.16); //Besnia
var hyd064 = new L.LatLng(-128.63, 138.69); //Aquilae
var hyd065 = new L.LatLng(-132.28, 139.54); //Denon
var hyd066 = new L.LatLng(-138.05, 139.91); //Babbadod
var hyd067 = new L.LatLng(-138.52, 140.06); //near Itani N.
var hyd068 = new L.LatLng(-139.42, 139.94); //Nordra
var hyd069 = new L.LatLng(-144.94, 139.94); //Gacerian
var hyd070 = new L.LatLng(-148.06, 139.66); //Ramordia
var hyd071 = new L.LatLng(-151.47, 139.38); //Arrgaw
var hyd072 = new L.LatLng(-153.47, 138.94); //Tyus Cl.
var hyd073 = new L.LatLng(-156.53, 138.34); //Malastare
var hyd074 = new L.LatLng(-161.03, 136.91); //Darkknell
var hyd075 = new L.LatLng(-162.34, 136.41); //Ord Simres
var hyd076 = new L.LatLng(-165.69, 134.84); //Eriadu
var hyd077 = new L.LatLng(-167.28, 134.06); //near Averam
var hyd078 = new L.LatLng(-170.09, 131.97); //Black Stall Sta.
var hyd079 = new L.LatLng(-172.55, 130.20); //Ogoth Tiir
var hyd080 = new L.LatLng(-176.22, 126.66); //Tosste
var hyd081 = new L.LatLng(-178.06, 125.31); //Rutan
var hyd082 = new L.LatLng(-183.00, 120.00); //Terminus

var pointList = [hyd001, hyd002, hyd003, hyd004, hyd005, hyd006, hyd007, hyd008, hyd009, hyd010, hyd011, hyd012, hyd013, hyd014, hyd015, hyd016, hyd017, hyd018, hyd019, hyd020, hyd021, hyd022, hyd023, hyd024,
  hyd025, hyd026, hyd027, hyd028, hyd029, hyd030, hyd031, hyd032, hyd033, hyd034, hyd035, hyd036, hyd037, hyd038, hyd039, hyd040, hyd041, hyd042, hyd043, hyd044, hyd045, hyd046, hyd047, hyd048, hyd049, hyd050,
  hyd051, hyd052, hyd053, hyd054, hyd055, hyd056, hyd057, hyd058, hyd059, hyd060, hyd061, hyd062, hyd063, hyd064, hyd065, hyd066, hyd067, hyd068, hyd069, hyd070, hyd071, hyd072, hyd073, hyd074, hyd075, hyd076,
  hyd077, hyd078, hyd079, hyd080, hyd081, hyd082];
var hydianWay = new L.Polyline(pointList, {
  color: 'red',
  weight: 4,
  opacity: .9,
  smoothFactor: 1
});
hydianWay.addTo(map);

//Hydian Way [glow outline]
var hyd001 = new L.LatLng(-72.45, 173.31); //Bonadan
var hyd002 = new L.LatLng(-72.33, 172.81); //D'ian
var hyd003 = new L.LatLng(-71.99, 171.38); //Lythos
var hyd004 = new L.LatLng(-71.80, 169.94); //Mall'ordian
var hyd005 = new L.LatLng(-71.69, 168.97); //Reltooine
var hyd006 = new L.LatLng(-71.63, 168.06); //Cadomai
var hyd007 = new L.LatLng(-71.63, 167.09); //near Cadomai
var hyd008 = new L.LatLng(-71.66, 165.80); //near Cadomai 2
var hyd009 = new L.LatLng(-71.73, 164.49); //near Oshetti
var hyd010 = new L.LatLng(-71.83, 163.69); //near Ruuria
var hyd011 = new L.LatLng(-72.00, 162.81); //Ruuria
var hyd012 = new L.LatLng(-72.30, 161.89); //near Ruuria 2
var hyd013 = new L.LatLng(-72.55, 161.00); //near Teagan
var hyd014 = new L.LatLng(-72.84, 160.26); //near Teagan 2
var hyd015 = new L.LatLng(-73.08, 159.81); //Teagan
var hyd016 = new L.LatLng(-73.14, 159.70); //Listehol
var hyd017 = new L.LatLng(-73.59, 159.00); //Tantive
var hyd018 = new L.LatLng(-73.91, 158.54); //Doniphon
var hyd019 = new L.LatLng(-74.44, 158.03); //Telos
var hyd020 = new L.LatLng(-77.97, 154.94); //Praadost
var hyd021 = new L.LatLng(-80.80, 152.83); //Pho Ph'eah
var hyd022 = new L.LatLng(-82.86, 151.47); //Toprawa
var hyd023 = new L.LatLng(-86.34, 148.94); //Celanon
var hyd024 = new L.LatLng(-90.70, 145.73); //Bandomeer
var hyd025 = new L.LatLng(-93.25, 142.88); //near Taris
var hyd026 = new L.LatLng(-95.23, 139.52); //Skorrupon
var hyd027 = new L.LatLng(-96.43, 137.17); //Corsin
var hyd028 = new L.LatLng(-97.25, 135.56); //Chennis
var hyd029 = new L.LatLng(-97.63, 134.86); //Adin
var hyd030 = new L.LatLng(-97.83, 134.41); //Draria
var hyd031 = new L.LatLng(-98.25, 133.73); //Viga
var hyd032 = new L.LatLng(-98.61, 133.19); //near Viga
var hyd033 = new L.LatLng(-99.13, 132.56); //Kidriff
var hyd034 = new L.LatLng(-99.52, 132.13); //Nessem
var hyd035 = new L.LatLng(-100.20, 131.45); //Bogden
var hyd036 = new L.LatLng(-100.90, 130.88); //Paqualis
var hyd037 = new L.LatLng(-101.69, 130.35); //Per Lupelo
var hyd038 = new L.LatLng(-102.48, 129.87); //Drearia
var hyd039 = new L.LatLng(-103.22, 129.37); //Champala
var hyd040 = new L.LatLng(-103.56, 129.16); //near Champala
var hyd041 = new L.LatLng(-104.16, 128.86); //Nierport
var hyd042 = new L.LatLng(-104.46, 128.68); //near Nierport
var hyd043 = new L.LatLng(-104.71, 128.61); //near Nierport 2
var hyd044 = new L.LatLng(-105.86, 128.28); //Uvuiy Exen
var hyd045 = new L.LatLng(-106.28, 128.24); //near Coronar
var hyd046 = new L.LatLng(-107.11, 128.21); //Wakeelmui
var hyd047 = new L.LatLng(-107.75, 128.19); //near Tentator
var hyd048 = new L.LatLng(-108.12, 128.21); //near Adamastor
var hyd049 = new L.LatLng(-108.40, 128.30); //near Adamastor 2
var hyd050 = new L.LatLng(-108.80, 128.45); //Bormea
var hyd051 = new L.LatLng(-109.40, 128.79); //Brentaal
var hyd052 = new L.LatLng(-111.19, 130.00); //Skako
var hyd053 = new L.LatLng(-111.92, 130.57); //Nakadia
var hyd054 = new L.LatLng(-113.83, 132.50); //Demophon
var hyd055 = new L.LatLng(-114.35, 133.05); //Glithnos
var hyd056 = new L.LatLng(-115.05, 133.67); //Fedalle
var hyd057 = new L.LatLng(-115.46, 133.90); //Badfellow
var hyd058 = new L.LatLng(-116.58, 134.58); //Talravin
var hyd059 = new L.LatLng(-117.33, 134.98); //Ruul
var hyd060 = new L.LatLng(-118.13, 135.41); //Trellen
var hyd061 = new L.LatLng(-118.91, 135.76); //Mawan
var hyd062 = new L.LatLng(-120.28, 136.31); //Loretto
var hyd063 = new L.LatLng(-126.64, 138.16); //Besnia
var hyd064 = new L.LatLng(-128.63, 138.69); //Aquilae
var hyd065 = new L.LatLng(-132.28, 139.54); //Denon
var hyd066 = new L.LatLng(-138.05, 139.91); //Babbadod
var hyd067 = new L.LatLng(-138.52, 140.06); //near Itani N.
var hyd068 = new L.LatLng(-139.42, 139.94); //Nordra
var hyd069 = new L.LatLng(-144.94, 139.94); //Gacerian
var hyd070 = new L.LatLng(-148.06, 139.66); //Ramordia
var hyd071 = new L.LatLng(-151.47, 139.38); //Arrgaw
var hyd072 = new L.LatLng(-153.47, 138.94); //Tyus Cl.
var hyd073 = new L.LatLng(-156.53, 138.34); //Malastare
var hyd074 = new L.LatLng(-161.03, 136.91); //Darkknell
var hyd075 = new L.LatLng(-162.34, 136.41); //Ord Simres
var hyd076 = new L.LatLng(-165.69, 134.84); //Eriadu
var hyd077 = new L.LatLng(-167.28, 134.06); //near Averam
var hyd078 = new L.LatLng(-170.09, 131.97); //Black Stall Sta.
var hyd079 = new L.LatLng(-172.55, 130.20); //Ogoth Tiir
var hyd080 = new L.LatLng(-176.22, 126.66); //Tosste
var hyd081 = new L.LatLng(-178.06, 125.31); //Rutan
var hyd082 = new L.LatLng(-183.00, 120.00); //Terminus

var pointList = [hyd001, hyd002, hyd003, hyd004, hyd005, hyd006, hyd007, hyd008, hyd009, hyd010, hyd011, hyd012, hyd013, hyd014, hyd015, hyd016, hyd017, hyd018, hyd019, hyd020, hyd021, hyd022, hyd023, hyd024,
  hyd025, hyd026, hyd027, hyd028, hyd029, hyd030, hyd031, hyd032, hyd033, hyd034, hyd035, hyd036, hyd037, hyd038, hyd039, hyd040, hyd041, hyd042, hyd043, hyd044, hyd045, hyd046, hyd047, hyd048, hyd049, hyd050,
  hyd051, hyd052, hyd053, hyd054, hyd055, hyd056, hyd057, hyd058, hyd059, hyd060, hyd061, hyd062, hyd063, hyd064, hyd065, hyd066, hyd067, hyd068, hyd069, hyd070, hyd071, hyd072, hyd073, hyd074, hyd075, hyd076,
  hyd077, hyd078, hyd079, hyd080, hyd081, hyd082];
var hydianWayGlow = new L.Polyline(pointList, {
  color: 'red',
  weight: 12,
  opacity: 0.3,
  smoothFactor: 1
});
hydianWayGlow.addTo(map);


//Perlemian Trade Route [purple polyline]
var prl001 = new L.LatLng(-111.67, 124.73); //Coruscant
var prl002 = new L.LatLng(-108.19, 130.70); //Delle
var prl003 = new L.LatLng(-106.35, 133.80); //Castell
var prl004 = new L.LatLng(-105.44, 135.67); //Vurdon Ka
var prl005 = new L.LatLng(-104.64, 137.72); //Chazwa
var prl006 = new L.LatLng(-104.13, 139.41); //Relatta
var prl007 = new L.LatLng(-103.80, 140.98); //near Nolar
var prl008 = new L.LatLng(-103.83, 141.83); //Tirahn
var prl009 = new L.LatLng(-104.38, 146.42); //near Avenel
var prl010 = new L.LatLng(-104.41, 147.08); //Avenel
var prl011 = new L.LatLng(-104.42, 147.77); //Taanab
var prl012 = new L.LatLng(-104.41, 148.97); //Sermeria
var prl013 = new L.LatLng(-104.38, 149.31); //Carcel
var prl014 = new L.LatLng(-104.38, 150.13); //Pirin
var prl015 = new L.LatLng(-104.37, 151.25); //near Gizer
var prl016 = new L.LatLng(-104.30, 151.48); //Gizer
var prl017 = new L.LatLng(-103.66, 153.27); //near Lantillies
var prl018 = new L.LatLng(-103.41, 154.06); //near Lantillies 2
var prl019 = new L.LatLng(-103.75, 152.97); //Lantillies
var prl020 = new L.LatLng(-102.80, 156.13); //near Rearqu
var prl021 = new L.LatLng(-102.34, 157.59); //near Pothor
var prl022 = new L.LatLng(-102.05, 158.31); //Jeyell
var prl023 = new L.LatLng(-101.64, 159.31); //Roche
var prl024 = new L.LatLng(-101.14, 160.20); //near Quilan
var prl025 = new L.LatLng(-99.13, 162.48); //Talcene
var prl026 = new L.LatLng(-97.27, 164.41); //near Zuliria
var prl027 = new L.LatLng(-96.25, 165.22); //Abhean
var prl028 = new L.LatLng(-95.44, 165.73); //The Wheel
var prl029 = new L.LatLng(-94.55, 166.45); //Centares
var prl030 = new L.LatLng(-90.36, 168.86); //Columex
var prl031 = new L.LatLng(-87.47, 170.64); //Lianna
var prl032 = new L.LatLng(-85.70, 171.89); //Desevro
var prl033 = new L.LatLng(-83.84, 172.74); //Janodral Mizar
var prl034 = new L.LatLng(-83.59, 172.97); //Ank Ki'Shor
var prl035 = new L.LatLng(-83.11, 173.17); //Estaria
var prl036 = new L.LatLng(-82.39, 173.63); //Makem Te
var prl037 = new L.LatLng(-81.47, 174.30); //Quermia
var prl038 = new L.LatLng(-79.19, 175.83); //near Simus Minor

var pointList = [prl001, prl002, prl003, prl004, prl005, prl006, prl007, prl008, prl009, prl010, prl011, prl012, prl013, prl014, prl015, prl016, prl017, prl018, prl019, prl020, prl021, prl022, prl023, prl024,
  prl025, prl026, prl027, prl028, prl029, prl030, prl031, prl032, prl033, prl034, prl035, prl036, prl037, prl038];
var perlemian = new L.Polyline(pointList, {
  color: "#b09cc8",
  weight: 4,
  opacity: .9,
  smoothFactor: 1
});
perlemian.addTo(map);

//Perlemian Trade Route [glow outline]
var prl001 = new L.LatLng(-111.67, 124.73); //Coruscant
var prl002 = new L.LatLng(-108.19, 130.70); //Delle
var prl003 = new L.LatLng(-106.35, 133.80); //Castell
var prl004 = new L.LatLng(-105.44, 135.67); //Vurdon Ka
var prl005 = new L.LatLng(-104.64, 137.72); //Chazwa
var prl006 = new L.LatLng(-104.13, 139.41); //Relatta
var prl007 = new L.LatLng(-103.80, 140.98); //near Nolar
var prl008 = new L.LatLng(-103.83, 141.83); //Tirahn
var prl009 = new L.LatLng(-104.38, 146.42); //near Avenel
var prl010 = new L.LatLng(-104.41, 147.08); //Avenel
var prl011 = new L.LatLng(-104.42, 147.77); //Taanab
var prl012 = new L.LatLng(-104.41, 148.97); //Sermeria
var prl013 = new L.LatLng(-104.38, 149.31); //Carcel
var prl014 = new L.LatLng(-104.38, 150.13); //Pirin
var prl015 = new L.LatLng(-104.37, 151.25); //near Gizer
var prl016 = new L.LatLng(-104.30, 151.48); //Gizer
var prl017 = new L.LatLng(-103.66, 153.27); //near Lantillies
var prl018 = new L.LatLng(-103.41, 154.06); //near Lantillies 2
var prl019 = new L.LatLng(-103.75, 152.97); //Lantillies
var prl020 = new L.LatLng(-102.80, 156.13); //near Rearqu
var prl021 = new L.LatLng(-102.34, 157.59); //near Pothor
var prl022 = new L.LatLng(-102.05, 158.31); //Jeyell
var prl023 = new L.LatLng(-101.64, 159.31); //Roche
var prl024 = new L.LatLng(-101.14, 160.20); //near Quilan
var prl025 = new L.LatLng(-99.13, 162.48); //Talcene
var prl026 = new L.LatLng(-97.27, 164.41); //near Zuliria
var prl027 = new L.LatLng(-96.25, 165.22); //Abhean
var prl028 = new L.LatLng(-95.44, 165.73); //The Wheel
var prl029 = new L.LatLng(-94.55, 166.45); //Centares
var prl030 = new L.LatLng(-90.36, 168.86); //Columex
var prl031 = new L.LatLng(-87.47, 170.64); //Lianna
var prl032 = new L.LatLng(-85.70, 171.89); //Desevro
var prl033 = new L.LatLng(-83.84, 172.74); //Janodral Mizar
var prl034 = new L.LatLng(-83.59, 172.97); //Ank Ki'Shor
var prl035 = new L.LatLng(-83.11, 173.17); //Estaria
var prl036 = new L.LatLng(-82.39, 173.63); //Makem Te
var prl037 = new L.LatLng(-81.47, 174.30); //Quermia
var prl038 = new L.LatLng(-79.19, 175.83); //near Simus Minor

var pointList = [prl001, prl002, prl003, prl004, prl005, prl006, prl007, prl008, prl009, prl010, prl011, prl012, prl013, prl014, prl015, prl016, prl017, prl018, prl019, prl020, prl021, prl022, prl023, prl024,
  prl025, prl026, prl027, prl028, prl029, prl030, prl031, prl032, prl033, prl034, prl035, prl036, prl037, prl038];
var perlemianGlow = new L.Polyline(pointList, {
  color: "#b09cc8",
  weight: 12,
  opacity: 0.3,
  smoothFactor: 1
});
perlemianGlow.addTo(map);

//Corellian Run [green polyline]
var cru001 = new L.LatLng(-111.67, 124.73); //Coruscant
var cru002 = new L.LatLng(-111.73, 125.85); //near Carlem
var cru003 = new L.LatLng(-111.95, 127.09); //Ixtlar
var cru004 = new L.LatLng(-112.69, 128.77); //Wukkar
var cru005 = new L.LatLng(-113.50, 130.08); //Xorth
var cru006 = new L.LatLng(-114.17, 130.84); //near Xorth
var cru007 = new L.LatLng(-114.82, 131.49); //Refgar
var cru008 = new L.LatLng(-115.52, 132.06); //Vuma
var cru009 = new L.LatLng(-116.58, 132.70); //Bar'leth
var cru010 = new L.LatLng(-117.07, 132.95); //Leria Kerlsil
var cru011 = new L.LatLng(-118.58, 133.51); //Perma
var cru012 = new L.LatLng(-119.31, 133.76); //Lolnar
var cru013 = new L.LatLng(-120.13, 134.04); //near Columus
var cru014 = new L.LatLng(-121.52, 134.42); //Rehemsa
var cru015 = new L.LatLng(-122.24, 134.59); //Sedratis
var cru016 = new L.LatLng(-122.62, 134.68); //near Sedratis
var cru017 = new L.LatLng(-123.08, 134.90); //Rydonni Prime
var cru018 = new L.LatLng(-123.33, 135.14); //near Saberhing
var cru019 = new L.LatLng(-123.86, 135.19); //Corellia
var cru020 = new L.LatLng(-124.36, 135.36); //Nubia
var cru021 = new L.LatLng(-125.63, 135.75); //Tinnel
var cru022 = new L.LatLng(-127.84, 136.66); //Loronar
var cru023 = new L.LatLng(-128.82, 137.15); //Byblos
var cru024 = new L.LatLng(-129.56, 137.62); //Pencael
var cru025 = new L.LatLng(-130.66, 138.37); //Havricus
var cru026 = new L.LatLng(-131.28, 138.75); //Abednedo
var cru027 = new L.LatLng(-131.80, 139.09); //Iseno
var cru028 = new L.LatLng(-132.06, 139.31); //near Denon
var cru029 = new L.LatLng(-132.28, 139.54); //Denon
var cru030 = new L.LatLng(-135.41, 142.97); //Rhommamool / Osarian
var cru031 = new L.LatLng(-137.42, 144.73); //Tlactehon
var cru032 = new L.LatLng(-138.36, 145.48); //Allanteen
var cru033 = new L.LatLng(-142.81, 149.78); //Thaere
var cru034 = new L.LatLng(-146.44, 153.39); //Druckenwell
var cru035 = new L.LatLng(-150.45, 157.00); //Andosha
var cru036 = new L.LatLng(-154.44, 161.00); //Radnor
var cru037 = new L.LatLng(-156.03, 162.41); //Christophsis
var cru038 = new L.LatLng(-156.56, 163.13); //Savareen
var cru039 = new L.LatLng(-160.00, 167.08); //Dalchon
var cru040 = new L.LatLng(-161.34, 168.69); //Ryloth
var cru041 = new L.LatLng(-163.42, 171.17); //Wrea
var cru042 = new L.LatLng(-165.61, 175.38); //near Gertafuu

var pointList = [cru001, cru002, cru003, cru004, cru005, cru006, cru007, cru008, cru009, cru010, cru011, cru012, cru013, cru014, cru015, cru016, cru017, cru018, cru019, cru020, cru021, cru022, cru023, cru024,
  cru025, cru026, cru027, cru028, cru029, cru030, cru031, cru032, cru033, cru034, cru035, cru036, cru037, cru038, cru039, cru040, cru041, cru042];
var corellRun = new L.Polyline(pointList, {
  color: "#93e98e",
  weight: 4,
  opacity: .9,
  smoothFactor: 1
});
corellRun.addTo(map);

//Corellian Run [glow outline]
var cru001 = new L.LatLng(-111.67, 124.73); //Coruscant
var cru002 = new L.LatLng(-111.73, 125.85); //near Carlem
var cru003 = new L.LatLng(-111.95, 127.09); //Ixtlar
var cru004 = new L.LatLng(-112.69, 128.77); //Wukkar
var cru005 = new L.LatLng(-113.50, 130.08); //Xorth
var cru006 = new L.LatLng(-114.17, 130.84); //near Xorth
var cru007 = new L.LatLng(-114.82, 131.49); //Refgar
var cru008 = new L.LatLng(-115.52, 132.06); //Vuma
var cru009 = new L.LatLng(-116.58, 132.70); //Bar'leth
var cru010 = new L.LatLng(-117.07, 132.95); //Leria Kerlsil
var cru011 = new L.LatLng(-118.58, 133.51); //Perma
var cru012 = new L.LatLng(-119.31, 133.76); //Lolnar
var cru013 = new L.LatLng(-120.13, 134.04); //near Columus
var cru014 = new L.LatLng(-121.52, 134.42); //Rehemsa
var cru015 = new L.LatLng(-122.24, 134.59); //Sedratis
var cru016 = new L.LatLng(-122.62, 134.68); //near Sedratis
var cru017 = new L.LatLng(-123.08, 134.90); //Rydonni Prime
var cru018 = new L.LatLng(-123.33, 135.14); //near Saberhing
var cru019 = new L.LatLng(-123.86, 135.19); //Corellia
var cru020 = new L.LatLng(-124.36, 135.36); //Nubia
var cru021 = new L.LatLng(-125.63, 135.75); //Tinnel
var cru022 = new L.LatLng(-127.84, 136.66); //Loronar
var cru023 = new L.LatLng(-128.82, 137.15); //Byblos
var cru024 = new L.LatLng(-129.56, 137.62); //Pencael
var cru025 = new L.LatLng(-130.66, 138.37); //Havricus
var cru026 = new L.LatLng(-131.28, 138.75); //Abednedo
var cru027 = new L.LatLng(-131.80, 139.09); //Iseno
var cru028 = new L.LatLng(-132.06, 139.31); //near Denon
var cru029 = new L.LatLng(-132.28, 139.54); //Denon
var cru030 = new L.LatLng(-135.41, 142.97); //Rhommamool / Osarian
var cru031 = new L.LatLng(-137.42, 144.73); //Tlactehon
var cru032 = new L.LatLng(-138.36, 145.48); //Allanteen
var cru033 = new L.LatLng(-142.81, 149.78); //Thaere
var cru034 = new L.LatLng(-146.44, 153.39); //Druckenwell
var cru035 = new L.LatLng(-150.45, 157.00); //Andosha
var cru036 = new L.LatLng(-154.44, 161.00); //Radnor
var cru037 = new L.LatLng(-156.03, 162.41); //Christophsis
var cru038 = new L.LatLng(-156.56, 163.13); //Savareen
var cru039 = new L.LatLng(-160.00, 167.08); //Dalchon
var cru040 = new L.LatLng(-161.34, 168.69); //Ryloth
var cru041 = new L.LatLng(-163.42, 171.17); //Wrea
var cru042 = new L.LatLng(-165.61, 175.38); //near Gertafuu

var pointList = [cru001, cru002, cru003, cru004, cru005, cru006, cru007, cru008, cru009, cru010, cru011, cru012, cru013, cru014, cru015, cru016, cru017, cru018, cru019, cru020, cru021, cru022, cru023, cru024,
  cru025, cru026, cru027, cru028, cru029, cru030, cru031, cru032, cru033, cru034, cru035, cru036, cru037, cru038, cru039, cru040, cru041, cru042];
var corellRunGlow = new L.Polyline(pointList, {
  color: "#93e98e",
  weight: 12,
  opacity: 0.3,
  smoothFactor: 1
});
corellRunGlow.addTo(map);

//Corellian Trade Spine [yellow polyline]
var ctr001 = new L.LatLng(-123.86, 135.19); //Corellia
var ctr002 = new L.LatLng(-124.01, 135.12); //Plympto
var ctr003 = new L.LatLng(-124.14, 135.07); //New Plympto
var ctr004 = new L.LatLng(-124.34, 135.00); //Duro
var ctr005 = new L.LatLng(-124.94, 134.88); //near Zarsteck
var ctr006 = new L.LatLng(-125.42, 134.89); //near Zarsteck 2
var ctr007 = new L.LatLng(-127.47, 135.06); //near Gailea
var ctr008 = new L.LatLng(-127.93, 135.08); //Chasin
var ctr009 = new L.LatLng(-128.28, 135.05); //near Chasin
var ctr010 = new L.LatLng(-128.62, 134.96); //near Arat Fraca
var ctr011 = new L.LatLng(-129.59, 134.55); //Condular
var ctr012 = new L.LatLng(-130.08, 134.35); //Gandeal
var ctr013 = new L.LatLng(-131.86, 133.45); //Belazura
var ctr014 = new L.LatLng(-133.47, 132.84); //Enisca
var ctr015 = new L.LatLng(-134.59, 132.52); //Kelada
var ctr016 = new L.LatLng(-142.13, 130.72); //Mechis
var ctr017 = new L.LatLng(-143.55, 130.27); //Yag'Dhul
var ctr018 = new L.LatLng(-144.48, 130.01); //Harrin
var ctr019 = new L.LatLng(-148.10, 127.82); //Borkyne
var ctr020 = new L.LatLng(-148.32, 127.68); //near KyLessia
var ctr021 = new L.LatLng(-153.51, 122.26); //near Edatha
var ctr022 = new L.LatLng(-156.42, 120.78); //near Boomis Koori
var ctr023 = new L.LatLng(-159.69, 120.03); //near Kaal
var ctr024 = new L.LatLng(-163.66, 119.86); //Quamar
var ctr025 = new L.LatLng(-164.81, 119.25); //Aztubek
var ctr026 = new L.LatLng(-165.31, 119.33); //near High Chunah
var ctr027 = new L.LatLng(-165.84, 118.95); //Kirtarkin
var ctr028 = new L.LatLng(-166.56, 118.88); //Gerrenthum
var ctr029 = new L.LatLng(-166.77, 118.80); //Indellian
var ctr030 = new L.LatLng(-167.73, 119.00); //Ione
var ctr031 = new L.LatLng(-169.18, 119.07); //Orn Kios
var ctr032 = new L.LatLng(-169.53, 118.99); //Ozu
var ctr033 = new L.LatLng(-169.70, 119.29); //near Isde Naha
var ctr034 = new L.LatLng(-170.23, 119.35); //near Togominda
var ctr035 = new L.LatLng(-170.53, 119.55); //near Tamboon
var ctr036 = new L.LatLng(-171.14, 119.20); //near Berrol's Donn
var ctr037 = new L.LatLng(-174.85, 119.34); //Sil'Lume
var ctr038 = new L.LatLng(-177.86, 119.56); //Manpha
var ctr039 = new L.LatLng(-181.48, 119.94); //Katchan
var ctr040 = new L.LatLng(-183.00, 120.00); //Terminus
var ctr041 = new L.LatLng(-186.18, 120.36); //near Terminus

var pointList = [ctr001, ctr002, ctr003, ctr004, ctr005, ctr006, ctr007, ctr008, ctr009, ctr010, ctr011, ctr012, ctr013, ctr014, ctr015, ctr016, ctr017, ctr018, ctr019, ctr020, ctr021, ctr022, ctr023, ctr024,
  ctr025, ctr026, ctr027, ctr028, ctr029, ctr030, ctr031, ctr032, ctr033, ctr034, ctr035, ctr036, ctr037, ctr038, ctr039, ctr040, ctr041];
var corTrade = new L.Polyline(pointList, {
  color: "#FCB001",
  weight: 4,
  opacity: .9,
  smoothFactor: 1
});
corTrade.addTo(map);

//Corellian Trade Spine [glow outline]
var ctr001 = new L.LatLng(-123.86, 135.19); //Corellia
var ctr002 = new L.LatLng(-124.01, 135.12); //Plympto
var ctr003 = new L.LatLng(-124.14, 135.07); //New Plympto
var ctr004 = new L.LatLng(-124.34, 135.00); //Duro
var ctr005 = new L.LatLng(-124.94, 134.88); //near Zarsteck
var ctr006 = new L.LatLng(-125.42, 134.89); //near Zarsteck 2
var ctr007 = new L.LatLng(-127.47, 135.06); //near Gailea
var ctr008 = new L.LatLng(-127.93, 135.08); //Chasin
var ctr009 = new L.LatLng(-128.28, 135.05); //near Chasin
var ctr010 = new L.LatLng(-128.62, 134.96); //near Arat Fraca
var ctr011 = new L.LatLng(-129.59, 134.55); //Condular
var ctr012 = new L.LatLng(-130.08, 134.35); //Gandeal
var ctr013 = new L.LatLng(-131.86, 133.45); //Belazura
var ctr014 = new L.LatLng(-133.47, 132.84); //Enisca
var ctr015 = new L.LatLng(-134.59, 132.52); //Kelada
var ctr016 = new L.LatLng(-142.13, 130.72); //Mechis
var ctr017 = new L.LatLng(-143.55, 130.27); //Yag'Dhul
var ctr018 = new L.LatLng(-144.48, 130.01); //Harrin
var ctr019 = new L.LatLng(-148.10, 127.82); //Borkyne
var ctr020 = new L.LatLng(-148.32, 127.68); //near KyLessia
var ctr021 = new L.LatLng(-153.51, 122.26); //near Edatha
var ctr022 = new L.LatLng(-156.42, 120.78); //near Boomis Koori
var ctr023 = new L.LatLng(-159.69, 120.03); //near Kaal
var ctr024 = new L.LatLng(-163.66, 119.86); //Quamar
var ctr025 = new L.LatLng(-164.81, 119.25); //Aztubek
var ctr026 = new L.LatLng(-165.31, 119.33); //near High Chunah
var ctr027 = new L.LatLng(-165.84, 118.95); //Kirtarkin
var ctr028 = new L.LatLng(-166.56, 118.88); //Gerrenthum
var ctr029 = new L.LatLng(-166.77, 118.80); //Indellian
var ctr030 = new L.LatLng(-167.73, 119.00); //Ione
var ctr031 = new L.LatLng(-169.18, 119.07); //Orn Kios
var ctr032 = new L.LatLng(-169.53, 118.99); //Ozu
var ctr033 = new L.LatLng(-169.70, 119.29); //near Isde Naha
var ctr034 = new L.LatLng(-170.23, 119.35); //near Togominda
var ctr035 = new L.LatLng(-170.53, 119.55); //near Tamboon
var ctr036 = new L.LatLng(-171.14, 119.20); //near Berrol's Donn
var ctr037 = new L.LatLng(-174.85, 119.34); //Sil'Lume
var ctr038 = new L.LatLng(-177.86, 119.56); //Manpha
var ctr039 = new L.LatLng(-181.48, 119.94); //Katchan
var ctr040 = new L.LatLng(-183.00, 120.00); //Terminus
var ctr041 = new L.LatLng(-186.18, 120.36); //near Terminus

var pointList = [ctr001, ctr002, ctr003, ctr004, ctr005, ctr006, ctr007, ctr008, ctr009, ctr010, ctr011, ctr012, ctr013, ctr014, ctr015, ctr016, ctr017, ctr018, ctr019, ctr020, ctr021, ctr022, ctr023, ctr024,
  ctr025, ctr026, ctr027, ctr028, ctr029, ctr030, ctr031, ctr032, ctr033, ctr034, ctr035, ctr036, ctr037, ctr038, ctr039, ctr040, ctr041];
var corTradeGlow = new L.Polyline(pointList, {
  color: "#FCB001",
  weight: 12,
  opacity: 0.3,
  smoothFactor: 1
});
corTradeGlow.addTo(map);

//Rimma Trade Route [blue polyline]
var rtr001 = new L.LatLng(-132.28, 124.47); //Abregado-rae
var rtr002 = new L.LatLng(-134.13, 124.78); //Rimma
var rtr003 = new L.LatLng(-134.81, 124.86); //Giju
var rtr004 = new L.LatLng(-135.94, 125.30); //near Kooda
var rtr005 = new L.LatLng(-137.64, 126.55); //Ghorman
var rtr006 = new L.LatLng(-139.84, 128.34); //near Kedra
var rtr007 = new L.LatLng(-140.72, 129.12); //Thyferra
var rtr008 = new L.LatLng(-141.73, 129.70); //near Tauber
var rtr009 = new L.LatLng(-145.48, 130.95); //Wroona
var rtr010 = new L.LatLng(-151.86, 133.16); //Woostri
var rtr011 = new L.LatLng(-153.07, 133.37); //Daemen
var rtr012 = new L.LatLng(-154.74, 133.77); //Alakatha
var rtr013 = new L.LatLng(-156.89, 134.27); //Vondarc
var rtr014 = new L.LatLng(-157.74, 134.38); //near Nymalia
var rtr015 = new L.LatLng(-160.63, 134.64); //near Tshindral
var rtr016 = new L.LatLng(-167.91, 134.88); //near Rimma 18
var rtr017 = new L.LatLng(-170.27, 135.16); //near Almar Prime
var rtr018 = new L.LatLng(-171.50, 135.06); //Sluis Van
var rtr019 = new L.LatLng(-172.75, 135.01); //Denab
var rtr020 = new L.LatLng(-175.63, 135.20); //Tarabba
var rtr021 = new L.LatLng(-176.59, 135.09); //near Tantra
var rtr022 = new L.LatLng(-178.23, 135.14); //near Osirrag
var rtr023 = new L.LatLng(-181.48, 135.30); //Karideph

var pointList = [rtr001, rtr002, rtr003, rtr004, rtr005, rtr006, rtr007, rtr008, rtr009, rtr010, rtr011, rtr012, rtr013, rtr014, rtr015, rtr016, rtr017, rtr018, rtr019, rtr020, rtr021, rtr022, rtr023];
var rimmaTrRt = new L.Polyline(pointList, {
  color: "#00bfff",
  weight: 4,
  opacity: .9,
  smoothFactor: 1
});
rimmaTrRt.addTo(map);

//Rimma Trade Route [glow outline]
var rtr001 = new L.LatLng(-132.28, 124.47); //Abregado-rae
var rtr002 = new L.LatLng(-134.13, 124.78); //Rimma
var rtr003 = new L.LatLng(-134.81, 124.86); //Giju
var rtr004 = new L.LatLng(-135.94, 125.30); //near Kooda
var rtr005 = new L.LatLng(-137.64, 126.55); //Ghorman
var rtr006 = new L.LatLng(-139.84, 128.34); //near Kedra
var rtr007 = new L.LatLng(-140.72, 129.12); //Thyferra
var rtr008 = new L.LatLng(-141.73, 129.70); //near Tauber
var rtr009 = new L.LatLng(-145.48, 130.95); //Wroona
var rtr010 = new L.LatLng(-151.86, 133.16); //Woostri
var rtr011 = new L.LatLng(-153.07, 133.37); //Daemen
var rtr012 = new L.LatLng(-154.74, 133.77); //Alakatha
var rtr013 = new L.LatLng(-156.89, 134.27); //Vondarc
var rtr014 = new L.LatLng(-157.74, 134.38); //near Nymalia
var rtr015 = new L.LatLng(-160.63, 134.64); //near Tshindral
var rtr016 = new L.LatLng(-167.91, 134.88); //near Rimma 18
var rtr017 = new L.LatLng(-170.27, 135.16); //near Almar Prime
var rtr018 = new L.LatLng(-171.50, 135.06); //Sluis Van
var rtr019 = new L.LatLng(-172.75, 135.01); //Denab
var rtr020 = new L.LatLng(-175.63, 135.20); //Tarabba
var rtr021 = new L.LatLng(-176.59, 135.09); //near Tantra
var rtr022 = new L.LatLng(-178.23, 135.14); //near Osirrag
var rtr023 = new L.LatLng(-181.48, 135.30); //Karideph

var pointList = [rtr001, rtr002, rtr003, rtr004, rtr005, rtr006, rtr007, rtr008, rtr009, rtr010, rtr011, rtr012, rtr013, rtr014, rtr015, rtr016, rtr017, rtr018, rtr019, rtr020, rtr021, rtr022, rtr023];
var rimmaTrRtGlow = new L.Polyline(pointList, {
  color: "#00bfff",
  weight: 12,
  opacity: 0.3,
  smoothFactor: 1
});
rimmaTrRtGlow.addTo(map);

//Sidebar
/*function onEachFeature(feature, layer) {
  layer.on({
    click: function populate() {
      document.getElementById('sidebar').innerHTML = "BLAH BLAH BLAH " + feature.properties.name + "<br>" + feature.properties.description;
    }
  });
}*/


//Keep for possible circleMarker applications
/*var textMarker = L.circleMarker(coords, {
  //icon: L.divIcon({
  radius: '5',
  color: 'black',
  weight: 1,
  fill: true,
  fillColor: 'white',
  className: 'text-below-marker',
  html: "Coruscant2",

  //})
}).addTo(map);*/

//Returns coordinates for Draggable Marker (ends up adding a 'LatLng Marker' popup label to Corulag)
marker.bindPopup('LatLng Marker').openPopup();
marker.on('dragend', function (e) {
  marker.getPopup().setContent(marker.getLatLng().toString()).openOn(map);
});

//Creates "blue pin" marker" that displays borderless tooltip on mouseover (currently above 0,0)
L.marker([23.37, 1.579]).bindTooltip('Look revealing label!').addTo(map);