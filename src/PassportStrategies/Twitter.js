import { isDevMode } from '../Lib/utils.js';
import UserAccessTokenModel from '../Models/UserAccessTokenModel.js';
import UserModel from '../Models/UserModel.js';
import { Strategy } from 'passport-twitter';

//check here for reference => https://www.passportjs.org/packages/passport-twitter/
/**
 *
 * @param {import('passport').PassportStatic} passport
 */
export default function (passport) {
    passport.use(
        new Strategy(
            {
                consumerKey: process.env.TWITTER_CONSUMER_KEY,
                consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
                callbackURL: isDevMode()
                    ? 'http://localhost:5000/auth/twitter/callback'
                    : 'https://tweet-guard-backend.herokuapp.com/auth/twitter/callback', // NOTE: the prod url is not created yet!
                userProfileURL:
                    'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
            },
            async (token, tokenSecret, profile, cb) => {
                try {
                    const userExists = await UserModel.findOne({
                        twitterId: profile.id,
                    }).lean();

                    if (userExists) {
                        return cb(null, userExists);
                    } else {
                        const newUser = await UserModel.create({
                            twitterId: profile.id,
                            twitterUsername: profile.username,
                            twitterProfilePictureSrc: profile.photos[0].value,
                        });

                        await UserAccessTokenModel.create({
                            user: newUser,
                            accessToken: token,
                            accessTokenSecret: tokenSecret,
                        });

                        return cb(
                            null,
                            newUser.toObject({
                                flattenMaps: true,
                            })
                        );
                    }
                } catch (e) {
                    return cb(e);
                }
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
