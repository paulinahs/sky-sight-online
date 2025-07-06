import { Card } from '@/components/ui/card';
import { WeatherIcon } from './WeatherIcon';
import { ForecastData } from './WeatherApp';

interface WeatherForecastProps {
  data: ForecastData[];
  loading: boolean;
}

export const WeatherForecast = ({ data, loading }: WeatherForecastProps) => {
  if (loading) {
    return (
      <Card className="glass p-6">
        <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="h-4 bg-white/20 rounded w-16 mx-auto"></div>
              <div className="h-12 w-12 bg-white/20 rounded-full mx-auto"></div>
              <div className="h-6 bg-white/20 rounded w-12 mx-auto"></div>
              <div className="h-4 bg-white/20 rounded w-10 mx-auto"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass p-6">
      <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {data.map((day, index) => (
          <div 
            key={index}
            className="glass p-4 rounded-lg text-center text-white hover:scale-105 transition-bounce cursor-pointer"
          >
            <p className="text-sm font-medium mb-3 text-white/80">
              {day.date}
            </p>
            
            <div className="mb-3 flex justify-center">
              <WeatherIcon condition={day.condition} size={48} />
            </div>
            
            <div className="space-y-1">
              <p className="text-lg font-semibold">
                {day.maxTemp}°
              </p>
              <p className="text-sm text-white/60">
                {day.minTemp}°
              </p>
            </div>
            
            <p className="text-xs text-white/50 mt-2 capitalize">
              {day.condition}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};