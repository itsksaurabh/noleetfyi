import React from 'react';

interface CompanyLogoProps {
  name: string;
  logo?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ 
  name, 
  logo, 
  size = 'md',
  className = ''
}) => {
  // Generate a consistent abbreviation for the company logo
  const getAbbreviation = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return name.substring(0, 2).toUpperCase();
    }
    return words.slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase();
  };

  // Generate a random color based on company name
  const getLogoBackground = (name: string) => {
    const colors = [
      'from-blue-500 to-blue-700',
      'from-purple-500 to-purple-700',
      'from-green-500 to-green-700',
      'from-red-500 to-red-700',
      'from-yellow-500 to-yellow-700',
      'from-pink-500 to-pink-700'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-12 w-12 text-xl',
    lg: 'h-16 w-16 text-2xl'
  };

  // Try to load the company logo from public directory
  const logoPath = `/companies/${name.toLowerCase()}.png`;

  return (
    <div 
      className={`
        relative 
        ${sizeClasses[size]} 
        ${className}
      `}
    >
      {/* Hexagonal Background */}
      <div 
        className={`
          absolute 
          inset-0 
          bg-gradient-to-br 
          ${getLogoBackground(name)} 
          clip-path-hexagon
        `}
      />
      
      {/* Logo or Abbreviation */}
      <div 
        className="
          absolute 
          inset-0 
          flex 
          items-center 
          justify-center 
          font-bold 
          text-white
        "
      >
        {logo ? (
          <img 
            src={logo} 
            alt={name} 
            className="
              h-3/4 
              w-3/4 
              object-contain
            " 
          />
        ) : (
          <img 
            src="/logo/logo.png" 
            alt={name} 
            className="
              h-3/4 
              w-3/4 
              object-contain
            " 
          />
        )}
      </div>
    </div>
  );
};

export default CompanyLogo;