import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Loader({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds total load
        const steps = 100;
        const intervalTime = duration / steps;

        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 2.5 }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 z-[100] bg-stone-950 flex flex-col items-center justify-between py-10 pointer-events-auto cursor-wait"
        >
            {/* Top Text */}
            <div className="w-full px-10 flex justify-between font-body text-xs uppercase tracking-widest text-stone-500">
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    System Initializing
                </motion.span>
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    v2.0.26
                </motion.span>
            </div>

            {/* Center Content: Digital Counter & Branding */}
            <div className="flex flex-col items-center">
                <div className="relative overflow-hidden mb-4">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                        className="font-display font-black text-6xl md:text-9xl text-stone-100 uppercase tracking-tighter"
                    >
                        GRAINY
                    </motion.h1>
                </div>
                <div className="relative overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                        className="font-display font-black text-6xl md:text-9xl text-stone-100 uppercase tracking-tighter"
                    >
                        GRIDS
                    </motion.h1>
                </div>

                {/* Percentage Counter */}
                <motion.div
                    className="mt-10 font-mono text-4xl md:text-6xl text-neon-lime font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {count}%
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full px-10">
                <div className="w-full h-[1px] bg-stone-800 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-neon-lime"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
