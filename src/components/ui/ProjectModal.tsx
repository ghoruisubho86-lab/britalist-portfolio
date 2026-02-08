import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useLenis } from 'lenis/react';

interface Project {
    title: string;
    category: string;
    img: string;
    description?: string;
    year?: string;
    client?: string;
}

interface ProjectModalProps {
    selectedProject: Project | null;
    onClose: () => void;
}

export function ProjectModal({ selectedProject, onClose }: ProjectModalProps) {

    // Lock body scroll and Lenis when modal is open
    const lenis = useLenis();

    useEffect(() => {
        if (selectedProject) {
            lenis?.stop();
            document.body.style.overflow = 'hidden';
        } else {
            lenis?.start();
            document.body.style.overflow = 'unset';
        }
        return () => {
            lenis?.start();
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject, lenis]);

    return (
        <AnimatePresence>
            {selectedProject && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-stone-900/90 backdrop-blur-sm z-[60] cursor-pointer"
                    />
                    <motion.div
                        layoutId={`card-${selectedProject.title}`}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10 pointer-events-none"
                    >
                        <motion.div
                            className="w-full max-w-6xl h-full md:h-[90vh] bg-stone-100 dark:bg-stone-900 overflow-y-auto pointer-events-auto shadow-2xl border border-stone-200 dark:border-stone-800"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            <button
                                onClick={onClose}
                                className="fixed top-6 right-6 md:top-14 md:right-14 z-50 bg-black text-white dark:bg-white dark:text-black p-4 rounded-full hover:scale-110 transition-transform"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative w-full h-[50vh] md:h-[60vh]">
                                <img
                                    src={selectedProject.img}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 md:p-20">
                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="font-display font-black text-5xl md:text-8xl text-white uppercase"
                                    >
                                        {selectedProject.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="font-body text-neon-lime text-xl uppercase tracking-widest mt-2"
                                    >
                                        {selectedProject.category} — {selectedProject.year || '2024'}
                                    </motion.p>
                                </div>
                            </div>

                            <div className="p-8 md:p-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 text-stone-900 dark:text-stone-100">
                                <div className="md:col-span-2">
                                    <h3 className="font-display font-bold text-2xl uppercase mb-6">Case Study</h3>
                                    <p className="font-body text-lg md:text-xl leading-relaxed opacity-80">
                                        {selectedProject.description || "This project explores the intersection of brutalist architecture and digital interface design. By stripping away unnecessary ornamentation, we focused on raw structure, bold typography, and high-contrast visuals to create an impactful user experience that demands attention."}
                                    </p>
                                    <p className="font-body text-lg md:text-xl leading-relaxed opacity-80 mt-6">
                                        The challenge was to balance the aggressive aesthetic with usability. We utilized micro-interactions and smooth transitions to guide the user through the chaos, resulting in a navigational flow that feels both rebellious and intuitive.
                                    </p>
                                </div>

                                <div>
                                    <div className="border-t border-current pt-6 mb-8">
                                        <h4 className="font-display font-bold uppercase text-sm opacity-50 mb-2">Client</h4>
                                        <p className="font-body text-lg">{selectedProject.client || "Confidential"}</p>
                                    </div>
                                    <div className="border-t border-current pt-6 mb-8">
                                        <h4 className="font-display font-bold uppercase text-sm opacity-50 mb-2">Services</h4>
                                        <ul className="font-body text-lg space-y-1">
                                            <li>Art Direction</li>
                                            <li>UI/UX Design</li>
                                            <li>Development</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Images Grid Placeholder */}
                            <div className="grid grid-cols-2 gap-4 px-8 md:px-20 pb-20">
                                <div className="aspect-video bg-stone-300 dark:bg-stone-800" />
                                <div className="aspect-video bg-stone-300 dark:bg-stone-800" />
                            </div>

                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
