import mongoose from "mongoose";
const { model, Schema } = mongoose;

const ShameListSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    shamedUserId: {
        type: String,
        required: true
    },
    shamedAt: {
        type: Date,
        default: Date.now
    },
    originalReport: {
        type: Schema.Types.ObjectId,
        ref: 'ShameReport'
    }
});

export default model('ShameList', ShameListSchema)
