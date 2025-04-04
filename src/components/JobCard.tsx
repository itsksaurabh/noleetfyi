
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Briefcase } from 'lucide-react';

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: string;
  tags: string[];
  isRemote: boolean;
  isFeatured: boolean;
  postedAt: string;
}

const JobCard = ({
  title,
  company,
  companyLogo,
  location,
  salary,
  tags,
  isRemote,
  isFeatured,
  postedAt
}: JobCardProps) => {
  return (
    <div className={`glass-card p-6 card-hover ${isFeatured ? 'border-noleet-blue' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="bg-secondary h-12 w-12 rounded-md flex items-center justify-center text-xl font-bold">
            {companyLogo ? (
              <img src={companyLogo} alt={company} className="h-10 w-10 object-contain" />
            ) : (
              company.charAt(0)
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-gray-400">{company}</p>
          </div>
        </div>
        {isFeatured && (
          <Badge className="bg-noleet-blue/20 text-noleet-blue">
            Featured
          </Badge>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="border-gray-700 text-gray-300">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400 text-sm">
        <div className="flex items-center">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
          {isRemote && (
            <Badge className="ml-2 bg-secondary text-gray-300 text-xs">
              Remote
            </Badge>
          )}
        </div>
        {salary && (
          <div className="flex items-center">
            <Briefcase size={14} className="mr-1" />
            <span>{salary}</span>
          </div>
        )}
        <div className="flex items-center ml-auto">
          <Clock size={14} className="mr-1" />
          <span>{postedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
