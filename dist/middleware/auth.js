import jwt from 'jsonwebtoken';
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({
            error: 'Unauthorized: No token provided.',
        });
    }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(403).json({
                    err,
                    message: 'Unauthorized: Invalid token.',
                });
            }
            else {
                req.userId = user.id;
                next();
            }
        });
    }
};
export default auth;
//# sourceMappingURL=auth.js.map