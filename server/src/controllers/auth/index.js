import HttpStatus from 'http-status-codes';

import * as authService from '../../services/auth.js';
import { verifyToken, authenticateUserToken } from '../../middleware/tokenValidator.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export async function createUser(req, res, next) {
    try {
        const data = await authService.createUser(req.body);
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
export async function login(req, res, next) {
    try {
        const data = await authService.login(req.body);

        return res.status(HttpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
}

export async function refreshToken(req, res, next) {
    try {
        const data = await authService.refreshToken(req.user);

        return res.status(HttpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
}

export async function authenticateToken(req, res, next) {
    try {
        const data = await authenticateUserToken(req);
        console.log(data)
        return res.status(HttpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
}