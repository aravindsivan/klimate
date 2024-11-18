import CurrentWeather from "@/components/CurrentWeather";
import ErrorAlert from "@/components/ErrorAlert";
import FavoriteCities from "@/components/FavoriteCities";
import HourlyTemperature from "@/components/HourlyTemperature";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { MapPin, RefreshCw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <LoadingSkeleton />;
  }

  if (locationError) {
    return (
      <ErrorAlert
        errorText={"Location Error"}
        locationError={locationError}
        onClick={getLocation}
        icon={<MapPin className="h-4 w-4 mr-2" />}
      />
    );
  }

  if (!coordinates) {
    return (
      <ErrorAlert
        errorText={"Location Required"}
        locationError={
          "Please enable location access to see your local weather"
        }
        onClick={getLocation}
        icon={<MapPin className="h-4 w-4 mr-2" />}
      />
    );
  }

  const location = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <ErrorAlert
        errorText={"Error"}
        locationError={"Failed to fetch weather data. Please try again."}
        onClick={handleRefresh}
        icon={<RefreshCw className="h-4 w-4 mr-2" />}
        btnText={"Retry"}
      />
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <FavoriteCities />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${weatherQuery.isFetching && "animate-spin"}`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} location={location} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
