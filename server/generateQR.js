const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

// Output directory
const outputDir = path.join(__dirname, 'qrcodes');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const employees = [
    { slug: 'fama-diaw', name: 'Fama Diaw' },
    { slug: 'souleymane-sall', name: 'Souleymane Sall' }
];

// Production domain
const baseUrl = 'https://qr-code-eight-inky.vercel.app';
const logoPath = path.join(__dirname, '..', 'client', 'public', 'images', 'logo_powertech.png');

async function generate() {
    console.log('Generating QR Codes with Logo...');

    try {
        // Load logo
        if (!fs.existsSync(logoPath)) {
            throw new Error(`Logo not found at ${logoPath}`);
        }
        const logo = await Jimp.read(logoPath);

        for (const emp of employees) {
            const url = `${baseUrl}/${emp.slug}`;
            const filePath = path.join(outputDir, `${emp.slug}.png`);

            // 1. Generate QR Code as Buffer (using High Error Correction for logo overlay)
            const qrBuffer = await QRCode.toBuffer(url, {
                errorCorrectionLevel: 'H',
                margin: 2,
                width: 1024,
                color: {
                    dark: '#ea580c', // PowerTech Orange
                    light: '#ffffff'
                }
            });

            // 2. Load QR into Jimp
            const qrImage = await Jimp.read(qrBuffer);

            // 3. Resize logo (should be small enough to keep QR readable, typical max 25%)
            const logoWidth = qrImage.bitmap.width * 0.22;
            logo.resize({ w: logoWidth });

            // 4. Create a white background for the logo to improve readability
            const whiteBg = new Jimp({
                width: Math.floor(logo.bitmap.width + 20),
                height: Math.floor(logo.bitmap.height + 20),
                color: 0xFFFFFFFF
            });
            whiteBg.composite(logo, 10, 10);

            // 5. Center logo on QR
            const x = (qrImage.bitmap.width - whiteBg.bitmap.width) / 2;
            const y = (qrImage.bitmap.height - whiteBg.bitmap.height) / 2;
            qrImage.composite(whiteBg, x, y);

            // 6. Save
            await qrImage.write(filePath);
            console.log(`✅ Generated with logo for ${emp.name}: ${filePath}`);
        }
    } catch (err) {
        console.error('❌ Generation process failed:', err.message);
    }
}

generate();
