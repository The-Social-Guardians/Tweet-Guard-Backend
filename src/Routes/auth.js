import MongoStore from 'connect-mongo';
import { Router } from 'express';
//we need to use passport as an authentication middleware. Read more here =>  https://www.passportjs.org/
import session from 'express-session';
import passport from 'passport';

import {
    logout,
    twitterAuth,
    twitterAuthCallback,
} from '../Controllers/AuthController.js';
import twitter from '../PassportStrategies/Twitter.js';

export default () => {
    const router = Router();
    twitter(passport);

    //apparently cant use passportJs without setting up a session
    router.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: process.env.MONGO_URL,
            }),
        })
    );
    router.use(passport.initialize());
    router.get('/twitter', twitterAuth);
    router.get('/twitter/callback', twitterAuthCallback);
    router.get('/logout', logout);

    return router;
};
