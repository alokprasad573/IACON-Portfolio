'use client';

import React, { useState, useEffect, useRef } from 'react';
import { education, certifications, techStack, projects } from '@/lib/constants/index';
import { Package, Activity, ExternalLink } from 'lucide-react';

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

      <div className='relative w-full h-fit -z-10 inset-0'>
        <Hero />
        <TechArsenals techStack={techStack} />
        <TraningModules education={education} />
        <OperationLogs projects={projects} />
        <Credentials certifications={certifications} />
      </div>
    </div>
  );
};

export default App;