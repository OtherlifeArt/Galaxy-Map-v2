/**
 * Legend
 */

// Define the legend control
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // White background with 0.8% opacity
    
    let types = [
      [], // Empty line
      // Canon / Legends / Canon & Legends
      [ 
        ASTRO_ICONS['PLANET']['DEFAULT']['DEFAULT'],
        ASTRO_ICONS['PLANET']['CANON']['DEFAULT'],
        ASTRO_ICONS['PLANET']['LEGENDS']['DEFAULT'],
        ASTRO_ICONS['PLANET']['CANON_AND_LEGENDS']['DEFAULT'],
      ],
      [], // Empty line
      // Star System Movie
      [
        ASTRO_ICONS['PLANET']['DEFAULT']['MOVIE'],
        ASTRO_ICONS['PLANET']['CANON']['MOVIE'],
        ASTRO_ICONS['PLANET']['LEGENDS']['MOVIE'],
        ASTRO_ICONS['PLANET']['CANON_AND_LEGENDS']['MOVIE'],
      ],
      // Star System
      [
        ASTRO_ICONS['PLANET']['DEFAULT']['DEFAULT'],
        ASTRO_ICONS['PLANET']['CANON']['DEFAULT'],
        ASTRO_ICONS['PLANET']['LEGENDS']['DEFAULT'],
        ASTRO_ICONS['PLANET']['CANON_AND_LEGENDS']['DEFAULT'],
      ],
      [], // Empty line
      // Nebula Movie
      [
        ASTRO_ICONS['NEBULA']['DEFAULT']['DEFAULT'],
        ASTRO_ICONS['NEBULA']['LEGENDS']['DEFAULT'],
        ASTRO_ICONS['NEBULA']['CANON']['DEFAULT'],
        ASTRO_ICONS['NEBULA']['CANON_AND_LEGENDS']['DEFAULT'],
      ],
      // Nebula
      [
        ASTRO_ICONS['NEBULA']['LEGENDS']['MOVIE'],
        ASTRO_ICONS['NEBULA']['CANON']['MOVIE'],
        ASTRO_ICONS['NEBULA']['CANON_AND_LEGENDS']['MOVIE'],
      ],
      // Star Cluster
      [], // Empty line
      [
        ASTRO_ICONS['CLUSTER']['DEFAULT']['DEFAULT'],
        ASTRO_ICONS['CLUSTER']['CANON']['DEFAULT'],
        ASTRO_ICONS['CLUSTER']['LEGENDS']['DEFAULT'],
        ASTRO_ICONS['CLUSTER']['CANON_AND_LEGENDS']['DEFAULT'],
      ],
      [
        ASTRO_ICONS['CLUSTER']['DEFAULT']['MOVIE'],
        ASTRO_ICONS['CLUSTER']['CANON']['MOVIE'],
        ASTRO_ICONS['CLUSTER']['LEGENDS']['MOVIE'],
        ASTRO_ICONS['CLUSTER']['CANON_AND_LEGENDS']['MOVIE'],
      ],
      // Black Hole
      [], // Empty line
      [
        ASTRO_ICONS['BLACKHOLE']['DEFAULT']['DEFAULT'],
        ASTRO_ICONS['BLACKHOLE']['CANON']['DEFAULT'],
        ASTRO_ICONS['BLACKHOLE']['LEGENDS']['DEFAULT'],
        ASTRO_ICONS['BLACKHOLE']['CANON_AND_LEGENDS']['DEFAULT'],
      ],
      [
        ASTRO_ICONS['BLACKHOLE']['DEFAULT']['MOVIE'],
        ASTRO_ICONS['BLACKHOLE']['CANON']['MOVIE'],
        ASTRO_ICONS['BLACKHOLE']['LEGENDS']['MOVIE'],
        ASTRO_ICONS['BLACKHOLE']['CANON_AND_LEGENDS']['MOVIE'],
      ],
      // Artificial object
      [], // Empty line
      [
        ASTRO_ICONS['STATION']['LEGENDS']['DEFAULT'],
        ASTRO_ICONS['STATION']['CANON']['DEFAULT'],
        ASTRO_ICONS['STATION']['CANON_AND_LEGENDS']['DEFAULT'],
      ],
      [
        ASTRO_ICONS['STATION']['DEFAULT']['MOVIE'],
        ASTRO_ICONS['STATION']['LEGENDS']['MOVIE'],
        ASTRO_ICONS['STATION']['CANON']['MOVIE'],
        ASTRO_ICONS['STATION']['CANON_AND_LEGENDS']['MOVIE'],
      ],
      // Phenomena
      [], // Empty line
      [
        ASTRO_ICONS['PHENOMENA']['DEFAULT']['DEFAULT'],
        ASTRO_ICONS['PHENOMENA']['CANON']['DEFAULT'],
        ASTRO_ICONS['PHENOMENA']['LEGENDS']['DEFAULT'],
        ASTRO_ICONS['PHENOMENA']['CANON_AND_LEGENDS']['DEFAULT'],
      ],
      // [
      //   ASTRO_ICONS['PHENOMENA']['DEFAULT']['MOVIE'],
      //   ASTRO_ICONS['PHENOMENA']['CANON']['MOVIE'],
      //   ASTRO_ICONS['PHENOMENA']['LEGENDS']['MOVIE'],
      //   ASTRO_ICONS['PHENOMENA']['CANON_AND_LEGENDS']['MOVIE'],
      // ],
      // Unknown
      [], // Empty line
      [
        ASTRO_ICONS['UNKNOWN']['DEFAULT']['DEFAULT'],
        ASTRO_ICONS['UNKNOWN']['LEGENDS']['DEFAULT'],
        ASTRO_ICONS['UNKNOWN']['CANON']['DEFAULT'],
        ASTRO_ICONS['UNKNOWN']['CANON_AND_LEGENDS']['DEFAULT'],
      ],
      // [
      //   ASTRO_ICONS['UNKNOWN']['DEFAULT']['MOVIE'],
      //   ASTRO_ICONS['UNKNOWN']['LEGENDS']['MOVIE'],
      //   ASTRO_ICONS['UNKNOWN']['CANON']['MOVIE'],
      //   ASTRO_ICONS['UNKNOWN']['CANON_AND_LEGENDS']['MOVIE'],
      // ],
    ];
    let labels = [
      "<b>Continuity</b>",
      "None, Canon / Legends / Canon & Legends",
      "<b>Planet / Moon / Asteroid / Comet / Star / Star System</b>", "Present in Movies/Series", "Not in Movies/Series",
      "<b>Nebula</b>", "Present in Movies/Series", "Not in Movies/Series",
      "<b>Star Cluster</b>", "Present in Movies/Series", "Not in Movies/Series",
      "<b>Back Hole</b>", "Present in Movies/Series", "Not in Movies/Series",
      "<b>Artificial object</b>",  "Present in Movies/Series", "Not in Movies/Series",
      "<b>Phenomena</b>", "", //"Present in Movies/Series", "Not in Movies/Series",
      "<b>Unknown</b>", "", //"Present in Movies/Series", "Not in Movies/Series",
    ];
    // Loop through all types and generate a label with corresponding color and circle symbol
    for (let i = 0; i < types.length; i++) {
        // Create an icon symbol
        types[i].forEach(iconPicture => {
          let iconSpan = L.DomUtil.create('span', 'legend-circle');
          let icon = L.DomUtil.create('img', 'legend-icon');
          // console.log(iconPicture.options.iconUrl);
          icon.src = iconPicture.options.iconUrl;
          iconSpan.appendChild(icon);
          div.appendChild(iconSpan);
        });
        
        // Create label text
        let legendLine = L.DomUtil.create('span', 'legend-label');
        legendLine.innerHTML = labels[i];

        div.appendChild(legendLine);
        div.innerHTML += '<br>';
    }

    return div;
};