export type SeriesList = Array<SeriesListEntry>;

export type SeriesListEntry = {
  id: number,
  name: string,
  link: string,
  cover?: string,
  background?: string,
  description?: string,
  trailer?: string,
  fsk?: number,
};
