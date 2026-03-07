import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Settings, Home, Info, Factory, Award, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();
    const isRtl = i18n.language === 'ar';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: t('nav.home'), href: '/', icon: <Home className="w-4 h-4" /> },
        { name: t('nav.about'), href: '/#about', icon: <Info className="w-4 h-4" /> },
        {
            name: t('nav.products'),
            href: '/products',
            icon: <Factory className="w-4 h-4" />,
            dropdown: [
                {
                    name: t('nav.gb_standard'),
                    items: [
                        { name: 'Gate Valve', href: '/products/gate-valve' },
                        { name: 'Globe Valve', href: '/products/globe-valve' },
                        { name: 'Check Valve', href: '/products/check-valve' },
                        { name: 'Ball Valve', href: '/products/ball-valve' },
                        { name: 'Butterfly Valve', href: '/products/butterfly-valve' },
                    ],
                },
                {
                    name: t('nav.din_standard'),
                    items: [
                        { name: 'Cast Iron Gate', href: '/products/gate-valve' },
                        { name: 'Cast Iron Globe', href: '/products/globe-valve' },
                        { name: 'Strainer Valve', href: '/products/strainer-valve' },
                    ],
                },
            ],
        },
        { name: t('nav.certifications'), href: '/#certifications', icon: <Award className="w-4 h-4" /> },
        { name: t('nav.contact'), href: '/#contact', icon: <Mail className="w-4 h-4" /> },
    ];

    const [mobileExpanded, setMobileExpanded] = useState(null);

    return (
        <nav
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center text-primary font-serif font-bold text-2xl group">
                    <Settings className="w-8 h-8 mr-2 ml-2 text-primary group-hover:rotate-90 transition-transform duration-500" />
                    <span className={clsx(isScrolled ? 'text-[#1e3c72] dark:text-blue-400' : 'text-white')}>MAV Egypt</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group">
                            <Link
                                to={link.href}
                                className={clsx(
                                    'flex items-center font-medium transition-colors hover:text-accent relative py-2 gap-2',
                                    isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'
                                )}
                                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                            >
                                {link.icon}
                                {link.name}
                                {link.dropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-yellow-500 transition-all group-hover:w-full" />
                            </Link>

                            {/* Desktop Dropdown */}
                            {link.dropdown && activeDropdown === link.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden py-2"
                                >
                                    {link.dropdown.map((category) => (
                                        <div key={category.name} className="px-4 py-2">
                                            <h4 className="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-wider mb-2 border-b dark:border-gray-700 pb-1">
                                                {category.name}
                                            </h4>
                                            {category.items.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className="block px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-accent hover:text-white rounded-md transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ))}

                    <div className="flex items-center space-x-4 rtl:space-x-reverse border-l dark:border-gray-700 pl-4 rtl:pl-0 rtl:pr-4">
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="lg:hidden flex items-center space-x-4">
                    <ThemeToggle />
                    <button
                        className={clsx('p-2', isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white')}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6 max-h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
                            <div className="pb-4 border-b dark:border-gray-800 flex justify-between items-center">
                                <span className="font-bold text-gray-400 uppercase text-xs tracking-widest">{t('nav.settings') || 'Settings'}</span>
                                <LanguageSwitcher />
                            </div>

                            <div className="mt-6 space-y-2">
                                {navLinks.map((link) => (
                                    <div key={link.name} className="border-b dark:border-gray-800/50 last:border-none">
                                        <div className="flex justify-between items-center py-3">
                                            <Link
                                                to={link.href}
                                                className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-accent transition-colors gap-3"
                                            >
                                                {link.icon}
                                                {link.name}
                                            </Link>

                                            {link.dropdown && (
                                                <button
                                                    onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                                                    className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl"
                                                >
                                                    <ChevronDown className={clsx(
                                                        "w-5 h-5 transition-transform duration-300",
                                                        mobileExpanded === link.name ? "rotate-180" : ""
                                                    )} />
                                                </button>
                                            )}
                                        </div>

                                        {link.dropdown && (
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    height: mobileExpanded === link.name ? 'auto' : 0,
                                                    opacity: mobileExpanded === link.name ? 1 : 0
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-8 pb-4 space-y-6 mt-2 border-l-2 border-accent/20">
                                                    {link.dropdown.map((cat) => (
                                                        <div key={cat.name}>
                                                            <span className="text-xs font-black text-gray-400 uppercase tracking-tighter block mb-3">{cat.name}</span>
                                                            <div className="grid gap-3">
                                                                {cat.items.map((item) => (
                                                                    <Link
                                                                        key={item.name}
                                                                        to={item.href}
                                                                        className="text-gray-600 dark:text-gray-400 hover:text-accent font-medium flex items-center group"
                                                                    >
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-2 group-hover:bg-accent transition-colors" />
                                                                        {item.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
