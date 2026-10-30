import React from 'react';
import { SubstrateFannedMock } from './SubstrateFannedMock.tsx';

interface ColorMockImageProps {
  productId?: string;
  hex: string;
  lightHex?: string;
  name: string;
  categorySlug?: string;
  sourceType?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ColorMockImage: React.FC<ColorMockImageProps> = ({
  productId = '',
  hex,
  name,
  categorySlug = '',
  sourceType = '',
  size = 'sm',
  className = '',
}) => {
  if (size === 'sm') {
    return (
      <div
        className={`w-14 h-10 rounded-lg overflow-hidden border border-stone-300 shadow-2xs hover:scale-105 transition-transform ${className}`}
        title={`${name} - dyespigments.net image (${hex})`}
      >
        <SubstrateFannedMock
          productId={productId}
          hex={hex}
          name={name}
          categorySlug={categorySlug}
          sourceType={sourceType}
          showBadge={false}
          className="w-full h-full min-h-0 rounded-none border-none"
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${size === 'lg' ? 'h-64 sm:h-80' : 'h-44 sm:h-52'} ${className}`}>
      <SubstrateFannedMock
        productId={productId}
        hex={hex}
        name={name}
        categorySlug={categorySlug}
        sourceType={sourceType}
        showBadge={true}
        className="w-full h-full min-h-0"
      />
    </div>
  );
};
