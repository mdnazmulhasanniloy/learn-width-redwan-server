import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/globalErrorHandler';
import routes from './app/routs';
import httpStatus from 'http-status';
import session from 'express-session';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up express-session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,

    cookie: {
      maxAge: 60000 * 60,
    },
  }),
);

// application routers
app.use('/api/v1/', routes);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(`simple server is running`);
  } catch (error) {
    next(error);
  }
});

//test
app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    res.json({ data });
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
