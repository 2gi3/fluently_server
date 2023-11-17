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
    console.log('A user connected');

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
