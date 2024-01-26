import { APIGatewayProxyHandler } from 'aws-lambda';
import { userRepository } from 'src/domain/repositories/userRepository';
import { tokenValidator } from 'src/adapters/utils/tokenValidator';

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        // Assuming JWT token will be passed in the auth header
        const token = event.headers.Authorization?.split(' ')[1];
        if (!token) {
          return { statusCode: 401, body: JSON.stringify({ message: 'No token provided' }) };
        }
    
        // Validate token
        const isValidToken = await tokenValidator(token);
        if (!isValidToken) {
          return { statusCode: 401, body: JSON.stringify({ message: 'Invalid or expired token' }) };
        }
    
        // Invalidate token
        await userRepository.invalidateToken(token);
    
        return { statusCode: 200, body: JSON.stringify({ message: 'Logged out successfully' }) };
      } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Internal server error' }) };
      }
};
