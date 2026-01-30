
import Screen from "../ui/Screen";
import { Package } from "lucide-react";


const TraningModules = ({ education, index }) => {
    return (
        <section
            className="sticky top-0 w-full min-h-screen h-fit bg-black border-t border-yellow-500/10 pointer-events-none"
            style={{ zIndex: index }}
        >
            <div className="relative w-full h-full min-h-screen flex items-center justify-center p-4 md:p-12 pointer-events-auto">
                <div className="w-full h-full max-w-[1600px] flex justify-center items-center p-8">
                    <div className="w-full h-fit flex flex-col">
                        <div className="mb-8 shrink-0">
                            <h2 className="text-4xl md:text-6xl text-zinc-300 mb-2">Training Modules</h2>
                            <p className="text-yellow-500  text-xs my-2 tracking-[0.2em] ">Acquisition of Knowledge</p>
                            <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {education.map((edu, index) => (
                                <Screen key={index} className="h-[350px] p-6 flex flex-col">
                                    <div className="flex items-center justify-between gap-3 text-yellow-500/60 mb-4">
                                        <div className="flex items-center gap-3">
                                            <Package size={20} />
                                            <span className="text-[12px] tracking-[0.2em] uppercase opacity-70">Module_0{education.length - index}</span>
                                        </div>
                                        <div className="text-[9px] text-brand-yellow/80 border border-brand-yellow/30 px-2 py-0.5 rounded-sm animate-pulse font-mono">
                                            {edu.type === "college" ? "IN-PROGRESS" : "COMPLETED"}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="text-xl text-zinc-100 font-bold leading-tight border-b border-yellow-500/20 pb-4 mb-4">{edu.institute}</h4>
                                        <p className="text-s text-zinc-300">
                                            {edu.degree}
                                        </p>
                                        <p className="text-xs text-brand-yellow/60 mt-1">
                                            {edu.fieldOfStudy}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-yellow-500/10">
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-brand-yellow/50 mb-1 tracking-widest">Timeline</div>
                                            <div className="text-s font-bold text-zinc-400 uppercase">{edu.startDate} - {edu.endDate}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] uppercase font-bold text-brand-yellow/50 mb-1 tracking-widest">Score</div>
                                            <div className="text-lg text-zinc-100 font-bold">{edu.gpa}</div>
                                        </div>
                                    </div>
                                </Screen>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TraningModules;