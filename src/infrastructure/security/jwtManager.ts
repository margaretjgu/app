import * as jwt from 'jsonwebtoken';
import { getSecretValue } from 'src/infrastructure/security/secretsManagerClient';

let cachedSecret: string | undefined;
const getJwtSecret = async (): Promise<string> => {
  if (!cachedSecret) {
    cachedSecret = await getSecretValue('hugo/jwt'); // TODO - save as global env var
  }
  return cachedSecret;
};

export const createToken = async (userId: string): Promise<string> => {
  const secretKey = await getJwtSecret();
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = async (token: string): Promise<string | jwt.JwtPayload> => {
  const secretKey = await getJwtSecret();
  return jwt.verify(token, secretKey);
};