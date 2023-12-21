import express from 'express';

import auth from '../middleware/authentication.js';
import {
    createPlace,
    getPlaces
} from '../controllers/places.controller.js';

const router = express.Router();

router.post('/', auth, createPlace);
router.get('/', auth, getPlaces);

export default router;