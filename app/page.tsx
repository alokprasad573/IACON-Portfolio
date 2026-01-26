'use client'

import RotatingText from "@/components/ui/RotatingText";
import Button from "@/components/Button";
import HeroExperience from "@/components/HeroModels/HeroExperience";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const textlines = [
  "Learning",
  "Building",
  "Growing"
]

const rotatingText = () => {
  return (
    <RotatingText
      texts={textlines}
      mainClassName="px-3 sm:px-3 md:px-3 bg-[#FFD700] text-[#1A1A1A] overflow-hidden py-2 sm:py-2 md:py-2 justify-center rounded-lg"
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

export default function Home() {

  useGSAP(() => {
    gsap.fromTo('.hero-text h1', {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: 'power2.inOut',
    })
  })


  return (
    <>
      <section id="hero" className="relative overflow-hidden gap-7">
        <div className='relative z-10 xl:mt-10 mt-20 md:h-dvh h-[80vh] flex xl:items-center items-start justify-center'>
          {/*LEFT HERO Content */}
          <header className="flex flex-col justify-center md:w-full w-full md:px-20 px-5 gap-7">
            <div className="flex flex-col gap-7">
              <div className='hero-text'>
                <h1>Hi, I&apos;m <span className="text-[#FFD700] font-extrabold">Alok</span></h1>
                <h1>Welcome to My Portfolio</h1>
                <h1 className="flex">{rotatingText()} <span>&nbsp;EveryDay</span></h1>
              </div>
            </div>
            <Button className="md:w-80 md:h-16 w-60 h-12" id="button" text="About Me" />
          </header>

          {/*RIGHT HERO Content */}
          <figure>
            <div className="hero-3d-layout">
              <HeroExperience />
            </div>
          </figure>
        </div>
      </section>
    </>
  );
}
