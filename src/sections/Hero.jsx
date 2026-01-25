import React from "react";
import { words } from "../../constants/index";
import { Button } from "../components/Button";

export const Hero = () => {
    return (
        <section id="hero" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 z--10">
                <img src="/images/bg.png" alt="background" />
            </div>

            <div className="hero-layout">
                <header className="flex flex-col justify-center md:w-full w-1/2 md:px-20 px-5">
                    <div classname=" flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>Hi, I'm Alok
                                <span className="slide">
                                    <span className="wrapper">
                                        {words.map((word) => (
                                            <span key={word.text} className="flex items-center md:gap-3 gap-1 pb-2">
                                                <img src={word.imgPath} alt={word.text} className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50" />
                                                <span className="text-white-50">{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>

                            <h1>Learning, Building, and Growing Every Day</h1>
                            <h1>Certified Data Science & Gen AI Engineer</h1>
                            <h1>Learning Web Development & AI</h1>

                        </div>
                        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">Passionate about using technology to solve real-world problems and create innovative solutions.</p>
                        <Button className="md:w-80 md:h-16 w-60 h-12" id="button" text="See my Work" />
                    </div>
                </header>
            </div>
        </section>
    );
};