'use client';

import React, { createContext, useContext, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useGsap } from '@/hooks/useGsap';
import { useConnection } from '@/hooks/useConnection';

const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
    // 1. Hooks & State
    const { gsapLoaded, gsap } = useGsap();
    const { connection, statusText: connectionLabel } = useConnection(true, 2000);

    const [authState, setAuthState] = useState('IDLE');
    const [statusText, setStatusText] = useState('AWAITING_UPLINK...');
    const [actionLabel, setActionLabel] = useState('Scanning Cybertronian Frequency');
    const [glyphText, setGlyphText] = useState('᚛ᚃᚑᚏᚈᚓ᚜');
    const [logs, setLogs] = useState([' COMMAND INTERFACE INITIALIZED', ' STANDBY FOR SIGNAL HANDSHAKE...', 'AUTHORIZATION REQUIRED — INITIATE PROTOCOL']);
    const [showFinalContent, setShowFinalContent] = useState(false);

    // Refs for animations
    const progressBarRef = useRef(null);
    const screenRef = useRef(null);
    const contentRef = useRef(null);
    const hasTransitioned = useRef(false);

    const addLog = useCallback((msg) => setLogs(prev => [...prev, msg]), []);
    const wait = useCallback((ms) => new Promise(resolve => setTimeout(resolve, ms)), []);

    const isVerified = authState === 'VERIFIED';
    const accentColor = isVerified ? '#22d3ee' : '#0891b2'; // Cyan-400 : Cyan-600

    const handleClose = useCallback(() => {
        if (!gsap || !screenRef.current) return;
        const tl = gsap.timeline();
        tl.to(contentRef.current, { opacity: 0, duration: 0.3 })
            .to(screenRef.current, { scaleY: 0.002, duration: 0.5, ease: "expo.inOut" })
            .to(screenRef.current, { scaleX: 0, opacity: 0, duration: 0.4, ease: "expo.in" });
    }, [gsap]);

    // 2. Animations
    // Opening Animation
    useEffect(() => {
        if (!gsapLoaded || !screenRef.current) return;
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.set(screenRef.current, { scaleX: 0, scaleY: 0.002, opacity: 0, force3D: true })
            .to(screenRef.current, { opacity: 1, scaleX: 1, duration: 0.8, ease: "expo.inOut" })
            .to(screenRef.current, { scaleY: 1, duration: 0.7 })
            .to(contentRef.current, { opacity: 1, duration: 0.5 });
    }, [gsapLoaded]);

    // Progress Bar Animation
    useEffect(() => {
        if (!gsapLoaded || !progressBarRef.current) return;
        const progressValues = ["0%", "20%", "40%", "60%", "80%", "100%"];
        gsap.to(progressBarRef.current, {
            width: progressValues[connection] || '100%',
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: "auto"
        });
    }, [connection, gsapLoaded]);

    useEffect(() => {
        // Only trigger when connection is 7 (Fully Verified)
        if (connection === 7 && gsapLoaded && !hasTransitioned.current) {
            hasTransitioned.current = true; // Prevents re-triggering

            const tl = gsap.timeline();

            // PHASE 1: Hide current statuses
            tl.to(contentRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.4,
                ease: "power2.in"
            })

                // PHASE 2: Collapse the frame (Visual "processing" effect)
                .to(screenRef.current, {
                    scaleY: 0.002,
                    duration: 0.5,
                    ease: "expo.inOut",
                    onComplete: () => {
                        setShowFinalContent(true);
                    }
                })

                .to(screenRef.current, {
                    scaleY: 1,
                    duration: 0.6,
                    ease: "expo.out",
                    delay: 0.2
                })
                .fromTo(contentRef.current,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
                );
        }
    }, [connection, gsapLoaded]);

    const value = useMemo(() => ({
        // State
        authState, setAuthState,
        statusText, setStatusText,
        actionLabel, setActionLabel,
        glyphText, setGlyphText,
        logs, setLogs,
        showFinalContent, setShowFinalContent,
        connectionLabel,
        accentColor,
        isVerified,

        // Refs
        progressBarRef,
        screenRef,
        contentRef,

        // Actions
        addLog,
        wait,
        handleClose
    }), [
        authState, statusText, actionLabel, glyphText, logs, showFinalContent,
        connectionLabel, accentColor, isVerified, addLog, wait, handleClose
    ]);

    return (
        <SystemContext.Provider value={value}>
            {children}
        </SystemContext.Provider>
    );
};

export const useSystem = () => {
    const context = useContext(SystemContext);
    if (!context) {
        throw new Error('useSystem must be used within a SystemProvider');
    }
    return context;
};
