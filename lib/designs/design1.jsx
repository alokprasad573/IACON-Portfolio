import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu,
  Terminal as TerminalIcon,
  ShieldCheck,
  ExternalLink,
  Github,
  Layout,
  Database,
  BrainCircuit,
  ChevronRight,
  Code2,
  Box,
  Layers,
  X,
  Send,
  Zap,
  GraduationCap,
  Calendar,
  MapPin,
  Trophy
} from 'lucide-react';

// --- DATA ---
const certifications = [
  {
    title: "Full Stack Web Development",
    organization: "Apna College",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfI8yX6E37_03w9Gv3S-N1T1D-vD-Y_qY3pw&s",
    certificate: "Full_Stack_Web_Development.jpg",
    learnings: ["HTML5", "CSS3", "JavaScript ES6", "React.js", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"]
  },
  {
    title: "Java DSA",
    organization: "Apna College",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfI8yX6E37_03w9Gv3S-N1T1D-vD-Y_qY3pw&s",
    certificate: "Java_DSA.jpg",
    learnings: ["Java Intermediate", "Data Structure", "Algorithms"]
  },
  {
    title: "Data Science & GenAI",
    organization: "CodeChef",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0KRE_iRsh_B3PCH8M6yUvS6iC4fE9fE0Hog&s",
    certificate: "Web_development_using_JavaScript.jpg",
    learnings: ["Python", "Numpy", "Pandas", "Scikit-learn", "TensorFlow", "GenAI", "Agentic AI"]
  }
];

const techStck = {
  languages: ["HTML5", "CSS3", "JavaScript ES6", "Python", "Java"],
  libraries: ["numpy", "pandas", "matplotlib", "seaborn", "scikit-learn", "tensorflow", "pytorch", "keras"],
  frameworks: ["Next.js", "Tailwind CSS", "Flask", "FastAPI", "Express.js", "Langchain"],
  tools: ["Git", "GitHub", "Docker", "Kubernetes", "Postman"],
};

const trainingData = {
  institution: "Rungta College of Engineering & Technology",
  degree: "B.Tech in Computer Science (AI)",
  duration: "2023 - 2027",
  location: "Bhilai, Chhattisgarh",
  cgpa: "7.2",
  objectives: [
    "Neural Network Optimization",
    "Advanced Data Structures",
    "Agentic AI Architecture",
    "Full Stack Systems Design"
  ]
};

const projects = [
  {
    title: "StackScore AI",
    description: "AI-powered resume analyzer providing ATS-friendly feedback using LLMs and high-precision parsing.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/alokprasad573/StackScore.git",
    link: "https://stack-score.vercel.app/",
    tags: ["React", "TypeScript", "Puter.js"]
  },
  {
    title: "Cyber-Sentinel Auth",
    description: "Biometric and multi-factor authentication system with encrypted Cybertronian logic gates.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/alokprasad573/",
    link: "#",
    tags: ["Next.js", "Firebase", "WebAuthn"]
  }
];

// --- UI COMPONENTS ---

const HexGrid = () => (
  <div className="fixed inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`,
      backgroundSize: '40px 40px'
    }}></div>
  </div>
);

const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-12 relative">
    <div className="flex items-center gap-4">
      <div className="h-1 w-12 bg-yellow-500"></div>
      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
        {children}
      </h2>
      <div className="grow h-px bg-yellow-900/50"></div>
    </div>
    {subtitle && <p className="text-yellow-500 font-mono text-xs mt-2 ml-16 tracking-[0.3em] uppercase">{subtitle}</p>}
  </div>
);

