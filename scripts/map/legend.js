/**
 * Legend
 */

// Define the legend control
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // White background with 0.8% opacity
    
    var types = ["Planet", "Moon", "Star System", "Artificial object", "Asteroid", "Star",  "Comet",  "Nebula", "Location", "Exotic", "Unknown"];
    var labels = ["Planet / Dwarf Planet / Planet Barycenter", "Moon / Dwarf Moon", "Star System", "Artificial object", "Asteroid Field / Asteroid", "Star / Star Barycenter / Star Cluster", "Comet / Comet Cluster / Cometary Cloud", "Nebula", "Location", "Exotic", "Unknown"];
    // Loop through all types and generate a label with corresponding color and circle symbol
    for (var i = 0; i < types.length; i++) {
        var type = types[i];
        var color = getPointColor(type);

        // Create a circle symbol
        var circle = L.DomUtil.create('div', 'legend-circle');
        circle.style.backgroundColor = color;
        
        // Create label text
        var label = L.DomUtil.create('span', 'legend-label');
        label.innerHTML = labels[i];

        // Append circle and label to the legend div
        div.appendChild(circle);
        div.appendChild(label);
        div.innerHTML += '<br>';
    }

    return div;
};