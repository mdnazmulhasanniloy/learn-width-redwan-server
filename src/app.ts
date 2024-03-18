import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/globalErrorHandler';
import routes from './app/routs';
import httpStatus from 'http-status';
import session from 'express-session';
// import {
//   generateAdminId,
//   generateFacultyId,
//   generateStudentId,
// } from './app/modules/user/user.utils';

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

// app.use(
//   session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 60000 * 60,
//     },
//   }),
// );

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
  // console.log(x)
  try {
    // const academicSemester: { year: string; code: string } = {
    //   year: '2014',
    //   code: '01',
    // };
    // const s = await generateStudentId(academicSemester);
    // const f = await generateFacultyId(academicSemester);
    // const a = await generateAdminId(academicSemester);
    // res.send({ s, f, a });
  } catch (error) {
    next(error);
  }
});

// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(404, ``);
// });

//middlewares
app.use(ErrorHandler);

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

export default app;
