import { BeerT } from "../types";

export const fetchBeers = async (
  page: number,
  itemsPerPage: number
): Promise<BeerT[]> => {
  return fetch(
    `https://api.punkapi.com/v2/beers?page=${page}&per_page=${itemsPerPage}`
  ).then((res) => res.json());
};
