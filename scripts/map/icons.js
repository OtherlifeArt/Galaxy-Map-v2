//Icons

const ASTRO_ICONS = {
  'INVISIBLE': {
    //Invisible Icon
    '1': L.icon({
      iconUrl: 'images/planet-shadow.png',
      shadowUrl: 'images/planet-shadow.png',
      iconSize: [10, 10], // size of the icon
      shadowSize: [1, 1], // size of the shadow
      iconAnchor: [5, 0], // point of the icon which will correspond to marker's location
      shadowAnchor: [0, 0], // the same for the shadow
      popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    }),
  },
  'PLANET': {
    //Non-Movie Planet Icons
    'DEFAULT': {
      'DEFAULT': L.icon({
        iconUrl: 'images/planet-blk.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [16, 16], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': L.icon({
        iconUrl: 'images/planetMov-blk.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [18, 18], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
    'CANON': {
      'DEFAULT' : L.icon({
        iconUrl: 'images/planet-grn.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [16, 16], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': L.icon({
        iconUrl: 'images/planetMov-grn.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [18, 18], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
    'LEGENDS': {
      'DEFAULT' : L.icon({
        iconUrl: 'images/planet-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [16, 16], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': L.icon({
        iconUrl: 'images/planetMov-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [18, 18], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
    'CANON_AND_LEGENDS': {
      'DEFAULT' : L.icon({
        iconUrl: 'images/planet-grn-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [16, 16], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': L.icon({
        iconUrl: 'images/planetMov-grn-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [18, 18], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
  },
  "NEBULA": {
    'DEFAULT': {
      'DEFAULT': L.icon({
        iconUrl: 'images/nebula-normal.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [12, 12], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': null,
    },
    'LEGENDS': {
      'DEFAULT': L.icon({
        iconUrl: 'images/nebula-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [16, 16], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': L.icon({
        iconUrl: 'images/nebulaMov-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [18, 18], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
    'CANON': {
      'DEFAULT': L.icon({
        iconUrl: 'images/nebula-grn.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [16, 16], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': L.icon({
        iconUrl: 'images/nebulaMov-grn.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [18, 18], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
    'CANON_AND_LEGENDS': {
      'DEFAULT': L.icon({
        iconUrl: 'images/nebula-grn-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [16, 16], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [8, 8],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': L.icon({
        iconUrl: 'images/nebulaMov-grn-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [18, 18], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
  },
  "STATION": {
    'DEFAULT': {
      'DEFAULT': null,
      'MOVIE': L.icon({
        iconUrl: 'images/statonMov-blk.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [20, 20], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
    'LEGENDS': {
      'DEFAULT': L.icon({
        iconUrl: 'images/staton-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [20, 20], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': L.icon({
        iconUrl: 'images/statonMov-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [20, 20], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
    'CANON': {
      'DEFAULT': L.icon({
        iconUrl: 'images/staton-grn.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [20, 20], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': L.icon({
        iconUrl: 'images/statonMov-grn.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [20, 20], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
    'CANON_AND_LEGENDS': {
      'DEFAULT': L.icon({
        iconUrl: 'images/staton-grn-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [20, 20], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': L.icon({
        iconUrl: 'images/statonMov-grn-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [20, 20], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [10, 10],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
    },
  },
  "PHENOMENA": {
    'DEFAULT': {
      'DEFAULT': L.icon({
        iconUrl: 'images/phenom-normal.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [10, 10], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': null,
    },
    'LEGENDS': {
      'DEFAULT': L.icon({
        iconUrl: 'images/phenom-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [10, 10], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': null,
    },
    'CANON': {
      'DEFAULT': L.icon({
        iconUrl: 'images/phenom-grn.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [10, 10], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': null,
    },
    'CANON_AND_LEGENDS': {
      'DEFAULT': L.icon({
        iconUrl: 'images/phenom-grn-blu.png',
        shadowUrl: 'images/planet-shadow.png',
        iconSize: [10, 10], // size of the icon
        shadowSize: [10, 10], // size of the shadow
        iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
        shadowAnchor: [5, 5],   // the same for the shadow
        popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
      }),
      'MOVIE': null,
    },
  },
};

//Others/Old
// var planetIcon = L.icon({
//   iconUrl: 'images/planet-normal.png',
//   shadowUrl: 'images/planet-shadow.png',
//   iconSize: [10, 10], // size of the icon
//   shadowSize: [10, 10], // size of the shadow
//   iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
//   shadowAnchor: [5, 5],   // the same for the shadow
//   popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
// });

// var planetIcon2 = L.icon({
//   iconUrl: 'images/planet-movie.png',
//   shadowUrl: 'images/planet-shadow.png',
//   iconSize: [14, 14], // size of the icon
//   shadowSize: [10, 10], // size of the shadow
//   iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
//   shadowAnchor: [5, 5],   // the same for the shadow
//   popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
// });

// var statonIcon = L.icon({
//   iconUrl: 'images/staton-normal.png',
//   shadowUrl: 'images/planet-shadow.png',
//   iconSize: [12, 12], // size of the icon
//   shadowSize: [10, 10], // size of the shadow
//   iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
//   shadowAnchor: [5, 5],   // the same for the shadow
//   popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
// });

// var statonIcon2 = L.icon({
//   iconUrl: 'images/staton-movie.png',
//   shadowUrl: 'images/planet-shadow.png',
//   iconSize: [18, 18], // size of the icon
//   shadowSize: [10, 10], // size of the shadow
//   iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
//   shadowAnchor: [5, 5],   // the same for the shadow
//   popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
// });

// var clustrIcon = L.icon({
//   iconUrl: 'images/clustr-normal.png',
//   shadowUrl: 'images/planet-shadow.png',
//   iconSize: [13, 13], // size of the icon
//   shadowSize: [10, 10], // size of the shadow
//   iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
//   shadowAnchor: [5, 5],   // the same for the shadow
//   popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
// });

// var blkhleIcon = L.icon({
//   iconUrl: 'images/blkhle-normal.png',
//   shadowUrl: 'images/planet-shadow.png',
//   iconSize: [10, 10], // size of the icon
//   shadowSize: [10, 10], // size of the shadow
//   iconAnchor: [5, 5],   // point of the icon which will correspond to marker's location
//   shadowAnchor: [5, 5],   // the same for the shadow
//   popupAnchor: [-5, -20] // point from which the popup should open relative to the iconAnchor
// });