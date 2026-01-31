'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Inline CyberFrame component - Updated to match high-fidelity Auth Screen dimensions
const CyberFrame = ({ children, className = "", screenRef }) => (
    <div
        ref={screenRef}
        className={`relative bg-[#061b2b]/60 backdrop-blur-md border border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.15)] ${className}`}
        style={{
            clipPath: 'polygon(0% 15px, 15px 0%, calc(100% - 15px) 0%, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0% calc(100% - 15px))'
        }}
    >
        {/* Mechanical Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

        {/* Side Accents */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-8 bg-cyan-400/40" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1 h-8 bg-cyan-400/40" />

        <div className="relative z-10 w-full h-full">
            {children}
        </div>
    </div>
);

const IaconCmdCtr = () => {
    const mountRef = useRef(null);
    const headerRef = useRef(null);
    const clockRef = useRef(null);
    const sparkChamberRef = useRef(null);
    const rightTacticalRef = useRef(null);
    const bottomRef = useRef(null);
    const nodeMapperRef = useRef(null);
    const neuralMiniRef = useRef(null);
    const scrollRef = useRef(null);

    const [stats, setStats] = useState({
        shield: 100,
        energon: 94,
        time: "00:00:00",
        signal: 0,
        nodeIdx: 0,
        pulse: 122.4,
        cycleStamp: "000.00",
        cpuLoad: 12,
        atmosphericDensity: 1.225,
        uptime: "00:00:00",
        visibility: 99.4,
        temp: 288.15,
        wind: 2.1
    });

    const [sineOffset, setSineOffset] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [randomBuffer, setRandomBuffer] = useState("");
    const [neuralLogs, setNeuralLogs] = useState([
        "> INITIALIZING NEURAL HANDSHAKE",
        "> ENCRYPTION: VECTOR_S",
        "> LATENCY: 0.002ms"
    ]);

    useEffect(() => {
        setIsMounted(true);
        setRandomBuffer(Math.random().toString(16).substring(2, 24).toUpperCase());
    }, []);

    // 1. Three.js Background Logic
    useEffect(() => {
        if (!isMounted) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x061b2b);
        scene.fog = new THREE.FogExp2(0x0a2d42, 0.0004);

        const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 10000);
        camera.position.set(1200, 600, 1200);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const COLORS = { cyanMain: 0xa5f3fc, cyanDeep: 0x22d3ee, grid: 0x164e63 };

        const light1 = new THREE.PointLight(COLORS.cyanMain, 3, 4000);
        light1.position.set(500, 800, 500);
        scene.add(light1);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x061b2b, 0.5);
        scene.add(hemiLight);

        const cybertronGroup = new THREE.Group();
        scene.add(cybertronGroup);

        const corePlanet = new THREE.Mesh(
            new THREE.IcosahedronGeometry(280, 4),
            new THREE.MeshPhongMaterial({
                color: 0x155e75,
                emissive: 0x22d3ee,
                emissiveIntensity: 0.8,
                wireframe: true,
                transparent: true,
                opacity: 0.4
            })
        );
        cybertronGroup.add(corePlanet);

        const innerCore = new THREE.Mesh(
            new THREE.SphereGeometry(150, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.15 })
        );
        cybertronGroup.add(innerCore);

        const createRing = (radius, color, speed) => {
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(radius, 0.8, 2, 120),
                new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4 })
            );
            ring.rotation.x = Math.PI / 2;
            cybertronGroup.add(ring);
            return { ring, speed };
        };
        const rings = [
            createRing(400, COLORS.cyanMain, 0.006),
            createRing(450, COLORS.cyanDeep, -0.003),
            createRing(600, COLORS.cyanDeep, 0.001)
        ];

        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (e) => {
            mouseX = (e.clientX - width / 2) * 0.05;
            mouseY = (e.clientY - height / 2) * 0.05;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);
            camera.position.x += (mouseX * 4 + 1200 - camera.position.x) * 0.01;
            camera.position.y += (-mouseY * 4 + 600 - camera.position.y) * 0.01;
            camera.lookAt(0, 0, 0);
            corePlanet.rotation.y += 0.001;
            rings.forEach(r => r.ring.rotation.z += r.speed);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [isMounted]);

    // GSAP Animations
    useEffect(() => {
        if (!isMounted) return;
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        script.onload = () => {
            const gsap = window.gsap;
            const screens = [
                headerRef.current, clockRef.current, sparkChamberRef.current,
                nodeMapperRef.current, rightTacticalRef.current, neuralMiniRef.current, bottomRef.current
            ].filter(Boolean);

            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.set(screens, { scale: 0.9, opacity: 0 })
                .to(screens, { opacity: 1, scale: 1, duration: 1, stagger: 0.1 });
        };
        document.head.appendChild(script);
    }, [isMounted]);

    // Neural Log Scroller Logic
    useEffect(() => {
        if (!isMounted) return;
        const logInterval = setInterval(() => {
            const prefixes = ["> NEURAL", "> DATA", "> LINK", "> ECHO", "> SYNC"];
            const messages = ["FLUX_RECOVERY", "PACKET_SENT", "FREQ_MOD_STABLE", "SUB_SPACE_SCAN", "NODE_HANDSHAKE"];
            const newLog = `${prefixes[Math.floor(Math.random() * prefixes.length)]}: ${messages[Math.floor(Math.random() * messages.length)]} [0x${Math.floor(Math.random() * 255).toString(16).toUpperCase()}]`;

            setNeuralLogs(prev => [...prev.slice(-20), newLog]);
            setRandomBuffer(Math.random().toString(16).substring(2, 24).toUpperCase());
        }, 2000);

        return () => clearInterval(logInterval);
    }, [isMounted]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [neuralLogs]);

    // Real-time State Loop
    useEffect(() => {
        if (!isMounted) return;
        let frameId;
        const updateSine = () => {
            setSineOffset(prev => prev + 0.12);
            frameId = requestAnimationFrame(updateSine);
        };
        updateSine();

        // Fetch real system stats
        const fetchSystemStats = async () => {
            try {
                const res = await fetch('/api/stats');
                const data = await res.json();
                setStats(prev => ({
                    ...prev,
                    cpuLoad: data.cpuLoad,
                    uptime: `${Math.floor(data.uptime / 3600).toString().padStart(2, '0')}:${Math.floor((data.uptime % 3600) / 60).toString().padStart(2, '0')}:${Math.round(data.uptime % 60).toString().padStart(2, '0')}`
                }));
            } catch (err) {
                // Silently fallback if API is not available
            }
        };

        const apiItv = setInterval(fetchSystemStats, 2000);
        fetchSystemStats();

        const itv = setInterval(() => {
            const now = new Date();
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            const diff = now - startOfYear;
            const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hourOfDay = now.getHours();

            setStats(prev => ({
                ...prev,
                time: now.toTimeString().split(' ')[0],
                cycleStamp: `${dayOfYear.toString().padStart(3, '0')}.${hourOfDay.toString().padStart(2, '0')}`,
                shield: 98.5 + Math.random() * 1.5,
                pulse: 115 + Math.random() * 15,
                signal: Math.floor(85 + Math.random() * 15),
                nodeIdx: Math.floor(Math.random() * 8),
                cpuLoad: prev.cpuLoad || Math.floor(8 + Math.random() * 10),
                atmosphericDensity: 1.220 + (Math.random() * 0.01),
                visibility: 90 + (Math.random() * 1.5),
                temp: 275 + (Math.random() * 3),
                wind: 1.5 + (Math.random() * 2.5)
            }));
        }, 1000);

        return () => {
            cancelAnimationFrame(frameId);
            clearInterval(itv);
            clearInterval(apiItv);
        };
    }, [isMounted]);

    const getSinePath = (amplitude, frequency, offset, height = 40) => {
        let path = `M 0 ${height / 2}`;
        if (!isMounted) return path;
        for (let x = 0; x <= 100; x += 1) {
            const y = (height / 2) + Math.sin((x / 100) * frequency + offset) * amplitude;
            path += ` L ${x} ${y}`;
        }
        return path;
    };

    return (
        <div className="relative w-full h-screen bg-[#0a1e2f] overflow-hidden font-mono text-cyan-100 p-8">
            {/* 3D Environment */}
            <div ref={mountRef} className="absolute inset-0 z-0" />

            {/* Blue Atmospheric Gradient */}
            <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,transparent_0%,#061b2b_100%)] opacity-60 pointer-events-none" />

            {/* HUD Content - Two Column Layout */}
            <div className="relative z-10 w-full h-full flex flex-row gap-8 justify-between pointer-events-none select-none">

                {/* LEFT COLUMN: COMMAND & RESONANCE & ATMOSPHERICS */}
                <div className="flex flex-col gap-8 h-full justify-between py-4">
                    <div className="flex flex-col gap-8">
                        {/* 1. IACON HQ_CMD */}
                        <CyberFrame screenRef={headerRef} className="p-6 md:w-[450px]">
                            <div className="text-[10px] tracking-[0.5em] text-cyan-400 font-bold mb-1 uppercase opacity-80">Prime_Link // Vector_Sigma</div>
                            <div className="text-3xl font-black italic flex items-center gap-4 uppercase tracking-tighter">
                                <span className="bg-cyan-400 text-cyan-950 px-3 not-italic">IACON</span>
                                HQ_COMMAND
                            </div>
                            <div className="mt-3 flex gap-8 text-[11px] font-bold uppercase text-cyan-300">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />Shields: {stats.shield.toFixed(1)}%</span>
                                <span className="opacity-50 border-l border-cyan-400/20 pl-4">Sector: 0-Alpha</span>
                            </div>
                        </CyberFrame>

                        {/* 2. Spark Resonance */}
                        <CyberFrame screenRef={sparkChamberRef} className="md:w-[450px] h-fit p-6">
                            <div className="text-[11px] font-black border-b border-cyan-400/30 pb-3 mb-6 uppercase tracking-widest text-cyan-300">Spark_Resonance</div>

                            <div className="relative h-36 w-full flex items-center justify-center bg-cyan-400/5 rounded-lg border border-cyan-400/10 px-12">
                                <div className="absolute w-32 h-32 rounded-full border border-cyan-400/20 animate-pulse" />
                                <div className="w-12 h-12 bg-cyan-400 rotate-45 animate-pulse shadow-[0_0_30px_cyan]" />
                                <div className="absolute w-40 h-40 border border-dashed border-cyan-400/20 rounded-full animate-[spin_15s_linear_infinite]" />
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold uppercase">
                                        <span>Pulse_Freq</span>
                                        <span className="text-white">{stats.pulse.toFixed(1)} <br /> mh/s</span>
                                    </div>
                                    <div className="h-1 bg-cyan-400/10 w-full overflow-hidden rounded-full transition-all duration-1000">
                                        <div
                                            className="h-full bg-cyan-400 shadow-[0_0_10px_cyan] transition-all duration-1000"
                                            style={{ width: `${Math.min(100, (stats.pulse / 150) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold uppercase"><span>Bio_Signature</span><span className="text-white">Active</span></div>
                                    <div className="h-1 bg-cyan-400/10 w-full overflow-hidden rounded-full"><div className="h-full bg-cyan-300 shadow-[0_0_10px_cyan]" style={{ width: '92.4%' }} /></div>
                                </div>
                            </div>
                        </CyberFrame>
                    </div>

                    {/* 3. Cybertronian Atmospherics */}
                    <div ref={bottomRef} className="flex flex-col gap-4">
                        <CyberFrame className="p-6 md:w-[450px]">
                            <div className="flex gap-4 mb-3 items-center">
                                <div className="w-4 h-4 bg-cyan-400 shadow-[0_0_20px_cyan] rotate-45 animate-pulse" />
                                <span className="text-sm font-black uppercase tracking-[0.5em] text-white">Cybertronian <br />Atmospherics</span>
                            </div>
                            <div className="flex flex-col md:flex-row gap-2">
                                <ul className="text-[11px] text-cyan-100 leading-relaxed uppercase font-medium opacity-80 flex-1 list-none">
                                    <li>Orbital nodes</li>
                                    <li>Atmospheric density</li>
                                    <li>Visibility</li>
                                    <li>Temperature</li>
                                    <li>Wind</li>
                                    <li>Ionosphere resonance</li>
                                </ul>
                                <div className="text-[10px] text-cyan-400 font-bold uppercase border-l border-cyan-400/20 pl-3 whitespace-nowrap">
                                    <ul className="text-[11px] text-cyan-100 leading-relaxed uppercase font-medium opacity-80 flex-1 list-none">
                                        <li>Pressure Nominal</li>
                                        <li>{stats.atmosphericDensity.toFixed(3)}</li>
                                        <li>{stats.visibility.toFixed(1)}%</li>
                                        <li>{stats.temp.toFixed(2)} K</li>
                                        <li>{stats.wind.toFixed(1)} m/s</li>
                                        <li>Prime_Link safe.</li>
                                    </ul>
                                </div>
                            </div>
                        </CyberFrame>
                    </div>
                </div>

                {/* RIGHT COLUMN: SYSTEM METRICS & OCILLATIONS */}
                <div className="flex flex-col gap-8 h-full justify-between items-end py-4">
                    <div className="flex flex-col gap-8 items-end">
                        {/* 1. Clock */}
                        <CyberFrame screenRef={clockRef} className="p-5 w-[250px] text-right">
                            <div className="text-4xl font-extralight tracking-widest text-white">{isMounted ? stats.time : "00:00:00"}</div>
                            <div className="text-[10px] text-cyan-400 font-bold uppercase mt-2 tracking-[0.3em]">Cycle_Stamp: {stats.cycleStamp}</div>
                        </CyberFrame>

                        {/* 2. Neural Link Oscillation */}
                        <CyberFrame screenRef={rightTacticalRef} className="w-96 h-[425px] p-5">
                            <div className="text-[11px] font-black border-b border-cyan-400/30 pb-3 mb-6 uppercase tracking-widest text-cyan-300 text-right">Neural_Link_Oscillation</div>

                            <div className="w-full h-32 bg-cyan-400/5 border border-cyan-400/20 mb-6 overflow-hidden relative rounded-lg">
                                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full fill-none">
                                    <path d={getSinePath(12, 10, sineOffset * 0.4)} className="stroke-cyan-600 opacity-20 stroke-[0.3]" />
                                    <path d={getSinePath(8, 18, sineOffset)} className="stroke-cyan-400 shadow-[0_0_12px_cyan] stroke-[0.8]" />
                                    <path d={getSinePath(5, 25, sineOffset * 1.3)} className="stroke-white opacity-40 stroke-[0.4]" />
                                </svg>
                                <div className="absolute top-2 left-3 text-[8px] text-cyan-400/60 font-black uppercase tracking-widest">Waveform_Active</div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-black uppercase text-white">
                                        <span>Signal_Integrity</span>
                                        <span>{isMounted ? stats.signal : 0}%</span>
                                    </div>
                                    <div className="flex gap-1 h-2">
                                        {isMounted && [...Array(20)].map((_, i) => (
                                            <div key={i} className={`flex-1 rounded-sm ${i < (stats.signal / 5) ? 'bg-cyan-400' : 'bg-cyan-400/10'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div
                                    ref={scrollRef}
                                    className="h-32 overflow-y-auto overflow-x-hidden p-3 bg-cyan-400/5 rounded border border-cyan-400/10 scrollbar-hide pointer-events-auto"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    <div className="space-y-1 text-[9px] leading-tight text-cyan-300 font-bold uppercase">
                                        {neuralLogs.map((log, idx) => (
                                            <div key={idx} className="flex gap-2 animate-in fade-in duration-500">
                                                <span className="text-cyan-500 shrink-0">[{idx.toString().padStart(2, '0')}]</span>
                                                <span className={idx === neuralLogs.length - 1 ? "text-white" : ""}>{log}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CyberFrame>
                    </div>

                    {/* 4. Mainframe Processing */}
                    <CyberFrame className="p-6 md:w-[400px]">
                        <div className="text-xs mb-3 font-black tracking-widest uppercase">
                            <p className="text-cyan-400 text-end">Mainframe_Processing</p>
                            <br />
                            <p className="text-white animate-pulse">LOAD: {stats.cpuLoad}%</p>
                        </div>
                        <div className="h-2 bg-cyan-400/10 w-full overflow-hidden rounded-full border border-cyan-400/20">
                            <div
                                className="h-full bg-cyan-400 shadow-[0_0_20px_cyan] transition-all duration-500"
                                style={{ width: `${stats.cpuLoad}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-4 text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em]">
                            <span>Uptime: {stats.uptime || "00:00:00"}</span>
                            <span>Kernel: vPrime.9</span>
                        </div>
                    </CyberFrame>
                </div>
            </div>

            {/* OVERLAY FILTERS */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_70%)]" />
                <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(34,211,238,0.05)]" />
            </div>
            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
            `}</style>
        </div>
    );
};

export default IaconCmdCtr;