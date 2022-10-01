import { config as configEnvVars } from 'dotenv';
import express from 'express';

import {
    HttpException,
    InternalServerException,
} from './src/Exception/index.js';
import { connect as connectToDb } from './src/Lib/Db.js';
import { isDevMode } from './src/Lib/Util.js';
import apiRouter from './src/Routes/api.js';
import authRouter from './src/Routes/auth.js';
import indexRouter from './src/Routes/index.js';

configEnvVars();
connectToDb();

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/', indexRouter());
app.use('/auth', authRouter());
app.use('/api', apiRouter());
app.use((err, req, res, next) => {
    if (!(err instanceof HttpException)) {
        err = new InternalServerException(err);
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
