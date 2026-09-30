import type { RecommendationInput, RecommendationResult } from './types';

interface Scenario {
  match: (i: RecommendationInput) => boolean;
  result: RecommendationResult;
}

const POTATO_CHIPS: RecommendationResult = {
  materialName: 'Metallized PET/PE Laminate',
  structure: 'PET / MET-PET / PE',
  compatibilityScore: 94,
  shelfLifeTarget: '180 days',
  storageConditions: 'Ambient — 25 °C at 50% RH',
  packagingFormat: 'Flexible Pouch',
  otr: 'Very Low',
  wvtr: 'Very Low',
  thickness: '80–100 μm',
  sealability: 'High',
  mechanicalStrength: 'High',
  mapSuitability: 'Not required — high-barrier ambient pack',
  whyThisMaterial:
    'Potato chips contain significant fat and are sensitive to oxygen-driven rancidity and moisture-related loss of crispness. A high-barrier metallized laminate provides strong oxygen and moisture protection while maintaining suitable mechanical strength and seal integrity for long-distance distribution.',
  fssaiGuidance:
    'Flexible multi-layer laminates used for fatty snacks should comply with FSSAI Packaging Regulation (2024) migration limits. Printed outer layers must not transfer ink to the food contact surface. Verification against IS 14969 / FSSAI migration testing is required for the specific laminate structure.',
  sustainability:
    'Multi-layer metallized laminates are difficult to recycle through conventional streams. Consider mono-material recyclable alternatives where barrier requirements allow, or participate in dedicated laminate recovery programs.',
  costCategory: 'Medium–High',
  alternative: {
    name: 'Aluminum Foil Laminate',
    structure: 'PET / Al Foil / PE',
    note: 'Higher absolute barrier but greater material cost and lower recyclability.',
  },
};

const FRESH_MANGO: RecommendationResult = {
  materialName: 'Breathable / Micro-perforated Food-grade Film',
  structure: 'Micro-perforated BOPP / PE',
  compatibilityScore: 89,
  shelfLifeTarget: '14 days',
  storageConditions: 'Chilled — 10 °C at 85% RH',
  packagingFormat: 'Perforated / Ventilated Produce Pack',
  otr: 'Controlled / Moderate',
  wvtr: 'Moderate',
  thickness: '30–50 μm',
  sealability: 'Medium–High',
  mechanicalStrength: 'Medium–High',
  mapSuitability: 'Recommended for controlled atmosphere applications',
  mapO2: '3–5%',
  mapCO2: '5–10%',
  mapNote:
    'Target range — commodity-specific MAP values require experimental validation.',
  whyThisMaterial:
    'Fresh mango is a high-respiration produce that continues to respire after harvest. A sealed high-barrier pack would cause anaerobic conditions and off-flavours. A micro-perforated film allows controlled gas exchange to balance respiration while protecting against moisture loss and physical damage during chilled long-distance transport.',
  fssaiGuidance:
    'Food-grade films for fresh produce must comply with FSSAI Packaging Regulation (2024) and should not transfer non-permitted substances. Perforated films used in MAP should be validated for the specific commodity. Compliance verification through migration and sensory testing is required before commercial use.',
  sustainability:
    'Mono-layer perforated films are recyclable in suitable polyolefin streams and generally lighter than multilayer laminates, reducing per-pack material usage.',
  costCategory: 'Medium',
  alternative: {
    name: 'Biodegradable Film',
    structure: 'PLA / cellulose-based perforated film',
    note: 'Better end-of-life profile but shorter shelf-life control and higher unit cost.',
  },
};

const SCENARIOS: Scenario[] = [
  {
    match: (i) =>
      i.foodCategory === 'Packaged Snack' &&
      Number(i.moisture) <= 5 &&
      Number(i.fatContent) >= 25 &&
      Number(i.shelfLife) >= 120 &&
      i.storageType === 'Ambient' &&
      i.packagingFormat === 'Flexible Pouch',
    result: POTATO_CHIPS,
  },
  {
    match: (i) =>
      i.foodCategory === 'Fresh Fruit' &&
      Number(i.moisture) >= 70 &&
      Number(i.fatContent) <= 3 &&
      Number(i.shelfLife) <= 21 &&
      i.storageType === 'Chilled' &&
      i.packagingFormat === 'Perforated / Ventilated Produce Pack',
    result: FRESH_MANGO,
  },
];

const GENERIC_RESULT = (input: RecommendationInput): RecommendationResult => {
  const highMoisture = Number(input.moisture) >= 60;
  const highFat = Number(input.fatContent) >= 20;
  const longShelf = Number(input.shelfLife) >= 90;

  if (highMoisture && (input.foodCategory === 'Fresh Fruit' || input.foodCategory === 'Fresh Vegetable')) {
    return {
      ...FRESH_MANGO,
      compatibilityScore: 78,
      shelfLifeTarget: `${input.shelfLife} days`,
      storageConditions: `${input.storageType} — ${input.storageTemp} °C at ${input.humidity}% RH`,
    };
  }
  if (highFat || longShelf || input.storageType === 'Ambient') {
    return {
      ...POTATO_CHIPS,
      compatibilityScore: 76,
      shelfLifeTarget: `${input.shelfLife} days`,
      storageConditions: `${input.storageType} — ${input.storageTemp} °C at ${input.humidity}% RH`,
    };
  }
  return {
    materialName: 'PP Tray + Perforated Film Lid',
    structure: 'PP tray / micro-perforated PET lid',
    compatibilityScore: 72,
    shelfLifeTarget: `${input.shelfLife} days`,
    storageConditions: `${input.storageType} — ${input.storageTemp} °C at ${input.humidity}% RH`,
    packagingFormat: input.packagingFormat,
    otr: 'Moderate',
    wvtr: 'Moderate',
    thickness: '40–80 μm film / tray base',
    sealability: 'High',
    mechanicalStrength: 'High',
    mapSuitability: 'Suitable for semi-rigid MAP formats',
    whyThisMaterial:
      'A semi-rigid PP tray with a perforated film lid balances mechanical protection, gas exchange and seal integrity for chilled foods with moderate moisture and shelf-life requirements.',
    fssaiGuidance:
      'Food-contact tray and lid materials must comply with FSSAI Packaging Regulation (2024) migration limits. Compliance verification through testing is required for the specific structure.',
    sustainability: 'PP trays are recyclable in suitable streams where collection is available.',
    costCategory: 'Medium',
    alternative: {
      name: 'PET Tray + Film Lid',
      structure: 'rPET tray / perforated PET lid',
      note: 'Higher recyclability with comparable performance for chilled applications.',
    },
  };
};

export function generateRecommendation(input: RecommendationInput): RecommendationResult {
  const matched = SCENARIOS.find((s) => s.match(input));
  if (matched) {
    const r = matched.result;
    return {
      ...r,
      shelfLifeTarget: `${input.shelfLife} days`,
      storageConditions: `${input.storageType} — ${input.storageTemp} °C at ${input.humidity}% RH`,
    };
  }
  return GENERIC_RESULT(input);
}

export const PROCESSING_STEPS = [
  'Analyzing food properties...',
  'Evaluating packaging requirements...',
  'Matching material properties...',
  'Preparing recommendation...',
];
