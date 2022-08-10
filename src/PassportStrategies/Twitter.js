import { Strategy } from 'passport-twitter';
import UserModel from '../Models/UserModel';
import UserAccessTokenModel from '../Models/UserAccessTokenModel';

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
                UserModel.findById({twitterId: profile.id}, (error, user) => {
                    if(error) {
                        UserModel.create({twitterId: profile.id})
                    }
                    cb(null, user)
                })
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
