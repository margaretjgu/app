import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3 } from 'aws-sdk';

const s3 = new S3();

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body as string);
    const { username } = body;
    
    const s3Params = {
      Bucket: process.env.IMAGES_BUCKET,
      Key: `${username}/profile-picture`, // Ensure the key is unique per user
      Expires: 60, // Time in seconds before the pre-signed URL expires
      ContentType: 'image/jpeg', // Adjust ContentType based on your needs
      ACL: 'public-read', // Adjust ACL based on your needs
    };
    
    const uploadUrl = await s3.getSignedUrlPromise('putObject', s3Params);

    return {
      statusCode: 200,
      body: JSON.stringify({ uploadUrl }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not generate the pre-signed URL' }),
    };
  }
};
