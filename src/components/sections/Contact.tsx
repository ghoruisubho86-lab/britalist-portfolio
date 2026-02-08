import { motion } from 'framer-motion';

export function Contact() {
    return (
        <section id="contact" className="min-h-[80vh] flex flex-col justify-end pb-20 px-6 relative z-10 bg-transparent text-white mix-blend-difference">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="border-t border-white/20 pt-20 w-full"
            >
                <h2 className="font-display font-black text-[10vw] leading-[0.9] tracking-tighter uppercase mb-10">
                    LET'S<br />WORK<br />TOGETHER
                </h2>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full font-body text-sm uppercase tracking-wide gap-10">
                    <a href="mailto:hello@subo.design" className="text-2xl hover:text-neon-lime transition-colors underline decoration-1 underline-offset-4">
                        hello@subo.design
                    </a>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-neon-lime transition-colors">Instagram</a>
                        <a href="#" className="hover:text-neon-lime transition-colors">Twitter</a>
                        <a href="#" className="hover:text-neon-lime transition-colors">LinkedIn</a>
                    </div>

                    <div className="text-xs opacity-50">
                        © 2026 SUBO.DESIGN<br />ALL RIGHTS RESERVED
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
