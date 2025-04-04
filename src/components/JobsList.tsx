
import React from 'react';
import JobCard, { JobCardProps } from '@/components/JobCard';
import { useNavigate } from 'react-router-dom';

interface JobsListProps {
  loading: boolean;
  filteredJobs: JobCardProps[];
  onTagSelect?: (tag: string) => void;
}

const JobsList = ({ loading, filteredJobs, onTagSelect }: JobsListProps) => {
  const navigate = useNavigate();

  const handleCompanyClick = (companyName: string) => {
    navigate(`/companies?search=${encodeURIComponent(companyName)}`);
  };
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-noleet-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredJobs.length > 0 ? (
        filteredJobs.map(job => (
          <JobCard 
            key={job.id} 
            {...job} 
            onTagClick={onTagSelect}
            onCompanyClick={handleCompanyClick}
          />
        ))
      ) : (
        <div className="glass-card p-8 text-center">
          <p className="text-lg text-gray-400">No jobs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default JobsList;
