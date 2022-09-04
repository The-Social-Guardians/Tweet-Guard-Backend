import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const ShameListGlobalSchema = new Schema({
    userIds: [
        {
            type: Schema.Types.ObjectId
        }
    ],
    originalReport: {
        type: Schema.Types.ObjectId,
        ref: 'ShameReport',
    },
    blocked: Boolean,
});

export default model('ShameListGlobal', ShameListGlobalSchema);
