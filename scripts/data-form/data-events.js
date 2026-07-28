
var selectedType = 'geom-edit-points';

//*************** EVENTS ****************/
if (selectedType === 'geom-edit-roads') {
    points.on('click', function(e) {
      var features = e.layer.feature;
      // Do something with the properties, e.g., display in a popup
      var text = '<h2>'+features.properties.NAME+'</h2><div>'
      if (features.properties.GEOM_TYPE){
        text+= '<p><i>'+ features.properties.GEOM_TYPE + '</i></p>';
      }
      text+= '<p><i>'+ features.properties.ID + '</i></p>';
      if (features.properties.TYPE){
          text+= '<p><b>Type : </b>'+ features.properties.TYPE + '</p>';
      }
      if (features.properties.CLASSE){
        text+= '<p><b>Type classe : </b>'+ features.properties.TYPE_CLASSE + '</p>';
      }
      if (features.properties.PARENT){
        text+= '<p><b>Parent : </b>'+ features.properties.PARENT + '</p>';
      }
      if (features.properties.CONJECTURAL_NAME){
        text+= '<p><b>Conj. Name : </b>'+ features.properties.CONJECTURAL_NAME + '</p>';
      }
      if (features.properties.CONJECTURAL_TYPE){
        text+= '<p><b>Conj. Type : </b>'+ features.properties.CONJECTURAL_TYPE + '</p>';
      }
      text+= '<p><b>Placement cert. Type : </b>'+ features.properties["PLACEMENT_CERT."] + '</p>';
      text+= '<p><b>Placement logic : </b>'+ features.properties.PLACEMENT_LOGIC + '</p>';
      text+='</div>'
      L.popup()
          .setLatLng([features.geometry.coordinates[1],features.geometry.coordinates[0]])
          .setContent(text)
          .openOn(map);
    });
  
  areas.on('click', function(e) {
    var features = e.layer.feature;

    var text = '<h2>'+features.properties.NAME+'</h2><div>'
    if (features.properties.GEOM_TYPE){
      text+= '<p><i>'+ features.properties.GEOM_TYPE + '</i></p>';
    }
    if (features.properties.TYPE){
        text+= '<p><b>Type : </b>'+ features.properties.TYPE + '</p>';
    }
    if (features.properties.CLASSE){
      text+= '<p><b>Type classe : </b>'+ features.properties.TYPE_CLASSE + '</p>';
    }
    if (features.properties.PARENT){
      text+= '<p><b>Parent : </b>'+ features.properties.PARENT + '</p>';
    }
    text+='</div>'
    L.popup()
        .setLatLng(e.latlng)
        .setContent(text)
        .openOn(map);
    });
  
  } else {
    points.on('mouseover'), function(e) {
      var feature = e.layer.feature;
      var tooltip = L.tooltip({
        permanent: false, // Show the tooltip permanently
        direction: 'top', // Position the tooltip above the marker
    })
    .setContent(feature.properties.NAME); // Set the content of the tooltip
  
    this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
    }
  
    areas.on('mouseover'), function(e) {
      var feature = e.layer.feature;
      var tooltip = L.tooltip({
        permanent: false, // Show the tooltip permanently
        direction: 'top', // Position the tooltip above the marker
    })
    .setContent(feature.properties.NAME); // Set the content of the tooltip
  
    this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
    }
  }