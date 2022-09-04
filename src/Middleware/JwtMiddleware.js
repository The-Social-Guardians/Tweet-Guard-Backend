import HttpAuthenticationException
    from '../Exceptions/HttpAuthenticationException.js';
import InternalServerException from '../Exceptions/InternalServerException.js';
import InvalidatedJwt from '../Models/InvalidatedJwtModel.js';
import {createController} from "../Lib/utils.js";

/**
 * @param {passport.PassportStatic} passport
 */
const JwtMiddleware = (passport) => createController((req, res, next) => {
    passport.authenticate('jwt', {
        session: false,
    }, async (error, user, info) => {
        if (error) {
            const response = {
                message: 'An error occured whiles performing request',
            };

            if (isDevMode) {
                response.details = error;
            }

            next(new InternalServerException(response));
        }

        const token = req.headers.authorization?.split(' ')[1];
        const tokenInvalidated = await InvalidatedJwt.findOne({
            token,
        });

        if (!token || tokenInvalidated) {
            next(new HttpAuthenticationException('Invalid JWT'));
            return;
        }

        if (!user) {
            next(new HttpAuthenticationException(info?.message ?? 'User not found'));
        }

        req.user = user;

        next();
    })(req, res, next);
});

export default JwtMiddleware;
