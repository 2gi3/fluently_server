import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import NewUser from '../../models/user/newuser.js';
import User from '../../models/user/index.js';
export const signup = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    try {
        const { email, password, name, nationality, country, native_language, teaching_language, learning_language, } = req.body;
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
        await user.save();
        res.status(201).json({
            message: 'New user added successfully!',
            user
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            res.status(401).json({
                error: new Error('User not found!').message,
            });
        }
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            res.status(401).json({
                error: new Error('Incorrect password!').message,
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        res.setHeader('Authorization', 'Bearer ' + token);
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
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
    catch (error) {
        res.status(500).json({
            error: error.message || 'An error occurred',
        });
    }
    //  finally {
    // }
};
//# sourceMappingURL=index.js.map