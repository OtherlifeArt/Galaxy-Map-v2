
var selectedType = 'geom-edit-points';

//*************** EVENTS ****************/
if (selectedType === 'geom-edit-roads') {
    points.on('click', function(e) {
      var features = e.layer.feature;
        // Do something with the properties, e.g., display in a popup
        var texte = '<h2>'+features.properties.NAME+'</h2><div>'
        if (features.properties.GEOM_TYPE){
          texte+= '<p><i>'+ features.properties.GEOM_TYPE + '</i></p>';
      }
        if (features.properties.TYPE){
            texte+= '<p><b>Type : </b>'+ features.properties.TYPE + '</p>';
        }
        if (features.properties.CLASSE){
          texte+= '<p><b>Type classe : </b>'+ features.properties.TYPE_CLASSE + '</p>';
        }
        if (features.properties.PARENT){
          texte+= '<p><b>Parent : </b>'+ features.properties.PARENT + '</p>';
        }
        texte+='</div>'
      L.popup()
          .setLatLng([features.geometry.coordinates[1],features.geometry.coordinates[0]])
          .setContent(texte)
          .openOn(map);
    });
  
    areas.on('click', function(e) {
      var features = e.layer.feature;
  
        var texte = '<h2>'+features.properties.NAME+'</h2><div>'
        if (features.properties.GEOM_TYPE){
          texte+= '<p><i>'+ features.properties.GEOM_TYPE + '</i></p>';
      }
        if (features.properties.TYPE){
            texte+= '<p><b>Type : </b>'+ features.properties.TYPE + '</p>';
        }
        if (features.properties.CLASSE){
          texte+= '<p><b>Type classe : </b>'+ features.properties.TYPE_CLASSE + '</p>';
        }
        if (features.properties.PARENT){
          texte+= '<p><b>Parent : </b>'+ features.properties.PARENT + '</p>';
        }
        texte+='</div>'
      L.popup()
          .setLatLng(e.latlng)
          .setContent(texte)
          .openOn(map);
    });
  
  } else {
    points.on('mouseover'), function(e) {
      var feature = e.layer.feature;
      var tooltip = L.tooltip({
        permanent: false, // Show the tooltip permanently
        direction: 'top', // Position the tooltip above the marker
    })
    .setContent(features.properties.NAME); // Set the content of the tooltip
  
    this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
    }
  
    areas.on('mouseover'), function(e) {
      var feature = e.layer.feature;
      var tooltip = L.tooltip({
        permanent: false, // Show the tooltip permanently
        direction: 'top', // Position the tooltip above the marker
    })
    .setContent(features.properties.NAME); // Set the content of the tooltip
  
    this.bindTooltip(tooltip).openTooltip(); // Bind and open the tooltip
    }
  }