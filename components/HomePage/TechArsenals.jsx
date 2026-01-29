import Layer from "../ui/Layer";
import Screen from "../ui/Screen";




const TechArsenals = ({ techStack }) => {
    return (
        <Layer index={2}>
            <div className="w-full h-fit flex flex-col">
                <div className="mb-8 shrink-0">
                    <h2 className="text-4xl md:text-6xl text-zinc-300 mb-2">Tech Arsenal</h2>
                    <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(techStack).map(([cat, skills]) => (
                        <Screen key={cat} className="h-[250px] ">
                            <h3 className="text-zinc-300 text-s mb-4 tracking-[0.2em] border-b border-yellow-500/20 pb-2">{cat}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(s => (
                                    <span key={s} className="px-2 py-1 bg-yellow-500/10 text-zinc-400 text-[12px] border border-yellow-500/20 tracking-wider">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </Screen>
                    ))}
                </div>
            </div>
        </Layer>
    );
};

export default TechArsenals;