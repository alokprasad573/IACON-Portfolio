'use client'

import RotatingText from "../components/ui/RotatingText";

const textlines = [
    "Learning",
    "Building",
    "Growing"
]

const rotatingText = () => {
    return (
        <RotatingText
            texts={textlines}
            mainClassName="px-3 sm:px-3 md:px-3 bg-[#EADAFF] text-[#5a4a75] overflow-hidden py-2 sm:py-2 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
        />
    )
};

export default function Hero() {
    return (
        <>
            <section id="hero" className="relative overflow-hidden">
                <div className='relative z-10 xl:mt-20 mt-32 md:h-dvh h-[80vh] flex xl:items-center items-start justify-center'>
                    {/*LEFT HERO Content */}
                    <header className="flex flex-col justify-center md:w-full w-full md:px-20 px-5">
                        <div className="flex flex-col gap-7">
                            <div className='flex flex-col justify-center md:text-[60px] text-[30px] font-semibold relative z-10 pointer-events-none'>
                                <h1>Hi, I'm Alok</h1>
                                <h1>Certified in Data Science & GenAI</h1>
                                <h1 className="flex">{rotatingText()} <span>&nbsp;EveryDay</span></h1>
                            </div>
                        </div>
                    </header>
                </div>
            </section>
        </>
    );
}