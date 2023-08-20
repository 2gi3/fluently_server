import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import NewUser from '../../models/user/newuser.js';

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
            device_identifier,
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
            device_identifier,
        });

        await user.save();

        res.status(201).json({
            message: 'New user added successfully!',
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
