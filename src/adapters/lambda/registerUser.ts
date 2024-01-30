import { APIGatewayProxyHandler } from 'aws-lambda';
import { registerUser } from '../../application/use_cases/registerUser';
import { v4 as uuidv4 } from 'uuid';

export const handler: APIGatewayProxyHandler = async (event) => {
  if (typeof event.body !== 'string') {
    return { statusCode: 400, body: JSON.stringify({ error: 'Request body must be a valid JSON string' }) };
  }

  const { username, name, email, password } = JSON.parse(event.body);

  if (!username || !email || !password || !name) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  try {
    const userId = uuidv4();
    const token = await registerUser(username, name, email, password, userId);
    return { statusCode: 200, body: JSON.stringify({ token, userId }) };
  } catch (error) {
    if (error instanceof Error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
    return { statusCode: 500, body: JSON.stringify({ error: 'An unknown error occurred' }) };
  }
};
