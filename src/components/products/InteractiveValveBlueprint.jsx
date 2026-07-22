import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler, Search, ArrowRight, Compass, Shield, Zap, Sparkles } from 'lucide-react';

const InteractiveValveBlueprint = ({ dimensions }) => {
    const [selectedDn, setSelectedDn] = useState('DN50');
    const [unit, setUnit] = useState('mm'); // 'mm' | 'in'
    const [searchQuery, setSearchQuery] = useState('');

    if (!dimensions || dimensions.length === 0) return null;

    const selectedData = dimensions.find(d => d.DN === selectedDn) || dimensions[0];

    const cleanStr = (val) => {
        if (!val) return '---';
        return val.toString().replace(/\?/g, 'ø');
    };

    const convertVal = (val) => {
        if (!val || val === '---' || val === '--- mm') return '---';
        const cleaned = cleanStr(val);
        if (cleaned.includes('ø') || cleaned.includes('kg') || cleaned.includes('-')) return cleaned;
        if (unit === 'in') {
            const num = parseFloat(cleaned);
            if (isNaN(num)) return cleaned;
            return (num / 25.4).toFixed(2) + ' in';
        }
        return cleaned + ' mm';
    };

    const getHolesVal = (row) => {
        return cleanStr(row['Z-ød'] || row['Z-?d'] || row.holes || '---');
    };

    const getHeightVal = (row) => {
        return convertVal(row.H || row['?H (CLOSED)'] || row['H (Closed)'] || '---');
    };

    const getHandwheelVal = (row) => {
        return convertVal(row.W || row['Handwheel (W)'] || '---');
    };

    const filteredDimensions = dimensions.filter(row => {
        const query = searchQuery.toLowerCase();
        const holes = getHolesVal(row).toLowerCase();
        return (
            row.DN?.toLowerCase().includes(query) ||
            row.size?.toString().includes(query) ||
            holes.includes(query) ||
            row.L?.toString().includes(query)
        );
    });

    return (
        <div className="mb-20">
            {/* Header & Unit Switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center">
                    <div className="w-2.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3 rtl:mr-0 rtl:ml-3 shadow-md"></div>
                    <div>
                        <h3 className="text-2xl font-bold dark:text-white">Interactive Dimensions & CAD Blueprint</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Select nominal size pills to dynamically compute flange dimensions and tolerance parameters.
                        </p>
                    </div>
                </div>

                {/* Unit Switcher Pill */}
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-inner">
                    <button
                        onClick={() => setUnit('mm')}
                        className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 ${
                            unit === 'mm'
                                ? 'bg-primary text-white shadow-md shadow-primary/30'
                                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'
                        }`}
                    >
                        Metric (mm)
                    </button>
                    <button
                        onClick={() => setUnit('in')}
                        className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 ${
                            unit === 'in'
                                ? 'bg-primary text-white shadow-md shadow-primary/30'
                                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'
                        }`}
                    >
                        Imperial (inch)
                    </button>
                </div>
            </div>

            {/* Size Selector Bar */}
            <div className="mb-8 overflow-x-auto pb-2 scrollbar-thin">
                <div className="flex gap-2.5 min-w-max">
                    {dimensions.map((d) => (
                        <button
                            key={d.DN}
                            onClick={() => setSelectedDn(d.DN)}
                            className={`px-5 py-3 rounded-2xl font-extrabold text-xs tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                                selectedDn === d.DN
                                    ? 'bg-accent text-white border-accent shadow-xl shadow-accent/30 scale-105 ring-2 ring-accent/30'
                                    : 'bg-white dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-accent/50'
                            }`}
                        >
                            <span className={`w-2 h-2 rounded-full ${selectedDn === d.DN ? 'bg-white' : 'bg-accent'}`} />
                            {d.DN}
                        </button>
                    ))}
                </div>
            </div>

            {/* CAD Blueprint Console Card */}
            <div className="bg-slate-950 text-white rounded-[32px] p-8 md:p-10 shadow-2xl mb-14 border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                    {/* Visual Vector Blueprint Workstation */}
                    <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 relative flex flex-col items-center justify-between min-h-[360px] shadow-inner">
                        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
                            <span className="flex items-center gap-2 text-accent font-bold">
                                <Compass className="w-4 h-4" /> CAD FLANGE VECTOR ENGINE ({selectedDn})
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-blue-300 font-bold border border-slate-700">
                                SCALE 1:1
                            </span>
                        </div>

                        {/* Interactive Vector Valve Schematic */}
                        <div className="w-full max-w-sm relative flex flex-col items-center my-auto">
                            {/* Handwheel Top */}
                            <div className="relative mb-2 flex flex-col items-center">
                                <div className="w-40 h-7 border-2 border-accent/80 rounded-full bg-accent/15 flex items-center justify-center text-[10px] font-mono text-accent shadow-lg shadow-accent/20">
                                    Handwheel (W: {getHandwheelVal(selectedData)})
                                </div>
                                <div className="w-2.5 h-8 bg-slate-700"></div>
                            </div>

                            {/* Bonnet & Stem */}
                            <div className="w-32 h-20 bg-slate-800/90 border-2 border-slate-600 rounded-t-2xl flex flex-col items-center justify-center relative shadow-md">
                                <span className="text-[10px] font-mono text-slate-400">Height (H)</span>
                                <span className="text-sm font-extrabold text-accent font-mono">{getHeightVal(selectedData)}</span>
                            </div>

                            {/* Main Body Flange Face */}
                            <div className="w-full h-28 bg-slate-800/90 border-2 border-blue-500/80 rounded-2xl flex items-center justify-between px-4 relative shadow-xl">
                                {/* Left Flange */}
                                <div className="w-7 h-32 bg-blue-600/30 border-2 border-blue-400 rounded-md -ml-5 flex flex-col items-center justify-between py-2 shadow-md">
                                    <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
                                </div>

                                <div className="text-center font-mono py-2">
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Face-to-Face (L)</div>
                                    <div className="text-2xl font-extrabold text-accent">{convertVal(selectedData.L)}</div>
                                </div>

                                {/* Right Flange */}
                                <div className="w-7 h-32 bg-blue-600/30 border-2 border-blue-400 rounded-md -mr-5 flex flex-col items-center justify-between py-2 shadow-md">
                                    <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                            <span>PN Rating: PN16</span>
                            <span>Standard: DIN 3202 F1</span>
                        </div>
                    </div>

                    {/* Parameter Specs Grid */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div>
                                <span className="text-xs uppercase tracking-widest text-slate-400 font-extrabold">Active Nominal Size</span>
                                <div className="text-3xl font-extrabold font-mono text-white mt-0.5">{selectedData.DN}</div>
                            </div>
                            <span className="px-3.5 py-1.5 rounded-2xl bg-accent/20 border border-accent/40 text-accent font-mono text-xs font-bold">
                                Size Ref: {selectedData.size || selectedData.DN}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                                <div className="text-[11px] text-slate-400 font-extrabold uppercase mb-1">Outer Flange Dia. (D)</div>
                                <div className="text-lg font-extrabold text-white font-mono">{convertVal(selectedData.D)}</div>
                            </div>

                            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                                <div className="text-[11px] text-slate-400 font-extrabold uppercase mb-1">Bolt Circle Dia. (D1)</div>
                                <div className="text-lg font-extrabold text-white font-mono">{convertVal(selectedData.D1)}</div>
                            </div>

                            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                                <div className="text-[11px] text-slate-400 font-extrabold uppercase mb-1">Raised Face Dia. (D2)</div>
                                <div className="text-lg font-extrabold text-white font-mono">{convertVal(selectedData.D2)}</div>
                            </div>

                            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                                <div className="text-[11px] text-slate-400 font-extrabold uppercase mb-1">Raised Face Ht. (f)</div>
                                <div className="text-lg font-extrabold text-white font-mono">{convertVal(selectedData.f)}</div>
                            </div>

                            <div className="bg-slate-900/80 p-4 rounded-2xl border border-accent/40 bg-accent/5">
                                <div className="text-[11px] text-accent font-extrabold uppercase mb-1 flex items-center gap-1">
                                    <Zap className="w-3 h-3" /> Drilling (Z-ød)
                                </div>
                                <div className="text-lg font-extrabold text-accent font-mono">{getHolesVal(selectedData)}</div>
                            </div>

                            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                                <div className="text-[11px] text-slate-400 font-extrabold uppercase mb-1">Face-to-Face (L)</div>
                                <div className="text-lg font-extrabold text-white font-mono">{convertVal(selectedData.L)}</div>
                            </div>
                        </div>

                        <div className="pt-3">
                            <a
                                href="#quote"
                                className="w-full bg-accent hover:bg-accent/90 text-white font-extrabold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-accent/30 transition-all hover:scale-[1.02]"
                            >
                                Request Technical Quote for {selectedData.DN} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Complete Dimension Matrix Table */}
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h4 className="text-xl font-bold dark:text-white">Complete Dimension Matrix Table</h4>

                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
                        <input
                            type="text"
                            placeholder="Filter size or drilling..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 text-xs font-medium rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md">
                    <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800/80">
                            <tr>
                                <th className="px-6 py-4 text-left rtl:text-right font-extrabold text-gray-700 dark:text-gray-300">Size (DN)</th>
                                <th className="px-4 py-4 text-center font-extrabold text-gray-700 dark:text-gray-300">D</th>
                                <th className="px-4 py-4 text-center font-extrabold text-gray-700 dark:text-gray-300">D1</th>
                                <th className="px-4 py-4 text-center font-extrabold text-gray-700 dark:text-gray-300">D2</th>
                                <th className="px-4 py-4 text-center font-extrabold text-gray-700 dark:text-gray-300">f</th>
                                <th className="px-4 py-4 text-center font-extrabold text-gray-700 dark:text-gray-300">Z-ød (Holes)</th>
                                <th className="px-4 py-4 text-center font-extrabold text-gray-700 dark:text-gray-300">L</th>
                                <th className="px-4 py-4 text-center font-extrabold text-gray-700 dark:text-gray-300">H (Closed)</th>
                                <th className="px-4 py-4 text-center font-extrabold text-gray-700 dark:text-gray-300">Handwheel (W)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredDimensions.map((row) => {
                                const isSelected = selectedDn === row.DN;
                                return (
                                    <tr
                                        key={row.DN}
                                        onClick={() => setSelectedDn(row.DN)}
                                        className={`cursor-pointer transition-all duration-200 ${
                                            isSelected
                                                ? 'bg-accent/10 dark:bg-accent/20 font-bold text-primary dark:text-blue-300'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        <td className="px-6 py-4 font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-accent' : 'bg-transparent'}`} />
                                            {row.DN}
                                        </td>
                                        <td className="px-4 py-4 text-center font-mono">{convertVal(row.D)}</td>
                                        <td className="px-4 py-4 text-center font-mono">{convertVal(row.D1)}</td>
                                        <td className="px-4 py-4 text-center font-mono">{convertVal(row.D2)}</td>
                                        <td className="px-4 py-4 text-center font-mono">{convertVal(row.f)}</td>
                                        <td className="px-4 py-4 text-center font-extrabold text-accent font-mono">{getHolesVal(row)}</td>
                                        <td className="px-4 py-4 text-center font-mono">{convertVal(row.L)}</td>
                                        <td className="px-4 py-4 text-center font-mono">{getHeightVal(row)}</td>
                                        <td className="px-4 py-4 text-center font-mono">{getHandwheelVal(row)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InteractiveValveBlueprint;
