import pg from 'pg';
import bcrypt from 'bcrypt';

const pool = new pg.Pool({ connectionString: 'postgresql://admin:admin123@localhost:5433/chatcam' });

const email = 'dwaith.dev@gmail.com';
const password = 'Dw@1thdev123';
const role = 'admin';

try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user exists
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (res.rows.length > 0) {
        // Update
        await pool.query(
            'UPDATE users SET password = $1, role = $2, setup_completed = true WHERE email = $3',
            [hashedPassword, role, email]
        );
        console.log('Admin user updated successfully');
    } else {
        // Insert
        await pool.query(
            'INSERT INTO users (email, password, role, username, name, setup_completed) VALUES ($1, $2, $3, $4, $5, true)',
            [email, hashedPassword, role, 'admin', 'Admin User']
        );
        console.log('Admin user created successfully');
    }
} catch (err) {
    console.error('Error fixing credentials:', err.message);
} finally {
    await pool.end();
}
