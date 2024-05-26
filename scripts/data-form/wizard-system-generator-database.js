const wizardSystemGeneratorDatabase = {};

// The mass‐luminosity relation holds only for main sequence stars. Two giant or supergiant stars with the same luminosities and surface temperatures may have dramatically different masses.
// We will simplify with star type

// Object mass distribution depending on star type
wizardSystemGeneratorDatabase["star"] = {
  "0": { // Hypergiant
    "distribution": 0.00001, // 12 hypergiant known in our galaxy as of 2012 | https://phys.org/news/2012-12-hypergiant-star.html#:~:text=The%20powerhouse%20is%20therefore%20visible,hypergiants%20known%20in%20our%20Galaxy.
    "starMassDistributionWithinSystem": [0.9,0.999],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.9,0.999],
      "circumstellarDust": [0,0.1],
      "planets": [0,0.0001]
    },
    "O": {
      "massInSolarMass": [30,150],
      "sizeRangeInSolarRadius": [500,10000],
    },
    "B": {
      "massInSolarMass": [20,80],
      "sizeRangeInSolarRadius": [300,5000],
    },
    "A": {
      "massInSolarMass": [15,60],
      "sizeRangeInSolarRadius": [200,2000],
    },
    "F": {
      "massInSolarMass": [10,40],
      "sizeRangeInSolarRadius": [150,2000],
    },
    "G": {
      "massInSolarMass": [5,30],
      "sizeRangeInSolarRadius": [100,1500],
    },
    "K": {
      "massInSolarMass": [3,20],
      "sizeRangeInSolarRadius": [200,4000],
    },
    "M": {
      "massInSolarMass": [2,10],
      "sizeRangeInSolarRadius": [500,10000],
    },
  },
  "I": { // Brightest Supergiant
    "distribution": 0.00033, // 0.1% of supergiant type I and II, type I might be less common
    "starMassDistributionWithinSystem":  [0.9,0.999],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.9,0.999],
      "circumstellarDust": [0,0.01],
      "planets": [0,0.0001]
    },
    "O": {
      "massInSolarMass": [15,100],
      "sizeRangeInSolarRadius": [100,1000],
    },
    "B": {
      "massInSolarMass": [8,20],
      "sizeRangeInSolarRadius": [30,200],
    },
    "A": {
      "massInSolarMass": [5,15],
      "sizeRangeInSolarRadius": [15,100],
    },
    "F": {
      "massInSolarMass": [4,10],
      "sizeRangeInSolarRadius": [10,70],
    },
    "G": {
      "massInSolarMass": [3,8],
      "sizeRangeInSolarRadius": [8,40],
    },
    "K": {
      "massInSolarMass": [2,6],
      "sizeRangeInSolarRadius": [15,200],
    },
    "M": {
      "massInSolarMass": [1,3],
      "sizeRangeInSolarRadius": [100,1000],
    },
  },
  "II": { // Bright giant
    "distribution": 0.00066, // 0.1% of supergiant type I and II, type II might be more common
    "starMassDistributionWithinSystem":  [0.9,0.999],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.9,0.999],
      "circumstellarDust": [0,0.01],
      "planets": [0,0.0001]
    },
    "O": {
      "massInSolarMass": [20,60],
      "sizeRangeInSolarRadius": [50,150],
    },
    "B": {
      "massInSolarMass": [5,20],
      "sizeRangeInSolarRadius": [30,80],
    },
    "A": {
      "massInSolarMass": [2,10],
      "sizeRangeInSolarRadius": [15,40],
    },
    "F": {
      "massInSolarMass": [1.5,5],
      "sizeRangeInSolarRadius": [10,25],
    },
    "G": {
      "massInSolarMass": [1,3],
      "sizeRangeInSolarRadius": [8,20],
    },
    "K": {
      "massInSolarMass": [0.5,2],
      "sizeRangeInSolarRadius": [15,80],
    },
    "M": {
      "massInSolarMass": [0.3,1.5],
      "sizeRangeInSolarRadius": [80,400],
    },
  },
  "III": { // Giant
    "distribution": 0.0015, // 1 to 3%
    "starMassDistributionWithinSystem": [0.9,0.999],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.9,0.999],
      "circumstellarDust": [0.01,0.1],
      "planets": [0,0.0001]
    },
    "O": { // https://en.wikipedia.org/wiki/Blue_giant
      "massInSolarMass": [10,80],
      "sizeRangeInSolarRadius": [40,100],
    },
    "B": { // https://en.wikipedia.org/wiki/Blue_giant
      "massInSolarMass": [5,20],
      "sizeRangeInSolarRadius": [20,50],
    },
    "A": { // https://en.wikipedia.org/wiki/Blue_giant
      "massInSolarMass": [2,10],
      "sizeRangeInSolarRadius": [10,30],
    },
    "F": {
      "massInSolarMass": [1.5,5], // https://en.wikipedia.org/wiki/Yellow giants
      "sizeRangeInSolarRadius": [6,15],
    },
    "G": {
      "massInSolarMass": [1,3], // https://en.wikipedia.org/wiki/Yellow giants
      "sizeRangeInSolarRadius": [5,10],
    },
    "K": {
      "massInSolarMass": [0.5,2], // https://en.wikipedia.org/wiki/Red_giant
      "sizeRangeInSolarRadius": [10,50],
    },
    "M": {
      "massInSolarMass": [0.3,1.5], // https://en.wikipedia.org/wiki/Red_giant
      "sizeRangeInSolarRadius": [60,300],
    },
  },
  "IV": { // SubGiant
    "distribution": 0.009, // Less than 1%
    "starMassDistributionWithinSystem": [0.9,0.999],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.9,0.999],
      "circumstellarDust": [0.01,0.1],
      "planets": [0,0.0001]
    },
    "distribution": 0.0015, // 1 to 3%
    "O": {
      "massInSolarMass": [15,25],
      "sizeRangeInSolarRadius": [8,18],
    },
    "B": {
      "massInSolarMass": [3,15],
      "sizeRangeInSolarRadius": [5,10],
    },
    "A": {
      "massInSolarMass": [2,3],
      "sizeRangeInSolarRadius": [3,6],
    },
    "F": {
      "massInSolarMass": [1.5,2],
      "sizeRangeInSolarRadius": [2,4],
    },
    "G": {
      "massInSolarMass": [1,1.5],
      "sizeRangeInSolarRadius": [1.5,3],
    },
    "K": {
      "massInSolarMass": [0.8,1],
      "sizeRangeInSolarRadius": [1.3,2.5],
    },
    "M": {
      "massInSolarMass": [0.3,8],
      "sizeRangeInSolarRadius": [1,2],
    },
  },
  "V": { // Main sequence | Source : https://en.wikipedia.org/wiki/Stellar_classification
    "distribution": 0.9, // https://science.nasa.gov/universe/stars/types/
    "starMassDistributionWithinSystem": [0.9,0.999],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.9,0.999],
      "circumstellarDust": [0.01,0.1],
      "planets": [0,0.0001]
    },
    "O": { // Star type At the moment only O3V to O9V star are classified | https://en.wikipedia.org/wiki/O-type_main-sequence_star
      "distribution": 0.00000003,
      "temperatureRange": [33300, 44900],  // Kelvin // Common max temperature | https://en.wikipedia.org/wiki/O-type_main-sequence_star
      "hydrogenPresence": "weak",
      "sizeRangeInSolarRadius": [6.6, 15], // Common max radius for O3V star | https://en.wikipedia.org/wiki/O-type_main-sequence_star
      "massInSolarMass": [16,200], // Max | https://science.nasa.gov/universe/stars/types/
    },
    "B": { // Star type
      "distribution": 0.0013,
      "temperatureRange": [10700,31400], // Kelvin | https://en.wikipedia.org/wiki/B-type_main-sequence_star
      "hydrogenPresence": "medium",
      "sizeRangeInSolarRadius": [1.8,7.16], // Max | https://en.wikipedia.org/wiki/B-type_main-sequence_star
      "massInSolarMass":  [2.1,17.7], // Max | https://en.wikipedia.org/wiki/B-type_main-sequence_star
    },
    "A": { // Star type
      "distribution": 0.006,
      "temperatureRange": [7400,9700], // Kelvin | https://en.wikipedia.org/wiki/A-type_main-sequence_star
      "hydrogenPresence": "strong",
      "sizeRangeInSolarRadius": [1.747,2.193],  // Min/max | https://en.wikipedia.org/wiki/A-type_main-sequence_star
      "massInSolarMass":  [1.4,2.18], // Max | https://en.wikipedia.org/wiki/A-type_main-sequence_star
    },
    "F": { // Star type
      "distribution": 0.03,
      "temperatureRange": [6050,7220], // Kelvin | https://en.wikipedia.org/wiki/F-type_main-sequence_star
      "hydrogenPresence": "medium",
      "sizeRangeInSolarRadius": [1.13,1.61], // Min/max | https://en.wikipedia.org/wiki/F-type_main-sequence_star
      "massInSolarMass":  [1.04,1.61], // Max | https://en.wikipedia.org/wiki/F-type_main-sequence_star
    },
    "G": { // Star type
      "distribution": 0.076,
      "temperatureRange": [5380,5930], // Kelvin | https://en.wikipedia.org/wiki/G-type_main-sequence_star
      "hydrogenPresence": "weak",
      "sizeRangeInSolarRadius": [0.853,1.35], // min/max | https://en.wikipedia.org/wiki/G-type_main-sequence_star
      "massInSolarMass":  [0.8,1.06], // max | https://en.wikipedia.org/wiki/G-type_main-sequence_star
    },
    "K": { // Star type
      "distribution": 0.121,
      "temperatureRange": [3930,5270], // Kelvin | https://en.wikipedia.org/wiki/K-type_main-sequence_star
      "hydrogenPresence": "very weak",
      "sizeRangeInSolarRadius": [0.608,0.9], // Common min radius for K9V star  | https://en.wikipedia.org/wiki/K-type_main-sequence_star
      "massInSolarMass":  [0.45,0.88], // Common Max mass for K0V star | https://en.wikipedia.org/wiki/K-type_main-sequence_star
    },
    "M": { // Star type
      "distribution": 0.765,
      "temperatureRange": [2380,3850], // Kelvin | https://en.wikipedia.org/wiki/Red_dwarf
      "hydrogenPresence": "very weak",
      "sizeRangeInSolarRadius": [0.102,0.7],  // Common min radius size for M9V star | https://en.wikipedia.org/wiki/Red_dwarf
      "massInSolarMass":  [0.079,0.57], // Common Min/Max mass for M9V to M0V star | https://en.wikipedia.org/wiki/Red_dwarf
    },
  },
  "VI": { // SubDwarf
    "distribution": 0.009, // Less than 1%
    "starMassDistributionWithinSystem": [0.9,0.99],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0,3],
      "circumstellarDust": [0.01,0.1],
      "planets": [0,0.0001]
    },
    "O": { // https://en.wikipedia.org/wiki/Subdwarf_O_star
      "massInSolarMass": [0.5,1],
      "sizeRangeInSolarRadius": [4,12],
    },
    "B": { // https://en.wikipedia.org/wiki/Subdwarf_B_star
      "massInSolarMass": [0.3,0.7],
      "sizeRangeInSolarRadius": [2,6],
    },
    "A": { // https://en.wikipedia.org/wiki/Subdwarf_B_star
      "massInSolarMass": [0.6,1.4],
      "sizeRangeInSolarRadius": [1.3,2.5],
    },
    "F": { // https://en.wikipedia.org/wiki/Subdwarf_B_star
      "massInSolarMass": [0.5,0.9],
      "sizeRangeInSolarRadius": [1.1,1.4],
    },
    "G": { // https://en.wikipedia.org/wiki/Subdwarf_B_star
      "massInSolarMass": [0.5,0.8],
      "sizeRangeInSolarRadius": [0.8,1],
    },
    "K": { // https://en.wikipedia.org/wiki/Subdwarf_B_star
      "massInSolarMass": [0.4,0.7],
      "sizeRangeInSolarRadius": [0.6,0.8],
    },
    "M": { // https://en.wikipedia.org/wiki/Subdwarf_B_star
      "massInSolarMass": [0.1,0.3],
      "sizeRangeInSolarRadius": [0.1,0.5],
    }
  },
  "D": { // White dwarf
    "distribution": 0.075, // 5 to 10%
    "massInSolarMass": [0.5,0.98],  // https://en.wikipedia.org/wiki/White_dwarf
    "starMassDistributionWithinSystem": [0.99,0.999],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.99,0.999],
      "circumstellarDust": [0.01,0.1],
      "planets": [0,0.0001]
    }
  },
  "L": { // Brown dwarf
    "massInSolarMass": [0.013,0.08], // https://en.wikipedia.org/wiki/Brown_dwarf
    "sizeRangeInSolarRadius": [0.09,0.11],
    "starMassDistributionWithinSystem": [0.9,0.99],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.99,0.999],
      "circumstellarDust": [0.01,0.1],
      "planets": [0,0.0001]
    }
  },
  "Y": { // Cooler Brown dwarf
    "massInSolarMass": [0.013,0.08], // https://en.wikipedia.org/wiki/Brown_dwarf
    "sizeRangeInSolarRadius": [0.08,0.1],
    "starMassDistributionWithinSystem": [0.9,0.99],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.99,0.999],
      "circumstellarDust": [0.01,0.1],
      "planets": [0,0.0001]
    }
  },
  "T": { // Cool Brown dwarf
    "massInSolarMass": [0.013,0.08], // https://en.wikipedia.org/wiki/Brown_dwarf
    "sizeRangeInSolarRadius": [0.05,0.09],
    "starMassDistributionWithinSystem": [0.9,0.99],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.99,0.999],
      "circumstellarDust": [0.01,0.1],
      "planets": [0,0.0001]
    }
  },
  "W": { // Wolf-Rayet
    "starMassDistributionWithinSystem": [0.9,0.99],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.1,0.2],
      "circumstellarDust": [0.05,0.1],
      "planets": [0,0.0001]
    },
    "WN": { // Wolf-Rayet (Nitrogen-rich)
      "massInSolarMass": [10,25], // https://en.wikipedia.org/wiki/Wolf%E2%80%93Rayet_star
      "sizeRangeInSolarRadius": [0.89,25],  // https://en.wikipedia.org/wiki/Wolf%E2%80%93Rayet_star
    },
    "WC": { // Wolf-Rayet (Carbon-rich)
      "massInSolarMass": [10,25], // https://en.wikipedia.org/wiki/Wolf%E2%80%93Rayet_star
      "sizeRangeInSolarRadius": [0.7,8.7],  // https://en.wikipedia.org/wiki/Wolf%E2%80%93Rayet_star
    },
    "WO": { // Wolf-Rayet (Oxygen-rich)
      "massInSolarMass": [10,20], // https://en.wikipedia.org/wiki/Wolf%E2%80%93Rayet_star
      "sizeRangeInSolarRadius": [0.7,8.7],  // https://en.wikipedia.org/wiki/Wolf%E2%80%93Rayet_star
    },
    "WN/C": { // Wolf-Rayet (Transition type)
      "massInSolarMass": [10,25], // https://en.wikipedia.org/wiki/Wolf%E2%80%93Rayet_star
      "sizeRangeInSolarRadius": [0.7,8.7],  // https://en.wikipedia.org/wiki/Wolf%E2%80%93Rayet_star
    },
  },
  "S": { // Zirconium star
    "massInSolarMass": [0.8,4],
    "starMassDistributionWithinSystem": [0.99,0.999],
    "sizeRangeInSolarRadius": [20,300],
    "otherBodiesMassDistributionWithinSystem": {
      "circumstellarDust": [0.001,0.01],
      "planets": [0,0.0001]
    }
  },
  "Neutron Star": {
    "massInSolarMass": [1.1,2.16],
    "starMassDistributionWithinSystem": [0.99,0.999],
    "sizeRangeInSolarRadius": [0.00001436,0.00002872],
    "otherBodiesMassDistributionWithinSystem": {
      "companionStar": [0.01,0.5],
      "circumstellarDust": [0,0.01],
      "planets": [0,0.0001]
    }
  },
  "Black Hole": {
    "Stellar-mass Black Hole": {
      "starMassDistributionWithinSystem": [0.9, 0.99],
      "sizeRangeInSolarRadius": [0.0000127,0.0000847],
      "massInSolarMass": [3,20],
      "otherBodiesMassDistributionWithinSystem": {
        "companionStar": [0.01,0.1],
        "accretionDisk": [0,0.01],
        "planets": [0,0.001]
      },
    },
    "Intermediate-mass Black Hole":{
      "starMassDistributionWithinSystem": [0.95, 0.999],
      "sizeRangeInSolarRadius": [0.000424,0.00424],
      "massInSolarMass": [100,1000],
      "otherBodiesMassDistributionWithinSystem": {
        "companionStar": [0.01,0.05],
        "accretionDisk": [0,0.03],
        "planets": [0,0.001]
      },
    },
    "Supermassive Black Hole": {
      "starMassDistributionWithinSystem": [0.999, 0.9999999999999999],
      "sizeRangeInSolarRadius": [0.424,4240],
      "massInSolarMass": [100000,10000000000],
      "otherBodiesMassDistributionWithinSystem": {
        "companionStar": [0,0.001],
        "accretionDisk": [0,0.01],
        "planets": [0,0.00000000000000000000000000001]
      },
    },
  },
  "C": { // Carbon star
    "starMassDistributionWithinSystem": [0.8,0.95],
    "otherBodiesMassDistributionWithinSystem": {
      "circumstellarDust": [0.05,0.1],
      "planets": [0,0.0001],
    },
    "C": {
      "massInSolarMass": [0.8,3],
      "sizeRangeInSolarRadius": [100,200],
    },
    "C-R": {
      "massInSolarMass": [0.8,2],
      "sizeRangeInSolarRadius": [50,300],
    },
    "C-N": {
      "massInSolarMass": [1,3],
      "sizeRangeInSolarRadius": [200,600],
    },
    "C-J": { 
      "massInSolarMass": [0.8,3],
      "sizeRangeInSolarRadius": [100,500],
    },
    "C-H": { 
      "massInSolarMass": [0.5,1.5],
      "sizeRangeInSolarRadius": [20,200],
    },
    "C-Hd": { 
      "massInSolarMass": [0.5,1.5],
      "sizeRangeInSolarRadius": [100,300],
    },
  },
};

