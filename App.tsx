
import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Cpu, Code, Layers, ChevronDown, Download, ExternalLink, Phone, Shield, Terminal, MousePointerClick } from 'lucide-react';
import GlitchText from './components/GlitchText';
import AnimeCard from './components/AnimeCard';
import SkillsChart from './components/SkillsChart';
import CyberButton from './components/CyberButton';
import ParticleBackground from './components/ParticleBackground';
import CyberModal from './components/CyberModal';
import { EXPERIENCE_DATA, PROJECTS_DATA, RESUME_SUMMARY } from './constants';
import { Experience } from './types';
import { playClickSound, playHoverSound, playOpenSound, initializeAudio } from './utils/soundEffects';

// Scroll Reveal Component
const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; animation?: string; delay?: string }> = ({ 
  children, 
  className = "", 
  animation = "animate-slide-up",
  delay = "0s"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${isVisible ? animation : 'opacity-0'}`} style={{ animationDelay: isVisible ? delay : '0s' }}>
      {children}
    </div>
  );
};

function App() {
  const [booting, setBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  // Boot sequence effect
  useEffect(() => {
    const logs = [
      "SYSTEM_BOOT_SEQUENCE_INIT...",
      "CHECKING_CORE_MEMORY... [OK]",
      "LOADING_NEURAL_LINKS... [OK]",
      "MOUNTING_DRIVES... [OK]",
      "ESTABLISHING_SECURE_CONNECTION...",
      "USER_AUTHENTICATED: GUEST",
      "WELCOME_TO_KAIN_DEV_SYSTEM_V2.0"
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setBootLogs(prev => [...prev, log]);
      }, delay);
    });

    setTimeout(() => {
      setBooting(false);
      setMounted(true);
    }, 2500);

    // Initialize audio early
    const initAudio = () => {
      initializeAudio();
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
  }, []);

  const navItems = [
    { label: 'WORK', id: 'projects' },
    { label: 'EXPERIENCE', id: 'missions' },
    { label: 'SKILLS', id: 'skills' },
    { label: 'CONTACT', id: 'contact' }
  ];

  const handleExperienceClick = (exp: Experience) => {
    playOpenSound();
    setSelectedExperience(exp);
  };

  const closeExperienceModal = () => {
    playClickSound();
    setSelectedExperience(null);
  };

  if (booting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-anime-neon p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-6 border-b border-anime-neon/30 pb-4">
             <Terminal size={24} className="animate-pulse" />
             <h1 className="text-2xl font-display font-bold tracking-widest">SYSTEM BOOT</h1>
          </div>
          <div className="space-y-2 text-sm h-64 overflow-hidden relative">
            {bootLogs.map((log, i) => (
              <div key={i} className="animate-[fade-in_0.2s_ease-out] border-l-2 border-anime-neon/50 pl-2">
                <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                {log}
              </div>
            ))}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>
          <div className="mt-6 h-1 w-full bg-anime-dark border border-anime-neon/30 rounded-full overflow-hidden">
            <div className="h-full bg-anime-neon animate-[width-grow_2s_ease-in-out_forwards]" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-anime-dark font-sans text-gray-300 selection:bg-anime-pink selection:text-white pb-20 overflow-x-hidden relative">
      <ParticleBackground />
      <CyberModal 
        isOpen={!!selectedExperience} 
        onClose={closeExperienceModal} 
        data={selectedExperience} 
      />
      
      {/* Navigation / Header HUD */}
      <header className="fixed top-0 left-0 w-full z-40 bg-anime-dark/90 backdrop-blur-md border-b border-white/5 shadow-[0_5px_20px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)} onMouseEnter={playHoverSound}>
            <div className="relative">
               <Cpu className="text-anime-neon group-hover:rotate-180 transition-transform duration-700" size={32} />
               <div className="absolute inset-0 bg-anime-neon blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-widest text-white leading-none">
                KAIN<span className="text-anime-pink">DEV</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500 tracking-[0.3em]">Frontend Developer</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10 font-mono text-sm text-gray-400">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={`#${item.id}`}
                onMouseEnter={playHoverSound}
                className="hover:text-anime-neon transition-colors relative group py-2"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-anime-neon group-hover:w-full transition-all duration-300"/>
                <span className="absolute -top-1 -right-2 text-[8px] text-anime-pink opacity-0 group-hover:opacity-100 transition-opacity">0{Math.floor(Math.random() * 9)}</span>
              </a>
            ))}
          </div>
          
          <div className="hidden lg:flex flex-col items-end text-xs font-mono text-anime-neon/70 border-r-2 border-anime-neon/30 pr-3">
             <span>SECURE_CONN</span>
             <span className="animate-pulse text-anime-pink">ENCRYPTED</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden perspective-1000">
        
        {/* Animated Perspective Grid */}
        <div 
          className="absolute inset-0 z-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
            transformOrigin: 'top center',
            maskImage: 'linear-gradient(to bottom, transparent, black 40%, transparent)',
          }}
        />

        {/* Floating Particles/Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-anime-pink rounded-full animate-float opacity-50" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-anime-neon rounded-full animate-float opacity-50 delay-1000" />
        <div className="absolute top-1/3 right-10 w-20 h-20 border border-anime-purple/20 rounded-full animate-spin-slow" />
        
        <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center relative">
          
          <div className={`space-y-8 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} transition-all duration-1000 ease-out`}>
             <div className="inline-flex items-center gap-2 px-4 py-2 border-l-4 border-anime-pink bg-anime-pink/5 backdrop-blur-sm">
               <span className="w-2 h-2 bg-anime-pink animate-pulse" />
               <span className="font-mono text-anime-pink font-bold tracking-[0.2em] text-sm">KAINAR ILYASOV</span>
             </div>
             
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white leading-[0.9] tracking-tighter">
               <GlitchText text="KAIN" /><br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-anime-neon via-white to-anime-purple animate-gradient">
                 DEV
               </span>
             </h1>
             
             <p className="text-lg md:text-xl text-gray-400 max-w-lg border-l-2 border-anime-neon/30 pl-6 font-mono leading-relaxed">
               {RESUME_SUMMARY}
             </p>
             
             <div className="flex flex-col sm:flex-row gap-6 pt-4">
               <CyberButton 
                 text="VIEW WORK" 
                 icon={Code} 
                 href="#projects"
                 variant="neon"
                 onClick={playClickSound}
               />
               <CyberButton 
                 text="DOWNLOAD CV" 
                 icon={Download} 
                 href={`${import.meta.env.BASE_URL}Kainar_Ilyasov_CV.pdf`}
                 download="Kainar_Ilyasov_CV.pdf"
                 variant="pink"
                 onClick={playClickSound}
               />
             </div>
          </div>

          <div className={`relative flex justify-center ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} transition-all duration-1000 delay-300 ease-out`}>
             <div className="relative w-80 h-80 md:w-96 md:h-96">
                {/* Rotating Rings */}
                <div className="absolute inset-0 border-2 border-dashed border-anime-purple/40 rounded-full animate-spin-slow" />
                <div className="absolute inset-4 border border-anime-neon/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-anime-neon/10 to-anime-pink/10 rounded-full blur-xl" />
                
                {/* Image Container */}
                <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-anime-dark/50 ring-2 ring-anime-neon/50 shadow-[0_0_50px_rgba(0,243,255,0.2)]">
                  <img 
                    src={`${import.meta.env.BASE_URL}avatar.jpg`} 
                    alt="Kainar Ilyasov" 
                    className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-scanline pointer-events-none opacity-20" />
                </div>

                {/* Floating Info Cards */}
                <div className="absolute -right-12 top-1/4 bg-anime-dark/90 backdrop-blur border border-anime-neon p-3 clip-corner shadow-lg animate-float delay-500">
                  <div className="text-anime-neon font-display font-bold text-2xl">LVL. 99</div>
                  <div className="text-[10px] text-gray-400 font-mono tracking-wider">SENIOR FRONTEND DEVELOPER</div>
                </div>

                <div className="absolute -left-12 bottom-1/4 bg-anime-dark/90 backdrop-blur border border-anime-pink p-3 clip-corner-inv shadow-lg animate-float delay-0">
                  <div className="text-anime-pink font-display font-bold text-xl">6+ YEARS</div>
                  <div className="text-[10px] text-gray-400 font-mono tracking-wider">EXP. GAINED</div>
                </div>
             </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group" onClick={() => { playClickSound(); document.getElementById('projects')?.scrollIntoView(); }} onMouseEnter={playHoverSound}>
          <ChevronDown className="text-gray-500 group-hover:text-anime-neon transition-colors" size={32} />
        </div>
      </section>

      {/* Deployed Units (Projects) Section */}
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="flex items-end gap-4 mb-16 border-b border-white/10 pb-4">
              <h2 className="text-4xl md:text-5xl font-display font-black text-white">
                DEPLOYED <span className="text-anime-neon">UNITS</span>
              </h2>
              <span className="font-mono text-anime-pink/80 text-sm mb-2">/ SELECTED_WORKS</span>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS_DATA.map((project, index) => (
              <ScrollReveal key={project.id} delay={`${index * 0.1}s`}>
                <AnimeCard 
                  className="h-full cursor-pointer" 
                  title={project.title} 
                  subtitle={`ROLE: ${project.role.toUpperCase()}`}
                  variant={index % 2 === 0 ? 'primary' : 'secondary'}
                  onClick={() => {
                    playClickSound();
                    if (project.url) window.open(project.url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <div className="group/image relative aspect-video mb-6 overflow-hidden border border-white/10">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110 group-hover/image:contrast-125"
                    />
                    <div className="absolute inset-0 bg-anime-neon/10 opacity-0 group-hover/image:opacity-100 transition-opacity" />
                    
                    {/* Hover Overlay Info */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
                      <div className="text-center">
                        <p className="text-anime-neon font-mono text-sm tracking-widest mb-2">ACCESS GRANTED</p>
                        <ExternalLink className="mx-auto text-white" size={24} />
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6 font-mono leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map(tech => (
                      <span key={tech} onMouseEnter={playHoverSound} className="px-2 py-1 bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:text-white hover:border-anime-neon/50 transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </AnimeCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Logs (Experience) Section - Cyberpunk Timeline */}
      <section id="missions" className="py-24 bg-black/20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="flex items-end justify-end gap-4 mb-16 border-b border-white/10 pb-4 text-right">
              <span className="font-mono text-anime-pink/80 text-sm mb-2">/ CAREER_HISTORY</span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white">
                MISSION <span className="text-anime-purple">LOGS</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Center Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 transform md:-translate-x-1/2">
               <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-anime-purple via-anime-pink to-transparent opacity-50" />
            </div>

            <div className="space-y-12">
              {EXPERIENCE_DATA.map((job, index) => (
                <ScrollReveal key={job.id} animation={index % 2 === 0 ? 'animate-slide-left' : 'animate-slide-right'}>
                  <div className={`relative flex flex-col md:flex-row gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Timeline Node */}
                    <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-anime-dark border-2 border-anime-purple rounded-full transform -translate-x-1.5 md:-translate-x-2 mt-6 z-10 shadow-[0_0_10px_rgba(188,19,254,0.5)]">
                      <div className="absolute inset-0 bg-anime-purple animate-ping opacity-20" />
                    </div>

                    {/* Content */}
                    <div className="md:w-1/2 pl-8 md:pl-0 md:px-8">
                       <div 
                         className="relative group cursor-pointer"
                         onClick={() => handleExperienceClick(job)}
                        >
                          {/* Connection Line */}
                          <div className={`absolute top-8 ${index % 2 === 0 ? 'right-0 md:-right-8' : 'left-0 md:-left-8'} w-8 h-[1px] bg-anime-purple/30 hidden md:block`} />
                          
                          <AnimeCard 
                            variant="secondary" 
                            className="p-6 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
                            hoverEffect={true}
                          >
                             <div className="absolute top-2 right-2 text-anime-purple/40 animate-pulse">
                               <MousePointerClick size={16} />
                             </div>
                             <div className="flex justify-between items-start mb-2">
                               <h3 className="text-xl font-display font-bold text-white group-hover:text-anime-purple transition-colors">{job.company}</h3>
                               <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded">{job.period}</span>
                             </div>
                             <div className="text-anime-purple font-mono text-sm mb-4 tracking-wider">{job.role}</div>
                             <p className="text-gray-400 text-sm line-clamp-2 italic">
                               Click to view decrypted mission details...
                             </p>
                          </AnimeCard>
                       </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sync Rates (Skills) Section */}
      <section id="skills" className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-anime-pink/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <ScrollReveal animation="animate-slide-right">
                <div className="space-y-6">
                   <div className="inline-block px-3 py-1 bg-anime-pink/10 border border-anime-pink/30 text-anime-pink font-mono text-xs">
                     SYSTEM DIAGNOSTICS
                   </div>
                   <h2 className="text-4xl md:text-5xl font-display font-black text-white">
                     SYNC <span className="text-anime-pink">RATES</span>
                   </h2>
                   <p className="text-gray-400 leading-relaxed font-mono">
                     Proficiency levels across core systems. High aptitude in React ecosystem and UI Engineering.
                     Continuously integrating new modules and technologies.
                   </p>
                   
                   <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-white/5 border border-white/10">
                        <div className="text-3xl font-display font-bold text-white mb-1">98%</div>
                        <div className="text-xs text-gray-500 font-mono">REACT MASTERY</div>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10">
                        <div className="text-3xl font-display font-bold text-white mb-1">100+</div>
                        <div className="text-xs text-gray-500 font-mono">PROJECTS COMPLETED</div>
                      </div>
                   </div>
                </div>
             </ScrollReveal>

             <ScrollReveal animation="animate-slide-left" delay="0.2s">
                <div className="h-[600px]">
                  <SkillsChart />
                </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-12 border-t border-white/10 bg-black relative">
        <div className="container mx-auto px-6 text-center">
           <ScrollReveal>
             <div className="max-w-2xl mx-auto space-y-8">
               <Cpu size={40} className="mx-auto text-anime-neon animate-spin-slow" />
               <h2 className="text-3xl font-display font-bold text-white">INITIATE COMMUNICATION</h2>
               <div className="flex flex-wrap justify-center gap-6">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-anime-neon/20 hover:text-anime-neon transition-colors border border-white/10 hover:border-anime-neon group clip-corner"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    <Linkedin size={20} />
                    <span className="font-mono text-sm">LINKEDIN_PROFILE</span>
                  </a>
                  <a 
                    href="mailto:kainar.ilyasov@gmail.com" 
                    className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-anime-pink/20 hover:text-anime-pink transition-colors border border-white/10 hover:border-anime-pink group clip-corner"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    <Mail size={20} />
                    <span className="font-mono text-sm">SEND_TRANSMISSION</span>
                  </a>
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-gray-400 clip-corner cursor-default">
                    <Phone size={20} />
                    <span className="font-mono text-sm">8-707-121-0103</span>
                  </div>
               </div>
               <p className="text-gray-600 text-xs font-mono pt-8">
                 © 2026 KAINDEV SYSTEM. ALL RIGHTS RESERVED. <br />
                 OPTIMIZED FOR CHROME VER. 99+
               </p>
             </div>
           </ScrollReveal>
        </div>
      </footer>
    </div>
  );
}

export default App;
