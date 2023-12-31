import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import NewUser from '../../models/user/newuser.js';
import User from '../../models/user/index.js';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import RefreshToken from '../../models/auth/index.js';
import Message from '../../models/chat/message.js';
import UsersChats from '../../models/chat/users_chats.js';
import Chatroom from '../../models/chat/index.js';
import { Op } from 'sequelize';
import Post from '../../models/community/index.js';
import UserPosts from '../../models/community/user_posts.js';
import { deleteImageFromS3 } from '../../utilities/globalFunctions.js';
import SavedPost from '../../models/community/savedPosts.js';
// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const s3BucketName = process.env.BUCKET_NAME;
const s3BucketRegion = process.env.BUCKET_REGION;
const s3BucketAccessKey = process.env.IAM_ACCESS_KEY;
const s3BucketSecretAccessKey = process.env.IAM_SECRET_ACCESS_KEY;
export const generateAccessToken = (user, expiresIn = '1h') => {
    return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
};
export const signup = async (req, res, next) => {
    const { email, password, name, nationality, country, native_language, teaching_language, learning_language, } = req.body;
    const userDB = await User.findOne({ where: { email: email } });
    if (userDB) {
        return res.status(409).json({
            message: 'This account already exists, please Log In',
        });
    }
    try {
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
        const accessToken = generateAccessToken(createdUser);
        const refreshToken = jwt.sign({ id: createdUser.id }, process.env.REFRESH_TOKEN_SECRET);
        await RefreshToken.create({ token: refreshToken });
        // res.cookie('speaky-access-token', accessToken, {
        //     httpOnly: false,
        //     secure: process.env.NODE_ENV === 'production', // Should be true for production
        //     sameSite: 'none',
        //     domain: 'localhost',
        // });
        // res.cookie('speaky-refresh-token', refreshToken, {
        //     httpOnly: false,
        //     secure: process.env.NODE_ENV === 'production', // Should be true for production
        //     sameSite: 'none',
        //     domain: 'localhost',
        // });
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.status(201).json({
            message: 'New user added successfully!',
            user: createdUser,
            // accessToken,
            refreshToken
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
        const user = await User.findOne({
            where: { email: req.body.email }
        });
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
                const accessToken = generateAccessToken(user);
                const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET);
                await RefreshToken.create({ token: refreshToken });
                // res.cookie('speaky-access-token', token, {
                //     httpOnly: false,
                //     secure: process.env.NODE_ENV === 'production', // Should be true for production
                //     sameSite: 'none', // Required for cross-origin cookies
                //     domain: 'localhost',
                // });
                // res.cookie('speaky-refresh-token', refreshToken, {
                //     httpOnly: false,
                //     secure: process.env.NODE_ENV === 'production', // Should be true for production
                //     sameSite: 'lax', // Required for cross-origin cookies
                //     domain: 'localhost',
                // });
                res.setHeader('Authorization', `Bearer ${accessToken}`);
                const savedPosts = await SavedPost.findAll({
                    where: { userid: user.id },
                    include: [
                        {
                            model: Post,
                            as: 'post',
                            attributes: ['title', 'type']
                        }
                    ]
                });
                const posts = await Post.findAll({
                    where: { userId: user.id },
                });
                res.status(200).json({
                    savedPosts,
                    posts,
                    user: {
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
                    },
                    refreshToken
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
// To test delete user:
// Query the database to see a count of everything associate witht he user
// Change the user id before using
// SELECT 
//     (SELECT COUNT(*) FROM users WHERE id = 58) AS user_count,
//     (SELECT COUNT(*) FROM messages WHERE userId = 58) AS message_count,
//     (SELECT COUNT(*) FROM users_chats WHERE user_id = 58) AS users_chats_count,
//     (SELECT COUNT(*) FROM chatrooms WHERE user1Id = 58 OR user2Id = 58) AS chatrooms_count,
//     (SELECT COUNT(*) FROM posts WHERE userId = 58) AS posts_count,
//     (SELECT COUNT(*) FROM user_posts WHERE userId = 58) AS user_posts_count;
export const deleteUser = async (req, res, next) => {
    if (req.params.id != req.userId) {
        res.status(403).json({ message: 'You are not authorised to delete this user' });
        return;
    }
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (user.image) {
            deleteImageFromS3(user.image);
        }
        const userPosts = await Post.findAll({ where: { userId: user.id } });
        for (const post of userPosts) {
            if (post.image) {
                deleteImageFromS3(post.image);
            }
        }
        const chatrooms = await Chatroom.findAll({
            where: {
                [Op.or]: [
                    { user1Id: user.id },
                    { user2Id: user.id }
                ]
            }
        });
        if (chatrooms) {
            for (const chatroom of chatrooms) {
                await Message.destroy({ where: { chatId: chatroom.id } });
                await UsersChats.destroy({ where: { chat_id: chatroom.id } });
            }
        }
        await Chatroom.destroy({
            where: {
                [Op.or]: [
                    { user1Id: user.id },
                    { user2Id: user.id }
                ]
            }
        });
        await UserPosts.destroy({ where: { userId: user.id } });
        await Post.destroy({ where: { userId: user.id } });
        await user.destroy();
        res.status(200).json({
            message: 'Your account was deleted!'
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};
export const getAllUsers = async (req, res, next) => {
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
export const getOneUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: Post,
                    as: 'Posts',
                    attributes: ['id', 'title'],
                }
            ]
        });
        if (user) {
            if (req.params.id == req.userId) {
                const savedPosts = await SavedPost.findAll({
                    where: { userid: req.params.id },
                    include: [
                        {
                            model: Post,
                            as: 'post',
                            attributes: ['title', 'type']
                        }
                    ]
                });
                // const postIds = savedPosts.map(post => post.postId);
                user.setDataValue('savedPosts', savedPosts);
            }
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateUser = async (req, res, next) => {
    let responseMesage = null;
    let newImageUrl = null;
    if (req.params.id != req.userId) {
        res.status(403).json({ message: 'You are not authorised to update this user' });
    }
    else {
        try {
            const userId = req.params.id;
            // These fields should not be updated
            const excludedFields = [
                'nationality',
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
            if (updatedFields.hasOwnProperty('image')) {
                const s3 = new S3Client({
                    credentials: {
                        accessKeyId: s3BucketAccessKey,
                        secretAccessKey: s3BucketSecretAccessKey
                    },
                    region: s3BucketRegion
                });
                const base64Image = updatedFields.image.split(',')[1]; // Remove data:image/jpeg;base64, part
                const imageBuffer = Buffer.from(base64Image, 'base64');
                // Determine the file extension based on the content type (e.g., image/jpeg)
                const contentType = req.body.image.split(';')[0].split(':')[1];
                // Check if the image size is less than 100KB (100 * 1024 bytes)
                if (imageBuffer.length <= 100 * 1024) {
                    const imageName = `profileImages/ProfileImage-${userId}-${Date.now()}`;
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
                        // delete updatedFields.image;
                    }
                }
                else {
                    console.error('Image size exceeds 100KB. Image not uploaded.');
                }
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
    }
};
export const checkUserExistence = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.params.email } });
        if (user) {
            res.status(200).json({ exists: true });
        }
        else {
            res.status(200).json({ exists: false });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=index.js.map