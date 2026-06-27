const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function extractImages() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('mohamed howedy.xlsx');

  const sheet = workbook.worksheets[0];
  const images = sheet.getImages();

  const publicDir = path.join(__dirname, 'public', 'products');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const productRows = {
    'gate-valve': { start: 1, end: 26 },
    'globe-valve': { start: 27, end: 42 },
    'check-valve': { start: 43, end: 74 },
    'ball-valve': { start: 75, end: 95 },
    'butterfly-valve': { start: 96, end: 122 },
    'strainer-valve': { start: 123, end: 200 }
  };

  const productImages = {
    'gate-valve': [],
    'globe-valve': [],
    'check-valve': [],
    'ball-valve': [],
    'butterfly-valve': [],
    'strainer-valve': []
  };

  console.log(`Found ${images.length} images.`);

  for (const image of images) {
    const imgId = image.imageId;
    const media = workbook.model.media.find(m => m.index === imgId);

    if (media) {
      const ext = media.extension;
      const buffer = media.buffer;
      const row = image.range.tl.nativeRow; // 0-indexed usually, but let's check

      const fileName = `image_${imgId}_row_${row}.${ext}`;
      const filePath = path.join(publicDir, fileName);
      fs.writeFileSync(filePath, buffer);

      // Determine product based on row
      // exceljs nativeRow is 0-indexed, so row+1 is the 1-indexed row matching my limits
      const actualRow = row + 1;
      let assignedProduct = null;
      for (const [prod, range] of Object.entries(productRows)) {
        if (actualRow >= range.start && actualRow <= range.end) {
          assignedProduct = prod;
          break;
        }
      }

      if (assignedProduct) {
        productImages[assignedProduct].push(`/products/${fileName}`);
      } else {
        console.log(`Image at row ${actualRow} not assigned to any product.`);
      }
    }
  }

  fs.writeFileSync('src/data/productImages.json', JSON.stringify(productImages, null, 2));
  console.log('Extraction complete! Check public/products and src/data/productImages.json');
}

extractImages().catch(console.error);
