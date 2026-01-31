'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Unified CyberFrame Component
 * Used for both Auth Screen (Provider Controlled) and Portfolio Cards (Self-Animated).
 * 
 * @param {Object} props
 * @param {React.RefObject} [props.screenRef] - If provided, animation is controlled externally (Auth Mode).
 * @param {string} [props.accentColor="#22d3ee"] - Main theme color.
 * @param {number|string} [props.glowLevel=30] - Intensity of the outer glow.
 * @param {string} [props.className] - Additional classes.
 */
const CyberFrame = ({ children, screenRef: externalRef, accentColor = "#22d3ee", glowLevel = 30, className = "" }) => {
    const internalRef = useRef(null);
    // Use external ref if provided (Auth context), otherwise use internal ref (Portfolio cards)
    const ref = externalRef || internalRef;
    const accent = accentColor || "#22d3ee";

    useGSAP(() => {
        // Only run self-animation if no external ref is provided (i.e., acting as a standalone card)
        if (!externalRef) {
            gsap.fromTo(ref.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
            );
        }
    }, { scope: ref, dependencies: [externalRef] });

    return (
        <section
            ref={ref}
            className={`relative w-full bg-cyan-950/15 border border-cyan-400/20 backdrop-blur-xl overflow-hidden flex flex-col group/frame ${className}`}
            style={{
                clipPath: 'polygon(0% 15px, 15px 0%, calc(100% - 15px) 0%, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0% calc(100% - 15px))',
                boxShadow: `0 0 ${Number(glowLevel) * 1.5}px ${accent}22, inset 0 0 30px ${accent}11`,
                borderColor: `${accent}33`,
                color: accent,
            }}
        >

            {/* Corner Brackets (Mechanical Accents) */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 opacity-100 transition-all duration-500" style={{ borderColor: accent }} />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 opacity-100 transition-all duration-500" style={{ borderColor: accent }} />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 opacity-100 transition-all duration-500" style={{ borderColor: accent }} />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 opacity-100 transition-all duration-500" style={{ borderColor: accent }} />

            {/* Sub-Corner Accents (Small dots) */}
            <div className="absolute top-6 left-1 w-2 h-1 bg-current opacity-40" />
            <div className="absolute bottom-6 left-1 w-2 h-1 bg-current opacity-40" />
            <div className="absolute top-6 right-1 w-2 h-2 bg-current opacity-40" />
            <div className="absolute bottom-6 right-1 w-2 h-2 bg-current opacity-40" />

            {/* Cyber-Frame Accents - Top Runner */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[2.5px] opacity-60 transition-all duration-500" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }}>
                <div className="absolute left-0 top-0 h-2 w-px bg-current" />
                <div className="absolute right-0 top-0 h-2 w-px bg-current" />
            </div>

            {/* Cyber-Frame Accents - Bottom Runner */}
            <div className="absolute bottom-0 left-[20%] right-[20%] h-[2.5px] opacity-60 transition-all duration-500" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }}>
                <div className="absolute left-0 bottom-0 h-2 w-px bg-current" />
                <div className="absolute right-0 bottom-0 h-2 w-px bg-current" />
            </div>

            {/* Side Brackets */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1.25 h-12 opacity-40 bg-current transition-all group-hover/frame:h-20" />
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1.25 h-12 opacity-40 bg-current transition-all group-hover/frame:h-20" />

            <div className="relative z-10 w-full h-full flex flex-col">
                {children}
            </div>

            {/* Inner Shadow Overlay (on Hover) */}
<div className="absolute inset-0 pointer-events-none opacity-0 group-hover/frame:opacity-100 transition-opacity duration-300 shadow-inner" />
        </section>
    );
};

export default CyberFrame;
