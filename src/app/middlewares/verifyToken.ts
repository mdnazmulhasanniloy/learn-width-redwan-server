import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import CatchAsync from '../../shared/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req?.files?.backSide?.length);
    await schema.parseAsync({
      body: req.body,
      files: req.files,
      file: req.file,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;
