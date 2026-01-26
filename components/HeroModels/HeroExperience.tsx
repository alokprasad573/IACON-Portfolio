'use client'
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import HeroLight from "./HeroLight";
import Bumblebee from "./Bumblebee";

export default function HeroExperience() {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });


    return (
        <Canvas camera={{ position: [10, 10, 15], fov: 35 }}>
            <HeroLight />
            <OrbitControls
                enablePan={false}
                enableZoom={!isTablet}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
            />

            <group scale={isMobile ? 1.4 : 2} position={[0, -3.5, 0]} rotation={[0, Math.PI / 4, 0]}>
                <Bumblebee />
            </group>
        </Canvas>
    )
}