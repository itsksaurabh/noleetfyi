import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-noleet-dark">
      <motion.div 
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/logo/logo.png" 
          alt="Noleet" 
          className="w-48 h-48 mx-auto mb-8 logo-glow animate-logo-glow"
        />
        <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
        <p className="text-2xl text-purple-400 mb-6">Oops! This page seems to have gone crypto...</p>
        <p className="text-lg text-gray-400 mb-8">Even our blockchain couldn't validate this route! 🤔</p>
        <Link 
          to="/" 
          className="btn-gradient px-6 py-3 rounded-lg text-white hover:scale-105 transition-transform duration-300"
        >
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
