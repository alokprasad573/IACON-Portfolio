'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';

import CyberFrame from "@/components/screens/CyberFrame";

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

    const [stats, setStats] = useState({ shield: 100, energon: 94, time: "00:00:00", signal: 0, nodeIdx: 0 });
    const [sineOffset, setSineOffset] = useState(0);
    const [neuralLogs, setNeuralLogs] = useState([
        "> INITIALIZING NEURAL HANDSHAKE",
        "> ENCRYPTION: VECTOR_S",
        "> LATENCY: 0.002ms"
    ]);

    // 1. Three.js Background Logic (Removed Grid)
    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x061b2b);
        scene.fog = new THREE.FogExp2(0x0a2d42, 0.0004); // Reduced density for cleaner look

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

        // Grid Helper Removed as requested

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
            renderer.dispose();
        };
    }, []);

    // GSAP Animations
    useEffect(() => {
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
    }, []);

    // Neural Log Scroller Logic
    useEffect(() => {
        const logInterval = setInterval(() => {
            const prefixes = ["> NEURAL", "> DATA", "> LINK", "> ECHO", "> SYNC"];
            const messages = ["FLUX_RECOVERY", "PACKET_SENT", "FREQ_MOD_STABLE", "SUB_SPACE_SCAN", "NODE_HANDSHAKE"];
            const newLog = `${prefixes[Math.floor(Math.random() * prefixes.length)]}: ${messages[Math.floor(Math.random() * messages.length)]} [0x${Math.floor(Math.random() * 255).toString(16).toUpperCase()}]`;

            setNeuralLogs(prev => [...prev.slice(-20), newLog]);
        }, 2000);

        return () => clearInterval(logInterval);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [neuralLogs]);

    // State Loops
    useEffect(() => {
        let frameId;
        const updateSine = () => {
            setSineOffset(prev => prev + 0.12);
            frameId = requestAnimationFrame(updateSine);
        };
        updateSine();
        const itv = setInterval(() => {
            setStats(prev => ({
                ...prev,
                time: new Date().toTimeString().split(' ')[0],
                shield: 99.1 + Math.random() * 0.8,
                signal: Math.floor(70 + Math.random() * 30),
                nodeIdx: Math.floor(Math.random() * 6)
            }));
        }, 1000);
        return () => {
            cancelAnimationFrame(frameId);
            clearInterval(itv);
        };
    }, []);

    const getSinePath = (amplitude, frequency, offset, height = 40) => {
        let path = `M 0 ${height / 2}`;
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

            {/* HUD Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none select-none">

                {/* TOP BAR */}
                <div className="flex justify-between items-start w-full">
                    <CyberFrame screenRef={headerRef} className="p-5 w-fit min-w-[400px]">
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

                    <CyberFrame screenRef={clockRef} className="p-5 w-64 text-right">
                        <div className="text-4xl font-extralight tracking-widest text-white">{stats.time}</div>
                        <div className="text-[10px] text-cyan-400 font-bold uppercase mt-2 tracking-[0.3em]">Cycle_Stamp: 992.01</div>
                    </CyberFrame>
                </div>

                {/* MID SECTION */}
                <div className="flex flex-1 items-center justify-between w-full">

                    {/* LEFT: Spark Chamber */}
                    <div className="flex flex-col gap-6">
                        <CyberFrame screenRef={sparkChamberRef} className="w-80 h-[400px] p-6">
                            <div className="text-[11px] font-black border-b border-cyan-400/30 pb-3 mb-6 uppercase tracking-widest text-cyan-300">Spark_Resonance</div>

                            <div className="relative h-48 w-full flex items-center justify-center bg-cyan-400/5 rounded-lg border border-cyan-400/10">
                                <div className="absolute w-32 h-32 rounded-full border border-cyan-400/20 animate-pulse" />
                                <div className="w-12 h-12 bg-cyan-400 rotate-45 animate-pulse shadow-[0_0_30px_cyan]" />
                                <div className="absolute w-40 h-40 border border-dashed border-cyan-400/20 rounded-full animate-[spin_15s_linear_infinite]" />
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold uppercase"><span>Pulse_Freq</span><span className="text-white">122.4hz</span></div>
                                    <div className="h-1 bg-cyan-400/10 w-full overflow-hidden rounded-full"><div className="h-full bg-cyan-400 shadow-[0_0_10px_cyan]" style={{ width: '75%' }} /></div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold uppercase"><span>Bio_Core</span><span className="text-white">Optimal</span></div>
                                    <div className="h-1 bg-cyan-400/10 w-full overflow-hidden rounded-full"><div className="h-full bg-cyan-300 shadow-[0_0_10px_cyan]" style={{ width: '92%' }} /></div>
                                </div>
                            </div>
                        </CyberFrame>

                        <CyberFrame screenRef={nodeMapperRef} className="w-80 p-5">
                            <div className="text-[9px] font-bold text-cyan-400 uppercase mb-4 tracking-widest">Global_Relay_Nodes</div>
                            <div className="flex justify-between gap-2 h-6">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className={`flex-1 transition-all duration-500 rounded-sm ${i === stats.nodeIdx ? 'bg-cyan-400 shadow-[0_0_15px_cyan] scale-y-125' : 'bg-cyan-400/10'}`} />
                                ))}
                            </div>
                        </CyberFrame>
                    </div>

                    {/* RIGHT: Neural Sine Wave */}
                    <div className="flex flex-col gap-6 items-end">
                        <CyberFrame screenRef={rightTacticalRef} className="w-96 h-[440px] p-7">
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
                                        <span>{stats.signal}%</span>
                                    </div>
                                    <div className="flex gap-1 h-2">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className={`flex-1 rounded-sm ${i < (stats.signal / 5) ? 'bg-cyan-400' : 'bg-cyan-400/10'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div
                                    ref={scrollRef}
                                    className="h-44 overflow-y-auto overflow-x-hidden p-3 bg-cyan-400/5 rounded border border-cyan-400/10 scrollbar-hide pointer-events-auto"
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

                        <CyberFrame screenRef={neuralMiniRef} className="w-72 h-20 p-4 flex flex-col justify-center">
                            <div className="text-[8px] font-black text-cyan-400 uppercase mb-1 tracking-widest opacity-60">Neural_Buffer_Overflow</div>
                            <div className="text-[10px] text-white font-black truncate uppercase opacity-80">
                                0X{Math.random().toString(16).substring(2, 24).toUpperCase()}
                            </div>
                        </CyberFrame>
                    </div>
                </div>

                {/* BOTTOM STATUS */}
                <div ref={bottomRef} className="flex flex-col lg:flex-row justify-between items-end gap-8 w-full">
                    <CyberFrame className="p-6 flex-1 max-w-3xl">
                        <div className="flex gap-4 mb-3 items-center">
                            <div className="w-4 h-4 bg-cyan-400 shadow-[0_0_20px_cyan] rotate-45 animate-pulse" />
                            <span className="text-sm font-black uppercase tracking-[0.5em] text-white">Cybertronian_Atmospherics</span>
                        </div>
                        <p className="text-[11px] text-cyan-100 leading-relaxed uppercase font-medium opacity-80">
                            Orbital nodes reporting clear visibility across the rust-sea. Energon clouds dissipating in Sector 7.
                            All systems maintaining optimal thermal regulation.
                        </p>
                    </CyberFrame>

                    <CyberFrame className="p-6 w-full lg:w-[500px]">
                        <div className="flex justify-between text-xs mb-3 font-black tracking-widest uppercase">
                            <span className="text-cyan-400">Mainframe_Processing</span>
                            <span className="text-white animate-pulse">LOAD: 12%</span>
                        </div>
                        <div className="h-2 bg-cyan-400/10 w-full overflow-hidden rounded-full border border-cyan-400/20">
                            <div className="h-full bg-cyan-400 w-[12%] shadow-[0_0_20px_cyan]" />
                        </div>
                        <div className="flex justify-between mt-4 text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em]">
                            <span>Uptime: 489:12:00</span>
                            <span>Kernel: vPrime.9</span>
                        </div>
                    </CyberFrame>
                </div>
            </div>

            {/* OVERLAY FILTERS (Cleaned up Scanlines) */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_70%)]" />
                <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(34,211,238,0.05)]" />
            </div>

            <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
        </div>
    );
};

export default IaconCmdCtr;