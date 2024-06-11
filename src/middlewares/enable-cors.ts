import { NextFunction, Request, Response } from 'express';
import config from '../config';

const allowedOrigins = [config.origin.local_origin, config.origin.live_origin];

export const enableCors = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
};
