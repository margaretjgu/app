import { userRepository } from 'src/domain/repositories/userRepository';
import { createToken } from 'src/infrastructure/security/jwtManager';
import { hashPassword, verifyPassword } from 'src/infrastructure/security/passwordManager';

export const registerUser = async (username: string, email: string, password: string, userId: string) => {
  const existingUser = await userRepository.getUserByEmail(email);

  if (existingUser) {
    // If user exists, verify the provided password
    const passwordIsValid = await verifyPassword(password, existingUser.passwordHash);
    if (!passwordIsValid) {
      throw new Error('Invalid password');
    }

    // If password is valid, log the user in by generating a JWT token
    const token = createToken(existingUser.userId);
    return { userId: existingUser.userId, token };
  } else {
    // If user does not exist, create a new user
    const hashedPassword = await hashPassword(password);
    await userRepository.createUser(username, email, hashedPassword, userId);

    // Create JWT token
    const token = createToken(userId);
    return { userId, token };
  }
};