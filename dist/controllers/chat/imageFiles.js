import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });
// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });
// const timestamp = new Date().getTime();
const s3BucketName = process.env.BUCKET_NAME;
const s3BucketRegion = process.env.BUCKET_REGION;
const s3BucketAccessKey = process.env.IAM_ACCESS_KEY;
const s3BucketSecretAccessKey = process.env.IAM_SECRET_ACCESS_KEY;
export const saveImageFiles = async (req, res, next) => {
    try {
        if (!req.files) {
            return res.status(400).json({ error: 'No audio file provided.' });
        }
        const { files, body } = req;
        const s3 = new S3Client({
            credentials: {
                accessKeyId: s3BucketAccessKey,
                secretAccessKey: s3BucketSecretAccessKey
            },
            region: s3BucketRegion
        });
        const imageUrls = await Promise.all(files.map(async (file, index) => {
            let imageUrl;
            const params = {
                ACL: "public-read",
                Bucket: s3BucketName,
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            const command = new PutObjectCommand(params);
            try {
                await s3.send(command);
                imageUrl = `https://${s3BucketName}.s3.${s3BucketRegion}.amazonaws.com/${file.originalname}`;
            }
            catch (err) {
                console.error('Error uploading image:', err);
            }
            return imageUrl;
        }));
        return res.status(200).json({
            imageUrls,
            message: 'Images successfully received and saved.'
        });
    }
    catch (error) {
        console.error('Error handling image files:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
//# sourceMappingURL=imageFiles.js.map