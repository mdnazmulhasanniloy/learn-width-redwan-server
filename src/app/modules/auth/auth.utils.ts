import jwt, { JwtPayload } from 'jsonwebtoken';

export function generateRandomNumber(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
