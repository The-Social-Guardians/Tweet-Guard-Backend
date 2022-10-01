import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const InvalidatedJwtSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model('InvalidatedJwt', InvalidatedJwtSchema);
