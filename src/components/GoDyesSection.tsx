import React from 'react';

interface GoDyesSectionProps {
  onExploreGoDyes: () => void;
}

export const GoDyesSection: React.FC<GoDyesSectionProps> = ({ onExploreGoDyes }) => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authentic Copy & Specifications */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-stone-900 tracking-tight leading-[1.12] mb-5">
              Go Dyes for your <span className="text-[#10873a]">vibrant applications.</span>
            </h2>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-6 max-w-xl">
              GO is a range of reactive dyes developed by Bezema Colour Solutions for efficient dyeing, delivering high colour fixation and wet fastness while reducing process time, water consumption and energy requirements.
            </p>

            <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10873a]"></span>
                <span><strong>Resource Efficiency:</strong> Up to 30% water savings and up to 50% reductions in process time and carbon emissions.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10873a]"></span>
                <span><strong>Lower Temperature Washing:</strong> Effective colour fixation and efficient washing-off at 40–60°C.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10873a]"></span>
                <span><strong>Versatile Application:</strong> Supports exhaust, semi-continuous and continuous dyeing processes.</span>
              </div>
            </div>

            <button
              onClick={onExploreGoDyes}
              className="px-7 py-3.5 rounded-full bg-[#10873a] hover:bg-[#0c6b2e] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Explore GO DYES
            </button>
          </div>

          {/* Right Column: Aesthetic Green Fabric Swatches Showcase */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden group">
              <img
                src="/assets/green_fabric_swatches.jpg"
                alt="Aesthetic fabric swatches"
                className="w-full h-auto object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
