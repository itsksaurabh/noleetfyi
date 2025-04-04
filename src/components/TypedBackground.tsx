
import React, { useEffect, useRef } from 'react';

const techTerms = [
  "blockchain", "crypto", "ethereum", "solidity", "web3", "DeFi", 
  "NFT", "smart contracts", "bitcoin", "mining", "wallet", "DAO", 
  "tokenomics", "metaverse", "staking", "consensus", "scaling",
  "L2", "zkRollups", "EVM", "polygon", "React", "JavaScript", "frontend",
  "Python", "Rust", "DevOps", "cloud", "API", "fullstack"
];

interface TypedTextProps {
  x: number;
  y: number;
  term: string;
  speed: number;
  delay: number;
  size: number;
}

const TypedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | null>(null);
  const textsRef = useRef<TypedTextProps[]>([]);
  
  const createRandomTexts = () => {
    const texts: TypedTextProps[] = [];
    for (let i = 0; i < 20; i++) {
      texts.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        term: techTerms[Math.floor(Math.random() * techTerms.length)],
        speed: 0.2 + Math.random() * 0.8,
        delay: Math.random() * 5000,
        size: 10 + Math.floor(Math.random() * 16),
      });
    }
    return texts;
  };
  
  const animate = (time: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw texts
    textsRef.current.forEach((text, index) => {
      if (time < text.delay) return;
      
      // Update positions
      text.x -= text.speed;
      if (text.x < -200) {
        text.x = canvas.width + 100;
        text.y = Math.random() * canvas.height;
        text.term = techTerms[Math.floor(Math.random() * techTerms.length)];
      }
      
      // Draw text
      const opacity = 0.1 + (Math.sin(time * 0.001 + index) * 0.05);
      ctx.globalAlpha = opacity;
      ctx.font = `${text.size}px monospace`;
      ctx.fillStyle = text.term.includes("ethereum") || text.term.includes("DeFi") 
        ? '#8B5CF6' 
        : text.term.includes("bitcoin") || text.term.includes("NFT")
          ? '#3B82F6'
          : '#6366F1';
      ctx.fillText(text.term, text.x, text.y);
    });
    
    requestIdRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    textsRef.current = createRandomTexts();
    requestIdRef.current = requestAnimationFrame(animate);
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default TypedBackground;
