import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Magnetic } from '../ui/Magnetic';
import logo from '../../assets/logo.png';

export function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();
    const lastY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastY.current;
        if (Math.abs(diff) > 50) {
            setHidden(diff > 0);
            lastY.current = latest;
        }
    });

    const toggleMenu = () => setMobileOpen(!mobileOpen);

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/50 dark:bg-stone-950/50 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-800/50 text-stone-900 dark:text-white pointer-events-none transition-colors duration-700"
            >
                <Magnetic>
                    <Link to="/" className="block p-2 relative z-50">
                        <img src={logo} alt="Grainy Grids" className="h-10 w-auto" />
                    </Link>
                </Magnetic>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 font-body font-medium uppercase text-sm pointer-events-auto">
                    <Magnetic>
                        <Link to="/work" className="block p-2 hover:text-neon-lime transition-colors">Work</Link>
                    </Magnetic>
                    <Magnetic>
                        <Link to="/about" className="block p-2 hover:text-neon-lime transition-colors">About</Link>
                    </Magnetic>
                    <Magnetic>
                        <Link to="/contact" className="block p-2 hover:text-neon-lime transition-colors">Contact</Link>
                    </Magnetic>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden pointer-events-auto relative z-50" onClick={toggleMenu}>
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 text-white md:hidden"
                    >
                        <Link to="/" onClick={toggleMenu} className="font-display font-black text-4xl uppercase hover:text-neon-lime transition-colors">Home</Link>
                        <Link to="/work" onClick={toggleMenu} className="font-display font-black text-4xl uppercase hover:text-neon-lime transition-colors">Work</Link>
                        <Link to="/about" onClick={toggleMenu} className="font-display font-black text-4xl uppercase hover:text-neon-lime transition-colors">About</Link>
                        <Link to="/contact" onClick={toggleMenu} className="font-display font-black text-4xl uppercase hover:text-neon-lime transition-colors">Contact</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
