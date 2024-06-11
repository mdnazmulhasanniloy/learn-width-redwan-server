import { ErrorRequestHandler } from 'express';
import config from '../config';
import { ZodError } from 'zod';
import { IGenericErrorMessage } from '../interface/error.interface';
import HandleValidationError from '../errors/handelValidation.error';
import handleZodError from '../errors/handleZod.error';
import handleCastError from '../errors/handleCast.error';
import ApiError from '../errors/api.error';

// ErrorHandler.js
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode: number | string = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error.name)
    if (error.name === 'ValidationError') {
      const simplifiedError = HandleValidationError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message || 'Validation Error';
      errorMessages = simplifiedError?.errorMessages || [];
    } else if (error instanceof ZodError) {
      const simplifiedError = handleZodError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message || 'Validation Error';
      errorMessages = simplifiedError?.errorMessages;
    } else if (error.name === 'CastError') {
      const simplifiedError = handleCastError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message || 'Cast Error';
      errorMessages = simplifiedError?.errorMessages;
    } else if (error instanceof ApiError) {
      statusCode = error.statusCode | 500;
      message = error.message || 'Internal Server Error';
      errorMessages = error.message
        ? [
            {
              path: '',
              message: error.message,
            },
          ]
        : [];
    } else if (error instanceof Error) {
      message = error?.message;
      errorMessages = error?.message
        ? [
            {
              path: '',
              message: error?.message,
            },
          ]
        : [];
    }
  const stack = config?.node_env === 'development' ? error.stack : null;
  res.json({
    success: false,
    status: statusCode,
    message: message,
    errorMessages,
    stack,
  });
};

export default ErrorHandler;
