import { motion } from 'framer-motion';

const reviews = [
    "Subo transformed our vague idea into a digital masterpiece. The brutalist approach turned heads.",
    "Fast, precise, and dangerously creative. The best investment we made this year.",
    "Not for the faint of heart. If you want to stand out, this is the way.",
    "The 3D interactions are smooth as butter. Absolutely stunning work.",
    "A true digital alchemist. He turned our boring corporate site into art.",
    "Subo transformed our vague idea into a digital masterpiece. The brutalist approach turned heads.",
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
