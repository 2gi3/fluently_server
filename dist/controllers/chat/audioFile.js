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
export const saveAudioFile = async (req, res, next) => {
    console.log({ file: req.file });
    // const { files } = req;
    // if (!files || Object.keys(files).length === 0) {
    //     return res.status(400).send('No audio file uploaded.');
    // }
    // const audioFile = files.audio;
    // const fileSize = audioFile.size;
    // console.log(`Received audio file with size: ${fileSize} bytes`);
    let responseMesage = null;
    let newAudioFileUrl = null;
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file provided.' });
        }
        const audioFile = req.file;
        console.log({ audioFile });
        const s3 = new S3Client({
            credentials: {
                accessKeyId: s3BucketAccessKey,
                secretAccessKey: s3BucketSecretAccessKey
            },
            region: s3BucketRegion
        });
        const audioFileName = `audioFiles/${req.body.userId}-${Date.now()}`;
        const params = {
            ACL: "public-read",
            Bucket: s3BucketName,
            Key: audioFileName,
            Body: audioFile.buffer,
            ContentType: audioFile.mimetype,
        };
        const command = new PutObjectCommand(params);
        try {
            await s3.send(command);
            newAudioFileUrl = `https://${s3BucketName}.s3.${s3BucketRegion}.amazonaws.com/${audioFileName}`;
            responseMesage = 'Audio file saved';
        }
        catch (err) {
            console.error('Error uploading image:', err);
        }
        // Respond with success
        return res.status(200).json({
            audioFileUrl: newAudioFileUrl,
            message: 'Audio file successfully received and saved.'
        });
    }
    catch (error) {
        console.error('Error handling audio file:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
//# sourceMappingURL=audioFile.js.map