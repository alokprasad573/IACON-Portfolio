'use client';

import React, { useState, useEffect, useRef } from 'react';

import CyberBackground from '@/components/ui/CyberBackground';
import MainContent from '@/components/ui/MainContent';
import ConnectionStatus from '@/components/Authscreen/ConnectionStatus';
import CyberFrame from '@/components/Authscreen/CyberFrame';

import { useGsap } from '@/hooks/useGsap';
import { useConnection } from '@/hooks/useConnection';


const Main = () => {
    // 1. Hooks & State
    const { gsapLoaded, gsap } = useGsap();
    const { connection, statusText: connectionLabel } = useConnection(true, 3000);

    const [authState, setAuthState] = useState('IDLE');
    const [statusText, setStatusText] = useState('AWAITING_UPLINK...');
    const [actionLabel, setActionLabel] = useState('Scanning Cybertronian Frequency');
    const [glyphText, setGlyphText] = useState('᚛ᚃᚑᚏᚈᚓ᚜');
    const [logs, setLogs] = useState([' INITIALIZING COMMAND INTERFACE...', ' STANDBY FOR SIGNAL HANDSHAKE...']);
    const [showFinalContent, setShowFinalContent] = useState(false);

    // Refs for animations
    const progressBarRef = useRef(null);
    const screenRef = useRef(null);
    const contentRef = useRef(null);
    const finalContainerRef = useRef(null);
    const hasClosed = useRef(false);

    // 2. Animations
    // Opening Animation
    useEffect(() => {
        if (!gsapLoaded || !screenRef.current) return;
        const tl = gsap.timeline();
        tl.set(screenRef.current, { scaleX: 0, scaleY: 0.002, opacity: 0 })
            .to(screenRef.current, { opacity: 1, scaleX: 1, duration: 0.8, ease: "expo.inOut" })
            .to(screenRef.current, { scaleY: 1, duration: 0.7, ease: "expo.out" })
            .to(contentRef.current, { opacity: 1, duration: 0.5 });
    }, [gsapLoaded, gsap]);

    // Progress Bar Animation
    useEffect(() => {
        if (!gsapLoaded || !progressBarRef.current) return;
        const progressValues = ["0%", "20%", "40%", "60%", "80%", "100%", "100%", "100%"];
        gsap.to(progressBarRef.current, {
            width: progressValues[connection] || '100%',
            duration: 1,
            ease: "power2.inOut"
        });
    }, [connection, gsapLoaded, gsap]);

    // Auto-Closing & Transition to MainContent
    useEffect(() => {
        if (connection === 7 && gsapLoaded && !hasClosed.current) {
            hasClosed.current = true;
            const tl = gsap.timeline({ delay: 1.5 });
            tl.to(contentRef.current, { opacity: 0, duration: 0.4 })
                .to(screenRef.current, { scaleY: 0.002, duration: 0.5, ease: "expo.inOut" })
                .to(screenRef.current, { scaleX: 0, opacity: 0, duration: 0.4, ease: "expo.in" })
                .add(() => setShowFinalContent(true), "+=0.3");
        }
    }, [connection, gsapLoaded, gsap]);

    // Entrance animation for MainContent
    useEffect(() => {
        if (showFinalContent && gsapLoaded && finalContainerRef.current) {
            gsap.fromTo(finalContainerRef.current,
                { scale: 0.2, opacity: 0, filter: "blur(20px)" },
                { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2, ease: "power3.inOut", clearProps: "all" }
            );
        }
    }, [showFinalContent, gsapLoaded, gsap]);

    // 3. Logic & Helpers
    const handleClose = () => {
        if (!gsap || !screenRef.current) return;
        const tl = gsap.timeline();
        tl.to(contentRef.current, { opacity: 0, duration: 0.3 })
            .to(screenRef.current, { scaleY: 0.002, duration: 0.5, ease: "expo.inOut" })
            .to(screenRef.current, { scaleX: 0, opacity: 0, duration: 0.4, ease: "expo.in" });
    };

    const addLog = (msg) => setLogs(prev => [...prev, msg]);
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const isVerified = authState === 'VERIFIED';
    const accentColor = isVerified ? '#FFD700' : '#80DEEA';

    const props = {
        statusText, isVerified, glyphText, actionLabel, logs,
        authState, setAuthState, setStatusText, setActionLabel, setGlyphText,
        addLog, wait, contentRef, handleClose
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <CyberBackground isVerified={isVerified} />

            {!showFinalContent ? (
                <CyberFrame screenRef={screenRef} accentColor={accentColor}>
                    <div ref={contentRef} className="p-8 flex flex-col gap-6 opacity-0">
                        <ConnectionStatus
                            authState={authState}
                            progressBarRef={progressBarRef}
                            connectionStatus={connectionLabel}
                        />
                    </div>
                </CyberFrame>
            ) : (
                <div ref={finalContainerRef} className="w-full h-full flex items-center justify-center p-4">
                    <CyberFrame screenRef={screenRef} accentColor={accentColor} glowLevel="50">
                        <div className="p-8">

                            {/* "Right Content" */}
                            <MainContent props={props} /> 

                            {/* {"Left Content appear isVerified === VERIFIED"}
                            {isVerified && (
                                <div>
                                    <HeroExperience />
                                    {/* Autobots Telemtry Like:- Enerzone level, CPU,T-Cog status, memory, tepm, System Stabilty
                                </div>
                            )} */}

                        </div>
                    </CyberFrame>
                </div>
            )}
        </div>
    );
};

export default Main;