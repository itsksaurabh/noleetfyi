
import React, { useState, useEffect } from 'react';
import { Briefcase, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  showJobForm: boolean;
  toggleJobForm: () => void;
}

const PageHeader = ({ showJobForm, toggleJobForm }: PageHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 opacity-60 hover:opacity-100 ${isScrolled ? 'bg-black/80 shadow-lg shadow-purple-500/10' : 'bg-transparent'}`}
    >
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-4 px-6">
          <motion.div 
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/">
              <img 
                src="/logo/logo.png" 
                alt="Noleet" 
                className="h-12 w-auto logo-glow transition-transform duration-300 hover:scale-110 animate-logo-glow"
              />
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className="nav-button text-white hover:text-purple-400">Home</Link>
              <Link to="/companies" className="nav-button text-white hover:text-purple-400">Companies</Link>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                className="btn-gradient hover:scale-105 transition-transform duration-300" 
                onClick={toggleJobForm}
              >
                <Briefcase size={16} className="mr-2" />
                {showJobForm ? "Close Form" : "Post a Job"}
              </Button>
            </motion.div>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-lg border-t border-gray-800"
            >
              <div className="p-4 flex flex-col gap-2">
                <Link 
                  to="/" 
                  className="nav-button text-white hover:text-purple-400 w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/companies" 
                  className="nav-button text-white hover:text-purple-400 w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Companies
                </Link>
                <Button 
                  className="btn-gradient w-full mt-2" 
                  onClick={() => {
                    toggleJobForm();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Briefcase size={16} className="mr-2" />
                  {showJobForm ? "Close Form" : "Post a Job"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default PageHeader;
