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

console.log(`DB: ${process.env.DB}`);
console.log(`USER: ${process.env.USER}`);
console.log(`PWD: ${process.env.PWD}`);


let database
if (
    typeof process.env.DB === 'string' && process.env.DB.trim() !== '' &&
    typeof process.env.USER === 'string' && process.env.USER.trim() !== '' &&
    typeof process.env.PWD === 'string' && process.env.PWD.trim() !== '') {

    database = new Sequelize(process.env.DB, process.env.USER, process.env.PWD, {
        host: "localhost",
        dialect: "mysql"
    });
} else {
    console.log('One of the following environment variables is not a string: DB, USER, PWD')
}
console.log(process.env.DB)
export default database;
