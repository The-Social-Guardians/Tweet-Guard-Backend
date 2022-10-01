import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserModel as User } from '../Model/index.js';

/**
 *
 * @param {import('passport').PassportStatic} passport
 */
export default function (passport) {
    passport.use(
        new Strategy(
            {
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            },
            async (payload, done) => {
                try {
                    const user = await User.findOne({
                        _id: payload.user.id,
                    });

                    if (!user) {
                        return done(new Error('User does not exist'), null);
                    }

                    return done(null, user.toObject());
                } catch (e) {
                    done(e, null);
                }
            }
        )
    );
}
