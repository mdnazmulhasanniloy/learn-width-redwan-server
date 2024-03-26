import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interface/common.interface';
import { IGenericErrorMessage } from '../interface/error.interface';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error?.issues?.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1].toString(), // Convert path to string if it's a number
        message: issue.message,
      };
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
