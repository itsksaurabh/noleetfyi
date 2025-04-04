
import React from 'react';
import JobCard, { JobCardProps } from './JobCard';
import { Button } from '@/components/ui/button';

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
    isFeatured: true,
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
  },
  {
    id: '5',
    title: 'Community Manager',
    company: 'Polygon',
    companyLogo: '',
    location: 'San Francisco',
    salary: '$80K - $100K',
    tags: ['Community', 'Discord', 'Social'],
    isRemote: true,
    isFeatured: false,
    postedAt: '3 days ago'
  },
  {
    id: '6',
    title: 'Cryptography Researcher',
    company: 'Zcash',
    companyLogo: '',
    location: 'Boulder',
    salary: '$130K - $170K',
    tags: ['Cryptography', 'Zero-knowledge', 'Research'],
    isRemote: true,
    isFeatured: true,
    postedAt: '1 day ago'
  }
];

const JobsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Jobs
            </h2>
            <p className="text-gray-600 mt-2">
              Discover opportunities at top blockchain companies
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All Jobs
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOBS.map(job => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="btn-gradient px-8">
            Load More Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
