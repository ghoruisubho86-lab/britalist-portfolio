import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/use-theme';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 shadow-xl border-2 border-transparent hover:border-neon-lime transition-colors"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.button>
    );
}
