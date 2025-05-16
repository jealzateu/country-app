export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  flags: {
    png: string;
  };
}
