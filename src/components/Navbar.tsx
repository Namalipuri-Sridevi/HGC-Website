import React from 'react';

interface NavbarProps {
  currentTab: 'home' | 'products' | 'finder' | 'blogs' | 'contact';
  onNavigate: (tab: 'home' | 'products' | 'finder' | 'blogs' | 'contact', categorySlug?: string) => void;
  onOpenSearch: () => void;
  onGetInTouch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, onOpenSearch, onGetInTouch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
            aria-label="H. Gokaldas & Co. Home"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-emerald-700/20 shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/hgc-assets/hgc-mark.png"
                alt="HGC Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
                H. GOKALDAS &amp; CO.
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-500">
                DYES &bull; CHEMICALS
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium" aria-label="Main Navigation">
            <button
              onClick={() => onNavigate('home')}
              className={`relative py-2 transition-colors cursor-pointer ${
                currentTab === 'home'
                  ? 'text-emerald-800 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('products')}
              className={`relative py-2 transition-colors cursor-pointer ${
                currentTab === 'products'
                  ? 'text-emerald-800 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => onNavigate('finder')}
              className={`relative py-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'finder'
                  ? 'text-emerald-800 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700'
              }`}
            >
              <span>Product Finder</span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-800 rounded">AI</span>
            </button>
            <button
              onClick={() => onNavigate('blogs')}
              className={`relative py-2 transition-colors cursor-pointer ${
                currentTab === 'blogs'
                  ? 'text-emerald-800 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700'
              }`}
            >
              Blogs
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`relative py-2 transition-colors cursor-pointer ${
                currentTab === 'contact'
                  ? 'text-emerald-800 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700'
              }`}
            >
              Contact Us
            </button>

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-emerald-800 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Search Catalog"
              title="Quick Search (Ctrl + K)"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Inquire CTA - Directly connects to Call or WhatsApp */}
            <button
              onClick={onGetInTouch}
              className="ml-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#098549] hover:bg-[#065f32] rounded-full shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Get In Touch</span>
            </button>
          </nav>

          {/* Mobile Menu & Search Icon */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-700 hover:text-emerald-800 rounded-lg"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-emerald-800 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentTab === 'home' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-800 hover:bg-stone-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('products');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentTab === 'products' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-800 hover:bg-stone-50'
            }`}
          >
            All Products (460+ Items)
          </button>
          <button
            onClick={() => {
              onNavigate('finder');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
              currentTab === 'finder' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-800 hover:bg-stone-50'
            }`}
          >
            <span>Product Finder</span>
            <span className="px-2 py-0.5 text-xs font-bold uppercase bg-emerald-100 text-emerald-800 rounded">AI Assisted</span>
          </button>
          <button
            onClick={() => {
              onNavigate('blogs');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentTab === 'blogs' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-800 hover:bg-stone-50'
            }`}
          >
            Technical Blogs &amp; Guides
          </button>
          <button
            onClick={() => {
              onNavigate('contact');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentTab === 'contact' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-800 hover:bg-stone-50'
            }`}
          >
            Contact Us &bull; Secunderabad
          </button>

          {/* Quick Connect Mobile Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGetInTouch();
              }}
              className="w-full py-3 rounded-xl bg-[#098549] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Get in Touch (Call / WhatsApp)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
