import { TooltipProps } from "react-bootstrap";

export type BaseBeerT = {
  name: string;
  genre: string;
  description: string;
};

type IngredientAmount = {
  value: number;
  unit: string;
};

export type Ingredient = {
  name: string;
  amount: IngredientAmount;
  add?: string;
  attribute?: string;
};

export type Ingredients = {
  malt: Ingredient[];
  hops: Ingredient[];
  yeast: string;
};

export interface BeerResponseT extends BaseBeerT {
  id: string;
  tagline: string;
  first_brewed: string;
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
}

export interface RenderTooltipProps extends TooltipProps {
  tagline?: string;
  genre?: string;
}
