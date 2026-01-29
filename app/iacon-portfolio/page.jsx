'use client';

import React, { useState, useEffect, useRef } from 'react';
import CityScanBackground from '@/components/ui/CityScanBackGround';
import { education, certifications, techStack, projects } from '@/lib/constants/index';
import {
  Cpu,
  ShieldCheck,
  ExternalLink,
  Github,
  GraduationCap,
  Activity,
  Linkedin,
  Mail,
  FileCheck
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


import Image from 'next/image';

// --- DATA ---
// --- DATA ---
// Data is imported directly from @/lib/constants/index

// --- CYBER SCREEN COMPONENT ---
const CyberScreen = ({ children, accentColor = "#FFD700", glowLevel = 30, className = "", isStatic = false }) => {
  const screenRef = useRef(null);
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const screen = screenRef.current;
    const content = contentRef.current;

    // Static Mode for nested scroll containers
    if (isStatic) {
      gsap.set(screen, { opacity: 1, scaleX: 1, scaleY: 1, transformOrigin: "center" });
      gsap.set(content, { opacity: 1 });
      return;
    }

    // Initial State - Matches CyberFrame entry style
    gsap.set(screen, { scaleX: 0, scaleY: 0.002, opacity: 0, transformOrigin: "center", force3D: true });
    gsap.set(content, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: screen,
        start: "top 90%", // Trigger slightly earlier
        end: "bottom 20%",
        toggleActions: "play reverse play reverse"
      },
      defaults: { ease: "expo.out" }
    });

    // Exact animation sequence from CyberFrame
    tl.to(screen, { opacity: 1, scaleX: 1, duration: 0.5, ease: "expo.inOut" })
      .to(screen, { scaleY: 1, duration: 0.5 })
      .to(content, { opacity: 1, duration: 0.5 }, "-=0.2"); // Overlap slightly for smoothness

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={screenRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full bg-[#030712]/95 border backdrop-blur-xl overflow-hidden p-6 md:p-8 transition-all duration-300 accelerated flex flex-col ${className} z-50 hover:-translate-y-1`}
      style={{
        clipPath: 'polygon(0% 20px, 20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px))',
        boxShadow: isHovered ? `0 0 ${glowLevel * 1.5}px ${accentColor}66` : `0 0 ${glowLevel}px ${accentColor}33`,
        borderColor: accentColor,
        color: accentColor,
      }}
    >

      {/* Cyber-Frame Accents - Top Runner with Pips */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[2px]"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
      >
        <div className="absolute left-0 top-0 h-2 w-px bg-current" />
        <div className="absolute right-0 top-0 h-2 w-px bg-current" />
      </div>

      {/* Cyber-Frame Accents - Bottom Runner with Pips */}
      <div
        className="absolute bottom-0 left-[10%] right-[10%] h-[2px]"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
      >
        <div className="absolute left-0 bottom-0 h-2 w-px bg-current" />
        <div className="absolute right-0 bottom-0 h-2 w-px bg-current" />
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[2px] h-8 opacity-40 bg-current" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[2px] h-8 opacity-40 bg-current" />

      <div ref={contentRef} className="relative p-8 revelation-content w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

// --- STACK LAYER COMPONENT ---
const StackLayer = ({ children, index, className = "", isSticky = false }) => {
  return (
    <div className={`stack-layer relative bg-black w-full h-fit min-h-screen pointer-events-none ${isSticky ? 'sticky top-0 h-screen' : ''}`} style={{ zIndex: index }}>
      <div
        className={`scroll-layer relative w-full h-full min-h-screen flex items-center justify-center p-4 md:p-12 pointer-events-auto ${className}`}
      >
        <div className="w-full h-full max-w-[1600px] flex justify-center items-center accelerated p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  return (
    <div className=" text-brand-yellow/80 selection:bg-yellow-500 selection:text-black">
      {/* FIXED HUD */}
      <div className="fixed inset-0 pointer-events-none z-60">
        <div className="absolute top-0 w-full h-px bg-yellow-500/20"></div>
        <div className="absolute bottom-6 left-6 text-[9px] text-brand-yellow/40 tracking-[0.4em]">
          Autobot Command Center // V1.0.5
        </div>
        <div className="absolute top-6 right-8 flex items-center gap-2 text-brand-yellow/60 text-[10px]">
          <Activity size={12} className="animate-pulse" />
          <span>SCAN_ACTIVE</span>
        </div>
      </div>

      <nav className="fixed top-0 left-0 w-full z-100 border-b border-yellow-500/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-15 h-15 flex items-center justify-center">
              <Image src="/images/autobot_V.png" alt="Logo" width={150} height={150} />
            </div>
            <span className="text-lg font-black tracking-tighter text-brand-yellow italic">B-127 | ALOK PRASAD</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-contents sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="mb-6 inline-flex items-center gap-2 border border-yellow-500/20 px-4 py-1 rounded-full bg-yellow-500/5 backdrop-blur-md">
          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping"></div>
          <span className="text-[9px] font-mono tracking-widest uppercase text-brand-yellow font-bold">Bio-Link Established</span>
        </div>
        <div className="scroll-shrink">
          <h1 className="text-6xl text-brand-yellow leading-[0.9] tracking-tighter">
            Forged In Code <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #FFD700' }}>Powered By Cybertron</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-brand-yellow/60 tracking-[0.15em]">
            Frontend Developer // Data Scientist // Gen AI Developer
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-8 md:gap-12">
            {/* GitHub Link */}
            <a href="https://github.com/alokprasad573" className="group flex items-center gap-3 text-brand-yellow/50 hover:text-brand-yellow transition-all">
              <Github size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">Source_Code</span>
            </a>

            {/* LinkedIn Link */}
            <a href="#" className="group flex items-center gap-3 text-brand-yellow/50 hover:text-brand-yellow transition-all">
              <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">Neural_Network</span>
            </a>

            {/* Email Link */}
            <a href="mailto:contact@alok.prime" className="group flex items-center gap-3 text-brand-yellow/50 hover:text-brand-yellow transition-all">
              <Mail size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">Direct_Link</span>
            </a>
          </div>
          <div className='relative top-[15.5em]'>
            <p className='text-underline text-brand-yellow/40'>Scroll Down to Explore</p>
          </div>
        </div>
      </section>

      {/* THE STACK CONTAINER */}
      <div className="relative z-20 stack-container">
        {/* ARSENAL */}
        {/* ARSENAL */}
        <StackLayer index={2}>
          <div className="w-full h-fit flex flex-col">
            <div className="mb-8 shrink-0">
              <h2 className="text-4xl md:text-6xl text-brand-yellow mb-2">Arsenal</h2>
              <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(techStack).map(([cat, skills]) => (
                <CyberScreen key={cat} className="h-[250px] ">
                  <h3 className="text-brand-yellow text-xs mb-4 tracking-[0.2em] border-b border-yellow-500/20 pb-2">{cat}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(s => (
                      <span key={s} className="px-2 py-1 bg-yellow-500/10 text-brand-yellow text-[10px] border border-yellow-500/20 tracking-wider">
                        {s}
                      </span>
                    ))}
                  </div>
                </CyberScreen>
              ))}
            </div>
          </div>
        </StackLayer>

        {/* PROJECTS */}
        <StackLayer index={3}>
          <div className="w-full h-fit flex flex-col">
            <div className="mb-8 shrink-0">
              <h2 className="text-4xl md:text-6xl text-brand-yellow mb-2">Projects</h2>
              <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((proj, i) => (
                <CyberScreen key={i} className="h-fit">
                  <div className="flex flex-col h-full gap-6">
                    <div className="relative w-full aspect-video -z-20 border-2 border-yellow-500 overflow-hidden group">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div>
                      <div className="text-brand-yellow text-[9px] tracking-[0.5em] mb-2">Deployment_0{i + 1}</div>
                      <h3 className="text-2xl text-brand-yellow leading-none mb-3">{proj.title}</h3>
                      <p className="text-brand-yellow/60 text-[10px] leading-relaxed mb-4 min-h-[40px]">{proj.description}</p>
                      <div className="flex gap-4">
                        <a href={proj.github} className="text-brand-yellow flex items-center gap-2 font-bold uppercase text-[9px] tracking-widest hover:text-brand-yellow transition-colors">
                          <Github size={14} /> Source
                        </a>
                        <a href={proj.link} className="text-brand-yellow flex items-center gap-2 font-bold uppercase text-[9px] tracking-widest hover:text-brand-yellow transition-colors">
                          <ExternalLink size={14} /> Uplink
                        </a>
                      </div>
                    </div>
                  </div>
                </CyberScreen>
              ))}
            </div>
          </div>
        </StackLayer>

        {/* ACADEMIC */}
        <StackLayer index={4}>
          <div className="w-full h-fit flex flex-col">
            <div className="mb-8 shrink-0">
              <h2 className="text-4xl md:text-6xl text-brand-yellow mb-2">Academic</h2>
              <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
            </div>
            <div className='relative left-40 h-[500px] w-full max-w-5xl overflow-y-auto pr-2 scrollbar-hidden'>
              <div className="flex flex-col gap-4 w-full">
                {education.map((edu, index) => (
                  <CyberScreen key={index} className="h-fit min-h-0 p-6" isStatic={true}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                      {/* Header Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 text-brand-yellow mb-2">
                          <GraduationCap size={20} />
                          <span className="text-[10px] tracking-[0.2em] uppercase opacity-70">Academic_Node_0{index + 1}</span>
                        </div>
                        <h4 className="text-xl text-brand-yellow font-bold leading-tight">{edu.institute}</h4>
                        <p className="text-sm text-brand-yellow/80 mt-1">
                          {edu.degree} <span className="text-brand-yellow/40 mx-2">//</span> {edu.fieldOfStudy}
                        </p>
                      </div>

                      {/* Meta Data Grid - Horizontal on Desktop */}
                      <div className="flex flex-wrap gap-8 md:text-right shrink-0">
                        <div>
                          <div className="text-[8px] uppercase font-bold text-brand-yellow/50 mb-1 tracking-widest">Timeline</div>
                          <div className="text-sm font-bold text-brand-yellow uppercase">{edu.startDate} - {edu.endDate}</div>
                        </div>

                        <div>
                          <div className="text-[8px] uppercase font-bold text-brand-yellow/50 mb-1 tracking-widest">Score</div>
                          <div className="text-xl text-brand-yellow font-bold">{edu.gpa}</div>
                        </div>

                        <div className="hidden md:block">
                          <div className="text-[8px] uppercase font-bold text-brand-yellow/50 mb-1 tracking-widest">Status</div>
                          <div className="text-[9px] text-brand-yellow animate-pulse font-mono mt-1">COMPLETED</div>
                        </div>
                      </div>

                    </div>
                  </CyberScreen>
                ))}
              </div>
            </div>
          </div>
        </StackLayer>

        {/* CLEARANCES */}
        <StackLayer index={5}>
          <div className="w-full h-fit flex flex-col">
            <div className="mb-8 shrink-0">
              <h2 className="text-4xl md:text-6xl text-brand-yellow mb-2">Clearances</h2>
              <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {certifications.map((cert, i) => (
                <CyberScreen key={i} className="h-[250px]">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-15 h-15 shrink-0 border border-yellow-500/20 overflow-hidden bg-white/5">
                      <Image
                        src={cert.logo}
                        alt={cert.organization}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-brand-yellow text-sm font-bold leading-tight border-b border-yellow-500/20 pb-2 mb-1">{cert.title}</h4>
                      <p className="text-brand-yellow/60 text-[10px]">{cert.organization}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.learnings.slice(0, 6).map(l => (
                      <span key={l} className="text-[8px] bg-white/5 border border-white/10 px-1.5 py-0.5 text-brand-yellow/60">
                        {l}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center w-full">
                    <a
                      href={cert.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[9px] font-bold text-brand-yellow hover:text-brand-yellow transition-colors uppercase tracking-widest"
                    >
                      <FileCheck size={14} /> View_Certificate
                    </a>
                    <span className="text-[8px] text-green-500/60 font-mono">VERIFIED</span>
                  </div>
                </CyberScreen>
              ))}
            </div>
          </div>
        </StackLayer>
      </div>
    </div>
  );
};

export default App;