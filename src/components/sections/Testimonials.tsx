import { motion } from 'framer-motion';

const reviews = [
    "Visceral. Unapologetic. Exactly what we needed to break the mold.",
    "Dangerous levels of creativity. The ROI was immediate.",
    "Not for the safe players. If you want to dominate, this is it.",
    "Digital alchemy at its finest. Turned our rough concepts into gold.",
    "A visual assault in the best way possible. Pure impact.",
    "Visceral. Unapologetic. Exactly what we needed to break the mold.",
];

export function Testimonials() {
    return (
        <section className="py-20 border-y border-stone-300 dark:border-stone-800 overflow-hidden bg-neon-lime text-black">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-20 pr-20"
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                >
                    {reviews.map((review, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="font-display font-black text-4xl md:text-6xl uppercase">“{review}”</span>
                            <span className="font-display font-bold text-xl opacity-50">•</span>
                        </div>
                    ))}
                </motion.div>

                {/* Duplicate for seamless loop */}
                <motion.div
                    className="flex gap-20 pr-20"
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    aria-hidden="true"
                >
                    {reviews.map((review, i) => (
                        <div key={`dup-${i}`} className="flex items-center gap-4">
                            <span className="font-display font-black text-4xl md:text-6xl uppercase">“{review}”</span>
                            <span className="font-display font-bold text-xl opacity-50">•</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
