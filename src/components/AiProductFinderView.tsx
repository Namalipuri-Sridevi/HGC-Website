import React, { useState, useEffect } from 'react';
import { Product, PRODUCTS, CATEGORIES } from '../data/catalog.ts';
import { executeProductFinderSearch, isChemicalProduct, SearchIntent, ColorFamily } from '../utils/productFinderEngine.ts';

interface AiProductFinderViewProps {
  initialQuery?: string;
  onSelectProduct: (product: Product) => void;
  onRequestSample: (product: Product) => void;
}

interface AiResponseData {
  success: boolean;
  aiPowered: boolean;
  engine?: string;
  intent?: SearchIntent;
  detectedColors?: ColorFamily[];
  detectedSubstrate?: string;
  summary: string;
  technicalAdvice: string;
  suitabilityExplanation: string;
  products: Product[];
}

export const AiProductFinderView: React.FC<AiProductFinderViewProps> = ({
  initialQuery = '',
  onSelectProduct,
  onRequestSample,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('all');
  const [application, setApplication] = useState('all');
  const [shade, setShade] = useState('all');

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiResponseData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (searchPrompt?: string) => {
    const q = searchPrompt !== undefined ? searchPrompt : query;
    if (!q.trim() && category === 'all' && application === 'all' && shade === 'all') {
      setErrorMsg('Please enter a description or pick filter criteria.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai-product-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          category,
          application,
          shade,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      setAiResult(data);
    } catch (err: any) {
      console.warn('Network error or server endpoint unavailable, executing client domain engine:', err);
      // Client-side execution with the exact same domain engine
      const domainResult = executeProductFinderSearch(q, category, application, shade);
      setAiResult(domainResult);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="bg-[#fafbf9] min-h-screen py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight flex items-center justify-center gap-3">
            <span>Product Finder</span>
            <span className="px-2 py-0.5 text-xs font-extrabold bg-[#098549] text-white rounded-md">AI</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Search and filter our complete catalog of certified dyes and specialty chemicals by application, fiber substrate, or shade requirements to find the exact formulation for your manufacturing needs.
          </p>
        </div>

        {/* Interactive Query Box with Green Background */}
        <div className="bg-[#098549] text-white rounded-3xl p-6 sm:p-8 shadow-md mb-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-100 mb-2">
                Describe Your Requirement or Target Process:
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. I need a brilliant yellow and navy reactive dye formulation for 100% cotton towelling, requiring high wash fastness at 60°C..."
                  className="w-full p-4 text-sm text-stone-900 bg-white border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-inner placeholder-stone-400"
                ></textarea>
              </div>
            </div>

            {/* Optional Criteria Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-100 mb-1">
                  Category (Optional)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-stone-900 border border-stone-300 rounded-lg text-xs font-medium"
                >
                  <option value="all">Any Category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-100 mb-1">
                  Substrate / Application
                </label>
                <select
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-stone-900 border border-stone-300 rounded-lg text-xs font-medium"
                >
                  <option value="all">Any Application</option>
                  <option value="cotton">Cotton &amp; Cellulosic</option>
                  <option value="silk">Silk &amp; Wool</option>
                  <option value="polyester">Polyester &amp; Blends</option>
                  <option value="leather">Leather &amp; Tannery</option>
                  <option value="paper">Paper &amp; Packaging</option>
                  <option value="paint">Paints &amp; Inks</option>
                  <option value="food">Food &amp; Beverages</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-100 mb-1">
                  Color Shade Family
                </label>
                <select
                  value={shade}
                  onChange={(e) => setShade(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-stone-900 border border-stone-300 rounded-lg text-xs font-medium"
                >
                  <option value="all">Any Shade</option>
                  <option value="yellow">Yellow / Gold</option>
                  <option value="orange">Orange</option>
                  <option value="red">Red / Scarlet</option>
                  <option value="pink">Pink / Rose / Magenta</option>
                  <option value="blue">Blue / Cyan</option>
                  <option value="navy">Navy</option>
                  <option value="green">Green / Olive</option>
                  <option value="violet">Violet / Purple</option>
                  <option value="black">Black / Grey</option>
                  <option value="brown">Brown</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <div className="text-xs text-rose-900 bg-rose-100 p-2.5 rounded-lg border border-rose-300">
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3 rounded-none bg-white text-[#098549] hover:bg-emerald-50 text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 cursor-pointer border border-white"
              >
                {loading ? 'Consulting Chemical AI...' : 'Find Best Formulations'}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {aiResult && (
          <div className="space-y-8 animate-fadeIn">
            {/* AI Recommendation Summary Box */}
            <div className="bg-white rounded-none border border-stone-300 p-6 sm:p-7 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-none bg-[#10873a]"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10873a]">
                    {aiResult.engine || (aiResult.aiPowered ? 'AI Technical Formulation Match' : 'Domain Expert Engine')}
                  </span>
                </div>
                {aiResult.intent && (
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-stone-100 text-stone-800 border border-stone-300">
                    {aiResult.intent === 'CHEMICAL'
                      ? 'Textile Chemical / Auxiliary Query'
                      : `Dye & Colorant Query${aiResult.detectedColors && aiResult.detectedColors.length > 0 ? ` • Shade: ${aiResult.detectedColors.join(', ').toUpperCase()}` : ''}`}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-extrabold text-stone-900 mb-2">
                {aiResult.summary}
              </h3>
              
              {aiResult.suitabilityExplanation && (
                <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                  {aiResult.suitabilityExplanation}
                </p>
              )}

              {aiResult.technicalAdvice && (
                <div className="mt-4 p-4 rounded-none bg-stone-50 border border-stone-300 text-xs sm:text-sm text-stone-900">
                  <span className="font-bold block mb-1 uppercase tracking-wider text-stone-900">
                    &bull; Dyebath Setup &amp; Chemical Recipe:
                  </span>
                  <p className="leading-relaxed text-stone-700">{aiResult.technicalAdvice}</p>
                </div>
              )}
            </div>

            {/* Recommended Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-stone-900">
                  Recommended Products ({aiResult.products.length})
                </h4>
                <span className="text-xs text-stone-500 font-medium">
                  Strictly verified against query domain and color requirements
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiResult.products.map((p) => {
                  const isChem = isChemicalProduct(p);
                  const dark = p.darkHex || '#e2e8f0';
                  const light = p.lightHex || p.darkHex || '#f1f5f9';

                  return (
                    <div
                      key={p.id}
                      onClick={() => onSelectProduct(p)}
                      className="group bg-white rounded-none border border-stone-300 hover:border-emerald-600 p-4.5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-2">
                          <span className="font-bold uppercase tracking-wider text-[#10873a]">
                            {p.sourceType}
                          </span>
                          {p.ciNumber && (
                            <span className="text-[10px] font-mono text-stone-500">
                              {p.ciNumber}
                            </span>
                          )}
                        </div>

                        <h5 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors mb-3 leading-snug">
                          {p.name}
                        </h5>
                      </div>

                      <div>
                        {/* Swatch or Technical chemical info */}
                        {!isChem && (p.darkHex || p.lightHex) ? (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-[10px] text-stone-500 font-bold uppercase tracking-wider mb-1">
                              <span>Full Shade</span>
                              <span>Tint</span>
                            </div>
                            <div className="h-7 w-full rounded-none border border-stone-300 flex overflow-hidden">
                              <div className="w-1/2 h-full" style={{ backgroundColor: dark }} />
                              <div className="w-1/2 h-full" style={{ backgroundColor: light }} />
                            </div>
                          </div>
                        ) : (
                          <div className="mb-3 p-2 bg-stone-50 border border-stone-200 text-stone-600 text-[11px]">
                            <span className="font-semibold block text-stone-800 uppercase tracking-wider text-[10px]">
                              Chemical Grade
                            </span>
                            <span>Industrial Auxiliary Formulation</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2.5 border-t border-stone-200 text-xs">
                          <span className="font-bold text-emerald-800 group-hover:underline uppercase tracking-wider text-[11px]">
                            View Specs &rarr;
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRequestSample(p);
                            }}
                            className="px-3 py-1.5 text-[11px] font-bold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-none cursor-pointer uppercase tracking-wider"
                          >
                            Request Sample
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
