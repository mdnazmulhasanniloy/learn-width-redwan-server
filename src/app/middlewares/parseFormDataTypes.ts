// import { NextFunction, Request, Response } from 'express';

// export const parseFormDataTypes = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   Object.entries(req.body).forEach(([key, value]) => {
//     if (value === 'true' || value === 'false') {
//       req.body[key] = Boolean(value);
//     } else if (!isNaN(value)) {
//       req.body[key] = Number(value);
//     }
//   });
//   next();
// };
