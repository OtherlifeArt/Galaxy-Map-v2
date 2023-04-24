# Galaxy-Map-v2
The most complete dynamic, zoomable map ever compiled of the Star Wars Galaxy (both Canon and Legends).

### Website
- [ ] Create "splash page" for the Galaxy Map and related projects 2023-04-19 
  - [ ] Attribution page

### Map Fixes (Top Priority)
- [x] Identify core performance issues
- [x] Upload map tiles/finish repo setup
- [ ] Extract all data into separate files
- [ ] Make file loading process asynchronous to make the initial loading more responsive
- [ ] Rework zoom layer culling
- [ ] Use Quadtree Plugin to hide planets outside of current viewport bounds
- [ ] Fix scale of map and/or coordinate system to correspond to "Essential Atlas" grid system
- [ ] Write script to translate existing coords to new coord system?
- [ ] Update to a newer version of leaflet
  
### Desired Features (Back End)
- [ ] Create easy data entry system to add new planets/locations
- [ ] Is it feasible to create a graphical entry system for hyperroutes instead of manual point-by-point entry?

### Desired Features (Front End)
- [ ] Determine best license for map (Creative Commons with attribution?)
- [ ] Scrolling sidebar (minimizable?) to display in-depth info about locations
- [ ] Search function
  - [ ] Sidebar search bar (above matching planet info?)
  - [ ] If a match is found, map zooms to topmost level that displays matching location & centers/drops pin (similar to Google Maps?) 
- [ ] Make hyperlanes akin to streets on Google Maps such that routes can be followed or planned
- [ ] Display grid square labels (1,2,3...), (A,B,C...) dynamically, so they are visible even when the map is zoomed in

### At-A-Glance Info to Display about Locations

| TYPE                 | VALUES                                                  | METHOD                 | NOTES                               |
| -------------------- | ------------------------------------------------------- | ---------------------- | ----------------------------------- |
| CANONICITY           | Canon,Legends                                           | Layers (show/hide)     | separate icons no longer needed?    |
| MEDIA TYPE           | live-action,other visual media,non-visual media         | Icon?                  | currently: 3D icon for live-action  |
| LOCATION TYPE        | Star,System,Planet,Moon,Nebula,Blk Hole,Space Sta,Other | Icon?                  |                                     |
| PLACEMENT CERTAINTY  | none,region,grid sq,sector,proximity,exact              | Icon color?            | alternative values: low,medium,high |
| HIGHLIGHTS           | ecumenopoli,tourist,fortress worlds,uninhabited         | Highlight (show/hide)? | bonus feature (low priority)        |

### To Consider
- [ ] Fanmade content
  - [ ] Would fanmade content on a separate layer "taint" the quality of the map, or would it be better to create a completely separate version of the map?
  
### Miscellaneous
- [ ] Pin roadmap to Discord channel?
- [ ] https://github.com/domoritz/leaflet-maskcanvas (high performance plugin which doesn't suit our exact use case, but can be a valuable resource for optimization ideas)
