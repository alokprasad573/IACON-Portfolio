'use client';

import React, { useState } from 'react';
import { education, certifications, techStack, projects } from '@/lib/constants/index';

import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/HomePage/Hero/Hero';
import TechArsenals from '@/components/HomePage/TechArsenals';
import TraningModules from '@/components/HomePage/TraningModules';
import Credentials from '@/components/HomePage/Credentials';
import OperationLogs from '@/components/HomePage/OperationLogs';
import CircuitryBg from '@/components/ui/CircuitryBg';
import CommLink from '@/components/HomePage/CoomLink';


// --- MAIN APP ---
const Archive = () => {
  const [isCommLinkOpen, setIsCommLinkOpen] = useState(false);

  return (
    <div className="text-zinc-400 selection:bg-cyan-400 selection:text-black min-h-screen">
      <div className="fixed inset-0">
        <CircuitryBg />
      </div>
      <Navbar onCommLinkClick={() => setIsCommLinkOpen(true)} />

      {isCommLinkOpen && (
        <div className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <CommLink onClose={() => setIsCommLinkOpen(false)} />
        </div>
      )}

      <Hero onCommLinkClick={() => setIsCommLinkOpen(true)} />
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