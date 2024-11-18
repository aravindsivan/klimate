import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { formatTemp } from "@/lib/utils";

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dialyForecast = data.list.reduce(
    (acc, forecast) => {
      const date = dayjs(forecast.dt * 1000).format("YYYY-MM-DD");

      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          wind_speed: forecast.wind.speed,
          weather: forecast.weather[0],
          date: forecast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          forecast.main.temp_min
        );
        acc[date].temp_max = Math.max(
          acc[date].temp_max,
          forecast.main.temp_max
        );
      }

      return acc;
    },
    {} as Record<string, DialyForecastProps>
  );

  const nextDays = Object.values(dialyForecast).slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => {
            return (
              <div
                key={day.date}
                className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">
                    {dayjs(day.date * 1000).format("ddd, MMM D")}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium capitalize">
                    {day.weather.description}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
                <div className="flex justify-center gap-4">
                  <span className="flex items-center gap-1">
                    <Droplets className="mr-1 h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="mr-1 h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.wind_speed}m/s</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
