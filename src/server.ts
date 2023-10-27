import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import http from 'http';
import { WebSocketServer } from 'ws'; // Import WebSocketServer from the 'ws' library
import app from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const httpServer = http.createServer(app);

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
    console.log({ 'A user connected': ws });

    ws.on('message', (message) => {
        console.log('Received message from client:', message);
    });

    ws.on('close', () => {
        console.log('A user disconnected');
    });
});

httpServer.listen(port, () => {
    console.log(`WebSocket server is running on ws://localhost:${port}`);
});


// Server without web socket:
// import http from 'http';
// import app from './app.js';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import path from 'path';
// // Get the directory name of the current module file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load environment variables from the .env file located in the parent directory
// dotenv.config({ path: path.join(__dirname, '..', '.env') });

// const normalizePort = (val: string) => {
//     const port = parseInt(val, 10);

//     if (isNaN(port)) {
//         return val;
//     }
//     if (port >= 0) {
//         return port;
//     }
//     return false;
// };

// const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

// const errorHandler = (error: NodeJS.ErrnoException) => {
//     if (error.syscall !== 'listen') {
//         throw error;
//     }
//     const address = server.address();
//     const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
//     switch (error.code) {
//         case 'EACCES':
//             console.error(bind + ' requires elevated privileges.');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(bind + ' is already in use.');
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// };

// const server = http.createServer(app);

// server.on('error', errorHandler);
// server.on('listening', () => {
//     const address = server.address();
//     const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
//     console.log('Listening on ' + bind);
// });

// server.listen(port);

