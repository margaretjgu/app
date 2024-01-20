import { userRepository } from 'src/domain/repositories/userRepository';
import { createToken } from 'src/infrastructure/security/jwtManager';
import { hashPassword } from 'src/infrastructure/security/passwordManager';

export const registerUser = async (username: string, email: string, password: string, userId: string) => {
  // Hash the password
  const hashedPassword = await hashPassword(password);
  
  // Save the user to the repository (DB)
  await userRepository.createUser(username, email, hashedPassword, userId);

  // Create JWT token
  const token = createToken(userId);

  return token;
};