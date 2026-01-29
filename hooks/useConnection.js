'use client';

import { useState, useEffect } from 'react';

export const useConnection = (autoStart, intervalMs) => {
    const [connection, setConnection] = useState(0);

    const connTexts =[
    "Booting Cybertronian Protocols... Stand by for activation.",
    "Initializing uplink to Autobot Command...",
    "Establishing secure channel with IACON MAINFRAME...",
    "Connection stabilized. Signal locked.",
    "You are now interfaced with the IACON Core.",
    "Welcome, warrior, to Sector-7 [IACON].",
    "Biometric resonance required for Autobot identification.",
    "Transmit your bio-frequency to confirm allegiance."
];


    useEffect(() => {
        if (!autoStart) return;

        const interval = setInterval(() => {
            setConnection(prev => {
                const next = prev + 1;
                if (next >= connTexts.length) {
                    clearInterval(interval);
                    return prev;
                }
                return next;
            });
        }, intervalMs);

        return () => clearInterval(interval);
    }, [autoStart, intervalMs]);

    return {
        connection,
        statusText: connTexts[connection],
        isConnectionComplete: connection >= connTexts.length - 1
    };
};
