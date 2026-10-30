import React from 'react';
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

interface CategoriesSectionProps {
  onSelectCategory: (slug: string) => void;
  onViewAllProducts: () => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  onViewAllProducts,
}) => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-black tracking-[0.2em] uppercase text-[#098549] block mb-2">
              OUR PRODUCTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              A wide range of <span className="text-[#098549]">dyes and chemicals.</span>
            </h2>
          </div>

          <div className="lg:max-w-md flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start gap-4">
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              From textile dyes to industrial chemicals, we supply high-quality products for a variety of applications.
            </p>
            <button
              onClick={onViewAllProducts}
              className="px-6 py-2.5 rounded-full bg-[#098549] hover:bg-[#065f32] text-white text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow transition-all cursor-pointer"
            >
              View All Products
            </button>
          </div>
        </div>

        {/* 20 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-4.5">
          {CATEGORIES.map((cat: Category, index: number) => {
            const formattedIndex = String(index + 1).padStart(2, '0');

            return (
              <div
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className="group relative bg-[#fafbf9] hover:bg-[#68B92E] p-5 rounded-2xl border border-stone-200/90 hover:border-[#68B92E] hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer min-h-[180px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#098549] group-hover:text-white tracking-wider transition-colors">
                    {formattedIndex}
                  </span>
                </div>

                <div className="w-full h-32 mb-4 bg-white rounded-xl overflow-hidden border border-stone-100 group-hover:border-white/60 shadow-xs group-hover:shadow-md transition-all">
                  <img 
                    src={CATEGORY_IMAGES[index]} 
                    alt={cat.name} 
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-white transition-colors leading-snug mb-1">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#098549] group-hover:text-white transition-colors block">
                    View list &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
