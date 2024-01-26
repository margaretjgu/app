import { userRepository } from 'src/domain/repositories/userRepository';
import { verifyToken } from 'src/infrastructure/security/jwtManager';

export const tokenValidator = async (token: string): Promise<boolean> => {
  try {
    // Verify JWT
    const decoded = await verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return false;
    }

    // Check if the token is invalidated
    const isInvalidated = await userRepository.isTokenInvalidated(token);
    return !isInvalidated;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};
