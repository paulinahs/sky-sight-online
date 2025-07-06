import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface WeatherSearchProps {
  onSearch: (location: string) => void;
}

export const WeatherSearch = ({ onSearch }: WeatherSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="glass border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
        />
      </div>
      <Button 
        type="submit" 
        size="icon"
        className="glass border-white/20 hover:bg-white/20 text-white"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};