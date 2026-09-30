export type FoodCategory =
  | 'Packaged Snack'
  | 'Fresh Fruit'
  | 'Fresh Vegetable'
  | 'Dairy'
  | 'Bakery'
  | 'Processed Food'
  | 'Beverage'
  | 'Frozen Food'
  | 'Meat & Seafood';

export type StorageType = 'Ambient' | 'Chilled' | 'Frozen';
export type Transportation = 'Local' | 'Regional' | 'Long Distance';
export type PackagingFormat =
  | 'Flexible Pouch'
  | 'Rigid Container'
  | 'Tray + Film'
  | 'Perforated / Ventilated Produce Pack'
  | 'Carton';

export interface RecommendationInput {
  commodityName: string;
  foodCategory: FoodCategory;
  moisture: number | '';
  fatContent: number | '';
  pH: number | '';
  respirationRate: string;
  shelfLife: number | '';
  storageType: StorageType;
  storageTemp: number | '';
  humidity: number | '';
  transportation: Transportation;
  packagingFormat: PackagingFormat;
  priorities: string[];
}

export type BarrierLevel = 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
export type Grade = 'Low' | 'Medium' | 'Medium–High' | 'High';

export interface MaterialSpec {
  id: string;
  name: string;
  structure: string;
  applications: string;
  barrierLevel: string;
  strength: string;
  sealability: string;
  sustainability: string;
  cost: string;
  otr: string;
  wvtr: string;
  thickness: string;
}

export interface RecommendationResult {
  materialName: string;
  structure: string;
  compatibilityScore: number;
  shelfLifeTarget: string;
  storageConditions: string;
  packagingFormat: string;
  otr: string;
  wvtr: string;
  thickness: string;
  sealability: string;
  mechanicalStrength: string;
  mapSuitability: string;
  mapO2?: string;
  mapCO2?: string;
  mapNote?: string;
  whyThisMaterial: string;
  fssaiGuidance: string;
  sustainability: string;
  costCategory: string;
  alternative: { name: string; structure: string; note: string };
}

export const EMPTY_INPUT: RecommendationInput = {
  commodityName: '',
  foodCategory: 'Packaged Snack',
  moisture: '',
  fatContent: '',
  pH: '',
  respirationRate: '',
  shelfLife: '',
  storageType: 'Ambient',
  storageTemp: '',
  humidity: '',
  transportation: 'Regional',
  packagingFormat: 'Flexible Pouch',
  priorities: ['Shelf Life', 'Food Safety'],
};
