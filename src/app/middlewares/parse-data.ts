import { Request, Response, NextFunction } from 'express';
import CatchAsync from '../../shared/catchAsync';

const parseData = () => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req?.body?.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  });
};
export default parseData;
