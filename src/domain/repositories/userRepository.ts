import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const userRepository = {
  createUser: async (username: string, email: string, passwordHash: string, userId: string) => {
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
