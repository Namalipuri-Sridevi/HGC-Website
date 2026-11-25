import React, { useState } from 'react';
import { Product } from '../data/catalog.ts';
import { ProductSwatchCarousel, isNonColorCategory } from './ProductSwatchCarousel.tsx';

interface ProductPageViewProps {
  product: Product;
  onNavigate: (tab: 'home' | 'products' | 'finder' | 'contact' | 'blogs', categorySlug?: string) => void;
  onRequestSample: (product: Product) => void;
  onSuccessToast: (msg: string) => void;
}

export const ProductPageView: React.FC<ProductPageViewProps> = ({
  product,
  onNavigate,
  onRequestSample,
  onSuccessToast,
}) => {
  const [inquiryData, setInquiryData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
  });
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadType: 'product_enquiry',
          contactName: inquiryData.contactPerson,
          companyName: inquiryData.companyName,
          phone: inquiryData.phone,
          productName: product.name,
          marketingOptIn,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'We could not save your enquiry. Please try again.');
      onSuccessToast(`Thank you! Your enquiry for ${product.name} has been received.`);
      setInquiryData({ companyName: '', contactPerson: '', phone: '' });
      setMarketingOptIn(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fafbf9] min-h-screen py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-8" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800 transition-colors cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('products')} className="hover:text-emerald-800 transition-colors cursor-pointer">All Products</button>
          <span>/</span>
          <button onClick={() => onNavigate('products', product.categorySlug)} className="hover:text-emerald-800 transition-colors cursor-pointer">{product.sourceType}</button>
          <span>/</span>
          <span className="text-stone-900 font-bold truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16">
          
          {/* Left Column: Product Details & Action Buttons */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {isNonColorCategory(product.categorySlug)
                ? `${product.name} is a high-grade ${product.sourceType} supplied by H. Gokaldas & Co., engineered for optimal technical performance and batch-to-batch reliability in industrial processing.`
                : `${product.name} is a high-grade ${product.sourceType} engineered for industrial application. It delivers high tinctorial strength, uniform dispersion, and consistent reproducibility across production batches.`}
            </p>

            {/* Crisp Action Buttons matching the reference design */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onRequestSample(product)}
                className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none shadow-xs"
              >
                Request this grade
              </button>

              <a
                href={`https://wa.me/919100112561?text=${encodeURIComponent(`Hi H. Gokaldas & Co., I am inquiring about ${product.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none shadow-xs text-center inline-block"
              >
                WhatsApp enquiry
              </a>
            </div>
          </div>

          {/* Right Column: Crisp Sharp-Bordered Shade Card */}
          <div className="lg:col-span-6">
            <ProductSwatchCarousel product={product} size="lg" />
          </div>

        </div>

        {/* Bottom Form */}
        <div className="bg-white rounded-none border border-stone-300 p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl font-extrabold text-stone-900">Get in Touch with us</h3>
              <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input required type="text" placeholder="Enter Company Name*" value={inquiryData.companyName} onChange={(e) => setInquiryData({ ...inquiryData, companyName: e.target.value })} className="w-full px-3.5 py-2.5 border border-stone-300 rounded-none text-xs bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-[#098549]" />
                  <input required type="text" placeholder="Enter Contact Person Name*" value={inquiryData.contactPerson} onChange={(e) => setInquiryData({ ...inquiryData, contactPerson: e.target.value })} className="w-full px-3.5 py-2.5 border border-stone-300 rounded-none text-xs bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-[#098549]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="sm:col-span-1">
                    <select className="w-full px-3.5 py-2.5 border border-stone-300 rounded-none text-xs bg-stone-50/50"><option>India (भारत)</option></select>
                  </div>
                  <div className="sm:col-span-2">
                    <input required type="tel" placeholder="+91 Mobile/Whatsapp Number*" value={inquiryData.phone} onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })} className="w-full px-3.5 py-2.5 border border-stone-300 rounded-none text-xs bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-[#098549]" />
                  </div>
                </div>
                <label className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed"><input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} className="mt-0.5 accent-[#098549]" /><span>I agree to receive occasional product updates and marketing communications from H. Gokaldas &amp; Co. This is optional.</span></label>
                {submitError && <p role="alert" className="text-xs text-red-600">{submitError}</p>}
                <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-none bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.57 1.961.882 2.791.882h.005c3.179 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.768-5.764-5.768zm3.377 8.219c-.145.405-.722.756-1.026.804-.287.045-.662.064-2.143-.549-1.894-.784-3.111-2.716-3.205-2.842-.093-.127-.768-1.022-.768-1.949 0-.928.487-1.385.66-1.574.174-.189.38-.236.507-.236.127 0 .254.002.366.007.118.005.276-.045.431.328.16.386.549 1.341.597 1.439.048.098.08.213.016.34-.064.127-.096.206-.191.318-.095.111-.2.248-.286.333-.095.095-.195.198-.084.389.111.19.493.813 1.058 1.317.727.647 1.34.847 1.53.942.191.095.302.079.414-.048.111-.127.476-.556.603-.746.127-.19.254-.159.428-.095.175.063 1.111.524 1.301.619.191.095.318.143.365.222.048.079.048.46-.097.865z" />
                  </svg>
                  <span>{submitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
