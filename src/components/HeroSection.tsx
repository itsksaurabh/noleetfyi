
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-primary relative">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Find Your Dream Job in Crypto &amp; Blockchain
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Connect with top companies in the blockchain space and discover opportunities that match your skills and passion
        </p>

        <div className="bg-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              type="text" 
              placeholder="Job title, keywords, or company" 
              className="pl-10 h-12 border-none shadow-none"
            />
          </div>
          <Input 
            type="text" 
            placeholder="Location" 
            className="h-12 border-none shadow-none md:max-w-[180px]"
          />
          <Button className="bg-noleet-blue text-white h-12 px-6">
            Search Jobs
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Remote
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Engineering
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Marketing
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Design
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Business
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
