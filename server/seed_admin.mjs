import pg from 'pg';
import bcrypt from 'bcrypt';

const pool = new pg.Pool({ connectionString: 'postgresql://admin:admin123@localhost:5433/chatcam' });

async function seedAdmin() {
    const email = 'dwaith.dev@gmail.com';
    const password = 'Dw@1thdev123';
    const role = 'admin'; // Both admin and manager can use this for login logic
    const username = 'dwaithdev';
    const name = 'Dwaith Dev';

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const checkResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (checkResult.rows.length > 0) {
            console.log(`User ${email} already exists. Updating password and role...`);
            await pool.query(
                'UPDATE users SET password = $1, role = $2, username = $3, name = $4 WHERE email = $5',
                [hashedPassword, role, username, name, email]
            );
        } else {
            console.log(`Creating user ${email}...`);
            await pool.query(
                'INSERT INTO users (email, password, role, username, name) VALUES ($1, $2, $3, $4, $5)',
                [email, hashedPassword, role, username, name]
            );
        }
        console.log('Seed successful');
    } catch (err) {
        console.error('Seed failed:', err);
    } finally {
        await pool.end();
    }
}

seedAdmin();
