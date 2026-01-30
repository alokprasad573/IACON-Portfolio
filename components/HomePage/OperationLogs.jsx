
import Screen from "../ui/Screen";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import AnimatedList from "../ui/animation/AnimatedList";




const OperationLogs = ({ projects, index }) => {
    return (
        <section
            id="operation"
            className="sticky top-40 w-full h-fit bg-black border-t border-yellow-500/10 pointer-events-none"
            style={{ zIndex: index }}
        >
            <div className="relative w-full h-fit min-h-screen flex flex-col items-center justify-center px-4 md:px-12 pointer-events-auto">
                <div className="w-full h-full max-w-[1600px] flex justify-around items-center p-8">
                    <div className="w-full h-fit flex flex-col">
                        <div className="mb-8 shrink-0">
                            <h2 className="text-4xl md:text-6xl text-zinc-300 mb-2">Operation Logs</h2>
                            <p className="text-yellow-500  text-xs my-2 tracking-[0.2em] ">Operational History</p>
                            <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
                        </div>
                        <div className="w-full p-4">
                            <AnimatedList
                                items={projects}
                                onItemSelect={(item, index) => console.log(item, index)}
                                showGradients
                                gradientColor="black"
                                enableArrowNavigation
                                renderItem={(proj, i, isSelected) => (
                                    <Screen
                                        key={i}
                                        className={`h-[400px] w-[60vw]transition-all duration-300 ${isSelected ? 'ring-2 ring-yellow-500 shadow-[0_0_20px_rgba(255,215,0,0.3)]' : ''}`}
                                        glowLevel={isSelected ? 50 : 30}
                                    >
                                        <div className="text-yellow-500/60 text-[12px] mb-2">Operation_0{i + 1}</div>
                                        <div className="flex flex-row h-full gap-6">
                                            <div className="relative w-fit aspect-video border-2 border-yellow-500 overflow-hidden group">
                                                <Image
                                                    src={proj.image}
                                                    alt={proj.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="50vw"
                                                />
                                                <div className="absolute bottom-0 left-0 p-2 bg-yellow-500 text-black text-[12px] font-black">
                                                    Operational_Status : {proj.deployStatus}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl text-zinc-100 leading-none tracking-widest mb-3">{proj.title}</h3>
                                                <p className="text-zinc-300 text-[14px] leading-relaxed mb-4 min-h-[40px]">{proj.description}</p>
                                                <div className="flex gap-4">
                                                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-zinc-300 flex items-center gap-2 font-bold uppercase text-[12px] tracking-widest hover:text-brand-yellow transition-colors">
                                                        <Github size={14} /> Source
                                                    </a>
                                                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-zinc-300 flex items-center gap-2 font-bold uppercase text-[12px] tracking-widest hover:text-brand-yellow transition-colors">
                                                        <ExternalLink size={14} /> Uplink
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Screen>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <section className="absolute bottom-6 text-center">
                    <div className="flex flex-col gap-3 items-center justify-center font-black uppercase text-[10px] tracking-[0.5em] text-gray-500">
                        <div className="flex gap-3">
                            <a href="https://github.com/alokprasad573" className="hover:text-yellow-500">Archive</a>
                            <a href="https://www.linkedin.com/in/alok-prasad-474962289/" className="hover:text-yellow-500">SparkConnect</a>
                            <a href="#" className="hover:text-yellow-500">Email</a>
                        </div>
                        <p className="text-yellow-500/20 text-[12px] tracking-[0.4em] uppercase">End Of Transmission // ©2027</p>
                    </div>
                </section>
            </div>

        </section>
    );
};


export default OperationLogs;