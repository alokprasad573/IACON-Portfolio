import React, { useState, useEffect, useMemo } from 'react';
import { Terminal, Shield, Cpu, ExternalLink, Github, Award, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

// Data extracted from the provided index.js
const certifications = [
  {
    title: "Full Stack Web Development",
    organization: "Apna College",
    learnings: ["HTML5", "CSS3", "JavaScript ES6", "React.js", "Next.js", "Bootstrap", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Postman", "GitHub", "Git"]
  },
  {
    title: "Java DSA",
    organization: "Apna College",
    learnings: ["Java Intermediate", "Data Structure", "Algorithms"]
  },
  {
    title: "Data Science & GenAI",
    organization: "Apna College",
    learnings: ["Python", "Numpy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch", "GenAI", "NLP", "Git & Github", "Docker", "Kubernetes", "Flask", "FastAPI", "OpenAI API", "Agentic AI"]
  }
];

const techStck = {
  languages: ["HTML5", "CSS3", "JavaScript ES6", "Python", "Java"],
  libraries: ["numpy", "pandas", "matplotlib", "seaborn", "scikit-learn", "tensorflow", "pytorch", "keras"],
  frameworks: ["Next.js", "Tailwind CSS", "Flask", "FastAPI", "Express.js", "Langchain"],
  tools: ["Git", "GitHub", "Docker", "Kubernetes", "Postman"],
  dsa: ["Java Intermediate", "Data Structure", "Algorithms"],
};

const projects = [
  {
    title: "Stackscore-AI Resume Analyzer",
    description: "StackScore is an AI-powered resume analyzer that helps job seekers optimize their resumes for specific companies and roles using ATS-friendly feedback, built with React, TypeScript, and Puter.js.",
    github: "https://github.com/alokprasad573/StackScore.git",
    link: "https://stack-score.vercel.app/"
  }
];

// --- Sub-Components ---

const CyberFrame = ({ children, title, subtitle, colorClass = "border-cyan-500/50" }) => (
  <div className={`relative border-2 ${colorClass} bg-black/80 p-6 shadow-[0_0_20px_rgba(6,182,212,0.1)] rounded-sm overflow-hidden`}>
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-inherit translate-x-[-2px] translate-y-[-2px]" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-inherit translate-x-[2px] translate-y-[-2px]" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-inherit translate-x-[-2px] translate-y-[2px]" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-inherit translate-x-[2px] translate-y-[2px]" />

    <div className="flex justify-between items-center mb-6 border-b border-inherit/30 pb-2">
      <div className="text-[10px] tracking-[0.2em] font-bold uppercase text-inherit">
        {title}
        <div className="text-[8px] font-normal mt-0.5 opacity-70 italic">{subtitle}</div>
      </div>
      <div className="bg-inherit px-2 py-0.5 text-[10px] text-black font-black">
        BASE : ALPHA-7
      </div>
    </div>
    {children}
  </div>
);

const ProgressBar = ({ progress, text }) => (
  <div className="w-full max-w-md mx-auto text-center">
    <div className="text-[10px] tracking-widest mb-2 text-cyan-400 opacity-80 uppercase">{text}</div>
    <div className="border border-cyan-500/40 p-1 h-12 flex items-center bg-black/50">
      <div className="bg-cyan-500/20 w-full h-full relative overflow-hidden flex items-center px-4">
        <div
          className="absolute left-0 top-0 h-full bg-cyan-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
        <span className="relative z-10 text-[11px] font-bold tracking-widest text-white mix-blend-difference uppercase">
          {text} {progress}%
        </span>
      </div>
    </div>
  </div>
);

// --- Main Screens ---

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center text-[8px] tracking-[0.4em] text-cyan-500/50 mb-4 animate-pulse uppercase">
          Searching Autobot Frequency
        </div>
        <ProgressBar progress={progress} text="Connecting with Mainframe ...." />
      </div>
    </div>
  );
};

