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
      mainClassName="px-3 sm:px-3 md:px-3 bg-[#FFD700] text-[#1A1A1A] overflow-hidden py-0.5 sm:py-0.5 md:py-0.5 justify-center rounded-lg"
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
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* 1. TEXT LAYER: Centered and responsive */}
      <div className='relative z-10 flex h-full items-center justify-start px-5 md:px-20'>
        <header className="flex flex-col gap-7 max-w-4xl">
          <div className='hero-text'>
            <h1>Welcome to my digital hive.</h1>
            <h1>Meet my with co-pilot <span className="text-[#FFD700] font-extrabold">Bumblebee</span></h1>
            <h1 className="flex">{rotatingText()} <span>&nbsp;EveryDay</span></h1>
          </div>
          <Button className="md:w-80 md:h-16 w-60 h-12" id="button" text="About Me" />
        </header>
      </div>

      {/* 2. MODEL LAYER: Anchored to bottom right independently */}
      <figure>
        <div className="hero-3d-layout circle-position">
          <HeroExperience />
        </div>
      </figure>
    </section>
  );
}