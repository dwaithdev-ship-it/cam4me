import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { postgresService } from '../services/postgresService.js';

const router = express.Router();

// Public routes for fetching data (Lazy Loading)

router.get('/tree', async (req, res, next) => {
    try {
        const tree = await postgresService.getLocationTree();
        res.json(tree);
    } catch (error) {
        next(error);
    }
});

router.get('/states', async (req, res, next) => {
    try {
        const states = await postgresService.getStates();
        res.json(states);
    } catch (error) {
        next(error);
    }
});

router.get('/districts/:stateId', async (req, res, next) => {
    try {
        const districts = await postgresService.getDistricts(req.params.stateId);
        res.json(districts);
    } catch (error) {
        next(error);
    }
});

router.get('/constituencies/:districtId', async (req, res, next) => {
    try {
        const constituencies = await postgresService.getConstituencies(req.params.districtId);
        res.json(constituencies);
    } catch (error) {
        next(error);
    }
});

router.get('/mandals/:constituencyId', async (req, res, next) => {
    try {
        const mandals = await postgresService.getMandals(req.params.constituencyId);
        res.json(mandals);
    } catch (error) {
        next(error);
    }
});

router.get('/villages/:mandalId', async (req, res, next) => {
    try {
        const villages = await postgresService.getVillages(req.params.mandalId);
        res.json(villages);
    } catch (error) {
        next(error);
    }
});

// Admin routes for adding data
router.post('/', verifyToken, async (req, res, next) => {
    try {
        // Expect body: { type: 'state'|'district'|..., name: '...', parentId... }
        const { type, name, stateId, districtId, constituencyId, mandalId } = req.body;

        if (!type || !name) {
            return res.status(400).json({ error: 'Type and Name are required' });
        }

        const data = { name, stateId, districtId, constituencyId, mandalId };
        const result = await postgresService.saveLocation(type, data);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default router;