const AuthScreen = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const sequence = [
      "INITIALIZING COMMAND INTERFACE...",
      "STANDBY FOR SIGNAL HANDSHAKE...",
      "SCANNING CYBERTRONIAN FREQUENCY...",
      "UPLINK STABILIZED. READY."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setLogs(prev => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md scale-110">
        <CyberFrame title="IACON MAINFRAME" subtitle="AWAITING_UPLINK..." colorClass="border-cyan-500/50 text-cyan-400">
          <div className="flex flex-col items-center py-12">
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-spin-slow" />
              <div className="absolute inset-2 border border-cyan-500/40 rounded-full animate-reverse-spin" />
              <div className="text-cyan-500">
                <Shield size={32} className="animate-pulse" />
              </div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400" />
            </div>

            <div className="text-[10px] tracking-widest text-cyan-400 uppercase mb-4">
              Scanning Cybertronian Frequency
            </div>

            <div className="w-full bg-black border border-cyan-500/30 p-4 h-24 font-mono text-[9px] text-cyan-300 leading-relaxed overflow-hidden mb-6">
              {logs.map((log, idx) => (
                <div key={idx} className="mb-1">{`> ${log}`}</div>
              ))}
            </div>

            <button
              onClick={onComplete}
              className="w-full group relative overflow-hidden py-3 bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black transition-all duration-300"
            >
              <div className="relative z-10 text-[10px] font-black tracking-[0.3em] uppercase">
                Initiate Authorization
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-white w-0 group-hover:w-full transition-all duration-500" />
            </button>
          </div>
        </CyberFrame>
      </div>
    </div>
  );
};

