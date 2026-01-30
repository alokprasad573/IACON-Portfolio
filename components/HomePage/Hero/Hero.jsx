import { FolderArchive, Waypoints, Mail } from "lucide-react";


const Hero = () => {
  return (
    <section
      id="hero"
      className="hero-contents sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="mb-6 inline-flex items-center gap-2 border border-yellow-500/20 px-4 py-1 rounded-full bg-yellow-500/5 backdrop-blur-md">
        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping"></div>
        <span className="text-[12px] font-mono tracking-widest uppercase text-brand-yellow font-bold">IACON DATA STREAM : ACTIVE</span>
      </div>
      <div className="scroll-shrink">
        <h1 className="text-6xl text-brand-yellow leading-[0.9] tracking-tighter">
          Forged In Code <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #FFD700' }}>Powered By Cybertron</span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-zinc-100 tracking-[0.15em]">
          Full Stack Developer <span className="text-brand-yellow">//</span> Data Scientist <span className="text-brand-yellow">//</span> Gen-AI Developer
        </p>

        <div className="mt-8 flex flex-wrap justify-center">
          <p className="text-start text-[15px] text-zinc-300 leading-relaxed italic">
            "I am Alok, a Cyber-Engineer specializing in AI and Machine Learning. <br />
            From the halls of Rungta Tech to the global digital grid, my mission <br />
            is to deploy software that acts as a catalyst for human progress."
          </p>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-8 md:gap-12">
          {/* GitHub Link */}
          <a href="https://github.com/alokprasad573" className="group flex items-center gap-3 text-zinc-300 hover:text-brand-yellow transition-all">
            <FolderArchive size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase hidden md:block">Archive</span>
          </a>

          {/* LinkedIn Link */}
          <a href="https://www.linkedin.com/in/alok-prasad-474962289/" className="group flex items-center gap-3 text-zinc-300 hover:text-brand-yellow transition-all">
            <Waypoints size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase hidden md:block">SparkConnect</span>
          </a>

          {/* Email Link */}
          <a href="#COMM_LINK" className="group flex items-center gap-3 text-zinc-300 hover:text-brand-yellow transition-all">
            <Mail size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase hidden md:block">Comm_Link</span>
          </a>
        </div>
        <div className='text-center fixed left-1/2 -translate-x-1/2 bottom-[1.5em] -z-100'>
          <p className='text-underline text-brand-yellow/40'>Scroll Down to Explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;