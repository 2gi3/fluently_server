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

console.log({ host: process.env.DATABASE_HOST })
console.log({ user: process.env.DATABASE_USER })
console.log({ db: process.env.DB })
console.log({ pwd: process.env.DATABASE_PWD })
const connectionUri = `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PWD}@${process.env.DATABASE_HOST}/${process.env.DB}`;
console.log('Connection URI:', connectionUri);

let database
if (
    typeof process.env.DATABASE_HOST === 'string' && process.env.DATABASE_HOST.trim() !== '' &&
    typeof process.env.DB === 'string' && process.env.DB.trim() !== '' &&
    typeof process.env.DATABASE_USER === 'string' && process.env.DATABASE_USER.trim() !== '' &&
    typeof process.env.DATABASE_PWD === 'string' && process.env.DATABASE_PWD.trim() !== '') {

    database = new Sequelize(connectionUri);
} else {
    console.log('One of the following environment variables is not a string: DB, USER, PWD')
}
console.log(process.env.DB)
export default database;