const IdentityScreen = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <CyberFrame title="IACON MAINFRAME" subtitle="IDENTITY CONFIRMED" colorClass="border-amber-500/50 text-amber-500">
          <div className="text-center py-4">
            <div className="text-[10px] tracking-widest text-amber-500/80 mb-1 uppercase">Identified as B-127</div>
            <div className="text-[14px] font-black tracking-[0.2em] text-amber-400 uppercase">Nickname: Bumblebee</div>

            <div className="grid grid-cols-2 gap-px bg-amber-500/20 border border-amber-500/20 my-6">
              <div className="bg-black/80 p-3 text-left">
                <div className="text-[8px] text-amber-500/60 uppercase mb-1 flex items-center gap-1">
                  <Shield size={8} /> Designation
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Scout</div>
              </div>
              <div className="bg-black/80 p-3 text-left">
                <div className="text-[8px] text-amber-500/60 uppercase mb-1">Spark ID</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">774-BEE-882</div>
              </div>
              <div className="bg-black/80 p-3 text-left">
                <div className="text-[8px] text-amber-500/60 uppercase mb-1 flex items-center gap-1">
                  <Cpu size={8} /> Chassis Sync
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Urban_Compact_V1</div>
              </div>
              <div className="bg-black/80 p-3 text-left">
                <div className="text-[8px] text-amber-500/60 uppercase mb-1">Tactical Status</div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  Operational
                </div>
              </div>
            </div>

            <div className="w-full bg-black/80 border border-amber-500/20 p-4 font-mono text-[9px] text-left text-amber-200/80 leading-relaxed mb-6">
              <p className="mb-1 text-emerald-400">ENERGON PULSE DETECTED: STABLE</p>
              <p className="mb-1">ACCESSING IACON CRYPTO-CORE...</p>
              <p className="mb-1">ANALYZING SPARK FREQUENCY DATA...</p>
              <p className="mb-1 text-emerald-400 font-bold italic">AUTHENTICATION SUCCESSFUL.</p>
              <p>ACCESS GRANTED. WELCOME BACK, SCOUT.</p>
            </div>

            <button
              onClick={onComplete}
              className="w-full group py-3 bg-amber-500/10 border border-amber-500/50 hover:bg-amber-400 hover:text-black transition-all"
            >
              <div className="text-[10px] font-black tracking-[0.3em] uppercase">See Detail</div>
            </button>
          </div>
        </CyberFrame>
      </div>
    </div>
  );
};

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState('stack');

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-sans selection:bg-cyan-500 selection:text-black">
      {/* HUD Header */}
      <header className="fixed top-0 w-full z-50 border-b border-cyan-500/20 bg-black/90 backdrop-blur-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-cyan-500/50 rounded-sm flex items-center justify-center animate-pulse">
              <Zap size={20} />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-[0.3em] uppercase">System Archive</h1>
              <p className="text-[9px] opacity-60 uppercase italic tracking-widest">Operator: B-127 (Scout)</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-[9px] text-right">
              <div className="opacity-50">LOCATION</div>
              <div className="font-bold">SECTOR 77-A</div>
            </div>
            <div className="h-8 w-px bg-cyan-500/20" />
            <div className="text-[9px] text-right">
              <div className="opacity-50">STATUS</div>
              <div className="text-emerald-400 font-bold">ONLINE</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pt-28 pb-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar Nav */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="text-[10px] font-bold tracking-[0.2em] mb-4 text-cyan-500/50 uppercase">Directory</div>
            {[
              { id: 'stack', label: 'Tech Stack', icon: <Cpu size={14} /> },
              { id: 'certs', label: 'Certifications', icon: <Award size={14} /> },
              { id: 'projects', label: 'Tactical Projects', icon: <Terminal size={14} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 border transition-all ${activeTab === tab.id
                  ? 'bg-cyan-500 text-black border-cyan-500'
                  : 'border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/5'
                  }`}
              >
                {tab.icon}
                <span className="text-[11px] font-bold uppercase tracking-widest">{tab.label}</span>
                <ChevronRight size={14} className={`ml-auto ${activeTab === tab.id ? 'opacity-100' : 'opacity-20'}`} />
              </button>
            ))}
          </aside>

          {/* Main Display */}
          <section className="lg:col-span-9">
            {activeTab === 'stack' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4">
                {Object.entries(techStck).map(([category, items]) => (
                  <CyberFrame key={category} title={category} subtitle="HARDWARE_CAPABILITIES" colorClass="border-cyan-500/30">
                    <div className="flex flex-wrap gap-2">
                      {items.map(item => (
                        <div key={item} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1 h-1 bg-cyan-500 animate-pulse" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CyberFrame>
                ))}
              </div>
            )}

            {activeTab === 'certs' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                {certifications.map((cert, idx) => (
                  <CyberFrame key={idx} title={cert.organization} subtitle="VALIDATED_DATA" colorClass="border-emerald-500/30">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-2">{cert.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {cert.learnings.map(skill => (
                            <span key={skill} className="text-[9px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 border border-emerald-500/20 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:w-32 flex flex-col gap-2">
                        <button className="text-[9px] font-bold uppercase py-2 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center gap-2">
                          <ExternalLink size={10} /> View Cert
                        </button>
                      </div>
                    </div>
                  </CyberFrame>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4">
                {projects.map((proj, idx) => (
                  <CyberFrame key={idx} title="PROJECT_INTEL" subtitle={`UNIT_${idx + 1}`} colorClass="border-cyan-500/30">
                    <div className="space-y-4">
                      <h3 className="text-base font-black text-cyan-400 uppercase tracking-[0.2em]">{proj.title}</h3>
                      <p className="text-[11px] text-cyan-200/70 leading-relaxed font-mono">
                        {proj.description}
                      </p>
                      <div className="flex gap-4 pt-4 border-t border-cyan-500/20">
                        <a href={proj.github} className="flex items-center gap-2 text-[10px] font-bold uppercase hover:text-white transition-colors">
                          <Github size={14} /> Repository
                        </a>
                        <a href={proj.link} className="flex items-center gap-2 text-[10px] font-bold uppercase hover:text-white transition-colors">
                          <ExternalLink size={14} /> Live Uplink
                        </a>
                      </div>
                    </div>
                  </CyberFrame>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black" />
        <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />
        <div className="absolute top-0 w-full h-1/2 bg-linear-to-b from-cyan-500/5 to-transparent animate-scanline" />
      </div>

      <style>{`
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        .animate-reverse-spin {
          animation: spin 8s linear reverse infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const [stage, setStage] = useState('loading'); // loading, auth, identity, dashboard

  return (
    <div className="bg-black min-h-screen">
      {stage === 'loading' && <LoadingScreen onComplete={() => setStage('auth')} />}
      {stage === 'auth' && <AuthScreen onComplete={() => setStage('identity')} />}
      {stage === 'identity' && <IdentityScreen onComplete={() => setStage('dashboard')} />}
      {stage === 'dashboard' && <MainDashboard />}
    </div>
  );
}