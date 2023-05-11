export type BeerT = {
  name: string;
  genre: string;
  description: string;
};

export type BeerErrorT = {
  beerName: string;
  beerDescription: string;
  beerGenre: string;
};

export type CustomBeerT = {
  name: string;
  genre: string;
  description: string;
};

export type CustomBeersT = any;

type IngredientAmount = {
  value: number;
  unit: string;
};

type Ingredient = {
  name: string;
  amount: IngredientAmount;
  add?: string;
  attribute?: string;
};

type Ingredients = {
  malt: Ingredient[];
  hops: Ingredient[];
  yeast: string;
};

export type BeerResponseT = {
  id: string;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  brewers_tips: string;
  target_og: number;
  ingredients: Ingredients;
};
