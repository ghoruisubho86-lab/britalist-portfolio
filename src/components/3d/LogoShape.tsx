import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../hooks/use-theme';

export function LogoShape({ isMobile }: { isMobile?: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [active, setActive] = useState(false);
    const { theme } = useTheme();

    // Interaction Scale
    const targetScale = active ? 1.5 : 2;

    useFrame((_state, delta) => {
        if (meshRef.current) {
            // Continuous Rotation
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.5;

            // Scale Transition
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
        }
    });

    const handlePointerDown = (e: any) => {
        e.stopPropagation();
        setActive(true);
        setTimeout(() => setActive(false), 200);
    };

    // VISIBLE Glass Material
    // Increased thickness, IOR, and dispersion to make it pop
    const materialProps = {
        thickness: 1.5,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transmission: 1,
        ior: 1.5,
        chromaticAberration: 0.15,
        anisotropy: 0.5,
        resolution: 512,
        samples: 6,
        color: '#ffffff',
        attenuationColor: theme === 'dark' ? '#fe0000' : '#ffffff', // Red tint in dark mode
        attenuationDistance: 0.5,
    };

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Icosahedron
                ref={meshRef}
                args={[1, 0]}
                scale={2}
                onClick={handlePointerDown}
                onPointerOver={() => !isMobile && setActive(true)}
                onPointerOut={() => !isMobile && setActive(false)}
            >
                {/* @ts-ignore */}
                <MeshTransmissionMaterial {...materialProps} />

                {/* Internal Light for visibility in Dark Mode */}
                {theme === 'dark' && (
                    <pointLight position={[0, 0, 0]} intensity={2} color="#fe0000" distance={3} decay={2} />
                )}
            </Icosahedron>
        </Float>
    );
}
