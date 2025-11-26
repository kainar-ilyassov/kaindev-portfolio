import React from 'react';
import { playHoverSound } from '../utils/soundEffects';

interface AnimeCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  delay?: number;
  hoverEffect?: boolean;
  onMouseEnter?: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ 
  children, 
  className = '', 
  title, 
  subtitle,
  variant = 'primary',
  delay = 0,
  hoverEffect = true,
  onMouseEnter
}) => {
  const styles = {
    primary: {
      border: 'border-anime-neon',
      bg: 'bg-anime-neon',
      text: 'text-anime-neon',
      glow: 'group-hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]'
    },
    secondary: {
      border: 'border-anime-purple',
      bg: 'bg-anime-purple',
      text: 'text-anime-purple',
      glow: 'group-hover:shadow-[0_0_20px_rgba(188,19,254,0.3)]'
    },
    danger: {
      border: 'border-anime-pink',
      bg: 'bg-anime-pink',
      text: 'text-anime-pink',
      glow: 'group-hover:shadow-[0_0_20px_rgba(255,0,85,0.3)]'
    }
  };

  const s = styles[variant];

  const handleMouseEnter = () => {
    playHoverSound();
    if (onMouseEnter) onMouseEnter();
  };

  return (
    <div 
      className={`relative group ${className} transition-opacity duration-500`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={handleMouseEnter}
    >
      {/* Hover border expansion */}
      <div className={`absolute -inset-[1px] ${s.bg} opacity-20 group-hover:opacity-40 clip-corner transition-opacity duration-300`} />
      
      {/* Main container */}
      <div className={`h-full relative bg-anime-panel/90 backdrop-blur-md border ${s.border}/30 p-6 clip-corner transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${s.glow} overflow-hidden`}>
        
        {/* Scanner Effect */}
        {hoverEffect && (
          <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none group-hover:animate-scan-fast transition-all" />
        )}

        {/* Tech markings */}
        <div className={`absolute top-0 right-8 w-16 h-[2px] ${s.bg} opacity-50`} />
        <div className={`absolute bottom-0 left-8 w-16 h-[2px] ${s.bg} opacity-50`} />
        
        {/* Corner Decos */}
        <svg className={`absolute top-0 left-0 w-8 h-8 ${s.text} opacity-50`} viewBox="0 0 40 40">
          <path d="M0 0 L20 0 L0 20 Z" fill="currentColor" />
        </svg>
        <svg className={`absolute bottom-0 right-0 w-6 h-6 ${s.text} opacity-50 rotate-180`} viewBox="0 0 40 40">
          <path d="M0 0 L20 0 L0 20 Z" fill="currentColor" />
        </svg>

        {/* Title Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between mb-6 border-b border-white/5 pb-4 relative z-10">
            <div>
              {title && (
                <h3 className={`font-display font-bold uppercase tracking-widest ${s.text} text-xl flex items-center gap-2`}>
                   <span className="w-2 h-2 bg-current rotate-45 inline-block"></span>
                   {title}
                </h3>
              )}
              {subtitle && (
                <div className="text-gray-500 font-mono text-xs mt-1 pl-4 tracking-wider">
                  {subtitle}
                </div>
              )}
            </div>
            <div className="flex gap-1">
              <div className={`w-1 h-1 rounded-full ${s.bg} animate-pulse`} />
              <div className={`w-1 h-1 rounded-full ${s.bg} animate-pulse delay-75`} />
              <div className={`w-1 h-1 rounded-full ${s.bg} animate-pulse delay-150`} />
            </div>
          </div>
        )}
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;