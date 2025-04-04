
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  clearFilter: () => void;
}

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch, clearFilter }: SearchBarProps) => {
  return (
    <div className="glass-card p-4 flex flex-col md:flex-row gap-4">
      <div className="flex-grow relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input 
          type="text" 
          placeholder="Job title, keywords, or company" 
          className="bg-secondary border-gray-700 pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="border-gray-700 text-gray-300 flex gap-2"
          onClick={clearFilter}
        >
          <Filter size={16} />
          Clear Filter
        </Button>
        <Button 
          className="btn-gradient min-w-[100px]"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
