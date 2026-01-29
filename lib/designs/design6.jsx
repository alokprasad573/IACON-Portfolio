'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Cpu,
  ShieldCheck,
  ExternalLink,
  Github,
  X,
  GraduationCap,
  Activity,
  Linkedin,
  Mail
} from 'lucide-react';

// --- DATA ---
const educationData = [{
  institute: "CSVTU, Bhilai",
  degree: "Bachelor of Technology",
  fieldOfStudy: "CSE (Artificial Intelligence)",
  startDate: "2023",
  endDate: "2027",
  gpa: "7.0",
  location: "Bhilai, CG"
}];

const techStck = {
  languages: ["HTML5", "CSS3", "JavaScript ES6", "Python", "Java"],
  libraries: ["numpy", "pandas", "matplotlib", "seaborn", "scikit-learn", "tensorflow", "pytorch", "keras"],
  frameworks: ["Next.js", "Tailwind CSS", "Flask", "FastAPI", "Express.js", "Langchain"],

  tools: ["Git", "GitHub", "Docker", "Kubernetes", "Postman"],
};

const certifications = [
  {
    title: "Full Stack Web Development",
    organization: "Apna College",
    learnings: ["HTML5", "CSS3", "JS", "React.js", "Next.js", "Node.js", "MongoDB"]
  },
  {
    title: "Java DSA",
    organization: "Apna College",
    learnings: ["Java Intermediate", "Data Structure", "Algorithms"]
  },
  {
    title: "Data Science & GenAI",
    organization: "Apna College / CodeChef",
    learnings: ["Python", "TensorFlow", "GenAI", "Agentic AI"]
  }
];

const projects = [
  {
    title: "Stackscore AI",
    description: "AI-powered resume analyzer optimizing job applications with high-precision LLM parsing.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/alokprasad573/StackScore.git",
    link: "https://stack-score.vercel.app/",
    tags: ["React", "TypeScript", "Puter.js"]
  },
  {
    title: "Cyber-Sentinel",
    description: "Encrypted authentication system utilizing biometric Cybertronian logic gates.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/alokprasad573/",
    link: "#",
    tags: ["Next.js", "Firebase", "WebAuthn"]
  },
  {
    title: "Energon Grid",
    description: "Real-time visualization of resource distribution across sector 7-B.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/alokprasad573/",
    link: "#",
    tags: ["Three.js", "FastAPI", "WebSockets"]
  }
];

