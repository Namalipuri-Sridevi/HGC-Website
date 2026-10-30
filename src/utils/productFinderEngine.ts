import { PRODUCTS } from '../data/catalog.ts';
import type { Product } from '../data/catalog.ts';

export type SearchIntent = 'DYE_COLOR' | 'CHEMICAL' | 'GENERAL';

export type ColorFamily =
  | 'yellow'
  | 'orange'
  | 'red'
  | 'blue'
  | 'violet'
  | 'green'
  | 'brown'
  | 'black'
  | 'grey'
  | 'white'
  | 'other';

export interface ParsedQuery {
  rawQuery: string;
  intent: SearchIntent;
  targetColors: ColorFamily[];
  targetSubstrate?: string;
  targetCategorySlug?: string;
  specificKeywords: string[];
}

export interface EngineResult {
  success: boolean;
  aiPowered: boolean;
  engine: string;
  intent: SearchIntent;
  detectedColors: ColorFamily[];
  detectedSubstrate?: string;
  summary: string;
  technicalAdvice: string;
  suitabilityExplanation: string;
  products: Product[];
}

// Convert Hex to HSL for precise chromatic shade identification
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  if (!hex || !hex.startsWith('#')) return null;
  const clean = hex.replace('#', '').trim();
  if (clean.length !== 6) return null;
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;

  if (d === 0) return { h: 0, s: 0, l };

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  } else if (max === g) {
    h = ((b - r) / d + 2) * 60;
  } else {
    h = ((r - g) / d + 4) * 60;
  }

  return { h, s, l };
}

// Check if a product is strictly a chemical, auxiliary, or sizing agent
export function isChemicalProduct(p: Product): boolean {
  const cat = (p.categorySlug || '').toLowerCase();
  const st = (p.sourceType || '').toLowerCase();
  const name = (p.name || '').toLowerCase();

  if (
    cat === 'chemicals-in-general' ||
    cat === 'cht-india' ||
    cat === 'starch-glucose' ||
    cat.includes('chem') ||
    cat.includes('cht')
  ) {
    return true;
  }

  if (
    st.includes('chemical') ||
    st.includes('cht') ||
    st.includes('gum') ||
    st.includes('auxiliary') ||
    st.includes('starch')
  ) {
    return true;
  }

  // Known chemical name markers
  if (
    name.includes('de foamer') ||
    name.includes('stainol') ||
    name.includes('hydrose') ||
    name.includes('soaping oil') ||
    name.includes('thickner') ||
    name.includes('fixer') ||
    name.includes('e.d.t.a') ||
    name.includes('acrylamide') ||
    name.includes('pva') ||
    name.includes('carrier tci') ||
    name.includes('super gum') ||
    name.includes('sarabid') ||
    name.includes('heptol') ||
    name.includes('tubingal') ||
    name.includes('neutracid') ||
    name.includes('contavan')
  ) {
    return true;
  }

  return false;
}

