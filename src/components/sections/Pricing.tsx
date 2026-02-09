import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const tiers = [
    {
        id: 'sprint',
        name: "Sprint",
        price: "2.5k",
        period: "/project",
        description: "One-off project or feature. Fast & furious.",
        features: ["Design & Dev", "1 week turnaround", "2 revisions", "Source files"],
        color: "bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100",
        hoverColor: "hover:bg-stone-300 dark:hover:bg-stone-700",
        activeBorder: "border-stone-400 dark:border-stone-500"
    },
    {
        id: 'retainer',
        name: "Retainer",
        price: "5k",
        period: "/month",
        description: "Dedicated design partner for your growing startup.",
        features: ["Unlimited requests", "Slack priority", "48h delivery", "Cancel anytime"],
        color: "bg-neon-lime text-stone-900",
        hoverColor: "hover:bg-neon-lime/80",
        activeBorder: "border-neon-lime"
    },
    {
        id: 'system',
        name: "System",
        price: "Custom",
        period: "",
        description: "Full-scale product design & development system.",
        features: ["Design System", "Full Stack Dev", "Strategy", "Long-term"],
        color: "bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100",
        hoverColor: "hover:bg-stone-200 dark:hover:bg-stone-800",
        activeBorder: "border-stone-300 dark:border-stone-600"
    }
];

export function Pricing() {
    const [activeId, setActiveId] = useState<string | null>('retainer');

    return (
        <section className="py-32 px-4 md:px-10 border-t border-current min-h-[800px] flex flex-col">
            <h2 className="font-display font-black text-6xl md:text-8xl mb-10 uppercase">Investment</h2>

            <div className="flex flex-col md:flex-row gap-4 h-[600px] w-full">
                {tiers.map((tier) => (
                    <motion.div
                        key={tier.id}
                        layout
                        onHoverStart={() => setActiveId(tier.id)}
                        onClick={() => setActiveId(tier.id)}
                        className={`relative flex flex-col justify-between overflow-hidden cursor-pointer border-2 transition-colors duration-300 ${activeId === tier.id ? `flex-[3] ${tier.activeBorder}` : 'flex-[1] border-transparent opacity-70 hover:opacity-100'
                            } ${tier.color}`}
                        style={{ borderRadius: '0px' }} // Brutalist sharp edges
                    >
                        {/* Background Texture/Noise could go here */}

                        <div className="p-8 flex flex-col h-full relative z-10">
                            <div className="flex justify-between items-start">
                                <motion.h3
                                    layout="position"
                                    className={`font-display font-black uppercase tracking-tighter ${activeId === tier.id ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl rotate-0 md:-rotate-90 md:origin-top-left md:absolute md:top-8 md:left-8 whitespace-nowrap'
                                        }`}
                                >
                                    {tier.name}
                                </motion.h3>

                                <motion.div layout="position" className={`font-display font-bold ${activeId === tier.id ? 'text-4xl' : 'text-xl'}`}>
                                    {tier.price}<span className="text-sm opacity-60 font-body">{tier.period}</span>
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {activeId === tier.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="mt-auto"
                                    >
                                        <p className="font-body text-lg md:text-xl font-medium mb-8 max-w-md opacity-90">
                                            {tier.description}
                                        </p>

                                        <ul className="space-y-3 mb-10">
                                            {tier.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 font-body font-medium uppercase tracking-wide text-sm">
                                                    <Check size={16} strokeWidth={4} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <button className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-display font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                                            Select Plan
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
