import express from 'express';

import auth from '../middleware/authentication.js';
import {
    createPlace,
    getPlaces,
    getUserPlaces,
    getPlaceById
} from '../controllers/places.controller.js';

const router = express.Router();

router.post('/', auth, createPlace);
router.get('/', auth, getPlaces);
router.get('/user', auth, getUserPlaces);
router.get('/:id', auth, getPlaceById);

export default router;