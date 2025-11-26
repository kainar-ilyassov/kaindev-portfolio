
import React, { useEffect } from 'react';
import { X, Cpu, Terminal } from 'lucide-react';
import { Experience } from '../types';

interface CyberModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Experience | null;
}

const CyberModal: React.FC<CyberModalProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-anime-dark border border-anime-neon/50 shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden clip-corner animate-slide-up">
        
        {/* Header */}
        <div className="bg-anime-neon/10 border-b border-anime-neon/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Terminal className="text-anime-neon animate-pulse" size={20} />
             <h3 className="font-display font-bold text-white tracking-widest text-lg">
               FILE_ACCESS: {data.company.toUpperCase()}
             </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 max-h-[70vh] overflow-y-auto scrollbar-thin">
           <div className="flex flex-col md:flex-row justify-between mb-8 border-b border-white/10 pb-6">
              <div>
                <div className="text-xs font-mono text-anime-pink mb-1">DESIGNATION</div>
                <div className="text-xl md:text-2xl text-white font-bold">{data.role}</div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-xs font-mono text-anime-pink mb-1">TIMEFRAME</div>
                <div className="text-lg text-white font-mono">{data.period}</div>
              </div>
           </div>

           <div className="space-y-6">
             <div className="flex items-center gap-2 text-anime-neon/80 text-sm font-mono tracking-wider mb-2">
               <Cpu size={14} />
               <span>MISSION_LOGS_DECRYPTED</span>
             </div>
             
             <ul className="space-y-4">
               {data.details.map((detail, index) => (
                 <li 
                   key={index}
                   className="flex items-start gap-3 text-gray-300 leading-relaxed group"
                 >
                   <span className="mt-1.5 w-1.5 h-1.5 bg-anime-purple group-hover:bg-anime-neon group-hover:shadow-[0_0_8px_rgba(0,243,255,0.8)] transition-all rounded-full shrink-0" />
                   <span>{detail}</span>
                 </li>
               ))}
             </ul>
           </div>
        </div>

        {/* Footer Decos */}
        <div className="h-2 bg-gradient-to-r from-anime-purple via-anime-pink to-anime-neon" />
        <div className="absolute bottom-4 right-4 text-[10px] text-gray-600 font-mono">
           SECURE_CONNECTION_ESTABLISHED
        </div>
      </div>
    </div>
  );
};

export default CyberModal;
