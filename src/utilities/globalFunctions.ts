
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const s3BucketName = process.env.BUCKET_NAME
const s3BucketRegion = process.env.BUCKET_REGION
const s3BucketAccessKey = process.env.IAM_ACCESS_KEY
const s3BucketSecretAccessKey = process.env.IAM_SECRET_ACCESS_KEY

export const deleteImageFromS3 = async (imageUrl: string) => {


    const s3 = new S3Client({
        credentials: {
            accessKeyId: s3BucketAccessKey,
            secretAccessKey: s3BucketSecretAccessKey
        },
        region: s3BucketRegion
    });

    const urlParts = imageUrl.split('/');

    // image in the root
    // This will give you "ProfileImage-58-1703031302900" from the example URL
    // const key = decodeURIComponent(urlParts[urlParts.length - 1]);

    // image in a folder
    // This will give you "profileImages/ProfileImage-58-1703031302900" from the example URL
    const key = urlParts.slice(3).join('/');

    const params = {
        Bucket: s3BucketName,
        Key: key
    };

    try {
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        console.log(`Successfully deleted ${key} from ${s3BucketName}`);
    } catch (error) {
        console.error(`Error deleting ${key} from ${s3BucketName}:`, error);
    }
};

