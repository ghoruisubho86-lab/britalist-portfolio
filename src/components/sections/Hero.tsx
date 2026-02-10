import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassCrystal } from '../3d/GlassCrystal';

export function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="h-screen w-full relative flex flex-col justify-center items-center overflow-hidden bg-transparent">
            <GlassCrystal />
            <motion.div
                style={{ y, opacity }}
                className="z-10 mix-blend-exclusion text-white text-center pointer-events-none flex flex-col items-center"
            >
                <h1 className="font-display font-black text-[15vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
                    DIGITAL
                </h1>
                <h1 className="font-display font-black text-[15vw] leading-[0.8] tracking-tighter uppercase text-stone-900 dark:text-white stroke-2 transition-colors duration-700" style={{ WebkitTextStroke: "2px currentColor", WebkitTextFillColor: "transparent" }}>
                    ANARCHIST
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-10 md:left-20 flex flex-col items-start gap-2 text-stone-900 dark:text-white font-body text-xs md:text-sm tracking-wide uppercase border-l-2 border-stone-900 dark:border-white pl-4 transition-colors duration-700"
            >
                <span className="font-bold">Grainy Grids</span>
                <span>Forging digital chaos into order</span>
                <span>Based in Kolkata</span>
            </motion.div>

            {/* Removed bounce arrow for cleaner look */}
        </section>
    );
}
