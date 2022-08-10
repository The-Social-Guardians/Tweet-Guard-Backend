import { Strategy } from 'passport-twitter';

//check here for reference => https://www.passportjs.org/packages/passport-twitter/
export default function (passport) {
    passport.use(
        new Strategy(
            {
                consumerKey: process.env.TWITTER_CONSUMER_KEY,
                consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
                callbackURL: 'http://localhost:5000/api/user/twitter/callback',
                userProfileURL:
                    'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
            },
            async (token, tokenSecret, profile, cb) => {
                cb(null, profile);
            }
        )
    );

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((obj, cb) => {
        cb(null, obj);
    });
}
