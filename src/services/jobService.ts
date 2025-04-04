
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
}

export async function fetchJobs(): Promise<JobData[]> {
  try {
    const response = await fetch('https://raw.githubusercontent.com/poteto/hiring-without-whiteboards/refs/heads/main/README.md');
    const text = await response.text();
    
    // Parse the markdown file
    const jobsSection = text.split('## Companies')[1].split('## Other')[0];
    const jobLines = jobsSection.split('\n').filter(line => line.startsWith('- ['));
    
    const jobs: JobData[] = jobLines.map((line, index) => {
      // Parse the line to extract company name and description
      const companyMatch = line.match(/- \[(.*?)\]/);
      const descriptionMatch = line.match(/- \[.*?\] (.*)/);
      
      const company = companyMatch ? companyMatch[1] : 'Unknown Company';
      const fullDescription = descriptionMatch ? descriptionMatch[1] : '';
      
      // Extract location if present (often in parentheses)
      let location = 'Worldwide';
      let description = fullDescription;
      const locationMatch = fullDescription.match(/\((.*?)\)/);
      
      if (locationMatch) {
        location = locationMatch[1];
        description = fullDescription.replace(locationMatch[0], '').trim();
      }

      // Extract tags from the description
      const commonTags = ['React', 'JavaScript', 'TypeScript', 'Web3', 'Frontend', 'Backend', 'Blockchain', 'Smart Contracts'];
      const tags = commonTags.filter(tag => 
        fullDescription.toLowerCase().includes(tag.toLowerCase())
      );
      
      // Add some default tags if none were found
      if (tags.length === 0) {
        tags.push(...['Engineering', 'Remote-Friendly'].slice(0, 2));
      }
      
      // Determine if the job is remote
      const isRemote = fullDescription.toLowerCase().includes('remote') || 
                      location.toLowerCase().includes('remote');
      
      // Feature some jobs randomly
      const isFeatured = Math.random() > 0.7;

      return {
        id: `job-${index}`,
        company,
        title: `${company} is hiring!`,
        location,
        description,
        tags,
        isRemote,
        isFeatured,
        postedAt: `${Math.floor(Math.random() * 14) + 1} ${Math.random() > 0.5 ? 'days' : 'weeks'} ago`
      };
    });
    
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
