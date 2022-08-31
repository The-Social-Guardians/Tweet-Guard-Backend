import passport from "passport";
import { isDevMode } from "../Lib/utils.js";
import InternalServerException from '../Exceptions/InternalServerException.js';
import HttpAuthenticationException from '../Exceptions/HttpAuthenticationException.js'

/**
 * @param {import("passport").PassportStatic} passport
 * 
 * @returns {import("express").RequestHandler}
 */
const JwtMiddleware = (passport) => (req, res, next) => {
    passport.authenticate('jwt', {
        session: false
    }, (error, user, info) => {
        if (error) {
            const response = {
                message: 'An error occured whiles performing request'
            }

            if (isDevMode) {
                response.details = error
            }

            throw new InternalServerException(response)
        }

        if (!user) {
            throw new HttpAuthenticationException(info?.message ?? 'Authentication error')
        }

        next()
    })(req, res, next)
}

export {
    JwtMiddleware
}
