import express from 'express';
const router = express.Router();
import { authUser, getUserProfile } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
