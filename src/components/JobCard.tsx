
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Briefcase, X, DollarSign, CheckCircle } from 'lucide-react';

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary: string;
  tags: string[];
  isRemote: boolean;
  isFeatured: boolean;
  postedAt: string;
  description: string;
  requirements: string[];
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
  description,
  requirements
}: JobCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Generate a consistent abbreviation for the company logo
  const getAbbreviation = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return name.substring(0, 2).toUpperCase();
    }
    return words.slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase();
  };

  // Generate a random color based on company name
  const getLogoBackground = (name: string) => {
    const colors = [
      'bg-blue-600', 'bg-purple-600', 'bg-green-600', 
      'bg-red-600', 'bg-yellow-600', 'bg-pink-600'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <>
      <div 
        className={`glass-card p-6 card-hover relative transform transition-all duration-300 ease-in-out hover:scale-[1.02] ${isFeatured ? 'border-noleet-blue border-2' : ''} ${isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}
        onClick={toggleExpanded}
      >
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className={`h-12 w-12 rounded-md flex items-center justify-center text-xl font-bold text-white ${getLogoBackground(company)}`}>
              {companyLogo ? (
                <img src={companyLogo} alt={company} className="h-10 w-10 object-contain" />
              ) : (
                getAbbreviation(company)
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-gray-400">{company}</p>
            </div>
          </div>
          {isFeatured && (
            <Badge className="bg-noleet-blue/20 text-noleet-blue animate-pulse">
              Featured
            </Badge>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="border-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400 text-sm">
          <div className="flex items-center group">
            <MapPin size={14} className="mr-1 group-hover:text-noleet-blue transition-colors duration-200" />
            <span className="group-hover:text-noleet-blue transition-colors duration-200">{location}</span>
            {isRemote && (
              <Badge className="ml-2 bg-secondary text-gray-300 text-xs hover:bg-noleet-blue/20 hover:text-noleet-blue transition-colors duration-200">
                Remote
              </Badge>
            )}
          </div>
          <div className="flex items-center">
            <DollarSign size={14} className="mr-1" />
            <span>{salary}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{postedAt}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="glass-card p-6 relative">
          <button
            onClick={toggleExpanded}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex gap-4 mb-6">
            <div className={`h-12 w-12 rounded-md flex items-center justify-center text-xl font-bold text-white ${getLogoBackground(company)}`}>
              {companyLogo ? (
                <img src={companyLogo} alt={company} className="h-10 w-10 object-contain" />
              ) : (
                getAbbreviation(company)
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-gray-400">{company}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-2">Description</h4>
              <p className="text-gray-400">{description}</p>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Requirements</h4>
              <ul className="space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-400">
                    <CheckCircle size={16} className="text-noleet-blue mt-1" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-gray-700 text-gray-300">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400 text-sm">
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>{location}</span>
                {isRemote && (
                  <Badge className="ml-2 bg-secondary text-gray-300 text-xs">
                    Remote
                  </Badge>
                )}
              </div>
              <div className="flex items-center">
                <DollarSign size={14} className="mr-1" />
                <span>{salary}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{postedAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
