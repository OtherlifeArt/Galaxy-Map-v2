var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
var altText = 'Display Error';

const EApath = '././data/images/source_images/Essential_Atlas/'
const Otherspath = '././data/images/source_images/Others/'

/******** The Essential Atlas *********/

var DeepCoreUrl = EApath + 'DeepCore_15.png';
var DeepCoreBounds = L.latLngBounds([[-295.406,-147.695], [69.621,152.195]]);
var DeepCoreOverlay = L.imageOverlay(DeepCoreUrl, DeepCoreBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
});

var CoreUrl = EApath + 'Core_14.png';
var CoreBounds = L.latLngBounds([[-471.726,-230.637], [151.147,223.083]]);
var CoreOverlay = L.imageOverlay(CoreUrl, CoreBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var ColoniesUrl = EApath + 'Colonies_13.png';
var ColoniesBounds = L.latLngBounds([[-543.935,-284.252], [248.756,289.736]]);
var ColoniesOverlay = L.imageOverlay(ColoniesUrl, ColoniesBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var InnerRimUrl = EApath + 'InnerRim_12.png';
var InnerRimBounds = L.latLngBounds([[-636.228,-336.228], [408.299,434.997]]);
var InnerRimOverlay = L.imageOverlay(InnerRimUrl, InnerRimBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var ExpansionRegionUrl = EApath + 'ExpansionRegion_11.png';
var ExpansionRegionBounds = L.latLngBounds([[-760.454,-343,212], [382.445,497.212]]);
var ExpansionRegionOverlay = L.imageOverlay(ExpansionRegionUrl, ExpansionRegionBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var MidRimUrl = EApath + 'MidRim_9.png';
var MidRimBounds = L.latLngBounds([[-928.979,-369.632], [583.907,731.87]]);
var MidRimOverlay = L.imageOverlay(MidRimUrl, MidRimBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var HuttSpaceUrl = EApath + 'HuttSpace_10.png';
var HuttSpaceBounds = L.latLngBounds([[-451.101,518.394], [169.507,987.382]]);
var HuttSpaceOverlay = L.imageOverlay(HuttSpaceUrl, HuttSpaceBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var OuterRimUrl = EApath + 'OuterRim_8.png';
var OuterRimBounds = L.latLngBounds([[-1284.836,-606.049], [867.668,1015.75]]);
var OuterRimOverlay = L.imageOverlay(OuterRimUrl, OuterRimBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var GalaxyFRUrl = EApath + 'GalaxyFrenchHRversion_7.png';
var GalaxyFRBounds = L.latLngBounds([[-768.238,-1097.3], [438.301,1199.876]]);
var GalaxyFROverlay = L.imageOverlay(GalaxyFRUrl, GalaxyFRBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var ClientsUrl = EApath + 'Clientsstatesandmiscellaneousregions_3.png';
var ClientsBounds = L.latLngBounds([[-1292.778,-587.41], [851.608,999.531]]);
var ClientsOverlay = L.imageOverlay(ClientsUrl, ClientsBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});
/******** The Essential Atlas Extra parts*******/

var ExpensionRegionSUrl = EApath + 'ExpansionRegionS_6.png';
var ExpensionRegionSBounds = L.latLngBounds([[-763.645,-349.972], [395.394,528.087]]);
var ExpensionRegionSOverlay = L.imageOverlay(ExpensionRegionSUrl, ExpensionRegionSBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var MidRimSUrl = EApath + 'MidRimS_5.png';
var MidRimSBounds = L.latLngBounds([[-949.099,-411.266], [518.607,751.085]]);
var MidRimSOverlay = L.imageOverlay(MidRimSUrl, MidRimSBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var OuterRimSUrl = EApath + 'OuterRimS_4.png';
var OuterRimSBounds = L.latLngBounds([[-1238.252,-598.554], [864.254,1046.197]]);
var OuterRimSOverlay = L.imageOverlay(OuterRimSUrl, OuterRimSBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

/******** Others *******/

var GalaxyTimelinesUrl = Otherspath + 'Galaxy_2.png';
var GalaxyTimelinesBounds = L.latLngBounds([[-1224.128,-647.462], [881.192,1051.866]]);
var GalaxyTimelinesOverlay = L.imageOverlay(GalaxyTimelinesUrl, GalaxyTimelinesBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var GalaxyModiUrl = Otherspath + 'GalaxyModi2006_1.png';
var GalaxyModiBounds = L.latLngBounds([[-1384.564,-1084.579], [865.455,1265.44]]);
var GalaxyModiOverlay = L.imageOverlay(GalaxyModiUrl, GalaxyModiBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});

var GalaxyTFARPUrl = Otherspath + 'TFA_original_map_p3_0.png';
var GalaxyTFARPBounds = L.latLngBounds([[-1260.21,-863], [859.21,1075]]);
var GalaxyTFARPOverlay = L.imageOverlay(GalaxyTFARPUrl, GalaxyTFARPBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    
});