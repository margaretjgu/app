import { APIGatewayProxyHandler } from 'aws-lambda';
import { registerUser } from 'src/application/use_cases/registerUser';
import { v4 as uuidv4 } from 'uuid';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { username, name, email, password } = JSON.parse(event.body);
  // Input validation logic (pseudo code)
  if (!username || !email || !password || !name) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  try {
    const userId = uuidv4(); 
    const token = await registerUser(username, name, email, password, userId); 
    return { statusCode: 200, body: JSON.stringify({ username, token }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
