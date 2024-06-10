import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { CourseT, LessonT, UnitT } from '../../types/learning.js';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { CustomRequest } from '../../types/index.js';
import Course from '../../models/learn/course.js';
import CourseUnit from '../../models/learn/unit.js';
import Lesson from '../../models/learn/lesson.js';


// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const s3BucketName = process.env.BUCKET_NAME
const s3BucketRegion = process.env.BUCKET_REGION
const s3BucketAccessKey = process.env.IAM_ACCESS_KEY
const s3BucketSecretAccessKey = process.env.IAM_SECRET_ACCESS_KEY



export const getAllCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const courses = await Course.findAll({
            include: [
                {
                    model: CourseUnit,
                    as: 'units',
                    required: false,
                    include: [
                        {
                            model: Lesson,
                            as: 'lessons',
                            required: false
                        }
                    ]
                }
            ]
        });

        if (!courses || courses.length === 0) {
            res.status(404).json({ message: 'No courses found' });
            return;
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const createCourse = async (req: CustomRequest<CourseT>, res: Response, next: NextFunction): Promise<void> => {

    if (req.userId != req.body.creatorId) {
        res.status(403).json({ message: 'You are not authorised to create this Course' });
        return;
    }

    let responseMesage: string | null = null
    let newImageUrl: string | null = null

    const {
        id,
        creatorId,
        mediumLanguage,
        learningLanguage,
        title,
        subheading,
        introductionMD,
        goalsMD,
        requirementsMD,
        videoUrl,
        imageUrl,
        level,
        created_at,
    } = req.body as {
        id: CourseT['id'];
        creatorId: CourseT['creatorId'];
        mediumLanguage: CourseT['mediumLanguage'];
        learningLanguage: CourseT['learningLanguage'];
        title: CourseT['title'];
        subheading: CourseT['subheading'];
        introductionMD: CourseT['introductionMD'];
        goalsMD: CourseT['goalsMD'];
        requirementsMD: CourseT['requirementsMD'];
        videoUrl: CourseT['videoUrl'];
        imageUrl: CourseT['imageUrl'];
        level: CourseT['level'];
        created_at: CourseT['created_at'];
    };

    if (imageUrl.length > 15) {
        const s3 = new S3Client({
            credentials: {
                accessKeyId: s3BucketAccessKey,
                secretAccessKey: s3BucketSecretAccessKey
            },
            region: s3BucketRegion
        });

        const base64Image = imageUrl.split(',')[1]; // Remove data:image/jpeg;base64, part
        const imageBuffer = Buffer.from(base64Image, 'base64');

        // Determine the file extension based on the content type (e.g., image/jpeg)
        const contentType = imageUrl.split(';')[0].split(':')[1];

        if (imageBuffer.length <= 100 * 1024) {

            const imageName = `courses/CourseImage-c${id}`
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
                responseMesage = 'Course image updated'

            } catch (err) {
                console.error('Error uploading image:', err);
            }


        } else {
            console.error('Image size exceeds 100KB. Image not uploaded.');
        }

    }

    const updatedBody = {
        ...req.body,
        imageUrl: newImageUrl
    };

    const course = new Course(updatedBody
    )
    const newCourse = await course.save()

    console.log({ updatedBody });

    res.status(201).json({
        message: 'New course created successfully!',
        newCourse
    });
}

export const createUnit = async (req: CustomRequest<UnitT>, res: Response): Promise<void> => {

    console.log(req.body)
    // if (req.userId != req.body.userId) {
    //     res.status(403).json({ message: 'You are not authorised to create this Post' });

    // } else {
    const courseUnit = new CourseUnit({
        id: req.body.id,
        courseId: req.body.courseId,
        title: req.body.title,
        type: req.body.type,
    });
    const newCourseUnit = await courseUnit.save();
    // await PostComments.create({ postId: newPostComment.postId, commentId: newPostComment.id });

    res.status(201).json({
        message: 'New courseUnit created successfully!',
        newCourseUnit
    });

}

export const createLesson = async (req: CustomRequest<LessonT>, res: Response): Promise<void> => {

    console.log(req.body)

    // if (req.userId != req.body.userId) {
    //     res.status(403).json({ message: 'You are not authorised to create this Post' });

    // } else {
    const lesson = new Lesson({
        id: req.body.id,
        userId: req.body.userId,
        courseId: req.body.courseId,
        unitId: req.body.unitId,
        title: req.body.title,
        videoUrl: req.body.videoUrl,
    });
    const newLesson = await lesson.save();

    res.status(201).json({
        message: 'New lesson created successfully!',
        newLesson
    });

}