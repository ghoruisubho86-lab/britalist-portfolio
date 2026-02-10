import { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, CheckCircle, Calendar, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const timeSlots = [
    "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "4:00 PM"
];

export function ContactForm() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Status states
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            to_name: "Grainy Grids",
            from_name: "Portfolio Visitor",
            message: query,
            date: selectedDate.toDateString(),
            time: selectedTime,
            reply_to: "visitor@example.com"
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

    if (isSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-stone-200 dark:bg-stone-900 border border-stone-300 dark:border-stone-800">
                <CheckCircle className="w-20 h-20 text-neon-lime mb-6" />
                <h3 className="font-display font-black text-3xl uppercase mb-4">Request Sent!</h3>
                <p className="font-body text-xl opacity-70 mb-8 max-w-md">I'll get back to you shortly to confirm the appointment.</p>
                <button onClick={() => { setIsSuccess(false); setStep(1); setSelectedDate(null); setSelectedTime(null); setQuery(""); }} className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 font-display font-bold uppercase hover:scale-105 transition-transform">
                    Book Another
                </button>
            </div>
        )
    }

    return (
        <div className="bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-md border border-stone-200 dark:border-stone-800 p-6 md:p-10 h-full flex flex-col">
            <div className="mb-8">
                <h3 className="font-display font-black text-3xl uppercase mb-2">Book a Session</h3>
                <div className="flex gap-2">
                    <div className={`h-1 flex-1 transition-colors ${step >= 1 ? 'bg-neon-lime' : 'bg-stone-300 dark:bg-stone-700'}`} />
                    <div className={`h-1 flex-1 transition-colors ${step >= 2 ? 'bg-neon-lime' : 'bg-stone-300 dark:bg-stone-700'}`} />
                    <div className={`h-1 flex-1 transition-colors ${step >= 3 ? 'bg-neon-lime' : 'bg-stone-300 dark:bg-stone-700'}`} />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <button onClick={handlePrevMonth} className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors"><ChevronLeft /></button>
                            <span className="font-display font-bold text-xl uppercase">
                                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </span>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors"><ChevronRight /></button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center font-display font-bold mb-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="opacity-50 text-sm">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-2 mb-auto">
                            {emptyDays.map((_, i) => <div key={`empty-${i}`} />)}
                            {daysArray.map(day => {
                                const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth();
                                return (
                                    <button
                                        key={day}
                                        onClick={() => handleDateClick(day)}
                                        className={`aspect-square flex items-center justify-center font-body font-bold text-sm border border-stone-200 dark:border-stone-700 hover:bg-neon-lime hover:text-black hover:border-neon-lime transition-colors ${isSelected ? 'bg-neon-lime text-black border-neon-lime' : ''}`}
                                    >
                                        {day}
                                    </button>
                                )
                            })}
                        </div>
                        <div className="flex justify-end mt-8">
                            <button
                                disabled={!selectedDate}
                                onClick={() => setStep(2)}
                                className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 font-display font-bold uppercase disabled:opacity-50 hover:scale-105 transition-transform"
                            >
                                Next: Time
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex-1 flex flex-col"
                    >
                        <h4 className="font-display font-bold text-lg uppercase mb-6 flex items-center gap-2">
                            <Calendar size={20} className="text-neon-lime" /> {selectedDate?.toDateString()}
                        </h4>
                        <div className="grid grid-cols-2 gap-4 mb-auto">
                            {timeSlots.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-4 border border-stone-200 dark:border-stone-700 font-body font-bold hover:bg-neon-lime hover:text-black hover:border-neon-lime transition-colors ${selectedTime === time ? 'bg-neon-lime text-black border-neon-lime' : ''}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between mt-8">
                            <button onClick={() => setStep(1)} className="underline opacity-50 hover:opacity-100 uppercase font-bold text-sm">Back</button>
                            <button
                                disabled={!selectedTime}
                                onClick={() => setStep(3)}
                                className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 font-display font-bold uppercase disabled:opacity-50 hover:scale-105 transition-transform"
                            >
                                Next: Details
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="mb-6 space-y-2">
                            <div className="flex items-center gap-2 font-display font-bold text-sm opacity-70">
                                <Calendar size={16} /> {selectedDate?.toDateString()}
                            </div>
                            <div className="flex items-center gap-2 font-display font-bold text-sm opacity-70">
                                <Clock size={16} /> {selectedTime}
                            </div>
                        </div>

                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Tell me a bit about your project..."
                            className="w-full h-40 bg-transparent border border-stone-300 dark:border-stone-700 p-4 font-body text-lg focus:outline-none focus:border-neon-lime transition-colors resize-none mb-4"
                        />

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500 text-red-500 text-sm mb-4">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-between mt-auto">
                            <button onClick={() => setStep(2)} disabled={isSending} className="underline opacity-50 hover:opacity-100 uppercase font-bold text-sm disabled:opacity-30">Back</button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSending}
                                className="bg-neon-lime text-black px-8 py-4 font-display font-bold uppercase hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {isSending && <Loader2 className="animate-spin" size={20} />}
                                {isSending ? "Sending..." : "Confirm Booking"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