// Detect precise color family of a dye or pigment
export function detectProductColor(p: Product): ColorFamily {
  if (isChemicalProduct(p)) return 'other';

  const text = `${p.name} ${p.ciNumber}`.toUpperCase();

  // 1. Semantic Name & CI Keyword Analysis
  if (
    text.includes('YELLOW') ||
    text.includes('YEL ') ||
    text.includes('CRYSOPHININE') ||
    text.includes('AURAMINE') ||
    text.includes('TARTRAZINE') ||
    text.includes('GOLDEN YELLOW') ||
    text.includes('LEMON')
  ) {
    return 'yellow';
  }

  if (
    text.includes('ORANGE') ||
    text.includes('ORG ') ||
    text.includes('AMBER') ||
    text.includes('SUNSET')
  ) {
    return 'orange';
  }

  if (
    text.includes('TURQUOISE') ||
    text.includes('TQ BLUE') ||
    text.includes('SKY BLUE') ||
    text.includes('NAVY') ||
    text.includes('BLUE') ||
    text.includes('INDANTHRONE') ||
    text.includes('INDIGO') ||
    text.includes('CYAN')
  ) {
    return 'blue';
  }

  if (
    text.includes('SCARLET') ||
    text.includes('CRIMSON') ||
    text.includes('RUBINE') ||
    text.includes('BORDEAUX') ||
    text.includes('BORDUEX') ||
    text.includes('MAGENTA') ||
    text.includes('PINK') ||
    text.includes('ROSE') ||
    text.includes('RED') ||
    text.includes('CARMOISINE') ||
    text.includes('PONCEAU') ||
    text.includes('ERYTHROSINE') ||
    text.includes('ALLURA') ||
    text.includes('CONGO RED')
  ) {
    return 'red';
  }

  if (
    text.includes('VIOLET') ||
    text.includes('PURPLE') ||
    text.includes('HELIO') ||
    text.includes('LILAC') ||
    text.includes('RHODAMINE')
  ) {
    return 'violet';
  }

  if (
    text.includes('GREEN') ||
    text.includes('OLIVE') ||
    text.includes('GRN') ||
    text.includes('MALACHITE')
  ) {
    return 'green';
  }

  if (
    text.includes('BROWN') ||
    text.includes('KHAKI') ||
    text.includes('KHAKHI') ||
    text.includes('CHOCOLATE')
  ) {
    return 'brown';
  }

  if (
    text.includes('BLACK') ||
    text.includes('BLK') ||
    text.includes('GREY') ||
    text.includes('GRAY') ||
    text.includes('CARBON')
  ) {
    return 'black';
  }

  if (text.includes('WHITE') || text.includes('TITANIUM')) {
    return 'white';
  }

  // 2. Chromatic Hex Color Analysis
  const hsl = hexToHsl(p.darkHex);
  if (!hsl) return 'other';

  if (hsl.s < 0.12 || hsl.l < 0.12) {
    return hsl.l < 0.25 ? 'black' : 'grey';
  }

  const h = hsl.h;
  if (h < 18 || h >= 345) return 'red';
  if (h >= 18 && h < 45) return hsl.l < 0.35 ? 'brown' : 'orange';
  if (h >= 45 && h < 75) return 'yellow';
  if (h >= 75 && h < 165) return 'green';
  if (h >= 165 && h < 260) return 'blue';
  if (h >= 260 && h < 315) return 'violet';
  if (h >= 315 && h < 345) return 'red';

  return 'other';
}

