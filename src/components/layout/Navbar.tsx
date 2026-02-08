import { useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Magnetic } from '../ui/Magnetic';

export function Navbar() {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const lastY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastY.current;
        if (Math.abs(diff) > 50) {
            setHidden(diff > 0);
            lastY.current = latest;
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference text-white pointer-events-none"
        >
            <Magnetic>
                <Link to="/" className="block font-display font-bold text-2xl tracking-tighter uppercase pointer-events-auto cursor-pointer p-2">
                    SUBO.DESIGN
                </Link>
            </Magnetic>

            <div className="hidden md:flex gap-8 font-body font-medium uppercase text-sm pointer-events-auto">
                <Magnetic>
                    <Link to="/work" className="block p-2 hover:text-neon-lime transition-colors">Work</Link>
                </Magnetic>
                <Magnetic>
                    <Link to="/about" className="block p-2 hover:text-neon-lime transition-colors">About</Link>
                </Magnetic>
                <Magnetic>
                    <a href="#contact" className="block p-2 hover:text-neon-lime transition-colors">Contact</a>
                </Magnetic>
            </div>

            <div className="md:hidden pointer-events-auto">
                <Menu className="w-6 h-6" />
            </div>
        </motion.nav>
    );
}
