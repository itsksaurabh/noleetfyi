
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-primary">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Looking to hire crypto talent?
        </h2>
        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
          Post your job on Noleet and reach thousands of qualified blockchain professionals
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-noleet-blue hover:bg-gray-100">
            Post a Job
          </Button>
          <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
