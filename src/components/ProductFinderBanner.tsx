import React, { useState } from 'react';
import { CATEGORIES } from '../data/catalog.ts';

interface ProductFinderBannerProps {
  onSearch: (params: { query: string; category: string; dyeClass: string; application: string; shade: string }) => void;
  onOpenAiFinder: (initialQuery?: string) => void;
}

export const ProductFinderBanner: React.FC<ProductFinderBannerProps> = ({
  onSearch,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [dyeClass, setDyeClass] = useState('all');
  const [application, setApplication] = useState('all');
  const [shade, setShade] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, category, dyeClass, application, shade });
  };

  return (
    <section
      className="relative overflow-hidden text-white py-14 lg:py-20 shadow-inner bg-[#1b8034] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/aistudio/image_0dfa3b9c.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background motif protection: Centered content is strictly positioned in the solid green zone so text never overlaps white embroidery */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Banner Heading with solid legibility protection */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-black tracking-[0.22em] uppercase text-emerald-200 mb-2 drop-shadow-xs">
            FIND THE RIGHT PRODUCT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-white drop-shadow-sm">
            Product <span className="font-light text-emerald-100">Finder</span>
          </h2>
          <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-medium drop-shadow-xs">
            Search and filter our product range to find the right dyes, pigments or chemicals for your application.
          </p>
        </div>

        {/* Filter Controls Form: Semi-translucent protective panel guaranteeing 100% text legibility */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0a5c2f]/70 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-white/25 shadow-2xl space-y-4.5"
        >
          {/* Main Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name, CI number, shade or application..."
              className="w-full pl-12 pr-4 py-3.5 bg-white text-stone-900 placeholder-stone-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
            />
          </div>

          {/* Dropdown Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Category */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-100 mb-1.5 drop-shadow-2xs">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-white text-stone-900 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shadow-xs"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dye Class / Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-100 mb-1.5 drop-shadow-2xs">
                Dye Class
              </label>
              <select
                value={dyeClass}
                onChange={(e) => setDyeClass(e.target.value)}
                className="w-full px-3 py-2.5 bg-white text-stone-900 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shadow-xs"
              >
                <option value="all">All Dye Classes</option>
                <option value="Direct Dyes">Direct Dyes</option>
                <option value="Acid Dyes">Acid Dyes</option>
                <option value="Basic Dyes">Basic Dyes</option>
                <option value="VAT Dyes">VAT Dyes</option>
                <option value="Reactive HE">Reactive HE (High Exhaust)</option>
                <option value="Reactive ME">Reactive ME (Low Temp)</option>
                <option value="Reactive M">Reactive M (Cold Brand)</option>
                <option value="Reactive H">Reactive H (Hot Brand)</option>
                <option value="Disperse Dyes">Disperse Dyes</option>
                <option value="UCP GO Dyes">UCP GO Dyes</option>
                <option value="Napthols">Napthols &amp; Fast Bases</option>
                <option value="Solvent Dyes">Solvent Dyes</option>
                <option value="Pigments">Pigments &amp; Emulsions</option>
              </select>
            </div>

            {/* Application */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-100 mb-1.5 drop-shadow-2xs">
                Application
              </label>
              <select
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                className="w-full px-3 py-2.5 bg-white text-stone-900 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shadow-xs"
              >
                <option value="all">All Applications</option>
                <option value="Cotton & Cellulosic">Cotton &amp; Cellulosic</option>
                <option value="Silk & Wool">Silk &amp; Wool</option>
                <option value="Polyester & Synthetic">Polyester &amp; Synthetic</option>
                <option value="Leather & Tannery">Leather &amp; Tannery</option>
                <option value="Paper & Packaging">Paper &amp; Packaging</option>
                <option value="Paints & Coatings">Paints &amp; Coatings</option>
                <option value="Textile Printing & Inks">Textile Printing &amp; Inks</option>
                <option value="Food & Beverages">Food &amp; Beverages</option>
                <option value="Plastics & Polymers">Plastics &amp; Polymers</option>
              </select>
            </div>

            {/* Colour Shade */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-100 mb-1.5 drop-shadow-2xs">
                Colour Shade
              </label>
              <select
                value={shade}
                onChange={(e) => setShade(e.target.value)}
                className="w-full px-3 py-2.5 bg-white text-stone-900 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shadow-xs"
              >
                <option value="all">All Shades</option>
                <option value="Yellow">Yellow / Gold</option>
                <option value="Orange">Orange</option>
                <option value="Red">Red / Scarlet</option>
                <option value="Pink">Pink / Rose / Magenta</option>
                <option value="Blue">Blue / Turquoise / Cyan</option>
                <option value="Navy">Navy Blue</option>
                <option value="Violet">Violet / Purple</option>
                <option value="Green">Green / Olive</option>
                <option value="Brown">Brown / Khakhi</option>
                <option value="Black">Black / Grey</option>
              </select>
            </div>
          </div>

          {/* Action Row - Clean text button with NO random arrows */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-white text-[#098549] hover:bg-emerald-50 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Find Products
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};
