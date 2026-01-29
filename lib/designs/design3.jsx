import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  ExternalLink,
  Terminal,
  Cpu,
  Zap,
  Hexagon,
  X,
  ShieldCheck,
  GraduationCap,
  MapPin,
  Calendar,
  Activity,
  Target,
  Binary,
  Compass,
  Send,
  Loader2,
  Lock,
  Wifi
} from 'lucide-react';

// --- Intersection Observer Hook for Sliding Animations ---
const useReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return [ref, isVisible];
};

// --- Data ---
const education = {
  institution: "Rungta College of Engineering",
  duration: "2023 - 2027",
  cgpa: "7.0",
  location: "Bhilai, Durg, Chhattisgarh"
};

const techStck = {
  languages: ["HTML5", "CSS3", "JavaScript ES6", "Python", "Java"],
  libraries: ["Numpy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch"],
  frameworks: ["Next.js", "Tailwind CSS", "FastAPI", "Express.js", "Langchain"],
  tools: ["Git", "GitHub", "Docker", "Kubernetes", "Postman"],
  dsa: ["Java Intermediate", "Data Structure", "Algorithms"],
};

const projects = [
  {
    title: "Stackscore-AI Resume Analyzer",
    id: "PROJ-ATS-01",
    description: "High-performance AI analyzer using ATS-friendly feedback algorithms. Built for the modern job hunt swarm.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/alokprasad573/StackScore.git",
    link: "https://stack-score.vercel.app/",
    tech: ["React", "AI", "Tailwind"]
  },
  {
    title: "Project Sting",
    id: "PROJ-ML-02",
    description: "A rapid-response ML deployment pipeline utilizing FastAPI and Docker for industrial-grade inference.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    github: "#",
    link: "#",
    tech: ["FastAPI", "Docker", "Python"]
  }
];

