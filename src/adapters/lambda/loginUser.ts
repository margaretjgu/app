import { APIGatewayProxyHandler } from 'aws-lambda';
import { loginUser } from '../../application/use_cases/loginUser';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  try {
    const token = await loginUser(email, password);
    return { statusCode: 200, body: JSON.stringify({ token }) };
  } catch (error) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Login failed' }) };
  }
};
