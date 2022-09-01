import mongoose from 'mongoose';

const { connect: mongooseConnect, connection } = mongoose;

export function connect() {
    if (!process.env.MONGO_URL) {
        throw new Error('Please add the MONGO_URL environment variable');
    }

    mongooseConnect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.on('error', (e) => {
        throw new Error('❌ mongodb connection failed, reason: ' + e.message);
    });
    connection.once('open', () =>
        console.log('✅ mongodb connected successfully')
    );
}
