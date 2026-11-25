# HGC LeadGen V1 — setup notes

This branch adds server-side enquiry capture. It does not deploy the site, create a Supabase project, send WhatsApp messages, or send marketing messages.

## 1. Create the Supabase project

Use the HGC Supabase project: https://supabase.com/dashboard/project/axoqmrxnizkptquradia (project ref: `axoqmrxnizkptquradia`). Keep its database credentials private.

## 2. Create the leads table

In the Supabase SQL Editor, run:

`supabase/migrations/20261125_create_leads.sql`

The table has RLS enabled and no public policies. Browser clients must never receive the secret key.

## 3. Configure server environment variables

Add these to the local server environment and the Vercel project's Environment Variables when you are ready to test/deploy:

- `SUPABASE_URL`: `https://axoqmrxnizkptquradia.supabase.co`.
- `SUPABASE_SECRET_KEY`: Secret secret key from Supabase project settings.

Do not prefix the secret key with `VITE_`. Do not commit real credentials to Git. Use the `sb_secret_...` key from Settings → API Keys; never use the publishable key for this server endpoint.

## 4. Local development

The Express development server exposes the same `POST /api/leads` endpoint. After adding the two environment variables, run:

```bash
npm install
npm run dev
```

The endpoint accepts `contact`, `sample_request`, and `product_enquiry` lead types. It validates the required fields and stores an explicit optional marketing opt-in separately from the enquiry itself.

## 5. Safety and rollout

- The service-role key is used only on the server.
- RLS is enabled; no anonymous insert/select policy is added.
- Marketing consent is optional and timestamped only when selected.
- No WhatsApp API integration or outbound messaging is included.
- Do not deploy until the Supabase project and environment variables have been configured and the form flows have been tested.
