import { Contact } from '../components/sections/Contact';
import { ContactForm } from '../components/ui/ContactForm';

export function ContactPage() {
    return (
        <div className="pt-20 min-h-screen bg-stone-100 dark:bg-stone-950 transition-colors duration-700 relative overflow-hidden flex flex-col">
            <div className="flex-1 px-4 md:px-10 mb-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-stretch pb-20">
                {/* Left: Heading and Contact Info */}
                <div className="flex flex-col justify-between">
                    <div className="relative z-10 pt-10">
                        <h1 className="font-display font-black text-6xl md:text-8xl uppercase text-stone-900 dark:text-white leading-[0.9]">
                            Initiate<br />Protocol
                        </h1>
                        <p className="font-body text-lg md:text-xl mt-8 max-w-md opacity-70 text-stone-900 dark:text-stone-300">
                            Don't send boring emails. If you're ready to build something that screams, I'm listening.
                        </p>
                    </div>

                    <div className="mt-20">
                        <Contact />
                    </div>
                </div>

                {/* Right: Inline Booking/Contact Form */}
                <div className="relative z-10 h-full min-h-[600px]">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
