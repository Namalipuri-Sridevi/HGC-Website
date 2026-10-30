import React, { useState, useMemo } from 'react';
import { Product, PRODUCTS, CATEGORIES, CATEGORY_DETAILS } from '../data/catalog.ts';
import { isNonColorCategory, getProductCategoryImage } from './ProductSwatchCarousel.tsx';

interface CategoryPageViewProps {
  categorySlug: string;
  onNavigate: (tab: 'home' | 'products' | 'finder' | 'contact' | 'blogs', categorySlug?: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenFinder: () => void;
}

export const CategoryPageView: React.FC<CategoryPageViewProps> = ({
  categorySlug,
  onNavigate,
  onSelectProduct,
  onOpenFinder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const category = CATEGORIES.find((c) => c.slug === categorySlug) || CATEGORIES[0];
  const details = CATEGORY_DETAILS[category.slug] || {
    overview: `${category.name} are premium industrial colorants engineered for superior tinctorial strength and fastness.`,
    suitability: [],
    processSteps: [],
    usesTextiles: [],
    usesOther: []
  };

  const isLightColor = (hex: string) => {
    if (!hex) return false;
    const c = hex.replace('#', '');
    if (c.length !== 6) return false;
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6;
  };

  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = p.categorySlug === category.slug || p.sourceType.toLowerCase() === category.name.toLowerCase();
      if (!matchCat) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return p.name.toLowerCase().includes(q) || p.ciNumber.toLowerCase().includes(q);
      }
      return true;
    });
  }, [category.slug, category.name, searchQuery]);

  return (
    <div className="bg-[#fafbf9] min-h-screen py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-8" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('products')} className="hover:text-emerald-800 transition-colors">All Products</button>
          <span>/</span>
          <span className="text-[#10873a] font-bold">{category.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left Side: Product List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-extrabold text-stone-900">Product List</h2>
            <div className="bg-white rounded-none border border-stone-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50/90 border-b border-stone-200 text-stone-500 font-extrabold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 w-20">{isNonColorCategory(category.slug) ? 'GRADE' : 'SHADE'}</th>
                    <th className="py-3.5 px-4">PRODUCT NAME</th>
                    <th className="py-3.5 px-4 w-32">CI NO.</th>
                    <th className="py-3.5 px-4 w-44">CHEMISTRY / CLASS</th>
                    <th className="py-3.5 px-4 w-12 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {categoryProducts.map((p) => {
                    const isHovered = hoveredProductId === p.id;
                    const isChemicalOrGlitter = isNonColorCategory(p.categorySlug);
                    const bg = isChemicalOrGlitter ? '#68B92E' : (p.darkHex || '#68B92E');
                    const light = isLightColor(bg);
                    const textColor = light ? '#111827' : '#ffffff';
                    const mutedColor = light ? '#1f2937' : 'rgba(255, 255, 255, 0.9)';

                    return (
                      <tr
                        key={p.id}
                        onClick={() => onSelectProduct(p)}
                        onMouseEnter={() => setHoveredProductId(p.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                        style={isHovered ? { backgroundColor: bg } : undefined}
                        className="cursor-pointer transition-colors duration-150 group"
                      >
                        <td className="py-3.5 px-4">
                          {isChemicalOrGlitter ? (
                            <img
                              src={getProductCategoryImage(p.categorySlug)}
                              alt={p.name}
                              className="w-8 h-8 object-cover rounded-none border border-black/15 shadow-2xs"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-none border border-black/10 flex overflow-hidden shadow-2xs">
                              <div className="w-1/2 h-full" style={{ backgroundColor: p.darkHex || '#d1d5db' }} />
                              <div className="w-1/2 h-full" style={{ backgroundColor: p.lightHex || p.darkHex || '#d1d5db' }} />
                            </div>
                          )}
                        </td>
                        <td
                          className="py-3.5 px-4 font-bold text-sm transition-colors"
                          style={{ color: isHovered ? textColor : '#111827' }}
                        >
                          {p.name}
                        </td>
                        <td
                          className="py-3.5 px-4 font-mono font-medium transition-colors"
                          style={{ color: isHovered ? mutedColor : '#57534e' }}
                        >
                          {p.ciNumber || '-'}
                        </td>
                        <td
                          className="py-3.5 px-4 font-medium transition-colors"
                          style={{ color: isHovered ? mutedColor : '#57534e' }}
                        >
                          {p.sourceType}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <svg
                            className="w-4 h-4 inline-block transform group-hover:translate-x-1 transition-all"
                            style={{ color: isHovered ? textColor : '#a8a29e' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side: Category Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs sticky top-24">
              <h1 className="text-2xl font-extrabold text-stone-900 mb-4">{category.name}</h1>
              <p className="text-xs text-stone-600 leading-relaxed mb-6">{details.overview}</p>
              
              <h3 className="text-xs font-black uppercase text-stone-900 mb-3">Key Applications</h3>
              <div className="flex flex-wrap gap-2 text-xs mb-6">
                {details.usesTextiles.concat(details.usesOther).map((u, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-lg bg-emerald-50 text-[#098549] font-bold border border-emerald-100">
                        {u}
                    </span>
                ))}
              </div>

              {/* Process Steps */}
              {details.processSteps && details.processSteps.length > 0 && (
                  <div className="mb-6">
                      <h3 className="text-xs font-black uppercase text-stone-900 mb-3">Process Overview</h3>
                      <ul className="list-disc list-inside text-xs text-stone-600 space-y-1">
                          {details.processSteps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                          ))}
                      </ul>
                  </div>
              )}
                {/* Suitability Visualization */}
              {details.suitability && details.suitability.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-stone-100">
                      <h3 className="text-sm font-black uppercase text-stone-900 mb-4 tracking-wider">Suitability</h3>
                      <div className="space-y-4">
                          {details.suitability.map((item, idx) => {
                              const score = parseInt(item.rating) || 0;
                              return (
                                  <div key={idx}>
                                      <div className="flex justify-between text-xs mb-1">
                                          <span className="font-semibold text-stone-700">{item.material}</span>
                                          <span className="text-stone-500 font-medium">{item.rating === "5/5" ? "Primary" : item.rating === "4/5" ? "Common" : item.rating === "3/5" ? "Suitable" : "Specialised"}</span>
                                      </div>
                                      <div className="w-full bg-stone-100 rounded-full h-1.5 flex gap-0.5">
                                          {[...Array(5)].map((_, i) => (
                                              <div key={i} className={`flex-1 h-full rounded-full ${i < score ? 'bg-[#098549]' : 'bg-transparent'}`}/>
                                          ))}
                                      </div>
                                  </div>
                              )
                          })}
                      </div>
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Banner: Product Finder */}
        <div className="bg-[#098549] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md text-white">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Need to find specific products?</h3>
            <p className="text-emerald-50 text-sm">Use our Product Finder to search our complete catalog.</p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-2">
            <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 px-4 py-3 rounded-full text-stone-900 text-sm focus:outline-none"
            />
            <button
                onClick={onOpenFinder}
                className="px-6 py-3 rounded-full bg-stone-900 text-white font-bold text-xs uppercase tracking-wider transition-colors hover:bg-stone-800"
            >
                Find
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
