import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interface/common.interface';
import { IGenericErrorMessage } from '../interface/error.interface';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  //   console.log(error);
  const errors: IGenericErrorMessage[] = error?.issues?.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
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
