import bodyParser from 'body-parser';
import { Router } from 'express';
import passport from 'passport';

import { logout } from '../Controllers/ApiController.js';
import jwt from '../PassportStrategies/Jwt.js';
import JwtMiddleware from "../Middleware/JwtMiddleware.js";

export default () => {
    const router = Router();
    jwt(passport);
    router.use(passport.initialize());
    router.use(JwtMiddleware(passport));
    router.use(bodyParser.json());

    router.get('/logout', logout);

    return router;
};
