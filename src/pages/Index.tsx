
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import JobsSection from '@/components/JobsSection';
import CategorySection from '@/components/CategorySection';
import CompaniesSection from '@/components/CompaniesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <JobsSection />
        <CategorySection />
        <CompaniesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
