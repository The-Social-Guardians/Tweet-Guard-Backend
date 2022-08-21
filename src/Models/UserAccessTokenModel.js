import mongoose from "mongoose";
const { model, Schema } = mongoose;

const UserAccessTokenSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    accessToken: {
        type: String,
        required: true
    },
    accessTokenSecret: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: ''
    },
    platform: {
        type: String,
        default: 'twitter' // twitter, facebook, instagram, etc
    },
    obtainedAt: {
        type: Date,
        default: Date.now
    },
    lastRefreshedAt: {
        type: Schema.Types.Mixed, // null | Date
        default: null
    }
});

export default model('UserAccessToken', UserAccessTokenSchema)
