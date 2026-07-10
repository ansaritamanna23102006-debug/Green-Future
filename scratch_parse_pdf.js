const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.join(__dirname, 'Green Future Tech Full Plan.pdf');
const outputPath = path.join(__dirname, 'pdf_extracted_text.txt');

const parser = new pdf.PDFParse({ url: pdfPath });
parser.load().then(async () => {
  const result = await parser.getText();
  fs.writeFileSync(outputPath, result.text);
  console.log('PDF text written to:', outputPath);
}).catch(err => {
  console.error('Error parsing:', err);
});
