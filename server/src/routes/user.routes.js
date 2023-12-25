import express from 'express';

import auth from '../middleware/authentication.js';
import {
    signup,
    login,
    loginWithToken,
    getUserById,
    followUser,
    unfollowUser
} from '../controllers/users.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/login-with-token', auth, loginWithToken);
router.get('/:id', auth, getUserById);
router.post('/follow/:id', auth, followUser);
router.post('/unfollow/:id', auth, unfollowUser);

export default router;