'use client';
import React from 'react';

import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const SystemStatus = () => {
    useGSAP(() => {
        gsap.fromTo('.system-animate', {
            opacity: 0,
            y: 50,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1.5, // Delay to appear after main content
            ease: 'power2.inOut',
        })
    }, [])

    return (
        <div className="fixed bottom-8 left-8 z-50 flex items-center cursor-default select-none pointer-events-none system-animate">
            <div className="flex gap-1 h-4 items-end">
                <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse shadow-[2_2_40px_#22c55e]"></div>
                <div className="w-1 bg-[#FFD700] animate-[bounce_1s_infinite]"></div>
                <div className="w-1 bg-[#FFD700] animate-[bounce_0.6s_infinite]"></div>
                <div className="w-1 bg-[#FFD700] animate-[bounce_0.8s_infinite]"></div>
            </div>
            <span className="font-orbitron text-zinc-400 tracking-[0.2em] text-2xl uppercase">System: Nominal</span>
        </div>
    );
};

export default SystemStatus;
