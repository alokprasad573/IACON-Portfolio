import CyberFrame from "@/components/screens/CyberFrame";
import { Package } from "lucide-react";


const TraningModules = ({ education, index }) => {
    return (
        <section
            id="modules"
            className="w-full min-h-screen px-6 py-12 md:px-12 md:py-20"
        >
            <div className="w-full  flex flex-col">
                <div className="mb-12 shrink-0">
                    <h2 className="text-4xl md:text-6xl text-cyan-200 mb-2">Combat Training Modules</h2>
                    <p className="text-cyan-400 text-xs my-2 tracking-[0.2em] ">Iacon Archive Uplink</p>
                    <div className="h-1 w-24 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pointer-events-auto">
                    {education.map((edu, index) => (
                        <CyberFrame key={index} className="h-[350px] px-12 py-10 flex flex-col">
                            <div className="flex items-center justify-between gap-3 text-cyan-400/60">
                                <div className="flex items-center gap-3">
                                    <Package size={20} />
                                    <span className="text-[12px] tracking-[0.2em] uppercase opacity-70">Module_0{education.length - index}</span>
                                </div>
                                <div className="text-[9px] text-cyan-400/80 border border-cyan-400/30 px-2 py-0.5 rounded-sm animate-pulse font-mono">
                                    {edu.type === "college" ? "IN-PROGRESS" : "COMPLETED"}
                                </div>
                            </div>

                            <div className="flex-1 py-2">
                                <h4 className="text-xl text-cyan-100 font-bold leading-tight border-b border-cyan-400/20 py-2">{edu.institute}</h4>
                                <div className="border-b border-cyan-400/10 py-2">
                                    <p className="text-s text-cyan-200">
                                        {edu.degree}
                                    </p>
                                    <p className="text-xs text-cyan-400/60 mt-1">
                                        {edu.fieldOfStudy}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 py-2">
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-cyan-400/50 mb-1 tracking-widest">Timeline</div>
                                        <div className="text-s font-bold text-cyan-300 uppercase">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] uppercase font-bold text-cyan-400/50 mb-1 tracking-widest">Score</div>
                                        <div className="text-lg text-cyan-100 font-bold">{edu.gpa}</div>
                                    </div>
                                </div>
                            </div>

                        </CyberFrame>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TraningModules;