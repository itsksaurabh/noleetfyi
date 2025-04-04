
import React from 'react';

const PageFooter = () => {
  return (
    <footer className="border-t border-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Noleet. The best place to find crypto and blockchain jobs.
        </p>
      </div>
    </footer>
  );
};

export default PageFooter;
