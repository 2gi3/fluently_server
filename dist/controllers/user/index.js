import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import NewUser from '../../models/user/newuser.js';
import User from '../../models/user/index.js';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const s3BucketName = process.env.BUCKET_NAME;
const s3BucketRegion = process.env.BUCKET_REGION;
const s3BucketAccessKey = process.env.IAM_ACCESS_KEY;
const s3BucketSecretAccessKey = process.env.IAM_SECRET_ACCESS_KEY;
export const signup = async (req, res, next) => {
    try {
        const { email, password, name, nationality, country, native_language, teaching_language, learning_language, } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = new NewUser({
            email,
            password: hash,
            name,
            nationality,
            country,
            native_language,
            teaching_language,
            learning_language,
        });
        const createdUser = await user.save();
        const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            message: 'New user added successfully!',
            user: createdUser
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            res.status(401).json({
                error: new Error('User not found!').message,
            });
        }
        else {
            const valid = await bcrypt.compare(req.body.password, user.password);
            if (!valid) {
                res.status(401).json({
                    error: new Error('Incorrect password!').message,
                });
            }
            else {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
                // res.setHeader('Authorization', 'Bearer ' + token);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    nationality: user.nationality,
                    country: user.country,
                    native_language: user.native_language,
                    teaching_language: user.teaching_language,
                    learning_language: user.learning_language,
                    description: user.description,
                    age: user.age || null,
                    image: user.image || null,
                    gender: user.gender || null,
                    banned: user.banned || null,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.message || 'An error occurred',
        });
    }
    //  finally {
    // }
};
export const deleteUser = async (req, res, next) => {
    console.log(req.params.id);
    User.findOne({ where: { id: req.params.id } }).then((user) => {
        user.destroy().then(() => {
            res.status(200).json({
                message: 'Your account was deleted!'
            });
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    });
};
export const getAllUsers = async (req, res, next) => {
    console.log(req.params.id);
    User.findAll(
    // include{
    //   "userId": "userId",
    //   "learning_language" : 'learning-language'
    // }
    ).then((users) => {
        res.status(200).json(users);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};
export const updateUser = async (req, res, next) => {
    let responseMesage = null;
    let newImageUrl = null;
    try {
        const userId = req.params.id;
        // These fields should not be updated
        const excludedFields = [
            'nationality',
            'country',
            'native_language',
            'teaching_language',
            'learning_language',
            'gender',
            'age',
        ];
        const updatedFields = Object.keys(req.body).reduce((acc, key) => {
            if (!excludedFields.includes(key)) {
                acc[key] = req.body[key];
            }
            return acc;
        }, {});
        if (updatedFields.hasOwnProperty('imageFile')) {
            const s3 = new S3Client({
                credentials: {
                    accessKeyId: s3BucketAccessKey,
                    secretAccessKey: s3BucketSecretAccessKey
                },
                region: s3BucketRegion
            });
            const base64Image = updatedFields.imageFile.split(',')[1]; // Remove data:image/jpeg;base64, part
            const imageBuffer = Buffer.from(base64Image, 'base64');
            // Determine the file extension based on the content type (e.g., image/jpeg)
            const contentType = req.body.imageFile.split(';')[0].split(':')[1];
            // Check if the image size is less than 100KB (100 * 1024 bytes)
            if (imageBuffer.length <= 100 * 1024) {
                const imageName = `ProfileImage-${userId}-${Date.now()}`;
                const params = {
                    ACL: "public-read",
                    Bucket: s3BucketName,
                    Key: imageName,
                    Body: imageBuffer,
                    ContentType: contentType
                };
                const command = new PutObjectCommand(params);
                try {
                    await s3.send(command);
                    newImageUrl = `https://${s3BucketName}.s3.${s3BucketRegion}.amazonaws.com/${imageName}`;
                    responseMesage = 'User image updated';
                    updatedFields['image'] = newImageUrl;
                }
                catch (err) {
                    console.error('Error uploading image:', err);
                }
                finally {
                    delete updatedFields.imageFile;
                }
            }
            else {
                console.error('Image size exceeds 100KB. Image not uploaded.');
            }
            // await sharp(imageBuffer)
            //     .resize(150, 150)
            //     .webp()
            //     // .jpeg()
            //     .toBuffer()
            //     .then(async (resizedWebPImageBuffer) => {
            //         const params = {
            //             Bucket: s3BucketName,
            //             Key: `ProfileImage-${userId}-${Date.now()}`,
            //             body: resizedWebPImageBuffer
            //         }
            //         const command = new PutObjectCommand(params)
            //         await s3.send(command)
            //         delete updatedFields.imageFile;
            //     })
            //     .catch((err) => {
            //         console.error(err);
            //     });
        }
        const [affectedRows] = await User.update(updatedFields, {
            where: { id: userId },
        });
        if (affectedRows === 1) {
            const updatedUser = await User.findOne({ where: { id: userId } });
            if (!responseMesage || !newImageUrl) {
                res.status(200).json({
                    message: 'User information updated successfully!',
                    updatedUser: updatedUser
                });
            }
            else {
                res.status(200).json({
                    message: responseMesage,
                    image: newImageUrl
                });
            }
        }
        else {
            if (!responseMesage) {
                res.status(404).json({
                    error: 'User not found or no fields to update.',
                });
            }
            else {
                console.log('image updated');
            }
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
//# sourceMappingURL=index.js.map