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
    interactive: true,
    pane:"deep_core_EA",
    pmIgnore:true,
    snapIgnore: true
});

var CoreUrl = EApath + 'Core_14.png';
var CoreBounds = L.latLngBounds([[-471.726,-230.637], [151.147,223.083]]);
var CoreOverlay = L.imageOverlay(CoreUrl, CoreBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pane:"core_EA",
    pmIgnore:true,
    snapIgnore: true
});

var ColoniesUrl = EApath + 'Colonies_13.png';
var ColoniesBounds = L.latLngBounds([[-543.935,-284.252], [248.756,289.736]]);
var ColoniesOverlay = L.imageOverlay(ColoniesUrl, ColoniesBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pane:"colonies_EA",
    pmIgnore:true,
    snapIgnore: true
});

var InnerRimUrl = EApath + 'InnerRim_12.png';
var InnerRimBounds = L.latLngBounds([[-636.228,-336.228], [408.299,434.997]]);
var InnerRimOverlay = L.imageOverlay(InnerRimUrl, InnerRimBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var ExpansionRegionUrl = EApath + 'ExpansionRegion_11.png';
var ExpansionRegionBounds = L.latLngBounds([[-760.454,-343,212], [382.445,497.212]]);
var ExpansionRegionOverlay = L.imageOverlay(ExpansionRegionUrl, ExpansionRegionBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var MidRimUrl = EApath + 'MidRim_9.png';
var MidRimBounds = L.latLngBounds([[-928.979,-369.632], [583.907,731.87]]);
var MidRimOverlay = L.imageOverlay(MidRimUrl, MidRimBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var HuttSpaceUrl = EApath + 'HuttSpace_10.png';
var HuttSpaceBounds = L.latLngBounds([[-451.101,518.394], [169.507,987.382]]);
var HuttSpaceOverlay = L.imageOverlay(HuttSpaceUrl, HuttSpaceBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var OuterRimUrl = EApath + 'OuterRim_8.png';
var OuterRimBounds = L.latLngBounds([[-1284.836,-606.049], [867.668,1015.75]]);
var OuterRimOverlay = L.imageOverlay(OuterRimUrl, OuterRimBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var GalaxyFRUrl = EApath + 'GalaxyFrenchHRversion_7.png';
var GalaxyFRBounds = L.latLngBounds([[-768.238,-1097.3], [438.301,1199.876]]);
var GalaxyFROverlay = L.imageOverlay(GalaxyFRUrl, GalaxyFRBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var GalaxyTEAUrl = EApath + 'TEA_galaxy_helmert.png';
var GalaxyTEABounds = L.latLngBounds([[-1198.88,-1099.05], [863.85,1197.91]]);
var GalaxyTEAOverlay = L.imageOverlay(GalaxyTEAUrl, GalaxyTEABounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var ClientsUrl = EApath + 'TEA_client_states_tps.png';
var ClientsBounds = L.latLngBounds([[-1292.77,-587.40], [851.60,999.53]]);
var ClientsOverlay = L.imageOverlay(ClientsUrl, ClientsBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var ArkanisUrl = EApath + 'arkanis_p2_18.png';
var ArkanisBounds = L.latLngBounds([[-729.690,598.232], [-622.432,678.126]]);
var ArkanisOverlay = L.imageOverlay(ArkanisUrl, ArkanisBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pane:'arkanis_EA',
    pmIgnore:true,
    snapIgnore: true
});

var KashyyykUrl = EApath + 'Kashyyyk_17.png';
var KashyyykBounds = L.latLngBounds([[-115.664,388.567], [153.638,743.252]]);
var KashyyykOverlay = L.imageOverlay(KashyyykUrl, KashyyykBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pane:'kashyyyk_EA',
    pmIgnore:true,
    snapIgnore: true
});

var YavinUrl = EApath + 'YavinandtheGordianReach_16.png';
var YavinBounds = L.latLngBounds([[327.447,377.600], [502.030,606.396]]);
var YavinOverlay = L.imageOverlay(YavinUrl, YavinBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pane:'yavin_EA',
    pmIgnore:true,
    snapIgnore: true
});

var CorporateUrl = EApath + 'TEA_corporate_sector_helmert.png';
var CorporateBounds = L.latLngBounds([[560.46,666.28], [641.92,771.41]]);
var CorporateOverlay = L.imageOverlay(CorporateUrl, CorporateBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pane:'yavin_EA',
    pmIgnore:true,
    snapIgnore: true
});

var HapesUrl = EApath + 'TEA_hapes_freehand.png';
var HapesBounds = L.latLngBounds([[38.50,343.59], [71.77,374.94]]);
var HapesOverlay = L.imageOverlay(HapesUrl, HapesBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pane:'yavin_EA',
    pmIgnore:true,
    snapIgnore: true
});

var CentralityUrl = EApath + 'TEA_centrality_freehand.png';
var CentralityBounds = L.latLngBounds([[110.15,799.61], [198.34,982.71]]);
var CentralityOverlay = L.imageOverlay(CentralityUrl, CentralityBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pane:'yavin_EA',
    pmIgnore:true,
    snapIgnore: true
});

var TionUrl = EApath + 'TEAO_Tion_freehand.png';
var TionBounds = L.latLngBounds([[301.18,649.46], [473.66,877.07]]);
var TionOverlay = L.imageOverlay(TionUrl, TionBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pane:'yavin_EA',
    pmIgnore:true,
    snapIgnore: true
});

/******** The Essential Atlas Extra parts*******/

var ExpensionRegionSUrl = EApath + 'ExpansionRegionS_6.png';
var ExpensionRegionSBounds = L.latLngBounds([[-763.645,-349.972], [395.394,528.087]]);
var ExpensionRegionSOverlay = L.imageOverlay(ExpensionRegionSUrl, ExpensionRegionSBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var MidRimSUrl = EApath + 'MidRimS_5.png';
var MidRimSBounds = L.latLngBounds([[-949.099,-411.266], [518.607,751.085]]);
var MidRimSOverlay = L.imageOverlay(MidRimSUrl, MidRimSBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var OuterRimSUrl = EApath + 'OuterRimS_4.png';
var OuterRimSBounds = L.latLngBounds([[-1238.252,-598.554], [864.254,1046.197]]);
var OuterRimSOverlay = L.imageOverlay(OuterRimSUrl, OuterRimSBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

/******** Others *******/

var GalaxyTimelinesUrl = Otherspath + 'Galaxy_2.png';
var GalaxyTimelinesBounds = L.latLngBounds([[-1224.128,-647.462], [881.192,1051.866]]);
var GalaxyTimelinesOverlay = L.imageOverlay(GalaxyTimelinesUrl, GalaxyTimelinesBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var GalaxyModiUrl = Otherspath + 'GalaxyModi2006_1.png';
var GalaxyModiBounds = L.latLngBounds([[-1384.564,-1084.579], [865.455,1265.44]]);
var GalaxyModiOverlay = L.imageOverlay(GalaxyModiUrl, GalaxyModiBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});

var GalaxyTFARPUrl = Otherspath + 'TFA_original_map_tps.png';
var GalaxyTFARPBounds = L.latLngBounds([[-1255.37,-865.94], [852.97,1068.11]]);
var GalaxyTFARPOverlay = L.imageOverlay(GalaxyTFARPUrl, GalaxyTFARPBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
    pmIgnore:true,
    snapIgnore: true
});