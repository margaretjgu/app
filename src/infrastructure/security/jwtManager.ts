import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';

export const createToken = (userId: string): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, secretKey);
};