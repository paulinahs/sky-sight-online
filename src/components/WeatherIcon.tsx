import { Sun, Cloud, CloudRain, Snowflake, CloudSnow, Moon } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: number;
  className?: string;
}

export const WeatherIcon = ({ condition, size = 24, className = "" }: WeatherIconProps) => {
  const getIcon = () => {
    const normalizedCondition = condition.toLowerCase();
    
    switch (normalizedCondition) {
      case 'clear':
      case 'sunny':
        return <Sun className={`w-${size/4} h-${size/4} ${className}`} style={{ width: size, height: size }} />;
      case 'cloudy':
      case 'overcast':
        return <Cloud className={`w-${size/4} h-${size/4} ${className}`} style={{ width: size, height: size }} />;
      case 'rainy':
      case 'rain':
        return <CloudRain className={`w-${size/4} h-${size/4} ${className}`} style={{ width: size, height: size }} />;
      case 'snowy':
      case 'snow':
        return <CloudSnow className={`w-${size/4} h-${size/4} ${className}`} style={{ width: size, height: size }} />;
      case 'night':
        return <Moon className={`w-${size/4} h-${size/4} ${className}`} style={{ width: size, height: size }} />;
      default:
        return <Sun className={`w-${size/4} h-${size/4} ${className}`} style={{ width: size, height: size }} />;
    }
  };

  return (
    <div className="inline-flex items-center justify-center text-white/90">
      {getIcon()}
    </div>
  );
};