// --- Specialized UI Components ---
const IaconFrame = ({ children, title, className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-yellow-400 z-10"></div>
    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-yellow-400 z-10"></div>
    <div className="bg-[#0a0a0a] border border-white/10 p-6 relative overflow-hidden group">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-2">
        <span className="text-[9px] font-black text-yellow-400 uppercase tracking-[0.4em] italic">{title}</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-yellow-400/50"></div>
          <div className="w-1 h-1 bg-yellow-400"></div>
        </div>
      </div>
      {children}
    </div>
  </div>
);

// --- Terminal (Email) Component ---
const AutobotTerminal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('INIT');
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [emailData, setEmailData] = useState({ subject: "", message: "" });
  const scrollRef = useRef(null);

  const initLines = [
    "b-127 comm link initialiazed",
    "connection establised",
    "creating a secure channel",
    "secure channel created",
    "--- TYPE 'email' TO TRANSMIT ---"
  ];

  useEffect(() => {
    if (isOpen) {
      setStep('INIT');
      setHistory([]);
      let i = 0;
      const interval = setInterval(() => {
        if (i < initLines.length) {
          setHistory(prev => [...prev, initLines[i]]);
          i++;
        } else {
          setStep('COMMAND');
          clearInterval(interval);
        }
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, step]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const val = input.trim();
      const cmd = val.toLowerCase();

      if (step === 'COMMAND') {
        if (cmd === 'email') {
          setHistory(prev => [...prev, `> ${val}`, "ENTER EMAIL SUBJECT:"]);
          setStep('SUBJECT');
        } else if (cmd === 'clear') {
          setHistory(["SHELL_CLEARED", "TYPE 'email' TO START"]);
        } else if (cmd === 'help') {
          setHistory(prev => [...prev, `> ${val}`, "CMDS: email, status, clear, exit"]);
        } else if (cmd === 'exit') {
          onClose();
        } else {
          setHistory(prev => [...prev, `> ${val}`, `ERROR: UNKNOWN_UNIT '${val}'`]);
        }
      } else if (step === 'SUBJECT') {
        setEmailData(prev => ({ ...prev, subject: val }));
        setHistory(prev => [...prev, `> ${val}`, "ENTER MESSAGE CONTENT:"]);
        setStep('MESSAGE');
      } else if (step === 'MESSAGE') {
        setEmailData(prev => ({ ...prev, message: val }));
        setHistory(prev => [...prev, `> ${val}`, "INITIATING ENCRYPTION PROTOCOLS..."]);
        setStep('ENCRYPTING');
        setTimeout(() => {
          setStep('SENDING');
          setHistory(prev => [...prev, "DATA SCRAMBLED.", "ENCRYPTING DATA...", "SENDING SIGNAL..."]);
          setTimeout(() => {
            setHistory(prev => [...prev, "SUCCESS: SIGNAL TRANSMITTED TO SECTOR_ALOK"]);
            setStep('SUCCESS');
          }, 2000);
        }, 2000);
      }
      setInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl border-2 border-yellow-400 bg-[#050505] flex flex-col h-[550px] shadow-[0_0_60px_rgba(250,204,21,0.25)] relative overflow-hidden">
        {step === 'ENCRYPTING' && (
          <div className="absolute inset-0 bg-yellow-400/10 z-50 flex flex-col items-center justify-center p-10 pointer-events-none border-4 border-yellow-400/50">
            <div className="w-full max-w-xs space-y-6 text-center">
              <Lock className="text-yellow-400 animate-bounce mx-auto" size={48} />
              <div className="h-2 bg-white/10 w-full rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 animate-[shimmer_1.5s_infinite] w-[60%]"></div>
              </div>
              <span className="text-yellow-400 text-sm font-black tracking-[0.3em] animate-pulse">ENCRYPTING_SIGNAL_STRATA...</span>
            </div>
          </div>
        )}

        <div className="bg-yellow-400 px-4 py-3 flex justify-between items-center z-60 shrink-0">
          <span className="text-black font-black uppercase text-[11px] tracking-widest flex items-center gap-2 italic">
            <ShieldCheck size={16} /> B-127_SECURE_LINK
          </span>
          <button onClick={onClose} className="text-black hover:bg-black hover:text-yellow-400 p-1 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-6 font-mono text-yellow-500 overflow-y-auto space-y-3 text-sm bg-black relative" ref={scrollRef}>
          {history.map((h, i) => {
            const line = typeof h === 'string' ? h : String(h);
            return (
              <div key={i} className={line.startsWith('>') ? "text-white flex gap-2" : "flex gap-2"}>
                {!line.startsWith('>') && <div className="w-1 h-3 bg-yellow-400 shrink-0 mt-1"></div>}
                <span>{line}</span>
              </div>
            );
          })}

          {(step === 'SENDING' || step === 'ENCRYPTING') && (
            <div className="flex items-center gap-3 animate-pulse text-yellow-400 pt-4 font-black italic">
              <Loader2 className="animate-spin" size={18} /> {step === 'ENCRYPTING' ? 'GENERATING_CYPHER_KEYS...' : 'TRANSMITTING...'}
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="pt-6 border-t border-yellow-400/20 mt-6 flex flex-col items-center gap-4 text-center">
              <Wifi className="text-green-500 animate-pulse" size={40} />
              <span className="text-sm text-green-500 font-black tracking-widest uppercase">SIGNAL_DELIVERED</span>
              <button onClick={() => setStep('COMMAND')} className="bg-yellow-400 text-black px-8 py-2 text-xs font-black uppercase italic hover:bg-white -skew-x-12">NEW_SESSION</button>
            </div>
          )}

          {(step !== 'SENDING' && step !== 'ENCRYPTING' && step !== 'SUCCESS' && step !== 'INIT') && (
            <div className="flex gap-3 text-white items-center bg-white/5 p-2 rounded">
              <span className="text-yellow-400 font-black tracking-tighter shrink-0">{step === 'COMMAND' ? 'B-127>' : '>'}</span>
              <input autoFocus className="bg-transparent border-none outline-none flex-1 uppercase text-yellow-400" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleCommand} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
const App = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [eduRef, eduVisible] = useReveal();
  const [skillsRef, skillsVisible] = useReveal();
  const [projRef, projVisible] = useReveal();
  const [readyRef, readyVisible] = useReveal(0.3); // Intersection for the footer CTA

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-mono selection:bg-yellow-400 selection:text-black overflow-x-hidden">

      <AutobotTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-yellow-400/5"></div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-full w-20 border-r border-white/5 bg-black/50 backdrop-blur-xl z-50 flex flex-col items-center py-10 gap-10">
        <div className="w-12 h-12 bg-yellow-400 flex items-center justify-center -rotate-45 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
          <Zap size={24} className="text-black rotate-45" />
        </div>
        <div className="flex-1 flex flex-col gap-8 justify-center">
          {[{ icon: Compass, label: 'NAV', href: '#hero' }, { icon: GraduationCap, label: 'EDU', href: '#education' }, { icon: Binary, label: 'SYS', href: '#skills' }, { icon: Target, label: 'OPS', href: '#projects' }].map((item) => (
            <a key={item.label} href={item.href} className="group relative">
              <item.icon size={20} className="text-zinc-600 group-hover:text-yellow-400 transition-colors" />
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="pl-20">
        <header id="hero" className="min-h-screen flex flex-col justify-center px-10 md:px-20 relative border-b border-white/5 overflow-hidden">
          <div className="absolute top-20 right-20 opacity-10 hidden lg:block">
            <Hexagon size={400} className="text-white animate-[spin_60s_linear_infinite]" />
          </div>

          <div className={`relative z-10 max-w-4xl`}>
            <div className="flex items-center gap-3 mb-6 animate-pulse">
              <div className="h-[2px] w-12 bg-yellow-400"></div>
              <span className="text-xs font-black text-yellow-400 uppercase tracking-[0.5em]">System Online: Alok-B127</span>
            </div>

            <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.8] uppercase italic mb-10 overflow-hidden">
              <span className="block animate-slide-up-heading delay-100">ALOK</span>
              <span className="text-yellow-400 tracking-tighter block animate-slide-up-heading delay-300">PRASAD</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end opacity-0 animate-[fade-in_1s_ease-out_forwards_0.8s]">
              <p className="text-lg text-zinc-500 font-bold leading-relaxed border-l-2 border-yellow-400 pl-6 uppercase tracking-tighter italic">
                Strategic Intelligence Unit: Specialized in Agentic AI Architectures and Defensive Web Infrastructures.
              </p>
              <button
                onClick={() => setTerminalOpen(true)}
                className="group relative px-8 py-4 bg-yellow-400 text-black font-black uppercase text-xs tracking-widest -skew-x-12 flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_30px_rgba(250,204,21,0.2)]"
              >
                Establish Link <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        <main className="px-6 md:px-20 py-32 space-y-40">
          <section id="education" ref={eduRef} className={`grid grid-cols-1 lg:grid-cols-12 gap-10 transition-all duration-1000 ${eduVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-black text-white uppercase italic sticky top-32">
                Mission<br /><span className="text-yellow-400">Training</span>
              </h2>
            </div>
            <div className="lg:col-span-8">
              <IaconFrame title="UPLINK_LOG_V2023">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white leading-tight uppercase">{education.institution}</h3>
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
                      <div className="flex items-center gap-2 text-yellow-400"><Calendar size={14} /> {education.duration}</div>
                      <div className="flex items-center gap-2 text-zinc-500"><MapPin size={14} /> {education.location}</div>
                    </div>
                  </div>
                  <div className="bg-yellow-400 p-6 flex flex-col items-center justify-center -skew-x-12 min-w-[150px]">
                    <span className="text-[10px] font-black text-black uppercase mb-1">Efficiency_Rating</span>
                    <span className="text-4xl font-black text-black italic">{education.cgpa}</span>
                  </div>
                </div>
              </IaconFrame>
            </div>
          </section>

          <section id="skills" ref={skillsRef} className={`grid grid-cols-1 lg:grid-cols-12 gap-10 transition-all duration-1000 ${skillsVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-zinc-900 border border-white/5 flex flex-col items-center justify-center p-4">
                  <Cpu className="text-yellow-400 mb-2" size={32} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Processing_Core</span>
                </div>
                <div className="aspect-square bg-yellow-400 flex flex-col items-center justify-center p-4 -skew-x-6">
                  <Activity className="text-black mb-2" size={32} />
                  <span className="text-[8px] font-black text-black uppercase tracking-widest">Live_Signal</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-4xl font-black text-white uppercase italic mb-10">Cyber_Arsenal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(techStck).map(([key, items]) => (
                  <div key={key} className="group">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block group-hover:text-yellow-400 transition-colors">{key}</span>
                    <div className="flex flex-wrap gap-2 p-4 bg-zinc-900/50 border border-white/5 group-hover:border-yellow-400/30 transition-all">
                      {items.map(skill => (
                        <span key={skill} className="text-[10px] font-bold text-white uppercase bg-white/5 px-2 py-1 hover:bg-yellow-400 hover:text-black transition-all cursor-crosshair">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" ref={projRef} className="space-y-16">
            <div className={`text-center max-w-2xl mx-auto space-y-4 transition-all duration-700 ${projVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="w-16 h-1 bg-yellow-400 mx-auto"></div>
              <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">Mission_Archive</h2>
            </div>

            <div className="grid grid-cols-1 gap-32">
              {projects.map((p, i) => {
                const [ref, visible] = useReveal();
                return (
                  <div key={i} ref={ref} className={`group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-all duration-1000 ${visible ? 'translate-x-0 opacity-100' : (i % 2 === 0 ? '-translate-x-20' : 'translate-x-20') + ' opacity-0'}`}>
                    <div className={`lg:col-span-7 ${i % 2 !== 0 ? 'lg:order-last' : ''} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-yellow-400/20 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                      <div className="aspect-video border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700 bg-zinc-900">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                      </div>
                    </div>
                    <div className="lg:col-span-5 space-y-6">
                      <span className="text-xs font-black text-yellow-400 tracking-[0.4em] uppercase">{p.id}</span>
                      <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">{p.title}</h3>
                      <p className="text-zinc-500 font-bold leading-relaxed uppercase tracking-tighter">{p.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {p.tech.map(t => (
                          <span key={t} className="text-[9px] font-black text-zinc-400 border border-zinc-800 px-3 py-1 uppercase">{t}</span>
                        ))}
                      </div>
                      <div className="flex gap-6 pt-6">
                        <a href={p.github} className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest hover:text-yellow-400 transition-all">
                          <Github size={16} /> REPO_ACCESS
                        </a>
                        <a href={p.link} className="flex items-center gap-2 text-[10px] font-black text-yellow-400 uppercase tracking-widest hover:text-white transition-all">
                          <ExternalLink size={16} /> LIVE_UPLINK
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* TRANSFORMATION SECTION WITH ADVANCED ANIMATIONS */}
          <section ref={readyRef} className="relative py-20 overflow-hidden">
            {/* Background Block Reveal */}
            <div className={`absolute inset-0 bg-yellow-400 -skew-y-2 origin-left transition-transform duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] ${readyVisible ? 'translate-x-0' : 'translate-x-full'}`}></div>

            <div className={`relative bg-black p-12 md:p-24 text-center border-y-4 border-yellow-400 transition-all duration-1000 delay-300 ${readyVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
              <div className="overflow-hidden">
                <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter transition-transform duration-1000 delay-500" style={{ transform: readyVisible ? 'translateY(0)' : 'translateY(100%)' }}>
                  Ready to <span className="text-yellow-400">Transform</span>?
                </h2>
              </div>

              <p className={`text-zinc-600 font-black uppercase text-xs tracking-[0.4em] mt-8 mb-10 transition-all duration-1000 delay-700 ${readyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Establish secure protocol for strategic operations.
              </p>

              <div className={`transition-all duration-[0.8s] delay-900 ${readyVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <button
                  onClick={() => setTerminalOpen(true)}
                  className="group relative px-12 py-5 bg-yellow-400 text-black font-black uppercase text-sm tracking-[0.3em] -skew-x-12 hover:bg-white hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all shadow-[0_0_40px_rgba(250,204,21,0.3)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    INITIATE_PROTOCOL.exe <Zap size={18} className="animate-pulse" />
                  </span>
                  {/* Mechanical shimmer effect on button */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className="px-10 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em]">
          <div>ALOK_PRASAD // B-127_SERIES // 2026</div>
          <div className="flex gap-10">
            {['GitHub', 'LinkedIn', 'Twitter'].map(link => (
              <a key={link} href="#" className="hover:text-yellow-400 transition-colors">{link}</a>
            ))}
          </div>
          <div className="flex items-center gap-2"><Wifi size={12} /> SIGNAL_STRENGTH: OPTIMAL</div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slide-up-heading {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer { 
          0% { transform: translateX(-100%); } 
          100% { transform: translateX(200%); } 
        }
        .animate-slide-up-heading { animation: slide-up-heading 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #eab308; }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
};

export default App;