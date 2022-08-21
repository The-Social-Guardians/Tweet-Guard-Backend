import mongoose from "mongoose";
const { model, Schema } = mongoose;

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    twitterId: {
        type: String,
        required: true
    },
    twitterUsername: {
        type: String,
        required: true
    },
    twitterName: {
        type: String,
        default: ''
    },
    twitterProfilePictureSrc: {
        type: String,
        default: ''
    },
    securitySettings: {
        /**
         * EXPLANATION: When this option is enabled, any user on the 
         * global ShameList excluding users on ShameWhiteList for this user
         * automatically gets blocked on behalf of this user without the
         * user explicitly blocking
         */
        autoBlockAllShamedUsers: {
            type: Boolean,
            default: true
        },

        /**
         * EXPLANATION: With this feature, the bot uses AI to check if
         * incoming messages contain violating content, and automatically
         * block the sender on the user's behalf.
         */
        interceptMessages: {
            enabled: {
                type: Boolean,
                default: false
            },

            // Additional words that we should consider violating for the user
            badWordsFilter: [String],

            // Words that should be ignored even though they might be violating
            goodWordsFilter: [String]
        }
    },
    registeredAt: {
        type: Date,
        default: Date.now,
    }
});

export default model('User', UserSchema)
