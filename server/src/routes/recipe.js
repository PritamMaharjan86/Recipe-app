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
 * POST /recipe/add-comment
 */
router.post('/like-recipe', recipeController.likeRecipe);

/**
 * GET /recipe/get-all-recipe
 */
router.post('/get-all-recipes', recipeController.getAllRecipe);

/**
 * POST /recipe/add-recipe
 */
router.post('/add-recipe', recipeController.addRecipe);

export default router;