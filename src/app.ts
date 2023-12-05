import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import database from '../config/db.config.mjs';
import userRoutes from './routes/user/index.js';
import chatRoutes from './routes/chat/index.js';
import authRoutes from './routes/auth/index.js';
import { parse } from 'cookie';
import cors from 'cors';

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });



const app = express();

database.authenticate()
    .then(() => console.log("Database Connected!"))
    .catch((err: Error) => console.log(err));

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors({
    exposedHeaders: ['Ratelimit-Remaining'],
}));
app.use((req, res, next) => {
    console.log('Request Origin:', req.get('Origin'));
    console.log({ authHeader: req.headers['authorization'] })
    console.log({ AuthHeader: req.headers['Authorization'] })
    console.log({ Header: req.headers })
    const cookies = parse(req.headers.cookie || '');


    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
export default app;
