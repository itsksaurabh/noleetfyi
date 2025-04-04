
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const JobPostForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock form submission
    toast.success("Job posted successfully! We'll review and publish it soon.");
  };

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Post a Job</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
            Company Name
          </label>
          <Input 
            id="company"
            type="text" 
            placeholder="e.g., Ethereum Foundation" 
            className="bg-secondary border-gray-700"
          />
        </div>
        
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-1">
            Position
          </label>
          <Input 
            id="position"
            type="text" 
            placeholder="e.g., Senior Blockchain Engineer" 
            className="bg-secondary border-gray-700"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
            Location
          </label>
          <Input 
            id="location"
            type="text" 
            placeholder="e.g., Remote, New York, Worldwide" 
            className="bg-secondary border-gray-700"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Job Description
          </label>
          <Textarea 
            id="description"
            placeholder="Describe the role, requirements, and benefits..." 
            className="bg-secondary border-gray-700 min-h-[120px]"
          />
        </div>
        
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-300 mb-1">
            Salary Range (Optional)
          </label>
          <Input 
            id="salary"
            type="text" 
            placeholder="e.g., $100K - $150K" 
            className="bg-secondary border-gray-700"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Contact Email
          </label>
          <Input 
            id="email"
            type="email" 
            placeholder="hiring@company.com" 
            className="bg-secondary border-gray-700"
          />
        </div>
        
        <Button type="submit" className="w-full btn-gradient">
          Submit Job Posting
        </Button>
      </form>
    </div>
  );
};

export default JobPostForm;
