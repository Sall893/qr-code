const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const supabase = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'PowerTech Backend is running' });
});

// Get Employee by Slug or ID
app.get('/api/employees/:slug', async (req, res) => {
    const { slug } = req.params;

    // Assuming we use a 'slug' column or emulate it with first-last name
    // For now, let's try to find by ID or some unique identifier. 
    // If the user meant "manual page url /fama-diaw", "fama-diaw" might be a slug or ID.

    // Real implementation would depend on exact DB schema. 
    // We will search by a new 'slug' column or name.
    // For simplicity: SELECT * FROM employees WHERE slug = slug

    try {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .eq('slug', slug) // We assume a slug column exists for the URL
            .single();

        if (error) {
            // Fallback: Try searching by full_name based on slug format "fama-diaw" -> "Fama Diaw"
            // This is a naive heuristic if slug column doesn't exist.
            const nameGuess = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            const { data: dataName, error: errorName } = await supabase
                .from('employees')
                .select('*')
                .ilike('full_name', nameGuess)
                .single();

            if (errorName) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            return res.json(dataName);
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Generate QR Code
app.post('/api/generate-qr', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    try {
        const qrDataURL = await QRCode.toDataURL(url);
        res.json({ qrCode: qrDataURL });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate QR' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
