import { useState } from 'react';
import { Magnetic } from '../ui/Magnetic';
import { BookingModal } from '../ui/BookingModal';

export function ScheduleCall() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="py-40 px-4 md:px-10 bg-stone-900 text-stone-100 flex flex-col items-center justify-center text-center">
                <p className="font-body uppercase tracking-widest mb-10 text-neon-lime">Ready to disrupt?</p>

                <h2 className="font-display font-black text-[12vw] leading-none mb-10 hover:text-stone-500 transition-colors duration-500 cursor-default">
                    LET'S<br />TALK
                </h2>

                <Magnetic>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-block bg-neon-lime text-black font-display font-bold text-xl md:text-2xl py-6 px-12 rounded-full uppercase hover:scale-110 transition-transform duration-300"
                    >
                        Schedule a Call
                    </button>
                </Magnetic>
            </section>

            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
