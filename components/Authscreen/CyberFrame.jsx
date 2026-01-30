'use client';

import React from 'react';

const CyberFrame = ({ children, screenRef, accentColor, glowLevel = '30' }) => {
    return (
        <section
            ref={screenRef}
            className="relative mx-auto w-full max-w-[550px] bg-[#030712]/95 border backdrop-blur-md overflow-hidden"
            style={{
                clipPath: 'polygon(0% 20px, 20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px))',
                boxShadow: `0 0 ${glowLevel}px ${accentColor}33`,
                borderColor: accentColor,
                color: accentColor,
            }}
        >
            {/* Cyber-Frame Accents */}
            <div className="absolute top-0 left-[10%] right-[10%] h-[2px] opacity-100" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}>
                <div className="absolute left-0 top-0 h-2 w-px bg-current" />
                <div className="absolute right-0 top-0 h-2 w-px bg-current" />
            </div>

            <div className="absolute bottom-0 left-[10%] right-[10%] h-[2px] opacity-100" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}>
                <div className="absolute left-0 bottom-0 h-2 w-px bg-current" />
                <div className="absolute right-0 bottom-0 h-2 w-px bg-current" />
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[2px] h-8 opacity-40 bg-current" />
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[2px] h-8 opacity-40 bg-current" />

           <div className="relative z-10 w-full">
                {children}
           </div>
        </section>
    );
};

export default CyberFrame;
