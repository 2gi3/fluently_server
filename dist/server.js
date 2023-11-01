import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { WebSocketServer } from 'ws';
// Get the directory name of the current module file
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
const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});
server.listen(port);
const wss = new WebSocketServer({ server });
// const clients = new Set<WebSocket>();
const userSockets = new Map();
// const connectedUsers = [];
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.connectedUserId) {
            const userId = parsedMessage.connectedUserId;
            userSockets.set(userId, ws);
            console.log(`User connected: ${userId}`);
            console.log({ userSockets });
            // Send the list of connected users to the client
            const connectedUsers = Array.from(userSockets.keys());
            // ws.send("Welcome to the chat!");
            // ws.send(JSON.stringify({ userSockets: Array.from(userSockets.keys()) }));
            for (const client of userSockets.values()) {
                client.send(JSON.stringify({ userSockets: connectedUsers }));
            }
        }
        else {
            for (const [userId, socket] of userSockets.entries()) {
                if (socket !== ws) {
                    socket.send(message);
                }
            }
        }
    });
    ws.on('close', () => {
        for (const [userId, socket] of userSockets.entries()) {
            if (socket === ws) {
                userSockets.delete(userId);
                console.log(`User disconnected: ${userId}`);
                // Send the updated list of connected users to all clients
                const connectedUsers = Array.from(userSockets.keys());
                for (const client of userSockets.values()) {
                    // client.send(JSON.stringify({ connectedUsers }));
                    // client.send(JSON.stringify({ userSockets: Array.from(userSockets.keys()) }));
                    for (const client of userSockets.values()) {
                        client.send(JSON.stringify({ userSockets: connectedUsers }));
                    }
                }
                break;
            }
        }
    });
});
// wss.on('connection', (ws: WebSocket) => {
//     // clients.add(ws);
//     // console.log({ 'A new WebSocket connection opened': ws });
//     ws.on('message', (message: any) => {
//         const parsedMessage = JSON.parse(message)
//         if (parsedMessage.connectedUserId) {
//             const userId = parsedMessage.connectedUserId;
//             userSockets.set(userId, ws);
//             console.log(`User connected: ${userId}`);
//             console.log({ 'userSockets': userSockets });
//         } else {
//             // console.log(`message: ${message}`);
//             for (const [userId, socket] of userSockets.entries()) {
//                 if (socket !== ws) {
//                     socket.send(message);
//                     break;
//                 }
//             }
//         }
//     });
//     ws.on('close', () => {
//         for (const [userId, socket] of userSockets.entries()) {
//             if (socket === ws) {
//                 userSockets.delete(userId);
//                 console.log(`User disconnected: ${userId}`);
//                 break;
//             }
//         }
//     });
// });
//# sourceMappingURL=server.js.map