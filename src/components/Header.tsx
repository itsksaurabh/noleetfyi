
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-white/10 bg-black/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <img src="/crypto-career-connect/logo/logo.png" alt="Logo" className="h-8 w-auto logo-glow animate-logo-glow" onError={(e) => e.currentTarget.style.display = 'none'} />
          </Link>
          <span className="bg-noleet-light text-noleet-purple text-xs py-1 px-2 rounded-full font-medium">
            BETA
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/companies" className="text-white hover:text-purple-400">
            Companies
          </Link>
          <Link to="/" className="text-white hover:text-purple-400">
            Categories
          </Link>
          <Link to="/" className="text-white hover:text-purple-400">
            Blog
          </Link>
          <Link to="/" className="text-white hover:text-purple-400">
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
