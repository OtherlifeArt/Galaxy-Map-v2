// Initialize Leaflet Geoman
map.pm.addControls({
    position: 'topleft',
    drawMarker: false,
    drawCircleMarker: false,
    drawCircle: false,
    drawPolyline: false,
    drawPolygon: false,
    drawRectangle: false,
    drawText: false,
    editMode: false,
    dragMode:false,
    cutPolygon:false,
    removalMode:false,
    rotateMode:false
  });

//Choose Leaflet Geoman mode for editing depending on the type of geometry
function updateGeomanControl(event) {
    selectedType = event.target.value;
    
    if (selectedType === 'geom-edit-points') {
        map.pm.addControls({
            dragMode:true,
            editMode:false,
            drawPolyline: false,
            cutPolygon:false,
            removalMode: false})
        points.options.pmIgnore = false
        points.options.snapIgnore = true
        areas.options.pmIgnore = true
        roads.options.pmIgnore = true
    } else if (selectedType === 'geom-edit-roads') {
        map.pm.addControls({
            dragMode:false,
            drawPolyline: true,
            editMode:true,
            cutPolygon:false,
            removalMode: true});
        points.options.pmIgnore = true
        points.options.snapIgnore = false
        areas.options.pmIgnore = true
        roads.options.pmIgnore = false
        roads.options.snapIgnore = false
    } else if (selectedType === 'geom-edit-areas') {
        map.pm.addControls({
            dragMode:false,
            editMode:true,
            cutPolygon:true,
            removalMode: false
        });
        points.options.pmIgnore = true
        points.options.snapIgnore = true,
        areas.options.pmIgnore = false
        roads.options.pmIgnore = true
    } else if (selectedType === 'geom-edit-disabled') {
        map.pm.addControls({
            dragMode:false,
            editMode:false,
            cutPolygon:false,
            drawPolyline: false,
            removalMode: false
        });
        points.options.pmIgnore = true
        points.options.snapIgnore = true,
        areas.options.pmIgnore = true
        roads.options.pmIgnore = true
    }
  }

// Add event listener to radio buttons
var radioButtons = document.querySelectorAll('input[name="geom-edit"]');
radioButtons.forEach(function(radioButton) {
  radioButton.addEventListener('change', updateGeomanControl);
});