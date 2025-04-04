
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-noleet-blue">
              Noleet
            </Link>
            <p className="mt-4 text-gray-600">
              Connecting top talent with leading companies in the blockchain space.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-500 hover:text-noleet-blue">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-noleet-blue">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-noleet-blue">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Job Seekers</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Browse Jobs</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Companies</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Categories</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Salary Guide</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Remote Jobs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Employers</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Post a Job</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Pricing</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Employer Resources</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Success Stories</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Hiring Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">About Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Blog</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Contact Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-noleet-blue">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Noleet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
