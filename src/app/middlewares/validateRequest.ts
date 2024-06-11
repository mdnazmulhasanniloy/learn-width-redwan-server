import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        file: req.file,
        files: req.files,
        body: req?.body,
        query: req?.query,
        params: req?.params,
        cookies: req?.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
