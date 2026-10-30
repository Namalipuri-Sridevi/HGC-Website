import fs from 'fs';
import { PRODUCTS } from '../src/data/catalog.ts';

const dpItems = JSON.parse(fs.readFileSync('src/data/dyespigments_catalog.json', 'utf8'));

console.log('PRODUCTS count:', PRODUCTS.length);
console.log('dyespigments.net items count:', dpItems.length);

// Build tokenized index of all 751 dyespigments items
const dpIndex = dpItems.map(item => {
  const title = (item.title || '').toLowerCase();
  const slug = (item.slug || '').toLowerCase();
  const text = `${title} ${slug}`.replace(/[^a-z0-9]/g, ' ');
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    img: item.img_url,
    tokens: new Set(text.split(/\s+/).filter(Boolean)),
    rawText: text
  };
});

// Category-level fallback images from dyespigments.net
const CATEGORY_FALLBACK_IMAGES = {
  'direct-dyes': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Direct-Black-168-Liquid-768x768.jpg',
  'reactive-dyes': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Reactive-Red-198.jpg-768x768.jpeg',
  'acid-dyes': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Acid-Orange-7-1-768x768.jpg',
  'basic-dyes': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Basic-Yellow-28-Powder-768x768.jpg',
  'vat-dyes': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Reactive-Red-198.jpg-768x768.jpeg',
  'ucp-go-dyes': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Reactive-Red-198.jpg-768x768.jpeg',
  'disperse-dyes': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Reactive-Red-198.jpg-768x768.jpeg',
  'napthols-and-base': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Reactive-Red-198.jpg-768x768.jpeg',
  'rapid-and-oil-colours': 'https://www.dyespigments.net/wp-content/uploads/2026/05/Solvent-Blue-79-768x768.jpg',
  'fluorescent-pigment': 'https://www.dyespigments.net/wp-content/uploads/2025/12/Magenta-Fluorescent-768x768.jpg',
  'metal-oxide-inorganic-pigments': 'https://www.dyespigments.net/wp-content/uploads/2026/04/Pigment-Violet-APA-768x768.jpg',
  'organic-pigment': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Pigment-Green-7-Liquid-1-768x768.jpg',
  'fine-hc-pigment-emulsion': 'https://www.dyespigments.net/wp-content/uploads/2026/04/Pigment-Violet-APA-768x768.jpg',
  'solvent-dyes': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Solvent-Green-3-3-768x768.jpg',
  'metal-powders': 'https://www.dyespigments.net/wp-content/uploads/2026/04/Pigment-Violet-APA-768x768.jpg',
  'glitter-dg': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Basic-Yellow-28-Powder-768x768.jpg',
  'food-supra': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Green-S-768x768.jpg',
  'chemicals-in-general': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Direct-Black-168-Liquid-768x768.jpg',
  'cht-india': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Reactive-Red-198.jpg-768x768.jpeg',
  'starch-glucose': 'https://www.dyespigments.net/wp-content/uploads/2025/11/Basic-Yellow-28-Powder-768x768.jpg',
};

// Build product-to-image map
const productImagesMap = {};
let exactMatches = 0;
let categoryMatches = 0;

for (const p of PRODUCTS) {
  const typeWord = p.sourceType.split(' ')[0].toLowerCase();
  const ci = (p.ciNumber || '').toLowerCase().trim();
  const name = (p.name || '').toLowerCase().trim();

  const searchQueries = [];
  if (ci) {
    searchQueries.push(`${typeWord} ${ci}`);
    searchQueries.push(ci);
  }
  searchQueries.push(`${typeWord} ${name}`);
  searchQueries.push(name);

  let foundImg = null;
  let matchedItemTitle = null;

  for (const q of searchQueries) {
    const tokens = q.replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(Boolean);
    if (tokens.length >= 2) {
      // Find item containing all tokens
      const match = dpIndex.find(item => tokens.every(tok => item.tokens.has(tok)));
      if (match && match.img) {
        foundImg = match.img;
        matchedItemTitle = match.title;
        break;
      }
    }
  }

  // If no exact token match, try finding by color shade in the same category on dyespigments.net
  if (!foundImg) {
    // Find any product in dyespigments that matches category + color shade (e.g. 'reactive' + 'yellow', 'direct' + 'blue', etc.)
    const colorWords = ['yellow', 'orange', 'red', 'blue', 'green', 'black', 'violet', 'brown', 'pink', 'scarlet', 'cyan', 'magenta', 'grey'];
    const pColor = colorWords.find(c => name.includes(c) || ci.includes(c));
    
    if (pColor) {
      const match = dpIndex.find(item => item.tokens.has(typeWord) && item.tokens.has(pColor) && item.img);
      if (match) {
        foundImg = match.img;
        matchedItemTitle = match.title;
      }
    }
  }

  if (foundImg) {
    exactMatches++;
    productImagesMap[p.id] = {
      img: foundImg,
      matchedTitle: matchedItemTitle,
      type: 'dyespigments-item'
    };
  } else {
    categoryMatches++;
    productImagesMap[p.id] = {
      img: CATEGORY_FALLBACK_IMAGES[p.categorySlug] || CATEGORY_FALLBACK_IMAGES['direct-dyes'],
      matchedTitle: p.sourceType,
      type: 'dyespigments-category'
    };
  }
}

console.log(`Results: ${exactMatches} specific product matches, ${categoryMatches} category-matched images from dyespigments.net`);
console.log('Sample matched products:');
Object.keys(productImagesMap).slice(0, 15).forEach(id => {
  const p = PRODUCTS.find(x => x.id === id);
  console.log(`- ${p.name} (${p.sourceType}, CI: ${p.ciNumber}) -> ${productImagesMap[id].matchedTitle} [${productImagesMap[id].img}]`);
});

// Save map to src/data/product_images_map.json
fs.writeFileSync('src/data/product_images_map.json', JSON.stringify(productImagesMap, null, 2));
console.log('Saved product image map to src/data/product_images_map.json');
