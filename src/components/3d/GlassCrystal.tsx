import { Canvas } from '@react-three/fiber';
import { Environment, PresentationControls } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { LogoShape } from './LogoShape';

export function GlassCrystal() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // LOGO INTEGRATION:
    // Interactive on Desktop (PresentationControls)
    // Static/Auto-rotate on Mobile (Direct Render without Controls)

    return (
        <div className={`absolute inset-0 z-0 ${isMobile ? '' : 'cursor-grab active:cursor-grabbing'}`}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <Environment preset="city" />

                {isMobile ? (
                    <LogoShape isMobile={true} />
                ) : (
                    <PresentationControls
                        global={false}
                        cursor={true}
                        snap={true}
                        speed={1.5}
                        zoom={0.8}
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                        config={{ mass: 1, tension: 170, friction: 26 }}
                    >
                        <LogoShape />
                    </PresentationControls>
                )}
            </Canvas>
        </div>
    );
}
