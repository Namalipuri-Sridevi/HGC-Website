import React from 'react';
import { Product } from '../data/catalog.ts';

interface ProductSwatchCarouselProps {
  product: Product;
  size?: 'md' | 'lg';
  className?: string;
}

export const isNonColorCategory = (categorySlug: string): boolean => {
  return (
    categorySlug === 'glitter-dg' ||
    categorySlug === 'metal-powders' ||
    categorySlug === 'chemicals-in-general' ||
    categorySlug === 'cht-india' ||
    categorySlug === 'starch-glucose'
  );
};

export const getProductCategoryImage = (categorySlug: string): string => {
  switch (categorySlug) {
    case 'glitter-dg':
      return '/assets/aistudio/16_glitter_dg.jpg';
    case 'metal-powders':
      return '/assets/aistudio/15_metal_powders.jpg';
    case 'chemicals-in-general':
      return '/assets/aistudio/18_chemicals_in_general.jpg';
    case 'cht-india':
      return '/assets/aistudio/19_cht_india.jpg';
    case 'starch-glucose':
      return '/assets/aistudio/20_starch_glucose.jpg';
    default:
      return '/assets/aistudio/18_chemicals_in_general.jpg';
  }
};


export const ProductSwatchCarousel: React.FC<ProductSwatchCarouselProps> = ({
  product,
  size = 'md',
  className = '',
}) => {
  const isLg = size === 'lg';
  const isNonColor = isNonColorCategory(product.categorySlug);

  // If the product is Glitter, Metal Powder, or Chemical: render clean product image only (no text/badge overlays, no Masstone or Tint)
  if (isNonColor) {
    const imgUrl = getProductCategoryImage(product.categorySlug);

    return (
      <div className={`w-full bg-white rounded-none border border-stone-300 shadow-none overflow-hidden flex flex-col ${className}`}>
        <div className={`w-full ${isLg ? 'h-80 sm:h-[440px]' : 'h-64 sm:h-76'} relative bg-stone-100 overflow-hidden flex items-center justify-center`}>
          <img
            src={imgUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  // DYES & COLORANTS: Display sharp Full Shade and Tint swatches exactly matching reference
  const dark = product.darkHex || '#098549';
  const light = product.lightHex || product.darkHex || '#80c795';

  // Helper to determine text contrast (charcoal for light backgrounds like yellow, crisp off-white for dark)
  const isLightColor = (hex: string) => {
    if (!hex) return false;
    const c = hex.replace('#', '');
    if (c.length !== 6) return false;
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55;
  };

  const darkTextIsDark = isLightColor(dark);
  const lightTextIsDark = isLightColor(light);

  return (
    <div className={`w-full bg-white rounded-none border border-stone-300 shadow-none overflow-hidden flex flex-col ${className}`}>
      <div className={`w-full ${isLg ? 'h-80 sm:h-[440px]' : 'h-64 sm:h-76'} flex flex-col`}>
        {/* Top Half: FULL SHADE (Replaced MASSTONE per user request) */}
        <div
          className="flex-1 w-full p-4 sm:p-6 flex flex-col justify-end transition-colors relative"
          style={{ backgroundColor: dark }}
        >
          <span
            className={`text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase select-none ${
              darkTextIsDark ? 'text-stone-900/90' : 'text-stone-100/95'
            }`}
          >
            FULL SHADE
          </span>
        </div>

        {/* Bottom Half: TINT */}
        <div
          className="flex-1 w-full p-4 sm:p-6 flex flex-col justify-end transition-colors relative border-t border-black/5"
          style={{ backgroundColor: light }}
        >
          <span
            className={`text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase select-none ${
              lightTextIsDark ? 'text-stone-900/90' : 'text-stone-100/95'
            }`}
          >
            TINT
          </span>
        </div>
      </div>
    </div>
  );
};
