import fs from 'fs';
import { PRODUCTS } from '../src/data/catalog.ts';

const rawDp = JSON.parse(fs.readFileSync('src/data/dyespigments_raw.json', 'utf8'));

console.log(`Loaded ${rawDp.length} dyespigments.net items.`);
console.log(`Total HGC products: ${PRODUCTS.length}`);

function clean(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(Boolean);
}

// Food specific curated pool directly from dyespigments.net
const foodItems = rawDp.filter(d => 
  d.title.toLowerCase().includes('allocol') || 
  d.slug.includes('allocol') || 
  d.slug.includes('food') ||
  d.title.toLowerCase().includes('curcumin') ||
  d.title.toLowerCase().includes('chlorophyll') ||
  d.title.toLowerCase().includes('paprika') ||
  d.title.toLowerCase().includes('annatto') ||
  d.title.toLowerCase().includes('titanium-dioxide')
);

// Chemical & auxiliary pool from dyespigments.net
const chemicalItems = rawDp.filter(d => 
  d.slug.includes('liquid') || 
  d.title.toLowerCase().includes('salt free') || 
  d.title.toLowerCase().includes('cleaner') || 
  d.slug.includes('auxiliary') ||
  d.title.toLowerCase().includes('acid blue 9')
);

// Leather pool
const leatherItems = rawDp.filter(d => 
  d.slug.includes('leather') || 
  d.title.toLowerCase().includes('acid black 2') ||
  d.title.toLowerCase().includes('acid black 84') ||
  d.title.toLowerCase().includes('acid brown')
);

// Pigment pool
const pigmentItems = rawDp.filter(d => 
  d.slug.includes('pigment') || 
  d.title.toLowerCase().includes('pigment') ||
  d.title.toLowerCase().includes('fluorescent')
);

// Paper / ink pool
const paperInkItems = rawDp.filter(d => 
  d.title.toLowerCase().includes('paper') || 
  d.title.toLowerCase().includes('ink') || 
  d.slug.includes('salt-free') ||
  d.title.toLowerCase().includes('acid blue 9')
);

const dpList = rawDp.map(item => {
  const normTitle = item.title.toLowerCase();
  const normSlug = item.slug.toLowerCase();
  const tokens = new Set(clean(`${normTitle} ${normSlug}`));
  return {
    ...item,
    normTitle,
    normSlug,
    tokens,
    usedCount: 0
  };
});

const resultMap = {};

for (const p of PRODUCTS) {
  const cat = p.categorySlug;
  const pName = p.name;
  const ci = p.ciNumber || '';
  const darkHex = p.darkHex || '';

  let matched = null;

  // 1. Direct CI number match
  if (ci) {
    const ciTokens = clean(ci);
    // Find item in dpList containing all CI tokens
    const ciMatches = dpList.filter(d => ciTokens.every(tok => d.tokens.has(tok)));
    if (ciMatches.length > 0) {
      // Prefer match that also matches category type
      const catWord = cat.split('-')[0];
      const withCat = ciMatches.find(m => m.tokens.has(catWord));
      matched = withCat || ciMatches[0];
    }
  }

  // 2. Direct Name match
  if (!matched && pName) {
    const nameTokens = clean(pName);
    if (nameTokens.length >= 2) {
      const nameMatches = dpList.filter(d => nameTokens.every(tok => d.tokens.has(tok)));
      if (nameMatches.length > 0) {
        matched = nameMatches[0];
      }
    }
  }

  // 3. Category & End-use Specialized Pool Match
  if (!matched) {
    const colorWords = ['yellow', 'gold', 'orange', 'red', 'scarlet', 'crimson', 'blue', 'navy', 'turquoise', 'green', 'black', 'violet', 'purple', 'brown', 'pink', 'magenta', 'cyan', 'grey', 'white'];
    const pSearch = `${pName} ${ci} ${cat}`.toLowerCase();
    const foundColor = colorWords.find(c => pSearch.includes(c));

    let pool = dpList;

    if (cat === 'food-supra') {
      pool = foodItems.map(f => dpList.find(d => d.id === f.id)).filter(Boolean);
    } else if (cat === 'chemicals-in-general' || cat === 'cht-india') {
      pool = chemicalItems.map(c => dpList.find(d => d.id === c.id)).filter(Boolean);
    } else if (cat.includes('pigment') || cat === 'fine-hc-pigment-emulsion' || cat === 'metal-oxide-inorganic-pigments' || cat === 'metal-powders' || cat === 'glitter-dg') {
      pool = pigmentItems.map(p => dpList.find(d => d.id === p.id)).filter(Boolean);
    } else if (cat === 'napthols-and-base') {
      // Azoic fast reds and oranges
      pool = dpList.filter(d => d.tokens.has('red') || d.tokens.has('scarlet') || d.tokens.has('orange') || d.tokens.has('azo'));
    }

    if (!pool || pool.length === 0) pool = dpList;

    // Filter by color if available
    let candidates = foundColor ? pool.filter(d => d.tokens.has(foundColor)) : pool;
    if (candidates.length === 0) candidates = pool;

    // Pick least used to guarantee maximum variety and zero repetitive slop
    candidates.sort((a, b) => a.usedCount - b.usedCount);
    matched = candidates[0];
  }

  if (matched) {
    matched.usedCount++;
    resultMap[p.id] = {
      img: matched.img,
      title: `${matched.title} Application`,
      dyesPigmentsTitle: matched.title,
      slug: matched.slug
    };
  }
}

// Generate self-contained TypeScript file
const tsContent = `// Auto-generated mapping of authentic application mock photographs directly from dyespigments.net
// Contains unique product photographs showing real-world products where each dye/chemical is applied
// (Leather seats & hides, fanned paper, luxury ink bottles, silk & wool garments, confectionery, etc.)

export interface ProductMockEntry {
  img: string;
  title: string;
  dyesPigmentsTitle: string;
  slug?: string;
}

export const PRODUCT_MOCKS_MAP: Record<string, ProductMockEntry> = ${JSON.stringify(resultMap, null, 2)};

export function getProductMock(productId: string, categorySlug: string = ''): ProductMockEntry {
  if (productId && PRODUCT_MOCKS_MAP[productId]) {
    return PRODUCT_MOCKS_MAP[productId];
  }
  return {
    img: 'https://www.dyespigments.net/wp-content/uploads/2025/11/Basic-Yellow-28-Powder-768x768.jpg',
    title: 'Industrial Application Specimen',
    dyesPigmentsTitle: 'Basic Yellow 28 Powder'
  };
}
`;

fs.writeFileSync('src/data/productMocks.ts', tsContent);
console.log('Saved src/data/productMocks.ts successfully with diverse application photos!');