// https://www.planetary.org/space-images/mass-radius-diagram-wide-seager
// https://www.planetary.org/space-images/mass-radius-diagram-tpr-2019-1
// https://planetary.s3.amazonaws.com/web/assets/pictures/tpr2019-1-mass-radius-diagram.png

wizardSystemGeneratorDatabase["planet"] = {
  // a, b for affine function with min , average (most value area) and max bounds | extrapolation of https://planetary.s3.amazonaws.com/web/assets/pictures/tpr2019-1-mass-radius-diagram.png
  "massDiameterRatioRangeSimple": [ // calculate the 3 results with affine function and give it to the betaPDF function
    [0.04145466981753554, 0.7447145295982642], // min bound
    [0.09273623870434804, 0.7381761295651956], // average with most result area
    [4.167747026661406, 0.21861225410067073], // max bound
  ],
  "massDiameterRatioRangeMultiple": [ // take nearest y axis result for nearest x axis point and give it to the betaPDF function (WARNING for betaPDF a must be lower bounding, b higher and x middle value, do you average before using function !)
    // Minimum (more or less)
    {
      "x": [1.04848144,1.12438719,1.2057882,1.2930823,1.38669615,1.48708724,1.59474625,1.71019932,1.83401072,1.96678555,2.10917274,2.26186817,2.42561813,2.60122291,2.78954075,2.99149203,3.20806376,3.44031438,3.689379,3.95647487,4.24290738,4.55007643,4.87948325,5.23273778,5.61156648,6.01782082,6.4534863,6.92069217,7.42172183,7.95902398,8.53522459,9.15313976,9.81578944,10.52641223,11.2884812,12.10572082,12.98212524,13.92197773,14.92987167,16.01073299,17.16984423,18.41287036,19.74588646,21.17540745,22.70841989,24.35241612,26.11543091,28.00608074,30.03360583,32.2079154,34.53963605,37.04016368,39.72171924,42.59740839,45.68128561,48.98842286,52.53498325,56.33830003,60.41696131,64.79090089,69.48149572,74.51167032,79.90600889,85.69087539,91.89454243,98.54732946,105.68175092,113.33267516,121.53749485,130.33630976,139.77212269,149.89104967,160.74254537,172.37964473,184.85922224,198.24226985,212.59419508,227.98514069,244.49032747,262.19042192,281.17193043,301.5276221,323.35698216,346.76669813,371.87118129,398.7931258,427.6641084,458.62523144,491.82781248,527.43412387,565.6181858,606.56661682,650.47954588,697.57159044,748.0729054,802.23030793,860.30848372,922.59128063,989.38309596,1061.01036409,1137.82315193],
      "y": [0.52264222,0.53892014,0.55483112,0.57044006,0.58582561,0.60107983,0.61630791,0.63162813,0.64717187,0.66308406,0.67952378,0.69666529,0.71469947,0.73383573,0.75430447,0.77631431,0.79971821,0.82416065,0.84923649,0.87448766,0.89940105,0.92340907,0.94590265,0.96681461,0.98703618,1.00735126,1.02717558,1.04542205,1.06114238,1.07446189,1.08590589,1.09603827,1.10545268,1.11476687,1.1246204,1.13567592,1.14862426,1.16413534,1.18206949,1.20163279,1.22196603,1.24215122,1.26120927,1.27810509,1.29176072,1.30107718,1.30536159,1.3068706,1.30919664,1.31597067,1.33092953,1.35809432,1.40206879,1.46849246,1.56471637,1.69774009,1.86385415,2.05348341,2.25186538,2.43937839,2.60879941,2.7644825,2.91347929,3.06512546,3.22887857,3.40752158,3.60207885,3.81364066,4.0433611,4.29245497,4.56232964,4.85510707,5.17333995,5.51991122,5.89808263,6.31155124,6.7641796,7.23696417,7.6682231,8.02286523,8.29826089,8.49652425,8.62315183,8.68844825,8.71095352,8.71100367,8.70001818,8.68062565,8.65510984,8.62574493,8.59426327,8.55435933,8.49359174,8.39981874,8.26176177,8.06976728,7.83324661,7.59003647,7.37658906,7.22545784,7.16739924]
    },
    // Average (more or less)
    {
      "x": [1.03503079,1.10862597,1.18745408,1.2718872,1.36232389,1.45919102,1.56294583,1.67407805,1.79311225,1.92061029,2.05717401,2.20344799,2.36012269,2.52793763,2.70768495,2.90021308,3.10643079,3.32731148,3.56389774,3.8173063,4.08873332,4.37945997,4.69085854,5.0243989,5.38165543,5.76431444,6.17418217,6.61319327,7.08341996,7.5870818,8.12655618,8.70438953,9.32330933,9.98623701,10.69630172,11.4568551,12.27148713,13.14404302,14.07864142,15.07969381,16.15192536,17.30039722,18.53053041,19.84813139,21.25941951,22.77105633,24.39017707,26.12442431,27.98198405,29.97162433,32.10273665,34.38538028,36.83032977,39.44912576,42.25412949,45.25858113,48.4766623,51.92356298,55.61555323,59.57005998,63.80574929,68.34261446,73.20207039,78.40705469,83.98213592,89.95362958,96.34972231,103.20060493,110.53861498,118.39838934,126.8170277,135.83426771,145.49267255,155.83783181,166.91857671,178.78721057,191.49975571,205.11621788,219.70086949,235.32255301,252.0550059,269.97720867,289.17375769,309.73526451,331.75878352,355.34827014,380.61507144,407.67845177,436.66615567,467.71501088,500.9715742,536.59282323,574.74689737,615.61389145,659.38670585,706.27195696,756.49095252,810.28073621,867.89520652,929.60631525,995.70535112],
      "y": [0.5440776,0.56317293,0.58162843,0.5994472,0.61664644,0.63325706,0.64932316,0.66490152,0.68006098,0.69488193,0.7094558,0.72388463,0.73828082,0.752767,0.76747604,0.78255144,0.79814775,0.8144315,0.83158227,0.84979429,0.86927831,0.8902641,0.91300339,0.9377735,0.96488176,0.99467071,1.02752452,1.0638765,1.10410723,1.14781426,1.19413366,1.24203941,1.2906821,1.34014461,1.39072607,1.44277354,1.49666118,1.55146812,1.60405923,1.65076772,1.6917136,1.73472945,1.78851424,1.84960364,1.90306575,1.94183634,1.99696764,2.11328098,2.34517912,2.69311885,3.07439347,3.40050559,3.70526797,4.06402116,4.49356822,4.96363515,5.42771627,5.84139337,6.21035532,6.55808419,6.90782188,7.26742476,7.64319425,8.0424936,8.45980822,8.86561831,9.22299121,9.51726894,9.80551573,10.16415459,10.62723161,11.1299242,11.58977856,11.96098595,12.23628885,12.55338299,12.92905269,13.14881408,13.43051722,13.7655141,14.00439514,14.17327177,14.19667396,14.18134953,14.2723985,14.78764487,15.12900357,14.60735872,14.95478377,14.49738013,14.44152042,14.19322154,13.76832565,13.41807815,13.12138683,13.21780886,13.66694881,13.93450014,13.5616925,13.09501713,11.15273919]
    },
    // Maximum (more or less)
    {
      "x": [1.05300372,1.12933407,1.21119747,1.29899499,1.3931568,1.49414423,1.60245206,1.71861093,1.84318995,1.97679947,2.12009411,2.27377592,2.43859785,2.61536743,2.80495071,3.00827654,3.2263411,3.46021276,3.71103736,3.98004379,4.26855001,4.57796952,4.9098183,5.2657222,5.64742494,6.05679662,6.49584291,6.96671489,7.47171952,8.01333104,8.59420299,9.21718132,9.88531822,10.60188716,11.3703989,12.19461867,13.07858465,14.02662774,15.04339276,16.13386125,17.30337584,18.55766645,19.90287832,21.34560218,22.8929065,24.55237213,26.33212944,28.24089816,30.28803009,32.48355493,34.83822942,37.36359003,40.07200949,42.9767574,46.09206527,49.43319621,53.01651972,56.8595919,60.98124148,65.40166203,70.14251092,75.22701541,80.6800865,86.5284409,92.800732,99.5276902,106.7422735,114.47982898,122.77826594,131.67824168,141.22336065,151.46038814,162.43947934,174.21442512,186.84291555,200.38682254,214.912503,230.49112391,247.19901105,265.11802288,284.33595166,304.94695355,327.0520099,350.75942203,376.18534185,403.45434088,432.70002061,464.06566709,497.70495288,533.78269001,572.47563743,613.97336704,658.47919246,706.21116514,757.40314269,812.30593465,871.18853127,934.33942146,1002.06800612,1074.7061141,1152.60962793],
      "y": [0.53786504,0.5439416,0.55633608,0.57490228,0.59963718,0.63064745,0.66811953,0.71229023,0.76341546,0.82173527,0.8874334,0.96059062,1.0411313,1.1287639,1.22291712,1.32267488,1.42671494,1.53325786,1.6400343,1.74428027,1.84276972,1.93189539,2.01127192,2.09193244,2.18910989,2.32104665,2.51101862,2.79138095,3.21102575,3.82724454,4.64763532,5.63395424,6.67977853,7.60994325,8.33134146,8.8297271,9.12582481,9.26580471,9.31052127,9.32692228,9.37751547,9.4749971,9.60722483,9.7616131,9.92492403,10.08305075,10.22114835,10.33119974,10.41584858,10.4788847,10.52435871,10.55650286,10.57966741,10.59827418,10.61678804,10.63970717,10.67157221,10.71699465,10.7807051,10.8676223,10.98294463,11.13226695,11.32172654,11.55645216,11.83228217,12.14126324,12.47468796,12.82330159,13.22101317,13.79048102,14.68870199,16.11931315,18.18698478,20.79685058,23.67434699,26.0167648,27.39290399,28.14118066,28.59436905,28.86282365,29.04189283,29.22389712,29.42235636,29.60022617,29.71883263,29.73914526,29.62280086,29.34119493,28.90982321,28.35935554,27.72030727,27.02202943,26.29199883,25.55538592,24.83198606,24.08040303,23.21027042,22.14427679,20.82611931,19.22743939,17.35407605]
    },
  ],
  "type": {
    "Comet": {
      "massInEarthMass": [0.0000000000001,0.000000001],
    },
    "Terrestrial": {
      "massInEarthMass": [0.1,10],
    },
    "Asteroid": {
      "massInEarthMass": [0.0000000001,0.0001],
    },
    "Chthonian Planet": {
      "massInEarthMass": [5,20],
    },
    "Carbon Planet": {
      "massInEarthMass": [0.5,10],
    },
    "Coreless Planet": {
      "massInEarthMass": [0.5,10],
    },
    "Gas Giant": {
      "massInEarthMass": [10,1000],
    },
    "Gas Dwarf": {
      "massInEarthMass": [10,50],
    },
    "Helium Planet": {
      "massInEarthMass": [100,1000],
    },
    "Hycean Planet": {
      "massInEarthMass": [2,10],
    },
    "Ice Giant": {
      "massInEarthMass": [10,50],
    },
    "Ice-Rock Planet": {
      "massInEarthMass": [0.1,10],
    },
    "Ice Planet": {
      "massInEarthMass": [0.1,10],
    },
    "Iron Planet": {
      "massInEarthMass": [0.1,5],
    },
    "Lava Planet": {
      "massInEarthMass": [0.1,10],
    },
    "Desert Planet": {
      "massInEarthMass": [0.1,10],
    },
    "Protoplanet": {
      "massInEarthMass": [0.01,0.1],
    },
    "Puffy Planet": {
      "massInEarthMass": [100,300],
    },
    "Super-puff Planet": {
      "massInEarthMass": [10,100],
    },
    "Dwarf Planet": {
      "massInEarthMass": [0.0001,0.01],
    },
    "Moon": {
      "massInEarthMass": [0.00000001,0.01],
    },
    "Large Moon": {
      "massInEarthMass": [0.0001,0.01],
    },
    "Medium-sized Moon": {
      "massInEarthMass": [0.00001,0.0001],
    },
    "Small Moon": {
      "massInEarthMass": [0.00000001,0.000001],
    },
    "Dwarf Moon": {
      "massInEarthMass": [0.0000000000001,0.00000001],
    }
  }
}