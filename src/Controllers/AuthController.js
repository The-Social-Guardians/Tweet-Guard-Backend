import passport from "passport";
import { isDevMode } from "../Lib/utils.js";

const twitterAuth = passport.authenticate('twitter');

//this callback is called automatically after auth : reference => https://www.passportjs.org/packages/passport-twitter/
const twitterAuthCallback = passport.authenticate('twitter', {
    assignProperty: 'federatedUser',
    failureRedirect: 'http://localhost:5000/failure', // auth failure redirect,
    successRedirect: isDevMode() ? 'http://localhost:5000/success' : 'https://tweet-guard-frontend.vercel.app', //auth success redirect
})

export {
    twitterAuth,
    twitterAuthCallback
}
