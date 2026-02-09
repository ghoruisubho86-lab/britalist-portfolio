import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Loader2, CheckCircle } from 'lucide-react';
import { useLenis } from 'lenis/react';
import emailjs from '@emailjs/browser';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const timeSlots = [
    "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "4:00 PM"
];

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const lenis = useLenis();
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Status states
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Lock body scroll and Lenis when modal is open
    useEffect(() => {
        if (isOpen) {
            lenis?.stop();
            document.body.style.overflow = 'hidden';
        } else {
            lenis?.start();
            document.body.style.overflow = 'unset';
            // Reset state on close
            setTimeout(() => {
                setStep(1);
                setSelectedDate(null);
                setSelectedTime(null);
                setQuery("");
                setIsSending(false);
                setIsSuccess(false);
                setError(null);
            }, 500);
        }
        return () => {
            lenis?.start();
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, lenis]);

    // Calendar Logic
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentMonth);
    const daysArray = Array.from({ length: days }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleDateClick = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(date);
    };

    const handleSubmit = async () => {
        if (!selectedDate || !selectedTime) return;

        setIsSending(true);
        setError(null);

        // CONFIG: Replace these with your actual EmailJS keys!
        const SERVICE_ID = 'service_leoh6lh';
        const TEMPLATE_ID = 'template_wb8y5i8';
        const PUBLIC_KEY = 's933i7XG6RbvmDyIO';

        const templateParams = {
            to_name: "Subho",
            from_name: "Portfolio Visitor",
            message: query,
            date: selectedDate.toDateString(),
            time: selectedTime,
            reply_to: "visitor@example.com" // ideally you'd ask for their email too
        };

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            setIsSuccess(true);
        } catch (err: any) {
            console.error("EmailJS Error:", err);
            setError(err.message || "Failed to send request.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-stone-900/90 backdrop-blur-sm z-[80] cursor-pointer"
                    />
                    <motion.div
                        className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-10 pointer-events-none"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-stone-100 dark:bg-stone-900 w-full max-w-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 pointer-events-auto flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="p-6 md:p-8 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center bg-stone-200 dark:bg-stone-950">
                                <h2 className="font-display font-black text-2xl uppercase">Schedule a Call</h2>
                                <button onClick={onClose} className="p-2 hover:bg-stone-300 dark:hover:bg-stone-800 rounded-full transition-colors">
                                    <X />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 overflow-y-auto relative min-h-[400px]">

                                {isSuccess ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                        <CheckCircle className="w-20 h-20 text-neon-lime mb-6" />
                                        <h3 className="font-display font-black text-3xl uppercase mb-4">Request Sent!</h3>
                                        <p className="font-body text-xl opacity-70 mb-8">I'll get back to you shortly to confirm the appointment.</p>
                                        <button onClick={onClose} className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 font-display font-bold uppercase hover:scale-105 transition-transform">
                                            Close
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Step Indicator */}
                                        <div className="flex gap-2 mb-8">
                                            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-neon-lime' : 'bg-stone-300 dark:bg-stone-800'}`} />
                                            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-neon-lime' : 'bg-stone-300 dark:bg-stone-800'}`} />
                                            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-neon-lime' : 'bg-stone-300 dark:bg-stone-800'}`} />
                                        </div>

                                        {step === 1 && (
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <button onClick={handlePrevMonth}><ChevronLeft /></button>
                                                    <span className="font-display font-bold text-xl uppercase">
                                                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                                    </span>
                                                    <button onClick={handleNextMonth}><ChevronRight /></button>
                                                </div>

                                                <div className="grid grid-cols-7 gap-2 text-center font-display font-bold mb-2">
                                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="opacity-50">{d}</div>)}
                                                </div>
                                                <div className="grid grid-cols-7 gap-2">
                                                    {emptyDays.map(i => <div key={`empty-${i}`} />)}
                                                    {daysArray.map(day => {
                                                        const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth();
                                                        return (
                                                            <button
                                                                key={day}
                                                                onClick={() => handleDateClick(day)}
                                                                className={`aspect-square flex items-center justify-center font-body font-bold border border-stone-300 dark:border-stone-800 hover:bg-neon-lime hover:text-black hover:border-neon-lime transition-colors ${isSelected ? 'bg-neon-lime text-black border-neon-lime' : ''}`}
                                                            >
                                                                {day}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                                <div className="flex justify-end mt-4">
                                                    <button
                                                        disabled={!selectedDate}
                                                        onClick={() => setStep(2)}
                                                        className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 font-display font-bold uppercase disabled:opacity-50"
                                                    >
                                                        Next: Time
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {step === 2 && (
                                            <div className="space-y-6">
                                                <h3 className="font-display font-bold text-lg uppercase">Select a Time Slot</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    {timeSlots.map(time => (
                                                        <button
                                                            key={time}
                                                            onClick={() => setSelectedTime(time)}
                                                            className={`py-4 border border-stone-300 dark:border-stone-800 font-body font-bold hover:bg-neon-lime hover:text-black hover:border-neon-lime transition-colors ${selectedTime === time ? 'bg-neon-lime text-black border-neon-lime' : ''}`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between mt-8">
                                                    <button onClick={() => setStep(1)} className="underline opacity-50 hover:opacity-100">Back</button>
                                                    <button
                                                        disabled={!selectedTime}
                                                        onClick={() => setStep(3)}
                                                        className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 font-display font-bold uppercase disabled:opacity-50"
                                                    >
                                                        Next: Details
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {step === 3 && (
                                            <div className="space-y-6">
                                                <h3 className="font-display font-bold text-lg uppercase">Project Details</h3>
                                                <textarea
                                                    value={query}
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    placeholder="Tell me about your project..."
                                                    className="w-full h-40 bg-transparent border border-stone-300 dark:border-stone-800 p-4 font-body text-lg focus:outline-none focus:border-neon-lime transition-colors resize-none"
                                                />
                                                <p className="text-sm opacity-60">
                                                    You selected: <span className="text-neon-lime">{selectedDate?.toDateString()}</span> at <span className="text-neon-lime">{selectedTime}</span>
                                                </p>

                                                {error && (
                                                    <div className="p-4 bg-red-500/10 border border-red-500 text-red-500 text-sm">
                                                        {error}
                                                    </div>
                                                )}

                                                <div className="flex justify-between mt-8">
                                                    <button onClick={() => setStep(2)} disabled={isSending} className="underline opacity-50 hover:opacity-100 disabled:opacity-30">Back</button>
                                                    <button
                                                        onClick={handleSubmit}
                                                        disabled={isSending}
                                                        className="bg-neon-lime text-black px-8 py-4 font-display font-bold uppercase hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                                                    >
                                                        {isSending && <Loader2 className="animate-spin" size={20} />}
                                                        {isSending ? "Sending..." : "Send Request"}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
