'use client';

import { useState, useEffect } from 'react';

export const useConnection = (autoStart = true, intervalMs = 3000) => {
    const [connection, setConnection] = useState(0);

    const connTexts = [
        "Booting Protocols Running please wait...",
        "Initializing Connection...",
        "Connecting with MAINFRAME ....",
        "Connection established.",
        "You are connected with IACON MAINFRAME.",
        "Welcome to Sector-7 [ IACON ]",
        "Biometric frequency required for identification.",
        "Enter your bio frequency for identification"
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
