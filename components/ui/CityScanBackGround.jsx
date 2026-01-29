'use client';

import * as THREE from 'three';
import { useRef, useEffect } from 'react';


const CityScanBackground = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    const grid = new THREE.GridHelper(4000, 60, 0xFFD700, 0x080808);
    grid.position.y = -20;
    grid.material.transparent = true;
    grid.material.opacity = 0.15;
    scene.add(grid);

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    for (let i = 0; i < 150; i++) {
      const h = Math.random() * 250 + 30;
      const w = Math.random() * 40 + 10;
      const wireframe = new THREE.WireframeGeometry(boxGeo);
      const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0xFFD700, transparent: true, opacity: 0.1 }));
      line.scale.set(w, h, w);
      line.position.set((Math.random() - 0.5) * 1600, h / 2 - 20, (Math.random() - 0.5) * 1600);
      cityGroup.add(line);
    }

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      cityGroup.position.z = (window.scrollY * 0.4) % 1000;
      camera.position.y = 80 + Math.sin(Date.now() * 0.001) * 10;
      camera.lookAt(0, 50, -1000);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default CityScanBackground;

