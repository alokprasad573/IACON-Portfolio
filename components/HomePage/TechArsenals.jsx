import CyberFrame from "@/components/screens/CyberFrame";

const TechArsenals = ({ techStack, index }) => {
    return (
        <section
            id="arsenals"
            className="w-full min-h-screen px-6 py-12 md:px-12 md:py-20"
        >
            <div className="w-full flex flex-col">
                <div className="mb-12 shrink-0">
                    <h2 className="text-4xl md:text-6xl text-cyan-200 mb-2">Tech Arsenal</h2>
                    <p className="text-cyan-400 text-xs my-2 tracking-[0.2em] ">Weaponary & Upgrades</p>
                    <div className="h-1 w-24 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto">
                    {Object.entries(techStack).map(([cat, skills], i) => (
                        <CyberFrame key={cat} delay={i * 0.1} className="h-[250px] px-12 py-10">
                            <h3 className="text-cyan-100 text-s mb-4 tracking-[0.2em] border-b border-cyan-400/20 pb-2">{cat}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(s => (
                                    <span key={s} className="px-2 py-1 bg-cyan-400/10 text-cyan-300 text-[12px] border border-cyan-400/20 tracking-wider">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </CyberFrame>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechArsenals;