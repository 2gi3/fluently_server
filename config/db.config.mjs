// import { Sequelize } from 'sequelize';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });


const connectionUri = `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PWD}@${process.env.DATABASE_HOST}/${process.env.DB}`;

let database
if (
    typeof process.env.DATABASE_HOST === 'string' && process.env.DATABASE_HOST.trim() !== '' &&
    typeof process.env.DB === 'string' && process.env.DB.trim() !== '' &&
    typeof process.env.DATABASE_USER === 'string' && process.env.DATABASE_USER.trim() !== '' &&
    typeof process.env.DATABASE_PWD === 'string' && process.env.DATABASE_PWD.trim() !== '') {

    database = new Sequelize(connectionUri, {
        dialect: 'mysql',
        logging: false
    });
} else {
    console.log('One of the following environment variables is not a string: DB, USER, PWD')
}

export default database;
