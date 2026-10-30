import React from 'react';
import { Product } from '../data/catalog.ts';
import { ProductSwatchCarousel } from './ProductSwatchCarousel.tsx';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestSample: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestSample,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-none max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-300 text-stone-900 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header: Name */}
        <div className="pr-10 mb-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {product.name}
          </h2>
        </div>

        {/* Interactive Swatch Carousel */}
        <div className="mb-6">
          <ProductSwatchCarousel product={product} size="md" />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-stone-200">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onRequestSample(product);
                onClose();
              }}
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none"
            >
              Request this grade
            </button>
            <a
              href={`https://wa.me/919100112561?text=${encodeURIComponent(`Hi H. Gokaldas & Co., I am inquiring about ${product.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none text-center inline-block"
            >
              WhatsApp enquiry
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
