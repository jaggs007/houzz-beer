import { Ingredient, Ingredients } from "types";

export const getSubString = (text: string, count: number) => {
  return text.slice(0, count) + (text.length > count ? "..." : "");
};

export const getIngredients = (ingredients: Ingredients) => {
  return ingredients
    ? [
        ...ingredients.malt.map((m: Ingredient) => m.name),
        ...ingredients.hops.map((h: Ingredient) => h.name),
        ingredients.yeast,
      ].join(", ")
    : null;
};
