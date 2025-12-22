const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Output directory
const outputDir = path.join(__dirname, 'qrcodes');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const employees = [
    { slug: 'fama-diaw', name: 'Fama Diaw' },
    { slug: 'souleymane-sall', name: 'Souleymane Sall' }
];

// CHANGE THIS TO YOUR PRODUCTION DOMAIN WHEN DEPLOYING
// const baseUrl = 'https://vcard.power-techservices.com';
const baseUrl = 'http://192.168.1.21:5173';

async function generate() {
    console.log('Generating QR Codes...');

    for (const emp of employees) {
        const url = `${baseUrl}/${emp.slug}`;
        const filePath = path.join(outputDir, `${emp.slug}.png`);

        try {
            await QRCode.toFile(filePath, url);
            console.log(`✅ Generated for ${emp.name}: ${filePath}`);
        } catch (err) {
            console.error(`❌ Failed for ${emp.name}`, err);
        }
    }
}

generate();
