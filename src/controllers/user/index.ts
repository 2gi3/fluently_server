import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import NewUser from '../../models/user/newuser.js';
import User from '../../models/user/index.js';
import { UserT } from '../../types/user.js';

export const signup = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {
            email,
            password,
            name,
            nationality,
            country,
            native_language,
            teaching_language,
            learning_language,
        } = req.body;

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

        const createdUser: any = await user.save();

        const token = jwt.sign(
            { id: createdUser.id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // !!!MUST BE TRUE FOR PRODUCTION!!!
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: 'New user added successfully!',
            user: createdUser
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }

};




export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            res.status(401).json({
                error: new Error('User not found!').message,
            });
        } else {
            const valid = await bcrypt.compare(req.body.password, user.password);
            if (!valid) {
                res.status(401).json({
                    error: new Error('Incorrect password!').message,
                });
            } else {

                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET || 'your-secret-key',
                    { expiresIn: '24h' }
                );

                // res.setHeader('Authorization', 'Bearer ' + token);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false, // !!!MUST BE TRUE FOR PRODUCTION!!!
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


    } catch (error) {
        res.status(500).json({
            error: error.message || 'An error occurred',
        });
    }
    //  finally {
    // }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.params.id)
    User.findOne({ where: { id: req.params.id } }).then(

        (user) => {

            user.destroy().then(
                () => {
                    res.status(200).json({
                        message: 'Your account was deleted!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );

        }
    );
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.params.id)
    User.findAll(
        // include{
        //   "userId": "userId",
        //   "learning_language" : 'learning-language'
        // }
    ).then(
        (users) => {
            res.status(200).json(users);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}


export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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

        const updatedUser = await User.update(updatedFields, {
            where: { id: userId },
        });

        if (updatedUser[0] === 1) {
            res.status(200).json({
                message: 'User information updated successfully!',
            });
        } else {
            res.status(404).json({
                error: 'User not found or no fields to update.',
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
