import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Ruler, Gauge, Thermometer, Box, Settings, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/layout/PageTransition';
import productSpecs from '../data/productSpecs.json';

const DataTable = ({ title, columns, data, isDimensions }) => {
    if (!data || data.length === 0) return null;

    const actualData = isDimensions ? data.slice(1) : data;
    const cols = isDimensions ? Object.keys(data[0]) : columns;

    return (
        <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 dark:text-white">{title}</h3>
            <div className="overflow-x-auto rounded-xl shadow-lg border dark:border-gray-700">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-primary text-white">
                            {cols.map((k, i) => (
                                <th key={i} className="p-4 border-b border-white/10 font-medium">
                                    {isDimensions ? k : k.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {actualData.map((row, i) => (
                            <tr key={i} className="bg-white dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                {cols.map((c, j) => (
                                    <td key={j} className="p-4 border-b dark:border-gray-700 border-gray-100">
                                        {isDimensions ? row[c] : row[c.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ProductDetailPage = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const productMap = {
        'gate-valve': 'gate_valve',
        'globe-valve': 'globe_valve',
        'check-valve': 'check_valve',
        'ball-valve': 'ball_valve',
        'butterfly-valve': 'butterfly_valve',
        'strainer-valve': 'strainer_valve',
    };

    const key = productMap[id];
    const specsData = productSpecs[id];

    if (!key) {
        return (
            <PageTransition>
                <div className="py-40 text-center container mx-auto px-4 dark:bg-gray-900 transition-colors">
                    <h1 className="text-4xl font-bold mb-4 dark:text-white">{t('details.not_found')}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">{t('details.not_found_desc')}</p>
                    <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-full font-bold">
                        {t('details.return')}
                    </Link>
                </div>
            </PageTransition>
        );
    }

    const product = {
        title: t(`details.${key}.title`),
        subtitle: t(`details.${key}.subtitle`),
        desc: t(`details.${key}.desc`),
        specs: [
            { icon: <Ruler />, label: t(`details.${key}.size_label`), values: [t(`details.${key}.size_val`)] },
            { icon: <Gauge />, label: t(`details.${key}.press_label`), values: [t(`details.${key}.press_val`)] },
            { icon: <Thermometer />, label: t(`details.${key}.temp_label`), values: [t(`details.${key}.temp_val`)] },
            { icon: <Box />, label: t(`details.${key}.mat_label`), values: [t(`details.${key}.mat_val`)] },
        ],
        features: [
            t(`details.${key}.feat1`),
            t(`details.${key}.feat2`),
            t(`details.${key}.feat3`),
        ]
    };

    return (
        <PageTransition>
            <section className="pt-32 pb-20 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors">
                <div className="container mx-auto px-4">
                    <nav className="flex mb-8 text-sm text-gray-400 rtl:space-x-reverse rtl:space-x">
                        <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
                        <ChevronRight className="w-4 h-4 mx-2 rtl:rotate-180" />
                        <Link to="/products" className="hover:text-primary">{t('nav.products')}</Link>
                        <ChevronRight className="w-4 h-4 mx-2 rtl:rotate-180" />
                        <span className="text-primary font-medium">{product.title}</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 ltr:text-left rtl:text-right">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-blue-400 mb-6"
                            >
                                {product.title}
                            </motion.h1>
                            <p className="text-xl text-accent font-medium mb-6">{product.subtitle}</p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{product.desc}</p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#quote" className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform">
                                    {t('details.request_quote')}
                                </a>
                                <a href="tel:+201113911199" className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-all">
                                    {t('details.contact_sales')}
                                </a>
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="order-1 lg:order-2 bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl p-4 relative border dark:border-gray-700"
                        >
                            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-[32px] overflow-hidden flex items-center justify-center">
                                <Settings className="w-32 h-32 text-gray-300 dark:text-gray-600 animate-spin-slow" />
                            </div>
                            <div className="absolute top-8 right-8 rtl:right-auto rtl:left-8 bg-accent text-white px-6 py-2 rounded-full font-bold shadow-xl">
                                GB/DIN Certified
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
                <div className="container mx-auto px-4">
                    <h2 className="section-title !text-left rtl:!text-right mb-12 dark:text-blue-400">{t('details.tech_specs')}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {product.specs.map((spec, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border dark:border-gray-700 border-gray-100 hover:border-accent transition-colors">
                                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-accent shadow-sm mb-6">
                                    {spec.icon}
                                </div>
                                <h4 className="text-xl font-bold text-primary dark:text-blue-300 mb-4">{spec.label}</h4>
                                <ul className="space-y-2">
                                    {spec.values.map(val => (
                                        <li key={val} className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                                            <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                                            {val}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
                <div className="container mx-auto px-4">
                    {specsData && (
                        <div className="mb-8">
                            <h2 className="section-title !text-left rtl:!text-right mb-12 dark:text-blue-400">Detailed Specifications</h2>

                            {/* Standard Materials & Dimensions */}
                            {specsData.materials?.length > 0 && (
                                <DataTable
                                    title="Materials"
                                    columns={[{ key: 'no', label: 'No.' }, { key: 'name', label: 'Parts Name' }, { key: 'material', label: 'Material' }]}
                                    data={specsData.materials}
                                />
                            )}
                            {specsData.dimensions?.length > 0 && (
                                <DataTable
                                    title="Dimensions"
                                    isDimensions={true}
                                    data={specsData.dimensions}
                                />
                            )}

                            {/* Strainer Specific Tables */}
                            {specsData.heavy_materials?.length > 0 && (
                                <div className="mt-16">
                                    <h3 className="text-2xl font-bold mb-8 dark:text-blue-300 border-l-4 border-accent pl-4">Heavy Strainer Valve</h3>
                                    <DataTable
                                        title="Materials"
                                        columns={[{ key: 'no', label: 'No.' }, { key: 'name', label: 'Parts Name' }, { key: 'material', label: 'Material' }]}
                                        data={specsData.heavy_materials}
                                    />
                                    <DataTable
                                        title="Dimensions"
                                        isDimensions={true}
                                        data={specsData.heavy_dimensions}
                                    />
                                </div>
                            )}

                            {specsData.light_materials?.length > 0 && (
                                <div className="mt-16">
                                    <h3 className="text-2xl font-bold mb-8 dark:text-blue-300 border-l-4 border-accent pl-4">Light Strainer Valve</h3>
                                    <DataTable
                                        title="Materials"
                                        columns={[{ key: 'no', label: 'No.' }, { key: 'name', label: 'Parts Name' }, { key: 'material', label: 'Material' }]}
                                        data={specsData.light_materials}
                                    />
                                    <DataTable
                                        title="Dimensions"
                                        isDimensions={true}
                                        data={specsData.light_dimensions}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="ltr:text-left rtl:text-right">
                            <h2 className="text-4xl font-serif font-bold mb-8 underline decoration-accent underline-offset-8 decoration-4">{t('details.performance')}</h2>
                            <div className="space-y-4">
                                {product.features.map(f => (
                                    <div key={f} className="flex items-center space-x-4 rtl:space-x-reverse bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <CheckCircle className="text-accent flex-shrink-0" />
                                        <span className="font-medium">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-accent/10 p-12 rounded-[50px] border border-accent/20">
                            <h3 className="text-3xl font-serif font-bold mb-6 text-accent">{t('details.specialized')}</h3>
                            <p className="text-lg text-white/80 mb-8 leading-relaxed">
                                {t('details.specialized_desc')}
                            </p>
                            <button className="w-full bg-accent text-white py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-transform">
                                {t('details.consult')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default ProductDetailPage;
