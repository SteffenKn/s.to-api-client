import {Season} from "./index";

export type Series = {
  id: number,
  name: string,
  link: string,
  cover: string,
  cover220x330: string,
  cover200x300: string,
  background: string,
  trailer: string,
  fsk: number,
  description: string,
  productionStart: number,
  productionEnd: number,
  mainGenre: Genre,
  otherGenres: Array<Genre>,
  rating: Rating,
  directors: Array<Person>,
  actors: Array<Person>,
  countries: Array<Country>,
  watchlist: false,
  favourite: false,
  seasons: Array<Season>,
};

export type Rating = {
  count: number,
  result: number
};

export type Country = {
  name: string,
  link: string,
};

export type Genre = {
  id: number,
  name: string,
  link: string,
};

export type Person = {
  name: string,
  link: string,
};
