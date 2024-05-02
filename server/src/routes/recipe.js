import { Router } from 'express';

import * as recipeController from '../controllers/recipe/index.js';

import { verifyToken } from '../middleware/tokenValidator.js';

const router = Router();

/**
 * POST /recipe/favorite-recipe
 */
router.post('/favorite-recipe', recipeController.favoriteRecipe);

/**
 * GET /recipe/get-favorite-recipe
 */
router.get('/get-favorite-recipe/:userId', recipeController.getFavoriteRecipe);


/**
 * POST /recipe/add-comment
 */
router.post('/add-comment', recipeController.addComment);


/**
 * GET /recipe/get-all-recipe
 */
router.get('/get-all-recipes', recipeController.getAllRecipe);

export default router;