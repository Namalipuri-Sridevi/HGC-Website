import React, { useState } from 'react';
import { getDyesPigmentsImage } from '../data/productImages.ts';

interface SubstrateFannedMockProps {
  productId?: string;
  hex: string;
  lightHex?: string;
  name: string;
  categorySlug?: string;
  sourceType?: string;
  className?: string;
  showBadge?: boolean;
}

export const SubstrateFannedMock: React.FC<SubstrateFannedMockProps> = ({
  productId = '',
  hex,
  name,
  categorySlug = '',
  sourceType = '',
  className = '',
  showBadge = true,
}) => {
  const [loadError, setLoadError] = useState(false);
  const baseColor = hex || '#eab308';

  const entry = getDyesPigmentsImage(productId, categorySlug);
  const dpImageUrl = entry.img;

  return (
    <div
      className={`relative w-full h-full min-h-[220px] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-inner flex items-center justify-center select-none group ${className}`}
      title={`${name} - dyespigments.net mock (${entry.matchedTitle})`}
    >
      {!loadError ? (
        <div className="relative w-full h-full overflow-hidden bg-stone-100">
          {/* Exact, authentic image directly from dyespigments.net */}
          <img
            src={dpImageUrl}
            alt={`${name} mock from dyespigments.net`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            crossOrigin="anonymous"
            onError={() => setLoadError(true)}
          />

          {/* Clean studio photographic depth shadow */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        </div>
      ) : (
        /* Fallback if external image CDN is slow */
        <div
          className="w-full h-full flex flex-col items-center justify-center relative p-6 text-center"
          style={{ backgroundColor: baseColor }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <span className="relative z-10 text-xs font-bold text-white uppercase tracking-wider drop-shadow-sm">
            {entry.matchedTitle || name}
          </span>
          <span className="relative z-10 text-[10px] font-mono text-white/80 mt-1">
            {baseColor}
          </span>
        </div>
      )}

      {/* Top Floating Badge & Hex Chip */}
      {showBadge && (
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-900/85 text-white backdrop-blur-xs shadow-xs border border-white/10">
            dyespigments.net Mock
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/90 text-stone-900 backdrop-blur-xs shadow-2xs border border-black/5">
            {baseColor}
          </span>
        </div>
      )}

      {/* Bottom Substrate Tag showing exact dyespigments.net title match */}
      {showBadge && (
        <div className="absolute bottom-3 right-3 text-[10px] font-bold text-stone-900 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs border border-stone-200/80 shadow-2xs z-10 max-w-[70%] truncate">
          {entry.matchedTitle}
        </div>
      )}
    </div>
  );
};
