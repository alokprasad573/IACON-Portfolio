'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import IaconCmdCtr from '@/components/ui/IaconCmdCtr';
import MainContent from '@/components/Authscreen/MainContent';
import ConnectionStatus from '@/components/Authscreen/ConnectionStatus';
import CyberFrame from '@/components/Authscreen/CyberFrame';
import { useGsap } from '@/hooks/useGsap';
import { useConnection } from '@/hooks/useConnection';

const Main = () => {
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
    const finalContainerRef = useRef(null);
    const hasTransitioned = useRef(false);


    const addLog = useCallback((msg) => setLogs(prev => [...prev, msg]), []);
    const wait = useCallback((ms) => new Promise(resolve => setTimeout(resolve, ms)), []);

    const isVerified = authState === 'VERIFIED';
    const accentColor = isVerified ? '#FFD700' : '#80DEEA';

    const handleClose = useCallback(() => {
        if (!gsap || !screenRef.current) return;
        const tl = gsap.timeline();
        tl.to(contentRef.current, { opacity: 0, duration: 0.3 })
            .to(screenRef.current, { scaleY: 0.002, duration: 0.5, ease: "expo.inOut" })
            .to(screenRef.current, { scaleX: 0, opacity: 0, duration: 0.4, ease: "expo.in" });
    }, [gsap]);

    const props = useMemo(() => ({
        statusText, isVerified, glyphText, actionLabel, logs,
        authState, setAuthState, setStatusText, setActionLabel, setGlyphText,
        addLog, wait, handleClose
    }), [statusText, isVerified, glyphText, actionLabel, logs, authState, addLog, wait, handleClose])

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

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
            {/* Background Layer - IaconCmdCtr */}
            <div className="absolute inset-0 z-0">
                <IaconCmdCtr />
            </div>

            {/* Foreground Layer - CyberFrame */}
            <div className="relative z-10 w-full max-w-4xl p-4">
                <CyberFrame
                    screenRef={screenRef}
                    accentColor={accentColor}
                    glowLevel={showFinalContent ? "50" : "20"}
                >
                    <div ref={contentRef} className="p-8 opacity-0 will-change-transform">
                        {!showFinalContent ? (
                            <ConnectionStatus
                                authState={authState}
                                progressBarRef={progressBarRef}
                                connectionStatus={connectionLabel}
                            />
                        ) : (
                            <div className="w-full h-full">
                                <MainContent {...props} />

                                {isVerified && (
                                    <div className="mt-6 border-t border-white/10 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                                        <div className="flex gap-4 text-[10px] text-cyan-400/70">
                                            <span>ENERZONE: 98%</span>
                                            <span>T-COG: ONLINE</span>
                                            <span>SIGNAL: ENCRYPTED</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CyberFrame>
            </div>
        </div>
    );
};

export default Main;