
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CloseButton } from '@/components/ui/close-button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface JobPostFormProps {
  onClose: () => void;
}

interface FormData {
  company: string;
  position: string;
  location: string;
  description: string;
  salary: string;
  email: string;
}

const JobPostForm = ({ onClose }: JobPostFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    position: '',
    location: '',
    description: '',
    salary: '',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id as keyof FormData]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Mock form submission
      toast.success("Job posted successfully! We'll review and publish it soon.");
      onClose();
    } else {
      toast.error('Please fill in all required fields correctly.');
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="glass-card p-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <CloseButton onClick={onClose} variant="dark" className="absolute right-4 top-4" />
        <h2 className="text-2xl font-bold mb-6 text-white">Post a Job</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
              Company Name *
            </label>
            <Input 
              id="company"
              type="text" 
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Ethereum Foundation" 
              className={`bg-secondary border-gray-700 ${errors.company ? 'border-red-500' : ''}`}
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-1">
              Position *
            </label>
            <Input 
              id="position"
              type="text" 
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g., Senior Blockchain Engineer" 
              className={`bg-secondary border-gray-700 ${errors.position ? 'border-red-500' : ''}`}
            />
            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
              Location *
            </label>
            <Input 
              id="location"
              type="text" 
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Remote, New York, Worldwide" 
              className={`bg-secondary border-gray-700 ${errors.location ? 'border-red-500' : ''}`}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Job Description *
            </label>
            <Textarea 
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, requirements, and benefits..." 
              className={`bg-secondary border-gray-700 min-h-[120px] ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-300 mb-1">
              Salary Range (Optional)
            </label>
            <Input 
              id="salary"
              type="text" 
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., $100K - $150K" 
              className="bg-secondary border-gray-700"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Contact Email *
            </label>
            <Input 
              id="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="hiring@company.com" 
              className={`bg-secondary border-gray-700 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <Button type="submit" className="w-full btn-gradient">
            Submit Job Posting
          </Button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobPostForm;
