import { Router } from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import jwt from '../PassportStrategies/Jwt.js';
import { JwtMiddleware } from '../Controllers/ApiController.js';
import InvalidatedJwt from '../Models/InvalidatedJwtModel.js';
import InternalServerException from '../Exceptions/InternalServerException.js';

export default () => {
    const router = Router();
    jwt(passport);
    router.use(passport.initialize());
    router.use(JwtMiddleware(passport));
    router.use(bodyParser.json());

    router.get('/logout', (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        InvalidatedJwt.findOneAndUpdate(
            {
                token,
            },
            {
                user: req.user.id,
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
    });

    router.get('/test', (req, res, next) => {
        res.json({
            message: 'JWT is finally working for /api endpoints!',
        });
    });

    return router;
};
