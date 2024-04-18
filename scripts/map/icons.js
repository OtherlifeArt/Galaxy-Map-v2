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