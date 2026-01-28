'use client';

import React, { useEffect, useRef } from 'react';

const Logs = ({ logs }) => {
    const logEndRef = useRef(null);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div className="bg-black/60 border border-current/10 p-4 h-32 overflow-hidden font-['Orbitron'] font-bold text-xs relative mb-2">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-current shadow-[0_0_10px_currentColor]" />
            {logs.map((log, i) => (
                <div key={i} className="mb-1 opacity-80 uppercase tracking-[0.2em]">{log}</div>
            ))}
            <div ref={logEndRef} />
        </div>
    );
};

export default Logs;