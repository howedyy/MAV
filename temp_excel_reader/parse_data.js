const fs = require('fs');

const data = JSON.parse(fs.readFileSync('dump.json', 'utf8'));

const products = {
    'gate-valve': { dimensions: [], materials: [] },
    'globe-valve': { dimensions: [], materials: [] },
    'check-valve': { dimensions: [], materials: [] },
    'ball-valve': { dimensions: [], materials: [] },
    'butterfly-valve': { dimensions: [], materials: [] },
    'strainer-valve': { dimensions: [], materials: [], heavy_dimensions: [], heavy_materials: [], light_dimensions: [], light_materials: [] },
};

let currentProduct = 'gate-valve'; // Assuming it starts with gate valve
let currentStrainerType = null;
let parsingMode = 'materials'; // Starts with materials
let currentDimensionsHeader = [];

for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (!row || row.length === 0) continue;

    const firstCell = row.find(cell => cell !== null && cell !== undefined && cell !== '');
    if (typeof firstCell === 'string') {
        const text = firstCell.toLowerCase().trim();

        // Detect product headers
        if (text.includes('gate valve') && !text.includes('specifications')) { currentProduct = 'gate-valve'; currentStrainerType = null; parsingMode = null; continue; }
        if (text.includes('globe valve') && !text.includes('specifications')) { currentProduct = 'globe-valve'; currentStrainerType = null; parsingMode = null; continue; }
        if (text.includes('check valve') && !text.includes('specifications')) { currentProduct = 'check-valve'; currentStrainerType = null; parsingMode = null; continue; }
        if (text.includes('ball valve') && !text.includes('specifications')) { currentProduct = 'ball-valve'; currentStrainerType = null; parsingMode = null; continue; }
        if (text.includes('butterfly valve') && !text.includes('specifications')) { currentProduct = 'butterfly-valve'; currentStrainerType = null; parsingMode = null; continue; }
        if (text.includes('heavy strainer valve')) { currentProduct = 'strainer-valve'; currentStrainerType = 'heavy'; parsingMode = null; continue; }
        if (text.includes('light strainer valve')) { currentProduct = 'strainer-valve'; currentStrainerType = 'light'; parsingMode = null; continue; }

        // Detect Dimensions header
        if (text === 'dn' && row.length > 2) {
            parsingMode = 'dimensions';
            currentDimensionsHeader = row.filter(x => x !== null && x !== undefined && x !== '');
            const targetProp = currentStrainerType ? `${currentStrainerType}_dimensions` : 'dimensions';
            if (currentProduct) {
                const dims = products[currentProduct][targetProp];
                const cols = row.filter(c => c !== null && c !== undefined && String(c).trim() !== '');
                for (let j = 1; j < cols.length; j++) {
                    dims.push({ 'DN': String(cols[j]).trim() });
                }
            }
            continue;
        }

        // Parse Dimensions rows
        if (parsingMode === 'dimensions' && currentProduct) {
            const targetProp = currentStrainerType ? `${currentStrainerType}_dimensions` : 'dimensions';
            const dims = products[currentProduct][targetProp];
            if (text === 'n˚' || text.includes('parts name') || text === 'n' || text === 'no.') {
                parsingMode = 'materials';
                continue;
            }

            const cells = row.filter(c => c !== null && c !== undefined && String(c).trim() !== '');
            if (cells.length > 1 && !cells[0].toString().includes('Technical') && !cells[0].toString().includes('')) {
                const propName = String(cells[0]).trim();
                for (let j = 1; j < cells.length; j++) {
                    if (dims[j - 1]) {
                        dims[j - 1][propName] = String(cells[j]).trim();
                    }
                }
            }
        }

        // Detect Materials header
        if (text === 'n˚' || text.includes('parts name') || text === 'n' || text === 'no.' || text === 'description') {
            parsingMode = 'materials';
            continue;
        }

        // Parse Materials rows
        if (parsingMode === 'materials' && currentProduct) {
            const targetProp = currentStrainerType ? `${currentStrainerType}_materials` : 'materials';
            const mats = products[currentProduct][targetProp];

            if (text.includes('technical specifications') || text.includes('more products')) {
                parsingMode = null;
                continue;
            }

            const cells = row.filter(c => c !== null && c !== undefined && String(c).trim() !== '');
            if (cells.length >= 3) {
                let num = cells[0];
                let name = cells[1];
                let mat = cells[2];

                if (String(num).match(/^[0-9A-Za-z]+$/) && !String(num).toLowerCase().includes('column')) {
                    mats.push({
                        no: String(num).trim(),
                        name: String(name).trim(),
                        material: String(mat).trim()
                    });
                }
            }
        }
    }
}

if (!fs.existsSync('d:/MAV/src/data')) {
    fs.mkdirSync('d:/MAV/src/data', { recursive: true });
}
fs.writeFileSync('d:/MAV/src/data/productSpecs.json', JSON.stringify(products, null, 2));
console.log('Successfully generated productSpecs.json');
