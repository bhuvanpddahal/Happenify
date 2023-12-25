import express from 'express';

import auth from '../middleware/authentication.js';
import {
    createEvent,
    getEventById,
    getUserEvents,
    getEvents,
    searchTrendingEvents,
    searchUserEvents,
    updateEvent
} from '../controllers/events.controller.js';

const router = express.Router();

router.get('/search/trending', auth, searchTrendingEvents);
router.get('/search/user', auth, searchUserEvents);
router.post('/', auth, createEvent);
router.get('/', auth, getEvents);
router.get('/user', auth, getUserEvents);
router.get('/:id', auth, getEventById);
router.patch('/update/:id', auth, updateEvent);

export default router;