import express from 'express';

import auth from '../middleware/authentication.js';
import {
    createEvent,
    getEventById,
    getUserEvents,
    getEvents,
    searchTrendingEvents,
    searchUserEvents,
    updateEvent,
    deleteEvent,
    bookEntry
} from '../controllers/events.controller.js';

const router = express.Router();

router.get('/search/trending', auth, searchTrendingEvents);
router.get('/search/user', auth, searchUserEvents);
router.post('/', auth, createEvent);
router.get('/', auth, getEvents);
router.get('/user', auth, getUserEvents);
router.get('/:id', auth, getEventById);
router.patch('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.post('/book-entry/:id', auth, bookEntry);

export default router;