import React from 'react';

interface GetInTouchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToContact?: () => void;
}

export const GetInTouchModal: React.FC<GetInTouchModalProps> = ({
  isOpen,
  onClose,
  onNavigateToContact,
}) => {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const text = 'Hello H. Gokaldas & Co., I would like to get in touch regarding your dyes, chemicals, and product pricing.';
    const url = `https://wa.me/919100112561?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl overflow-hidden animate-scaleUp p-6 sm:p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-6">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#098549] mb-1">
            DIRECT CONNECTION &bull; H. GOKALDAS &amp; CO.
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            Get in Touch
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Connect immediately via WhatsApp or direct phone call with our Secunderabad central desk.
          </p>
        </div>

        {/* Direct Action 1: WhatsApp */}
        <div className="space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-left font-medium transition-all shadow-xs hover:shadow-md cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.57 1.961.882 2.791.882h.005c3.179 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.768-5.764-5.768zm3.377 8.219c-.145.405-.722.756-1.026.804-.287.045-.662.064-2.143-.549-1.894-.784-3.111-2.716-3.205-2.842-.093-.127-.768-1.022-.768-1.949 0-.928.487-1.385.66-1.574.174-.189.38-.236.507-.236.127 0 .254.002.366.007.118.005.276-.045.431.328.16.386.549 1.341.597 1.439.048.098.08.213.016.34-.064.127-.096.206-.191.318-.095.111-.2.248-.286.333-.095.095-.195.198-.084.389.111.19.493.813 1.058 1.317.727.647 1.34.847 1.53.942.191.095.302.079.414-.048.111-.127.476-.556.603-.746.127-.19.254-.159.428-.095.175.063 1.111.524 1.301.619.191.095.318.143.365.222.048.079.048.46-.097.865z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold tracking-wide">
                Chat on WhatsApp
              </div>
              <div className="text-xs text-white/90">
                +91 9100112561 &bull; Instant Response
              </div>
            </div>
            <svg className="w-5 h-5 text-white/80 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Direct Action 2: Phone Call 1 */}
          <button
            onClick={() => handleCall('9100112561')}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-left font-medium transition-all shadow-xs hover:shadow-md cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold tracking-wide">
                Call Central Desk
              </div>
              <div className="text-xs text-stone-300">
                +91 9100112561 &bull; Mon–Sat 10:00 AM–7:30 PM
              </div>
            </div>
            <svg className="w-5 h-5 text-stone-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Direct Action 3: Alternate Phone Call */}
          <button
            onClick={() => handleCall('9347212561')}
            className="w-full flex items-center gap-3.5 p-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-left font-medium transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-stone-900">
                Alternate Line: +91 9347212561
              </div>
              <div className="text-[11px] text-stone-500">
                Secunderabad Dispatch Office
              </div>
            </div>
            <span className="text-xs font-bold text-[#098549]">Call</span>
          </button>
        </div>

        {/* Optional Link to Full Contact & Map Page */}
        {onNavigateToContact && (
          <div className="mt-5 pt-4 border-t border-stone-200 text-center">
            <button
              onClick={() => {
                onClose();
                onNavigateToContact();
              }}
              className="text-xs font-semibold text-[#098549] hover:underline cursor-pointer"
            >
              Looking for office map, address &amp; fast enquiry? View Contact Page &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
