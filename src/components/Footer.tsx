import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'products' | 'finder' | 'blogs' | 'contact', categorySlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#134e2c] text-white pt-14 pb-10 border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-800/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm flex-shrink-0">
                <img
                  src="/hgc-assets/hgc-mark.png"
                  alt="HGC Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white leading-tight">
                  H. GOKALDAS &amp; CO.
                </h3>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-emerald-200 block">
                  DYES &bull; CHEMICALS
                </span>
              </div>
            </div>

            <p className="text-sm text-emerald-100/90 leading-relaxed max-w-sm mb-4">
              Supplying dependable, consistent quality dyes and industrial textile auxiliaries across India since 1963.
            </p>

            <span className="text-xs font-semibold text-emerald-300">
              Trusted by 1,500+ Indian &amp; Global Manufacturers
            </span>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/90 font-medium">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('finder');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Product Finder (AI)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('blogs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Technical Blogs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/90 font-medium">
              <li>
                <button
                  onClick={() => onNavigate('products', 'direct-dyes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Direct &bull; Acid &bull; Basic Dyes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'reactive-dyes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Reactive Dyes &bull; VAT Dyes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'organic-pigment')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Organic &bull; Inorganic Pigments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'chemicals-in-general')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Process Chemicals &bull; CHT Auxiliaries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'starch-glucose')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Starch &amp; Glucose &bull; Food Supra
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 text-xs sm:text-sm text-emerald-100/90">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Contact Us
            </h4>
            <div className="space-y-3 font-medium">
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  2-4-1, Pat Bazar,<br />
                  Secunderabad - 500003,<br />
                  Hyderabad, Telangana, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-emerald-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="space-x-2">
                  <a href="tel:+9127712850" className="hover:text-white transition-colors">+91 27712850</a>
                  <span>/</span>
                  <a href="tel:+912771085" className="hover:text-white transition-colors">2771085</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-emerald-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:mail@gokaldas.com" className="hover:text-white transition-colors">
                  mail@gokaldas.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
          <span>&copy; {new Date().getFullYear()} H. Gokaldas &amp; Co. All rights reserved. Founded 1963.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Quality Guarantee</span>
            <span className="text-emerald-700">&bull;</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-emerald-700">&bull;</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms &amp; Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
