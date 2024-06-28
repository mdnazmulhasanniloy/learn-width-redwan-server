// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/consistent-type-definitions */
// // src/types/express-session.d.ts
// import session from 'express-session';

// declare module 'express-session' {
//   // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
//   interface SessionData {
//     userId?: string | null;
//     accessToken?: string | null;
//     deviceIdentifier?: string | null;
//     refreshToken?: string | null;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     [key: string]: any;
//   }
// }

// declare module 'express' {
//   // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
//   interface Request {
//     session: session.Session & Partial<session.SessionData>;
//   }
// }

// import session from 'express-session';
// import { Request } from 'express';
// declare module 'express-session' {
//   interface SessionData {
//     userId?: string | null;
//     accessToken?: string | null;
//     deviceIdentifier?: string | null;
//     [key: string]: any;
//   }
// }

// interface CustomSession extends session.SessionData {
//   userId?: string | null;
//   accessToken?: string | null;
//   deviceIdentifier?: string | null;
//   [key: string]: any;
// }

// export interface CustomRequest extends Request {
//   session: CustomSession;
// }
