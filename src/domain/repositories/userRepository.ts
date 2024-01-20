import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();

export const userRepository = {
  createUser: async (username: string, email: string, passwordHash: string) => {
    const userId = uuidv4(); 
    const params = {
      TableName: process.env.USERS_TABLE,
      Item: { userId, username, email, passwordHash },
    };
    await dynamoDb.put(params).promise();
    return userId;
  },
  getUserByEmail: async (email: string) => {
    const params = {
      TableName: process.env.USERS_TABLE,
      IndexName: 'EmailIndex', // Make sure to create this index in DynamoDB
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    };
    const result = await dynamoDb.query(params).promise();
    return result.Items[0];
  },
};
