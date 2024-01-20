import { userRepository } from 'src/domain/repositories/userRepository';
import { createToken } from 'src/infrastructure/security/jwtManager';
import { verifyPassword } from 'src/infrastructure/security/passwordManager';

export const loginUser = async (email: string, password: string) => {
  // Retrieve the user from the repository (DB)
  const user = await userRepository.getUserByEmail(email);
  
  // Verify the password
  const passwordIsValid = await verifyPassword(password, user.passwordHash);
  if (!passwordIsValid) {
    throw new Error('Invalid credentials');
  }

  // Create JWT token
  const token = createToken(user.userId);

  return token;
};