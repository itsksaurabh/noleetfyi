
import React from 'react';
import { Button } from '@/components/ui/button';

const companies = [
  { id: 1, name: 'Ethereum', logoPlaceholder: 'E', jobCount: 28 },
  { id: 2, name: 'Binance', logoPlaceholder: 'B', jobCount: 42 },
  { id: 3, name: 'Coinbase', logoPlaceholder: 'C', jobCount: 37 },
  { id: 4, name: 'Polygon', logoPlaceholder: 'P', jobCount: 19 },
  { id: 5, name: 'Solana', logoPlaceholder: 'S', jobCount: 23 },
  { id: 6, name: 'Algorand', logoPlaceholder: 'A', jobCount: 14 },
  { id: 7, name: 'Chainlink', logoPlaceholder: 'C', jobCount: 16 },
  { id: 8, name: 'Ripple', logoPlaceholder: 'R', jobCount: 21 },
  { id: 9, name: 'Aave', logoPlaceholder: 'A', jobCount: 11 },
  { id: 10, name: 'Uniswap', logoPlaceholder: 'U', jobCount: 18 },
];

const CompaniesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Top Companies Hiring
            </h2>
            <p className="text-gray-600 mt-2">
              Explore opportunities at leading blockchain companies
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All Companies
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {companies.map(company => (
            <div key={company.id} className="bg-white border rounded-lg p-5 flex flex-col items-center text-center card-hover">
              <div className="w-16 h-16 rounded-md bg-noleet-light flex items-center justify-center text-noleet-blue font-bold text-xl mb-3">
                {company.logoPlaceholder}
              </div>
              <h3 className="text-gray-800 font-medium">{company.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{company.jobCount} jobs</p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button className="btn-gradient px-8">
            Browse All Companies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
