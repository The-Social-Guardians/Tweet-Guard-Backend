import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const ShameReportSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    shamedUserId: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true, // The user must state the reason for reporting. This could be a list at frontend
    },
    // Could be uploaded to a CDN or something.
    proofPictureSrc: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 'verification_pending', // verification_pending, verification_success, verification_failed, rejected(worst case)
    },
});

export default model('ShameReport', ShameReportSchema);
