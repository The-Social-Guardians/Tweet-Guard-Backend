import { model, Schema } from "mongoose";

const ShameWhiteListSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    trustedUserId: {
        type: String,
        required: true
    },
    trustedAt: {
        type: Date,
        default: Date.now
    }
});

export default model('ShameWhiteList', ShameWhiteListSchema)
