import mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import color from 'colors';
import { IGenericErrorResponse } from '../interface/common.interface';
import { IGenericErrorMessage } from '../interface/error.interface';
const HandleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );
  const statusCode = 400;
  // Create an IGenericErrorResponse with an array of error messages
  // const response: IGenericErrorResponse =

  // Do something with the response object, or return it if needed
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default HandleValidationError;
