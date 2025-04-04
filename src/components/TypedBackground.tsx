
import React, { useEffect, useRef } from 'react';

const techTerms = [
  "blockchain", "crypto", "ethereum", "solidity", "web3", "DeFi", 
  "NFT", "smart contracts", "bitcoin", "mining", "wallet", "DAO", 
  "tokenomics", "metaverse", "staking", "consensus", "scaling",
  "L2", "zkRollups", "EVM", "polygon", "React", "JavaScript", "frontend",
  "Python", "Rust", "DevOps", "cloud", "API", "fullstack"
];

const colors = {
  primary: '#8B5CF6',
  secondary: '#3B82F6',
  accent: '#6366F1',
  highlight: '#F472B6'
};

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
    for (let i = 0; i < 30; i++) {
      texts.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        term: techTerms[Math.floor(Math.random() * techTerms.length)],
        speed: 0.3 + Math.random() * 1.2,
        delay: Math.random() * 3000,
        size: 12 + Math.floor(Math.random() * 20),
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
      
      // Draw text with enhanced effects
      const pulseSpeed = 0.002;
      const baseOpacity = 0.15;
      const pulseAmount = 0.1;
      const opacity = baseOpacity + (Math.sin(time * pulseSpeed + index) * pulseAmount);
      
      ctx.globalAlpha = opacity;
      ctx.font = `${text.size}px 'JetBrains Mono', monospace`;
      
      // Dynamic color based on term category and time
      const colorShift = Math.sin(time * 0.001 + index * 0.1) * 20;
      let color = colors.accent;
      
      if (text.term.includes("ethereum") || text.term.includes("DeFi")) {
        color = `hsl(${265 + colorShift}, 89%, 65%)`; // Purple with shift
      } else if (text.term.includes("bitcoin") || text.term.includes("NFT")) {
        color = `hsl(${217 + colorShift}, 91%, 60%)`; // Blue with shift
      } else {
        color = `hsl(${238 + colorShift}, 84%, 67%)`; // Indigo with shift
      }
      
      ctx.fillStyle = color;
      ctx.fillText(text.term, text.x, text.y);
      
      // Add subtle glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
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
