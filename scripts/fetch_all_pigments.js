import fs from 'fs';
import path from 'path';

async function fetchAll() {
  console.log('Fetching all 751 pigments from dyespigments.net WordPress REST API...');
  const allItems = [];

  for (let page = 1; page <= 8; page++) {
    const url = `https://www.dyespigments.net/wp-json/wp/v2/pigments?per_page=100&page=${page}&_embed=true`;
    console.log(`Fetching page ${page}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Page ${page} failed: ${res.status}`);
        continue;
      }
      const data = await res.json();
      console.log(`Page ${page} returned ${data.length} items`);
      for (const it of data) {
        const media = it._embedded?.['wp:featuredmedia']?.[0];
        const rawTitle = it.title?.rendered || '';
        // decode html entities
        const title = rawTitle
          .replace(/&#8211;/g, '-')
          .replace(/&#8212;/g, '-')
          .replace(/&#038;/g, '&')
          .replace(/&amp;/g, '&')
          .replace(/&trade;/g, '™')
          .replace(/&#8482;/g, '™');

        const imgUrl = media?.sizes?.medium_large?.source_url || media?.source_url || '';
        if (imgUrl) {
          allItems.push({
            id: it.id,
            slug: it.slug,
            title: title.trim(),
            img: imgUrl,
            alt: media?.alt_text || ''
          });
        }
      }
    } catch (err) {
      console.error(`Error on page ${page}:`, err);
    }
  }

  console.log(`Total collected items with images: ${allItems.length}`);
  fs.writeFileSync('src/data/dyespigments_raw.json', JSON.stringify(allItems, null, 2));
  return allItems;
}

fetchAll().then(() => {
  console.log('Done!');
});