// --- CYBER SCREEN COMPONENT ---
const CyberScreen = ({ children, accentColor = "#FFD700", glowLevel = 30 }) => {
  return (
   
     <div className="bg-black blackflex items-center justify-center">
      <div
        className="crt-reveal layer-shrink relative w-full max-w-[80vw]  bg-[#030712]/95 border backdrop-blur-md overflow-hidden p-8 md:12 transition-all duration-500 accelerated"
        style={{
          // Updated to 20px chamfered corners per CyberFrame style
          clipPath: 'polygon(0% 20px, 20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px))',
          boxShadow: `0 0 ${glowLevel}px ${accentColor}33`,
          borderColor: accentColor,
          color: accentColor,
        }}
      >
        {/* Cyber-Frame Accents - Top Runner with Pips */}
        <div 
          className="absolute top-0 left-[10%] right-[10%] h-[2px]" 
          style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
        >
          <div className="absolute left-0 top-0 h-2 w-px bg-current" />
          <div className="absolute right-0 top-0 h-2 w-px bg-current" />
        </div>

        {/* Cyber-Frame Accents - Bottom Runner with Pips */}
        <div 
          className="absolute bottom-0 left-[10%] right-[10%] h-[2px]" 
          style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
        >
          <div className="absolute left-0 bottom-0 h-2 w-px bg-current" />
          <div className="absolute right-0 bottom-0 h-2 w-px bg-current" />
        </div>

        {/* Side Notches */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[2px] h-8 opacity-40 bg-current" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[2px] h-8 opacity-40 bg-current" />

        {/* Content Container */}
        <div className="relative z-10 w-full p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- STACK LAYER COMPONENT ---
const StackLayer = ({ children, index }) => {
  return (
    <div
      className="scroll-layer sticky bg-black top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ zIndex: index }}
    >
      <div className="w-full flex justify-center accelerated">
        {children}
      </div>
    </div>
  );
};

// --- 3D BACKGROUND ---
const CityScanBackground = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    const grid = new THREE.GridHelper(4000, 60, 0xFFD700, 0x080808);
    grid.position.y = -20;
    grid.material.transparent = true;
    grid.material.opacity = 0.15;
    scene.add(grid);

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    for (let i = 0; i < 150; i++) {
      const h = Math.random() * 250 + 30;
      const w = Math.random() * 40 + 10;
      const wireframe = new THREE.WireframeGeometry(boxGeo);
      const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0xFFD700, transparent: true, opacity: 0.1 }));
      line.scale.set(w, h, w);
      line.position.set((Math.random() - 0.5) * 1600, h / 2 - 20, (Math.random() - 0.5) * 1600);
      cityGroup.add(line);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      cityGroup.position.z = (window.scrollY * 0.4) % 1000;
      camera.position.y = 80 + Math.sin(Date.now() * 0.001) * 10;
      camera.lookAt(0, 50, -1000);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// --- MAIN APP ---
const App = () => {
  return (
    <div className="bg-bg-deep text-gray-300 selection:bg-yellow-500 selection:text-black">

      {/* FIXED HUD */}
      <div className="fixed inset-0 pointer-events-none z-60">
        <div className="absolute top-0 w-full h-px bg-yellow-500/20"></div>
        <div className="absolute bottom-6 left-6 text-[9px] text-yellow-500/40 tracking-[0.4em]">
          Autobot Command Center // V1.0.5
        </div>
        <div className="absolute top-6 right-8 flex items-center gap-2 text-yellow-500/60 text-[10px]">
          <Activity size={12} className="animate-pulse" />
          <span>SCAN_ACTIVE</span>
        </div>
      </div>

      <nav className="fixed top-0 left-0 w-full z-100 border-b border-yellow-500/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 -skew-x-12 flex items-center justify-center">
              <Cpu className="text-black" size={18} />
            </div>
            <span className="text-lg font-black tracking-tighter text-white italic">ALOK.PRIME</span>
          </div>
        </div>
      </nav>

      <StackLayer index={1}>
        <CityScanBackground />
        <section className="layer-shrink hero-contents relative h-screen flex flex-col items-center justify-center text-center px-6 z-10 overflow-hidden">
          <div className="mb-6 inline-flex items-center gap-2 border border-yellow-500/20 px-4 py-1 rounded-full bg-yellow-500/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping"></div>
            <span className="text-[9px] font-mono tracking-widest uppercase text-yellow-500 font-bold">Bio-Link Established</span>
          </div>
          <div className="scroll-shrink">
            <h1 className="text-7xl md:text-[10rem] text-white leading-none">
              ALOK <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #FFD700' }}>PRASAD</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-yellow-500/60 tracking-[0.3em]">
              Intelligence // Architecture // Transformation
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-8 md:gap-12">
              {/* GitHub Link */}
              <a href="https://github.com/alokprasad573" className="group flex items-center gap-3 text-gray-500 hover:text-yellow-500 transition-all">
                <Github size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">Source_Code</span>
              </a>

              {/* LinkedIn Link */}
              <a href="#" className="group flex items-center gap-3 text-gray-500 hover:text-yellow-500 transition-all">
                <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">Neural_Network</span>
              </a>

              {/* Email Link */}
              <a href="mailto:contact@alok.prime" className="group flex items-center gap-3 text-gray-500 hover:text-yellow-500 transition-all">
                <Mail size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">Direct_Link</span>
              </a>
            </div>
          </div>
        </section>
      </StackLayer>






      {/* THE STACK CONTAINER */}
      <div className="relative z-20 stack-container">
        {/* ARSENAL */}
        <StackLayer index={1}>
          <CyberScreen>
            <div className="mb-12">
              <h2 className="text-4xl md:text-6xl text-white mb-2">Arsenal</h2>
              <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(techStck).map(([cat, skills]) => (
                <div key={cat} className="bg-black/50 border border-white/10 p-4 backdrop-blur-md hover:border-yellow-500/50 transition-all group">
                  <h3 className="text-yellow-500 text-[9px] mb-3 tracking-widest group-hover:translate-x-1 transition-transform">{cat}</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.map(s => <span key={s} className="px-1.5 py-0.5 bg-black text-[8px] border border-white/5 text-gray-400">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </CyberScreen>
        </StackLayer>

        {/* PROJECTS */}
        {projects.map((proj, i) => (
          <StackLayer key={i} index={i + 12}>
            <CyberScreen>
              <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                <div className="space-y-6">
                  <div className="text-yellow-500 text-[9px] tracking-[0.5em]">Deployment_0{i + 1}</div>
                  <h3 className="text-3xl md:text-5xl text-white leading-none">{proj.title}</h3>
                  <p className="text-gray-400 text-[11px] leading-relaxed max-w-md">"{proj.description}"</p>
                  <div className="flex gap-4 pt-2">
                    <a href={proj.github} className="text-yellow-500 flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:text-white transition-colors">
                      <Github size={14} /> Source
                    </a>
                    <a href={proj.link} className="text-yellow-500 flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:text-white transition-colors">
                      <ExternalLink size={14} /> Uplink
                    </a>
                  </div>
                </div>
                <div className="relative group overflow-hidden border border-yellow-500/20 h-[200px] md:h-full">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
            </CyberScreen>
          </StackLayer>
        ))}

        {/* ACADEMIC */}
        <StackLayer index={projects.length + 20}>
          <CyberScreen>
            <div className="flex items-center gap-4 text-yellow-500 mb-6">
              <GraduationCap size={40} />
              <span className="text-xs tracking-[0.4em]">Academic_Core_Load</span>
            </div>
            <h4 className="text-3xl md:text-5xl text-white mb-2">{educationData[0].institute}</h4>
            <p className="text-lg text-yellow-500 mb-8 border-b border-yellow-500/20 pb-4">
              {educationData[0].degree} // {educationData[0].fieldOfStudy}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div className="text-[9px] uppercase font-bold text-gray-500 mb-1 tracking-widest">Efficiency</div>
                <div className="text-3xl text-white">{educationData[0].gpa}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase font-bold text-gray-500 mb-1 tracking-widest">Timeline</div>
                <div className="text-xs font-bold text-white uppercase">{educationData[0].startDate} - {educationData[0].endDate}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase font-bold text-gray-500 mb-1 tracking-widest">Status</div>
                <div className="text-[9px] text-yellow-500 animate-pulse">OPTIMIZED</div>
              </div>
            </div>
          </CyberScreen>
        </StackLayer>

        {/* CLEARANCES */}
        <StackLayer index={projects.length + 30}>
          <CyberScreen>
            <h2 className="text-3xl md:text-5xl text-white mb-8">Clearances</h2>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-4 scrollbar-custom">
              {certifications.map((cert, i) => (
                <div key={i} className="flex flex-col md:flex-row justify-between items-center p-5 bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-all gap-4 group">
                  <div className="flex items-center gap-4">
                    <ShieldCheck className="text-yellow-500 group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <div className="text-white text-base">{cert.title}</div>
                      <div className="text-yellow-500/60 text-[9px]">{cert.organization}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 md:justify-end">
                    {cert.learnings.map(l => <span key={l} className="text-[7px] border border-white/5 px-1.5 py-0.5 font-bold uppercase text-gray-500">{l}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
              <span className="text-[8px] text-gray-500 tracking-[0.4em]">©2027 ALOK.PRIME</span>
              <span className="text-[8px] text-yellow-500/40">Status: End of Payload</span>
            </div>
          </CyberScreen>
        </StackLayer>
      </div>
    </div>
    
  );
};


export default App;