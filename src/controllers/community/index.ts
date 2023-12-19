// import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { Op } from 'sequelize';
import { CustomRequest } from '../../types/index.js';
import sequelize from 'sequelize';
import { PostT } from '../../types/community.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sharp from 'sharp';
import NewUser from '../../models/user/newuser.js';
import User from '../../models/user/index.js';
import { UserT } from '../../types/user.js';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Post from '../../models/community/index.js';
import UserPosts from '../../models/community/user_posts.js';
// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const s3BucketName = process.env.BUCKET_NAME
const s3BucketRegion = process.env.BUCKET_REGION
const s3BucketAccessKey = process.env.IAM_ACCESS_KEY
const s3BucketSecretAccessKey = process.env.IAM_SECRET_ACCESS_KEY


export const createPost = async (req: CustomRequest<PostT>, res: Response, next: NextFunction) => {

    console.log({ tst: 'ertyu', img: req.body.image })
    let responseMesage: string | null = null
    let newImageUrl: string | null = null


    if (req.userId != req.body.userId) {
        res.status(403).json({ message: 'You are not authorised to create this Post' });

    } else {

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

                const imageName = `posts/PostImage-user${req.body.userId}-${Date.now()}`
                const params = {
                    ACL: "public-read",
                    Bucket: s3BucketName,
                    Key: imageName,
                    Body: imageBuffer,
                    ContentType: contentType
                }
                const command = new PutObjectCommand(params)

                try {
                    await s3.send(command);
                    newImageUrl = `https://${s3BucketName}.s3.${s3BucketRegion}.amazonaws.com/${imageName}`
                    responseMesage = 'Post image updated'

                } catch (err) {
                    console.error('Error uploading image:', err);
                }


            } else {
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

export const getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'image']
                },
            ],
            order: [
                ['created_at', 'DESC']
            ]
        });


        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const getOnePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'image']
                },
            ],
        });


        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};