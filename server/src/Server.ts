import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import { apiRouter } from './routes';
import logger from '@shared/Logger';

const app = express();
const { BAD_REQUEST } = StatusCodes;

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(cors({
        origin: 'http://localhost:3010',
        allowedHeaders: 'Origin, Content-Type, X-Auth-Token',
        methods: '*',
        credentials: true,
    }))
    // app.use(function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "http://localhost:3010");
    //     res.header("Access-Control-Allow-Headers", "*");
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     next();
    // });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', apiRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


// Export express instance
export default app;