const CommTerminal = ({ isOpen, onClose }) => {
  const [lines, setLines] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const bootSequence = [
    "> INITIATING AUTOBOT COMM LINK...",
    "> ENCRYPTING SIGNAL CHANNEL 7-B...",
    "> STATUS: SECURE",
    "> AWAITING INPUT..."
  ];

  useEffect(() => {
    if (isOpen) {
      setLines([]);
      setIsSent(false);
      bootSequence.forEach((line, i) => {
        setTimeout(() => setLines(prev => [...prev, line]), i * 400);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="w-full max-w-2xl bg-[#0a0a0a] border-2 border-yellow-500 shadow-[0_0_50px_rgba(255,215,0,0.2)] overflow-hidden flex flex-col h-[500px]">
        <div className="bg-yellow-500 p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon size={16} className="text-black" />
            <span className="text-[10px] font-black uppercase text-black tracking-widest">B-127 Secure Link</span>
          </div>
          <button onClick={onClose} className="p-1"><X size={16} className="text-black" /></button>
        </div>
        <div className="grow p-6 font-mono text-xs overflow-y-auto space-y-2 text-yellow-500">
          {lines.map((line, i) => <p key={i}>{line}</p>)}
          {!isSent && lines.length >= bootSequence.length && (
            <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsSent(true); }}>
              <input className="w-full bg-black border border-yellow-500/30 p-2 outline-none" placeholder="IDENTITY" />
              <textarea className="w-full bg-black border border-yellow-500/30 p-2 outline-none h-24" placeholder="MESSAGE"></textarea>
              <button className="w-full bg-yellow-500 text-black py-3 font-black uppercase">Dispatch Signal</button>
            </form>
          )}
          {isSent && <div className="text-center py-10"><Zap className="mx-auto text-yellow-500 mb-4 animate-pulse" size={40} /><h3>SIGNAL DELIVERED</h3></div>}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isCommOpen, setIsCommOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-gray-300 font-sans selection:bg-yellow-500 selection:text-black scroll-smooth">
      <HexGrid />
      <CommTerminal isOpen={isCommOpen} onClose={() => setIsCommOpen(false)} />

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-yellow-500/20 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-yellow-500 flex items-center justify-center transform rotate-45 group-hover:rotate-0 transition-transform">
              <Cpu className="text-black transform -rotate-45 group-hover:rotate-0 transition-transform" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white ml-2 italic">ALOK.B127</span>
          </div>
          <div className="hidden md:flex gap-8 font-mono text-[10px] font-bold uppercase tracking-widest">
            {['Inbound', 'Arsenal', 'Training', 'Missions', 'Clearance'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-yellow-500 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <button onClick={() => setIsCommOpen(true)} className="bg-yellow-500 text-black px-6 py-2 font-black uppercase tracking-tighter -skew-x-12">
            Link
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO */}
        <section id="inbound" className="min-h-screen flex flex-col items-center justify-center px-6 relative text-center">
          <div className="mb-6 inline-flex items-center gap-2 border border-yellow-500/30 px-4 py-1 rounded-full bg-yellow-500/5 animate-pulse">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-yellow-500">System Online: Scout Protocol Active</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mb-6 italic">
            ALOK <span className="text-transparent" style={{ WebkitTextStroke: '1px #FFD700' }}>PRASAD</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed italic">
            Transforming raw data into <span className="text-yellow-500 font-bold uppercase">Strategic Intelligence</span>.
          </p>
          <div className="flex gap-4">
            <button onClick={() => setIsCommOpen(true)} className="bg-yellow-500 text-black px-10 py-4 font-black uppercase tracking-widest text-xs -skew-x-12 hover:scale-105 transition-transform">Initiate Connection</button>
          </div>
        </section>

        {/* ARSENAL */}
        <section id="arsenal" className="py-24 px-6 max-w-7xl mx-auto">
          <SectionTitle subtitle="Weaponry & Upgrades">Tech Arsenal</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(techStck).map(([key, items]) => (
              <div key={key} className="bg-gray-900/40 border border-yellow-500/10 p-8 hover:border-yellow-500 transition-colors group">
                <h3 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-white">
                  <Box size={18} className="text-yellow-500" /> {key}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className="px-2 py-1 bg-black text-[10px] font-mono text-yellow-500 border border-yellow-900/50 uppercase">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRAINING GROUND (NEW SECTION) */}
        <section id="training" className="py-24 px-6 max-w-7xl mx-auto border-t border-yellow-500/10">
          <SectionTitle subtitle="Acquisition of Knowledge">Training Ground</SectionTitle>
          <div className="relative group overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] group-hover:bg-yellow-500/10 transition-colors"></div>

            <div className="bg-gray-900/40 border border-yellow-500/20 p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-2 h-full bg-yellow-500"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* School Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3 text-yellow-500">
                    <GraduationCap size={32} />
                    <span className="text-xs font-black uppercase tracking-[0.4em]">Academy Data Stream</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic leading-none">
                    {trainingData.institution}
                  </h3>

                  <div className="flex flex-wrap gap-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded"><Calendar size={14} className="text-yellow-500" /> {trainingData.duration}</div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded"><MapPin size={14} className="text-yellow-500" /> {trainingData.location}</div>
                  </div>

                  <div className="p-6 bg-black/40 border border-white/5">
                    <h4 className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Core Module: {trainingData.degree}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {trainingData.objectives.map((obj, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-mono">
                          <ChevronRight size={14} className="text-yellow-500" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics Card */}
                <div className="lg:col-span-5 flex flex-col justify-center gap-6">
                  <div className="bg-yellow-500 p-8 -skew-x-12 relative">
                    <div className="skew-x-12 flex flex-col items-center">
                      <span className="text-black font-black uppercase text-[10px] tracking-widest mb-1">Efficiency Rating</span>
                      <div className="text-6xl font-black text-black italic leading-none mb-4">{trainingData.cgpa}</div>
                      <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-black animate-[shimmer_2s_infinite]" style={{ width: '72%' }}></div>
                      </div>
                      <span className="text-[9px] font-black text-black/60 uppercase mt-2 tracking-tighter">Current Status: Advanced Scout</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/5 p-4 flex items-center gap-3">
                      <Trophy className="text-yellow-500" size={24} />
                      <div className="flex flex-col">
                        <span className="text-white font-black text-lg">AI SPECIALIST</span>
                        <span className="text-[8px] uppercase font-bold text-gray-500">Major Class</span>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-4 flex items-center gap-3">
                      <Layers className="text-yellow-500" size={24} />
                      <div className="flex flex-col">
                        <span className="text-white font-black text-lg">LEVEL 03</span>
                        <span className="text-[8px] uppercase font-bold text-gray-500">Academic Year</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSIONS */}
        <section id="missions" className="py-24 bg-black/40 border-y border-yellow-500/10 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="Operational History">Critical Missions</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <div key={idx} className="group relative bg-gray-900 border border-white/5 hover:border-yellow-500 transition-all overflow-hidden">
                  <div className="h-64 overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-white uppercase mb-2 italic">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 font-mono italic">"{project.description}"</p>
                    <div className="flex gap-4">
                      <a href={project.github} className="text-yellow-500 hover:text-white transition-colors"><Github size={20} /></a>
                      <a href={project.link} className="text-yellow-500 hover:text-white transition-colors"><ExternalLink size={20} /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLEARANCE */}
        <section id="clearance" className="py-24 px-6 max-w-7xl mx-auto">
          <SectionTitle subtitle="Official Credentials">Verified Clearance</SectionTitle>
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-gray-900/50 border-l-4 border-yellow-500 p-6 flex items-center justify-between group hover:bg-yellow-500/5 transition-all">
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">{cert.title}</h3>
                  <p className="text-yellow-500 font-mono text-xs uppercase">{cert.organization}</p>
                </div>
                <button className="flex items-center gap-2 font-mono text-[10px] text-gray-500 hover:text-yellow-500 uppercase tracking-widest border border-white/10 px-4 py-2 hover:border-yellow-500 transition-all">
                  Verify <ShieldCheck size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-yellow-500/20 bg-black px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-xl font-black text-white italic">ALOK.PRIME</span>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Digital Frontier Strategic Asset</p>
          </div>
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest">
            <a href="https://github.com/alokprasad573" className="hover:text-yellow-500 transition-colors">GitHub</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">LinkedIn</a>
            <p className="text-yellow-500/50">Copyright 2026</p>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, .font-mono { font-family: 'Orbitron', sans-serif; }
        @keyframes shimmer { 
          0% { transform: translateX(-100%); } 
          100% { transform: translateX(200%); } 
        }
      `}</style>
    </div>
  );
};

export default App;