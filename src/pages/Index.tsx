
import React, { useState, useEffect } from 'react';
import { Search, Briefcase, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import JobCard, { JobCardProps } from '@/components/JobCard';
import { Badge } from '@/components/ui/badge';
import JobPostForm from '@/components/JobPostForm';
import TypedBackground from '@/components/TypedBackground';
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

  return (
    <div className="min-h-screen bg-noleet-dark text-white relative overflow-x-hidden">
      <TypedBackground />
      
      <header className="border-b border-gray-800 bg-noleet-dark/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/f4cf0849-4e11-4bd2-9ded-05730040b25c.png" 
              alt="Noleet" 
              className="h-10 w-auto logo-glow"
            />
          </div>
          
          <Button 
            className="btn-gradient" 
            onClick={() => setShowJobForm(!showJobForm)}
          >
            <Briefcase size={16} className="mr-2" />
            {showJobForm ? "Close Form" : "Post a Job"}
          </Button>
        </div>
      </header>
      
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
                    onClick={() => setActiveFilter(null)}
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
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-noleet-blue"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                      <JobCard key={job.id} {...job} />
                    ))
                  ) : (
                    <div className="glass-card p-8 text-center">
                      <p className="text-lg text-gray-400">No jobs found matching your criteria.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Noleet. The best place to find crypto and blockchain jobs.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