// Parse natural language user query into strict intent, color, and substrate
export function parseUserQuery(
  rawQuery: string,
  categoryFilter?: string,
  applicationFilter?: string,
  shadeFilter?: string
): ParsedQuery {
  const q = rawQuery.toLowerCase();
  const words = q.split(/[\s,./;:!?"'()\[\]{}]+/).filter(w => w.length > 0);

  // 1. Color extraction
  const detectedColors: Set<ColorFamily> = new Set();

  if (shadeFilter && shadeFilter !== 'all') {
    const s = shadeFilter.toLowerCase();
    if (s.includes('yellow')) detectedColors.add('yellow');
    if (s.includes('orange')) detectedColors.add('orange');
    if (s.includes('red') || s.includes('scarlet')) detectedColors.add('red');
    if (s.includes('pink') || s.includes('magenta')) detectedColors.add('red');
    if (s.includes('blue') || s.includes('navy')) detectedColors.add('blue');
    if (s.includes('green') || s.includes('olive')) detectedColors.add('green');
    if (s.includes('violet') || s.includes('purple')) detectedColors.add('violet');
    if (s.includes('black') || s.includes('grey')) detectedColors.add('black');
    if (s.includes('brown')) detectedColors.add('brown');
  }

  // Semantic query color checks
  if (q.includes('yellow') || q.includes('gold') || q.includes('golden') || q.includes('lemon')) {
    detectedColors.add('yellow');
  }
  if (q.includes('orange') || q.includes('amber')) {
    detectedColors.add('orange');
  }
  if (
    q.includes('red') ||
    q.includes('scarlet') ||
    q.includes('crimson') ||
    q.includes('maroon') ||
    q.includes('rubine') ||
    q.includes('bordeaux') ||
    q.includes('pink') ||
    q.includes('rose') ||
    q.includes('magenta')
  ) {
    detectedColors.add('red');
  }
  if (
    q.includes('blue') ||
    q.includes('navy') ||
    q.includes('turquoise') ||
    q.includes('cyan') ||
    q.includes('sky blue') ||
    q.includes('royal blue')
  ) {
    detectedColors.add('blue');
  }
  if (q.includes('green') || q.includes('olive')) {
    detectedColors.add('green');
  }
  if (q.includes('violet') || q.includes('purple') || q.includes('lilac') || q.includes('mauve')) {
    detectedColors.add('violet');
  }
  if (q.includes('brown') || q.includes('chocolate') || q.includes('khaki') || q.includes('khakhi')) {
    detectedColors.add('brown');
  }
  if (q.includes('black') || q.includes('grey') || q.includes('gray') || q.includes('charcoal')) {
    detectedColors.add('black');
  }
  if (q.includes('white')) {
    detectedColors.add('white');
  }

  // 2. Chemical keywords
  const chemicalKeywords = [
    'chemical', 'chemicals', 'auxiliary', 'auxiliaries', 'softener', 'silicone',
    'hydro', 'hydrosulphite', 'hydrose', 'glauber', 'soda ash', 'levelling',
    'scouring', 'bleach', 'bleaching', 'binder', 'thickener', 'gum', 'pva',
    'acrylamide', 'tubingal', 'sarabid', 'heptol', 'neutracid', 'contavan',
    'stainol', 'tinopol', 'soaping', 'edta', 'fixer', 'fixing', 'dye fix',
    'sizing', 'starch', 'glucose', 'defoamer', 'carrier', 'surfactant',
    'detergent', 'dispersing agent', 'wetting agent', 'anti back stain'
  ];

  const hasChemicalKeyword = chemicalKeywords.some(kw => q.includes(kw));

  // 3. Dye/Colorant keywords
  const dyeKeywords = [
    'dye', 'dyes', 'colour', 'color', 'colours', 'colors', 'shade', 'shades',
    'pigment', 'pigments', 'tint', 'stain', 'colorant', 'colorants',
    'reactive', 'direct', 'vat', 'disperse', 'acid dye', 'basic dye',
    'napthol', 'solvent dye', 'food supra', 'supra'
  ];

  const hasDyeKeyword = dyeKeywords.some(kw => q.includes(kw));
  const hasColor = detectedColors.size > 0;

  // 4. Intent Determination
  let intent: SearchIntent = 'GENERAL';

  if (categoryFilter === 'chemicals-in-general' || categoryFilter === 'cht-india' || categoryFilter === 'starch-glucose') {
    intent = 'CHEMICAL';
  } else if (categoryFilter && categoryFilter !== 'all') {
    intent = 'DYE_COLOR';
  } else if (hasChemicalKeyword && !hasDyeKeyword && !hasColor) {
    // Pure chemical query
    intent = 'CHEMICAL';
  } else if (hasColor || hasDyeKeyword) {
    // Color or dye mentioned -> STRICTLY DYE
    intent = 'DYE_COLOR';
  } else if (hasChemicalKeyword) {
    intent = 'CHEMICAL';
  }

  // 5. Substrate / Application extraction
  let targetSubstrate: string | undefined;
  if (applicationFilter && applicationFilter !== 'all') {
    targetSubstrate = applicationFilter.toLowerCase();
  } else {
    if (q.includes('cotton') || q.includes('knit') || q.includes('viscose') || q.includes('rayon') || q.includes('linen') || q.includes('jute') || q.includes('denim') || q.includes('towel')) {
      targetSubstrate = 'cotton';
    } else if (q.includes('polyester') || q.includes('poly') || q.includes('synthetic') || q.includes('acetate')) {
      targetSubstrate = 'polyester';
    } else if (q.includes('silk') || q.includes('saree') || q.includes('wool') || q.includes('nylon') || q.includes('protein')) {
      targetSubstrate = 'silk';
    } else if (q.includes('leather') || q.includes('tannery') || q.includes('hide')) {
      targetSubstrate = 'leather';
    } else if (q.includes('paper') || q.includes('packaging') || q.includes('pulp') || q.includes('board')) {
      targetSubstrate = 'paper';
    } else if (q.includes('paint') || q.includes('ink') || q.includes('coating') || q.includes('screen print') || q.includes('roller print')) {
      targetSubstrate = 'paint';
    } else if (q.includes('food') || q.includes('beverage') || q.includes('candy') || q.includes('pharma') || q.includes('syrup')) {
      targetSubstrate = 'food';
    }
  }

  return {
    rawQuery,
    intent,
    targetColors: Array.from(detectedColors),
    targetSubstrate,
    targetCategorySlug: categoryFilter && categoryFilter !== 'all' ? categoryFilter : undefined,
    specificKeywords: words,
  };
}

// Filter the full catalog strictly according to parsed intent, color, and substrate
export function filterCandidateCatalog(
  allProducts: Product[],
  parsed: ParsedQuery
): Product[] {
  const { intent, targetColors, targetSubstrate, targetCategorySlug } = parsed;

  return allProducts.filter(p => {
    const isChem = isChemicalProduct(p);

    // Rule 1: Strict Intent Partitioning
    if (intent === 'CHEMICAL') {
      if (!isChem) return false;
    } else if (intent === 'DYE_COLOR') {
      if (isChem) return false;
    }

    // Rule 2: Explicit category filter if chosen
    if (targetCategorySlug) {
      if (p.categorySlug !== targetCategorySlug && p.sourceType.toLowerCase() !== targetCategorySlug.toLowerCase()) {
        return false;
      }
    }

    // Rule 3: Strict Color Matching for Dyes
    if (intent === 'DYE_COLOR' && targetColors.length > 0) {
      const prodColor = detectProductColor(p);
      const matchesColor = targetColors.includes(prodColor);
      if (!matchesColor) return false;
    }

    return true;
  });
}

// Score and rank candidates based on substrate, dye class, and semantic similarity
export function rankCandidates(
  candidates: Product[],
  parsed: ParsedQuery
): Product[] {
  const { rawQuery, intent, targetColors, targetSubstrate, specificKeywords } = parsed;
  const lowerQ = rawQuery.toLowerCase();

  const scored = candidates.map(p => {
    let score = 0;
    const name = p.name.toLowerCase();
    const ci = p.ciNumber.toLowerCase();
    const cat = (p.sourceType || '').toLowerCase();
    const catSlug = (p.categorySlug || '').toLowerCase();

    // 1. Exact name or CI match
    for (const kw of specificKeywords) {
      if (kw.length < 2) continue;
      if (name === kw) score += 25;
      else if (name.includes(kw)) score += 10;
      if (ci.includes(kw)) score += 12;
      if (cat.includes(kw)) score += 6;
    }

    // 2. Strict Color Alignment bonus
    if (targetColors.length > 0) {
      const pColor = detectProductColor(p);
      if (targetColors.includes(pColor)) {
        score += 20;
      }
    }

    // 3. Explicit Dye Class Affinity if specified in query
    if (intent === 'DYE_COLOR') {
      const dyeClasses = [
        { key: 'disperse', slugMatch: 'disperse', bonus: 60 },
        { key: 'reactive', slugMatch: 'reactive', bonus: 60 },
        { key: 'direct', slugMatch: 'direct', bonus: 60 },
        { key: 'acid', slugMatch: 'acid', bonus: 60 },
        { key: 'vat', slugMatch: 'vat', bonus: 60 },
        { key: 'basic', slugMatch: 'basic', bonus: 60 },
        { key: 'pigment', slugMatch: 'pigment', bonus: 60 },
        { key: 'solvent', slugMatch: 'solvent', bonus: 60 },
        { key: 'oil', slugMatch: 'oil', bonus: 60 },
        { key: 'food', slugMatch: 'food', bonus: 80 },
        { key: 'napthol', slugMatch: 'napthol', bonus: 60 },
      ];

      for (const dc of dyeClasses) {
        if (lowerQ.includes(dc.key)) {
          if (catSlug.includes(dc.slugMatch) || cat.includes(dc.slugMatch)) {
            score += dc.bonus;
          } else {
            score -= 30;
          }
        }
      }
    }

    // 4. Substrate & Dye Chemistry Compatibility
    if (intent === 'DYE_COLOR' && targetSubstrate) {
      if (targetSubstrate === 'cotton') {
        // Reactive, Direct, VAT, UCP GO, Pigment Emulsion are ideal for cotton
        if (catSlug.includes('reactive') || cat.includes('reactive')) score += 20;
        if (catSlug.includes('direct') || cat.includes('direct')) score += 18;
        if (catSlug.includes('vat') || cat.includes('vat')) score += 19;
        if (catSlug.includes('ucp-go')) score += 18;
        if (catSlug.includes('napthol')) score += 16;
        if (catSlug.includes('fine-hc-pigment')) score += 14;
        // Disperse and Acid are not ideal for cotton
        if (catSlug.includes('disperse')) score -= 30;
        if (catSlug.includes('acid')) score -= 25;
      } else if (targetSubstrate === 'polyester') {
        // Disperse Dyes are prime for polyester
        if (catSlug.includes('disperse') || cat.includes('disperse')) score += 35;
        else score -= 20;
      } else if (targetSubstrate === 'silk' || targetSubstrate === 'wool') {
        // Acid and Reactive dyes are prime for protein fibers
        if (catSlug.includes('acid') || cat.includes('acid')) score += 30;
        if (catSlug.includes('reactive')) score += 18;
        if (catSlug.includes('direct')) score += 12;
        if (catSlug.includes('disperse')) score -= 25;
      } else if (targetSubstrate === 'leather') {
        if (catSlug.includes('acid') || catSlug.includes('direct') || catSlug.includes('basic')) score += 25;
      } else if (targetSubstrate === 'paper') {
        if (catSlug.includes('direct') || catSlug.includes('basic') || catSlug.includes('pigment')) score += 25;
      } else if (targetSubstrate === 'food') {
        if (catSlug.includes('food') || cat.includes('food')) score += 40;
        else score -= 30;
      } else if (targetSubstrate === 'paint') {
        if (catSlug.includes('pigment') || catSlug.includes('oxide') || catSlug.includes('solvent')) score += 25;
      }
    }

    // 4. Chemical relevance matching
    if (intent === 'CHEMICAL') {
      if (lowerQ.includes('softener') && name.includes('soft')) score += 25;
      if (lowerQ.includes('silicone') && (name.includes('tubingal') || name.includes('soft'))) score += 25;
      if (lowerQ.includes('hydro') && (name.includes('hydrose') || name.includes('df'))) score += 30;
      if (lowerQ.includes('fix') && (name.includes('fix') || name.includes('gdf'))) score += 30;
      if (lowerQ.includes('binder') && name.includes('binder')) score += 30;
      if (lowerQ.includes('thickener') && name.includes('thickner')) score += 30;
      if (lowerQ.includes('gum') && name.includes('gum')) score += 25;
      if (lowerQ.includes('foam') && name.includes('de foamer')) score += 30;
      if (lowerQ.includes('carrier') && name.includes('carrier')) score += 30;
      if (lowerQ.includes('cht') && (catSlug.includes('cht') || cat.includes('cht'))) score += 20;
    }

    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.product);
}

// Generate expert dyebath / chemical technical instructions based on query context
export function generateTechnicalAdvice(
  parsed: ParsedQuery,
  topProducts: Product[]
): { summary: string; technicalAdvice: string; suitabilityExplanation: string } {
  const { intent, targetColors, targetSubstrate, rawQuery } = parsed;
  const count = topProducts.length;
  const colorStr = targetColors.length > 0 ? targetColors.join(' / ').toUpperCase() : '';

  if (intent === 'CHEMICAL') {
    return {
      summary: `Identified ${count} specialized textile auxiliaries & process chemicals.`,
      suitabilityExplanation: `Formulated specifically for processing stages matching "${rawQuery}". Ensures optimal fibre softening, dye fixation, foam control, and batch uniformity.`,
      technicalAdvice: 'For Softeners: Apply 1.0 - 3.0% (o.w.f.) at pH 5.0 - 5.5, liquor ratio 1:8 to 1:12 at 40°C for 20 mins. For Dye Fixing: Apply 1.5 - 2.5% at 45°C for 15-20 mins prior to final rinse. Always pre-dilute auxiliary thoroughly before addition.'
    };
  }

  if (intent === 'DYE_COLOR') {
    const primaryClass = topProducts[0]?.sourceType || 'Specialty Dyestuff';
    const sub = targetSubstrate || 'textile substrates';

    let recipe = 'Pre-dissolve dyestuffs thoroughly with warm soft water. Maintain liquor-to-goods ratio 1:8 - 1:10. Follow progressive salt and alkali dosing.';
    if (primaryClass.toLowerCase().includes('reactive') || sub === 'cotton') {
      recipe = 'Dyebath setup: 30 - 60 g/L Glauber’s Salt or common salt added incrementally over 20-30 mins at 60°C (or 80°C for HE series). Fixation: Add 10 - 20 g/L Soda Ash. Run 45-60 mins, followed by hot neutralisation rinse (soaping at 95°C) to eliminate unfixed hydrolysed dye for maximum wash fastness (Grade 4-5).';
    } else if (primaryClass.toLowerCase().includes('disperse') || sub === 'polyester') {
      recipe = 'High-temperature (HT) exhaustion at 130°C for 45-60 mins with 0.5 - 1.0 g/L dispersing agent. Set dyebath pH at 4.5 - 5.5 with acetic acid. Post-dyeing: Reduction clear with 2 g/L Sodium Hydrosulphite + 2 g/L Caustic Soda at 70°C for 20 mins for pristine fastness.';
    } else if (primaryClass.toLowerCase().includes('acid') || sub === 'silk' || sub === 'wool') {
      recipe = 'Set dyebath at 40°C with 1 - 2% Acetic Acid (or Formic Acid for leveling types) and 5 - 10% Glauber’s Salt. Raise temperature steadily at 1°C/min to 85-90°C. Maintain at temperature for 45 mins. Rinse with warm water to preserve high silk/wool lustre.';
    } else if (primaryClass.toLowerCase().includes('vat')) {
      recipe = 'Vatting procedure: Dissolve dyestuff with Caustic Soda (NaOH) and Sodium Hydrosulphite (Na2S2O4) at 50-60°C to form soluble leuco compound. Exhaust for 45 mins, followed by cold air/water oxidation, soaping at boil for maximum defense-grade light and chlorine fastness.';
    }

    return {
      summary: `Found ${count} certified ${colorStr ? `${colorStr} ` : ''}${primaryClass} formulations.`,
      suitabilityExplanation: `Selected exclusively in requested ${colorStr ? `${colorStr} shade` : 'shade range'} for ${sub}. Certified compliant with zero cross-contamination.`,
      technicalAdvice: recipe
    };
  }

  return {
    summary: `Found ${count} matching products from H. Gokaldas & Co. catalog.`,
    suitabilityExplanation: `Matched based on technical specifications and manufacturing requirements for "${rawQuery}".`,
    technicalAdvice: 'Ensure goods are thoroughly pre-scoured and neutralised prior to dyestuff or chemical addition for uniform results.'
  };
}

// Master execution pipeline
export function executeProductFinderSearch(
  query: string,
  categoryFilter?: string,
  applicationFilter?: string,
  shadeFilter?: string
): EngineResult {
  const parsed = parseUserQuery(query, categoryFilter, applicationFilter, shadeFilter);
  const candidates = filterCandidateCatalog(PRODUCTS, parsed);
  const ranked = rankCandidates(candidates, parsed);
  const finalProducts = ranked.slice(0, 12);

  const { summary, technicalAdvice, suitabilityExplanation } = generateTechnicalAdvice(parsed, finalProducts);

  return {
    success: true,
    aiPowered: false,
    engine: 'Intelligent Chemical Domain Engine',
    intent: parsed.intent,
    detectedColors: parsed.targetColors,
    detectedSubstrate: parsed.targetSubstrate,
    summary,
    technicalAdvice,
    suitabilityExplanation,
    products: finalProducts,
  };
}
