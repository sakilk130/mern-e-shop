import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
export default router;
