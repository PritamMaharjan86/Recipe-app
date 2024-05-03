import HttpStatus from 'http-status-codes';

import * as recipeService from '../../services/recipe.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export async function favoriteRecipe(req, res, next) {
    try {
        const data = await recipeService.favoriteRecipe(req.body);
        return res.status(HttpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export async function getFavoriteRecipe(req, res, next) {
    try {
        const data = await recipeService.getFavoriteRecipe(req.params.userId);
        return res.status(HttpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export async function addComment(req, res, next) {
    try {
        const data = await recipeService.addComment(req.body);
        return res.status(HttpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export async function getAllRecipe(req, res, next) {
    try {
        const data = await recipeService.getAllRecipe(req.body);
        return res.status(HttpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
}
