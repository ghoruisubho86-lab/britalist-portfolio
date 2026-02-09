import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function Crystal() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_state, delta) => {
        // Auto spin inner mesh slightly for life, but drag will override outer group
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh ref={meshRef} scale={1.8}>
                    <icosahedronGeometry args={[1, 0]} />
                    <MeshTransmissionMaterial
                        backside
                        backsideThickness={5}
                        thickness={2}
                        chromaticAberration={1}
                        anisotropy={1}
                        distortion={1}
                        distortionScale={1}
                        temporalDistortion={0.2}
                        iridescence={1}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[0, 1400]}
                        roughness={0}
                        clearcoat={1}
                        color="#ffffff"
                        resolution={1024}
                        samples={16}
                    />
                </mesh>
            </Float>
        </group>
    );
}

export function GlassCrystal() {
    return (
        <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <Environment preset="city" />

                <PresentationControls
                    global={false} // Spin globally or just consistent with drag
                    cursor={true}
                    snap={true} // Snap back to center? Maybe nice for "floating" feel, let's keep it partial or turn off if they want free spin. Let's try snap={false} for free look or true for spring back. True fits "Glass Element" showcase better.
                    speed={1.5}
                    zoom={0.8}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]} // Vertical limits
                    azimuth={[-Math.PI / 4, Math.PI / 4]} // Horizontal limits
                    config={{ mass: 1, tension: 170, friction: 26 }} // Spring physics
                >
                    <Crystal />
                </PresentationControls>
            </Canvas>
        </div>
    );
}
