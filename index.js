import express from 'express';
import { config } from 'dotenv';
import { connect as connectDb } from './src/Lib/dbConnection.js';

import indexRouter from './src/Routes/index.js'
import authRouter from './src/Routes/auth.js'
import apiRouter from './src/Routes/api.js'

config();
connectDb();

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/', indexRouter())
app.use('/auth', authRouter())
app.use('/api', apiRouter())

app.listen(PORT, () => {
    console.log('Server listening on ', PORT);
});
