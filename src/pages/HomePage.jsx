import { motion } from 'framer-motion';
import { ArrowRight, History, Trophy, Globe, Circle, ShieldAlert, DoorClosed, Check, Fan, MoveRight, Settings, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroCarousel from '../components/ui/HeroCarousel';

// Import images from assets
import hero1 from '../assets/images/hero_valve_1.png';
import hero2 from '../assets/images/hero_valve_2.png';
import hero3 from '../assets/images/hero_valve_3.png';
import heroFacility from '../assets/images/hero_facility.png';
import proValve1 from '../assets/images/pro_valve_1.png';
import proFacility1 from '../assets/images/pro_facility_1.png';
import iso9001 from '../assets/images/iso9001.jpeg';
import iso14001 from '../assets/images/iso14001.jpeg';
import iso45001 from '../assets/images/iso45001.jpeg';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

const HomePage = () => {
    const { t } = useTranslation();

    const slides = [
        { image: hero1, title: 'Precision Engineering' },
        { image: hero2, title: 'Quality Manufacturing' },
        { image: hero3, title: 'Industrial Excellence' },
        { image: heroFacility, title: 'Modern Production' },
        { image: proValve1, title: 'Reliable Performance' },
        { image: proFacility1, title: 'Global Standards' },
    ];

    const features = [
        { icon: <History />, title: t('about.f1_title'), desc: t('about.f1_desc') },
        { icon: <Trophy />, title: t('about.f2_title'), desc: t('about.f2_desc') },
        { icon: <Globe />, title: t('about.f3_title'), desc: t('about.f3_desc') },
    ];

    const productsSummary = [
        { icon: <Circle />, title: 'Ball Valves', desc: 'Precision-engineered for optimal flow control.' },
        { icon: <Globe />, title: 'Globe Valves', desc: 'Reliable valves designed for precise regulation.' },
        { icon: <ShieldAlert />, title: 'Safety Valves', desc: 'Advanced valves ensuring system protection.' },
        { icon: <DoorClosed />, title: 'Gate Valves', desc: 'Robust valves for reliable shut-off applications.' },
        { icon: <Check />, title: 'Check Valves', desc: 'Preventing backflow and ensuring integrity.' },
        { icon: <Fan />, title: 'Butterfly Valves', desc: 'Efficient for large diameter applications.' },
    ];

    const certs = [
        { img: iso9001, title: t('certifications.iso9001') },
        { img: iso14001, title: t('certifications.iso14001') },
        { img: iso45001, title: t('certifications.iso45001') },
    ];

    return (
        <div className="dark:bg-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[95vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <HeroCarousel slides={slides} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl ltr:text-left rtl:text-right">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
                        >
                            {t('hero.title')}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-white/90 font-light mb-8 drop-shadow-md"
                        >
                            {t('hero.subtitle')}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <a href="#about" className="btn-custom flex items-center w-fit group gap-2">
                                {t('hero.cta')} <ArrowRight className="group-hover:translate-x-1 rtl:rotate-180 transition-transform" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-bg-secondary dark:bg-gray-800/50">
                <div className="container mx-auto px-4">
                    <motion.h2 {...fadeInUp} className="section-title dark:text-blue-400">{t('about.title')}</motion.h2>
                    <motion.p {...fadeInUp} className="section-subtitle dark:text-gray-400">{t('about.subtitle')}</motion.p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((item, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeInUp}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all group border dark:border-gray-700"
                            >
                                <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-lg">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 dark:text-white">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Summary Section */}
            <section className="py-24 bg-primary dark:bg-slate-900 border-y dark:border-gray-800 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.h2 {...fadeInUp} className="section-title !text-white">{t('products.title')}</motion.h2>
                    <motion.p {...fadeInUp} className="section-subtitle !text-white/80">{t('products.subtitle')}</motion.p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {productsSummary.map((item, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeInUp}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all text-center group"
                            >
                                <div className="text-accent mb-4 flex justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h4 className="font-bold text-lg mb-2 text-white">{item.title}</h4>
                                <p className="text-sm text-white/60 leading-tight">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/products" className="inline-flex items-center text-accent font-bold text-xl hover:underline group gap-2">
                            {t('products.view_tech')} <MoveRight className="group-hover:translate-x-2 rtl:rotate-180 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section id="certifications" className="py-24 bg-white dark:bg-gray-900 transition-colors">
                <div className="container mx-auto px-4">
                    <motion.h2 {...fadeInUp} className="section-title dark:text-blue-400">{t('certifications.title')}</motion.h2>
                    <motion.p {...fadeInUp} className="section-subtitle dark:text-gray-400">{t('certifications.subtitle')}</motion.p>

                    <div className="grid md:grid-cols-3 gap-12">
                        {certs.map((cert, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeInUp}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative"
                            >
                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border dark:border-gray-700 shadow-lg group-hover:shadow-2xl transition-all">
                                    <div className="aspect-[3/4] overflow-hidden rounded-xl bg-white mb-4">
                                        <img
                                            src={cert.img}
                                            alt={cert.title}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <h4 className="text-lg font-bold text-center dark:text-white px-2">
                                        {cert.title}
                                    </h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeInUp}>
                            <h2 className="text-4xl font-serif font-bold text-primary dark:text-blue-400 mb-6">{t('contact.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">{t('contact.subtitle')}</p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-accent shadow-lg flex-shrink-0">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg dark:text-white mb-1">{t('contact.info_address')}</h4>
                                        <p className="text-gray-500 dark:text-gray-400">{t('contact.info_address_val')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-accent shadow-lg flex-shrink-0">
                                        <History className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg dark:text-white mb-1">{t('contact.info_hours')}</h4>
                                        <p className="text-gray-500 dark:text-gray-400">{t('contact.info_hours_val')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-[40px] shadow-2xl border dark:border-gray-700"
                            id="quote"
                        >
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('contact.form_name')}</label>
                                        <input type="text" className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent transition-all text-gray-800 dark:text-gray-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('contact.form_email')}</label>
                                        <input type="email" className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent transition-all text-gray-800 dark:text-gray-200" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('contact.form_subject')}</label>
                                    <input type="text" className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent transition-all text-gray-800 dark:text-gray-200" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('contact.form_message')}</label>
                                    <textarea rows="4" className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent transition-all text-gray-800 dark:text-gray-200"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                                    {t('contact.form_send')}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
