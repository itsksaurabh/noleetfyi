import yaml from 'js-yaml';

export interface Job {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
}

export interface Company {
  name: string;
  description: string;
  headquarters: string;
  size: string;
  website: string;
  logo?: string;
  tags: string[];
  noWhiteboard: boolean;
  interviewProcess: string[];
  codingStyle: string[];
  benefits: string[];
  jobs: Job[];
}

export interface CompanyFilter {
  tag?: string;
  noWhiteboard?: boolean;
  searchQuery?: string;
}

const loadCompanyData = async (companyDir: string): Promise<Company> => {
  const response = await fetch(`${companyDir}/companies.yaml`);
  const yamlContent = await response.text();
  const data = yaml.load(yamlContent) as Company[];
  return data[0]; // Return the first company from the array
};

export const getCompanies = async (): Promise<Company[]> => {
  try {
    const companies: Company[] = [];
    // Use Vite's import.meta.glob to load company info and jobs files
    const infoFiles = import.meta.glob('/src/data/companies/*/info.yaml', { as: 'raw', eager: true });
    const jobsFiles = import.meta.glob('/src/data/companies/*/jobs.yaml', { as: 'raw', eager: true });

    // Process each company's info and jobs
    for (const infoPath in infoFiles) {
      try {
        const companyInfo = yaml.load(infoFiles[infoPath]) as Omit<Company, 'jobs'>;
        const jobsPath = infoPath.replace('info.yaml', 'jobs.yaml');
        
        let jobs: Job[] = [];
        if (jobsFiles[jobsPath]) {
          const jobsData = yaml.load(jobsFiles[jobsPath]) as { jobs: Job[] };
          jobs = jobsData.jobs.map(job => ({
            title: job.title || '',
            location: job.location || 'Remote',
            type: job.type || 'Full-time',
            description: job.description || '',
            requirements: Array.isArray(job.requirements) ? job.requirements : [],
            salary: job.salary || 'Competitive'
          }));
        }

        companies.push({
          ...companyInfo,
          jobs
        });
      } catch (err) {
        console.error(`Error processing company at ${infoPath}:`, err);
      }
    }

    return companies;
  } catch (error) {
    console.error('Error loading companies:', error);
    return [];
  }
};

export const filterCompanies = (companies: Company[], filters: CompanyFilter): Company[] => {
  return companies.filter(company => {
    if (filters.tag && !company.tags.includes(filters.tag)) {
      return false;
    }
    if (filters.noWhiteboard !== undefined && company.noWhiteboard !== filters.noWhiteboard) {
      return false;
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        company.name.toLowerCase().includes(query) ||
        company.description.toLowerCase().includes(query) ||
        company.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });
};