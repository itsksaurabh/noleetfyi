import React from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Briefcase, DollarSign } from 'lucide-react';
import CompanyLogo from '@/components/CompanyLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JobPageProps {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary: string;
  tags: string[];
  isRemote: boolean;
  postedAt: string;
  description: string;
  requirements: string[];
}

const JobPage = () => {
  const { id } = useParams();
  // TODO: Fetch job details using the id
  const job: JobPageProps = {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Example Corp',
    location: 'Remote',
    salary: '$120k - $150k',
    tags: ['React', 'TypeScript', 'Web3'],
    isRemote: true,
    postedAt: '2d ago',
    description: 'We are looking for a Senior Frontend Developer...',
    requirements: [
      'Strong experience with React and TypeScript',
      'Experience with Web3 technologies',
      '5+ years of professional experience'
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="space-y-4">
          <div className="flex items-start gap-4">
            <CompanyLogo name={job.company} logo={job.companyLogo} size="lg" />
            <div className="space-y-2">
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <div className="text-lg text-muted-foreground">{job.company}</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {job.salary}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {job.postedAt}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              {job.isRemote ? 'Remote' : 'On-site'}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">Job Description</h3>
            <p className="text-muted-foreground">{job.description}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </section>

          <Button className="w-full mt-6" size="lg">
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPage;