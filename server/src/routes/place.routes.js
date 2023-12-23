import express from 'express';

import auth from '../middleware/authentication.js';
import {
    createPlace,
    getPlaces,
    getUserPlaces,
    getPlaceById,
    searchTrendingPlaces,
    searchUserPlaces
} from '../controllers/places.controller.js';

const router = express.Router();

router.get('/search/trending', auth, searchTrendingPlaces);
router.get('/search/user', auth, searchUserPlaces);
router.post('/', auth, createPlace);
router.get('/', auth, getPlaces);
router.get('/user', auth, getUserPlaces);
router.get('/:id', auth, getPlaceById);

export default router;