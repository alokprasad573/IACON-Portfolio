'use client'

import TypewriterText from "@/components/ui/TypewriterText";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import HeroExperience from "@/components/HeroModels/HeroExperience";

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
        <span className="font-orbitron test-xs text-zinc-400 tracking-[0.2em] text-md uppercase">TEAM : PRIME <br /> NICKNAME : BEAST HUNTERS<br />ROLE : WARRIOR</span>
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 items-center gap-12">
        {/* Left Content */}
        <div className="space-y-8 order-2 md:order-1">
          <div className="space-y-4">
            <p className="font-orbitron text-zinc-400 tracking-[0.4em] text-md uppercase animate-y-axis">Initialing Connection...</p>
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron animate-y-axis">
              Welcome to my <span className="text-white">cybertron.</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron animate-y-axis">
              Meet my Cybertronian Friend <span className="text-[#FFD700] yellow-glow">Bumblebee</span>
            </h2>
          </div>

          <div className="flex items-center text-2xl md:text-4xl font-bold font-orbitron h-12 animate-y-axis">
            <TypewriterText />
          </div>

          <div className="pt-8 animate-y-axis">
            <a href="/about" className="group relative flex items-center gap-3 font-orbitron text-zinc-400 tracking-[0.2em] text-md uppercase transition-all duration-300 hover:text-[#FFD700] hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
              <span className="relative -top-10">
                About MyCybertronian Core
                <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-[#FFD700] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#FFD700]"></span>
              </span>
              <span className="opacity-0 -translate-y-10 -translate-x-10 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </a>
          </div>
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