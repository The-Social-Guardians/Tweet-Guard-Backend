import bodyParser from 'body-parser';
import { Router } from 'express';
import passport from 'passport';

import JwtMiddleware from '../Middleware/JwtMiddleware.js';
import jwt from '../PassportStrategies/Jwt.js';

export default () => {
    const router = Router();
    jwt(passport);
    router.use(passport.initialize());
    router.use(JwtMiddleware(passport));
    router.use(bodyParser.json());

    return router;
};
