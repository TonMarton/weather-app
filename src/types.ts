export type Capital = {
  name: string;
  coordinates: Coordinate;
};

export type Coordinate = {
  lat: number;
  lon: number;
};

export type Weather = {
  description: string;
  icon: string;
  temperature: string;
  timezone: number;
  sunriseTime: string;
  sunsetTime: string;
};
