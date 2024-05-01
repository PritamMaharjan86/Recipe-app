import { Router } from 'express';

import * as userController from '../controllers/user/index.js';

import { verifyToken } from '../middleware/tokenValidator.js';

const router = Router();

/**
 * POST /auth/update-user
 */
router.post('/update-user', verifyToken, userController.updateUser);



/**
 * GET /auth/get-user-deatils
 */
router.get('/get-user-details/:userId', verifyToken, userController.getUserDetail);


export default router;