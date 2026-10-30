export interface SubstrateInfo {
  imageAsset: string;
  name: string;
  material: string;
  description: string;
  badge: string;
}

export function getSubstrateForCategory(
  categorySlug: string = '',
  sourceType: string = '',
  productName: string = ''
): SubstrateInfo {
  const slug = (categorySlug || '').toLowerCase();
  const type = (sourceType || '').toLowerCase();
  const pName = (productName || '').toLowerCase();

  // 1. Food Supra / Food Colours -> Translucent Jelly Dessert (Green-S.jpg archetype from dyespigments.net)
  if (slug.includes('food') || type.includes('food')) {
    return {
      imageAsset: 'food-jelly.jpg',
      name: 'Translucent Food Gelatin Cake',
      material: 'Certified Food Grade Jelly & Confectionery',
      description: 'Transparent gourmet dessert gelatin showing brilliant edible color clarity and culinary food-grade tint.',
      badge: 'Food Confectionery',
    };
  }

  // 2. Fluorescent Pigments & Stationery Inks -> Highlighter Pen on Paper (Magenta-Fluorescent.jpg archetype from dyespigments.net)
  if (slug.includes('fluorescent') || type.includes('fluorescent') || pName.includes('fluorescent')) {
    return {
      imageAsset: 'fluorescent-pen.jpg',
      name: 'Fluorescent Highlighter Marker Stroke',
      material: 'Stationery Highlighter on Book Paper',
      description: 'Vivid neon highlighter pen drawing a bold fluorescent highlight stroke across printed text.',
      badge: 'Fluorescent Marker',
    };
  }

  // 3. Liquid Dyes / Liquid Solvents / Oil Solubles -> Liquid Splash Droplet Crown (Solvent-Blue-79.jpg archetype from dyespigments.net)
  if (pName.includes('liquid') || type.includes('liquid') || slug.includes('oil')) {
    return {
      imageAsset: 'liquid-splash.jpg',
      name: 'Liquid Solution Crown Splash',
      material: 'Liquid Dye Solution & Solvent Carrier',
      description: 'Macro liquid crown droplet splash and concentric ripples demonstrating non-aqueous solubility.',
      badge: 'Liquid Solution',
    };
  }

  // 4. Solvent Dyes for Plastics -> Transparent Molded Plastic Sheets (Solvent-Green-3-3.jpg archetype from dyespigments.net)
  if (slug.includes('solvent') || type.includes('solvent')) {
    return {
      imageAsset: 'plastic-sheets.jpg',
      name: 'Transparent Acrylic / Polycarbonate Sheets',
      material: 'Molded Optical Thermoplastic Plaques',
      description: 'Stacked transparent polymer plastic plaques showing clean optical refraction and uniform tint throughout the resin.',
      badge: 'Plastic Plaques',
    };
  }

  // 5. Leather Dyes / Acid Dyes for Tannery -> Handcrafted Genuine Leather Wallet (Direct-Black-168.jpg archetype from dyespigments.net)
  if (
    pName.includes('leather') ||
    type.includes('leather') ||
    pName.includes('tannery') ||
    pName.includes('nigrosine') ||
    (slug.includes('acid') && (pName.includes('black') || pName.includes('brown') || pName.includes('tan')))
  ) {
    return {
      imageAsset: 'leather-wallet.jpg',
      name: 'Handcrafted Genuine Leather Goods',
      material: 'Top-Grain Chrome Tanned Leather',
      description: 'Stitched dyed genuine leather wallet exhibiting deep, rich grain penetration and luxury leather feel.',
      badge: 'Dyed Leather Goods',
    };
  }

  // 6. Basic Dyes (Powder & Paper Dyes) -> Fanned Art Cardstock Leaves (Basic-Yellow-28-Powder.jpg archetype from dyespigments.net)
  if (slug.includes('basic') || type.includes('basic') || slug.includes('starch') || type.includes('starch')) {
    return {
      imageAsset: 'fanned-paper.jpg',
      name: 'Fanned Art Cardstock Sheets',
      material: 'Bleached Cellulose Paper & Cardstock',
      description: 'Fanned-out sheets of dyed fine cardstock leaves exhibiting intense cationic color depth on cellulosic pulp.',
      badge: 'Paper Cardstock',
    };
  }

  // 7. Pigments (Organic, Inorganic, Fine H/C Emulsions, Metal Oxides) -> Open Paint & Ink Tins (Pigment-Violet-APA.jpg archetype from dyespigments.net)
  if (
    slug.includes('pigment') ||
    slug.includes('oxide') ||
    slug.includes('metal-powder') ||
    slug.includes('glitter') ||
    type.includes('pigment') ||
    type.includes('oxide') ||
    type.includes('emulsion')
  ) {
    return {
      imageAsset: 'paint-tins.jpg',
      name: 'Industrial Paint & Printing Ink Tins',
      material: 'High-Viscosity Dispersed Color Paste',
      description: 'Open metal paint and printing ink cans filled with glossy, highly pigmented coating dispersion.',
      badge: 'Paint & Ink Tins',
    };
  }

  // 8. Textile Dyes (Reactive Dyes, Direct Dyes, VAT Dyes, UCP GO Dyes, Napthols, Disperse Dyes, CHT India, Chemicals)
  // -> Knitted & Woven Cotton Textile Fabric Ripples (Reactive-Red-198A.jpg archetype from dyespigments.net)
  return {
    imageAsset: 'textile-fabric.jpg',
    name: 'Woven & Knitted Cotton Textile Folds',
    material: '100% Combed Cotton Knit / Towel Fabric',
    description: 'Soft ripples of pure cotton textile fabric demonstrating vibrant fiber absorption, levelness and wash fastness.',
    badge: 'Cotton Textile',
  };
}
