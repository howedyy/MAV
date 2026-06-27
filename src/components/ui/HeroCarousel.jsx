import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [slides.length, current]);

    const next = () => {
        setDirection(1);
        setCurrent((current + 1) % slides.length);
    };

    const prev = () => {
        setDirection(-1);
        setCurrent((current - 1 + slides.length) % slides.length);
    };

    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? "100%" : "-100%",
        }),
        center: {
            x: 0,
        },
        exit: (dir) => ({
            x: dir < 0 ? "100%" : "-100%",
        })
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-gray-900">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 4.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="w-full h-full object-cover brightness-50"
                    />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                <button onClick={prev} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md">
                    <ChevronLeft size={32} />
                </button>
                <button onClick={next} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md">
                    <ChevronRight size={32} />
                </button>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-accent w-8' : 'bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
