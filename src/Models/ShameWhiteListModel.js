import mongoose from "mongoose";
const { model, Schema } = mongoose;

const ShameWhiteListSchema = new Schema({
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
