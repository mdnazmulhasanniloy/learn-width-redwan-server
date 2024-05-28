import { IGenericErrorMessage } from './error.interface';

export type IGenericErrorResponse = {
  statusCode: number | string;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type IGenericResponse<T> = {
  meta?: IMeta;
  data: T;
};

export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: IMeta;
  data?: T | null;
};

export type IPaginationOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type IFilter = {
  searchTerm?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

declare module 'express' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Request {
    session?: {
      userId?: string | null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    } | null;
  }
}
