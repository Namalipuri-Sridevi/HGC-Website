import React from 'react';
import { Globe3D } from './Globe3D.tsx';

export const GlobalReachSection: React.FC = () => {
  return (
    <section className="pt-16 pb-24 lg:pt-24 lg:pb-32 bg-[#fafbf9] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Stats */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-stone-500 block mb-3">
              OUR REACH
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.14] mb-6">
              Working with<br />
              trusted partners<br />
              <span className="text-[#10873a]">across the globe.</span>
            </h2>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-lg">
              Supplying manufacturers worldwide with consistent quality and dependable supply.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm pt-4 border-t border-stone-200">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#10873a] block">60+</span>
                <span className="text-xs font-medium text-stone-500">Years of continuous trust</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#10873a] block">1,500+</span>
                <span className="text-xs font-medium text-stone-500">Active industrial clients</span>
              </div>
            </div>
          </div>

          {/* Right Column: Three.js Rotating 3D Globe with India in Green */}
          <div className="lg:col-span-7 flex justify-center relative">
            <Globe3D />
          </div>

        </div>
      </div>
    </section>
  );
};
