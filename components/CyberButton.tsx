import React from 'react';
import { LucideIcon } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

interface CyberButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  download?: string;
  icon?: LucideIcon;
  variant?: 'neon' | 'pink' | 'purple';
  className?: string;
  target?: string;
  rel?: string;
}

const CyberButton: React.FC<CyberButtonProps> = ({ 
  text, 
  onClick, 
  href, 
  download,
  icon: Icon, 
  variant = 'neon', 
  className = '',
  target,
  rel
}) => {
  const colors = {
    neon: 'border-anime-neon text-anime-neon hover:bg-anime-neon/10',
    pink: 'border-anime-pink text-anime-pink hover:bg-anime-pink/10',
    purple: 'border-anime-purple text-anime-purple hover:bg-anime-purple/10'
  };

  const bgColors = {
    neon: 'bg-anime-neon',
    pink: 'bg-anime-pink',
    purple: 'bg-anime-purple'
  };

  const Component = href ? 'a' : 'button';

  const handleClick = (e: React.MouseEvent) => {
    playClickSound();
    if (onClick) onClick();
  };

  return (
    <Component
      href={href}
      onClick={handleClick}
      onMouseEnter={playHoverSound}
      download={download}
      target={target}
      rel={rel}
      className={`relative group inline-flex items-center justify-center gap-3 px-8 py-4 font-display font-bold uppercase tracking-widest border-2 transition-all duration-300 clip-button ${colors[variant]} ${className}`}
    >
      {/* Background slide animation */}
      <div className={`absolute inset-0 w-0 group-hover:w-full transition-all duration-300 opacity-10 ${bgColors[variant]}`} />
      
      {/* Corner accents */}
      <div className={`absolute top-0 right-0 w-2 h-2 ${bgColors[variant]} opacity-50`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 ${bgColors[variant]} opacity-50`} />
      
      {/* Tech decoration lines */}
      <div className="absolute -bottom-1 right-4 w-12 h-[2px] bg-current opacity-50 group-hover:w-20 transition-all" />
      <div className="absolute -top-1 left-4 w-8 h-[2px] bg-current opacity-50 group-hover:w-16 transition-all" />

      {/* Content */}
      {Icon && <Icon size={20} className="relative z-10 group-hover:animate-pulse" />}
      <span className="relative z-10 group-hover:tracking-[0.2em] transition-all duration-300">
        {text}
      </span>
    </Component>
  );
};

export default CyberButton;