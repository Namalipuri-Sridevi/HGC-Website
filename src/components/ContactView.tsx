import React, { useState } from 'react';

interface ContactViewProps {
  onSuccessToast: (msg: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onSuccessToast }) => {
  // Minimal fields: Name, Phone, Requirement
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requirement, setRequirement] = useState('');

  const handleWhatsAppEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !requirement.trim()) return;

    const message = `Hello H. Gokaldas & Co.,\n\n*Product / Commercial Enquiry*\n*Name / Company:* ${name.trim()}\n*Phone / WhatsApp:* ${phone.trim() || 'Not provided'}\n*Requirement:* ${requirement.trim()}`;
    const url = `https://wa.me/919100112561?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    onSuccessToast('Redirecting to WhatsApp to send your enquiry...');
    setName('');
    setPhone('');
    setRequirement('');
  };

  return (
    <div className="bg-[#fafbf9] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#098549] mb-2">
            ESTABLISHED 1963 &bull; SECUNDERABAD, INDIA
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Contact <span className="text-[#098549]">H. Gokaldas &amp; Co.</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Reach our central distribution office directly via WhatsApp, direct telephone lines, or visit our historic facility in Pan Bazar, Secunderabad.
          </p>
        </div>

        {/* 3 Quick Direct Touchpoints (WhatsApp, Phone, Google Maps) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {/* 1. Direct WhatsApp */}
          <a
            href="https://wa.me/919100112561?text=Hello%20H.%20Gokaldas%20%26%20Co.%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl p-6 border-2 border-emerald-500/30 hover:border-[#25D366] shadow-xs hover:shadow-md transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.57 1.961.882 2.791.882h.005c3.179 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.768-5.764-5.768zm3.377 8.219c-.145.405-.722.756-1.026.804-.287.045-.662.064-2.143-.549-1.894-.784-3.111-2.716-3.205-2.842-.093-.127-.768-1.022-.768-1.949 0-.928.487-1.385.66-1.574.174-.189.38-.236.507-.236.127 0 .254.002.366.007.118.005.276-.045.431.328.16.386.549 1.341.597 1.439.048.098.08.213.016.34-.064.127-.096.206-.191.318-.095.111-.2.248-.286.333-.095.095-.195.198-.084.389.111.19.493.813 1.058 1.317.727.647 1.34.847 1.53.942.191.095.302.079.414-.048.111-.127.476-.556.603-.746.127-.19.254-.159.428-.095.175.063 1.111.524 1.301.619.191.095.318.143.365.222.048.079.048.46-.097.865z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#25D366] block">
                Instant WhatsApp
              </span>
              <div className="text-base font-bold text-stone-900 mt-0.5 group-hover:text-emerald-700 transition-colors">
                +91 9100112561
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Tap to chat directly with our commercial team on WhatsApp &rarr;
              </p>
            </div>
          </a>

          {/* 2. Direct Telephone Desk */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#098549] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 block">
                Direct Call Desk
              </span>
              <div className="text-base font-bold text-stone-900 mt-0.5 space-x-2">
                <a href="tel:9100112561" className="hover:text-[#098549] transition-colors">9100112561</a>
                <span className="text-stone-300">/</span>
                <a href="tel:9347212561" className="hover:text-[#098549] transition-colors">9347212561</a>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Monday &ndash; Saturday: 10:00 AM &ndash; 7:30 PM IST
              </p>
            </div>
          </div>

          {/* 3. Google Maps Link */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=2-4-1+Pan+Bazar+Secunderabad+Telangana+500003"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl p-6 border-2 border-stone-200 hover:border-[#098549] shadow-xs hover:shadow-md transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600 block">
                Google Maps Location
              </span>
              <div className="text-base font-bold text-stone-900 mt-0.5 group-hover:text-[#098549] transition-colors">
                Pan Bazar, Secunderabad
              </div>
              <p className="text-xs text-stone-500 mt-1 flex items-center gap-1 font-medium text-emerald-800">
                <span>Open in Google Maps</span> &rarr;
              </p>
            </div>
          </a>
        </div>

        {/* Main Grid: Left = Minimal WhatsApp Enquiry Form, Right = Location & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Quick Minimal Enquiry Form (Goes to WhatsApp) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#098549]">
                DIRECT WHATSAPP ENQUIRY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-2">
              Fast Product Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-6">
              Fill in these quick details and click to open WhatsApp immediately with your requirement formatted for our team.
            </p>

            <form onSubmit={handleWhatsAppEnquiry} className="space-y-4">
              {/* Field 1: Name / Company */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Name or Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ramesh Patel / ABC Textiles"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#098549] focus:bg-white transition-all"
                />
              </div>

              {/* Field 2: Mobile / WhatsApp Number (optional/minimal) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Mobile / WhatsApp Number <span className="text-stone-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#098549] focus:bg-white transition-all"
                />
              </div>

              {/* Field 3: Product Requirement / Dye Shade */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  What Product or Shade Do You Need? <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Reactive Black B 100kg, Pigment Yellow 12, or shade matching for cotton fabric..."
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#098549] focus:bg-white transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button routing to WhatsApp */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.57 1.961.882 2.791.882h.005c3.179 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.768-5.764-5.768zm3.377 8.219c-.145.405-.722.756-1.026.804-.287.045-.662.064-2.143-.549-1.894-.784-3.111-2.716-3.205-2.842-.093-.127-.768-1.022-.768-1.949 0-.928.487-1.385.66-1.574.174-.189.38-.236.507-.236.127 0 .254.002.366.007.118.005.276-.045.431.328.16.386.549 1.341.597 1.439.048.098.08.213.016.34-.064.127-.096.206-.191.318-.095.111-.2.248-.286.333-.095.095-.195.198-.084.389.111.19.493.813 1.058 1.317.727.647 1.34.847 1.53.942.191.095.302.079.414-.048.111-.127.476-.556.603-.746.127-.19.254-.159.428-.095.175.063 1.111.524 1.301.619.191.095.318.143.365.222.048.079.048.46-.097.865z" />
                  </svg>
                  <span>Send Enquiry via WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-stone-400 mt-2">
                  Opens WhatsApp directly with your message ready to send &bull; No email required
                </p>
              </div>
            </form>
          </div>

          {/* Right Column: Google Maps & Office Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Embedded Google Map */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Office &amp; Warehouse Location
                  </h3>
                  <p className="text-xs text-stone-500">
                    2-4-1, Pan Bazar, Secunderabad, Telangana 500003
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=2-4-1+Pan+Bazar+Secunderabad+Telangana+500003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span>Open in Maps</span>
                </a>
              </div>

              {/* Map embed iframe */}
              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 relative">
                <iframe
                  title="Google Map Location of H. Gokaldas & Co., Pan Bazar, Secunderabad"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=2-4-1%20Pan%20Bazar%2C%20Secunderabad%2C%20Telangana%20500003&t=&z=16&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>

              {/* Address Strip */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
                <div>
                  <span className="font-bold text-stone-900 block">Registered Address:</span>
                  <span>2-4-1, Pan Bazar, Secunderabad - 500003, Hyderabad, Telangana, India</span>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=2-4-1+Pan+Bazar+Secunderabad+Telangana+500003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#098549] font-bold hover:underline whitespace-nowrap"
                >
                  <span>Get Directions</span> &rarr;
                </a>
              </div>
            </div>

            {/* Vision & Mission from company archival profile */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4 text-xs sm:text-sm">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#098549] block mb-1">
                  Our Vision
                </span>
                <h4 className="font-extrabold text-stone-900 text-sm sm:text-base mb-1">
                  Quality that earns trust.
                </h4>
                <p className="text-stone-600 leading-relaxed text-xs">
                  To be a trusted name in dyes and chemicals, known for consistent product quality and dependable service across Indian industries.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#098549] block mb-1">
                  Our Mission
                </span>
                <h4 className="font-extrabold text-stone-900 text-sm sm:text-base mb-1">
                  Never compromise on quality.
                </h4>
                <p className="text-stone-600 leading-relaxed text-xs">
                  We carefully select the dyes, pigments and chemicals we supply, working with established manufacturers and trusted principals. Our focus is simple: supply the right product, maintain consistent quality, and deliver as promised.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
