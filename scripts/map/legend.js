/**
 * Legend
 */

// Define the legend control
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // White background with 0.8% opacity
    
    let types = [
      ASTRO_ICONS['PLANET']['CANON']['DEFAULT'], // Canon
      ASTRO_ICONS['PLANET']['LEGENDS']['DEFAULT'], // Legends
      ASTRO_ICONS['PLANET']['CANON_AND_LEGENDS']['DEFAULT'], // Canon & Legends
      ASTRO_ICONS['PLANET']['DEFAULT']['DEFAULT'], // Star System
      ASTRO_ICONS['NEBULA']['DEFAULT']['DEFAULT'], // Nebula
      ASTRO_ICONS['CLUSTER']['DEFAULT']['DEFAULT'], // Star Cluster
      ASTRO_ICONS['BLACKHOLE']['DEFAULT']['DEFAULT'], // Back Hole
      ASTRO_ICONS['STATION']['DEFAULT']['MOVIE'], // Artificial object
      ASTRO_ICONS['PHENOMENA']['DEFAULT']['DEFAULT'], // Phenomena
      ASTRO_ICONS['UNKNOWN']['DEFAULT']['DEFAULT'], // Unknown
    ];
    let labels = ["Canon", "Legends", "Canon & Legends","Planet / Moon / Asteroid / Comet / Star / Star System", "Nebula", "Star Cluster", "Back Hole", "Artificial object", "Phenomena", "Unknown"];
    // Loop through all types and generate a label with corresponding color and circle symbol
    for (let i = 0; i < types.length; i++) {
        // Create an icon symbol
        let iconDiv = L.DomUtil.create('div', 'legend-circle');
        let icon = L.DomUtil.create('img', 'legend-icon');
        icon.src = types[i].options.iconUrl;
        
        // Create label text
        let label = L.DomUtil.create('span', 'legend-label');
        label.innerHTML = labels[i];

        div.appendChild(iconDiv);
        iconDiv.appendChild(icon);
        div.appendChild(label);
        div.innerHTML += '<br>';
    }

    return div;
};