import { useState, useEffect } from 'react';
import { CurrentWeather } from './CurrentWeather';
import { WeatherForecast } from './WeatherForecast';
import { WeatherSearch } from './WeatherSearch';
import { useToast } from '@/hooks/use-toast';

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  icon: string;
}

export interface ForecastData {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
  description: string;
}

const API_KEY = 'demo'; // For demo purposes - in production, use proper API key management
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('London');
  const { toast } = useToast();

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    try {
      // For demo purposes, using mock data since we don't have API key
      // In production, replace with actual API calls
      const mockCurrentWeather: WeatherData = {
        location: city,
        temperature: Math.round(Math.random() * 30 + 5),
        condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
        description: 'Pleasant weather conditions',
        humidity: Math.round(Math.random() * 40 + 40),
        windSpeed: Math.round(Math.random() * 20 + 5),
        pressure: Math.round(Math.random() * 50 + 1000),
        icon: 'sun'
      };

      const mockForecast: ForecastData[] = Array.from({ length: 5 }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        maxTemp: Math.round(Math.random() * 15 + 15),
        minTemp: Math.round(Math.random() * 10 + 5),
        condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
        icon: ['sun', 'cloud', 'cloud-rain', 'sun'][Math.floor(Math.random() * 4)],
        description: 'Weather forecast'
      }));

      setCurrentWeather(mockCurrentWeather);
      setForecast(mockForecast);
      
      toast({
        title: "Weather Updated",
        description: `Showing weather for ${city}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = (newLocation: string) => {
    setLocation(newLocation);
    fetchWeatherData(newLocation);
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, []);

  const getBackgroundGradient = () => {
    if (!currentWeather) return 'gradient-sky-clear';
    
    switch (currentWeather.condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return 'gradient-sky-clear';
      case 'cloudy':
        return 'gradient-sky-cloudy';
      case 'rainy':
        return 'gradient-sky-cloudy';
      default:
        return 'gradient-sky-clear';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} transition-smooth`}>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Weather App
            </h1>
            <p className="text-lg text-white/80 drop-shadow">
              Beautiful weather forecasts at your fingertips
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <WeatherSearch onSearch={handleLocationSearch} />
          </div>

          {/* Current Weather */}
          {currentWeather && (
            <div className="max-w-4xl mx-auto">
              <CurrentWeather data={currentWeather} loading={loading} />
            </div>
          )}

          {/* Forecast */}
          {forecast.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <WeatherForecast data={forecast} loading={loading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};