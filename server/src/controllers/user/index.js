import HttpStatus from 'http-status-codes';

import * as userService from '../../services/user.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export async function updateUser(req, res, next) {
    try {
        const data = await userService.updateUserDetails(req.user,req.body);
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
export async function getUserDetail(req, res, next) {
    try {
        const data = await userService.getUserDetail(req.params.userId);
        return res.status(HttpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
}
