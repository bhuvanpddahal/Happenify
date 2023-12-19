import express from 'express';

import auth from '../middleware/authentication.js';
import {
    createPlace
} from '../controllers/places.controller.js';

const router = express.Router();

router.post('/', createPlace);

export default router;