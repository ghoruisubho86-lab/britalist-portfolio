import { Hero } from '../components/sections/Hero';
import { Roadmap } from '../components/sections/Roadmap';
import { Contact } from '../components/sections/Contact';
import { Pricing } from '../components/sections/Pricing';
import { Testimonials } from '../components/sections/Testimonials';
import { FAQ } from '../components/sections/FAQ';
import { ScheduleCall } from '../components/sections/ScheduleCall';
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div className="w-full">
            <Hero />
            <Roadmap />
            <Pricing />
            <Testimonials />
            <FAQ />
            <ScheduleCall />
            <div className="py-20 flex justify-center bg-stone-100 dark:bg-stone-950">
                <Link
                    to="/work"
                    className="font-display text-4xl uppercase border-b-2 border-current hover:text-neon-lime hover:border-neon-lime transition-colors"
                >
                    View All Work
                </Link>
            </div>
            <Contact />
        </div>
    );
}
