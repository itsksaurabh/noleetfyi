
import React, { useState } from 'react';
import { Search, Briefcase, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import JobCard, { JobCardProps } from '@/components/JobCard';
import { Badge } from '@/components/ui/badge';
import JobPostForm from '@/components/JobPostForm';

const Index = () => {
  const [showJobForm, setShowJobForm] = useState(false);

  // Sample job data
  const JOBS: JobCardProps[] = [
    {
      id: '1',
      title: 'Senior Blockchain Engineer',
      company: 'Ethereum Foundation',
      companyLogo: '',
      location: 'Worldwide',
      salary: '$120K - $180K',
      tags: ['Smart Contracts', 'Solidity', 'Ethereum'],
      isRemote: true,
      isFeatured: true,
      postedAt: '2 days ago'
    },
    {
      id: '2',
      title: 'Crypto Marketing Manager',
      company: 'Binance',
      companyLogo: '',
      location: 'Singapore',
      salary: '$90K - $120K',
      tags: ['Marketing', 'Social Media', 'Growth'],
      isRemote: true,
      isFeatured: false,
      postedAt: '3 days ago'
    },
    {
      id: '3',
      title: 'Frontend Developer - DeFi Focus',
      company: 'Uniswap Labs',
      companyLogo: '',
      location: 'New York',
      salary: '$110K - $150K',
      tags: ['React', 'Web3.js', 'DeFi'],
      isRemote: true,
      isFeatured: false,
      postedAt: '1 week ago'
    },
    {
      id: '4',
      title: 'Product Designer - NFT Marketplace',
      company: 'OpenSea',
      companyLogo: '',
      location: 'Los Angeles',
      salary: '$100K - $140K',
      tags: ['UI/UX', 'NFT', 'Product Design'],
      isRemote: false,
      isFeatured: false,
      postedAt: '2 weeks ago'
    }
  ];

  return (
    <div className="min-h-screen bg-noleet-dark text-white">
      <header className="border-b border-gray-800 bg-noleet-dark/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-noleet-blue">
              Noleet
            </h1>
            <span className="bg-noleet-purple/20 text-noleet-purple text-xs py-1 px-2 rounded-full font-medium">
              BETA
            </span>
          </div>
          
          <Button 
            className="btn-gradient" 
            onClick={() => setShowJobForm(!showJobForm)}
          >
            <Briefcase size={16} className="mr-2" />
            {showJobForm ? "Close Form" : "Post a Job"}
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-8">
          {showJobForm ? (
            <JobPostForm />
          ) : (
            <>
              <div>
                <h2 className="text-3xl font-bold mb-2">Find Your Next Crypto Job</h2>
                <p className="text-gray-400">Companies that don't have a broken hiring process</p>
              </div>
              
              <div className="glass-card p-4 flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input 
                    type="text" 
                    placeholder="Job title, keywords, or company" 
                    className="bg-secondary border-gray-700 pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-gray-700 text-gray-300 flex gap-2">
                    <Filter size={16} />
                    Filter
                  </Button>
                  <Button className="btn-gradient min-w-[100px]">
                    Search
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-secondary text-gray-300 hover:bg-secondary/80">Remote</Badge>
                <Badge className="bg-secondary text-gray-300 hover:bg-secondary/80">Full-time</Badge>
                <Badge className="bg-secondary text-gray-300 hover:bg-secondary/80">Engineering</Badge>
                <Badge className="bg-secondary text-gray-300 hover:bg-secondary/80">Marketing</Badge>
              </div>
              
              <div className="space-y-4">
                {JOBS.map(job => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      
      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Noleet. The best place to find crypto and blockchain jobs.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
