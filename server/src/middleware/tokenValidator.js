import * as security from '../utils/security.js';
import { getUserDetail } from '../services/user.js';
import TokenError from '../errors/token.js';
import AuthenticationError from '../errors/authentication.js';

export const verifyToken = async (req, res, next) => {

    const { authorization = '' } = req.headers;

    const [tokenType, token] = authorization.split(' ').filter(Boolean);

    if (tokenType !== 'Bearer' || !token) {
        const tokenError = new TokenError('Token Required');

        return next(tokenError);
    }

    let decryptedToken = null;

    try {
        decryptedToken = security.decrypt(token).encryptedData;
        req.user = await getUserDetail(decryptedToken.id);
        
        return next();
    } catch (err) {
        return next(new AuthenticationError('Not Authorized'));
    }
}

export const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    let decryptedToken = null;

    try {
        decryptedToken = security.decrypt(refreshToken).encryptedData;
        req.user = await getUserDetail(decryptedToken.id);

        return next();
    } catch (err) {
        console.log(err);
        return next(new AuthenticationError('Not Authorized'));
    }
}

export const authenticateUserToken = async (req, res, next) => {

    const { authorization = '' } = req.headers;

    const [tokenType, token] = authorization.split(' ').filter(Boolean);

    if (tokenType !== 'Bearer' || !token) {
        const tokenError = new TokenError('Token Required');

        return next(tokenError);
    }

    let decryptedToken = null;
    console.log(req.body);
    try {
        decryptedToken = security.decrypt(token).encryptedData;
        req.user = await getUserDetail(decryptedToken.id);

        return req.body.accessToken;
    } catch (err) {
        return next(new AuthenticationError('Not Authorized'));
    }
}