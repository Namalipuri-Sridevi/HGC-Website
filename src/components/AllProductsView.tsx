import React, { useState } from 'react';
import { CATEGORIES, Category } from '../data/catalog.ts';

const CATEGORY_IMAGES = [
  "/assets/aistudio/01_direct_dyes.jpg",
  "/assets/aistudio/02_acid_dyes.jpg",
  "/assets/aistudio/03_basic_dyes.jpg",
  "/assets/aistudio/04_naphthols_and_base.jpg",
  "/assets/aistudio/05_vat_dyes.jpg",
  "/assets/aistudio/06_ucp_go_dyes.jpg",
  "/assets/aistudio/07_reactive_dyes.jpg",
  "/assets/aistudio/08_disperse_dyes.jpg",
  "/assets/aistudio/09_rapid_and_oil_colours.jpg",
  "/assets/aistudio/10_fluorescent_colorant.jpg",
  "/assets/aistudio/11_metal_oxide_inorganic_colorants.jpg",
  "/assets/aistudio/12_organic_colorant.jpg",
  "/assets/aistudio/13_fine_hc_colorant_emulsion.jpg",
  "/assets/aistudio/14_solvent_dyes.jpg",
  "/assets/aistudio/15_metal_powders.jpg",
  "/assets/aistudio/16_glitter_dg.jpg",
  "/assets/aistudio/17_food_supra.jpg",
  "/assets/aistudio/18_chemicals_in_general.jpg",
  "/assets/aistudio/19_cht_india.jpg",
  "/assets/aistudio/20_starch_glucose.jpg"
];

interface AllProductsViewProps {
  onSelectCategory: (categorySlug: string) => void;
  onOpenFinder: () => void;
}

export const AllProductsView: React.FC<AllProductsViewProps> = ({
  onSelectCategory,
  onOpenFinder,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [filterSearch, setFilterSearch] = useState('');

  const filteredCategories = CATEGORIES.filter((cat) => {
    if (!filterSearch.trim()) return true;
    const q = filterSearch.toLowerCase().trim();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.application.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#fafbf9] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero with Green Background */}
        <div className="bg-[#098549] text-white rounded-3xl p-8 sm:p-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-md">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-black tracking-[0.2em] uppercase text-emerald-200 block">
              CATALOG DIRECTORY
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Our Product <span className="text-emerald-200">Range</span>
            </h1>
            <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed">
              A comprehensive range of dyes and chemicals for diverse industrial applications, sourced from trusted manufacturers and supplied with consistent quality.
            </p>
          </div>

          {/* Search Filter Box */}
          <div className="w-full md:w-80 flex-shrink-0">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-100 mb-1.5">
              Filter Categories
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                placeholder="Search category or industry..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white text-stone-900 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
          {filteredCategories.map((cat: Category) => {
            const isHovered = hoveredCategory === cat.slug;
            const catIndex = CATEGORIES.findIndex(c => c.slug === cat.slug);

            return (
              <div
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                onMouseEnter={() => setHoveredCategory(cat.slug)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`group p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isHovered
                    ? 'bg-[#68B92E] border-[#68B92E] shadow-xl'
                    : 'bg-white border-stone-200/90 shadow-2xs hover:bg-[#68B92E] hover:border-[#68B92E] hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="w-full h-32 mb-4 bg-white rounded-xl overflow-hidden border border-stone-100 group-hover:border-white/60 shadow-xs group-hover:shadow-md transition-all">
                    <img 
                      src={CATEGORY_IMAGES[catIndex]}
                      alt={cat.name} 
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-white transition-colors leading-snug mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-stone-600 group-hover:text-white/95 leading-relaxed font-medium mb-4 transition-colors">
                    <strong className="text-stone-800 group-hover:text-white transition-colors">Applications:</strong> {cat.application}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 group-hover:border-white/30 flex items-center justify-between text-xs font-bold text-[#098549] group-hover:text-white transition-colors">
                  <span>View Product List</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Can&apos;t find the right product? Use our <span className="text-[#098549]">Product Finder.</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Search and filter our complete database by CI Number, dye classification, fabric substrate or color shade.
            </p>
          </div>

          <button
            onClick={onOpenFinder}
            className="px-7 py-3 rounded-full bg-[#098549] text-white hover:bg-[#065f32] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm flex-shrink-0"
          >
            Launch Product Finder
          </button>
        </div>

      </div>
    </div>
  );
};
