import express from 'express';
import { config } from 'dotenv';
import passport from 'passport'; //we need to use passport as an authentication middleware. Read more here =>  https://www.passportjs.org/
import session from 'express-session';
import MongoStore from 'connect-mongo';
import twitter from './src/PassportStrategies/Twitter.js';
import { connect as connectDb } from './src/Lib/dbConnection.js';

config();
connectDb();
twitter(passport);

const PORT = process.env.PORT || 5000;
const app = express();

//apparently cant use passportJs without setting up a session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL
        })
    })
);
app.use(passport.initialize());

//end point for auth. Check ./src/PassportStrategies/Twitter.js to see what happens during auth
app.get('/api/auth', passport.authenticate('twitter'));

//this callback is called automatically after auth : reference => https://www.passportjs.org/packages/passport-twitter/
app.get(
    '/api/user/twitter/callback',
    passport.authenticate('twitter', {
        assignProperty: 'federatedUser',
        failureRedirect: 'http://localhost:5000/failure', // auth failure redirect
    }),
    (req, res, next) => {
        res.redirect('http://localhost:5000/success'); //auth success redirect
    }
);

app.listen(PORT, () => {
    console.log('Server listening on ', PORT);
});
