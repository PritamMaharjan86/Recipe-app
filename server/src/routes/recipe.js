import { Router } from 'express';

import * as recipeController from '../controllers/recipe/index.js';

import { verifyToken } from '../middleware/tokenValidator.js';

const router = Router();

/**
 * POST /recipe/favorite-recipe
 */
router.post('/favorite-recipe', recipeController.favoriteRecipe);

export default router;