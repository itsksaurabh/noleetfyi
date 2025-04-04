
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  showJobForm: boolean;
  toggleJobForm: () => void;
}

const PageHeader = ({ showJobForm, toggleJobForm }: PageHeaderProps) => {
  return (
    <header className="border-b border-gray-800 bg-noleet-dark/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/f4cf0849-4e11-4bd2-9ded-05730040b25c.png" 
            alt="Noleet" 
            className="h-10 w-auto logo-glow"
          />
        </div>
        
        <Button 
          className="btn-gradient" 
          onClick={toggleJobForm}
        >
          <Briefcase size={16} className="mr-2" />
          {showJobForm ? "Close Form" : "Post a Job"}
        </Button>
      </div>
    </header>
  );
};

export default PageHeader;
