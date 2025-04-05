
import { getCompanies, type Company, type Job } from './companyService';

interface JobData {
  id: string;
  company: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  isRemote: boolean;
  isFeatured: boolean;
  postedAt: string;
  requirements: string[];
  salary: string;
}

export async function fetchJobs(): Promise<JobData[]> {
  try {
    const companies = await getCompanies();
    const jobs: JobData[] = [];

    companies.forEach((company: Company) => {
      if (!company.jobs) return;
      
      company.jobs.forEach((job: Job) => {
        const jobId = `${company.name.toLowerCase().replace(/\s+/g, '-')}-${job.title.toLowerCase().replace(/\s+/g, '-')}`;
        jobs.push({
          id: jobId,
          company: company.name,
          title: job.title,
          location: job.location || 'Remote',
          description: job.description,
          tags: [...company.tags, ...job.requirements],
          isRemote: (job.location || '').toLowerCase().includes('remote'),
          isFeatured: true,
          postedAt: 'Recently posted',
          requirements: job.requirements,
          salary: job.salary
        });
      });
    });

    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
