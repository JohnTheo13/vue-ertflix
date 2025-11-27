export interface Schedule {
  time: string;
  days: string[];
}

export interface Rating {
  average: number | null;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string | null;
}

export interface Externals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Link {
  href: string;
  name?: string;
}

export interface Links {
  self: Link;
  previousepisode?: Link;
}

export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string | null;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network | null;
  webChannel: null; // Or a specific type if known
  dvdCountry: null; // Or a specific type if known
  externals: Externals;
  image: Image | null;
  summary: string;
  updated: number;
  _links: Links;
}
