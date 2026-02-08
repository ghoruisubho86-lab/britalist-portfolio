import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Do you work with startups?",
        answer: "Exclusively. I prefer the chaos and speed of early-stage companies over corporate bureaucracy."
    },
    {
        question: "What is your typical timeline?",
        answer: "Sprints are 1-2 weeks. Full projects take 4-8 weeks depending on complexity. I don't drag things out."
    },
    {
        question: "Do you do branding?",
        answer: "Yes. I believe brand and interface are inseparable. I can create your logo, identity, and voice."
    },
    {
        question: "What tech stack do you use?",
        answer: "React, TypeScript, Tailwind, Framer Motion. Sometimes WebGL. Always fast, always scalable."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-32 px-4 md:px-10 bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 border-t border-current">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div>
                    <h2 className="font-display font-black text-6xl md:text-8xl uppercase sticky top-32">Common<br />Queries</h2>
                </div>

                <div className="flex flex-col border-t border-current">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-current">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full py-8 flex justify-between items-center text-left hover:text-neon-lime transition-colors group"
                            >
                                <span className="font-display font-bold text-2xl md:text-3xl uppercase pr-8">{faq.question}</span>
                                <span className="shrink-0 transition-transform duration-300 group-hover:rotate-180">
                                    {openIndex === i ? <Minus size={32} /> : <Plus size={32} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="font-body text-lg pb-8 opacity-80 max-w-lg">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
