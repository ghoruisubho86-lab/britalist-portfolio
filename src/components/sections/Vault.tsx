import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

const secretProjects = [
    {
        title: "Fintech App",
        category: "Product Design",
        year: "2025",
        description: "Confidential banking application redesign for a Fortune 500 client.",
        tags: ["UX Strategy", "Design System", "Prototyping"]
    },
    {
        title: "Stealth Startup",
        category: "Branding & Web",
        year: "2024",
        description: "Full brand identity and platform launch for an AI-driven logistics network.",
        tags: ["Identity", "Webflow", "3D Motion"]
    }
];

export function Vault() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'Work_2025') {
            setIsUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setPassword('');
        }
    };

    return (
        <section className="py-20 px-4 md:px-10 relative bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors duration-700 border-t border-stone-300 dark:border-stone-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-20">
                    <div className="p-3 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-none">
                        {isUnlocked ? <Unlock size={24} /> : <Lock size={24} />}
                    </div>
                    <h2 className="font-display font-black text-5xl md:text-7xl uppercase">The Vault</h2>
                </div>

                <AnimatePresence mode="wait">
                    {!isUnlocked ? (
                        <motion.div
                            key="locked"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-xl"
                        >
                            <p className="font-body text-xl mb-10 opacity-70">
                                This section contains restricted whitelabel projects. Access requires a passkey provided during consultation.
                            </p>

                            <form onSubmit={handleUnlock} className="flex flex-col gap-6">
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError(false);
                                        }}
                                        placeholder="ENTER PASSKEY"
                                        className="w-full bg-transparent border-b-2 border-stone-400 dark:border-stone-600 py-4 font-display text-2xl md:text-4xl uppercase placeholder:text-stone-400/50 focus:outline-none focus:border-neon-lime-dark dark:focus:border-neon-lime transition-colors"
                                    />
                                    {error && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute -bottom-8 left-0 font-body text-red-500 uppercase text-sm font-bold tracking-widest"
                                        >
                                            Access Denied
                                        </motion.span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="self-start py-4 px-8 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-display font-bold uppercase tracking-widest hover:bg-neon-lime-dark dark:hover:bg-neon-lime hover:text-white dark:hover:text-black transition-colors"
                                >
                                    Unlock Access
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unlocked"
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-10"
                        >
                            {secretProjects.map((project, i) => (
                                <div key={i} className="border border-stone-300 dark:border-stone-700 p-8 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors duration-300">
                                    <div className="flex justify-between items-start mb-10">
                                        <span className="font-body text-sm opacity-50 uppercase tracking-widest">{project.category}</span>
                                        <span className="font-body text-sm opacity-50">{project.year}</span>
                                    </div>
                                    <h3 className="font-display font-black text-3xl md:text-5xl uppercase mb-4">{project.title}</h3>
                                    <p className="font-body text-lg opacity-80 mb-8 max-w-sm">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, t) => (
                                            <span key={t} className="px-3 py-1 border border-current text-xs font-bold uppercase tracking-wide opacity-60">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
