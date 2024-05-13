# CSV EXPLANATION

Build CSV using referenced columns. Useless column may be left away (example, stars use system coordinates to be localized and thus don't need X,Y and Z columns)

## COLUMN 1 : Astronomical object names
  Object may have several names separated by /  
  **Cannot be empty**

## COLUMN 2 : Canonicity
  **Cannot be empty**

values:
  - **Canon**
  - **Legends**
  - **Canon/Legends**
  - ...

## COLUMN 3 : Astronomical object type
  **Cannot be empty**
  Will be used to choose display type on map (icon, label, search result ...)

values:
  - **Galaxy Cluster**, Macro type : Area, https://en.wikipedia.org/wiki/Galaxy_cluster. A galaxy cluster, or cluster of galaxies, is a structure that consists of anywhere from hundreds to thousands of galaxies that are bound together by gravity with typical masses ranging from 1014–1015 solar masses.
  - **Galaxy Group**, Macro type : Area, https://en.wikipedia.org/wiki/Galaxy_group. A galaxy group or group of galaxies (GrG) is an aggregation of galaxies comprising about 50 or fewer gravitationally bound members, each at least as luminous as the Milky Way (about 1010 times the luminosity of the Sun), collections of galaxies larger than groups that are first-order clustering are called galaxy clusters. The groups and clusters of galaxies can themselves be clustered, into superclusters of galaxies.
  - **Universe**, Macro type : Area, https://starwars.fandom.com/wiki/Known_Universe. The Known Universe, usually shortened to the universe, was the space in which many galaxies—including the Yuuzhan Vong galaxy, the galaxy, and its companion galaxies—developed and existed.
  - **Asteroid Belt**, Macro type : Area, https://starwars.fandom.com/wiki/Asteroid_belt. The asteroid belt is a torus-shaped region in the Solar System, located roughly between the orbits of the planets Jupiter and Mars.
  - **Region**, Macro type : Area, https://starwars.fandom.com/wiki/Category:Regions. A large area of space or land framed by an artificial, conventional boundary.
  - **Sector**, Macro type : Area, https://starwars.fandom.com/wiki/Sector. A sector was an area of space or land framed by an artificial, conventional boundary.
  - **Galaxy**, Macro type : Galaxy, https://starwars.fandom.com/wiki/Galaxy. A galaxy is a gravitationally bound system of stars, stellar remnants, interstellar gas, dust, and dark matter.
  - **Quasar**, Macro type : Galaxy, https://starwars.fandom.com/wiki/Quasar, Macro type : Galaxy, A quasar (also known as a quasi-stellar object, abbreviated QSO) is an extremely luminous active galactic nucleus (AGN), in which a supermassive black hole with mass ranging from millions to billions of times the mass of the Sun is surrounded by a gaseous accretion disk.
  - **Unknown**, Macro type : Unknown. Objects of unknow type
  - **Location**, Macro type : Location. Hyperroute points, or named locations
  - **Exotic**, Macro type : Exotic. Natural exotic objects
  - **Artificial object**, Macro type : Artificial object. Artificial objects like satellites, stations, beacons or navigation buoys
  - **Nebula**, Macro type : Nebula, https://starwars.fandom.com/wiki/Nebula. A nebula (Latin for 'cloud' or 'fog', nebulae, nebulæ or nebulas) is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
  - **Planet**, Macro type : Planet, https://starwars.fandom.com/wiki/Planet. A planet is an astronomical body orbiting a star or stellar remnant that is massive enough to be rounded by its own gravity, is not massive enough to cause thermonuclear fusion, and according to the International Astronomical Union but not all planetary scientists has cleared its neighbouring region of planetesimals.
  - **Dwarf Planet**, Macro type : Planet. A dwarf planet is a planetary-mass object that does not dominate its region of space (as a planet does) and is not a satellite.
  - **Moon**, Macro type : Planet, https://starwars.fandom.com/wiki/Moon. A natural satellite, or moon, is, in the most common usage, an astronomical body that orbits a planet or minor planet (or sometimes another small Solar System body).
  - **Dwarf Moon**, Macro type : Planet. Smaller moon
  - **Asteroid**, Macro type : Planet, https://starwars.fandom.com/wiki/Asteroid. "An asteroid is a minor planet of the inner Solar System."
  - **Comet**, Macro type : Planet, https://starwars.fandom.com/wiki/Comet. A comet is an icy, small Solar System body that, when passing close to the Sun, warms and begins to release gases, a process that is called outgassing.
  - **Star**, Macro type : Star, https://starwars.fandom.com/wiki/Star. A star is an astronomical object consisting of a luminous spheroid of plasma held together by its own gravity. The nearest star to Earth is the Sun.
  - **Star Cluster**, Macro type : Star Cluster, https://starwars.fandom.com/wiki/Star_cluster. Star clusters are large groups of stars.
  - **Star System**, Macro type : Star System, https://starwars.fandom.com/wiki/Star_system. One-star/one central object system/Multiple-stars/multiple central object system.

## COLUMN 4 : Astronomical object type class
  **TODO**

## COLUMN 5 : Capital object
  Object is capital or major within parent scope.  
    *Example : Coruscant is the capital/major planet of Coruscant system*  
    *Example : Coruscant system is the capital/major system of Corusca sector*  

  values :
  - **true**
  - **false** (empty default value)

## COLUMN 6 : Grid location
  Star wars square grid system :
  - A letter for abscissa
  - A number for ordinate

  Separated by "-"  

  *Example : M-11*

## COLUMN 7, 8 and 9 : X, Y, Z coordinates
  Coordinates for "point-like" locations will be used to display object icon, label and search result  
  Coordinates for "area-like" locations will be used to display object label and search results  

  X : Map abscissa  
  Y : Map ordinate  
  Z : Map applicate (for 3D placement)

## COLUMN 10 : Parent object
  Will be used to display parent object hierarchy : planet, system, sectors, region ...
  

## COLUMN 11 : Orbital position
  Orbital position for inner star system display
  

## COLUMN 12 : Object size in light years
  For big objects

## COLUMN 13 : Object size in kilometers
  Size in km for smaller objects

## COLUMN 14 : Wiki urls 
  Comma separated urls

## COLUMN 15 : Environment, may be terrain, or aspect

## COLUMN 16 : Climate
  For atmosphere owned objects

## COLUMN 17 : Atmosphere type
  https://starwars.fandom.com/wiki/Atmosphere

## COLUMN 18 : Native species
  Comma separated

## COLUMN 19 : Immigrated species
  Comma separated

## COLUMN 20 : Placement certitude

## COLUMN 21 : Placement sources

## COLUMN 22 : Notes

## COLUMN 23 : Interesting

## COLUMN 24 : Placement logic

