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
    { slug: 'souleymane-sall', name: 'Souleymane Sall' },
    { slug: 'mame-ngone-sy', name: 'Mame Ngoné Sy' },
    { slug: 'oulimata-cissokho', name: 'Oulimata Cissokho' },
    { slug: 'yara-coulibaly', name: 'Yara Gorgui Coulibaly Kadam' },
    { slug: 'rabyatou-diallo', name: 'Rabyatou Diallo' },
    { slug: 'mariama-tine', name: 'Mariama Tine' },
    { slug: 'houleye-sy', name: 'Houleye Sy' },
    { slug: 'oumy-mboup', name: 'Oumy Mboup' },
    { slug: 'mame-diarra-sagne', name: 'Mame Diarra Sagne' },
    { slug: 'ibrahima-sene', name: 'Ibrahima Sene' },
    { slug: 'kine-gueye-sambe', name: 'Kiné Gueye Sambe' },
    { slug: 'ngone-thiam', name: 'Ngoné Thiam' },
    { slug: 'abdoul-aziz-fall', name: 'Abdoul Aziz Fall' },
    { slug: 'anta-gaye', name: 'Anta Gaye' },
    { slug: 'mademba-thiam', name: 'Mademba Thiam' },
    { slug: 'papa-dethie-thiam', name: 'Papa Dethie Thiam' }
];

// Production domain
const baseUrl = 'https://qr-code-eight-inky.vercel.app';
const logoPath = path.join(__dirname, '..', 'client', 'public', 'images', 'logo_powertech.png');

async function generate() {
    console.log('Generating Plain Black QR Codes...');

    try {
        for (const emp of employees) {
            const url = `${baseUrl}/${emp.slug}`;
            const filePath = path.join(outputDir, `${emp.slug}.png`);

            // Generate Plain QR Code
            await QRCode.toFile(filePath, url, {
                errorCorrectionLevel: 'M',
                margin: 4,
                width: 1024,
                color: {
                    dark: '#000000', // Black
                    light: '#ffffff'
                }
            });

            console.log(`✅ Generated for ${emp.name}: ${filePath}`);
        }
    } catch (err) {
        console.error('❌ Generation process failed:', err.message);
    }
}

generate();
