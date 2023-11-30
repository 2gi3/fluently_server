import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/index.js';
import { UserT } from '../types/user.js';



const auth: any = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).json({
            error: 'Unauthorized: No token provided.',
        });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: UserT) => {
            if (err) {
                res.status(403).json({
                    err,
                    message: 'Unauthorized: Invalid token.',
                });
            } else {
                req.userId = user.id;
                next();
            }
        });
    }
};

export default auth;
