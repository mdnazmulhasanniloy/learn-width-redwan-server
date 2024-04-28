import { Session } from 'express-session';

export type ILoginUser = {
  email: string;
  password: string;
  deviceIdentifier: string | null;
};

export type IUserSession = {
  user?: {
    id: string | undefined;
    email: string;
  };
} & Session;
