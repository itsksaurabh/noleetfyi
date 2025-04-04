
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
      company.jobs.forEach((job: Job, index: number) => {
        jobs.push({
          id: `${company.name.toLowerCase()}-${index}`,
          company: company.name,
          title: job.title,
          location: job.location,
          description: job.description,
          tags: company.tags,
          isRemote: job.location.toLowerCase().includes('remote'),
          isFeatured: Math.random() > 0.7,
          postedAt: `${Math.floor(Math.random() * 14) + 1} ${Math.random() > 0.5 ? 'days' : 'weeks'} ago`,
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
