import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CloseButton } from '@/components/ui/close-button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ApplicationFormProps {
  jobTitle: string;
  company: string;
  onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobTitle, company, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      phone: '',
      resume: ''
    };

    // Full name validation
    const fullNameTrimmed = formData.fullName.trim();
    if (!fullNameTrimmed) {
      newErrors.fullName = 'Full name is required';
    } else if (fullNameTrimmed.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional)
    if (formData.phone) {
      const phoneClean = formData.phone.replace(/\s+/g, '');
      if (!/^\+?[1-9]\d{1,14}$/.test(phoneClean)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    // Resume validation
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    } else {
      const fileType = formData.resume.type;
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(fileType)) {
        newErrors.resume = 'Please upload a PDF or Word document';
      }
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    // Generate unique application ID
    const applicationId = `APP-${Date.now()}`;

    // Prepare email body with application details
    const emailBody = `
Job Application
--------------
Application ID: ${applicationId}

Position Details:
- Job Title: ${jobTitle}
- Company: ${company}

Applicant Information:
- Full Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}

Cover Letter:
${formData.coverLetter || 'Not provided'}

Note: Resume is attached to this email.
`;

    // Create form data for file attachment
    const formDataToSend = new FormData();
    if (formData.resume) {
      formDataToSend.append('resume', formData.resume);
    }

    // Create mailto link
    const mailtoLink = `mailto:itsksaurabh@gmail.com?subject=Job Application: ${jobTitle} at ${company}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;
    
    toast.success('Opening your email client...');
    onClose();
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="bg-background rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <CloseButton onClick={onClose} className="absolute right-4 top-4" />
        <h2 className="text-2xl font-bold mb-4">Apply for {jobTitle}</h2>
        <p className="text-muted-foreground mb-6">at {company}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <Input
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="resume" className="block text-sm font-medium mb-1">
              Resume *
            </label>
            <Input
              id="resume"
              name="resume"
              type="file"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className={`cursor-pointer ${errors.resume ? 'border-red-500' : ''}`}
            />
            {errors.resume && (
              <p className="text-red-500 text-xs mt-1">{errors.resume}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>

          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium mb-1">
              Cover Letter
            </label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder="Tell us why you're interested in this position..."
              className="min-h-[120px]"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 btn-gradient"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⚬</span>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ApplicationForm;