import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/globalErrorHandler';
import routes from './app/routs';
import httpStatus from 'http-status';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import config from './config';
import { enableCors } from './middlewares/enable-cors';
import MongoStore from 'connect-mongo';

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
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 15,
    },
  }),
);

app.use(enableCors);

app.use('/api/v1/', routes);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(`simple server is running`);
  } catch (error) {
    next(error);
  }
});

//test
app.post('/ipn', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const data = req.body;
    console.log('Received IPN notification:', req.body);
    res.status(200);
  } catch (error) {
    next(error);
  }
});

// rout not found!

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    success: false,
    message: 'Not Found!',
    errorMessages: [
      {
        path: req?.originalUrl,
        message: `Api not found!`,
      },
    ],
  });
  next();
});

//middlewares
app.use(ErrorHandler);

export default app;
