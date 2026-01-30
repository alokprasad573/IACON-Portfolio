import { useRef } from "react";
import { FolderArchive, Waypoints, Mail, ChevronsDown, Shield, Cpu, BookOpen, Layers, Terminal } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const tacticalRef = useRef(null);

  useGSAP(() => {
    // Fade out Tactical Overview on scroll
    gsap.to(tacticalRef.current, {
      opacity: 0,
      scale: 0.9,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "30% top",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="hero-contents min-h-screen  w-full flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
    >
      {/* --- TOP STATUS INDICATOR --- */}
      <div className="mb-8 inline-flex items-center gap-2 border border-yellow-500/20 px-4 py-1 rounded-full bg-yellow-500/5 backdrop-blur-md z-10">
        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping"></div>
        <span className="text-[12px] font-mono tracking-widest uppercase text-brand-yellow font-bold">
          IACON DATA STREAM : ACTIVE
        </span>
      </div>

      {/* --- MAIN TITLES (RESTORED STYLING) --- */}
      <div className="scroll-shrink relative z-10">
        <h1 className="text-6xl text-brand-yellow leading-[0.9] tracking-tighter uppercase font-black">
          Forged In Code <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px #FFD700' }}>
            Powered By Cybertron
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-zinc-100 tracking-[0.15em] font-medium uppercase">
          Full Stack Developer <span className="text-brand-yellow px-2">//</span>
          Data Scientist <span className="text-brand-yellow px-2">//</span>
          Gen-AI Developer
        </p>

        {/* --- MISSION STATEMENT --- */}
        <div className="mt-10 flex flex-wrap justify-center">
          <div className="border-l-2 border-yellow-500/30 pl-6 py-1">
            <p className="text-start text-[15px] text-zinc-300 leading-relaxed font-mono">
              "I am Alok, a Cyber-Engineer specializing in AI and Machine Learning. <br />
              From the halls of Rungta Tech to the global digital grid, my mission <br />
              is to deploy software that acts as a catalyst for human progress."
            </p>
          </div>
        </div>

        {/* --- TACTICAL OVERVIEW (CONNECTED NAVIGATION) --- */}
        <div ref={tacticalRef} className="mt-12 hidden md:grid grid-cols-5 gap-4 max-w-4xl mx-auto border-y border-yellow-500/10 py-6">
          <a href="#hero" className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110">
            <Terminal size={18} className="text-yellow-500" />
            <span className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase">Protocol 01</span>
            <span className="text-[10px] tracking-widest text-zinc-300 font-bold uppercase">Inbound</span>
          </a>
          <a href="#arsenals" className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 border-l border-yellow-500/10">
            <Cpu size={18} className="text-yellow-500" />
            <span className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase">Protocol 02</span>
            <span className="text-[10px] tracking-widest text-zinc-300 font-bold uppercase">Arsenals</span>
          </a>
          <a href="#modules" className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 border-l border-yellow-500/10">
            <BookOpen size={18} className="text-yellow-500" />
            <span className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase">Protocol 03</span>
            <span className="text-[10px] tracking-widest text-zinc-300 font-bold uppercase">Modules</span>
          </a>
          <a href="#operation" className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 border-l border-yellow-500/10">
            <Layers size={18} className="text-yellow-500" />
            <span className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase">Protocol 04</span>
            <span className="text-[10px] tracking-widest text-zinc-300 font-bold uppercase">Operation</span>
          </a>
          <a href="#clearences" className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 border-l border-yellow-500/10">
            <Shield size={18} className="text-yellow-500" />
            <span className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase">Protocol 05</span>
            <span className="text-[10px] tracking-widest text-zinc-300 font-bold uppercase">Clearances</span>
          </a>
        </div>

        {/* --- SOCIAL LINKS --- */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12 relative z-10">
          <a href="https://github.com/alokprasad573" className="group flex items-center gap-3 text-zinc-400 hover:text-brand-yellow transition-all">
            <FolderArchive size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase hidden md:block">Archive</span>
          </a>

          <a href="https://www.linkedin.com/in/alok-prasad-474962289/" className="group flex items-center gap-3 text-zinc-400 hover:text-brand-yellow transition-all">
            <Waypoints size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase hidden md:block">SparkConnect</span>
          </a>

          <a href="mailto:contact@example.com" className="group flex items-center gap-3 text-zinc-400 hover:text-brand-yellow transition-all">
            <Mail size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase hidden md:block">Comm_Link</span>
          </a>
        </div>

        {/* --- SCROLL INDICATOR --- */}
        <div className="mt-16 flex flex-col items-center gap-4 relative z-10 group cursor-pointer transition-all duration-300 hover:scale-110">
          <ChevronsDown size={28} className="text-yellow-500 animate-bounce" />
          <span className="text-[11px] tracking-[0.5em] font-mono uppercase text-zinc-500 group-hover:text-yellow-500 transition-colors">
            Initiate_Descent
          </span>
          <div className="w-px h-12 bg-linear-to-b from-yellow-500 to-transparent opacity-20"></div>
        </div>
      </div>

      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-yellow-500/10 rounded-tr-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border-b-2 border-l-2 border-yellow-500/10 rounded-bl-3xl"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-yellow-500/5 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;