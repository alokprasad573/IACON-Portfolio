'use client';

import React from 'react';
import { education, certifications, techStack, projects } from '@/lib/constants/index';

import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/HomePage/Hero/Hero';
import TechArsenals from '@/components/HomePage/TechArsenals';
import TraningModules from '@/components/HomePage/TraningModules';
import Credentials from '@/components/HomePage/Credentials';
import OperationLogs from '@/components/HomePage/OperationLogs';
import CircuitryBg from '@/components/ui/CircuitryBg';


// --- MAIN APP ---
const Archive = () => {

  return (
    <div className="text-zinc-400 selection:bg-cyan-400 selection:text-black min-h-screen">
      <div className="fixed inset-0">
        <CircuitryBg />
      </div>
      <Navbar />
      <Hero />
      <main className='relative w-full'>
        <TechArsenals techStack={techStack} />
        <TraningModules education={education} />
        <Credentials certifications={certifications} />
        <OperationLogs projects={projects} />
      </main>
    </div>
  );
};

export default Archive;