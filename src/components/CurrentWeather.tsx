import { Card } from '@/components/ui/card';
import { WeatherIcon } from './WeatherIcon';
import { WeatherData } from './WeatherApp';
import { Thermometer, Droplets, Wind, Gauge } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
  loading: boolean;
}

export const CurrentWeather = ({ data, loading }: CurrentWeatherProps) => {
  if (loading) {
    return (
      <Card className="glass p-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-16 w-16 bg-white/20 rounded-full mx-auto"></div>
          <div className="h-8 bg-white/20 rounded w-32 mx-auto"></div>
          <div className="h-12 bg-white/20 rounded w-24 mx-auto"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass p-8 text-white">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Main Weather Info */}
        <div className="text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <WeatherIcon condition={data.condition} size={80} />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {data.temperature}°C
              </h2>
              <p className="text-lg text-white/80">{data.condition}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{data.location}</h3>
            <p className="text-white/70">{data.description}</p>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-4 rounded-lg text-center">
            <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-200" />
            <p className="text-sm text-white/70">Humidity</p>
            <p className="text-xl font-semibold">{data.humidity}%</p>
          </div>
          
          <div className="glass p-4 rounded-lg text-center">
            <Wind className="w-6 h-6 mx-auto mb-2 text-blue-200" />
            <p className="text-sm text-white/70">Wind Speed</p>
            <p className="text-xl font-semibold">{data.windSpeed} km/h</p>
          </div>
          
          <div className="glass p-4 rounded-lg text-center">
            <Gauge className="w-6 h-6 mx-auto mb-2 text-blue-200" />
            <p className="text-sm text-white/70">Pressure</p>
            <p className="text-xl font-semibold">{data.pressure} hPa</p>
          </div>
          
          <div className="glass p-4 rounded-lg text-center">
            <Thermometer className="w-6 h-6 mx-auto mb-2 text-blue-200" />
            <p className="text-sm text-white/70">Feels Like</p>
            <p className="text-xl font-semibold">{data.temperature + 2}°C</p>
          </div>
        </div>
      </div>
    </Card>
  );
};