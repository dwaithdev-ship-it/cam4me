import pg from 'pg';
const pool = new pg.Pool({ connectionString: 'postgresql://admin:admin123@localhost:5433/chatcam' });

const sampleAds = [
    {
        image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
        text: 'Best Camera Rentals in Hyderabad!',
        link: 'https://example.com/rentals',
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        run_mode: 'all'
    },
    {
        image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
        text: 'Professional Photo Studio Services',
        link: 'https://example.com/studio',
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        run_mode: 'all'
    }
];

try {
    // Clear old sample ads first
    await pool.query('DELETE FROM ads');

    for (const ad of sampleAds) {
        await pool.query(
            'INSERT INTO ads (image_url, text, link, start_date, end_date, run_mode) VALUES ($1, $2, $3, $4, $5, $6)',
            [ad.image_url, ad.text, ad.link, ad.start_date, ad.end_date, ad.run_mode]
        );
    }
    console.log('✅ Reliable sample ads inserted successfully!');
} catch (e) {
    console.error('Error seeding ads:', e.message);
} finally {
    await pool.end();
}
