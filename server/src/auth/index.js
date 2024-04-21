import HttpStatus from 'http-status-codes';

/**
 * Extract token from headers in http request.
 *
 * @param {Object} headers
 * @returns {Object}
 */
function extractTokenFromHeaders(headers = {}) {
    const { authorization = '' } = headers;

    const [tokenType, token] = authorization.split(' ').filter(Boolean);

    if (tokenType !== 'Bearer' || !token) {
        throw HttpStatus.BAD_REQUEST;
    }

    return token;
}

/**
 * Fetch user from auth server using token.
 *
 * @param {String} token
 * @throws {NetworkError}
 * @returns {Promise}
 */
// async function fetchUserByToken(token) {
//   const { data } = await http.get(`${config.auth.baseUrl}/userinfo`, {
//     headers: {
//       accessToken: token,
//       clientId: config.auth.clientId,
//     },
//   });

//   return data;
// }

/**
 * Validate token received in header.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
async function authenticateUser(req, res, next) {
    try {
        const token = extractTokenFromHeaders(req.headers);
        // const user = await fetchUserByToken(token);

        req.token = token;
        // req.currentUser = user.data;
        next();
    } catch (err) {
        if (err && err.code === 'ECONNREFUSED')
            return next(HttpStatus.BAD_REQUEST);

        if (
            err &&
            err.response &&
            err.response.status === HttpStatus.UNAUTHORIZED
        ) {
            return next(HttpStatus.BAD_REQUEST);
        }

        next(err);
    }
}
export default authenticateUser;