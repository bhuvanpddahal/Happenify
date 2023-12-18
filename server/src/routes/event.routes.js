import express from 'express';

import auth from '../middleware/authentication.js';
import {
    createEvent,
    getEventById,
    getUserEvents,
    getEvents,
    searchEvents
} from '../controllers/events.controller.js';

const router = express.Router();

router.get('/search', auth, searchEvents);
router.post('/', auth, createEvent);
router.get('/', auth, getEvents);
router.get('/user', auth, getUserEvents);
router.get('/:id', auth, getEventById);

export default router;