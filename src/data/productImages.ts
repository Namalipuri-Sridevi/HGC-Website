// Mapping of authentic application mock photographs directly from dyespigments.net
// Matches each dye and chemical to the exact product application shown on dyespigments.net
// (e.g. car leather seats, writing inkwells, silk drapes, wool blankets, confectioneries, popsicles, etc.)

import { getProductMock, ProductMockEntry } from './productMocks.ts';

export interface ProductImageEntry {
  img: string;
  matchedTitle: string;
  type: 'dyespigments-item' | 'dyespigments-category';
}

export function getDyesPigmentsImage(productId: string = '', categorySlug: string = ''): ProductImageEntry {
  const mock: ProductMockEntry = getProductMock(productId, categorySlug);
  return {
    img: mock.img,
    matchedTitle: mock.title || mock.dyesPigmentsTitle || 'Industrial Application Mock',
    type: 'dyespigments-item',
  };
}
