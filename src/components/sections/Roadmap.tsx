import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';


const phases = [
    { id: 1, title: 'Excavate', description: 'Unearthing the core truth. Deep research to find what matters.' },
    { id: 2, title: 'Forge', description: 'Hammering out the raw form. Concepts that break the mold.' },
    { id: 3, title: 'Construct', description: 'Building the steel frame. Code that stands the test of time.' },
    { id: 4, title: 'Ignite', description: 'Setting the world on fire. Deployment and impact analysis.' },
];

export function Roadmap() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Custom cursor logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const cursorX = useSpring(mouseX, { stiffness: 500, damping: 30 });
    const cursorY = useSpring(mouseY, { stiffness: 500, damping: 30 });

    useEffect(() => {
        const minMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }
        };

        const element = containerRef.current;
        if (element) {
            element.addEventListener('mousemove', minMouseMove);
        }
        return () => {
            if (element) element.removeEventListener('mousemove', minMouseMove);
        }
    }, [mouseX, mouseY]);

    return (
        <section ref={containerRef} className="py-20 px-4 md:px-10 relative bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 overflow-hidden cursor-none transition-colors duration-700">
            <h2 className="font-display font-black text-6xl md:text-8xl mb-20 uppercase">Roadmap <span className="text-neon-lime">Process</span></h2>

            {/* Roadmap3D Removed */}

            <div className="flex flex-col gap-0 border-t border-stone-300 dark:border-stone-700 transition-colors duration-700 relative z-10">
                {phases.map((phase) => (
                    <div
                        key={phase.id}
                        className="group relative border-b border-stone-300 dark:border-stone-700 py-10 px-4 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors duration-300 backdrop-blur-sm"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                            <span className="font-display font-bold text-4xl text-stone-400 dark:text-stone-500 group-hover:text-neon-lime transition-colors">0{phase.id}</span>
                            <h3 className="font-display font-bold text-4xl md:text-6xl uppercase">{phase.title}</h3>
                            <p className="font-body text-sm md:text-base max-w-md text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-200">{phase.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Cursor Element */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                className="pointer-events-none absolute top-0 left-0 w-32 h-32 bg-neon-lime rounded-full blur-3xl opacity-20 z-0 mix-blend-difference"
            />
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                className="pointer-events-none absolute top-0 left-0 w-4 h-4 bg-neon-lime rounded-full z-10"
            />
        </section>
    );
}
