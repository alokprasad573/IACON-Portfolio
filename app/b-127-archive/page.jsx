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
import HeroExperience from '@/components/HeroModels/HeroExperience';


// --- MAIN APP ---
const Archive = () => {

  return (
    <div className="text-zinc-400 selection:bg-cyan-400 selection:text-black">
      <div className="fixed inset-0 -z-50">
        <CircuitryBg />
      </div>
      <Navbar />

      <div className='relative w-full h-fit'>
       <div className='flex flex-row items-center justify-center'>
         <Hero />
         {/* <div className='w-[1000px] h-[400px]'>
           <HeroExperience />
         </div> */}
       </div>
        <TechArsenals techStack={techStack} />
        <TraningModules education={education} />
        <OperationLogs projects={projects} />
        <Credentials certifications={certifications} />
      </div>
    </div>
  );
};

export default Archive;