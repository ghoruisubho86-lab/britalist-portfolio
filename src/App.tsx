import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { useTheme } from './hooks/use-theme';
import { GrainOverlay } from './components/ui/GrainOverlay';
import { CustomCursor } from './components/ui/CustomCursor';
import { SlideTransition } from './components/layout/PageTransition';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { About } from './pages/About';
import { ContactPage } from './pages/ContactPage';
import { AnimatePresence } from 'framer-motion';

import { useState, useEffect } from 'react';
import { Loader } from './components/ui/Loader';

// ... imports ...

function AppContent() {
    const location = useLocation();
    const { theme } = useTheme();
    const [loading, setLoading] = useState(true);

    // Initial load simulation or check
    useEffect(() => {
        // You could check multiple assets here if needed
        // For now, the Loader component handles its own timing
    }, []);

    return (
        <SmoothScroll>
            {loading && <Loader onComplete={() => {
                window.scrollTo(0, 0);
                setLoading(false);
            }} />}

            <div className={`relative w-full min-h-screen transition-colors duration-700 ${theme === 'dark' ? 'bg-stone-950 text-stone-50' : 'bg-stone-100 text-stone-900'}`}>

                <CustomCursor />
                <GrainOverlay />
                <Navbar />

                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<SlideTransition><Home /></SlideTransition>} />
                        <Route path="/work" element={<SlideTransition><Work /></SlideTransition>} />
                        <Route path="/about" element={<SlideTransition><About /></SlideTransition>} />
                        <Route path="/contact" element={<SlideTransition><ContactPage /></SlideTransition>} />
                    </Routes>
                </AnimatePresence>

                {/* Floating UI */}
                <ThemeToggle />
            </div>
        </SmoothScroll>
    );
}

function App() {
    return (
        <Router basename="/britalist-portfolio">
            <AppContent />
        </Router>
    );
}

export default App;
