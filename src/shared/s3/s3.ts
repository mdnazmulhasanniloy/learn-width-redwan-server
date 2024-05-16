import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import config from '../../config';
import ApiError from '../../errors/api.error';
import httpStatus from 'http-status';
import { s3Client } from '../../constants/aws';

export const uploadToS3 = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { file, fileName }: { file: any; fileName: string },
): Promise<string | null> => {
  const command = new PutObjectCommand({
    Bucket: config.aws.bucket,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    const key = await s3Client.send(command);
    if (!key) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'File Upload failed');
    }

    const url = `https://${config.aws.bucket}.s3.${config.aws.region}.amazonaws.com/${fileName}`;
    return url;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'File Upload failed');
  }
};

//delete file from s3 bucket

export const deleteFromS3 = async (key: string) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: config.aws.bucket,
      Key: key,
    });
    await s3Client.send(command);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 's3 file delete failed');
  }
};
