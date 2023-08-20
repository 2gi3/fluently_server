import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import database from '../config/db.config.mjs';
// import postRoutes from './routes/posts';
import userRoutes from './routes/user/index.js';
// import userPostsRoutes from './routes/user-posts';

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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/user', userRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/user-posts', userPostsRoutes);

export default app;
