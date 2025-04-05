import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
import CompanyLogo from '@/components/CompanyLogo';
import ApplicationForm from '@/components/ApplicationForm';
import { fetchJobs } from '@/services/jobService';

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
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [job, setJob] = useState<JobPageProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      try {
        const jobs = await fetchJobs();
        const foundJob = jobs.find(j => j.id === id);
        if (foundJob) {
          setJob({
            ...foundJob,
            companyLogo: undefined // Add company logo handling if needed
          });
        }
      } catch (error) {
        console.error('Error loading job:', error);
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-noleet-blue"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto p-8 text-center">
          <p className="text-lg text-gray-400">Job not found.</p>
        </Card>
      </div>
    );
  }

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

          <Button 
            className="w-full mt-6" 
            size="lg" 
            onClick={() => setShowApplicationForm(true)}
          >
            Apply Now
          </Button>

          {showApplicationForm && (
            <ApplicationForm
              jobTitle={job.title}
              company={job.company}
              onClose={() => setShowApplicationForm(false)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPage;