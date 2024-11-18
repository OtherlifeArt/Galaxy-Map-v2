/******** CONSTANTS **************/
const flyToLocationDuration = {
  areas: 2,
  points: 3,
}

const flyToLocationZoomLevel = {
  // areas: null, // Dynamic for areas
  default: 4,
  starSystemInnerObjects: mapStarSystemMaxZoomLevel + 1,
}

/******** SEARCH CONTROL *********/

var searchLayer = L.layerGroup([points, areas]);

var searchControl = new L.Control.Search({
  layer: searchLayer,
  propertyName: 'NAME',
  initial:false,
  textPlaceholder:"Search an object by name",
  moveToLocation: function(latlng, title, map) {
    if (latlng.layer.options.pane == "areas"){
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      // map.setView(latlng, zoom);
      map.flyTo(latlng, zoom, { // Use flyTo for smooth zooming
        animate: true,
        duration: flyToLocationDuration.areas
      });
    } else {
      // map.setView(latlng, 4);
      let zoom = flyToLocationZoomLevel.default;
      // Get working zoom function of object type
      if(latlng.layer.feature.properties.TYPE.toLowerCase() !== 'star system' && getParentStarSystemCoordinatesIfAstroObjectFeatureIsInAStarSystem(pointData, latlng.layer.feature.properties).length > 0){
        zoom = flyToLocationZoomLevel.starSystemInnerObjects; // Set zoom for inner star system objects
      } 
      map.flyTo(latlng, zoom, { // Use flyTo for smooth zooming
        animate: true,
        duration: flyToLocationDuration.points
      });
    }
  },
  marker:false,
  buildTip: function(text, val) {
    var type_class = val.layer.feature.geometry.type.toLowerCase();
    return '<a href="#" class="'+type_class+'">'+text+'<b> '+val.layer.feature.properties.TYPE+'</b></a>';
  },
});

searchControl.on('search:locationfound', function(e) {
		if (e.layer.feature.geometry.type == 'MultiPolygon'){
      if(!!e.layer.setStyle) {
        e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
      }
    } else if (e.layer.feature.geometry.type == 'Point'){
      if(!!e.layer.setStyle) {
        e.layer.setStyle({fillColor: '#3f0', color: '#0f0', weight:20});
      }
      // Fire popup on search end
      map.once('moveend zoomend', function() {
        e.layer.fire('click'); // Open popup and tooltip on object (I don't know why tooltip opens though)
        e.layer.fire('mouseout'); // Fix : close tooltip
      });
    }
}).on('search:collapsed', function(e) {
  searchLayer.eachLayer(function(layer) {	//restore feature color
    if (typeof layer.resetStyle === "function") { 
      // safe to use the function
      layer.resetStyle();
    }
  });	
});

