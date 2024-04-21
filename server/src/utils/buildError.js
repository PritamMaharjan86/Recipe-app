import HttpStatus from "http-status-codes";

import TokenError from "../errors/token.js";
import AuthenticationError from "../errors/authentication.js";

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
    // Custom errors
    if (err.isCustom) {
        // TODO: Handle different instances of error

        if (err instanceof TokenError || err instanceof AuthenticationError) {
            return {
                code: HttpStatus.UNAUTHORIZED,
                message:
                    err.message || HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
            };
        }


        return {
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message:
                err.message ||
                HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        };
    }

    // Return INTERNAL_SERVER_ERROR for all other cases
    return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    };
}

export default buildError;
