import passport from 'passport';
import jwt from 'jsonwebtoken';
import { isDevMode } from '../Lib/utils.js';
import InternalServerException from '../Exceptions/InternalServerException.js';

const twitterAuth = passport.authenticate('twitter');

//this callback is called automatically after auth : reference => https://www.passportjs.org/packages/passport-twitter/
/** @type {import("express").RequestHandler} */
const twitterAuthCallback = (req, res, next) => {
    passport.authenticate(
        'twitter',
        {
            assignProperty: 'federatedUser',
            failureRedirect: 'http://localhost:5000/failure', // auth failure redirect,
        },
        async (err, user, info, status) => {
            if (!user) {
                throw new InternalServerException('An unknown error occured');
            }

            const token = jwt.sign(
                {
                    user: {
                        id: user._id,
                        name: user.twitterUsername,
                    },
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '30 days',
                }
            );

            res.redirect(
                isDevMode()
                    ? `http://localhost:5000/success?token=${token}`
                    : `https://tweet-guard-frontend.vercel.app?token=${token}`
            ); //auth success redirect
        }
    )(req, res, next);
};

export { twitterAuth, twitterAuthCallback };
