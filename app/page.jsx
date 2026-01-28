'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Zap, Cpu, Unlock, Database, Activity, Network } from 'lucide-react';



import { runAuthSequence, redirectToHome } from '@/lib/scripts';
import CyberBackground from '@/components/ui/CyberBackground';
import Scanner from '@/components/ui/Scanner';
import DetailPanel from '@/components/ui/DetailPanel';

const Main = () => {
    const [authState, setAuthState] = useState('IDLE'); // IDLE, SCANNING, VERIFIED
    const [statusText, setStatusText] = useState('AWAITING_UPLINK...');
    const [actionLabel, setActionLabel] = useState('Scanning Cybertronian Frequency');
    const [glyphText, setGlyphText] = useState('᚛ᚃᚑᚏᚈᚓ᚜');
    const [logs, setLogs] = useState([
        ' INITIALIZING COMMAND INTERFACE...',
        ' STANDBY FOR SIGNAL HANDSHAKE...'
    ]);


    const logEndRef = useRef(null);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const addLog = (msg) => {
        setLogs(prev => [...prev, msg]);
    };

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const isVerified = authState === 'VERIFIED';
    const accentColor = isVerified ? '#FFD700' : '#80DEEA';
    const glowShadow = isVerified ? '0 0 40px #FFD700' : '0 0 40px #80DEEA';

    return (
        <>
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background Component */}
                <CyberBackground isVerified={isVerified}/>

                {/* Auth Screen */}
                <section
                    className="relative w-full max-w-[550px] p-8 bg-[#030712]/95 border transition-all duration-1000 ease-in-out backdrop-blur-sm"
                    style={{
                        clipPath: 'polygon(0% 20px, 20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px))',
                        boxShadow: glowShadow,
                        borderColor: accentColor,
                        color: accentColor
                    }}>

                    {/* Decorative Decals */}
                    <div className="absolute top-0 left-1/4 w-1/2 h-[2px] opacity-50" style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
                    <div className="absolute bottom-0 left-1/3 w-1/3 h-[2px] opacity-50" style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />

                    {/* Header Section */}
                    <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                        <div>
                            <h1 className="text-xs font-black tracking-[0.6em] uppercase opacity-60 mb-1 flex items-center gap-2">
                                Iacon Mainframe
                            </h1>
                            <p className="text-xs font-bold tracking-widest italic animate-pulse">
                                {statusText}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-xs opacity-80 border border-current px-2 py-0.5 inline-flex items-center gap-2">
                                <Network size={10} /> SECTOR-7 | BASE-ALPHA-7
                            </div>
                        </div>
                    </div>

                    {/* Scanner Core */}
                    <Scanner isVerified={isVerified} authState={authState} glyphText={glyphText} />

                    {/* Action Status */}
                    <div className="text-center mb-6">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 mb-4" />
                        <p className="text-xs tracking-[0.2em] uppercase font-black">
                            {actionLabel}
                        </p>
                    </div>

                    {/* Details Panel */}
                    <DetailPanel isVerified={isVerified} />

                    {/* Logs */}
                    <div className="bg-black/60 border border-current/10 p-4 h-24 overflow-hidden font-['Orbitron'] font-bold text-xs relative mb-6">
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-current shadow-[0_0_10px_currentColor]" />
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1 opacity-80 uppercase tracking-tighter">{log}</div>
                        ))}
                        <div ref={logEndRef} />
                    </div>

                    {/* Footer Buttons */}
                    {authState !== 'VERIFIED' ? (
                        <button
                            onClick={() => runAuthSequence(setAuthState, setStatusText, setActionLabel, setGlyphText, addLog, wait)}
                            disabled={authState === 'SCANNING'}
                            className={`w-full py-4 text-xs tracking-[0.4em] uppercase border border-current bg-current/5 transition-opacity duration-300 ${authState === 'SCANNING' ? 'opacity-0' : 'opacity-100'}`}
                            style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
                        >
                            Initiate Authorization
                        </button>
                    ) : (
                        <button
                            onClick={() => redirectToHome(addLog)}
                            className="w-full py-4 text-xs font-black tracking-[0.4em] uppercase border border-yellow-400 bg-yellow-400/10 text-yellow-400 animate-[fadeIn_0.5s_ease-out]"
                            style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
                        >
                            See Detail
                        </button>
                    )}

                </section>
            </div>
        </>
    );
};

export default Main;