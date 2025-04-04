
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface FilterTabsProps {
  activeFilter: string | null;
  toggleFilter: (filter: string) => void;
}

const FilterTabs = ({ activeFilter, toggleFilter }: FilterTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge 
        className={`${activeFilter === 'Remote' ? 'bg-noleet-blue text-white' : 'bg-secondary text-gray-300'} hover:bg-secondary/80 cursor-pointer`}
        onClick={() => toggleFilter('Remote')}
      >
        Remote
      </Badge>
      <Badge 
        className={`${activeFilter === 'Featured' ? 'bg-noleet-blue text-white' : 'bg-secondary text-gray-300'} hover:bg-secondary/80 cursor-pointer`}
        onClick={() => toggleFilter('Featured')}
      >
        Featured
      </Badge>
      <Badge 
        className={`${activeFilter === 'Engineering' ? 'bg-noleet-blue text-white' : 'bg-secondary text-gray-300'} hover:bg-secondary/80 cursor-pointer`}
        onClick={() => toggleFilter('Engineering')}
      >
        Engineering
      </Badge>
      <Badge 
        className={`${activeFilter === 'Frontend' ? 'bg-noleet-blue text-white' : 'bg-secondary text-gray-300'} hover:bg-secondary/80 cursor-pointer`}
        onClick={() => toggleFilter('Frontend')}
      >
        Frontend
      </Badge>
    </div>
  );
};

export default FilterTabs;
