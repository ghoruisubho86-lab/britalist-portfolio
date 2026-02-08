import { motion } from 'framer-motion';

export function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <motion.div
                className="fixed inset-0 z-50 bg-stone-900 pointer-events-none"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ originY: 0 }}
            />
            <motion.div
                className="fixed inset-0 z-50 bg-stone-900 pointer-events-none"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} // Layered effect
                style={{ originY: 1 }} // Slide up from bottom on enter? No, slide up reveals content
            />
        </>
    );
}

// Actually, let's do a simpler "Curtain" effect.
// Slide black div UP to reveal content (Enter)
// Slide black div UP to cover content (Exit)

export function SlideTransition({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
}
