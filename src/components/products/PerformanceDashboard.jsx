import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, ShieldCheck, Thermometer, Droplets, Building2, FileText, CheckCircle2, Award, Sparkles } from 'lucide-react';

const PerformanceDashboard = ({ specs }) => {
    if (!specs) return null;

    const { title, subtitle, manufacturer, performance, standards } = specs;

    const perfCards = [
        {
            title: 'Nominal Pressure',
            value: performance?.class || '1.6 MPa (PN16)',
            sub: 'Standard Class Rating',
            icon: <Gauge className="w-6 h-6 text-blue-500" />,
            glow: 'group-hover:shadow-blue-500/20',
            bg: 'from-blue-500/10 via-blue-500/5 to-transparent',
            border: 'hover:border-blue-500/40'
        },
        {
            title: 'Shell Test Pressure',
            value: performance?.shellTest || '2.4 MPa',
            sub: '1.5x Hydrostatic Shell Test',
            icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
            glow: 'group-hover:shadow-emerald-500/20',
            bg: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
            border: 'hover:border-emerald-500/40'
        },
        {
            title: 'Seat Test (Water)',
            value: performance?.seatTestWater || '1.76 MPa',
            sub: '1.1x Hydrostatic Closure',
            icon: <Droplets className="w-6 h-6 text-cyan-500" />,
            glow: 'group-hover:shadow-cyan-500/20',
            bg: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
            border: 'hover:border-cyan-500/40'
        },
        {
            title: 'Seat Test (Air)',
            value: performance?.seatTestAir || '0.6 MPa',
            sub: 'Pneumatic Zero-Leakage Test',
            icon: <Gauge className="w-6 h-6 text-amber-500" />,
            glow: 'group-hover:shadow-amber-500/20',
            bg: 'from-amber-500/10 via-amber-500/5 to-transparent',
            border: 'hover:border-amber-500/40'
        },
        {
            title: 'Working Temperature',
            value: performance?.suitableTemp || '-10 °C to 200 °C',
            sub: 'Thermal Tolerance Span',
            icon: <Thermometer className="w-6 h-6 text-rose-500" />,
            glow: 'group-hover:shadow-rose-500/20',
            bg: 'from-rose-500/10 via-rose-500/5 to-transparent',
            border: 'hover:border-rose-500/40'
        },
        {
            title: 'Fluid Compatibility',
            value: performance?.suitableMedium || 'W.O.G. (Water, Oil, Gas)',
            sub: 'Process Medium Compatibility',
            icon: <Droplets className="w-6 h-6 text-violet-500" />,
            glow: 'group-hover:shadow-violet-500/20',
            bg: 'from-violet-500/10 via-violet-500/5 to-transparent',
            border: 'hover:border-violet-500/40'
        }
    ];

    return (
        <div className="mb-20">
            {/* Ambient Hero Tech Banner */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-[32px] p-8 md:p-10 shadow-2xl mb-12 relative overflow-hidden border border-white/10"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-extrabold uppercase tracking-wider shadow-sm">
                                <Sparkles className="w-3.5 h-3.5" /> Technical Datasheet
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-mono border border-white/10">
                                <Award className="w-3.5 h-3.5 text-amber-400" /> ISO 9001 / DIN Standard Compliance
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mb-3">
                            {title || 'DIN Gland Seal Globe Valve PN16'}
                        </h2>
                        <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl">
                            {subtitle || 'Heavy Duty Industrial Valve Specification'}
                        </p>
                    </div>

                    {manufacturer && (
                        <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/15 shadow-xl hover:border-accent/40 transition-colors">
                            <div className="text-xs uppercase tracking-wider text-accent font-bold mb-2 flex items-center gap-2">
                                <Building2 className="w-4 h-4" /> Manufacturer Specification
                            </div>
                            <div className="font-bold text-white text-lg leading-tight font-serif">
                                {manufacturer}
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> Verified OEM Technical Specification
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Performance Metric Grid */}
            <div className="mb-14">
                <div className="flex items-center mb-8">
                    <div className="w-2.5 h-8 bg-gradient-to-b from-accent to-blue-600 rounded-full mr-3 rtl:mr-0 rtl:ml-3 shadow-md" />
                    <div>
                        <h3 className="text-2xl font-bold dark:text-white">Performance Specifications</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Validated hydrostatic and pneumatic pressure ratings</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {perfCards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`p-6 rounded-3xl bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/80 shadow-md ${card.glow} ${card.border} transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-50 pointer-events-none`} />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">{card.title}</span>
                                    <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/80 shadow-inner group-hover:scale-110 transition-transform">
                                        {card.icon}
                                    </div>
                                </div>
                                <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1.5 font-mono group-hover:text-accent transition-colors">
                                    {card.value}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {card.sub}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Engineering Standards Compliance Badges */}
            {standards && standards.length > 0 && (
                <div>
                    <div className="flex items-center mb-8">
                        <div className="w-2.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3 rtl:mr-0 rtl:ml-3 shadow-md" />
                        <div>
                            <h3 className="text-2xl font-bold dark:text-white">Design & Inspection Standards</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">International EN, BS, and API engineering compliance</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {standards.map((st, i) => (
                            <motion.div
                                key={st.label || i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:border-blue-500/50 hover:shadow-lg transition-all group flex flex-col justify-between"
                            >
                                <div className="text-xs uppercase tracking-wider font-extrabold text-gray-400 dark:text-gray-500 mb-3 flex items-center justify-between">
                                    <span>{st.label}</span>
                                    <ShieldCheck className="w-4 h-4 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="text-lg font-extrabold text-primary dark:text-blue-400 font-mono tracking-tight group-hover:text-accent transition-colors">
                                    {st.value}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerformanceDashboard;
