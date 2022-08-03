const Strategy = require('passport-twitter').Strategy;

//check here for reference => https://www.passportjs.org/packages/passport-twitter/
module.exports = function (passport) {
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
                console.log(
                    'User Token is ',
                    token,
                    'User Token Secret is ',
                    tokenSecret,
                    ' and user profile info is ',
                    profile
                );
                cb(null, profile);
            }
        )
    );

    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
};
