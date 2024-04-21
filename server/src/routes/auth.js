import { Router } from 'express';

import * as authController from '../controllers/auth/index.js';

import { verifyRefreshToken, verifyToken } from '../middleware/tokenValidator.js';

const router = Router();

/**
 * POST /auth/create-user
 */
router.post('/create-user', authController.createUser);

/**
 * POST /auth/login
 */
router.post('/login', authController.login);
/**
 * POST /auth/refresh-token
 */
router.post('/refresh-token', verifyRefreshToken, authController.refreshToken);

/**
 * POST /auth/authenticate-token
 */
router.post('/authenticate-token', authController.authenticateToken);

export default router;