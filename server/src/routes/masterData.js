import express from 'express';
import { postgresService } from '../services/postgresService.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET all master data (consolidated for frontend sync)
router.get('/', async (req, res) => {
    try {
        const [rawLocations, categories, cities] = await Promise.all([
            postgresService.getAllMasterDataLocations(),
            postgresService.getCategories(),
            postgresService.getCities()
        ]);

        // Build location hierarchy: { State: { District: { Constituency: [Mandals] } } }
        const hierarchy = {};
        rawLocations.forEach(row => {
            if (!row.state_name) return;
            if (!hierarchy[row.state_name]) hierarchy[row.state_name] = {};

            if (row.district_name && row.district_name !== 'N/A') {
                if (!hierarchy[row.state_name][row.district_name]) {
                    hierarchy[row.state_name][row.district_name] = {};
                }

                if (row.constituency_name && row.constituency_name !== 'N/A') {
                    if (!hierarchy[row.state_name][row.district_name][row.constituency_name]) {
                        hierarchy[row.state_name][row.district_name][row.constituency_name] = [];
                    }

                    if (row.mandal_name && row.mandal_name !== 'N/A') {
                        if (!hierarchy[row.state_name][row.district_name][row.constituency_name].includes(row.mandal_name)) {
                            hierarchy[row.state_name][row.district_name][row.constituency_name].push(row.mandal_name);
                        }
                    }
                }
            }
        });

        res.json({
            locations: hierarchy,
            categories: categories.map(c => c.name),
            cities: cities.map(c => c.name)
        });
    } catch (error) {
        console.error('Master Data Sync Error:', error);
        res.status(500).json({ error: 'Failed to fetch master data' });
    }
});

// Admin: Locations management
router.post('/locations', verifyToken, isAdmin, async (req, res) => {
    try {
        const location = await postgresService.saveMasterLocation(req.body);
        res.status(201).json(location);
    } catch (error) {
        console.error('Save Location Error:', error);
        res.status(500).json({ error: 'Failed to save location' });
    }
});

router.delete('/locations', verifyToken, isAdmin, async (req, res) => {
    try {
        await postgresService.deleteMasterLocation(req.body);
        res.json({ success: true });
    } catch (error) {
        console.error('Delete Location Error:', error);
        res.status(500).json({ error: 'Failed to delete location' });
    }
});

// Admin: Cities management
router.post('/cities', verifyToken, isAdmin, async (req, res) => {
    try {
        const city = await postgresService.saveCity(req.body.name);
        res.status(201).json(city);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save city' });
    }
});

router.delete('/cities', verifyToken, isAdmin, async (req, res) => {
    try {
        await postgresService.deleteCity(req.body.name);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete city' });
    }
});

// Admin: Categories management
router.post('/categories', verifyToken, isAdmin, async (req, res) => {
    try {
        const category = await postgresService.saveCategory(req.body.name);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save category' });
    }
});

router.delete('/categories', verifyToken, isAdmin, async (req, res) => {
    try {
        await postgresService.deleteCategory(req.body.name);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

export default router;
