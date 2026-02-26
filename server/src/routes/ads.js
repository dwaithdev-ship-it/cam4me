import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import { postgresService } from '../services/postgresService.js';

const router = express.Router();

// GET all active ads
router.get('/', async (req, res) => {
    try {
        const ads = await postgresService.getActiveAds();
        res.json(ads);
    } catch (error) {
        console.error('Fetch Ads Error:', error);
        res.status(500).json({ error: 'Failed to fetch ads' });
    }
});

// CREATE a new ad (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const newAd = await postgresService.createAd(req.body);
        res.status(201).json(newAd);
    } catch (error) {
        console.error('Create Ad Error:', error);
        res.status(500).json({ error: 'Failed to create ad' });
    }
});

// DELETE an ad (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        await postgresService.deleteAd(req.params.id);
        res.json({ message: 'Ad deleted successfully' });
    } catch (error) {
        console.error('Delete Ad Error:', error);
        res.status(500).json({ error: 'Failed to delete ad' });
    }
});

export default router;
