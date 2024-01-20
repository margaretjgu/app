import { userRepository } from '../domain/repositories/userRepository';
import { createToken } from '../../infrastructure/security/jwtManager';
import { hashPassword } from '../../infrastructure/security/passwordManager';

export const registerUser = async (username: string, email: string, password: string) => {
  // Hash the password
  const hashedPassword = await hashPassword(password);
  
  // Save the user to the repository (DB)
  const userId = await userRepository.createUser(username, email, hashedPassword);

  // Create JWT token
  const token = createToken(userId);

  return token;
};