# s.to-api-client

This is a simple API client for the [s.to API](https://s.to/developers).

## Usage

```typescript
import {SToClient} from 's-to-api-client';

const apiKey: string = '<your-api-key>';
const sToClient: SToClient = new SToClient(apiKey);

async function logSeriesDescription(seriesName: string): Promise<void> {
  const allSeries: SeriesList = await sToClient.listSeries();

  const seriesEntry: SeriesListEntry = allSeries
    .find((series: SeriesListEntry): boolean => series.name.toLowerCase() === seriesName.toLowerCase());

  const series: Series = await sToClient.getSeries(seriesEntry.id);

  console.log(series.description);
}
logSeriesDescription('Attack on Titan');
```

## Functions

### listSeries

Returns a list of all series that exist on s.to.

#### Parameters

- extended
  - optional
  - Type: boolean
  - If extended is set to true, additional information like cover, background, description, trailer and fsk will be added to the series

- category
  - optional
  - Type: number
  - If category is set, the series list will be filtered by a specific category.
    - 0: all series
    - 1: popular series
    - 2: new
    - 3: top
    - 4: last seen

- genre
  - optional
  - Type: number
  - If genre is set, only series of a specific genre will be returned. The number must match the id of the specific genre. (Getting a list of available genres will be added soon).

#### Returns

A list of all series that exist on s.to.
- Type: [Series List](./src/types/series-list.ts)

### getSeries

Returns all information about a specific series.
Unlike `listSeries`, this returns all series-specific information such as seasons and episodes.

#### Parameters

- seriesId
  - Type: number
  - The id of the series for which the information is needed.

#### Returns

All information for the specific series.
- Type: [Series](./src/types/series.ts)

## What about the rest?

The rest of the API will be implemented soon.
