
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Briefcase, CreditCard, Headphones, Database, Globe, BarChart, Palette } from 'lucide-react';

const categories = [
  { name: 'Engineering', icon: Code, count: 324 },
  { name: 'Business Development', icon: Briefcase, count: 186 },
  { name: 'Finance', icon: CreditCard, count: 147 },
  { name: 'Customer Support', icon: Headphones, count: 92 },
  { name: 'Data Science', icon: Database, count: 86 },
  { name: 'Marketing', icon: Globe, count: 143 },
  { name: 'Operations', icon: BarChart, count: 112 },
  { name: 'Design', icon: Palette, count: 76 },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Browse by Category
            </h2>
            <p className="text-gray-600 mt-2">
              Explore jobs across different blockchain industry categories
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All Categories
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link to="/" key={index} className="bg-white border rounded-lg p-5 flex flex-col card-hover">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-md bg-noleet-light flex items-center justify-center text-noleet-blue">
                    <Icon size={20} />
                  </div>
                  <span className="text-gray-500 text-sm">{category.count} jobs</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mt-3">
                  {category.name}
                </h3>
                <div className="mt-auto pt-4 flex items-center text-noleet-blue text-sm font-medium">
                  <span>View Jobs</span>
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
