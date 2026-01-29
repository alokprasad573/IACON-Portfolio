import Layer from "../ui/Layer";
import Screen from "../ui/Screen";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";




const MissionLogs = ({ projects }) => {
    return (
        <Layer index={3}>
            <div className="w-full h-fit flex flex-col">
                <div className="mb-8 shrink-0">
                    <h2 className="text-4xl md:text-6xl text-zinc-300 mb-2">Mission Logs</h2>
                    <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((proj, i) => (
                        <Screen key={i} className="h-fit">
                            <div className="flex flex-col h-full gap-6">
                                <div className="relative w-full aspect-video -z-20 border-2 border-yellow-500 overflow-hidden group">
                                    <Image
                                        src={proj.image}
                                        alt={proj.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div>
                                    <div className="text-yellow-500/60 text-[12px] mb-2">Mission_0{i + 1}</div>
                                    <h3 className="text-2xl text-zinc-100 leading-none mb-3">{proj.title}</h3>
                                    <p className="text-zinc-300 text-[14px] leading-relaxed mb-4 min-h-[40px]">{proj.description}</p>
                                    <div className="flex gap-4">
                                        <a href={proj.github} className="text-zinc-300 flex items-center gap-2 font-bold uppercase text-[12px] tracking-widest hover:text-brand-yellow transition-colors">
                                            <Github size={14} /> Source
                                        </a>
                                        <a href={proj.link} className="text-zinc-300 flex items-center gap-2 font-bold uppercase text-[12px] tracking-widest hover:text-brand-yellow transition-colors">
                                            <ExternalLink size={14} /> Uplink
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Screen>
                    ))}
                </div>
            </div>
        </Layer>
    );
};


export default MissionLogs;