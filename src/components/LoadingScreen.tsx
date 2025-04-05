import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: [0.5, 1.2, 1],
          opacity: [0, 1, 1]
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.6, 1]
        }}
        className="relative"
      >
        <motion.img
          src="/logo/logo.png"
          alt="Logo"
          className="w-32 h-32 object-contain"
          animate={{
            filter: [
              'drop-shadow(0 0 0 rgba(147, 51, 234, 0))',
              'drop-shadow(0 0 20px rgba(147, 51, 234, 0.7))',
              'drop-shadow(0 0 0 rgba(147, 51, 234, 0))'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;