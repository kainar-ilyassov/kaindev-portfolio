import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { SKILLS_DATA, SKILL_LIST } from '../constants';
import AnimeCard from './AnimeCard';

const SkillsChart: React.FC = () => {
  return (
    <AnimeCard title="Sync Rates (Skills)" variant="danger" className="h-full min-h-[400px]">
      <div className="border-t border-anime-pink/20 pt-4">
        <div className="text-lg font-display font-bold text-anime-pink mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-anime-pink rounded-sm animate-pulse"></span>
          INSTALLED MODULES
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILL_LIST.map((skill) => (
             <span 
               key={skill} 
               className="text-sm font-mono border border-anime-pink/30 px-3 py-1.5 bg-anime-pink/5 text-anime-pink/80 rounded-sm hover:bg-anime-pink/20 hover:text-white transition-colors cursor-default"
             >
               {skill}
             </span>
          ))}
        </div>
      </div>
    </AnimeCard>
  );
};

export default SkillsChart;