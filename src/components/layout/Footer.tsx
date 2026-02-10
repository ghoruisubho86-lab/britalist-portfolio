export function Footer() {
    return (
        <footer id="contact" className="min-h-[80vh] flex flex-col justify-end pb-20 px-4 md:px-10 relative z-10 bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-white transition-colors duration-700">
            <div className="border-t border-stone-300 dark:border-stone-800 pt-20 w-full">
                {/* Big Heading */}
                <h2 className="font-display font-black text-[15vw] leading-[0.85] tracking-tighter uppercase mb-20 pointer-events-none select-none">
                    LET'S<br />WORK<br />TOGETHER<span className="text-neon-lime">.</span>
                </h2>

                {/* Footer Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full font-body text-xs md:text-sm uppercase tracking-wide gap-10">

                    {/* Email */}
                    <a href="mailto:hello@grainygrids.com" className="text-xl md:text-2xl font-bold hover:text-neon-lime transition-colors underline decoration-1 underline-offset-4">
                        HELLO@GRAINYGRIDS.COM
                    </a>

                    {/* Socials */}
                    <div className="flex gap-8 font-bold">
                        <a href="#" className="hover:text-neon-lime transition-colors">Instagram</a>
                        <a href="#" className="hover:text-neon-lime transition-colors">Twitter</a>
                        <a href="#" className="hover:text-neon-lime transition-colors">LinkedIn</a>
                    </div>

                    {/* Copyright */}
                    <div className="text-xs opacity-50 text-right">
                        © 2026 GRAINY GRIDS<br />ALL RIGHTS RESERVED
                    </div>
                </div>
            </div>
        </footer>
    );
}
