import express from 'express';

import auth from '../middleware/authentication.js';
import {
    signup,
    login,
    loginWithToken
} from '../controllers/users.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/login-with-token', auth, loginWithToken);

export default router;