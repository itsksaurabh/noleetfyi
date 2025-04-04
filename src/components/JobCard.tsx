
import React from 'react';
import { Badge } from '@/components/ui/badge';

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
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
    <div className="bg-white p-6 rounded-lg border shadow-sm card-hover">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
          {companyLogo ? (
            <img src={companyLogo} alt={company} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-noleet-light flex items-center justify-center text-noleet-blue font-bold">
              {company.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-gray-900 hover:text-noleet-blue transition-colors">
              {title}
            </h3>
            <div className="flex gap-2">
              {isFeatured && (
                <Badge className="bg-noleet-light text-noleet-purple">
                  Featured
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center mt-1 text-gray-600">
            <span>{company}</span>
            <span className="mx-2">•</span>
            <span>{location}</span>
            {isRemote && (
              <>
                <span className="mx-2">•</span>
                <span className="text-noleet-blue font-medium">Remote</span>
              </>
            )}
          </div>
          
          {salary && (
            <div className="mt-2 text-sm font-medium text-gray-700">
              {salary}
            </div>
          )}
          
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="mt-3 text-xs text-gray-500">
            Posted {postedAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
