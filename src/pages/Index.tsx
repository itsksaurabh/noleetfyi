
import React, { useState, useEffect } from 'react';
import TypedBackground from '@/components/TypedBackground';
import JobPostForm from '@/components/JobPostForm';
import { JobCardProps } from '@/components/JobCard';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import SearchBar from '@/components/SearchBar';
import FilterTabs from '@/components/FilterTabs';
import JobsList from '@/components/JobsList';
import { fetchJobs } from '@/services/jobService';

const Index = () => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<JobCardProps[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const jobData = await fetchJobs();
        setJobs(jobData);
        setFilteredJobs(jobData);
      } catch (error) {
        console.error('Failed to load jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadJobs();
  }, []);
  
  useEffect(() => {
    // Filter jobs when search term or active filter changes
    let result = jobs;
    
    if (searchTerm) {
      result = result.filter(job => 
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (activeFilter) {
      if (activeFilter === 'Remote') {
        result = result.filter(job => job.isRemote);
      } else if (activeFilter === 'Featured') {
        result = result.filter(job => job.isFeatured);
      } else {
        result = result.filter(job => job.tags.includes(activeFilter));
      }
    }
    
    setFilteredJobs(result);
  }, [searchTerm, activeFilter, jobs]);
  
  const handleSearch = () => {
    // The filtering is handled in the useEffect
  };
  
  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const clearFilter = () => {
    setActiveFilter(null);
  };

  const toggleJobForm = () => {
    setShowJobForm(!showJobForm);
  };

  return (
    <div className="min-h-screen bg-noleet-dark text-white relative overflow-x-hidden">
      <TypedBackground />
      
      <PageHeader showJobForm={showJobForm} toggleJobForm={toggleJobForm} />
      
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-8">
          {showJobForm ? (
            <JobPostForm />
          ) : (
            <>
              <div>
                <h2 className="text-3xl font-bold mb-2">Find Your Next Crypto Job</h2>
                <p className="text-gray-400">Companies that don't have a broken hiring process</p>
              </div>
              
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                handleSearch={handleSearch} 
                clearFilter={clearFilter} 
              />
              
              <FilterTabs activeFilter={activeFilter} toggleFilter={toggleFilter} />
              
              <JobsList loading={loading} filteredJobs={filteredJobs} />
            </>
          )}
        </div>
      </main>
      
      <PageFooter />
    </div>
  );
};

export default Index;
