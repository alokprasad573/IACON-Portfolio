import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu,
  Terminal as TerminalIcon,
  ShieldCheck,
  ExternalLink,
  Github,
  BrainCircuit,
  Code2,
  Layers,
  X,
  Zap,
  Activity,
  Triangle,
  Radio,
  Scan,
  Database,
  Globe,
  Wind,
  Target,
  Box,
  ChevronDown
} from 'lucide-react';

// --- DATA (UNCHANGED) ---
const certifications = [
  {
    title: "Full Stack Web Development",
    organization: "Apna College",
    image: "Full_Stack_Web_Development.jpg",
    logo: "apnacollege-logo.png",
    learnings: ["HTML5", "CSS3", "JavaScript ES6", "React.js", "Next.js", "Node.js", "MongoDB"]
  },
  {
    title: "Java DSA",
    organization: "Apna College",
    image: "Java_DSA.jpg",
    logo: "apnacollege-logo.png",
    learnings: ["Java Intermediate", "Data Structure", "Algorithms"]
  },
  {
    title: "Data Science & GenAI",
    organization: "CodeChef",
    logo: "codechef_logo.png",
    learnings: ["Python", "Numpy", "TensorFlow", "PyTorch", "GenAI", "NLP"]
  }
];

const techStack = [
  { name: "Neural Systems", items: ["Python", "GenAI", "NLP", "TensorFlow"], icon: <BrainCircuit size={18} /> },
  { name: "Infrastructure", items: ["Next.js", "Node.js", "MongoDB", "Tailwind"], icon: <Layers size={18} /> },
  { name: "Core Logic", items: ["Java", "DSA", "JavaScript", "Postman"], icon: <Code2 size={18} /> }
];

const projects = [
  {
    title: "StackScore AI",
    description: "High-precision AI-powered resume analyzer providing ATS-friendly feedback using Puter.js and high-frequency parsing.",
    image: "satckscore.png",
    github: "https://github.com/alokprasad573/StackScore.git",
    link: "https://stack-score.vercel.app/",
    tags: ["React", "TypeScript", "Puter.js", "GenAI"]
  }
];

// --- VISUAL COMPONENTS ---

const IaconGrid = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05)_0%,transparent_70%)]"></div>
    <div className="h-full w-full bg-[linear-gradient(to_right,#eab30808_1px,transparent_1px),linear-gradient(to_bottom,#eab30808_1px,transparent_1px)] bg-size-[60px_60px]"></div>
    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[15px_15px]"></div>
  </div>
);

const SignalBar = () => (
  <div className="flex gap-1 items-end h-4">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`w-1 bg-yellow-500 animate-pulse`}
        style={{ height: `${(i + 1) * 20}%`, animationDelay: `${i * 150}ms` }}
      ></div>
    ))}
  </div>
);

