import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactWidget from './ContactWidget';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [hash]);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-grow"
            >
                {children}
            </motion.main>
            <Footer />
            <ContactWidget />
        </div>
    );
};

export default Layout;
