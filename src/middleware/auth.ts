import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/index.js';
import { UserT } from '../types/user.js';



const auth: any = (req: CustomRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | void => {
    // if (!req || !req.headers) {
    //     return res.status(400).json({
    //         error: 'Bad Request: Missing or invalid headers in the request.',
    //     });
    // }
    console.log(req.headers)
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).json({
            error: 'Unauthorized: No Authorization header provided.',
        });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized: No token provided.',
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error: any, user: UserT) => {
        if (error) {
            return res.status(403).json({
                error,
                message: 'Unauthorized: Invalid token.',
            });
        }

        req.userId = user.id;
        next();
    });
};

export default auth;

