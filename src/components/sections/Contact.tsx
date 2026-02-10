

export function Contact() {
    return (
        <div id="contact" className="flex flex-col gap-8 text-stone-900 dark:text-white font-body text-sm uppercase tracking-wide">
            <a href="mailto:hello@grainygrids.com" className="text-2xl md:text-4xl hover:text-neon-lime transition-colors font-display font-bold">
                hello@grainygrids.com
            </a>

            <div className="flex gap-6 text-lg">
                <a href="#" className="hover:text-neon-lime transition-colors">Instagram</a>
                <a href="#" className="hover:text-neon-lime transition-colors">Twitter</a>
                <a href="#" className="hover:text-neon-lime transition-colors">LinkedIn</a>
            </div>

            <div className="text-xs opacity-50 mt-4">
                © 2026 GRAINY GRIDS<br />ALL RIGHTS RESERVED
            </div>
        </div>
    );
}
