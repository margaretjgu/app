import { SecretsManager } from 'aws-sdk';

const secretsManager = new SecretsManager();

export const getSecretValue = async (secretId: string): Promise<string> => {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretId }).promise();
    return data.SecretString || '';
  } catch (error) {
    console.error(`Error retrieving secret for secretId ${secretId}: `, error);
    throw new Error('Could not retrieve secret value');
  }
};
