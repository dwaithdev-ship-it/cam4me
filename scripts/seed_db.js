import pg from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new pg.Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'cam4me',
    password: 'mypassword',
    port: 5432,
});

async function seed() {
    console.log('Connecting to PostgreSQL...');
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Drop existing tables for a clean start
        await client.query('DROP TABLE IF EXISTS admin_masterdata_location');
        await client.query('DROP TABLE IF EXISTS admin_masterdata_city');
        await client.query('DROP TABLE IF EXISTS admin_masterdata_category');

        // Table I: Hierarchical Locations
        await client.query(`
            CREATE TABLE IF NOT EXISTS admin_masterdata_location (
                id SERIAL PRIMARY KEY,
                state_name TEXT,
                district_name TEXT,
                constituency_name TEXT,
                mandal_name TEXT
            )
        `);

        // Table II: Cities
        await client.query(`
            CREATE TABLE IF NOT EXISTS admin_masterdata_city (
                id SERIAL PRIMARY KEY,
                name TEXT UNIQUE
            )
        `);

        // Table III: Categories
        await client.query(`
            CREATE TABLE IF NOT EXISTS admin_masterdata_category (
                id SERIAL PRIMARY KEY,
                name TEXT UNIQUE
            )
        `);

        console.log('Tables created. Seeding data...');

        // Seed Categories
        const categories = [
            'Cameras & drone',
            'Video editing & Album design',
            'Printing lab',
            'Human Resources'
        ];
        for (const cat of categories) {
            await client.query('INSERT INTO admin_masterdata_category (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [cat]);
        }

        // Seed Cities (Comprehensive list for AP & TS)
        const cities = [
            'Adilabad', 'Adoni', 'Alwal', 'Amalapuram', 'Anakapalle', 'Anantapur', 'Armur',
            'Bapatla', 'Bellampalli', 'Bhadrachalam', 'Bhimavaram', 'Bhongir', 'Bobbili', 'Bodhan',
            'Chilakaluripet', 'Chirala', 'Chittoor', 'Dasnapur', 'Devarakonda', 'Dharmavaram',
            'Eluru', 'Farooqnagar', 'Gadwal', 'Gajuwaka', 'Gudivada', 'Gudur', 'Guntakal', 'Guntur',
            'Hindupur', 'Hyderabad', 'Ichchapuram', 'Jagtial', 'Jammalamadugu', 'Jangaon',
            'Kadapa', 'Kadiam', 'Kagaznagar', 'Kakinada', 'Kamareddy', 'Kandukur', 'Kapra', 'Karimnagar', 'Kavali', 'Khammam', 'Koratla', 'Kothagudem', 'Kothapeta', 'Kovvur', 'Kurnool', 'Kyathampalle',
            'L.B. Nagar', 'Macherla', 'Machilipatnam', 'Madanapalle', 'Mahbubnagar', 'Malkajgiri', 'Mancherial', 'Mandamarri', 'Mangalagiri', 'Manuguru', 'Markapur', 'Medak', 'Meerpet', 'Miryalaguda',
            'Nagari', 'Nagarkurnool', 'Nalgonda', 'Nandyal', 'Narasapur', 'Narasaraopet', 'Narsipatnam', 'Nellore', 'Nirmal', 'Nizamabad', 'Nuzvid',
            'Ongole', 'Palacole', 'Palwancha', 'Piduguralla', 'Pithapuram', 'Ponnur', 'Proddatur', 'Punganur', 'Puttur',
            'Quthbullapur', 'Rajahmundry', 'Rajampet', 'Rajendranagar', 'Ramachandrapuram', 'Ramagundam', 'Rayachoti', 'Rayadurg', 'Renigunta', 'Repalle',
            'Sadasivpet', 'Salur', 'Samalkot', 'Sangareddy', 'Sattenapalle', 'Secunderabad', 'Serilingampally', 'Siddipet', 'Sircilla', 'Srikakulam', 'Srikalahasti', 'Suryapet',
            'Tadepalligudem', 'Tadpatri', 'Tandur', 'Tanuku', 'Tenali', 'Tirupati', 'Tuni',
            'Uppal', 'Venkatagiri', 'Vicarabad', 'Vijayawada', 'Vinukonda', 'Visakhapatnam', 'Vizianagaram',
            'Wanaparthy', 'Warangal', 'Yemmiganur', 'Yerraguntla', 'Zahirabad'
        ];
        for (const city of cities) {
            await client.query('INSERT INTO admin_masterdata_city (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [city]);
        }

        // Seed Hierarchical Locations from JSON
        const jsonPath = path.join(process.cwd(), 'AP_TS_Corrected.json');

        console.log(`[Seed] Reading location data from ${jsonPath}...`);

        if (!fs.existsSync(jsonPath)) {
            throw new Error(`JSON file not found at ${jsonPath}`);
        }

        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        let count = 0;

        // Parse corrected JSON structure: State -> District -> Constituency -> [Mandals]
        for (const [state, districts] of Object.entries(jsonData)) {
            for (const [district, constituencies] of Object.entries(districts)) {
                for (const [constituency, mandals] of Object.entries(constituencies)) {
                    // Normalize mandals list
                    const mandalList = Array.isArray(mandals) ? mandals : [];

                    if (mandalList.length === 0) {
                        // Insert constituency with placeholder mandal if empty
                        await client.query(
                            'INSERT INTO admin_masterdata_location (state_name, district_name, constituency_name, mandal_name) VALUES ($1, $2, $3, $4)',
                            [state, district, constituency, 'General']
                        );
                        count++;
                    } else {
                        for (const mandal of mandalList) {
                            await client.query(
                                'INSERT INTO admin_masterdata_location (state_name, district_name, constituency_name, mandal_name) VALUES ($1, $2, $3, $4)',
                                [state, district, constituency, typeof mandal === 'string' ? mandal : String(mandal)]
                            );
                            count++;
                        }
                    }

                    if (count % 100 === 0) console.log(`Seeded ${count} locations...`);
                }
            }
        }

        await client.query('COMMIT');
        console.log(`Seeding completed successfully! Total rows: ${count}`);

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Seeding failed:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

seed();
