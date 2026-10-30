import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product, PRODUCTS } from '../data/catalog.ts';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return PRODUCTS.slice(0, 8);
    const q = searchTerm.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.ciNumber.toLowerCase().includes(q) ||
        p.sourceType.toLowerCase().includes(q)
      );
    }).slice(0, 15);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-none max-w-2xl w-full shadow-2xl border border-stone-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <svg className="w-5 h-5 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type product name, CI code (e.g. Yellow 44, Red 28), or category..."
            className="w-full text-sm text-stone-900 placeholder-stone-400 focus:outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 rounded-none cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-stone-100 p-2">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500">
              No products found matching &ldquo;{searchTerm}&rdquo;
            </div>
          ) : (
            results.map((p) => {
              const dark = p.darkHex || '#68B92E';
              const light = p.lightHex || p.darkHex || '#80c795';
              const isHovered = hoveredId === p.id;
              const isLight = isLightColor(dark);
              const textColor = isLight ? '#111827' : '#ffffff';
              const mutedColor = isLight ? '#374151' : 'rgba(255, 255, 255, 0.85)';

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(p);
                  }}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={isHovered ? { backgroundColor: dark } : undefined}
                  className="group flex items-center justify-between p-3 rounded-none transition-colors duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Color Swatch */}
                    <div className="w-7 h-7 rounded-none overflow-hidden border border-black/10 shadow-2xs flex-shrink-0 flex">
                      <div className="w-1/2 h-full" style={{ backgroundColor: dark }} />
                      <div className="w-1/2 h-full" style={{ backgroundColor: light }} />
                    </div>
                    <div className="truncate">
                      <span
                        className="text-sm font-bold block truncate transition-colors"
                        style={{ color: isHovered ? textColor : '#111827' }}
                      >
                        {p.name}
                      </span>
                      <span
                        className="text-[11px] transition-colors"
                        style={{ color: isHovered ? mutedColor : '#78716c' }}
                      >
                        {p.sourceType} {p.ciNumber ? `&bull; CI: ${p.ciNumber}` : ''}
                      </span>
                    </div>
                  </div>

                  <span
                    className="text-xs font-semibold whitespace-nowrap pl-2 transition-colors"
                    style={{ color: isHovered ? textColor : '#10873a' }}
                  >
                    View &rarr;
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="bg-stone-50 px-4 py-2 text-[11px] text-stone-400 flex items-center justify-between border-t border-stone-100">
          <span>Search among 463 catalog items</span>
          <span>H. Gokaldas &amp; Co.</span>
        </div>
      </div>
    </div>
  );
};
