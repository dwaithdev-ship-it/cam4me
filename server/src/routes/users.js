import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import { postgresService } from '../services/postgresService.js';

const router = express.Router();

// GET current user profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await postgresService.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Fetch Profile Error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// UPDATE user profile
router.put('/profile', verifyToken, async (req, res) => {
    try {
        const updatedUser = await postgresService.updateUserProfile(req.user.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// GET all users (Admin only)
router.get('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await postgresService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Fetch All Users Error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// DELETE user (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        await postgresService.deleteUser(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete User Error:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// UPDATE user role (Admin only) - Used for disabling/blocking
router.patch('/:id/role', verifyToken, isAdmin, async (req, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'admin', 'disabled'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        const updatedUser = await postgresService.updateUserRole(req.params.id, role);
        res.json(updatedUser);
    } catch (error) {
        console.error('Update User Role Error:', error);
        res.status(500).json({ error: 'Failed to update user role' });
    }
});

export default router;
