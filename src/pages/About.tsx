import { Footer } from '../components/layout/Footer';

export function About() {
    return (
        <div className="pt-32 px-4 md:px-10 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
                <div>
                    <h1 className="font-display font-black text-6xl md:text-8xl uppercase mb-10 leading-[0.8]">
                        Visual<br />Brutalist
                    </h1>
                    <p className="font-body text-xl md:text-2xl leading-relaxed max-w-lg">
                        I strip away the decoration to reveal the raw structural truth. Design is not about making things pretty; it's about making them work.
                    </p>
                </div>

                <div className="flex flex-col justify-end gap-10">
                    <div className="border-t border-current pt-4">
                        <h3 className="font-display font-bold text-xl uppercase mb-2">Philosophy</h3>
                        <p className="font-body opacity-70">Reject the generic. Embrace the raw. The web is drowning in softness. I bring the concrete, the steel, and the noise.</p>
                    </div>
                    <div className="border-t border-current pt-4">
                        <h3 className="font-display font-bold text-xl uppercase mb-2">Services</h3>
                        <ul className="font-body opacity-70 list-none space-y-1">
                            <li>Creative Direction</li>
                            <li>UI/UX Design</li>
                            <li>Frontend Development</li>
                            <li>Motion Graphics</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="aspect-video w-full bg-stone-300 dark:bg-stone-800 mb-20 grayscale brightness-75 relative overflow-hidden">
                {/* Placeholder for studio image */}
                <div className="absolute inset-0 flex items-center justify-center font-display font-black text-4xl opacity-20 uppercase">
                    Studio Environment
                </div>
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
            </div>

            <Footer />
        </div>
    );
}
