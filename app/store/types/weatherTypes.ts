export interface WeatherResponse {
  cod: string;
  message: number;
  name: string;
  cnt: number;
  city: City;
  dt: number;
  main: MainWeather;
  weather: WeatherDescription[];
  wind: Wind;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
  temp_kf?: number;
}

export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  deg: number;
  speed: number;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone?: number;
  sunrise?: number;
  sunset?: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

/* Novas interfaces para a rota /forecast */

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastEntry[];
  city: City;
}

export interface ForecastEntry {
  dt: number;
  main: MainWeather;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Rain {
  '3h'?: number;
}

export interface Sys {
  pod: string;
}
