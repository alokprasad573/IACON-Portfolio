'use client'

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MoonScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      2000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- Realistic HD Moon Texture Creation ---
    const createRealisticMoonTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 4096; 
      canvas.height = 2048;
      const ctx = canvas.getContext('2d', { alpha: false })!;

      // 1. Base Layer
      ctx.fillStyle = '#a0a0a0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Surface Noise
      for (let i = 0; i < 400000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5;
        const color = 140 + (Math.random() * 60 - 30);
        ctx.fillStyle = `rgb(${color},${color},${color})`;
        ctx.fillRect(x, y, size, size);
      }

      // 3. Lunar Maria (Dark Basaltic Plains)
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const rx = Math.random() * 500 + 200;
        const ry = Math.random() * 400 + 150;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, rx);
        grd.addColorStop(0, 'rgba(45, 45, 50, 0.6)');
        grd.addColorStop(1, 'rgba(80, 80, 85, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Crater Draw Function
      const drawCrater = (x: number, y: number, r: number) => {
        ctx.save();
        const shadowGrd = ctx.createRadialGradient(x - r*0.2, y - r*0.2, 0, x, y, r);
        shadowGrd.addColorStop(0, '#222');
        shadowGrd.addColorStop(0.8, '#444');
        shadowGrd.addColorStop(1, '#888');
        ctx.fillStyle = shadowGrd;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.lineWidth = Math.max(0.5, r * 0.05);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.stroke();
        ctx.restore();
      };

      for (let i = 0; i < 200; i++) {
        drawCrater(Math.random() * canvas.width, Math.random() * canvas.height, Math.pow(Math.random(), 3) * 60 + 5);
      }

      return new THREE.CanvasTexture(canvas);
    };

    const moonTexture = createRealisticMoonTexture();
    const moonGeometry = new THREE.SphereGeometry(5, 128, 128);
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      bumpMap: moonTexture,
      bumpScale: 0.15,
      roughness: 0.9,
    });

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    
    const updateMoonPosition = () => {
      const width = window.innerWidth;
      if (width < 800) {
        // Mobile: Smaller and pushed into corner
        moon.position.set(4.5, 7.5, 0);
        moon.scale.set(0.6, 0.6, 0.6);
      } else {
        // Desktop: Reduced size and ~70% hidden in top-right corner
        moon.position.set(11.5, 8.5, 0); 
        moon.scale.set(0.75, 0.75, 0.75);
      }
    };
    updateMoonPosition();
    scene.add(moon);

    // --- Space Background ---
    const createStars = (count: number, size: number, color: number) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 1500;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 1500;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 1500;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      return new THREE.Points(geo, new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.7 }));
    };

    const stars = createStars(10000, 0.12, 0xffffff);
    scene.add(stars);

    // --- Lighting ---
    scene.add(new THREE.AmbientLight(0x0a0a0a));
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.8);
    // Adjusted light angle to hit the visible sliver
    sunLight.position.set(-20, 0, 15);
    scene.add(sunLight);

    const earthShine = new THREE.DirectionalLight(0x445566, 0.15);
    earthShine.position.set(20, -10, -10);
    scene.add(earthShine);

    // --- Interaction ---
    let targetRotY = 0, targetRotX = 0, isMouseDown = false, lastX = 0, lastY = 0;
    const onMouseDown = (e: MouseEvent) => { isMouseDown = true; lastX = e.clientX; lastY = e.clientY; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      targetRotY += (e.clientX - lastX) * 0.005;
      targetRotX += (e.clientY - lastY) * 0.005;
      lastX = e.clientX; lastY = e.clientY;
    };
    const onMouseUp = () => isMouseDown = false;

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      updateMoonPosition();
    });

    // --- Animation Loop ---
    let frameId: number;
    const animate = () => {
      moon.rotation.y += 0.0004;
      moon.rotation.y += (targetRotY - moon.rotation.y) * 0.05;
      moon.rotation.x += (targetRotX - moon.rotation.x) * 0.05;
      stars.rotation.y += 0.0025;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      moonGeometry.dispose();
      moonMaterial.dispose();
      moonTexture.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-screen bg-black overflow-hidden" 
      style={{ touchAction: 'none' }} 
    />
  );
};

export default MoonScene;