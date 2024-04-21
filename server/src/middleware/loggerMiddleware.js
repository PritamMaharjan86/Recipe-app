// loggerMiddleware.js
import logger from '../logger.js';

function logIncomingRequest(req, res, next) {
    const { method, url } = req;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    logger.info(`Received ${method} request from ${ip} to ${url}`);
    next();
}

export default logIncomingRequest;
