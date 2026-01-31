'use client'


import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CircuitryBg = () => {
    const mountRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020508, 0.01);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 80;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Groups and Objects
        const circuitGroup = new THREE.Group();
        scene.add(circuitGroup);

        // Create Circuitry Traces
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00f2ff,
            transparent: true,
            opacity: 0.4
        });

        for (let i = 0; i < 60; i++) {
            const points = [];
            let x = (Math.random() - 0.5) * 200;
            let y = (Math.random() - 0.5) * 150;
            let z = (Math.random() - 0.5) * 300;

            for (let j = 0; j < 5; j++) {
                points.push(new THREE.Vector3(x, y, z));
                const axis = Math.floor(Math.random() * 3);
                const dist = (Math.random() - 0.5) * 40;
                if (axis === 0) x += dist;
                else if (axis === 1) y += dist;
                else z += dist;
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            circuitGroup.add(line);

            points.forEach(p => {
                if (Math.random() > 0.6) {
                    const nodeGeom = new THREE.BoxGeometry(0.6, 0.6, 0.6);
                    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f2ff, opacity: 0.4 });
                    const node = new THREE.Mesh(nodeGeom, nodeMat);
                    node.position.copy(p);
                    circuitGroup.add(node);
                }
            });
        }

        // Background Grid
        const helper = new THREE.GridHelper(500, 80, 0x00f2ff, 0x051525);
        helper.position.y = -60;
        helper.rotation.x = Math.PI / 50;
        helper.opacity = 1;
        helper.material.transparent = true;
        scene.add(helper);

        // const ceilingGrid = new THREE.GridHelper(1000, 40, 0x00f2ff, 0x0a2a35);
        // ceilingGrid.position.y = 100;
        // ceilingGrid.material.transparent = true;
        // scene.add(ceilingGrid);

        // Floating Particles
        const bitGeom = new THREE.BufferGeometry();
        const bitPos = [];
        for (let i = 0; i < 1500; i++) {
            bitPos.push((Math.random() - 0.5) * 500, (Math.random() - 0.5) * 300, (Math.random() - 0.5) * 400);
        }
        bitGeom.setAttribute('position', new THREE.Float32BufferAttribute(bitPos, 3));
        const bitMat = new THREE.PointsMaterial({ color: 0x00f2ff, size: 0.4 });
        scene.add(new THREE.Points(bitGeom, bitMat));

        // Animation Loop
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            circuitGroup.rotation.y += 0.0005;

            // Camera position is now handled by ScrollTrigger
            camera.position.x += (mouse.current.x * 50 - camera.position.x) * 0.05;
            camera.position.y += (-mouse.current.y * 50 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };

        animate();

        // Event Listeners
        const handleMouseMove = (e) => {
            mouse.current = {
                x: (e.clientX - window.innerWidth / 2) / 200,
                y: (e.clientY - window.innerHeight / 2) / 200
            };
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Synchronize Background with Page Scroll
        const bgTl = gsap.timeline({
            scrollTrigger: {
                trigger: "html", // Use html for more reliable total height
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Tighter synchronization
                invalidateOnRefresh: true,
            }
        });

        // Dive Deep into circuitry (Linear ease is better for 1:1 scroll sync)
        bgTl.to(camera.position, {
            z: 10,
            ease: "none"
        }, 0);

        // Increase rotation as we descend
        bgTl.to(circuitGroup.rotation, {
            y: `+=${Math.PI * 2}`,
            ease: "none"
        }, 0);

        // Vertical Parallax
        bgTl.to(circuitGroup.position, {
            y: 50,
            ease: "none"
        }, 0);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (ScrollTrigger.getAll().length > 0) {
                ScrollTrigger.getAll().forEach(t => t.kill());
            }
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div className="relative w-full h-screen bg-[#020508] overflow-hidden select-none">
            {/* Three.js Canvas Container */}
            <div ref={mountRef} className="absolute inset-0 z-0" />

            {/* UI Overlay Layer */}
            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between pointer-events-none text-[#00f2ff] font-mono uppercase">



                {/* Scroll Indicator */}
                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 opacity-40">
                    <div className="text-[8px] [writing-mode:vertical-lr]">ZOOM</div>
                    <div className="w-[20px] h-[30px] border-2 border-[#00f2ff] rounded-full relative">
                        <div className="w-0.5 h-1.5 bg-[#00f2ff] absolute left-1/2 -translate-x-1/2 top-1.5 animate-bounce" />
                    </div>
                </div>



            </div>
            {/* <div className="scan-line" /> */}
        </div>
    );
};

export default CircuitryBg;