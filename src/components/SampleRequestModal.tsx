import React, { useState, useEffect } from 'react';
import { Product } from '../data/catalog.ts';

interface SampleRequestModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (msg: string) => void;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({
  product,
  isOpen,
  onClose,
  onSuccessToast,
}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: 'Hyderabad',
    productName: '',
    ciNumber: '',
    application: 'Textile Fabric Dyeing',
    quantity: 'Sample (50g - 500g)',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        productName: product.name,
        ciNumber: product.ciNumber || '',
        application: product.sourceType || 'Textile Fabric Dyeing',
      }));
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadType: 'sample_request',
          contactName: formData.contactPerson,
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          productName: formData.productName,
          ciNumber: formData.ciNumber,
          application: formData.application,
          requirementType: formData.quantity,
          notes: formData.notes,
          marketingOptIn,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'We could not save your request. Please try again.');
      onClose();
      onSuccessToast('Thank you! Your sample/quote request has been received by H. Gokaldas & Co.');
      setMarketingOptIn(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            H. GOKALDAS &amp; CO. &bull; SAMPLE DESK
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Request Sample &bull; Commercial Quotation
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Specify your requirements and lab sample dosage. Our Secunderabad desk dispatches samples across India.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Product details info if selected */}
          {product && (
            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-emerald-950 block">{product.name}</span>
                <span className="text-emerald-800 text-[11px] font-medium">
                  {product.sourceType} {product.ciNumber ? `&bull; CI: ${product.ciNumber}` : ''}
                </span>
              </div>
              {product.darkHex && (
                <div
                  className="w-7 h-7 rounded-full shadow-inner border border-white"
                  style={{ backgroundColor: product.darkHex }}
                  title="Shade preview"
                />
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Company / Mill Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Apex Textiles Pvt Ltd"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Contact Person *
              </label>
              <input
                required
                type="text"
                placeholder="Your Name"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Email Address *
              </label>
              <input
                required
                type="email"
                placeholder="procurement@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Phone / WhatsApp *
              </label>
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                City / Location *
              </label>
              <input
                required
                type="text"
                placeholder="Hyderabad, Surat, Tirupur..."
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Requirement Type
              </label>
              <select
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Lab Sample (100g)">Lab Sample (100g)</option>
                <option value="Pilot Batch (1 - 5 kg)">Pilot Batch (1 - 5 kg)</option>
                <option value="Trial Drum (25 kg)">Trial Drum (25 kg)</option>
                <option value="Bulk Order (100+ kg)">Bulk Order (100+ kg)</option>
                <option value="Price & Availability Inquiry">Price &amp; Availability Inquiry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
              Application Details / Substrate / Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. 100% cotton knit, jet dyeing machine, requires high wash fastness..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50 text-xs"
            ></textarea>
          </div>

          <label className="flex items-start gap-2 text-[11px] text-stone-600 leading-relaxed">
            <input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} className="mt-0.5 accent-[#098549]" />
            <span>I agree to receive occasional product updates and marketing communications from H. Gokaldas &amp; Co. on WhatsApp or email. This is optional and can be withdrawn anytime.</span>
          </label>
          {submitError && <p role="alert" className="text-xs text-red-600">{submitError}</p>}

          {/* Submit Row */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-full bg-[#098549] hover:bg-[#065f32] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Submitting Request...' : 'Send Enquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
