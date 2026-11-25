-- HGC LeadGen V1
-- Apply this migration in the NEW HGC Supabase project before enabling submissions.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  lead_type text not null check (lead_type in ('contact', 'sample_request', 'product_enquiry')),
  contact_name text not null,
  company_name text,
  email text,
  phone text,
  city text,
  product_name text,
  ci_number text,
  application text,
  requirement_type text,
  notes text,
  source text not null default 'website',
  marketing_opt_in boolean not null default false,
  marketing_consent_at timestamptz,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leads_marketing_consent_consistent
    check (
      (marketing_opt_in = false and marketing_consent_at is null)
      or (marketing_opt_in = true and marketing_consent_at is not null)
    )
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status, created_at desc);
create index if not exists leads_type_idx on public.leads (lead_type, created_at desc);
create index if not exists leads_email_idx on public.leads (lower(email)) where email is not null;

alter table public.leads enable row level security;

-- No public/anon/authenticated read or write policies are created.
-- Inserts are performed only by the server using the Supabase service-role key.
revoke all on table public.leads from anon, authenticated;
grant all on table public.leads to service_role;

comment on table public.leads is 'HGC website enquiries and sample requests captured for LeadGen V1.';
comment on column public.leads.marketing_opt_in is 'Explicit optional consent for future marketing communications; not required to submit an enquiry.';
