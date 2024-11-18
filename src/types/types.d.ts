declare interface Coordinates {
  lat: number;
  lon: number;
}

declare interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

declare interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  name: string;
  dt: number;
}

declare interface ForecastData {
  list: Array<{
    dt: number;
    main: WeatherData["main"];
    weather: WeatherData["weather"];
    wind: WeatherData["wind"];
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

declare interface GeocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

declare interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

declare interface CurrentWeatherProps {
  data: WeatherData;
  location?: GeocodingResponse;
}

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface WeatherDetailsProps {
  data: WeatherData;
}

interface WeatherForecastProps {
  data: ForecastData;
}

interface DialyForecastProps {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind_speed: number;
  weather: WeatherCondition;
}

interface SearchHistoryItemProps {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: number;
}

interface FavoriteCityProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

interface FavoriteButtonProps {
  data: WeatherData;
}

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}
