// src/types/express-session.d.ts
import session from 'express-session';

declare module 'express-session' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface SessionData {
    userId?: string | null;
    accessToken?: string | null;
    deviceIdentifier?: string | null;
    refreshToken?: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}

declare module 'express' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}
