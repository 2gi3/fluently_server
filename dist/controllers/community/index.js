import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import User from '../../models/user/index.js';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Post from '../../models/community/index.js';
import UserPosts from '../../models/community/user_posts.js';
import PostComment from '../../models/community/postComment.js';
import SavedPost from '../../models/community/savedPosts.js';
// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const s3BucketName = process.env.BUCKET_NAME;
const s3BucketRegion = process.env.BUCKET_REGION;
const s3BucketAccessKey = process.env.IAM_ACCESS_KEY;
const s3BucketSecretAccessKey = process.env.IAM_SECRET_ACCESS_KEY;
export const createPost = async (req, res, next) => {
    let responseMesage = null;
    let newImageUrl = null;
    if (req.userId != req.body.userId) {
        res.status(403).json({ message: 'You are not authorised to create this Post' });
    }
    else {
        if (req.body.image) {
            const s3 = new S3Client({
                credentials: {
                    accessKeyId: s3BucketAccessKey,
                    secretAccessKey: s3BucketSecretAccessKey
                },
                region: s3BucketRegion
            });
            const base64Image = req.body.image.split(',')[1]; // Remove data:image/jpeg;base64, part
            const imageBuffer = Buffer.from(base64Image, 'base64');
            // Determine the file extension based on the content type (e.g., image/jpeg)
            const contentType = req.body.image.split(';')[0].split(':')[1];
            if (imageBuffer.length <= 100 * 1024) {
                const imageName = `posts/PostImage-user${req.body.userId}-${Date.now()}`;
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
                    responseMesage = 'Post image updated';
                }
                catch (err) {
                    console.error('Error uploading image:', err);
                }
            }
            else {
                console.error('Image size exceeds 100KB. Image not uploaded.');
            }
        }
        const post = new Post({
            userId: req.body.userId,
            title: req.body.title,
            body: req.body.body,
            image: newImageUrl,
            type: req.body.type,
            topic: req.body.topic,
            status: req.body.status
        });
        const newPost = await post.save();
        await UserPosts.create({ userId: newPost.userId, postId: newPost.id });
        res.status(201).json({
            message: 'New chat created successfully!',
            newPost
        });
    }
};
export const createSavedPost = async (req, res, next) => {
    console.log({ userId: req.body.userId, postId: req.body.postId });
    if (req.userId != req.body.userId) {
        res.status(403).json({ message: 'You are not authorised to save this Post for this user' });
    }
    else {
        try {
            const existingSavedPost = await SavedPost.findOne({
                where: {
                    userId: req.body.userId,
                    postId: req.body.postId
                }
            });
            if (existingSavedPost) {
                await existingSavedPost.destroy();
                const updatedSavedPosts = await SavedPost.findAll({
                    where: {
                        userId: req.body.userId
                    }
                });
                res.status(200).json({
                    message: 'Post removed from saved posts!',
                    savedPosts: updatedSavedPosts
                });
                return;
            }
            const savedPost = await SavedPost.create({ userId: req.body.userId, postId: req.body.postId });
            const updatedSavedPosts = await SavedPost.findAll({
                where: {
                    userId: req.body.userId
                }
            });
            res.status(201).json({
                message: 'Post saved successfully!',
                savedPosts: updatedSavedPosts
            });
            return;
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
            });
        }
    }
};
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'image'],
                },
                {
                    model: PostComment,
                    as: 'comments',
                    attributes: ['id', 'userId', 'postId', 'body'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['name', 'image']
                        }
                    ]
                }
            ],
            order: [
                ['created_at', 'DESC']
            ]
        });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
export const getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'image']
                },
                {
                    model: PostComment,
                    as: 'comments',
                    attributes: ['id', 'userId', 'postId', 'body'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['name', 'image']
                        }
                    ]
                }
            ],
        });
        res.status(200).json(post);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
export const deleteSavedPost = async (req, res, next) => {
    if (req.userId != req.params.userId) {
        res.status(403).json({ message: 'You are not authorised to unsave this post' });
    }
    else {
        try {
            const userId = req.params.userId;
            const postId = req.params.postId;
            const savedPost = await SavedPost.findOne({
                where: { userId, postId }
            });
            if (!savedPost) {
                return res.status(404).json({
                    message: 'Saved post not found!'
                });
            }
            await savedPost.destroy();
            res.status(200).json({
                message: 'Post unsaved successfully!'
            });
        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
};
export const getSavedPosts = async (req, res, next) => {
    if (req.userId != req.params.userId) {
        res.status(403).json({ message: 'You are not authorised to access this list' });
    }
    else {
        try {
            const savedPosts = await SavedPost.findAll({
                where: { userid: req.params.userId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['name', 'image']
                    },
                    {
                        model: Post,
                        as: 'post',
                        attributes: ['title', 'type']
                    }
                ]
            });
            res.status(200).json(savedPosts);
        }
        catch (error) {
            res.status(400).json({
                error: error.message,
            });
        }
    }
};
//# sourceMappingURL=index.js.map