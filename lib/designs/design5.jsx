import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
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
    Zap,
    GraduationCap,
    Calendar,
    MapPin,
    Activity
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
            cityGroup.position.z = (window.scrollY * 0.6) % 1000;
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

const CommTerminal = ({ isOpen, onClose }) => {
    const [lines, setLines] = useState([]);
    useEffect(() => {
        if (isOpen) {
            const boot = ["> LINKING...", "> SCANNING...", "> B-127 ONLINE.", "> READY."];
            setLines([]);
            boot.forEach((l, i) => setTimeout(() => setLines(prev => [...prev, l]), i * 200));
        }
    }, [isOpen]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <div className="w-full max-w-lg bg-[#0a0a0a] border border-yellow-500 shadow-2xl flex flex-col h-[400px]">
                <div className="bg-yellow-500 p-2 flex justify-between text-black font-black text-[10px] tracking-widest uppercase">
                    <span>SECURE_UPLINK</span>
                    <button onClick={onClose}><X size={16} /></button>
                </div>
                <div className="p-6 font-mono text-xs text-yellow-500 grow overflow-y-auto">
                    {lines.map((l, i) => <p key={i}>{l}</p>)}
                    {lines.length >= 4 && (
                        <form className="mt-8 space-y-4">
                            <input className="w-full bg-black border border-yellow-500/20 p-2 outline-none text-yellow-500" placeholder="NAME" />
                            <textarea className="w-full bg-black border border-yellow-500/20 p-2 outline-none h-20" placeholder="MESSAGE"></textarea>
                            <button type="button" onClick={onClose} className="w-full bg-yellow-500 text-black py-3 font-black uppercase text-[10px]">Dispatch</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP ---
const App = () => {
    const [isCommOpen, setIsCommOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-yellow-500 selection:text-black">
            <CityScanBackground />
            <CommTerminal isOpen={isCommOpen} onClose={() => setIsCommOpen(false)} />

            {/* FIXED HUD DECOR */}
            <div className="fixed inset-0 pointer-events-none z-60">
                <div className="absolute top-0 w-full h-px bg-yellow-500/20"></div>
                <div className="absolute bottom-6 left-6 font-mono text-[9px] text-yellow-500/40 uppercase tracking-[0.4em]">
                    Autobot Command Center // V1.0.2
                </div>
                <div className="absolute top-6 right-8 flex items-center gap-2 text-yellow-500/60 font-mono text-[10px]">
                    <Activity size={12} className="animate-pulse" />
                    <span>SCAN_ACTIVE</span>
                </div>
            </div>

            {/* NAV */}
            <nav className="fixed top-0 left-0 w-full z-100 border-b border-yellow-500/10 bg-black/40 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-500 -skew-x-12 flex items-center justify-center">
                            <Cpu className="text-black" size={18} />
                        </div>
                        <span className="text-lg font-black tracking-tighter text-white italic">ALOK.PRIME</span>
                    </div>
                    <button onClick={() => setIsCommOpen(true)} className="bg-yellow-500 text-black px-6 py-2 font-black uppercase text-[10px] tracking-widest -skew-x-12">
                        Uplink
                    </button>
                </div>
            </nav>

            {/* HERO SECTION - NO STACKING */}
            <section className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 z-10">
                <div className="mb-6 inline-flex items-center gap-2 border border-yellow-500/20 px-4 py-1 rounded-full bg-yellow-500/5 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping"></div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-yellow-500 font-bold">Bio-Link Established</span>
                </div>
                <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-white leading-none italic">
                    ALOK <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #FFD700' }}>PRASAD</span>
                </h1>
                <p className="mt-8 text-lg md:text-xl text-yellow-500/60 font-mono uppercase tracking-[0.3em]">
                    Intelligence // Architecture // Transformation
                </p>
            </section>

            {/* STACKING CONTAINER */}
            <div className="relative z-20">

                {/* ARSENAL SECTION */}
                <section id="arsenal" className="sticky top-0 w-[80] h-screen bg-[#050505] flex items-center justify-center border-t border-yellow-500/20 px-6 py-3 md:p-10 overflow-hidden">
                    <div className="max-w-4xl w-full">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase mb-2">Arsenal</h2>
                            <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(techStck).map(([cat, skills]) => (
                                <div key={cat} className="bg-white/5 border border-white/10 p-6 backdrop-blur-md hover:border-yellow-500/50 transition-all">
                                    <h3 className="text-yellow-500 font-black uppercase text-[10px] mb-4 tracking-widest">{cat}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(s => <span key={s} className="px-2 py-1 bg-black text-[9px] border border-white/5 font-mono uppercase">{s}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* MISSION STACK (PROJECTS) */}
                {projects.map((proj, i) => (
                    <section key={i} className="sticky top-0 h-screen bg-[#080808] border-t border-yellow-500/20 flex items-center justify-center p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="text-yellow-500 font-mono text-[10px] tracking-[0.5em] uppercase">Deployment_0{i + 1}</div>
                                <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase leading-none">{proj.title}</h3>
                                <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-md">"{proj.description}"</p>
                                <div className="flex gap-6 pt-4">
                                    <a href={proj.github} className="text-yellow-500 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">
                                        <Github size={16} /> Source_Code
                                    </a>
                                    <a href={proj.link} className="text-yellow-500 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">
                                        <ExternalLink size={16} /> Live_Uplink
                                    </a>
                                </div>
                            </div>
                            <div className="relative group overflow-hidden border border-yellow-500/20">
                                <img src={proj.image} alt={proj.title} className="w-full h-[400px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                                <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay"></div>
                            </div>
                        </div>
                    </section>
                ))}

                {/* TRAINING SECTION */}
                <section id="training" className="sticky top-0 h-screen bg-[#0a0a0a] border-t border-yellow-500/20 flex items-center justify-center p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    <div className="max-w-4xl w-full bg-white/5 p-10 md:p-20 border-l-4 border-yellow-500 backdrop-blur-xl">
                        <div className="flex items-center gap-4 text-yellow-500 mb-8">
                            <GraduationCap size={48} />
                            <span className="font-mono text-xs uppercase tracking-[0.4em]">Academic_Core_Load</span>
                        </div>
                        <h4 className="text-4xl md:text-6xl font-black text-white italic uppercase mb-4">{educationData[0].institute}</h4>
                        <p className="text-xl text-yellow-500 font-black uppercase mb-8 border-b border-yellow-500/20 pb-4">
                            {educationData[0].degree} // {educationData[0].fieldOfStudy}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">Efficiency</div>
                                <div className="text-4xl font-black text-white italic">{educationData[0].gpa}</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">Timeline</div>
                                <div className="text-sm font-bold text-white uppercase">{educationData[0].startDate} - {educationData[0].endDate}</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">Status</div>
                                <div className="text-[10px] font-black text-yellow-500 animate-pulse">OPTIMIZED</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CLEARANCE SECTION */}
                <section id="clearance" className="relative min-h-screen bg-black border-t border-yellow-500/20 p-20 z-30">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-5xl font-black text-white italic uppercase mb-16">Clearances</h2>
                        <div className="space-y-4">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex flex-col md:flex-row justify-between items-center p-8 bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-all gap-6 group">
                                    <div className="flex items-center gap-6">
                                        <ShieldCheck className="text-yellow-500 group-hover:scale-110 transition-transform" size={32} />
                                        <div>
                                            <div className="text-white font-black uppercase text-xl">{cert.title}</div>
                                            <div className="text-yellow-500/60 font-mono text-[10px] uppercase">{cert.organization}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 md:justify-end">
                                        {cert.learnings.map(l => <span key={l} className="text-[8px] border border-white/5 px-2 py-1 font-bold uppercase text-gray-500">{l}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <footer className="mt-40 text-center space-y-8">
                            <div className="flex justify-center gap-12 font-black uppercase text-[10px] tracking-[0.5em] text-gray-500">
                                <a href="#" className="hover:text-yellow-500">GitHub</a>
                                <a href="#" className="hover:text-yellow-500">LinkedIn</a>
                                <a href="#" className="hover:text-yellow-500">Email</a>
                            </div>
                            <p className="text-yellow-500/20 text-[9px] tracking-[1em] uppercase">EndOfTransmission // ©2027</p>
                        </footer>
                    </div>
                </section>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #050505; }
        h1, h2, h3, h4, .font-mono { font-family: 'Orbitron', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #FFD700; }
        html { scroll-behavior: smooth; }
      `}</style>
        </div>
    );
};

export default App;