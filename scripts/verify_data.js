import fs from 'fs';
import path from 'path';

const jsonPath = path.join(process.cwd(), 'public', 'AP_TS_Corrected.json');

function verify() {
    console.log(`Checking ${jsonPath}...`);
    if (!fs.existsSync(jsonPath)) {
        console.error('File not found!');
        process.exit(1);
    }

    try {
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        const states = Object.keys(data);
        console.log(`Found ${states.length} states: ${states.join(', ')}`);

        if (states.length > 0) {
            const firstState = states[0];
            const districts = Object.keys(data[firstState]);
            console.log(`Districts for ${firstState}: ${districts.length}`);

            if (districts.length > 0) {
                const firstDistrict = districts[0];
                const constituencies = Object.keys(data[firstState][firstDistrict]);
                console.log(`Constituencies for ${firstDistrict}: ${constituencies.length}`);

                if (constituencies.length > 0) {
                    const firstConstituency = constituencies[0];
                    const mandals = data[firstState][firstDistrict][firstConstituency];
                    console.log(`Mandals for ${firstConstituency}: ${Array.isArray(mandals) ? mandals.length : 'Not an array'}`);
                }
            }
        }
        console.log('JSON structure looks correct for hierarchy logic.');
    } catch (e) {
        console.error('Failed to parse or verify JSON:', e.message);
        process.exit(1);
    }
}

verify();
