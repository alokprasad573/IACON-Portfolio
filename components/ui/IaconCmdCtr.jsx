'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';

/**
 * CyberFrame Component
 * Refactored to support GSAP screen-ref animations (shutter open/close)
 */
const CyberFrame = ({ children, screenRef, accentColor = "#a5f3fc", glowLevel = '20', className = "" }) => {
    return (
        <section
            ref={screenRef}
            className={`relative bg-[#030712]/95 border backdrop-blur-md overflow-hidden opacity-0 ${className}`}
            style={{
                clipPath: 'polygon(0% 15px, 15px 0%, calc(100% - 15px) 0%, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0% calc(100% - 15px))',
                boxShadow: `0 0 ${glowLevel}px ${accentColor}33`,
                borderColor: `${accentColor}66`,
                color: accentColor,
                transformOrigin: 'center center'
            }}
        >
            {/* Cyber-Frame Accents */}
            <div className="absolute top-0 left-[10%] right-[10%] h-px opacity-100" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}>
                <div className="absolute left-0 top-0 h-2 w-px bg-current" />
                <div className="absolute right-0 top-0 h-2 w-px bg-current" />
            </div>
            <div className="absolute bottom-0 left-[10%] right-[10%] h-px opacity-100" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}>
                <div className="absolute left-0 bottom-0 h-2 w-px bg-current" />
                <div className="absolute right-0 bottom-0 h-2 w-px bg-current" />
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[2px] h-8 opacity-40 bg-current" />
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[2px] h-8 opacity-40 bg-current" />

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </section>
    );
};

