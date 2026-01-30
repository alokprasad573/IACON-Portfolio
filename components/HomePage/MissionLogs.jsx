
import Screen from "../ui/Screen";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";




const MissionLogs = ({ projects, index }) => {
    return (
        <section
            className="sticky top-40 w-full h-fit bg-black border-t border-yellow-500/10 pointer-events-none"
            style={{ zIndex: index }}
        >
            <div className="relative w-full h-fit min-h-screen flex flex-col items-center justify-center px-4 md:px-12 pointer-events-auto">
                <div className="w-full h-full max-w-[1600px] flex justify-around items-center p-8">
                    <div className="w-full h-fit flex flex-col">
                        <div className="mb-8 shrink-0">
                            <h2 className="text-4xl md:text-6xl text-zinc-300 mb-2">Mission Logs</h2>
                            <p className="text-yellow-500  text-xs my-2 tracking-[0.2em] ">Operational History</p>
                            <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 p-2 overflow-y-scroll max-h-[60vh]">
                            {projects.map((proj, i) => (
                                <Screen key={i} className="h-[450px]">
                                    <div className="text-yellow-500/60 text-[12px] mb-2">Mission_0{i + 1}</div>
                                    <div className="flex flex-row h-full gap-6">
                                        <div className="relative w-full aspect-video -z-20 border-2 border-yellow-500 overflow-hidden group">
                                            <Image
                                                src={proj.image}
                                                alt={proj.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            <div className="absolute bottom-0 left-0 p-2 bg-yellow-500 text-black text-[12px] font-black">
                                                Operational_Status : {proj.deployStatus}
                                            </div>
                                        </div>
                                        <div>

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
                </div>
                <footer className="relative -bottom-5 text-center">
                    <div className="flex flex-col gap-3 items-center justify-center font-black uppercase text-[10px] tracking-[0.5em] text-gray-500">
                                <div className="flex gap-8">
                                <a href="#" className="hover:text-yellow-500">GitHub</a>
                                <a href="#" className="hover:text-yellow-500">LinkedIn</a>
                                <a href="#" className="hover:text-yellow-500">Email</a>
                                </div>
                                <p className="text-yellow-500/20 text-[12px] tracking-[1em] uppercase">EndOfTransmission // ©2027</p>
                            </div>
                           
                </footer>
            </div>

        </section>
    );
};


export default MissionLogs;