import { motion } from 'framer-motion';
import { ArrowRight, Circle, Globe, ShieldAlert, DoorClosed, Check, Fan } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/layout/PageTransition';

const ProductsPage = () => {
    const { t } = useTranslation();

    const gbProducts = [
        { id: 'gate-valve', name: 'Gate Valve', icon: <DoorClosed className="w-12 h-12" />, desc: 'Z41H-16C/25/40' },
        { id: 'globe-valve', name: 'Globe Valve', icon: <Globe className="w-12 h-12" />, desc: 'J41H-16C/25/40' },
        { id: 'check-valve', name: 'Check Valve', icon: <Check className="w-12 h-12" />, desc: 'H44H-16C/25/40' },
        { id: 'ball-valve', name: 'Ball Valve', icon: <Circle className="w-12 h-12" />, desc: 'Q41F-16C/25/40' },
        { id: 'butterfly-valve', name: 'Butterfly Valve', icon: <Fan className="w-12 h-12" />, desc: 'D343H-16C/25/40' },
    ];

    const dinProducts = [
        { id: 'gate-valve', name: 'Cast Iron Gate Valve', icon: <DoorClosed className="w-12 h-12" />, desc: 'DIN3352-F4/F5' },
        { id: 'globe-valve', name: 'Cast Iron Globe Valve', icon: <Globe className="w-12 h-12" />, desc: 'DIN3356' },
        { id: 'strainer-valve', name: 'Strainer Valve', icon: <ShieldAlert className="w-12 h-12" />, desc: 'Y-Strainer' },
    ];

    return (
        <PageTransition>
            <div className="pt-32 pb-24 dark:bg-gray-900 transition-colors">
                <div className="container mx-auto px-4">
                    <header className="mb-16 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-blue-400 mb-4"
                        >
                            {t('products.title')}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                        >
                            {t('products.subtitle')}
                        </motion.p>
                    </header>

                    {/* GB Standard */}
                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-8 border-l-4 border-accent pl-4 dark:text-white uppercase tracking-wider">{t('products.gb_valves')}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {gbProducts.map((product) => (
                                <Link key={product.id} to={`/products/${product.id}`} className="group">
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border dark:border-gray-700 hover:border-accent transition-all h-full"
                                    >
                                        <div className="text-primary dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">{product.icon}</div>
                                        <h3 className="text-xl font-bold mb-2 dark:text-white">{product.name}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mb-6 font-mono text-sm">{product.desc}</p>
                                        <div className="flex items-center text-accent font-bold group-hover:gap-2 transition-all">
                                            {t('products.view_details')} <ArrowRight className="ml-2 w-4 h-4 rtl:rotate-180" />
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* DIN Standard */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 border-l-4 border-accent pl-4 dark:text-white uppercase tracking-wider">{t('products.din_valves')}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dinProducts.map((product) => (
                                <Link key={product.id} to={`/products/${product.id}`} className="group">
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border dark:border-gray-700 hover:border-accent transition-all h-full"
                                    >
                                        <div className="text-primary dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">{product.icon}</div>
                                        <h3 className="text-xl font-bold mb-2 dark:text-white">{product.name}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mb-6 font-mono text-sm">{product.desc}</p>
                                        <div className="flex items-center text-accent font-bold group-hover:gap-2 transition-all">
                                            {t('products.view_details')} <ArrowRight className="ml-2 w-4 h-4 rtl:rotate-180" />
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </PageTransition>
    );
};

export default ProductsPage;