const App = () => {
    // --- UI Refs for GSAP ---
    const mountRef = useRef(null);
    const headerRef = useRef(null);
    const clockRef = useRef(null);
    const sparkChamberRef = useRef(null);
    const rightTacticalRef = useRef(null);
    const bottomRef = useRef(null);
    const nodeMapperRef = useRef(null);
    const neuralMiniRef = useRef(null);

    const [stats, setStats] = useState({ shield: 100, energon: 94, time: "00:00:00", signal: 0, nodeIdx: 0, syncRate: 85, hexCode: "00", streamBuffer: "0000000000000000" });
    const [sineOffset, setSineOffset] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    // 1. Three.js Background Logic
    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x010409);

        scene.fog = new THREE.FogExp2(0x010409, 0.0004);

        const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 10000);
        camera.position.set(1200, 600, 1200);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const COLORS = { cyanMain: 0xa5f3fc, cyanDeep: 0x0891b2, grid: 0x0e7490 };

        const light1 = new THREE.PointLight(COLORS.cyanMain, 2.5, 3000);
        light1.position.set(500, 500, 500);
        scene.add(light1);
        scene.add(new THREE.AmbientLight(COLORS.cyanMain, 0.15));

        const cybertronGroup = new THREE.Group();
        scene.add(cybertronGroup);

        const corePlanet = new THREE.Mesh(
            new THREE.IcosahedronGeometry(250, 4),
            new THREE.MeshPhongMaterial({
                color: 0x083344,
                emissive: COLORS.cyanDeep,
                emissiveIntensity: 0.5,
                wireframe: true,
                transparent: true,
                opacity: 0.6
            })
        );
        cybertronGroup.add(corePlanet);

        const createRing = (radius, color, speed) => {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 1.2, 2, 120), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 }));
            ring.rotation.x = Math.PI / 2;
            cybertronGroup.add(ring);
            return { ring, speed };
        };
        const rings = [createRing(300, COLORS.cyanMain, 0.008), createRing(340, COLORS.cyanDeep, -0.004), createRing(500, COLORS.cyanDeep, 0.002)];

        const streamCurves = [];
        for (let i = 0; i < 40; i++) {
            const pts = [
                new THREE.Vector3((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000),
                new THREE.Vector3((Math.random() - 0.5) * 500, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 500),
                new THREE.Vector3((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000)
            ];
            const curve = new THREE.CatmullRomCurve3(pts);
            const bit = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), new THREE.MeshBasicMaterial({ color: COLORS.cyanMain }));
            scene.add(bit);
            streamCurves.push({ curve, bit, progress: Math.random() });
        }

        const grid = new THREE.GridHelper(8000, 80, COLORS.grid, 0x010409);
        grid.position.y = -1000;
        grid.material.opacity = 0.3;
        grid.material.transparent = true;
        scene.add(grid);

        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (e) => { mouseX = (e.clientX - width / 2) * 0.08; mouseY = (e.clientY - height / 2) * 0.08; };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);
            camera.position.x += (mouseX * 4 + 1200 - camera.position.x) * 0.02;
            camera.position.y += (-mouseY * 4 + 600 - camera.position.y) * 0.02;
            camera.lookAt(0, 0, 0);
            corePlanet.rotation.y += 0.002;
            rings.forEach(r => r.ring.rotation.z += r.speed);
            streamCurves.forEach(s => {
                s.progress += 0.002;
                if (s.progress > 1) s.progress = 0;
                s.bit.position.copy(s.curve.getPointAt(s.progress));
            });
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            renderer.dispose();
        };
    }, []);

    // 2. GSAP Animations
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        script.onload = () => {
            const gsap = window.gsap;
            const screens = [
                headerRef.current,
                clockRef.current,
                sparkChamberRef.current,
                nodeMapperRef.current,
                rightTacticalRef.current,
                neuralMiniRef.current,
                bottomRef.current
            ].filter(Boolean);

            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.set(screens, { scaleX: 0, scaleY: 0.002, opacity: 0, force3D: true })
                .to(screens, { opacity: 1, scaleX: 1, duration: 0.8, stagger: 0.08, ease: "expo.inOut" })
                .to(screens, { scaleY: 1, duration: 0.7, stagger: 0.08 });
        };
        document.head.appendChild(script);
    }, []);

    // Sine Wave Animation Loop
    useEffect(() => {
        setIsMounted(true);
        let frameId;
        const updateSine = () => {
            setSineOffset(prev => prev + 0.1);
            frameId = requestAnimationFrame(updateSine);
        };
        updateSine();
        return () => cancelAnimationFrame(frameId);
    }, []);

    // Update Stats
    useEffect(() => {
        const itv = setInterval(() => {
            setStats(prev => ({
                ...prev,
                time: new Date().toTimeString().split(' ')[0],
                shield: 99.1 + Math.random() * 0.8,
                energon: 92 + Math.random() * 3,
                signal: Math.floor(60 + Math.random() * 40),
                nodeIdx: Math.floor(Math.random() * 4),
                syncRate: (85 + Math.random() * 5).toFixed(2),
                hexCode: Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, '0'),
                streamBuffer: Math.random().toString(16).substring(2, 18).toUpperCase()
            }));
        }, 1000);
        return () => clearInterval(itv);
    }, []);

    // Generate Sine Wave Path - use 0 offset on server to ensure consistent hydration
    const getAnimatedSinePath = (amplitude, frequency, offsetMultiplier, height = 40) => {
        const offset = isMounted ? sineOffset * offsetMultiplier : 0;
        let path = `M 0 ${height / 2}`;
        for (let x = 0; x <= 100; x += 1) {
            const y = (height / 2) + Math.sin((x / 100) * frequency + offset) * amplitude;
            path += ` L ${x} ${y}`;
        }
        return path;
    };

    return (
        <div className="relative w-full h-screen bg-slate-950 overflow-hidden font-mono text-cyan-200 p-6">
            <div ref={mountRef} className="absolute inset-0 z-0" />

            {/* HUD Overlay */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">

                {/* TOP */}
                <div className="flex justify-between items-start w-full">
                    <CyberFrame screenRef={headerRef} className="p-4 w-fit min-w-[350px]">
                        <div className="text-[10px] tracking-[0.4em] text-cyan-500 font-bold mb-1 px-2 uppercase opacity-70">Mainframe // Plasma_Link</div>
                        <div className="text-2xl font-black flex items-center gap-4 px-2 uppercase tracking-tighter">
                            <span className="bg-cyan-400 text-slate-900 px-3">Iacon</span>
                            Command_Center
                        </div>
                        <div className="mt-2 flex gap-6 text-[10px] font-bold px-2 uppercase">
                            <span className="text-cyan-200">Shields: {stats.shield.toFixed(1)}%</span>
                            <span className="text-cyan-400 border-l border-cyan-400/30 pl-3">Status: Optimized</span>
                        </div>
                    </CyberFrame>

                    <CyberFrame screenRef={clockRef} className="p-4 w-56 text-right">
                        <div className="text-3xl font-light tracking-[0.2em] text-cyan-100">{stats.time}</div>
                        <div className="text-[9px] text-cyan-500 font-bold uppercase mt-1 tracking-widest">Orbital_Cycle: 481.12</div>
                    </CyberFrame>
                </div>

                {/* MIDDLE SECTION */}
                <div className="flex flex-1 items-center justify-between w-full py-8">

                    {/* LEFT: Spark Chamber & Node Mapper */}
                    <div className="flex flex-col gap-4">
                        <CyberFrame screenRef={sparkChamberRef} className="w-72 h-[380px] p-5">
                            <div className="text-[10px] font-bold border-b border-cyan-400/20 pb-2 mb-4 uppercase tracking-widest">Spark_Chamber_Flow</div>

                            <div className="relative h-48 w-full flex items-center justify-center">
                                <div className="absolute w-24 h-24 rounded-full border border-cyan-400/30 animate-pulse" />
                                <div className="absolute w-12 h-12 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
                                {/* Spark Core Visualization */}
                                <div className="w-16 h-16 border-4 border-cyan-400 flex items-center justify-center transform rotate-45">
                                    <div className="w-8 h-8 bg-cyan-400 animate-ping" />
                                </div>
                                {/* Rotating Data Rings */}
                                <div className="absolute w-32 h-32 border-2 border-dashed border-cyan-600/40 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute w-40 h-40 border border-cyan-600/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex justify-between items-center text-[9px] font-bold uppercase">
                                    <span>Sync_Rate</span>
                                    <span className="text-white">{stats.syncRate} MHz</span>
                                </div>
                                <div className="h-1 bg-cyan-950 w-full overflow-hidden">
                                    <div className="h-full bg-cyan-400 animate-[shimmer_2s_infinite]" style={{ width: '88%' }} />
                                </div>
                                <div className="flex justify-between items-center text-[9px] font-bold uppercase">
                                    <span>Flux_Pressure</span>
                                    <span className="text-white">STABLE</span>
                                </div>
                                <div className="h-1 bg-cyan-950 w-full overflow-hidden">
                                    <div className="h-full bg-cyan-500/50" style={{ width: '62%' }} />
                                </div>
                            </div>
                        </CyberFrame>

                        <CyberFrame screenRef={nodeMapperRef} className="w-72 p-4">
                            <div className="text-[8px] font-bold text-cyan-500 uppercase mb-3 tracking-widest">Sector_Node_Mapper</div>
                            <div className="flex justify-between gap-1 h-8">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 border border-cyan-400/20 transition-colors duration-500 ${i === stats.nodeIdx ? 'bg-cyan-400 shadow-[0_0_10px_cyan]' : 'bg-cyan-950/20'}`}
                                    />
                                ))}
                            </div>
                            <div className="mt-2 text-[7px] text-white/50 uppercase flex justify-between">
                                <span>Relay_Active</span>
                                <span>Prtcl: 0x{stats.hexCode}</span>
                            </div>
                        </CyberFrame>
                    </div>

                    {/* RIGHT: Neural Flux & Signaling */}
                    <div className="flex flex-col gap-4 items-end">
                        <CyberFrame screenRef={rightTacticalRef} className="w-80 h-[420px] p-6">
                            <div className="text-[10px] font-bold border-b border-cyan-400/20 pb-2 mb-4 uppercase tracking-widest text-right">Neural_Link_Matrix</div>

                            <div className="w-full h-32 bg-cyan-950/40 border border-cyan-400/20 mb-6 overflow-hidden relative">
                                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full fill-none">
                                    <path
                                        d={getAnimatedSinePath(12, 12, 0.5)}
                                        className="stroke-cyan-800 opacity-40 stroke-[0.5]"
                                    />
                                    <path
                                        d={getAnimatedSinePath(8, 20, 1)}
                                        className="stroke-cyan-400 shadow-[0_0_8px_cyan] stroke-1"
                                    />
                                    <path
                                        d={getAnimatedSinePath(4, 30, 1.5)}
                                        className="stroke-cyan-200 opacity-60 stroke-[0.3]"
                                    />
                                </svg>
                                <div className="absolute top-1 left-2 text-[7px] text-cyan-400 font-bold uppercase tracking-widest">Neural_Oscillation_Sine</div>
                            </div>

                            <div className="space-y-6 px-1">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase">
                                        <span>Spark_Synchrony</span>
                                        <span className="text-white">{stats.signal}%</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className={`h-3 flex-1 border border-cyan-400/20 transition-all duration-300 ${i < (stats.signal / 8) ? 'bg-cyan-400 shadow-[0_0_10px_cyan]' : 'bg-transparent'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div className="text-[9px] leading-loose text-cyan-400/80 uppercase">
                                    &gt; Sine handshake <span className="text-white">Active</span><br />
                                    &gt; Frequency modulated 144.2MHz<br />
                                    &gt; Phase shift <span className="text-cyan-300">Synchronized</span><br />
                                    &gt; Neural stream: <span className="text-white font-bold">LOCKED</span>
                                </div>

                                <div className="p-3 bg-cyan-400/5 border border-cyan-400/30 relative">
                                    <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 animate-pulse" />
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
                                        <span className="text-[8px] font-bold text-red-400 uppercase">Intrusion Watch</span>
                                    </div>
                                    <div className="text-[7px] text-cyan-500 uppercase leading-tight">Monitoring sub-space harmonics for Decepticon signatures. Null signals detected.</div>
                                </div>
                            </div>
                        </CyberFrame>

                        <CyberFrame screenRef={neuralMiniRef} className="w-64 h-24 p-4 flex flex-col justify-center">
                            <div className="text-[8px] font-bold text-cyan-500 uppercase mb-2">Digital_Stream_Buffer</div>
                            <div className="text-[10px] text-white/40 break-all font-bold leading-tight uppercase overflow-hidden whitespace-nowrap">
                                {stats.streamBuffer}
                            </div>
                        </CyberFrame>
                    </div>
                </div>

                {/* BOTTOM */}
                <div ref={bottomRef} className="flex flex-col md:flex-row justify-between items-end gap-6 w-full">
                    <CyberFrame className="p-5 flex-1 max-w-2xl">
                        <div className="flex gap-3 mb-2 items-center">
                            <div className="w-3 h-3 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-pulse" />
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-cyan-100">Cybertronian_Core: Resonating</span>
                        </div>
                        <p className="text-[10px] text-cyan-400/80 leading-relaxed uppercase px-1 font-bold">
                            Long-range arrays have detected non-biological energy signatures within Sector Delta.
                            Sub-space frequencies locked to Cybertronian standard. Deploying orbital scouts for visual verification.
                        </p>
                    </CyberFrame>

                    <CyberFrame className="p-5 w-full md:w-[450px]">
                        <div className="flex justify-between text-[11px] mb-3 font-black tracking-widest px-1 uppercase">
                            <span>System_Sync_Load</span>
                            <span className="text-white animate-pulse">94%</span>
                        </div>
                        <div className="h-2 bg-cyan-950 w-full overflow-hidden mx-1 border border-cyan-400/20">
                            <div className="h-full bg-cyan-400 w-[94%] shadow-[0_0_20px_#a5f3fc]" />
                        </div>
                        <div className="flex justify-between mt-4 text-[9px] font-bold text-cyan-600 px-1 uppercase tracking-widest">
                            <span>Node: IAC-001-PRIME</span>
                            <span>Uptime: 2824:11:02</span>
                        </div>
                    </CyberFrame>
                </div>
            </div>

            {/* ATMOSPHERICS */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] opacity-20" />
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(8,145,178,0.1)]" />
            </div>

            <style>{`
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
        </div>
    );
};


export default App;