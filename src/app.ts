import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/globalErrorHandler';

import httpStatus from 'http-status';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import config from './config';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import router from './app/routs';
import { enableCors } from './middlewares/enable-cors';

dotenv.config();

const app: Application = express();

// CORS configuration
// const corsOptions = {
//   credentials: true,
//   origin: [
//     config.origin.live_origin as string,
//     config.origin.local_origin as string,
//   ],
// };
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
);
//
// app.use(cors(corsOptions));
app.use(enableCors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: config?.secret_key1 as string,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: config.mongo_uri,
      collectionName: 'sessions',
    }),
    cookie: {
      httpOnly: true,
      secure: config.node_env === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 15,
    },
  }),
);

// Define your routes after setting up CORS middleware
app.use('/api/v1/', router);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('simple server is running');
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  console.log('Origin:'.blue, req.headers.origin);
  next();
});

// Test route
app.post('/ipn', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Received IPN notification:', req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// Route not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    success: false,
    message: 'Not Found!',
    errorMessages: [
      {
        path: req?.originalUrl,
        message: 'API not found!',
      },
    ],
  });
  next();
});

// Global error handler middleware
app.use(ErrorHandler);

export default app;
