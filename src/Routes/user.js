import bodyParser from 'body-parser';
import {Router} from 'express';
import passport from 'passport';

import jwt from '../PassportStrategies/Jwt.js';
import JwtMiddleware from "../Middleware/JwtMiddleware.js";
import {
    getUserShamelist,
    getWhitelist,
    reportUser
} from "../Controllers/UserController.js";

export default () => {
    const router = Router();
    jwt(passport);
    router.use(passport.initialize());
    router.use(JwtMiddleware(passport));
    router.use(bodyParser.json());


    router.get('/shamelist', getUserShamelist);

    router.post('/shamelist/report', reportUser);

    router.post('/whitelist', getWhitelist);

    return router;
};
