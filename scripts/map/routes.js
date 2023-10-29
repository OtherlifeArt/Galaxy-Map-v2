//HYPERLANES (* denotes conjectural name)
//=========================== Y COORD / X COORD ===============
//Tython Trail* [navy polyline]
var tyt001 = new L.LatLng(-114.99, 124.84); //Empress Teta
var tyt002 = new L.LatLng(-115.36, 124.89); //near Empress Teta
var tyt003 = new L.LatLng(-115.60, 124.88); //near Empress Teta 2
var tyt004 = new L.LatLng(-115.80, 124.78); //near Empress Teta 3
var tyt005 = new L.LatLng(-116.06, 124.70); //near Empress Teta 4
var tyt006 = new L.LatLng(-116.23, 124.70); //near Tython 1
var tyt007 = new L.LatLng(-116.47, 124.77); //near Tython 2
var tyt008 = new L.LatLng(-116.81, 124.86); //Tython

var tythonTrailPopup = "<div style='width:130px;height:100%;float:right;padding-left:10px'><a href='https://starwars.fandom.com/wiki/Koros-Tython_hyperlane' target='_blank'><img src='images/t-legends2.png' width='65px'></a><br><br><img src='images/SmLocationImages/SmNoImage.png' alt='Tython trail' width='120px' align='left'/><br><br><br><br><br><br><br><br>Type: Hyperroute<br>Start: Koros Major<br>End: Tython<br><hr></div><p><b>Koros-Tython hyperlane</b></p><br>&emsp;&emsp;A hyperlane ran from Koros Major to Tython in the Deep Core.";
var pointList = [tyt001, tyt002, tyt003, tyt004, tyt005, tyt006, tyt007, tyt008];
var tythonTrail = new L.Polyline(pointList, {
  color: "#262673",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
tythonTrail.bindPopup(tythonTrailPopup, customOptions);
tythonTrail.addTo(map);

//Byss Run [apricot polyline]
var bys001 = new L.LatLng(-114.99, 124.84); //Empress Teta
var bys002 = new L.LatLng(-115.09, 124.73); //near Empress Teta
var bys003 = new L.LatLng(-115.40, 124.45); //near Keeara Major
var bys004 = new L.LatLng(-115.49, 124.21); //Keeara Major
var bys005 = new L.LatLng(-116.06, 122.97); //near Keeara Major 2
var bys006 = new L.LatLng(-116.24, 122.77); //near Prakith
var bys007 = new L.LatLng(-116.50, 122.51); //near Prakith 2
var bys008 = new L.LatLng(-117.49, 121.93); //Prakith
var bys009 = new L.LatLng(-118.02, 120.83); //near Prakith 2
var bys010 = new L.LatLng(-118.19, 120.52); //near Prakith 3
var bys011 = new L.LatLng(-118.45, 120.16); //near Odik
var bys012 = new L.LatLng(-118.71, 119.82); //near Odik 2
var bys013 = new L.LatLng(-118.81, 119.75); //Odik
var bys014 = new L.LatLng(-118.97, 119.70); //near Odik 3
var bys015 = new L.LatLng(-119.18, 119.65); //near Odik 4
var bys016 = new L.LatLng(-119.49, 119.61); //near Odik 5
var bys017 = new L.LatLng(-119.81, 119.59); //near Odik 6
var bys018 = new L.LatLng(-120.80, 119.59); //near Odik 7
var bys019 = new L.LatLng(-120.92, 119.62); //near Odik 8
var bys020 = new L.LatLng(-121.45, 119.85); //near Odik 9
var bys021 = new L.LatLng(-122.02, 120.25); //near Odik 10
var bys022 = new L.LatLng(-123.50, 121.62); //Byss

var pointList = [bys001, bys002, bys003, bys004, bys005, bys006, bys007, bys008, bys009, bys010, bys011, bys012, bys013, bys014, bys015, bys016, bys017, bys018, bys019, bys020, bys021, bys022];
var byssRun = new L.Polyline(pointList, {
  color: "#ffd8b1",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
byssRun.addTo(map);

//Daragon Trail [orange polyline]
var dar001 = new L.LatLng(-114.99, 124.84); //Empress Teta
var dar002 = new L.LatLng(-111.30, 130.08); //near Skako
var dar003 = new L.LatLng(-106.19, 136.13); //Adari
var dar004 = new L.LatLng(-95.15, 149.69); //near Bedlam
var dar005 = new L.LatLng(-89.07, 157.00); //near Altair
var dar006 = new L.LatLng(-83.70, 162.90); //near Jaga's Cluster
var dar007 = new L.LatLng(-81.37, 165.06); //Moraband

var pointList = [dar001, dar002, dar003, dar004, dar005, dar006, dar007];
var daragonTrail = new L.Polyline(pointList, {
  color: "#C98B5E",
  weight: 3,
  opacity: .9,
  dashArray: '10,15',
  lineCap: 'square',
  smoothFactor: 1
});
daragonTrail.addTo(map);

//Empress Teta-Arkania Run (path partly conjectural) [magenta polyline]
var eta001 = new L.LatLng(-114.99, 124.84); //Empress Teta
var eta002 = new L.LatLng(-114.93, 124.65); //near Empress Teta
var eta003 = new L.LatLng(-114.68, 124.55); //near Kuar
var eta004 = new L.LatLng(-114.57, 124.56); //Kuar
var eta005 = new L.LatLng(-114.42, 124.78); //Ronika
var eta006 = new L.LatLng(-112.75, 126.95); //Yulant
var eta007 = new L.LatLng(-111.94, 128.17); //near Yulant
var eta008 = new L.LatLng(-111.55, 128.47); //near Basilisk
var eta009 = new L.LatLng(-111.23, 128.74); //Basilisk
var eta010 = new L.LatLng(-110.54, 129.16); //Tarlandia
var eta011 = new L.LatLng(-107.72, 130.45); //Plavin
var eta012 = new L.LatLng(-105.65, 131.45); //near Arkania
var eta013 = new L.LatLng(-105.11, 131.81); //Arkania

var pointList = [eta001, eta002, eta003, eta004, eta005, eta006, eta007, eta008, eta009, eta010, eta011, eta012, eta013];
var etArkaniaRun = new L.Polyline(pointList, {
  color: "#DCA3D9",
  weight: 3,
  opacity: .9,
  lineCap: 'square',
  smoothFactor: 1
}); zoom05.addLayer(etArkaniaRun);

//Metellos Trade Route [mint polyline]
var met001 = new L.LatLng(-111.67, 124.73); //Coruscant
var met002 = new L.LatLng(-111.57, 124.51); //near Coruscant
var met003 = new L.LatLng(-111.53, 124.27); //near Metellos
var met004 = new L.LatLng(-111.55, 124.05); //Near Metellos 2
var met005 = new L.LatLng(-111.57, 123.90); //Metellos
var met006 = new L.LatLng(-111.70, 123.41); //near Pizkoss
var met007 = new L.LatLng(-111.88, 123.12); //Pizkoss
var met008 = new L.LatLng(-112.13, 122.68); //Norkronia
var met009 = new L.LatLng(-112.50, 122.05); //near Volgax
var met010 = new L.LatLng(-112.91, 121.45); //Worru'du
var met011 = new L.LatLng(-114.03, 120.00); //Cal-Seti
var met012 = new L.LatLng(-114.52, 119.37); //near Cal-Seti
var met013 = new L.LatLng(-115.19, 118.79); //Orooturoo

var pointList = [met001, met002, met003, met004, met005, met006, met007, met008, met009, met010, met011, met012, met013];
var metellosTradeRoute = new L.Polyline(pointList, {
  color: "#AAFFC3",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
metellosTradeRoute.addTo(map);

//Widek Bypass [orange polyline]
var wbp001 = new L.LatLng(-115.19, 118.79); //Orooturoo
var wbp002 = new L.LatLng(-115.14, 118.66); //Wehttam
var wbp003 = new L.LatLng(-115.24, 118.51); //Thobek
var wbp004 = new L.LatLng(-115.37, 118.48); //Galantos
var wbp005 = new L.LatLng(-115.52, 118.48); //Widek

var pointList = [wbp001, wbp002, wbp003, wbp004, wbp005];
var widekBypass = new L.Polyline(pointList, {
  color: "#F58231",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
}); zoom05.addLayer(widekBypass);

//Namadii Corridor [cyan polyline]
var nam001 = new L.LatLng(-111.67, 124.73); //Coruscant
var nam002 = new L.LatLng(-110.89, 124.34); //Tanjay
var nam003 = new L.LatLng(-110.52, 123.91); //Weerden
var nam004 = new L.LatLng(-110.27, 123.93); //near Weerden
var nam005 = new L.LatLng(-109.93, 123.89); //near Weerden 2
var nam006 = new L.LatLng(-109.69, 123.83); //Galvoni
var nam007 = new L.LatLng(-109.42, 123.65); //near Galvoni
var nam008 = new L.LatLng(-109.12, 123.40); //near Coriallis
var nam009 = new L.LatLng(-109.10, 123.35); //Coriallis
var nam010 = new L.LatLng(-108.99, 123.20); //near Coriallis 2
var nam011 = new L.LatLng(-108.87, 122.94); //Twith
var nam012 = new L.LatLng(-108.76, 122.40); //Pantolomin
var nam013 = new L.LatLng(-108.57, 122.44); //near Pantolomin
var nam014 = new L.LatLng(-108.30, 122.48); //near Kamparas
var nam015 = new L.LatLng(-108.09, 122.46); //Kamparas
var nam016 = new L.LatLng(-107.69, 122.00); //Borleias
var nam017 = new L.LatLng(-106.87, 121.56); //Ord Mirit
var nam018 = new L.LatLng(-105.86, 120.79); //Iyuta
var nam019 = new L.LatLng(-105.32, 120.35); //Palanhi
var nam020 = new L.LatLng(-105.21, 120.28); //Tsukkia
var nam021 = new L.LatLng(-104.22, 119.44); //Tharin
var nam022 = new L.LatLng(-103.47, 118.81); //Carratos
var nam023 = new L.LatLng(-103.31, 118.73); //near Carratos
var nam024 = new L.LatLng(-103.08, 118.68); //near Voltare
var nam025 = new L.LatLng(-102.84, 118.67); //Voltare
var nam026 = new L.LatLng(-102.64, 118.63); //near Voltare 2
var nam027 = new L.LatLng(-102.43, 118.56); //Meastrinnar
var nam028 = new L.LatLng(-102.26, 118.46); //near Meastrinnar
var nam029 = new L.LatLng(-102.11, 118.34); //Aphran
var nam030 = new L.LatLng(-101.76, 117.93); //near Aphran
var nam031 = new L.LatLng(-101.43, 117.52); //Bengat
var nam032 = new L.LatLng(-101.14, 116.83); //Bilbringi
var nam033 = new L.LatLng(-100.96, 116.61); //near Bilbringi
var nam034 = new L.LatLng(-100.45, 116.31); //Rondai
var nam035 = new L.LatLng(-100.02, 116.09); //near Rondai
var nam036 = new L.LatLng(-99.69, 115.84); //Coth Fuuras Sta.
var nam037 = new L.LatLng(-99.23, 115.38); //Dorin
var nam038 = new L.LatLng(-97.93, 114.42); //Carvandir
var nam039 = new L.LatLng(-97.48, 113.98); //Jaloria
var nam040 = new L.LatLng(-97.31, 113.87); //Vaced
var nam041 = new L.LatLng(-96.08, 112.89); //Glee Anselm
var nam042 = new L.LatLng(-95.31, 112.50); //Belshar Othacuu
var nam043 = new L.LatLng(-94.56, 112.20); //Ord Varee
var nam044 = new L.LatLng(-93.89, 111.84); //Kalaan
var nam045 = new L.LatLng(-93.09, 111.55); //Masgen
var nam046 = new L.LatLng(-92.09, 111.22); //Ansion
var nam047 = new L.LatLng(-91.77, 111.20); //near Ansion
var nam048 = new L.LatLng(-91.52, 111.18); //near Namadii
var nam049 = new L.LatLng(-91.19, 111.20); //Namadii

var pointList = [nam001, nam002, nam003, nam004, nam005, nam006, nam007, nam008, nam009, nam010, nam011, nam012, nam013, nam014, nam015, nam016, nam017, nam018, nam019, nam020, nam021, nam022, nam023, nam024,
  nam025, nam026, nam027, nam028, nam029, nam030, nam031, nam032, nam033, nam034, nam035, nam036, nam037, nam038, nam039, nam040, nam041, nam042, nam043, nam044, nam045, nam046, nam047, nam048, nam049];

var namadiiCorridor = new L.Polyline(pointList, {
  color: "#42d4f4",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
namadiiCorridor.addTo(map);

//Coruscant-Dantooine Run [green polyline]
var crd001 = new L.LatLng(-102.11, 118.34); //Aphran
var crd002 = new L.LatLng(-102.05, 118.34); //near Aphran
var crd003 = new L.LatLng(-101.94, 118.45); //near Neshtab
var crd004 = new L.LatLng(-101.78, 118.75); //Neshtab
var crd005 = new L.LatLng(-101.52, 118.51); //near Neshtab
var crd006 = new L.LatLng(-101.27, 118.34); //near Neshtab 2
var crd007 = new L.LatLng(-100.59, 117.98); //near Aramal
var crd008 = new L.LatLng(-99.66, 117.51); //Aramal
var crd009 = new L.LatLng(-98.68, 117.09); //Ryborea
var crd010 = new L.LatLng(-98.01, 116.81); //Station88
var crd011 = new L.LatLng(-98.12, 116.61); //Vicondor
var crd012 = new L.LatLng(-97.96, 116.59); //near Vicondor
var crd013 = new L.LatLng(-97.66, 116.48); //Bezim
var crd014 = new L.LatLng(-97.45, 116.37); //near Bezim
var crd015 = new L.LatLng(-97.01, 116.30); //near Bezim 2
var crd016 = new L.LatLng(-96.30, 116.30); //near Darkon
var crd017 = new L.LatLng(-96.08, 116.24); //near Darkon 2
var crd018 = new L.LatLng(-95.85, 116.15); //Darkon
var crd019 = new L.LatLng(-95.23, 115.73); //near Darkon 3
var crd020 = new L.LatLng(-94.84, 115.41); //near Londor
var crd021 = new L.LatLng(-94.54, 115.17); //near Londor 2
var crd022 = new L.LatLng(-94.17, 115.06); //Londor
var crd023 = new L.LatLng(-94.34, 115.51); //near Londor
var crd024 = new L.LatLng(-94.44, 115.88); //near Londor 2
var crd025 = new L.LatLng(-94.44, 116.06); //near Londor 3
var crd026 = new L.LatLng(-94.41, 116.16); //near Londor 4
var crd027 = new L.LatLng(-94.08, 116.76); //near Londor 5
var crd028 = new L.LatLng(-93.98, 116.86); //near Londor 6
var crd029 = new L.LatLng(-93.86, 116.89); //Valrar
var crd030 = new L.LatLng(-93.02, 117.00); //near Valrar
var crd031 = new L.LatLng(-92.50, 117.13); //Iridonia
var crd032 = new L.LatLng(-92.41, 117.14); //near Tangar
var crd033 = new L.LatLng(-92.35, 117.18); //near Tangar 2
var crd034 = new L.LatLng(-92.03, 117.52); //near Tangar 3
var crd035 = new L.LatLng(-91.50, 118.14); //near Tangar 4
var crd036 = new L.LatLng(-90.80, 119.18); //near Tangar 5
var crd037 = new L.LatLng(-89.56, 120.87); //near Tangar 6
var crd038 = new L.LatLng(-88.52, 122.12); //near Tangar 7
var crd039 = new L.LatLng(-88.21, 122.52); //near Tangar 8
var crd040 = new L.LatLng(-88.05, 122.77); //near Tangar 9
var crd041 = new L.LatLng(-87.77, 123.24); //Tangar
var crd042 = new L.LatLng(-87.63, 123.52); //near Tangar 10
var crd043 = new L.LatLng(-87.52, 123.63); //near Tangar 11
var crd044 = new L.LatLng(-87.35, 123.71); //Ord Cantrell
var crd045 = new L.LatLng(-86.58, 124.05); //near Ord Cantrell 2
var crd046 = new L.LatLng(-86.37, 124.20); //near Ord Cantrell 3
var crd047 = new L.LatLng(-85.77, 125.11); //near Ord Cantrell 4
var crd048 = new L.LatLng(-85.53, 125.38); //near Ord Cantrell 5
var crd049 = new L.LatLng(-85.28, 125.54); //near Ord Cantrell 6
var crd050 = new L.LatLng(-84.85, 125.68); //near Ord Cantrell 7
var crd051 = new L.LatLng(-83.96, 125.73); //near Ord Cantrell 8
var crd052 = new L.LatLng(-83.63, 125.70); //near Ord Cantrell 9
var crd053 = new L.LatLng(-83.63, 125.70); //near Ord Cantrell 10
var crd054 = new L.LatLng(-83.38, 125.63); //near Ord Cantrell 11
var crd055 = new L.LatLng(-82.85, 125.38); //near Ord Cantrell 12
var crd056 = new L.LatLng(-82.31, 125.13); //near Ord Cantrell 13
var crd057 = new L.LatLng(-82.24, 125.13); //near Ord Cantrell 14
var crd058 = new L.LatLng(-81.84, 125.22); //near Ord Cantrell 15
var crd059 = new L.LatLng(-81.73, 125.22); //Moltok
var crd060 = new L.LatLng(-81.63, 125.16); //near Moltok
var crd061 = new L.LatLng(-81.16, 124.78); //Ord Biniir
var crd062 = new L.LatLng(-79.45, 123.67); //near Ord Biniir
var crd063 = new L.LatLng(-79.38, 123.63); //near Ord Biniir 2
var crd064 = new L.LatLng(-79.26, 123.59); //near Ord Biniir 3
var crd065 = new L.LatLng(-79.13, 123.60); //near Ord Biniir 4
var crd066 = new L.LatLng(-78.98, 123.72); //near Ord Biniir 5
var crd067 = new L.LatLng(-78.91, 123.88); //near Ord Biniir 6
var crd068 = new L.LatLng(-78.72, 124.88); //near Ord Biniir 7
var crd069 = new L.LatLng(-78.63, 125.25); //near Ord Biniir 8
var crd070 = new L.LatLng(-78.28, 125.79); //Ord Trasi
var crd071 = new L.LatLng(-78.18, 125.90); //near Ord Trasi
var crd072 = new L.LatLng(-78.07, 125.95); //near Ord Trasi 2
var crd073 = new L.LatLng(-77.97, 125.94); //near Ord Trasi 3
var crd074 = new L.LatLng(-77.77, 125.86); //near Ord Trasi 4
var crd075 = new L.LatLng(-77.72, 125.84); //near Ord Trasi 5
var crd076 = new L.LatLng(-77.72, 125.84); //near Ord Trasi 6
var crd077 = new L.LatLng(-77.64, 125.84); //near Ord Trasi 7
var crd078 = new L.LatLng(-77.42, 126.02); //near Ord Trasi 8
var crd079 = new L.LatLng(-77.02, 126.54); //near Ord Trasi 9
var crd080 = new L.LatLng(-76.90, 126.63); //near Ord Trasi 10
var crd081 = new L.LatLng(-76.63, 126.73); //near Ord Trasi 11
var crd082 = new L.LatLng(-76.51, 126.77); //near Ord Trasi 12
var crd083 = new L.LatLng(-76.39, 126.77); //near Ord Trasi 13
var crd084 = new L.LatLng(-76.33, 126.72); //Anx Minor
var crd085 = new L.LatLng(-76.32, 126.57); //near Anx Minor
var crd086 = new L.LatLng(-76.30, 126.52); //near Anx Minor 2
var crd087 = new L.LatLng(-75.94, 126.01); //Sinsang
var crd088 = new L.LatLng(-75.42, 125.33); //near Sinsang
var crd089 = new L.LatLng(-75.21, 124.79); //Dantooine

var pointList = [crd001, crd002, crd003, crd004, crd005, crd006, crd007, crd008, crd009, crd010, crd011, crd012, crd013, crd014, crd015, crd016, crd017, crd018, crd019, crd020, crd021, crd022, crd023, crd024,
  crd025, crd026, crd027, crd028, crd029, crd030, crd031, crd032, crd033, crd034, crd035, crd036, crd037, crd038, crd039, crd040, crd041, crd042, crd043, crd044, crd045, crd046, crd047, crd048, crd049,
  crd050, crd051, crd052, crd053, crd054, crd055, crd056, crd057, crd058, crd059, crd060, crd061, crd062, crd063, crd064, crd065, crd066, crd067, crd068, crd069, crd070, crd071, crd072, crd073, crd074,
  crd075, crd076, crd077, crd078, crd079, crd080, crd081, crd082, crd083, crd084, crd085, crd086, crd087, crd088, crd089];
var coruscantDantooineRun = new L.Polyline(pointList, {
  color: "#3cb44b",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
}); coruscantDantooineRun.addTo(map);

//Vento Run* [maroon polyline]
var vtr001 = new L.LatLng(-113.17, 124.83); //Jerrilek
var vtr002 = new L.LatLng(-113.12, 124.88); //near Jerrilek
var vtr003 = new L.LatLng(-113.05, 125.09); //near Spira
var vtr004 = new L.LatLng(-113.02, 125.38); //Spira
var vtr005 = new L.LatLng(-112.96, 125.50); //near Spira 2
var vtr006 = new L.LatLng(-111.85, 126.52); //near Carlem
var vtr007 = new L.LatLng(-109.86, 128.01); //Vento
var vtr008 = new L.LatLng(-109.75, 128.03); //Corulag

var pointList = [vtr001, vtr002, vtr003, vtr004, vtr005, vtr006, vtr007, vtr008];
var ventoRun = new L.Polyline(pointList, {
  color: "#800000",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
}); zoom05.addLayer(ventoRun);

//Koros Trunk Line* [blue polyline]
var ktl001 = new L.LatLng(-111.67, 124.73); //Coruscant
var ktl002 = new L.LatLng(-112.20, 124.78); //Foerost
var ktl003 = new L.LatLng(-112.47, 124.77); //Kaikielius
var ktl004 = new L.LatLng(-112.65, 124.71); //Ruan
var ktl005 = new L.LatLng(-113.17, 124.83); //Jerrilek
var ktl006 = new L.LatLng(-114.99, 124.84); //Empress Teta

var pointList = [ktl001, ktl002, ktl003, ktl004, ktl005, ktl006];
var korosTrunk = new L.Polyline(pointList, {
  color: "#4363d8",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
korosTrunk.addTo(map);

//Ag Circuit [lime polyline]
var agc001 = new L.LatLng(-114.03, 120.00); //Cal-Seti
var agc002 = new L.LatLng(-113.98, 120.50); //near Cal-Seti
var agc003 = new L.LatLng(-113.86, 120.80); //near Fresia
var agc004 = new L.LatLng(-113.70, 120.89); //Fresia
var agc005 = new L.LatLng(-113.55, 120.93); //near Fresia 2
var agc006 = new L.LatLng(-113.49, 120.98); //near Galand
var agc007 = new L.LatLng(-113.39, 121.20); //Galand
var agc008 = new L.LatLng(-113.16, 121.80); //Tallia
var agc009 = new L.LatLng(-112.96, 122.20); //Alland
var agc010 = new L.LatLng(-112.96, 123.11); //Salliche
var agc011 = new L.LatLng(-112.95, 123.15); //near Salliche
var agc012 = new L.LatLng(-112.63, 123.77); //near Stassia
var agc013 = new L.LatLng(-112.55, 123.98); //Stassia
var agc014 = new L.LatLng(-112.53, 124.09); //near Stassia 2
var agc015 = new L.LatLng(-112.51, 124.33); //near Stassia 3
var agc016 = new L.LatLng(-112.56, 124.57); //near Ruan
var agc017 = new L.LatLng(-112.65, 124.71); //Ruan
var agc018 = new L.LatLng(-112.55, 125.06); //near Ruan 2
var agc019 = new L.LatLng(-112.48, 125.94); //near Yulant 1
var agc020 = new L.LatLng(-112.59, 126.57); //near Yulant 2
var agc021 = new L.LatLng(-112.75, 126.95); //Yulant
var agc022 = new L.LatLng(-112.99, 127.39); //Aargau
var agc023 = new L.LatLng(-113.10, 127.85); //near Aargau
var agc024 = new L.LatLng(-113.18, 128.80); //near Broest
var agc025 = new L.LatLng(-113.29, 129.02); //Broest
var agc026 = new L.LatLng(-113.38, 129.46); //near Xorth
var agc027 = new L.LatLng(-113.52, 130.09); //Xorth

var pointList = [agc001, agc002, agc003, agc004, agc005, agc006, agc007, agc008, agc009, agc010, agc011, agc012, agc013, agc014, agc015, agc016, agc017, agc018, agc019, agc020, agc021, agc022, agc023, agc024,
  agc025, agc026, agc027];
var agCircuit = new L.Polyline(pointList, {
  color: "#AFCC66",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
agCircuit.addTo(map);

//Kuat Corridor* [mint polyline]
var kua001 = new L.LatLng(-113.52, 130.09); //Xorth
var kua002 = new L.LatLng(-113.69, 130.61); //near Xorth
var kua003 = new L.LatLng(-113.86, 131.09); //near Debray
var kua004 = new L.LatLng(-114.62, 132.31); //Debray
var kua005 = new L.LatLng(-114.84, 132.77); //near Debray 2
var kua006 = new L.LatLng(-115.05, 133.67); //Fedalle
var kua007 = new L.LatLng(-115.39, 136.36); //near Kuat
var kua008 = new L.LatLng(-115.46, 136.71); //Kuat
var kua009 = new L.LatLng(-115.59, 136.88); //Balmorra
var kua010 = new L.LatLng(-116.77, 137.49); //near Balmorra
var kua011 = new L.LatLng(-116.88, 137.58); //near Balmorra 2
var kua012 = new L.LatLng(-116.99, 137.75); //near Balmorra 3
var kua013 = new L.LatLng(-117.38, 138.58); //near Balmorra 4
var kua014 = new L.LatLng(-117.53, 138.79); //near Balmorra 5
var kua015 = new L.LatLng(-117.80, 139.22); //near Commenor
var kua016 = new L.LatLng(-117.94, 139.52); //near Commenor 2
var kua017 = new L.LatLng(-118.03, 139.88); //Commenor
var kua018 = new L.LatLng(-118.15, 140.20); //near Commenor 3
var kua019 = new L.LatLng(-119.37, 142.16); //near Commenor 4
var kua020 = new L.LatLng(-119.52, 142.49); //near Commenor 3
var kua021 = new L.LatLng(-120.19, 144.13); //Fadden
var kua022 = new L.LatLng(-120.76, 145.17); //near Manaan
var kua022 = new L.LatLng(-120.89, 145.28); //near Manaan 2
var kua023 = new L.LatLng(-121.03, 145.41); //Manaan

var pointList = [kua001, kua002, kua003, kua004, kua005, kua006, kua007, kua008, kua009, kua010, kua011, kua012, kua013, kua014, kua015, kua016, kua017, kua018, kua019, kua020, kua021, kua022, kua023];
var kuatCorridor = new L.Polyline(pointList, {
  color: "#BEE9CB",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
kuatCorridor.addTo(map);

//Leisure Corridor (path conjectural) [pale yellow polyline]
var lei001 = new L.LatLng(-112.47, 124.77); //Kaikielius
var lei002 = new L.LatLng(-112.59, 124.90); //near Kaikielius
var lei003 = new L.LatLng(-112.71, 124.95); //near Coruscul
var lei004 = new L.LatLng(-112.82, 125.00); //Coruscul
var lei005 = new L.LatLng(-113.18, 124.84); //Jerrilek
var lei006 = new L.LatLng(-113.13, 124.89); //near Jerrilek
var lei007 = new L.LatLng(-113.06, 125.10); //near Spira
var lei008 = new L.LatLng(-113.03, 125.39); //Spira
var lei009 = new L.LatLng(-112.98, 125.51); //near Spira 2
var lei010 = new L.LatLng(-112.80, 125.86); //near Spira 4
var lei011 = new L.LatLng(-112.64, 125.99); //near Spira 5
var lei012 = new L.LatLng(-112.54, 126.21); //near Spira 6
var lei013 = new L.LatLng(-112.37, 126.26); //near Spira 7
var lei014 = new L.LatLng(-112.26, 126.27); //near Spira 8
var lei015 = new L.LatLng(-112.20, 126.33); //near Spira 9
var lei016 = new L.LatLng(-112.08, 126.59); //near Spira 10
var lei017 = new L.LatLng(-112.08, 126.68); //near Spira 11
var lei018 = new L.LatLng(-111.95, 127.09); //Ixtlar
var lei019 = new L.LatLng(-112.44, 127.30); //near Ixtlar
var lei020 = new L.LatLng(-112.52, 127.38); //near Ixtlar 2
var lei021 = new L.LatLng(-112.58, 127.52); //near Ixtlar 3
var lei022 = new L.LatLng(-112.77, 127.77); //near Ixtlar 4
var lei023 = new L.LatLng(-112.94, 127.77); //near Ixtlar 5
var lei024 = new L.LatLng(-113.63, 128.12); //Galdronia
var lei025 = new L.LatLng(-113.30, 128.23); //near Galdronia
var lei026 = new L.LatLng(-113.22, 128.27); //near Galdronia 2
var lei027 = new L.LatLng(-113.20, 128.37); //near Galdronia 3
var lei028 = new L.LatLng(-113.14, 128.43); //near Galdronia 4
var lei029 = new L.LatLng(-113.08, 128.46); //near Galdronia 5
var lei030 = new L.LatLng(-113.05, 128.68); //near Galdronia 6
var lei031 = new L.LatLng(-113.02, 129.30); //Kailor
var lei032 = new L.LatLng(-113.23, 129.37); //near Kailor
var lei033 = new L.LatLng(-113.62, 129.63); //near Kailor 2
var lei034 = new L.LatLng(-113.63, 129.70); //near Kailor 3
var lei035 = new L.LatLng(-113.61, 129.76); //near Kailor 4
var lei036 = new L.LatLng(-113.64, 129.82); //near Kailor 5
var lei037 = new L.LatLng(-113.89, 129.91); //near Kailor 6
var lei038 = new L.LatLng(-113.93, 129.99); //near Kailor 7
var lei039 = new L.LatLng(-113.98, 130.21); //near Kailor 8
var lei040 = new L.LatLng(-113.99, 130.35); //near Kailor 9
var lei041 = new L.LatLng(-113.95, 130.40); //near Kailor 10
var lei042 = new L.LatLng(-114.06, 130.55); //near Kailor 11
var lei043 = new L.LatLng(-114.11, 130.67); //near Kailor 12
var lei044 = new L.LatLng(-114.10, 130.80); //near Kailor 13
var lei045 = new L.LatLng(-114.00, 130.95); //near Kailor 14
var lei046 = new L.LatLng(-113.83, 131.20); //near Kailor 15
var lei047 = new L.LatLng(-113.73, 131.45); //Jumeria
var lei048 = new L.LatLng(-113.42, 132.07); //Trantor
var lei049 = new L.LatLng(-113.38, 132.63); //near Trantor
var lei050 = new L.LatLng(-113.36, 132.82); //near Trantor 2
var lei051 = new L.LatLng(-113.31, 132.91); //near Trantor 3
var lei052 = new L.LatLng(-113.15, 133.05); //near Trantor 4
var lei053 = new L.LatLng(-113.13, 133.14); //near Trantor 5
var lei054 = new L.LatLng(-113.07, 133.20); //near Trantor 6
var lei055 = new L.LatLng(-113.05, 133.27); //near Trantor 7
var lei056 = new L.LatLng(-113.07, 133.40); //near Trantor 8
var lei057 = new L.LatLng(-113.15, 133.56); //near Tyed Kant
var lei058 = new L.LatLng(-113.19, 133.76); //near Tyed Kant 2
var lei059 = new L.LatLng(-113.17, 134.21); //Tyed Kant
var lei060 = new L.LatLng(-113.51, 134.63); //near Tyed Kant 3
var lei061 = new L.LatLng(-113.62, 134.68); //near Tyed Kant 4
var lei062 = new L.LatLng(-114.45, 134.70); //near Tyed Kant 5
var lei063 = new L.LatLng(-114.60, 134.65); //near Tyed Kant 6
var lei064 = new L.LatLng(-114.70, 134.69); //near Tyed Kant 7
var lei065 = new L.LatLng(-114.74, 134.74); //near Tyed Kant 8
var lei066 = new L.LatLng(-114.88, 134.83); //near Tyed Kant 9
var lei067 = new L.LatLng(-115.20, 134.93); //Lespectus

var pointList = [lei001, lei002, lei003, lei004, lei005, lei006, lei007, lei008, lei009, lei010, lei011, lei012, lei013, lei014, lei015, lei016, lei017, lei018, lei019, lei020, lei021, lei022, lei023, lei024,
  lei025, lei026, lei027, lei028, lei029, lei030, lei031, lei032, lei033, lei034, lei035, lei036, lei037, lei038, lei039, lei040, lei041, lei042, lei043, lei044, lei045, lei046, lei047, lei048, lei049, lei050,
  lei051, lei052, lei053, lei054, lei055, lei056, lei057, lei058, lei059, lei060, lei061, lei062, lei063, lei064, lei065, lei066, lei067];
var leisureCorridor = new L.Polyline(pointList, {
  color: "#EEEECD",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
zoom05.addLayer(leisureCorridor);

//Commenor Run [lavender polyline]
var cmn001 = new L.LatLng(-109.40, 128.79); //Brentaal
var cmn002 = new L.LatLng(-109.44, 129.48); //near Brentaal
var cmn003 = new L.LatLng(-109.53, 130.28); //near Erigorm
var cmn004 = new L.LatLng(-109.59, 130.49); //near Erigorm 2
var cmn005 = new L.LatLng(-109.62, 130.55); //Erigorm
var cmn006 = new L.LatLng(-109.75, 130.63); //near Sittana
var cmn007 = new L.LatLng(-109.86, 130.64); //Sittana
var cmn008 = new L.LatLng(-110.12, 130.67); //near Sittana 2
var cmn009 = new L.LatLng(-110.61, 130.59); //Tepasi
var cmn010 = new L.LatLng(-111.04, 131.30); //near Korfo
var cmn011 = new L.LatLng(-111.12, 131.68); //Korfo
var cmn012 = new L.LatLng(-111.18, 132.02); //Caamas
var cmn013 = new L.LatLng(-111.33, 132.68); //near Caamas
var cmn014 = new L.LatLng(-111.43, 132.99); //near Caamas 2
var cmn015 = new L.LatLng(-111.53, 133.16); //near Alderaan
var cmn016 = new L.LatLng(-111.66, 133.22); //near Alderaan 2
var cmn017 = new L.LatLng(-112.05, 133.22); //Alderaan
var cmn018 = new L.LatLng(-112.09, 133.21); //near Alderaan
var cmn019 = new L.LatLng(-112.25, 133.25); //near Alderaan 2
var cmn020 = new L.LatLng(-112.31, 133.27); //near Alderaan 3
var cmn021 = new L.LatLng(-112.45, 133.36); //Jastro
var cmn022 = new L.LatLng(-112.61, 133.48); //near Jastro
var cmn023 = new L.LatLng(-112.82, 133.68); //near Jastro 2
var cmn024 = new L.LatLng(-113.05, 133.94); //near Tyed Kant
var cmn025 = new L.LatLng(-113.17, 134.21); //Tyed Kant
var cmn026 = new L.LatLng(-113.21, 134.31); //near Tyed Kant 2
var cmn027 = new L.LatLng(-113.22, 135.86); //Parkis
var cmn028 = new L.LatLng(-113.27, 137.16); //Kattada
var cmn029 = new L.LatLng(-113.33, 137.39); //near Kattada
var cmn030 = new L.LatLng(-113.41, 137.64); //near Kattada 2
var cmn031 = new L.LatLng(-113.62, 137.94); //near Kattada 3
var cmn032 = new L.LatLng(-113.84, 138.16); //Uquine
var cmn033 = new L.LatLng(-114.42, 138.45); //near Uquine
var cmn034 = new L.LatLng(-114.92, 138.58); //near Tasrin
var cmn035 = new L.LatLng(-115.28, 138.77); //Tasrin
var cmn036 = new L.LatLng(-115.55, 139.05); //near Tasrin
var cmn037 = new L.LatLng(-115.92, 139.25); //near Tasrin 2
var cmn038 = new L.LatLng(-116.93, 139.54); //near Commenor
var cmn039 = new L.LatLng(-117.82, 139.71); //near Commenor 2
var cmn040 = new L.LatLng(-118.03, 139.88); //Commenor

var pointList = [cmn001, cmn002, cmn003, cmn004, cmn005, cmn006, cmn007, cmn008, cmn009, cmn010, cmn011, cmn012, cmn013, cmn014, cmn015, cmn016, cmn017, cmn018, cmn019, cmn020, cmn021, cmn022, cmn023, cmn024,
  cmn025, cmn026, cmn027, cmn028, cmn029, cmn030, cmn031, cmn032, cmn033, cmn034, cmn035, cmn036, cmn037, cmn038, cmn039, cmn040];
var commenorRun = new L.Polyline(pointList, {
  color: "#94A5DB",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
commenorRun.addTo(map);

//Shwuy Exchange [beige polyline]
var shw001 = new L.LatLng(-105.86, 128.28); //Uvuiy Exen
var shw002 = new L.LatLng(-105.30, 127.72); //Dankayo
var shw003 = new L.LatLng(-105.04, 126.23); //Ord Antalaha
var shw004 = new L.LatLng(-104.90, 125.73); //near Setor
var shw005 = new L.LatLng(-104.85, 124.87); //near Setor 2
var shw006 = new L.LatLng(-104.88, 124.57); //near Caursito
var shw007 = new L.LatLng(-104.95, 123.58); //near Caursito 2
var shw008 = new L.LatLng(-105.09, 122.77); //near Noquivzor
var shw009 = new L.LatLng(-105.20, 121.82); //Noquivzor
var shw010 = new L.LatLng(-105.18, 121.58); //near Noquivzor 2
var shw011 = new L.LatLng(-105.18, 121.24); //near Noquivzor 3
var shw012 = new L.LatLng(-105.21, 120.90); //near Palanhi
var shw013 = new L.LatLng(-105.32, 120.35); //Palanhi
var shw014 = new L.LatLng(-105.47, 120.05); //Lorimax
var shw015 = new L.LatLng(-105.57, 119.78); //near Lorimax
var shw016 = new L.LatLng(-105.64, 119.47); //near Fakir
var shw017 = new L.LatLng(-105.65, 119.20); //near Fakir 2
var shw018 = new L.LatLng(-105.62, 119.01); //Fakir
var shw019 = new L.LatLng(-105.57, 118.80); //Doneer'so
var shw020 = new L.LatLng(-105.41, 118.59); //Vakkar

var pointList = [shw001, shw002, shw003, shw004, shw005, shw006, shw007, shw008, shw009, shw010, shw011, shw012, shw013, shw014, shw015, shw016, shw017, shw018, shw019, shw020];
var shwuyExchange = new L.Polyline(pointList, {
  color: "#fffac8",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
shwuyExchange.addTo(map);

//Hapan Pass* [mint polyline]
var hpp001 = new L.LatLng(-104.42, 147.77); //Taanab
var hpp002 = new L.LatLng(-104.75, 147.82); //near Taanab
var hpp003 = new L.LatLng(-105.06, 147.84); //near Norulac
var hpp004 = new L.LatLng(-105.26, 147.87); //Norulac
var hpp005 = new L.LatLng(-106.64, 147.88); //near Blacktar Cyst
var hpp006 = new L.LatLng(-107.04, 147.84); //near Blacktar Cyst 2
var hpp007 = new L.LatLng(-107.25, 147.80); //near Blacktar Cyst 3
var hpp008 = new L.LatLng(-107.65, 147.78); //near Orleon
var hpp009 = new L.LatLng(-107.68, 147.79); //near Orleon 2
var hpp010 = new L.LatLng(-107.70, 147.82); //near Orleon 3
var hpp011 = new L.LatLng(-107.71, 147.86); //near Rainboh
var hpp012 = new L.LatLng(-107.69, 147.94); //near Rainboh 2
var hpp013 = new L.LatLng(-107.70, 147.97); //near Rainboh 3
var hpp014 = new L.LatLng(-107.78, 148.03); //near Roqoo Depot
var hpp015 = new L.LatLng(-107.80, 148.04); //near Roqoo Depot 2
var hpp016 = new L.LatLng(-107.85, 148.07); //near Roqoo Depot 3
var hpp017 = new L.LatLng(-107.92, 148.08); //near Shedu Maad
var hpp018 = new L.LatLng(-108.09, 148.06); //near Reboam
var hpp019 = new L.LatLng(-108.12, 148.06); //near Dreena
var hpp020 = new L.LatLng(-108.14, 148.07); //near Dreena 2
var hpp021 = new L.LatLng(-108.18, 148.08); //near Calfa
var hpp022 = new L.LatLng(-108.21, 148.07); //near Calfa 2
var hpp023 = new L.LatLng(-108.25, 148.04); //near Calfa 3
var hpp024 = new L.LatLng(-108.28, 148.00); //near Calfa 4
var hpp025 = new L.LatLng(-108.29, 147.99); //near Calfa 5
var hpp026 = new L.LatLng(-108.33, 147.98); //near Calfa 6
var hpp027 = new L.LatLng(-108.38, 147.98); //near Calfa 7
var hpp028 = new L.LatLng(-108.40, 147.99); //near Calfa 8
var hpp029 = new L.LatLng(-108.41, 148.00); //near Calfa 9
var hpp030 = new L.LatLng(-108.52, 148.20); //near Porus Vida
var hpp031 = new L.LatLng(-108.70, 148.51); //near Porus Vida 2
var hpp032 = new L.LatLng(-108.94, 149.05); //near Porus Vida 3
var hpp033 = new L.LatLng(-109.16, 149.82); //Porus Vida

var pointList = [hpp001, hpp002, hpp003, hpp004, hpp005, hpp006, hpp007, hpp008, hpp009, hpp010, hpp011, hpp012, hpp013, hpp014, hpp015, hpp016, hpp017, hpp018, hpp019, hpp020, hpp021, hpp022, hpp023, hpp024,
  hpp025, hpp026, hpp027, hpp028, hpp029, hpp030, hpp031, hpp032, hpp033];
var hapanPass = new L.Polyline(pointList, {
  color: "#BEE9CB",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
hapanPass.addTo(map);

//Lorell Route [pale yellow polyline]
var lor001 = new L.LatLng(-107.938, 147.629); //Vergill
var lor002 = new L.LatLng(-107.950, 147.627); //near Vergill
var lor003 = new L.LatLng(-107.955, 147.623); //Maires
var lor004 = new L.LatLng(-107.962, 147.620); //near Maires
var lor005 = new L.LatLng(-107.970, 147.622); //near Charubah
var lor006 = new L.LatLng(-107.981, 147.619); //Lovola
var lor007 = new L.LatLng(-107.995, 147.611); //unknown world 0.6.1 / 9.5.4 (1)
var lor008 = new L.LatLng(-108.009, 147.599); //near unknown world 0.6.1 / 9.5.4 (2)
var lor009 = new L.LatLng(-108.012, 147.599); //unknown world 0.6.1 / 9.5.4 (2)
var lor010 = new L.LatLng(-108.019, 147.602); //near Ket
var lor011 = new L.LatLng(-108.027, 147.603); //Ket
var lor012 = new L.LatLng(-108.032, 147.600); //near Ket 2
var lor013 = new L.LatLng(-108.042, 147.600); //near Daruvvia
var lor014 = new L.LatLng(-108.051, 147.598); //Daruvvia
var lor015 = new L.LatLng(-108.058, 147.599); //near Daruvvia 2
var lor016 = new L.LatLng(-108.061, 147.602); //near unknown world 0.6.1 / 9.5.5 (1)
var lor017 = new L.LatLng(-108.064, 147.603); //unknown world 0.6.1 / 9.5.5 (1)
var lor018 = new L.LatLng(-108.069, 147.599); //near unknown world 0.6.1 / 9.5.5 (1) 2
var lor019 = new L.LatLng(-108.078, 147.586); //near Sennex
var lor020 = new L.LatLng(-108.085, 147.582); //Sennex
var lor021 = new L.LatLng(-108.098, 147.576); //near Sennex
var lor022 = new L.LatLng(-108.109, 147.576); //near Andalia
var lor023 = new L.LatLng(-108.119, 147.574); //Andalia
var lor024 = new L.LatLng(-108.130, 147.562); //near Andalia 2
var lor025 = new L.LatLng(-108.176, 147.521); //near Lorell
var lor026 = new L.LatLng(-108.208, 147.502); //near Lorell 2
var lor027 = new L.LatLng(-108.243, 147.497); //Lorell
var lor028 = new L.LatLng(-108.261, 147.503); //near Lorell 3
var lor029 = new L.LatLng(-108.277, 147.521); //near Lorell 4
var lor030 = new L.LatLng(-108.289, 147.575); //near Telkur Sta.
var lor031 = new L.LatLng(-108.304, 147.627); //near Chosper
var lor032 = new L.LatLng(-108.325, 147.676); //near Chosper 2
var lor033 = new L.LatLng(-108.339, 147.717); //near Chosper 3
var lor034 = new L.LatLng(-108.355, 147.755); //near Chosper 4
var lor035 = new L.LatLng(-108.359, 147.781); //near Chosper 5
var lor036 = new L.LatLng(-108.354, 147.899); //near Chosper 6
var lor037 = new L.LatLng(-108.356, 147.948); //near Chosper 7
var lor038 = new L.LatLng(-108.365, 147.980); //Hapan Route

var pointList = [lor001, lor002, lor003, lor004, lor005, lor006, lor007, lor008, lor009, lor010, lor011, lor012, lor013, lor014, lor015, lor016, lor017, lor018, lor019, lor020, lor021, lor022, lor023, lor024,
  lor025, lor026, lor027, lor028, lor029, lor030, lor031, lor032, lor033, lor034, lor035, lor036, lor037, lor038];
var lorellRoute = new L.Polyline(pointList, {
  color: "#EEEECD",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
}); zoom06.addLayer(lorellRoute);

//Rynmar Trail [orange polyline]
var ryt001 = new L.LatLng(-107.876, 147.853); //Rynmar
var ryt002 = new L.LatLng(-107.875, 147.846); //near Rynmar
var ryt003 = new L.LatLng(-107.867, 147.836); //near Rynmar 2
var ryt004 = new L.LatLng(-107.868, 147.828); //near Rynmar 3
var ryt005 = new L.LatLng(-107.873, 147.822); //unknown world 0.6.5 / 9.5.2 (1)
var ryt006 = new L.LatLng(-107.893, 147.813); //near Rynmar 5
var ryt007 = new L.LatLng(-107.911, 147.794); //unknown world 0.6.4 / 9.5.3 (1)
var ryt008 = new L.LatLng(-107.914, 147.780); //unknown world 0.6.4 / 9.5.3 (2)
var ryt009 = new L.LatLng(-107.910, 147.767); //Febrini
var ryt010 = new L.LatLng(-107.911, 147.760); //near Febrini
var ryt011 = new L.LatLng(-107.916, 147.744); //unknown world 0.6.3 / 9.5.3 (1)
var ryt012 = new L.LatLng(-107.915, 147.735); //near unknown world 0.6.3 / 9.5.3 (1)
var ryt013 = new L.LatLng(-107.916, 147.729); //unknown world 0.6.3 / 9.5.3 (2)
var ryt014 = new L.LatLng(-107.914, 147.714); //unknown world 0.6.3 / 9.5.3 (3)
var ryt015 = new L.LatLng(-107.910, 147.703); //near Sargon
var ryt016 = new L.LatLng(-107.906, 147.699); //near Sargon 2
var ryt017 = new L.LatLng(-107.907, 147.684); //near Sargon 3
var ryt018 = new L.LatLng(-107.915, 147.674); //unknown world 0.6.2 / 9.5.3 (1)
var ryt019 = new L.LatLng(-107.928, 147.656); //near Modus
var ryt020 = new L.LatLng(-107.929, 147.651); //Modus
var ryt021 = new L.LatLng(-107.933, 147.644); //near Modus 2
var ryt022 = new L.LatLng(-107.935, 147.634); //near Vergill
var ryt023 = new L.LatLng(-107.938, 147.629); //Vergill

var pointList = [ryt001, ryt002, ryt003, ryt004, ryt005, ryt006, ryt007, ryt008, ryt009, ryt010, ryt011, ryt012, ryt013, ryt014, ryt015, ryt016, ryt017, ryt018, ryt019, ryt020, ryt021, ryt022, ryt023];
var rynmarTrail = new L.Polyline(pointList, {
  color: "#F58231",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
}); zoom07.addLayer(rynmarTrail);

//Rynmar Exchange* [lavender polyline]
var rye001 = new L.LatLng(-107.876, 147.853); //Rynmar
var rye002 = new L.LatLng(-107.870, 147.855); //near Rynmar
var rye003 = new L.LatLng(-107.863, 147.856); //near Erigorm

var pointList = [rye001, rye002, rye003];
var rynmarExchange = new L.Polyline(pointList, {
  color: "#94A5DB",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
rynmarExchange.addTo(map);

//Rainboh Road* [beige polyline]
var rai001 = new L.LatLng(-107.859, 147.889); //Rainboh
var rai002 = new L.LatLng(-107.862, 147.884); //near Rainboh
var rai003 = new L.LatLng(-107.865, 147.882); //near unknown world 0.6.6 / 9.5.2 (1)
var rai004 = new L.LatLng(-107.866, 147.879); //unknown world 0.6.6 / 9.5.2 (1)
var rai005 = new L.LatLng(-107.867, 147.870); //unknown world 0.6.5 / 9.5.2 (1)
var rai006 = new L.LatLng(-107.866, 147.864); //near unknown world 0.6.5 / 9.5.2 (1)
var rai007 = new L.LatLng(-107.863, 147.856); //unknown world 0.6.5 / 9.5.2 (2)
var rai008 = new L.LatLng(-107.853, 147.846); //near unknown world 0.6.5 / 9.5.2 (2)
var rai009 = new L.LatLng(-107.850, 147.842); //unknown world 0.6.5 / 9.5.2 (3)
var rai010 = new L.LatLng(-107.848, 147.832); //unknown world 0.6.5 / 9.5.2 (4)

var pointList = [rai001, rai002, rai003, rai004, rai005, rai006, rai007, rai008, rai009, rai010];
var rainbohRoad = new L.Polyline(pointList, {
  color: "#fffac8",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
rainbohRoad.addTo(map);

//Mandalorian Road [green polyline]
var mnd001 = new L.LatLng(-96.43, 137.17); //Corsin
var mnd002 = new L.LatLng(-96.58, 137.83); //Plooriod
var mnd003 = new L.LatLng(-96.65, 138.61); //near Plooriod
var mnd004 = new L.LatLng(-96.66, 138.87); //near Plooriod 2
var mnd005 = new L.LatLng(-96.56, 139.98); //near Ploo
var mnd006 = new L.LatLng(-96.51, 140.19); //near Ploo 2
var mnd007 = new L.LatLng(-96.45, 140.26); //Ploo
var mnd008 = new L.LatLng(-96.32, 140.34); //near Ploo 3
var mnd009 = new L.LatLng(-95.85, 140.38); //near Ploo 4
var mnd010 = new L.LatLng(-95.52, 140.45); //near Vulta
var mnd011 = new L.LatLng(-95.34, 140.53); //Vulta
var mnd012 = new L.LatLng(-94.66, 141.17); //Ferros
var mnd013 = new L.LatLng(-94.05, 141.80); //Jebble
var mnd014 = new L.LatLng(-92.82, 142.66); //Taris
var mnd015 = new L.LatLng(-92.72, 142.83); //near Taris
var mnd016 = new L.LatLng(-92.00, 144.30); //near Vanquo
var mnd017 = new L.LatLng(-91.74, 145.16); //near Vanquo 2
var mnd018 = new L.LatLng(-91.71, 145.27); //near Vanquo 3
var mnd019 = new L.LatLng(-91.70, 145.36); //Vanquo
var mnd020 = new L.LatLng(-92.13, 145.95); //near Flashpoint
var mnd021 = new L.LatLng(-92.20, 146.02); //Flashpoint
var mnd022 = new L.LatLng(-92.30, 146.13); //near Flashpoint 2
var mnd023 = new L.LatLng(-92.68, 146.88); //near Flashpoint 3
var mnd024 = new L.LatLng(-93.05, 147.54); //near Ordo
var mnd025 = new L.LatLng(-93.28, 147.80); //Ordo
var mnd026 = new L.LatLng(-93.49, 148.02); //near Ordo 2
var mnd027 = new L.LatLng(-94.02, 148.56); //near Mandalore
var mnd028 = new L.LatLng(-93.92, 148.52); //Mandalore

var pointList = [mnd001, mnd002, mnd003, mnd004, mnd005, mnd006, mnd007, mnd008, mnd009, mnd010, mnd011, mnd012, mnd013, mnd014, mnd015, mnd016, mnd017, mnd018, mnd019, mnd020, mnd021, mnd022, mnd023, mnd024,
  mnd025, mnd026, mnd027];
var mandalorianRoad = new L.Polyline(pointList, {
  color: "#3cb44b",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
mandalorianRoad.addTo(map);

//Weyland-Mandalore Hyperroute* [light red polyline]
var wym001 = new L.LatLng(-95.88, 142.72); //Weyland
var wym002 = new L.LatLng(-95.26, 143.10); //near Okyaab
var wym003 = new L.LatLng(-95.14, 143.22); //Okyaab
var wym004 = new L.LatLng(-95.09, 143.31); //near Okyaab 2
var wym005 = new L.LatLng(-94.87, 144.10); //near Okyaab 3
var wym006 = new L.LatLng(-94.63, 144.99); //near Draboon
var wym007 = new L.LatLng(-94.55, 145.16); //Draboon
var wym008 = new L.LatLng(-94.22, 146.67); //near Draboon 2
var wym009 = new L.LatLng(-93.92, 148.52); //Mandalore

var pointList = [wym001, wym002, wym003, wym004, wym005, wym006, wym007, wym008, wym009];
var weylandMandalore = new L.Polyline(pointList, {
  color: "#ff8080",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
weylandMandalore.addTo(map);

//Von-Alai-Mandalore Hyperroute* [beige polyline]
var vom001 = new L.LatLng(-101.75, 149.73); //Von-Alai
var vom002 = new L.LatLng(-101.33, 148.89); //near Von-Alai
var vom003 = new L.LatLng(-100.56, 147.86); //near Farstey
var vom004 = new L.LatLng(-100.20, 147.63); //Thisspias
var vom005 = new L.LatLng(-100.03, 147.69); //near Thisspias
var vom006 = new L.LatLng(-99.95, 147.75); //near Thisspias 2
var vom007 = new L.LatLng(-99.78, 148.19); //near Alpheridies
var vom008 = new L.LatLng(-99.65, 148.34); //Alpheridies
var vom009 = new L.LatLng(-99.30, 148.42); //near Alpheridies
var vom010 = new L.LatLng(-98.75, 148.46); //Fait d'Fait
var vom011 = new L.LatLng(-97.86, 148.50); //near Mes Cavoli
var vom012 = new L.LatLng(-96.18, 148.66); //near Bedlam
var vom013 = new L.LatLng(-94.80, 148.67); //near Jakelia
var vom014 = new L.LatLng(-94.06, 148.55); //near Mandalore

var pointList = [vom001, vom002, vom003, vom004, vom005, vom006, vom007, vom008, vom009, vom010, vom011, vom012, vom013, vom014];
var vonAlaiMandalore = new L.Polyline(pointList, {
  color: "#fffac8",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
vonAlaiMandalore.addTo(map);

//Tertiary Etti Route [lavender polyline]
var ter001 = new L.LatLng(-73.70, 174.44); //Gaurick
var ter002 = new L.LatLng(-73.61, 174.49); //near Gaurick
var ter003 = new L.LatLng(-73.52, 174.54); //near Gaurick 2
var ter004 = new L.LatLng(-73.11, 174.59); //near Issagra
var ter005 = new L.LatLng(-72.36, 174.64); //Ocsin
var ter006 = new L.LatLng(-72.34, 174.65); //near Ocsin
var ter007 = new L.LatLng(-71.94, 174.85); //near Kamar
var ter008 = new L.LatLng(-71.71, 174.87); //near Kamar 2
var ter009 = new L.LatLng(-71.40, 174.84); //near Thandon N.
var ter010 = new L.LatLng(-71.14, 174.71); //near Brosi
var ter011 = new L.LatLng(-71.14, 174.71); //near Farana
var ter012 = new L.LatLng(-70.66, 174.28); //Farana
var ter013 = new L.LatLng(-70.54, 174.16); //near Farana 2
var ter014 = new L.LatLng(-70.34, 174.03); //near Hull's Star
var ter015 = new L.LatLng(-70.13, 173.95); //Hull's Star
var ter016 = new L.LatLng(-69.75, 173.81); //near Hull's Star 2
var ter017 = new L.LatLng(-69.34, 173.66); //near Hull's Star 3
var ter018 = new L.LatLng(-69.10, 173.55); //near Mytus
var ter019 = new L.LatLng(-68.79, 173.38); //near Mytus 2
var ter020 = new L.LatLng(-68.53, 173.15); //near Mytus 3
var ter021 = new L.LatLng(-68.16, 172.69); //Mytus


var pointList = [ter001, ter002, ter003, ter004, ter005, ter006, ter007, ter008, ter009, ter010, ter011, ter012, ter013, ter014, ter015, ter016, ter017, ter018, ter019, ter020, ter021];
var tertiaryEttiRoute = new L.Polyline(pointList, {
  color: "#94A5DB",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
tertiaryEttiRoute.addTo(map);

//Kir-Kamar Hyperlane* [maroon polyline]
var kir001 = new L.LatLng(-72.36, 173.92); //Kir
var kir002 = new L.LatLng(-72.35, 173.98); //near Kir
var kir003 = new L.LatLng(-72.36, 174.02); //near Kir 2
var kir004 = new L.LatLng(-72.42, 174.28); //Deltooine
var kir005 = new L.LatLng(-72.39, 174.55); //Fether
var kir006 = new L.LatLng(-72.36, 174.64); //Ocsin
var kir007 = new L.LatLng(-72.32, 174.77); //Kamar

var pointList = [kir001, kir002, kir003, kir004, kir005, kir006, kir007];
var kirKamarHyperlane = new L.Polyline(pointList, {
  color: "#800000",
  weight: 3,
  opacity: .9,
  smoothFactor: 1
});
kirKamarHyperlane.addTo(map);

//Hydian Way [red polyline]
var hyd001 = new L.LatLng(-72.45, 173.31); //Bonadan
var hyd002 = new L.LatLng(-72.33, 172.81); //D'ian
var hyd003 = new L.LatLng(-71.99, 171.38); //Lythos
var hyd004 = new L.LatLng(-71.80, 169.94); //Mall'ordian
var hyd005 = new L.LatLng(-71.69, 168.97); //Reltooine
var hyd006 = new L.LatLng(-71.63, 168.06); //Cadomai
var hyd007 = new L.LatLng(-71.63, 167.09); //near Cadomai
var hyd008 = new L.LatLng(-71.66, 165.80); //near Cadomai 2
var hyd009 = new L.LatLng(-71.73, 164.49); //near Oshetti
var hyd010 = new L.LatLng(-71.83, 163.69); //near Ruuria
var hyd011 = new L.LatLng(-72.00, 162.81); //Ruuria
var hyd012 = new L.LatLng(-72.30, 161.89); //near Ruuria 2
var hyd013 = new L.LatLng(-72.55, 161.00); //near Teagan
var hyd014 = new L.LatLng(-72.84, 160.26); //near Teagan 2
var hyd015 = new L.LatLng(-73.08, 159.81); //Teagan
var hyd016 = new L.LatLng(-73.14, 159.70); //Listehol
var hyd017 = new L.LatLng(-73.59, 159.00); //Tantive
var hyd018 = new L.LatLng(-73.91, 158.54); //Doniphon
var hyd019 = new L.LatLng(-74.44, 158.03); //Telos
var hyd020 = new L.LatLng(-77.97, 154.94); //Praadost
var hyd021 = new L.LatLng(-80.80, 152.83); //Pho Ph'eah
var hyd022 = new L.LatLng(-82.86, 151.47); //Toprawa
var hyd023 = new L.LatLng(-86.34, 148.94); //Celanon
var hyd024 = new L.LatLng(-90.70, 145.73); //Bandomeer
var hyd025 = new L.LatLng(-93.25, 142.88); //near Taris
var hyd026 = new L.LatLng(-95.23, 139.52); //Skorrupon
var hyd027 = new L.LatLng(-96.43, 137.17); //Corsin
var hyd028 = new L.LatLng(-97.25, 135.56); //Chennis
var hyd029 = new L.LatLng(-97.63, 134.86); //Adin
var hyd030 = new L.LatLng(-97.83, 134.41); //Draria
var hyd031 = new L.LatLng(-98.25, 133.73); //Viga
var hyd032 = new L.LatLng(-98.61, 133.19); //near Viga
var hyd033 = new L.LatLng(-99.13, 132.56); //Kidriff
var hyd034 = new L.LatLng(-99.52, 132.13); //Nessem
var hyd035 = new L.LatLng(-100.20, 131.45); //Bogden
var hyd036 = new L.LatLng(-100.90, 130.88); //Paqualis
var hyd037 = new L.LatLng(-101.69, 130.35); //Per Lupelo
var hyd038 = new L.LatLng(-102.48, 129.87); //Drearia
var hyd039 = new L.LatLng(-103.22, 129.37); //Champala
var hyd040 = new L.LatLng(-103.56, 129.16); //near Champala
var hyd041 = new L.LatLng(-104.16, 128.86); //Nierport
var hyd042 = new L.LatLng(-104.46, 128.68); //near Nierport
var hyd043 = new L.LatLng(-104.71, 128.61); //near Nierport 2
var hyd044 = new L.LatLng(-105.86, 128.28); //Uvuiy Exen
var hyd045 = new L.LatLng(-106.28, 128.24); //near Coronar
var hyd046 = new L.LatLng(-107.11, 128.21); //Wakeelmui
var hyd047 = new L.LatLng(-107.75, 128.19); //near Tentator
var hyd048 = new L.LatLng(-108.12, 128.21); //near Adamastor
var hyd049 = new L.LatLng(-108.40, 128.30); //near Adamastor 2
var hyd050 = new L.LatLng(-108.80, 128.45); //Bormea
var hyd051 = new L.LatLng(-109.40, 128.79); //Brentaal
var hyd052 = new L.LatLng(-111.19, 130.00); //Skako
var hyd053 = new L.LatLng(-111.92, 130.57); //Nakadia
var hyd054 = new L.LatLng(-113.83, 132.50); //Demophon
var hyd055 = new L.LatLng(-114.35, 133.05); //Glithnos
var hyd056 = new L.LatLng(-115.05, 133.67); //Fedalle
var hyd057 = new L.LatLng(-115.46, 133.90); //Badfellow
var hyd058 = new L.LatLng(-116.58, 134.58); //Talravin
var hyd059 = new L.LatLng(-117.33, 134.98); //Ruul
var hyd060 = new L.LatLng(-118.13, 135.41); //Trellen
var hyd061 = new L.LatLng(-118.91, 135.76); //Mawan
var hyd062 = new L.LatLng(-120.28, 136.31); //Loretto
var hyd063 = new L.LatLng(-126.64, 138.16); //Besnia
var hyd064 = new L.LatLng(-128.63, 138.69); //Aquilae
var hyd065 = new L.LatLng(-132.28, 139.54); //Denon
var hyd066 = new L.LatLng(-138.05, 139.91); //Babbadod
var hyd067 = new L.LatLng(-138.52, 140.06); //near Itani N.
var hyd068 = new L.LatLng(-139.42, 139.94); //Nordra
var hyd069 = new L.LatLng(-144.94, 139.94); //Gacerian
var hyd070 = new L.LatLng(-148.06, 139.66); //Ramordia
var hyd071 = new L.LatLng(-151.47, 139.38); //Arrgaw
var hyd072 = new L.LatLng(-153.47, 138.94); //Tyus Cl.
var hyd073 = new L.LatLng(-156.53, 138.34); //Malastare
var hyd074 = new L.LatLng(-161.03, 136.91); //Darkknell
var hyd075 = new L.LatLng(-162.34, 136.41); //Ord Simres
var hyd076 = new L.LatLng(-165.69, 134.84); //Eriadu
var hyd077 = new L.LatLng(-167.28, 134.06); //near Averam
var hyd078 = new L.LatLng(-170.09, 131.97); //Black Stall Sta.
var hyd079 = new L.LatLng(-172.55, 130.20); //Ogoth Tiir
var hyd080 = new L.LatLng(-176.22, 126.66); //Tosste
var hyd081 = new L.LatLng(-178.06, 125.31); //Rutan
var hyd082 = new L.LatLng(-183.00, 120.00); //Terminus

var pointList = [hyd001, hyd002, hyd003, hyd004, hyd005, hyd006, hyd007, hyd008, hyd009, hyd010, hyd011, hyd012, hyd013, hyd014, hyd015, hyd016, hyd017, hyd018, hyd019, hyd020, hyd021, hyd022, hyd023, hyd024,
  hyd025, hyd026, hyd027, hyd028, hyd029, hyd030, hyd031, hyd032, hyd033, hyd034, hyd035, hyd036, hyd037, hyd038, hyd039, hyd040, hyd041, hyd042, hyd043, hyd044, hyd045, hyd046, hyd047, hyd048, hyd049, hyd050,
  hyd051, hyd052, hyd053, hyd054, hyd055, hyd056, hyd057, hyd058, hyd059, hyd060, hyd061, hyd062, hyd063, hyd064, hyd065, hyd066, hyd067, hyd068, hyd069, hyd070, hyd071, hyd072, hyd073, hyd074, hyd075, hyd076,
  hyd077, hyd078, hyd079, hyd080, hyd081, hyd082];
var hydianWay = new L.Polyline(pointList, {
  color: 'red',
  weight: 4,
  opacity: .9,
  smoothFactor: 1
});
hydianWay.addTo(map);

//Hydian Way [glow outline]
var hydianWayGlow = new L.Polyline(pointList, {
  color: 'red',
  weight: 12,
  opacity: 0.3,
  smoothFactor: 1
});
hydianWayGlow.addTo(map);


//Perlemian Trade Route [purple polyline]
var prl001 = new L.LatLng(-111.67, 124.73); //Coruscant
var prl002 = new L.LatLng(-108.19, 130.70); //Delle
var prl003 = new L.LatLng(-106.35, 133.80); //Castell
var prl004 = new L.LatLng(-105.44, 135.67); //Vurdon Ka
var prl005 = new L.LatLng(-104.64, 137.72); //Chazwa
var prl006 = new L.LatLng(-104.13, 139.41); //Relatta
var prl007 = new L.LatLng(-103.80, 140.98); //near Nolar
var prl008 = new L.LatLng(-103.83, 141.83); //Tirahn
var prl009 = new L.LatLng(-104.38, 146.42); //near Avenel
var prl010 = new L.LatLng(-104.41, 147.08); //Avenel
var prl011 = new L.LatLng(-104.42, 147.77); //Taanab
var prl012 = new L.LatLng(-104.41, 148.97); //Sermeria
var prl013 = new L.LatLng(-104.38, 149.31); //Carcel
var prl014 = new L.LatLng(-104.38, 150.13); //Pirin
var prl015 = new L.LatLng(-104.37, 151.25); //near Gizer
var prl016 = new L.LatLng(-104.30, 151.48); //Gizer
var prl017 = new L.LatLng(-103.66, 153.27); //near Lantillies
var prl018 = new L.LatLng(-103.41, 154.06); //near Lantillies 2
var prl019 = new L.LatLng(-103.75, 152.97); //Lantillies
var prl020 = new L.LatLng(-102.80, 156.13); //near Rearqu
var prl021 = new L.LatLng(-102.34, 157.59); //near Pothor
var prl022 = new L.LatLng(-102.05, 158.31); //Jeyell
var prl023 = new L.LatLng(-101.64, 159.31); //Roche
var prl024 = new L.LatLng(-101.14, 160.20); //near Quilan
var prl025 = new L.LatLng(-99.13, 162.48); //Talcene
var prl026 = new L.LatLng(-97.27, 164.41); //near Zuliria
var prl027 = new L.LatLng(-96.25, 165.22); //Abhean
var prl028 = new L.LatLng(-95.44, 165.73); //The Wheel
var prl029 = new L.LatLng(-94.55, 166.45); //Centares
var prl030 = new L.LatLng(-90.36, 168.86); //Columex
var prl031 = new L.LatLng(-87.47, 170.64); //Lianna
var prl032 = new L.LatLng(-85.70, 171.89); //Desevro
var prl033 = new L.LatLng(-83.84, 172.74); //Janodral Mizar
var prl034 = new L.LatLng(-83.59, 172.97); //Ank Ki'Shor
var prl035 = new L.LatLng(-83.11, 173.17); //Estaria
var prl036 = new L.LatLng(-82.39, 173.63); //Makem Te
var prl037 = new L.LatLng(-81.47, 174.30); //Quermia
var prl038 = new L.LatLng(-79.19, 175.83); //near Simus Minor

var pointList = [prl001, prl002, prl003, prl004, prl005, prl006, prl007, prl008, prl009, prl010, prl011, prl012, prl013, prl014, prl015, prl016, prl017, prl018, prl019, prl020, prl021, prl022, prl023, prl024,
  prl025, prl026, prl027, prl028, prl029, prl030, prl031, prl032, prl033, prl034, prl035, prl036, prl037, prl038];
var perlemian = new L.Polyline(pointList, {
  color: "#b09cc8",
  weight: 4,
  opacity: .9,
  smoothFactor: 1
});
perlemian.addTo(map);

//Perlemian Trade Route [glow outline]
var perlemianGlow = new L.Polyline(pointList, {
  color: "#b09cc8",
  weight: 12,
  opacity: 0.3,
  smoothFactor: 1
});
perlemianGlow.addTo(map);

//Corellian Run [green polyline]
var cru001 = new L.LatLng(-111.67, 124.73); //Coruscant
var cru002 = new L.LatLng(-111.73, 125.85); //near Carlem
var cru003 = new L.LatLng(-111.95, 127.09); //Ixtlar
var cru004 = new L.LatLng(-112.69, 128.77); //Wukkar
var cru005 = new L.LatLng(-113.50, 130.08); //Xorth
var cru006 = new L.LatLng(-114.17, 130.84); //near Xorth
var cru007 = new L.LatLng(-114.82, 131.49); //Refgar
var cru008 = new L.LatLng(-115.52, 132.06); //Vuma
var cru009 = new L.LatLng(-116.58, 132.70); //Bar'leth
var cru010 = new L.LatLng(-117.07, 132.95); //Leria Kerlsil
var cru011 = new L.LatLng(-118.58, 133.51); //Perma
var cru012 = new L.LatLng(-119.31, 133.76); //Lolnar
var cru013 = new L.LatLng(-120.13, 134.04); //near Columus
var cru014 = new L.LatLng(-121.52, 134.42); //Rehemsa
var cru015 = new L.LatLng(-122.24, 134.59); //Sedratis
var cru016 = new L.LatLng(-122.62, 134.68); //near Sedratis
var cru017 = new L.LatLng(-123.08, 134.90); //Rydonni Prime
var cru018 = new L.LatLng(-123.33, 135.14); //near Saberhing
var cru019 = new L.LatLng(-123.86, 135.19); //Corellia
var cru020 = new L.LatLng(-124.36, 135.36); //Nubia
var cru021 = new L.LatLng(-125.63, 135.75); //Tinnel
var cru022 = new L.LatLng(-127.84, 136.66); //Loronar
var cru023 = new L.LatLng(-128.82, 137.15); //Byblos
var cru024 = new L.LatLng(-129.56, 137.62); //Pencael
var cru025 = new L.LatLng(-130.66, 138.37); //Havricus
var cru026 = new L.LatLng(-131.28, 138.75); //Abednedo
var cru027 = new L.LatLng(-131.80, 139.09); //Iseno
var cru028 = new L.LatLng(-132.06, 139.31); //near Denon
var cru029 = new L.LatLng(-132.28, 139.54); //Denon
var cru030 = new L.LatLng(-135.41, 142.97); //Rhommamool / Osarian
var cru031 = new L.LatLng(-137.42, 144.73); //Tlactehon
var cru032 = new L.LatLng(-138.36, 145.48); //Allanteen
var cru033 = new L.LatLng(-142.81, 149.78); //Thaere
var cru034 = new L.LatLng(-146.44, 153.39); //Druckenwell
var cru035 = new L.LatLng(-150.45, 157.00); //Andosha
var cru036 = new L.LatLng(-154.44, 161.00); //Radnor
var cru037 = new L.LatLng(-156.03, 162.41); //Christophsis
var cru038 = new L.LatLng(-156.56, 163.13); //Savareen
var cru039 = new L.LatLng(-160.00, 167.08); //Dalchon
var cru040 = new L.LatLng(-161.34, 168.69); //Ryloth
var cru041 = new L.LatLng(-163.42, 171.17); //Wrea
var cru042 = new L.LatLng(-165.61, 175.38); //near Gertafuu

var pointList = [cru001, cru002, cru003, cru004, cru005, cru006, cru007, cru008, cru009, cru010, cru011, cru012, cru013, cru014, cru015, cru016, cru017, cru018, cru019, cru020, cru021, cru022, cru023, cru024,
  cru025, cru026, cru027, cru028, cru029, cru030, cru031, cru032, cru033, cru034, cru035, cru036, cru037, cru038, cru039, cru040, cru041, cru042];
var corellRun = new L.Polyline(pointList, {
  color: "#93e98e",
  weight: 4,
  opacity: .9,
  smoothFactor: 1
});
corellRun.addTo(map);

//Corellian Run [glow outline]
var corellRunGlow = new L.Polyline(pointList, {
  color: "#93e98e",
  weight: 12,
  opacity: 0.3,
  smoothFactor: 1
});
corellRunGlow.addTo(map);

//Corellian Trade Spine [yellow polyline]
var ctr001 = new L.LatLng(-123.86, 135.19); //Corellia
var ctr002 = new L.LatLng(-124.01, 135.12); //Plympto
var ctr003 = new L.LatLng(-124.14, 135.07); //New Plympto
var ctr004 = new L.LatLng(-124.34, 135.00); //Duro
var ctr005 = new L.LatLng(-124.94, 134.88); //near Zarsteck
var ctr006 = new L.LatLng(-125.42, 134.89); //near Zarsteck 2
var ctr007 = new L.LatLng(-127.47, 135.06); //near Gailea
var ctr008 = new L.LatLng(-127.93, 135.08); //Chasin
var ctr009 = new L.LatLng(-128.28, 135.05); //near Chasin
var ctr010 = new L.LatLng(-128.62, 134.96); //near Arat Fraca
var ctr011 = new L.LatLng(-129.59, 134.55); //Condular
var ctr012 = new L.LatLng(-130.08, 134.35); //Gandeal
var ctr013 = new L.LatLng(-131.86, 133.45); //Belazura
var ctr014 = new L.LatLng(-133.47, 132.84); //Enisca
var ctr015 = new L.LatLng(-134.59, 132.52); //Kelada
var ctr016 = new L.LatLng(-142.13, 130.72); //Mechis
var ctr017 = new L.LatLng(-143.55, 130.27); //Yag'Dhul
var ctr018 = new L.LatLng(-144.48, 130.01); //Harrin
var ctr019 = new L.LatLng(-148.10, 127.82); //Borkyne
var ctr020 = new L.LatLng(-148.32, 127.68); //near KyLessia
var ctr021 = new L.LatLng(-153.51, 122.26); //near Edatha
var ctr022 = new L.LatLng(-156.42, 120.78); //near Boomis Koori
var ctr023 = new L.LatLng(-159.69, 120.03); //near Kaal
var ctr024 = new L.LatLng(-163.66, 119.86); //Quamar
var ctr025 = new L.LatLng(-164.81, 119.25); //Aztubek
var ctr026 = new L.LatLng(-165.31, 119.33); //near High Chunah
var ctr027 = new L.LatLng(-165.84, 118.95); //Kirtarkin
var ctr028 = new L.LatLng(-166.56, 118.88); //Gerrenthum
var ctr029 = new L.LatLng(-166.77, 118.80); //Indellian
var ctr030 = new L.LatLng(-167.73, 119.00); //Ione
var ctr031 = new L.LatLng(-169.18, 119.07); //Orn Kios
var ctr032 = new L.LatLng(-169.53, 118.99); //Ozu
var ctr033 = new L.LatLng(-169.70, 119.29); //near Isde Naha
var ctr034 = new L.LatLng(-170.23, 119.35); //near Togominda
var ctr035 = new L.LatLng(-170.53, 119.55); //near Tamboon
var ctr036 = new L.LatLng(-171.14, 119.20); //near Berrol's Donn
var ctr037 = new L.LatLng(-174.85, 119.34); //Sil'Lume
var ctr038 = new L.LatLng(-177.86, 119.56); //Manpha
var ctr039 = new L.LatLng(-181.48, 119.94); //Katchan
var ctr040 = new L.LatLng(-183.00, 120.00); //Terminus
var ctr041 = new L.LatLng(-186.18, 120.36); //near Terminus

var pointList = [ctr001, ctr002, ctr003, ctr004, ctr005, ctr006, ctr007, ctr008, ctr009, ctr010, ctr011, ctr012, ctr013, ctr014, ctr015, ctr016, ctr017, ctr018, ctr019, ctr020, ctr021, ctr022, ctr023, ctr024,
  ctr025, ctr026, ctr027, ctr028, ctr029, ctr030, ctr031, ctr032, ctr033, ctr034, ctr035, ctr036, ctr037, ctr038, ctr039, ctr040, ctr041];
var corTrade = new L.Polyline(pointList, {
  color: "#FCB001",
  weight: 4,
  opacity: .9,
  smoothFactor: 1
});
corTrade.addTo(map);

//Corellian Trade Spine [glow outline]
var corTradeGlow = new L.Polyline(pointList, {
  color: "#FCB001",
  weight: 12,
  opacity: 0.3,
  smoothFactor: 1
});
corTradeGlow.addTo(map);

//Rimma Trade Route [blue polyline]
var rtr001 = new L.LatLng(-132.28, 124.47); //Abregado-rae
var rtr002 = new L.LatLng(-134.13, 124.78); //Rimma
var rtr003 = new L.LatLng(-134.81, 124.86); //Giju
var rtr004 = new L.LatLng(-135.94, 125.30); //near Kooda
var rtr005 = new L.LatLng(-137.64, 126.55); //Ghorman
var rtr006 = new L.LatLng(-139.84, 128.34); //near Kedra
var rtr007 = new L.LatLng(-140.72, 129.12); //Thyferra
var rtr008 = new L.LatLng(-141.73, 129.70); //near Tauber
var rtr009 = new L.LatLng(-145.48, 130.95); //Wroona
var rtr010 = new L.LatLng(-151.86, 133.16); //Woostri
var rtr011 = new L.LatLng(-153.07, 133.37); //Daemen
var rtr012 = new L.LatLng(-154.74, 133.77); //Alakatha
var rtr013 = new L.LatLng(-156.89, 134.27); //Vondarc
var rtr014 = new L.LatLng(-157.74, 134.38); //near Nymalia
var rtr015 = new L.LatLng(-160.63, 134.64); //near Tshindral
var rtr016 = new L.LatLng(-167.91, 134.88); //near Rimma 18
var rtr017 = new L.LatLng(-170.27, 135.16); //near Almar Prime
var rtr018 = new L.LatLng(-171.50, 135.06); //Sluis Van
var rtr019 = new L.LatLng(-172.75, 135.01); //Denab
var rtr020 = new L.LatLng(-175.63, 135.20); //Tarabba
var rtr021 = new L.LatLng(-176.59, 135.09); //near Tantra
var rtr022 = new L.LatLng(-178.23, 135.14); //near Osirrag
var rtr023 = new L.LatLng(-181.48, 135.30); //Karideph

var pointList = [rtr001, rtr002, rtr003, rtr004, rtr005, rtr006, rtr007, rtr008, rtr009, rtr010, rtr011, rtr012, rtr013, rtr014, rtr015, rtr016, rtr017, rtr018, rtr019, rtr020, rtr021, rtr022, rtr023];
var rimmaTrRt = new L.Polyline(pointList, {
  color: "#00bfff",
  weight: 4,
  opacity: .9,
  smoothFactor: 1
});
rimmaTrRt.addTo(map);

//Rimma Trade Route [glow outline]
var rimmaTrRtGlow = new L.Polyline(pointList, {
  color: "#00bfff",
  weight: 12,
  opacity: 0.3,
  smoothFactor: 1
});
rimmaTrRtGlow.addTo(map);