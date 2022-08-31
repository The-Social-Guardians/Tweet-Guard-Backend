import { Router } from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import jwt from '../PassportStrategies/Jwt.js';
import { JwtMiddleware } from '../Controllers/ApiController.js';

export default () => {
    const router = Router();
    jwt(passport)
    router.use(passport.initialize());
    router.use(JwtMiddleware(passport));
    router.use(bodyParser.json())

    router.get('/test', (req, res, next) => {
        res.json({
            message: 'JWT is finally working for /api endpoints!'
        })
    })

    return router
}
