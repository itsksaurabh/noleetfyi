
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Briefcase, X } from 'lucide-react';

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
  description?: string;
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
  postedAt,
  description = "This is a great opportunity to join a leading company in the blockchain space. The ideal candidate will have experience with the technologies listed and a passion for crypto. Remote work options available."
}: JobCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div 
        className={`glass-card p-6 card-hover relative ${isFeatured ? 'border-noleet-blue' : ''} ${isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}
        onClick={toggleExpanded}
      >
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
      
      {isExpanded && (
        <div className="glass-card p-6 relative animate-fade-in">
          <button 
            onClick={toggleExpanded} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
          <div className="flex gap-4 mb-6">
            <div className="bg-secondary h-16 w-16 rounded-md flex items-center justify-center text-2xl font-bold">
              {companyLogo ? (
                <img src={companyLogo} alt={company} className="h-12 w-12 object-contain" />
              ) : (
                company.charAt(0)
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="text-gray-400">{company}</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={14} className="text-gray-400" />
                <span className="text-gray-400">{location}</span>
                {isRemote && (
                  <Badge className="bg-secondary text-gray-300 text-xs">
                    Remote
                  </Badge>
                )}
              </div>
            </div>
            
            {isFeatured && (
              <Badge className="bg-noleet-blue/20 text-noleet-blue ml-auto">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-gray-700 text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Job Description</h3>
            <p className="text-gray-300 whitespace-pre-line">{description}</p>
            
            <div className="mt-6 flex gap-4">
              <button className="btn-gradient py-2 px-6 flex-1">Apply Now</button>
              <button className="border border-gray-700 rounded-md py-2 px-6 text-gray-300 hover:bg-gray-800 transition-colors">
                Save Job
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            Posted {postedAt}
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
