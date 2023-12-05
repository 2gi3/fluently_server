import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/index.js';
import { UserT } from '../types/user.js';
import { parse } from 'cookie';
import RefreshToken from '../models/auth/index.js';
import User from '../models/user/index.js';
import { generateAccessToken } from '../controllers/user/index.js';


const auth: any = (req: CustomRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | void => {
    const cookies = parse(req.headers.cookie || '');

    const accessToken = cookies['speaky-access-token']

    if (!accessToken) {
        return res.status(401).json({
            error: 'Unauthorized: No access token provided.',
        });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (error: any, user: UserT) => {
        console.log('secret', process.env.ACCESS_TOKEN_SECRET)
        console.log('Access Token:', accessToken);
        if (error) {
            console.log('error msg-ALK:' + error.message)
            if (error.message === "jwt expired") {
                const refreshToken = cookies['speaky-refresh-token']

                if (!refreshToken) {
                    return res.status(401).json({ message: 'Access token is expired and there is no valid refresh token in the cookies, Try logging out and logging in again' });
                }
                try {

                    const refreshTokenDB = await RefreshToken.findOne({
                        where: {
                            token: refreshToken
                        }
                    });

                    if (!refreshTokenDB) {
                        return res.status(403).json({ message: 'The access token is expired and the refresh token does not exist in the database.' });
                    }

                    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded: { id: number | string }) => {
                        if (err) {
                            return res.status(403).json({ err, message: 'Expired access token and invalid refresh token' });
                        }

                        const userId = decoded.id;
                        const user = await User.findOne({ where: { id: userId } });

                        if (!user) {
                            return res.status(403).json({ message: 'Expired access token and User not found when trying to generate new access token' });
                        }

                        const accessToken = generateAccessToken(user);
                        res.cookie('speaky-access-token', accessToken, {
                            httpOnly: false,
                            secure: process.env.NODE_ENV === 'production', // Should be true for production
                            sameSite: 'lax', // Required for cross-origin cookies
                            domain: 'localhost',
                        });
                        req.userId = decoded.id;
                        next();


                    });
                } catch (error) {
                    return res.status(500).json({ error, message: 'Access token expired and Error checking refresh token in the database. Try logging out and logging in again' });
                }
                // return res.status(403).json({
                //     error,
                //     message: `The access token is expired, send a GET request to /api/auth/token to refresh the access token`,
                // });
            } else {
                return res.status(403).json({
                    error,
                    message: 'Unauthorized: Invalid token.',
                });
            }
        } else {
            req.userId = user.id;
            next();
        }
    });
};

export default auth;

