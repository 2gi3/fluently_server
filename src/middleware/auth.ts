import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/index.js';
import { UserT } from '../types/user.js';
import { parse } from 'cookie';
import RefreshToken from '../models/auth/index.js';
import User from '../models/user/index.js';
import { generateAccessToken } from '../controllers/user/index.js';



const auth: any = (req: CustomRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | void => {

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

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error: any, user: UserT) => {
        if (error) {
            console.log('error msg:' + error.message)
            if (error.message === "jwt expired") {
                const cookies = parse(req.headers.cookie || '');
                console.log({ cookies })
                console.log({ refToken: cookies['speaky-refresh-token'] })
                const refreshToken = cookies['speaky-refresh-token']

                if (!refreshToken) {
                    return res.status(401).json({ message: 'Access token is expired and there is no refresh token in the cookies, Try logging out and logging in again' });
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
                        console.log({ decodedId: decoded.id })
                        const user = await User.findOne({ where: { id: userId } });

                        if (!user) {
                            console.log('User not found.');
                            return res.status(403).json({ message: 'Expired access token and User not found when trying to generate new access token' });
                        }

                        const accessToken = generateAccessToken(user);
                        res.setHeader('Authorization', 'Bearer ' + accessToken);
                        console.log({ user })
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
            console.log({ helloUser: user })
            req.userId = user.id;
            next();
        }
    });
};

export default auth;

