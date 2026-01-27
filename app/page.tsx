'use client'

import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import HeroExperience from "@/components/HeroModels/HeroExperience";
import CyberTerminal from "@/components/ui/CyberTerminal";

export default function Home() {
  useGSAP(() => {
    gsap.fromTo('.animate-y-axis', {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.inOut',
    })
  }, [])

  return (
    <div className="content-layer flex flex-col justify-center px-8 md:px-24 min-h-screen relative z-10">

      {/*Top Content */}
      <div className="fixed top-8 left-8 z-50 flex flex-row items-center gap-6 animate-y-axis">
        <img
          src="https://pngimg.com/uploads/transformers/transformers_PNG15.png"
          alt="Bumblebee Logo"
          className="w-15 h-15 cursor-pointer drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-110 hover:rotate-6"
        />
        <span className="font-orbitron test-xs text-zinc-400 tracking-[0.2em] text-md uppercase">ID : B-127 <br/> NICKNAME : BUMBLEBEE<br /> TEAM : BEAST HUNTERS<br />ROLE : WARRIOR</span>
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 items-center gap-12">
        {/* Left Content */}
        <div className="order-2 md:order-1">
          <CyberTerminal />
        </div>

         {/* Right Content */}
         <div className="order-1 md:order-2 flex justify-center transformer-container relative group animate-y-axis w-full h-[500px] md:h-[600px]">
          <div className="absolute inset-0 bg-[#FFD700]/10 blur-[100px] rounded-full"></div>
          <HeroExperience />
        </div>
      </div>
    </div>
  );
}