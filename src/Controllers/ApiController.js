import { createController } from '../Lib/utils.js';
import InvalidatedJwt from '../Models/InvalidatedJwtModel.js';

const logout = createController((req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    InvalidatedJwt.findOneAndUpdate(
        {
            token,
        },
        {
            user: req.user,
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

export { logout };
