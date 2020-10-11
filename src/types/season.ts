export type Season = {
  number: number,
  episodes: Array<Episode>,
};

export type Episode = {
  id: number,
  series: number,
  season: number,
  episode: number,
  german: string,
  english: string,
  description: string,
  links: Array<EpisodeLink>,
  language: EpiosdeLanguage,
};

export type EpiosdeLanguage = {[name: string]: boolean};

export type EpisodeLink =  {
  id: number,
  link: string,
  hoster: string,
  hosterTitle: string,
  language: number,
};