const TerminalOverlay = ({ isOpen, onClose }) => {
  const [text, setText] = useState('');
  const fullText = ">_ INITIALIZING IACON PROTOCOL... \n>_ LINKING B-127 NEURAL CORE... \n>_ UPLINK READY.";

  useEffect(() => {
    if (isOpen) {
      let i = 0;
      const interval = setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
      <div className="w-full max-w-2xl bg-zinc-950 border-2 border-yellow-500/40 relative">
        <div className="absolute -top-[2px] -left-[2px] w-12 h-12 border-t-2 border-l-2 border-yellow-500"></div>
        <div className="absolute -bottom-[2px] -right-[2px] w-12 h-12 border-b-2 border-r-2 border-yellow-500"></div>

        <div className="p-4 border-b border-yellow-500/10 flex justify-between items-center bg-yellow-500/5">
          <div className="flex items-center gap-3">
            <Radio size={16} className="text-yellow-500 animate-pulse" />
            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] italic">Comm_Link: Established</span>
          </div>
          <button onClick={onClose} className="text-yellow-500 hover:text-white transition-colors"><X size={24} /></button>
        </div>

        <div className="p-10 font-mono">
          <pre className="text-yellow-600/80 text-[11px] mb-10 leading-relaxed whitespace-pre-wrap h-16">{text}</pre>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="relative">
              <input required placeholder="ORIGIN_ID" className="w-full bg-black/50 border border-yellow-500/20 p-4 text-yellow-500 outline-none focus:border-yellow-500 transition-all placeholder:text-yellow-900/50" />
            </div>
            <div className="relative">
              <textarea required placeholder="ENCODED_MESSAGE" className="w-full bg-black/50 border border-yellow-500/20 p-4 text-yellow-500 outline-none focus:border-yellow-500 transition-all placeholder:text-yellow-900/50 h-32 resize-none"></textarea>
            </div>
            <button className="group relative w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-[0.4em] italic overflow-hidden">
              <span className="relative z-10">Broadcast_Signal</span>
              <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isCommOpen, setIsCommOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      <IaconGrid />
      <TerminalOverlay isOpen={isCommOpen} onClose={() => setIsCommOpen(false)} />

      {/* --- HUD NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollPos > 50 ? 'py-4 bg-black/90 border-b border-yellow-500/20' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-12 h-12 border-2 border-yellow-500/30 flex items-center justify-center rotate-45 hover:border-yellow-500 transition-all cursor-crosshair">
                <Cpu size={24} className="text-yellow-500 -rotate-45" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500/20 border border-yellow-500 animate-ping"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black text-white italic tracking-tighter leading-none">ALOK_PRIME</h1>
              <span className="text-[8px] font-mono text-yellow-600 uppercase tracking-[0.5em]">Sector_7 // B-127 Uplink</span>
            </div>
          </div>

          <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] italic">
              {['Schematics', 'Archive', 'Log'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-zinc-500 hover:text-yellow-500 transition-all flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link}
                </a>
              ))}
            </div>
            <button
              onClick={() => setIsCommOpen(true)}
              className="px-6 py-2 border-2 border-yellow-500/50 text-yellow-500 font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center gap-4 italic shadow-[0_0_15px_rgba(234,179,8,0.1)]"
            >
              <SignalBar /> ENGAGE_COMM
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO: THE IACON ARCHIVE --- */}
      <section className="relative min-h-screen flex items-center px-8 md:px-16 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-yellow-500/5 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10 italic">
              <Scan size={14} className="animate-spin-slow" /> Target Locked: Innovation
            </div>

            <h1 className="text-7xl md:text-[9rem] font-black text-white italic leading-[0.75] uppercase tracking-tighter mb-10">
              CRAFTING <br />
              <span className="text-yellow-500 text-outline-yellow relative inline-block">
                BEYOND
                <div className="absolute bottom-4 left-0 w-full h-2 bg-yellow-500/10 -z-10"></div>
              </span> <br />
              LIMITS.
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-12 italic border-l-2 border-yellow-500/30 pl-6">
              Merging the architectural heritage of <span className="text-white font-bold">Iacon</span> with the adaptive intelligence of <span className="text-yellow-500 font-bold">B-127</span>. Full Stack Architect specializing in GenAI and Neural Systems.
            </p>

            <div className="flex flex-wrap gap-6">
              <button onClick={() => setIsCommOpen(true)} className="px-10 py-5 bg-yellow-500 text-black font-black uppercase text-[11px] tracking-widest italic hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(234,179,8,0.2)]">
                Initialize_Link
              </button>
              <div className="flex items-center gap-4 px-8 py-5 bg-zinc-950 border border-yellow-500/10 italic">
                <Github size={20} className="text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">IACON_REPO: V4.0.1</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-yellow-500/5 rounded-full blur-[150px] animate-pulse"></div>
            <div className="relative border-2 border-yellow-500/20 p-10 bg-black/60 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)]">
              <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-yellow-500/50 uppercase tracking-widest">B127_SYS_FEED</div>

              <div className="grid grid-cols-6 gap-2 mb-10">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-1 bg-zinc-900 overflow-hidden relative">
                    <div className="absolute inset-0 bg-yellow-500 animate-[loading_3s_infinite]" style={{ animationDelay: `${i * 150}ms` }}></div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-start mb-12">
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-yellow-500/50 uppercase tracking-[0.2em]">Neural_Processing</div>
                  <div className="text-5xl font-black text-white italic tracking-tighter">98.4<span className="text-yellow-500">%</span></div>
                </div>
                <Target className="text-yellow-500 animate-pulse" size={48} />
              </div>

              <div className="relative aspect-video border border-yellow-500/10 bg-black group overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="text-yellow-500/20 w-32 h-32" />
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <div className="text-[8px] font-mono text-zinc-500 tracking-[0.3em] uppercase italic">Sensory_Input: Locked</div>
                </div>
                <div className="absolute top-4 right-4 text-yellow-500/20 font-mono text-[8px]">COORD: 41.2°N 2.1°E</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
          <ChevronDown size={32} className="text-yellow-500/30" />
        </div>
      </section>

      {/* --- SCHEMATICS (SKILLS) --- */}
      <section id="schematics" className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-24 border-b border-yellow-500/10 pb-12">
          <div>
            <div className="text-yellow-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">// Core_Competencies</div>
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">Tactical Arsenal</h2>
          </div>
          <div className="text-right pb-2">
            <div className="text-yellow-500 font-mono text-[10px] uppercase tracking-[0.2em]">Status: Optimal</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-yellow-500/10 border border-yellow-500/10">
          {techStack.map((stack, idx) => (
            <div key={idx} className="bg-black p-12 hover:bg-yellow-500/2 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-yellow-500 group-hover:w-full transition-all duration-500"></div>
              <div className="text-yellow-500/40 mb-10 transform group-hover:scale-110 group-hover:text-yellow-500 transition-all duration-500">
                {stack.icon}
              </div>
              <h3 className="text-3xl font-black text-white uppercase italic mb-8 tracking-tighter">{stack.name}</h3>
              <div className="flex flex-wrap gap-3">
                {stack.items.map(item => (
                  <span key={item} className="px-4 py-2 bg-zinc-950 border border-zinc-900 text-[10px] font-black text-zinc-500 group-hover:text-yellow-500 group-hover:border-yellow-500/30 transition-all uppercase tracking-[0.2em]">
                    {item}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-6 right-6 text-yellow-500/5 font-black italic text-7xl group-hover:text-yellow-500/10 transition-colors">0{idx + 1}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ARCHIVE (PROJECTS) --- */}
      <section id="archive" className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-10 mb-32">
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter">Mission Archives</h2>
          <div className="h-[2px] grow bg-linear-to-r from-yellow-500/50 to-transparent"></div>
        </div>

        <div className="space-y-48">
          {projects.map((project, idx) => (
            <div key={idx} className="grid lg:grid-cols-2 gap-24 items-center group">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-6 border border-yellow-500/5 group-hover:border-yellow-500/20 transition-all duration-700 pointer-events-none"></div>
                <div className="relative overflow-hidden bg-zinc-950 shadow-2xl border border-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-transparent transition-all"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 px-6 py-3 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-[0.3em] italic">
                  Deploy_Status: Success
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-px bg-yellow-500"></div>
                  <span className="text-yellow-500 font-mono text-[10px] uppercase tracking-[0.5em]">Unit_0{idx + 1}</span>
                </div>
                <h3 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter group-hover:text-yellow-500 transition-all uppercase leading-none">{project.title}</h3>
                <p className="text-zinc-400 text-xl font-light italic leading-relaxed border-l-2 border-yellow-500/20 pl-8">
                  "{project.description}"
                </p>

                <div className="flex flex-wrap gap-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black text-zinc-500 border border-zinc-900 px-3 py-1 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>

                <div className="flex gap-10 pt-10">
                  <a href={project.github} className="group flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:text-yellow-500 transition-colors italic">
                    <Github size={18} /> REPOSITORY_ACCESS
                  </a>
                  <a href={project.link} className="group flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:text-yellow-500 transition-colors italic">
                    <ExternalLink size={18} /> LIVE_UPLINK
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- LOG (CERTIFICATIONS) --- */}
      <section id="log" className="py-40 px-8 md:px-16 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-32">
            <div>
              <div className="text-yellow-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 italic">Security_Clearance</div>
              <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter">Credential Log</h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-yellow-500/10">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-[#050505] p-12 hover:bg-black transition-all group flex flex-col md:flex-row gap-12 items-start md:items-center relative">
                <div className="absolute top-0 left-0 w-1 h-0 bg-yellow-500 group-hover:h-full transition-all"></div>
                <div className="w-24 h-24 bg-zinc-900 p-4 border border-zinc-800 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all relative shadow-2xl overflow-hidden">
                  <img src={cert.logo} alt={cert.organization} className="max-w-full max-h-full object-contain relative z-10" />
                  <div className="absolute inset-0 bg-yellow-500/5"></div>
                </div>
                <div className="grow">
                  <div className="text-yellow-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-3">{cert.organization}</div>
                  <h4 className="text-3xl font-black text-white italic uppercase mb-6 tracking-tighter leading-none">{cert.title}</h4>
                  <div className="flex flex-wrap gap-4">
                    {cert.learnings.slice(0, 4).map(l => (
                      <span key={l} className="text-[10px] font-black text-zinc-500 uppercase border border-zinc-900 px-3 py-1 group-hover:text-zinc-300 transition-colors">{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-32 px-8 md:px-16 border-t border-yellow-500/10 bg-black relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <div className="w-12 h-12 bg-yellow-500 flex items-center justify-center rotate-45">
                <Cpu size={24} className="text-black -rotate-45" />
              </div>
              <span className="text-4xl font-black text-white italic tracking-tighter uppercase">ALOK_B127</span>
            </div>
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em] mb-2">Digital_Sentinel // Global_Defense_Node</p>
            <p className="text-[10px] font-mono text-yellow-500/40 uppercase tracking-[0.3em]">Ref: IACON_SYS_AP_4.0</p>
          </div>

          <div className="flex gap-12 text-[11px] font-black uppercase text-zinc-500 tracking-[0.4em] italic">
            <a href="#" className="hover:text-yellow-500 transition-colors">Neural_Link</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">Archive_Core</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">Source_Log</a>
          </div>

          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-3 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-black text-white italic tracking-[0.2em]">OPERATIONAL_STATUS: OPTIMAL</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-800 uppercase tracking-widest italic">Est. Cybertron // Deployed Sector_7</div>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
        
        body { 
          font-family: 'Space Grotesk', sans-serif; 
          background-color: #020202;
          scroll-behavior: smooth;
        }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Scanline Overlay */
        main::before {
          content: "";
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%);
          z-index: 100;
          background-size: 100% 4px;
          pointer-events: none;
        }

        .text-outline-yellow {
          -webkit-text-stroke: 1px #eab308;
          color: transparent;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #000;
        }
        ::-webkit-scrollbar-thumb {
          background: #eab308;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default App;