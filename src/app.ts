import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/globalErrorHandler';
import httpStatus from 'http-status';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { enableCors } from './middlewares/enable-cors';
import MongoStore from 'connect-mongo';
import config from './config';
import router from './app/routs';

const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://learn-width-redwan-client.vercel.app',
    ],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: config?.secret_key1 as string,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: config.mongo_uri, // Replace with your MongoDB connection string
      collectionName: 'sessions',
    }),
    cookie: {
      httpOnly: true,
      secure: config.nod_env === 'production', // Use secure cookies in production
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 15,
    },
  }),
);

app.use(enableCors);

app.use('/api/v1/', router);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(`simple server is running`);
  } catch (error) {
    next(error);
  }
});

// Test IPN endpoint
app.post('/ipn', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Received IPN notification:', req.body);
    res.sendStatus(200); // Respond with 200 OK
  } catch (error) {
    next(error);
  }
});

// Route not found
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    success: false,
    message: 'Not Found!',
    errorMessages: [
      {
        path: req?.originalUrl,
        message: `API not found!`,
      },
    ],
  });
});

// Error handling middleware
app.use(ErrorHandler);

export default app;
