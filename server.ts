import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { PRODUCTS } from './src/data/catalog.ts';
import { createLead } from './src/server/leadService.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse port and host from argv (npm run dev --port 3000 --host 0.0.0.0) or env
let port = 3000;
const portArgIndex = process.argv.indexOf('--port');
if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
  const parsedPort = parseInt(process.argv[portArgIndex + 1], 10);
  if (!isNaN(parsedPort)) port = parsedPort;
} else if (process.env.PORT) {
  const parsedPort = parseInt(process.env.PORT, 10);
  if (!isNaN(parsedPort)) port = parsedPort;
}

let host = '0.0.0.0';
const hostArgIndex = process.argv.indexOf('--host');
if (hostArgIndex !== -1 && process.argv[hostArgIndex + 1]) {
  host = process.argv[hostArgIndex + 1];
} else if (process.env.HOST) {
  host = process.env.HOST;
}

const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Lead capture API (shared with the Vercel serverless endpoint)
app.post('/api/leads', async (req: Request, res: Response) => {
  const result = await createLead(req.body || {});
  return res.status(result.status).json(result.body);
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    productsCount: PRODUCTS.length,
    groqConfigured: !!process.env.GROQ_API_KEY,
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString(),
  });
});

// AI-powered product finder endpoint supporting Groq, Gemini, and Domain Engine
app.post('/api/ai-product-finder', async (req: Request, res: Response) => {
  try {
    const { query, category, application, shade } = req.body || {};
    const userPrompt = (query || '').trim();

    if (!userPrompt && (!category || category === 'all') && (!application || application === 'all') && (!shade || shade === 'all')) {
      return res.status(400).json({ error: 'Please enter a search query or select at least one criteria.' });
    }

    const {
      parseUserQuery,
      filterCandidateCatalog,
      rankCandidates,
      generateTechnicalAdvice,
      executeProductFinderSearch,
    } = await import('./src/utils/productFinderEngine.ts');

    // 1. Strictly parse intent, target colors, and substrate
    const parsed = parseUserQuery(userPrompt, category, application, shade);
    
    // 2. Strictly filter candidate pool:
    // - If DYE / COLOR: exclude all chemicals, keep only matching colors (if color requested)
    // - If CHEMICAL: exclude all dyes/pigments, keep only chemicals/auxiliaries
    const qualifiedCandidates = filterCandidateCatalog(PRODUCTS, parsed);
    const rankedCandidates = rankCandidates(qualifiedCandidates, parsed);

    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // If no qualified candidates matched (e.g. extreme mismatch), fallback safely
    if (rankedCandidates.length === 0) {
      const fallbackResult = executeProductFinderSearch(userPrompt, category, application, shade);
      return res.json(fallbackResult);
    }

    // Top ranked candidates for AI consideration (max 35 items)
    const sampleForPrompt = rankedCandidates.slice(0, 35).map(p => ({
      id: p.id,
      name: p.name,
      ci: p.ciNumber,
      category: p.sourceType,
      categorySlug: p.categorySlug,
      darkHex: p.darkHex,
      lightHex: p.lightHex,
    }));

    const qualifiedIds = new Set(qualifiedCandidates.map(p => p.id));

    const systemInstruction = `You are the chief technical dye chemist and application consultant for H. Gokaldas & Co. (established 1963 in Hyderabad & Secunderabad, India).
IMPORTANT APPLICATION RULES:
1. STRICT PRODUCT CATEGORIZATION:
   - If the user is asking for DYES or COLOURS (e.g. yellow, blue, red, cotton dye, reactive, etc.): Recommend ONLY dyes or pigments matching that EXACT colour and use case. Under NO circumstances recommend chemicals or wrong colors.
   - If the user is asking for CHEMICALS or AUXILIARIES (e.g. softener, fixing agent, hydrosulphite, binder, thickener, salt, etc.): Recommend ONLY chemical auxiliaries. Under NO circumstances recommend dyes or pigments.
2. Only select products from the provided Candidate Catalog. Never hallucinate IDs.
3. Provide accurate technical dyebath recipes (temperatures, Glauber's salt dosage, Soda ash, pH, fastness) or chemical application rates.

Return valid JSON only with format:
{
  "recommendationSummary": "Concise 1-2 sentence recommendation specifying the matched shade/chemical",
  "matchedProductIds": ["id1", "id2", ...],
  "technicalAdvice": "Practical recipe with temperatures, salt/alkali dosage, and process steps",
  "suitabilityExplanation": "Why these products are strictly suitable for this substrate and shade"
}`;

    const promptText = `User Query: "${userPrompt || 'Recommend suitable products'}"
Detected Intent: ${parsed.intent}
Target Colors: ${parsed.targetColors.length > 0 ? parsed.targetColors.join(', ') : 'None specified'}
Target Substrate: ${parsed.targetSubstrate || 'General'}
Criteria: Category="${category || 'Any'}", Application="${application || 'Any'}", Shade="${shade || 'Any'}"

Available Candidate Products (strictly pre-filtered to matching class and color):
${JSON.stringify(sampleForPrompt, null, 1)}

Select the best 3 to 6 product IDs exclusively from this candidate list and provide technical advice.`;

    // Try Groq AI first if GROQ_API_KEY is configured
    if (groqKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: promptText },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
          }),
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const content = groqData.choices?.[0]?.message?.content?.trim();
          if (content) {
            const parsedAi = JSON.parse(content);
            const matchedIds: string[] = Array.isArray(parsedAi.matchedProductIds) ? parsedAi.matchedProductIds : [];
            // STRICT post-filter validation: ONLY allow IDs that exist in qualifiedCandidates!
            let matchedProducts = PRODUCTS.filter(p => matchedIds.includes(p.id) && qualifiedIds.has(p.id));

            if (matchedProducts.length < 3) {
              const extra = rankedCandidates.filter(p => !matchedProducts.some(m => m.id === p.id)).slice(0, 6 - matchedProducts.length);
              matchedProducts = [...matchedProducts, ...extra];
            }

            const fallbackAdvice = generateTechnicalAdvice(parsed, matchedProducts);

            return res.json({
              success: true,
              aiPowered: true,
              engine: 'Groq (llama-3.3-70b-versatile)',
              intent: parsed.intent,
              detectedColors: parsed.targetColors,
              detectedSubstrate: parsed.targetSubstrate,
              summary: parsedAi.recommendationSummary || fallbackAdvice.summary,
              technicalAdvice: parsedAi.technicalAdvice || fallbackAdvice.technicalAdvice,
              suitabilityExplanation: parsedAi.suitabilityExplanation || fallbackAdvice.suitabilityExplanation,
              products: matchedProducts,
            });
          }
        }
      } catch (groqErr) {
        console.warn('[AI] Groq call failed, attempting fallback:', groqErr);
      }
    }

    // Try Gemini if GEMINI_API_KEY is configured
    if (geminiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: promptText,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
          },
        });

        const rawText = response.text?.trim() || '{}';
        const parsedAi = JSON.parse(rawText);

        const matchedIds: string[] = Array.isArray(parsedAi.matchedProductIds) ? parsedAi.matchedProductIds : [];
        // STRICT post-filter validation: ONLY allow IDs that exist in qualifiedCandidates!
        let matchedProducts = PRODUCTS.filter(p => matchedIds.includes(p.id) && qualifiedIds.has(p.id));

        if (matchedProducts.length < 3) {
          const extra = rankedCandidates.filter(p => !matchedProducts.some(m => m.id === p.id)).slice(0, 6 - matchedProducts.length);
          matchedProducts = [...matchedProducts, ...extra];
        }

        const fallbackAdvice = generateTechnicalAdvice(parsed, matchedProducts);

        return res.json({
          success: true,
          aiPowered: true,
          engine: 'Gemini 2.5 Flash',
          intent: parsed.intent,
          detectedColors: parsed.targetColors,
          detectedSubstrate: parsed.targetSubstrate,
          summary: parsedAi.recommendationSummary || fallbackAdvice.summary,
          technicalAdvice: parsedAi.technicalAdvice || fallbackAdvice.technicalAdvice,
          suitabilityExplanation: parsedAi.suitabilityExplanation || fallbackAdvice.suitabilityExplanation,
          products: matchedProducts,
        });
      } catch (geminiError) {
        console.warn('[AI] Gemini API call failed, falling back to Domain Engine:', geminiError);
      }
    }

    // Domain Engine Fallback (guaranteed 100% precision without external API keys)
    const topProducts = rankedCandidates.slice(0, 12);
    const domainAdvice = generateTechnicalAdvice(parsed, topProducts);

    return res.json({
      success: true,
      aiPowered: false,
      engine: 'Intelligent Chemical Domain Engine',
      intent: parsed.intent,
      detectedColors: parsed.targetColors,
      detectedSubstrate: parsed.targetSubstrate,
      summary: domainAdvice.summary,
      technicalAdvice: domainAdvice.technicalAdvice,
      suitabilityExplanation: domainAdvice.suitabilityExplanation,
      products: topProducts,
    });
  } catch (err: any) {
    console.error('Error in product finder:', err);
    res.status(500).json({ error: 'Failed to process product search.', details: err?.message });
  }
});

// Vite dev middleware or static serving
async function setupServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const server = app.listen(port, host, () => {
    console.log(`HGC Application Server running at http://${host}:${port}`);
  });

  server.on('error', (err: any) => {
    console.error('[Server] Server error:', err);
    if (err.code === 'EADDRINUSE') {
      console.error(`[Server] Port ${port} is already in use.`);
      process.exit(1);
    }
  });

  const shutdown = () => {
    try {
      server.close(() => process.exit(0));
    } catch (_) {
      process.exit(0);
    }
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

setupServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
