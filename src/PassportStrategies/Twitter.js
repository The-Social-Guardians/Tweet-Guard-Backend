import { Strategy } from 'passport-twitter';
import UserModel from '../Models/UserModel';
import UserAccessTokenModel from '../Models/UserAccessTokenModel';

function getCurrentDate(){
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

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
               try{
                const userExists = await UserModel.findOne({twitterId: profile.id})

                if(userExists) {
                    return cb(null, userExists.lean())
                } else {
                    const newUser = UserModel.create({
                        twitterInfo: {
                            id: profile.id
                        },
                        registeredAt: getCurrentDate()
                    })

                    UserAccessTokenModel.create({
                        user: newUser,
                        accessToken: token,
                        accessTokenSecret: tokenSecret
                    })
                    return cb(null, newUser.json())
                }
               } catch(e) {
                return cb(error)
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
