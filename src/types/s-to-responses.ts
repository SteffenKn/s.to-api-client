import {
  Episode,
  Series,
  SeriesList,
} from './index';

export type GetSeriesResponse = {
  series: Series,
  seasons: Array<number>,
};

export type GetSeasonResponse = {
  series: Series,
  episodes: Array<Episode>,
};

export type ListSeriesResponse = {
  series: SeriesList,
};
