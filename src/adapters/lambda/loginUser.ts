import { APIGatewayProxyHandler } from 'aws-lambda';
import { loginUser } from 'src/application/use_cases/loginUser';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (typeof event.body === 'string') {
      const { email, password } = JSON.parse(event.body);

      if (!email || !password) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Email and password are required' }) };
      }

      const token = await loginUser(email, password);
      return { statusCode: 200, body: JSON.stringify({ token }) };
    } else {
      return { statusCode: 400, body: JSON.stringify({ error: 'Bad request' }) };
    }
  } catch (error) {
    console.error(error);
    return { statusCode: 401, body: JSON.stringify({ error: 'Login failed' }) };
  }
};
