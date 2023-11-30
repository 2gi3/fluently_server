import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { parse } from 'cookie';
import RefreshToken from '../../models/auth/index.js';
import User from '../../models/user/index.js';
import { generateAccessToken } from '../user/index.js';



// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

export const createAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const cookies = parse(req.headers.cookie || '');
    console.log({ cookies })
    console.log({ refToken: cookies['speaky-refresh-token'] })
    const refreshToken = cookies['speaky-refresh-token']

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not provided' });
    }

    try {
        const refreshTokenDB = await RefreshToken.findOne({
            where: {
                token: refreshToken
            }
        });

        if (!refreshTokenDB) {
            console.log('Token does not exist in the database.');
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded: { id: number | string }) => {
            if (err) {
                console.error('Error verifying refresh token:', err);
                return res.status(403).json({ err, message: 'Invalid refresh token' });
            }

            const userId = decoded.id;
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                console.log('User not found.');
                return res.status(403).json({ message: 'User not found' });
            }

            const accessToken = generateAccessToken(user);
            res.setHeader('Authorization', 'Bearer ' + accessToken);

            return res.status(200).json({
                message: 'New access token created successfully!'
            });
        });
    } catch (error) {
        console.error('Error checking token in the database:', error);
        return res.status(500).json({ error, message: 'Internal server error' });
    }
}
