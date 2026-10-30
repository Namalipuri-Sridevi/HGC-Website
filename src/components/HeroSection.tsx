import React from 'react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onExploreFinder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreProducts }) => {
  return (
    <section className="relative overflow-hidden bg-white pt-0 pb-10 lg:pt-0 lg:pb-14 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Row: Text on Left, Seamless Archival Artwork on Right on the SAME PLANE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Copy, Clean Action Button, Trust Badges */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">


            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] font-extrabold text-stone-900 tracking-tight leading-[1.12] mb-6">
              Trusted manufacturers &amp; suppliers of <span className="text-[#098549]">dyes and chemicals</span>{' '}
              <span className="text-stone-900">since 1963.</span>
            </h1>

            {/* Body Copy */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-600 leading-relaxed max-w-xl mb-8">
              H. Gokaldas &amp; Co. trades in dyes, pigments and process chemicals,
              supplying manufacturers across India from established producers and
              trusted principals.
            </p>

            {/* CTA Button without random arrow - exact brand logo green */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreProducts}
                className="px-7 py-3.5 rounded-full bg-[#098549] hover:bg-[#065f32] text-white font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Explore Our Products
              </button>
            </div>

            {/* Clean, authentic trust indicators without stray clip-art */}
            <div className="w-full max-w-md pt-4 border-t border-stone-100 flex items-center justify-between gap-6 text-stone-600">
              <div>
                <span className="block text-2xl font-black text-stone-900 tracking-tight">1963</span>
                <span className="text-xs text-stone-500 font-medium">Established in Secunderabad</span>
              </div>
              <div className="h-8 w-px bg-stone-200"></div>
              <div>
                <span className="block text-2xl font-black text-stone-900 tracking-tight">460+</span>
                <span className="text-xs text-stone-500 font-medium">Chemical &amp; Dye Grades</span>
              </div>
              <div className="h-8 w-px bg-stone-200"></div>
              <div>
                <span className="block text-2xl font-black text-stone-900 tracking-tight">1,500+</span>
                <span className="text-xs text-stone-500 font-medium">Manufacturers Supplied</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Res Storefront with Green Dome (seamlessly blended into pure white, zero boundaries) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative max-w-2xl w-full flex items-center justify-center">
              <img
                src="/hgc-assets/office-dome-crisp.png"
                alt="H. Gokaldas & Co. Historic Storefront in Secunderabad with Green Dome"
                className="w-full max-w-lg lg:max-w-[560px] xl:max-w-[620px] h-auto object-contain block select-none drop-shadow-sm"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

