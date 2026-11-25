import { createLead } from '../src/server/leadService.ts';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  const result = await createLead(req.body || {});
  return res.status(result.status).json(result.body);
}
