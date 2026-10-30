import React from 'react';

interface ContactStripProps {
  onContactClick: () => void;
}

export const ContactStrip: React.FC<ContactStripProps> = ({ onContactClick }) => {
  return (
    <section className="py-16 lg:py-20 bg-white border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fafbf9] rounded-3xl border border-stone-200 p-8 sm:p-12 lg:p-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Heading & Description */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#098549] block mb-2">
                GET IN TOUCH
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-snug mb-3">
                Let&apos;s discuss your <span className="text-[#098549]">requirements.</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-600 mb-6 max-w-xl leading-relaxed">
                We are here to help with product specifications, pricing, lot availability and custom industrial enquiries.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/919100112561?text=Hello%20H.%20Gokaldas%20%26%20Co.%2C%20I%20would%20like%20to%20discuss%20my%20dye%20and%20chemical%20requirements."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.57 1.961.882 2.791.882h.005c3.179 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.768-5.764-5.768zm3.377 8.219c-.145.405-.722.756-1.026.804-.287.045-.662.064-2.143-.549-1.894-.784-3.111-2.716-3.205-2.842-.093-.127-.768-1.022-.768-1.949 0-.928.487-1.385.66-1.574.174-.189.38-.236.507-.236.127 0 .254.002.366.007.118.005.276-.045.431.328.16.386.549 1.341.597 1.439.048.098.08.213.016.34-.064.127-.096.206-.191.318-.095.111-.2.248-.286.333-.095.095-.195.198-.084.389.111.19.493.813 1.058 1.317.727.647 1.34.847 1.53.942.191.095.302.079.414-.048.111-.127.476-.556.603-.746.127-.19.254-.159.428-.095.175.063 1.111.524 1.301.619.191.095.318.143.365.222.048.079.048.46-.097.865z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href="tel:9100112561"
                  className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call Desk</span>
                </a>
                <button
                  onClick={onContactClick}
                  className="px-5 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Map &amp; Form &rarr;
                </button>
              </div>
            </div>

            {/* Right: Clean Corporate Contact Details Card (No Clipart/Motifs) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#10873a] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-stone-900 block">Head Office &amp; Depot</span>
                  <p className="text-sm text-stone-700 mt-0.5 leading-relaxed">
                    2-4-1, Pan Bazar, Secunderabad &ndash; 500003, Hyderabad, Telangana, India
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=2-4-1+Pan+Bazar+Secunderabad+Telangana+500003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#098549] font-bold hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    <span>View on Google Maps</span> &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#10873a] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-stone-900 block">Phone Desk</span>
                  <p className="text-sm text-stone-700 mt-0.5 font-bold">
                    <a href="tel:9100112561" className="hover:text-[#098549]">9100112561</a> / <a href="tel:9347212561" className="hover:text-[#098549]">9347212561</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#10873a] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-stone-900 block">Direct Email</span>
                  <a
                    href="mailto:devvhgokaldas@gmail.com"
                    className="text-sm text-[#10873a] font-bold hover:underline"
                  >
                    devvhgokaldas@gmail.com
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
