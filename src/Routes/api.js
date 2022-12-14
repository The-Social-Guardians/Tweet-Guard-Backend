import bodyParser from 'body-parser';
import { Router } from 'express';
import passport from 'passport';

import { JwtMiddleware, logout } from '../Controller/ApiController.js';
import { JwtStrategy as useJwtPassportStrategy } from '../PassportStrategy/index.js';

export default () => {
    const router = Router();
    useJwtPassportStrategy(passport);
    router.use(passport.initialize());
    router.use(JwtMiddleware(passport));
    router.use(bodyParser.json());

    router.get('/logout', logout);

    return router;
};
