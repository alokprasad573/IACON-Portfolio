import { useRef } from "react";
import { FolderArchive, Waypoints, Mail, ChevronsDown, Shield, Cpu, BookOpen, Layers, Database, SatelliteDish, Swords, Package, Package2, LandPlot, PackageCheck } from "lucide-react";

const Hero = ({ onCommLinkClick }) => {
  const containerRef = useRef(null);

  const handleCommLinkClick = (e) => {
    e.preventDefault();
    if (onCommLinkClick) onCommLinkClick();
  };

  return (
    <section
      ref={containerRef}
      id="inbound"
      className="hero-contents min-h-screen  w-full flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
    >
      {/* --- TOP STATUS INDICATOR --- */}
      <div className="mb-8 inline-flex items-center gap-2 border border-cyan-400/20 px-4 py-1 rounded-full bg-cyan-400/5 backdrop-blur-md z-10">
        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
        <span className="text-[12px] font-mono tracking-widest uppercase text-cyan-400 font-bold">
          IACON DATA STREAM : ACTIVE
        </span>
      </div>

      {/* --- MAIN TITLES (RESTORED STYLING) --- */}
      <div className="relative z-10">
        <h1 className="text-6xl text-cyan-400 leading-[0.9] tracking-tighter uppercase font-black">
          Forged In Code <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px #22d3ee' }}>
            Powered By Cybertron
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-cyan-100 tracking-[0.15em] font-medium uppercase">
          Full Stack Developer <span className="text-cyan-400 px-2">//</span>
          Data Scientist <span className="text-cyan-400 px-2">//</span>
          Gen-AI Developer
        </p>

        {/* --- MISSION STATEMENT --- */}
        <div className="mt-10 flex flex-wrap justify-center">
          <div className="border-l-2 bg-cyan-950/15 border-cyan-400/30 pl-6 py-1">
            <p className="text-start text-[15px] text-cyan-200 leading-relaxed font-mono">
              "I am Alok, a Cyber-Engineer specializing in AI and Machine Learning. <br />
              From the halls of Rungta Tech to the global digital grid, my mission <br />
              is to deploy software that acts as a catalyst for human progress."
            </p>
          </div>
        </div>

        {/* --- TACTICAL OVERVIEW (CONNECTED NAVIGATION) --- */}
        <div className="mt-12  bg-cyan-950/15 hidden md:grid grid-cols-4 gap-4 max-w-2xl mx-auto border-y border-cyan-400/10 py-6">

          <a href="#arsenals" className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 border-l border-cyan-400/10">
            <Swords size={18} className="text-cyan-400" />
            <span className="text-[9px] tracking-[0.2em] text-cyan-600 uppercase">Directive 02</span>
            <span className="text-[10px] tracking-widest text-cyan-200 font-bold uppercase">Arsenals</span>
          </a>
          <a href="#modules" className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 border-l border-cyan-400/10">
            <Package size={18} className="text-cyan-400" />
            <span className="text-[9px] tracking-[0.2em] text-cyan-600 uppercase">Directive 03</span>
            <span className="text-[10px] tracking-widest text-cyan-200 font-bold uppercase">Modules</span>
          </a>
          <a href="#clearences" className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 border-l border-cyan-400/10">
            <PackageCheck size={18} className="text-cyan-400" />
            <span className="text-[9px] tracking-[0.2em] text-cyan-600 uppercase">Directive 05</span>
            <span className="text-[10px] tracking-widest text-cyan-200 font-bold uppercase">Clearances</span>
          </a>
          <a href="#operation" className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 border-l border-cyan-400/10">
            <LandPlot size={18} className="text-cyan-400" />
            <span className="text-[9px] tracking-[0.2em] text-cyan-600 uppercase">Directive 04</span>
            <span className="text-[10px] tracking-widest text-cyan-200 font-bold uppercase">Operation</span>
          </a>
        </div>

        {/* --- SOCIAL LINKS --- */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12 relative z-10">
          <a href="https://github.com/alokprasad573" className="group flex items-center gap-3 text-cyan-500 hover:text-cyan-400 hover:scale-110 transition-all duration-300">
            <Database size={24} />
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase hidden md:block">Archive</span>
          </a>

          <a href="https://www.linkedin.com/in/alok-prasad-474962289/" className="group flex items-center gap-3 text-cyan-500 hover:text-cyan-400 hover:scale-110 transition-all duration-300">
            <Waypoints size={24} />
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase hidden md:block">SparkConnect</span>
          </a>

          <a
            href="#comm-link"
            onClick={handleCommLinkClick}
            className="group flex items-center gap-3 text-cyan-500 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
          >
            <SatelliteDish size={24} />
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase hidden md:block">Comm_Link</span>
          </a>
        </div>

        {/* --- SCROLL INDICATOR --- */}
        <a href="#arsenals" className="mt-16 flex flex-col items-center gap-4 relative z-10 group cursor-pointer transition-all duration-300 hover:scale-110">
          <ChevronsDown size={28} className="text-cyan-400" />
          <span className="text-[11px] tracking-[0.5em] font-mono uppercase text-cyan-600 group-hover:text-cyan-400 transition-colors">
            Initiate_Descent
          </span>
          <div className="w-px h-12 bg-linear-to-b from-cyan-400 to-transparent opacity-20"></div>
        </a>
      </div>

      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-cyan-400/10 rounded-tr-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border-b-2 border-l-2 border-cyan-400/10 rounded-bl-3xl"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-400/5 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;