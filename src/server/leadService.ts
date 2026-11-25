type LeadType = 'contact' | 'sample_request' | 'product_enquiry';

type LeadPayload = {
  leadType?: LeadType;
  contactName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  city?: string;
  productName?: string;
  ciNumber?: string;
  application?: string;
  requirementType?: string;
  notes?: string;
  marketingOptIn?: boolean;
  website?: string;
};

type LeadResult = {
  status: number;
  body: { success: boolean; message?: string; error?: string };
};

const clean = (value: unknown, maxLength: number): string | null => {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return normalized ? normalized.slice(0, maxLength) : null;
};

export async function createLead(input: LeadPayload): Promise<LeadResult> {
  // Honeypot: silently accept automated submissions without storing them.
  if (clean(input.website, 200)) {
    return { status: 200, body: { success: true, message: 'Enquiry received.' } };
  }

  const leadType = input.leadType;
  if (!leadType || !['contact', 'sample_request', 'product_enquiry'].includes(leadType)) {
    return { status: 400, body: { success: false, error: 'Invalid enquiry type.' } };
  }

  const contactName = clean(input.contactName, 120);
  const companyName = clean(input.companyName, 160);
  const email = clean(input.email, 254)?.toLowerCase() ?? null;
  const phone = clean(input.phone, 40);
  const city = clean(input.city, 100);
  const productName = clean(input.productName, 160);
  const ciNumber = clean(input.ciNumber, 100);
  const application = clean(input.application, 500);
  const requirementType = clean(input.requirementType, 100);
  const notes = clean(input.notes, 3000);
  const marketingOptIn = input.marketingOptIn === true;

  if (!contactName || !phone) {
    return { status: 400, body: { success: false, error: 'Please provide your name and phone number.' } };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, body: { success: false, error: 'Please provide a valid email address.' } };
  }
  if (leadType === 'sample_request' && (!companyName || !email || !city || !productName)) {
    return { status: 400, body: { success: false, error: 'Please complete the required sample request details.' } };
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('[LeadGen] Supabase server configuration is missing.');
    return { status: 503, body: { success: false, error: 'Enquiry submission is temporarily unavailable. Please try again later.' } };
  }

  const row = {
    lead_type: leadType,
    contact_name: contactName,
    company_name: companyName,
    email,
    phone,
    city,
    product_name: productName,
    ci_number: ciNumber,
    application,
    requirement_type: requirementType,
    notes,
    source: 'website',
    marketing_opt_in: marketingOptIn,
    marketing_consent_at: marketingOptIn ? new Date().toISOString() : null,
  };

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('[LeadGen] Supabase insert failed:', response.status, detail);
      return { status: 502, body: { success: false, error: 'We could not save your enquiry. Please try again.' } };
    }

    return { status: 201, body: { success: true, message: 'Your enquiry has been received.' } };
  } catch (error) {
    console.error('[LeadGen] Supabase request failed:', error);
    return { status: 502, body: { success: false, error: 'We could not save your enquiry. Please try again.' } };
  }
}
