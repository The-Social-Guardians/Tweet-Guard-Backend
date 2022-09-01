import passport from 'passport';
import { isDevMode } from '../Lib/utils.js';
import InternalServerException from '../Exceptions/InternalServerException.js';
import HttpAuthenticationException from '../Exceptions/HttpAuthenticationException.js';
import InvalidatedJwt from '../Models/InvalidatedJwtModel.js';

/**
 * @param {import("passport").PassportStatic} passport
 *
 * @returns {import("express").RequestHandler}
 */
const JwtMiddleware = (passport) => (req, res, next) => {
    passport.authenticate(
        'jwt',
        {
            session: false,
        },
        async (error, user, info) => {
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
                next(
                    new HttpAuthenticationException(
                        info?.message ?? 'User not found'
                    )
                );
            }

            req.user = user;

            next();
        }
    )(req, res, next);
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const logout = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    InvalidatedJwt.findOneAndUpdate(
        {
            token,
        },
        {
            user: req.user,
            token,
        },
        {
            upsert: true,
            setDefaultsOnInsert: true,
        }
    ).then(() => {
        res.status(200).json({
            message: 'Logout successful!',
        });
    });
};

export { JwtMiddleware, logout };
