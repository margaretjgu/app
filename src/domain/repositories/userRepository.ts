// src/domain/repositories/userRepository.ts
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const userRepository = {
  createUser: async (username: string, name: string, email: string, passwordHash: string, userId: string) => {
    const params = {
      TableName: process.env.USERS_TABLE as string,
      Item: { userId, username, name, email, passwordHash },
    };
    await dynamoDb.put(params).promise();
    return userId;
  },

  getUserByEmail: async (email: string) => {
    const params = {
      TableName: process.env.USERS_TABLE as string,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    };
    
    const result = await dynamoDb.query(params).promise();
    
    if (result.Items && result.Items.length > 0) {
      return result.Items[0]; 
    } else {
      return null;
    }
  },
  
  updateName: async (userId: string, newName: string) => {
    const params = {
      TableName: process.env.USERS_TABLE as string,
      Key: { userId },
      UpdateExpression: 'set #name = :newName',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: { ':newName': newName },
      ReturnValues: 'UPDATED_NEW',
    };
    return await dynamoDb.update(params).promise();
  },

  invalidateToken: async (token: string) => {
    const ttl = Math.floor(Date.now() / 1000) + 3600; // JWT has a 1-hour expiration
    const params = {
      TableName: process.env.TOKEN_DENYLIST_TABLE as string,
      Item: { token, ttl },
    };
    await dynamoDb.put(params).promise();
  },

  isTokenInvalidated: async (token: string) => {
    const params = {
      TableName: process.env.TOKEN_DENYLIST_TABLE as string,
      Key: { token },
    };
    const response = await dynamoDb.get(params).promise();
    return !!response.Item;
  },

  deleteAccount: async (userId: string) => {
    const params = {
      TableName: process.env.USERS_TABLE as string,
      Key: { userId },
    };
    return await dynamoDb.delete(params).promise();
  },
  createProfilePicture: async (userId: string, pictureUrl: string) => {
    const params = {
      TableName: process.env.USERS_TABLE as string,
      Key: { userId },
      UpdateExpression: 'set profilePicture = :url',
      ExpressionAttributeValues: {
        ':url': pictureUrl,
      },
    };
    await dynamoDb.update(params).promise();
  },
};
