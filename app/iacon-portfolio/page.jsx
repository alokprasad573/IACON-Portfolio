'use client';

import React, { useState, useEffect, useRef } from 'react';
import { education, certifications, techStack, projects } from '@/lib/constants/index';
import { Package, Activity, Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollStack, { ScrollStackItem } from '@/components/ui/animation/ScrollStack';


import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/HomePage/Hero/Hero';
import TechArsenals from '@/components/HomePage/TechArsenals';
import TraningModules from '@/components/HomePage/TraningModules';
import Credentials from '@/components/HomePage/Credentials';
import OperationLogs from '@/components/HomePage/OperationLogs';



// --- MAIN APP ---
const App = () => {

  return (
    <div className="text-zinc-400 selection:bg-yellow-500 selection:text-black">

      <Navbar />

      <Hero />

      <ScrollStack>
          <ScrollStackItem>
            <TechArsenals techStack={techStack} />
          </ScrollStackItem>
          <ScrollStackItem>
            <TraningModules education={education} />
          </ScrollStackItem>
          <ScrollStackItem>
            <Credentials certifications={certifications} />
          </ScrollStackItem>
          <ScrollStackItem>
            <OperationLogs projects={projects} />
          </ScrollStackItem>
        </ScrollStack>

      {/* FIXED HUD - Outside ScrollStack to ensure fixed positioning works correctly */}
      <div className="flex fixed inset-0 pointer-events-none z-100 tracking-[0.4em] text-[12px] text-zinc-500 opacity-50">
        <div className="absolute bottom-6 left-10 ">
          Autobot Comd Center // IACON
        </div>
        <div className="absolute bottom-6 right-10 flex items-center gap-2 ">
          <Activity size={12} className="animate-pulse" />
          <span>CYBRTRN OS V4.2.6</span>
        </div>
      </div>

    </div>
  );
};

export default App;