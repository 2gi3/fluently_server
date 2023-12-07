import jwt from 'jsonwebtoken';
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    console.log({ accessTokenA: accessToken });
    // console.log({ headers: req.headers })
    if (!accessToken) {
        return res.status(401).json({
            error: 'Unauthorized: No access token provided.',
        });
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
        if (error) {
            // if (error.message === "jwt expired") {
            //     const refreshToken = cookies['speaky-refresh-token']
            //     if (!refreshToken) {
            //         return res.status(401).json({ message: 'Access token is expired and there is no valid refresh token in the cookies, Try logging out and logging in again' });
            //     }
            //     try {
            //         const refreshTokenDB = await RefreshToken.findOne({
            //             where: {
            //                 token: refreshToken
            //             }
            //         });
            //         if (!refreshTokenDB) {
            //             return res.status(403).json({ message: 'The access token is expired and the refresh token does not exist in the database.' });
            //         }
            //         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded: { id: number | string }) => {
            //             if (err) {
            //                 return res.status(403).json({ err, message: 'Expired access token and invalid refresh token' });
            //             }
            //             const userId = decoded.id;
            //             const user = await User.findOne({ where: { id: userId } });
            //             if (!user) {
            //                 return res.status(403).json({ message: 'Expired access token and User not found when trying to generate new access token' });
            //             }
            //             const accessToken = generateAccessToken(user);
            //             // res.cookie('speaky-access-token', accessToken, {
            //             //     httpOnly: false,
            //             //     secure: process.env.NODE_ENV === 'production', // Should be true for production
            //             //     sameSite: 'none',
            //             //     domain: 'localhost',
            //             // });
            //             res.setHeader('Authorization', `Bearer ${accessToken}`);
            //             req.userId = decoded.id;
            //             next();
            //         });
            //     } catch (error) {
            //         return res.status(500).json({ error, message: 'Access token expired and Error checking refresh token in the database. Try logging out and logging in again' });
            //     }
            //     // return res.status(403).json({
            //     //     error,
            //     //     message: `The access token is expired, send a GET request to /api/auth/token to refresh the access token`,
            //     // });
            // } else {
            return res.status(403).json({
                error,
                message: 'Unauthorized: Invalid token.',
            });
            // }
        }
        else {
            req.userId = user.id;
            next();
        }
    });
};
export default auth;
//# sourceMappingURL=auth.js.map