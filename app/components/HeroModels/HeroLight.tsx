import { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const HeroLight = () => {
    // Target aimed at the model's position
    const target = new THREE.Object3D();
    target.position.set(0, -3.5, 0);

    return (
        <>
            <primitive object={target} />

            {/* Ambient Light for base illumination */}
            <ambientLight intensity={2} color="#ffffff" />

            {/* Front Right */}
            <spotLight
                position={[5, 5, 5]}
                target={target}
                intensity={100}
                angle={0.5}
                penumbra={1}
                color="#ffffff"
            />

            {/* Front Left */}
            <spotLight
                position={[-5, 5, 5]}
                target={target}
                intensity={100}
                angle={0.5}
                penumbra={1}
                color="#ffffff"
            />

            {/* Back Right (Rim) */}
            <spotLight
                position={[5, 5, -5]}
                target={target}
                intensity={100}
                angle={0.5}
                penumbra={1}
                color="#ffffff"
            />

            {/* Back Left (Rim) */}
            <spotLight
                position={[-5, 5, -5]}
                target={target}
                intensity={100}
                angle={0.5}
                penumbra={1}
                color="#ffffff"
            />

            {/* Top Fill */}
            <spotLight
                position={[0, 10, 0]}
                target={target}
                intensity={50}
                angle={0.5}
                penumbra={1}
                color="#ffffff"
            />

            {/* Bottom Fill */}
            <spotLight
                position={[0, -10, 0]}
                target={target}
                intensity={50}
                angle={0.5}
                penumbra={1}
                color="#ffffff"
            />
        </>
    )
}

export default HeroLight;