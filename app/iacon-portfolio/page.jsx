'use client';

import React, { useState, useEffect, useRef } from 'react';
import { education, certifications, techStack, projects } from '@/lib/constants/index';
import { ExternalLink, Github, Package, Activity, Linkedin, Mail, FileCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import Image from 'next/image';
import Screen from '@/components/ui/Screen';
import Layer from '@/components/ui/Layer';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/HomePage/Hero/Hero';
import TechArsenals from '@/components/HomePage/TechArsenals';
import TraningModules from '@/components/HomePage/TraningModules';
import Credentials from '@/components/HomePage/Credentials';
import MissionLogs from '@/components/HomePage/MissionLogs';


// --- MAIN APP ---
const App = () => {
  return (
    <div className=" text-zinc-400 selection:bg-yellow-500 selection:text-black">
      {/* FIXED HUD */}
      <div className="flex flex-row fixed inset-0 pointer-events-none z-60">
        <div className="absolute bottom-6 left-6 text-[12px] text-zinc-500 tracking-[0.4em]">
          Autobot Comm Center // IACON
        </div>
        <div className="absolute bottom-6 right-6 flex items-center gap-2 text-zinc-500 tracking-[0.4em] text-[12px]">
          <Activity size={12} className="animate-pulse" />
          <span>CYBERTRON OS V4.2.6</span>
        </div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <Hero />

      <div className="relative z-20 stack-container">
        {/* TechStack */}
        <TechArsenals techStack={techStack} />

        {/* Education */}
        <TraningModules education={education} />

        {/* Certificates*/}
        <Credentials certifications={certifications} />

        {/* Projects */}
        <MissionLogs projects={projects} />
      </div>
    </div>
  );
};

export default App;