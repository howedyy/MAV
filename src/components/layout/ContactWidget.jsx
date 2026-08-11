import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Phone, Facebook } from 'lucide-react';
import clsx from 'clsx';

const ContactWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const options = [
        {
            name: 'WhatsApp',
            icon: <MessageCircle className="w-5 h-5" />,
            href: 'https://wa.me/201113911199',
            color: 'bg-[#25D366]',
        },
        {
            name: 'Email',
            icon: <Mail className="w-5 h-5" />,
            href: 'mailto:info@mavegypt.net',
            color: 'bg-[#EA4335]',
        },
        {
            name: 'Facebook',
            icon: <Facebook className="w-5 h-5" />,
            href: 'https://facebook.com/mavegypt',
            color: 'bg-[#1877F2]',
        },
        {
            name: 'Call Us',
            icon: <Phone className="w-5 h-5" />,
            href: 'tel:+201113911199',
            color: 'bg-primary',
        },
    ];

    return (
        <div className={clsx(
            'fixed bottom-8 right-8 z-[60] transition-all duration-1000',
            show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        )}>
            <div className="relative flex flex-col items-end">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 20 }}
                            className="mb-4 flex flex-col space-y-3 items-end"
                        >
                            {options.map((opt) => (
                                <a
                                    key={opt.name}
                                    href={opt.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={clsx(
                                        'flex items-center space-x-3 px-4 py-2 rounded-full text-white shadow-xl hover:scale-105 transition-transform',
                                        opt.color
                                    )}
                                >
                                    <span className="text-sm font-bold">{opt.name}</span>
                                    {opt.icon}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx(
                        'w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:rotate-12',
                        isOpen ? 'bg-red-500' : 'bg-primary'
                    )}
                >
                    {isOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <MessageCircle className="w-7 h-7" />
                    )}
                </button>
            </div>
        </div>
    );
};

// Need to import X for the close button
import { X } from 'lucide-react';

export default ContactWidget;
