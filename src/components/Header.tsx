
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-noleet-blue">
            Noleet
          </Link>
          <span className="bg-noleet-light text-noleet-purple text-xs py-1 px-2 rounded-full font-medium">
            BETA
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-noleet-blue">
            Find Jobs
          </Link>
          <Link to="/" className="text-gray-600 hover:text-noleet-blue">
            Companies
          </Link>
          <Link to="/" className="text-gray-600 hover:text-noleet-blue">
            Categories
          </Link>
          <Link to="/" className="text-gray-600 hover:text-noleet-blue">
            Blog
          </Link>
          <Link to="/" className="text-gray-600 hover:text-noleet-blue">
            Salary
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:flex">
            Sign In
          </Button>
          <Button className="btn-gradient">
            Post a Job
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
