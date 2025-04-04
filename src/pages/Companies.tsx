import { useState, useEffect } from 'react';
import { Company, CompanyFilter, getCompanies, filterCompanies } from '@/services/companyService';
import { CompanyCard } from '@/components/CompanyCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X, Briefcase, Building } from 'lucide-react';
import JobsList from '@/components/JobsList';
import { JobCardProps } from '@/components/JobCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';

export default function Companies() {
  const [showJobForm, setShowJobForm] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('companies');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState<JobCardProps[]>([]);
  const [filters, setFilters] = useState<CompanyFilter>({
    tag: undefined,
    noWhiteboard: undefined,
    searchQuery: '',
  });

  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true);
      try {
        const data = await getCompanies();
        console.log('Loaded companies:', data);
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (error) {
        console.error('Error loading companies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCompanies();
  }, []);

  useEffect(() => {
    const filtered = filterCompanies(companies, filters);
    setFilteredCompanies(filtered);
    
    // Update filtered jobs
    const jobs = filtered.flatMap(company => 
      company.jobs.map(job => ({
        id: `${company.name}-${job.title}`.toLowerCase().replace(/\s+/g, '-'),
        title: job.title,
        company: company.name,
        companyLogo: undefined,
        location: job.location || 'Remote',
        salary: job.salary || 'Competitive',
        tags: [...(company.tags || []), ...(job.type ? [job.type] : [])],
        isRemote: job.location?.toLowerCase().includes('remote') || false,
        isFeatured: false,
        postedAt: new Date().toISOString(),
        description: job.description || `${job.title} position at ${company.name}`,
        requirements: [
          `Experience with ${company.tags.join(' or ')}`,
          job.type ? `${job.type} position` : 'Full-time position',
          company.codingStyle ? company.codingStyle[0] : 'Strong coding skills',
          'Excellent communication skills',
          'Ability to work independently and in a team'
        ]
      }))
    );
    setFilteredJobs(jobs);
    setLoading(false);
  }, [companies, filters]);

  const handleTagClick = (tag: string) => {
    setFilters(prev => ({ ...prev, tag }));
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleNoWhiteboardToggle = () => {
    setFilters(prev => ({
      ...prev,
      noWhiteboard: prev.noWhiteboard === undefined ? true : !prev.noWhiteboard,
    }));
  };

  const clearFilters = () => {
    setFilters({
      tag: undefined,
      noWhiteboard: undefined,
      searchQuery: '',
    });
  };

  const toggleJobForm = () => {
    setShowJobForm(!showJobForm);
  };

  return (
    <div className="min-h-screen bg-noleet-dark text-white relative overflow-x-hidden">
      <PageHeader showJobForm={showJobForm} toggleJobForm={toggleJobForm} />
      <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Companies & Interview Processes</h1>
        <p className="text-muted-foreground">
          Find companies with transparent interview processes and no whiteboard interviews.
        </p>
      </div>

      <Tabs defaultValue="companies" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Companies ({filteredCompanies.length})
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Jobs ({filteredJobs.length})
          </TabsTrigger>
        </TabsList>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies and jobs..."
              className="pl-10"
              value={filters.searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Badge
              variant={filters.noWhiteboard ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-noleet-purple/20"
              onClick={handleNoWhiteboardToggle}
            >
              No Whiteboard
            </Badge>

            {filters.tag && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setFilters(prev => ({ ...prev, tag: undefined }))}
                />
              </Badge>
            )}

            {(filters.tag || filters.noWhiteboard || filters.searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        <TabsContent value="companies">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <p>Loading companies...</p>
              </div>
            ) : filteredCompanies.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p>No companies found matching your criteria.</p>
              </div>
            ) : (
              filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.name}
                  company={company}
                  onTagClick={handleTagClick}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Briefcase className="h-6 w-6" />
              <h2>Available Jobs ({filteredJobs.length})</h2>
            </div>
            {filteredJobs.length > 0 ? (
              <JobsList filteredJobs={filteredJobs} loading={false} />
            ) : (
              <div className="text-center py-8">
                <p>No jobs found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      </div>
      <PageFooter />
    </div>
  );
}