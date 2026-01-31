import CyberFrame from "@/components/screens/CyberFrame";
import Image from "next/image";
import { Github, ExternalLink, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Button from "../ui/Button";

const OperationLogs = ({ projects }) => {
    const [index, setIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const [visibleCount, setVisibleCount] = useState(3);
    const containerRef = useRef(null);

    // Drag and Sliding logic
    const x = useMotionValue(0);
    const springX = useSpring(x, { damping: 30, stiffness: 150 });

    const next = useCallback(() => {
        setIndex((prev) => Math.min(prev + 1, projects.length - visibleCount));
    }, [projects.length, visibleCount]);

    const prev = useCallback(() => {
        setIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    // Responsive visibility count
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setVisibleCount(1);
            else if (window.innerWidth < 1024) setVisibleCount(2);
            else setVisibleCount(3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Keyboard synchronization
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedProject) return; // Don't navigate when modal is open
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [next, prev, selectedProject]);

    // Update position based on index
    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const gap = 24;
            const cardWidth = (containerWidth - (visibleCount - 1) * gap) / visibleCount;
            x.set(-index * (cardWidth + gap));
        }
    }, [index, visibleCount, x]);

    return (
        <section id="operation" className="w-full min-h-screen px-6 py-12 md:px-12 md:py-20 overflow-hidden relative">
            <div className="w-full flex flex-col h-full">
                {/* Section Header */}
                <div className="mb-12 shrink-0 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl md:text-6xl text-cyan-200 mb-2 font-black italic">Operation History</h2>
                        <p className="text-cyan-400 text-xs my-2 tracking-[0.2em] font-bold uppercase opacity-80">Operations Archives // Vector_Sigma</p>
                        <div className="h-1 w-24 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"></div>
                    </div>

                    {/* Navigation Buttons (Desktop) */}
                    <div className="hidden md:flex gap-4">
                        <button
                            onClick={prev}
                            disabled={index === 0}
                            className={`p-3 flex items-center gap-2 border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 transition-all ${index === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-cyan-400/10 hover:border-cyan-400'}`}
                        >
                            <ChevronLeft size={24} /> <span className="uppercase">Prev</span>
                        </button>
                        <button
                            onClick={next}
                            disabled={index >= projects.length - visibleCount}
                            className={`p-3 flex items-center gap-2 border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 transition-all ${index >= projects.length - visibleCount ? 'opacity-20 cursor-not-allowed' : 'hover:bg-cyan-400/10 hover:border-cyan-400'}`}
                        >
                            <span className="uppercase">Next</span> <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Sliding Track Viewport */}
                <div ref={containerRef} className="relative w-full py-4">
                    <motion.div
                        className="flex gap-6"
                        style={{ x: springX }}
                    >
                        {projects.map((proj, i) => (
                            <div
                                key={`${proj.title}-${i}`}
                                className="shrink-0 transition-all duration-500"
                                style={{
                                    width: `calc((100% - ${(visibleCount - 1) * 24}px) / ${visibleCount})`,
                                    opacity: (i >= index && i < index + visibleCount) ? 1 : 0.3,
                                    scale: (i >= index && i < index + visibleCount) ? 1 : 0.95
                                }}
                                onClick={() => setSelectedProject({ ...proj, displayId: i })}
                            >
                                <CyberFrame noatmo={true} className="h-[550px] px-8 py-10 flex flex-col bg-cyan-950/20 hover:bg-cyan-950/30 cursor-pointer hover:border-cyan-400/50 group/card">
                                    <div className="flex items-center justify-between gap-3 text-cyan-400/60 mb-4 font-mono">
                                        <span className="text-[10px] tracking-[0.2em] uppercase opacity-70">Log_Session_0{i + 1}</span>
                                        <div className="text-[9px] text-cyan-400/80 border border-cyan-400/30 px-2 py-0.5 rounded-sm uppercase">
                                            {proj.deployStatus || "ACTIVE"}
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col pt-2">
                                        <h4 className="text-lg text-cyan-100 font-black leading-tight border-b border-cyan-400/20 pb-4 mb-4 h-16 flex items-center uppercase tracking-tight">
                                            {proj.title}
                                        </h4>

                                        <div className="flex-1 flex flex-col gap-4">
                                            <div className="relative w-full aspect-video border border-cyan-400/10 overflow-hidden bg-black/40 transition-all duration-500">
                                                <Image
                                                    src={proj.image}
                                                    alt={proj.title}
                                                    fill
                                                    className="object-cover opacity-60 group-hover/card:opacity-100 transition-all duration-700 group-hover/card:scale-105"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                            <p className="text-[11px] text-cyan-100/60 leading-relaxed line-clamp-4 font-medium italic">
                                                {proj.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cyan-400/10 mt-2">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] uppercase font-bold text-cyan-400/30 mb-1 tracking-widest">Entry_Point</span>
                                                <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">Local_Archive</span>
                                            </div>
                                            <div className="text-right flex flex-col">
                                                <span className="text-[8px] uppercase font-bold text-cyan-400/30 mb-1 tracking-widest">Sync_Status</span>
                                                <span className="text-[9px] font-bold text-cyan-100 uppercase tracking-widest">Synchronized</span>
                                            </div>
                                        </div>
                                    </div>
                                </CyberFrame>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Progress HUD & Mobile Nav */}
                <div className="w-full flex flex-col items-center gap-6 mt-8">
                    <div className="flex items-baseline gap-4 font-black italic">
                        <span className="text-cyan-400 text-3xl">{String(index + 1).padStart(2, '0')}</span>
                        <span className="text-cyan-400/20 text-xl">/</span>
                        <span className="text-cyan-400/40 text-sm tracking-widest">{String(projects.length).padStart(2, '0')}</span>
                    </div>

                    {/* Mobile Only Buttons */}
                    <div className="flex md:hidden gap-8">
                        <button onClick={prev} disabled={index === 0} className="text-cyan-400 disabled:opacity-20"><ChevronLeft size={32} /></button>
                        <button onClick={next} disabled={index >= projects.length - visibleCount} className="text-cyan-400 disabled:opacity-20"><ChevronRight size={32} /></button>
                    </div>
                </div>

                {/* Section Footer */}
                <div className="w-full relative mt-auto pt-8 flex justify-center items-end pb-4 border-t border-cyan-400/5">
                    <div className="absolute bottom-4 left-0 tracking-[0.4em] text-[10px] text-cyan-500/30 hidden md:block uppercase font-bold">
                        Archive_Access_Verified
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <p className="text-cyan-400/10 text-[10px] tracking-[0.6em] uppercase font-black">
                            End Of Transmission // PROTOCOL_SIGMA
                        </p>
                    </div>
                    <div className="absolute bottom-4 right-0 flex items-center gap-2 tracking-[0.4em] text-[10px] text-cyan-500/30 md:flex font-bold">
                        <Activity size={12} />
                        <span>TRANS-COMP V4</span>
                    </div>
                </div>
            </div>

            {/* Modal Detail Pop-up */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-4xl z-10"
                        >
                            <CyberFrame noatmo={true} className="w-full bg-black/80 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                                <div className="flex flex-col gap-8">
                                    <div className="flex items-center justify-between border-b border-cyan-400/20 pb-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs tracking-[0.4em] uppercase font-bold text-cyan-400/60">Operation_{selectedProject.displayId + 1} Archive</span>
                                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
                                        </div>
                                        <Button
                                            onClick={() => setSelectedProject(null)}
                                            variant="primary"
                                            className="px-6!"
                                        >
                                            Close
                                        </Button>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl text-white font-black italic uppercase tracking-tighter">
                                        {selectedProject.title}
                                    </h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        <div className="relative aspect-video w-full border border-cyan-400/20 overflow-hidden bg-black shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                                            <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col gap-6">
                                            <div>
                                                <span className="text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase mb-2 block border-l-2 border-cyan-400 pl-2">Objective Summary</span>
                                                <p className="text-cyan-100/80 text-sm leading-relaxed font-medium font-mono">{selectedProject.description}</p>
                                            </div>
                                            {selectedProject.stack && (
                                                <div>
                                                    <span className="text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase mb-3 block border-l-2 border-cyan-400 pl-2">Arsenal Configuration</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedProject.stack.map(tag => (
                                                            <span key={tag} className="text-[9px] uppercase font-bold tracking-widest px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="mt-4 flex gap-4">
                                                <Button href={selectedProject.github} variant="primary" className="flex-1 uppercase tracking-[0.2em] font-black">Archive</Button>
                                                <Button href={selectedProject.link} variant="secondary" className="flex-1 uppercase tracking-[0.2em] font-black">Uplink</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CyberFrame>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default OperationLogs;