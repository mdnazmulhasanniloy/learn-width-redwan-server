import { Session } from 'express-session';

export type ILoginUser = {
  email: string;
  password: string;
  deviceIdentifier: string;
};

export type IUserSession = {
  user?: {
    id: string | undefined;
    email: string;
  };
} & Session;
