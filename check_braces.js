import fs from 'fs';

try {
    const content = fs.readFileSync('src/App.jsx', 'utf8');
    let open = 0;
    const lines = content.split('\n');
    let appStartFound = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Rudimentary check for App start to reset counter if needed, or assume file start is 0
        // Actually, braces should balance across the whole file.

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '{') open++;
            if (char === '}') {
                open--;
                if (open === 0) {
                    // We might hit 0 at the end of imports if there are destructured imports? 
                    // import { x } from 'y'; -> { open, } close. 0.
                    // So hitting 0 is common.
                    // But if we hit 0 *after* App starts...
                    // Let's print every time it hits 0 after line 30 (where App starts).
                    if (i > 35) {
                        console.log(`Balance hit 0 at line ${i + 1}`);
                    }
                }
                if (open < 0) {
                    console.log(`ERROR: Refused closing brace at line ${i + 1}`);
                    process.exit(0);
                }
            }
        }
    }
    console.log(`Final balance: ${open}`);
} catch (e) {
    console.error(e);
}
