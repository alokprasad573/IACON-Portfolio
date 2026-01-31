import CyberFrame from "@/components/screens/CyberFrame";
import Image from "next/image";
import { Github, ExternalLink, Terminal, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

const OperationLogs = ({ projects }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const next = useCallback(() => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % projects.length);
    }, [projects.length]);

    const prev = useCallback(() => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }, [projects.length]);

    // Calculate visible projects (wrapping around for seamless loop)
    const getVisibleProjects = () => {
        const items = [];
        for (let i = 0; i < 3; i++) {
            items.push(projects[(index + i) % projects.length]);
        }
        return items;
    };

    return (
        <section id="operation" className="w-full min-h-screen px-6 py-12 md:px-12 md:py-20 overflow-hidden">
            <div className="w-full flex flex-col h-full">
                {/* Section Header - Consistent with Training Modules & Tech Arsenals */}
                <div className="mb-12 shrink-0 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl md:text-6xl text-cyan-200 mb-2 font-black italic">Operation History</h2>
                        <p className="text-cyan-400 text-xs my-2 tracking-[0.2em] font-bold uppercase opacity-80">Mission Archives // Vector_Sigma</p>
                        <div className="h-1 w-24 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"></div>
                    </div>

                    {/* Navigation Controls - Styled with primary Button component */}
                    <div className="hidden md:flex gap-4">
                        <Button
                            onClick={prev}
                            variant="primary"
                            className="px-4!"
                        >
                            <ChevronLeft size={16} /> Prev_Log
                        </Button>
                        <Button
                            onClick={next}
                            variant="primary"
                            className="px-4!"
                        >
                            Next_Log <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>

                {/* Multi-Card Carousel Grid Area */}
                <div
                    className="relative w-full overflow-visible py-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative min-h-[550px]">
                        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                            {getVisibleProjects().map((proj, i) => (
                                <motion.div
                                    key={`${proj.title}-${(index + i) % projects.length}`}
                                    custom={direction}
                                    initial={{
                                        opacity: 0,
                                        x: direction > 0 ? 100 : -100,
                                        scale: 0.9
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: direction > 0 ? -100 : 100,
                                        scale: 0.9
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    className="h-full cursor-pointer"
                                    onClick={() => setSelectedProject(proj)}
                                >
                                    <CyberFrame className="h-[550px] px-12 py-10 flex flex-col bg-cyan-950/20 hover:bg-cyan-950/30 transition-all duration-500 active:scale-[0.98]">
                                        {/* Header: Consistent with Training Modules */}
                                        <div className="flex items-center justify-between gap-3 text-cyan-400/60 mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[12px] tracking-[0.2em] uppercase opacity-70">Operation_0{projects.indexOf(proj) + 1}</span>
                                            </div>
                                            <div className="text-[9px] text-cyan-400/80 border border-cyan-400/30 px-2 py-0.5 rounded-sm animate-pulse font-mono uppercase">
                                                {proj.deployStatus || "ACTIVE"}
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col py-4">
                                            {/* Title: Consistent border-b and padding */}
                                            <h4 className="text-xl text-cyan-100 font-black leading-tight border-b border-cyan-400/20 pb-4 mb-4 h-16 flex items-center">
                                                {proj.title}
                                            </h4>

                                            <div className="flex-1 flex flex-col gap-4">
                                                {/* Image Display */}
                                                <div className="relative w-full aspect-video border border-cyan-400/10 overflow-hidden bg-black/40 group-hover:border-cyan-400/30 transition-all duration-500">
                                                    <Image
                                                        src={proj.image}
                                                        alt={proj.title}
                                                        fill
                                                        className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-cyan-400/5 mix-blend-overlay pointer-events-none" />
                                                </div>

                                                {/* Description */}
                                                <p className="text-xs text-cyan-100/60 leading-relaxed line-clamp-3 font-medium">
                                                    {proj.description}
                                                </p>
                                            </div>

                                            {/* Action Links - Consistent bottom layout */}
                                            <div className="grid grid-cols-2 gap-4 py-4 border-t border-cyan-400/10 mt-2">
                                                <div>
                                                    <div className="text-[9px] uppercase font-bold text-cyan-400/40 mb-1 tracking-widest">Archive</div>
                                                    <a
                                                        href={proj.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 hover:text-white transition-colors uppercase tracking-[0.2em]"
                                                    >
                                                        <Github size={14} /> Source
                                                    </a>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[9px] uppercase font-bold text-cyan-400/40 mb-1 tracking-widest">Uplink</div>
                                                    <a
                                                        href={proj.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center justify-end gap-2 text-[10px] font-bold text-cyan-400 hover:text-white transition-colors uppercase tracking-[0.2em]"
                                                    >
                                                        Link <ExternalLink size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </CyberFrame>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Bottom Navigation HUD - Centered beneath the grid */}
                <div className="w-full flex justify-center items-center my-2 opacity-60 hover:opacity-100 transition-all duration-500">
                    <div className="flex items-baseline gap-4 font-black italic">
                        <span className="text-cyan-400 text-3xl">{String(index + 1).padStart(2, '0')}</span>
                        <span className="text-cyan-400/20 text-xl">/</span>
                        <span className="text-cyan-400/40 text-sm tracking-widest">{String(projects.length).padStart(2, '0')}</span>
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
                            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl z-10 pointer-events-auto"
                        >
                            <CyberFrame className="w-full bg-black/95 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                                {/* Close Button */}


                                <div className="flex flex-col gap-8">
                                    <div className="flex items-center justify-between border-b border-cyan-400/20 pb-6">
                                        <div className="flex items-center gap-3 text-cyan-400/60 mb-2">
                                            <span className="text-xs tracking-[0.4em] uppercase font-bold">Project_Data_Packet</span>
                                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                        </div>
                                        <Button
                                            onClick={() => setSelectedProject(null)}
                                            className="w-fit h-fit p-2 text-cyan-400 hover:text-black transition-colors">
                                            Close
                                        </Button>
                                        
                                    </div>
                                    <h3 className="text-4xl md:text-5xl text-white font-black italic uppercase tracking-tighter leading-none">
                                            {selectedProject.title}
                                        </h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        <div className="relative aspect-video w-full border border-cyan-400/20 overflow-hidden bg-black shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                                            <Image
                                                src={selectedProject.image}
                                                alt={selectedProject.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-cyan-400/5 mix-blend-overlay" />
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <div>
                                                <span className="text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase mb-2 block">Technical_Summary</span>
                                                <p className="text-cyan-100/80 text-sm md:text-base leading-relaxed font-medium">
                                                    {selectedProject.description}
                                                </p>
                                            </div>

                                            {selectedProject.stack && (
                                                <div>
                                                    <span className="text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase mb-3 block">Weaponry_Specs</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedProject.stack.map(tag => (
                                                            <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-4 flex gap-6">
                                                <Button href={selectedProject.github} variant="primary" className="flex-1">Source_Code</Button>
                                                <Button href={selectedProject.link} variant="secondary" className="flex-1">Live_Uplink</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-cyan-400/10 flex justify-between items-center text-[12px] tracking-wider text-cyan-400/40 font-mono italic">
                                        <span>INITIATED_CONNECTION: 0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
                                        <span>STATUS: {selectedProject.deployStatus || "ARCHIVED"}</span>
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