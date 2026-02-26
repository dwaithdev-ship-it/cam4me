import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { postgresService } from '../services/postgresService.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password, username, name, device_id } = req.body;

        // Check if user exists
        const existingUser = await postgresService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Check if device is already registered
        if (device_id) {
            const deviceUser = await postgresService.getUserByDeviceId(device_id);
            if (deviceUser) {
                return res.status(400).json({ error: 'This device is already associated with another account.' });
            }
        }

        // Create user
        const newUser = await postgresService.createUser({
            email,
            password,
            username: username || email.split('@')[0],
            name,
            device_id
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password, device_id } = req.body;

        const user = await postgresService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        if (user.role === 'disabled') {
            return res.status(403).json({ error: 'Your account has been disabled.' });
        }

        // Enforce device binding
        if (user.device_id && device_id && user.device_id !== device_id) {
            return res.status(403).json({
                error: 'Device Mismatch',
                message: 'This account is bound to another device. You cannot sign in from this device.'
            });
        }

        // If user doesn't have a device_id yet, bind it now (e.g. legacy users)
        if (!user.device_id && device_id) {
            // Check if device is taken
            const deviceUser = await postgresService.getUserByDeviceId(device_id);
            if (deviceUser) {
                return res.status(403).json({ error: 'Device already in use by another account.' });
            }
            // Update user to bind device
            await postgresService.updateUserProfile(user.id, { device_id });
            user.device_id = device_id;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                name: user.name,
                setup_completed: user.setup_completed
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/check-device/:deviceId', async (req, res) => {
    try {
        const { deviceId } = req.params;
        const user = await postgresService.getUserByDeviceId(deviceId);
        if (user) {
            res.json({ exists: true, email: user.email });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Check Device Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
