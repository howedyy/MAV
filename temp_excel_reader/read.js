const xlsx = require('xlsx');
const workbook = xlsx.readFile('d:/MAV/mohamed howedy.xlsx');
const sheetName = 'Sheet1';
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

const fs = require('fs');
fs.writeFileSync('dump.json', JSON.stringify(data, null, 2));
console.log('Dumped to dump.json');
