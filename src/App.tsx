/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { CategoriesSection } from './components/CategoriesSection.tsx';
import { ProductFinderBanner } from './components/ProductFinderBanner.tsx';
import { GoDyesSection } from './components/GoDyesSection.tsx';
import { GlobalReachSection } from './components/GlobalReachSection.tsx';
import { ContactStrip } from './components/ContactStrip.tsx';
import { AllProductsView } from './components/AllProductsView.tsx';
import { CategoryPageView } from './components/CategoryPageView.tsx';
import { ProductPageView } from './components/ProductPageView.tsx';
import { AiProductFinderView } from './components/AiProductFinderView.tsx';
import { BlogView } from './components/BlogView.tsx';
import { ContactView } from './components/ContactView.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { SampleRequestModal } from './components/SampleRequestModal.tsx';
import { QuickSearchModal } from './components/QuickSearchModal.tsx';
import { GetInTouchModal } from './components/GetInTouchModal.tsx';
import { Product, PRODUCTS } from './data/catalog.ts';

export type AppView = 'home' | 'products' | 'category' | 'product' | 'finder' | 'blogs' | 'contact';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('basic-dyes');
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[0]);
  const [finderQuery, setFinderQuery] = useState<string>('');

  // Modals state
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [sampleProduct, setSampleProduct] = useState<Product | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  // Keyboard shortcut Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsQuickSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab: 'home' | 'products' | 'finder' | 'blogs' | 'contact', categorySlug?: string) => {
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
      setCurrentView('category');
    } else {
      setCurrentView(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categorySlug: string) => {
    setSelectedCategorySlug(categorySlug);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setActiveProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinderSearchFromBanner = (params: { query: string; category: string; dyeClass: string; application: string; shade: string }) => {
    setFinderQuery(params.query || `${params.application !== 'all' ? params.application : ''} ${params.shade !== 'all' ? params.shade : ''}`.trim());
    setCurrentView('finder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAiFinderWithQuery = (q?: string) => {
    setFinderQuery(q || '');
    setCurrentView('finder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSampleRequest = (p: Product) => {
    setSampleProduct(p);
    setIsSampleModalOpen(true);
  };

  // Determine active nav key for highlighting
  const activeNavKey: 'home' | 'products' | 'finder' | 'blogs' | 'contact' = 
    currentView === 'category' || currentView === 'product' ? 'products' : currentView;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbf9] text-stone-900 font-sans selection:bg-[#10873a] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={activeNavKey}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsQuickSearchOpen(true)}
        onGetInTouch={() => setIsGetInTouchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <>
            {/* 1. Hero Section matching reference (seamless one-plane storefront photo) */}
            <HeroSection
              onExploreProducts={() => handleNavigate('products')}
              onExploreFinder={() => handleNavigate('finder')}
            />

            {/* 2. 20 Category Grid Section (Clean typographic cards, no weird images, no random arrows) */}
            <CategoriesSection
              onSelectCategory={handleSelectCategory}
              onViewAllProducts={() => handleNavigate('products')}
            />

            {/* 3. Product Finder Banner with traditional white motifs & AI integration */}
            <ProductFinderBanner
              onSearch={handleFinderSearchFromBanner}
              onOpenAiFinder={handleOpenAiFinderWithQuery}
            />

            {/* 4. GO DYES Highlight Section */}
            <GoDyesSection
              onExploreGoDyes={() => handleSelectCategory('ucp-go-dyes')}
            />

            {/* 5. Global Reach Section with Three.js Rotating 3D Globe with India in Green */}
            <GlobalReachSection />

            {/* 6. Contact Strip (Clean corporate layout without stray clipart) */}
            <ContactStrip
              onContactClick={() => handleNavigate('contact')}
            />
          </>
        )}

        {/* VIEW 2: ALL PRODUCTS OVERVIEW */}
        {currentView === 'products' && (
          <AllProductsView
            onSelectCategory={handleSelectCategory}
            onOpenFinder={() => handleNavigate('finder')}
          />
        )}

        {/* VIEW 3: CATEGORY PAGE (e.g. "Basic Dyes" with Shades table & dynamic color hover) */}
        {currentView === 'category' && (
          <CategoryPageView
            categorySlug={selectedCategorySlug}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onOpenFinder={() => handleNavigate('finder')}
          />
        )}

        {/* VIEW 4: PRODUCT DETAIL PAGE (e.g. "Basic Red 18 Powder" with Full Shade/Reduction) */}
        {currentView === 'product' && (
          <ProductPageView
            product={activeProduct}
            onNavigate={handleNavigate}
            onRequestSample={handleOpenSampleRequest}
            onSuccessToast={showToast}
          />
        )}

        {/* VIEW 5: AI PRODUCT FINDER & CHEMICAL CONSULTANT (Powered by Groq & Gemini) */}
        {currentView === 'finder' && (
          <AiProductFinderView
            initialQuery={finderQuery}
            onSelectProduct={handleSelectProduct}
            onRequestSample={handleOpenSampleRequest}
          />
        )}

        {/* VIEW 6: TECHNICAL BLOGS & CHEMICAL GUIDES */}
        {currentView === 'blogs' && (
          <BlogView
            onNavigateToProducts={() => handleNavigate('products')}
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}

        {/* VIEW 7: CONTACT US */}
        {currentView === 'contact' && (
          <ContactView onSuccessToast={showToast} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Quick Specs Modal */}
      <ProductDetailModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onRequestSample={handleOpenSampleRequest}
      />

      {/* Sample Request & Commercial Quote Modal */}
      <SampleRequestModal
        product={sampleProduct}
        isOpen={isSampleModalOpen}
        onClose={() => {
          setIsSampleModalOpen(false);
          setSampleProduct(null);
        }}
        onSuccessToast={showToast}
      />

      {/* Quick Search Modal (Ctrl+K or Header Search) */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Direct Call & WhatsApp Get In Touch Modal */}
      <GetInTouchModal
        isOpen={isGetInTouchOpen}
        onClose={() => setIsGetInTouchOpen(false)}
        onNavigateToContact={() => handleNavigate('contact')}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-stone-900 text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-2xl border border-stone-700 flex items-center justify-between gap-3 animate-slideUp">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white p-1 cursor-pointer"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
