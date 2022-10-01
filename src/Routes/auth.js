import MongoStore from 'connect-mongo';
import { Router } from 'express';
//we need to use passport as an authentication middleware. Read more here =>  https://www.passportjs.org/
import session from 'express-session';
import passport from 'passport';

import {
    twitterAuth,
    twitterAuthCallback,
} from '../Controller/AuthController.js';
import { TwitterStrategy as useTwitterPassportStrategy } from '../PassportStrategy/index.js';

export default () => {
    const router = Router();
    useTwitterPassportStrategy(passport);

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

    return router;
};
