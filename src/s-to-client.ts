import {HttpClient} from './http-client';

import {
  GetSeasonResponse,
  GetSeriesResponse,
  ListSeriesResponse,
  QueryParam,
  SeriesList,
} from './types/index';
import {Series} from './types/series';

const API_VERSION: string = 'v1';
const BASE_URL: string = `s.to`;
const API_PATH: string = `/api/${API_VERSION}`;

export class SToClient {
  private apiKey: string;
  private httpClient: HttpClient;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.httpClient = new HttpClient(BASE_URL, API_PATH);
  }

  public async listSeries(extended?: boolean, category?: number, genre?: number): Promise<SeriesList> {
    const route: string = '/series/list';

    const queryParams: Array<QueryParam> = [
      {key: 'key', value: this.apiKey},
    ];

    if (extended) {
      queryParams.push({key: 'extended', value: 1});
    }
    if (category) {
      queryParams.push({key: 'category', value: category});
    }
    if (genre) {
      queryParams.push({key: 'genre', value: genre});
    }

    const response: ListSeriesResponse = await this.httpClient.get<ListSeriesResponse>(route, queryParams);

    return response.series;
  }

  public async getSeries(seriesId: number): Promise<Series> {
    const route: string = '/series/get';

    const queryParams: Array<QueryParam> = [
      {key: 'key', value: this.apiKey},
      {key: 'series', value: seriesId},
    ];

    const response: GetSeriesResponse = await this.httpClient.get<GetSeriesResponse>(route, queryParams);

    const series: Series = response.series;
    series.seasons = [];

    for (const seasonNumber of response.seasons) {
      const seasonQueryParams: Array<QueryParam> = queryParams.slice();
      seasonQueryParams.push({key: 'season', value: seasonNumber});

      const seasonResponse: GetSeasonResponse = await this.httpClient.get<GetSeasonResponse>(route, seasonQueryParams);

      series.seasons.push({
        number: seasonNumber,
        episodes: seasonResponse.episodes,
      });
    }

    return series;
  }
}
