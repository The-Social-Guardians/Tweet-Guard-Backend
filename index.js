import express from 'express';
import { config } from 'dotenv';
import passport, { initialize, authenticate } from 'passport'; //we need to use passport as an authentication middleware. Read more here =>  https://www.passportjs.org/
import session from 'express-session';

config();
require('./src/PassportStrategies/Twitter').default(passport);

const PORT = process.env.PORT || 5000;
const app = express();

//apparently cant use passportJs without setting up a session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(initialize());

//end point for auth. Check ./passportTwitter to see what happens during auth
app.get('/api/auth', authenticate('twitter'));

//this callback is called automatically after auth : reference => https://www.passportjs.org/packages/passport-twitter/
app.get(
    '/api/user/twitter/callback',
    authenticate('twitter', {
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
