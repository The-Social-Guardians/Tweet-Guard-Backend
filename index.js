import HttpException from './src/Exceptions/HttpException.js';
import InternalServerException from './src/Exceptions/InternalServerException.js';
import { connect as connectDb } from './src/Lib/dbConnection.js';
import { isDevMode } from './src/Lib/utils.js';
import apiRouter from './src/Routes/api.js';
import authRouter from './src/Routes/auth.js';
import indexRouter from './src/Routes/index.js';
import { config } from 'dotenv';
import express from 'express';

config();
connectDb();

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/', indexRouter());
app.use('/auth', authRouter());
app.use('/api', apiRouter());
app.use((err, req, res, next) => {
    if (!(err instanceof HttpException)) {
        throw new InternalServerException(err);
    }

    const response =
        typeof err.getMessage() == 'object' && err.getMessage() !== null
            ? err.getMessage()
            : {
                  message: err.getMessage(),
              };

    if (isDevMode()) {
        response.stack = err.stack;
        response.name = err.name;
    }

    res.status(err.getCode()).json(response);
});

app.listen(PORT, () => {
    console.log('Server listening on ', PORT);
});
