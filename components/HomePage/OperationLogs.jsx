import Screen from "../ui/Screen";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import AnimatedList from "../ui/animation/AnimatedList";
import { useState, useCallback } from "react";


const OperationLogs = ({ projects, index }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemSelect = useCallback((item, index) => {
        console.log('Selected:', item, index);
    }, []);

    return (
        <section
            id="operation"
            className="w-full min-h-screen bg-black pointer-events-none px-16 py-20"
        >
            <div className="w-full flex flex-col">
                {/* Header */}
                <div className="mb-15 shrink-0">
                    <h2 className="text-4xl md:text-6xl text-zinc-300 mb-2">Operation Logs</h2>
                    <p className="text-yellow-500 text-xs my-2 tracking-[0.2em]">Operational History</p>
                    <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
                </div>

                {/* Carousel */}
                <div className="w-full pointer-events-auto">
                    <AnimatedList
                        items={projects}
                        onItemSelect={handleItemSelect}
                        onIndexChange={setActiveIndex}
                        selectedIndex={activeIndex}
                        showGradients
                        gradientColor="black"
                        enableArrowNavigation
                        initialSelectedIndex={0}
                        renderItem={(proj, i, isSelected) => (
                            <Screen
                                key={i}
                                className="h-[420px] w-[85vw] max-w-[900px] transition-all duration-300 ring-2 ring-yellow-500 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                                glowLevel={50}
                            >
                                <div className="text-yellow-500/60 tracking-[0.2em] text-[12px] mb-3">Operation_0{i + 1} : {proj.deployStatus}</div>
                                <div className="flex flex-col md:flex-row h-full gap-6">
                                    {/* Image */}
                                    <div className="relative w-full md:w-[55%] h-[200px] md:h-full border-2 border-yellow-500 overflow-hidden group shrink-0 bg-black/50">
                                        <Image
                                            src={proj.image}
                                            alt={proj.title}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 55vw"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl text-zinc-100 leading-none tracking-widest mb-4">{proj.title}</h3>
                                            <p className="text-zinc-300 text-[14px] leading-relaxed mb-6">{proj.description}</p>
                                        </div>

                                        <div className="flex gap-6">
                                            <a
                                                href={proj.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-300 flex items-center gap-2 font-bold uppercase text-[12px] tracking-widest hover:text-yellow-500 transition-colors"
                                            >
                                                <Github size={18} /> Source_Code
                                            </a>
                                            <a
                                                href={proj.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-300 flex items-center gap-2 font-bold uppercase text-[12px] tracking-widest hover:text-yellow-500 transition-colors"
                                            >
                                                <ExternalLink size={18} /> Live_Uplink
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Screen>
                        )}
                    />
                </div>

                {/* Counter */}
                <div className="w-full flex justify-center mt-8 pointer-events-auto">
                    <div className="text-zinc-500 text-sm tracking-widest">
                        <span className="text-yellow-500 font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                        <span className="mx-2">/</span>
                        <span>{String(projects.length).padStart(2, '0')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default OperationLogs;