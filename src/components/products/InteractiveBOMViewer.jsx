import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Maximize2, X, Info, Crosshair, Layers, Sparkles } from 'lucide-react';

const InteractiveBOMViewer = ({ materials, diagramImage }) => {
    const [selectedNo, setSelectedNo] = useState(null);
    const [hoveredNo, setHoveredNo] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('All');

    if (!materials || materials.length === 0) return null;

    const mainDiagram = diagramImage || '/products/image_1_row_1.png';

    const tags = ['All', ...new Set(materials.map(m => m.tag || 'General').filter(Boolean))];

    const filteredMaterials = materials.filter(m => {
        const matchesSearch = 
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.no.toString() === searchQuery;
        const matchesTag = selectedTag === 'All' || m.tag === selectedTag;
        return matchesSearch && matchesTag;
    });

    const activeNo = hoveredNo || selectedNo;

    return (
        <div className="mb-20">
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center">
                    <div className="w-2.5 h-8 bg-gradient-to-b from-accent to-blue-600 rounded-full mr-3 rtl:mr-0 rtl:ml-3 shadow-md"></div>
                    <div>
                        <h3 className="text-2xl font-bold dark:text-white">Bill of Materials & Interactive Schematic</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Hover or click on pins or parts to inspect chemical composition and engineering materials.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
                        <input
                            type="text"
                            placeholder="Filter components..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 text-xs font-medium rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Filter Tags */}
            {tags.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 ${
                                selectedTag === tag
                                    ? 'bg-accent text-white shadow-lg shadow-accent/25 scale-105'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:border-accent/40'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Glassmorphic Interactive Schematic Viewer */}
                <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 relative shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <Crosshair className="w-4 h-4 text-accent" /> Technical Drawing Hotspots
                        </span>
                        <button
                            onClick={() => setIsFullscreen(true)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-accent text-slate-300 hover:text-white transition-all shadow-md"
                            title="Expand Diagram"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Diagram Canvas */}
                    <div className="relative aspect-[3/4] w-full bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-800 flex items-center justify-center group">
                        <div className="relative w-full h-full">
                            <img
                                src={mainDiagram}
                                alt="Valve Cross Section Technical Drawing"
                                className="w-full h-full object-contain block p-2"
                            />

                            {/* Hotspot Pins */}
                            {materials.map((part) => {
                                if (!part.hotspot) return null;
                                const isSelected = activeNo?.toString() === part.no.toString();

                                return (
                                    <button
                                        key={part.no}
                                        style={{ top: part.hotspot.top, left: part.hotspot.left }}
                                        onClick={() => setSelectedNo(selectedNo?.toString() === part.no.toString() ? null : part.no)}
                                        onMouseEnter={() => setHoveredNo(part.no)}
                                        onMouseLeave={() => setHoveredNo(null)}
                                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-extrabold transition-all duration-300 z-20 ${
                                            isSelected
                                                ? 'w-8 h-8 bg-accent text-white ring-4 ring-accent/40 scale-125 shadow-xl shadow-accent/40'
                                                : 'w-7 h-7 bg-blue-600/90 hover:bg-accent text-white hover:scale-110 shadow-md'
                                        }`}
                                    >
                                        <span className="text-xs font-mono">{part.no}</span>
                                        {isSelected && (
                                            <span className="absolute -inset-1.5 rounded-full border-2 border-accent animate-ping opacity-75 pointer-events-none"></span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Component Tooltip Popover */}
                        <AnimatePresence>
                            {activeNo && (() => {
                                const part = materials.find(m => m.no.toString() === activeNo.toString());
                                if (!part) return null;
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-xl text-white p-4 rounded-2xl border border-accent/40 shadow-2xl z-30 flex items-center gap-3.5"
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-accent text-white font-extrabold font-mono flex items-center justify-center text-sm flex-shrink-0 shadow-lg shadow-accent/30">
                                            {part.no}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-sm text-white truncate flex items-center gap-2">
                                                {part.name}
                                                {part.tag && (
                                                    <span className="px-2 py-0.5 text-[9px] font-semibold rounded-full bg-slate-800 text-accent border border-accent/30">
                                                        {part.tag}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-blue-300 font-mono mt-0.5 truncate">{part.material}</div>
                                        </div>
                                    </motion.div>
                                );
                            })()}
                        </AnimatePresence>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
                        <span className="flex items-center gap-1.5 font-medium">
                            <Info className="w-4 h-4 text-accent" /> Click pin to sync material specification
                        </span>
                    </div>
                </div>

                {/* Right Column: Materials Table */}
                <div className="lg:col-span-7">
                    <div className="overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md">
                        <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-thin">
                            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-800/90 sticky top-0 backdrop-blur-md z-10">
                                    <tr>
                                        <th className="px-5 py-4 text-left rtl:text-right text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                                            No.
                                        </th>
                                        <th className="px-6 py-4 text-left rtl:text-right text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Part Component
                                        </th>
                                        <th className="px-6 py-4 text-left rtl:text-right text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Material Specification
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {filteredMaterials.map((part) => {
                                        const isSelected = activeNo?.toString() === part.no.toString();
                                        return (
                                            <tr
                                                key={part.no}
                                                onMouseEnter={() => setHoveredNo(part.no)}
                                                onMouseLeave={() => setHoveredNo(null)}
                                                onClick={() => setSelectedNo(selectedNo?.toString() === part.no.toString() ? null : part.no)}
                                                className={`cursor-pointer transition-all duration-200 ${
                                                    isSelected
                                                        ? 'bg-accent/10 dark:bg-accent/20 border-l-4 border-accent font-bold text-primary dark:text-blue-300'
                                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                                                }`}
                                            >
                                                <td className="px-5 py-4 whitespace-nowrap text-sm font-extrabold">
                                                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-xl text-xs font-mono transition-colors ${
                                                        isSelected
                                                            ? 'bg-accent text-white font-bold shadow-md shadow-accent/30'
                                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                                    }`}>
                                                        {part.no}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                                    {part.name}
                                                    {part.tag && (
                                                        <span className="ml-2.5 rtl:ml-0 rtl:mr-2.5 px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                                            {part.tag}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium font-mono">
                                                    {part.material}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Image Modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
                    >
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="max-w-4xl max-h-[90vh] bg-slate-900 text-white rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden flex flex-col items-center">
                            <h4 className="text-xl font-bold text-white mb-4">
                                Technical Cross-Section & Component Index
                            </h4>
                            <div className="relative max-h-[75vh] w-auto">
                                <img
                                    src={mainDiagram}
                                    alt="Valve Technical Schematic Fullscreen"
                                    className="max-h-[75vh] object-contain"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBOMViewer;
